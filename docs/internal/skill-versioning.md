# Skill Versioning and Release Tracking

Status: Active
Owner: Maintainers
Created: 2026-03-31

## Overview

This repo tracks versions at two levels:

- **Repo version** - the plugin release (e.g., `v2.7.0`), tracked in git tags, `CHANGELOG.md`, `.claude-plugin/plugin.json`, and `docs/releases/`.
- **Skill version** - each skill's independent contract version (e.g., `1.0.0`), tracked in the skill's SKILL.md frontmatter `version` field.

These are intentionally decoupled. A repo release packages many skills; a skill can iterate across multiple repo releases.

## Key Concepts

| Concept | What it is | Where it lives |
|---------|-----------|----------------|
| **Effort** | A unit of work (design + implementation) | `_NOTES/efforts/` (working), `docs/internal/efforts/` (brief) |
| **Skill** | A long-lived shipped surface | `skills/{name}/SKILL.md` |
| **Skill version** | The current contract version of a skill | `version` field in SKILL.md frontmatter |
| **Repo release** | A tagged collection of changes | Git tag, `CHANGELOG.md`, `docs/releases/` |
| **Skill history** | Per-skill changelog across versions, one row per shipped version | `skills/{name}/HISTORY.md` |

## Retired: the per-release skills manifest

Until 2026-10-15 this document required a `skills-manifest.yaml` in every release governance folder, listing the skills each release changed. The requirement was retired under [#279](https://github.com/product-on-purpose/pm-skills/issues/279). Only 9 of 45 release folders ever carried one, and the practice lapsed between v2.15.0 and v2.33.0. Every version a manifest recorded is also in that skill's `HISTORY.md`, so the nine files were deleted along with their validator. They remain readable at each release tag, for example `git show v2.12.0:docs/internal/release-plans/v2.12.0/skills-manifest.yaml`.

To answer the question a manifest answered, which skills a release changed, search the Release column of every skill history: `grep -l '| vX.Y.Z |' skills/*/HISTORY.md`.

## Skill Version (SemVer)

Each skill uses [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html). The "public API" of a skill is its shipped contract:

### What triggers each bump

| Bump | When |
|------|------|
| **Major** (`X.0.0`) | Command name changes, required output sections restructured, interaction pattern breaks existing usage |
| **Minor** (`x.Y.0`) | New optional capability, new optional output sections, handles more scenarios without breaking existing expectations |
| **Patch** (`x.y.Z`) | Wording clarified, examples improved, typos fixed, internal heuristics tuned without changing required behavior |
| **No bump** | Tooling-only files added beside the skill that do not change its behavior or contract: eval fixtures (`evals/trigger-fixtures.json`), test artifacts. Decided 2026-06-12 (v2.27.0 plan decision Q-C / trigger-evals spec T-B). If a fixture-driven finding later changes SKILL.md, THAT change bumps normally |

### Tie-breaker rule

When a change doesn't clearly fit one category, apply this precedence:

> **If a user must do something new to stay compliant with the skill's required contract, classify as major.** If the new behavior is additive or optional, classify as minor. If the required behavior is unchanged and only clarified, classify as patch.

The key question is: *does existing usage break?*
- "You must now include section X" → **major** (existing outputs without X are no longer compliant)
- "You may now include section X" → **minor** (existing outputs still work, new option available)
- "Section X is now described more clearly" → **patch** (existing outputs still satisfy the requirement)

### Examples

| Change | Bump | Why |
|--------|------|-----|
| `/pm-skill-builder` renamed to `/skill-builder` | Major | Command name is part of the contract; existing prompts break |
| Required section removed from output contract | Major | Existing outputs that included it are fine, but consumers expecting it break |
| New required checklist item added | Major | Existing skill outputs that passed the old checklist now fail the new one |
| Output contract wording tightened - what "done" means changes | Major | Narrows what's compliant; some previously-valid outputs no longer pass |
| Builder adds optional release-manifest drafting step | Minor | New capability, existing flow unchanged |
| New optional section in output contract | Minor | Users can ignore it; existing outputs still comply |
| Validator adds a new optional quality check | Minor | More coverage, no existing behavior changes |
| Gap analysis wording clarified | Patch | Same check, clearer explanation |
| EXAMPLE.md rewritten with better scenario | Patch | Reference material improved, no contract change |
| `[fictional]` markers added to EXAMPLE.md, or an invented claim deleted, in a convention sweep | No bump | Annotation of provenance only; nothing the skill asks its user to do changes (decided 2026-10-16, v2.34.0 plan R6) |
| Description expanded for clarity | Patch | Same skill behavior, better discoverability |
| Quality checklist item reworded for testability | Patch | Same requirement, clearer phrasing |

## Skill History (HISTORY.md)

A per-skill changelog that connects versions to efforts and releases.

**Location:** `skills/{name}/HISTORY.md`

**When to create:** HISTORY.md is created on either of two triggers, whichever comes first:

1. A skill ships at **1.0.0 or later**. Create HISTORY.md in the same change that adds the skill, with one baseline row for its first version, so the Release column records every version a release ships. Until 2026-10-15 a skill at 1.0.0 could rely on the release's `skills-manifest.yaml` instead; that file is retired, and 66 of 68 skills already carried a HISTORY.md when the rule changed. Both lifecycle skills follow this rule as of v2.34.0: `utility-pm-skill-builder` (1.3.0) drafts the file with a baseline row in every new-skill packet, and `utility-pm-skill-iterate` (1.1.0) offers to create a missing one for any skill at 1.0.0 or later.
2. A skill takes its **first-ever bump off an unbumped 0.x baseline** (a pre-1.0 skill that shipped and then sat unbumped across one or more releases). The 0.x version itself does not get a synthetic backfilled row - 0.x is pre-contract by SemVer convention - but the bump that promotes it (typically to 1.0.0) gets a first HISTORY row documenting why the contract is now considered stable. Precedent: the 15 `tool-*` family skills, frozen at `0.1.0` since v2.15.0 across seven releases with no versioning intent stated, bumped to `1.0.0` with a first HISTORY row each in v2.30.0 (M-35, WS-T11; see TD-5 in [`release-plans/v2.30.0/plan_v2.30.0.md`](release-plans/v2.30.0/plan_v2.30.0.md)).

### Format

```markdown
# {skill-name} - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.1.0 | 2026-05-15 | v2.9.0 | F-18 | changed | Improved gap analysis |
| 1.0.0 | 2026-03-22 | v2.7.0 | F-05 | added | Initial release |

## 1.1.0 (2026-05-15)

Released in [v2.9.0](../../docs/releases/Release_v2.9.0.md). Effort: F-18 (#130).

[2-5 sentence description of what changed and why.]

### Changes
- [Bullet list of specific changes]

## 1.0.0 (2026-03-22)

Released in [v2.7.0](../../docs/releases/Release_v2.7.0.md). Effort: F-05 (#113).

[2-5 sentence description of initial release.]

### Contract established
- Command: /pm-skill-builder
- [Other contract details]
```

### Rules

- Newest version first in the summary table.
- Each version section should be brief (10-20 lines). The effort brief has full design context.
- Include a "Contract established" subsection for 1.0.0 and a "Changes" subsection for subsequent versions.
- Link to the public release notes, not internal docs.

## Repo Release Version

The repo uses SemVer independently of skill versions:

| Bump | When |
|------|------|
| **Major** | Breaking repo-wide packaging, structure, or compatibility change |
| **Minor** | New skill added, or meaningful new shipped capability |
| **Patch** | Docs, CI, release-packaging, or small non-breaking fixes |

A repo minor release (e.g., `v2.8.0`) might contain a new skill at `1.0.0` and an existing skill bumped to `1.1.0`. The version numbers are unrelated.

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) with skill name as scope:

