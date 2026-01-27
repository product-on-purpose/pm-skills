<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
name: measure-experiment-results
description: Documents the results of a completed experiment or A/B test with statistical analysis, learnings, and recommendations. Use after experiments conclude to communicate findings, inform decisions, and build organizational knowledge.
phase: measure
version: "2.0.0"
updated: 2026-01-26
license: Apache-2.0
metadata:
  category: reflection
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
---
# Experiment Results

An experiment results document captures what happened when you tested a hypothesis, including statistical outcomes, segment analysis, learnings, and clear recommendations. Good results documentation turns individual experiments into organizational knowledge that improves future decision-making.

## When to Use

- After an A/B test or experiment reaches statistical significance
- When an experiment is ended early (for any reason)
- To communicate findings to stakeholders who weren't involved
- During decision-making about whether to ship, iterate, or kill a feature
- To build a repository of learnings that inform future experiments

## Instructions

When asked to document experiment results, follow these steps:

1. **Summarize the Experiment**
   Provide context: what was tested, when it ran, how much traffic it received. Link to the original experiment design document if one exists.

2. **Restate the Hypothesis**
   Remind readers what you believed would happen and why. This frames the results interpretation.

3. **Present Primary Results**
   Show the primary metric outcome clearly: what were the values for control and treatment? Include statistical significance (p-value), confidence intervals, and sample sizes. Be honest about whether results are conclusive.

4. **Analyze Secondary Metrics**
   Present guardrail metrics that ensure you didn't cause unintended harm. Note any secondary metrics that moved unexpectedly—both positive and negative.

5. **Segment the Data**
   Look for differential effects across user segments (platform, tenure, plan type, etc.). Sometimes overall results mask important segment-level insights.

6. **Extract Learnings**
   What did you learn beyond the numbers? Include surprising findings, questions raised, and implications for the product hypothesis. Negative results are valuable learnings.

7. **Make a Recommendation**
   Be clear: should we ship, iterate, or kill? Support the recommendation with the evidence. If the decision is nuanced, explain the trade-offs.

8. **Define Next Steps**
   Specify what happens now—engineering work to ship, follow-up experiments, metrics to continue monitoring, or documentation to update.

## Output Format

Use the template in `references/TEMPLATE.md` to structure the output.

## Quality Checklist

Before finalizing, verify:

- [ ] Statistical methods and significance are clearly stated
- [ ] Confidence intervals are included (not just p-values)
- [ ] Segment analysis checked for differential effects
- [ ] Secondary/guardrail metrics are reported
- [ ] Learnings go beyond just the numbers
- [ ] Recommendation is clear and actionable
- [ ] Negative or inconclusive results are reported honestly

## Examples

See `references/EXAMPLE.md` for a completed example.
