---
title: "Iterate Refinement Notes: Storevine Campaigns"
description: "Storevine B2B ecommerce platform - Campaigns v1.1 sprint refinement session."
artifact: refinement-notes
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: storevine
context: Storevine B2B ecommerce platform . Campaigns v1.1 sprint refinement session
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Two weeks after the guided first-campaign flow shipped as default (July 10, 2026), Storevine's growth PM facilitated the first refinement session for the Campaigns v1.1 sprint . covering EU merchant access, per-campaign analytics improvements, the follow-on template depth experiment, and the abandoned cart email trigger. Three of the four stories were fully refined; one was blocked pending Legal sign-off on the EU consent data model, and the abandoned cart story required splitting into four child stories before it could be estimated.

**Source Notes:**

- Scrum Guide 2020 (scrumguides.org) . the canonical reference for Product Backlog Refinement; the session follows the recommended format of discussing acceptance criteria, resolving open questions, and estimating only stories that reach a shared understanding of scope.
- GDPR Article 7 (gdpr.eu/art-7-conditions-for-consent/) . explicit consent requirement that defines the legal basis for the EU merchant access blocker; Storevine's consent data model for EU merchants must satisfy Article 7 before subscriber data from EU merchants can be processed by SendGrid.
- Amplitude documentation (amplitude.com/docs/analytics/charts) . the analytics platform used for Campaigns event tracking; the open rate and click rate metrics being refined in CAM-089 are powered by Amplitude event data and require a dashboard query, not a new instrumentation event.

---

## Prompt

```
/refinement-notes

Session: Campaigns v1.1 refinement
Date: July 22, 2026, 10:00 AM, 60 minutes
Sprint preparing for: Sprint 12 . Campaigns v1.1
Facilitator: Growth PM

Stories on the agenda:
1. CAM-088: EU merchant GDPR consent data model
2. CAM-089: Per-campaign open rate and click rate analytics
3. CAM-090: Follow-on experiment . 3 vs. 5 products in guided template
4. CAM-091: Abandoned cart email trigger

Key constraints:
- Legal has not yet signed off on the EU consent model (CAM-088)
- Backend Engineer flagged ambiguity on the open rate denominator
  (CAM-089): Amplitude delivered-event count vs. SendGrid recipient count
- CAM-091 may need to be split . scope spans 4 engineering domains

Need: full refinement notes for Sprint 12 planning.
```

---

## Output

# Refinement Notes: July 22, 2026

## Session Info

| Attribute | Value |
|-----------|-------|
| **Date** | July 22, 2026, 10:00 AM |
| **Duration** | 60 minutes [fictional] |
| **Facilitator** | Growth PM |
| **Sprint Preparing For** | Sprint 12 . Campaigns v1.1 [fictional] |

### Attendees

- [x] Growth PM *(facilitator)*
- [x] Engineering Lead, Platform Squad
- [x] Backend Engineer
- [x] Design Lead
- [x] QA Lead
- [ ] Merchant Success Lead *(absent . async notes sent ahead of session)*

---

## Summary

**Stories Discussed:** 4
**Stories Refined (Ready):** 2
**Stories Needing More Work:** 1
**Blocked:** 1
**Total Points Estimated:** 8 [fictional] (Ready stories only)

---

## Stories Refined

### CAM-089: Per-Campaign Open Rate and Click Rate

| Attribute | Value |
|-----------|-------|
| **Points** | 5 [fictional] |
| **Status** | Ready |
| **Assignee** | Backend Engineer |

**Discussion Notes:**
- Backend Engineer confirmed that Amplitude already captures `email_opened` and `email_clicked` events per `campaign_id`; implementing open rate and click rate for v1.1 is a dashboard query addition, not a new instrumentation event
- Open rate denominator question was raised (see Questions Raised); team agreed to resolve before implementation begins
- Growth PM confirmed the metrics should appear on the Campaign detail page, not on the main Campaigns dashboard . the main dashboard tracks aggregate adoption metrics, not per-campaign performance

**Scope Changes:**
- Limit to last-30-days window for v1.1; historical backfill of open/click rates for pre-v1.1 campaigns is deferred (see Parking Lot)
- Per-campaign metrics appear in a read-only Campaign detail view; no filtering or sorting on these metrics in v1.1

