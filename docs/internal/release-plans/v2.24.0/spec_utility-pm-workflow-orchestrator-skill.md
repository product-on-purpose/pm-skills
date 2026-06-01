# Spec: `utility-pm-workflow-orchestrator` (dispatch skill)

**Status:** SPEC / build-ready. Derived from the approved design.
**Date:** 2026-06-01
**Parent design:** [`design_plan-orchestrator.md`](design_plan-orchestrator.md) (sections 2.2, 4, 5, 6, 8)
**Master plan:** [`plan_v2.24.0.md`](plan_v2.24.0.md)
**Target release:** v2.24.0 (additive MINOR)
**Component:** 2 of 3 (engine sub-agent, THIS dispatch skill, plan-handoff). The engine spec is `spec_pm-workflow-orchestrator-engine.md`; the plan-handoff spec is `spec_prioritized-action-plan-handoff.md`.
**Pattern siblings:** [`skills/utility-pm-release-conductor/SKILL.md`](../../../../skills/utility-pm-release-conductor/SKILL.md) (structural model), plus the three other dispatch skills (`utility-pm-critic`, `utility-pm-skill-auditor`, `utility-pm-changelog-curator`).

This is the dispatch ("control-panel") component: the cross-client user interface that dispatches to the native engine sub-agent on Claude Code, or reads the engine definition and runs the loop inline on every other client. It owns no execution logic of its own beyond runtime detection, the dual-mode dispatch, the tool-capability pre-flight, the `--dry-run` readiness probe, and the honest status surface. The parse contract, run loop, step-status rubric, and refusals are the engine's; both the engine and this skill's inline branch read them from one shared reference file (`references/PARSE-CONTRACT.md`) to avoid prompt/inline drift (D12 referential discipline).

---

## 1. Purpose

`utility-pm-workflow-orchestrator` is the cross-client front door to the plan orchestrator. It does the same job for the orchestrator that `utility-pm-release-conductor` does for the release conductor: detect the runtime, dispatch to the native sub-agent where one exists (Claude Code), and reference-and-execute the same behavior inline where it does not (every non-Claude client).

The orchestrator runs an ordered sequence of pm-skills against a single input - either a saved `foundation-prioritized-action-plan` (Mode A) or a user-named chain plus context (Mode B) - pausing for human go/no-go by default and refusing to advance past a failed or empty step. This skill is the user-facing surface for that engine; the engine system prompt lives at `agents/pm-workflow-orchestrator.md`.

Two non-negotiable honesty commitments distinguish this skill from a copy of the conductor's:

- The orchestrator ships **EXPERIMENTAL on ALL non-Claude clients, including Codex** (design section 6.2), not "DRY-RUN VALIDATED by inheritance." It writes up to three full PM artifacts and may thread state, which is strictly harder than the conductor and has never been live-validated off Claude Code.
- Until a live smoke test confirms native sub-agent-to-skill delegation via the `Skill` tool works in the installed plugin (design section 12 residual question 1), even the Claude Code native path ships **EXPERIMENTAL**, exactly as the conductor labels its non-Claude path.

## 2. Skill identity

