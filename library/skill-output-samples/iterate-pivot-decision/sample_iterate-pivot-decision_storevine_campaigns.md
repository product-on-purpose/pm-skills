---
title: "Iterate Pivot Decision: Storevine Campaigns"
description: "Storevine B2B ecommerce platform - Campaigns v2.0 persevere decision after guided flow validation."
artifact: pivot-decision
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: storevine
context: Storevine B2B ecommerce platform . Campaigns v2.0 persevere decision after guided flow validation
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Three weeks after the Campaigns A/B test concluded and the guided first-campaign flow shipped as default, Storevine's head of product and growth PM held a formal persevere/pivot evaluation for Campaigns v2.0. Post-GA usage data had revealed that Klaviyo-migrated merchants were sending campaigns at only 23% of accounts per month [fictional] against a predicted ~60% rate based on their Klaviyo send history [fictional] . a finding that raised the question of whether v2.0 resources should redirect toward serving the migrated segment's needs rather than continuing to optimize non-adopter activation. The team evaluated three options and decided to persevere on non-adopter activation, with a committed parallel track to investigate migrated merchant barriers.

**Source Notes:**

- Ben Yoskovitz and Alistair Croll, "Lean Analytics" (leananalyticsbook.com) . the persevere/pivot evaluation framework applied in this document; establishes that a pivot is warranted when validated data shows the core hypothesis is wrong or the market opportunity is smaller than assumed, not merely when a secondary segment underperforms relative to prediction.
- Eric Ries, "The Lean Startup" (theleanstartup.com) . the taxonomy of pivot types (Customer Segment Pivot, Customer Need Pivot, Platform Pivot, and others) used to classify the options considered in this evaluation; provides the conceptual basis for distinguishing a pivot from an optimization within the current direction.
- Recurly Research (recurly.com/resources/research) . B2B SaaS churn benchmarks that document median SMB annual churn at 10 - 15%; affirms the urgency of the churn OKR (22% → 14% [fictional]) that makes persevering on the validated non-adopter activation track the lower-risk strategic choice for the remainder of 2026.

---

## Prompt

```
iterate-pivot-decision

Product: Campaigns . post-GA persevere/pivot evaluation
Evaluation date: July 22, 2026 (12 weeks post-GA)

Situation: Campaigns GA succeeded. Guided flow A/B test: 31.7% vs.
13.4% first-send rate [fictional], shipped as default July 10.
BUT: Klaviyo-migrated merchants sending at 23% [fictional] monthly .
far below the ~60% [fictional] predicted from their Klaviyo history.
Three migrated merchants submitted tickets citing missing advanced
segmentation and scheduling. Migrator churn tracking at 18% [fictional].

Question: Should Campaigns v2.0 resources pivot to serve Klaviyo-
migrated merchants, or persevere on non-adopter activation?

Options I need evaluated:
1. Persevere . continue non-adopter activation (77% of segment
   unconverted [fictional])
2. Customer Segment Pivot . redirect to Klaviyo-migrated merchants
3. Platform Pivot . open Campaigns as an API for third-party email
   tool integration

Need: full pivot decision document with analysis and rationale.
```

---

## Output

# Pivot Decision: Campaigns v2.0 Roadmap Direction

## Overview

| Attribute | Value |
|-----------|-------|
| **Decision Date** | July 22, 2026 |
| **Decision Maker(s)** | Head of Product, Growth PM |
| **Product/Initiative** | Campaigns . v2.0 roadmap direction |
| **Time in Market** | 12 weeks since GA (April 28, 2026) |
| **Investment to Date** | 8 months × 4 Platform Squad engineers + 1 design + 1 growth PM [fictional] |

---

## Executive Summary

**Decision:** Persevere . continue non-adopter activation as the primary Campaigns v2.0 focus.

With 77% [fictional] of the addressable non-adopter segment yet to send a first campaign and the annual churn OKR (22% → 14% [fictional]) requiring continued activation momentum, redirecting resources to the Klaviyo-migrated segment would interrupt a validated strategy before it has reached sufficient scale to affect the churn rate. The Klaviyo-migrated merchant underperformance is real and warrants investigation, but it is structurally a different product problem that requires different capabilities . an investigation track will run in parallel without disrupting the primary roadmap.

---

## Current State

### What We're Doing Now

