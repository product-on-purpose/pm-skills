---
title: "Design Sprint Prototype Plan: Brainshelf Camera-Capture Validation"
description: "Brainshelf Thursday morning planning artifact: 5 canonical roles assigned (Alex Maker+Stitcher, Jamie Writer, Sam+Riley Asset Collector, Riley Interviewer), fidelity bar locked for 9 panels, full Five-Act script with 3 Tasks (capture-The-Overstory / find-1-week-later / recall-old-growth-forests-6-months-later) plus Riley probing notes, trial run scheduled Sam-as-fake-customer."
artifact: design-sprint-prototype-plan
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

Thursday morning 2026-06-04, 09:30 PT. Wednesday closed with Sketch B supervoted all-in-one and a 9-panel storyboard locked. The team invokes `tool-design-sprint-prototype-plan` before parallel build work begins: Alex + Sam paired on Figma build; Riley drafts and mock-runs the Five-Act interview script; Jamie reviews and signs off.

## Prototype Role Plan

| Role | Owner | Day allocation | Notes |
|---|---|---|---|
| Maker | Alex | 09:30-16:00 PT | Owns all 9 Figma frames + visual design + interaction surfaces |
| Stitcher | Alex (paired with Sam) | 13:00-16:30 PT | Connects Figma frames; Sam owns interaction-logic edge cases (5-sec undo timing, geolocation permission flow) |
| Writer | Jamie | 09:30-12:30 PT | All prototype copy: button labels, system feedback strings, recall-surface search results copy; Riley reviews for interview-script consistency |
| Asset Collector | Sam (mornings) + Riley (afternoons) | 09:30-15:00 PT | Source 6 fake-but-believable book covers (real books, real authors, but using public-domain or fair-use cover thumbnails); sample location data for "where you saw it" tags |
| Interviewer | Riley | 09:30-12:30 script draft + 14:00-15:00 mock-run + 15:30-17:00 trial run | Solo on script Thursday morning; pulls in Sam as trial-run "customer" Thursday afternoon |

**Doubling-up notes:** 4-person team. Alex covers Maker + Stitcher (single design owner; standard for first DS). Jamie covers Writer (PM has best context for product copy + brand voice). Sam + Riley share Asset Collector. Riley is dedicated Interviewer.

## Prototype Brief

**What to build:** All 9 storyboard panels from Wednesday (Panel 1 Brainshelf icon tap through Panel 9 recall moment). Panels 1-5 are the load-bearing test panels (capture + confirmation + library view); Panels 6-9 are the contextual surround that lets the customer understand the recall payoff. Build all 9 as Figma frames; ensure Panels 1-5 have full interaction; Panels 6-9 may be lightly interactive (next-tap-advance only).

**Fidelity bar:** Will a customer believe this is real for the 30-minute interview? For Panels 1-5: every frame has a frame, every inter-frame interaction triggers within 200ms, copy is final, visual design is on-brand (Brainshelf navy + warm-white + serif headline; Inter for body), book cover thumbnails use real public-domain covers (no stock placeholder). For Panels 6-9: every frame exists; interactions are linear advance; copy is lightly polished but final (no TODOs or placeholders; Riley confirmed during trial run that nothing requires steering-around).

**Time allocation per role:** Per role plan above. Critical path: Writer finishes copy by 12:30 PT so Stitcher has final copy for Panel 3 and Panel 5 (the most copy-sensitive panels).

**Explicitly NOT being built:**
- Animated transitions beyond the basic Figma smart-animate defaults (no custom timing curves)
- Onboarding flow before Panel 1 (interviewer manually opens app to Panel 1 state)
- Settings, profile, account screens (none of the storyboard tested moments require them)
- The "books like this you have" recall surface from Sketch D (deferred to v0.2 per Wednesday Decider rationale)
- Real OCR or geolocation (Figma simulates both with prepared book + prepared location)

## Interview Script (Five-Act)

### Act 1: Welcome (5 min)

Hi [name], thanks for joining today. I'm Riley, and I work on Brainshelf, an early-stage product for readers like you. The next 60 minutes will be a conversation, not a test. There are no wrong answers, and the prototype you'll see is early, so some things won't work the way you'd expect. I'll ask you about your current habits with books, then show you something we're working on, then ask what you think. I'll be recording today's session for our team to review later; that's what the consent form covered. Sound good?

### Act 2: Context (8 min)