**Acceptance Criteria Confirmed:**
- [x] Open rate displayed as a percentage on the Campaign detail page; denominator confirmed to be SendGrid delivered-event count (resolved in Questions)
- [x] Click rate displayed as a percentage on the Campaign detail page; click-through rate denominator is unique recipients who received the campaign (not unique opens)
- [x] Both metrics are visible only for campaigns sent within the last 30 days; older campaigns display a "Data available for campaigns sent in the last 30 days" message
- [x] Metrics are read-only; no editing or export from the Campaign detail page in v1.1
- [ ] Historical backfill logic *(deferred to v1.2 . not an acceptance criterion for this story)*

---

### CAM-090: Follow-on Experiment . 3 vs. 5 Products in Guided Template

| Attribute | Value |
|-----------|-------|
| **Points** | 3 [fictional] |
| **Status** | Ready |
| **Assignee** | Backend Engineer (instrumentation) + Design Lead (template variant) |

**Discussion Notes:**
- Design Lead confirmed the Figma spec for the 5-product template variant is ready; the variant shows the top 5 products by sales volume (last 90 days [fictional]) instead of the current top 3
- Experiment will use the existing `campaigns_guided_first_campaign_flow` feature flag infrastructure; a new `template_product_count` variant dimension will be added
- QA Lead noted that the 5-product template needs mobile viewport testing . the 3-product layout was explicitly designed for mobile; Design Lead confirmed mobile spec for 5-product is included in the Figma file

**Scope Changes:**
- Experiment runs for 30 days (not 60) . the effect size from the primary experiment was large enough that a 30-day window provides sufficient power to detect a material difference in completion rate [fictional]
- Primary metric: campaign_sent completion rate from the guided flow (not first-send rate, which is already validated)

**Acceptance Criteria Confirmed:**
- [x] `experiment_variant` property on `campaign_created` event correctly distinguishes 3-product and 5-product template variants
- [x] 5-product template renders correctly on iOS Safari and Android Chrome at 375px viewport width [fictional]
- [x] Experiment traffic allocation: 50/50 split; variant assignment at `merchant_id` level (deterministic)
- [x] Experiment can be paused or extended via the existing feature flag without a code deploy

---

### CAM-088: EU Merchant GDPR Consent Data Model

| Attribute | Value |
|-----------|-------|
| **Points** | . (not estimated) |
| **Status** | Blocked |
| **Assignee** | Backend Engineer (implementation, pending Legal guidance) |

**Discussion Notes:**
- Backend Engineer presented three technical options for EU consent collection: (a) a double opt-in flow at merchant subscriber import, (b) a consent checkbox at the campaign send step, and (c) a blanket consent delegation model where merchants are contractually responsible for subscriber consent
- Legal has not completed its review of the GDPR consent data model; all three options remain open until Legal specifies a preferred approach
- The story cannot be refined further without a Legal decision; acceptance criteria cannot be written until the consent model is defined
- Growth PM to follow up with Legal; expected sign-off date: August 5, 2026 [fictional]

**Scope Changes:**
- None confirmed . story scope is pending Legal guidance

---

### CAM-091: Abandoned Cart Email Trigger

| Attribute | Value |
|-----------|-------|
| **Points** | . (not estimated; split required) |
| **Status** | Needs Work |
| **Assignee** | Unassigned until split complete |

**Discussion Notes:**
- Story scope spans four distinct engineering domains: (1) data pipeline (order abandonment event → email trigger), (2) email template design for the abandoned cart format, (3) unsubscribe handling (abandoned cart emails require a separate unsubscribe path from campaign emails), and (4) compliance copy review for the trigger email format
- Engineering Lead confirmed that a single story spanning more than two engineering domains and likely exceeding 8 story points [fictional] should be split per the team's agreed definition of done for backlog items
- Team agreed to split CAM-091 into four child stories and defer estimation to the next refinement session

**Scope Changes:**
- CAM-091 closed; replaced by four child stories to be drafted by Growth PM before the next refinement session:
  - CAM-091a: Order abandonment data pipeline (event detection + trigger logic)
  - CAM-091b: Abandoned cart email template design
  - CAM-091c: Unsubscribe handling for trigger emails
  - CAM-091d: Compliance copy review for abandoned cart trigger format

---

## Stories Summary Table

| Story | Title | Points | Status | Notes |
|-------|-------|--------|--------|-------|
| CAM-089 | Per-campaign open rate and click rate | 5 [fictional] | Ready | Denominator question to resolve before implementation |
| CAM-090 | Follow-on experiment . 3 vs. 5 products | 3 [fictional] | Ready | 30-day experiment window; mobile spec confirmed |
| CAM-088 | EU merchant GDPR consent data model | . | Blocked | Awaiting Legal sign-off; expected Aug 5 |
| CAM-091 | Abandoned cart email trigger | . | Needs Work | Split into 4 child stories (CAM-091a - d) |

