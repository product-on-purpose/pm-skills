---
skill: tool-design-sprint-prototype-plan
thread: brainshelf_book-catalog
scenario: Thursday's planning artifact (role plan, interview script, trial-run checklist, participant schedule)
status: spec-validation draft
purpose: Sample output for design validation; not a library sample
spec_section: design-sprint-design-spec.md section 6
prerequisite_artifact: sample_tool-design-sprint-decide-and-storyboard_brainshelf.md
note: |
  This skill plans Thursday's work. The actual prototype build (Figma + iOS
  integration) is craft activity outside the AI invocation surface, per the
  spec's "outside scope" decision.
---

# Design Sprint Prototype Plan: Brainshelf (Thursday)

## Prototype Role Plan

| Role | Person | Responsibility |
|---|---|---|
| Maker (UI) | Alex | Build clickable Figma; 15 storyboard screens |
| Maker (Capture flow) | Sam | Integrate Apple Vision OCR API as live module behind a Figma click hotspot |
| Stitcher | Alex | Assemble screens into a coherent flow; verify all hotspots resolve |
| Writer | Jamie | Microcopy: "Capture your first book"; recognition overlay text; recall search prompts |
| Asset Collector | Riley | Source 12 book covers (varied: bestseller, indie, paper, audio formats); ensure mid-range Goodreads-popular titles for recall recognizability |
| Interviewer | Riley | Lead all 5 Friday interviews; the team observes silently |

## Prototype Brief

**What to build:** Clickable Figma prototype with iOS device tethering. 15 screens per storyboard. One live module (Apple Vision OCR call) integrated through a Figma hotspot triggering a JS callback to Sam's local OCR shim.

**Fidelity bar:**
- Visual polish: 70% of v1 production quality. Real typography, real iconography, no Lorem Ipsum.
- Interaction fidelity: 90%. All 15 screens transition correctly. The capture moment uses the real camera.
- Backend fidelity: 30%. OCR runs live but no persistence between sessions; library state is hardcoded for recall flow.

**Time allocation per role:**

| Role | Time | Notes |
|---|---|---|
| UI build (Alex) | 09:00-14:30 | 4 hours focused + 1.5h iteration |
| OCR integration (Sam) | 09:00-14:00 | 5 hours; longest single task |
| Stitching (Alex) | 14:30-15:30 | 1 hour assembly + verification |
| Writing pass (Jamie) | 12:00-13:30 | 1.5 hours during cameo |
| Asset collection (Riley) | 09:00-11:00 | 2 hours; then switches to interview prep |
| Trial run | 15:30-16:30 | Whole team |
| Trial-run fixes | 16:30-17:30 | Alex + Sam |

## Interview Script (Five-Act)

### Act 1: Friendly Welcome (5 min)
- Riley greets, confirms recording permission, sets expectations: "We're going to show you something rough and see how you react. There are no wrong answers."
- Small talk about reading habits to warm up.

### Act 2: Context Questions (10 min)
- "Tell me about your reading. How many books a year, roughly?"
- "Walk me through the last book you finished. How did you decide to read it?"
- "When was the last time you wanted to remember a book but couldn't?"
- "What do you do today to track books? Walk me through it on your phone."
- "Tell me about the last time you tried to remember 'did I already read this?' at a bookstore or online."

Connects to scorecard rows A1, A3, A6.

### Act 3: Prototype Introduction (5 min)
- "I'm going to hand you a phone with an app on it. The app is rough. I want you to try to capture a book you have nearby, then try to find a book you've previously captured. I'll be quiet while you try."
- Hand over the prototype phone. Do not coach unless deeply stuck.

Critical guidance: do NOT say "use the camera." Customers must discover the camera-first capture mechanic themselves. If they get stuck for more than 90 seconds, Riley can nudge once with "what do you notice on the screen?" but no more.

### Act 4: Tasks and Nudges (30-40 min)
**Task 1:** Capture a book you have nearby (or use one Riley provides via webcam display).
**Task 2:** Capture a second book.
**Task 3:** "Now imagine you're at a bookstore and you see a book and want to know if you've read it. Try to find one of the books that's already in there."
**Task 4 (if time):** "Show me your library. Tell me what you notice."

Observers (Jamie, Alex, Sam) silent throughout. Notes in shared Miro board, one column per customer.

### Act 5: Debrief (10 min)
- "What were you thinking during that?"
- "What worked? What didn't?"
- "How does this compare to what you do today?"
- "If this app existed and you owned it on your phone, when would you actually use it?"
- "Anything you wish it did that it doesn't?"
- "If the free version captures 50 books and paid is $4.99/month for unlimited and sync across devices, would you pay?"

Pricing question deliberately at the end so it doesn't bias earlier reactions.

## Trial-Run Checklist

To pass before Friday begins:

- [ ] All 15 storyboard screens load in Figma
- [ ] Camera hotspot triggers Sam's OCR module, returns a result, populates the recognition overlay
- [ ] "Saved" toast appears with correct microcopy
- [ ] Library badge updates after capture
- [ ] Library view loads with hardcoded prior captures (12 covers)
- [ ] "Have I read this?" search works on at least 5 titles
- [ ] Past-capture detail view loads with note
- [ ] Back-out returns to camera-ready state
- [ ] iOS device tethering works across all team members' shared screens
- [ ] One end-to-end run with a real book completes in under 4 minutes

## Participant Confirmation Tracker

| Slot | Customer | Time (PT) | Status |
|---|---|---|---|
| 1 | Customer 1 | 09:30-10:30 | CONFIRMED |
| 2 | Customer 2 | 11:00-12:00 | CONFIRMED |
| 3 | Customer 3 | 13:30-14:30 | CONFIRMED |
| 4 | Customer 4 | 15:00-16:00 | CONFIRMED (was tentative; locked Wed) |
| 5 | Customer 5 | 16:30-17:30 | CONFIRMED |

All 5 confirmed; calendar invites sent with Zoom links.

## Decider Checkpoint

**Decider cameo Thursday 15:00-16:00 for trial run + script approval.**

- [x] Jamie approves microcopy throughout flow.
- [x] Jamie approves interview script verbatim; no leading questions detected.
- [x] Jamie attends 16:00 trial run; one pass with a real book.
- [x] Trial run produced 2 small bugs (recognition overlay timing; search auto-complete edge case); Alex + Sam fixing 16:30-17:30.

**Signed:** Jamie (Decider), 2026-05-29 16:00 PT

---

*This sample represents the output a single invocation of `/tool-design-sprint-prototype-plan` would produce. Spec section: `design-sprint-design-spec.md` section 6.*
