# Recommendable skill tiers

Section 7 of a prioritized action plan may recommend a downstream pm-skill only from Tier 1 or conditional Tier 2 below. Tier 3 and this skill itself are never recommended. The names here are the exact, current skill names; the name-safety rule in SKILL.md checks against this list (and the build-time `skill-catalog.md`) before naming any skill.

## Routing rules

1. Recommend only from Tier 1 (always) or Tier 2 (when the context matches the condition).
2. **Name safety:** name a skill only if its exact name appears in `skill-catalog.md` or in the Tier 1 list below. If you cannot confirm an exact name, describe the next step in plain language instead. Never invent or approximate a name.
3. For the Foundation Sprint and Design Sprint families, recommend the family entry point or hand off to `using-workflows`; do not stitch together individual sub-step skills.
4. Cap Section 7 at the top 3 efforts (P1 to P3). Skip efforts with no clean skill mapping.

## Tier 1: always recommendable (core work products)

The 30 phase skills plus the 4 core foundation artifacts. This is the embedded fallback core used when no fresh catalog is loaded.

**Discover (5):** `discover-competitive-analysis`, `discover-interview-synthesis`, `discover-journey-map`, `discover-market-sizing`, `discover-stakeholder-summary`

**Define (5):** `define-hypothesis`, `define-jtbd-canvas`, `define-opportunity-tree`, `define-prioritization-framework`, `define-problem-statement`

**Develop (4):** `develop-adr`, `develop-design-rationale`, `develop-solution-brief`, `develop-spike-summary`

**Deliver (6):** `deliver-acceptance-criteria`, `deliver-edge-cases`, `deliver-launch-checklist`, `deliver-prd`, `deliver-release-notes`, `deliver-user-stories`

**Measure (6):** `measure-dashboard-requirements`, `measure-experiment-design`, `measure-experiment-results`, `measure-instrumentation-spec`, `measure-okr-grader`, `measure-survey-analysis`

**Iterate (4):** `iterate-lessons-log`, `iterate-pivot-decision`, `iterate-refinement-notes`, `iterate-retrospective`

**Core foundation (4):** `foundation-persona`, `foundation-lean-canvas`, `foundation-okr-writer`, `foundation-stakeholder-update`

## Tier 2: conditional (recommend only when the context matches)

| Skill(s) | Recommend only when |
|---|---|
| `foundation-meeting-agenda`, `foundation-meeting-brief`, `foundation-meeting-recap`, `foundation-meeting-synthesize` | the next step is preparing for, running, or following up a meeting |
| Foundation Sprint family (`tool-foundation-sprint-*`) | the next step is framing a new product thesis; recommend the entry point or hand to `using-workflows` |
| Design Sprint family (`tool-design-sprint-*`) | the next step is a structured design sprint; recommend the entry point or hand to `using-workflows` |
| `tool-note-and-vote` | the next step is structured group facilitation or prioritization in a session |
| `utility-pm-critic` | the next step is adversarial review of an existing artifact |
| `utility-mermaid-diagrams` | the next step is visualizing a flow, structure, or timeline |
| `utility-slideshow-creator` | the next step is turning the work into a presentation |

## Tier 3: never recommend

Library-maintenance machinery and this skill itself. These are not PM work products.

`utility-pm-skill-builder`, `utility-pm-skill-auditor`, `utility-pm-skill-validate`, `utility-pm-skill-iterate`, `utility-pm-release-conductor`, `utility-pm-changelog-curator`, `utility-pm-workflow-orchestrator`, `utility-update-pm-skills`, and `foundation-prioritized-action-plan` (self).
