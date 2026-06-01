# v2.24.0 Post-Install Smoke Checklist: pm-workflow-orchestrator (native Claude Code path)

Status: OPEN (not yet run). This is the gate that graduates the native Claude Code path from EXPERIMENTAL to PRODUCTION.
Owner: maintainer (or Claude, IF pm-skills is installed as a plugin into the session).
Binds to: engine spec AC #14 and plan exit criterion #10. Companion: [`smoke-test-record.md`](./smoke-test-record.md) (records the pre-tag mechanism proof).

## Why this doc exists

The pre-tag smoke test ([`smoke-test-record.md`](./smoke-test-record.md)) proved the MECHANISM: a dispatched sub-agent's toolset includes `Skill`, and a skill invoked through it runs INLINE (prompt-injected into the same sub-agent context, not an isolated executor). It used a general-purpose PROXY sub-agent against the source tree, because the `pm-workflow-orchestrator` agent is only a Markdown file there, not a registered, dispatchable sub-agent.

This checklist is the missing half: drive the REAL `pm-workflow-orchestrator` agent, as an end user would, from an INSTALLED plugin. Only an installed build registers `agents/pm-workflow-orchestrator.md` as a live, @-mentionable sub-agent. Until the steps below pass on an installed build, the native cell stays EXPERIMENTAL and no doc claims PRODUCTION for it.

A "smoke test" here means a shallow end-to-end check that the real thing runs and behaves per contract, not exhaustive coverage.

## Preconditions

- [ ] A clean Claude Code session (no stale plugin state).
- [ ] Install the v2.24.0 build from the marketplace:
  - `/plugin marketplace add product-on-purpose/agent-plugins`
  - `/plugin install pm-skills`
  - Confirm the installed version is 2.24.0 (registry pins `agent-plugins` to commit `d3f1549`).
- [ ] Have one saved `foundation-prioritized-action-plan` output on disk to run against (or generate one in Step 7), with at least one Category-1 runnable step in Section 7.

## The checklist

Run `--dry-run` FIRST (Step 2). Do not run a consequential step until dry-run is clean.

### 1. Install + discovery
- [ ] `@agent-pm-skills:pm-workflow-orchestrator` is offered / dispatchable (the sub-agent registered).
- [ ] The `utility-pm-workflow-orchestrator` skill is invocable by name.
- [ ] The skill's status block shows the native path as EXPERIMENTAL (it should, pre-flip).
Expected: all three present. A missing sub-agent means the `.codex-plugin`/`agents/` discovery did not register (investigate before continuing).

### 2. `--dry-run` (no execution)
- [ ] Invoke the orchestrator in `--dry-run` against the saved plan.
- [ ] It parses the plan, lists the ordered steps, and prints "NOT EXECUTED - dry run" (or equivalent) for each.
- [ ] It writes NO artifacts and invokes NO downstream skill.
Expected: a complete step list with zero side effects. This is the safe, delegation-free preview.

### 3. One real checkpointed step (PRODUCED path, CHECKPOINTED mode)
- [ ] Run the orchestrator for real in CHECKPOINTED mode (the default).
- [ ] At step 1 (a Category-1 content skill), it invokes the real downstream skill via the `Skill` tool, the skill PRODUCES its artifact, and the artifact is written to disk under `_pm-skills/`.
- [ ] The per-step block surfaces to the main chat (what ran, the PRODUCED verdict, where the artifact landed).
- [ ] It PAUSES for go/no-go before step 2 (does not auto-advance).
Expected: one real artifact, a clear per-step block, an explicit pause.

### 4. Failure / empty refusal (FAILED and EMPTY rubric)
- [ ] Arrange a step that fails or returns empty (e.g. point a step at an input that cannot produce a real artifact).
- [ ] The orchestrator marks it FAILED or EMPTY and REFUSES to advance to the next step.
Expected: a hard stop with the failed/empty verdict, never a silent skip or a fabricated artifact.

