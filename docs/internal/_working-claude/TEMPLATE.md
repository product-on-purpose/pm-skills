# PM Skills Update Report

## Update Summary

| Field | Value |
|-------|-------|
| Date | {YYYY-MM-DD} |
| Local version (before) | v{local-version} |
| Latest version (after) | v{latest-version} |
| Update type | {major / minor / patch} |
| Source | {local-version-source} |
| Release date | {release-date} |
| Release notes | {release-url} |

## Pre-Flight Results

| Check | Result |
|-------|--------|
| Internet access | {PASS / FAIL} |
| Local version detected | {PASS / FAIL} -- {source} |
| Latest version fetched | {PASS / FAIL} |
| Version comparison | {up-to-date / update-available / forced} |

## Local Modifications Detected

{If modifications were found, list them. If none, write:
"No local modifications detected."}

| Status | File | Detail |
|--------|------|--------|
| {modified / added / deleted} | {file-path} | {brief description of change} |

## Files Updated

{Files that were overwritten with the upstream version.}

| File | Change Summary |
|------|---------------|
| {file-path} | {one-line description of what changed} |

## Files Skipped

{Files the user chose to keep due to local modifications.
If none, write: "No files were skipped."}

| File | Reason | Recovery |
|------|--------|----------|
| {file-path} | {local modification / user choice} | See recovery instructions below |

## Files Added

{New files introduced in the latest version that did not exist locally.
If none, write: "No new files in this update."}

| File | Description |
|------|-------------|
| {file-path} | {what this file provides} |

## Files Removed

{Files present in the old version but removed in the new version.
If none, write: "No files were removed in this update."}

| File | Note |
|------|------|
| {file-path} | {why it was removed, if known from release notes} |

## New Capabilities

{Derived from release notes, skills-manifest, and file diff analysis.
Organized by category.}

### Skills Added

| Skill | Version | Phase/Classification | Description |
|-------|---------|---------------------|-------------|
| {skill-name} | {version} | {phase or classification} | {brief description} |

### Skills Updated

| Skill | Previous | New | Change Type | Summary |
|-------|----------|-----|-------------|---------|
| {skill-name} | v{old} | v{new} | {major / minor / patch} | {what changed} |

### Workflows Added

| Workflow | Description |
|----------|-------------|
| {workflow-name} | {brief description} |

### Breaking Changes

{If any breaking changes are present (major version bumps in skills,
removed commands, changed contracts), list them here with migration
guidance. If none, write: "No breaking changes in this update."}

- **{skill or component}**: {what broke and how to migrate}

## Post-Update Validation

| Check | Result |
|-------|--------|
| Version consistency | {PASS / FAIL -- detail} |
| File integrity | {PASS / FAIL -- detail} |
| Skill count | {before} -> {after} ({+n / -n / unchanged}) |

## Skipped File Recovery

{Instructions for manually updating any files that were skipped.
If no files were skipped, write: "All files were updated. No recovery needed."}

To manually update a skipped file:

1. Back up your local version: `cp {path} {path}.my-backup`
2. Fetch the upstream version:
   `git show v{latest}:{path} > {path}.upstream`
3. Compare: `diff {path} {path}.upstream`
4. Merge changes manually or overwrite: `cp {path}.upstream {path}`
5. Clean up: `rm {path}.my-backup {path}.upstream`

{Repeat for each skipped file with the specific path.}

## Next Steps

- Review this report for any skipped files that need manual merging
- Run `/pm-skill-validate --all` to verify skill integrity post-update
- Run local CI: `bash scripts/lint-skills-frontmatter.sh`
- Check release notes for migration steps: {release-url}
- If you skipped modified files, consider merging upstream changes manually
