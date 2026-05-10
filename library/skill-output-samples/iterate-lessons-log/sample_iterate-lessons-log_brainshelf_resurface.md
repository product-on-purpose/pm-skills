---
title: "Iterate Lessons Log: Brainshelf Resurface"
description: "Brainshelf consumer PKM app - timezone handling lesson from the Resurface Sprint 8 launch."
artifact: lessons-log
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . timezone handling lesson from the Resurface Sprint 8 launch
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Two days after the Resurface feature shipped on February 16, 2026, Alex R. discovered that approximately 340 UK and EU users [fictional] who opted in during the first 48 hours received their digest at 7:30 AM UTC instead of 7:30 AM in their local timezone. The root cause was a fallback behavior in the timezone capture code: when the device's `Intl.DateTimeFormat` API returned a timezone string the backend did not recognize (specifically the `Europe/Kyiv` entry added to the IANA database in 2022), the system silently fell back to UTC. Priya M. documented the lesson to ensure the team applied timezone testing discipline to all future time-dependent features.

**Source Notes:**

- IANA, "Time Zone Database" (iana.org/time-zones) . the canonical timezone database that the Brainshelf backend uses for scheduling; the `Europe/Kyiv` timezone (added in IANA tzdata 2022b) was the specific entry that triggered the fallback, illustrating the importance of keeping the IANA database up to date in production systems.
- Zach Holman, "UTC Is Enough for Everyone, Right?" (zachholman.com/talk/utc-is-enough-for-everyone-right) . the talk that Alex R. referenced in the post-incident review; Holman's inventory of timezone edge cases (DST transitions, half-hour offsets, political timezone changes) informed the expanded test suite added after the incident.
- Martin Fowler, "Feature Toggles" (martinfowler.com/articles/feature-toggles.html) . the feature flag methodology used to ship Resurface behind a toggle; the fact that the feature was behind a flag enabled the team to patch the timezone bug without a full rollback, limiting the blast radius to the 340 affected users.

---

## Prompt

```
/lessons-log

lesson from: timezone bug at resurface launch
what happened: ~340 UK/EU users got their digest at 7:30 UTC instead
of 7:30 local because the backend didn't recognize "Europe/Kyiv" and
silently fell back to UTC.

detected: feb 18, 2026 . alex noticed the send log timestamps were
wrong for EU users.
fixed: feb 18, same day . updated IANA database, added explicit
fallback logging, patched within 2 hours.

lesson type: failure pattern / technical
the real lesson isn't the specific bug . it's that we had ZERO
integration tests for timezone-dependent behavior. the unit tests
mocked the timezone, so they never caught the gap between the device
timezone string and the server's IANA database.
```

---

## Output

# Mocked Timezones Hide Real-World Failures: Always Integration-Test Time-Dependent Features Against the Live IANA Database

## Metadata

| Attribute | Value |
|-----------|-------|
| **Entry ID** | LL-2026-001 |
| **Date** | February 19, 2026 |
| **Author** | Priya M., Product Manager |
| **Project/Initiative** | Resurface . Morning Email Digest, Sprint 8 Launch |
| **Team** | Brainshelf Product Team |
| **Lesson Type** | Failure Pattern / Technical |

---

## Summary

When Brainshelf launched the Resurface digest on February 16, 2026, approximately 340 UK and EU users [fictional] received their morning email at 7:30 AM UTC instead of 7:30 AM in their local timezone. The root cause was a stale IANA timezone database on the server that did not include the `Europe/Kyiv` entry (added in 2022), causing the backend to silently fall back to UTC when it encountered an unrecognized timezone string from the user's device. The bug was not caught in testing because all timezone-related unit tests mocked the timezone value instead of testing against the server's actual IANA database. The lesson is not about the specific timezone entry . it is about the testing discipline: any feature that depends on the server's interpretation of device-provided data must be integration-tested against the live server environment, not unit-tested with mocked inputs.

---

## Context

### Background

The Resurface digest sends a daily email at 7:30 AM in the user's local timezone. The user's timezone is captured at opt-in time using the browser's `Intl.DateTimeFormat().resolvedOptions().timeZone` API (which returns an IANA timezone string like `America/New_York` or `Europe/London`) and stored in the database. The cron job reads each user's timezone and schedules the send for the corresponding UTC time. This design requires the server to recognize and correctly resolve every IANA timezone string that a user's device might provide.

### Timeline