### 5. Category-2 leaf-inlining + depth-2 preservation (the tricky one)
- [ ] Run a step that routes to `utility-pm-critic` (the only Category-2 dispatch-fan-out skill).
- [ ] The engine INLINES the leaf agent (`agents/pm-critic.md`) in its own context rather than spawning a sub-agent. (The engine has no `Agent` tool, so it cannot spawn one; confirm it does not try and error.)
- [ ] No second-level sub-agent is spawned. Chain depth stays at 2 (main -> orchestrator, with the critic inlined, not main -> orchestrator -> critic).
Expected: the critic's review is produced inline; no `_chain-permitted.yaml` entry was needed; depth-2 intact.

### 6. GUARDED-AUTO mode (opt-in, no per-step stop)
- [ ] Re-run with GUARDED-AUTO enabled.
- [ ] It runs the steps without pausing for go/no-go between PRODUCED steps.
- [ ] It STILL refuses to advance past a FAILED or EMPTY step (guarded, not blind).
Expected: continuous run on success, hard stop on failure. GUARDED-AUTO removes the checkpoints, not the safety rubric.

### 7. The `--run` handoff from foundation-prioritized-action-plan v1.1.0
- [ ] Invoke `foundation-prioritized-action-plan` to produce a fresh plan, then accept the `--run` offer (single confirmation).
- [ ] The plan skill hands the runnable prompts to the orchestrator; it does NOT run any work-skill inline itself.
- [ ] The orchestrator picks up the handed-off chain and runs it (per Steps 3 to 6).
Expected: one confirmation bridges plan -> orchestrator; the plan skill stays a planner, the orchestrator stays the runner.

### 8. Context budget across multiple steps
- [ ] Over a 3+ step run, confirm the orchestrator's context stays manageable: each step's artifact is written to disk and the forward-carried summary stays compact (not the full prior artifacts).
Expected: the disk-write + summarize-forward mitigation holds. This matters specifically because skills run INLINE and would otherwise accumulate the full text of every step in the orchestrator's window.

## Record the result

Append a dated block to [`smoke-test-record.md`](./smoke-test-record.md) (or to this file) with one line per step:

```
Installed-plugin smoke, <date>, build 2.24.0 (d3f1549):
  1 discovery: PASS/FAIL
  2 dry-run: PASS/FAIL
  3 checkpointed PRODUCED: PASS/FAIL
  4 FAILED/EMPTY refusal: PASS/FAIL
  5 Category-2 leaf-inlining + depth-2: PASS/FAIL
  6 GUARDED-AUTO: PASS/FAIL
  7 --run handoff: PASS/FAIL
  8 context budget: PASS/FAIL
  Verdict: PASS (all) / PARTIAL (list fails) / FAIL
```

## On a clean PASS: the EXPERIMENTAL -> PRODUCTION flip

Only if every step PASSES on an installed build:

1. In `docs/reference/sub-agent-compatibility.md`, change the `pm-workflow-orchestrator` row:
   - Cross-Client status matrix: native Claude Code cell EXPERIMENTAL -> PRODUCTION (or "Production").
   - "Capability by Task" table: the orchestrator's Claude Code column Experimental -> Production.
   - Leave the v2.16.0-attested historical prose ("3 of 4 sub-agents", "All 4 sub-agents", etc.) untouched; it describes a different, earlier test. Update only present-tense totals so the file stays internally consistent.
2. In the `utility-pm-workflow-orchestrator` SKILL.md status block, drop the native-path EXPERIMENTAL note (keep the non-Claude EXPERIMENTAL notes).
3. Record the flip in the next CHANGELOG entry / release notes.

## Out of scope here (separate gate)

The NON-Claude clients (Codex CLI, Cursor, Windsurf, Copilot CLI, Gemini CLI) are independently EXPERIMENTAL and are NOT covered by this checklist. The orchestrator writes up to three full PM artifacts inline on those clients, which is strictly harder than the conductor's inline path and has never been live-validated off Claude Code. Moving any non-Claude client to PRODUCTION requires its own dedicated test exercising a real multi-artifact inline WRITE run (see the v2.24.0 plan, "Risks and Residual open items").
