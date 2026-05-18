---
title: Reference
description: Authoritative specs, catalogs, architecture docs, and skill-family contracts that contributors check when authoring or modifying PM skills.
sidebar:
  label: Overview
  order: 1
---

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
| [`commands.md`](commands.md) | Complete table of every slash command shipped, mapped to its target skill or workflow and phase. 66 commands as of v2.16.0: 56 skill commands + 7 workflow commands + 3 sub-agent companion commands. | When the user asks "what commands exist?" or you need the canonical command-to-skill mapping. |
| [`categories.md`](categories.md) | The 7-category taxonomy (`research`, `problem-framing`, `ideation`, `specification`, `validation`, `reflection`, `coordination`) with skill mappings, framework mapping (Triple Diamond, Lean Startup, Design Thinking), and category selection guide. | When choosing `metadata.category` for a new skill, or when explaining how skills relate to PM methodologies. |

### Architecture and ecosystem

| File | Purpose | When to read it |
|------|---------|-----------------|
| [`project-structure.md`](project-structure.md) | High-level walkthrough of the PM Skills repository layout: `/skills/`, `/commands/`, `/_workflows/`, `/subagents/`, `/docs/`, `/AGENTS/`, `/.github/`. | When orienting a new contributor or when you need to know which folder serves which purpose at the repo level. |
| [`ecosystem.md`](ecosystem.md) | Comparison of the file-based PM Skills repo and the companion `pm-skills-mcp` MCP server. Decision matrix, feature comparison, integration patterns, version compatibility. | When choosing between cloning the repo or installing the MCP server, or when documenting the two-product story. |
| [`runtime-components.md`](runtime-components.md) | Canonical catalog of Claude Code plugin runtime components: sub-agents (4 rows for v2.16.0 slate), hooks (empty; v2.17+), output styles (empty; v2.18+). Includes audience / trigger / lifetime / tool surface / composition / dispatch skill columns plus a Cross-Client Compatibility section explaining the dispatch-skill mechanism. | When authoring a new sub-agent, hook, or output style, or when answering "which sub-agent runs when?" or "what does the conductor's tool surface look like?" |
| [`sub-agent-compatibility.md`](sub-agent-compatibility.md) | Canonical cross-client compatibility matrix for the 4 v2.16.0 sub-agents + dispatch skills. Status per client (PRODUCTION, DRY-RUN VALIDATED, EXPERIMENTAL, UNTESTED) across Claude Code, Codex CLI, Cursor, Windsurf, Copilot CLI, Gemini CLI. Safe-usage matrix. v2.17 expansion plan. How-to-validate-a-new-client maintainer guide. | When deciding whether to invoke a sub-agent on a non-Claude client, or before promoting a new client status from EXPERIMENTAL to PRODUCTION. |

### Skill family contracts

| File | Purpose | When to read it |
|------|---------|-----------------|
| [`skill-families/index.md`](skill-families/index.md) | Catalog of active skill family contracts with member skills and enforcement summaries. Lists the Meeting Skills Family + Foundation Sprint Skills Family + Design Sprint Skills Family. | When you suspect a group of skills should share a contract, or when looking up which family a skill belongs to. |
| [`skill-families/meeting-skills-contract.md`](skill-families/meeting-skills-contract.md) | Canonical v1.1.0 contract for the 5 `foundation-meeting-*` skills plus `foundation-stakeholder-update`. Shared frontmatter, file naming, behavioral patterns, and enforcement rules. Enforced by `scripts/validate-meeting-skills-family.sh`. | When authoring or modifying any meeting-family skill, or when the validator fails. |
| [`skill-families/foundation-sprint-skills-contract.md`](skill-families/foundation-sprint-skills-contract.md) | Canonical v0.1.0 contract for the 7-member Foundation Sprint Skills Family (shipped in v2.15.0). Naming discipline, two-day sequence, customer-and-problem locking move, 3-thread library sample requirements. Enforced by `scripts/validate-foundation-sprint-skills-family.sh --strict`. | When authoring or modifying any Foundation Sprint skill, or when extending the family. |
| [`skill-families/design-sprint-skills-contract.md`](skill-families/design-sprint-skills-contract.md) | Canonical v0.1.0 contract for the 7-member Design Sprint Skills Family (shipped in v2.15.0). Naming discipline, five-day Knapp sequence, readiness gating, prototype-realistic-but-fake constraint. Enforced by `scripts/validate-design-sprint-skills-family.sh --strict`. | When authoring or modifying any Design Sprint skill, or when extending the family. |

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
3. **Is indexed in this overview.** Add a row to one of the tables above. Astro Starlight autogenerate picks up the file structurally, but human readers find new files faster from this overview.
4. **Does not duplicate existing content.** If similar information already lives in another reference file, expand the existing file instead.

## Last updated

2026-05-17 with v2.16.0 Active Orchestration release: added `runtime-components.md` (sub-agents catalog) + `sub-agent-compatibility.md` (cross-client matrix). Skill-family contracts section extended with Foundation Sprint + Design Sprint family contracts (both shipped in v2.15.0).
