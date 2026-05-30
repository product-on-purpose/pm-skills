---
title: "Foundation Sprint Differentiation"
description: "Day 1 afternoon move of a Foundation Sprint. Converts the morning's Basics frame into a defensible strategic position by scoring differentiator candidates against customer-perceived value, choosing two committed differentiators, plotting alternatives on a 2x2 chart, writing decision principles, and producing a one-page Mini Manifesto. Use after Basics is signed; before Approach Options the next morning."
generated: true
source: scripts/generate-skill-pages.py
tags:
  - tool
  - problem-framing
---

:::note[Quick facts]
**Classification:** tool | **Version:** 0.1.0 | **Category:** problem-framing | **License:** Apache-2.0
:::

**Try it:** `/pm-skills:tool-foundation-sprint-differentiation "Your context here"`

Day 1 afternoon of a Foundation Sprint. The team converts the morning's Basics frame (customer, problem, advantage, competitors) into a defensible strategic position. The output is a one-page Mini Manifesto that the team and Decider sign as the Day 1 strategic summary.

Family contract: [`docs/reference/skill-families/foundation-sprint-skills-contract.md`](../../reference/skill-families/foundation-sprint-skills-contract.md). This skill is a member of `foundation-sprint-skills`.

## When to Use

- Day 1 afternoon of a Foundation Sprint, immediately after lunch.
- The Basics bundled artifact is signed by the Decider; the customer, problem, advantage, and competitor map are committed.
- The team is ready to commit to a strategic position the product will occupy.

## When NOT to Use

- Basics is unresolved or under negotiation. Differentiation depends on a stable input frame.
- The team has already pre-chosen differentiators and just wants ratification. The skill is built for genuine decision-making; ratification theater wastes the afternoon.
- The team has lost the room: low energy, no Decider, time pressure. Postpone or split into shorter blocks rather than rush.
- This is a follow-up sprint and the existing differentiation still holds. Use Magic Lenses directly with the existing position.

## How to Use

Invoke the skill by name (`/pm-skills:tool-foundation-sprint-differentiation` on Claude Code, `$tool-foundation-sprint-differentiation` on Codex):

```
/pm-skills:tool-foundation-sprint-differentiation "Your context here"
```

Or reference the skill file directly: `skills/tool-foundation-sprint-differentiation/SKILL.md`

## Output Template

# Foundation Sprint Differentiation: [Initiative name] (Day 1 Afternoon)

<!-- Day 1 afternoon bundled artifact. The team converts the Basics frame into a defensible strategic position. -->

## Scored Differentiator Candidates

Score scale: 1 (weak signal) to 5 (very strong signal).

| Differentiator | Customer pull | Team can deliver | Hard to copy | Score |
|---|---|---|---|---|
| [Candidate 1] | _ | _ | _ | _ |
| [Candidate 2] | _ | _ | _ | _ |
| [Candidate 3] | _ | _ | _ | _ |
| [Candidate 4] | _ | _ | _ | _ |
| [Candidate 5] | _ | _ | _ | _ |
| [Candidate 6] | _ | _ | _ | _ |
| [Candidate 7] | _ | _ | _ | _ |
| [Candidate 8] | _ | _ | _ | _ |

[Top 5-7 advance to the note-and-vote in Step 3.]

## Chosen Two Differentiators

**1. [First chosen differentiator].**
[One paragraph naming the differentiator, what makes it customer-perceived, and why the team can deliver. Evidence from Basics: cite the specific customer pain or advantage this responds to.]

**2. [Second chosen differentiator].**
[One paragraph; same structure.]

## 2x2 Differentiation Chart

```text
                  HIGH [Differentiator 1]
                          |
                          |
                          |          [Our product position]
                          |              .
                          |
                          |
  HIGH [Differentiator 2] +  LOW [Differentiator 2]
                          |
                          |              [Competitor X]
                          |              [Competitor Y]
                          |
       [Competitor Z]     |
                          |              [Competitor W]
                          |
                          |
                  LOW [Differentiator 1]
```

Customer plotted alternatives:

- **[Competitor 1]**: [position rationale]
- **[Competitor 2]**: [position rationale]
- **[Substitute or paper alternative]**: [position rationale]
- **"Do nothing" baseline**: [position rationale; often off-chart or at origin]

[The product occupies the quadrant: [name the unoccupied quadrant]. The team commits to defending this position.]

## Decision Principles

The team committed to [3-5] principles that operationalize the differentiation:

1. **[Principle 1].** [One-line operational rule. Names an explicit "we will choose X over Y" trade-off.]
2. **[Principle 2].** [...]
3. **[Principle 3].** [...]
4. **[Principle 4].** (Optional fourth principle)
5. **[Principle 5].** (Optional fifth principle)

Principles are decision-making rules for future product calls, not marketing copy.

## Mini Manifesto

