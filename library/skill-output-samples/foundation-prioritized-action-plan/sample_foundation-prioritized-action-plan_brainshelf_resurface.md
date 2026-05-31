---
title: "Prioritized Action Plan: Brainshelf Resurface Bimodal Engagement"
description: "Brainshelf consumer PKM app. A prioritized action plan for the Resurface digest when engagement is bimodal and the cause is unknown, classified Complex with probe-based next steps."
artifact: foundation-prioritized-action-plan
version: "1.0"
repo_version: "2.23.0"
skill_version: "1.0.0"
created: 2026-05-31
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app. The Resurface morning digest launched six weeks ago with bimodal click-through; the solo PM dumps rough context and needs a ranked plan before the next board update.
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Sample: foundation-prioritized-action-plan. Brainshelf Resurface Bimodal Engagement

## Scenario

Brainshelf's Resurface feature (a contextual morning email digest) launched six weeks ago. Open rates are fine but click-through is bimodal: a small cohort clicks daily, most never click, and the team cannot agree why. The PM, wearing multiple hats on a 20-person team, dumps rough context and wants a ranked plan before the next board update. Because the distinguishing factor is unknown and the signals conflict, the skill classifies this Complex and produces a probe-based plan with no High-confidence markers.

**Source Notes:**

- Brainshelf is fictional; all metrics marked `[fictional]`.
- Continuation of the Brainshelf Resurface thread (see the `discover-interview-synthesis` and `measure-experiment-design` brainshelf samples).
- Casual prompt style with lowercase character names, per the thread convention.

---

## Prompt

```
foundation-prioritized-action-plan

quick brain dump, need a plan for resurface (morning digest)

- launched 6 wks ago. open rate on the digest is ok (~38% [fictional]) but click-through is all over the place
- small cohort (~12%) clicks every day, rest basically never click
- marco thinks the digest timing is wrong, chloe thinks it's relevance (we resurface stuff people don't care about anymore)
- surveys are contradictory - power users say "love it", others say "felt random" or "too much"
- we have ~2 sprints before the next board update, want to show movement
- 20 person team, i'm wearing the PM + launch hat

what do we do
```

---

## Output

### Step 0: Source ledger

```
S1: "open rate on the digest is ok (~38% [fictional]) but click-through is all over the place" (origin: pasted prompt)
S2: "small cohort (~12%) clicks every day, rest basically never click" (origin: pasted prompt)
S3: "marco thinks the digest timing is wrong, chloe thinks it's relevance (we resurface stuff people don't care about anymore)" (origin: pasted prompt)
S4: "surveys are contradictory - power users say "love it", others say "felt random" or "too much"" (origin: pasted prompt)
S5: "we have ~2 sprints before the next board update, want to show movement" (origin: pasted prompt)
S6: "20 person team, i'm wearing the PM + launch hat" (origin: pasted prompt)
```

### Section 0. Executive summary

- **Situation classification:** Complex (Cynefin). Engagement is bimodal (S2), internal theories conflict (S3), and surveys contradict each other (S4), so the cause is not yet knowable.
- **The binding constraint:** you do not know what distinguishes the 12% who click daily from everyone else. Tuning timing or relevance now is a guess.
- **The critical next effort (P1):** run a safe-to-fail probe to find the distinguishing factor before changing the digest.
- **Overall plan confidence:** Low-Medium. Honest: the team is arguing from anecdote, not evidence.
- **Time-to-value:** about one sprint to a first read on what the engaged cohort shares.

### Section 1. Input mirror - what I understand

- **What you gave me:** Resurface opens fine but click-through is bimodal (S1, S2); marco and chloe disagree on whether it is timing or relevance (S3); surveys are contradictory (S4); you have two sprints before a board update (S5) and are running solo (S6).
- **What you appear to be trying to accomplish:** find a real lever for Resurface engagement and show movement to the board. Confidence: Low-Medium (intent inferred from the dump).
- **Adjacent intents I noticed but did not assume:** changing digest timing, and a relevance/algorithm rework. Neither is assumed to be the fix.

### Section 2. Situation classification (Cynefin)

**Domain:** Complex. **Source:** S2, S3, S4.

The test for Complex is whether the outcome is genuinely unpredictable, and it is here. The behavior is bimodal with no known cause (S2), two reasonable people hold opposite theories (S3), and the survey signal contradicts itself (S4). You cannot analyze your way to the answer from this; you have to probe and sense. Posture: safe-to-fail experiments. Confidence ceiling: Medium-Low, and no High marker appears anywhere in this plan.

### Section 3. The binding constraint (Theory of Constraints)

- **System and goal:** make Resurface a habit for more than the current minority.
- **The constraint:** missing insight into what the daily-clicking 12% have in common (S2). Every proposed fix (timing, relevance) is a bet on an unvalidated theory. Call this the primary planning bottleneck.
- **Source:** S2, S3.
- **Candidate constraints considered:** (1) Timing (marco's theory, S3). Plausible but untested. (2) Relevance (chloe's theory, S3). Equally plausible and untested. Both are subordinate to learning what actually separates engaged from disengaged users.
- **Why P1 lifts it:** identifying the distinguishing factor turns the timing-vs-relevance argument into an evidence-backed choice.

### Section 4. Prioritized questions, gaps, and open decisions

| Rank | Question / gap | Why it matters | Decision required? | How to resolve |
|---|---|---|---|---|
| Q1 | What do the daily-clicking 12% share? (S2) | Determines whether timing, relevance, or something else is the lever | No, resolve by probe | Profile the engaged cohort vs the rest |
| Q2 | Is it timing or relevance? (S3) | Settles the marco-vs-chloe split with evidence | No, resolve by probe | Run small parallel probes, not a debate |
| Q3 | What does "show movement" mean for the board? (S5) | Sets a realistic two-sprint goal | Yes | PM picks a learning-based success signal |
| Q4 | Can a solo PM run two probes in two sprints? (S6) | Bounds the plan to capacity | Yes | Scope probes to the cheapest viable versions |

