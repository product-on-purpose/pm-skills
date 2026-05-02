<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
artifact: measure-okr-grader
version: "1.0"
repo_version: "2.12.0"
skill_version: "1.0.0"
created: 2026-05-01
status: canonical
thread: storevine
context: Storevine B2B ecommerce platform. Campaigns team Q3 2026 cycle review at quarter close (October 2026). Scores the OKR set produced in the foundation-okr-writer storevine sample.
---

# Sample: measure-okr-grader. Storevine Campaigns Q3 2026 Cycle Review

## Scenario

Storevine's Campaigns team is closing the Q3 2026 cycle. The OKR set was authored in late June using `/okr-writer` (see the corresponding writer sample at `library/skill-output-samples/foundation-okr-writer/sample_foundation-okr-writer_storevine_campaigns-q3.md`). The cycle ended September 30. Final values are now in for KR1 and KR3; KR2's 90-day cohorts are partially complete (the 60-day intermediate is available, the 90-day final is not yet observable).

The team wants a cycle review they can take to the Q4 planning workshop. The growth-pm runs `/okr-grader` with the original OKR set, the final and interim KR values, the cycle's narrative, and the initiative status.

The cycle had a mixed result. KR1 hit hard. KR2 trended below projection. KR3 guardrail held. Initiative 2 (Templates v2) underperformed expectations and the team needs to decide whether to retire the thesis or carry it.

**Source Notes:**

- Storevine is fictional
- All metrics `[fictional]`
- Pairs with `library/skill-output-samples/foundation-okr-writer/sample_foundation-okr-writer_storevine_campaigns-q3.md`
- Aspirational OKR scoring follows the Google convention (0.6 to 0.7 sweet spot for aspirational)
- Committed and compliance_or_safety scoring conventions are not exercised in this sample; see the workbench thread for committed and compliance_or_safety scoring examples

## Prompt

```
/okr-grader

Original OKR: see sample_foundation-okr-writer_storevine_campaigns-q3.md
Cycle: Q3 2026 (July 1 to September 30, 2026)
OKR type: aspirational

Final KR values:
- KR1 (weekly active senders): 26% [fictional] (target was 28%, baseline 14%)
- KR2 (90-day campaign retention): 60-day cohort interim is 19% [fictional];
  full 90-day target was 38% (baseline 22.8%); 90-day final not yet observable
- KR3 (guardrail, median CTR): 3.6% [fictional] (target was hold at or above
  3.4%, baseline 3.4%)

Guardrails:
- Unsubscribe rate ended cycle at 0.81% [fictional] (baseline 0.72%, threshold 0.95%)
- Spam complaint rate ended at 0.05% [fictional] (baseline 0.04%, threshold 0.1%)

Initiative status:
- Initiative 1 (Lifecycle email triggers): shipped July 22 as planned. Open
  rate on triggered emails 38% [fictional]. Click-through to send action
  21% [fictional].
- Initiative 2 (Templates v2): shipped 8 of 12 templates by Sept 30
  [fictional]. Adoption among first-time repeat senders was 31% [fictional],
  below the 60% [fictional] target. Templates that did get adopted showed
  no significant retention difference vs. generic templates (Q3 cohort).
- Initiative 3 (Campaign performance feedback loop): shipped Aug 28.
  Adoption among repeat senders 64% [fictional]. Self-reported usefulness
  4.1 / 5 [fictional].

Cycle context:
- Onboarding team's Q3 KR (boost Campaigns activation rate to 50%)
  hit 47% [fictional]; close enough that we did not rebaseline KR1
  mid-cycle.
- Mid-cycle, the team caught a bug in lifecycle trigger eligibility logic
  (week 3 of August). Fixed in 4 days but ~120 merchants [fictional]
  received duplicate triggers. No measurable impact on unsub rate.

Stakeholder interpretation: Campaigns leadership reads the cycle as a
clear win on activation-to-recurring-send (KR1) and a learning result
on retention-thesis (KR2 + Templates v2). Looking for grader's
independent read.
```

## Output

