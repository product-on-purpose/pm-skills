# F-26 Lean Canvas: Shipped-State Specification

This document reflects what F-26 shipped as of v2.11.0 release candidate. It is the retrospective specification; the effort stub at `../F-26-lean-canvas.md` is the higher-level summary.

## Modes

### `content` (default)

Produces a structured markdown document with nine blocks in canonical order plus an Evidence & Confidence section. No file is written; output is rendered inline in the model's response, suitable for pasting into Slack, email, PRDs, strategy docs, or the Workbench.

### `visual`

Produces the same markdown content AND writes a self-contained HTML file to disk. The HTML is rendered from `skills/foundation-lean-canvas/references/html-template.html` with placeholders filled in. The file is:

- Self-contained: no external font, CSS, or script dependencies; opens correctly in any modern browser offline
- Print-ready: `@page { size: A3 landscape; margin: 12mm; }` with explicit page-break-inside avoidance on the header and evidence strip
- Accessible: `role="img"` on the canvas wrapper with a descriptive `aria-label`
- Responsive: scales from ~1000px viewport down gracefully; the canonical 5-column grid collapses cleanly at narrower widths

Default output path: `./lean-canvas-{slug}.html` where `{slug}` is the product name lowercased with non-alphanumeric characters replaced by hyphens. User-specified path overrides.

## Block Order and Inter-block Constraints

The nine blocks are always filled in this specific order because each block's answer constrains the next:

| Order | Block | Constrains |
|---|---|---|
| 1 | Problem | What counts as a Customer Segment (who has these problems) |
| 2 | Customer Segments | What UVP language resonates; who Early Adopters are |
| 3 | Unique Value Proposition | What shape the Solution must take |
| 4 | Solution | What Channels can deliver |
| 5 | Channels | What Revenue model is viable |
| 6 | Revenue Streams | What Cost Structure is tolerable |
| 7 | Cost Structure | What Key Metrics track unit economics |
| 8 | Key Metrics | What counts as success; what Unfair Advantage needs to defend |
| 9 | Unfair Advantage | Closes the loop by naming what's defensible |

## Output Contract

### Required in every canvas (both modes)

- All nine blocks present in canonical order, each with:
  - Content body (format varies by block: bullets for Problem / Solution, paragraph for UVP, list for Channels, bullet-list for Revenue math, etc.)
  - A confidence tag: `High`, `Medium`, or `Low`
  - A one-line rationale explaining the confidence level
- Evidence & Confidence section with four required subsections:
  - **Validated**: assumptions backed by named sources (interviews, usage data, public reports)
  - **Assumed**: assumptions with no data yet
  - **Open Questions**: testable questions that would raise confidence
  - **Governance**: owner, review cadence, revision triggers

### Additional in visual mode

- An `.html` file written to disk, with every `{{PLACEHOLDER}}` token replaced
- The file path reported back to the user in the model's response

## HTML Placeholder Reference

The HTML template uses `{{UPPER_SNAKE_CASE}}` placeholders. All 22 unique placeholders must be replaced during visual-mode rendering:

| Category | Placeholders |
|---|---|
| Header | `PRODUCT_NAME`, `CREATED_DATE`, `PURPOSE`, `OVERALL_CONFIDENCE` |
| Block content | `PROBLEM_CONTENT`, `EXISTING_ALTERNATIVES`, `SOLUTION_CONTENT`, `UVP_CONTENT`, `HIGH_LEVEL_CONCEPT`, `ADVANTAGE_CONTENT`, `CUSTOMER_CONTENT`, `EARLY_ADOPTERS`, `METRICS_CONTENT`, `CHANNELS_CONTENT`, `COST_CONTENT`, `REVENUE_CONTENT` |
| Confidence badges | `CONF_PROBLEM`, `CONF_SOLUTION`, `CONF_UVP`, `CONF_ADVANTAGE`, `CONF_CUSTOMER`, `CONF_METRICS`, `CONF_CHANNELS`, `CONF_COST`, `CONF_REVENUE` (each takes a single letter `H`, `M`, or `L`; appears twice: once in the class attribute for styling, once as visible text) |
| Evidence strip (footer) | `VALIDATED_COUNT`, `ASSUMED_COUNT`, `OPEN_QUESTIONS_COUNT`, `OWNER`, `NEXT_REVIEW` |

