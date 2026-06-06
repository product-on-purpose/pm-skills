# Plan: utility-update-pm-skills (F-24)

Status: Ready for Implementation
Milestone: v2.10.0
Created: 2026-04-09
Updated: 2026-04-09

---

## 1. Vision

A utility skill that lets any pm-skills user check for updates and pull
the latest release with a single slash command. The workflow is
intentionally simple - a short pre-flight checklist, a clear preview of
what will change, user confirmation, then execution with a completion
report. Reports emphasize the *value delta* - what new capabilities the
update delivers - not just a file list.

### Original prompt

> Create a spec for a new skill `/utility-update-pm-skills` that will
> validate internet access, and update the local pm-skills with the most
> recent release available in the public repo.
>
> At some point it would be great to analyze the version installed
> locally and compare it against what's public, let the user know what
> is being updated, and generate an output markdown file with... what
> files were changed or skipped and any new capabilities in the most
> recent version compared to the current version they have installed. A
> more thorough approach would see if the user has modified any of the
> local files and give them an option to overwrite or skip.

### Scope for v1.0.0

| Capability | In v1? | Notes |
|------------|--------|-------|
| Pre-flight checks (repo access, latest version, local version) | Yes | |
| Degraded mode (no network → manual instructions) | Yes | Simplified: just the no-network path |
| Report-only mode (`--report-only`) | Yes | Shows what would change without writing files |
| Full update with confirmation | Yes | Overwrites pm-skills files after user confirms |
| Optional backup before overwrite | Yes | User chooses; stored in `_pm-skills/backups/` |
| Atomic update (download to temp → validate → copy) | Yes | Prevents partial state |
| Major version warning with extra confirmation | Yes | For X.0.0 bumps |
| Post-update smoke test | Yes | Version consistency + file integrity + skill count |
| Completion report (markdown file) | Yes | Saved to `_pm-skills/updates/` |
| Quality checklist (internal verification) | Yes | 12-item checklist in SKILL.md |
| MCP advisory (sibling repo detection) | Yes | Advisory only |
| Diff of local modifications vs. upstream | **No** | Future feature F1 |
| Conflict-aware overwrite-or-skip per file | **No** | Future feature F2 |
| Rollback from backup | **No** | Future feature F4 |

---

## 2. How It Works

### Invocation

```
/update-pm-skills                # full update flow
/update-pm-skills --report-only  # preview + report only (no file writes)
```

### Step-by-step flow

```
┌─────────────────────────────────────────────────────┐
│  1. PRE-FLIGHT                                      │
│     ☐ Can I reach the GitHub repo/API?              │
│     ☐ What is the latest released version?          │
│     ☐ What is the local version? (first match wins) │
│                                                     │
│     Degraded: no network → manual instructions      │
│               + release page link → STOP            │
├─────────────────────────────────────────────────────┤
│  2. VERSION COMPARISON                              │
│     • If local >= latest → "You're up to date"      │
│       → offer --report-only anyway → STOP           │
│     • If local < latest → show delta + type         │
│     • If major bump → prominent breaking-change     │
│       warning, require explicit "yes"               │
├─────────────────────────────────────────────────────┤
│  3. PREVIEW                                         │
│     Show:                                           │
│     • Version delta (local → latest, type)          │
│     • Value summary: new skills, updated skills,    │
│       new workflows, highlights from release notes  │
│     • Files and folders that will be written         │
│       (grouped by directory, with counts)           │
│                                                     │
│     If --report-only:                               │
│       → Generate report with banner:                │
│         "⚠ Report only . update not applied"        │
│       → Save to _pm-skills/updates/ → STOP          │
├─────────────────────────────────────────────────────┤
│  4. CONFIRMATION                                    │
│     "These files will be overwritten. Proceed?"     │
│     [yes / no]                                      │
│                                                     │
│     "Create a backup of current files first?"       │
│     [yes (recommended) / no]                        │
│                                                     │
│     If backup → copy to _pm-skills/backups/         │
│     If major bump → require typing "yes" explicitly │
│     If user declines → save as report-only → STOP   │
├─────────────────────────────────────────────────────┤
│  5. UPDATE (atomic)                                 │
│     • Download release archive → temp directory     │
│     • Validate archive: skills/, commands/,         │
│       AGENTS.md, plugin.json all present            │
│     • Copy in-scope files to install root           │
│     • Show progress per directory:                  │
│       skills/    31/31 ████████████████████ ✓       │
│       commands/  38/38 ████████████████████ ✓       │
│     • Clean up temp directory                       │
├─────────────────────────────────────────────────────┤
│  6. POST-UPDATE                                     │
│     • Smoke test:                                   │
│       - Version consistency across sources          │
│       - File integrity (key dirs exist)             │
│       - Skill count delta (before → after)          │
│     • Show confirmation: "Updated v{old} → v{new}"  │
│     • Generate + save completion report             │
│     • MCP advisory (if sibling repo detected)       │
│     • Quality checklist (internal verification)     │
│     • Show next steps                               │
└─────────────────────────────────────────────────────┘
```

