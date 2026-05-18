<!--
Hero-panel comparison: not a full draft, a side-by-side reference for picking
the README's *voice* (first impression) before committing to its structure.
For each of v5 through v11, this file reproduces the first ~70 lines of the
draft (hero, badges, nav, MCP notice, top of install) so a maintainer can scan
five voices in five minutes without opening five files.
Length budget: ~480 lines (7 drafts x ~65 lines + scaffolding).
-->

# README hero-panel comparison (2026-05-18)

Side-by-side first impressions for the seven drafts in this folder. Each panel below shows the first ~65 lines of one draft (hero, badges, navigation, MCP notice, top of install). Use this file to pick a voice before committing to a body structure.

The seven drafts:

- **[v5 - Operator](readme_2026-05-18_v5-operator.md)** - operational, tool-README voice
- **[v6 - Curator](readme_2026-05-18_v6-curator.md)** - methodology-forward, library voice
- **[v7 - Two-track](readme_2026-05-18_v7-two-track.md)** - explicit operator-vs-evaluator split
- **[v8 - By-role](readme_2026-05-18_v8-by-role.md)** - persona-routed (4 reader tracks)
- **[v9 - Cookbook](readme_2026-05-18_v9-cookbook.md)** - recipes-not-classifications reframe
- **[v10 - Minimal](readme_2026-05-18_v10-minimal.md)** - bets on the docs site as primary surface
- **[v11 - Visual-first](readme_2026-05-18_v11-visual-first.md)** - Mermaid hero, diagrams as primary explanation

---

## v5 - Operator

> `<h1 align="center">PM-Skills</h1>`
>
> `<p align="center">`
>   `<strong>59 production-ready product management skills your AI agent can run today.</strong><br>`
>   PRDs, OKRs, hypotheses, opportunity trees, retros, Foundation Sprint, Design Sprint, and 50 more,
>   each shipping with a template, a worked example, and a slash command.
> `</p>`
>
> `[badges: v2.16.0 . 59 skills . Agent Skills Spec . Apache 2.0 . MCP maintenance . PRs welcome]`
>
> `[nav: Install . What's new . The big idea . The library . Workflows . FAQ . Docs site]`
>
> `---`
>
> `<details>`
> `<summary><strong>MCP server: maintenance mode (effective 2026-05-04)</strong></summary>`
>
> The companion pm-skills-mcp server is in the v2.9.x maintenance line (latest v2.9.3). The MCP catalog is frozen at the v2.9.2 build... For new users, the file-based install paths below are the recommended path.
>
> `</details>`
>
> `---`
>
> `## Install`
>
> Pick the path that matches your tool. Each one is one command.
>
> `### Claude Code (recommended)`
>
> `/plugin marketplace add product-on-purpose/pm-skills`
> `/plugin install pm-skills@pm-skills-marketplace`

**Voice:** Confident, tool-README, action-first. "Pick the path that matches your tool" tells the reader they're in charge.

---

## v6 - Curator

> `<h1 align="center">PM-Skills</h1>`
>
> `<h4 align="center">`A curated library of 59 plug-and-play product management skills for AI agents. Production-ready PRDs, hypotheses, OKRs, opportunity trees, retros, Foundation Sprints, Design Sprints, and 50 more, each shipping with templates, worked examples, and slash commands.`</h4>`
>
> `<p align="center">Report a Bug . Request a Feature . Ask a Question</p>`
>
> `[badges: v2.16.0 . 59 skills . Agent Skills Spec . Apache 2.0 . PRs welcome . MCP maintenance]`
>
> `[nav: What this is . Install . What's new . The library . How a skill works . Workflows . FAQ]`
>
> `---`
>
> `<details>`
> `<summary><strong>MCP server: maintenance mode (effective 2026-05-04)</strong></summary>`
>
> ...For new users, the file-based install paths below are the recommended path.
>
> `</details>`
>
> `---`
>
> `## What this is`
>
> `**Stop prompt-fumbling. Start shipping.**` Every time you ask an AI to help with product management, you start from zero. Generic responses. Inconsistent formats...
>
> PM-Skills changes that. It is a curated library of 59 best-practice skills, each one a specialized capability your agent can invoke on demand...

**Voice:** Curatorial, library-of-knowledge, calls itself "curated". "Stop prompt-fumbling. Start shipping." opens with a punchy thesis. Hero is longer than v5; methodology context arrives before install.

---

## v7 - Two-track

