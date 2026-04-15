---
description: Generate a one-page lean canvas across nine interlocking blocks, optionally with inline HTML and SVG visual rendering
---

Use the `foundation-lean-canvas` skill to generate a complete lean canvas artifact.

Read the skill instructions from `skills/foundation-lean-canvas/SKILL.md` and follow them exactly.

Use `skills/foundation-lean-canvas/references/TEMPLATE.md` as the output format.

Mode behavior:
- Default mode is `content` (markdown only). If mode is omitted, produce content mode and state the fallback explicitly.
- `visual` mode ALSO writes a self-contained `.html` file to disk, using `skills/foundation-lean-canvas/references/html-template.html` as the layout scaffold. The HTML renders the canonical Maurya nine-block layout with per-column color accents, confidence badges, and print-ready A3 landscape styling. No external dependencies. Default output path is `./lean-canvas-{slug}.html` unless the user specifies otherwise. Report the file path after writing.

Quality requirements:
- All nine blocks present and ordered correctly (Problem, Customer Segments, UVP, Solution, Channels, Revenue Streams, Cost Structure, Key Metrics, Unfair Advantage).
- Each block tagged with `High | Medium | Low` confidence plus a one-line rationale.
- Evidence & Confidence section populated with `Validated`, `Assumed`, `Open Questions`, and `Governance` subsections.
- Cross-link to deeper PM skills (`/problem-statement`, `/persona`, `/jtbd-canvas`, `/solution-brief`, `/competitive-analysis`, `/experiment-design`) for single-block depth when gaps are found.
- Template guidance blockquotes removed from the final artifact.

Context from user: $ARGUMENTS
