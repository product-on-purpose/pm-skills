---
title: "Foundation Sprint Differentiation: Workbench Debugging Toolchain"
description: "Workbench Day 1 afternoon bundled artifact: scored differentiators, 2x2 chart, decision principles, Mini Manifesto."
artifact: foundation-sprint-differentiation
version: "1.0"
repo_version: "2.15.0"
skill_version: "0.1.0"
created: 2026-05-21
status: sample
thread: workbench
context: "Workbench Day 1 PM (13:30-17:30 PT 2026-05-21); Differentiation block; note-and-vote for 2x2 axis selection"
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Candidate Differentiators (generated; pre-scoring)

| # | Differentiator | Source |
|---|---|---|
| D1 | Incident-time focus (UX optimized for the disorientation phase) | Priya |
| D2 | One screen, not 5-7 tabs (consolidated view during incidents) | Jin |
| D3 | Auto-correlated dependency + state + trace timeline | Marcus |
| D4 | SRE-vocabulary first-class UX (incidents, runbooks, MTTR; not "spans" and "log lines") | Ari |
| D5 | Open-source friendly (export, replay, integrate with existing tools) | Marcus |
| D6 | Replay/time-travel within an incident window | Marcus |
| D7 | Sub-30-second setup-to-data for a new service (low integration friction) | Priya |
| D8 | Pricing model that scales with incidents, not with data volume | Priya |

## Scored Differentiators

Scoring criteria: 1-5 on (a) feasibility for team to deliver well, (b) defensibility against competitor copying within 12 months, (c) SRE-judged importance from 19-interview synthesis.

| Differentiator | Feasibility | Defensibility | Importance | Total | Rank |
|---|---|---|---|---|---|
| D1: Incident-time focus | 5 | 5 | 5 | 15 | 1 |
| D2: One screen during incidents | 5 | 3 | 5 | 13 | 2 |
| D3: Auto-correlated state + trace + deps | 4 | 5 | 4 | 13 | 2 |
| D6: Replay / time-travel | 3 | 5 | 4 | 12 | 4 |
| D4: SRE-vocabulary UX | 5 | 3 | 3 | 11 | 5 |
| D7: Sub-30-second setup | 4 | 3 | 4 | 11 | 5 |
| D8: Incident-priced model | 4 | 4 | 3 | 11 | 5 |
| D5: Open-source friendly | 4 | 3 | 3 | 10 | 8 |

## 2x2 Chart

**Axes (chosen via note-and-vote at 14:45 PT):**

- X-axis: Always-on vs Incident-time focus
- Y-axis: Disorientation-phase support (weak to strong)

```text
                       STRONG ON DISORIENTATION
                              |
                              |  Workbench .
                              |   (specialized direction)
                              |
                              |
                              |
                              |       . Honeycomb (best in class on traces)
                              |
                              |             . Datadog
ALWAYS-ON                     |                       INCIDENT-TIME
<------ . New Relic ----------+------------ . Sentry ------>
                              |                  . Grafana stack
                              |
                              |
                              |
                              |
                              |          . internal homegrown
                              |
                              |     . multi-tool juggling (status quo)
                              |
                       WEAK ON DISORIENTATION
```

**Reading the chart:** the "incident-time + strong on disorientation" quadrant is largely empty. Datadog and Sentry sit closer to incident-time than New Relic, but none of them are optimized for the cognitive disorientation phase. Multi-tool juggling sits in the bottom-right and is the dominant status-quo. Workbench wants the upper-right open quadrant.

## Decision Principles

The Differentiation work produces 4 decision principles constraining all Workbench v0.1 product decisions:

1. **Incident-time first; always-on never.** Workbench is optimized for the moment when the pager fires. We do not build "always-on" dashboards, alert configuration, or metrics-tracking features that are not load-bearing for incident-time. If a feature is only useful between incidents, it does not ship in v0.1.
2. **One screen during the incident.** SREs juggle 5-7 tools today. Workbench's job is to be the one tool they need open during the incident. Every UI decision pulls toward consolidation.
3. **SRE vocabulary, SRE workflow.** The language is "incident," "service," "deployment," "dependency," "runbook," not "span," "log line," "metric," "trace ID." If an SRE has to translate between vendor vocabulary and their team's vocabulary, the tool is failing them in the worst moment.
4. **Augment, don't replace existing observability investment.** Customers keep Datadog or Honeycomb or their open-source stack; Workbench imports from them during an incident. We do not ask customers to rip-and-replace.

## Mini Manifesto

**What Workbench is:**

Workbench is the incident-time companion tool for senior SREs at growth-stage startups. When the pager fires at 03:00 and the SRE is staring at 5 browser tabs trying to figure out which service in their distributed system is misbehaving, Workbench is the one screen that shows the auto-correlated picture: which service, which version, which dependency, which state preceded the failure, plotted on one incident-time timeline.

Workbench's entire reason to exist is to compress the disorientation phase of incident response. The team has measured the disorientation phase as 5-20 minutes per incident across 19 customer interviews; cutting it in half is the product's value claim. Workbench is not always-on; Workbench is the tool you grab the moment something breaks.

**What Workbench is NOT:**

Workbench is NOT a Datadog replacement. Customers keep Datadog (or Honeycomb, or their internal Grafana stack) for everything between incidents. Workbench imports data from those tools during the incident.

Workbench is NOT an always-on observability platform. We do not compete on retention windows, custom dashboards, or alert-rule engines. The product surface is intentionally narrow.

Workbench is NOT trying to debug code. Workbench shows what was happening; it does not propose code fixes or call out specific bugs. The SRE retains full diagnostic authority.

Workbench is NOT for Series A startups or for enterprises. The Series A team is too small to have the distributed-systems complexity Workbench solves for. The enterprise team has different procurement, scale, and tooling-context realities than v0.1 can serve.

## Decider Checkpoint

**Priya sign-off required to proceed to Approach Options (Day 2 AM).**

- [x] Priya confirms the 4 decision principles, especially principle 1 (incident-time first; always-on never).
- [x] Priya confirms the Mini Manifesto including all 4 negative-positioning paragraphs.
- [x] Priya accepts that this Differentiation block has effectively pre-committed Workbench to the specialized-debugger direction; Day 2 Approach Options will be variations within that direction, not a re-litigation against the general-observability path.
- [x] Priya confirms the 2x2 axis choice (always-on vs incident-time x disorientation-phase strength).
- [x] Priya accepts the top-3 differentiators (D1 incident-time + D2 one-screen + D3 auto-correlation).

**Signed:** Priya, 2026-05-21 17:45 PT
