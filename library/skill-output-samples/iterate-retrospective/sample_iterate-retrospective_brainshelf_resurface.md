---
title: "Iterate Retrospective: Brainshelf Resurface"
description: "Brainshelf consumer PKM app - Sprint 8 retrospective after Resurface launch."
artifact: retrospective
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . Sprint 8 retrospective after Resurface launch
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Brainshelf shipped Resurface . a morning email digest resurfacing saved content . in Sprint 8. Within 48 hours of launch, a timezone offset bug caused the digest to send at 5:00 AM local time for users in UTC+1 and UTC+2 timezones (primarily UK and Central Europe) instead of the configured 7:30 AM. Approximately 340 affected users [fictional] received an early-morning email before the bug was detected and patched. The sprint also had two meaningful wins: on-time delivery of the first major user-facing feature in six months, and strong opt-in rate. The team held this retrospective three days after the bug was resolved.

**Source Notes:**

- The Start/Stop/Continue retrospective format is described in Agile Alliance's published retrospective practices guide (agilealliance.org) as the recommended starting format for small, fast-moving teams due to its low facilitation overhead.
- Liberating Structures' "1-2-4-All" activity (liberatingstructures.com) was used for the initial input-gathering phase to ensure quieter team members contributed before group discussion, consistent with published retrospective facilitation research.

---

## Prompt

```
/retrospective

sprint 8 retro . resurface launch sprint. need to write this up.

what happened: we shipped resurface on time! first big feature in 6 months.
but we also had a timezone bug that sent the morning digest at 5am to UK/Europe
users (~340 people [fictional]). caught it 6 hours after launch, patched within 2
hours of catching it, but some users were not happy.

format: start/stop/continue. small team (7 people in the room).
2 wins, the timezone thing, and a few process issues that came up.

previous retro action items were: (1) set up staging environment email testing .
DONE, (2) add integration test for notification delivery . NOT DONE (this
contributed to the bug), (3) weekly eng/pm sync . IN PROGRESS.
```

---

## Output

# Retrospective: Sprint 8 . Resurface Launch

## Overview

**Period Covered:** Sprint 8 (Feb 3 – Feb 16, 2026)
**Date Held:** February 19, 2026
**Facilitator:** PM
**Duration:** 60 minutes
**Format Used:** Start/Stop/Continue with 1-2-4-All input gathering

### Attendees

- Priya M., Product Manager
- Dan K., Product Designer
- Alex R., Backend Engineer (Resurface feature lead)
- Jess T., Backend Engineer
- Sam W., Frontend Engineer
- Chloe B., Data Analyst
- Jordan L., Growth (part-time; joined for the retro only)

### Context

Sprint 8 was the Resurface launch sprint. Resurface is the first major user-facing feature shipped in six months and delivered on schedule. Within 48 hours of launch, a timezone offset calculation bug caused the morning digest to send at 5:00 AM local time to approximately 340 users [fictional] in UTC+1 and UTC+2 timezones (UK and Central Europe). The bug was detected via user complaints on social media and direct support emails 6 hours post-launch and patched within 2 additional hours. Total exposure window: approximately 8 hours. A public apology was posted in the app's community forum and via email to affected users.

---

## Previous Retrospective Review

### Action Items from Last Retro (Sprint 7)

| Action | Owner | Status | Notes |
|--------|-------|--------|-------|
| Set up staging environment for email template testing | Alex R. | Complete | Staging email environment live; used successfully in Sprint 8 for template QA |
| Add integration test for notification delivery pipeline (timezone, send time) | Alex R. | Not Started | This item was deprioritized due to Resurface sprint scope. Directly contributed to the timezone bug. |
| Weekly engineering / PM sync (30 min, Tuesdays) | Priya M. | In Progress | Running for 3 of 4 weeks; canceled once due to conflicting external call |

---

## What Went Well

### Team Highlights

