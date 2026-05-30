# PM Skills Update Report

<!-- MODE BANNER (choose one, delete the other) -->

<!-- For report-only mode, include this banner: -->
> **Report only . update was not applied.**
> Run `utility-update-pm-skills` to apply this update.

<!-- For completion mode, include this banner: -->
> **Update complete.** pm-skills has been updated to v{latest-version}.

---

## Update Summary

| Field | Value |
|-------|-------|
| Date | {YYYY-MM-DD} |
| Local version (before) | v{local-version} |
| Latest version (after) | v{latest-version} |
| Update type | {major / minor / patch} |
| Version source | {plugin.json / marketplace.json / CHANGELOG.md / git tag} |
| Release date | {release-date} |
| Release notes | [{release-url}]({release-url}) |

## Pre-Flight Results

| Check | Result |
|-------|--------|
| Network access | {PASS / FAIL} |
| Local version detected | {PASS / FAIL} -- {source} |
| Latest version fetched | {PASS / FAIL} |
| Version comparison | {up-to-date / update-available / major-update} |

## What's New

<!-- This is the centerpiece of the report. Tell the value story. -->

### Headline

{1-2 sentence narrative summarizing the update's value. Frame in terms of
what the user can now DO, not what files changed.}

<!-- Example: "This update adds meeting synthesis and slideshow creation,
expanding pm-skills from a planning toolkit into a presentation and
communication platform." -->

### New Skills

<!-- If no new skills: "No new skills in this update." -->

| Skill | What It Enables |
|-------|-----------------|
| {skill-name} | {What this skill lets the user do -- the capability, not just the description} |

### Updated Skills

<!-- If no updated skills: "No skills were updated." -->

| Skill | What Improved | Why It Matters |
|-------|---------------|----------------|
| {skill-name} | {What changed} | {How this benefits the user} |

### New Workflows

<!-- If no new workflows: "No new workflows in this update." -->

| Workflow | What It Connects |
|----------|-----------------|
| {workflow-name} | {Which skills it chains and what outcome it produces} |

### Other Changes

<!-- Bullet list of notable changes. If none: "No other notable changes." -->

- {Change description}

### Opportunities

{2-3 sentences describing what the user can now do that they couldn't before.
Ground suggestions in detected skills and workflows . reference actual new
capabilities by name with their slash commands (e.g., "Try `utility-mermaid-diagrams`
on your next PRD"). Label speculative pairings as suggestions. Link workflows
to their component skills.}

<!-- Example: "With the new `utility-slideshow-creator` skill, you can now go from a
PRD directly to a stakeholder presentation without leaving Claude. Try
pairing it with `foundation-persona` to create audience-tailored decks. The new
discover-to-present workflow chains `discover-interview-synthesis` → `define-problem-statement`
→ `develop-solution-brief` → `utility-slideshow-creator` into a single flow." -->

## Files {Written / That Would Be Written}

<!-- Use "Files Written" for completion reports, "Files That Would Be Written"
     for report-only. -->

| Directory | Files | New | Updated |
|-----------|-------|-----|---------|
| `skills/` | {n} | {n new} | {n updated} |
| `commands/` | {n} | {n new} | {n updated} |
| `_workflows/` | {n} | {n new} | {n updated} |
| Other | {n} | {n new} | {n updated} |
| **Total** | **{n}** | **{n new}** | **{n updated}** |

## Backup

<!-- Completion reports only. For report-only: delete this section. -->

{If backup was created:}
Backup saved to: `_pm-skills/backups/v{local-version}_{date}/`

To restore: `cp -r _pm-skills/backups/v{local-version}_{date}/* .`

{If backup was declined:}
No backup was created (user opted out).

## Post-Update Validation

<!-- Completion reports only. For report-only: delete this section. -->

| Check | Result |
|-------|--------|
| Version consistency | {PASS / FAIL -- detail} |
| File integrity | {PASS / FAIL -- detail} |
| Skill count | {before} -> {after} ({+n / -n / unchanged}) |

## Next Steps

<!-- Adjust based on report mode and results. -->

- Review this report for a summary of what changed
- Run `utility-pm-skill-validate --all` to verify skill integrity
- Run local CI: `bash scripts/lint-skills-frontmatter.sh`
- Check release notes for migration steps: {release-url}
- {For report-only: "Run `utility-update-pm-skills` to apply this update"}
- {For completion with MCP: "Update pm-skills-mcp: `cd ../pm-skills-mcp && npm run embed-skills && npm run build`"}
