# Technical Discovery Bundle

> **Move from "can we build this?" to documented decisions with a structured spike-to-ADR pipeline.**

---

## Bundle Metadata

| Field | Value |
|-------|-------|
| **Bundle** | Technical Discovery |
| **Command** | `/tech-discovery` |
| **Skills** | `spike-summary` -> `adr` -> `design-rationale` |
| **Phases Covered** | Develop |
| **Estimated Duration** | 1-3 hours |
| **Prerequisite Inputs** | A technical question, feasibility concern, or architectural decision that needs structured exploration |
| **Final Output** | A documented spike with findings, formal decision records, and design rationale explaining the "why" behind technical choices |

---

## When to Use This Bundle

Use the Technical Discovery bundle when:

- Engineering has flagged a feasibility question that blocks PRD finalization
- You need to evaluate build vs. buy, or choose between competing technical approaches
- A spike has been completed and the findings need to be documented before they are lost
- You are making an architectural decision that will be hard to reverse and want a durable record
- You need to explain *why* a technical choice was made (not just *what* was chosen) for future team members

**Do NOT use this bundle when:**

- You are defining what to build, not how to build it (use Customer Discovery or Feature Kickoff instead)
- You need a full strategic analysis including competitive and stakeholder context (use Product Strategy instead)
- The technical question is straightforward and does not require formal documentation

---

## Workflow Steps

### Step 1: Spike Summary

**Skill:** `spike-summary`
**Command:** `/spike-summary`

**What you do:**

Document the findings from a technical exploration (spike). This could be a proof-of-concept, a technology evaluation, a performance benchmark, or an integration feasibility assessment.

**Input requirements:**

- The question the spike was designed to answer
- Findings: what was tested, what worked, what did not, performance data, limitations discovered
- Time spent and scope of exploration

**Output:** A structured spike summary with objective, approach, findings, constraints discovered, and recommendation.

**Handoff to next step:** The spike's recommendation and constraints feed directly into the ADR. If the spike surfaced multiple viable options, each becomes an option in the ADR's "Options Considered" section.

---

### Step 2: Architecture Decision Record

**Skill:** `adr`
**Command:** `/adr`

**What you do:**

Formalize the architectural decision using the Nygard ADR format. Document the context, options considered, decision made, and consequences. This creates a permanent, searchable record.

**Input requirements:**

- Spike summary from Step 1
- Options evaluated (from spike findings or team discussion)
- Constraints: budget, timeline, team expertise, existing systems, compliance requirements

**Output:** An ADR with title, status, context, decision, options considered (with pros/cons), consequences, and related decisions.

**Handoff to next step:** The ADR documents *what* was decided. The design rationale explains *why* in a way that is accessible to a broader audience, including non-technical stakeholders and future team members who need to understand the reasoning.

---

### Step 3: Design Rationale

**Skill:** `design-rationale`
**Command:** `/design-rationale`

**What you do:**

Write a design rationale that explains the reasoning behind the technical choice in human-readable terms. While the ADR is a formal record, the design rationale is a narrative explanation that connects the decision to product goals, user impact, and team values.

**Input requirements:**

- ADR from Step 2
- Product context: how does this technical choice affect the user experience, performance, or future extensibility?
- Trade-offs: what did you give up, and why was that acceptable?

**Output:** A design rationale document explaining the decision's context, the reasoning process, trade-offs made, and how the choice supports product and business goals.

---

## Context Flow Diagram

```
Technical Question / Feasibility Concern
       |
       v
[spike-summary]
  Exploration findings, constraints, recommendation
       |
       v
[adr]
  Formal decision record (Nygard format)
       |
       v
[design-rationale]
  Human-readable "why" narrative
```

---

## Tips and Variations

**Pre-spike version:** If you are *planning* a spike (not documenting one already completed), run the bundle in reverse order. Start with design-rationale to articulate what you need to learn, use that to scope the spike, then document findings and formalize the ADR.

**Multiple ADRs:** Complex spikes often surface more than one decision. Create separate ADRs for each distinct architectural choice rather than cramming multiple decisions into one document.

**Lightweight version:** For smaller decisions, skip Step 3 (design-rationale) and let the ADR's context section serve double duty. Reserve the full design rationale for decisions with broad impact or high reversibility cost.

**Team documentation standard:** Adopt this bundle as your team's standard for documenting any spike. Over time, you build a searchable library of technical decisions that prevents re-litigating past choices and accelerates onboarding.

**Pairing with other bundles:**
- Often triggered during **Feature Kickoff** or **Product Strategy** when a technical question surfaces
- Feeds back into **Sprint Planning** once the decision is made (the spike findings inform story sizing and edge cases)
- The ADR may be referenced in the **Product Strategy** bundle's Step 5

---

## Quality Checklist

Before considering this bundle complete, verify:

- [ ] Spike summary clearly states the question it was designed to answer
- [ ] Spike summary includes concrete findings (data, benchmarks, code samples), not just opinions
- [ ] ADR documents ALL options considered, including the rejected ones
- [ ] ADR explains *why* rejected options were rejected, not just that they were
- [ ] ADR consequences include both positive outcomes and trade-offs/risks
- [ ] ADR has a clear status (Proposed, Accepted, Deprecated, Superseded)
- [ ] Design rationale connects the technical decision to product/business goals
- [ ] Design rationale is understandable by someone who was not part of the spike
- [ ] All three documents are stored in a discoverable location (not buried in a Slack thread)
