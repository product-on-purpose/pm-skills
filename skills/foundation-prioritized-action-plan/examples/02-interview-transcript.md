# Example 02: Interview transcript (Complex domain)

A raw customer interview with no synthesis. The behavior is emergent and the user's own preference is contradictory, which lands this in Complex: the plan is built from safe-to-fail probes, and no claim or effort is marked High confidence.

---

## The input (pasted verbatim)

> Interviewer: Walk me through how your team uses the workspace day to day.
> User: Honestly we kind of live in the comments. Someone drops a comment on a doc and that becomes the to-do. We don't really use the Tasks tab.
> Interviewer: Why not Tasks?
> User: It just never stuck. The comments are where the conversation is, so the work is there too. If I make a task I have to go somewhere else and then it's disconnected from the why.
> Interviewer: Does anything break with that?
> User: Yeah, stuff falls through. There's no way to see everything that's 'open' across docs. Last week we shipped with two unresolved comments nobody saw. But when we tried the Tasks tab for a sprint it felt like double entry, so we stopped.
> Interviewer: If you could wave a magic wand?
> User: Maybe the comment just IS the task? I don't want another place. But I also don't fully trust comments to not get lost. I genuinely don't know what I want here.

---

## Step 0: Source ledger

```
S1: "Honestly we kind of live in the comments" (origin: pasted text)
S2: "We don't really use the Tasks tab" (origin: pasted text)
S3: "If I make a task I have to go somewhere else and then it's disconnected from the why" (origin: pasted text)
S4: "There's no way to see everything that's 'open' across docs" (origin: pasted text)
S5: "Last week we shipped with two unresolved comments nobody saw" (origin: pasted text)
S6: "when we tried the Tasks tab for a sprint it felt like double entry, so we stopped" (origin: pasted text)
S7: "Maybe the comment just IS the task?" (origin: pasted text)
S8: "I also don't fully trust comments to not get lost" (origin: pasted text)
S9: "I genuinely don't know what I want here" (origin: pasted text)
```

---

## Section 0. Executive summary

- **Situation classification:** Complex (Cynefin). This is one emergent, surprising behavior from a single account, and the user's stated preference contradicts itself (S7 vs S8) and ends in explicit uncertainty (S9). Cause and effect are not yet knowable.
- **The binding constraint:** the team lacks a validated understanding of whether the comment-as-task behavior is a durable, generalizable pattern. Designing for it now would commit to an n-of-1 contradiction.
- **The critical next effort (P1):** run safe-to-fail probes to learn whether the pattern and the visibility pain generalize, before any redesign.
- **Overall plan confidence:** Low-Medium. The signal is vivid but unrepresentative; the honesty here is that we do not yet know.
- **Time-to-value:** 2 to 3 weeks to a first read on whether the pattern holds.

## Section 1. Input mirror - what I understand

- **What you gave me:** one interview where the team has effectively adopted comments as their task system (S1, S2), values the in-context "why" (S3), and is hurt by a missing cross-doc view of open items (S4, S5). A prior attempt to use the Tasks tab failed as double entry (S6). The user floats "comment is the task" (S7) but does not trust it (S8) and is unsure (S9).
- **What you appear to be trying to accomplish:** decide whether to invest in a comment-centric workflow or fix Tasks adoption. Confidence: Low (intent inferred from the interview framing, not stated).
- **Adjacent intents I noticed but did not assume:** a full Tasks redesign, and a notifications/reminders feature. I did not assume either is the goal.

## Section 2. Situation classification (Cynefin)

**Domain:** Complex. **Source:** S6, S7, S8, S9.

The test for Complex rather than Complicated is whether the outcome is genuinely unpredictable, and here it is. The behavior emerged unplanned (comments became the task system), a reasonable prior solution failed in a non-obvious way (S6), and the user's own desire is internally contradictory (wants comment-as-task in S7, distrusts it in S8) and explicitly uncertain (S9). You cannot analyze your way to the answer from one account; you have to probe and sense. Posture: safe-to-fail experiments, instrument, and observe. Confidence ceiling: Medium-Low, and no High markers appear anywhere in this plan.

