---
title: "Foundation Sprint Magic Lenses"
description: "Day 2 afternoon move of a Foundation Sprint. Evaluates the candidate approach set through multiple lenses (4 classic plus at least 1 custom) to surface trade-offs, identify consistent winners and contradictions, and produce a top bet plus a backup plan. Use after Approach Options is signed. Lens scoring is a sense-making tool, not mathematical truth; arbitrary precision is a smell."
generated: true
source: scripts/generate-skill-pages.py
tags:
  - tool
  - validation
---

:::note[Quick facts]
**Classification:** tool | **Version:** 0.1.0 | **Category:** validation | **License:** Apache-2.0
:::

**Try it:** `/tool-foundation-sprint-magic-lenses "Your context here"`

Day 2 afternoon of a Foundation Sprint. The team evaluates each candidate approach from multiple perspectives, surfaces contradictions, and produces a top bet plus a backup plan. The Decider names both; without an explicit backup, invalidation of the top bet sends the team back to ambiguous debate.

Family contract: [`docs/reference/skill-families/foundation-sprint-skills-contract.md`](../../reference/skill-families/foundation-sprint-skills-contract.md). This skill is a member of `foundation-sprint-skills`.

## When to Use

- Day 2 afternoon of a Foundation Sprint.
- Approach Options is signed; the team has 3-7 candidate approaches advancing.
- The team has at least 1 team-specific custom lens prepared (per ratified spec decision; classic lenses alone are insufficient).

## When NOT to Use

- Approach Options is unresolved or under-numbered (fewer than 3). Force a third option through the approach-options skill first.
- The team has pre-committed to a top bet. Magic Lenses is a sense-making exercise; if the decision is already made, the time is better spent on Founding Hypothesis.
- The team is exhausted and cannot evaluate clearly. Postpone to Day 2 morning of a follow-up sprint rather than rush.

## How to Use

Use the `/tool-foundation-sprint-magic-lenses` slash command:

```
/tool-foundation-sprint-magic-lenses "Your context here"
```

Or reference the skill file directly: `skills/tool-foundation-sprint-magic-lenses/SKILL.md`

## Output Template

# Foundation Sprint Magic Lenses: [Initiative name] (Day 2 Afternoon)

<!-- Lens evaluation of the candidate approach set. Produces top bet plus backup plan. -->

Approach labels: [List the 3-7 approaches from Approach Options with their labels.]

## Customer Lens

**Question:** Which approach do target customers immediately understand and want?

| Approach | Customer perception | Position |
|---|---|---|
| [Label 1] | [Brief reaction] | [HV-HF / HV-LF / LV-HF / LV-LF] |
| [Label 2] | [Brief reaction] | [position] |
| [Label 3] | [Brief reaction] | [position] |

**Top per Customer Lens:** [Approach label(s)]

## Pragmatic Lens

**Question:** Which approach can the team ship at quality in the build window?

| Approach | Build cost | Risk |
|---|---|---|
| [Label 1] | [Low / Medium / High] | [Low / Medium / High] |
| [Label 2] | [...] | [...] |

**Top per Pragmatic Lens:** [Approach label(s)]

## Growth Lens

**Question:** Which approach gives the team a story strong enough to acquire users without paid channels?

| Approach | Why people would tell a friend |
|---|---|
| [Label 1] | [One-line word-of-mouth story] |
| [Label 2] | [...] |

**Top per Growth Lens:** [Approach label(s)]

## Money Lens

**Question:** Which approach has the cleanest path to a paying customer?

| Approach | Monetization story |
|---|---|
| [Label 1] | [Path to revenue] |
| [Label 2] | [...] |

**Top per Money Lens:** [Approach label(s)]

## Custom Lens [N]: [Name]

**Question:** [The lens-specific question the team needs answered.]

| Approach | [Lens-specific dimension] |
|---|---|
| [Label 1] | [Assessment] |
| [Label 2] | [...] |

**Top per [Custom Lens]:** [Approach label(s)]

[Add additional custom lenses as needed. Minimum 1 custom lens required.]

## Pattern Review

**Consistent winners:** [Approaches that scored top half of 3+ lenses.]

**Consistent losers (eliminated):**
- [Label]: [Why this approach drops out.]
- [Label]: [...]

**Contradictions:**
- [Contradiction pattern]: [Which approaches win one lens hard but lose another?]

