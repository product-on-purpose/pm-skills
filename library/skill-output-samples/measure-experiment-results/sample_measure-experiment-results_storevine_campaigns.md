---
title: "Measure Experiment Results: Storevine Campaigns"
description: "Storevine B2B ecommerce platform - Campaigns guided first-campaign flow A/B test results."
artifact: experiment-results
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: storevine
context: Storevine B2B ecommerce platform . Campaigns guided first-campaign flow A/B test results
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Sixty days after the Campaigns GA, Storevine's growth PM documented the results of the guided first-campaign flow A/B test . the primary validation experiment for the Campaigns v1 hypothesis. The test ran its full 60-day window without any early stopping or design changes, and produced statistically significant results across both the primary metric and key secondary metrics.

**Source Notes:**

- Evan Miller, "Sample Size Calculator" (evanmiller.org/ab-testing/sample-size.html) . the power calculation methodology used to determine the 1,200-merchant-per-variant [fictional] sample size that this experiment was designed to reach before analysis, ensuring 80% power to detect an 8 percentage point improvement.
- Chi-squared test for two proportions . the statistical method used to assess significance for the primary metric (first-send rate as a binary outcome); appropriate for comparing proportions between two independent groups.
- Nielsen Norman Group research on first-use guided experiences (nngroup.com) . the original behavioral research basis for the hypothesis that pre-populated templates would reduce setup-complexity-driven abandonment; the experiment results confirm this mechanism.

---

## Prompt

```
/experiment-results

Experiment: Campaigns guided first-campaign flow A/B test
Ran: April 28 – June 27, 2026 (60 days from GA)

Results:
- Control (blank canvas): 13.4% first-send rate, N=1,204 merchants [fictional]
- Treatment (guided flow): 31.7% first-send rate, N=1,198 merchants [fictional]
- p < 0.001, statistically significant

Secondary metrics:
- Median time to first send: 43 min (control) vs. 12 min (treatment) [fictional]
- Second campaign rate (90 days): 9.1% control vs. 22.8% treatment [fictional]

Guardrail metrics all within acceptable range.

Segment finding: treatment effect strongest in fashion/home merchants
(38.2% vs. 14.6% control) [fictional]; weakest in specialty food (24.1%
vs. 11.8% control) [fictional]

Decision: ship the guided flow as default. Need full results document
for stakeholder review and decision record.
```

---

## Output

# Experiment Results: Campaigns Guided First-Campaign Flow A/B Test

## Summary

| Attribute | Value |
|-----------|-------|
| **Experiment ID** | CAM-EXP-001 |
| **Experiment Name** | Campaigns: Guided First-Campaign Flow A/B Test |
| **Status** | Completed |
| **Duration** | April 28, 2026 to June 27, 2026 (60 days) |
| **Traffic Allocation** | 50% control / 50% treatment |
| **Total Sample Size** | 2,402 merchants [fictional] |
| **Owner** | Growth PM, Storevine |
| **Design Doc** | Experiment Design: Guided First-Campaign Flow (Measure phase) |

---

## Hypothesis Recap

**Original Hypothesis:**

> We believed that providing non-adopter merchants with a guided first-campaign flow featuring pre-populated product templates would increase first campaign send completion rate from 12% [fictional] to ≥30% [fictional] within 60 days of Campaigns GA.

**Success Criteria:**

- Primary metric: First campaign send rate ≥30% [fictional] in treatment
- Statistical significance: p < 0.05
- Minimum sample size: 2,400 merchants [fictional]

---

## Results

### Primary Metric: First Campaign Send Rate (60 Days)

| Variant | Value | Sample Size | Confidence Interval |
|---------|-------|-------------|---------------------|
| Control | 13.4% [fictional] | 1,204 [fictional] | 11.6% – 15.2% |
| Treatment | 31.7% [fictional] | 1,198 [fictional] | 29.2% – 34.2% |

**Observed Difference:** +18.3 percentage points [fictional] (+136.6% relative)

**Statistical Significance:**
- p-value: <0.001
- Confidence level: 99.9%
- Statistically significant: Yes

**Interpretation:**

Treatment merchants sent their first campaign at a rate of 31.7% [fictional] within 60 days . exceeding the 30% [fictional] target by 1.7 percentage points [fictional] and more than doubling the control rate of 13.4% [fictional]. The result is highly statistically significant (p < 0.001), meaning the probability that this difference is due to chance is less than 0.1%. The guided first-campaign flow with pre-populated product templates is confirmed as the primary activation lever for non-adopter merchants.

