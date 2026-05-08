---
title: "Measure Experiment Results: Workbench Blueprints"
description: "Workbench enterprise collaboration platform: Blueprints required-section enforcement A/B test results."
artifact: experiment-results
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: workbench
context: Workbench enterprise collaboration platform: Blueprints required-section enforcement A/B test results
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

The required-section enforcement A/B test ran from March 9 through April 5, 2026, across 80 closed-beta enterprise accounts [fictional]. Leo M. (Data Analyst) has compiled the results and Rachel V. is drafting the experiment-results document to present at the April 14 ship-decision meeting with Sandra C. (Head of Product) and James W. (VP Engineering).

The experiment tested whether making Blueprint sections required (submit button disabled until all required sections have content) would reduce the median time from creation to first approval compared to the control group where all sections were optional. Account-level randomization was used to prevent spillover effects within organizations, ensuring that all authors within a given account experienced the same variant throughout the test period.

### Source Notes

- A/B test statistical methodology: Ron Kohavi, Diane Tang, Ya Xu, "Trustworthy Online Controlled Experiments," Cambridge University Press, 2020
- Mann-Whitney U test for non-normal distributions: Mann & Whitney, 1947; widely used in A/B testing for skewed metrics such as time-to-event data
- Sequential testing and early stopping corrections: Johari et al., "Peeking at A/B Tests," KDD 2017

## Prompt

```
/experiment-results

Leo M. just finished the A/B test analysis. I need a full experiment-results document for the April 14 ship-decision meeting. Here are the results:

**Experiment details:**
- Name: Required-Section Enforcement A/B Test
- Duration: Mar 9 -- Apr 5, 2026 (28 days)
- Accounts: 80 closed-beta enterprise accounts [fictional]; 40 treatment, 40 control
- Randomization: Account-level (all users within an account see the same variant)
- Total Blueprints created during test: 612 (298 treatment, 314 control) [fictional]

**Primary metric:**
- Median time-to-approved: Treatment 2.4 days [fictional] vs. Control 4.0 days [fictional]
- Relative change: -40% [fictional]
- Mann-Whitney U test: p = 0.001
- 95% CI for median difference: 1.2 -- 2.0 days [fictional]

**Secondary metrics:**
- Empty-section submission rate: Treatment 6% [fictional] vs. Control 37% [fictional]
- Approval cycle count: Treatment 1.4 [fictional] vs. Control 2.3 [fictional]
- Blueprint completion rate (% of started Blueprints that reach approval): Treatment 78% [fictional] vs. Control 71% [fictional]

**Guardrail metrics:**
- Author satisfaction (in-app survey, 1-5 scale): Treatment 3.8 [fictional] vs. Control 3.9 [fictional] (not significant, p=0.42)
- Blueprint creation rate (Blueprints started per account per week): Treatment 3.7 [fictional] vs. Control 3.9 [fictional] (not significant, p=0.31)
- Average section word count: Treatment 142 words [fictional] vs. Control 128 words [fictional] (significant, p=0.03)

**Segment analysis:**
- By company size: Large (200+ employees): -44% time-to-approved [fictional]; Mid (50-199): -38% [fictional]; Small (10-49): -31% [fictional]
- By template type: Project kickoff templates: -45% [fictional]; Process documentation: -35% [fictional]; Meeting notes: -22% [fictional]

**Surprising finding:** Authors in the treatment group wrote 11% more words per section on average [fictional]. We think the required-section badges acted as a psychological prompt to write more thoroughly.

**Recommendation:** Ship. Required-section enforcement exceeded our MDE of 1.0 day with high confidence.

Please generate the full experiment-results document for the ship-decision meeting.
```


## Output

# Experiment Results: Required-Section Enforcement A/B Test

## Summary

Required-section enforcement reduced the median time from Blueprint creation to first approval by 40%, from 4.0 days to 2.4 days [fictional] (p=0.001). The empty-section submission rate dropped from 37% to 6% [fictional], and the average approval cycle count fell from 2.3 to 1.4 [fictional]. Guardrail metrics (author satisfaction, Blueprint creation rate) showed no significant degradation. An unexpected positive finding was that authors in the treatment group wrote 11% more words per section on average [fictional], suggesting the "Required" badges acted as a quality prompt rather than merely a compliance gate. Recommendation: ship required-section enforcement as the default behavior for all Blueprints.

## Hypothesis Recap

**Hypothesis:** If we enforce required-section completeness at the submission gate (submit button disabled until all required sections contain content), then the median time-to-approved will decrease by at least 1.0 day [fictional] (minimum detectable effect) because approvers will receive complete documents that require fewer revision cycles.

