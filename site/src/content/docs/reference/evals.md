---
title: How pm-skills Is Evaluated
description: The three eval lanes (trigger, router, output), what each measures, the honest confound lesson behind why the controlled router eval is the trustworthy instrument, and where results live.
---

pm-skills measures itself on two different questions, across three lanes. This page names the method, is explicit about what each lane's numbers can and cannot be trusted for, and says where results actually live.

## The two questions

1. **Does the right skill fire when a user needs it?** A skill nobody ever invokes is invisible dead weight, no matter how good its output would be. This is what **trigger evals** and **router evals** measure.
2. **Is the artifact good once the skill fires?** Firing correctly is necessary but not sufficient; the produced document still has to be better than a competent PM would write freehand. This is what **output evals** measure.

## Lane 1: trigger fixtures - deterministic structure, every CI run

Every skill can carry `skills/<name>/evals/trigger-fixtures.json`: a labeled set of queries (should-trigger and should-not-trigger, a 60/40 split) plus at least two near-miss negatives against a declared partner skill (a query that sounds similar but belongs to a neighboring skill). `scripts/check-trigger-fixtures.mjs` enforces the fixture's *shape* - the split ratio, the minimum query count, the near-miss requirement - on every normal CI run. This check is deterministic and fast; it says nothing about whether the skill actually fires correctly, only that the fixture set claiming to test it is well-formed.

## Lane 2: router evals - the trustworthy instrument

The router eval (`scripts/run-router-evals.mjs`) asks one controlled question per fixture query: given the full catalog of skill descriptions and a single user request, which skill (if any) best fits? No plugin environment, no session nudges, no turn budget, no thinking-effort noise - it isolates the one variable that matters, the description text itself. It runs against the real Messages API (or, key-free, via the `pm-skill-router` sub-agent), diffs the result against a **committed baseline**, and **fails on any recall or precision regression** - this is the enforcing drift gate that protects skill descriptions from silently going stale as the catalog grows.

This is the lane whose absolute numbers are worth trusting, and the reason is discipline, not luck: it removed every confound a whole-agent test carries.

## Lane 3: output evals - LLM-judged, cost-gated, advisory

The output-eval harness (`scripts/output-eval.workflow.mjs`, method in `spec_output-quality-evals.md`) asks a different question: when a skill *does* fire, is its artifact actually better than a competent PM's quick freehand attempt? For a scenario, it generates the skill arm (the skill's real instructions + template, run more than once to average generation noise) and a thin freehand control, then has several blind judges score both against a family-specific rubric (verbatim, full text, order alternated to de-bias position). A skill "passes" only when it clears an absolute quality bar *and* no criterion floors *and* the panel's judgment is internally consistent - a low discrimination gap against a weak control never launders a genuinely mediocre skill into a pass. This lane is LLM-judged, therefore metered, therefore never part of the enforcing pre-tag bundle: it runs on `workflow_dispatch` and a monthly cron (`.github/workflows/output-eval.yml`), dry-run by default, with a key-gated live leg that runs exactly one roster skill per invocation.

## The confound lesson (read this before trusting any absolute number)

An earlier version of the trigger-eval harness ran headless `claude -p` sessions and reported per-skill firing rates. Those numbers turned out to be **measuring the environment, not the skill description**: whether the companion **superpowers** plugin's own `SessionStart` nudge fired, the thinking-effort and turn budget it left behind, and a run hitting the turn limit and returning `error_max_turns` (misread at the time as server-side throttling) all moved the observed rate more than the description text did. The same exact query scored 88% one run and 0% the same afternoon, with nothing about the skill changed in between.

The fix was not a better headless harness; it was a different instrument. The controlled router eval (Lane 2) asks the one question that isolates the description text and removes the rest: no plugin, no nudge, no turn budget. It is also far cheaper (roughly 2,000 tokens per call, and the catalog prompt-caches, versus roughly 38,000 tokens for a full headless session), which is what makes a committed baseline and a per-release regression diff affordable at all.

**The practical rule this page exists to state plainly:** trust the router eval's committed-baseline diff as the drift gate. Read the legacy headless trigger-eval numbers, if you find them in an older record, as an environment-confounded integration check only, never as an absolute measurement of a skill's trigger quality. Output-eval numbers are real per-run judged scores, not confounded in the same way, but they are LLM-judged and cost-gated, so treat any single run as a data point, not a certified score.

## Where results live

- **Trigger-fixture structure** - enforced on every normal CI run; a failing fixture blocks the PR that broke it.
- **Router-eval drift gate** - runs on dispatch and reads a committed baseline (Haiku-pinned) under `docs/internal/release-plans/v2.27.0/records/`; it is the one lane with a standing, diffable number.
- **Output-eval runs** - uploaded as CI artifacts from `.github/workflows/output-eval.yml`, not published as a standing dashboard. Family rubrics (the anchor scale and per-criterion definitions each skill family is judged against) stay in `docs/internal/eval-rubrics/` - internal so they cannot be reverse-engineered into a scoring shortcut, exactly the same reason a school does not publish the answer key alongside the test.
- **The legacy headless trigger-eval harness** still runs as an integration check in `.github/workflows/trigger-evals.yml`; its report is a CI artifact, read as a smoke check on the pipeline itself, not a quality number.

## Current numbers

Populated as of each release from what is actually checked into the repo at tag time - never a fabricated or aspirational figure. If a count below looks stale, the repo itself is the source of truth; these lines are a snapshot, not a live query.

| Measure | As of v2.31.0 |
|---|---|
| Skills with a trigger-fixture set | 43 of 68 (about 63%) |
| Skills with output-eval scenario assets | 12 of 68 |
| Output-eval family rubrics defined | 7 (`docs/internal/eval-rubrics/`) |
| Router-eval committed baseline | Haiku-pinned, calibration 6/6 on the instrument's own sanity queries |
| Trigger-fixture structural validity | enforcing in CI (`check-trigger-fixtures.mjs`) |
| Output-eval asset presence | advisory in CI (`check-output-eval-assets.mjs`), promotes to enforcing once the roster is pinned |

No aggregate pass/fail score is published here: output-eval verdicts are per-skill, per-run, and read from CI artifacts or the maintainer's own records, not rolled into a single headline number a reader could mistake for a certified benchmark result.

## See also

- [Sub-Agent + Dispatch Skill Compatibility Matrix](sub-agent-compatibility.md) - the `pm-skill-router` sub-agent that runs the key-free path for the router eval and the new-skill collision gate.
- [Provenance and Trust](provenance.md) - what ships, what runs at install, and how a release is verified.
