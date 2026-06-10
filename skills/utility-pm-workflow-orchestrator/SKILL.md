---
name: utility-pm-workflow-orchestrator
description: Run an ordered sequence of pm-skills against one input, pausing for go/no-go and stopping on a failed or empty step. Accepts a saved prioritized action plan (Mode A) or an ad-hoc named chain (Mode B; the chain command routes here). Explicit invocation only; run --dry-run first while the native path is EXPERIMENTAL. To author a durable workflow instead, use utility-pm-workflow-builder.
license: Apache-2.0
metadata:
  classification: utility
  version: "1.1.0"
  updated: 2026-06-10
  category: workflow
  frameworks: [triple-diamond]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# PM Workflow Orchestrator (Dispatch Skill)

Cross-client dispatch wrapper for the `pm-workflow-orchestrator` sub-agent. Detects the runtime; dispatches to the native sub-agent on Claude Code; reads `agents/pm-workflow-orchestrator.md` and walks the run loop inline on non-Claude clients via the "reference + execute inline" pattern. The orchestrator runs an ordered sequence of pm-skills from a saved prioritized-action-plan (Mode A) or a user-named chain (Mode B), pausing for go/no-go by default and stopping on a failed or empty step.

> **Status summary (v2.24.0):** EXPERIMENTAL on every client at ship.
> - **Claude Code (native):** EXPERIMENTAL until a live smoke test confirms the engine can invoke a downstream skill via the `Skill` tool in the installed plugin, and whether that skill runs inline in the engine context or isolated (see the v2.24.0 residual questions). The conductor is the model only for the run-loop / checkpoint / refusal SHAPE; no repo agent has ever declared `Skill`, so the mechanism is unproven.
> - **All non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot CLI, Gemini CLI):** EXPERIMENTAL until a dedicated maintainer-gate test exercises a real multi-artifact inline WRITE run. The orchestrator writes up to three full PM artifacts and may thread state; this is strictly harder than the conductor's inline path and has never been live-validated off Claude Code.
>
> On ANY client, run `--dry-run` FIRST as the readiness check (it exercises parsing, checkpointing, stop-on-fail, and the tool-capability pre-flight without invoking consequential skills). See the [Sub-Agent Compatibility Matrix](../../docs/reference/sub-agent-compatibility.md) for the canonical safe-usage matrix.

## When to Use

- You produced a `foundation-prioritized-action-plan` and want to run its runnable Section 7 prompts in order, pausing for go/no-go (Mode A).
- You want to run an ad-hoc, user-named chain of pm-skills against shared context (Mode B), for example `deliver-prd` then `deliver-user-stories`. On Claude Code, the /chain command is the terse front door for this mode.
- You want a generic runner for a dynamic chain that is NOT a pre-curated `workflow-*` command.

Run modes (orthogonal to client):

- **CHECKPOINTED (default):** pause after each OK step for approve / edit / skip / redo.
- **GUARDED AUTO (`--auto`, opt-in):** run without pausing on clean steps; still stop on failed, pause on empty, and stay checkpointed for Complex / Chaotic plans unless `--force-auto`.

`--thread` declares a linear dependency so each step receives the prior step's confirmed artifact; see the Mode B Chain Expression Contract in `references/PARSE-CONTRACT.md`.

## When NOT to Use

- You want a fixed, curated, named chain that an author maintains by hand (for example a full Foundation Sprint or Customer Discovery) -> use the existing `workflow-*` command (`workflow-foundation-sprint`, `workflow-customer-discovery`, ...). The orchestrator does NOT supersede those and surfaces a workflow step as MANUAL rather than nesting it.
- You only need to PRODUCE a prioritized action plan (not run it) -> use `foundation-prioritized-action-plan` (which can then offer to hand its plan here).
- You only need to review one artifact -> use `utility-pm-critic`.
- You want to run library-maintenance machinery as if it were PM work -> the orchestrator refuses Tier-3 maintenance skills.

## Instructions

**Runtime detection step.** Determine which AI client is invoking this skill. Run mode (checkpointed vs auto) comes from the user's flags and is independent of the client.

### If you are running in Claude Code with the pm-skills plugin installed

Invoke `@agent-pm-skills:pm-workflow-orchestrator` with the user's input plus any flags from `$ARGUMENTS` (`--auto`, `--force-auto`, `--dry-run`). The native sub-agent parses the input, builds the step list, and delegates each step via the `Skill` tool to the real downstream skill, running its own per-step loop with confirmation pauses. Relay the engine's per-step output blocks and the terminal output to the user.

