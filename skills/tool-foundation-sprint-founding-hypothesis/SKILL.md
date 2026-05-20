---
name: tool-foundation-sprint-founding-hypothesis
description: Day 2 end capstone move of a Foundation Sprint. Compresses the sprint's full strategic frame into a single canonical sentence (the Founding Hypothesis) plus an assumption scorecard, why-we-believe, what-could-prove-us-wrong, and recommended next validation step. Use after Magic Lenses is signed. Strict canonical template; paraphrase is not accepted in v0.1.0. The Founding Hypothesis is the spine artifact the sprint exists to produce.
license: Apache-2.0
metadata:
  classification: tool
  version: "0.1.0"
  updated: 2026-05-14
  tool: foundation-sprint
  move: founding-hypothesis
  category: problem-framing
  frameworks:
    - foundation-sprint
    - click
  timebox_minutes: 45
  roles:
    - facilitator
    - decider
    - pm
  prerequisites:
    - tool-foundation-sprint-basics
    - tool-foundation-sprint-differentiation
    - tool-foundation-sprint-magic-lenses
  inputs:
    - basics bundled artifact
    - differentiation bundled artifact
    - top bet and backup
  outputs:
    - founding hypothesis statement
    - assumption scorecard
    - why we believe this
    - what could prove us wrong
    - recommended next validation step
  author: product-on-purpose
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Foundation Sprint Founding Hypothesis

Day 2 end of a Foundation Sprint. The team compresses the full sprint output into a single canonical sentence plus a testable scorecard. This is the artifact the sprint exists to produce; everything before this skill was preparation. Without a ratifiable Founding Hypothesis, the sprint failed.

Family contract: [`docs/reference/skill-families/foundation-sprint-skills-contract.md`](../../docs/reference/skill-families/foundation-sprint-skills-contract.md). This skill is a member of `foundation-sprint-skills`.

## When to Use

- Day 2 end of a Foundation Sprint.
- Magic Lenses is signed; top bet and backup are named.
- The team has 30-45 minutes left in Day 2 and the energy to write the sentence carefully.

## When NOT to Use

- Magic Lenses did not produce a clear top bet. Return to Magic Lenses; the Founding Hypothesis cannot stabilize on an unstable top bet.
- The team wants to "polish the hypothesis later." The hypothesis must be ratified by end of Day 2 or the sprint output is incomplete. Polishing later means re-litigating; that defeats the sprint's purpose.
- The team wants to ratify a vague hypothesis to "ship the sprint." A vague hypothesis is worse than no hypothesis; it gives false confidence and burns trust when validation fails.

## What This Skill Produces

A single bundled artifact with five sections:

1. **Founding Hypothesis statement**: the single canonical sentence (strict template, no paraphrase).
2. **Assumption scorecard**: 5-7 assumptions extracted from the hypothesis, each scored on current confidence and tagged with a best next test (3-10 accepted; recommended range is 5-7).
3. **Why we believe this**: 3-5 bulleted points naming the evidence base.
4. **What could prove us wrong**: 3-5 bulleted points naming the risks. This section is the test of whether the team is in love with the hypothesis or holding it with calibrated confidence.
5. **Recommended next validation step**: Design Sprint, customer research, experiment, landing page test, or other. Names the specific test, owner, and timeline.

See `references/TEMPLATE.md` for the canonical template and `references/EXAMPLE.md` for the Brainshelf example.

## The Canonical Template (Strict)

```text
If we help [target customer] solve [important problem]
with [approach], they will choose it over [competitors or alternatives]
because our solution is [differentiators].
```

This template is strict for v0.1.0 (per ratified spec decision). Paraphrase is not accepted. Variations like "Because we help X with Y..." or compressing two slots into one ("solve [problem] with [approach]") are rejected by the skill. The strictness is intentional: forcing the template forces the team to fill every slot specifically.

The five slots are:

| Slot | Source | Discipline check |
|---|---|---|
| target customer | Basics target customer statement | Must be specific (markers, not segments) |
| important problem | Basics important problem statement | Must be painful enough to drive switching |
| approach | Magic Lenses top bet | Must be the top bet, not a softened version |
| competitors or alternatives | Basics competitor map | Must include "do nothing" if it was named there |
| differentiators | Differentiation chosen two | Must be both differentiators, not just one |

If any slot is vague, the skill rejects the hypothesis and prompts for revision.

## What Makes a Good Founding Hypothesis

| Quality | What it means |
|---|---|
| Specific | Names a real customer and a real problem; not "users" and "frustrations" |
| Comparative | Explains what customers choose today, including doing nothing |
| Differentiated | States why this solution should win, not just that it should |
| Testable | Translates into scorecard questions and experiments |
| Simple | A customer can understand the promise quickly |
| Uncomfortable enough to be useful | If nobody disagrees or feels exposed, the hypothesis may be too vague |

