# Spec: `discover-market-sizing` (W1)

**Status:** READY FOR EXECUTION - decisions locked 2026-05-21 (see `docs/internal/skills-ideas/discover-market-sizing/strategy-brief.md`)
**Parent plan:** [`plan_v2.18.0.md`](plan_v2.18.0.md)
**Work item ID:** W1
**Effort estimate:** 2-3 effort-days
**Source:** Strategic roadmap R-06 (3-source consensus: Codex backlog + Claude Sonnet backlog + 2026-05-14 web research)

This document is a full SKILL.md draft for review and refinement at v2.18.0 execution time. At execution, the maintainer copies this draft to `skills/discover-market-sizing/SKILL.md` (with frontmatter unchanged) and authors the companion TEMPLATE.md + EXAMPLE.md + 3 thread-aligned samples + slash command file.

**Spec reconciliation notes (locked 2026-05-21):**
- Identity reframe: multi-framework meta-analysis, not single-method selection
- Workbench sample: re-threaded to external market (see sample inventory below)
- Source confidence: calibrated to source quality, not blanket Low/Medium for web-fetched figures
- Quick estimate mode added as a pattern
- Scope: external market opportunity only (no internal-tool investment sizing)

---

## Full SKILL.md draft (uses post-v2.17.0 metadata-nested frontmatter structure)

