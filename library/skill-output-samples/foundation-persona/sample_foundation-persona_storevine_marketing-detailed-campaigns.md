---
title: "Foundation Persona: Storevine Marketing Detailed Campaigns"
description: "Storevine Campaigns committee-buying marketing persona for launch and enablement planning."
artifact: persona
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.5.0"
created: 2026-02-24
status: sample
thread: storevine
context: Storevine Campaigns committee-buying marketing persona for launch and enablement planning
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Storevine is preparing the GTM package for Campaigns, its built-in email and SMS re-engagement product. Early discovery calls show positive interest, but opportunities stall once the conversation expands beyond the initial product champion to operations, legal, and finance stakeholders. The PMM needs a marketing persona that can drive launch messaging, sales-enablement proof assets, and objection handling for a committee buying motion.

**Source Notes:**

- Pragmatic Institute buyer-persona/message guidance emphasizes role-specific proof over one-size-fits-all positioning in B2B decisions.
- Forrester buyer-group research frames modern B2B purchases as coalition decisions with distributed risk ownership.
- Gartner research on B2B buying behavior highlights nonlinear decision paths and internal consensus friction as dominant stall points.

---

## Prompt

```text
foundation-persona marketing detailed

Build a story-first marketing persona for Storevine Campaigns launch planning.

Context:
- Product: Storevine (B2B ecommerce platform)
- Feature: Campaigns native email/SMS re-engagement
- GTM issue: deals stall after initial interest when more stakeholders join
- Goal: improve launch narrative, objection handling, and sales enablement proof kits

Need output to include:
- trigger events and committee dynamics
- objection translation (what buyers say vs what they mean)
- message architecture and stage-by-stage guidance
- scenario tailoring for launch checklist, release notes, GTM planning, sales enablement
- explicit assumptions/confidence/evidence trail
```

---

## Output

# Persona Dossier: Daniel Ng, The Internal Dealmaker (Marketing)

## Layer 1: Narrative Persona Dossier

## Executive summary
- Daniel does not buy alone; he assembles internal agreement across competing incentives.
- The true buying decision happens after the formal meeting in stakeholder side conversations.
- He needs role-specific proof assets that can be forwarded without heavy reinterpretation.
- Generic ROI language loses credibility when assumptions are unclear.
- Trigger events are usually risk-driven: audit pressure, timeline volatility, and scaling complexity.
- "This looks heavy" usually means rollout burden fear, not product confusion.
- "We already have tools" usually means migration and political-risk anxiety.
- Messaging must separate control outcomes, operational outcomes, and rollout outcomes.
- Stage-specific proof sequencing outperforms one universal deck.
- Win probability rises when the PMM equips Daniel to defend tradeoffs in committee settings.

### 1) Opening scene
Daniel is ten minutes from an executive review and has one slide open: "Recommendation." He does not present yet because he knows the real decision will happen after the meeting in parallel conversations with IT, Legal, Finance, and Operations.

His role is not simple buyer advocacy. His role is coalition architecture under risk.

### 2) Who this person is under the surface
Daniel is VP of Regulatory Operations at a growth-stage commerce company. He has authority to move deals and enough scar tissue to know where they fail.

He has watched strong demos collapse during implementation and strong champion narratives collapse under cross-functional scrutiny.

### 3) How the buying story actually moves
His buying path is nonlinear. A trigger creates urgency, then the evaluation fragments into role-specific risk tests, and consensus reforms only when proof assets match each stakeholder's private fear.

A single universal pitch is interpreted as a signal that the vendor has not handled complex enterprise buying before.

### 4) Trigger events that create urgency
- Trigger A: audit near-miss lowers confidence in current process governance.
- Trigger B: recurring launch-date slips expose hidden late-stage rework cost.
- Trigger C: scale pressure increases process variability across teams and regions.

### 5) Buying group map
| Role | Public concern | Private fear | What messaging must prove |
|---|---|---|---|
| Regulatory lead | defensibility | personal accountability in adverse review | rationale integrity and traceable approvals |
| Quality operations manager | workflow reliability | becoming bottleneck owner | clear ownership and fewer late surprises |
| IT/security | integration risk | hidden support burden | practical architecture and low-friction adoption |
| Legal/compliance | policy exposure | inconsistent exception handling | explicit governance boundaries and audit-ready controls |
| Finance | payback | overcommitting under uncertainty | conservative value model with transparent assumptions |

### 6) Objections and anxieties in real calls
- Objection 1: "This looks heavy." Usually means rollout burden and adoption-risk concern.
- Objection 2: "We already have tools." Usually means migration complexity plus political risk.
- Objection 3: "Can we trust AI here?" Usually means explainability and accountability anxiety.

Proof needed to resolve objections:
- phased rollout plan with role-level workload controls
- coexistence and migration criteria with explicit cutover checkpoints
- clear boundary model for automation vs human accountability

