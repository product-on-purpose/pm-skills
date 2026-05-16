# pm-skills for Claude Code

pm-skills supports two parallel install paths for Claude Code, plus a third path for tools outside the Claude Code ecosystem. All three are working as of v2.15.0; pick whichever fits your client and workflow.

## Install paths

### 1) Plugin marketplace (modern Claude Code)

Run inside Claude Code:

```
/plugin marketplace add product-on-purpose/pm-skills
/plugin install pm-skills@pm-skills-marketplace
```

Reads `.claude-plugin/marketplace.json` and `.claude-plugin/plugin.json` from this repo. Skills + commands flow into `~/.claude/plugins/repos/pm-skills/` and resolve from any directory. Auto-update on `git pull` (directory-source) or on release tag (GitHub-source).

For a local working tree (forkers, contributors):

```
/plugin marketplace add /path/to/your/local/pm-skills
/plugin install pm-skills@pm-skills-marketplace
```

### 2) Sync helper (older Claude Code, openskills CLI, non-plugin clients)

```bash
./scripts/sync-claude.sh    # macOS/Linux
```

```powershell
.\scripts\sync-claude.ps1   # Windows
```

The sync helper copies canonical source from `skills/{phase-skill}/` and `commands/` into `.claude/skills/` and `.claude/commands/` and validates SKILL + TEMPLATE + EXAMPLE for each skill before copying. Use this path when:

- Your tool auto-discovers only `.claude/skills/` and `.claude/commands/` (openskills CLI, certain Claude Code setups).
- You are on an older Claude Code version that does not yet support the plugin marketplace flow.
- You prefer file-based install over the plugin system.

The sync helper does not auto-update; re-run after pulling updates. `.claude/skills/` and `.claude/commands/` are gitignored; the populated content never ships in releases. This file (`pm-skills-for-claude.md`) is the only `.claude/` content tracked in releases.

### 3) `npx skills add` (any agent supported by the open skills ecosystem)

```bash
npx skills add product-on-purpose/pm-skills
```

Works with Claude Code, Cursor, GitHub Copilot, Cline, and any agent supported by the [`skills` CLI](https://github.com/vercel-labs/skills). Skills land in your agent's default skills directory.

## Which path is right for you?

| Your tool | Recommended path |
|---|---|
| Modern Claude Code (plugin support) | (1) Plugin marketplace |
| Older Claude Code or openskills CLI | (2) Sync helper |
| Cursor / Copilot / Cline / multi-agent | (3) `npx skills add` |
| MCP client | See [pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp) (separate repo, maintenance mode) |

This document does not pick a primary recommended path between (1) and (2); both are working and supported. The decision on whether to elevate one over the other is queued for a future release.

## Releases include only this file

Populated content under `.claude/skills/` and `.claude/commands/` is gitignored and never ships. The release ZIP contains the canonical source under `skills/`, `commands/`, `_workflows/`, the `.claude-plugin/` directory (plugin and marketplace manifests), and this README. Recipients can install via any of the three paths above after extracting.
