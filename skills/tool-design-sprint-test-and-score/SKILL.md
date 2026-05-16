---
name: tool-design-sprint-test-and-score
description: Day 5 (Friday) sprint-closing move of a Design Sprint that produces the bundled Friday artifact covering per-customer interview observations, best quotes, scorecard grid (sprint questions by customers), observed patterns, hot takes from each team member, and the Decider summary (build, iterate, pivot, or stop, plus highest-confidence learning, most important revision, and next artifact). Use Friday after Thursday's prototype passes trial run and during/after the 5 customer interviews. The sprint's payoff artifact.
classification: tool
version: "0.1.0"
updated: 2026-05-15
license: Apache-2.0
metadata:
  tool: design-sprint
  move: test-and-score
  category: discovery
  frameworks:
    - design-sprint
    - sprint
  timebox_minutes: 270
  roles:
    - facilitator
    - researcher
    - decider
    - pm
    - design
    - engineering
  prerequisites:
    - tool-design-sprint-prototype-plan
  inputs:
    - prototype (built Thursday; NOT produced by this skill)
    - interview script (from tool-design-sprint-prototype-plan)
    - sprint questions (from Monday's map-and-target)
    - founding hypothesis (optional; from a prior Foundation Sprint)
    - participant schedule
  outputs:
    - per-customer interview observation notes
    - best quotes
    - scorecard grid
    - observed patterns
    - hot takes
    - decider summary
  author: product-on-purpose
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Design Sprint Test and Score (Friday)

Friday is the sprint's payoff. 5 target-profile customers run the prototype while the team observes; the team synthesizes observations into a scorecard against the sprint questions; the Decider makes the build / iterate / pivot / stop call by end-of-day. The week's 35-40 person-days plus customer recruiting cost converts into one actionable decision.

Family contract: [`docs/reference/skill-families/design-sprint-skills-contract.md`](../../docs/reference/skill-families/design-sprint-skills-contract.md). This skill is a member of `design-sprint-skills`.

## When to Use

- It is Day 5 of the Design Sprint and Thursday's prototype passed trial run.
- 5 confirmed participants are scheduled (canonical; or 4 if 1 cancelled-and-no-buffer; pause if below 4).
- The team can observe interviews live (in-person or via Zoom breakout room) and synthesize during the day.
- The Decider is present Friday PM for the post-interview review (canonically 14:00-18:00 PT window covering observation of slots 4-5 plus Decider review by 17:30 PT).

## When NOT to Use

- Thursday prototype did not pass trial run. Re-run trial; if still failing at 19:00 PT Thursday, postpone Friday.
- Fewer than 3 customers confirmed. Per Ratified Decision 3, the canonical guidance is 5 customers; 3-4 or 6-7 gets a documented warning; below 3 or above 7 should trigger a re-decision (postpone or split testing). Note: the v0.1.0 family validator does NOT mechanically enforce these thresholds (cohort count is in the EXAMPLE artifact, not in frontmatter); enforcement is a v2.16 validator-expansion candidate.
- Decider unavailable for the post-interview review window. Without Decider, the day produces observations without a call.
- The team plans to use this skill to write the executive memo. Per Ratified Decision 4: exec memo authoring is delegated to `foundation-stakeholder-update` (existing pm-skills foundation skill); this skill produces the Decider summary only.

## What This Skill Produces

A single bundled artifact with six sections:

1. **Per-customer interview observation notes**: one section per customer; covers Context (Act 2) reactions, Tasks (Act 4) behavior with timestamps, Debrief (Act 5) reactions including pricing. Captured live during the day's interviews.
2. **Best quotes**: 5-15 verbatim customer quotes the team flags as most signal-bearing. Used in the Decider summary and in any downstream pitch or planning artifact.
3. **Scorecard grid**: rows are the sprint questions (from Monday); columns are the 5 customers; each cell is Y / N / partial / unclear with a one-line note; rightmost column is the team's day-end decision per question (Validated / Invalidated / Inconclusive).
4. **Observed patterns**: 4 buckets (worked, hesitated, broke trust, unexpected) with 2-4 patterns per bucket. Each pattern names how many customers showed it.
5. **Hot takes**: one short paragraph per team member capturing their personal read on Friday before group synthesis biases the read. Written silently in parallel.
6. **Decider summary**: the Decider's call (build / iterate / pivot / stop / reframe) plus the highest-confidence learning, the most important revision the team would make to the prototype direction, and the next artifact the team will produce (the post-sprint deliverable).

See `references/TEMPLATE.md` for the canonical structure and `references/EXAMPLE.md` for the Brainshelf book-catalog Friday artifact.

## Friday Time Structure

Friday is the longest day: customer interviews start early (canonically 09:00 PT) and the Decider review concludes the day (canonically 17:30 PT).

- **09:00-16:30**: 5 customer interviews of 50-60 minutes each at 09:00 / 10:30 / 12:00 / 14:00 / 15:30. Each slot: 10 min setup + 50-55 min interview + 5 min team huddle to capture observations before next customer.
- **13:00-14:00**: Lunch (slot 3 wraps ~13:00; lunch overlaps the slot 3 to slot 4 buffer)
- **16:30-16:45**: Last-customer wrap; observation note tidy
- **16:45-17:00**: Team writes hot takes silently in parallel
- **17:00-17:30**: Decider reviews scorecard + hot takes; makes the call
- **17:30-18:00**: Decider summary captured; team begins post-sprint disposition (next-step calendar, downstream deliverable assignment)

This skill's 270-minute timebox covers the synthesis sections (scorecard, patterns, hot takes, Decider summary). The 5 interviews themselves (~5 hours of interview time) run in parallel with continuous observation capture.

## Scorecard Mechanic

The scorecard is a 2-D grid. Rows are sprint questions from Monday's map-and-target (typically 3-7). Columns are the 5 customers (anonymized IDs). Each cell answers: did this customer's interview validate, invalidate, or leave inconclusive the row's question?

| | C1 | C2 | C3 | C4 | C5 | Day-end decision |
|---|---|---|---|---|---|---|
| Q1 | Y | Y | N | Y | partial | Validated (4 of 5) |
| Q2 | N | Y | unclear | N | N | Invalidated (3-of-5 N, 1 of 5 Y) |
| ... | ... | ... | ... | ... | ... | ... |

Day-end decision rules:
- **Validated**: 4 or 5 of 5 Y (strong signal); 3 of 5 Y with no N (directional). For 4-customer cohorts: 4 Y is Validated; 3 Y with no N is directional.
- **Invalidated**: 4 or 5 of 5 N. For 4-customer cohorts: 4 N is Invalidated; 3 N with no Y is directional.
- **Inconclusive**: all other patterns. Inconclusive questions get scheduled for follow-up (a smaller test, a quant experiment, or a second Design Sprint).

The Decider can override day-end decisions but should record reasoning.

## Common Pitfalls

- **Observation notes too narrative, not behavioral.** "Customer seemed confused" is a narrative; "Customer hovered on the capture button for 4 seconds without tapping, then tapped twice in rapid succession" is behavior. Behavior is data; narrative is interpretation.
- **Scorecard cells filled in by consensus.** Each observer writes their cell read; differences are surfaced, not averaged. If C1's read on Q1 is split 2 Y vs 2 N across the team, the cell is "split" with an explanatory note.
- **Hot takes written after group synthesis.** Hot takes are written SILENTLY and in PARALLEL before group synthesis. Writing them after a group debrief produces consensus, not signal.
- **Decider hesitating on the call because "we want more data."** Friday's job is to produce a call with the data you have. If the call truly cannot be made, the call is "iterate" (re-sprint with adjustments). "Defer" is not an answer.
- **Skipping the Decider summary because "we'll write it up Monday."** The summary is captured Friday before the team leaves. Monday is too late; context decays fast.
- **Treating "5 customers" as a soft target.** Per the canonical research, 5 is where confidence about patterns crosses an inflection point. Fewer than 4 produces noisy signal; more than 7 produces synthesis-overload without much marginal signal.

## Cross-Skill Usage

Prerequisites: `tool-design-sprint-prototype-plan`. Friday consumes the prototype and the interview script from Thursday. Without a working prototype that passed trial run, Friday cannot run.

This skill does NOT invoke `tool-note-and-vote`. Friday has no voting moment; the scorecard cells are individual reads and the Decider summary is the Decider's call.

This skill does NOT author an executive memo (per Ratified Decision 4). If the team wants an exec memo or stakeholder update, the next invocation is `foundation-stakeholder-update`, which consumes the Decider summary as input.

Downstream invocations after the sprint closes: `deliver-prd` (if Decider call is "build"); `measure-experiment-design` (if "iterate" requires a smaller follow-on experiment); `iterate-pivot-decision` (if "pivot" requires documenting the pivot rationale); `foundation-stakeholder-update` (if any of the above need stakeholder communication).

## Canonical Sources

- Knapp, J., Zeratsky, J., and Kowitz, B. *Sprint*. Simon and Schuster, 2016. Friday chapter (Chapters 18-20).
- GV Design Sprint Guide. "Sprint Week Friday." https://www.gv.com/sprint/
- Character Capital. "Design Sprint Day 5." https://www.character.vc
- Google Design Sprint Kit. "Friday scorecard template + interview observation worksheet." https://designsprintkit.withgoogle.com/
- Nielsen, J. (2000). "Why You Only Need to Test with 5 Users." Nielsen Norman Group. https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/ (canonical research for the 5-customer cohort size).

## Decider Checkpoint

This skill ends with a Decider Checkpoint in `references/TEMPLATE.md`. The Decider's call (build / iterate / pivot / stop / reframe) IS the checkpoint; the sprint cannot close without it. The checkpoint also captures the next artifact the team owns producing (a PRD, a smaller experiment, a pivot memo, or a stakeholder update), which is what triggers Monday's post-sprint work to begin clean.
