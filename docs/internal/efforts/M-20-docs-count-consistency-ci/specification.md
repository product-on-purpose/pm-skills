# Specification: Documentation Count Consistency CI (M-20)

## Overview

Three CI validation scripts that detect stale hardcoded counts and missing
cross-references across documentation. Prevents the class of bug where a
new skill/workflow/command ships but docs pages still say the old count.

## Problem

During v2.9.0 (workflow expansion 3 → 9), several docs pages were missed:
- `docs/concepts/skill-anatomy.md` still said "Three shipped workflows"
- `docs/guides/using-skills.md` "Available Workflows" table only listed 3
- `docs/getting-started.md` workflow section only described 3

These were caught by manual review. As the repo grows (now 31+ skills, 38+
commands, 10 workflows), every release risks stale counts. This CI catches
them automatically.

## Scripts

### 1. check-workflow-coverage.sh / .ps1

**Purpose:** Verify every workflow file has matching entries across the repo.

**Logic:**
1. List all `_workflows/*.md` (excluding README)
2. For each workflow, check:
   - `commands/workflow-*.md` exists (for command-backed workflows)
   - `docs/workflows/*.md` generated page exists
   - Entry in `docs/workflows/index.md`
   - Entry in `AGENTS.md` "Workflows" section
   - Entry in `mkdocs.yml` nav
3. Report missing entries

**Exit codes:** 0 = all covered, 1 = missing entries

**Mode:** Advisory (`continue-on-error: true`) - some workflows may
intentionally lack commands.

### 2. check-count-consistency.sh / .ps1

**Purpose:** Detect stale hardcoded counts in docs.

**Logic:**
1. Count actual files:
   - Skills: `ls -d skills/*/` count
   - Commands: `ls commands/*.md` count
   - Workflows: `ls _workflows/*.md` count (excluding README)
2. Grep tracked docs for patterns like `{N} skills`, `{N} commands`,
   `{N} workflows` (with common variations: "29 skills", "29 PM skills",
   "twenty-nine skills")
3. Compare found numbers against actual counts
4. Report mismatches with file path and line number

**Exclusions** (don't flag stale counts in):
- `CHANGELOG.md` - historical entries are correct for their time
- `docs/releases/Release_*.md` - same
- `docs/internal/` - planning docs may reference future counts
- Lines containing "v2." or version references - likely historical context

**Exit codes:** 0 = consistent, 1 = stale counts found

**Mode:** Advisory initially, promote to hard-fail after one release cycle.

### 3. check-generated-freshness.sh / .ps1

**Purpose:** Verify generated workflow pages match source.

**Logic:**
1. Run `python scripts/generate-workflow-pages.py` to a temp directory
2. Diff temp output against committed `docs/workflows/`
3. Report any differences

**Exit codes:** 0 = fresh, 1 = regeneration needed

**Mode:** Advisory.

## Companion Documentation

Each script gets a `.md` file following the existing pattern:

| Script pair | Doc file |
|-------------|----------|
| `check-workflow-coverage.sh/.ps1` | `check-workflow-coverage.md` |
| `check-count-consistency.sh/.ps1` | `check-count-consistency.md` |
| `check-generated-freshness.sh/.ps1` | `check-generated-freshness.md` |

Each `.md` includes: Purpose, Usage (bash + PS), What It Does, Exit Codes,
Exclusions (where applicable), When to Use, Example Output, Safety.

## CI Integration

Add all 3 to `.github/workflows/validation.yml`:

```yaml
- name: Check workflow coverage (bash)
  if: matrix.os == 'ubuntu-latest'
  run: bash scripts/check-workflow-coverage.sh
  continue-on-error: true

- name: Check count consistency (bash)
  if: matrix.os == 'ubuntu-latest'
  run: bash scripts/check-count-consistency.sh
  continue-on-error: true

- name: Check generated freshness (bash)
  if: matrix.os == 'ubuntu-latest'
  run: bash scripts/check-generated-freshness.sh
  continue-on-error: true
```

Plus matching PowerShell steps for `windows-latest`.

## Acceptance Criteria

### AC-1: Workflow coverage catches missing entries

```
GIVEN a new workflow is added to _workflows/
WHEN  check-workflow-coverage runs
  AND the workflow has no matching command, docs page, or AGENTS.md entry
THEN  it reports each missing entry with the workflow name
  AND exits with code 1
```

### AC-2: Count consistency catches stale numbers

```
GIVEN docs/getting-started.md says "29 skills"
  AND the actual skill count is 31
WHEN  check-count-consistency runs
THEN  it reports the mismatch with file path and line number
  AND exits with code 1
```

### AC-3: Count consistency excludes historical entries

```
GIVEN CHANGELOG.md contains "Added 3 workflows" in the v2.9.0 entry
  AND the actual workflow count is now 10
WHEN  check-count-consistency runs
THEN  it does NOT flag the CHANGELOG entry as stale
```

### AC-4: Generated freshness detects drift

```
GIVEN a workflow was added to _workflows/ but generate-workflow-pages.py
      was not re-run
WHEN  check-generated-freshness runs
THEN  it reports the missing generated page
  AND exits with code 1
```

### AC-5: All scripts have companion documentation

```
GIVEN scripts ship
WHEN  check-script-docs CI runs (new)
THEN  each .sh/.ps1 pair has a matching .md file
  AND README_SCRIPTS.md references the new scripts
```
