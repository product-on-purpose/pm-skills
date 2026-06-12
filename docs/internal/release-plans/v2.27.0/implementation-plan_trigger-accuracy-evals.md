# v2.27.0 Implementation Plan: Trigger-Accuracy Eval Harness, Phase 1 (M-31)

**Status:** READY (follows [`spec_trigger-accuracy-evals.md`](spec_trigger-accuracy-evals.md); update task statuses in place as work lands, per the update-plans-as-you-ship rule).
**Agents:** codex or claude for Tasks 1-2 and 5-6 (scriptable); claude for Tasks 3-4 (fixture authoring needs PM judgment); human for the API-key secret and baseline sign-off.

| Task | Status |
|---|---|
| 1. Fixture schema constants + validator | TODO |
| 2. Advisory CI wiring | TODO |
| 3. Fixtures: collision batch (9 skills) | TODO |
| 4. Fixtures: remainder of roster (20 skills) | TODO |
| 5. Harness | TODO |
| 6. workflow_dispatch lane | TODO |
| 7. Baseline run + triage record | TODO |
| 8. Docs + hygiene sync | TODO |

---

## Task 1: Validator + schema constants (S)

Files: `scripts/check-trigger-fixtures.mjs`, `scripts/check-trigger-fixtures.test.mjs`.

- Implement per spec section 3: parse, schema=1, skill/dir match, enums, uniqueness, composition minimums (>=16 queries, >=8 per class), 60/40 split per class (tolerance 1), `near_miss_of` existence on disk, collision-pair near-miss minimums, roster completeness (the 29 roster names live in a `ROSTER` constant in the validator; the spec's cohort table is the source).
- Convention match: pure functions exported for tests; `main()` with `pathToFileURL` guard; exit 0/1; readable per-file findings.
- `.test.mjs`: Node built-in runner; in-memory good fixture passes; one failing case per violation class.
- Validation: `node --test scripts/check-trigger-fixtures.test.mjs` green; running the validator before any fixtures exist reports the 29 missing roster files (expected red until Task 3-4; advisory wiring makes this non-blocking).

## Task 2: Advisory CI wiring (S)

File: `.github/workflows/validation.yml`.

- Add `scripts/check-trigger-fixtures.test.mjs` to the enforcing `node --test` list in the "Test hooks + eval validators" step.
- Add advisory step "Eval - trigger fixtures (advisory)" with `if: always()` + `continue-on-error: true`, mirroring the M-30 steps.
- Do NOT touch `pre-tag-validate.{sh,ps1}` or `validation-manifest.yaml` (Node checks are out of parity remit by design; spec section 0.3).
- Validation: CI run shows the unit test enforcing and the advisory step yellow-but-passing the build.

## Task 3: Fixtures, collision batch first (M)

Files: `skills/<name>/evals/trigger-fixtures.json` for the 9 collision-involved skills: deliver-user-stories, deliver-acceptance-criteria, deliver-edge-cases, define-hypothesis, measure-experiment-design, discover-interview-synthesis, foundation-meeting-recap, iterate-lessons-log, iterate-retrospective (plus the watch pair foundation-okr-writer, measure-okr-grader if capacity allows in this batch; otherwise Task 4).

- Author per spec section 2. Should-trigger queries paraphrase real invocation intents (mine each skill's description, When to Use, and its sample's Prompt block); should-not queries are a mix of generic non-matches and the mandated near-misses pointing at the collision partner.
- Near-miss discipline: the near-miss query must be a request the PARTNER skill should win; copy the boundary language from the F-12 Batch 0 description rewrites (they encode exactly these boundaries).
- Validation: structure validator green for the batch; spot-read by maintainer.

## Task 4: Fixtures, remainder of roster (M)

Files: the remaining roster skills (rest of the 26-skill cohort).

- Same authoring rules; near-misses optional here but encouraged where an adjacent skill exists (e.g. develop-solution-brief vs deliver-prd).
- Validation: full-roster validator run green, including roster-completeness check; advisory CI step goes fully green at this point.

## Task 5: Harness (M)

Files: `scripts/run-trigger-evals.mjs`, `scripts/run-trigger-evals.test.mjs`.

- Pure detection function over a `claude -p --output-format json` transcript (Skill tool fired for target skill?); runner loop (3 runs per query, rate vs threshold, pass/fail vs `expect`); per-skill and aggregate reporting (train and validation separated, validation headline); `--skills` filter; `--collision` sweep; `--report <path>` markdown output; `--dry-run` prints the plan + invocation count.
- Before batch-running: ONE live probe invocation to confirm transcript shape and headless skill discovery (reuse the agentic-smoke-runbook's install-at-user-scope pattern; watch its recorded plugin-cache Glob quirk).
- `.test.mjs` covers detection + report math on canned transcripts only (no API in CI).
- Validation: unit tests green; a real single-skill run produces a correct report.

## Task 6: workflow_dispatch lane (S)

File: `.github/workflows/trigger-evals.yml`.

- Inputs: `skills` (string, optional), `dry_run` (boolean, default true), mirroring `create-issues-from-drafts.yml` gating. Secret: `ANTHROPIC_API_KEY`. Steps: checkout, node setup, fixture validator (hard fail here even though advisory in validation.yml: no point spending tokens on bad fixtures), harness, upload report artifact.
- Validation: a dry-run dispatch completes green in CI; a non-dry single-skill dispatch produces the artifact (requires the secret; human step).

## Task 7: Baseline + triage (M, evidence gate)

- Run the full roster (staged batches acceptable per spec risk note); commit the accepted report to `docs/internal/release-plans/v2.27.0/records/trigger-eval-baseline.md`.
- Triage every failed query per decision T-F: description follow-up (F-12-mechanism batch, separate PR, per-skill patch bumps + HISTORY.md) or fixture correction with rationale logged in the record.
- Validation: record committed; zero untriaged failures; AC 31-6 met.

## Task 8: Docs + hygiene sync (S)

- Contributor doc for fixture authoring + harness usage. Default home: `site/src/content/docs/contributing/trigger-evals.md`; that requires `scripts/route-manifest.txt` + `node scripts/gen-resource-index.mjs` regeneration in the same PR (the known staleness gate).
- `docs/internal/skill-versioning.md`: add the T-B rule (fixtures do not bump skill versions).
- CHANGELOG `[Unreleased]` entry; effort brief status flip; plan task table above kept current per landing PR.
- Validation: full local bundle + CI green; resource-index check green.

## Sequencing

1 -> 2 land together (one PR; validator red on missing fixtures is fine because advisory). 3 -> 4 may land as one or two PRs. 5 -> 6 together. 7 after 4+6. 8 rides the last build PR. Tasks 1-2 unblock nothing downstream of fixtures, so 3 can start in parallel with 5 if two agents run.
