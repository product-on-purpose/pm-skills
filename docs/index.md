---
title: PM Skills
description: 29 AI agent skills for product managers — open-source, spec-compliant, and ready for Claude Code, Cursor, GitHub Copilot, and more.
tags:
  - Home
---

# PM Skills

**29 best-practice product management skills for AI agents.**

PM Skills teaches AI assistants how to produce professional PM artifacts — PRDs, user stories, acceptance criteria, experiment designs, and more. One command, consistent output, every time.

## The Triple Diamond

Skills are organized across 6 phases of the Triple Diamond framework — three diamonds covering the problem space, the solution space, and the learning space.

```mermaid
graph LR
    subgraph "Problem Space"
        D1["Discover\n3 skills"] --> D2["Define\n4 skills"]
    end
    subgraph "Solution Space"
        D3["Develop\n4 skills"] --> D4["Deliver\n6 skills"]
    end
    subgraph "Learning Space"
        D5["Measure\n4 skills"] --> D6["Iterate\n4 skills"]
    end
    D2 --> D3
    D4 --> D5
    D6 -.->|"next cycle"| D1
```

[:octicons-arrow-right-24: Learn about the Triple Diamond](concepts/triple-diamond.md)

## The Skills

<div class="grid cards" markdown>

- :material-magnify: **Discover** — 3 skills
  ---
  Research, competitive analysis, stakeholder mapping
  [:octicons-arrow-right-24: Browse](skills/discover/)

- :material-target: **Define** — 4 skills
  ---
  Problem framing, hypotheses, opportunity trees, JTBD
  [:octicons-arrow-right-24: Browse](skills/define/)

- :material-wrench: **Develop** — 4 skills
  ---
  Solution briefs, ADRs, design rationale, spikes
  [:octicons-arrow-right-24: Browse](skills/develop/)

- :material-rocket-launch: **Deliver** — 6 skills
  ---
  PRDs, user stories, acceptance criteria, edge cases, launch, release notes
  [:octicons-arrow-right-24: Browse](skills/deliver/)

- :material-chart-line: **Measure** — 4 skills
  ---
  Experiments, instrumentation, dashboards, results
  [:octicons-arrow-right-24: Browse](skills/measure/)

- :material-refresh: **Iterate** — 4 skills
  ---
  Retrospectives, lessons, refinement, pivot decisions
  [:octicons-arrow-right-24: Browse](skills/iterate/)

- :material-layers-triple: **Foundation** — 1 skill
  ---
  Cross-cutting persona generation
  [:octicons-arrow-right-24: Browse](skills/foundation/)

- :material-tools: **Utility** — 3 skills
  ---
  Create, validate, and iterate skills themselves
  [:octicons-arrow-right-24: Browse](skills/utility/)

</div>

## Skills by Phase

Every skill mapped to its phase, with the command to invoke it:

```mermaid
graph TD
    subgraph "Discover"
        S1["/competitive-analysis"]
        S2["/interview-synthesis"]
        S3["/stakeholder-summary"]
    end
    subgraph "Define"
        S4["/problem-statement"]
        S5["/hypothesis"]
        S6["/opportunity-tree"]
        S7["/jtbd-canvas"]
    end
    subgraph "Develop"
        S8["/solution-brief"]
        S9["/spike-summary"]
        S10["/adr"]
        S11["/design-rationale"]
    end
    subgraph "Deliver"
        S12["/prd"]
        S13["/user-stories"]
        S14["/acceptance-criteria"]
        S15["/edge-cases"]
        S16["/launch-checklist"]
        S17["/release-notes"]
    end
    subgraph "Measure"
        S18["/experiment-design"]
        S19["/instrumentation-spec"]
        S20["/dashboard-requirements"]
        S21["/experiment-results"]
    end
    subgraph "Iterate"
        S22["/retrospective"]
        S23["/lessons-log"]
        S24["/refinement-notes"]
        S25["/pivot-decision"]
    end

    S1 & S2 & S3 --> S4 & S5
    S4 & S5 & S6 & S7 --> S8
    S8 & S9 & S10 & S11 --> S12
    S12 & S13 & S14 & S15 --> S18
    S18 & S19 & S20 & S21 --> S22
```

## The Skill Lifecycle

Three utility skills form a self-reinforcing quality loop for managing the skill library itself:

```mermaid
flowchart LR
    Create["/pm-skill-builder\nCreate"] --> Validate["/pm-skill-validate\nValidate"]
    Validate --> Decision{Findings?}
    Decision -- "PASS" --> Ship["Ship"]
    Decision -- "WARN / FAIL" --> Iterate["/pm-skill-iterate\nIterate"]
    Iterate --> Validate
```

**Create** a new skill with guided gap analysis and classification. **Validate** it against structural conventions and quality criteria. **Iterate** to fix findings from the validation report or apply feedback. Repeat until passing, then ship.

The lifecycle tools are what keep the library consistent as it grows — the validator catches drift, and the iterator applies fixes with version tracking and change summaries.

[:octicons-arrow-right-24: Learn more about the lifecycle](concepts/skill-lifecycle.md) · [:octicons-arrow-right-24: Skill versioning](concepts/versioning.md)

## Quick Start

```bash
git clone https://github.com/product-on-purpose/pm-skills.git
cd pm-skills
```

Then use any skill:

```
/prd "Search feature for e-commerce platform"
/hypothesis "Will one-page checkout increase conversion?"
/acceptance-criteria "User can reset password via email"
```

[:octicons-arrow-right-24: Full setup guide](getting-started/) · [:octicons-arrow-right-24: Find the right skill](guides/skill-finder.md) · [:octicons-arrow-right-24: Recipes](guides/recipes.md)

## See It In Action

Follow three fictional companies through the complete product lifecycle — from discovery research to pivot decisions — with real prompts and full outputs.

<div class="grid cards" markdown>

- :material-store: **Storevine** — B2B Ecommerce
  ---
  Building email marketing for 15K merchants. Organized prompts.
  [:octicons-arrow-right-24: Follow the journey](showcase/storevine.md)

- :material-bookshelf: **Brainshelf** — Consumer PKM
  ---
  Building a morning digest for 22K users. Casual prompts.
  [:octicons-arrow-right-24: Follow the journey](showcase/brainshelf.md)

- :material-office-building: **Workbench** — Enterprise Collaboration
  ---
  Building document templates for 500 enterprises. Structured prompts.
  [:octicons-arrow-right-24: Follow the journey](showcase/workbench.md)

</div>

## Works Everywhere

| Platform | Method |
|----------|--------|
| **Claude Code** | Slash commands (`/prd`, `/hypothesis`, etc.) |
| **GitHub Copilot** | AGENTS.md auto-discovery |
| **Cursor / Windsurf** | AGENTS.md or [MCP server](https://github.com/product-on-purpose/pm-skills-mcp) |
| **Claude.ai / Desktop** | ZIP upload or MCP |
| **Any MCP client** | [pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp) |

## Links

- [:fontawesome-brands-github: GitHub Repository](https://github.com/product-on-purpose/pm-skills)
- [:material-server: MCP Server](https://github.com/product-on-purpose/pm-skills-mcp)
- [:material-file-document: Agent Skills Specification](https://agentskills.io/specification)
- [:material-tag: Browse by tag](tags.md)
