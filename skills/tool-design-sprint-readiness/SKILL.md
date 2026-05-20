---
name: tool-design-sprint-readiness
description: Pre-sprint diagnostic that determines whether a team should run a Design Sprint now, postpone it, or do prerequisite work first. Produces a Go / Conditional Go / Wait verdict with diagnosis, recommended preconditions, attendee list, customer recruiting plan, and pre-sprint activities. Use when a team is considering starting a Design Sprint and wants a fast yes/no diagnosis before committing five days of team time and customer recruiting cost.
license: Apache-2.0
metadata:
  classification: tool
  version: "0.1.0"
  updated: 2026-05-15
  tool: design-sprint
  move: readiness
  category: coordination
  frameworks:
    - design-sprint
    - sprint
    - character-note-and-vote
  timebox_minutes: 45
  roles:
    - facilitator
    - pm
    - decider
  prerequisites: []
  inputs:
    - challenge description
    - existing hypothesis (from Foundation Sprint or other source)
    - customer access status
    - decider availability
    - team composition draft
  outputs:
    - readiness verdict
    - diagnosis
    - recommended preconditions
    - recommended attendee list
    - customer recruiting plan
    - pre-sprint activities
  author: product-on-purpose
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Design Sprint Readiness

Assess whether a Design Sprint fits the team's current situation. Design Sprint failure modes are expensive: five consecutive days of a 4-7 person team, plus customer recruiting cost (typically 5 strangers paid honoraria), plus the prototype build. A 30-45 minute readiness diagnostic catches the failure modes before that commitment is made.

Family contract: [`docs/reference/skill-families/design-sprint-skills-contract.md`](../../docs/reference/skill-families/design-sprint-skills-contract.md). This skill is a member of `design-sprint-skills` and conforms to the family frontmatter and Decider Checkpoint requirements.

## When to Use

- A team is considering starting a Design Sprint and needs a fast diagnosis before committing five days plus customer recruiting effort.
- A team has just completed a Foundation Sprint and is deciding whether the next test should be a Design Sprint, a smaller experiment, or direct build. The Founding Hypothesis is consumed as optional input context (no separate bridge skill artifact is required).
- An existing sprint commitment is on the calendar and the team wants to validate that prerequisites (Decider, customers, prototype medium) are in place.
- Re-running a Design Sprint after an inconclusive first sprint: use to confirm the new challenge framing and customer access are ready.

## When NOT to Use

- The team has already decided to run the sprint and just needs the brief. Use `tool-design-sprint-brief` instead.
- The team has no clear challenge and is still in discovery. Run problem framing or a Foundation Sprint first; a Design Sprint depends on a sprint-worthy challenge.
- Low-stakes tweaks where five days of team time would be disproportionate. Use a lighter experiment design instead.
- No customer access for Friday testing and no realistic recruiting plan. A Design Sprint that cannot test on Friday is just a four-day workshop with no learning event.
- No Decider available and one cannot be appointed. Design Sprint requires fast decisions Wednesday and pre-test Thursday; without authority the sprint produces options without commitment.

## What This Skill Produces

A single bundled artifact with six sections:

1. **Readiness verdict**: Go / Conditional Go / Wait
2. **Diagnosis**: what is in place, what is missing, what is uncertain
3. **Recommended preconditions** (when verdict is Wait or Conditional Go): the prerequisite work the team should do before the sprint
4. **Recommended attendee list** (when verdict is Go or Conditional Go): the 4-7 people who should be in the room, with role expectations
5. **Customer recruiting plan** (when verdict is Go or Conditional Go): target profile, source, count, incentive, recruiter owner, recruiting deadline (typically 7-10 days before Friday)
6. **Pre-sprint activities** (when verdict is Go): the prep work to complete in the days before Monday

See `references/TEMPLATE.md` for the canonical structure and `references/EXAMPLE.md` for a worked example using the Brainshelf book-catalog thread.

## Inference Inputs

The skill runs an inference pass over these inputs to produce the verdict:

| Input | What the skill does with it |
|---|---|
| Challenge description | Determines whether the challenge is sprint-worthy (specific enough to prototype in 4 days; big enough to justify 5 team-days) |
| Existing hypothesis (from Foundation Sprint or elsewhere) | Confirms there is a testable bet, not exploratory discovery. Highest-risk assumption from the FS scorecard becomes a candidate sprint question |
| Customer access status | Critical. Without realistic Friday customer access, the sprint cannot test |
| Decider name and full-week availability | Confirms Decider can attend at least Monday morning, Wednesday morning (heat map + supervote), and Friday afternoon (Decider review); ideally all 5 days |
| Team composition draft | Checks roster against the 4-7 person band; flags missing roles (engineering for prototype build, design for sketching, researcher or PM for customer interviews) |
| Prototype medium feasibility | Confirms a 1-day prototype is achievable in the chosen medium (clickable, slideware, service role-play, paper, physical mock) |
| (Optional) Logistics constraints | Confirms five consecutive days can actually be cleared by all attendees |

If a load-bearing input is missing or low-confidence, the skill flags it explicitly and proposes how to close the gap before Monday.

## Readiness Criteria (8 Canonical Checks)

The skill evaluates the team against these eight criteria, drawn from Sprint (Knapp, Zeratsky, Kowitz), GV "Is Your Idea Sprint-Worthy?", and Character Capital's Design Sprint guide:

