---
title: "Discover Journey Map: Storevine Procure-to-Renew"
description: "Storevine B2B AI inventory forecasting - multi-actor procurement-to-renewal journey with a cyclical usage loop."
artifact: journey-map
version: "1.0"
repo_version: "2.18.0"
skill_version: "1.0.0"
created: 2026-05-21
status: sample
thread: storevine
context: Storevine B2B inventory-forecasting platform - mid-market e-commerce buying group from vendor research to annual renewal
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Storevine sells AI inventory forecasting to mid-market e-commerce companies (200-2000 employees). The PM wants a journey map for the full procure-to-renew arc to find where deals stall and where renewals are won or lost. This is a B2B buying-group journey: the Ops manager champions it, but Finance controls budget and IT controls the data integration. The map uses the **multi-actor pattern** with parallel tables per actor. All figures and quotes are illustrative and tagged `[fictional]`.

**Complexity warning:** this is a multi-actor journey, which is harder to validate than a single-persona map. Research depth here prioritizes the primary actor (Ops manager); Finance and IT tracks are lighter and carry more Hypothesis-labeled entries. Mermaid is simplified to the primary actor's path; the secondary actors intersect at the Evaluates and Decides stages.

**Source Notes:**

- Gartner, "The B2B Buying Journey" (Brent Adamson et al.) - the model of a buying group of multiple stakeholders running parallel, non-linear "buying jobs" rather than one buyer moving down a funnel; this is why the map uses parallel actor tracks instead of a single line.
- Brent Adamson, Matthew Dixon, Pat Spenner, Nick Toman, "The Challenger Customer" (Portfolio, 2015) - the role of the internal champion (Mobilizer) and the need to build consensus across a skeptical buying group.
- Jim Kalbach, "Mapping Experiences" (O'Reilly, 2016) - the technique for mapping multiple actors with shared touchpoints and intersection points.

---

## Prompt

```
/journey-map

map the full procure-to-renew journey for storevine (B2B AI inventory
forecasting, sold to mid-market e-commerce, 200-2000 employees).

it's a buying group, not one buyer:
- Ops manager = champion, lives in the forecasting pain daily
- Finance = approves the budget, cares about ROI and contract terms
- IT = owns the data integration and security review, can veto

stages: discovers -> evaluates (RFP + demo) -> pilots -> decides
(contract) -> onboards (data integration) -> uses (monthly forecast
cycle, recurring) -> renews (annual review, recurring).

the scary transition is pilot -> onboarding: the pilot uses clean sample
data and looks great, then real data integration is messy and the
accuracy people were promised wobbles. that's where trust is won or lost.

multi-actor, so use parallel tables per actor. the usage + renewal stages
are cyclical.
```

---

## Output

# Customer Journey Map: Storevine Procure-to-Renew - Multi-Actor Buying Group

> Multi-actor journey. Primary actor: Ops manager (well-researched). Secondary actors: Finance and IT (lighter signal, more Hypothesis entries). Validate the secondary tracks before acting on them.

## Executive Summary

This map covers a mid-market e-commerce buying group from first vendor research through the first annual renewal. Three actors run parallel buying jobs: the Ops manager champions the purchase, Finance gates the budget, and IT gates the integration and security review. The decisive moment of truth is the **pilot-to-onboarding transition**: the pilot runs on clean sample data and forecasts look excellent, but real data integration is messy and the promised accuracy wobbles. Deals and renewals are won or lost there. The largest opportunity is making onboarding accuracy match pilot accuracy by setting expectations during the pilot and de-risking the data integration. Grounded in 6 buyer interviews and 2 won/lost deal reviews [fictional].

## Actors

- **Ops manager (primary / champion):** owns the forecasting pain, runs the evaluation, will use the product daily.
- **Finance (budget approver):** cares about ROI, payback period, and contract flexibility. Engages mainly at Evaluates and Decides.
- **IT / security (gatekeeper):** owns data integration and the security review. Can veto. Engages at Evaluates (security review) and Onboards (integration).

## Journey Scope

- **Journey type:** Multi-actor; linear through Decides, then cyclical (Uses monthly, Renews annually)
- **Included:** Vendor research through the first annual renewal (roughly a 12-15 month arc)
- **Excluded:** Expansion / cross-sell to other teams, churn win-back

## Stages (shared spine)

| # | Stage | Primary goal (Ops) | Duration | Entry trigger | Exit criterion |
|---|---|---|---|---|---|
| 1 | Discovers | Find a fix for stockouts and overstock | Days-weeks | A bad forecasting quarter | Shortlists vendors |
| 2 | Evaluates | Prove this vendor is credible and safe | 3-6 weeks | RFP issued | Pilot agreed or vendor dropped |
| 3 | Pilots | See accuracy on our own data | 4-8 weeks | Pilot scoped | Pilot results reviewed |
| 4 | Decides | Get budget and integration sign-off | 2-4 weeks | Pilot succeeds | Contract signed or no-deal |
| 5 | Onboards | Connect real data, hit live accuracy | 3-6 weeks | Contract signed | First live forecast produced |
| 6 | Uses (loop) | Run a reliable monthly forecast cycle | Monthly, ongoing | Monthly data refresh | Forecast actioned |
| 7 | Renews (loop) | Justify the annual spend | Annual | Renewal date approaches | Renews or churns |

## Touchpoints per Stage (shared)

| Stage | Touchpoint | Channel | What happens |
|---|---|---|---|
| Discovers | Category research, peer referrals | Web, network | Builds a vendor shortlist |
| Evaluates | RFP response, sales demo | Doc, call | Sees forecasting on sample data |
| Evaluates | Security questionnaire | Doc / portal | IT reviews data handling |
| Pilots | Pilot environment | Product | Runs forecasts on a sample of real data |
| Decides | Business case + contract redline | Doc | Finance reviews ROI and terms |
| Onboards | Data integration / ETL setup | Product, IT | Connects live inventory + sales data |
| Uses | Monthly forecast run + dashboard | Product | Generates reorder recommendations |
| Renews | Annual business review (QBR-driven) | Call | Reviews realized value vs. spend |

## Emotional Curve - Ops manager (primary)

| Stage | Dominant emotion | Confidence | Source |
|---|---|---|---|
| Discovers | Frustration with the status quo, hope | High | 6 interviews; all cited a specific bad quarter [fictional] |
| Evaluates | Cautious interest, fear of overpromising | Medium | Interviews; demos seen as "too clean" [fictional] |
| Pilots | Excitement (pilot looks great) | High | Pilot accuracy on sample data impressed every interviewee [fictional] |
| Onboards | Anxiety, then either relief or betrayal | High | The pilot-to-live accuracy gap was the most-cited risk [fictional] |
| Uses | Routine confidence (if accuracy holds) | Medium | Hypothesis from 2 live customers [fictional] |
| Renews | Pride or quiet regret | Medium | Renewal intent tracked realized accuracy [fictional] |

## Emotional Curve - Finance and IT (secondary, lighter signal)

| Actor | Stage | Dominant emotion | Confidence | Source |
|---|---|---|---|---|
| Finance | Decides | Skeptical scrutiny of ROI claims | Medium | 2 deal reviews; ROI math was the sticking point [fictional] |
| Finance | Renews | Wants proof of realized savings | Low | Hypothesis; not directly interviewed [fictional] |
| IT | Evaluates | Guarded; security-review burden | Medium | Security questionnaire was a common delay [fictional] |
| IT | Onboards | Stress over data quality and integration effort | Low | Hypothesis; inferred from sales-cycle notes [fictional] |

## Pain Points and Moments of Truth

| Stage | Actor | Pain / Moment of Truth | Severity (1-5) | Evidence | Implication |
|---|---|---|---|---|---|
| Evaluates | IT | Slow security review stalls the deal | 4 | IT review added weeks in 2 of 2 deals [fictional] | Pre-package security docs to remove the bottleneck |
| Pilots | Ops | Pilot accuracy on clean sample data | 3 | Pilots consistently impress [fictional] | Beware: pilot success sets an expectation live data may miss |
| Onboards | Ops + IT | Pilot-to-live accuracy gap | Moment of Truth (5) | Most-cited deal/renewal risk [fictional] | This decides trust; close the gap or set expectations during the pilot |
| Decides | Finance | ROI case feels speculative | 4 | ROI math stalled both reviewed deals [fictional] | Tie the business case to pilot-measured accuracy, not generic benchmarks |
| Uses | Ops | First live forecast is wrong and nobody flags it | 4 | Hypothesis [fictional] | Add a confidence/anomaly flag so a bad forecast is caught before it is actioned |

## Opportunities

| Stage | Opportunity | Product / GTM change | Effort (rough) |
|---|---|---|---|
| Evaluates | Unblock IT review | Ship a pre-filled security packet (SOC 2, data-handling, DPA) | Small |
| Pilots | Set honest accuracy expectations | Show pilot results with a "live data will differ" band and explain why | Small |
| Onboards | Close the pilot-to-live gap | Guided data-quality check + an onboarding accuracy SLA with a named owner | Large |
| Decides | Make ROI concrete | Auto-generate a business case from the pilot's measured accuracy and the customer's own stockout cost | Medium |
| Uses | Catch bad forecasts early | Confidence score + anomaly flag on each monthly forecast | Medium |

## Visual (simplified to the primary actor)

```
timeline
    title Storevine Procure-to-Renew (Ops manager path)
    Discovers : Bad forecasting quarter : Shortlist vendors
    Evaluates : RFP : Demo : Security review
    Pilots : Forecast on sample data
    Decides : Business case : Contract
    Onboards : Live data integration (moment of truth)
    Uses : Monthly forecast cycle (recurring)
    Renews : Annual business review (recurring)
```

Cyclical usage and renewal loop:

```
flowchart LR
    A[Monthly data refresh] --> B[Forecast run]
    B --> C[Reorder actioned]
    C --> A
    C --> D[Annual review]
    D -->|renews| A
```

Finance intersects the spine at Decides and Renews; IT intersects at Evaluates and Onboards.

## Research Gaps

- The Finance and IT tracks are mostly Hypothesis: neither actor was interviewed directly, only inferred from deal reviews [fictional]. Interviewing 3-4 Finance and IT stakeholders would replace the weakest entries.
- The Uses-stage emotions rest on 2 live customers [fictional]; not enough to generalize. A post-onboarding survey at 30 and 90 days would strengthen this.
- The pilot-to-live accuracy gap is the load-bearing finding but is currently anecdotal. Instrumenting pilot accuracy vs. first-live-forecast accuracy across deals would quantify it and validate the central moment of truth.