### What gets updated (file scope)

| Path | Updated? | Rationale |
|------|----------|-----------|
| `skills/` | Yes | Core skill files |
| `commands/` | Yes | Slash command definitions |
| `_workflows/` | Yes | Workflow chains |
| `library/` | Yes | Skill library metadata |
| `AGENTS.md` | Yes | Skill discovery for IDEs |
| `.claude-plugin/plugin.json` | Yes | Version + plugin metadata |
| `marketplace.json` | Yes | Marketplace metadata |
| `CHANGELOG.md` | Yes | Release history |
| `README.md` | Yes | Public docs |
| `docs/` (public only) | Yes | User-facing guides |
| `scripts/` | Yes | CI/validation scripts |
| `mkdocs.yml` | Yes | Docs site config |
| `docs/internal/` | **No** | User's internal planning/efforts |
| `_NOTES/` | **No** | Local-only, gitignored |
| `_pm-skills/` | **No** | Local state (reports, backups) |

---

## 3. Report Output

### File location and naming

```
_pm-skills/updates/
├── update-report_v2.9.0-to-v2.10.0_2026-04-09.md    ← completion report
├── update-report_v2.8.0-to-v2.9.0_2026-03-15.md     ← older report
└── update-report_v2.10.0_report-only_2026-04-09.md   ← report-only
```

**Convention:**
- Directory: `_pm-skills/updates/` (inside the pm-skills root)
- Completion report: `update-report_v{from}-to-v{to}_{date}.md`
- Report-only: `update-report_v{to}_report-only_{date}.md`
- `_pm-skills/` is added to `.gitignore` - local state, not repo content

**Why `_pm-skills/`?** Underscore-prefix directories are visible by
default in file explorers on macOS and Windows (unlike dot-prefix dirs
which are hidden). Since reports and backups are user-facing artifacts
the user may want to browse, visibility matters. The underscore prefix
is consistent with the repo's convention for special directories
(`_workflows/`, `_NOTES/`).

### Report contents . value delta emphasis

The value delta section is the centerpiece of every report. It answers
"why should I update?" not just "what files changed?"

**Structure:**

1. **Headline** - 1-2 sentence narrative summarizing the update's value
   > "This update adds meeting synthesis and slideshow creation, expanding
   > pm-skills from a planning toolkit into a presentation and communication
   > platform."

2. **New Skills** - table with skill name and what it *enables* (not just
   description - the capability it unlocks for the user)

3. **Updated Skills** - what improved and why it matters

4. **New Workflows** - what they connect and what workflows they unlock

5. **Other Changes** - notable changes to commands, docs, infrastructure

6. **Opportunities** - 2-3 sentences on what the user can now do that
   they couldn't before, framed as actionable next steps

