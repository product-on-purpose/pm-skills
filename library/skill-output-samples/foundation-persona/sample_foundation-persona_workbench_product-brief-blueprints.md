---
title: "Foundation Persona: Workbench Product Brief Blueprints"
description: "Workbench Blueprints product persona for document author submission experience and required-section compliance."
artifact: persona
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.5.0"
created: 2026-03-02
status: sample
thread: workbench
context: Workbench Blueprints product persona for document author submission experience and required-section compliance
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Workbench shipped Blueprints with required sections and approval gates, but post-GA data shows that 38% [fictional] of first submissions are rejected due to incomplete required sections, and the average author requires 2.3 revision cycles [fictional] before approval. The PM is scoping a guided authoring experience that reduces submission rejections by making required-section completion more visible during document creation. A brief product persona is needed to ground user-story prioritization and edge-case coverage for the authoring flow, distinct from the existing approval-governance persona that anchors the reviewer side.

**Source Notes:**

- Atlassian Confluence template research highlights that structured templates with clear section guidance reduce document completion time and improve first-submission quality in enterprise workflows.
- GOV.UK content design principles emphasize progressive disclosure and visible completion state as core UX patterns for form-heavy workflows in organizational contexts.
- Nielsen Norman Group research on form completion shows that inline validation and progress indicators measurably reduce error rates and abandonment in multi-section document workflows.

---

## Prompt

```text
foundation-persona product brief

Rachel V. to PM Skills agent:

> I need a brief product persona for the Blueprints author experience.
> This is the person who creates documents from templates and submits
> them for approval. Distinct from Rhea (our approval-governance persona).
>
> Context:
> - 38% of first submissions are rejected for incomplete required sections [fictional]
> - Average 2.3 revision cycles before approval [fictional]
> - Scoping: guided authoring with completion indicators and inline validation
> - Target: user stories and edge cases for the authoring flow
>
> Keep it brief and focused on the submission experience.
```

---

## Output

# Persona Dossier: Marco Alves, The Author Who Submits Before He Is Ready (Product, Brief)

## Layer 1: Narrative Persona Dossier

## Executive summary
- Marco submits documents when he believes they are complete, not when the system confirms they are complete.
- He does not skip required sections deliberately; he misses them because nothing in the authoring flow tells him what is still missing.
- He interprets a rejection as a system failure, not a personal failure, because the template did not prevent the incomplete submission.
- He needs visible completion state during authoring, not after submission.
- He evaluates Blueprints by whether it makes him look prepared to his approvers, not by whether it has advanced features.
- He is willing to follow structure if the structure is clear and the progress is visible.
- Every rejection cycle costs him time and credibility with the approval committee.

### 1) Opening scene
Marco finishes drafting a project-kickoff Blueprint at 4:15 PM. He scrolls through the document, confirms the sections he remembers, and clicks submit. The next morning he receives a rejection: two required sections are incomplete, one is marked "needs detail." He opens the Blueprint, scrolls to find the incomplete sections, and discovers that one is buried below a long optional section he expanded. He did not see it because the authoring flow gave him no completion summary.

He spends 35 minutes adding content he could have written the day before if the template had told him it was missing.

### 2) Who this person is when work gets real
Marco is a senior program manager at an enterprise company. He creates project-kickoff, change-request, and post-mortem documents regularly. He is competent and detail-oriented by role, but his attention during document creation is fragmented by meeting schedules and Slack. He works in Blueprints in multiple short sessions, not in one long block.

### 3) Core tension and decision model
Marco wants to submit once and move on. His decision model is visibility-driven: if he can see what is complete and what is missing, he completes it. If completion state is invisible, he assumes he is done. The tension is between his fragmented attention and the system's expectation of continuous, thorough authoring.

### 4) Decision moments that define behavior
- Decision moment A: if completion state is visible and shows gaps, address them before submitting.
- Decision moment B: if a required section is not surfaced in the authoring flow, assume it does not apply or was already filled.
- Decision moment C: if a rejection arrives without specific guidance on what to fix, spend time re-reading the entire document to find the gaps.

### 5) What they say vs what they mean
| What they say | What they mean | Product implication |
|---|---|---|
| "I thought I finished it." | The authoring flow did not show remaining required sections. | Add a completion checklist visible during authoring. |
| "Why did this get rejected?" | The rejection reason is unclear or requires re-reading the whole document. | Link rejection reasons to specific sections with direct navigation. |
| "I filled everything out." | He filled the sections he could see, but missed sections below the fold. | Surface all required sections in a persistent sidebar or progress bar. |

### 6) Operating modes
- Drafting mode: works in short sessions across multiple sittings; expects to resume where he left off.
- Pre-submit mode: scans for completeness but relies on visual cues rather than re-reading every section.
- Revision mode: addresses rejection feedback and resubmits; needs specific section-level guidance.

### 7) Product strategy implications
Prioritize:
- persistent completion indicator showing required-section status during authoring
- inline validation at the section level before submit is enabled
- rejection feedback linked to specific sections with one-click navigation

