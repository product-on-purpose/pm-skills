# Design Sprint Wednesday Artifact: Brainshelf Camera-Capture Validation

Wednesday 2026-06-03. Tuesday closed with 4 attribution-stripped solution sketches (Sketch A/B/C/D) uploaded to the shared Figma board. Today: heat map, critique, straw poll, Jamie's supervote, rumble-vs-all-in-one call, and the 9-panel storyboard for Thursday's Figma build.

## Art Museum Layout

**Posting:** Shared Figma frame at brainshelf-ds-2026-06-01-prototype.figma file; "Wednesday Art Museum" page; all 4 sketches arrayed left-to-right with A/B/C/D labels above each. Sketcher names removed from Figma frame metadata. Jamie + Sam viewing in-person at Capitol Hill Coworking; Alex + Riley remote via Zoom screen-share.

**Sketches present (attribution stripped):**

| Label | Sketch source (Tuesday) | Format |
|---|---|---|
| Sketch A | Tuesday Sketcher 4 (anonymized) | Figma frame 1170 x 2532 |
| Sketch B | Tuesday Sketcher 1 (anonymized) | Figma frame 1170 x 2532 |
| Sketch C | Tuesday Sketcher 3 (anonymized) | Figma frame 1170 x 2532 |
| Sketch D | Tuesday Sketcher 2 (anonymized) | Figma frame 1170 x 2532 |

## Heat Map

**Mechanic:** 3 small dots per voter; silent; 15 minutes (09:30-09:45 PT). 4 voters x 3 dots = 12 total dots. Dots placed on Figma using comment-pin tool.

| Sketch | Dot count | Hottest elements (3-5 most-dotted) |
|---|---|---|
| Sketch A | 4 | Capture-as-rating with optional freeform "why did you grab this?"; captured-contexts library organization; chip filter UI |
| Sketch B | 4 | 5-second undo countdown after capture; "where you saw it" geolocation tag on confirmation card |
| Sketch C | 1 | Explicit two-step capture with confirmation; tabular sortable library |
| Sketch D | 3 | Polaroid-stack post-capture animation; "found in your library: 3 books that mention X" recall surface |

## Speed Critique Notes

09:45-10:45 PT. Riley walked through each sketch (3 min each plus 1 min buffer). Sketchers silent during their own sketch's critique (the rule held; no one broke silence).

### Sketch A

**What the team sees:** A capture surface that frames the moment as "log a meaningful encounter with a book" rather than "add to inventory." The freeform "why did you grab this?" field is optional but prominent. The library is organized by captured contexts (chips like "Last weekend at Powell's") rather than by metadata.

**Compelling elements:** Captured-contexts library organization (3 dots stacked); freeform-but-optional field (1 dot).

**What would worry me:** Capture flow feels slower than sub-3-second (the freeform field, even optional, adds visual weight to the confirmation step). The "captured contexts" organization requires geolocation or active context tagging at capture; what happens to captures with no context? Recall surface untested in this sketch.

### Sketch B

**What the team sees:** A capture surface that prioritizes speed and trust (sub-3-second capture; recognition feedback; one-tap commit; 5-second visible undo). The confirmation card surfaces "where you saw it" via geolocation. The recall surface adds "books like this you have" as a discovery moment.

**Compelling elements:** 5-second undo countdown (2 dots); "where you saw it" geolocation (2 dots).

**What would worry me:** Geolocation requires location permission upfront; this may add a permission-modal speed bump that defeats the sub-3-second goal. The 5-second undo creates ambiguity about whether the capture is "done"; users may wait it out before navigating away. Recall surface conflates "books like this you have" with "books in your library" which may confuse.

### Sketch C

**What the team sees:** An explicit, deliberate capture flow. Tap to capture, tap again to commit. The confirmation modal exposes 6 editable metadata fields. The library is a tabular list with sortable columns.

**Compelling elements:** Explicit two-step capture (1 dot).

**What would worry me:** Two-step capture is contrary to the FS assumption A1 framing (sub-3-second capture). The 6-field metadata modal will absolutely defeat sub-3-second timing; user has to read 6 fields before knowing what to do. Tabular library is a power-user view; the target customer (books-as-memory) probably does not think in spreadsheets. This sketch optimizes for confidence-via-control; the target customer probably wants confidence-via-system-intelligence.

### Sketch D

**What the team sees:** A capture surface with minimal visual feedback during recognition (haptic-equivalent edge glow). The confirmation is a Polaroid card that animates into a stack of recent captures. Correction is friction-free in-place. The library is a visual wall of book covers; search opens to "found in your library" results.

**Compelling elements:** Polaroid-stack animation (2 dots); "found in your library: books that mention X" recall surface (1 dot).

**What would worry me:** Haptic-equivalent edge glow may feel insufficient to users who need explicit confirmation that the system "saw" the book; minimalism could read as uncertainty. Polaroid stack is a strong visual metaphor; does it scale to a library of 200+ books without becoming cluttered? Search-first recall is a bet that users initiate recall with intent; what about the discovery moment?

## Straw Poll Results

11:00-11:15 PT. 1 large dot per voter; silent; non-binding.

| Voter | Picked |
|---|---|
| Jamie | Sketch B |
| Alex | Sketch D |
| Sam | Sketch B |
| Riley | Sketch A |

**Straw poll distribution:** Sketch A: 1; Sketch B: 2; Sketch C: 0; Sketch D: 1.

## Supervote

**Decider:** Jamie.

**Supervote placement:** Jamie placed all 3 supervote dots on Sketch B (Sprint book canonical 3-dot supervote). All-in-one; no rumble.

