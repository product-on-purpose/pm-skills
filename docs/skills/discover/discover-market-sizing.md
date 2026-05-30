---
title: "Market Sizing"
description: "Estimate market opportunity (TAM, SAM, SOM) using multiple sizing frameworks (top-down, bottom-up, comparable company, analogous market). Triangulates across frameworks, highlights where they converge and diverge as signal, and produces a calibrated range with source-graded confidence labels. Refuses unbounded fabrications; always offers a labeled lower-confidence path when data is thin. Used for investment cases, go/no-go decisions, and stakeholder pitches."
generated: true
source: scripts/generate-skill-pages.py
tags:
  - Discover
  - strategy
---

:::note[Quick facts]
**Phase:** Discover | **Version:** 1.0.0 | **Category:** strategy | **License:** Apache-2.0
:::

**Try it:** `/pm-skills:discover-market-sizing "Your context here"`

You produce a multi-framework market-sizing meta-analysis covering TAM (Total Addressable Market), SAM (Serviceable Addressable Market), and SOM (Serviceable Obtainable Market). You run all applicable sizing frameworks (top-down, bottom-up, comparable company, analogous market), compare where they converge and diverge, and synthesize a calibrated estimate with a recommendation. Divergence between frameworks is often the most valuable finding. Your job is to produce a defensible artifact and explain the reasoning.

## How to Use

Invoke the skill by name (`/pm-skills:discover-market-sizing` on Claude Code, `$discover-market-sizing` on Codex):

```
/pm-skills:discover-market-sizing "Your context here"
```

Or reference the skill file directly: `skills/discover-market-sizing/SKILL.md`

## Output Template

# Market Sizing: [Product / Market]

## Executive Summary
<!-- 3-5 sentences: what is being sized, headline TAM/SAM/SOM range with confidence labels, the single most important assumption -->

[Summary]

## Market Definition
<!-- Be precise. State exactly what is included and excluded. -->

- **Included:** [Boundary]
- **Excluded:** [What is deliberately out]
- **Geography / horizon:** [Scope and time frame]

## Top-Down Sizing

| Layer | Number | Method | Source / Assumption | Confidence |
|---|---|---|---|---|
| TAM | $[X] | [Industry report] | [Source, page] | [High/Medium/Low] |
| SAM | $[X] | [Filter on TAM] | [Filter logic] | [Medium] |
| SOM | $[X] | [Market-share assumption] | [% of SAM in N years] | [Medium/Low] |

## Bottom-Up Sizing
<!-- Build from unit economics. If bottom-up data is unavailable, say so; do not fabricate counts. -->

| Segment | # Customers | Revenue / Customer | Sub-total | Method | Source |
|---|---|---|---|---|---|
| [Segment A] | [X] | $[Y] | $[X*Y] | Bottom-up | [Source / Assumption] |

## Multi-Framework Synthesis
<!-- Convergence raises confidence; divergence is a finding to explain, not average away -->

- **Where the frameworks agree:** [Convergence and what it implies]
- **Where they diverge (10x or more):** [The gap and why - scope, definition, growth-rate]
- **Synthesized estimate:** [Central estimate with low/high range]
- **Synthesis confidence:** [High/Medium/Low] - [why]

## Sensitivity Analysis

| Assumption varied | Low | Mid | High |
|---|---|---|---|
| [Market growth rate] | [X%] (TAM = $[X]) | [Y%] (TAM = $[Y]) | [Z%] (TAM = $[Z]) |
| [Market share captured] | [1%] (SOM = $[A]) | [5%] (SOM = $[B]) | [10%] (SOM = $[C]) |

## Key Assumptions

| Assumption | Source / Rationale | Confidence | What changes if wrong |
|---|---|---|---|
| [Assumption] | [Source] | [High/Medium/Low] | [Sensitivity link] |

## Confidence and Limitations

- **Most confident:** [Where]
- **Least confident:** [Where]
- **Would improve confidence:** [Specific research]
- **Not addressed:** [Competition, time-to-market, regulatory, etc.]

## Next Steps

- [Next discovery work if proceeding]
- [Conviction threshold needed to justify investment]
- [Research that would close the largest remaining unknown]

