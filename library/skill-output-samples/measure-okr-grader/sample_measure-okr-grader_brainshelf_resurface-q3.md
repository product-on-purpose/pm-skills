<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
artifact: measure-okr-grader
version: "1.0"
repo_version: "2.12.0"
skill_version: "1.0.0"
created: 2026-05-01
status: canonical
thread: brainshelf
context: Brainshelf prosumer knowledge tool. Resurface team Q3 2026 cycle review at quarter close (October 2026). Scores the OKR set produced in the foundation-okr-writer brainshelf sample. Demonstrates aspirational sweet-spot scoring with an invalidating signal on the retention-multiplier hypothesis.
---

# Sample: measure-okr-grader. Brainshelf Resurface Q3 2026 Cycle Review

## Scenario

Brainshelf's Resurface team is closing the Q3 2026 cycle. The OKR set was authored in late June using `/okr-writer` (see the corresponding writer sample at `library/skill-output-samples/foundation-okr-writer/sample_foundation-okr-writer_brainshelf_resurface-q3.md`). The cycle ended September 30. Final values are now in for KR1, KR2, and KR3.

The team wants a cycle review they can take to the Q4 strategy review with company leadership. The Resurface PM priya-pm runs `/okr-grader` with the original OKR set, the final KR values, the cycle's narrative, and the initiative status.

The cycle had a mixed result. KR1 (weekly Resurface engagement) landed in the aspirational sweet spot. KR2 (30-day retention) trailed badly, suggesting that the 3.4x retention multiplier observed in the 500-user beta did NOT scale to the broader population. KR3 (relevance guardrail) held. The team needs to decide whether to keep retention as a primary KR or pivot the strategy.

**Source Notes:**

- Brainshelf is fictional
- All metrics `[fictional]`
- Pairs with `library/skill-output-samples/foundation-okr-writer/sample_foundation-okr-writer_brainshelf_resurface-q3.md`
- Continuation of the brainshelf Resurface thread spanning `foundation-stakeholder-update`, `foundation-okr-writer`, and this grader sample
- Aspirational OKR scoring follows the Google convention (0.6 to 0.7 sweet spot for aspirational)
- This sample demonstrates an invalidating signal on a hypothesis the OKR set was designed to test (the engagement-causes-retention causal claim at scale)

## Prompt

```
/okr-grader

Original OKR: see sample_foundation-okr-writer_brainshelf_resurface-q3.md
Cycle: Q3 2026 (July 1 to September 30, 2026)
OKR type: aspirational

Final KR values:
- KR1 (weekly Resurface-active members): 36% [fictional] (target 41%, baseline 22%)
- KR2 (30-day retention among Resurface-engaged members): 59% [fictional]
  (target 68%, baseline 56%)
- KR3 (guardrail, member-reported relevance): 4.3 / 5 [fictional]
  (target hold at or above 4.2 / 5, baseline 4.2 / 5)

Guardrails (health):
- "Resurface item felt repetitive" rate ended at 6.4% [fictional]
  (baseline 5%, threshold 8%)
- Push notification opt-out rate ended at 5.1% [fictional]
  (baseline 3.1%, threshold 6%)

Initiative status:
- Initiative 1 (Algo v1.5): shipped August 4 (on plan). Hit-rate on
  first-impression items rose from 64% to 71% [fictional].
- Initiative 2 (Push notification triggers for high-confidence surfaces):
  shipped July 28. Push open rate 41% [fictional]; click-through to
  Resurface item 18% [fictional] vs the 2x in-app rate hypothesized
  from beta data.
- Initiative 3 (Personalized first-session Resurface onboarding):
  shipped September 12 (delayed by 4 weeks due to onboarding team
  capacity). Q3 first-session cohort is too small for a clean read.

Cycle context:
- Sharing team's Q3 KR (items shared per week +30%) hit 23% [fictional];
  the surface-able content pool grew slightly, not enough to require
  algo retraining cadence change.
- The 500-user beta cohort that produced the original 3.4x retention
  multiplier was re-run in August at the broader population scale
  (n=12,400 [fictional]). The replication observed a 1.6x multiplier,
  not 3.4x.

Stakeholder interpretation: Resurface leadership reads the cycle as a
"strong engagement quarter, retention thesis needs more time." Looking
for grader's independent read on whether the retention-multiplier
hypothesis should be retired or carried forward.
```

