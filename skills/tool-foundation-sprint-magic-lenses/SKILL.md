---
name: tool-foundation-sprint-magic-lenses
description: Day 2 afternoon move of a Foundation Sprint. Evaluates the candidate approach set through multiple lenses (4 classic plus at least 1 custom) to surface trade-offs, identify consistent winners and contradictions, and produce a top bet plus a backup plan. Use after Approach Options is signed. Lens scoring is a sense-making tool, not mathematical truth; arbitrary precision is a smell.
license: Apache-2.0
metadata:
  classification: tool
  version: "1.0.0"
  updated: 2026-07-04
  tool: foundation-sprint
  move: magic-lenses
  category: validation
  frameworks:
    - foundation-sprint
    - click
    - character-note-and-vote
  timebox_minutes: 105
  roles:
    - facilitator
    - decider
    - pm
  prerequisites:
    - tool-foundation-sprint-approach-options
  inputs:
    - approach summaries
    - team-specific custom lenses
  outputs:
    - classic lens charts (customer, pragmatic, growth, money)
    - custom lens charts
    - pattern review
    - top bet
    - backup plan
    - decision rationale
  author: product-on-purpose
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Foundation Sprint Magic Lenses

Day 2 afternoon of a Foundation Sprint. The team evaluates each candidate approach from multiple perspectives, surfaces contradictions, and produces a top bet plus a backup plan. The Decider names both; without an explicit backup, invalidation of the top bet sends the team back to ambiguous debate.

Family contract: [`docs/reference/skill-families/foundation-sprint-skills-contract.md`](../../docs/reference/skill-families/foundation-sprint-skills-contract.md). This skill is a member of `foundation-sprint-skills`.

## When to Use

- Day 2 afternoon of a Foundation Sprint.
- Approach Options is signed; the team has 3-7 candidate approaches advancing.
- The team has at least 1 team-specific custom lens prepared (per ratified spec decision; classic lenses alone are insufficient).

## When NOT to Use

- Approach Options is unresolved or under-numbered (fewer than 3). Force a third option through the approach-options skill first.
- The team has pre-committed to a top bet. Magic Lenses is a sense-making exercise; if the decision is already made, the time is better spent on Founding Hypothesis.
- The team is exhausted and cannot evaluate clearly. Postpone to Day 2 morning of a follow-up sprint rather than rush.

## What This Skill Produces

A single bundled artifact with six sections:

1. **Classic lens charts**: customer, pragmatic, growth, money lenses each as a 2x2 plot or qualitative position of every approach.
2. **Custom lens charts**: at least 1 team-specific lens (defensibility, mission fit, founder excitement, learning rate, etc.).
3. **Pattern review**: consistent winners across lenses, contradictions, biggest trade-off the team is making.
4. **Top bet**: the Decider's chosen approach with rationale.
5. **Backup plan**: the runner-up approach the team falls back to if the top bet invalidates.
6. **Decision rationale**: one paragraph explaining why the top bet over the backup.

See `references/TEMPLATE.md` for the canonical structure and `references/EXAMPLE.md` for the Brainshelf example.

## The Five Canonical Lenses

| Lens | What it asks | Why it matters |
|---|---|---|
| Customer | Which approach do target customers immediately understand and want? | If customers don't get it, nothing else matters |
| Pragmatic | Which approach can the team ship at quality in [build window]? | Beautiful approaches the team can't ship are not real options |
| Growth | Which approach gives the team a story strong enough to acquire users without paid channels? | Friction at the door tells you about word-of-mouth potential |
| Money | Which approach has the cleanest path to a paying customer? | Strategic clarity must include the revenue path |
| Custom (1+ required) | Team-specific lens that captures what would otherwise be missed | Each team has a unique constraint or opportunity worth a dedicated view |

Custom lens examples: defensibility against a specific competitor, founder excitement, mission fit, learning rate, regulatory risk, partner alignment, hiring leverage.

## Sequence (105 minutes)

### Step 1: Frame the lenses (5 min)

Facilitator restates the 4 classic lenses and confirms the 1 or more custom lenses the team prepared. If no custom lens is prepared, this skill prompts the team to generate one before proceeding (per ratified spec decision).

### Step 2: Score each approach per lens (40-60 min)