This path is EXPERIMENTAL at v2.24.0 (see Status summary). Instruct the user to run `--dry-run` first.

### If you are running in any other AI client

Codex CLI, Cursor, Windsurf, Copilot CLI, Gemini CLI, or any client without native pm-skills plugin sub-agent support:

1. **Tool-capability pre-flight (FIRST action, before parsing or step 1).** Verify the client can (a) write a file under `_pm-skills/plan-orchestrator/<run>/` and (b) run any Bash a downstream skill needs.
   - If file write is unavailable: degrade explicitly to CHAT-ONLY mode (warn that multi-step reliability drops and context budget rises because full artifacts must stay in-window) for short runs, or refuse a long run with a clear message. Do not fail mid-chain.
   - If Bash is unavailable for a step that needs it: surface that step as blocked at its boundary.
   - Record the detected capabilities; they govern disk-write below.
2. Read the canonical sub-agent definition at `agents/pm-workflow-orchestrator.md`.
3. Read the shared parse and step-status contract at `references/PARSE-CONTRACT.md` (the engine reads the same file; this is what keeps the inline branch and the engine from drifting).
4. Execute the engine body as your operating instructions: run the pre-flight refusals, build the ordered step list (Mode A parse or Mode B named chain), then walk the per-step loop.
5. At each step, read the downstream skill's `SKILL.md` and execute its method inline in this window; classify the return PRODUCED / EMPTY / FAILED with the rubric in `references/PARSE-CONTRACT.md`; write `NN-<skill-name>.md` to the run directory when disk-write is on.
6. Honor the run mode: pause at each OK step in CHECKPOINTED; auto-advance only unambiguously-PRODUCED steps in GUARDED AUTO; a FAILED step STOPS the run; an EMPTY or ambiguous step always pauses for confirmation (a forced checkpoint pause the user can clear), regardless of `--force-auto`.
7. Emit the terminal output (run complete or halted) per the engine's section 4.5.

The "reference + execute inline" pattern is what enables cross-client compatibility. It is EXPERIMENTAL here until the maintainer-gate WRITE harness validates a real multi-artifact run on each client.

## `--dry-run` (readiness probe; run this FIRST on any client)

`--dry-run` walks the full step list and exercises parsing, checkpointing, stop-on-fail, and the tool-capability pre-flight, but does NOT invoke any consequential downstream skill. Each step emits "NOT EXECUTED - dry run" plus what WOULD happen (which skill, which mode, whether disk-write would engage). Use it to confirm the plan parses, the chain resolves, and the client has the tool access the live run needs, before spending tokens on real delegation.

## Cross-Client Notes

Because non-Claude clients run the loop and every step inline in ONE context window:

1. **Context budget.** The combined budget (engine body + per-step downstream skill reads + produced artifacts) can approach context limits on multi-step runs. The engine auto-enables disk-write for 2+ step runs and keeps only a one-line summary per completed step in context; CHAT-ONLY mode loses that mitigation, so prefer a write-capable client for long chains.
2. **Tool authorization.** Inline execution must have file-write and Bash access (not Read-only). The pre-flight (step 1 above) checks this. Codex may need its sandbox write flag enabled; Cursor and Gemini may interpose approval gates per step.
3. **No native chaining.** This is why the engine delegates by `Skill` (Claude Code) or inline read-and-execute (non-Claude), never by spawning a sub-agent. A Mode A step that resolves to a dispatch skill which would fan out to a sub-agent (only `utility-pm-critic`) is handled by inlining the leaf agent, never by chaining (engine section 7.2).

## Reference Files

- Canonical sub-agent definition: [`agents/pm-workflow-orchestrator.md`](../../agents/pm-workflow-orchestrator.md)
- Shared parse and step-status contract: `references/PARSE-CONTRACT.md`
- Output template: `references/TEMPLATE.md`
- Worked example: `references/EXAMPLE.md`
- Producer (hands plans here in HANDOFF mode): [`skills/foundation-prioritized-action-plan/SKILL.md`](../../skills/foundation-prioritized-action-plan/SKILL.md)
- Sub-agent compatibility matrix: [`docs/reference/sub-agent-compatibility.md`](../../docs/reference/sub-agent-compatibility.md)
- Runtime components catalog: [`docs/reference/runtime-components.md`](../../docs/reference/runtime-components.md)
- Library sample (single checkpointed run): [`library/sub-agent-samples/pm-workflow-orchestrator/`](../../library/sub-agent-samples/pm-workflow-orchestrator/)
