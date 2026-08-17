# Pre-registration: C-2 (structure-over-prose weak-model re-test), 2026-08-16

**Status:** PRE-REGISTERED. Written and committed **before the run**, before any result was seen.
**Workstream:** WS-7 (AI-family Track 1 increments + weak-model re-test) of
[the v2.33.0 release plan](../plan_v2.33.0.md).
**Candidate:** C-2 (structure-over-prose weak-model re-test).
**Baseline being re-tested:** [`output-eval-informed-20260615.md`](../../v2.27.0/records/output-eval-informed-20260615.md)
(run `wf_488ca001-61d`).
**Result will be recorded at:** `output-eval-weak-model-20260816.md` plus `.raw.json` in this directory.

---

## 1. Why this document exists

The v2.33.0 plan makes WS-7 a content cycle: four additive prose increments to three shipped skills.
The most important thing the output-eval program has learned is that, under a capable generation model,
**a skill's template carries essentially all of its measured artifact-quality value and its prose
instructions add little or nothing on top**. Writing more prose into skills without re-checking that
finding would be building on an unexamined premise.

The 2026-06-15 record named model strength as caveat 4 against its own conclusion: "Sonnet fills a
template well freehand. A weaker model might lean on the prose instructions more, so the 'template is
enough' result is conditioned on a capable generation model." C-2 tests exactly that caveat.

This document fixes the decision rule in advance because the alternative is authoring an interpretation
after seeing four numbers, which is the failure mode the whole control-arm discipline exists to prevent.
It is the same standard `measure-experiment-design` imposes on its own users: a pre-registered
win / loss / inconclusive rule set before launch, with no movable goalposts.

## 2. The question, operationalised

**Question:** under a weak generation model, does a skill's prose instruction set add measurable rigor
over its output template alone?

**Measure:** `gap_vs_informed = skill_overall - informed_overall`, computed within a single run by
`scripts/output-eval-informed.workflow.mjs`. The harness's own threshold is `>= 0.5` (`informedPass`).

**Comparator discipline.** The primary outcome is decided on **this run's own within-run three-arm
gaps**, not on deltas against the June absolutes. Cross-run absolute scores carry judge drift that
cannot be controlled for: the model alias `sonnet` need not resolve today to the checkpoint it resolved
to in June. The three-arm design is robust to that, because all three arms are judged by the same panel
in the same run. The June numbers are context, not the comparator.

## 3. What is held constant, and the one thing that changes

Verified by `git log` before the run:

| Component | Drift since 2026-06-15 | Status |
|---|---|---|
| `scripts/output-eval-informed.workflow.mjs` | none | held |
| `scripts/output-eval-aggregate.mjs` | none | held |
| All four scenario files | none | held |
| `docs/internal/eval-rubrics/` | one commit, `76f793b8`, purely additive: it appended a `foundation-build-risk-review` criteria table to `framing.md` and added that name to a list. The anchor scale, the universal criteria, and `foundation-okr-writer`'s own criteria table are byte-identical | held |
| `skills/develop-adr/` (whole directory) | none | held |
| `skills/measure-experiment-design/` (whole directory) | none | held |
| `skills/deliver-release-notes/` (whole directory) | none | held |
| `skills/foundation-okr-writer/` (whole directory) | **two commits**, `54744ceb` and `edbbaf60` | **CONFOUNDED, see section 5** |
| `genModel` | `sonnet` -> `haiku` | **the single intended change** |

**Instrument fidelity.** The `criteria`, `criteriaDefs` and `anchorScale` arguments were not
reconstructed from the rubric files. They were lifted **verbatim** from the twelve judge prompts of the
June baseline run, recovered from its retained workflow transcripts, and committed alongside this
document as `c2-args-20260816.json`. All twelve prompts (four skills, three judges each) yielded exactly
one distinct rubric block per skill, confirming the June instrument was internally uniform.

This mattered more than it looks. The June `anchorScale` carries a sixth line the rubric files do not
contain: the re-anchoring instruction that a straight 5.0 across all criteria is almost always wrong and
that solid work defaults to 4. Reconstructing from `docs/internal/eval-rubrics/` would have silently
shipped a differently-calibrated panel, and the resulting score shift would have been misattributed to
`genModel`.

`generations: 3`, `judges: 3`, `judgeModel: 'sonnet'` all match the baseline. Skill order is preserved
from June, so `foundation-okr-writer` remains the shakedown pair. No `effort` override is passed,
because the baseline had none.

## 4. Validity gates, per pair

A pair enters the primary outcome only if **all four** hold. These are the harness's own gates, not new
ones invented here:

1. `status === 'ok'` (generation and panel both complete)
2. `absolute_pass === true` (`skill_overall >= 3.5` and no criterion mean below 2.5)
3. `agreement_stdev <= 0.7`
4. `gap_vs_freehand >= 1.0`

A pair failing any of these is excluded from the numerator **and** the denominator, and is reported as
an instrument row with its failing gate named.

## 5. What counts as the headline, and what does not

**The headline is the three clean pairs:** `develop-adr` (event-streaming), `measure-experiment-design`
(paywall-pricing), `deliver-release-notes` (api-v4-breaking).

