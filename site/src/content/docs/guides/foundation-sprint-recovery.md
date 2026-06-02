---
title: Foundation Sprint Recovery Playbook
description: "Recovery scenarios and playbooks for mid-Foundation-Sprint failures: Decider leaves early, team can't generate 3 approaches, Day 1 ends without convergence, Magic Lenses scoring deadlocks, Founding Hypothesis is hedged, Decider second-guesses after ratification."
---

> **Foundation Sprint is NOT an agile / Scrum sprint.** 2-day workshop methodology (Knapp/Zeratsky). For disambiguation see [Workshop Sprints vs Agile Sprints](../concepts/workshop-sprints-vs-agile-sprints.md).

When a Foundation Sprint hits a failure mode mid-execution, this playbook provides specific recovery procedures. Each scenario includes the symptom, the most-likely root cause, the recovery procedure, and when to stop recovery and postpone instead.

For pre-sprint failure prevention, see the [`tool-foundation-sprint-readiness`](../../skills/tool-foundation-sprint-readiness/SKILL.md) skill and the [FAQ](foundation-sprint-faq.md). For the operational walkthrough, see [Using the Foundation Sprint Tools](using-foundation-sprint.md).

## Pre-sprint scenarios

### Scenario PRE-1: Decider drops out 24-48 hours before Day 1

**Symptom:** Decider has a calendar conflict that emerges after readiness was Go.

**Most-likely cause:** Calendar wasn't truly cleared at readiness; Decider's authority was tacit not explicit.

**Recovery:**
- Find a substitute Decider with equivalent or greater strategic authority. Verify the substitute has decision-making latitude across all 4 Day 1 / Day 2 strategic moves (target customer, important problem, top bet, Founding Hypothesis ratification).
- If no substitute available, postpone. Re-run readiness with a sharper Decider commitment check.

**Stop recovery / postpone if:** No substitute has equivalent authority. Running with a too-junior Decider produces a hypothesis that re-litigates immediately.

### Scenario PRE-2: One participant cancels in the 4-7 person band

**Symptom:** One day-of cancellation.

**Most-likely cause:** Calendar conflict; non-critical.

**Recovery:** Proceed. Foundation Sprint runs cleanly with 3-4 people; one cancellation does not threaten the workshop.

**Stop recovery / postpone if:** The cancellation is the Decider OR is the team member who carries unique customer / market knowledge (e.g., the only customer expert). For those cases, treat as PRE-1.

### Scenario PRE-3: Pre-sprint customer-research gap surfaces

**Symptom:** During brief preparation, the team realizes they cannot answer "who is our target customer" or "what is the important problem" from existing knowledge.

**Most-likely cause:** Readiness criterion 3 (existing customer/market knowledge) was marked PASS too generously.

**Recovery:**
- Postpone the workshop by 2-4 weeks.
- Run targeted customer research first (5-10 customer interviews via `discover-interview-synthesis` skill OR similar lightweight research).
- Re-run readiness after research; expect a Go this time.

**Stop recovery / postpone if:** N/A; this scenario IS the postpone-and-research path. Do not run Foundation Sprint without sufficient knowledge inputs.

## Day 1 scenarios

### Scenario D1-1: Basics morning ends without team agreement on target customer

**Symptom:** Note-and-vote cycles produce no clear convergence on target customer; the Decider's supervote feels arbitrary.

**Most-likely cause:** The team has multiple distinct customer hypotheses without consensus on which is primary. This is more common in early-stage B2B and multi-sided-marketplace contexts.

**Recovery:**
- Acknowledge the disagreement explicitly. Name the 2-3 candidate customers and ask: "Are we running ONE Foundation Sprint for each candidate, or one Foundation Sprint that picks among them?"
- If the team commits to picking, the Decider supervotes; team accepts the call for the next 30 hours.
- If the team cannot commit to picking, you have a multi-Foundation-Sprint situation. Run today's sprint for the candidate with strongest existing knowledge; schedule a second sprint within 2 weeks for the secondary candidate.

**Stop recovery / postpone if:** The team genuinely has 3+ candidate customers with no priority ordering and no Decider authority to force one. This is a different problem (no strategic authority) and needs leadership-level resolution before any sprint.

### Scenario D1-2: Differentiation produces no clear 2x2 chart

**Symptom:** Plotting competitors on the 2 chosen differentiator axes produces a chart where competitors cluster everywhere; no obvious empty quadrant.

**Most-likely cause:** The chosen differentiators are not actually differentiating - they're table-stakes capabilities all competitors also have.

