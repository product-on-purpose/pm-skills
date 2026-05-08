---
title: "Measure Instrumentation Spec: Brainshelf Resurface"
description: "Brainshelf consumer PKM app - Resurface feature analytics instrumentation spec."
artifact: instrumentation-spec
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . Resurface feature analytics instrumentation spec
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Before Sprint 8 began, Chloe B. wrote the instrumentation spec for the Resurface feature to ensure every measurable interaction . opt-in, email sent, email opened, item clicked, cadence changed, unsubscribe, and digest skipped . was tracked consistently across the client and server. The spec was written early so that Alex R. and Jess T. could instrument events during the build rather than retrofitting analytics after ship, which the team had learned from a prior feature launch was error-prone and created data gaps in the first week of measurement.

**Source Notes:**

- Amplitude, "Event Tracking Best Practices" (amplitude.com/blog/event-tracking-best-practices) . the event naming conventions and property taxonomy used in this spec; Amplitude's guidance on using snake_case naming, consistent property types, and separating user properties from event properties informed the structure.
- Segment, "Analytics Academy: Tracking Plan" (segment.com/academy/collecting-data/naming-conventions-for-clean-data/) . the tracking plan methodology that influenced the event inventory format; Segment's emphasis on a centralized tracking plan document as the single source of truth for all analytics events shaped the document's role in the development workflow.
- GDPR Article 6, "Lawfulness of Processing" (gdpr-info.eu/art-6-gdpr/) . the legal basis for processing analytics data in the context of the Resurface feature; the consent and legitimate interest considerations referenced in the PII & Privacy section are drawn from GDPR Article 6.

---

## Prompt

```
/instrumentation-spec

resurface analytics events for amplitude. need the full spec before
sprint 8 starts so alex and jess can instrument during the build.

events:
1. resurface_opt_in . user enables the digest
2. resurface_digest_sent . server sends a digest email
3. resurface_digest_opened . user opens the email (caveat: apple MPP)
4. resurface_item_clicked . user clicks an item in the digest
5. resurface_unsubscribe . user unsubscribes
6. resurface_cadence_changed . user changes frequency
7. resurface_digest_skipped . server skips sending (no qualifying items,
   exclusion window exhausted, etc.)

also need user properties: digest_enabled, digest_cadence, digest_timezone.

keep it tight. chloe wants to review before sprint planning on monday.
```

---

## Output

# Instrumentation Spec: Resurface Digest

## Overview

**Feature:** Resurface . daily morning email digest of topic-matched saved items

**Analytics Goals:**

1. Can we measure the causal effect of the Resurface digest on 7-day return rate? (A/B experiment primary metric)
2. Are users engaging with the digest content? (Email CTR, item-level click distribution)
3. Is the digest creating negative value? (Unsubscribe rate, guardrail monitoring)
4. What is the opt-in funnel conversion rate? (Card viewed → opted in)
5. How often does the system skip digest generation, and why? (Operational health)

**Analytics Platform:** Amplitude

**Naming Convention:** `resurface_` prefix, snake_case: `resurface_{action}` (e.g., `resurface_opt_in`)

## Event Inventory

### resurface_opt_in

| Field | Value |
|-------|-------|
| **Event Name** | `resurface_opt_in` |
| **Trigger** | User taps "Enable Digest" on the home screen card OR toggles the Resurface Digest setting on in Settings > Notifications |
| **Description** | Records the moment a user enables the Resurface digest. Fires once per opt-in action; if a user unsubscribes and re-subscribes, a new opt-in event fires. |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| source | string | Yes | Where the opt-in was triggered | `"home_card"` or `"settings"` |
| timezone | string | Yes | User's IANA timezone at opt-in time | `"America/New_York"` |
| library_size | number | Yes | Number of saved items at opt-in time | `127` |
| experiment_variant | string | Yes | A/B experiment variant | `"treatment"` |

---

### resurface_opt_in_card_viewed

| Field | Value |
|-------|-------|
| **Event Name** | `resurface_opt_in_card_viewed` |
| **Trigger** | The Resurface opt-in card renders on the user's home screen (viewport visible for ≥1 second) |
| **Description** | Records that the opt-in card was displayed to the user. Used to calculate the card-to-opt-in conversion rate. |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| experiment_variant | string | Yes | A/B experiment variant | `"treatment"` |
| view_count | number | Yes | How many times this user has seen the card (cumulative) | `1` |

---

### resurface_opt_in_card_dismissed

| Field | Value |
|-------|-------|
| **Event Name** | `resurface_opt_in_card_dismissed` |
| **Trigger** | User taps the dismiss ("X") button on the opt-in card |
| **Description** | Records that the user dismissed the opt-in prompt without opting in. |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| dismiss_count | number | Yes | Cumulative dismiss count for this user (1 = first dismiss, 2 = second/final dismiss) | `1` |
| experiment_variant | string | Yes | A/B experiment variant | `"treatment"` |