**`foundation-okr-writer` (activation-quarter) is reported but excluded from the primary outcome.** Two
commits touched its directory after the baseline, so any movement in its numbers confounds `genModel`
with a body change. Its row will be printed with that caveat attached. It will not be used to support or
undercut any conclusion in either direction.

**`deliver-release-notes` was `void-inconclusive` at baseline** on the freehand gate (0.46 against a 1.0
target), and the June record judged that a genuine low-marginal-value artifact type rather than a weak
scenario. Pre-registered reading:

- If it **un-voids** under haiku (`gap_vs_freehand >= 1.0`), that is a positive finding in its own right
  and is reported as such: skill value emerges as the generator weakens, which is the C-2 hypothesis
  showing up on the arm that had the least room for it.
- If it **stays void**, it contributes nothing to the primary outcome and is reported as a stable
  instrument finding, replicating June.

## 6. Outcomes and their consequences, fixed in advance

Let **K** = the number of valid clean pairs (section 4) reaching `gap_vs_informed >= 0.5`, and **V** =
the number of valid clean pairs.

### R1: prose earns its keep under a weak generator

**Condition:** `V >= 2` and `K >= 2`.

**Conclusion:** the 2026-06-15 "value is structural" finding is **model-conditioned** and does not
generalise to weak generators. Caveat 4 of that record is upheld.

**Consequence:** WS-7's prose increments have affirmative evidence behind them. Build all four as
specified. Record the finding as a material update to how skill investment is prioritised.

### R2: structure still dominates

**Condition:** `V >= 2` and `K <= 1`.

**Conclusion:** the finding **replicates under a weak generator**. Prose adds little even when the model
generating the artifact is weak.

**Consequence:** the increments still ship. The plan's WS-7 exit criterion is "re-test run and recorded",
not "re-test passed", and the increments were ruled into scope by decisions D-D and D-B, not by this
experiment. But the result constrains their **shape**: each increment must be written as
structure-bearing content, meaning new sections, tables, field lists or checklists that change what the
artifact contains, rather than as additional prose exhortation about how to think. This is the
actionable consequence and it will be checked at build.

### R3: void, no usable clean signal

**Condition:** `V <= 1`.

**Conclusion:** an instrument finding, not a skill finding. Record the cause.

**Consequence:** **do not re-run with a modified instrument.** Tuning the rubric, the scenarios or the
control prompts until the gap opens is fishing, and it would destroy the only thing that makes this
measurement worth anything. WS-7 proceeds under R2's shape constraint, because R2 is the status-quo
belief and building prose on an unproven premise is precisely the error C-2 exists to prevent.

### R4: a clean pair fails absolutely

**Condition:** any clean pair returns `absolute_pass === false`.

**Conclusion:** a genuine skill finding that is **separate from the structure-versus-prose question**:
the skill does not hold up when the generator is weak.

**Consequence:** record it as a defect candidate for v2.34.0 with the failing criteria named. Do not fold
it into the primary conclusion, and do not let it block WS-7. R4 can co-occur with R1, R2 or R3.

## 7. The develop-adr hold

`skills/develop-adr/` is **not edited** until this run's result is written to this directory and
committed.

The reason is contamination, not justification. `develop-adr` is one of C-2's four eval pairs. Editing
its body mid-experiment would break the single-variable comparison in exactly the way
`foundation-okr-writer` is already broken. The C-3 spec's section 7 control-arm gate does not apply here:
[the v2.33.0 plan](../plan_v2.33.0.md) scopes that gate to the two v2.34.0 keystones, not to WS-7's
increments.

The hold runs to **verdict recorded**, not merely to generation complete. Generation-complete is the
theoretical minimum, but a shakedown failure, an incomplete panel or an R3 void may warrant a clean
re-run, and an already-edited `develop-adr` would foreclose that option.

`deliver-prd` and `measure-instrumentation-spec` appear in no eval pair, which is why their three
increments are genuinely parallel-safe and proceed while the run is in flight.

## 8. Abort path

If the shakedown pair (`foundation-okr-writer`, first in the config array by June's ordering) does not
return a valid result, the harness stops before spending the remaining three by design. Re-launch
**once**, unmodified. If it fails a second time, record an infrastructure void and proceed under R2. Do
not modify the instrument to make the shakedown pass.

## 9. What this measurement cannot show

Carried forward from the 2026-06-15 record, because they bound this run identically:

1. **Rubric circularity.** Each rubric's criteria are transcribed from that skill's own Quality
   Checklist, and the template embodies that checklist. A rubric that measures "did you fill the right
   sections" rates template-only work highly by construction. This bounds how far
   `gap_vs_informed` can open for any well-templated skill, in either model condition.
2. **The template is the skill's distilled methodology.** "Structure carries the value" largely means
   "the skill's value lives in its template", which is a legitimate place for it to live rather than a
   defect.
3. **Out of scope entirely.** Triggering (does the right skill fire), boundaries (when not to use),
   robustness on messy or adversarial input, and coaching. This is a single-shot artifact-quality
   instrument and it measures nothing else.

## 10. Recording obligation

The June run recorded its outputs but not its inputs, which is the sole reason this run had to recover
its arguments from a workflow transcript that happened not to have been garbage-collected. **This run
records the full args blob in its own `.raw.json`.** Fixed forward here rather than logged as a
grievance.
