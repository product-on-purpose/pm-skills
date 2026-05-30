---
title: "Deliver User Stories: Workbench Blueprints"
description: "Workbench enterprise collaboration platform - Blueprints v1 sprint stories for required sections and approval gates."
artifact: user-story
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: workbench
context: Workbench enterprise collaboration platform - Blueprints v1 sprint stories for required sections and approval gates
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Sample Output 03 - deliver-user-stories

Skill: deliver-user-stories
Thread: Workbench (enterprise collaboration platform)
Persona: Rachel V., Technical PM, Blueprints

## Scenario

With the Blueprints v1 PRD approved, Rachel V. is breaking the feature down into implementable user stories for the engineering team. She starts with two high-priority stories that represent the core value proposition: required-section enforcement from the author's perspective, and the approval-gate experience from the department head's perspective. Each story needs clear acceptance criteria that Karen L.'s engineering team can estimate, design against, and verify in QA. These two stories form the foundation of Sprint 1 and must be implemented together, because the approval gate only delivers its intended value when approvers receive complete documents.

The stories reference decisions made earlier in the product lifecycle: the hybrid wizard/canvas creation flow (design rationale, Jan 2026), Yjs CRDT co-editing (ADR-012, Dec 2025), and the required-section enforcement hypothesis being validated via the upcoming A/B test (Mar 9 through Apr 5, 2026).

### Source Notes

- User story structure and acceptance criteria best practices: Mike Cohn, "User Stories Applied," Addison-Wesley, 2004
- Behavior-driven acceptance criteria format: Dan North, "Introducing BDD," dannorth.net, 2006
- Enterprise approval workflow patterns: Atlassian Confluence approval documentation (atlassian.com)

## Prompt

```
deliver-user-stories

I need two user stories for the Blueprints v1 sprint backlog. These are the two highest-priority stories for the first sprint.

**Story 1 -- Required-section enforcement (author perspective):**
- Persona: Ops manager creating a Blueprint from a template with required sections
- Core need: Cannot submit an incomplete document for approval
- Key behaviors: Required sections show a visual indicator; submit button disabled until all required sections have content; if content is deleted, submit re-disables
- Context: Part of the hybrid wizard/canvas flow; applies to both wizard and canvas modes
- Relates to: A/B test hypothesis (required vs. optional sections, Mar 9 -- Apr 5)

**Story 2 -- Approval gate (approver perspective):**
- Persona: Department head reviewing a submitted Blueprint
- Core need: Review complete documents efficiently with clear approve/reject actions
- Key behaviors: Notification on submission; inline section review; approve, reject with required comment, or request changes; Blueprint marked approved when all required approvers complete
- Context: Sequential and parallel approval chains configured per template by admin

For each story, include full acceptance criteria, design notes, technical notes, dependencies, out of scope, and open questions.
```


## Output

# User Story: Required-Section Enforcement for Blueprint Authors

## Story Header

| Field | Value |
|---|---|
| Story ID | BLUE-101 |
| Priority | P1, Must Have |
| Sprint | Blueprints Sprint 1 |
| Points | 8 |
| Author | Rachel V. |
| Date | Feb 10, 2026 |

## User Story Statement

As an ops manager creating a Blueprint from a template with required sections, I want the system to prevent me from submitting until all required sections contain content, so that my team's documents meet our organization's completeness standards before reaching approvers.

## Context & Background

Enterprise team leads reported in discovery interviews (Oct 2025) that 38% of Blueprints reach approval with at least one empty section [fictional], creating revision cycles that push the median time-to-approved to 4.0 days [fictional]. The required-section enforcement hypothesis proposes that blocking submission on incomplete documents will reduce this to 2.5 days or less [fictional]. This story implements the authoring-side enforcement that will be validated in the A/B test running March 9 through April 5, 2026. The enforcement is designed to feel like a helpful checklist rather than a punitive gate, which is why the UI includes progress indicators and per-section guidance.

The enforcement applies equally to the guided wizard flow (first-time authors) and the blank canvas flow (returning authors), per the hybrid creation design rationale (Jan 2026).

## Acceptance Criteria

### AC-1: Required sections display a visual indicator

