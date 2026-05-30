---
title: "Design Sprint Map and Target (Monday)"
description: "Day 1 (Monday) move of a Design Sprint that produces the bundled Monday artifact containing long-term goal, sprint questions (3-7 testable risks), customer or system map (5-15 step flow), expert interview notes, HMW (How Might We) cluster board, and the Decider's chosen target moment. Use Day 1 morning and afternoon after the sprint brief is locked. Sets the design target for Tuesday's sketches and Wednesday's storyboard."
generated: true
source: scripts/generate-skill-pages.py
tags:
  - tool
  - discovery
---

:::note[Quick facts]
**Classification:** tool | **Version:** 0.1.0 | **Category:** discovery | **License:** Apache-2.0
:::

**Try it:** `/pm-skills:tool-design-sprint-map-and-target "Your context here"`

Produce Monday's bundled artifact: the long-term goal that names success in 1-5 years; 3-7 sprint questions converting team fears into testable risks; a 5-15 step customer or system map from key player to outcome; expert interview notes from cameo experts run in parallel; HMW (How Might We) clusters synthesized from the team; and the Decider's chosen target moment. Monday's output becomes Tuesday's design target.

Family contract: [`docs/reference/skill-families/design-sprint-skills-contract.md`](../../reference/skill-families/design-sprint-skills-contract.md). This skill is a member of `design-sprint-skills`.

## When to Use

- It is Day 1 of the Design Sprint and the brief is locked (via `tool-design-sprint-brief`).
- The team is together (in-person, remote, or hybrid) for the full Monday workshop.
- Expert interviews are scheduled for Monday afternoon (cameo role; 15-30 minutes each).
- The team needs to converge from "five days of work ahead" to "this specific target moment is what we're prototyping."

## When NOT to Use

- The brief is not locked. Return to `tool-design-sprint-brief`; without sprint questions, this skill has nothing to converge toward.
- The challenge is so broad that "long-term goal" would be longer than 5 years. Return to problem framing.
- The team is missing the Decider. The target-moment selection at the end of Monday is the Decider's call; without that call the team disperses Tuesday with no agreed direction.
- The team has already pre-decided the target moment. Monday's value is in the convergence; if it's been pre-decided, Monday becomes ratification theater.

## How to Use

Invoke the skill by name (`/pm-skills:tool-design-sprint-map-and-target` on Claude Code, `$tool-design-sprint-map-and-target` on Codex):

```
/pm-skills:tool-design-sprint-map-and-target "Your context here"
```

Or reference the skill file directly: `skills/tool-design-sprint-map-and-target/SKILL.md`

## Output Template

# Design Sprint Monday Artifact: [Initiative or Challenge name]

<!-- Monday Map and Target bundled artifact. Captures the team's Day 1 convergence from sprint questions to target moment. Tuesday's sketches begin from the target moment. -->

## Long-Term Goal

[One sentence. 1-5 years out. Aspirational. Names the success state the team is sprinting toward, not the sprint output itself.]

## Sprint Questions

[3-7 questions converting team fears into testable risks. Phrased as "Can we... ?", "Will... ?", or "How... ?"; NOT phrased as solutions. The brief's locked sprint questions seed this list; the team refines and adds during the morning.]

1. [Question 1]
2. [Question 2]
3. [Question 3]
4. [Question 4]
5. [Question 5]

## Customer or System Map

```
[Key Player] --> [Step 1] --> [Step 2] --> [Step 3 (decision point)] --+--> [Step 4a] --> [...]
                                                                       |
                                                                       +--> [Step 4b] --> [...]
                                                                            (current alternative)
                                                                                    |
                                                                                    v
                                                                            [Long-term goal end state]
```

[5-15 step flow from Key Player on the left to the Long-Term Goal end state on the right. Include major actors, decision points, and current alternatives (the "do nothing" or competitor path). Use the whiteboard structure; render the final map as ASCII or describe in 3-5 sentences.]

**Key player:** [Who is at the leftmost node? Cross-checked with the brief's target customer.]

**Map narrative:** [3-5 sentences walking the reader through the map: who starts where, what major decisions they make, where they currently abandon or substitute, and where they would land if the long-term goal succeeded.]

## Expert Interview Notes

[Synthesized observations from 2-4 cameo experts interviewed Monday afternoon. Each expert gets a sub-section.]

### Expert 1: [Name, role, why-they-were-invited]

- [Observation 1]
- [Observation 2]
- [HMW candidate surfaced]

### Expert 2: [Name, role, why-they-were-invited]

- [Observation 1]
- [Observation 2]
- [HMW candidate surfaced]

### Expert 3: [Name, role, why-they-were-invited]

- [Observation 1]
- [Observation 2]
- [HMW candidate surfaced]

## HMW Cluster Board

[Total HMWs surfaced during morning + expert interviews; clustered into 4-8 themes; heat-map voted via `tool-note-and-vote`. Show top 4-6 clusters with vote totals.]

| Cluster | Theme | HMW count | Heat-map votes |
|---|---|---|---|
| C1 | [Theme name] | [N HMWs] | [V votes] |
| C2 | [Theme name] | [N HMWs] | [V votes] |
| C3 | [Theme name] | [N HMWs] | [V votes] |
| C4 | [Theme name] | [N HMWs] | [V votes] |

**Top cluster HMWs (verbatim, 3-5 per top cluster):**

**C1: [Theme]**
- HMW [verbatim]
- HMW [verbatim]
- HMW [verbatim]

**C2: [Theme]**
- HMW [verbatim]
- HMW [verbatim]
- HMW [verbatim]

## Target Moment

[The single point on the map (or tight cluster of points) the Decider picks. Tuesday's sketches and Wednesday's storyboard begin from here. Render as a circled position on the map narrative + a 1-3 sentence rationale.]

**Selected target:** [Map position; e.g., "Step 3 (Decision point: capture or skip)" or "Step 2 plus Step 5 (capture moment plus first recall surface)"]

**Decider rationale:** [Why this point, why not the alternatives, what assumption the team is choosing to test through prototyping here.]

**Sprint questions the target moment most directly tests:** [Reference question numbers from the Sprint Questions section above; usually 1-2 of the 3-7.]

## Decider Checkpoint

**Decider sign-off required before Tuesday begins.**

- [ ] Decider confirms the long-term goal (1-5 years out; aspirational).
- [ ] Decider confirms the final sprint questions (3-7; converted from fears to testable risks).
- [ ] Decider acknowledges the customer or system map represents the team's shared understanding (not "the truth"; the prototype Friday will adjust this understanding).
- [ ] Decider confirms the top HMW clusters from the heat-map vote (those clusters orient Wednesday's heat-map).
- [ ] Decider selects the target moment and accepts that Tuesday's sketches will be drawn against this target (and not, by default, against the un-selected clusters).
- [ ] Decider commits to attending Wednesday morning for heat-map plus supervote (the load-bearing Wednesday window from the brief).

**Signed:** [Decider name, role], [ISO date and local time]

## Example Output

<details>
<summary>Design Sprint Monday Artifact: Brainshelf Camera-Capture Validation</summary>

# Design Sprint Monday Artifact: Brainshelf Camera-Capture Validation

Monday 2026-06-01. The Brainshelf team's sprint brief was locked Friday 2026-05-29 with 6 customer slots confirmed for Friday 2026-06-05. The team is together for the full Monday workshop: Jamie + Sam in-person at Capitol Hill Coworking; Alex + Riley remote on Zoom + Miro. Three cameo experts scheduled for the afternoon. This artifact captures the team's Day 1 convergence from the brief's 4 sprint questions to the chosen target moment.

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

</details>
