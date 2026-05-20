---
title: "Market Sizing"
description: "Creates a framework-driven market sizing artifact covering TAM, SAM, and SOM with explicit bottoms-up and top-down estimates, an assumption ledger, and confidence ratings. Use when scoping a new product initiative, framing an investment case, evaluating market entry, or pressure-testing a strategic bet. Produces a defensible, decision-grade view of opportunity size grounded in named sources rather than round-number guesses."
generated: true
source: scripts/generate-skill-pages.py
tags:
  - Discover
  - research
---

:::note[Quick facts]
**Phase:** Discover | **Version:** 1.0.0 | **Category:** research | **License:** Apache-2.0
:::

**Try it:** `/market-sizing "Your context here"`

A market sizing artifact provides a defensible, decision-grade view of opportunity size for a product, feature, segment, or new market. The goal is not to produce a single hero number but to triangulate a credible range using two independent estimation paths, with every assumption named and every source cited. A well-built sizing supports investment decisions, strategy reviews, and prioritization conversations.

## When to Use

- Before pitching a new product or major feature for funding
- When evaluating entry into a new market or segment
- During annual planning to size strategic bets
- When comparing prioritization options that target different markets
- After a directional pivot, to re-anchor the opportunity
- When stakeholders push back on scope with "is this big enough?"

## How to Use

Use the `/market-sizing` slash command:

```
/market-sizing "Your context here"
```

Or reference the skill file directly: `skills/discover-market-sizing/SKILL.md`

## Instructions

When asked to size a market, follow these steps:

1. **Define the Market Cleanly**
   State the product or service, the target buyer, the geography, and the time window. Vague scope produces meaningless numbers. Write a one-sentence market definition that a stranger could verify.

2. **Choose Two Independent Paths**
   Use both top-down (start from a published market figure, narrow by segment) and bottoms-up (count buyers and multiply by spend). The two paths must be independent so they cross-check each other. If they diverge by more than 3x, find the broken assumption before going further.

3. **Compute TAM**
   Total Addressable Market: total demand if every potential buyer in the world bought the solution. Use top-down: published market reports, industry analyst figures, government statistics. Cite every source with date and methodology.

4. **Compute SAM**
   Serviceable Addressable Market: the portion of TAM you can actually reach given your channel, language, regulatory, and product constraints. Narrow TAM by the constraints you cannot lift in the planning window.

5. **Compute SOM**
   Serviceable Obtainable Market: the share of SAM you can realistically capture in the time window given competition, sales motion, and team capacity. Anchor with bottoms-up: number of accounts you can land in year one times average revenue per account.

6. **Build the Assumption Ledger**
   List every assumption used in the calculation with a confidence rating (High, Medium, Low) and the source. Anything Low-confidence becomes a research follow-up. The ledger is the durable artifact: numbers will move, assumptions are testable.

7. **Stress-Test with Sensitivity**
   Pick the two assumptions with the largest impact on the headline number. Show what happens to SOM if each is 50% lower or 50% higher. Sensitivity exposes which assumption deserves the most scrutiny before commit.

8. **Translate into Decision Recommendations**
   Numbers without recommendations are decoration. State the implication: pursue, defer, narrow scope, expand scope, or reframe the question. Tie each recommendation to the assumption that drove it.

## Output Template

# Market Sizing: [Product/Segment Name]

## Overview

**Sizing Scope:** [What product, service, or segment is being sized]
**Target Buyer:** [Who buys this; named segment]
**Geography:** [Region or country scope]
**Time Window:** [Year 1, Year 3, Year 5, or specific dates]
**Date:** [When sizing was conducted]
**Analyst:** [Who prepared this]

## Market Definition

<!-- One verifiable sentence: a stranger should be able to confirm what is being sized -->

**Definition:** [Product X for buyer Y in geography Z over time window T]

**In Scope:** [What the sizing includes]
**Out of Scope:** [What it explicitly excludes]

## Top-Down Estimate (TAM)

<!-- Start from a published market figure, narrow by segment -->

**Anchor Source:** [Report name, publisher, date]
**Anchor Figure:** [Total market value or unit count]
**Methodology:** [How the source computed it]

**Narrowing Filters:**

| Filter | Rationale | Adjustment | Source |
|--------|-----------|-----------|--------|
| [Filter 1] | [Why apply this filter] | [%] | [Citation] |
| [Filter 2] | [Why apply this filter] | [%] | [Citation] |

