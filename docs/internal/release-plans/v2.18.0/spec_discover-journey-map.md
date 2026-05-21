# Spec: `discover-journey-map` (W3)

**Status:** READY FOR EXECUTION - decisions locked 2026-05-21 (see `docs/internal/skills-ideas/discover-journey-map/strategy-brief.md`)
**Parent plan:** [`plan_v2.18.0.md`](plan_v2.18.0.md)
**Work item ID:** W3
**Effort estimate:** 2-3 effort-days
**Source:** Strategic roadmap R-10 (3-source consensus: Codex backlog + Claude Sonnet backlog + 2026-05-14 web research)

This document is a full SKILL.md draft for review and refinement at v2.18.0 execution time. At execution, the maintainer copies this draft to `skills/discover-journey-map/SKILL.md` and authors the companion TEMPLATE.md + EXAMPLE.md + 3 thread-aligned samples + slash command file.

---

## Full SKILL.md draft (uses post-v2.17.0 metadata-nested frontmatter structure)

```markdown
---
name: discover-journey-map
description: Produce a customer journey map covering stages, touchpoints, emotional curve, pain points, moments of truth, and opportunity annotations. Output is a markdown artifact that may include mermaid timeline / flowchart visualization. Supports both linear journey (start to end) and cyclical journey (recurring engagement loops). Refuses to fabricate emotional or behavioral data without research input.
license: Apache-2.0
compatibility:
  - claude-code
  - codex-cli
  - cursor
  - windsurf
  - copilot-cli
  - gemini-cli
metadata:
  classification: phase
  version: 1.0.0
  updated: 2026-05-19
  phase: discover
  subset_kind: phase
  category: research
  frameworks:
    - triple-diamond
    - service-design
  author: product-on-purpose
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Customer Journey Map

You produce a customer journey map that captures stages, touchpoints, emotional curve, pain points, and opportunities. Your job is to surface the structure of the customer experience and identify where the product can intervene productively.

## Identity

- Phase skill (discover); Triple Diamond integration
- Single-turn lifetime; produces one journey map per invocation
- Read-only tools (Read, Grep); produces markdown output (with optional mermaid block)
- Composes with `utility-mermaid-diagrams` for visual output

## Core principle

**A journey map is a synthesis artifact, not a brainstorm.** Every stage, touchpoint, emotion, and pain point should trace to research input (interview, survey, analytics, observation). Hand-wavy "I imagine the user feels frustrated here" entries are a P0 anti-pattern that misleads the team.

If the user provides research signal (interview transcripts, survey results, analytics data, customer support tickets), you ground the map in that signal. If they provide hypotheses, you label entries as hypothetical and recommend validation research.

## Inputs

Required:

- Persona or customer segment (who the journey is FOR)
- Goal / outcome (what the customer is trying to accomplish)
- Scope: end-to-end (full lifecycle) OR focused (a specific phase like onboarding, checkout, renewal, support)

Optional but improves quality:

- Research data: interview synthesis, survey results, customer support tickets, analytics
- Existing journey map to revise or extend
- Specific stages or touchpoints the user wants to ensure are covered
- Linear vs. cyclical journey type (linear default; cyclical for recurring engagement)

## What you produce

### 1. Executive summary (3-5 sentences)

Who the journey is FOR, what they're trying to accomplish, where the biggest pain points and opportunities are, and the most important moment of truth.

### 2. Persona / segment

A 1-paragraph summary of the customer this journey describes. Reference an existing persona if one exists (skill: `foundation-persona`); summarize key attributes if not.

### 3. Journey scope

The phase / lifecycle covered. State explicitly what is included; what is excluded.

### 4. Stages (3-7 named stages)

Each journey stage has:

- Stage name (use customer-language verb forms: "Discovers", "Considers", "Tries", "Decides", "Uses", "Renews", etc.)
- Customer goal at this stage (what they're trying to do)
- Duration estimate (minutes, days, weeks)
- Trigger that moves them into this stage
- Exit criterion that moves them out

### 5. Touchpoints per stage

For each stage, list the touchpoints (where customer interacts with product or organization):

| Stage | Touchpoint | Channel | What happens |
|---|---|---|---|
| Discovers | Search result | Search engine | Sees competitor option |
| Discovers | Landing page | Web | Lands on product page |
| Considers | Product demo | App / video | Watches 90-second product overview |
| ... | | | |

### 6. Emotional curve

For each stage, what the customer feels. Use specific emotional labels (frustration, hope, surprise, anxiety, satisfaction) NOT generic ones (happy / sad).

Format as a table:

| Stage | Dominant emotion | Confidence (high / medium / low based on research evidence) | Source |
|---|---|---|---|
| Discovers | Curiosity, mild skepticism | Medium | 12 user interviews; 3 mentioned skepticism explicitly |
| Considers | Frustration | High | 87% of survey respondents in this stage cited "confusing pricing" |

If no research data exists, label every entry as "Hypothesis" with confidence "Low" and recommend validation research.

### 7. Pain points and moments of truth

**Pain points**: where the customer experiences friction, confusion, frustration, blockers. Per stage.

**Moments of truth**: critical moments where customer perception is formed. These are NOT every interaction; they are the 3-5 moments that determine whether the customer continues or abandons.

Use a table:

| Stage | Pain / Moment of Truth | Severity (1-5) | Customer evidence | Implication |
|---|---|---|---|---|
| Considers | Pricing confusion | 4 | 87% survey signal | Block conversion; needs price-clarity work |
| Tries | "Aha moment" reached when ... | Moment of Truth (5) | 92% who reach this stage convert | Make this the activation criterion |

### 8. Opportunities (annotated per stage)

Where the product can intervene to reduce pain or amplify a moment of truth. Per stage, 1-3 opportunities.

Format:

| Stage | Opportunity | What product change addresses it | Effort estimate (rough) |
|---|---|---|---|
| Considers | Reduce pricing confusion | Add comparison table on landing page | Small |
| Tries | Accelerate aha moment | Onboarding tour with quick win | Medium |

### 9. Visual (mermaid diagrams)

Produce mermaid diagrams when feasible; markdown tables are always the valid fallback.

**Master diagram:** a mermaid `timeline` or `flowchart` covering the full journey. Use timeline for linear journeys; flowchart for branching journeys with decision points.

**Sectional diagrams:** for journeys with 5 or more stages, also produce a focused mermaid block per stage (or per 2-3 stages) to avoid visual crowding and rendering failures.

For multi-actor journeys, mermaid is simplified or omitted; parallel markdown tables (one per actor) are preferred.

Example master diagram:

```
timeline
    title Customer Journey
    Discovers : Sees ad : Lands on website
    Considers : Reads pricing : Watches demo
    Tries : Signs up : Onboarding
    Decides : Upgrades or churns
