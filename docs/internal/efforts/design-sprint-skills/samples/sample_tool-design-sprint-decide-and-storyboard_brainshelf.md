---
skill: tool-design-sprint-decide-and-storyboard
thread: brainshelf_book-catalog
scenario: Wednesday's bundled artifact (heat map, critique, supervote, storyboard)
status: spec-validation draft
purpose: Sample output for design validation; not a library sample
spec_section: design-sprint-design-spec.md section 5
prerequisite_artifact: sample_tool-design-sprint-sketch_brainshelf.md
---

# Design Sprint Decide and Storyboard: Brainshelf (Wednesday)

## Art Museum Layout

Tuesday's 4 solution sketches posted anonymously on a Miro board in a horizontal row. Sketcher names hidden. Each sketch has 3 panels visible and a one-sentence title.

## Heat Map (Silent Dot-Voting)

Each team member placed 5 small dots on parts of any sketch they found promising. Then each team member placed 1-2 large dots on the single most important idea on the entire board.

| Sketch | Small dots | Large dots | Hot zones |
|---|---|---|---|
| Capture-Then-Confirm (Alex) | 13 | 4 | Full-screen camera zero-state; optimistic Saved toast |
| Recall Surface (Sam) | 11 | 3 | "Have I read this?" search bar; past-capture-with-note detail |
| First Capture Funnel (Jamie) | 9 | 1 | Deferred sign-up; one-line onboarding |
| Private Library Reveal (Riley) | 7 | 0 | Empty-state shelf visual |

## Speed Critique Notes

Each sketch reviewed for 3 minutes:

**Capture-Then-Confirm (Alex)**
- Concern: optimistic UI may bite if OCR mis-resolves. Mitigation: tap-to-correct in Saved toast.
- Strength: zero-friction; this is what the Founding Hypothesis promises.

**Recall Surface (Sam)**
- Concern: search-driven recall is fast for known queries but doesn't surface forgotten captures. Add ambient recall: cards from "your library" at bottom.
- Strength: the "have I read this?" search is the single highest-value recall mechanic per scorecard A6.

**First Capture Funnel (Jamie)**
- Concern: deferred sign-up risks data loss if user uninstalls. Mitigation: local-first storage + later sign-up upgrade.
- Strength: removes the #1 friction reported in the 22 prior interviews (signup fatigue).

**Private Library Reveal (Riley)**
- Concern: the privacy card may feel preachy if not handled subtly.
- Strength: empty-state shelf visual is the most distinct brand artifact in the set.

## Straw Poll

Each team member places 1 small dot on the single best sketch:

| Sketch | Votes |
|---|---|
| Capture-Then-Confirm | 2 (Alex, Sam) |
| Recall Surface | 1 (Riley) |
| First Capture Funnel | 1 (Jamie) |
| Private Library Reveal | 0 |

Result: Capture-Then-Confirm leads but no consensus on full storyboard direction. Wednesday is doing what it should: surfacing the decision the Decider must make.

## Decider Supervote

**Jamie (Decider):** "Capture-Then-Confirm as the spine. Pull the recall search from Sam's sketch and the deferred sign-up from my own sketch. Drop the privacy reveal card; instead have the empty-state shelf visual carry the privacy story implicitly. We're testing capture first; recall second; everything else supports those two."

**Decision:** All-in-One prototype combining the best parts of three sketches (Capture-Then-Confirm + Recall Surface + First Capture Funnel).

**Not a Rumble:** Testing two competing prototypes would dilute the Friday signal on A1 (the highest-risk assumption). The team commits to one prototype direction and tests it cleanly.

## Storyboard

15-step storyboard driving Thursday's build. Each step is one screen or interaction.

| Step | Screen / Interaction | Source sketch | Notes for build |
|---|---|---|---|
| 1 | App launch -> camera view (no signup) | Alex + Jamie | Local storage; sign-up later |
| 2 | Coaching overlay: "Capture your first book" | Jamie | Dismisses after first capture |
| 3 | User taps; camera captures cover | Alex | Apple Vision API call |
| 4 | Recognition overlay shows resolved title | Alex | 1-2 second target |
| 5 | Optimistic "Saved" toast appears | Alex | Tap-to-correct hidden until needed |
| 6 | Returns to camera, library badge shows "1" | Alex | Library badge top-right |
| 7 | User taps library badge | Alex + Riley | Transition to library |
| 8 | Library view: empty shelf with 1 book | Riley | Shelf visual; 1 captured cover |
| 9 | User taps "Have I read this?" search | Sam | Persistent search bar at top |
| 10 | Search field opens; types "Project Hail Mary" | Sam | Auto-complete from captures |
| 11 | Result: "Read Aug 2023. Your note: 'best alien sci-fi'" | Sam | Past-capture-with-note card |
| 12 | User taps card | Sam | Drill-down detail |
| 13 | Detail view: cover, date, note, similar | Sam | Related captures by author / tag |
| 14 | User backs out; returns to library | - | Standard nav |
| 15 | App ready for next capture | Alex | Loops to camera ready |

## Rumble vs All-in-One Decision Recorded

**Choice:** All-in-One.

**Rationale:** A Rumble (e.g., camera-first vs library-first) would split the Friday signal on the riskiest assumption (A1). Better to commit to one prototype and learn cleanly. The Rumble option will be revisited if Friday signal is mixed.

## Decider Checkpoint

**Decider sign-off required before Thursday's build begins.**

- [x] Jamie supervotes Capture-Then-Confirm as spine, with Recall Surface and First Capture Funnel additions.
- [x] Jamie confirms All-in-One (not Rumble).
- [x] Jamie confirms the 15-step storyboard is detailed enough that Thursday doesn't re-debate Wednesday's calls.
- [x] Jamie sets fidelity target: "Functional enough that customers feel like they're using a real app. Not so polished that we won't change it after Friday."

**Signed:** Jamie (Decider), 2026-05-28 16:30 PT

---

*This sample represents the output a single invocation of `/tool-design-sprint-decide-and-storyboard` would produce. Spec section: `design-sprint-design-spec.md` section 5.*
