<!--
DRAFT README v10: "Minimal docs-site companion". Target ~350 lines vs current 1,305.
Approach: Bets that the Astro Starlight docs site (shipped in v2.14.0) is good enough to be the primary surface for everything beyond install, the catalog, and the most-recent changes. README is intentionally short and uses "see docs site" as the dominant pattern after the constrained top. Honors the user's "include the full catalog and workflows" requirement: catalog appears as compact tables (not per-skill descriptions), full workflows table is preserved. Methodology and lifecycle sections collapsed into one-liners with docs-site links.
Bet: A shorter README that points hard at a great docs site beats a long README that competes with the docs site. The docs site search now works (Pagefind, v2.14.0+); the README's job is funnel, not destination.
Constraints honored:
  - MCP server notice stays at top (closed-by-default <details>).
  - Quick install near top.
  - Recent releases visible at top: human-centered What's New (compressed to 2-3 lines per outcome) + collapsed release-by-release stack.
Tradeoff: This is the least exhaustive of the four drafts. Reader who refuses to browse the docs site will get less. Reader who follows links arrives at richer content faster.
-->

<a id="readme-top"></a>

<h1 align="center">PM-Skills</h1>

<p align="center">
  <strong>59 production-ready product management skills your AI agent can run today.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2.16.0-blue?style=flat-square" alt="v2.16.0">
  <img src="https://img.shields.io/badge/skills-59-brightgreen?style=flat-square" alt="59 skills">
  <img src="https://img.shields.io/badge/spec-agentskills.io-orange?style=flat-square" alt="Agent Skills Spec">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-Apache%202.0-blue?style=flat-square" alt="Apache 2.0"></a>
  <a href="https://github.com/product-on-purpose/pm-skills-mcp"><img src="https://img.shields.io/badge/MCP_Server-maintenance%20mode-yellow?style=flat-square" alt="MCP maintenance"></a>
</p>

<p align="center">
  <a href="https://product-on-purpose.github.io/pm-skills/"><strong>Full docs site</strong></a> .
  <a href="#install">Install</a> .
  <a href="#whats-new">What's new</a> .
  <a href="#skills">Skills</a> .
  <a href="#workflows">Workflows</a>
</p>

<p align="center">
  <em>This README is intentionally short. The <a href="https://product-on-purpose.github.io/pm-skills/">docs site</a> is the source of truth for the catalog, methodology, and how-to guides.</em>
</p>

---

<details>
<summary><strong>MCP server: maintenance mode (effective 2026-05-04)</strong></summary>

