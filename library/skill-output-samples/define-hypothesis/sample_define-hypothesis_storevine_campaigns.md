---
title: "Define Hypothesis: Storevine Campaigns"
description: "Storevine B2B ecommerce platform - Campaigns v1 first-campaign guided flow hypothesis."
artifact: hypothesis
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: storevine
context: Storevine B2B ecommerce platform . Campaigns v1 first-campaign guided flow hypothesis
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

After completing eight merchant interviews that identified setup complexity as the primary barrier for the one-third of merchants who have no email program at all, Storevine's growth PM is formalizing the primary product hypothesis for the Campaigns guided first-campaign flow. The hypothesis targets the non-adopter segment specifically . merchants with fewer than 250 customers [fictional] and no active external email tool . on the belief that pre-populated product templates will eliminate the setup barrier that has prevented first sends.

**Source Notes:**

- Mailchimp's Email Marketing Benchmarks report (mailchimp.com) documents that retail senders who start from pre-built templates show meaningfully higher campaign completion rates than those who begin with a blank canvas, establishing template scaffolding as a known activation lever for first-time email senders.
- Nielsen Norman Group research on small business tool adoption (nngroup.com) identifies perceived setup complexity . not price . as the leading reason owner-operators abandon new tools before completing their first task, consistent with the merchant interview findings about email avoidance.
- Shopify's FY2023 Annual Report describes the 10,000-email/month free tier and template-first setup flow in Shopify Email as a key driver of new-merchant email adoption, validating the combined effect of zero-cost entry and a guided first-send experience.

---

## Prompt

```
/hypothesis

Project: Campaigns . native email marketing for Storevine merchants
Stage: Post-discovery, pre-PRD finalization

Hypothesis I want to define:
- Non-adopter merchants (no active external email tool, <250 customers)
  are ~38% of our active base [fictional] and represented 3 of 8 merchant
  interview participants (P3, P6, and P8)
- Core belief: setup complexity is the barrier . not awareness or price
- Specific hypothesis: a guided first-campaign flow with product-seeded
  templates will drive first-send rate from ~12% [fictional] to ≥30%
  [fictional] within 60 days of GA

Prior work to reference:
- Merchant interview synthesis (Jan 12 - 28, 2026): P3, P6, and P8 described
  email as "too overwhelming to start" or perennially "on the list"
- Competitive analysis (Feb 2026): Shopify Email's template-first + free
  tier activation is their primary new-merchant onboarding lever
- Problem statement: email-related churn estimated at 4.8 pp [fictional]
  of overall 22% [fictional] annual merchant churn rate

Need: full hypothesis document with success metrics, validation approach,
pass/fail criteria, and risks. Will attach to PRD as primary testable belief.
```

---

## Output

# Hypothesis: Pre-Populated Templates Drive First Campaign Sends for Non-Adopter Merchants

## Hypothesis Statement

**We believe that** providing non-adopter merchants with a guided first-campaign flow featuring pre-populated email templates seeded with their existing Storevine product catalog and customer list

**for** Storevine merchants with no active external email tool and fewer than 250 customers [fictional], representing approximately 38% [fictional] of the active merchant base

**will** increase the rate of first campaign sends among this segment from 12% [fictional] to 30% [fictional] or more within 60 days of Campaigns GA

**as measured by** the percentage of eligible non-adopter merchants who complete and send their first Campaigns campaign within 60 days of account activation

## Background & Rationale

### Problem Context

Merchant interviews conducted January 12 - 28, 2026 identified three distinct segments with respect to email: Klaviyo power users locked in by data and workflow dependency, Mailchimp users reluctant to switch due to migration friction, and non-adopters who have never built an email program at all. Three of eight participants fell into the non-adopter category; all three cited setup intimidation as the reason they have not started. Interview Insight 2 identified this segment as structurally easier to activate than switchers because there is no migration cost, no existing workflow to replicate, and no seasonal disruption risk to navigate. This hypothesis addresses that insight directly.

### Supporting Evidence

Merchant interviews produced direct behavioral evidence: P3 said "every time I think about it I get overwhelmed and I just post on Instagram instead," and P6 described email as "on the list for this year" despite having not sent a single campaign. Competitive analysis found that Shopify Email's template-first setup flow and free-tier activation model are its primary differentiators for new merchants. Nielsen Norman Group research establishes that perceived complexity at setup . not price . is the leading abandonment driver for first-time small-business tool adopters. The current 12% [fictional] first-send completion rate for merchants who reach the legacy Campaigns setup screen without a guided flow is the internal baseline this hypothesis is designed to address.

### Alternative Hypotheses Considered

An alternative framing . that price is the primary barrier . was considered and set aside. Interview participants P3 and P6 did not cite cost as a factor; both described a motivation gap, not an affordability gap. A second alternative . that non-adopters need education and awareness rather than a product change . was also considered but rejected: all three non-adopter participants were aware that email marketing exists and acknowledged they should be doing it. The gap is in the first-action experience, not in awareness.

## Target User Segment

### Definition