1. **Challenge is named and sprint-worthy.** Specific enough to prototype in 4 days; big enough that a wrong direction would be costly.
2. **Stakes are meaningful.** The team would otherwise hesitate, debate, or default to building blindly. The sprint is justified by what it replaces.
3. **Decider is available for the load-bearing moments.** Minimum: Monday morning (framing), Wednesday morning (heat map + supervote), Friday afternoon (Decider review). Ideally all 5 days.
4. **Team size is appropriate (4-7).** Smaller than 4 weakens skill coverage; larger than 7 slows decision-making.
5. **Team can clear 5 consecutive days.** No partial attendance for core participants; cameo experts may attend specific sessions.
6. **Customer access for Friday testing is secured (or recruitable in 7-10 days).** 5 target-profile customers, paid honoraria, scheduled for Friday morning to early afternoon.
7. **Prototype medium is feasible in 1 day.** Clickable (Figma), slideware (Keynote), service role-play, paper, physical mock, or other medium that can be built Thursday by 2 people.
8. **Sprint output has a path forward.** The team is ready to act on validation (build, iterate, pivot to backup, or stop) when Friday's scorecard lands. Sprints without a downstream commitment become orphaned learnings.

| Pattern | Verdict |
|---|---|
| All 8 criteria met cleanly | **Go** |
| 1-2 criteria are "yellow flags" but addressable in the 1-2 weeks before Monday | **Conditional Go** with documented prep |
| 3 or more criteria fail, or any of 1, 3, or 6 is a hard fail | **Wait** with recommended prerequisite work |

Treat the criteria as load-bearing, not a checklist to game. A team that papers over no-customer-access with "we'll figure it out by Thursday" should get a Wait, not a Conditional Go.

## Common Pitfalls

- **Sprint theater.** Leadership has already decided what to build; the sprint is being run for political cover. The Friday scorecard cannot change the decision. If this is the situation, the honest verdict is Wait, and the team should escalate the misalignment rather than burn 5 days.
- **No Decider, or Decider-by-committee.** A "Decider for the week" who lacks real authority cannot make the Wednesday supervote stick. If the genuine Decider cannot attend the load-bearing moments, postpone.
- **No customer access for Friday.** This is the most common cause of failed sprints. Recruiting 5 strangers takes 7-10 days; recruiting starts as soon as readiness is Go, not Monday. If access is uncertain, the verdict is Wait until a recruiter and source are confirmed.
- **Challenge too broad to fit one week.** "Redesign onboarding" is too broad; "design and test the first-time signup flow for B2B trial customers" is sprint-sized. If the challenge cannot be bounded, do problem framing first.
- **Conflating Design Sprint with Foundation Sprint.** Foundation Sprint chooses strategic direction (2 days, no prototype, no customers). Design Sprint validates a chosen direction (5 days, prototype, customers). If the team has not chosen a direction, they need Foundation Sprint first, not Design Sprint.
- **Skipping the diagnostic because "we're going to run it anyway."** Same failure mode as FS readiness: the cost of the diagnostic is 45 minutes; the cost of a failed sprint is 35-40 person-days plus customer honoraria plus opportunity cost.

## Canonical Sources

- Knapp, J., Zeratsky, J., and Kowitz, B. *Sprint: How to Solve Big Problems and Test New Ideas in Just Five Days*. Simon and Schuster, 2016. Chapter 2 "Set the Stage" on sprint-worthiness criteria.
- GV Design Sprint Guide. "Is Your Idea Sprint-Worthy?" https://www.gv.com/sprint/
- Character Capital. "When to Sprint." https://www.character.vc
- Google Design Sprint Kit. Pre-sprint checklist. https://designsprintkit.withgoogle.com/

## Cross-Skill Usage

This skill is the entry point of the design-sprint-skills family. It has no prerequisites (the `metadata.prerequisites` field is intentionally empty).

When the verdict is Go, the natural next invocation is `tool-design-sprint-brief` to lock challenge, team, recruiting plan, prototype medium, and logistics. When the verdict is Wait, the team typically does prerequisite work (problem framing, Foundation Sprint, customer recruiting setup) before re-invoking this skill.

A team coming directly from a Foundation Sprint should bring the Founding Hypothesis as input context. The hypothesis's highest-risk assumption (typically marked in the FS assumption scorecard) becomes the lead candidate sprint question for `tool-design-sprint-brief` (which locks the sprint questions); `tool-design-sprint-map-and-target` on Monday then refines the locked questions during the morning. No bridge skill exists or is required; the narrative handoff is described in `_workflows/foundation-to-design.md` and in both user guides.

`tool-note-and-vote` may be invoked once during the readiness conversation if the team disagrees on whether a Design Sprint is the right tool (vs. a smaller experiment or direct build). In practice, the diagnostic is usually conclusive.

## Decider Checkpoint

This skill ends with a Decider Checkpoint in `references/TEMPLATE.md`. The Decider signs off on the verdict (Go / Conditional Go / Wait), accepts the diagnosis, and explicitly commits to the load-bearing attendance windows. Without Decider sign-off, the verdict is advisory; with sign-off, it is the commitment that triggers (or postpones) the sprint and the recruiting work.
