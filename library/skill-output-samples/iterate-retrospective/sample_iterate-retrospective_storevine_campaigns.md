---
title: "Iterate Retrospective: Storevine Campaigns"
description: "Storevine B2B ecommerce platform - Campaigns v1.0 build sprint retrospective."
artifact: retrospective
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: storevine
context: Storevine B2B ecommerce platform . Campaigns v1.0 build sprint retrospective
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Nine days after Campaigns GA (April 28, 2026), Storevine's growth PM facilitated the post-launch sprint retrospective covering the 13-week Campaigns build sprint and the GA week. The retro used a Start/Stop/Continue format and surfaced two recurring themes: the late Legal review start, which created a two-week compliance copy crunch that delayed marketing content finalization, and the underestimated complexity of DMARC/SPF/DKIM sender authentication setup, which nearly missed a hard launch gate. Three action items were committed, all with named owners and due dates before the next sprint.

**Source Notes:**

- Esther Derby and Diana Larsen, "Agile Retrospectives" (estherderby.com/agile-retrospectives) . the retrospective facilitation methodology; the Start/Stop/Continue format used in this retro is one of the structured formats described in this resource, suited for teams reviewing a completed project phase rather than a single sprint.
- CAN-SPAM Act (FTC, ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business) . the compliance requirement that made Legal sign-off a hard launch gate; the retro action to start Legal reviews 6 weeks before GA directly addresses the crunch caused by the CAN-SPAM compliance review timeline.
- Google, "Email Sender Guidelines" (support.google.com/mail/answer/81126) . the 2024 enforcement of DKIM, SPF, and DMARC authentication for bulk senders; the DMARC setup delay discussed in the retrospective is attributable to underestimating DNS propagation requirements introduced by Google's enforcement of these guidelines.

---

## Prompt

```
/retrospective

Sprint: Campaigns v1.0 build sprint + GA week
Period: February 3 – May 5, 2026 [fictional]
Date held: May 7, 2026
Format: Start / Stop / Continue
Duration: 90 minutes [fictional]

Team: Growth PM, Engineering Lead, Backend Engineer,
      Design Lead, Merchant Success Lead, QA Lead

What went well:
- Beta merchant FAQ (23 questions → 10 FAQ + 15 canned responses)
  [fictional] . reduced GA-week ticket volume significantly
- Instrumentation spec process caught subscriber email PII gap
  before GA
- Feature flag rollout (10%→100%) worked; zero rollback events

What to improve:
- Legal review started 3 weeks before GA instead of 6 weeks;
  created compliance copy crunch that delayed marketing content
- DMARC/SPF/DKIM setup: estimated 1 day, took 5 business days
  [fictional]; DNS propagation not in the timeline
- Klaviyo partner notice email sent 2 days late (no clear owner)

Previous retro actions to review (Sprint 7 retro):
- Add QA Lead to kickoff sessions . Complete
- Define escalation path for blocker tickets . In Progress
- Document infrastructure prerequisites for launches . Not Started

Need: full sprint retrospective with action items.
```

---

## Output

# Retrospective: Campaigns v1.0 Build Sprint

## Overview

**Period Covered:** February 3 – May 5, 2026 (13-week Campaigns build sprint and GA week) [fictional]
**Date Held:** May 7, 2026
**Facilitator:** Growth PM
**Duration:** 90 minutes [fictional]
**Format Used:** Start / Stop / Continue

### Attendees

- Growth PM
- Engineering Lead, Platform Squad
- Backend Engineer
- Design Lead
- Merchant Success Lead
- QA Lead

### Context

The Campaigns v1.0 build sprint closed with a clean GA on April 28, 2026, and a full GA week (April 28 – May 5) with zero rollback events. This retrospective covers the 13-week build sprint, the pre-GA launch checklist execution, and the first 7 days of merchant activity . including the initial feature flag rollout (10% → 25% → 50% → 100% over 6 days [fictional]), the first merchant sends, and the GA-week Merchant Success ticket volume. The A/B test launched on GA day and is running; this retro does not cover experiment results (which will not be available for 60 days).

---

## Previous Retrospective Review

### Action Items from Last Retro

| Action | Owner | Status | Notes |
|--------|-------|--------|-------|
| Add QA Lead to feature kickoff sessions | Engineering Lead | Complete | QA Lead joined the Campaigns kickoff in January 2026; QA-identified edge cases were included in the sprint scope from week 1 |
| Define escalation path for blocker tickets before they become critical | Engineering Lead | In Progress | Escalation path defined and used effectively during the Campaigns build sprint (one blocker escalated to Head of Product in week 8 [fictional]); the process document has not been generalized to other squads |
| Document infrastructure prerequisites for future production launches | Engineering Lead | Not Started | Deprioritized during the Campaigns build sprint due to sprint velocity pressure; now a direct action item from this retro |

---

## What Went Well

### Team Highlights