> `<h1 align="center">PM-Skills</h1>`
>
> `<p align="center">`
>   `<strong>59 production-ready product management skills your AI agent can run today.</strong><br>`
>   PRDs, OKRs, hypotheses, opportunity trees, retros, Foundation Sprint, Design Sprint, and 50 more.
> `</p>`
>
> `[badges: v2.16.0 . 59 skills . Agent Skills Spec . Apache 2.0 . MCP maintenance . PRs welcome]`
>
> `[nav: Install . What's new . Run the skills . Understand the library . Docs site]`
>
> `---`
>
> `<details>`
> `<summary><strong>MCP server: maintenance mode (effective 2026-05-04)</strong></summary>`
>
> ...For new users, the file-based install paths below are the recommended path.
>
> `</details>`
>
> `---`
>
> `## Install`
>
> `### Claude Code (recommended)`
>
> `/plugin marketplace add product-on-purpose/pm-skills`
> `/plugin install pm-skills@pm-skills-marketplace`
>
> All 59 skills and 66 commands resolve from any directory. Verify with `/plugin list`.

**Voice:** Operational at the top, structurally bifurcated lower down. The nav signals the split ("Run the skills" vs "Understand the library"). Hero is identical-feel to v5 because the differentiation lives in the body, not the masthead.

---

## v8 - By-role

> `<h1 align="center">PM-Skills</h1>`
>
> `<p align="center">`
>   `<strong>59 production-ready product management skills your AI agent can run today.</strong><br>`
>   PRDs, OKRs, hypotheses, opportunity trees, retros, Foundation Sprint, Design Sprint, and 50 more.
> `</p>`
>
> `[badges: v2.16.0 . 59 skills . Agent Skills Spec . Apache 2.0 . MCP maintenance]`
>
> `[nav: Install . What's new . Where to start . Run skills . Evaluate . Contribute . Maintain]`
>
> `---`
>
> `<details>`
> `<summary><strong>MCP server: maintenance mode (effective 2026-05-04)</strong></summary>`
>
> ...For new users, the file-based install paths below are the recommended path.
>
> `</details>`
>
> `---`
>
> `## Install`
>
> [install block]
>
> `---`
>
> `## What's new`
>
> [3 outcome highlights]
>
> `---`
>
> `## Where to start`
>
> PM-Skills serves four readers. Find yourself, then jump to the section that matches.
>
> | If you are... | Start here |
> |---|---|
> | A PM who wants to use these skills now | Run skills |
> | A PM lead evaluating this library | Evaluate |
> | A PM proposing or contributing a skill | Contribute |
> | A maintainer or fork owner | Maintain |

**Voice:** Hero is operational. Then the "Where to start" router signals "we know you're one of four readers; we'll let you self-route". This is the most reader-aware of the seven; the nav itself is a job-to-be-done routing.

---

## v9 - Cookbook

> `<h1 align="center">PM-Skills</h1>`
>
> `<p align="center">`
>   `<strong>59 recipes for product management work, ready for your AI agent to run.</strong><br>`
>   PRDs, OKRs, hypotheses, opportunity trees, retros, Foundation Sprint, Design Sprint, and 50 more,
>   each with a method, a worked example, and a slash command.
> `</p>`
>
> `[badges: v2.16.0 . 59 recipes . Agent Skills Spec . Apache 2.0 . MCP maintenance]`
>
> `[nav: Install . What's new . Quick recipes . Full recipe book . Workflows . How recipes work]`
>
> `---`
>
> `<details>`
> `<summary><strong>MCP server: maintenance mode (effective 2026-05-04)</strong></summary>`
>
> ...For new users, the file-based install paths below are the recommended path. Recipe parity is paused.
>
> `</details>`
>
> `---`
>
> `## Install`
>
> [install block]
>
> `---`
>
> `## What's new`
>
> [3 outcome highlights, reframed as "recipes"]
>
> `---`
>
> `## Quick recipes`
>
> The 12 you'll use most often. Try one:
>
> | Recipe | Command | Get |
> |---|---|---|
> | **Write a PRD** | `/prd "Topic"` | Comprehensive product requirements... |
> | **State a testable hypothesis** | `/hypothesis "Belief"` | Falsifiable claim with success metric... |
> | **Synthesize user interviews** | `/interview-synthesis "5 interviews"` | Themes, quotes, opportunity areas... |

