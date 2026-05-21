# Strategy Brief: `measure-survey-analysis` (W4)

**Status:** DECISIONS RECORDED - ready for spec reconciliation
**Companion to:** `docs/internal/release-plans/v2.18.0/spec_measure-survey-analysis.md` (that spec is already a near-complete SKILL.md draft; this brief is the layer above it)
**Roadmap source:** R-11 (P1; two-source consensus: Codex backlog + Claude Sonnet backlog; web research confirms PM-domain importance)
**Purpose:** Capture the core bet, the open decisions, and recommendations so direction is locked before execution. Resolved decisions are recorded in each "Your call" slot and flow into the SKILL.md at build time.

---

## The core bet

Statistical humility as a feature. The differentiated value is the skill's willingness to say what the data does NOT show - refusing to overstate significance from weak samples or biased instruments. The signature is the methodology audit plus the explicit "what the data does NOT show" section. This is a skeptical analyst, not a survey summarizer.

## Why it matters / why now

- Survey misinterpretation is rampant (n=47 -> "users want X"); an unguarded LLM will happily produce confident percentages.
- R-11 is a P1 and the only two-source-consensus item in the slate (Codex + Claude Sonnet; web research confirms domain importance but is not a third independent source). It is the lowest-consensus of the four - noted as the swap-candidate if v2.18.0 scope tightens.
- Highest over-confidence risk in the slate (its own spec rates over-confident statistical claims High likelihood / High impact).

## Cross-cutting note (slate-wide)

The slate stance applies; here the fabrication is false statistical precision. The humility ethos pushes every quantitative decision toward "label, do not compute what you cannot compute reliably." **Slate stance DECIDED:** hard refusal on unbounded fabrication, always offer a labeled lower-confidence path.

---

## Open decisions

### D1 - Raw responses or pre-aggregated summaries as input?

- **What it is:** The spec accepts either "the responses themselves" or a summary (question text, counts, distribution, excerpts). These are very different contracts.
- **Why it matters:** It determines portability, context limits, and how much the skill can independently catch.
- **Path A - Summaries / aggregates only:** simple, portable, no data-wrangling. Cost: relies on the user aggregating correctly; cannot catch biases visible only in raw data.
- **Path B - Accept raw rows and aggregate:** more powerful, can cross-tabulate and catch more. Cost: context-limited for large surveys, error-prone parsing, less portable.
- **Recommendation:** Path A as primary.
- **Your call:** Path B confirmed. Raw rows are the primary contract. Spec reconciliation required: define explicit behavior when raw data exceeds context limits - the skill must request a summary or a representative sample rather than silently truncating.

### D2 - Compute real statistics, or qualitative labels + rules of thumb?

- **What it is:** The spec mentions "reasonable confidence interval" and "statistical confidence." How quantitative does it actually get?
- **Why it matters:** LLM arithmetic is error-prone; a wrong confidence interval is worse than none and contradicts the humility ethos.
- **Path A - Qualitative labels + sample-size rules of thumb** (n < 100 = direction only; n < 30 per segment = too small for segment claims): robust, hard to get wrong, no false precision. Rough margin-of-error brackets (e.g., "+/- ~7% at n=200, 95%") are allowed when clearly labeled approximate. No per-question significance testing or regressions.
- **Path B - Compute confidence intervals / margins of error / significance tests:** genuinely rigorous if correct. Cost: error-prone, false-precision risk, drifts into `measure-experiment-design` territory.
- **Recommendation:** Path A.
- **Your call:** Path A (auto-resolved from slate bounded-refuse principle)

### D3 - How much does open-text thematic clustering claim?

- **What it is:** Clustering open-text is an LLM strength but also where it can hallucinate themes, miscount mentions, or invent quotes.
- **Why it matters:** Mention counts and quotes imply a rigor the model may not have, especially when given only a summary.
- **Path A - Full clustering with mention counts:** rich, actionable. Cost: implies counting precision the model may lack; quote-fabrication risk.
- **Path B - Themes + representative quotes, counts labeled "approximate", quotes only from provided excerpts, section skipped entirely if no open-text supplied:** honest about method. Hard rule: never invent a quote; cluster only excerpts actually provided; flag clustering as AI-assisted.
- **Recommendation:** Path B.
- **Your call:** Path B (auto-resolved from slate bounded-refuse principle)

### D4 - How hard is the "NPS is tracking, not diagnostic" stance?

- **What it is:** Refusal protocol #4 refuses to translate a raw NPS number into a feature recommendation. The Brainshelf sample is an NPS survey.
- **Why it matters:** NPS is the single most common survey PMs bring; a stance that feels like a dead end will frustrate users.
- **Path A - Hard stance, minimal NPS help:** principled. Cost: feels unhelpful for the most common input.
- **Path B - Hard stance on the number, but make the NPS path genuinely useful by mining the open-text follow-up for prioritized themes:** keeps "NPS is not diagnostic" while routing the value into the follow-up text so it is a redirect, not a dead end.
- **Recommendation:** Path B.
- **Your call:** Path B (auto-resolved from slate bounded-refuse principle)

---

## Open questions / needs (lighter than full decisions)

- **Q1 - Consensus / priority flag.** R-11 is the lowest-consensus item in the slate (two-source) and P1. Keeping it - quantitative survey analysis is a real catalog gap and the natural quantitative complement to the existing qualitative `discover-interview-synthesis` - but this is the swap-candidate if v2.18.0 scope tightens. The maintainer decision is noted in the parent plan.
- **Q2 - Differentiation from `measure-experiment-results`.** Survey analysis is observational and correlational; experiment results is causal. One crisp line in the composition section covers this; refusal protocol #5 already guards causal misuse.

## Spec reconciliation notes (for execution time)

- **D1 raw-row contract:** The spec leans toward summaries. Reconcile to: raw rows are the primary input contract. Add explicit large-dataset handling: when raw data exceeds context limits, the skill must request a summary or a representative sample - not silently truncate or hallucinate from a partial read. Cross-tabulation capability is a benefit to surface in the SKILL.md as a differentiator over summary-only analysis.
- **D2 statistics depth:** The spec mentions "reasonable confidence interval" - reconcile to qualitative labels + rule-of-thumb brackets only, clearly labeled approximate. Remove any language implying computed significance tests.

## Recommendation summary

1. D1 -> Path B (raw rows as primary contract; explicit large-dataset fallback: request summary or sample)
2. D2 -> Path A (qualitative labels + rules of thumb; rough margin-of-error brackets only, labeled approximate)
3. D3 -> Path B (themes + provided quotes only; counts approximate; section skipped if no open-text)
4. D4 -> Path B (hard on the NPS number; mine open-text follow-up for themes)
5. Slate stance -> never overstate significance; the "what the data does NOT show" section is mandatory
6. Flag: lowest-consensus item in the slate; swap-candidate if scope tightens
