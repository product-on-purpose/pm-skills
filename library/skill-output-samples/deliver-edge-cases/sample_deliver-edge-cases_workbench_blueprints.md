---
title: "Deliver Edge Cases: Workbench Blueprints"
description: "Workbench enterprise collaboration platform - Blueprints edge-case analysis for approval workflows and co-editing."
artifact: edge-cases
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: workbench
context: Workbench enterprise collaboration platform - Blueprints edge-case analysis for approval workflows and co-editing
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Sample Output 03 - deliver-edge-cases

Skill: deliver-edge-cases
Thread: Workbench (enterprise collaboration platform)
Persona: Rachel V., Technical PM, Blueprints

## Scenario

Rachel V. is documenting edge cases for Blueprints v1 ahead of the QA sprint. The PRD identified several high-risk scenarios at the intersection of required-section enforcement, approval gates, and real-time co-editing. Karen L.'s engineering team needs a prioritized edge-case catalogue to guide test planning and to ensure the system degrades gracefully rather than corrupting document state or blocking users without explanation.

The three riskiest interaction surfaces are: (1) state changes that straddle the authoring/approval boundary (e.g., a required section deleted after submission), (2) role and permission changes during an active approval chain, and (3) concurrent editing conflicts involving three or more authors. These surfaces are risky precisely because they span subsystem boundaries, where assumptions made by one subsystem (such as "all required sections are complete") may be invalidated by actions in another.

### Source Notes

- CRDT conflict resolution guarantees and edge cases: Martin Kleppmann, "Conflict-free Replicated Data Types," 2017
- Approval workflow failure modes in enterprise systems: Atlassian Confluence workflow documentation (atlassian.com)
- Offline-first sync conflict patterns: Yjs documentation and community examples (yjs.dev)

## Prompt

```
/edge-cases

I need a comprehensive edge-case analysis for Blueprints v1 covering the three highest-risk areas: required-section enforcement boundaries, approval-gate state transitions, and real-time co-editing conflicts.

**Context:**
- Required sections use a content-presence check (non-whitespace); submit is disabled until all required sections have content
- Approval gates support sequential and parallel chains; state stored in relational DB, not in the Yjs document
- Co-editing uses Yjs CRDTs with sub-document-level sync; offline edits cache locally and merge on reconnect
- 80 closed-beta accounts [fictional], target ~20 concurrent editors per Blueprint [fictional]

**What I need:**
- Edge cases organized by category
- Error messages for each failure state
- Recovery paths so QA and engineering know the expected behavior
- Prioritized test scenarios (P1 must-test, P2 should-test, P3 nice-to-test)

Please be thorough -- Karen's team will use this directly for test planning.
```


## Output

# Edge Cases: Workbench Blueprints v1

## Feature Overview

Blueprints v1 combines three interacting subsystems: required-section enforcement (content gating at submission), native approval gates (role-based sequential and parallel chains), and Yjs CRDT real-time co-editing (offline-first, sub-document sync). Edge cases arise primarily at the boundaries between these subsystems, where state transitions in one affect the expected behavior of another. Because approval state lives in the relational database while document content lives in the Yjs CRDT, the most critical edge cases involve moments when these two sources of truth diverge.

This analysis covers 18 edge cases across five categories, with error messages, recovery paths, and prioritized test scenarios.

## Edge Case Categories

### Input Validation

**EC-01: Required section contains only whitespace or zero-width characters.**
An author fills a required section with spaces, tabs, newlines, or zero-width Unicode characters (U+200B, U+FEFF). The content-presence check must treat these as empty. The submit button remains disabled, and the section's red "Required" badge stays visible. The validation logic strips all Unicode whitespace and zero-width characters before evaluating content presence.

**EC-02: Required section contains only an embedded image or file attachment with no text.**
Per the PRD, any non-whitespace DOM content counts as complete. An embedded image satisfies the requirement. The submit button enables. If the image fails to load (broken URL), the DOM node is still present, so the section is still considered complete; content quality is out of scope for v1. This is a deliberate design choice to avoid blocking authors who use visual content as their primary medium.

