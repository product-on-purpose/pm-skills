# [F-06] Deliver Acceptance Criteria Skill
Status: Shipped (v2.7.0)
Release: v2.7.0
Issue: #114
Agent: Codex 5.4

## Scope

New domain skill (`deliver-acceptance-criteria`) that generates detailed Given/When/Then acceptance criteria for user stories. Extends `deliver-user-stories` with structured acceptance testing scenarios including happy path, edge cases, error states, and non-functional criteria.

## Key Decisions

- Independent of other efforts — can be built in parallel with anything.
- Quick community-visible win that demonstrates continued domain content investment.
- Also serves as test case for enhanced CI (M-12).

## Artifacts Produced

- `skills/deliver-acceptance-criteria/SKILL.md`
- `skills/deliver-acceptance-criteria/references/TEMPLATE.md`
- `skills/deliver-acceptance-criteria/references/EXAMPLE.md`
- `commands/acceptance-criteria.md`
- AGENTS.md entry

## PRs

- TBD
