# Persona Dossier: Rhea Patel, Keeper of the Approval Chain (Product)

## Layer 1: Narrative Persona Dossier

## Executive summary
- Rhea optimizes for defensible execution, not superficial speed.
- She blocks ambiguous high-impact approvals because late discovery is costlier than early friction.
- Approval quality is a product surface, not just an operational policy.
- Exception handling is acceptable only when ownership, reason, expiry, and follow-up are explicit.
- Teams misread her as conservative when they do not carry downstream accountability.
- She needs fast decision-quality signals, not verbose status reporting.
- Contradictory approvals and stale evidence links are top trust-breakers.
- "Green" status without rationale is functionally a false positive.
- She values controlled acceleration during deadlines, not process rigidity.
- Products that preserve legibility under pressure earn sustained sponsorship.

### 1) Opening scene
At 5:37 PM on submission day, the package is marked ready and Slack is celebrating a green status. Rhea opens the final approval thread and finds one high-impact approval with no rationale and one unresolved exception with no owner.

She pauses release.

To other teams this looks like delay; to Rhea it is risk containment before cost multiplies downstream.

### 2) Who this person is when work gets real
Rhea runs Clinical Quality Operations in a regulated environment where "done" has legal and operational consequences. She is collaborative and practical, but she has one hard boundary: if a high-risk decision cannot be explained later, the process is not trustworthy.

She does not optimize for workflow aesthetics. She optimizes for outcomes that survive scrutiny.

### 3) Core tension and decision model
Rhea is not "quality over speed." She is anti-fragile speed. Her operating question is not "how quickly did we ship" but "how many hidden assumptions did we carry to the finish line."

When information is incomplete, she chooses early clarification over late-stage narrative reconstruction.

### 4) Decision moments that define behavior
- Decision moment A: If evidence is incomplete and accountability is unclear, block and clarify now.
- Decision moment B: Allow lightweight approval for low-risk edits, but require rationale and confidence for high-impact changes.
- Decision moment C: Permit scoped exceptions under deadline only when owner, reason, expiry, and follow-up criteria are explicit.

### 5) What they say vs what they mean
| What they say | What they mean | Product implication |
|---|---|---|
| "This feels brittle." | A single dependency failure can cascade silently. | Surface dependency and handoff risk early. |
| "Can we stand behind this?" | Current pass state will fail under scrutiny later. | Require rationale and confidence for high-impact claims. |
| "Who owns this?" | Accountability is ambiguous right now. | Make ownership explicit in approval and exception flows. |
| "We are not ready." | It can pass today but fail in review tomorrow. | Align pre-flight and final-gate validation logic. |

### 6) Operating modes
- Normal mode: prioritize throughput while preserving traceability.
- Compression mode: prioritize controlled acceleration with risk summaries and explicit exception governance.
- Incident mode: prioritize containment, provenance reconstruction, and clear owner/action mapping.

### 7) Product strategy implications
Priority stack:
- Decision-quality signals (confidence, rationale, impact cues)
- Exception governance (owner, reason, expiry, follow-up)
- Validation parity (same rules in flow and export)
- Conflict visibility (contradictory approvals, stale references)
- Human-readable policy explanations (what failed, why, what next)

Anti-patterns to avoid:
- Green states that hide unresolved uncertainty
- Approval models that flatten low-risk and high-risk decisions into one flow

### 8) Design principles this persona forces
- Never show "green" when critical uncertainty is unresolved.
- Treat approval quality as a first-class UX problem.
- Design reversible, auditable exception paths.
- Separate low-risk convenience from high-risk control boundaries.
- Optimize for cross-role clarity, not only individual speed.

### 9) If this persona wins, what changes?
Teams stop shipping convenience features that collapse under pressure and start shipping systems that remain legible during deadlines, disagreement, and audit. Velocity stays high, but avoidable rework and accountability gaps decline materially.

---

## Layer 2: Operational Appendix

### A) Request Context
- **Mode:** product
- **Mode alias used:** none
- **Detail profile:** detailed
- **Artifact or task context:** improve a regulated approval workflow for `problem-statement`, `prd`, and `edge-cases`
- **Domain context:** regulated B2B workflow software

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
- **Includes:** workflow friction, decision triggers, risk posture, product tradeoff direction
- **Excludes:** campaign messaging strategy, channel planning, non-decision persona trivia

### E) Scenario tailoring
- For `problem-statement`: frame the issue as late discovery and hidden ambiguity in high-stakes approvals.
- For `prd`: require explicit requirements for rationale capture, exception lifecycle ownership, and validation parity.
- For `user-stories`: encode accountability semantics (who decides, required evidence, conflict handling, recoverable failure).
- For `edge-cases`: prioritize contradictory approvals, stale evidence links, ownerless exceptions, and deadline overrides without rationale.
- For `launch-checklist`: include reviewer enablement, escalation ownership coverage, and rollback readiness for approval-logic regressions.

### F) When not to use this persona
- Do not use for top-of-funnel demand generation strategy.
- Do not use for consumer UX polish work with no compliance or audit consequence.
- Do not use for pure brand storytelling disconnected from workflow risk.

### G) Assumptions and Confidence
- **Key assumptions:**
  - Cross-functional approvals are a core business path.
  - Decision provenance is required for audits and escalations.
  - Late-stage rework is materially costly.
  - Reviewer quality is variable under deadline pressure.
- **Confidence:** Medium
- **Confidence rationale:** Strong behavioral fit for regulated operations leadership, but weighting should be calibrated with current baseline metrics.

## Evidence Trail

### User-provided inputs
| ID | Resource | Type | Used for | Notes |
|---|---|---|---|---|
| U1 | Request for narrative-first, non-sterile persona outputs | user instruction | story-first structure and tone | no org-specific metrics supplied |
| U2 | v2.5 stance (`F-02` included; details provisional) | user instruction | scope framing and contract posture | informs guidance boundaries |

### LLM-discovered references
| ID | Resource | Type | Access method | Used for | Reliability notes |
|---|---|---|---|---|---|
| L1 | NN/g persona guidance | article | browse/search | decision-oriented persona framing | strong UX source |
| L2 | NN/g personas + JTBD relationship | article | browse/search | jobs-to-decision linkage | strong conceptual source |
| L3 | GOV.UK research guidance | docs | browse/search | evidence and assumptions clarity | high-practicality source |
| L4 | ISO 9241-210 HCD principles | standard summary | browse/search | context-driven design baseline | standards-aligned framing |

### Evidence gaps and follow-up questions
| Gap ID | Missing support | Impacted claims/sections | Confidence impact | Follow-up question |
|---|---|---|---|---|
| G1 | No current re-open-after-approval baseline | decision model and risk prioritization | Medium | What is current re-open rate by workflow stage? |
| G2 | No reviewer-confidence distribution by role | mode-specific behavior and risk triage | Medium | Which reviewer cohorts show highest variance? |
| G3 | No exception taxonomy frequency data | exception governance priorities | Medium | What are top recurring exception classes and owners? |

### Claim mapping
| Claim ID | Claim summary | Evidence IDs | Confidence | Assumptions |
|---|---|---|---|---|
| C1 | Defensible flow is prioritized over fragile speed | U1, U2, L1, L2 | Medium | regulated review constraints are material |
| C2 | Decision-quality signals are a core product lever | U1, L2, L3 | Medium | current approval model under-signals quality |
| C3 | Hidden policy logic harms trust under pressure | U1, L1, L4 | Medium | teams depend on legible escalation paths |