## Example Output

<details>
<summary>Market Sizing: AI Code-Review SaaS (US, companies with 50+ engineers)</summary>

# Market Sizing: AI Code-Review SaaS (US, companies with 50+ engineers)

> Figures below are illustrative and built on explicitly stated assumptions. For an investment case, replace each assumption with a cited primary source. The point of this example is the multi-framework method, not the specific numbers.

## Executive Summary

We size the US market for an AI code-review tool sold per-seat to companies with 50 or more engineers. Two independent frameworks - top-down (developer population x per-seat value) and bottom-up (target company count x annual contract value) - produce TAM estimates that converge within roughly 1.1x ($862M top-down vs. $936M bottom-up), which raises confidence in a central TAM near $900M. SAM (US, 50+ engineer companies able to adopt cloud AI) is roughly $630M, and a 3-year SOM at 4% share is roughly $25M. The single most important assumption is per-seat annual value ($620); the estimate is most sensitive to it. Overall confidence: Medium (one real population anchor, the rest stated assumptions).

## Market Definition

- **Included:** AI-assisted code-review tooling sold per developer seat to US-headquartered companies employing 50 or more engineers
- **Excluded:** Free / open-source self-hosted tools, sub-50-engineer companies (different buying motion), non-US markets, fully air-gapped regulated environments that cannot use cloud AI
- **Geography / horizon:** United States; 3-year horizon

## Top-Down Sizing

| Layer | Number | Method | Source / Assumption | Confidence |
|---|---|---|---|---|
| TAM | ~$862M | Addressable developers x per-seat value | ~1.85M US software developers (public US labor statistics; verify current figure) x 75% at 50+ engineer firms = ~1.39M seats x $620/seat/yr | Medium |
| SAM | ~$630M | Filter on TAM | ~73% of addressable seats are at firms able to adopt cloud AI code review (excludes air-gapped / regulated) | Medium |
| SOM | ~$25M | Market-share assumption | 4% of SAM captured by year 3 | Low |

## Bottom-Up Sizing

| Segment | # Customers | Revenue / Customer (ACV) | Sub-total | Method | Source |
|---|---|---|---|---|---|
| 50-200 engineers | 12,000 firms | $18K | $216M | Bottom-up | Firm count and ACV both assumptions |
| 200-1000 engineers | 3,500 firms | $90K | $315M | Bottom-up | Assumptions |
| 1000+ engineers | 900 firms | $450K | $405M | Bottom-up | Assumptions |
| **Total** | **16,400 firms** | - | **~$936M** | - | - |

## Multi-Framework Synthesis

- **Where the frameworks agree:** Top-down (~$862M) and bottom-up (~$936M) land within ~1.1x of each other. Independent methods converging this tightly is the strongest confidence signal available without primary market data.
- **What the convergence depends on:** It only holds because the top-down per-seat value ($620) was reconciled against the bottom-up ACVs. The bottom-up ACVs imply an effective per-seat spend of roughly $600-680 once spread across each firm's developers; the top-down $620 was chosen to match. Had we used a naive $240/seat (a common under-estimate), top-down would be ~$333M - roughly 3x below bottom-up. **The per-seat figure is the swing factor, and the divergence it would create is the finding that forces an explicit, defensible number.**
- **Synthesized estimate:** TAM ~$900M (central), low $620M / high $1.3B. SAM ~$630M, SOM ~$25M at 4% in 3 years.
- **Synthesis confidence:** Medium. The convergence is reassuring, but only the developer population rests on a real source; per-seat value and firm counts are assumptions.

## Sensitivity Analysis

| Assumption varied | Low | Mid | High |
|---|---|---|---|
| Per-seat annual value | $240 (TAM = $0.33B) | $620 (TAM = $0.86B) | $900 (TAM = $1.25B) |
| Year-3 market share (SOM) | 1% (SOM = $6M) | 4% (SOM = $25M) | 8% (SOM = $50M) |

## Key Assumptions

