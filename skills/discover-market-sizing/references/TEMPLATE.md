---
artifact: market-sizing
version: "1.0"
created: YYYY-MM-DD
status: draft
---

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
