---
title: "Design Sprint Map and Target: Brainshelf Camera-Capture Validation"
description: "Brainshelf Monday artifact: long-term goal (3-year), 6 refined sprint questions, ASCII customer-system map covering capture-or-not + recall-pain arcs, 3 expert interview notes, 67 HMWs in 6 clusters, Jamie selects capture-plus-confirmation as target moment."
artifact: design-sprint-map-and-target
version: "1.0"
repo_version: "2.15.0"
skill_version: "0.1.0"
created: 2026-05-16
status: sample
thread: brainshelf
context: "Brainshelf pre-seed B2C SaaS for personal book collection management; Design Sprint week of 2026-06-01 testing Foundation Sprint assumption A1 (sub-3-sec camera-first capture switchability)"
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Monday 2026-06-01. The Brainshelf team is together for the full Monday workshop (Jamie + Sam in-person at Capitol Hill Coworking; Alex + Riley remote). The team invokes `tool-design-sprint-map-and-target` to converge from "five days of work ahead" to "this specific target moment is what we are prototyping."

## Long-Term Goal

Become the default way 25+/year readers remember and recall every book they have read or want to read, with no friction at capture time and total trust at recall time, within 3 years.

## Sprint Questions

The brief's 4 questions seed this list; the team refined wording during the morning and added Q5 + Q6 from the customer-map walkthrough.

