---
title: "Deliver PRD: Workbench Blueprints Assist AI Section Drafting"
description: "Workbench enterprise collaboration platform - Blueprints v1.2 PRD for AI-drafted sections grounded in linked source documents, with refusal and abstention behavior tied to release evidence."
artifact: prd
version: "1.0"
repo_version: "2.34.0"
skill_version: "3.0.0"
created: 2026-10-16
status: sample
thread: workbench
context: Workbench enterprise collaboration platform . Blueprints Assist v1.2 PRD, the first thread sample whose feature output comes from a model, written for the AI Governance Council's build review
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Three months into the pivot, the compliance bet is working and the empty page is the bottleneck. Workbench narrowed the Blueprints roadmap to ops and compliance teams in May 2026, and that segment now carries 68% of active Blueprints usage [fictional]. The gap the pivot interviews named is still there in the launch data: 42% of rejected compliance Blueprints come back for a missing or miscited section rather than for the section's substance [fictional], and the authors least able to spend two hours on a first draft are the ones regulators hold accountable for it.

Blueprints Assist is the v1.2 answer. Assist reads only the source documents linked to a Blueprint (policy pages, prior approved Blueprints, vendor documents) and drafts a first version of a required section for the author to accept, edit, or discard. It is the first Workbench feature whose output comes from a model and varies run to run, so Rachel V.'s PRD is the first in this thread to carry an AI Behavior and Evaluation section. The AI Governance Council (chaired by Sandra C.) made that a condition of the build review: what Assist must refuse and what it does when it cannot ground an answer are release requirements, not implementation details.

Three constraints shaped the PRD. Legal counsel Elaine R. will not approve a feature that can assert compliance sign-off or invent a citation, so the refusal behavior is written as a requirement with its own evidence. IT security lead Omar S. requires that retrieval read only the explicitly linked source set, enforced at the retrieval layer rather than by instruction to the model. And the Council declined the previous quarter's evaluation claims for another feature: those were sized by adding cases until the verdict stopped moving, then cited as a pass rate, which the Council treated as a number with no coverage commitment behind it. This PRD names its evaluation slices, sets a floor per slice, and does not license a failure-rate claim.

**Source Notes:**

- Google PAIR, "People + AI Guidebook" (pair.withgoogle.com/guidebook) . framing for user expectations and mental models of AI assistance.
- NIST, "AI Risk Management Framework" (nist.gov/itl/ai-risk-management-framework) . the governance framing the Council applies to model-backed features.
- Atlassian, "Atlassian Intelligence" (atlassian.com/platform/artificial-intelligence) . competitor positioning for AI drafting inside enterprise document tools.

---

## Prompt

```
deliver-prd

Here is the structured brief for the Blueprints Assist v1.2 PRD.

**Product context:**
- Workbench collaboration platform, ~500 enterprise customers [fictional], Series B
- v1.x roadmap narrowed to ops/compliance teams in regulated industries (pivot decision, May 19, 2026); 68% of active Blueprints usage is ops/compliance [fictional]
- Blueprints v1 shipped April 2026; v1.1 shipped September 2026 with audit trail export, compliance officer role, and the approval UX fix
- Assist = in-product drafting assistant: reads the source documents linked to a Blueprint and drafts a first version of a required section; the author accepts, edits, or discards
- Core problem: 42% of rejected compliance Blueprints are rejected for a missing or miscited section [fictional]; median time from opening a required section to a first complete draft is 95 minutes [fictional]

**Hard requirements from review:**
- Legal (Elaine R.): Assist must never assert compliance sign-off or invent a citation; the refusal behavior has to be documented as a requirement
- IT Security (Omar S.): retrieval is restricted to the explicitly linked source set, enforced at the retrieval layer, not by instruction to the model
- AI Governance Council (Sandra C.): the evaluation plan must name its slices and set a floor per slice; no saturation-style sizing, and no failure-rate claims from a curated set

**Feature scope for v1.2:**
1. Assist request panel on document sections
2. Explicit source linking (policy pages, approved Blueprints, vendor docs uploaded to the workspace)
3. Grounded drafting with per-claim citations that resolve to the linked set
4. Proposed-draft review flow (accept/edit/discard; nothing auto-submits; enforcement stays at the approval gate)
5. Audit lineage for AI drafts (who requested, which sources were cited, what the author accepted)

**Target users:** Compliance program managers (authors), ops managers (authors), compliance officers (approvers), IT security leads (governance)

**Success metrics:** first-draft time 95 minutes -> 35 minutes or less [fictional]; AI drafts accepted with edits >= 55% [fictional]; rejections for missing or miscited sections 42% -> 20% or less [fictional]; Assist activation >= 40% of compliance accounts within 90 days of GA [fictional]

**Timeline:** beta with 20 compliance accounts [fictional] starts November 2026; Council build review November 2026; GA target February 2027

Please generate a complete PRD following the standard template.
```

