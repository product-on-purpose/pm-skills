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
| P1-5 Human anchor | Maintainer hand-scores 1-2 artifacts per family to calibrate the panel. **ARTIFACTS STAGED 2026-06-15:** a gated Sonnet anchor run (G=1/N=3, run `wf_c1261234-93a`, one skill per sampled family) regenerated each artifact + a fresh blind panel on that exact draft; staged a blind scoring sheet (`records/human-anchor-scoring-sheet-20260615.md`) + the 7 rendered artifacts (`records/anchor-artifacts-20260615/`) + the verbatim panel scores (`records/output-eval-anchor-20260615.raw.json`). All 3 straight-5.0 ceiling skills reproduced at G=1 (robust, not a draft fluke). Awaiting maintainer hand-scores -> then recorded into each rubric's Section 8 + the panel re-anchored if it sits >= ~0.5 above the human. **RECORDED 2026-06-15:** maintainer hand-scored all 7; the panel ran ~0.5-1.0 hot (mean Δ +0.77, 6/7 over the threshold; every straight-5.0 = human 4.0). Anchors written to all 7 rubric Section 8s; the shared scale (specification.md section 2) now carries a calibration note (panel absolutes read ~0.5-1.0 hot; the discrimination gap, not the absolute, is the primary signal). | DONE 2026-06-15 (calibration complete; panel runs ~0.77 hot) |

> Phase 1 carried two method refinements learned from the deliver-acceptance-criteria run (recorded
> 2026-06-14): (a) judges must receive each artifact VERBATIM and in full - summarizing the richer arm
> asymmetrically under-credits it; (b) derive `overall` as the criterion mean rather than a separate
> holistic score, because holistic-overall still ceilings (2/3 judges) even when the same judge scores
> individual criteria at 4. Both are baked into `output-eval.workflow.mjs`. A codex adversarial review
> (2026-06-14) added a third: (c) the harness FAILS CLOSED on a partial panel - if any of the G generations
> or the N judges does not return, the run is VOID (not a pass), because a single surviving judge makes the
> agreement stdev trivially 0 and would auto-pass the agreement gate on no real agreement.

### Phase 2..N - per-family rollout (the living tracker)

Roll out family by family. Each skill: author scenario -> run harness -> record result -> if a criterion
fails, queue a skill-body improvement (F-12 mechanism, now for body quality). Headline per skill: overall
mean / discrimination gap / agreement stdev.

