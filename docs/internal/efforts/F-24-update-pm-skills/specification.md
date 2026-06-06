# Specification: utility-update-pm-skills

## Overview

A utility skill that checks whether a newer version of pm-skills is available,
previews what would change, and updates local files after user confirmation.
Produces a structured markdown report documenting the version delta, files
written, and new capabilities delivered in the update.

## Skill Identity

| Field | Value |
|-------|-------|
| Name | utility-update-pm-skills |
| Classification | utility |
| Version | 1.0.0 |
| License | Apache-2.0 |
| Audience | PM skill library administrators and end users |

## Design Principles

### 1. Safe by Default

The skill never writes files without explicit user confirmation. The pre-flight
checklist and preview step give the user full visibility before anything changes.
The `--report-only` flag exists for users who want information without action.

### 2. Value-Forward Reporting

Reports don't just list files - they summarize the *value delta* between
versions. What new skills were added? What capabilities improved? What
workflows are now available? The report tells a user why the update matters,
not just what it touches.

### 3. Simple Core, Future Depth

v1 does one thing well: replace local pm-skills files with the latest release.
Per-file conflict resolution, local modification detection, and rollback are
explicitly deferred to future versions. This keeps the skill's instruction
surface small and predictable.

### 4. Environment-Agnostic

The skill works whether the user has a git clone, a plugin install, or an
extracted ZIP. The primary update mechanism (GitHub release archive download)
works in all cases. Git-specific enhancements are nice-to-haves.

### 5. Atomic Updates

File writes are all-or-nothing. The skill downloads the release archive to a
temporary directory, validates completeness, then copies to the install root.
This prevents partial state from interrupted downloads or errors mid-write.

### 6. Idempotent

Running the skill twice is safe. The second run detects "already up to date"
and stops cleanly. No side effects from repeated invocations.

---

## File Architecture

```
skills/utility-update-pm-skills/
├── SKILL.md
└── references/
    ├── TEMPLATE.md
    └── EXAMPLE.md

commands/
└── update-pm-skills.md
```

### SKILL.md (~150-180 lines)

**Frontmatter:**
```yaml
name: utility-update-pm-skills
description: >-
  Checks for newer pm-skills releases, compares local vs. latest version,
  previews what would change, and updates local files after user confirmation.
  Generates a structured update report documenting changed files, new
  capabilities, and the value delta between versions. Use when you want to
  bring a local pm-skills installation up to date.
classification: utility
version: "1.0.0"
updated: 2026-04-09
license: Apache-2.0
metadata:
  category: coordination
  frameworks: [triple-diamond]
  author: product-on-purpose
```

**Sections:**

1. **When to Use** / **When NOT to Use**

2. **Flags** - `--status` (lightweight version check), `--report-only`
   (preview without writing), default (full update flow)

3. **Instructions** (6-step flow with guardrails)

   **Step 1: Pre-flight**
   - Check network access to GitHub (API or repo URL)
   - Fetch latest released version (GitHub API → `gh` CLI → `git ls-remote`)
   - Read local version from highest-priority source
   - **Degraded mode**: If no network → report failure with manual update
     instructions (release page link, download steps) → STOP

   **Step 2: Version Comparison**
   - Compare local vs. latest using semver
   - If up to date → report "You're up to date" → offer `--report-only` → STOP
   - If update available → show version delta and update type
   - **Major version warning**: If major bump (e.g., v2.x → v3.x) → surface
     prominent warning about potential breaking changes, require explicit
     confirmation beyond the standard prompt

   **Step 3: Preview**
   - Show version delta (local → latest, update type)
   - Show value summary: new skills, updated skills, new workflows, highlights
     from release notes (derived from CHANGELOG + GitHub release notes)
   - Show list of files and folders that will be written, with counts per
     directory
   - If `--report-only` → generate report with banner "Report only - update
     not applied" → save to `_pm-skills/updates/` → STOP

   **Step 4: Confirmation**
   - Show: "These files will be overwritten. Proceed? [yes / no]"
   - Offer backup: "Create a backup of current files first?
     [yes (recommended) / no]"
   - If backup accepted → copy current updatable files to
     `_pm-skills/backups/v{current}_{date}/`
   - If major version → require typing "yes" explicitly (not just y)
   - If user declines → save preview as report-only → STOP

   **Step 5: Update**
   - Download release archive to a temporary directory
   - Validate archive completeness: check for `skills/`, `commands/`,
     `AGENTS.md`, `.claude-plugin/plugin.json`
   - Copy files to install root, overwriting only in-scope paths
   - Show progress per directory:
     ```
     Updating pm-skills v2.9.0 → v2.10.0...
       skills/       31/31 ████████████████████  ✓
       commands/     38/38 ████████████████████  ✓
       _workflows/    9/9  ████████████████████  ✓
       other files    7/7  ████████████████████  ✓
     ```
   - Clean up temporary directory

   **Step 6: Post-Update**
   - Run smoke test (see Quality Checklist below)
   - Show confirmation: "Updated pm-skills v{old} → v{new}"
   - Generate and save completion report to `_pm-skills/updates/`
   - MCP advisory: if `../pm-skills-mcp/` exists, show embedded version
     vs. updated version with manual embed instructions
   - Show next steps

