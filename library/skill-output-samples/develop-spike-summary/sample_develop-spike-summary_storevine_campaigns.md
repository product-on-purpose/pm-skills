---
title: "Develop Spike Summary: Storevine Campaigns"
description: "Storevine B2B ecommerce platform - revenue attribution feasibility spike for Campaigns v1."
artifact: spike-summary
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: storevine
context: Storevine B2B ecommerce platform . revenue attribution feasibility spike for Campaigns v1
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

After the opportunity tree identified revenue attribution as a launch-gate requirement and the engineering ADR selected SendGrid as the Campaigns email delivery infrastructure, the Engineering Lead assigned a one-week spike to confirm whether SendGrid open/click webhook events could be linked to Storevine purchase records to power attribution within the v1 timeline. The spike conclusion directly unblocks sprint planning for the Campaigns backend.

**Source Notes:**

- SendGrid Event Webhook documentation (sendgrid.com/docs/for-developers/tracking-events/) . public documentation confirming the event payload structure, the `unique_args` custom data field, and the supported event types (open, click, unsubscribe, spam report) that formed the basis of the spike implementation.
- Klaviyo, "Understanding Attribution" (help.klaviyo.com) . documents Klaviyo's default attribution window (5-day click, 1-day open) as the category benchmark, establishing the range within which Campaigns' 7-day window is positioned as a merchant-friendly default.
- Shopify Developer documentation (shopify.dev/docs/apps/marketing/attribution) . describes deferred and multi-touch attribution models for ecommerce email marketing, confirming that most email-driven purchases occur outside the originating browser session and require window-based rather than session-based attribution.

---

## Prompt

```
develop-spike-summary

Spike: Revenue attribution feasibility . can SendGrid open/click webhooks
be linked to Storevine purchase events within v1 timeline?

Context:
- Revenue attribution is a launch-gate requirement (confirmed in interview
  synthesis and opportunity tree)
- Engineering ADR selected SendGrid for Campaigns email delivery
- Engineering Lead asked for a 1-week spike before sprint planning

What we investigated:
- SendGrid Event Webhook payload structure and custom data fields
- Whether Storevine's customer_id can survive the email→purchase journey
- POC: send a test campaign, receive webhook, match to staging order
- Attribution window design: real-time vs. deferred (7-day)

Need: full spike summary with findings, recommendation, and follow-up
items. Will share with PM and Engineering Lead to unblock sprint planning.
```

---

## Output

# Spike Summary: Revenue Attribution via SendGrid Event Webhooks

## Overview

| Field | Value |
|-------|-------|
| **Question to Answer** | Can SendGrid open/click webhook events be linked to Storevine purchase records to power revenue attribution in Campaigns v1 within the current sprint timeline? |
| **Time-Box** | 5 business days |
| **Actual Time Spent** | 4.5 business days |
| **Spike Lead** | Backend Engineer, Platform Squad |
| **Date Completed** | February 18, 2026 |

## Background

Revenue attribution . the ability for merchants to see which email campaigns drove which purchases and how much revenue each campaign generated . was identified as a launch-gate requirement in the merchant interview synthesis. Interview Insight 3 stated: "Every merchant who uses a third-party tool cited revenue attribution as a feature they rely on. Without attribution, merchants cannot make the business case to keep using the tool." The engineering ADR signed during PRD review selected SendGrid as the Campaigns email delivery infrastructure, which introduced the question of whether SendGrid's event data could be reliably connected to Storevine's existing order database without a new data warehouse or third-party analytics integration.

## Approach

### What We Tried

1. **Review SendGrid Event Webhook documentation** to confirm which event types are available, what data is included in each payload, and whether custom metadata can be attached at send time to create the attribution link. This established the theoretical basis for the approach before writing any code.

2. **Map the attribution data model** . identify the minimum data fields needed to connect a SendGrid event (email recipient + event type + timestamp) to a Storevine customer record and, from there, to a subsequent purchase in the order database. The critical question was whether `customer_id` could be preserved through the email send without requiring a separate lookup table.

3. **Implement a proof-of-concept** in the Storevine staging environment: send a test campaign via SendGrid using the Campaigns send API stub, receive the open and click events via a webhook receiver endpoint, and record the attribution event against a test order. Measure event delivery latency and confirm data integrity across the full chain.

4. **Evaluate attribution window options** (real-time vs. 7-day deferred) to determine which model is appropriate for Campaigns v1 . accounting for the share of email-driven purchases that occur after the original browser session closes or on a different device.

### Technologies/Tools Evaluated

- SendGrid Event Webhook API (event types: open, click, unsubscribe, spam report)
- SendGrid `unique_args` custom metadata field (attached at send time; preserved in all downstream event payloads)
- Storevine staging order database (PostgreSQL; `orders` table with `customer_id`, `created_at`, and `session_source` fields)
- Lightweight webhook receiver implemented in the existing Storevine backend service layer

## Findings

### Finding 1: SendGrid `unique_args` is the attribution mechanism . and it works as needed

