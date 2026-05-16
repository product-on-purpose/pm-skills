---
title: "Foundation Sprint Differentiation: Storevine Retail Direction"
description: "Storevine Day 1 afternoon bundled artifact: scored differentiators, 2x2 chart, decision principles, Mini Manifesto."
artifact: foundation-sprint-differentiation
version: "1.0"
repo_version: "2.15.0"
skill_version: "0.1.0"
created: 2026-05-18
status: sample
thread: storevine
context: "Storevine Day 1 PM (13:00-16:30 PT 2026-05-18); Differentiation block bundled artifact; note-and-vote run for 2x2 axis selection"
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Candidate Differentiators (generated; pre-scoring)

| # | Differentiator | Source |
|---|---|---|
| D1 | Pre-built specialty-retail data model (no integration work for the customer) | Devon |
| D2 | Weekly-rhythm UX (delivered as a Monday morning artifact, not a dashboard) | Tasha |
| D3 | Human retail-specialist analyst in the loop | Mei |
| D4 | Outputs read in 15 minutes (designed for owner-operator schedule) | Carlos |
| D5 | Vendor-level + category-level + SKU-level decomposition in one view | Carlos |
| D6 | Recommendations are specific actions, not abstract metrics | Tasha |
| D7 | Setup time under 1 hour from POS connection to first weekly delivery | Devon |
| D8 | Pricing fits SMB retail margin expectations ($500-$1500/mo) | Mei |

## Scored Differentiators

Scoring criteria: each differentiator scored 1-5 on (a) feasibility for our team to deliver well, (b) defensibility against competitor copying within 12 months, (c) customer-judged importance from the 31-interview synthesis.

| Differentiator | Feasibility | Defensibility | Importance | Total | Rank |
|---|---|---|---|---|---|
| D6: Recommendations are specific actions | 5 | 4 | 5 | 14 | 1 |
| D3: Human retail-specialist analyst in the loop | 5 | 5 | 4 | 14 | 1 |
| D4: 15-minute read time | 5 | 3 | 5 | 13 | 3 |
| D2: Weekly-rhythm UX (Monday artifact) | 5 | 3 | 4 | 12 | 4 |
| D1: Pre-built specialty-retail data model | 4 | 4 | 3 | 11 | 5 |
| D5: Multi-grain decomposition in one view | 4 | 3 | 4 | 11 | 5 |
| D7: Setup under 1 hour | 4 | 2 | 4 | 10 | 7 |
| D8: Pricing fits SMB margins | 5 | 2 | 3 | 10 | 7 |

## 2x2 Chart

**Axes (chosen via note-and-vote at 14:15 PT; see Note and Vote section):**

- X-axis: Time-to-value (slow to fast)
- Y-axis: Output specificity (generic metrics to specific actions)

```text
                       SPECIFIC ACTIONS
                              |
                              |  Storevine     . (managed-intel concierge direction)
                              |     *
                              |
                              |
Daasity .                     |
                              |
                              |   Polar Analytics .
                              |
SLOW <--------- Tableau . ----+---- . Shopify Analytics --------> FAST
                              |
                              |   . NetSuite reports
                              |
                              |
                              |     . spreadsheets (gut + last week)
                              |
                              |
                       GENERIC METRICS
```

**Reading the chart:** the "specific actions + fast time-to-value" quadrant is sparsely populated. Polar Analytics and Glew live in upper-right but with ecommerce focus; specialty physical retail is open. Spreadsheets dominate "fast but generic." Tableau dominates "specific but slow." Storevine wants the upper-right open quadrant with specialty-retail specificity.

## Note and Vote: 2x2 Axis Selection

Mid-block, the team had three candidate axis pairs:
- A: Time-to-value vs Output specificity (chosen)
- B: Cost vs Insight depth
- C: Setup effort vs Output frequency

Devon ran a 20-minute note-and-vote. Decider supervote chose A. Rationale captured in `sample_tool-note-and-vote_storevine_retail-direction.md` (this sample documents the target-customer note-and-vote; a second note-and-vote was run mid-Differentiation but not captured as a separate sample to avoid duplication).

## Decision Principles

The differentiation work produces 4 decision principles that constrain every downstream design and product decision in Storevine v0.1:

1. **Specific over abstract.** Outputs name the action ("reorder SKU-4421 for stores 3, 7, 11; cut SKU-8902 by 30% across all"), not metric values. If a screen shows a number without a recommended action, it does not ship.
2. **Weekly rhythm or no-rhythm.** The product respects merchandiser schedule: Monday delivery, 15-minute read budget. We do not build features that require daily check-ins.
3. **Human in the loop is the product, not a fallback.** Storevine ships managed-intelligence as the primary offering. We do not pretend customers can self-serve our specialty insight; we own the analyst function.
4. **Specialty retail empathy is non-negotiable.** Every customer interaction touches Carlos's experience-bank. We do not generalize to non-specialty retail; we do not generalize to enterprise.

## Mini Manifesto

**What Storevine is:**

Storevine is the weekly buying-decision brief for specialty retail owner-operators. It exists because the people who make $5M-$50M of merchandising decisions every year deserve better than gut feel and a Sunday-night Excel binge. Storevine takes the data that already exists in the retailer's POS and accounting tools and turns it into one Monday morning artifact: specific actions for the week, ranked by margin impact, readable in 15 minutes, written by a human retail specialist who knows the specialty-retail buying cycle as deeply as the customer does.

Storevine is not a dashboard. It is not a self-serve tool. It is not generic BI rebranded for retail. It is a managed-intelligence service that turns weekly retail decisions from gut into evidence, delivered as a reading session, not a software experience.

**What Storevine is NOT:**

Storevine is NOT a self-serve analytics platform. Customers do not log in to configure dashboards or build their own reports. If a customer wants to build their own queries, Tableau exists; Storevine is the explicit opposite of that path.

Storevine is NOT a Shopify ecommerce analytics product. The unit of analysis is the physical-store-plus-online merchandiser making weekly inventory decisions, not the online-only retailer optimizing ad spend.

Storevine is NOT trying to replace the merchandiser's judgment. The product delivers ranked options and clear evidence; the merchandiser makes the final call. We are amplifying expertise, not automating it.

Storevine is NOT pursuing enterprise retail (50+ stores) in v0.1. The market structure, sales cycle, and competitive set are different enough that v0.1 stays inside the 5-50 store band.

## Decider Checkpoint

**Mei sign-off required to proceed to Approach Options (Day 2 AM).**

- [x] Mei confirms the 4 decision principles, especially principle 3 (human-in-the-loop as the product).
- [x] Mei confirms the Mini Manifesto including all 4 negative-positioning paragraphs.
- [x] Mei accepts that this Differentiation block has effectively pre-committed Storevine to the managed-intelligence direction; Day 2 Approach Options will be variations within that, not a re-litigation of self-serve.
- [x] Mei confirms the 2x2 axis choice (time-to-value x output specificity).
- [x] Mei accepts the top-2 differentiators (D6 specific actions + D3 human analyst).

**Signed:** Mei, 2026-05-18 16:45 PT