4. **File Scope**

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

5. **Report Output**

   Reports are saved in `_pm-skills/updates/` within the pm-skills root:
   - Completion report: `update-report_v{from}-to-v{to}_{date}.md`
   - Report-only: `update-report_v{to}_report-only_{date}.md`

6. **Degraded Mode**

   If the skill cannot reach GitHub:
   - Report the connectivity failure with error details
   - Provide manual update instructions:
     - Link to the releases page: `https://github.com/product-on-purpose/pm-skills/releases`
     - Steps to download the latest release archive
     - Steps to extract and copy files manually
   - Stop execution. Do not attempt any file operations.

7. **Output Contract**

   The skill MUST:
   - Validate network access before any remote operations
   - Show a preview before writing any files
   - Require explicit user confirmation before overwriting files
   - Offer a backup before overwriting
   - Use atomic updates (download to temp → validate → copy)
   - Generate a report in both modes (report-only and completion)
   - Run the post-update smoke test after writing files
   - Show MCP advisory if sibling repo is detected

   The skill MUST NOT:
   - Write files without user confirmation
   - Proceed without network access confirmation
   - Modify files outside the pm-skills directory
   - Modify `docs/internal/`, `_NOTES/`, or `_pm-skills/` content from upstream
   - Auto-rollback on smoke test failure (inform user instead)
   - Delete local files that don't exist in the upstream release

8. **Quality Checklist**

   Before marking the update complete, verify:

   - [ ] Pre-flight passed: network access confirmed, versions detected
   - [ ] User was shown preview before any files were written
   - [ ] User explicitly confirmed before update proceeded
   - [ ] Backup was offered (and created if accepted)
   - [ ] Archive was downloaded to temp and validated before copying
   - [ ] All in-scope files were written successfully
   - [ ] Post-update version consistency: `plugin.json`, `marketplace.json`,
         and `CHANGELOG.md` all reflect the new version
   - [ ] Post-update file integrity: `AGENTS.md`, `skills/`, `commands/`,
         `_workflows/` all exist with expected counts
   - [ ] Skill count delta is reported (before → after)
   - [ ] Report was generated and saved to `_pm-skills/updates/`
   - [ ] MCP advisory was shown if sibling repo detected
   - [ ] Next steps were presented
   - [ ] Summary line displayed

9. **FAQ** - Common questions: contributor vs. end user, version pinning,
   local file safety, user-added files, undo/restore, partial failure

10. **Further Reading** - Link to `docs/guides/updating-pm-skills.md`

---

### docs/guides/updating-pm-skills.md (~60-80 lines)

User-facing guide for the mkdocs documentation site. Covers:
- What the update skill does and who it's for
- The three modes: `--status`, `--report-only`, full update
- What files are and aren't affected
- How backups work
- How to restore from a backup
- Link back to the full SKILL.md for technical details

Listed in `mkdocs.yml` under Guides.

---

### references/TEMPLATE.md (~90-110 lines)

The update report output template. Supports two modes via a conditional banner.

**Structure:**

1. **Banner** (conditional)
   - Completion: none (or "Update complete")
   - Report-only: "⚠ Report only - update was not applied. Run
     `/update-pm-skills` to apply."

2. **Update Summary** - table with date, versions, update type, source

3. **Pre-Flight Results** - table with pass/fail for each check

