# README drafts 2026-05-18 - comparison index

Seven polished README drafts targeting the v2.16.0 / 59-skill state, refactoring the current 1,305-line README. All seven share identical "above the fold" treatment (badges, MCP-mode notice, quick install, recent releases), identical content depth (full 59-skill catalog, full 12-workflow table, methodology section), and identical "What's new" framing (outcome-grouped: what changed + why it matters + how to get started). They differ in body shape, voice, and how content is organized for the reader.

Plus a hero-panels side-by-side comparison artifact for picking voice before structure.

## At a glance

|  | Lines | Voice | First body section | Catalog visibility | Best fit |
|---|---:|---|---|---|---|
| **[v5 Operator](readme_2026-05-18_v5-operator.md)** | 455 | Operational, confident, tool-README | What's new | Always visible | Someone who came from a link, wants to use it now |
| **[v6 Curator](readme_2026-05-18_v6-curator.md)** | 459 | Curatorial, methodology-forward | What this is + canonical frameworks | After methodology | A PM evaluating whether to adopt or recommend the library |
| **[v7 Two-track](readme_2026-05-18_v7-two-track.md)** | 458 | Hybrid, explicit "pick a track" signpost | What's new, then "pick a track" | Inside `<details>` in operator track | A README serving two distinct readers (operator vs evaluator) |
| **[v8 By-role](readme_2026-05-18_v8-by-role.md)** | 491 | Persona-routed, reader-aware | "Where to start" router | Inside "For PMs running skills" track | Multi-audience repo (operator / evaluator / contributor / maintainer) |
| **[v9 Cookbook](readme_2026-05-18_v9-cookbook.md)** | 396 | Editorial, task-shaped, "recipes not classifications" | Quick recipes (top-12 curated) | "Quick recipes" then full chapters | Skim-readers who think in tasks, not taxonomies |
| **[v10 Minimal](readme_2026-05-18_v10-minimal.md)** | 234 | Confident-because-short, docs-site-first | Install (compact) | Skills as dot-separated chains, no descriptions | Repos with a great docs site that should be the source of truth |
| **[v11 Visual-first](readme_2026-05-18_v11-visual-first.md)** | 448 | Diagrammatic, Mermaid-led | Library Mermaid hero | After hero diagram, in tables | Readers who absorb structure visually faster than verbally |

Plus the comparison reference:

- **[Hero-panels side-by-side](readme_2026-05-18_HERO-PANELS.md)** (330 lines) - first ~65 lines of every draft in one file, for picking *voice* before *structure*.

## The decision tree

```
What's your primary reader?
├─ Someone who already decided to use this → v5 Operator or v10 Minimal
├─ Someone evaluating whether to adopt this → v6 Curator
├─ Both, in roughly equal measure → v7 Two-track or v8 By-role
└─ Four distinct readers (op/eval/contrib/maintain) → v8 By-role

How do you want the reader to think about the library?
├─ As a catalog of artifacts (PRDs, OKRs, retros) → v5, v6, v7, v8, v10, v11
└─ As a cookbook of tasks ("write a PRD", "run a sprint") → v9 Cookbook

What's the docs site's job?
├─ Reference destination; README is the funnel → v10 Minimal
├─ Co-equal surface; README has the catalog inline → v5, v6, v7, v8, v9, v11

How should the library's structure be taught?
├─ Through prose + tables → v5, v6, v7, v8, v9, v10
└─ Through diagrams; prose as caption → v11 Visual-first
```

## Shared properties (all seven)

These are constant across the seven drafts:

- **MCP-server maintenance notice** sits as a closed-by-default `<details>` immediately below the hero badges. Stays prominent without dominating.
- **Quick install** is the first body section. Two recommended paths inline (Claude Code plugin marketplace + open `skills` CLI) in five of seven; v10 has one inline + link out; v11 has the diagram before install but install follows immediately after.
- **What's new** uses a human-centered framing:
  - 3 outcome-grouped highlights (sprint methodologies, faster docs, active orchestration)
  - Each one has "What changed" + "Why it matters" + "Get started" (with docs link)
  - Release-by-release detail preserved in a collapsed `<details>` stack below
- **Full 59-skill catalog** appears in every draft. v5/v6/v7/v8/v9/v11 present it as 8+ grouped tables with name + description + slash command; v10 presents it as compact dot-separated lists with descriptions on the docs site.
- **Full 12-workflow table** with `_workflows/*.md` links in every draft.
- **Methodology context**: "Built on canonical PM frameworks" table (Agent Skills Spec, Triple Diamond, FS, DS, OST, JTBD, ADR, Keep a Changelog) in all seven; depth varies by draft.
- **The pm-skills vs pm-skills-mcp comparison** appears in all seven (v11 also shows it as a Mermaid diagram).
- **FAQ section** with common questions and link out to the full FAQ.
- **No em-dashes or en-dashes** anywhere (per CLAUDE.md style rule).

## The actual choice

The seven drafts are not graded "better vs worse". They're seven answers to a real question: **what kind of first impression do you want this README to make, and how do you want the reader to navigate?**

The decision tree above gives one path through the choices. The hero-panels comparison artifact gives another (pick voice first, then commit to structure). Either route lands you on a draft you can ship.

You can also remix: pull v11's Mermaid hero into v8's persona body, or pull v9's recipe framing into v7's two-track structure. The bodies are modular; the voice is mostly set by the hero plus the first body section.

## Earlier drafts in this folder

Prior drafts (v3, v4) from 2026-05-06 are preserved for reference. They targeted v2.13.1 / 40 skills and predate the v2.14.x doc migration, the v2.15.0 sprint families, and the v2.16.0 orchestration work. They're useful as anchor points for the trajectory, not as candidates for the current refresh.

## How to ship the chosen draft

Suggested workflow once a direction is picked:

1. Copy chosen draft to `README.md` at repo root (overwrites current).
2. Sweep for any remaining stale figures (validator counts, sub-agent counts) against the post-v2.16.0 state.
3. Run `scripts/check-count-consistency.{sh,ps1}` to verify the 59-skill catalog math.
4. Run `scripts/check-internal-link-validity.{sh,ps1} --strict` to verify all internal links resolve.
5. If you picked v11, also run `/mermaid-diagrams` validation on every fenced `mermaid` block before commit.
6. Spot-check the GitHub-rendered output for `<details>` expand/collapse behavior and Mermaid rendering.
7. Open a PR with the diff for review.
