# Trigger-Accuracy Evals (M-31): What This Work Is, Why It Matters, and What It Found

Status: Explainer (2026-06-13), maintained alongside the M-31 effort. Two registers below:
a plain-English version for anyone, and a technical version for engineers. The live results
section is updated as batches complete; the canonical run log is `records/trigger-eval-baseline.md`.
Candidate to adapt for the public comparison docs later (it is the "provable quality" story).

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
and runs advisory in CI. Adding fixtures does not bump skill versions (tooling, not behavior).

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
