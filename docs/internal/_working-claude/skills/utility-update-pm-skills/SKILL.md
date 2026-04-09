---
name: utility-update-pm-skills
description: Validates internet access, compares the locally installed pm-skills version against the latest public release, and updates local files with conflict-aware overwrite-or-skip options. Produces an update report listing changed files, skipped files, and new capabilities. Use when you want to bring a local pm-skills installation up to date.
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
release. It validates connectivity, compares versions, detects local
modifications, gives the user control over conflict resolution, and
produces a structured update report documenting every change.

The updater operates in three phases:
- **Pre-flight** -- validate internet access and determine version delta.
- **Update** -- fetch the latest release and apply changes with
  conflict-aware overwrite-or-skip logic.
- **Report** -- generate a markdown report summarizing what changed,
  what was skipped, and what new capabilities are available.

## When to Use

- When you want to update your local pm-skills to the latest release
- After a new pm-skills version is announced and you want to pull it in
- When you're unsure whether your local copy is current
- When onboarding to a team that uses pm-skills and you want the latest version
- When you want a structured summary of what changed between your version and the latest

## When NOT to Use

- To create or edit individual skills -> use `/pm-skill-builder` or `/pm-skill-iterate`
- To validate skills against conventions -> use `/pm-skill-validate`
- If you are a maintainer working directly on the pm-skills repo (use git instead)
- If you need to pin a specific older version (this skill always targets the latest release)

## Instructions

When asked to update pm-skills, follow these steps:

### Step 1: Validate Internet Access

Before attempting any remote operations, confirm connectivity to GitHub.

**How to validate:**
1. Attempt to reach the GitHub API or the public repository URL:
   `https://github.com/product-on-purpose/pm-skills`
2. Use any available method: `curl`, `wget`, `fetch`, GitHub CLI (`gh`),
   or the GitHub MCP tools.

**If connectivity fails:**
- Report the failure clearly with the error details.
- Suggest troubleshooting steps: check network, proxy settings, VPN,
  or firewall rules.
- Stop execution. Do not proceed to Step 2.

**If connectivity succeeds:**
- Report: "Internet access validated. Connected to GitHub."
- Proceed to Step 2.

### Step 2: Determine Local Version

Read the local version from these sources (in priority order):

1. `.claude-plugin/plugin.json` -- `version` field
2. `marketplace.json` -- `plugins[0].version` field
3. `CHANGELOG.md` -- most recent version header
4. Git tags -- most recent `v*` tag

Record:
- **Local version**: the version string (e.g., `2.8.2`)
- **Local version source**: which file provided the version

If no version can be determined, warn the user and default to `0.0.0`
(treat as a fresh install requiring full update).

### Step 3: Fetch Latest Public Release

Query the public repository for the latest release:

**Methods (try in order):**
1. GitHub API: `GET /repos/product-on-purpose/pm-skills/releases/latest`
2. GitHub CLI: `gh release list --repo product-on-purpose/pm-skills --limit 1`
3. Git: `git ls-remote --tags https://github.com/product-on-purpose/pm-skills.git`

Record:
- **Latest version**: the version string from the latest release
- **Release date**: when the release was published
- **Release notes URL**: link to the release page
- **Release notes body**: the release description (for capability diff in Step 8)

### Step 4: Compare Versions

Compare the local version against the latest public version.

**If local version >= latest version:**
- Report: "Your pm-skills installation is up to date (v{local})."
- Offer to generate a version report anyway (skip to Step 8 with
  no changes to report).
- Stop execution unless the user requests a forced update.

**If local version < latest version:**
- Report the version delta:
  ```
  Local version:  v{local}
  Latest version: v{latest}
  Update type:    {major | minor | patch}
  ```
- If the update is a **major** version bump, warn:
  "This is a major version update. It may include breaking changes to
  skill contracts. Review the release notes before proceeding."
- Ask: "Proceed with update? [yes / no]"
- If no, stop execution.

### Step 5: Scan for Local Modifications

Before fetching new files, scan the local installation for user
modifications. This protects customizations from being silently
overwritten.

**How to detect modifications:**

1. **If the local install is a git repo** (preferred):
   - Run `git status --porcelain` to find uncommitted changes.
   - Run `git diff HEAD` to see the actual modifications.
   - Any file with local changes is flagged as "locally modified."

2. **If the local install is NOT a git repo** (downloaded release):
   - Compare file checksums (SHA-256) against a manifest if available.
   - If no manifest is available, skip modification detection and note
     this limitation in the report.

Record a list of locally modified files with their modification type:
- `modified` -- content differs from the installed version
- `added` -- file exists locally but not in the original release
- `deleted` -- file was removed locally

Present the findings:
```
Locally modified files detected: {n}
- {status} | {file-path}
- {status} | {file-path}
...
```

If no modifications are detected, report: "No local modifications
detected. Safe to update all files."

### Step 6: Fetch and Apply Updates

Fetch the latest release content and apply updates file by file.

**Update method (try in order):**
1. **Git pull/merge** (if local is a git repo):
   - `git fetch origin`
   - `git merge origin/main` (or the tagged release)
   - If merge conflicts arise, handle per the conflict resolution
     rules below.

