# PM-Skills Ecosystem Overview

This guide explains the PM-Skills ecosystem, which comprises two complementary products that work together to bring professional product management skills to AI assistants.

---

## Table of Contents

- [Overview](#overview)
- [The Two Products](#the-two-products)
  - [PM-Skills (Skill Library)](#pm-skills-skill-library)
  - [PM-Skills MCP (MCP Server)](#pm-skills-mcp-mcp-server)
- [Decision Matrix](#decision-matrix)
- [Feature Comparison](#feature-comparison)
- [Integration Patterns](#integration-patterns)
  - [File-Based Approach](#file-based-approach)
  - [MCP-Based Approach](#mcp-based-approach)
  - [Hybrid Approach](#hybrid-approach)
- [Customization Workflow](#customization-workflow)
- [Version Compatibility](#version-compatibility)
- [Quick Reference](#quick-reference)

---

## Overview

The PM-Skills ecosystem provides **24 professional product management skills** through two distribution channels:

```
┌─────────────────────────────────────────────────────────────────┐
│                     PM-Skills Ecosystem                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────────┐      ┌─────────────────────┐         │
│   │     PM-Skills       │      │   PM-Skills MCP     │         │
│   │   (Skill Library)   │      │   (MCP Server)      │         │
│   │                     │      │                     │         │
│   │  • 24 skill files   │ ───► │  • 35 MCP tools     │         │
│   │  • Slash commands   │      │  • 72 MCP resources │         │
│   │  • AGENTS.md        │      │  • 3 MCP prompts    │         │
│   │  • Workflow bundles │      │  • Workflow bundles │         │
│   │                     │      │                     │         │
│   │  Git clone / ZIP    │      │  npm install        │         │
│   └─────────────────────┘      └─────────────────────┘         │
│              │                          │                       │
│              ▼                          ▼                       │
│   ┌─────────────────────┐      ┌─────────────────────┐         │
│   │  Claude Code        │      │  Claude Desktop     │         │
│   │  GitHub Copilot     │      │  Cursor             │         │
│   │  Cursor             │      │  Continue           │         │
│   │  Windsurf           │      │  Cline              │         │
│   │  VS Code            │      │  Any MCP Client     │         │
│   └─────────────────────┘      └─────────────────────┘         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Both products provide access to the same 24 skills—they differ in **how** you access them.

---

## The Two Products

### PM-Skills (Skill Library)

**Repository:** [github.com/product-on-purpose/pm-skills](https://github.com/product-on-purpose/pm-skills)

PM-Skills is the **source skill library**—a collection of markdown files containing professional PM frameworks, templates, and examples.

#### What It Provides

| Component | Count | Description |
|-----------|-------|-------------|
| Skills | 24 | Complete PM artifacts (SKILL.md, TEMPLATE.md, EXAMPLE.md) |
| Slash Commands | 25 | Claude Code shortcuts (`/prd`, `/hypothesis`, etc.) |
| Workflow Bundles | 3 | Multi-skill workflows (Feature Kickoff, Lean Startup, Triple Diamond) |
| Documentation | ~10 files | Guides, references, and framework explanations |

#### Directory Structure

```
pm-skills/
├── skills/               # The 24 PM skills (flat: {phase}-{skill})
│   ├── discover-competitive-analysis/
│   ├── define-hypothesis/
│   ├── develop-adr/
│   ├── deliver-prd/
│   ├── measure-experiment-design/
│   └── iterate-retrospective/
├── commands/             # 25 slash commands for Claude Code
├── _bundles/             # Workflow bundles
├── docs/                 # Documentation
└── AGENTS.md             # Universal agent discovery
```

#### Access Methods

1. **Git Clone** — Full access to all files
2. **ZIP Download** — Upload to Claude.ai, Claude Desktop, etc.
3. **Slash Commands** — Direct invocation in Claude Code (`/prd`)
4. **AGENTS.md Discovery** — Auto-discovery in Copilot, Cursor, Windsurf

#### Best For

- Claude Code users (native slash command support)
- Teams who want to customize skills
- Users who prefer browsing skill files directly
- Contributors who want to improve skills

---

### PM-Skills MCP (MCP Server)

**Repository:** [github.com/product-on-purpose/pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp)
**npm Package:** [pm-skills-mcp](https://www.npmjs.com/package/pm-skills-mcp)

PM-Skills MCP is an **MCP server** that wraps the skill library, exposing skills as programmatic tools, resources, and prompts via the [Model Context Protocol](https://modelcontextprotocol.io).

#### What It Provides

| Component | Count | Description |
|-----------|-------|-------------|
| MCP Tools | 35 | 24 skill tools + 5 workflow tools + 6 utility tools |
| MCP Resources | 72 | URI-based access to skills, templates, and examples |
| MCP Prompts | 3 | Guided conversation starters |
| Embedded Skills | 24 | Bundled copy of pm-skills (zero external dependencies) |

#### Key Capabilities

- **Programmatic Access** — AI invokes tools directly via MCP protocol
- **Zero Configuration** — Skills are embedded; just install and run
- **Universal** — Works with any MCP-compatible client
- **Parameterized** — Tools accept `topic`, `context`, `format`, and `includeExample`
- **Discoverable** — `pm_list_skills`, `pm_search_skills` for skill exploration

#### Installation

```bash
npm install -g pm-skills-mcp
```

Or configure directly in your MCP client:

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

#### Best For

- Claude Desktop users
- Cursor users (MCP integration)
- Teams wanting programmatic/tool-based access
- Users who prefer zero file management
- Any MCP client ecosystem

---

## Decision Matrix

Use this matrix to choose between the file-based skill library and the MCP server:

| Scenario | Recommended | Reason |
|----------|-------------|--------|
| **Using Claude Code CLI** | PM-Skills | Native slash commands (`/prd`) |
| **Using Claude Desktop** | PM-Skills MCP | MCP provides seamless tool access |
| **Using Cursor** | Either | Both work; MCP for less file clutter |
| **Want to customize skills** | PM-Skills | Fork and modify skill files |
| **Zero-config preference** | PM-Skills MCP | `npx pm-skills-mcp` and done |
| **Uploading to Claude.ai** | PM-Skills | ZIP upload to Projects |
| **Using GitHub Copilot** | PM-Skills | AGENTS.md auto-discovery |
| **Building automation** | PM-Skills MCP | Programmatic tool invocation |
| **Contributing new skills** | PM-Skills | Submit PRs to skill library |
| **Using multiple MCP tools** | PM-Skills MCP | Consistent MCP interface |

---

## Feature Comparison

| Feature | PM-Skills | PM-Skills MCP |
|---------|-----------|---------------|
| **24 PM Skills** | ✅ | ✅ |
| **Workflow Bundles** | ✅ Manual | ✅ Tool-based |
| **Slash Commands** | ✅ 25 commands | ❌ (use tools) |
| **MCP Tools** | ❌ | ✅ 35 tools |
| **MCP Resources** | ❌ | ✅ 72 resources |
| **MCP Prompts** | ❌ | ✅ 3 prompts |
| **AGENTS.md Discovery** | ✅ | ✅ |
| **Custom Skill Path** | ✅ Fork repo | ✅ `PM_SKILLS_PATH` env |
| **Installation** | Git clone / ZIP | npm install |
| **Update Method** | `git pull` | `npm update` |
| **Offline Use** | ✅ | ✅ (embedded skills) |
| **License** | Apache 2.0 | Apache 2.0 |

---

## Integration Patterns

### File-Based Approach

Use pm-skills directly via git clone or ZIP upload.

```
Your Workspace
├── pm-skills/           # Cloned repository
│   ├── skills/          # Read by AI via AGENTS.md
│   └── commands/        # Slash commands for Claude Code
└── your-project/
```

**Workflow:**
1. Clone `pm-skills` to your workspace
2. AI discovers skills via AGENTS.md
3. Invoke via slash commands or natural language
4. Skills guide AI to produce artifacts

**Pros:** Full control, easy customization, works offline
**Cons:** Manual updates, file management overhead

---

### MCP-Based Approach

Use pm-skills-mcp for programmatic tool access.

```
┌───────────────┐     MCP Protocol     ┌─────────────────┐
│  MCP Client   │ ◄─────────────────► │  pm-skills-mcp  │
│ (Claude, etc) │                      │    (Server)     │
└───────────────┘                      └─────────────────┘
                                              │
                                              ▼
                                       ┌─────────────────┐
                                       │ Embedded Skills │
                                       │  (24 skills)    │
                                       └─────────────────┘
```

**Workflow:**
1. Configure MCP client to connect to pm-skills-mcp
2. AI invokes `pm_*` tools programmatically
3. Server returns skill content, templates, or examples
4. AI generates artifacts using returned content

**Pros:** Zero file management, universal across MCP clients, parameterized tools
**Cons:** Requires MCP support, less direct file access

---

### Hybrid Approach

Use both for maximum flexibility.

This approach works well when you:
- Want slash commands in Claude Code AND MCP tools in Claude Desktop
- Are customizing skills and want MCP to use your customizations
- Need both file browsing and programmatic access

**Configuration:**

1. Clone pm-skills for customization and Claude Code slash commands
2. Install pm-skills-mcp for MCP client access
3. Point MCP to your custom skills:

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

---

## Customization Workflow

To customize skills and use them across both products:

### 1. Fork PM-Skills

```bash
# Fork on GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/pm-skills.git
cd pm-skills
```

### 2. Modify Skills

Edit any `SKILL.md`, `TEMPLATE.md`, or `EXAMPLE.md` file:

```bash
# Example: Customize the PRD template
code skills/deliver-prd/references/TEMPLATE.md
```

### 3. Use Custom Skills in Claude Code

Your cloned repo works immediately—Claude Code reads from AGENTS.md.

### 4. Use Custom Skills in MCP

Point pm-skills-mcp to your custom skills directory:

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

### 5. Keep Updated

```bash
# Add upstream remote
git remote add upstream https://github.com/product-on-purpose/pm-skills.git

# Fetch and merge updates
git fetch upstream
git merge upstream/main
```

---

## Version Compatibility

| PM-Skills Version | PM-Skills MCP Version | Compatibility |
|-------------------|----------------------|---------------|
| v2.1.0+ | v2.1.0+ | **Full alignment** — flat structure, frontmatter-based phase |
| v2.0.x | v1.1.0 | Partial — nested MCP, flat pm-skills |
| v1.2.x | v1.0.x | Legacy stable |
| v1.1.x | v1.0.x | Legacy compatible |
| v1.0.x | v1.0.x | Legacy compatible |

**v2.1 Alignment Notes:**
- pm-skills-mcp v2.1+ reads phase from SKILL.md frontmatter (not directory path)
- Resource URIs are now flat: `pm-skills://skills/{skill}` (phase in metadata)
- Tool names remain stable: `pm_prd`, `pm_hypothesis`, etc.
- Custom `PM_SKILLS_PATH` works with any pm-skills v2.x structure

**Compatibility Notes:**
- PM-Skills MCP embeds a snapshot of pm-skills at build time
- MCP updates track pm-skills releases within ~1 week
- Custom `PM_SKILLS_PATH` bypasses embedded skills (use any pm-skills version)

---

## Quick Reference

### PM-Skills

| Action | Command |
|--------|---------|
| Install | `git clone https://github.com/product-on-purpose/pm-skills.git` |
| Update | `git pull origin main` |
| Use skill | `/prd` or "Create a PRD for..." |
| Browse skills | `ls skills/` |

### PM-Skills MCP

| Action | Command |
|--------|---------|
| Install globally | `npm install -g pm-skills-mcp` |
| Run server | `pm-skills-mcp` or `npx pm-skills-mcp` |
| Update | `npm update -g pm-skills-mcp` |
| Use skill | AI invokes `pm_prd` tool |
| List skills | AI invokes `pm_list_skills` tool |

### Links

- **PM-Skills:** [github.com/product-on-purpose/pm-skills](https://github.com/product-on-purpose/pm-skills)
- **PM-Skills MCP:** [github.com/product-on-purpose/pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp)
- **npm Package:** [npmjs.com/package/pm-skills-mcp](https://www.npmjs.com/package/pm-skills-mcp)
- **MCP Protocol:** [modelcontextprotocol.io](https://modelcontextprotocol.io)

---

*Part of the [PM-Skills](https://github.com/product-on-purpose/pm-skills) ecosystem.*