- The beta merchant feedback program produced 23 support questions [fictional] that Merchant Success Lead converted into 10 FAQ entries and 15 canned responses before GA . when GA-week tickets arrived, the support team already had answers ready, and GA-week ticket volume was below the estimated range [fictional]
- The instrumentation spec review process caught a PII gap . subscriber email addresses were initially included as event properties in an early draft of `attribution_recorded` . before any instrumentation was shipped to staging; removing this before GA avoided a potential GDPR compliance incident
- The feature flag rollout from 10% to 100% across 6 days [fictional] worked as designed: send failure rate peaked at 0.8% [fictional] during the initial 10% ramp (well below the 2% alert threshold), and the rollout proceeded to 100% without any rollback events or on-call escalations

### Process Wins

- The dual PM + QA review on all compliance copy (CAN-SPAM required text, unsubscribe language, physical address fields) caught two instances of non-compliant copy in the pre-built template library before GA; fixing these post-launch would have required a product update and a retroactive merchant communication
- The incident response runbook . created by Engineering Lead in the final week before GA . was used on day 2 of GA week when a brief attribution webhook backlog occurred (410 unprocessed events [fictional]); the runbook guided the on-call engineer through the diagnosis and resolution in under 20 minutes without paging anyone above the on-call level

### Individual Shoutouts

- Backend Engineer for implementing the `unique_args` attribution chain in the SendGrid webhook integration; the spike in week 2 of the build sprint confirmed the technical approach, and the final GA implementation matched the spike design without significant rework
- Merchant Success Lead for converting 23 beta questions [fictional] into 10 FAQ articles and 15 canned responses and publishing all of them before GA day; this single pre-GA investment measurably reduced the support load in the first week

---

## What to Improve

### Challenges Faced

- Legal review started 3 weeks before GA instead of the intended 6 weeks; the CAN-SPAM compliance architecture sign-off was not received until April 14 [fictional], which was 14 days before GA and 2 weeks after marketing needed the compliance copy finalized for the blog post, email campaign, and in-app banner
- DMARC/SPF/DKIM setup took 5 business days instead of the 1 day estimated [fictional]; DNS propagation delays (24–72 hours per record, multiple records required) were discovered during implementation rather than during sprint planning, and the setup nearly missed its April 21 launch gate deadline
- The Klaviyo partner notice email . required 48 hours before the GA announcement . was sent on GA day itself (April 28 [fictional]) instead of April 26; the launch checklist item had no explicitly assigned owner, and it was picked up by Growth PM only after the GA announcement draft was already in review

### Process Pain Points

- Legal is currently engaged as a late-stage reviewer (when code is ready for review) rather than as an early-stage design partner; compliance requirements discovered at the end of development create multi-team dependency cascades when Legal's review takes longer than the estimated window
- Infrastructure prerequisites (DNS configuration, IP warm-up, SSL certificate validation, DMARC/SPF/DKIM) are represented as launch checklist items rather than as sprint stories; they have due dates but no sprint-board visibility, which makes them invisible to the velocity tracking that the team uses to surface timeline risk early

### Themes Identified

| Theme | Items | Votes |
|-------|-------|-------|
| Legal and compliance timing | Legal review start date, CAN-SPAM copy finalization dependency, Klaviyo notice ownership gap | 8 [fictional] |
| Infrastructure timeline estimation | DMARC/SPF/DKIM setup, IP warm-up scheduling, DNS propagation buffer | 5 [fictional] |
| Launch checklist ownership | Klaviyo partner notice, partner communication accountability, marketing content gate | 3 [fictional] |

---

## Discussion Notes

### Legal and Compliance Timing

**What was discussed:**
The team discussed why the Legal review started 3 weeks before GA instead of 6. The root cause was not that Legal was unavailable . Legal said they could have started earlier if asked . but that the PM kickoff template and sprint planning process do not flag compliance implications as a trigger for early Legal engagement. Legal receives a calendar invite for the compliance review when the feature is ready for review, not at the start of the design phase.

**Root cause identified:**
Legal review is not a sprint story and therefore has no sprint-board visibility. It is a launch checklist item with a due date. When Legal's review takes longer than estimated (which happened here due to a parallel compliance project taking Legal's time [fictional]), the downstream dependencies . compliance copy, marketing content, template library review . have no lead time to absorb the delay.

**Proposed solution:**
For any feature with compliance implications (user data collection, external communication, financial transactions), Legal joins the feature kickoff meeting and is assigned as a named reviewer on a sprint story that appears on the board at design freeze . not at code freeze. The compliance review story blocks the marketing content story in the sprint board, making the dependency visible.

---

### DMARC/SPF/DKIM Setup and Infrastructure Estimation

**What was discussed:**
The Platform Squad estimated DMARC/SPF/DKIM setup at 1 day [fictional] based on previous experience with shared sending infrastructure on the Storevine platform. Dedicated sending domain setup proved to be significantly more complex: it required creating multiple DNS records (SPF TXT record, DKIM CNAME records, DMARC TXT record), waiting 24–72 hours for each record type to propagate before verification, and then iterating when Google's authentication checker reported partial failures due to subdomain configuration. Total elapsed time was 5 business days [fictional], with setup beginning on April 14 and completing April 21 . the launch gate deadline.