## Section 3. The binding constraint (Theory of Constraints)

- **System and goal:** help teams track and close open work without losing the context that makes comments useful.
- **The constraint:** missing validated insight. We do not know whether the comment-as-task pattern (S1) and the cross-doc visibility gap (S4) generalize beyond this team, so any build is a bet on an n-of-1 contradiction. Call this the primary planning bottleneck.
- **Source:** S1, S4, S9.
- **Candidate constraints considered:** (1) The Tasks tab's design (S2, S6). It may be weak, but redesigning it assumes Tasks is the right surface, which is exactly what is unvalidated. (2) The missing cross-doc open-items view (S4). A strong candidate feature, but whether it is the real job or a symptom is unknown. Both are subordinate to learning first.
- **Why P1 lifts it:** probes convert a vivid anecdote into evidence about whether the pattern is durable and widespread, which is the thing currently blocking a confident design decision.

## Section 4. Prioritized questions, gaps, and open decisions

| Rank | Question / gap | Why it matters | Decision required? | How to resolve |
|---|---|---|---|---|
| Q1 | Do other teams also use comments as tasks? (S1) | Determines whether this is a pattern or one team's habit | No, resolve by probe | Instrument comment-to-action behavior across accounts |
| Q2 | Is the real pain the missing cross-doc "open" view? (S4) | Could be the highest-leverage fix regardless of the task model | No, resolve by probe | Ship a lightweight open-comments view as a probe and watch usage |
| Q3 | Why did Tasks feel like double entry? (S6) | Tells us if Tasks is salvageable or the wrong surface | No | Short follow-up interviews with teams that abandoned Tasks |
| Q4 | What does the user actually want? (S7 vs S8, S9) | The stated preference is contradictory and cannot be taken at face value | No | Observed behavior over stated preference; do not design from S7 alone |

## Section 5. The prioritized action plan

#### P1. Instrument the comment-as-task behavior across accounts

- **Why:** lifts the constraint by testing whether the pattern (S1) generalizes. This is a probe, not a commitment.
- **What:** a read on how often comments function as tasks and how often they are lost, across a sample of teams.
- **How:** (1) Define a lightweight signal for "comment that became an action item." (2) Measure its frequency and its resolution/loss rate across active accounts. (3) Compare against Tasks-tab usage.
- **Confidence:** Low-Medium. Respects the Complex ceiling; this is designed to inform, not to settle.
- **Source:** S1, S2, S5.
- **Expected outcome / success signal:** evidence that the pattern is or is not widespread, which de-risks the next decision.
- **Estimated effort:** about 1 week to instrument, 2 weeks to read.
- **Dependencies:** none.

#### P2. Ship a cross-doc "open comments" view as a safe-to-fail probe

- **Why:** the missing visibility (S4) caused real harm (S5); a small probe tests whether closing that gap is the high-leverage move regardless of the task-model question.
- **What:** a minimal, reversible view listing unresolved comments across docs for a small cohort.
- **How:** (1) Build the lightest possible aggregated view behind a flag. (2) Release to a handful of teams. (3) Measure whether unresolved-comment incidents drop.
- **Confidence:** Low-Medium. It is a probe; we expect to learn, possibly to remove it.
- **Source:** S4, S5.
- **Expected outcome / success signal:** a measurable reduction in lost open items for the cohort, or a clear null result.
- **Estimated effort:** 1 to 2 weeks behind a flag.
- **Dependencies:** none; runs in parallel with P1.

#### P3. Follow-up interviews on the Tasks double-entry failure

