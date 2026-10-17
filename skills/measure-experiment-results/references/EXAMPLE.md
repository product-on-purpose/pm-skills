---
artifact: experiment-results
version: "1.0"
created: 2026-01-14
status: complete
context: E-commerce checkout optimization A/B test
---

# Experiment Results: One-Page Checkout vs. Multi-Step Checkout

## Summary

| Attribute | Value |
|-----------|-------|
| **Experiment ID** | EXP-2026-001 |
| **Experiment Name** | One-Page Checkout |
| **Status** | Completed |
| **Duration** | December 15, 2025 to January 10, 2026 (26 days) [fictional] |
| **Traffic Allocation** | 50% control / 50% treatment |
| **Total Sample Size** | 47,832 users (23,891 control, 23,941 treatment) [fictional] |
| **Owner** | Sarah Martinez, Product Manager |
| **Design Doc** | EXP-2026-001 Design (internal link) |

---

## Hypothesis Recap

**Original Hypothesis:**

> We believed that consolidating our 3-step checkout into a single page with accordion sections would increase checkout conversion rate because reducing perceived complexity and eliminating page loads would reduce drop-off at each step.

**Success Criteria:**

- Primary metric: Checkout conversion rate improves by at least 3%
- Statistical significance: p < 0.05 (two-tailed)
- Minimum sample size: 20,000 users per variant

---

## Results

### Primary Metric: Checkout Conversion Rate

| Variant | Value | Sample Size | Confidence Interval (95%) |
|---------|-------|-------------|---------------------------|
| Control (3-step) | 62.4% [fictional] | 23,891 [fictional] | 61.8% - 63.0% [fictional] |
| Treatment (1-page) | 65.6% [fictional] | 23,941 [fictional] | 65.0% - 66.2% [fictional] |

**Observed Difference:** +3.2 percentage points [fictional] (+5.1% relative improvement [fictional])

**Statistical Significance:**
- p-value: 0.0003 [fictional]
- Confidence level: 95%
- Statistically significant: **Yes** [fictional]

**Interpretation:**

The one-page checkout significantly outperformed the 3-step checkout [fictional]. We can be 95% confident that the true improvement is between 1.8% and 4.6% (absolute) [fictional]. The result exceeds our 3% threshold for success [fictional].

---

### Secondary Metrics

| Metric | Control | Treatment | Difference | Significant? |
|--------|---------|-----------|------------|--------------|
| Cart-to-checkout start | 78.2% [fictional] | 79.1% [fictional] | +0.9% [fictional] | No (p=0.12) [fictional] |
| Average order value | $87.42 [fictional] | $86.91 [fictional] | -0.6% [fictional] | No (p=0.34) [fictional] |
| Items per order | 2.31 [fictional] | 2.28 [fictional] | -1.3% [fictional] | No (p=0.22) [fictional] |
| Time in checkout | 4.2 min [fictional] | 3.1 min [fictional] | -26.2% [fictional] | Yes (p<0.001) [fictional] |
| Payment errors | 2.1% [fictional] | 1.8% [fictional] | -14.3% [fictional] | Yes (p=0.03) [fictional] |

### Guardrail Metrics

| Metric | Control | Treatment | Threshold | Status |
|--------|---------|-----------|-----------|--------|
| Return rate (7-day) | 8.2% [fictional] | 8.4% [fictional] | No increase > 1% | **Pass** [fictional] |
| Customer support tickets | 0.9% [fictional] | 0.7% [fictional] | No increase > 0.5% | **Pass** [fictional] |
| Payment failure rate | 3.4% [fictional] | 3.2% [fictional] | No increase > 0.5% | **Pass** [fictional] |

---

## Segment Analysis

### By Device Type

| Segment | Control | Treatment | Difference | Significant? |
|---------|---------|-----------|------------|--------------|
| Desktop | 68.3% [fictional] | 69.5% [fictional] | +1.2% [fictional] | No (p=0.18) [fictional] |
| Mobile | 54.2% [fictional] | 59.3% [fictional] | +5.1% [fictional] | **Yes** (p<0.001) [fictional] |
| Tablet | 61.7% [fictional] | 64.1% [fictional] | +2.4% [fictional] | No (p=0.09) [fictional] |

### By Customer Type

| Segment | Control | Treatment | Difference | Significant? |
|---------|---------|-----------|------------|--------------|
| New customers | 51.8% [fictional] | 57.2% [fictional] | +5.4% [fictional] | **Yes** (p<0.001) [fictional] |
| Returning customers | 71.3% [fictional] | 72.1% [fictional] | +0.8% [fictional] | No (p=0.28) [fictional] |

### By Cart Value

| Segment | Control | Treatment | Difference | Significant? |
|---------|---------|-----------|------------|--------------|
| < $50 | 65.4% [fictional] | 68.9% [fictional] | +3.5% [fictional] | **Yes** (p=0.008) [fictional] |
| $50-$100 | 62.1% [fictional] | 65.2% [fictional] | +3.1% [fictional] | **Yes** (p=0.02) [fictional] |
| > $100 | 58.7% [fictional] | 61.4% [fictional] | +2.7% [fictional] | No (p=0.07) [fictional] |

### Segment Insights

The treatment effect was **strongest on mobile devices** (+5.1% [fictional] vs +1.2% [fictional] desktop) and for **new customers** (+5.4% [fictional] vs +0.8% [fictional] returning). This makes sense: new customers benefit most from reduced cognitive load, and mobile users benefit most from fewer page loads and scrolling [fictional].

