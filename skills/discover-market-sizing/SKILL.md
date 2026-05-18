---
name: discover-market-sizing
description: Creates a framework-driven market sizing artifact covering TAM, SAM, and SOM with explicit bottoms-up and top-down estimates, an assumption ledger, and confidence ratings. Use when scoping a new product initiative, framing an investment case, evaluating market entry, or pressure-testing a strategic bet. Produces a defensible, decision-grade view of opportunity size grounded in named sources rather than round-number guesses.
phase: discover
version: "1.0.0"
updated: 2026-05-19
license: Apache-2.0
metadata:
  category: research
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# Market Sizing

A market sizing artifact provides a defensible, decision-grade view of opportunity size for a product, feature, segment, or new market. The goal is not to produce a single hero number but to triangulate a credible range using two independent estimation paths, with every assumption named and every source cited. A well-built sizing supports investment decisions, strategy reviews, and prioritization conversations.

## When to Use

- Before pitching a new product or major feature for funding
- When evaluating entry into a new market or segment
- During annual planning to size strategic bets
- When comparing prioritization options that target different markets
- After a directional pivot, to re-anchor the opportunity
- When stakeholders push back on scope with "is this big enough?"

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

## Output Format

Use the template in `references/TEMPLATE.md` to structure the output.

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

## Examples

See `references/EXAMPLE.md` for a completed example.
