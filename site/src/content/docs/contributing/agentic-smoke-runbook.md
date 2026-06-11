---
title: Agentic Smoke-Test Runbook
description: Repeatable procedure for running installed-plugin smoke tests agentically via the headless Claude Code CLI. Covers the orchestrator native-path smoke (the v2.26.0 P-G evidence gate), the pass/fail rubric, where results are recorded, and how to adapt the procedure to other runtime components.
---

This runbook makes installed-plugin smoke tests repeatable by an agent (or a maintainer) without an interactive session. It was first executed for the v2.26.0 release evidence gate (decision P-G: the orchestrator native-path smoke had to run and be recorded before the tag) and is written so future runtime-component changes can reuse the same procedure.

## Why a runbook and not CI

This is a deliberate choice, revisit it only with eyes open:

- **Smoke tests here exercise an LLM end to end.** A live run generates real artifacts with a real model: it costs tokens per run, needs an API credential in the environment, and its output is non-deterministic prose judged against a structural rubric, not an exact string. That is the opposite profile of the repo's enforcing CI tier (deterministic, free, fail-loud).
- **The gate is per-release, not per-PR.** The evidence gate fires when a runtime component's delegation surface changes (engine edits, new front doors, new hooks), which is a handful of times per year. Running an LLM smoke on every push would burn money to re-verify platform mechanics that did not change.
- **The repo already has a home for each tier.** Deterministic invariants run enforcing in CI; sample-quality heuristics run advisory (the M-30 tier); live-model behavior runs as a RECORDED runbook gate. A future advisory `workflow_dispatch` CI lane that wraps this runbook (manual trigger, `ANTHROPIC_API_KEY` secret, LLM-judged) is a reasonable v2.27.0 candidate alongside the deferred trigger-accuracy eval harness, but it automates this procedure rather than replacing it.

The contract that makes a runbook gate trustworthy is the **recording rule**: a smoke run that is not written down did not happen. Pass or fail both ship; only an unrun test blocks a tag that depends on it.

## Prerequisites

- Claude Code CLI v2.x on PATH (`claude --version`) with non-interactive plugin support (`claude plugin --help` shows `install` and `marketplace`).
- Authenticated Claude Code (the headless runs bill the configured account).
- A scratch directory OUTSIDE any repo workspace (workspace skill discovery would shadow the installed plugin and invalidate the test).

## Procedure (orchestrator native path; adapt per component)

### 1. Install the plugin build under test

```bash
# self-hosted marketplace tracks the repo's main branch
claude plugin marketplace add product-on-purpose/pm-skills
claude plugin install pm-skills@pm-skills-marketplace
claude plugin list   # confirm: enabled, expected version
```

To re-test after new commits land on main: `claude plugin marketplace update pm-skills-marketplace`, then reinstall. To pin a tag instead of main, use the `product-on-purpose` marketplace (agent-plugins registry).

### 2. Dry-run leg (cheap; always first)

The scratch directory MUST sit outside any git workspace; a session opened inside a repo discovers workspace skills and silently tests those instead of the installed plugin, producing a plausible PASS that proves nothing. Create the directory explicitly and refuse to proceed if the preflight says you are inside a work tree:

```bash
mkdir -p /tmp/plugin-smoke && cd /tmp/plugin-smoke   # Windows: E:\tmp\plugin-smoke or similar, NOT under any repo
git rev-parse --is-inside-work-tree 2>/dev/null && echo "REFUSE: inside a git workspace; move the scratch dir outside" || echo "preflight OK"
```

```bash
claude -p "/chain define-problem-statement -> define-hypothesis --dry-run <one-line toy context>" --permission-mode acceptEdits
```

PASS requires ALL of: the parsed chain restated (separator boundary honored, flags extracted, context intact); pre-flight checks reported (name resolution, Tier-3 and self-reference refusals); one "NOT EXECUTED - dry run" block per step; a terminal block including the promotion suggestion. Nothing may be written to disk.

### 3. Live leg (spends tokens; produces artifacts)

```bash
claude -p "/chain define-problem-statement -> define-hypothesis <same toy context>" --permission-mode acceptEdits
```

The default CHECKPOINTED mode pauses after step 1. In a headless run, resume the same session to approve:

```bash
claude -p --continue "approve" --permission-mode acceptEdits
```

PASS requires ALL of: every step classified PRODUCED with a real artifact on disk under `_pm-skills/plan-orchestrator/<run>/` (open the files; structural sections filled, no bracketed scaffolding); the checkpoint pause fired with approve/edit/skip/redo and resumed correctly; the terminal table reports the full chain. Then ask the session to state, for the record, the delegation mechanism observed (Skill tool vs read-fallback; inline vs isolated).

### 4. Record the result (the gate is the record)

Write the outcome into the canonical surfaces in one PR:

- [`reference/sub-agent-compatibility.md`](../reference/sub-agent-compatibility.md): the component's matrix row plus a dated record paragraph (result, evidence, caveats).
- The dispatch skill's status block in its `SKILL.md`.
- The release plan's status line when the smoke is a release gate.

Record FAILs with the failure mode verbatim; per the evidence-gate posture, a recorded FAIL ships with the EXPERIMENTAL label and release-note disclosure rather than blocking.

### 5. Clean up

Leave the user-scope install if useful, but disable it at local scope inside the pm-skills repo so workspace sessions do not see duplicate skills:

```bash
cd <pm-skills repo> && claude plugin disable pm-skills@pm-skills-marketplace --scope local
```

## Known environment quirks (verified 2026-06-10)

- **Workspace sessions do not register plugin sub-agents.** A session opened inside the repo discovers skills from the working tree but cannot dispatch the plugin's agents; that is why the smoke must run from a scratch directory against the installed plugin.
- **Headless checkpoint resume relaunches the engine.** `claude -p --continue` resumes the conversation, but the orchestrator sub-agent is re-instantiated with carried run state rather than persisting across turns. The run directory makes this correct; a single continuous interactive engine instance across multiple checkpoints is a separate thing to exercise interactively.
- **Recursive Glob inside the versioned plugin cache can return zero matches** even though the files exist; wide-root globs and Bash listings resolve fine. Engine filesystem checks should prefer those fallbacks.

## Adapting to other components

The shape generalizes: (1) install the build under test from a marketplace; (2) run the cheapest leg that exercises the contract (a dry-run flag, a `--status` probe, a hook-triggering no-op edit); (3) run one live leg that produces a verifiable artifact or observable effect; (4) record pass/fail plus mechanism observations in the compatibility matrix or the component's status surface; (5) clean up scope. For hooks, the live leg is an edit that should trigger (and one that should not); for sub-agents without disk artifacts, the observable effect is the structured output contract.

## Cross-references

- First recorded run: the v2.26.0 smoke-gate record in [`reference/sub-agent-compatibility.md`](../reference/sub-agent-compatibility.md)
- Release gating context: [`release-runbook.md`](release-runbook.md) (G0 readiness is where an unrun evidence gate blocks)
- The contract the smoke exercises: `skills/utility-pm-workflow-orchestrator/references/PARSE-CONTRACT.md` (Mode B Chain Expression Contract)
