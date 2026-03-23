# PM Diagram Catalog — Prioritized by Phase

A comprehensive catalog of diagrams commonly used across the PM lifecycle, assessed for inclusion in `utility-mermaid-diagram-builder` and potential phase-specific wrapper skills.

## Assessment Criteria

| Dimension | Scale | Definition |
|-----------|-------|------------|
| **Complexity** | Low / Medium / High | How difficult to generate correctly (syntax complexity, layout sensitivity, data requirements) |
| **Utility** | Low / Medium / High | How frequently PMs reach for this diagram type in daily work |
| **Value** | Low / Medium / High | How much value the AI-generated version adds over manual creation (high = hard to create manually, AI adds significant leverage) |
| **Mermaid Support** | Native / Possible / Limited | How well Mermaid handles this diagram type |

## Priority Tiers

- **Tier 1 — MVP**: Include in the initial `utility-mermaid-diagram-builder` release
- **Tier 2 — Fast Follow**: Add in next iteration based on demand
- **Tier 3 — Specialized**: Strong candidates for phase-specific wrapper skills
- **Tier 4 — Niche**: Low-frequency use, include only if trivial to add

---

## Tier 1 — MVP (Ship First)

These diagrams are high-utility, well-supported by Mermaid, and commonly needed across multiple phases.

### 1. Process Flow / User Flow
- **Mermaid type**: `flowchart`
- **Phase**: Develop, Deliver, Define
- **Complexity**: Low
- **Utility**: High
- **Value**: High
- **Mermaid Support**: Native
- **PM use cases**: Feature workflows, user task flows, approval processes, onboarding flows, error handling paths
- **Why Tier 1**: Single most common PM diagram. Flowcharts are the bread and butter of product documentation. AI excels here — generating clean, well-labeled flows from natural language descriptions.

### 2. Customer / User Journey Map
- **Mermaid type**: `journey`
- **Phase**: Discover, Define
- **Complexity**: Low
- **Utility**: High
- **Value**: High
- **Mermaid Support**: Native
- **PM use cases**: Current-state journey mapping, future-state design, pain point identification, touchpoint analysis
- **Why Tier 1**: Core PM artifact. Mermaid's `journey` type maps directly to the standard format. Strong candidate for a Layer 2 wrapper (`discover-journey-map`) due to rich domain conventions.

### 3. Sequence Diagram
- **Mermaid type**: `sequenceDiagram`
- **Phase**: Develop, Deliver
- **Complexity**: Medium
- **Utility**: High
- **Value**: High
- **Mermaid Support**: Native
- **PM use cases**: API interaction flows, service-to-service communication, user interaction sequences, integration specifications, handoff protocols
- **Why Tier 1**: Essential for technical product specs. Difficult to create manually (ordering, alignment). AI-generated versions save significant time.

### 4. State Diagram / Lifecycle
- **Mermaid type**: `stateDiagram-v2`
- **Phase**: Define, Deliver
- **Complexity**: Medium
- **Utility**: High
- **Value**: High
- **Mermaid Support**: Native
- **PM use cases**: Feature state machines, order lifecycle, user account states, content publishing workflows, ticket/issue lifecycle
- **Why Tier 1**: Frequently needed in PRDs and specs. State diagrams are tedious to maintain manually — AI generation and iteration is a major time saver.

### 5. Mind Map / Feature Decomposition
- **Mermaid type**: `mindmap`
- **Phase**: Discover, Define, Iterate
- **Complexity**: Low
- **Utility**: High
- **Value**: Medium
- **Mermaid Support**: Native
- **PM use cases**: Feature brainstorming, problem space mapping, solution exploration, stakeholder mapping, requirement decomposition
- **Why Tier 1**: Extremely common in early-phase work. Low complexity makes it easy to support well. Natural fit for AI — structuring unstructured ideas.

### 6. Timeline / Roadmap
- **Mermaid type**: `gantt` or `timeline`
- **Phase**: Deliver, Measure
- **Complexity**: Medium
- **Utility**: High
- **Value**: Medium
- **Mermaid Support**: Native
- **PM use cases**: Release roadmaps, project timelines, milestone planning, sprint planning visualization, historical event timelines
- **Why Tier 1**: Every PM needs roadmap visuals. Mermaid's `gantt` handles date-based timelines well. The `timeline` type handles simpler chronological views.

### 7. Priority / Quadrant Matrix
- **Mermaid type**: `quadrantChart`
- **Phase**: Define, Iterate
- **Complexity**: Low
- **Utility**: High
- **Value**: Medium
- **Mermaid Support**: Native
- **PM use cases**: Impact vs. effort prioritization, risk matrices, competitive positioning, build vs. buy analysis, feature scoring
- **Why Tier 1**: 2x2 matrices are fundamental PM decision tools. Quick to generate, immediately useful. Mermaid's `quadrantChart` is purpose-built.