### 7) Message architecture and channels
Core narrative:
- Storevine Campaigns reduces high-cost ambiguity in regulated customer communication workflows.
- It improves control visibility while preserving operator speed.
- It offers a rollout model that is governable under deadline pressure.

Message pillars:
- Control pillar: reason codes, rationale capture, ownership visibility
- Operations pillar: earlier conflict detection and fewer late surprises
- Rollout pillar: phased deployment with measurable checkpoints

Channel guidance:
- Executive brief for decision framing
- Sales call deck with role-specific proof cards
- Enablement one-pagers by stakeholder function

Messaging to avoid:
- "Automatic compliance" claims
- feature-inventory-first narratives without risk outcome framing

### 8) Stage-by-stage GTM guidance
| Stage | What they ask | What they distrust | What wins |
|---|---|---|---|
| Problem framing | "Is this structural pain or noise?" | generic productivity claims | risk narrative tied to failure economics |
| Shortlist | "Is this governable in our environment?" | black-box automation language | explicit controls and exception model |
| Committee alignment | "Can I defend this internally?" | one-size-fits-all deck | role-specific proof kit |
| Final decision | "Will rollout hold under pressure?" | pilot-only anecdotes | pilot-to-rollout plan with risk register |

### 9) If this persona wins, what changes?
GTM messaging becomes committee-ready and forwardable. Storevine stops relying on broad product claims and starts winning with role-specific proof that survives internal stakeholder scrutiny.

---

## Layer 2: Operational Appendix

### A) Request Context
- **Mode:** marketing
- **Mode alias used:** none
- **Detail profile:** detailed
- **Artifact or task context:** Campaigns launch narrative and sales enablement hardening
- **Domain context:** B2B ecommerce software with committee buying dynamics

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
- **Includes:** trigger events, buying-group dynamics, objections, messaging architecture, stage proof sequencing
- **Excludes:** UI interaction detail, internal implementation ticket breakdowns, non-buying demographic profiling

### E) Scenario tailoring
- For `launch-checklist`: verify role-specific proof assets and objection-response coverage before launch messaging sign-off.
- For `release-notes`: lead with controllable risk outcomes and explicit boundaries, not feature inventory.
- For GTM planning: map message pillars to stakeholder roles and buying stages.
- For sales enablement: deliver stakeholder-specific discovery prompts and objection decoding guides.

### F) When not to use this persona
- Consumer growth experiments with no committee buying behavior
- Product UX decisions that do not affect buying confidence
- Brand campaigns detached from operational-risk outcomes

### G) Assumptions and Confidence
- **Key assumptions:**
  - Purchase decisions are committee-led.
  - Governance and rollout credibility materially affect conversion.
  - Internal champions require forwardable proof assets.
  - "Do nothing" is a meaningful competitive alternative.
- **Confidence:** Medium
- **Confidence rationale:** Pattern strongly fits enterprise B2B buying behavior, but role weights and objection frequency should be calibrated with current pipeline data.

## Evidence Trail

### User-provided inputs
| ID | Resource | Type | Used for | Notes |
|---|---|---|---|---|
| U1 | Storevine GTM context and committee-stall problem | user prompt | trigger framing and objection priorities | no win/loss breakdown supplied |
| U2 | Request for story-first detailed persona | user prompt | narrative IA and section depth | explicit emphasis on enablement utility |

### LLM-discovered references
| ID | Resource | Type | Access method | Used for | Reliability notes |
|---|---|---|---|---|---|
| L1 | Pragmatic buyer persona/message guidance | article | browse/search | message architecture and proof design | strong PMM source |
| L2 | Forrester buyer-group framing | research summary | browse/search | committee dynamics assumptions | high relevance to enterprise B2B |
| L3 | Gartner B2B buying journey perspective | research summary | browse/search | nonlinear stage framing | widely used buying model |

### Evidence gaps and follow-up questions
| Gap ID | Missing support | Impacted claims/sections | Confidence impact | Follow-up question |
|---|---|---|---|---|
| G1 | Objection frequency by segment and stage | objection prioritization and proof sequencing | Medium | Which objections dominate recent closed-lost opportunities? |
| G2 | Stakeholder composition vs conversion outcomes | buying-group map weighting | Medium | Which stakeholder combinations correlate with stalled deals? |
| G3 | Pilot-to-rollout conversion baseline | stage guidance confidence | Medium | What share of pilot accounts convert to governed rollout? |

### Claim mapping
| Claim ID | Claim summary | Evidence IDs | Confidence | Assumptions |
|---|---|---|---|---|
| C1 | Role-specific proof assets are necessary for this persona | U1, U2, L1, L2 | Medium | committee buying remains dominant for target segment |
| C2 | Governance clarity is a primary buying criterion | U1, L2, L3 | Medium | risk-sensitive stakeholders influence final decision materially |
| C3 | Stage-specific messaging improves conversion reliability | U2, L1, L3 | Medium | teams can operationalize stage-based enablement quickly |