---

### resurface_digest_sent

| Field | Value |
|-------|-------|
| **Event Name** | `resurface_digest_sent` |
| **Trigger** | The server successfully sends a digest email via the Resend API (HTTP 200 response from Resend) |
| **Description** | Records each successful digest email send. Fired server-side by the cron job. |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| digest_id | string | Yes | Unique identifier for this digest instance | `"dg_2026-03-10_usr_abc123"` |
| item_count | number | Yes | Number of items included in the digest | `4` |
| items | array | Yes | Array of item IDs included in the digest | `["item_1", "item_2", "item_3", "item_4"]` |
| cadence | string | Yes | User's cadence setting at send time | `"daily"` or `"3x_week"` |
| scheduled_time_utc | string | Yes | Scheduled send time in UTC | `"2026-03-10T12:30:00Z"` |
| actual_send_time_utc | string | Yes | Actual send time in UTC | `"2026-03-10T12:30:04Z"` |
| timezone | string | Yes | User's IANA timezone | `"America/New_York"` |

---

### resurface_digest_opened

| Field | Value |
|-------|-------|
| **Event Name** | `resurface_digest_opened` |
| **Trigger** | Resend webhook delivers an "opened" event for a digest email |
| **Description** | Records that the user (or their email client) opened the digest email. **Caveat:** Apple Mail Privacy Protection pre-loads tracking pixels, inflating open rates for Apple Mail users. This event is logged for completeness but is NOT used as a primary or secondary metric. |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| digest_id | string | Yes | Unique identifier for the digest | `"dg_2026-03-10_usr_abc123"` |
| email_client | string | No | Email client if identifiable from Resend metadata | `"gmail"` or `"apple_mail"` |

---

### resurface_item_clicked

| Field | Value |
|-------|-------|
| **Event Name** | `resurface_item_clicked` |
| **Trigger** | User clicks an item link in the digest email, hitting the `/r/{digest_id}/{item_id}` redirect endpoint |
| **Description** | Records each item click from the digest. This is the core engagement event and the basis for the email CTR metric. Fired server-side by the click redirect endpoint. |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| digest_id | string | Yes | Unique identifier for the digest | `"dg_2026-03-10_usr_abc123"` |
| item_id | string | Yes | Saved item identifier | `"item_42"` |
| item_position | number | Yes | Position of the item in the digest (1-indexed) | `2` |
| item_topic_tag | string | Yes | Topic tag displayed in the digest for this item | `"product-management"` |
| relevance_score | number | Yes | TF-IDF cosine similarity score for this item | `0.34` |
| destination_url | string | Yes | The original saved URL the user is redirected to | `"https://example.com/article"` |

---

### resurface_unsubscribe

| Field | Value |
|-------|-------|
| **Event Name** | `resurface_unsubscribe` |
| **Trigger** | User clicks the "Unsubscribe" link in the digest email footer, hitting the `/digest/unsubscribe/{user_token}` endpoint |
| **Description** | Records that the user unsubscribed from the Resurface digest. |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| source | string | Yes | Where the unsubscribe was triggered | `"email_footer"` or `"settings"` |
| days_since_opt_in | number | Yes | Days between opt-in and unsubscribe | `14` |
| digests_received | number | Yes | Total digest emails the user received before unsubscribing | `12` |
| total_items_clicked | number | Yes | Total items clicked across all digests before unsubscribing | `5` |

---

### resurface_cadence_changed

| Field | Value |
|-------|-------|
| **Event Name** | `resurface_cadence_changed` |
| **Trigger** | User changes their digest cadence (from daily to 3x/week or vice versa) via email footer link or Settings |
| **Description** | Records cadence preference changes. |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| source | string | Yes | Where the change was triggered | `"email_footer"` or `"settings"` |
| previous_cadence | string | Yes | Cadence before the change | `"daily"` |
| new_cadence | string | Yes | Cadence after the change | `"3x_week"` |

---

### resurface_digest_skipped

| Field | Value |
|-------|-------|
| **Event Name** | `resurface_digest_skipped` |
| **Trigger** | The cron job determines that a digest should not be sent for a user on a given day |
| **Description** | Records each skipped digest with the reason. Fired server-side. Used for operational monitoring (not user-facing metrics). |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| skip_reason | string | Yes | Why the digest was skipped | `"no_qualifying_items"`, `"exclusion_window_exhausted"`, `"cadence_not_today"`, `"send_failed_after_retries"`, `"user_unsubscribed_mid_batch"` |
| items_evaluated | number | No | Number of candidate items scored | `47` |
| items_above_threshold | number | No | Number of items that passed the relevance threshold | `0` |

---

## User Properties

