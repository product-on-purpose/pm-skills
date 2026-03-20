# Internal Release Governance

Status: Active  
Owner: Maintainers  
Last updated: 2026-03-19

This directory is the canonical tracked home for internal release-governance artifacts.

## What Lives Here

1. Versioned release folders under `docs/internal/releases/vX.Y.Z/`
2. Cross-release release-operations docs used across cuts
3. Tracked blocker decisions, closure summaries, execution plans, and checklists needed for durable release context

## Current Entry Points

1. `docs/internal/releases/runbook_clean-worktree-cut-tag-publish.md`
2. `docs/internal/releases/v2.6.1/README.md`
3. `docs/internal/releases/v2.5.0/README.md`
4. `docs/internal/releases/v2.4.0/README.md`

## Operating Rules

1. Put version-specific release-governance artifacts under the target release folder.
2. Keep `docs/releases/**` user-facing only.
3. Keep durable effort briefs in `docs/internal/efforts/**` and link them from release docs instead of duplicating backlog state here.
4. Keep `_NOTES/**` as local working material only.

## Legacy Note

`docs/internal/release-planning/**` and `docs/internal/delivery-plan/**` remain tracked only as legacy surfaces during the baseline cleanup. New canonical release-governance artifacts should live under `docs/internal/releases/**`.
