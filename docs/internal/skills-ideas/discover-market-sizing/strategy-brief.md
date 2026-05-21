# Strategy Brief: `discover-market-sizing` (W1)

**Status:** DECISIONS RECORDED - ready for spec reconciliation
**Companion to:** `docs/internal/release-plans/v2.18.0/spec_discover-market-sizing.md` (that spec is already a near-complete SKILL.md draft; this brief is the layer above it)
**Roadmap source:** R-06 (P0; three-source consensus - Codex backlog + Claude Sonnet backlog + 2026-05-14 web research)
**Purpose:** Capture the core bet, the open decisions, and recommendations so direction is locked before execution. Resolved decisions are recorded in each "Your call" slot and flow into the SKILL.md at build time.

---

## The core bet

Market sizing as *multi-framework meta-analysis*, not single-method number-generation. The differentiated value is running multiple sizing approaches (top-down, bottom-up, comparable company/analogous market, etc.), synthesizing where they converge, and surfacing where they diverge as the finding. Every dollar must trace to (a) a cited source, (b) an explicit assumption with reasoning, or (c) a sensitivity range that shows the bounds. The skill refuses to emit a confident single number when the inputs do not support one.

**Scope:** External market opportunity only. This skill is about the size of the market a product competes in, not internal-tool investment cases.

## Why it matters / why now

- TAM/SAM/SOM is one of the most-requested PM artifacts and one of the most-abused (TAM theater in pitch decks).
- R-06 is a P0 with three-source consensus, so the demand signal is strong.
- LLMs are especially prone to confident market-number fabrication, which makes a guardrailed sizing skill both higher-value and higher-risk than the average phase skill.
- Running multiple frameworks and triangulating is more defensible than a single-method output - and the divergence between methods is often the most valuable finding.

## Cross-cutting note (applies to all four v2.18.0 skills)

All four skills in this slate share one spine: honest analysis under uncertainty, enforced by a refusal protocol + confidence labels + a "what this does NOT show" section. **Slate stance DECIDED:** hard refusal on unbounded fabrication, but always offer a labeled lower-confidence path so the user is redirected, never simply blocked.

---

## Open decisions

### D1 - Does the skill fetch its own market data, or only analyze what it is given?

- **What it is:** The spec lists WebFetch/WebSearch as available tools and says the skill "may use web search to verify or supplement source data," while also forbidding inventing sources. That tension about the skill's fundamental shape is unresolved.
- **Why it matters:** It sets the skill's boundary, its portability across host tools, its determinism, and its overlap with existing research skills.
- **Path A - Analysis-only (no fetch):** Sizes strictly from user-provided inputs and assumptions. Expected outcome: portable to every host (no WebSearch dependency), deterministic, clean boundary against `discover-research-plan`. Cost: a user who arrives with no data hits a refusal and must go gather inputs first.
- **Path B - Fetch-enabled (active sourcing):** The skill searches for market figures itself. Expected outcome: more "one-shot" useful for an empty-handed user. Cost: inherits web-sourced-figure quality problems (paywalled analyst reports, blogspam numbers), becomes non-deterministic, breaks on hosts without WebSearch, and overlaps `discover-research-plan` + `discover-competitive-analysis`.
- **Path C - Analysis-first, fetch-optional + source-calibrated confidence:** Default to analysis from provided inputs; if WebSearch exists and the user opts in (or the skill recommends it), fetch is allowed. Confidence on fetched figures is calibrated to source quality: primary sources (government data, established industry bodies) can reach Medium or High; secondary aggregators and blog-cited numbers are Low. After evaluating what the user has provided, the skill recommends whether fetching more data would materially improve the output and suggests a strong approach before proceeding.
- **Recommendation:** Path C.
- **Your call:** Path C approved (with source-calibrated confidence and proactive fetch recommendation as noted above)

### D2 - Is "internal-opportunity sizing" a first-class mode or a sample stretch?

