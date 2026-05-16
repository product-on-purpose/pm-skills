---
name: tool-design-sprint-map-and-target
description: Day 1 (Monday) move of a Design Sprint that produces the bundled Monday artifact containing long-term goal, sprint questions (3-7 testable risks), customer or system map (5-15 step flow), expert interview notes, HMW (How Might We) cluster board, and the Decider's chosen target moment. Use Day 1 morning and afternoon after the sprint brief is locked. Sets the design target for Tuesday's sketches and Wednesday's storyboard.
classification: tool
version: "0.1.0"
updated: 2026-05-15
license: Apache-2.0
metadata:
  tool: design-sprint
  move: map-and-target
  category: discovery
  frameworks:
    - design-sprint
    - sprint
    - character-note-and-vote
  timebox_minutes: 105
  roles:
    - facilitator
    - decider
    - pm
    - design
    - engineering
    - researcher
    - customer-expert
  prerequisites:
    - tool-design-sprint-brief
  inputs:
    - sprint brief
    - existing research
    - analytics
    - customer examples
    - expert interview transcripts (run during Monday)
  outputs:
    - long-term goal
    - sprint questions
    - customer or system map
    - expert interview notes
    - HMW cluster board
    - target moment
  author: product-on-purpose
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Design Sprint Map and Target (Monday)

Produce Monday's bundled artifact: the long-term goal that names success in 1-5 years; 3-7 sprint questions converting team fears into testable risks; a 5-15 step customer or system map from key player to outcome; expert interview notes from cameo experts run in parallel; HMW (How Might We) clusters synthesized from the team; and the Decider's chosen target moment. Monday's output becomes Tuesday's design target.

Family contract: [`docs/reference/skill-families/design-sprint-skills-contract.md`](../../docs/reference/skill-families/design-sprint-skills-contract.md). This skill is a member of `design-sprint-skills`.

## When to Use

- It is Day 1 of the Design Sprint and the brief is locked (via `tool-design-sprint-brief`).
- The team is together (in-person, remote, or hybrid) for the full Monday workshop.
- Expert interviews are scheduled for Monday afternoon (cameo role; 15-30 minutes each).
- The team needs to converge from "five days of work ahead" to "this specific target moment is what we're prototyping."

## When NOT to Use

- The brief is not locked. Return to `tool-design-sprint-brief`; without sprint questions, this skill has nothing to converge toward.
- The challenge is so broad that "long-term goal" would be longer than 5 years. Return to problem framing.
- The team is missing the Decider. The target-moment selection at the end of Monday is the Decider's call; without that call the team disperses Tuesday with no agreed direction.
- The team has already pre-decided the target moment. Monday's value is in the convergence; if it's been pre-decided, Monday becomes ratification theater.

## What This Skill Produces

A single bundled artifact with six sections:

1. **Long-term goal**: one sentence naming success in 1-5 years. Aspirational; cannot be hit in this sprint, but should be visible from the target moment.
2. **Sprint questions**: 3-7 questions converting team fears into testable risks. Phrased as "Can we... ?" or "Will... ?" or "How... ?"; NOT phrased as solutions.
3. **Customer or system map**: 5-15 step flow from key player(s) at the left to outcome (long-term goal) at the right. Includes major actors, decision points, and current alternatives.
4. **Expert interview notes**: synthesized observations from 2-4 cameo experts interviewed Monday afternoon. Surfaced as HMW candidates for the cluster board.
5. **HMW cluster board**: 30-100+ How Might We notes from the team, clustered into 4-8 themes; voted with `tool-note-and-vote` heat-map mechanic to surface top clusters.
6. **Target moment**: the single point on the map (or a tight cluster of points) the Decider picks as the prototyping target. Wednesday's storyboard begins from here.

See `references/TEMPLATE.md` for the canonical structure and `references/EXAMPLE.md` for the Brainshelf book-catalog Monday artifact.

## Inference Inputs

