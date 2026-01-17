<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
name: hypothesis
description: Defines a testable hypothesis with clear success metrics and validation approach. Use when forming assumptions to test, designing experiments, or aligning team on what success looks like.
license: Apache-2.0
metadata:
  category: ideation
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
---

# Hypothesis

A hypothesis is a testable prediction about how a change will affect user behavior or business outcomes. It transforms assumptions into explicit statements that can be validated or invalidated through experimentation. Well-formed hypotheses prevent teams from building features based on untested beliefs and create shared understanding of what success looks like.

## When to Use

- After problem framing, before committing to a solution
- When designing experiments or A/B tests
- When team members have differing assumptions about user behavior
- Before investing significant engineering resources in a feature
- When pivoting direction and need to validate the new approach

## Instructions

When asked to create a hypothesis, follow these steps:

1. **State the Belief**
   Articulate what you believe will happen. Use the structured format: "We believe that [action/change] for [target user] will [expected outcome]." Be specific about the intervention — vague hypotheses can't be tested.

2. **Identify the Target User**
   Define who this hypothesis applies to. A hypothesis about "users" is too broad. Specify the segment: new users in their first week, power users with 10+ sessions, churned users returning, etc.

3. **Define the Expected Outcome**
   What behavior change or result do you expect? Frame it in terms of user actions (complete onboarding, make a purchase, return within 7 days) rather than internal metrics when possible.

4. **Set Success Metrics**
   Choose a primary metric that directly measures the expected outcome. Include secondary metrics that provide context and guardrail metrics that ensure you're not causing harm elsewhere.

5. **Describe Validation Approach**
   How will you test this hypothesis? A/B test, user interviews, prototype testing, cohort analysis? Be specific about sample size, duration, and statistical requirements.

6. **Document Risks and Assumptions**
   What could invalidate this hypothesis beyond the test results? What are you assuming to be true that you haven't validated?

## Output Format

Use the template in `references/TEMPLATE.md` to structure the output.

## Quality Checklist

Before finalizing, verify:

- [ ] Hypothesis is falsifiable (possible to prove wrong)
- [ ] Success metric has a specific numeric target
- [ ] Target user segment is clearly defined
- [ ] Validation approach is practical and time-bound
- [ ] Pass/fail criteria are unambiguous
- [ ] Hypothesis doesn't assume the solution works

## Examples

See `references/EXAMPLE.md` for a completed example.
