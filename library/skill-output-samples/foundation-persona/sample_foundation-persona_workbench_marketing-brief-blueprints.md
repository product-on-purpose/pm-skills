---
title: "Foundation Persona: Workbench Marketing Brief Blueprints"
description: "Workbench Blueprints marketing persona for enterprise champion sales playbook and pilot-to-expansion messaging."
artifact: persona
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.5.0"
created: 2026-03-02
status: sample
thread: workbench
context: Workbench Blueprints marketing persona for enterprise champion sales playbook and pilot-to-expansion messaging
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Workbench is building the enterprise sales playbook for Blueprints after three pilot customers requested formal proposals following successful Blueprint trials. The common stall point in early pipeline conversations is that the internal champion can answer product questions but cannot respond to IT security and legal stakeholder concerns without vendor-supplied proof. The PMM needs a brief marketing persona to align messaging, objection handling, and pilot-to-expansion proof points for the sales team.

**Source Notes:**

- Gartner research on B2B buying behavior identifies the internal champion's inability to arm other stakeholders as a primary deal-stall mechanism in enterprise software.
- Forrester buyer-group dynamics research emphasizes that champions who receive role-specific proof assets close deals faster than those equipped with generic product decks.
- MEDDIC/MEDDPICC qualification frameworks treat champion enablement as a distinct deal-health metric, separate from product fit and economic buyer alignment.

---

## Prompt

```text
foundation-persona marketing brief

Sandra V. to PM Skills agent:

> I need a brief marketing persona for the Workbench Blueprints enterprise
> sales playbook. This should represent the internal champion who drives
> the purchasing conversation.
>
> Context:
> - 3 pilot customers have requested formal proposals after Blueprint trials
> - Common stall point: champion can't answer IT security and legal questions
>   without vendor-supplied materials
> - Need: concise persona for messaging alignment, objection prep, and
>   pilot-to-expansion proof points
> - Sales cycle: 60-90 day evaluations with 3-5 stakeholder sign-offs
>
> Keep it brief but decision-usable for the sales team.
```

---

## Output

# Persona Dossier: Sandra Vo, The Champion Who Cannot Arm Her Committee (Marketing, Brief)

## Layer 1: Narrative Persona Dossier

## Executive summary
- Sandra believes in Blueprints but cannot close the deal alone because her committee needs answers she does not have.
- She is not the economic buyer; she is the credibility bridge between the product and the people who sign contracts.
- Her deal stalls when IT asks about SSO and data residency and she has nothing to forward.
- She needs materials that survive internal forwarding without her reinterpretation.
- Generic product decks weaken her internal position because they signal vendor immaturity.
- Her conversion likelihood rises when the vendor equips her to answer committee questions before the committee asks them.
- The real competitor is not Confluence; it is the committee's comfort with the status quo.

### 1) Opening scene
Sandra just finished a 30-minute Blueprint pilot debrief with her ops team. Everyone agrees the templates and approval gates solved the incomplete-submission problem they have been fighting for a year. She opens Slack to message her VP about a formal proposal and then pauses. She knows the VP will forward it to IT and Legal, and she has no answers for their questions about SSO integration, data residency, or audit log retention.

She drafts the message, deletes it, and decides to wait until she has something to send alongside it.

### 2) Who this person is under the surface
Sandra is Director of Operations at a mid-enterprise company with roughly 800 employees [fictional]. She has enough organizational capital to sponsor a tool evaluation but not enough to bypass IT and Legal review. She has championed tools before and learned that internal credibility erodes when she cannot answer stakeholder objections promptly.

### 3) Core tension and decision model
Sandra wants to move fast but knows her committee moves at the speed of the least-informed stakeholder. Her decision model is defensive: she will not escalate a proposal until she can pre-answer the three questions she knows are coming.

### 4) Trigger events that create urgency
- Trigger A: a pilot team produces measurable results that make the status quo indefensible to leadership.
- Trigger B: a compliance or audit event exposes the document-governance gap that Blueprints addresses.
- Trigger C: a peer champion at another company shares a successful Workbench deployment, normalizing the purchase.

### 5) What they say vs what they mean
| What they say | What they mean | Sales implication |
|---|---|---|
| "I need to run this by IT first." | She lacks the security documentation to pre-answer IT's questions. | Provide a security overview she can forward before the IT meeting happens. |
| "We love the pilot results." | The product is not the problem; the buying process is. | Shift from product demo to committee-enablement mode. |
| "Can you send me something I can share?" | She needs forwardable materials, not a sales call. | Deliver role-specific one-pagers for IT, Legal, and Finance. |

