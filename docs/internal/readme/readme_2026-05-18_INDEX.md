# README drafts 2026-05-18 - comparison index

Ten polished README drafts targeting the v2.16.0 / 59-skill state, refactoring the current 1,305-line README. Plus a hero-panels comparison artifact for voice picking. All drafts share the same content depth (full 59-skill catalog, full 12-workflow table, methodology, library samples coverage) and honor the same three constraints (MCP notice at top, quick install near top, recent releases in expand/collapse). They differ in body shape, voice, navigation metaphor, and (for v14) file-splitting strategy.

The drafts split into two rounds:

- **Round 1 (v5 through v11):** open exploration along voice and navigation axes
- **Round 2 (v12 through v14):** structured against [`structure.md`](structure.md) feedback — explicit IA, dedicated library-samples section, MCP comparison removed, per-folder repo structure walk

## At a glance

### Round 2 (structure.md-driven)

|  | Lines | What's distinctive |
|---|---:|---|
| **[v12 Structure spec](readme_2026-05-18_v12-structure-spec.md)** | 575 | Canonical single-file interpretation of the structure.md feedback. New: "How skills work" replaces "Usage", dedicated "Library samples" section, per-folder repo structure walk, MCP comparison removed |
| **[v13 Structure spec + visual](readme_2026-05-18_v13-structure-spec-visual.md)** | 630 | Same spine as v12 with 8 Mermaid diagrams layered in (hero library overview, prompt-to-artifact flow, anatomy, Triple Diamond, FS sequence, DS sequence, lifecycle, threads-to-skills matrix, repo structure map) |
| **[v14a + v14b Split README](readme_2026-05-18_v14a-split-README.md)** | 315 + 360 | Two-file split per the structure.md proposal. v14a is the short README (hero, quick start, what's new, big idea, getting started, library summary). v14b is the long reference (full catalog, methodology, repo walk, full FAQ). Each piece of content lives in one file |

### Round 1 (open exploration)

|  | Lines | Voice | Best fit |
|---|---:|---|---|
| **[v5 Operator](readme_2026-05-18_v5-operator.md)** | 455 | Operational, tool-README | Reader already decided to use it |
| **[v6 Curator](readme_2026-05-18_v6-curator.md)** | 459 | Curatorial, methodology-forward | Reader evaluating whether to adopt |
| **[v7 Two-track](readme_2026-05-18_v7-two-track.md)** | 458 | Hybrid, "pick a track" signpost | Two readers in roughly equal measure |
| **[v8 By-role](readme_2026-05-18_v8-by-role.md)** | 491 | Persona-routed, reader-aware | Four distinct audiences (op/eval/contrib/maintain) |
| **[v9 Cookbook](readme_2026-05-18_v9-cookbook.md)** | 396 | Editorial, "recipes not classifications" | Task-thinkers, skim-readers |
| **[v10 Minimal](readme_2026-05-18_v10-minimal.md)** | 234 | Confident-because-short, docs-site-first | Lean docs-site as source of truth |
| **[v11 Visual-first](readme_2026-05-18_v11-visual-first.md)** | 448 | Diagrammatic, Mermaid-led | Visual-first readers |

Plus the comparison reference:

- **[Hero-panels side-by-side](readme_2026-05-18_HERO-PANELS.md)** (330 lines) - first ~65 lines of every round-1 draft in one file, for picking voice before structure

## The decision tree

```
Has your structure.md feedback been incorporated?
├─ Yes (these are the round-2 drafts) → v12, v13, v14
└─ No (round-1 exploration) → v5 through v11

If round 2:
├─ Single file, clean and readable → v12 Structure spec
├─ Single file, heavier on diagrams → v13 Structure spec + visual
└─ Two-file split (short README + long README-detailed.md) → v14a + v14b

If round 1, what's your primary reader?
├─ Already decided to use this → v5 Operator or v10 Minimal
├─ Evaluating whether to adopt → v6 Curator
├─ Two readers in roughly equal measure → v7 Two-track or v8 By-role
└─ Four distinct readers → v8 By-role

If round 1, how do you want the library to feel?
├─ A catalog of artifacts → v5, v6, v7, v8, v10, v11
├─ A cookbook of tasks → v9 Cookbook
└─ Diagrams-first explanation → v11 Visual-first
```

## What the structure.md round changes (vs round-1)

| Change | Round 1 (v5-v11) | Round 2 (v12-v14) |
|---|---|---|
| Library samples section | Mentioned in passing | Dedicated section with 3-thread explanation, "why they matter", "what to expect" |
| "Usage" header | Kept as-is | Renamed to "How skills work" (purposive) |
| MCP comparison section | Present in some drafts | Removed from all round-2 drafts |
| Repo structure walk | Compact summary | Per-folder map with linked canonical reference doc |
| "Works for" / compatibility table | In Big Idea (v6) or scattered | Moved into Getting Started |
| What's new framing | Outcome-grouped (good) | Outcome-grouped + explicit "Get started" links per release |
| Number of releases highlighted | 3 outcome groups | 5 release expansions per the spec |
| Two-file split option | Not attempted | v14a + v14b proposes it with a single-source-of-truth rule |

## Shared properties (all ten drafts)

- **MCP-server maintenance notice** sits as a closed-by-default `<details>` near the top.
- **Quick install** is the first body section.
- **What's new** uses outcome-grouped framing (what changed + why it matters + how to get started with links).
- **Full 59-skill catalog** appears in every draft (compact in v10; behind a link in v14a; full in all others).
- **Full 12-workflow table** with `_workflows/*.md` links.
- **Methodology context** (canonical PM frameworks).
- **No em-dashes or en-dashes** anywhere (per CLAUDE.md style rule).

## A follow-on worth tracking

Your structure.md note about CHANGELOG.md being a "massive document" is correct, and an ideal future state would be:

- CHANGELOG.md per-release entries become collapsible `<details>` blocks with a one-line summary as the summary
- Then the README's "What's new" section is genuinely *just* the latest highlights, with a single "see [CHANGELOG.md](CHANGELOG.md) for full history" link
- The "Previous Release Details" duplicate section in the current README disappears entirely
- This eliminates the cross-file content-duplication concern

That's a CHANGELOG.md refactor task, not a README task. Open as a separate issue if you want to track it. Once done, the README's "What's new" section can shrink (just the most recent few, with a link to the changelog for the structured archive).

## The actual choice

The ten drafts are not graded "better vs worse". They're answers to three layered questions:

1. **Have you decided on the structure?** If yes (you wrote `structure.md`), pick from v12/v13/v14. If you're still exploring, the round-1 drafts cover different navigation metaphors.
2. **Single-file or two-file?** Single-file (v12/v13) is simpler to maintain. Two-file (v14) is shorter for first-time readers but requires the single-source-of-truth discipline.
3. **Prose-heavy or diagram-heavy?** v12 is text-and-tables. v13 layers Mermaid throughout. v14 is in between.

## Earlier drafts in this folder

Prior drafts (v3, v4) from 2026-05-06 are preserved for reference. They targeted v2.13.1 / 40 skills and predate v2.14.x doc migration, v2.15.0 sprint families, and v2.16.0 orchestration. They're useful as trajectory anchors, not as ship candidates.

## How to ship the chosen draft

Suggested workflow once a direction is picked:

1. Copy chosen draft to `README.md` at repo root. If v14 was picked, also copy `v14b` to `README-detailed.md`.
2. Sweep for stale figures (validator counts, sub-agent counts) against the post-v2.16.0 state.
3. Run `scripts/check-count-consistency.{sh,ps1}` to verify the 59-skill catalog math.
4. Run `scripts/check-internal-link-validity.{sh,ps1} --strict` to verify all internal links resolve.
5. If you picked v13, run `/mermaid-diagrams` validation on every fenced `mermaid` block before commit.
6. If you picked v14, add a maintenance note to CONTRIBUTING.md explaining the single-source-of-truth rule between README.md and README-detailed.md.
7. Spot-check the GitHub-rendered output for `<details>` expand/collapse and Mermaid rendering.
8. Open a PR with the diff for review.
