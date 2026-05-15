---
name: tool-foundation-sprint-brief
description: Pre-sprint brief that locks scope, the decision the sprint must unlock, team and role assignments, logistics, inputs to bring, and success criteria before Day 1 of a Foundation Sprint. Use after the readiness verdict is Go and before the sprint begins. Produces a one-page artifact the team and Decider sign off on as the contract for the next two days.
classification: tool
version: "0.1.0"
updated: 2026-05-14
license: Apache-2.0
metadata:
  tool: foundation-sprint
  move: brief
  category: coordination
  frameworks:
    - foundation-sprint
    - click
  timebox_minutes: 60
  roles:
    - facilitator
    - pm
    - decider
  prerequisites:
    - tool-foundation-sprint-readiness
  inputs:
    - readiness verdict and recommendations
    - initiative description
    - team roster
    - logistics constraints
  outputs:
    - initiative statement and stakes
    - decision the sprint must unlock
    - team roster with role assignments
    - logistics plan
    - existing inputs to bring
    - readiness reaffirmation
  author: product-on-purpose
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Foundation Sprint Brief

Produce the one-page brief that aligns the team on scope, decision target, participants, logistics, and success criteria before Day 1 begins. A well-built brief prevents Day 1 from opening with re-litigation of why-are-we-here; a missing or vague brief almost guarantees it.

Family contract: [`docs/reference/skill-families/foundation-sprint-skills-contract.md`](../../docs/reference/skill-families/foundation-sprint-skills-contract.md). This skill is a member of `foundation-sprint-skills`.

## When to Use

- The readiness verdict from `tool-foundation-sprint-readiness` is Go (or Conditional Go with preconditions cleared).
- The sprint has dates blocked on calendars and you need the artifact that names what the sprint is for.
- The team has prep activities scheduled and you need a written reference for what to bring.
- A skeptical exec wants to know "what is the team doing for two days?" and you need an answer that fits on one page.

## When NOT to Use

- The sprint has already started. The brief is a prep artifact, not an in-sprint deliverable. If Day 1 is happening, run `tool-foundation-sprint-basics` instead.
- The readiness verdict is Wait. The brief cannot fix an unready team; close the preconditions first, then re-run readiness, then invoke this skill.
- The team wants a strategy document. The brief is internal prep, not a stakeholder deliverable. If a stakeholder document is needed, that is a downstream artifact.
- The brief threatens to become a multi-page strategic document. Stop and reframe: the canonical brief is one page.

## What This Skill Produces

A single bundled artifact with six sections:

1. **Initiative statement and stakes**: one paragraph naming what the team is sprinting on and why a wrong direction would be costly.
2. **Decision the sprint must unlock**: the open strategic question the sprint resolves. Single sentence.
3. **Team roster with role assignments**: who is in the room and what role each person plays per section of the sprint.
4. **Logistics plan**: dates, hours, location, format (in-person, remote, hybrid), tools, daily rhythm.
5. **Existing inputs to bring**: the research, customer examples, competitor notes, metrics, and constraints the team should reference during the sprint.
6. **Readiness reaffirmation**: a final check that the Go verdict from `tool-foundation-sprint-readiness` still holds.

See `references/TEMPLATE.md` for the canonical structure and `references/EXAMPLE.md` for the Brainshelf book-catalog brief.

## Inference Inputs

| Input | What the skill does with it |
|---|---|
| Readiness verdict and recommendations (from `tool-foundation-sprint-readiness`) | Pulls the recommended attendees, preconditions, and pre-sprint activities into the brief; flags any precondition that has not been closed |
| Initiative description | Compresses into one paragraph for the Initiative Statement section |
| Team roster | Maps people to the required Foundation Sprint roles (Decider, Facilitator, PM, Design, Engineering, Customer Expert) |
| Logistics constraints | Produces the dates/hours/location/format/tools matrix; flags any constraint that would force the sprint to extend beyond two days |
| (Optional) Skeptical-exec talking points | Tightens the Stakes paragraph to address why-now and why-this concerns |

## Brief Length Discipline

The brief MUST fit on one page (or one screen). The skill enforces this through structural choices, not raw character counts:

- Initiative Statement: one paragraph, four sentences maximum.
- Decision the sprint must unlock: one sentence.
- Team Roster: table with one row per person.
- Logistics: table.
- Inputs to Bring: bulleted list, five items maximum.
- Readiness Reaffirmation: checklist.

If the brief expands beyond this scope, the sprint is being over-engineered before it starts. The fix is not a longer brief; the fix is a clearer decision target.

## Common Pitfalls

- **Over-engineering the brief.** The brief is a prep artifact, not a strategy doc. If it has an executive summary, an appendix, or a "background" section longer than one paragraph, it has drifted.
- **Treating the brief as a deliverable to stakeholders.** Stakeholders do not read the brief; they read the Founding Hypothesis at the end. The brief is for the team. Sharing it publicly invites pre-sprint debate, which the sprint is supposed to resolve.
- **Vague decision target.** "We will figure out our strategy" is not a decision. "We will commit to a top bet between [option A] and [option B]" is.
- **Logistics drift.** "We'll figure out dates" or "we'll meet hybrid sometimes" telegraphs that the team has not actually committed to the sprint. Either dates and format are locked, or the readiness verdict was wrong.
- **Skipping readiness reaffirmation.** The readiness verdict was a snapshot. If a precondition has slipped or the Decider's availability has changed since readiness, the brief needs to surface that, not paper over it.

## Canonical Sources

- Character Capital. "Foundation Sprint guide." Section on pre-sprint preparation and team scoping.
- Knapp, J., and Zeratsky, J. *Click: How to Make What People Want*. Pre-sprint prep recommendations.
- pm-skills `foundation-meeting-brief` precedent: brief-structure pattern adapted for the strategic context of a Foundation Sprint rather than a meeting.

## Cross-Skill Usage

Prerequisites: `tool-foundation-sprint-readiness`. The brief expects the readiness output as its primary input. When `prerequisites` is honored, the brief inherits the readiness verdict, attendee recommendations, and pre-sprint activities; the skill then refines and commits them.

If the team has done equivalent prep without running the readiness skill explicitly (e.g., experienced sprint facilitator who knows the readiness criteria), the brief skill can be invoked directly. In that case, the skill body prompts the team to confirm the readiness criteria are met before generating the brief.

Next invocation in the sprint: `tool-foundation-sprint-basics` on Day 1 morning.

## Decider Checkpoint

This skill ends with a Decider Checkpoint in `references/TEMPLATE.md`. The Decider signs off on scope (the decision target), team (the roster and role assignments), success criteria (what makes the sprint successful or not), and the explicit tradeoff that the sprint will force a top bet rather than preserve all directions. Without sign-off, the brief is advisory; with sign-off, it is the contract for the next two days.