Storevine merchants who meet all of the following criteria at the time of Campaigns GA: (1) no active integration with Klaviyo, Mailchimp, Campaign Monitor, or any other external email tool; (2) fewer than 250 customers in their Storevine account [fictional]; (3) no prior email campaign sent using Storevine's legacy email tools; and (4) at least one published product in their storefront.

### Segment Size

Approximately 6,800 active merchants [fictional], representing 38% [fictional] of the ~18,000 active merchant base [fictional]. This estimate derives from integration data (accounts with no active external email tool API connection) cross-referenced with customer count. Merchants in this segment are disproportionately newer to the platform; median account age is 14 months [fictional] versus 31 months [fictional] for the Klaviyo-integrated segment.

### Current Behavior

Non-adopter merchants in this segment log into Storevine primarily to manage orders, update product listings, and review storefront analytics. Email marketing is either not on their radar or sits on a persistent mental backlog they never act on. When they have encountered the legacy Storevine email send flow, session data shows a median time-to-exit under 3 minutes [fictional] . consistent with abandonment at the template selection step before a campaign is drafted.

## Success Metrics

### Primary Metric

| Metric | Current Baseline | Target | Minimum Detectable Effect |
|--------|-----------------|--------|--------------------------|
| First campaign send rate (non-adopter segment, 60 days post-GA) | 12% [fictional] | 30% [fictional] | 8 percentage points |

### Secondary Metrics

| Metric | Current Baseline | Expected Direction |
|--------|-----------------|-------------------|
| Median time from account activation to first campaign send | >45 min [fictional] | Decrease |
| Second campaign send rate (non-adopters, 90 days post-GA) | 4% [fictional] | Increase |
| Campaigns activation rate (eligible merchants who enter the flow) | 22% [fictional] | Increase |

### Guardrail Metrics

| Metric | Current Value | Acceptable Range |
|--------|--------------|------------------|
| Email unsubscribe rate (first campaigns) | 0.8% [fictional] | Below 2.0% |
| Spam complaint rate (first campaigns) | 0.05% [fictional] | Below 0.1% |
| Support ticket volume (email-related, first 30 days post-GA) | GA-week baseline [fictional] | No more than 20% above GA-week baseline |

## Validation Approach

### Method

A/B test within the non-adopter segment. Control variant: the existing Campaigns setup flow with a blank template editor and a library of generic templates with no pre-population. Treatment variant: a guided first-campaign flow that pre-populates a template with the merchant's top 3 products by sales volume and an audience segment automatically filtered to customers with at least one prior purchase. Merchants in both variants see the same initial Campaigns entry point in the Storevine admin.

### Sample Size & Duration

- Sample size: 1,200 merchants per variant [fictional], drawn from the eligible non-adopter segment at GA
- Duration: 60 days from Campaigns GA
- Traffic allocation: 50% control / 50% treatment, randomized at the merchant account level
- Note: The 60-day window covers two full seasonal cycles post-launch (late April through late June 2026), avoiding the confounding effect of a single promotion event driving first sends

### Pass/Fail Criteria

- **Validated if:** Treatment first-send rate is ≥30% [fictional] with statistical significance (p < 0.05) and no guardrail metric degradation
- **Invalidated if:** Treatment first-send rate is below 20% [fictional] or does not achieve statistical significance after 60 days
- **Inconclusive if:** Treatment first-send rate is 20 - 29% [fictional] . in this case, qualitative follow-up interviews with non-completing treatment merchants will inform whether a design iteration or a segment redefinition is needed

## Risks & Assumptions

### Key Assumptions

- Non-adopters who complete a first campaign with pre-populated content will experience Campaigns as meaningfully easier than prior attempts with blank templates . and will attribute the ease to the pre-population feature rather than to general novelty.
- Product catalog and customer data in non-adopter merchant accounts is sufficiently populated to generate a usable pre-populated template; merchants with empty catalogs or zero customers will be excluded from the treatment group and measured separately.
- Q2 2026 (the test window) is not an anomalously high or low email send period for the non-adopter segment; seasonal variation will not materially confound the 60-day measurement window.

### Risks

- **Template quality risk:** If the auto-generated template with the top-3 products produces an email that looks low-quality or misrepresents the merchant's brand, it may increase abandonment rather than reduce it. Mitigation: design QA across five representative merchant account types before launch; explicit merchant preview step before send is required.
- **Attribution ambiguity:** Non-adopters motivated by Campaigns marketing or launch awareness may have converted regardless of the guided flow. The A/B test design partially controls for this by randomizing within the same population, but intent differences cannot be fully eliminated.
- **GA timing risk:** If GA is delayed past May 2026, the test window shifts into the summer season, which may have different email engagement dynamics for fashion and home merchants. Monitor GA date and adjust test window accordingly.

## Timeline

| Phase | Dates | Duration |
|-------|-------|----------|
| Setup & instrumentation | Mar 17  -  Apr 4, 2026 | 3 weeks |
| Test running | Apr 28  -  Jun 27, 2026 (60 days from GA) | 60 days |
| Analysis | Jun 28  -  Jul 5, 2026 | 1 week |
| Decision | Jul 7, 2026 | . |
