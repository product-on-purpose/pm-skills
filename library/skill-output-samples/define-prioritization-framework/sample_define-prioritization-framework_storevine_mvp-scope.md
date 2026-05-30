---
title: "Define Prioritization Framework: Storevine MVP Scope Reduction"
description: "Storevine B2B - cutting 12 MVP features to 8 with ICE + MoSCoW after RICE is excluded; MoSCoW rescues a hard dependency."
artifact: prioritization-framework
version: "1.0"
repo_version: "2.18.0"
skill_version: "1.0.0"
created: 2026-05-21
status: sample
thread: storevine
context: Storevine B2B forecasting platform - reducing a 12-feature MVP wishlist to a shippable 8
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Storevine is a B2B inventory-forecasting platform heading to its first launch. The team has 12 candidate MVP features and must cut to 8 to hit the deadline. There is no per-feature reach or effort data yet, so RICE cannot run; the skill offers an estimation scaffold and the user declines (not worth it pre-launch). **ICE** and **MoSCoW** run. The lesson: MoSCoW rescues API integration, a hard data dependency that ICE alone would rank too low to keep. ICE scores are illustrative `[fictional]`.

**Source Notes:**

- Sean Ellis (GrowthHackers) - the ICE framework, used here as the coarse-input prioritization method appropriate when RICE-grade estimates are unavailable.
- Dai Clegg, DSDM (MoSCoW) - the Must/Should/Could/Won't buckets, which encode hard launch dependencies that a pure score can miss.

---

## Prompt

```
define-prioritization-framework

we need to cut our storevine MVP from 12 features to 8 to hit the launch
date. it's a B2B inventory forecasting platform. i don't have reach numbers
or solid effort estimates per feature yet - it's pre-launch.

features: 1. demand forecast core  2. reorder recommendations
3. multi-warehouse  4. CSV data import  5. API integration (Shopify etc)
6. dashboard/reporting  7. low-stock alerts  8. user roles/permissions
9. forecast accuracy tracking  10. seasonal adjustment
11. supplier lead-time modeling  12. mobile view

what should we cut?
```

---

## Output

# Prioritization: Storevine MVP Scope Reduction (12 to 8)

## Applicability Filter Summary

You have no per-feature reach or effort estimates, so **RICE** cannot produce defensible scores. I offered an estimation scaffold to generate them; you declined as not worth it pre-launch. **ICE** runs (coarse estimates are acceptable) and **MoSCoW** runs (this is a scope-bounding cut). **Weighted Scoring** and **Kano** are excluded (no multi-stakeholder criteria; no customer research).

> RICE estimation scaffold (offered, declined): had you wanted RICE, I would have returned a worksheet asking, per feature, for Reach (target accounts in year 1), Impact (0.25-3), Confidence (%), and Effort (eng-weeks). You can re-invoke with those filled in if you want a RICE cross-check before committing engineering.

## Inputs Summary

Twelve MVP candidates, no quantitative reach/effort data. ICE scored on coarse 1-10 judgment (illustrative `[fictional]`).

## Per-Framework Scoring

### ICE

| Item | Impact (1-10) | Conf (1-10) | Ease (1-10) | ICE | Notes |
|---|---|---|---|---|---|
| CSV data import | 7 | 9 | 8 | 504 | Easy, unblocks everything |
| Demand forecast core | 10 | 9 | 5 | 450 | The product |
| Reorder recommendations | 9 | 8 | 6 | 432 | Core action layer |
| Dashboard / reporting | 7 | 8 | 6 | 336 | Table stakes |
| Low-stock alerts | 6 | 8 | 7 | 336 | Cheap value |
| Forecast accuracy tracking | 7 | 7 | 6 | 294 | Builds trust |
| User roles / permissions | 5 | 8 | 6 | 240 | B2B requirement |
| API integration (Shopify etc) | 8 | 7 | 4 | 224 | Valuable but harder |
| Supplier lead-time modeling | 7 | 6 | 4 | 168 | Advanced |
| Multi-warehouse | 6 | 7 | 3 | 126 | Heavy, niche at launch |
| Seasonal adjustment | 8 | 5 | 3 | 120 | High value, low confidence + hard |
| Mobile view | 4 | 7 | 4 | 112 | Low priority for a B2B tool |

### MoSCoW (MVP launch)

