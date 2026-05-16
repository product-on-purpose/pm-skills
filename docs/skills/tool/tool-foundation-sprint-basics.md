---
title: "Foundation Sprint Basics"
description: "Day 1 morning move of a Foundation Sprint. Forces explicit team choices on target customer, important problem, team advantage, and competitors and alternatives. Produces a single coherent strategic frame that becomes the input to Day 1 afternoon Differentiation. Use after the sprint brief is signed and Day 1 morning is scheduled. Bundled artifact, not four separate decisions."
generated: true
source: scripts/generate-skill-pages.py
tags:
  - tool
  - problem-framing
---

:::note[Quick facts]
**Classification:** tool | **Version:** 0.1.0 | **Category:** problem-framing | **License:** Apache-2.0
:::

**Try it:** `/tool-foundation-sprint-basics "Your context here"`

Day 1 morning of a Foundation Sprint. The team makes four foundational choices explicit: who the product is for, what important problem it solves, why this team has a right to win, and what customers do today instead. The output is one coherent strategic frame, not four separable decisions.

Family contract: [`docs/reference/skill-families/foundation-sprint-skills-contract.md`](../../reference/skill-families/foundation-sprint-skills-contract.md). This skill is a member of `foundation-sprint-skills`.

## When to Use

- Day 1 morning of a Foundation Sprint, after the brief is signed.
- The team has sufficient customer and market knowledge (per readiness verdict) to make informed choices.
- Each of the four sub-decisions is open or contested; the team has not pre-aligned on any of them.
- The Decider is in the room and ready to sign off on the bundled output before lunch.

## When NOT to Use

- The team lacks enough customer knowledge to choose a target customer or name an important problem. Run customer research or problem framing first; revisit when readiness criterion 3 passes.
- The team has already committed to a specific customer-problem pair and just wants to validate it. Use a lighter validation tool; Basics is for genuine decision-making, not ratification theater.
- Day 1 morning has slipped into afternoon. Differentiation depends on Basics being complete; if Basics did not produce a coherent frame by lunch, do not start Differentiation. Reframe or postpone.

## How to Use

Use the `/tool-foundation-sprint-basics` slash command:

```
/tool-foundation-sprint-basics "Your context here"
```

Or reference the skill file directly: `skills/tool-foundation-sprint-basics/SKILL.md`

## Output Template

# Foundation Sprint Basics: [Initiative name] (Day 1 Morning)

<!-- The four foundational choices for the initiative, captured as one coherent strategic frame. The team and Decider sign off on this as a bundle before Day 1 afternoon Differentiation begins. -->

## Target Customer Statement

> [A specific, named customer archetype with markers. Not a vague segment. The team should be able to recognize this person.]

Specific markers: [demographic, behavioral, contextual signals that make the archetype concrete].

Note-and-vote outcome: [N of M votes for this customer over [count] alternatives. Decider supervote confirmed / overrode top vote because [rationale].]

## Important Problem Statement

> ["The customer currently [does X], and the pain is [Y]." Single sentence framing the painful-enough problem.]

Why this is painful enough to matter:

- [Concrete evidence of pain: time lost, money spent, frustration, abandoned alternatives, switching behavior.]
- [Why the customer would leave their current behavior (including doing nothing) for a better solution.]
- [Behavioral signals from prior customer research that confirm the pain.]

## Team Advantage Inventory

| Advantage | Evidence | Strength |
|---|---|---|
| [Specific advantage, not generic] | [Concrete evidence, not "we're passionate"] | [Capability / Insight / Relationship / Data / Distribution / Timing] |
| [Specific advantage] | [Concrete evidence] | [Type] |
| [Specific advantage] | [Concrete evidence] | [Type] |

Note-and-vote outcome: team selected [top advantage] and [second advantage] as the two advantages worth committing to.

## Competitor and Alternative Map

| Competitor / Alternative | What customers use it for | Why people leave (or stay) |
|---|---|---|
| **[Direct competitor 1]** | [primary use] | [why leave or stay] |
| **[Direct competitor 2]** | [primary use] | [why leave or stay] |
| **[Substitute workflow]** | [primary use] | [why leave or stay] |
| **[Manual workaround]** | [primary use] | [why leave or stay] |
| **[Internal tool or DIY]** | [primary use] | [why leave or stay] |
| **Do nothing** | [why doing nothing is a valid choice for some customers] | [the reasons inertia wins] |

"Do nothing" is the strongest alternative for many customer segments. The team explicitly considers it before evaluating against named competitors.

## Note-and-Vote Trace (Decisions Made This Morning)

