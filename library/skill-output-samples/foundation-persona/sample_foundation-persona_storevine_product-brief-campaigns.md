---
title: "Foundation Persona: Storevine Product Brief Campaigns"
description: "Storevine Campaigns product persona for guided first-send onboarding and merchant activation."
artifact: persona
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.5.0"
created: 2026-03-02
status: sample
thread: storevine
context: Storevine Campaigns product persona for guided first-send onboarding and merchant activation
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Storevine launched Campaigns to general availability, but activation data reveals a sharp drop between merchants who begin campaign setup and those who complete their first send. Of merchants who open the campaign builder, 34% [fictional] start configuring a campaign but only 12% [fictional] reach first send within 14 days. The growth PM needs a brief product persona to anchor sprint prioritization for the guided first-campaign flow and to ground user-story and edge-case decisions around merchant confidence rather than feature breadth.

**Source Notes:**

- Klaviyo S-1 filing documents SMB email marketing adoption barriers, highlighting that setup complexity and deliverability uncertainty are top abandonment drivers for small merchants.
- Shopify partner ecosystem research on merchant tool consolidation shows that solo-operator merchants strongly prefer embedded tools over external integrations when setup cost is comparable.
- Nielsen Norman Group progressive disclosure research supports staged reveal of complexity as a proven pattern for reducing abandonment in multi-step configuration flows.

---

## Prompt

```text
/persona product brief

Build a concise product persona for Storevine Campaigns first-send onboarding.

Context:
- Product: Storevine (B2B ecommerce platform)
- Feature: Campaigns native email builder
- Problem: 34% of merchants begin campaign setup but only 12% complete first send [fictional]
- Prior work: merchant interview synthesis identified setup complexity as top barrier for solo-operator merchants
- Target usage: sprint planning for guided first-campaign flow, user stories, edge cases

Output:
- Brief profile (concise, decision-usable)
- Clear decision posture
- Includes/excludes
- Scenario tailoring for hypothesis, user stories, edge cases
- Assumptions and evidence trail
```

---

## Output

# Persona Dossier: Luisa Moreno, The One-Woman Marketing Department (Product, Brief)

## Layer 1: Narrative Persona Dossier

## Executive summary
- Luisa will try a built-in tool if it promises to save her from juggling another vendor login.
- She abandons setup flows when the next step is unclear or the consequence of a wrong choice is invisible.
- "Professional-looking" matters more than "customizable" because her brand reputation is on the line with every send.
- She measures value in time reclaimed, not in feature count.
- She responds to templates that look finished, not blank canvases that demand design decisions.
- She has been burned by email tools that made sending easy but made deliverability someone else's problem.
- If the first campaign takes more than one session to finish, she assumes the tool is not built for her.

### 1) Opening scene
Luisa has 40 minutes between packing orders and closing the register. She opens the Campaigns builder because her supplier just shipped a new seasonal line and she wants to tell her repeat customers. She picks a template, starts editing, and then reaches a step asking her to configure audience segments. She is not sure which list is which, the preview does not update, and nothing tells her whether the email will actually land in inboxes.

She saves a draft and goes back to orders. The draft sits untouched for eleven days.

### 2) Who this person is when work gets real
Luisa runs a boutique accessories brand on Storevine with roughly 2,400 active customers [fictional]. She handles product sourcing, photography, order fulfillment, and customer communication herself. She is not opposed to marketing tools; she is opposed to marketing tools that require a dedicated learning session before they deliver any value.

### 3) Core tension and decision model
Luisa trades control for momentum. She would rather send a good-enough campaign today than build a perfect one she never finishes. Her threshold for abandonment is one moment of confusion with no visible path forward.

### 4) Decision moments that define behavior
- Decision moment A: if a template looks ready to send with minimal edits, proceed immediately.
- Decision moment B: if a step requires knowledge she does not have (audience segmentation rules, deliverability settings), pause and likely never return.
- Decision moment C: if the preview shows something she would be embarrassed to receive, delete the draft and wait for a better starting point.

### 5) What they say vs what they mean
| What they say | What they mean | Product implication |
|---|---|---|
| "I will set it up this weekend." | Current flow demands more attention than she can give between tasks. | Reduce setup to a single interruptible session. |
| "It looks spammy." | The default template does not match her brand quality standard. | Ship templates that feel finished, not starter kits. |
| "I do not know which list to pick." | Audience options are presented without context or consequence. | Show list size, recency, and expected outcome for each choice. |