Given a Blueprint template with sections marked as required by an admin, when an author opens the template in either wizard or canvas mode, then each required section displays a red badge labeled "Required" and each optional section displays a grey badge labeled "Optional."

### AC-2: Submit button is disabled until all required sections have content

Given a Blueprint with three required sections where two contain content and one is empty, when the author views the submission controls, then the submit-for-approval button is disabled and a tooltip reads "Complete all required sections to submit." A progress summary near the submit button shows "2 of 3 required sections complete." When the author adds at least one non-whitespace character to the remaining required section, then the submit button becomes enabled and the progress summary updates to "3 of 3 required sections complete."

### AC-3: Deleting content from a completed required section re-disables submit

Given a Blueprint where all required sections contain content and the submit button is enabled, when the author deletes all content from any required section (or reduces it to whitespace only), then the submit button returns to the disabled state and the red badge reappears on that section.

### AC-4: Enforcement works in real-time co-editing

Given two authors co-editing the same Blueprint via Yjs, when Author A completes a required section and Author B simultaneously deletes content from another required section, then the submit button state reflects the current aggregate completion status within 2 seconds for both authors.

### AC-5: Section completion persists across sessions

Given an author who has completed two of three required sections and closes the browser, when the author reopens the Blueprint in a new session, then the two completed sections retain their content and their completion status, and the submit button remains disabled until the third section is completed.

## Design Notes

- Red badge placement: top-right corner of the section header, consistent with existing Workbench notification badge styling
- Disabled submit button uses the standard Workbench disabled-button pattern (greyed out, cursor: not-allowed, tooltip on hover)
- In wizard mode, the wizard progress indicator shows a checkmark for completed required sections and an open circle for incomplete ones
- The section-completion check is content-based (non-whitespace character present), not interaction-based (user clicked into section)
- The progress summary ("2 of 3 required sections complete") appears directly beside the submit button so the author always knows how close they are to submission readiness

## Technical Notes

- Section completion status is derived from the Yjs document state, not stored as a separate field; this avoids sync conflicts between content and status
- The submit-button state is computed client-side by iterating over all required sections in the template schema and checking the corresponding Yjs sub-document for non-whitespace content
- Debounce the completion check by 500ms to avoid rapid state toggling during active typing or deletion
- The A/B test variant flag (`required_sections_enabled`) controls whether enforcement is active; the control group sees all sections as optional with no badges
- For templates with many required sections, the completion check iterates in O(n) where n is the section count; given the 12-section wizard threshold [fictional], this is negligible

## Dependencies

- Yjs co-editing integration (BLUE-100) must be functional for AC-4
- Template admin interface for marking sections as required (BLUE-098) must be complete before authors encounter required sections
- A/B test infrastructure (experiment flag system) must support account-level variant assignment

## Out of Scope

- Minimum content length or quality scoring for required sections (deferred per PRD non-goals)
- Auto-save indicator for required sections (existing Workbench auto-save covers this)
- Admin ability to override and submit on behalf of an author with incomplete sections (deferred to v1.1)

## Open Questions

1. Should the system provide a section-level progress summary (e.g., "3 of 5 required sections complete") in addition to individual badges? Recommendation: yes, as a small counter near the submit button.
2. If a required section contains only an image or embedded file but no text, does it count as complete? Recommendation: yes, any non-whitespace DOM content counts.

---

# User Story: Approval Gate for Blueprint Reviewers

## Story Header

| Field | Value |
|---|---|
| Story ID | BLUE-102 |
| Priority | P1, Must Have |
| Sprint | Blueprints Sprint 1 |
| Points | 13 |
| Author | Rachel V. |
| Date | Feb 10, 2026 |

## User Story Statement

As a department head assigned as a Blueprint approver, I want to receive a notification when a Blueprint is submitted for my review and have clear actions to approve, reject, or request changes, so that I can complete my review efficiently without switching between tools.

## Context & Background

Department heads reported in discovery interviews that their primary frustration with the current process is receiving incomplete documents that waste review time. With required-section enforcement (BLUE-101) ensuring completeness at submission, the approval gate focuses on making the review experience fast and clear. The median approval cycle count is 2.3 cycles per Blueprint [fictional]; the target is 1.5 or fewer [fictional]. Reducing cycle count depends on two factors: the completeness enforcement upstream (BLUE-101) and the clarity of the approve/reject actions in this story.