**TAM Result:** [$ value or unit count] [confidence]

## Bottoms-Up Estimate (SAM/SOM)

<!-- Count buyers, multiply by spend -->

**Buyer Universe Definition:** [Who counts as a potential buyer]
**Buyer Count:** [Number] [Source]
**Average Annual Spend:** [$ value] [Source: pricing page, comparable, interview]

**SAM Calculation:**

- Buyer Count Reachable: [Number]
- Spend per Buyer: [$ value]
- SAM = Reachable Buyers x Spend = [$ value]

**SOM Calculation:**

- Land Year 1: [Number of accounts]
- Average Revenue per Account: [$ value]
- SOM = Land x ARPA = [$ value]

## Cross-Check

<!-- Compare top-down and bottoms-up; reconcile divergence -->

| Path | TAM | SAM | SOM |
|------|-----|-----|-----|
| Top-Down | [$] | [$] | [$] |
| Bottoms-Up | [$] | [$] | [$] |
| Ratio | [Nx] | [Nx] | [Nx] |

**Reconciliation:** [Why the paths agree or diverge; what assumption explains the gap]

## Assumption Ledger

| # | Assumption | Value | Confidence | Source | Owner |
|---|-----------|-------|-----------|--------|-------|
| A1 | [Assumption 1] | [Value] | High/Med/Low | [Source] | [Name] |
| A2 | [Assumption 2] | [Value] | High/Med/Low | [Source] | [Name] |
| A3 | [Assumption 3] | [Value] | High/Med/Low | [Source] | [Name] |
| A4 | [Assumption 4] | [Value] | High/Med/Low | [Source] | [Name] |
| A5 | [Assumption 5] | [Value] | High/Med/Low | [Source] | [Name] |

## Sensitivity Analysis

<!-- What happens to the headline number if a top assumption shifts -->

**Assumption Tested:** [A_n from ledger]

- Base Case: [SOM value]
- 50% Lower: [SOM value]
- 50% Higher: [SOM value]

**Assumption Tested:** [A_n from ledger]

- Base Case: [SOM value]
- 50% Lower: [SOM value]
- 50% Higher: [SOM value]

**Most Impactful Assumption:** [Which one moves the SOM the most]

## Recommendations

<!-- Tie market findings to a decision -->

**Headline Recommendation:** [Pursue / Defer / Narrow / Expand / Reframe]

**Decision Rationale:**

1. [Why this recommendation, tied to a specific number]
2. [Second supporting reason, tied to a specific assumption]

**Conditions for Re-Sizing:** [What event would trigger an update]

## Confidence Summary

| Layer | Confidence | Why |
|-------|-----------|-----|
| TAM | High/Med/Low | [Reason] |
| SAM | High/Med/Low | [Reason] |
| SOM | High/Med/Low | [Reason] |
| Recommendation | High/Med/Low | [Reason] |

## Sources

| # | Source | Type | Date | Used For |
|---|--------|------|------|----------|
| S1 | [Source name] | Report / Pricing / Interview / Public data | [Date] | [TAM / SAM / SOM / assumption] |
| S2 | [Source name] | Report / Pricing / Interview / Public data | [Date] | [TAM / SAM / SOM / assumption] |
| S3 | [Source name] | Report / Pricing / Interview / Public data | [Date] | [TAM / SAM / SOM / assumption] |

## Next Steps

- [ ] [Validate top assumption with research action]
- [ ] [Schedule re-sizing on trigger]
- [ ] [Distribute to specific stakeholders]

---

*Sizing valid as of [date]. Markets shift; recommend re-sizing on a quarterly cadence or on a named trigger event.*

## Example Output

<details>
<summary>Market Sizing: AI Coding Assistant for US SMB Developer Teams</summary>

# Market Sizing: AI Coding Assistant for US SMB Developer Teams

## Overview

**Sizing Scope:** AI-assisted code generation and review IDE plugin priced as a per-seat subscription
**Target Buyer:** Engineering managers at US-based small and medium businesses (10 to 499 employees) buying for their dev teams
**Geography:** United States only
**Time Window:** Year 1 through Year 3 (2026 to 2028)
**Date:** May 2026
**Analyst:** Product Strategy

## Market Definition

**Definition:** A per-seat AI coding assistant IDE plugin sold to engineering managers at US SMBs (10 to 499 employees) with at least one full-time software engineer, sized for the 2026 to 2028 window.

