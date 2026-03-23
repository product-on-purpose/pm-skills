<!-- GitHub Issue: F-12 Mermaid Diagram Builder -->
<!-- Title: F-12: Mermaid Diagram Builder utility skill -->
<!-- Labels: enhancement, agent:claude -->
<!-- Copy the body below into the GitHub issue -->

## Summary

Add a **superpowered Mermaid diagram builder** as a utility skill (`utility-mermaid-diagram-builder`) that generates publication-quality Mermaid diagrams from natural-language descriptions or structured data. This skill serves as both a standalone diagramming tool and an infrastructure layer for potential phase-specific diagram wrapper skills.

## Strategic Question: General vs. Specialized

The core design tension is whether to build:

| Approach | Description | Trade-off |
|----------|-------------|-----------|
| **A. General-purpose builder** | One utility skill handles any Mermaid diagram type | Simple to maintain, but generic instructions may produce lower-quality domain-specific diagrams |
| **B. Phase-specific skills** | Individual skills like `discover-journey-map`, `define-process-flow` | High-quality domain output, but high maintenance cost and duplicated Mermaid guidance |
| **C. Layered (recommended)** | Utility builder as infrastructure + thin phase-specific wrappers with domain templates | Best of both — consistency from shared layer, quality from domain presets |

**Recommendation**: Start with **Approach C, Layer 1 only** — ship the general builder first, then selectively add phase-specific wrappers for highest-value diagram types based on usage.

### Considerations

- **Mermaid scope**: Mermaid supports 15+ diagram types; ~7 are high-utility for PMs (see catalog below)
- **Quality bar**: Output must be valid syntax, readable, consistently styled, and copy-pasteable
- **GitHub integration**: GitHub renders Mermaid natively — diagrams embed directly in PRDs, ADRs, etc.
- **Cross-skill potential**: Existing skills (`deliver-prd`, `develop-adr`, `define-opportunity-tree`) could invoke the builder as a sub-step
- **Incremental delivery**: Ship MVP with Tier 1 diagrams, add Tier 2-3 based on demand

## PM Diagram Catalog (Prioritized)

### Tier 1 — MVP

| # | Diagram Type | Mermaid Type | Complexity | Utility | Value | Primary Phases |
|---|---|---|---|---|---|---|
| 1 | Process / User Flow | `flowchart` | Low | High | High | Develop, Deliver |
| 2 | Journey Map | `journey` | Low | High | High | Discover, Define |
| 3 | Sequence Diagram | `sequenceDiagram` | Med | High | High | Develop, Deliver |
| 4 | State / Lifecycle | `stateDiagram-v2` | Med | High | High | Define, Deliver |
| 5 | Mind Map | `mindmap` | Low | High | Med | Discover, Define |
| 6 | Timeline / Roadmap | `gantt` / `timeline` | Med | High | Med | Deliver, Measure |
| 7 | Quadrant Matrix | `quadrantChart` | Low | High | Med | Define, Iterate |

### Tier 2 — Fast Follow

| # | Diagram Type | Mermaid Type | Complexity | Utility | Value |
|---|---|---|---|---|---|
| 8 | ER Diagram | `erDiagram` | Med | Med | High |
| 9 | Architecture / Block | `block-beta` / `flowchart` | Med | Med | High |
| 10 | Pie Chart | `pie` | Low | Med | Low |
| 11 | XY Chart | `xychart-beta` | Med | Med | Med |
| 12 | Git Graph | `gitGraph` | Med | Med | Med |

### Tier 3 — Layer 2 Wrapper Candidates

| # | Diagram Type | Potential Skill Name | Value |
|---|---|---|---|
| 13 | Decision Tree | `define-decision-tree` | High |
| 14 | Sankey / Funnel | `measure-funnel-diagram` | High |
| 15 | Opportunity Tree | (visual companion to `define-opportunity-tree`) | High |
| 16 | Stakeholder Map | `discover-stakeholder-map` | Med |

### Phase Coverage

Every Triple Diamond phase has at least one Tier 1 diagram type, ensuring MVP value across the full lifecycle.

## Implementation Plan

1. **Phase 1 (F-12)**: Build `utility-mermaid-diagram-builder` with Tier 1 diagram support. SKILL.md + TEMPLATE.md + EXAMPLE.md (showing 3+ diagram types). Add `/mermaid-diagram-builder` command and AGENTS.md entry.
2. **Phase 2 (future efforts)**: Add Layer 2 wrappers for top 2-3 highest-value diagram types (journey map, architecture diagram, decision tree).
3. **Phase 3 (long-term)**: Evaluate diagram composition and interactive refinement workflows.

## Effort Brief

See `docs/internal/efforts/F-12-mermaid-diagram-builder.md` and the `F-12-mermaid-diagram-builder/` subdirectory for:
- `approach-analysis.md` — full comparison of the three approaches
- `pm-diagram-catalog.md` — comprehensive catalog with 20 diagram types, complexity/utility/value assessments, and phase coverage analysis

## Classification

- **Type**: Utility skill (cross-phase capability)
- **Agent**: Claude Opus 4.6 (design thinking, domain expertise, novel content)
- **Skill path**: `skills/utility-mermaid-diagram-builder/`
- **Command**: `/mermaid-diagram-builder`
