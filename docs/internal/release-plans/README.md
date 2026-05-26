# Internal Release Governance

Status: Active  
Owner: Maintainers  
Last updated: 2026-05-25

This directory is the canonical tracked home for internal release-governance artifacts.

## What Lives Here

1. Versioned release folders under `docs/internal/release-plans/vX.Y.Z/`
2. Cross-release release-operations docs used across cuts
3. Tracked blocker decisions, closure summaries, execution plans, and checklists needed for durable release context

## Current Entry Points

1. `docs/internal/release-plans/runbook_clean-worktree-cut-tag-publish.md`
2. `docs/internal/release-plans/v2.21.0/plan_v2.21.0.md` (PLANNED; marketplace launch, additive MINOR; Approach B locked)
3. `docs/internal/release-plans/v2.22.0/plan_v2.22.0.md` (PLANNING; command/skill naming standardization, additive MINOR; follows v2.21.0)
4. `docs/internal/release-plans/v3.0.0/plan_v3.0.0.md` (RESERVED; convergence MAJOR - retire old marketplace path + remove name aliases; trigger-gated by plugin #2)
5. `docs/internal/release-plans/v2.20.0/` (latest tagged release: 2026-05-25, tag `e1db5ec`)
6. `docs/internal/release-plans/v2.19.0/` and earlier (archived release context)

> **Version-line note (2026-05-25):** the marketplace launch and the naming standardization are both **additive minors** (v2.21.0, v2.22.0). The single breaking **major** is reserved as v3.0.0 (the convergence: old-path retirement + alias removal), triggered by the second plugin. The former `v3.0.0/` (marketplace) and `v3.1.0/` (naming) folders were renumbered accordingly.

## Operating Rules

1. Put version-specific release-governance artifacts under the target release folder.
2. Keep `docs/releases/**` user-facing only.
3. Keep durable effort briefs in `docs/internal/efforts/**` and link them from release docs instead of duplicating backlog state here.
4. Keep `_NOTES/**` as local working material only.

## Migration History

Legacy directories `docs/internal/release-planning/` and `docs/internal/delivery-plan/` were fully migrated to this structure on 2026-03-22. All files were distributed into versioned release folders. Originals archived to `_NOTES/_archived-internal/` (gitignored).
