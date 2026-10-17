---
title: "Design Sprint Test and Score: Workbench One-Screen UX Validation"
description: "Workbench Friday sprint-closing artifact: 5 SRE interviews, scorecard validates Sprint Question 1 4-of-5 on 60-sec orient comprehension, Q2 revert-rate dropped to 20% in simulation, Q3 augment-not-replace validated 5-of-5, Q4 pricing held at USD 200 median, Priya Decider call BUILD with scope amendment to add Sketch B inline-drill-down patterns to v0.1."
artifact: design-sprint-test-and-score
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

Friday 2026-08-07. Trial run passed Thursday 17:15 PT. 5 SREs completed the full Five-Act with simulated-incident Tasks Friday 09:00-16:30 PT. The team invokes `tool-design-sprint-test-and-score` to capture observations, score, and frame Priya's call.

## Per-Customer Interview Observation Notes

### Customer 1: Fintech-SRE-A (09:00; design partner) [fictional]

**Profile:** Series C fintech; 4 years on-call; uses Datadog + Sentry primary. [fictional]

**Context:** Most recent on-call: 3 alerts in 7 days. First tool typically Datadog dashboard. Disorientation time typically 4-8 min for unfamiliar incident types. [fictional]

**Task 1:** Opened Workbench Panel 2 deeplink. Read service-map in 4 sec; identified "user-service red, spreading to checkout" in another 6 sec. Total "what is broken" comprehension: 12 sec. Top action callout read in 18 sec. Total orient: 35 sec. [fictional]

"Would I stay here? Yes. The blast-radius answer is exactly what I open Datadog for and this gives it in 10 seconds." [fictional]

**Task 2:** Used inline drill-down on Panel 6 deployment view. [fictional] "I would not have left Workbench to check this. That's the win." [fictional]

**Task 3:** "Slow degradation is harder for the one-screen. I'd want a 1-hour time selector option." [fictional]

**Debrief:** Strong yes. Pricing USD 200/seat. [fictional]

### Customer 2: Fintech-SRE-B (10:30; design partner) [fictional]

