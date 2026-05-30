---
title: "Foundation Sprint Readiness"
description: "Pre-sprint diagnostic that determines whether a team should run a Foundation Sprint now, postpone it, or do prerequisite work first. Produces a Go / Conditional Go / Wait verdict with diagnosis, recommended preconditions, attendee list, and pre-sprint activities. Use when a team is considering starting a Foundation Sprint and wants a fast yes/no diagnosis before committing two days of facilitated work."
generated: true
source: scripts/generate-skill-pages.py
tags:
  - tool
  - coordination
---

:::note[Quick facts]
**Classification:** tool | **Version:** 0.1.0 | **Category:** coordination | **License:** Apache-2.0
:::

**Try it:** `/pm-skills:tool-foundation-sprint-readiness "Your context here"`

Assess whether a Foundation Sprint fits the team's current situation. Most sprints that fail were sprints that should not have been run. A 30-45 minute readiness diagnostic catches that failure mode before two days of facilitated work are spent.

Family contract: [`docs/reference/skill-families/foundation-sprint-skills-contract.md`](../../reference/skill-families/foundation-sprint-skills-contract.md). This skill is a member of `foundation-sprint-skills` and conforms to the family frontmatter and Decider Checkpoint requirements.

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

## How to Use

Invoke the skill by name (`/pm-skills:tool-foundation-sprint-readiness` on Claude Code, `$tool-foundation-sprint-readiness` on Codex):

```
/pm-skills:tool-foundation-sprint-readiness "Your context here"
```

Or reference the skill file directly: `skills/tool-foundation-sprint-readiness/SKILL.md`

## Output Template

# Foundation Sprint Readiness Assessment: [Initiative name]

<!-- One-line description of the initiative the team is considering running a Foundation Sprint for. -->

## Inputs Captured

**Initiative description:**

> [The project, product area, or strategic question, as the team named it.]

**Team composition draft:**

- [Name] ([role]; Decider candidate)
- [Name] ([role])
- [Name] ([role])
- [Name] ([role])

**Decider name and availability:** [Name; full-day availability for Day 1 and Day 2; or partial availability with details]

**Existing customer/market knowledge level (self-assessed):** [_/10. Brief note on basis for the score.]

**(Optional) Existing competitor and alternative knowledge:** [Notes on what is and is not known.]

**(Optional) Logistics constraints:** [Date windows, location, format.]

## Readiness Verdict: **[Go / Conditional Go / Wait]**

[One-sentence summary explaining the verdict.]

| Criterion | Status | Notes |
|---|---|---|
| 1. Initiative is named and concrete | [PASS / YELLOW / FAIL] | [Notes] |
| 2. Stakes are meaningful | [PASS / YELLOW / FAIL] | [Notes] |
| 3. Team has existing customer/market knowledge | [PASS / YELLOW / FAIL] | [Notes] |
| 4. Decider is available | [PASS / YELLOW / FAIL] | [Notes] |
| 5. Team size is appropriate (max 5) | [PASS / YELLOW / FAIL] | [Notes] |
| 6. Inputs are collected | [PASS / YELLOW / FAIL] | [Notes] |
| 7. Output has a path to testing | [PASS / YELLOW / FAIL] | [Notes] |
| 8. Organization tolerates explicit tradeoffs | [PASS / YELLOW / FAIL] | [Notes] |

## Diagnosis

[2-4 paragraphs explaining what is in place, what is missing or weak, and what is uncertain. Be specific about each yellow or failing criterion. If verdict is Go, this section should still surface any risks that justify the Go.]

[If verdict is Conditional Go: name each yellow flag explicitly and describe how it would block the sprint if not addressed.]

[If verdict is Wait: name each failing criterion and describe the prerequisite work the team should do before re-running the diagnostic.]

## Recommended Preconditions (Conditional Go or Wait only)

[Bulleted list of concrete actions to close gaps. Each precondition has an owner and a target completion date.]

1. **[Precondition]** ([Owner]; deadline: [date]). [Why this matters; what "done" looks like.]
2. **[Precondition]** ([Owner]; deadline: [date]). [Why this matters; what "done" looks like.]

## Recommended Pre-Sprint Activities (Go or Conditional Go only)

[Bulleted list of prep tasks to complete in the days before Day 1.]

1. **[Activity]** ([Owner]; deadline: [date]). [What and why.]
2. **[Activity]** ([Owner]; deadline: [date]). [What and why.]
3. **[Activity]** ([Owner]; deadline: [date]). [What and why.]

## Recommended Attendees (Go or Conditional Go only)

| Attendee | Role | Required for which sections |
|---|---|---|
| [Name] | Decider | All |
| [Name] | Facilitator | All |
| [Name] | [PM / Design / Engineering / Customer expert / etc.] | [Day 1 AM / Day 2 PM / all] |
| [Name] | [Role] | [Sections] |

[If cameo experts are recommended, list separately with the specific section they should attend.]

## Decider Checkpoint

**Decider sign-off required before [scheduling Day 1 / closing this diagnostic].**

- [ ] Decider confirms the verdict and accepts the diagnosis.
- [ ] Decider commits to attending both full days as Decider (if verdict is Go or Conditional Go).
- [ ] Decider acknowledges the documented preconditions and owns ensuring they are met before Day 1 (if Conditional Go).
- [ ] Decider agrees the output of the sprint should be a Founding Hypothesis ratifiable by end of Day 2 (if verdict is Go).
- [ ] Decider acknowledges that the sprint will force tradeoffs; one strategic direction becomes the top bet and others become backup or are dropped.

**Signed:** [Decider name, role], [ISO date and local time]

