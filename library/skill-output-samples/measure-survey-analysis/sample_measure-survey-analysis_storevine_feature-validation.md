---
title: "Measure Survey Analysis: Storevine Feature Validation"
description: "Storevine B2B - validating which forecasting feature to build next from a 180-admin survey; one hypothesis supported, one contradicted."
artifact: survey-analysis
version: "1.0"
repo_version: "2.18.0"
skill_version: "1.0.0"
created: 2026-05-21
status: sample
thread: storevine
context: Storevine B2B forecasting platform - feature-prioritization survey of 180 customer admins, segmented by company size
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Storevine surveyed 180 customer admins to decide which forecasting feature to build next. The team went in with two hypotheses: that multi-warehouse support is the top ask, and that seasonal-adjustment accuracy is close behind. This demonstrates the **single-hypothesis validation** pattern with a reasonably strong B2B sample and a mixed result - one hypothesis supported, one contradicted - plus a segment cut by company size. The survey is illustrative; invented data is tagged `[fictional]`.

**Source Notes:**

- Jeff Sauro and James R. Lewis, "Quantifying the User Experience" (Morgan Kaufmann) - the treatment of sample size and approximate confidence intervals for survey proportions, and the caution against implying precision the sample cannot support.
- Don A. Dillman, "Internet, Phone, Mail, and Mixed-Mode Surveys: The Tailored Design Method" (Wiley) - the methodology audit of recruitment and response representativeness used in the methodology section.

---

## Prompt

```
/survey-analysis

analyze our storevine feature-prioritization survey. 180 customer admins
responded. we asked them to rate 5 candidate features by importance and pick
their #1.

our hypotheses going in:
- H1: multi-warehouse support is the top ask
- H2: seasonal-adjustment accuracy is a close second

segment by company size (we captured it). tell us what to build next.
```

---

## Output

# Survey Analysis: Storevine Next-Feature Validation

## Executive Summary

With 180 admin responses, the data is strong enough for directional B2B conclusions but not fine-grained certainty. **Hypothesis H1 (multi-warehouse is the top ask) is CONTRADICTED**: multi-warehouse ranks third overall and its demand is concentrated entirely in large customers. The clear cross-segment winner is **forecast accuracy transparency (confidence scores on each forecast)**, which the team had not hypothesized. H2 (seasonal adjustment) is INCONCLUSIVE. Confidence: Medium-High. The most important caveat: this measures stated importance, not willingness to pay or switch.

## Survey Methodology Summary

- **Sample size (N):** 180 admins (response rate ~22% of invited accounts `[fictional]`)
- **Recruitment method:** Email to the primary admin on each active account
- **Who responded vs. who was invited:** One admin per account; reflects admin priorities, which may differ from end-user (analyst) priorities
- **Selection bias risks:** Engaged accounts over-represented; struggling accounts less likely to respond
- **Question-design risks:** Forced-rank reduces "everything is important" inflation; importance ratings are subjective

These choices affect interpretation: this is the admin's view, not the daily forecasting analyst's view.

## Per-Question Analysis

Approximate margin of error at N=180 is about +/- 7 percentage points (95%); treat all proportions as approximate, not precise.

| Q# | Question | Distribution (top picks) | Confidence | What it shows | What it does NOT show |
|---|---|---|---|---|---|
| Q1 | Your #1 most-wanted feature | Accuracy transparency 34% / Supplier lead-time 22% / Multi-warehouse 19% / Seasonal adj 15% / Mobile 10% `[fictional]` | Medium-High | Accuracy transparency leads cross-segment | Willingness to pay |
| Q2 | Rate each feature 1-5 importance | Accuracy transparency mean 4.4; Multi-warehouse 3.6 `[fictional]` | Medium-High | Confirms the ranking | Intensity vs. actual usage |
| Q3 | Company size (segment) | Small 45 / Mid 60 / Large 75 | - | Enables the segment cut | - |

## Persona / Segment Breakdown

| Segment | n | #1 feature | Note |
|---|---|---|---|
| Small (under 200 emp) | 45 | Accuracy transparency (42%) | Multi-warehouse near zero |
| Mid (200-1000) | 60 | Accuracy transparency (33%) | Supplier lead-time strong here |
| Large (1000+) | 75 | Multi-warehouse (38%) | Drives the entire multi-warehouse signal `[fictional]` |

All three segments exceed n=30, so the cuts are defensible. The key finding: **multi-warehouse demand lives almost entirely in the large segment**; overall it looked like a mid-tier ask only because large customers pulled it up.

## Open-Text Thematic Clustering

AI-assisted clustering of the optional comment field (96 responses `[fictional]`); quotes illustrative `[fictional]`.

| Theme | Approx. mentions | Representative quotes | Valence | Note |
|---|---|---|---|---|
| Trust in the forecast | ~40 | "I need to know when to trust a number" `[fictional]` | Request | Reinforces accuracy-transparency |
| Multi-warehouse (large only) | ~20 | "We run 6 DCs, single-warehouse is a dealbreaker" `[fictional]` | Negative | Large-segment only |
| Supplier lead-time | ~18 | "lead-time variance wrecks our reorders" `[fictional]` | Request | Strong in mid |

## Hypothesis Validation

| Hypothesis | Status | Evidence | Confidence |
|---|---|---|---|
| H1: Multi-warehouse is the top ask | CONTRADICTED | Ranks 3rd overall (19%); demand is large-segment-only | Medium-High |
| H2: Seasonal adjustment is a close second | INCONCLUSIVE | Ranks 4th (15%); no strong segment signal | Medium |
| Emergent: Accuracy transparency is the top cross-segment ask | SUPPORTED | #1 overall (34%), highest importance mean, top in 2 of 3 segments | Medium-High |

## What the Data Does NOT Show

- **Population not represented:** Daily forecasting analysts (only admins surveyed); struggling/at-risk accounts
- **Questions not answered:** Willingness to pay for any feature; whether multi-warehouse would win/retain large deals
- **Confounds:** Admin priorities may diverge from end-user priorities
- **Follow-up that would close the biggest gap:** Interviews with large-account admins on multi-warehouse deal impact; a willingness-to-pay question next round

## Prioritized Recommendations

| # | Recommendation | Evidence | Confidence | Counter-evidence | Research that would strengthen it |
|---|---|---|---|---|---|
| 1 | Build accuracy transparency (confidence scores) next | #1 cross-segment, highest importance | Medium-High | Stated, not paid; admins not analysts | Analyst interviews; a pricing question |
| 2 | Scope multi-warehouse as a large-segment / enterprise feature, not a default | Demand is large-only | Medium-High | Large deals may be revenue-concentrated | Large-account deal-impact interviews |
| 3 | Treat supplier lead-time as the mid-segment follow-on | Strong in mid segment + open text | Medium | Smaller overall share | Mid-segment validation |
| 4 | Defer seasonal adjustment | Ranked low, no segment champion | Medium | Could matter seasonally | Re-ask near a seasonal peak |

## Next Steps

- Prototype accuracy transparency and validate with daily forecasting analysts before committing to a build (this survey shows admin stated preference, not analyst need or willingness to pay); position multi-warehouse on the enterprise track
- Interview large-account admins before sizing multi-warehouse investment (revenue concentration may justify it despite low overall rank)
- This analysis can prioritize the next feature; it cannot set pricing or confirm willingness to pay
