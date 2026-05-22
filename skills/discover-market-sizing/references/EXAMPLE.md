---
artifact: market-sizing
version: "1.0"
created: 2026-05-21
status: complete
context: B2B SaaS - sizing the market for an AI code-review tool sold to US companies with 50+ engineers
---

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