## Design Decisions

1. **Standalone HTML vs inline SVG in markdown**: chose standalone file because PM consumers want a shareable, printable artifact and executives often need an image / PDF they can attach to decks. Inline SVG would have kept everything in one markdown block but sacrificed the shareable use case.
2. **Template scaffold vs runtime-generated HTML**: chose scaffold because asking the model to write attractive HTML from scratch every run risks visual drift (colors wander, layouts jitter, print styling gets dropped). Scaffold pins the visual identity; placeholder-fill keeps content dynamic. Same reason `foundation-persona` pins a canonical template contract.
3. **CSS Grid vs table layouts**: chose Grid with `grid-template-areas` for semantic accessibility (`<article>` per block) and flexibility (Problem / UVP / Customer Segments span two rows naturally). `@media print` handles reliability without compromising semantics.
4. **Per-block confidence badges vs single-header confidence**: chose per-block because a single "overall confidence" flattens per-block uncertainty, which is exactly what a lean canvas should surface. Per-block badges keep the honest signal visible.
5. **No CDN dependencies in the HTML**: enterprise environments, air-gapped networks, and print-to-PDF workflows all break silently if the file needs network access. Self-contained is a design constraint, not an optimization.
6. **Category `problem-framing` not `ideation`**: lean canvas is disciplined (structures and tests existing thinking about a business), not generative (does not help brainstorm new business ideas from scratch). Matches `define-jtbd-canvas` precedent in the library.

## Quality Checklist Mapping

The SKILL.md quality checklist has 14 items. They map to these enforcement mechanisms:

| Checklist item | Enforcement |
|---|---|
| All nine blocks present in canonical order | SKILL.md Step 3 prescribes order; TEMPLATE.md shape locks it in |
| Problem has Existing Alternatives subsection | TEMPLATE.md section shape |
| Customer Segments has Early Adopters subsection | TEMPLATE.md section shape |
| UVP is one sentence with High-Level Concept analogy | TEMPLATE.md instruction; enforced in quality checklist |
| Solution maps 1:1 to Problem | SKILL.md Step 6 finalize; unverifiable by CI |
| Channels distinguishes compounding vs traction | TEMPLATE.md section shape |
| Revenue shows the math | TEMPLATE.md format (model, price, volume, math line) |
| Cost names CAC and cost driver | TEMPLATE.md format |
| Key Metrics lists 3 to 5 leading indicators | TEMPLATE.md guidance |
| Unfair Advantage is specific OR open-question | SKILL.md wording prevents fabrication |
| Confidence tag and rationale per block | TEMPLATE.md section shape; SKILL.md Step 4 |
| Evidence & Confidence section populated | TEMPLATE.md section shape |
| Template guidance blockquotes removed | SKILL.md Step 6 finalize |
| Visual mode: self-contained HTML opens offline | HTML template has no external references; enforced by scaffold |

## Non-goals for v1.0.0

- Theme variants (dark mode, print-only, brand-applied). Follow F-20 slideshow-themer pattern if demand emerges.
- Automatic cross-skill chaining (e.g., pulling persona output directly into Customer Segments block). Handled by a future workflow effort.
- SVG export alternative to HTML. Not requested by any user signal; HTML covers the share-and-print use case.
- Multi-page canvas for very large business theses. Lean canvas is deliberately one-page; if a thesis does not fit, the thesis needs compression, not the artifact.

## Post-ship follow-up candidates

- **Codex cross-LLM review** of the skill: recommended if the slate stays at a single new skill, skipped if v2.11.0 carries multiple new skills.
- **Sample calibration**: after v2.11.0 ships, if any of the three thread samples feels weaker than peer foundation-persona samples, iterate via `/pm-skill-iterate`.
- **Workflow candidate**: `/workflow-lean-startup` chaining problem-statement, persona, lean-canvas, experiment-design. Track as a future workflow expansion effort.
