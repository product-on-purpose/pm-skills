---
title: "Prioritization Framework"
description: "Run applicable prioritization frameworks (RICE, ICE, MoSCoW, Weighted Scoring, Kano) against a list of features or initiatives. Produces a comparison table showing where rankings agree and diverge across frameworks, and an executive summary with recommendation. Framework applicability is filtered by data availability; Kano requires customer research. Refuses to fabricate scores; produces an estimation scaffold when input data is missing."
generated: true
source: scripts/generate-skill-pages.py
tags:
  - Define
  - planning
---

:::note[Quick facts]
**Phase:** Define | **Version:** 1.0.0 | **Category:** planning | **License:** Apache-2.0
:::

**Try it:** `/prioritization-framework "Your context here"`

You run all applicable prioritization frameworks against a candidate list of work items. Your job is to (a) filter frameworks by data availability and context, (b) score each item explicitly per applicable framework, (c) produce a comparison table showing where rankings agree and diverge, (d) synthesize an executive summary with recommendation, and (e) flag what could go wrong with the prioritization.

## How to Use

Use the `/prioritization-framework` slash command:

```
/prioritization-framework "Your context here"
```

Or reference the skill file directly: `skills/define-prioritization-framework/SKILL.md`

## Output Template

# Prioritization: [Decision Context]

## Applicability Filter Summary
<!-- Which frameworks ran, which were excluded, and why. Note what would unlock an excluded framework. -->

- **Ran:** [e.g., RICE, ICE, MoSCoW]
- **Excluded:** [e.g., Kano - no customer research; Weighted Scoring - single criterion]

## Inputs Summary
<!-- What you were given. Flag any missing or assumed input. -->

[Item list and available data per item; note assumptions]

## Per-Framework Scoring

### RICE
<!-- Score = (Reach * Impact * Confidence) / Effort -->

| Item | Reach (users/qtr) | Impact (0.25-3) | Confidence (%) | Effort (eng-wk) | RICE Score | Notes |
|---|---|---|---|---|---|---|
| [Item A] | [N] | [0.25-3] | [%] | [N] | [score] | [note] |

### ICE
<!-- Score = Impact * Confidence * Ease, each 1-10 -->

| Item | Impact (1-10) | Confidence (1-10) | Ease (1-10) | ICE Score | Notes |
|---|---|---|---|---|---|
| [Item A] | [N] | [N] | [N] | [score] | [note] |

### MoSCoW