**Recovery:**
- Re-run the Differentiator scoring with stricter criteria: "Would a customer choose us over a competitor BECAUSE of this differentiator?" If the answer is "no, they'd be indifferent", the differentiator is table-stakes not differentiating.
- Replace 1-2 differentiators with sharper candidates from the scored list (you should have 8-12 candidates).
- Re-plot. If still no empty quadrant, the team may not actually have a differentiated position. This is a strategic finding worth pausing the sprint to discuss.

**Stop recovery / postpone if:** No combination of differentiators produces an empty quadrant. This signals a fundamental positioning problem that Foundation Sprint cannot solve; the team needs deeper market research or a different initiative.

### Scenario D1-3: Decider has to leave early on Day 1

**Symptom:** Decider has 4-hour gap (e.g., investor meeting) in Day 1 PM.

**Most-likely cause:** Calendar wasn't fully cleared.

**Recovery:**
- Compress Day 1 PM Differentiation to fit before Decider leaves. Skip the 2x2 chart visualization (do as exercise; capture as photo for review later); keep the differentiator scoring + decision principles + Mini Manifesto.
- Decider reviews the artifacts asynchronously during the gap; signs off via Slack or email by end of day.

**Stop recovery / postpone if:** Decider gap is more than half of Day 1. At that point you don't have a Decider, you have a Decider-by-correspondence; the supervote loses authority. Postpone Day 2 until Decider can attend.

## Day 2 scenarios

### Scenario D2-1: Team cannot generate 3 Approach Options

**Symptom:** Morning of Day 2 produces 1-2 candidate approaches; team cannot honestly name a 3rd that isn't "the same thing slightly differently".

**Most-likely cause:** The Mini Manifesto is too narrow OR the team has anchored on the first idea from Day 1 brainstorms.

**Recovery:**
- Use anti-anchoring prompts: "What if we tried the OPPOSITE of approach 1?", "What if the customer was 2x older or 2x younger?", "What if we had unlimited budget?", "What if we had to ship in 4 weeks?".
- Pull in cameo expert opinions (15 min phone call to a domain SME) for fresh perspective.
- If still stuck, the team genuinely doesn't have 3 strategic options. Treat as research gap: postpone Magic Lenses to a follow-up half-day; spend the rest of Day 2 on competitor-teardown work to expand the option set.

**Stop recovery / postpone if:** After all anti-anchoring + cameo input, team still has only 2 approaches. Pick one; run Magic Lenses on the 2 with a custom "do nothing" lens; document the constrained option set as a sprint finding.

### Scenario D2-2: Magic Lenses scoring deadlocks (Decider can't pick top bet)

**Symptom:** Multiple approaches score nearly identically across 4 classic + custom lens; Decider cannot identify a clear winner.

**Most-likely cause:** The lenses chosen don't differentiate among the candidate approaches well, OR the candidate approaches are too similar.

**Recovery:**
- Add a "tie-breaker" lens: pick a dimension the team has not yet scored (e.g., team-confidence lens; risk-tolerance lens; strategic-fit-with-Mini-Manifesto lens). Re-score on the new lens.
- If still tied, the Decider applies the supervote even with imperfect information. This is the Decider's job: making the call under uncertainty. Document the rationale in the Magic Lenses output.

**Stop recovery / postpone if:** Decider genuinely cannot commit to a call. The Foundation Sprint has failed to produce a Founding Hypothesis; the team needs more research or a different methodology (Lean Canvas, customer research) before re-running.

### Scenario D2-3: Founding Hypothesis sentence is hedged

**Symptom:** Decider reads the Founding Hypothesis sentence aloud and qualifies it: "We THINK this is right but...", "If certain conditions hold...", "Probably this is the direction...".

**Most-likely cause:** Decider isn't actually committed; team consensus drift; or Magic Lenses scoring was a popularity contest.

**Recovery:**
- Force the unhedged version. Ask Decider: "If you had to commit publicly to this sentence to a stranger - investor, customer, board member - what would the sentence say?" Rewrite using that committed version.
- If Decider still cannot produce an unhedged sentence, the team has not actually decided. Treat as deadlock per D2-2.

**Stop recovery / postpone if:** Decider produces an unhedged sentence but team body language signals they don't believe it. This is decision-discipline failure; address the underlying alignment problem before the next sprint.

### Scenario D2-4: Assumption scorecard has no clear highest-risk assumption

**Symptom:** All 5-7 assumptions in the scorecard score similarly on risk; no obvious "test this first" candidate.

**Most-likely cause:** Risk-scoring used insufficient criteria, OR the team genuinely faces a strategic situation where multiple assumptions are equally load-bearing.

