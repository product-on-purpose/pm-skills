# v2.21.0 Release Plan (stub)

**Status:** PLANNING (stub created 2026-05-25 during v2.20.0 G4 post-tag hygiene)
**Type:** TBD
**Predecessor:** v2.20.0 SHIPPED 2026-05-25 (tag `e1db5ec`; Sprint Workflow Commands + Validation/Doc Hardening; catalog 63; 73 commands).

## Purpose

Placeholder for the next release cycle. v2.20.0 added the 3 sprint `/workflow-` commands and hardened the count/command-sync validators (number-after + singular-noun coverage; a `/workflow-` row now requires a real command file). v2.21.0 scope is not yet locked.

## Carried-forward backlog (non-blocking)

- **`1/27 shipped skills` dated ratio prose** in `skills/utility-pm-skill-validate/SKILL.md`, its `references/EXAMPLE.md`, and the generated page: the "27" denominator predates the 63-skill catalog. It is intentionally exempt from `check-count-consistency` (the `shipped` subset word guards ratio prose, so it does not false-fail), but the denominator is dated. Update the ratio (numerator + denominator) when the pm-skill-validate worked example is next revised.
- **Roadmap content skills** under consideration: develop-pre-mortem, develop-product-vision.

## Out of scope (tracked elsewhere)

- **Marketplace migration to `product-on-purpose`** - the v3.0.0 breaking rename, tracked under `docs/internal/release-plans/v3.0.0/`.
- **pm-skills-mcp posture** - intentionally frozen at the v2.9.2 build (maintenance mode); the retire-vs-rearchitect call is a v3 / promotion-prep decision, not a v2.21.0 concern.
