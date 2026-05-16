---
title: "Design Sprint Prototype Plan: Workbench One-Screen UX Validation"
description: "Workbench Thursday morning artifact: 5 canonical roles assigned (Ari Maker+Stitcher, Marcus Asset Collector for incident-data realism + interaction logic, Priya Writer for callout copy, Jin Interviewer), fidelity bar locked for 8 panels, Five-Act script with simulated-incident Tasks act, trial run scheduled."
artifact: design-sprint-prototype-plan
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

Thursday morning 2026-08-06, 09:30 PT. Wednesday closed with Sketch A supervoted all-in-one and an 8-panel storyboard locked. The team invokes `tool-design-sprint-prototype-plan` before parallel build work begins.

## Prototype Role Plan

| Role | Owner | Day allocation | Notes |
|---|---|---|---|
| Maker | Ari | 09:30-16:30 PT | Owns 8 Figma frames; phone + laptop variants for frames 3-7 |
| Stitcher | Ari (paired with Marcus) | 13:00-16:30 PT | Inter-frame interactions; deeplink flow Panel 2->3 |
| Writer | Priya | 09:30-12:30 PT | Callout copy ("user-service is red; spreading to checkout"), top-action language, severity wording |
| Asset Collector | Marcus | 09:30-15:00 PT | Anonymized incident-data from 3 real pilot incidents; service-graph for fintech use case |
| Interviewer | Jin | 09:30-12:30 script + 14:00-15:00 mock-run + 15:30-17:00 trial run | Simulated-incident script |

**Doubling-up:** 4-person team; Ari covers Maker + Stitcher.

## Prototype Brief

**What to build:** All 8 storyboard panels as Figma frames; full interaction Panels 1-7; Panel 8 (rollback) is a non-interactive end state. Phone + laptop variants for Panels 3-7.

**Fidelity bar:** SRE-realistic data (anonymized pilot incidents); on-brand visual design; copy final; interactions trigger within 200ms.

**Time:** Ari 5 hrs for Figma build; Marcus 3 hrs for data + 2 hrs for interaction-logic edge cases.

**NOT being built:** Real API aggregation backend; real rollback action (simulated). Onboarding flow before Panel 1 (interviewer manually opens Workbench to Panel 2 state).

## Interview Script (Five-Act)

### Welcome (5 min)

Hi [name], thanks for joining. I'm Jin. The next 60 min is a conversation; no wrong answers. The prototype you'll see is an SRE incident-response tool; some things won't work. Recording today per the consent form. Sound good?

### Context (8 min)

1. Tell me about your most recent on-call shift. What incidents did you handle?
2. When PagerDuty fires, what is the first tool you open and why?
3. How long does it typically take you to figure out "what is happening" after the alert?
4. When do you revert to a different tool, and why?

### Intro (4 min)

I'm going to put you in a simulated incident scenario. You just got paged at 2:34 AM. You're going to open Workbench. Tell me what you see, what you think, and what you'd do next. Think out loud.

### Tasks (30 min; one simulated incident)

**Task 1 (15 min):** "It's 2:34 AM. PagerDuty just fired. Open Workbench. Walk me through what you see and what you'd do." Probe: "What's broken? How did you know? How long did that take? Would you stay here or open another tool? Why?"

**Task 2 (10 min):** "Imagine the incident has been going for 8 minutes. You think you know what's wrong. Show me how you'd verify your hypothesis using Workbench. Would you need anything else?"

**Task 3 (5 min):** "Imagine this same Workbench but for a different type of incident: a slow degradation over 3 hours rather than a sudden break. Would the one-screen still work? What would you want different?"

### Debrief (10 min)

1. Overall reaction?
2. Would you actually use this at incident time vs reverting to Datadog/Honeycomb/etc.?
3. What would you pay per-seat per month?
4. What would you change?

## Trial-Run Checklist

Run with Ari as fake customer 15:30-17:00 PT.

- [ ] Prototype reaches all 8 panels
- [ ] Phone + laptop variants both work for Panels 3-7
- [ ] Anonymized incident data is SRE-realistic; service names + metrics believable
- [ ] Inline drill-down (Panel 6) works without source-tool revert
- [ ] Jin can complete full script in 55-65 min
- [ ] Zoom recording + Otter transcription armed
- [ ] Remote observer setup (Zoom breakout)
- [ ] Calendar invites confirmed for all 5 + buffer

## Participant Confirmation Tracker

All 5 + buffer confirmed Thursday morning.

## Decider Checkpoint

- [x] Priya approves role plan
- [x] Priya approves fidelity bar
- [x] Priya approves Five-Act script with simulated-incident Tasks
- [x] Priya approves trial-run gate
- [x] Priya confirms Friday 14:00-18:00 PT Decider window

**Signed:** Priya (founder, PM), 2026-08-06 09:55 PT.

**Build authorized. Ari begins Figma build 10:00 PT.**