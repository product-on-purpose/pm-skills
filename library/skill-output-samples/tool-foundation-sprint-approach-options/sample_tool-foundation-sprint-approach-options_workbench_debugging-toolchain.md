---
title: "Foundation Sprint Approach Options: Workbench Debugging Toolchain"
description: "Workbench Day 2 morning approach options - 5 candidate approaches within the specialized-debugger direction before Magic Lenses scoring."
artifact: foundation-sprint-approach-options
version: "1.0"
repo_version: "2.15.0"
skill_version: "0.1.0"
created: 2026-05-22
status: sample
thread: workbench
context: "Workbench Day 2 AM (10:00-11:30 PT 2026-05-22); 5 approaches within the incident-time specialized-debugger direction locked Day 1"
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Generation Context

Day 1 closed with the specialized-debugger / incident-time direction locked into the Mini Manifesto. Day 2 AM generated 5 candidate approaches within that direction. All 5 share: incident-time focus, one-screen consolidated view, SRE-vocabulary UX, augment-don't-replace existing observability. They differ on: data-ingestion model, time-travel scope, deployment shape (SaaS vs self-hosted), and primary integration partner.

## Approach 1: Real-Time Multi-Source Aggregator

**Summary:** Workbench pulls live data from the customer's existing Datadog / Honeycomb / Sentry / Grafana via APIs during an incident, correlates it on the fly, and presents the unified incident view. No data is stored long-term; Workbench is a "lens" over existing observability data.

**Differentiator served:** D2 (one screen), D4 (SRE vocabulary), D7 (sub-30s setup), and the "augment don't replace" principle at maximum strength.

**Risk:** API rate limits during incidents (when querying is heaviest). Latency stacking from multiple upstream API calls. Dependency on competitors' API availability and pricing.

**Visual:** [imagine: Workbench in the middle, 4 arrows pulling data live from Datadog/Honeycomb/Sentry/Grafana logos, single unified view rendering for the user]

## Approach 2: Lightweight Tracing Sidecar + Aggregator

**Summary:** Workbench ships a lightweight tracing sidecar (eBPF + OpenTelemetry exporter) for first-class data and aggregates from upstream tools as fallback. Sidecar provides Workbench-native deep distributed traces; aggregator provides backward compatibility for non-instrumented services.

**Differentiator served:** D3 (auto-correlation) at maximum strength via owned-tracing; D2 (one screen) strong; D6 (replay) feasible because of owned-trace storage.

**Risk:** Heavier sales motion (sidecar deployment requires platform-team buy-in). Doubles the build scope: own-the-stack + integrate-with-stack.

**Visual:** [imagine: Workbench with two data sources, owned eBPF sidecar on the customer infra + aggregator pulling from competitors, unified view]

## Approach 3: Replay-First Time-Travel Tool

**Summary:** Workbench owns its own short-window storage (last 4 hours of trace + state per service) and offers "replay" as the primary value: the SRE can scrub time backward across the entire system to see what was happening 8 minutes before the incident. Aggregation from existing tools is secondary.

**Differentiator served:** D6 (replay / time-travel) at maximum strength; D3 (auto-correlation) strong because of owned data.

**Risk:** Storage cost during pre-PMF runway. Replay UX is non-trivial to design well; Ari's bet is feasible but expensive. May position Workbench too narrowly (replay alone isn't always what the SRE needs).

**Visual:** [imagine: timeline scrubber UI with services arrayed vertically, state and trace data plotted across, scrubbing back in time animates the system state]

## Approach 4: Runbook-Integrated Incident Tool

**Summary:** Workbench is built around runbook execution. During an incident, the SRE opens Workbench and selects (or auto-matches) a runbook; Workbench drives the runbook step by step, pulling relevant data into each step. Workbench is the incident-time orchestrator.

**Differentiator served:** D4 (SRE workflow) at maximum strength; D1 (incident-time) and D2 (one screen) strong.

**Risk:** Adjacent to PagerDuty / Incident.io / Rootly territory. The team explicitly excluded SRE workflow tools from competitor set; this approach pulls Workbench back into that competitor space. Differentiator analysis becomes ambiguous.

**Visual:** [imagine: runbook on left, current step highlighted, relevant trace + state data populating in the right panel for that step]

## Approach 5: AI-Assisted Disorientation Compressor

**Summary:** Workbench's central feature is an AI assistant trained on distributed-systems failure patterns. The SRE arrives at the incident; Workbench's AI proposes "here's what is likely happening" with cited trace + state evidence. The SRE judges, then drives.

**Differentiator served:** D1 (incident-time disorientation compression) at maximum strength via AI augmentation; D3 (auto-correlation) strong.

**Risk:** AI hallucinations during incidents are dangerous. Customer trust in AI-proposed root cause is unestablished. Team has no AI/ML research function (acknowledged in Basics team-advantage section). Differentiator strength depends on AI quality the team cannot easily ship.

**Visual:** [imagine: incident timeline at top, AI-proposed root-cause card with cited evidence below, SRE interacts with the AI proposal]

## Approach Summary Table

| # | Approach | Data model | Build complexity | Differentiator strength | Notable risk |
|---|---|---|---|---|---|
| 1 | Multi-Source Aggregator | Pull from existing tools only | Low | Strong on D2, D4, D7 | API limits, competitor dependency |
| 2 | Sidecar + Aggregator | Owned sidecar + aggregator | High | Strong on D3, D6 | Heavier sales motion, double scope |
| 3 | Replay-First | Owned short-window storage | Medium-High | Maximum on D6 | Storage cost, narrow positioning |
| 4 | Runbook-Integrated | Runbook orchestration | Medium | Strong on D4 | Pulls into PagerDuty competitor set |
| 5 | AI-Assisted | AI on traces + state | Very High | High-variance on D1 | Hallucination risk, no ML research function |

## Decider Checkpoint

**Priya sign-off required to proceed to Magic Lenses (Day 2 PM).**

- [x] Priya confirms 5 approaches generated (within minimum-3, max-7 range).
- [x] Priya confirms all 5 are within the specialized-debugger / incident-time direction locked Day 1.
- [x] Priya notes that Approach 4 partially crosses into PagerDuty competitor space; Magic Lenses will likely penalize.
- [x] Priya notes that Approach 5 (AI-assisted) has the highest upside if AI works but the team has the highest reason to be skeptical of execution; Magic Lenses will surface this.
- [x] Priya accepts the team's choice not to generate approaches 6 and 7; the design space within "incident-time specialized debugger" feels saturated by these 5.

**Signed:** Priya, 2026-05-22 11:35 PT
