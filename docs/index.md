---
title: PM Skills
description: 40 AI agent skills for product managers - open-source, spec-compliant, and ready for Claude Code, Cursor, GitHub Copilot, and more.
tags:
  - Home
---

# PM Skills

**40 best-practice product management skills for AI agents.**

PM Skills teaches AI assistants how to produce professional PM artifacts - PRDs, user stories, acceptance criteria, experiment designs, and more. One command, consistent output, every time.

## The Triple Diamond

Skills are organized across 6 phases of the Triple Diamond framework - three diamonds covering the problem space, the solution space, and the learning space.

```mermaid
graph LR
    subgraph "Problem Space"
        D1["Discover<br/>3 skills"] --> D2["Define<br/>4 skills"]
    end
    subgraph "Solution Space"
        D3["Develop<br/>4 skills"] --> D4["Deliver<br/>6 skills"]
    end
    subgraph "Learning Space"
        D5["Measure<br/>5 skills"] --> D6["Iterate<br/>4 skills"]
    end
    D2 --> D3
    D4 --> D5
    D6 -.->|"next cycle"| D1
```

[:octicons-arrow-right-24: Learn about the Triple Diamond](concepts/triple-diamond-delivery-process.md)

## The Skills

<div class="grid cards" markdown>

-   :material-magnify: **Discover** - 3 skills

    ---

    Research, competitive analysis, stakeholder mapping

    [:octicons-arrow-right-24: Browse](skills/discover/)

-   :material-target: **Define** - 4 skills

    ---

    Problem framing, hypotheses, opportunity trees, JTBD

    [:octicons-arrow-right-24: Browse](skills/define/)

-   :material-wrench: **Develop** - 4 skills

    ---

    Solution briefs, ADRs, design rationale, spikes

    [:octicons-arrow-right-24: Browse](skills/develop/)

-   :material-rocket-launch: **Deliver** - 6 skills

    ---

    PRDs, user stories, acceptance criteria, edge cases, launch, release notes

    [:octicons-arrow-right-24: Browse](skills/deliver/)

-   :material-chart-line: **Measure** - 5 skills

    ---

    Experiments, instrumentation, dashboards, results, OKR grading

    [:octicons-arrow-right-24: Browse](skills/measure/)

-   :material-refresh: **Iterate** - 4 skills

    ---

    Retrospectives, lessons, refinement, pivot decisions

    [:octicons-arrow-right-24: Browse](skills/iterate/)

-   :material-layers-triple: **Foundation** - 8 skills

    ---

    Cross-cutting skills: persona, OKR writer, lean canvas, meeting lifecycle, stakeholder update

    [:octicons-arrow-right-24: Browse](skills/foundation/)

-   :material-tools: **Utility** - 6 skills

    ---

    Create, validate, iterate skills, generate diagrams and presentations, and update the library

    [:octicons-arrow-right-24: Browse](skills/utility/)

</div>

## Skills by Phase

26 domain skills across 6 phases, plus foundation and utility:

```mermaid
block-beta
    columns 6

    block:discover["Discover"]:1
        d1["/competitive-analysis"]
        d2["/interview-synthesis"]
        d3["/stakeholder-summary"]
    end

    block:define["Define"]:1
        f1["/problem-statement"]
        f2["/hypothesis"]
        f3["/opportunity-tree"]
        f4["/jtbd-canvas"]
    end

    block:develop["Develop"]:1
        v1["/solution-brief"]
        v2["/spike-summary"]
        v3["/adr"]
        v4["/design-rationale"]
    end

    block:deliver["Deliver"]:1
        l1["/prd"]
        l2["/user-stories"]
        l3["/acceptance-criteria"]
        l4["/edge-cases"]
        l5["/launch-checklist"]
        l6["/release-notes"]
    end

    block:measure["Measure"]:1
        m1["/experiment-design"]
        m2["/instrumentation-spec"]
        m3["/dashboard-requirements"]
        m4["/experiment-results"]
        m5["/okr-grader"]
    end

    block:iterate["Iterate"]:1
        i1["/retrospective"]
        i2["/lessons-log"]
        i3["/refinement-notes"]
        i4["/pivot-decision"]
    end

    discover --> define --> develop --> deliver --> measure --> iterate
```

**Plus:** `/lean-canvas` `/persona` `/okr-writer` `/meeting-agenda` `/meeting-brief` `/meeting-recap` `/meeting-synthesize` `/stakeholder-update` (Foundation - cross-cutting) · `/pm-skill-builder` `/pm-skill-validate` `/pm-skill-iterate` `/mermaid-diagrams` `/slideshow-creator` `/update-pm-skills` (Utility)

## The Skill Lifecycle

Three utility skills form a self-reinforcing quality loop for managing the skill library itself:

```mermaid
flowchart LR
    Create["/pm-skill-builder<br/>Create"] --> Validate["/pm-skill-validate<br/>Validate"]
    Validate --> Decision{Findings?}
    Decision -- "PASS" --> Ship["Ship"]
    Decision -- "WARN / FAIL" --> Iterate["/pm-skill-iterate<br/>Iterate"]
    Iterate --> Validate
```

