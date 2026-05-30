---
title: "Foundation Sprint Founding Hypothesis"
description: "Day 2 end capstone move of a Foundation Sprint. Compresses the sprint's full strategic frame into a single canonical sentence (the Founding Hypothesis) plus an assumption scorecard, why-we-believe, what-could-prove-us-wrong, and recommended next validation step. Use after Magic Lenses is signed. Strict canonical template; paraphrase is not accepted in v0.1.0. The Founding Hypothesis is the spine artifact the sprint exists to produce."
generated: true
source: scripts/generate-skill-pages.py
tags:
  - tool
  - problem-framing
---

:::note[Quick facts]
**Classification:** tool | **Version:** 0.1.0 | **Category:** problem-framing | **License:** Apache-2.0
:::

**Try it:** `/pm-skills:tool-foundation-sprint-founding-hypothesis "Your context here"`

Day 2 end of a Foundation Sprint. The team compresses the full sprint output into a single canonical sentence plus a testable scorecard. This is the artifact the sprint exists to produce; everything before this skill was preparation. Without a ratifiable Founding Hypothesis, the sprint failed.

Family contract: [`docs/reference/skill-families/foundation-sprint-skills-contract.md`](../../reference/skill-families/foundation-sprint-skills-contract.md). This skill is a member of `foundation-sprint-skills`.

## When to Use

- Day 2 end of a Foundation Sprint.
- Magic Lenses is signed; top bet and backup are named.
- The team has 30-45 minutes left in Day 2 and the energy to write the sentence carefully.

## When NOT to Use

- Magic Lenses did not produce a clear top bet. Return to Magic Lenses; the Founding Hypothesis cannot stabilize on an unstable top bet.
- The team wants to "polish the hypothesis later." The hypothesis must be ratified by end of Day 2 or the sprint output is incomplete. Polishing later means re-litigating; that defeats the sprint's purpose.
- The team wants to ratify a vague hypothesis to "ship the sprint." A vague hypothesis is worse than no hypothesis; it gives false confidence and burns trust when validation fails.

## How to Use

Invoke the skill by name (`/pm-skills:tool-foundation-sprint-founding-hypothesis` on Claude Code, `$tool-foundation-sprint-founding-hypothesis` on Codex):

```
/pm-skills:tool-foundation-sprint-founding-hypothesis "Your context here"
```

Or reference the skill file directly: `skills/tool-foundation-sprint-founding-hypothesis/SKILL.md`

## Output Template

# Foundation Sprint Founding Hypothesis: [Initiative name] (Day 2 End)

<!-- The capstone artifact of the Foundation Sprint. Strict canonical template; do not paraphrase. -->

## Founding Hypothesis

> **If we help [target customer] solve [important problem] with [approach], they will choose it over [competitors or alternatives] because our solution is [differentiators].**

Slot derivation:

- Target customer: [from Basics target customer statement]
- Important problem: [from Basics important problem statement]
- Approach: [from Magic Lenses top bet]
- Alternatives: [from Basics competitor map; must include "do nothing" if named there]
- Differentiators: [from Differentiation chosen two]

## Assumption Scorecard

[5-7 assumptions recommended; 3-10 accepted. Highest-risk assumption identified at bottom.]

| # | Assumption | Why it matters | Current confidence | Best next test |
|---|---|---|---|---|
| A1 | [Assumption text] | [What breaks if wrong] | [High / Med-high / Med / Med-low / Low] | [Specific test that changes confidence] |
| A2 | [Assumption] | [Why matters] | [Confidence] | [Test] |
| A3 | [Assumption] | [Why matters] | [Confidence] | [Test] |
| A4 | [Assumption] | [Why matters] | [Confidence] | [Test] |
| A5 | [Assumption] | [Why matters] | [Confidence] | [Test] |
| A6 | (Optional) | | | |
| A7 | (Optional) | | | |

**Highest-risk assumption:** [Assumption number]. [One sentence naming why this is the riskiest.]

## Why We Believe This

[3-5 bulleted points naming the evidence base for the hypothesis.]

1. **[Evidence point].** [Brief expansion citing the prior research, interviews, or domain knowledge that supports the hypothesis.]
2. **[Evidence point].**
3. **[Evidence point].**

## What Could Prove Us Wrong