| Skill | Family | Scenario | Rubric | Last result (overall / gap / agree) | Status |
|---|---|---|---|---|---|
| deliver-prd | specification | seat-mgmt (poc) | specification | 5.0 / 2.67 / 0.0 | PoC done |
| deliver-edge-cases | specification | file-upload | specification | 5.0 / 2.13 / 0.0 | PASS (batch 2026-06-14, unanimous) |
| deliver-acceptance-criteria | specification | bulk-invite | specification | 4.67 / 1.67 / 0.47 | PASS (gates clear, unanimous; record 2026-06-14) |
| deliver-user-stories | specification | - | specification | - | pending |
| deliver-launch-checklist | specification | - | specification | - | pending |
| deliver-release-notes | communication | mobile-v3 / api-v4-breaking | communication | 4.17 / 0.46 / 0.16 (re-look) | VOID (stays): RE-LOOK 2026-06-15 (api-v4-breaking scenario + informed control) freehand gap 0.83 -> 0.46 - a deliberately harder scenario did NOT open the gap; genuine low-marginal-value artifact type (a strong model writes decent release notes freehand). See `output-eval-informed-20260615.md`. |
| define-problem-statement | framing | checkout-abandonment | framing | 4.75 / 1.75 / 0.10 | PASS (batch 2026-06-14, unanimous) |
| define-hypothesis | framing | - | - | - | pending |
| define-jtbd-canvas | framing | - | - | - | pending |
| define-opportunity-tree | framing | - | - | - | pending |
| define-prioritization-framework | framing | - | - | - | pending |
| discover-interview-synthesis | discovery | onboarding-interviews | discovery | 4.88 / 1.50 / 0.10 | PASS (batch 2026-06-14, unanimous) |
| discover-competitive-analysis | discovery | notetaking-market | discovery | 4.88 / 1.33 / 0.10 | PASS (batch 2026-06-14, unanimous) |
| discover-market-sizing | discovery | - | - | - | pending |
| discover-journey-map | discovery | - | - | - | pending |
| discover-stakeholder-summary | discovery | - | - | - | pending |
| develop-adr | technical | search-datastore / event-streaming | technical | 4.50 / 1.29 / 0.18 (re-look) | VOID -> pass-structural: RE-LOOK 2026-06-15 (event-streaming scenario + informed control) reopened the freehand gap 0.92 -> 1.29 (now clearly beats freehand); weak-scenario instrument finding confirmed. Ties the template-only informed control (rigor premium ~0). See `output-eval-informed-20260615.md`. |
| develop-design-rationale | technical | - | - | - | pending |
| develop-solution-brief | technical | - | - | - | pending |
| develop-spike-summary | technical | - | - | - | pending |
| measure-experiment-design | measurement | onboarding-checklist / paywall-pricing | measurement | 4.42 / 1.21 / 0.41 (re-look) | VOID -> pass-structural: RE-LOOK 2026-06-15 (paywall-pricing scenario + informed control) reopened the freehand gap 0.21 -> 1.21 (now clearly beats freehand); weak-scenario finding confirmed. BUT the template-only informed control ties/beats it, weaker on `sample_size` math (3.7 vs 5.0). See `output-eval-informed-20260615.md`. |
| measure-experiment-results | measurement | - | - | - | pending |
| measure-okr-grader | measurement | activation-q3-close | measurement | 5.0 / 1.46 / 0.0 | PASS (batch 2026-06-14, unanimous) |
| measure-dashboard-requirements | measurement | - | - | - | pending |
| measure-instrumentation-spec | measurement | - | - | - | pending |
| measure-survey-analysis | measurement | - | - | - | pending |
| foundation-okr-writer | framing | activation-quarter | framing | 5.0 / 2.46 / 0.0 | PASS (batch 2026-06-14, unanimous) |
| foundation-persona | framing | - | - | - | pending |
| foundation-lean-canvas | framing | - | - | - | pending |
| iterate-retrospective | learning | sprint-42 | learning | 4.83 / 1.08 / 0.06 | PASS (batch 2026-06-14, unanimous) |
| iterate-lessons-log | learning | - | - | - | pending |
| iterate-pivot-decision | learning | - | - | - | pending |
| iterate-refinement-notes | learning | - | - | - | pending |
| (meeting / foundation-meeting-* + tool-* families) | various | - | - | - | later wave |

> The tracker is the resumable surface: pick the next `pending` row, author its scenario, run the harness,
> paste the result, flip status. Families share a rubric so authoring is amortized.

#### Phase 2 first batch (2026-06-14): 10-skill representative sample, Sonnet engine

The first representative-sample run landed: 1-2 highest-signal skills across 7 families, all on the
validated Sonnet engine via one Workflow fan-out (60 agents, ~1.74M tokens, ~6.4 min). Full evidence:
`records/output-eval-batch-20260614.md`.

- **7 of 10 PASS** both validity gates and the family bar with healthy margins and unanimous (or 2/3)
  blind preference: foundation-okr-writer (gap 2.46), deliver-edge-cases (2.13), define-problem-statement
  (1.75), discover-interview-synthesis (1.50), measure-okr-grader (1.46), discover-competitive-analysis
  (1.33), iterate-retrospective (1.08). No skill-body changes indicated; all 6 new family rubrics are
  validated working instruments.
- **3 of 10 VOID on discrimination (gap < 1.0)**: develop-adr (0.92), deliver-release-notes (0.83),
  measure-experiment-design (0.21). Per the validity gates these are INSTRUMENT findings (familiar
  artifact types where a strong freehand control is competitive), NOT skill failures. Queued: a
  scenario/control re-look + a full-fidelity re-run; no skill-body fixes fabricated.
- **Residual ceiling:** 3 skills scored a straight 5.0 (discrimination still large). The hardened anchor
  ceilings for the strongest skills under a Sonnet panel; the per-family human anchor (P1-5) is the
  remedy and is now the most pressing open calibration step.

---

## B. CI / tests against trigger drift and future collisions

The trigger re-baseline (M-31, `trigger-eval-router-baseline-20260613.md`) is the reference. These gates
keep it from rotting. All LLM-judged lanes are cost-gated / non-enforcing per the recorded-gate rule; the
deterministic asset-presence gates ARE enforcing.