- **Classification:** `utility` (a dispatch wrapper, not a PM work product). This is why the skill is exempt from the three-thread sample requirement (section 9.3).
- **Family:** the FIFTH dispatch skill of the `utility-pm-{role}` family (critic, auditor, curator, conductor, orchestrator).
- **Invocation lifetime:** spans the full run; many steps and confirmation pauses.
- **Execution model:** DELEGATE. Dispatches to the engine sub-agent (Claude Code) or reads `agents/pm-workflow-orchestrator.md` and walks the loop inline (non-Claude). Never re-implements skill methods, never authors PM artifacts itself.
- **Proactive:** NO. Explicit invocation only, modeled on the conductor. The description carries no "use proactively" phrasing (design section 7.3, copy-paste hazard flagged because `pm-critic`'s frontmatter does carry it).
- **Composes with:** the engine (`agents/pm-workflow-orchestrator.md`), the shared `references/PARSE-CONTRACT.md`, and `skills/foundation-prioritized-action-plan/` (its producer, which hands plans to this skill in v1.1.0 HANDOFF mode).

## 3. Component design

### 3.1 Three pieces (design section 2.2)

The skill body is three pieces, structurally mirroring `utility-pm-release-conductor`:

1. A lightweight prose **"Runtime detection step"** line (no programmatic probe; the model reads the client signals it already has).
2. A Claude Code **native-dispatch H3 branch**: invoke `@agent-pm-skills:pm-workflow-orchestrator` with the input plus flags from `$ARGUMENTS`, relay the engine's per-step output to the main chat.
3. A non-Claude **inline-execution H3 branch**: read `agents/pm-workflow-orchestrator.md`, treat its body as this-turn operating instructions, read `references/PARSE-CONTRACT.md`, run the tool-capability pre-flight, then walk the loop inline.

### 3.2 Dual-mode runtime detection (design section 6)

Run mode (CHECKPOINTED vs GUARDED AUTO) is orthogonal to mechanism (native vs inline); mechanism is set by the client, run mode by the user's flags. The detection step routes to exactly one of the two H3 branches.

**Claude Code (native):** the skill invokes the engine sub-agent; the engine delegates each step via the `Skill` tool to the real downstream skill, runs in its own isolated context window, and surfaces the per-step block and artifacts back to the main chat. Because the empirical-verification gate (design section 6.1) is not yet closed, the skill labels this path EXPERIMENTAL and instructs running `--dry-run` first.

**Non-Claude (reference + execute inline):** no separate sub-agent context. The skill reads `agents/pm-workflow-orchestrator.md`, treats its body as operating instructions, and at each step reads the downstream skill's `SKILL.md` and executes its method inline in the same window. Both run modes apply inline. This is the same "reference + execute inline" pattern the conductor's non-Claude branch uses, scaled to a write-heavy multi-artifact flow.

### 3.3 Tool-capability pre-flight (design section 6.2)

The inline branch's FIRST action, before parsing or running step 1, is a capability probe. It verifies the client can:

1. write a file under `_pm-skills/plan-orchestrator/<run>/`, and
2. run any Bash a downstream skill needs.

Outcomes:

- **Both available:** proceed normally (disk-write auto-enabled for 2+ step runs per engine section 4.4).
- **Write unavailable:** degrade explicitly to **CHAT-ONLY mode** - warn that multi-step reliability drops and context budget rises (full artifacts must stay in-window), then proceed for single-step or short runs; OR refuse with a clear message for long runs, rather than failing mid-chain.
- **Bash unavailable** for a step that needs it: surface that step as blocked at its boundary rather than crashing.

Per-client notes (Codex sandbox flag, Cursor / Gemini approval gates) live in the skill's "Cross-Client Notes" section, not in the dispatch logic.

### 3.4 `--dry-run` readiness probe (design section 6.2)

`--dry-run` walks the step list and exercises parsing, checkpointing, stop-on-fail, and the tool-capability pre-flight WITHOUT invoking consequential downstream skills, emitting "NOT EXECUTED - dry run" per step. On any EXPERIMENTAL client (which is all of them at v2.24.0 ship, native included until the smoke test closes), the skill instructs running `--dry-run` FIRST as the readiness check, mirroring the conductor's "run dry-run first" guidance. `--dry-run` is the deterministic CI surface (design section 9.1); live delegation is model-run and tested manually.

### 3.5 EXPERIMENTAL status surface (design sections 6.1, 6.2)

A "Status summary" callout near the top of the body states the validated path plainly:

- Native Claude Code path: EXPERIMENTAL until the `Skill`-from-sub-agent smoke test closes (residual question 1).
- All non-Claude clients (Codex, Cursor, Windsurf, Copilot, Gemini): EXPERIMENTAL until a dedicated maintainer-gate test exercises a real multi-artifact inline WRITE run (residual question 4).

The callout points at `docs/reference/sub-agent-compatibility.md` (the 5th row added by v2.24.0) as the canonical matrix, and instructs `--dry-run` first on any EXPERIMENTAL client.

---

## 4. Frontmatter draft

The frontmatter follows the verified sibling contract (`utility-pm-release-conductor`): root `name` equal to the directory name, single-line `description`, `license: Apache-2.0`; a `metadata` block with `classification: utility`, quoted `version: "1.0.0"`, `updated`, `category`, `frameworks: [triple-diamond]`, `author: product-on-purpose`; `phase` omitted; the PM-Skills HTML comment after the frontmatter.

```yaml
---
name: utility-pm-workflow-orchestrator
description: Run an ordered sequence of pm-skills against one input via the pm-workflow-orchestrator sub-agent, pausing for go/no-go and stopping on a failed or empty step. Dispatches natively on Claude Code with the pm-skills plugin (invokes @agent-pm-skills:pm-workflow-orchestrator, which delegates each step through the Skill tool); on non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI) reads agents/pm-workflow-orchestrator.md and walks the loop inline after a tool-capability pre-flight. Explicit invocation only; never fires proactively. EXPERIMENTAL on all non-Claude clients and on the native path until smoke-tested; run --dry-run first.
license: Apache-2.0
metadata:
  classification: utility
  version: "1.0.0"
  updated: 2026-06-01
  category: workflow
  frameworks: [triple-diamond]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
```

### 4.1 Description word budget (design section 2.2)

`scripts/lint-skills-frontmatter.{sh,ps1}` enforces 20-100 words on the description. The sibling conductor description is 88 words. The draft above is approximately 90 words and carries ONLY the dual-dispatch plus 5-client framing, the non-proactive note, and the EXPERIMENTAL plus `--dry-run` flag. Input modes (Mode A / Mode B) and run modes (CHECKPOINTED / GUARDED AUTO) are described in the body (When to Use), NOT in the description. The builder MUST run `scripts/lint-skills-frontmatter.{sh,ps1}` against the drafted SKILL.md and confirm 20-100 words before tagging; trim from the per-client list first if over.

### 4.2 `category` choice

`category: workflow` (the skill orchestrates a multi-skill workflow). The conductor uses `category: release`; `workflow` is the closer fit here and is an accepted value. If the validator constrains the category enum, fall back to `release` to match the sibling rather than introduce a new token.

---

## 5. Body draft

The body is a build-ready draft. It mirrors the conductor's section order (Status summary, When to Use, When NOT to Use, Instructions with two H3 branches, Cross-Client Notes, Reference Files) and adds the tool-capability pre-flight and `--dry-run` sections this skill requires.

````markdown
# PM Workflow Orchestrator (Dispatch Skill)

Cross-client dispatch wrapper for the `pm-workflow-orchestrator` sub-agent. Detects the runtime; dispatches to the native sub-agent on Claude Code; reads `agents/pm-workflow-orchestrator.md` and walks the run loop inline on non-Claude clients via the "reference + execute inline" pattern. The orchestrator runs an ordered sequence of pm-skills from a saved prioritized-action-plan (Mode A) or a user-named chain (Mode B), pausing for go/no-go by default and stopping on a failed or empty step.

> **Status summary (v2.24.0):** EXPERIMENTAL on every client at ship.
> - **Claude Code (native):** EXPERIMENTAL until a live smoke test confirms the engine can invoke a downstream skill via the `Skill` tool in the installed plugin, and whether that skill runs inline in the engine context or isolated (see the v2.24.0 residual questions). The conductor is the model only for the run-loop / checkpoint / refusal SHAPE; no repo agent has ever declared `Skill`, so the mechanism is unproven.
> - **All non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot CLI, Gemini CLI):** EXPERIMENTAL until a dedicated maintainer-gate test exercises a real multi-artifact inline WRITE run. The orchestrator writes up to three full PM artifacts and may thread state; this is strictly harder than the conductor's inline path and has never been live-validated off Claude Code.
>
> On ANY client, run `--dry-run` FIRST as the readiness check (it exercises parsing, checkpointing, stop-on-fail, and the tool-capability pre-flight without invoking consequential skills). See the [Sub-Agent Compatibility Matrix](../../docs/reference/sub-agent-compatibility.md) for the canonical safe-usage matrix.

