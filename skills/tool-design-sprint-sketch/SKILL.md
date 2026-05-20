---
name: tool-design-sprint-sketch
description: Day 2 (Tuesday) move of a Design Sprint that structures lightning demos and the four-step independent solution sketch protocol (Notes, Ideas, Crazy 8s, Solution Sketch). Each team member produces one solution sketch individually; the skill orchestrates the day but does not author the sketches themselves. Use Tuesday morning after Monday's target moment is locked. Output is the lightning demo board, sketch assignments, and the cohort of independent sketches that become Wednesday's heat-map material.
license: Apache-2.0
metadata:
  classification: tool
  version: "0.1.0"
  updated: 2026-05-15
  tool: design-sprint
  move: sketch
  category: discovery
  frameworks:
    - design-sprint
    - sprint
  timebox_minutes: 180
  roles:
    - facilitator
    - decider
    - pm
    - design
    - engineering
    - researcher
    - customer-expert
  prerequisites:
    - tool-design-sprint-map-and-target
  inputs:
    - map and target (from Monday)
    - lightning demo sources (each person brings 3 examples)
    - sketch assignment (divide vs swarm)
  outputs:
    - lightning demo board
    - sketch assignment plan
    - four-step sketches from each team member
    - recruiting tracker update
  author: product-on-purpose
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Design Sprint Sketch (Tuesday)

Structure Tuesday's solo-but-together work. Each team member, working independently and silently, produces lightning demos in the morning and a four-step solution sketch in the afternoon. The skill structures the activity; the humans produce the sketches. Wednesday's heat-map orientation depends on having a cohort of independent sketches that did NOT contaminate each other through group brainstorming.

Family contract: [`docs/reference/skill-families/design-sprint-skills-contract.md`](../../docs/reference/skill-families/design-sprint-skills-contract.md). This skill is a member of `design-sprint-skills`.

## When to Use

- It is Day 2 of the Design Sprint and Monday's Map and Target artifact is signed off.
- Each team member brings at least 3 lightning demo sources (existing products, references, analogies that bear on the challenge).
- The team has accepted the silent-independent-sketching constraint and will NOT lapse into group brainstorming.
- Sketches are due Tuesday end-of-day for Wednesday morning heat-map.

## When NOT to Use

- Monday is not closed. Return to `tool-design-sprint-map-and-target`.
- The team's instinct is to brainstorm as a group. Sprint method explicitly avoids this; if the team will not commit to independent work, the sprint will not produce diverse sketches and the heat-map becomes a popularity contest.
- The sketch step is being treated as the prototype. Sketches are concept exploration on paper or Figma frames, not Thursday's working prototype.
- Sketches are due Tuesday morning. Tuesday is the full day; rushing to lunch produces sketches the team cannot read Wednesday.

## What This Skill Produces

A single bundled artifact with four sections:

1. **Lightning demo board**: each team member presents 3 demos (3 minutes each); the Facilitator extracts the reusable pattern from each demo into a one-line note. Result is a board with 12-21 patterns (4-7 team members x 3 demos).
2. **Sketch assignment plan**: divide (each person sketches a different part of the target moment) or swarm (everyone sketches the same target). Default is swarm for v0.1 Design Sprints; divide is for teams running their second sprint with the same target who want to broaden coverage.
3. **Four-step sketches from each team member**: Notes (20 min reviewing Monday output + lightning demos), Ideas (20 min rough doodles), Crazy 8s (8 minutes, 8 variations of the strongest Idea), Solution Sketch (30-90 min final 3-panel storyboard-style sketch).
4. **Recruiting tracker update**: Riley (or the recruiter) confirms Friday slots; surfaces any cancellations and triggers buffer-slot activation if needed.

See `references/TEMPLATE.md` for the canonical structure and `references/EXAMPLE.md` for the Brainshelf book-catalog Tuesday artifact.

## Tuesday Time Structure

The full Tuesday workshop is approximately 7 hours (09:00-12:30 + 13:30-17:00). The skill's bundled artifact emerges across the day:

