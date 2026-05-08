---
title: "Measure Instrumentation Spec: Storevine Campaigns"
description: "Storevine B2B ecommerce platform - Campaigns send flow and first-campaign flow analytics instrumentation."
artifact: instrumentation-spec
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: storevine
context: Storevine B2B ecommerce platform . Campaigns send flow and first-campaign flow analytics instrumentation
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Before the Campaigns build sprint begins, Storevine's growth PM and backend engineer define the analytics instrumentation for the four events that will power the first-campaign A/B experiment and the Campaigns adoption dashboard. The spec establishes the event taxonomy, property schema, and QA validation plan used to implement and verify the instrumentation before GA.

**Source Notes:**

- Amplitude documentation (amplitude.com/docs/analytics/what-is-amplitude) . the analytics platform used for Campaigns event tracking; its tracking plan methodology and property naming conventions inform the event taxonomy in this spec.
- GDPR Article 5(1)(c) (gdpr.eu/art-5-how-to-process-personal-data/) . data minimization principle: analytics events must not collect more personal data than necessary for the specified purpose; subscriber email addresses are explicitly excluded from all event properties in this spec.
- Mixpanel, "Tracking Plan Best Practices" (mixpanel.com/blog/tracking-plan/) . establishes the naming convention standard (snake_case, verb+noun) and the tracking plan documentation format applied in this instrumentation spec.

---

## Prompt

```
/instrumentation-spec

Feature: Campaigns . campaign send flow + guided first-campaign flow
Analytics platform: Amplitude

Events I need to instrument:
1. campaign_created . merchant saves a campaign draft
2. campaign_sent . merchant sends a campaign
3. first_send_completed . merchant sends their FIRST campaign ever
   (milestone event for the non-adopter hypothesis)
4. attribution_recorded . a purchase is linked to a campaign click
   within the 7-day attribution window

Prior work:
- Experiment design: A/B test using first_send_completed as primary metric
- Spike summary: SendGrid webhook attribution confirmed; unique_args
  includes campaign_id, merchant_id, recipient_customer_id

PII note: Subscriber email addresses must NOT be sent to Amplitude.
Only customer_id (pseudonymous internal identifier).

Need: full instrumentation spec with event definitions, properties,
PII handling, implementation notes, and QA testing checklist.
```

---

## Output

# Instrumentation Spec: Campaigns Send Flow and First-Campaign Flow

## Overview

**Feature:** Campaigns v1 . campaign creation, send, and first-campaign guided flow

**Analytics Goals:**

1. Can we measure the first campaign send rate for non-adopter merchants within 60 days of GA . the primary metric for the A/B experiment?
2. Can we attribute revenue to specific Campaigns sends using the 7-day attribution window?
3. Can we track campaign creation and send volume to monitor adoption and identify funnel drop-off?

**Analytics Platform:** Amplitude
**Naming Convention:** snake_case, verb+noun pattern (e.g., `campaign_sent`, `attribution_recorded`)

## Event Inventory

### Campaign Created

| Field | Value |
|-------|-------|
| **Event Name** | `campaign_created` |
| **Trigger** | Merchant saves a campaign draft for the first time (new draft creation, not subsequent edits) |
| **Description** | Fires when a merchant creates a new campaign draft . the entry point to the campaign creation funnel |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| merchant_id | string | Yes | Pseudonymous internal identifier for the Storevine merchant account | `"mrch_a1b2c3"` |
| campaign_id | string | Yes | Unique identifier for the campaign draft | `"cmp_x9y8z7"` |
| flow_type | string | Yes | Whether the merchant used the guided flow or the standard flow | `"guided"` or `"standard"` |
| template_source | string | Yes | How the template was selected | `"pre_populated"`, `"named_template"`, or `"blank"` |
| audience_segment | string | Yes | The named segment selected at creation, or `"custom"` if the merchant used the custom filter builder | `"last_90_days"` |
| merchant_customer_count_bucket | string | Yes | Bucketed customer count to avoid PII-adjacent precision | `"0_50"`, `"51_150"`, `"151_250"` |
| experiment_variant | string | No | Set only if the merchant is enrolled in an active experiment | `"control"` or `"treatment"` |

