# [F-12] Mermaid Diagram Builder
Status: Planned
Milestone: TBD
Issue: TBD
Agent: Claude Opus 4.6

## Scope

New utility skill (`utility-mermaid-diagram-builder`) that generates publication-quality Mermaid diagrams from natural-language descriptions or structured data. This skill serves as both a standalone diagramming tool and an infrastructure layer that phase-specific diagram skills can build on.

The core tension is **general-purpose builder vs. specialized PM diagram skills**. This effort explores both approaches and establishes the architectural foundation. See `docs/internal/efforts/F-12-mermaid-diagram-builder/approach-analysis.md` for the full analysis, and `docs/internal/efforts/F-12-mermaid-diagram-builder/pm-diagram-catalog.md` for a prioritized catalog of PM diagrams across all phases.

## Strategic Question

Should we build:

1. **A single general-purpose Mermaid builder** — one utility skill that handles any diagram type via parameterization
2. **Phase-specific diagram skills** — e.g., `discover-journey-map`, `define-process-flow`, `deliver-architecture-diagram` — each using Mermaid as the rendering engine
3. **Layered approach** — a utility-level Mermaid builder as infrastructure + thin phase-specific skills that invoke it with domain templates and conventions

See the approach analysis document for detailed trade-offs.

## Key Decisions

- Classified as `utility` (cross-phase capability, like `utility-pm-skill-builder`)
- Effort subdirectory used for catalog and approach analysis (volume of planning material warrants it)
- Claude assigned due to design thinking, domain expertise, and novel content requirements

## Artifacts Produced

- `docs/internal/efforts/F-12-mermaid-diagram-builder/approach-analysis.md` — approach comparison and recommendation
- `docs/internal/efforts/F-12-mermaid-diagram-builder/pm-diagram-catalog.md` — prioritized diagram catalog with complexity/utility/value assessments
- `skills/utility-mermaid-diagram-builder/` — skill implementation (when built)
- `commands/mermaid-diagram-builder.md` — command file (when built)
- AGENTS.md entry (when shipped)

## PRs

- TBD
