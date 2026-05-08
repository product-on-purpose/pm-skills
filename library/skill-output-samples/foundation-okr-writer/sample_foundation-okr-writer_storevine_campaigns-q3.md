---
title: "Foundation OKR Writer: Storevine Campaigns Q3"
description: "Storevine B2B ecommerce platform. Campaigns team Q3 2026 OKR set following the May 2026 Campaigns GA and the validated guided first-campaign flow."
artifact: foundation-okr-writer
version: "1.0"
repo_version: "2.12.0"
skill_version: "1.0.0"
created: 2026-04-30
status: canonical
thread: storevine
context: Storevine B2B ecommerce platform. Campaigns team Q3 2026 OKR set following the May 2026 Campaigns GA and the validated guided first-campaign flow.
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Sample: foundation-okr-writer. Storevine Campaigns Q3 2026 OKR Set

## Scenario

Storevine's Campaigns team shipped the guided first-campaign flow in May 2026 and validated it via the 60-day A/B test that ran through late June (see existing measure-experiment-results sample). First-send rate moved from 13.4% to 31.7% [fictional] in the treatment, and the secondary metric (90-day second-campaign rate) reached 22.8% [fictional]. The guided flow is now the default for new merchants.

For Q3 2026, the Campaigns growth-pm needs to set OKRs that move from "we activated more merchants" to "merchants use Campaigns as a sustained marketing channel." The forcing function is a company-level OKR to reduce 12-month merchant churn from 18% to 14% [fictional] by year-end. Engagement with Campaigns is one of the strongest leading indicators for merchant retention.

The growth-pm runs `/okr-writer` in Guided mode (default).

**Source Notes:**

- Storevine is fictional
- All metrics `[fictional]`
- Continuation of the storevine Campaigns thread established in the measure-experiment-results sample at `library/skill-output-samples/measure-experiment-results/sample_measure-experiment-results_storevine_campaigns.md`
- The Cagan empowered-team test, the Wodtke 1-objective rhythm, and the Castro outcome-vs-output litmus are the writer's underlying critique heuristics

---

## Prompt

```
/okr-writer

Scope: Campaigns team, Storevine
Cycle: Q3 2026 (July 1 to September 30)
Level: team
OKR type: aspirational

Strategic context:
- Company objective: reduce 12-month merchant churn from 18% to 14% [fictional]
  by year-end 2026.
- Campaigns team owns email marketing for Storevine merchants.
- Guided first-campaign flow shipped May 2026; validated June 27 with strong
  results.

Empowerment signal: empowered team. Leadership picks problems, team picks
bets and KRs.

Draft objective: "Make Campaigns the email tool merchants use weekly."

Candidate KRs (rough):
- More merchants sending recurring campaigns
- Higher campaign engagement (CTR or conversion)
- Don't break merchant satisfaction

Constraints:
- Engineering capacity: 4 engineers, 1 designer
- No new platform dependencies
- Cannot influence pricing or top-of-funnel acquisition (other teams)

Source of truth: company OKR doc in Confluence at
go/okrs-q3-2026-campaigns
```

---

## Output

