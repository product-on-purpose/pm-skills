---
skill: tool-foundation-sprint-approach-options
thread: brainshelf_book-catalog
scenario: Day 2 morning Approach Options bundled artifact
status: spec-validation draft
purpose: Sample output for design validation; not a library sample
spec_section: foundation-sprint-design-spec.md section 5
prerequisite_artifact: sample_tool-foundation-sprint-differentiation_brainshelf.md
---

# Foundation Sprint Approach Options: Brainshelf (Day 2 Morning)

## Five Candidate Approaches

The team generated 9 candidate approaches in silent ideation, clustered them, and the Decider narrowed to 5 for one-page evaluation. (Per the ratified spec decision: minimum 3, warn at 4-7, reject at 8+.)

---

### Approach A: Camera-First Capture
**Label:** Yellow / Camera

**What it is:** The home screen is a camera. Point it at a book spine, dust jacket, or shelf and the app captures it via OCR + cover-recognition into a private library.

**Why it's a good idea:** Eliminates typing entirely. Sub-3-second capture is achievable. Naturally private (no feed). Matches how people physically encounter books they want to remember.

**Sketch:**
```text
+----------------+
|                |
|   [CAMERA]     |
|     viewfinder |
|                |
|   "Snap a book"|
|                |
|  [recents]     |
+----------------+
```

**How it serves the differentiators:**
- Capture speed: maximum (single action, no typing)
- Personal recall: requires complementary recall view (separate screen)

---

### Approach B: Library Browser
**Label:** Blue / Library

**What it is:** The home screen is the user's personal library (visual grid of book covers). A persistent capture button floats above. Recall is by browsing.

**Why it's a good idea:** Beautiful default state. Matches mental model of a physical shelf. Recall is one tap.

**Sketch:**
```text
+----------------+
| [+] My Library |
|  [b][b][b][b]  |
|  [b][b][b][b]  |
|  [b][b][b][b]  |
|                |
+----------------+
```

**How it serves the differentiators:**
- Capture speed: high but requires extra tap (Floating Action Button)
- Personal recall: very high (the home screen IS recall)

---

### Approach C: Voice-First Capture
**Label:** Green / Voice

**What it is:** User speaks: "Just finished Project Hail Mary, loved the alien biology." App resolves the book, captures the note, files it. Recall is also voice ("did I read anything by Andy Weir?").

**Why it's a good idea:** Hands-free. Captures opinions, not just titles. Especially fast from physical contexts (walking out of bookstore, finishing on a treadmill).

**Sketch:**
```text
+----------------+
|                |
|  "Speak"  [mic]|
|                |
|  Listening...  |
|                |
|  Just heard:   |
|  "Project Hail |
|   Mary"        |
+----------------+
```

**How it serves the differentiators:**
- Capture speed: very high (no UI manipulation)
- Personal recall: medium (voice recall is less reliable for "did I read X?")

---

### Approach D: Bookstore Mode
**Label:** Red / Store

**What it is:** A specialized mode triggered by geofence at bookstores/libraries that switches the app into "have I read this?" lookup. Browse with phone in hand; titles flash up read/unread status.

**Why it's a good idea:** Surfaces personal recall at the highest-friction moment. Solves the "did I already read this?" pain directly. Differentiated against every competitor.

**Sketch:**
```text
+----------------+
|  Powell's      |
|  Books         |
|                |
|  Project Hail  |
|  Mary  [READ]  |
|                |
|  Tomorrow      |
|  [NEW]         |
+----------------+
```

**How it serves the differentiators:**
- Capture speed: lower than A/B/C (mode-specific)
- Personal recall: extremely high (context-aware recall)

---

### Approach E: Read-Later Capture Triage
**Label:** Purple / Triage

**What it is:** Brainshelf is a strict capture-and-recall tool for "want to read" intent. Recommendations from any source (article, friend text, podcast) flow into a single triage queue; user processes weekly.

**Why it's a good idea:** Solves the "I get recommendations and lose them" pain directly. Models the product on Pocket / Instapaper, which is a familiar mental model.

**Sketch:**
```text
+----------------+
| Inbox (8 new)  |
|                |
| Snow Crash     |
|   from Sarah   |
|   [archive]    |
|                |
| Pachinko       |
|   from Vox     |
|   [archive]    |
+----------------+
```

**How it serves the differentiators:**
- Capture speed: high via share extension
- Personal recall: medium (recall is about queue, not memory)

---

## Approach Set Summary

| Label | Approach | Capture mechanism | Recall mechanism |
|---|---|---|---|
| Yellow | Camera-First | Visual scan | Browse + search |
| Blue | Library Browser | Tap-add (FAB) | Visual library |
| Green | Voice-First | Voice | Voice + search |
| Red | Bookstore Mode | Geofenced lookup | Context-aware |
| Purple | Triage Inbox | Share extension | Inbox + done-list |

## Decider Checkpoint

**Decider sign-off required before Day 2 afternoon (Magic Lenses) begins.**

- [x] Jamie confirms 5 approaches advance to Magic Lenses evaluation.
- [x] Jamie confirms all 5 honor the 5 decision principles from yesterday.
- [x] Jamie acknowledges that Magic Lenses will narrow to 1 top bet + 1 backup; not all 5 will survive.
- [x] Jamie has not pre-committed to any approach; entering Magic Lenses with genuine uncertainty.

**Signed:** Jamie (founder, PM), 2026-05-14 11:50 PT

---

*This sample represents the output a single invocation of `/tool-foundation-sprint-approach-options` would produce. Spec section: `foundation-sprint-design-spec.md` section 5.*