**In Scope:**

- US-based SMB engineering teams
- Per-seat SaaS pricing model (5 to 50 seats per account)
- Self-serve and lightweight inside-sales motion
- Web IDE and VS Code plugin distribution

**Out of Scope:**

- Enterprise (500+ employees), which has different procurement, security, and contract dynamics
- International markets, deferred to a separate sizing
- Free-tier-only users, who are pipeline not revenue
- AI agent platforms (autonomous coding), which is a different category

## Top-Down Estimate (TAM)

**Anchor Source:** Gartner "Worldwide AI Software Market Forecast, 2024-2028", Q1 2026 update
**Anchor Figure:** $14.2B global AI developer tools market (2026)
**Methodology:** Bottom-up by region from vendor revenue and analyst estimates

**Narrowing Filters:**

| Filter | Rationale | Adjustment | Source |
|--------|-----------|-----------|--------|
| US share of global AI dev tools | US accounts for largest single-country share | 38% | Gartner regional breakdown 2026 |
| SMB share of US AI dev tools | Enterprise dominates spend; SMB is a thinner slice | 22% | IDC SMB software spend report 2025 |
| Coding assistant share of AI dev tools | Excludes testing AI, deployment AI, devops AI | 45% | Stack Overflow 2025 Developer Survey buyer category split |

**TAM Result:** $14.2B x 38% x 22% x 45% = $534M (2026 US SMB AI coding assistant TAM) [Medium confidence]

## Bottoms-Up Estimate (SAM/SOM)

**Buyer Universe Definition:** US SMBs (10 to 499 employees) employing at least one software engineer

**Buyer Count:** 412,000 SMBs with at least one in-house engineer [Source: BLS Quarterly Census of Employment and Wages, NAICS 5415, 2025]

**Average Engineers per SMB:** 4.8 [Source: BLS QCEW industry occupational mix, 2025]

**Reachable Engineers (top of funnel):** 412,000 x 4.8 = 1.98M engineers in addressable SMBs

**Average Annual Spend per Seat:** $360 ($30 per seat per month, market-rate from public pricing pages of leading vendors, May 2026)

**SAM Calculation:**

- Reachable engineers: 1.98M
- Average annual spend per seat: $360
- SAM = 1.98M x $360 = $713M

**SOM Calculation (Year 1):**

- Accounts landable Year 1: 1,200 (anchored to comparable v1 SMB SaaS launches in adjacent dev tooling categories that hit between 1,800 and 3,500 paid teams in their first year)
- Average seats per account at land: 8 (matches SMB engineer average of 4.8 plus typical 60% expansion within 6 months observed in dev tooling)
- Annual revenue per account: 8 x $360 = $2,880
- SOM Year 1 = 1,200 x $2,880 = $3.5M ARR

**SOM Calculation (Year 3):**

- Cumulative accounts: 8,000 (assumes 80% retention plus 100% YoY new-logo growth from Year 1 base)
- Average seats per account at Year 3: 14 (typical seat expansion to roughly 75% of SMB engineer headcount on retained accounts)
- Annual revenue per account: 14 x $360 = $5,040
- SOM Year 3 = 8,000 x $5,040 = $40.3M ARR

## Cross-Check

| Path | TAM | SAM | SOM (Year 3) |
|------|-----|-----|--------------|
| Top-Down | $534M | n/a | n/a |
| Bottoms-Up | n/a | $713M | $40.3M |
| Ratio | 1.34x divergence at TAM/SAM boundary | n/a | n/a |

**Reconciliation:** The $534M top-down TAM and the $713M bottoms-up SAM diverge by 1.34x, well within the acceptable 3x range. The gap is mostly explained by the bottoms-up calculation including engineers at SMBs whose primary product is not software (a dev team at a regional bank or a law firm) that the top-down filters trim out as non-software-spend. Both numbers tell the same directional story: the addressable revenue pool is in the high hundreds of millions, not billions.

## Assumption Ledger

