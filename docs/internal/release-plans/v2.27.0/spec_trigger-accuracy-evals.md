# v2.27.0 Spec: Trigger-Accuracy Eval Harness, Phase 1 (M-31)

**Status:** DRAFT R0 (specced 2026-06-12). Maintainer pre-authorized build start the same day; the adversarial review loop still runs before tag per the G1 gate, and findings fold back into this spec.
**Covers:** Trigger-Accuracy Evals (M-31, issue #200). Implements the published agentskills.io trigger-eval methodology over the F-12 converged cohort.
**Companion:** [`plan_v2.27.0.md`](plan_v2.27.0.md) | [`implementation-plan_trigger-accuracy-evals.md`](implementation-plan_trigger-accuracy-evals.md) | effort brief [`M-31-trigger-accuracy-evals.md`](../../efforts/M-31-trigger-accuracy-evals.md)
**Methodology source:** https://agentskills.io/skill-creation/optimizing-descriptions.md (accessed 2026-06-12): ~20 labeled queries per skill, near-miss negatives, 3 runs per query, 0.5 trigger-rate threshold, 60/40 train/validation split.

---

## 0. Prerequisites and platform facts (verified 2026-06-12)

1. **F-12 Skill Quality Convergence is DONE** (v2.26.0, all batches; #135 closed). Fixtures test the corrected description corpus, per the v2.26.0 plan's deferred-items sequencing note.
2. **Adding `skills/<name>/evals/*.json` breaks nothing.** The release ZIP (`scripts/build-release.sh`) includes them harmlessly under `skills/`; `gen-resource-index.mjs` ignores them; the scar guard scans only `.md`; no count or structure validator enumerates extra files inside skill dirs.
3. **Node `.mjs` checks are CI-only by design** (validation-manifest.yaml header): they run once cross-platform in validation.yml and are exempt from the bash/pwsh parity mandate. No `pre-tag-validate.{sh,ps1}` entries are needed; `check-validator-parity.mjs` is unaffected.
4. **Advisory wiring precedent:** the M-30 sample validators (`check-sample-*.mjs`) wire as `if: always()` + `continue-on-error: true` steps, with their `.test.mjs` files in the enforcing "Test hooks + eval validators" `node --test` step.
5. **workflow_dispatch precedent:** `create-issues-from-drafts.yml` (boolean `dry_run` input, default true) is the input-gating pattern to mirror.

## 1. Scope

**In (Phase 1):**
- Trigger fixtures for the **26-skill F-12 cohort** (the cohort table in `../v2.26.0/spec_skill-quality-convergence.md` section 1 is normative).
- A deterministic fixture-structure validator (`scripts/check-trigger-fixtures.mjs` + `.test.mjs`), wired ADVISORY in validation.yml immediately.
- A runnable harness (`scripts/run-trigger-evals.mjs`) for local use and a cost-gated `workflow_dispatch` lane.
- A recorded baseline report for the cohort (the evidence gate).
- A contributor-facing reference doc for authoring fixtures.

**Out (recorded, later phases):** enforcing promotion of any LLM-run lane (never; the deterministic structure validator may promote later per the M-30 ladder); catalog-wide fixture expansion beyond the cohort; output evals (`evals/evals.json`, a future effort); automated description iteration (the methodology's train-loop; Phase 1 measures, humans fix via the F-12 mechanism); non-Claude harness runners (fixtures are client-agnostic; the harness is Claude-first).

## 2. Fixture design (normative)

**Location:** `skills/<name>/evals/trigger-fixtures.json`. The `evals/` directory is chosen to match the published colocated-evals convention and reserves `evals/evals.json` for the future output-eval lane (plan decision Q-B).

**Schema (v1):**

```json
{
  "schema": 1,
  "skill": "deliver-prd",
  "runs_per_query": 3,
  "trigger_threshold": 0.5,
  "queries": [
    {
      "q": "Write a PRD for our new checkout flow",
      "expect": "trigger",
      "split": "train"
    },
    {
      "q": "Break this feature into user stories for sprint planning",
      "expect": "no-trigger",
      "split": "validation",
      "near_miss_of": "deliver-user-stories",
      "notes": "Adjacent deliver-phase ask; belongs to the story skill"
    }
  ]
}
```

| Field | Rule |
|---|---|
| `schema` | Integer, must be 1 |
| `skill` | Must equal the parent skill directory name |
| `runs_per_query` / `trigger_threshold` | Fixed at 3 and 0.5 in Phase 1 (present in the file so future phases can vary them per skill) |
| `queries[].q` | Non-empty, unique within the file |
| `queries[].expect` | `trigger` or `no-trigger` |
| `queries[].split` | `train` or `validation` |
| `queries[].near_miss_of` | Optional; if present, must name an existing skill directory |
| `queries[].notes` | Optional free text |

**Composition minimums (validator-enforced):** at least 16 queries (8 should-trigger, 8 should-not), target 20 (10/10); the split is 60/40 per expectation class, with rounding tolerance of 1 query; **at least 2 near-miss negatives** for every skill that belongs to a known collision pair. The audit's five pairs plus the watch pair seed the near-miss sets:

1. deliver-user-stories <> deliver-acceptance-criteria
2. deliver-acceptance-criteria <> deliver-edge-cases
3. define-hypothesis <> measure-experiment-design
4. discover-interview-synthesis <> foundation-meeting-recap
5. iterate-lessons-log <> iterate-retrospective
6. (watch) foundation-okr-writer <> measure-okr-grader

`foundation-meeting-recap`, `foundation-okr-writer`, and `measure-okr-grader` are outside the 26-skill cohort; they receive fixtures anyway because they are collision partners (cohort + 3 partners = **29 fixture files**). This is the only out-of-cohort touch in Phase 1.

## 3. The structure validator: `scripts/check-trigger-fixtures.mjs`

Deterministic, free, CI-able. Checks per file: JSON parses; schema version; `skill` matches directory; field enums; uniqueness; composition minimums; split ratio; `near_miss_of` targets exist on disk; collision-pair skills carry their 2+ near-misses. Also checks the inverse: every skill listed in the spec's fixture roster (the 29) HAS a fixture file, so coverage cannot silently shrink.

Conventions (mirrors `check-sample-exact-quote-sourcing.mjs`): pure functions + `main()` CLI entry with the `pathToFileURL` direct-invocation guard; companion `.test.mjs` using the Node built-in test runner with passing and failing fixtures; no external dependencies.

Wiring: `.test.mjs` joins the enforcing `node --test` step; the validator itself runs as an advisory step (`if: always()`, `continue-on-error: true`). Promotion to enforcing is a later, deliberate step after the fixture corpus stabilizes (M-30 ladder).

## 4. The harness: `scripts/run-trigger-evals.mjs`

- Per query: invoke `claude -p <q> --output-format json` in a context where the plugin's skills are discoverable, detect whether the Skill tool fired for the target skill, repeat `runs_per_query` times; trigger rate >= threshold counts as triggered.
- Per skill: each query PASSES if observed behavior matches `expect`. Report train and validation pass rates separately; **the validation-set pass rate is the headline number.**
- Cohort report: per-skill table plus aggregate; emitted as console summary and a markdown record.
- `--skills <a,b,...>` filter; `--collision` optional sweep: every should-trigger query of skill A is additionally checked for a false fire on A's collision partner(s), the automated form of the audit's manual collision finding.
- Detection layer is isolated in a pure function over the JSON transcript so `.test.mjs` can unit-test it with canned transcripts; no API calls in CI unit tests.
- Cost note: 29 skills x ~20 queries x 3 runs = ~1,740 headless invocations per full baseline. The harness therefore supports per-batch runs and the lane defaults to dry-run.

## 5. The CI lane: `.github/workflows/trigger-evals.yml`

`workflow_dispatch` only. Inputs: `skills` (optional filter, empty = full roster), `dry_run` (boolean, default true: validates fixtures and prints the run plan + estimated invocation count without calling the API). Requires the `ANTHROPIC_API_KEY` secret; uploads the markdown report as an artifact. Advisory by definition; never part of the pre-tag bundle; never enforcing. The recording rule is the gate: the accepted baseline report is committed to `docs/internal/release-plans/v2.27.0/records/trigger-eval-baseline.md`.

## 6. Decisions (lettered for review)

| # | Decision | Rationale |
|---|---|---|
| T-A | Fixture file is `evals/trigger-fixtures.json`, one per skill | Colocated per the published convention; `evals/evals.json` reserved for output evals |
| T-B | Fixture addition does NOT bump skill versions | Plan decision Q-C; no behavior change. Recorded in `docs/internal/skill-versioning.md` as part of this effort |
| T-C | Roster = 26-skill cohort + 3 collision partners (29 files) | Near-miss negatives require both sides of a pair to be testable |
| T-D | Constants 3 runs / 0.5 threshold / 60-40 split, stored per file but fixed in Phase 1 | Follow the published methodology exactly before customizing |
| T-E | Structure validator advisory now, promotable later; LLM lane advisory forever | M-30 ladder; LLM-run results are evidence (recorded), not gates |
| T-F | Baseline failures are triaged, not auto-fixed: description changes go through the F-12 mechanism (verbatim normative rewrites + per-skill patch bumps) in a follow-up batch | Keeps measurement and remediation separable; preserves HISTORY.md discipline |

## 7. Acceptance criteria

- 31-1: `check-trigger-fixtures.mjs` exits 0 on a valid fixture and non-zero on each violation class; `.test.mjs` covers both directions and runs in the enforcing unit-test step.
- 31-2: All 29 roster fixture files exist, pass the validator, and meet composition minimums including collision near-misses.
- 31-3: The validator runs as an advisory step in validation.yml; the pre-tag shell bundles and parity manifest are untouched.
- 31-4: The harness produces a per-skill + aggregate report from a real run of at least one batch; detection logic has unit coverage via canned transcripts.
- 31-5: The `workflow_dispatch` lane exists, defaults to dry-run, and a dry run completes green in CI.
- 31-6: A baseline report for the full roster is recorded at the records path, with failures triaged (each one: description follow-up filed via T-F, or a fixture correction with rationale).
- 31-7: Contributor doc exists explaining fixture authoring (including near-miss selection) and the harness; if it ships as a site page, route-manifest and the resource index are regenerated in the same PR.
- 31-8: `docs/internal/skill-versioning.md` records the T-B no-bump rule.

## 8. Risks and open questions

- **Headless skill discovery:** the harness must run where the plugin's skills are visible to `claude -p` (the agentic-smoke-runbook already solved install-at-user-scope headless invocation; reuse its pattern). Verify Skill-tool transcript shape against one live run before batch-running (the smoke runbook records a known plugin-cache Glob quirk).
- **Stochastic flakiness:** 3 runs at 0.5 threshold tolerates one flake per query; persistent borderline queries are an ambiguity signal to record, not retry away (per the methodology's pattern-analysis guidance).
- **Cost drift:** full-roster baseline is ~1,740 invocations; if prohibitive, T-F triage accepts a staged baseline (collision-pair batch first) with the remainder recorded before tag.
