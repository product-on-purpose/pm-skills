---
name: develop-adr
description: Creates an Architecture Decision Record following the Nygard format to document significant technical decisions, their context, and consequences. Use when making technical choices that affect system architecture, technology selection, or development patterns.
license: Apache-2.0
metadata:
  phase: develop
  version: "2.2.0"
  updated: 2026-08-16
  category: specification
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# Architecture Decision Record (ADR)

An Architecture Decision Record documents a significant technical decision along with its context and consequences. ADRs capture the "why" behind architectural choices so future team members understand the reasoning - especially important when they question why something was done a particular way. This skill follows Michael Nygard's lightweight ADR format.

## When to Use

- Making significant technical decisions that affect system architecture
- Choosing between technology options (frameworks, databases, services)
- Establishing patterns that future development should follow
- Documenting the rationale for constraints or non-obvious approaches
- Preserving institutional knowledge about past decisions

## When NOT to Use

- The decision is a product or UX design choice, not architecture or technology -> use `develop-design-rationale`
- You are still exploring whether an approach is feasible -> time-box the exploration and record it with `develop-spike-summary` first
- You need to pitch a solution to stakeholders -> use `develop-solution-brief`; an ADR records a decision, it does not sell one
- Nothing is actually being decided (the status quo continues unchanged): an ADR without a decision is noise; wait until there is one

## Instructions

When asked to create an ADR, follow these steps:

1. **Assign a Number and Title**
   ADRs are numbered sequentially (ADR-001, ADR-002, etc.) for easy reference. The title should be a short noun phrase describing the decision, like "Use PostgreSQL for order data" or "Adopt React for frontend."

2. **Set the Status**
   New ADRs start as "Proposed." After team review, they become "Accepted," "Deprecated," or "Superseded by ADR-XXX." Status changes should be tracked.

3. **Describe the Context**
   Explain the circumstances that led to this decision. What problem are you solving? What forces are at play (technical constraints, team expertise, timeline, cost)? This section should help a reader who wasn't there understand why this decision was needed.

4. **State the Decision**
   Clearly articulate what you decided. Use active voice: "We will use..." rather than "It was decided..." Be specific about what is and isn't included in the decision.

5. **Document the Consequences**
   List the outcomes of this decision - positive, negative, and neutral. Good ADRs are honest about trade-offs. What becomes easier? What becomes harder? What new constraints or options does this create?

6. **Record the Model-Choice Consequences** *(only when the decision selects a model or commits the system to one)*
   Skip this step entirely otherwise; it is a subsection inside Consequences, not a seventh heading. A model choice differs from an ordinary dependency choice in one way that matters for an ADR: the thing you evaluated will be replaced, often inside the life of this decision. So record what the choice costs to undo, not just which option won. Name whether you are building, buying, or prompting a general model and what ruled the other two out; what is now coupled to the choice (prompts, evaluation sets, output schemas, latency budgets); the operating cost accepted and the volume at which it stops being acceptable; the real reversal cost given that coupling; and the observation that would reopen this ADR, which is a trigger rather than a review date.

## Output Format

Use the template in `references/TEMPLATE.md` to structure the output. A complete ADR fills every template section: Status; Context; Decision; Consequences; Alternatives Considered; and References.

## Quality Checklist

Before finalizing, verify:

- [ ] Title is a short, descriptive noun phrase
- [ ] Status is clearly indicated (Proposed/Accepted/Deprecated/Superseded)
- [ ] Context explains why this decision was needed
- [ ] Decision is stated clearly in active voice
- [ ] Consequences include both positive and negative outcomes
- [ ] ADR can stand alone without requiring other documents
- [ ] If the decision selects or commits to a model: coupling, operating cost, reversal cost, and the observation that would reopen the decision are all recorded

## Examples

See `references/EXAMPLE.md` for a completed example.
