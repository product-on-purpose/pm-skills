---
title: "Foundation Sprint Magic Lenses: Brainshelf Book Catalog (Day 2 Afternoon)"
description: "Brainshelf Day 2 afternoon lens evaluation: 5 approaches scored across customer, pragmatic, growth, money, and defensibility lenses. Top bet Yellow Camera; backup Red Bookstore."
artifact: foundation-sprint-magic-lenses
version: "1.0"
repo_version: "2.15.0"
skill_version: "0.1.0"
created: 2026-05-14
status: sample
thread: brainshelf
context: "Brainshelf Day 2 PM Magic Lenses; Yellow Camera selected as top bet, Red Bookstore as backup"
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

The Brainshelf team is in Day 2 afternoon. Approach Options is signed; 5 candidates advance. Jamie invokes `tool-foundation-sprint-magic-lenses` to evaluate each through 4 classic plus 1 custom lens and name a top bet + backup.

Approach labels: A=Yellow Camera, B=Blue Library, C=Green Voice, D=Red Bookstore, E=Purple Triage.

## Customer Lens

**Question:** Which approach do target customers immediately understand and want?

| Approach | Customer perception | Position |
|---|---|---|
| Yellow Camera | "I get it. Point and capture." | HV-HF |
| Blue Library | "Pretty. But I don't have books to put in it yet." | MV-HF (chicken-and-egg) |
| Green Voice | "Cool, but I talk to my phone in public?" | MV-LF |
| Red Bookstore | "Wait, you do that?" (delight) | VHV-LF |
| Purple Triage | "Like Pocket for books. Sure." | MV-HF |

**Top per Customer Lens:** Yellow (broad), Red (deep delight).

## Pragmatic Lens

| Approach | Build cost | Risk |
|---|---|---|
| Yellow Camera | Medium (OCR + cover-recognition; Apple Vision API available) | Acceptable |
| Blue Library | Low (CRUD + UI polish) | Low |
| Green Voice | High (voice quality + book entity resolution) | High |
| Red Bookstore | High (geofence + offline book DB) | Very high |
| Purple Triage | Low-medium (share extension + queue UI) | Low |

**Top per Pragmatic Lens:** Blue, Yellow.

## Growth Lens

| Approach | Why people would tell a friend |
|---|---|
| Yellow Camera | "I just snap books." Decent. |
| Blue Library | "My library looks nice." Low signal. |
| Green Voice | High novelty IF voice quality holds. |
| Red Bookstore | "It tells me at the bookstore if I've already read it." Highest novelty. |
| Purple Triage | "Pocket for books." Low novelty. |

**Top per Growth Lens:** Red, Green, Yellow.

## Money Lens

| Approach | Monetization story |
|---|---|
| Yellow Camera | Free tier with limit; paid sync + cross-device. Familiar. |
| Blue Library | Same as Yellow; aesthetic premium possible. |
| Green Voice | Same as Yellow; voice is free differentiator. |
| Red Bookstore | Bookstore mode could be a premium feature. |
| Purple Triage | Triage capacity could tier (Pocket precedent). |

**Top per Money Lens:** Similar across all; slight edge to Blue and Red.

## Custom Lens 1: Defensibility Against Goodreads / Amazon

| Approach | Defensible? |
|---|---|
| Yellow Camera | No. Goodreads has cover scanning today. |
| Blue Library | Partially. Brainshelf principles (private, no feed) are strategically distinct. |
| Green Voice | Yes. Goodreads unlikely to commit to voice. |
| Red Bookstore | Yes. Amazon-owned Goodreads is awkward for geofencing bookstores. |
| Purple Triage | Partially. The triage pattern is well-known. |

**Top per Defensibility Lens:** Red, Green.

## Pattern Review

**Consistent winners:** Yellow (positive on 4 of 5 lenses), Red (positive on 4 of 5 lenses).

**Consistent losers (eliminated):**

- Blue: chicken-and-egg empty library at launch.
- Green: feasibility risk too high for the differentiation it provides.
- Purple: doesn't carry the "did I read this?" recall pain hard enough.

**Contradictions:**

- Red is high on Customer + Growth + Money + Defensibility but failing Pragmatic. Hardest to ship; highest leverage if shipped.
- Yellow is positive across all five but never #1 on any single lens. Strong consistent middle.

**Biggest trade-off:** Boring-and-shippable (Yellow) versus risky-and-distinctive (Red).

## Top Bet (Decider Supervote)

**Top bet: Approach A (Yellow Camera-First Capture).**

Rationale: The riskiest assumption for Brainshelf is not "is this concept appealing" (Red would tell us that). The riskiest assumption is "will people switch from doing nothing to using a tracking app at all if friction drops below 3 seconds?" Yellow tests that hypothesis most directly. If Yellow succeeds, Red becomes a Phase 2 differentiator. If Yellow fails, Red doesn't save the product.

## Backup Plan

**Backup: Approach D (Red Bookstore Mode).**

If the Design Sprint test of Yellow shows weak adoption ("customers nod but don't actually capture"), Brainshelf pivots to lead with bookstore-mode delight. Recall-at-context becomes the wedge, capture follows. This is a strategically distinct direction (context-driven recall) not an iteration of Yellow.

## Decision Rationale

The team converged on Yellow over Red because the test value of Yellow is higher. Validating the core capture-speed differentiator early de-risks every downstream investment. Red is more delightful but tests a narrower part of the product. Better to know if the foundation works first.

## Decider Checkpoint

**Decider sign-off required before Founding Hypothesis writing begins.**

- [x] Jamie names Yellow (Camera-First Capture) as the top bet.
- [x] Jamie names Red (Bookstore Mode) as the backup, strategically distinct from Yellow.
- [x] Jamie commits to NOT building Yellow as a Camera with Red features grafted on.
- [x] Jamie agrees to test the Yellow top bet via the planned Design Sprint week of May 26.

**Signed:** Jamie (founder, PM), 2026-05-14 15:40 PT
