---
artifact: prd
version: "1.0"
created: <YYYY-MM-DD>
status: draft
---

# PRD: [Feature/Initiative Name]

## Overview

### Problem Statement
<!-- Brief recap of the problem. Link to full problem statement if available. -->

[Problem summary]

### Solution Summary
<!-- High-level description of what we're building -->

[Solution summary]

### Target Users
<!-- Who will use this feature? -->

[Target user description]

## Goals & Success Metrics

### Goals
<!-- What outcomes are we trying to achieve? -->

1. [Primary goal]
2. [Secondary goal]
3. [Secondary goal]

### Success Metrics

| Metric | Current Baseline | Target | Timeline |
|--------|-----------------|--------|----------|
| [Primary metric] | [Value] | [Value] | [Date] |
| [Secondary metric] | [Value] | [Value] | [Date] |

### Non-Goals
<!-- What are we explicitly NOT trying to achieve? -->

- [Non-goal 1]
- [Non-goal 2]

## User Stories

<!-- Summary of key user stories. Link to detailed stories if available. -->

| ID | User Story | Priority |
|----|-----------|----------|
| US-1 | As a [user], I want [action] so that [benefit] | P0 |
| US-2 | As a [user], I want [action] so that [benefit] | P0 |
| US-3 | As a [user], I want [action] so that [benefit] | P1 |

See [link to detailed user stories] for full acceptance criteria.

## Scope

### In Scope
<!-- What will be delivered in this iteration -->

- [Feature/capability 1]
- [Feature/capability 2]
- [Feature/capability 3]

### Out of Scope
<!-- What will NOT be delivered -->

- [Excluded item 1]
- [Excluded item 2]

### Future Considerations
<!-- Items deferred to future iterations -->

- [Future item 1] - [Rationale for deferral]
- [Future item 2] - [Rationale for deferral]

## Solution Design

### Functional Requirements

#### [Requirement Area 1]
<!-- Group related requirements -->

- FR-1: [Requirement statement]
- FR-2: [Requirement statement]

#### [Requirement Area 2]

- FR-3: [Requirement statement]
- FR-4: [Requirement statement]

### User Experience

<!-- Key UX decisions, flows, or wireframe references -->

[UX notes or link to designs]

### Edge Cases
<!-- Important edge cases to handle -->

| Scenario | Expected Behavior |
|----------|------------------|
| [Edge case 1] | [Behavior] |
| [Edge case 2] | [Behavior] |

## AI Behavior and Evaluation

<!-- CONDITIONAL, not optional. Include whenever the feature's output comes from a model and
     varies run to run, and skip it entirely for deterministic features. When the condition applies
     this section is REQUIRED for completeness: a PRD that meets the trigger and omits it does not
     satisfy the skill's contract.

     A property that a deterministic check can decide (a required field is present, a count
     matches, a value is in range) does not trigger this section just because a model produced
     the output. Specify it as an ordinary functional requirement with a deterministic test.

     This section links behavior to evidence. It is not a full behavior specification: it names
     the behaviors that are requirements of THIS release and how each will be shown to hold. -->

### Behavior Requirements and Their Evidence

<!-- Refusal and abstention need their own rows. A model has no dependable default for either, so
     "what it does when it should not answer" is a requirement, not an implementation detail.
     Score each component of a multi-step feature separately: an end-to-end pass rate hides which
     step failed.

     The pass rule is fixed before the run and applies to each case, for example "refuses on
     every run". A percentage over a curated set makes a weak pass rule, because that set supports
     no rate (see Evaluation Set). A rate belongs here only when a designed sample backs it, and
     that sample is drawn separately from the curated evaluation set below.

     AB-4 and AB-5 are recommended rows, each with its own condition. Include a row when its
     condition holds and delete it when it does not. Both are easy to leave out, which is why they are
     named here rather than left to the slice list. -->

| ID | Behavior required | How it is evaluated | Pass rule |
|----|-------------------|---------------------|-----------|
| AB-1 | [What the feature must do in the normal case] | [Cases, rubric, or check] | [The rule each case must meet, fixed before the run] |
| AB-2 | [What it must refuse, and what it says instead] | [Cases, rubric, or check] | [The rule each case must meet, fixed before the run] |
| AB-3 | [How it abstains when it cannot ground an answer] | [Cases, rubric, or check] | [The rule each case must meet, fixed before the run] |
| AB-4 | *When the model reads content that neither the product's instructions nor the user told it to obey (documents, web pages, tickets, email):* instructions inside that content are treated as data and never followed | [Cases that plant instructions inside that content] | [The rule each case must meet, fixed before the run] |
| AB-5 | *When the output is shown to anyone other than the person whose access produced it:* the output never reaches an audience with less access than its source | [Cases where the source and the audience have different access] | [The rule each case must meet, fixed before the run] |

### Evaluation Set

