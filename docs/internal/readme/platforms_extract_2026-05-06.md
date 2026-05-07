<!-- DRAFT: Per-platform install instructions extracted from README. Intended to live at one of:
       - docs/getting-started/platforms.md (recommended; aligns with existing getting-started/ folder)
       - INSTALL.md at repo root
     The README versions v3/v4 link here for "all other platforms" detail.
     This is the canonical "every platform we support, with full setup instructions" page. -->

# PM-Skills: Platform-by-Platform Install

PM-Skills follows the [Agent Skills Specification](https://agentskills.io/specification) and works across the AI ecosystem. This page has the full setup walkthrough for every supported platform. The README covers the most common paths inline; everything else is here.

For a one-glance summary of what works where, see the [Platform Compatibility Matrix](#platform-compatibility-matrix) at the bottom.

---

## Claude Code (recommended)

Two install paths, in order of recommendation.

### Plugin marketplace (modern)

```
/plugin marketplace add product-on-purpose/pm-skills
/plugin install pm-skills@pm-skills-marketplace
```

After install, all 40 skills and 47 commands resolve from any directory. Slash commands like `/prd`, `/opportunity-tree`, `/agenda`, `/okr-writer` work out of the box. Verify with `/plugin list`.

For a local working tree (forkers, contributors who want to track their own changes):

```
/plugin marketplace add /path/to/your/local/pm-skills
/plugin install pm-skills@pm-skills-marketplace
```

### `skills` CLI (one-shot install)

```bash
npx skills add product-on-purpose/pm-skills
```

Installs all 40 skills into your agent's default skills directory. Slash commands become available immediately. No clone, no sync helper.

### Manifest-direct (older clients)

For Claude clients that do not yet support the marketplace flow:

1. Clone the repo or extract the release ZIP.
2. During plugin setup, select the manifest at `.claude-plugin/plugin.json`.
3. Complete install in your client and reload if prompted.

### Full repo clone (gives you everything)

```bash
git clone https://github.com/product-on-purpose/pm-skills.git
cd pm-skills
```

Gives you the full sample library, internal docs, workflows, and CI scripts alongside the skills. Useful for forkers and contributors.

If your local Claude Code variant expects `.claude/skills/`, run the sync helper after clone:

```bash
./scripts/sync-claude.sh   # macOS/Linux
./scripts/sync-claude.ps1  # Windows
```

The `.claude/` directory is gitignored; regenerate anytime.

---

## Cursor

Cursor auto-discovers skills via `AGENTS.md`:

```bash
git clone https://github.com/product-on-purpose/pm-skills.git
```

Open the folder in Cursor. The AI assistant will automatically discover and use all 40 skills. Invoke by skill name in chat: `Use the prd skill to create requirements for user authentication`.

For programmatic access via MCP, see [pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp) (maintenance mode).

---

## GitHub Copilot

Copilot auto-discovers skills via `AGENTS.md`:

```bash
# Clone into your project
git clone https://github.com/product-on-purpose/pm-skills.git

# Or add as a submodule
git submodule add https://github.com/product-on-purpose/pm-skills.git
```

Setup checklist:

1. Open a workspace that includes `pm-skills` (repo root or submodule).
2. Use Copilot Chat in agent or workspace context.
3. Invoke skills by name. Example: `Use the hypothesis skill for checkout abandonment`.

---

## Windsurf

Same flow as Cursor: AGENTS.md auto-discovery.

```bash
git clone https://github.com/product-on-purpose/pm-skills.git
```

Open the folder. Skills are immediately discoverable. Invoke by name in chat. The sync helper is not needed; Windsurf reads `skills/` directly.

---

## Claude.ai

1. Download `pm-skills-vX.X.X.zip` from [Releases](https://github.com/product-on-purpose/pm-skills/releases).
2. Open your Project in Claude.ai.
3. Project Settings to Add Files to Upload ZIP.
4. Use skills by name: `Use the prd skill to create requirements for...`.

See `QUICKSTART.md` inside the ZIP for detailed instructions.

---

## Claude Desktop

Two paths.

### ZIP upload (simplest)

1. Download `pm-skills-vX.X.X.zip` from [Releases](https://github.com/product-on-purpose/pm-skills/releases).
2. Settings to Capabilities to Upload ZIP.
3. Use skills by name in chat.

### MCP (programmatic)

For protocol-level access via [pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp):

```json
{
  "mcpServers": {
    "pm-skills": {
      "command": "npx",
      "args": ["pm-skills-mcp"]
    }
  }
}
```

All 40 skills become available as MCP tools, plus 11 workflow tools and 8 utility tools (59 total). Note that pm-skills-mcp is in maintenance mode; the catalog is frozen at v2.9.2.

---

## VS Code (Cline / Continue)

### With Cline or Continue extensions

1. Clone pm-skills into your workspace.
2. The extension discovers skills via `AGENTS.md`.
3. Ask in chat: `Use the hypothesis skill to test my assumption about...`.

### Manual approach (any AI extension)

1. Open the skill you need (for example `skills/deliver-prd/SKILL.md`).
2. Copy the content into your AI chat.
3. Ask the AI to follow the skill instructions.

---

## OpenCode

OpenCode loads PM-Skills directly from the repository:

```bash
git clone https://github.com/product-on-purpose/pm-skills.git
cd pm-skills
```

Setup checklist:

1. Configure OpenCode to use this folder as a skills source.
2. If your OpenCode flow expects `.claude/skills/`, run `./scripts/sync-claude.sh` (or `.ps1`) once after clone.
3. Invoke by skill name. Example: `Use the prd skill for ...`.

---

## Any MCP Client (universal)

For any MCP-compatible client, use [pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp):

```bash
npx pm-skills-mcp
```

Or in client config:

```json
{
  "mcpServers": {
    "pm-skills": {
      "command": "npx",
      "args": ["pm-skills-mcp"]
    }
  }
}
```

Maintenance mode caveat: the MCP server is in maintenance mode (v2.9.x line; 40-skill catalog frozen at v2.9.2). New skills shipped to this repo after v2.9.2 are not embedded in the MCP server. For the latest catalog, use the file-based install paths above.

---

## ChatGPT and other LLMs without native skill support

Skills work manually with any LLM:

1. Clone or download pm-skills.
2. Open the skill you need (for example `skills/deliver-prd/SKILL.md`).
3. Copy the full content into your conversation.
4. Ask: `Follow these instructions to create a PRD for [your topic]`.

The skill content provides all the context the LLM needs to produce professional output. No platform-specific support is required.

---

## Platform compatibility matrix

| Platform | Status | Method | Notes |
|---|---|---|---|
| **Claude Code** | Native | Plugin marketplace; `skills` CLI; sync helper | Best experience with `/prd`, etc. Marketplace is the modern path. |
| **Claude.ai** | Native | ZIP upload | Upload to Projects. |
| **Claude Desktop** | Native | ZIP upload or [MCP](https://github.com/product-on-purpose/pm-skills-mcp) | MCP available; server in maintenance mode. |
| **GitHub Copilot** | Native | AGENTS.md discovery | Auto-discovers in repo. |
| **Cursor** | Native | AGENTS.md or [MCP](https://github.com/product-on-purpose/pm-skills-mcp) | MCP available; maintenance mode. |
| **Windsurf** | Native | AGENTS.md discovery | Auto-discovers; sync helper not needed. |
| **VS Code** | Native | Via extensions | Cline, Continue, or manual. |
| **OpenCode** | Native | Skill format | Direct skill loading. |
| **Any MCP Client** | Universal | [pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp) | Protocol-level access; maintenance mode. |
| **ChatGPT / Codex** | Manual | Copy skill content | No native support. |
| **Other AI Tools** | Manual | Copy skill content | Works with any LLM. |

---

## Troubleshooting

### Plugin install fails with "Marketplace file not found"

Your repo or local clone is older than v2.13.1, when `marketplace.json` moved to `.claude-plugin/marketplace.json`. Update with `git pull`, or use the v2.13.1+ release ZIP.

### Plugin install fails with "schema: owner: expected object"

Same root cause as above. The `owner` schema field was added in v2.13.1. Update to v2.13.1 or later.

### Slash commands not appearing in Claude Code

After install, run `/plugin list` to confirm `pm-skills` is registered. If it is, try `/reload-plugins` or restart Claude Code. If the plugin is not listed, re-run `/plugin install pm-skills@pm-skills-marketplace`.

### Skills not auto-discovered in Cursor / Copilot / Windsurf

These IDEs read `AGENTS.md` from your workspace root. Confirm the cloned `pm-skills` directory is inside the workspace, and that the IDE has read access to `AGENTS.md`. For submodules, ensure the submodule is initialized (`git submodule update --init`).

### MCP server connection failed

Confirm `npx pm-skills-mcp` runs cleanly from the command line first. If it does, check your client config (path, args, permissions). See the [pm-skills-mcp README](https://github.com/product-on-purpose/pm-skills-mcp) for client-specific setup.

---

For everything else, [open an issue](https://github.com/product-on-purpose/pm-skills/issues/new?labels=bug) or [start a discussion](https://github.com/product-on-purpose/pm-skills/discussions).
