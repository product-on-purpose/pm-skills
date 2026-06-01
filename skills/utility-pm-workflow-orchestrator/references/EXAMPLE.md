---
title: "pm-workflow-orchestrator Dispatch Example: checkpointed Mode A run on Claude Code"
description: 'Worked example of the utility-pm-workflow-orchestrator dispatch skill running a saved Storevine prioritized-action-plan (Mode A), CHECKPOINTED, on Claude Code via native sub-agent dispatch. Walks three runnable Section 7 prompts with confirmation pauses between them, surfaces one MANUAL block that does not consume a cap slot, and ends in a clean "Plan run complete" terminal block.'
---

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