| Property | Type | Description | Set When | Example |
|----------|------|-------------|----------|---------|
| digest_enabled | boolean | Whether the user has opted in to the Resurface digest | Set to `true` on opt-in; set to `false` on unsubscribe or hard bounce disable | `true` |
| digest_cadence | string | User's selected delivery frequency | Set on opt-in (default `"daily"`); updated on cadence change | `"daily"` or `"3x_week"` |
| digest_timezone | string | User's IANA timezone for digest delivery | Set on opt-in from device settings; updated on app open if device timezone changes | `"America/New_York"` |
| digest_opted_in_at | string | ISO 8601 timestamp of the user's most recent opt-in | Set on each opt-in (including re-subscribes) | `"2026-03-10T14:22:00Z"` |
| experiment_variant | string | A/B experiment variant assignment | Set when the experiment SDK initializes | `"control"` or `"treatment"` |

## PII & Privacy Considerations

### PII Properties

| Property | PII Type | Handling |
|----------|----------|----------|
| destination_url | Potentially PII (URL may contain user-specific query parameters) | Log the base URL only; strip query parameters before storing in Amplitude |
| email_client | Indirect PII (identifies user's email service) | Acceptable to store; no direct identification |

### Consent Requirements

- Analytics events for the Resurface feature are processed under the legitimate interest basis (GDPR Article 6(1)(f)) as product improvement analytics
- No additional consent collection is required beyond the existing Brainshelf privacy policy, which covers product analytics
- The opt-in event itself is consent for email delivery, not consent for analytics; analytics consent is covered by the app-level privacy policy

### Data Retention

- Event data retained in Amplitude for 12 months (standard Brainshelf retention policy)
- Digest send logs in PostgreSQL retained for 90 days, then archived

## Implementation Notes

### SDK/Integration

- **Platform:** Server-side (Node.js) for `digest_sent`, `digest_opened` (via webhook), `item_clicked`, `unsubscribe`, `digest_skipped`; client-side (web/mobile) for `opt_in`, `opt_in_card_viewed`, `opt_in_card_dismissed`, `cadence_changed`
- **SDK:** Amplitude JavaScript SDK (client), Amplitude Node.js SDK (server)
- **Initialization:** Client-side SDK must be initialized before the home screen renders to ensure variant assignment is available for the opt-in card display logic

### Event Timing

- Client-side events fire immediately on user interaction (no batching delay)
- Server-side events (`digest_sent`, `digest_skipped`) fire synchronously within the cron job after each user's digest is processed
- `item_clicked` fires synchronously in the click redirect endpoint before the 302 redirect is issued (must not block the redirect; use non-blocking async send with local fallback queue)

## Testing Checklist

### Event Validation

- [ ] **resurface_opt_in:** Enable digest from home card; verify event fires with source=`"home_card"`, correct timezone, and library_size
- [ ] **resurface_opt_in:** Enable digest from Settings; verify event fires with source=`"settings"`
- [ ] **resurface_opt_in_card_viewed:** Open home screen as treatment user; verify event fires after card is visible for ≥1 second
- [ ] **resurface_opt_in_card_dismissed:** Tap dismiss on home card; verify event fires with dismiss_count=1
- [ ] **resurface_digest_sent:** Trigger a manual digest send for a test user; verify event fires with correct digest_id, item_count, items array, and timezone
- [ ] **resurface_item_clicked:** Click an item in a test digest email; verify event fires with correct digest_id, item_id, item_position, relevance_score, and destination_url
- [ ] **resurface_unsubscribe:** Click unsubscribe in a test digest email; verify event fires with correct source and days_since_opt_in
- [ ] **resurface_cadence_changed:** Change cadence from daily to 3x/week via email footer; verify event fires with correct previous/new cadence
- [ ] **resurface_digest_skipped:** Trigger skip condition (e.g., empty library for test user); verify event fires with correct skip_reason

### Property Validation

- [ ] Verify `item_position` is a number between 1 and 5
- [ ] Verify `relevance_score` is a number between 0 and 1
- [ ] Verify `cadence` values are only `"daily"` or `"3x_week"` (no other strings)
- [ ] Verify `timezone` is a valid IANA timezone string
- [ ] Verify `destination_url` has query parameters stripped

### Edge Cases

- [ ] Verify `resurface_item_clicked` fires correctly when the user clicks multiple items in the same digest (each click is a separate event)
- [ ] Verify `resurface_digest_sent` does NOT fire when the Resend API returns an error (only fires on HTTP 200)
- [ ] Verify events do not fire for control group users (no opt-in card viewed, no digest sent, no item clicked)
- [ ] Verify `resurface_opt_in` fires only once per tap (debounce prevents double-fire if user taps "Enable Digest" twice quickly)

### Debug Tools

- Amplitude Event Explorer: filter by user_id and event name to verify individual events in real time
- Resend webhook logs: verify that `digest_opened` events match Resend's delivery webhook payloads
- Server logs (Datadog): search for `digest_id` to trace the full lifecycle of a single digest from generation to click
