---
title: "Design Sprint Sketch (Tuesday)"
description: "Day 2 (Tuesday) move of a Design Sprint that structures lightning demos and the four-step independent solution sketch protocol (Notes, Ideas, Crazy 8s, Solution Sketch). Each team member produces one solution sketch individually; the skill orchestrates the day but does not author the sketches themselves. Use Tuesday morning after Monday's target moment is locked. Output is the lightning demo board, sketch assignments, and the cohort of independent sketches that become Wednesday's heat-map material."
generated: true
source: scripts/generate-skill-pages.py
tags:
  - tool
  - discovery
---

:::note[Quick facts]
**Classification:** tool | **Version:** 0.1.0 | **Category:** discovery | **License:** Apache-2.0
:::

**Try it:** `/tool-design-sprint-sketch "Your context here"`

Structure Tuesday's solo-but-together work. Each team member, working independently and silently, produces lightning demos in the morning and a four-step solution sketch in the afternoon. The skill structures the activity; the humans produce the sketches. Wednesday's heat-map orientation depends on having a cohort of independent sketches that did NOT contaminate each other through group brainstorming.

Family contract: [`docs/reference/skill-families/design-sprint-skills-contract.md`](../../reference/skill-families/design-sprint-skills-contract.md). This skill is a member of `design-sprint-skills`.

## When to Use

- It is Day 2 of the Design Sprint and Monday's Map and Target artifact is signed off.
- Each team member brings at least 3 lightning demo sources (existing products, references, analogies that bear on the challenge).
- The team has accepted the silent-independent-sketching constraint and will NOT lapse into group brainstorming.
- Sketches are due Tuesday end-of-day for Wednesday morning heat-map.

## When NOT to Use

- Monday is not closed. Return to `tool-design-sprint-map-and-target`.
- The team's instinct is to brainstorm as a group. Sprint method explicitly avoids this; if the team will not commit to independent work, the sprint will not produce diverse sketches and the heat-map becomes a popularity contest.
- The sketch step is being treated as the prototype. Sketches are concept exploration on paper or Figma frames, not Thursday's working prototype.
- Sketches are due Tuesday morning. Tuesday is the full day; rushing to lunch produces sketches the team cannot read Wednesday.

## How to Use

Use the `/tool-design-sprint-sketch` slash command:

```
/tool-design-sprint-sketch "Your context here"
```

Or reference the skill file directly: `skills/tool-design-sprint-sketch/SKILL.md`

## Output Template

# Design Sprint Tuesday Artifact: [Initiative or Challenge name]

<!-- Tuesday Sketch bundled artifact. Captures lightning demos, sketch assignment, and the cohort of four-step solution sketches. Wednesday's heat-map uses this artifact as its source material. -->

## Lightning Demo Board

Each team member presented 3 demos (3 min each); the Facilitator extracted the reusable pattern from each into a one-line note. Total demos: [N]. Total patterns: [N].

| Presenter | Demo source | Reusable pattern (one line) |
|---|---|---|
| [Name] | [Product or reference] | [Pattern extracted] |
| [Name] | [Product or reference] | [Pattern extracted] |
| [Name] | [Product or reference] | [Pattern extracted] |
| [Name] | [Product or reference] | [Pattern extracted] |
| ... | ... | ... |

