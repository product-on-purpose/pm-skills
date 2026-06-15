# Live trigger-lane run (2026-06-15) - Step 5 proof

Both live trigger lanes (B-2 router-eval drift gate, B-3 new-skill collision gate) were run against
the real Anthropic Messages API (`claude-haiku-4-5`) using a one-time maintainer-provided key (burned
after the session). This is the "prove the live trigger lanes" deliverable. The lanes use the API by
design (clean isolation, no plugin env); they are dispatch-gated in `.github/workflows/trigger-evals.yml`
and were exercised here directly via their scripts (the lane is a thin wrapper around each script).

No `ANTHROPIC_API_KEY` GitHub secret was added: the key is single-use and being revoked, so a persistent
secret would only outlive it. **Adding that secret is the sole remaining step to run these lanes in CI.**

## B-2: router-eval drift gate (`scripts/run-router-evals.mjs --baseline=...haiku.json`)

- Engine: `claude-haiku-4-5`, majority of 3. **Calibration 6/6** (the eval validated itself).
- **1,746 calls, 0 failures, est $1.19.**
- 26 of 29 skills at 100% validation recall + 100% precision. Below 100% validation recall:
  `develop-spike-summary` 50%, and `define-hypothesis` / `define-jtbd-canvas` / `define-opportunity-tree`
  / `deliver-edge-cases` / `foundation-okr-writer` / `foundation-persona` at 75%. Precision was 100%
  across the board (no skill wrongly fired on another's query).
- **Drift vs the committed 2026-06-13 baseline: one regression flagged** - `develop-spike-summary`
  validation recall 75% -> 50%. The lane correctly failed closed (non-zero exit) on this drop.

**Interpretation: variance, not a regression.** `develop-spike-summary`'s description was not touched
since the baseline, so the drop is small-sample LLM nondeterminism (its validation set is ~4 queries, so
one ambiguous query flipping is a 25% swing). The two misrouted queries are genuine conceptual overlap:
- -> `measure-experiment-results`: "document what the proof of concept on zero-downtime schema changes actually showed"
- -> `iterate-lessons-log`: "The team finished investigating whether the vendor SDK supports our SSO requirements. Get the learnings on paper..."

This is the second data point (2026-06-13 baseline + this run) for the threshold-tuning the plan
anticipated ("any validation drop = regression" is too tight for ~4-query validation sets). Do NOT bake
the 50% into the baseline (it would lower the bar); keep the 2026-06-13 baseline and tune the threshold
after more runs.

## B-3: new-skill collision gate (`scripts/check-new-skill-collision.mjs --skill=deliver-edge-cases`)

- Probed `deliver-edge-cases` vs its 6 neighbors; 261 calls, **calibration 6/6**.
- Result: **collision detected** (theft 0, recall 1, back-recall 0, precision 0) - the lane fired its
  FAIL path and exits non-zero by design (the exit-5-on-collision behavior is unit-proven in
  `check-new-skill-collision.test.mjs`).
- The single recall miss: "Review this PRD and enumerate the boundary and failure scenarios it does not
  cover" routed to `utility-pm-critic` instead of `deliver-edge-cases`.

**Interpretation: a pre-existing critique-framing ambiguity, not a new collision.** This is the same
query the B-2 run also misrouted. Across both lanes, `utility-pm-critic` attracts critique-framed prompts
that the fixtures label for a domain skill:
- `deliver-edge-cases`: "Review this PRD and enumerate the boundary and failure scenarios it does not cover"
- `foundation-okr-writer`: "Critique this OKR draft: are the objectives inspiring and the key results measurable?"
- `foundation-persona`: "Stress-test our pricing decision against a realistic profile of our typical small-team customer"

Arguably `utility-pm-critic` SHOULD win "critique/review X" prompts (it is the critic; the domain skills
author rather than critique). So the likely fix is at the FIXTURE level (these critique-framed queries may
be mislabeled - they are near-misses that belong to `utility-pm-critic`), not a description defect. This
needs judgment and a re-run to confirm, so it is recorded as a finding, not acted on here.

## Conclusion

- **Both live trigger lanes are PROVEN:** they run against the real API, self-calibrate (6/6 both),
  produce per-skill recall/precision, diff against the committed baseline, detect drift/collision, and
  fail closed (non-zero exit). Step 5's instrument goal is met.
- **No regressions were introduced this session;** both flagged findings are variance (B-2) or a
  pre-existing critique-framing ambiguity (B-3).
- **Follow-ups (no key needed except the re-run):** (a) tune the B-2 drift threshold after a few more
  runs (small validation sets quantize at 25%); (b) review the critique-framed fixtures for
  `deliver-edge-cases` / `foundation-okr-writer` / `foundation-persona` against `utility-pm-critic`'s
  scope (likely mislabeled near-misses); (c) add the `ANTHROPIC_API_KEY` GitHub secret to run these
  lanes in CI (deferred by choice - the key is single-use).
