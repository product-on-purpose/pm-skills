# MCP Integration Guide

This guide helps you access PM-Skills through the Model Context Protocol (MCP) via [pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp).

---

## Table of Contents

- [Overview](#overview)
- [When to Use MCP](#when-to-use-mcp)
- [Quick Start](#quick-start)
  - [Claude Desktop](#claude-desktop)
  - [Claude Code (CLI)](#claude-code-cli)
  - [Cursor](#cursor)
  - [VS Code (Cline/Continue)](#vs-code-clinecontinue)
  - [Other MCP Clients](#other-mcp-clients)
- [Tool Inventory](#tool-inventory)
  - [Skill Tools (24)](#skill-tools-24)
  - [Workflow Tools (5)](#workflow-tools-5)
  - [Utility Tools (6)](#utility-tools-6)
- [Slash Command to MCP Tool Mapping](#slash-command-to-mcp-tool-mapping)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Resources](#resources)

---

## Overview

**PM-Skills MCP** is an MCP server that exposes the 24 PM-Skills as programmatic tools. Instead of uploading files or using slash commands, your AI assistant invokes tools directly via the Model Context Protocol.

```
┌─────────────────┐                    ┌─────────────────┐
│   Your AI       │   MCP Protocol     │  pm-skills-mcp  │
│   Assistant     │ ◄───────────────► │     Server      │
│                 │                    │                 │
│ "Create a PRD   │   tools/call       │  ┌───────────┐  │
│  for search"    │ ─────────────────► │  │ pm_prd    │  │
│                 │                    │  │ pm_hypo   │  │
│                 │   skill content    │  │ pm_...    │  │
│  [PRD output]   │ ◄───────────────── │  └───────────┘  │
└─────────────────┘                    └─────────────────┘
```

**Key Benefits:**
- **Zero file management** — No cloning, no uploads
- **Universal** — Works with any MCP-compatible client
- **Parameterized** — Tools accept topic, context, format options
- **Discoverable** — Built-in search and listing tools

---

## When to Use MCP

Choose MCP over file-based pm-skills when:

| Use Case | MCP Recommended? |
|----------|------------------|
| Using Claude Desktop | ✅ Yes |
| Using Cursor with MCP support | ✅ Yes |
| Want zero configuration | ✅ Yes |
| Need programmatic tool access | ✅ Yes |
| Building automated PM workflows | ✅ Yes |
| Using Claude Code with slash commands | ❌ Use pm-skills directly |
| Heavily customizing skills | ❌ Fork pm-skills |
| Uploading to Claude.ai Projects | ❌ Use pm-skills ZIP |

**Not sure?** See [docs/reference/ecosystem.md](../reference/ecosystem.md) for a detailed comparison.

---

## Quick Start

### Claude Desktop

Claude Desktop provides the best MCP experience. Configuration file locations:

| Platform | Path |
|----------|------|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json` |

**Add to configuration:**

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

**Restart Claude Desktop** to load the server.

**Verify:** Ask Claude "What PM skills are available?" — it should list all 24 skills.

---

### Claude Code (CLI)

Add to project settings (`.claude/settings.json`) or global settings (`~/.claude/settings.json`):

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

**Note:** Claude Code also supports slash commands from the file-based pm-skills. You can use both approaches simultaneously.

---

### Cursor

1. Open **Settings** (Cmd/Ctrl + ,)
2. Navigate to **Features** → **MCP Servers**
3. Add new server:
   - **Name:** `pm-skills`
   - **Command:** `npx`
   - **Arguments:** `pm-skills-mcp`

Or edit `~/.cursor/mcp.json` directly:

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

---

### VS Code (Cline/Continue)

**Cline Extension:**

1. Install [Cline](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev) from VS Code marketplace
2. Open Cline settings
3. Add MCP server configuration:

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

**Continue Extension:**

1. Install [Continue](https://marketplace.visualstudio.com/items?itemName=Continue.continue) from VS Code marketplace
2. Edit `~/.continue/config.json`
3. Add under `mcpServers`:

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

---

### Other MCP Clients

PM-Skills MCP works with any MCP-compatible client. The general pattern:

1. **Install globally** (optional): `npm install -g pm-skills-mcp`
2. **Configure client** to start the server:
   - Command: `npx` (or `pm-skills-mcp` if installed globally)
   - Args: `["pm-skills-mcp"]` (empty if using global install)
3. **Restart client** to connect

Consult your MCP client's documentation for specific configuration syntax.

---

## Tool Inventory

PM-Skills MCP v2.1+ provides **36 tools** organized into three categories (24 skills + 5 workflows + 7 utilities).

> **Note:** pm-skills-mcp v2.1.0 is aligned with the pm-skills v2.x flat structure. Resource URIs are now flat (`pm-skills://skills/{skill}`) with phase available in metadata.

### Skill Tools (24)

Each skill becomes an MCP tool with standardized parameters:

| Parameter | Required | Description |
|-----------|----------|-------------|
| `topic` | **Yes** | The subject or feature for this artifact |
| `context` | No | Additional requirements, constraints, or background |
| `format` | No | Output verbosity: `full`, `concise`, or `template-only` |
| `includeExample` | No | Set to `true` to include a worked example |

#### Discover Phase

| Tool | Description |
|------|-------------|
| `pm_interview_synthesis` | Turn user research into actionable insights |
| `pm_competitive_analysis` | Map the landscape, find opportunities |
| `pm_stakeholder_summary` | Understand who matters and what they need |

#### Define Phase

| Tool | Description |
|------|-------------|
| `pm_problem_statement` | Crystal-clear problem framing |
| `pm_hypothesis` | Testable assumptions with success metrics |
| `pm_opportunity_tree` | Teresa Torres-style outcome mapping |
| `pm_jtbd_canvas` | Jobs to be Done framework |

#### Develop Phase

| Tool | Description |
|------|-------------|
| `pm_solution_brief` | One-page solution pitch |
| `pm_spike_summary` | Document technical explorations |
| `pm_adr` | Architecture Decision Records |
| `pm_design_rationale` | Design decision documentation |

#### Deliver Phase

| Tool | Description |
|------|-------------|
| `pm_prd` | Comprehensive product requirements |
| `pm_user_stories` | INVEST-compliant stories with acceptance criteria |
| `pm_edge_cases` | Error states, boundaries, recovery paths |
| `pm_launch_checklist` | Never miss a launch step again |
| `pm_release_notes` | User-facing release communication |

#### Measure Phase

| Tool | Description |
|------|-------------|
| `pm_experiment_design` | Rigorous A/B test planning |
| `pm_instrumentation_spec` | Event tracking requirements |
| `pm_dashboard_requirements` | Analytics dashboard specs |
| `pm_experiment_results` | Document learnings from experiments |

#### Iterate Phase

| Tool | Description |
|------|-------------|
| `pm_retrospective` | Team retros that drive action |
| `pm_lessons_log` | Build organizational memory |
| `pm_refinement_notes` | Capture backlog refinement outcomes |
| `pm_pivot_decision` | Evidence-based pivot/persevere framework |

---

### Workflow Tools (5)

Workflow tools orchestrate multiple skills for common PM scenarios:

| Tool | Skills Involved | Description |
|------|-----------------|-------------|
| `pm_workflow_feature_kickoff` | problem → hypothesis → solution → PRD → stories | Standard feature development |
| `pm_workflow_lean_startup` | hypothesis → experiment → results → pivot | Build-Measure-Learn cycle |
| `pm_workflow_triple_diamond` | Full 6-phase sequence | Complete product development |
| `pm_workflow_quick_prd` | problem → PRD | Fast requirements capture |
| `pm_workflow_experiment_cycle` | hypothesis → experiment → results → lessons | Rapid validation loop |

---

### Utility Tools (6)

Discovery and validation tools:

| Tool | Description |
|------|-------------|
| `pm_list_skills` | List all available PM skill tools |
| `pm_list_resources` | List all MCP resources (skills, templates, examples) |
| `pm_list_workflows` | List workflow bundles with their steps |
| `pm_list_prompts` | List available MCP prompts |
| `pm_validate` | Validate an artifact against a skill template |
| `pm_search_skills` | Search skills by keyword |

---

## Slash Command to MCP Tool Mapping

If you're transitioning from file-based pm-skills to MCP, here's the mapping:

| Slash Command | MCP Tool |
|---------------|----------|
| `/prd` | `pm_prd` |
| `/hypothesis` | `pm_hypothesis` |
| `/problem-statement` | `pm_problem_statement` |
| `/user-stories` | `pm_user_stories` |
| `/launch-checklist` | `pm_launch_checklist` |
| `/interview-synthesis` | `pm_interview_synthesis` |
| `/competitive-analysis` | `pm_competitive_analysis` |
| `/stakeholder-summary` | `pm_stakeholder_summary` |
| `/opportunity-tree` | `pm_opportunity_tree` |
| `/jtbd-canvas` | `pm_jtbd_canvas` |
| `/solution-brief` | `pm_solution_brief` |
| `/spike-summary` | `pm_spike_summary` |
| `/adr` | `pm_adr` |
| `/design-rationale` | `pm_design_rationale` |
| `/edge-cases` | `pm_edge_cases` |
| `/release-notes` | `pm_release_notes` |
| `/experiment-design` | `pm_experiment_design` |
| `/instrumentation-spec` | `pm_instrumentation_spec` |
| `/dashboard-requirements` | `pm_dashboard_requirements` |
| `/experiment-results` | `pm_experiment_results` |
| `/retrospective` | `pm_retrospective` |
| `/lessons-log` | `pm_lessons_log` |
| `/refinement-notes` | `pm_refinement_notes` |
| `/pivot-decision` | `pm_pivot_decision` |
| `/kickoff` | `pm_workflow_feature_kickoff` |

**Usage difference:**

```
# Slash command (Claude Code with pm-skills)
/prd search feature

# MCP tool (Claude Desktop with pm-skills-mcp)
"Create a PRD for the search feature"
→ AI invokes pm_prd with topic="search feature"
```

---

## Customization

### Using Custom Skills

Point pm-skills-mcp to your own skill directory:

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

### Workflow: Fork + Customize + MCP

1. **Fork pm-skills** on GitHub
2. **Clone your fork** locally
3. **Modify skills** as needed
4. **Configure MCP** to use your fork:

```json
{
  "mcpServers": {
    "pm-skills": {
      "command": "npx",
      "args": ["pm-skills-mcp"],
      "env": {
        "PM_SKILLS_PATH": "/Users/you/repos/pm-skills/skills"
      }
    }
  }
}
```

5. **Keep updated** by merging from upstream

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PM_SKILLS_PATH` | (embedded) | Path to custom skills directory |
| `PM_SKILLS_FORMAT` | `full` | Default output format |
| `PM_SKILLS_EXAMPLES` | `false` | Include examples by default |

---

## Troubleshooting

### Server Not Starting

**Symptom:** AI doesn't recognize PM-Skills tools

**Solutions:**
1. Verify Node.js is installed: `node --version` (requires v18+)
2. Test server manually: `npx pm-skills-mcp`
3. Check MCP client logs for connection errors
4. Restart your MCP client after configuration changes

### Tools Not Appearing

**Symptom:** `pm_list_skills` returns nothing or errors

**Solutions:**
1. Ensure the server started successfully
2. If using `PM_SKILLS_PATH`, verify the path exists and contains skill folders
3. Check that skill folders have `SKILL.md` files

### Custom Skills Not Loading

**Symptom:** MCP uses embedded skills instead of custom ones

**Solutions:**
1. Verify `PM_SKILLS_PATH` is set correctly in your config
2. Use absolute paths (not relative)
3. Ensure the path points to the `skills/` directory, not the repo root:
   - ✅ `/path/to/pm-skills/skills`
   - ❌ `/path/to/pm-skills`

### Connection Refused

**Symptom:** MCP client can't connect to server

**Solutions:**
1. Check if another process is using the same port
2. Try running with `npx` instead of global install
3. Update pm-skills-mcp: `npm update -g pm-skills-mcp`

### Slow Response Times

**Symptom:** Tools take a long time to respond

**Solutions:**
1. First invocation is slower (loading skills into cache)
2. Subsequent calls should be faster
3. If using custom path, ensure it's on a local filesystem (not network drive)

---

## Resources

### Documentation

- [pm-skills-mcp README](https://github.com/product-on-purpose/pm-skills-mcp#readme)
- [pm-skills-mcp Getting Started Guide](https://github.com/product-on-purpose/pm-skills-mcp/blob/main/docs/getting-started.md)
- [pm-skills-mcp Customization Guide](https://github.com/product-on-purpose/pm-skills-mcp/blob/main/docs/customization.md)
- [PM-Skills Ecosystem Overview](../reference/ecosystem.md)
- [MCP Sync Validation Guide](./validate-mcp-sync.md)

### Links

- **pm-skills-mcp Repository:** [github.com/product-on-purpose/pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp)
- **npm Package:** [npmjs.com/package/pm-skills-mcp](https://www.npmjs.com/package/pm-skills-mcp)
- **Model Context Protocol:** [modelcontextprotocol.io](https://modelcontextprotocol.io)
- **MCP Specification:** [spec.modelcontextprotocol.io](https://spec.modelcontextprotocol.io)

### Support

- [Open an issue](https://github.com/product-on-purpose/pm-skills-mcp/issues/new) for bugs or feature requests
- [Start a discussion](https://github.com/product-on-purpose/pm-skills-mcp/discussions) for questions

---

*Part of the [PM-Skills](https://github.com/product-on-purpose/pm-skills) ecosystem.*
