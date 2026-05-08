---
title: "Foundation OKR Writer: Brainshelf Resurface Q3"
description: "Brainshelf prosumer knowledge tool. Resurface team Q3 2026 OKR set following the March 2026 algo v1 ship and beta validation."
artifact: foundation-okr-writer
version: "1.0"
repo_version: "2.12.0"
skill_version: "1.0.0"
created: 2026-05-01
status: canonical
thread: brainshelf
context: Brainshelf prosumer knowledge tool. Resurface team Q3 2026 OKR set following the March 2026 algo v1 ship and beta validation.
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Sample: foundation-okr-writer. Brainshelf Resurface Q3 2026 OKR Set

## Scenario

Brainshelf's Resurface team shipped algo v1 in March 2026 and validated it with the ~500-user beta cohort (per the existing `foundation-stakeholder-update` brainshelf sample). Beta users showed 3.4x retention versus matched non-Resurface controls [fictional]. Algo v1 has now rolled out to all activated users.

For Q3 2026, the Resurface PM priya-pm needs OKRs that move from "we proved Resurface works for early adopters" to "Resurface is the habit-forming reason members come back each week." The forcing function is a company-level OKR to increase 30-day member retention from 31% to 42% [fictional] by year-end.

The PM runs `/okr-writer` in Guided mode (default).

**Source Notes:**

- Brainshelf is fictional
- All metrics `[fictional]`
- Continuation of the brainshelf Resurface thread established in the `foundation-stakeholder-update` and `measure-experiment-results` brainshelf samples
- Hofmann's "habit loop" model and Cutler's North Star input-tree are the writer's underlying retention-mechanism heuristics

## Prompt

```
/okr-writer

Scope: Resurface team, Brainshelf
Cycle: Q3 2026 (July 1 to September 30)
Level: team
OKR type: aspirational

Strategic context:
- Company objective: increase 30-day member retention from 31% to 42%
  [fictional] by year-end 2026.
- Resurface team owns the algorithm-driven content surfacing system.
- Algo v1 shipped March 2026; beta cohort showed 3.4x retention lift
  vs control [fictional]; rolled out to all activated users in May.

Empowerment signal: empowered team. Leadership picks problems, team picks
KRs and bets.

Draft objective: "Resurface should be the reason people come back."

Candidate KRs (rough):
- More weekly engagement with Resurface
- Resurface-engaged users retain better
- Don't surface low-quality items

Constraints:
- Engineering capacity: 3 engineers, 1 ML engineer, 1 designer
- No new platform dependencies
- Cannot influence top-of-funnel acquisition (other teams)

Source of truth: company OKR doc in Linear at L-OKR-Q3-Resurface
```

## Output

