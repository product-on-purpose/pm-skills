<!--
DRAFT README v5 (revised 2026-05-18): "Operator's README, full detail edition". Target ~500 lines vs current 1,305.
First-pass v5 was too thin; this rewrite restores the full per-skill catalog, methodology context, and library explanation while keeping the operator-first ordering.
Approach: Reader scrolls in, finds install fast, finds "what changed lately and why I care" fast, then can dive into the full catalog, methodology basis, and library structure. Voice stays operational but the body has substance.
Constraints honored:
  - MCP server notice stays at top (closed-by-default <details> right after hero).
  - Quick install near top.
  - Past couple releases visible at top: new "What's new" section leads with human-centered "why it matters + how to start" framing; release-by-release expand/collapse stack lives just below for readers who want the detail-by-release view.
Body shape:
  1. Hero + badges + nav
  2. MCP notice
  3. Install (Claude Code + skills CLI inline, others in details)
  4. What's new (human-centered, 3 outcome-grouped highlights) + collapsed release-by-release detail
  5. The big idea
  6. Built on canonical PM frameworks (methodology section)
  7. The library (anatomy, lifecycle, full per-classification breakdown)
  8. Workflows (full table)
  9. pm-skills vs pm-skills-mcp
  10. Project status, FAQ, Contributing, License
-->

<a id="readme-top"></a>

<h1 align="center">PM-Skills</h1>

<p align="center">
  <strong>59 production-ready product management skills your AI agent can run today.</strong><br>
  PRDs, OKRs, hypotheses, opportunity trees, retros, Foundation Sprint, Design Sprint, and 50 more,<br>
  each shipping with a template, a worked example, and a slash command.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2.16.0-blue?style=flat-square" alt="v2.16.0">
  <img src="https://img.shields.io/badge/skills-59-brightgreen?style=flat-square" alt="59 skills">
  <img src="https://img.shields.io/badge/spec-agentskills.io-orange?style=flat-square" alt="Agent Skills Spec">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-Apache%202.0-blue?style=flat-square" alt="Apache 2.0"></a>
  <a href="https://github.com/product-on-purpose/pm-skills-mcp"><img src="https://img.shields.io/badge/MCP_Server-maintenance%20mode-yellow?style=flat-square" alt="MCP maintenance"></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" alt="PRs welcome"></a>
</p>

<p align="center">
  <a href="#install">Install</a> .
  <a href="#whats-new">What's new</a> .
  <a href="#the-big-idea">The big idea</a> .
  <a href="#the-library">The library</a> .
  <a href="#workflows">Workflows</a> .
  <a href="#faq">FAQ</a> .
  <a href="https://product-on-purpose.github.io/pm-skills/">Docs site</a>
</p>

---

<details>
<summary><strong>MCP server: maintenance mode (effective 2026-05-04)</strong></summary>

