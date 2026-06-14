# Implementation Plan: Output-Quality Evals (M-33) + Eval Drift Protection

Status: DRAFT (2026-06-13). Follows `spec_output-quality-evals.md`. This is a **living plan**: any session
can pick it up, advance one skill (or one CI gate) at a time, and update the tracker in place. Update task
status as work lands (the update-plans-as-you-ship rule).

This plan covers three asks:
- A. The output-eval program (PoC -> harness -> per-family rollout), with a status tracker.
- B. CI / tests to protect against trigger drift and future collisions.
- C. What the pm-skill-creator family must incorporate so new skills ship eval-ready.

---

## A. Output-eval program

### Phase 0 - PoC (deliver-prd) [status: DONE, PASSED 2026-06-13]

Workflow `output-eval-poc-deliver-prd`: generate skill PRD + weak control, 3-judge blind rubric panel,
measure discrimination gap + agreement. Result (spec section 6): discrimination gap **2.67**, judge
agreement stdev **0.0/0.47** - both validity gates cleared, the method is sound. Two refinements carried
into Phase 1: (a) harden rubric anchors to fix a ceiling effect (skill arm hit 5.0); (b) run the skill
arm 2-3x to average out generation noise. Cost ~207k subscription tokens / ~2 min per skill (one scenario,
3 judges) - full roster is feasible on the subscription.

### Phase 1 - productize [status: DONE 2026-06-14; human anchor (P1-5) awaiting maintainer]

| Task | Detail | Status |
|---|---|---|
| P1-1 Harness | `scripts/output-eval.workflow.mjs` (Workflow-tool script, subscription subagents): takes a skill + scenario + family rubric via `args`, runs G skill generations + a thin control + N blind schema-validated judges, derives overall as the criterion mean, reports gap + agreement + the validity gates. | DONE |
| P1-2 Rubric library | `docs/internal/eval-rubrics/specification.md`: hardened anchor scale (5 = nothing to improve, 4 = solid), 2 universal criteria + per-skill criteria for all 5 specification skills, negative-control design + judge protocol + validity gates. | DONE (specification family) |
| P1-3 Scenario format | `skills/<name>/evals/output-scenarios/<id>.md` (input brief). First: `deliver-acceptance-criteria/evals/output-scenarios/bulk-invite.md`. | DONE (format + 1 scenario) |
| P1-4 Recorded-results convention | `docs/internal/release-plans/v2.27.0/records/output-eval-<skill>-<date>.md`; the recorded result is the gate (not CI). First: `output-eval-deliver-acceptance-criteria-20260614.md`. | DONE |
| P1-5 Human anchor | Maintainer hand-scores 1-2 artifacts per family to calibrate the panel. Slot set up in the rubric (section 8) with a proposed deliver-prd anchor; awaiting maintainer sign-off. | SET UP, awaiting maintainer |

> Phase 1 carried two method refinements learned from the deliver-acceptance-criteria run (recorded
> 2026-06-14): (a) judges must receive each artifact VERBATIM and in full - summarizing the richer arm
> asymmetrically under-credits it; (b) derive `overall` as the criterion mean rather than a separate
> holistic score, because holistic-overall still ceilings (2/3 judges) even when the same judge scores
> individual criteria at 4. Both are baked into `output-eval.workflow.mjs`.

### Phase 2..N - per-family rollout (the living tracker)

Roll out family by family. Each skill: author scenario -> run harness -> record result -> if a criterion
fails, queue a skill-body improvement (F-12 mechanism, now for body quality). Headline per skill: overall
mean / discrimination gap / agreement stdev.