---

## Tier 2 — Fast Follow

Valuable diagrams that are slightly less frequent or require more implementation effort.

### 8. Entity Relationship Diagram
- **Mermaid type**: `erDiagram`
- **Phase**: Develop, Deliver
- **Complexity**: Medium
- **Utility**: Medium
- **Value**: High
- **Mermaid Support**: Native
- **PM use cases**: Data model documentation, domain modeling, database schema visualization, API resource relationships
- **Why Tier 2**: Very useful for technical PMs but less universal. High value when needed — manual ER diagrams are time-consuming.

### 9. Architecture / Block Diagram
- **Mermaid type**: `block-beta` or `flowchart`
- **Phase**: Develop, Deliver
- **Complexity**: Medium
- **Utility**: Medium
- **Value**: High
- **Mermaid Support**: Possible (using flowchart with subgraphs, or block-beta)
- **PM use cases**: System architecture, microservice topology, infrastructure diagrams, integration landscapes, component diagrams
- **Why Tier 2**: High value but requires careful layout. Flowchart subgraphs can approximate architecture diagrams. Strong candidate for Layer 2 wrapper (`deliver-architecture-diagram`).

### 10. Pie / Distribution Chart
- **Mermaid type**: `pie`
- **Phase**: Measure, Discover
- **Complexity**: Low
- **Utility**: Medium
- **Value**: Low
- **Mermaid Support**: Native
- **PM use cases**: Market share visualization, resource allocation, survey result breakdowns, usage distribution, budget allocation
- **Why Tier 2**: Simple to implement, occasionally useful. Low value-add since pie charts are easy to create in any tool.

### 11. Metrics / XY Chart
- **Mermaid type**: `xychart-beta`
- **Phase**: Measure, Iterate
- **Complexity**: Medium
- **Utility**: Medium
- **Value**: Medium
- **Mermaid Support**: Native (beta)
- **PM use cases**: Trend visualization, metric dashboards, before/after comparisons, growth curves, conversion funnels (approximated)
- **Why Tier 2**: Useful for embedding simple charts in markdown docs. Beta support means syntax may evolve.

### 12. Git / Branching Strategy Diagram
- **Mermaid type**: `gitGraph`
- **Phase**: Deliver
- **Complexity**: Medium
- **Utility**: Medium
- **Value**: Medium
- **Mermaid Support**: Native
- **PM use cases**: Release branching strategy, feature flag workflows, environment promotion flows
- **Why Tier 2**: Niche but very useful for platform PMs and technical documentation.

---

## Tier 3 — Specialized (Layer 2 Wrapper Candidates)

These diagram types have strong PM domain conventions that benefit from dedicated skills with tailored templates, examples, and quality criteria.

### 13. Decision Tree / Decision Flow
- **Mermaid type**: `flowchart`
- **Phase**: Define, Iterate
- **Complexity**: Medium
- **Utility**: Medium
- **Value**: High
- **Mermaid Support**: Native (via flowchart)
- **PM use cases**: Triage logic, escalation paths, pricing tier selection, feature gating logic, support routing
- **Wrapper candidate**: `define-decision-tree` — would add PM-specific framing (decision criteria, confidence levels, outcome tracking)

### 14. Conversion / Sankey Flow
- **Mermaid type**: `sankey-beta`
- **Phase**: Measure
- **Complexity**: High
- **Utility**: Medium
- **Value**: High
- **Mermaid Support**: Native (beta)
- **PM use cases**: Funnel analysis, user flow drop-off, revenue attribution, traffic source analysis
- **Wrapper candidate**: `measure-funnel-diagram` — would enforce conversion-specific conventions (stage labels, drop-off percentages, benchmarks)

### 15. Opportunity Solution Tree
- **Mermaid type**: `mindmap` or `flowchart`
- **Phase**: Define
- **Complexity**: Medium
- **Utility**: Medium
- **Value**: High
- **Mermaid Support**: Possible (mindmap for hierarchy, flowchart for connections)
- **PM use cases**: Teresa Torres-style opportunity mapping, outcome-to-experiment tracing
- **Wrapper candidate**: Would complement the existing `define-opportunity-tree` skill with a visual representation

