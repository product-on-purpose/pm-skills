---
title: "Foundation Sprint Magic Lenses: Workbench Debugging Toolchain"
description: "Workbench Day 2 afternoon Magic Lenses evaluation of 5 approaches through 4 classic plus 1 custom lens; top bet and backup."
artifact: foundation-sprint-magic-lenses
version: "1.0"
repo_version: "2.15.0"
skill_version: "0.1.0"
created: 2026-05-22
status: sample
thread: workbench
context: "Workbench Day 2 PM (13:00-15:00 PT 2026-05-22); Magic Lenses evaluation; note-and-vote for top-bet supervote"
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Lenses

**4 classic lenses:**

- **Customer**: which approach would the target customer (Series B-D senior SRE) rate highest for incident-time disorientation compression?
- **Pragmatic**: which approach can the 4-person pre-seed team actually ship in 12 weeks?
- **Growth**: which approach reaches the most Series B-D growth-stage startups in 24 months?
- **Money**: which approach has the best path to a sustainable price point and gross-margin profile?

**1 custom lens (required per skill spec):**

- **Trust-Under-Stress**: which approach earns SRE trust during the actual incident moment, when an SRE is high-cognitive-load and skeptical of "yet another tool" that might hallucinate or break the workflow?

Trust-Under-Stress is the right custom lens for Workbench because incidents are exactly when SREs have least patience for tool failures or vendor hand-waving. A tool that any SRE wouldn't trust during their next 03:00 page is dead on arrival.

## Lens Scoring

Each approach scored 1-5 per lens. Higher is better.

### Customer Lens (Target SRE judgment on disorientation compression)

| Approach | Score | Rationale |
|---|---|---|
| 1. Multi-Source Aggregator | 4 | One-screen experience with familiar data; SREs we interviewed liked this idea |
| 2. Sidecar + Aggregator | 5 | Best data quality during incident + one-screen experience; both worlds |
| 3. Replay-First | 4 | Replay is loved by SREs we asked; but pure-replay is narrower than what's needed |
| 4. Runbook-Integrated | 3 | Some SREs want this; some explicitly said they want a data tool not an orchestrator |
| 5. AI-Assisted | 2 | SRE interviews showed strong AI skepticism for incident-time use; "I don't trust AI at 03:00" was nearly verbatim |

### Pragmatic Lens (Can 4-person team ship in 12 weeks?)

| Approach | Score | Rationale |
|---|---|---|
| 1. Multi-Source Aggregator | 5 | Lightest build; Priya + Marcus know the upstream APIs already; Ari + Jin can do UX |
| 2. Sidecar + Aggregator | 2 | Double scope; eBPF sidecar is 8+ weeks alone; aggregator another 4+ weeks |
| 3. Replay-First | 3 | Storage layer + replay UX both nontrivial; tight but feasible |
| 4. Runbook-Integrated | 4 | Runbook engine simpler than expected; risk is integration with existing runbook tooling |
| 5. AI-Assisted | 1 | Team has no ML function; cannot ship credible AI in 12 weeks |

### Growth Lens (Reach in 24 months)

| Approach | Score | Rationale |
|---|---|---|
| 1. Multi-Source Aggregator | 5 | No customer deployment friction; sales motion is direct-to-SRE |
| 2. Sidecar + Aggregator | 3 | Sidecar requires platform-team approval; slower sales cycles |
| 3. Replay-First | 4 | Storage limits growth velocity; not a hard cap |
| 4. Runbook-Integrated | 3 | Different sales motion (closer to PagerDuty); ambiguous TAM |
| 5. AI-Assisted | 4 | Strong story-arc on hype curve; growth potential if execution is good |

### Money Lens (Sustainable price + gross margin)

| Approach | Score | Rationale |
|---|---|---|
| 1. Multi-Source Aggregator | 4 | Low data storage cost; pricing model fits "per incident" or "per SRE seat" |
| 2. Sidecar + Aggregator | 3 | Data infra cost from owned tracing weighs on margin |
| 3. Replay-First | 2 | Storage cost weighs heavily on margin pre-PMF |
| 4. Runbook-Integrated | 4 | Per-seat pricing maps cleanly; runbook tier upsell available |
| 5. AI-Assisted | 2 | Inference cost during incidents could spike on incident days; hard to price |