Approval chains are configured per template by the template admin. Two modes are supported: sequential (approvers review in a defined order, each seeing the prior approver's feedback) and parallel (all approvers review simultaneously and independently). The choice of mode is stored at the template level and snapshotted when a Blueprint is created, so template changes do not affect in-flight approvals.

## Acceptance Criteria

### AC-1: Approver receives notification on Blueprint submission

Given a Blueprint is submitted for approval and the template's approval chain includes the current user as an approver, when the submission is processed, then the approver receives an in-app notification (bell icon badge + notification panel entry) and an optional email notification (based on user preference) containing the Blueprint title, author name, and a direct link to the review view.

### AC-2: Inline section review with approve/reject/request-changes actions

Given an approver opens a submitted Blueprint, when the review view loads, then the approver sees the full Blueprint content with all sections expanded, a floating action bar with three buttons (Approve, Reject, Request Changes), and the ability to add inline comments on any section by selecting text or clicking a section-level comment icon.

### AC-3: Rejection requires a comment

Given an approver clicks the Reject button, when the rejection dialog appears, then the dialog requires at least one comment (text field, minimum 10 characters) before the rejection can be confirmed. The comment is attached to the Blueprint and visible to the author with the approver's name and timestamp. This ensures that rejections always carry actionable feedback.

### AC-4: Sequential approval chain respects order

Given a template with a sequential approval chain of Approver A then Approver B, when Approver A approves the Blueprint, then Approver B receives a notification and gains access to the review view. Before Approver A's approval, Approver B can see the Blueprint but the approval action buttons are disabled with a message: "Waiting for prior approval from [Approver A name]."

### AC-5: Parallel approval chain allows simultaneous review

Given a template with a parallel approval chain of Approvers A, B, and C, when the Blueprint is submitted, then all three approvers receive notifications simultaneously and can review and approve independently. The Blueprint is marked as approved only when all three have approved.

### AC-6: Blueprint status reflects approval progress

Given a Blueprint in an approval chain, when viewing the Blueprint status, then the author and all approvers see a progress indicator showing: which approvers have approved, which have rejected or requested changes, and which are pending. Status updates appear within 5 seconds of an approver action. The progress indicator is visible in both the Blueprint header and the author's Blueprint list view.

## Design Notes

- The floating action bar is pinned to the bottom of the viewport during scrolling, consistent with Workbench's existing document toolbar pattern
- Inline comments use the same commenting UI as existing Workbench documents; no new comment component needed
- The approval progress indicator appears in both the Blueprint header and the author's Blueprint list view
- Rejection comments support rich text (bold, lists, links) but not images or attachments in v1
- The review view is read-only for the approver; edits require the approver to request changes and return the Blueprint to the author

## Technical Notes

- Approval state is stored per-Blueprint in the relational database (not in the Yjs document) to avoid CRDT complexity for structured workflow state
- Notification delivery uses the existing Workbench notification service API; email notifications use the existing transactional email pipeline
- Approval chain configuration is stored per template and snapshotted at Blueprint creation time, so changes to the template's approval chain do not affect in-flight Blueprints
- The approval progress indicator is updated via WebSocket push (same connection as co-editing) for real-time status

## Dependencies

- Workbench notification service must support a new event type (`blueprint_submitted_for_approval`)
- Template admin interface must include approval-chain configuration (sequential vs. parallel, role assignment)
- Required-section enforcement (BLUE-101) should ship in the same sprint to ensure approvers receive complete documents

## Out of Scope

- Approval delegation (auto-forward to backup approver when OOO), deferred to v1.1
- Conditional approval routing based on Blueprint content or metadata
- SLA enforcement (auto-approve or escalate if approver does not respond within N days)
- Bulk approval of multiple Blueprints simultaneously

## Open Questions

1. Should approvers be able to partially approve (approve their sections while flagging others for the next approver)? Recommendation: no for v1; keep the model simple with whole-document approval.
2. When a Blueprint is rejected, should the author see a diff of what the approver commented on vs. the full document? Recommendation: show the full document with comments highlighted, not a diff view.
3. Should the audit log capture approver viewing events (opened the review) in addition to action events (approved, rejected)? Recommendation: yes, for compliance reporting.