**Source material for deriving the value delta:**
- CHANGELOG.md entries between the two versions
- GitHub release notes (via API)
- Diff of `skills/` directory (new dirs = new skills)
- Diff of `_workflows/` directory (new files = new workflows)

---

## 4. Decisions (Resolved)

| # | Decision | Resolution |
|---|----------|-----------|
| D1 | Default mode | Full update flow. `--report-only` is opt-in. |
| D2 | Install method | GitHub release archive download (works for git, plugin, and ZIP installs). |
| D3 | Tiered release | Ship report + update together in v1.0.0. |
| D4 | Version source | Highest-priority source, first match wins, no cross-check. |
| D5 | Backup strategy | User-optional at confirmation time. Stored in `_pm-skills/backups/v{ver}_{date}/`. |
| D6 | Milestone | v2.10.0 |
| D7 | Quality checklist | Included - 12-item internal verification gate. |
| D8 | Degraded mode | Included (simplified) - no-network path only. Provides manual instructions + stops. |
| D9 | Atomic updates | Included - download to temp → validate → copy. |
| D10 | Major version handling | Prominent warning + require explicit "yes" (not just y). |
| D11 | Local state directory | `_pm-skills/` (underscore prefix, visible on macOS/Windows). Added to `.gitignore`. |
| D12 | Report-only gitignore | Add `_pm-skills/` to repo `.gitignore` so all users inherit the convention. |
| D13 | Report detail level | Summary + links for release notes. Full CHANGELOG entries for the version range. |
| D14 | Install root detection | Plugin context provides root. Fallback: walk up from CWD looking for `plugin.json` or `AGENTS.md`. |

---

## 5. Backup Strategy

At confirmation (Step 4), offer:

```
Create a backup of current files before updating?
[yes (recommended) / no]
```

If yes, copy current in-scope files to:

```
_pm-skills/backups/v2.9.0_2026-04-09/
├── skills/
├── commands/
├── _workflows/
├── ...
```

Versioned + timestamped directory names prevent collisions on repeated
runs.

**Restore path** (documented in completion report):
> To restore the previous version, copy the backup files back:
> `cp -r _pm-skills/backups/v2.9.0_2026-04-09/* .`

---

## 6. pm-skills-mcp Consideration

After updating pm-skills, check for `../pm-skills-mcp/`. If found, read
`pm-skills-source.json` and show:

```
ℹ pm-skills-mcp detected at ../pm-skills-mcp/
  Embedded skills version: v2.8.0 (from pm-skills-source.json)
  Updated pm-skills version: v2.10.0

  To update the MCP server's embedded skills:
    cd ../pm-skills-mcp && npm run embed-skills && npm run build
```

Advisory only. No automated MCP updates in v1.

---

## 7. Acceptance Criteria

### AC-1: Pre-flight validates network access

```
GIVEN the user runs /update-pm-skills
WHEN  the skill cannot reach the GitHub API or repository
THEN  it reports the connectivity failure with error details
  AND provides manual update instructions with the releases page link
  AND stops execution without attempting any file operations
```

### AC-2: Pre-flight detects local version

```
GIVEN the skill can reach GitHub
WHEN  it reads the local version
THEN  it uses the highest-priority source (plugin.json > marketplace.json
      > CHANGELOG.md > git tags)
  AND uses the first match without cross-checking
  AND if no source is found, warns the user and treats version as 0.0.0
```

### AC-3: Up-to-date detection stops cleanly

```
GIVEN the local version >= the latest released version
WHEN  version comparison runs
THEN  it reports "Your pm-skills installation is up to date (v{local})"
  AND offers to generate a report-only anyway
  AND does not proceed to the update flow
```

### AC-4: Major version warning

```
GIVEN the update is a major version bump (e.g., v2.x → v3.x)
WHEN  the version comparison detects this
THEN  it shows a prominent warning about potential breaking changes
  AND requires the user to type "yes" explicitly (not just "y")
  AND the warning appears before the standard confirmation prompt
```

