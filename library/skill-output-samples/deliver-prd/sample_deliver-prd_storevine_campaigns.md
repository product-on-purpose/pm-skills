---
title: "Deliver PRD: Storevine Campaigns"
description: "Storevine B2B ecommerce platform - Campaigns (built-in email marketing)."
artifact: prd
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: storevine
context: Storevine B2B ecommerce platform . Campaigns (built-in email marketing)
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Storevine is a B2B all-in-one ecommerce and web platform serving ~18,000 active
merchants [fictional]. Churn analysis and exit surveys from Q4 2025 identified email
marketing gaps as a top-three cancellation reason, with merchants citing the need to
manage a separate Klaviyo or Mailchimp account as a primary friction point. The PM
has completed a competitive analysis and problem statement, validated the solution
direction with engineering and growth leads, and is ready to hand off a scoped
v1 to engineering.

**Source Notes:**

- Klaviyo's S-1 filing (September 2023) reported ~130,000 paying customers at IPO,
  with Shopify as its largest platform integration partner . illustrating the scale
  of the email-marketing-for-ecommerce opportunity that platforms are now competing
  to internalize.
- Shopify launched Shopify Email in 2019, offering 10,000 free emails/month to all
  merchants as a native feature, validating the platform-consolidation strategy for
  email marketing.
- The CAN-SPAM Act (2003) and GDPR (2018) set the compliance floor for commercial
  email: one-click unsubscribe, physical sender address, honest subject lines, and .
  under GDPR . documented consent for EU residents.
- Mailchimp's free tier (500 contacts, 1,000 sends/month) and Klaviyo's
  ecommerce-specific segmentation are the two tools Storevine merchants most
  commonly use when they patch the gap with external tooling.

---

## Prompt

```
deliver-prd

Feature: Campaigns . native email marketing for Storevine merchants

Context: Storevine all-in-one ecommerce + web builder, ~18k active merchants
[fictional]. See: competitive-analysis (filed last week), problem-statement
(Q4 discovery doc).

Discovery: Email marketing is a top-3 churn driver. Exit survey: 22% of churned
accounts in Q4 cited "had to use a separate email tool" as a primary reason
[fictional]. Power merchants patch with Klaviyo or Mailchimp; smaller merchants
skip email entirely because setup friction is too high.

Validated solution: Built-in Campaigns . broadcast email + basic audience
segmentation. Phase 1 email only, SMS deferred. Pre-built templates, audience
builder using order/tag data we already have. No custom HTML editor v1.

Success targets:
- 40% of active merchants send ≥1 campaign in first 90 days post-launch [fictional]
- Reduce email-churn contribution by 30% at 6 months [fictional]
- Campaigns becomes a net-new revenue line (paid tier above free send limit)

Scope locked with eng: v1 = broadcast email + 3 automations (abandoned cart,
welcome, re-engagement). No SMS, no A/B testing, no multi-step sequences.

Technical decisions already made:
- Sending via SendGrid (existing account)
- Audience builder queries existing customer/order tables . no new pipeline
- Legal review on CAN-SPAM + GDPR required before launch (not yet started)

Stakeholders: Growth PM (owner), Eng Lead (aligned), Design (in progress),
Legal (needs to review compliance section), Marketing (will dog-food).
```

---

## Output

# PRD: Storevine Campaigns

## Overview

### Problem Statement

Storevine merchants who want to run email marketing campaigns must leave the
platform to set up a separate tool . most commonly Klaviyo, Mailchimp, or Shopify
Email. This fragmented workflow increases operational complexity and creates a clear
retention gap: exit survey analysis shows email marketing gaps were cited by 22% of
churned accounts in Q4 2025 [fictional] as a primary reason for cancellation.
Smaller merchants skip email marketing entirely due to the friction of integrating
an external tool, leaving re-engagement and re-purchase revenue uncaptured.

