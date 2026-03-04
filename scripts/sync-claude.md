# sync-claude.sh / sync-claude.ps1

## Purpose

Populate `.claude/skills` and `.claude/commands` from the canonical flat source tree (`skills/` and `commands/`). This enables Claude Code and openskills CLI discovery for tools that auto-discover skill content from `.claude/`.

## Usage

```bash
./scripts/sync-claude.sh
```

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\sync-claude.ps1
```

## What It Does

1. **Creates directories** `.claude/skills` and `.claude/commands` if they don't exist.
2. **Validates each skill** — checks that every `skills/*/` directory contains:
   - `SKILL.md`
   - `references/TEMPLATE.md`
   - `references/EXAMPLE.md`
   - Fails immediately if any required file is missing.
3. **Copies skill directories** from `skills/<name>/` to `.claude/skills/<name>/`, replacing any existing content.
4. **Copies command files** from `commands/*.md` to `.claude/commands/`.

## When to Use

- **Use when**: Your tool (Claude Code, openskills CLI) reads from `.claude/` for discovery.
- **Skip when**: Your tool reads `skills/` and `commands/` directly, or you're only editing content.
- **Called automatically** by `build-release` — no need to run separately before a release build.

## Outputs

- `.claude/skills/<name>/` — mirror of each skill directory
- `.claude/commands/<name>.md` — mirror of each command file

Both directories are gitignored; this is a local convenience only.

## Validation

Fails with a non-zero exit code and error message if any skill is missing a required file (`SKILL.md`, `references/TEMPLATE.md`, or `references/EXAMPLE.md`).

## Safety

- Writes only to `.claude/` (gitignored).
- Overwrites existing `.claude/skills/<name>/` content on each run (clean sync).
- Does not modify source files.
