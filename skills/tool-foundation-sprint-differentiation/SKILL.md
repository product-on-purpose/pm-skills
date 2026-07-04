---
name: tool-foundation-sprint-differentiation
description: Day 1 afternoon move of a Foundation Sprint. Converts the morning's Basics frame into a defensible strategic position by scoring differentiator candidates against customer-perceived value, choosing two committed differentiators, plotting alternatives on a 2x2 chart, writing decision principles, and producing a one-page Mini Manifesto. Use after Basics is signed; before Approach Options the next morning.
license: Apache-2.0
metadata:
  classification: tool
  version: "1.0.0"
  updated: 2026-07-04
  tool: foundation-sprint
  move: differentiation
  category: problem-framing
  frameworks:
    - foundation-sprint
    - click
    - character-note-and-vote
  timebox_minutes: 150
  roles:
    - facilitator
    - decider
    - pm
    - design
  prerequisites:
    - tool-foundation-sprint-basics
  inputs:
    - basics bundled artifact
    - differentiation candidates
  outputs:
    - scored differentiator candidates
    - 2 chosen differentiators
    - 2x2 differentiation chart with competitors plotted
    - decision principles list
    - one-page Mini Manifesto
  author: product-on-purpose
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Foundation Sprint Differentiation

Day 1 afternoon of a Foundation Sprint. The team converts the morning's Basics frame (customer, problem, advantage, competitors) into a defensible strategic position. The output is a one-page Mini Manifesto that the team and Decider sign as the Day 1 strategic summary.

Family contract: [`docs/reference/skill-families/foundation-sprint-skills-contract.md`](../../docs/reference/skill-families/foundation-sprint-skills-contract.md). This skill is a member of `foundation-sprint-skills`.

## When to Use

- Day 1 afternoon of a Foundation Sprint, immediately after lunch.
- The Basics bundled artifact is signed by the Decider; the customer, problem, advantage, and competitor map are committed.
- The team is ready to commit to a strategic position the product will occupy.

## When NOT to Use

- Basics is unresolved or under negotiation. Differentiation depends on a stable input frame.
- The team has already pre-chosen differentiators and just wants ratification. The skill is built for genuine decision-making; ratification theater wastes the afternoon.
- The team has lost the room: low energy, no Decider, time pressure. Postpone or split into shorter blocks rather than rush.
- This is a follow-up sprint and the existing differentiation still holds. Use Magic Lenses directly with the existing position.

## What This Skill Produces

A single bundled artifact with five sections:

1. **Scored differentiator candidates**: a table of 8-15 candidate differentiators scored on three customer-perceived dimensions (customer pull, team can deliver, hard to copy). The top scorers advance to the 2x2 chart.
2. **Two chosen differentiators**: the two the team commits to as the strategic position.
3. **2x2 differentiation chart**: a customer-perceived chart plotting the chosen differentiators against the competitor set from Basics. The team's product position is named.
4. **Decision principles**: 3-5 principles operationalizing the differentiation. Each principle is a future-product rule ("we will always prefer X over Y").
5. **Mini Manifesto**: a one-page strategic summary written in the team's voice, naming the customer, problem, position, and what the product is NOT.

See `references/TEMPLATE.md` for the canonical structure and `references/EXAMPLE.md` for the Brainshelf example.

## Sequence (150 minutes)

### Step 1: Generate differentiator candidates (15-25 min)

Each team member produces 3-5 candidate differentiators silently. Cluster duplicates, then surface the full set (8-15 candidates is typical). The candidates can be classic (speed, price, simplicity, breadth, depth, trust) or custom (specific to this product or market).

### Step 2: Score candidates (25-40 min)

Score each candidate on three dimensions, 1-5 scale:

- **Customer pull**: would this customer-perceived dimension actually drive a switch?
- **Team can deliver**: can this team build and operate at this dimension competitively?
- **Hard to copy**: how durable is the advantage if a competitor pivots?

Sum the three for a rough score. Top 5-7 candidates advance.