The companion [`pm-skills-mcp`](https://github.com/product-on-purpose/pm-skills-mcp) server is in the v2.9.x maintenance line (latest v2.9.3). The MCP catalog is frozen at the v2.9.2 build (40 MCP-embedded entries + 11 workflow tools + 8 utility tools). Security patches and critical bug fixes continue. Skill parity with the file-based library is on hold.

**For new users, the file-based install paths below are the recommended path.** See [MCP Integration](docs/guides/mcp-integration.md) for status details and resumption criteria.

</details>

---

## Install

Pick the path that matches your tool. Each one is one command.

### Claude Code (recommended)

```
/plugin marketplace add product-on-purpose/pm-skills
/plugin install pm-skills@pm-skills-marketplace
```

All 59 skills and 66 commands resolve from any directory. Verify with `/plugin list`.

### Any agent supported by the open skills CLI

Works with Claude Code, Cursor, GitHub Copilot, Cline, and any agent supported by the open [`skills` CLI](https://github.com/vercel-labs/skills).

```bash
npx skills add product-on-purpose/pm-skills
```

Skills land in your agent's default skills directory. No clone, no sync.

<details>
<summary><strong>Other platforms (Claude.ai, MCP clients, OpenCode, Cursor, Windsurf, ChatGPT)</strong></summary>

See [docs/getting-started/platforms.md](docs/getting-started/platforms.md) for ZIP-upload flows (Claude.ai, Claude Desktop), MCP configuration JSON, AGENTS.md auto-discovery setup (Cursor, Windsurf, Copilot), and manual copy patterns for unsupported tools.

For a longer-form walkthrough, see [docs/getting-started/](docs/getting-started/index.md).

</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## What's new

The library is under active development. Here are the changes from the last few releases that are most likely to matter for how you use it.

### Sprint methodologies are now first-class skills (v2.15.0)

**What changed.** 15 new skills cover the canonical Foundation Sprint (Knapp/Zeratsky 2-day strategic alignment) and Design Sprint (Knapp/Zeratsky/Kowitz 5-day prototype-and-test) methodologies. The 7-member Foundation Sprint family walks teams through the strategic-alignment workshop; the 7-member Design Sprint family walks teams through the prototype-and-test workshop. Plus a standalone `note-and-vote` skill (the group-decision mechanic used inside both methods).

**Why it matters.** If you run sprints, you don't have to translate the books into prompts anymore. The agent runs the workshop with you using the canonical moves (basics, differentiation, magic lenses, decide-and-storyboard, prototype-plan, test-and-score). Outputs are workshop artifacts your team can react to, not boilerplate.

**Get started.** Read the concept primers ([`docs/concepts/foundation-sprint.md`](docs/concepts/foundation-sprint.md), [`docs/concepts/design-sprint.md`](docs/concepts/design-sprint.md)) or jump into the chained workflow [`_workflows/foundation-to-design.md`](_workflows/foundation-to-design.md), which threads FS into DS end-to-end with a 12-row slot-mapping table and a 3-question go/no-go checkpoint.

### Faster, more searchable docs site (v2.14.x line)

**What changed.** We retired MkDocs Material and migrated the docs site to Astro Starlight. Same URLs, same content, but with client-side Pagefind search, native dark mode, and modern static-site infrastructure. v2.14.1 added the canonical Mermaid style guide; v2.14.2 closed out a cumulative docs hygiene patch.

**Why it matters.** If you spend time browsing the catalog or the workflows section, search actually works now (full-text, instant, no more "no results" for skill names you can see in the sidebar). If you maintain a fork, the build pipeline is Node 22.x instead of Python pip.

**Get started.** Browse [product-on-purpose.github.io/pm-skills](https://product-on-purpose.github.io/pm-skills/). Maintainers and forkers: the migration notes live at [`docs/internal/release-plans/v2.14.0/`](docs/internal/release-plans/v2.14.0/).

### Active orchestration is now possible (v2.16.0)

**What changed.** The first 4 active-orchestration sub-agents shipped, giving agents a stable interface for spawning sub-tasks against the skill catalog from any client. The 6-gate pre-tag release runbook is also now written down rather than oral tradition.

**Why it matters.** This is foundation work for chained workflows that don't need a human in the handoff loop. Today the practical impact is small (the dispatch surface exists and is documented). In v2.17+ this is what end-to-end automations will run on top of. If you're contributing skills, the runbook gives you a checklist for release readiness.

**Get started.** Read [`docs/reference/runtime-components.md`](docs/reference/runtime-components.md) for the new component class. Release runbook is at [`docs/internal/release-plans/v2.16.0/`](docs/internal/release-plans/v2.16.0/).

<details>
<summary><strong>Full release-by-release changelog (recent versions)</strong></summary>

<details open>
<summary><strong>v2.16.0 - Active Orchestration</strong></summary>

- First 4 active orchestration sub-agents shipped (cross-client dispatch).
- 6-gate release runbook codified (`--strict` validator bundle at pre-tag).
- Release note: [`docs/releases/Release_v2.16.0.md`](docs/releases/Release_v2.16.0.md).

</details>

<details>
<summary><strong>v2.15.0 - Sprint Skills Launch (Foundation Sprint + Design Sprint families)</strong></summary>

- 15 new skills under `classification: tool` (7 FS + 7 DS + 1 standalone). Catalog grows 40 to 55.
- Two family contracts with enforcing CI validators; both support `--strict` at release time.
- 3 new workflows including `_workflows/foundation-to-design.md`.
- 45 library samples across 3 narrative threads (Brainshelf, Storevine, Workbench).
- Release note: [`docs/releases/Release_v2.15.0.md`](docs/releases/Release_v2.15.0.md).

</details>

<details>
<summary><strong>v2.14.x - Doc Stack Migration + closures</strong></summary>

- v2.14.0: MkDocs Material retired; Astro Starlight ships. Node 22.x build, Pagefind search, client-side Mermaid.
- v2.14.1: title-duplication fix, Mermaid 3-layer beautification, three CI validators promoted to truly enforcing.
- v2.14.2: Codex final review closure; cumulative docs hygiene patch; 40-skill catalog unchanged.
- Release notes: [`v2.14.0`](docs/releases/Release_v2.14.0.md) . [`v2.14.1`](docs/releases/Release_v2.14.1.md) . [`v2.14.2`](docs/releases/Release_v2.14.2.md).

</details>

</details>

Full history: [CHANGELOG.md](CHANGELOG.md) . [Releases](https://github.com/product-on-purpose/pm-skills/releases).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## The big idea

**Stop prompt-fumbling. Start shipping.** Every time you ask an AI to help with product management, you start from zero. Generic responses. Inconsistent formats. Missing critical sections. Hours lost to repetitive prompt crafting.

PM-Skills changes that. It's a curated library of 59 best-practice skills, each one a specialized capability your agent can invoke on demand. The agent reads the skill's instructions, mirrors a worked example, follows a structured template, and produces a professional artifact in the format your team expects.

```
You: /prd "A focus-mode feature for our task app"

Agent: [reads skills/deliver-prd/SKILL.md]
       [mirrors quality bar from references/EXAMPLE.md]
       [follows references/TEMPLATE.md structure]

Output: A complete PRD with problem statement, success metrics,
        user stories, scope, dependencies, and open questions.
```

| Without PM-Skills | With PM-Skills |
|---|---|
| Generic AI responses | Battle-tested PM frameworks |
| Inconsistent formats across artifacts | Production-ready templates |
| Missing critical sections | Comprehensive coverage |
| Prompt-engineering every time | One command, instant output |
| Tribal knowledge in your head | Institutional knowledge in your repo |

### Built on canonical PM frameworks

PM-Skills is opinionated about quality, not opinionated about your process. Each skill is a canonical artifact format drawn from established sources.

| Foundation | What it gives us |
|---|---|
| [Agent Skills Specification](https://agentskills.io/specification) | Open standard for AI-agent skills; works across the ecosystem |
| [Triple Diamond Framework](https://medium.com/zendesk-creative-blog/the-zendesk-triple-diamond-process-fd857a11c179) | Six-phase product cycle (extends Design Council's Double Diamond): Discover, Define, Develop, Deliver, Measure, Iterate |
| [Foundation Sprint](https://www.jakeknapp.com/foundation-sprint) (Knapp/Zeratsky) | 2-day strategic alignment for early-stage teams: basics, differentiation, approach options, magic lenses, founding hypothesis, brief |
| [Design Sprint](https://www.thesprintbook.com/) (Knapp/Zeratsky/Kowitz) | 5-day prototype-and-test for ambiguous problems: map-and-target, sketch, decide-and-storyboard, prototype-plan, test-and-score |
| [Opportunity Solution Trees](https://www.producttalk.org/opportunity-solution-tree/) (Teresa Torres) | Outcome-driven discovery framework |
| [Jobs to be Done](https://jtbd.info/) | Customer-motivation framework |
| [Architecture Decision Records](https://adr.github.io/) (Michael Nygard format) | Technical decision documentation |
| [Keep a Changelog](https://keepachangelog.com/) | Structured release documentation |

Mix and match to fit your team's flow. You don't have to adopt the Triple Diamond to use the skills; each one stands on its own.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## The library

59 skills across 4 classifications. Every skill ships as a three-file directory:

```
skills/deliver-prd/
  SKILL.md                  <- agent instructions (the canonical method)
  references/
    TEMPLATE.md             <- the structure the output follows
    EXAMPLE.md              <- a worked example to mirror the quality bar
```

Full anatomy and design rationale: [docs/guides/anatomy-of-a-skill.md](docs/guides/anatomy-of-a-skill.md).

### Discover - find the right problem (3 phase skills)

| Skill | What it does | Command |
|---|---|---|
| **interview-synthesis** | Turn user research into actionable insights | `/interview-synthesis` |
| **competitive-analysis** | Map the landscape, find opportunities | `/competitive-analysis` |
| **stakeholder-summary** | Understand who matters and what they need | `/stakeholder-summary` |

### Define - frame the problem (4 phase skills)

| Skill | What it does | Command |
|---|---|---|
| **problem-statement** | Crystal-clear problem framing | `/problem-statement` |
| **hypothesis** | Testable assumptions with success metrics | `/hypothesis` |
| **opportunity-tree** | Teresa Torres-style outcome mapping | `/opportunity-tree` |
| **jtbd-canvas** | Jobs to be Done framework | `/jtbd-canvas` |

### Develop - explore solutions (4 phase skills)

| Skill | What it does | Command |
|---|---|---|
| **solution-brief** | One-page solution pitch | `/solution-brief` |
| **spike-summary** | Document technical explorations | `/spike-summary` |
| **adr** | Architecture Decision Records (Nygard format) | `/adr` |
| **design-rationale** | Why you made that design choice | `/design-rationale` |

### Deliver - ship it (6 phase skills)

| Skill | What it does | Command |
|---|---|---|
| **prd** | Comprehensive product requirements | `/prd` |
| **user-stories** | INVEST-compliant stories with acceptance criteria | `/user-stories` |
| **acceptance-criteria** | Given/When/Then testable scenarios | `/acceptance-criteria` |
| **edge-cases** | Error states, boundaries, recovery paths | `/edge-cases` |
| **launch-checklist** | Never miss a launch step again | `/launch-checklist` |
| **release-notes** | User-facing release communication | `/release-notes` |

### Measure - validate with data (5 phase skills)

| Skill | What it does | Command |
|---|---|---|
| **experiment-design** | Rigorous A/B test planning | `/experiment-design` |
| **instrumentation-spec** | Event tracking requirements | `/instrumentation-spec` |
| **dashboard-requirements** | Analytics dashboard specs | `/dashboard-requirements` |
| **experiment-results** | Document learnings from experiments | `/experiment-results` |
| **okr-grader** | Score completed OKR sets at cycle close with KR-level scoring + learning synthesis | `/okr-grader` |

### Iterate - learn and improve (4 phase skills)

| Skill | What it does | Command |
|---|---|---|
| **retrospective** | Team retros that drive action | `/retrospective` |
| **lessons-log** | Build organizational memory | `/lessons-log` |
| **refinement-notes** | Capture backlog refinement outcomes | `/refinement-notes` |
| **pivot-decision** | Evidence-based pivot/persevere framework | `/pivot-decision` |

### Foundation - cross-cutting (8 foundation skills)

| Skill | What it does | Command |
|---|---|---|
| **persona** | Generate product or marketing personas with evidence and confidence | `/persona` |
| **lean-canvas** | Capture problem, customer segment, value prop, and key metrics on one page | `/lean-canvas` |
| **okr-writer** | Draft an OKR plan with tight, measurable key results | `/okr-writer` |
| **stakeholder-update** | Compose a stakeholder-facing update from project state and recent activity | `/stakeholder-update` |
| **meeting-agenda** | Draft a focused agenda from purpose, attendees, and time-box | `/meeting-agenda` |
| **meeting-brief** | One-page brief priming attendees with context and pre-reads | `/meeting-brief` |
| **meeting-recap** | Synthesize a meeting transcript into decisions, actions, and follow-ups | `/meeting-recap` |
| **meeting-synthesize** | Cross-meeting synthesis distilling themes from multiple sessions | `/meeting-synthesize` |

### Foundation Sprint family - 2-day strategic alignment (7 tool skills)

Canonical Knapp/Zeratsky workshop, sequenced from readiness through brief. Run the whole arc with the `foundation-sprint` workflow.

| Skill | What it does | Command |
|---|---|---|
| **foundation-sprint-readiness** | Decision tree: is your team ready for an FS, or should you do something else first? | `/foundation-sprint-readiness` |
| **foundation-sprint-basics** | Customer, problem, competition (founding 3-tuple) | `/foundation-sprint-basics` |
| **foundation-sprint-differentiation** | 2x2 of unique advantages against the competition | `/foundation-sprint-differentiation` |
| **foundation-sprint-approach-options** | Generate 3-5 high-level approaches to the problem | `/foundation-sprint-approach-options` |
| **foundation-sprint-magic-lenses** | Score approaches with 3-4 critical lenses (customer, business, tech, etc.) | `/foundation-sprint-magic-lenses` |
| **foundation-sprint-founding-hypothesis** | Synthesize the chosen approach into a testable founding hypothesis | `/foundation-sprint-founding-hypothesis` |
| **foundation-sprint-brief** | One-page brief capturing the full sprint output | `/foundation-sprint-brief` |

### Design Sprint family - 5-day prototype-and-test (7 tool skills)

Canonical Knapp/Zeratsky/Kowitz workshop, sequenced from readiness through test-and-score. Run the whole arc with the `design-sprint` workflow.

| Skill | What it does | Command |
|---|---|---|
| **design-sprint-readiness** | Decision tree: is your team ready for a DS, or should you do something else first? | `/design-sprint-readiness` |
| **design-sprint-brief** | Pre-sprint brief: long-term goal, sprint questions, target | `/design-sprint-brief` |
| **design-sprint-map-and-target** | Map of the customer journey; choose the target | `/design-sprint-map-and-target` |
| **design-sprint-sketch** | Structured 4-step individual sketch session | `/design-sprint-sketch` |
| **design-sprint-decide-and-storyboard** | Heat map, straw poll, decider vote; storyboard the winner | `/design-sprint-decide-and-storyboard` |
| **design-sprint-prototype-plan** | Plan the realistic-enough Friday prototype | `/design-sprint-prototype-plan` |
| **design-sprint-test-and-score** | Run 5 customer interviews; score patterns and decide | `/design-sprint-test-and-score` |

### Standalone tool skill

| Skill | What it does | Command |
|---|---|---|
| **note-and-vote** | Group decision mechanic (silent note, vote, decider chooses) usable inside any workshop, not just FS or DS | `/note-and-vote` |

### Utility - meta-tooling (10 utility skills)

| Skill | What it does | Command |
|---|---|---|
| **pm-skill-builder** | Create new PM skills with gap analysis and guided drafting | `/pm-skill-builder` |
| **pm-skill-validate** | Audit a skill against structural conventions and quality criteria | `/pm-skill-validate` |
| **pm-skill-iterate** | Apply targeted improvements from feedback or validation reports | `/pm-skill-iterate` |
| **mermaid-diagrams** | Create syntactically valid mermaid diagrams for product documents | `/mermaid-diagrams` |
| **slideshow-creator** | Generate professional presentations from JSON deck specs | `/slideshow-creator` |
| **update-pm-skills** | Check for updates and update local pm-skills installation | `/update-pm-skills` |

Plus 4 utility skills covering AGENTS.md sync helpers and release tooling. Full list: [`skills/`](skills/) and [AGENTS.md](AGENTS.md).

### Skill lifecycle (Create > Validate > Iterate)

Three utility skills form a complete loop for managing the library itself:

```mermaid
flowchart LR
    Create["/pm-skill-builder<br/>Create"] --> Validate["/pm-skill-validate<br/>Validate"]
    Validate --> Decision{Findings?}
    Decision -- "PASS" --> Ship["Ship"]
    Decision -- "WARN / FAIL" --> Iterate["/pm-skill-iterate<br/>Iterate"]
    Iterate --> Validate
```

| Tool | Command | What it does |
|---|---|---|
| **Builder** | `/pm-skill-builder` | Creates a new skill from an idea: gap analysis, classification, draft files, promote on confirmation |
| **Validator** | `/pm-skill-validate` | Audits a skill against repo conventions; produces a severity-graded report |
| **Iterator** | `/pm-skill-iterate` | Applies fixes from feedback or validation report; previews changes; suggests version bump |

Full lifecycle pattern: [docs/guides/pm-skill-lifecycle.md](docs/guides/pm-skill-lifecycle.md).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Workflows

Multi-skill chains for common PM journeys. 12 workflows ship today.

| Workflow | Best for | Skills chained |
|---|---|---|
| **[Foundation to Design](_workflows/foundation-to-design.md)** | End-to-end FS-to-DS arc | foundation-sprint-* + design-sprint-* |
| **[Foundation Sprint](_workflows/foundation-sprint.md)** | 2-day strategic alignment | All 7 foundation-sprint skills |
| **[Design Sprint](_workflows/design-sprint.md)** | 5-day prototype-and-test | All 7 design-sprint skills |
| **[Feature Kickoff](_workflows/feature-kickoff.md)** | New features | problem-statement, hypothesis, prd, user-stories, launch-checklist |
| **[Lean Startup](_workflows/lean-startup.md)** | Rapid validation | hypothesis, experiment-design, experiment-results, pivot-decision |
| **[Triple Diamond](_workflows/triple-diamond.md)** | Major initiatives | Full 26 phase-skill flow across 6 phases |
| **[Customer Discovery](_workflows/customer-discovery.md)** | Research synthesis | Transform raw research into a validated problem |
| **[Sprint Planning](_workflows/sprint-planning.md)** | Sprint prep | Prepare sprint-ready stories from a backlog |
| **[Product Strategy](_workflows/product-strategy.md)** | Strategic initiatives | Frame a major strategic initiative |
| **[Post-Launch Learning](_workflows/post-launch-learning.md)** | Post-launch | Measure results and capture learnings |
| **[Stakeholder Alignment](_workflows/stakeholder-alignment.md)** | Leadership buy-in | Build a case for leadership buy-in |
| **[Technical Discovery](_workflows/technical-discovery.md)** | Tech feasibility | Evaluate technical feasibility and architecture |

Full reference: [docs/reference/workflows/](docs/reference/workflows/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## pm-skills vs pm-skills-mcp

PM-Skills ships in two complementary forms:

|  | **pm-skills** (this repo) | [**pm-skills-mcp**](https://github.com/product-on-purpose/pm-skills-mcp) |
|---|---|---|
| **Format** | Skill library as markdown files | MCP server wrapping the library |
| **Setup** | `npx skills add ...` or git clone | `npx pm-skills-mcp` |
| **Invocation** | Slash commands or AGENTS.md | MCP tool calls |
| **Status** | Active development | Maintenance mode (catalog frozen at v2.9.2 build) |
| **Recommended for** | New users, all platforms with AGENTS.md or skills-spec support | MCP-only clients that can't load the file-based library |

Most users want the file-based path. See [MCP Integration](docs/guides/mcp-integration.md) for when the MCP path is the right choice.

---

## Project status

| | |
|---|---|
| **Current version** | [v2.16.0](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.16.0) |
| **Skill count** | 59 (26 phase + 8 foundation + 10 utility + 15 tool) |
| **Spec** | [agentskills.io](https://agentskills.io/specification) |
| **License** | [Apache 2.0](LICENSE) |
| **Docs site** | [product-on-purpose.github.io/pm-skills](https://product-on-purpose.github.io/pm-skills/) |
| **MCP server** | [`pm-skills-mcp`](https://github.com/product-on-purpose/pm-skills-mcp) (maintenance mode) |
| **Changelog** | [CHANGELOG.md](CHANGELOG.md) |
| **FAQ** | [docs/reference/faq.md](docs/reference/faq.md) |

---

## FAQ

**Is this opinionated about my process?** No. Skills are canonical artifact formats. Mix and match. The Triple Diamond is one organizing lens; you don't have to adopt it to use the skills.

**Do I need Claude Code?** No. Any agent that supports the [Agent Skills Specification](https://agentskills.io/specification) (or that auto-discovers via `AGENTS.md`) works.

**Do I need the MCP server?** No. The file-based install is the recommended path. The MCP server is in maintenance mode and supports MCP-only clients.

**Can I use just a few skills, not all 59?** Yes. After install, invoke only the ones you need. There's no startup cost for the unused skills.

**Can I add my own skills?** Yes. Use `/pm-skill-builder` to scaffold, `/pm-skill-validate` to check, and `/pm-skill-iterate` to improve. See [CONTRIBUTING.md](CONTRIBUTING.md).

**How is this versioned?** The repo follows SemVer (currently v2.16.0). Individual skills version independently; see [docs/internal/skill-versioning.md](docs/internal/skill-versioning.md).

Full FAQ: [docs/reference/faq.md](docs/reference/faq.md).

---

## Contributing

- [CONTRIBUTING.md](CONTRIBUTING.md) covers the skill-shape contract, the validator suite, and the release workflow.
- Bugs: [issues](https://github.com/product-on-purpose/pm-skills/issues/new?labels=bug). Features: [issues](https://github.com/product-on-purpose/pm-skills/issues/new?labels=enhancement). Questions: [discussions](https://github.com/product-on-purpose/pm-skills/discussions).

---

## License

Apache 2.0. See [LICENSE](LICENSE). Built on the open [Agent Skills Specification](https://agentskills.io/specification). Triple Diamond framework extends the [Design Council's Double Diamond](https://medium.com/zendesk-creative-blog/the-zendesk-triple-diamond-process-fd857a11c179). Sprint methods adapted from Knapp/Zeratsky/Kowitz (Foundation Sprint, Design Sprint).

<p align="right">(<a href="#readme-top">back to top</a>)</p>