See [Problem Statement: Email Marketing Gap . Q4 Discovery](#) for the full
analysis.

### Solution Summary

Campaigns is a native email marketing feature built into Storevine. Merchants build
an audience from their existing customer and order data, compose emails using
pre-built templates, and send broadcast or trigger-based campaigns . all without
leaving the platform. Version 1 covers email only; SMS is deferred to v2. Three
automations are included at launch: abandoned cart, welcome series, and
re-engagement.

### Target Users

- **Primary:** Small-to-mid-size merchants (≤500 customers) currently skipping
  email marketing due to tool setup friction
- **Secondary:** Power merchants (500+ customers) paying for Klaviyo or Mailchimp
  who would consolidate to Storevine to reduce tool sprawl and cost
- **Internal:** Storevine Marketing team, who will use Campaigns for
  merchant-facing communications (dog-food use case)

## Goals & Success Metrics

### Goals

1. Remove email-marketing-related churn by eliminating the "had to use a separate
   tool" friction point
2. Establish Campaigns as a net-new revenue line through a paid tier above a free
   send limit
3. Increase merchant engagement: merchants who send campaigns have higher LTV and
   lower churn risk

### Success Metrics

| Metric | Current Baseline | Target | Timeline |
|--------|-----------------|--------|----------|
| Merchants sending ≥1 campaign/mo | 0% (feature absent) | 40% of active merchants [fictional] | 90 days post-launch |
| Email-marketing churn contribution | 22% of churned accounts [fictional] | ≤15% [fictional] | 6 months post-launch |
| Campaigns paid-tier revenue | $0 | Established revenue line [fictional] | End of Q3 2026 |
| NPS among active Campaigns users | . | ≥45 [fictional] | 90 days post-launch |

### Non-Goals

- SMS campaigns . deferred to v2
- A/B testing of subject lines or content . requires sufficient list volume; v2
- Advanced automation (multi-step sequences, conditional branching) . v2
- Custom HTML email editor . template library covers estimated 85% of use cases; v2
- Transactional emails (order confirmation, shipping) . handled by existing system
- Native landing page builder tied to campaigns

## User Stories

| ID | User Story | Priority |
|----|-----------|----------|
| US-1 | As a merchant, I want to create a campaign from a pre-built template so that I can launch without design skills | P0 |
| US-2 | As a merchant, I want to select an audience segment based on purchase history so that I can target relevant customers | P0 |
| US-3 | As a merchant, I want to schedule a campaign for a future date so that I can plan my marketing calendar | P0 |
| US-4 | As a merchant, I want to see open rate, click rate, and attributed revenue per campaign so that I can measure effectiveness | P0 |
| US-5 | As a merchant, I want customers to unsubscribe with one click so that I remain compliant with email regulations | P0 |
| US-6 | As a merchant, I want an abandoned cart email to trigger automatically so that I can recover lost sales without manual work | P1 |
| US-7 | As a merchant, I want a welcome email to send to new subscribers automatically so that I start every relationship immediately | P1 |
| US-8 | As a merchant, I want to import an existing email list so that I can reach customers acquired before using Storevine | P1 |

See [User Stories . Campaigns v1](#) for full acceptance criteria.

## Scope

### In Scope

- Campaign creation using template library (8 - 12 templates at launch)
- Drag-and-drop content editor (no custom HTML)
- Audience builder: filter by purchase count, total spend, customer tags,
  subscription date, last order date; AND/OR logic; real-time size estimate
- Saved segments for reuse across campaigns
- Single-send (broadcast) campaigns and scheduled sending
- Three trigger automations: abandoned cart (1-hour delay), welcome series
  (on subscription), re-engagement (90-day inactivity, configurable 30 - 180 days)
- Campaign analytics: sends, open rate, click rate, unsubscribe rate, revenue
  attributed within 5 days of open
- CSV import for existing email lists
- CAN-SPAM compliance: unsubscribe link, physical address, honest subject lines
- GDPR: consent timestamp and source recorded per subscriber
- Free tier: 1,000 emails/month; paid tier above that limit

### Out of Scope

- SMS campaigns
- A/B testing
- Custom HTML email editor
- Advanced multi-step automation sequences
- Email deliverability reporting (bounces, spam complaints) . v2
- Social posting or multi-channel campaigns
- Transactional emails

### Future Considerations

- **SMS (v2):** High merchant demand but requires carrier compliance, opt-in flows,
  and separate sending infrastructure . deferred to isolate launch risk
- **Advanced automation (v2):** Multi-step sequences need a workflow engine;
  architecture decision required before design begins
- **A/B testing (v2):** Valid results require list sizes most Storevine merchants
  won't have at launch; add when median list size makes testing statistically viable
- **Custom HTML editor (v2):** Significant QA surface across email clients; template
  library covers the majority of v1 use cases

## Solution Design

### Functional Requirements

#### Campaign Creation

- FR-1: Merchants can create a new campaign from the Campaigns dashboard
- FR-2: Campaign creation follows a linear wizard: Name → Template → Audience →
  Content → Schedule → Review & Send
- FR-3: Template library offers 8 - 12 templates at launch (promotional, seasonal,
  newsletter, re-engagement)
- FR-4: Drag-and-drop editor supports text blocks, image blocks, CTA buttons,
  dividers, and logo placement
- FR-5: Merchants can preview campaigns in desktop and mobile views before sending

#### Audience Builder

- FR-6: Merchants segment audiences using AND/OR logic across: purchase count,
  total spend, customer tags, subscription date range, last order date range
- FR-7: Audience size estimate updates in real time as filters are applied
- FR-8: Merchants can save segments for reuse across future campaigns
- FR-9: CSV import supports custom email lists with duplicate detection against
  existing customers; invalid rows are flagged in an import summary

#### Sending and Scheduling

- FR-10: Merchants can send immediately or schedule for a specific date and time
- FR-11: Scheduled sends can be edited or canceled up to 15 minutes before send time
- FR-12: System enforces a 24-hour per-customer cooling period within a campaign
  series to prevent double-sending

#### Automations

- FR-13: Abandoned cart trigger fires when a customer adds to cart but does not
  complete checkout within 1 hour
- FR-14: Welcome trigger fires when a new subscriber joins the merchant's list
- FR-15: Re-engagement trigger fires when a subscribed customer has placed no order
  in N days (default 90; merchant-configurable 30 - 180)
- FR-16: Each automation supports a single email in v1; multi-step sequences are
  out of scope

#### Analytics

- FR-17: Campaign detail view shows total sent, open rate, click rate, unsubscribe
  rate, and revenue attributed (purchases within 5 days of open)
- FR-18: Campaigns list shows summary metrics per campaign with trend indicators
- FR-19: Analytics are available 24 hours post-send; real-time analytics are not
  a v1 requirement

#### Compliance

- FR-20: Every outbound email includes a one-click unsubscribe link (CAN-SPAM)
- FR-21: Merchant's physical address is required in account settings before
  Campaigns can be activated
- FR-22: Unsubscribes are honored immediately for future sends and reflected in
  list view within 48 hours
- FR-23: Consent timestamp and source are recorded per subscriber and retained
  for GDPR audit purposes

### User Experience

**Campaign creation flow:**

1. Merchant navigates to Marketing → Campaigns → New Campaign
2. Wizard: Name it → Pick template → Build audience → Edit content →
   Set schedule → Review → Send/Schedule
3. Post-send: confirmation screen with link to analytics (available T+24h)

**Automations setup:**

1. Automations tab lists the three available automations with status (on/off)
2. Each automation has a single-click enable/disable toggle
3. Merchants can edit the template for each automation independently
4. Re-engagement automation: merchant sets the inactivity threshold

**Visual design principles:**

- Campaigns accessible from left-nav under "Marketing"
- Campaign status badges: Draft / Scheduled / Sent / Active (automations)
- Analytics: line chart for opens/clicks over time; attributed revenue displayed
  prominently as a dollar figure

See [Figma: Campaigns v1 Design Specs](#) for full wireframes.

### Edge Cases

| Scenario | Expected Behavior |
|----------|------------------|
| Merchant sends to a 0-subscriber segment | Validation error before send: "Your audience has 0 eligible recipients." |
| Customer unsubscribes mid-send during a large blast | Unsubscribe processed immediately; customer excluded from remaining sends in current batch |
| CSV import contains invalid email formats | Import proceeds; invalid rows flagged in summary ("12 addresses skipped . invalid format") |
| Abandoned cart fires but customer has since purchased | Trigger suppressed for that cart session; customer not emailed |
| Merchant exceeds free tier limit with a scheduled campaign | Campaign paused; email to merchant: "Upgrade to Campaigns Pro to send." |
| GDPR deletion request for a subscribed customer | Customer removed from all lists; historical send analytics aggregated, not deleted, for campaign integrity |

## Technical Considerations

### Constraints

- Email sending must use SendGrid (existing account); Storevine does not manage
  its own MTA
- Campaign data (content, audiences, analytics events) stored in Storevine's
  existing PostgreSQL infrastructure . no new database service for v1
- CAN-SPAM compliance is a hard launch gate; legal review must complete before
  any production sends
- Free tier send limit (1,000 emails/month) enforced server-side to prevent abuse

### Integration Points

- **SendGrid:** Outbound sending API; inbound webhooks for open/click tracking;
  bounce and spam complaint webhooks (logged, not surfaced in v1 analytics UI)
- **Storevine Orders & Customers DB:** Audience builder queries existing customer
  and order tables . no ETL pipeline needed for v1
- **Billing system:** Paid tier requires integration with existing Storevine
  subscription management; usage metered by emails sent per calendar month
- **Storevine Cart:** Abandoned cart trigger subscribes to the existing
  cart-abandonment event stream . confirm event exists with platform team

### Data Requirements

- New tables: `campaigns`, `campaign_sends`, `campaign_events` (open/click),
  `subscriber_lists`, `automations`
- Subscriber consent: `consent_timestamp` and `consent_source` required (GDPR)
- Soft delete for unsubscribes: `unsubscribed_at` timestamp; never hard delete
  (required for compliance audit trail)
- Data retention: campaign send records 24 months; analytics events 12 months
- No new PII beyond email address and consent metadata introduced by this feature

## Dependencies & Risks

### Dependencies

| Dependency | Owner | Status | Impact if Delayed |
|------------|-------|--------|-------------------|
| SendGrid API integration | Platform Eng | Not started | Blocks all sending; critical path |
| Abandoned cart event confirmation | Platform Eng | Needs confirmation | Blocks abandoned cart automation |
| Legal review: CAN-SPAM / GDPR | Legal | Not started | Hard launch gate; cannot launch without |
| Figma design specs (Campaigns v1) | Design | In Progress | Delays frontend development start |
| Billing tier integration | Growth Eng | Backlogged | Blocks paid-tier launch; can ship free-only first |

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Email deliverability issues (spam flagging) | Medium | High | Leverage SendGrid reputation management; enforce list hygiene requirements; suppress unverified imports |
| GDPR gaps found during legal review | Low | High | Start legal review in parallel with design; do not launch to EU without sign-off |
| Merchants using Klaviyo + Storevine simultaneously feel conflicted | Medium | Medium | Audit current Klaviyo integration users before launch; communicate Campaigns does not replace Klaviyo for high-volume users |
| Low adoption if template quality underwhelms | Medium | Medium | User-test templates with 5+ merchants before launch; hire contract copywriter for initial library |
| Paid tier pricing too high → free tier becomes permanent | Low | Medium | Price benchmarked against Mailchimp free tier; monitor upgrade conversion at 60 days post-launch |

## Timeline & Milestones

| Milestone | Description | Target Date |
|-----------|-------------|-------------|
| Legal Review Complete | CAN-SPAM / GDPR compliance confirmed | Mar 6, 2026 |
| Design Specs Approved | Final Figma mockups signed off | Mar 13, 2026 |
| Backend: Core API | SendGrid integration, campaign data model, audience builder | Apr 3, 2026 |
| Backend: Automations | Abandoned cart, welcome, re-engagement triggers | Apr 17, 2026 |
| Frontend Complete | Full campaign creation and analytics UI | May 1, 2026 |
| Internal Beta | Dog-food with Storevine Marketing team | May 8, 2026 |
| Closed Beta | 50 invited merchants [fictional] | May 22, 2026 |
| GA Launch | 100% rollout with paid tier enabled | Jun 6, 2026 |

## Open Questions

- [ ] Does the platform team have an abandoned cart event in the event stream, or
  does this need to be instrumented from scratch? . Owner: Platform Eng
- [ ] Will GDPR consent requirements change the current subscriber import flow for
  EU merchants? . Owner: Legal
- [ ] Should the free tier limit (1,000 emails/month) be per merchant account or
  per subscriber list? . Owner: Growth PM
- [ ] What is the right revenue attribution window? (Currently proposing 5 days
  from open) . Owner: Growth PM + Data
- [x] SMS in v1? . **Decision: No. Deferred to v2.**
- [x] Custom HTML editor in v1? . **Decision: No. Template library only.**

## Appendix

### Related Documents

- [Problem Statement: Email Marketing Gap . Q4 Discovery](#)
- [Competitive Analysis: Email Marketing for Ecommerce](#)
- [User Interviews: Merchant Email Marketing Needs](#)
- [Figma: Campaigns v1 Design Specs](#)
- [Technical Design: Campaigns Data Model and SendGrid Integration](#)

### Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | Feb 13, 2026 | Maya R. | Initial draft from discovery synthesis |
| 0.2 | Feb 18, 2026 | Maya R. | Scope locked with eng; technical constraints added |
| 1.0 | Feb 20, 2026 | Maya R. | Final draft; legal and design dependencies documented |
