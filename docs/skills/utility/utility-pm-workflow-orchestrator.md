---
title: "PM Workflow Orchestrator (Dispatch Skill)"
description: "Run an ordered sequence of pm-skills against one input via the pm-workflow-orchestrator sub-agent, pausing for go/no-go and stopping on a failed or empty step. Dispatches natively on Claude Code with the pm-skills plugin (invokes @agent-pm-skills:pm-workflow-orchestrator, which delegates each step through the Skill tool); on non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI) reads agents/pm-workflow-orchestrator.md and walks the loop inline after a tool-capability pre-flight. Explicit invocation only; never fires proactively. EXPERIMENTAL on all non-Claude clients and on the native path until smoke-tested; run --dry-run first."
generated: true
source: scripts/generate-skill-pages.py
tags:
  - Utility
  - workflow
---

:::note[Quick facts]
**Classification:** Utility | **Version:** 1.0.0 | **Category:** workflow | **License:** Apache-2.0
:::

**Try it:** `/pm-skills:utility-pm-workflow-orchestrator "Your context here"`

Cross-client dispatch wrapper for the `pm-workflow-orchestrator` sub-agent. Detects the runtime; dispatches to the native sub-agent on Claude Code; reads `agents/pm-workflow-orchestrator.md` and walks the run loop inline on non-Claude clients via the "reference + execute inline" pattern. The orchestrator runs an ordered sequence of pm-skills from a saved prioritized-action-plan (Mode A) or a user-named chain (Mode B), pausing for go/no-go by default and stopping on a failed or empty step.

> **Status summary (v2.24.0):** EXPERIMENTAL on every client at ship.
> - **Claude Code (native):** EXPERIMENTAL until a live smoke test confirms the engine can invoke a downstream skill via the `Skill` tool in the installed plugin, and whether that skill runs inline in the engine context or isolated (see the v2.24.0 residual questions). The conductor is the model only for the run-loop / checkpoint / refusal SHAPE; no repo agent has ever declared `Skill`, so the mechanism is unproven.
> - **All non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot CLI, Gemini CLI):** EXPERIMENTAL until a dedicated maintainer-gate test exercises a real multi-artifact inline WRITE run. The orchestrator writes up to three full PM artifacts and may thread state; this is strictly harder than the conductor's inline path and has never been live-validated off Claude Code.
>
> On ANY client, run `--dry-run` FIRST as the readiness check (it exercises parsing, checkpointing, stop-on-fail, and the tool-capability pre-flight without invoking consequential skills). See the [Sub-Agent Compatibility Matrix](../../reference/sub-agent-compatibility.md) for the canonical safe-usage matrix.

## When to Use

- You produced a `foundation-prioritized-action-plan` and want to run its runnable Section 7 prompts in order, pausing for go/no-go (Mode A).
- You want to run an ad-hoc, user-named chain of pm-skills against shared context (Mode B), for example `deliver-prd` then `deliver-user-stories`.
- You want a generic runner for a dynamic chain that is NOT a pre-curated `workflow-*` command.

Run modes (orthogonal to client):

- **CHECKPOINTED (default):** pause after each OK step for approve / edit / skip / redo.
- **GUARDED AUTO (`--auto`, opt-in):** run without pausing on clean steps; still stop on failed, pause on empty, and stay checkpointed for Complex / Chaotic plans unless `--force-auto`.

## When NOT to Use

- You want a fixed, curated, named chain that an author maintains by hand (for example a full Foundation Sprint or Customer Discovery) -> use the existing `workflow-*` command (`workflow-foundation-sprint`, `workflow-customer-discovery`, ...). The orchestrator does NOT supersede those and surfaces a workflow step as MANUAL rather than nesting it.
- You only need to PRODUCE a prioritized action plan (not run it) -> use `foundation-prioritized-action-plan` (which can then offer to hand its plan here).
- You only need to review one artifact -> use `utility-pm-critic`.
- You want to run library-maintenance machinery as if it were PM work -> the orchestrator refuses Tier-3 maintenance skills.

## How to Use

Invoke the skill by name (`/pm-skills:utility-pm-workflow-orchestrator` on Claude Code, `$utility-pm-workflow-orchestrator` on Codex):

```
/pm-skills:utility-pm-workflow-orchestrator "Your context here"
```

Or reference the skill file directly: `skills/utility-pm-workflow-orchestrator/SKILL.md`

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

## Output Template

# Output Template

`utility-pm-workflow-orchestrator` streams output as it walks the step list: a run header first, then one per-step block per step (with a confirmation pause between OK steps in CHECKPOINTED mode), then exactly one terminal block. Dry-run mode replaces step execution with a readiness summary. Authoring notes in `[ brackets ]` are guidance: fill them in or delete them, and do not ship bracketed placeholders in a real run.

## Run Header

````markdown
## Plan run: {Mode A: <plan name> | Mode B: <named chain>}

