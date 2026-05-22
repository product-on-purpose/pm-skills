---
artifact: journey-map
version: "1.0"
created: <YYYY-MM-DD>
status: draft
---

# Customer Journey Map: [Persona] - [Goal]

## Executive Summary
<!-- 3-5 sentences: who the journey is FOR, what they want to accomplish, biggest pain points and opportunities, the single most important moment of truth -->

[Summary]

## Persona / Segment
<!-- 1 paragraph. Reference an existing persona artifact if one exists, else summarize key attributes -->

[Persona summary]

## Journey Scope

- **Journey type:** [Linear | Cyclical | Multi-actor]
- **Included:** [What phase / lifecycle this map covers]
- **Excluded:** [What is deliberately out of scope]

## Stages
<!-- 3-7 stages. Use customer-language verb names: Discovers, Considers, Tries, Decides, Uses, Renews -->

| # | Stage | Customer goal | Duration | Entry trigger | Exit criterion |
|---|---|---|---|---|---|
| 1 | [Discovers] | [Goal] | [Time] | [Trigger] | [Exit] |
| 2 | [Considers] | [Goal] | [Time] | [Trigger] | [Exit] |
| 3 | [Tries] | [Goal] | [Time] | [Trigger] | [Exit] |

## Touchpoints per Stage

| Stage | Touchpoint | Channel | What happens |
|---|---|---|---|
| [Discovers] | [Touchpoint] | [Channel] | [Interaction] |

## Emotional Curve
<!-- Specific emotion labels, not happy/sad. Every entry needs a confidence label and a source, or is marked Hypothesis (Confidence: Low) -->

| Stage | Dominant emotion | Confidence | Source |
|---|---|---|---|
| [Discovers] | [Emotion] | [High/Medium/Low] | [Research evidence, or "Hypothesis"] |

## Pain Points and Moments of Truth
<!-- Moments of truth = the 3-5 moments that decide continue-vs-abandon, NOT every interaction -->

| Stage | Pain / Moment of Truth | Severity (1-5) | Customer evidence | Implication |
|---|---|---|---|---|
| [Stage] | [Pain or MoT] | [1-5] | [Evidence] | [What it means] |

## Opportunities
<!-- 1-3 per stage. Each ties to a specific pain point or moment of truth above -->

| Stage | Opportunity | Product change that addresses it | Effort (rough) |
|---|---|---|---|
| [Stage] | [Opportunity] | [Change] | [Small/Medium/Large] |

## Visual

### Linear journey (mermaid timeline)
<!-- Use for start-to-end journeys -->

```
timeline
    title [Persona] Journey
    [Discovers] : [touchpoint] : [touchpoint]
    [Considers] : [touchpoint]
    [Tries] : [touchpoint]
    [Decides] : [outcome]
```

### Cyclical journey (mermaid flowchart)
<!-- Use for recurring engagement loops; show the return edge back to an earlier stage -->

```
flowchart LR
    A[Onboards] --> B[Uses]
    B --> C[Reviews / QBR]
    C --> D[Renews]
    D --> B
```

<!-- For 5+ stages, also add focused sectional diagrams to avoid crowding. -->

### Multi-actor journey (advanced)
<!-- For journeys with multiple personas (e.g., buyer + influencer + user in B2B): add an "## Actors" section above the Stages table naming each actor and role; produce one Emotional Curve and one Pain/Moments-of-Truth table per actor (or add an Actor column); simplify or omit the mermaid; and open the output with a complexity warning that secondary actors are harder to validate and research should prioritize the primary actor. -->

## Research Gaps
<!-- What the map does NOT address because data is unavailable, and what follow-up research would close the most important gaps -->

- [Gap 1 and the research that would close it]
- [Gap 2]
