# Roster router-eval (claude-haiku-4-5, majority of 3)

| Skill | Val recall | Val precision | All recall | All precision |
|---|---|---|---|---|
| define-hypothesis | 75% | 100% | 90% | 100% |
| define-jtbd-canvas | 75% | 100% | 90% | 100% |
| define-opportunity-tree | 75% | 100% | 90% | 100% |
| deliver-edge-cases | 75% | 100% | 90% | 100% |
| develop-spike-summary | 75% | 100% | 90% | 100% |
| foundation-okr-writer | 75% | 100% | 90% | 100% |
| foundation-persona | 75% | 100% | 90% | 100% |
| define-problem-statement | 100% | 100% | 100% | 100% |
| deliver-acceptance-criteria | 100% | 100% | 100% | 100% |
| deliver-launch-checklist | 100% | 100% | 90% | 100% |
| deliver-prd | 100% | 100% | 100% | 100% |
| deliver-release-notes | 100% | 100% | 100% | 100% |
| deliver-user-stories | 100% | 100% | 100% | 100% |
| develop-adr | 100% | 100% | 100% | 100% |
| develop-design-rationale | 100% | 100% | 90% | 100% |
| develop-solution-brief | 100% | 100% | 100% | 100% |
| discover-competitive-analysis | 100% | 100% | 100% | 100% |
| discover-interview-synthesis | 100% | 100% | 100% | 100% |
| discover-stakeholder-summary | 100% | 100% | 100% | 100% |
| foundation-meeting-recap | 100% | 100% | 100% | 100% |
| iterate-lessons-log | 100% | 100% | 100% | 100% |
| iterate-pivot-decision | 100% | 100% | 100% | 100% |
| iterate-refinement-notes | 100% | 100% | 100% | 100% |
| iterate-retrospective | 100% | 100% | 100% | 100% |
| measure-dashboard-requirements | 100% | 100% | 100% | 100% |
| measure-experiment-design | 100% | 100% | 100% | 100% |
| measure-experiment-results | 100% | 100% | 90% | 100% |
| measure-instrumentation-spec | 100% | 100% | 100% | 100% |
| measure-okr-grader | 100% | 100% | 100% | 100% |

## Misroutes
- define-hypothesis [validation] -> tool-foundation-sprint-founding-hypothesis: "Write the We believe that X for Y will Z statement for the referral incentive idea"
- define-jtbd-canvas [validation] -> discover-interview-synthesis: "Capture the circumstances, motivations, and desired outcomes behind why teams adopt our API product"
- define-opportunity-tree [validation] -> discover-interview-synthesis: "After the user research wrap-up, connect the insights to our north-star outcome and lay out solution options per opportunity"
- deliver-edge-cases [validation] -> utility-pm-critic: "Review this PRD and enumerate the boundary and failure scenarios it does not cover"
- develop-spike-summary [validation] -> measure-experiment-results: "Before we commit engineers to the migration, document what the proof of concept on zero-downtime schema changes actually showed"
- foundation-okr-writer [validation] -> utility-pm-critic: "Critique this OKR draft: are the objectives inspiring and the key results measurable?"
- foundation-persona [validation] -> utility-pm-critic: "Stress-test our pricing decision against a realistic profile of our typical small-team customer"
- deliver-launch-checklist [train] -> tool-design-sprint-readiness: "Build the go/no-go readiness doc for the payments migration, including rollback plan and owner assignments"
- develop-design-rationale [train] -> develop-solution-brief: "We debated three onboarding flows and landed on progressive profiling. Write down why before the context evaporates."
- measure-experiment-results [train] -> foundation-stakeholder-update: "The paywall test finished: treatment up 4.2% on conversion, p=0.03. Turn this into a readout for stakeholders who weren't involved."

## Collisions (no-trigger wrongly picked the skill)

Usage: 1746 calls, 0 fails, calibration 6/6, est $1.1862
