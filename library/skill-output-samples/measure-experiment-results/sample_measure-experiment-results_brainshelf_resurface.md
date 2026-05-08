---
title: "Measure Experiment Results: Brainshelf Resurface"
description: "Brainshelf consumer PKM app - Resurface A/B test results and ship decision."
artifact: experiment-results
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . Resurface A/B test results and ship decision
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

On April 6, 2026, the 4-week Resurface A/B test concluded and Chloe B. analyzed the results for the Monday experiment review. The treatment group's 7-day return rate was 23.4% [fictional] vs. 18.1% [fictional] for control . a statistically significant +5.3pp lift (p = 0.008 [fictional]). Email CTR among opted-in treatment users was 17.2% [fictional], above the 15% target. All guardrail metrics passed. Priya M. presented the results to Marco S. on April 11 and recommended shipping the feature to all eligible users.

**Source Notes:**

- Ron Kohavi, Diane Tang, and Ya Xu, "Trustworthy Online Controlled Experiments: A Practical Guide to A/B Testing" (Cambridge University Press, 2020) . the statistical methodology applied in the results analysis; Kohavi et al.'s guidance on intent-to-treat analysis, segment decomposition, and novelty effect detection informed the analytical approach.
- Amplitude, "Experiment Analysis" (amplitude.com/docs/experiment/analysis) . the experimentation platform used to compute variant-level metrics, confidence intervals, and statistical significance; Amplitude's sequential testing engine was used for the primary metric analysis.
- Andrew Gelman, Jennifer Hill, and Aki Vehtari, "Regression and Other Stories" (Cambridge University Press, 2020) . the regression framework referenced for the segment analysis; Gelman et al.'s guidance on heterogeneous treatment effects informed the library-size and cadence breakdowns.

---

## Prompt

```
/experiment-results

resurface a/b test results. test ran mar 9 - apr 5 (4 weeks).
800 users, 50/50 split [fictional].

headline: treatment won.

primary metric (7-day return rate):
- control: 18.1% [fictional]
- treatment: 23.4% [fictional]
- delta: +5.3pp, p = 0.008 [fictional]

secondary (email CTR, treatment only): 17.2% [fictional]
opt-in rate: 41% of treatment group (164/400) [fictional]

guardrails all passed:
- unsub: 1.3%/week [fictional] (under 2% threshold)
- app uninstall: no difference
- save rate: no difference

segments:
- heavy savers (100+ items): return rate lift = +7.1pp [fictional]
- light savers (10-50 items): return rate lift = +3.8pp [fictional]
- daily cadence users: CTR 18.6% [fictional]
- 3x/week users: CTR 14.1% [fictional]

surprising: opt-in rate was 41% [fictional], way above the 10% target.
also surprising: week 4 return rate was HIGHER than week 1 (not
novelty decay . habit formation).

recommendation: ship to all eligible users.
```

---

## Output

# Experiment Results: Resurface Daily Digest A/B Test

## Summary

| Attribute | Value |
|-----------|-------|
| **Experiment ID** | RSF-EXP-001 |
| **Experiment Name** | Resurface Daily Digest A/B Test |
| **Status** | Completed |
| **Duration** | March 9, 2026 to April 5, 2026 (28 days) |
| **Traffic Allocation** | 50% control / 50% treatment |
| **Total Sample Size** | 800 users [fictional] (400 control, 400 treatment) |
| **Owner** | Priya M. |
| **Design Doc** | Resurface Experiment Design (Measure phase) |

---

## Hypothesis Recap

**Original Hypothesis:**

> We believed that offering a daily morning email digest of 3–5 topic-matched saved items would increase the 7-day return rate by at least 5 percentage points because the digest creates the external trigger that is currently missing from the Brainshelf experience, connecting moments of morning availability to the user's most relevant saved content.

**Success Criteria:**

- Primary metric: 7-day return rate improves by ≥5pp (from 18% baseline [fictional])
- Statistical significance: p < 0.05 (two-tailed)
- Minimum sample size: 400 per variant [fictional]

---

## Results

### Primary Metric: 7-Day Return Rate

| Variant | Value | Sample Size | Confidence Interval |
|---------|-------|-------------|---------------------|
| Control | 18.1% [fictional] | 400 [fictional] | 14.3% – 21.9% [fictional] |
| Treatment | 23.4% [fictional] | 400 [fictional] | 19.3% – 27.5% [fictional] |

**Observed Difference:** +5.3 pp [fictional] (29.3% relative lift)

**Statistical Significance:**
- p-value: 0.008 [fictional]
- Confidence level: 95%
- Statistically significant: Yes

**Interpretation:**

The treatment group's 7-day return rate of 23.4% [fictional] represents a 5.3 percentage point improvement over the control group's 18.1% [fictional], exceeding the pre-registered minimum detectable effect of 5pp. The result is statistically significant at p = 0.008 [fictional], well below the 0.05 threshold. This means we can reject the null hypothesis that the digest has no effect on return rate with high confidence. The 95% confidence interval for the treatment effect is approximately +1.4pp to +9.2pp [fictional], meaning the true effect is very likely positive and could be as large as 9pp. The point estimate of 5.3pp would move Brainshelf's return rate from below the consumer utility median (25–35%) to the lower edge of the median range, directly advancing the Q1 retention OKR.