2. **Release archive download** (if not a git repo):
   - Download the release archive (`.tar.gz` or `.zip`).
   - Extract to a temporary directory.
   - Copy files to the local installation per the rules below.

**File-by-file application rules:**

For each file in the update:

| Local status | Action | User prompt |
|-------------|--------|-------------|
| Unmodified | Overwrite silently | None |
| Locally modified | Prompt user | "File `{path}` has local changes. [overwrite / skip / diff]" |
| New file (not in local) | Add silently | None |
| Deleted locally | Prompt user | "File `{path}` was deleted locally but exists in the update. [restore / skip]" |

**Conflict resolution options:**
- **overwrite**: Replace the local file with the upstream version.
  The original is backed up to `{path}.local-backup` before overwriting.
- **skip**: Keep the local version. Record as skipped in the report.
- **diff**: Show a side-by-side or unified diff of the local vs. upstream
  version, then re-prompt with [overwrite / skip].
- **restore**: Add the file back from the upstream version.
- **overwrite-all**: Apply overwrite to all remaining conflicts without
  further prompting.
- **skip-all**: Apply skip to all remaining conflicts without further
  prompting.

### Step 7: Post-Update Validation

After applying updates, run a quick health check:

1. **Version consistency**: Verify that `.claude-plugin/plugin.json`,
   `marketplace.json`, and `CHANGELOG.md` all reflect the new version.
2. **File integrity**: Confirm that key files exist:
   - `AGENTS.md`
   - `skills/` directory with expected skill count
   - `commands/` directory
   - `_workflows/` directory
3. **Skill count delta**: Compare the number of skills before and after
   the update. Report any additions or removals.

If validation fails, warn the user with specific details about what
looks wrong. Do not roll back automatically -- the user may want to
investigate.

### Step 8: Generate Update Report

Produce the update report using the template in
`references/TEMPLATE.md`. This is the primary output artifact.

The report includes:

1. **Version summary**: local (before) -> latest (after), update type.
2. **Files changed**: every file that was updated, with a one-line
   summary of what changed.
3. **Files skipped**: files the user chose to skip due to local
   modifications, with the reason.
4. **Files added**: new files not present in the previous version.
5. **Files removed**: files present in the old version but not in the
   new one.
6. **New capabilities**: skills added, skills updated (with version
   deltas), workflows added, and any breaking changes -- derived from
   release notes and file diff analysis.
7. **Skipped file recovery**: instructions for how to manually update
   any files that were skipped.

**Report delivery:**
- Display the report in the conversation.
- Offer to save it as a file: `updates/update-{from}-to-{to}-{date}.md`
  (e.g., `updates/update-v2.8.2-to-v2.9.0-2026-04-09.md`).

### Step 9: Present Next Steps

After the update completes, suggest next steps:

```
## Next Steps

- Review the update report for any skipped files
- Run `/pm-skill-validate --all` to verify skill integrity
- Run local CI: `bash scripts/lint-skills-frontmatter.sh`
- Check the release notes for any migration steps: {release-url}
- If you skipped files with local changes, consider merging manually
```

## Degraded Mode

If running in an environment without direct file system or network
access (e.g., MCP or embedded environment):

1. **No network access**: Cannot perform the update. Report the
   limitation and provide the user with manual update instructions:
   - Link to the latest release page
   - List the steps to download and extract manually
2. **No file system access**: Cannot scan for local modifications or
   write updated files. Provide:
   - Version comparison (if the user pastes their local version info)
   - Capability diff from release notes
   - A checklist of files the user should update manually
3. **Partial access**: Do what you can. Clearly note which steps were
   skipped and why in the report.

## Output Contract

The updater MUST produce an update report following the format in
`references/TEMPLATE.md`.

The report:
- Uses the exact section headings defined in the template
- Includes version information for both local and upstream
- Lists every file with its disposition (updated, skipped, added, removed)
- Describes new capabilities derived from the version delta
- Provides recovery instructions for any skipped files

The updater MUST:
- Validate internet access before attempting any remote operations
- Determine the local version before comparing against upstream
- Never silently overwrite a locally modified file
- Back up locally modified files before overwriting (if user chooses overwrite)
- Present a clear prompt for each conflict with diff capability
- Support batch conflict resolution (overwrite-all / skip-all)
- Run post-update validation to confirm a healthy state

The updater MUST NOT:
- Proceed without internet access confirmation
- Overwrite locally modified files without user consent
- Delete local files that don't exist in the upstream release
- Auto-rollback on validation failure (inform the user instead)
- Modify files outside the pm-skills directory

## Quality Checklist

Before delivering the update report, verify:

- [ ] Internet access was validated before any remote operations
- [ ] Local version was correctly identified from available sources
- [ ] Latest public version was fetched and compared
- [ ] User was warned about major version updates (if applicable)
- [ ] All locally modified files were detected and presented
- [ ] User was prompted for each file conflict (or batch mode was used)
- [ ] Backups were created for overwritten locally modified files
- [ ] Post-update validation passed (or failures were reported)
- [ ] Update report follows the template format exactly
- [ ] New capabilities section accurately reflects the version delta
- [ ] Skipped file recovery instructions are provided
- [ ] Next steps are presented

## Examples

See `references/EXAMPLE.md` for a completed update report demonstrating
a minor version update with local modifications, conflict resolution,
and new capability discovery.