### 6) Operating modes
- Normal mode: gather proof and build internal consensus before escalating.
- Champion mode: proactively distribute stakeholder-specific materials ahead of objections.
- Stalled mode: waiting for vendor materials while internal momentum decays.

### 7) GTM strategy implications
Prioritize:
- role-specific one-pagers (IT security, Legal compliance, Finance ROI)
- pilot results summary formatted for executive forwarding
- pre-built FAQ covering SSO, data residency, audit retention, and SOC 2 status

Avoid:
- sending the champion a generic deck and expecting her to translate it
- relying on a single product demo to cover all stakeholder concerns
- treating the champion as the decision-maker rather than the deal accelerator

### 8) Sales principles this persona forces
- Equip the champion before the committee meeting, not during it.
- Treat every forwarded document as a trust test.
- Measure deal health by champion armament, not product enthusiasm.

### 9) If this persona wins, what changes?
Workbench stops losing deals in the gap between pilot success and committee approval. Sales shifts from demo-centric selling to champion-enablement selling, and deal velocity improves because stakeholder objections are answered before they become blockers.

---

## Layer 2: Operational Appendix

### A) Request Context
- **Mode:** marketing
- **Mode alias used:** none
- **Detail profile:** brief
- **Artifact or task context:** Blueprints enterprise sales playbook and champion enablement
- **Domain context:** enterprise collaboration software with multi-stakeholder buying process

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
- **Includes:** champion behavior, committee-stall dynamics, objection handling, forwardable proof requirements, pilot-to-proposal momentum
- **Excludes:** end-user onboarding UX, product feature prioritization, engineering architecture decisions

### E) Scenario tailoring
- For `launch-checklist`: verify champion-enablement materials are ready (IT security brief, legal compliance summary, executive ROI one-pager) before GTM launch.
- For `release-notes`: frame Blueprints updates in terms of governance and compliance outcomes, not feature lists, to support champion forwarding.
- For sales enablement: deliver stakeholder-specific objection guides and pre-built email templates the champion can send directly.

### F) When not to use this persona
- Consumer self-serve product decisions
- Product UX design for end-user workflows
- Brand positioning campaigns with no sales-cycle dependency

### G) Assumptions and Confidence
- **Key assumptions:**
  - The champion is the primary deal accelerator, not the economic buyer.
  - Deal stalls are caused by information gaps, not product objections.
  - Forwardable materials are more effective than additional sales calls at this stage.
- **Confidence:** Medium
- **Confidence rationale:** Pattern aligns with enterprise B2B champion dynamics, but pilot-to-proposal conversion data is based on three accounts and has not been validated at pipeline scale.

## Evidence Trail

### User-provided inputs
| ID | Resource | Type | Used for | Notes |
|---|---|---|---|---|
| U1 | Workbench pilot-to-proposal stall point context | user prompt | opening scene and committee-stall framing | 3 pilot accounts noted |
| U2 | Request for brief champion-focused marketing persona | user prompt | depth profile and sales-enablement orientation | explicit emphasis on objection handling |

### LLM-discovered references
| ID | Resource | Type | Access method | Used for | Reliability notes |
|---|---|---|---|---|---|
| L1 | Gartner B2B buying behavior research | research summary | browse/search | champion-stall mechanism framing | widely used enterprise buying model |
| L2 | Forrester buyer-group dynamics | research report | browse/search | role-specific proof asset effectiveness | high relevance to committee buying |
| L3 | MEDDIC/MEDDPICC framework | methodology | browse/search | champion enablement as deal-health metric | standard enterprise sales qualification |

### Evidence gaps and follow-up questions
| Gap ID | Missing support | Impacted claims/sections | Confidence impact | Follow-up question |
|---|---|---|---|---|
| G1 | Pilot-to-proposal conversion rate by stakeholder composition | committee-stall prioritization | Medium | Which stakeholder role most frequently blocks pilot-to-proposal progression? |
| G2 | Champion material usage tracking | proof asset effectiveness assumptions | Medium | Which champion-enablement materials are actually forwarded vs. ignored? |

### Claim mapping
| Claim ID | Claim summary | Evidence IDs | Confidence | Assumptions |
|---|---|---|---|---|
| C1 | Champion armament is the primary deal-velocity lever | U1, U2, L1, L2 | Medium | champion is the consistent deal accelerator in target segment |
| C2 | Forwardable materials outperform additional sales calls for committee buy-in | U1, L2, L3 | Medium | committee members prefer self-serve review over vendor-led meetings |
| C3 | Status quo is the primary competitor, not direct alternatives | U1, L1 | Medium | pilot success does not automatically translate to procurement urgency |