## When to Use

- You produced a `foundation-prioritized-action-plan` and want to run its runnable Section 7 prompts in order, pausing for go/no-go (Mode A).
- You want to run an ad-hoc, user-named chain of pm-skills against shared context (Mode B), for example `deliver-prd` then `deliver-user-stories`.
- You want a generic runner for a dynamic chain that is NOT a pre-curated `workflow-*` command.

Run modes (orthogonal to client):

- **CHECKPOINTED (default):** pause after each OK step for approve / edit / skip / redo.
- **GUARDED AUTO (`--auto`, opt-in):** run without pausing on clean steps; still stop on failed or empty, and stay checkpointed for Complex / Chaotic plans unless `--force-auto`.

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
6. Honor the run mode: pause at each OK step in CHECKPOINTED; auto-advance only unambiguously-PRODUCED steps in GUARDED AUTO; an EMPTY, FAILED, or ambiguous step always pauses or stops regardless of `--force-auto`.
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
````

---

## 6. Reference files (this skill's `references/` tree)

The skill ships four reference files. The first two are required by the validator; the third is the shared contract that resolves D12 referential discipline; the fourth is the worked example.

### 6.1 `references/TEMPLATE.md` (required, >= 3 `##` headers)

The output structure the orchestrator streams: the per-step block, the run header, and the two terminal outputs. Mirrors `utility-pm-release-conductor/references/TEMPLATE.md` in shape. Required `##` headers (at least three):

