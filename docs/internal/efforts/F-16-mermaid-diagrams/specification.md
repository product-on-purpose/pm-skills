# Specification: utility-mermaid-diagrams

## Overview

A utility skill that teaches PMs to create effective, syntactically valid mermaid diagrams. Provides comprehensive coverage of all 15 mermaid diagram types through two complementary navigation lenses: a type-based reference catalog and a PM use-case guide organized by task intent.

## Skill Identity

| Field | Value |
|-------|-------|
| Name | utility-mermaid-diagrams |
| Classification | utility |
| Version | 1.0.0 |
| License | Apache-2.0 |
| Audience | Product Managers |

## Design Principles

### 1. Syntax Validity First
The skill's primary value proposition is helping PMs write mermaid that **actually renders**. Every diagram type section, every example, and the dedicated syntax guide reinforce correct syntax. The validation checklist is the final gate before any diagram ships.

### 2. The Cardinal Rule
> Don't diagram what a list can say. Diagrams earn their place when they reveal relationships, branching, or flow that prose flattens.

This rule appears in SKILL.md and is referenced in pm-use-cases.md. It prevents PMs from reaching for a diagram when a numbered list or table communicates more clearly.

### 3. Dual-Lens Navigation
PMs approach diagrams from two directions:
- **"I know I need a flowchart"** → diagram-catalog.md (type-based)
- **"I need to show our release timeline"** → pm-use-cases.md (task-based)

Both lenses cross-reference each other. Neither is primary — they serve different moments.

### 4. PM-Relevant Framing
Every example, every "Use for / Don't use for" statement, and every worked scenario uses PM domain language: PRDs, roadmaps, stakeholder communication, feature prioritization, sprint planning, user journeys.

---

## File Architecture

```
skills/utility-mermaid-diagrams/
├── SKILL.md
└── references/
    ├── TEMPLATE.md
    ├── EXAMPLE.md
    ├── diagram-catalog.md
    ├── pm-use-cases.md
    └── syntax-guide.md

commands/
└── mermaid-diagrams.md
```

### SKILL.md (~150-200 lines)

**Frontmatter:**
```yaml
name: utility-mermaid-diagrams
description: >-
  Teaches PMs to create syntactically valid mermaid diagrams by selecting
  the right diagram type for their communication need, following syntax
  validity rules, and validating before shipping. Covers all 16 mermaid
  diagram types with PM-relevant examples and a dual-lens navigation
  system (type catalog + use-case guide).
version: 1.0.0
updated: YYYY-MM-DD
license: Apache-2.0
classification: utility
metadata:
  category: documentation
  frameworks:
    - mermaid
```

**Sections:**

1. **When to Use**
   - Creating mermaid diagrams for product documents (PRDs, specs, roadmaps)
   - Choosing which diagram type fits a communication need
   - Debugging mermaid syntax that won't render
   - Reviewing diagrams for clarity and accessibility

2. **When NOT to Use**
   - Generating image files (PNG/SVG export is outside scope)
   - Non-mermaid diagramming tools (Figma, Lucidchart, draw.io)
   - Purely decorative visuals with no informational purpose
   - Diagrams for engineering audiences (use engineering-specific tooling)

3. **The Cardinal Rule**
   - Statement of the rule with rationale
   - Quick test: "Does this diagram show branching, relationships, or flow that a list would flatten?"
   - If no → use a list or table instead

4. **Diagram Selection Guide**
   - Decision table: "I need to show..." → recommended type(s) → reference link
   - Covers ~12 common PM intents mapped to the 16 types
   - Points to pm-use-cases.md for worked examples, diagram-catalog.md for syntax

5. **Syntax Validity Principles**
   - The 6 universal rules (summarized; full detail in syntax-guide.md):
     1. Quote all labels containing spaces, special characters, or reserved words
     2. Escape markdown-conflicting characters (`>`, `<`, `-` at line start)
     3. Declare nodes before referencing them in edges
     4. Respect node/participant limits per diagram type
     5. Use `%%` comments to document diagram intent
     6. Test rendering before committing
   - Points to syntax-guide.md for complete rules

6. **Instructions** (numbered steps)
   1. Identify what you're communicating (relationship? sequence? hierarchy? proportion?)
   2. Apply the cardinal rule — confirm a diagram adds value
   3. Select diagram type via selection guide, pm-use-cases.md, or diagram-catalog.md
   4. Fill out the planning worksheet (TEMPLATE.md)
   5. Write the mermaid code block following syntax-guide.md rules
   6. Validate using the quality checklist below
   7. Embed in your document