**Recovery:**
- Re-score assumptions on 3 specific criteria: (a) impact if wrong (1-10); (b) confidence in current evidence (1-10); (c) testability cost (1-10). Sort by impact / confidence ratio; highest-ratio is the highest-risk-to-test-first assumption.
- If still tied, default to "the assumption the Decider feels least confident about" as highest-risk. Decider's gut is signal.

**Stop recovery / postpone if:** Team genuinely cannot prioritize. The Founding Hypothesis is at the wrong altitude - too vague to identify discrete assumptions. Re-do the hypothesis sentence with more specificity.

## Post-sprint scenarios

### Scenario POST-1: Decider wants to change the top bet after Day 2 ratification

**Symptom:** Within 24-48 hours of sprint close, Decider says "I've been thinking about it and I think we should test [backup] not [top bet]."

**Most-likely cause:** Decider's commitment was performative not real; OR new information has surfaced.

**Recovery:**
- Ask: "What new evidence has emerged in the last 48 hours?" If genuine new evidence, run a half-day re-evaluation: re-score top bet vs backup under the new evidence; re-ratify.
- If no new evidence, hold the line. Remind Decider that the point of the ratification ritual is to prevent re-litigation. Test the Founding Hypothesis as ratified; if testing invalidates, that's data; if Decider second-guesses, that's discipline failure to address separately.

**Stop recovery / postpone if:** Decider insists on changing top bet without new evidence AND the team has lost confidence in the Founding Hypothesis. This is a leadership / decision-discipline issue, not a Foundation Sprint issue. Pause downstream testing until trust is restored.

### Scenario POST-2: Team is unclear what the recommended next test should be

**Symptom:** Founding Hypothesis is ratified but Recommended Next Test section is hand-wavy ("we should validate this somehow").

**Most-likely cause:** Highest-risk assumption isn't sharp enough to suggest a specific testing modality.

**Recovery:**
- Re-do the Recommended Next Test section as a structured matrix:
  - **Is the highest-risk assumption testable through a prototype + 5 customers in a week?** If yes -> Design Sprint via [`_workflows/foundation-to-design.md`](../../_workflows/foundation-to-design.md).
  - **Is the highest-risk assumption testable through a fake-door / landing-page / A/B test?** If yes -> smaller experiment via [`measure-experiment-design`](../../skills/measure-experiment-design/SKILL.md).
  - **Is the highest-risk assumption testable through deeper customer research?** If yes -> research via [`workflow-customer-discovery`](../../_workflows/customer-discovery.md).
  - **Is the assumption testable through a concierge MVP?** If yes -> document as roadmap commitment; no pm-skills direct equivalent skill (use feature-kickoff + custom delivery plan).

**Stop recovery / postpone if:** None of the testing modalities fit. The assumption may be at the wrong altitude (too strategic to test directly). Decompose into testable sub-assumptions before committing to a next step.

## When to stop the sprint and reset

There are limited situations where mid-sprint failure should result in stopping the sprint rather than recovering:

1. **No Decider available and no substitute can be appointed within the day.** Without a Decider, the sprint cannot produce a committed hypothesis; running it produces an unowned artifact that re-litigates immediately.

2. **The team discovers fundamental customer / market unknowns** during Basics that make the entire sprint premature. Stop and run customer research first.

3. **The Decider loses confidence in the methodology** mid-sprint. If the Decider doesn't trust the process to produce a useful artifact, no amount of facilitation can salvage the workshop. Acknowledge the mismatch and reset.

4. **Two or more team members publicly disengage** ("this is a waste of time"). Group dynamics have broken; continuing produces an artifact the team won't commit to. Pause for an honest conversation; either re-engage or stop.

Stopping a sprint is unusual but valid. The alternative (producing a Founding Hypothesis no one believes in) is worse.

## Related resources

- [Using the Foundation Sprint Tools](using-foundation-sprint.md) - operational walkthrough
- [Foundation Sprint FAQ](foundation-sprint-faq.md) - common questions
- [Foundation Sprint cheat sheet](foundation-sprint-cheat-sheet.md) - printable 1-pager
- [Foundation Sprint case studies](foundation-sprint-case-studies.md) - 3 end-to-end examples (none of them required recovery; this playbook is for when things go off-script)
- [Foundation Sprint concept doc](../concepts/foundation-sprint.md) - methodology deep-dive
- [Sprint Methodology Glossary](../reference/sprint-methodology-glossary.md) - terminology

---

*Part of [PM-Skills](https://github.com/product-on-purpose/pm-skills) - Open source Product Management skills for AI agents.*