| Date | Event |
|------|-------|
| Feb 14, 2026 | Resurface deployed to production behind feature flag |
| Feb 16, 2026 | Feature flag enabled; opt-in enrollment begins; first digests sent |
| Feb 18, 2026 | Alex R. notices that EU send log timestamps cluster at 07:30 UTC instead of varying by user timezone; investigates |
| Feb 18, 2026 | Root cause identified: `Europe/Kyiv` not in server's IANA database; fallback to UTC triggered silently |
| Feb 18, 2026 | Patch deployed within 2 hours: IANA database updated, fallback logging added, affected users' timezones re-resolved |
| Feb 19, 2026 | All affected users receive their digest at the correct local time; no user-reported complaints |

### Team and Stakeholders

- Alex R. (Engineering Lead) . detected the bug, authored and deployed the patch
- Jess T. (Backend Engineer) . wrote the original timezone handling code; contributed to the patch
- Priya M. (Product Manager) . documented the lesson; updated the launch checklist template
- Chloe B. (Data Analyst) . confirmed the scope of impact (340 affected users) from the send log [fictional]

### Constraints

- The feature was behind a feature flag, so the team could patch without a full rollback; the blast radius was limited to users who had already opted in and received at least one digest
- Sprint 8 had no allocated time for integration testing of timezone behavior . the timeline pressure to ship before the A/B test setup week (March 2) compressed testing to unit tests only

---

## What Happened

### Sequence of Events

1. During Sprint 8 development, Jess T. implemented the timezone handling logic. Unit tests covered the scheduling calculation (given a timezone string, compute the correct UTC send time) but used hardcoded timezone strings (`America/New_York`, `Europe/London`, `Asia/Tokyo`) as test inputs.
2. The unit tests passed because they tested the scheduling math, not the server's ability to recognize an arbitrary IANA timezone string from a user's device.
3. On February 16, users in Ukraine, and a small number of users whose devices returned `Europe/Kyiv` as their timezone, opted in. The backend's IANA database (bundled with the `moment-timezone` library, which had not been updated since the last `npm install` in November 2025) did not include the `Europe/Kyiv` entry.
4. The timezone resolution function encountered the unrecognized string, logged no error (the fallback was designed as a silent default, not an error), and stored `UTC` as the user's timezone.
5. These users received their digest at 7:30 AM UTC . which is 9:30 AM in Kyiv (UTC+2) and other incorrect times depending on actual timezone. For UK users, the difference was only 0 - 1 hour depending on DST, which is why no user complained.
6. On February 18, Alex R. was reviewing the send log as part of the daily health check and noticed that all EU users in the log had a `scheduled_time_utc` of `07:30:00Z` . no variance . which should have been impossible if their timezones were correctly resolved. He investigated and found the root cause within 30 minutes.

### Key Decisions Made

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Update the IANA database immediately and re-deploy | The stale database was the root cause; updating it resolved the issue for all affected timezone strings | All 340 users received correct-time digests starting Feb 19 [fictional] |
| Add explicit logging for timezone fallback (log a warning whenever the fallback to UTC is triggered) | The silent fallback masked the error; an explicit log entry would have been caught in the daily health check on day 1 | Warning log added; will trigger an automated alert if >5 fallbacks occur in a single day [fictional] |
| Do NOT roll back the feature | The impact was a 0 - 2 hour delivery offset for 340 users, not a broken or missing feature; rolling back would remove the digest for all users, which is a worse outcome | Feature remained live; patch deployed within 2 hours of detection |

### Outcome

The patch resolved the issue within 2 hours of detection. No user-reported complaints were received, likely because the delivery offset (0 - 2 hours for UK/EU users) was small enough to go unnoticed or to be attributed to email delivery delays. The total affected population was approximately 340 users [fictional], or about 3.5% of the initial opt-in cohort.

---

## The Lesson

### What We Learned

**Primary Lesson:** When a feature depends on the server's interpretation of device-provided data (timezone strings, locale codes, device identifiers), unit tests with hardcoded inputs will not catch mismatches between the device's data and the server's reference database. Integration tests that send real device-generated data through the real server stack are the only reliable way to catch these gaps.

**Supporting Observations:**
- The unit tests all passed because they tested the right logic (scheduling math) with the wrong assumption (that the server would always recognize the timezone string). The tests proved correctness of the algorithm while missing the data dependency.
- The silent UTC fallback was an intentional design choice ("if we can't parse the timezone, default to UTC so the user still gets a digest") . but the failure mode it created (wrong time, no error signal) was worse than the alternative (no digest sent, error logged). A noisy failure is easier to detect than a silent degradation.
- The `moment-timezone` library bundles a snapshot of the IANA database at the time of the last `npm install`. If the library is not updated regularly, the database drifts from reality. This is a supply chain risk for any timezone-dependent feature.