| Skill | Family | Scenario | Rubric | Last result (overall / gap / agree) | Status |
|---|---|---|---|---|---|
| deliver-prd | specification | seat-mgmt (poc) | specification | 5.0 / 2.67 / 0.0 | PoC done |
| deliver-edge-cases | specification | - | specification | - | pending |
| deliver-acceptance-criteria | specification | bulk-invite | specification | 4.67 / 1.67 / 0.47 | PASS (gates clear, unanimous; record 2026-06-14) |
| deliver-user-stories | specification | - | specification | - | pending |
| deliver-launch-checklist | specification | - | specification | - | pending |
| deliver-release-notes | communication | - | - | - | pending |
| define-problem-statement | framing | - | - | - | pending |
| define-hypothesis | framing | - | - | - | pending |
| define-jtbd-canvas | framing | - | - | - | pending |
| define-opportunity-tree | framing | - | - | - | pending |
| define-prioritization-framework | framing | - | - | - | pending |
| discover-interview-synthesis | discovery | - | - | - | pending |
| discover-competitive-analysis | discovery | - | - | - | pending |
| discover-market-sizing | discovery | - | - | - | pending |
| discover-journey-map | discovery | - | - | - | pending |
| discover-stakeholder-summary | discovery | - | - | - | pending |
| develop-adr | technical | - | - | - | pending |
| develop-design-rationale | technical | - | - | - | pending |
| develop-solution-brief | technical | - | - | - | pending |
| develop-spike-summary | technical | - | - | - | pending |
| measure-experiment-design | measurement | - | - | - | pending |
| measure-experiment-results | measurement | - | - | - | pending |
| measure-okr-grader | measurement | - | - | - | pending |
| measure-dashboard-requirements | measurement | - | - | - | pending |
| measure-instrumentation-spec | measurement | - | - | - | pending |
| measure-survey-analysis | measurement | - | - | - | pending |
| foundation-okr-writer | framing | - | - | - | pending |
| foundation-persona | framing | - | - | - | pending |
| foundation-lean-canvas | framing | - | - | - | pending |
| iterate-retrospective | learning | - | - | - | pending |
| iterate-lessons-log | learning | - | - | - | pending |
| iterate-pivot-decision | learning | - | - | - | pending |
| iterate-refinement-notes | learning | - | - | - | pending |
| (meeting / foundation-meeting-* + tool-* families) | various | - | - | - | later wave |

> The tracker is the resumable surface: pick the next `pending` row, author its scenario, run the harness,
> paste the result, flip status. Families share a rubric so authoring is amortized.

---

## B. CI / tests against trigger drift and future collisions

The trigger re-baseline (M-31, `trigger-eval-router-baseline-20260613.md`) is the reference. These gates
keep it from rotting. All LLM-judged lanes are cost-gated / non-enforcing per the recorded-gate rule; the
deterministic asset-presence gates ARE enforcing.

