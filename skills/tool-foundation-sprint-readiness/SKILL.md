---
name: tool-foundation-sprint-readiness
description: Pre-sprint diagnostic that determines whether a team should run a Foundation Sprint now, postpone it, or do prerequisite work first. Produces a Go / Conditional Go / Wait verdict with diagnosis, recommended preconditions, attendee list, and pre-sprint activities. Use when a team is considering starting a Foundation Sprint and wants a fast yes/no diagnosis before committing two days of facilitated work.
license: Apache-2.0
metadata:
  classification: tool
  version: "0.1.0"
  updated: 2026-05-14
  tool: foundation-sprint
  move: readiness
  category: coordination
  frameworks:
    - foundation-sprint
    - click
    - character-note-and-vote
  timebox_minutes: 45
  roles:
    - facilitator
    - pm
    - decider
  prerequisites: []
  inputs:
    - initiative description
    - team composition draft
    - decider name and availability
    - existing customer or market knowledge level
  outputs:
    - readiness verdict
    - diagnosis
    - recommended preconditions
    - recommended attendee list
    - pre-sprint activities
  author: product-on-purpose
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Foundation Sprint Readiness

Assess whether a Foundation Sprint fits the team's current situation. Most sprints that fail were sprints that should not have been run. A 30-45 minute readiness diagnostic catches that failure mode before two days of facilitated work are spent.

Family contract: [`docs/reference/skill-families/foundation-sprint-skills-contract.md`](../../docs/reference/skill-families/foundation-sprint-skills-contract.md). This skill is a member of `foundation-sprint-skills` and conforms to the family frontmatter and Decider Checkpoint requirements.

## When to Use

- A team is considering starting a Foundation Sprint and needs a fast diagnosis before committing two days.
- A founder or PM has a "should we run a Foundation Sprint?" question and wants structured input rather than a vibes check.
- An existing sprint commitment is on the calendar and the team wants to validate that prerequisites are in place.
- Re-running a Foundation Sprint after invalidated assumptions: use to confirm new context is ready.

## When NOT to Use

- The team has already decided to run the sprint and just needs the brief. Use `tool-foundation-sprint-brief` instead.
- The team needs deep customer discovery: run customer research or problem framing first; the Foundation Sprint depends on existing customer knowledge.
- The decision is small and a full Foundation Sprint is overkill. Use a lighter prioritization or decision tool.
- No Decider is available and one cannot be appointed. Foundation Sprint requires fast strategic calls; without authority it produces options without commitment.

## What This Skill Produces

A single bundled artifact with five sections:

1. **Readiness verdict**: Go / Conditional Go / Wait
2. **Diagnosis**: what is in place, what is missing, what is uncertain
3. **Recommended preconditions** (when verdict is Wait or Conditional Go): the prerequisite work the team should do before the sprint
4. **Recommended attendee list** (when verdict is Go or Conditional Go): the 3-5 people who should be in the room, with role expectations
5. **Pre-sprint activities** (when verdict is Go): the prep work to complete in the days before Day 1

See `references/TEMPLATE.md` for the canonical structure and `references/EXAMPLE.md` for a worked example using the Brainshelf book-catalog thread.

## Inference Inputs

The skill runs an inference pass over these inputs to produce the verdict:

| Input | What the skill does with it |
|---|---|
| Initiative description | Determines whether a Foundation Sprint is the right tool (vs problem framing, customer research, or a Design Sprint) |
| Team composition draft | Checks roster against the Foundation Sprint role requirements; flags missing roles |
| Decider name and availability | Confirms Decider can attend both days; flags partial availability as Conditional Go risk |
| Existing customer/market knowledge level (self-assessed 1-10) | Below 5 indicates deep discovery is needed first; 5-7 indicates Conditional Go with research prep; 8+ indicates Go |
| (Optional) Existing competitor and alternative knowledge | Flags gaps that can be closed by overnight prep |
| (Optional) Logistics constraints | Confirms two days can actually be cleared |

If a load-bearing input is missing or low-confidence, the skill flags it explicitly and proposes how to close the gap before the sprint.

## Readiness Criteria (8 Canonical Checks)

The skill evaluates the team against these eight criteria, drawn from Knapp/Zeratsky (Click) and Character Capital's Foundation Sprint guide:

1. **Initiative is named and concrete.** The team can name the project, product area, or strategic question.
2. **The stakes are meaningful.** A wrong starting direction would be costly.
3. **The team has existing knowledge.** Real customer, market, competitor, or domain context to make informed choices.
4. **The Decider is available.** Strategic calls can be made during the sprint.
5. **The team is small enough.** No more than five core decision participants is preferred.
6. **Inputs are collected.** Existing research, customer examples, competitor notes, metrics are ready.
7. **The output has a path to testing.** The team can use a Design Sprint, experiment, customer research, or another validation method afterward.
8. **The organization tolerates explicit tradeoffs.** Foundation Sprint forces choosing a top bet and a backup, not preserving every possibility.

| Pattern | Verdict |
|---|---|
| All 8 criteria met cleanly | **Go** |
| 1-2 criteria are "yellow flags" but addressable in evening prep | **Conditional Go** with documented prep |
| 3 or more criteria fail, or any of 1-4 is a hard fail | **Wait** with recommended prerequisite work |

Treat the criteria as load-bearing, not a checklist to game. A team that papers over a real gap with "yes, technically" should get a Conditional Go with the gap surfaced.

## Common Pitfalls

- **Skipping the diagnostic because "we're going to run it anyway."** This is the most common cause of failed sprints. The diagnostic costs 45 minutes; the failed sprint costs 16 hours of team time plus opportunity cost.
- **Treating Conditional Go as Go without doing the prep.** Conditional Go means "Go after closing these gaps." If the gaps are not closed by Day 1 morning, the sprint enters the failure mode the diagnostic was meant to prevent.
- **Confusing readiness assessment with problem framing.** This skill assesses whether to run a Foundation Sprint, not whether the team has the right problem. If the problem is unclear, the verdict is Wait with "do problem framing first" as the precondition.
- **No Decider, no sprint.** A team with no Decider available is not ready, full stop. Appointing a "Decider for the day" who lacks real authority does not solve this.
- **Cargo-cult readiness.** Reading the criteria and answering yes to all eight without checking does not produce readiness. The skill's value is in the honest diagnosis.

## Canonical Sources

- Knapp, J., and Zeratsky, J. *Click: How to Make What People Want*. Foundation Sprint readiness guidance.
- Character Capital. "Foundation Sprint guide." https://www.character.vc/guide/foundation-sprint
- Design Sprint Academy. "Foundation Sprint readiness criteria for enterprise." Used for the enterprise-context adjustments to canonical readiness.

## Cross-Skill Usage

This skill is the entry point of the foundation-sprint-skills family. It has no prerequisites (the `metadata.prerequisites` field is intentionally empty).

When the verdict is Go, the natural next invocation is `tool-foundation-sprint-brief` to set up the sprint logistics. When the verdict is Wait, the team typically does prerequisite work (problem framing, customer research) before re-invoking this skill.

`tool-note-and-vote` may be invoked once during the readiness conversation if the team disagrees on whether a Foundation Sprint is the right tool. In practice, this is rare; the diagnostic is usually conclusive.

## Decider Checkpoint

This skill ends with a Decider Checkpoint in `references/TEMPLATE.md`. The Decider signs off on the verdict (Go / Conditional Go / Wait) and explicitly accepts the diagnosis. Without Decider sign-off, the verdict is advisory; with sign-off, it is the commitment that triggers (or postpones) the sprint.