### Step 3: Choose two differentiators (30-45 min via note-and-vote)

The team narrows to two differentiators through `tool-note-and-vote`. The two MUST be observable to the customer (not internal-team values) and deliverable by the team (not aspirational). The Decider supervotes if scoring produces a tie or the team is split.

### Step 4: Plot the 2x2 chart (15-25 min)

Place the two differentiators as the chart axes. Plot the competitor set from Basics (including "do nothing"). Position the product where it can occupy unoccupied space. If the unoccupied position is too far from where competitors cluster, the team may be drifting into a niche that customers don't recognize; if the position overlaps with a strong competitor, the differentiation is not strong enough.

### Step 5: Write decision principles (20-30 min)

Convert the two differentiators into 3-5 operational principles. Examples:

- "Capture is the first-class action. Every other feature waits behind a fast capture path."
- "Private by default. Sharing is opt-in."
- "Surface what's relevant when it matters. Not on a notification schedule."

Principles are NOT marketing copy. They are decision-making rules for future product calls.

### Step 6: Mini Manifesto (15-25 min)

The Decider drafts a one-page Mini Manifesto in the team's voice. Tone is plain, declarative, and direct about what the product is NOT (this is the part teams skip and shouldn't).

## Inference Inputs

| Input | What the skill does with it |
|---|---|
| Basics bundled artifact | Reads target customer (for "customer-perceived" check), problem (for "would this differentiator solve the problem"), advantages (for "can the team deliver"), and competitor map (for chart plotting) |
| Differentiation candidates | If pre-supplied, pre-populates the silent ideation board; otherwise the team generates them in Step 1 |

## Common Pitfalls

- **Marketing-claim differentiators the product cannot deliver.** "Best in class," "AI-powered," "delightful" are not differentiators; they are aspirations. The skill rejects these and prompts for evidence the team can deliver.
- **Differentiators that are not customer-perceived.** "Beautifully architected code" matters to engineers, not customers. The skill enforces a "would a customer notice this in 30 seconds?" check.
- **Generic decision principles.** "Simple" and "fast" do not operationalize anything. Principles must be actionable: "we will choose X over Y."
- **Treating chart, principles, and manifesto as separable artifacts.** The chart positions the product; the principles operationalize the position; the manifesto communicates it. Without coherence, the Day 1 PM output is a pile of decks rather than a strategic summary.
- **Skipping the Mini Manifesto.** Many teams stop after the chart. The manifesto matters because it forces the team to write what the product IS NOT, which is the test of whether the differentiation is real.

## Decider Role

The Decider's responsibilities during Differentiation:

1. Confirm Basics is signed before this skill begins.
2. Listen during scoring without telegraphing preferences.
3. Supervote the two committed differentiators with rationale if the team is split.
4. Author or co-author the Mini Manifesto (it carries the Decider's voice).
5. Sign off on the bundled artifact before Day 1 ends.

## Canonical Sources

- Character Capital. "Foundation Sprint guide." Differentiation agenda and Mini Manifesto framing.
- Knapp, J., and Zeratsky, J. *Click*. Day 1 afternoon sequence and differentiation discipline.
- Knapp, J., and Zeratsky, J. "Introducing the Foundation Sprint." Lenny's Newsletter. Differentiation section and chart logic.

## Cross-Skill Usage

Prerequisites: `tool-foundation-sprint-basics`. The Basics bundled artifact is the load-bearing input.

The skill invokes `tool-note-and-vote` at least once (to choose the two differentiators). Additional note-and-vote invocations may happen for the principles list if the team is split.

Next invocation: `tool-foundation-sprint-approach-options` on Day 2 morning. The chosen differentiators and the decision principles constrain which approach options are in-scope.

## Decider Checkpoint

This skill ends with a Decider Checkpoint in `references/TEMPLATE.md`. The Decider signs off on the two differentiators, the 2x2 position, the principles, and the Mini Manifesto as the Day 1 strategic summary. Without sign-off, Day 2 starts on an unstable strategic foundation.
