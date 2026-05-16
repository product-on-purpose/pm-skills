---
title: "Design Sprint Decide and Storyboard: Workbench One-Screen UX Validation"
description: "Workbench Wednesday artifact: 4 sketches heat-mapped, Priya supervotes Sketch A all-in-one (spatial-mental-model layout) with reasoning that A best answers both "what is broken" and "what to look at first" without conflicting metaphors, 8-panel storyboard from PagerDuty alert through 60-sec orient through stay-or-revert decision."
artifact: design-sprint-decide-and-storyboard
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

Wednesday 2026-08-05. Tuesday closed with 4 sketches uploaded as A/B/C/D. The team invokes `tool-design-sprint-decide-and-storyboard`.

## Art Museum Layout

Shared Figma; 4 sketches A/B/C/D arrayed. Attribution stripped.

## Heat Map

12 dots total (4 voters x 3).

| Sketch | Dots | Hottest elements |
|---|---|---|
| Sketch A | 5 | Spatial mental-model layout; ranked anomaly band |
| Sketch B | 3 | Inline flame-graph drill-down; time-correlation |
| Sketch C | 2 | Phone-first; vital signs metaphor |
| Sketch D | 2 | Blast-radius graph as central |

## Speed Critique Notes

### Sketch A

**What the team sees:** Spatial layout that maps to SRE mental model (broken=left, spread=right, action=bottom). Ranked anomaly band makes "what to look at first" explicit.

**Compelling:** Spatial layout; ranked action band.

**What would worry me:** Service map top-left requires accurate service graph (config-heavy); for new customers without service-graph config, the layout breaks down. Action band may be too prescriptive for senior SREs.

### Sketch B

**What the team sees:** Time-correlation primary; inline drill-down avoids source-tool revert.

**Compelling:** Time-correlation ribbon; inline flame-graph.

**What would worry me:** Time-series ribbon at top burns vertical space that senior SREs may need for other context; inline flame-graph drill-down works for trace incidents but breaks for state-pollution incidents.

### Sketch C

**What the team sees:** Phone-first single-glance vital signs.

**Compelling:** Phone-first; Apple Watch metaphor.

**What would worry me:** Vital signs at top assumes you already know what's broken; doesn't answer "what is broken." Long-press on laptop is awkward.

### Sketch D

**What the team sees:** Blast-radius graph as central; reasoning inline.

**Compelling:** Blast-radius visualization; inline reasoning.

**What would worry me:** Graph-first requires high-quality dependency data which not all design partners have; reasoning-inline may take screen space at expense of data.

## Straw Poll

| Voter | Pick |
|---|---|
| Priya | A |
| Marcus | B |
| Ari | A |
| Jin | A |

## Supervote

**Decider:** Priya.

**Supervote placement:** Priya places all 3 supervote dots on Sketch A (Sprint book canonical 3-dot supervote). All-in-one (no rumble).

**Decider's rationale:** Sketch A answers both first-60-sec questions ("what is broken" via service-map blast-radius; "what to look at first" via ranked anomaly band) without conflicting metaphors. C1 won the heat map (5 of 12). The service-graph-required concern is a config issue Marcus can solve at onboarding-time; not a UX problem. Sketch B's inline drill-down is the best idea from the rumble alternatives and the team should consider incorporating it into Sketch A's anomaly drill-down (out of scope for this sprint storyboard).

## Rumble vs All-in-One

**Decision:** All-in-one (Sketch A). Sketch B's inline drill-down noted as v0.2 enhancement.

## Storyboard

8 panels from PagerDuty alert through 60-sec orient through stay decision.

| Panel | What customer sees | Action | Response | Notes |
|---|---|---|---|---|
| 1 | Phone lock screen 02:34 AM; PagerDuty alert (critical) | Taps alert | Opens PagerDuty | Pre-Workbench context |
| 2 | PagerDuty incident page; "Open Workbench" deeplink button | Taps deeplink | Workbench loads | Frictionless entry; auto-auth via PagerDuty SSO |
| 3 | Workbench one-screen phone view: service map mini + spread chart mini + top action | Reads (5 sec) | - | First-5-sec scan: "user-service is red; spreading to checkout" |
| 4 | Same view; second read | Reads (15 sec) | - | First-20-sec: identifies "what is broken" |
| 5 | Top action callout: "Check user-service deployment - last deploy 12 min ago" | Reads (15 sec) | - | First-35-sec: "what to look at first" answered |
| 6 | Taps "View deployment" inline drill-down | Tap | Opens deployment diff inline (no source-tool revert) | Inline drill-down prevents revert |
| 7 | Sees diff; identifies the change causing the incident | Reads (10 sec) | - | 45-55-sec: hypothesis formed |
| 8 | Taps "Roll back" inline action | Tap | Rollback initiated via deployment-tool API | Action-taken; incident-handling continues outside Workbench scope |

## Decider Checkpoint

- [x] Priya confirms Sketch A supervote (all-in-one; no rumble)
- [x] Priya confirms 8-panel storyboard build-ready
- [x] Priya confirms storyboard scope (8 panels feasible Thursday)
- [x] Priya accepts the inline-drill-down + service-graph-config concerns
- [x] Priya commits Friday 14:00-18:00 PT

**Signed:** Priya (founder, PM), 2026-08-05 16:55 PT.