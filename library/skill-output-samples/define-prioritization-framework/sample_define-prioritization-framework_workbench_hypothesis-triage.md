---
title: "Define Prioritization Framework: Workbench Hypothesis Triage"
description: "Workbench internal dev-experience - triaging 30 backlog ideas to 5 with ICE + Weighted Scoring; Kano gated out; scaffold offered."
artifact: prioritization-framework
version: "1.0"
repo_version: "2.18.0"
skill_version: "1.0.0"
created: 2026-05-21
status: sample
thread: workbench
context: Workbench internal dev-experience platform - triaging a 30-idea backlog to 5 for the next sprint
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Workbench is an internal developer-experience platform. The team has 30 backlog ideas and needs to pick 5 for the next sprint. It is early-stage with no per-idea data, so **ICE** runs (always applicable) and **Weighted Scoring** runs because the team has explicit criteria (developer velocity, adoption risk, technical debt impact). **Kano** is gated out (no customer research; for an internal tool, the "customers" are engineers and no survey was run). **RICE** is not run, but an estimation scaffold is offered for the top 5 before committing engineering. Scores are illustrative `[fictional]`.

**Source Notes:**

- Sean Ellis (GrowthHackers) - ICE, used as the always-applicable triage method for a large early-stage backlog.
- Decision-matrix / weighted-scoring practice (multi-criteria decision analysis) - the team's three explicit criteria are scored and combined with stated weights; equal weighting is treated as an explicit choice, not a default to hide.
- Noriaki Kano, "Attractive Quality and Must-Be Quality" (1984) - the basis for the Kano framework that is gated out here for lack of customer-research input.

---

## Prompt

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

## Output

# Prioritization: Workbench Dev-Experience Backlog Triage (30 to 5)

## Applicability Filter Summary

No per-idea reach/effort data, so **RICE** is not run (an estimation scaffold is offered for the finalists below). **ICE** runs (always applicable). **Weighted Scoring** runs because you provided three explicit criteria. **MoSCoW** is excluded: you need a relative ranking across 30 ideas to pick 5, not per-item binary commitment buckets, so the cut is made after ranking rather than via Must/Should/Could/Won't. **Kano** is gated out: it needs customer-research input, and no engineer survey was run - to unlock it, run a quick Kano survey of the engineering org on the top ideas.

> **Weights are a choice.** You gave three criteria but no weights, so I am applying equal weights (33% each) as a starting point. Equal weighting is itself a decision - if developer velocity matters most to you right now, raise its weight and the ranking will shift (see Sensitivity).

## Inputs Summary

Thirty ideas; the 12 strongest contenders are scored below. The remaining ~18 are smaller polish items that scored well under the contenders on a quick ICE pass and are not in sprint contention this round. Scores are coarse judgment (illustrative `[fictional]`).

## Per-Framework Scoring

### ICE (top 12 contenders)

| Item | Impact (1-10) | Conf (1-10) | Ease (1-10) | ICE | Notes |
|---|---|---|---|---|---|
| One-command dev env | 9 | 8 | 5 | 360 | Kills the worst onboarding pain |
| Better build error messages | 7 | 9 | 8 | 504 | Cheap, high adoption |
| PR template + checks | 6 | 9 | 9 | 486 | Trivial, sticks |
| Flaky-test detection | 8 | 8 | 6 | 384 | Restores trust in CI |
| Faster CI pipeline | 9 | 7 | 4 | 252 | High value, hard |
| Onboarding golden path | 8 | 7 | 6 | 336 | Compounds with dev env |
| Local secrets management | 7 | 7 | 6 | 294 | Removes a sharp edge |
| Dep-upgrade bot | 6 | 8 | 7 | 336 | Chips at tech debt |
| Standard logging library | 6 | 7 | 5 | 210 | Long-term debt win |
| Service catalog | 7 | 6 | 4 | 168 | Valuable but heavy |
| Auto-generated API docs | 5 | 7 | 6 | 210 | Nice, not urgent |
| Incident runbook automation | 6 | 6 | 4 | 144 | Niche, harder |

### Weighted Scoring (top 8 by ICE; equal 33% weights, flagged above)

Criteria scored 1-10: Developer velocity, Adoption likelihood (inverse of adoption risk), Tech-debt reduction.

