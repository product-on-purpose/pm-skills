---
title: "Deliver User Stories: Storevine Campaigns"
description: "Storevine B2B ecommerce platform - Campaigns guided first-campaign flow user story."
artifact: user-story
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: storevine
context: Storevine B2B ecommerce platform . Campaigns guided first-campaign flow user story
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

With the Campaigns PRD and Figma specs finalized, Storevine's growth PM worked with the Engineering Lead to translate the guided first-campaign flow into an engineering-ready user story before the sprint kickoff. This story represents the highest-priority Campaigns ticket . the experience that non-adopter merchants see when they launch Campaigns for the first time.

**Source Notes:**

- CAN-SPAM Act (FTC, ftc.gov) . one-click unsubscribe and physical sender address are legally mandatory in every commercial email, directly informing the compliance validation acceptance criteria that must pass before any campaign send is permitted.
- Nielsen Norman Group research on first-use experiences (nngroup.com) . establishes that a guided path producing visible value within the first session is the primary driver of retention for new users of productivity tools, validating the investment in a pre-populated first-campaign flow over a blank-canvas editor.
- SendGrid documentation (sendgrid.com/docs/for-developers/tracking-events/) . technical reference for the email send API and Event Webhook that underlie the `unique_args` attribution event recording requirement in AC-5.

---

## Prompt

```
/user-stories

Project: Campaigns . native email marketing for Storevine merchants
Sprint: Q2 2026 Campaigns build (kickoff Mar 3, GA Apr 28)

Story I need:
  Guided first-campaign flow for non-adopter merchants

Who: Merchant with no active external email tool and no prior Storevine
     email sends (non-adopter segment, ~38% of active base [fictional])
What: Send their first email campaign using a pre-populated template seeded
      with their own products and a default audience
Why: Start driving repeat purchases without needing to figure out email
     marketing from scratch

Prior work to reference:
- Hypothesis: first-send rate target 12% → 30% [fictional] in 60 days
- Spike summary: SendGrid attribution via unique_args confirmed feasible
- Design rationale: pre-built named segments as default audience selection
- PRD: Campaigns v1 scope locked

Need: full user story with acceptance criteria (Given/When/Then),
design notes, technical notes, and dependencies. P0 priority.
```

---

## Output

# User Story: Guided First-Campaign Flow for Non-Adopter Merchants

## Story Header

| Field | Value |
|-------|-------|
| ID | US-CAM-001 |
| Title | Guided first-campaign flow . pre-populated template for non-adopter merchants |
| Persona | Non-adopter merchant (no active external email tool, no prior Storevine campaign sent) |
| Priority | P0 |
| Epic/Feature | Campaigns v1 |
| Estimate | L |

## User Story Statement

**As a** Storevine merchant with no active email marketing program,

**I want** to send my first email campaign using a pre-filled template with my own products and a pre-selected audience of recent customers,

**so that** I can start driving repeat purchases from my existing customer base without needing to understand email marketing tools or build anything from scratch.

## Context & Background

Merchant interviews identified three participants (P3, P6, P8) who have no email program despite acknowledging they should have one. All three cited setup complexity as the barrier: the moment they see a blank template or a list of filter options, they close the tab. The guided first-campaign flow eliminates that moment by presenting a ready-to-send campaign on first open . the merchant's own products in a pre-designed template, addressed to an audience that makes intuitive sense (customers who have already purchased). The hypothesis tied to this story targets an increase in first-send rate from 12% [fictional] to 30% [fictional] within 60 days of GA. This story is the primary delivery mechanism for that hypothesis.

## Acceptance Criteria

### AC-1: First-campaign detection triggers the guided flow

**Given** a merchant has no prior sent campaigns in Campaigns and no existing campaign drafts

**When** the merchant navigates to the Campaigns section of the Storevine admin for the first time

**Then** the system displays the guided first-campaign setup flow (not the standard campaign creation flow or an empty campaigns list)

### AC-2: Template is pre-populated with merchant product data

**Given** the merchant is in the guided first-campaign flow and has at least one published product in their Storevine storefront

**When** the guided flow loads

**Then** the system automatically populates the campaign template with the merchant's top 3 products by sales volume in the last 90 days [fictional], including product image, name, and price pulled directly from the Storevine product catalog . no merchant action required

### AC-3: Audience defaults to recent purchasers

**Given** the merchant is in the guided first-campaign flow and has at least one customer in their Storevine account

**When** the guided flow loads

