---
title: "Define Prioritization Framework: Brainshelf Q3 Features"
description: "Brainshelf B2C - prioritizing 8 Q3 features with RICE + ICE + MoSCoW; two divergent items reveal RICE's reach bias."
artifact: prioritization-framework
version: "1.0"
repo_version: "2.18.0"
skill_version: "1.0.0"
created: 2026-05-21
status: sample
thread: brainshelf
context: Brainshelf consumer book-curation app - prioritizing 8 candidate features for the Q3 roadmap
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Brainshelf is a B2C AI book-curation subscription. The PM has 8 candidate features for Q3 and engagement plus engineering estimates, so RICE and ICE both run, with MoSCoW as a scope-bounding view. The lesson is two divergent items (Mobile app, Family plan) that expose RICE's reach bias. All reach/impact/effort numbers are illustrative PM inputs for this scenario `[fictional]`.

**Source Notes:**

- Sean McBride, "RICE: Simple prioritization for product managers" (Intercom, intercom.com) - the RICE formula and the 0.25-3 impact scale used here originate from Intercom's framework.
- Sean Ellis (GrowthHackers) - the ICE framework (Impact, Confidence, Ease) originated for prioritizing growth experiments; used here as the lower-input complement to RICE.
- Dai Clegg, DSDM (MoSCoW) - the Must/Should/Could/Won't commitment buckets used for the Q3 scope bound.

---

## Prompt

```
/prioritization-framework

prioritize our Q3 candidate features for brainshelf (AI book-curation
subscription). decision context: Q3 roadmap, ~14 eng-weeks of capacity.

features (i have engagement data + eng estimates):
1. rec algorithm v2   2. social follow-friends   3. mobile app
4. public reading profiles   5. reading streaks   6. audiobook recs
7. export to goodreads   8. family plan

run whatever frameworks apply and show me where they disagree.
```

---

## Output

# Prioritization: Brainshelf Q3 Roadmap Candidates

## Applicability Filter Summary

Reach, impact, effort, and confidence are available, so **RICE** and **ICE** both run. The decision bounds Q3 scope (~14 eng-weeks), so **MoSCoW** runs as a commitment view. **Weighted Scoring** is excluded (no competing stakeholder criteria provided). **Kano** is excluded: no customer-research data. A Kano survey on these eight features would unlock it.

## Inputs Summary

Eight Q3 candidates with PM-supplied estimates (illustrative `[fictional]`). Reach is users affected per quarter; effort in eng-weeks.

## Per-Framework Scoring

### RICE

| Item | Reach/qtr | Impact (0.25-3) | Conf (%) | Effort (wk) | RICE | Notes |
|---|---|---|---|---|---|---|
| Reading streaks | 35,000 | 1 | 60% | 2 | 10,500 | Cheap retention lever |
| Rec algorithm v2 | 40,000 | 2 | 70% | 6 | 9,333 | Core value prop |
| Mobile app | 30,000 | 2 | 80% | 12 | 4,000 | Big reach, big build |
| Export to Goodreads | 8,000 | 0.5 | 90% | 1 | 3,600 | Trivial, high confidence |
| Social follow-friends | 25,000 | 1 | 50% | 5 | 2,500 | Speculative |
| Audiobook recs | 20,000 | 1 | 50% | 4 | 2,500 | Speculative |
| Family plan | 6,000 | 2 | 70% | 4 | 2,100 | Narrow reach, high per-user value |
| Public reading profiles | 15,000 | 0.5 | 60% | 3 | 1,500 | Low impact |

### ICE

| Item | Impact (1-10) | Conf (1-10) | Ease (1-10) | ICE | Notes |
|---|---|---|---|---|---|
| Export to Goodreads | 4 | 9 | 9 | 324 | Trivial, well-understood |
| Family plan | 7 | 7 | 6 | 294 | High per-user value |
| Reading streaks | 6 | 6 | 8 | 288 | Cheap and solid |
| Rec algorithm v2 | 9 | 7 | 4 | 252 | High value, harder |
| Audiobook recs | 6 | 5 | 6 | 180 | Middling |
| Mobile app | 8 | 8 | 2 | 128 | Valuable but a 12-week slog |
| Public reading profiles | 3 | 6 | 7 | 126 | Low value |
| Social follow-friends | 5 | 5 | 5 | 125 | Speculative |

