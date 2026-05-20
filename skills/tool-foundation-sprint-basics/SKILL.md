---
name: tool-foundation-sprint-basics
description: Day 1 morning move of a Foundation Sprint. Forces explicit team choices on target customer, important problem, team advantage, and competitors and alternatives. Produces a single coherent strategic frame that becomes the input to Day 1 afternoon Differentiation. Use after the sprint brief is signed and Day 1 morning is scheduled. Bundled artifact, not four separate decisions.
license: Apache-2.0
metadata:
  classification: tool
  version: "0.1.0"
  updated: 2026-05-14
  tool: foundation-sprint
  move: basics
  category: problem-framing
  frameworks:
    - foundation-sprint
    - click
    - character-note-and-vote
  timebox_minutes: 105
  roles:
    - facilitator
    - decider
    - pm
    - customer-expert
  prerequisites:
    - tool-foundation-sprint-brief
  inputs:
    - sprint brief
    - existing customer and market context packet
    - competitor and alternatives knowledge
    - team advantage notes
  outputs:
    - target customer statement
    - important problem statement
    - team advantage inventory
    - competitor and alternative map
    - note-and-vote trace per decision
  author: product-on-purpose
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Foundation Sprint Basics

Day 1 morning of a Foundation Sprint. The team makes four foundational choices explicit: who the product is for, what important problem it solves, why this team has a right to win, and what customers do today instead. The output is one coherent strategic frame, not four separable decisions.

Family contract: [`docs/reference/skill-families/foundation-sprint-skills-contract.md`](../../docs/reference/skill-families/foundation-sprint-skills-contract.md). This skill is a member of `foundation-sprint-skills`.

## When to Use

- Day 1 morning of a Foundation Sprint, after the brief is signed.
- The team has sufficient customer and market knowledge (per readiness verdict) to make informed choices.
- Each of the four sub-decisions is open or contested; the team has not pre-aligned on any of them.
- The Decider is in the room and ready to sign off on the bundled output before lunch.

## When NOT to Use

- The team lacks enough customer knowledge to choose a target customer or name an important problem. Run customer research or problem framing first; revisit when readiness criterion 3 passes.
- The team has already committed to a specific customer-problem pair and just wants to validate it. Use a lighter validation tool; Basics is for genuine decision-making, not ratification theater.
- Day 1 morning has slipped into afternoon. Differentiation depends on Basics being complete; if Basics did not produce a coherent frame by lunch, do not start Differentiation. Reframe or postpone.

## What This Skill Produces

A single bundled artifact with five sections:

1. **Target customer statement**: a specific, named customer with markers (demographic, behavioral, contextual).
2. **Important problem statement**: a customer-perceived pain strong enough to drive switching from alternatives.
3. **Team advantage inventory**: the capabilities, insights, relationships, data, and timing edges that make this team credible against the problem.
4. **Competitor and alternative map**: direct competitors, substitute workflows, manual workarounds, internal tools, and the strongest baseline of all: doing nothing.
5. **Note-and-Vote trace**: a record of how each sub-decision was made, including alternatives considered and Decider rationale.

The artifact is treated as one coherent output, not four separate ones. The team signs off on the bundled frame, not on the components in isolation. See `references/TEMPLATE.md` for the canonical structure and `references/EXAMPLE.md` for the Brainshelf example.

## The Four Sub-Decisions

Each sub-decision uses `tool-note-and-vote` (the silent ideation + voting + Decider supervote protocol). The skill structures the sequence but the decision protocol is the standalone note-and-vote tool.

### 1. Target customer (25-35 minutes)

The team produces 3-7 candidate customer descriptions through silent ideation, then votes, then the Decider supervotes one. The chosen customer MUST be specific (not "SaaS PMs" but "PMs at Series-B SaaS companies between 20 and 100 engineers"). The skill rejects vague segments and prompts the team to add markers until the description names someone the team can recognize.

### 2. Important problem (20-30 minutes)

