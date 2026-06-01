---
title: "pm-workflow-orchestrator Parse + Step-Status Contract"
description: The single shared source of truth for the orchestrator's Mode A Section 7 parse rules, the top-3 runnable cap, Cynefin domain and Overall plan confidence extraction, the PRODUCED / EMPTY / FAILED step-status rubric, and the self-reference refusal. Both the pm-workflow-orchestrator sub-agent and the dispatch skill's inline branch read THIS file, so the rules live in exactly one place and never drift between prompt and inline.
---

# Parse + Step-Status Contract

This is the shared contract that BOTH the `pm-workflow-orchestrator` sub-agent (`agents/pm-workflow-orchestrator.md`) and the dispatch skill's non-Claude inline branch (`skills/utility-pm-workflow-orchestrator/SKILL.md`) read at runtime. It exists so the parse rules and the step-status rubric live in exactly ONE place. Neither the engine prompt nor the inline branch restates these rules; both link here. The file is authored under this skill's `references/` tree but is owned conceptually by the engine.

The rules below are grounded against three real files already on main, cited inline so they can be re-verified:

- `skills/foundation-prioritized-action-plan/examples/02-interview-transcript.md` (a real compound heading `#### To execute P1 and P2: design the probes as experiments`).
- `skills/foundation-prioritized-action-plan/examples/03-executive-ask.md` (two `P1` sibling prompts under a Complex domain rendered `**Domain:** Complex. **Source:** S2, S3, S6, S7.`).
- `skills/foundation-prioritized-action-plan/references/EXAMPLE.md` (Complicated domain, `Overall plan confidence: Medium-High`, `#### To execute P1` then `#### To execute P3` with no P2).

## Mode A Section 7 Parse Contract

Section 7 of a `foundation-prioritized-action-plan` is the runnable prompt list. Parse it as follows:

- **Anchor on the prefix `#### To execute `** (trailing space), NOT on `#### To execute P<n>:`. The text after the prefix varies (a P-token set, then a colon and a human title), so anchoring on the full `P<n>:` form misses compound and titled headings.
- **Capture the block** as everything from the anchor heading to the next `####` or `##` heading (whichever comes first).
- **Parse the P-token as a SET, not a single token.** Use the regex `P\d+(?:\s+and\s+P\d+)*`. A heading like `#### To execute P1 and P2: design the probes as experiments` yields the set `{P1, P2}` for ONE block. Sibling prompts that each carry the same token (two separate `P1` headings) are TWO separate blocks, never threaded together.
- **Treat Section 7 as an ORDERED LIST of prompt blocks**, in document order. It is never a P-keyed map: P-tokens can repeat, can be compound, and can skip numbers (P1 then P3 with no P2). Order on the page is the order of execution.
- **Classify each block:**
  - **RUNNABLE:** the block names a real pm-skill the orchestrator can delegate to or inline.
  - **MANUAL:** the block names no skill, or names a curated `workflow-*` command (which the orchestrator surfaces as manual rather than nesting). Manual blocks are listed and skipped, never executed.
  - **PARSE ERROR:** the block cannot be classified (malformed heading, missing prompt body). Report it; do not guess.
- **Capture the prompt body** as everything after `**Prompt:**`, stripping a single leading `> ` from each quoted line.

## Top-3 Runnable Cap

- The cap counts RUNNABLE blocks in document order. The first three RUNNABLE blocks are in scope; later runnable blocks are deferred (P4-P5) and reported in the terminal output, not run.
- MANUAL blocks are listed separately and do NOT consume a cap slot. A run can surface any number of manual blocks plus up to three runnable steps.
- The cap is an UPPER BOUND, not a target. A plan with one runnable block runs one step; the orchestrator does not pad to three.

## Cynefin Domain Extraction (Mode A)

- Match `**Domain:**` on the Section 2 line. Scan the remainder of that line for the FIRST whole-word enum token: `Clear`, `Complicated`, `Complex`, or `Chaotic`, case-insensitive.
- Tolerate a trailing period and an inline `**Source:**` clause: from `**Domain:** Complex. **Source:** S2, S3, S6, S7.` the extracted token is exactly `Complex` (not `Complex.`).
- **Fallback:** if Section 2 has no usable `**Domain:**` line, read the Section 0 `**Situation classification:**` bullet.
- **Zero or ambiguous match:** report it and default the run to CHECKPOINTED. Never guess a domain.
- The domain is SURFACED in the run header. In v2.24.0 it informs the GUARDED AUTO guardrail (Complex / Chaotic plans stay checkpointed unless `--force-auto`) but does not otherwise gate the run.

## Overall Plan Confidence Extraction (Mode A)

- Parse the `Overall plan confidence` value tolerantly. Accept single tokens (`High`, `Medium`, `Low`) and hyphenated compounds (`Medium-High`, `Medium-Low`, `Low-Medium`), optionally followed by ` - <reasoning>`.
- Capture the reasoning clause after ` - ` when present, for the run header.
- Confidence is SURFACED in the run header only. It does NOT gate autonomy in v2.24.0.

## Step-Status Rubric

Classify every executed step into exactly one of three states. This rubric is what the inline branch and the engine both apply, so a step is judged identically regardless of mechanism.

- **PRODUCED:** a non-trivial artifact that populates the expected structure of the target skill's output. This is the only PASS state.
- **EMPTY:** no artifact, OR a bare stub where the target skill's `references/TEMPLATE.md` `##` sections appear only as unfilled `[ bracketed guidance ]`. EMPTY is NEVER a PASS; an EMPTY step pauses for confirmation - a forced checkpoint pause in CHECKPOINTED, and likewise a forced checkpoint pause (never an auto-advance, never a hard halt; the user can clear it) in GUARDED AUTO - and never silently advances to completion.
- **FAILED:** the step errored, the target skill refused, or the return carries an explicit error string. A FAILED step HALTS the run; it never advances.

A SKIPPED-MANUAL block is not an executed step and is not run through this rubric: it is surfaced, listed, and the loop continues to the next runnable step.

## Self-Reference Refusal

A Mode A plan or a Mode B chain that names `utility-pm-workflow-orchestrator` or `foundation-prioritized-action-plan` as a step is REFUSED. The orchestrator does not run itself, and it does not run its own producer as a step (the producer hands plans IN; it is not a step the orchestrator runs OUT). Report the refusal at the offending step's boundary; do not silently drop the step.

## Reference Files

- Canonical sub-agent: [`agents/pm-workflow-orchestrator.md`](../../../agents/pm-workflow-orchestrator.md)
- Output template: `TEMPLATE.md`
- Worked example: `EXAMPLE.md`
- Producer + parse fixtures: [`skills/foundation-prioritized-action-plan/`](../../../skills/foundation-prioritized-action-plan/)
