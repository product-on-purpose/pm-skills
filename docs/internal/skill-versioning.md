# Skill Versioning and Release Tracking

Status: Active
Owner: Maintainers
Created: 2026-03-31

## Overview

This repo tracks versions at two levels:

- **Repo version** — the plugin/bundle release (e.g., `v2.7.0`), tracked in git tags, `CHANGELOG.md`, `.claude-plugin/plugin.json`, and `docs/releases/`.
- **Skill version** — each skill's independent contract version (e.g., `1.0.0`), tracked in the skill's SKILL.md frontmatter `version` field.

These are intentionally decoupled. A repo release bundles many skills; a skill can iterate across multiple repo releases.

## Key Concepts

| Concept | What it is | Where it lives |
|---------|-----------|----------------|
| **Effort** | A unit of work (design + implementation) | `_NOTES/efforts/` (working), `docs/internal/efforts/` (brief) |
| **Skill** | A long-lived shipped surface | `skills/{name}/SKILL.md` |
| **Skill version** | The current contract version of a skill | `version` field in SKILL.md frontmatter |
| **Repo release** | A tagged bundle of changes | Git tag, `CHANGELOG.md`, `docs/releases/` |
| **Skills manifest** | Which skill versions changed in a release | `docs/internal/release-plans/vX.Y.Z/skills-manifest.yaml` |
| **Skill history** | Per-skill changelog across versions | `skills/{name}/HISTORY.md` (created when a skill iterates) |

## Skills Manifest

Every release governance folder should include a `skills-manifest.yaml` listing skills that were added, changed, or removed in that release.

**Location:** `docs/internal/release-plans/vX.Y.Z/skills-manifest.yaml`

**When to create:** During release preparation, after all skill work is committed.

### Format

```yaml
# Skills changed in this release
release: v2.7.0
date: 2026-03-22

skills:
  - name: utility-pm-skill-builder
    version: 1.0.0
    previous_version: null  # null for new skills
    change_type: added       # added | changed | removed
    effort: F-05
    issue: 113
```

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | yes | Skill directory name (e.g., `utility-pm-skill-builder`) |
| `version` | yes | Skill version shipping in this release |
| `previous_version` | yes | Prior version, or `null` if new |
| `change_type` | yes | One of: `added`, `changed`, `removed` |
| `effort` | yes | Effort ID that drove the change |
| `issue` | no | GitHub issue number |

### Rules

- Only list skills that **changed** in this release, not the full inventory.
- The `version` must match the skill's SKILL.md frontmatter at the tagged commit.
- If a release contains no skill changes (e.g., CI-only or docs-only), the manifest is optional.

## Skill Version (SemVer)

Each skill uses [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html). The "public API" of a skill is its shipped contract:

### What triggers each bump

| Bump | When |
|------|------|
| **Major** (`X.0.0`) | Command name changes, required output sections restructured, interaction pattern breaks existing usage |
| **Minor** (`x.Y.0`) | New optional capability, new optional output sections, handles more scenarios without breaking existing expectations |
| **Patch** (`x.y.Z`) | Wording clarified, examples improved, typos fixed, internal heuristics tuned without changing required behavior |

### Examples

| Change | Bump |
|--------|------|
| `/pm-skill-builder` renamed to `/skill-builder` | Major |
| Builder adds optional release-manifest drafting step | Minor |
| Gap analysis wording clarified | Patch |
| New optional section in output contract | Minor |
| Required section removed from output contract | Major |
| EXAMPLE.md rewritten with better scenario | Patch |

## Skill History (HISTORY.md)

A per-skill changelog that connects versions to efforts and releases.

**Location:** `skills/{name}/HISTORY.md`

**When to create:** When a skill ships its **second** version. A skill at 1.0.0 with no iteration history doesn't need one — the effort brief and skills manifest cover it. Once a skill bumps to 1.1.0 or 2.0.0, create HISTORY.md with entries for all versions.

### Format

```markdown
# {skill-name} — Version History

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
| What skill versions shipped in release X? | `docs/internal/release-plans/vX.Y.Z/skills-manifest.yaml` |
| What changed between skill v1.0 and v1.1? | `skills/{name}/HISTORY.md` |
| What's the current version of a skill? | `skills/{name}/SKILL.md` frontmatter |
| What files existed at a specific release? | `git show vX.Y.Z:skills/{name}/` |

## Checklist: Releasing a Skill Change

Use this when a release includes skill additions or modifications.

- [ ] Skill SKILL.md frontmatter `version` and `updated` fields are correct
- [ ] CHANGELOG.md entry includes skill version bump in parentheses (e.g., `1.0.0 → 1.1.0`)
- [ ] `skills-manifest.yaml` created/updated in the release governance folder
- [ ] If skill has prior versions: HISTORY.md created or updated
- [ ] Effort brief updated with release info (`Release: vX.Y.Z`)
