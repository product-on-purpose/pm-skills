# B-06 Persona Builder Q1-Q7 Decision Record

Status: In progress (proposed answers; sign-off pending)  
Blocker: B-06  
Target release: v2.5.0  
Last updated: 2026-02-16

## Objective

Consolidate persona-builder decision threads into one durable tracked record so implementation assumptions are explicit and non-contradictory.

## Decision Matrix (Q1-Q7)

| ID | Question | Proposed answer (2026-02-16) | Status |
| --- | --- | --- | --- |
| Q1 | Should persona reference content live in top-level `library/`? | Yes, if persona capability is shipped; use `library/personas/` as read-only reference content. | Proposed |
| Q2 | Include Sales Engineer in Tier 0 persona set? | Yes, include for buyer-side technical-review perspective. | Proposed |
| Q3 | Use one format or split formats for library vs generated persona outputs? | Split: richer archetype format for library, lighter format for generated persona artifacts. | Proposed |
| Q4 | Should `artifacts/` be created/ignored now? | Defer creation until output-location governance explicitly requires it. | Proposed |
| Q5 | Should phase value be `foundation`? | Bound to B-05; no final persona-phase assumption until B-05 is signed. | Blocked by B-05 |
| Q6 | MCP exposure model for persona capability? | Use both tools + resources if persona capability ships. | Proposed |
| Q7 | Should `/persona` support library-archetype starting points? | Yes, optional; no hard flag required if prompt context is clear. | Proposed |

## Evidence Inputs

- `_NOTES/efforts/persona-builder/plan/execution-plan_claude-code.md` (Q1-Q7 decision framing)
- `_NOTES/efforts/persona-builder/plan/plan_persona_claude-opus-4.5.md` (recommended answers and trade-offs)
- `docs/internal/delivery-plan/v2.5/B-05-foundation-phase-decision.md` (phase-decision dependency)

## Assumption Deprecation Targets

The following assumptions must be eliminated from active plans before closure:
1. Assumptions that `foundation` is already adopted.
2. Assumptions that `artifacts/` location is already standardized.
3. Any persona plan that conflicts with this Q1-Q7 matrix without explicit supersession note.

## Closure Gates

Mark B-06 closed only when all are true:
1. Each Q1-Q7 entry is `Signed` with owner/date.
2. Contradictory active persona assumptions are superseded or removed.
3. Release-planning checklist and implementation docs link this signed record.
4. If persona capability ships in v2.5.0, pm-skills and pm-skills-mcp behavior/docs match signed decisions.
