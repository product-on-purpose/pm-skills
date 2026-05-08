---
title: "Deliver PRD: Workbench Blueprints"
description: "Workbench enterprise collaboration platform - Blueprints v1 PRD for required-section enforcement and approval gates."
artifact: prd
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: workbench
context: Workbench enterprise collaboration platform - Blueprints v1 PRD for required-section enforcement and approval gates
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Sample Output 03 - deliver-prd

Skill: deliver-prd
Thread: Workbench (enterprise collaboration platform)
Persona: Rachel V., Technical PM, Blueprints

## Scenario

Workbench is a Series B collaboration platform serving roughly 500 enterprise customers [fictional]. Rachel V., Technical PM for the Blueprints feature, is writing the PRD for Blueprints v1, which introduces reusable document templates with required-section enforcement, native approval gates, and real-time co-editing powered by Yjs CRDTs.

The PRD synthesizes months of prior work: six enterprise team-lead interviews revealing that 38% of Blueprints reach approval with at least one empty section [fictional], a problem statement documenting the 4.0-day median time to first approval [fictional], a hypothesis that required-section enforcement can reduce that to under 2.5 days [fictional], an opportunity tree prioritizing governance features for the 500-to-650-account growth target [fictional], a five-day CRDT spike recommending Yjs, ADR-012 formalizing that choice, and a design rationale selecting a hybrid wizard/canvas creation flow. The PRD is dated January 2026, targeting an April 2026 GA launch. Rachel is writing this for Karen L.'s engineering team to estimate and build against, while also giving Sandra C. (Head of Product) a single artifact that captures every decision made across the Develop phase.

### Source Notes

- ProseMirror + Yjs integration patterns: Y-Prosemirror binding documentation, Yjs community (yjs.dev)
- CRDT collaboration architecture trade-offs: Martin Kleppmann, "Conflict-free Replicated Data Types," 2017
- Enterprise document governance requirements: Atlassian Confluence governance documentation (atlassian.com)

## Prompt

```
/prd

Here is the structured brief for the Blueprints v1 PRD.

**Product context:**
- Workbench collaboration platform, ~500 enterprise customers [fictional], Series B
- Blueprints = reusable document templates with required sections and approval gates
- Core problem: 38% of Blueprints reach approval with ≥1 empty section [fictional]; median time to first approval is 4.0 days [fictional]; 60% of enterprise projects lack an approved kickoff doc at handoff [fictional]

**Prior decisions to incorporate:**
- ADR-012: Yjs CRDTs selected for real-time co-editing (45ms merge latency at 20 concurrent editors [fictional], +38KB gzipped [fictional])
- Design rationale: Hybrid wizard/canvas -- guided wizard for first-time authors, blank canvas for returning authors
- Opportunity tree: Priority path is documentation governance gap → required-section enforcement
- Hypothesis: Required sections reduce time-to-approved from 4.0 days to ≤2.5 days [fictional]; validation via A/B test (Mar 9 -- Apr 5, 2026)

**Target users:** Enterprise ops managers (creators), department heads (approvers), IT security leads (admin/provisioning)

**Key features for v1:**
1. Required-section enforcement (submit button disabled until all required sections complete)
2. Native approval gates (role-based routing, sequential and parallel approval)
3. Yjs real-time co-editing (offline-first, sub-document-level sync)
4. Hybrid wizard/canvas creation flow
5. Enterprise security suite (SAML SSO, audit logs, role-based access)

**Timeline:** Closed beta running now with 80 accounts [fictional]; A/B test Mar 9 -- Apr 5; GA target April 2026

**Success metrics:** Time-to-approved ≤2.5 days [fictional], empty-section rate ≤10% [fictional], enterprise account growth from 500 to 650 in 12 months [fictional]

Please generate a complete PRD following the standard template.
```


## Output

# PRD: Workbench Blueprints v1

## Overview

### Problem Statement

Enterprise teams using Workbench consistently produce incomplete project documentation. Across the current Blueprints closed beta (80 accounts [fictional]), 38% of Blueprints reach the approval stage with at least one required section left empty [fictional]. The median time from Blueprint creation to first approval is 4.0 days [fictional], driven largely by revision cycles when approvers reject incomplete submissions. At an organizational level, 60% of enterprise projects are handed off to execution teams without an approved kickoff document [fictional], creating alignment gaps, scope creep, and duplicated work.

