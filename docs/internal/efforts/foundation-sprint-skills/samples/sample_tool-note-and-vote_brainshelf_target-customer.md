---
skill: tool-note-and-vote
thread: brainshelf_book-catalog
scenario: Single invocation during Foundation Sprint Day 1 morning Basics to choose target customer
status: spec-validation draft
purpose: Sample output for design validation; not a library sample
spec_section: foundation-sprint-design-spec.md (cross-skill usage in Basics); also documented in design-sprint-design-spec.md historical section
note: tool-note-and-vote is a standalone tool, not a family member of foundation-sprint-skills or design-sprint-skills. This sample lives in the FS samples folder because the FS integration plan ships tool-note-and-vote.
---

# Note-and-Vote: Brainshelf Target Customer Selection

## Decision Question

> Of the candidate target customers we've surfaced from our 22 interviews, which one should the Brainshelf Foundation Sprint commit to for Day 1 Basics?

## Time Allocation

- Silent ideation: 5 minutes
- Silent voting: 3 minutes
- Discussion: 7 minutes
- Decider supervote: 1 minute

**Total: 16 minutes** (within the 20-30 minute timebox).

## Voting Method

Multi-vote (each participant gets 2 dots); Decider gets an additional supervote that overrides ties or surfaces a different choice.

## Silent Ideation Board

Each participant contributed independently. Contributions (timestamped):

**Jamie** (09:14):
- Individual collectors (read alone, library is for self)
- Active social readers (book clubs, friend recommendations, Goodreads survivors)

**Alex** (09:14):
- People who read on multiple formats (audio + kindle + paper) and lose track across formats
- "Book hoarders" who own more than they've read

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
| Active social readers (Jamie) | 1 | Sam |
| Multi-format readers (Alex) | 1 | Jamie |
| Goodreads churn readers (Sam) | 1 | Riley |
| Book club coordinators (Riley) | 0 | - |
| Romance / genre readers (Riley) | 0 | - |
| Spreadsheet trackers (Sam) | 0 | - |
| "Book hoarders" (Alex) | 0 | - |
| Individual collectors (Jamie) | 1 | Alex |

8 votes total (4 participants x 2 dots).

## Discussion Notes

**Sam's social-readers vote:** "I voted for it because we know that segment well via Riley, but I'm convinced by the discussion that this is the easier, lower-leverage choice. Social readers are well-served by Goodreads. We can't out-Goodreads Goodreads."

**Alex's individual-collectors vote:** "I think individual collectors and 'books-as-memory readers' are mostly the same person framed differently. I'm comfortable folding."

**Riley's Goodreads-churn vote:** "These are real people but they're a sub-segment of the books-as-memory people. They've already validated the pain by leaving Goodreads. They prove the segment but don't define it."

**Jamie's multi-format vote:** "Format-spanning is a feature requirement, not a segmenting axis. Most heavy readers cross formats."

Consensus emerging: the books-as-memory framing is the strongest. It absorbs individual collectors and Goodreads churners as adjacent segments.

## Decider Supervote

**Jamie:** "Books-as-memory readers (25+ books/year). Reading is a personal practice for these people, not a social one. That's the customer Brainshelf serves."

## Decision Record

**Decision:** Brainshelf's target customer for Foundation Sprint Basics is **people who read 25+ books a year and treat their personal library as memory rather than identity**.

**Alternatives explicitly considered and rejected:**
- Active social readers (Goodreads-style use case)
- Book club coordinators
- Romance / genre readers
- "Book hoarders"
- Spreadsheet trackers

**Why this decision survives later challenge:** because individual collectors, Goodreads churners, and multi-format readers are subsets of the chosen customer. Choosing this framing lets the team build for the broadest internally-coherent group without diluting the strategic focus.

**Signed:** Jamie (Decider), 2026-05-13 09:30 PT

## Decider Checkpoint

**Decider sign-off required before Basics continues to Important Problem.**

- [x] Jamie confirms the target customer decision will hold for the remainder of the sprint.
- [x] Jamie acknowledges that if Basics surfaces evidence the books-as-memory framing is wrong, the team will re-vote.
- [x] Sam, Alex, Riley confirm they can commit to designing for this customer for Day 1 PM Differentiation.

---

*This sample represents the output a single invocation of `/tool-note-and-vote` would produce. Spec coverage: cross-skill usage in `foundation-sprint-design-spec.md` Basics section; standalone tool contract in `foundation-sprint-integration-plan.md` Task 6.*