| Item | Bucket (Must/Should/Could/Won't) | Rationale | Risk if dropped |
|---|---|---|---|
| [Item A] | [Bucket] | [Why] | [Risk] |

<!-- Add Weighted Scoring and/or Kano tables here only if those frameworks passed the applicability filter. -->

## Per-Framework Ranking Output
<!-- For each scored framework, list items sorted high-to-low by score. With 5+ items, call out the top 5 and bottom 5 and name the score gap between them. (If the scoring tables above are already sorted, summarize the ranking here rather than repeating.) -->

- **RICE ranking:** [items sorted by score, high to low]
- **ICE ranking:** [items sorted by score, high to low]

## Cross-Framework Comparison
<!-- Rank position per item across frameworks. Explain every Divergent row by naming the driving dimension. -->

| Item | RICE rank | ICE rank | MoSCoW bucket | Agreement |
|---|---|---|---|---|
| [Item A] | [1] | [1] | [Must] | [Strong] |
| [Item B] | [2] | [8] | [Should] | [Divergent - why] |

## Executive Summary with Recommendation
<!-- 3-5 sentences: what to prioritize, what to defer, what the key divergence means -->

[Recommendation]

## Sensitivity / What Changes the Ranking
<!-- 2-3 cases where the order flips, focused on items near the cut line -->

- [If Confidence on Item X is wrong, then ...]
- [If Effort on Item Y doubles, then ...]

## Recommendations (Sequencing)

- **Fund now:** [Items]
- **Defer / drop:** [Items]
- **Data that would change this:** [What to gather]

## Limitations and Biases
<!-- What the frameworks do NOT measure; where they could mislead -->

- [Limitation 1]
- [Limitation 2]

## Example Output

<details>
<summary>Prioritization: Q3 Roadmap Candidates (Project-Management SaaS)</summary>

# Prioritization: Q3 Roadmap Candidates (Project-Management SaaS)

> All reach, impact, effort, and confidence values below are illustrative `[fictional]` PM inputs for this scenario; replace them with your own estimates.

## Applicability Filter Summary

We have reach, impact, effort, and confidence estimates per feature, so **RICE** and **ICE** both run. The decision also bounds Q3 scope, so **MoSCoW** runs as a commitment view. **Weighted Scoring** is excluded (no competing multi-stakeholder criteria were provided). **Kano** is excluded: no customer-research data was supplied. To unlock Kano, run a Kano survey on these six features.

## Inputs Summary

Six Q3 candidate features with PM-supplied estimates. Reach is measured in affected users per quarter; effort in engineering-weeks. Confidence reflects how solid the estimates are.

## Per-Framework Scoring

### RICE
<!-- Score = (Reach * Impact * Confidence) / Effort -->

| Item | Reach (users/qtr) | Impact (0.25-3) | Confidence (%) | Effort (eng-wk) | RICE Score | Notes |
|---|---|---|---|---|---|---|
| Guest sharing links | 5,000 | 1 | 80% | 1 | 4,000 | Cheap, broad |
| Bulk task editing | 8,000 | 1 | 90% | 2 | 3,600 | High-confidence quick win |
| Mobile offline mode | 12,000 | 2 | 60% | 8 | 1,800 | Big reach, big effort |
| SSO / SAML | 2,000 | 3 | 90% | 4 | 1,350 | Narrow reach, high per-user impact |
| Custom dashboards | 4,000 | 2 | 70% | 5 | 1,120 | Mid on everything |
| AI task suggestions | 15,000 | 1 | 40% | 10 | 600 | Huge reach, low confidence, high effort |

### ICE
<!-- Score = Impact * Confidence * Ease, each 1-10 -->

| Item | Impact (1-10) | Confidence (1-10) | Ease (1-10) | ICE Score | Notes |
|---|---|---|---|---|---|
| SSO / SAML | 9 | 9 | 6 | 486 | High-value, well-understood |
| Guest sharing links | 6 | 8 | 9 | 432 | Easy and solid |
| Bulk task editing | 6 | 9 | 8 | 432 | Easy and solid |
| Custom dashboards | 7 | 7 | 5 | 245 | Middling |
| Mobile offline mode | 8 | 6 | 3 | 144 | Valuable but hard |
| AI task suggestions | 7 | 4 | 2 | 56 | Speculative and hard |

### MoSCoW (Q3 scope bound)

| Item | Bucket | Rationale | Risk if dropped |
|---|---|---|---|
| SSO / SAML | Must | Three enterprise deals are blocked on it | Lose committed enterprise revenue |
| Guest sharing links | Must | Competitive parity; churn risk without it | Continued competitive losses |
| Bulk task editing | Should | High-value quick win | Slower power-user workflows |
| Custom dashboards | Should | Requested but not blocking | Mild dissatisfaction |
| Mobile offline mode | Could | Valuable but 8 eng-weeks | Mobile users wait another quarter |
| AI task suggestions | Won't (this time) | Low confidence, 10 eng-weeks | Defer until validated |

## Cross-Framework Comparison

| Item | RICE rank | ICE rank | MoSCoW bucket | Agreement |
|---|---|---|---|---|
| Guest sharing links | 1 | 2 | Must | Strong |
| Bulk task editing | 2 | 3 | Should | Strong |
| Mobile offline mode | 3 | 5 | Could | Divergent |
| SSO / SAML | 4 | 1 | Must | Divergent |
| Custom dashboards | 5 | 4 | Should | Close |
| AI task suggestions | 6 | 6 | Won't | Strong (agree: defer) |

**Divergent - SSO / SAML (RICE 4th, ICE 1st, MoSCoW Must):** RICE's Reach term punishes SSO because it only touches 2,000 users. ICE has no reach term, so SSO's high per-user impact and high confidence push it to the top. MoSCoW agrees with ICE because the 2,000 users are concentrated, high-value enterprise accounts with blocked deals. **The divergence reveals that RICE under-weights revenue-concentrated features.** This is the most important finding in the analysis.

**Divergent - Mobile offline (RICE 3rd, ICE 5th):** RICE rewards the large reach (12,000); ICE penalizes the low Ease (3, an 8-week build). The driver is effort vs. reach.

## Executive Summary with Recommendation

Fund **Guest sharing** and **Bulk task editing** first: they top both scored frameworks and are cheap, so they are unambiguous wins. Fund **SSO / SAML** despite its 4th-place RICE score - the RICE Reach term misleads here because the 2,000 affected users are enterprise accounts with revenue already blocked, which ICE and MoSCoW both surface. Defer **AI task suggestions** (all three frameworks agree it is not ready). The recommendation is robust except for SSO, whose ranking depends entirely on whether you weight raw reach (RICE) or strategic revenue concentration (ICE + MoSCoW); given the blocked deals, weight the latter.

## Sensitivity / What Changes the Ranking

- If SSO's enterprise deals were not actually blocked, its Impact drops and it falls in ICE too, validating RICE's lower placement - so confirm the blocked-deal claim before committing.
- If Mobile offline's effort came in at 4 eng-weeks instead of 8, its RICE score doubles to 3,600 and it jumps to a clear Should.
- AI task suggestions stays last unless confidence rises above ~70%; a cheap spike to de-risk it would change its standing more than any other input.

## Recommendations (Sequencing)

- **Fund now:** Guest sharing, Bulk task editing, SSO / SAML
- **Fund if capacity allows:** Custom dashboards
- **Defer:** Mobile offline (revisit if effort drops), AI task suggestions (revisit after a confidence-building spike)
- **Data that would change this:** Confirm the SSO blocked-deal value; re-estimate Mobile offline effort; run a spike on AI suggestions

## Limitations and Biases

- RICE systematically under-ranks high-value, low-reach features (the SSO problem); do not let it auto-decide enterprise/strategic items.
- None of these frameworks measure sequencing dependencies (e.g., if SSO must ship before an enterprise launch). Pair this ranking with a roadmap view.
- All scores rest on PM estimates; the cross-framework agreement is only as good as those inputs.

</details>

## Real-World Examples

See this skill applied to three different product contexts:

<details>
<summary>Storevine (B2B): Storevine B2B forecasting platform - reducing a 12-feature MVP wishlist to a shippable 8</summary>

**Prompt:**

```
/prioritization-framework

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

**Output:**

# Prioritization: Storevine MVP Scope Reduction (12 to 8)

</details>

<details>
<summary>Brainshelf (Consumer): Brainshelf consumer book-curation app - prioritizing 8 candidate features for the Q3 roadmap</summary>

**Prompt:**

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

**Output:**

# Prioritization: Brainshelf Q3 Roadmap Candidates

</details>

<details>
<summary>Workbench (Enterprise): Workbench internal dev-experience platform - triaging a 30-idea backlog to 5 for the next sprint</summary>

**Prompt:**

```
/prioritization-framework

triage our dev-experience backlog and help us pick 5 for next sprint. we have
~30 ideas, no hard data per item. our team cares about three things:
developer velocity, adoption risk (will engineers actually use it), and
technical-debt impact.

top ideas include: one-command dev env, faster CI, better build error
messages, service catalog, auto API docs, local secrets mgmt, standard
logging lib, PR template+checks, flaky-test detection, dep-upgrade bot,
onboarding golden path, incident runbook automation ... (~18 more smaller).
```

---

**Output:**

# Prioritization: Workbench Dev-Experience Backlog Triage (30 to 5)

</details>

## Quality Checklist

Before finalizing, verify:

- [ ] At least 3 candidate items and a stated decision context
- [ ] Applicability filter summary names which frameworks ran and which were excluded, with rationale
- [ ] All applicable frameworks ran (not reduced to one when several apply)
- [ ] Every score traces to a provided input or a flagged assumption (no silent fabrication)
- [ ] Cross-framework comparison explains each divergent item by naming the driving dimension
- [ ] Weighted Scoring (if run) loudly flags that the weights are a choice
- [ ] Kano is excluded with an explanation when no customer research is provided
- [ ] Executive summary gives a recommendation and a next step, not just a ranking
