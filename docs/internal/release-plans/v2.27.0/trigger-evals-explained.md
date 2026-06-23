# Trigger-Accuracy Evals (M-31): What This Work Is, Why It Matters, and What It Found

Status: Explainer (2026-06-13), maintained alongside the M-31 effort. Two registers below:
a plain-English version for anyone, and a technical version for engineers. The live results
section is updated as batches complete; the canonical run log is `records/trigger-eval-baseline.md`.
Candidate to adapt for the public comparison docs later (it is the "provable quality" story).

> **Engine update (2026-06-23, M-34):** the sub-agent engine this doc weighed ("a workflow of subagents - runs on the subscription, no API key") is now IMPLEMENTED. `check-new-skill-collision.mjs --emit-tasks` emits the probe tasks for the `pm-skill-router` sub-agent (Haiku default) to route key-free in a session; the Messages-API path stays for unattended CI. Spec: [`../v2.29.0/spec_sub-agent-router.md`](../v2.29.0/spec_sub-agent-router.md).

---

## CORRECTION AND CURRENT UNDERSTANDING (2026-06-13 PM) - read this first

> This section supersedes the cost, throttling, and recall claims in Parts 1 and 2 below. The
> earlier text is kept verbatim as the historical record of what we believed at the time. The
> numbers in the metrics table (e.g. deliver-edge-cases 50%) are now considered **not reliable**
> for the reason explained here.

**1. The "sustained server throttling" that paused the 2026-06-13 morning run was a misdiagnosis.**
Servers were fine (`rate_limit_event` reported `status: allowed`; calls completed in ~10s with real
cost). The real failure was `error_max_turns`: the `superpowers` plugin's `SessionStart` hook
auto-launches its `using-superpowers` skill on every headless session, which consumes the single turn
the harness allows via `--max-turns 1`, so the model errors out before it can reach the query. The
harness's `classifyRun()` does not recognize `error_max_turns`, classifies it as a transient throttle,
retries six times, and aborts as "RATE LIMITED". That cascade produced the false throttling story.

**2. The deeper problem: the headless `claude -p` eval measures the environment, not the description.**
Whether a skill fires in headless mode is dominated by confounds that have nothing to do with the skill:
- **The superpowers nudge.** With `superpowers` enabled, its "you MUST invoke a relevant skill" rule
  drives firing. With it disabled, the thinking-enabled model (global `effortLevel: xhigh`) just answers
  in prose and the skill fires ~0%. Directly observed: `deliver-prd` on "Write a PRD..." fired 0/3 with
  superpowers off (model wrote clarifying questions instead), and fired reliably with superpowers on +
  `--max-turns 6`.
- **Turn budget.** superpowers-on + `--max-turns 1` always errors (the nudge eats the turn). It needs
  `>= ~6` turns for the nudge-launch and the skill fire to both fit.
- **Reproducibility failure.** The exact query that scored 88% on the morning run scored 0% the same
  afternoon. Same skill, same words, different environment. The recorded baseline (Runs 1-5) reflects an
  environment that no longer reproduces, so its absolute numbers cannot be trusted or compared against.

**3. What is still valid and not thrown away.**
- The **fixtures** (29 files, 580 labeled queries) are the expensive, reusable asset. They feed any
  measurement method unchanged.
- **B1 (the `deliver-edge-cases` description fix, committed `01716da0`)** is harmless and an honest
  readability improvement, though see point 6: its *premise* is now in question.
- The **collision / precision** read ("skills do not poach each other") is more robust than the recall
  numbers, because the nudge inflates firing generally, so "did not false-fire" survives the confound
  better than "did fire".

**4. The cost reality (the numbers).**
- Headless `claude -p`: ~38,000 tokens per call (it boots the whole Claude Code engine + every installed
  plugin), ~13s/call. The one partial Sonnet run cost ~$30 via API key. This is the expensive,
  confounded path.
- Controlled router call (see point 5): ~2,000 tokens per call (catalog of descriptions + one query),
  and the catalog **prompt-caches**, so steady-state calls are mostly cache-reads. Full roster
  (29 x 20 x 3 = 1,740 calls) is **under $1 on Haiku**, ~$1-2 on Sonnet, repeatable. A $10 API budget is
  roughly 10x headroom for the whole roster on both models several times over. The earlier "$5" estimate
  missed by 6x because it priced the controlled method but the run used the 19x-heavier headless method.