### Section 5. The prioritized action plan

#### P1. Profile the engaged cohort (probe)

- **Why:** lifts the constraint by finding what the 12% share (S2); this is a probe to learn, not a commitment.
- **What:** a read on the differences between daily-clickers and non-clickers (content types saved, recency, source, account age).
- **How:** (1) Segment users by click behavior. (2) Compare saved-content and usage attributes. (3) Interview 4 to 5 from each group.
- **Confidence:** Low-Medium. Respects the Complex ceiling.
- **Source:** S2, S4.
- **Expected outcome / success signal:** a candidate distinguishing factor to test in P2/P3.
- **Estimated effort:** about one sprint (S5).
- **Dependencies:** none.

#### P2. Relevance probe (safe-to-fail)

- **Why:** tests chloe's theory (S3) cheaply by improving what is resurfaced for a small cohort.
- **What:** a reversible relevance tweak (recency-weighted or topic-matched) for a test group.
- **How:** (1) Pick the simplest relevance change. (2) Ship to a small cohort behind a flag. (3) Measure click-through vs control.
- **Confidence:** Low-Medium. It is a probe; expect to learn, possibly to revert.
- **Source:** S3.
- **Expected outcome / success signal:** a measurable click-through lift, or a clear null.
- **Estimated effort:** part of one sprint, parallel to P1.
- **Dependencies:** none.

#### P3. Timing probe (safe-to-fail)

- **Why:** tests marco's theory (S3) without committing to a redesign.
- **What:** a small experiment varying digest send time for a cohort.
- **How:** (1) Define two or three send windows. (2) Assign cohorts. (3) Compare open-to-click behavior.
- **Confidence:** Low-Medium.
- **Source:** S3.
- **Expected outcome / success signal:** evidence that timing does or does not move clicks.
- **Estimated effort:** one sprint, lightweight.
- **Dependencies:** none; can follow P1 if capacity (S6) is tight.

**Sequencing (Now / Next / Later)**

| Now | Next | Later |
|---|---|---|
| P1, P2 (parallel) | P3 | Commit a direction after probe readouts |

**What to defer / what NOT to do**

- Do not pick timing or relevance by debate (S3); let the probes decide.
- Do not rebuild the digest before P1 names the distinguishing factor.
- Do not over-read the "love it" survey quotes (S4); they are the engaged minority talking.

### Section 6. Risks and pre-mortem

| Risk | Likelihood | Impact | Early signal | Mitigation | Source |
|---|---|---|---|---|---|
| The 12% are simply your most active users, not winnable signal | M | H | P1 shows engagement tracks overall app activity | Reframe the goal around activation, not the digest | S2 |
| Solo capacity can't run two probes in two sprints | M | M | P1 slips past sprint one | Run P1 first; defer P3 | S6 |
| Board pressure forces a "fix" before probes read | M | H | A timing/relevance change ships before P1 | Frame the board update around the learning plan (S5) | S5 |

### Section 7. Recommended pm-skill prompts (copy/paste ready)

#### To execute P2 and P3: design the probes

**Skill:** `measure-experiment-design`
**Why this skill:** both probes need explicit hypotheses, metrics, cohorts, and kill criteria so two sprints produce evidence, not noise.
**Source:** S3, S5

**Prompt:**
> Design two safe-to-fail experiments for the Brainshelf Resurface digest, where click-through is bimodal (about 12% click daily, the rest rarely). Experiment A tests relevance (a recency-weighted or topic-matched resurfacing change for a small cohort); Experiment B tests send timing across two or three windows. For each, state the hypothesis, the metric, the minimum cohort, the read window (we have ~2 sprints), and the kill criterion. Keep both reversible and runnable by a solo PM.

#### To execute P1: synthesize the cohort interviews

**Skill:** `discover-interview-synthesis`
**Why this skill:** P1's interviews with engaged and disengaged users need to become a pattern, not a pile of quotes.
**Source:** S2, S4

**Prompt:**
> Synthesize 8 to 10 short interviews with Brainshelf users split between daily Resurface clickers and non-clickers. Surface what distinguishes the engaged cohort (content types, saving behavior, recency, account age), reconcile the contradictory survey signal (some say "love it", others "felt random" or "too much"), and flag where the sample is too thin to generalize.

### Section 8. Evidence and source map

| Claim / recommendation | Source ID | Exact quote |
|---|---|---|
| Engagement is bimodal | S2 | "small cohort (~12%) clicks every day, rest basically never click" |
| Click-through is erratic | S1 | "open rate on the digest is ok (~38% [fictional]) but click-through is all over the place" |
| Internal theories conflict | S3 | "marco thinks the digest timing is wrong, chloe thinks it's relevance (we resurface stuff people don't care about anymore)" |
| Survey signal contradicts itself | S4 | "surveys are contradictory - power users say "love it", others say "felt random" or "too much"" |
| Two-sprint horizon | S5 | "we have ~2 sprints before the next board update, want to show movement" |
| Solo capacity | S6 | "20 person team, i'm wearing the PM + launch hat" |

**Inferred (Low confidence) claims:** none load-bearing. Every effort cites a real quote; the plan is probes by design.
**Evidence gaps:** the entire plan rests on unexplained bimodal behavior. P1 exists to close that gap. No High confidence marker appears anywhere, by design.
