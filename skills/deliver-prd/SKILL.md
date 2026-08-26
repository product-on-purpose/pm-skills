---
name: deliver-prd
description: Creates a comprehensive Product Requirements Document that aligns stakeholders on what to build, why, and how success will be measured. Use when specifying features, epics, or product initiatives for engineering handoff.
license: Apache-2.0
metadata:
  phase: deliver
  version: "3.0.0"
  updated: 2026-08-21
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

5. **Link AI Behavior to Evidence** *(only when the feature's output comes from a model)*
   Skip this step entirely for deterministic features. When a model produces the output, the behavior varies run to run, so "it works" is a claim that needs evidence attached. Name the behaviors that are requirements of this release and, for each one, how it will be shown to hold and at what threshold. Refusal and abstention get their own rows: a model has no dependable default for either, so what the feature does when it should *not* answer is a requirement, not an implementation detail. Score each component of a multi-step feature separately, because an end-to-end pass rate hides which step failed. State how the case set was sized as a method, never as a borrowed number.

6. **Define Scope Boundaries**
   Explicitly state what's in scope, out of scope, and deferred to future iterations. Clear scope prevents scope creep and sets realistic expectations.

7. **Address Technical Considerations**
   Note any technical constraints, architectural decisions, or integration requirements. Don't design the system, but surface considerations engineering needs to know.

8. **Write the Agent Execution Contract** *(only when an executor will implement this without the authoring context)*
   Skip this step entirely when the implementers were in the room. A coding agent, an outside contractor, or a team picking this up cold cannot infer what you already know, so declare it: which sources are authoritative and which wins when two disagree, what must not be touched and why, how each FR-n is verified and by whom, and the conditions where the executor must stop and escalate rather than decide. Name an owner for every escalation; an escalation with no addressee becomes a guess. A requirement with no verification is not ready to hand off, because nothing distinguishes "done" from "the executor believes it is done".

9. **Identify Dependencies and Risks**
   List external dependencies, assumptions, and risks that could impact delivery. Include mitigation strategies where applicable.

10. **Propose Timeline and Milestones**
    Outline key phases and checkpoints. This helps stakeholders understand the delivery plan without committing to specific dates prematurely.

## Project Memory Contract

Active only when `.claude/pm-skills.local.md` exists. With no file, ignore this section entirely
and behave exactly as described above.

- **Reads:** `active_initiative`, and any `interpretation` artifacts recording personas or research findings. Use them instead of asking for context that has already been produced. If none exist, ask as normal and never invent a persona to fill the gap.
- **Writes:** the PRD as a `decision` artifact, and its committed scope boundaries and success metrics to the `## Decisions` section.
- **Posture:** propose the entry and wait for confirmation before writing, unless
  `memory_auto_append: true` is set, in which case append and echo what was written.
- **Write discipline:** re-read the file immediately before writing, never from the copy that
  produced the proposal. If it changed in between, merge your entry into the current state and
  re-propose rather than overwriting; add only your own entry and leave every other field and
  section byte-identical. Nothing enforces this at runtime and the file is gitignored, so a
  careless whole-file write loses another session's work with no way to recover it.

This is the reader half of the demonstration loop: when `discover-interview-synthesis` has already recorded personas, do not ask the user to supply them again.
## Output Format

Use the template in `references/TEMPLATE.md` to structure the output. A complete PRD fills every template section: Overview; Goals & Success Metrics; User Stories; Scope; Solution Design; Technical Considerations; Dependencies & Risks; Timeline & Milestones; Open Questions; the Appendix when supporting material exists; AI Behavior and Evaluation when the feature's output comes from a model; and the Agent Execution Contract when an executor will implement it without the authoring context.

The last three are conditional by design. A PRD that omits a section its feature does not need is complete; a PRD that includes an empty one is not.

## Quality Checklist

Before finalizing, verify:

- [ ] Problem and "why now" are clearly articulated
- [ ] Success metrics are specific and measurable
- [ ] Scope boundaries are explicit (in/out/future)
- [ ] Requirements are testable and unambiguous
- [ ] Technical considerations are surfaced without over-specifying
- [ ] Dependencies and risks are documented with owners
- [ ] Document is readable in under 15 minutes
- [ ] If the output comes from a model: every behavior requirement has an evaluation and a threshold, and refusal and abstention are among them
- [ ] If an evaluation set is sized: each slice's floor says what coverage it commits to and why that slice earns it, and no slice result is reported as a failure rate or as a bound on one
- [ ] If an executor will implement this without the authoring context: every FR-n has a verification and a verifier, and every escalation condition names an owner

## Examples

See `references/EXAMPLE.md` for a completed example.