This problem is acute for operations managers who are responsible for documentation quality across their teams but lack tooling to enforce completeness standards without manually reviewing every submission. In discovery interviews, these managers described themselves as "docs police," spending an estimated 3-4 hours per week chasing incomplete documents rather than reviewing content quality [fictional].

### Solution Summary

Blueprints v1 introduces required-section enforcement, native approval gates, and real-time co-editing to the Workbench document creation workflow. When an admin designates sections as required in a Blueprint template, the submit-for-approval button remains disabled until all required sections contain content. Native approval gates route completed Blueprints to designated approvers based on role, supporting both sequential and parallel approval chains. Real-time co-editing powered by Yjs CRDTs allows multiple authors to collaborate on a Blueprint simultaneously, including offline scenarios.

A hybrid creation flow (guided wizard for first-time Blueprint authors, blank canvas for experienced users) reduces onboarding friction while preserving power-user efficiency. The wizard walks new authors through each required section with inline guidance, then transitions automatically to the canvas view once the author has completed at least one Blueprint from that template.

### Target Users

| User | Role | Primary need |
|---|---|---|
| Enterprise ops managers | Blueprint creators, template admins | Enforce documentation standards without manual policing |
| Department heads | Approvers | Review complete, well-structured documents quickly |
| IT security leads | Platform admins | SAML SSO provisioning, audit logs, role-based access control |
| Cross-functional authors | Contributors | Co-edit Blueprints in real time, including offline |

## Goals & Success Metrics

### Goals

1. Reduce the time from Blueprint creation to first approval by enforcing completeness at submission
2. Eliminate incomplete documents reaching the approval queue
3. Enable real-time collaboration that works across office and remote/offline scenarios
4. Provide enterprise-grade security and administration to unlock the 500-to-650-account growth corridor [fictional]

### Success Metrics

| Metric | Baseline | Target | Measurement |
|---|---|---|---|
| Median time-to-approved | 4.0 days [fictional] | ≤2.5 days [fictional] | Platform analytics, weekly |
| Empty-section submission rate | 38% [fictional] | ≤10% [fictional] | Blueprint audit log |
| Enterprise account count | 500 [fictional] | 650 in 12 months [fictional] | CRM pipeline |
| Approval cycle count per Blueprint | 2.3 cycles [fictional] | ≤1.5 cycles [fictional] | Approval-gate event log |
| Author adoption (monthly active Blueprint creators) | ~1,200 [fictional] | 2,000 [fictional] | Product analytics |

### Non-Goals

- **Template marketplace**: Community-shared templates are deferred to v2. V1 ships with org-scoped templates only.
- **Advanced workflow automation**: Conditional branching, auto-assignment based on content, and integration-triggered approvals are out of scope.
- **Content quality scoring**: V1 enforces section completeness (non-empty), not content quality or length thresholds. The A/B test will help determine whether completeness alone is sufficient or whether quality gating is needed post-GA.
- **Mobile-native editing**: The co-editing experience targets desktop browsers. Mobile is read-only for v1.

## User Stories

1. As an ops manager, I want to mark specific Blueprint sections as required so that my team cannot submit incomplete documents for approval.
2. As a department head, I want to receive only complete Blueprints for review so that I spend my time evaluating content rather than sending documents back for missing sections.
3. As a first-time Blueprint author, I want a guided wizard that walks me through each section so that I understand what is expected before I start writing.
4. As a returning author, I want to skip the wizard and work directly in a blank canvas so that I can move quickly on familiar templates.
5. As a cross-functional contributor, I want to co-edit a Blueprint in real time with my colleagues so that we can collaborate without version conflicts or waiting for document locks.
6. As an IT security lead, I want to provision Workbench via SAML SSO and review audit logs so that Blueprints meets our organization's compliance requirements.
7. As an approver, I want to configure sequential or parallel approval chains so that the right stakeholders review in the right order.

## Scope

### In Scope

- Required-section enforcement on Blueprint templates (admin-configurable per template)
- Submit-button gating: disabled state until all required sections contain content
- Native approval gates with role-based routing (sequential and parallel)
- Real-time co-editing via Yjs CRDTs (ProseMirror integration, offline-first)
- Hybrid wizard/canvas creation flow with automatic wizard bypass after second Blueprint
- SAML SSO integration
- Audit log (Blueprint lifecycle events: created, submitted, approved, rejected, published)
- Role-based access control (admin, author, approver, viewer)

### Out of Scope