- Resurface shipped on time after six months without a major feature launch . the team stayed in scope and executed the sprint plan without unplanned cuts.
- Email opt-in rate in the first 72 hours exceeded the 15% hypothesis threshold: 19% of eligible users opted in [fictional], validating the demand assumption before the bug was even fixed.
- Bug response was fast once identified: root cause isolated in under 30 minutes, patch deployed in 2 hours, affected-user communication sent within the same hour as the patch. For a 20-person company, the incident response was professional.

### Process Wins

- The staging email environment (completed from Sprint 7 retro) caught two template rendering bugs before launch that would otherwise have shipped to users; the staging investment paid back immediately.
- The decision to require opt-in before the A/B experiment enrollment (not just after) meant the timezone incident affected opted-in users only . a smaller and more forgiving audience than the full user base.

### Individual Shoutouts

- Alex R. for staying online through the incident, owning the root cause analysis, and writing a clear postmortem within 24 hours of the fix . making this retro easier to run.
- Chloe B. for surfacing the anomalous send-time pattern in the analytics dashboard before user complaints reached support volume . the monitoring caught the bug faster than the support queue did.

---

## What to Improve

### Challenges Faced

- The timezone offset bug: the notification scheduling code calculated send time using server UTC offset rather than the per-user stored timezone, causing sends to arrive at the wrong local hour for users outside the team's default timezone (US Pacific). No integration test existed for this calculation.
- No pre-launch notification dry-run capability: the team had no way to send a test digest to a list of internal testers across representative timezones before the production push. The staging email environment tests templates but does not simulate the full scheduling pipeline.
- Incident detection relied on social media monitoring and user support emails rather than a proactive alert. The data anomaly (unusually high bounce rate in UTC+1 accounts at 5 AM) was detectable but had no alert threshold configured.

### Process Pain Points

- The Sprint 7 action item for notification delivery integration tests was deprioritized into Sprint 8 and then into the backlog without a recorded decision. The gap between "deferred" and "abandoned" was not visible until the bug surfaced it.
- The weekly PM/eng sync is the right cadence but scheduling it on Tuesdays conflicts with a recurring external partner call for the growth function. Sprint 8 had one canceled sync that caused an alignment gap on the opt-in UX copy change.

### Themes Identified

| Theme | Items | Votes |
|-------|-------|-------|
| Test coverage gaps on time-sensitive features | Timezone bug; no integration test for scheduling pipeline; no dry-run tool | 5 |
| Deferred action items losing visibility | Notification test deprioritized without a recorded decision; no aging alert on backlog items | 4 |
| Reactive vs. proactive incident detection | Bug surfaced via social media and support emails, not monitoring alerts | 3 |

---

## Discussion Notes

### Timezone Bug Root Cause

**What was discussed:** Alex R. walked through the postmortem. The scheduling code stored send times in UTC and converted to local time using the server's timezone configuration rather than the per-user `timezone` field in the user table. The field existed and was populated for 94% of users [fictional] but was not referenced in the scheduling path. The bug was introduced in a refactor three sprints ago when the scheduling module was rewritten for Resurface; the original transactional email code handled timezone correctly.

**Root cause identified:** Missing test coverage for the timezone conversion path in the scheduling module. The refactor changed the code path; no integration test caught the regression.

**Proposed solution:** Write an integration test suite for the notification scheduling pipeline that covers UTC, UTC+1, UTC+2, UTC-5, UTC-8, and UTC+9 test users, and add a pre-send dry-run mode that simulates full scheduling (including timezone conversion) against a seed user list before any production push.

---

### Deprioritized Action Items Losing Visibility

**What was discussed:** The notification integration test was on the Sprint 7 retro list. Dan K. pointed out that when action items are added to the backlog they lose the "came from a retro" context . there's no way to distinguish a retro-sourced item from a normal feature request. Three sprint planning sessions passed without anyone noting the item was aging.

**Root cause identified:** Retro action items are written into the team's linear backlog without a label or priority designation that distinguishes them from other work. In planning, they compete on equal footing with feature work and lose.

**Proposed solution:** Tag all retro action items with a `retro-action` label and a target sprint. If the item slips past its target sprint, it surfaces at the next retro automatically as an aging item . not a separate tracking system, just a label-based filter on the backlog review.

