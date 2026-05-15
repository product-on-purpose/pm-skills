---
skill: tool-design-sprint-test-and-score
thread: brainshelf_book-catalog
scenario: Friday's bundled artifact (interview observations, scorecard, decisions, hot takes, next-step memo)
status: spec-validation draft
purpose: Sample output for design validation; not a library sample
spec_section: design-sprint-design-spec.md section 7
prerequisite_artifact: sample_tool-design-sprint-prototype-plan_brainshelf.md
---

# Design Sprint Test and Score: Brainshelf (Friday)

## Per-Customer Interview Observations

Compressed for readability. Full Miro notes preserved in board.

### Customer 1 (09:30-10:30) - "Maya," ex-Goodreads, 35 books/year
- Found camera unaided in 8 seconds. "Oh, you just point at it?"
- First capture: 4.2 seconds end-to-end. OCR correctly resolved "Project Hail Mary."
- Second capture: 2.8 seconds. Visibly delighted.
- Recall search: found "Project Hail Mary" instantly via search.
- Did NOT discover "Have I read this?" framing without nudge; said "I'd usually open Goodreads."
- Reaction to private-by-default: "Finally."
- Pricing: "Yeah, $5 a month is fine if it works."
- **Did NOT explore the library beyond captured books.** Treated it as a capture tool, not a recall tool.

### Customer 2 (11:00-12:00) - "Derek," paper-journal user, 40 books/year
- Found camera in 3 seconds. "This is what I've wanted."
- First capture: 3.4 seconds. OCR correctly resolved.
- Second capture: 2.1 seconds. Smiled.
- Recall search: typed "Andy Weir," surprised it autocompleted from his captures.
- Asked: "What about notes? I write a lot in my journal."
- Reaction to private-by-default: positive but unsurprised. "Why else would I use it?"
- Pricing: hesitant; "I'd want to try free for longer than 50 books."
- Spent 4 minutes exploring library view, asking about edit/notes flow.

### Customer 3 (13:30-14:30) - "Priya," StoryGraph migrant, 28 books/year
- Found camera in 12 seconds. Briefly confused by lack of search field on launch.
- First capture: 5.0 seconds (OCR failed on a non-bestseller; tap-to-correct used).
- Second capture: 3.1 seconds.
- Recall search: used easily.
- Asked: "Where are my friends?" then laughed when Riley explained the private framing.
- Reaction to private-by-default: mixed. "I get it, but I worry I'd forget about it."
- Pricing: "Probably yes if recall worked great."
- Notable: spent significant time looking for a "rate this" feature; didn't find it; said "I wouldn't miss it but it's weird not to have."

### Customer 4 (15:00-16:00) - "Tom," spreadsheet tracker, 50 books/year
- Found camera in 5 seconds.
- First capture: 3.0 seconds. OCR correct.
- Second capture: 2.4 seconds.
- Recall search: instant. "Yes. This is what my spreadsheet wishes it was."
- Reaction to private-by-default: strong positive. "I've been waiting for someone to build this."
- Pricing: "Take my money."
- Asked about CSV export, audiobook support, multi-device sync. Pre-sold.

### Customer 5 (16:30-17:30) - "Sarah," self-described "lapsed reader," 22 books/year
- Found camera in 18 seconds. Took time exploring screen.
- First capture: 6.5 seconds. OCR resolved correctly but visibly hesitant.
- Second capture: 3.8 seconds.
- Recall search: used after prompting.
- Reaction to private-by-default: neutral. "I don't really share my reading anyway."
- Pricing: "I'd start free. Probably stick with free."
- Notable: lower commitment overall. Hit closest to the segment edge (22 books/year, below the 25+ target).

## Best Quotes

- Maya: "Oh, you just point at it?"
- Derek: "This is what I've wanted."
- Priya: "I get it, but I worry I'd forget about it." (privacy reaction)
- Tom: "Take my money."
- Maya again: "I'd usually open Goodreads." (recall trigger)

## Scorecard Grid

Each row = one sprint question. Each cell = Yes / No / Mixed signal from that customer. Day-end decision in last column.