- Template marketplace or cross-org template sharing
- Content quality scoring or minimum-length enforcement
- Conditional approval routing based on Blueprint content
- Mobile-native editing (mobile is view-only)
- Jira or third-party ticketing integration (planned for v1.1)
- Version history UI (planned for v1.1)

### Future Considerations

- **v1.1 (Q3 2026)**: Version history, approval delegation, section-level commenting, Jira sync
- **v2 (2027)**: Template marketplace, conditional workflows, content quality scoring, mobile editing

## Solution Design

### Functional Requirements

#### Required-Section Enforcement

- Template admins can mark any section in a Blueprint template as required or optional
- When a section is marked required, the Blueprint editor displays a visual indicator (badge) on that section
- The submit-for-approval button is disabled until every required section contains at least one non-whitespace character
- If an author deletes content from a previously completed required section, the submit button returns to the disabled state
- Section completion status persists across sessions and co-editing participants
- A progress summary near the submit button displays the count of completed versus total required sections (for example, "3 of 5 required sections complete")

#### Approval Gates

- Template admins configure approval chains per template: sequential (ordered list) or parallel (all reviewers simultaneously)
- Approval routing is role-based: admins assign approval responsibilities to roles, not individuals
- Approvers receive in-app notifications and optional email notifications when a Blueprint is submitted
- Approvers can approve, reject (with required comment), or request changes
- A Blueprint is marked approved when all required approvers have approved
- Rejected Blueprints return to the author with inline comments attached to specific sections
- Approval state is stored in the relational database, not in the Yjs document, to avoid CRDT complexity for structured workflow data

#### Real-Time Co-Editing

- Powered by Yjs CRDTs with ProseMirror binding (Y-Prosemirror)
- Sub-document-level synchronization: each section is an independent Yjs document fragment
- Target merge latency: ≤50ms at up to 20 concurrent editors [fictional]
- Offline-first: authors can edit without connectivity; changes merge automatically on reconnect
- Presence awareness: cursors and selection highlights for all active collaborators
- Conflict resolution is automatic (CRDT guarantee); no manual merge UI required

#### Hybrid Wizard/Canvas

- First-time authors (zero prior Blueprints) see a guided wizard that presents each section sequentially with helper text
- Authors who have completed at least two Blueprints see the blank canvas by default
- Authors can toggle between wizard and canvas at any time via a toolbar button
- Wizard auto-disables for templates with more than 12 sections [fictional] (canvas only)

#### Enterprise Security Suite

- SAML SSO integration (Okta, Azure AD, OneLogin tested; generic SAML 2.0 supported)
- Audit log capturing all Blueprint lifecycle events with actor, timestamp, and IP address
- Role-based access control: Organization Admin, Template Admin, Author, Approver, Viewer
- Data residency: customer data stored in region selected at provisioning (US, EU, APAC)

### User Experience

The primary creation flow follows this sequence:

1. Author selects a Blueprint template from the template gallery
2. If first-time author: wizard presents sections one at a time with helper text and examples
3. If returning author: blank canvas opens with all sections visible and collapsible
4. Required sections display a red badge until completed; optional sections display a grey badge
5. Real-time collaborators appear as colored cursors with name labels
6. Once all required sections are complete, the submit button activates
7. On submit, the Blueprint routes to the configured approval chain
8. Approvers review inline, approve or reject with comments
9. On full approval, the Blueprint is marked approved and optionally published to the team workspace

### Edge Cases

See the dedicated edge-case analysis document for full coverage. Key cases handled in v1:

- Required section deleted after approval submission (Blueprint returns to draft state)
- Approver role revoked mid-approval chain (escalates to next approver or template admin)
- Concurrent edits to the same paragraph by 3+ authors (Yjs CRDT auto-merge, last-write-wins at character level)
- SSO session expiry during active editing (edits cached locally, re-authenticated on reconnect)
- Template modified while Blueprints are in-flight (existing Blueprints retain their original template version)

## Technical Considerations

### Constraints

- Yjs adds approximately 38KB gzipped to the client bundle [fictional]; acceptable given current bundle size of 420KB gzipped [fictional]
- WebSocket connections for co-editing require a dedicated provider service (not yet selected; evaluation planned for February 2026)
- Audit log storage must comply with SOC 2 Type II retention requirements (minimum 12 months)
- SAML SSO integration must support IdP-initiated and SP-initiated flows

### Integration Points