---

## Output

# PRD: Workbench Blueprints Assist v1.2

## Overview

### Problem Statement

Compliance-heavy teams using Blueprints start every required section from an empty page, and the first draft is the expensive part: the median time from opening a required section to a complete first draft is 95 minutes [fictional], and 42% of rejected compliance Blueprints come back for a missing or miscited section rather than for weak substance [fictional]. The v1.1 audit trail export and compliance officer role removed the trust gap for approvers, but discovery interviews after the pivot kept returning to the authoring side: compliance program managers are being asked to write more regulated documents with the same hours, and the documents most likely to be rejected are the ones with the least source material kept at hand.

This is acute for the segment the roadmap now serves. Ops and compliance teams in regulated industries carried 68% of active Blueprints usage as of September 2026 [fictional], and the sales pipeline that unblocked at the pivot expects drafting help as table stakes: Atlassian pairs Confluence Compliance Controls with Atlassian Intelligence drafting, and Notion AI ships general-purpose writing assistance. Neither grounds drafts in a governed source set with citations, refuses sign-off assertions, or abstains when the sources cannot support an answer. Assist is the v1.2 bet that those behaviors, not raw generation, are what a regulated enterprise will pay for.

### Solution Summary

Blueprints Assist lets an author link the source documents a section depends on, then request a first draft. Assist drafts only from the linked set, attaches a citation to every source-derived claim, and presents the result as proposed content that the author must accept, edit, or discard. When a request would assert compliance sign-off, bypass the approval gate, or fabricate a citation, Assist refuses and states what it can do instead. When the linked sources do not cover the section's topic, Assist abstains, names the missing source class, and leaves the section as the author found it. Every draft, refusal, and abstention is recorded in the audit lineage that the compliance officer role already reads at the approval gate.

### Target Users

| User | Role | Primary need |
|---|---|---|
| Compliance program managers | Authors, source linkers | A grounded first draft so the regulated sections start from policy language, not a blank page |
| Ops managers | Authors | Draft sections faster without lowering documentation quality |
| Compliance officers | Approvers | Verify where a draft's sentences came from, and what the author changed, before approving |
| IT security leads | Platform governance | Know retrieval is restricted to the linked source set, enforced at the retrieval layer |

## Goals & Success Metrics

### Goals

1. Cut the time from opening a required section to a complete first draft for compliance Blueprints
2. Reduce approval-gate rejections caused by missing or miscited sections by grounding drafts in cited sources
3. Ship refusal and abstention as observable, evidenced release requirements rather than implementation details
4. Keep retrieval inside the explicitly linked source set, enforced at the retrieval layer

### Success Metrics

| Metric | Current Baseline | Target | Timeline |
|--------|-----------------|--------|----------|
| Median time to a complete first draft | 95 minutes [fictional] | 35 minutes or less [fictional] | GA + 60 days |
| AI drafts accepted with edits | n/a (new) | 55% or more of proposed drafts [fictional] | GA + 60 days |
| Rejections for missing or miscited sections | 42% [fictional] | 20% or less [fictional] | Two quarters after GA |
| Assist activation across compliance accounts | 0 | 40% or more within 90 days [fictional] | GA + 90 days |

