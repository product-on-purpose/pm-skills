---
title: "Measure Experiment Design: Storevine Campaigns"
description: "Storevine B2B ecommerce platform - Campaigns guided first-campaign flow A/B experiment design."
artifact: experiment-design
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: storevine
context: Storevine B2B ecommerce platform . Campaigns guided first-campaign flow A/B experiment design
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Four weeks before the Campaigns GA date, Storevine's growth PM formalized the A/B experiment design that will test the primary product hypothesis: that the guided first-campaign flow with pre-populated product templates drives a materially higher first-send rate among non-adopter merchants than the standard blank-canvas campaign creation experience. The experiment runs for 60 days from GA and is the primary validation mechanism for the hypothesis defined during the Define phase.

**Source Notes:**

- Evan Miller, "How Not To Run An A/B Test" (evanmiller.org/how-not-to-run-an-ab-test.html) . establishes the importance of pre-defined sample sizes and fixed test durations to avoid peeking bias and inflated false positive rates, the protocol followed in this experiment design.
- Ronald Fisher's convention of p < 0.05 as the standard significance threshold for scientific experiments, established in "The Design of Experiments" (1935) . the alpha level used in this experiment, consistent with industry practice for product A/B tests.
- Nielsen Norman Group research on first-use experiences (nngroup.com) . establishes that guided first-session paths producing tangible value are the primary driver of tool retention for new users, providing the behavioral research basis for the hypothesis being tested.

---

## Prompt

```
/experiment-design

Project: Campaigns . Campaigns guided first-campaign flow
Experiment: Does the guided first-campaign flow increase first-send rate
            for non-adopter merchants?

Hypothesis (from Define phase doc):
- We believe pre-populated templates for non-adopter merchants (<250
  customers [fictional], no external email tool) will drive first-send
  rate from 12% [fictional] to ≥30% [fictional] within 60 days of GA

Variants:
- Control: Standard Campaigns creation flow (blank template editor,
  named segment library, no pre-population)
- Treatment: Guided first-campaign flow (product-seeded template,
  audience defaulted to "Customers who purchased in the last 90 days")

Sample: ~6,800 eligible non-adopter merchants [fictional]; need enough
  per variant to detect a 8 pp improvement with 80% power

Run period: April 28 – June 27, 2026 (60 days from GA)

Need: full experiment design with sample size calculation, success
criteria, risks, and implementation notes.
```

---

## Output

# Experiment Design: Guided First-Campaign Flow for Non-Adopter Merchants

## Overview

| Field | Value |
|-------|-------|
| **Experiment Name** | Campaigns: Guided First-Campaign Flow A/B Test |
| **Owner** | Growth PM, Storevine |
| **Start Date** | April 28, 2026 (Campaigns GA day) |
| **End Date** | June 27, 2026 (60 days) |
| **Status** | Ready |

## Hypothesis

**We believe** providing non-adopter merchants with a guided first-campaign flow that pre-populates a campaign template with their top products and defaults the audience to recent purchasers

**for** Storevine merchants with no active external email tool and fewer than 250 customers [fictional], representing the non-adopter segment (~38% of active merchants [fictional])

**will** increase the rate at which these merchants complete and send their first Campaigns email campaign within 60 days of Campaigns GA

**as measured by** first campaign send completion rate (the percentage of eligible non-adopter merchants who send at least one campaign within 60 days of account activation)

## Background

Merchant interviews (January 2026) identified three participants with no email program who cited setup complexity as the barrier . not price, not awareness. Interview Insight 2 categorized this non-adopter segment as the highest-ROI activation target for Campaigns v1 because there is no migration cost, no existing workflow to replicate, and no seasonal disruption risk. The hypothesis was formalized in the Define phase with a target of 30% [fictional] first-send rate against a current baseline of 12% [fictional]. The experiment operationalizes that hypothesis: it directly tests whether removing the blank-canvas complexity with pre-populated content is the activation mechanism, or whether some other factor drives the difference.

