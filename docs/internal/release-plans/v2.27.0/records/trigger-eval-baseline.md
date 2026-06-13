# Trigger-Eval Baseline Record (M-31, issue #200)

Status: TEMPLATE / awaiting first run. This file IS the evidence gate for the trigger-accuracy
evals per spec_trigger-accuracy-evals.md section 5 and AC 31-6. The recorded run, not the CI
lane, is the gate (LLM-judged lanes are never enforcing). Fill in the run blocks below; one block
per run (probe, then batches). Do not delete prior runs; append.

How to produce a run:
- Probe (1 call, verifies transcript shape + gives a real per-call token count):
  `node scripts/run-trigger-evals.mjs --probe deliver-prd`
  Run it from a scratch dir where the pm-skills plugin is installed at user scope and DISCOVERABLE
  (the plugin is local-disabled inside the repo; see the agentic-smoke-runbook for the install
  pattern). Read the USAGE line, multiply by 1740 (full roster) or ~600 (collision batch).
- Model selection: set `TRIGGER_EVAL_CLAUDE_ARGS="--model claude-haiku-4-5"` for the conservative
  baseline. Haiku is the hardest grader to trigger; passing on Haiku implies passing on Sonnet/Opus.
- Named batches (run ONE per 5-hour window on a subscription; `--list-batches` to see all 10):
  `node scripts/run-trigger-evals.mjs --batch collision-deliver --report docs/internal/release-plans/v2.27.0/records/trigger-eval-run-YYYYMMDD-collision-deliver.md`
  Order: collision-deliver, collision-define-measure, collision-okr, collision-research,
  collision-iterate, rest-define-discover, rest-deliver, develop, rest-measure, rest-iterate-foundation.
- Subscription vs API key: the 10 named batches exist so a Pro/Max subscription works without an API
  key - one batch per 5-hour rolling window, collision pairs first. No dollar cost, only plan quota;
  leave headroom for real work. An API key removes the window limit (~$15-35 full roster on Haiku
  once cache warms) if you want it in one sitting. The probe is fine on either.
- Run from a scratch dir OUTSIDE the repo (the plugin is local-disabled in the repo cwd, so skills
  will not fire there; user-scope pm-skills@pm-skills-marketplace v2.26.0 is enabled everywhere else).
- HARNESS NOTE (2026-06-13): the prompt is sent on stdin and `--report` honors absolute paths after
  two bugs were found+fixed on the first proof run (see the implementation plan, Task 7). A pre-fix
  run that reports ~0% trigger is a harness artifact, not a real result - re-run post-fix.

Triage rule (decision T-F): a failing query is resolved one of two ways and logged in the run block:
1. Real description problem -> queue an F-12-mechanism description fix (separate PR, per-skill patch
   bump + HISTORY.md). Escalate Haiku-only failures to the user-default model first to confirm it is
   a real problem and not a Haiku-strictness artifact.
2. Unfair fixture -> correct the fixture with a one-line rationale here.

---

## Run log

### Run 1 - 2026-06-13 (harness validation + first real slice)

- Model: claude-haiku-4-5 (subprocess) | Harness host: local, scratch dir E:/tmp/trigger-eval-scratch
- Scope: deliver-prd only (20 queries x 3 = 60 calls); proves the corrected end-to-end pipeline
- Auth: Pro/Max subscription (no API key); rate_limit_event showed five_hour window "allowed" throughout
- Per-call usage (probe): ~38k input tokens; steady-state mostly cache-read at ~$0.008-0.03/call
- Result: **train pass 83%, validation pass 88%** (headline = validation 88%)
- Failures (all 3 are "spec / requirements doc" phrasings WITHOUT the keyword "PRD"):
  - [train] fired 1x: "Help me spec out the requirements for our Q3 epic so design, backend, and mobile are all working from the same source"
  - [train] fired 1x: "Stakeholders want to approve scope before we invest two quarters; draft the spec doc they can sign off on"
  - [validation] fired 0x: "We're kicking off the offline mode initiative; create the spec that covers requirements, out-of-scope items, dependencies, and risks"
- Triage: DEFERRED pending the full collision-batch context. Reading: deliver-prd fires reliably on
  explicit "PRD" intent; the 3 misses are "spec"/"requirements doc" phrasings where Haiku is less
  confident (1x/0x fires = at/below the 0.5 threshold). Candidate actions, decide after more skills run:
  (a) escalate these 3 to the user-default model (Sonnet/Opus) to confirm real-vs-Haiku-strictness
  before any change; (b) if real, a small `When to Use` tweak adding "spec / requirements doc"
  synonyms via the F-12 mechanism (per-skill patch bump). NOT a blocker; 88% validation is a pass.
- IMPORTANT: a FIRST proof run before the harness fix reported deliver-prd at "0% trigger" - that was
  a harness bug (prompt not reaching the model), now fixed. This Run 1 is the valid one.
- Report artifact: `trigger-eval-run-20260613-deliver-prd.md` (this directory)

### (remaining 28 skills: run as named batches, collision pairs first)

<!-- Copy this block per run:

### Run N - YYYY-MM-DD

- Model: claude-haiku-4-5 (subprocess) | Harness host: <local | CI workflow_dispatch>
- Scope: <probe deliver-prd | collision batch (9 skills) | full roster (29 skills)>
- Per-call usage (from probe): input ~NNNNN tokens, output ~NNN tokens, est full-roster ~NN.NM tokens
- Auth: <API key | Pro/Max subscription>; est cost: $NN (or "subscription quota")
- Result: train pass NN%, validation pass NN% (headline = validation)
- Failures (skill [split] expected X, fired Yx: "query"):
  - ...
- Triage:
  - <skill>: <description-fix queued PR #NN | fixture corrected, rationale | Haiku-only artifact, deferred>
- Report artifact: docs/internal/release-plans/v2.27.0/records/trigger-eval-run-YYYYMMDD.md

-->
