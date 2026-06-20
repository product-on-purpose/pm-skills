# Internal Release Governance

Status: Active  
Owner: Maintainers  
Last updated: 2026-06-19

This directory is the canonical tracked home for internal release-governance artifacts.

## What Lives Here

1. Versioned release folders under `docs/internal/release-plans/vX.Y.Z/`
2. Cross-release release-operations docs used across cuts
3. Tracked blocker decisions, closure summaries, execution plans, and checklists needed for durable release context

## Current Entry Points

1. `docs/internal/release-plans/runbook_clean-worktree-cut-tag-publish.md`
2. `docs/internal/release-plans/v2.27.1/` (**SHIPPED 2026-06-16**, tag `v2.27.1` at `10685b2d`; maintenance PATCH - the classification sub-count drift gate in `check-count-consistency` plus the doc-currency fixes it surfaced. Plan: `plan_v2.27.1.md`; spec: `spec_subcount-policing.md`.) `docs/internal/release-plans/v2.28.0/` (**SHIPPED 2026-06-20**, tag `v2.28.0` at `4fb0d703`; new `foundation-stakeholder-briefings` foundation skill - the 1-to-N audience fan-out, additive MINOR; catalog 66 -> 67, foundation 9 -> 10; plan `plan_v2.28.0.md`, spec `spec_stakeholder-briefings.md`). The memory / "Remember" train was renumbered from v2.28.0 to `docs/internal/release-plans/v2.29.0/plan_v2.29.0.md` (PROPOSED, tentative; plan + `spec_project-memory.md` relocated 2026-06-19).
3. Latest shipped: **v2.28.0** (2026-06-20, tag `v2.28.0` at `4fb0d703`; new foundation skill `foundation-stakeholder-briefings`, the 1-to-N audience fan-out; catalog 66 -> 67, foundation 9 -> 10; additive MINOR). Previous: **v2.27.1** (2026-06-16, tag `v2.27.1` at `10685b2d`; maintenance patch - the classification sub-count drift gate). Earlier: **v2.27.0** (2026-06-15, tag `ee7ff9d5`; the provable-quality eval-program release - M-31 trigger evals + M-32 derived surfaces + M-33 output-eval gates + the creator/validator eval-contract integration). Earlier: v2.26.0 (authoring + quality), v2.24.0 (workflow orchestrator), v2.25.0 (activation layer), v2.25.1/v2.25.2 (audit closeouts). See git tags + `docs/releases/**` for shipped context.
4. `docs/internal/release-plans/v2.22.0/plan_v2.22.0.md` (SHIPPED 2026-05-30, tag `v2.22.0` at `be1e400`; deleted the 63 command/skill wrappers + added the Codex manifest, MINOR; skill names UNCHANGED).
5. `docs/internal/release-plans/v2.23.0/plan_v2.23.0.md` (SHIPPED 2026-05-31, tag `v2.23.0` at `b54cef0`; new `prioritized-action-plan` foundation skill, additive MINOR).
6. `docs/internal/release-plans/v2.21.0/plan_v2.21.0.md` (SHIPPED; marketplace launch, additive MINOR).
7. `docs/internal/release-plans/v3.0.0/plan_v3.0.0.md` (RESERVED; convergence MAJOR - retire old marketplace path; trigger-gated by plugin #2)
8. `docs/internal/release-plans/v2.20.0/` and earlier (archived release context; see git tags for the latest shipped release)
9. `docs/internal/release-plans/_deferred/2026-05-29_skills-short-rename/` (DEFERRED; the fully-planned, audit-hardened hard rename of all 63 skills to short names; parked 2026-05-29 in favor of the lighter v2.22.0; revivable - see its `README.md`, git tag `archive/short-name-rename`)

> **Version-line note (2026-05-25):** the marketplace launch and the naming standardization are both **additive minors** (v2.21.0, v2.22.0). The single breaking **major** is reserved as v3.0.0 (the convergence: old-path retirement), triggered by the second plugin. The former `v3.0.0/` (marketplace) and `v3.1.0/` (naming) folders were renumbered accordingly.
>
> **Update (2026-05-29):** v2.22.0 was reframed from the short-name rename to the lighter **wrapper-deletion** (the rename's large blast radius served a naming preference more than the duplication fix). The audit-hardened rename is preserved and revivable at `_deferred/2026-05-29_skills-short-rename/`. v3.0.0 remains the marketplace old-path retirement only; neither path creates name aliases, so there is no alias-removal work anywhere.

## Operating Rules

1. Put version-specific release-governance artifacts under the target release folder.
2. Keep `docs/releases/**` user-facing only.
3. Keep durable effort briefs in `docs/internal/efforts/**` and link them from release docs instead of duplicating backlog state here.
4. Keep `_NOTES/**` as local working material only.

## Migration History

Legacy directories `docs/internal/release-planning/` and `docs/internal/delivery-plan/` were fully migrated to this structure on 2026-03-22. All files were distributed into versioned release folders. Originals archived to `_NOTES/_archived-internal/` (gitignored).
