<a id="readme-top"></a>

<h1 align="center">
  <a href="https://github.com/product-on-purpose/pm-skills">PM-Skills</a>
</h1>

<h4 align="center">A curated library of 63 best-practice, plug-and-play product management skills covering the complete product lifecycle - plus templates, workflows, and 95+ real-world sample outputs that set the quality bar.</h4>

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
    <img src="https://img.shields.io/badge/version-2.21.0-blue.svg?style=flat-square" alt="Version">
  </a>
  <a href="#the-skill-library">
    <img src="https://img.shields.io/badge/skills-63-brightgreen.svg?style=flat-square" alt="Skills">
  </a>
  <a href="https://agentskills.io/specification">
    <img src="https://img.shields.io/badge/spec-agentskills.io-orange.svg?style=flat-square" alt="Agent Skills Spec">
  </a>
  <a href="https://skills.sh/product-on-purpose/pm-skills">
    <img src="https://img.shields.io/badge/skills.sh-install-6f42c1.svg?style=flat-square" alt="Install via skills.sh">
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

<p align="center">
  <a href="https://github.com/product-on-purpose/pm-skills-mcp">
    <img src="https://img.shields.io/badge/MCP_Server-maintenance%20mode-yellow.svg?style=flat-square" alt="MCP Server: Maintenance Mode">
  </a>
</p>

<p align="center">
  <a href="#the-big-idea">About</a> •
  <a href="#installation-and-setup">Install</a> •
  <a href="#the-skill-library">Skills</a> •
  <a href="#sub-agents">Sub-Agents</a> •
  <a href="#workflows">Workflows</a> •
  <a href="#learning-and-resources">Learning</a> •
  <a href="#project-status">Status</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#community">Community</a>
</p>

---

<details>
<summary><strong>Table of Contents</strong></summary>

