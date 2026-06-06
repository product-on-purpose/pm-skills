---
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
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# PM Skills Updater

This skill updates a local pm-skills installation to the latest public
release. It validates connectivity, compares versions, previews changes,
and produces a structured report documenting what was updated and what
new capabilities are available.

## When to Use

- When you want to update local pm-skills to the latest release
- When you want to check if a newer version is available
- After a new pm-skills release is announced
- When onboarding and you want to confirm you have the latest version

## When NOT to Use

- To create or edit individual skills -> use `/pm-skill-builder` or `/pm-skill-iterate`
- To validate skills against conventions -> use `/pm-skill-validate`
- If you are a maintainer working directly on the pm-skills repo (use git)
- To pin a specific older version (this skill always targets the latest release)

## Flags

| Flag | Behavior |
|------|----------|
| *(none)* | Full update flow: pre-flight → preview → confirm → update → report |
| `--report-only` | Pre-flight → preview → report (no files written) |
| `--status` | Lightweight version check - prints current and latest version, then stops |

### --status behavior

When `--status` is provided, run only the pre-flight checks and display:

```
pm-skills v{local} (installed, from {source})
pm-skills v{latest} (latest, released {date})
{Status: up to date | update available ({type})}

Run /update-pm-skills for details, or /update-pm-skills --report-only for a preview.
```

No report file is generated. No files are written.

## Instructions

When asked to update pm-skills (without `--status`), follow these steps:

### Step 1: Pre-Flight

Run three checks before proceeding:

1. **Network access**: Reach the GitHub API or repository URL
   (`https://github.com/product-on-purpose/pm-skills`). Use any
   available method: `curl`, `wget`, GitHub CLI (`gh`), or MCP tools.

2. **Latest version**: Query the latest release using this fallback chain
   (try each in order, use the first that succeeds):
   1. GitHub API: `GET /repos/product-on-purpose/pm-skills/releases/latest`
   2. GitHub CLI: `gh release list --repo product-on-purpose/pm-skills --limit 1`
   3. Git: `git ls-remote --tags https://github.com/product-on-purpose/pm-skills.git`

   If all three fail (rate limiting, 404, malformed response, no network),
   enter degraded mode (see below).

   Record: version string, release date, release notes URL, release notes body.

3. **Local version**: Read from the first available source:
   - `.claude-plugin/plugin.json` → `version` field
   - `marketplace.json` → `plugins[0].version` field
   - `CHANGELOG.md` → most recent version header
   - Git tags → most recent `v*` tag

   **Version parsing:** Normalize by stripping an optional `v` prefix and
   trimming whitespace. If a source is present but yields an empty,
   non-semver, or malformed string (invalid JSON, missing field), skip it
   with a warning and try the next source. Only fall back to `0.0.0`
   after all four sources fail.

**If network access fails** (degraded mode):
- Report the failure with error details.
- Provide manual update instructions:
  > Visit https://github.com/product-on-purpose/pm-skills/releases to
  > download the latest release. Extract the archive and copy the
  > `skills/`, `commands/`, `_workflows/`, and other content directories
  > to your local pm-skills installation.
- Stop execution.

### Step 2: Version Comparison

Compare the local version against the latest release using semver.

**If local version >= latest version:**
- Report: "Your pm-skills installation is up to date (v{local})."
- Offer to generate a report-only anyway.
- Stop execution.

**If local version < latest version:**
- Show the version delta:
  ```
  Local version:  v{local}
  Latest version: v{latest}
  Update type:    {major | minor | patch}
  ```
- **Major version warning**: If the update is a major bump (e.g., v2.x
  to v3.x), show a prominent warning:
  > This is a major version update. It may include breaking changes to
  > skill contracts. Review the release notes before proceeding.
- Continue to Step 3.

### Step 3: Preview

Show the user what the update includes:

1. **Version delta**: local version, latest version, update type.

2. **Value summary**: Derive from CHANGELOG entries between the two
   versions, GitHub release notes, and directory diffs (new skills/,
   new _workflows/ files):
   - New skills and what they enable
   - Updated skills and what improved
   - New workflows and what they connect
   - Other notable changes