Campaigns v1.0 is live for all active Storevine merchants. The guided first-campaign flow . pre-populated product templates and defaulted audience segment . is now the default experience for all merchants with no prior sends. The A/B experiment validated the approach and the feature flag was removed on July 10, 2026. The Platform Squad is scoping Campaigns v1.1 stories, including EU merchant access, per-campaign analytics, and the follow-on template depth experiment.

### Key Metrics

| Metric | Current | Target | Gap |
|--------|---------|--------|-----|
| First-send rate (60-day cohort, post-ship) | 31.7% [fictional] | 30% [fictional] | +1.7 pp |
| Active Campaigns merchants (rolling 30 days) | 1,847 [fictional] | 2,000 [fictional] by Q2 end | −153 |
| Campaigns-active cohort churn rate | 11.4% [fictional] | <12% [fictional] | On track |
| Klaviyo-migrated merchants sending ≥1/month | 23% [fictional] | ~60% [fictional] predicted | −37 pp |

### Timeline of Events

| Date | Milestone | Outcome |
|------|-----------|---------|
| Dec 2025 | Campaigns build sprint begins | Platform Squad + growth PM aligned on non-adopter hypothesis |
| Jan 2026 | Merchant interviews complete | Non-adopter segment confirmed as primary target; Klaviyo migration noted but not primary focus |
| Apr 28, 2026 | Campaigns GA | Guided flow and standard flow launched as A/B variants |
| Jun 27, 2026 | A/B test concludes | Treatment: 31.7% first-send rate [fictional]; result statistically significant at p < 0.001 |
| Jul 10, 2026 | Guided flow ships as default | Feature flag removed; all non-adopter merchants see guided flow |
| Jul 22, 2026 | Post-GA review surfaces migrated merchant underperformance | Persevere/pivot evaluation convened |

### Resources Invested

| Resource | Amount |
|----------|--------|
| Time | 8 months [fictional] (December 2025  -  July 2026) |
| Budget | ~$480K engineering + design [fictional] |
| Team | 4 Platform Squad engineers + 1 design lead + 1 growth PM × 8 months [fictional] |
| Opportunity cost | Klaviyo-migrator engagement work and advanced segmentation features deferred for 8 months [fictional] |

---

## Evidence Summary

### Data That Triggered This Evaluation

1. Klaviyo-migrated merchants sending ≥1 campaign per month: 23% [fictional] vs. ~60% [fictional] predicted from pre-migration Klaviyo send history . a 37-percentage-point gap that appeared within the first 60 days of GA.
2. Three migrated merchants filed Merchant Success support tickets within 30 days of GA citing the absence of bulk-send scheduling and advanced audience segmentation . features Klaviyo offered that Campaigns v1 does not.
3. Churn rate for Campaigns-inactive migrated merchants is tracking at 18% [fictional] annually, compared to the platform average of 22% [fictional] and the Campaigns-active cohort at 11.4% [fictional] . suggesting migrated merchants who are not sending are churning at a notably elevated rate relative to what their migration decision implied about their intent to stay.

### Customer/User Feedback

**What Users Are Saying:**
- "We moved our list over but we can't set up the automations we had in Klaviyo. It's not the same thing." . Klaviyo-migrated merchant, support ticket [fictional]
- "For our non-adopter merchants, this is game-changing. Simplest email tool I've ever recommended." . Merchant Success team member, internal Slack [fictional]
- "I wanted to send a campaign to everyone who bought in the last 60 days . I could only find the last 90 days preset. Close, but not right." . Klaviyo-migrated merchant, support ticket [fictional]

**User Behavior Patterns:**
- Non-adopter merchants who completed the guided flow are returning for second campaigns at 22.8% [fictional] at 90 days . a signal of earned habit formation
- Klaviyo-migrated merchants are opening Campaigns in the admin but not completing sends . high exploration, low conversion to sends

### Market Signals

- Klaviyo's continued SMB focus and pricing expansion (klaviyo.com) means migrated merchants have an active pull-back option if Campaigns does not meet their expectations within the first quarter of migration
- Mailchimp's 2023 free-tier sunset continues to push SMB email users toward alternatives, validating the ongoing size of the non-adopter segment as new merchants join Storevine without an existing email tool

### Internal Learnings

- The mechanism that works for non-adopters (content pre-population, simplicity, guided completion) is structurally different from what migrated merchants need (control, automation, advanced segmentation, scheduling)
- Building both well from the same feature surface would require a UI architecture decision . potentially a power-user mode . that does not exist in Campaigns v1 and would require significant design investment before any engineering work

---

## Hypothesis Review

### Original Hypotheses