### Non-Goals

- **Auto-submission.** Assist never submits a section for approval; enforcement stays at the approval gate, consistent with the v1.1 skip-and-submit lesson.
- **A chat interface.** Assist is scoped to one request-and-review interaction per section, not a conversational workspace.
- **Cross-Blueprint sourcing.** Assist cannot read other Blueprints, other departments' documents, or the wider workspace; only the explicitly linked set.
- **General writing help.** Marketing copy, emails, and non-Blueprint documents are out of scope.
- **Model selection.** The gateway and vendor decision is tracked separately and deliberately absent from this PRD.

## User Stories

| ID | User Story | Priority |
|----|-----------|----------|
| US-1 | As a compliance program manager, I want Assist to draft a required section from the policy documents I linked so that my first draft starts from policy language instead of a blank page | P0 |
| US-2 | As an author, I want every source-derived claim to carry a citation so that I can verify the draft before I accept it | P0 |
| US-3 | As a compliance officer, I want to see a draft's lineage (sources cited, what the author changed) at the approval gate so that I can trust what I am approving | P0 |
| US-4 | As an author, I want drafts to arrive as proposed content that I accept, edit, or discard so that nothing enters the Blueprint without my decision | P0 |
| US-5 | As an IT security lead, I want retrieval restricted to the linked source set at the retrieval layer so that the boundary holds even if a prompt is malformed | P1 |
| US-6 | As legal counsel, I want Assist to refuse sign-off assertions and citation fabrication by design so that the feature cannot manufacture compliance claims | P1 |
| US-7 | As an author, I want Assist to tell me which source material is missing when it cannot ground an answer so that I know what to link next | P1 |

## Scope

### In Scope

- Assist request panel on document sections, with required sections as the launch focus
- Explicit source linking: policy pages, approved Blueprints, and vendor documents uploaded to the workspace
- Grounded drafting from the linked set, with per-claim citations that resolve to a source anchor
- Proposed-draft review flow: accept, edit, or discard, with no auto-submission
- Refusal behavior for sign-off assertions, approval-gate bypass, citation fabrication, unlinked-source summarization, and fill-for-submission requests
- Abstention behavior for insufficiently covered sections, naming the missing source class
- Audit lineage for AI drafts, surfaced in the existing compliance officer view
- An evaluation suite that runs in CI on every model or prompt change before rollout

### Out of Scope

- Auto-submission or routine bypass of the approval gate
- Conversational or multi-turn assistance beyond one draft request per section
- Source material outside the explicit link set, including other departments' Blueprints
- Non-English drafting
- Legal advice or classification of a document's regulatory status
- Model vendor selection and gateway internals

### Future Considerations

- **Inline suggestions while typing** (v2): deferred because the review-flow contract is easier to hold with an explicit request.
- **Multilingual drafting** (v2): deferred pending a source-grounding evaluation in each language.
- **Regulatory template packs with pre-linked sources** (v1.3): likely the highest-leverage compliance feature, but it depends on Assist's citation model shipping first.
- **Approval-summary assistance for compliance officers** (v2): out of scope while the officer role is still new in v1.1.

## Solution Design

### Functional Requirements

#### Assist Request and Source Linking

- FR-1: Every document section offers an Assist entry point; required sections are the launch focus and appear first in the template.
- FR-2: An author with edit permission can link sources to a section; the link set is visible in the request panel, and each link records who added it and when.
- FR-3: Retrieval for a draft request reads only the linked source set; the index is scoped per Blueprint, and source access controls are re-checked at request time.

#### Grounded Drafting