## Variants

### Control (A)

**Description:** The standard Campaigns campaign creation flow that all merchants see . a blank template editor with a library of 8 generic pre-built templates, and the named segment library as the audience selection step. No content is pre-filled; the merchant builds their campaign from scratch.

**Details:**
- Entry point: Campaigns section of Storevine admin (same for both variants)
- Template: Merchant selects from generic library or starts blank
- Audience: Named segment library with no pre-selected segment
- No guided completion prompts or progress indicators

**Screenshot/Mockup:** Figma . Campaigns creation flow v4 / Control variant

### Treatment (B)

**Description:** The guided first-campaign flow, shown only to merchants who have no prior sent campaigns (detected at entry). The flow pre-populates a campaign template with the merchant's top 3 products by sales volume (last 90 days [fictional]) and defaults the audience to "Customers who purchased in the last 90 days."

**Details:**
- Entry point: Campaigns section of Storevine admin (same for both variants)
- Template: Pre-populated with merchant's top 3 products (name, image, price from product catalog)
- Audience: Defaulted to "Customers who purchased in the last 90 days" segment; merchant may change this selection
- Guided completion prompt: Subject line field is pre-focused; progress indicator shows 3 steps (Template → Subject Line → Send)

**Screenshot/Mockup:** Figma . Campaigns creation flow v4 / Treatment variant

## Metrics

### Primary Metric

| Metric | Definition | Current Baseline | Minimum Detectable Effect |
|--------|------------|------------------|---------------------------|
| First campaign send rate | % of eligible non-adopter merchants who complete and send at least one campaign within 60 days of account activation | 12% [fictional] | 8 percentage points (absolute) |

### Secondary Metrics

| Metric | Definition | Purpose |
|--------|------------|---------|
| Median time to first send | Median time (minutes) from first Campaigns flow entry to first campaign sent | Track whether treatment reduces the time cost, not just the completion rate |
| Second campaign send rate | % of non-adopter merchants who send a second campaign within 90 days | Assess whether treatment effect persists beyond the first send (retention signal) |
| Campaigns activation rate | % of eligible merchants who open the Campaigns flow at least once | Confirm both variants have comparable entry rates; if significantly different, investigate whether feature flag rollout created selection bias |

### Guardrail Metrics

| Metric | Definition | Threshold |
|--------|------------|-----------|
| Email unsubscribe rate | % of recipients who unsubscribe from any campaign sent during the test period | Must not exceed 2.0% . above this level, inbox providers may begin filtering Storevine domain sends |
| Spam complaint rate | % of recipients who report a campaign as spam | Must not exceed 0.1% . above this level, SendGrid domain reputation degrades |

## Sample Size & Duration

### Sample Size Calculation

| Parameter | Value |
|-----------|-------|
| **Baseline conversion rate** | 12% [fictional] |
| **Minimum detectable effect (MDE)** | 8 percentage points absolute (12% → 20%) |
| **Statistical significance (alpha)** | 0.05 (two-tailed) |
| **Statistical power (1-beta)** | 0.80 |
| **Users per variant** | 1,180 merchants (rounded to 1,200 [fictional]) |
| **Total users needed** | 2,400 merchants [fictional] |

### Duration Estimate

| Parameter | Value |
|-----------|-------|
| **Daily eligible traffic** | ~113 newly eligible non-adopter merchants/day [fictional] (6,800 total / 60 days) |
| **Traffic allocation** | 100% of eligible segment to experiment (no holdout) |
| **Users per day in experiment** | ~113 merchants/day [fictional] across both variants |
| **Minimum duration** | ~22 days to reach 2,400 merchants [fictional] |
| **Recommended duration** | 60 days . covers the full hypothesis measurement window and two distinct seasonal sub-periods (May promotions + early June) |

## Audience Targeting