## Output

```markdown
# OKR Cycle Review: Brainshelf Resurface Team, Q3 2026

## Summary

- Scope: Resurface team
- Cycle: 2026-Q3 (July 1 to September 30, 2026)
- Overall interpretation: KR1 hit the aspirational sweet spot (0.74).
  KR2 missed badly (0.25), and the supporting hypothesis (the 3.4x
  retention multiplier from the beta cohort scales to the broader
  population) is materially weakened by a Q3 replication that observed
  1.6x. KR3 guardrail held. The objective's narrative is "engagement
  works; retention causality at scale is contested."
- Evidence confidence: high for KR1 and KR3, medium for KR2 (single-cycle
  retention signal for a 30-day window), high for the August replication
  study.
- Main learning: the Resurface engagement-to-retention causal claim, at
  population scale, is weaker than the beta cohort suggested. The team
  should treat the retention thesis as live but down-weighted, not as
  validated.

## Scorecard

- Objective: Make Resurface the reason members come back to Brainshelf
  each week.
  - Rough qualitative read: aspirational success on the engagement KR;
    aspirational miss on the retention KR; the retention causality
    hypothesis received invalidating signal from an external replication.

- KR1: Increase weekly Resurface-active members from 22% to 41%
  [fictional] of activated members by 2026-09-30.
  - Actual: 36% [fictional] (as_of 2026-09-30, trailing 4-week average).
  - Score: 0.74 (aspirational). Calculation:
    (36 - 22) / (41 - 22) = 14 / 19 = 0.737. In the 0.6 to 0.7 sweet
    spot.
  - Evidence confidence: high. Mixpanel `resurface_item_interaction`
    event well-instrumented; cohort definition stable.
  - Interpretation: algo v1.5 (Initiative 1) and push triggers (Initiative
    2) both contributed. The hit-rate lift from 64% to 71% [fictional]
    on first-impression items aligns mechanically with the engagement
    cohort lift.

- KR2: Increase 30-day retention among Resurface-engaged members from
  56% to 68% [fictional] (vs 31% baseline among non-Resurface members)
  by 2026-09-30.
  - Actual: 59% [fictional] (as_of 2026-09-30, full 30-day window
    closed).
  - Score: 0.25 (aspirational). Calculation:
    (59 - 56) / (68 - 56) = 3 / 12 = 0.25. Below the 0.4 floor for
    aspirational miss.
  - Evidence confidence: medium. The 30-day cohort window closed
    cleanly, but the underlying causal claim (engagement drives
    retention) was weakened by an independent replication (see Issue 1).
  - Interpretation: retention moved a little, but well short of the
    aspirational target. The score's literal read is "missed the
    aspirational stretch." The more important read is what the
    replication study showed about the underlying mechanism.

- KR3 (operational_health; indicator class guardrail): Hold
  member-reported relevance score at or above 4.2 / 5 [fictional]
  across all Resurface impressions.
  - Actual: 4.3 / 5 [fictional].
  - Score: pass (operational_health; threshold held within band).
    Improved by 0.1 points above the baseline.
  - Evidence confidence: high.
  - Interpretation: aggressive surfacing through algo v1.5 plus push
    triggers did not degrade perceived relevance. Per the indicator-class
    `guardrail` rule, KR3 is reported as its own signal and is NOT
    averaged into the primary objective score.

## Objective Interpretation

- Result: aspirational success on engagement (KR1), aspirational miss on
  retention (KR2), guardrail held (KR3). The retention-multiplier
  hypothesis received an invalidating external signal (1.6x at scale,
  not 3.4x).
- Why: the engagement bets (algo v1.5 + push triggers) worked roughly
  as hypothesized. The retention thesis has two failure modes that look
  the same in this cycle's data: either (a) the 3.4x multiplier was a
  beta-cohort artifact and never generalized, or (b) the multiplier is
  real but takes more than 30 days to materialize at population scale.
  The replication study's 1.6x reading favors (a).
- What changed during the cycle: the August replication study at n=12,400
  was a deliberate test of the multiplier-at-scale claim, designed for
  this cycle's grading. That study's result is the most consequential
  finding of the quarter.
- What the score does and does not mean:
  - Does mean: algo v1.5 plus push triggers lift weekly engagement.
  - Does mean: the retention thesis at the strength originally believed
    is weakened. Not yet falsified, but the team should not rely on
    the 3.4x figure for FY planning.
  - Does NOT mean: Resurface is irrelevant to retention. The 1.6x
    multiplier is still meaningful; it is just not the load-bearing
    retention lever the team and company assumed.
  - Does NOT mean: the team should rebuild the algorithm. v1.5 hit its
    engagement target. The strategy question is upstream: what is
    Resurface's actual role in retention?

## Evidence Quality

- Issue 1: the August replication study at population scale observed a
  1.6x retention multiplier vs the beta's 3.4x. This is the single
  most important evidence input this cycle.
  - Impact: the company-level OKR (30-day retention 31% to 42%) was
    built on the assumption that Resurface alone could provide a large
    fraction of the lift. With a 1.6x multiplier, the math does not work
    without other levers contributing more.
  - Recommended fix: treat the 1.6x multiplier as the planning baseline
    going forward. Update the company-level OKR forecasting model.
    Run `/hypothesis` to specify what would have to be true for
    the multiplier to grow with longer-horizon engagement.

- Issue 2: KR2's 30-day window for Q3 cohorts closed cleanly, but the
  cohorts are heterogeneous (members at different tenure points received
  algo v1.5 and push triggers at slightly different times because of
  the v1.5 phased rollout).
  - Impact: medium. The aggregate KR2 score is reliable; the per-segment
    breakdown needed to interpret the multiplier is noisier than ideal.
  - Recommended fix: in next cycle's `/instrumentation-spec`, add a
    cohort-tenure dimension to the retention dashboard so per-segment
    multipliers are visible.

- Issue 3: Initiative 3 (personalized first-session Resurface onboarding)
  shipped September 12 due to onboarding team capacity. The Q3
  first-session cohort exposed to it is too small for a clean read on
  KR2.
  - Impact: low for this cycle's interpretation; high for next cycle's
    planning if the team expects this initiative to drive KR2 in Q4.
  - Recommended fix: timebox a Q4 sub-cohort analysis once the September
    cohort reaches its 30-day window. Pre-decide what would constitute
    a "first-session-Resurface drives retention" signal vs noise.

## Initiative Review

- Initiative 1 (Algo v1.5):
  - Linked to: KR1 primarily, KR2 secondarily.
  - Status: shipped on time (August 4).
  - Apparent contribution: high to KR1; unclear to KR2 because the
    retention movement was small and confounded by the multiplier
    finding.
  - Recommendation: continue. v1.5 is a sound base; do not pivot to a
    v2.0 rewrite without a sharper retention hypothesis to optimize
    against.

- Initiative 2 (Push notification triggers):
  - Linked to: KR1 primarily.
  - Status: shipped on time (July 28).
  - Apparent contribution: medium to KR1. The 41% open rate is healthy
    but the 18% click-through to the Resurface item was below the 2x
    in-app conversion rate hypothesized from beta data. Push raised
    the volume, not the per-impression yield.
  - Recommendation: continue at current scope. Do not expand push
    aggressiveness; the opt-out guardrail (5.1% vs 6% threshold) is
    closer to its limit than is comfortable.

- Initiative 3 (Personalized first-session Resurface onboarding):
  - Linked to: KR2 primarily.
  - Status: shipped late (September 12 vs target of mid-August).
  - Apparent contribution: unclear. Cohort too small for a Q3 read.
  - Recommendation: continue into Q4 with explicit success criteria
    (per Issue 3). If the September cohort's 30-day window does not
    show a retention lift, retire the thesis.

## Learning

- Validated assumptions:
  - Algo tuning plus push triggers can lift weekly engagement at scale.
  - Engagement gains do not require degrading perceived relevance
    (KR3 held, in fact improved).
  - Push opt-out has a real ceiling; the 5.1% opt-out rate is approaching
    the 6% threshold and constrains future push aggressiveness.

- Invalidated assumptions:
  - The 3.4x retention multiplier from the 500-user beta scales to
    population. The August replication study put this at 1.6x. This is
    the cycle's most consequential learning.
  - Push trigger conversion would mirror the 2x in-app rate observed
    in beta. Actual was lower; push lifts volume, not yield.

- Surprises:
  - The relevance guardrail improved despite higher surfacing volume.
    This suggests algo v1.5 actually got better at selection, not just
    more aggressive at presentation. Worth a deeper investigation.
  - Initiative 3's late ship was less costly to KR2 than feared because
    KR2 missed for upstream-causal reasons (the multiplier itself), not
    because the September cohort was too small.

- Decision implications:
  - Pivot Q4 strategy from "lift retention via Resurface" to "validate
    what Resurface's actual retention role is at population scale, and
    plan FY 2027 retention strategy accordingly."
  - Hold algo v1.5 and push triggers at current scope; do not invest
    more capacity into them this quarter without a retention hypothesis
    that justifies it.
  - Do not commit company-level retention forecast to the 3.4x figure
    going forward.

## Next-cycle Recommendations

1. Reframe KR2 from "Resurface drives retention" to a learning-OKR
   structure that explicitly tests retention causality. Use
   `/hypothesis` to specify the test (which segment, which
   measurement window, what would invalidate). Then `/okr-writer`
   in Rewrite mode.

2. Carry KR1 forward but reset the target. Set Q4 KR1 baseline at
   Q3's 36% landing point; target a more modest lift (45 to 48%
   [fictional]) given the push opt-out ceiling.

3. Decide explicitly whether Resurface is the primary retention lever
   or a contributing one. The original company OKR assumed primary;
   the replication study suggests contributing. Loop the company
   strategy team in for this decision.

4. Run a Q4 sub-cohort analysis on the September first-session cohort
   when its 30-day window closes (late October). Use the result to
   keep, refine, or retire Initiative 3.

5. Hand-off:
   - `/lessons-log` for the multiplier-at-scale finding (this is a
     cross-cycle learning the team and the company both need to
     remember in FY planning).
   - `/retrospective` for the team-process learning on Initiative 3's
     late ship and the cross-team capacity dependency.
   - `/hypothesis` for "Resurface engagement causally affects 30-day
     retention with a multiplier of at least 1.6x at scale" with an
     explicit invalidation criterion.
   - `/instrumentation-spec` for the per-segment retention cohort
     dimension (Issue 2).
   - `/okr-writer` for next-cycle drafting once the retention hypothesis
     is sharpened.

## Risks in Interpretation

- The KR2 score of 0.25 reads worse than the underlying truth. Retention
  did improve (56% to 59%); the score is low because the aspirational
  target was set assuming a 3.4x multiplier that did not materialize at
  scale. The team should not be evaluated as if it failed; the OKR
  itself was mis-targeted.

- The multiplier-at-scale finding is a single replication study. One
  study should not falsify a hypothesis; it should down-weight it. The
  team should resist the pressure to overcorrect to "Resurface does not
  affect retention" until a Q4 study replicates or refines the 1.6x
  figure.

- Stakeholder framing of "retention thesis needs more time" is partially
  correct but understates the replication study's signal. The Q4
  strategy review should explicitly choose between (a) more time on
  the current thesis or (b) reformulating the thesis around the 1.6x
  multiplier. Drift between the two framings will produce another
  cycle of ambiguous KR2 grading.

- The push opt-out guardrail is at 5.1% against a 6% threshold. KR1
  growth in Q4 cannot rely on more push intensity without breaching
  this guardrail. The team should treat push as a saturated lever.

## Source of Truth

L-OKR-Q3-Resurface (Linear). This artifact is a review document, not
the canonical OKR record.
```