### AC-5: Report-only mode generates report without writing files

```
GIVEN the user runs /update-pm-skills --report-only
  AND an update is available
WHEN  the preview step completes
THEN  it generates a report with the banner "⚠ Report only . update
      was not applied"
  AND saves the report to _pm-skills/updates/update-report_v{latest}
      _report-only_{date}.md
  AND does NOT write any pm-skills files
  AND includes the instruction "Run /update-pm-skills to apply this update"
```

### AC-6: Confirmation requires explicit approval

```
GIVEN an update is available and the preview has been shown
WHEN  the skill prompts for confirmation
THEN  it asks "These files will be overwritten. Proceed? [yes / no]"
  AND if the user says no, it saves a report-only and stops
  AND it offers a backup choice before proceeding
```

### AC-7: Backup is created when accepted

```
GIVEN the user confirms the update and accepts the backup offer
WHEN  the backup runs
THEN  it copies all in-scope files to _pm-skills/backups/v{current}_{date}/
  AND the backup directory contains the same structure as the install root
      (skills/, commands/, _workflows/, etc.)
  AND the completion report includes the backup location
```

### AC-8: Update is atomic

```
GIVEN the user has confirmed the update
WHEN  the update runs
THEN  it downloads the release archive to a temporary directory first
  AND validates the archive contains skills/, commands/, AGENTS.md,
      and .claude-plugin/plugin.json
  AND only then copies files to the install root
  AND if the download or validation fails, no files are written
  AND the temporary directory is cleaned up afterward
```

### AC-9: Progress is displayed during update

```
GIVEN the update is writing files
WHEN  files are being copied
THEN  it shows progress per directory (e.g., "skills/ 31/31 ✓")
  AND the user sees incremental feedback, not silence
```

### AC-10: Post-update smoke test runs

```
GIVEN the update has completed writing files
WHEN  the smoke test runs
THEN  it checks version consistency: plugin.json, marketplace.json,
      and CHANGELOG.md all reflect the new version
  AND it checks file integrity: AGENTS.md, skills/, commands/,
      _workflows/ all exist
  AND it reports the skill count delta (before → after)
  AND if any check fails, it warns the user with specific details
      (does NOT auto-rollback)
```

### AC-11: Completion report is generated and saved

```
GIVEN the update has completed and the smoke test has run
WHEN  the report is generated
THEN  it includes: update summary, pre-flight results, value delta
      (headline + new skills + updated skills + new workflows +
      opportunities), files written, backup location (if applicable),
      post-update validation results, and next steps
  AND it is saved to _pm-skills/updates/update-report_v{from}-to-v{to}
      _{date}.md
  AND it follows the TEMPLATE.md format
```

### AC-12: Value delta section tells a value story

```
GIVEN the report is being generated (either mode)
WHEN  the value delta section is written
THEN  it includes a 1-2 sentence narrative headline summarizing the
      update's value
  AND new skills are described by what they enable (not just their name)
  AND updated skills note what improved and why it matters
  AND an "opportunities" paragraph describes what the user can now do
  AND the information is derived from CHANGELOG + release notes + file diffs
```

### AC-13: MCP advisory is shown when applicable

```
GIVEN the update has completed
  AND ../pm-skills-mcp/ exists with pm-skills-source.json
WHEN  the post-update step runs
THEN  it shows the embedded version vs. updated version
  AND provides the manual embed/build command
  AND does NOT automatically modify the MCP repo
```

### AC-14: Excluded paths are never overwritten

```
GIVEN the update is writing files
WHEN  the file scope is applied
THEN  docs/internal/ is never overwritten
  AND _NOTES/ is never overwritten
  AND _pm-skills/ is never overwritten
  AND any user-added files outside the in-scope paths are left untouched
```

### AC-15: Idempotent re-run

