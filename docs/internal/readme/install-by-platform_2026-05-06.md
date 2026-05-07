<!-- DRAFT platform reference. Companion to README drafts at docs/internal/readme/readme_2026-05-06_v3.md and _v4.md.
     Eventual public location at promotion time: docs/getting-started/install-by-platform.md (or similar). The README drafts link here via relative path during review. -->

# Install PM-Skills on your platform

PM-Skills works across the AI agent ecosystem. Pick the section that matches your tool.

If you're new and unsure, start with **[Claude Code](#claude-code)** for the slash-command experience, or **[`skills` CLI](#skills-cli-most-agents)** if you want a single command that covers most agents.

---

## Claude Code

The fastest path. Claude Code's plugin marketplace handles install and updates automatically.

```
/plugin marketplace add product-on-purpose/pm-skills
/plugin install pm-skills@pm-skills-marketplace
```

After install, all 40 skills + 47 commands resolve from any directory. Run `/plugin list` to confirm. Slash commands like `/prd`, `/opportunity-tree`, `/agenda`, `/okr-writer` work immediately.

**Tracking your local working tree** (forkers and contributors):

```
/plugin marketplace add /path/to/your/local/pm-skills
/plugin install pm-skills@pm-skills-marketplace
```

This points at your repo on disk, so changes to skill files reflect on next session reload without re-publishing.

**Manifest-direct fallback** (older Claude clients without marketplace support):

1. Clone the repo or extract the release ZIP.
2. During plugin setup, point your client at `.claude-plugin/plugin.json`.
3. Reload if prompted.

---

## `skills` CLI (most agents)

Universal install command. Works with Claude Code, Cursor, GitHub Copilot, Cline, and any agent supported by the open [`skills` CLI](https://github.com/vercel-labs/skills).

```bash
npx skills add product-on-purpose/pm-skills
```

Skills land in your agent's default skills directory. No clone, no extra setup.

---

## Cursor / Windsurf

Both IDEs auto-discover skills via `AGENTS.md`. Clone PM-Skills into your workspace and the assistant sees the skills automatically.

```bash
git clone https://github.com/product-on-purpose/pm-skills.git
```

Open the cloned directory (or any workspace that includes it). Cursor and Windsurf will discover the 40 skills via the `AGENTS.md` discovery file. Invoke by name: "Use the prd skill to draft requirements for our new search feature."

For a submodule install:

```bash
git submodule add https://github.com/product-on-purpose/pm-skills.git
```

---

## Claude.ai / Claude Desktop

ZIP upload path:

1. Download `pm-skills-vX.X.X.zip` from [GitHub Releases](https://github.com/product-on-purpose/pm-skills/releases/latest).
2. Upload to your Project:
   - **Claude.ai**: Project Settings > Add Files > Upload ZIP
   - **Claude Desktop**: Settings > Capabilities > Upload ZIP
3. Use skills by name in conversation: "Use the prd skill to create requirements for..."

The ZIP contains all 40 skills, 9 workflows, the full sample library, and a `QUICKSTART.md` for in-context reference.

---

## GitHub Copilot

Copilot auto-discovers skills via `AGENTS.md`:

```bash
# Clone into your project
git clone https://github.com/product-on-purpose/pm-skills.git

# Or add as submodule
git submodule add https://github.com/product-on-purpose/pm-skills.git
```

Setup checklist:

1. Open a workspace that includes pm-skills (repo root or submodule).
2. Use Copilot Chat in agent or workspace context.
3. Invoke skills by name: "Use the hypothesis skill for checkout abandonment."

---

## VS Code (Cline / Continue)

**With Cline or Continue extensions:**

1. Clone PM-Skills into your workspace.
2. The extension discovers skills via `AGENTS.md`.
3. Invoke: "Use the hypothesis skill to test my assumption about onboarding."

**Manual approach** (any extension or context-window paste):

1. Open any `SKILL.md` from `skills/{phase-skill}/` (e.g., `skills/deliver-prd/SKILL.md`).
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
2. If your OpenCode flow expects `.claude/skills/`, run `./scripts/sync-claude.sh` (or `.ps1`) once after clone to populate the cache.
3. Invoke by skill name: "Use the prd skill for ..."

---

## MCP clients (Claude Desktop, Cursor, Cline, etc. via MCP)

For [MCP-compatible clients](https://modelcontextprotocol.io), use the companion server [pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp):

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

All 40 skills (26 phase + 8 foundation + 6 utility) become available as programmatic tools, alongside 11 workflow tools and 8 server-utility tools (59 tools total).

> **Note**: pm-skills-mcp is in maintenance mode (effective 2026-05-04). The catalog is frozen at the v2.9.2 build. Security patches and critical bug fixes continue, but new skills are not embedded. New users are best served by the file-based install paths above; MCP remains available for tooling that specifically requires the protocol.

See the [pm-skills-mcp README](https://github.com/product-on-purpose/pm-skills-mcp#getting-started) for client-specific setup.

---

## ChatGPT / other LLMs

ChatGPT and other LLMs without native skill support can still use PM-Skills via copy-paste:

1. Clone or download PM-Skills.
2. Open the skill you need (e.g., `skills/deliver-prd/SKILL.md`).
3. Copy the full content into your ChatGPT conversation.
4. Ask: "Follow these instructions to create a PRD for [your topic]."

The skill content provides all the context the LLM needs. The downside: no slash commands, no auto-discovery, you carry the skill content in the conversation context. The upside: works with any LLM that accepts long-form instructions.

---

## Sync helper (legacy / openskills CLI / older Claude Code)

For tools that auto-discover only `.claude/skills/` and `.claude/commands/`, run the sync helper after clone:

```bash
# Bash (macOS / Linux)
./scripts/sync-claude.sh

# PowerShell (Windows)
./scripts/sync-claude.ps1
```

This copies the canonical source from `skills/{phase-skill}/` and `commands/` into `.claude/skills/` and `.claude/commands/` and validates SKILL + TEMPLATE + EXAMPLE for each skill before copying. The `.claude/` directory is gitignored; re-run after `git pull` to refresh.

---

## Verifying the install

After install, check that a slash command resolves:

```
/prd "A test prompt to verify install"
```

If the command returns a structured PRD, you're set. If the command isn't recognized:

- Plugin install: run `/plugin list` to confirm `pm-skills` is listed. Restart Claude Code if it shows but doesn't resolve.
- `skills` CLI install: check your agent's default skills directory; the catalog should be present.
- AGENTS.md discovery: confirm your IDE is actually reading `AGENTS.md` (Cursor and Windsurf show this in their AI panel).
- Sync helper install: confirm `.claude/skills/` and `.claude/commands/` are populated.

For deeper troubleshooting see [docs/getting-started/index.md](../getting-started/index.md).