| # | Assumption | Value | Confidence | Source | Owner |
|---|-----------|-------|-----------|--------|-------|
| A1 | US share of global AI dev tools spend | 38% | Medium | Gartner Q1 2026 | Strategy |
| A2 | SMB share of US AI dev tools spend | 22% | Low | IDC 2025; not refreshed for AI dev tools subset | Research |
| A3 | Coding assistant share of AI dev tools | 45% | Medium | Stack Overflow 2025 buyer split | Research |
| A4 | Average engineers per addressable SMB | 4.8 | High | BLS QCEW 2025 | Strategy |
| A5 | Average annual spend per seat | $360 | High | Public pricing pages May 2026 | Strategy |
| A6 | Year 1 landable accounts | 1,200 | Low | Heuristic from comparable launches | Sales |
| A7 | Year 3 cumulative accounts | 8,000 | Low | 80% retention plus 100% new-logo growth | Sales |
| A8 | Year 3 seat expansion ratio | 75% of headcount | Low | Industry benchmarks for dev tooling | Customer Success |

## Sensitivity Analysis

**Assumption Tested:** A6 (Year 1 landable accounts)

- Base Case: 1,200 accounts produces SOM Year 1 of $3.5M ARR
- 50% Lower (600 accounts): SOM Year 1 of $1.7M ARR
- 50% Higher (1,800 accounts): SOM Year 1 of $5.2M ARR

**Assumption Tested:** A8 (Year 3 seat expansion ratio)

- Base Case: 14 seats per account at Year 3 produces SOM Year 3 of $40.3M ARR
- 50% Lower (7 seats per account): SOM Year 3 of $20.2M ARR
- 50% Higher (21 seats per account): SOM Year 3 of $60.5M ARR

**Most Impactful Assumption:** A8 (seat expansion) drives a swing of roughly $20M ARR at Year 3, larger than the $1.7M swing from A6 in Year 1. Expansion math matters more than landing math for the long-range bet.

## Recommendations

**Headline Recommendation:** Pursue, with explicit Year 1 success defined as account count, not ARR.

**Decision Rationale:**

1. SAM is $713M, large enough to support a venture-scale outcome at single-digit market share
2. SOM Year 3 of $40M ARR is consistent with a defensible $200M to $400M valuation, well above the threshold for a Series B raise
3. The biggest risk is A8 (seat expansion); plan should front-load investment in adoption mechanics and team-level analytics, not just acquisition

**Conditions for Re-Sizing:**

- A category leader cuts price below $20 per seat per month
- A federal regulation lands on AI training data that materially changes vendor economics
- Annual recheck at planning kickoff

## Confidence Summary

| Layer | Confidence | Why |
|-------|-----------|-----|
| TAM | Medium | Anchor sources are reputable but the AI dev tools category is still being defined |
| SAM | Medium | Buyer universe is well-counted; spend assumption is solid |
| SOM | Low | Heavily dependent on landing and expansion assumptions A6 to A8 |
| Recommendation | Medium | Pursue is robust to most assumption shifts; the question is shape of bet, not whether to bet |

## Sources

| # | Source | Type | Date | Used For |
|---|--------|------|------|----------|
| S1 | Gartner Worldwide AI Software Market Forecast 2024-2028 | Report | Q1 2026 | TAM anchor |
| S2 | IDC SMB Software Spend Report | Report | 2025 | SMB share filter |
| S3 | Stack Overflow Developer Survey | Survey | 2025 | Buyer category split |
| S4 | BLS Quarterly Census of Employment and Wages, NAICS 5415 | Public data | 2025 | SMB and engineer counts |
| S5 | Public AI coding assistant pricing pages (leading vendors) | Pricing | May 2026 | Per-seat spend benchmark |

## Next Steps

- [ ] Validate A2 (SMB AI dev tools share) with a targeted 2026 IDC pull
- [ ] Run 5 customer interviews to test A6 (landing assumption) before commit
- [ ] Schedule re-sizing at Q4 2026 planning kickoff
- [ ] Brief Series A pitch deck with the SOM Year 3 number and the A8 dependency

---

*Sizing valid as of May 2026. Markets shift; recommend re-sizing on a quarterly cadence or on a named trigger event.*

</details>

## Quality Checklist

Before finalizing, verify:

- [ ] Market definition is one verifiable sentence (product, buyer, geography, time window)
- [ ] Both top-down and bottoms-up estimates are present and independent
- [ ] TAM, SAM, SOM are each computed, not asserted
- [ ] Every number cites a source with date and methodology
- [ ] Assumption ledger lists every assumption with confidence rating
- [ ] Sensitivity analysis covers the two highest-impact assumptions
- [ ] Recommendations name a decision, not just describe the market
- [ ] Round-number red flags are absent (no unsupported "1B market" style claims)

## Output Format

Use the template in `references/TEMPLATE.md` to structure the output.
