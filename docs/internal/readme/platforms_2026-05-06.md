<!-- DRAFT secondary file: per-platform install guide. Targets eventual public path docs/getting-started/platforms.md.
     Promote to docs/getting-started/platforms.md when a README draft is selected. The README drafts (v3, v4) link to this future public path. Until promoted, the link returns 404; that is intentional during draft review. -->

# Install PM-Skills on Your Platform

PM-Skills works across the AI agent ecosystem. This page covers every supported platform with step-by-step setup instructions. For the README's quick-start summary, see [README.md](../../README.md#install).

## Quick reference

| Platform | Native? | Recommended path |
|---|---|---|
| [Claude Code](#claude-code) | Yes | Plugin marketplace |
| [Claude.ai / Claude Desktop](#claudeai--claude-desktop) | Yes | ZIP upload |
| [Cursor](#cursor) | Yes | Git clone (AGENTS.md auto-discovery) |
| [Windsurf](#windsurf) | Yes | Git clone (AGENTS.md auto-discovery) |
| [GitHub Copilot](#github-copilot) | Yes | Git clone (AGENTS.md auto-discovery) |
| [VS Code (Cline / Continue)](#vs-code-cline--continue) | Yes | Git clone + extension |
| [OpenCode](#opencode) | Yes | Git clone + skill source config |
| [Any MCP client](#any-mcp-client) | Universal | pm-skills-mcp (maintenance mode) |
| [ChatGPT / other LLMs](#chatgpt--other-llms) | Manual | Copy skill content into prompt |

---

## Claude Code

Two install paths, depending on your Claude Code version.

### Modern Claude Code: plugin marketplace (recommended)

```
/plugin marketplace add product-on-purpose/pm-skills
/plugin install pm-skills@pm-skills-marketplace
```

After install, all 40 skills resolve from any directory. Slash commands like `/prd`, `/opportunity-tree`, `/okr-writer`, `/agenda` work immediately. Verify with `/plugin list`.

To track a local working copy instead of the published version (for forkers and contributors):

```
/plugin marketplace add /path/to/your/local/pm-skills
/plugin install pm-skills@pm-skills-marketplace
```

### Cross-agent path: skills CLI

```bash
npx skills add product-on-purpose/pm-skills
```

Installs all 40 skills into Claude Code's default skills directory. No clone, no sync. Works identically across most agents (see [Cursor](#cursor), [Copilot](#github-copilot), [Cline](#vs-code-cline--continue)).

### Older clients: manifest-direct fallback

For Claude clients that do not support the marketplace flow:

1. Clone the repo or extract the release ZIP.
2. During plugin setup, select the manifest at `.claude-plugin/plugin.json`.
3. Complete install in your client; reload if prompted.

```bash
git clone https://github.com/product-on-purpose/pm-skills.git
cd pm-skills
# Then point your client to: .claude-plugin/plugin.json
```

### After install

Test with a real skill:

```
/prd "Search feature for our e-commerce platform"
```

You should see a complete PRD with problem statement, success metrics, user stories, scope, and technical considerations.

---

## Claude.ai / Claude Desktop

Both use ZIP upload to Project Files.

1. Download the latest release ZIP from [Releases](https://github.com/product-on-purpose/pm-skills/releases/latest):
   - File: `pm-skills-v2.13.1.zip`
2. Upload to your Claude environment:
   - **Claude.ai**: Project Settings > Add Files > Upload ZIP
   - **Claude Desktop**: Settings > Capabilities > Upload ZIP
3. Use skills by name in your conversation: "Use the prd skill to create requirements for [your topic]"

The ZIP contains all 40 skills, slash commands, workflows, library samples, and a `QUICKSTART.md` with detailed instructions.

---

## Cursor

Cursor auto-discovers PM-Skills via `AGENTS.md` once the repo is in your workspace.

```bash
# Clone into your project workspace
git clone https://github.com/product-on-purpose/pm-skills.git

# Or add as a git submodule (recommended for team use)
git submodule add https://github.com/product-on-purpose/pm-skills.git
```

Open Cursor with the workspace that includes `pm-skills`. Cursor's AI assistant will discover all 40 skills via `AGENTS.md`. Invoke by name:

> "Use the hypothesis skill to test my assumption about checkout abandonment."
> "Use the opportunity-tree skill for our Q3 retention initiative."

For programmatic access, you can also configure pm-skills-mcp; see [Any MCP client](#any-mcp-client).

---

## Windsurf

Same pattern as Cursor. Windsurf auto-discovers via `AGENTS.md`.

```bash
git clone https://github.com/product-on-purpose/pm-skills.git
```

Open the folder in Windsurf. The AI assistant discovers and can invoke all 40 skills. No sync helper needed; Windsurf reads `AGENTS.md` directly.

---

## GitHub Copilot

Copilot Chat auto-discovers PM-Skills via `AGENTS.md` when the repo is in your workspace.

```bash
# Clone into your project
git clone https://github.com/product-on-purpose/pm-skills.git

# Or add as a submodule
git submodule add https://github.com/product-on-purpose/pm-skills.git
```

### Setup checklist

1. Open a workspace that includes `pm-skills` (repo root or submodule).
2. Use Copilot Chat in agent or workspace context.
3. Invoke skills by name in chat: `Use the hypothesis skill for checkout abandonment.`

Copilot will read the skill, follow the template, and produce structured output.

---

## VS Code (Cline / Continue)

PM-Skills works with the [Cline](https://github.com/cline/cline) and [Continue](https://github.com/continuedev/continue) extensions.

### With Cline or Continue

1. Install the extension in VS Code.
2. Clone PM-Skills into your workspace:

   ```bash
   git clone https://github.com/product-on-purpose/pm-skills.git
   ```

3. The extension will discover skills via `AGENTS.md`.
4. In the extension chat: "Use the hypothesis skill to test my assumption about [your topic]."

### Manual approach (any VS Code AI extension)

1. Open any `SKILL.md` file from `skills/{phase-skill}/` (for example `skills/deliver-prd/SKILL.md`).
2. Copy the content into your AI chat.
3. Ask: "Follow these instructions to create a PRD for [your topic]."

---

## OpenCode

OpenCode loads PM-Skills directly from the repository.

```bash
git clone https://github.com/product-on-purpose/pm-skills.git
cd pm-skills
```

### Setup checklist

1. Configure OpenCode to use this folder as a skills source.
2. If your OpenCode flow expects `.claude/skills/`, run the sync helper once:

   ```bash
   ./scripts/sync-claude.sh    # macOS / Linux
   .\scripts\sync-claude.ps1   # Windows
   ```

3. Invoke skills by name: "Use the prd skill to create requirements for [your topic]."

---

## Any MCP client

For [MCP-compatible clients](https://modelcontextprotocol.io) (Claude Desktop, Cursor with MCP enabled, custom MCP setups), use the [pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp) companion server.

> **MCP server is in [maintenance mode](../guides/mcp-integration.md)** as of 2026-05-04. The catalog is frozen at the v2.9.2 build. New users on most platforms are better served by the file-based paths above. Use MCP only if your tooling specifically requires the protocol.

### Configuration

Add to your MCP client config (typically `claude_desktop_config.json` or your client's equivalent):

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

After restart, all 40 skills become available as programmatic MCP tools, alongside 11 workflow tools and 8 server-utility tools (59 tools total). Some utility skills (for example `update-pm-skills`) are designed for file-system contexts and have reduced applicability via MCP transport.

See the [pm-skills-mcp README](https://github.com/product-on-purpose/pm-skills-mcp#getting-started) for client-specific setup details.

---

## ChatGPT / other LLMs

ChatGPT, OpenAI Codex, and other LLMs without native skill support can still use PM-Skills via copy-paste.

1. Clone or download PM-Skills:

   ```bash
   git clone https://github.com/product-on-purpose/pm-skills.git
   ```

   Or download the latest [release ZIP](https://github.com/product-on-purpose/pm-skills/releases/latest).

2. Open the skill you need. For example, for a PRD: `skills/deliver-prd/SKILL.md`.

3. Copy the full content into your ChatGPT (or other LLM) conversation.

4. Ask: "Follow these instructions to create a PRD for [your topic]."

The skill content is self-instructing: it tells the LLM what to do, what shape to produce, and what quality bar to meet. The model does not need to be skill-aware.

For higher-quality output, also paste the matching `references/EXAMPLE.md` so the LLM has a worked example to mirror.

---

## Troubleshooting

### Slash commands don't appear after install

- **Claude Code**: run `/plugin list` to confirm pm-skills is installed. If not, re-run the install command. If yes, run `/reload-plugins` or restart the session.
- **skills CLI install**: confirm skills landed in your agent's default skills directory; the CLI prints the path on completion.
- **Git clone install**: ensure your agent reads `AGENTS.md` (Cursor, Copilot, Windsurf do automatically when the repo is in workspace).

### "Plugin install path failed" errors

If you see schema errors during `/plugin marketplace add`, you are likely on a pre-v2.13.1 cached version. Pull the latest:

```bash
git -C /path/to/pm-skills pull
/plugin marketplace remove pm-skills-marketplace
/plugin marketplace add product-on-purpose/pm-skills
/plugin install pm-skills@pm-skills-marketplace
```

### Skill output quality is low

The skill is reading the right `SKILL.md`, but the example may not be loading. Confirm `references/EXAMPLE.md` exists at `skills/{phase-skill}/references/EXAMPLE.md`. If your install path skipped the references folder, re-install or clone the repo for full coverage.

### MCP server connection issues

See [pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp) for client-specific troubleshooting. The MCP server is in maintenance mode; if you need a feature that ships in newer file-based versions but not in v2.9.2, use one of the file-based install paths above.

---

## Need help?

- **Discussions**: [github.com/product-on-purpose/pm-skills/discussions](https://github.com/product-on-purpose/pm-skills/discussions) for setup questions and platform-specific tips.
- **Issues**: [github.com/product-on-purpose/pm-skills/issues](https://github.com/product-on-purpose/pm-skills/issues) for bugs, including platform-specific install bugs.
- **Full contributor guide**: [CONTRIBUTING.md](../../CONTRIBUTING.md).
