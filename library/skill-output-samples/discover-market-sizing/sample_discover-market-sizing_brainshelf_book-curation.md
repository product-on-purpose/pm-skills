---
title: "Discover Market Sizing: Brainshelf Book Curation"
description: "Brainshelf B2C - sizing the market for an AI book-curation subscription, top-down and bottom-up converging within 2x."
artifact: market-sizing
version: "1.0"
repo_version: "2.18.0"
skill_version: "1.0.0"
created: 2026-05-21
status: sample
thread: brainshelf
context: Brainshelf consumer subscription - sizing the US market for AI-curated book recommendations
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Brainshelf is a B2C subscription that uses AI to curate personalized book recommendations. The PM needs a market size for a fundraising deck. This sample demonstrates a consumer-subscription sizing where top-down (consumer book spend) and bottom-up (addressable readers x ARPU) converge within roughly 2x, which raises confidence. Figures are illustrative; invented numbers are tagged `[fictional]` and the rest are built on explicit assumptions.

**Source Notes:**

- Bill Aulet, "Disciplined Entrepreneurship" (Wiley, 2013) - the bottom-up TAM method (count the addressable end users, multiply by realistic per-user revenue) used in the bottom-up section; Aulet argues bottom-up is more defensible than top-down for a new category.
- Geoffrey A. Moore, "Crossing the Chasm" (HarperBusiness) - the SAM filter to early-adopter readers (the "digital-curation adopter") rather than all readers reflects Moore's point that a new product first serves a beachhead segment, not the whole market.
- Association of American Publishers, StatShot reports (publishers.org) - the category anchor for US consumer book revenue; the specific figure here is illustrative and must be replaced with the current StatShot number for a real deck.

---

## Prompt

```
discover-market-sizing

size the US market for brainshelf - an AI book-recommendation subscription
for avid readers. consumer subscription, ~$8/month. need it for a seed deck.

i don't have a bought market report. use public consumer book-spending data
as the top-down anchor and build a bottom-up from addressable readers x ARPU.
show me where the two methods agree.
```

---

## Output

# Market Sizing: Brainshelf AI Book-Curation Subscription (US)

> Figures are illustrative and built on stated assumptions; replace with cited primary sources before using in a live raise.

## Executive Summary

We size the US market for an AI book-curation consumer subscription at ~$8/month. Top-down (a slice of US consumer book spend) puts TAM near $2.0B. The serviceable market converges from two directions: a top-down filter to digital-curation adopters and a bottom-up build from willing-to-pay avid readers both land near ~$230M SAM [fictional]. A 3-year SOM at 2% share is ~$4.6M [fictional]. The most important assumption is the share of avid readers willing to pay for curation (assumed 8%). Confidence: Medium.

## Market Definition

- **Included:** US consumers who read 12+ books/year and would pay a monthly subscription for AI-curated recommendations
- **Excluded:** Casual readers (under 12 books/year), non-US markets, the book-retail transaction itself (Brainshelf sells curation, not books)
- **Geography / horizon:** United States; 3-year horizon

## Top-Down Sizing

| Layer | Number | Method | Source / Assumption | Confidence |
|---|---|---|---|---|
| TAM | ~$2.0B | Slice of consumer book spend | US consumer book market ~$28B [fictional, replace with AAP StatShot] x ~7% redirectable to a curation/discovery service | Low |
| SAM | ~$230M | Filter to digital-curation adopters | ~30M US avid readers [fictional] x 8% curation-payer rate x $8/mo x 12 | Medium |
| SOM | ~$4.6M | Market-share assumption | 2% of SAM by year 3 | Low |

## Bottom-Up Sizing

| Scenario | # Payers | ARPU | Estimate | Method | Basis |
|---|---|---|---|---|---|
| Base (8% of avid readers pay) | ~2.4M [fictional] | $96/yr ($8/mo) | ~$230M | Bottom-up | 30M avid readers x 8% willing-to-pay |
| High (15% pay) | ~4.5M [fictional] | $96/yr | ~$432M | Bottom-up (alternate) | Higher willing-to-pay rate on the same population |

The two rows are alternate willing-to-pay rates on the same avid-reader population, not additive segments. Heavy readers (25+ books/yr) are a subset of avid readers and are the likeliest to convert, so they sit inside these figures rather than adding to them. Bottom-up range: ~$230M (base) to ~$432M (high).

## Multi-Framework Synthesis

- **Where they agree:** Top-down SAM (~$230M) and the bottom-up base (~$230M) converge tightly at the 8% willing-to-pay rate; the bottom-up high case (~$432M at 15% pay) lines up with the sensitivity range. Good convergence for a consumer category.
- **Where they diverge:** Top-down TAM ($2.0B) is much larger than bottom-up, because TAM counts a redirectable slice of all book spend while bottom-up counts only willing-to-pay avid readers. This is expected: TAM is the ceiling, bottom-up is the realistic serviceable base. They are answering different questions.
- **Synthesized estimate:** TAM ~$2.0B, SAM ~$230M, SOM ~$4.6M at 2% in 3 years. Low/high TAM band: $1.2B / $2.8B.
- **Synthesis confidence:** Medium. Convergence of the SAM-level numbers is reassuring; the willing-to-pay rate is the soft spot.

## Sensitivity Analysis

| Assumption varied | Low | Mid | High |
|---|---|---|---|
| Curation willing-to-pay rate | 4% (SAM = $115M) | 8% (SAM = $230M) | 15% (SAM = $432M) |
| Year-3 market share | 1% (SOM = $2.3M) | 2% (SOM = $4.6M) | 5% (SOM = $11.5M) |

## Key Assumptions

| Assumption | Source / Rationale | Confidence | What changes if wrong |
|---|---|---|---|
| US consumer book market ~$28B | AAP StatShot category (figure illustrative) | Low | Scales top-down TAM |
| ~30M US avid readers (12+ books/yr) | Reading-survey estimates [fictional] | Low | Scales SAM and bottom-up |
| 8% willing to pay for curation | Assumption; the central uncertainty | Low | Largest swing (see sensitivity) |
| $8/mo ARPU | Product pricing decision | Medium | Scales revenue linearly |

## Confidence and Limitations

- **Most confident:** Order of magnitude of the US book market (a real, large category)
- **Least confident:** The willing-to-pay rate for a curation subscription, which has no direct precedent
- **Would improve confidence:** A pricing/demand survey of avid readers; competitor subscription disclosures (e.g., comparable reading-app subscriber counts)
- **Not addressed:** International readers, the cost of acquiring subscribers (CAC), retention/churn

## Next Steps

- Run a willing-to-pay survey with avid readers to replace the 8% assumption
- Pull comparable subscriber economics from any public reading-app or curation competitor
- Conviction threshold: a SAM near $230M with a believable 2% share is generally enough to justify a seed raise for a consumer subscription; validate willingness-to-pay first