- [Quick Start](#quick-start)
- [Recent Updates](#recent-updates)
- [The Big Idea](#the-big-idea)
    - [Who Is This For](#who-is-this-for)
    - [Key Features](#key-features)
    - [Skill Lifecycle Tools](#skill-lifecycle-tools--custom-skill-builder)
    - [Founded On](#founded-on)
- [Installation and Setup](#installation-and-setup)
- [How Agent Skills Work](#how-agent-skills-work)
- [The Skill Library](#the-skill-library)
    - [Foundation Skills](#foundation-skills---cross-cutting-capability-8)
    - [Discover Phase Skills](#discover---find-and-assess-the-right-problem-5)
    - [Define Phase Skills](#define---frame-the-problem-5)
    - [Develop Phase Skills](#develop---explore-solutions-4)
    - [Deliver Phase Skills](#deliver---ship-it-6)
    - [Measure Phase Skills](#measure---validate-with-data-6)
    - [Iterate Phase Skills](#iterate---learn-and-improve-4)
    - [Tool Family: Foundation Sprint](#tool-family-foundation-sprint-7)
    - [Tool Family: Design Sprint](#tool-family-design-sprint-7)
    - [Standalone Tool Skill](#standalone-tool-skill)
    - [Utility Skills](#utility-skills---meta-tooling-10)
    - [Sub-Agents](#sub-agents)
    - [Workflows](#workflows-skill-chaining)
- [Library Examples](#library-examples)
- [Learning and Resources](#learning-and-resources)
- [Project Status](#project-status)
- [Contributing](#contributing)
- [Community](#community)
- [FAQ](#faq)
- [About the Author](#about-the-author)

</details>

---

## Quick Start

After installing, you'll have 73 slash commands available (like `/pm-skills:deliver-prd`, `/pm-skills:define-hypothesis`, `/pm-skills:deliver-user-stories`) plus access to templates, workflows, sub-agents, and 95+ sample outputs.

**Claude Code (recommended):**

```bash
/plugin marketplace add product-on-purpose/agent-plugins
/plugin install pm-skills@product-on-purpose
```

> Already installed via the old `pm-skills-marketplace`? It keeps working - no action needed. To move to the new home, see the [v2.21.0 release notes](docs/releases/Release_v2.21.0.md).

**Cross-agent (Cursor, Copilot, Cline, and others via the open [skills CLI](https://github.com/vercel-labs/skills)):**

```bash
npx skills add product-on-purpose/pm-skills
```

**Clone or download:**

```bash
git clone https://github.com/product-on-purpose/pm-skills.git
```

[![Download Latest](https://img.shields.io/github/v/release/product-on-purpose/pm-skills?style=for-the-badge&label=Download&color=brightgreen)](https://github.com/product-on-purpose/pm-skills/releases/latest)

**More resources:**

- [Getting Started Guide](docs/getting-started/index.md) - Detailed walkthrough for new users covering clone, sync helper, and first skill run. The path to take if any of the quick start steps above leave gaps.
- [Setup by Platform](docs/getting-started/platforms.md) - Step-by-step install for Claude.ai, Codex, Cursor, Windsurf, GitHub Copilot, VS Code extensions, and ChatGPT.
- [Quickstart Reference](docs/getting-started/quickstart.md) - Short-form reference card for users who just need the commands.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Recent Updates

<details>
<summary><strong>MCP Server: Maintenance Mode (effective 2026-05-04)</strong></summary>

The companion [`pm-skills-mcp`](https://github.com/product-on-purpose/pm-skills-mcp) server is in the v2.9.x maintenance line (latest v2.9.3) and remains available on npm for clients that need MCP transport. The catalog is frozen at the v2.9.2 build; subsequent v2.9.x patches do not change the catalog. Active development on the MCP server is paused; security patches and critical bug fixes will continue.

> **Recommendation:** For new users, we recommend using the plugin. See [Installation and Setup](#installation-and-setup) for other options.


</details>

---

**What's New**

<!-- count-exempt:start -->

<details>
<summary><strong>v2.21.0 - Marketplace Launch (additive)</strong></summary>

**What changed.** pm-skills is now published through the new `product-on-purpose` marketplace, a single home for multiple Product on Purpose plugins. This is a distribution change only: your skills, commands, and their behavior are identical (catalog stays 63; 73 commands). The previous install path keeps working, so existing installs need no action; the new marketplace is simply the recommended home going forward. Shipped as a minor because nothing you rely on was removed.

**Get started.** [`docs/releases/Release_v2.21.0.md`](docs/releases/Release_v2.21.0.md)

</details>

<details>
<summary><strong>v2.20.0 - Sprint Workflow Commands + Validation Hardening</strong></summary>

**What changed.** The three workshop methodologies are now single slash commands: `/workflow-foundation-sprint`, `/workflow-design-sprint`, and `/workflow-foundation-to-design` chain their per-day sprint skills end-to-end (slash commands 70 to 73; no new skills, catalog stays 63). Under the hood the gate got stricter: the command-sync validator now requires every advertised `/workflow-` command to have a real file, and the count-consistency validator now catches stale counts in table, parenthetical, and "N command files" phrasings (not just "N commands") - which surfaced and fixed count drift across several reference docs. The near-vestigial bundle-terminology validator was removed.

**Get started.** [`docs/releases/Release_v2.20.0.md`](docs/releases/Release_v2.20.0.md)

</details>

<details>
<summary><strong>v2.19.0 - Pre-Promotion Hardening</strong></summary>

**What changed.** Nothing you use behaves differently - no new skills, no changed commands, the catalog stays at 63. What improved is trust. The library's automated checks now catch the defect classes that slipped past CI in v2.18.0 and previously needed a human to spot: stale counts on the docs site, references to skills that do not exist, and dead internal links. Under the hood that means a new cross-reference validator, `.mdx` count scanning, same-page anchor validation (23 pre-existing breaks fixed), an enforced version badge, pinned line endings, an honestly-scoped local validator bundle, and a branded 404 page. This is the hardening pass before pm-skills is actively promoted, so anyone adopting it can rely on the catalog staying internally consistent.

**Get started.** [`docs/releases/Release_v2.19.0.md`](docs/releases/Release_v2.19.0.md)

</details>

<details>
<summary><strong>v2.18.0 - Highest-Consensus PM Skill Gaps</strong></summary>

**What changed.** Four new phase skills close the highest-consensus PM gaps: `market-sizing` (TAM/SAM/SOM via multi-framework triangulation), `prioritization-framework` (RICE, ICE, MoSCoW, Weighted Scoring, and Kano run in parallel with a cross-framework comparison), `journey-map` (stages, touchpoints, emotional curve, and moments of truth), and `survey-analysis` (honest analysis with explicit limitation warnings). The catalog grows from 59 to 63 skills; each new skill refuses to fabricate data and labels confidence honestly.

**Get started.** [`docs/releases/Release_v2.18.0.md`](docs/releases/Release_v2.18.0.md)

</details>

<details>
<summary><strong>v2.17.0 - Native Sub-Agent Registration</strong></summary>

**What changed.** The 4 sub-agents now register natively on Claude Code: their definitions moved to the canonical `agents/` directory, so `@pm-critic` (and the other three) auto-discover and dispatch via `@`-mention. To free the `agents/` name on case-insensitive filesystems, the agent-coordination directory was renamed from `AGENTS/` to `_agent-context/`. Skill frontmatter also migrated to the metadata-nested structure per the agentskills.io spec, and the CI validators are now bash-3.2 portable. The 59-skill catalog is unchanged; cross-client clients keep working via the dispatch skills.

**Get started.** [`docs/releases/Release_v2.17.0.md`](docs/releases/Release_v2.17.0.md)

</details>

<details>
<summary><strong>v2.16.2 - Release Hygiene and GitHub Release Body Update</strong></summary>

**What changed.** Post-tag plan SHIPPED state updates and GitHub Release body corrections following the v2.16.1 patch cycle.

**Get started.** [`docs/releases/Release_v2.16.2.md`](docs/releases/Release_v2.16.2.md)

</details>

<details>
<summary><strong>v2.16.1 - Plugin Manifest Fix</strong></summary>

**What changed.** Removed the invalid `agents` field from `plugin.json` that was causing `/plugin update pm-skills` to fail with an "Invalid input" error since v2.16.0. If you ran into that error, update to this version.

**Get started.** [`docs/releases/Release_v2.16.1.md`](docs/releases/Release_v2.16.1.md)

</details>

<details open>
<summary><strong>v2.16.0 - Active Orchestration with Sub-Agents</strong></summary>

**What changed.** First 4 active-orchestration sub-agents shipped (pm-critic, pm-skill-auditor, pm-changelog-curator, pm-release-conductor), giving Claude Code a stable interface for spawning sub-tasks against the catalog. 4 dispatch skills extend sub-agent-shaped flows to Codex, Cursor, Windsurf, Copilot, and Gemini CLI. The 6-gate pre-tag release runbook is now written down.

**Why it matters.** Foundation work for chained workflows that don't need a human in the handoff loop.

**Get started.** [`docs/reference/runtime-components.md`](docs/reference/runtime-components.md) - [`docs/releases/Release_v2.16.0.md`](docs/releases/Release_v2.16.0.md)

</details>

<details>
<summary><strong>v2.15.0 - Sprint Skills Launch</strong></summary>

**What changed.** 15 new skills under a new `classification: tool` taxonomy. Foundation Sprint family (Knapp/Zeratsky 2-day workshop methodology) + Design Sprint family (Knapp/Zeratsky/Kowitz 5-day workshop methodology) + standalone `note-and-vote`. Catalog grows from 40 to 55. New `foundation-to-design` workflow chains both end-to-end.

**Why it matters.** If you run structured workshop sessions, the agent runs the workshop with you using canonical moves; outputs are workshop artifacts.

**Get started.** [`docs/concepts/foundation-sprint.md`](docs/concepts/foundation-sprint.md) - [`docs/concepts/design-sprint.md`](docs/concepts/design-sprint.md) - [`docs/releases/Release_v2.15.0.md`](docs/releases/Release_v2.15.0.md)

</details>

<details>
<summary><strong>v2.14.x - Doc Stack Migration to Astro Starlight</strong></summary>

**What changed.** Retired MkDocs Material; migrated to Astro Starlight. Pagefind full-text search, native dark mode, Node 22.x build. v2.14.1 added the Mermaid style guide; v2.14.2 closed a cumulative docs hygiene patch.

**Why it matters.** Search works (full-text, instant). Forkers: Node 22.x is now required, not Python pip.

**Get started.** [product-on-purpose.github.io/pm-skills](https://product-on-purpose.github.io/pm-skills/) - [`docs/releases/Release_v2.14.0.md`](docs/releases/Release_v2.14.0.md)

</details>

<details>
<summary><strong>v2.13.x - Plugin Install Path Correction</strong></summary>

**What changed.** Fixed `/plugin marketplace add` install. Moved `marketplace.json` to `.claude-plugin/`; added the required `owner` schema field; introduced an enforcing `validate-plugin-install` CI script.

**Why it matters.** Before v2.13.1, the marketplace install failed silently. After v2.13.1, it is the recommended Claude Code path.

**Get started.** [`docs/releases/Release_v2.13.1.md`](docs/releases/Release_v2.13.1.md)

</details>

<details>
<summary><strong>v2.12.0 - OKR Skills</strong></summary>

**What changed.** OKR-focused skill set: `okr-writer` (foundation) and `okr-grader` (measure), plus the operational pattern for using them across a quarter.

**Why it matters.** OKR structure, KR quality bar, and grading rubric are encoded as skills your agent runs consistently across cycles.

**Get started.** [`docs/releases/Release_v2.12.0.md`](docs/releases/Release_v2.12.0.md)

</details>

<!-- count-exempt:end -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## The Big Idea

**Stop prompt-fumbling. Start shipping.** Every time you ask an AI to help with product management, you start from zero. Generic responses. Inconsistent formats. Missing critical sections. Hours lost to repetitive prompt crafting.

PM-Skills gives your AI instant access to professional frameworks refined across hundreds of product launches, production-ready templates that capture institutional PM knowledge, and real-world examples that set the quality bar.

| Without PM-Skills                 | With PM-Skills                  |
| --------------------------------- | ------------------------------- |
| ⚠️ Generic AI responses          | ✅ Professional PM frameworks   |
| ⚠️ Inconsistent formats          | ✅ Production-ready templates   |
| ⚠️ Missing key sections          | ✅ Comprehensive coverage       |
| ⚠️ Starting from scratch         | ✅ Building on best practices   |
| ⚠️ Prompt engineering every time | ✅ One command, instant results |

### Who Is This For

| You are...                            | PM-Skills gives you...                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------------------- |
| A solo PM using AI for the first time | A starting point that skips prompt engineering and produces professional output immediately |
| A team lead standardizing PM output   | Shared skill library your whole team invokes the same way, producing consistent artifacts   |
| An AI/PM builder creating PM tools    | Open-source, Apache 2.0 library of production-quality PM artifacts to build on              |

### Key Features

- ✅ **63 Production-Ready Skills** covering the complete product lifecycle (30 phase skills + 8 foundation skills + 10 utility skills + 15 tool skills for structured workshop methodologies)
- ✅ **Triple Diamond Framework** organizing Discover, Define, Develop, Deliver, Measure, and Iterate phases
- ✅ **Tool Families** for the Foundation Sprint (2-day strategic alignment) and Design Sprint (5-day prototype-and-test) workshop methodologies
- ✅ **4 Active Orchestration Sub-Agents** (pm-critic, pm-skill-auditor, pm-changelog-curator, pm-release-conductor) for Claude Code, with dispatch skills extending the pattern to Codex, Cursor, Windsurf, Copilot, and Gemini CLI
- ✅ **12 Workflows** for common PM processes including Feature Kickoff, Lean Startup, Triple Diamond, and foundation-to-design end-to-end arc
- ✅ **73 Slash Commands** for Claude Code users - instant access to every skill, workflow, and sub-agent
- ✅ **Auto-Discovery** via AGENTS.md in GitHub Copilot, Cursor, and Windsurf
- ✅ **Agent Skills Spec** compliant - works across AI assistants
- ✅ **Apache 2.0 Licensed** for commercial and personal use

### Skill Lifecycle Tools = Custom Skill Builder

PM-Skills includes three utility skills that form a complete **Create - Validate - Iterate** lifecycle for building and managing skills:

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#fffbeb', 'primaryBorderColor': '#fde68a', 'lineColor': '#92400e'}}}%%
flowchart LR
    classDef create fill:#ea580c,stroke:#c2410c,color:#fff,font-weight:bold
    classDef validate fill:#0284c7,stroke:#0369a1,color:#fff,font-weight:bold
    classDef decision fill:#374151,stroke:#1f2937,color:#fff
    classDef ship fill:#166534,stroke:#14532d,color:#fff,font-weight:bold
    classDef iterate fill:#7c3aed,stroke:#6d28d9,color:#fff,font-weight:bold

    Create["utility-pm-skill-builder<br/>Create new skill<br/>from an idea"]:::create
    Validate["utility-pm-skill-validate<br/>Audit structure<br/>and quality"]:::validate
    Decision{"Findings?"}:::decision
    Ship["Ship<br/>to library"]:::ship
    Iterate["utility-pm-skill-iterate<br/>Apply targeted<br/>improvements"]:::iterate

    Create --> Validate
    Validate --> Decision
    Decision -- "PASS" --> Ship
    Decision -- "WARN / FAIL" --> Iterate
    Iterate --> Validate
```

**Why this matters:** Skills are living artifacts that evolve. The builder creates them, the validator catches drift and quality gaps, and the iterator applies fixes. Together they keep the library consistent as it grows.

| Tool & Command                      | What it does                                                                                         |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Builder:** `/pm-skills:utility-pm-skill-builder`    | Creates a new skill from an idea. Runs gap analysis against existing skills, classifies by type and phase, generates draft files to a staging area, and promotes on confirmation. |
| **Validator:** `/pm-skills:utility-pm-skill-validate` | Audits an existing skill against structural conventions and quality criteria. Produces a report with severity-graded findings and actionable recommendations. |
| **Iterator:** `/pm-skills:utility-pm-skill-iterate`   | Applies targeted improvements to a skill based on feedback or a validation report. Previews changes, writes on confirmation, and suggests a version bump. |

🔗 **More resources:**

- [**PM Skill Lifecycle Guide**](docs/guides/pm-skill-lifecycle.md) - Full workflow for creating, validating, and iterating skills, including the builder-validator-iterator cycle with worked examples.
- [**Creating PM Skills**](docs/guides/creating-pm-skills.md) - Authoring guide for contributing new skills to the library.
- [**Skill Template**](docs/templates/skill-template/) - The canonical three-file template every skill must follow; copy this as your starting point.

### Founded On

- **[Triple Diamond Framework](https://medium.com/zendesk-creative-blog/the-zendesk-triple-diamond-process-fd857a11c179)** - Six-phase product cycle (extends Design Council's Double Diamond): Discover, Define, Develop, Deliver, Measure, Iterate
- **[Opportunity Solution Trees](https://www.producttalk.org/opportunity-solution-tree/) (Teresa Torres)** - Outcome-driven discovery
- **[Jobs to be Done Framework](https://jtbd.info/)** - Customer motivation framework
- **[Foundation Sprint](https://www.jakeknapp.com/foundation-sprint) (Knapp/Zeratsky)** - 2-day structured workshop methodology for early-stage strategic alignment: basics, differentiation, approach options, magic lenses, founding hypothesis, brief
- **[Design Sprint](https://www.thesprintbook.com/) (Knapp/Zeratsky/Kowitz)** - 5-day structured workshop methodology for prototype-and-test cycles: map-and-target, sketch, decide-and-storyboard, prototype-plan, test-and-score
- **[Architecture Decision Records](https://adr.github.io/) (Michael Nygard format)** - Technical decision documentation

<p align="left">
  <a href="https://agentskills.io/specification">
    <img src="https://img.shields.io/badge/Agent_Skills_Spec-compliant-orange?style=for-the-badge" alt="Agent Skills Spec">
  </a>
  <a href="https://github.github.com/gfm/">
    <img src="https://img.shields.io/badge/Markdown-GFM-black?style=for-the-badge&logo=markdown" alt="GitHub Flavored Markdown">
  </a>
  <a href="https://github.com/features/actions">
    <img src="https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="GitHub Actions">
  </a>
</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Installation and Setup

### Tool Compatibility

| Platform                       | Native Skills? | Notes                                    |
| ------------------------------ | :------------: | ---------------------------------------- |
| **Claude Code**                | ✅ Yes         | Plugin marketplace + 73 slash commands   |
| **GitHub Copilot**             | ✅ Yes         | AGENTS.md auto-discovery from clone      |
| **Cursor**                     | ✅ Yes         | AGENTS.md auto-discovery from clone      |
| **Windsurf**                   | ✅ Yes         | AGENTS.md auto-discovery from clone      |
| **Codex (OpenAI)**             | ✅ Yes         | AGENTS.md auto-discovery from clone      |
| **OpenCode**                   | ✅ Yes         | Direct skill loading from clone          |
| **VS Code (Cline, Continue)**  | ✅ Yes         | AGENTS.md auto-discovery from clone      |
| **Claude.ai / Claude Desktop** | ✔️ Manual     | ZIP upload to Project Files              |
| **ChatGPT / other LLMs**       | ✔️ Manual     | Paste SKILL.md content into conversation |

### Featured Install Paths

**Claude Code - Plugin Marketplace (recommended)**

```bash
/plugin marketplace add product-on-purpose/agent-plugins
/plugin install pm-skills@product-on-purpose
```

> Already installed via the old `pm-skills-marketplace`? It keeps working - no action needed. To move to the new home, see the [v2.21.0 release notes](docs/releases/Release_v2.21.0.md).

All 63 skills and their slash commands become available immediately. No clone required.

**Cross-Agent via skills CLI (Cursor, Copilot, Cline, and others)**

```bash
npx skills add product-on-purpose/pm-skills
```

The open [skills CLI](https://github.com/vercel-labs/skills) from Vercel Labs scans the `skills/` directory and installs all 63 skills into your agent's default skills directory. Works with Claude Code, Cursor, GitHub Copilot, Cline, and any other agent that supports the skills ecosystem. Discoverable via [skills.sh/product-on-purpose/pm-skills](https://skills.sh/product-on-purpose/pm-skills).

Telemetry is anonymous and opt-out via `DISABLE_TELEMETRY=1` or `DO_NOT_TRACK=1`.

**Git Clone (manual path, everything included)**

```bash
git clone https://github.com/product-on-purpose/pm-skills.git
cd pm-skills
```

Gives you the full repo: skill files, slash commands, sample library, workflows, and documentation. Use this path when you want local access to sample outputs, plan to customize skills, or prefer not to depend on a CLI.

Optional: after cloning, run `./scripts/sync-claude.sh` (macOS/Linux) or `./scripts/sync-claude.ps1` (Windows) to populate `.claude/skills/` for agents that use that discovery path.

### Additional Install Methods

For Claude.ai, MCP clients, OpenCode, Windsurf, and ChatGPT, see the full [Platform Setup Guide](docs/getting-started/platforms.md) for step-by-step instructions.

| Platform                    | How                                 | Guide                                                                                          |
| --------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------- |
| Claude.ai / Claude Desktop  | ZIP upload to Project Files         | [Platform guide](docs/getting-started/platforms.md#claudeai--claude-desktop) |
| MCP Server (any MCP client) | `npx pm-skills-mcp`                 | [pm-skills-mcp repo](https://github.com/product-on-purpose/pm-skills-mcp)                      |
| GitHub Copilot              | AGENTS.md auto-discovery from clone | [Platform guide](docs/getting-started/platforms.md#github-copilot)           |
| OpenCode                    | Direct skill loading from clone     | [Platform guide](docs/getting-started/platforms.md#opencode)                 |
| Cursor / Windsurf           | AGENTS.md auto-discovery            | [Platform guide](docs/getting-started/platforms.md#cursor)         |
| VS Code (Cline / Continue)  | AGENTS.md auto-discovery            | [Platform guide](docs/getting-started/platforms.md#vs-code-cline--continue)  |
| ChatGPT / other LLMs        | Copy SKILL.md into conversation     | [Platform guide](docs/getting-started/platforms.md#chatgpt--other-llms)      |

**More resources:**

- [**Getting Started Guide**](docs/getting-started/index.md) - Detailed walkthrough for new users covering all install methods, the sync helper script, and your first skill run end-to-end.
- [**Quickstart Reference**](docs/getting-started/quickstart.md) - Short-form reference card with just the essential commands.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## How Agent Skills Work

Each skill is a self-contained instruction set in three files:

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#f8fafc', 'primaryBorderColor': '#cbd5e1', 'lineColor': '#64748b'}}}%%
flowchart LR
    classDef user fill:#1e293b,stroke:#0f172a,color:#f8fafc,font-weight:bold
    classDef agent fill:#4f46e5,stroke:#3730a3,color:#fff,font-weight:bold
    classDef skillFile fill:#7c3aed,stroke:#5b21b6,color:#fff
    classDef templateFile fill:#0284c7,stroke:#0369a1,color:#fff
    classDef exampleFile fill:#059669,stroke:#047857,color:#fff
    classDef output fill:#166534,stroke:#14532d,color:#fff,font-weight:bold

    User["You<br/>deliver-prd 'topic'"]:::user
    Agent["Your Agent"]:::agent
    SKILL["SKILL.md<br/>the method"]:::skillFile
    TEMPLATE["TEMPLATE.md<br/>the structure"]:::templateFile
    EXAMPLE["EXAMPLE.md<br/>the quality bar"]:::exampleFile
    Output["Complete artifact"]:::output

    User -- invokes --> Agent
    Agent -- reads --> SKILL
    Agent -- fills --> TEMPLATE
    Agent -- mirrors --> EXAMPLE
    SKILL --> Output
    TEMPLATE --> Output
    EXAMPLE --> Output
```

```
skills/deliver-prd/
  SKILL.md                  # the method the agent reads
  references/
    TEMPLATE.md             # the structure the output follows
    EXAMPLE.md              # the worked example that anchors quality
```

When you run `/pm-skills:deliver-prd "topic"`, the agent loads the skill, mirrors the example, fills the template, and produces a complete PRD. No prompt engineering required.

| Property                    | What it gives you                                                              |
| --------------------------- | ------------------------------------------------------------------------------ |
| **Declarative**             | The skill says *what a good PRD is*, not *how to phrase a prompt*              |
| **Example-anchored**        | The worked example sets the quality bar; the agent mirrors depth and structure |
| **Structurally contracted** | The template enforces sections-present and sections-complete                   |

🔗 **More resources:**

- **[PM Skill Anatomy](docs/reference/pm-skill-anatomy.md)** - Deep dive into the three-file structure (SKILL.md, TEMPLATE.md, EXAMPLE.md) and what each file contributes to output quality. Essential reading before authoring your first skill.
- **[Skill Finder](docs/guides/skill-finder.md)** - Decision guide for choosing the right skill when you know the outcome you need but aren't sure which skill produces it.
- [**PM Skill Comparisons**](docs/guides/pm-skill-comparisons.md) - Side-by-side comparison of overlapping skills. Prevents the common mistake of reaching for `problem-statement` when `opportunity-tree` is the right fit.
- [**Sub-Agents**](#sub-agents) - Claude Code also supports spawnable specialist agents for tasks that benefit from a dedicated agent context: adversarial review, catalog auditing, changelog curation, and release orchestration.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<a id="the-skill-library"></a>

## The Skill Library

<p>
  <img src="https://img.shields.io/badge/Phase-30_skills-7c3aed?style=for-the-badge" alt="Phase Skills: 30">
  <img src="https://img.shields.io/badge/Foundation-8_skills-059669?style=for-the-badge" alt="Foundation Skills: 8">
  <img src="https://img.shields.io/badge/Tool_Families-15_skills-0284c7?style=for-the-badge" alt="Tool Family Skills: 15">
  <img src="https://img.shields.io/badge/Utility-10_skills-ea580c?style=for-the-badge" alt="Utility Skills: 10">
</p>

### At a Glance

<!-- count-exempt:start -->

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#f0f4ff', 'primaryBorderColor': '#c7d2fe', 'lineColor': '#6b7280', 'clusterBkg': '#f8fafc', 'clusterBorder': '#e2e8f0'}}}%%
flowchart TB
    classDef discover fill:#0891b2,stroke:#0e7490,color:#fff,font-weight:bold
    classDef define fill:#7c3aed,stroke:#6d28d9,color:#fff,font-weight:bold
    classDef develop fill:#d97706,stroke:#b45309,color:#fff,font-weight:bold
    classDef deliver fill:#16a34a,stroke:#15803d,color:#fff,font-weight:bold
    classDef measure fill:#dc2626,stroke:#b91c1c,color:#fff,font-weight:bold
    classDef iterate fill:#9333ea,stroke:#7e22ce,color:#fff,font-weight:bold
    classDef tool fill:#0284c7,stroke:#0369a1,color:#fff
    classDef foundation fill:#059669,stroke:#047857,color:#fff
    classDef utility fill:#ea580c,stroke:#c2410c,color:#fff

    subgraph PHASE["Triple Diamond Phase Skills (30)"]
        direction LR
        DI["Discover<br/>5 skills"]:::discover
        DE["Define<br/>5 skills"]:::define
        DEV["Develop<br/>4 skills"]:::develop
        DEL["Deliver<br/>6 skills"]:::deliver
        ME["Measure<br/>6 skills"]:::measure
        IT["Iterate<br/>4 skills"]:::iterate

        DI --> DE --> DEV --> DEL --> ME --> IT
        IT -."feedback loop".-> DI
    end

    subgraph WORKSHOP["Workshop Tool Families (15 skills)"]
        direction LR
        FS["Foundation Sprint<br/>7 skills<br/>2-day strategic alignment"]:::tool
        DS["Design Sprint<br/>7 skills<br/>5-day prototype-and-test"]:::tool
        NV["note-and-vote<br/>1 skill<br/>standalone mechanic"]:::tool
        FS --> DS
    end

    subgraph SUPPORT["Cross-Cutting Capabilities (18 skills)"]
        direction LR
        FOUND["Foundation<br/>8 skills<br/>persona, lean-canvas,<br/>OKRs, meetings"]:::foundation
        UTIL["Utility<br/>10 skills<br/>meta-tooling"]:::utility
    end

    PHASE -.uses.-> SUPPORT
    WORKSHOP -.uses.-> SUPPORT
```

<!-- count-exempt:end -->

| Classification                       | Count | What's in it                                                                                         |
| ------------------------------------ | ----: | ---------------------------------------------------------------------------------------------------- |
| **Phase** (Triple Diamond)           | 30    | One skill per major PM activity across Discover, Define, Develop, Deliver, Measure, and Iterate      |
| **Foundation** (cross-cutting)       | 8     | Persona, lean canvas, OKRs, and the full meeting skills family                                       |
| **Utility** (meta-tooling)           | 10    | pm-skill-builder, pm-skill-validate, pm-skill-iterate, mermaid-diagrams, slideshow-creator, update-pm-skills, and helpers |
| **Tool Families** (workshop methods) | 15    | Foundation Sprint family (7) + Design Sprint family (7) + note-and-vote (1)                          |

---

### Foundation Skills - Cross-cutting capability (8)

| Skill                  | What it does                                                                      |
| ---------------------- | --------------------------------------------------------------------------------- |
| **persona**            | Generate product or marketing personas with evidence and confidence ratings       |
| **lean-canvas**        | Capture problem, customer segment, value proposition, and key metrics on one page |
| **okr-writer**         | Draft an objectives-and-key-results plan with tight, measurable key results       |
| **stakeholder-update** | Compose a stakeholder-facing update from project state and recent activity        |
| **meeting-agenda**     | Draft a focused agenda from purpose, attendees, and time-box                      |
| **meeting-brief**      | One-page brief priming attendees with context and pre-reads                       |
| **meeting-recap**      | Synthesize a meeting transcript into decisions, actions, and follow-ups           |
| **meeting-synthesize** | Cross-meeting synthesis distilling themes from multiple sessions                  |

---

### Phase Skills: Triple Diamond

#### Discover - Find and assess the right problem (5)

| Skill                    | What it does                                                                       |
| ------------------------ | ---------------------------------------------------------------------------------- |
| **interview-synthesis**  | Turn raw user research into actionable insights, patterns, and design implications |
| **competitive-analysis** | Map the competitive landscape and identify gaps and differentiation opportunities  |
| **stakeholder-summary**  | Understand who the key stakeholders are, what they need, and how to engage them    |
| **journey-map**          | Map the customer journey: stages, touchpoints, emotional curve, pain points, and moments of truth |
| **market-sizing**        | Estimate market opportunity (TAM/SAM/SOM) with multiple frameworks and source-graded confidence |

#### Define - Frame the problem (5)

| Skill                 | What it does                                                           |
| --------------------- | ---------------------------------------------------------------------- |
| **problem-statement** | Crystal-clear problem framing with scope, impact, and success criteria |
| **hypothesis**        | Testable assumptions with measurable success conditions                |
| **opportunity-tree**  | Teresa Torres-style outcome-driven opportunity mapping                 |
| **jtbd-canvas**       | Jobs to be Done framework for understanding customer motivation        |
| **prioritization-framework** | Run RICE, ICE, MoSCoW, Weighted Scoring, and Kano in parallel with a cross-framework comparison |

#### Develop - Explore solutions (4)

| Skill                | What it does                                                     |
| -------------------- | ---------------------------------------------------------------- |
| **solution-brief**   | One-page solution pitch with tradeoffs and open questions        |
| **spike-summary**    | Document technical exploration outcomes and decisions            |
| **adr**              | Architecture Decision Records in Michael Nygard format           |
| **design-rationale** | Why you made that design choice, documented for future reference |

#### Deliver - Ship it (6)

| Skill                   | What it does                                                                                        |
| ----------------------- | --------------------------------------------------------------------------------------------------- |
| **prd**                 | Comprehensive product requirements document with problem, metrics, stories, scope, and dependencies |
| **user-stories**        | INVEST-compliant stories with acceptance criteria                                                   |
| **acceptance-criteria** | Given/When/Then testable scenarios                                                                  |
| **edge-cases**          | Error states, boundaries, and recovery paths                                                        |
| **launch-checklist**    | End-to-end launch checklist so nothing gets missed                                                  |
| **release-notes**       | User-facing release communication                                                                   |

#### Measure - Validate with data (6)

| Skill                      | What it does                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------ |
| **experiment-design**      | Rigorous A/B test planning with hypothesis, sample size, and success criteria        |
| **instrumentation-spec**   | Event tracking requirements for engineers                                            |
| **dashboard-requirements** | Analytics dashboard specifications                                                   |
| **experiment-results**     | Document and synthesize learnings from completed experiments                         |
| **okr-grader**             | Score completed OKR sets at cycle close with KR-level scoring and learning synthesis |
| **survey-analysis**        | Analyze survey results into persona segments, validated hypotheses, and honest limitation warnings |

#### Iterate - Learn and improve (4)

| Skill                | What it does                                                          |
| -------------------- | --------------------------------------------------------------------- |
| **retrospective**    | Team retros that produce real action items, not just feelings         |
| **lessons-log**      | Build organizational memory from repeated patterns and surprises      |
| **refinement-notes** | Capture backlog refinement outcomes and decision rationale            |
| **pivot-decision**   | Evidence-based pivot/persevere framework with clear decision criteria |

🔗 **More resources:**

- [Using Skills Guide](docs/guides/using-skills.md) - Practical guide to invoking skills across different agents, passing context effectively, and getting consistent outputs session to session.
- [Using Workflows Guide](docs/guides/using-workflows.md) - How to run multi-skill chains, handle handoffs between skills, and adapt workflows to your team's process.
- [Recipes](docs/guides/recipes.md) - Curated patterns for common PM scenarios: solo feature launch, quarterly OKR cycle, research-to-delivery arc.
- [Prompt Gallery](docs/guides/prompt-gallery.md) - Real prompts that produce excellent skill outputs, annotated with what makes each one effective.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### Tool Family: Foundation Sprint (7)

**A Foundation Sprint is a short, structured workshop that clarifies the problem space, target users, success metrics, constraints, and business context before creative exploration begins.** It ensures teams start with shared understanding and crisp definitions so downstream design and product decisions move faster and with fewer reversals.

**Run the full methodology with the [foundation-sprint workflow](_workflows/foundation-sprint.md).**

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#eff6ff', 'primaryBorderColor': '#bfdbfe', 'lineColor': '#3b82f6'}}}%%
flowchart LR
    classDef sprint fill:#0284c7,stroke:#0369a1,color:#fff,font-weight:bold
    classDef gate fill:#1d4ed8,stroke:#1e40af,color:#fff,font-weight:bold

    R["1. Readiness<br/>Go / No-Go check"]:::gate
    B["2. Basics<br/>Customer + Problem + Competition"]:::sprint
    Di["3. Differentiation<br/>2x2 advantage map"]:::sprint
    A["4. Approach Options<br/>3-5 high-level paths"]:::sprint
    M["5. Magic Lenses<br/>Score approaches"]:::sprint
    H["6. Founding Hypothesis<br/>Synthesize direction"]:::sprint
    Br["7. Brief<br/>One-page output"]:::gate

    R --> B --> Di --> A --> M --> H --> Br
```

| Skill                                     | What it does                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------------- |
| **foundation-sprint-readiness**           | Decision tree for evaluating whether a Foundation Sprint is the right next step |
| **foundation-sprint-basics**              | Establish the customer, problem, and competitive context (the founding 3-tuple) |
| **foundation-sprint-differentiation**     | Map your team's unique advantages on a 2x2 framework                            |
| **foundation-sprint-approach-options**    | Generate 3-5 high-level strategic approaches                                    |
| **foundation-sprint-magic-lenses**        | Score approaches across 3-4 critical evaluation lenses                          |
| **foundation-sprint-founding-hypothesis** | Synthesize the chosen approach into a testable founding hypothesis              |
| **foundation-sprint-brief**               | Produce the one-page sprint brief that serves as input for a Design Sprint      |

🔗 **More resources:**

- [**Foundation Sprint Concept Primer**](docs/concepts/foundation-sprint.md) - A Foundation Sprint is a 2-day structured workshop methodology developed by Jake Knapp and John Zeratsky. This primer explains what it is, when to use it, the 7-step sequence, and how it compares to a Design Sprint.
- [**Using Foundation Sprint**](docs/guides/using-foundation-sprint.md) - Operational guide for running the 7-skill Foundation Sprint sequence with an agent, including facilitation notes and output expectations for each step.
- [**Foundation Sprint FAQ**](docs/guides/foundation-sprint-faq.md) - Answers to common questions about the methodology: how long it takes, who should be in the room, what to do with the brief output, and when not to run it.
- [**Foundation Sprint Cheat Sheet**](docs/guides/foundation-sprint-cheat-sheet.md) - One-page quick reference for the day-arc, skill sequence, and key outputs.
- [**Foundation Sprint Case Studies**](docs/guides/foundation-sprint-case-studies.md) - Three fictional scenarios showing how different teams used the Foundation Sprint methodology at different stages.
- [**Foundation Sprint Recovery**](docs/guides/foundation-sprint-recovery.md) - What to do when a sprint produces a confusing founding hypothesis, the team disagrees on direction, or you want to redo a step.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### Tool Family: Design Sprint (7)

**A Design Sprint is a fast, structured process that helps teams understand a problem, explore solutions, build a prototype, and test it with real users in five days.** It reduces risk by forcing alignment and validation before any heavy engineering investment.

Run the full methodology with the [design-sprint workflow](_workflows/design-sprint.md). Chain it after a Foundation Sprint with [foundation-to-design](_workflows/foundation-to-design.md).

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#fdf4ff', 'primaryBorderColor': '#e9d5ff', 'lineColor': '#9333ea'}}}%%
flowchart LR
    classDef sprint fill:#7c3aed,stroke:#6d28d9,color:#fff
    classDef gate fill:#581c87,stroke:#3b0764,color:#fff,font-weight:bold
    classDef day fill:#6d28d9,stroke:#5b21b6,color:#fff

    R["Readiness<br/>Go / No-Go"]:::gate
    Br["Brief<br/>Goal + Questions"]:::sprint
    M["Day 1<br/>Map and Target"]:::day
    S["Day 2<br/>Sketch"]:::day
    D["Day 3<br/>Decide and Storyboard"]:::day
    P["Day 4<br/>Prototype Plan"]:::day
    T["Day 5<br/>Test and Score"]:::gate

    R --> Br --> M --> S --> D --> P --> T
```

| Skill                                   | What it does                                                                |
| --------------------------------------- | --------------------------------------------------------------------------- |
| **design-sprint-readiness**             | Decision tree for evaluating whether a Design Sprint is the right next step |
| **design-sprint-brief**                 | Pre-sprint brief: long-term goal and sprint questions                       |
| **design-sprint-map-and-target**        | Customer journey map and chosen target moment                               |
| **design-sprint-sketch**                | Structured 4-step individual sketch session                                 |
| **design-sprint-decide-and-storyboard** | Heat map, straw poll, decider vote, and storyboard                          |
| **design-sprint-prototype-plan**        | Realistic-enough Friday prototype plan                                      |
| **design-sprint-test-and-score**        | 5 customer interviews, scored patterns, and decision                        |

🔗 **More resources:**

- [**Design Sprint Concept Primer**](docs/concepts/design-sprint.md) - A Design Sprint is a 5-day structured workshop methodology developed at Google Ventures by Jake Knapp, John Zeratsky, and Braden Kowitz. This primer covers the methodology's heritage, the 5-day arc as implemented in this skill family, and how it differs from a physical in-person workshop.
- [**Using Design Sprint**](docs/guides/using-design-sprint.md) - Operational guide for running the 7-skill Design Sprint sequence with an agent, including what "realistic-enough" means for the prototype step and how to recruit for test day.
- [**Design Sprint FAQ**](docs/guides/design-sprint-faq.md) - Questions about prototype fidelity, user recruitment, scoring results, and what to do if no clear winner emerges after testing.
- [**Design Sprint Cheat Sheet**](docs/guides/design-sprint-cheat-sheet.md) - One-page quick reference for the 5-day arc, skill sequence, and key outputs.
- [**Design Sprint Case Studies**](docs/guides/design-sprint-case-studies.md) - Fictional scenarios applying the Design Sprint to B2C, B2B, and internal-tools product challenges.
- [**Design Sprint Recovery**](docs/guides/design-sprint-recovery.md) - What to do when prototype testing produces inconclusive results, the test fails entirely, or the team needs to iterate on the storyboard.
- **[Workshop Sprints vs Agile Sprints](docs/concepts/workshop-sprints-vs-agile-sprints.md)** - The disambiguation every Scrum team needs before running their first Design Sprint. Two completely different processes, one unfortunately shared word.
- **[Workshop Method Comparison](docs/reference/workshop-method-comparison.md)** - When to use Foundation Sprint vs Design Sprint vs other structured workshop approaches; includes a decision matrix.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### Standalone Tool Skill

| Skill             | What it does                                                                                         |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| **note-and-vote** | Group decision mechanic usable inside any workshop or meeting - silent capture, share aloud, dot vote, discuss top-voted only, decider calls it |

---

### Utility Skills - Meta-tooling (10)

| Skill                      | What it does                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **pm-skill-builder**       | Create new PM skills with gap analysis, classification, and guided drafting                                    |
| **pm-skill-validate**      | Audit a skill against structural conventions and quality criteria                                              |
| **pm-skill-iterate**       | Apply targeted improvements from feedback or validation reports                                                |
| **mermaid-diagrams**       | Create syntactically valid mermaid diagrams for product documents                                              |
| **slideshow-creator**      | Generate professional presentations from JSON deck specifications                                              |
| **update-pm-skills**       | Check for and apply updates to a local PM-Skills installation                                                  |
| **pm-critic**              | Adversarial quality reviewer for PM artifacts - also available as a [sub-agent](#sub-agents) in Claude Code   |
| **pm-skill-auditor**       | Cross-skill catalog auditor against structural and quality criteria - also available as a [sub-agent](#sub-agents) |
| **pm-changelog-curator**   | CHANGELOG manager and entry drafter following conventional commit rules - also available as a [sub-agent](#sub-agents) |
| **pm-release-conductor**   | Release orchestrator walking the 6-gate pre-tag runbook - also available as a [sub-agent](#sub-agents)         |

---

---

<a id="sub-agents"></a>

### Sub-Agents

**Sub-agents are specialist agents that Claude Code can spawn as autonomous sub-tasks within a larger session.** Unlike skills - which are instruction files your agent reads inline - a sub-agent is a separate agent instance launched for a focused job. It runs against the skills catalog, produces its output, and returns the result to the orchestrating session. The orchestrator continues with that output as context.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#f8fafc', 'primaryBorderColor': '#cbd5e1', 'lineColor': '#64748b', 'clusterBkg': '#f1f5f9', 'clusterBorder': '#cbd5e1'}}}%%
flowchart LR
    classDef orchestrator fill:#1e293b,stroke:#0f172a,color:#f8fafc,font-weight:bold
    classDef subagent fill:#4f46e5,stroke:#3730a3,color:#fff,font-weight:bold
    classDef catalog fill:#7c3aed,stroke:#5b21b6,color:#fff
    classDef output fill:#166534,stroke:#14532d,color:#fff,font-weight:bold

    O["Your Claude Code session<br/>(orchestrator)"]:::orchestrator
    subgraph SA["Sub-Agent (spawned instance)"]
        direction LR
        Agent["Specialist agent"]:::subagent
        Cat["Skills catalog"]:::catalog
        Agent -- reads --> Cat
    end
    Out["Focused output<br/>returned to session"]:::output

    O -- "spawns" --> SA
    SA --> Out
    Out -- "informs" --> O
```

For other platforms (Codex, Cursor, Windsurf, Copilot, Gemini CLI), each sub-agent ships as a paired utility skill with dispatch instructions that replicate the same workflow in standard skill invocation mode.

| Sub-Agent | Command | What it does |
| --------- | ------- | ------------ |
| **pm-critic** | `/pm-skills:utility-pm-critic` | Adversarial quality reviewer. Reads a PM artifact and produces a severity-graded findings report covering gaps, weak assumptions, and missing sections. Use it to stress-test a PRD, hypothesis, or opportunity tree before sharing with stakeholders. |
| **pm-skill-auditor** | `/pm-skills:utility-pm-skill-auditor` | Cross-skill catalog auditor. Checks a skill against structural conventions, frontmatter requirements, and quality criteria. Use it before contributing a new skill or after making changes to an existing one. |
| **pm-changelog-curator** | `/pm-skills:utility-pm-changelog-curator` | CHANGELOG manager. Drafts and formats changelog entries from git history and release context, following conventional commit classification rules and the repo's established CHANGELOG format. |
| **pm-release-conductor** | `/pm-skills:utility-pm-release-conductor` | Release orchestrator. Walks through the 6-gate pre-tag release runbook: pre-tag readiness, adversarial review, version bumps, tagging, artifact verification, and post-tag hygiene. |

🔗 **More resources:**

- [**Active Orchestration Guide**](docs/reference/runtime-components.md) - What sub-agents are, how Claude Code spawns them, the dispatch skill pattern for other platforms, and invocation examples for all four sub-agents.
- [**v2.16.0 Release Notes**](docs/releases/Release_v2.16.0.md) - The release that introduced active orchestration, including the rationale for the sub-agent model and how it connects to the broader skill ecosystem.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<a id="workflows"></a>

### Workflows (skill chaining)

Workflows combine multiple skills into guided, end-to-end processes that mirror how experienced product managers actually work. Each workflow provides a sequence of skills with handoff guidance between steps so context flows naturally from discovery through delivery.

| Workflow                                                       | Best for                                               | Skills included                                                    |
| -------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------ |
| **[Foundation to Design](_workflows/foundation-to-design.md)** | End-to-end strategic alignment into prototype-and-test | foundation-sprint-* + design-sprint-*                              |
| **[Foundation Sprint](_workflows/foundation-sprint.md)**       | 2-day strategic alignment only                         | All 7 foundation-sprint skills                                     |
| **[Design Sprint](_workflows/design-sprint.md)**               | 5-day prototype-and-test only                          | All 7 design-sprint skills                                         |
| **[Feature Kickoff](_workflows/feature-kickoff.md)**           | New features                                           | problem-statement, hypothesis, prd, user-stories, launch-checklist |
| **[Lean Startup](_workflows/lean-startup.md)**                 | Rapid validation                                       | hypothesis, experiment-design, experiment-results, pivot-decision  |
| **[Triple Diamond](_workflows/triple-diamond.md)**             | Major initiatives                                      | Full 30 phase-skill flow across 6 phases                           |
| **[Customer Discovery](_workflows/customer-discovery.md)**     | Research synthesis                                     | Raw research into a validated problem statement                    |
| **[Sprint Planning](_workflows/sprint-planning.md)**           | Sprint prep                                            | Sprint-ready stories from a backlog                                |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Library Examples

### Why Examples Matter More Than You Think

When you ask an AI to write a PRD, the output quality is anchored to its training data average. That average is mediocre. **The examples in this library are the floor, not the ceiling.** They are the quality signal your agent calibrates against before writing anything.

There are two layers of examples:

1. **Skill-level `EXAMPLE.md`** - every skill ships with a worked example sitting right next to the SKILL.md. This is what the agent reads at the moment it runs the skill.
1. **Library samples** (`library/skill-output-samples/`) - 95+ full outputs across three narrative threads. These are for *you*, not just the agent: read them before a skill run to calibrate expectations, or browse them to understand what a skill you haven't used actually produces.

### Varied Prompt Maturity to Reflect Reality

**The samples in this library intentionally vary in how polished the prompts are...** Some use carefully structured, multi-turn context; others are more direct single invocations. This was a deliberate choice for two reasons:

- **To reflect real life.** The AI tooling landscape is evolving fast. Product managers are figuring out what works in real time. A library full of "perfect" prompts would misrepresent how most people actually work with AI today.
- **To lower the bar for experimentation.** The goal of this library is to encourage you to try, not to intimidate you with a gallery of polished outputs. If a sample was produced with a rough prompt and still looks good, that's a feature - it means the skill is doing the heavy lifting.

**You'll find a natural range across the samples:**

- Direct invocations with minimal context (most Brainshelf samples, early-stage framing)
- Single-turn invocations with a short briefing paragraph (most Storevine samples)
- Multi-step structured invocations with full context blocks (most Workbench ADR and stakeholder samples)

Browse the library to find the level of maturity that matches your current practice - then experiment upward from there.

### Three Narrative Threads Across Three Fictional Companies

The library isn't a random collection of samples. It's organized around three fictional companies that each operate at a different stage, in a different industry, with different PM challenges. Every sample belongs to one of these threads so you can follow a company's product story across multiple skills.

#### Brainshelf - Early-Stage B2C Founder

- **The company:** Brainshelf builds a personal knowledge product - a tool for people who capture notes, articles, and ideas across too many apps and an never find them later. Think early-stage B2C, one PM who is also the founder, zero product-market fit certainty.
- **Why this thread exists:** Early-stage PM work looks different. Hypotheses are looser. Personas aren't validated by a research team. Foundation Sprints and lean canvases matter more than full PRDs. The Brainshelf samples show how to use PM skills when you have more questions than answers.
- **Best samples to start with:** [define-hypothesis](library/skill-output-samples/define-hypothesis/sample_define-hypothesis_brainshelf_resurface.md), [tool-foundation-sprint-basics](library/skill-output-samples/tool-foundation-sprint-basics/sample_tool-foundation-sprint-basics_brainshelf_book-catalog.md), [discover-interview-synthesis](library/skill-output-samples/discover-interview-synthesis/sample_discover-interview-synthesis_brainshelf_resurface.md), [tool-foundation-sprint-founding-hypothesis](library/skill-output-samples/tool-foundation-sprint-founding-hypothesis/sample_tool-foundation-sprint-founding-hypothesis_brainshelf_book-catalog.md)

#### Storevine - Mid-Stage E-Commerce PM

* **The company:** Storevine is a mid-market e-commerce SaaS platform. The PM running the checkout-conversion program is three years into the role, works with an engineering team of six, and is accountable to experiment velocity and revenue-per-visit metrics.
* **Why this thread exists:** Most PM skill work happens in the middle: running experiments, measuring results, writing PRDs for known problems, aligning stakeholders on tradeoffs. The Storevine samples represent the bread-and-butter PM output at a company with enough scale to run rigorous tests but without so much bureaucracy that every artifact becomes a political battle.
* **Best samples to start with:**  [deliver-prd](library/skill-output-samples/deliver-prd/sample_deliver-prd_storevine_campaigns.md), [measure-experiment-design](library/skill-output-samples/measure-experiment-design/sample_measure-experiment-design_storevine_campaigns.md), [measure-okr-grader](library/skill-output-samples/measure-okr-grader/sample_measure-okr-grader_storevine_campaigns-q3.md), [define-opportunity-tree](library/skill-output-samples/define-opportunity-tree/sample_define-opportunity-tree_storevine_campaigns.md)

#### Workbench - Internal-Tools PM at a Growing Org

- **The company:** Workbench is the internal tooling and platform team at a 200-person organization moving from startup to scale. The PM's "users" are internal employees and the "product" is the internal tooling layer - blueprints, automation, integrations.
- **Why this thread exists:** Internal-tools PM is its own discipline. Stakeholders are your co-workers. The cost of ignoring feedback is high because users are captive. ADRs matter more than press releases. Stakeholder updates go to department heads who have opinions. This thread shows PM skills applied to the least-glamorous-but-often-most-impactful area of product work.
- **Best samples to start with:**  [develop-adr](library/skill-output-samples/develop-adr/sample_develop-adr_workbench_blueprints.md), [foundation-stakeholder-update](library/skill-output-samples/foundation-stakeholder-update/sample_foundation-stakeholder-update_workbench_blueprints-notion-enterprise-cs.md), [foundation-meeting-recap](library/skill-output-samples/foundation-meeting-recap/sample_foundation-meeting-recap_workbench_blueprints-customer-feedback.md), [iterate-retrospective](library/skill-output-samples/iterate-retrospective/sample_iterate-retrospective_workbench_blueprints.md)

### Browse the Library

Since product management is all about context, there  are several ways for you to review the skills and outputs. 

1. **By skill** - organized by skill name: [**library/skill-output-samples/**](library/skill-output-samples/)
1. **By company thread** - follow one company's story across multiple skills:

| Thread     | Folder pattern   | Starting point                                                                                       |
| ---------- | ---------------- | ---------------------------------------------------------------------------------------------------- |
| Brainshelf | `*_brainshelf_*` | [define-hypothesis resurface](library/skill-output-samples/define-hypothesis/sample_define-hypothesis_brainshelf_resurface.md) |
| Storevine  | `*_storevine_*`  | [deliver-prd campaigns](library/skill-output-samples/deliver-prd/sample_deliver-prd_storevine_campaigns.md) |
| Workbench  | `*_workbench_*`  | [develop-adr blueprints](library/skill-output-samples/develop-adr/sample_develop-adr_workbench_blueprints.md) |

3. **By scenario** - the "resurface" feature (Brainshelf), "campaigns" program (Storevine), and "blueprints" initiative (Workbench) recur across dozens of skills, so you can see how outputs connect and build on each other.

**More resources:**

- [**Skill Output Samples**](library/skill-output-samples/) - All 95+ sample outputs organized by skill name. Browse to calibrate expectations before running a skill.
- [**Prompt Gallery**](docs/guides/prompt-gallery.md) - The prompts that generated many of the best library samples, annotated with what makes each one effective. A useful companion when you want to improve your own invocation patterns.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Learning and Resources

**PM-Skills isn't just a skill repo. It ships with a full learning layer:** 

- Concept primers
- How-to guides
- Cheat sheets
- Case studies
- Recovery playbooks
- A prompt gallery
- ... and 95+ real sample outputs.

### Learn the Methodologies

These guides explain the *why* behind the workshop frameworks and PM practices this library encodes:

- [**Foundation Sprint concept primer**](docs/concepts/foundation-sprint.md) - A Foundation Sprint is a structured 2-day workshop methodology developed by Jake Knapp and John Zeratsky for aligning early-stage teams before design begins. This primer explains what it is, when to run one, how the 7 skills fit together, and how it relates to the Design Sprint.
- [**Design Sprint concept primer**](docs/concepts/design-sprint.md) - A Design Sprint is a structured 5-day process for understanding a problem, sketching solutions, building a prototype, and testing with real users. This primer covers the Google Ventures heritage, the 5-day arc as implemented in this skill family, and how it differs from running a physical workshop.
- [**Sprint skills overview**](docs/concepts/sprint-skills-overview.md) - An orientation to both workshop tool families: how Foundation Sprint and Design Sprint relate to each other, to the Triple Diamond framework, and to the rest of the PM-Skills catalog. Start here if you are new to either methodology.
- [**Workshop sprints vs agile sprints**](docs/concepts/workshop-sprints-vs-agile-sprints.md) - If your team runs Scrum or any other agile framework, read this before running either workshop methodology. The word "sprint" means two completely different things in these two contexts, and confusing them is the most common source of friction for new users.

### Use Skills Effectively

- [**Using skills guide**](docs/guides/using-skills.md) - Foundational guide to invoking skills across different agents, passing context effectively, and getting consistent outputs. Covers invocation patterns, context blocks, and how to recover from incomplete outputs.
- **[Using workflows](docs/guides/using-workflows.md)** - How to run multi-skill chains, handle handoffs between skills so context flows correctly, and adapt workflow sequences to your team's specific process.
- [**Skill finder**](docs/guides/skill-finder.md) - Decision guide for finding the right skill when you know the outcome you need but not which skill to reach for. Organized by PM activity and phase.
- [**Skill comparisons**](docs/guides/pm-skill-comparisons.md) - Side-by-side comparison of skills with overlapping scope: when to use `problem-statement` vs `hypothesis` vs `opportunity-tree`, and similar questions that come up repeatedly.
- [**Recipes**](docs/guides/recipes.md) - Common patterns and skill combinations for real PM scenarios: solo feature launch, quarterly OKR cycle, research-to-delivery arc, and more.
- **[Prompt gallery](docs/guides/prompt-gallery.md)** - Real prompts that produce excellent skill outputs, annotated with what makes each one work. A practical reference for getting better results immediately.

### Foundation Sprint Resources

The Foundation Sprint tool family ships with five companion guides covering every stage of use:

- **[Using Foundation Sprint](docs/guides/using-foundation-sprint.md)** - Operational guide for running the complete 7-skill Foundation Sprint sequence with an agent. Covers facilitation patterns, what to do between steps, and output quality expectations for each skill.
- [**Foundation Sprint FAQ**](docs/guides/foundation-sprint-faq.md) - Answers to the most common questions about the Foundation Sprint workshop methodology: who should be in the room, how long each step takes, what the founding hypothesis output looks like, and what to do with the brief.
- [**Foundation Sprint Cheat Sheet**](docs/guides/foundation-sprint-cheat-sheet.md) - One-page quick reference for the Foundation Sprint arc: skill sequence, key questions, and outputs. Print it or keep it open during a session.
- [**Foundation Sprint Case Studies**](docs/guides/foundation-sprint-case-studies.md) - Three fictional scenarios (early-stage B2C, mid-market SaaS, internal tools) showing how different teams applied the Foundation Sprint at different stages and under different constraints.
- [**Foundation Sprint Recovery**](docs/guides/foundation-sprint-recovery.md) - What to do when a sprint goes sideways: confusing founding hypothesis, team disagreement on direction, a step that needs to be redone, or a situation where the readiness check was wrong.

### Design Sprint Resources

The Design Sprint tool family ships with five companion guides:

- [**Using Design Sprint**](docs/guides/using-design-sprint.md) - Operational guide for running the 7-skill Design Sprint sequence with an agent. Covers what "realistic-enough" means for the prototype step, how to structure test-day interview sessions, and how to score results.
- [**Design Sprint FAQ**](docs/guides/design-sprint-faq.md) - Questions about prototype fidelity, participant recruitment for test day, scoring criteria, and what to do when no clear winner emerges from testing.
- [**Design Sprint Cheat Sheet**](docs/guides/design-sprint-cheat-sheet.md) - One-page quick reference for the 5-day arc: skill sequence, daily outputs, and decision points.
- [**Design Sprint Case Studies**](docs/guides/design-sprint-case-studies.md) - Fictional scenarios applying the Design Sprint to B2C product discovery, B2B feature validation, and an internal-tools redesign challenge.
- [**Design Sprint Recovery**](docs/guides/design-sprint-recovery.md) - What to do when prototype testing is inconclusive, the test fails entirely, the team wants to revisit the storyboard, or time constraints force adjustments.

### Reference

- [**PM skill anatomy**](docs/reference/pm-skill-anatomy.md) - The three-file structure every skill follows (SKILL.md, TEMPLATE.md, EXAMPLE.md) and what each file contributes to output quality. Essential before authoring a new skill.
- [**Agent skill anatomy**](docs/concepts/agent-skill-anatomy.md) - The general Agent Skills Specification anatomy that PM-Skills is built on. Useful context for understanding how skills work across the broader AI ecosystem.
- [**Mermaid style guide**](docs/reference/mermaid-style-guide.md) - Using the mermaid-diagrams skill to create consistent, on-brand diagrams. Includes the color palette, classDef patterns, and guidance on when to use LR vs TD layout.
- [**Sprint methodology glossary**](docs/reference/sprint-methodology-glossary.md) - Definitions for terms used across Foundation Sprint and Design Sprint skills. A useful reference when the meaning of a skill output or workshop term isn't clear.
- [**Workshop method comparison**](docs/reference/workshop-method-comparison.md) - Decision matrix for when to use Foundation Sprint vs Design Sprint vs other structured workshop approaches.
- [**Ecosystem overview**](docs/reference/ecosystem.md) - How pm-skills, pm-skills-mcp, and the skills CLI relate to each other; which to use for which client and workflow.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Project Status

### At a Glance

|                     |                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------- |
| **Current version** | [v2.21.0](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.21.0)           |
| **Skill count**     | 63 skills (30 phase + 8 foundation + 10 utility + 15 tool)                                |
| **Sub-agents**      | 4 (pm-critic, pm-skill-auditor, pm-changelog-curator, pm-release-conductor)               |
| **Workflows**       | 12                                                                                        |
| **Slash commands**  | 73                                                                                        |
| **Spec**            | [agentskills.io](https://agentskills.io/specification)                                    |
| **License**         | [Apache 2.0](LICENSE)                                                                     |
| **Docs site**       | [product-on-purpose.github.io/pm-skills](https://product-on-purpose.github.io/pm-skills/) |

### Repo Structure

```
pm-skills/
├── skills/                  # 63 PM skills (30 phase, 8 foundation, 10 utility, 15 tool)
├── commands/                # Slash commands mapping to skills, workflows, and sub-agents
├── _workflows/              # Workflow chains: feature-kickoff, lean-startup, triple-diamond, and more
├── agents/                  # Sub-agent definitions (v2.16.0+, Claude Code plugin runtime)
├── library/                 # Sample output library (95+ real skill outputs)
├── scripts/                 # sync-claude, build-release, validate-commands, and CI scripts
├── .github/                 # CI workflows and automation
├── docs/
│   ├── getting-started/     # Setup guides
│   ├── concepts/            # Methodology primers and conceptual guides
│   ├── guides/              # How-to guides and operational references
│   ├── reference/           # Technical specs and skill anatomy
│   └── releases/            # Release notes for each version
├── AGENTS.md                # Universal agent discovery file
├── CONTRIBUTING.md          # Contribution guidelines
└── CHANGELOG.md             # Version history
```

**Key paths:**

| Path                                                             | What's in it                                                                          |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [`skills/`](skills/)                                             | All 63 PM skills, each with SKILL.md + references/TEMPLATE.md + references/EXAMPLE.md |
| [`commands/`](commands/)                                         | Slash command definitions for Claude Code                                             |
| [`_workflows/`](_workflows/)                                     | Multi-skill workflow chains with handoff guidance                                     |
| [`library/skill-output-samples/`](library/skill-output-samples/) | 95+ real sample outputs organized by skill name                                       |
| [`docs/guides/`](docs/guides/)                                   | How-to guides and operational references                                              |
| [`docs/concepts/`](docs/concepts/)                               | Methodology primers and conceptual explanations                                       |
| [`docs/reference/`](docs/reference/)                             | Technical reference: skill anatomy, ecosystem, runtime components                     |

**See [docs/reference/project-structure.md](docs/reference/project-structure.md) for detailed descriptions of every directory.**

### Changelog

**See [CHANGELOG.md](CHANGELOG.md) for full details.**

<details>
<summary><strong>Quick Release History</strong></summary>

<!-- count-exempt:start -->

| Version    | Highlights                                                                                           |
| ---------- | ---------------------------------------------------------------------------------------------------- |
| [**2.21.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.21.0) | Marketplace launch (additive): pm-skills is now published through the new `product-on-purpose` marketplace, the recommended home for multiple Product on Purpose plugins. Distribution change only - the skill catalog (63) and commands (73) are unchanged, and the existing install path keeps working, so no existing user has to act. Shipped as a minor because nothing was removed; the eventual old-path retirement is reserved for a future major. |
| [**2.20.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.20.0) | Sprint workflow commands + validation hardening: the 3 workshop methodologies (Foundation Sprint, Design Sprint, Foundation-to-Design) are now runnable as single `/workflow-` commands (slash commands 70 to 73). The count-consistency validator now catches stale counts in any phrasing (table, parenthetical, count-noun), and the command-sync validator requires every advertised `/workflow-` command to have a real file; the vestigial `check-stale-bundle-refs` validator was removed. No new skills; catalog stays 63. |
| [**2.19.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.19.0) | Pre-promotion hardening: the release-validation gate now polices the library itself, automatically catching the v2.18.0 defect classes - stale counts (`.mdx` now scanned), broken skill cross-references (new validator), and dead in-page anchors (23 fixed). Enforces the README current-version claim, pins line endings via `.gitattributes`, removes the vestigial `validate-mcp-sync` workflow, and ships a branded docs-site 404. No new skills; catalog stays 63. |
| [**2.18.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.18.0) | Four highest-consensus content skills: `market-sizing` (TAM/SAM/SOM via multi-framework triangulation), `prioritization-framework` (RICE, ICE, MoSCoW, Weighted Scoring, Kano run in parallel with a cross-framework comparison), `journey-map` (touchpoints, emotional curve, moments of truth), and `survey-analysis` (honest analysis with explicit limitation warnings). Catalog grows from 59 to 63 skills; each new skill refuses to fabricate data and labels confidence honestly. |
| [**2.17.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.17.0) | Native Claude Code sub-agent registration: sub-agent definitions moved to the canonical `agents/` directory (coordination directory renamed `AGENTS/` to `_agent-context/`), so all 4 sub-agents auto-discover via `@`-mention. Skill frontmatter migrated to the metadata-nested agentskills.io structure; CI validators made bash-3.2 portable. 59-skill catalog unchanged. |
| [**2.16.2**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.16.2) | Post-tag hygiene: plan documents updated to SHIPPED state and the GitHub Release body corrected after the v2.16.1 patch cycle. Keeps planning artifacts and the public Release UI synchronized. |
| [**2.16.1**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.16.1) | Removed the invalid `agents` field from `plugin.json` that blocked `/plugin update pm-skills` with an "Invalid input" error since v2.16.0. If you saw that error after updating, this patch resolves it. |
| [**2.16.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.16.0) | First 4 active-orchestration sub-agents (pm-critic, pm-skill-auditor, pm-changelog-curator, pm-release-conductor) ship with 4 dispatch skills that extend sub-agent workflows to Codex, Cursor, Windsurf, Copilot, and Gemini CLI. Foundation work for chained PM workflows that run without manual handoffs between steps. |
| [**2.15.2**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.15.2) | Corrected skill counts in release documentation and the README after v2.15.0 shipped with stale aggregate numbers. No skill file changes. |
| [**2.15.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.15.0) | 15 new skills under a new `classification: tool` taxonomy: Foundation Sprint family (7 skills, 2-day strategic alignment), Design Sprint family (7 skills, 5-day prototype-and-test), and standalone note-and-vote. Catalog grows from 40 to 55. A new `foundation-to-design` workflow chains both methodologies end-to-end. |
| [**2.14.2**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.14.2) | Cumulative docs hygiene patch closing Codex adversarial review findings: expanded validator scope to `.mdx`, refreshed the MCP sync guide, hardened sync workflow dispatch inputs, and reframed v2.14.0 deferrals in release notes. |
| [**2.14.1**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.14.1) | Added the Mermaid style guide and expanded `validate-docs-frontmatter` scope to `.mdx` files, closing a validator gap that had allowed frontmatter defects in Astro-specific files to pass CI undetected. |
| [**2.14.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.14.0) | Retired MkDocs Material and migrated to Astro Starlight. Full-text search via Pagefind, native dark mode, Node 22.x build. The docs site is the primary reference going forward; Python pip is no longer required to build it. |
| [**2.13.1**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.13.1) | Fixed the silent failure in `/plugin marketplace add`: moved `marketplace.json` to `.claude-plugin/`, added the required `owner` schema field, and introduced an enforcing `validate-plugin-install` CI script. This is the version that made the marketplace install path reliable and recommended. |
| [**2.13.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.13.0) | Plugin path groundwork: initial schema field investigation and CI script scaffolding ahead of the v2.13.1 fix. |
| [**2.12.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.12.0) | OKR skill pair: `okr-writer` drafts objectives-and-key-results plans with tight, measurable key results; `okr-grader` scores completed OKR sets at cycle close with KR-level scoring and learning synthesis. OKR structure and grading rubric are now encoded skills your agent runs consistently. |
| [**2.11.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.11.0) | Meeting Skills Family: 5 foundation-meeting skills (agenda, brief, recap, synthesize, stakeholder-update), a shared family contract, an enforcing CI validator, an end-user guide, and 15 library samples across all three narrative threads. Established the skill family pattern used by later tool families. |
| [**2.10.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.10.0) | Utility skill expansion: mermaid-diagrams (15 diagram types with PM use-case guidance), slideshow-creator (18 slide types from a JSON deck spec), and update-pm-skills (in-place updater with status, preview, and apply modes), each with its slash command. |
| [**2.9.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.9.0)   | Renamed "bundles" to "workflows", expanded from 3 to 9 workflow chains, added 7 workflow slash commands, and added URL redirects from old bundle paths. Established workflows as first-class artifacts alongside skills. |
| [**2.8.x**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.8.0)   | Docs site launch via MkDocs Material (v2.8.1) and the PM skill lifecycle skills: pm-skill-validate and pm-skill-iterate with lifecycle guide and skill versioning governance (v2.8.0). |
| [**2.7.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.7.0)   | First utility skill (pm-skill-builder), the acceptance-criteria phase skill, enhanced CI scripts, and release packaging hygiene. |
| [**2.6.x**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.6.0)   | Claude plugin packaging release with staged manifest version checks (v2.6.0); sample-library recovery and naming/path normalization (v2.6.1). |
| [**2.5.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.5.0)   | Persona skill shipment establishing the foundation/utility taxonomy separation. Sample-library quality closure pass. |
| [**2.4.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.4.0)   | Output and configuration contract lock closure. Established the canonical output format contracts that phase skills follow. |
| [**2.3.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.3.0)   | MCP alignment closure and blocking-default sync guardrail. Established the MCP sync observe-mode pattern. |
| [**2.2.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.2.0)   | MCP drift guardrail in observe mode. Planning and backlog governance conventions formalized.         |
| [**2.0.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.0.0)   | Major structural reset: flat `skills/{phase-skill}/` directory layout, sync helper scripts, build scripts, and docs refresh. Established the layout convention the repo uses today. |
| [**1.2.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v1.2.0)   | Security policy, CodeQL scanning, Dependabot configuration, and issue/PR templates.                  |
| [**1.1.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v1.1.0)   | Documentation overhaul: README redesign, FAQ section, and collapsible table of contents.             |
| [**1.0.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v1.0.0)   | First stable Triple Diamond baseline: 24 PM skills across 6 phases, workflows, and AGENTS.md for agent discovery. The canonical starting point the rest of the repo builds from. |
| [**0.1.0**](https://github.com/product-on-purpose/pm-skills/releases/tag/v0.1.0)   | Initial project structure and foundation infrastructure.                                             |

<!-- count-exempt:end -->

</details>

### License

Distributed under the **Apache License 2.0**. See [LICENSE](LICENSE) for more information.

This means you can:

- Use PM-Skills commercially
- Modify and distribute
- Use privately
- Include in proprietary software

**The only requirements are attribution and including the license notice.**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Contributing

Contributions are what make the open-source community such a meaningful place to learn, create, and improve. Any contributions you make are **greatly appreciated**.

**Quick contribution steps:**

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingSkill`)
3. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/) (`git commit -m 'feat: add amazing skill'`)
4. Push to the Branch (`git push origin feature/AmazingSkill`)
5. Open a Pull Request

**Please read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on:**

- Code of conduct
- Development process
- Skill contribution guidelines
- Testing requirements
- Documentation standards

**Resources:**

- [Creating PM Skills](docs/guides/creating-pm-skills.md) - Authoring guide for new skills
- [Skill Template](docs/templates/skill-template/) - The expected three-file structure

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Community

Have ideas for making PM-Skills better? Here are ways to contribute and connect:

**💡 Feature Ideas**

- Open a [feature request](https://github.com/product-on-purpose/pm-skills/issues/new?labels=enhancement) to suggest new skills or improvements
- Join the [Discussions](https://github.com/product-on-purpose/pm-skills/discussions) to brainstorm with the community

**🐞 Reporting Bugs**. Please try to create bug reports that are:

- ✅ **Reproducible** - Include steps to reproduce the problem
- ✅ **Specific** - Include as much detail as possible (version, environment, etc.)
- ✅ **Unique** - Do not duplicate existing opened issues
- ✅ **Scoped** - One bug per report

**📣 Spread the Word**

- Give the repo a star if you find it useful
- Share PM-Skills on Twitter, LinkedIn, or your favorite PM community
- Write a blog post about how you use PM-Skills in your workflow

**💬 Feedback**

- Found something confusing? [Open an issue](https://github.com/product-on-purpose/pm-skills/issues/new)
- Want to chat? Start a [discussion](https://github.com/product-on-purpose/pm-skills/discussions)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## FAQ

<details>
<summary><strong>What's the difference between Foundation Sprint and Design Sprint?</strong></summary>

**Foundation Sprint** is a 2-day strategic alignment workshop. It answers: "Do we know our problem, customer, and direction well enough to start designing?" Output: a founding hypothesis and a sprint brief.

**Design Sprint** is a 5-day prototype-and-test workshop. It answers: "Is this particular solution right for this particular problem?" Output: a prototype and test results.

Run a Foundation Sprint first if you don't have strong conviction on the problem space. Run a Design Sprint when you have the problem defined and need to validate a solution approach. Neither of these is an agile iteration sprint.

See [Foundation Sprint vs Design Sprint](docs/concepts/sprint-skills-overview.md) and [Workshop Sprints vs Agile Sprints](docs/concepts/workshop-sprints-vs-agile-sprints.md) for detailed comparisons.

</details>

<details>
<summary><strong>Do I need to install all 63 skills?</strong></summary>

No. You can use individual skills as needed. Each skill is self-contained and works independently. If you only need PRDs, just reference `skills/deliver-prd/`. The workflows are optional guides, not requirements.

</details>

<details>
<summary><strong>Can I use PM-Skills with ChatGPT?</strong></summary>

Yes, with some limitations. Copy the contents of any `SKILL.md` file into your ChatGPT conversation as context and ask it to follow the skill instructions. ChatGPT doesn't support the Agent Skills Specification natively, so you won't get automatic skill discovery or slash commands. For the best experience, use Claude Code, GitHub Copilot, Cursor, or Windsurf.

</details>

<details>
<summary><strong>How do I customize a skill for my team?</strong></summary>

Fork the repository and modify the `SKILL.md`, `TEMPLATE.md`, or `EXAMPLE.md` files to match your team's standards. You can add company-specific sections, change terminology, or adjust the output format. The Apache 2.0 license allows commercial use and modification.

</details>

<details>
<summary><strong>What's the difference between skills and workflows?</strong></summary>

**Skills** are atomic units - each produces one PM artifact (a PRD, a hypothesis, user stories, etc.). **Workflows** chain multiple skills together in a recommended sequence. Use skills when you need a specific output; use workflows when you want guided end-to-end processes.

</details>

<details>
<summary><strong>What's the difference between skills and sub-agents?</strong></summary>

**Skills** are instruction files (SKILL.md + TEMPLATE.md + EXAMPLE.md) that your agent reads inline when you invoke a slash command. The agent doing the work IS your current session.

**Sub-agents** are separate agent instances that Claude Code spawns as sub-tasks. When you invoke a sub-agent, a new agent context is launched for that specific job, runs against the skills catalog, returns its output to your session, and exits. This separation is useful for tasks that benefit from a clean context - like adversarial review, where the same session that wrote the artifact might not be the best critic.

Sub-agents are currently Claude Code-only. For other platforms, the same four capabilities ship as paired utility skills you invoke like any other skill.

</details>

<details>
<summary><strong>How do I stay up to date with new skills?</strong></summary>

Watch the [GitHub Releases](https://github.com/product-on-purpose/pm-skills/releases) page for new versions, or use the `/pm-skills:utility-update-pm-skills` slash command from within your agent to check for and apply updates. Major releases are summarized in the [Recent Updates](#recent-updates) section above.

</details>

<details>
<summary><strong>Why doesn't PM-Skills work with the openskills CLI?</strong></summary>

The openskills CLI discovers skills in `.claude/skills/` directories. PM-Skills ships a flat `skills/{phase-skill}/` structure plus a sync helper. Clone the repo and run `./scripts/sync-claude.sh` (or `.ps1`) to populate `.claude/skills/` locally, and openskills or Claude Code discovery will find all skills.

</details>

<details>
<summary><strong>Can I contribute new skills?</strong></summary>

Yes. Read the [authoring guide](docs/guides/creating-pm-skills.md) for the full process. Submit a proposal via GitHub issue first, then create your skill following the template structure. All contributions are reviewed for quality and alignment with PM best practices.

</details>

<details>
<summary><strong>How do slash commands work in Claude Code?</strong></summary>

Slash commands (like `/pm-skills:deliver-prd` or `/pm-skills:define-hypothesis`) are shortcuts that invoke the corresponding skill. When you type `/pm-skills:deliver-prd "my feature"`, Claude Code reads the skill instructions from `skills/deliver-prd/SKILL.md` and generates output following the template. No additional setup required after install; the commands are defined in the `commands/` directory.

</details>

<details>
<summary><strong>What's the difference between pm-skills and pm-skills-mcp?</strong></summary>

**pm-skills** (this repo) is the source skill library with all 63 PM skills as markdown files. Best for Claude Code slash commands, file browsing, and customization.

**pm-skills-mcp** wraps the same skills in an MCP server for programmatic access. Best for Claude Desktop, Cursor, and any MCP-compatible client when you want tool-based invocation rather than slash commands.

Both give you access to the same skills; choose based on your preferred client and workflow. See the [Ecosystem Overview](docs/reference/ecosystem.md) for a detailed comparison.

</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## About the Author

<p align="center">
  <a href="https://github.com/jprisant">
    <img src="https://img.shields.io/badge/Created_by-Jonathan_Prisant-blue?style=for-the-badge&logo=github" alt="Created by Jonathan Prisant">
  </a>
</p>

Howdy, I'm Jonathan Prisant, a product leader/manager/nerd in the church technology space who gets unreasonably excited about understanding and solving problems, serving humans, designing elegant systems, and getting stuff done. I enjoy optimizing and scaling workflows more than is probably healthy - not because I'm particularly fond of "business process definition," but because I think in systems and value the outcomes of increased effectiveness and efficiency.

I am a follower of Jesus Christ, grateful husband, proud (and exhausted) daddy, D&D geek, 3D printing enthusiast, formerly-consistent strength trainer, smart home enthusiast, insatiable learner, compulsive tech-experimenter, and a bunch of other things. I have too many projects going on across too many domains - but hopefully you find this open-source repo helpful and useful.

*If PM-Skills has helped you ship better products, consider giving the repo a star and sharing it with your team.*

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<p align="center">
  <strong>Built with purpose by <a href="https://github.com/product-on-purpose">Product on Purpose</a></strong><br>
  <sub>Helping teams ship better products with AI-powered PM workflows</sub>
</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
