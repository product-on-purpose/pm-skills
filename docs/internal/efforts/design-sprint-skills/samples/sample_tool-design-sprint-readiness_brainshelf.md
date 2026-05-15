---
skill: tool-design-sprint-readiness
thread: brainshelf_book-catalog
scenario: Pre-sprint readiness assessment two weeks after Foundation Sprint
status: spec-validation draft
purpose: Sample output for design validation; not a library sample
spec_section: design-sprint-design-spec.md section 1
prerequisite_artifact: foundation-sprint-skills/samples/sample_tool-foundation-sprint-founding-hypothesis_brainshelf.md
---

# Design Sprint Readiness Assessment: Brainshelf

## Inputs Captured

**Challenge description:**
> Test whether people who read 25+ books a year and treat their library as memory will adopt sub-3-second camera-first capture into a private library, over the alternatives they use today (Goodreads, StoryGraph, paper, doing nothing).

**Existing hypothesis (from Foundation Sprint):**
The Founding Hypothesis ratified 2026-05-14 (see `foundation-sprint-skills/samples/sample_tool-foundation-sprint-founding-hypothesis_brainshelf.md`). Top bet: Approach A (Yellow Camera-First Capture). Backup: Approach D (Red Bookstore Mode). Six-row assumption scorecard identifies A1 ("readers are switchable from 'do nothing' with sub-3-second capture") as the highest-risk assumption.

**Customer access status:** Riley's book-blogger Discord (~12k members). Riley estimates she can recruit 8 candidate participants from the books-as-memory segment within 1 week, screen down to 5 for Friday. Compensation budget: $50 gift card per interview.

**Decider availability:** Jamie commits Monday + Wednesday afternoon (Supervote) + Friday in full. Tuesday + Thursday: cameo for critical moments only (sketches review, prototype trial run).

**Team composition draft:**
- Jamie (Decider, PM) - full Mon, Wed PM, Fri; cameo Tue, Thu
- Alex (design + storyboard lead) - all 5 days
- Sam (engineering + prototype build) - all 5 days
- Riley (customer expert + interviewer) - all 5 days (interviewer Friday)
- No additional team members needed; team is the team.

## Readiness Verdict: **Go**

The team meets the canonical readiness criteria for a Design Sprint:

| Criterion | Status | Notes |
|---|---|---|
| Challenge selected | PASS | Test top bet from Foundation Sprint |
| Challenge is specific enough | PASS | Bounded to capture-speed + recall test with target segment |
| Decider confirmed | PASS | Jamie's availability covers Monday, Wednesday Supervote, Friday |
| Team recruited | PASS | 4 people, within Character's recommended max of 7 |
| Expert interviews scheduled | N/A | Team has domain knowledge; no cameo experts needed |
| Customer recruiting started | IN PROGRESS | Riley has 3 commits, 2 pending, target 5 by Thursday |
| Research packet prepared | PASS | Foundation Sprint outputs + 22-interview synthesis + competitor cards |
| Logistics reserved | PASS | Hybrid setup matching Foundation Sprint |
| Calendar blocked | PASS | All four team members blocked May 26-30 |
| Post-sprint path exists | PASS | If Go on Friday, Brainshelf proceeds to a 6-week MVP build cycle |

## Diagnosis

Two yellow flags worth surfacing before Monday:

**1. Decider partial attendance on Tue and Thu.** Jamie attending only critical moments on Tuesday (sketches review) and Thursday (prototype trial run) is acceptable but tight. Alex is delegated authority for non-Decider-required calls on those days. Risk: if a Tuesday sketch debate slips into a strategic question, the team waits for Jamie or marks the question for Wednesday morning resolution.

**2. Customer recruiting is at 60%.** Three of five customers confirmed. Riley should hit 5 by Thursday noon (the cutoff per Sprint book guidance). If 5 are not confirmed by Thursday noon, the team postpones Friday or runs 4 interviews. The team will NOT push to Saturday or recruit emergency participants from non-target segments.

## Recommended Pre-Sprint Activities (week of May 19-23)

1. **Confirm remaining 2 participants** (Riley owns). Deadline: Thursday May 22 noon.
2. **Compile Monday materials**: Founding Hypothesis printed, scorecard printed, target customer profile printed for whiteboard reference.
3. **Pre-load Miro board** with Foundation Sprint outputs in a "context" panel; Day 1 working area separate.
4. **Confirm prototype tooling**: Figma + iOS device tethering for Thursday. Sam owns. Test the OCR API integration on Wednesday afternoon if possible (early de-risk).
5. **Block all calendars** May 26-30, including no Slack from leadership (just the team).
6. **Schedule Friday interview slots:** 5 x 60min, with 30min buffers. Riley sends calendar holds Monday May 19.

## Recommended Attendees

| Attendee | Role | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|---|
| Jamie | Decider, PM | required | cameo (sketches) | required (PM, Supervote) | cameo (trial run) | required |
| Alex | Design + storyboard | required | required | required | required (build) | required (observation) |
| Sam | Engineering + prototype | required | required | required | required (build) | required (observation) |
| Riley | Customer expert + interviewer | required | required | required | required | **interviewer** |

## Decider Checkpoint

**Decider sign-off required before customer recruiting finalizes.**

- [x] Jamie confirms Go verdict and acknowledges the partial-attendance risk.
- [x] Jamie delegates Tue + Thu non-strategic calls to Alex.
- [x] Jamie commits to Monday, Wednesday PM, Friday full-day presence.
- [x] Jamie agrees Friday will produce a build / iterate / re-sprint / stop / reframe decision; the sprint will not end without one.

**Signed:** Jamie (founder, PM), 2026-05-18 18:00 PT

---

*This sample represents the output a single invocation of `/tool-design-sprint-readiness` would produce. Spec section: `design-sprint-design-spec.md` section 1.*
