---
name: utility-mermaid-diagrams
description: >-
  Teaches PMs to create syntactically valid mermaid diagrams by selecting
  the right diagram type for their communication need, following syntax
  validity rules, and validating before shipping. Covers all 16 mermaid
  diagram types with PM-relevant examples and a dual-lens navigation
  system (type catalog and use-case guide).
version: 1.0.0
updated: 2026-04-07
license: Apache-2.0
classification: utility
metadata:
  category: documentation
  frameworks:
    - mermaid
---

# Mermaid Diagrams

Create effective, syntactically valid mermaid diagrams for product documents.

## When to Use

- Creating mermaid diagrams for PRDs, specs, roadmaps, or stakeholder presentations
- Choosing which of 16 diagram types fits a specific communication need
- Debugging mermaid code that won't render or renders incorrectly
- Reviewing diagrams for clarity, accuracy, and accessibility

## When NOT to Use

- Exporting diagrams to image files (PNG/SVG) — that's a rendering tool concern
- Using non-mermaid diagramming tools (Figma, Lucidchart, draw.io)
- Creating purely decorative visuals with no informational purpose

## The Cardinal Rule

> Don't diagram what a list can say.

Diagrams earn their place when they reveal **relationships**, **branching**, or **flow** that prose flattens. Before creating any diagram, ask:

*Does this show branching, relationships, or flow that a list or table would flatten?*

- **Yes** → proceed with a diagram
- **No** → use a numbered list, bullet list, or table instead

A 5-step linear process is a list. A 5-step process with two decision points and a retry loop is a diagram.

## Diagram Selection Guide

| I need to show... | Use | Also consider | Reference |
|-------------------|-----|---------------|-----------|
| A decision or approval process | Flowchart | State | diagram-catalog.md |
| Multi-service or multi-party interactions | Sequence | Flowchart | diagram-catalog.md |
| Feature lifecycle or status transitions | State | Flowchart | diagram-catalog.md |
| Work stages or pipeline status | Kanban | State | diagram-catalog.md |
| Release or sprint timeline with dependencies | Gantt | Timeline | diagram-catalog.md |
| Version history or chronological milestones | Timeline | Gantt | diagram-catalog.md |
| 2D prioritization (effort/impact, risk/value) | Quadrant | — | diagram-catalog.md |
| Allocation breakdown or composition | Pie | Treemap | diagram-catalog.md |
| Problem decomposition or brainstorming | Mindmap | — | diagram-catalog.md |
| Domain models or data relationships | ER | Class | diagram-catalog.md |
| API or object contracts | Class | ER | diagram-catalog.md |
| System topology or infrastructure | Architecture | Flowchart | diagram-catalog.md |
| Flow quantities or budget allocation | Sankey | Pie | diagram-catalog.md |
| Hierarchical proportional data | Treemap | Pie | diagram-catalog.md |
| Trends or time-series metrics | XY-Chart | — | diagram-catalog.md |

For worked examples organized by PM task, see **pm-use-cases.md**.
For full syntax and options per type, see **diagram-catalog.md**.

## Syntax Validity Principles

Six rules that prevent most rendering failures:

1. **Quote labels** — Any label containing spaces, parentheses, brackets, colons, commas, or reserved words must be quoted with double quotes
2. **Escape special characters** — Characters with mermaid or markdown meaning (`>`, `<`, `-` at line start, `#`) need escaping or quoting
3. **Declare before referencing** — Define a node before using it in an edge; referencing an undeclared node causes silent failures in some types
4. **Respect limits** — Each diagram type has a maximum node/participant count beyond which readability collapses (see diagram-catalog.md for per-type limits)
5. **Comment your intent** — Use `%%` comments to document non-obvious choices (why this layout direction, why this grouping)
6. **Test before shipping** — Paste into a mermaid renderer (mermaid.live, VS Code preview, or your target environment) and verify it renders correctly

For the complete syntax reference, see **syntax-guide.md**.

## Instructions

1. **Identify what you're communicating** — What relationship, flow, hierarchy, or proportion needs to be visible? Who is the audience?
2. **Apply the cardinal rule** — Confirm a diagram adds value over a list or table
3. **Select a diagram type** — Use the selection guide above, browse pm-use-cases.md by task, or browse diagram-catalog.md by type
4. **Plan the diagram** — Fill out the planning worksheet in TEMPLATE.md: purpose, audience, node inventory, type rationale
5. **Write the mermaid code** — Follow syntax-guide.md rules; start with the minimal syntax example from diagram-catalog.md and expand
6. **Validate** — Run through the quality checklist below
7. **Embed** — Place the validated mermaid code block in your document

## Output Contract

- **Planning artifact**: A completed diagram planning worksheet (TEMPLATE.md)
- **Final output**: A syntactically valid mermaid code block embedded in the target document
- **Quality gate**: All items in the quality checklist pass

## Quality Checklist

- [ ] Diagram renders without error in target environment
- [ ] Cardinal rule satisfied — a list or table would not communicate this more clearly
- [ ] No linear sequences without branching, relationships, or hierarchy
- [ ] All labels with spaces or special characters are properly quoted
- [ ] Special characters escaped where needed
- [ ] Node/participant count within type-specific limits
- [ ] Colors are accessible (WCAG AA 3:1 contrast minimum, black text on light backgrounds)
- [ ] Color is never the sole differentiator — shapes and labels also distinguish elements
- [ ] Diagram has a descriptive title or surrounding prose context
- [ ] `%%` comments document any non-obvious layout or grouping choices

## References

| File | Purpose |
|------|---------|
| `references/TEMPLATE.md` | Diagram planning worksheet — fill out before writing mermaid code |
| `references/EXAMPLE.md` | Worked example: PM creating 4 diagrams for a product launch |
| `references/diagram-catalog.md` | All 16 diagram types: syntax, PM examples, limits, pitfalls |
| `references/pm-use-cases.md` | PM task → diagram type mapping with mini worked examples |
| `references/syntax-guide.md` | Complete syntax validity rules, escaping, styling, and validation checklist |
