# Scripts Guide

## Table of Contents
- [Overview](#overview)
- [Script Catalog](#script-catalog)
  - [sync-claude.sh / sync-claude.ps1](#sync-claudesh--sync-claudeps1)
  - [build-release.sh / build-release.ps1](#build-releasesh--build-releaseps1)
  - [validate-commands.sh / validate-commands.ps1](#validate-commandssh--validate-commandps1)
- [When to use what](#when-to-use-what)
- [FAQ](#faq)
- [Tips](#tips)
- [Troubleshooting](#troubleshooting)

---

## Overview
The `scripts/` folder contains small utilities to keep the repo consistent, reproducible, and discoverable across AI tools. They are safe to run locally; only `build-release` writes to `dist/`.

CI-only automation scripts live in `.github/scripts/` (for example, `validate-mcp-sync.js`).

## Script Catalog

### sync-claude.sh / sync-claude.ps1
**Purpose:** Populate `.claude/skills` and `.claude/commands` from the canonical flat `skills/` and `commands/`, with validation.

**Why:** Some tools (openskills CLI, certain Claude Code setups) auto-discover only in `.claude/`. Releases do **not** ship populated `.claude/`; this is a local convenience.

**Use when:** You need Claude Code / openskills discovery. Skip if your tool reads `skills/` directly.

**Commands:**
- Bash: `./scripts/sync-claude.sh`
- PowerShell: `./scripts/sync-claude.ps1`

**Validation:** Fails if any skill is missing `SKILL.md`, `references/TEMPLATE.md`, or `references/EXAMPLE.md`.

### build-release.sh / build-release.ps1
**Purpose:** Create `dist/pm-skills-vX.Y.Z.zip` with manifest + SHA256.

**Why:** Reproducible packaging for releases; ensures populated `.claude/` is excluded.

**Use when:** Cutting a release tag or testing the release bundle.

**Commands:**
- Bash: `./scripts/build-release.sh`
- PowerShell: `./scripts/build-release.ps1`

**Outputs:** `dist/pm-skills-vX.Y.Z.zip`, `.zip.sha256`, `manifest.txt`.

### validate-commands.sh / validate-commands.ps1
**Purpose:** Ensure each command points to an existing `skills/{phase-skill}/SKILL.md` and has `references/TEMPLATE.md` and `EXAMPLE.md`.

**Why:** Guardrail after edits/renames; lightweight lint before tagging.

**Use when:** After editing commands or skills; before release; in CI.

**Commands:**
- Bash: `./scripts/validate-commands.sh`
- PowerShell: `./scripts/validate-commands.ps1`

**Outputs:** Console pass/fail per command; exit non-zero on failure.

## When to use what
- Day-to-day: no scripts needed unless using openskills/Claude Code → run `sync-claude`.
- Pre-release: `sync-claude` (sanity) → `validate-commands` → `build-release`.
- CI candidate: add `validate-commands` to a lint job.
- Cross-repo drift guardrail: use `.github/workflows/validate-mcp-sync.yml` (observe first, block later).

## FAQ
**Q: Do I need `.claude/` populated?**  
A: Only if your tool requires it. Otherwise ignore; it stays gitignored.

**Q: Will build-release ship my local `.claude/`?**  
A: No. It copies only `.claude/pm-skills-for-claude.md` and explicitly removes `.claude/skills` + `.claude/commands` from the staging tree.

**Q: Can I delete `dist/`?**  
A: Yes. It’s build output and gitignored; delete anytime.

## Tips
- Keep `.claude/` untracked. Regenerate via `sync-claude` when needed.
- Run `validate-commands` after command or skill renames.
- Use `build-release` from a clean tree to avoid pulling in stray files.

## Troubleshooting
- `sync-claude` fails missing refs → ensure each skill has `SKILL.md`, `references/TEMPLATE.md`, `references/EXAMPLE.md`.
- Hash mismatch after build → delete `dist/` and rebuild.
- Command not found in tool → ensure command file points to correct flat path; rerun `validate-commands`.
