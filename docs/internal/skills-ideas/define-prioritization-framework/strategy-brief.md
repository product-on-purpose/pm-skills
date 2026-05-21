# Strategy Brief: `define-prioritization-framework` (W2)

**Status:** DECISIONS RECORDED - ready for spec reconciliation
**Companion to:** `docs/internal/release-plans/v2.18.0/spec_define-prioritization-framework.md` (that spec is already a near-complete SKILL.md draft; this brief is the layer above it)
**Roadmap source:** R-07 (P0; three-source consensus - Codex backlog + Claude Sonnet backlog + 2026-05-14 web research)
**Purpose:** Capture the core bet, the open decisions, and recommendations so direction is locked before execution. Resolved decisions are recorded in each "Your call" slot and flow into the SKILL.md at build time.

---

## The core bet

Not "we know RICE." Everyone knows RICE. The differentiated value is *multi-framework prioritization analysis*: run all applicable frameworks against the same backlog, show the comparison, surface where rankings diverge (and why), and synthesize an executive summary with a recommendation. The signature behavior is the comparison table plus the recommendation rationale - not a single-framework output. Evidence traceability and confidence labels are present throughout.

## Why it matters / why now

- Prioritization is a near-daily PM activity and the most common place teams cargo-cult a framework without fitting it to context.
- R-07 is a P0 with three-source consensus.
- Running multiple frameworks and showing divergence teaches method-sensitivity and surfaces hidden assumptions - a single-framework output cannot do this.
- The comparison between frameworks is often the most valuable finding: item 5 jumping to first under ICE reveals that confidence scores are doing most of the work in this backlog.

## Cross-cutting note (slate-wide)

The slate stance applies: hard refusal on the fabrication that matters here (invented scores), but always offer a path forward (switch frameworks, or produce an estimation scaffold) so the user is redirected, never simply blocked. **Slate stance DECIDED:** hard refusal on unbounded fabrication, always offer a labeled lower-confidence path.

---

## Open decisions

### D1 - One framework per run, or multi-framework comparison?

- **What it is:** The spec says "choose ONE framework." But running the same backlog through multiple frameworks reveals where rankings agree and disagree, which is often the most valuable insight.
- **Why it matters:** It changes whether the skill is a framework executor or a prioritization analyst. The comparison surfaces ranking instability and teaches method-sensitivity.
- **Path A - One per run (spec default):** clean, focused, decisive output. Cost: misses the ranking-divergence signal entirely.
- **Path B - Optional comparison mode:** opt-in second framework to show divergence. Cost: still single-framework by default; comparison is a bonus, not the primary value.
- **Path C - Multi-framework parallel run (decided):** run all applicable frameworks against the backlog, present a comparison table, and deliver an executive summary with a recommendation. Evidence traceability and confidence labels throughout. Applicable frameworks depend on available data (Kano gated on research; RICE gated on numeric inputs).
- **Recommendation:** Path C.
- **Your call:** Path C - multi-framework parallel run, comparison table, executive summary with recommendation. Evidence traceability and confidence labels always present.

### D2 - Does the skill compute scores, facilitate estimation, or both?

- **What it is:** RICE/ICE need numeric inputs. If the user lacks them, the skill must refuse, help estimate, or invent.
- **Why it matters:** This is the line between honest tool and fabrication engine, and it pressures the spec's "single-turn lifetime" identity.
- **Path A - Refuse without inputs:** no fabricated scores. Cost: unhelpful to a user who wants estimation help.
- **Path B - Interactive elicitation:** walk the user through estimating each input. Cost: becomes multi-turn, conflicts with the single-turn identity.
- **Path C - Output an estimation scaffold:** in one turn, if inputs are missing, return a structured worksheet ("here is how to estimate reach/impact/confidence/effort for each item") instead of fake scores. Stays single-turn, stays honest, still helpful.
- **Recommendation:** Path C.
- **Your call:** Path C (auto-resolved from slate bounded-refuse principle)

### D3 - Who owns the Weighted Scoring criteria and weights?

- **What it is:** Weighted Scoring needs criteria + weights that encode stakeholder values. If the skill invents them, it smuggles in value judgments.
- **Why it matters:** Weights are where org politics and strategy live; a skill inventing them silently is a credibility risk.
- **Path A - Require user-supplied criteria + weights:** honest, trade-offs owned by the team. Cost: higher input burden.
- **Path B - Propose a default criteria set (business value, customer value, effort, risk, strategic fit) at equal weights, user adjusts:** lower friction, gives a starting point. Loudly labeled: "equal weights is itself a choice; adjust to reflect what your org actually values." Makes weight-setting a conscious act.
- **Recommendation:** Path B.
- **Your call:** Path B confirmed

### D4 - Is Kano gated behind a research-input requirement?

- **What it is:** Kano categories (Must-have / Performance / Delighter) are only defensible with customer research. Without it, users will guess categories and produce fake Kano analyses.
- **Why it matters:** Kano is the most fabrication-prone of the five frameworks; ungated, it invites exactly the anti-pattern the slate exists to prevent.
- **Path A - Kano first-class, equal billing:** completeness. Cost: predictable misuse (guessed categories).
- **Path B - Kano gated:** if no customer-research input, the skill refuses Kano and redirects to a framework that fits the available data. Prevents fake-Kano; consistent with the slate refusal stance.
- **Recommendation:** Path B.
- **Your call:** Path B (auto-resolved from slate bounded-refuse principle)

---

## Open questions / needs (lighter than full decisions)

- **Q1 - Forward references to unshipped skills.** The composition section points to `deliver-roadmap` "when shipped" (not yet in catalog). Recommendation: keep the signpost but mark "(planned)" so it does not read as available or trip the link-validity validator.
- **Q2 - Default framework when context is ambiguous.** In the multi-framework model, if certain frameworks cannot run due to missing inputs, the skill should still present what it can run and note which frameworks were excluded and why. ICE remains the lowest-data-requirement option.

## Spec reconciliation notes (for execution time)

The spec draft treats the skill as "select one framework and apply it." **This must be reconciled before execution.** The decided identity is multi-framework parallel analysis with a comparison table and executive summary. Spec sections affected: the framework-selection logic (becomes framework-applicability filtering, not selection), the output structure (needs a comparison table + synthesis section), and all worked examples (should demonstrate the multi-framework approach). Kano and RICE gates remain; they exclude inapplicable frameworks from the run rather than blocking the whole skill.

## Recommendation summary

1. D1 -> Path C (multi-framework parallel run; comparison table; executive summary with recommendation; evidence traceability + confidence labels throughout)
2. D2 -> Path C (estimation scaffold when inputs missing; hard line on fabricated scores)
3. D3 -> Path B (proposed default criteria, equal weights, loudly labeled as a conscious choice)
4. D4 -> Path B (Kano gated on research input; excluded from run if no research provided)
5. Slate stance -> hard refusal on unbounded fabrication, always offer a labeled lower-confidence path
6. Identity reframe -> multi-framework analysis with synthesis, not single-framework execution
