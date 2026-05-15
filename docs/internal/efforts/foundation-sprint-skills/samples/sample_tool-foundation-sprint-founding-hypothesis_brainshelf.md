---
skill: tool-foundation-sprint-founding-hypothesis
thread: brainshelf_book-catalog
scenario: Day 2 end Founding Hypothesis ratification
status: spec-validation draft
purpose: Sample output for design validation; not a library sample
spec_section: foundation-sprint-design-spec.md section 7
prerequisite_artifact: sample_tool-foundation-sprint-magic-lenses_brainshelf.md
---

# Foundation Sprint Founding Hypothesis: Brainshelf (Day 2 End)

## Founding Hypothesis

> **If we help people who read 25-plus books a year and treat their personal library as memory rather than identity solve "I can't remember what I've read or what I want to read next" with sub-3-second camera-first capture into a private library, they will choose it over Goodreads, StoryGraph, paper journals, and doing nothing because our solution is the fastest way to capture a book and the most useful way to recall what they've read.**

Conforms to the canonical template:
- Target customer: people who read 25+ books a year, treat library as memory
- Important problem: can't remember what they've read or want to read next
- Approach: sub-3-second camera-first capture into a private library (Approach A from Magic Lenses)
- Alternatives: Goodreads, StoryGraph, paper journals, doing nothing
- Differentiators: fastest capture, most useful recall

## Assumption Scorecard

Ratified 5-7 assumptions (per Decision 4 in the integration plan; recommended range, no enforcement).

| # | Assumption | Why it matters | Current confidence | Best next test |
|---|---|---|---|---|
| A1 | 25+ books/year readers are switchable from "do nothing" with sub-3-second capture | If false, no capture-speed product can win this segment | Medium | Design Sprint Friday testing (5 customers) |
| A2 | Camera-OCR + cover-recognition can achieve sub-3-second resolution at acceptable accuracy | If false, the differentiation collapses | Medium-high | Thursday prototype build with real OCR API |
| A3 | "Personal recall" is a strong-enough draw without social features | If false, customers churn after initial novelty | Medium | Test recall flow with prototype; post-test interview |
| A4 | Target customer can be reached through organic channels (Riley's network, content) | If false, CAC pressure forces premature monetization | High | Founder-led growth test post-DS |
| A5 | Paid sync + cross-device monetization model resonates | If false, business model unclear | Medium | Concept-pricing question in Friday script |
| A6 | "Did I already read this?" is felt strongly enough to drive recall use cases | If false, the personal recall pillar is weaker than thought | High | Friday context-question: "When did you last want to know if you'd read something?" |

## Why We Believe This

1. **22 customer interviews surfaced the same two pains repeatedly:** forgetting books and friction with current tools. The Founding Hypothesis directly addresses both.
2. **Riley's network is a credible distribution channel** for the target segment.
3. **The team's existing capabilities** (Alex on fast-capture UX, Sam on mobile + offline) match the chosen differentiators.
4. **The "do nothing" baseline is high** for this segment, meaning a 10x-better tool can win without displacing an entrenched competitor.
5. **The differentiation is observable to customers** (speed, recall) rather than internal-team metrics (architectural elegance).

## What Could Prove Us Wrong

1. **Customers nod but don't capture.** "Yes, this looks fast" in interviews but no usage in real life.
2. **OCR accuracy is below acceptable.** Customers see 1-in-5 mis-resolutions and lose trust.
3. **Personal recall is a feature, not a habit.** Customers capture once and never come back to recall.
4. **Camera-first is awkward in real contexts.** People feel weird scanning books in a bookstore (Approach D's premise) but also weird scanning at home.
5. **Reading 25+ books/year segment is too small.** TAM-too-narrow for a venture-scale company.

## Recommended Next Validation Step

**Run a Design Sprint week of 2026-05-26 with the Yellow Camera-First Capture top bet as the prototype direction.**

Sprint challenge: "Will personal-collection enthusiasts adopt low-friction camera-first capture into a private library over the alternatives they use today?"

Sprint questions (drawn from the scorecard):
- Do customers capture in the 5-day post-test, not just in the session? (tests A1)
- Does the OCR + cover-recognition resolve fast and accurately enough? (tests A2)
- Does the recall flow feel useful, not gimmicky? (tests A3)
- Does the pricing concept resonate? (tests A5)

Customer recruiting: Riley pulls 5 participants from her book-blogger Discord matching the target profile.

If the Design Sprint produces strong signal, the team proceeds to a build-phase MVP. If it produces weak signal on A1 or A3, the team falls back to the Red Bookstore Mode backup. If signal is mixed, a second Design Sprint refines the prototype before commitment.

## Decider Checkpoint

**Decider sign-off required to close the Foundation Sprint.**

- [x] Jamie ratifies the Founding Hypothesis sentence verbatim.
- [x] Jamie confirms the 6-row assumption scorecard.
- [x] Jamie commits to running a Design Sprint week of 2026-05-26 as the next test.
- [x] Jamie acknowledges the backup plan (Red Bookstore Mode) is real, not theoretical.
- [x] Jamie acknowledges the team will not re-litigate the social-reader direction without explicit invalidation evidence from the Design Sprint.

**Signed:** Jamie (founder, PM), 2026-05-14 16:55 PT.

**Foundation Sprint closed.**

---

*This sample represents the output a single invocation of `/tool-foundation-sprint-founding-hypothesis` would produce. Spec section: `foundation-sprint-design-spec.md` section 7.*