[3-5 bulleted points naming risks. This section is the team's calibration check. If the team cannot name what would invalidate the hypothesis, the hypothesis is being held with overconfidence.]

1. **[Risk].** [What invalidation looks like; what behavior or evidence would change the team's belief.]
2. **[Risk].**
3. **[Risk].**

## Recommended Next Validation Step

**Next step:** [Design Sprint / customer research / landing page experiment / concierge MVP / etc.]

**What it tests:** [Which assumption(s) from the scorecard does this attack first?]

**Owner:** [Name]

**Timeline:** [When does this start; when does it produce signal]

**Decision the next step unlocks:** [Build, refine, pivot, stop. What decision is the team making based on the next step's output?]

## Decider Checkpoint

**Decider sign-off required to close the Foundation Sprint.**

- [ ] Decider ratifies the Founding Hypothesis sentence verbatim.
- [ ] Decider confirms the assumption scorecard and the highest-risk assumption identification.
- [ ] Decider commits to the recommended next validation step with named owner and timeline.
- [ ] Decider acknowledges the backup plan (from Magic Lenses) is real, not theoretical.
- [ ] Decider acknowledges the team will not re-litigate the strategic direction without explicit invalidation evidence from the next test.

**Signed:** [Decider name, role], [ISO date and local time].

**Foundation Sprint closed.**

## Example Output

<details>
<summary>Foundation Sprint Founding Hypothesis: Brainshelf (Day 2 End)</summary>

# Foundation Sprint Founding Hypothesis: Brainshelf (Day 2 End)

The Brainshelf team's Day 2 end output. The Foundation Sprint closes here.

## Founding Hypothesis

> **If we help people who read 25 or more books a year and treat their personal library as memory rather than identity solve "I can't remember what I've read or what I want to read next" with sub-3-second camera-first capture into a private library, they will choose it over Goodreads, StoryGraph, paper journals, and doing nothing because our solution is the fastest way to capture a book and the most useful way to recall what they have read.**

Slot derivation:

- Target customer: 25+/year readers, books-as-memory framing (from Basics)
- Important problem: forgetting what they have read / want to read (from Basics)
- Approach: sub-3-second camera-first capture into a private library (Yellow / Approach A from Magic Lenses)
- Alternatives: Goodreads, StoryGraph, paper journals, doing nothing (from Basics competitor map)
- Differentiators: fastest capture + most useful recall (from Differentiation)

## Assumption Scorecard

| # | Assumption | Why it matters | Current confidence | Best next test |
|---|---|---|---|---|
| A1 | 25+/year readers are switchable from "do nothing" with sub-3-second capture | If false, no capture-speed product can win this segment | Medium | Design Sprint Friday testing (5 customers) |
| A2 | Camera-OCR + cover-recognition can achieve sub-3-second resolution at acceptable accuracy | If false, the differentiation collapses | Medium-high | Thursday prototype build with real OCR API |
| A3 | "Personal recall" is a strong-enough draw without social features | If false, customers churn after initial novelty | Medium | Test recall flow with prototype; post-test interview |
| A4 | Target customer can be reached through organic channels (Riley's network, content) | If false, CAC pressure forces premature monetization | High | Founder-led growth test post-DS |
| A5 | Paid sync + cross-device monetization model resonates | If false, business model unclear | Medium | Concept-pricing question in Friday script |
| A6 | "Did I already read this?" is felt strongly enough to drive recall use cases | If false, the personal recall pillar is weaker than thought | High | Friday context-question on recall scenarios |

**Highest-risk assumption:** A1. The product depends on it more than any other; the Design Sprint exists to test it.

## Why We Believe This

1. **22 customer interviews surfaced the same two pains repeatedly:** forgetting books and friction with current tools. The Founding Hypothesis directly addresses both.
2. **Riley's network is a credible distribution channel** for the target segment; warm intros tested in the readiness assessment.
3. **The team's existing capabilities** (Alex on fast-capture UX, Sam on mobile and offline) match the chosen differentiators with evidence.
4. **The "do nothing" baseline is high** for this segment, meaning a 10x-better tool can win without displacing an entrenched competitor.
5. **The differentiation is observable to customers** (speed, recall) rather than internal-team metrics (architectural elegance).

## What Could Prove Us Wrong

1. **Customers nod but don't capture.** "Yes, this looks fast" in interviews but no usage in real life within 7-day follow-up.
2. **OCR accuracy is below acceptable.** Customers see 1-in-5 mis-resolutions and lose trust.
3. **Personal recall is a feature, not a habit.** Customers capture once and never come back to recall.
4. **Camera-first is awkward in real contexts.** People feel weird scanning books at home or in public.
5. **Reading 25+/year segment is too small.** TAM-too-narrow for a venture-scale company; the early signal might be strong but the segment cannot grow into a business.

## Recommended Next Validation Step

**Next step:** Design Sprint week of 2026-05-26.

**What it tests:** A1 (switchable from "do nothing") first; A2 (OCR accuracy) via the Thursday prototype build; A3 (personal recall draw) via the Friday recall flow test; A5 (pricing) via the Friday Five-Act Interview Act 5 debrief.

**Owner:** Jamie (founder, PM); Riley owns customer recruiting.

**Timeline:** Sprint begins Monday 2026-05-26; Friday testing 2026-05-30; Decider call by 16:30 Friday; 7-day instrumented follow-up through 2026-06-06.

**Decision the next step unlocks:** Build (6-week MVP cycle starting June 2), iterate (refine prototype + re-sprint), pivot to backup (Red Bookstore Mode), or stop.

## Decider Checkpoint

**Decider sign-off required to close the Foundation Sprint.**

- [x] Jamie ratifies the Founding Hypothesis sentence verbatim.
- [x] Jamie confirms the 6-row assumption scorecard.
- [x] Jamie commits to running a Design Sprint week of 2026-05-26 as the next test.
- [x] Jamie acknowledges the backup plan (Red Bookstore Mode) is real, not theoretical.
- [x] Jamie acknowledges the team will not re-litigate the social-reader direction without explicit invalidation evidence from the Design Sprint.

**Signed:** Jamie (founder, PM), 2026-05-14 16:55 PT.

**Foundation Sprint closed.**

</details>