1. Will 25+/year readers complete sub-3-second camera capture without abandoning, and is the resulting library something they describe as valuable for personal recall?
2. Does OCR + cover-recognition accuracy in the Figma prototype feel acceptable, or do mis-resolutions break trust?
3. When asked "what would you pay for this and how often?", do customers self-describe a sustainable price point above USD 4 per month?
4. Do customers describe "did I already read this?" as a frequent, painful problem?
5. When customers capture a book, do they understand within 15 seconds where it lives in their library and how to find it later?
6. Do customers see the value proposition as "fast capture" or as "trustworthy recall", and does the answer depend on use context (at home, at a bookstore, at a friend's house)?

## Customer or System Map

```
[25+/year reader] --> [encounters a book they want to remember]
                       (at home, bookstore, friend's house, online)
                                |
                                v
                         [decides to act on this book]
                                |
                  +-------------+-------------+
                  |             |             |
                  v             v             v
              [does nothing]  [buys]    [adds to system]
              (most common)              |
                                +--------+--------+--------+
                                |        |        |        |
                                v        v        v        v
                            [Goodreads] [StoryGraph] [paper] [memory only]
                                                              |
                                                              v
                                          (3-12 months later)
                                                              |
                                                              v
                                          [needs to recall: read or not? what was it about?]
                                                              |
                                                +-------------+-------------+
                                                |                           |
                                                v                           v
                                        [searches their system]    [does not find / gives up]
                                                |                           |
                                                v                           v
                                        [LONG-TERM GOAL]              [pain repeated]
                                        (recall succeeds, decision made)
```

**Key player:** 25+/year reader who treats personal library as memory rather than identity (cross-checked with the brief's target customer profile).

**Map narrative:** A 25+/year reader encounters a book they want to remember in any of 4 contexts (home, bookstore, friend's house, online). They decide whether to act; "do nothing" is the most common path today. If they act, they either buy the book (separate from the capture problem) or try to add it to some system. The current alternatives (Goodreads, StoryGraph, paper journals, memory only) all impose friction at capture; that friction is why "do nothing" wins so often. 3-12 months later, the reader hits the recall moment ("did I already read this? what was it about?") and either recovers the memory (long-term goal) or gives up (pain repeated).

## Expert Interview Notes

### Expert 1: Dr. Mira Chen, UX researcher who published 2024 study on mobile capture flows (15 min, 13:30 PT)

- Sub-3-second capture is the threshold below which users perceive the action as "free" rather than "transactional"; above 3 seconds, drop-off accelerates non-linearly.
- The "did it work?" feedback loop matters more than the capture speed itself. Users tolerate slightly slower capture if confirmation is unambiguous.
- HMW candidate: HMW make the post-capture confirmation feel like "yes, the book is in your library" rather than "processing"?

### Expert 2: Karen Iwasaki, indie bookstore owner with 15 years observing reader behavior (20 min, 14:00 PT)

- Readers who track books are usually motivated by social anxiety (book club Tuesday) or completion-anxiety (did I finish this trilogy?), not memory per se. Memory framing may not resonate.
- Counter-observation: a quieter cohort exists who track for personal recall (the books-as-memory framing); they often don't post on social platforms. They are hard to recruit but high-LTV.
- HMW candidate: HMW design the capture-and-recall loop so it feels rewarding without requiring social sharing as the reward mechanism?

### Expert 3: Devon Park, mobile engineer who shipped two camera-OCR products at scale (15 min, 14:30 PT)

- The Figma prototype CAN convincingly fake OCR if the team scripts the recognition to "succeed" for prepared books and "ask for correction" for others. Customers will believe the simulation if the latency feel is right.
- Real OCR shipping accuracy is 88-94% depending on lighting; below 85% trust collapses; above 92% trust is binary "always works."
- HMW candidate: HMW make the "ask for correction" path feel like a helpful collaboration rather than a failure?

## HMW Cluster Board

Total HMWs surfaced: 67 (team + expert interviews). Clustered into 6 themes. Heat-map vote via `tool-note-and-vote` with 5 dots per voter (4 voters; 20 dots total).

| Cluster | Theme | HMW count | Heat-map votes |
|---|---|---|---|
| C1 | Confirmation feedback at capture moment | 11 | 7 |
| C2 | Recall framing and the moment of remembrance | 14 | 6 |
| C3 | "Did I already read this?" detection and surfacing | 9 | 4 |
| C4 | Capture across contexts (home / bookstore / friend) | 12 | 2 |
| C5 | Social vs personal-only loop framing | 8 | 1 |
| C6 | Onboarding and first-library setup | 13 | 0 |

**Top cluster HMWs (verbatim):**

**C1: Confirmation feedback at capture moment (7 votes)**
- HMW make the post-capture confirmation feel like "yes, the book is in your library" rather than "processing"?
- HMW design the capture confirmation so a user knows within 1 second whether the system succeeded?
- HMW make a failed capture feel like a helpful correction moment rather than a system failure?
- HMW give the user enough trust in the capture that they don't feel the need to verify it later?

**C2: Recall framing and the moment of remembrance (6 votes)**
- HMW make the recall surface feel like browsing a personal bookshelf rather than searching a database?
- HMW surface "books I read that mentioned topic X" in under 5 seconds when the user asks?
- HMW make the recall surface compelling enough that users open it without a specific recall task in mind?
- HMW design the recall feedback so the user trusts they're seeing everything (no missed memories)?

**C3: "Did I already read this?" detection and surfacing (4 votes)**
- HMW detect a probable duplicate at capture time and surface "you already have this" warmly?
- HMW make the duplicate-check feel like a memory aid rather than a gating mechanism?
- HMW handle the ambiguous duplicate (same title, different edition or translation)?

## Target Moment

**Selected target:** The capture moment + the immediate post-capture confirmation surface (Steps 2 plus 3 on the map; the "decides to act" + "adds to system" transition). Wednesday's storyboard will cover this transition plus a 2-step recall flow from the confirmation surface.

**Decider rationale:** Jamie chose the capture-plus-confirmation moment over the recall-only moment for three reasons. First, the lead sprint question (Q1, FS-A1) lives here: if capture-plus-confirmation invalidates, the entire camera-first direction pivots regardless of how good recall would be. Second, C1 had the highest heat-map vote count (7), giving the team confidence the capture-confirmation pair is where the most reusable design insight lives. Third, the recall surface depends on the capture flow having produced meaningful captured books; testing recall in isolation would have required scripting fake library state for each customer.

**Sprint questions the target moment most directly tests:** Q1 (lead; sub-3-second capture without abandonment, library valuable for recall), Q2 (OCR accuracy + trust), and Q5 (capture-to-library-location understanding in 15 seconds).

Q3 (pricing) and Q4 (recall pain frequency) will be addressed in Friday's Act 2 (Context) and Act 5 (Debrief) of the Five-Act Interview, not directly via prototype testing. Q6 (capture vs recall as value prop) is addressed via observation across Friday's 5 interviews.

## Decider Checkpoint

**Decider sign-off required before Tuesday begins.**

- [x] Jamie confirms the long-term goal (3 years out; default way 25+/year readers remember and recall books).
- [x] Jamie confirms the final sprint questions (6; converted from brief's 4 plus 2 added during morning).
- [x] Jamie acknowledges the customer or system map represents the team's shared understanding (not "the truth"; Friday's interviews will adjust this understanding).
- [x] Jamie confirms the top HMW clusters from the heat-map vote (C1, C2, C3 will orient Wednesday's heat-map).
- [x] Jamie selects the target moment (capture + immediate post-capture confirmation; map Steps 2 + 3 transition; includes a 2-step recall flow from the confirmation surface).
- [x] Jamie commits to attending Wednesday morning 09:00-12:30 PT for heat-map plus supervote.

**Signed:** Jamie (founder, PM), 2026-06-01 16:55 PT.

**Monday closed. Tuesday sketches begin 09:00 PT 2026-06-02 against the capture-plus-confirmation target.**
