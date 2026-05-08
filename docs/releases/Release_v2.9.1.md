---
title: Release v2.9.1
---

# Release v2.9.1 . Workflow Docs & CI Consistency

**Status:** Final
**Date:** 2026-04-10

## Highlights

- Dedicated workflows guide with decision tree and comparison matrix for all 9 workflows
- 6 new CI validation scripts catching stale counts, missing cross-references, and undocumented scripts
- Version consistency enforcement between `plugin.json` and `marketplace.json`
- Script documentation convention enforced by CI

## New: Workflows Guide (D-05)

A new dedicated guide at `docs/guides/using-workflows.md` helps users choose,
invoke, and customize workflows. Replaces the brief section that was embedded
in `using-skills.md`.

**Key sections:**
- **Which Workflow Should I Use?** . mermaid decision tree based on project phase, uncertainty level, and audience
- **Workflow Comparison Matrix** . all 9 workflows compared by use case, skills count, complexity, and duration
- **Invoking Workflows** . how to run each one via slash commands
- **Customizing Workflows** . skip steps, add steps, combine workflows
- **Building Custom Workflows** . create your own `_workflows/*.md` files

## New: Documentation Count Consistency CI (M-20)

Three new validation scripts catch stale documentation automatically:

| Script | What it catches |
|--------|----------------|
| `check-workflow-coverage` | Workflows missing docs pages, AGENTS.md entries, or mkdocs nav entries |
| `check-count-consistency` | Hardcoded counts like "29 skills" when the actual count is 31 |
| `check-generated-freshness` | Generated workflow pages that are out of date with their sources |

All run as advisory CI checks. They exclude historical entries (CHANGELOG,
release notes) which are correct for their time.

## New: Infrastructure CI

Three additional validation scripts improve repo quality:

| Script | Mode | What it catches |
|--------|------|----------------|
| `validate-version-consistency` | **Hard-fail** | `plugin.json` and `marketplace.json` version mismatch |
| `validate-gitignore-pm-skills` | Advisory | Missing `_pm-skills/` in `.gitignore` |
| `validate-script-docs` | Advisory | Script pairs without companion `.md` documentation |

## Changed

- `scripts/README_SCRIPTS.md` expanded from 8 to 16 script entries
- `.github/workflows/validation.yml` now runs 6 additional CI checks
- `docs/guides/using-skills.md` workflow section trimmed to overview + link to new guide
- `docs/workflows/index.md` links to the new guide
- `mkdocs.yml` includes "Using Workflows" in the Guides nav
- Fixed `marketplace.json` version drift (was 2.8.2, should have been 2.9.0)
- Added companion `.md` docs for 2 previously undocumented scripts

## Script Documentation Convention

Starting with this release, every script pair in `scripts/` must have a
companion `.md` file documenting its purpose, usage, behavior, and exit codes.
The `validate-script-docs` CI check enforces this convention. New scripts
without documentation will show a CI warning.

Convention: `scripts/foo.sh` + `scripts/foo.ps1` → `scripts/foo.md`
