---
skill: tool-design-sprint-map-and-target
thread: brainshelf_book-catalog
scenario: Monday's bundled artifact (long-term goal, sprint questions, customer map, HMW clusters, target moment)
status: spec-validation draft
purpose: Sample output for design validation; not a library sample
spec_section: design-sprint-design-spec.md section 3
prerequisite_artifact: sample_tool-design-sprint-brief_brainshelf.md
---

# Design Sprint Map and Target: Brainshelf (Monday)

## Long-Term Goal

> **In 3 years, Brainshelf is the default private library tool for the 5M+ people in the US who read 25 or more books a year and want their reading to stay with them.**

Tested for aspirational scope:
- 3 years is far enough to motivate Friday-prototype-quality decisions, not far enough to be vague.
- "Default tool" is observable (downloads, retention, brand mentions).
- "5M+ people" is roughly the addressable US segment per ALA reading-frequency data.

## Sprint Questions

Drawn from the brief, plus refined during Monday morning:

1. Will books-as-memory customers attempt capture in the first session without coaching?
2. Does camera-first feel intuitive (one-tap to library) or require explanation?
3. Is OCR + cover-recognition fast and accurate enough at first try?
4. Is the recall flow (search past captures, "have I read this?") useful when triggered by a recall scenario?
5. Is the private-by-default framing a positive reaction or a missing feature?
6. Does the pricing concept (free tier with 50-book limit + $4.99/mo paid sync) resonate?
7. Does the customer come back to capture in their own life within the 5-day post-test follow-up?

Question 7 is new (added by Riley during Monday discussion). It is a follow-up question, not a Friday observation question, but it shapes what the team must commit to instrumenting.

## Customer Map

```text
[Reader sees a book]
    |
    |-- on a shelf at home
    |-- in a bookstore
    |-- recommended by friend
    |-- mentioned in podcast / newsletter
    |-- finished reading
    v
[Triggers "I want to remember this"]
    |
    v
[Today: friction]
    |
    |-- "I'll remember it"  --> forgets
    |-- Goodreads           --> adds, then ignores
    |-- Apple Notes         --> low metadata, hard to recall
    |-- Paper journal       --> lossy
    v
[Brainshelf opportunity]
    |
    v
[Capture in under 3 seconds] -- *target moment*
    |
    v
[Later: recall]
    |
    |-- at bookstore: "have I read this?"
    |-- post-friend chat: "what did you think of X?"
    |-- choosing next book: "what do I want to read?"
    v
[Open Brainshelf, find answer fast]
    |
    v
[Reading continues, captures continue]
```

12 steps, well within the 5-15 canonical range.

## How Might We Notes (Clusters)

Generated via silent Note-and-Vote (`tool-note-and-vote`), clustered by theme:

**Cluster 1: Capture (12 notes, top votes)**
- HMW make capture feel like taking a photo, not entering data
- HMW make book metadata resolution feel instant
- HMW capture from a recommendation source (text message, podcast) without leaving the source

**Cluster 2: Recall (9 notes)**
- HMW make "did I read this?" the fastest possible answer
- HMW surface past notes when the user thinks about a book
- HMW remind users of what they wanted to read at the right moment

**Cluster 3: Privacy and trust (5 notes)**
- HMW prove "no social feed" without making the app feel lonely
- HMW signal data ownership at first launch
- HMW make sharing opt-in feel like a feature, not a limitation

**Cluster 4: Stickiness (4 notes)**
- HMW make capturing once lead to capturing twice
- HMW make the library feel rewarding to look at without gamification

**Cluster 5: Bookstore moment (3 notes)** [deferred per backup plan; not target for this sprint]
- HMW make Brainshelf useful at the bookstore

## Target Moment Selected (Decider Supervote)

**Target:** The moment a books-as-memory reader **finishes a book and wants to remember it**.

**Rationale:**
- This is the moment closest to the Founding Hypothesis's "capture in under 3 seconds" promise.
- It's testable in a 60-minute interview ("you just finished a book; show us how you'd remember it").
- It's the most common trigger across the 22 prior customer interviews.
- It de-prioritizes the bookstore moment (which is the backup plan; testing it here would dilute the signal).

**Customer + target moment combined:** A books-as-memory reader (Goodreads churner, 30-45, urban) who has just finished a book at home or on the go and wants to capture it before the title fades.

## Note-and-Vote Trace

| Decision | Votes / Process | Outcome |
|---|---|---|
| Long-term goal scope | Multi-vote on 4 candidate goals | "Default private library tool for 25+/year readers" (Decider supervote) |
| Sprint question additions | Discussion | Added Q7 (post-test follow-up) |
| Customer map shape | Linear journey vs branching map | Linear journey with branch on triggers (Decider call) |
| Target moment | Note-and-vote across 5 candidate moments | "Finished a book" (3 of 4 dots; Decider confirmed) |

## Decider Checkpoint

**Decider sign-off required before Monday ends.**

- [x] Jamie confirms long-term goal.
- [x] Jamie confirms 7 sprint questions.
- [x] Jamie confirms customer map.
- [x] Jamie picks "finished a book" as the target moment.
- [x] Jamie acknowledges that bookstore mode is deliberately deferred to backup plan.

**Signed:** Jamie (Decider), 2026-05-26 16:50 PT

---

*This sample represents the output a single invocation of `/tool-design-sprint-map-and-target` would produce. Spec section: `design-sprint-design-spec.md` section 3.*
