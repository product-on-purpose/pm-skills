---
title: "pm-workflow-orchestrator Dispatch Output Template"
description: Output structure for the utility-pm-workflow-orchestrator dispatch skill. Streaming per-step output with confirmation pauses by default, a run header up front, and one of two terminal blocks (run complete or run halted). Dry-run mode emits per-step "NOT EXECUTED - dry run" lines plus a readiness summary.
---

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
