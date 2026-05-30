---
title: "Deliver Edge Cases: Brainshelf Resurface"
description: "Brainshelf consumer PKM app - Resurface digest edge cases and error states."
artifact: edge-cases
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . Resurface digest edge cases and error states
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

During Sprint 8 planning, Priya M. and Alex R. mapped the edge cases for the Resurface digest to ensure the engineering team handled failure modes before launch rather than discovering them in production. The mapping was especially motivated by the timezone handling complexity (the Brainshelf user base spans 24+ timezones) and the dependency on external URLs that may change or disappear after the user saves them. The edge cases were documented and prioritized so QA could build the test plan directly from this document.

**Source Notes:**

- James Whittaker, "Exploratory Software Testing" (microsoft.com/en-us/research/publication/exploratory-software-testing/) . the exploratory testing methodology that informed the edge case discovery approach; Whittaker's "tours" framework (boundary, bad neighborhood, saboteur) was used to systematically identify failure modes across the digest pipeline.
- Nielsen Norman Group, "Error Message Guidelines" (nngroup.com/articles/error-message-guidelines/) . the error message design principles applied in the Error Messages section; NN/g's guidance that error messages should be visible, constructive, and written in plain language shaped the user-facing copy.
- IETF RFC 8058, "Signaling One-Click Functionality for List Email Headers" (rfc-editor.org/rfc/rfc8058) . the technical standard for the `List-Unsubscribe-Post` header that ensures one-click unsubscribe compliance with Gmail and other major email clients.

---

## Prompt

```
deliver-edge-cases

resurface edge cases for sprint 8. need to cover:
- what happens when the user's library is too small
- what happens when all items have been resurfaced recently
- timezone weirdness (DST, user changes timezone, half-hour offsets)
- text extraction failures
- resend api outages
- user clicks a link to a dead URL
- email bounces
- concurrent opt-in/unsubscribe race conditions

alex wants this documented so QA can build the test plan from it.
```

---

## Output

# Edge Cases: Resurface Digest

## Feature Overview

The Resurface digest is a daily email containing 3 - 5 saved items matched to the user's recent reading interests, delivered at 7:30 AM in the user's local timezone via the Resend API. Edge cases arise from library size variability, timezone complexity, external URL dependencies, email delivery failures, and concurrent user state changes.

**Related Documents:**
- Resurface PRD (Deliver phase)
- ADR-007: Resend as Email Provider (Develop phase)
- Spike Summary: Topic-Matching Algorithm (Develop phase)

## Edge Case Categories

### Input Validation

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| User opts in with an invalid or unreachable email address | Resend returns a bounce on first send attempt; system sets `digest_enabled = false` after 3 consecutive hard bounces and logs a "digest_disabled_bounce" event | P1 | Hard bounce threshold: 3 consecutive [fictional] |
| User's stored timezone string is invalid or unrecognized (e.g., corrupted data) | Fall back to UTC; log a warning; send digest at 7:30 AM UTC for that user until timezone is corrected on next app open | P2 | IANA timezone database is the source of truth |
| User's email address changes after opt-in (account email update) | Digest is sent to the updated email address; the `user_preferences` table references the user's account email, not a separate digest email field | P2 | No separate digest email field in v1 |

### Boundary Conditions

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| User has exactly 10 saved items (minimum eligibility threshold) | User is eligible for opt-in; digest is generated from the 10-item library, selecting up to 5 items above the relevance threshold | P1 | Min eligibility: 10 items |
| User drops below 10 saved items after opting in (deletes items) | Digest continues to be sent as long as at least 1 item passes the relevance threshold; eligibility is checked only at opt-in time, not on each send | P2 | Avoid churn from deletion |
| All items in the library have been resurfaced within the 14-day exclusion window | No digest is sent for that day; system logs "digest_skipped" with reason "exclusion_window_exhausted"; user is not unsubscribed | P1 | Small libraries (~10 - 20 items) will hit this regularly |
| User has 500+ saved items | Topic-matching algorithm processes all items; TF-IDF computation time is ~200ms for 500 items [fictional], within acceptable limits; no special handling needed | P3 | Performance tested during spike up to 1,000 items |
| User has had no reading activity in the past 7 days (no recent centroid) | Extend the recency window to 14 days, then 30 days; if still no activity, use the user's 5 most recently saved items as the centroid proxy | P1 | Prevents empty centroid → no digest for inactive-but-opted-in users |

### Error States

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| Resend API returns 5xx during scheduled send | Retry 3 times with exponential backoff (1 min, 5 min, 15 min [fictional]); if all retries fail, skip the digest for that user for that day; log "digest_send_failed" event and alert on-call if failure rate exceeds 5% of sends [fictional] | P1 | Resend SLA: 99.9% uptime [fictional] |
| Resend API returns 429 (rate limit exceeded) | Throttle the send queue; insert a 1-second delay between sends; retry the throttled message after the rate limit window resets | P1 | Rate limit: 10 req/s on Developer plan [fictional] |
| Text extraction (Cheerio) fails for a saved URL (JavaScript-rendered page, paywall, timeout) | Use OG title + OG description as a fallback for TF-IDF vectorization; if no OG metadata is available, exclude the item from the digest candidate pool for that user | P1 | ~11% of URLs fail extraction [fictional] |
| Saved URL returns 404/410 when user clicks from the email | User's browser shows the site's error page; Brainshelf does not intercept or replace the error page in v1 | P2 | Future: check URL health before including in digest |
| Email hard bounce (invalid address) | Resend webhook delivers bounce event; system increments bounce counter; after 3 consecutive hard bounces, disable digest and log event | P1 | Prevents reputation damage from repeated sends to invalid addresses |
| Email soft bounce (mailbox full, temporary failure) | Resend handles retry automatically; no Brainshelf-side action needed unless soft bounces persist for 7+ days [fictional], in which case treat as hard bounce | P2 | Resend retries soft bounces for 72 hours |