---

### Secondary Metrics

| Metric | Control | Treatment | Difference | Significant? |
|--------|---------|-----------|------------|--------------|
| Email CTR (opted-in treatment users only) | n/a | 17.2% [fictional] | n/a (no control equivalent) | n/a |
| Opt-in rate | n/a | 41.0% (164/400) [fictional] | n/a | n/a |
| Saved item revisit rate (30 days) | 9.2% [fictional] | 13.8% [fictional] | +4.6pp [fictional] | Yes (p = 0.02) [fictional] |
| Save-only session rate | 71.8% [fictional] | 63.4% [fictional] | −8.4pp [fictional] | Yes (p = 0.01) [fictional] |

### Guardrail Metrics

| Metric | Control | Treatment | Threshold | Status |
|--------|---------|-----------|-----------|--------|
| Email unsubscribe rate (per week) | n/a | 1.3% [fictional] | ≤2% per week | Pass |
| App uninstall rate (28 days) | 2.1% [fictional] | 2.0% [fictional] | No increase >0.5pp | Pass |
| Save rate (saves/user/week) | 11.3 [fictional] | 11.7 [fictional] | No decrease >5% | Pass |

---

## Segment Analysis

### By Library Size

| Segment | Control | Treatment | Difference | Significant? |
|---------|---------|-----------|------------|--------------|
| Heavy savers (100+ items) | 16.3% [fictional] | 23.4% [fictional] | +7.1pp [fictional] | Yes (p = 0.01) [fictional] |
| Medium savers (50–99 items) | 18.9% [fictional] | 24.1% [fictional] | +5.2pp [fictional] | Yes (p = 0.04) [fictional] |
| Light savers (10–49 items) | 19.7% [fictional] | 23.5% [fictional] | +3.8pp [fictional] | No (p = 0.12) [fictional] |

### By Digest Cadence (Treatment Only, Opted-In Users)

| Segment | Email CTR | 7-Day Return Rate | Sample Size |
|---------|-----------|-------------------|-------------|
| Daily cadence (default) | 18.6% [fictional] | 26.1% [fictional] | 131 [fictional] |
| 3x/week cadence | 14.1% [fictional] | 19.8% [fictional] | 33 [fictional] |

### Segment Insights

The treatment effect is strongest among heavy savers (100+ items), who showed a +7.1pp lift [fictional]. This is consistent with the hypothesis: users with larger libraries have more relevant content for the topic-matching algorithm to select from, producing higher-quality digests. The light saver segment (10–49 items) showed a directionally positive but not statistically significant lift (+3.8pp, p = 0.12 [fictional]) . the smaller library limits the algorithm's ability to find highly relevant items, and the sample size for this segment is smaller.

Daily cadence users had a meaningfully higher CTR (18.6% [fictional]) than 3x/week users (14.1% [fictional]), and a correspondingly higher return rate. This supports the habit-formation hypothesis: daily delivery creates a routine that 3x/week delivery does not. However, the 3x/week sample is small (33 users [fictional]), so the cadence comparison should be treated as directional rather than definitive.

---

## Visualization

### Primary Metric Over Time

The 7-day return rate for the treatment group showed a consistent upward trend across the 4 weeks: week 1 = 21.2% [fictional], week 2 = 22.8% [fictional], week 3 = 23.9% [fictional], week 4 = 25.1% [fictional]. The control group remained flat: 17.9%, 18.3%, 18.0%, 18.2% [fictional]. The treatment trend is the opposite of novelty decay . return rate increased each week, suggesting habit formation rather than a one-time curiosity effect. See the Amplitude dashboard (RSF-EXP-001 Results) for the full weekly trend chart.

### Conversion Funnel Impact

Treatment group opt-in funnel: 400 eligible users → 287 saw opt-in card (71.8% [fictional]) → 164 opted in (41.0% of eligible, 57.1% of card viewers [fictional]) → 164 received first digest. The opt-in card view rate (71.8% [fictional]) reflects that not all treatment users visited the home screen during the test window. Of the users who saw the card, more than half opted in . a strong signal that the value proposition ("Get your best saves delivered every morning") resonated.

---

## Learnings

### What We Learned

1. **The external trigger hypothesis is validated.** A daily email digest creates a measurable and sustained improvement in 7-day return rate. The 5.3pp lift [fictional] demonstrates that the re-engagement problem is solvable with a well-designed external trigger, not a fundamental limitation of the read-later product category.

2. **Opt-in rate far exceeded expectations.** The 41% opt-in rate [fictional] (vs. the 10% target) indicates strong latent demand for a resurfacing feature. Users want to be reminded . they just haven't had a mechanism to ask for it. This has implications for future feature rollout: the addressable population for email-based features is much larger than the team assumed.

