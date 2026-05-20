---
artifact: market-sizing
version: "1.0"
created: 2026-05-07
status: complete
context: AI coding assistant for SMB developer teams in the US market
---

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
