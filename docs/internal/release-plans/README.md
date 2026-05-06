# Internal Release Governance

Status: Active  
Owner: Maintainers  
Last updated: 2026-05-05

This directory is the canonical tracked home for internal release-governance artifacts.

## What Lives Here

1. Versioned release folders under `docs/internal/release-plans/vX.Y.Z/`
2. Cross-release release-operations docs used across cuts
3. Tracked blocker decisions, closure summaries, execution plans, and checklists needed for durable release context

## Current Entry Points

1. `docs/internal/release-plans/runbook_clean-worktree-cut-tag-publish.md`
2. `docs/internal/release-plans/v2.13.0/plan_v2.13.0.md` (in progress; tag prep)
3. `docs/internal/release-plans/v2.12.0/plan_v2.12.0.md` (latest tagged release: 2026-05-03)
4. `docs/internal/release-plans/v2.11.0/plan_v2.11.0.md`
5. `docs/internal/release-plans/v2.10.0/plan_v2.10.0.md`
6. `docs/internal/release-plans/v2.9.0/plan_v2.9.0.md`
7. `docs/internal/release-plans/v2.8.0/`
8. `docs/internal/release-plans/v2.7.0/README.md`
9. `docs/internal/release-plans/v2.6.1/README.md` and earlier (archived release context)

## Operating Rules

1. Put version-specific release-governance artifacts under the target release folder.
2. Keep `docs/releases/**` user-facing only.
3. Keep durable effort briefs in `docs/internal/efforts/**` and link them from release docs instead of duplicating backlog state here.
4. Keep `_NOTES/**` as local working material only.

## Migration History

Legacy directories `docs/internal/release-planning/` and `docs/internal/delivery-plan/` were fully migrated to this structure on 2026-03-22. All files were distributed into versioned release folders. Originals archived to `_NOTES/_archived-internal/` (gitignored).
