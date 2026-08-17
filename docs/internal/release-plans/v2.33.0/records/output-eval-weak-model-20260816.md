# C-2: structure-over-prose weak-model re-test (2026-08-16) - VOID (R3)

Three-arm output-quality eval, run `wf_7bf33fe8-88a`, **G=3 / N=3, generation on haiku, judges on
sonnet**. A single-variable re-run of the 2026-06-15 baseline
[`output-eval-informed-20260615.md`](../../v2.27.0/records/output-eval-informed-20260615.md)
(`wf_488ca001-61d`), testing caveat 4 of that record: that "the template is enough" was conditioned on
a capable generation model, and a weaker model might lean on the prose instructions more.

32 agents, 0 errors, ~1.65M subscription tokens, ~26 minutes. Raw output with the full args blob:
`output-eval-weak-model-20260816.raw.json`.

**The decision rule was fixed before the run** in
[`prereg_output-eval-weak-model-20260816.md`](./prereg_output-eval-weak-model-20260816.md), committed
at `f4d50837`. Everything below applies that rule; nothing in it was authored after the numbers were
seen.

---

## Headline

| Skill | Scenario | Verdict | Skill | vs Freehand (gap) | vs Informed (gap) | Agree | Pref |
|---|---|---|---|---|---|---|---|
| develop-adr | event-streaming | **void-inconclusive** | 3.92 | 3.04 (**+0.88** fail) | 3.92 (+0.00 fail) | 0.12 | 1/3 |
| measure-experiment-design | paywall-pricing | **pass-structural** | 3.63 | 2.21 (**+1.42** PASS) | 3.79 (-0.17 fail) | 0.47 | 1/3 |
| deliver-release-notes | api-v4-breaking | **void-inconclusive** | 3.92 | 3.42 (**+0.50** fail) | 3.58 (+0.33 fail) | 0.12 | 2/3 |
| *foundation-okr-writer (confounded)* | *activation-quarter* | *pass-structural* | *3.83* | *1.92 (+1.92 PASS)* | *3.67 (+0.17 fail)* | *0.16* | *2/3* |

`foundation-okr-writer` is italicised because it is **excluded from the outcome by pre-registration
section 5**: two commits (`54744ceb`, `edbbaf60`) touched its directory after the baseline, so any
movement in its numbers confounds the generation model with a body change. It is reported for
completeness and used to support nothing.

## The pre-registered outcome: R3, void

Applying section 4's validity gates to the three clean pairs:

| Clean pair | status | absolute_pass | agreement <= 0.7 | freehand gap >= 1.0 | Valid? |
|---|---|---|---|---|---|
| develop-adr | ok | yes | 0.12 yes | **0.88 NO** | **excluded** |
| measure-experiment-design | ok | yes | 0.47 yes | 1.42 yes | valid |
| deliver-release-notes | ok | yes | 0.12 yes | **0.50 NO** | **excluded** |

**V = 1** valid clean pair. **K = 0** reaching `gap_vs_informed >= 0.5`.

Section 6's condition for R3 is `V <= 1`, so the outcome is **R3: void, no usable clean signal**. One
valid pair cannot decide a majority rule. R4 was not triggered: every pair cleared `absolute_pass`
with no criterion floored, so nothing here is a skill defect.

**This is an instrument finding, not a skill finding.** The question C-2 asked is not answered by this
run in either direction.

## Why it voided, and the design lesson that follows

The primary outcome was made conditional on the freehand discrimination gate. That gate measures
whether the skill arm pulls materially away from a competent no-skill attempt. **The weak-generator
condition attacks exactly that quantity**: a weaker model realises less of whatever the skill's
instructions offer, so the skill arm moves toward the control and the gap closes. Two of three clean
pairs fell below the 1.0 threshold on that basis.

So the experiment can be voided by construction under the very condition it exists to test. That is a
**design lesson for the next pre-registration**, recorded here so it is available before the next one
is written:

> When the manipulated variable plausibly moves a validity gate, that gate cannot also be a filter on
> the primary outcome. Either pre-register the gate as an outcome in its own right, or power the run
> with enough pairs that losing some to the gate still leaves a decidable majority.

**It is not a licence to reinterpret this run.** Reweighting the gates after seeing `V = 1` is the
fishing that section 6 R3 forbids in as many words, and the pre-registration's whole value is that it
was written before this number existed. The run stands as void.

## Observations, explicitly not conclusions

These are recorded because they should shape a future properly-powered test. **None is licensed as a
finding**, both because the run is void and because pre-registration section 2 rules cross-run
absolute comparisons out as a comparator: the model alias `sonnet` need not resolve today to the
checkpoint it resolved to in June, so judge drift is uncontrolled across these two columns.

