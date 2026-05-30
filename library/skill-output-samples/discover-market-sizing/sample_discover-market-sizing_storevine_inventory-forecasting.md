---
title: "Discover Market Sizing: Storevine Inventory Forecasting"
description: "Storevine B2B SaaS - sizing AI inventory forecasting where top-down and bottom-up diverge 10x, and the synthesis explains why."
artifact: market-sizing
version: "1.0"
repo_version: "2.18.0"
skill_version: "1.0.0"
created: 2026-05-21
status: sample
thread: storevine
context: Storevine B2B platform - sizing the market for AI inventory forecasting for mid-market e-commerce
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Storevine sells AI inventory forecasting to mid-market e-commerce companies. The PM wants a market size, and the interesting lesson here is that top-down and bottom-up diverge by about 10x. The synthesis section shows that the gap is a category-definition mismatch: "e-commerce SaaS spend" is a huge umbrella, while the actual forecasting niche is narrow. Resolving that gap is the value of running both methods. Invented figures are tagged `[fictional]`; the rest are stated assumptions.

**Source Notes:**

- Bill Aulet, "Disciplined Entrepreneurship" (Wiley, 2013) - the bottom-up TAM method (target customer count x annual contract value) and Aulet's warning that top-down market-report numbers overstate the addressable opportunity for a narrow product.
- Steve Blank, "The Four Steps to the Epiphany" - the distinction between an existing market and a niche within it; the divergence here is a textbook case of sizing the umbrella category instead of the actual served niche.

---

## Prompt

```
discover-market-sizing

size the market for storevine's AI inventory forecasting. B2B SaaS, sold to
mid-market e-commerce companies (200-2000 employees). ACV around $40k.

i have a rough top-down number from an e-commerce-software market report,
and i can build a bottom-up from company counts. i suspect they won't match -
walk me through reconciling them.
```

---

## Output

# Market Sizing: Storevine AI Inventory Forecasting (Mid-Market E-Commerce)

> Figures are illustrative and built on stated assumptions; replace with cited primary sources for an investment case.

## Executive Summary

We size the market for AI inventory forecasting sold to mid-market e-commerce companies at ~$40K ACV. Top-down (a slice of the broad e-commerce software market) suggests a TAM near $9B, while bottom-up (mid-market e-commerce firm count x ACV) suggests only ~$0.9B. **This ~10x divergence is the headline finding:** the top-down figure sizes the umbrella "e-commerce software" category, not the narrow forecasting niche Storevine actually serves. The defensible TAM is the bottom-up ~$0.9-1.2B. SAM (US + EU mid-market, forecasting-ready) is ~$520M [fictional]; 3-year SOM at 5% is ~$26M [fictional]. Confidence: Medium-Low.

## Market Definition

- **Included:** AI inventory-forecasting software sold to e-commerce companies with 200-2000 employees in the US and EU
- **Excluded:** Enterprise (2000+, different procurement), SMB (under 200, can't justify the ACV), broad ERP/OMS suites that include forecasting as one module, non-forecasting supply-chain tooling
- **Geography / horizon:** US + EU; 3-year horizon

## Top-Down Sizing

| Layer | Number | Method | Source / Assumption | Confidence |
|---|---|---|---|---|
| TAM (umbrella) | ~$9B | Slice of e-commerce software spend | E-commerce software market ~$60B [fictional] x ~15% supply-chain/inventory share | Low |
| TAM (niche, defensible) | ~$0.9B | See bottom-up | Reconciled below | Medium |
| SAM | ~$520M | Filter to mid-market, forecasting-ready | US + EU subset of the niche TAM | Low |
| SOM | ~$26M | Market-share assumption | 5% of SAM by year 3 | Low |

## Bottom-Up Sizing

| Segment | # Customers | Revenue / Customer (ACV) | Sub-total | Method | Source |
|---|---|---|---|---|---|
| US mid-market e-commerce | ~14,000 firms [fictional] | $40K | ~$560M | Bottom-up | Firm count assumption |
| EU mid-market e-commerce | ~9,000 firms [fictional] | $38K | ~$342M | Bottom-up | Firm count assumption |
| **Total** | **~23,000 firms** | - | **~$900M** | - | - |

## Multi-Framework Synthesis

- **Where they diverge:** Top-down ($9B) is ~10x the bottom-up ($0.9B). The cause is category definition: the $9B "supply-chain/inventory share of e-commerce software" includes ERP modules, order management, warehouse systems, and broad suites - most of which are not standalone forecasting and are not Storevine's market. Bottom-up counts only firms that would buy a dedicated forecasting product at $40K ACV.
- **Resolution:** Trust the bottom-up. The top-down umbrella is the wrong unit. Restate top-down by narrowing the category to "standalone demand-forecasting tools," which would shrink the 15% share to ~2-3% and bring it in line with bottom-up.
- **Synthesized estimate:** TAM ~$0.9-1.2B (defensible niche), SAM ~$520M, SOM ~$26M at 5% in 3 years.
- **Synthesis confidence:** Medium-Low. The bottom-up is more defensible but rests on assumed firm counts; the divergence itself increases confidence that we are not fooling ourselves with the $9B number.

## Sensitivity Analysis

| Assumption varied | Low | Mid | High |
|---|---|---|---|
| Mid-market firm count (US+EU) | 15,000 (TAM = $0.6B) | 23,000 (TAM = $0.9B) | 32,000 (TAM = $1.3B) |
| Year-3 market share | 2% (SOM = $10M) | 5% (SOM = $26M) | 10% (SOM = $52M) |

## Key Assumptions

| Assumption | Source / Rationale | Confidence | What changes if wrong |
|---|---|---|---|
| ~23,000 US+EU mid-market e-commerce firms | Derived assumption; not firmographic-sourced | Low | Scales bottom-up directly |
| $40K ACV | Storevine pricing | Medium | Scales revenue linearly |
| Forecasting is ~2-3% of e-commerce software (not 15%) | Reconciliation judgment | Low | Reconciles the top-down/bottom-up gap |
| 5% year-3 share | GTM judgment | Low | Scales SOM |

## Confidence and Limitations

- **Most confident:** The bottom-up structure (firms x ACV) is the right model for a dedicated B2B tool
- **Least confident:** The firm count, and the top-down category share
- **Would improve confidence:** A firmographic pull of e-commerce firms by employee band; a narrow market report specifically on demand-forecasting software (not broad supply-chain)
- **Not addressed:** Build-vs-buy by larger firms, displacement of incumbent ERP forecasting modules, services/implementation revenue

## Next Steps

- Replace the assumed 23,000 firm count with a sourced firmographic pull
- Find a market report scoped to standalone demand forecasting, not the e-commerce software umbrella
- Conviction threshold: a defensible niche TAM near $1B with a 5% share path is enough for a Series A case; do not put the $9B umbrella number in the deck
