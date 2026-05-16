---
title: "Design Sprint Readiness: Workbench One-Screen UX Validation"
description: "Workbench post-pilot readiness assessment for a Design Sprint to test the one-screen UX after the Series C fintech design-partner pilot validated A1 (real-time multi-source API aggregation reliability) but flagged A2 (SREs actually use Workbench at incident time) as the remaining open question."
artifact: design-sprint-readiness
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

Workbench just completed its design-partner pilot with the Series C fintech (2026-06-09 through 2026-07-21). A1 (real-time API aggregation reliability) validated cleanly through 4 production incidents during the pilot; aggregation held up under incident-time query loads with one minor Honeycomb rate-limit hiccup that resolved with retry logic. However A2 (SREs actually use Workbench vs reverting to existing tools) showed mixed results: SREs opened Workbench in 60% of pilot incidents (above pre-test commit of 50%) but reverted to source tools within 3 minutes in 50% of those opens. Pilot retro identified the one-screen UX as the lever: SREs said "the screen is dense but I cannot tell what to do with it." Priya invokes `tool-design-sprint-readiness` on 2026-07-22 to validate a Design Sprint week of 2026-08-03 to redesign the one-screen UX.

## Inputs Captured

**Challenge description:**

> Redesign the Workbench one-screen UX so that an SRE in the disorientation phase of a production incident (first 5-20 minutes) can identify "what is happening" and "what should I look at first" within 60 seconds of opening Workbench, without reverting to source tools (Datadog, Sentry, Honeycomb, Grafana) during that window. Test through a clickable Figma prototype with 5 senior SREs at Series B-D companies Friday 2026-08-07.

**Existing hypothesis:**

> Founding Hypothesis (2026-05-22): real-time multi-source aggregator for incident-time disorientation phase. Pilot validated A1 (technical feasibility); A2 (SREs actually use Workbench at incident time vs revert) showed mixed results - 60% open rate but 50% revert within 3 min. Pilot-derived A9 added: "One-screen UX comprehensibility determines whether SREs stay in Workbench or revert to source tools." A9 is the DS lead question.

**Customer access status:** Jin owns recruiting; 2 slots filled by Series C fintech SREs (incl Jin's colleague on-call lead); 3 slots from Priya's network (2 Series B + 1 Series D SRE leads). Honorarium USD 150 per 60-min interview (B2B SRE rate). Estimated 9 days to confirm all 5.

**Decider name and availability:** Priya, full-week availability for 2026-08-03 to 2026-08-07.

**Team composition draft:**

- Priya (founder, PM; Decider; ex-Datadog product)
- Marcus (engineering; ex-Splunk tracing; Maker pair)
- Ari (design lead; one-screen UX owner)
- Jin (SRE on-call at design-partner; Friday interview moderator)

**Prototype medium (proposed):** Clickable Figma of one-screen UX with realistic incident data (sampled from anonymized pilot incidents). Ari can build in 1 day.

## Readiness Verdict: **Go**

The team meets all 8 canonical criteria. Pilot data makes A9 testable; recruiting feasible via design partners + Priya's network.

| Criterion | Status |
|---|---|
| 1. Challenge sprint-worthy | PASS |
| 2. Stakes meaningful | PASS (paid GA gates on UX validation) |
| 3. Decider available | PASS |
| 4. Team size 4-7 | PASS (4 people) |
| 5. 5-day clearable | PASS |
| 6. Customer access | PASS |
| 7. Prototype medium feasible | PASS |
| 8. Output has path forward | PASS (scale or iterate) |

## Customer Recruiting Plan

| Element | Value |
|---|---|
| Target profile | Senior SREs at Series B-D US growth-stage startups with significant distributed-systems complexity; on-call experience required |
| Source | Series C fintech (2 slots; Jin's team) + Priya's SRE network (3 slots) |
| Count | 5 (target 6 confirmed) |
| Incentive | USD 150 per 60-min |
| Recruiter | Jin |
| Deadline | 2026-07-31 |
| Friday schedule | 6 slots Fri 2026-08-07: 09:00 / 10:30 / 12:00 / 14:00 / 15:30 / 17:00 (buffer) |

## Decider Checkpoint

- [x] Priya confirms Go verdict and recruiting plan
- [x] Priya authorizes USD 900 honorarium budget (6 slots x USD 150)
- [x] Priya commits to Friday PM 14:00-18:00 PT Decider window for review by 17:30 PT
- [x] Priya agrees the call will be: scale (commit to paid GA with new UX) / iterate (re-sprint UX) / pivot (Approach 3 Replay-First backup) / stop

**Signed:** Priya (founder, PM), 2026-07-22 16:30 PT.

**Sprint locked for 2026-08-03 through 2026-08-07.**