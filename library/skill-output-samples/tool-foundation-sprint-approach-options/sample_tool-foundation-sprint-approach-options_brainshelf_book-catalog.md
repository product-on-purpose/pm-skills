---
title: "Foundation Sprint Approach Options: Brainshelf Book Catalog (Day 2 Morning)"
description: "Brainshelf Day 2 morning: 5 candidate approaches generated, one-page-summarized, advancing to Magic Lenses evaluation."
artifact: foundation-sprint-approach-options
version: "1.0"
repo_version: "2.15.0"
skill_version: "0.1.0"
created: 2026-05-14
status: sample
thread: brainshelf
context: "Brainshelf Day 2 AM approach options; 5 candidates from Yellow Camera to Purple Triage"
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

The Brainshelf team is in Day 2 morning of their Foundation Sprint. Day 1 strategic position is committed (capture speed + personal recall). Jamie invokes `tool-foundation-sprint-approach-options` to force generation of 3-7 candidate approaches before Magic Lenses converges on a top bet. The team generated 9 candidates in silent ideation, clustered them, and the Decider narrowed to 5 for one-page evaluation.

## Approach A: Camera-First Capture

**Label:** Yellow / Camera

**What it is:** The home screen is a camera. Point it at a book spine, dust jacket, or shelf and the app captures it via OCR plus cover-recognition into a private library.

**Why it's a good idea:**

Eliminates typing entirely. Sub-3-second capture is achievable. Naturally private (no feed). Matches how people physically encounter books they want to remember. The 22 customer interviews repeatedly named typing-friction as the #1 reason for abandoning Goodreads; this approach attacks that pain directly.

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

- Capture speed: maximum (single action, no typing).
- Personal recall: requires complementary recall view (separate screen reachable from library badge).

---

## Approach B: Library Browser

**Label:** Blue / Library

**What it is:** The home screen is the user's personal library (visual grid of book covers). A persistent capture button floats above. Recall is by browsing.

**Why it's a good idea:**

Beautiful default state. Matches mental model of a physical shelf. Recall is one tap. Customers who use Apple Books or Kindle's library view recognize the pattern immediately.

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

- Capture speed: high but requires extra tap (Floating Action Button).
- Personal recall: very high (the home screen IS recall).

---

## Approach C: Voice-First Capture

**Label:** Green / Voice

**What it is:** User speaks: "Just finished Project Hail Mary, loved the alien biology." App resolves the book, captures the note, files it. Recall is also voice ("did I read anything by Andy Weir?").

**Why it's a good idea:**

Hands-free. Captures opinions, not just titles. Especially fast from physical contexts (walking out of bookstore, finishing on a treadmill).

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

- Capture speed: very high (no UI manipulation).
- Personal recall: medium (voice recall is less reliable for "did I read X?").

---

## Approach D: Bookstore Mode

**Label:** Red / Store

**What it is:** A specialized mode triggered by geofence at bookstores and libraries that switches the app into "have I read this?" lookup. Browse with phone in hand; titles flash up read/unread status.

**Why it's a good idea:**

Surfaces personal recall at the highest-friction moment. Solves the "did I already read this?" pain directly. Differentiated against every competitor.

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

- Capture speed: lower than A/B/C (mode-specific entry).
- Personal recall: extremely high (context-aware recall).

---

## Approach E: Read-Later Capture Triage

**Label:** Purple / Triage

**What it is:** Brainshelf is a strict capture-and-recall tool for "want to read" intent. Recommendations from any source (article, friend text, podcast) flow into a single triage queue; user processes weekly.

**Why it's a good idea:**

Solves the "I get recommendations and lose them" pain directly. Models the product on Pocket / Instapaper, which is a familiar mental model.

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

- Capture speed: high via share extension.
- Personal recall: medium (recall is about queue, not memory).

---

## Approach Set Summary

| Label | Approach | Primary capture / interaction | Primary value | Top trade-off |
|---|---|---|---|---|
| Yellow | Camera-First | Visual scan + OCR | Maximum capture speed | Recall is secondary screen |
| Blue | Library Browser | Tap-add (FAB) | Recall-as-home-screen | Capture takes extra tap |
| Green | Voice-First | Voice | Hands-free | Voice recall less reliable |
| Red | Bookstore Mode | Geofenced lookup | Context-aware recall | Niche; requires location data |
| Purple | Triage Inbox | Share extension | Captures recommendations from anywhere | No personal recall mechanism |

## Decider Checkpoint

**Decider sign-off required before Day 2 afternoon (Magic Lenses) begins.**

- [x] Jamie confirms 5 approaches advance to Magic Lenses evaluation.
- [x] Jamie confirms all 5 honor the 5 decision principles from yesterday.
- [x] Jamie confirms each approach serves both committed differentiators.
- [x] Jamie acknowledges that Magic Lenses will narrow to 1 top bet plus 1 backup; not all 5 will survive.
- [x] Jamie has not pre-committed to any approach.

**Signed:** Jamie (founder, PM), 2026-05-14 11:50 PT