**Create** a new skill with guided gap analysis and classification. **Validate** it against structural conventions and quality criteria. **Iterate** to fix findings from the validation report or apply feedback. Repeat until passing, then ship.

The lifecycle tools are what keep the library consistent as it grows - the validator catches drift, and the iterator applies fixes with version tracking and change summaries.

[:octicons-arrow-right-24: Learn more about the lifecycle](guides/pm-skill-lifecycle.md) · [:octicons-arrow-right-24: PM-Skill versioning](reference/pm-skill-versioning.md)

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

Follow three fictional companies through the complete product lifecycle - from discovery research to pivot decisions - with real prompts and full outputs.

<div class="grid cards" markdown>

-   :material-store: **Storevine** - B2B Ecommerce

    ---

    Building email marketing for 15K merchants. Organized prompts.

    [:octicons-arrow-right-24: Follow the journey](showcase/storevine.md)

-   :material-bookshelf: **Brainshelf** - Consumer PKM

    ---

    Building a morning digest for 22K users. Casual prompts.

    [:octicons-arrow-right-24: Follow the journey](showcase/brainshelf.md)

-   :material-office-building: **Workbench** - Enterprise Collaboration

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

## Workflows

9 guided multi-skill workflows for common PM processes. Each chains skills in a recommended sequence with handoff guidance.

| Workflow | Best for | Skills |
|----------|----------|--------|
| [Feature Kickoff](workflows/feature-kickoff.md) | New features | problem-statement → hypothesis → prd → user-stories → launch-checklist |
| [Lean Startup](workflows/lean-startup.md) | Rapid validation | hypothesis → experiment-design → experiment-results → pivot-decision |
| [Triple Diamond](workflows/triple-diamond.md) | Major initiatives | All 26 phase skills across 6 phases |
| [Customer Discovery](workflows/customer-discovery.md) | Research → problem | interview-synthesis → jtbd-canvas → opportunity-tree → problem-statement |
| [Sprint Planning](workflows/sprint-planning.md) | Sprint-ready stories | refinement-notes → user-stories → edge-cases |
| [Product Strategy](workflows/product-strategy.md) | Strategic framing | competitive-analysis → stakeholder-summary → opportunity-tree → solution-brief → adr |
| [Post-Launch Learning](workflows/post-launch-learning.md) | Ship → learn | instrumentation-spec → dashboard-requirements → experiment-results → retrospective → lessons-log |
| [Stakeholder Alignment](workflows/stakeholder-alignment.md) | Leadership buy-in | stakeholder-summary → problem-statement → solution-brief → launch-checklist |
| [Technical Discovery](workflows/technical-discovery.md) | Feasibility | spike-summary → adr → design-rationale |

[:octicons-arrow-right-24: All workflows](workflows/)

## Recent Releases

<!-- count-exempt:start -->
| Version | Date | Highlights |
|---------|------|-----------|
| **[v2.13.0](releases/Release_v2.13.0.md)** | 2026-05-05 | Foundation Hardening + Doc Stack Decision: maintenance and quality release with zero new skills; 7 new CI gates that catch doc drift on PRs (validator inventory 15 to 22; enforcing tier 5 to 10); Diataxis-aligned docs with `pm-skill-*` filename prefix; Pattern 5C generated-content marker; out-of-cycle pm-skills-mcp v2.9.3 security patch |
| **[v2.12.0](releases/Release_v2.12.0.md)** | 2026-05-03 | OKR Skills Launch: `foundation-okr-writer` + `measure-okr-grader` with canonical type and indicator-class enums; 38 to 40 skills |
| [v2.11.1](releases/Release_v2.11.1.md) | 2026-04-22 | skills.sh CLI compatibility patch: unblocks `npx skills add product-on-purpose/pm-skills`; lint hardening; em-dash sweep completion |
| **[v2.11.0](releases/Release_v2.11.0.md)** | 2026-04-18 | Meeting Skills Family: 5 foundation skills + canonical contract + enforcing CI; lean-canvas; 32 to 38 skills |
| [v2.10.0](releases/Release_v2.10.0.md) | 2026-04-11 | Utility skill expansion: `/mermaid-diagrams`, `/slideshow-creator`, `/update-pm-skills`. (v2.10.1 and v2.10.2 patches followed; see CHANGELOG.md for details.) |
| [v2.9.1](releases/Release_v2.9.1.md) | 2026-04-10 | Workflows guide + docs count consistency CI |
| [v2.9.0](releases/Release_v2.9.0.md) | 2026-04-06 | Workflows: rename bundles to workflows, expand 3 to 9, 7 `/workflow-*` commands |
<!-- count-exempt:end -->

[:octicons-arrow-right-24: All releases](releases/) · [:octicons-arrow-right-24: Full changelog](changelog.md)

## Links

- [:fontawesome-brands-github: GitHub Repository](https://github.com/product-on-purpose/pm-skills)
- [:material-server: MCP Server](https://github.com/product-on-purpose/pm-skills-mcp)
- [:material-file-document: Agent Skills Specification](https://agentskills.io/specification)
- [:material-tag: Browse by tag](tags.md)