1. Tell me about your typical reading life right now; how many books are you in or around, what kinds of books are catching your attention?
2. When you encounter a book you want to remember (at a bookstore, friend's recommendation, online), what do you do?
3. What's worked well or frustrated you about how you track or remember books today?
4. Think about a specific book you read in the last 2-3 years that you couldn't remember the details of when you wanted to recall it. What happened?
5. If you could change one thing about how you remember books, what would it be?

### Act 3: Intro (4 min)

Okay, now I'm going to show you something we're working on. It's an early prototype, so some things won't work, and a couple of screens may look unfinished. I'd love it if you'd think out loud as you go through it. Just describe what you're seeing, what you'd expect, what you're trying to do. Don't worry about being polite about the design; honest reactions are exactly what we need. The first thing you'll see is the app open on a phone, with a book in your other hand. We'll go from there.

### Act 4: Tasks (28 min)

**Task 1 (15 min):** You just picked up a book called "The Overstory" at a bookstore called Twig and Cover Books. You want to remember you found it. Try to add it to Brainshelf.
- Probing notes for Riley: "Walk me through what you're thinking now." "What did you expect to happen when you tapped that?" "If this didn't work, what would you try instead?" Note timestamp when customer reaches Panel 4 (capture complete) to measure capture time.

**Task 2 (8 min):** It's a week later. You want to find "The Overstory" in your library. Show me what you'd do.
- Probing notes: "Where did you expect to see it?" "What does the 'where you saw it' tag tell you?" If customer never notices the geolocation tag, ask: "Did you see anything interesting on that card?" (after they've moved on).

**Task 3 (5 min):** Imagine you've used this for 6 months and have 50 books in your library. You're thinking about something you read recently about old-growth forests. Show me what you'd do to find it.
- Probing notes: This tests the recall payoff (Panel 8). Customers should be able to search "trees" or "forests" and find "The Overstory" via the captured-time context. If they don't try search, prompt: "If you wanted to find it, where would you start?"

### Act 5: Debrief (10 min)

1. What was your overall reaction to the prototype?
2. What worked well? What didn't?
3. Did the capture flow feel fast enough to use without friction? Slow enough you'd give up on it?
4. The "where you saw it" tag - what did you make of that?
5. If this product were real, what would you expect to pay for it, and how often? (Probe: monthly subscription, one-time, ad-supported.)
6. Anything else you want to share?

Close: Thank you so much for your time. The USD 100 honorarium will arrive via [UserInterviews panel customers: UserInterviews credit; Discord customers: Amazon gift card] within 5 business days. Have a great rest of your day.

## Trial-Run Checklist

Run with Sam playing a target-profile customer at 15:30-17:00 PT.

- [ ] Prototype reaches every storyboard panel without dead links or missing assets
- [ ] All inter-panel interactions trigger as expected; specifically: Panel 1 tap to Panel 2 camera; Panel 2 recognition pulse plays; Panel 3 card slide-up; Panel 3 chip taps commit; Panel 4 toast appears; Panel 5 library scroll works; Panel 6 search input accepts text; Panel 7 card opens; Panel 8 search-with-context works
- [ ] Final copy is in place in all 9 Panels; no TODOs or placeholder text anywhere
- [ ] All 6 book cover thumbnails (The Overstory, plus 5 others for library backfill) are public-domain or fair-use; Sam confirmed via Open Library Cover API
- [ ] Sample location data shows "Twig and Cover Books" specifically (not a generic placeholder); other library books show varied real-but-public bookstore names
- [ ] Riley can complete the full Five-Act script in 55-65 minutes (target 60 with buffer)
- [ ] Tasks act produces observable behavior; Sam (as fake customer) demonstrated probe-able moments without script-following
- [ ] Zoom recording on; Otter transcription armed; consent form sent in calendar invites
- [ ] Observer-room setup: Jamie + Alex + Sam in Zoom breakout room with sticky-note Miro board; sticky-note rotation: Jamie 09:00 / Alex 10:30 / Sam 12:00 / Jamie 14:00 / Alex 15:30 / Sam 17:00-buffer (if used)
- [ ] All 5 + 1 buffer participant Zoom links sent with calendar invite confirmed receipt

## Participant Confirmation Tracker (Thursday Morning 09:30 PT)

| Slot | Customer (anonymized) | Status as of Thursday 09:30 | Recruiter action |
|---|---|---|---|
| Fri 09:00 | UI-Panel-A (US, age 38, M) | Confirmed; reminder sent yesterday | None |
| Fri 10:30 | Discord-1 (UK, age 31, F) | Confirmed; high enthusiasm | None |
| Fri 12:00 | Discord-4 (US, age 36, M; moved up from buffer) | Confirmed; reminder sent | None |
| Fri 14:00 | Discord-3 (Canada, age 29, M) | Confirmed | None |
| Fri 15:30 | UI-Panel-B (Australia, age 52, F) | Confirmed; timezone 09:30 their local; comfortable confirmed | None |
| Fri 17:00 (buffer) | Open (previous buffer used Tuesday) | None scheduled | Riley to identify backup candidate by 12:00 PT Thursday in case of further cancellation |

**Risk assessment for Friday:** Low. All 5 primary slots confirmed Thursday morning. Buffer slot empty but Riley has a backup-of-backup candidate identified (UI-Panel-C, age 41, F, US) who can be activated within 4 hours if needed.

## Decider Checkpoint

**Decider sign-off required before parallel build work begins (target 10:00 PT Thursday).**

- [x] Jamie approves the role plan; Alex covers Maker + Stitcher; Sam + Riley share Asset Collector; Jamie covers Writer; Riley dedicated Interviewer.
- [x] Jamie approves the fidelity bar: Panels 1-5 full-fidelity; Panels 6-9 frame-with-linear-advance; no polishing past the bar.
- [x] Jamie approves the Five-Act Tasks act wording; specifically the 3-task structure: capture-The-Overstory / find-it-1-week-later / recall-old-growth-forests-6-months-later.
- [x] Jamie approves the trial-run gate criteria; if any gate fails at 17:00 PT, the team has until 19:00 PT to recover before Friday begins, otherwise Friday postpones.
- [x] Jamie acknowledges participant tracker status: 5 of 5 confirmed; buffer slot is open; Riley has backup-of-backup identified.
- [x] Jamie confirms attendance for Friday 14:00-18:00 PT Decider window (Decider observes interview slots 09:00-16:30 from breakout room; Decider review begins after 15:30 interview wraps 16:30 and concludes by 17:30 PT).

**Signed:** Jamie (founder, PM), 2026-06-04 09:55 PT.

**Build authorized. Alex begins Figma build at 10:00 PT; trial run scheduled 15:30 PT; full plan locked.**
