---
title: "Design Sprint Map and Target: Workbench One-Screen UX Validation"
description: "Workbench Monday artifact: long-term goal, 5 sprint questions, customer-system map from PagerDuty trigger through Workbench open through source-tool revert decision, 3 expert SRE interviews, HMW cluster board, target moment = first-60-sec orient comprehension."
artifact: design-sprint-map-and-target
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

Monday 2026-08-03. Workbench team together remote via Zoom (full distributed team; no in-person component). The team invokes `tool-design-sprint-map-and-target` to converge on the specific moment within the incident-response flow to design against this week.

## Long-Term Goal

Become the default first-30-second incident-response surface for senior SREs at Series B-D companies, with sub-30-sec orientation comprehension and under 10% revert-to-source-tool rate, within 3 years.

## Sprint Questions

1. Will senior SREs in a simulated incident-time disorientation phase identify "what is happening" + "what to look at first" within 60 sec of opening Workbench?
2. Does the redesigned one-screen reduce revert-to-source rate from 50% to under 20%?
3. Do SREs describe the one-screen as augmenting (not replacing) existing tools?
4. Will SREs pay USD 150-300 per-seat per month?
5. When SREs revert to a source tool, do they describe a specific data gap or a comprehension gap?

## Customer or System Map

```
[Production incident occurs] -> [PagerDuty alerts on-call SRE] ->
[SRE acks alert; opens phone or laptop] ->
[Disorientation phase begins; SRE opens FIRST tool] ->
   |
   +-> [Opens Workbench]
   |    |
   |    +-> [Orients within 60 sec; stays in Workbench] -> [LONG-TERM GOAL: faster MTTR]
   |    +-> [Cannot orient; reverts to source tool within 3 min] -> [Pilot signal; A9 fails]
   |
   +-> [Opens source tool first (Datadog, etc.); muscle memory] -> [No Workbench engagement]

(SRE may navigate between tools multiple times in 5-20 min disorientation phase)
```

**Key player:** Senior SRE on-call at Series B-D company; opens Workbench at incident-time within first 5 minutes of PagerDuty alert.

**Map narrative:** PagerDuty fires; SRE has ~30 seconds of conscious thought before muscle memory kicks in. If Workbench is open within those 30 sec AND orients comprehensibly within the next 60 sec, the SRE stays. If not, the SRE reverts to source tools (Datadog, etc.) and Workbench loses the incident. The pilot's 50% revert rate is the comprehension gap; this sprint tests whether the new UX closes it.

## Expert Interview Notes

### Expert 1: Kai Sato, ex-Datadog incident-response engineer (20 min, 13:30 PT)

- Disorientation phase is shorter than people think; SREs hit muscle-memory tool default within ~90 seconds of alert.
- The "what is happening" question is actually two questions: "what is broken" + "is it spreading"; one-screen UX should answer both visually.
- HMW: HMW design a one-screen that answers "what is broken" + "is it spreading" without requiring the SRE to read text?

### Expert 2: Lin Chen, SRE lead at Series D ecommerce; 12-person team (20 min, 14:00 PT)

- "Augment don't replace" only works if the tool genuinely takes 0 time at incident-time. Any onboarding-during-incident kills the tool.
- The biggest tool-adoption killer in SRE land is "I don't trust the data." If Workbench shows different numbers than Datadog, the SRE will distrust Workbench.
- HMW: HMW make the data sources visible without making the one-screen a meta-dashboard?

### Expert 3: Devon Patel, on-call rotation at Series B AI startup (15 min, 14:30 PT)

- Phone vs laptop matters. 40% of alerts happen when the SRE is away from desk; one-screen must work on phone first.
- Color-coded severity is table stakes; specific anomaly indicators matter more (which service, what pattern, what changed).

## HMW Cluster Board

Total HMWs: 61 (team + experts). 5 themes. Heat-map: 4 voters x 3 dots = 12.

| Cluster | Theme | HMW count | Votes |
|---|---|---|---|
| C1 | What is broken + is it spreading (visual answer) | 15 | 5 |
| C2 | Source-data visibility (trust signals) | 13 | 3 |
| C3 | Phone-first one-screen | 11 | 2 |
| C4 | "What to look at first" prioritization | 14 | 2 |
| C5 | Augment-not-replace UI signals | 8 | 0 |

## Target Moment

**Selected:** First-60-second orient moment (SRE opens Workbench post-alert -> orients to "what is happening" -> decides whether to stay or revert).

**Priya's rationale:** Sprint Question 1 + 5 both live in the first-60-sec orient. C1 won the heat map (5 of 12); C4 (prioritization) is the sketch-level concern within that moment. If we validate the orient moment, the revert-rate Q2 follows naturally.

## Decider Checkpoint

- [x] Priya confirms long-term goal (3-year default first-30-sec incident surface)
- [x] Priya confirms 5 sprint questions
- [x] Priya confirms customer-system map
- [x] Priya confirms top HMW clusters
- [x] Priya selects first-60-sec orient as target moment
- [x] Priya commits Wednesday morning attendance

**Signed:** Priya (founder, PM), 2026-08-03 16:45 PT.