| Q | C1 Maya | C2 Derek | C3 Priya | C4 Tom | C5 Sarah | Decision |
|---|---|---|---|---|---|---|
| Q1: Attempt capture unaided | Y | Y | Y | Y | Y (slow) | **Yes** (5/5; minor friction on first launch) |
| Q2: Camera-first feels intuitive | Y | Y | M | Y | M | **Yes** (3 clear, 2 mixed; design polish needed) |
| Q3: OCR fast and accurate enough | Y | Y | N (1 fail) | Y | Y | **Mostly yes** (1 OCR miss out of 10; tap-to-correct worked) |
| Q4: Recall flow useful | Y (with nudge) | Y | Y | Y | M | **Mostly yes** (5/5 used search; 1 needed nudge to discover) |
| Q5: Private-by-default positive | Y | Y | M | Y | Neutral | **Yes** (3 strong positive, 1 mixed, 1 neutral; no negatives) |
| Q6: Pricing reasonable | Y | M | Y | Y | M (free) | **Mixed** (3 yes, 2 want longer free) |
| Q7: Would come back to capture in own life | (follow-up) | (follow-up) | (follow-up) | (follow-up) | (follow-up) | **Pending** (5-day instrumented follow-up) |

## Observed Patterns (Worked, Hesitated, Broke Trust, Unexpected)

**Worked:**
- Capture flow as designed; sub-3-second times after first capture.
- Apple Vision OCR accuracy at ~90%.
- Library view at first.
- Private-by-default framing landed for the target segment.

**Hesitated:**
- First-launch discovery of camera-first (Sarah, Priya took longest).
- Discovering "Have I read this?" search without prompt.

**Broke trust:**
- Priya's OCR failure: tap-to-correct worked but cost momentum.

**Unexpected:**
- Maya said she'd "open Goodreads" for recall even after using ours; muscle memory matters.
- Derek wanted note-taking immediately; he's a power user we hadn't designed for.
- Priya looked for ratings; absence is noticed even by people who don't use them.

## Hot Takes (Each Team Member)

**Alex:** "The capture flow is right. The recall flow needs ambient surfaces, not just search. We should add a 'recently captured' band at the bottom of every screen."

**Sam:** "OCR is good enough today. The 1 failure was a small-press cover. We can probably get to 95% with cover-DB fallback. Capture speed under 3 seconds after first use is real."

**Jamie:** "Books-as-memory framing is validated. Customers explicitly described their use case in those words. Goodreads-recall muscle memory is real but solvable through habit-building. Pricing is mixed but not a blocker."

**Riley:** "Sarah was the edge of segment and the weakest signal. Tightening to 25+/year strict cuts her out. Customers 1-4 are who we're building for, and they all want this."

## Decider Summary

**Decider call:** **Build.**

**Highest-confidence learning:** Camera-first capture lands hard with books-as-memory readers (Customers 1-4). The Founding Hypothesis core (sub-3-second capture as the wedge) is validated.

**Most important revision before build:** Add ambient recall surfaces (recently-captured strip; suggested actions on past captures) so recall is not search-dependent. This addresses Maya's Goodreads-muscle-memory feedback.

**Next artifact:** 6-week MVP build plan, starting Monday June 2. Target launch: TestFlight beta with the 5 sprint participants by July 14.

**Pivot considered but rejected:** Red Bookstore Mode backup is NOT activated. Yellow Camera-First Capture passes the test.

**Open follow-up (Sprint Question 7):** Instrument the prototype for the 5 customers to use over the next 7 days. If retention is over 60% (3 of 5 capture in their own life), the build commitment hardens. If retention is below 40%, the team revisits before week 2 of the build.

## Decider Checkpoint

**Decider sign-off required to close the Design Sprint.**

- [x] Jamie ratifies "Build" verdict.
- [x] Jamie commits to the highest-confidence learning and the most important revision.
- [x] Jamie names the next artifact (6-week MVP build plan).
- [x] Jamie acknowledges the 7-day follow-up retention gate (60% / 40% thresholds).
- [x] Jamie names Alex as post-sprint owner of the build plan (due Monday June 2).

**Signed:** Jamie (Decider), 2026-05-30 16:25 PT.

**Design Sprint closed.**

---

*This sample represents the output a single invocation of `/tool-design-sprint-test-and-score` would produce. Spec section: `design-sprint-design-spec.md` section 7.*