---

### Campaign Sent

| Field | Value |
|-------|-------|
| **Event Name** | `campaign_sent` |
| **Trigger** | Merchant clicks Send and the campaign is successfully submitted to the SendGrid API (202 Accepted response received) |
| **Description** | Fires when a campaign is submitted for delivery . the primary completion event for the campaign creation funnel |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| merchant_id | string | Yes | Pseudonymous internal identifier for the Storevine merchant account | `"mrch_a1b2c3"` |
| campaign_id | string | Yes | Unique identifier for the sent campaign | `"cmp_x9y8z7"` |
| flow_type | string | Yes | Whether the merchant used the guided flow or the standard flow | `"guided"` or `"standard"` |
| recipient_count | number | Yes | Number of recipients the campaign was sent to | `147` |
| audience_segment | string | Yes | The named segment used for this send, or `"custom"` | `"last_90_days"` |
| subject_line_length | number | Yes | Character count of the subject line (not the text itself, to avoid PII collection) | `42` |
| time_to_send_minutes | number | Yes | Minutes elapsed from campaign_created event to campaign_sent event for this campaign | `11` |
| experiment_variant | string | No | Set only if the merchant is enrolled in an active experiment | `"control"` or `"treatment"` |
| is_first_send | boolean | Yes | True if this is the merchant's first ever sent campaign | `true` |

---

### First Send Completed

| Field | Value |
|-------|-------|
| **Event Name** | `first_send_completed` |
| **Trigger** | Fires immediately after `campaign_sent` when `is_first_send = true` . the merchant has sent their first campaign ever |
| **Description** | Milestone event marking the non-adopter merchant's transition to an active email sender; this is the primary metric event for the A/B experiment |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| merchant_id | string | Yes | Pseudonymous internal identifier for the Storevine merchant account | `"mrch_a1b2c3"` |
| campaign_id | string | Yes | The campaign that triggered this milestone | `"cmp_x9y8z7"` |
| flow_type | string | Yes | Whether the guided or standard flow was used for this first send | `"guided"` or `"standard"` |
| days_since_campaigns_activation | number | Yes | Number of days between the merchant's Campaigns account activation and this first send | `3` |
| time_to_first_send_minutes | number | Yes | Total minutes from first Campaigns flow entry to first campaign sent (may span multiple sessions) | `12` |
| merchant_customer_count_bucket | string | Yes | Bucketed customer count at time of first send | `"151_250"` |
| experiment_variant | string | No | Set only if the merchant is enrolled in an active experiment | `"treatment"` |

---

### Attribution Recorded

| Field | Value |
|-------|-------|
| **Event Name** | `attribution_recorded` |
| **Trigger** | A SendGrid click event webhook is received for a recipient, and a purchase by that recipient is found in the Storevine order database within the 7-day attribution window |
| **Description** | Fires when a campaign click is successfully linked to a purchase . the revenue attribution event that powers the Campaigns revenue dashboard |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| merchant_id | string | Yes | Pseudonymous internal identifier for the Storevine merchant account | `"mrch_a1b2c3"` |
| campaign_id | string | Yes | The campaign that the attributed click originated from | `"cmp_x9y8z7"` |
| order_id | string | Yes | The Storevine order ID of the purchase attributed to this campaign | `"ord_p1q2r3"` |
| order_value | number | Yes | Order value in USD (cents, to avoid float precision issues) | `4999` |
| days_to_purchase | number | Yes | Number of days between the email click and the purchase | `2` |
| attribution_window_days | number | Yes | The attribution window configured at the time of attribution | `7` |

---

## User Properties

| Property | Type | Description | Set When | Example |
|----------|------|-------------|----------|---------||merchant_id | string | Pseudonymous internal merchant account identifier | On merchant login; persists across sessions | `"mrch_a1b2c3"` |
| email_tool_status | string | Whether the merchant has an active external email tool integration at the time of the event | Set on login; updated when integration status changes | `"none"`, `"klaviyo"`, `"mailchimp"`, `"other"` |
| merchant_customer_count_bucket | string | Bucketed customer count . updated monthly to avoid PII-adjacent precision | Updated on the first of each month or when customer count crosses a bucket boundary | `"0_50"`, `"51_150"`, `"151_250"`, `"250_plus"` |

