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

### Run 2 - 2026-06-13 (batch: collision-deliver, 180 calls)

- Model: claude-haiku-4-5 | scratch dir; subscription; completed clean (no rate-limit abort)
- Results (validation = headline):
  - deliver-acceptance-criteria: 92% train / **88%** val (2 borderline misses)
  - deliver-edge-cases: 67% train / **50%** val (8 misses) <- WEAK, real finding
  - deliver-user-stories: 92% train / **75%** val (3 misses)
- **Collision verdict: CLEAN.** Every failure is an "expected trigger, fired 0-1x" miss; ZERO
  "expected no-trigger" false-fires. None of the three skills fired on a partner's near-miss
  queries, so the audit's deliver-cohort collisions (user-stories/acceptance-criteria/edge-cases)
  are NOT recurring - the v2.26.0 (F-12) description rewrites separated them successfully.
- The real problem is the opposite of collision - UNDER-triggering on non-keyword phrasings:
  - **deliver-edge-cases** misses "what can go wrong / failure surface / failure modes / boundary
    & limit scenarios / race conditions / enumerate failures" when the words "edge case" are absent.
    Its description leads with "edge cases, error states, boundary conditions"; Haiku is not bridging
    the common synonyms. Strong candidate for a `When to Use` synonym expansion (F-12 mechanism).
  - **deliver-user-stories** misses story-SPLITTING phrasings ("slice into shippable increments /
    break into ticket-sized pieces / split into estimable work items"). Milder; same class.
  - acceptance-criteria solid.
- Triage: DEFER edits until the full collision set is in, then batch the description tweaks. Confirm
  on the user-default model first (Haiku is the strict grader). Nothing blocks; this is recall tuning.
- Report artifact: `trigger-eval-run-20260613-collision-deliver.md`

### Run 3 - 2026-06-13 (batch: collision-define-measure, 120 calls)

- Model: claude-haiku-4-5 | scratch dir; subscription; completed clean. Timing: 13.2 + 12.9 s/call
  (the ~40s/call seen mid-session was a transient throttle that cleared; ~13s/call is the steady rate,
  dominated by per-call `claude -p` cold-start loading the full plugin/MCP environment).
- Results (validation = headline):
  - define-hypothesis: 92% train / **63%** val (4 misses) <- recall finding
  - measure-experiment-design: 100% / **100%** (0 misses) <- perfect
- **Collision verdict: CLEAN again.** All failures are "expected trigger, fired 0-1x" misses; ZERO
  false-fires on the partner's near-misses. The define-hypothesis <> measure-experiment-design
  collision the audit flagged is NOT recurring; experiment-design is flawless and hypothesis does not
  bleed into it.
- define-hypothesis UNDER-triggers on hypothesis-intent phrasing without the word "hypothesis":
  "We believe that X for Y will Z" (the literal hypothesis format!), "turn this into a testable
  prediction with a numeric target", "what we expect this change to do before anyone designs a test",
  "articulate what success looks like to validate the direction". Same class as deliver-edge-cases:
  a `When to Use` synonym expansion candidate (F-12 mechanism), confirm on user-default model first.
- Report artifact: `trigger-eval-run-20260613-collision-define-measure.md`

### Run 4 - 2026-06-13 (batch: collision-okr, 120 calls) - the audit's WATCH pair

- Model: claude-haiku-4-5 | scratch dir; subscription; clean. Timing: 13.8 + 13.3 s/call.
- Results: foundation-okr-writer 92% train / **75%** val (3 misses); measure-okr-grader 83% / **63%** (5 misses).
- **Collision verdict: CLEAN.** No "expected no-trigger" false-fires; the draft-write vs cycle-grade
  boundary (audit watch-item D6) holds - neither poaches the other on the recorded queries.
- Same UNDER-triggering pattern, now on both OKR skills:
  - okr-writer misses its Audit-Only/draft-review intent: "review these draft OKRs", "critique this
    OKR draft: are objectives inspiring and KRs measurable?" (the writer owns draft critique).
  - okr-grader misses cycle-close intent without "grade/score": "produce the cycle review with
    learning synthesis", "honest scoring pass", "turn KR actuals into a review", "evaluate the
    completed OKR set". 63% is the weakest grader recall so far.
- One boundary worth a future `--collision` sweep: okr-writer's "critique this OKR draft / are KRs
  measurable" could be where writer-vs-grader blurs; no false-fire recorded, but it's the spot to watch.
- Report: `trigger-eval-run-20260613-collision-okr.md`

### Run 5 - 2026-06-13 (Sonnet 4.6, API key, concurrency 4) - PARTIAL: key ran out of credit mid-run

- Setup: representative baseline on `claude-sonnet-4-6` via API key (off subscription, no throttle),
  harness concurrency 4. The key's **credit balance ran out partway through** ("Credit balance is
  too low", HTTP 400). The harness (pre-fix) recorded the post-exhaustion calls as 50% / 10-miss
  artifacts; those 16 skills are INVALID and discarded. Harness now aborts on API error (fixed,
  committed) so this cannot recur. Report `trigger-eval-sonnet-full-20260613.md` annotated as partial.
- **VALID Sonnet results (the 13 skills that ran before exhaustion):**
  - define-hypothesis: **100% / 100%** (Haiku was 92/63) <- the Haiku recall "gap" was a HAIKU ARTIFACT
  - define-jtbd-canvas 100/100; define-opportunity-tree 92/100; define-problem-statement 100/100
  - deliver-acceptance-criteria 100/88; deliver-launch-checklist 100/100; develop-adr 100/100
  - deliver-release-notes 92/88; deliver-user-stories 92/88 (Haiku 75, improved on Sonnet)
  - develop-design-rationale 83/100; develop-solution-brief 83/100 (near the credit boundary; trust loosely)
  - **deliver-edge-cases: 92% / 63%** (Haiku 50) <- recall gap PERSISTS on Sonnet = a REAL gap
  - **deliver-prd: 75% / 88%** <- "spec / requirements doc" misses persist on Sonnet = REAL, milder
- **Key cross-model conclusions (the whole point of running Sonnet):**
  1. `define-hypothesis` Haiku 63 -> Sonnet 100: a Haiku-strictness artifact, NOT a real-user problem.
     Validates the "escalate before editing" rule - we would have wrongly edited it off Haiku alone.
  2. `deliver-edge-cases` is the one CONFIRMED real recall gap (low on both models): the "failure
     modes / what can go wrong / race conditions / boundary & limit" misses are real for Sonnet users.
     This is the strongest candidate for a `When to Use` synonym expansion (F-12 mechanism).
  3. Most define/deliver/develop skills sit 88-100% on Sonnet = excellent triggering for real users.
- INVALID (credit-exhausted, re-run needed): develop-spike-summary, all discover-*, foundation-*,
  iterate-*, and all measure-* (16 skills). These need a re-run once the key has credit, or on the
  subscription (Haiku, then escalate any low scorers to Sonnet).
- Report artifact: `trigger-eval-sonnet-full-20260613.md` (partial; 50% rows are credit-failure, not real).

### STATUS 2026-06-13: paused - sustained server-side throttling

- After the credit-exhausted Sonnet run, a subscription (Haiku) re-run of collision-research hit
  SUSTAINED transient server throttling ("Server is temporarily limiting requests, not your usage
  limit"). The hardened harness retried 6x (2s->30s backoff) and still got throttled every call, then
  aborted cleanly with zero fabricated data. This is an Anthropic-server load condition, not our quota
  and not fixable from our side; it clears on its own timeline.
- DECISION: stop here. The remaining ~13 skills (develop-spike-summary, all discover-*, foundation-
  meeting-recap/persona, all iterate-*, all measure-* except those with Haiku data) are deferred.
- RESUME (any calmer window, no code changes needed): from a scratch dir with the plugin enabled,
  subscription auth (no ANTHROPIC_API_KEY), one batch per fresh 5-hour window:
  `TRIGGER_EVAL_CLAUDE_ARGS="--model claude-haiku-4-5" node scripts/run-trigger-evals.mjs --batch collision-research --report <records-path>`
  then collision-iterate, rest-define-discover (discover-* only), rest-measure, rest-iterate-foundation,
  and develop (spike-summary). The harness now rides transient throttles and aborts only on a hard stop.
- The CORE RESULT is already in hand and does not need these: 4/6 collision pairs clean, 21 skills
  measured, the one real recall gap (deliver-edge-cases) confirmed on Sonnet, the define-hypothesis
  false-alarm caught. See Runs 1-5 above and `trigger-evals-explained.md`.

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
