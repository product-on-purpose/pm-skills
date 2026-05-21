# Strategy Brief: `discover-journey-map` (W3)

**Status:** DECISIONS RECORDED - ready for spec reconciliation
**Companion to:** `docs/internal/release-plans/v2.18.0/spec_discover-journey-map.md` (that spec is already a near-complete SKILL.md draft; this brief is the layer above it)
**Roadmap source:** R-10 (P1; three-source consensus - Codex backlog + Claude Sonnet backlog + 2026-05-14 web research)
**Purpose:** Capture the core bet, the open decisions, and recommendations so direction is locked before execution. Resolved decisions are recorded in each "Your call" slot and flow into the SKILL.md at build time.

---

## The core bet

A journey map is a *synthesis* artifact, not a brainstorm. The differentiated value is grounding every stage, emotion, and pain point in research evidence and refusing to fabricate the emotional curve. The signature is the emotional curve with per-entry confidence labels and sources. This is evidence-grounded journey synthesis, not "imagine how the user feels."

**Scope:** User-facing experiential artifacts - journey maps, user flows, and funnels viewed as user experience lenses. Service blueprints and operational/architectural diagrams are out of scope. The disambiguation line is user experience vs. service architecture, not journey vs. funnel.

## Why it matters / why now

- Journey maps are a service-design staple; the common failure is teams inventing the emotional curve from imagination.
- R-10 is a P1 with three-source consensus.
- An LLM is dangerously fluent at plausible-but-fabricated emotional narratives, so this skill is simultaneously the highest-value and the highest fabrication risk in the slate (its own spec rates emotional-data fabrication High likelihood / High impact, the only High/High in the four skills).

## Cross-cutting note (slate-wide)

The slate stance applies and applies hardest here: the fabrication temptation is strongest for emotional and behavioral data. The make-or-break design choice (D1) is how the skill behaves with no research in hand. **Slate stance DECIDED:** hard refusal on unbounded fabrication, always offer a labeled lower-confidence path.

---

## Open decisions

### D1 - How does the skill behave when the user has NO research data? (the make-or-break decision)

- **What it is:** The overwhelmingly common case - a user wants a journey map but has no interview, survey, or analytics data.
- **Why it matters:** This single behavior determines whether the skill is honest-but-unused or useful-and-honest. It is the highest-stakes decision in the entire slate.
- **Path A - Hard refuse without research:** prevents fabrication. Cost: refuses the most common request, kills adoption, and pushes users to a generic LLM that will happily fabricate (a worse outcome than a labeled hypothesis).
- **Path B - Hypothesis mode:** produce the map but label every emotion and pain entry "Hypothesis (Confidence: Low)", front-load a banner that this is a to-be-validated hypothesis map, and end with a concrete validation plan. A legitimately useful thinking tool that doubles as a research prompt, while staying honest. Guardrail: labeling discipline must be structural (built into the TEMPLATE), not optional.
- **Recommendation:** Path B.
- **Your call:** Path B (auto-resolved from slate bounded-refuse principle)

### D2 - How central and how robust is the mermaid visual?

- **What it is:** The spec offers an optional mermaid timeline / flowchart.
- **Why it matters:** Journey maps are inherently visual, but mermaid is brittle for complex journeys and this repo has a real mermaid-rendering-failure history.
- **Path A - Optional add-on:** markdown tables always valid; mermaid is a bonus - a master diagram covering the full journey plus sectional diagrams per stage when feasible. Default-on for linear journeys, simplified or omitted for multi-actor where mermaid breaks down. Reuses the existing `utility-mermaid-diagrams` contract.
- **Path B - Core deliverable, always attempt mermaid:** more journey-map-like. Cost: brittle for multi-actor journeys; broken diagrams undermine the artifact.
- **Recommendation:** Path A.
- **Your call:** Path A confirmed. Mermaid strategy: master diagram (full journey overview) + sectional diagrams per stage/phase when feasible. Markdown tables remain the always-valid fallback. Multi-actor: simplified or omitted.

### D3 - How much artifact-disambiguation burden does this skill carry?

- **What it is:** Users conflate journey map, user flow, service blueprint, and funnel. The skill needs a clear scope statement.
- **Why it matters:** Too little disambiguation produces wrong artifacts; too much preamble bloats the skill.
- **Path A - Own user-experience artifacts; redirect service architecture:** the skill covers journey maps, user flows, and funnels as user-experience lenses. Service blueprints and operational diagrams are out of scope - redirect those. Add one short "this vs. that" paragraph in the intro clarifying the line. Refusal protocols handle edge cases.
- **Path B - Add a "which artifact do you want?" decision aid at the top:** helps confused users self-route. Cost: preamble, slight scope creep.
- **Recommendation:** Path A.
- **Your call:** Path A confirmed. Scope is user experience artifacts (journey/flow/funnel as UX lens). The disambiguation line is UX vs. service architecture, not journey vs. funnel. One disambiguation paragraph in the intro; no decision aid.

### D4 - Linear / cyclical / multi-actor: all first-class, or tiered?

- **What it is:** The spec documents three patterns; multi-actor is flagged "use sparingly; complex to maintain."
- **Why it matters:** Multi-actor journeys are genuinely hard to produce and render well; equal billing risks low-quality output.
- **Path A - All three equal billing:** complete. Cost: multi-actor quality risk.
- **Path B - Linear (default) + cyclical first-class; multi-actor "advanced" with a complexity warning and simplified output (parallel tables, no mermaid):** matches what is producible well. The Storevine sample is multi-actor so it must work, but it should be tiered honestly.
- **Recommendation:** Path B.
- **Your call:** Path B confirmed

---

## Open questions / needs (lighter than full decisions)

- **Q1 - Persona dependency.** Journey requires a persona. Recommendation: accept an inline persona summary; if neither a persona artifact nor a summary exists, refuse per protocol #1. Do NOT auto-generate a persona - that smuggles in unvalidated assumptions and overlaps `foundation-persona`.
- **Q2 - Emotional vocabulary.** The spec wants specific emotions (frustration, anxiety, hope), not happy/sad. Recommendation: ship a small bounded emotion vocabulary in the TEMPLATE so outputs are consistent and not arbitrarily florid.

## Spec reconciliation notes (for execution time)

- **D2 mermaid strategy:** The spec currently describes mermaid as "optional." Reconcile to: attempt a master diagram + sectional diagrams when feasible; markdown tables are the always-valid fallback. Multi-actor gets simplified or no mermaid.
- **D3 scope:** The spec's refusal protocol #3 separates journey from funnel as redirect. Reconcile to: funnel-as-user-experience-lens is IN scope; service blueprints and operational diagrams are OUT. Update the disambiguation section and refusal protocols accordingly.
- **D4 tiering:** Confirm multi-actor is labeled "advanced" with a complexity warning in the spec's pattern section.

## Recommendation summary

1. D1 -> Path B (hypothesis mode with structural labeling + validation plan)
2. D2 -> Path A (master + sectional mermaid when feasible; markdown always valid; multi-actor simplified/omitted)
3. D3 -> Path A (own UX artifacts - journey/flow/funnel; redirect service architecture; one disambiguation paragraph)
4. D4 -> Path B (linear + cyclical first-class; multi-actor tiered as advanced)
5. Slate stance -> hypothesis entries always labeled and visually distinct; never present a hypothesis as evidence
