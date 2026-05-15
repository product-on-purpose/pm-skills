---
skill: tool-foundation-sprint-differentiation
thread: brainshelf_book-catalog
scenario: Day 1 afternoon Differentiation bundled artifact
status: spec-validation draft
purpose: Sample output for design validation; not a library sample
spec_section: foundation-sprint-design-spec.md section 4
prerequisite_artifact: sample_tool-foundation-sprint-basics_brainshelf.md
---

# Foundation Sprint Differentiation: Brainshelf (Day 1 Afternoon)

## Scored Differentiator Candidates

The team scored 11 candidate differentiators along customer-perceived dimensions. Scoring scale: 1 (weak signal of value) to 5 (very strong signal).

| Differentiator | Customer pull | Team can deliver | Hard to copy | Score |
|---|---|---|---|---|
| Capture speed (sub-3-second log) | 5 | 5 | 3 | 13 |
| Private-by-default | 4 | 5 | 4 | 13 |
| Personal recall (read this before? what did I think?) | 5 | 4 | 4 | 13 |
| Offline-first | 3 | 5 | 4 | 12 |
| Beautiful visual library | 3 | 4 | 2 | 9 |
| Cross-format (audio, paper, digital, library) | 4 | 3 | 2 | 9 |
| Curated recommendations | 4 | 2 | 1 | 7 |
| Social book club tools | 2 | 3 | 1 | 6 |
| Reading stats and gamification | 2 | 4 | 1 | 7 |
| Annotation export | 3 | 4 | 2 | 9 |
| Voice-first capture | 4 | 2 | 3 | 9 |

## Chosen Two Differentiators

**1. Capture speed: sub-3-second log from any context.**
The single biggest pain among the interview cohort is the friction of opening Goodreads, searching, adding, tagging, exiting. Brainshelf wins if the team can get from "I just finished or want to remember this book" to "logged" in under three seconds, including book metadata resolution.

**2. Personal recall: surface what you've read and what you thought.**
The second consistent pain is "did I already read this?" at the bookstore or "what did I think of that book my friend recommended?" later. Brainshelf wins if it answers those questions faster and more confidently than any alternative, including memory and paper.

## 2x2 Differentiation Chart

```text
                  HIGH Personal Recall
                          |
                          |
                          |          [Brainshelf]
                          |              .
                          |
                          |
  HIGH Capture Speed  ----+----  LOW Capture Speed
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

- **Goodreads, StoryGraph, LibraryThing:** clustered low-speed, low-recall (the social-feed gravity pulls away from both).
- **Bookly:** stats-focused; reasonable capture, but no recall.
- **Paper journal:** high recall via re-reading; very low capture speed.
- **"Do nothing" baseline:** off-chart; zero on both axes.

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

---

*This sample represents the output a single invocation of `/tool-foundation-sprint-differentiation` would produce. Spec section: `foundation-sprint-design-spec.md` section 4.*
