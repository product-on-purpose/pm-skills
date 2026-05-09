---
title: "Foundation meeting agenda: Workbench Blueprints Approval Gate Design"
description: "Sample output for foundation-meeting-agenda skill applied to the workbench thread (blueprints-approval-design)."
artifact: foundation-meeting-agenda
version: 1.0
repo_version: 2.11.0
skill_version: 1.0.0
created: 2026-04-17
status: canonical
thread: workbench
context: blueprints-approval-design
---

# Sample: foundation-meeting-agenda. Workbench Blueprints Approval-Gate Design

## Scenario

Workbench is an enterprise collaboration platform (Series B, ~200 employees, ~500 enterprise customers). The team is designing approval gates for Blueprints, a template system targeted at regulated-industry customers (healthcare, FSI). The PM runs a 60-minute working session with design, engineering, and compliance to co-design the approval-gate UX. This is enterprise PM work. the prompt is thorough with stakeholder list, constraints, and prior research references.

Source Notes:
- Workbench is fictional
- Confluence, Notion, Coda are real competitors
- HIPAA and SOC 2 are real compliance frameworks
- All metrics `[fictional]`

## Prompt

```
/meeting-agenda "Blueprints approval-gate design working session, Monday 2026-04-28 at 2pm EST, 60 min. Attendees: me (david-pm), sasha (lead designer), raj (eng manager), linda (compliance). Goal: co-design the approval-gate UX for Blueprints v1.1 that satisfies HIPAA workflow requirements without adding more than 2 minutes to typical doc creation. Pre-read: [regulatory requirements summary](https://notion.example/blueprints-regs), [customer interview synthesis: 6 healthcare customers](https://notion.example/blueprints-customer-interviews). Working session format, not presentation."
```

## Output

```markdown
---
artifact_type: meeting-agenda
version: 1.0
generated_at: 2026-04-24T10:00:00Z
generated_by_skill: foundation-meeting-agenda

meeting_title: "Blueprints Approval-Gate Design Working Session"
meeting_date: 2026-04-28
meeting_start_time: "14:00 EST"
meeting_type: working-session
meeting_duration_minutes: 60

project: blueprints
topics:
  - constraint-alignment
  - approval-flow-co-design
  - exception-handling
  - deliverable-commit

attendees:
  - name: david-pm
    role: decision-maker
  - name: sasha-designer
    role: contributor
  - name: raj-eng
    role: contributor
  - name: linda-compliance
    role: decision-maker

desired_outcomes:
  - "Shared constraint map: regulatory must-haves vs. UX nice-to-haves vs. out-of-scope"
  - "Co-designed approval-flow sketch (whiteboard or Figma) covering the happy path"
  - "Exception-handling approach agreed for rejected and amended documents"
  - "Deliverable committed: who writes the v1.1 spec by end of week"

related_brief: null
input_quality: high
confidence: high
visibility: team
status: draft
---

# Blueprints Approval-Gate Design Working Session

## Shareable summary

**Blueprints Approval-Gate Design Working Session** | 2026-04-28 at 14:00 EST (60 min)
**Purpose**: Co-design the approval-gate UX for Blueprints v1.1 satisfying HIPAA without adding >2 min to doc creation
**Topics**:
- Constraint alignment (10 min)
- Approval-flow co-design (25 min)
- Exception handling (15 min)
- Deliverable commit (10 min)
**Pre-reads**: [regulatory requirements](https://notion.example/blueprints-regs) (10 min), [customer interview synthesis](https://notion.example/blueprints-customer-interviews) (12 min)

---

## Full agenda

### Meeting details

- **Date and time**: 2026-04-28, 14:00 EST
- **Duration**: 60 min
- **Location**: https://meet.example/blueprints-approval-design (Figma link in invite)
- **Meeting type**: working-session
- **Attendees**: david-pm, sasha-designer (lead), raj-eng (manager), linda-compliance

### Purpose

Co-design the approval-gate user experience for Blueprints v1.1. Outcome: a whiteboard-level sketch that satisfies HIPAA workflow requirements (linda will validate in-session) without adding more than two minutes to typical doc creation (sasha will prototype-test).

### Desired outcomes

- Shared constraint map separating regulatory must-haves, UX nice-to-haves, and out-of-scope
- Co-designed approval-flow sketch covering the happy path
- Exception-handling approach agreed (rejected docs, amendments)
- Deliverable committed: spec-doc owner by end of week

### Topics

#### Constraint alignment (10 min). linda-compliance

- **Type**: Information
- **Goal**: Team aligned on which regulatory requirements are must-haves vs. nice-to-haves
- **Pre-read**: [regulatory requirements summary](https://notion.example/blueprints-regs)

#### Approval-flow co-design (25 min). sasha-designer

- **Type**: Working
- **Goal**: Whiteboard-level sketch of the happy-path approval flow, jointly drafted in the session
- **Pre-read**: [customer interview synthesis](https://notion.example/blueprints-customer-interviews)

#### Exception handling (15 min). raj-eng

- **Type**: Discussion
- **Goal**: Agreement on how rejected-and-amended docs flow through approval; implementation sizing
- **Pre-read**: none

#### Deliverable commit (10 min). david-pm

- **Type**: Decision
- **Goal**: Spec-doc owner assigned; review cadence agreed
- **Pre-read**: none

### Attendee prep

**Required prep** (estimated: 22 min)

- [ ] Read [regulatory requirements summary](https://notion.example/blueprints-regs)
- [ ] Read [customer interview synthesis](https://notion.example/blueprints-customer-interviews), especially the approval-friction themes

**Recommended context**

- [Confluence approval-gate walkthrough (competitor)](https://notion.example/confluence-approval-teardown): for the shared-vocabulary pattern

**Come ready to**

- State the top 3 regulatory must-haves in your own words (linda)
- Sketch 2-3 approval-flow options on the Figma board before the meeting (sasha)
- Rough-size each flow option in sprint-weeks (raj)

### Parking lot

### Logistics

- **Join link**: https://meet.example/blueprints-approval-design
- **Materials**: [Figma working board](https://figma.example/blueprints-approval), [regs doc](https://notion.example/blueprints-regs), [interview synthesis](https://notion.example/blueprints-customer-interviews)
- **Recording**: Yes, owner: david-pm

---

## Sources & References

### Primary inputs

- User-provided context: thorough prompt with full attendees, constraints (HIPAA, <2 min overhead), and pre-read links
- Meeting duration: 60 min (user-specified)
- Target customer segment: 6 healthcare customers (interview synthesis referenced)

### Referenced artifacts

- Prior recaps on this topic: auto-discovery attempted; none found (first approval-gate design session)

### External references

- [Regulatory requirements summary](https://notion.example/blueprints-regs) [fictional]
- [Customer interview synthesis](https://notion.example/blueprints-customer-interviews) [fictional]
- HIPAA workflow requirements (real compliance framework)

### Generation context

- **Generated**: 2026-04-24T10:00:00Z
- **Skill version**: 1.0.0
- **Input quality**: high. thorough enterprise-style prompt with full context
- **Overall confidence**: high. all values user-specified or directly derivable
- **Known gaps**: None identified
- **Inferences applied**: Meeting type inferred as working-session [confidence: high, "working session format" explicit]; linda's role as decision-maker inferred from compliance-approval authority
- **Anti-meeting check**: Ran. synchronous value: co-creation (shared Figma board) + compliance validation; sync format essential
```