## Example Output

<details>
<summary>Foundation Sprint Readiness Assessment: Brainshelf</summary>

# Foundation Sprint Readiness Assessment: Brainshelf

A single invocation by the Brainshelf founding team. Brainshelf is a pre-seed B2C SaaS for personal book collection management. The team is divided on whether to optimize for individual collectors (private library) or social readers (community, recommendations).

## Inputs Captured

**Initiative description:**

> Brainshelf is a pre-seed B2C SaaS for personal book collection management. The founding team wants to launch a product that helps readers track what they have read and what they want to read next, but the team is divided on whether to optimize for individual collectors (private library) or social readers (community, recommendations, book clubs).

**Team composition draft:**

- Jamie (founder, PM; Decider candidate)
- Alex (design)
- Sam (engineering)
- Riley (customer expert; runs a 12k-follower book-blogger Discord)

**Decider name and availability:** Jamie, available full days May 13 and May 14 with no calendar conflicts confirmed.

**Existing customer/market knowledge level (self-assessed):** 7 of 10. The team has run 22 customer interviews with active readers in the last 8 weeks. Riley has deep network in social-reading. Less direct knowledge of pure private-collection users.

**Existing competitor and alternative knowledge:** Goodreads well-understood; paper journals and physical notebooks understood as a popular alternative; team has not yet compiled systematic notes on apps like StoryGraph, Bookly, or LibraryThing.

**Logistics constraints:** Two-day workshop, hybrid (Jamie and Sam in-person at Seattle co-working; Alex and Riley remote on Zoom and Miro).

## Readiness Verdict: **Go**

The team meets the canonical readiness criteria with one addressable yellow flag (competitor research gap, closable in evening prep).

| Criterion | Status | Notes |
|---|---|---|
| 1. Initiative is named and concrete | PASS | Brainshelf product direction |
| 2. Stakes are meaningful | PASS | Pre-seed founders; wrong choice is costly |
| 3. Team has existing customer/market knowledge | PASS | 22 interviews + Riley's domain network |
| 4. Decider is available | PASS | Jamie commits to both days |
| 5. Team size is appropriate (max 5) | PASS | 4 people including Decider |
| 6. Inputs are collected | YELLOW | Interview notes ready; competitor research scattered (see Diagnosis) |
| 7. Output has a path to testing | PASS | Team intends to run a Design Sprint week of May 26 if hypothesis emerges |
| 8. Organization tolerates explicit tradeoffs | PASS | Founders explicitly chartered the sprint to force a top bet |

## Diagnosis

The team meets seven of eight canonical readiness criteria cleanly. The single yellow flag is competitor research completeness.

**Competitor and alternatives research is incomplete.** Goodreads is well-understood; paper journals and physical notebooks are understood as a popular alternative; but the team has not surfaced systematic notes on apps like StoryGraph, Bookly, or LibraryThing. This gap matters because Day 1 morning Basics depends on a real competitor map; without it, the team risks generic positioning ("we are better than Goodreads") instead of differentiated positioning against the full alternative set. The gap is addressable: a 90-minute prep window the evening before Day 1 can produce one-page summaries for each missing competitor.

No other risk factors found. The team is small enough, has enough context, has a clear Decider, has a path to validation (Design Sprint planned for May 26), and is explicitly running this sprint to force a strategic tradeoff. The Go verdict is honest, not optimistic.

## Recommended Preconditions

1. **Compile competitor one-pagers** (Riley owns; deadline: evening of 2026-05-12 by 22:00 PT). One page each for Goodreads, StoryGraph, Bookly, LibraryThing. Include: target user, primary jobs-to-be-done, monetization, why-people-leave signals. Target time: 90 minutes. Closes the Yellow on criterion 6.

## Recommended Pre-Sprint Activities

1. **Print or screen-share the 22 interview synthesis notes** (Jamie owns; deadline: morning of 2026-05-13). For Day 1 morning reference during target customer and important problem decisions.
2. **Block calendars** (whole team owns; deadline: end of day 2026-05-11). No Slack, no email during sprint hours (09:00-17:00 PT) both days.
3. **Prepare the room and digital workspace** (Alex owns; deadline: evening of 2026-05-12). Pre-load Miro board with the canonical Foundation Sprint board template. Confirm Zoom call quality.
4. **Confirm Day 2 closing time is unambiguous** (Jamie owns; deadline: morning of 2026-05-13). Founding Hypothesis ratification cannot slip to Day 3; if it slips, the sprint failed to produce its output.

## Recommended Attendees

| Attendee | Role | Required for which sections |
|---|---|---|
| Jamie | Decider, PM | All; especially Differentiation and Magic Lenses |
| Alex | Design lead | All; especially Differentiation (2x2 chart) |
| Sam | Engineering lead | All; especially Approach Options (feasibility) |
| Riley | Customer expert | All; especially Basics (target customer + competitors) |

No additional cameo experts recommended. The team has enough internal context.

## Decider Checkpoint

**Decider sign-off required before scheduling Day 1.**

- [x] Jamie confirms Go verdict and accepts the diagnosis (competitor research gap).
- [x] Jamie commits to attending both full days as Decider.
- [x] Jamie acknowledges the documented precondition (competitor one-pagers by evening of May 12) and owns ensuring Riley completes it.
- [x] Jamie agrees the output should be a Founding Hypothesis ratifiable by end of Day 2.
- [x] Jamie acknowledges that the sprint will force a choice between social/community direction and personal-collection direction; the sprint does NOT preserve both paths.

**Signed:** Jamie (founder, PM), 2026-05-12 18:30 PT

</details>
