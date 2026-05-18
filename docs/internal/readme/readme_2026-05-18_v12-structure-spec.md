<!--
DRAFT README v12: "Structure spec - canonical single-file". Target ~450 lines.
Direct interpretation of docs/internal/readme/structure.md feedback. Single README.md, no
README-detailed.md split. Honors every structural directive in the spec:
  - Expandable Table of Contents
  - Quick start with two most-likely paths (marketplace install + clone), link to detailed install doc
  - MCP server maintenance expansion (kept in place)
  - What's new: 5 most recent releases as expansions + link to changelog; removed duplicated "Previous Release Details" section
  - Big Idea: kept; "Works for" moved out (to Getting Started); MCP comparison removed; Mermaid diagram added
  - Getting Started: succinct; Claude Code, Codex, clone, npx covered explicitly; "Works for" compatibility content lives here; expansion sections replaced by link to detailed install doc; all MCP references removed
  - "Usage" renamed to "How skills work" (purposive); links to how-it-works guides; visually richer
  - The library: catalog tables + workflow tables (one place, not duplicated)
  - Library samples / worked examples: new dedicated section explaining the 3 narrative threads
  - Project status: info table + per-major-sub-folder structure with linked key files
  - Roadmap link
  - Contributing + FAQ
Voice: clean, navigational, link-rich. Reader feels guided, not lectured.
-->

<a id="readme-top"></a>

<h1 align="center">PM-Skills</h1>

<p align="center">
  <strong>59 production-ready product management skills your AI agent can run today.</strong><br>
  PRDs, OKRs, hypotheses, opportunity trees, retros, Foundation Sprint, Design Sprint, and 50 more.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2.16.0-blue?style=flat-square" alt="v2.16.0">
  <img src="https://img.shields.io/badge/skills-59-brightgreen?style=flat-square" alt="59 skills">
  <img src="https://img.shields.io/badge/spec-agentskills.io-orange?style=flat-square" alt="Agent Skills Spec">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-Apache%202.0-blue?style=flat-square" alt="Apache 2.0"></a>
  <a href="https://github.com/product-on-purpose/pm-skills-mcp"><img src="https://img.shields.io/badge/MCP_Server-maintenance%20mode-yellow?style=flat-square" alt="MCP maintenance"></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" alt="PRs welcome"></a>
</p>

<details>
<summary><strong>Table of contents</strong></summary>

