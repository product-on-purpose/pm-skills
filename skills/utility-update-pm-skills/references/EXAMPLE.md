# PM Skills Update Report

## Update Summary

| Field | Value |
|-------|-------|
| Date | 2026-04-09 |
| Local version (before) | v2.8.2 |
| Latest version (after) | v2.9.0 |
| Update type | minor |
| Source | .claude-plugin/plugin.json |
| Release date | 2026-04-07 |
| Release notes | https://github.com/product-on-purpose/pm-skills/releases/tag/v2.9.0 |

## Pre-Flight Results

| Check | Result |
|-------|--------|
| Internet access | PASS |
| Local version detected | PASS -- .claude-plugin/plugin.json |
| Latest version fetched | PASS |
| Version comparison | update-available |

## Local Modifications Detected

| Status | File | Detail |
|--------|------|--------|
| modified | skills/deliver-prd/references/TEMPLATE.md | Added custom "Legal Review" section for regulated industry |
| modified | skills/foundation-persona/SKILL.md | Adjusted persona depth instructions for B2B context |
| added | skills/deliver-prd/references/INTERNAL-CHECKLIST.md | Team-specific review checklist (not in upstream) |

## Files Updated

| File | Change Summary |
|------|---------------|
| skills/discover-user-research/SKILL.md | Updated to v1.1.0 -- new optional remote research section |
| skills/discover-user-research/references/TEMPLATE.md | Added "Remote Research Considerations" section |
| skills/discover-user-research/references/EXAMPLE.md | Example expanded with remote interview scenario |
| skills/define-hypothesis/SKILL.md | Patch v1.0.1 -- clarified falsifiability criteria |
| skills/define-hypothesis/references/EXAMPLE.md | Improved hypothesis examples with measurable outcomes |
| skills/utility-pm-skill-validate/SKILL.md | Updated to v1.1.0 -- new history-format check |
| skills/utility-pm-skill-validate/references/TEMPLATE.md | Added HISTORY.md validation row |
| _workflows/discovery-to-definition.md | Updated to reference new research capabilities |
| commands/user-research.md | Updated command description |
| AGENTS.md | Updated skill descriptions and added new workflow entry |
| CHANGELOG.md | Added v2.9.0 release entry |
| .claude-plugin/plugin.json | Version bumped to 2.9.0 |
| marketplace.json | Version bumped to 2.9.0 |
| skills/measure-ab-testing/SKILL.md | New skill -- A/B testing experiment design (v1.0.0) |
| skills/measure-ab-testing/references/TEMPLATE.md | New file -- experiment plan template |
| skills/measure-ab-testing/references/EXAMPLE.md | New file -- checkout flow A/B test example |
| commands/ab-testing.md | New command file for /ab-testing |

## Files Skipped

| File | Reason | Recovery |
|------|--------|----------|
| skills/deliver-prd/references/TEMPLATE.md | User chose SKIP -- local "Legal Review" section would be lost | See recovery instructions below |
| skills/foundation-persona/SKILL.md | User chose SKIP -- local B2B adjustments preserved | See recovery instructions below |

## Files Added

| File | Description |
|------|-------------|
| skills/measure-ab-testing/SKILL.md | New skill for designing A/B testing experiments |
| skills/measure-ab-testing/references/TEMPLATE.md | Experiment plan output template |
| skills/measure-ab-testing/references/EXAMPLE.md | Worked example: checkout flow conversion test |
| commands/ab-testing.md | Slash command for /ab-testing |
| _workflows/measure-and-iterate.md | New workflow connecting measurement skills to iteration |

## Files Removed

No files were removed in this update.

## New Capabilities

### Skills Added

| Skill | Version | Phase/Classification | Description |
|-------|---------|---------------------|-------------|
| measure-ab-testing | 1.0.0 | measure | Designs A/B testing experiments with hypothesis, variants, sample size, and success criteria |

### Skills Updated

| Skill | Previous | New | Change Type | Summary |
|-------|----------|-----|-------------|---------|
| discover-user-research | v1.0.0 | v1.1.0 | minor | New optional section for remote/async research methods |
| define-hypothesis | v1.0.0 | v1.0.1 | patch | Clarified falsifiability criteria with better examples |
| utility-pm-skill-validate | v1.0.0 | v1.1.0 | minor | Added HISTORY.md format validation check |

### Workflows Added

| Workflow | Description |
|----------|-------------|
| measure-and-iterate | Connects measure-phase skills to iterate-phase skills for data-driven product improvement |

### Breaking Changes

No breaking changes in this update.

## Post-Update Validation

| Check | Result |
|-------|--------|
| Version consistency | PASS -- plugin.json, marketplace.json, and CHANGELOG.md all show v2.9.0 |
| File integrity | PASS -- AGENTS.md, skills/, commands/, _workflows/ all present |
| Skill count | 29 -> 30 (+1: measure-ab-testing) |

## Skipped File Recovery

### skills/deliver-prd/references/TEMPLATE.md

Your local version adds a "Legal Review" section not present upstream.
The upstream version adds improved guidance comments in the "Success Metrics"
and "Technical Considerations" sections.

To manually merge:

1. Back up your local version: `cp skills/deliver-prd/references/TEMPLATE.md skills/deliver-prd/references/TEMPLATE.md.my-backup`
2. Fetch the upstream version:
   `git show v2.9.0:skills/deliver-prd/references/TEMPLATE.md > skills/deliver-prd/references/TEMPLATE.md.upstream`
3. Compare: `diff skills/deliver-prd/references/TEMPLATE.md skills/deliver-prd/references/TEMPLATE.md.upstream`
4. Merge the upstream improvements into your version while keeping your "Legal Review" section.
5. Clean up: `rm skills/deliver-prd/references/TEMPLATE.md.my-backup skills/deliver-prd/references/TEMPLATE.md.upstream`

### skills/foundation-persona/SKILL.md

Your local version adjusts the persona depth instructions for B2B contexts.
The upstream version has no changes to this file in v2.9.0 (your local
modification predates v2.8.2). No upstream merge needed -- your version is
current except for your intentional customization.

## Next Steps

- Review this report for the 2 skipped files that need manual merging
- Run `/pm-skill-validate --all` to verify skill integrity post-update
- Run local CI: `bash scripts/lint-skills-frontmatter.sh`
- Check release notes for migration steps: https://github.com/product-on-purpose/pm-skills/releases/tag/v2.9.0
- Explore the new `/ab-testing` skill for experiment design
- If you skipped modified files, consider merging upstream changes manually

---

## Example Notes

This report demonstrates:
- A minor version update (v2.8.2 -> v2.9.0) with a mix of skill updates and a new skill
- Three locally modified files detected: two user-customized skill files and one user-added file
- Conflict resolution with two files skipped (user chose to preserve local changes) and the user-added file left untouched (not in upstream, so no conflict)
- Per-file recovery instructions tailored to what actually changed upstream vs. locally
- New capabilities section showing one new skill, three updated skills, and one new workflow
- Post-update validation confirming version consistency and correct skill count
- Actionable next steps including the new skill that was added