- **Why:** S6 is the clearest non-obvious failure signal; understanding it tells us whether Tasks is salvageable.
- **What:** 4 to 6 short interviews with teams that tried and dropped Tasks.
- **How:** (1) Recruit from accounts with Tasks-then-abandonment. (2) Ask what specifically felt like double entry. (3) Synthesize into the design decision after P1 and P2.
- **Confidence:** Low-Medium.
- **Source:** S6.
- **Expected outcome / success signal:** a clear account of the double-entry failure mode.
- **Estimated effort:** about 1 week.
- **Dependencies:** none.

**Sequencing (Now / Next / Later)**

| Now | Next | Later |
|---|---|---|
| P1, P2 (parallel probes) | P3 | Design decision after probe readouts |

**What to defer / what NOT to do**

- Do not build "comment is the task" (S7) now; it is one user's contradicted wish (S8, S9).
- Do not redesign the Tasks tab before P1 and P3 say whether Tasks is even the right surface.
- Do not treat the single interview as representative; that is what the probes correct.

## Section 6. Risks and pre-mortem

| Risk | Likelihood | Impact | Early signal | Mitigation | Source |
|---|---|---|---|---|---|
| The pattern is one team's habit, not a market need | M | H | P1 shows low comment-as-task frequency elsewhere | Kill the redesign idea; keep the cheap visibility view if P2 wins | S1, S9 |
| We over-read the vivid anecdote and build for S7 | M | H | Roadmap pressure to "make comments tasks" before P1 reads | Hold the line on observed-over-stated; gate any build on P1 | S7, S8 |
| The open-comments probe adds noise without reducing loss | L | M | P2 cohort shows no drop in lost items | Remove it; it is reversible by design | S4, S5 |

## Section 7. Recommended pm-skill prompts (copy/paste ready)

#### To execute P3: interview synthesis on the Tasks failure

**Skill:** `discover-interview-synthesis`
**Why this skill:** P3 produces several short interviews that need to become a pattern, not a pile of quotes.
**Source:** S6

**Prompt:**
> Synthesize 4 to 6 interviews with teams that tried our Tasks tab during a sprint and abandoned it because it "felt like double entry." Surface the specific failure modes, the contexts where Tasks did and did not work, and what this implies for whether Tasks is the right surface versus a comment-centric model. Mark confidence and call out where the sample is too thin to generalize.

#### To execute P1 and P2: design the probes as experiments

**Skill:** `measure-experiment-design`
**Why this skill:** both P1 and P2 are safe-to-fail probes that need explicit hypotheses, signals, and kill criteria.
**Source:** S1, S4, S5

**Prompt:**
> Design two safe-to-fail experiments. Experiment A: instrument how often comments function as task items across accounts and how often they are lost. Experiment B: ship a cross-doc "open comments" view to a small cohort and measure whether lost-open-item incidents drop. For each, state the hypothesis, the metric, the minimum cohort, the read window, and the kill criterion. Keep both reversible.

## Section 8. Evidence and source map

| Claim / recommendation | Source ID | Exact quote |
|---|---|---|
| Comments are the de facto task system | S1 | "Honestly we kind of live in the comments" |
| Tasks tab is unused | S2 | "We don't really use the Tasks tab" |
| In-context "why" is valued | S3 | "If I make a task I have to go somewhere else and then it's disconnected from the why" |
| Visibility gap exists | S4 | "There's no way to see everything that's 'open' across docs" |
| The gap caused real harm | S5 | "Last week we shipped with two unresolved comments nobody saw" |
| Tasks failed as double entry | S6 | "when we tried the Tasks tab for a sprint it felt like double entry, so we stopped" |
| Stated wish (not validated) | S7 | "Maybe the comment just IS the task?" |
| Stated distrust (contradicts S7) | S8 | "I also don't fully trust comments to not get lost" |
| Explicit uncertainty | S9 | "I genuinely don't know what I want here" |

**Inferred (Low confidence) claims:** none load-bearing. Every effort cites a real quote.
**Evidence gaps:** the entire plan rests on one account; the probes (P1, P3) exist specifically to close that gap. No High confidence marker appears anywhere, by design.
