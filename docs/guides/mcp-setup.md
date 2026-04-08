---
title: MCP Server Setup
description: Install, configure, and use PM Skills via the Model Context Protocol — instant access from Claude Desktop, Cursor, VS Code, and any MCP client.
tags:
  - Guides
  - MCP
---

# MCP Server Setup

The [pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp) server gives you instant access to all 30 PM skills via the Model Context Protocol. No file management, no cloning — just configure your AI client and start using skills.

## What You Get

| Feature | Detail |
|---------|--------|
| **30 skill tools** | Every PM skill as a callable MCP tool |
| **5 workflow tools** | Multi-skill workflows (Feature Kickoff, Lean Startup, etc.) |
| **8 utility tools** | Search, list, validate, and cache management |
| **87 resources** | Skill templates and examples accessible via URI |
| **3 prompts** | Pre-configured skill invocations |
| **Zero files to manage** | Skills are embedded in the npm package |

## Prerequisites

- **Node.js 18+** — check with `node --version`
- An MCP-compatible AI client (Claude Desktop, Cursor, Claude Code, VS Code with Cline/Continue)

## Quick Setup by Platform

### Claude Desktop

The recommended MCP experience. Add to your config file:

=== "macOS"
    Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:
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

=== "Windows"
    Edit `%APPDATA%\Claude\claude_desktop_config.json`:
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

=== "Linux"
    Edit `~/.config/Claude/claude_desktop_config.json`:
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

**Restart Claude Desktop** after saving. Verify by asking: *"What PM skills are available?"*

### Cursor

1. Open **Settings** (Cmd/Ctrl + ,) → **Features** → **MCP Servers**
2. Add server: name `pm-skills`, command `npx`, args `pm-skills-mcp`

Or edit `~/.cursor/mcp.json`:

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

### Claude Code (CLI)

Add to `.claude/settings.json` (project) or `~/.claude/settings.json` (global):

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

!!! note
    Claude Code also supports file-based pm-skills via slash commands. You can use both MCP and slash commands simultaneously.

### VS Code (Cline / Continue)

=== "Cline"
    Install [Cline](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev), then add to its MCP settings:
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

=== "Continue"
    Install [Continue](https://marketplace.visualstudio.com/items?itemName=Continue.continue), then edit `~/.continue/config.json`:
    ```json
    {
      "mcpServers": [
        {
          "name": "pm-skills",
          "command": "npx",
          "args": ["pm-skills-mcp"]
        }
      ]
    }
    ```

### Any MCP Client

The general pattern works with any MCP-compatible tool:

```
Command: npx
Arguments: pm-skills-mcp
```

Or install globally: `npm install -g pm-skills-mcp`, then use `pm-skills-mcp` as the command.

## Using MCP Tools

Once connected, your AI assistant can invoke any PM skill as a tool. You don't need to know the tool names — just describe what you need.

### Natural language

```
"Create a PRD for our new search feature"
→ AI invokes pm_prd with topic="search feature"

"Design an A/B test for the new checkout flow"
→ AI invokes pm_experiment_design with topic="new checkout flow"

"What PM skills are available?"
→ AI invokes pm_list_skills
```

### Tool parameters

Every skill tool accepts:

| Parameter | Required | Description |
|-----------|----------|-------------|
| `topic` | Yes | The subject or feature |
| `context` | No | Additional requirements, constraints, background |
| `format` | No | `full` (default), `concise`, or `template-only` |
| `includeExample` | No | `true` to include a worked example |

### Skill-to-tool naming

MCP tool names are derived from skill directory names by stripping the phase/classification prefix and prepending `pm_`:

| Slash command | MCP tool | How it maps |
|--------------|----------|-------------|
| `/prd` | `pm_prd` | `deliver-prd` → strip `deliver-` → `prd` → `pm_prd` |
| `/hypothesis` | `pm_hypothesis` | `define-hypothesis` → strip `define-` → `pm_hypothesis` |
| `/persona` | `pm_persona` | `foundation-persona` → strip `foundation-` → `pm_persona` |
| `/pm-skill-validate` | `pm_pm_skill_validate` | `utility-pm-skill-validate` → strip `utility-` → `pm_pm_skill_validate` |

The double `pm_` for utility tools is intentional — it preserves the skill name and stays consistent.

## Customization

### Use your own skills

Point the server at a custom skills directory:

```json
{
  "mcpServers": {
    "pm-skills": {
      "command": "npx",
      "args": ["pm-skills-mcp"],
      "env": {
        "PM_SKILLS_PATH": "/path/to/your/pm-skills/skills"
      }
    }
  }
}
```

!!! warning
    Use the **absolute path** to the `skills/` directory, not the repo root.

### Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PM_SKILLS_PATH` | (embedded) | Path to custom skills directory |
| `PM_SKILLS_FORMAT` | `full` | Default output format |
| `PM_SKILLS_EXAMPLES` | `false` | Include examples by default |

## MCP vs File-Based: When to Use Which

| Scenario | Use MCP | Use file-based pm-skills |
|----------|---------|--------------------------|
| Claude Desktop | Yes | N/A (no file access) |
| Cursor with MCP | Yes | Also works (AGENTS.md) |
| Claude Code | Either | Slash commands are convenient |
| Want zero setup | Yes | Requires clone/download |
| Want to customize skills | No — fork pm-skills | Yes |
| Building automated workflows | Yes | Possible but harder |
| GitHub Copilot | No MCP support | AGENTS.md discovery |
| Windsurf | No MCP support | AGENTS.md discovery |

See the [Ecosystem Overview](../reference/ecosystem.md) for a detailed comparison.

## Troubleshooting

| Problem | Likely cause | Fix |
|---------|-------------|-----|
| Tools not appearing | Server didn't start | Check `node --version` (need 18+), try `npx pm-skills-mcp` manually |
| "pm_prd not found" | Old MCP version | Update: `npm update -g pm-skills-mcp` (need v2.8.0+) |
| Slow first response | Cache cold start | Normal — subsequent calls are fast |
| Custom skills not loading | Wrong path | Use absolute path to `skills/` directory, not repo root |
| Connection refused | Port conflict | Try `npx` instead of global install |

## Links

- [pm-skills-mcp on GitHub](https://github.com/product-on-purpose/pm-skills-mcp)
- [pm-skills-mcp on npm](https://www.npmjs.com/package/pm-skills-mcp)
- [MCP Integration Guide](mcp-integration.md) (maintainer workflow + full tool inventory)
- [Model Context Protocol](https://modelcontextprotocol.io)
