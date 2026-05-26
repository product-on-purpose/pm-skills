# Naming Map - canonical short names for all 63 skills

> The v2.22.0 Phase 1 artifact (resolves OQ-4). Old phase-prefixed name -> proposed short canonical name.
> Rule (from [`command-skill-naming-standard.md`](command-skill-naming-standard.md) R-A1): strip the leading phase/classification token (`define-`, `deliver-`, `develop-`, `discover-`, `foundation-`, `iterate-`, `measure-`, `tool-`, `utility-`); phase moves to `metadata.classification` (already present).
> Old names are retained as deprecated aliases for v2.22.0 (D-V31-4=B); removed at the [v3.0.0](../v3.0.0/plan_v3.0.0.md) convergence.
> Drafted 2026-05-25. **Collision check: PASS - all 63 short names are unique** (see bottom).

## define (5)
| Old name | Short name |
|---|---|
| define-hypothesis | hypothesis |
| define-jtbd-canvas | jtbd-canvas |
| define-opportunity-tree | opportunity-tree |
| define-prioritization-framework | prioritization-framework |
| define-problem-statement | problem-statement |

## deliver (6)
| Old name | Short name |
|---|---|
| deliver-acceptance-criteria | acceptance-criteria |
| deliver-edge-cases | edge-cases |
| deliver-launch-checklist | launch-checklist |
| deliver-prd | prd |
| deliver-release-notes | release-notes |
| deliver-user-stories | user-stories |

## develop (4)
| Old name | Short name |
|---|---|
| develop-adr | adr |
| develop-design-rationale | design-rationale |
| develop-solution-brief | solution-brief |
| develop-spike-summary | spike-summary |

## discover (5)
| Old name | Short name |
|---|---|
| discover-competitive-analysis | competitive-analysis |
| discover-interview-synthesis | interview-synthesis |
| discover-journey-map | journey-map |
| discover-market-sizing | market-sizing |
| discover-stakeholder-summary | stakeholder-summary |

## foundation (8)
| Old name | Short name |
|---|---|
| foundation-lean-canvas | lean-canvas |
| foundation-meeting-agenda | meeting-agenda |
| foundation-meeting-brief | meeting-brief |
| foundation-meeting-recap | meeting-recap |
| foundation-meeting-synthesize | meeting-synthesize |
| foundation-okr-writer | okr-writer |
| foundation-persona | persona |
| foundation-stakeholder-update | stakeholder-update |

## iterate (4)
| Old name | Short name |
|---|---|
| iterate-lessons-log | lessons-log |
| iterate-pivot-decision | pivot-decision |
| iterate-refinement-notes | refinement-notes |
| iterate-retrospective | retrospective |

## measure (6)
| Old name | Short name |
|---|---|
| measure-dashboard-requirements | dashboard-requirements |
| measure-experiment-design | experiment-design |
| measure-experiment-results | experiment-results |
| measure-instrumentation-spec | instrumentation-spec |
| measure-okr-grader | okr-grader |
| measure-survey-analysis | survey-analysis |

## tool (15)
The `tool-` token is stripped; the `design-sprint-` / `foundation-sprint-` segments stay because they are part of the descriptive name (sprint stages), not a phase prefix.

| Old name | Short name |
|---|---|
| tool-design-sprint-brief | design-sprint-brief |
| tool-design-sprint-decide-and-storyboard | design-sprint-decide-and-storyboard |
| tool-design-sprint-map-and-target | design-sprint-map-and-target |
| tool-design-sprint-prototype-plan | design-sprint-prototype-plan |
| tool-design-sprint-readiness | design-sprint-readiness |
| tool-design-sprint-sketch | design-sprint-sketch |
| tool-design-sprint-test-and-score | design-sprint-test-and-score |
| tool-foundation-sprint-approach-options | foundation-sprint-approach-options |
| tool-foundation-sprint-basics | foundation-sprint-basics |
| tool-foundation-sprint-brief | foundation-sprint-brief |
| tool-foundation-sprint-differentiation | foundation-sprint-differentiation |
| tool-foundation-sprint-founding-hypothesis | foundation-sprint-founding-hypothesis |
| tool-foundation-sprint-magic-lenses | foundation-sprint-magic-lenses |
| tool-foundation-sprint-readiness | foundation-sprint-readiness |
| tool-note-and-vote | note-and-vote |

## utility (10)
The `utility-` token is stripped; `pm-` stays (it is part of the name, not a phase prefix).

| Old name | Short name |
|---|---|
| utility-mermaid-diagrams | mermaid-diagrams |
| utility-pm-changelog-curator | pm-changelog-curator |
| utility-pm-critic | pm-critic |
| utility-pm-release-conductor | pm-release-conductor |
| utility-pm-skill-auditor | pm-skill-auditor |
| utility-pm-skill-builder | pm-skill-builder |
| utility-pm-skill-iterate | pm-skill-iterate |
| utility-pm-skill-validate | pm-skill-validate |
| utility-slideshow-creator | slideshow-creator |
| utility-update-pm-skills | update-pm-skills |

## Collision check (OQ-4)

- **63 old names -> 63 short names, all unique.** No two skills collapse to the same short name.
- Near-pairs verified distinct: `okr-writer` vs `okr-grader`; `design-sprint-readiness` vs `foundation-sprint-readiness`; `hypothesis` (define) vs `foundation-sprint-founding-hypothesis`; `stakeholder-summary` (discover) vs `stakeholder-update` (foundation).
- No short name starts with `workflow-`, so no collision with the 10 retained `workflow-*` commands.
- No short name equals a known Claude Code built-in command (review, run, init, loop, schedule, verify). Plugin skills are namespaced (`/pm-skills:<name>`) regardless, so the namespace disambiguates even if a future built-in matched.

## Notes
- The `pm-skill-*` and sprint families keep their descriptive multi-word names; "short" means "no phase prefix," not "single word."
- Re-run this check programmatically in Phase 1 before the rename (the validator in [`command-skill-naming-standard.md`](command-skill-naming-standard.md) Section 8 enforces uniqueness on an ongoing basis).
