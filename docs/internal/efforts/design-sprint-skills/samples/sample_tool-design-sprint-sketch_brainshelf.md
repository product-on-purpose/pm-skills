---
skill: tool-design-sprint-sketch
thread: brainshelf_book-catalog
scenario: Tuesday's bundled artifact (lightning demos, four-step sketches, assignments)
status: spec-validation draft
purpose: Sample output for design validation; not a library sample
spec_section: design-sprint-design-spec.md section 4
prerequisite_artifact: sample_tool-design-sprint-map-and-target_brainshelf.md
note: |
  This sample documents the *outputs* of Tuesday's structured individual-work day.
  The actual sketches are produced by humans, not the AI invocation. The skill
  structures the activity (lightning demos, assignment plan, four-step sketch
  framework) and captures the resulting artifacts.
---

# Design Sprint Sketch: Brainshelf (Tuesday)

## Lightning Demo Board

Each team member brought 3 demos. Captured patterns:

| Demo source | What it does well | Reusable pattern |
|---|---|---|
| Apple Camera app | Instant launch, single-tap capture | Zero-state is the camera itself |
| Pocket save extension | One-tap save from anywhere | Source-agnostic capture surface |
| Goodreads barcode scanner | Hardware-feeling fast scan | Visual confirmation of recognized item |
| Linear's Cmd+K capture | Capture without context switch | Fast modal that returns to source |
| Marco Polo "tap to send" | Single sustained gesture | Optimistic UI (assume success) |
| Day One's "on this day" | Time-aware recall surface | Surface past content at relevant moments |
| Strong's workout logger | Tap-to-log with sensible defaults | Minimize required fields |
| StoryGraph's review entry | Inline review while logging | Capture context with the item |
| TikTok save-to-collection | Save without leaving feed | Collection as primary metaphor |
| Bear's auto-tagging | Smart inference instead of forms | Reduce post-capture friction |
| Apple Vision Book Lookup | OCR + cover match in 2-3s | Existing API for our core ML need |
| iA Writer's blank canvas | Quiet, distraction-free start | Visual quiet at the capture moment |

## Sketch Assignment Plan

**Mode:** Divide (each sketcher takes a focused part of the journey).

| Sketcher | Assignment | Focus |
|---|---|---|
| Alex | Capture moment (camera + resolution + confirmation) | Day-1 customer experience |
| Sam | Recall moment (search, "have I read this?" prompt) | What happens at recall time |
| Jamie | Onboarding + first capture | First-launch experience |
| Riley | Empty state + privacy framing | First-day-on-the-app feel |

Rationale for divide mode: the journey has 4 distinct moments. Swarming the same moment would produce 4 versions of camera flow; diversifying coverage produces a richer storyboard input for Wednesday.

## Four-Step Sketch Outputs (4 Solution Sketches)

Each sketcher produced one three-panel solution sketch through the Notes / Ideas / Crazy 8s / Solution Sketch sequence. Descriptions captured here are textual transcriptions of the sketches; the actual hand-drawn artifacts live in the Miro board.

---

### Alex's Sketch: "Capture-Then-Confirm"

**Panel 1: Camera state**
Full-screen camera view. No chrome. A book is visible in the viewfinder. Tiny "tap to capture" hint at bottom.

**Panel 2: Recognition state**
Book cover overlays at top with title + author resolved. Optimistic "Saved" toast at bottom. User can tap to add note or just walk away.

**Panel 3: Confirmation state**
Returns to camera, ready for next. Tiny library badge in corner shows "1 today."

**Pattern reused:** Apple Camera zero-state; Marco Polo optimistic UI.

---

### Sam's Sketch: "Recall Surface"

**Panel 1: Home screen with recall trigger**
Library grid view; floating "have I read this?" search bar at top.

**Panel 2: Have-I-read flow**
User types or speaks "Project Hail Mary." App shows: "Read it Aug 2023. You called it 'best alien sci-fi.' Tap to revisit."

**Panel 3: Past capture detail**
Cover, date captured, user's note, related captures.

**Pattern reused:** Day One's "on this day"; StoryGraph inline reviews.

---

### Jamie's Sketch: "First Capture Funnel"

**Panel 1: Welcome**
"Brainshelf is for keeping books in your head." One screen, no signup. "Try it: capture one book."

**Panel 2: Guided capture**
Same camera state as Alex's, but with a coaching overlay arrow on first use.

**Panel 3: Post-first-capture**
"That's it. You're in. Next book." No upsell, no permissions ask. Account creation deferred until 5th capture.

**Pattern reused:** Linear's Cmd+K capture; deferred sign-up patterns from Notion, Bear.

---

### Riley's Sketch: "Private Library Reveal"

**Panel 1: Empty state**
Visual: an empty wooden shelf. Text: "Your library starts here. Just yours."

**Panel 2: First capture animation**
First book "lands" on the shelf with a soft animation. No share prompt.

**Panel 3: Privacy callout (subtle)**
After 3 captures, a one-time card: "Just so you know: nobody else can see this. Ever. Unless you decide to share." Dismiss permanently.

**Pattern reused:** TikTok's save-to-collection; iA Writer's quiet canvas.

---

## Recruiting Tracker Update

| Customer | Status | Notes |
|---|---|---|
| Customer 1 | CONFIRMED | Books-as-memory; ex-Goodreads |
| Customer 2 | CONFIRMED | Multi-format; paper-journal user |
| Customer 3 | CONFIRMED | StoryGraph migrant |
| Customer 4 | TENTATIVE | Riley re-confirming Wed AM |
| Customer 5 | CONFIRMED | Riley's referral; 30+/yr reader |

4 of 5 confirmed; 1 tentative with backup ready. On track for Thursday noon cutoff.

## Decider Checkpoint

**Decider cameo for sketches review (Tuesday 10:00-11:00).**

- [x] Jamie reviewed all 4 sketches; flagged Riley's privacy-reveal animation as potentially "too cute" but accepted for Wednesday voting.
- [x] Jamie acknowledges all 4 sketches must compete on the Wednesday Heat Map; no pre-supervote.
- [x] Jamie confirms the team is on-track to ship a Wednesday storyboard.

**Signed:** Jamie (Decider), 2026-05-27 10:45 PT

---

*This sample represents the output a single invocation of `/tool-design-sprint-sketch` would produce. Spec section: `design-sprint-design-spec.md` section 4.*