4. **What's New (Value Delta)** - the centerpiece section, organized as:
   - **Headline**: 1-2 sentence summary of the update's value
     (e.g., "This update adds meeting synthesis and slideshow creation,
     expanding pm-skills from a planning toolkit into a presentation and
     communication platform.")
   - **New Skills**: table with skill name, what it enables (not just
     description - the *capability* it unlocks)
   - **Updated Skills**: table with skill name, what improved, why it matters
   - **New Workflows**: table with workflow name, what it connects
   - **Other Changes**: bullet list of notable changes (commands, docs,
     infrastructure, breaking changes if any)
   - **Opportunities**: 2-3 sentences on what the user can now do that they
     couldn't before - framed as actionable next steps

5. **Files Written / Files That Would Be Written** - grouped by directory
   with counts

6. **Backup** (completion only) - location of backup if created

7. **Post-Update Validation** (completion only) - version consistency,
   file integrity, skill count delta

8. **Next Steps** - actionable items

---

### references/EXAMPLE.md (~130-160 lines)

A worked completion report for v2.9.0 → v2.10.0.

Demonstrates:
- Pre-flight passing
- Value delta with narrative headline, 2 new utility skills, 1 updated
  workflow, and an "opportunities" paragraph
- File manifest grouped by directory
- Backup created at `_pm-skills/backups/v2.9.0_2026-04-09/`
- Post-update validation passing (version consistency, skill count 31 → 33)
- Actionable next steps

Also includes a **report-only example** (~40 lines) showing the same update
but with the report-only banner and "Files that would be written" instead of
"Files written."

---

### commands/update-pm-skills.md

Standard pm-skills command format:
```yaml
---
description: Update local pm-skills to the latest release with a version
  comparison, value summary, and confirmation before writing files
---
```

Body references the skill, mentions `--report-only` and `--status` flags, and
includes `$ARGUMENTS` context placeholder.

---

## Local State Convention

The skill introduces `_pm-skills/` as a local state directory within the
pm-skills install root. This directory is gitignored and holds:

```
_pm-skills/
├── updates/           ← update reports (markdown)
└── backups/           ← pre-update snapshots (optional, user-chosen)
    └── v2.9.0_2026-04-09/
```

**Why `_pm-skills/`?** Underscore-prefix directories are visible by default on
macOS and Windows (dot-prefix dirs are hidden). Since reports and backups are
user-facing artifacts, visibility matters. The underscore prefix is consistent
with the repo's convention for special directories (`_workflows/`, `_NOTES/`).

**Gitignore**: Add `_pm-skills/` to the repo's `.gitignore` so it ships as a
convention all users inherit.

---

## Version Detection

The skill reads the local version from the highest-priority source available:

| Priority | Source | Field |
|----------|--------|-------|
| 1 | `.claude-plugin/plugin.json` | `version` |
| 2 | `marketplace.json` | `plugins[0].version` |
| 3 | `CHANGELOG.md` | Most recent version header |
| 4 | Git tags | Most recent `v*` tag |

First match wins. No cross-checking between sources.

If no version can be determined, warn the user and treat as `0.0.0` (full
update).

---

## Install Root Detection

The skill needs to know where pm-skills is installed to read/write files.
Detection strategy:

1. The skill is invoked as a Claude Code plugin command. The plugin context
   provides the plugin root directory.
2. If running outside plugin context, look for `.claude-plugin/plugin.json`
   or `AGENTS.md` by walking up from the current working directory.
3. If still not found, ask the user to provide the path.

---

## pm-skills-mcp Coordination

After updating pm-skills, the skill checks for a sibling `pm-skills-mcp`
directory (`../pm-skills-mcp/`). If found, it reads `pm-skills-source.json`
and reports:

```
ℹ pm-skills-mcp detected at ../pm-skills-mcp/
  Embedded skills version: v2.8.0 (from pm-skills-source.json)
  Updated pm-skills version: v2.10.0

  To update the MCP server's embedded skills:
    cd ../pm-skills-mcp && npm run embed-skills && npm run build
```

This is advisory only - no automated MCP updates in v1.

---

## Future Features (out of scope for v1)

| # | Feature | Description |
|---|---------|-------------|
| F1 | Local modification detection | Scan for files changed vs. installed version |
| F2 | Per-file overwrite/skip/diff | Conflict resolution for modified files |
| F3 | `--include-mcp` flag | Auto-update pm-skills-mcp embedded skills |
| F4 | `--rollback` flag | Restore from `_pm-skills/backups/` |
| F5 | `--diff` flag | Show unified diffs in preview step |
| F6 | Automatic backup cleanup | Prune old backups (keep last N or last 30 days) |
| F7 | "What's coming next" teaser | When up to date, preview what's in the next unreleased version |
| F8 | Update history timeline | Aggregate `_pm-skills/updates/` reports into a version timeline |
| F9 | Archive file count validation | Validate archive contains expected number of skills (catches corruption) |
| F10 | Download timeout | Warn and offer retry after 60s download (prevents indefinite hangs) |
