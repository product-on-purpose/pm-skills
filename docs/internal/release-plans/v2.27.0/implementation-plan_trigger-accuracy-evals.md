# v2.27.0 Implementation Plan: Trigger-Accuracy Eval Harness, Phase 1 (M-31)

**Status:** READY (follows [`spec_trigger-accuracy-evals.md`](spec_trigger-accuracy-evals.md); update task statuses in place as work lands, per the update-plans-as-you-ship rule).
**Agents:** codex or claude for Tasks 1-2 and 5-6 (scriptable); claude for Tasks 3-4 (fixture authoring needs PM judgment); human for the API-key secret and baseline sign-off.

| Task | Status |
|---|---|
| 1. Fixture schema constants + validator | DONE (2026-06-12: `check-trigger-fixtures.mjs` + 10-case `.test.mjs` green; live run reports the expected 29 missing roster files) |
| 2. Advisory CI wiring | DONE (2026-06-12: unit test joined the enforcing `node --test` step; advisory step added after the M-30 evals; shell bundles + parity manifest untouched by design) |
| 3. Fixtures: collision batch | DONE (2026-06-12: all 11 collision-involved skills incl. the watch pair; 3 partner-aimed near-misses each, both splits) |
| 4. Fixtures: remainder of roster | DONE (2026-06-12: remaining 18 roster skills; full 29-file roster validates clean; near-miss targets annotated beyond the mandate to enrich the future --collision sweep) |
| 5. Harness | DONE + HARDENED (2026-06-12 base; 2026-06-13 hardened through real-load failures: `--batch`/`--list-batches`, `--probe` usage, `--concurrency` (async pool), progress logging; FIXES - stdin prompt (Windows shell-quoting), absolute `--report` paths, abort-not-fabricate on API error, retry+backoff on transient throttle (credit/auth/usage-cap = hard abort). 13-case test green) |
| 6. workflow_dispatch lane | DONE (2026-06-12: `.github/workflows/trigger-evals.yml`; dry_run defaults TRUE, fixture validator is a hard gate in-lane, report uploads as artifact; needs the ANTHROPIC_API_KEY secret for live legs) |
| 7. Baseline run + triage record | PARTIAL / PAUSED (2026-06-13: 21 skills measured - Runs 1-5 in `records/trigger-eval-baseline.md`; 4/6 collision pairs CLEAN; deliver-edge-cases recall gap confirmed on Sonnet; define-hypothesis confirmed Haiku-artifact. PAUSED on sustained server throttling; ~13 skills deferred with a documented resume path in the baseline record) |
| 8. Docs + hygiene sync | PARTIAL (2026-06-12: skill-versioning T-B rule + CHANGELOG done; explainer doc `trigger-evals-explained.md` added 2026-06-13; contributor how-to page + effort-brief status flip remain) |

## Open items (consolidated pending list, 2026-06-13)

The single place to see what is left for this effort. Authoritative lifecycle tracker is GitHub issue
#200 (M-31 trigger-accuracy evals); detail and resume commands live in `records/trigger-eval-baseline.md`.

