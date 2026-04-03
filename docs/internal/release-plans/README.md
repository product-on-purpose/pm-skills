# Internal Release Governance

Status: Active  
Owner: Maintainers  
Last updated: 2026-03-22

This directory is the canonical tracked home for internal release-governance artifacts.

## What Lives Here

1. Versioned release folders under `docs/internal/release-plans/vX.Y.Z/`
2. Cross-release release-operations docs used across cuts
3. Tracked blocker decisions, closure summaries, execution plans, and checklists needed for durable release context

## Current Entry Points

1. `docs/internal/release-plans/runbook_clean-worktree-cut-tag-publish.md`
2. `docs/internal/release-plans/v2.7.0/README.md` (in progress)
3. `docs/internal/release-plans/v2.6.1/README.md`
4. `docs/internal/release-plans/v2.5.0/README.md`
5. `docs/internal/release-plans/v2.4.0/README.md`
6. `docs/internal/release-plans/v2.3.0/README.md`
7. `docs/internal/release-plans/v2.2.0/README.md`

## Operating Rules

1. Put version-specific release-governance artifacts under the target release folder.
2. Keep `docs/releases/**` user-facing only.
3. Keep durable effort briefs in `docs/internal/efforts/**` and link them from release docs instead of duplicating backlog state here.
4. Keep `_NOTES/**` as local working material only.

## Migration History

Legacy directories `docs/internal/release-planning/` and `docs/internal/delivery-plan/` were fully migrated to this structure on 2026-03-22. All files were distributed into versioned release folders. Originals archived to `_NOTES/_archived-internal/` (gitignored).