- FR-4: Assist drafts a section only from the linked source set; every source-derived claim carries an inline citation that resolves to a source anchor.
- FR-5: Connective prose the model authors itself is visually distinguishable from source-derived claims in the proposed draft.
- FR-6: Drafts appear as proposed content; nothing merges into the section until the author accepts. Discarding restores the section exactly as it was.

#### Refusal and Abstention

- FR-7: Assist refuses requests to assert compliance sign-off, bypass the approval gate, fabricate a citation, summarize an unlinked document, or fill a section for submission without review; each refusal names the specific limit and offers a permitted alternative.
- FR-8: Assist abstains when the linked sources do not cover the section's topic; the abstention names the missing source class, leaves the section unchanged, and does not produce partial invented content.

#### Review and Lineage

- FR-9: Accept, edit, and discard actions are recorded, including the model version, prompt version, cited sources, and the author's identity.
- FR-10: The compliance officer view at the approval gate shows whether a section is AI-assisted, which sources were cited, and whether the author removed citations after accepting.

### User Experience

The primary flow follows this sequence:

1. Author opens a required section and selects Assist
2. The request panel shows currently linked sources; the author adds or removes links
3. Author submits the draft request
4. Assist returns a proposed draft: source-derived claims carry citations, connective prose is marked, and a header states which sources were used
5. Author accepts, edits, or discards; accepted text becomes ordinary section content with citation anchors intact
6. If Assist refuses or abstains, the panel states the limit or the missing source class, and the section is left untouched
7. At submission, the approval gate shows lineage for AI-assisted sections to the compliance officer

### Edge Cases

| Scenario | Expected Behavior |
|----------|------------------|
| A source is edited after a draft was generated | Citation anchors persist; stale anchors are flagged and the author must re-run or explicitly accept a stale draft, which is logged |
| Source access is revoked mid-session | Generation stops, the partial draft is discarded, and the author is notified |
| Two linked sources conflict (superseded and current policy) | The draft cites both and adds a conflict note; resolution stays with the author and is recorded |
| The author deletes all citations after accepting | Allowed (the author owns the final text), but the approval gate lineage shows "AI-assisted, citations removed" |
| No sources are linked | Assist abstains under FR-8 and names the missing source class |
| An accepted draft falls below the v1.1 completeness threshold of 20 words | Accepted AI text counts toward completeness only after acceptance; the threshold behavior is unchanged |

## AI Behavior and Evaluation

### Behavior Requirements and Their Evidence