| Gate | Type | What it protects |
|---|---|---|
| B-1 Productize the router eval | tooling | DONE (2026-06-13): `scripts/run-router-evals.mjs` + `.test.mjs` (11 tests, in the enforcing CI node --test step). Roster recall/precision + built-in calibration gate + `--dry-run` + `--baseline` diff (via exported `diffBaseline`); pure functions exported, network via injected `fetchImpl` so CI needs no key. Per-skill before/after mode (the B1 one-off) not ported - low value, skip. |
| B-2 Committed router baseline + diff lane | drift | DONE (2026-06-13): committed `records/router-eval-baseline-haiku.{json,md}` (Haiku, 29 skills, calibration 6/6, $1.19 live-verified). New `router-evals` job in `trigger-evals.yml` runs the eval with the API key secret and `--baseline` diff; exits 4 on a recall/precision regression. dry_run defaults TRUE. Threshold = any validation recall/precision drop (tune after a few runs of natural variance). |
| B-3 New-skill collision gate | collision | DONE (2026-06-14): `scripts/check-new-skill-collision.mjs` (+ `.test.mjs`, 7 tests in the enforcing node --test step). Given `--skill=<name>`, runs the router eval with the new skill in the catalog and asserts recall (the new skill's trigger queries route to it), no-theft (no neighbor's trigger query routes to the new skill), and precision (no false-fire on a neighbor's near-miss queries). Neighbors derived from fixture `near_miss_of` in BOTH directions + `COLLISION_PAIRS`. New cost-gated `collision-probe` job in `trigger-evals.yml` (dispatch with `new_skill=<name>`; exit 5 on collision). Deterministic core unit-tested with no API; live run dispatch-gated like B-2. DEFERRED: auto-detecting an added skill from the PR diff (run manually/by dispatch for now). |
| B-4 Eval-asset presence | deterministic, enforcing | DONE (trigger half, 2026-06-14): `check-trigger-fixtures.mjs` promoted advisory -> ENFORCING in validation.yml. It now fails CI on a malformed fixture or any **roster** skill missing `evals/trigger-fixtures.json`. Scope is the 29-skill measured roster (not all 66 skills - the other skills are not yet in the trigger-eval program, so gating them would red-CI without measuring anything). A filesystem-backed unit-test guard locks the corpus green in the enforcing `node --test` step ahead of the live validator. PENDING (output half, waits on M-33 Phase 1): extend the gate to also require an `output-scenarios/` entry + a rubric-family mapping per skill. |
| B-5 Description-change reminder | advisory | A check that flags a PR changing a SKILL.md `description` without a recorded router-eval re-run for that skill (advisory comment, not a hard fail). |
| B-6 Harness bug fix | tooling | DONE (2026-06-13): `apiError()` now surfaces `error_max_turns` from the result event's subtype/errors, and `classifyRun()` hard-stops it with an actionable message ("a SessionStart skill likely consumed the turn; raise --max-turns or disable interfering plugins. NOT a server throttle"). 2 regression tests added. |

Drift threshold defaults: recall drop > 1 query (per skill) or any new validation-set collision = fail.
Tune after the baseline has a few runs of natural variance.

---

## C. pm-skill-creator family integration (new skills ship eval-ready)

The creator/validator family (`utility-pm-skill-builder`, `utility-pm-skill-validate`, `jp-skill-builder`,
and the contribution docs) must bake the eval contract into skill creation so coverage never falls behind.

| Task | Detail |
|---|---|
| C-1 Scaffold trigger fixtures | When the builder creates a skill, generate a `trigger-fixtures.json` stub: should-trigger queries from the skill's intents, should-not + near-miss queries aimed at the neighbors identified during classification. |
| C-2 Neighbor + collision check at creation | The builder already classifies phase/type; extend it to name the new skill's NEAREST NEIGHBORS and run a quick router-eval collision probe (new skill vs neighbors) BEFORE the skill ships. Surfaces a collision while it is cheap to fix (description wording / boundary pointers). |
| C-3 Enforce boundary pointers | The builder must require a `When NOT to Use` section that names neighbors, and prompt to add the reciprocal pointer back from each neighbor. Reciprocal boundary pointers are what kept the v2.26.0 rewrites collision-clean (proven by M-31). |
| C-4 Scaffold output-eval assets | Generate an `output-scenarios/` stub + assign the family rubric, so a new skill is output-eval-ready. |
| C-5 Validator coverage | `utility-pm-skill-validate` checks eval-asset presence (B-4) and that boundary pointers are reciprocal. |
| C-6 CONTRIBUTING + creator docs | Document the eval contract (fixtures + scenario + rubric family + reciprocal pointers) as part of "what done looks like" for a new skill. |

---

## Sequencing

Phase 0 (PoC) -> Phase 1 (harness + specification rubric + scenario format) in one effort. B-1/B-6
(productize + harness fix) can land in parallel (they are the trustworthy instrument becoming a repo asset
and feed B-2/B-3). C-1..C-3 (creator integration for triggers) can land independently of M-33 output evals;
C-4 waits on Phase 1 rubrics. Roll out Phase 2 families behind the tracker, highest-signal skills first.