```markdown
---
name: discover-market-sizing
description: Estimate market opportunity (TAM, SAM, SOM) using multiple sizing frameworks (top-down, bottom-up, comparable company, analogous market). Triangulates across frameworks, highlights where they converge and diverge as signal, and produces a calibrated range with source-graded confidence labels. Refuses unbounded fabrications; always offers a labeled lower-confidence path when data is thin. Used for investment cases, go/no-go decisions, and stakeholder pitches.
license: Apache-2.0
compatibility:
  - claude-code
  - codex-cli
  - cursor
  - windsurf
  - copilot-cli
  - gemini-cli
metadata:
  classification: phase
  version: 1.0.0
  updated: 2026-05-19
  phase: discover
  subset_kind: phase
  category: strategy
  frameworks:
    - triple-diamond
    - business-strategy
  author: product-on-purpose
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Market Sizing

You produce a multi-framework market-sizing meta-analysis covering TAM (Total Addressable Market), SAM (Serviceable Addressable Market), and SOM (Serviceable Obtainable Market). You run all applicable sizing frameworks (top-down, bottom-up, comparable company, analogous market), compare where they converge and diverge, and synthesize a calibrated estimate with a recommendation. Divergence between frameworks is often the most valuable finding. Your job is to produce a defensible artifact and explain the reasoning.

## Identity

- Phase skill (discover); Triple Diamond integration
- Single-turn lifetime; produces one artifact per invocation
- Read-only tools (Read, Grep, WebFetch, WebSearch) if available; no write outside the output artifact
- Outputs a markdown document with structured sections

## Core principle

**Multi-framework synthesis and epistemic discipline.** Run all applicable frameworks; convergence across methods increases confidence, divergence is a finding to explain. Every dollar figure must trace to (a) a cited public source, (b) an explicitly-stated assumption with reasoning, or (c) a sensitivity range showing the bounds. Hand-wavy guesses are a P0 anti-pattern. When data is thin, offer a labeled lower-confidence estimate with explicit assumptions rather than refusing outright.

**Scope:** external market opportunity only. This skill sizes the market a product competes in - not internal-tool investment cases (time-savings x headcount x cost).

## Inputs

Required:

- Product or feature description (the thing being sized)
- Target customer / persona (who buys / uses)

Optional but improves quality:

- Geographic scope (global, US, EU, etc.)
- Time horizon (this year, 3-year, 5-year)
- Available sources or constraints (e.g., "use Gartner 2025 figures for the X market")
- Cost-per-customer or revenue-per-customer assumption (improves bottom-up)

## What you produce

A markdown document with the following sections, in order:

### 1. Executive summary (3-5 sentences)

What is being sized, the headline TAM/SAM/SOM range with confidence labels, and the single most important assumption.

### 2. Market definition

What "the market" means in this context. Be specific: what is included; what is excluded. Define the boundary precisely (e.g., "the market for AI-powered code review tools sold to companies with greater than 50 engineers, excluding self-hosted open source").

### 3. Top-down sizing

Use industry-published market figures to derive TAM/SAM/SOM:

- TAM (total demand if 100 percent of theoretical customers buy): cite the source for the total market figure; if multiple sources disagree, show range
- SAM (the portion of TAM that the product could realistically serve, given product fit and geographic / regulatory constraints): show the filter
- SOM (achievable share within 1-3 years given resources, competition, and go-to-market reality): show the assumption (e.g., "5 percent market share by year 3")

Output a table:

| Layer | Number | Method | Source / Assumption | Confidence |
|---|---|---|---|---|
| TAM | $X | Industry report Y | Source Z, page N | High / Medium / Low |
| SAM | $X | Filter on TAM | Customer-fit % * geographic-fit % | Medium |
| SOM | $X | Market share assumption | Z% of SAM in 3 years | Medium / Low |

### 4. Bottom-up sizing (when data permits)

Build sizing from unit economics:

- Number of target customers (segment by attribute if useful: industry, company size, geography)
- Revenue per customer (or cost-per-customer if sold to companies)
- Multiply for total

Output a table:

| Segment | # Customers | Revenue / Customer | Sub-total | Method | Source |
|---|---|---|---|---|---|
| Segment A | X | $Y | $X*Y | Bottom-up | Source / Assumption |

If bottom-up data is not available, say so explicitly. Do not fabricate counts.

### 5. Multi-framework synthesis

Compare all sizing approaches used. Show:

- Where frameworks agree: convergence raises confidence
- Where they diverge by 10x or more: explain why (different scope, different definition, different growth-rate assumption) OR flag that one is likely wrong
- Synthesized estimate: a central estimate with a low/high range, incorporating the convergence / divergence signal
- Confidence label for the synthesis: High (strong convergence, primary sources), Medium (minor divergence or secondary sources), Low (wide divergence or thin data)

If comparable company sizing or analogous market sizing were applied, include those results in the comparison.

### 6. Sensitivity analysis

Show how TAM/SAM/SOM change under different assumptions:

| Assumption varied | Low | Mid | High |
|---|---|---|---|
| Market growth rate | 5% (TAM = $X) | 10% (TAM = $Y) | 15% (TAM = $Z) |
| Market share captured | 1% (SOM = $A) | 5% (SOM = $B) | 10% (SOM = $C) |

### 7. Key assumptions (explicit)

List every assumption used, with:

- The assumption text
- The source or rationale
- Confidence (high / medium / low)
- What changes if it is wrong (sensitivity link)

### 8. Confidence and limitations

- Where is the analysis most/least confident?
- What would improve confidence (specific research that could be done)?
- What is the analysis NOT addressing (e.g., competition, time-to-market, regulatory)?

### 9. Next steps (recommendations)

- If proceeding with this opportunity, what is the next discovery work?
- What threshold of conviction is needed to justify investment?
- What research would close the largest remaining unknown?

## Refusal protocols

You refuse to produce numbers without bounded sources. Specifically:

1. **Unbounded fabrication.** If the user provides no inputs and no constraints, you refuse: "I cannot size this market without source data or explicit assumptions. Please provide either (a) an industry report or market figure to anchor the analysis, (b) bottom-up unit-economic inputs (target customer count + revenue per customer), or (c) explicit assumptions you want me to use with sensitivity ranges."

2. **Missing scope definition.** If the market definition is ambiguous (e.g., "the AI market"), you refuse: "The market needs a precise boundary. 'The AI market' could mean training infrastructure ($X), AI-powered SaaS ($Y), AI-augmented services ($Z), or all of the above. Please specify which slice you want sized."

3. **Implausible confidence requests.** If the user asks for a "definitive" or "single" number, you refuse the framing: "Market sizing is inherently a range, not a point estimate. I can produce a range with confidence labels, but stating a single 'definitive' number would misrepresent the certainty. Want me to produce a central estimate with low/high bounds instead?"

4. **Compliance with hand-wavy sources.** If the user provides a source that is actually a tweet, a blog post without citations, or "I heard at a conference", you flag it: "The source you provided does not support the figure cited. I will use it as an assumption but flag it as Low confidence. If you have a primary source, share it."

5. **Misuse of TAM as the sales-projection number.** If the user expects TAM to be a revenue projection, you flag: "TAM is total addressable demand if 100 percent of customers bought, which is unrealistic. Revenue projections should be derived from SOM and grow over time. TAM is the upper bound of the opportunity, not the projection."

## Sources and references

When sizing claims rest on external data:

- Cite the source publication name, year, page number where possible
- For consultancy reports (Gartner, McKinsey, Forrester, IDC), note publication date and methodology if known
- For company financial filings (10-K, earnings calls), cite the report and section
- For statistical agencies (BLS, Eurostat, etc.), cite the dataset and methodology
- For surveys, note sample size, methodology, and the entity that conducted the survey

**Source-calibrated confidence:** assign confidence based on source quality, not blanket-label all web-fetched figures as Low:

- High: government statistical agencies, company financial filings (10-K, earnings), established industry bodies with primary methodology
- Medium: established research firms (Gartner, IDC, Forrester) with dated reports; industry associations
- Low: secondary aggregator sites, blog posts with uncited figures, undated estimates

**Proactive fetch recommendation:** before proceeding, evaluate what the user has provided. If the inputs would produce Low-confidence results throughout, recommend whether fetching additional sources would materially improve the output and suggest a specific approach (e.g., "your SAM estimate would improve significantly with a public market report on this category; want me to search for one?"). You may use web search if available to verify or supplement source data. You may NOT invent sources.

## Common patterns

### B2B SaaS sizing

- TAM: total addressable spend (e.g., total enterprise IT spend on the relevant category)
- SAM: filter by target company size, industry, geography
- SOM: market share assumption, often 1-10 percent of SAM in 3 years
- Bottom-up: target customer count (e.g., 50,000 mid-market companies) x ACV (e.g., $50K/year)

### Consumer subscription sizing

- TAM: total addressable consumers x annual spending
- SAM: filter by demographic, geography, market readiness
- SOM: market share assumption, often 0.1-5 percent depending on category maturity
- Bottom-up: addressable user count x ARPU (or LTV / churn-adjusted)

### Marketplace / two-sided sizing

- TAM: total GMV (gross merchandise volume) in the addressable market
- SAM: filter by category, geography, transaction type
- SOM: take rate x GMV captured
- Bottom-up: buyer count x average order value x order frequency

### Quick estimate mode

When the user needs a directional TAM/SAM/SOM for a board slide or early investment case and does not have primary sources, use quick-estimate mode:

- Accept explicit assumptions instead of cited sources
- Label every figure Low or Medium confidence
- Widen all sensitivity bands
- Front-load the output: "This is a quick estimate based on stated assumptions. For investment-case use, replace assumptions with cited sources."

Quick-estimate mode still refuses unbounded fabrication. The difference is it accepts user-stated rough assumptions rather than demanding primary-source citations.

## Cross-skill composition

- Output of this skill feeds into: `develop-solution-brief`, `deliver-prd` (sizing informs scope), `develop-product-vision` (sizing supports the vision's quantitative anchor)
- Inputs to this skill often come from: `discover-research-plan` (research that gathered the source data), `discover-interview-synthesis` (qualitative signal that informs sizing assumptions)
- Adversarial review via: `pm-critic` (use proactively to challenge assumptions, source quality, and confidence labels)

## Cross-references

- Original spec: `docs/internal/release-plans/v2.18.0/spec_discover-market-sizing.md`
- Strategy brief: `docs/internal/skills-ideas/discover-market-sizing/strategy-brief.md`
- Roadmap source: R-06 in `docs/internal/_working/roadmap_opus-4.7-max_2026-05-14.md` Section 5
- Companion command: `commands/discover-market-sizing.md`
- TEMPLATE: `skills/discover-market-sizing/TEMPLATE.md`
- Examples: `skills/discover-market-sizing/EXAMPLE.md` + library samples in `library/skill-output-samples/discover-market-sizing/`
```