**Input mode:** A (saved prioritized-action-plan) | B (user-named chain)
**Client + mechanism:** {Claude Code, native sub-agent | <client>, inline execution}
**Run mode:** CHECKPOINTED (default) | GUARDED AUTO
**Disk-write:** on (`_pm-skills/plan-orchestrator/<run>/`) | off (CHAT-ONLY)
**Steps resolved:** {N} runnable, {M} manual

{Mode A only, surfaced not gating:}
**Cynefin domain:** {Clear | Complicated | Complex | Chaotic | undetermined -> CHECKPOINTED}
**Overall plan confidence:** {High | Medium-High | Medium | Medium-Low | Low | Low-Medium - <reasoning>}
````

## Per-Step Output

The section 4.2 block, emitted once per step:

````markdown
## Step {i} of {N}: {skill-name or "manual"} ({effort name})

**Delegation:** {Skill tool | inline execution | manual (no skill)}
**Result:** PRODUCED / EMPTY / FAILED / SKIPPED-MANUAL
{one-line summary of the artifact, or the failure/refusal narrative}

**Step status:** OK / STOP / WAITING-FOR-CONFIRMATION

{If OK + checkpointed:} Approve, edit, skip, or redo? Reply to advance to Step {i+1}.
{If STOP:} Halting. Resolve before re-invoking:
- {blocker}
````

A MANUAL step is surfaced as its own block (`Delegation: manual (no skill)`, `Result: SKIPPED-MANUAL`) and does NOT consume a top-3 runnable-cap slot.

## Terminal Output - Run Complete

````markdown
## Plan run complete: {N} of {N} steps

| Step | Skill | Result | Artifact |
| --- | --- | --- | --- |
| 1 | {skill-name} | PRODUCED | {path or in-chat} |
| ... | ... | ... | ... |

**Manual steps (surfaced, not run):**
- Step {k}: {what the user runs by hand, e.g. a workflow-* command}

**Next steps:**
- Deferred P4-P5 actions from the source plan (not in the top-3 cap): {list or "none"}
- Optional: run `utility-pm-critic` on any produced artifact to review it.
````

## Terminal Output - Run Halted

````markdown
## Plan run halted at Step {i} of {N}

**Stop reason:** {EMPTY step | FAILED step | refusal | tool-capability blocker}
**Detail:** {the failure / refusal narrative}

**Completed steps:**
- Step 1: {skill-name} PRODUCED -> {path or in-chat}
- ... (through Step {i-1})

**Resume guidance:** there is no auto-resume in v1. Resolve the blocker, then re-invoke the skill to restart the run. Persisted artifacts under `_pm-skills/plan-orchestrator/<run>/` are for manual reference only.
````

## Dry-Run Output

````markdown
## Dry run: {Mode A: <plan name> | Mode B: <named chain>}

Per step:
- Step {i} of {N}: {skill-name or "manual"} - NOT EXECUTED - dry run
  WOULD: delegate via {Skill tool | inline}; run mode {checkpointed | auto}; disk-write {would engage | CHAT-ONLY}.

**Readiness summary:**
- Parse: OK | {parse error detail}
- Chain resolved: {N} runnable, {M} manual | {unresolved skill name}
- Tool-capability: file-write {available | unavailable}, Bash {available | unavailable}

**Recommended next step:** if readiness is clean, re-invoke without `--dry-run` to run live.
````

## Reference Files

- Canonical sub-agent: [`agents/pm-workflow-orchestrator.md`](../../../agents/pm-workflow-orchestrator.md)
- Shared parse + step-status contract: `PARSE-CONTRACT.md`
- Worked example: `EXAMPLE.md`

## Example Output

<details>
<summary>Example: pm-workflow-orchestrator Dispatch on Claude Code (Mode A, checkpointed)</summary>

# Example: pm-workflow-orchestrator Dispatch on Claude Code (Mode A, checkpointed)

This example shows `utility-pm-workflow-orchestrator` running a saved `foundation-prioritized-action-plan` (Mode A) on Claude Code, where the skill dispatches to the native `@agent-pm-skills:pm-workflow-orchestrator` sub-agent. The run is CHECKPOINTED (the default): the orchestrator pauses after each OK step and the user approves before it advances. It ends in a clean "Plan run complete" block.

This is the same worked run carried by the library sample at `library/sub-agent-samples/pm-workflow-orchestrator/`. Because a FAILED step HALTS the run and an EMPTY step pauses rather than silently advancing, neither can appear in a run that ends in "Plan run complete." A FAILED or EMPTY demonstration is a SEPARATE halted-run sample; this example is the clean approve-all path only.

## Invocation

```
> /utility-pm-workflow-orchestrator _pm-skills/plans/storevine-q3-action-plan.md
```

## Skill behavior

1. **Runtime detection.** Detects Claude Code with the pm-skills plugin installed; takes the native-dispatch branch.
2. **Native dispatch.** Invokes `@agent-pm-skills:pm-workflow-orchestrator` with the plan path and no flags (so the default CHECKPOINTED run mode applies).
3. **Engine parses + walks the loop.** The sub-agent parses Section 7 of the plan into an ordered step list per `references/PARSE-CONTRACT.md`, delegates each runnable step via the `Skill` tool, surfaces one MANUAL block, and pauses at each OK boundary for the user's go/no-go. The dispatch skill relays the engine's per-step blocks and the terminal block to the main chat.