7. **Output Contract**
   - References TEMPLATE.md as the planning artifact
   - Final output: a syntactically valid mermaid code block ready for embedding

8. **Quality Checklist**
   - [ ] Diagram renders without error in target environment
   - [ ] No linear sequences — every diagram has branching, relationships, or hierarchy
   - [ ] All labels with spaces or special characters are quoted
   - [ ] Node/participant count is within type-specific limits
   - [ ] Colors are accessible (WCAG AA 3:1 contrast minimum)
   - [ ] Diagram has a descriptive title or surrounding context
   - [ ] `%%` comments document non-obvious choices
   - [ ] Cardinal rule satisfied — a list or table wouldn't communicate this better

9. **Reference Index**
   - One-line description + link for each of the 5 reference files

---

### references/TEMPLATE.md (~40-60 lines)

A reusable diagram planning worksheet. Sections:

1. **Diagram Purpose** — What relationship, flow, or structure am I communicating? Who is the audience?
2. **Cardinal Rule Check** — Does this need a diagram, or would a list/table suffice?
3. **Diagram Type Selection** — Selected type + rationale (why this type over alternatives)
4. **Node Inventory** — List all entities/participants/states before writing code
5. **Draft Mermaid Code** — The code block (placeholder for PM to fill)
6. **Validation Checklist** — Abbreviated version of SKILL.md quality checklist

---

### references/EXAMPLE.md (~200-300 lines)

A worked example: **PM preparing diagrams for a product launch**.

Demonstrates 4 diagrams, each walking through the TEMPLATE worksheet:

1. **Flowchart** — Feature approval workflow in a PRD
   - Shows branching decision points (review → approved/rejected/needs revision)
   - Demonstrates node shapes, edge labels, subgraphs

2. **Gantt** — Launch timeline with dependencies
   - Shows development, QA, marketing, and release phases
   - Demonstrates milestones, critical path, and section grouping

3. **Sequence** — API integration flow for a technical spec
   - Shows message exchange between frontend, API gateway, and backend services
   - Demonstrates activation boxes, async messages, error paths

4. **Quadrant** — Backlog prioritization for a planning meeting
   - Shows 8-10 features plotted on effort/impact axes
   - Demonstrates axis labels, quadrant naming, point placement

Each example shows: the filled TEMPLATE worksheet → the resulting mermaid code → what it communicates that prose couldn't.

---

### references/diagram-catalog.md (~1,200-1,500 lines)

Comprehensive reference for all 15 diagram types. Opens with a TOC for jump navigation.

**Each type gets a consistent section (~75-100 lines):**

1. **One-line description** — What this diagram type shows
2. **Use for** — 3-4 PM-relevant scenarios
3. **Don't use for** — 2-3 anti-patterns with redirect to better type
4. **Syntax** — Minimal working example with PM-relevant content
5. **Key elements** — Node shapes, edge types, special constructs available
6. **Limits** — Maximum nodes/participants, nesting depth, rendering constraints
7. **PM Example** — A small but realistic PM scenario (5-15 lines of mermaid)
8. **Common Pitfalls** — 2-3 frequent mistakes with fixes
9. **See Also** — Cross-reference to related types (e.g., "See State for lifecycle transitions")

**Types covered (in this order):**

| Category | Types |
|----------|-------|
| Process & Flow | Flowchart, Sequence, State, Kanban |
| Planning & Time | Gantt, Timeline, Quadrant, Pie |
| Structure & Relationships | Mindmap, Class, ER, Architecture |
| Data & Proportions | Sankey, Treemap, XY-Chart |

Note: types within each category are presented together for contextual browsing, but every type is independently accessible via TOC.

**Experimental types** (Architecture, Sankey, Treemap, XY-Chart) are clearly marked with the mermaid version that introduced them and a stability note.

---

### references/pm-use-cases.md (~400-600 lines)

Organized by PM task intent, not by diagram type. Each use case includes:

1. **Task description** — What the PM is trying to communicate
2. **Recommended diagram type(s)** — Primary + alternatives with trade-off notes
3. **Mini worked example** — 10-20 lines of mermaid showing the use case
4. **Cross-reference** — Link to full type entry in diagram-catalog.md

**Use cases:**