**Patterns most likely to influence sketches** (Facilitator's read; not voted): [list 3-5]

## Sketch Assignment Plan

**Approach:** [Swarm (default; all team members sketch the same target) / Divide (team members assigned to different parts of the target)]

**Target for sketching:** [Verbatim from Monday's target moment; e.g., "Step 3 capture moment plus immediate post-capture confirmation surface"]

**Time allocations:** Notes 20 min; Ideas 20 min; Crazy 8s 8 min; Solution Sketch 30-90 min (the team committed to [X] min).

**Constraint:** Silent independent work. No looking at others' work. No talking. Facilitator times each step.

## Four-Step Sketches

[Each team member produces one Solution Sketch. The Notes, Ideas, and Crazy 8s pages stay with each sketcher; only the Solution Sketch goes on Wednesday's heat-map board. Sketches are described textually here; the actual sketches are photographed or exported and uploaded to the shared workspace.]

### Sketcher 1: [Name] (attribution removed before Wednesday)

**Solution Sketch description:** [3-5 sentence textual description of what the sketch shows: 3-panel storyboard structure, what the user sees at each panel, what action they take, how the system responds. Should be understandable Wednesday WITHOUT the artist explaining.]

**Distinctive elements:** [What makes this sketch different from a baseline approach? What pattern from the lightning demo board (if any) does it draw on?]

### Sketcher 2: [Name]

**Solution Sketch description:** [...]

**Distinctive elements:** [...]

### Sketcher 3: [Name]

**Solution Sketch description:** [...]

**Distinctive elements:** [...]

### Sketcher 4: [Name]

**Solution Sketch description:** [...]

**Distinctive elements:** [...]

[Additional sketchers if team size 5-7.]

## Recruiting Tracker Update (Tuesday Check-in)

| Slot | Customer name (or ID) | Status | Notes |
|---|---|---|---|
| Fri 09:00 | [Name or ID] | [Confirmed / Pending / Cancelled / Buffer-activated] | [Notes] |
| Fri 10:30 | [Name or ID] | [Status] | [Notes] |
| Fri 12:00 | [Name or ID] | [Status] | [Notes] |
| Fri 14:00 | [Name or ID] | [Status] | [Notes] |
| Fri 15:30 | [Name or ID] | [Status] | [Notes] |
| Fri 17:00 (buffer) | [Name or ID] | [Status] | [Notes] |

**Cancellations to date:** [N]. **Buffer slot activation needed:** [Yes / No]. **Risk level for Friday:** [Low / Medium / High; explain.]

## Decider Checkpoint

**Decider sign-off required before Wednesday begins.**

- [ ] Decider confirms all team members produced a Solution Sketch (no skipping; no group sketches).
- [ ] Decider confirms sketch attribution has been stripped before sketches are added to Wednesday's heat-map board.
- [ ] Decider acknowledges that Wednesday's heat-map is blind (votes on sketches, not on sketchers).
- [ ] Decider commits to attending Wednesday morning 09:00-12:30 for heat-map plus critique plus supervote (the load-bearing Wednesday window).
- [ ] Decider confirms recruiting tracker status; no Friday-blocking cancellations.

**Signed:** [Decider name, role], [ISO date and local time]

## Example Output

<details>
<summary>Design Sprint Tuesday Artifact: Brainshelf Camera-Capture Validation</summary>

# Design Sprint Tuesday Artifact: Brainshelf Camera-Capture Validation

Tuesday 2026-06-02. Monday closed with Jamie selecting the capture-plus-confirmation moment (map Steps 2 + 3 transition; includes a 2-step recall flow from the confirmation surface) as the target. Today the team produced 4 independent solution sketches against that target.

## Lightning Demo Board

Each team member presented 3 demos (3 min each) during the 09:15-10:45 lightning session. Facilitator (Riley) extracted reusable patterns. Total demos: 12. Total patterns: 12.

| Presenter | Demo source | Reusable pattern (one line) |
|---|---|---|
| Jamie | Apple Wallet (add pass flow) | Single-tap commit with system-handled confirmation animation |
| Jamie | Instagram (capture and post) | Camera-first surface with one-frame preview before commit |
| Jamie | Bear (note app) | Tag-on-save with auto-suggested tags from recent context |
| Alex | Day One (journal) | Library view with chronological + manual collection switching |
| Alex | Pinterest (pin save) | Save-from-anywhere with visual confirmation card overlay |
| Alex | Google Photos (face grouping) | Trust through "we found this; correct us" framing |
| Sam | Linear (issue creation) | Quick-add field with smart parsing of free-text input |
| Sam | Robinhood (buy confirmation) | High-stakes confirmation with explicit cancel window before commit |
| Sam | Notion (database row) | Editable-in-place after capture; correction is friction-free |
| Riley | Goodreads (book add) | The status quo we are competing against; over-friction at capture |
| Riley | Letterboxd (film log) | Capture-as-rating; rating becomes the capture confirmation |
| Riley | Things 3 (task quick-entry) | Capture flow that escapes to background instantly; no modal trap |

**Patterns most likely to influence sketches** (Riley's read; not voted): single-tap commit with animation (Jamie/Apple Wallet); trust through "we found this; correct us" framing (Alex/Google Photos); editable-in-place after capture (Sam/Notion); capture escapes to background instantly (Riley/Things 3).

## Sketch Assignment Plan

**Approach:** Swarm. All four team members sketch the same target moment. Rationale: first Design Sprint for this team; default for v0.1 sprints; divide would broaden coverage but reduce comparability.

**Target for sketching:** "Capture moment plus immediate post-capture confirmation surface" (map Steps 2 + 3 transition; includes a 2-step recall flow from the confirmation surface).

**Time allocations:** Notes 20 min (11:00-11:20); Ideas 20 min (11:30-11:50); Crazy 8s 8 min (13:30-13:38); Solution Sketch 90 min (13:40-15:10). Team committed to the full 90-min Solution Sketch window for thoroughness.

**Constraint:** Silent independent work. No looking at others' Figma frames. No talking. Riley times each step and gives 5-min and 1-min warnings.

## Four-Step Sketches

All four sketches produced in Figma frames sized 1170 x 2532 (iPhone Pro vertical). Each sketcher used a single artboard with a 3-panel storyboard structure. Sketches collected at 15:10 PT, attribution stripped, named "Sketch A / B / C / D" in random order for Wednesday's heat-map.

### Sketch B (Jamie's; attribution visible Tuesday to team for completion verification, stripped Wednesday morning for blind heat-map)

**Solution Sketch description:** Panel 1 shows the camera surface with a book held in frame; the cover is recognized with a subtle pulsing outline; bottom shows "Twig and Cover Books" detected with a thumbnail-sized cover preview. Panel 2 shows the post-capture confirmation: a card slides up from the bottom with the book cover, title, author, and 4 chips for "Read / Want to read / Reading / Reference"; a 5-second visible undo countdown sits in the top-right. Panel 3 shows the immediate recall surface: the same book now appears at the top of a "Recently captured" row in the user's library, with a "where you saw it" tag (geolocation; bookstore name detected) and a "books like this you have" mini-row.

**Distinctive elements:** Drew on Sam's Robinhood pattern (explicit cancel window before commit; 5-second undo countdown). The "where you saw it" geolocation pattern is novel; no demo had it.

### Sketch D (Alex's; attribution stripped Wednesday morning)

**Solution Sketch description:** Panel 1 shows a full-bleed camera viewfinder with a thin AR-style frame around the book; recognition is indicated only by haptic-equivalent visual (a soft glow at the edges); no on-screen text during capture. Panel 2 shows the confirmation as a Polaroid-style card that animates into a stack of recent captures; the card itself shows cover + title + a "Tap to correct" small text at bottom; correction tap opens an inline editable field with auto-suggestions. Panel 3 shows the library view as a visual-first wall of book covers with a search bar at top; search opens to a "found in your library: 3 books that mention X" panel.

**Distinctive elements:** Drew on Alex's own Google Photos "we found this; correct us" pattern (correction is friction-free in-place). The Polaroid-stack metaphor is novel. Panel 1 trusts haptic feedback over visual text; tests whether minimalism feels confident or anxious.

### Sketch C (Sam's; attribution stripped Wednesday morning)

**Solution Sketch description:** Panel 1 shows the camera surface with explicit two-step capture: tap to capture, tap again to commit (vs. auto-commit on recognition). Panel 2 shows the confirmation as a full-screen modal with the book cover plus 6 explicit metadata fields the user can edit (title, author, edition, format, status, optional note); a prominent "Save" button bottom-right; no auto-tagging. Panel 3 shows the library as a tabular list with sortable columns (title, author, captured-on, status).

**Distinctive elements:** Engineer's preference for explicit user control over magic. Drew on Linear's quick-add pattern but inverted (Linear is fast; Sam's sketch is intentional and thorough). Tests whether the target customer wants confidence-via-control or confidence-via-system-intelligence.

### Sketch A (Riley's; attribution stripped Wednesday morning)

**Solution Sketch description:** Panel 1 shows the camera with the book in frame; recognition surfaces a single best-match cover at the top of the screen with "Is this right? Yes / No"; tapping Yes commits. Panel 2 shows the confirmation as a journal-entry-style card: book cover left, freeform text input right ("Why did you grab this?"); the text field is optional but prominent. Panel 3 shows the library view organized by "captured contexts" (chips at top: "Last weekend at Powell's" / "From Devon's recommendation" / "Following the Octavia Butler trail"); tapping a chip filters the library.

**Distinctive elements:** Customer-expert's reading on what readers actually care about: the story of why they grabbed the book, not just the metadata. Drew on Things 3's escape-to-background pattern (the freeform text is optional; capture completes without it). The "captured contexts" library organization is novel; no demo had context-as-primary-organization.

## Recruiting Tracker Update (Tuesday Check-in, 12:35 PT)

| Slot | Customer name (or ID) | Status | Notes |
|---|---|---|---|
| Fri 09:00 | UI-Panel-A (US, age 38, M) | Confirmed | Reschedule risk Low; reminder sent |
| Fri 10:30 | Discord-1 (UK, age 31, F) | Confirmed | High enthusiasm; pre-screen score 9/10 |
| Fri 12:00 | Discord-2 (US, age 45, F) | Cancelled (work conflict; 12:20 PT email) | Buffer activation needed |
| Fri 14:00 | Discord-3 (Canada, age 29, M) | Confirmed | |
| Fri 15:30 | UI-Panel-B (Australia, age 52, F) | Confirmed | Time-zone challenge: 09:30 their local; confirmed comfortable |
| Fri 17:00 (buffer) | Discord-4 (US, age 36, M) | Activated 14:50 PT in response to 12:00 cancellation | Moved to 12:00 slot; buffer slot now empty |

**Cancellations to date:** 1. **Buffer slot activation needed:** Triggered; Discord-4 moved to 12:00; buffer slot now empty (next cancellation triggers escalation). **Risk level for Friday:** Low. Buffer used; team aware that one more cancellation triggers cohort-shrinks-to-4 protocol.

## Decider Checkpoint

**Decider sign-off required before Wednesday begins.**

- [x] Jamie confirms all 4 team members produced a Solution Sketch (no skipping; no group sketches; Riley enforced silence during the 90-min Solution Sketch window).
- [x] Jamie confirms sketch attribution has been stripped before sketches are added to Wednesday's heat-map board (sketches renamed A / B / C / D in random order; sketcher names removed from Figma frame metadata).
- [x] Jamie acknowledges that Wednesday's heat-map is blind (votes on sketches, not on sketchers); team has agreed not to discuss attribution until after the supervote.
- [x] Jamie commits to attending Wednesday morning 09:00-12:30 PT for heat-map plus critique plus supervote.
- [x] Jamie confirms recruiting tracker status: 1 cancellation absorbed by buffer activation; risk Low for Friday; one more cancellation triggers cohort-shrinks-to-4 protocol.

**Signed:** Jamie (founder, PM), 2026-06-02 16:50 PT.

**Tuesday closed. Sketches uploaded as Sketch A/B/C/D to shared Figma board for Wednesday's heat-map.**

</details>
