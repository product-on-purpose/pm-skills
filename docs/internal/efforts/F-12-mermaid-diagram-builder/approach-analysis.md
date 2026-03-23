# F-12 Approach Analysis: General vs. Specialized Mermaid Diagram Skills

## The Core Question

How should we expose Mermaid diagramming capability across the PM skills ecosystem?

## Three Approaches

### Approach A: Single General-Purpose Utility Skill

**What**: One `utility-mermaid-diagram-builder` skill that accepts any diagram type, interprets the user's intent, selects the right Mermaid diagram type, and produces the output.

**Pros**:
- Single skill to maintain — lower total maintenance burden
- Users learn one interface for all diagram needs
- Naturally handles edge cases where a diagram doesn't fit a PM phase
- Simpler command surface (one `/mermaid` command)
- Easiest to ship quickly as an MVP

**Cons**:
- The SKILL.md becomes very long with guidance for 10+ diagram types
- Generic instructions may produce lower-quality output for domain-specific diagrams (e.g., a customer journey map requires PM-specific framing that a general builder won't enforce)
- Template and example files can't meaningfully cover all diagram types
- Harder to integrate with phase-specific bundles
- Quality checklist becomes generic

**Best for**: Repositories where diagramming is a secondary capability, or as an MVP to validate demand before investing in specialization.

### Approach B: Phase-Specific Diagram Skills (No Shared Layer)

**What**: Individual skills like `discover-journey-map`, `define-process-flow`, `deliver-architecture-diagram`, each producing Mermaid output with domain-specific instructions and templates.

**Pros**:
- Each skill has focused, high-quality instructions and examples
- Fits naturally into the Triple Diamond phase model
- Templates enforce domain-specific sections (e.g., journey maps include emotional states, pain points)
- Quality checklists are precise and verifiable
- Discoverable via phase — users find them where they expect

**Cons**:
- High maintenance cost — each diagram type is a full 3-file skill
- Mermaid syntax guidance is duplicated across skills
- Inconsistent Mermaid conventions between skills (styling, layout, naming)
- Could rapidly inflate the skill count (10+ new skills)
- Does not provide a way to create ad-hoc diagrams that don't fit a predefined type

**Best for**: Mature ecosystems where each diagram type has clear, distinct PM value and the team has capacity for ongoing maintenance.

### Approach C: Layered Architecture (Recommended)

**What**: A `utility-mermaid-diagram-builder` as the infrastructure layer, with optional thin phase-specific skills that invoke it with pre-configured templates and domain conventions.

**How it works**:
1. **Layer 1 — Utility skill** (`utility-mermaid-diagram-builder`): Handles all Mermaid syntax, styling, layout best practices, and rendering. Accepts a diagram type, data/description, and optional style parameters. Ships first.
2. **Layer 2 — Phase-specific wrappers** (optional, shipped later): Thin skills like `discover-journey-map` that provide domain context (PM-specific template sections, quality criteria, example) and delegate rendering to the utility skill. These are essentially "opinionated presets" for the builder.

**Pros**:
- Mermaid expertise lives in one place — consistency guaranteed
- Phase-specific skills stay small and focused (mostly template + example + domain instructions)
- Users can use the general builder for ad-hoc needs OR the specialized skill for common PM artifacts
- Incremental delivery — ship the builder first, add specializations based on demand
- Specializations are low-cost to create once the builder exists
- Naturally supports the pm-skill-builder workflow for creating new diagram skills

**Cons**:
- Slightly more complex architecture (skill-calls-skill pattern)
- Need to define the interface between layers (how a wrapper skill communicates with the builder)
- The utility skill still needs to be comprehensive enough to handle unassisted use

**Best for**: This project — balances quality, maintainability, and incremental delivery.

## Recommendation

**Start with Approach C, Layer 1 only.** Ship `utility-mermaid-diagram-builder` as a standalone utility skill that handles the most common PM diagram types well. Validate usage and quality. Then selectively add Layer 2 wrappers for the highest-value diagram types (see `pm-diagram-catalog.md` for candidates).

### Implementation Phases

1. **Phase 1 (F-12)**: Build `utility-mermaid-diagram-builder` with support for the top 5-7 diagram types from the catalog. Include a comprehensive EXAMPLE.md showing 3+ diagram types.
2. **Phase 2 (Future efforts)**: Based on usage data and feedback, create phase-specific wrappers for the top 2-3 highest-value diagram types (likely: journey map, process flow, architecture diagram).
3. **Phase 3 (Long-term)**: Evaluate whether the builder should support diagram composition (combining multiple diagrams into a single document) and interactive refinement workflows.

## Considerations

### Mermaid Syntax Scope

Mermaid supports 15+ diagram types. For PM utility, the relevant subset is approximately:

| Mermaid Type | PM Use Case |
|---|---|
| `flowchart` | Process flows, decision trees, user flows |
| `sequenceDiagram` | API interactions, service flows, user interaction sequences |
| `classDiagram` | Domain models, entity relationships |
| `stateDiagram` | State machines, lifecycle diagrams |
| `erDiagram` | Data models, entity relationships |
| `gantt` | Roadmaps, timelines, project plans |
| `journey` | Customer/user journey maps |
| `pie` | Distribution/composition charts |
| `quadrantChart` | Priority matrices, 2x2 analyses |
| `mindmap` | Brainstorming, concept mapping, feature decomposition |
| `timeline` | Historical timelines, release history |
| `gitGraph` | Branching strategies, release flows |
| `sankey` | Flow/conversion analysis |
| `xychart` | Metrics visualization |
| `block` | System architecture, block diagrams |

### Quality Bar

The builder should produce diagrams that are:
- **Correct** — valid Mermaid syntax that renders without errors
- **Readable** — clear labels, logical layout, appropriate level of detail
- **Styled** — consistent use of colors, shapes, and formatting conventions
- **Annotated** — include title, legend where appropriate
- **Copy-pasteable** — output in a fenced code block ready for any Mermaid renderer

### Integration Points

- GitHub renders Mermaid natively in markdown — diagrams can be embedded directly in PRDs, ADRs, and other skill outputs
- Several existing skills could benefit from optional diagram generation (e.g., `deliver-prd` could include architecture diagrams, `develop-adr` could include decision flow diagrams)
- The builder could be invoked as a "sub-step" within other skill instructions
