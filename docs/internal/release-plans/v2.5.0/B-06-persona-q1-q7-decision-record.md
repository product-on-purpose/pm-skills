# B-06 Persona Builder Q1-Q7 Decision Record

Status: Closed-aligned (Q1-Q7 signed)  
Blocker: B-06  
Decision owner: Maintainers  
Decision date: 2026-02-16  
Target release: v2.5.0  
Last updated: 2026-03-16

## Objective

Consolidate persona-builder decision threads into one durable tracked record so implementation assumptions are explicit and non-contradictory.

## Signed Decision Matrix (Q1-Q7)

| ID | Question | Signed answer (2026-02-16) | Status |
| --- | --- | --- | --- |
| Q1 | Should persona reference content live in top-level `library/`? | Yes, if persona capability is shipped; use `library/personas/` as read-only reference content. | Signed |
| Q2 | Include Sales Engineer in Tier 0 persona set? | Yes, include for buyer-side technical-review perspective. | Signed |
| Q3 | Use one format or split formats for library vs generated persona outputs? | Split: richer archetype format for library, lighter format for generated persona artifacts. | Signed |
| Q4 | Should `artifacts/` be created/ignored now? | Defer creation until output-location governance explicitly requires it. | Signed |
| Q5 | Should phase value be `foundation`? | No for v2.5.0. Per B-05, keep 6-phase model and do not assume a shipped `foundation` phase for persona work. | Signed |
| Q6 | MCP exposure model for persona capability? | Use both tools and resources if persona capability ships. | Signed |
| Q7 | Should `/persona` support library-archetype starting points? | Yes, optional; no hard flag required if prompt context is clear. | Signed |

## Evidence Inputs

- `docs/internal/release-plans/v2.5.0/B-05-foundation-phase-decision.md` (Q5 dependency, now signed defer)
- `docs/internal/release-plans/v2.5.0/B-05_B-06-closure-path.md` (tracked closure-path context)
- `docs/internal/release-plans/v2.5.0/execution-plan.md` (release-train context)

## Assumption Closure and Supersession

The following active assumptions are now superseded by this signed record:
1. "`foundation` is already adopted for v2.5.0 persona work."
2. "`artifacts/` location is already standardized."
3. Any persona plan that conflicts with this Q1-Q7 matrix without explicit supersession note.

Canonical supersession anchor:
- `docs/internal/release-plans/v2.5.0/B-06-persona-q1-q7-decision-record.md` (this file)

Dependency anchor:
- `docs/internal/release-plans/v2.5.0/B-05-foundation-phase-decision.md`

## Closure Gates (Satisfied)

1. Each Q1-Q7 entry is signed with owner/date.  
2. Contradictory active persona assumptions are explicitly superseded by this record.  
3. Release-planning checklist/docs are updated to reference this signed record.  
4. If persona capability ships in v2.5.0, pm-skills and pm-skills-mcp behavior/docs must match these signed decisions.
