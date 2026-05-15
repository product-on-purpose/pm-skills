---
skill: tool-foundation-sprint-magic-lenses
thread: brainshelf_book-catalog
scenario: Day 2 afternoon Magic Lenses evaluation
status: spec-validation draft
purpose: Sample output for design validation; not a library sample
spec_section: foundation-sprint-design-spec.md section 6
prerequisite_artifact: sample_tool-foundation-sprint-approach-options_brainshelf.md
---

# Foundation Sprint Magic Lenses: Brainshelf (Day 2 Afternoon)

Approach labels: A=Yellow Camera, B=Blue Library, C=Green Voice, D=Red Bookstore, E=Purple Triage.

Scoring per lens: each approach plotted on a 2x2 of (high/low value on that lens) x (high/low feasibility for that lens). The team uses dot positions rather than numeric scores to keep the discussion qualitative.

## Customer Lens

**Question:** Which approach do target customers immediately understand and want?

| Approach | Customer perception | Position |
|---|---|---|
| Yellow Camera | "I get it. Point and capture." | High value, high feasibility |
| Blue Library | "Pretty. But I don't have books to put in it yet." | Medium value (chicken-and-egg) |
| Green Voice | "Cool, but I talk to my phone in public?" | Medium value, mixed appetite |
| Red Bookstore | "Wait, you do that?" (delight) | Very high value, narrow context |
| Purple Triage | "Like Pocket for books. Sure." | Medium value, low novelty |

**Top per Customer Lens:** Yellow (broad), Red (deep delight).

## Pragmatic Lens

**Question:** Which approach can the team realistically ship at quality in 8-10 weeks?

| Approach | Build cost | Risk |
|---|---|---|
| Yellow Camera | Medium (OCR + cover-recognition; Apple Vision API available) | Acceptable |
| Blue Library | Low (CRUD + UI polish) | Low |
| Green Voice | High (voice quality + book entity resolution) | High |
| Red Bookstore | High (geofence + offline book DB) | Very high |
| Purple Triage | Low-medium (share extension + queue UI) | Low |

**Top per Pragmatic Lens:** Blue, Yellow.

## Growth Lens

**Question:** Which approach gives the team a story strong enough to acquire users without paid channels?

| Approach | Why people would tell a friend |
|---|---|
| Yellow Camera | "I just snap books, it's the easiest tracker I've used." Decent. |
| Blue Library | "My library looks nice." Low signal. |
| Green Voice | "I talk to it and it just works." High novelty IF it works. |
| Red Bookstore | "It tells me at the bookstore if I've already read it." Highest novelty. |
| Purple Triage | "Pocket for books." Low novelty. |

**Top per Growth Lens:** Red, Green (if voice quality holds), Yellow.

## Money Lens

**Question:** Which approach has the cleanest path to a paying customer?

| Approach | Monetization story |
|---|---|
| Yellow Camera | Free tier with limit; paid sync + cross-device. Familiar. |
| Blue Library | Same as Yellow; library-as-portfolio enables aesthetic premium. |
| Green Voice | Same as Yellow; voice is a free differentiator, not a paywall. |
| Red Bookstore | Bookstore mode could be a premium feature (geofence intelligence). |
| Purple Triage | Triage capacity could tier (10 / 50 / unlimited). Pocket precedent. |

**Top per Money Lens:** All approaches have similar models. Slight edge to Blue (visual library could be a premium aesthetic) and Red (premium context awareness).

## Custom Lens 1: Defensibility Against Goodreads / Amazon

**Question:** If Goodreads decided to copy this in 6 months, which approach would still feel different?

| Approach | Defensible? |
|---|---|
| Yellow Camera | No. Goodreads has cover scanning today. |
| Blue Library | Partially. Brainshelf's principles (private, no feed) make this strategically distinct. |
| Green Voice | Yes. Goodreads is unlikely to commit to voice; mobile-app-first companies dominate. |
| Red Bookstore | Yes. Goodreads is owned by Amazon; geofencing physical bookstores is awkward for them. |
| Purple Triage | Partially. The triage pattern is well-known. |

**Top per Defensibility Lens:** Red, Green.

## Pattern Review

**Consistent winners:** Yellow Camera (4 of 5 lenses positive), Red Bookstore (4 of 5 lenses positive).

**Contradictions:**
- Red is high on Customer + Growth + Money + Defensibility but failing Pragmatic. Hardest to ship; highest leverage if shipped.
- Yellow is positive across all five but never #1 on any single lens. Strong consistent middle.

**Biggest tradeoff:** Boring-and-shippable (Yellow) versus risky-and-distinctive (Red).

**Eliminations after pattern review:**
- Blue Library: chicken-and-egg problem (empty library at launch); not strong enough on its own.
- Green Voice: feasibility risk too high for the differentiation it provides; voice can be a feature inside another approach later.
- Purple Triage: doesn't carry the "did I read this?" recall pain hard enough.

The team is left with Yellow vs Red as the realistic choice for Day 2.

## Top Bet (Decider Supervote)

**Top bet: Approach A (Yellow Camera-First Capture).**

Rationale: The riskiest assumption for Brainshelf is not "is this concept appealing" (Red would tell us that). The riskiest assumption is "will people switch from doing nothing to using a tracking app at all if friction drops below 3 seconds?" Yellow tests that hypothesis most directly. If Yellow succeeds, Red becomes a Phase 2 differentiator. If Yellow fails (people don't capture even with no friction), Red doesn't save the product.

## Backup Plan

**Backup: Approach D (Red Bookstore Mode).**

If the Design Sprint test of Yellow shows weak adoption ("customers nod but don't actually capture"), Brainshelf pivots to lead with bookstore-mode delight. Recall-at-context becomes the wedge, capture follows.

## Decision Rationale

The team converged on Yellow over Red because the test value of Yellow is higher. Validating the core capture-speed differentiator early de-risks every downstream investment. Red is more delightful but tests a narrower (and later) part of the product. Better to know if the foundation works first.

## Decider Checkpoint

**Decider sign-off required before Founding Hypothesis writing begins.**

- [x] Jamie names Yellow (Camera-First Capture) as the top bet.
- [x] Jamie names Red (Bookstore Mode) as the backup.
- [x] Jamie commits to NOT building Yellow as a Camera with Red features grafted on. They are distinct approaches with distinct testing paths.
- [x] Jamie agrees to test the Yellow top bet via the planned Design Sprint week of May 26.

**Signed:** Jamie (founder, PM), 2026-05-14 15:40 PT

---

*This sample represents the output a single invocation of `/tool-foundation-sprint-magic-lenses` would produce. Spec section: `foundation-sprint-design-spec.md` section 6.*