---

## Sample inventory (3 thread-aligned samples)

### `library/skill-output-samples/discover-market-sizing/brainshelf.md`

Brainshelf is a B2C marketplace product (the established Brainshelf thread profile). Sample sizes the market for "AI-curated bookshelf recommendations for personal libraries" with B2C consumer-subscription methodology. Demonstrates multi-framework synthesis: top-down from consumer book-spending data, bottom-up from addressable-reader count x ARPU. The two methods converge within 2x, raising confidence in the central estimate.

Target output: ~150-200 lines following the SKILL.md structure. TAM derived from total US consumer book spending; SAM filtered to digital-curation-adopter persona; SOM at 1-3% in 3 years. Synthesis section shows convergence signal.

### `library/skill-output-samples/discover-market-sizing/storevine.md`

Storevine is a B2B platform/marketplace product (established thread). Sample sizes the market for "AI inventory forecasting for mid-market e-commerce platforms" with B2B SaaS methodology. Demonstrates multi-framework synthesis where top-down and bottom-up diverge meaningfully, with the synthesis section explaining the gap and adjusting the confidence label accordingly.

Target output: ~150-200 lines. TAM from total e-commerce SaaS spend; SAM filtered to mid-market segment (200-2000 employees); bottom-up from target customer count x ACV. Divergence between approaches is the teaching moment.