**Profile:** Series C fintech (Jin's colleague); 6 years on-call; Datadog + Honeycomb. [fictional]

**Task 1:** Orient 50 sec. [fictional] "Slower than C1 but I needed to read the anomaly band twice to trust the ranking." [fictional]

**Task 2:** Drill-down used; appreciated inline. [fictional] "Would not revert." [fictional]

**Task 3:** "Slow-degradation case: agree with C1; this UI is for the sudden-break incident." [fictional]

**Debrief:** Yes with caveats. Pricing USD 175. [fictional]

### Customer 3: SeriesB-SRE-C (12:00) [fictional]

**Profile:** Series B AI; 3 years on-call; lean stack (Sentry only). [fictional]

**Task 1:** Orient 80 sec. [fictional] "I don't have a service graph at my company so the service-map area felt empty when I imagined this for my context." [fictional]

**Task 2:** Drill-down worked but "I would have wanted to see the raw error rate alongside, not just the deployment diff." [fictional]

**Task 3:** "Slow degradation: yes the one-screen would not work for that." [fictional]

**Debrief:** "I'd try it. Pricing USD 150." [fictional]

### Customer 4: SeriesB-SRE-D (14:00) [fictional]

**Profile:** Series B fintech; 5 years on-call; Datadog primary. [fictional]

**Task 1:** Orient 45 sec. [fictional] "This is the layout I've been wishing for. The 'is it spreading' question is the one Datadog makes me click 3 times to answer." [fictional]

**Task 2:** Drill-down loved. [fictional]

**Task 3:** Slow degradation noted. [fictional]

**Debrief:** Strong yes. Pricing USD 250. [fictional]

### Customer 5: SeriesD-SRE-E (15:30) [fictional]

**Profile:** Series D ecommerce; 10 years on-call; Datadog + custom dashboards. [fictional]

**Task 1:** Orient 55 sec. [fictional] "Trustable. I'd still want to verify in Datadog the first few uses but then I'd switch." [fictional]

**Task 2:** Drill-down: "This is the bit that changes my behavior. Inline drill-down is how you keep me from reverting." [fictional]

**Task 3:** Slow degradation noted. [fictional]

**Debrief:** Yes after 2-week trial. Pricing USD 225. [fictional]

## Best Quotes

1. "The blast-radius answer is exactly what I open Datadog for and this gives it in 10 seconds." [fictional] - C1
2. "I would not have left Workbench to check this. That's the win." [fictional] - C1
3. "This is the layout I've been wishing for." [fictional] - C4
4. "Inline drill-down is how you keep me from reverting." [fictional] - C5
5. "I don't have a service graph at my company so the service-map area felt empty." [fictional] - C3
6. "Slow degradation is harder for the one-screen." [fictional] - C1
7. "The 'is it spreading' question is the one Datadog makes me click 3 times to answer." [fictional] - C4
8. "I'd still want to verify in Datadog the first few uses but then I'd switch." [fictional] - C5

## Scorecard Grid

| | C1 | C2 | C3 | C4 | C5 | Day-end |
|---|---|---|---|---|---|---|
| Q1: 60-sec orient | Y (35s) [fictional] | Y (50s) [fictional] | partial (80s) [fictional] | Y (45s) [fictional] | Y (55s) [fictional] | **Validated 4-of-5 (median 50s under 60-sec bar; 1 partial at 80s tied to service-graph absence) [fictional]** |
| Q2: revert-rate <20% | Y (no revert) [fictional] | Y [fictional] | partial (would verify in Datadog first; then switch) [fictional] | Y [fictional] | partial (would verify Datadog first 2 weeks) [fictional] | **Directional 3-of-5 hard Y; 2 partial all signal eventual stay [fictional]** |
| Q3: augment-not-replace | Y [fictional] | Y [fictional] | Y [fictional] | Y [fictional] | Y [fictional] | **Validated 5-of-5 [fictional]** |
| Q4: USD 150-300 pricing | Y (200) [fictional] | Y (175) [fictional] | Y (150) [fictional] | Y (250) [fictional] | Y (225) [fictional] | **Validated 5-of-5 (median USD 200; range USD 150-250) [fictional]** |
| Q5: revert reason = data gap vs comprehension | n/a (no revert) [fictional] | "trust building" comprehension [fictional] | "service graph absence" data gap [fictional] | n/a | "trust building" comprehension [fictional] | **Mixed: 2 data, 2 comprehension [fictional]** |

**Decider override:** Q2 marked Directional (not Validated) due to 2 customers self-describing 2-week trust-build period [fictional].

## Observed Patterns

### Worked

- **Blast-radius spatial answer** (5 of 5) [fictional]: "what is broken + is it spreading" comprehensible in <15 sec for all 5 [fictional].
- **Inline drill-down** (5 of 5) [fictional]: unanimous; this is the revert-prevention pattern.
- **Top action callout** (4 of 5) [fictional]: "what to look at first" answered without prompting.
- **Augment positioning** (5 of 5) [fictional]: no SRE described Workbench as replacing existing tools.

### Hesitated

- **Service-graph dependency** (1 of 5 hard; C3) [fictional]: SREs without service-graph config see empty area.
- **Trust-build period** (2 of 5; C3, C5) [fictional]: 2-week period of verifying against Datadog before fully trusting Workbench.

### Broke trust

- None observed in simulation.

### Unexpected

- **Slow-degradation case** (3 of 5 unprompted) [fictional]: the one-screen designed for sudden-break incidents does not work for slow-degradation incidents (3+ hr timescale). Future v0.2 question.
- **Higher pricing tolerance than expected** (5 of 5; median USD 200) [fictional]: exceeds the Datadog price-sensitivity intuition Priya had pre-sprint [fictional].

## Hot Takes

### Priya

Build. The blast-radius + inline-drill-down combination is the wedge. Q2 directional (3-of-5 hard + 2 partial) [fictional] is acceptable because both partials self-describe an eventual switch [fictional]. We need to add the Sketch B inline-drill-down patterns to v0.1 scope (Marcus already advocating for it). Slow-degradation is a v0.2 question worth scoping into the roadmap.

### Marcus

Inline drill-down is build-feasible from existing API integrations. The service-graph-absence concern is a config issue for onboarding, not a UX problem; we can guide customers through service-graph generation in setup. Slow-degradation needs a different UI mode; that's v0.2.

### Ari

The spatial-mental-model layout worked. C3's empty service-map [fictional] is the only design failure mode and it's an onboarding fix, not a layout problem. The Sketch B inline-drill-down patterns merge cleanly into Sketch A; this is the v0.1 design.

### Jin

The trust-build comment from C3 and C5 [fictional] is the biggest finding. Build a 2-week trial onboarding that gives SREs explicit "verify in Datadog" prompts during the first few incidents; once they verify, they switch fully. The product roadmap should include this trial-mode.

## Decider Summary

**The call:** Build, with scope amendment to add Sketch B inline-drill-down patterns to v0.1 + design a 2-week trial-mode onboarding.

**Rationale:** Q1 validated 4-of-5 on 60-sec orient [fictional]. Q3 augment-positioning validated 5-of-5 [fictional]. Q4 pricing validated above expectations (median USD 200; pre-sprint estimate was USD 150) [fictional]. Q2 directional with all 5 SREs signaling eventual stay [fictional]. Inline-drill-down (Sketch B) is the v0.1 revert-prevention pattern. Trust-build period is the v0.1 onboarding design challenge. Slow-degradation is v0.2.

**Highest-confidence learning:** The blast-radius spatial answer + inline drill-down combination is the wedge that converts senior SREs from multi-tool juggling to one-screen-first incident response [fictional].

**Most important revision:** Add inline-drill-down patterns (from Sketch B) to v0.1 + design 2-week trial-mode onboarding.

**Next artifact:** PRD for v0.1 build with notes-added scope and trial-mode onboarding; produced via `deliver-prd` within 5 business days (target: 2026-08-14).

## Decider Checkpoint

- [x] Priya confirms scorecard
- [x] Priya commits to Build with scope amendment
- [x] Priya names highest-confidence learning
- [x] Priya names revision: inline-drill-down + 2-week trial-mode
- [x] Priya names next artifact: PRD by 2026-08-14
- [x] Priya acknowledges Monday handoff: Series C fintech retention conversations resume 2026-08-10

**Signed:** Priya (founder, PM), 2026-08-07 17:25 PT.

**Sprint closed. Foundation Sprint + pilot + Design Sprint arc complete; Build authorized with scope amendment; PRD work begins Monday 2026-08-10.**