- [Quick start](#quick-start)
- [MCP server maintenance notice](#mcp-server-maintenance-notice)
- [What's new](#whats-new)
- [The big idea](#the-big-idea)
- [Getting started](#getting-started)
- [How skills work](#how-skills-work)
- [The library](#the-library)
- [Library samples and worked examples](#library-samples-and-worked-examples)
- [Project status](#project-status)
- [Contributing](#contributing)
- [FAQ](#faq)
- [License](#license)

</details>

---

## Quick start

Two paths cover most users.

### Install into Claude Code (no clone required)

```
/plugin marketplace add product-on-purpose/pm-skills
/plugin install pm-skills@pm-skills-marketplace
```

Resolves all 59 skills, 66 slash commands, and 4 sub-agents from any directory. Updates with `/plugin update pm-skills`. Verify with `/plugin list`.

### Or, clone the repo

```bash
git clone https://github.com/product-on-purpose/pm-skills.git
cd pm-skills
```

Gives you the full library, sample outputs, and source files for forking or contributing. Cursor, Windsurf, and GitHub Copilot auto-discover via `AGENTS.md` once the folder is open.

For Codex, Claude.ai, MCP clients, OpenCode, VS Code, ChatGPT, and other tools: see [docs/getting-started/platforms.md](docs/getting-started/platforms.md) for per-platform setup.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<a id="mcp-server-maintenance-notice"></a>

<details>
<summary><strong>MCP server: maintenance mode (effective 2026-05-04)</strong></summary>

The companion [`pm-skills-mcp`](https://github.com/product-on-purpose/pm-skills-mcp) server is in the v2.9.x maintenance line (latest v2.9.3). The MCP catalog is frozen at the v2.9.2 build (40 MCP-embedded entries + 11 workflow tools + 8 utility tools). Security patches and critical bug fixes continue; skill parity with the file-based library is on hold.

**For new users, the file-based install paths above are the recommended path.** See [docs/guides/mcp-integration.md](docs/guides/mcp-integration.md) for status details and resumption criteria.

</details>

---

## What's new

The library is under active development. Here's what changed in the last few releases and why it matters. Full per-release history: [CHANGELOG.md](CHANGELOG.md).

<details open>
<summary><strong>v2.16.0 - Active Orchestration</strong></summary>

**What changed.** First 4 active-orchestration sub-agents shipped (pm-critic, pm-skill-auditor, pm-changelog-curator, pm-release-conductor), giving Claude Code a stable interface for spawning sub-tasks against the catalog. 4 dispatch skills extend sub-agent-shaped flows to Codex, Cursor, Windsurf, Copilot, and Gemini CLI. The 6-gate pre-tag release runbook is now written down.

**Why it matters.** Foundation work for chained workflows that don't need a human in the handoff loop. Today the dispatch surface exists and is documented. Future releases build end-to-end automations on top.

**Get started.** [`docs/reference/runtime-components.md`](docs/reference/runtime-components.md) . [`docs/releases/Release_v2.16.0.md`](docs/releases/Release_v2.16.0.md).

</details>

<details>
<summary><strong>v2.15.0 - Sprint Skills Launch</strong></summary>

**What changed.** 15 new skills under a new `classification: tool` taxonomy. 7-member Foundation Sprint family (Knapp/Zeratsky 2-day strategic alignment) + 7-member Design Sprint family (Knapp/Zeratsky/Kowitz 5-day prototype-and-test) + 1 standalone `note-and-vote` (group decision mechanic). Catalog grows from 40 to 55. New `foundation-to-design` workflow chains both families end-to-end.

**Why it matters.** If you run sprints, you don't have to translate the books into prompts anymore. The agent runs the workshop with you using the canonical moves; outputs are workshop artifacts.

**Get started.** [`docs/concepts/foundation-sprint.md`](docs/concepts/foundation-sprint.md) . [`docs/concepts/design-sprint.md`](docs/concepts/design-sprint.md) . [`_workflows/foundation-to-design.md`](_workflows/foundation-to-design.md) . [`docs/releases/Release_v2.15.0.md`](docs/releases/Release_v2.15.0.md).

</details>

<details>
<summary><strong>v2.14.x - Doc Stack Migration to Astro Starlight</strong></summary>

**What changed.** Retired MkDocs Material; migrated the docs site to Astro Starlight. Pagefind search, native dark mode, Node 22.x build pipeline. v2.14.1 added a canonical Mermaid style guide and promoted three CI validators to truly enforcing on Ubuntu + Windows. v2.14.2 closed out the Codex final-review cumulative docs hygiene patch.

**Why it matters.** Docs search actually works now (full-text, instant). If you maintain a fork, the build pipeline is Node 22.x instead of Python pip.

**Get started.** [product-on-purpose.github.io/pm-skills](https://product-on-purpose.github.io/pm-skills/) . [`docs/releases/Release_v2.14.0.md`](docs/releases/Release_v2.14.0.md) . [`v2.14.1`](docs/releases/Release_v2.14.1.md) . [`v2.14.2`](docs/releases/Release_v2.14.2.md).

</details>

<details>
<summary><strong>v2.13.x - Plugin Install Path Correction</strong></summary>

**What changed.** Fixed the `/plugin marketplace add product-on-purpose/pm-skills` install path. Moved `marketplace.json` to its canonical `.claude-plugin/` location; added the required `owner` schema field; introduced a new enforcing `validate-plugin-install` CI script that catches this whole bug class going forward.

**Why it matters.** Before v2.13.1, the plugin marketplace install failed silently for anyone who tried it. After v2.13.1, it's the recommended Claude Code install path. The CI guardrail prevents the regression from coming back.

**Get started.** [`docs/releases/Release_v2.13.1.md`](docs/releases/Release_v2.13.1.md).

</details>

<details>
<summary><strong>v2.12.0 - OKR Skills Set</strong></summary>

**What changed.** New OKR-focused skill set shipped: `okr-writer` (foundation), `okr-grader` (measure), and the operational pattern for using them across a quarter. Each ships with the standard 3-file anatomy.

**Why it matters.** OKR work was previously prompt-engineered on demand. Now the structure, key-result quality bar, and grading rubric are encoded as skills your agent runs consistently across cycles.

**Get started.** [`docs/releases/Release_v2.12.0.md`](docs/releases/Release_v2.12.0.md).

</details>

Full changelog: [CHANGELOG.md](CHANGELOG.md) . All releases: [GitHub Releases](https://github.com/product-on-purpose/pm-skills/releases).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## The big idea

**Stop prompt-fumbling. Start shipping.** Every time you ask an AI to help with product management, you start from zero. Generic responses. Inconsistent formats. Missing critical sections. Hours lost to repetitive prompt crafting.

PM-Skills changes that. Each skill is a markdown file the agent reads, a template it follows, and a worked example it mirrors. The skill encodes the standard; the agent applies it.

```mermaid
flowchart LR
    Prompt["You<br/>'/prd a focus-mode feature'"]
    Agent["Agent"]
    Skill["SKILL.md<br/>(the method)"]
    Template["TEMPLATE.md<br/>(the structure)"]
    Example["EXAMPLE.md<br/>(the quality bar)"]
    Output["Complete PRD<br/>(problem, metrics,<br/>stories, scope,<br/>dependencies)"]

    Prompt --> Agent
    Agent --> Skill
    Agent --> Template
    Agent --> Example
    Skill --> Output
    Template --> Output
    Example --> Output
```

| Without PM-Skills | With PM-Skills |
|---|---|
| Generic AI responses | Battle-tested PM frameworks |
| Inconsistent formats across artifacts | Production-ready templates |
| Missing critical sections | Comprehensive coverage |
| Prompt-engineering every time | One command, instant output |
| Tribal knowledge in your head | Institutional knowledge in your repo |

PM-Skills is opinionated about quality, not opinionated about your process. Each skill is a canonical artifact format; mix and match to fit your team's flow.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Getting started

### Works for

| Platform | Native? | How |
|---|---|---|
| **Claude Code** | Yes | Plugin marketplace (recommended) or clone + AGENTS.md |
| **Codex** | Yes | `npx skills add product-on-purpose/pm-skills -a codex` (file-based) |
| **Cursor / Windsurf** | Yes | AGENTS.md auto-discovery from cloned workspace |
| **GitHub Copilot** | Yes | AGENTS.md auto-discovery from cloned workspace |
| **OpenCode** | Yes | Direct skill loading from clone |
| **Claude.ai / Claude Desktop** | Manual | ZIP upload to Project Files |
| **VS Code (Cline / Continue)** | Yes | Extension reads AGENTS.md |
| **ChatGPT / other LLMs** | Manual | Copy skill content into the prompt |

Full per-platform setup with copy-paste configuration: [docs/getting-started/platforms.md](docs/getting-started/platforms.md).

### Quick install paths

**Claude Code (recommended).** No clone required:

```
/plugin marketplace add product-on-purpose/pm-skills
/plugin install pm-skills@pm-skills-marketplace
```

**Codex (and other AGENTS.md-aware agents).** Uses the open [`skills` CLI](https://github.com/vercel-labs/skills):

```bash
npx skills add product-on-purpose/pm-skills -a codex
```

**Git clone (universal escape hatch).** Works for any agent that auto-discovers from `AGENTS.md`, or as a starting point for forks and contributions:

```bash
git clone https://github.com/product-on-purpose/pm-skills.git
cd pm-skills
```

### Updating

| Install path | How to update |
|---|---|
| Claude Code plugin marketplace | `/plugin update pm-skills` |
| `skills` CLI | `npx skills update` |
| Git clone | `git pull` |

### Helpful next steps

- Detailed install for all platforms: [docs/getting-started/platforms.md](docs/getting-started/platforms.md)
- Getting started walkthrough: [docs/getting-started/](docs/getting-started/index.md)
- How a skill works (anatomy): [docs/guides/anatomy-of-a-skill.md](docs/guides/anatomy-of-a-skill.md)
- Universal skill map across agents: [AGENTS.md](AGENTS.md)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## How skills work

A skill is three files in a directory:

```
skills/deliver-prd/
  SKILL.md                  # the method the agent reads
  references/
    TEMPLATE.md             # the structure the output follows
    EXAMPLE.md              # the worked example that anchors quality
```

When you run `/prd "topic"`:

1. The agent loads `SKILL.md` into context.
2. It mirrors the depth and structure of `EXAMPLE.md`.
3. It fills `TEMPLATE.md` and produces the artifact.

No prompt engineering. No "remember to include the user-stories section." The skill encodes the standard.

### Why this works

| Property | What it gives you |
|---|---|
| **Declarative** | The skill says *what a good PRD is*, not *how to phrase a prompt* |
| **Example-anchored** | The worked example sets the quality bar; the agent mirrors depth, detail, structure |
| **Structurally contracted** | The template enforces sections-present, sections-complete |

### Learn more

- Skill anatomy and design rationale: [docs/guides/anatomy-of-a-skill.md](docs/guides/anatomy-of-a-skill.md)
- The skill lifecycle (builder, validator, iterator): [docs/guides/pm-skill-lifecycle.md](docs/guides/pm-skill-lifecycle.md)
- Built on canonical PM frameworks (Triple Diamond, Foundation Sprint, Design Sprint, OST, JTBD, ADR): [docs/concepts/](docs/concepts/)
- Cross-LLM review protocol used in our release process: [docs/internal/cross-llm-review-protocol.md](docs/internal/cross-llm-review-protocol.md)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## The library

59 skills across 4 classifications, organized by Triple Diamond phase plus two sprint-method families.

```mermaid
flowchart LR
    Discover["Discover<br/>3 skills"] --> Define["Define<br/>4 skills"]
    Define --> Develop["Develop<br/>4 skills"]
    Develop --> Deliver["Deliver<br/>6 skills"]
    Deliver --> Measure["Measure<br/>5 skills"]
    Measure --> Iterate["Iterate<br/>4 skills"]
    Iterate -.feedback.-> Discover
```

### Discover - find the right problem (3)

| Skill | What it does | Command |
|---|---|---|
| **interview-synthesis** | Turn user research into actionable insights | `/interview-synthesis` |
| **competitive-analysis** | Map the landscape, find opportunities | `/competitive-analysis` |
| **stakeholder-summary** | Understand who matters and what they need | `/stakeholder-summary` |

### Define - frame the problem (4)

| Skill | What it does | Command |
|---|---|---|
| **problem-statement** | Crystal-clear problem framing | `/problem-statement` |
| **hypothesis** | Testable assumptions with success metrics | `/hypothesis` |
| **opportunity-tree** | Teresa Torres-style outcome mapping | `/opportunity-tree` |
| **jtbd-canvas** | Jobs to be Done framework | `/jtbd-canvas` |

### Develop - explore solutions (4)

| Skill | What it does | Command |
|---|---|---|
| **solution-brief** | One-page solution pitch | `/solution-brief` |
| **spike-summary** | Document technical explorations | `/spike-summary` |
| **adr** | Architecture Decision Records (Nygard format) | `/adr` |
| **design-rationale** | Why you made that design choice | `/design-rationale` |

### Deliver - ship it (6)

| Skill | What it does | Command |
|---|---|---|
| **prd** | Comprehensive product requirements | `/prd` |
| **user-stories** | INVEST-compliant stories with acceptance criteria | `/user-stories` |
| **acceptance-criteria** | Given/When/Then testable scenarios | `/acceptance-criteria` |
| **edge-cases** | Error states, boundaries, recovery paths | `/edge-cases` |
| **launch-checklist** | Complete launch step inventory | `/launch-checklist` |
| **release-notes** | User-facing release communication | `/release-notes` |

### Measure - validate with data (5)

| Skill | What it does | Command |
|---|---|---|
| **experiment-design** | Rigorous A/B test planning | `/experiment-design` |
| **instrumentation-spec** | Event tracking requirements | `/instrumentation-spec` |
| **dashboard-requirements** | Analytics dashboard specs | `/dashboard-requirements` |
| **experiment-results** | Document learnings from experiments | `/experiment-results` |
| **okr-grader** | Score completed OKR sets with KR-level scoring + learning synthesis | `/okr-grader` |

### Iterate - learn and improve (4)

| Skill | What it does | Command |
|---|---|---|
| **retrospective** | Team retros that drive action | `/retrospective` |
| **lessons-log** | Build organizational memory | `/lessons-log` |
| **refinement-notes** | Capture backlog refinement outcomes | `/refinement-notes` |
| **pivot-decision** | Evidence-based pivot/persevere framework | `/pivot-decision` |

### Foundation - cross-cutting (8)

| Skill | What it does | Command |
|---|---|---|
| **persona** | Generate evidence-backed personas | `/persona` |
| **lean-canvas** | One-page lean canvas across nine blocks | `/lean-canvas` |
| **okr-writer** | OKR plan with tight, measurable key results | `/okr-writer` |
| **stakeholder-update** | Stakeholder-facing update from project state | `/stakeholder-update` |
| **meeting-agenda** | Focused agenda from purpose, attendees, time-box | `/meeting-agenda` |
| **meeting-brief** | One-page brief priming attendees with pre-reads | `/meeting-brief` |
| **meeting-recap** | Transcript synthesized into decisions and actions | `/meeting-recap` |
| **meeting-synthesize** | Cross-meeting themes from multiple sessions | `/meeting-synthesize` |

### Foundation Sprint family - 2-day strategic alignment (7)

Canonical Knapp/Zeratsky workshop. Run the full arc with the [foundation-sprint workflow](_workflows/foundation-sprint.md) or pick individual steps. Concept primer: [docs/concepts/foundation-sprint.md](docs/concepts/foundation-sprint.md).

| Skill | What it does | Command |
|---|---|---|
| **foundation-sprint-readiness** | Decision tree for FS readiness | `/foundation-sprint-readiness` |
| **foundation-sprint-basics** | Customer, problem, competition (founding 3-tuple) | `/foundation-sprint-basics` |
| **foundation-sprint-differentiation** | 2x2 of unique advantages | `/foundation-sprint-differentiation` |
| **foundation-sprint-approach-options** | 3-5 high-level approaches | `/foundation-sprint-approach-options` |
| **foundation-sprint-magic-lenses** | Approach scoring across 3-4 critical lenses | `/foundation-sprint-magic-lenses` |
| **foundation-sprint-founding-hypothesis** | Synthesize chosen approach into a testable hypothesis | `/foundation-sprint-founding-hypothesis` |
| **foundation-sprint-brief** | One-page sprint brief | `/foundation-sprint-brief` |

### Design Sprint family - 5-day prototype-and-test (7)

Canonical Knapp/Zeratsky/Kowitz workshop. Run the full arc with the [design-sprint workflow](_workflows/design-sprint.md) or pick individual steps. Concept primer: [docs/concepts/design-sprint.md](docs/concepts/design-sprint.md).

| Skill | What it does | Command |
|---|---|---|
| **design-sprint-readiness** | Decision tree for DS readiness | `/design-sprint-readiness` |
| **design-sprint-brief** | Pre-sprint brief: long-term goal, sprint questions | `/design-sprint-brief` |
| **design-sprint-map-and-target** | Customer journey map; chosen target | `/design-sprint-map-and-target` |
| **design-sprint-sketch** | Structured 4-step individual sketch session | `/design-sprint-sketch` |
| **design-sprint-decide-and-storyboard** | Heat map, straw poll, decider vote, storyboard | `/design-sprint-decide-and-storyboard` |
| **design-sprint-prototype-plan** | Realistic-enough Friday prototype plan | `/design-sprint-prototype-plan` |
| **design-sprint-test-and-score** | 5 customer interviews, scored patterns, decision | `/design-sprint-test-and-score` |

### Standalone tool skill

| Skill | What it does | Command |
|---|---|---|
| **note-and-vote** | Group decision mechanic usable inside any workshop | `/note-and-vote` |

### Utility - meta-tooling (10)

| Skill | What it does | Command |
|---|---|---|
| **pm-skill-builder** | Create new PM skills with gap analysis + guided drafting | `/pm-skill-builder` |
| **pm-skill-validate** | Audit a skill against conventions and quality criteria | `/pm-skill-validate` |
| **pm-skill-iterate** | Apply targeted improvements from feedback or reports | `/pm-skill-iterate` |
| **mermaid-diagrams** | Syntactically valid Mermaid diagrams for product docs | `/mermaid-diagrams` |
| **slideshow-creator** | Professional presentations from JSON deck specs | `/slideshow-creator` |
| **update-pm-skills** | Update local pm-skills installation | `/update-pm-skills` |

Plus 4 utility skills for AGENTS.md sync and release tooling. Source: [`skills/`](skills/). Universal skill map: [AGENTS.md](AGENTS.md).

### Workflows (multi-skill chains)

12 workflows ship today. Workflows encode handoff guidance between skills so context flows from discovery to delivery.

| Workflow | Best for | Skills chained |
|---|---|---|
| **[Foundation to Design](_workflows/foundation-to-design.md)** | End-to-end FS-to-DS arc | foundation-sprint-* + design-sprint-* |
| **[Foundation Sprint](_workflows/foundation-sprint.md)** | 2-day strategic alignment | All 7 foundation-sprint skills |
| **[Design Sprint](_workflows/design-sprint.md)** | 5-day prototype-and-test | All 7 design-sprint skills |
| **[Feature Kickoff](_workflows/feature-kickoff.md)** | New features | problem-statement, hypothesis, prd, user-stories, launch-checklist |
| **[Lean Startup](_workflows/lean-startup.md)** | Rapid validation | hypothesis, experiment-design, experiment-results, pivot-decision |
| **[Triple Diamond](_workflows/triple-diamond.md)** | Major initiatives | Full 26 phase-skill flow across 6 phases |
| **[Customer Discovery](_workflows/customer-discovery.md)** | Research synthesis | Raw research into a validated problem |
| **[Sprint Planning](_workflows/sprint-planning.md)** | Sprint prep | Sprint-ready stories from a backlog |
| **[Product Strategy](_workflows/product-strategy.md)** | Strategic initiatives | Frame a major strategic initiative |
| **[Post-Launch Learning](_workflows/post-launch-learning.md)** | Post-launch | Measure results and capture learnings |
| **[Stakeholder Alignment](_workflows/stakeholder-alignment.md)** | Leadership buy-in | Build a case for leadership |
| **[Technical Discovery](_workflows/technical-discovery.md)** | Tech feasibility | Evaluate feasibility and architecture |

Full reference: [docs/reference/workflows/](docs/reference/workflows/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Library samples and worked examples

Every skill ships with a worked `EXAMPLE.md` that anchors the agent's quality bar. On top of that, the `library/skill-output-samples/` directory holds full sample outputs across **three narrative threads**, each representing a different kind of product team. You read samples to:

- Calibrate expectations before running a skill (so you know what "good" looks like)
- See how skills compose into multi-step workflows (Foundation Sprint to Design Sprint, Triple Diamond end-to-end)
- Borrow phrasing, structure, or quality bar for your own work
- Understand the *kind* of output a skill produces before installing

The three threads:

| Thread | Persona | Use it to see |
|---|---|---|
| **Brainshelf** | Early-stage founder building a personal-knowledge product | Foundation Sprint outputs, lean canvas, hypothesis chains |
| **Storevine** | Mid-stage e-commerce PM running a checkout-conversion program | Experiment design, OKRs, retros, opportunity trees |
| **Workbench** | Internal-tools PM at a growing org | Stakeholder updates, ADRs, meeting recaps, refinement notes |

Each thread carries a self-consistent set of samples so a reader can follow one company's product story across skills.

**Browse:** [library/skill-output-samples/](library/skill-output-samples/) . Each skill's `references/EXAMPLE.md` also lives next to its `SKILL.md` for in-context reference.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Project status

### At a glance

| | |
|---|---|
| **Current version** | [v2.16.0](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.16.0) |
| **Skill count** | 59 (26 phase + 8 foundation + 10 utility + 15 tool) |
| **Sub-agents** | 4 (pm-critic, pm-skill-auditor, pm-changelog-curator, pm-release-conductor) |
| **Workflows** | 12 |
| **Slash commands** | 66 |
| **Spec** | [agentskills.io](https://agentskills.io/specification) |
| **License** | [Apache 2.0](LICENSE) |
| **Docs site** | [product-on-purpose.github.io/pm-skills](https://product-on-purpose.github.io/pm-skills/) |
| **MCP server** | [`pm-skills-mcp`](https://github.com/product-on-purpose/pm-skills-mcp) (maintenance mode) |

### Repository structure

The repo is organized so each kind of content lives in one canonical place. Quick orientation:

**`skills/`** - the 59 skills, one directory each, following the `SKILL.md` + `references/TEMPLATE.md` + `references/EXAMPLE.md` pattern.
- Reference: [docs/reference/project-structure.md](docs/reference/project-structure.md)

**`commands/`** - 66 slash commands that map to skills, workflows, and sub-agents for Claude Code.
- Reference: [AGENTS.md](AGENTS.md) for the universal command map

**`_workflows/`** - 12 multi-skill workflows that encode handoff guidance.
- Reference: [docs/reference/workflows/](docs/reference/workflows/)

**`subagents/`** - 4 Claude Code plugin sub-agents (v2.16.0+ active orchestration runtime).
- Reference: [docs/reference/runtime-components.md](docs/reference/runtime-components.md)

**`library/`** - sample outputs across 3 narrative threads (Brainshelf, Storevine, Workbench).
- See [Library samples and worked examples](#library-samples-and-worked-examples) above

**`scripts/`** - CI validators and release tooling, each shipping as `.sh` + `.ps1` + `.md` triplet.
- Reference: [CONTRIBUTING.md](CONTRIBUTING.md)

**`docs/`** - Astro Starlight site source (concept primers, guides, reference, releases).
- Browse: [product-on-purpose.github.io/pm-skills](https://product-on-purpose.github.io/pm-skills/)

**`.claude-plugin/`** - plugin marketplace manifest + plugin manifest for Claude Code install.
- Files: [marketplace.json](.claude-plugin/marketplace.json) + [plugin.json](.claude-plugin/plugin.json)

**`AGENTS.md`** - universal skill discovery file for AGENTS.md-aware agents.

**`CONTRIBUTING.md`** - skill-shape contract, validator suite, release workflow.

**`CHANGELOG.md`** - full version history.

### Roadmap

- v2.17+: end-to-end automations on the active-orchestration runtime (chained workflows without human handoff)
- Astro 6.x upgrade + Node 22.12+ (deferred from v2.15)
- DS validator full metadata-shape enforcement
- pm-skills-mcp catalog parity (currently paused per maintenance mode)

Tracked in [docs/internal/backlog-canonical.md](docs/internal/backlog-canonical.md).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Contributing

Bugs, features, and questions are welcome.

- Contribution guide: [CONTRIBUTING.md](CONTRIBUTING.md)
- Bugs: [open an issue](https://github.com/product-on-purpose/pm-skills/issues/new?labels=bug)
- Features: [open an issue](https://github.com/product-on-purpose/pm-skills/issues/new?labels=enhancement)
- Questions: [open a discussion](https://github.com/product-on-purpose/pm-skills/discussions)

Want to add a skill? Use the lifecycle tools: `/pm-skill-builder` to scaffold, `/pm-skill-validate` to check, `/pm-skill-iterate` to improve. See [docs/guides/pm-skill-lifecycle.md](docs/guides/pm-skill-lifecycle.md).

---

## FAQ

**Is this opinionated about my process?** No. Skills are canonical artifact formats. Mix and match.

**Do I need Claude Code?** No. Any agent that supports the [Agent Skills Specification](https://agentskills.io/specification) or auto-discovers via `AGENTS.md` works. See [docs/getting-started/platforms.md](docs/getting-started/platforms.md).

**Do I need the MCP server?** No. The file-based install is the recommended path.

**Can I use just a few skills, not all 59?** Yes. Invoke only what you need.

**Can I add my own skills?** Yes. See [CONTRIBUTING.md](CONTRIBUTING.md) and the lifecycle tools.

Full FAQ: [docs/reference/faq.md](docs/reference/faq.md).

---

## License

Apache 2.0. See [LICENSE](LICENSE). Built on the open [Agent Skills Specification](https://agentskills.io/specification). Triple Diamond framework extends the [Design Council's Double Diamond](https://medium.com/zendesk-creative-blog/the-zendesk-triple-diamond-process-fd857a11c179). Sprint methods adapted from Knapp/Zeratsky/Kowitz.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