- `## Run Header` - input mode (A/B), client + mechanism (native/inline), run mode (checkpointed/auto), disk-write on/off, and for Mode A the parsed Cynefin domain and Overall plan confidence (surfaced, not gating).
- `## Per-Step Output` - the design's section 4.2 block, fenced:

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

- `## Terminal Output - Run Complete` - `## Plan run complete: {N} of {N} steps`, per-step result table, manual-steps list, next-steps note (deferred P4-P5, optional user-run review via `utility-pm-critic`).
- `## Terminal Output - Run Halted` - `## Plan run halted at Step {i} of {N}`, stop reason, completed steps, resume guidance (restart-only; persisted artifacts are for manual reference, no auto-resume in v1 per design section 4.5).
- `## Dry-Run Output` - per-step "NOT EXECUTED - dry run" plus the readiness summary (parse OK, chain resolved, tool-capability result).

### 6.2 `references/EXAMPLE.md` (required)

One fully worked single-thread CHECKPOINTED run on the Storevine thread, identical content to the library sample (section 7). Shows: the run header, three per-step blocks with confirmation pauses between them (the user approving each at its checkpoint), one MANUAL block surfaced (not nested, does not consume a cap slot), and a terminal "Plan run complete" block. This is the deterministic narrative the design names as both the EXAMPLE and the library sample (design section 9.1). It matches section 7.1 exactly: a clean approve-all CHECKPOINTED run that ends in "run complete." A FAILED step HALTS the run (design 8.3, engine 4.5), so it cannot appear in a run that ends in "run complete," and an EMPTY step pauses and would not silently proceed to completion either; any EMPTY/FAILED demonstration must be a SEPARATE halted-run sample ending in "Plan run halted," never folded into this run-complete sample.

### 6.3 `references/PARSE-CONTRACT.md` (the shared contract; design sections 2.1, 3, 4.3)

The single source of truth that BOTH `agents/pm-workflow-orchestrator.md` and this skill's inline branch read at runtime, so the parse rules and the step-status rubric exist in exactly one place. It is authored as part of THIS skill's reference tree (it lives under `skills/utility-pm-workflow-orchestrator/references/`) but is owned conceptually by the engine. Contents:

