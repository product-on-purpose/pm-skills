# [F-55] Foundation Stakeholder Briefings Skill

Status: SHIPPED v2.28.0 (2026-06-20)
Milestone: v2.28.0
Issue: #209
Agent: Claude Opus 4.8

## Scope

Create `foundation-stakeholder-briefings`, a foundation skill (classification `communication`) that takes any source artifact and produces one canonical master document plus a set of audience-tailored briefings, one per stakeholder lens. Realizes the 1-to-N fan-out explicitly deferred from [F-28 (foundation-stakeholder-update)](F-28-stakeholder-update.md) (its brief, line ~89: "generate N versions for N stakeholder groups in one pass? Deferred; not in v1.0.0"). Distinct from `foundation-stakeholder-update` (one async meeting update, single audience), `discover-stakeholder-summary` (mapping stakeholders), and `foundation-persona` (a customer viewpoint).

## Problem

A PM routinely takes one piece of work - a spec, a research synthesis, a launch plan, an experiment result - and rewrites it three to five times, once per audience, because engineering, the exec sponsor, sales, and legal each need a different framing, decision, and level of detail. Done by hand this is slow and the versions drift apart: the exec version claims a date the engineering version does not, the data version invents a metric the master never stated. No existing pm-skill does the fan-out, and the closest (`foundation-stakeholder-update`) is single-audience and meeting-bound.

## How it works

- **Master-first, then project.** Build one audience-neutral master document (What and Why, Decisions, Status, Risks and Open Questions, Asks, Timeline) with each claim numbered (`M1`, `M2`, ...). Render one briefing per chosen audience as a projection of the master; a briefing may omit, reorder, and translate, but may not introduce a claim absent from the master.
- **Nine first-class lenses + Custom**, each defined by the decision it owns, with "not this lens when" boundaries and an overlap matrix (Exec/Board, PMM/Sales, Engineering/Data, Legal/Exec).
- **Source-aware proposal**: the skill detects the source type and proposes the audiences that artifact usually needs; the user accepts, edits, or takes all nine. N=1 supported.
- **Structural contract**: each briefing block carries a `Draws on:` line (master claim IDs it projects) and exactly one `Primary ask:`. The advisory `scripts/check-briefings-trace.mjs` enforces the structural half (every `Draws on:` ID resolves; one ask per block); full projection fidelity (the body adds no untraced claim) is the skill's self-check plus review, not full automation.
- **Output**: a single artifact with delimited, send-ready briefing blocks. A `--split` multi-file mode is documented as deferred.

## Shipped artifacts

- Skill: `skills/foundation-stakeholder-briefings/` (SKILL.md + references/{TEMPLATE, EXAMPLE, audience-lenses, source-type-map}.md + evals/trigger-fixtures.json)
- Validator: `scripts/check-briefings-trace.mjs`
- 18 library samples (6 per Storevine / Brainshelf / Workbench thread)
- Plan: [`../release-plans/v2.28.0/plan_v2.28.0.md`](../release-plans/v2.28.0/plan_v2.28.0.md); Spec: [`../release-plans/v2.28.0/spec_stakeholder-briefings.md`](../release-plans/v2.28.0/spec_stakeholder-briefings.md)
- Release: tag `v2.28.0` at `4fb0d703`; GitHub Release Latest. Catalog 66 -> 67 (foundation 9 -> 10). Two Codex adversarial reviews resolved before tag.
