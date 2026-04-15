# [F-26] Lean Canvas Foundation Skill
Status: In Progress
Milestone: v2.11.0
Issue: TBD
Agent: Claude Opus 4.6

## Scope

Create `foundation-lean-canvas`, a new foundation skill that produces the canonical Ash Maurya 9-block lean canvas as a one-page integrated business thesis. Two modes: `content` (structured markdown) and `visual` (writes a self-contained attractive HTML file using a canonical layout scaffold). Ships with a complete TEMPLATE.md, a RestoreAI Customer Success Copilot EXAMPLE.md, an HTML template scaffold with CSS Grid Maurya layout, a `/lean-canvas` slash command, and 3 thread samples (Storevine Campaigns, Brainshelf Resurface, Workbench Blueprints).

## Problem

PM skills already exist for individual blocks of the lean canvas:

- `define-problem-statement` covers Problem and Existing Alternatives
- `foundation-persona` covers Customer Segments
- `define-jtbd-canvas` covers Customer Segments through a different lens
- `develop-solution-brief` covers Solution
- `discover-competitive-analysis` covers Unfair Advantage and Existing Alternatives
- `measure-instrumentation-spec` covers Key Metrics

But no existing skill produces the integrated one-page strategic artifact that ties Problem, Customer Segments, UVP, Solution, Channels, Revenue Streams, Cost Structure, Key Metrics, and Unfair Advantage into a single inspectable business thesis. PMs framing a new product, stress-testing an existing strategy, comparing strategic options, or aligning teams on business-model assumptions currently have to assemble that one-pager manually or run 4+ specialist skills and stitch the outputs together.

This skill closes that gap with a hub artifact. It references the specialist skills for deeper block-level work (cross-links in SKILL.md and in every sample's Open Questions block) rather than duplicating them. The pattern is composition over replication.

## How It Works

### Input

- Product or initiative name
- Market, target customer, any existing research
- Optional mode: `content` (default) or `visual`
- Optional output path for visual-mode HTML file (default `./lean-canvas-{slug}.html`)

### Process

1. **Resolve mode and intent**: content vs visual; purpose of canvas (new thesis / stress test / option comparison).
2. **Collect context and evidence**: existing research, current assumptions, known constraints. Mark gaps rather than fabricating.
3. **Fill the nine blocks in recommended order**: Problem, Customer Segments, UVP, Solution, Channels, Revenue Streams, Cost Structure, Key Metrics, Unfair Advantage. Each block's answer constrains the next, so order matters.
4. **Apply evidence and confidence policy**: per-block High / Medium / Low tag with rationale. Populate Evidence & Confidence section with Validated, Assumed, Open Questions, Governance subsections.
5. **Render the visual file (visual mode only)**: fill the `references/html-template.html` scaffold with block content plus confidence badges, write to disk via the Write tool, report the path.
6. **Finalize**: remove template guidance blockquotes, verify UVP is decision-changing and testable, confirm Early Adopters is distinct from Customer Segments, confirm Solution maps 1:1 to Problem.

### Output

- Structured markdown lean canvas with nine blocks plus Evidence & Confidence section
- Visual mode: a self-contained HTML file (no external fonts, scripts, or CDN) rendered in the canonical Maurya layout with per-column color accents, confidence badges per block, accessibility attributes, and A3 landscape print styling

## Classification

- Type: `foundation` (cross-phase; lean canvas is revisited across Discover, Define, Develop, Measure, Iterate)
- Category: `problem-framing` (matches `define-jtbd-canvas` precedent for canvas artifacts)
- Directory: `skills/foundation-lean-canvas/`
- Command: `/lean-canvas`

## Exemplars

- `foundation-persona`: foundation-classification pattern, Supported Modes section, Evidence & Confidence discipline, canonical template contract
- `define-jtbd-canvas`: named-canvas block-by-block instruction style, per-block generation heuristics

## Deliverables

- `skills/foundation-lean-canvas/SKILL.md`
- `skills/foundation-lean-canvas/references/TEMPLATE.md`
- `skills/foundation-lean-canvas/references/EXAMPLE.md` (RestoreAI scenario, 164 lines)
- `skills/foundation-lean-canvas/references/html-template.html` (324 lines, self-contained)
- `commands/lean-canvas.md`
- `library/skill-output-samples/foundation-lean-canvas/sample_foundation-lean-canvas_storevine_campaigns.md`
- `library/skill-output-samples/foundation-lean-canvas/sample_foundation-lean-canvas_brainshelf_resurface.md`
- `library/skill-output-samples/foundation-lean-canvas/sample_foundation-lean-canvas_workbench_blueprints.md`
- `docs/skills/foundation/foundation-lean-canvas.md` (auto-generated via `scripts/generate-skill-pages.py`)
- AGENTS.md entry and commands-table row
- README_SAMPLES.md count updates and browse-table entries (4 rows)
- mkdocs.yml Foundation nav entry

## Validation

- `lint-skills-frontmatter.sh`: PASS
- `validate-agents-md.sh`: PASS (AGENTS.md matches 33 skill paths)
- `validate-commands.sh`: PASS (`lean-canvas.md` references `skills/foundation-lean-canvas/SKILL.md`)
- `check-count-consistency.sh`: advisory drift surfaced as expected during v2.11.0 accumulation phase; will be swept at release commit

## Open Questions

- Should the `/lean-canvas` skill eventually compose into a workflow (e.g., `/workflow-lean-startup` that chains problem-statement, persona, lean-canvas, experiment-design)? Not in F-26 scope; candidate for a later workflow-expansion effort.
- Should the HTML template support theme variants (light / dark / print-only)? Not in v1.0.0; single canonical style for now. If demand emerges, follow the slideshow-themer pattern (F-20).

## Status Transitions

- **Backlog** (never applied; jumped to In Progress via `/pm-skill-builder` this session)
- **In Progress** (current): files promoted to main, uncommitted at time of stub creation. Will flip to **Shipped** on v2.11.0 tag + push.

## Detailed specification

See [`F-26-lean-canvas/specification.md`](F-26-lean-canvas/specification.md) for the shipped-state specification (modes, output contract, HTML placeholder reference, quality checklist mapping).
