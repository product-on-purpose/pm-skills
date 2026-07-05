---
name: tool-design-sprint-brief
description: Pre-sprint brief that locks challenge, sprint questions, team and role assignments, customer recruiting plan, prototype medium, interview format, logistics, and success criteria before Monday of a Design Sprint. Use after the readiness verdict is Go and before Monday begins. Produces a two-page artifact the team and Decider sign off on as the contract for the next five days.
license: Apache-2.0
metadata:
  classification: tool
  version: "1.0.0"
  updated: 2026-07-04
  tool: design-sprint
  move: brief
  category: coordination
  frameworks:
    - design-sprint
    - sprint
  timebox_minutes: 75
  roles:
    - facilitator
    - pm
    - decider
    - researcher
  prerequisites:
    - tool-design-sprint-readiness
  inputs:
    - readiness verdict and recommendations
    - challenge description
    - founding hypothesis (optional; from a prior Foundation Sprint)
    - team roster
    - customer recruiting source and plan
    - format (in-person | remote | hybrid; per Ratified Decision 6)
    - logistics constraints
  outputs:
    - challenge statement and why-now
    - sprint questions
    - decider attendance windows
    - team roster with role assignments
    - customer recruiting plan
    - prototype medium decision
    - interview format
    - logistics plan
    - success criteria
  author: product-on-purpose
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Design Sprint Brief

Produce the brief that aligns the team on challenge, sprint questions, participants, customer recruiting, prototype medium, interview format, logistics, and success criteria before Monday begins. A well-built brief prevents Monday morning from opening with re-litigation of "what are we testing this week?"; a missing or vague brief almost guarantees it.

Family contract: [`docs/reference/skill-families/design-sprint-skills-contract.md`](../../docs/reference/skill-families/design-sprint-skills-contract.md). This skill is a member of `design-sprint-skills`.

## When to Use

- The readiness verdict from `tool-design-sprint-readiness` is Go (or Conditional Go with preconditions cleared).
- The sprint has dates blocked on calendars and you need the artifact that names what the sprint is for.
- The team has customer recruiting active and you need to commit a recruiting plan, honorarium budget, and Friday schedule before recruiting closes.
- A skeptical exec wants to know "what is the team doing for five days plus customer cost?" and you need an answer that fits on two pages.

## When NOT to Use

- The sprint has already started. The brief is a prep artifact, not an in-sprint deliverable. If Monday is happening, run `tool-design-sprint-map-and-target` instead.
- The readiness verdict is Wait. The brief cannot fix an unready team; close the preconditions first, then re-run readiness, then invoke this skill.
- The team wants a stakeholder strategy document. The brief is internal prep, not an external deliverable. If a stakeholder document is needed, that is a downstream artifact (the Friday scorecard or the next-step memo).
- Customer recruiting has not started. The brief locks the recruiting plan but cannot replace the recruiter. If no recruiter is named, go back to readiness Wait verdict.

## What This Skill Produces

A single bundled artifact with nine sections:

1. **Challenge statement and why-now**: one paragraph naming the testable challenge and the urgency that justifies a sprint this week vs. later.
2. **Sprint questions**: 2-4 specific questions the Friday testing answers. The highest-risk assumption from any prior Foundation Sprint becomes the lead question.
3. **Decider attendance windows**: the load-bearing moments (Mon AM, Wed AM, Fri PM at minimum); fully blocked if available.
4. **Team roster with role assignments**: who is in the room each day and what role each person plays through the week.
5. **Customer recruiting plan**: target profile, source, count, incentive, recruiter owner, recruiting deadline, Friday schedule.
6. **Prototype medium decision**: clickable, slideware, service role-play, paper, physical mock, or other; with rationale.
7. **Interview format**: live or remote; moderated or unmoderated; recording and consent posture; observer-room setup.
8. **Logistics plan**: dates, hours, location, format (in-person, remote, hybrid), tools, daily rhythm.
9. **Success criteria**: observable outcomes that mark the sprint successful or not.

See `references/TEMPLATE.md` for the canonical structure and `references/EXAMPLE.md` for the Brainshelf book-catalog brief.

## Inference Inputs