| Decision | Options considered | Vote distribution | Decider supervote |
|---|---|---|---|
| Target customer | [list] | [counts per option] | [Decider's call; rationale if non-obvious] |
| Important problem | [list] | [counts per option] | [Decider's call; rationale] |
| Top 2 advantages | [list] | [multi-vote counts] | [Decider's confirmed pair] |
| Strongest alternative to beat | [list] | [counts per option] | [Decider's call] |

## Decider Checkpoint

**Decider sign-off required before Day 1 afternoon (Differentiation) begins.**

- [ ] Decider confirms target customer statement is specific enough to design for.
- [ ] Decider confirms important problem is painful enough to drive switching from current alternatives (including "do nothing").
- [ ] Decider commits to the top 2 advantages as the bets the team will build on.
- [ ] Decider confirms the strongest alternative to beat (often "do nothing," sometimes a named competitor).
- [ ] Decider signs off on the bundled artifact as a coherent strategic frame: the customer, problem, advantages, and alternatives compose into one story.

**Signed:** [Decider name, role], [ISO date and local time]

## Example Output

<details>
<summary>Foundation Sprint Basics: Brainshelf (Day 1 Morning)</summary>

# Foundation Sprint Basics: Brainshelf (Day 1 Morning)

The Brainshelf team's Day 1 morning output. Four sub-decisions ratified as one coherent strategic frame.

## Target Customer Statement

> **People who read 25 or more books a year, treat their personal library as memory rather than identity, and feel friction with both Goodreads (too social, too noisy) and paper journals (too lossy, hard to search).**

Specific markers: age 30-55, urban or suburban, owns 100+ books physical or digital, has tried at least one tracking tool and abandoned it, uses Pocket or Notion or Apple Notes for non-book knowledge capture today.

Note-and-vote outcome: 3 of 4 votes for this customer over "social readers in book clubs" (1 vote). Decider supervote confirmed.

## Important Problem Statement

> **"I read a lot, but I can't remember what I've read or what I want to read next, and the tools that should help me feel like work or like social media."**

Why this is painful enough to matter:

- Active readers report losing 15-20 minutes per book trying to remember "did I read this already?" at the bookstore or library.
- Recommendations from friends and articles accumulate but are never captured because the friction is too high (open app, log in, search book, add to shelf, tag, save).
- Goodreads collected 12 of the 22 interviewees' early enthusiasm and then lost them within 90 days. The reasons clustered as "too many notifications," "embarrassing public reading," "the data is theirs not mine."

This is a painful enough problem to drive switching from "do nothing" or paper journals. It is not a mild annoyance.

## Team Advantage Inventory

| Advantage | Evidence | Strength |
|---|---|---|
| Riley's network of 12k book bloggers | Active Discord; warm intros for customer research | Distribution + research access |
| Alex's design heritage in low-friction capture tools | Shipped 2 features at Notion-like company | Capability: fast-capture UX |
| Sam's mobile + offline-first engineering experience | Previously built Pocket-style sync engine | Capability: fast launch on iOS |
| Jamie's reader-community background | 8 years running a private reading group of 60+ active readers | Insight: knows the audience |

Note-and-vote outcome: team selected "low-friction capture UX" and "private-by-default reader insight" as the two advantages worth committing to.

## Competitor and Alternative Map

| Competitor / Alternative | What customers use it for | Why people leave (or stay) |
|---|---|---|
| **Goodreads** | Social shelving, friend feeds | Too social; owned by Amazon; stale UX; private surface dropped |
| **StoryGraph** | Tracking + recommendation alternative to Goodreads | Better than Goodreads but still social-first; limited iOS polish |
| **Bookly** | Reading-stats tracking on mobile | Feels like a gym tracker, not a memory tool |
| **LibraryThing** | Cataloging-focused, hobbyist | Dense UI, learning curve |
| **Notion / Apple Notes / Excel** | DIY tracking | Friction to set up; no book metadata |
| **Paper journal / bullet journal** | Manual tracking | Lossy; not searchable |
| **Do nothing** | Memory + bookstore browse | Books re-bought; recommendations forgotten |

"Do nothing" is the strongest alternative for the team's target customer. The team named it explicitly before evaluating against named competitors; this is the dominant baseline.

## Note-and-Vote Trace (Decisions Made This Morning)

| Decision | Options considered | Vote distribution | Decider supervote |
|---|---|---|---|
| Target customer | Individual collectors / Social readers / Book club coordinators | 3 / 1 / 0 | Books-as-memory readers (Decider confirmed top vote with reframing rationale) |
| Important problem | Forgetting books / No good recommendations / Tracking statistics | 3 / 0 / 1 | Forgetting books (Decider confirmed) |
| Top 2 advantages | Capture UX / Engineering / Insight / Distribution | 4 / 1 / 3 / 2 (multi-vote) | Capture UX + Insight (Decider confirmed top 2) |
| Strongest alternative to beat | Goodreads / Do nothing / Paper journal | 1 / 3 / 0 | Do nothing (Decider confirmed; explicitly named inertia as the baseline) |

## Decider Checkpoint

**Decider sign-off required before Day 1 afternoon (Differentiation) begins.**

- [x] Jamie confirms target customer statement is specific enough to design for.
- [x] Jamie confirms important problem is painful enough to drive switching from "do nothing."
- [x] Jamie commits to capture UX + private-by-default reader insight as the two advantages we will build on.
- [x] Jamie confirms "do nothing" is the strongest competitor (more so than Goodreads).
- [x] Bundled artifact ratified as a coherent strategic frame; ready to proceed to Differentiation.

**Signed:** Jamie (founder, PM), 2026-05-13 12:45 PT

</details>
