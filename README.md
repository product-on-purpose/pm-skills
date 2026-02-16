<a id="readme-top"></a>

<h1 align="center">
  <a href="https://github.com/product-on-purpose/pm-skills">PM-Skills</a>
  <br>
</h1>

<h4 align="center">A curated collection of 24 best-practice, plug-and-play product management “agent skills” plus templates and workflow bundles for consistent, professional PM outputs.</h4>

<p align="center">
  <a href="https://github.com/product-on-purpose/pm-skills/issues/new?labels=bug">Report a Bug</a>
  ·
  <a href="https://github.com/product-on-purpose/pm-skills/issues/new?labels=enhancement">Request a Feature</a>
  ·
  <a href="https://github.com/product-on-purpose/pm-skills/discussions">Ask a Question</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" alt="Project Status: Active">
  <a href="https://github.com/product-on-purpose/pm-skills/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat-square" alt="License">
  </a>
  <a href="https://github.com/product-on-purpose/pm-skills/releases">
    <img src="https://img.shields.io/badge/version-2.4.0-blue.svg?style=flat-square" alt="Version">
  </a>
  <a href="#the-24-skills">
    <img src="https://img.shields.io/badge/skills-24-brightgreen.svg?style=flat-square" alt="Skills">
  </a>
  <a href="https://agentskills.io/specification">
    <img src="https://img.shields.io/badge/spec-agentskills.io-orange.svg?style=flat-square" alt="Agent Skills Spec">
  </a>
  <a href="CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome">
  </a>
</p>

<p align="center">
  <a href="https://github.com/product-on-purpose/pm-skills/stargazers">
    <img src="https://img.shields.io/github/stars/product-on-purpose/pm-skills?style=flat-square" alt="Stars">
  </a>
  <a href="https://github.com/product-on-purpose/pm-skills/network/members">
    <img src="https://img.shields.io/github/forks/product-on-purpose/pm-skills?style=flat-square" alt="Forks">
  </a>
  <a href="https://github.com/product-on-purpose/pm-skills/issues">
    <img src="https://img.shields.io/github/issues/product-on-purpose/pm-skills?style=flat-square" alt="Issues">
  </a>
  <a href="https://github.com/product-on-purpose/pm-skills/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/product-on-purpose/pm-skills?style=flat-square" alt="Contributors">
  </a>
  <img src="https://img.shields.io/github/last-commit/product-on-purpose/pm-skills?style=flat-square" alt="Last Commit">
</p>

<!-- ========== NEW: MCP Cross-Reference Badge + Callout ========== -->
<p align="center">
  <a href="https://github.com/product-on-purpose/pm-skills-mcp">
    <img src="https://img.shields.io/badge/MCP_Server-available-purple.svg?style=flat-square" alt="MCP Server Available">
  </a>
</p>

> **🔥MCP Server Available!** If you are using VS Code, Claude Desktop, Claude Code (CLI), Github Copilot, Cursor, etc... check out **[pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp)** for instant MCP access to all 24 skills and workflows - no file management required.

---

<!-- ========== END NEW ========== -->

<p align="center">
  <a href="#the-big-idea">About</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#the-24-skills">Skills</a> •
  <a href="#workflow-bundles">Bundles</a> •
  <a href="#project-status">Status</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#community">Community</a>
</p>

<details>
<summary><strong>Table of Contents</strong></summary>

