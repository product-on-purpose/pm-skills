---
title: "Foundation Persona: Brainshelf Product Brief Resurface"
description: "Brainshelf Resurface activation persona for early-retention product decisions."
artifact: persona
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.5.0"
created: 2026-02-24
status: sample
thread: brainshelf
context: Brainshelf Resurface activation persona for early-retention product decisions
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Brainshelf is refining Resurface onboarding after launch-week analytics showed many users open the first digest but fail to build a repeatable revisit habit. The PM needs a brief product persona to quickly align hypothesis updates, story prioritization, and edge-case coverage around confidence-building behavior. The persona should stay concise while preserving explicit assumptions and evidence boundaries.

**Source Notes:**

- Nielsen Norman Group onboarding research emphasizes confidence and reversibility as core drivers of first-week activation quality.
- Product-led growth benchmarking consistently highlights second-session return behavior as a leading early-retention indicator.
- GOV.UK research guidance supports explicit assumptions and evidence-gap disclosure when making low-data decisions.

---

## Prompt

```text
foundation-persona product brief

Need a concise story-first product persona for Brainshelf Resurface activation work.

Context:
- Product: Brainshelf (consumer PKM app)
- Feature: Resurface morning digest and revisit flow
- Problem: users open first digest, but many do not form repeat revisit behavior
- Downstream artifacts: hypothesis revision, user stories, edge-cases

Please include:
- clear decision posture and tradeoff lens
- includes/excludes boundaries
- scenario tailoring for hypothesis, user stories, edge-cases
- assumptions/confidence/evidence trail
```

---

## Output

# Persona Dossier: Maya Torres, The Habit Builder Under Time Pressure (Product, Brief)

## Layer 1: Narrative Persona Dossier

## Executive summary
- Maya values quick clarity over advanced control during first-use moments.
- She abandons flows that feel irreversible or cognitively heavy.
- Early retention depends on whether first value feels repeatable, not just impressive once.
- She needs confidence cues that explain why resurfaced items matter now.
- She responds well to low-friction next actions tied to existing routines.
- She ignores generic engagement nudges that lack contextual relevance.
- Product decisions should prioritize repeat behavior scaffolding over feature breadth.

### 1) Opening scene
At 7:12 AM Maya opens her first Resurface digest while commuting. One item looks useful, but the next action is unclear and the flow feels like a dead end once she reads it.

She closes the app and does not return until days later.

### 2) Who this person is when work gets real
Maya is a busy knowledge worker juggling fragmented attention. She is not resistant to new workflows; she is resistant to workflows that consume setup energy before they prove repeatable value.

### 3) Core tension and decision model
Maya trades novelty for reliability. If a step is unclear or feels irreversible, she defers. If a step feels small, contextual, and recoverable, she proceeds.

### 4) Decision moments that define behavior
- Decision moment A: if relevance is unclear, skip now and postpone engagement.
- Decision moment B: if next action is obvious and low-risk, continue.
- Decision moment C: if cognitive load spikes, abandon and rely on existing habit channels.

### 5) What they say vs what they mean
| What they say | What they mean | Product implication |
|---|---|---|
| "I will come back later." | Current step feels unclear or heavy. | Reduce ambiguity and shorten next-action path. |
| "This is interesting." | Value signal exists but is not yet actionable. | Add relevance explanation plus immediate follow-up action. |
| "I lost my place." | Flow continuity broke across context switch. | Preserve state and provide quick resume cues. |

### 6) Operating modes
- Normal mode: open to exploration when actions are lightweight.
- Compression mode: chooses only obvious, low-effort actions.
- Interrupt mode: exits quickly if flow lacks resume confidence.

### 7) Product strategy implications
Prioritize:
- contextual relevance cues
- one-tap next-action paths
- safe resume and continuity markers

Avoid:
- dense option sets on first revisit
- generic prompts detached from user context

### 8) Design principles this persona forces
- Make first repeat action easier than first discovery action.
- Show why an item matters now, not just what it is.
- Preserve continuity across interruptions.

### 9) If this persona wins, what changes?
Brainshelf focuses on building repeatable revisit behavior and reduces early drop-off caused by ambiguous next steps.

---

## Layer 2: Operational Appendix

### A) Request Context
- **Mode:** product
- **Mode alias used:** none
- **Detail profile:** brief
- **Artifact or task context:** Resurface activation and early-retention refinement
- **Domain context:** consumer PKM product with routine-formation challenge

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
- **Includes:** activation behavior, confidence triggers, friction points, product tradeoff guidance
- **Excludes:** paid acquisition strategy, lifecycle email channel mix, broad demographic segmentation

### E) Scenario tailoring
- For `hypothesis`: test whether relevance cue + one-tap next action increases second-session revisit completion.
- For `user-stories`: encode resume continuity, low-friction action paths, and interruption-safe behavior.
- For `edge-cases`: cover interrupted sessions, stale relevance cues, and empty resurfacing states.

### F) When not to use this persona
- Enterprise committee buying and messaging strategy work
- Procurement or legal stakeholder alignment artifacts
- Brand positioning projects outside product activation behavior

### G) Assumptions and Confidence
- **Key assumptions:**
  - First-week retention depends on repeatable behavior confidence.
  - Users operate under fragmented attention windows.
  - Resume continuity is currently under-served in the flow.
- **Confidence:** Medium
- **Confidence rationale:** Strong fit with known activation behavior patterns, but recent segment-specific interviews are limited.

## Evidence Trail

### User-provided inputs
| ID | Resource | Type | Used for | Notes |
|---|---|---|---|---|
| U1 | Brainshelf Resurface problem framing | user prompt | opening scene and decision tension | no quantified cohort breakdown provided |
| U2 | Request for brief story-first output | user prompt | depth and structural choices | constrained to concise profile |

### LLM-discovered references
| ID | Resource | Type | Access method | Used for | Reliability notes |
|---|---|---|---|---|---|
| L1 | NN/g onboarding guidance | article | browse/search | confidence/reversibility framing | high-signal UX source |
| L2 | PLG benchmarking summaries | article/report | browse/search | early-return behavior as retention signal | directional, context-dependent |
| L3 | GOV.UK research guidance | docs | browse/search | assumptions/evidence-gap practice | practical evidence discipline |

### Evidence gaps and follow-up questions
| Gap ID | Missing support | Impacted claims/sections | Confidence impact | Follow-up question |
|---|---|---|---|---|
| G1 | Segment-level second-session return data | prioritization confidence | Medium | Which user segments drop after first digest open? |
| G2 | Qualitative interviews on interruption behavior | edge-case prioritization | Medium | What interruption moments most often break continuity? |

### Claim mapping
| Claim ID | Claim summary | Evidence IDs | Confidence | Assumptions |
|---|---|---|---|---|
| C1 | Repeatability confidence is the core activation lever | U1, U2, L1, L2 | Medium | revisit behavior drives early retention |
| C2 | Low-friction next actions outperform broad exploration for this persona | U1, L1, L2 | Medium | first-week attention windows remain short |
| C3 | Continuity safeguards reduce abandonment after interruptions | U1, L1, L3 | Medium | interruption frequency is high for target users |