### Inclusion Criteria

- Active Storevine merchant account (account status: active, not suspended)
- No prior sent campaign in Campaigns (first_send_completed event has never fired for this merchant_id)
- No active external email tool API integration (Klaviyo, Mailchimp, or other detected integrations are absent)
- Fewer than 250 customers in the Storevine account [fictional]
- At least one published product in the Storevine storefront (required for pre-population in treatment variant)

### Exclusion Criteria

- Storevine internal employee accounts and QA test accounts
- Merchants who have accessed the Campaigns beta during the pre-GA beta period
- Merchants currently enrolled in any other active Campaigns experiment

### Traffic Allocation

| Variant | Allocation |
|---------|------------|
| Control (A) | 50% |
| Treatment (B) | 50% |

## Success Criteria

### Win (Ship Treatment)

Treatment variant's first campaign send rate is ≥30% [fictional] at 60 days with p < 0.05 (two-tailed), and no guardrail metric degrades beyond its defined threshold. In this case, the guided first-campaign flow becomes the default experience for all new non-adopter merchants.

### Loss (Keep Control)

Treatment variant's first campaign send rate is lower than control or does not reach statistical significance, AND the point estimate is below 20% [fictional]. In this case, the guided flow design is revisited . specifically whether the pre-populated template content quality is driving abandonment rather than the blank-canvas problem.

### Inconclusive (More Data Needed)

Treatment variant's first campaign send rate is 20–29% [fictional] at 60 days but does not reach p < 0.05. In this case, run qualitative follow-up interviews with 10 non-completing treatment merchants to identify whether design, content, or audience-selection friction is blocking the final completion step before deciding whether to extend or iterate.

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Template quality drives abandonment rather than reducing it (auto-populated products look low-quality or irrelevant) | Medium | High | Design QA of template rendering across five representative merchant account types before GA; include an explicit merchant preview step before final send in the treatment variant |
| GA-day novelty effect inflates early treatment adoption (merchants curious about a new product are more likely to send regardless of the flow) | Medium | Medium | Use a 60-day window rather than a 7- or 14-day snapshot; novelty effects typically normalize within 2 weeks |
| Activation rate differs materially between variants, indicating feature flag selection bias | Low | High | Monitor campaigns_activation_rate in both variants during the first week; flag Engineering Lead if >5% [fictional] difference is observed |
| Merchant quality differs between control and treatment due to non-random assignment | Low | High | Confirm randomization is at the merchant_id level and is deterministic (same merchant always sees the same variant) |

### Monitoring Plan

- Check guardrail metrics (unsubscribe rate, spam complaint rate) daily during the first week of the test via the send failure rate alert in the Campaigns monitoring dashboard
- Do not check primary metric significance until 30 days have elapsed to avoid peeking bias
- Rollback criteria: if the spam complaint rate exceeds 0.1% [fictional] in either variant within the first 7 days, pause the experiment and review template content and audience defaulting logic before continuing

## Implementation Notes

- Feature flag name: `campaigns_guided_first_campaign_flow`; variant assignment at merchant_id level; 50/50 split
- First-campaign detection query: `SELECT COUNT(*) FROM campaigns WHERE merchant_id = ? AND status = 'sent'` . treatment flow is shown if count = 0
- Instrumentation: `campaign_sent` event must include `experiment_variant` property (`control` or `treatment`) for all sends during the test window; `first_send_completed` event must also include `experiment_variant`
- `experiment_variant` property must be set at the time of flow entry, not at send time, to correctly attribute sends where the merchant returns later to complete their campaign

## References

- Hypothesis document: "Pre-Populated Templates Drive First Campaign Sends for Non-Adopter Merchants" (Define phase, Feb 20, 2026)
- Figma: Campaigns creation flow v4 . control and treatment variants (internal)
- Instrumentation spec: Campaigns Guided First-Campaign Flow Events (Measure phase)
