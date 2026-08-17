---
artifact: adr
version: "1.0"
created: <YYYY-MM-DD>
status: draft
---

# ADR-[NNN]: [Decision Title]

## Status

[Proposed | Accepted | Deprecated | Superseded by ADR-XXX]

**Date:** [YYYY-MM-DD]
**Deciders:** [List of people involved in the decision]

## Context

<!--
What is the issue that we're seeing that is motivating this decision or change?
What forces are at play (technical, business, organizational)?
Include relevant constraints, team expertise, timeline pressures, etc.
-->

[Describe the context and problem statement]

## Decision

<!--
What is the change that we're proposing and/or doing?
Use active voice: "We will..." not "It was decided..."
Be specific about what is included and excluded.
-->

[State the decision clearly]

## Consequences

<!--
What becomes easier or more difficult to do because of this change?
Include both positive and negative consequences.
Be honest about trade-offs.
-->

### Positive

- [Positive consequence 1]
- [Positive consequence 2]
- [Positive consequence 3]

### Negative

- [Negative consequence 1]
- [Negative consequence 2]

### Neutral

- [Neutral observation or implication]

### Model Choice

<!-- OPTIONAL. Include only when this decision selects a model, or commits the system to one.
     Skip this subsection entirely otherwise.

     A model choice differs from an ordinary dependency choice in one way that matters for an ADR:
     the thing you evaluated will be replaced, often inside the life of this decision. So the
     consequence worth writing down is not which model won. It is what the choice costs to undo. -->

| Consequence | This decision |
|-------------|---------------|
| **Build, buy, or prompt** | [Host or tune our own / call a vendor API / prompt a general model, and what ruled the other two out] |
| **What is now coupled to it** | [Prompts, evaluation sets, output schemas, latency budgets: whatever would need rework on a swap] |
| **Operating cost accepted** | [The ongoing cost this decision commits to, and at what volume it stops being acceptable] |
| **Reversal cost** | [What a swap actually costs given the coupling above, not whether one is theoretically possible] |
| **What would reopen this** | [The observation that sends us back to this ADR, not a review date] |

## Alternatives Considered

<!-- Optional but recommended: document other options that were evaluated -->

### [Alternative 1]

[Brief description and why it was not chosen]

### [Alternative 2]

[Brief description and why it was not chosen]

## References

<!-- Links to supporting documents, research, or related ADRs -->

- [Related ADR or document]
- [Research or spike summary]
- [External reference]