**Test design:** Account-level randomization across 80 closed-beta enterprise accounts [fictional]. Treatment group (40 accounts): required-section enforcement enabled. Control group (40 accounts): all sections optional, no enforcement. Duration: 28 days (March 9 through April 5, 2026). Statistical test: Mann-Whitney U (chosen because time-to-approved is right-skewed). Significance threshold: alpha = 0.05. The experiment ran for its full pre-registered duration without interim stopping.

## Results

### Primary Metric: Median Time-to-Approved

| Metric | Control | Treatment | Change | p-value |
|---|---|---|---|---|
| Median time-to-approved | 4.0 days [fictional] | 2.4 days [fictional] | -40% (-1.6 days) [fictional] | 0.001 |
| 95% CI for median difference | | | 1.2 to 2.0 days [fictional] | |
| Blueprints analyzed | 314 [fictional] | 298 [fictional] | | |

The observed effect (-1.6 days [fictional]) exceeds the pre-registered minimum detectable effect (MDE) of 1.0 day [fictional] with high confidence. The 95% confidence interval (1.2 to 2.0 days [fictional]) is entirely above the MDE threshold, indicating that the true effect is very likely to be practically significant. Put differently, even the lower bound of the confidence interval exceeds our target, which gives the team strong grounds for a ship decision.

### Secondary Metrics

| Metric | Control | Treatment | Change | p-value |
|---|---|---|---|---|
| Empty-section submission rate | 37% [fictional] | 6% [fictional] | -84% [fictional] | < 0.001 |
| Approval cycle count (mean) | 2.3 cycles [fictional] | 1.4 cycles [fictional] | -39% [fictional] | < 0.001 |
| Blueprint completion rate | 71% [fictional] | 78% [fictional] | +10% [fictional] | 0.04 |

The 6% empty-section rate in the treatment group [fictional] (down from 37% [fictional]) represents cases where authors found workarounds, likely pasting placeholder text or minimal content to satisfy the non-whitespace check. This is below the 10% target [fictional] but warrants monitoring post-launch to ensure the rate does not climb as more authors encounter the enforcement gate.

The higher completion rate in the treatment group (78% vs. 71% [fictional]) suggests that required-section enforcement acts as a commitment device: authors who start a Blueprint are more likely to finish it when the structure guides them toward completion. This was not part of the original hypothesis but aligns with behavioral research on structured task completion.

### Guardrail Metrics

| Metric | Control | Treatment | Change | p-value | Status |
|---|---|---|---|---|---|
| Author satisfaction (1-5 scale) | 3.9 [fictional] | 3.8 [fictional] | -0.1 [fictional] | 0.42 | Pass (not significant) |
| Blueprint creation rate (per account/week) | 3.9 [fictional] | 3.7 [fictional] | -0.2 [fictional] | 0.31 | Pass (not significant) |
| Average section word count | 128 words [fictional] | 142 words [fictional] | +11% [fictional] | 0.03 | Pass (positive direction) |

No guardrail metric showed a significant negative effect. The slight dip in author satisfaction (-0.1 [fictional]) is not statistically significant and within normal survey noise. Blueprint creation rate did not decrease meaningfully, indicating that enforcement did not discourage authors from starting new Blueprints. This was a key concern raised by Sandra C. before the experiment launched, and the data clearly addresses it.

The increase in average section word count (+11% [fictional], p=0.03) is a positive secondary effect: authors wrote more thoroughly when sections were marked as required. This suggests the visual "Required" badges serve as a psychological prompt to invest more effort in each section, rather than merely compelling authors to meet a minimum bar.

## Segment Analysis

### By Company Size

| Segment | Accounts | Control time-to-approved | Treatment time-to-approved | Change |
|---|---|---|---|---|
| Large (200+ employees) | 18 [fictional] | 4.5 days [fictional] | 2.5 days [fictional] | -44% [fictional] |
| Mid (50-199 employees) | 34 [fictional] | 3.9 days [fictional] | 2.4 days [fictional] | -38% [fictional] |
| Small (10-49 employees) | 28 [fictional] | 3.5 days [fictional] | 2.4 days [fictional] | -31% [fictional] |

The effect is strongest in large enterprises (-44% [fictional]), where approval chains tend to be longer and the cost of revision cycles is highest. This aligns with our target customer profile for Blueprints GA and supports the thesis that Blueprints is especially valuable for organizations with complex governance structures. Even the smallest segment shows a meaningful improvement, confirming that the feature works across the full range of customer sizes in the beta cohort.

