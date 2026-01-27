---
artifact: experiment-results
version: "1.0"
created: YYYY-MM-DD
status: draft
---

# Experiment Results: [Experiment Name]

## Summary

| Attribute | Value |
|-----------|-------|
| **Experiment ID** | [ID] |
| **Experiment Name** | [Name] |
| **Status** | Completed / Ended Early / Inconclusive |
| **Duration** | [Start date] to [End date] ([X] days) |
| **Traffic Allocation** | [X]% control / [Y]% treatment |
| **Total Sample Size** | [N] users |
| **Owner** | [Name] |
| **Design Doc** | [Link to experiment design] |

---

## Hypothesis Recap

**Original Hypothesis:**

> We believed that [change/treatment] would [expected outcome] because [rationale].

**Success Criteria:**

- Primary metric: [Metric] improves by [X]%
- Statistical significance: p < 0.05
- Minimum sample size: [N]

---

## Results

### Primary Metric: [Metric Name]

| Variant | Value | Sample Size | Confidence Interval |
|---------|-------|-------------|---------------------|
| Control | [X.XX%] | [N] | [Lower] - [Upper] |
| Treatment | [X.XX%] | [N] | [Lower] - [Upper] |

**Observed Difference:** [+/-X.XX%] ([Relative change]%)

**Statistical Significance:**
- p-value: [X.XXX]
- Confidence level: [XX]%
- Statistically significant: [Yes/No]

**Interpretation:**

[Plain language explanation of what these numbers mean]

---

### Secondary Metrics

| Metric | Control | Treatment | Difference | Significant? |
|--------|---------|-----------|------------|--------------|
| [Metric 1] | [Value] | [Value] | [+/-X%] | [Yes/No] |
| [Metric 2] | [Value] | [Value] | [+/-X%] | [Yes/No] |
| [Metric 3] | [Value] | [Value] | [+/-X%] | [Yes/No] |

### Guardrail Metrics

<!-- Metrics that should NOT degrade -->

| Metric | Control | Treatment | Threshold | Status |
|--------|---------|-----------|-----------|--------|
| [Metric 1] | [Value] | [Value] | No degradation > [X]% | Pass/Fail |
| [Metric 2] | [Value] | [Value] | No degradation > [X]% | Pass/Fail |

---

## Segment Analysis

### By [Segment Dimension 1]

| Segment | Control | Treatment | Difference | Significant? |
|---------|---------|-----------|------------|--------------|
| [Segment A] | [Value] | [Value] | [+/-X%] | [Yes/No] |
| [Segment B] | [Value] | [Value] | [+/-X%] | [Yes/No] |
| [Segment C] | [Value] | [Value] | [+/-X%] | [Yes/No] |

### By [Segment Dimension 2]

| Segment | Control | Treatment | Difference | Significant? |
|---------|---------|-----------|------------|--------------|
| [Segment A] | [Value] | [Value] | [+/-X%] | [Yes/No] |
| [Segment B] | [Value] | [Value] | [+/-X%] | [Yes/No] |

### Segment Insights

[Notable findings from segment analysis - where did treatment work better/worse?]

---

## Visualization

<!-- Include charts if available -->

### Primary Metric Over Time

[Link to chart or describe trend]

### Conversion Funnel Impact

[Link to chart or describe impact on funnel]

---

## Learnings

### What We Learned

1. **[Learning 1]**
   [Description and evidence]

2. **[Learning 2]**
   [Description and evidence]

3. **[Learning 3]**
   [Description and evidence]

### Surprising Findings

- [Unexpected result 1]
- [Unexpected result 2]

### What We Still Don't Know

- [Open question 1]
- [Open question 2]

---

## Recommendation

### Decision: [Ship / Iterate / Kill]

**Rationale:**

[Clear explanation of why this is the recommendation]

### If Shipping

- [ ] [Engineering task 1]
- [ ] [Engineering task 2]
- [ ] [Documentation update]
- [ ] [Metrics to continue monitoring]

### If Iterating

- **What to change:** [Changes based on learnings]
- **Next experiment:** [Brief description]
- **Timeline:** [When to run]

### If Killing

- **Why:** [Clear explanation]
- **Learnings to preserve:** [What we take forward]
- **Alternative approaches:** [What else might work]

---

## Next Steps

| Action | Owner | Due Date |
|--------|-------|----------|
| [Action 1] | [Name] | [Date] |
| [Action 2] | [Name] | [Date] |
| [Action 3] | [Name] | [Date] |

---

## Appendix

### Raw Data

[Link to data/dashboard]

### Statistical Methodology

- Test type: [Chi-squared / t-test / etc.]
- Power calculation: [Details]
- Multiple comparison correction: [If applicable]

### Known Issues

- [Any data quality issues or caveats]

---

*Results documented on [date]. Decision implemented on [date].*
