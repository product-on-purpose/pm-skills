<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
name: develop-design-rationale
description: Documents the reasoning behind design decisions including alternatives considered, trade-offs evaluated, and principles applied. Use when making significant UX decisions, aligning with stakeholders on design direction, or preserving design context for future reference.
phase: develop
version: "2.0.0"
updated: 2026-01-26
license: Apache-2.0
metadata:
  category: specification
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
---
# Design Rationale

A design rationale document captures the "why" behind design decisions—the context, constraints, alternatives considered, and reasoning that led to a particular solution. While designs themselves show what was built, rationale documents preserve institutional knowledge about why it was built that way.

## When to Use

- When making significant UX decisions that affect user experience
- Before design reviews to prepare stakeholder discussions
- When multiple valid approaches exist and the choice needs justification
- To onboard new team members to existing design decisions
- When revisiting past decisions to understand original reasoning
- During design system evolution to document pattern choices

## Instructions

When asked to document design rationale, follow these steps:

1. **State the Decision**
   Begin with a clear, one-sentence summary of what design decision was made. This becomes the title and reference point for the document.

2. **Describe the Context**
   Explain the situation that prompted this decision. What problem were you solving? What constraints existed? What user needs informed the direction? Include relevant research findings.

3. **List Options Considered**
   Document at least 2-3 alternatives that were evaluated. For each option, describe what it would look like and its key characteristics. Be fair to all options—avoid strawmen.

4. **Define Evaluation Criteria**
   Specify how options were assessed: usability heuristics, technical feasibility, brand alignment, user research findings, business requirements, or design principles.

5. **Explain the Reasoning**
   Walk through why the chosen option best meets the criteria. Be explicit about trade-offs—what you gained and what you sacrificed. Acknowledge where the decision is reversible vs. irreversible.

6. **Document Trade-offs Accepted**
   Every design decision involves trade-offs. Name what you gave up and why it was acceptable. This honesty helps future teams understand constraints.

7. **Note Follow-up Considerations**
   Capture anything that needs attention later: metrics to watch, conditions that might warrant revisiting the decision, or related decisions to make.

## Output Format

Use the template in `references/TEMPLATE.md` to structure the output.

## Quality Checklist

Before finalizing, verify:

- [ ] Decision is clearly stated in one sentence
- [ ] Context explains the "why now" and constraints
- [ ] Multiple alternatives are documented fairly
- [ ] Evaluation criteria are explicit
- [ ] Reasoning addresses why chosen option beats alternatives
- [ ] Trade-offs are honestly acknowledged
- [ ] Document is useful to someone inheriting this design

## Examples

See `references/EXAMPLE.md` for a completed example.