**EC-03: Author pastes content that exceeds the section's rendering capacity.**
An author pastes a 500,000-character block into a single section. The Yjs document accepts the content, but the ProseMirror editor may lag. Expected behavior: content is accepted and saved; the editor displays a performance warning if render time exceeds 2 seconds. No data loss. The warning reads: "This section contains a large amount of content and may render slowly."

**EC-04: Template has zero required sections.**
An admin creates a template with all sections marked optional. The submit button is always enabled (there are no required sections to gate on). This is a valid configuration; no error is raised. The progress summary near the submit button is hidden when there are zero required sections.

### Boundary Conditions

**EC-05: Required section deleted after Blueprint is submitted for approval.**
An author submits a Blueprint, then a co-editor (or the author themselves) deletes content from a required section while the Blueprint is in the approval queue. Expected behavior: the Blueprint reverts to draft state, the approval chain is cancelled, and the author receives a notification: "Your Blueprint was returned to draft because a required section was modified. Please re-submit when all required sections are complete." Approvers who have not yet acted receive a notification that the review has been cancelled. This prevents approvers from reviewing a document that no longer meets completeness requirements.

**EC-06: All approvers in a sequential chain approve, but the Blueprint is modified before the final approval is recorded.**
A race condition where the last approver clicks Approve at the same moment a co-editor modifies the document. Expected behavior: the approval action is accepted if it was initiated before the modification timestamp. The system uses optimistic locking on the Blueprint's approval state. If the modification timestamp is earlier than the approval click, the approval stands. If the modification occurs between the approval click and the server recording, the approval is rejected and the approver is prompted to re-review. The optimistic lock uses a version counter on the approval record to detect conflicts.

**EC-07: Approval chain has a single approver who is also the author.**
An admin configures an approval chain where the author's role is also listed as an approver. Expected behavior: the system blocks self-approval. The author sees a message: "You cannot approve your own Blueprint. Please contact your template admin to update the approval chain." The Blueprint remains in the submitted state until a different approver is assigned or the admin updates the chain.

**EC-08: Template is deleted while Blueprints based on it are in-flight.**
An admin deletes a template that has active Blueprints (draft, submitted, or in-review). Expected behavior: existing Blueprints retain their template snapshot and can complete their lifecycle. No new Blueprints can be created from the deleted template. The template appears as "[Deleted Template]" in the Blueprint's metadata. The admin receives a warning before deletion: "3 active Blueprints use this template. They will retain their current structure but no new Blueprints can be created from it." This warning includes the count of affected Blueprints so the admin can make an informed decision.

### Error States

**EC-09: Yjs WebSocket connection drops during active co-editing.**
The WebSocket connection between a co-editor and the sync server is lost (network failure, server restart). Expected behavior: the editor switches to offline mode silently. Local edits are cached in IndexedDB. A subtle banner appears: "You are editing offline. Changes will sync when your connection is restored." On reconnect, the Yjs CRDT merge resolves all offline edits automatically. No data loss. The banner includes a small status indicator that pulses while reconnection attempts are in progress.

**EC-10: Yjs merge produces an unexpected document state after prolonged offline editing.**
An author works offline for 48 hours while three other authors make extensive changes. On reconnect, the CRDT merge produces a valid but potentially confusing document (e.g., two authors wrote different content for the same paragraph). Expected behavior: the merge completes automatically (CRDT guarantee). The reconnecting author sees a banner: "Your offline changes have been merged. Review highlighted sections for potential conflicts." Sections with significant merge activity are highlighted with a yellow border for 30 seconds. The system determines "significant merge activity" by comparing the section's content hash before and after the merge.

**EC-11: Approval notification delivery fails (email service down).**
The transactional email service is unavailable when a Blueprint is submitted. Expected behavior: the in-app notification is delivered regardless (different service). The email notification is queued for retry (3 attempts over 15 minutes). If all retries fail, the system logs a warning and the approver relies on the in-app notification. No approval state is affected.