| Input | What the skill does with it |
|---|---|
| Sprint brief (from `tool-design-sprint-brief`) | Pulls the locked sprint questions as seed for refinement; pulls the challenge statement as the long-term goal seed; pulls the team roster for role assignments in note-and-vote |
| Existing research | Used to draft the customer or system map; researcher walks the team through key findings during the map step |
| Analytics | Quantitative grounding for the map's decision-point branch points and abandonment moments |
| Customer examples | Concrete stories used to validate the map's key player and surface map-step gaps |
| Expert interview transcripts (run during Monday) | Synthesized into HMW candidates by the moderator (typically PM or researcher) during the afternoon |

## Monday Time Structure

The full Monday workshop is approximately 7 hours (09:00-12:30 + 13:30-17:00). The skill's bundled artifact emerges across the day:

- **09:00-09:30**: Welcome + brief recap + introductions (does not produce artifact content)
- **09:30-10:30**: Long-term goal (one sentence) + draft sprint questions (3-7)
- **10:30-12:30**: Customer or system map draft (continuous-flow whiteboard work; team builds together)
- **12:30-13:30**: Lunch + first expert interview slot (cameo)
- **13:30-15:30**: Remaining expert interviews (3 slots; 25 min each); team captures HMWs continuously during interviews
- **15:30-16:30**: HMW cluster board synthesis; team adds final HMWs; Facilitator clusters; team heat-map votes via `tool-note-and-vote`
- **16:30-17:00**: Decider picks target moment; signs off; team disperses for Tuesday sketches

This skill's 105-minute timebox covers the facilitated synthesis sections (long-term goal + sprint questions + map draft + HMW clustering + target selection). Expert interviews and silent map-extension work happen in parallel and are not counted in the timebox.

## Common Pitfalls

- **Long-term goal too short.** "Ship Brainshelf MVP by Q3" is a roadmap goal, not a long-term goal. The long-term goal is 1-5 years out and aspirational ("Become the default way 25+/year readers remember and recall books").
- **Sprint questions phrased as solutions.** "Build the camera-capture flow" is a solution; "Can we get sub-3-second capture without abandonment?" is a sprint question. The team must convert fears into questions, not predetermined answers.
- **Map too detailed.** 5-15 steps, not 50. The map is for Decider orientation, not engineering documentation. If the map balloons, the Facilitator forces compression.
- **Skipping HMW because "we already know the opportunities."** HMW's value is divergent surfacing followed by convergent voting. Pre-deciding the opportunities skips both halves.
- **Decider absent at target-moment selection.** The whole point of Monday is the Decider's target choice. If the Decider must leave early, target selection must happen before they leave, even if HMW clustering compresses.
- **Expert interviews skipped or run by the wrong person.** Experts bring outside context the team can't generate internally. Skipping them produces an inward-looking Monday. Running them as group calls (instead of small cameo conversations) wastes expert time and produces less useful HMW input.

## Cross-Skill Usage

Prerequisites: `tool-design-sprint-brief`. Map-and-Target consumes the locked sprint brief and refines the sprint questions during the morning. Without a brief, this skill has no convergence target.

This skill invokes `tool-note-and-vote` twice during the day: once for HMW cluster heat-map voting (anonymous dot-voting to surface top 4-8 clusters) and optionally once for target-moment supervote when the Decider wants team input before deciding. The Decider's call is final regardless of team vote distribution.

Next invocation in the sprint: `tool-design-sprint-sketch` Tuesday morning.

## Canonical Sources

- Knapp, J., Zeratsky, J., and Kowitz, B. *Sprint*. Simon and Schuster, 2016. Monday chapter (Chapters 4-7).
- GV Design Sprint Guide. "Sprint Week Monday." https://www.gv.com/sprint/
- Character Capital. "Design Sprint Day 1." https://www.character.vc
- Google Design Sprint Kit. "Monday agenda template." https://designsprintkit.withgoogle.com/

## Decider Checkpoint

This skill ends with a Decider Checkpoint in `references/TEMPLATE.md`. The Decider's call at the end of Monday is target-moment selection: a single point (or tight cluster of points) on the customer or system map that becomes Tuesday's design target. Without that selection, Tuesday's sketches diverge with no shared direction. The Decider also confirms the long-term goal, the sprint questions, and the top HMW clusters; these become Wednesday's heat-map orientation.