**Then** the system defaults the audience selection to the "Customers who purchased in the last 90 days" named segment, with the current recipient count displayed (e.g., "147 customers [fictional]") . the merchant may change this selection before sending but is not required to

### AC-4: Compliance validation passes before send is enabled

**Given** the merchant has completed the subject line and confirmed the audience

**When** the merchant clicks "Send campaign"

**Then** the system validates that: (a) a subject line is present and not blank, (b) the merchant account has a physical sender address on file (required by CAN-SPAM), and (c) an unsubscribe link is present in the template . and blocks the send with a specific, actionable error message if any of these checks fail, rather than silently proceeding

### AC-5: Attribution events are recorded for each recipient

**Given** the campaign has passed compliance validation and the merchant has confirmed the send

**When** the system submits the campaign to SendGrid via the send API

**Then** the system includes `unique_args` in the API payload with `campaign_id`, `merchant_id`, and `recipient_customer_id` for each recipient . enabling the attribution webhook receiver to link subsequent purchase events to this campaign within the 7-day attribution window

### AC-6: Post-send confirmation is shown in-app

**Given** the campaign has been submitted to SendGrid and the send API has returned a 202 Accepted response

**When** the send completes

**Then** the system displays an in-app confirmation: the number of recipients the campaign was sent to, the campaign subject line, and a message directing the merchant to check the Campaigns dashboard in 24 - 48 hours to see open rates and revenue attributed . replacing the guided flow with the standard Campaigns dashboard view

## Design Notes

- The guided flow must not display a "start from blank" option in the primary view; the pre-populated template is the only path. A small-text link "Start from scratch instead" may appear below the template, but it must not compete visually with the primary CTA.
- The audience selection step displays the named segment library (per the audience selection design rationale) with "Customers who purchased in the last 90 days" pre-selected. The merchant can change the selection; the recipient count updates dynamically when a new segment is selected.
- If the merchant has fewer than 3 published products, the template is populated with however many products are available; if zero products are published, the template shows a placeholder with a prompt to publish a product before continuing.
- Error states for AC-4 must follow the Error Messages spec from the edge cases document: plain language, specific cause, immediate next action.
- Figma: Campaigns guided first-campaign flow v4 spec (internal . Figma workspace)

## Technical Notes

- First-campaign detection: query the `campaigns` table for the current `merchant_id` with `status IN ('sent', 'scheduled')`; if zero records returned, display guided flow.
- Product pre-population: query the `products` table ordered by `total_sales_last_90_days DESC` [fictional] with `status = 'published'`; limit 3.
- `unique_args` payload structure: `{ "campaign_id": "<uuid>", "merchant_id": "<uuid>", "recipient_customer_id": "<uuid>" }` . one entry per recipient. See spike summary for the confirmed schema.
- SendGrid send API: POST to `/v3/mail/send`; each recipient is a separate personalization object to enable per-recipient `unique_args`. This impacts payload size at high recipient counts; Platform Squad to confirm batch size limits before implementation.
- The 202 Accepted response from SendGrid confirms the campaign has been accepted for delivery; it does not confirm delivery to individual inboxes. The in-app confirmation copy should reflect this (avoid "Your campaign has been delivered" . use "Your campaign has been sent").

## Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| `unique_args` attribution schema (US-CAM-002) | Story | Blocked . must be merged before this story is implemented |
| SendGrid API contract (`unique_args` field spec) | Engineering spec | Ready (confirmed in spike summary) |
| Audience selection named segment library (US-CAM-003) | Story | Blocked . named segments must be defined and queryable before the guided flow can default to one |
| Physical sender address field in merchant account settings | Existing feature | Ready . field exists in account settings; validation logic is new |
| CAN-SPAM/GDPR Legal sign-off | Legal | In progress . required before any send functionality is enabled in production |

## Out of Scope

- Scheduled send (time-delayed campaigns): the guided first-campaign flow is send-immediately only in v1; scheduling is a standard campaign creation feature available after the first send
- A/B testing for subject line or content: not in Campaigns v1
- Klaviyo list import or template migration: not in v1 guided flow

## Open Questions

- [ ] If a merchant has zero customers in their account (very new stores), should the guided flow be shown with a "You don't have any customers yet" state, or should the Campaigns entry point be suppressed until the first customer is recorded?
- [ ] Should the product pre-population use the last-90-days sales window or best-all-time sales? For merchants with very recent store launches, the 90-day window may return fewer than 3 products even if they have products published. Define the fallback logic before implementation.
