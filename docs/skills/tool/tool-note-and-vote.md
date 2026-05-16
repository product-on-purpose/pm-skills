---
title: "Note-and-Vote"
description: "Structured group-decision mechanic that captures silent ideation, voting summaries, and Decider sign-off in a single bundled artifact. Use when a small team needs to make a fast decision with diverse input, when groupthink is a risk, or when a workshop moment demands silent contribution before discussion. Applicable to Foundation Sprint, Design Sprint, and any participatory decision context."
generated: true
source: scripts/generate-skill-pages.py
tags:
  - tool
  - coordination
---

:::note[Quick facts]
**Classification:** tool | **Version:** 0.1.0 | **Category:** coordination | **License:** Apache-2.0
:::

**Try it:** `/tool-note-and-vote "Your context here"`

Run a structured group decision in 20-30 minutes. Silent contribution surfaces independent thinking before group dynamics narrow the option space; explicit Decider supervote closes the choice. Produces a written audit trail of the decision and the alternatives considered.

## When to Use

- A small team (3-10 people) needs to make a fast decision with diverse input.
- Groupthink, status bias, or loudest-voice dominance is a real risk.
- A workshop or meeting moment demands silent ideation before open discussion.
- The decision needs an audit trail (what was considered, why the chosen option won).
- Decision authority is clear (a Decider exists and is in the room or available).
- Used heavily across Foundation Sprint and Design Sprint at decision moments.

## When NOT to Use

- A single person owns the decision and just needs to make it. Use direct judgment.
- Consensus has already emerged organically. The voting overhead adds friction without value.
- The decision is high-stakes enough to warrant longer deliberation (multi-day investigation, written proposals, formal review). Note-and-Vote is a 25-minute tool, not a governance process.
- No Decider is available and the team has no authority to close the decision themselves. Defer until a Decider can attend.

## How to Use

Use the `/tool-note-and-vote` slash command:

```
/tool-note-and-vote "Your context here"
```

Or reference the skill file directly: `skills/tool-note-and-vote/SKILL.md`

## Output Template

# Note-and-Vote: [Decision name]

<!-- One-line summary of what this decision moment was. -->

## Decision Question

> [Verbatim question as posed to the team. One sentence, unambiguous, not compound.]

## Time Allocation

| Step | Duration |
|---|---|
| Framing | _ min |
| Silent ideation | _ min |
| Silent voting | _ min |
| Discussion | _ min |
| Decider supervote | _ min |
| **Total** | **_ min** |

## Voting Method

[Single-vote / Multi-vote (N votes per person) / Dot-vote with weighted dots. Note whether attribution is on or off.]

## Silent Ideation Board

[All contributions captured during the silent ideation step. Use a list, table, or grouped clusters depending on volume.]

**[Participant 1]** ([timestamp]):
- [Contribution]
- [Contribution]

**[Participant 2]** ([timestamp]):
- [Contribution]

[Continue per participant. If attribution is off, omit names and list contributions by cluster.]

## Vote Summary

| Option | Votes | Voted by |
|---|---|---|
| [Option text] | N | [Names or anonymous count] |
| [Option text] | N | [Names or anonymous count] |
| [Option text] | N | [Names or anonymous count] |

**Total votes cast:** [N participants x M votes each = total]

## Discussion Notes

[Brief rationale that surfaced during the 5-10 minute discussion. Focus on WHY voters chose the top 2-3 options, not relitigation of the question.]

- **[Top option]**: [Voter or voters explained their rationale was...]
- **[Second option]**: [Rationale...]
- **[Surprise or contradiction]**: [Anything the discussion revealed that the vote alone did not.]

## Decision Record

**Decision:** [Chosen option, verbatim]

**Decider:** [Name, role]

**Decider rationale** (if non-obvious or diverges from top vote): [One or two sentences explaining the supervote.]

**Alternatives explicitly considered and rejected:**

- [Alternative 1] (rejected because [reason])
- [Alternative 2] (rejected because [reason])
- [Other alternatives if relevant]

**Confidence:** [High / Medium / Low. If Medium or Low, note what would increase confidence and when the team revisits.]

**Signed:** [Decider name], [ISO date and local time]

## Decider Checkpoint

**Decider sign-off required before [the next sprint move or decision moment].**

- [ ] Decider confirms the decision will hold for the remainder of the [sprint / meeting / workshop].
- [ ] Decider acknowledges what was chosen against (the explicit alternatives).
- [ ] Team confirms they can commit to executing on this decision in [the next move].
- [ ] (Optional) Decider names a revisit condition: under what evidence the team would re-vote.

## Example Output

<details>
<summary>Note-and-Vote: Brainshelf Target Customer Selection</summary>

# Note-and-Vote: Brainshelf Target Customer Selection

A single Note-and-Vote invocation during Day 1 morning of the Brainshelf Foundation Sprint. The team needed to choose a target customer before proceeding to important-problem framing.

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

- **Books-as-memory readers (top option)**: Riley argued this framing absorbs individual collectors and Goodreads churners as adjacent segments. The other voters (Jamie, Alex) confirmed this matches the pattern from the 22 interviews.
- **Sam's social-readers vote**: "I voted for it because we know that segment well via Riley, but I'm convinced by the discussion that this is the easier, lower-leverage choice. Social readers are well-served by Goodreads. We can't out-Goodreads Goodreads."
- **Alex's individual-collectors vote**: "I think individual collectors and books-as-memory readers are mostly the same person framed differently. I'm comfortable folding."
- **Riley's Goodreads-churn vote**: "These are real people but they're a sub-segment of the books-as-memory people. They've already validated the pain by leaving Goodreads. They prove the segment but don't define it."
- **Surprise**: nobody voted for book club coordinators despite Riley's network advantage in that segment. Confirms that distribution access does not equal product-market-fit.

## Decision Record

**Decision:** Brainshelf's target customer for Foundation Sprint Basics is **people who read 25 or more books a year and treat their personal library as memory rather than identity**.

**Decider:** Jamie (founder, PM)

**Decider rationale:** "Books-as-memory readers (25+ books/year). Reading is a personal practice for these people, not a social one. That's the customer Brainshelf serves."

**Alternatives explicitly considered and rejected:**

- Active social readers (rejected: well-served by Goodreads; we can't out-Goodreads Goodreads)
- Book club coordinators (rejected: distribution access does not equal product-market-fit)
- Romance / genre readers (rejected: high volume but not the books-as-memory framing)
- "Book hoarders" (rejected: subset of books-as-memory; not distinct enough to be its own segment)
- Spreadsheet trackers (rejected: too small a niche)

**Confidence:** High. Three of four voters aligned independently; Decider rationale matches the customer interview synthesis. The team will not re-vote on this during the sprint without explicit invalidation evidence.

**Signed:** Jamie (Decider), 2026-05-13 09:30 PT

## Decider Checkpoint

**Decider sign-off required before Basics continues to Important Problem.**

- [x] Jamie confirms the target customer decision will hold for the remainder of the sprint.
- [x] Jamie acknowledges what was chosen against (social readers, book club coordinators, romance/genre, hoarders, spreadsheet trackers).
- [x] Sam, Alex, Riley confirm they can commit to designing for this customer for Day 1 PM Differentiation.
- [x] Jamie names the revisit condition: re-vote only if Day 1 PM differentiation cannot find a coherent position for this customer segment.

</details>