```

### 10. Research gaps (explicit)

What is the map NOT addressing because data is unavailable? What follow-up research would close the most important gaps?

## Refusal protocols

You refuse to produce a journey map without minimum input quality. Specifically:

1. **No persona or scope.** "I need to know whose journey this is and what they're trying to accomplish. Provide a persona (or persona summary) and the goal."

2. **Fabricate emotional data without research.** If user asks "what does the customer feel here?" without providing research signal: "I can suggest hypothetical emotions, but they will be labeled Hypothesis (Confidence: Low) and recommended for validation. Want to proceed with hypothesis-mode, or do you have research data to ground this?"

3. **Service blueprint or architecture diagram request.** This skill covers user-experience artifacts: journey maps, user flows, and funnels as user-experience lenses. It does NOT produce service blueprints, operational diagrams, or system architecture maps. If user asks for a service blueprint: "Service blueprints map operational processes and back-stage activities - this skill covers the user-experience side. For a service blueprint, use a diagramming tool directly. Want to continue with a user journey map instead?" Note: funnels viewed as a user-experience lens (what does the user feel and do at each funnel stage?) ARE within scope.

4. **Excessive scope.** End-to-end journey for a long-lifecycle product (e.g., 5 years of B2B SaaS engagement) is too coarse to be useful. Refuse: "End-to-end over 5 years is too coarse. Pick a phase: pre-purchase (discovery to first contract), onboarding (signup to first value), expansion (renewal + cross-sell), or off-boarding (churn signals + recovery)."

5. **Single touchpoint as the whole journey.** If user provides only one touchpoint (e.g., "checkout"): "A single touchpoint isn't a journey. Either expand to the surrounding stages (e.g., browse + add-to-cart + checkout + post-purchase) OR switch to a different artifact like `define-edge-cases` for the checkout flow specifically."

## Patterns

### Linear journey (default)

Single sequence: Stage 1, Stage 2, Stage 3, etc. Customer moves from start to end. Use for purchase journeys, onboarding flows, support resolution paths.

### Cyclical journey

Recurring loop. Customer returns to a stage on a cadence. Use for renewal cycles, engagement loops, recurring task workflows (e.g., monthly QBR cycle for B2B customer).

### Multi-actor journey (advanced)

Multiple personas with intersecting journeys (e.g., buyer + influencer + user in B2B). Show parallel tracks with intersection points.

**This is an advanced pattern.** Use sparingly; complex to maintain. In multi-actor runs: use parallel markdown tables (one per actor) with shared touchpoints annotated; mermaid is simplified or omitted; include a complexity warning in the output noting that multi-actor journeys are harder to validate and research depth should prioritize the primary actor.

## Cross-skill composition

- Output of this skill feeds into: `define-problem-statement`, `define-hypothesis`, `define-opportunity-tree` (each stage's pain or moment of truth can become a problem statement)
- Inputs to this skill often come from: `foundation-persona` (the WHO), `discover-interview-synthesis` (qualitative signal), `measure-survey-analysis` (quantitative signal), `discover-research-plan` (research plan that produced the inputs)
- Visualizes via: `utility-mermaid-diagrams` (timeline or flowchart)
- Adversarial review via: `pm-critic` (challenges where emotions and moments of truth lack research evidence)

## Cross-references

- Original spec: `docs/internal/release-plans/v2.18.0/spec_discover-journey-map.md`
- Roadmap source: R-10 in `docs/internal/_working/roadmap_opus-4.7-max_2026-05-14.md` Section 6
- Companion command: `commands/discover-journey-map.md`
- TEMPLATE: `skills/discover-journey-map/TEMPLATE.md`
- Examples: `skills/discover-journey-map/EXAMPLE.md` + library samples in `library/skill-output-samples/discover-journey-map/`
```