```
GIVEN the user runs /update-pm-skills a second time after a successful update
WHEN  the version comparison runs
THEN  it detects the local version matches the latest
  AND reports "up to date"
  AND does not re-download or re-write files
```

### AC-16: --status flag provides lightweight version check

```
GIVEN the user runs /update-pm-skills --status
WHEN  the pre-flight checks complete
THEN  it displays the local version with source, the latest version with
      release date, and a status line (up to date or update available)
  AND it does NOT generate a report file
  AND it does NOT write any files
  AND it suggests /update-pm-skills or --report-only for more detail
```

### AC-17: Summary line after completion

```
GIVEN the update has completed successfully
WHEN  the post-update step finishes
THEN  it displays a single summary line containing: version delta,
      count of new skills and workflows, and the report file path
  AND this line is scannable without reading the full report
```

### AC-18: Error recovery guidance on smoke test failure

```
GIVEN the smoke test detects a failure (version mismatch, missing files)
WHEN  the warning is displayed
THEN  it includes specific recovery instructions for the failure type
  AND if a backup exists, it reminds the user of the backup location
      and the restore command
  AND it does NOT auto-rollback
```

### AC-19: FAQ section answers common questions

```
GIVEN the SKILL.md is read by Claude or a user
WHEN  the FAQ section is consulted
THEN  it addresses: contributor vs. end user usage, version pinning,
      local file safety (docs/internal, _NOTES), user-added files,
      undo/restore, and partial failure recovery
```

### AC-20: User-facing guide exists

```
GIVEN a user browses the pm-skills documentation site
WHEN  they look for update instructions
THEN  docs/guides/updating-pm-skills.md exists with a walkthrough
      of the update process, including what --status, --report-only,
      and the full update flow look like
  AND it is linked from the SKILL.md "Further Reading" section
  AND it is listed in mkdocs.yml navigation
```

---

## 8. CI Integration

### Existing CI that validates this skill

The skill's files (SKILL.md, TEMPLATE.md, EXAMPLE.md, command) are
validated by the existing CI pipeline on every push/PR to main:

| CI Check | What it validates for this skill | Workflow |
|----------|----------------------------------|----------|
| `lint-skills-frontmatter` | Frontmatter fields (name, description, classification, version, updated, license, metadata) are valid | `validation.yml` |
| `validate-commands` | `commands/update-pm-skills.md` exists and references a valid skill | `validation.yml` |
| `validate-agents-md` | `AGENTS.md` includes an entry for `utility-update-pm-skills` | `validation.yml` |
| `check-mcp-impact` | Detects that a new skill was added and flags MCP embed needed (advisory) | `validation.yml` |
| `validate-plugin` | `plugin.json` shape is valid, version is semver | `validate-plugin.yml` |
| `validate-skill-history` | HISTORY.md format (not needed for v1.0.0 - only created at v1.1.0+) | `validation.yml` |
| `validate-skills-manifest` | Release manifest includes this skill with correct metadata | `validation.yml` |

### New CI needed

| Check | Purpose | Script pair | Workflow | Priority |
|-------|---------|-------------|----------|----------|
| Validate `_pm-skills/` in `.gitignore` | Ensure local state dir is gitignored for all users | `scripts/validate-gitignore-pm-skills.sh` + `.ps1` | `validation.yml` | Should-have |

**Implementation**: A simple check that `.gitignore` contains `_pm-skills/`.
This prevents someone accidentally removing the gitignore entry and committing
local state. Add as `continue-on-error: true` initially (advisory), promote
to hard-fail after v2.10.0 ships.

```bash
#!/usr/bin/env bash
# scripts/validate-gitignore-pm-skills.sh
set -euo pipefail

if grep -q '^_pm-skills/' .gitignore 2>/dev/null || \
   grep -q '^_pm-skills$' .gitignore 2>/dev/null; then
  echo "PASS: _pm-skills/ is in .gitignore"
  exit 0
else
  echo "FAIL: _pm-skills/ is not in .gitignore"
  echo "  Add '_pm-skills/' to .gitignore to prevent committing local state"
  exit 1
fi
```