---

## Questions Raised

| Question | Raised By | Owner | Due Date | Status |
|----------|-----------|-------|----------|--------|
| Should open rate denominator for CAM-089 be Amplitude delivered-event count or SendGrid recipient count? | Backend Engineer | Backend Engineer + Growth PM | Jul 25, 2026 [fictional] | Open |
| What is the team's precedent for resizing vs. splitting a story during refinement? | QA Lead | Engineering Lead | Resolved in session | Resolved |

### Question Details

**Q: Open rate denominator . Amplitude delivered-event count vs. SendGrid recipient count?**
- Context: Amplitude fires an `email_delivered` event when SendGrid confirms delivery; the delivered-event count may differ slightly from the SendGrid recipient count due to webhook latency and delivery failures. Using different denominators would produce different open rate percentages and could cause confusion if a merchant compares their Campaigns open rate to their external email benchmarks.
- Impact: Cannot finalize acceptance criteria for CAM-089 until the denominator is decided; the implementation approach differs between the two options (Amplitude dashboard query vs. API call to SendGrid for recipient count)
- Notes: Growth PM's initial preference is SendGrid recipient count for consistency with industry-standard open rate definitions; Backend Engineer to confirm feasibility of pulling recipient count from SendGrid without a separate API call

---

## Decisions Made

| Decision | Context | Made By |
|----------|---------|---------|
| CAM-089 uses a 30-day data window only for v1.1; historical open/click rate backfill deferred to v1.2 | Historical backfill requires a batch job that is out of scope for the current sprint; the 30-day window covers the post-GA period sufficiently for v1.1 | Growth PM + Engineering Lead |
| CAM-091 is split into 4 child stories; original story closed | Story spans more than 2 engineering domains and is estimated to exceed 8 story points [fictional]; per team agreement, this requires splitting | Engineering Lead + Growth PM |
| Story splitting threshold: >2 engineering domains OR estimated >8 story points | QA Lead raised the question; team formalized the definition to avoid future ambiguity | Engineering Lead (facilitated by Growth PM) |

---

## Action Items

| Action | Owner | Due Date | Status |
|--------|-------|----------|--------|
| Resolve open rate denominator question (Amplitude vs. SendGrid) and update CAM-089 ACs | Backend Engineer + Growth PM | Jul 25, 2026 [fictional] | Not Started |
| Draft 4 child stories for CAM-091 (CAM-091a - d) in Jira with initial acceptance criteria | Growth PM | Jul 26, 2026 [fictional] | Not Started |
| Confirm Legal sign-off date for CAM-088 and update Jira blocker with expected resolution date | Growth PM | Aug 1, 2026 [fictional] | Not Started |

---

## Blocked Stories

| Story | Blocker | Owner | Expected Resolution |
|-------|---------|-------|---------------------|
| CAM-088 | Legal sign-off on EU merchant GDPR consent model (three options presented; Legal review in progress) | Growth PM (escalation) | August 5, 2026 [fictional] |

---

## Parking Lot

- **Historical open/click rate backfill** (CAM-089): Deferred from v1.1; will require a batch job against the Amplitude event log for campaigns sent before v1.1. Added to v1.2 candidate backlog.
- **Multi-language email template support**: Raised by Backend Engineer in the context of EU merchant access; deferred to v2.0 roadmap planning . not required for EU GA if English-only is acceptable per Legal.

---

## Next Session

**Date:** August 5, 2026 [fictional]

**Stories to Prepare:**
- CAM-091a: Order abandonment data pipeline (event detection + trigger logic)
- CAM-091b: Abandoned cart email template design
- CAM-091c: Unsubscribe handling for trigger emails
- CAM-091d: Compliance copy review for abandoned cart trigger format
- CAM-088: EU merchant GDPR consent data model *(if Legal sign-off received by August 5)*

**Preparation Needed:**
- Growth PM to draft CAM-091a - d in Jira with initial acceptance criteria before Aug 5
- Backend Engineer and Growth PM to resolve open rate denominator question and update CAM-089 ACs before Aug 5
- Growth PM to confirm with Legal whether CAM-088 review will be complete by August 5; if not, CAM-088 will be deferred to a later sprint

---

*Notes captured by Growth PM on July 22, 2026 [fictional].*
