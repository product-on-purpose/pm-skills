---
title: "Define Hypothesis: Brainshelf Resurface"
description: "Brainshelf consumer PKM app - Resurface morning email digest hypothesis."
artifact: hypothesis
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . Resurface morning email digest hypothesis
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Brainshelf has ~85,000 registered users and ~22,000 MAU [fictional]. User interviews and behavioral data revealed that users save an average of 47 items per month but revisit fewer than 9% of them within 30 days [fictional] . a pattern users described as a "guilt pile." The PM wants to test whether a morning resurface email digest, which surfaces 3 - 5 saved items based on recent reading patterns, increases the re-read rate before committing engineering resources to a full Resurface feature build.

**Source Notes:**

- Lenny Rachitsky's consumer app retention benchmarks (Lenny's Newsletter, 2023) place typical 30-day retention for consumer utility apps at 25 - 35%, with re-engagement email as one of the highest-ROI levers for apps below median retention.
- Research published in the Journal of Consumer Psychology (Soman, 2001, "The Mental Accounting of Sunk Cost") supports the behavioral observation that accumulated, unread items increase guilt and reduce engagement . consistent with what Brainshelf users described in interviews.

---

## Prompt

```
define-hypothesis

trying to figure out if a morning digest email will actually get people to re-read
their saved stuff. context: brainshelf pkm app, 22k MAU [fictional]. users save
~47 items/month but only go back to read ~9% within 30 days [fictional]. classic
guilt pile problem from interviews.

want to run an A/B test on a morning email that surfaces 3-5 items from their
library based on what they've been reading lately. need a hypothesis doc to
align the team before we commit to building it.

primary metric: resurface item click rate. secondary: actual read completion.
guardrail: don't tank unsubscribe rate.
```

---

## Output

# Hypothesis: Morning Resurface Email Increases Re-Read Rate

## Hypothesis Statement

**We believe that** sending a daily morning email digest surfacing 3 - 5 saved items matched to the user's recent reading topics

**for** active Brainshelf users who have saved 10 or more items but have not revisited any saved item in the past 7 days

**will** increase the rate at which saved items are clicked and re-read within 7 days of the digest being sent

**as measured by** resurface email click-through rate (% of delivered digests where the recipient clicks at least one surfaced item within 24 hours of delivery)

## Background & Rationale

### Problem Context

Brainshelf users consistently save content they intend to return to, but behavioral data shows that the vast majority of saved items are never revisited. Exit interviews and NPS comment analysis identify this as the app's core value destruction point . users feel guilt about the growing backlog rather than satisfaction from the tool. The library becomes a liability rather than an asset. See Problem Statement: Resurface (Q1 2026) for the full framing.

### Supporting Evidence

- Behavioral data: users save an average of 47 items/month but revisit fewer than 9% within 30 days [fictional]. The revisit rate has been flat for three cohorts despite feature additions to the saving experience.
- User interview synthesis (n=7): 5 of 7 users described their saved library in negative terms ("overwhelming," "guilt pile," "I forget it exists"). No user described a natural trigger for returning to saved content . revisiting was entirely self-initiated and rare.
- Re-engagement email benchmarks from Lenny's Newsletter (2023) indicate that re-engagement email is one of the highest-ROI retention levers for consumer apps below median 30-day retention, with click rates in successful implementations ranging from 8 - 22%.
- Readwise's core product loop . daily email highlighting previously saved highlights . demonstrates that a scheduled email resurface mechanic can drive habitual re-engagement in PKM tools.

### Alternative Hypotheses Considered

- **In-app notification card (push or in-app surface):** Could achieve higher reach among users with push enabled, but Brainshelf's notification opt-in rate is low [fictional] and in-app cards require the user to open the app first . defeating the purpose of re-engagement. Deferred to test in Phase 2.
- **Weekly digest instead of daily:** Lower frequency might reduce unsubscribe risk but reduces surface area for habit formation. Daily is the Readwise model; daily frequency is what this hypothesis tests. Weekly is a fallback variant.
- **Algorithmic library sorting (no email):** Resurfaces content inside the app without an outbound touchpoint. Requires the user to actively open the app, which is the behavior we're trying to change. This is a longer-term UX change; email is a faster test.

## Target User Segment

### Definition

Active savers who have not recently revisited content: registered Brainshelf users who have (1) saved 10 or more items total, (2) been active in the past 30 days (at least one save event), and (3) have not clicked on any saved item in the past 7 days.

### Segment Size

Approximately 9,800 users meet this definition as of last 30-day cohort [fictional], representing ~45% of MAU [fictional].

### Current Behavior