SendGrid's Event Webhook payload includes a `unique_args` field that accepts arbitrary key-value metadata attached at send time. By including `campaign_id`, `merchant_id`, and `recipient_customer_id` in the `unique_args` for every Campaigns send API call, the webhook receiver can reconstruct the attribution relationship (customer → campaign → purchase) without a separate lookup table or database join.

**Evidence:**
- SendGrid documentation confirms `unique_args` is available on all send types and is preserved in all downstream event payloads (open, click, unsubscribe, spam report)
- POC test confirmed `unique_args` values arrive intact in the webhook payload; no data loss observed in 50 test events [fictional]
- No additional infrastructure required: `unique_args` is a standard SendGrid feature, not a paid add-on

### Finding 2: A new attribution events table is required . lightweight, no warehouse needed

Connecting SendGrid click events to Storevine purchases requires a new `attribution_events` table in the Storevine order database that records the `customer_id`, `campaign_id`, `event_type`, and `event_timestamp` for each received webhook. Purchase attribution is then computed by joining this table to the `orders` table on `customer_id` within the defined attribution window. No data warehouse, third-party analytics platform, or ETL pipeline is required for v1.

**Evidence:**
- Schema design drafted during the spike; estimated 2 database columns and 3 new API endpoints [fictional]
- The existing PostgreSQL instance supports the additional write volume without schema migration risk based on current load profiles [fictional]

### Finding 3: A 7-day click attribution window is the right default for v1

Real-time attribution (purchase within the same browser session as the email click) is technically possible but excludes a significant share of email-driven purchases: those where the customer clicks on mobile, considers the purchase later, and buys on desktop . or closes the tab and returns within the week. A 7-day window (purchase within 7 days of email click, attributed to the most recent Campaigns click event for that customer) captures the realistic email-to-purchase cycle for the small merchant segment without over-counting.

**Evidence:**
- POC measured average SendGrid webhook delivery latency of 1.8 seconds [fictional] in the staging environment . well within the threshold for deferred attribution
- Klaviyo's default attribution window is 5-day click / 1-day open; Campaigns' 7-day click window is slightly more generous and better suited for merchants in lower-frequency purchase categories (fashion, home goods) where the consideration cycle is longer
- A 7-day window is consistent with Shopify's marketing attribution model for email apps on its platform

## Recommendation

**Decision:** Proceed with Conditions

Revenue attribution via SendGrid Event Webhooks is technically feasible within the v1 timeline. The implementation is lighter than anticipated . no data warehouse, no new third-party integration, and no changes to the existing SendGrid send infrastructure beyond adding `unique_args` to the send payload. Attribution is achievable with a new database table and a webhook receiver endpoint in the existing backend service.

### If Proceeding

- Insert `campaign_id`, `merchant_id`, and `recipient_customer_id` into `unique_args` for all Campaigns send API calls; this must be specified in the send API contract before the backend build begins
- Create an `attribution_events` table in the Storevine order database; schema design from this spike is ready for engineering review
- Implement a webhook receiver endpoint that validates SendGrid signatures, parses the payload, and writes attribution events to the new table . estimated M effort [fictional]
- Attribution UI in the Campaigns dashboard (revenue per campaign, revenue per recipient segment) is a separate frontend ticket; the backend infrastructure from this spike is the dependency

## Artifacts

| Artifact | Location | Description |
|----------|----------|-------------|
| POC webhook receiver | Internal repo: `campaigns/spikes/attribution-poc` | Proof-of-concept endpoint; not production-ready; reference only |
| Attribution events schema draft | Internal repo: `campaigns/spikes/attribution-schema.sql` | Draft `attribution_events` table DDL for engineering review |
| SendGrid `unique_args` payload spec | Internal repo: `campaigns/spikes/sendgrid-payload-spec.md` | Documented `unique_args` structure for use in the send API contract |

## Open Questions

- [ ] Should Campaigns v1 support click-only attribution or also open-based attribution? Open events are less reliable than click events (iOS Mail's Mail Privacy Protection creates false opens); click-only is the more defensible default, but it should be explicitly decided before dashboard copy is written.
- [ ] What is the UI treatment for campaigns with zero revenue attribution . is it "No purchases recorded within 7 days" or is it hidden until the window closes? Design needs guidance on the empty state before Figma specs are finalized.
- [ ] Does the 7-day attribution window need to be merchant-configurable in v1? Advanced merchants may want to adjust the window; exposing this as a setting adds UI complexity and support overhead. Recommend locking at 7 days for v1 and making it configurable in v2 if merchants request it.

## Follow-up Items

| Action | Owner | Timeline |
|--------|-------|----------|
| Add `unique_args` specification to Campaigns send API contract | Engineering Lead | Feb 21, 2026 |
| Review attribution events schema draft with backend team | Backend Engineer | Feb 24, 2026 |
| Share open question on click-only vs. open attribution with PM for decision | Engineering Lead | Feb 21, 2026 |
| Add attribution UI ticket to Campaigns dashboard design backlog | Growth PM | Feb 24, 2026 |