---

## Action Items

| Priority | Action | Owner | Due Date | Status |
|----------|--------|-------|----------|--------|
| 1 | Write integration test suite for notification scheduling pipeline (timezone conversion, per-user timezone field, UTC send calculation) | Alex R. | Mar 1, 2026 | Not Started |
| 2 | Build pre-send dry-run mode: simulate full scheduling pipeline against a seed list of internal test users before any production notification push | Alex R. + Sam W. | Mar 15, 2026 | Not Started |
| 3 | Configure proactive alert for email send anomalies: alert if send-time distribution for a given digest deviates by more than 1 hour from expected per-user local time | Chloe B. | Mar 1, 2026 | Not Started |

### Action Item Details

**Action 1: Notification Scheduling Integration Tests**
- What: Write tests covering the full timezone conversion path in the scheduling module, asserting that `send_at` (UTC) matches the expected local send time for users in at least 6 representative timezones. Include regression test for the specific bug: UTC+1 user, configured 7:30 AM send time, must produce a UTC timestamp of 06:30, not 07:30.
- Why: Closes the test coverage gap that caused the Sprint 8 timezone incident.
- Success criteria: CI pipeline includes notification scheduling tests; no merge to main can break the timezone assertion without a failing test.

**Action 2: Pre-Send Dry-Run Mode**
- What: Add a dry-run flag to the notification dispatch job. When `dry_run=true`, the job runs the full scheduling and template-rendering pipeline but routes output to a seed list of internal test users (5–10 people across US, UK, and CET timezones) rather than production. Output includes a preview of send times in each recipient's local timezone for human review.
- Why: Provides a final human-visible check before any notification push reaches production users.
- Success criteria: Dry-run mode is used for all future notification feature launches; no production push goes out without a dry-run sign-off from the PM.

---

## Parking Lot

- **In-app resurface cards (vs. email-only):** Several users in the community forum asked for an in-app card alternative to the email digest. Deferred . the A/B experiment on email format needs to complete before adding a third surface variant. Will revisit post-experiment.
- **Notification quiet hours settings:** Two users specifically complained about the 5 AM send in the UK and mentioned they would want quiet hours controls even after the bug is fixed. This is a legitimate product gap, not just a bug consequence. Add to the Resurface v1.1 refinement backlog.

---

## Metrics and Trends

### Team Health Indicators

| Indicator | This Retro | Last Retro | Trend |
|-----------|------------|------------|-------|
| Team morale (1–5) | 3.8 [fictional] | 3.4 [fictional] | ↑ |
| Process satisfaction (1–5) | 3.2 [fictional] | 3.5 [fictional] | ↓ |
| Collaboration (1–5) | 4.1 [fictional] | 3.9 [fictional] | ↑ |

*Morale up: the team is energized from shipping. Process satisfaction down: the timezone incident and the deferred-test miss left the team feeling the QA process is fragile.*

### Recurring Themes

- Test coverage gaps on new pipeline code have appeared in two consecutive retros (Sprint 7: missing test on email template rendering; Sprint 8: missing test on scheduling timezone conversion). This is a pattern, not an isolated incident . the root cause is scope pressure on test writing during launch sprints.

---

## Facilitator Notes

- The 1-2-4-All format worked well for a 7-person team; individual writing time before group discussion prevented the two most vocal engineers from dominating the "what to improve" section.
- The timezone incident dominated the discussion; spent 25 of 60 minutes on it. For future retros when a specific incident is top of mind, timeboxing the incident discussion to 15 minutes and moving to the broader themes prevents other process issues from being crowded out.
- Action item 1 and 3 have the same due date (Mar 1); check in at the Tuesday sync to confirm Alex R. and Chloe B. are not blocked.

---

## Next Retrospective

**Scheduled:** March 19, 2026 (end of Sprint 9)
**Focus areas:** Follow up on all three action items; review early Resurface A/B experiment data if available; revisit test coverage pattern if Sprint 9 surfaces another coverage gap.

---

*Retrospective documented by Priya M. on February 19, 2026.*
