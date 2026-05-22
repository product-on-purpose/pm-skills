---
artifact: prioritization-framework
version: "1.0"
created: 2026-05-21
status: complete
context: Project-management SaaS - prioritizing 6 candidate features for the Q3 roadmap with RICE + ICE + MoSCoW
---

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
