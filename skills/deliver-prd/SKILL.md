---
name: deliver-prd
description: Creates a comprehensive Product Requirements Document that aligns stakeholders on what to build, why, and how success will be measured. Use when specifying features, epics, or product initiatives for engineering handoff.
license: Apache-2.0
metadata:
  phase: deliver
  version: "2.1.0"
  updated: 2026-06-10
  category: specification
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# Product Requirements Document (PRD)

A Product Requirements Document is the primary specification artifact that communicates what to build and why. It bridges the gap between problem understanding and engineering implementation by providing clear requirements, success criteria, and scope boundaries. A good PRD enables engineering to build the right thing while maintaining flexibility on implementation details.

## When to Use

- After problem and solution alignment, before engineering work begins
- When specifying features, epics, or product initiatives for handoff
- When multiple teams need to coordinate on a shared deliverable
- When stakeholders need to approve scope before investment
- As reference documentation during development and QA

## When NOT to Use

- The problem is still unframed or contested -> use `define-problem-statement` first; a PRD assumes an agreed problem
- You need a one-page pitch to align stakeholders on an approach -> use `develop-solution-brief`; the PRD comes after that alignment
- You only need the work broken into tickets for a sprint -> use `deliver-user-stories`
- You are recording a technical or architectural decision -> use `develop-adr`

## Instructions

When asked to create a PRD, follow these steps:

1. **Summarize the Problem**
   Start with a brief recap of the problem being solved. Link to the problem statement if available. Ensure readers understand *why* this work matters before diving into *what* to build.

2. **Define Goals and Success Metrics**
   Articulate what success looks like. Include specific, measurable metrics with baselines and targets. These metrics should connect directly to the problem being solved.

3. **Outline the Solution**
   Describe the proposed solution at a high level. Focus on user-facing functionality and key capabilities. Include enough detail for stakeholders to evaluate the approach without over-specifying implementation.

4. **Detail Functional Requirements**
   Break down what the system must do. Use user stories or requirement statements. Each requirement should be testable - someone should be able to verify if it's met.

5. **Define Scope Boundaries**
   Explicitly state what's in scope, out of scope, and deferred to future iterations. Clear scope prevents scope creep and sets realistic expectations.

6. **Address Technical Considerations**
   Note any technical constraints, architectural decisions, or integration requirements. Don't design the system, but surface considerations engineering needs to know.

7. **Identify Dependencies and Risks**
   List external dependencies, assumptions, and risks that could impact delivery. Include mitigation strategies where applicable.

8. **Propose Timeline and Milestones**
   Outline key phases and checkpoints. This helps stakeholders understand the delivery plan without committing to specific dates prematurely.

## Output Format

Use the template in `references/TEMPLATE.md` to structure the output. A complete PRD fills every template section: Overview; Goals & Success Metrics; User Stories; Scope; Solution Design; Technical Considerations; Dependencies & Risks; Timeline & Milestones; Open Questions; and the Appendix when supporting material exists.

## Quality Checklist

Before finalizing, verify:

- [ ] Problem and "why now" are clearly articulated
- [ ] Success metrics are specific and measurable
- [ ] Scope boundaries are explicit (in/out/future)
- [ ] Requirements are testable and unambiguous
- [ ] Technical considerations are surfaced without over-specifying
- [ ] Dependencies and risks are documented with owners
- [ ] Document is readable in under 15 minutes

## Examples

See `references/EXAMPLE.md` for a completed example.
