# Spec: `pm-workflow-orchestrator` engine sub-agent (v2.24.0)

**Status:** SPEC / build-ready. Derived from the approved design at [`design_plan-orchestrator.md`](design_plan-orchestrator.md).
**Date:** 2026-06-01
**Parent design:** [`design_plan-orchestrator.md`](design_plan-orchestrator.md) (one design, THREE specs: engine + dispatch skill + plan-handoff)
**Component:** 1 of 3 - the ENGINE sub-agent (`agents/pm-workflow-orchestrator.md`).
**Target release:** v2.24.0 (additive MINOR).
**SemVer:** ADDITIVE MINOR -> v2.24.0.

This spec covers exactly the engine sub-agent and the shared parse/status contract it reads at runtime. The two sibling components are specified separately: the cross-client control-panel skill in `spec_utility-pm-workflow-orchestrator-skill.md`, and the producer handoff in `spec_prioritized-action-plan-handoff.md`. Claims here are grounded in the design (cited by section, e.g. design 4.3) and verified against the repo (file paths are real and were read during authoring).

---

## 1. Purpose

The engine is the execution system prompt that walks an ordered sequence of pm-skills against a single input, pausing for human go/no-go by default and refusing to advance past a failed or empty step (design 1). It is the Claude Code-only half of the established two-component dispatch pattern the repo already uses for the conductor and critic; the cross-client control panel that invokes it lives in the sibling skill spec (design 2.1, 2.2).

The engine's execution model is DELEGATE: each step invokes a real downstream pm-skill via the `Skill` tool, or - for a sub-agent-backed step - inlines the leaf agent in its own context (design 7.2). It never re-implements a skill's method, and it never invents a step list (design 1, 10).

It borrows the conductor's SHAPE (numbered sequence, fixed per-step output block, confirmation pause, refusal-to-advance, minimal carried state, two terminal outputs) but NOT the conductor's MECHANISM: the conductor delegates to sub-agents via the `Agent` tool and sits on the chain-permission allowlist; this engine delegates to skills via the `Skill` tool and adds no allowlist entry (design 1, 7.1).

The name is LOCKED. The public roadmap already promises a v2.17 sub-agent named `pm-workflow-orchestrator` that "coordinates multi-skill workflows with quality gates" in `docs/concepts/active-orchestration.md` lines 56 and 69, in `skills/utility-pm-critic/SKILL.md` line 63 (the skill file is only 84 lines long; the forward-reference is at line 63, there is no line 137 there), and in `agents/pm-critic.md` line 137 (the agent file, which carries the "future state when `pm-workflow-orchestrator` ships in v2.17" forward-reference). The engine honors that published promise rather than shipping a second name (design 1, "Naming and roadmap reconciliation (RESOLVED)").

---

## 2. Frontmatter (verbatim, build-ready)

The engine file is `agents/pm-workflow-orchestrator.md`. Its frontmatter (design 2.1):

```yaml
---
name: pm-workflow-orchestrator
description: >-
  Runs an ordered sequence of pm-skills from a prioritized-action-plan or a
  user-named chain, pausing for go/no-go and stopping on a failed or empty step.
  Explicit invocation only; never fires proactively.
tools: Skill, Read, Grep, Glob, Bash, Edit
model: inherit
memory: none
---
```

Frontmatter rationale, each field grounded:

- `tools: Skill, Read, Grep, Glob, Bash, Edit` - and explicitly NOT `Agent`. `Skill` lets the engine invoke downstream skills; this is the first repo agent to declare `Skill` (design 2.1). `Bash`/`Edit` are present because delegated steps write artifacts and the engine writes run files under `_pm-skills/` (design 2.1, 4.4). `Agent` is deliberately ABSENT: the engine spawns zero sub-agents, so it needs no `agents/_chain-permitted.yaml` entry and adds zero chain depth (design 2.1, 7.1). The positive statement "and explicitly NOT Agent" is written into the spec and the body so a future editor does not add it (design 7.1, "Enforcement reality").
- `model: inherit` - the design frontmatter block specifies `model: inherit` (design 2.1). This differs from the conductor (`sonnet`) and critic (`sonnet`); use exactly what the design specifies.
- `memory: none` - mirrors the conductor's and critic's re-derive-not-cache discipline (design 2.1).
- `description` - carries NO "use proactively" / auto-trigger phrasing. This is a deliberate copy-paste hazard flag: the model for this frontmatter is the CONDUCTOR ("explicit invocation only"), NOT pm-critic, whose description DOES say "Use proactively" (verified: `agents/pm-critic.md` line 4 opens "Use proactively after any PM-artifact-producing skill completes"). Unprompted firing of a multi-step delegating chain is dangerous, so a reviewer must not lift critic's frontmatter (design 2.1, 7.3).

Frontmatter style note: the conductor and critic use a block-scalar `description: |`; this engine uses a folded `description: >-` exactly as the design block prints it. Both are valid YAML; match the design.

---

## 3. The parse contract (Section 3 of the design)

The engine reads the canonical parse rules and the step-status rubric from a SHARED reference file (section 9 below), not from inline prompt copy, to avoid prompt/inline drift (D12 referential discipline; design 2.1). The body summarizes; the shared file is authoritative. The contract has two input modes.

### 3.1 Mode A: a saved prioritized-action-plan