For each lens, plot each approach on a 2x2 of (high/low value on that lens) by (high/low feasibility for that lens). Use dot positions rather than numeric scores; arbitrary precision (3.7 vs 3.8) is a smell that the team has confused sense-making with math.

The team discusses each lens briefly before plotting. Decider does not vote in this step; the Decider supervotes at the end.

### Step 3: Pattern review (15-25 min)

After all lenses are plotted, the team identifies:

- **Consistent winners**: approaches that score in the top half of 3 or more lenses.
- **Consistent losers**: approaches that score in the bottom half of 3 or more lenses. These drop out.
- **Contradictions**: approaches that win one lens hard but lose another. These surface the trade-offs the Decider must make.
- **Biggest trade-off**: name it explicitly. "Boring-and-shippable vs risky-and-distinctive." "Mass-market vs niche-defensible." Naming the trade-off prevents the Decider from picking by vibes.

### Step 4: Decider supervote on top bet (10-15 min)

The Decider names the top bet. The chosen approach should be:

- A consistent winner OR a contradictory approach the Decider explicitly chooses to take the bet on.
- Defensible in language ("we are betting [trade-off] because [reason]").
- Aligned with the Mini Manifesto from Day 1.

### Step 5: Decider names backup plan (5-10 min)

The Decider names the backup. The backup is NOT a second-place approach to soothe whoever advocated for it; it is the approach the team will pivot to if the top bet fails validation. The backup MUST be distinct from the top bet in strategic direction.

If the top bet and backup are too similar, the Decider has not named a real backup. The skill prompts for a more distinct alternative.

### Step 6: Decision rationale (5-10 min)

The Decider authors one paragraph explaining why this top bet over this backup. The rationale will become the spine of the Founding Hypothesis's "why we believe this" section.

## Common Pitfalls

- **Treating lens scoring as mathematical truth.** Lenses are sense-making tools; if the team argues about whether an approach scores 3.7 or 3.8 on a lens, the team has lost the plot.
- **Skipping the custom lens.** The 4 classic lenses are generic by design. The custom lens is where the team's specific situation shows up; skipping it produces a generic top bet.
- **Falling in love with the top bet.** Confidence after Magic Lenses should be calibrated, not high. The next skill, Founding Hypothesis, asks "what could prove us wrong"; the team that has fallen in love with the top bet cannot answer that question honestly.
- **Skipping the backup plan.** Without an explicit backup, invalidation sends the team back to ambiguous debate. The backup forces the team to acknowledge that the top bet might fail.
- **Backup that is too similar to top bet.** "Approach Yellow with one feature added" is not a backup; it's an iteration. Backup must be a different strategic direction.
- **Decider names top bet by enthusiasm, not by analysis.** The pattern review exists to give the Decider a structured basis for the call. If the Decider picks before the pattern review, the skill provided no value.

## Decider Role

The Decider's job during Magic Lenses:

1. Listen during lens scoring without telegraphing preferences.
2. Engage during pattern review to surface the trade-off explicitly.
3. Supervote the top bet with rationale.
4. Name the backup plan as a distinct strategic direction.
5. Author the one-paragraph decision rationale.

## Canonical Sources

- Character Capital. "Foundation Sprint guide." Magic Lenses section and lens definitions.
- Knapp, J., and Zeratsky, J. *Click*. Day 2 afternoon sequence.
- Knapp, J., and Zeratsky, J. "Introducing the Foundation Sprint." Lenny's Newsletter. Magic Lenses section.

## Cross-Skill Usage

Prerequisites: `tool-foundation-sprint-approach-options`. The approach set is the load-bearing input.

The skill invokes `tool-note-and-vote` at least once (for the top bet supervote when scoring is ambiguous). Additional invocations may happen for the custom lens definition if the team has not pre-prepared one.

Next invocation: `tool-foundation-sprint-founding-hypothesis` at Day 2 end. The top bet, the backup, and the decision rationale flow directly into the Founding Hypothesis template.

## Decider Checkpoint

This skill ends with a Decider Checkpoint in `references/TEMPLATE.md`. The Decider signs off on the top bet, the backup, and the decision rationale. Without sign-off, Founding Hypothesis cannot start cleanly.
