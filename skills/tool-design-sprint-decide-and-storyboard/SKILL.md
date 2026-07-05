---
name: tool-design-sprint-decide-and-storyboard
description: Day 3 (Wednesday) move of a Design Sprint that runs the art museum layout, heat map, speed critique, straw poll, Decider supervote, rumble-vs-all-in-one decision, and the storyboard that drives Thursday's prototype build. The most decision-heavy day of the sprint. Use Wednesday morning and afternoon after Tuesday's sketches are collected and attribution-stripped. Produces the canonical 5-15 step storyboard that becomes the build spec.
license: Apache-2.0
metadata:
  classification: tool
  version: "1.0.0"
  updated: 2026-07-04
  tool: design-sprint
  move: decide-and-storyboard
  category: decision
  frameworks:
    - design-sprint
    - sprint
    - character-note-and-vote
  timebox_minutes: 210
  roles:
    - facilitator
    - decider
    - pm
    - design
    - engineering
    - researcher
  prerequisites:
    - tool-design-sprint-sketch
  inputs:
    - all solution sketches (from Tuesday)
    - map and target (for storyboard framing)
  outputs:
    - art museum layout
    - heat map
    - speed critique notes per sketch
    - straw poll results
    - supervote (Decider's choice)
    - rumble vs all-in-one decision
    - storyboard (5-15 step)
  author: product-on-purpose
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Design Sprint Decide and Storyboard (Wednesday)

Wednesday is the most decision-heavy day of the Design Sprint. The skill runs the art museum layout (sketches posted anonymously on the wall), heat map (silent dot-vote stickers on promising parts), speed critique (3 minutes per sketch summarizing what the team sees), straw poll (each team member's top choice), and the Decider's supervote (the call that triggers the storyboard). Then the team decides whether to rumble (storyboard two sketches as competing prototypes) or all-in-one (storyboard one). The day ends with a 5-15 step storyboard that drives Thursday's build.

Family contract: [`docs/reference/skill-families/design-sprint-skills-contract.md`](../../docs/reference/skill-families/design-sprint-skills-contract.md). This skill is a member of `design-sprint-skills`.

## When to Use

- It is Day 3 of the Design Sprint and Tuesday's sketches are collected, attribution-stripped, and uploaded to the shared workspace.
- The Decider is present for the full morning (heat map plus critique plus straw poll plus supervote happen 09:00-12:30 canonically).
- The team has accepted that the supervote is the Decider's call, not a consensus average.
- Thursday's prototype build needs a storyboard by Wednesday end-of-day or the build cannot start clean Thursday morning.

## When NOT to Use

- Tuesday is not closed. Return to `tool-design-sprint-sketch`; without independent sketches, the heat-map is meaningless.
- Sketcher attribution leaked into Wednesday morning. The Facilitator must re-strip before the heat-map begins; voting on sketchers contaminates the day.
- The Decider is absent. Wednesday's supervote cannot be delegated; without the Decider, the day produces a recommendation, not a decision.
- The team is treating the supervote as advisory. The supervote is the call. Re-litigating it Thursday morning is sprint failure.

## What This Skill Produces

A single bundled artifact with seven sections:

1. **Art museum layout**: how sketches are arranged for viewing (typically wall or shared Figma board); attribution stripped; sketches labeled A / B / C / D / etc. in randomized order.
2. **Heat map**: silent dot-vote stickers (typically 3 small dots per voter) placed on the most compelling PARTS of any sketch; voters can stack dots on the same element.
3. **Speed critique notes**: 3-minute structured walkthrough per sketch by the Facilitator (or rotated team member) summarizing what the team sees; the sketcher does NOT explain their own sketch; concerns are captured as "what would worry me" notes.
4. **Straw poll results**: each team member places one larger sticker (typically 1 large dot per voter) on the sketch they would pick if it were their call. Non-binding; informs the Decider.
5. **Supervote**: the Decider places their supervote sticker (typically 3 large dots or a distinctively-colored sticker). The supervote is the decision. The Decider can place multiple supervotes on different sketches if running a rumble.
6. **Rumble vs all-in-one decision**: the Decider chooses to storyboard one sketch (all-in-one; default) or two sketches as competing prototypes (rumble; chosen when the supervotes split clearly across two distinct approaches).
7. **Storyboard**: 5-15 step storyboard derived from the supervoted sketch(es); each panel shows what the customer sees and what they do; specific enough that Thursday's build can begin without re-debating the design.

See `references/TEMPLATE.md` for the canonical structure and `references/EXAMPLE.md` for the Brainshelf book-catalog Wednesday artifact.

## Wednesday Time Structure

The full Wednesday workshop is approximately 7 hours (09:00-12:30 + 13:30-17:00). The skill's bundled artifact emerges across the day:

- **09:00-09:15**: Welcome + Tuesday recap + Wednesday agenda
- **09:15-09:30**: Art museum setup; Facilitator confirms sketches are attribution-stripped and labeled A/B/C/D
- **09:30-09:45**: Heat map (silent; 15 minutes; team places dot stickers on compelling parts)
- **09:45-10:45**: Speed critique (3 min per sketch; sketchers silent during their own sketch's critique)
- **10:45-11:00**: Break
- **11:00-11:15**: Straw poll (silent; each person places 1 large dot on their pick)
- **11:15-11:30**: Decider's supervote and rumble vs all-in-one call
- **11:30-12:30**: Storyboard framing (which panels matter most; which map steps to cover; storyboard scope)
- **12:30-13:30**: Lunch
- **13:30-16:30**: Storyboard build (Facilitator drives; team contributes panel content; storyboard reaches 5-15 panels)
- **16:30-17:00**: Day-end review; Thursday build kickoff prep (who builds, who supports, what tools, what gets prebuilt overnight)

This skill's 210-minute timebox covers the Facilitator-led portions (heat map setup, critique, straw poll, supervote, storyboard build).

## Common Pitfalls

- **Consensus drift instead of Decider supervote.** The most common failure: the team votes, the Facilitator averages, and the Decider rubber-stamps the average. The Decider's call is the Decider's call; the straw poll is input, not result.
- **Storyboard too vague.** "User captures a book" is not a storyboard panel; "user opens camera surface, points at book held at arm's length, sees recognized cover appear in bottom card within 1.5 seconds, taps the card to commit" is. Vague storyboards force Thursday's builders to re-debate design.
- **Skipping critique to save time.** Critique surfaces concerns the storyboard must address. Skipping it produces a storyboard that hits Thursday and immediately re-surfaces every concern that should have been addressed Wednesday.
- **Sketcher explaining their own sketch.** During critique, the sketcher is silent. The point is to test whether the sketch communicates without the artist. If the team can't read the sketch, that's data, not a bug.
- **Rumble chosen when all-in-one was right (or vice versa).** Rumble is appropriate when 2 distinct supervoted approaches are both worth testing AND the team has Thursday capacity to build 2 prototypes. Default is all-in-one. Rumble is exception, not norm.
- **Storyboard scope too broad.** 5-15 panels, not 50. The storyboard covers the target moment (from Monday) plus 1-2 panels of setup and 1-2 panels of outcome; it does NOT cover the full product.

## Cross-Skill Usage

Prerequisites: `tool-design-sprint-sketch`. Decide and Storyboard consumes Tuesday's sketches as input. Without independent sketches, this skill has no material to heat-map.

This skill invokes `tool-note-and-vote` twice during the morning: once for the heat-map (small-dot voting) and once for the straw poll (large-dot voting). The supervote itself is the Decider's call after seeing both vote distributions; it does NOT delegate to note-and-vote.

Next invocation in the sprint: `tool-design-sprint-prototype-plan` Thursday morning.

## Canonical Sources

- Knapp, J., Zeratsky, J., and Kowitz, B. *Sprint*. Simon and Schuster, 2016. Wednesday chapter (Chapters 11-13).
- GV Design Sprint Guide. "Sprint Week Wednesday." https://www.gv.com/sprint/
- Character Capital. "Design Sprint Day 3." https://www.character.vc
- Google Design Sprint Kit. "Wednesday agenda template + storyboard worksheet." https://designsprintkit.withgoogle.com/

## Decider Checkpoint

This skill ends with a Decider Checkpoint in `references/TEMPLATE.md`. The Decider's supervote earlier in the day is the substantive decision; the end-of-day checkpoint confirms the storyboard is build-ready (specific enough; covers the target moment plus setup plus outcome panels; no remaining hand-waving). Without sign-off, Thursday's build begins with ambiguity and Friday's test risks being a test of the wrong artifact.