## PII & Privacy Considerations

### PII Properties

| Property | PII Type | Handling |
|----------|----------|----------|
| Subscriber email addresses | Email | Do not send . excluded from all event properties. Only customer_id (pseudonymous) is included. |
| Campaign subject line text | Potentially sensitive (may contain merchant-specific information) | Do not send . only subject_line_length (character count) is included |
| Order value | Financial | Send as integer cents . acceptable for aggregated analytics; not PII in isolation |

### Consent Requirements

- Merchants consent to Storevine's analytics data collection through the platform Terms of Service at account creation; no additional consent is required for Campaigns analytics events.
- Subscriber (recipient) email addresses are processed by SendGrid under a separate data processing agreement and must never enter the Amplitude event stream. Only the pseudonymous `customer_id` may be used to link events across the campaign send → attribution → purchase chain.

### Data Retention

- Amplitude event data: 24-month rolling window (Amplitude Growth plan retention policy [fictional]).
- Attribution events table (Storevine database): retained for 36 months to support historical campaign performance reporting.

## Implementation Notes

### SDK/Integration

- **Platform:** Backend (server-side Amplitude SDK)
- **SDK:** Amplitude Server-Side SDK v3.x (Python) [fictional]
- **Initialization:** Amplitude client is initialized with the Campaigns service API key; events are batched and flushed every 10 seconds or at 20 events, whichever comes first [fictional]

### Event Timing

- `campaign_created` must fire at the moment the draft is first saved to the database . not at the campaign configuration step
- `campaign_sent` must fire after the SendGrid API returns a 202 Accepted response; do not fire on a network timeout or queued send without confirmation
- `first_send_completed` fires immediately after `campaign_sent` in the same request context when `is_first_send = true`; do not fire as a background task
- `attribution_recorded` fires from the webhook receiver service when the attribution chain is established; latency of up to 60 seconds after the purchase event is acceptable

## Testing Checklist

### Event Validation

- [ ] **`campaign_created`:** Create a new campaign draft in the staging environment; verify the event fires in Amplitude with all required properties present and correct; verify that subsequent edits to the same draft do NOT fire the event again
- [ ] **`campaign_sent`:** Complete and send a campaign in the staging environment with a test SendGrid API key; verify the event fires only after the 202 Accepted response is received; verify `is_first_send = true` for the first send and `false` for all subsequent sends from the same merchant
- [ ] **`first_send_completed`:** Send a campaign for the first time from a test merchant account with no prior sends; verify both `campaign_sent` and `first_send_completed` fire in the same request; verify `first_send_completed` does NOT fire on the second send from the same account
- [ ] **`attribution_recorded`:** Trigger a synthetic webhook event in the staging environment with valid `unique_args`; verify the attribution chain is established against a test order within the 7-day window and `attribution_recorded` fires with correct `order_id`, `order_value`, and `days_to_purchase`

### Property Validation

- [ ] Verify `flow_type` is `"guided"` when the merchant enters through the guided first-campaign flow and `"standard"` in all other cases
- [ ] Verify `experiment_variant` is present and set correctly for merchants enrolled in the A/B test; verify it is absent for merchants not enrolled
- [ ] Verify `order_value` is an integer (cents), not a float
- [ ] Verify `merchant_customer_count_bucket` is bucketed and not an exact count

### Edge Cases

- [ ] Verify `campaign_created` does not fire if a draft save fails due to a network error (the draft is not yet written to the database)
- [ ] Verify `attribution_recorded` does not fire if the `unique_args` payload is malformed or missing `customer_id`
- [ ] Verify events fire correctly after a session timeout and re-authentication (session ID changes; merchant_id must remain consistent)

### Debug Tools

- Amplitude event validation: use the Amplitude Data debugger (live event stream) in the Campaigns staging workspace to verify events in real time before GA
- SendGrid event log: use the SendGrid activity feed in the staging account to confirm `unique_args` values are present in the webhook payload before attributing the event in the Amplitude implementation
