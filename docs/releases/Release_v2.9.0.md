# Release v2.9.0 — Workflows

**Status:** Draft (M-19 rename complete; F-13 expansion pending)

## Highlights

- Renamed "Bundles" to "Workflows" across the entire repository
- Expanded from 3 to 9 guided multi-skill workflows (pending F-13)

## Breaking Changes

### `_bundles/` renamed to `_workflows/`

The source-of-truth directory for workflow definitions has been renamed. If you have scripts or tools that reference `_bundles/`, update them to `_workflows/`.

**Before:** `_bundles/feature-kickoff.md`
**After:** `_workflows/feature-kickoff.md`

### `docs/bundles/` renamed to `docs/workflows/`

Documentation site paths have changed. Old URLs redirect automatically via `mkdocs-redirects`.

**Before:** `https://product-on-purpose.github.io/pm-skills/bundles/feature-kickoff/`
**After:** `https://product-on-purpose.github.io/pm-skills/workflows/feature-kickoff/`

### `/kickoff` command removed

The `/kickoff` slash command has been replaced by `/workflow-feature-kickoff`. This aligns with the new `/workflow-*` namespace used by all workflow commands.

**Before:** `/kickoff "Feature description"`
**After:** `/workflow-feature-kickoff "Feature description"`

## Changed

- Renamed "Workflow Bundles" to "Workflows" in all documentation, navigation, and metadata
- Updated CI path triggers from `_bundles/**` to `_workflows/**`
- Updated build scripts to reference `_workflows/`
- Added URL redirects for old `/bundles/*` documentation paths
- Added terminology guard script (`scripts/check-stale-bundle-refs.sh/.ps1`)

## New Workflows

> _This section will be expanded in the F-13 workflow expansion commit._

## Migration Guide

1. **Path references:** Replace `_bundles/` with `_workflows/` in any custom scripts or integrations
2. **Command usage:** Replace `/kickoff` with `/workflow-feature-kickoff`
3. **Documentation links:** Old `/bundles/*` URLs redirect automatically; update bookmarks when convenient
4. **MCP server:** No changes needed — MCP tool names (`pm_workflow_*`) were already correct