| Item | Dev velocity (33%) | Adoption (33%) | Tech-debt (33%) | Weighted |
|---|---|---|---|---|
| Better build error messages | 7 | 9 | 4 | 6.7 |
| One-command dev env | 9 | 8 | 5 | 7.3 |
| PR template + checks | 5 | 9 | 6 | 6.7 |
| Flaky-test detection | 8 | 7 | 7 | 7.3 |
| Onboarding golden path | 7 | 7 | 4 | 6.0 |
| Dep-upgrade bot | 4 | 8 | 9 | 7.0 |
| Faster CI pipeline | 9 | 8 | 5 | 7.3 |
| Local secrets management | 6 | 7 | 6 | 6.3 |

## Per-Framework Ranking Output

The ICE and Weighted Scoring tables above are listed in contender order, not score order. Sorted high to low:

- **ICE:** Better build error messages (504) > PR template + checks (486) > Flaky-test detection (384) > One-command dev env (360) > Onboarding golden path / Dep-upgrade bot (336, tie) > Local secrets management (294) > Faster CI pipeline (252) > Standard logging library / Auto-generated API docs (210, tie) > Service catalog (168) > Incident runbook automation (144).
- **Weighted Scoring:** One-command dev env / Flaky-test detection / Faster CI pipeline (7.3, tie) > Dep-upgrade bot (7.0) > Better build error messages / PR template + checks (6.7, tie) > Local secrets management (6.3) > Onboarding golden path (6.0).

The side-by-side rank positions are consolidated in the Cross-Framework Comparison below.

## Cross-Framework Comparison

| Item | ICE rank | Weighted rank | Agreement |
|---|---|---|---|
| Better build error messages | 1 | 5 (tie) | Strong |
| PR template + checks | 2 | 5 (tie) | Strong |
| Flaky-test detection | 3 | 1 (tie) | Strong |
| One-command dev env | 4 | 1 (tie) | Strong |
| Onboarding golden path | 5 | 8 | Close |
| Dep-upgrade bot | 6 | 4 | Divergent (up) |
| Local secrets management | 7 | 7 | Strong |
| Faster CI pipeline | 8 | 1 (tie) | Divergent (up) |

**Strong top-5 agreement:** Both frameworks put One-command dev env, Better build error messages, PR template + checks, and Flaky-test detection in the top tier. The fifth slot is contested.

**Divergent - Dep-upgrade bot (ICE 6th, Weighted 4th) and Faster CI (ICE 8th, Weighted top tie):** ICE penalizes their lower Ease, but Weighted Scoring rewards their high tech-debt reduction and developer velocity. Driver: the criteria you chose explicitly value tech-debt and velocity, which a raw ICE Ease score discounts. This is why running both helped.

## Executive Summary with Recommendation

Four ideas top both frameworks and form the sprint core: **One-command dev env, Better build error messages, PR template + checks, Flaky-test detection**. For the fifth slot, the frameworks diverge: ICE favors Onboarding golden path; Weighted Scoring favors Faster CI or Dep-upgrade bot because your stated criteria reward velocity and tech-debt reduction. **Take Faster CI as the fifth** if you trust your own weighting (you said velocity matters), or swap to Onboarding golden path if first-week experience is the current priority. Before committing the sprint, fill in the RICE estimation scaffold for these 5 to confirm effort fits capacity.

## Sensitivity / What Changes the Ranking

- If you weight developer velocity to 50% (from 33%), Faster CI and One-command dev env pull clearly ahead and Dep-upgrade bot rises - confirming the fifth slot should be Faster CI.
- If you weight tech-debt to 50%, Dep-upgrade bot and Standard logging library climb into contention.
- The top 4 are stable under any reasonable weighting; only the 5th slot moves.

## Recommendations (Sequencing)

- **Sprint (5):** One-command dev env, Better build error messages, PR template + checks, Flaky-test detection, Faster CI pipeline
- **Next in line:** Onboarding golden path, Dep-upgrade bot
- **Estimation scaffold (offered):** for the 5 finalists, provide Effort (eng-weeks) and target adoption to run a RICE cross-check before locking the sprint
- **Data that would change this:** a Kano survey of the engineering org to confirm which improvements are must-haves vs. delighters

## Limitations and Biases

- The equal-weight Weighted Scoring is a starting assumption; your real priorities should set the weights (see Sensitivity).
- ICE's Ease term discounts high-value-but-hard tech-debt work; the Weighted view corrected for that, which is why both were run.
- Kano was gated out; without it, "adoption likelihood" is a guess. An engineer survey would replace it with signal.
