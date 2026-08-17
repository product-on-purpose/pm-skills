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

<!-- OPTIONAL. Include only when the feature's output comes from a model and varies run to run.
     Skip this section entirely for deterministic features.

     This section links behavior to evidence. It is not a full behavior specification: it names
     the behaviors that are requirements of THIS release and how each will be shown to hold. -->

### Behavior Requirements and Their Evidence

<!-- Refusal and abstention need their own rows. A model has no dependable default for either, so
     "what it does when it should not answer" is a requirement, not an implementation detail.
     Score each component of a multi-step feature separately: an end-to-end pass rate hides which
     step failed. -->

| ID | Behavior required | How it is evaluated | Passing threshold |
|----|-------------------|---------------------|-------------------|
| AB-1 | [What the feature must do in the normal case] | [Cases, rubric, or check] | [Threshold, and how it was chosen] |
| AB-2 | [What it must refuse, and what it says instead] | [Cases, rubric, or check] | [Threshold, and how it was chosen] |
| AB-3 | [How it abstains when it cannot ground an answer] | [Cases, rubric, or check] | [Threshold, and how it was chosen] |

### Evaluation Set

- **Where the cases live:** [Path or system]
- **How the set was sized:** [The smallest N where adding cases stops changing the verdict; state N and how you chose it]
- **Slices scored separately:** [The user or input segments reported on their own, not only in the aggregate]

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

<!-- OPTIONAL. Include only when a coding agent, an outside contractor, or any executor working
     without the authoring context will implement this PRD. Skip this section entirely otherwise.

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