> **[Product name] is for [target customer] who want a tool that respects that.**
>
> [One paragraph naming the strategic belief that drives the team. Tone is plain, declarative, and direct.]
>
> [One paragraph naming what the product IS: the two differentiators expressed as customer-perceived outcomes.]
>
> [One paragraph naming what the product IS NOT. This is the part teams skip and shouldn't. It says explicitly what the team is choosing against.]
>
> [Optional fourth paragraph: closing line for the customer.]

## Note-and-Vote Trace (Decisions Made This Afternoon)

| Decision | Options considered | Outcome |
|---|---|---|
| Two differentiators to commit to | [list] | [Two chosen; Decider supervote rationale if non-obvious] |
| Decision principles count | 3 / 5 / 7 | [Chosen count; Decider call] |

## Decider Checkpoint

**Decider sign-off required before Day 1 ends.**

- [ ] Decider confirms the two committed differentiators.
- [ ] Decider confirms the 2x2 chart is the canonical positioning artifact for Day 2.
- [ ] Decider confirms the [3-5] decision principles are non-negotiable for Approach Options tomorrow.
- [ ] Decider signs the Mini Manifesto as the Day 1 strategic summary.

**Signed:** [Decider name, role], [ISO date and local time]

## Example Output

<details>
<summary>Foundation Sprint Differentiation: Brainshelf (Day 1 Afternoon)</summary>

# Foundation Sprint Differentiation: Brainshelf (Day 1 Afternoon)

The Brainshelf team's Day 1 PM output. Customer-perceived differentiation chosen, plotted, and turned into a Mini Manifesto.

## Scored Differentiator Candidates

The team scored 11 candidate differentiators along customer-perceived dimensions.

| Differentiator | Customer pull | Team can deliver | Hard to copy | Score |
|---|---|---|---|---|
| Capture speed (sub-3-second log) | 5 | 5 | 3 | 13 |
| Private-by-default | 4 | 5 | 4 | 13 |
| Personal recall (read this before?) | 5 | 4 | 4 | 13 |
| Offline-first | 3 | 5 | 4 | 12 |
| Beautiful visual library | 3 | 4 | 2 | 9 |
| Cross-format (audio, paper, digital) | 4 | 3 | 2 | 9 |
| Curated recommendations | 4 | 2 | 1 | 7 |
| Social book club tools | 2 | 3 | 1 | 6 |
| Reading stats and gamification | 2 | 4 | 1 | 7 |
| Annotation export | 3 | 4 | 2 | 9 |
| Voice-first capture | 4 | 2 | 3 | 9 |

Top scorers advancing to note-and-vote: capture speed, private-by-default, personal recall, offline-first.

## Chosen Two Differentiators

**1. Capture speed: sub-3-second log from any context.**
The single biggest pain among the 22-interview cohort is the friction of opening Goodreads, searching, adding, tagging, exiting. Brainshelf wins if the team can get from "I just finished or want to remember this book" to "logged" in under three seconds, including book metadata resolution. Sam's mobile and offline-first engineering background makes this deliverable.

**2. Personal recall: surface what you've read and what you thought.**
The second consistent pain is "did I already read this?" at the bookstore or "what did I think of that book my friend recommended?" later. Brainshelf wins if it answers those questions faster and more confidently than any alternative, including memory and paper journals. The 22 interviews repeatedly named recall friction; Riley's network confirms the same pattern.

## 2x2 Differentiation Chart

```text
                  HIGH Personal Recall
                          |
                          |
                          |          [Brainshelf]
                          |              .
                          |
                          |
  HIGH Capture Speed  +  LOW Capture Speed
                          |
                          |              [Goodreads]
                          |              [StoryGraph]
                          |              [LibraryThing]
       [Bookly]           |
       (capture speed     |
        decent, low       |              [Paper journal]
        personal recall)  |              (HIGH personal recall via re-reading
                          |               notes, but LOW capture)
                          |
                  LOW Personal Recall
```

Customer plotted alternatives:

- **Goodreads, StoryGraph, LibraryThing**: clustered low-speed, low-recall. The social-feed gravity pulls away from both axes.
- **Bookly**: stats-focused; reasonable capture, but no recall.
- **Paper journal**: high recall via re-reading; very low capture speed.
- **"Do nothing" baseline**: off-chart; zero on both axes.

Brainshelf occupies the unoccupied upper-right quadrant: high capture speed AND high personal recall.

## Decision Principles

The team committed to five principles that operationalize the differentiation:

1. **Capture is the first-class action.** Every other feature waits behind a fast capture path.
2. **Private by default; sharing is opt-in.** No feed, no friend graph, no public profile in v1.
3. **Personal recall over social validation.** The product's success metric is "did I find what I needed when I needed it," not "how many friends saw my activity."
4. **Surface what's relevant when it matters.** At the bookstore. At a recommendation moment. After finishing. Not on a notification schedule.
5. **Beautiful only if it's also fast.** Visual library is a wish-list feature; if it slows capture, it doesn't ship.

## Mini Manifesto

> **Brainshelf is for people who read a lot and want a tool that respects that.**
>
> We believe reading is a personal practice. We don't think your reading should be a feed. We don't think your library should be public unless you want it to be. We don't think tracking should feel like a gym log.
>
> We're building the fastest way to capture a book and the most useful way to recall what you've read. Nothing more. Nothing that gets in the way of those two things.
>
> If you read 25 books a year and want them to stay with you, this is for you. If you want social validation around your reading, there are good tools for that, and we're not one of them.

## Note-and-Vote Trace (Decisions Made This Afternoon)

| Decision | Options considered | Outcome |
|---|---|---|
| Two differentiators to commit to | Capture speed / Private-by-default / Personal recall / Offline-first / Visual library | Capture speed + Personal recall (Decider supervote after 4-way tie at score 13) |
| Decision principles count | 3 / 5 / 7 | 5 (Decider call) |

Rationale for Decider supervote on differentiators: "private-by-default" was scored equally but operationally is encoded in the decision principles. Choosing "capture speed + personal recall" makes the chart legible to customers, who care about outcomes (speed, recall) more than mechanics (private).

## Decider Checkpoint

**Decider sign-off required before Day 1 ends.**

- [x] Jamie confirms capture speed + personal recall as the two committed differentiators.
- [x] Jamie confirms the 2x2 chart is the canonical positioning artifact for Day 2.
- [x] Jamie confirms the 5 decision principles are non-negotiable for Approach Options tomorrow.
- [x] Jamie signs the Mini Manifesto as the Day 1 strategic summary.

**Signed:** Jamie (founder, PM), 2026-05-13 16:55 PT

</details>