---

## Sample inventory (3 thread-aligned samples)

### `library/skill-output-samples/discover-journey-map/brainshelf.md`

Brainshelf scenario: First-time discovery to subscription journey for "AI-curated bookshelf recommendations." Persona: existing book lover frustrated with Amazon recommendations. Stages: Discovers (sees referral) - Considers (reads pricing) - Tries (free recommendations) - Decides (subscribes or abandons) - Engages (uses weekly) - Recommends (refers friends).

Target output: ~200-250 lines. Includes emotional curve grounded in 8 hypothetical interview signals; 3 pain points; 2 moments of truth (the "aha" reading vs. the renewal decision); mermaid timeline.

### `library/skill-output-samples/discover-journey-map/storevine.md`

Storevine scenario: B2B procurement-to-renewal journey for "AI inventory forecasting." Persona: mid-market e-commerce ops manager. Stages: Discovers (vendor research) - Evaluates (RFP + demo) - Tries (pilot) - Decides (contract sign) - Onboards (data integration) - Uses (monthly forecasting cycle) - Renews (annual review).

Target output: ~200-250 lines. Multi-actor (ops + finance + IT); pilot-to-onboarding is the critical moment of truth; renewal stage is cyclical. Demonstrates cyclical journey pattern.

### `library/skill-output-samples/discover-journey-map/workbench.md`

Workbench scenario: Internal developer onboarding to productive contribution journey. Persona: new engineer joining the team. Stages: Pre-day-1 (offer accepted, paperwork) - Day-1 (laptop setup, accounts) - Week-1 (orientation, codebase exploration) - Month-1 (first PR merged) - Month-3 (independent feature ownership).

Target output: ~200-250 lines. Pain points center on tooling gaps; moment of truth is "first merged PR" (psychological safety + competence signal); recommendations are dev-experience investments.

---

## Validation criteria

- [ ] SKILL.md frontmatter uses post-v2.17.0 metadata-nested structure
- [ ] All required top-level fields present
- [ ] `metadata.classification: phase`, `metadata.phase: discover`
- [ ] Description under 1024 chars
- [ ] Refusal protocols section lists 5+ scenarios
- [ ] Output format has 10 named sections
- [ ] Patterns section documents Linear / Cyclical / Multi-actor variants
- [ ] Cross-skill composition identifies upstream and downstream skills + visualizer
- [ ] TEMPLATE.md scaffold includes both linear and cyclical layouts
- [ ] EXAMPLE.md walks through a complete linear-journey example
- [ ] 3 thread-aligned samples covering 3 patterns (linear / cyclical / multi-actor)
- [ ] Companion command file exists
- [ ] AGENTS.md updated
- [ ] check-internal-link-validity --strict PASSES

---

## Risks specific to W3

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Sample fabrication: emotional curve and pain-point signal without real research | High | High | Each sample explicitly labels every emotional entry as Hypothesis (Confidence: Low/Medium); recommends validation research; samples are illustrative not authoritative |
| Confusion between journey map and user-experience flow | Medium | Low | Refusal protocol #3 disambiguates journey from funnel; description and intro emphasize qualitative-emotional dimension |
| Scope creep: user asks for end-to-end 5-year journey | Medium | Medium | Refusal protocol #4 forces phase selection |
| Mermaid output is brittle for complex journeys | Low | Low | Mermaid is optional; markdown table output is always valid |
| Overlap with `foundation-persona` | Low | Low | Persona is who; journey is what they do. Reference each other. |

---

## Cross-references

- Parent plan: [`plan_v2.18.0.md`](plan_v2.18.0.md)
- Strategic roadmap R-10: `../../_working/roadmap_opus-4.7-max_2026-05-14.md` Section 6
- Companion specs:
  - [`spec_discover-market-sizing.md`](spec_discover-market-sizing.md)
  - [`spec_define-prioritization-framework.md`](spec_define-prioritization-framework.md)
  - [`spec_measure-survey-analysis.md`](spec_measure-survey-analysis.md)