**5. The right instrument: a controlled router eval.** Instead of launching a whole agent per query,
ask one controlled question: show the model a catalog of skill descriptions and one user request, and
ask "which single skill best fits, or none?". No plugins, no nudge, no turn budget, no thinking-budget
noise - it isolates the one variable that matters, the description text. Three ways to run it:
- **Raw Messages API** - cheapest, fastest, deterministic, CI-able. Needs a funded API key (the
  subscription cannot make raw API calls). This is the long-term per-release regression gate.
- **`claude -p --bare`** - `--bare` skips hooks and plugins; runs on the subscription, no key, but slow
  (~13s/call) and bound by the 5-hour window.
- **A workflow of subagents** - runs on the subscription (no API key), parallelized, fast. Each subagent
  is a clean Claude given only the catalog + query.

  **Correction to Part 2's claim that this "needs an API key":** only the *CI-automation* convenience
  needs a key. Getting the answer (does this description route correctly, did B1 help) is fully doable on
  a Pro/Max subscription via subagents or `--bare`.

**6. First controlled run (workflow `b1-router-eval`, 2026-06-13 PM, subscription, 126 subagents, 34s).**
- **Calibration: 6/6.** The router correctly routed "Write a PRD" -> deliver-prd, "everything that can go
  wrong... recovery path" -> deliver-edge-cases, GWT -> deliver-acceptance-criteria, competitive analysis
  -> discover-competitive-analysis, and both junk queries -> none. **The instrument is validated.**
- **B1 before/after: INVALID this run.** Firing 126 subagents in a 34s burst tripped *genuine*
  server-side rate limiting ("Server is temporarily limiting requests"). ~96 calls failed and returned
  null (scored as `none`). The reported `newRecall = 0%` is a throttle artifact, **not** a regression:
  almost the entire NEW arm failed to execute. Do not read it as "B1 made triggering worse."
- **Operational lesson:** bursting subagents on a subscription trips server rate-limiting. The clean run
  needs throttle control (low concurrency + backoff or request spacing), not raw fan-out.
- **A hint, not a conclusion:** of the 7 OLD-arm queries that ran before the throttle hit, all 7 routed
  correctly to deliver-edge-cases (including intent-only phrasings like "map the failure surface"). This
  faintly suggests the original "under-triggering" gap may itself have been a headless artifact - the old
  description routes fine in a clean test. Not concluded on 7 contaminated points; needs a
  throttle-controlled re-run to settle. If confirmed, B1 fixed a non-problem (harmlessly).