### By Template Type

| Template type | Blueprints | Control time-to-approved | Treatment time-to-approved | Change |
|---|---|---|---|---|
| Project kickoff | 245 [fictional] | 4.8 days [fictional] | 2.6 days [fictional] | -45% [fictional] |
| Process documentation | 218 [fictional] | 3.5 days [fictional] | 2.3 days [fictional] | -35% [fictional] |
| Meeting notes | 149 [fictional] | 2.8 days [fictional] | 2.2 days [fictional] | -22% [fictional] |

Project kickoff templates benefit most from required-section enforcement (-45% [fictional]), likely because they have the most complex structure and the most required sections. These templates also tend to involve multiple stakeholders and formal approval chains, making them the highest-leverage target for enforcement. Meeting notes show the smallest improvement (-22% [fictional]), which makes sense because meeting notes tend to be shorter and simpler, with fewer sections that benefit from enforcement.

### Segment Insights

1. The effect scales with organizational complexity: larger companies and more structured templates see larger gains.
2. Even the smallest segment (small companies, meeting notes) shows a meaningful improvement (-22% to -31% [fictional]), suggesting the feature is valuable across the entire customer base.
3. No segment showed a negative effect, supporting a universal rollout rather than a targeted one.

## Visualization

### Primary Metric Over Time

The median time-to-approved diverged between treatment and control groups within the first week and remained stable throughout the experiment. By day 7, the treatment group's median had settled at approximately 2.5 days [fictional], while the control group hovered around 4.0 days [fictional]. No novelty effect or regression toward control was observed, suggesting the improvement is durable rather than driven by initial author curiosity. The stability of the treatment effect across all four weeks strengthens confidence that the observed improvement will persist at scale.

Weekly medians:

| Week | Control median | Treatment median |
|---|---|---|
| Week 1 (Mar 9-15) | 4.1 days [fictional] | 2.7 days [fictional] |
| Week 2 (Mar 16-22) | 3.9 days [fictional] | 2.5 days [fictional] |
| Week 3 (Mar 23-29) | 4.0 days [fictional] | 2.3 days [fictional] |
| Week 4 (Mar 30 - Apr 5) | 4.0 days [fictional] | 2.4 days [fictional] |

### Conversion Funnel Impact

| Funnel stage | Control | Treatment |
|---|---|---|
| Blueprint created | 314 [fictional] | 298 [fictional] |
| All sections started | 256 (82%) [fictional] | 271 (91%) [fictional] |
| Submitted for approval | 241 (77%) [fictional] | 259 (87%) [fictional] |
| Approved on first cycle | 152 (48%) [fictional] | 208 (70%) [fictional] |
| Approved (any cycle) | 223 (71%) [fictional] | 232 (78%) [fictional] |

The most dramatic improvement is in first-cycle approval rate: 70% of treatment Blueprints were approved on the first submission [fictional], compared to 48% for control [fictional]. This confirms that required-section enforcement eliminates the most common rejection reason (incomplete sections) and reduces the back-and-forth that inflates time-to-approved. The 22-percentage-point improvement in first-cycle approvals is arguably the most important finding in the funnel analysis, as it directly translates to fewer interruptions for both authors and approvers.

## Learnings

### What We Learned

1. **Enforcing completeness at the submission gate works.** A 40% reduction in time-to-approved [fictional] with no significant negative impact on author satisfaction validates the core hypothesis.
2. **Required sections act as a commitment device.** The 10% increase in Blueprint completion rate [fictional] was unexpected: authors who encounter required sections are more likely to finish the document, not less. This reframes enforcement from a blocker to a guide.
3. **The effect is strongest where it matters most.** Large enterprises and complex templates (our primary customer segment) see the largest improvements.
4. **Authors write more, not less.** The 11% increase in section word count [fictional] suggests that visual indicators prompt more thorough writing, not just bare-minimum compliance.

### Surprising Findings

1. **Word count increase.** We expected required-section enforcement to produce minimal-effort compliance (short text to clear the gate). Instead, authors wrote more. The "Required" badge appears to signal importance, prompting authors to invest effort rather than just meet the threshold. This finding has implications for how we design enforcement in other parts of the product.
2. **No creation-rate decline.** Pre-experiment, some stakeholders worried that enforcement would discourage Blueprint creation. Creation rates were statistically identical between groups (3.7 vs. 3.9 per account/week [fictional], p=0.31), effectively eliminating this concern.
3. **Small-company benefit.** We expected the effect to be concentrated in large enterprises. Small companies (10-49 employees) still saw a 31% reduction [fictional], suggesting that even lightweight teams benefit from structured document completion.

