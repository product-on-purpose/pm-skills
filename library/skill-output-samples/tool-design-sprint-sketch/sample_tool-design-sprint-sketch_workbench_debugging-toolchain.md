---
title: "Design Sprint Sketch: Workbench One-Screen UX Validation"
description: "Workbench Tuesday artifact: 12 lightning demos focused on incident-response and dense-data UX, swarm assignment, 4 textually-described sketches of one-screen layout, recruiting tracker confirms all 5 + 1 buffer with no Tuesday cancellations."
artifact: design-sprint-sketch
version: "1.0"
repo_version: "2.15.0"
skill_version: "0.1.0"
created: 2026-05-16
status: sample
thread: workbench
context: "Workbench incident-time SRE observability aggregator; Design Sprint week of 2026-08-03 testing one-screen UX after Series C fintech design-partner pilot validated A1 technical feasibility"
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Tuesday 2026-08-04. Monday closed with Priya selecting the first-60-second orient moment as target. The team invokes `tool-design-sprint-sketch` to produce 4 independent sketches against that target.

## Lightning Demo Board

12 demos at 3 min each. Patterns extracted by Jin.

| Presenter | Demo source | Pattern |
|---|---|---|
| Priya | Datadog incident dashboard (her old product) | Time-correlation across services; visual blast-radius |
| Priya | Bloomberg Terminal | Information-dense glanceability; specialist UI |
| Priya | NASA mission control displays | Hierarchical attention; one screen = one mental model |
| Marcus | Honeycomb trace flame graph | Cause-effect visual chain |
| Marcus | Linear cycle view | Card stack with severity coloring |
| Marcus | Splunk dashboard panels | Time-series at top, anomaly callouts below |
| Ari | Apple Watch workout summary | Single-glance synthesis of 5+ metrics |
| Ari | Tesla incident dashboard | Color-coded severity + spatial layout |
| Ari | iOS Control Center | Tile-based dense surface; tap to drill-down |
| Jin | PagerDuty incident page (current state of the art) | Timeline-first; chronological event stream |
| Jin | Rootly incident playbook | Action-oriented; "what to do" rather than "what is happening" |
| Jin | Status page (Statuspage.io) | Customer-facing simplification of incident-state |

**Patterns** (Jin read): time-correlation (Priya/Datadog); single-glance synthesis (Ari/Apple Watch); color-coded blast-radius (Ari/Tesla); action-oriented (Jin/Rootly).

## Sketch Assignment Plan

**Approach:** Swarm. All 4 sketch the first-60-sec orient.

**Format:** Each sketch shows the laptop one-screen view + phone view side-by-side.

**Time:** Notes 20 / Ideas 20 / Crazy 8s 8 / Solution Sketch 75 min.

## Four-Step Sketches

### Sketch A (Jin's; attribution stripped Wednesday morning)

**Solution Sketch description:** One-screen organized as "What broke" top-left (service map with the broken service red-bordered); "Is it spreading" top-right (blast-radius chart showing 5-min trajectory); "What to look at first" bottom-band (3 ranked anomaly callouts with one-tap drill-down to source tool). Phone view collapses to a single vertical stack: broken service first, spread chart, top action.

**Distinctive elements:** Spatial layout maps to mental model ("what is broken" is always top-left); ranked anomaly band is action-oriented.

### Sketch B (Marcus's; attribution stripped)

**Solution Sketch description:** Time-series ribbon across the top (last 15 min, all 4 source-tool data streams aligned); below: anomaly callouts marked as time-correlated clusters. Clicking a callout opens a trace flame-graph drill-down inline (no source-tool revert). Severity badges on each callout. Phone view shows ribbon + top 3 callouts only.

**Distinctive elements:** Time-correlation as primary structural metaphor; flame-graph drill-down inline (no revert needed).

### Sketch C (Ari's; attribution stripped)

**Solution Sketch description:** Single-glance "vital signs" view at top (5 metrics: error rate, p99 latency, saturation, throughput, deps-health). Below: 3 anomaly tiles with severity colors and "what changed" annotation. Drill-down via long-press (touch) or click (laptop). Phone-first design; laptop view is the same UI scaled up.

**Distinctive elements:** Phone-first (laptop derivative); single-glance vital signs metaphor borrowed from Apple Watch.

### Sketch D (Priya's; attribution stripped)

**Solution Sketch description:** Blast-radius visualization as the central element (service dependency graph; broken services red; affected services orange; healthy gray). Sidebar shows the 3 most-recent anomaly events with timestamps. "What to look at first" is a single highlighted callout below the graph with the reasoning shown inline.

**Distinctive elements:** Blast-radius graph as primary; reasoning shown inline (not hidden behind a click).

## Recruiting Tracker Update

All 5 + 1 buffer confirmed. No cancellations Tuesday.

## Decider Checkpoint

- [x] Priya confirms all 4 sketches produced
- [x] Priya confirms attribution stripped before Wednesday
- [x] Priya commits Wednesday morning 09:00-12:30 PT
- [x] Recruiting: 5 confirmed; 1 buffer

**Signed:** Priya (founder, PM), 2026-08-04 16:50 PT.