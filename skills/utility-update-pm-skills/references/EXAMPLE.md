# PM Skills Update Report

> **Update complete.** pm-skills has been updated to v2.10.0.

---

## Update Summary

| Field | Value |
|-------|-------|
| Date | 2026-04-11 |
| Local version (before) | v2.9.1 |
| Latest version (after) | v2.10.0 |
| Update type | minor |
| Version source | .claude-plugin/plugin.json |
| Release date | 2026-04-11 |
| Release notes | [v2.10.0](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.10.0) |

## Pre-Flight Results

| Check | Result |
|-------|--------|
| Network access | PASS |
| Local version detected | PASS -- .claude-plugin/plugin.json |
| Latest version fetched | PASS |
| Version comparison | update-available |

## What's New

### Headline

This update adds a self-updater skill that lets you check for new
pm-skills releases, preview what's changed, and update your local
installation - all from a single slash command. It also formally
releases the mermaid diagramming and slideshow creation skills that
were available since v2.9.1.

### New Skills

| Skill | What It Enables |
|-------|-----------------|
| utility-update-pm-skills | Check for updates, preview changes, and update your local pm-skills with `utility-update-pm-skills`. Supports `--status` for a quick version check and `--report-only` for a preview without writing files. |

### Updated Skills

No skills were updated in this release.

### New Workflows

No new workflows in this update.

### Other Changes

- New CI scripts: `validate-version-consistency` (hard-fail), `validate-gitignore-pm-skills` (advisory), `validate-script-docs` (advisory)
- `_pm-skills/` local state directory convention (gitignored)
- `utility-update-pm-skills` slash command with `--status` and `--report-only` flags
- User-facing guide at `docs/guides/updating-pm-skills.md`

### Opportunities

With `utility-update-pm-skills --status` you can quickly check whether you're
current without committing to an update. Try `utility-update-pm-skills --report-only`
before updating to see exactly what files will change and what new
capabilities are available. The self-updater means you no longer need to
manually download releases - future updates are one command away.

## Files Written

| Directory | Files | New | Updated |
|-----------|-------|-----|---------|
| `skills/` | 32 | 3 (1 skill x 3 files) | 29 |
| `commands/` | 39 | 1 | 38 |
| `_workflows/` | 10 | 0 | 10 |
| Other | 8 | 1 (guide) | 7 |
| **Total** | **89** | **5** | **84** |

## Backup

Backup saved to: `_pm-skills/backups/v2.9.1_2026-04-11_143022/`

To restore: `cp -r _pm-skills/backups/v2.9.1_2026-04-11_143022/* .`

## Post-Update Validation

| Check | Result |
|-------|--------|
| Version consistency | PASS -- plugin.json, marketplace.json, and CHANGELOG.md all show v2.10.0 |
| File integrity | PASS -- AGENTS.md, skills/, commands/, _workflows/ all present |
| Skill count | 31 -> 32 (+1: utility-update-pm-skills) |

## Next Steps

- Review this report for a summary of what changed
- Run `utility-pm-skill-validate --all` to verify skill integrity
- Run local CI: `bash scripts/lint-skills-frontmatter.sh`
- Check release notes: [v2.10.0](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.10.0)
- Try `utility-update-pm-skills --status` to confirm you're current

---

# Report-Only Example

Below is what `utility-update-pm-skills --report-only` produces for the same update.

---

# PM Skills Update Report

> **Report only - update was not applied.**
> Run `utility-update-pm-skills` to apply this update.

---

## Update Summary

| Field | Value |
|-------|-------|
| Date | 2026-04-11 |
| Local version (before) | v2.9.1 |
| Latest version (after) | v2.10.0 |
| Update type | minor |
| Version source | .claude-plugin/plugin.json |
| Release date | 2026-04-11 |
| Release notes | [v2.10.0](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.10.0) |

## Pre-Flight Results

| Check | Result |
|-------|--------|
| Network access | PASS |
| Local version detected | PASS -- .claude-plugin/plugin.json |
| Latest version fetched | PASS |
| Version comparison | update-available |

## What's New

### Headline

This update adds a self-updater skill for keeping your pm-skills
installation current, plus formally releases mermaid diagramming and
slideshow creation.

### New Skills

| Skill | What It Enables |
|-------|-----------------|
| utility-update-pm-skills | Check for updates and update your local pm-skills from a single command. |

### Updated Skills

No skills were updated.

### New Workflows

No new workflows.

### Other Changes

- 3 new CI scripts, `utility-update-pm-skills` command, user-facing update guide

### Opportunities

The self-updater means future releases are one command away. Try
`utility-update-pm-skills --status` anytime to check if you're current.

## Files That Would Be Written

| Directory | Files | New | Updated |
|-----------|-------|-----|---------|
| `skills/` | 32 | 3 | 29 |
| `commands/` | 39 | 1 | 38 |
| `_workflows/` | 10 | 0 | 10 |
| Other | 8 | 1 | 7 |
| **Total** | **89** | **5** | **84** |

## Next Steps

- Run `utility-update-pm-skills` to apply this update
- Review the release notes: [v2.10.0](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.10.0)