### What We Still Don't Know

1. **Long-term behavior.** The test ran for 28 days. We do not yet know if authors develop workarounds (placeholder text, copy-paste boilerplate) over months of use. Post-launch monitoring is planned, and Leo M. will run a content-quality analysis at the 30-day and 90-day post-GA marks.
2. **Optimal enforcement level.** We tested binary enforcement (required or optional). We do not know whether partial enforcement (for example, "recommended" sections with warnings but no gating) would produce similar results with less friction.
3. **Effect at full scale.** The test covered 80 accounts [fictional]. Behavior at 500 accounts [fictional] with different organizational cultures may differ. The progressive rollout (10%, 25%, 50%, 100%) will provide staged validation and early warning if the effect weakens at scale.

## Recommendation

### Decision: Ship

Required-section enforcement exceeded the pre-registered MDE (1.0 day [fictional]) by a wide margin (observed: 1.6 days [fictional]). The result is statistically significant (p=0.001), practically meaningful, and supported by positive movement in all secondary metrics. No guardrail metric was violated. The segment analysis confirms the effect is broad-based and strongest in our target customer profile.

### If Shipping

1. Remove the A/B test experiment flags and ship required-section enforcement as the default behavior for all Blueprint templates.
2. Template admins retain the ability to mark sections as required or optional; enforcement is controlled at the template level, not globally forced.
3. Monitor the empty-section submission rate weekly for the first 90 days post-GA. If the rate climbs above 15% [fictional], investigate workaround patterns and consider enforcement at the approval gate (rejecting submissions with detected placeholder text).
4. Prioritize the instrumentation spec to ensure all Blueprint lifecycle events are tracked from day one of GA.
5. Build the post-launch dashboard to track time-to-approved, empty-section rate, approval cycle count, and Blueprint completion rate at the account and template level.

### If Iterating

Not applicable; shipping as-is.

### If Killing

Not applicable; shipping as-is.

## Next Steps

| Action | Owner | Target date |
|---|---|---|
| Remove A/B test experiment flags | Karen L. | Apr 15, 2026 |
| Ship required-sections as default | Karen L. | Apr 16, 2026 |
| Finalize instrumentation spec for GA | Leo M. / Rachel V. | Apr 18, 2026 |
| Build post-launch monitoring dashboard | Leo M. | Apr 25, 2026 |
| GA launch (Blueprints v1) | Rachel V. | Apr 28, 2026 |
| 30-day post-launch review | Rachel V. / Leo M. | May 28, 2026 |

## Appendix

### Raw Data

Raw experiment data is available in the Workbench analytics warehouse under the dataset `blueprints_ab_test_required_sections_2026Q1`. Access restricted to the Blueprints product team and data engineering. Contact Leo M. for query access.

### Statistical Methodology

- **Test:** Mann-Whitney U test (non-parametric, appropriate for right-skewed time-to-event data)
- **Significance level:** alpha = 0.05 (two-tailed)
- **Power analysis (pre-test):** 250 Blueprints per variant required for 80% power to detect a 1.0-day difference [fictional]. Actual: 298 treatment, 314 control [fictional], meaning the experiment was adequately powered.
- **Multiple comparisons:** Secondary metrics are reported with unadjusted p-values. Bonferroni correction (alpha/3 = 0.017) does not change the significance of any secondary metric.
- **Sequential testing:** No interim analyses were conducted. The test ran for the full pre-registered duration (28 days).
- **Randomization check:** Pre-experiment account characteristics (company size, industry, historical Blueprint volume) were balanced between treatment and control groups (chi-squared test, p > 0.20 for all dimensions).

### Known Issues

1. **Six treatment-group accounts had fewer than 3 Blueprints during the test period [fictional].** These accounts are included in the analysis but contribute limited data. Excluding them does not meaningfully change the results (median time-to-approved shifts from 2.4 to 2.3 days [fictional]).
2. **One control-group account migrated from Confluence mid-test [fictional].** Their Blueprint volume spiked in week 3 as the team moved existing documents into Workbench. Excluding this account does not change the primary metric (control median remains 4.0 days [fictional]).
3. **Survey response rate for author satisfaction was 62% [fictional].** Non-response bias is possible but unlikely to be differential between groups (response rates were 61% treatment, 63% control [fictional]).