### Trust-Under-Stress Lens (Custom) (Trust at 03:00 during an actual incident)

| Approach | Score | Rationale |
|---|---|---|
| 1. Multi-Source Aggregator | 5 | Familiar data shown in cleaner UI; SRE sees Datadog data they already trust |
| 2. Sidecar + Aggregator | 4 | Workbench-owned trace data is high-trust if sidecar reliability is proven; sidecar reliability is a question |
| 3. Replay-First | 4 | Replay is intuitive; trust depends on completeness of captured data |
| 4. Runbook-Integrated | 3 | Trust depends on runbook quality; not Workbench's quality |
| 5. AI-Assisted | 1 | AI hallucinations at 03:00 are existentially bad; trust is fragile |

## Aggregate Scores

| Approach | Customer | Pragmatic | Growth | Money | Trust | Total |
|---|---|---|---|---|---|---|
| 1. Multi-Source Aggregator | 4 | 5 | 5 | 4 | 5 | 23 |
| 2. Sidecar + Aggregator | 5 | 2 | 3 | 3 | 4 | 17 |
| 3. Replay-First | 4 | 3 | 4 | 2 | 4 | 17 |
| 4. Runbook-Integrated | 3 | 4 | 3 | 4 | 3 | 17 |
| 5. AI-Assisted | 2 | 1 | 4 | 2 | 1 | 10 |

## Note and Vote: Top Bet Supervote

Aggregate has Approach 1 leading 23-17-17-17-10 (clear winner). Team ran a 15-min note-and-vote to confirm the top bet and select the backup. Priya's supervote ratified:

**Top bet: Approach 1 (Real-Time Multi-Source Aggregator).** It dominates the Pragmatic + Growth + Trust lenses, scores acceptably on Customer (4 vs the higher 5 of Approach 2), and has the strongest Money story for pre-seed. Approach 1 also matches the "augment, don't replace" decision principle from Differentiation most cleanly.

**Backup: Approach 3 (Replay-First).** If real-time aggregation hits unsolvable API-rate-limit issues during the design-partner pilot, Workbench falls back to owning short-window storage and shipping replay as the lead differentiator. Approach 3 keeps the specialized-debugger direction intact and is the second-most-pragmatic.

**Explicitly rejected:**
- Approach 5 (AI-Assisted): Pragmatic 1 + Trust 1 + Team has no ML function. Strategic for v2.0; existentially wrong for v0.1.
- Approach 4 (Runbook-Integrated): Pulls Workbench into PagerDuty competitor space which we explicitly excluded.

## Top Bet and Backup Statement

**Top bet:** Workbench ships as a real-time multi-source aggregator: a lightweight web UI that pulls live data from the customer's existing Datadog / Honeycomb / Sentry / Grafana during an incident, auto-correlates the trace + state + dependency picture, and presents one screen optimized for the disorientation phase. No deployment of new infrastructure on customer side; sales motion is direct-to-SRE without platform-team gating.

**Backup plan:** If API rate limits prove unsolvable in design-partner pilot (Datadog rate-limits API queries during high-event-volume periods, exactly when incidents happen), Workbench pivots to Approach 3 (Replay-First): own short-window storage and ship replay as the lead value, with aggregation as secondary.

## Decider Checkpoint

**Priya sign-off required to proceed to Founding Hypothesis (Day 2 end).**

- [x] Priya confirms the 5 lenses including the custom Trust-Under-Stress lens.
- [x] Priya confirms per-lens scoring and rationale.
- [x] Priya accepts the top bet (Approach 1 Multi-Source Aggregator) and the backup (Approach 3 Replay-First).
- [x] Priya agrees to the explicit rejection of Approaches 4 and 5.
- [x] Priya commits Workbench to the top-bet direction for design-partner pilot conversations.

**Signed:** Priya, 2026-05-22 15:15 PT