| Hypothesis | Status | Evidence |
|------------|--------|----------|
| Non-adopter merchants will send first campaign at ≥30% rate within 60 days | Validated | 31.7% [fictional], p < 0.001 |
| Guided flow (pre-populated content) is the activation mechanism | Validated | Funnel analysis: effect concentrated at template + subject line step |
| Campaigns adoption will reduce annual merchant churn | Validated (early) | Campaigns-active cohort churn: 11.4% [fictional] vs. 22% platform average |
| Klaviyo-migrated merchants will send at rates comparable to Klaviyo history | Invalidated | 23% [fictional] sending vs. ~60% [fictional] predicted |

### Key Learnings from Validation

- The non-adopter hypothesis was directionally correct and has exceeded its primary metric target; there is no data signal to exit or pause this track
- The Klaviyo-migrated merchant hypothesis was never formally tested but post-GA data reveals the original prediction was significantly overoptimistic; migrators need feature parity with Klaviyo before they will send at historical rates, and that parity is a multi-quarter investment

---

## Options Considered

### Option 1: Persevere (Stay the Course)

**Description:** Continue Campaigns v2.0 with non-adopter activation as the primary focus . refine the guided flow (template depth experiment, category-specific content), add EU merchant access, and build per-campaign analytics. Address migrated merchant barriers through a parallel lightweight investigation track, not a resource redirect.

**What Changes:** Campaigns v1.1 scope proceeds as scoped; a qualitative research track (5 migrated merchant interviews) runs in parallel to understand barriers before any product investment is committed.

**Rationale for Considering:**
- 77% [fictional] of eligible non-adopters have not sent yet; the segment is large, validated, and directly tied to the churn OKR
- The validated activation mechanism (content pre-population) has further depth to explore before it plateaus

**Risks:**
- Klaviyo-migrated merchant churn compounds over time; if not addressed within 2 - 3 quarters, the segment will erode even as non-adopter activation improves
- Migrated merchants who re-evaluate Klaviyo within 6 months of migration will attribute the failure to Campaigns feature gaps, creating a reputation risk

**Resource Requirements:** Existing team (no change); qualitative research for migrators fits within the growth PM's discretionary time.

---

### Option 2: Customer Segment Pivot . Shift to Klaviyo-Migrated Merchants

**Description:** Redirect Campaigns v2.0 engineering resources toward the feature set that migrated merchants need: advanced segmentation (custom date-range filters, multi-condition audience builder), bulk-send scheduling, and campaign automation sequences. Pause further optimization of the non-adopter guided flow after shipping the current v1.1 scope.

**What Changes:**
- Engineering priority shifts from template depth experiment to advanced segmentation UI
- Guided flow improvements (category-specific templates, 5-product experiment) deferred to v3.0
- Merchant Success focus shifts from non-adopter outreach to migrated merchant re-engagement

**Rationale for Considering:**
- Migrated merchants represent 28% of active accounts [fictional] and have higher historical email send volumes; if activated at their predicted rate, they would drive more attributed revenue per merchant than the average non-adopter
- The migrator churn rate of 18% [fictional] represents a near-term churn loss that non-adopter activation alone cannot offset

**Risks:**
- Abandons a validated activation strategy mid-execution before it has reached OKR-scale impact on the churn rate
- Non-adopter segment (71% of active accounts [fictional]) remains unconverted; the churn OKR trajectory shifts from improving to stalling
- Building advanced segmentation for migrators requires a different engineering skill set (complex query builder, scheduling infrastructure) than the current Platform Squad's recent work

**Resource Requirements:** Existing Platform Squad redeployment plus design capacity for the advanced segmentation UI; no new headcount but significant context-switching cost.

---

### Option 3: Platform Pivot . Open Campaigns as an API

**Description:** Build a Campaigns API so that Klaviyo and Mailchimp users can access Storevine's purchase-data-powered audience segmentation and revenue attribution without migrating away from their existing email tool. Monetize the attribution and segmentation layer as a standalone feature rather than requiring merchants to use Campaigns as their primary send tool.

**What Changes:**
- Platform Squad redirects to API infrastructure (auth, rate limiting, partner agreements, documentation)
- Campaigns becomes a data-and-attribution product rather than a send tool
- The current guided flow remains as-is for non-adopters; the API serves migrators through their existing tools

**Rationale for Considering:**
- Removes the migration barrier entirely; migrated merchants keep Klaviyo and add Storevine attribution without displacing their existing workflow
- Creates a new monetization layer that could be priced independently of the Storevine subscription

