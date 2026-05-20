---
name: tool-foundation-sprint-approach-options
description: Day 2 morning move of a Foundation Sprint. Forces generation of 3 to 7 candidate approaches as one-page summaries before the team converges on a top bet. Use after Day 1 is signed and before Magic Lenses on Day 2 afternoon. Enforces a minimum of 3 approaches to prevent first-idea anchoring. Each approach summary names what it is, why it serves the differentiators, and includes a simple visual.
license: Apache-2.0
metadata:
  classification: tool
  version: "0.1.0"
  updated: 2026-05-14
  tool: foundation-sprint
  move: approach-options
  category: ideation
  frameworks:
    - foundation-sprint
    - click
  timebox_minutes: 75
  roles:
    - facilitator
    - decider
    - pm
    - design
    - engineering
  prerequisites:
    - tool-foundation-sprint-basics
    - tool-foundation-sprint-differentiation
  inputs:
    - basics bundled artifact
    - differentiation bundled artifact
    - approach candidates
  outputs:
    - 3 to 7 one-page approach summaries
    - approach set summary table
  author: product-on-purpose
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Foundation Sprint Approach Options

Day 2 morning of a Foundation Sprint. The team forces itself to generate multiple plausible approaches before committing to one. The skill enforces a minimum of 3 approaches; anchoring on a single approach is the most common Day 2 failure mode.

Family contract: [`docs/reference/skill-families/foundation-sprint-skills-contract.md`](../../docs/reference/skill-families/foundation-sprint-skills-contract.md). This skill is a member of `foundation-sprint-skills`.

## When to Use

- Day 2 morning of a Foundation Sprint.
- Day 1 is signed; the Mini Manifesto, decision principles, and differentiation chart are committed.
- The team is ready to generate candidate approaches before evaluating them through Magic Lenses in the afternoon.

## When NOT to Use

- Day 1 is unresolved. Approach Options without differentiation context produces approaches that miss the strategic position.
- The team has only one approach in mind and is unwilling to generate alternatives. The skill forces minimum 3; if the team refuses, the issue is sprint discipline, not tooling.
- More than 7 approaches are emerging organically. The skill caps generation at 7; beyond that the team is generating features, not strategic approaches.

## What This Skill Produces

A single bundled artifact containing:

1. **3 to 7 one-page approach summaries**, each with:
   - Name and label (color, letter, ID)
   - One-sentence "what it is"
   - "Why it's a good idea" rationale (1 short paragraph)
   - Simple doodle or textual visual description
   - How the approach serves the two chosen differentiators
2. **Approach set summary table** comparing all approaches at a glance (label, name, capture mechanism, recall mechanism, primary trade-off).

See `references/TEMPLATE.md` for the canonical structure and `references/EXAMPLE.md` for the Brainshelf example.

## Sequence (75 minutes)

### Step 1: Frame the approach space (5 min)

The facilitator restates the differentiation: "We are committing to [differentiator 1] and [differentiator 2]. Approaches that fail either of these are out of scope." This sets the boundary; the team generates inside it, not outside it.

### Step 2: Silent ideation (15-20 min)

Each team member generates 2-4 candidate approaches silently. Cluster duplicates. Surface 8-12 candidates.

### Step 3: Cluster and select 3-7 (15-25 min via Decider call)

The team clusters similar approaches and the Decider narrows to 3-7 candidates that will be one-page-summarized. The 3-minimum is enforced; if the team produces 2 candidates after clustering, push the team back to ideation to generate at least one more.

### Step 4: One-page summarize each approach (25-40 min)

Each team member takes 1-2 approaches and writes the one-page summary. Each summary names:

- **Label**: a color, letter, or short identifier (Yellow, Blue, Approach A, etc.)
- **What it is**: one sentence the customer would understand
- **Why it's a good idea**: short paragraph naming the customer value and the team's ability to deliver
- **Visual**: a simple doodle or textual description of what the customer sees or does
- **How it serves the differentiators**: one or two lines per chosen differentiator

### Step 5: Cross-summary review (5-10 min)

The team reviews the full set, flagging summaries that don't fit the differentiators or that overlap so heavily with another approach that they're duplicates. The Decider approves the set advancing to Magic Lenses.

## Approach Generation Discipline

The skill enforces five rules at decision-point:

1. **Minimum 3, maximum 7.** Fewer than 3 means the team is anchored on one idea; more than 7 means the team is generating features.
2. **Each approach must be a strategic path, not a feature.** "Add a settings screen" is a feature; "make capture the home screen" is a strategic path.
3. **Each approach must serve both chosen differentiators (not just one).** An approach that wins on differentiator 1 but fails differentiator 2 should be either revised or dropped.
4. **Each approach must be visually describable.** If the team can't draw it on a card, the approach is too abstract for the sprint.
5. **No first-idea bias.** The first approach the team thought of should be included only if it survives the differentiation check; many teams find their initial idea is not the strongest after generating alternatives.

## Inference Inputs

| Input | What the skill does with it |
|---|---|
| Basics bundled artifact | Reads target customer to ensure approaches are designed for them, not for an adjacent customer |
| Differentiation bundled artifact | Reads the 2 chosen differentiators and the 2x2 position; flags approaches that miss either differentiator |
| Approach candidates (optional) | If pre-supplied, pre-populates the silent ideation board; team adds and refines rather than starting cold |

## Common Pitfalls

- **Generating features instead of approaches.** "Add notifications" is not an approach; it's a feature. The skill enforces strategic-path framing.
- **Too few options.** Stopping at 2 approaches because "those are obviously the choices" anchors the team. Force a third even if it's intentionally weaker; it surfaces the trade-offs.
- **Approaches that fail one differentiator.** An approach that beats differentiator 1 but loses differentiator 2 has rejected the Day 1 strategic commitment. Either drop it or revise it.
- **Skipping the visual.** "I can describe it in prose" defeats the purpose. The visual forces concreteness.
- **Overlap masquerading as distinct approaches.** Two summaries that differ only in implementation detail are one approach. Cluster them.

## Decider Role

The Decider's job during Approach Options:

1. Restate the differentiation boundary at the start.
2. Narrow the clustered candidates to 3-7 for one-page summary.
3. Approve the final set advancing to Magic Lenses; reject summaries that drift from the differentiation.

The Decider does NOT pick a top approach in this skill. Magic Lenses produces the top bet; Approach Options produces the candidates Magic Lenses will evaluate.

## Canonical Sources

- Character Capital. "Foundation Sprint guide." Approach generation agenda.
- Knapp, J., and Zeratsky, J. *Click*. Day 2 morning sequence.

## Cross-Skill Usage

Prerequisites: `tool-foundation-sprint-differentiation`. The Day 1 strategic position is the load-bearing input.

Next invocation: `tool-foundation-sprint-magic-lenses` in the afternoon. The approach set produced here is the input to Magic Lenses scoring.

## Decider Checkpoint

This skill ends with a Decider Checkpoint in `references/TEMPLATE.md`. The Decider signs off on the set of approaches advancing to Magic Lenses, confirming none are out-of-scope and none are duplicates. Without sign-off, Magic Lenses begins with an unstable candidate set.