| PM Task | Primary Type | Alternatives |
|---------|-------------|-------------|
| Showing a decision or approval process | Flowchart | State |
| Specifying multi-service interactions | Sequence | Flowchart |
| Mapping feature lifecycle or status transitions | State | Flowchart |
| Tracking work stages | Kanban | State |
| Planning a release or sprint timeline | Gantt | Timeline |
| Documenting version history or milestones | Timeline | Gantt |
| Prioritizing backlog items (2D) | Quadrant | — |
| Showing allocation or composition | Pie | Treemap |
| Decomposing a problem or brainstorming | Mindmap | — |
| Documenting domain models or data relationships | ER | Class |
| Mapping API or object contracts | Class | ER |
| Showing system topology or infrastructure | Architecture | Flowchart |
| Visualizing flow quantities or budget allocation | Sankey | Pie |
| Showing hierarchical proportional data | Treemap | Pie |
| Displaying trends or time-series metrics | XY-Chart | — |

---

### references/syntax-guide.md (~300-400 lines)

The dedicated syntax validity reference. Sections:

1. **Label Quoting Rules**
   - When to quote: spaces, special characters, reserved words
   - How to quote: double quotes for labels, backticks for code
   - Examples of failures and fixes

2. **Special Character Escaping**
   - Characters that conflict with mermaid syntax: `>`, `<`, `-`, `#`, `(`, `)`, `[`, `]`, `{`, `}`
   - Characters that conflict with markdown: `>`, `<`, `-` at line start, `1.` at line start
   - Escaping strategies per context

3. **Node Declaration Order**
   - Declare before reference rule
   - Common error: referencing a node in an edge before it's declared
   - Fix pattern

4. **Direction and Layout**
   - Direction options: TD, LR, BT, RL
   - When to use each (TD for hierarchies, LR for timelines/flows)
   - ELK layout engine for complex diagrams
   - Troubleshooting edge crossings

5. **Styling and Accessibility**
   - Semantic color palette (success/error/warning/info)
   - WCAG AA 3:1 contrast minimum
   - Black text on light backgrounds
   - Never rely on color alone — use labels and shapes
   - Class-based styling per diagram type (`:::` for flowchart, `class` for state)

6. **Comments**
   - `%%` comment syntax
   - Comment categories: MEANING (why this diagram exists), COLOR (why this color), GOTCHA (non-obvious syntax choices)
   - Comments are for maintainers, not rendered for readers

7. **Configuration Blocks**
   - Theme selection (base, default, dark, forest, neutral)
   - Per-diagram config options
   - When configuration is needed vs. when defaults suffice

8. **Node and Participant Limits**
   - Per-type limits table (flowchart: 12, sequence: 6 participants, class: 8, ER: 8-10, etc.)
   - What to do when you exceed limits: split into multiple diagrams, use subgraphs

9. **Pre-Commit Validation Checklist**
   - [ ] Paste into a mermaid live editor — does it render?
   - [ ] All labels with spaces are quoted
   - [ ] No unescaped special characters
   - [ ] Node count within type limit
   - [ ] Direction makes sense for content (LR for timelines, TD for hierarchies)
   - [ ] Colors tested in both light and dark mode
   - [ ] No linear sequences that should be lists

10. **Common Rendering Failures**
    - Table: symptom → cause → fix
    - Covers the 8-10 most frequent failures PMs encounter

---

### commands/mermaid-diagrams.md

Standard pm-skills command format:
```yaml
---
name: mermaid-diagrams
description: Create a syntactically valid mermaid diagram for your product document
skill: utility-mermaid-diagrams
---
```

Body: brief instruction to invoke the skill with context about what the PM needs to diagram.

---

## Differentiation from Prior Art

This skill is **original work** designed for the pm-skills library. While mermaid documentation exists broadly, this skill differentiates through:

1. **PM-first framing** — Every example, use case, and recommendation is grounded in PM workflows, not engineering tasks
2. **Dual-lens navigation** — Type catalog + use-case guide serve different moments of need
3. **Syntax validity as primary concern** — Dedicated syntax guide and validation checklist address the #1 pain point for non-engineers
4. **Cardinal rule** — Explicit gate preventing unnecessary diagrams
5. **Planning worksheet** — Structured approach to diagram creation (TEMPLATE.md) that prevents "jumping into code"
6. **Accessibility baked in** — WCAG AA contrast, color-independence, and semantic palettes are non-negotiable, not afterthoughts

## Open Questions

1. **Mermaid version targeting** — Should the skill target a specific mermaid version range, or document features with "available since vX.Y.Z" annotations? Recommendation: annotate experimental features with version, don't pin overall.
2. **Live editor recommendation** — Should syntax-guide.md recommend specific tools (mermaid.live, VS Code extensions)? Recommendation: yes, brief "tools for validation" section.
3. **Dark mode guidance** — How deep to go on theme configuration for different rendering environments? Recommendation: light touch — cover the accessibility principles, not environment-specific setup.
