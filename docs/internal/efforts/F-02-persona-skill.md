# [F-02] Persona Skill
Status: Shipped
Milestone: v2.5.0
Issue: #TBD

## Scope

Add a foundation persona skill (`/persona`) supporting three persona types -- product, marketing, and agent -- with deterministic template contracts, evidence trail requirements, and mode-selection UX. Establishes the persona capability as a foundation-classified skill in the pm-skills taxonomy.

## Key Decisions

- Three persona types shipped: product, marketing (buyer-focused), agent (AI behavior spec).
- Single `/persona` command surface with explicit typed modes; no split commands.
- Mode-omitted invocation prompts a 3-option chooser; fallback mode is `product`.
- Foundation classification (`classification: foundation`) diverges from the 24 phase-classified skills.
- Mandatory evidence trail block on all generated persona outputs (B-06 decision record).
- v2.4 output/config contract compatibility preserved (B-05 decision record).

## Artifacts Produced

- `skills/foundation-persona/SKILL.md` -- skill definition
- `skills/foundation-persona/references/TEMPLATE.md` -- output template
- `skills/foundation-persona/references/EXAMPLE.md` -- example output
- `commands/persona.md` -- slash command
- `docs/internal/delivery-plan/v2.5/B-05-foundation-phase-decision.md`
- `docs/internal/delivery-plan/v2.5/B-06-persona-q1-q7-decision-record.md`

## PRs

- Shipped as direct commits to main during v2.5.0 release cycle.