```
feat(pm-skill-builder): add optional release-manifest drafting step
fix(pm-skill-builder): correct gap analysis false positive on foundation skills
feat(pm-skill-validate): initial implementation
```

This makes `git log --grep="pm-skill-builder"` a reliable way to find all commits touching a specific skill.

## Traceability

| Question | Where to look |
|----------|---------------|
| What effort created this skill? | `docs/internal/efforts/F-XX-*.md` or skill's HISTORY.md |
| What skill versions shipped in release X? | `grep -l '\| vX.Y.Z \|' skills/*/HISTORY.md`, then each file's row for that release |
| What changed between skill v1.0 and v1.1? | `skills/{name}/HISTORY.md` |
| What's the current version of a skill? | `skills/{name}/SKILL.md` frontmatter |
| What files existed at a specific release? | `git show vX.Y.Z:skills/{name}/` |

## Checklist: Releasing a Skill Change

Use this when a release includes skill additions or modifications.

- [ ] Skill SKILL.md frontmatter `version` and `updated` fields are correct
- [ ] CHANGELOG.md entry includes skill version bump in parentheses (e.g., `1.0.0 → 1.1.0`)
- [ ] HISTORY.md has a row for the new version, with the release in its Release column (a new skill gets the file with a baseline row)
- [ ] Effort brief updated with release info (`Release: vX.Y.Z`)
