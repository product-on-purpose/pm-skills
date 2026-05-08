---
title: "Measure Experiment Design: Brainshelf Resurface"
description: "Brainshelf consumer PKM app - Resurface A/B test experiment design."
artifact: experiment-design
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . Resurface A/B test experiment design
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

With the Resurface feature shipped behind a feature flag, Priya M. and Chloe B. designed the A/B experiment to validate the Resurface hypothesis before a full rollout. The experiment uses an intent-to-treat design: eligible users are randomly assigned to treatment (sees opt-in prompt, receives digest if opted in) or control (no prompt, no digest), and the primary metric . 7-day return rate . is measured for both groups regardless of opt-in status. This design avoids selection bias from comparing only opted-in users against all control users.

**Source Notes:**

- Ron Kohavi, Diane Tang, and Ya Xu, "Trustworthy Online Controlled Experiments: A Practical Guide to A/B Testing" (Cambridge University Press, 2020) . the definitive reference for online experiment design; the intent-to-treat methodology, sample size calculation, and guardrail metric framework used in this document are drawn directly from Kohavi et al.'s guidance on avoiding common experimentation pitfalls.
- Evan Miller, "Sample Size Calculator" (evanmiller.org/ab-testing/sample-size.html) . the tool used to compute the minimum sample size per variant; the calculator uses the Wald method for two-proportion z-tests and was configured with the baseline, MDE, alpha, and power values specified in this document.
- Amplitude, "Experiment Documentation" (amplitude.com/docs/experiment) . the experimentation platform used for variant assignment, event tracking, and results analysis; Amplitude's feature flag SDK handles randomization and consistent variant assignment.

---

## Prompt

```
/experiment-design

resurface a/b test. feature is shipped behind a flag. need the full
experiment design for chloe to set up in amplitude.

hypothesis: daily digest → higher 7-day return rate.

design: intent-to-treat. treatment gets the opt-in prompt + digest.
control gets nothing (current experience). measure 7-day return rate
for both groups.

secondary metric: email CTR (treatment only . control doesn't get
email). guardrail: unsub rate ≤2%/week.

sample: 400 per variant from the 9,800 eligible users [fictional].
duration: 4 weeks (mar 9 - apr 5). 50/50 split on enrollment cohort.

want to have the design doc locked before the setup week (mar 2-8).
```

---

## Output

# Experiment Design: Resurface Daily Digest A/B Test

## Overview

| Field | Value |
|-------|-------|
| **Experiment Name** | RSF-EXP-001: Resurface Daily Digest |
| **Owner** | Priya M., Product Manager |
| **Start Date** | March 9, 2026 |
| **End Date** | April 5, 2026 |
| **Status** | Ready |

## Hypothesis

**We believe** offering a daily morning email digest of 3–5 topic-matched saved items

**for** active savers (users with 10+ saved items, active in the last 30 days)

**will** increase the 7-day return rate by at least 5 percentage points

**as measured by** 7-day return rate (% of weekly active users who return the following week)

## Background

Brainshelf's 7-day return rate is 18% [fictional], below the 25–35% median for consumer utility apps and below the Q1 retention OKR target of 25% [fictional]. The January 2026 user interviews identified the absence of an external return trigger as the primary barrier to re-engagement: users save content but never come back because nothing prompts them to. The Resurface feature creates a daily email trigger that delivers relevant saved items to the user's inbox at 7:30 AM local time. The feature was shipped behind a feature flag on February 16, 2026, and this experiment will determine whether the digest meaningfully improves return rates before a full rollout.

## Variants

### Control (A)

**Description:** Users experience the current Brainshelf product with no changes. They do not see the Resurface opt-in prompt, do not receive digest emails, and have no awareness that the feature exists. The control group represents the baseline Brainshelf experience.

**Details:**
- No opt-in card on the home screen
- No digest emails
- No changes to the library, search, or save flows
- Feature flag: `resurface_enabled = false`

**Screenshot/Mockup:** Current Brainshelf home screen (no changes)

### Treatment (B)

**Description:** Users see the Resurface opt-in card on their home screen and can enable the daily digest. Opted-in users receive a daily email at 7:30 AM local time with 3–5 topic-matched saved items. Users who do not opt in remain in the treatment group for analysis purposes (intent-to-treat) but do not receive emails.

**Details:**
- Resurface opt-in card displayed on the home screen
- Opted-in users receive daily digest via Resend
- Cadence setting available (daily or 3x/week)
- One-click unsubscribe from email footer
- Feature flag: `resurface_enabled = true`

**Screenshot/Mockup:** Figma . Resurface Home Screen Card + Digest Email v1

## Metrics

### Primary Metric

| Metric | Definition | Current Baseline | Minimum Detectable Effect |
|--------|------------|------------------|---------------------------|
| 7-day return rate | % of users who had at least one session in week N and return for at least one session in week N+1 | 18% [fictional] | 5 percentage points (absolute) . from 18% to 23%+ [fictional] |

### Secondary Metrics

| Metric | Definition | Purpose |
|--------|------------|---------|
| Email CTR (treatment only) | % of delivered digest emails where the user clicked at least one item | Measures whether the digest content is compelling enough to drive clicks; target ≥15% [fictional] |
| Opt-in rate (treatment only) | % of treatment users who enable the digest during the 4-week window | Diagnostic: measures whether the opt-in prompt and value proposition are effective; target ≥10% [fictional] |
| Saved item revisit rate | % of saved items revisited (opened from any source) within 30 days of save date | Measures whether the digest drives broader re-engagement with saved content, not just email clicks |
| Save-only session rate | % of sessions where the user saves an item but does not read any saved item | Measures whether the digest reduces save-only behavior, which is the behavioral signature of the trigger gap |