- **What it is:** The Workbench sample invents an "Internal TAM/SAM/SOM" (engineer-time-saved x headcount x fully-loaded cost) to size internal tools that have no external revenue. That is a genuine conceptual extension beyond textbook market sizing.
- **Why it matters:** Internal-tools PMs are a real audience, but including internal sizing risks diluting the skill's identity and scope.
- **Path A - Promote to first-class:** Document "internal investment sizing" as a named method alongside top-down and bottom-up. Cost: more surface to maintain; slight risk of diluting the "market sizing" identity.
- **Path B - Keep external-only:** Drop internal sizing from the skill; re-thread the Workbench sample to an external-market scenario. Expected outcome: tighter identity, correct scope - market sizing is about the external opportunity a product competes in.
- **Recommendation:** Path B.
- **Your call:** Path B confirmed. Workbench sample must be re-threaded to an external-market scenario at execution time.

### D3 - How hard is the source-citation bar for casual use?

- **What it is:** The spec demands source name, year, and page number for external figures. The spec risk table rates "citation expectation too high for casual users" as Low/Low.
- **Why it matters:** The "rough TAM for a board slide" use case is extremely common; if the skill refuses or nags too aggressively, adoption suffers and users route around it.
- **Path A - One rigorous mode, hard line:** Always demand full citations or an explicit assumption. Expected outcome: maximum credibility, every artifact defensible. Cost: friction for quick sizing; some users bounce.
- **Path B - Two modes (quick vs. rigorous):** A "quick estimate" mode that still refuses unbounded guesses but accepts rough assumptions with wide sensitivity bands and Low-confidence labels, plus a "rigorous" mode that demands full citations.
- **Recommendation:** Path B.
- **Your call:** Path B (auto-resolved from slate bounded-refuse principle)

### D4 - What do the worked examples model: rigor under good data, or rigor under bad data?

- **What it is:** A choice about the pedagogical stance of EXAMPLE.md and the three thread samples.
- **Why it matters:** The examples teach the skill's soul. The hardest, most valuable PM skill is sizing honestly when data is thin, which is the common real situation.
- **Path A - Clean data:** Examples show tidy sizing with good sources. Cost: teaches the easy case and models false confidence.
- **Path B - Realistic thin data:** At least one example models "I do not have a solid source here, so here is a labeled assumption with a wide sensitivity band, and here is the research that would tighten it." The other samples can show better-data cases for contrast.
- **Recommendation:** Path B for EXAMPLE.md and at least one sample.
- **Your call:** Path B (auto-resolved from slate bounded-refuse principle)

---

## Open questions / needs (lighter than full decisions)

- **Q1 - One-line differentiation from neighbors.** Sizing brushes against `develop-product-vision` (quantitative anchor), `discover-competitive-analysis` (market structure), and `discover-research-plan` (gathering inputs). The SKILL.md "Cross-skill composition" section needs one crisp sentence. Proposed: "Vision says why it matters, competitive analysis says who else is there, research-plan gathers the inputs, market-sizing bounds the dollars."
- **Q2 - Determinism expectation.** Should we state that identical inputs + assumptions reproduce the same sizing across invocations? Recommendation: yes - variance should enter only through the sensitivity section, not through run-to-run drift.

## Spec reconciliation notes (for execution time)

The spec draft treats the skill as "select one method (top-down OR bottom-up) and apply it." **This must be reconciled before execution.** The decided identity is multi-framework meta-analysis: the skill runs multiple approaches in parallel, synthesizes convergence, and surfaces divergence as signal. Spec sections affected: the method selection logic, the output structure (needs a synthesis/triangulation section), and the Workbench sample (needs re-threading to external market).

## Recommendation summary

1. D1 -> Path C (analysis-first, fetch-optional; source-calibrated confidence; proactive fetch recommendation)
2. D2 -> Path B (external only; Workbench sample re-threaded to external scenario)
3. D3 -> Path B (quick + rigorous modes)
4. D4 -> Path B (examples model rigor under thin data)
5. Slate stance -> hard refusal on unbounded fabrication, always offer a labeled lower-confidence path
6. Identity reframe -> multi-framework meta-analysis, not single-method selection
