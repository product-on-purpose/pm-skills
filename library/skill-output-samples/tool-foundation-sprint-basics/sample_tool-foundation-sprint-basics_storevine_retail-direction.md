---
title: "Foundation Sprint Basics: Storevine Retail Direction"
description: "Storevine Day 1 morning bundled artifact: target customer, important problem, team advantage, competitor + alternatives map."
artifact: foundation-sprint-basics
version: "1.0"
repo_version: "2.15.0"
skill_version: "0.1.0"
created: 2026-05-18
status: sample
thread: storevine
context: "Storevine Day 1 AM (09:00-11:30 PT 2026-05-18); Basics block bundled artifact; one note-and-vote run mid-block"
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Target Customer

**Statement:** Independent and small-chain US specialty retailers with 5-50 physical stores, $5M-$50M annual revenue, located in the merchandising-led categories (outdoor, home goods, specialty grocery, kids/toys, gift, fashion-adjacent). Buyer is the owner-operator or merchandising director. They make weekly buying decisions (reorder, markdown, new vendor intake) primarily from gut + last-week-sales spreadsheets.

**Sharpening note:** Initial discussion ranged from "specialty retailers" to "any SMB retailer including services and food service." The team used `tool-note-and-vote` to narrow (see Note and Vote section below). Carlos's lived experience and the 31 interviews both clustered in the merchandising-led 5-50 store band; that's where Storevine focuses v0.1.

**Not the target customer (v0.1):**

- Single-store retailers (under 5 stores): too small for managed-intelligence cost structure; underserved by the buyer-side problem framing
- Mid-market chains (50-500 stores): already have analyst headcount or Tableau-grade BI; different competitor set
- Enterprise retail (500+ stores): own data teams; Storevine is structurally not a fit
- Food service / restaurants: completely different inventory dynamics
- Direct-to-consumer ecommerce-only: different decision rhythm

## Important Problem

**Statement:** Specialty retail owner-operators and merchandising directors make weekly buying decisions (reorder, markdown, new vendor) with poor visibility into which products are actually driving margin contribution, which categories are slowing, and which vendor moves are paying off. They have data in their POS and their accounting tool, but the data does not arrive as a weekly answer: it arrives as raw rows requiring 60-90 minutes of spreadsheet work the merchandiser does not have time for.

**Concrete examples from the 31 interviews:**

- A 14-store outdoor retailer skipped reordering a winning jacket SKU for 2 weeks because the merchandising director did not have time to pull the report; lost an estimated $40k in margin
- An 8-store specialty grocer marked down a category aggressively based on "feel" when the actual sales data showed only one of four sub-categories was slow; over-discounted the rest
- A 22-store gift retailer kept a struggling vendor for 8 months because nobody had time to compare vendor-level margin contribution

**Why this problem matters now:** Pandemic-era inventory disruption + 2024-2026 margin pressure made gut-based weekly buying decisions punitive. Pre-pandemic merchandisers could afford to be 10-15% wrong; current margins do not absorb that.

## Team Advantage

**Statement:** The Storevine team uniquely combines three capabilities that are individually common but rarely co-occur in one company: (1) deep retail-operator empathy (Carlos lived this problem for 5 years), (2) production analytics engineering (Devon shipped Shopify's reporting infrastructure at scale), (3) design taste for specialty retail interfaces (Tasha built Faire's retailer-side tools).

**Why us, why now:**

- Mei's Square Capital network gives credibility-by-association with the same retailer segment
- Carlos's 4-store experience means he reads retail-operator skepticism in real time; he is not faking customer empathy
- Devon's Shopify Analytics experience means we know what the data layer must look like and where the gotchas hide
- Tasha's Faire experience specifically built tools for retailers buying from many vendors at once: the most painful Storevine use case

**What the team is NOT:**

- We are not retail experts in apparel-only or grocery-only verticals; we'll be specialist-by-proxy through Carlos's network
- We are not enterprise sales people; the GTM has to fit the SMB cycle
- We do not have a data science research function; we will not invent novel ML

## Competitors and Alternatives

| Category | Specific competitors | Strengths | Why customers leave / never start |
|---|---|---|---|
| Generic BI tools | Tableau, Power BI, Looker | Powerful, configurable | Requires data engineering staff retailers don't have; weeks to first chart |
| Retail-specialist analytics | Daasity, Glew, Polar Analytics | Pre-built retail reports | Mostly ecommerce-focused; weak on physical-store inventory cycles |
| ERP-included reporting | NetSuite, Microsoft Dynamics | Already paid for | Buried in ERP UX; static; designed for accountants not merchandisers |
| Shopify Analytics | Shopify | Free with POS | Single-store + ecommerce focus; very thin for 5-50 store specialty |
| Square Analytics | Square for Retail | Free with POS | Similar limitation; weak for non-restaurant specialty |
| Spreadsheets + manual analysis | Excel, Google Sheets | Familiar; flexible | The status quo; 60-90 minutes per week per merchandiser; high error rate |
| Hired retail consultant | Independent retail consulting firms | Human expertise | $200-$500/hour; project-based, not weekly rhythm |
| Doing nothing / gut feel | (status quo) | Zero cost; fast | Margin punishment; we have evidence this is the dominant alternative |

**Critical alternative often missed: doing nothing.** Most of our 31 interview subjects did the buying decisions by gut + last-week feel without consulting any analytical tool. "Doing nothing" is the dominant competitor, not Tableau.

## Note and Vote: Target Customer Specificity

When the team divided between "all SMB retailers" and "specialty retailers only," the facilitator (Devon) ran a 25-minute note-and-vote. See `sample_tool-note-and-vote_storevine_retail-direction.md` for the full output. Outcome: specialty retailers 5-50 stores ratified by Mei's supervote.

## Decider Checkpoint

**Mei sign-off required to proceed to Differentiation (Day 1 PM).**

- [x] Mei confirms the target customer statement and the four "not the target" exclusions.
- [x] Mei confirms the important problem statement matches what the 31 interviews surfaced.
- [x] Mei confirms the team advantage statement is honest, not flattering.
- [x] Mei confirms the competitor map including "doing nothing" as the dominant alternative.
- [x] Mei accepts the note-and-vote outcome on target customer specificity.

**Signed:** Mei, 2026-05-18 11:35 PT