### Why This Matters

Brainshelf is building more time-dependent features: cadence scheduling (3x/week delivery), future custom send time selection, and potential weekly summary digests. Each of these features depends on correct timezone resolution. If the team does not establish integration testing discipline for timezone behavior now, the same class of bug will recur in every time-dependent feature . and future instances may be harder to detect (e.g., a custom send time bug where the user selected 6:00 AM but receives the email at 8:00 AM, which they attribute to email delivery delays rather than a timezone error).

### Root Cause Analysis

- The immediate cause was a stale IANA timezone database on the server (`Europe/Kyiv` not recognized)
- The contributing cause was the absence of integration tests for timezone behavior . the test suite validated the scheduling logic in isolation but never tested the end-to-end path from device timezone string to server-side resolution
- The systemic cause was timeline pressure: Sprint 8 allocated zero time for integration testing of timezone behavior because the team prioritized shipping before the A/B test setup week

---

## Recommendations

### Do This

1. Add integration tests that send a representative set of real IANA timezone strings (including recent additions like `Europe/Kyiv`, `America/Ciudad_Juarez`, and half-hour offsets like `Asia/Kolkata`) through the actual server timezone resolution path . not mocked, not hardcoded.
2. Add a CI step that checks whether the IANA timezone database bundled with the timezone library is up to date; fail the build if the database is more than 6 months old.
3. Replace silent fallbacks in critical data paths with noisy failures: when the timezone resolution fails, log a warning (not just info), store the raw unrecognized string alongside the fallback value, and trigger an automated alert if the fallback rate exceeds a threshold.

### Avoid This

1. Mocking external reference data (timezone databases, locale tables, currency codes) in unit tests when the feature's correctness depends on the server's version of that data being current and complete. Mocked tests prove logic correctness; they do not prove data correctness.
2. Designing silent fallbacks for user-facing behavior without a corresponding monitoring signal. A silent fallback is invisible to the user AND to the team . the worst combination for detecting degradation.

### Questions to Ask

- Does this feature depend on the server correctly interpreting data from the user's device (timezone, locale, device model, OS version)?
- If the server's reference data is stale or incomplete, what is the failure mode . and would we detect it?
- Are our tests for this feature testing the logic in isolation, or are they testing the full data path from device input to server output?

---

## Applicability

### When This Applies

- Any feature that schedules events based on user timezone (email delivery, notification scheduling, report generation)
- Any feature that depends on a bundled reference database (timezone, locale, currency) that can become stale over time
- Any feature with a silent fallback design that degrades behavior without logging an error

### When This May Not Apply

- Features that operate entirely in UTC with no user-facing timezone conversion
- Features where the device provides data that the server treats as opaque (passes through without interpretation)

### Related Situations

- Locale-dependent features (date formatting, number formatting, currency display) that depend on a bundled locale database
- OAuth token validation that depends on a bundled certificate store (stale certificates can cause silent auth failures)

---

## Supporting Evidence

### Metrics/Data

| Metric | Before Patch | After Patch |
|--------|--------------|-------------|
| EU users receiving digest at correct local time | 0% of 340 affected users [fictional] | 100% [fictional] |
| Timezone fallback rate | ~3.5% of opted-in users (silent) [fictional] | 0% (with alerting) [fictional] |
| User-reported complaints | 0 | 0 |

### Quotes

> "The unit tests all passed. That's the part that stings . the tests told us everything was fine." . Alex R., Engineering Lead, February 19, 2026 [fictional]

> "A 2-hour offset isn't dramatic enough for users to report, but it's exactly the kind of thing that erodes trust over time if we don't fix it." . Priya M., PM, February 19, 2026 [fictional]

### Artifacts

- Sprint 8 retrospective notes (Iterate phase)
- Resurface send log analysis (internal Datadog dashboard)
- Patch PR: "fix: update IANA timezone database and add fallback logging" (internal Git)

---

## Tags and Categories

**Primary Category:** Technical

**Tags:** [#timezone] [#integration-testing] [#silent-fallback] [#email-delivery] [#iana-database]

**Related Lessons:** (none . first entry in Resurface knowledge base)

---

## Review and Updates

| Date | Reviewer | Update |
|------|----------|--------|
| Feb 19, 2026 | Priya M. | Initial entry |
| Feb 20, 2026 | Alex R. | Reviewed and added technical detail on moment-timezone bundling |

---

*This lesson was captured to help future teams avoid repeating our mistakes and build on our successes.*