The companion [`pm-skills-mcp`](https://github.com/product-on-purpose/pm-skills-mcp) server is in the v2.9.x maintenance line. The MCP catalog is frozen at the v2.9.2 build. Security patches and critical bug fixes continue.

**For new users, the file-based install paths below are the recommended path.** See [MCP Integration](docs/guides/mcp-integration.md) for status details.

</details>

---

## Install

```
/plugin marketplace add product-on-purpose/pm-skills
/plugin install pm-skills@pm-skills-marketplace
```

In Claude Code. All 59 skills and 66 commands resolve from any directory.

For other agents (Cursor, Copilot, Cline) or platforms (Claude.ai, MCP clients, ChatGPT), see [docs/getting-started/](docs/getting-started/) and [docs/getting-started/platforms.md](docs/getting-started/platforms.md).

---

## What's new

The library is under active development. Here are the changes from the last few releases that matter most for usage.

**Sprint methodologies are first-class skills (v2.15.0).** 15 new skills for Foundation Sprint (Knapp/Zeratsky 2-day) and Design Sprint (Knapp/Zeratsky/Kowitz 5-day). Concept primers: [`docs/concepts/foundation-sprint.md`](docs/concepts/foundation-sprint.md), [`docs/concepts/design-sprint.md`](docs/concepts/design-sprint.md). Chained workflow: [`_workflows/foundation-to-design.md`](_workflows/foundation-to-design.md).

**Faster, more searchable docs site (v2.14.x).** Migrated from MkDocs Material to Astro Starlight. Pagefind search, native dark mode, Node 22.x build. Browse: [product-on-purpose.github.io/pm-skills](https://product-on-purpose.github.io/pm-skills/). Migration notes: [`docs/internal/release-plans/v2.14.0/`](docs/internal/release-plans/v2.14.0/).

**Active orchestration is now possible (v2.16.0).** First 4 active-orchestration sub-agents shipped; 6-gate release runbook codified. Foundation for chained workflows without human handoffs. Get started: [`docs/reference/runtime-components.md`](docs/reference/runtime-components.md).

<details>
<summary><strong>Full release-by-release changelog</strong></summary>

<details open>
<summary><strong>v2.16.0 - Active Orchestration</strong></summary>

- First 4 active orchestration sub-agents shipped.
- 6-gate release runbook codified.
- [Release note](docs/releases/Release_v2.16.0.md).

</details>

<details>
<summary><strong>v2.15.0 - Sprint Skills Launch</strong></summary>

- 15 new skills (7 FS + 7 DS + 1 standalone). Catalog grows 40 to 55.
- 3 new workflows including `foundation-to-design`.
- [Release note](docs/releases/Release_v2.15.0.md).

</details>

<details>
<summary><strong>v2.14.x - Doc Stack Migration</strong></summary>

- v2.14.0: Astro Starlight ships.
- v2.14.1: title fix + Mermaid beautification + validators promoted.
- v2.14.2: cumulative docs hygiene patch.

</details>

</details>

Full history: [CHANGELOG.md](CHANGELOG.md) . [Releases](https://github.com/product-on-purpose/pm-skills/releases).

---

## Skills

All 59 skills, grouped. For per-skill descriptions, sample outputs, and slash command details, see the [docs site catalog](https://product-on-purpose.github.io/pm-skills/) or [`skills/`](skills/).

### Discover - find the right problem (3)

`interview-synthesis` . `competitive-analysis` . `stakeholder-summary`

### Define - frame the problem (4)

`problem-statement` . `hypothesis` . `opportunity-tree` . `jtbd-canvas`

### Develop - explore solutions (4)

`solution-brief` . `spike-summary` . `adr` . `design-rationale`

### Deliver - ship it (6)

`prd` . `user-stories` . `acceptance-criteria` . `edge-cases` . `launch-checklist` . `release-notes`

### Measure - validate with data (5)

`experiment-design` . `instrumentation-spec` . `dashboard-requirements` . `experiment-results` . `okr-grader`

### Iterate - learn and improve (4)

`retrospective` . `lessons-log` . `refinement-notes` . `pivot-decision`

### Foundation - cross-cutting (8)

`persona` . `lean-canvas` . `okr-writer` . `stakeholder-update` . `meeting-agenda` . `meeting-brief` . `meeting-recap` . `meeting-synthesize`

### Foundation Sprint family - 2-day strategic alignment (7)

Canonical Knapp/Zeratsky workshop. Run the full arc with `/foundation-sprint` or pick individual steps.

`foundation-sprint-readiness` . `foundation-sprint-basics` . `foundation-sprint-differentiation` . `foundation-sprint-approach-options` . `foundation-sprint-magic-lenses` . `foundation-sprint-founding-hypothesis` . `foundation-sprint-brief`

### Design Sprint family - 5-day prototype-and-test (7)

Canonical Knapp/Zeratsky/Kowitz workshop. Run the full arc with `/design-sprint` or pick individual steps.

`design-sprint-readiness` . `design-sprint-brief` . `design-sprint-map-and-target` . `design-sprint-sketch` . `design-sprint-decide-and-storyboard` . `design-sprint-prototype-plan` . `design-sprint-test-and-score`

### Standalone tool (1)

`note-and-vote` - group decision mechanic usable inside any workshop.

### Utility - meta-tooling (10)

`pm-skill-builder` . `pm-skill-validate` . `pm-skill-iterate` . `mermaid-diagrams` . `slideshow-creator` . `update-pm-skills` (plus 4 AGENTS.md / release helpers).

**Try one:** `/prd "A focus-mode feature for our task app"`. The agent reads the skill, follows its template, mirrors its worked example, and produces a complete PRD. Full anatomy: [docs/guides/anatomy-of-a-skill.md](docs/guides/anatomy-of-a-skill.md).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Workflows

12 multi-skill chains for common PM journeys. Workflows encode handoff guidance between skills.

| Workflow | Best for | Skills chained |
|---|---|---|
| **[Foundation to Design](_workflows/foundation-to-design.md)** | End-to-end FS-to-DS arc | foundation-sprint-* + design-sprint-* |
| **[Foundation Sprint](_workflows/foundation-sprint.md)** | 2-day strategic alignment | All 7 foundation-sprint skills |
| **[Design Sprint](_workflows/design-sprint.md)** | 5-day prototype-and-test | All 7 design-sprint skills |
| **[Feature Kickoff](_workflows/feature-kickoff.md)** | New features | problem-statement, hypothesis, prd, user-stories, launch-checklist |
| **[Lean Startup](_workflows/lean-startup.md)** | Rapid validation | hypothesis, experiment-design, experiment-results, pivot-decision |
| **[Triple Diamond](_workflows/triple-diamond.md)** | Major initiatives | Full 26 phase-skill flow across 6 phases |
| **[Customer Discovery](_workflows/customer-discovery.md)** | Research synthesis | Raw research to validated problem |
| **[Sprint Planning](_workflows/sprint-planning.md)** | Sprint prep | Sprint-ready stories from a backlog |
| **[Product Strategy](_workflows/product-strategy.md)** | Strategic initiatives | Frame a major strategic initiative |
| **[Post-Launch Learning](_workflows/post-launch-learning.md)** | Post-launch | Measure results, capture learnings |
| **[Stakeholder Alignment](_workflows/stakeholder-alignment.md)** | Leadership buy-in | Build a case for leadership |
| **[Technical Discovery](_workflows/technical-discovery.md)** | Tech feasibility | Evaluate feasibility and architecture |

Full reference: [docs/reference/workflows/](docs/reference/workflows/).

---

## Methodology and library design

Built on canonical PM frameworks: [Agent Skills Spec](https://agentskills.io/specification), [Triple Diamond](https://medium.com/zendesk-creative-blog/the-zendesk-triple-diamond-process-fd857a11c179), [Foundation Sprint](https://www.jakeknapp.com/foundation-sprint), [Design Sprint](https://www.thesprintbook.com/), [Opportunity Solution Trees](https://www.producttalk.org/opportunity-solution-tree/), [Jobs to be Done](https://jtbd.info/), [Architecture Decision Records](https://adr.github.io/), [Keep a Changelog](https://keepachangelog.com/).

Each skill is a 3-file directory: `SKILL.md` (method) + `references/TEMPLATE.md` (structure) + `references/EXAMPLE.md` (quality anchor). Full anatomy and design rationale on the docs site: [How a skill works](https://product-on-purpose.github.io/pm-skills/guides/anatomy-of-a-skill/) and [Library design](https://product-on-purpose.github.io/pm-skills/reference/categories/).

For contributors: skill lifecycle is `/pm-skill-builder` -> `/pm-skill-validate` -> `/pm-skill-iterate`. See [CONTRIBUTING.md](CONTRIBUTING.md) and [docs/guides/pm-skill-lifecycle.md](docs/guides/pm-skill-lifecycle.md).

---

## pm-skills vs pm-skills-mcp

|  | **pm-skills** (this repo) | [**pm-skills-mcp**](https://github.com/product-on-purpose/pm-skills-mcp) |
|---|---|---|
| **Format** | Markdown library | MCP server |
| **Status** | Active development | Maintenance mode (catalog frozen) |
| **Recommended for** | New users, all platforms | MCP-only clients |

Most users want the file-based path. See [MCP Integration](docs/guides/mcp-integration.md) for when MCP is the right choice.

---

## Project status

| | |
|---|---|
| **Current version** | [v2.16.0](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.16.0) |
| **Skill count** | 59 (26 phase + 8 foundation + 10 utility + 15 tool) |
| **License** | [Apache 2.0](LICENSE) |
| **Docs site** | [product-on-purpose.github.io/pm-skills](https://product-on-purpose.github.io/pm-skills/) |
| **MCP server** | [`pm-skills-mcp`](https://github.com/product-on-purpose/pm-skills-mcp) (maintenance mode) |
| **Changelog** | [CHANGELOG.md](CHANGELOG.md) |
| **FAQ** | [docs/reference/faq.md](docs/reference/faq.md) |
| **Contributing** | [CONTRIBUTING.md](CONTRIBUTING.md) |

---

## License

Apache 2.0. See [LICENSE](LICENSE). Built on the open [Agent Skills Specification](https://agentskills.io/specification).

<p align="right">(<a href="#readme-top">back to top</a>)</p>