- **09:00-09:15**: Welcome + Monday recap + Tuesday agenda
- **09:15-10:45**: Lightning demos (each person 3 demos x 3 min + 1 min Facilitator extraction = ~12 min per person; 4-person team = ~50 min; 7-person team = ~85 min)
- **10:45-11:00**: Break
- **11:00-11:30**: Sketch assignment plan + Notes step (each person silently reviews Monday output and lightning demo board)
- **11:30-12:30**: Ideas step (each person silently doodles ideas in their notebook or Figma frame)
- **12:30-13:30**: Lunch + (in parallel) recruiting tracker check-in
- **13:30-13:40**: Crazy 8s (8 minutes, 8 variations of strongest Idea)
- **13:40-15:30**: Solution Sketch (final 3-panel sketch; everyone silent; Facilitator times)
- **15:30-15:45**: Break
- **15:45-16:30**: Sketches collected + named + photographed for Wednesday board; sketcher attribution hidden (Wednesday's heat-map is blind)
- **16:30-17:00**: Day-end check-in; confirm sketches uploaded; confirm Wednesday morning attendance

This skill's 180-minute timebox covers the Facilitator-led portions (lightning demos + assignment + collection). The silent sketch steps (Notes, Ideas, Crazy 8s, Solution Sketch) are individual work and run in parallel; the team is together in the room (or video call) but not collaborating.

## Common Pitfalls

- **Group brainstorming.** The single most common failure mode. The Sprint method explicitly forbids group sketching because it produces sketches that converge on the loudest voice, not the best idea. Facilitator's job is to enforce silence during sketch steps.
- **Sketches not concrete enough.** A solution sketch must be understandable Wednesday morning WITHOUT the artist explaining it. If the heat-map team has to ask "what is this?", the sketch failed the readability bar.
- **Skipping lightning demos.** Lightning demos are not optional warm-up; they inject outside patterns the team would not have generated. Skipping them produces inward-looking sketches.
- **Demo facilitator failing to extract reusable patterns.** Each demo's reusable pattern must be captured (not the whole demo). "Spotify's home screen" is not a pattern; "feed of personalized cards with one-tap action" is.
- **Sketching the prototype.** The solution sketch is a concept; the prototype is Thursday's build. Sketches that try to be the prototype are over-detailed in the wrong dimensions (visual polish, copy) and under-detailed in the right ones (interaction sequence, user reaction).
- **Sketcher attribution leaked into Wednesday heat-map.** Wednesday's heat-map is blind (no sketcher names visible) so the team votes on the sketch, not the sketcher. If sketches arrive on Wednesday with names attached, the Facilitator strips them.

## Cross-Skill Usage

Prerequisites: `tool-design-sprint-map-and-target`. Sketch consumes Monday's target moment as the design target for the four-step sketch protocol. Without a target moment, sketches diverge with no shared direction.

This skill does NOT invoke `tool-note-and-vote`. Tuesday has no voting moment; all voting happens Wednesday after sketches are produced.

Next invocation in the sprint: `tool-design-sprint-decide-and-storyboard` Wednesday morning.

## Canonical Sources

- Knapp, J., Zeratsky, J., and Kowitz, B. *Sprint*. Simon and Schuster, 2016. Tuesday chapter (Chapters 8-10), particularly the four-step sketch protocol (Chapter 9).
- GV Design Sprint Guide. "Sprint Week Tuesday." https://www.gv.com/sprint/
- Character Capital. "Design Sprint Day 2." https://www.character.vc
- Google Design Sprint Kit. "Tuesday agenda template + four-step sketch handout." https://designsprintkit.withgoogle.com/

## Decider Checkpoint

This skill ends with a Decider Checkpoint in `references/TEMPLATE.md`. There is NO mid-day Tuesday decision; the Decider's role Tuesday is to be a sketcher among other sketchers (the Decider sketches independently like everyone else). The end-of-Tuesday Decider Checkpoint is a logistics confirmation: all sketches collected, attribution stripped, Wednesday morning attendance confirmed. The substantive Decider call comes Wednesday morning at the supervote.
