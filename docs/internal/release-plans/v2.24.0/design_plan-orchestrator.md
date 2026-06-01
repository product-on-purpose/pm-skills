# Design: Plan Orchestrator (v2.24.0)

Status: design / spec input. Target release: v2.24.0 (additive MINOR). THREE new or changed components derived from one design: an engine sub-agent, a cross-client dispatch skill, and a plan-to-orchestrator handoff added to the existing `foundation-prioritized-action-plan` skill. The design therefore yields THREE specs (engine, dispatch skill, plan-handoff).

---

## 1. Overview

The plan orchestrator runs an ordered sequence of pm-skills against a single input, pausing for human go/no-go by default and refusing to advance past a failed or empty step. It ships as the established two-component dispatch pattern that the repo already uses for the conductor and critic, plus a producer-side handoff that lets the plan skill offer to run its own output:

- Engine (Claude Code only): `agents/pm-workflow-orchestrator.md` - the execution system prompt that walks the step list.
- Control panel (cross-client): `skills/utility-pm-workflow-orchestrator/SKILL.md` - the user interface that dispatches to the native engine on Claude Code, or reads the engine definition and runs the loop inline on other clients.
- Producer handoff: `skills/foundation-prioritized-action-plan/SKILL.md` gains a v1.1.0 HANDOFF mode that offers to run the plan it just produced, and on one confirmation hands it to the orchestrator in CHECKPOINTED mode (section 11).

