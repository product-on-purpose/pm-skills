---
title: "Design Sprint Brief: Workbench One-Screen UX Validation"
description: "Workbench brief locking sprint questions, recruiting (USD 900 authorized), Figma clickable prototype with anonymized pilot incident data, remote interview format with SRE-realistic incident scenarios, Friday Decider window before sprint Monday 2026-08-03."
artifact: design-sprint-brief
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

Following readiness Go 2026-07-22, Jin confirmed 6 slots by 2026-07-30 (1 day ahead of deadline). Priya invokes `tool-design-sprint-brief` on Friday 2026-07-31 to lock remaining decisions.

## Challenge Statement and Why-Now

Redesign the Workbench one-screen UX so SREs in incident-time disorientation phase identify "what is happening" + "what to look at first" within 60 seconds of opening Workbench, without reverting to source tools. This week because the pilot retention conversation with the Series C fintech closes 2026-08-21 and Priya's seed-round target close is 2026-09-15; the UX validation gates both.

## Sprint Questions

1. **Will senior SREs in a simulated incident-time disorientation phase identify "what is happening" + "what to look at first" within 60 sec of opening the redesigned Workbench one-screen?** (Tests pilot-derived A9; lead question.)
2. **Does the redesigned one-screen reduce the "revert to source tool within 3 min" rate observed in the pilot from 50% to under 20%?**
3. **Do SREs describe the one-screen as augmenting (not replacing) their existing tools, in alignment with the FS positioning principle?**
4. **When asked "what would you pay per-seat for this", do SREs self-describe a sustainable price point within the USD 150-300 band?**

## Decider Attendance Windows

| Window | Day | Required for |
|---|---|---|
| Mon AM | 2026-08-03 09:00-12:30 PT | Map and Target |
| Wed AM | 2026-08-05 09:00-12:30 PT | Heat map + supervote |
| Fri PM | 2026-08-07 14:00-18:00 PT | Decider review by 17:30 |
| Full week | 2026-08-03 through 2026-08-07 | All 5 days |

## Team Roster

| Attendee | Role | Mon-Fri |
|---|---|---|
| Priya | Decider, PM | all 5 days |
| Marcus | Engineering | all 5 days (Thu build pair) |
| Ari | Design lead | all 5 days (Tue sketches + Thu Figma build) |
| Jin | Customer expert + interviewer | all 5 days; owns Fri moderation |

## Customer Recruiting Plan

| Element | Value |
|---|---|
| Target profile | Senior SREs at Series B-D US startups with significant distributed-systems complexity; on-call required |
| Source | Series C fintech (2) + Priya's SRE network (3) + 1 buffer |
| Count needed | 5 (6 confirmed; 1 buffer) |
| Incentive | USD 150 per 60-min |
| Recruiter | Jin |
| Deadline | 2026-07-31 (CLOSED 2026-07-30) |
| Friday schedule | 09:00 / 10:30 / 12:00 / 14:00 / 15:30 / 17:00 PT buffer |

## Prototype Medium Decision

**Medium:** Clickable Figma of one-screen UX with realistic incident data (anonymized from pilot incidents).

**Rationale:** UX is what's being tested; Figma renders the dense one-screen convincingly with real-feeling data without requiring a live aggregation backend during the interview. Ari has proven capability.

**Build owners:** Ari (Maker + Stitcher) + Marcus (incident-data realism + interaction logic).

## Interview Format

**Format:** Remote moderated via Zoom + Figma screen-share.

**Moderator:** Jin. **Observer setup:** Priya + Marcus + Ari in Zoom breakout.

**Script structure:** Five-Act Interview. Tasks Act: "You are on-call. PagerDuty just fired. You open Workbench. Walk me through what you see and what you would do."

## Success Criteria

1. Sprint Q1 validated 4-of-5 (median 60-sec comprehension).
2. Priya makes scale / iterate / pivot / stop call by 17:30 Friday.
3. Sprint Q2 directional validation (4-of-5 customers describe not reverting within 3 min).
4. Sprint Q3 augment-not-replace framing validated 4-of-5.

## Decider Checkpoint

- [x] Priya confirms challenge + sprint questions
- [x] Priya confirms team + attendance
- [x] Priya re-confirms recruiting + USD 900 budget
- [x] Priya confirms Figma medium
- [x] Priya confirms Five-Act script + remote format
- [x] Priya confirms success criteria + 17:30 Friday call

**Signed:** Priya (founder, PM), 2026-07-31 16:30 PT.

**Brief locked. Sprint begins Monday 2026-08-03 09:00 PT.**