**6b. RESOLVED (2026-06-13 PM) - clean cross-model B1 answer via the Messages API.** The controlled
router eval was run via the Anthropic Messages API (an API key, not the subscription, so no burst-throttle)
on both models: 126 calls each, 0 fails, $0.15 (Haiku) + $0.44 (Sonnet). Calibration 6/6 on both.
B1 before/after on deliver-edge-cases:
- **Haiku: recall 80% -> 90%, precision 10/10.** The lift is one query ("race conditions and timeout
  scenarios"): OLD misrouted it to develop-spike-summary, NEW routes it correctly.
- **Sonnet: recall 100% -> 100%, precision 10/10.** The OLD description already routed every query
  correctly; B1 is a no-op on the representative model.
- **Verdict:** B1 is harmless and a small Haiku-only win; the "one confirmed real recall gap" claim is
  **retracted** - the clean OLD-description numbers are 80% Haiku / 100% Sonnet, so the headless 50%/63%
  overstated the gap (environment artifact). Keep B1 (harmless + slight strict-model gain + readability).
- This also confirms the cost model: $0.59 for the full cross-model B1 answer vs ~$30 for the earlier
  confounded headless partial. The instrument is proven; the next step is a full-roster re-baseline on it.

**7. What is next (revised).**
- Re-run the controlled router eval with throttle control (concurrency ~2-3 + backoff, or `--bare`
  sequential) to get a clean B1 before/after and re-baseline the roster on a sound instrument.
- Fix the harness bug: `classifyRun()` should treat `error_max_turns` as a hard, clearly-labeled failure
  ("a SessionStart skill likely consumed the turn; raise --max-turns or disable interfering plugins"),
  not a retryable throttle.
- Decide the long-term engine: subscription workflow (no key, throttle-limited) vs funded API key (cheap,
  fast, CI-able). The fixtures are ready for either.

---

## Part 1: In plain terms (no engineering needed)

**One sentence:** we are measuring, with real data, whether each PM skill actually *activates* when
a user needs it - because a skill that never fires is invisible dead weight, no matter how good it is.

**What "triggering" means.** A skill is a set of instructions that helps an AI produce a specific
artifact well (a PRD, a hypothesis, an OKR review). But the skill only helps if the AI *chooses to
use it*. When a user types *"help me get engineering aligned on what we're building,"* the AI decides,
on its own, from nothing but the skill's one-line description, whether to invoke `deliver-prd` or just
wing a generic answer. If the description is too narrow, the skill stays silent and the user gets a
mediocre freehand reply instead of the disciplined PRD the skill would have produced. The skill is in
the catalog, but nobody benefits from it.

**What the eval does.** For each skill we wrote ~20 realistic user queries, each labeled "this should
make the skill fire" or "this should NOT make it fire." We then send each query to a real AI and watch
whether the right skill activates. Run enough of them and you get a score: how reliably does this skill
fire when it should, and stay quiet when it should not?

**The two problems it catches:**
1. **Collisions** - two skills fighting over the same query (e.g. "acceptance criteria" vs "edge cases").
   The user's June audit found these by hand; the eval catches them automatically and repeatably.
2. **Under-triggering** - a skill too narrow to fire on phrasings of its own job that do not use its
   keyword.

**What we have found so far (8 of 29 skills, the highest-priority ones):**
- **The audit's fixes worked.** Every collision pair tested came back clean: skills are not poaching
  each other's queries. The description rewrites shipped in v2.26.0 actually solved the collisions,
  proven by data rather than by re-reading.
- **One clear, fixable gap.** Nearly every skill fires on keyword-explicit queries but misses the same
  intent phrased without the keyword: `deliver-edge-cases` misses *"what can go wrong / failure modes,"*
  `define-hypothesis` misses *"we believe that X / a testable prediction,"* `measure-okr-grader` misses
  *"do a cycle review / an honest scoring pass."* That is not eight random bugs - it is one cross-cutting
  improvement: add intent-synonyms to the "When to Use" sections so skills fire more often for real users.

**Why it matters.** It turns "are our skills good?" into two specific, actionable answers - "collisions
are fixed (proven)" and "here is the one editing pass that makes the whole library more useful." Both
were invisible before, neither is measurable by reading, and no competing PM skill library publishes
anything like it. That is the "provable quality" differentiator as an actual work product.

---

## Part 2: For engineers (the detail)

### The standard it implements

Anthropic codified trigger evaluation on agentskills.io (the Optimizing Descriptions guide). The
method, which M-31 follows:
- ~20 labeled queries per skill: 8-10 should-trigger, 8-10 should-not, with **near-miss negatives**
  (queries adjacent to a sibling skill) called out as the highest-value cases - they catch collisions.
- Each query run **3 times** (triggering is stochastic); a query "triggers" if the skill fires in >=
  the threshold fraction of runs (0.5).
- Queries split **60/40 into train/validation**; the **validation pass rate is the headline** metric
  (train is for tuning, validation guards against overfitting a description to its own test set).

### Fixture format

One file per skill: `skills/<name>/evals/trigger-fixtures.json` (29 files = the F-12 cohort of 26 +
3 collision partners). Each query carries `q`, `expect` (trigger | no-trigger), `split`
(train | validation), and optional `near_miss_of` (the sibling skill a no-trigger query belongs to).
A deterministic validator (`scripts/check-trigger-fixtures.mjs`) enforces composition (>=16 queries,
8 per class, the 60/40 split, >=2 partner near-misses for collision-pair skills, roster completeness)
and runs enforcing in CI (promoted advisory -> enforcing 2026-06-14, B-4, once the 29-file corpus
stabilized). Adding fixtures does not bump skill versions (tooling, not behavior).

### Harness architecture (`scripts/run-trigger-evals.mjs`)

- Per query, spawns a headless `claude -p <query> --output-format stream-json --max-turns 1`
  (prompt on **stdin** - a Windows shell-quoting bug otherwise split multi-word prompts and produced
  false 0% rates). Detects whether the **Skill tool** fired for the target skill by walking the
  transcript for a `tool_use` named `Skill` whose input references the skill.
- **10 named batches** (`--batch`, `--list-batches`) partition the 29-skill roster (unit-tested) so a
  Pro/Max subscription can run one batch per 5-hour rolling window, collision pairs first.
- **Rate-limit abort:** a `rate_limit_event` with a non-allowed status aborts the run and saves partial
  results, so a window cap never records rate-limited calls as false trigger-failures.
- **Per-skill timing** in the log (call rate visibility); `--probe <skill>` does a single call and prints
  real per-call token usage for cost projection; `--collision` adds a cross-skill false-fire sweep.
- Detection/aggregation/report are pure functions, unit-tested on canned transcripts (no API in CI).
  The cost-gated `workflow_dispatch` CI lane (`.github/workflows/trigger-evals.yml`) runs it with an
  `ANTHROPIC_API_KEY` secret; the recorded baseline is the evidence gate, never an enforcing CI check.

### The model question (important nuance)

Two distinct models: the *orchestrator* (the human-driving session) is irrelevant to results; the
*test-call* model (what `claude -p` runs) determines representativeness. We baseline on **Haiku 4.5**
as the strict grader (Anthropic's guidance: Haiku needs the most help to trigger, so passing on Haiku
implies passing on bigger models - maximum coverage). For a baseline reflecting real users on
Sonnet/Opus, the **collision results are model-robust** (more capable models disambiguate better, so
clean-on-Haiku is clean-on-Sonnet) but **recall findings are model-sensitive** (a Haiku miss may be a
non-issue for Sonnet users). Practice: collisions on Haiku; confirm only the under-triggering skills on
`claude-sonnet-4-6` before recommending any description edit.

### Cost and performance reality

- `claude -p` costs ~13s/call - dominated by **process startup** (booting the full Claude Code engine +
  all installed plugins/MCP + ~38k-token context), not inference or rate limits. `--strict-mcp-config`
  gave no speedup; the floor is the CLI boot.
- On a subscription this draws the 5-hour rolling usage window (we observed a transient throttle to
  ~40s/call that later cleared). Full 29-skill roster = ~5 hours of subscription grind.
- A direct **Messages API** harness (cached skill catalog injected via `skills-ref to-prompt`, one small
  call per query) would run the full roster in minutes for ~$5 with prompt caching, and is the right
  CI-able engine long-term - but needs an API key (the subscription cannot make raw API calls). Not
  required to get the baseline; it is the future efficiency play for a per-release regression gate.

### What the first proof run caught (verify-before-asserting)

The initial deliver-prd slice reported a FALSE "0% trigger rate." Investigation (a hand-run of the same
query fired the skill) found two harness bugs, both fixed: (1) the Windows positional-arg prompt split;
(2) `--report` doubling an absolute path and crashing after computing results. A later apparent
"throttle" turned out to be a transient soft-throttle, not a process leak (50 node procs is the dev
box's baseline, not eval leakage; only 1 orphan found). Lesson recorded: this tier is a recorded,
human-paced gate with proof-slice-first, not a blind full-roster batch.

### Metrics so far (validation pass = headline; see `records/trigger-eval-baseline.md` for detail)

| Skill | Val pass | Note |
|---|---|---|
| deliver-prd | 88% | solid; misses "spec/requirements doc" phrasings |
| deliver-acceptance-criteria | 88% | solid |
| deliver-user-stories | 75% | misses story-splitting phrasings |
| deliver-edge-cases | 50% | recall gap: "failure modes / what can go wrong" |
| define-hypothesis | 63% | recall gap: "we believe that / testable prediction" |
| measure-experiment-design | 100% | perfect |
| foundation-okr-writer | 75% | misses draft-critique (Audit-Only) phrasings |
| measure-okr-grader | 63% | recall gap: "cycle review / scoring pass" |

Collision verdict across all 4 pairs tested so far: **CLEAN** (zero partner false-fires).

### Durable deliverables (the reusable assets, already committed)

- The harness, the fixture format + validator, the 29 fixture files, the 10 named batches, the
  advisory CI fixture gate, the cost-gated dispatch lane, and the recorded baseline log.
- These are what last; running every skill is incremental and can pace across windows or move to the
  API engine.

### What it unlocks

1. The provable-quality public claim (the comparison docs' centerpiece; no competitor ships evals).
2. Evidence-driven description fixes - patch the exact phrasings that miss, not guesses.
3. A regression gate - re-run per release; a description edit that drops a trigger rate is caught
   before shipping.
4. The foundation for output-evals (the bigger prize: "does the skill produce good output," same
   harness pattern, the `evals/evals.json` lane).
5. Conformance to Anthropic's published eval standard - first PM library to meet it.

---

## What is next

- Finish the remaining 2 collision pairs (research, iterate) to complete the audit's full answer.
- Targeted Sonnet re-run of only the under-triggering skills, to confirm which misses real users hit.
- If the recall pattern holds on Sonnet: a bounded F-12-mechanism description pass adding intent-synonyms
  to the affected skills' "When to Use" sections (per-skill patch bumps + HISTORY).
- Optional later: the direct-API harness for a fast, cheap, repeatable per-release gate.
