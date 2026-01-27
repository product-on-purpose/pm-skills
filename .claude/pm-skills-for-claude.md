# pm-skills for Claude Code

This directory is populated by the sync helper to enable Claude Code skill discovery.

## Setup

From the repo root:

- Bash (macOS/Linux): `./scripts/sync-claude.sh`
- PowerShell (Windows): `./scripts/sync-claude.ps1`

## Structure after sync
- `.claude/skills/` — all PM skills (flat)
- `.claude/commands/` — all slash commands

Re-run the sync helper after pulling updates. The `.claude/` directory is gitignored; each user must populate it locally. Use `skills/` and `commands/` directly for non-Claude clients.