**Risks:**
- API platform requires 12+ months of additional infrastructure investment [fictional]; takes the product in a direction not supported by the current team's expertise or the current roadmap timeline
- Partner agreements with Klaviyo and Mailchimp are not guaranteed and could be blocked by competitive dynamics; Klaviyo in particular has no incentive to facilitate a competing attribution layer
- Dilutes the Campaigns brand identity: merchants may not understand what Campaigns is if it is partly a send tool and partly an API

**Resource Requirements:** 2 additional backend engineers; API security review; legal review of partner data agreements; 12+ month timeline before revenue from the API layer [fictional].

---

## Analysis

### Evaluation Criteria

| Criterion | Weight | Definition |
|-----------|--------|------------|
| Market Opportunity | High | Size and remaining conversion potential of the addressable segment |
| Competitive Advantage | High | Extent to which Storevine has a defensible edge in the proposed direction |
| Team Capability | Medium | Current team's ability to execute without significant upskilling or hiring |
| Resource Requirements | Medium | Investment required relative to current budget and headcount |
| Risk Level | High | Probability and severity of downside outcomes |

### Options Comparison

| Criterion | Persevere | Customer Segment Pivot | Platform Pivot |
|-----------|-----------|----------------------|----------------|
| Market Opportunity | High . 77% of non-adopter segment unconverted [fictional] | Medium . migrators are 28% of accounts [fictional] but have high churn risk | Low . API market unvalidated; partner agreements uncertain |
| Competitive Advantage | High . guided flow + content seeding is proven and proprietary | Medium . advanced segmentation is table stakes for Klaviyo; unclear differentiation | Low . API-layer competition with established integrations (Klaviyo Flows API) |
| Team Capability | High . current team has just completed this work and has deep context | Medium . advanced segmentation UI is a meaningful design and engineering skill expansion | Low . API platform requires backend expertise and partner management not currently on team |
| Resource Requirements | Low . no new resources; parallel research track is within existing capacity | Medium . Platform Squad redeployment plus design capacity | High . additional engineers, legal, partner agreements, 12+ months |
| Risk Level | Low . validated strategy with clear OKR line; migrator investigation runs in parallel | High . interrupts validated strategy before OKR-scale impact | Very High . unvalidated market, uncertain partner dynamics, long timeline |
| **Overall** | **Strong** | **Moderate** | **Weak** |

---

## Decision

### Chosen Direction: Persevere (Option 1)

**Decision Statement:**
Campaigns v2.0 will continue its primary focus on non-adopter merchant activation. The Platform Squad will proceed with the scoped v1.1 roadmap (EU merchant access, per-campaign analytics, follow-on template depth experiment). A qualitative research track (5 migrated merchant interviews) will run in parallel to understand Klaviyo-migrated merchant barriers before any product investment is committed to that segment.

### Rationale

The non-adopter activation strategy is validated, delivering on its primary metric (31.7% [fictional] first-send rate vs. 30% target), and directly addressing the primary OKR (churn reduction). With 77% [fictional] of eligible non-adopters still unconverted, the segment has significant remaining scale. The Klaviyo-migrated merchant problem is real and growing, but it is structurally a different product problem requiring different capabilities . advanced segmentation, scheduling, automation . that cannot be built without a significant design and engineering investment that would disrupt the current validated roadmap. The right response to the migrator finding is to investigate barriers through qualitative research before committing product investment, not to redirect the team from a working strategy before it achieves OKR-scale impact.

### Trade-offs Accepted

| Trade-off | Impact | Why Acceptable |
|-----------|--------|----------------|
| Klaviyo-migrated merchant churn will remain elevated until a dedicated engagement track is resourced | Some migrated merchants will return to Klaviyo or churn before Campaigns builds parity features | The 5-merchant research track gives us a low-cost signal before committing resources; the non-adopter activation gains currently outweigh the migrator churn loss in absolute terms |
| Product surface will continue to optimize for simplicity (non-adopters) at the cost of power (migrators) | Campaigns v2.0 will not serve power-user segmentation needs | Accepting dual-audience tension until the architecture decision about a power-user mode is made with data, not assumptions |

### Dissenting Views

Engineering Lead raised that the Klaviyo-migrated merchant churn risk compounds over time . if migrators are churning at 18% [fictional] now, the compounding effect over four quarters will materially offset the non-adopter activation gains and potentially stall the churn OKR. He proposed adding 0.5 FTE to begin migrator-specific research this quarter and setting a decision gate at the Q3 review: if migrator churn has not improved, the v2.0 roadmap gets a partial redirect. Head of Product accepted the concern and committed to tracking migrated merchant churn as a named metric on the Campaigns adoption dashboard, with a formal review at the September 2026 quarterly planning session [fictional].