| Assumption | Source / Rationale | Confidence | What changes if wrong |
|---|---|---|---|
| ~1.85M US software developers | Public US labor statistics (occupational employment) | Medium | Scales TAM linearly |
| 75% are at 50+ engineer firms | Firmographic assumption | Low | Scales addressable seats |
| Effective per-seat value ~$620/yr | Reconciled from bottom-up ACVs | Low | Largest swing factor (see sensitivity) |
| 16,400 US firms with 50+ engineers | Derived assumption; not from a firmographic source | Low | Scales bottom-up directly |
| 4% year-3 share | GTM judgment for a new entrant | Low | Scales SOM directly |

## Confidence and Limitations

- **Most confident:** Developer population order of magnitude (real labor data)
- **Least confident:** Per-seat value and firm counts (both assumptions)
- **Would improve confidence:** A firmographic data pull for the count of US firms by engineering headcount; a pricing study for per-seat willingness to pay
- **Not addressed:** Competitive displacement cost, time-to-market, the build-vs-buy preference of large engineering orgs, international expansion

## Next Steps

- Buy a firmographic data pull to replace the assumed 16,400 firm count with a sourced number
- Run a small pricing study to anchor the per-seat-value assumption that the estimate is most sensitive to
- Conviction threshold: a SAM near $630M with a credible path to 4% share generally clears the bar for a seed-stage investment case; confirm the per-seat value before committing

</details>

## Real-World Examples

See this skill applied to three different product contexts:

<details>
<summary>Storevine (B2B): Storevine B2B platform - sizing the market for AI inventory forecasting for mid-market e-commerce</summary>

**Prompt:**

```
discover-market-sizing

size the market for storevine's AI inventory forecasting. B2B SaaS, sold to
mid-market e-commerce companies (200-2000 employees). ACV around $40k.

i have a rough top-down number from an e-commerce-software market report,
and i can build a bottom-up from company counts. i suspect they won't match -
walk me through reconciling them.
```

---

**Output:**

# Market Sizing: Storevine AI Inventory Forecasting (Mid-Market E-Commerce)

> Figures are illustrative and built on stated assumptions; replace with cited primary sources for an investment case.

</details>

<details>
<summary>Brainshelf (Consumer): Brainshelf consumer subscription - sizing the US market for AI-curated book recommendations</summary>

**Prompt:**

```
discover-market-sizing

size the US market for brainshelf - an AI book-recommendation subscription
for avid readers. consumer subscription, ~$8/month. need it for a seed deck.

i don't have a bought market report. use public consumer book-spending data
as the top-down anchor and build a bottom-up from addressable readers x ARPU.
show me where the two methods agree.
```

---

**Output:**

# Market Sizing: Brainshelf AI Book-Curation Subscription (US)

> Figures are illustrative and built on stated assumptions; replace with cited primary sources before using in a live raise.

</details>

<details>
<summary>Workbench (Enterprise): Workbench - sizing the external market for developer-experience tooling platforms, quick-estimate mode</summary>

**Prompt:**

```
discover-market-sizing

we're thinking about commercializing workbench (our internal dev-experience
platform). size the external market for DevEx tooling platforms. sold per-seat
to engineering orgs. i do NOT have a market report - just give me a defensible
quick estimate with explicit assumptions and wide ranges, and tell me what
would tighten it.
```

---

**Output:**

# Market Sizing: Developer-Experience (DevEx) Tooling Platforms

> QUICK ESTIMATE. This is built on stated assumptions, not cited sources. Every figure is Low or Medium confidence with wide bands. For an investment decision, replace assumptions with a market report and a firmographic pull. Do not put these numbers in a board deck without that.

</details>

## Quality Checklist

Before finalizing, verify:

- [ ] Market definition states an explicit boundary (what is in, what is out)
- [ ] At least two sizing frameworks were run (top-down + bottom-up where data permits)
- [ ] Multi-framework synthesis explains convergence and divergence, not just an average
- [ ] Every dollar figure traces to a cited source, a stated assumption, or a sensitivity range
- [ ] Confidence labels are source-calibrated, not blanket Low
- [ ] Sensitivity analysis shows how the estimate moves under key assumptions
- [ ] TAM is not presented as a revenue projection
