<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
artifact: update-report
version: "1.0"
repo_version: "2.10.0"
skill_version: "1.0.0"
created: 2026-04-11
status: sample
thread: storevine
context: Storevine PM running /update-pm-skills to update from v2.9.1 to v2.10.0
---

## Scenario

A PM on the Storevine team has been using pm-skills at v2.9.1 as a Claude Code plugin. They run `/update-pm-skills` to check for updates and find that v2.10.0 is available with new skills for mermaid diagramming, slideshow creation, and the self-updater. They apply the update and receive a completion report. [fictional]

---

## Prompt

```
/update-pm-skills
```

---

## Output

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

This update adds mermaid diagramming, slideshow creation, and a self-updater skill, expanding pm-skills from a text-based planning toolkit into a visual communication platform. You can now go from PRD to presentation deck without leaving Claude. [fictional]

### New Skills

| Skill | What It Enables |
|-------|-----------------|
| utility-mermaid-diagrams | Create flowcharts, sequence diagrams, Gantt charts, and other mermaid visuals for PRDs, specs, and decks with `/mermaid-diagrams`. Includes a planning worksheet to prevent wasted diagram effort. |
| utility-slideshow-creator | Generate JSON deck specifications for stakeholder presentations with `/slideshow-creator`. Supports 17 slide types with dark/light variants and speaker notes. |
| utility-update-pm-skills | Check for updates and update your local pm-skills installation with `/update-pm-skills`. Supports `--status` for quick checks and `--report-only` for previews. |

### Updated Skills

No skills were updated in this release.

### New Workflows

No new workflows in this update.

### Other Changes

- New CI scripts: `validate-version-consistency` (hard-fail), `validate-gitignore-pm-skills` (advisory), `validate-script-docs` (advisory)
- `_pm-skills/` local state directory convention (gitignored)
- User-facing guide at `docs/guides/updating-pm-skills.md`

### Opportunities

With `/mermaid-diagrams` you can add flowcharts and sequence diagrams directly into your PRDs -- try it on the Campaigns send approval workflow. The `/slideshow-creator` skill pairs well with any existing deliverable: generate a PRD with `/prd`, then create a stakeholder deck from the same context with `/slideshow-creator`. Use `/update-pm-skills --status` anytime to check whether you are current.

## Files Written

| Directory | Files | New | Updated |
|-----------|-------|-----|---------|
| `skills/` | 34 | 9 (3 skills x 3 files) | 25 |
| `commands/` | 39 | 3 | 36 |
| `_workflows/` | 10 | 0 | 10 |
| Other | 8 | 1 (guide) | 7 |
| **Total** | **91** | **13** | **78** |

## Backup

Backup saved to: `_pm-skills/backups/v2.9.1_2026-04-11_091544/`

To restore: `cp -r _pm-skills/backups/v2.9.1_2026-04-11_091544/* .`

## Post-Update Validation

| Check | Result |
|-------|--------|
| Version consistency | PASS -- plugin.json, marketplace.json, and CHANGELOG.md all show v2.10.0 |
| File integrity | PASS -- AGENTS.md, skills/, commands/, _workflows/ all present |
| Skill count | 31 -> 34 (+3: utility-mermaid-diagrams, utility-slideshow-creator, utility-update-pm-skills) [fictional] |

## Next Steps

- Review this report for a summary of what changed
- Run `/pm-skill-validate --all` to verify skill integrity
- Run local CI: `bash scripts/lint-skills-frontmatter.sh`
- Check release notes: [v2.10.0](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.10.0)
- Try `/mermaid-diagrams` on your next PRD or spec
- Update pm-skills-mcp: `cd ../pm-skills-mcp && npm run embed-skills && npm run build`