3. **File manifest**: List of files and folders that will be written,
   grouped by directory with counts:
   ```
   Files to be written:
     skills/       31 files (2 new, 29 updated)
     commands/     38 files (2 new, 36 updated)
     _workflows/    9 files (1 new, 8 updated)
     other          7 files
     Total:        85 files
   ```

**If `--report-only`:** Generate the report using `references/TEMPLATE.md`
with the banner "Report only - update was not applied." Save to
`_pm-skills/updates/update-report_v{latest}_report-only_{YYYY-MM-DD_HHMMSS}.md`. Stop
execution.

### Step 4: Confirmation

Prompt the user for two decisions:

1. **Update confirmation**:
   "These files will be overwritten. Proceed? [yes / no]"
   - If major version bump: require typing "yes" explicitly.
   - If the user declines: save a report-only and stop.

2. **Backup offer**:
   "Create a backup of current files before updating?
   [yes (recommended) / no]"
   - If yes: copy all in-scope files to
     `_pm-skills/backups/v{current}_{YYYY-MM-DD_HHMMSS}/`
   - Create the `_pm-skills/` directory if it doesn't exist.

### Step 5: Update

Execute the update using validated-before-copy with backup:

1. **Download**: Fetch the release ZIP asset (`pm-skills-vX.Y.Z.zip`)
   from the GitHub Release page to a temporary directory. This is the
   curated build artifact produced by `build-release.sh` - it includes
   only user-facing content and excludes `docs/internal/`.

2. **Validate**: Confirm the extracted archive contains `skills/`,
   `commands/`, `AGENTS.md`, and `.claude-plugin/plugin.json`. If
   validation fails, report the error and stop without writing any files.

3. **Copy**: Overwrite in-scope files from the extracted archive to the
   install root. Show progress per directory:
   ```
   Updating pm-skills v2.9.0 -> v2.10.0...
     skills/       31/31 ████████████████████  done
     commands/     38/38 ████████████████████  done
     _workflows/    9/9  ████████████████████  done
     other files    7/7  ████████████████████  done
   ```

4. **Clean up**: Remove the temporary directory.

### Step 6: Post-Update

1. **Smoke test**:
   - Version consistency: `plugin.json`, `marketplace.json`, and
     `CHANGELOG.md` all reflect the new version. (Note: version detection
     in Step 1 uses first-match; the smoke test verifies all sources
     agree. A mismatch here suggests a release packaging issue.)
   - File integrity: `AGENTS.md`, `skills/`, `commands/`, `_workflows/`
     all exist.
   - Skill count delta: count skills before and after, report the change.
   - If any check fails: warn the user with specific details. Do NOT
     auto-rollback. Provide recovery guidance:
     - **Version mismatch**: "Run the update again, or manually edit
       {file} to set the version to {expected}."
     - **Missing files**: "Re-run `/update-pm-skills` to re-download,
       or restore from backup: `cp -r _pm-skills/backups/{dir}/* .`"
     - **If backup exists**: Always remind the user of the backup
       location and restore command.

2. **Summary line**: Show a single scannable confirmation:
   ```
   Updated v{old} -> v{new} | +{n} skills, +{n} workflows | Report: _pm-skills/updates/{file}
   ```

3. **Completion report**: Generate using `references/TEMPLATE.md` and
   save to `_pm-skills/updates/update-report_v{from}-to-v{to}_{YYYY-MM-DD_HHMMSS}.md`

4. **MCP advisory**: If `../pm-skills-mcp/` exists, try to read
   `pm-skills-source.json`. If the file is missing or malformed, show:
   "pm-skills-mcp detected but pm-skills-source.json not found or
   unreadable. Check the MCP repo manually." If readable, show:
   ```
   pm-skills-mcp detected at ../pm-skills-mcp/
     Embedded skills version: v{embedded}
     Updated pm-skills version: v{new}

     To update the MCP server's embedded skills:
       cd ../pm-skills-mcp && npm run embed-skills && npm run build
   ```

5. **Next steps**:
   ```
   Next Steps:
   - Review the update report at _pm-skills/updates/{report-file}
   - Run /pm-skill-validate --all to verify skill integrity
   - Run local CI: bash scripts/lint-skills-frontmatter.sh
   - Check release notes: {release-url}
   ```

## File Scope