Returning customers showed minimal improvement, likely because they've already learned the existing checkout flow [fictional].

---

## Visualization

### Conversion Rate Over Time

The treatment consistently outperformed control throughout the experiment period [fictional]. No significant interaction with time was observed (e.g., novelty effect wearing off) [fictional].

```
Conversion Rate by Day
       70% [fictional] |
           |    ████████████████████████  (Treatment)
       65% [fictional] |████████████████████████████
           |
       60% [fictional] |████████████████████████████  (Control)
           |
       55% [fictional] |________________________________
              Dec 15                Jan 10
```

### Funnel Drop-off Comparison

| Step | Control Drop-off | Treatment Drop-off | Improvement |
|------|------------------|-------------------|-------------|
| Cart → Checkout | 21.8% [fictional] | 20.9% [fictional] | +0.9% [fictional] |
| Shipping info | 8.4% [fictional] | N/A (combined) | - |
| Payment info | 5.2% [fictional] | N/A (combined) | - |
| Review → Purchase | 4.1% [fictional] | 3.5% [fictional] | +0.6% [fictional] |
| **Total checkout drop** | 37.6% [fictional] | 34.4% [fictional] | **+3.2%** [fictional] |

---

## Learnings

### What We Learned

1. **Reducing page loads matters more than expected**
   The 26% [fictional] reduction in checkout time suggests page load latency was a bigger friction point than the form complexity itself [fictional]. Users were abandoning during transitions between steps [fictional].

2. **Mobile optimization is high-leverage**
   Mobile users saw 4x the improvement of desktop users [fictional]. Our multi-step checkout was particularly problematic on smaller screens with more scrolling and tapping between pages [fictional].

3. **New user experience is critical**
   New customers showed 5.4% [fictional] improvement vs 0.8% [fictional] for returning customers. First-time checkout experience has outsized impact on conversion; returning customers have already overcome the learning curve [fictional].

4. **Form length matters less than perceived progress**
   The one-page design actually shows MORE fields at once, but the accordion UI creates a sense of progress and control [fictional]. Perception matters more than raw field count.

### Surprising Findings

- **Payment errors decreased by 14% [fictional]:** We didn't expect this. Hypothesis: single-page reduces context-switching errors where users forget information between steps.
- **No impact on AOV or items per order [fictional]:** We worried that faster checkout might mean less consideration, leading to smaller orders. This didn't materialize.

### What We Still Don't Know

- Will the mobile improvement persist on different device types (older phones, low-bandwidth connections)?
- Is there a specific accordion section that causes the most friction? (We didn't instrument that level of detail)
- How does this interact with guest checkout vs. account checkout?

---

## Recommendation

### Decision: Ship to 100%

**Rationale:**

The experiment delivered a clear, statistically significant improvement that exceeded our success threshold [fictional]. The +3.2% lift in checkout conversion [fictional] represents approximately $840K in additional annual revenue at current traffic levels [fictional]. No guardrail metrics were violated [fictional], and the improvement was consistent across the experiment duration [fictional].

The segment analysis reveals even higher impact on mobile and new customers [fictional].our strategic growth priorities.

### Shipping Plan

- [ ] Merge feature branch to main (Eng: Chen, by Jan 17)
- [ ] Update checkout analytics events for new flow (Eng: Chen, by Jan 17)
- [ ] Remove experiment infrastructure and flags (Eng: Chen, by Jan 20)
- [ ] Update help center documentation (Support: Lisa, by Jan 22)
- [ ] Communicate change to CS team (PM: Sarah, by Jan 17)
- [ ] Monitor conversion rate daily for 2 weeks post-launch (PM: Sarah, ongoing)

### Metrics to Continue Monitoring

- Checkout conversion rate (daily for 2 weeks, then weekly)
- Mobile vs. desktop conversion gap
- Payment error rate
- Customer support ticket volume related to checkout

---

## Next Steps

| Action | Owner | Due Date |
|--------|-------|----------|
| Ship to 100% traffic | Chen (Eng) | Jan 17 |
| Update analytics events | Chen (Eng) | Jan 17 |
| Remove experiment flags | Chen (Eng) | Jan 20 |
| Update help documentation | Lisa (Support) | Jan 22 |
| Post-launch monitoring report | Sarah (PM) | Jan 31 |
| Plan follow-up: guest checkout optimization | Sarah (PM) | Feb 1 |

---

## Appendix

### Raw Data

- Experiment Dashboard (Looker link)
- Raw data export (CSV link)
- Statistical analysis notebook (analysis link)

### Statistical Methodology

- **Test type:** Two-proportion z-test for primary metric
- **Multiple comparison correction:** Benjamini-Hochberg for segment analysis
- **Power calculation:** 80% power to detect 3% lift at α=0.05 required 18,500 per variant
- **Sequential analysis:** Not used; experiment ran to planned end date

### Known Issues

- **Dec 24-26 excluded:** Holiday traffic anomaly removed from analysis (both variants affected equally) [fictional]
- **Bot traffic:** Standard bot filters applied; no unusual activity detected [fictional]
- **One variant had 0.2% more iOS traffic [fictional]:** Not statistically significant; analysis not adjusted

---

*Results documented on January 14, 2026. Full rollout completed January 20, 2026 [fictional].*