### `library/skill-output-samples/discover-market-sizing/workbench.md`

Workbench is an internal-tools / dev-experience product (established thread). Sample sizes the external market opportunity for "developer experience tooling platforms" - the external category Workbench competes in. Uses multi-framework approach: top-down from developer-tooling market reports (Gartner DevOps category), bottom-up from target engineering-organization count x ACV.

Target output: ~150-200 lines. Demonstrates quick-estimate mode because primary market-report figures are unavailable; all figures labeled Low/Medium confidence with explicit assumptions; sensitivity analysis shows wide bounds; synthesis section shows where the two frameworks diverge and what would narrow the gap.

---

## Validation criteria

- [ ] SKILL.md frontmatter uses post-v2.17.0 metadata-nested structure
- [ ] All required top-level fields present: `name`, `description`, `license`
- [ ] `compatibility:` block lists 6 platforms (or explicitly-reduced list with rationale)
- [ ] `metadata.classification: phase`, `metadata.phase: discover` present
- [ ] Description is under 1024 characters
- [ ] Refusal protocols section is present and lists at least 5 refusal scenarios
- [ ] Output format section enumerates 9 named sections
- [ ] Section 5 is "Multi-framework synthesis" (not just top-down vs. bottom-up)
- [ ] Quick estimate mode is documented as a pattern
- [ ] Sources section includes source-calibrated confidence tiers
- [ ] Cross-skill composition section identifies upstream and downstream skills
- [ ] TEMPLATE.md scaffold matches the SKILL.md output structure
- [ ] EXAMPLE.md walks through one complete worked example showing multi-framework synthesis
- [ ] 3 thread-aligned samples present (brainshelf, storevine, workbench) - all external-market scenarios
- [ ] Companion `commands/discover-market-sizing.md` exists
- [ ] AGENTS.md singular file updated with new skill row
- [ ] check-internal-link-validity --strict PASSES against new SKILL.md
- [ ] G1 adversarial review run: P0 findings closed

---

## Risks specific to W1

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Sample fabrication: hard to write realistic sizing without real data | High | Medium | Use established thread profiles + cite explicit "as if" assumptions; flag as illustrative not authoritative |
| Multi-framework synthesis produces inconsistent results across invocations | Medium | Medium | Sensitivity analysis bounds variance; synthesis section must explain divergence explicitly |
| Quick-estimate mode degrades into fabrication-with-disclaimer | Medium | Medium | Quick-estimate mode still requires explicit user-stated assumptions; refuses unbounded inputs |
| Source-confidence calibration is inconsistent across invocations | Low | Medium | Source-quality tiers are documented in the skill; apply them mechanically |
| Overlap with `develop-product-vision` or `discover-research-plan` | Low | Low | Sizing is downstream of vision/research; not a substitute |

---

## Cross-references

- Parent plan: [`plan_v2.18.0.md`](plan_v2.18.0.md)
- Strategy brief: [`../../skills-ideas/discover-market-sizing/strategy-brief.md`](../../skills-ideas/discover-market-sizing/strategy-brief.md)
- Strategic roadmap R-06: `../../_working/roadmap_opus-4.7-max_2026-05-14.md` Section 5
- Companion specs (other 3 skills):
  - [`spec_define-prioritization-framework.md`](spec_define-prioritization-framework.md)
  - [`spec_discover-journey-map.md`](spec_discover-journey-map.md)
  - [`spec_measure-survey-analysis.md`](spec_measure-survey-analysis.md)