---

## Implementation Plan

### Immediate Actions (Next 30 Days)

| Action | Owner | Due Date |
|--------|-------|----------|
| Commission 5 qualitative interviews with Klaviyo-migrated merchants on barriers to Campaigns sends | Growth PM | Aug 22, 2026 [fictional] |
| Add Klaviyo-migrated merchant churn as a tracked metric in the Campaigns adoption dashboard | Growth PM | Aug 1, 2026 [fictional] |
| Kick off 3 vs. 5 products follow-on experiment design for guided template | Design Lead | Aug 15, 2026 [fictional] |
| Document persevere decision and rationale in team strategy log | Growth PM | Jul 25, 2026 [fictional] |

### Resource Requirements

| Resource | Current | Needed | Gap |
|----------|---------|--------|-----|
| Budget | ~$60K/month [fictional] | ~$60K/month [fictional] | None . no new budget required |
| Headcount | 4 engineers + 1 design + 1 PM | Same | None . no new headcount |
| Technology | Amplitude + Storevine order DB | Same | Migrator churn cohort added to existing tracking |

### Success Criteria

**How we'll know if this is working:**

| Metric | 30-Day Target | 90-Day Target |
|--------|---------------|---------------|
| Non-adopter first-send rate (rolling 30-day cohort) | ≥28% [fictional] | ≥28% [fictional] |
| Campaigns-active cohort churn rate | ≤12% [fictional] | ≤12% [fictional] |
| Migrated merchant research interviews completed | 5 [fictional] | Research findings documented |

### Checkpoint Schedule

| Date | Checkpoint | Decision Point |
|------|------------|----------------|
| Aug 22, 2026 [fictional] | Migrated merchant research complete | Review qualitative findings; determine if a dedicated migrator track warrants Q4 resource commitment |
| Sep 15, 2026 [fictional] | Q3 quarterly planning | Formal review of migrated merchant churn trajectory; decide whether v2.0 roadmap needs a partial redirect for Q4 |

---

## Communication Plan

### Internal Communication

| Audience | Message | Channel | When |
|----------|---------|---------|------|
| Engineering Lead | Persevere decision + migrator churn assessment commitment; his concern logged and will be reviewed at Q3 planning | 1:1 meeting | July 22, 2026 |
| Platform Squad | v2.0 roadmap stays as scoped; migrator research running in parallel; no resource redirect | Sprint planning | July 28, 2026 [fictional] |
| Head of Product | Decision document distributed; migrated merchant churn added to Q3 OKR review agenda | Email | July 22, 2026 |
| Merchant Success | Continue non-adopter focus; flag Klaviyo-migrator support tickets for growth PM for research scheduling | Slack #merchant-success | July 23, 2026 [fictional] |

### External Communication

| Audience | Message | Channel | When |
|----------|---------|---------|------|
| Klaviyo-migrated merchants (via Merchant Success) | No change to merchant-facing experience; no product announcement | n/a | No communication needed |

---

## Appendix

### Supporting Documents

- Experiment results: Campaigns Guided First-Campaign Flow A/B Test (EXP-001)
- Campaigns adoption dashboard: first-send rate, churn cohort, migrated merchant send rate
- Lessons log: LL-2026-001 . Content Quality, Not UX Scaffolding, Is the Non-Adopter Activation Mechanism

### Pivot Type Reference

Common pivot types (Lean Startup framework):
- **Zoom-in Pivot:** Single feature becomes the whole product
- **Zoom-out Pivot:** Product becomes a feature of a larger product
- **Customer Segment Pivot:** Same product, different customer (Option 2 in this evaluation)
- **Customer Need Pivot:** Same customer, different problem
- **Platform Pivot:** Change from application to platform or vice versa (Option 3 in this evaluation)
- **Business Architecture Pivot:** High margin/low volume ↔ low margin/high volume
- **Value Capture Pivot:** Change how you monetize
- **Engine of Growth Pivot:** Viral ↔ paid ↔ sticky
- **Channel Pivot:** Change distribution mechanism
- **Technology Pivot:** Same solution, different technology

---

*Decision documented on July 22, 2026. Next review scheduled for September 15, 2026 [fictional] (Q3 quarterly planning).*
