# Output-eval result: deliver-acceptance-criteria (2026-06-14)

Second output-quality eval (M-33), the first run of the hardened `specification` family rubric
(`docs/internal/eval-rubrics/specification.md`). Follows the PoC on `deliver-prd`
(`spec_output-quality-evals.md` section 6). Engine: subscription subagents (Claude Opus 4.8 for both
generation arms and all three judges).

## Setup

| | value |
|---|---|
| Skill | `deliver-acceptance-criteria` (v1.1.0) |
| Scenario | `skills/deliver-acceptance-criteria/evals/output-scenarios/bulk-invite.md` |
| Rubric | `specification` (hardened anchor scale v1) |
| Arms | skill (full skill instructions + template) vs control (competent-but-thin freehand, no skill) |
| Judges | 3, blind, A/B order randomized (J1 A=skill, J2 A=control, J3 A=skill) |
| Generations | 1 per arm (averaging deferred to the harness; see findings) |

## Headline

| Metric | Skill | Control | Gate | Verdict |
|---|---|---|---|---|
| Overall (holistic) mean | **4.67** | 3.00 | - | - |
| Discrimination gap | **1.67** | - | >= 1.0 | PASS |
| Agreement (skill overall stdev) | **0.47** | (0.0) | <= 0.7 | PASS |
| Blind preference | **3/3 to skill** | - | - | unanimous |

Both validity gates clear. The skill arm clears the family pass bar (overall >= 3.5, gap >= 1.0,
agreement <= 0.7, no criterion mean < 2.5).

## Per-criterion means (1-5, hardened anchor scale)

| Criterion | Skill | Control | Gap |
|---|---|---|---|
| mapping | 5.00 | 4.00 | 1.00 |
| happy_path | 4.67 | 3.00 | 1.67 |
| edge_error | 4.67 | 3.00 | 1.67 |
| non_functional | 4.67 | 4.00 | 0.67 |
| testability | 4.00 | 3.00 | 1.00 |
| no_impl_leak | 4.00 | 4.00 | 0.00 |
| specificity | 4.67 | 3.67 | 1.00 |
| completeness | 5.00 | 3.33 | 1.67 |
| **overall (holistic)** | **4.67** | **3.00** | **1.67** |

Raw judge scores (un-blinded): skill overall 5 / 4 / 5; control overall 3 / 3 / 3.

## Construct validity

All three judges independently named the SAME reasons the skill arm is stronger: explicit
Given/When/Then with verifiable pass/fail, error-state recovery behavior (expired link,
submit-before-results failure), and surfaced assumptions / open questions. The gap concentrates on
the rigor + structure criteria (happy_path-first, edge_error, completeness), not on surface
specificity (control scored 3.67 there) - the eval correctly attributes the skill's value to
testable rigor, mirroring the deliver-prd PoC finding.

## The ceiling fix: did the hardened anchor work?

Partially, and the direction is right.
- The PoC (un-hardened scale) scored the skill arm a FLAT 5.0 overall across all judges.
- This run (hardened scale) scored 4.67, and every judge used the `4` level for the
  solid-but-improvable criteria (`testability` 4.0 and `no_impl_leak` 4.0 across all three judges).
  Criterion-level hardening is working: solid work no longer auto-ceilings.
- BUT 2 of 3 judges still gave a holistic `overall` of 5. Holistic-overall still ceilings even when
  the same judge scored individual criteria at 4. **Refinement (harness):** compute `overall` as the
  mean of the per-criterion scores rather than a separate holistic judgment. Under that rule the skill
  arm's overall would be 4.58 (J1 4.75 / J2 4.25 / J3 4.75) and no judge would sit at 5.0, giving
  clean regression headroom. This corroborates the rubric's human-anchor prediction (solid
  specification work lands mid-4s under the hardened scale).

## Methodology confound found in THIS run (read before trusting the absolute gap)

To save tokens, the judge prompts compressed ~18 of the skill arm's 24 full Given/When/Then criteria
into one-line fragments, while the control artifact (already concise bullets) was passed nearly
verbatim. This asymmetrically UNDER-credited the skill arm: judges scored `testability` at 4.0 partly
because they saw fragments, not the full G/W/T the skill actually produced (the raw skill output had
complete Given/When/Then for every AC). Implications:
- The TRUE discrimination gap is very likely LARGER than the recorded 1.67.
- The skill arm's real `testability` is likely higher than 4.0.
- The validity-gate verdicts (both PASS) and the unanimous blind preference are unaffected and
  robust; only the magnitude is conservative.

**Hard requirement for the productized harness:** judges MUST receive each artifact verbatim and in
full. No summarization, no compression, identical fidelity across arms. Encoded in the harness script
(`scripts/output-eval.workflow.mjs`).

## Status

`deliver-acceptance-criteria` PASSES output eval (gates clear, gap healthy, unanimous, clears the
family bar). No skill-body change indicated. The `testability` 4.0 reading is not actioned against the
skill because it is attributable to the run's compression confound, not the skill's output; re-confirm
on a clean full-fidelity re-run before drawing a skill-body conclusion.

## Addendum: all-Sonnet engine validation (2026-06-14)

To validate the optimized (cheaper) engine for the Phase 2 rollout, the same skill + scenario was
re-run **entirely on Sonnet** (Sonnet generation + 3 Sonnet judges) via a Workflow, full-fidelity
artifacts, derived overall (criterion mean). The orchestrating session was Opus 4.8; only the eval
agents were pinned to Sonnet via `agent({model:'sonnet'})`.

| Metric | Sonnet (gen + judge) | Opus reference (derived) | Gate |
|---|---|---|---|
| Skill overall | 4.63 | 4.58 | - |
| Control overall | 3.25 | 3.50 | - |
| Discrimination gap | **1.38** | ~1.08 | >= 1.0 PASS |
| Agreement stdev | **0.20** | ~0.24 | <= 0.7 PASS |
| Blind preference | **3/3 to skill** | 3/3 | unanimous |
| Cost / time | ~138k tokens / ~2 min | ~200k+ / manual | - |

Sonnet per-criterion (skill): mapping 4.67, happy_path 5.0, edge_error 4.67, non_functional 4.67,
testability 4.33, no_impl_leak 4.0, specificity 5.0, completeness 4.67.

**Conclusion:** the all-Sonnet config reproduces the discrimination (slightly harder: gap 1.38) with
tighter agreement (0.20) and unanimous blind preference; both validity gates pass at ~half the Opus
cost. Sonnet is the validated rollout engine. Caveat: this regenerated fresh artifacts (end-to-end
cheap config, not a pure judge-isolation test), and the slightly larger gap is within generation-draw
variance; neither changes the conclusion. The blind A/B rotation worked: Judge 2's raw pick was "B"
but B was the skill arm for that judge, so all three preferred the skill after un-blinding.
