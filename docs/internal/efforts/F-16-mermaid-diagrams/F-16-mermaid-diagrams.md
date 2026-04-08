# [F-16] Mermaid Diagrams Utility Skill
Status: Implementation Complete (pending release)
Milestone: TBD
Issue: TBD
Agent: Claude Opus 4.6

## Scope

Create a `utility-mermaid-diagrams` skill that teaches PMs how to create effective, syntactically valid mermaid diagrams. Covers all 15 mermaid diagram types with dual navigation: a type-based reference catalog and a PM use-case guide organized by task intent. Strong emphasis on syntax correctness and validation throughout.

## Problem

PMs increasingly work in mermaid-enabled environments (GitHub, MkDocs, Notion, HackMD) but lack structured guidance on:
1. Which diagram type fits a given communication need
2. How to write syntactically valid mermaid code that actually renders
3. When a diagram adds value vs. when a list or table is sufficient
4. Common syntax pitfalls that cause silent rendering failures (unquoted labels, special character escaping, node limit violations)

Existing mermaid documentation is engineering-centric and organized by diagram type alone, leaving PMs to guess which type fits their PM-specific tasks (stakeholder communication, prioritization, roadmap planning, feature specification).

## How It Would Work

### Input
PM describes what they need to communicate:
- "I need to show the approval workflow for our feature release"
- "I want a prioritization matrix for our backlog"
- "How do I diagram the API flow between our services for the PRD?"

### Process

1. **Assess the need** — Is a diagram the right medium? Apply the cardinal rule: diagrams earn their place when they reveal relationships, branching, or flow that prose flattens. If a list suffices, say so.

2. **Select diagram type** — Navigate via two lenses:
   - **PM use-case guide**: "I need to show decisions" → Flowchart, "I need to show timelines" → Gantt/Timeline
   - **Diagram catalog**: Browse all 16 types with syntax, limits, and PM-relevant examples

3. **Draft the diagram** — Use the planning worksheet (TEMPLATE.md) to inventory nodes, define relationships, and write the mermaid code block following syntax guide rules.

4. **Validate** — Run through the syntax validity checklist: renders without error, labels quoted correctly, special characters escaped, node count within limits, accessible colors.

### Output
A syntactically valid mermaid diagram embedded in the PM's document, with clear labels and accessible styling.

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Audience | PMs, not engineers or AI agents | Framing, examples, and use-cases all target PM workflows |
| Diagram scope | All 16 types | Comprehensive coverage; PM-relevant framing makes engineering types accessible |
| Organization | Dual-lens (catalog + use-case) | PMs navigate by "what type is this?" and by "what do I need to show?" |
| Syntax emphasis | First-class concern with dedicated reference | Biggest pain point for non-engineers writing mermaid |
| Classification | utility (no phase) | Cross-cutting skill usable at any point in product lifecycle |
| Reference structure | 5 reference files | TEMPLATE, EXAMPLE, diagram-catalog, pm-use-cases, syntax-guide |

## Quality Forecast

| Zone | Weight | Rationale |
|------|--------|-----------|
| Knowledge | 50 | 16 diagram types, syntax rules, PM use-case mappings |
| Constraint | 30 | Syntax validity rules, node limits, quoting/escaping, accessibility |
| Wisdom | 15 | When to diagram vs. not, which type fits, judgment calls |
| Process | 5 | Lightweight creation flow (assess → select → draft → validate) |

## Dependencies

- None — standalone utility skill

## Artifacts Produced

- `skills/utility-mermaid-diagrams/SKILL.md`
- `skills/utility-mermaid-diagrams/references/TEMPLATE.md`
- `skills/utility-mermaid-diagrams/references/EXAMPLE.md`
- `skills/utility-mermaid-diagrams/references/diagram-catalog.md`
- `skills/utility-mermaid-diagrams/references/pm-use-cases.md`
- `skills/utility-mermaid-diagrams/references/syntax-guide.md`
- `commands/mermaid-diagrams.md`
- Updated AGENTS.md, README, docs

## Estimated Complexity

Medium — significant reference content to write (16 diagram types × consistent structure), but straightforward skill architecture. No code, no automation, no cross-cutting dependencies.

## PRs

TBD