**Decider's rationale:** Jamie chose Sketch B because the lead sprint question (Q1) is about sub-3-second capture without abandonment, and Sketch B is the only sketch that explicitly designs for that speed constraint. The 5-second undo addresses the worry about "did it work?" feedback (from Dr. Chen's Monday expert interview) without slowing the actual capture. The "where you saw it" element is a bet that contextual capture-time data is what makes the recall surface feel personal rather than tabular. Jamie noted the heat-map concerns (geolocation permission speed bump; undo creating ambiguity) as build issues for Sketch B that the storyboard must address explicitly. Sketch A's captured-contexts library is intriguing but tested orthogonally to A1; Sketch D's recall surface is strong but the team can borrow the "found in your library" pattern in a future iteration without supervoting it now.

## Rumble vs All-in-One Decision

**Decision:** All-in-one (Sketch B).

**Rationale:** Rumble would split Thursday's build capacity across 2 prototypes; the team is 4 people with 2 builders (Alex + Sam) on Thursday. Sketch B is sufficient to test the lead question (Q1); rumble would test breadth of approaches but at the cost of depth on the actual A1 question. Single-prototype all-in-one is the right call for first-Design-Sprint discipline.

## Storyboard

**Storyboard scope:** Target moment (capture + immediate post-capture confirmation surface) plus 2 panels of setup (encounter the book; open Brainshelf) plus 2 panels of outcome (find the book in the library next week; recall a passage about the book months later). Total: 9 panels.

| Panel | What the customer sees | What the customer does | System response | Notes for builders |
|---|---|---|---|---|
| 1 | Their phone with Brainshelf icon on home screen; they are holding the book "The Overstory" in their other hand at a bookstore | Tap the Brainshelf icon | App opens directly to camera surface (no home screen) | Camera-first launch; no greeting; bypass any onboarding |
| 2 | Camera viewfinder with the book "The Overstory" in frame, held at arm's length; thin pulsing outline around the recognized cover | Hold the phone steady for ~1 sec | Recognition completes; bottom card slides up with "The Overstory by Richard Powers" + cover thumbnail | Pulsing outline is the "we found it" signal; no on-screen text during recognition |
| 3 | Bottom card showing "The Overstory by Richard Powers" + cover + 4 status chips (Read / Want / Reading / Reference) + "where you saw it: Twig and Cover Books" geolocation tag | Tap the "Want to read" chip | Card commits; brief confirmation animation; 5-sec undo countdown in top-right | Geolocation permission asked at first-ever capture; subsequent captures use cached permission; if denied, geolocation tag simply absent |
| 4 | Camera surface ready for next capture (book still in frame); top toast: "Added to Want to Read" with mini-cover thumb | Lower the phone (capture flow complete) | App stays on camera; ready for next capture | "Sub-3-second" measured from Panel 1 tap to Panel 4 toast: target < 3 sec |
| 5 | Library tab open; "Recently captured" row at top showing "The Overstory" first, followed by 3 previously-captured books; each card shows cover + "where you saw it" tag | Scroll the recently captured row | Smooth horizontal scroll; cards stay readable | "Where you saw it" tags appear only for captures with geolocation; visually consistent absence-vs-presence |
| 6 | (1 week later) Library tab open with 23 books total; search bar at top | Tap search; type "trees" | Results show "The Overstory" plus 2 other books that mention trees | "Books like this you have" deferred to v0.2; Wednesday storyboard kept this scope tight |
| 7 | Tap "The Overstory" card from search results | Card opens to book detail view | Book detail shows cover, captured-on date, where-you-saw-it, status, optional notes | Book detail is read-mostly Wednesday scope; edit-status is the only interaction |
| 8 | (months later) User opens Brainshelf with intent: "I read something about old-growth forests" | Tap search; type "old-growth forests" | Results return "The Overstory" with a snippet of the captured-time context tag | Search across captured-time context tags is the recall payoff; this panel sells the long-term goal |
| 9 | Book detail showing "The Overstory" with captured context "Twig and Cover Books, May 2026"; user remembers the moment | Smile, close phone | Recall moment complete | This panel is for the team's morale Wednesday; not a build target Thursday |

**Open questions for Thursday build:** Animation timing for the bottom-card slide-up in Panel 3; whether the pulsing-outline color in Panel 2 should be brand-color or neutral; exact copy for the "where you saw it" tag; whether the recently-captured row in Panel 5 should be 4 books visible or 3.5 books visible (peek effect). Builders own these calls; all interaction logic and surface structure are storyboard-locked.

## Decider Checkpoint

**Decider sign-off required before Thursday build begins.**

- [x] Jamie confirms Sketch B is the supervoted call (all-in-one; no rumble).
- [x] Jamie confirms the 9-panel storyboard is specific enough that Alex and Sam can begin Thursday Figma build without re-debating design.
- [x] Jamie confirms storyboard scope (1 setup panel + 3 capture panels + 1 confirmation panel + 1 library panel + 1 search panel + 1 recall panel + 1 morale panel) is build-feasible Thursday.
- [x] Jamie acknowledges the critique concerns NOT addressed in the storyboard (specifically: geolocation permission speed bump and 5-sec undo ambiguity) are accepted as known weaknesses; Friday's test may surface them.
- [x] Jamie commits to attending Friday PM 14:00-18:00 PT (observe interview slots 4-5 + Decider review concludes by 17:30 PT).

**Signed:** Jamie (founder, PM), 2026-06-03 16:55 PT.

**Wednesday closed. Thursday build begins 09:00 PT 2026-06-04; Alex + Sam co-build; storyboard locked.**