| Item | Bucket | Rationale | Risk if dropped |
|---|---|---|---|
| Demand forecast core | Must | No product without it | No MVP |
| Reorder recommendations | Must | The core user action | Forecast with no action to take |
| CSV data import | Must | One way to get data in | Empty product |
| API integration | Must | The other way to get data in; many customers cannot CSV | Locks out integration-first customers |
| Dashboard / reporting | Must | Users must see results | Forecasts with nowhere to view them |
| Low-stock alerts | Should | High-value, cheap | Less proactive value |
| Forecast accuracy tracking | Should | Builds trust early | Harder to prove value |
| User roles / permissions | Should | B2B buyers expect it | Security objections in sales |
| Seasonal adjustment | Could | Improves accuracy later | Slightly worse forecasts |
| Supplier lead-time modeling | Could | Advanced, post-MVP | Manual lead-time entry |
| Multi-warehouse | Won't (this time) | Heavy build, niche at launch | Single-warehouse customers only |
| Mobile view | Won't (this time) | Low priority for a desktop B2B workflow | Desktop-only |

## Per-Framework Ranking Output

Each scoring table above is sorted high to low, so the per-framework ranking is the row order shown (top item first, lowest last). The side-by-side rank positions, and the items where the frameworks disagree, are consolidated in the Cross-Framework Comparison below.

## Cross-Framework Comparison

| Item | ICE rank | MoSCoW | Agreement |
|---|---|---|---|
| CSV data import | 1 | Must | Strong |
| Demand forecast core | 2 | Must | Strong |
| Reorder recommendations | 3 | Must | Strong |
| Dashboard / reporting | 4 | Must | Strong |
| Low-stock alerts | 5 | Should | Strong |
| Forecast accuracy tracking | 6 | Should | Strong |
| User roles / permissions | 7 | Should | Strong |
| API integration | 8 | Must | Divergent |
| Supplier lead-time modeling | 9 | Could | Agree (defer) |
| Multi-warehouse | 10 | Won't | Agree (cut) |
| Seasonal adjustment | 11 | Could | Agree (defer) |
| Mobile view | 12 | Won't | Agree (cut) |

**Divergent - API integration (ICE 8th, MoSCoW Must):** ICE ranks it 8th because Ease is only 4. But MoSCoW marks it a Must because a meaningful share of customers cannot use CSV import and would be locked out at launch. **This is the rescue case:** if you cut by ICE rank alone (keep top 8), API integration survives at exactly 8th - but only barely, and a slightly different Ease score would have cut a load-bearing dependency. MoSCoW makes the dependency explicit so the cut is safe.

## Executive Summary with Recommendation

Ship the 5 Musts (Core forecast, Reorder recs, CSV import, API integration, Dashboard) plus the 3 Shoulds (Alerts, Accuracy tracking, Roles) - that is the 8. Cut Multi-warehouse and Mobile view (both frameworks agree) and defer Seasonal adjustment and Supplier lead-time to a fast-follow. The critical call is keeping **API integration** despite its mid ICE score: it is a hard data-ingestion dependency for integration-first customers, which MoSCoW surfaces and ICE does not. Before committing engineering, consider filling in the RICE scaffold for the four borderline items to sanity-check effort.

## Sensitivity / What Changes the Ranking

- If most launch customers can use CSV, API integration could slip to a fast-follow, freeing capacity for Seasonal adjustment.
- If Seasonal adjustment confidence rose (it is only 5), it would challenge Roles for the last Should slot.
- The cut list (Multi-warehouse, Mobile) is robust under any reasonable ICE re-scoring.

## Recommendations (Sequencing)

- **Ship in MVP (8):** Core forecast, Reorder recs, CSV import, API integration, Dashboard, Alerts, Accuracy tracking, Roles
- **Fast-follow:** Seasonal adjustment, Supplier lead-time modeling
- **Cut:** Multi-warehouse, Mobile view
- **Data that would change this:** Whether launch customers integrate via API or CSV; a RICE pass on the four borderline items

## Limitations and Biases

- ICE alone would have nearly cut API integration; pairing it with MoSCoW prevented a dependency miss. Do not run ICE solo for cut decisions.
- No effort estimates means the 8-feature set may still exceed capacity; validate with engineering before locking scope.
- Scores are coarse judgment, not data; a quick customer check on CSV-vs-API would de-risk the biggest call.
