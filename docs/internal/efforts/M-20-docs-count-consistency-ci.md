# [M-20] Documentation Count Consistency CI
Status: Backlog
Milestone: v2.9.1
Issue: TBD
Agent: Claude Opus 4.6 or Codex

## Scope

Add CI validation scripts that detect stale hardcoded counts and missing cross-references across documentation. When workflows, skills, or commands are added/removed, many files reference counts like "29 skills", "36 commands", "9 workflows" — these go stale silently.

## Problem

During v2.9.0 (workflow expansion from 3 → 9), several docs pages were missed in the cross-cutting update:
- `docs/concepts/skill-anatomy.md` still said "Three shipped workflows"
- `docs/pm-skill-anatomy.md` same
- `docs/guides/using-skills.md` "Available Workflows" table only listed 3
- `docs/getting-started.md` workflow section only described 3
- README historical entries were incorrectly updated with current counts

These were caught by manual review, not CI. As the repo grows, this class of issue will recur every release.

## Proposed CI Scripts

### 1. `scripts/check-workflow-coverage.sh` + `.ps1`

Verifies every `_workflows/*.md` has matching:
- `commands/workflow-*.md` (for workflows that have commands)
- `docs/workflows/*.md` (generated page)
- Entry in `docs/workflows/index.md`
- Entry in AGENTS.md "Workflows" section
- Entry in mkdocs.yml nav

**Exit codes:** 0 = all covered, 1 = missing entries

### 2. `scripts/check-count-consistency.sh` + `.ps1`

Counts actual files and greps for hardcoded numbers:
- Count `_workflows/*.md` (excluding README) → expected workflow count
- Count `commands/*.md` (excluding .gitkeep) → expected command count
- Grep docs for hardcoded "N workflows", "N commands", "N skills" → flag mismatches

**Approach:** The script knows the actual counts and searches for common patterns like `\b{wrong_count}\s+(workflow|command|skill)` across tracked docs.

**Exclusions:** Historical changelog entries, release notes, internal planning docs.

**Exit codes:** 0 = consistent, 1 = stale counts found (advisory initially)

### 3. `scripts/check-generated-freshness.sh` + `.ps1`

Runs `generate-workflow-pages.py` to a temp directory, diffs against committed `docs/workflows/`, flags stale generated pages.

**Exit codes:** 0 = fresh, 1 = regeneration needed

## CI Integration

Add all 3 to `.github/workflows/validation.yml` as advisory checks (`continue-on-error: true`), following the existing pattern.

Trigger on: `_workflows/**`, `commands/**`, `skills/**`, `docs/**` changes.

## Artifacts Produced

- `scripts/check-workflow-coverage.sh` + `.ps1`
- `scripts/check-count-consistency.sh` + `.ps1`
- `scripts/check-generated-freshness.sh` + `.ps1`
- Updated `.github/workflows/validation.yml` — 3 new advisory checks
- Updated `scripts/README_SCRIPTS.md` — document new scripts

## Dependencies

None — purely additive CI.

## PRs

TBD