### 6) Operating modes
- Normal mode: scans for the fastest path to a finished send.
- Compression mode: picks whatever default requires zero decisions.
- Abandonment mode: closes the builder if any step feels risky or irreversible.

### 7) Product strategy implications
Prioritize:
- pre-populated templates with brand-matched styling
- contextual guidance at each setup step (what happens if I choose this?)
- visible deliverability confidence signals before send

Avoid:
- blank-canvas builders that require design skills
- audience configuration without outcome previews
- success metrics that only appear after the campaign is sent

### 8) Design principles this persona forces
- Make the first campaign completable in one short session.
- Show consequence before commitment at every decision point.
- Treat template polish as a trust signal, not a cosmetic detail.

### 9) If this persona wins, what changes?
Storevine closes the gap between merchants who start campaign setup and those who actually send. First-send completion becomes a function of flow clarity, not marketing sophistication.

---

## Layer 2: Operational Appendix

### A) Request Context
- **Mode:** product
- **Mode alias used:** none
- **Detail profile:** brief
- **Artifact or task context:** Campaigns first-send onboarding and merchant activation
- **Domain context:** B2B ecommerce platform with solo-operator merchant segment

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
- **Includes:** setup behavior, abandonment triggers, confidence signals, template expectations, first-send activation friction
- **Excludes:** enterprise committee buying, paid acquisition channel strategy, multi-seat team onboarding dynamics

### E) Scenario tailoring
- For `hypothesis`: test whether pre-populated templates with contextual guidance increase first-send completion rate within 14 days.
- For `user-stories`: encode single-session completion paths, audience-selection clarity, and preview-before-commit behavior.
- For `edge-cases`: cover zero-subscriber lists, expired audience segments, brand-mismatched templates, and interrupted draft recovery.

### F) When not to use this persona
- Enterprise team onboarding with dedicated marketing staff
- Buying committee and procurement decisions
- Platform-level pricing and packaging strategy

### G) Assumptions and Confidence
- **Key assumptions:**
  - Solo-operator merchants are the primary segment struggling with first-send completion.
  - Template quality is a stronger activation lever than feature breadth for this segment.
  - Abandonment is driven by uncertainty, not by disinterest in email marketing.
- **Confidence:** Medium
- **Confidence rationale:** Consistent with merchant interview findings on setup barriers, but segment-specific first-send funnel data has not been validated with controlled instrumentation.

## Evidence Trail

### User-provided inputs
| ID | Resource | Type | Used for | Notes |
|---|---|---|---|---|
| U1 | Storevine Campaigns activation data and first-send gap | user prompt | opening scene and tension framing | metrics marked `[fictional]` |
| U2 | Merchant interview synthesis on setup complexity | user prompt | decision-moment behavior and abandonment triggers | interview quotes not directly provided |

### LLM-discovered references
| ID | Resource | Type | Access method | Used for | Reliability notes |
|---|---|---|---|---|---|
| L1 | Klaviyo S-1 on SMB email adoption barriers | regulatory filing | browse/search | setup complexity as abandonment driver | strong primary source |
| L2 | Shopify partner research on tool consolidation | industry report | browse/search | merchant preference for embedded tools | directional |
| L3 | NN/g progressive disclosure research | article | browse/search | staged-reveal pattern for complex setup flows | high-signal UX source |

### Evidence gaps and follow-up questions
| Gap ID | Missing support | Impacted claims/sections | Confidence impact | Follow-up question |
|---|---|---|---|---|
| G1 | First-send funnel segmented by merchant size and category | prioritization of template types and guidance depth | Medium | Which merchant segments show the steepest drop-off between builder open and first send? |
| G2 | Draft-recovery behavior and return-to-draft rates | interrupted-session design decisions | Medium | How many merchants return to a saved draft within 7 days? |

### Claim mapping
| Claim ID | Claim summary | Evidence IDs | Confidence | Assumptions |
|---|---|---|---|---|
| C1 | Template readiness is the primary activation lever for solo operators | U1, U2, L1, L2 | Medium | merchant segment distribution is stable |
| C2 | Single-session completion is critical for first-send conversion | U1, U2, L3 | Medium | attention windows remain fragmented for this segment |
| C3 | Consequence visibility reduces abandonment at decision points | U2, L3 | Medium | current builder under-explains audience and deliverability choices |