These users continue saving content (median 4 saves/week in this segment [fictional]) but do not return to read. Their reading consumption happens entirely on source sites at the time of saving; Brainshelf serves as a write-only library. They do not organically open the app to read . they open it to save.

## Success Metrics

### Primary Metric

| Metric | Current Baseline | Target | Minimum Detectable Effect |
|--------|-----------------|--------|--------------------------|
| Resurface email click-through rate (clicks / delivered digests, 24h window) | 0% (feature absent) | 15% [fictional] | 8 percentage points absolute |

*Baseline is 0% because the feature does not yet exist. The MDE of 8pp reflects a conservative threshold . below this level the engagement signal is too weak to justify the engineering investment in a full Resurface build.*

### Secondary Metrics

| Metric | Current Baseline | Expected Direction |
|--------|-----------------|-------------------|
| Resurface item read completion (% of clicked items where user spends ≥60 seconds) | 0% (feature absent) | Increase |
| 7-day return rate to app among recipients vs. control | ~18% [fictional] | Increase |
| Items saved per week (leading indicator of perceived value) | 4.1 saves/week [fictional] | No change or increase |

### Guardrail Metrics

| Metric | Current Value | Acceptable Range |
|--------|--------------|------------------|
| Email unsubscribe rate (among digest recipients) | . (email opt-in required) | Must stay below 2% per week |
| App session abandonment rate | 34% [fictional] | Must not increase by more than 5pp |

## Validation Approach

### Method

Randomized A/B test. Users meeting the segment criteria who opt in to the Resurface email (email opt-in required at experiment enrollment) are randomized 50/50. Control group receives no digest. Treatment group receives a daily morning digest (7:30 AM local time) surfacing 3 - 5 saved items matched by topic similarity to content saved in the prior 7 days.

*Note: opt-in is required before randomization to avoid measuring the effect of the consent prompt rather than the digest itself. Opt-in rate will be tracked as an observational metric but is not the primary measure.*

### Sample Size & Duration

- Sample size: 400 opted-in users per variant (800 total) [fictional]
- Duration: 4 weeks
- Traffic allocation: 50/50 between control and treatment within the opted-in cohort

*Power calculation: alpha 0.05, power 0.80, MDE 8pp absolute against a plausible 0% baseline assumes a two-proportion z-test. At current segment size (~9,800 eligible users [fictional]) and expected opt-in rate of ~20% [fictional], we anticipate ~1,960 opt-ins over 4 weeks . well above the 800 required. Four weeks is recommended to capture weekly behavioral variation (weekend saving vs. weekday reading patterns).*

### Pass/Fail Criteria

- **Validated if:** Click-through rate in treatment ≥ 8pp above control with p < 0.05, and unsubscribe rate stays below 2%/week. Proceed to full Resurface feature build.
- **Invalidated if:** Click-through rate in treatment is not statistically significantly above control after the full 4 weeks, or unsubscribe rate exceeds 2%/week. Re-evaluate delivery mechanism (in-app card, weekly cadence) before committing to build.
- **Inconclusive if:** Effect size is positive but below MDE at 4 weeks (signal present but underpowered). Extend test by 2 weeks with tightened targeting before declaring a result.

## Risks & Assumptions

### Key Assumptions

- Users who opt in to the digest are representative of the broader active-saver segment; self-selection bias is possible if only the most motivated users opt in.
- 7:30 AM local time is the optimal delivery window; this is based on email benchmark data from comparable consumer utility apps (Lenny's Newsletter, 2023) but has not been validated for Brainshelf's specific user base.
- Topic-matching algorithm (similarity to prior 7 days of saves) will surface content users find relevant; if matching quality is poor, CTR will be low for algorithmic reasons rather than format reasons.

### Risks

- Apple Mail Privacy Protection (MPP) will inflate open rates for Apple Mail users and make open rate unreliable as a proxy metric; the experiment uses click-through rate (not open rate) as the primary metric specifically to avoid MPP inflation.
- If opt-in rate is below 10% [fictional], the test will be underpowered for the 4-week window and duration will need to extend to 6 weeks; monitor opt-in rate in the first week.
- Users may click but immediately bounce if the content they surface is paywalled or no longer available at the original source; this would depress read completion without indicating digest format failure. Track source availability as an observational signal.

## Timeline

| Phase | Dates | Duration |
|-------|-------|----------|
| Setup & instrumentation | Mar 2  -  Mar 8, 2026 | 1 week |
| Opt-in prompt live; enrollment begins | Mar 9, 2026 | . |
| Test running | Mar 9  -  Apr 5, 2026 | 4 weeks |
| Analysis | Apr 6  -  Apr 10, 2026 | 1 week |
| Decision | Apr 11, 2026 | . |