The execution model is DELEGATE: each step invokes a real downstream pm-skill (via the `Skill` tool on Claude Code, or by reading-and-executing that skill's `SKILL.md` inline on other clients). The orchestrator never re-implements skill methods.

It borrows the conductor's SHAPE (numbered sequence, fixed per-step output block, confirmation pause, refusal-to-advance, minimal carried state, two terminal outputs) but NOT the conductor's MECHANISM. The conductor delegates to sub-agents via the `Agent` tool and sits on the chain-permission allowlist; this orchestrator delegates to skills via the `Skill` tool and adds no allowlist entry.

### Naming and roadmap reconciliation (RESOLVED)

The public roadmap (`docs/concepts/active-orchestration.md` lines 56, 69, and `skills/utility-pm-critic/SKILL.md` line 63) already promises a v2.17 sub-agent named `pm-workflow-orchestrator` that "coordinates multi-skill workflows with quality gates" - the exact function of this feature. The naming is LOCKED: the engine is `pm-workflow-orchestrator` and the dispatch skill is `skills/utility-pm-workflow-orchestrator/`, honoring the published roadmap promise rather than shipping a second name for a promised component. There is no residual naming question.

In scope as a consequence: the v2.24.0 ship updates the three roadmap references - change the `active-orchestration.md` Gantt/prose at lines 56 and 69 from "v2.17" to "shipped v2.24.0," and update the critic `SKILL.md` line 63 forward-reference. (All paths below use `pm-workflow-orchestrator` / `utility-pm-workflow-orchestrator`.)

Note: this design uses the agreed feature name from the locked decisions ("plan orchestrator") for the user-facing concept, but the registered component names honor the published roadmap.

### Relationship to the shipped `workflow-*` commands (resolves the "already-shipped chaining mechanism" finding)

The 10 `workflow-*` commands in `commands/` (kept when the 63 wrapper duplicates were deleted in v2.22.0) ARE curated, hand-authored multi-skill chains (for example `workflow-customer-discovery` runs research, JTBD, opportunities, problem in sequence). The orchestrator does NOT supersede them. The relationship is COEXIST with a clear division:

- `workflow-*` commands = fixed, curated, named chains an author maintains by hand. Best when the chain is well-known and stable.
- The orchestrator = a generic runner for two dynamic inputs: a prioritized-action-plan's recommendations, or an ad-hoc user-named chain. Best when the chain is not a pre-curated workflow.

A Mode B user who names a curated workflow (for example "run foundation-sprint") is routed to the existing `workflow-foundation-sprint` command rather than the orchestrator stitching sub-steps, consistent with `recommendable-tiers.md` rule 3 (use the family entry point, do not stitch sub-steps). This is stated as an explicit routing rule, not left implicit.

---

## 2. Components

### 2.1 Engine sub-agent: `agents/pm-workflow-orchestrator.md`

Frontmatter:

```yaml
name: pm-workflow-orchestrator
description: >-
  Runs an ordered sequence of pm-skills from a prioritized-action-plan or a
  user-named chain, pausing for go/no-go and stopping on a failed or empty step.
  Explicit invocation only; never fires proactively.
tools: Skill, Read, Grep, Glob, Bash, Edit
model: inherit
memory: none
```

- `Skill` is listed so the engine can invoke downstream skills (Context7 `code.claude.com/docs/en/context-window` confirms a sub-agent inherits and can invoke parent skills; this is the first repo agent to declare `Skill`). `Bash`/`Edit` are present because delegated steps write artifacts and the orchestrator writes run files under `_pm-skills/`.
- `Agent` is deliberately ABSENT. The engine spawns zero sub-agents, so it needs no `agents/_chain-permitted.yaml` entry and adds zero chain depth. (Governance section 7.)
- `memory: none`, mirroring the conductor's re-derive-not-cache discipline.
- The description carries NO "use proactively" / auto-trigger phrasing. (Resolves the proactive-firing finding: the model is the conductor, which says "explicit invocation only" - NOT pm-critic, whose description does say "use proactively." Unprompted firing of a multi-step delegating chain is dangerous, so the description must explicitly avoid proactive phrasing; flag it as a copy-paste hazard so a reviewer does not lift critic's frontmatter.)

The engine body carries: the parse contract (section 3), the run loop (section 4), the run modes/guardrails (section 5), the step-status classification contract (section 4.3), the pre-flight refusals (section 8), and the two terminal outputs (section 4.5). To avoid prompt/inline drift (D12 referential discipline), the parse rules and the step-status rubric live in a single shared reference file `skills/utility-pm-workflow-orchestrator/references/PARSE-CONTRACT.md` that BOTH the engine and the dispatch skill's inline branch read at runtime, rather than being duplicated in two prompts.

### 2.2 Control-panel skill: `skills/utility-pm-workflow-orchestrator/SKILL.md`

A utility dispatch skill (classification `utility`), mirroring `utility-pm-release-conductor` structurally. Three pieces:

1. A lightweight prose "Runtime detection step" line (no programmatic probe).
2. A Claude Code native-dispatch H3 branch: invoke `@agent-pm-skills:pm-workflow-orchestrator` with the input + flags from `$ARGUMENTS`, relay the engine's step output.
3. A non-Claude inline-execution H3 branch: read `agents/pm-workflow-orchestrator.md`, treat its body as this-turn operating instructions, walk the loop inline.

Frontmatter follows the verified sibling contract: root `name` (= directory name), `description`, `license: Apache-2.0`; `metadata` block with `classification: utility`, quoted `version: "1.0.0"`, `updated`, `category: release` (or `workflow`), `frameworks: [triple-diamond]`, `author: product-on-purpose`; `phase` omitted; the `<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->` comment after the frontmatter. Required `references/TEMPLATE.md` (>= 3 `##` headers) and `references/EXAMPLE.md`.

Description word budget (resolves the lint-window finding): `lint-skills-frontmatter` enforces 20-100 words; the sibling conductor description is 88 words. The description carries ONLY the dual-dispatch + 5-client framing (~70-85 words) plus the non-proactive note. Input modes and run modes are described in the body (When to Use), NOT the description. Run `scripts/lint-skills-frontmatter.{sh,ps1}` against the drafted SKILL.md before tagging to confirm the count.

The description and a "Status summary" callout state the validated path plainly (cross-client section 6).

### 2.3 Producer handoff: `skills/foundation-prioritized-action-plan/SKILL.md` (v1.1.0)

The existing plan skill is the natural producer of a runnable Section 7. v2.24.0 adds a HANDOFF mode so the producer can offer to run its own output (full design in section 11). This is the THIRD component and gets its own spec.

---

## 3. Inputs and the parse contract

Two input modes. The canonical step source is the INPUT itself (not a static runbook).

### 3.1 Mode A: a saved prioritized-action-plan

The input is a `foundation-prioritized-action-plan` output. The orchestrator parses Section 7 into an ordered list of prompt blocks and runs them in document order.

Parse contract (resolves the multiple parser P0/CRITICAL findings; verified against the three bundled examples):

- Anchor on the prefix `#### To execute ` (NOT `#### To execute P<n>:` with a single number). Capture everything up to the next `####` or `##` as one block. This matches the real compound heading `#### To execute P1 and P2: design the probes as experiments` (verified in `skills/foundation-prioritized-action-plan/examples/02-interview-transcript.md`).
- Parse the P-token field as a SET, regex `P\d+(?:\s+and\s+P\d+)*`, never a single number.
- Treat Section 7 strictly as an ORDERED LIST of prompt blocks, never a `P1/P2/P3` keyed map. Multiple blocks sharing a P-level or a compound `Pn and Pm` heading are SIBLING next-actions on the same effort, NOT a producer/consumer chain (verified: `skills/foundation-prioritized-action-plan/examples/03-executive-ask.md` has two `P1` blocks - `define-problem-statement` and `discover-competitive-analysis` - that are parallel diagnostics, not a chain). The orchestrator does NOT thread one sibling's output into the next.
- Per block, classify it as one of three (resolves the parse-ambiguity finding):
  - RUNNABLE: has a `**Skill:** \`name\`` line whose name resolves against the installed skill set (section 8). Delegatable.
  - MANUAL: has a `**Prompt:**` blockquote but no resolvable backticked skill. Surfaced to the user, never delegated, does NOT consume a cap slot.
  - PARSE ERROR: has neither a resolvable skill nor a prompt body. Only this case is a hard parse failure.
- Capture the prompt as everything after `**Prompt:**` up to the next `####`/`##`, stripping leading `> `.

Top-3 cap (resolves the cap-counting finding): the cap counts RUNNABLE (skill-bearing) blocks in document order. The orchestrator takes the first 3 runnable blocks, lists all manual blocks separately, and stops delegating at 3. If Section 7 carries fewer than 3 runnable blocks (trimmed under length pressure, or efforts had no clean mapping), it runs what is present; the cap is an upper bound, not a target.

Cynefin domain extraction (resolves the two Cynefin-parse P0/CRITICAL findings; verified against all three examples which render `**Domain:** Complex. **Source:** S2, S3, S6, S7.`):

- Match the literal label `**Domain:**` on the Section 2 line, then scan the REMAINDER of that line for the FIRST whole-word occurrence of one of the four enum tokens (Clear, Complicated, Complex, Chaotic), case-insensitive, stopping at the first match. Tolerate a trailing period, inline `**Source:**`, and reasoning prose.
- Fallback: the Section 0 `**Situation classification:**` bullet, same first-whole-word-token strategy, ignoring the `(Cynefin)` parenthetical and the reasoning suffix.
- If zero or more than one distinct token appears ambiguously, do NOT guess: report the ambiguity and default to CHECKPOINTED (the safe posture). Never silently fall through to auto.

Overall plan confidence (Section 0 `**Overall plan confidence:**`): parse tolerantly, accepting hyphenated compounds (`Medium-High`, `Medium-Low`, `Low-Medium`) followed by ` - reasoning`. Confidence is surfaced in the run header; it does not gate autonomy in v2.24.0 (see residual questions).

### 3.2 Mode B: a user-named chain plus context

The user names an ordered list of skill names (for example `deliver-prd` then `deliver-user-stories`) plus free-form context. Each named skill becomes a step.

- No top-3 cap (resolves the Mode-B-cap finding and its internal contradiction): the full user-named chain is allowed. When the chain exceeds 3 steps, the orchestrator WARNS that context budget may be tight on non-Claude inline runs and recommends disk-write, but runs all named steps. It does NOT silently truncate user intent.
- No Cynefin domain in the input. The autonomy default falls back to the conservative posture (section 5).
- Skill resolution and refusals: section 8.

---

## 4. Run loop and state passing

### 4.1 Build the step list

Parse the input (section 3) into an ordered list of steps. Run pre-flight refusals (section 8) before any step executes.

### 4.2 Per-step loop

For each step `i`:

1. Compose the step input: the step's self-contained prompt (Mode A) or the named skill plus the user's context (Mode B). For Mode A, the prompt is already fully context-injected ("No placeholders," verified in TEMPLATE.md) and is run as-is; the orchestrator does NOT inject a prior step's artifact into it.
2. Delegate to the real downstream skill (section 6 for the dual mechanism). Never re-implement.
3. Classify the return as PRODUCED / EMPTY / FAILED (section 4.3) and capture the artifact (and write it to disk per section 4.4).
4. Checkpoint or continue per the run mode (section 5).
5. Advance to step `i+1`, or STOP.

Per-step output block (adapted from the conductor's per-gate contract):

```markdown
## Step {i} of {N}: {skill-name or "manual"} ({effort name})

**Delegation:** {Skill tool | inline execution | manual (no skill)}
**Result:** PRODUCED / EMPTY / FAILED / SKIPPED-MANUAL
{one-line summary of the artifact, or the failure/refusal narrative}

**Step status:** OK / STOP / WAITING-FOR-CONFIRMATION

{If OK + checkpointed:} Approve, edit, skip, or redo? Reply to advance to Step {i+1}.
{If STOP:} Halting. Resolve before re-invoking:
- {blocker}
```

### 4.3 Step-status classification (resolves the CRITICAL "the status signal does not exist" finding)

The stop-on-failed/empty guardrail does NOT depend on a downstream `status: pass/fail/refused` envelope. Verified: `deliver-prd` and the other content skills emit prose artifacts with no `## Status` block; only the four sub-agents emit the D26 Status YAML. The orchestrator is therefore the status AUTHORITY and classifies each return itself with a deterministic rubric:

- FAILED: the delegated call errored or refused at the tool/runtime layer, OR the returned text is an explicit refusal/error string.
- EMPTY: no artifact was returned, OR the artifact is a bare stub (the target skill's `references/TEMPLATE.md` structural `##` sections are present only as unfilled `[bracketed guidance]`). The orchestrator already reads each target skill's SKILL.md/template per step, so it can presence-check the expected sections.
- PRODUCED: a non-trivial artifact populating the target skill's expected structure.

EMPTY is never read as PASS. In GUARDED AUTO, EMPTY surfaces for confirmation (a forced checkpoint pause), never auto-advances; in CHECKPOINTED it prompts at the checkpoint like any OK step. (One verb throughout: an EMPTY step in GUARDED AUTO pauses and waits for the user, which is the same forced-checkpoint pause CHECKPOINTED applies. It is not a silent advance and it is not a hard halt; the user can clear it.) This rubric is the testable contract (section 9); it does not require retrofitting a status envelope onto the catalog (explicitly out of scope, section 10).

### 4.4 State passing (resolves the CRITICAL "threading is not grounded in any real input" finding)

Mode A Section 7 prompts are ORDERED-INDEPENDENT, not a chain. Each prompt is self-contained by design and does NOT expect an upstream artifact (verified: no canonical Section 7 has a producer/consumer relationship; the flagship deliver-prd to deliver-user-stories pair does not appear in any bundled plan). Therefore:

- Mode A: NO automatic output-to-input threading. The orchestrator runs prompts in document order and does NOT extract a structured handoff from one to feed the next. There is no per-skill handoff schema because Mode A needs none. (This dissolves the "handoff schema" open question entirely.)
- Mode B: threading only when the USER asserts a dependency by ordering the chain AND opting into it. The orchestrator does NOT infer a PRD-to-user-stories dependency from skill identity (resolves the "implied dependency cannot be detected" finding: no machine-readable dependency field exists; `deliver-user-stories` accepts a free-form feature description equally). If the user wants step N+1 to consume step N's output, they request it explicitly (a flag or chain syntax); the orchestrator then passes the prior artifact as a reference. Absent that, each named step is self-sufficient given the user's context.

Carried state is therefore minimal: the ordered step list (parsed once) plus, per completed step, the artifact reference and a one-line summary. This matches the conductor's "carry only the load-bearing state, re-derive the rest."

Disk-write and context budget (resolves the disk-write contradiction finding): the locked default is chat output. For any run of 2+ steps, the orchestrator AUTO-ENABLES disk-write to the gitignored `_pm-skills/plan-orchestrator/<run>/` as the context-budget mitigation (a narrowly scoped, stated exception, honoring "nothing published" since the path is gitignored). It writes `NN-<skill-name>.md` per step and keeps only a one-line summary per completed step in context. Single-step runs stay chat-only. When a downstream step does consume a prior artifact (Mode B user-declared), it reads it from the on-disk path; the path is the supplement, the inline structured reference is the primary channel.

User edit at a checkpoint (resolves the "user-edit mutates carried state" finding): `edit` and "user-supplied artifact" replace the captured step output ATOMICALLY - the orchestrator overwrites both its in-context capture and the on-disk file (when disk-write is on) before advancing. Invariant: a downstream step always reads the most recently confirmed version of the prior step, never a pre-edit copy.

### 4.5 Terminal outputs

Two terminal blocks, adapted from the conductor. On full completion: `## Plan run complete: {N} of {N} steps` with a per-step result table, a manual-steps list, and a next-steps note (deferred P4-P5 efforts, optional user-run review via utility-pm-critic). On halt: `## Plan run halted at Step {i} of {N}` with the stop reason, completed steps, and resume guidance.

Resume (resolves the "no skip-completed mechanism" finding): v2.24.0 ships option (a), the honest YAGNI cut - re-invoking restarts the run; persisted artifacts under `_pm-skills/plan-orchestrator/<run>/` are for the user's manual reference only. The halt output says this plainly; it does NOT advertise an auto-resume the loop cannot perform. (Auto-resume-by-detecting-existing-files is a future enhancement, residual question.)

---

## 5. Run modes and guardrails

Two modes, differing only in who confirms each advance. Both share the per-step contract, the stop-on-failure semantics, and the Cynefin floor.

### 5.1 CHECKPOINTED (default)

Pause after each `OK` step for explicit go/no-go. Per-step actions: approve, edit (amend then advance, atomically per 4.4), skip (mark skipped, advance with no artifact), redo (re-run). This is the conductor's built-in confirmation-pause mechanism (the pause lives in the output contract).

### 5.2 GUARDED AUTO (`--auto`, opt-in)

GUARDED AUTO is the opt-in autonomy mode, entered by the `--auto` flag (the flag is owned here, where the run-mode behavior lives, and is forwarded verbatim by the dispatch skill in `$ARGUMENTS`; do not define the opt-in mechanism only in the dispatch wrapper). It runs all steps without pausing on `OK`, with two guardrails:

1. A FAILED step STOPS the run (hard halt, terminal output); an EMPTY step surfaces for confirmation (a forced checkpoint pause, never an auto-advance and never a silent skip), per 4.3. Both are unconditional and outrank `--force-auto`.
2. Stay checkpointed for Complex/Chaotic plans unless `--force-auto`. The Cynefin domain comes from the plan (Mode A, section 3.1). For Mode B (no domain), GUARDED AUTO degrades to CHECKPOINTED and `--force-auto` is the only override (resolves the "Mode B no-domain default" finding: absence of a known-safe domain is treated like the unsafe domains; the orchestrator does NOT prompt the user to self-classify a domain).

Status-signal degradation (resolves the IMPORTANT "GUARDED AUTO is inert" finding): because content skills emit no machine status, a step the orchestrator classifies as PRODUCED auto-advances in GUARDED AUTO, but any EMPTY or ambiguous step surfaces for confirmation (a forced checkpoint pause) rather than auto-passed. The 4.3 rubric is what makes PRODUCED a confident classification; EMPTY/ambiguous always pauses. This keeps GUARDED AUTO useful (clean steps flow) while honoring "empty is not pass."

### 5.3 `--force-auto` precedence (resolves the precedence finding)

`--force-auto` flips Complex/Chaotic (and Mode-B-no-domain) plans from forced-checkpointed to auto. It is explicitly NOT a step-skip and does NOT bypass stop-on-failed/empty. Precedence, stated plainly: stop-on-failed/empty is unconditional and outranks `--force-auto` in all domains. On a Complex plan under `--force-auto`, an EMPTY or ambiguous step still surfaces for confirmation; `--force-auto` suppresses pauses only for unambiguously-PRODUCED steps. This deliberately keeps the escape hatch narrower than the conductor's removed `--skip-gates` (D24), so it does not re-introduce that bug class.

---

## 6. Cross-client behavior

Run mode (checkpointed vs auto) is orthogonal to mechanism (native vs inline). Mechanism is set by the client.

### 6.1 Claude Code (native)

The dispatch skill invokes the engine sub-agent; the engine delegates each step via the `Skill` tool to the real downstream skill. The engine runs in its own isolated context window; the per-step block and artifacts surface to the main chat.

Empirical-verification gate (resolves the HIGH "false precedent / unexercised path" finding): the conductor is cited ONLY for the run-loop/checkpoint/refusal SHAPE, never as proof the `Skill`-from-sub-agent MECHANISM works (the conductor uses the `Agent` tool; no repo agent has ever listed `Skill`). Before the spec depends on native sub-agent-to-skill delegation, a live smoke test must confirm (a) the engine can invoke a downstream skill via `Skill` in the installed plugin, and (b) whether that skill runs inline in the engine context or isolated. Context7 describes skills as "adding to your context window," which suggests inline; if so, the context-budget mitigation (disk-write + summarize-forward, 4.4) applies to the Claude Code path TOO, not only non-Claude. Until verified, the SKILL.md status block labels the native path EXPERIMENTAL, exactly as the conductor labels its non-Claude path.

### 6.2 Non-Claude clients (reference + execute inline)

No separate sub-agent context. The dispatch skill reads `agents/pm-workflow-orchestrator.md`, treats its body as operating instructions, and at each step reads the downstream skill's `SKILL.md` and executes its method inline in the same window. Both run modes apply inline.

Compatibility status (resolves the P0 "cross-client honesty" finding): the orchestrator ships EXPERIMENTAL on ALL non-Claude clients, INCLUDING Codex - not "DRY-RUN VALIDATED by inheritance." It is strictly harder than the conductor (it writes up to 3 full PM artifacts and may thread state), and no write-heavy multi-step inline flow has ever been live-validated off Claude Code. The 5th row added to `docs/reference/sub-agent-compatibility.md` says EXPERIMENTAL across non-Claude clients until a dedicated maintainer-gate test exercises a real multi-artifact inline run. An explicit open item is added: author that harness before claiming any non-Claude PRODUCTION status.

Tool-capability pre-flight (resolves the P1 "tool authorization is the real blocker" finding): the inline branch's FIRST action is a capability probe - before running step 1, verify the client can (a) write a file under `_pm-skills/plan-orchestrator/<run>/` and (b) run any Bash a downstream skill needs. If write access is unavailable, degrade explicitly to CHAT-ONLY mode (warn that multi-step reliability drops and context budget rises because full artifacts must stay in-window) or refuse with a clear message, rather than failing mid-chain. Per-client notes (Codex sandbox flag, Cursor/Gemini approval gates) go in Cross-Client Notes.

Dry-run as portability probe (resolves the P3 dry-run finding): `--dry-run` walks the step list and exercises parsing, checkpointing, stop-on-fail, and the tool-capability pre-flight WITHOUT invoking consequential downstream skills, emitting "NOT EXECUTED - dry run." On any EXPERIMENTAL client, the skill instructs running `--dry-run` FIRST as the readiness check, mirroring the conductor's "run dry-run first" guidance.

### 6.3 Mode symmetry for dispatch-skill steps

See section 7.2 - sub-agent-backed steps are inlined in BOTH modes, making the two paths genuinely symmetric (resolves the "parity claim is false" finding).

---

## 7. Governance and safety

### 7.1 Skill-tool delegation, no chain-permit entry

The engine delegates by invoking SKILLS via the `Skill` tool, which is NOT gated by `agents/_chain-permitted.yaml` (that allowlist governs only the `Agent` sub-agent-to-sub-agent tool). So:

- The engine lists `Skill, Read, Grep, Glob, Bash, Edit` and NOT `Agent`.
- No entry is added to `_chain-permitted.yaml`; it stays at its single `pm-release-conductor` entry.
- Depth-limit-2 (D14) is satisfied structurally: control-panel skill (0) to engine sub-agent (1) to downstream skills via `Skill` (skill invocation is not a sub-agent hop). The engine spawns zero sub-agents and is the chain root.

Locked-decision narrowing, ratified not buried (resolves the HIGH "silently drops the sub-agents clause" finding): the locked text says the engine "invokes the REAL downstream pm-skills/sub-agents ... via the Skill tool AND/OR chain-permitted sub-agents." This design narrows to Skill-tool-only and satisfies the "and/or sub-agents" clause for sub-agent-backed steps by INLINING the leaf agent (7.2), never by the `Agent` tool, because (i) Context7 says the `Agent` tool is stripped from nested sub-agent contexts to prevent recursion and (ii) adding the engine to `_chain-permitted.yaml` is a security-relevant change we are explicitly avoiding. This narrowing is recorded as an explicit decision note in the v2.24.0 plan so the maintainer ratifies it.

Enforcement reality (resolves the MEDIUM "allowlist is unenforced" finding): no `scripts/*chain*` enforcement exists (verified); `_chain-permitted.yaml` is manual-only. So nothing in CI would catch a future drift that added `Agent` to the engine. The v2.24.0 plan therefore adds an explicit pre-tag manual check: grep `agents/pm-workflow-orchestrator.md` and confirm `Agent` is absent from the tools line. The engine spec states positively: `tools: Skill, Read, Grep, Glob, Bash, Edit - and explicitly NOT Agent`.

### 7.2 Dispatch-skill and workflow steps (resolves the CRITICAL "hidden sub-agent chain through a recommendable dispatch skill" finding)

`utility-pm-critic` is a Tier-2 recommendable skill (verified, `recommendable-tiers.md` line 38) AND a dispatch skill whose Claude Code branch @-mentions the `pm-critic` SUB-AGENT. So a Mode A plan can legitimately hand the engine a step that, if invoked as a native skill, would try to spawn a second sub-agent from inside the already-nested engine - exactly the depth-3 hop the `Agent` strip would block at runtime, routed through a skill to bypass the allowlist.

Resolution - the engine runs a mandatory pre-flight step classification on every resolved target:

- Category 1, content skills (30 phase + the core foundation artifacts, plus `tool-note-and-vote`, `utility-mermaid-diagrams`, `utility-slideshow-creator`): safe to invoke via the `Skill` tool.
- Category 2, DISPATCH skills that fan out to a sub-agent (`utility-pm-critic` is the only Tier-2 one; the Tier-3 maintenance dispatch skills are already refused, section 8): the engine MUST NOT invoke these as a native skill. Instead it INLINES the leaf agent - reads `agents/pm-critic.md` and executes its flow inline in the engine's own context (the same reference-and-execute-inline technique the non-Claude branch uses), capturing the leaf's output. This preserves depth-2 (the engine spawns zero sub-agents, directly or transitively) and makes both client modes symmetric (resolves the parity finding: non-Claude already inlines the leaf; Claude Code now does too).
- Category 3, workflow/composite skills (`workflow-*` commands, Foundation/Design Sprint family entry points): treated as a special case (resolves the "nested orchestration breaks the cap" finding). The engine does NOT nest a full workflow inside a run. It surfaces such a step as MANUAL ("this step is a full workflow; run the curated `workflow-*` separately"). Stated as a YAGNI cut: nested orchestration is out of scope for v2.24.0.

Named YAGNI rule recorded in the spec: "the orchestrator never delegates to a dispatch skill that spawns a sub-agent, nor nests a workflow; depth-2 is preserved because the engine spawns zero sub-agents, directly or transitively-through-a-skill."

### 7.3 Proactive firing out of scope

Explicit invocation only, modeled on the conductor ("NOT proactive"). Safety comes from the per-step checkpoints (which pause regardless of how the run started), not from restricting the invocation surface. The engine description must not contain "use proactively" / auto-trigger phrasing (copy-paste hazard flagged, since pm-critic's frontmatter does carry it).

### 7.4 Output and persistence

Chat by default; auto disk-write for 2+ step runs to the gitignored `_pm-skills/plan-orchestrator/<run>/` (section 4.4). Nothing published; all artifacts are markdown drafts. `validate-gitignore-pm-skills.{sh,ps1}` asserts `_pm-skills/` stays ignored; no action beyond not un-ignoring it.

---

## 8. Error handling and edge cases

Two governing principles: empty is not pass (4.3); stop, do not skip (every failure STOPS and surfaces a blocker; `--force-auto` never bypasses it).

### 8.1 Pre-flight refusals (before any step runs)

- Mode A: no plan supplied, file missing/unreadable, or no parseable `## Section 7` block -> refuse with the specific reason; do not invent a step list. A Section 7 present but with zero RUNNABLE blocks -> treat as an empty chain (refuse rather than emit an empty run).
- Mode B: empty chain -> refuse. Each named skill validated before the run (8.2).
- Self-reference (both modes): a Mode B chain naming `utility-pm-workflow-orchestrator` (self) is refused to prevent recursion, mirroring how the plan skill lists itself in Tier-3 (resolves the self-reference finding). The Mode A side is symmetric: a Mode A plan whose Section 7 names `foundation-prioritized-action-plan` or `utility-pm-workflow-orchestrator` is ALSO refused at pre-flight, closing the producer-handoff loop on both sides (section 11.4; engine spec section 6 "Pre-flight refusals," the Self-reference bullet; W3 handoff spec section 2.5). Neither side can enqueue itself or its producer.

### 8.2 Mode B skill resolution (resolves the cross-client resolution + the "tier-doc referential-discipline" findings)

Validation source is the ACTUAL installed skill set, not another skill's recommendation tiers:

- Claude Code: filesystem/Glob check for `skills/<name>/SKILL.md`.
- Non-Claude inline: attempt to read `skills/<name>/SKILL.md` by relative path; if not readable in that client's sandbox, fall back to the in-repo `skills/foundation-prioritized-action-plan/references/skill-catalog.md` (a readable name list). If NEITHER method is available, refuse Mode B with "cannot validate skill names on this client" rather than running unvalidated.
- Unknown name -> refuse, naming the offending entry; apply name-safety (never approximate/auto-correct).
- Tier-3 maintenance machinery (`utility-pm-skill-*`, `utility-pm-release-conductor`, `utility-pm-changelog-curator`, `utility-update-pm-skills`, and the plan skill itself) -> refuse as "library-maintenance machinery, not a PM work product." This refusal list is an orchestrator-OWNED reference (copied into the orchestrator's own reference doc, derived from `classification: utility` + the maintenance set), NOT reached into the plan skill's private references at runtime.
- The Tier-2 "hand off to family entry point" RECOMMENDATION rule is NOT imported as a RUN restriction: a user naming an individual `tool-foundation-sprint-basics` step in Mode B is a legitimate choice and is allowed (resolves the referential-discipline finding that conflated recommendation phrasing with run legality). Only full workflow/composite entry points are surfaced as manual (7.2 category 3).
- Validation is all-or-nothing at pre-flight: any invalid/refused name halts the whole run before step 1.

### 8.3 Failed / empty / refused step

- FAILED or REFUSED -> STOP; emit full output plus a blocker block; do not proceed.
- EMPTY-but-clean -> in CHECKPOINTED, present at the checkpoint for the user to confirm; in GUARDED AUTO, surface for confirmation (a forced checkpoint pause; this is the same wait CHECKPOINTED applies, not a hard halt). Never read as pass, never auto-advanced. (Contrast: a FAILED step is a hard halt with a blocker block; an EMPTY step pauses and the user can clear it.)
- Disambiguator is the 4.3 rubric (orchestrator-owned), not a downstream status field.

### 8.4 Plan step with no clean skill mapping

Iterate only RUNNABLE blocks; list MANUAL blocks for the user; never invent a skill to fill a gap.

### 8.5 Missing dependency

The orchestrator does NOT infer cross-step artifact dependencies (4.4). A stop on a missing dependency fires ONLY when the user explicitly declared a Mode B dependency and the prior step did not produce the artifact; it never fabricates or stubs a missing artifact, and never blocks a step that would run on the user's inline context.

### 8.6 User aborts mid-chain

Abort at any checkpoint STOPS cleanly; completed artifacts are preserved and surfaced (chat plus any on disk); nothing is rolled back or published; the orchestrator reports where it stopped.

---

## 9. Testing and hygiene surface

### 9.1 Testing strategy (non-determinism split)

Deterministic control-logic tests (the bulk, fixture-driven, per-PR):

- Pre-flight refusals: missing/invalid Mode A plan; Mode B naming an unresolvable skill; self-reference; empty chain.
- Section 7 parsing fixtures (MANDATORY, built from the real bundled examples that exercise the hazards): `examples/02-interview-transcript.md` (compound `P1 and P2` heading), `examples/03-executive-ask.md` (two `P1` sibling prompts, Complex domain), `references/EXAMPLE.md` (Complicated, Medium-High, P1 then P3 with no P2), plus a SYNTHETIC skill-less block to exercise the MANUAL tolerate path and a SYNTHETIC interleaved manual+skill Section 7 to assert the cap counts skill-bearing blocks only. Assert: ordered tuple list (not a P-map); compound/duplicate P handled; top-3 counts runnable blocks; siblings NOT threaded.
- Cynefin extraction fixtures: assert the extracted token is exactly `Complex`/`Complicated` (not `Complex.`) from the inline `**Domain:** X. **Source:** ...` shape; assert ambiguous/absent -> CHECKPOINTED. Cover all four enum branches (resolves the MINOR "Clear/Chaotic untested" finding): reuse `skills/foundation-prioritized-action-plan/eval/fixtures/cynefin-fixtures.md` if it carries Clear/Chaotic-labelled inputs, else author two synthetic Section-2 fixtures. Assert Clear/Complicated -> auto runs; Complex/Chaotic -> forced checkpoint unless `--force-auto`.
- Step-status rubric (4.3): pass-with-output -> PRODUCED (advance); stub/empty -> EMPTY (stop in auto, pause in checkpointed); error/refusal text -> FAILED (stop). The orchestrator-owned rubric is the contract under test, NOT a downstream status field.
- `--force-auto`: ONLY flips checkpointed -> auto for Complex/Chaotic/no-domain; a failed/empty step STILL stops under `--force-auto`.

Non-deterministic end-to-end (manual/scheduled, never per-PR): real delegation is model-run; `--dry-run` is the deterministic CI surface and the cross-client readiness probe. One committed EXAMPLE.md walks a single checkpointed run on the storevine thread (this is also the library sample).

Tie-in to the output-eval-harness (`docs/internal/release-plans/_unreleased/output-eval-harness.md`, UNRELEASED): the orchestrator inherits Tier 1 invariants over its committed sample; it does NOT ship its own quality validator. The harness remains a separate, later, advisory-first effort; v2.24.0 must not block on it. The orchestrator's own gates stay STRUCTURAL.

### 9.2 Hygiene and registration surface (every file v2.24.0 touches)

Corrected baseline (resolves the IMPORTANT count-error finding): the orchestrator is a UTILITY skill, so foundation stays 9 (UNCHANGED), utility goes 10 -> 11, total skills 64 -> 65, sub-agents 4 -> 5, version 2.23.0 -> 2.24.0. Re-derive every aggregate from this corrected baseline (audit-aggregate-counters rule). The current main breakdown is `30 phase + 9 foundation + 10 utility + 15 tool` = 64; after v2.24.0 it is `30 phase + 9 foundation + 11 utility + 15 tool` = 65.

New source components:
- `agents/pm-workflow-orchestrator.md` (engine).
- `skills/utility-pm-workflow-orchestrator/SKILL.md` + `references/TEMPLATE.md` (>= 3 `##`) + `references/EXAMPLE.md` + `references/PARSE-CONTRACT.md` (shared parse/status contract per 2.1).

Producer-skill edits (the THIRD component, section 11):
- `skills/foundation-prioritized-action-plan/SKILL.md` - add the HANDOFF mode prose, the `--run` / `--force-auto` flags, and the producer-to-consumer pointer; bump `metadata.version` `"1.0.0"` -> `"1.1.0"` and `updated`.
- `skills/foundation-prioritized-action-plan/HISTORY.md` - NEW file (the skill's first HISTORY.md), recording the 1.1.0 additive-minor entry and the deliberate D9-reopening note.

Library sample (resolves the conflicting placement findings - decision LOCKED): place the single-thread sample in `library/sub-agent-samples/pm-workflow-orchestrator/`, alongside the four existing dispatch-skill siblings (critic/auditor/curator/conductor), and update `library/sub-agent-samples/README.md` (4 -> 5). Rationale: the orchestrator is the FIFTH dispatch skill of that exact family; keeping it with its siblings avoids splitting the family across two trees. It does not auto-flow into `generate-showcase.py` (neither do the other four). The `check-skill-sample-coverage` exemption still applies and needs no script edit: verified, `in_scope_class()` returns false for the `utility` classification (it gates only discover/define/develop/deliver/measure/iterate/foundation/tool) - cite THIS mechanism in the spec, not a fabricated sub-agent-samples clause (resolves the LOW "misdescribed exemption" finding). Because the sample is NOT in `skill-output-samples/`, `README_SAMPLES.md` sample tallies do NOT change for the sample; only the catalog skill-count (64 -> 65) updates where it appears.

AGENTS.md (two edits, `validate-agents-md` enforced):
- Add the utility skill under `### Utility Skills` as `#### pm-workflow-orchestrator` with `**Path:** skills/utility-pm-workflow-orchestrator/SKILL.md`.
- Add the engine under `## Sub-Agents`. Note (resolves the LOW silent-validator finding): the basename substring check is auto-satisfied by the skill path line (`...utility-pm-workflow-orchestrator...` contains `pm-workflow-orchestrator`), so the dedicated Sub-Agents prose entry is NOT CI-protected and must be added by hand and verified in the pre-tag manual pass. Fix line 450 ("Four sub-agents ship in v2.16.0:") by adding the 5th agent under the current slate while preserving the historical v2.16.0 framing - do NOT blindly write "Five sub-agents ship in v2.16.0."

Governance file: NO `_chain-permitted.yaml` edit (7.1). Add the pre-tag manual grep confirming `Agent` absent from the engine tools line.

Counts to sweep (64 -> 65; utility 10 -> 11; foundation 9 unchanged; sub-agents 4 -> 5). The TOTAL (65) and the badge are gate-enforced by `check-count-consistency` + `check-landing-page-counts --strict`; the per-classification breakdown (foundation 9, utility 11, phase 30, tool 15) and the sub-agent count (5) are enforced by NO validator and are a MANUAL pre-tag sweep (verified: `check-count-consistency` excludes subset descriptors, `check-landing-page-counts` checks only the total, and `sub-agent` is not a checked resource). Surfaces: README.md (total prose + At-a-Glance total are gated; the badge `Foundation-N_skills`, the mermaid `N skills` nodes + the `Cross-Cutting Capabilities (N skills)` aggregate, the TOC anchor, and the `Foundation Skills ... (N)` header are MANUAL breakdown edits), `.claude-plugin/plugin.json` + `.claude-plugin/marketplace.json` + `.codex-plugin/plugin.json` descriptions (the total is gated, the embedded breakdown and the `4 sub-agents (...)` name list are MANUAL), `docs/index.mdx` (lines 3/10 total gated; lines 178/180 `Foundation (8)` / `Utility (10)` parentheticals are MANUAL), `docs/skills/index.md` (HAND-EDITED, NOT generated - the top-level file carries no `generated: true` marker and `generate-skill-pages.py` never writes `OUTPUT_DIR / index.md`; hand-edit the `64 PM skills` headline, the `Foundation | 8` and `Utility | 10` rows), `docs/reference/project-structure.md` (line 25 internally inconsistent NOW at "63 total" summing to 64; line 41 header; line 121 `(10 utility)` sub-head MANUAL), CLAUDE.md, QUICKSTART.md (lines 5 and 74 stale on two axes: total 63 and foundation 8), `docs/guides/creating-pm-skills.md` if it carries a count. Full enumerated targets are in the plan's "Count sweep" section.

Versions (2.23.0 -> 2.24.0): `.claude-plugin/plugin.json` (source of truth), `.claude-plugin/marketplace.json` (NOT repo-root; the file lives under `.claude-plugin/`), `.codex-plugin/plugin.json`, README badge + At-a-Glance row. `validate-version-consistency` checks ONLY the `version` field; the description prose count and the embedded sub-agent name list in `.claude-plugin/plugin.json` / `.claude-plugin/marketplace.json` are MANUAL. NOT `package.json` (docs-site, stays 0.1.0). The plan skill's own `metadata.version` 1.0.0 -> 1.1.0 is a per-skill bump, independent of the catalog version.

CHANGELOG and release docs: root `CHANGELOG.md` `## [2.24.0]`; `docs/changelog.md` mirror; new `docs/releases/Release_v2.24.0.md`; `docs/releases/index.md` new row; README "What's New" `<details>` block (inside the count-exempt guard) + release-history table row. The CHANGELOG entry lists THREE changes: the new sub-agent, the new dispatch skill, and the plan skill's HANDOFF mode.

Generated pages (regenerate, do NOT hand-edit; `check-generated-content-untouched` diff-enforced): `scripts/generate-skill-pages.py` (creates `docs/skills/utility/utility-pm-workflow-orchestrator.md`, regenerates the PER-CLASSIFICATION index pages written via `OUTPUT_DIR / group / "index.md"` and `docs/reference/commands.md`); `generate-showcase.py` (no change, sample not in skill-output-samples); `generate-workflow-pages.py` (no change). NOTE: the top-level `docs/skills/index.md` is NOT generated (verified: `generate-skill-pages.py` never writes `OUTPUT_DIR / "index.md"` and that file has no `generated: true` marker) - it is a HAND-EDITED count surface swept in the counts paragraph above.

Sub-agent catalog docs (hand-maintained, add 5th row): `docs/reference/runtime-components.md` (table + "4 sub-agents ship" prose + invocation examples); `docs/reference/sub-agent-compatibility.md` (per-client matrix with the orchestrator EXPERIMENTAL on all non-Claude clients per 6.2).

Roadmap reconciliation: update `docs/concepts/active-orchestration.md` lines 56/69 and `skills/utility-pm-critic/SKILL.md` line 63 (the `pm-workflow-orchestrator (v2.17)` forward-references) to "shipped v2.24.0."

New sub-agent doc note: add the sub-agent-to-skill composition path to `docs/concepts/sub-agents.md` or `docs/contributing/sub-agent-design-patterns.md` (first repo agent to invoke skills).

Internal release-plan artifacts (tracked, `docs/internal/release-plans/v2.24.0/`): `plan_v2.24.0.md`, THREE specs (engine + dispatch skill + plan-handoff, one per component), optional `skills-manifest.yaml`.

Context currency (post-tag): bump `_agent-context/claude/CONTEXT.md` and `_agent-context/codex/CONTEXT.md` to v2.24.0.

Pre-tag gate: `scripts/pre-tag-validate.{sh,ps1} --strict` on a clean tree, plus `utility-pm-skill-validate --strict` on the new skill AND the modified plan skill, plus the manual `Agent`-absent grep and the manual AGENTS.md Sub-Agents-prose check.

SemVer: ADDITIVE MINOR -> v2.24.0.

---

## 10. Scope / YAGNI cuts

- No autonomous goal-seeking. Runs a given step list; never invents goals.
- No dynamic re-planning. The step list is fixed at run start; on failure it stops, it does not route around.
- No output-to-input threading in Mode A. Section 7 prompts are ordered-independent and self-contained; no handoff extraction, no per-skill handoff schema.
- No inferred dependencies in Mode B. Cross-step consumption is user-declared only; the orchestrator never infers a PRD-to-user-stories dependency from skill identity.
- No nested orchestration. Workflow/composite/dispatch-fan-out steps are surfaced as manual or inlined-at-leaf (7.2), never nested.
- No proactive firing. Explicit invocation only - true for the engine AND the plan skill's handoff (the handoff offers, it never auto-runs; section 11).
- Top-3 cap on Mode A only (inherited from Section 7); Mode B runs the full named chain with a context-budget warning past 3.
- `--force-auto` is a narrow autonomy escape hatch, never a gate-skip; stop-on-failed/empty outranks it always.
- No new chain-permission surface. Skill-tool delegation only; no `Agent` tool, no `_chain-permitted.yaml` entry; sub-agent-backed steps are handled by leaf-inlining, not chaining.
- No auto-resume in v1. Re-invoke restarts; persisted artifacts are for manual reference only.
- No downstream status-envelope retrofit. The orchestrator self-classifies step status; adding Status YAML to the content skills is a separate, out-of-scope effort.
- No non-Claude PRODUCTION claim. All non-Claude clients ship EXPERIMENTAL until a dedicated maintainer-gate test exercises a real multi-artifact inline write run.

---

## 11. Producer handoff: foundation-prioritized-action-plan v1.1.0 (THIRD component)

### 11.1 What it adds

The plan skill is the natural producer of a runnable Section 7. v2.24.0 adds a HANDOFF mode so the producer can offer to run its own output without the user having to discover and invoke a separate skill. After producing a plan, the skill:

1. Informs the user, in a short closing line, that it can run the plan it just produced (the runnable Section 7 prompts) through `utility-pm-workflow-orchestrator`.
2. On ONE explicit confirmation, hands the plan to `utility-pm-workflow-orchestrator` in CHECKPOINTED mode (the safe posture; the user still confirms each step inside the orchestrator).
3. Supports a `--run` flag: produce-the-plan-and-hand-off in one shot, still CHECKPOINTED by default. A further `--force-auto` (passed through to the orchestrator) skips the per-step pauses for unambiguously-PRODUCED steps, subject to the same Cynefin floor and stop-on-failed/empty guardrails (sections 5.2 and 5.3). The plan skill never relaxes those guardrails; it only forwards the flag.

The handoff is a one-confirmation gate (or one flag) into the dedicated, governed orchestrator. The plan skill itself still does no inline execution of work-skills.

### 11.2 Deliberate D9 reopening (decision note)

The plan skill's locked decision D9 (recorded in `docs/internal/release-plans/v2.23.0/plan_v2.23.0.md` as "D9 | Cross-skill invocation | deferred (out of scope)") established the skill as recommend-only: it "Recommends a bounded, tiered set of downstream pm-skills ... never invokes them inline" (`skills/foundation-prioritized-action-plan/SKILL.md`). v2.24.0 DELIBERATELY and CLEANLY re-opens D9, with a narrow and principled reframing rather than a reversal:

- The plan skill STILL never runs work-skills inline. It does not execute `deliver-prd`, `discover-competitive-analysis`, or any Section 7 target itself.
- What changes: it OFFERS to delegate, and on explicit confirmation HANDS the plan to the dedicated, governed orchestrator. Execution happens entirely inside `utility-pm-workflow-orchestrator`, behind that skill's own per-step checkpoints, refusals, and Cynefin floor.
- The recommend/execute boundary therefore moves from "the plan skill never causes execution" to "the plan skill never executes inline, and only ever causes execution through one explicit confirmation into the governed orchestrator." This is the original safety intent of D9 (no surprise, no unsupervised fan-out from the producer) honored by a different mechanism, not abandoned.

This reopening is recorded as a deliberate decision note in BOTH the v2.24.0 plan (`docs/internal/release-plans/v2.24.0/plan_v2.24.0.md`) and the new `skills/foundation-prioritized-action-plan/HISTORY.md` 1.1.0 entry, so the change to D9 is ratified in the open and traceable, not silently overwritten.

### 11.3 Versioning and HISTORY

- `metadata.version` `"1.0.0"` -> `"1.1.0"` (ADDITIVE MINOR: a new optional mode and flags; no existing behavior removed - a user who ignores the offer gets the exact v1.0.0 experience).
- `metadata.updated` bumped to the ship date.
- New `skills/foundation-prioritized-action-plan/HISTORY.md` (the skill's FIRST history file), backfilling the 1.0.0 origin line (shipped v2.23.0) and adding the 1.1.0 HANDOFF entry with the D9-reopening note.

### 11.4 Self-reference safety

The producer-to-consumer pointer always targets `utility-pm-workflow-orchestrator` and never names the plan skill or itself as a runnable step. The orchestrator's own pre-flight already refuses a Mode A plan whose Section 7 names `foundation-prioritized-action-plan` or `utility-pm-workflow-orchestrator` (sections 8.1 and 8.2), so the loop is closed on both sides: the producer cannot enqueue itself, and the consumer would refuse it if it appeared.

### 11.5 Hygiene tie-in

The plan-skill edits are folded into the section 9.2 surface: the SKILL.md edit, the new HISTORY.md, the per-skill version bump, the producer-to-consumer pointer, a third CHANGELOG line, and a third internal spec (`spec_prioritized-action-plan-handoff.md`). `utility-pm-skill-validate --strict` runs against the modified plan skill as well as the new orchestrator skill.

---

## 12. Residual open questions

1. Native sub-agent-to-skill delegation must be empirically smoke-tested on the current Claude Code runtime before the spec depends on it: confirm (a) the engine can invoke a downstream skill via the `Skill` tool in the installed plugin and (b) whether the skill runs inline in the engine's context (Context7 implies inline, which would extend the disk-write context-budget mitigation to the Claude Code path too) or isolated. Until verified, the native path ships EXPERIMENTAL.
2. Whether low Overall plan confidence (Section 0, compound values like `Medium-High`) should ALSO force checkpointed behavior independent of the Cynefin domain. Not part of the locked decision; left out of v2.24.0. If later adopted, the parser already tolerates compounds.
3. Auto-resume after halt: v2.24.0 ships restart-only (persisted artifacts for manual reference). A future enhancement could detect existing `NN-<skill>.md` files in the `<run>` directory on re-invoke and skip completed steps. Maintainer decision on whether this is worth a follow-up.
4. Authoring the dedicated maintainer-gate testing harness for the orchestrator's inline WRITE path (multi-artifact, state-threading) on each non-Claude client, required before any non-Claude client can move from EXPERIMENTAL to PRODUCTION in `docs/reference/sub-agent-compatibility.md`.

(The component-naming question is RESOLVED and removed: engine = `pm-workflow-orchestrator`, dispatch skill = `utility-pm-workflow-orchestrator`, honoring the published v2.17 roadmap promise; the three roadmap references are updated as in-scope work, section 1.)
