# pm-skills for Claude Code

This directory is populated by the sync helper to enable Claude Code skill discovery. It is **not** shipped in releases.

## Why the sync helper exists
- Canonical source is flat: `skills/{phase-skill}/` and `commands/`.
- Some tools (openskills CLI, certain Claude Code setups) auto-discover only `.claude/skills` and `.claude/commands`.
- The sync helper copies the canonical source into `.claude/` and validates SKILL + TEMPLATE + EXAMPLE for each skill before copying.
- Releases include only this file; populated `.claude/` content is never shipped.

## When to run it
- After cloning or unzipping if your tool expects `.claude/skills`/`commands`.
- Skip it if your tool reads `skills/` directly; keep `.claude/` untracked.

## Commands
- Bash (macOS/Linux): `./scripts/sync-claude.sh`
- PowerShell (Windows): `./scripts/sync-claude.ps1`

## Structure after sync
- `.claude/skills/` — all PM skills (flat)
- `.claude/commands/` — all slash commands

Re-run the sync helper after pulling updates. The `.claude/` directory is gitignored; you can delete and regenerate it anytime.