- [The Big Idea](#the-big-idea)
  - [The Problem](#the-problem)
  - [The Solution](#the-solution)
  - [Key Features](#key-features)
  - [Built with...](#built-with)
  - [Founded on...](#founded-on)
  - [Works for...](#works-for)
  - [Comparison: `pm-skills` (this repo) vs. `pm-skills-mcp`](#comparison-pm-skills-this-repo-vs-pm-skills-mcp)
- [Getting Started](#getting-started)
  - [Installation Options](#installation-options)
  - [Quick Start by Platform](#quick-start-by-platform)
  - [Releases](#releases)
  - [Alternative: openskills CLI](#alternative-openskills-cli)
- [Usage](#usage)
  - [How Skills Work](#how-skills-work)
  - [The 24 Skills](#the-24-skills)
  - [Quick Examples](#quick-examples)
  - [Workflow Bundles](#workflow-bundles)
- [Project Status](#project-status)
  - [Project Structure](#project-structure)
  - [Changelog](#changelog)
  - [Roadmap](#roadmap)
- [Contributing](#contributing)
  - [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
- [FAQ](#faq)
- [About](#about)
  - [Author](#author)
  - [License](#license)
- [Community](#community)

</details>

---

**Quick Start** (Clone and go!)
```bash
git clone https://github.com/product-on-purpose/pm-skills.git && cd pm-skills
```

---

**What's New (v2.4)**
<details>
<summary>Cross-repo MCP drift guardrail (blocking-default)</summary>

- `validate-mcp-sync` guardrail remains active for `pm-skills` vs `pm-skills-mcp` skill drift checks.
- Drift check output remains actionable and includes the manual sync checklist.
- Default mode is `block` in `v2.3.0`; manual runs can still use `mode=observe`.
- MCP alignment closure (`B-01`) is now recorded as `closed-aligned` on pinned refs.
- See `docs/guides/validate-mcp-sync.md` for rollout and troubleshooting.

</details>
<details>
<summary>v2.4 contract lock shipped</summary>

- `B-03` output behavior contract and `B-04` config contract are now `closed-aligned`.
- Release note published: `docs/releases/Release_v2.4.md`.
- `docs/internal/release-planning/checklist_v2.4.0.md` is now `Shipped`.
- Delivery-plan closure packet for v2.4 is tracked with `DONE_` filenames under `_NOTES/delivery-plan/`.

</details>
<details>
<summary>Governance and release execution clarity</summary>

- Added planning persistence policy and tier map:
  - `docs/internal/planning-persistence-policy.md`
  - `docs/internal/planning-artifact-tier-map.md`
- Established canonical backlog governance:
  - `docs/internal/backlog-canonical.md`
- Added explicit release execution/checklists:
  - `docs/internal/release-planning/Release_v2.2_to_v2.5_execution-plan.md`
  - `docs/internal/release-planning/checklist_v2.2.0.md` through `docs/internal/release-planning/checklist_v2.5.0.md`

</details>
<details>
<summary>MCP version alignment model updated</summary>

- PM-Skills and PM-Skills MCP now use direct version tracking from `v2.4.x` onward.
- Compatibility docs updated to anchor `pm-skills v2.4.x` to `pm-skills-mcp v2.4.x`.
- `validate-mcp-sync` now also checks pinned source metadata and contract-version parity.

</details>
<details>
<summary>v2.0 compatibility baseline remains in place</summary>

- Flat skills layout (`skills/{phase-skill}/`) and command realignment remain the canonical structure.
- Sync helper, release packaging, and command validation workflow remain unchanged.

</details>
<details>
<summary>Previous v2.0 details</summary>
<details>
<summary>Sync helper for discovery (.claude/)</summary>

- Skills are now flat (`skills/{phase-skill}/`). Some tools (openskills CLI, certain Claude Code setups) look for `.claude/skills` and `.claude/commands`.
- Run `./scripts/sync-claude.sh` (macOS/Linux) or `./scripts/sync-claude.ps1` (Windows) after cloning or unzipping to regenerate `.claude/skills` and `.claude/commands` from the flat source.
- The release ZIP ships only `.claude/pm-skills-for-claude.md`; the sync helper creates the rest locally. Keep `.claude/` untracked.

</details>
<details>
<summary>Flat skills layout + command realignment</summary>

- All 24 skills live at `skills/{phase-skill}/`.
- Every slash command points to the flat path (no nested phase folders).
- Bundles updated to reference the new paths.

</details>
<details>
<summary>Reproducible builds</summary>

- `scripts/build-release.(sh|ps1)` packages `pm-skills-v2.0.zip` + SHA256.
- `scripts/validate-commands.(sh|ps1)` ensures commands reference valid skills/templates/examples.
See `scripts/README_SCRIPTS.md` for script usage, FAQs, and troubleshooting.
- Release workflow uploads ZIP + hash automatically on tag push.

</details>
<details>
<summary>Docs refresh</summary>

- README/QUICKSTART/AGENTS/bundles/guides reference flat paths.
- Skill templates relocated to `docs/templates/skill-template/` with updated links.
- Added project-structure and release notes updates for 2.0.1 tidy-up.

</details>
</details>

---

## The Big Idea

**Stop prompt-fumbling. Start shipping.** Every time you ask an AI to help with product management, you start from zero. Generic responses. Inconsistent formats. Missing critical sections. Hours lost to repetitive prompt crafting.

PM-Skills changes that and gives your AI-tool-of-choice instant access to:

- **Professional frameworks** refined across hundreds of product launches
- **Production-ready templates** that capture institutional PM knowledge
- **Real-world examples** that set the quality bar

```
You: "Create a PRD for our new search feature"

AI + PM-Skills: Generates a comprehensive PRD with problem statement,
                success metrics, user stories, scope definition, and
                technical considerations-all in professional format.
```

### The Problem

Every time you ask an AI to help with product management, you start from zero. Generic responses. Inconsistent formats. Missing critical sections. Hours spent prompt-engineering the same workflows.

### The Solution

**PM-Skills** gives your AI instant access to field-tested frameworks, templates, and examples for every stage of product development.

| Without PM-Skills                 | With PM-Skills                  |
| --------------------------------- | ------------------------------- |
| ⚠️ Generic AI responses          | ✅ Professional PM frameworks   |
| ⚠️ Inconsistent formats          | ✅ Production-ready templates   |
| ⚠️ Missing key sections          | ✅ Comprehensive coverage       |
| ⚠️ Starting from scratch         | ✅ Building on best practices   |
| ⚠️ Prompt engineering every time | ✅ One command, instant results |

### Key Features

- ✅ **24 Production-Ready Skills** covering the complete product lifecycle
- ✅ **Triple Diamond Framework** organizing Discover, Define, Develop, Deliver, Measure, and Iterate phases
- ✅ **Workflow Bundles** for common PM workflows (Feature Kickoff, Lean Startup, Triple Diamond)
- ✅ **Slash Commands** for Claude Code users-instant access to every skill
- ✅ **Auto-Discovery** via AGENTS.md in GitHub Copilot, Cursor, and Windsurf
- ✅ **Agent Skills Spec** compliant-works across AI assistants
- ✅ **Best-Practice Templates** based on industry best practices
- ✅ **Comprehensive Documentation** with examples and references
- ✅ **Apache 2.0 Licensed** for commercial and personal use

### Built with...

<p align="left">
  <a href="https://agentskills.io/specification">
    <img src="https://img.shields.io/badge/Agent_Skills_Spec-compliant-orange?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PHBhdGggZD0iTTEyIDZWMTJMMTYgMTQiLz48L3N2Zz4=" alt="Agent Skills Spec">
  </a>
  <a href="https://github.github.com/gfm/">
    <img src="https://img.shields.io/badge/Markdown-GFM-black?style=for-the-badge&logo=markdown" alt="GitHub Flavored Markdown">
  </a>
  <a href="https://github.com/features/actions">
    <img src="https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="GitHub Actions">
  </a>
</p>

- **[Agent Skills Specification](https://agentskills.io/specification)** - Open standard for AI-agent skills
- **[GitHub Flavored Markdown](https://github.github.com/gfm/)** - Universal documentation format
- **[Keep a Changelog](https://keepachangelog.com/)** - Structured release documentation
- **[Best-README-Template](https://github.com/othneildrew/Best-README-Template)** - README inspiration

### Founded on...

- **[Triple Diamond Framework](https://medium.com/zendesk-creative-blog/the-zendesk-triple-diamond-process-fd857a11c179)** - Product development methodology
- **[Teresa Torres' Opportunity Solution Trees](https://www.producttalk.org/opportunity-solution-tree/)** - Outcome-driven discovery
- **[Jobs to be Done Framework](https://jtbd.info/)** - Customer motivation framework
- **[Architecture Decision Records](https://adr.github.io/)** - Technical decision documentation
- **[Design Council's Double Diamond](https://www.designcouncil.org.uk/our-resources/framework-for-innovation/)** - Foundation of our Triple Diamond framework
- **[Michael Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)** - ADR format we adapted

### Works for...

PM-Skills follows the **[Agent Skills Specification](https://agentskills.io/specification)** and works natively across the AI ecosystem.

<!-- ========== UPDATED: Platform Compatibility Table with MCP Column ========== -->
#### Platform Compatibility

| Platform            | Status       | Method                                                                      | Notes                                  |
| ------------------- | ------------ | --------------------------------------------------------------------------- | -------------------------------------- |
| **Claude Code**     | ✅ Native    | Slash commands; optional `sync-claude.(sh|ps1)` to populate `.claude/` cache | Best experience with `/prd`, etc.; helper needed for openskills-style discovery |
| **Claude.ai**       | ✅ Native    | ZIP upload                                                                  | Upload to Projects                     |
| **Claude Desktop**  | ✅ Native    | ZIP upload or [MCP](https://github.com/product-on-purpose/pm-skills-mcp)    | MCP recommended for programmatic access |
| **GitHub Copilot**  | ✅ Native    | AGENTS.md discovery                                                         | Auto-discovers in repo                 |
| **Cursor**          | ✅ Native    | AGENTS.md or [MCP](https://github.com/product-on-purpose/pm-skills-mcp)     | MCP for programmatic tool access; sync helper optional if using openskills      |
| **Windsurf**        | ✅ Native    | AGENTS.md discovery                                                         | Auto-discovers; sync helper not needed |
| **VS Code**         | ✅ Native    | Via extensions                                                              | Cline, Continue, or manual             |
| **OpenCode**        | ✅ Native    | Skill format                                                                | Direct skill loading                   |
| **Any MCP Client**  | ✅ Universal | [pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp)        | Protocol-level access                  |
| **ChatGPT / Codex** | 🔶 Manual    | Copy skill content                                                          | No native support                      |
| **Other AI Tools**  | 🔶 Manual    | Copy skill content                                                          | Works with any LLM                     |

### Comparison: `pm-skills` (this repo) vs. `pm-skills-mcp`

`PM-Skills` is available in two complementary forms:

|  | pm-skills (this repo) | [pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp) |
|---|---|---|
| **What it is** | Skill library as markdown files | MCP server wrapping the skill library |
| **Access method** | Git clone, ZIP upload | `npx pm-skills-mcp` |
| **Setup time** | 2-5 minutes | 30 seconds |
| **Skill invocation** | Slash commands (Claude Code) | MCP tool calls |
| **Auto-discovery** | AGENTS.md (Copilot, Cursor, Windsurf) | MCP protocol (Claude Desktop, Cursor) |
| **Template access** | Navigate file system | URI-based resources |
| **Workflow bundles** | Manual orchestration | Tool-based execution |
| **Customization** | Edit files directly | Set `PM_SKILLS_PATH` to custom folder |
| **Updates** | `git pull` | `npm update pm-skills-mcp` |

> Note: pm-skills-mcp v1.x targets the legacy nested layout; use pm-skills-mcp v2.4+ for version-aligned parity with pm-skills v2.4+.

**Use `pm-skills` (this repo) when:**
- You prefer slash commands in Claude Code (`/prd`, `/hypothesis`)
- You want to browse, read, and customize skill files directly
- You're using GitHub Copilot or Windsurf with AGENTS.md discovery
- You want to fork and heavily customize skills for your team

**Use [pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp) when:**
- You want instant setup with `npx pm-skills-mcp`
- You're using Claude Desktop, Cursor, or any MCP client
- You want programmatic tool access without managing files

Both approaches give you access to the same 24 production-ready PM skills.

See the [Ecosystem Overview](docs/reference/ecosystem.md) for a detailed comparison.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Getting Started

**Quick start:** Clone and go.

```bash
git clone https://github.com/product-on-purpose/pm-skills.git && cd pm-skills
```

**Need platform-specific instructions?** See [Quick Start by Platform](#quick-start-by-platform) below.

**Want a detailed walkthrough?** Check our [Getting Started Guide](docs/getting-started.md).

**Docs navigation:** Quickest: this README’s Quick Start or `QUICKSTART.md` in the repo/release ZIP. Detailed: `docs/getting-started.md` (long-form).

### Installation Options

| Method                 | Best For                                  | Command / Action                              |
| ---------------------- | ----------------------------------------- | --------------------------------------------- |
| **Git Clone**          | Claude Code, Copilot, Cursor, Windsurf    | `git clone https://github.com/product-on-purpose/pm-skills.git` |
| **ZIP Download**       | Claude.ai, Claude Desktop                 | [Download Latest Release](https://github.com/product-on-purpose/pm-skills/releases/latest) |
| **MCP Server**         | Programmatic tool access                  | `npx pm-skills-mcp` ([pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp)) |


### Quick Start by Platform

<details>
<summary><strong>Claude Code</strong></summary>

No setup needed! Skills work directly via slash commands in your terminal:

```bash
# Clone the repo to get slash commands
git clone https://github.com/product-on-purpose/pm-skills.git
cd pm-skills

# Use any skill with slash commands
/prd "Search feature for e-commerce platform"
/hypothesis "Will one-page checkout increase conversion?"
/user-stories "Recurring tasks feature from PRD"
```

All 24 skills are available as `/skill-name` commands. See [commands/](commands/) for the full list.

Need `.claude/skills` for openskills or certain discovery flows? After cloning, run:

```bash
./scripts/sync-claude.sh   # macOS/Linux
./scripts/sync-claude.ps1  # Windows
```

This regenerates `.claude/skills` and `.claude/commands` from the flat source; keep them untracked.

</details>

<details>
<summary><strong>Claude.ai / Claude Desktop</strong></summary>

1. Download `pm-skills-vX.X.X.zip` from [Releases](https://github.com/product-on-purpose/pm-skills/releases)
2. Upload in Claude.ai or Desktop:
   - **Claude.ai**: Project Settings → Add Files → Upload ZIP
   - **Desktop**: Settings → Capabilities → Upload ZIP
3. Use skills by name: "Use the prd skill to create requirements for..."

See `QUICKSTART.md` in the archive for detailed instructions.

</details>

<!-- ========== NEW: MCP Server Quick Start ========== -->
<details>
<summary><strong>MCP Server (Claude Desktop, Cursor, Any MCP Client)</strong></summary>

For [MCP-compatible clients](https://modelcontextprotocol.io), use [pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp):

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

All 24 skills become available as programmatic tools. See the [pm-skills-mcp README](https://github.com/product-on-purpose/pm-skills-mcp#getting-started) for client-specific setup.

</details>
<!-- ========== END NEW ========== -->

<details>
<summary><strong>GitHub Copilot</strong></summary>

Copilot auto-discovers skills via `AGENTS.md`:

```bash
# Clone into your project or as a submodule
git clone https://github.com/product-on-purpose/pm-skills.git

# Or add as submodule
git submodule add https://github.com/product-on-purpose/pm-skills.git
```

Copilot Chat will see the skills. Ask: "Use the prd skill to create requirements for user authentication"

</details>

<details>
<summary><strong>Cursor / Windsurf</strong></summary>

Both IDEs auto-discover skills via `AGENTS.md`:

```bash
# Clone into your workspace
git clone https://github.com/product-on-purpose/pm-skills.git
```

Open the folder in Cursor or Windsurf. The AI assistant will automatically discover and can use all 24 skills.

</details>

<details>
<summary><strong>VS Code (Cline / Continue)</strong></summary>

**With Cline or Continue extensions:**
1. Clone pm-skills into your workspace
2. The extension will discover skills via `AGENTS.md`
3. Ask: "Use the hypothesis skill to test my assumption about..."

**Manual approach:**
1. Open any `SKILL.md` file from `skills/{phase-skill}/` (e.g., `skills/deliver-prd/`)
2. Copy the content into your AI chat
3. Ask the AI to follow the skill instructions

</details>

<details>
<summary><strong>ChatGPT / Other LLMs</strong></summary>

ChatGPT and other LLMs don't support Agent Skills natively, but you can use skills manually:

1. Clone or download pm-skills
2. Open the skill you need (e.g., `skills/deliver-prd/SKILL.md`)
3. Copy the full content into your ChatGPT conversation
4. Ask: "Follow these instructions to create a PRD for [your topic]"

The skill content provides all the context the LLM needs to produce professional output.

</details>

### Releases

All releases are available on the [GitHub Releases](https://github.com/product-on-purpose/pm-skills/releases) page:

- **`pm-skills-vX.X.X.zip`** — Complete package with all skills, commands, bundles, and documentation
- **Latest stable:** `v2.4.0` (output/config contract lock closure)

Each release includes `QUICKSTART.md` with installation and usage instructions.
Release notes are published in `docs/releases/` (for example, `docs/releases/Release_v2.2.md`).

[![Download Latest](https://img.shields.io/github/v/release/product-on-purpose/pm-skills?style=for-the-badge&label=Download&color=brightgreen)](https://github.com/product-on-purpose/pm-skills/releases/latest)

### Alternative: openskills CLI

> **Note:** The [openskills CLI](https://github.com/numman-ali/openskills) discovers skills in `.claude/skills/` directories. PM-Skills ships a flat `skills/{phase-skill}/` structure plus a sync helper that populates `.claude/skills/` locally. Run `./scripts/sync-claude.sh` (or `.ps1`) after cloning to enable discovery.

```bash
# Works for repos with .claude/skills/ structure (e.g., anthropics/skills)
npm i -g openskills
openskills install anthropics/skills
openskills sync
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Usage

PM-Skills provides three components that work together to accelerate your product management work:

| Component    | What it is                                                  | When to use                                               |
| ------------ | ----------------------------------------------------------- | --------------------------------------------------------- |
| **Skills**   | Self-contained instruction sets with templates and examples | Single artifacts (PRD, user stories, retro)               |
| **Commands** | Slash commands for Claude Code (e.g., `/prd`)               | Quick access to individual skills                         |
| **Bundles**  | Curated multi-skill workflows                               | End-to-end processes (feature kickoff, validation cycles) |

**Skills** are the atomic building blocks-each one teaches your AI how to produce a specific PM artifact with professional quality. **Commands** give you instant access to skills via `/skill-name` syntax. **Workflow bundles** chain multiple skills together for complete product development processes.

### How Skills Work

Each skill is a self-contained instruction set:

```
skills/{phase-skill}/
├── SKILL.md              # Instructions for the AI
└── references/
    ├── TEMPLATE.md       # Output structure
    └── EXAMPLE.md        # Real-world example
```

**Your prompt:** "Create a PRD for adding dark mode to our app"

**The AI:**

1. Reads `skills/{phase-skill}/SKILL.md` for instructions
2. Follows the structured approach (problem → solution → metrics → scope)
3. Uses `TEMPLATE.md` for formatting
4. References `EXAMPLE.md` for quality benchmarks
5. Outputs a complete, professional PRD

### The 24 Skills

PM-Skills covers the complete product lifecycle using the **Triple Diamond** framework:

#### 🔍 Discover - *Find the right problem*

| Skill                    | What it does                                | Command                 |
| ------------------------ | ------------------------------------------- | ----------------------- |
| **interview-synthesis**  | Turn user research into actionable insights | `/interview-synthesis`  |
| **competitive-analysis** | Map the landscape, find opportunities       | `/competitive-analysis` |
| **stakeholder-summary**  | Understand who matters and what they need   | `/stakeholder-summary`  |

#### 📋 Define - *Frame the problem*

| Skill                 | What it does                              | Command              |
| --------------------- | ----------------------------------------- | -------------------- |
| **problem-statement** | Crystal-clear problem framing             | `/problem-statement` |
| **hypothesis**        | Testable assumptions with success metrics | `/hypothesis`        |
| **opportunity-tree**  | Teresa Torres-style outcome mapping       | `/opportunity-tree`  |
| **jtbd-canvas**       | Jobs to be Done framework                 | `/jtbd-canvas`       |

#### 💡 Develop - *Explore solutions*

| Skill                | What it does                                  | Command             |
| -------------------- | --------------------------------------------- | ------------------- |
| **solution-brief**   | One-page solution pitch                       | `/solution-brief`   |
| **spike-summary**    | Document technical explorations               | `/spike-summary`    |
| **adr**              | Architecture Decision Records (Nygard format) | `/adr`              |
| **design-rationale** | Why you made that design choice               | `/design-rationale` |

#### 🚀 Deliver - *Ship it*

| Skill                | What it does                                      | Command             |
| -------------------- | ------------------------------------------------- | ------------------- |
| **prd**              | Comprehensive product requirements                | `/prd`              |
| **user-stories**     | INVEST-compliant stories with acceptance criteria | `/user-stories`     |
| **edge-cases**       | Error states, boundaries, recovery paths          | `/edge-cases`       |
| **launch-checklist** | Never miss a launch step again                    | `/launch-checklist` |
| **release-notes**    | User-facing release communication                 | `/release-notes`    |

#### 📊 Measure - *Validate with data*

| Skill                      | What it does                        | Command                   |
| -------------------------- | ----------------------------------- | ------------------------- |
| **experiment-design**      | Rigorous A/B test planning          | `/experiment-design`      |
| **instrumentation-spec**   | Event tracking requirements         | `/instrumentation-spec`   |
| **dashboard-requirements** | Analytics dashboard specs           | `/dashboard-requirements` |
| **experiment-results**     | Document learnings from experiments | `/experiment-results`     |

#### 🔄 Iterate - *Learn and improve*

| Skill                | What it does                             | Command             |
| -------------------- | ---------------------------------------- | ------------------- |
| **retrospective**    | Team retros that drive action            | `/retrospective`    |
| **lessons-log**      | Build organizational memory              | `/lessons-log`      |
| **refinement-notes** | Capture backlog refinement outcomes      | `/refinement-notes` |
| **pivot-decision**   | Evidence-based pivot/persevere framework | `/pivot-decision`   |

### Quick Examples

**Generate a comprehensive PRD:**

```
/prd "Add real-time collaboration to document editor"
```

**Create user stories from requirements:**

```
/user-stories "Dark mode feature from PRD.md"
```

**Design an A/B test:**

```
/experiment-design "Test impact of simplified onboarding flow"
```

**Document a technical decision:**

```
/adr "Decision to use PostgreSQL for primary database"
```

**Synthesize user research:**

```
/interview-synthesis "5 customer interviews about payment flows"
```

### Workflow Bundles

While individual skills are powerful on their own, real product work rarely happens in isolation. Workflow bundles combine multiple skills into guided, end-to-end processes that mirror how experienced product managers actually work.

Each bundle provides a **sequence of skills** with handoff guidance between steps, ensuring context flows naturally from discovery through delivery. Bundles are opinionated-they encode PM best practices about which artifacts to create and in what order.

**Don't know where to start?** Use a bundle:

| Bundle                                             | Best for          | Skills included                                                        |
| -------------------------------------------------- | ----------------- | ---------------------------------------------------------------------- |
| **[Feature Kickoff](_bundles/feature-kickoff.md)** | New features      | problem-statement → hypothesis → prd → user-stories → launch-checklist |
| **[Lean Startup](_bundles/lean-startup.md)**       | Rapid validation  | hypothesis → experiment-design → experiment-results → pivot-decision   |
| **[Triple Diamond](_bundles/triple-diamond.md)**   | Major initiatives | All 24 skills across 6 phases                                          |

#### Workflow Examples

**For new features**, use the [Feature Kickoff](_bundles/feature-kickoff.md) workflow:

```
/kickoff "Mobile push notifications"
```

This automatically executes:

1. `problem-statement` - Frame the problem
2. `hypothesis` - Define testable assumptions
3. `prd` - Create comprehensive requirements
4. `user-stories` - Generate implementation stories
5. `launch-checklist` - Plan the launch

**For rapid validation**, use the [Lean Startup](_bundles/lean-startup.md) workflow:

```
Build → Measure → Learn cycle with hypothesis, experiments, and pivot decisions
```

**For major initiatives**, use the [Triple Diamond](_bundles/triple-diamond.md) workflow:

```
Complete product development across all 6 phases and 24 skills
```

For detailed skill documentation and examples, see the [skills/](skills/) directory.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Project Status

### Project Structure

```
pm-skills/
├── skills/                     # 24 PM skills (flat: discover-*, define-*, develop-*, deliver-*, measure-*, iterate-*)
├── commands/                   # Slash commands (25) mapping to skills/bundles
├── _bundles/                   # Workflow bundles: feature-kickoff, lean-startup, triple-diamond
├── scripts/                    # sync-claude.(sh|ps1), build-release.(sh|ps1), validate-commands.(sh|ps1)
├── .github/                    # CI workflows + automation scripts (validate-mcp-sync)
├── docs/                       # Documentation and guides
│   ├── getting-started.md      # Setup guide
│   ├── guides/                 # How-to guides (using-skills.md, authoring-pm-skills.md, mcp-integration.md)
│   ├── reference/              # Technical specs (categories.md, ecosystem.md, project-structure.md)
│   └── templates/              # Skill template (SKILL.md, TEMPLATE.md, EXAMPLE.md)
├── AGENTS.md                   # Universal agent discovery file
├── CONTRIBUTING.md             # Contribution guidelines
└── CHANGELOG.md                # Version history
```

See [docs/reference/project-structure.md](docs/reference/project-structure.md) for detailed descriptions.

### Changelog
See [CHANGELOG.md](CHANGELOG.md) for full details.

| Version   | Date       | Highlights                                                              |
| --------- | ---------- | ----------------------------------------------------------------------- |
| **2.4.0** | 2026-02-16 | Contract-lock closure (`B-03`/`B-04`) + release cut |
| **2.3.0** | 2026-02-13 | MCP alignment closure (`B-01`) + blocking default sync guardrail (`B-02` phase 2) |
| **2.2.0** | 2026-02-13 | MCP drift guardrail (observe mode), planning/backlog governance, release execution checklists |
| **2.1.0** | 2026-01-27 | MCP alignment milestone documentation update                             |
| **2.0.0** | 2026-01-26 | Flat `skills/{phase-skill}/`, sync helpers, build scripts, docs refresh |
| **1.2.0** | 2026-01-20 | Security policy, CodeQL scanning, Dependabot, issue/PR templates        |
| **1.1.1** | 2026-01-20 | openskills#48 fix verified, CODE_OF_CONDUCT, open-skills submissions    |
| **1.1.0** | 2026-01-16 | Documentation overhaul, README redesign, FAQ, collapsible TOC           |
| **1.0.1** | 2026-01-15 | All 24 slash commands complete                                          |
| **1.0.0** | 2026-01-14 | Full Triple Diamond coverage-all 24 skills, workflow bundles, AGENTS.md |
| **0.3.0** | 2026-01-14 | P1 Skills (8 skills) + GitHub Actions workflows                         |
| **0.2.0** | 2026-01-14 | P0 Core Skills (5 skills)                                               |
| **0.1.0** | 2026-01-14 | Initial project structure, foundation infrastructure                    |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Roadmap

See the [open issues](https://github.com/product-on-purpose/pm-skills/issues) for a full list of proposed features and known issues.

- [x] Launch with 24 production-ready skills
- [x] Add workflow bundles (Feature Kickoff, Lean Startup, Triple Diamond)
- [x] GitHub Copilot, Cursor, and Windsurf integration via AGENTS.md
- [x] Slash commands for Claude Code
- [x] Apache 2.0 license for commercial use
- [x] openskills CLI support ([#48](https://github.com/numman-ali/openskills/issues/48) resolved in v1.3.1)
- [x] pm-skills-mcp package (https://github.com/product-on-purpose/pm-skills-mcp) with v2.4 direct-version-tracking milestone documented
- [x] v2.2 guardrails release: observe-first cross-repo sync validation + planning/backlog governance
- [x] v2.4 contract lock release: `B-03` output behavior + `B-04` config contract closed-aligned

**In Progress**
- Project support utilities
- `/common` shared snippets
- `/update-doc` helper flow
- `/link-docs` helper flow

#### Backlog / Considering

- [ ] New skills?! Which?
- [ ] Community skill contributions and marketplace
- [x] Skill versioning and compatibility tracking
- [ ] Additional workflow bundles
    - [ ] Product Strategy bundle
    - [ ] Customer Discovery bundle
    - [ ] Stakeholder Management bundle
- [ ] Multi-language support
    - [ ] Spanish translations
    - [ ] Portuguese translations
    - [ ] French translations
- [ ] Integration guides for additional AI assistants
    - [ ] Gemini integration
    - [ ] ChatGPT Plus integration
- [ ] Advanced features
    - [ ] Skill composition and chaining
    - [ ] Custom skill templates
    - [ ] Team-specific skill customization

#### Top Feature Requests

Coming soon

#### Top Bugs

Coming soon

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make will benefit everybody else and are **greatly appreciated**.

### How to Contribute

**Quick contribution steps:**

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingSkill`)
3. Commit your Changes using [Conventional Commits](https://www.conventionalcommits.org/) (`git commit -m 'feat: add amazing skill'`)
4. Push to the Branch (`git push origin feature/AmazingSkill`)
5. Open a Pull Request

**Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on:**

- Code of conduct
- Development process
- Skill contribution guidelines
- Testing requirements
- Documentation standards

### Reporting Bugs

Please try to create bug reports that are:

- ✅ **Reproducible** - Include steps to reproduce the problem
- ✅ **Specific** - Include as much detail as possible (version, environment, etc.)
- ✅ **Unique** - Do not duplicate existing opened issues
- ✅ **Scoped** - One bug per report

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## FAQ

<details>
<summary><strong>Do I need to install all 24 skills?</strong></summary>

No! You can use individual skills as needed. Each skill is self-contained and works independently. If you only need PRDs, just reference the `skills/deliver-prd/` skill. The bundles are optional workflow guides, not requirements.

</details>

<details>
<summary><strong>Can I use PM-Skills with ChatGPT?</strong></summary>

Yes, with some limitations. You can copy the contents of any `SKILL.md` file into your ChatGPT conversation as context. However, ChatGPT doesn't support the Agent Skills Specification natively, so you won't get automatic skill discovery or slash commands. For the best experience, we recommend Claude, GitHub Copilot, Cursor, or Windsurf.

</details>

<details>
<summary><strong>How do I customize a skill for my team?</strong></summary>

Fork the repository and modify the `SKILL.md`, `TEMPLATE.md`, or `EXAMPLE.md` files to match your team's standards. You can add company-specific sections, change terminology, or adjust the output format. The Apache 2.0 license allows commercial use and modification.

</details>

<details>
<summary><strong>What's the difference between skills and bundles?</strong></summary>

**Skills** are atomic units-each produces one PM artifact (a PRD, a hypothesis, user stories, etc.). **Bundles** are curated workflows that chain multiple skills together in a recommended sequence. Use skills when you need a specific output; use bundles when you want guided end-to-end processes.

</details>

<details>
<summary><strong>Why doesn't PM-Skills work with openskills CLI?</strong></summary>

The openskills CLI discovers skills in `.claude/skills/` directories. PM-Skills now ships flat `skills/{phase-skill}/` plus a sync helper that populates `.claude/skills/` locally. Clone the repo, run `./scripts/sync-claude.sh` (or `.ps1`), and openskills/Claude Code will discover all 24 skills.

</details>

<details>
<summary><strong>Can I contribute new skills?</strong></summary>

Absolutely! Check out our [authoring guide](docs/guides/authoring-pm-skills.md) for the full process. We use a curated contribution model-submit a proposal via GitHub issue first, then create your skill following our template structure. All contributions are reviewed for quality and alignment with PM best practices.

</details>

<details>
<summary><strong>How do slash commands work in Claude Code?</strong></summary>

Slash commands (like `/prd` or `/hypothesis`) are shortcuts that invoke the corresponding skill. When you type `/prd \"my feature\"`, Claude Code reads the skill instructions from `skills/deliver-prd/SKILL.md` and generates output following the template. No additional setup required-the commands are defined in the `commands/` directory.

</details>

<!-- ========== NEW: MCP FAQ ========== -->
<details>
<summary><strong>What's the difference between pm-skills and pm-skills-mcp?</strong></summary>

**pm-skills** (this repo) is the source skill library with all 24 PM skills as markdown files. It's best for Claude Code slash commands, file browsing, and customization.

**pm-skills-mcp** wraps these same skills in an MCP server for programmatic access. It's best for Claude Desktop, Cursor, and any MCP-compatible client.

Both give you access to identical skills—choose based on your preferred client and workflow. See the [Ecosystem Overview](docs/reference/ecosystem.md) for a detailed comparison.

</details>
<!-- ========== END NEW ========== -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## About

### Author

<p align="center">
  <a href="https://github.com/jprisant">
    <img src="https://img.shields.io/badge/Created_by-Jonathan_Prisant-blue?style=for-the-badge&logo=github" alt="Created by Jonathan Prisant">
  </a>
</p>

Howdy, I'm Jonathan Prisant, a product leader/manager/nerd in the church technology space who gets unreasonably excited about understanding + solving problems, serving humans, designing elegant systems, and getting stuff done. I enjoy optimizing and scaling workflows more than is probably healthy... NOT because I'm particularly fond of "business process definition", but because I think in systems and value the outcomes of increased "effectiveness and efficiency" (i.e. doing less of the boring work and more of the work I actually enjoy).

I am a follower of Jesus Christ, grateful husband to my beloved, proud (and exhausted) dad of 4 humans of various sizes and ages, D&D geek, 3d printing enthusiast, formerly-consistent strength trainer, smart home enthusiast, insatiable learner, compulsive tech-experimenter, writer-of-words that aggregate into sentences and paragraphs, and a bunch of other stuff too. I have too many projects going on across too many domains and need better self control, but hopefully you find this open-source repo helpful and useful.

*If PM-Skills has helped you ship better products, consider giving the repo a star and sharing it with your team.*

### License

Distributed under the **Apache License 2.0**. See [LICENSE](LICENSE) for more information.

This means you can:

- Use PM-Skills commercially
- Modify and distribute
- Use privately
- Include in proprietary software

The only requirements are attribution and including the license notice.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Community

Have ideas for making PM-Skills even better? Here are some ways to contribute and connect:

**Feature Ideas**

- Open a [feature request](https://github.com/product-on-purpose/pm-skills/issues/new?labels=enhancement) to suggest new skills or improvements
- Join the [Discussions](https://github.com/product-on-purpose/pm-skills/discussions) to brainstorm with the community

**Skill Contributions**

- Check out our [authoring guide](docs/guides/authoring-pm-skills.md) to create your own skills
- Review the [skill template](docs/templates/skill-template/) for the expected structure

**Spread the Word**

- Give the repo a star if you find it useful
- Share PM-Skills on Twitter, LinkedIn, or your favorite PM community
- Write a blog post about how you use PM-Skills in your workflow

**Feedback**

- Found something confusing? [Open an issue](https://github.com/product-on-purpose/pm-skills/issues/new)
- Want to chat? Start a [discussion](https://github.com/product-on-purpose/pm-skills/discussions)

---

<p align="center">
  <strong>Built with purpose by <a href="https://github.com/product-on-purpose">Product on Purpose</a></strong><br>
  <sub>Helping teams ship better products with AI-powered PM workflows</sub>
</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
