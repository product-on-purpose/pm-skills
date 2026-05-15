---
title: "Note-and-Vote: Brainshelf Target Customer Selection"
description: "A single Note-and-Vote invocation during Brainshelf Foundation Sprint Day 1 morning. The team chose books-as-memory readers as the target customer over four alternatives."
artifact: note-and-vote
version: "1.0"
repo_version: "2.15.0"
skill_version: "0.1.0"
created: 2026-05-14
status: sample
thread: brainshelf
context: "Brainshelf Day 1 AM target customer decision; sample invocation of the standalone decision tool"
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

The Brainshelf team is in Day 1 morning of their Foundation Sprint. The first sub-decision in Basics is target customer. Jamie invokes `tool-note-and-vote` to facilitate the silent-then-vote-then-supervote protocol.

## Decision Question

> Of the candidate target customers we have surfaced from our 22 interviews, which one should the Brainshelf Foundation Sprint commit to for Day 1 Basics?

## Time Allocation

| Step | Duration |
|---|---|
| Framing | 1 min |
| Silent ideation | 5 min |
| Silent voting | 3 min |
| Discussion | 7 min |
| Decider supervote | 1 min |
| **Total** | **17 min** |

## Voting Method

Multi-vote (each participant gets 2 dots); Decider gets an additional supervote that overrides ties or surfaces a different choice. Attribution is on (small team, prior agreement).

## Silent Ideation Board

**Jamie** (09:14):
- Individual collectors (read alone, library is for self)
- Active social readers (book clubs, friend recommendations, Goodreads survivors)

**Alex** (09:14):
- People who read on multiple formats (audio + kindle + paper) and lose track across formats
- "Book hoarders" who own more than they have read

**Sam** (09:15):
- Readers who hit Goodreads churn point (3+ months in, dropped because of social pressure)
- People who track in spreadsheets today (highest existing friction tolerance)

**Riley** (09:15):
- Book club coordinators (manage 5-20 people's reading)
- Romance / genre readers (high volume, repeat behavior)
- People who read 25+ books/year and treat books as memory (NOT identity)

## Vote Summary

| Option | Votes | Voted by |
|---|---|---|
| 25+ books/year, books-as-memory readers (Riley) | 3 | Jamie, Alex, Riley |
| Individual collectors (Jamie) | 1 | Alex |
| Active social readers (Jamie) | 1 | Sam |
| Multi-format readers (Alex) | 1 | Jamie |
| Goodreads churn readers (Sam) | 1 | Riley |
| Book club coordinators (Riley) | 0 | - |
| Romance / genre readers (Riley) | 0 | - |
| Spreadsheet trackers (Sam) | 0 | - |
| "Book hoarders" (Alex) | 0 | - |

**Total votes cast:** 8 (4 participants x 2 dots each)

## Discussion Notes

- **Books-as-memory readers (top option)**: Riley argued this framing absorbs individual collectors and Goodreads churners as adjacent segments. Confirmed by Jamie and Alex against the pattern from the 22 interviews.
- **Sam's social-readers vote**: "I voted for it because we know that segment well via Riley, but I'm convinced by the discussion that this is the easier, lower-leverage choice."
- **Alex's individual-collectors vote**: "I think individual collectors and books-as-memory readers are mostly the same person framed differently. I'm comfortable folding."
- **Riley's Goodreads-churn vote**: "These are real people but they are a sub-segment of the books-as-memory people. They prove the segment but don't define it."
- **Surprise**: nobody voted for book club coordinators despite Riley's network advantage in that segment. Distribution access does not equal product-market-fit.

## Decision Record

**Decision:** Brainshelf's target customer for Foundation Sprint Basics is **people who read 25 or more books a year and treat their personal library as memory rather than identity**.

**Decider:** Jamie (founder, PM)

**Decider rationale:** "Books-as-memory readers (25+ books/year). Reading is a personal practice for these people, not a social one. That's the customer Brainshelf serves."

**Alternatives explicitly considered and rejected:**

- Active social readers (rejected: well-served by Goodreads; we can't out-Goodreads Goodreads)
- Book club coordinators (rejected: distribution access does not equal product-market-fit)
- Romance / genre readers (rejected: high volume but not the books-as-memory framing)
- "Book hoarders" (rejected: subset of books-as-memory; not distinct enough)
- Spreadsheet trackers (rejected: too small a niche)

**Confidence:** High. Three of four voters aligned independently; Decider rationale matches the customer interview synthesis.

**Signed:** Jamie (Decider), 2026-05-13 09:30 PT

## Decider Checkpoint

**Decider sign-off required before Basics continues to Important Problem.**

- [x] Jamie confirms the target customer decision will hold for the remainder of the sprint.
- [x] Jamie acknowledges what was chosen against.
- [x] Sam, Alex, Riley confirm they can commit to designing for this customer for Day 1 PM Differentiation.
- [x] Jamie names revisit condition: re-vote only if Day 1 PM differentiation cannot find a coherent position for this customer segment.