**EC-12: SSO session expires during active editing.**
The author's SAML SSO session expires (typically 8 hours) while they are editing a Blueprint. Expected behavior: edits continue to be cached locally (Yjs offline mode). On the next server sync attempt, the system detects the expired session and presents a re-authentication dialog. After re-authentication, cached edits sync automatically. No data loss and no forced page reload. The re-authentication dialog appears as a modal overlay so the author does not lose their place in the document.

### Concurrency

**EC-13: Three or more authors simultaneously edit the same paragraph.**
Three authors type in the same paragraph of the same section simultaneously. Yjs CRDT resolves character-level conflicts automatically. Expected behavior: all three authors see each other's cursors (presence awareness). Text interleaving follows Yjs's internal ordering algorithm. No manual merge is required. Merge latency target: ≤50ms at 20 concurrent editors [fictional]. While the merge is deterministic, the resulting text order may surprise authors who expected their edits to appear in a specific location; this is a known trade-off of character-level CRDTs.

**EC-14: One author deletes a section while another is typing in it.**
Author A selects and deletes an entire section while Author B is mid-sentence in that section. Expected behavior: the section is deleted (Author A's operation wins because section deletion is a higher-level operation). Author B sees the section disappear and their in-progress text is lost. A toast notification appears for Author B: "A collaborator deleted the section you were editing." The section deletion is logged in the document's edit history for recovery if needed. Author B can use the edit history to retrieve their lost content if necessary.

**EC-15: Two authors simultaneously submit the same Blueprint for approval.**
Author A and Author B both have the submit button enabled and click it within milliseconds of each other. Expected behavior: the server accepts the first submission and rejects the second with a message: "This Blueprint has already been submitted for approval." The second author's UI updates to show the Blueprint in "Submitted" state. The server uses a database-level lock on the Blueprint's status field to ensure only one submission succeeds.

### Integration Failures

**EC-16: Approver role is revoked mid-approval chain.**
An admin removes a user from the approver role while that user has a pending approval. Expected behavior for sequential chains: the pending approval is skipped and the next approver in the chain is notified. Expected behavior for parallel chains: the required approver count is reduced by one, and the Blueprint can be approved by the remaining approvers. The removed approver sees their pending review item disappear from their queue. The author is notified: "The approval chain for your Blueprint has been updated. [Removed approver name] is no longer a reviewer."

**EC-17: SAML IdP returns an unexpected role mapping.**
The SSO provider returns a role attribute that does not map to any Workbench role (e.g., "contractor" when Workbench only has Admin, Author, Approver, Viewer). Expected behavior: the user is assigned the default role (Viewer) and a warning is logged. The user sees a banner: "Your account has limited permissions. Contact your IT admin to update your role assignment." The IT admin dashboard highlights unmapped role attributes so the admin can resolve the mapping without a support ticket.

**EC-18: Workbench analytics pipeline is unavailable during Blueprint lifecycle events.**
The event ingestion service is down when a Blueprint is created, submitted, or approved. Expected behavior: events are buffered in a local queue (max 1,000 events or 24 hours, whichever comes first). When the pipeline recovers, buffered events are replayed in order. No user-facing impact. If the buffer fills, the oldest events are dropped and a monitoring alert fires.

## Error Messages

| Code | Trigger | Message |
|---|---|---|
| BLUE-E01 | Submit clicked with incomplete required sections | "Complete all required sections to submit." |
| BLUE-E02 | Required section modified after submission | "Your Blueprint was returned to draft because a required section was modified. Please re-submit when all required sections are complete." |
| BLUE-E03 | Self-approval attempted | "You cannot approve your own Blueprint. Please contact your template admin to update the approval chain." |
| BLUE-E04 | Duplicate submission | "This Blueprint has already been submitted for approval." |
| BLUE-E05 | Offline editing detected | "You are editing offline. Changes will sync when your connection is restored." |
| BLUE-E06 | Offline merge completed | "Your offline changes have been merged. Review highlighted sections for potential conflicts." |
| BLUE-E07 | Section deleted by collaborator | "A collaborator deleted the section you were editing." |
| BLUE-E08 | SSO session expired | "Your session has expired. Please sign in again to continue. Your recent edits have been saved locally." |
| BLUE-E09 | Unmapped SSO role | "Your account has limited permissions. Contact your IT admin to update your role assignment." |
| BLUE-E10 | Approval chain updated (approver removed) | "The approval chain for your Blueprint has been updated. [Name] is no longer a reviewer." |

## Recovery Paths

### Required Section Modified After Submission (EC-05)

1. System detects content change in a required section while Blueprint status is "Submitted" or "In Review"
2. System cancels all pending approvals and reverts Blueprint status to "Draft"
3. System notifies the author with BLUE-E02
4. System notifies any approvers who had not yet acted that the review is cancelled
5. Author completes the required section and re-submits
6. Approval chain restarts from the beginning (prior approvals are not preserved, because the document content has changed since those approvals were granted)

### Approver Role Revoked Mid-Chain (EC-16)

1. Admin removes the user from the approver role via the admin console
2. System checks for pending approvals assigned to the removed user
3. Sequential chain: system advances to the next approver; parallel chain: system reduces the required approval count
4. System notifies the author with BLUE-E10
5. Remaining approvers continue their review; no action required from the author unless the chain is now empty
6. If the chain is empty (all approvers removed), the Blueprint reverts to draft and the author is notified to contact the template admin

### Prolonged Offline Merge (EC-10)

1. Author reconnects after extended offline editing
2. Yjs CRDT merge executes automatically on the client
3. System identifies sections with merge activity (sections where both the offline author and online authors made changes)
4. System displays BLUE-E06 banner and highlights affected sections with a yellow border for 30 seconds
5. Author reviews highlighted sections and manually resolves any content that seems redundant or conflicting
6. If the author is unsatisfied with the merge result, they can use the document's edit history to view prior states and manually restore content

## Test Scenarios

### Must Test (P1)

| ID | Scenario | Expected result |
|---|---|---|
| T-01 | Submit with one empty required section | Submit button disabled; BLUE-E01 tooltip visible |
| T-02 | Complete all required sections, then delete one | Submit button re-disables; red badge reappears |
| T-03 | Required section modified while Blueprint is in approval queue | Blueprint reverts to draft; BLUE-E02 sent to author; approvals cancelled |
| T-04 | Self-approval (author is the sole approver) | BLUE-E03 displayed; approval blocked |
| T-05 | Sequential approval: Approver A approves, Approver B notified | Approver B receives notification; action buttons enabled |
| T-06 | Parallel approval: all approvers approve independently | Blueprint marked approved only after all complete |
| T-07 | WebSocket drops during co-editing; author continues offline; reconnects | Offline edits merge without data loss |
| T-08 | SSO session expires during editing | Re-auth dialog; edits preserved and synced after login |
| T-09 | Approver role revoked mid-sequential chain | Chain advances to next approver; author notified |

### Should Test (P2)

| ID | Scenario | Expected result |
|---|---|---|
| T-10 | Required section with only whitespace or zero-width characters | Section treated as incomplete; submit disabled |
| T-11 | Required section with only an embedded image (no text) | Section treated as complete; submit enabled |
| T-12 | Template deleted while Blueprints are in-flight | Existing Blueprints retain snapshot; no new Blueprints from deleted template |
| T-13 | Two authors submit simultaneously | First accepted; second receives BLUE-E04 |
| T-14 | 48-hour offline edit with extensive concurrent changes | Merge completes; yellow highlights on affected sections |
| T-15 | Approval notification email fails; in-app notification succeeds | Approver sees in-app notification; email retried 3 times |

### Nice to Test (P3)

| ID | Scenario | Expected result |
|---|---|---|
| T-16 | 500,000-character paste into a single section | Content saved; performance warning if render > 2s |
| T-17 | Template with zero required sections | Submit always enabled; no badges displayed |
| T-18 | SAML IdP returns unmapped role attribute | User gets Viewer role; BLUE-E09 banner; admin dashboard alert |
| T-19 | Analytics pipeline down during Blueprint creation | Events buffered; replayed on recovery; no user impact |
| T-20 | Section deleted while another author is typing in it | Section removed; BLUE-E07 toast for affected author |
