# Release v2.9.0 — Workflows

**Status:** Final
**Date:** 2026-04-06

## Highlights

- Renamed "Bundles" to "Workflows" across the entire repository
- Expanded from 3 to 9 guided multi-skill workflows
- 7 new `/workflow-*` slash commands
- New `scripts/generate-workflow-pages.py` for docs generation

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

6 new workflows expanding coverage across the Triple Diamond framework:

| Workflow | Command | Skills Chained | Duration |
|----------|---------|----------------|----------|
| Customer Discovery | `/workflow-customer-discovery` | interview-synthesis -> jtbd-canvas -> opportunity-tree -> problem-statement | 2-4h |
| Sprint Planning | `/workflow-sprint-planning` | refinement-notes -> user-stories -> edge-cases | 1-2h |
| Product Strategy | `/workflow-product-strategy` | competitive-analysis -> stakeholder-summary -> opportunity-tree -> solution-brief -> adr | 4-8h |
| Post-Launch Learning | `/workflow-post-launch-learning` | instrumentation-spec -> dashboard-requirements -> experiment-results -> retrospective -> lessons-log | 3-6h |
| Stakeholder Alignment | `/workflow-stakeholder-alignment` | stakeholder-summary -> problem-statement -> solution-brief -> launch-checklist | 2-4h |
| Technical Discovery | `/workflow-technical-discovery` | spike-summary -> adr -> design-rationale | 1-3h |

These join the 3 existing workflows (Feature Kickoff, Lean Startup, Triple Diamond) for a total of 9.

## Added

- `scripts/generate-workflow-pages.py` — generates `docs/workflows/` from `_workflows/` with link rewriting
- `_workflows/README.md` and `docs/workflows/README.md` — directory purpose documentation

## Migration Guide

1. **Path references:** Replace `_bundles/` with `_workflows/` in any custom scripts or integrations
2. **Command usage:** Replace `/kickoff` with `/workflow-feature-kickoff`
3. **Documentation links:** Old `/bundles/*` URLs redirect automatically; update bookmarks when convenient
4. **MCP server:** No changes needed — MCP tool names (`pm_workflow_*`) were already correct