<!-- Size this set by risk, not by saturation. "Keep adding cases until the verdict stops
     moving" is stopping on the outcome you are trying to measure: the answer depends on the
     order cases happen to arrive in, and the verdict usually stabilizes BEFORE the rare and
     harmful slices show up, because rare cases are rare. It reports a number with no coverage
     target behind it and then presents that number as release evidence.

     Name the slices first, set a floor per slice, then count. Do not state a fixed N here as
     a house default; N is derived per feature from the slices below.

     What a floor is, and what it is not. A floor is a COVERAGE commitment: it says every named
     failure mode was looked for deliberately, across a stated number of cases. It is not a
     measurement, and it is not a bound on how often the feature fails.

     This template deliberately does not tell you how to turn a case count into a failure-rate
     claim. Doing that honestly needs a sampling frame, a threshold fixed before the run, and
     independence assumptions that a hand-curated slice usually violates. A number that looks
     statistical but is not carries more authority than an obviously rough one, which makes it
     the more dangerous thing to put in a PRD. If the release genuinely turns on a rate, get a
     designed sample and someone who can defend it, and do not derive one here. -->

- **Where the cases live:** [Path or system]
- **Slices that must be covered:** [Derive them, do not guess. At minimum: every AB-n row above; every refusal and every abstention case; and the input classes where a failure costs the most - name the cost, not just the class]
- **Floor per slice, and what it commits you to:** [For each slice: the minimum cases you will not go below, and why that slice earns that floor. Say what the floor buys in coverage terms, which is that a named failure mode was searched for deliberately rather than incidentally. Do not state or imply a failure rate]
- **Runs per case** *(recommended)*: [How many times each case runs at production settings, and when a case passes: on every run, or on a stated number of runs fixed before the run. A case that passes once and fails once has not shown that it holds]
- **Held-out cases:** [The cases not used while tuning, kept back to check the pass rules still hold. If none are held out, say so and say why the pass rules are not overfit]
- **Slices scored separately:** [The segments reported on their own, never only in the aggregate. An aggregate that passes while one slice fails is a failing evaluation]
- **If a requirement is stated as a rate:** [A criterion such as "at least 90% of answers are faithful to their sources" can be verified only by a designed sample. That sample is drawn separately from this curated set, with a sampling frame, a size and a threshold fixed before the run, and someone who can defend them. Without one, keep the criterion and mark its verification unresolved until a designed sample exists. Pass rules per case over the named slices are additional evidence, not a replacement]
- **If someone asks for a rate:** [This set does not support one, and saying so is the correct answer. Report the raw counts per slice and the floor each was held to. A rate claim needs a designed sample, not a curated evaluation set, and inventing one here is how a PRD ends up carrying a number nobody can defend]

## Technical Considerations

<!-- Technical constraints, architectural notes, or integration requirements -->

### Constraints
- [Constraint 1]
- [Constraint 2]

### Integration Points
- [System/API 1]: [Integration notes]
- [System/API 2]: [Integration notes]

### Data Requirements
<!-- Any data migration, storage, or privacy considerations -->

[Data notes]

## Agent Execution Contract

<!-- CONDITIONAL, not optional. Include whenever a coding agent, an outside contractor, or any
     executor working without the authoring context will implement this PRD, and skip it entirely
     otherwise. When the condition applies this section is REQUIRED for completeness.

     Everything here is a declaration the author already knows and the executor cannot infer. -->

### Authoritative Sources

<!-- What the executor treats as ground truth, and which one wins when two disagree -->

| Source | Path or link | Definitive for |
|--------|--------------|----------------|
| [Source 1] | [Path or link] | [Scope it settles] |
| [Source 2] | [Path or link] | [Scope it settles] |

### Do Not Touch

<!-- Files, systems, or configuration the executor must leave alone, and why. A path with no
     reason gets edited anyway the first time it looks convenient. -->

| Path or system | Reason it is off limits |
|----------------|-------------------------|
| [Path or system] | [Reason] |

### Requirement Verification Map

<!-- One row per FR-n above. A requirement with no verification is not ready to hand off, because
     nothing distinguishes "done" from "the executor believes it is done". -->

| Requirement | How it is verified | Who verifies |
|-------------|--------------------|--------------|
| FR-1 | [Test, check, or observation that proves it] | [Automated / QA / PM] |
| FR-2 | [Test, check, or observation that proves it] | [Automated / QA / PM] |

### Stop and Escalate

<!-- Conditions where the executor must stop and ask rather than decide. Name the owner: an
     escalation with no addressee becomes a guess. -->

| Condition | Escalate to |
|-----------|-------------|
| [Condition that must not be resolved unilaterally] | [Owner] |
| [Condition that must not be resolved unilaterally] | [Owner] |

## Dependencies & Risks

### Dependencies

| Dependency | Owner | Status | Impact if Delayed |
|------------|-------|--------|-------------------|
| [Dependency 1] | [Team/Person] | [Status] | [Impact] |
| [Dependency 2] | [Team/Person] | [Status] | [Impact] |

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk 1] | [H/M/L] | [H/M/L] | [Mitigation strategy] |
| [Risk 2] | [H/M/L] | [H/M/L] | [Mitigation strategy] |

## Timeline & Milestones

| Milestone | Description | Target Date |
|-----------|-------------|-------------|
| [Milestone 1] | [Description] | [Date] |
| [Milestone 2] | [Description] | [Date] |
| [Launch] | [Description] | [Date] |

## Open Questions

<!-- Unresolved questions that need answers before or during development -->

- [ ] [Question 1] - Owner: [Name]
- [ ] [Question 2] - Owner: [Name]

## Appendix

### Related Documents
- Problem Statement - add link or path
- User Research - add link or path
- Design Specs - add link or path
- Technical Design - add link or path

### Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [Date] | [Author] | Initial draft |