---

### Secondary Metrics

| Metric | Control | Treatment | Difference | Significant? |
|--------|---------|-----------|------------|----|
| Median time to first send (minutes) | 43 min [fictional] | 12 min [fictional] | −31 min [fictional] | Yes (Mann-Whitney, p < 0.001) |
| Second campaign send rate (90 days) | 9.1% [fictional] | 22.8% [fictional] | +13.7 pp [fictional] | Yes (p < 0.001) |
| Campaigns activation rate (merchants who opened the flow) | 34.2% [fictional] | 35.8% [fictional] | +1.6 pp [fictional] | No (p = 0.31) . variants are comparable |

### Guardrail Metrics

| Metric | Control | Treatment | Threshold | Status |
|--------|---------|-----------|-----------|--------|
| Email unsubscribe rate | 0.72% [fictional] | 0.91% [fictional] | No degradation > 2.0% | Pass |
| Spam complaint rate | 0.04% [fictional] | 0.05% [fictional] | No degradation > 0.1% | Pass |

---

## Segment Analysis

### By Merchant Product Category

| Segment | Control | Treatment | Difference | Significant? |
|---------|---------|-----------|------------|----|
| Fashion and home goods | 14.6% [fictional] | 38.2% [fictional] | +23.6 pp [fictional] | Yes |
| Beauty and skincare | 12.8% [fictional] | 29.4% [fictional] | +16.6 pp [fictional] | Yes |
| Specialty food | 11.8% [fictional] | 24.1% [fictional] | +12.3 pp [fictional] | Yes |
| Outdoor and sporting | 13.9% [fictional] | 30.8% [fictional] | +16.9 pp [fictional] | Yes |

### By Merchant Customer Count

| Segment | Control | Treatment | Difference | Significant? |
|---------|---------|-----------|------------|----|
| 0–50 customers [fictional] | 8.2% [fictional] | 22.6% [fictional] | +14.4 pp [fictional] | Yes |
| 51–150 customers [fictional] | 14.1% [fictional] | 33.9% [fictional] | +19.8 pp [fictional] | Yes |
| 151–250 customers [fictional] | 17.6% [fictional] | 39.4% [fictional] | +21.8 pp [fictional] | Yes |

### Segment Insights

The treatment effect is consistent across all analyzed segments . no segment shows a null or negative treatment effect. The effect is strongest in the fashion and home goods category, consistent with merchant interview finding that these merchants have higher seasonal awareness and were more motivated to send promotional campaigns. The effect scales with customer count: merchants closer to the 250-customer threshold show a larger absolute improvement, likely because they have more product sales history to populate the pre-filled template with meaningful top-products data. The 0–50 customer segment shows the smallest absolute improvement but still a strong relative effect (+176% [fictional]), suggesting even very early-stage merchants benefit from the guided flow.

---

## Visualization

### Primary Metric Over Time

First campaign send cumulative rate for both variants over 60 days from GA: treatment diverges from control within the first week and maintains a stable lead through the end of the test window. No significant novelty effect observed . the treatment rate does not spike and decay, but builds steadily, confirming the sustained utility of the guided flow rather than a curiosity-driven burst.

[Amplitude dashboard link . Campaigns EXP-001 primary metric trend]

### Conversion Funnel Impact

| Funnel Step | Control | Treatment |
|-------------|---------|-----------|
| Merchant opens Campaigns flow | 34.2% [fictional] | 35.8% [fictional] |
| Merchant selects or confirms audience | 71.3% of openers [fictional] | 88.6% of openers [fictional] |
| Merchant completes subject line | 52.4% of openers [fictional] | 79.2% of openers [fictional] |
| Merchant clicks Send | 39.2% of openers [fictional] | 88.5% of openers [fictional] |

The primary funnel drop in the control variant is between audience confirmation and subject line completion . consistent with the hypothesis that blank-canvas complexity drives abandonment at the content creation step. In the treatment variant, the drop is much smaller at this step, confirming that pre-populated content reduces the friction that was causing abandonment.

---

## Learnings

### What We Learned

