# Reference

Canonical specifications and lookup tables for PM Skills contributors.

## What lives here

The `docs/reference/` folder holds **authoritative reference material**. These files are the source of truth contributors check when they need to know "what is the schema?" or "which command maps to which skill?" or "what category does this skill belong to?". If a guide elsewhere in `docs/` says one thing and a file in this folder says another, the file in this folder wins.

This folder is for lookup, not learning. New contributors should start with [`docs/getting-started/`](../getting-started/) or [`docs/concepts/`](../concepts/) and only come here when they need precise rules.

## Files in this folder

### Specifications

| File | Purpose | When to read it |
|------|---------|-----------------|
| [`frontmatter-schema.yaml`](frontmatter-schema.yaml) | Authoritative schema for SKILL.md frontmatter. Defines required fields, conditional rules (phase vs classification), and validation expectations. Mirrored by `scripts/lint-skills-frontmatter.sh`. | When authoring or modifying any SKILL.md, or when CI fails on frontmatter. |
| [`pm-skill-anatomy.md`](pm-skill-anatomy.md) | Structural rules for PM-Skills: directory layout, the three-file model, classification types, phase requirements, frontmatter rules, validation expectations. | When authoring a new skill or checking compliance with structural rules. |
| [`pm-skill-versioning.md`](pm-skill-versioning.md) | SemVer rules for individual skill versions, HISTORY.md governance, skills-manifest.yaml format, and tie-breaker rules for version-bump classification. | When deciding how to bump a skill version, or when authoring a release plan. |

### Catalogs

| File | Purpose | When to read it |
|------|---------|-----------------|
| [`commands.md`](commands.md) | Complete table of every slash command shipped, mapped to its target skill or workflow and phase. 47 commands as of v2.12.0: 40 skill commands plus 7 workflow commands. | When the user asks "what commands exist?" or you need the canonical command-to-skill mapping. |
| [`categories.md`](categories.md) | The 7-category taxonomy (`research`, `problem-framing`, `ideation`, `specification`, `validation`, `reflection`, `coordination`) with skill mappings, framework mapping (Triple Diamond, Lean Startup, Design Thinking), and category selection guide. | When choosing `metadata.category` for a new skill, or when explaining how skills relate to PM methodologies. |

### Architecture and ecosystem

| File | Purpose | When to read it |
|------|---------|-----------------|
| [`project-structure.md`](project-structure.md) | High-level walkthrough of the PM Skills repository layout: `/skills/`, `/commands/`, `/_workflows/`, `/docs/`, `/AGENTS/`, `/.github/`. | When orienting a new contributor or when you need to know which folder serves which purpose at the repo level. |
| [`ecosystem.md`](ecosystem.md) | Comparison of the file-based PM Skills repo and the companion `pm-skills-mcp` MCP server. Decision matrix, feature comparison, integration patterns, version compatibility. | When choosing between cloning the repo or installing the MCP server, or when documenting the two-product story. |

### Skill family contracts

| File | Purpose | When to read it |
|------|---------|-----------------|
| [`skill-families/index.md`](skill-families/index.md) | Catalog of active skill family contracts with member skills and enforcement summaries. Currently lists the Meeting Skills Family. | When you suspect a group of skills should share a contract, or when looking up which family a skill belongs to. |
| [`skill-families/meeting-skills-contract.md`](skill-families/meeting-skills-contract.md) | Canonical v1.1.0 contract for the 5 `foundation-meeting-*` skills plus `foundation-stakeholder-update`. Shared frontmatter, file naming, behavioral patterns, and enforcement rules. Enforced by `scripts/validate-meeting-skills-family.sh`. | When authoring or modifying any meeting-family skill, or when the validator fails. |

### This file

| File | Purpose |
|------|---------|
| [`README.md`](README.md) | What you are reading. Indexes the folder. |

## What does NOT belong here

- **Tutorials and how-to guides.** Those go in [`docs/guides/`](../guides/).
- **Conceptual explanations.** Those go in [`docs/concepts/`](../concepts/).
- **Internal planning, audits, working notes.** Those go in `docs/internal/` (not rendered on the public site).
- **Generated content** (skill pages, workflow pages, showcase pages). Those live in `docs/skills/`, `docs/workflows/`, and `docs/showcase/`, and are produced by scripts in `/scripts/generate-*`.

## How files in this folder relate to CI

Several files here are coupled to repo automation. Editing them often requires updating a script:

| File | Coupled to |
|------|-----------|
| `frontmatter-schema.yaml` | `scripts/lint-skills-frontmatter.sh` / `.ps1` (must enforce the same rules) |
| `commands.md` | `scripts/validate-commands.sh` / `.ps1` (must list valid commands) |
| `categories.md` | `metadata.category` enum in skills, used by `lint-skills-frontmatter` |
| `skill-families/meeting-skills-contract.md` | `scripts/validate-meeting-skills-family.sh` / `.ps1` |

When you change a contract or schema here, run the corresponding script locally before opening a PR. CI will run them on push and PR per [`.github/workflows/validation.yml`](https://github.com/product-on-purpose/pm-skills/blob/main/.github/workflows/validation.yml).

## Conventions for new reference files

If you need to add a new reference document, ensure it:

1. **Is authoritative.** It either defines a rule, a schema, or a complete enumeration. Reference files are not opinion pieces.
2. **Is paired with enforcement when possible.** A schema or rule that is not validated by CI tends to drift. Add or update a script in `/scripts/`.
3. **Is added to `mkdocs.yml` nav.** Otherwise it will exist in the source tree but never render to readers.
4. **Is indexed in this README.** Add a row to one of the tables above.
5. **Does not duplicate existing content.** If similar information already lives in another reference file, expand the existing file instead.

## Last updated

2026-05-03 with v2.12.0 OKR Skills Launch (count refresh: 47 commands, 40 skills).