| System | Integration type | Status |
|---|---|---|
| Yjs / Y-Prosemirror | Client library | Spike complete (ADR-012) |
| WebSocket provider | Real-time transport | Evaluation pending |
| SAML IdP (Okta, Azure AD, OneLogin) | Authentication | Design complete |
| Workbench notification service | In-app + email alerts | Existing API |
| Workbench analytics pipeline | Event ingestion | Existing API |
| Jira (v1.1) | Two-way sync | Deferred |

### Data Requirements

- Blueprint document stored as Yjs binary encoding (opaque, not human-readable in database); export features must decode Yjs state to produce readable output
- Audit log events stored in append-only event store with 12-month minimum retention
- Approval chain configuration stored per template in relational schema
- User roles and permissions cached with 5-minute TTL, sourced from SSO provider attributes where available

## Dependencies & Risks

### Dependencies

| Dependency | Owner | Status | Impact if delayed |
|---|---|---|---|
| WebSocket provider selection | Karen L. (Eng Lead) | Evaluation Feb 2026 | Blocks co-editing; can ship without real-time as fallback |
| SAML SSO certification | IT Security / External | In progress | Blocks enterprise sales pipeline ($1.8M ARR [fictional]) |
| A/B test infrastructure | Leo M. (Data Analyst) | Ready | Blocks hypothesis validation |
| Closed beta feedback cycle | Rachel V. (PM) | In progress (80 accounts [fictional]) | Delays confidence in required-section UX |

### Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Required sections cause author frustration and workarounds (e.g., placeholder text) | Medium | High | Monitor skip-and-submit patterns; enforce at approval gate if needed; wizard guidance reduces placeholder usage |
| Yjs binary format complicates data export and auditing | Medium | Medium | Build audit-trail middleware that logs human-readable diffs alongside CRDT state |
| WebSocket provider latency exceeds 50ms target under load | Low | High | Sub-document sync limits blast radius; degrade gracefully to polling |
| SAML certification delays push past April GA | Medium | High | Ship GA without SSO; offer SSO as fast-follow (2-week sprint) |
| Competitor launches governance features during our beta | Low | Medium | Accelerate messaging; leverage co-editing + offline as differentiators |

## Timeline & Milestones

| Milestone | Date | Owner |
|---|---|---|
| Closed beta: 80 accounts active | Jan 2026 (done) | Rachel V. |
| A/B test: required vs. optional sections | Mar 9 through Apr 5, 2026 | Leo M. |
| A/B test analysis and ship decision | Apr 6 through Apr 14, 2026 | Rachel V. / Leo M. |
| SAML SSO certification complete | Mar 2026 (target) | IT Security |
| GA launch (Blueprints v1) | April 2026 | Rachel V. / Karen L. |
| v1.1 planning kickoff | May 2026 | Rachel V. |

## Open Questions

1. **WebSocket provider**: Should we self-host (y-websocket) or use a managed service (Liveblocks, PartyKit)? Evaluation criteria: latency, cost at 500+ concurrent rooms, SOC 2 compliance.
2. **Approval delegation**: If an approver is OOO, should the system auto-delegate to a backup? Deferred to v1.1 but may surface as a blocker during beta.
3. **Template versioning**: When a template is updated, should in-flight Blueprints migrate to the new version or remain on the original? Current decision: remain on original. Validate with beta customers.
4. **Minimum content threshold**: Required sections currently enforce "non-empty." Should we add a minimum character or word count? Deferred pending A/B test results.
5. **Offline duration limit**: How long should offline edits be cached before warning the author about potential large merge? Current thinking: 72 hours.

## Appendix

### Related Documents

- Interview synthesis: 6 enterprise team-lead interviews (Oct 2025)
- Problem statement: Documentation incompleteness and approval delays
- Hypothesis: Required-section enforcement reduces time-to-approved
- Opportunity tree: Governance gap as priority growth path
- Spike summary: CRDT library evaluation (Yjs, Automerge, ShareDB)
- ADR-012: Yjs CRDT selection rationale
- Design rationale: Hybrid wizard/canvas creation flow
- Solution brief: Blueprints v1 one-pager

### Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 0.1 | Jan 15, 2026 | Rachel V. | Initial draft incorporating all Develop-phase decisions |
| 0.2 | Jan 22, 2026 | Rachel V. | Added enterprise security suite after Mei-Lin T. feedback |
| 0.3 | Jan 28, 2026 | Rachel V. | Refined success metrics with Leo M.; added approval-cycle metric |
| 1.0 | Feb 3, 2026 | Rachel V. | Approved by Sandra C. (Head of Product) for development |