## Output (relayed verbatim from the engine)

## Plan run: storevine-q3-action-plan

**Input mode:** A (saved prioritized-action-plan)
**Client + mechanism:** Claude Code, native sub-agent
**Run mode:** CHECKPOINTED (default)
**Disk-write:** on (`_pm-skills/plan-orchestrator/2026-06-01-storevine-q3/`)
**Steps resolved:** 3 runnable, 1 manual
**Cynefin domain:** Complicated
**Overall plan confidence:** Medium-High - converging interview and analytics signal on the activation gap, thinner data on pricing sensitivity.

---

## Step 1 of 3: deliver-prd (Considered effort)

**Delegation:** Skill tool
**Result:** PRODUCED
Drafted a PRD for the guided-onboarding revamp: problem framing, two in-scope flows, success metrics tied to the activation gap, explicit out-of-scope list. Written to `_pm-skills/plan-orchestrator/2026-06-01-storevine-q3/01-deliver-prd.md`.

**Step status:** OK

Approve, edit, skip, or redo? Reply to advance to Step 2.

> User: approve

---

## Step 2 of 3: deliver-user-stories (Standard effort)

**Delegation:** Skill tool
**Result:** PRODUCED
Generated 9 user stories with acceptance criteria from the PRD scope, grouped by the two onboarding flows, each with a happy-path plus at least one error-state criterion. Written to `02-deliver-user-stories.md`.

**Step status:** OK

Approve, edit, skip, or redo? Reply to advance to Step 3.

> User: approve

---

## Step (manual): workflow-customer-discovery

**Delegation:** manual (no skill)
**Result:** SKIPPED-MANUAL
The plan named a full Customer Discovery workflow as a prompt. The orchestrator does NOT nest curated `workflow-*` commands; it surfaces this as a manual step for the user to run directly. This manual block does NOT consume a top-3 runnable-cap slot.

**Step status:** OK (surfaced; nothing executed)

Noting and continuing to the next runnable step.

---

## Step 3 of 3: deliver-launch-checklist (Considered effort)

**Delegation:** Skill tool
**Result:** PRODUCED
Produced a pre-launch checklist across engineering, design, support, and marketing readiness for the onboarding revamp, with owners and open-items flagged. Written to `03-deliver-launch-checklist.md`.

**Step status:** OK

Approve, edit, skip, or redo? Reply to finish the run.

> User: approve

---

## Plan run complete: 3 of 3 steps

| Step | Skill | Result | Artifact |
| --- | --- | --- | --- |
| 1 | deliver-prd | PRODUCED | `01-deliver-prd.md` |
| 2 | deliver-user-stories | PRODUCED | `02-deliver-user-stories.md` |
| 3 | deliver-launch-checklist | PRODUCED | `03-deliver-launch-checklist.md` |

**Manual steps (surfaced, not run):**
- workflow-customer-discovery: run the curated workflow command directly when ready.

**Next steps:**
- Deferred P4-P5 actions from the source plan (not in the top-3 cap): pricing-sensitivity experiment, beta-cohort recruiting.
- Optional: run `utility-pm-critic` on any produced artifact to review it.

## Notes on This Example

This is the canonical clean-path narrative for the orchestrator: a single-thread CHECKPOINTED Mode A run that the user approves at every step.

1. **Three runnable steps, one manual.** The cap counts only the three skill-bearing blocks; the `workflow-customer-discovery` manual block is surfaced and skipped, not nested, and does not occupy a cap slot.
2. **Confirmation pauses.** The engine pauses after each OK step and only advances on the user's reply. In GUARDED AUTO (`--auto`) it would advance clean steps without pausing, but would still stop on an EMPTY or FAILED step.
3. **Disk-write engaged.** Because the run has 2+ steps, disk-write auto-enabled and each artifact landed under the run directory; only a one-line summary per step stays in context.
4. **Ends in "Plan run complete."** No step was EMPTY or FAILED, so the run reached the run-complete terminal block. Any failure or empty result would have produced the separate "Plan run halted" block instead.

At v2.24.0 this native path is EXPERIMENTAL until the `Skill`-from-sub-agent smoke test closes; run `--dry-run` first as the readiness check.

## Related Files

- Canonical sub-agent: [`agents/pm-workflow-orchestrator.md`](../../../agents/pm-workflow-orchestrator.md)
- Skill manifest: `SKILL.md`
- Output template: `TEMPLATE.md`
- Shared parse + step-status contract: `PARSE-CONTRACT.md`
- Producer: [`skills/foundation-prioritized-action-plan/SKILL.md`](../../../skills/foundation-prioritized-action-plan/SKILL.md)
- Library sample (same run): [`library/sub-agent-samples/pm-workflow-orchestrator/`](../../../library/sub-agent-samples/pm-workflow-orchestrator/)

</details>