| Input | What the skill does with it |
|---|---|
| Readiness verdict and recommendations (from `tool-design-sprint-readiness`) | Pulls the recommended attendees, customer recruiting plan, pre-sprint activities, and prototype medium proposal; flags any precondition that has not been closed |
| Challenge description | Compresses into the Challenge Statement and derives 2-4 sprint questions |
| Founding Hypothesis (optional; from a prior Foundation Sprint) | The highest-risk assumption from the FS scorecard becomes the lead sprint question; the top bet becomes the design direction; the backup becomes the fallback decision if Friday invalidates |
| Team roster | Maps people to the required Design Sprint roles (Decider, Facilitator, PM, Design, Engineering, Researcher or Customer Expert); confirms 4-7 person band |
| Customer recruiting source and plan | Locks recruiter owner, target profile, source channel, honorarium budget, deadline, and Friday schedule |
| Format (in-person, remote, hybrid; per Ratified Decision 6) | Branches the brief body where format affects authoring: recruiting plan (in-person requires geo-local cohort; remote allows cross-timezone), prototype medium (some media work better in-person; e.g., physical mock), interview format (live vs remote moderated), observer setup (in-room vs Zoom breakout room) |
| Logistics constraints | Produces the dates/hours/location/tools matrix; flags any constraint that would force the sprint to extend beyond 5 days or split across calendar weeks |

## Brief Length Discipline

The brief MUST fit on two pages (or two screens). The DS brief is intentionally longer than the FS brief because the customer-recruiting, prototype-medium, and interview-format sections have no FS equivalent and must be committed to before Monday.

- Challenge Statement: one paragraph, four sentences maximum.
- Sprint Questions: 2-4 numbered questions, each one sentence.
- Team Roster: table with one row per person.
- Customer Recruiting: table.
- Prototype Medium: one paragraph including rationale.
- Interview Format: one paragraph.
- Logistics: table.
- Success Criteria: 3-5 bulleted outcomes.

If the brief expands beyond two pages, the sprint is being over-engineered before it starts. The fix is not a longer brief; the fix is sharper sprint questions and a clearer prototype medium decision.

## Common Pitfalls

- **Vague sprint questions.** "Will users like it?" is not a sprint question. "Will 25+/year readers complete sub-3-second camera capture without abandoning?" is. Sprint questions must be answerable from Friday's 5-customer interviews.
- **Recruiting plan that does not match target customer.** Recruiting from a panel that skews younger or different demographics than the named target produces Friday data that does not test the actual assumption. Cross-check recruiting source against the readiness customer profile.
- **Skipping prototype medium decision.** Leaving prototype medium to Thursday morning forces the team into ad-hoc choice and risks the prototype not being testable Friday. Lock it in the brief; if needed, change it after Wednesday's storyboard but commit a default upfront.
- **Treating the brief as a stakeholder deliverable.** Stakeholders read the Friday scorecard and the Decider's next-step memo, not the brief. Sharing the brief publicly invites pre-sprint debate, which the sprint is supposed to resolve.
- **Logistics drift.** "We'll figure out remote vs in-person sometimes" telegraphs that the team has not committed. Either format is locked, or the readiness verdict was wrong.
- **No interview format decision.** Friday interview moderator, observation-room setup, and recording/consent posture should be in the brief. Forgetting these is the most common cause of Friday running long.

## Canonical Sources

- Knapp, J., Zeratsky, J., and Kowitz, B. *Sprint: How to Solve Big Problems and Test New Ideas in Just Five Days*. Simon and Schuster, 2016. Chapter 3 "Set the Stage" on sprint brief composition.
- Character Capital. "Design Sprint pre-sprint guide." https://www.character.vc
- Google Design Sprint Kit. "Sprint brief template." https://designsprintkit.withgoogle.com/
- AJ and Smart "Remote Design Sprint" template. Adapted for the remote and hybrid format sections.

## Cross-Skill Usage

Prerequisites: `tool-design-sprint-readiness`. The brief expects the readiness output as its primary input. When `prerequisites` is honored, the brief inherits the readiness verdict, customer recruiting plan draft, attendee recommendations, and pre-sprint activities; the skill then refines and locks them.

If the team has done equivalent prep without running the readiness skill explicitly (e.g., experienced sprint facilitator who knows the readiness criteria), the brief skill can be invoked directly. In that case, the skill body prompts the team to confirm the readiness criteria are met before generating the brief.

A team coming from a Foundation Sprint should bring the Founding Hypothesis and assumption scorecard as inputs. The brief's Sprint Questions section pulls the highest-risk assumption verbatim as the lead question. No bridge skill is required; the narrative handoff is documented in `_workflows/foundation-to-design.md`.

Next invocation in the sprint: `tool-design-sprint-map-and-target` on Monday morning.

## Decider Checkpoint

This skill ends with a Decider Checkpoint in `references/TEMPLATE.md`. The Decider signs off on scope (the challenge and sprint questions), team (the roster and attendance windows), recruiting plan (target profile, source, honorarium budget), prototype medium, interview format, and the explicit success criteria. Without sign-off, the brief is advisory; with sign-off, it is the contract for the next five days and the authorization for customer-recruiting spend.