```markdown
# OKR Set: Brainshelf Resurface Team, Q3 2026

(Mode: Guided. Empowered-team signal: empowered. Disclosure section omitted.)

## Context

- Scope: Resurface team
- Cycle: 2026-Q3 (July 1 to September 30, 2026)
- Level: team
- OKR type: aspirational
- Empowered-team signal: empowered (leadership assigns problem; team picks
  KRs and bets). No Disclosure section needed.
- Source of truth: Linear at L-OKR-Q3-Resurface. This artifact is a
  planning input, not the live tracker.
- Strategic input: Company OKR to increase 30-day member retention from
  31% to 42% [fictional] by year-end. Resurface is the largest single
  retention lever per H1 2026 cohort analysis (3.4x retention multiplier
  in the beta cohort vs control).
- Assumptions:
  - The 3.4x multiplier observed in beta will hold or attenuate at general
    rollout. Treated as working hypothesis; KR2 design lets us measure
    the actual multiplier on the broader population.
  - Algo v1 quality is good enough to scale. KR3 guardrail catches
    degradation if rollout reveals issues the beta did not.
  - Push notification infrastructure exists and is approved for
    Resurface use.

## Objective

Make Resurface the reason members come back to Brainshelf each week.

(One qualitative, directional statement. Replaces "the reason people
come back" with language that signals desired member behavior at a
specific cadence.)

## Key Results

- KR1: Increase weekly Resurface-active members from 22% to 41%
  [fictional] of activated members by 2026-09-30.
  - Metric: percentage of activated members who interact with at least
    one Resurface-surfaced item in any 7-day window, averaged over the
    trailing 4 weeks.
  - Baseline: 22% [fictional] (June 2026 trailing-4-week average,
    post-rollout).
  - Target: 41% [fictional] by 2026-09-30.
  - Evidence source: Mixpanel `resurface_item_interaction` event,
    segmented by activated-member cohort.
  - Owner: priya-pm.
  - Indicator class: leading.
  - Confidence: medium. The 22 to 41 jump nearly doubles current state
    and assumes algo v1.5 plus push triggers deliver.

- KR2: Increase 30-day retention among Resurface-engaged members from
  56% to 68% [fictional] (vs 31% baseline among non-Resurface members).
  - Metric: percentage of members who engaged with Resurface at least
    once in week 1 and returned at least once in days 8-30.
  - Baseline: 56% [fictional] (Q2 2026 cohort).
  - Target: 68% [fictional] by 2026-09-30.
  - Evidence source: cohort dashboard `resurface-30d-retention-q3`.
  - Owner: priya-pm.
  - Indicator class: lagging (30-day window).
  - Confidence: medium. Depends on whether the multiplier holds at
    scale.

- KR3 (guardrail): Hold member-reported relevance score at or above
  4.2 / 5 [fictional] across all Resurface impressions.
  - Metric: median relevance score from in-product post-interaction
    survey ("How relevant was this to you?").
  - Baseline: 4.2 / 5 [fictional] (Q2 2026 average).
  - Target: maintain or improve.
  - Evidence source: post-interaction survey (~5% sample rate).
  - Owner: priya-pm.
  - Indicator class: guardrail.
  - Confidence: high. Protects against the failure mode where push
    triggers boost engagement but degrade perceived quality.

## Initiatives as Bets

- Initiative 1: Algo v1.5 (early-August ship target).
  - Expected KR impact: KR1 primarily, KR2 secondarily.
  - Hypothesis: incremental tuning of the v1 algorithm based on beta
    findings will improve hit rate on first-impression items, increasing
    week-1 engagement which in turn drives retention.
  - Dependency: ML engineer plus 2 weeks of training data refresh.

- Initiative 2: Push notification triggers for high-confidence surfaces.
  - Expected KR impact: KR1 primarily.
  - Hypothesis: members who receive a push for a high-confidence
    Resurface item will engage at 2x the rate of in-app-only surfacing
    [fictional from beta data].
  - Dependency: Notifications platform team. No new asks; existing
    infra supports this.

- Initiative 3: Personalized Resurface onboarding (first session).
  - Expected KR impact: KR2 primarily (early engagement predicts
    retention).
  - Hypothesis: members who experience Resurface in their first session
    have higher week-1 engagement and thus higher 30-day retention than
    members who discover it later.
  - Dependency: Onboarding team for first-session UX integration.

## Guardrails and Health Checks

- Guardrail 1: Member-reported "Resurface item felt repetitive" rate
  stays below 8% [fictional] threshold (Q2 baseline 5%).
  - Why: algo v1.5 may over-surface a narrow content set. If users
    perceive repetition, engagement gains are hollow.

- Guardrail 2: Push notification opt-out rate stays below 6% [fictional]
  (Q2 baseline 3.1%).
  - Why: aggressive push triggers risk users disabling all Brainshelf
    notifications, which damages retention well beyond Resurface.

## Alignment Notes

- Parent or strategy link: Company OKR "Increase 30-day member retention
  from 31% to 42% [fictional] by year-end." This Resurface OKR is the
  primary retention lever; Onboarding team and Sharing team have
  secondary retention OKRs.
- Peer dependencies:
  - Onboarding team owns Initiative 3 first-session UX. Confirmed
    capacity in Q3 planning.
  - Notifications platform team owns push infrastructure for Initiative
    2. No new asks from us this quarter.
- Known conflicts:
  - The Sharing team's Q3 OKR includes "Increase items shared per week
    by 30%." If they succeed, the surface-able content pool grows
    faster than algo v1.5 can adapt. Mitigation: weekly sync between
    teams to align retraining cadence with sharing-volume changes.
- Out of scope this cycle:
  - Monetization (no team owns; not Resurface's lever).
  - Net-new member acquisition (Growth team).
  - Resurface for non-activated members (deferred until activation
    flow is settled).

## Quality Audit

- Strategic fit: pass. Clear link to company retention OKR via
  "Resurface is the largest single retention lever" logic.
- Objective quality: pass. "Reason members come back each week" implies
  a habit-forming behavior change, not a feature delivery.
- KR outcome quality: pass. All three KRs measure member behavior or
  perceived-quality outcomes; no "ship algo v1.5" KRs.
- Measurement quality: pass. All three KRs cite specific Mixpanel events
  or in-product survey instruments.
- Product influence: pass. Team controls all three KRs' levers via
  algo, push triggers, and onboarding UX.
- Focus: pass. One Objective, three KRs (within 2 to 4 range).
- Guardrails: pass. KR3 plus two health metrics protect against the
  predictable failure modes (perceived repetition, push fatigue).
- Alignment: pass. Parent OKR named, peer dependencies named, conflict
  with Sharing team flagged with mitigation.
- Operating rhythm: pass. Quarterly cycle; weekly check-ins assumed
  (default for product team aspirational OKR).
- Integrity: pass. Team-level OKR, no compensation coupling, no
  fabricated data.
- Empowered-team Disclosure: not-applicable. Empowered signal; section
  omitted.

## Open Questions

1. The 3.4x retention multiplier was observed in a 500-user beta cohort
   that self-selected into the program. Will it hold at population
   scale, where members did not opt in? KR2 design will measure this,
   but the team should pre-commit to a "validated multiplier" threshold
   below which the strategy needs to change next cycle.

2. The push notification opt-out guardrail (Guardrail 2) is an
   aggregate metric; if a sub-segment of users opts out at high rates,
   the median may hide it. Recommend instrumenting opt-out by user
   segment (engagement tier, account age) for Q4 visibility, even if
   not graded this cycle.

3. Algo v1.5 is described as "incremental tuning." If the team finds
   v1.5 is materially the same as v1, should they spike on a v2.0
   rewrite mid-cycle? Recommend pre-deciding the threshold (KR1
   trending below X% by week 6) that would trigger that pivot.

## Suggested Next Step

Run `/okr-writer` again in Audit Only mode after the cross-team Q3
planning workshop. Specifically check that the Sharing team's KR
confirmation does not invalidate KR1's assumption that surface-able
content pool stays roughly stable. Also confirm Open Question 1's
threshold with company leadership before cycle start.
```