### Guardrail Metrics

| Metric | Definition | Threshold |
|--------|------------|-----------|
| Email unsubscribe rate | % of opted-in treatment users who unsubscribe per week | Must not exceed 2% per week [fictional]; if exceeded, pause experiment and review |
| App uninstall rate | % of users who uninstall the Brainshelf app during the experiment | Must not increase by more than 0.5 percentage points vs. control [fictional] |
| Save rate | Average saves per active user per week | Must not decrease by more than 5% vs. control [fictional]; the digest should not discourage saving |

## Sample Size & Duration

### Sample Size Calculation

| Parameter | Value |
|-----------|-------|
| **Baseline conversion rate** | 18% (7-day return rate) [fictional] |
| **Minimum detectable effect (MDE)** | 5 pp absolute (18% → 23%) |
| **Statistical significance (alpha)** | 0.05 (two-tailed) |
| **Statistical power (1-beta)** | 0.80 |
| **Users per variant** | 400 [fictional] |
| **Total users needed** | 800 [fictional] |

### Duration Estimate

| Parameter | Value |
|-----------|-------|
| **Daily eligible traffic** | ~330 active savers visit per day [fictional] (from the 9,800 eligible pool) |
| **Traffic allocation** | ~8% of eligible users (800 of 9,800) [fictional] |
| **Users per day in experiment** | Enrollment is front-loaded: all 800 users assigned at experiment start (batch randomization) |
| **Minimum duration** | 4 weeks (to capture 4 full weekly return cycles) |
| **Recommended duration** | 4 weeks . the minimum for weekly return rate; extending to 6 weeks would capture a second retention cycle but delays the Q2 OKR decision |

## Audience Targeting

### Inclusion Criteria

- Active savers: users with 10 or more saved items AND at least one save event in the past 30 days
- Have a confirmed email address on their account
- Active on the Brainshelf web or mobile app (at least one session in the past 14 days)

### Exclusion Criteria

- Brainshelf employees and internal test accounts (identified by email domain)
- Users who have previously unsubscribed from any Brainshelf email communication (legacy email list, if any)
- Users currently enrolled in other active experiments (none currently running, but exclusion logic is in place for future experiments)

### Traffic Allocation

| Variant | Allocation |
|---------|------------|
| Control (A) | 50% (400 users) [fictional] |
| Treatment (B) | 50% (400 users) [fictional] |

## Success Criteria

### Win (Ship Treatment)

The treatment is considered a win if the 7-day return rate in the treatment group is at least 5 percentage points higher than control with p < 0.05 (two-tailed), AND no guardrail metric exceeds its threshold. If the return rate lift is statistically significant but below 5pp, the result is a partial win . the team will evaluate whether to ship as-is or iterate on the digest to increase the effect size.

### Loss (Keep Control)

The treatment is considered a loss if the 7-day return rate in the treatment group is not statistically different from control (p ≥ 0.05) after the full 4-week duration, OR if any guardrail metric exceeds its threshold. A flat or negative result suggests that the email digest does not create a sufficient return trigger, and the team should investigate alternative trigger mechanisms (e.g., push notification, in-app card) before re-running.

### Inconclusive (More Data Needed)

The result is considered inconclusive if the treatment shows a positive trend (2–4pp lift) that does not reach statistical significance at p < 0.05 after 4 weeks. In this case, the team may extend the experiment to 6 weeks to accumulate more data, or increase the sample size by enrolling additional users from the eligible pool.

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Opt-in rate below 10% . dilutes the intent-to-treat effect | Medium | High | Monitor opt-in daily in week 1; if below 5% at day 7, revise opt-in prompt copy and extend enrollment |
| Novelty effect . treatment users return more in week 1 but the effect fades | Medium | Medium | Analyze weekly return rate trends; compare week 1 vs. week 4 retention to detect decay |
| Selection bias . only highly engaged users opt in, inflating treatment metrics | Medium | Medium | Intent-to-treat analysis includes all treatment users regardless of opt-in; also report per-protocol analysis (opted-in users only) separately for comparison |
| Gmail promotions tab classification reduces effective email delivery | Medium | High | Text-only email layout; monitor inbox placement via Resend dashboard; seed list test in setup week |
| Resend API outage during test window | Low | High | Monitor daily; if >2 consecutive days of send failures, pause the experiment clock and extend duration accordingly |

### Monitoring Plan

- Chloe B. monitors the Resurface experiment dashboard daily during the test window
- Alert thresholds: unsubscribe rate >2%/week triggers a Slack notification to #resurface; send failure rate >5% triggers PagerDuty
- Weekly experiment health review (Monday) with Priya, Alex, and Chloe: review opt-in rate, CTR trend, unsubscribe rate, and any data quality issues
- Rollback criteria: if unsubscribe rate exceeds 5% per day (2.5x weekly guardrail) for 2 consecutive days, disable the feature flag and investigate

## Implementation Notes

- Feature flag: `resurface_enabled` in Amplitude Experiment; manages variant assignment and consistent bucketing
- Randomization unit: user_id; consistent assignment ensures users do not switch variants between sessions
- Instrumentation: see the Resurface instrumentation spec for the full event schema (opt_in, digest_sent, digest_opened, item_clicked, unsubscribe, cadence_changed, digest_skipped)
- The experiment SDK must be initialized before the home screen renders to ensure the opt-in card is shown only to treatment users

## References

- Resurface hypothesis document (Define phase)
- Resurface PRD (Deliver phase)
- Resurface instrumentation spec (Measure phase)
- Resurface experiment dashboard requirements (Measure phase)