> **METHODOLOGY CORRECTION (2026-06-13 PM) - read before resuming.** The headless `claude -p` harness
> is environment-confounded: skill-firing is driven by the `superpowers` nudge, extended thinking, and
> the `--max-turns 1` budget, not the skill description. The morning "throttling" pause was actually
> `error_max_turns` (superpowers' SessionStart hook eating the single turn), misclassified by the
> harness as a rate limit. The recorded baseline (Runs 1-5) is not reproducible and its absolute numbers
> are not reliable. Full writeup: `trigger-evals-explained.md` -> "CORRECTION AND CURRENT UNDERSTANDING".
> **Items A1, A2, B2 below are superseded:** do not "finish the baseline" on the headless harness. The
> path forward is the controlled router eval (catalog + query -> which skill fits), which validated
> 6/6 on obvious cases and runs on the subscription via subagents with no API key. B1 stays committed.
> New top item: re-run the controlled router eval with throttle control (concurrency ~2-3 + backoff) for
> a clean B1 before/after and a re-baseline; and fix `classifyRun()` to treat `error_max_turns` as a
> hard, labeled failure rather than a retryable throttle.

**A. Complete the baseline (deferred on server throttling, no code changes needed)**
- A1. Run the remaining ~13 skills, one named batch per calm 5-hour window on the subscription
  (Haiku): collision-research, collision-iterate, rest-define-discover (discover-* only),
  rest-measure, rest-iterate-foundation, and develop (spike-summary). Resume commands in the record.
- A2. Sonnet confirmation for the Haiku-only recall scorers that are still flagged
  (foundation-okr-writer 75, measure-okr-grader 63) - re-run those on `claude-sonnet-4-6` to confirm
  real-vs-artifact before any edit. (deliver-edge-cases and define-hypothesis already confirmed.)

**B. Act on findings (the payoff; a NEW follow-up batch, F-12 mechanism)**
- B1. `deliver-edge-cases`: add intent-synonyms to "When to Use" ("failure modes / what can go wrong /
  race conditions / boundary and limit scenarios"). Confirmed real on both models. Per-skill patch
  bump + HISTORY; re-run its fixtures to verify the lift.
- B2. Re-evaluate `deliver-prd` ("spec / requirements doc") and any B-list skills surfaced by A1/A2;
  apply the same synonym pass only where confirmed on the user-default model.

**C. Tooling / docs follow-ups**
- C1. Task 8 remainder: contributor how-to page for fixture authoring + harness usage (site page;
  needs route-manifest + resource-index regen); flip the M-31 effort brief Status when it ships.
- C2. Optional: explicit `--collision` sweep for the OKR writer-vs-grader boundary flagged in Run 4.
- C3. Later: promote the fixture-structure validator from advisory to enforcing (M-30 ladder), once
  the full 29-file corpus is stable.
- C4. Optional efficiency: a direct Messages-API harness (cached catalog injection) for a fast, cheap,
  CI-able per-release gate - deferred; needs an API key and a fidelity-validation pass.

**Done and not pending:** fixtures (29 files), validator + advisory CI lane, the harness (built +
hardened), the dispatch lane, the explainer doc, and the partial baseline (Runs 1-5).

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

- Pure detection function over a `claude -p --output-format stream-json` transcript (Skill tool fired for target skill?); runner loop (3 runs per query, rate vs threshold, pass/fail vs `expect`); per-skill and aggregate reporting (train and validation separated, validation headline); `--skills` filter; `--batch <name>` / `--list-batches` (10 named batches partitioning the roster); `--collision` sweep; `--report <path>` markdown output; `--dry-run` prints the plan + invocation count; `--probe <skill>` prints transcript shape + real per-call token usage. Prompt is sent on STDIN (Windows shell-quoting fix, see Task 7).
- Before batch-running: ONE live probe invocation to confirm transcript shape and headless skill discovery (reuse the agentic-smoke-runbook's install-at-user-scope pattern; watch its recorded plugin-cache Glob quirk). The probe now also prints a real per-call token-usage line (`extractUsage`); multiply by 1740 (full) / ~600 (collision batch) for a grounded cost estimate. NOTE from a 2026-06-13 probe run inside the repo: the call succeeded but `skillFired=false` because the plugin is local-disabled in the repo cwd, and per-call input was ~56k tokens because this dev box has many other plugins loaded. Both confounders vanish in a clean scratch dir with only pm-skills installed (lower context, plugin discoverable) - run the real baseline there.
- `.test.mjs` covers detection + report math on canned transcripts only (no API in CI).
- Validation: unit tests green; a real single-skill run produces a correct report.

## Task 6: workflow_dispatch lane (S)

File: `.github/workflows/trigger-evals.yml`.

- Inputs: `skills` (string, optional), `dry_run` (boolean, default true), mirroring `create-issues-from-drafts.yml` gating. Secret: `ANTHROPIC_API_KEY`. Steps: checkout, node setup, fixture validator (hard fail here even though advisory in validation.yml: no point spending tokens on bad fixtures), harness, upload report artifact.
- Validation: a dry-run dispatch completes green in CI; a non-dry single-skill dispatch produces the artifact (requires the secret; human step).

## Task 7: Baseline + triage (M, evidence gate)

- Run the roster in NAMED BATCHES (see "Batched execution on a subscription" below); commit the accepted per-batch reports + roll the summary into `records/trigger-eval-baseline.md`.
- Triage every failed query per decision T-F: description follow-up (F-12-mechanism batch, separate PR, per-skill patch bumps + HISTORY.md) or fixture correction with rationale logged in the record.
- Validation: record committed; zero untriaged failures; AC 31-6 met.

### Batched execution on a subscription (no API key required)

A Pro/Max subscription has a 5-hour ROLLING usage window (overage may be org-disabled), so the
1,740-call roster cannot run in one shot - but it runs fine split into small batches, one (or two)
per window, with the highest-signal collision pairs first. No API key, zero dollar cost; the only
cost is plan-usage quota, so leave headroom for real work.

- The harness ships 10 named batches (`node scripts/run-trigger-evals.mjs --list-batches`), 2-5
  skills each (120-300 calls), covering all 29 roster skills exactly once (unit-tested partition).
- Run one batch per window from a scratch dir where pm-skills is enabled at user scope (it is
  local-disabled inside the repo, so the repo cwd will not fire skills):
  ```bash
  cd /scratch/dir   # outside the repo
  TRIGGER_EVAL_CLAUDE_ARGS="--model claude-haiku-4-5" \
    node E:/.../scripts/run-trigger-evals.mjs --batch collision-deliver \
    --report E:/.../records/trigger-eval-run-<date>-collision-deliver.md
  ```
- Recommended order (collision pairs first, since they test the audit's description collisions):
  collision-deliver, collision-define-measure, collision-okr, collision-research, collision-iterate,
  then rest-define-discover, rest-deliver, develop, rest-measure, rest-iterate-foundation.
- Cadence: ~1 batch per 5-hour window (2 if the window has headroom). Full roster completes across
  ~6-10 windows (a few days of incidental running) at no dollar cost. An API key removes the window
  limit if you want it done in one sitting (~$15-35 on Haiku once cache warms).
- Per-call economics (measured 2026-06-13, Haiku, scratch dir): ~38k input tokens/call, but caching
  makes steady-state calls mostly cache-reads at ~$0.008-0.03 each. First call in a window pays the
  cache-write; subsequent calls in the same window ride the cache.
- After each batch: paste its report summary + triage into `records/trigger-eval-baseline.md`.

### Harness bugs found + fixed by the first proof run (2026-06-13)

The proof slice (deliver-prd, 60 calls) returned a FALSE "0% trigger rate" that the verify step
caught (a hand-run of the same query fired the skill). Root causes, both fixed in `run-trigger-evals.mjs`:
1. Windows `spawnSync(..., {shell:true})` did not quote the multi-word query passed as a positional
   arg, so the prompt was split and never reached the model -> never triggered. Fixed: prompt now
   goes on STDIN (`input: query`), no positional. Post-fix: 3/3 verification probes fire.
2. `--report` with an absolute path was `join(repo, out)`-ed -> doubled path -> ENOENT crash after
   computing results. Fixed: `isAbsolute(out) ? out : join(repo, out)`.
Lesson recorded: this is exactly why Task 7 is a recorded human-run gate with a proof slice first,
not a blind full-roster batch.

## Task 8: Docs + hygiene sync (S)

- Contributor doc for fixture authoring + harness usage. Default home: `site/src/content/docs/contributing/trigger-evals.md`; that requires `scripts/route-manifest.txt` + `node scripts/gen-resource-index.mjs` regeneration in the same PR (the known staleness gate).
- `docs/internal/skill-versioning.md`: add the T-B rule (fixtures do not bump skill versions).
- CHANGELOG `[Unreleased]` entry; effort brief status flip; plan task table above kept current per landing PR.
- Validation: full local bundle + CI green; resource-index check green.

## Sequencing

1 -> 2 land together (one PR; validator red on missing fixtures is fine because advisory). 3 -> 4 may land as one or two PRs. 5 -> 6 together. 7 after 4+6. 8 rides the last build PR. Tasks 1-2 unblock nothing downstream of fixtures, so 3 can start in parallel with 5 if two agents run.