1. **Pre-populated content is the key mechanism.** The treatment's impact on funnel drop-off is concentrated at the content creation step (template + subject line), not at the audience selection step. Merchants in both variants selected an audience at comparable rates; only the treatment variant maintained high completion rates into the send step. This isolates the pre-populated template . not the guided flow's UX structure or the progress indicator . as the primary driver of the effect.

2. **The effect is durable, not a novelty spike.** Cumulative first-send rates continued climbing throughout the 60-day window in the treatment variant without the plateau common in novelty-driven experiments. The second campaign send rate of 22.8% [fictional] (vs. 9.1% [fictional] control at 90 days) suggests that merchants who send once under the guided flow develop enough familiarity with Campaigns to continue sending without further guided scaffolding.

3. **The time savings are operationally significant.** Reducing median time to first send from 43 minutes [fictional] to 12 minutes [fictional] is not just a UX improvement . it changes the economic calculus for a merchant owner-operator who is deciding whether email marketing is worth the time cost. A 12-minute first send is achievable in a between-tasks break; a 43-minute send requires dedicated time.

### Surprising Findings

- The Campaigns activation rate (merchants who opened the flow) was nearly identical between control and treatment (34.2% vs. 35.8% [fictional]) . the guided flow did not meaningfully increase top-of-funnel entry. All of the treatment effect is in the completion rate, not the entry rate. This means the activation message or entry point is not what needs improvement; the content of the flow is what drives the difference.
- Fashion and home goods merchants showed the strongest treatment effect despite being the most likely to already have some exposure to email marketing tools . the expectation was that less-sophisticated merchants would benefit most. This warrants further investigation.

### What We Still Don't Know

- Whether the treatment effect holds for merchants who onboard post-GA (vs. the GA-day cohort of early adopters); the 60-day window captures mostly early adopters who signed up on or just after GA day
- Whether the pre-population quality matters significantly . specifically, whether merchants with more than 3 products would benefit from seeing more options in the template, or whether 3 products is the right number

---

## Recommendation

### Decision: Ship

**Rationale:**

The guided first-campaign flow exceeded the 30% [fictional] first-send rate target (31.7% [fictional]), achieved statistical significance at p < 0.001, and produced a meaningful secondary effect on second-campaign send rate (22.8% vs. 9.1% [fictional]) that indicates lasting retention impact, not just first-use novelty. All guardrail metrics passed. The mechanism is understood . pre-populated content reduces abandonment at the content creation step . which gives confidence that the effect is real and actionable.

### If Shipping

- [ ] Remove the feature flag and set the guided first-campaign flow as the default experience for all new non-adopter merchants (merchant_id-level detection: no prior sends)
- [ ] Update Campaigns onboarding in the Storevine admin to reflect the guided flow as the primary path; remove the "Start from blank" option from the primary CTA (keep as a small-text secondary link per the design rationale)
- [ ] Share results with Merchant Success: the 22.8% [fictional] second-campaign send rate means they should expect a wave of second-send questions from non-adopter merchants in August 2026; update the FAQ and canned responses
- [ ] Monitor: track first-send rate and second-send rate on a rolling 30-day basis in the Campaigns adoption dashboard; alert if first-send rate drops below 25% [fictional] (indicating the guided flow may need content refresh)

---

## Next Steps

| Action | Owner | Due Date |
|--------|-------|----------|
| Remove feature flag; set guided flow as default for all new non-adopters | Engineering Lead | July 10, 2026 |
| Share results with Merchant Success and update support materials | Growth PM | July 10, 2026 |
| Design brief for "3 products vs. 5 products" follow-on experiment | Design Lead | July 17, 2026 |
| Update Campaigns adoption dashboard with post-flag-removal tracking | Growth PM | July 10, 2026 |

---

## Appendix

### Raw Data

[Amplitude Experiment EXP-001 dashboard . full event log and cohort breakdown]

### Statistical Methodology

- Test type: Chi-squared test for two proportions (primary metric . binary outcome)
- Mann-Whitney U test (secondary metric . time to first send, non-normal distribution)
- Multiple comparison correction: Bonferroni correction applied to secondary metrics; results remain significant after correction
- Power calculation: 80% power to detect 8 pp improvement; actual experiment achieved >99% power given the observed effect size

### Known Issues

- The 0–50 customer segment includes merchants who joined Storevine within the last 30 days [fictional]; these merchants may have different motivation levels than established merchants, which could confound the segment comparison. A matched-cohort analysis by account age is recommended before drawing category-level conclusions from the segment breakdown.