| Skill | Skill arm (Jun -> Aug) | Freehand (Jun -> Aug) | Informed gap (Jun -> Aug) | Freehand gap (Jun -> Aug) |
|---|---|---|---|---|
| develop-adr | 4.50 -> 3.92 | 3.21 -> 3.04 | -0.04 -> +0.00 | 1.29 -> **0.88** |
| measure-experiment-design | 4.42 -> 3.63 | 3.21 -> 2.21 | -0.17 -> -0.17 | 1.21 -> 1.42 |
| deliver-release-notes | 4.17 -> 3.92 | 3.71 -> 3.42 | +0.08 -> +0.33 | 0.46 -> 0.50 |
| *foundation-okr-writer* | *4.54 -> 3.83* | *2.38 -> 1.92* | *+0.04 -> +0.17* | *2.17 -> 1.92* |

1. **The informed gap moved barely at all, and not enough to matter.** Across the three clean pairs it
   went from a mean of about -0.04 to about +0.05, against a 0.5 threshold. Whatever the generation
   model does, it does not appear to be unlocking a large hidden rigor premium in the prose. If a
   future powered run confirms this, caveat 4 of the June record is weaker than that record allowed.
2. **The hint runs opposite to the C-2 hypothesis.** The hypothesis was that a weaker model leans on
   the prose *more*. What the skill-arm column suggests instead is that a weaker model extracts
   *less* from the instructions, because following them is itself work the model has to do. That is a
   coherent alternative story and this run cannot distinguish it from noise.
3. **`deliver-release-notes` replicated its June void** (0.46 -> 0.50, both below the gate), on the
   arm where pre-registration section 5 said an un-void would be a positive finding in its own right.
   It did not un-void. The June reading that this artifact type has genuinely low marginal skill value
   survives a second generation model.
4. **Agreement was healthy everywhere** (0.12 to 0.47 against a 0.7 target), so the panel was not
   confused. The rubric discriminated between artifacts; it just did not find much distance between
   the skill and the template.
5. **No absolute failures.** Every skill arm cleared the 3.5 family bar under a weak generator with no
   criterion floored, which is a modest positive worth noting: these four skills degrade gracefully
   rather than falling apart when the model executing them is weak.

## Instrument fidelity, verified rather than assumed

The single intended change was `genModel: sonnet -> haiku`. Everything else was held and the holding
was checked, not asserted:

- **The judge prompts were compared byte-for-byte against the baseline's.** All 12 of this run's judge
  prompts (four skills x three judges) are byte-identical to the 12 recovered from `wf_488ca001-61d`
  on `scenarioPath`, `anchorScale` and `criteriaDefs`. 0 mismatches.
- **The arguments were lifted verbatim from the baseline transcripts, not reconstructed** from
  `docs/internal/eval-rubrics/`. This mattered: the June `anchorScale` carries a sixth line the rubric
  files do not contain, the re-anchoring instruction that a straight 5.0 is almost always wrong and
  that solid work defaults to 4. Reconstruction would have shipped a differently-calibrated panel and
  the resulting score shift would have been misattributed to the generation model.
- **Zero drift** in the harness scripts, all four scenarios, and the three clean skill directories
  since 2026-06-15. The single rubric commit (`76f793b8`) is purely additive to an unrelated skill's
  criteria table.
- `generations: 3`, `judges: 3`, `judgeModel: sonnet`, and the skill order (so `foundation-okr-writer`
  remained the shakedown) all match the baseline. No `effort` override, because the baseline had none.

## Consequence, per pre-registration section 6

R3's consequence was fixed in advance and is applied unchanged:

1. **No re-run with a modified instrument.** Not attempted.
2. **WS-7 proceeds under R2's shape constraint**, because R2 is the status-quo belief and building
   prose on an unproven premise is the error C-2 existed to prevent. Each increment must be
   structure-bearing: new sections, tables, field lists or checklists that change what the artifact
   contains, rather than additional prose exhortation about how to think.
3. **The `develop-adr` hold is released** now that this record is written and committed, per
   pre-registration section 7.

All three v2.33.0 increments already shipped at `41d778ec` satisfy the shape constraint: every one is
a table or field list a reader fills, not a paragraph telling them to try harder. The `develop-adr`
increment is built to the same rule.

## What this leaves open

The question "does prose add rigor over structure under a weak generator" is still open. A future run
that wants to answer it needs, at minimum: more pairs than four so the freehand gate can claim some
without voiding the run, the freehand gate pre-registered as an outcome rather than a filter, and the
judge model pinned to a resolvable checkpoint rather than a moving alias so cross-run comparison is
legitimate. None of that is scheduled, and this record is not a request for it.