**Biggest trade-off:** [Name it explicitly. The Decider's choice is along this axis.]

## Top Bet (Decider Supervote)

**Top bet: [Approach label and name].**

Rationale: [Two or three sentences naming the trade-off the Decider is taking. Should be defensible in language.]

## Backup Plan

**Backup: [Distinct approach label and name].**

[One paragraph explaining when the team falls back to this. The backup MUST be strategically distinct from the top bet, not an iteration of it.]

## Decision Rationale

[One paragraph explaining why this top bet over this backup. This paragraph becomes the spine of the Founding Hypothesis's "why we believe this" section.]

## Decider Checkpoint

**Decider sign-off required before Founding Hypothesis writing begins.**

- [ ] Decider names the top bet with explicit rationale.
- [ ] Decider names the backup as a distinct strategic direction (not an iteration).
- [ ] Decider commits to testing the top bet via the planned next step (Design Sprint, customer research, experiment).
- [ ] Decider acknowledges the trade-off being taken; the team agrees that re-litigation requires invalidation evidence, not preference shifts.

**Signed:** [Decider name, role], [ISO date and local time]

## Example Output

<details>
<summary>Foundation Sprint Magic Lenses: Brainshelf (Day 2 Afternoon)</summary>

# Foundation Sprint Magic Lenses: Brainshelf (Day 2 Afternoon)

The Brainshelf team's Day 2 PM lens evaluation. Top bet and backup named.

Approach labels: A=Yellow Camera, B=Blue Library, C=Green Voice, D=Red Bookstore, E=Purple Triage.

## Customer Lens

**Question:** Which approach do target customers immediately understand and want?

| Approach | Customer perception | Position |
|---|---|---|
| Yellow Camera | "I get it. Point and capture." | HV-HF (high value, high feasibility) |
| Blue Library | "Pretty. But I don't have books to put in it yet." | MV-HF (medium value, chicken-and-egg) |
| Green Voice | "Cool, but I talk to my phone in public?" | MV-LF (mixed appetite) |
| Red Bookstore | "Wait, you do that?" (delight) | VHV-LF (very high value, narrow context) |
| Purple Triage | "Like Pocket for books. Sure." | MV-HF (low novelty) |

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

**Consistent winners:** Yellow Camera (positive on 4 of 5 lenses), Red Bookstore (positive on 4 of 5 lenses).

**Consistent losers (eliminated):**
- Blue Library: chicken-and-egg problem (empty library at launch); not strong enough on its own.
- Green Voice: feasibility risk too high for the differentiation it provides; voice can be a feature inside another approach later.
- Purple Triage: doesn't carry the "did I read this?" recall pain hard enough.

**Contradictions:**
- Red is high on Customer + Growth + Money + Defensibility but failing Pragmatic. Hardest to ship; highest leverage if shipped.
- Yellow is positive across all five but never #1 on any single lens. Strong consistent middle.

**Biggest trade-off:** Boring-and-shippable (Yellow) versus risky-and-distinctive (Red).

## Top Bet (Decider Supervote)

**Top bet: Approach A (Yellow Camera-First Capture).**

Rationale: The riskiest assumption for Brainshelf is not "is this concept appealing" (Red would tell us that). The riskiest assumption is "will people switch from doing nothing to using a tracking app at all if friction drops below 3 seconds?" Yellow tests that hypothesis most directly. If Yellow succeeds, Red becomes a Phase 2 differentiator. If Yellow fails (people don't capture even with no friction), Red doesn't save the product.

## Backup Plan

**Backup: Approach D (Red Bookstore Mode).**

If the Design Sprint test of Yellow shows weak adoption ("customers nod but don't actually capture"), Brainshelf pivots to lead with bookstore-mode delight. Recall-at-context becomes the wedge, capture follows. This is a strategically distinct direction (context-driven recall) not an iteration of Yellow.

## Decision Rationale

The team converged on Yellow over Red because the test value of Yellow is higher. Validating the core capture-speed differentiator early de-risks every downstream investment. Red is more delightful but tests a narrower (and later) part of the product. Better to know if the foundation works first.

## Decider Checkpoint

**Decider sign-off required before Founding Hypothesis writing begins.**

- [x] Jamie names Yellow (Camera-First Capture) as the top bet.
- [x] Jamie names Red (Bookstore Mode) as the backup, strategically distinct from Yellow.
- [x] Jamie commits to NOT building Yellow as a Camera with Red features grafted on. They are distinct approaches with distinct testing paths.
- [x] Jamie agrees to test the Yellow top bet via the planned Design Sprint week of May 26.

**Signed:** Jamie (founder, PM), 2026-05-14 15:40 PT

</details>