```markdown
# OKR Set: Storevine Campaigns Team, Q3 2026

## Context

- Scope: Campaigns team
- Cycle: 2026-Q3 (July 1 to September 30, 2026)
- Level: team
- OKR type: aspirational
- Empowered-team signal: empowered (leadership assigns problem; team picks
  KRs and bets). No Disclosure section needed.
- Source of truth: go/okrs-q3-2026-campaigns (Confluence). This artifact is
  a planning input, not the live tracker.
- Strategic input: Company OKR to reduce 12-month merchant churn from 18%
  to 14% [fictional] by year-end. Campaigns engagement is a known leading
  indicator for merchant retention (correlation observed in 2026-H1
  retention analysis [fictional]).
- Assumptions:
  - Campaigns engagement causally improves retention, not just correlates.
    Treated as working hypothesis; KR2 design lets us update the belief.
  - Q3 has no major Storevine platform launches that would compete for
    merchant attention.
  - Lifecycle email triggers are technically feasible within current
    Campaigns infra.

## Objective

Make Campaigns the marketing tool merchants reach for every week.

(One qualitative, directional statement. Replaces the draft "tool merchants
use weekly" with a phrasing that signals desired merchant behavior, not
just usage frequency.)

## Key Results

- KR1: Increase weekly active senders from 14% to 28% [fictional] of
  Campaigns-activated merchants by 2026-09-30.
  - Metric: percentage of activated merchants who send at least one
    campaign in any 7-day window, averaged over the trailing 4 weeks.
  - Baseline: 14% [fictional] (June 2026 trailing-4-week average).
  - Target: 28% [fictional] by 2026-09-30.
  - Evidence source: Amplitude `campaign_sent` event, segmented by
    activated-merchant cohort.
  - Owner: growth-pm.
  - Indicator class: leading.
  - Confidence: medium. The 14 to 28 jump is roughly 2x and assumes
    lifecycle triggers + templates v2 deliver.

- KR2: Increase 90-day campaign retention from 22.8% to 38% [fictional] for
  merchants who send their first campaign in Q3.
  - Metric: percentage of first-time senders in Q3 who send at least 3
    campaigns within 90 days of first send.
  - Baseline: 22.8% [fictional] (Q2 2026 cohort, per the May A/B test
    secondary metric).
  - Target: 38% [fictional] by end of cohort 90-day window (extends into
    Q4 measurement; Q3 grade is forward-looking projection on cohort
    progress at 60 days).
  - Evidence source: Amplitude cohort dashboard
    `campaigns-90d-retention-q3-2026`.
  - Owner: growth-pm.
  - Indicator class: outcome (lagging at 90 days, but trackable
    interim at 30 and 60 days).
  - Confidence: low. This KR depends on cohorts that started before Q3.
    Likely needs a second cycle to interpret cleanly. Surfacing as Open
    Question 1.

- KR3 (guardrail): Hold median campaign click-through rate at or above
  3.4% [fictional] across all Q3 sends.
  - Metric: median CTR across all campaigns sent in Q3.
  - Baseline: 3.4% [fictional] (Q2 2026 average).
  - Target: maintain or improve.
  - Evidence source: Amplitude `campaign_click` event over
    `campaign_delivered`.
  - Owner: growth-pm.
  - Indicator class: guardrail.
  - Confidence: high. Protects against the failure mode where lifecycle
    triggers boost send volume but tank engagement quality.

## Initiatives as Bets

- Initiative 1: Lifecycle email triggers (mid-July ship target).
  - Expected KR impact: KR1 primarily, KR2 secondarily.
  - Hypothesis: merchants who receive contextual nudges (post-send recap,
    audience re-engagement reminder, seasonal prompt) will send 30%
    [fictional] more campaigns over a 30-day window than control.
  - Dependency: Storevine notification platform team for delivery
    infrastructure (already scoped, no blocker).

- Initiative 2: Templates v2 (seasonal and event-driven templates).
  - Expected KR impact: KR1 and KR2.
  - Hypothesis: merchants who use a seasonal template for their first
    repeat send have higher second-send rates than merchants who start
    from a generic template.
  - Dependency: Design lead authoring 12 [fictional] new templates over
    August.

- Initiative 3: Campaign performance feedback loop (in-app).
  - Expected KR impact: KR2 primarily.
  - Hypothesis: merchants who see clear post-send performance data
    (open rate, click rate, top-clicked items) are more likely to send
    again.
  - Dependency: Campaigns analytics dashboard team. Coordination cost
    medium; named in Alignment Notes below.

## Guardrails and Health Checks

- Guardrail 1: Email unsubscribe rate stays below 0.95% [fictional]
  threshold (Q2 baseline 0.72%).
  - Why: lifecycle triggers risk increasing send volume. Unsub rate is
    the canonical signal of merchant audience fatigue. If unsub spikes,
    we are damaging merchant relationships with their customers, which
    Storevine's brand depends on.

- Guardrail 2: Spam complaint rate stays below 0.1% [fictional]
  (Q2 baseline 0.04%).
  - Why: regulatory and deliverability risk. A spam-rate breach affects
    all Storevine merchants via shared sending reputation.

## Alignment Notes

- Parent or strategy link: Company OKR "Reduce 12-month merchant churn
  from 18% to 14% by year-end." This Campaigns OKR is one of three known
  retention levers (the others are Inventory team and Onboarding team).
- Peer dependencies:
  - Campaigns Analytics team owns Initiative 3 dashboard work. Confirmed
    capacity in 2026-06 cross-team planning.
  - Storevine Notifications platform team owns infra for Initiative 1.
    No new asks from us this quarter.
- Known conflicts:
  - The Onboarding team's Q3 OKR includes "Increase Campaigns activation
    rate among new merchants from 35.8% to 50% [fictional]." If they
    succeed, our KR1 baseline shifts mid-cycle (more activated merchants
    means a different denominator for "weekly active senders").
    Mitigation: we will rebaseline KR1 in mid-cycle review using the
    activated-merchant cohort definition that exists at start of Q3,
    not the rolling cohort.
- Out of scope this cycle:
  - Pricing changes (no team owns; not Campaigns' lever).
  - Net-new merchant acquisition (Onboarding team).
  - International expansion of Campaigns (deferred to 2027).

## Quality Audit

- Objective is specific and directional: pass. "Marketing tool merchants
  reach for every week" implies a behavior change, not a feature delivery.
- KRs measure outcomes, not work: pass. All three KRs measure merchant
  behavior or send-quality outcomes; no "ship X" KRs.
- Baselines and targets are explicit: pass with caveat. KR2 baseline
  comes from a specific Q2 cohort, not a steady-state measurement.
  Flagged in Open Questions.
- Evidence sources are credible: pass. All three KRs cite specific
  Amplitude events or dashboards.
- Guardrails present where needed: pass. KR3 plus two health metrics
  protect against the predictable failure modes (engagement quality,
  audience fatigue, deliverability).
- OKR is not compensation-coupled: pass. Team-level OKR with team
  owners; no individual performance metric proposed.
- Empowered-team disclosure included if needed: not-applicable. Team
  signaled as empowered.

## Open Questions

1. KR2's 90-day retention metric extends past the cycle boundary
   (cohorts started in Q3 will not finish their 90-day window until Q4).
   Should KR2 be reframed as a 30-day or 60-day intermediate metric, or
   should the team accept that Q3 grading on KR2 is a projection rather
   than a final score? Recommend deciding before Q3 starts so the grader
   has unambiguous scoring rules.

2. The retention causality assumption (Campaigns engagement causes
   retention rather than correlates) is unverified. If KR1 hits but
   the company churn metric does not move, the Campaigns team's strategy
   should change next cycle. Worth instrumenting a cohort comparison
   that the grader can reference.

3. Should Initiative 2 (Templates v2) ship as one batch or as a phased
   release across August and September? Phasing affects when KR2's
   leading-indicator effect is visible. Recommend a 2-week design
   spike before locking the schedule.

## Suggested Next Step

Run `/okr-writer` again in Audit Only mode with this set after the cross-
team Q3 planning workshop. Specifically check that the KR2 cohort
boundary question (Open Question 1) is resolved and that the Onboarding
team's KR confirmation does not invalidate KR1's denominator.
```
