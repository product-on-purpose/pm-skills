---
title: "Define Problem Statement: Brainshelf Resurface"
description: "Brainshelf consumer PKM app - saved content re-engagement problem statement."
artifact: problem-statement
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . saved content re-engagement problem statement
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

After synthesizing the January 2026 user interviews, Brainshelf's PM formalized the "guilt pile" problem into a structured problem statement to align the team before hypothesis generation. The statement frames the core issue: Brainshelf users save content at a high rate (~47 items/month average [fictional]) but revisit fewer than 9% of saved items within 30 days [fictional], creating a growing library that users experience as guilt-inducing rather than valuable and contributing to a 7-day return rate of only 18% [fictional] . well below the retention OKR target of 25% [fictional].

**Source Notes:**

- Nir Eyal, "Hooked: How to Build Habit-Forming Products" (nirandfar.com) . the habit formation framework that contextualizes the return-trigger gap; Eyal's hook model identifies an external trigger as the minimum requirement for habit formation in products where the internal trigger (self-motivation) is insufficiently established.
- Lenny Rachitsky's consumer app retention benchmarks (Lenny's Newsletter, 2023) . 30-day retention benchmarks for consumer utility apps place typical retention at 25 - 35%; Brainshelf's 7-day return rate of 18% [fictional] falls below this range, confirming the re-engagement gap is a retention risk, not a normal usage pattern.
- Brainshelf interview synthesis (internal, January 2026) . the qualitative evidence base for the guilt pile problem; 5 of 7 interview participants described their saved library in negative emotional terms.

---

## Prompt

```
define-problem-statement

the guilt pile problem. users save a ton of stuff to brainshelf but
never come back to read it. interview data says 5/7 users described
their library negatively. behavioral data says <9% revisit rate within
30 days [fictional]. 7-day return rate is 18% [fictional], OKR target
is 25% [fictional] by end of Q2.

need a clean problem statement to align the team before we start
building the resurface hypothesis.
```

---

## Output

# Problem Statement: Saved Content Re-Engagement Gap

## Problem Summary

Brainshelf users save content enthusiastically (~47 items/month average [fictional]) but almost never return to read what they save: fewer than 9% of saved items are revisited within 30 days [fictional]. User interviews reveal that the growing library of unread items creates guilt and avoidance rather than perceived value, and the absence of any external trigger to return to saved content means that re-engagement depends entirely on user self-motivation . which is failing at scale. The result is a product that successfully captures user intent but fails to deliver on it, eroding retention and user satisfaction.

## User Impact

### Who is affected?

Active savers: Brainshelf users who have saved 10 or more items and have been active in the past 30 days (at least one save event). This segment represents approximately 9,800 users, or ~45% of Brainshelf's 22,000 MAU [fictional].

### How are they affected?

Users experience a growing backlog of unread saved items that they describe as "a guilt pile," "overwhelming," and "a graveyard of good intentions" [fictional]. The saved library, intended to be a resource, becomes a source of negative emotion. Over time, users stop opening the library tab, reducing their engagement to save-only behavior (opening the app or extension to save, then closing without reading). Five of seven interview participants described their library in explicitly negative terms. One churned user cited the overwhelming library as the primary reason for leaving Brainshelf.

### Scale of impact

- ~9,800 active savers in the target segment [fictional] (~45% of MAU)
- Average: 47 items saved per month; fewer than 4.2 revisited within 30 days [fictional]
- 7-day return rate (% of weekly active users who return the following week): 18% [fictional]
- Save-only sessions (save event with no read event in the same session): 72% of all sessions [fictional]

## Business Context

### Strategic Alignment

Brainshelf's Q1 2026 retention OKR targets increasing the 7-day return rate from 18% to 25% [fictional]. The CEO has framed retention as the company's top priority for 2026, citing it as the primary metric investors will evaluate at the next board meeting (Q2 2026 [fictional]). Solving the re-engagement gap is the only credible path to the retention OKR . acquisition alone cannot compensate for the current return-visit rate.

### Business Impact

- 7-day return rate of 18% [fictional] is below the 25 - 35% median for consumer utility apps (per Lenny Rachitsky's benchmarks); closing this gap would move Brainshelf from below-median to median retention performance
- 30-day retention is approximately 12% [fictional]; users who do not form a return habit within the first 30 days are unlikely to retain at 60 or 90 days
- The guilt pile contributes to passive churn: users do not actively cancel, but they stop engaging and eventually leave; monthly churn among save-only users is 8% [fictional] vs. 3% [fictional] among users who both save and read

### Why Now?

- The Q1 retention OKR requires a product intervention shipping in Q1 to produce measurable results by Q2
- The competitive landscape is consolidating (Omnivore shut down, Matter shut down); displaced PKM users are evaluating alternatives, and Brainshelf's retention weakness limits its ability to convert trial users into long-term engaged users
- The January 2026 user interviews provided the qualitative evidence to design an intervention with high confidence in the problem definition . the team now has both the behavioral data (9% revisit rate [fictional]) and the user voice (guilt pile, no trigger) to act

## Success Criteria

| Metric | Current Baseline | Target | Timeline |
|--------|-----------------|--------|----------|
| 7-day return rate (primary) | 18% [fictional] | 25% [fictional] | Q2 2026 |
| Saved item revisit rate within 30 days | 9% [fictional] | 15% [fictional] | Q2 2026 |
| Email unsubscribe rate (guardrail) | n/a (no email feature) | ≤2% per week | Ongoing |

## Constraints & Considerations

- Team bandwidth: the backend team is 2 engineers; only one major project can run this quarter without cutting stability work
- Email requires opt-in: any email-based intervention requires explicit user consent before sending, which limits the addressable population and may bias the experiment toward more engaged users
- Apple Mail Privacy Protection inflates open rate metrics; any intervention that relies on email must use click-through rate (not open rate) as the primary success metric
- Brainshelf is pre-Series A [fictional]; the intervention should be low-cost to build and fast to measure . multi-quarter bets are not viable given the funding timeline

## Open Questions

- [ ] Is the re-engagement gap uniform across user segments, or do specific segments (e.g., heavy savers, researchers, casual users) have meaningfully different revisit rates?
- [ ] What opt-in rate should we expect for an email-based intervention? If opt-in is below 10% [fictional], is the experiment viable within a 4-week window?
- [ ] Does the "save to have" vs. "save to read" distinction (from interviews) affect which saved items should be resurfaced, or is topic relevance a sufficient proxy?