The updater writes only files present in the release ZIP asset
(`pm-skills-vX.Y.Z.zip`), which is the curated build produced by
`build-release.sh`. The ZIP excludes `docs/internal/` and other
non-user-facing content - no exclusion logic is needed at copy time.

**Files included in the release ZIP (updated):**

| Path | Rationale |
|------|-----------|
| `skills/` | Core skill files |
| `commands/` | Slash command definitions |
| `_workflows/` | Workflow chains |
| `library/` | Sample library and skill output samples (note: user-added samples may be overwritten) |
| `AGENTS.md` | Skill discovery for IDEs |
| `.claude-plugin/plugin.json` | Version + plugin metadata |
| `marketplace.json` | Marketplace metadata |
| `CHANGELOG.md` | Release history |
| `README.md` | Public docs |
| `docs/` (public guides, reference, workflows) | User-facing documentation |
| `scripts/` | CI/validation scripts |
| `mkdocs.yml` | Docs site config |

**Files NOT in the release ZIP (never overwritten):**

| Path | Rationale |
|------|-----------|
| `docs/internal/` | Excluded from ZIP by `build-release.sh` |
| `_NOTES/` | Local-only, gitignored, not in ZIP |
| `_pm-skills/` | Local state (reports, backups), not in ZIP |
| `.github/` | CI workflows, not in ZIP |
| `CONTRIBUTING.md`, `LICENSE` | Not in ZIP (repo-level files) |

## Output Contract

The skill MUST:
- Validate network access before any remote operations
- Show a preview before writing any files
- Require explicit user confirmation before overwriting
- Offer a backup before overwriting
- Use validated-before-copy (download to temp, validate, then copy; backup is the recovery path for mid-copy failures)
- Generate a report in both modes (report-only and completion)
- Run the post-update smoke test
- Show MCP advisory if sibling repo is detected

The skill MUST NOT:
- Write files without user confirmation
- Proceed without network access confirmation
- Modify files outside the pm-skills directory
- Modify `docs/internal/`, `_NOTES/`, or `_pm-skills/` with upstream content
- Auto-rollback on smoke test failure (inform the user instead)
- Delete local files that don't exist in the upstream release

## Quality Checklist

Before marking the update complete, verify:

- [ ] Pre-flight passed: network, versions detected
- [ ] User was shown preview before any files were written
- [ ] User explicitly confirmed before update proceeded
- [ ] Backup was offered (and created if accepted)
- [ ] Archive was downloaded to temp and validated before copying
- [ ] All in-scope files were written successfully
- [ ] Version consistency: plugin.json, marketplace.json, CHANGELOG match
- [ ] File integrity: AGENTS.md, skills/, commands/, _workflows/ exist
- [ ] Skill count delta is reported (before -> after)
- [ ] Report was generated and saved to `_pm-skills/updates/`
- [ ] MCP advisory was shown if sibling repo detected
- [ ] Next steps were presented
- [ ] Summary line displayed

## FAQ

**I'm a contributor who cloned the repo. Should I use this skill?**
No. Use `git pull` or `git fetch && git merge` instead. This skill is
for end users who installed pm-skills as a plugin or downloaded a release.

**Can I update to a specific version instead of the latest?**
Not in v1. This skill always targets the latest release. To install a
specific version, download it manually from the releases page.

**What happens to my local notes and planning docs?**
They are never touched. The skill explicitly excludes `docs/internal/`,
`_NOTES/`, and `_pm-skills/` from updates. See the File Scope table.

**What happens to files I added that aren't in the upstream release?**
They are left untouched. The skill only overwrites files that exist in
the new release - it never deletes local files.

**How do I undo an update?**
If you created a backup (the default offer), restore it:
`cp -r _pm-skills/backups/v{version}_{timestamp}/* .`
If you didn't create a backup but have git, use `git checkout .` to
restore tracked files to their last committed state.

**The update failed partway through. What do I do?**
The skill validates before copying (download to temp, check, then write),
so partial failures are rare. If it does happen: restore from backup if
available, or re-run `/update-pm-skills` to retry.

## Further Reading

For a visual walkthrough and additional context, see the
[Updating PM Skills Guide](../../docs/guides/updating-pm-skills.md).
