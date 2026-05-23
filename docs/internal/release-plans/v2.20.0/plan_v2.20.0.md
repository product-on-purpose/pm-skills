# v2.20.0 Release Plan (stub)

**Status:** PLANNING (stub created 2026-05-23 during v2.19.0 G4 post-tag hygiene)
**Type:** TBD
**Predecessor:** v2.19.0 SHIPPED 2026-05-23 (tag `a18e4d5`; pre-promotion hardening; catalog 63; pre-tag bundle now 18 enforcing validators).

## Purpose

Placeholder for the next release cycle. v2.19.0 was the pre-promotion hardening pass (validator blind spots closed, CI/script hygiene, public-surface polish). v2.20.0 scope is not yet locked.

## Carried-forward backlog (non-blocking residuals from v2.19.0)

These were surfaced during v2.19.0 and intentionally deferred (none are release blockers):

- **pm-skill-auditor sample tables still list a `validate-mcp-sync` row.** The generated page `docs/skills/utility/utility-pm-skill-auditor.md` and the `skills/utility-pm-skill-auditor/references/TEMPLATE.md` + `EXAMPLE.md` samples still show a `validate-mcp-sync` row, even though that validator was removed in v2.19.0. Fix: re-run `scripts/generate-skill-pages.py` (or hand-edit the sample tables) to drop the row.
- **Two `_workflows/` files have no companion `/workflow-` command.** `_workflows/triple-diamond.md` and `_workflows/lean-startup.md` are reference workflows with no slash command, but the README "Workflows: 12" row does not flag this. Decide: add the two commands (commands 70 to 72) or annotate the README that 10 of 12 workflows have slash commands.
- **`check-stale-bundle-refs` is near-vestigial.** The "validator bundle" terminology collision means it cannot be enforced without false-failing several hundred legitimate references. Decide: rework the heuristic or remove the validator.
- **`check-count-consistency` "shipped" subset-exclusion can mask a stale total.** The subset-descriptor exemption could let a stale aggregate total slip through. Tighten if a real case appears.

## Out of scope (tracked elsewhere)

- **pm-skills-mcp posture** (the separate `pm-skills-mcp` repo): the "40 skills" drift and the retire-vs-rearchitect decision are v3 / promotion-prep items, not a v2.20.0 concern.
- **Marketplace switchover + install-path migration:** the v3.0.0 breaking migration (rename to `product-on-purpose`), tracked under `docs/internal/release-plans/v3.0.0/`.

## Candidate scope (not committed)

- New content skills under consideration: develop-pre-mortem, develop-product-vision (roadmap candidates).