### 16. Stakeholder / Influence Map
- **Mermaid type**: `quadrantChart` or `flowchart`
- **Phase**: Discover
- **Complexity**: Medium
- **Utility**: Medium
- **Value**: Medium
- **Mermaid Support**: Possible
- **PM use cases**: Stakeholder power/interest mapping, RACI visualization, organizational influence mapping
- **Wrapper candidate**: `discover-stakeholder-map` — would add stakeholder-specific conventions (influence levels, communication strategies)

---

## Tier 4 — Niche

Low-frequency or limited Mermaid support. Include only if trivial.

### 17. Class / Domain Model Diagram
- **Mermaid type**: `classDiagram`
- **Phase**: Develop
- **Complexity**: High
- **Utility**: Low
- **Value**: Medium
- **Mermaid Support**: Native
- **Notes**: More relevant for engineers than PMs. Include in builder but don't prioritize.

### 18. Requirement Diagram
- **Mermaid type**: `requirementDiagram`
- **Phase**: Deliver
- **Complexity**: High
- **Utility**: Low
- **Value**: Low
- **Mermaid Support**: Native but rarely used
- **Notes**: Formal requirements tracing. Most PM teams use lighter-weight approaches.

### 19. C4 Architecture Diagram
- **Mermaid type**: `C4Context` (via plugin/extension)
- **Phase**: Develop
- **Complexity**: High
- **Utility**: Low
- **Value**: High
- **Mermaid Support**: Limited (requires extension)
- **Notes**: Powerful but limited Mermaid support. Consider as a future enhancement if C4 adoption grows.

### 20. Network / Topology Diagram
- **Mermaid type**: `flowchart` with custom styling
- **Phase**: Deliver
- **Complexity**: High
- **Utility**: Low
- **Value**: Medium
- **Mermaid Support**: Possible (approximated)
- **Notes**: Infrastructure-specific. Better served by dedicated tools (draw.io, Lucidchart).

---

## Summary Matrix

| # | Diagram Type | Tier | Complexity | Utility | Value | Mermaid | Primary Phase(s) |
|---|---|---|---|---|---|---|---|
| 1 | Process / User Flow | 1 | Low | High | High | Native | Develop, Deliver |
| 2 | Journey Map | 1 | Low | High | High | Native | Discover, Define |
| 3 | Sequence Diagram | 1 | Med | High | High | Native | Develop, Deliver |
| 4 | State / Lifecycle | 1 | Med | High | High | Native | Define, Deliver |
| 5 | Mind Map | 1 | Low | High | Med | Native | Discover, Define |
| 6 | Timeline / Roadmap | 1 | Med | High | Med | Native | Deliver, Measure |
| 7 | Quadrant Matrix | 1 | Low | High | Med | Native | Define, Iterate |
| 8 | ER Diagram | 2 | Med | Med | High | Native | Develop, Deliver |
| 9 | Architecture / Block | 2 | Med | Med | High | Possible | Develop, Deliver |
| 10 | Pie Chart | 2 | Low | Med | Low | Native | Measure, Discover |
| 11 | XY Chart | 2 | Med | Med | Med | Native | Measure, Iterate |
| 12 | Git Graph | 2 | Med | Med | Med | Native | Deliver |
| 13 | Decision Tree | 3 | Med | Med | High | Native | Define, Iterate |
| 14 | Sankey / Funnel | 3 | High | Med | High | Native | Measure |
| 15 | Opportunity Tree | 3 | Med | Med | High | Possible | Define |
| 16 | Stakeholder Map | 3 | Med | Med | Med | Possible | Discover |
| 17 | Class / Domain Model | 4 | High | Low | Med | Native | Develop |
| 18 | Requirement Diagram | 4 | High | Low | Low | Native | Deliver |
| 19 | C4 Diagram | 4 | High | Low | High | Limited | Develop |
| 20 | Network Topology | 4 | High | Low | Med | Possible | Deliver |

## Phase Coverage Analysis

| Phase | Tier 1 Diagrams | Tier 2 | Tier 3 | Total |
|-------|----------------|--------|--------|-------|
| **Discover** | Journey Map, Mind Map | Pie Chart | Stakeholder Map | 4 |
| **Define** | Journey Map, State Diagram, Mind Map, Quadrant | — | Decision Tree, Opportunity Tree | 6 |
| **Develop** | Process Flow, Sequence Diagram | ER Diagram, Architecture | — | 4 |
| **Deliver** | Process Flow, Sequence Diagram, State Diagram, Timeline | Architecture, Git Graph | — | 6 |
| **Measure** | Timeline | Pie Chart, XY Chart | Sankey/Funnel | 4 |
| **Iterate** | Quadrant, Mind Map | XY Chart | Decision Tree | 4 |

Every phase has at least one Tier 1 diagram type, ensuring the MVP utility skill adds value across the full Triple Diamond.