- **Mode A Section 7 parse contract** (design section 3): anchor on the prefix `#### To execute ` (not `#### To execute P<n>:`); capture to the next `####`/`##`; parse the P-token as a SET with regex `P\d+(?:\s+and\s+P\d+)*`; treat Section 7 as an ORDERED LIST of prompt blocks, never a P-keyed map; classify each block RUNNABLE / MANUAL / PARSE ERROR; capture the prompt as everything after `**Prompt:**`, stripping leading `> `.
- **Top-3 cap** (design section 3.1): counts RUNNABLE blocks in document order; manual blocks listed separately, do not consume a cap slot; cap is an upper bound, not a target.
- **Cynefin domain extraction** (design section 3.1): match `**Domain:**` on the Section 2 line, scan the remainder for the FIRST whole-word enum token (Clear / Complicated / Complex / Chaotic), case-insensitive, tolerate trailing period and inline `**Source:**`; fallback to the Section 0 `**Situation classification:**` bullet; zero or ambiguous -> report and default to CHECKPOINTED, never guess.
- **Overall plan confidence** (design section 3.1): parse tolerantly, accept hyphenated compounds (`Medium-High`, `Medium-Low`, `Low-Medium`) followed by ` - reasoning`; surfaced in the header, does not gate autonomy in v2.24.0.
- **Step-status rubric** (design section 4.3): FAILED (errored / refused / explicit error string), EMPTY (no artifact, or a bare stub where the target's `references/TEMPLATE.md` `##` sections appear only as unfilled `[bracketed guidance]`), PRODUCED (non-trivial artifact populating the expected structure). EMPTY is never PASS.
- **Self-reference** (design sections 8.1, 8.2): a Mode A plan or Mode B chain naming `utility-pm-workflow-orchestrator` or `foundation-prioritized-action-plan` is refused.

This file is the testable contract under section 9.4. Grounding: the anchor and the SET regex are verified against `skills/foundation-prioritized-action-plan/examples/02-interview-transcript.md` (the real compound heading `#### To execute P1 and P2: design the probes as experiments`), `examples/03-executive-ask.md` (two `P1` sibling prompts under a Complex domain rendered `**Domain:** Complex. **Source:** S2, S3, S6, S7.`), and `references/EXAMPLE.md` (Complicated, `Overall plan confidence: Medium-High`, `#### To execute P1` then `#### To execute P3` with no P2).

### 6.4 Sample placement note

The single-thread library sample is NOT in `references/`; it lives in `library/sub-agent-samples/pm-workflow-orchestrator/` (section 7). `references/EXAMPLE.md` and the library sample carry the same worked run so there is one narrative to maintain.

---

## 7. Library sample (`library/sub-agent-samples/pm-workflow-orchestrator/`)

Placement is LOCKED (design section 9.2): the sample goes in `library/sub-agent-samples/pm-workflow-orchestrator/`, alongside the four existing dispatch-skill siblings (`pm-critic`, `pm-skill-auditor`, `pm-changelog-curator`, `pm-release-conductor`), because the orchestrator is the FIFTH dispatch skill of that exact family. Keeping it with its siblings avoids splitting the family across two trees.

This component ships ONE sample (a single-thread checkpointed run), not the full three-thread set the in-scope content skills carry. The exemption is mechanical, not a special case: `scripts/check-skill-sample-coverage.sh` `in_scope_class()` returns false for `utility` (verified - the `case` matches only `discover|define|develop|deliver|measure|iterate|foundation|tool`, and the `*)` arm returns 1 for "utility and anything else: exempt"). No script edit is needed; cite THIS mechanism, not a sub-agent-samples clause.

### 7.1 Sample file

- **File:** `library/sub-agent-samples/pm-workflow-orchestrator/sample_pm-workflow-orchestrator_storevine_checkpointed-run.md`
- **Thread:** storevine (B2B campaign-analytics, matching the README thread taxonomy).
- **Scenario:** a Mode A run over a saved Storevine prioritized-action-plan, CHECKPOINTED, on Claude Code (native dispatch). Three runnable Section 7 prompts, the user approving each at its checkpoint, ending in a clean "Plan run complete" terminal block. Includes one MANUAL block (a workflow step surfaced as manual, not nested) to demonstrate that manual blocks do not consume a cap slot.
- **Frontmatter (matches the README "Sample Conventions" contract):** `title`, `description`, `artifact: pm-workflow-orchestrator-run`, `version: "1.0"`, `repo_version: "2.24.0-dev"`, `agent_version: "1.0.0"`, `created: 2026-06-01`, `status: sample`, `thread: storevine`, `context`.
- **Sections:** `## Scenario`, `## Output` (the run header, three per-step blocks with confirmation pauses, the manual-step surface, the terminal block), `## Notes on This Sample` (what it demonstrates; that this is the single committed sample, not a three-thread set, and why - the utility-class exemption).

### 7.2 README update

`library/sub-agent-samples/README.md`: add a `pm-workflow-orchestrator` row to the Catalog table (sub-agent, thread `storevine`, scenario, sample-file link) and bump the family count from 4 to 5 in the header line ("Real example outputs from each pm-skills sub-agent ... " currently lists four). The sample's frontmatter must satisfy the README "Sample Conventions" list (section 7.1).

---

## 8. Acceptance criteria (mechanical)

The dispatch-skill component ships when all of the following pass. Each is an objective check.

1. **Frontmatter valid.** `utility-pm-skill-validate --strict` passes on `skills/utility-pm-workflow-orchestrator/SKILL.md`.
2. **Classification + version.** Frontmatter `metadata.classification` is exactly `utility`; `metadata.version` is the quoted string `"1.0.0"`; `phase` is absent.
3. **Description length.** `scripts/lint-skills-frontmatter.{sh,ps1}` reports the description in the 20-100 word window. (Run it explicitly; record the count.)
4. **No proactive phrasing.** The description and body contain no "use proactively" / auto-trigger phrasing (grep the SKILL.md for `proactiv`; expect zero matches except the explicit "never fires proactively" / "explicit invocation only" negations).
5. **Dual H3 branches present.** The Instructions section contains exactly two H3 branches: one for Claude Code native dispatch (invokes `@agent-pm-skills:pm-workflow-orchestrator`) and one for non-Claude inline execution (reads `agents/pm-workflow-orchestrator.md`). Header-presence check.
6. **Pre-flight is the inline branch's first numbered action.** The non-Claude branch's step 1 is the tool-capability pre-flight (file-write + Bash), before any parse or step execution. Ordered-list check.
7. **`--dry-run` documented as the readiness probe.** The body has a `--dry-run` section that (a) states it does not invoke consequential skills, (b) emits "NOT EXECUTED - dry run" per step, and (c) instructs running it FIRST on any client.
8. **EXPERIMENTAL surface, conditioned on the recorded smoke-test result.** A "Status summary" callout labels the native Claude Code path EXPERIMENTAL (smoke-test gate) AND all non-Claude clients EXPERIMENTAL (write-harness gate), and links `docs/reference/sub-agent-compatibility.md`. No path is labeled PRODUCTION or "DRY-RUN VALIDATED" at v2.24.0. The native EXPERIMENTAL label is removed ONLY after a recorded PASS of the smoke test (engine spec AC #14); at v2.24.0 ship the test is not yet passed, so the native label stays EXPERIMENTAL. String check.
9. **Required reference files exist.** `references/TEMPLATE.md` (>= 3 `##` headers, `template-exists` validator), `references/EXAMPLE.md` (`example-exists` validator), and `references/PARSE-CONTRACT.md` are all present.
10. **PARSE-CONTRACT is referenced, not duplicated.** The inline branch reads `references/PARSE-CONTRACT.md` rather than restating the parse rules or step-status rubric inline; the engine spec references the same file. Cross-reference check (the rubric text appears in exactly one file under this skill's tree).
11. **`Agent` tool not introduced here.** This skill is a dispatch skill (no frontmatter `tools:` line); it must not instruct spawning a sub-agent on non-Claude clients - inline read-and-execute only. (The engine's `Agent`-absence is enforced in the engine spec.)
12. **Library sample present + cataloged.** `library/sub-agent-samples/pm-workflow-orchestrator/sample_pm-workflow-orchestrator_storevine_checkpointed-run.md` exists with the README-conformant frontmatter; the README Catalog table has the new row and the family count reads 5.
13. **Sample-coverage exemption holds with no script edit.** `scripts/check-skill-sample-coverage.{sh,ps1}` passes without modification (the `utility` classification is exempt via `in_scope_class`).
14. **HTML comment present.** The `<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->` line immediately follows the frontmatter.
15. **No em-dash / en-dash.** No U+2014 or U+2013 anywhere in the SKILL.md, the three reference files, or the library sample (repo hard rule; `no-em-dashes` hook and the pre-tag sweep).
16. **Validator bundle.** `scripts/pre-tag-validate.{sh,ps1} --strict` passes on a clean tree with the new skill present.
17. **Smoke-test result backs the EXPERIMENTAL label (cross-linked to the engine AC).** The native `Skill`-from-sub-agent smoke test is RUN and its result RECORDED per engine spec AC #14 and plan exit criterion #10; this skill's native EXPERIMENTAL label (AC #8) is removed only after a recorded PASS. The run-and-record requirement is OWNED by the engine spec (the engine is the surface under test); this AC is the dispatch-skill cross-link so the EXPERIMENTAL label is not left unbacked by any acceptance criterion.

---

## 9. Dependencies

### 9.1 Hard build-order dependencies

- **Engine spec first.** `agents/pm-workflow-orchestrator.md` (component 1, `spec_pm-workflow-orchestrator-engine.md`) must be authored before or with this skill, because the inline branch reads the engine body verbatim and both read `references/PARSE-CONTRACT.md`. The contract file should be authored once and consumed by both; if the engine spec is the owner, this skill links it.
- **Producer skill exists.** `skills/foundation-prioritized-action-plan/` is on main (v1.0.0); the v1.1.0 HANDOFF mode (component 3) hands plans here but is NOT a build prerequisite for this skill - the orchestrator runs standalone on a pasted plan or a Mode B chain.
- **Bundled examples are the parse fixtures.** `references/PARSE-CONTRACT.md` and the section 9.4 tests depend on the three existing files under `skills/foundation-prioritized-action-plan/` (`examples/02-interview-transcript.md`, `examples/03-executive-ask.md`, `references/EXAMPLE.md`), which are on main and verified to carry the hazard shapes.

### 9.2 Runtime dependencies (declared, not new)

- The engine sub-agent on Claude Code (native dispatch target).
- `agents/pm-workflow-orchestrator.md` readable by the inline branch on non-Claude clients.
- The gitignored `_pm-skills/` path for disk-write (verified ignored at `.gitignore` line 77; `validate-gitignore-pm-skills.{sh,ps1}` asserts it stays ignored - no action beyond not un-ignoring it).

### 9.3 No new governance surface

- NO `agents/_chain-permitted.yaml` edit (the engine delegates by `Skill`, not `Agent`; design section 7.1).
- NO new chain-permission entry, no allowlist change.

### 9.4 Tests this component is responsible for (design section 9.1)

Deterministic, fixture-driven, per-PR, all asserting the shared `references/PARSE-CONTRACT.md` rules the inline branch depends on:

- Section 7 parse fixtures: `examples/02-interview-transcript.md` (compound `P1 and P2` heading), `examples/03-executive-ask.md` (two `P1` siblings, Complex domain), `references/EXAMPLE.md` (Complicated, Medium-High, P1 then P3 no P2), plus a SYNTHETIC skill-less block (MANUAL tolerate path) and a SYNTHETIC interleaved manual+skill Section 7 (asserts the cap counts skill-bearing blocks only). Assert: ordered tuple list (not a P-map); compound/duplicate P handled; top-3 counts runnable blocks; siblings NOT threaded.
- Cynefin extraction: assert the extracted token is exactly `Complex` / `Complicated` (not `Complex.`) from the inline `**Domain:** X. **Source:** ...` shape; assert ambiguous/absent -> CHECKPOINTED; cover all four enum branches (reuse `skills/foundation-prioritized-action-plan/eval/fixtures/cynefin-fixtures.md` if it carries Clear/Chaotic inputs, else author two synthetic Section-2 fixtures).
- Step-status rubric: pass-with-output -> PRODUCED; stub/empty -> EMPTY; error/refusal text -> FAILED.
- `--dry-run` is the deterministic CI surface; live delegation is model-run and tested manually (never per-PR).

---

## 10. This component's slice of the v2.24.0 hygiene surface

These are the hygiene and registration touchpoints that belong to THIS component (the dispatch skill). The catalog-wide counts and version surfaces are shared across all three v2.24.0 components and are re-derived once at ship from the corrected baseline (design section 9.2: foundation stays 9, utility 10 -> 11, total 64 -> 65, sub-agents 4 -> 5, version 2.23.0 -> 2.24.0). This component is the one that drives the utility-count and total-skill-count increment.

New source files (this component):

- `skills/utility-pm-workflow-orchestrator/SKILL.md`
- `skills/utility-pm-workflow-orchestrator/references/TEMPLATE.md` (>= 3 `##` headers)
- `skills/utility-pm-workflow-orchestrator/references/EXAMPLE.md`
- `skills/utility-pm-workflow-orchestrator/references/PARSE-CONTRACT.md` (shared with the engine)
- `library/sub-agent-samples/pm-workflow-orchestrator/sample_pm-workflow-orchestrator_storevine_checkpointed-run.md`

Registration edits this component triggers:

- `AGENTS.md`: add `#### pm-workflow-orchestrator` under `### Utility Skills` with `**Path:** skills/utility-pm-workflow-orchestrator/SKILL.md` (`validate-agents-md` enforced). The Sub-Agents prose entry (for the engine) is the engine spec's responsibility; note that the basename substring check is auto-satisfied by THIS skill's path line (it contains `pm-workflow-orchestrator`), so the engine's dedicated Sub-Agents prose entry is NOT CI-protected and must be hand-added and verified in the pre-tag pass (design section 9.2).
- `library/sub-agent-samples/README.md`: Catalog row + family count 4 -> 5 (section 7.2).
- Generated pages (regenerate, do NOT hand-edit; `check-generated-content-untouched` diff-enforced): `scripts/generate-skill-pages.py` creates `docs/skills/utility/utility-pm-workflow-orchestrator.md` and regenerates the PER-CLASSIFICATION index pages (`OUTPUT_DIR / group / "index.md"`) + `docs/reference/commands.md`. NOTE: it does NOT write the top-level `docs/skills/index.md` (that file is hand-edited - see Counts to sweep). `generate-showcase.py` and `generate-workflow-pages.py` need no change (the sample is not in `skill-output-samples/`; verified the showcase generator does not consume sub-agent-samples).

Counts to sweep (shared surface; this component is the increment driver - utility 10 -> 11, total 64 -> 65, foundation unchanged at 9, sub-agents 4 -> 5 driven by the engine). Only the TOTAL (65) and the badge are gate-enforced by `check-count-consistency` + `check-landing-page-counts --strict`; the per-classification breakdown (utility 11, foundation 9, phase 30, tool 15) and the sub-agent count are a MANUAL sweep (verified: the count scripts exclude subset descriptors and do not check the sub-agent count). Surfaces: README.md (gated total prose + At-a-Glance total; the badge `Foundation-N_skills`, the mermaid `N skills` nodes, the `Cross-Cutting Capabilities (N skills)` aggregate, the TOC anchor, and the `Foundation Skills ... (N)` header are MANUAL breakdown edits), `.claude-plugin/plugin.json` + `.claude-plugin/marketplace.json` (NOT repo-root) + `.codex-plugin/plugin.json` descriptions (total gated; embedded breakdown + `4 sub-agents (...)` name list MANUAL), `docs/index.mdx` (lines 3/10 total gated; lines 178/180 `Foundation (8)` / `Utility (10)` parentheticals MANUAL), `docs/skills/index.md` (HAND-EDITED, NOT generated - no `generated: true` marker and `generate-skill-pages.py` never writes the top-level `index.md`; hand-edit the `64 PM skills` headline, the `Foundation | 8` and `Utility | 10` rows, and add the orchestrator to the utility description), `docs/reference/project-structure.md` (line 25 internally inconsistent NOW at "63 total"; line 41 header; line 121 `(10 utility)` sub-head MANUAL + add the orchestrator row), CLAUDE.md, QUICKSTART.md (lines 5/74 stale on two axes), `docs/guides/creating-pm-skills.md` if it carries a count. Full enumerated targets are in the plan's "Count sweep" section.

Status / compatibility docs (this component's EXPERIMENTAL claim lands here): `docs/reference/sub-agent-compatibility.md` adds the 5th row with the orchestrator EXPERIMENTAL on all non-Claude clients AND the native path EXPERIMENTAL until the smoke test closes; `docs/reference/runtime-components.md` adds the dispatch-skill + engine pairing row.

Pre-tag gate (this component's part): `utility-pm-skill-validate --strict` on the new skill; `scripts/lint-skills-frontmatter.{sh,ps1}` for the 20-100 word description; `scripts/check-skill-sample-coverage.{sh,ps1}` passes unmodified; the em-dash / en-dash sweep over the five new files; the manual AGENTS.md Utility-skill entry check.

Out of scope for this component (owned elsewhere): the engine's `Agent`-absent grep and Sub-Agents prose entry (engine spec); the plan-skill HANDOFF mode, its `metadata.version` 1.1.0 bump, and its new `HISTORY.md` (plan-handoff spec); the catalog version bump 2.23.0 -> 2.24.0, CHANGELOG entries, and release-notes files (shared release surface, applied once at ship).

---

## 11. Scope / YAGNI cuts (this component)

- **No execution logic of its own.** The skill detects runtime, dispatches or inlines, runs the pre-flight, and offers `--dry-run`. The parse contract, run loop, step-status rubric, and refusals belong to the engine and the shared `references/PARSE-CONTRACT.md`; this skill links them, it does not restate them.
- **No PRODUCTION claim on any client at v2.24.0.** Native EXPERIMENTAL until the smoke test; non-Claude EXPERIMENTAL until the maintainer-gate WRITE harness.
- **No new chain-permission surface.** Dispatch + inline only; no `Agent` instruction, no `_chain-permitted.yaml` entry.
- **No three-thread sample set.** One single-thread checkpointed sample; the `utility` classification is exempt by `in_scope_class`.
- **No auto-resume in the dispatch layer.** Re-invoke restarts the run; the skill says so plainly and does not advertise resume.
- **No programmatic runtime probe.** Runtime detection is a prose step using signals the model already has, matching the conductor; the only programmatic probe is the tool-capability pre-flight on the inline path.