The input is a `foundation-prioritized-action-plan` output. The engine parses Section 7 into an ordered list of prompt blocks and runs them in document order. The canonical step source is the INPUT itself, not a static runbook (design 3).

Parse rules (design 3.1, verified against the three bundled examples):

- Anchor on the prefix `#### To execute ` (NOT `#### To execute P<n>:` with a single number). Capture everything up to the next `####` or `##` as one block. This matches the real compound heading `#### To execute P1 and P2: design the probes as experiments` in `skills/foundation-prioritized-action-plan/examples/02-interview-transcript.md`.
- Parse the P-token field as a SET, regex `P\d+(?:\s+and\s+P\d+)*`, never a single number.
- Treat Section 7 strictly as an ORDERED LIST of prompt blocks, never a `P1/P2/P3` keyed map. Multiple blocks sharing a P-level or a compound `Pn and Pm` heading are SIBLING next-actions on the same effort, NOT a producer/consumer chain (verified: `skills/foundation-prioritized-action-plan/examples/03-executive-ask.md` has two `P1` blocks - `define-problem-statement` and `discover-competitive-analysis` - that are parallel diagnostics). The engine does NOT thread one sibling's output into the next.
- Per block, classify it as one of three:
  - RUNNABLE: has a `**Skill:** \`name\`` line whose name resolves against the installed skill set (section 5 / design 8). Delegatable.
  - MANUAL: has a `**Prompt:**` blockquote but no resolvable backticked skill. Surfaced to the user, never delegated, does NOT consume a cap slot.
  - PARSE ERROR: has neither a resolvable skill nor a prompt body. Only this case is a hard parse failure.
- Capture the prompt as everything after `**Prompt:**` up to the next `####`/`##`, stripping leading `> `.

Top-3 cap (design 3.1): the cap counts RUNNABLE (skill-bearing) blocks in document order. The engine takes the first 3 runnable blocks, lists all manual blocks separately, and stops delegating at 3. If Section 7 carries fewer than 3 runnable blocks, it runs what is present; the cap is an upper bound, not a target.

Cynefin domain extraction (design 3.1; verified against all three examples which render `**Domain:** Complex. **Source:** S2, S3, S6, S7.`):

- Match the literal label `**Domain:**` on the Section 2 line, then scan the REMAINDER of that line for the FIRST whole-word occurrence of one of the four enum tokens (Clear, Complicated, Complex, Chaotic), case-insensitive, stopping at the first match. Tolerate a trailing period, an inline `**Source:**`, and reasoning prose.
- Fallback: the Section 0 `**Situation classification:**` bullet, same first-whole-word-token strategy, ignoring the `(Cynefin)` parenthetical and the reasoning suffix.
- If zero or more than one distinct token appears ambiguously, do NOT guess: report the ambiguity and default to CHECKPOINTED (the safe posture). Never silently fall through to auto.

Overall plan confidence (Section 0 `**Overall plan confidence:**`): parse tolerantly, accepting hyphenated compounds (`Medium-High`, `Medium-Low`, `Low-Medium`) followed by ` - reasoning`. Confidence is surfaced in the run header; it does NOT gate autonomy in v2.24.0 (design 12, residual question 2).

### 3.2 Mode B: a user-named chain plus context

The user names an ordered list of skill names (for example `deliver-prd` then `deliver-user-stories`) plus free-form context. Each named skill becomes a step (design 3.2).

- No top-3 cap: the full user-named chain is allowed. When the chain exceeds 3 steps, the engine WARNS that context budget may be tight on non-Claude inline runs and recommends disk-write, but runs all named steps. It does NOT silently truncate user intent (design 3.2).
- No Cynefin domain in the input. The autonomy default falls back to the conservative posture (section 4 / design 5).
- Skill resolution and refusals: section 5 (design 8).

---

## 4. Run loop, step-status rubric, run modes, and terminal outputs

### 4.1 Build the step list

Parse the input (section 3) into an ordered list of steps. Run pre-flight refusals (section 6 / design 8.1) BEFORE any step executes.

### 4.2 Per-step loop (design 4.2)

For each step `i`:

1. Compose the step input: the step's self-contained prompt (Mode A) or the named skill plus the user's context (Mode B). For Mode A, the prompt is already fully context-injected ("No placeholders," verified in the plan skill's `references/TEMPLATE.md` contract) and is run as-is; the engine does NOT inject a prior step's artifact into it.
2. Delegate to the real downstream skill (section 7 mechanism). Never re-implement.
3. Classify the return as PRODUCED / EMPTY / FAILED (section 4.3) and capture the artifact (and write it to disk per section 4.4).
4. Checkpoint or continue per the run mode (section 4.5).
5. Advance to step `i+1`, or STOP.

Per-step output block (adapted from the conductor's per-gate contract):

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

### 4.3 Step-status classification (PRODUCED / EMPTY / FAILED rubric)

The stop-on-failed/empty guardrail does NOT depend on a downstream `status: pass/fail/refused` envelope. Verified: `deliver-prd` and the other content skills emit prose artifacts with no `## Status` block; only the four existing sub-agents emit the D26 Status YAML (design 4.3). The engine is therefore the status AUTHORITY and classifies each return itself with this deterministic rubric (design 4.3):

- **FAILED:** the delegated call errored or refused at the tool/runtime layer, OR the returned text is an explicit refusal/error string.
- **EMPTY:** no artifact was returned, OR the artifact is a bare stub (the target skill's `references/TEMPLATE.md` structural `##` sections are present only as unfilled `[bracketed guidance]`). The engine already reads each target skill's `SKILL.md`/template per step, so it can presence-check the expected sections.
- **PRODUCED:** a non-trivial artifact populating the target skill's expected structure.

EMPTY is never read as PASS. In GUARDED AUTO, EMPTY surfaces for confirmation (a forced checkpoint pause, never an auto-advance and never a hard halt - the user can clear it); in CHECKPOINTED it prompts at the checkpoint like any OK step. One verb throughout: an EMPTY step in GUARDED AUTO pauses and waits for the user (the same forced-checkpoint pause CHECKPOINTED applies). This rubric is the testable contract (section 8); it does NOT require retrofitting a status envelope onto the catalog (out of scope, design 10).

### 4.4 State passing and disk-write

Mode A Section 7 prompts are ORDERED-INDEPENDENT, not a chain. Each is self-contained by design and does NOT expect an upstream artifact (design 4.4). Therefore:

- **Mode A:** NO automatic output-to-input threading. The engine runs prompts in document order and does NOT extract a structured handoff from one to feed the next. There is no per-skill handoff schema because Mode A needs none.
- **Mode B:** threading ONLY when the USER asserts a dependency by ordering the chain AND opting into it. The engine does NOT infer a PRD-to-user-stories dependency from skill identity. If the user wants step N+1 to consume step N's output, they request it explicitly (a flag or chain syntax); the engine then passes the prior artifact as a reference. Absent that, each named step is self-sufficient given the user's context.

Carried state is minimal: the ordered step list (parsed once) plus, per completed step, the artifact reference and a one-line summary (design 4.4).

Disk-write and context budget (design 4.4): the locked default is chat output. For any run of 2+ steps, the engine AUTO-ENABLES disk-write to the gitignored `_pm-skills/plan-orchestrator/<run>/` as the context-budget mitigation (a narrowly scoped, stated exception, honoring "nothing published" since the path is gitignored). It writes `NN-<skill-name>.md` per step and keeps only a one-line summary per completed step in context. Single-step runs stay chat-only. When a downstream step does consume a prior artifact (Mode B user-declared), it reads it from the on-disk path.

User edit at a checkpoint (design 4.4): `edit` and "user-supplied artifact" replace the captured step output ATOMICALLY - the engine overwrites both its in-context capture and the on-disk file (when disk-write is on) before advancing. Invariant: a downstream step always reads the most recently confirmed version of the prior step, never a pre-edit copy.

### 4.5 Run modes and guardrails (design 5)

Two modes, differing only in who confirms each advance. Both share the per-step contract, the stop-on-failure semantics, and the Cynefin floor.

**CHECKPOINTED (default).** Pause after each `OK` step for explicit go/no-go. Per-step actions: approve, edit (amend then advance, atomically per 4.4), skip (mark skipped, advance with no artifact), redo (re-run). The pause lives in the output contract (design 5.1).

**GUARDED AUTO (`--auto`, opt-in).** Entered by the `--auto` flag (the flag the user passes to opt into GUARDED AUTO; the engine owns the run-mode behavior, and the dispatch skill forwards `--auto` verbatim in `$ARGUMENTS`). Runs all steps without pausing on `OK`, with two guardrails (design 5.2):

1. A FAILED step STOPS the run (hard halt + blocker block); an EMPTY step surfaces for confirmation (a forced checkpoint pause, never an auto-advance, never a silent skip), per 4.3. Both are unconditional and outrank `--force-auto`.
2. Stay checkpointed for Complex/Chaotic plans unless `--force-auto`. The Cynefin domain comes from the plan (Mode A, section 3.1). For Mode B (no domain), GUARDED AUTO degrades to CHECKPOINTED and `--force-auto` is the only override (absence of a known-safe domain is treated like the unsafe domains; the engine does NOT prompt the user to self-classify a domain).

Status-signal degradation (design 5.2): because content skills emit no machine status, a step the engine classifies as PRODUCED auto-advances in GUARDED AUTO, but any EMPTY or ambiguous step surfaces for confirmation (a forced checkpoint pause) rather than auto-passed. The 4.3 rubric is what makes PRODUCED a confident classification; EMPTY/ambiguous always pauses.

`--force-auto` precedence (design 5.3): `--force-auto` flips Complex/Chaotic (and Mode-B-no-domain) plans from forced-checkpointed to auto. It is explicitly NOT a step-skip and does NOT bypass stop-on-failed/empty. Precedence, stated plainly: **stop-on-failed/empty is unconditional and outranks `--force-auto` in all domains.** On a Complex plan under `--force-auto`, an EMPTY or ambiguous step still surfaces for confirmation; `--force-auto` suppresses pauses only for unambiguously-PRODUCED steps. This keeps the escape hatch narrower than the conductor's removed `--skip-gates` (D24), so it does not re-introduce that bug class.

`--dry-run` (design 6.2): walks the step list and exercises parsing, checkpointing, stop-on-fail, and the tool-capability pre-flight WITHOUT invoking consequential downstream skills, emitting "NOT EXECUTED - dry run" per step. This is the deterministic CI surface and the cross-client readiness probe.

### 4.6 Terminal outputs (design 4.5)

Two terminal blocks, adapted from the conductor.

On full completion:

````markdown
## Plan run complete: {N} of {N} steps

| Step | Skill | Result |
|---|---|---|
| 1 | {skill} | PRODUCED |
| ... | ... | ... |

**Manual steps (not delegated):**
- {effort}: {one-line manual instruction}

**Next steps:**
- Deferred efforts beyond the top-3 cap (Mode A): {P4-P5 list, if any}
- Optional: run `utility-pm-critic` over a produced artifact for adversarial review
- Persisted run artifacts (if disk-write was on): `_pm-skills/plan-orchestrator/<run>/`
````

On halt:

````markdown
## Plan run halted at Step {i} of {N}

**Stop reason:** {FAILED / EMPTY / refused / user abort + detail}

**Completed steps:**
| Step | Skill | Result |
|---|---|---|
| ... | ... | ... |

**Resume guidance:** re-invoking RESTARTS the run from Step 1. Persisted artifacts under
`_pm-skills/plan-orchestrator/<run>/` are for your manual reference only; the engine does
not auto-resume in v2.24.0.
````

Resume (design 4.5): v2.24.0 ships the honest YAGNI cut - re-invoking restarts the run; persisted artifacts are for the user's manual reference only. The halt output says this plainly; it does NOT advertise an auto-resume the loop cannot perform (auto-resume is a future enhancement, design 12 residual question 3).

---

## 5. Mode B skill resolution and the leaf-inlining rule

### 5.1 Mode B skill resolution (design 8.2)

Validation source is the ACTUAL installed skill set, not another skill's recommendation tiers:

- **Claude Code:** filesystem/Glob check for `skills/<name>/SKILL.md`.
- Unknown name -> refuse, naming the offending entry; apply name-safety (never approximate/auto-correct).
- **Tier-3 maintenance machinery** (`utility-pm-skill-*`, `utility-pm-release-conductor`, `utility-pm-changelog-curator`, `utility-update-pm-skills`, and the plan skill itself) -> refuse as "library-maintenance machinery, not a PM work product." This refusal list is an ENGINE-OWNED reference (carried in the shared reference doc, section 9, derived from `classification: utility` + the maintenance set), NOT reached into the plan skill's private references at runtime.
- The Tier-2 "hand off to family entry point" RECOMMENDATION rule is NOT imported as a RUN restriction: a user naming an individual `tool-foundation-sprint-basics` step in Mode B is a legitimate choice and is allowed. Only full workflow/composite entry points are surfaced as manual (5.2 category 3).
- Validation is all-or-nothing at pre-flight: any invalid/refused name halts the whole run before step 1.

(The non-Claude inline resolution fallback - read `skills/<name>/SKILL.md` by relative path, else fall back to `skills/foundation-prioritized-action-plan/references/skill-catalog.md`, else refuse - is the dispatch skill's inline branch concern and is specified in `spec_utility-pm-workflow-orchestrator-skill.md`. The engine's own resolution is the Claude Code filesystem check.)

### 5.2 The leaf-inlining rule for dispatch-fan-out steps (design 7.2)

This is the load-bearing governance behavior of the engine. `utility-pm-critic` is a Tier-2 recommendable skill (verified, `recommendable-tiers.md` line 38 per design) AND a dispatch skill whose Claude Code branch @-mentions the `pm-critic` SUB-AGENT. So a Mode A plan can legitimately hand the engine a step that, if invoked as a native skill, would try to spawn a second sub-agent from inside the already-nested engine - the depth-3 hop the `Agent` strip would block at runtime, routed through a skill to bypass the allowlist (design 7.2).

The engine runs a MANDATORY pre-flight step classification on every resolved target and routes by category:

- **Category 1 - content skills** (30 phase + the core foundation artifacts, plus `tool-note-and-vote`, `utility-mermaid-diagrams`, `utility-slideshow-creator`): safe to invoke via the `Skill` tool.
- **Category 2 - DISPATCH skills that fan out to a sub-agent** (`utility-pm-critic` is the only Tier-2 one; the Tier-3 maintenance dispatch skills are already refused, section 5.1): the engine MUST NOT invoke these as a native skill. Instead it INLINES the leaf agent - reads `agents/pm-critic.md` and executes its flow inline in the engine's OWN context (the same reference-and-execute-inline technique the non-Claude branch uses), capturing the leaf's output. This preserves depth-2 (the engine spawns zero sub-agents, directly or transitively) and makes both client modes symmetric (non-Claude already inlines the leaf; Claude Code now does too).
- **Category 3 - workflow/composite skills** (`workflow-*` commands, Foundation/Design Sprint family entry points): the engine does NOT nest a full workflow inside a run. It surfaces such a step as MANUAL ("this step is a full workflow; run the curated `workflow-*` separately"). Nested orchestration is out of scope for v2.24.0 (YAGNI cut).

**Named YAGNI rule, written verbatim into the body (design 7.2, 10):**

> The orchestrator never delegates to a dispatch skill that spawns a sub-agent, nor nests a workflow; depth-2 is preserved because the engine spawns zero sub-agents, directly or transitively-through-a-skill.

Key consequence for the leaf-inlining rule: because the engine inlines the leaf (Category 2) rather than chaining to it, the engine adds NO `agents/_chain-permitted.yaml` entry; that allowlist stays at its single `pm-release-conductor` entry (design 7.1). Locked-decision narrowing (design 7.1): the locked text says the engine "invokes the REAL downstream pm-skills/sub-agents ... via the Skill tool AND/OR chain-permitted sub-agents." This design narrows to Skill-tool-only and satisfies the "and/or sub-agents" clause for sub-agent-backed steps by INLINING the leaf agent, never by the `Agent` tool, because (i) Context7 documents that the `Agent` tool is stripped from nested sub-agent contexts to prevent recursion and (ii) adding the engine to the allowlist is a security-relevant change being explicitly avoided.

### 5.3 Routing curated workflows (design 1, "Relationship to the shipped workflow-* commands")

A Mode B user who names a curated workflow (for example "run foundation-sprint") is ROUTED to the existing `workflow-foundation-sprint` command rather than the engine stitching sub-steps, consistent with `recommendable-tiers.md` rule 3 (use the family entry point, do not stitch sub-steps). This is an explicit routing rule, not left implicit. The 10 `workflow-*` commands COEXIST with the engine: they are fixed curated chains; the engine is the generic runner for a plan's Section 7 or an ad-hoc named chain.

---

## 6. Pre-flight refusals (design 8.1)

Two governing principles: empty is not pass (4.3); stop, do not skip (every failure STOPS and surfaces a blocker; `--force-auto` never bypasses it). All refusals fire BEFORE any step runs.

- **Mode A:** no plan supplied, file missing/unreadable, or no parseable `## Section 7` block -> refuse with the specific reason; do not invent a step list. A Section 7 present but with zero RUNNABLE blocks -> treat as an empty chain (refuse rather than emit an empty run).
- **Mode B:** empty chain -> refuse. Each named skill validated before the run (section 5.1).
- **Self-reference:** a Mode B chain naming `utility-pm-workflow-orchestrator` (self) is refused to prevent recursion, mirroring how the plan skill lists itself in Tier-3. The engine also refuses a Mode A plan whose Section 7 names `foundation-prioritized-action-plan` or `utility-pm-workflow-orchestrator` (closes the producer-handoff loop, design 11.4).
- **Missing dependency (design 8.5):** the engine does NOT infer cross-step artifact dependencies. A stop on a missing dependency fires ONLY when the user explicitly declared a Mode B dependency and the prior step did not produce the artifact; it never fabricates or stubs a missing artifact.
- **User abort mid-chain (design 8.6):** abort at any checkpoint STOPS cleanly; completed artifacts are preserved and surfaced (chat plus any on disk); nothing is rolled back or published; the engine reports where it stopped.

Refusals surface as a clear pre-flight message with the specific reason, never as a fabricated step list.

---

## 7. Delegation mechanism (Claude Code native; design 6.1)

On Claude Code, the engine delegates each Category-1 step via the `Skill` tool to the real downstream skill, and inlines each Category-2 leaf in its own context (section 5.2). The engine runs in its own isolated context window; the per-step block and artifacts surface to the main chat through the dispatch skill.

Empirical-verification gate (design 6.1, residual question 1): the conductor is cited ONLY for the run-loop/checkpoint/refusal SHAPE, never as proof the `Skill`-from-sub-agent MECHANISM works (the conductor uses the `Agent` tool; no repo agent has ever listed `Skill`). Before the spec depends on native sub-agent-to-skill delegation, a live smoke test must confirm (a) the engine can invoke a downstream skill via `Skill` in the installed plugin, and (b) whether that skill runs inline in the engine context or isolated. Context7 describes skills as "adding to your context window," which suggests inline; if so, the context-budget mitigation (disk-write + summarize-forward, 4.4) applies to the Claude Code path too. Until verified, the dispatch skill's status block labels the native path EXPERIMENTAL (specified in the dispatch spec). The engine body cites this gate so a maintainer running the smoke test knows what to confirm. This gate is bound to an acceptance criterion (AC #14, section 8) and to the section 10 pre-tag gate: the smoke test must be RUN and its result RECORDED before tag, even though the engine may SHIP with the native path EXPERIMENTAL.

The cross-client inline path (non-Claude clients reading `agents/pm-workflow-orchestrator.md` as operating instructions, the tool-capability pre-flight, the `skill-catalog.md` resolution fallback, and the per-client EXPERIMENTAL matrix row) is the DISPATCH SKILL's responsibility and is fully specified in `spec_utility-pm-workflow-orchestrator-skill.md`. The engine body is written so that its prose reads correctly when executed inline as well as natively (it never assumes a tool only Claude Code provides beyond the declared tool set).

---

## 8. Mechanical acceptance criteria

The engine ships when all of the following pass. Each is an objective check, not a reader impression (design 9.1).

1. **File exists and parses.** `agents/pm-workflow-orchestrator.md` exists with valid YAML frontmatter; `name: pm-workflow-orchestrator`. Parse check.
2. **Tool surface exact.** The `tools:` line is exactly `Skill, Read, Grep, Glob, Bash, Edit`. `Agent` is ABSENT. Manual pre-tag grep: grep `agents/pm-workflow-orchestrator.md` and confirm `Agent` is not present in the tools line (design 7.1, "Enforcement reality"; no `scripts/*chain*` enforcement exists, so this is a manual gate).
3. **No chain-permit entry.** `agents/_chain-permitted.yaml` is UNCHANGED (still the single `pm-release-conductor` entry). Diff check (design 7.1, 9.2).
4. **Non-proactive description.** The `description` contains no "use proactively" / auto-trigger phrasing and DOES contain "Explicit invocation only; never fires proactively." String check (design 2.1, 7.3).
5. **Pre-flight refusals fire.** Fixture-driven (design 9.1): missing/invalid Mode A plan; Mode B naming an unresolvable skill; self-reference (Mode B naming `utility-pm-workflow-orchestrator`; Mode A Section 7 naming `foundation-prioritized-action-plan`); empty chain. Each refuses with a specific reason and emits no step list.
6. **Section 7 parsing fixtures (MANDATORY).** Built from the real bundled examples that exercise the hazards: `skills/foundation-prioritized-action-plan/examples/02-interview-transcript.md` (compound `P1 and P2` heading), `skills/foundation-prioritized-action-plan/examples/03-executive-ask.md` (two `P1` sibling prompts, Complex domain), `skills/foundation-prioritized-action-plan/references/EXAMPLE.md` (Complicated, Medium-High, P1 then P3 with no P2), plus a SYNTHETIC skill-less block (exercises the MANUAL tolerate path) and a SYNTHETIC interleaved manual+skill Section 7 (asserts the cap counts skill-bearing blocks only). Assert: ordered tuple list (not a P-map); compound/duplicate P handled; top-3 counts runnable blocks; siblings NOT threaded.
7. **Cynefin extraction fixtures.** Assert the extracted token is exactly `Complex`/`Complicated` (not `Complex.`) from the inline `**Domain:** X. **Source:** ...` shape; assert ambiguous/absent -> CHECKPOINTED; cover all four enum branches (Clear/Complicated -> auto runs; Complex/Chaotic -> forced checkpoint unless `--force-auto`). Reuse `skills/foundation-prioritized-action-plan/eval/fixtures/cynefin-fixtures.md` if it carries Clear/Chaotic-labelled inputs, else author two synthetic Section-2 fixtures (design 9.1).
8. **Step-status rubric.** pass-with-output -> PRODUCED (advance); stub/empty -> EMPTY (stop in auto, pause in checkpointed); error/refusal text -> FAILED (stop). The engine-owned rubric is the contract under test, NOT a downstream status field (design 4.3, 9.1).
9. **`--force-auto` precedence.** ONLY flips checkpointed -> auto for Complex/Chaotic/no-domain; a failed/empty step STILL stops under `--force-auto`. Fixture check (design 5.3, 9.1).
10. **Leaf-inlining classification.** A fixture step targeting `utility-pm-critic` is classified Category 2 and routed to inline `agents/pm-critic.md`, NOT invoked as a native skill; a `workflow-*` target is Category 3 (MANUAL); a phase-skill target is Category 1 (Skill tool). Classification check (design 7.2).
11. **`--dry-run` walks without consequential delegation.** Emits "NOT EXECUTED - dry run" per step and exercises parsing + checkpointing + stop-on-fail + tool-capability pre-flight (design 6.2, 9.1).
12. **Shared reference read, not duplicated.** The engine body references `skills/utility-pm-workflow-orchestrator/references/PARSE-CONTRACT.md` for the parse rules and the 4.3 rubric rather than embedding a second copy; the dispatch skill's inline branch reads the same file. Referential-discipline check (design 2.1, section 9 below).
13. **Validator bundle.** `scripts/pre-tag-validate.{sh,ps1} --strict` passes on a clean tree; `validate-agents-md` passes after the AGENTS.md edits (section 10).
14. **Smoke-test gate recorded (the engine is the surface under test).** The native `Skill`-from-sub-agent smoke test is RUN on the installed plugin; its result (works inline / works isolated / fails) is RECORDED in the v2.24.0 release notes or residual log. Until it passes, `docs/reference/sub-agent-compatibility.md` labels the native Claude Code cell EXPERIMENTAL and NO doc claims PRODUCTION for that path. This AC mirrors plan exit criterion #10 and binds the run-and-record requirement to the engine component, since the engine is the first repo agent to declare `Skill` and is the component the smoke test exercises (design 6.1, section 7, residual question 1). The native EXPERIMENTAL label is removed only after a recorded PASS.

Non-deterministic end-to-end checks (real delegation is model-run) are manual/scheduled, never per-PR; `--dry-run` is the deterministic CI surface. The engine inherits Tier 1 invariants over the committed sample but does NOT ship its own quality validator (design 9.1). The engine's own gates stay STRUCTURAL.

---

## 9. The shared references/PARSE-CONTRACT.md

To avoid prompt/inline drift (D12 referential discipline), the parse rules (section 3) and the step-status rubric (section 4.3) live in a SINGLE shared reference file that BOTH the engine and the dispatch skill's inline branch read at runtime, rather than being duplicated in two prompts (design 2.1, 60).

- **Path:** `skills/utility-pm-workflow-orchestrator/references/PARSE-CONTRACT.md`.
- **Owner:** authored as part of the dispatch-skill component (it lives under that skill's `references/`), but its CONTENT is co-owned by this engine spec because the engine is the primary consumer. The dispatch spec (`spec_utility-pm-workflow-orchestrator-skill.md`) is authoritative for the file's creation and packaging; THIS spec is authoritative for its content requirements below.
- **Required content (the engine's contract surface):**
  1. The Mode A Section 7 parse rules (anchor prefix, P-set regex, ordered-list-not-keyed-map, RUNNABLE/MANUAL/PARSE-ERROR block classification, prompt capture, top-3 runnable cap).
  2. The Cynefin domain extraction rule (literal `**Domain:**` label, first-whole-word enum token, Section 0 fallback, ambiguity -> CHECKPOINTED).
  3. The Overall plan confidence tolerant-parse rule (hyphenated compounds; surfaced not gating).
  4. The PRODUCED / EMPTY / FAILED step-status rubric (section 4.3) as the single normative definition.
  5. The engine-owned Tier-3 maintenance refusal list and the Category 1/2/3 step classification (section 5.1, 5.2), so both the native and inline paths route identically.
- **Why co-located under the dispatch skill, not the engine:** agents have no `references/` directory in the plugin layout; skills do. Placing the shared contract under the dispatch skill's `references/` puts it where the inline branch can read it by relative path and where the engine (which has `Read`) can read it too. The engine body cites the path explicitly.

The engine body MUST summarize each contract surface briefly and then point to `PARSE-CONTRACT.md` as the authoritative source, exactly as the conductor body points to `docs/contributing/release-runbook.md` for gate definitions (verified: `agents/pm-release-conductor.md` line 18, 31).

---

## 10. This component's slice of the v2.24.0 hygiene surface

The full hygiene surface for v2.24.0 is in design 9.2 and is shared across the three components. The slice OWNED by or gating on the engine component:

**New source file:**
- `agents/pm-workflow-orchestrator.md` (the engine). NEW.

**Shared reference content (file created by the dispatch component, content gated by this spec):**
- `skills/utility-pm-workflow-orchestrator/references/PARSE-CONTRACT.md` - see section 9.

**Governance file - NO edit, with a manual gate:**
- `agents/_chain-permitted.yaml` - UNCHANGED (design 7.1). Add the pre-tag MANUAL grep confirming `Agent` is absent from the engine tools line (AC #2). This is a manual gate because no `scripts/*chain*` enforcement exists (verified).

**AGENTS.md (two edits, `validate-agents-md` partially enforced; design 9.2):**
- Add the engine under `## Sub-Agents`. The current block reads "Four sub-agents ship in v2.16.0:" (verified, `AGENTS.md` line 450) with a 4-item list (lines 452-455). Add `pm-workflow-orchestrator` as the 5th item while PRESERVING the historical v2.16.0 framing - do NOT blindly rewrite to "Five sub-agents ship in v2.16.0." Phrase the addition so the v2.16.0-origin slate stays accurate and the v2.24.0 addition is noted (for example, keep the v2.16.0 line and add a sentence: "v2.24.0 adds a fifth sub-agent: `pm-workflow-orchestrator` ...").
- The dispatch skill's `### Utility Skills` entry (a separate edit, owned by the dispatch component) auto-satisfies the `validate-agents-md` basename substring check, because the skill path line `...utility-pm-workflow-orchestrator/SKILL.md` contains the substring `pm-workflow-orchestrator`. Therefore the dedicated Sub-Agents prose entry above is NOT CI-protected and MUST be added by hand and verified in the pre-tag manual pass (design 9.2, "LOW silent-validator finding").

**Sub-agent catalog docs (hand-maintained, add 5th row; design 9.2):**
- `docs/reference/runtime-components.md` - add the engine row to the table, update the present-tense "4 sub-agents ship" prose to reflect 5, add invocation examples. Leave v2.16.0-historical framing as-is.
- `docs/reference/sub-agent-compatibility.md` - this file carries TWO tables plus several v2.16.0-attested count phrasings; edit all of them, not just the matrix:
  - Add the 5th row to the Cross-Client status matrix (today 4 rows ending at `pm-release-conductor`, verified line 32) with the engine EXPERIMENTAL on ALL non-Claude clients; the native Claude Code cell is EXPERIMENTAL until the section-7 smoke test passes (design 6.1, 6.2; AC #14).
  - Add a 5th row to the "Capability by Task" table (verified lines 63-66, four `Production/Production/Experimental` rows) for the orchestrator as `Experimental / Experimental / Experimental`.
  - Leave the v2.16.0-attested GATE prose HISTORICAL (the `## Cross-Client Status (as of v2.16.0)` header line 25, "3 of 4 sub-agents" line 44, "The 4th sub-agent" line 46, "All 4 sub-agents are EXPERIMENTAL" line 52, "Run all 4 tests" line 104). Do NOT rewrite those to 5; they record what the v2.16.0 maintainer test exercised. Update only present-tense totals, so the file is left consistent (5-row matrix + 5 capability rows + preserved v2.16.0 prose).

**Sub-agent count sweep (4 -> 5; design 9.2) - NO CI gate, fully MANUAL (`sub-agent` is not a checked resource in either count script):**
- Present-tense surfaces to update to 5: README.md (including line 858 "invocation examples for all four sub-agents"), `docs/reference/runtime-components.md`, `docs/reference/sub-agent-compatibility.md` (above), `docs/guides/using-sub-agents.md` (section 2/3 headers, the "All four sub-agents are @-mentionable" line, the 4-name @-mention block + add the 5th `@agent-pm-skills:pm-workflow-orchestrator` example), `docs/getting-started/platforms.md` line 8 (count + 4-name list), `docs/concepts/sub-agents.md` line 56 ("introduces four sub-agents" where present-tense + the slate count), and the embedded `4 sub-agents (...)` name lists in the three manifests. Leave v2.16.0-historical framings (runtime-components.md line 37, active-orchestration.md line 39, index.mdx line 293, the v2.16.0 changelog rows). The corrected baseline: sub-agents 4 -> 5 (design 9.2). The skill-count totals (64 -> 65; utility 10 -> 11; foundation 9 UNCHANGED) are driven by the dispatch-skill component, not the engine, and are swept there.

**Roadmap reconciliation (design 1, 9.2) - the engine is the promised component, so this is engine-adjacent:**
- `docs/concepts/active-orchestration.md` lines 56/69 ("v2.17" -> "shipped v2.24.0").
- `skills/utility-pm-critic/SKILL.md` line 63 (the `pm-workflow-orchestrator (v2.17)` forward-reference in the SKILL file, which is 84 lines long - there is no line 137 in it) -> "shipped v2.24.0."
- `agents/pm-critic.md` line 137 (the AGENT file, which carries a separate "future state when `pm-workflow-orchestrator` ships in v2.17" forward-reference) -> "shipped v2.24.0." (These are two distinct files; the earlier conflation of a single "SKILL.md line 63, line 137" citation is corrected here.)

**New sub-agent doc note (design 9.2):**
- Add the sub-agent-to-skill composition path (this is the FIRST repo agent to invoke skills) to `docs/concepts/sub-agents.md` or `docs/contributing/sub-agent-design-patterns.md`.

**Pre-tag gate for this component:**
- `scripts/pre-tag-validate.{sh,ps1} --strict` on a clean tree.
- The manual `Agent`-absent grep on the engine tools line.
- The manual AGENTS.md Sub-Agents-prose check.
- The native `Skill`-from-sub-agent smoke test is RUN and its result RECORDED (AC #14). It is run on the installed plugin; until it passes, the native Claude Code cell in `docs/reference/sub-agent-compatibility.md` stays EXPERIMENTAL and no doc claims PRODUCTION for that path. This is a hard build-time gate at the engine component level (it mirrors plan exit criterion #10), not a deferrable residual: the engine may SHIP with the native path EXPERIMENTAL, but the smoke test must be RUN and its result RECORDED before tag.

---

## 11. Dependencies

- **The dispatch-skill component** (`spec_utility-pm-workflow-orchestrator-skill.md`) - creates `skills/utility-pm-workflow-orchestrator/` and the `references/PARSE-CONTRACT.md` file whose content this spec gates (section 9). The engine cannot be exercised end-to-end without its control panel; the engine file itself can be authored and frontmatter-validated independently.
- **The plan-handoff component** (`spec_prioritized-action-plan-handoff.md`) - the producer that hands a plan to the engine in CHECKPOINTED mode (design 11). Not a build dependency of the engine; the engine accepts any conforming Mode A plan.
- **The bundled plan examples** - the parse-contract fixtures depend on `skills/foundation-prioritized-action-plan/examples/02-interview-transcript.md`, `examples/03-executive-ask.md`, and `references/EXAMPLE.md` existing in their verified shape (all present on main).
- **Empirical smoke test** (design 6.1, residual question 1; AC #14; section 10 pre-tag gate) - native `Skill`-from-sub-agent delegation must be smoke-tested on the current Claude Code runtime before the native path moves off EXPERIMENTAL. Shipping the engine EXPERIMENTAL is allowed, but RUNNING the smoke test and RECORDING its result is NOT deferrable: it is acceptance criterion #14 and a pre-tag gate for this component (section 10). What is deferrable is moving the native path FROM EXPERIMENTAL to PRODUCTION (that waits on a recorded PASS); running and recording the test is required at tag.
- **No `pm-skills-mcp` code dependency** - this is a pure agent definition plus a shared reference file (consistent with the v2.23.0 plan skill having "no code dependencies in pm-skills-mcp").
- **No new chain-permission surface** - explicitly no `agents/_chain-permitted.yaml` edit (design 7.1, 10).

---

## 12. Scope / YAGNI cuts inherited by the engine (design 10)

- No autonomous goal-seeking; runs a given step list, never invents goals.
- No dynamic re-planning; the step list is fixed at run start; on failure it stops, it does not route around.
- No output-to-input threading in Mode A; no handoff extraction, no per-skill handoff schema.
- No inferred dependencies in Mode B; cross-step consumption is user-declared only.
- No nested orchestration; workflow/composite/dispatch-fan-out steps are surfaced as manual or inlined-at-leaf (section 5.2), never nested.
- No proactive firing; explicit invocation only.
- Top-3 cap on Mode A only; Mode B runs the full named chain with a context-budget warning past 3.
- `--force-auto` is a narrow autonomy escape hatch, never a gate-skip; stop-on-failed/empty outranks it always.
- No new chain-permission surface; Skill-tool delegation only; no `Agent` tool, no `_chain-permitted.yaml` entry; sub-agent-backed steps handled by leaf-inlining.
- No auto-resume in v1; re-invoke restarts.
- No downstream status-envelope retrofit; the engine self-classifies step status.
- No non-Claude PRODUCTION claim; all non-Claude clients ship EXPERIMENTAL (dispatch-skill concern; the engine prose is written to run correctly inline).