Avoid:
- submit button enabled before all required sections pass validation
- rejection messages that require full-document re-reading to interpret
- required-section indicators that only appear at submit time

### 8) Design principles this persona forces
- Show completion state continuously, not only at submission.
- Prevent submission of incomplete documents rather than rejecting them after.
- Link every rejection to a specific section and action.

### 9) If this persona wins, what changes?
Workbench reduces first-submission rejection rates and revision cycles by moving validation from the approval gate to the authoring flow. Authors submit with confidence, approvers spend less time on compliance rejections, and the overall document cycle compresses.

---

## Layer 2: Operational Appendix

### A) Request Context
- **Mode:** product
- **Mode alias used:** none
- **Detail profile:** brief
- **Artifact or task context:** Blueprints guided authoring experience for document authors
- **Domain context:** enterprise collaboration platform with structured document templates and approval gates

### B) Depth Guidance
- **Product detailed:** ~350-900 lines (soft target)
- **Marketing detailed:** ~340-850 lines (soft target)
- **Brief profile (either mode):** ~170-360 lines (soft target)
- **Brief profile:** prioritize decision snapshot and immediate actions
- **Detailed profile:** include richer tradeoffs, constraints, and edge conditions
- **If user asks comprehensive/best-in-class:** target upper half of selected range

### C) Completeness Floors (Soft)
- **Product detailed:** 8+ substantive sections, 2+ tables/matrices, 5+ scenario-tailoring entries
- **Marketing detailed:** 8+ substantive sections, 2+ tables/matrices, 4+ scenario-tailoring entries
- **Brief profile:** 6-10 executive-summary bullets and 3+ scenario-tailoring entries
- **All outputs:** sections must be decision-usable; do not ship placeholder-level bullets

### D) Includes / Excludes
- **Includes:** authoring flow completion visibility, submission validation, rejection navigation, multi-session authoring continuity, required-section compliance
- **Excludes:** approval-side governance decisions, enterprise buying and procurement, marketing messaging and competitive positioning

### E) Scenario tailoring
- For `user-stories`: encode persistent completion indicator, inline section validation, submit-gate enforcement, and rejection-to-section navigation.
- For `edge-cases`: cover partially completed section that passes minimum threshold, required section deleted after draft save, template updated mid-authoring, and co-authored document with split section ownership.
- For `instrumentation-spec`: instrument section-completion events, submit-attempt outcomes (pass/fail by section), revision cycle count, and time-from-rejection-to-resubmission.

### F) When not to use this persona
- Approval-side governance and reviewer experience decisions
- Enterprise sales and marketing playbook development
- Platform-level architecture and integration design

### G) Assumptions and Confidence
- **Key assumptions:**
  - First-submission rejections are primarily caused by invisible completion state, not by author negligence.
  - Inline validation during authoring will reduce rejection rates more effectively than post-submission feedback.
  - Authors work in fragmented sessions and need persistent completion context across sittings.
- **Confidence:** Medium
- **Confidence rationale:** Rejection rate data supports the gap, but causal attribution to visibility (vs. content quality or template complexity) has not been validated with controlled instrumentation.

## Evidence Trail

### User-provided inputs
| ID | Resource | Type | Used for | Notes |
|---|---|---|---|---|
| U1 | Blueprints submission rejection rate and revision cycle data | user prompt | opening scene and tension framing | metrics marked `[fictional]` |
| U2 | Request for brief author-focused product persona | user prompt | depth profile and authoring-flow orientation | distinct from approval-governance persona |

### LLM-discovered references
| ID | Resource | Type | Access method | Used for | Reliability notes |
|---|---|---|---|---|---|
| L1 | Atlassian Confluence template research | product research | browse/search | structured template completion quality | relevant enterprise docs benchmark |
| L2 | GOV.UK content design principles | documentation | browse/search | progressive disclosure and completion-state patterns | practical government UX reference |
| L3 | NN/g form completion research | article | browse/search | inline validation and progress indicator effectiveness | high-signal UX research |

### Evidence gaps and follow-up questions
| Gap ID | Missing support | Impacted claims/sections | Confidence impact | Follow-up question |
|---|---|---|---|---|
| G1 | Rejection reason breakdown by section type | validation design prioritization | Medium | Which required sections are most frequently incomplete at first submission? |
| G2 | Multi-session authoring behavior and draft-save frequency | continuity design requirements | Medium | How many sessions does a typical author need to complete a Blueprint? |

### Claim mapping
| Claim ID | Claim summary | Evidence IDs | Confidence | Assumptions |
|---|---|---|---|---|
| C1 | Invisible completion state is the primary driver of incomplete submissions | U1, L2, L3 | Medium | rejections are predominantly compliance failures, not content-quality failures |
| C2 | Inline validation during authoring reduces rejection rates more than post-submit feedback | U1, L3 | Medium | authors respond to visible gaps when surfaced during authoring |
| C3 | Fragmented attention requires persistent completion context across sessions | U2, L2 | Medium | multi-session authoring is the norm, not the exception |