### Additional CI: Report template structure validation

A second new check validates that the TEMPLATE.md has all required sections.
This catches accidental section deletions during edits.

| Check | Purpose | Script pair | Workflow | Priority |
|-------|---------|-------------|----------|----------|
| Validate report template sections | TEMPLATE.md has all required headings | `scripts/validate-update-report-template.sh` + `.ps1` | `validation.yml` | Nice-to-have |

**Implementation**: Check that TEMPLATE.md contains the required section
headings: "Update Summary", "Pre-Flight Results", "What's New", "Headline",
"New Skills", "Updated Skills", "Opportunities", "Next Steps".

```bash
#!/usr/bin/env bash
# scripts/validate-update-report-template.sh
set -euo pipefail

TEMPLATE="skills/utility-update-pm-skills/references/TEMPLATE.md"

if [[ ! -f "$TEMPLATE" ]]; then
  echo "SKIP: $TEMPLATE not found (skill may not be installed)"
  exit 0
fi

REQUIRED_SECTIONS=(
  "Update Summary"
  "Pre-Flight Results"
  "What's New"
  "Headline"
  "New Skills"
  "Updated Skills"
  "Opportunities"
  "Next Steps"
)

MISSING=0
for section in "${REQUIRED_SECTIONS[@]}"; do
  if ! grep -q "## .*${section}\|### .*${section}" "$TEMPLATE"; then
    echo "FAIL: Missing required section: $section"
    MISSING=$((MISSING + 1))
  fi
done

if [[ $MISSING -eq 0 ]]; then
  echo "PASS: All ${#REQUIRED_SECTIONS[@]} required sections found in TEMPLATE.md"
  exit 0
else
  echo "FAIL: $MISSING required section(s) missing from TEMPLATE.md"
  exit 1
fi
```

### Automated testing considerations

The update skill is *instructions for Claude*, not executable code. This
limits traditional automated testing, but several aspects are testable:

| What to test | How | Automatable? |
|-------------|-----|-------------|
| Frontmatter validity | `lint-skills-frontmatter` (existing) | Yes, already in CI |
| Command-skill linkage | `validate-commands` (existing) | Yes, already in CI |
| AGENTS.md sync | `validate-agents-md` (existing) | Yes, already in CI |
| `.gitignore` entry | `validate-gitignore-pm-skills` (new) | Yes |
| Template structure | `validate-update-report-template` (new) | Yes |
| File scope table accuracy | Compare the File Scope table in SKILL.md against the actual repo structure - flag if new top-level dirs appear that aren't listed | Possible as advisory CI |
| Report output quality | Run `/update-pm-skills --report-only` and check the output matches TEMPLATE.md structure | Manual (requires Claude execution) |
| End-to-end update flow | Create a test fixture with an older version, run the skill, verify files are updated | Manual (requires Claude + network) |
| Version detection accuracy | Check that `plugin.json`, `marketplace.json`, `CHANGELOG.md` all return the same version | Possible as CI check (related to P1 prerequisite) |

**Recommendation**: Ship the two new CI scripts (gitignore + template
validation) with F-24. The "file scope accuracy" check is a good candidate
for a future CI script but is not blocking for v1. End-to-end testing is
manual by nature since the skill requires Claude to execute.

### Version consistency CI (bonus . addresses P1 systemically)

The P1 prerequisite (fix the version mismatch) could become a permanent CI
check that prevents future drift:

```bash
#!/usr/bin/env bash
# scripts/validate-version-consistency.sh
set -euo pipefail

PLUGIN_VER=$(node -p "JSON.parse(require('fs').readFileSync('.claude-plugin/plugin.json','utf8')).version")
MARKET_VER=$(node -p "JSON.parse(require('fs').readFileSync('marketplace.json','utf8')).plugins[0].version")

if [[ "$PLUGIN_VER" != "$MARKET_VER" ]]; then
  echo "FAIL: Version mismatch . plugin.json ($PLUGIN_VER) vs marketplace.json ($MARKET_VER)"
  exit 1
fi

echo "PASS: Versions consistent ($PLUGIN_VER)"
```

This would be a hard-fail check in `validation.yml` - it directly supports
the update skill's version detection logic (D4: use first match) by ensuring
the sources agree.

### CI checks at release time

When v2.10.0 is tagged, the existing release pipeline handles:
- Tag/manifest version match (`validate-plugin.yml`)
- Release ZIP build and size check (`validate-plugin.yml`)
- Skills manifest includes the new skill (`validate-skills-manifest`)

### Summary of new CI for F-24

| Script | Purpose | Mode | Priority |
|--------|---------|------|----------|
| `validate-gitignore-pm-skills.sh/.ps1` | `_pm-skills/` in `.gitignore` | Advisory initially | Must-have |
| `validate-update-report-template.sh/.ps1` | TEMPLATE.md required sections | Advisory | Nice-to-have |
| `validate-version-consistency.sh/.ps1` | `plugin.json` == `marketplace.json` version | Hard-fail | Should-have (also fixes P1 systemically) |

---

## 9. Implementation Plan

### Prerequisites (before writing skill files)

| # | Task | Effort | Blocks |
|---|------|--------|--------|
| P1 | Fix `plugin.json` (2.9.0) vs `marketplace.json` (2.8.2) version mismatch | Small | Skill would report confusing version on first run |
| P2 | Add `_pm-skills/` to `.gitignore` | Trivial | Skill needs this before it can create the directory |

### Implementation steps

| # | Task | Deliverable | Effort |
|---|------|-------------|--------|
| I1 | Write `skills/utility-update-pm-skills/SKILL.md` | Skill instructions with frontmatter, 6-step flow, file scope, output contract, quality checklist, degraded mode | Medium |
| I2 | Write `skills/utility-update-pm-skills/references/TEMPLATE.md` | Report output template with two-mode support and value delta structure | Medium |
| I3 | Write `skills/utility-update-pm-skills/references/EXAMPLE.md` | Worked completion report + report-only example | Medium |
| I4 | Write `commands/update-pm-skills.md` | Slash command with `--report-only` support | Small |
| I5 | Update `AGENTS.md` | Add entry for utility-update-pm-skills | Small |
| I6 | Write `scripts/validate-gitignore-pm-skills.sh` + `.ps1` | CI check for `_pm-skills/` in `.gitignore` | Small |
| I7 | Update `.github/workflows/validation.yml` | Add new CI step (continue-on-error: true) | Small |
| I8 | Run all CI validation scripts locally | Verify SKILL.md passes `lint-skills-frontmatter`, command passes `validate-commands`, AGENTS.md passes `validate-agents-md` | Small |
| I9 | Create `skills-manifest.yaml` entry | Add to v2.10.0 release plan when created | Small |

### Integration steps

| # | Task | Deliverable |
|---|------|-------------|
| G1 | Add F-24 to `backlog-canonical.md` under v2.10.0 | Backlog entry with effort ID, type, agent |
| G2 | Create GitHub issue | Issue with effort brief link, acceptance criteria reference |
| G3 | Update `CHANGELOG.md` | Entry for utility-update-pm-skills under v2.10.0 (Unreleased) |
| G4 | Run `check-mcp-impact` | Confirm MCP impact advisory fires (new skill = embed needed) |

### Execution order

```
P1, P2 (prerequisites, can be done together)
  │
  ├── I1, I2, I3, I4 (skill files, can be written in parallel)
  │     │
  │     └── I5 (AGENTS.md update, depends on I1 for skill name/description)
  │           │
  │           └── I8 (CI validation, depends on all files existing)
  │
  ├── I6, I7 (new CI script + workflow update, independent of skill files)
  │
  └── G1, G2 (backlog + issue, can be done anytime)
        │
        └── G3, G4, I9 (integration, after skill files land)
```