The "uncomfortable" quality is the hardest to enforce: teams unconsciously soften the hypothesis to make it ratifiable. The skill counter-acts by asking, in the discussion phase, "Who in this room would push back on this if they weren't on this team?" Silence is a signal that the hypothesis is too safe.

## Assumption Scorecard

Decompose the hypothesis into 5-7 assumptions (recommended; 3-10 accepted per ratified spec decision). For each:

| Field | What goes here |
|---|---|
| Assumption | One sentence, derived from a specific slot of the hypothesis |
| Why it matters | What would be invalidated if this assumption is wrong |
| Current confidence | High / Medium-high / Medium / Medium-low / Low |
| Best next test | Specific test that would change the confidence level |

The highest-risk assumption (lowest current confidence, highest blast-radius-if-wrong) is the assumption the next validation step (often a Design Sprint) should test first.

## Sequence (45 minutes)

### Step 1: Draft the hypothesis (10-15 min)

The Decider drafts the canonical sentence by filling the 5 slots from prior sprint outputs. The team reviews, identifies vagueness, and revises until each slot is specific. This is the most important 15 minutes of the sprint.

### Step 2: Build the scorecard (15-20 min)

Decompose the hypothesis into 5-7 assumptions. Score each. Identify the highest-risk one.

### Step 3: Why we believe / what could prove us wrong (5-10 min)

Bulleted lists, 3-5 each. The team writes both in parallel; the second list (proof-of-wrong) is the test of whether the team is holding the hypothesis with calibration.

### Step 4: Recommended next test (5 min)

The Decider names the next validation step: Design Sprint, customer research, experiment, etc. The recommended test should attack the highest-risk assumption from the scorecard.

### Step 5: Ratification (1 min)

The Decider signs. The sprint ends.

## Common Pitfalls

- **Vague customer or problem.** "Readers" or "frustrations" are not slots. The skill rejects them.
- **Non-falsifiable hypothesis.** "We will succeed" is not a hypothesis. "If we help X with Y they will choose us" is. The skill enforces the structure.
- **Treating hypothesis as strategy doc.** The hypothesis is a test target, not a strategic plan. The team's strategy decisions live in the Mini Manifesto and decision principles; the hypothesis is what you go test.
- **Skipping the scorecard.** The hypothesis is half the value; the test plan (scorecard + recommended next test) is the other half. Without the scorecard, the hypothesis is wall art.
- **Softening to ratify.** Teams will instinctively soften the hypothesis to make it less controversial. The skill counter-acts with the "would anyone push back" check.
- **Polishing later.** The hypothesis must be ratified by end of Day 2. Polishing later means re-litigating; the sprint discipline collapses.

## Decider Role

The Decider's job during Founding Hypothesis:

1. Draft the canonical sentence (or co-draft with the PM).
2. Lead the revision pass; push back on vague slots.
3. Score scorecard assumptions with the team; supervote when confidence ratings are contested.
4. Name the recommended next validation step explicitly.
5. Ratify the hypothesis by end of Day 2 even if some slot wording is imperfect; further polishing happens by editing the scorecard, not the hypothesis.

## Canonical Sources

- Knapp, J., and Zeratsky, J. *Click*. Founding Hypothesis template and rationale.
- Character Capital. "Foundation Sprint guide." Founding Hypothesis section.
- Knapp, J., and Zeratsky, J. "Introducing the Foundation Sprint." Lenny's Newsletter. Founding Hypothesis structure with worked examples.

## Cross-Skill Usage

Prerequisites: `tool-foundation-sprint-magic-lenses`. The top bet, backup, and decision rationale are the load-bearing inputs.

The skill inherits the Basics bundled artifact (target customer, important problem, competitors) and the Differentiation bundled artifact (chosen differentiators). All five hypothesis slots are derived from prior sprint outputs.

Next invocation outside the sprint: the recommended next validation step. Most commonly `tool-design-sprint-readiness` if a Design Sprint is the next test. Sometimes `pm-skills:measure-experiment-design` or `pm-skills:discover-interview-synthesis` if a non-sprint test is the right next move.

There is no formal bridge skill between Foundation Sprint and Design Sprint; the transition is narrative content in `_workflows/foundation-to-design.md` and in both user guides.

## Decider Checkpoint

This skill ends with a Decider Checkpoint in `references/TEMPLATE.md`. The Decider ratifies the hypothesis sentence, the scorecard, and the recommended next test. Ratification closes the Foundation Sprint. Without ratification, the sprint output is incomplete and the team did not produce what it set out to produce.