3. **Habit formation, not novelty, drives the return rate improvement.** The week-over-week increase in treatment return rate (21.2% → 25.1% [fictional]) is the signature of habit formation: the digest is training users to expect and respond to the morning email. If the effect were novelty-driven, we would expect the highest return rate in week 1 with decay thereafter.

### Surprising Findings

- The 41% opt-in rate [fictional] was 4x the target. The team had designed contingency plans for low opt-in (revised copy, extended enrollment window) that were never needed. The conservative 10% assumption may have been anchored on email opt-in benchmarks from marketing email, which is a different category from product-value email.
- Heavy savers (100+ items) benefited most from the digest (+7.1pp [fictional]), even though the team expected that heavy savers might be more resistant to email (inbox overload). The result suggests that the quality of the digest content (more items = better matching) outweighs inbox fatigue for this segment.
- The save-only session rate decreased by 8.4pp [fictional] in treatment. This means the digest is not just bringing users back . it's changing their behavior when they return, converting save-only sessions into save-and-read sessions.

### What We Still Don't Know

- Whether the return rate lift persists beyond 4 weeks. The upward trend in weeks 1–4 is encouraging, but longer-term data (8–12 weeks) is needed to confirm that the habit is durable.
- Whether the 3x/week cadence is truly less effective than daily, or whether the sample size (33 users [fictional]) is too small to draw conclusions. A follow-up test with a larger sample could answer this.
- Whether the treatment effect would differ for users who have churned (no activity in 30+ days). The experiment only included active savers . the digest's potential to win back churned users is untested.

---

## Recommendation

### Decision: Ship

**Rationale:**

The primary metric result is unambiguous: a 5.3pp lift in 7-day return rate [fictional], statistically significant at p = 0.008 [fictional], exceeding the pre-registered MDE of 5pp. All guardrail metrics passed. The treatment effect strengthened over 4 weeks (habit formation, not novelty decay). The secondary metrics are uniformly positive: email CTR above target, saved item revisit rate up, save-only session rate down. There is no reason to iterate or kill; the feature delivers the hypothesized value and should be rolled out to all eligible users as quickly as possible to maximize the Q2 retention OKR.

### If Shipping

- [ ] Remove the feature flag and enable Resurface for all eligible users (9,800 active savers [fictional]) . Alex R., target April 14, 2026
- [ ] Roll out the opt-in prompt in waves (25%, 50%, 100% over 3 days) to manage email volume ramp-up with Resend . Alex R.
- [ ] Monitor unsubscribe rate and inbox placement during the first full week of rollout . Chloe B.
- [ ] Publish internal results brief to the full Brainshelf team . Priya M., April 11, 2026
- [ ] Update the product roadmap to prioritize Resurface v2 improvements (embedding upgrade, in-app card, cadence follow-up experiment) . Priya M., April 15, 2026
- [ ] Continue tracking 7-day return rate at the cohort level for 8 additional weeks to confirm the habit formation trend is durable . Chloe B.

---

## Next Steps

| Action | Owner | Due Date |
|--------|-------|----------|
| Present results to Marco S. (CEO) and get ship approval | Priya M. | April 11, 2026 |
| Remove feature flag; begin phased rollout to all eligible users | Alex R. | April 14, 2026 |
| Write lessons log entry for the opt-in rate finding | Priya M. | April 18, 2026 |
| Design follow-up experiment: daily vs. 3x/week cadence (larger sample) | Chloe B. | April 25, 2026 |
| Evaluate embedding migration (TF-IDF → OpenAI embeddings) for digest relevance improvement | Alex R. | May 2026 |

---

## Appendix

### Raw Data

Amplitude dashboard: RSF-EXP-001 Results (internal link). Includes daily and weekly metric trends, segment breakdowns, and funnel analysis.

### Statistical Methodology

- Test type: Two-proportion z-test (two-tailed) for the primary metric (7-day return rate)
- Power calculation: 400 users per variant provides 80% power to detect a 5pp absolute difference from an 18% baseline at alpha = 0.05
- Multiple comparison correction: No correction applied; there is a single primary metric. Secondary and segment analyses are reported as exploratory and labeled accordingly.
- Sequential testing: Amplitude's sequential testing engine was used to monitor the experiment weekly; the experiment was not stopped early, as the pre-registered plan required the full 4-week duration.

### Known Issues

- Apple Mail Privacy Protection inflates the email open rate metric by pre-loading tracking pixels; the open rate is not reported as a metric for this reason. Click-through rate (based on redirect URL clicks) is unaffected by MPP and is the reliable behavioral measure.
- 113 of 400 treatment users (28.2% [fictional]) never visited the home screen during the test window and therefore never saw the opt-in card. These users are included in the intent-to-treat analysis (contributing to the treatment group's return rate) but could not have been affected by the treatment. The per-protocol analysis (opted-in users only) shows a return rate of 27.8% [fictional], which is higher than the intent-to-treat estimate, but the intent-to-treat result is reported as primary to avoid selection bias.

---

*Results documented on April 6, 2026. Ship decision approved on April 11, 2026.*