| Gate | Type | What it protects |
|---|---|---|
| B-1 Productize the router eval | tooling | DONE (2026-06-13): `scripts/run-router-evals.mjs` + `.test.mjs` (11 tests, in the enforcing CI node --test step). Roster recall/precision + built-in calibration gate + `--dry-run` + `--baseline` diff (via exported `diffBaseline`); pure functions exported, network via injected `fetchImpl` so CI needs no key. Per-skill before/after mode (the B1 one-off) not ported - low value, skip. |
| B-2 Committed router baseline + diff lane | drift | DONE (2026-06-13): committed `records/router-eval-baseline-haiku.{json,md}` (Haiku, 29 skills, calibration 6/6, $1.19 live-verified). New `router-evals` job in `trigger-evals.yml` runs the eval with the API key secret and `--baseline` diff; exits 4 on a recall/precision regression. dry_run defaults TRUE. Threshold = any validation recall/precision drop (tune after a few runs of natural variance). **LIVE-PROVEN 2026-06-15** (record `router-eval-live-20260615.md`): ran against the real API (calibration 6/6, 1746 calls, $1.19); the drift gate correctly flagged `develop-spike-summary` 75%->50% and failed closed - variance on an unchanged skill (2nd data point for threshold tuning), not a regression. |
| B-3 New-skill collision gate | collision | DONE (2026-06-14): `scripts/check-new-skill-collision.mjs` (+ `.test.mjs`, 7 tests in the enforcing node --test step). Given `--skill=<name>`, runs the router eval with the new skill in the catalog and asserts recall (the new skill's trigger queries route to it), no-theft (no neighbor's trigger query routes to the new skill), and precision (no false-fire on a neighbor's near-miss queries). Neighbors derived from fixture `near_miss_of` in BOTH directions + `COLLISION_PAIRS`. New cost-gated `collision-probe` job in `trigger-evals.yml` (dispatch with `new_skill=<name>`; exit 5 on collision). Deterministic core unit-tested with no API; live run dispatch-gated like B-2. A codex adversarial review (2026-06-14) hardened it: fail-closed on an empty/no-recall fixture (was a vacuous pass), backward near-miss assertion (queries a neighbor disclaims to the new skill must route to it), and the CI `new_skill` input passed via a quoted env var (was a shell-injection vector). DEFERRED: auto-detecting an added skill from the PR diff (run manually/by dispatch for now). **LIVE-PROVEN 2026-06-15** (record `router-eval-live-20260615.md`): probed `deliver-edge-cases` vs 6 neighbors against the real API (calibration 6/6, 261 calls); detected a recall miss (a critique-framed query routed to `utility-pm-critic`) and failed closed - a pre-existing labeling ambiguity, not a new collision. |
| B-4 Eval-asset presence | deterministic, enforcing | DONE (trigger half, 2026-06-14): `check-trigger-fixtures.mjs` promoted advisory -> ENFORCING in validation.yml. It now fails CI on a malformed fixture or any **roster** skill missing `evals/trigger-fixtures.json`. Scope is the 29-skill measured roster (not all 66 skills - the other skills are not yet in the trigger-eval program, so gating them would red-CI without measuring anything). A filesystem-backed unit-test guard locks the corpus green in the enforcing `node --test` step ahead of the live validator. PENDING (output half, waits on M-33 Phase 1): extend the gate to also require an `output-scenarios/` entry + a rubric-family mapping per skill. |
| B-5 Description-change reminder | advisory | A check that flags a PR changing a SKILL.md `description` without a recorded router-eval re-run for that skill (advisory comment, not a hard fail). |
| B-6 Harness bug fix | tooling | DONE (2026-06-13): `apiError()` now surfaces `error_max_turns` from the result event's subtype/errors, and `classifyRun()` hard-stops it with an actionable message ("a SessionStart skill likely consumed the turn; raise --max-turns or disable interfering plugins. NOT a server throttle"). 2 regression tests added. |
| B-7 Output-eval asset + body-change gate | advisory -> enforcing | Codex adversarial review 2026-06-14, finding 4. Closes the regression-protection hole: regression-triggering only protects a skill if its output-eval assets exist WHEN its body changes. (a) Asset-presence check (output-eval analog of B-4): **DONE (advisory).** `scripts/check-output-eval-assets.mjs` (+ 7-test `.test.mjs`, in the enforcing node --test step) validates, for every skill carrying `evals/output-scenarios/`, that each scenario has well-formed frontmatter (scenario/skill/family), names its own skill, maps its family to an existing rubric, and carries a non-trivial brief. Wired advisory in validation.yml (M-30 ladder); clean across 11 scenarios; promote to enforcing once the output-eval roster is pinned. (b) Body-change reminder (output-eval analog of B-5): **PENDING** - a PR editing a roster skill's instructions/template without a recorded output-eval re-run gets an advisory flag (needs PR-diff context). |

Drift threshold defaults: recall drop > 1 query (per skill) or any new validation-set collision = fail.
Tune after the baseline has a few runs of natural variance.

---

## C. pm-skill-creator family integration (new skills ship eval-ready)

The creator/validator family (`utility-pm-skill-builder`, `utility-pm-skill-validate`, `jp-skill-builder`,
and the contribution docs) must bake the eval contract into skill creation so coverage never falls behind.

| Task | Detail |
|---|---|
| C-1 Scaffold trigger fixtures | DONE (2026-06-15): the builder's Step 5 packet now scaffolds `evals/trigger-fixtures.json` to the B-4 contract (>=16 queries, >=8/class, >=2 near-misses aimed at the Step 4.5 neighbors, train/validation split); staging + promotion + Output Contract + Quality Checklist updated. `utility-pm-skill-builder` 1.1.0. |
| C-2 Neighbor + collision check at creation | DONE (2026-06-15): new Step 4.5 "Eval Readiness" names the nearest neighbors; Step 7 promotion runs the `check-new-skill-collision.mjs --skill=<name>` probe (B-3) before the skill ships. |
| C-3 Enforce boundary pointers | DONE (2026-06-15): Step 4.5 requires a `When NOT to Use` section naming each neighbor + the reciprocal pointer back, and a `COLLISION_PAIRS` entry for strong overlaps; the Quality Checklist gates it. |
| C-4 Scaffold output-eval assets | DONE (2026-06-15): the packet scaffolds `evals/output-scenarios/<id>.md` to the B-7 contract and assigns the family rubric via a phase/category mapping table in Step 4.5. |
| C-5 Validator coverage | DONE (reciprocity half, 2026-06-14): `scripts/check-reciprocal-boundary-pointers.mjs` (+ 8-test `.test.mjs`) asserts every declared `COLLISION_PAIR` points at the other in "When NOT to Use". The one real gap it found (`foundation-meeting-recap` had no body back-pointer to `discover-interview-synthesis`) is CLOSED: foundation-meeting-recap 1.0.2 added the reciprocal body bullet, the validator now exits 0, and the gate is PROMOTED advisory -> ENFORCING in validation.yml. SECOND HALF DONE (2026-06-15): `utility-pm-skill-validate` 1.1.0 folds in three new Tier 1 checks - `eval-trigger-fixtures` (B-4), `eval-output-scenarios` (B-7), and `reciprocal-boundary-pointers` (C-5, FAILs a one-directional pair) - and upgrades `when-not-to-use` INFO->WARN; report schema unchanged. |
| C-6 CONTRIBUTING + creator docs | DONE (2026-06-15): `CONTRIBUTING.md` has a new "Eval Contract (what done looks like)" section (boundary pointers + fixtures + output-scenario/rubric + version history + the enforcing CI gates); the Skill Structure tree now shows `evals/`. |

---

## Sequencing

Phase 0 (PoC) -> Phase 1 (harness + specification rubric + scenario format) in one effort. B-1/B-6
(productize + harness fix) can land in parallel (they are the trustworthy instrument becoming a repo asset
and feed B-2/B-3). C-1..C-3 (creator integration for triggers) can land independently of M-33 output evals;
C-4 waits on Phase 1 rubrics. Roll out Phase 2 families behind the tracker, highest-signal skills first.

---

## Optimized rollout + development methodology (2026-06-14)

**Engine (validated, spec sections 7-8):** Sonnet generation + 3 Sonnet judges, one Workflow per
family (parallel fan-out). The orchestrating session runs on Opus (rubric/scenario authoring, the
version-bump cycle, codex reviews); eval agents are pinned to Sonnet via `agent({model:'sonnet'})`.
~138k tokens / ~2 min per skill. The main-loop model and the workflow agent model are independent -
you do NOT switch the session to Sonnet; the orchestrator creates Sonnet workers.

**Scope (validated):** representative SAMPLE - 1-2 highest-signal skills per family (~8-12 total) -
then REGRESSION-TRIGGER (eval a skill only when its body changes, like B-3 for new skills). Not a
full-roster sweep; exhaustive coverage is gold-plating once a family's first skills clear the gates.

**Harness gap to close first:** add `genModel`/`judgeModel` args to `output-eval.workflow.mjs` so
Sonnet is a flag (default inherit) + a unit test.

**Development methodology (how B-3/B-4/C-5 + the harness were built this session):** build ->
codex adversarial-review -> fix -> RE-REVIEW TO CONVERGENCE. This caught 7 real defects that unit
tests + self-review missed, two only visible after the first fix (the loop went 4 -> 2 -> 0). Apply
the same loop to every new gate/script. Companion recipe in memory `codex-native-review-stalls`.

**Hard-won lessons (carry into the rollout):**
- Judges get each artifact VERBATIM and in full - summarizing the richer arm under-credits it.
- The harness must FAIL CLOSED on a partial panel (missing gen/judge -> void, not pass): one
  surviving judge makes agreement trivially 0 and would auto-pass the agreement gate.
- A gate must fail closed when there is nothing to test (no boundary coverage / empty fixture),
  never vacuously pass.
- CI is a SUPERSET of the local shell bundle: the generated-surface node checks
  (`gen-resource-index.mjs --check`, `gen-skill-manifest.mjs --check` / `--agents --check`) run
  ONLY in CI. Run all three locally before every push - a prior session's description change left
  RESOURCES.md + the AGENTS block stale and only CI caught it.
- Windows CI checks out `*.md` as CRLF (`.gitattributes` marks `*.md text` without `eol=lf`); any
  byte-exact generator `--check` must normalize EOL (now fixed in gen-skill-manifest).

## Codex adversarial review of the rollout (2026-06-14)

A `codex:adversarial-review` of the rollout commits (`c08b58b6..d7744fcf`) returned `needs-attention`
with 4 findings. Disposition:

1. **[high] Low gap defined away as non-failure - ADDRESSED.** The verdict is now absolute-failure-first,
   encoded + unit-tested in `scripts/output-eval-aggregate.mjs` (`gateVerdict`): a skill FAILS on a
   sub-bar overall or a floored criterion regardless of the gap; only an absolute-clearing skill is VOID
   on a low gap. Spec section 4 + `eval-rubrics/specification.md` section 7 updated. The 3 VOID skills
   re-confirmed as inconclusive (they clear the absolute bar), not fails.
2. **[high] Control denied the contract - DOCUMENTED + PLANNED.** The freehand control measures
   skill-vs-no-skill (structure included); a PASS is not proof the skill's rigor beats the template
   alone. Recorded as a threat to validity in the spec + the batch record. Planned: an **informed
   control** (gets the Output Format contract, not the skill) as a second comparison, plus the human
   anchor as the absolute bar. NOT a current-results invalidation - the freehand control is the spec's
   intended baseline.
3. **[medium] Not reproducible from committed code - ADDRESSED.** Runner committed
   (`scripts/output-eval-batch.workflow.mjs`), raw output committed
   (`records/output-eval-batch-20260614.raw.json`), aggregation factored into the tested
   `output-eval-aggregate.mjs`. Open: the runner returns means not raw judge rows (tracked in its header).
4. **[medium] Sample coverage treated as regression protection - PLANNED (B-7).** Added B-7 (output-eval
   asset-presence + body-change gate). Family-validation claims softened to "validated for the sampled
   skill(s)" in the batch record.

Done since the review (2026-06-14): **B-7 asset-presence gate built** (`check-output-eval-assets.mjs`,
advisory) and the **batch runner revised** to emit raw per-judge rows + a mirrored absolute-failure-first
verdict.

Follow-up status (2026-06-15):
- **Per-family human anchor (P1-5): DONE** - maintainer hand-scored all 7; the panel ran ~0.77 hot,
  recorded into each rubric Section 8 + a calibration note on the shared scale (commit 76350a85).
- **Informed control (codex finding 2): DONE** - implemented (`output-eval-informed.workflow.mjs` +
  `unblindAndAggregate3`/`gateVerdict3` + the `pass-structural` tier) AND run 2026-06-15
  (`output-eval-informed-20260615.md`). **HEADLINE FINDING: the skills' measured artifact-quality value is
  primarily STRUCTURE (the template), not added RIGOR (the prose instructions).** The template-only informed
  control tied or beat the full skill in all 4 cases (gaps +0.04 / -0.04 / -0.17 / +0.08), even on
  experiment-design's sample-size math (informed 5.0 vs skill 3.7). Caveats recorded (the template IS the
  distilled methodology; the rubric rewards template-conformance; a weaker model might lean on instructions).
- **3 VOID instruments re-look: DONE** - stronger scenarios reopened the freehand gap for `develop-adr`
  (0.92 -> 1.29) and `measure-experiment-design` (0.21 -> 1.21), confirming those VOIDs were weak-scenario
  instrument findings; `deliver-release-notes` stays VOID (0.83 -> 0.46) - a genuine low-marginal-value
  artifact type a strong model writes well freehand. The re-anchored scale also dropped foundation-okr-writer
  off the 5.0 ceiling (to 4.54, near the human 4.0).
- **B-7 body-change reminder** half (output-eval analog of the B-5 description-change reminder): still
  PENDING (needs PR-diff context).