**Voice:** Reframed throughout: "skills" become "recipes", catalog becomes "recipe book", chapters not classifications. Badge counter says "59 recipes" instead of "59 skills". Hero says "recipes for product management work, ready for your AI agent to run". This is the most editorial of the seven; it makes a real claim about how to think about the library.

---

## v10 - Minimal

> `<h1 align="center">PM-Skills</h1>`
>
> `<p align="center">`
>   `<strong>59 production-ready product management skills your AI agent can run today.</strong>`
> `</p>`
>
> `[badges: v2.16.0 . 59 skills . Agent Skills Spec . Apache 2.0 . MCP maintenance]`
>
> `[nav: Full docs site . Install . What's new . Skills . Workflows]`
>
> `<p align="center">`
>   `<em>This README is intentionally short. The`[docs site](https://product-on-purpose.github.io/pm-skills/)`is the source of truth for the catalog, methodology, and how-to guides.</em>`
> `</p>`
>
> `---`
>
> `<details>`
> `<summary><strong>MCP server: maintenance mode (effective 2026-05-04)</strong></summary>`
>
> ...For new users, the file-based install paths below are the recommended path.
>
> `</details>`
>
> `---`
>
> `## Install`
>
> `/plugin marketplace add product-on-purpose/pm-skills`
> `/plugin install pm-skills@pm-skills-marketplace`
>
> In Claude Code. All 59 skills and 66 commands resolve from any directory.
>
> For other agents (Cursor, Copilot, Cline) or platforms (Claude.ai, MCP clients, ChatGPT), see docs/getting-started/...

**Voice:** Confident-because-short. The italicized line *"This README is intentionally short. The docs site is the source of truth..."* announces the strategy explicitly. No tagline below the strong line; no "PRDs, OKRs, hypotheses..." enumeration. Install block has one path inline (Claude Code) and one link out for everything else.

---

## v11 - Visual-first

> `<h1 align="center">PM-Skills</h1>`
>
> `<p align="center">`
>   `<strong>59 production-ready product management skills your AI agent can run today.</strong>`
> `</p>`
>
> `[badges: v2.16.0 . 59 skills . Agent Skills Spec . Apache 2.0 . MCP maintenance]`
>
> `[nav: Install . What's new . Library at a glance . Full catalog . Workflows . How a skill works]`
>
> `---`
>
> `## The library at a glance`
>
> ```mermaid
> flowchart TB
>     subgraph TD["Triple Diamond Phase Skills (26)"]
>         Discover["Discover (3)"] --> Define["Define (4)"]
>         Define --> Develop["Develop (4)"]
>         Develop --> Deliver["Deliver (6)"]
>         Deliver --> Measure["Measure (5)"]
>         Measure --> Iterate["Iterate (4)"]
>         Iterate -.feedback.-> Discover
>     end
>     subgraph SPRINT["Sprint Methodologies (15 tool skills)"]
>         FS["Foundation Sprint (7)"] --> DS["Design Sprint (7)"]
>         NV["note-and-vote (1)"]
>     end
>     subgraph SUPPORT["Cross-Cutting (18 skills)"]
>         FOUNDATION["Foundation (8)"]
>         UTILITY["Utility (10)"]
>     end
>     TD -.uses.-> SUPPORT
>     SPRINT -.uses.-> SUPPORT
> ```
>
> **26 phase skills** run the canonical Triple Diamond product cycle. **15 tool skills** run two sprint methodologies plus a standalone group-decision mechanic. **8 foundation skills** support all of it. **10 utility skills** maintain the library itself. 59 total.

**Voice:** The hero is a diagram, not a tagline. The prose below the diagram is a caption (4 short sentences, one per layer). Reader's first encounter with the library shape is visual. MCP notice and install come after the diagram, not before. The bet: a reader can absorb a diagram faster than a paragraph.

---

## How to use this file

This comparison is voice-first, not structure-first. The right question to ask while scanning:

- **Does this hero make me want to read the body?** (If the hero is dull, the body has more work to do.)
- **Does the badge row, nav row, and MCP block feel like a top-of-funnel or a wall?**
- **Does the first body section after install belong to *me* (operator) or to the library?**

If none of the seven hero treatments feels right, you can also remix: pull v11's Mermaid hero into v8's persona body, or pull v9's recipe framing into v7's two-track structure. The bodies are modular; the voice is mostly set by the hero plus the first body section.

When you've picked a voice, return to the [INDEX](readme_2026-05-18_INDEX.md) for the structural comparison and ship workflow.