---

## 10. Issues and Risks

### Issues

| # | Issue | Severity | Notes |
|---|-------|----------|-------|
| I1 | **Version mismatch already exists** - `plugin.json` (2.9.0) vs `marketplace.json` (2.8.2) | Medium | Fix as prerequisite P1 |
| I2 | **"New capabilities" derivation underspecified** - need to define exactly how to extract skill/workflow deltas from release notes | Medium | CHANGELOG + release notes API + directory diff for v1 |
| I3 | **File scope needs to be explicit** - without an explicit list the skill has to guess which files are pm-skills vs. user additions | Medium | File scope table in SKILL.md is the contract |
| I4 | **Multi-version jumps** - user on v2.7.0 updating to v2.10.0 needs aggregated capabilities across 3 releases | Low | Aggregate CHANGELOG entries between versions |
| I5 | **`_pm-skills/` directory doesn't exist yet** - needs to be created by the skill on first run | Low | Skill creates it; `.gitignore` entry ships with the repo |

### Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| R1 | Update overwrites user's local customizations | Low | High | Backup offer + future F1/F2 for modification detection |
| R2 | Download fails mid-update, leaves partial state | Low | High | Atomic update: download to temp → validate → copy |
| R3 | Report shows inaccurate value delta | Medium | Low | Derive from CHANGELOG (structured) + directory diff |
| R4 | User mistakes report-only for completed update | Low | Medium | Clear banner at top of report |
| R5 | Bootstrap problem (old skill version) | Low | Low | Skill is instructions for Claude, not compiled code |

---

## 11. Future Feature Backlog (for this skill)

Out of scope for v1.0.0:

| # | Feature | Description |
|---|---------|-------------|
| F1 | **Local modification detection** | Scan local files for changes vs. installed version (git diff or checksum) |
| F2 | **Per-file overwrite/skip/diff** | Conflict resolution for modified files with batch modes |
| F3 | **`--include-mcp` flag** | Auto-run `embed-skills` + `build` in sibling pm-skills-mcp |
| F4 | **`--rollback` flag** | Restore from `_pm-skills/backups/` |
| F5 | **`--diff` flag** | Show unified diffs per file in preview step |
| F6 | **Automatic backup cleanup** | Prune old backups (keep last N or last 30 days) |
| F7 | **"What's coming next" teaser** | When user is up to date, show a preview of what's in the next unreleased version (commits ahead of latest tag). Makes the "up to date" response useful rather than a dead end. |
| F8 | **Update history timeline** | Aggregate reports from `_pm-skills/updates/` into a timeline view: "v2.7.0 → v2.8.0 (Mar 15) → v2.9.0 (Apr 1) → v2.10.0 (today)". |
| F9 | **Archive file count validation** | Beyond checking that `skills/` exists, validate that the archive contains a reasonable number of files (e.g., > 20 skills). Catches corrupted or partial downloads. |
| F10 | **Download timeout** | If archive download exceeds 60 seconds, warn and offer to retry or switch to manual instructions. Prevents indefinite hangs on slow connections. |

---

## 12. Discovery Context

A Claude Code web session produced a 4-file draft implementation on
2026-04-09. These files are archived at:
`_discovery/2026-04-09_claude-web-session/`

The plan supersedes the web session draft. Key differences:
- v1 does NOT include per-file conflict resolution
- Added: quality checklist (12 items), degraded mode (simplified),
  atomic updates, major version warning, post-update smoke test
- Backup is user-optional in `_pm-skills/backups/` (not `.local-backup` suffix)
- Reports go in `_pm-skills/updates/` with value-delta emphasis
- The flow is 6 steps with guardrails (not 9 flat steps)
- MCP coordination is advisory, not automated