**Root cause identified:**
This was the first time the Platform Squad had provisioned a dedicated sending domain. The team had experience with shared infrastructure but not with DNS-level configuration for email authentication. DNS propagation windows were not in the standard sprint estimation checklist, and there was no runbook to reference.

**Proposed solution:**
Engineering Lead will document a DMARC/SPF/DKIM setup runbook covering the full sequence: DNS record types and values, propagation verification steps (using `dig` and Google's MX Toolbox [fictional]), Gmail and Yahoo sender authentication validation, and expected timeline with a 5-business-day propagation buffer. Future launches involving a new sending domain will treat this setup as a sprint story with a 5-day estimate, not a checklist item with a 1-day estimate.

---

## Action Items

| Priority | Action | Owner | Due Date | Status |
|----------|--------|-------|----------|--------|
| 1 | Update PM kickoff template: add compliance implications flag; if flagged, Legal joins kickoff and compliance review becomes a sprint story at design freeze | Growth PM | June 1, 2026 [fictional] | Not Started |
| 2 | Create DMARC/SPF/DKIM setup runbook; add infrastructure prerequisites to sprint story tracking with 5-day DNS propagation buffer | Engineering Lead | May 20, 2026 [fictional] | Not Started |
| 3 | Assign explicit ownership for all partner notice emails in launch checklist at project kickoff; add "owner" column to the partner communications section | Growth PM | May 15, 2026 [fictional] | Not Started |

### Action Item Details

**Action 1: Legal joins feature kickoff for compliance-adjacent features**
- What: Growth PM updates the feature kickoff template to include a yes/no compliance implications question (user data collection, external communication, financial processing). If yes, Legal receives a kickoff calendar invite, and a named compliance review story is added to the sprint board with a dependency link to the marketing content story.
- Why: Legal review discovered late creates multi-team dependency cascades; earlier engagement eliminates the cascade by giving Legal sufficient lead time and making the dependency visible in sprint planning.
- Success criteria: Legal is present at the next feature kickoff that involves user data or communication features; a compliance review story appears on the sprint board at design freeze for that feature.

**Action 2: DMARC/SPF/DKIM runbook and infrastructure story estimation**
- What: Engineering Lead documents the full dedicated sending domain setup sequence in the team runbook; the standard launch checklist template is updated to represent DNS-level infrastructure setup as sprint stories with a 5-day estimate, not as single-line checklist items.
- Why: Infrastructure setup should not depend on tacit knowledge of the engineer who has done it before; the runbook protects future launches from the same estimation error.
- Success criteria: Runbook is reviewed by at least 2 Platform Squad engineers; the standard launch checklist template is updated before the next major launch.

---

## Parking Lot

- EU merchant GDPR consent data model: deferred from Campaigns v1.0 to v1.1; Legal review still in progress as of this retro . tracked as a blocker in Sprint 12 refinement.
- Klaviyo-to-Campaigns migration workflow: raised by Merchant Success Lead based on migrated merchant support tickets; deferred to v2.0 roadmap planning . not a GA-week urgent item, but flagged for the persevere/pivot evaluation.

---

## Metrics and Trends

### Team Health Indicators

| Indicator | This Retro | Last Retro | Trend |
|-----------|------------|------------|-------|
| Team morale (1–5) [fictional] | 4.2 | 3.8 | ↑ |
| Process satisfaction (1–5) [fictional] | 3.6 | 3.4 | ↑ |
| Collaboration (1–5) [fictional] | 4.5 | 4.1 | ↑ |

### Recurring Themes

- Legal/compliance timing has appeared in 3 consecutive sprint retrospectives [fictional] as a process pain point . this is the first retro in which a structural solution (kickoff attendance + sprint story) was agreed upon rather than a one-time workaround.

---

## Facilitator Notes

- Start/Stop/Continue format worked well for a team of 6 covering a 13-week sprint; theme dot-voting took 8 minutes [fictional] and produced a clear priority order without debate
- Consider using the 4Ls format (Liked, Learned, Lacked, Longed For) for the first post-experiment retrospective . the A/B test results will generate learning-specific reflections that the 4Ls format captures better than Start/Stop/Continue
- Retrospective energy was notably high given the clean GA; next retrospective may need more structured quiet reflection time if the post-launch momentum fades and the team moves into a longer sustaining mode

---

## Next Retrospective

**Scheduled:** June 4, 2026 [fictional] (after Sprint 9 closes)
**Focus areas:** First-send rate trend in first 30 days post-GA; any Merchant Success feedback themes from GA week that surface product gaps; progress on the three action items from this retro.

---

*Retrospective documented by Growth PM on May 7, 2026 [fictional].*