The team names 3-7 candidate pains the chosen customer experiences. Vote, then Decider supervote. The chosen problem MUST be painful enough to drive switching from current behavior (including doing nothing). Mild annoyances are not Important Problems; the skill enforces this by asking explicitly: "What does the customer currently do, and why would they leave it for our solution?"

### 3. Team advantage inventory (20-30 minutes)

The team enumerates its specific edges: capabilities, insights, relationships, data, technology, distribution, timing. Vote to surface the top 2-3 (multi-vote), Decider confirms. The skill rejects generic advantages ("great team," "passionate") and prompts for specific evidence ("Sam previously built X at Y company"; "Riley has a 12k-member network in our target segment").

### 4. Competitor and alternative map (20-30 minutes)

The team maps the full alternative space: direct competitors, substitute workflows, manual workarounds, internal tools, and "do nothing." For each, the team notes what customers use it for and why people leave (or stay). The skill enforces inclusion of "do nothing" as a competitor; many teams forget that inertia is often the strongest alternative.

## Inference Inputs

| Input | What the skill does with it |
|---|---|
| Sprint brief | Reads the Decision Target to scope which customers and problems are in-scope; out-of-scope candidates are flagged before voting |
| Customer/market context packet | Pre-populates the silent ideation board with previously-surfaced candidates so the team doesn't reinvent them |
| Competitor knowledge | Pre-populates the alternative map with already-known competitors; the team adds and discusses rather than starts cold |
| Team advantage notes | Surfaces the team's existing self-assessment; voting refines and prioritizes |

## Common Pitfalls

- **Vague customer.** "SaaS PMs" or "readers" is not a target customer. The skill prompts for markers until the team can name a specific person archetype.
- **Mild-annoyance problems mistaken for painful ones.** If the customer would not switch from doing nothing or from a paid alternative, the problem is not painful enough. The skill tests this explicitly.
- **Generic team advantages.** "Great engineers" is not an advantage; "Sam built the original Pocket sync engine and knows offline-first patterns" is. The skill rejects unspecific advantages and prompts for evidence.
- **Ignoring "do nothing" as a competitor.** The most common oversight. Many teams skip it because they think of competitors as named products; the skill forces inclusion.
- **Treating the four sub-decisions as separable.** A target customer whose important problem is not solvable by the team's advantage cannot win. The skill ratifies the BUNDLED artifact, not the components; if the components don't cohere, the team revisits.
- **Skipping note-and-vote trace.** The decision moments are load-bearing. Without the trace, Day 1 PM Differentiation begins on a fragile foundation and may end up re-litigating Basics under a different name.

## Decider Role

The Decider's job during Basics is to:

1. Frame each of the four sub-decisions (or approve the facilitator's framing).
2. Listen during silent ideation and vote discussion without dominating.
3. Supervote each sub-decision with explicit rationale when the supervote diverges from the team's top choice.
4. Sign off on the bundled artifact as a coherent strategic frame before Differentiation begins.

A Decider who blesses everything without challenge is not adding value; a Decider who overrides without rationale is not building trust.

## Canonical Sources

- Character Capital. "Foundation Sprint guide." Basics agenda and decision sequence.
- Knapp, J., and Zeratsky, J. *Click*. Day 1 morning sequence.
- Knapp, J., and Zeratsky, J. "Introducing the Foundation Sprint." Lenny's Newsletter. Target customer and important problem framing.

## Cross-Skill Usage

Prerequisites: `tool-foundation-sprint-brief`. The Brief's Decision Target tells the skill which customer-problem space is in-scope.

The skill invokes `tool-note-and-vote` four times (once per sub-decision). Each invocation produces its own decision record; the four traces are aggregated into the bundled artifact.

Next invocation in the sprint: `tool-foundation-sprint-differentiation` on Day 1 afternoon, immediately after lunch.

## Decider Checkpoint

This skill ends with a Decider Checkpoint in `references/TEMPLATE.md`. The Decider signs off on the bundled artifact as a coherent strategic frame, not on the components individually. Without sign-off, Differentiation cannot start cleanly because the inputs are still under negotiation.
