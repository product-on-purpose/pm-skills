<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
name: experiment-design
description: Designs an A/B test or experiment with clear hypothesis, variants, success metrics, sample size, and duration. Use when planning experiments to validate product changes or test hypotheses.
license: Apache-2.0
metadata:
  category: validation
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
---

# Experiment Design

An experiment design document defines all parameters needed to run a rigorous A/B test or controlled experiment. It ensures the team aligns on what you're testing, how you'll measure success, and how long to run the test before drawing conclusions. Good experiment design prevents common pitfalls: underpowered tests, unclear success criteria, and decisions based on noise rather than signal.

## When to Use

- Before launching an A/B test to validate a product change
- When testing a hypothesis that requires quantitative validation
- After solution design to validate assumptions before full rollout
- When stakeholders want data-driven evidence for a decision
- To establish a culture of experimentation and learning

## Instructions

When asked to design an experiment, follow these steps:

1. **Articulate the Hypothesis**
   Write a clear, testable hypothesis in the format: "We believe [change] for [users] will [outcome] as measured by [metric]." One hypothesis per experiment — if you're testing multiple things, run multiple experiments.

2. **Define the Variants**
   Describe the control (current experience) and treatment (new experience) in sufficient detail. Include screenshots, mockups, or precise descriptions so anyone can understand what users will see.

3. **Choose Primary and Secondary Metrics**
   Select one primary metric that will determine success or failure. Add 2-3 secondary metrics to understand the broader impact. Include guardrail metrics to catch unintended negative effects.

4. **Calculate Sample Size**
   Determine how many users you need per variant to detect your minimum detectable effect (MDE) with statistical significance. Specify your significance level (typically 0.05) and power (typically 0.80).

5. **Estimate Duration**
   Based on sample size and available traffic, calculate how long the experiment needs to run. Account for weekly patterns — avoid ending mid-week if behavior varies by day.

6. **Define Targeting and Allocation**
   Specify which users are eligible for the experiment and how traffic is split between variants. Document any exclusions (e.g., employees, specific segments).

7. **Set Success Criteria**
   Define upfront what constitutes a win, a loss, or an inconclusive result. This prevents post-hoc rationalization and moving goalposts.

8. **Document Risks and Mitigations**
   Identify what could go wrong and how you'll detect/address it. Include monitoring plans and rollback criteria.

## Output Format

Use the template in `references/TEMPLATE.md` to structure the output.

## Quality Checklist

Before finalizing, verify:

- [ ] Hypothesis is falsifiable and specific
- [ ] Only one primary metric is defined
- [ ] Sample size calculation is documented with assumptions
- [ ] Duration accounts for traffic patterns and statistical requirements
- [ ] Success criteria are defined before the experiment starts
- [ ] Guardrail metrics protect against unintended harm

## Examples

See `references/EXAMPLE.md` for a completed example.