### MoSCoW (Q3 scope, ~14 eng-weeks)

| Item | Bucket | Rationale | Risk if dropped |
|---|---|---|---|
| Rec algorithm v2 | Must | The product's core promise | Erodes the differentiator |
| Reading streaks | Should | Cheap retention win | Slower habit formation |
| Export to Goodreads | Should | Cheap, reduces lock-in anxiety | Minor friction |
| Family plan | Should | New revenue line | Forgone revenue |
| Mobile app | Could | 12 eng-weeks blows most of Q3 | Mobile users wait |
| Audiobook recs | Could | Nice expansion | None critical |
| Social follow-friends | Won't (this time) | Low confidence | Defer until validated |
| Public reading profiles | Won't (this time) | Low impact | None |

## Per-Framework Ranking Output

Each scoring table above is sorted high to low, so the per-framework ranking is the row order shown (top item first, lowest last). The side-by-side rank positions, and the items where the frameworks disagree, are consolidated in the Cross-Framework Comparison below.

## Cross-Framework Comparison

| Item | RICE rank | ICE rank | MoSCoW | Agreement |
|---|---|---|---|---|
| Reading streaks | 1 | 3 | Should | Strong |
| Rec algorithm v2 | 2 | 4 | Must | Strong |
| Mobile app | 3 | 6 | Could | Divergent |
| Export to Goodreads | 4 | 1 | Should | Close |
| Social follow-friends | 5 | 8 | Won't | Mostly agree (RICE 5th, borderline) |
| Audiobook recs | 6 | 5 | Could | Close |
| Family plan | 7 | 2 | Should | Divergent |
| Public profiles | 8 | 7 | Won't | Agree (defer) |

**Divergent - Mobile app (RICE 3rd, ICE 6th):** RICE rewards the 30,000 reach; ICE punishes Ease (2) because it is a 12-week build. Driver: reach vs. effort. With only 14 eng-weeks, the effort signal should win for Q3 - hence MoSCoW Could.

**Divergent - Family plan (RICE 7th, ICE 2nd):** RICE's reach term punishes the narrow 6,000 reach; ICE rewards the high per-user impact and decent ease. Driver: RICE under-weights revenue-concentrated features. Because Family plan opens a new revenue line, weight the ICE/MoSCoW view and keep it as a Should.

## Executive Summary with Recommendation

Fund **Rec algorithm v2** and **Reading streaks**: both score high across frameworks and fit the budget. Add the two cheap, high-confidence items - **Export to Goodreads** (1 week) and **Family plan** (4 weeks) - the latter despite a low RICE rank, because RICE undervalues its concentrated revenue impact. That fills ~13 of 14 eng-weeks. **Defer Mobile app** to a quarter with capacity for a 12-week build, and **drop Public profiles** (all three frameworks agree) and **Social follow-friends** (ICE and MoSCoW both defer it; RICE ranks it a borderline 5th) this cycle. The one judgment call is Family plan: if new revenue is not a Q3 goal, swap it for Audiobook recs.

## Sensitivity / What Changes the Ranking

- If Mobile app effort were 6 weeks (not 12), its ICE Ease rises and it becomes a credible Should.
- If Rec algorithm v2 confidence dropped below 50%, Reading streaks becomes the clear single priority.
- Family plan's standing depends entirely on whether Q3 has a revenue goal; with one, it is a Must.

## Recommendations (Sequencing)

- **Fund now:** Rec algorithm v2, Reading streaks, Export to Goodreads, Family plan
- **Defer:** Mobile app (needs a low-effort quarter), Audiobook recs
- **Drop this cycle:** Social follow-friends, Public reading profiles
- **Data that would change this:** A Kano survey to confirm which features are delighters vs. table stakes; a firmer mobile-app effort estimate

## Limitations and Biases

- RICE under-ranked Family plan purely on reach; do not let it auto-cut revenue-concentrated features.
- No sequencing dependencies are modeled (e.g., Family plan may need billing changes first).
- Every score is a PM estimate; a Kano survey would replace the guessed impact values with customer signal.