| ID | Behavior required | How it is evaluated | Passing threshold |
|----|-------------------|---------------------|-------------------|
| AB-1 | Drafts a section from the linked source set with a citation on every source-derived claim, and marks connective prose it authors itself (FR-4, FR-5) | Component-level rubric on drafted sections: retrieval coverage first (did the case's linked set contain the answer), then claim-to-citation binding, then citation resolution against the linked set. Components are reported separately, never only end to end, because an end-to-end pass hides which step failed | Every case in each drafting slice binds every source-derived claim to at least one citation that resolves within the linked set. Threshold is all-or-nothing per case because one unattributed claim in a compliance section is the failure mode regulators name |
| AB-2 | Refuses sign-off assertions, approval-gate bypass, citation fabrication, unlinked-source summarization, and fill-for-submission requests, naming the limit and a permitted alternative (FR-7) | Adversarial refusal slice: five request styles, five cases each, phrased the way a hurried author would phrase them | Zero accepted requests across the refusal slice, and every refusal names the specific limit and offers a permitted alternative. Threshold is zero because this behavior is a release condition from legal review, not a quality bar |
| AB-3 | Abstains when the linked sources do not cover the section's topic, names the missing source class, and leaves the section unchanged (FR-8) | Abstention slice built from real template sections with thin, missing, and superseded sources | Zero invented specifics across the abstention slice, and every abstention names the missing source class. Chosen because a plausible but ungrounded draft is indistinguishable from a grounded one at reading time |
| AB-4 | Reads only the explicitly linked source set; never draws on other Blueprints, other departments' documents, or the wider workspace (FR-3) | Boundary slice seeded with tempting unlinked sources, including a previous department's approved Blueprint that answers the question and an unlinked policy page | Zero draft sentences sourced outside the link set across the boundary slice, verified by citation resolution against retrieval logs. Chosen because the IT security requirement is a retrieval constraint, so the evidence is the retrieval trace, not the draft text |

### Evaluation Set

- **Where the cases live:** `qa/blueprints-assist/` in the workbench-qa repository; one directory per slice, each case a linked-source set plus a section request plus the rubric-scored expected behavior.
- **Slices that must be covered:** every AB-n row above; the refusal slice with all five request styles; the abstention slice with thin, missing, and superseded sources; and the input classes where a failure costs the most: compliance and legal sections (a regulator reads them), sections citing customer-specific data (privacy exposure), and template migrations where a linked source describes a superseded policy version (a wrong version shipped under an approved signature).
- **Floor per slice, and what it commits you to:** drafting, 40 cases per section family, so the operational and compliance/legal families are both covered deliberately rather than by whichever cases were written first; refusal, 25 cases; abstention, 25 cases; boundary, 20 cases. Each floor commits to having searched for that slice's failure mode on purpose. None of them is a measurement of how often that failure occurs.
- **Held-out cases:** a held-out third of each slice is kept back from tuning and run only against the fixed thresholds above. If a threshold moves after a held-out case is seen, the case leaves the held-out set and the reason is recorded.
- **Slices scored separately:** operational sections and compliance/legal sections are reported separately; refusal and abstention are never merged, because they fail differently (refusal too permissive, abstention too eager); retrieval coverage, citation binding, and citation resolution are reported as components, never only as an end-to-end pass.
- **If someone asks for a rate:** this set does not support one, and saying so is the correct answer. Report raw counts per slice against the floor each was held to. A failure-rate claim needs a designed sample, a threshold fixed before the run, and independence assumptions that a hand-curated slice violates; deriving one here is how a PRD carries a number nobody can defend.

## Technical Considerations

### Constraints

- Assist runs against the Workbench model gateway; model and vendor selection is tracked separately and deliberately absent from this PRD.
- Retrieval is restricted to the linked source set at the retrieval layer (index scoped per Blueprint), not by instruction to the model; this is an IT security requirement, and the retrieval trace is the evidence for AB-4.
- First draft latency target: 20 seconds or less for a 1,200-word section [fictional]; the panel shows progress after 5 seconds [fictional].
- Drafts, prompts, and retrieval traces are retained 30 days [fictional] for the audit pipeline; region pinning is unchanged from tenant provisioning (US, EU, APAC).

### Integration Points

| System | Integration type | Status |
|---|---|---|
| Workbench model gateway | Drafting requests, versioned prompts | Platform team; interface stable |
| Retrieval and index service | Blueprint-scoped index, ACL re-check | Requires scoping work (Karen L.) |
| Blueprint editor (ProseMirror) | Proposed-draft block, citation anchors | Design complete (Tomás G.) |
| Approval gate service | Lineage display for AI-assisted sections | Existing service; view extension |
| Audit pipeline | Draft, refusal, abstention, and acceptance events | Existing pipeline; new event types |
| Compliance officer role | Lineage visibility permissions | Shipped in v1.1 |

### Data Requirements

- The retrieval index is scoped per Blueprint; source ACLs are re-checked at request time so a link that outlives its permission does not leak content.
- Customer content is not used for model training; the gateway contract carries this as a no-training commitment.
- Citation anchors are version-stable across source edits so a draft's lineage survives the source being revised.
- Audit events for AI drafts are append-only with the same retention as the v1.1 audit trail.

## Dependencies & Risks

### Dependencies

| Dependency | Owner | Status | Impact if Delayed |
|---|---|---|---|
| Model gateway readiness | Karen L. (Eng Lead) | Platform work in flight, Nov 2026 target | Blocks Assisted beta; Assist GA slips a quarter |
| Evaluation harness in CI | Leo M. (Data Analyst) | Design done; implementation Nov 2026 | Release discipline for model changes weakens; Council review at risk |
| Legal sign-off on refusal wording | Elaine R. (Legal Counsel) | Draft under review | Blocks beta wording; refusal slice cannot freeze |
| AI Governance Council build review | Sandra C. (Head of Product) | Scheduled November 2026 | Build cannot start without it |
| Beta accounts (20 compliance customers [fictional]) | Mei-Lin T. (Enterprise Sales Lead) | Six committed; recruiting the rest | Weakens beta signal on accept/edit rates |

### Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Authors over-trust drafts and accept without reading | Medium | High | Citation-first review UI; lineage visible at the approval gate; the accepted-with-edits metric is a reported signal, not a success claim |
| Refusal behavior is too broad and blocks ordinary requests | Medium | Medium | The refusal slice includes permitted adjacent requests; false refusals are scored inside the drafting slices, not hidden in the aggregate |
| A model or prompt change silently degrades grounding | Medium | High | The evaluation suite runs in CI on every model or prompt change, and a slice failing its floor blocks the rollout |
| Retrieval leaks beyond the link set | Low | High | Boundary enforced at the index layer; boundary slice seeded with tempting unlinked sources |
| Latency target missed on long sections | Medium | Medium | Chunking and caching work under Karen L.; beta telemetry decides whether the 1,200-word target holds |

## Timeline & Milestones

| Milestone | Date | Owner |
|---|---|---|
| PRD approved | Oct 2026 | Rachel V. |
| Model gateway integration + eval harness | Nov 2026 | Karen L. / Leo M. |
| AI Governance Council build review | Nov 2026 | Sandra C. |
| Closed beta: 20 compliance accounts [fictional] | Nov 2026 through Jan 2027 | Rachel V. |
| Evaluation suite freeze for GA | Jan 2027 | Leo M. |
| GA launch (Assist v1.2) | February 2027 | Rachel V. / Karen L. |

## Open Questions

1. **Citation format:** inline superscript anchors or section-endnotes? Tomás G. is testing both in beta; the audit lineage stores the anchor either way.
2. **Golden-set reuse:** should accepted-with-edits drafts feed future evaluation slices? Leo M. wants it; privacy review of customer content is required first.
3. **Assist on optional sections:** ship on required sections only, or everywhere? Beta usage decides; the refusal and abstention slices do not change either way.
4. **Lineage when citations are removed:** the approval gate currently shows "AI-assisted, citations removed." Does Elaine R. want the removed citations themselves preserved in the audit trail as well? Legal review pending.
5. **Gateway vendor timing:** Karen L. expects the gateway decision before beta; if it slips, beta runs on the interim provider with the same evaluation suite, and the boundary slices are re-run against the final provider before GA.

## Appendix

### Related Documents

- Pivot decision: customer segment narrowing to ops/compliance (May 19, 2026)
- v1.1 refinement notes: audit trail export, compliance officer role, approval UX
- A/B test results: required-section enforcement, -40% time-to-approved [fictional]
- Audit trail export specification (v1.1)
- AI governance policy v3 (internal) and the Council's prior-quarter evaluation rejection memo
- Competitive analysis: enterprise docs/collaboration landscape, AI drafting positioning

### Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 0.1 | Oct 5, 2026 | Rachel V. | Initial draft from pivot follow-up interviews and sales input |
| 0.2 | Oct 9, 2026 | Rachel V. | Added refusal and abstention requirements after legal and IT security review |
| 0.3 | Oct 13, 2026 | Rachel V. | Added evaluation slices and floors after Council feedback on prior-quarter sizing |
| 1.0 | Oct 16, 2026 | Rachel V. | Approved by Sandra C. (Head of Product) for the Council build review |