```markdown
# OKR Cycle Review: Storevine Campaigns Team, Q3 2026

## Summary

- Scope: Campaigns team
- Cycle: 2026-Q3 (July 1 to September 30, 2026)
- Overall interpretation: strong aspirational outcome on KR1, partial signal
  on KR2, guardrail held. The KR2 90-day window extends past cycle close, so
  a single objective-level number is misleading. The honest read is that the
  team validated the engagement thesis (KR1) and invalidated the
  templates-as-retention-driver thesis (Initiative 2).
- Evidence confidence: high for KR1 and KR3, medium for KR2 (interim only),
  high for guardrails.
- Main learning: lifecycle triggers drove the engagement lift; templates v2
  did not move retention. The Campaigns engagement-causes-retention belief
  held at the leading-indicator level (KR1) but the lagging-indicator
  evidence is not yet in.

## Scorecard

- Objective: Make Campaigns the marketing tool merchants reach for every
  week.
  - Rough qualitative read: validated lift in weekly engagement; retention
    causality still open. Do not collapse this to a single average; KR2
    is not yet observable at 90 days.

- KR1: Increase weekly active senders from 14% to 28% [fictional] of
  Campaigns-activated merchants by 2026-09-30.
  - Actual: 26% [fictional] (as_of 2026-09-30, trailing 4-week average).
  - Score: 0.86 (aspirational). Calculation:
    (26 - 14) / (28 - 14) = 12 / 14 = 0.857.
  - Evidence confidence: high. Amplitude `campaign_sent` event well-
    instrumented; cohort definition stable across cycle (Onboarding team's
    near-miss kept the activated-merchant denominator within tolerance).
  - Interpretation: lifecycle triggers (Initiative 1) materially moved the
    metric. The triggered-email-to-send conversion (21%) translates cleanly
    into the weekly cohort lift.

- KR2: Increase 90-day campaign retention from 22.8% to 38% [fictional] for
  merchants who send their first campaign in Q3.
  - Actual: not-yet-observable. Q3 cohorts' 90-day windows extend into late
    December. Interim 60-day signal is 19% [fictional].
  - Score: deferred. Final score available 2026-12-31. Best-estimate
    projection if forced today is 0.10 to 0.20 (aspirational), well below
    the 0.6 to 0.7 sweet spot. See Risks in Interpretation below; do not
    treat the projection as the final score.
  - Evidence confidence: medium. The 60-day interim is reliable; the 90-day
    projection assumes Q2 cohort decay shape, which may not apply to a
    cohort with different engagement composition.
  - Interpretation: retention thesis is trending below projection. Hold the
    final score until 2026-12-31 and grade then.

- KR3 (operational_health; indicator class guardrail): Hold median
  campaign click-through rate at or above 3.4% [fictional] across all
  Q3 sends.
  - Actual: 3.6% [fictional].
  - Score: pass (operational_health; threshold held within band).
    Improved by 0.2 percentage points above the baseline.
  - Evidence confidence: high.
  - Interpretation: lifecycle triggers did not degrade send-quality. This
    is meaningful. The most common failure mode for "send more" initiatives
    is engagement collapse; the team avoided it. Per the indicator-class
    `guardrail` rule, KR3 is reported as its own signal and is NOT averaged
    into the primary objective score.

## Objective Interpretation

- Result: aspirational success on activation engagement (KR1); aspirational
  shortfall (likely) on the retention thesis (KR2, score deferred). The
  guardrail held.
- Why: Initiative 1 (lifecycle triggers) was the load-bearing bet for KR1
  and it worked roughly as hypothesized. Initiative 2 (Templates v2) was
  the load-bearing bet for KR2 and it under-shipped (8 of 12) and
  under-adopted (31% vs 60% target). Even templates that were adopted did
  not show a retention effect.
- What changed during the cycle: mid-cycle bug in lifecycle eligibility
  (4 days, no measurable impact). No external surprises. Onboarding team's
  near-miss on its own KR did not destabilize our KR1 denominator.
- What the score does and does not mean:
  - Does mean: lifecycle triggers are a validated engagement lever and
    should continue at full scale.
  - Does mean: the templates-as-retention-driver thesis is weak. Adopted
    templates showed no retention difference vs generic. This is
    invalidating evidence, not just inconclusive evidence.
  - Does NOT mean: engagement does not drive retention. The KR1 lift is
    too recent to have produced measurable retention impact yet.
  - Does NOT mean: Campaigns is a finished product. KR2 remains an open
    thesis that needs a different bet next cycle.

## Evidence Quality

- Issue 1: KR2's 90-day window extends past the cycle boundary. Q3 grade
  is a projection until late December.
  - Impact: cannot give a confident final score this cycle. Forcing a
    numeric score now would mislead readers.
  - Recommended fix: in next cycle's `/okr-writer` run, either
    (a) reframe KR2 as a 30-day or 60-day intermediate metric, or
    (b) accept that retention KRs are graded one quarter in arrears and
    document the convention explicitly. Choosing (b) is cleaner if the
    team plans to keep retention as a primary KR.

- Issue 2: KR2's underperformance correlates with Initiative 2's
  under-shipping (8 of 12 templates) and low adoption (31%). This confounds
  the templates-as-retention-driver test: the team did not run the bet at
  full scale.
  - Impact: the invalidating evidence is partial. A team could argue
    "we did not really try."
  - Recommended fix: do not relitigate Templates v2 next cycle without a
    clearer hypothesis about why adoption was low. The grader's read is
    that the thesis is weak enough to retire; the team should explicitly
    decide rather than carry an ambiguous bet forward.

- Issue 3: Mid-cycle lifecycle-trigger bug affected ~120 merchants with
  duplicate sends. No measurable unsub or CTR impact, but the bug is
  unrecorded in standard dashboards.
  - Impact: low for this cycle. Documented here for the cycle log.
  - Recommended fix: add a `triggered_email_dedup_failures` event so future
    cycles can detect this class of bug in real time.

## Initiative Review

- Initiative 1 (Lifecycle email triggers):
  - Linked to: KR1 primarily, KR2 secondarily.
  - Status: shipped on time (July 22).
  - Apparent contribution: high. Triggered emails reached 38% open rate
    and 21% click-through-to-send rate, translating into the KR1 weekly
    cohort lift.
  - Recommendation: continue at full scale next cycle.

- Initiative 2 (Templates v2):
  - Linked to: KR1 and KR2.
  - Status: partially shipped (8 of 12 templates).
  - Apparent contribution: low. Adopted templates showed no retention
    effect in the Q3 cohort. Even at full ship, the underlying thesis is
    not supported by the partial evidence.
  - Recommendation: retire the current framing. If the team wants to
    revisit, run `/hypothesis` first to sharpen the sub-thesis
    (which segment, which template type, which trigger), and validate via
    `/experiment-design` before baking into a KR.

- Initiative 3 (Campaign performance feedback loop):
  - Linked to: KR2 primarily.
  - Status: shipped late (August 28 vs target of mid-August).
  - Apparent contribution: unclear. 64% adoption among repeat senders and
    4.1 / 5 self-reported usefulness suggest merchant demand, but the
    contribution to KR2 cannot be isolated from Initiative 1's effects.
  - Recommendation: continue next cycle to gather more data; consider
    promoting from supporting bet to candidate primary initiative if the
    Q4 retention cohort shows a feedback-loop effect.

## Learning

- Validated assumptions:
  - Lifecycle triggers materially increase weekly engagement.
  - Engagement gains do not require sacrificing send quality (KR3 held).
  - Empowered-team initiative ownership produced a learning-grade Q3, not
    just a delivery-grade Q3.

- Invalidated assumptions:
  - Templates v2 as the primary retention-driver lever. The adopted cohort
    showed no retention effect. This is the strongest invalidating signal
    of the cycle.
  - Designer capacity to ship 12 seasonal templates in Q3 was overestimated;
    8 of 12 was the actual capacity. Revise next cycle's planning.

- Surprises:
  - Initiative 3 (feedback loop) shipped late but adopted high. Adoption
    rate suggests merchant demand for post-send analytics is stronger than
    the team expected. Worth a deeper investigation.
  - The 60-day interim for KR2 came in lower than the Q2 baseline cohort
    despite KR1 success. If engagement causally drives retention, the team
    should have seen at least a small interim lift. The flat result is
    itself information.

- Decision implications:
  - Continue Initiative 1 at full scale next cycle.
  - Retire Initiative 2's current framing.
  - Promote Initiative 3 from supporting bet to candidate primary initiative
    for KR2 next cycle.
  - Reframe KR2 measurement boundary (Issue 1) before Q4 OKR drafting.

## Next-cycle Recommendations

1. Continue lifecycle triggers as a primary lever. Set Q4 KR1 target based
   on Q3's 26% landing point, not Q3's pre-cycle 14% baseline.

2. Retire the Templates v2 thesis as currently framed. Do not re-run the
   bet without sharpening the sub-thesis first.

3. Reframe KR2 to either 60-day retention (gradeable within cycle) or
   90-day retention (graded one quarter in arrears). The former gives
   clearer cycle accountability; the latter is methodologically truer to
   the underlying behavior. Pre-decide before Q4 OKR drafting.

4. Investigate the engagement-without-retention finding. If KR1 lifts
   continue without moving retention, the engagement-causes-retention
   belief is wrong and the team's strategy needs to change.

5. Hand-off:
   - `/lessons-log` for the Templates v2 invalidation (organizational
     memory).
   - `/retrospective` for the team-process learning on designer capacity
     estimation.
   - `/hypothesis` for "Campaigns engagement causally affects 12-month
     merchant retention" with a defined invalidation criterion.
   - `/instrumentation-spec` for the `triggered_email_dedup_failures`
     event.
   - `/okr-writer` for next-cycle drafting once KR2 measurement boundary
     is resolved.

## Risks in Interpretation

- A naive 0.62 rough-average objective score would include a forced KR2
  score that is not yet observable. Reading 0.62 as "the team hit the
  aspirational sweet spot" would be misleading. The honest read is "0.86
  on KR1, retention thesis still open at 90 days, guardrail held." Avoid
  collapsing heterogeneous KR types into a single number.

- Initiative 2's under-shipping confounds the Templates v2 invalidation. A
  reasonable counter-read is "we did not really test it." The grader's
  stronger evidence is the no-retention effect among the 31% who did adopt;
  that is the part that says the thesis is weak even at full adoption.

- Stakeholder framing of "clear win on activation, learning on retention"
  is broadly correct but understates the invalidating signal on Templates
  v2. The Q4 planning workshop should explicitly decide whether to retire
  or rework the thesis rather than leave it as ambiguously "ongoing."

- KR3 (guardrail) holding is good news but is not by itself proof of
  safety. Two cycles of held guardrails would strengthen the case that
  lifecycle triggers do not degrade send quality at scale.

## Source of Truth

go/okrs-q3-2026-campaigns (Confluence). This artifact is a review document,
not the canonical OKR record.
```
