---
title: Skill Versioning
description: How PM skills are versioned independently of repo releases, using SemVer, HISTORY.md, and skills-manifest.yaml.
tags:
  - Concepts
  - Versioning
---

# Skill Versioning

PM Skills tracks versions at two levels: the **repo version** (the release package) and individual **skill versions** (each skill's contract). These are intentionally decoupled.

## Two Version Levels

| Level | Example | Where it lives |
|-------|---------|----------------|
| **Repo version** | v2.8.1 | Git tags, CHANGELOG.md, plugin.json |
| **Skill version** | 2.0.0 | `version` field in each SKILL.md frontmatter |

A repo release packages many skills. A skill can iterate across multiple repo releases. For example, repo v2.8.0 contains `deliver-prd` at version 2.0.0 and `utility-pm-skill-validate` at version 1.0.0.

## How Skill Versions Work

Each skill follows [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html). The "public API" of a skill is its shipped contract — the command name, required output sections, interaction pattern, and output guarantees.

### What triggers each bump

| Bump | When | Examples |
|------|------|---------|
| **Major** (X.0.0) | Required contract changed — existing usage breaks | Command renamed, required section removed, interaction pattern changed |
| **Minor** (x.Y.0) | New optional capability — existing usage still works | New optional output section, handles more scenarios |
| **Patch** (x.y.Z) | Clarification only — same requirements, better expression | Wording improved, example rewritten, checklist item rephrased |

### The tie-breaker rule

When a change doesn't clearly fit one category:

> If a user must do something **new** to stay compliant with the skill's required contract, classify as **major**. If the new behavior is **additive or optional**, classify as **minor**. If the required behavior is **unchanged and only clarified**, classify as **patch**.

## HISTORY.md

When a skill ships its second version, a `HISTORY.md` file is created in the skill directory connecting versions to efforts and releases:

```
skills/deliver-prd/
  SKILL.md
  HISTORY.md          ← created at second version
  references/
    TEMPLATE.md
    EXAMPLE.md
```

HISTORY.md includes a summary table (newest first) and a section per version describing what changed and why.

Skills on their first version don't need HISTORY.md — the effort brief and skills manifest cover the initial release.

## Skills Manifest

Each repo release includes a `skills-manifest.yaml` in its release plan folder, listing which skill versions changed:

```yaml
release: v2.8.0
date: 2026-04-03

skills:
  - name: utility-pm-skill-validate
    version: 1.0.0
    previous_version: null
    change_type: added
    effort: F-10

  - name: utility-pm-skill-iterate
    version: 1.0.0
    previous_version: null
    change_type: added
    effort: F-11
```

This answers: "Which skill versions shipped in release X?"

## How the Lifecycle Tools Handle Versioning

The [lifecycle tools](skill-lifecycle.md) integrate with versioning:

- **`/pm-skill-validate`** — reports the current skill version in the validation report header
- **`/pm-skill-iterate`** — suggests a version bump class (patch/minor/major) after applying changes, updates the `version` and `updated` fields on confirmation, and offers to create or update HISTORY.md

## Current Skill Versions

All 25 domain skills and the foundation skill are at version **2.0.0** (from the v2.0 flat-structure restructure). The 3 utility skills are at **1.0.0** (shipped in v2.7.0 and v2.8.0). No skill has iterated past its initial version yet — the first version bumps will come from the [quality convergence effort](https://github.com/product-on-purpose/pm-skills/blob/main/docs/internal/efforts/F-12-skill-quality-convergence.md).

## Traceability

| Question | Where to look |
|----------|---------------|
| What's the current version of a skill? | `skills/{name}/SKILL.md` frontmatter |
| What changed between skill versions? | `skills/{name}/HISTORY.md` |
| Which skill versions shipped in a release? | `docs/internal/release-plans/vX.Y.Z/skills-manifest.yaml` |
| What effort created or changed a skill? | `docs/internal/efforts/` |
| What files existed at a specific release? | `git show vX.Y.Z:skills/{name}/` |