### Concurrency

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| User unsubscribes while the day's digest is being generated (cron job in progress) | The cron job checks `digest_enabled` at send time (not at batch start); if the user unsubscribed between batch start and their send slot, the digest is not sent | P1 | Read-at-send-time, not read-at-batch-start |
| User opts in and the same day's cron job has already passed their timezone slot | User's first digest is sent the following morning; no same-day catch-up digest | P2 | Avoids unexpected mid-day email |
| User changes cadence from daily to 3x/week while the day's digest is queued | The cadence check occurs at send time; if the user switched to 3x/week and today is Tuesday, the queued digest is not sent | P2 | Consistent with read-at-send-time pattern |
| User deletes a saved item that is included in today's not-yet-sent digest | The item is still included in the digest if the email has already been rendered; clicking the item opens the original URL (which Brainshelf does not control); the item is removed from future digest candidate pools | P3 | Email is rendered before send, not at open time |

### Integration Failures

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| Resend webhook endpoint is unreachable (Brainshelf server down) | Resend queues webhook events and retries for up to 24 hours [fictional]; events are processed when the endpoint recovers; no data loss | P2 | Resend webhook retry policy covers short outages |
| Amplitude event tracking fails during click redirect | The click redirect still succeeds (user reaches the article); the analytics event is logged to a local fallback queue and retried when Amplitude is available | P1 | User experience must not be blocked by analytics failures |
| Cheerio text extraction times out (>10 seconds per URL [fictional]) | Abort the extraction; treat the URL as a text-extraction failure (use OG fallback); log the timeout with the URL for investigation | P2 | Timeout threshold: 10 seconds [fictional] |

## Error Messages

| Error State | User Message | Additional Action |
|-------------|--------------|-------------------|
| Digest disabled due to hard bounces | "We couldn't deliver your Resurface digest . your email address may have changed. Update your email in Settings to re-enable." | Link to Settings > Account |
| Opt-in attempted without a confirmed email address | "Please confirm your email address in Settings before enabling the Resurface digest." | Link to Settings > Account |
| Unsubscribe confirmation | "You've been unsubscribed from the Resurface digest. You can re-enable it anytime from Settings." | Link to Brainshelf Settings |
| Cadence change confirmation (to 3x/week) | "Got it . you'll hear from us Monday, Wednesday, and Friday." | None |
| Cadence change confirmation (to daily) | "Welcome back to daily . your next digest arrives tomorrow morning." | None |

## Recovery Paths

### Digest Disabled Due to Hard Bounces

**User sees:** An in-app notification on the home screen: "Your Resurface digest has been paused because emails couldn't be delivered."

**Recovery options:**
1. Update email address in Settings > Account, then re-enable the digest in Settings > Notifications
2. Contact support if the email address is correct but deliverability issues persist

**Data preservation:** Opt-in preferences (cadence, timezone) are preserved; only `digest_enabled` is set to false. Re-enabling restores previous settings.

### Resend API Outage (Digest Skipped)

**User sees:** Nothing . the user simply does not receive a digest that day. No in-app notification for a single skipped day.

**Recovery options:**
1. The system automatically retries on the next scheduled day; no user action required
2. If outages persist for 3+ consecutive days [fictional], the on-call engineer escalates to Resend support and posts a status update in-app

**Data preservation:** No digest data is lost; the items that would have been sent remain eligible for future digests (the 14-day exclusion window is not applied to items in unsent digests).

## Test Scenarios

### Must Test (P1)

- [ ] Digest is sent at the correct local time for users in UTC−5, UTC+0, UTC+5:30, and UTC+12 timezones
- [ ] DST transition: user in America/New_York receives digest at 7:30 AM EDT after spring forward (no duplicate, no skip)
- [ ] User with exactly 10 saved items receives a digest with the correct number of qualifying items
- [ ] User with all items in the 14-day exclusion window receives no digest (no empty email sent)
- [ ] User with no recent reading activity (0 events in 7 days) receives a digest using the extended recency fallback
- [ ] Resend API returns 5xx: system retries 3 times and then skips; on-call alert fires if failure rate exceeds threshold
- [ ] User unsubscribes mid-batch: their digest is not sent
- [ ] Hard bounce after 3 consecutive failures: digest is disabled; user sees in-app notification
- [ ] Click redirect records event in Amplitude and redirects to original URL in <2 seconds
- [ ] Text extraction failure: OG fallback is used; item is not excluded from the digest unless no OG metadata exists

### Should Test (P2)

- [ ] User changes timezone: next digest uses the updated timezone
- [ ] User changes cadence from daily to 3x/week mid-day: today's digest is skipped if today is not Mon/Wed/Fri
- [ ] Soft bounce handling: Resend retries automatically; Brainshelf does not disable digest for soft bounces
- [ ] User drops below 10 saved items: digest continues as long as qualifying items exist
- [ ] Resend webhook endpoint temporarily unreachable: events are received and processed on recovery

### Nice to Test (P3)

- [ ] User with 1,000+ saved items: digest generation completes within acceptable time (<5 seconds [fictional])
- [ ] User deletes a saved item that is in today's already-rendered digest: email still contains the item; click opens original URL
- [ ] Two opt-in requests arrive simultaneously (e.g., home screen card + settings toggle tapped in quick succession): only one opt-in event is recorded; no duplicate state
