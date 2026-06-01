# Implementation Plan: v2.24.0 plan orchestrator (engine + dispatch skill + plan handoff)

**Status:** READY FOR EXECUTION. Not started. Specs approved, design locked, entrance criteria SATISFIED (v2.23.0 shipped + tagged at `b54cef0`; all three specs build-ready; the three bundled parse fixtures present on main).
**Date:** 2026-06-01
**Parent design:** [`design_plan-orchestrator.md`](design_plan-orchestrator.md) (one design, three specs)
**Specs:** [`spec_pm-workflow-orchestrator-engine.md`](spec_pm-workflow-orchestrator-engine.md) (W1) | [`spec_utility-pm-workflow-orchestrator-skill.md`](spec_utility-pm-workflow-orchestrator-skill.md) (W2) | [`spec_prioritized-action-plan-handoff.md`](spec_prioritized-action-plan-handoff.md) (W3)
**Master plan:** [`plan_v2.24.0.md`](plan_v2.24.0.md)
**Effort id (canonical):** `plan-orchestrator` (the string in HISTORY.md "Effort" + `skills-manifest.yaml`)
**Target release:** v2.24.0 (additive MINOR)

This plan executes the three specs end to end. It is ordered so the engine (W1) and dispatch skill (W2) are co-authored, the plan handoff (W3) lands once both exist, then the FULL hygiene sweep, the native-Skill smoke-test gate, the pre-tag validator bundle, and finally the irreversible publish phase. Every file path below is real and was verified during authoring.

---

## How to read this plan (workflow execution + parallelization)

- Phases are ordered. A phase may start when its listed dependencies are checked.
- **[PARALLEL]** tags mark phases or tasks that can be dispatched concurrently under workflow execution (for example via parallel sub-agents) because they touch disjoint files and share no state. **[SERIAL]** marks a hard ordering dependency.
- The parallel fan-outs in this plan:
  - **Authoring fan-out (Phases 2-3):** W1 engine, W2 dispatch skill body, and the W2 reference/sample files are co-authored. The single shared file `references/PARSE-CONTRACT.md` (Phase 1) MUST land first; after that the engine body and the dispatch-skill body can be drafted in parallel by different agents because the engine reads the contract and the dispatch skill links it.
  - **Hygiene fan-out (Phase 6):** the count sweep, manifest/version sweep, AGENTS.md edits, CHANGELOG + release-notes, the three roadmap refs, and the sub-agent catalog docs are largely disjoint file sets and can be dispatched in parallel, THEN reconciled by a single count-consistency pass before generated-page regen.
- The fixture/eval work (Phase 4) depends only on W1 + the shared contract, so it can run alongside Phase 5 (W3).
- Anything that mutates a count or a version touches shared files; serialize the final reconciliation (Phase 6.8) so two parallel agents do not race the same line.

---

## Pre-flight gate (HARD)

All must be true before Phase 1:

- [x] v2.23.0 is SHIPPED and tagged (`v2.23.0` at `b54cef0`, 2026-05-31). W1 Mode A consumes `foundation-prioritized-action-plan` output and W3 edits that skill, so the producer must exist on main. It does.
- [x] All three specs approved and build-ready in this directory.
- [x] The three bundled parse fixtures present in their verified hazard shapes: `skills/foundation-prioritized-action-plan/examples/02-interview-transcript.md` (compound `P1 and P2` heading), `examples/03-executive-ask.md` (two `P1` siblings, Complex domain), `references/EXAMPLE.md` (Complicated, Medium-High, `P1` then `P3`, no `P2`).
- [ ] You are working on a release branch, not directly on `main` (this repo's `main` forbids merge commits; reconcile origin/main by rebase, never merge - see `reference_pm-skills-main-linear-history`).
- [ ] No higher-priority work has displaced v2.24.0 from the slate.

If any unchecked item cannot be satisfied, stop and resolve before continuing.

---

## Phase 0: Optional spec adversarial pass - SKIP unless re-review is requested

**Goal:** Confirm the three specs need no further adversarial review before build.

The three specs are already marked build-ready and the design is locked. v2.24.0 does NOT require a fresh Codex pass to start building. If the maintainer wants one, run it now via `jp-ai-review --review` against each spec and loop until findings drop below IMPORTANT (cross-LLM protocol), then proceed. Otherwise mark this phase N/A and start at Phase 1.

- [ ] 0.1 (optional) Decide whether a spec re-review is wanted; if not, mark N/A and proceed.

---

## Phase 1: Shared parse/status contract (the file both W1 and W2 read) - [SERIAL, blocks Phases 2-3]

**Goal:** Author the single source of truth that the engine body and the dispatch skill's inline branch both read at runtime, so the parse rules and step-status rubric live in exactly one place (D12 referential discipline). Authoring this FIRST unblocks the parallel engine + dispatch-skill fan-out.

**File:** `skills/utility-pm-workflow-orchestrator/references/PARSE-CONTRACT.md` (NEW). Lives under the dispatch skill's `references/` because agents have no `references/` dir in the plugin layout; skills do. The engine (which has `Read`) reads it by path; the inline branch reads it by relative path. (engine spec section 9; W2 spec 6.3)

**Tasks:**

- [ ] 1.1 Create `skills/utility-pm-workflow-orchestrator/references/` and author `PARSE-CONTRACT.md`.
- [ ] 1.2 Mode A Section 7 parse rules: anchor on the prefix `#### To execute ` (NOT `#### To execute P<n>:`); capture to the next `####`/`##`; parse the P-token as a SET, regex `P\d+(?:\s+and\s+P\d+)*`, never a single number; treat Section 7 as an ORDERED LIST of prompt blocks, never a P-keyed map; siblings (shared or compound P-level) are NOT threaded; classify each block RUNNABLE / MANUAL / PARSE ERROR; capture the prompt as everything after `**Prompt:**` to the next `####`/`##`, stripping leading `> `.
- [ ] 1.3 Top-3 cap rule: counts RUNNABLE (skill-bearing) blocks in document order; manual blocks listed separately, do not consume a slot; cap is an upper bound, not a target.
- [ ] 1.4 Cynefin domain extraction: match the literal `**Domain:**` label on the Section 2 line, scan the remainder for the FIRST whole-word enum token (Clear / Complicated / Complex / Chaotic), case-insensitive, tolerate trailing period + inline `**Source:**`; fallback to the Section 0 `**Situation classification:**` bullet; zero or ambiguous -> report and default to CHECKPOINTED, never guess.
- [ ] 1.5 Overall plan confidence: parse tolerantly, accept hyphenated compounds (`Medium-High`, `Medium-Low`, `Low-Medium`) followed by ` - reasoning`; surfaced in the header, does NOT gate autonomy in v2.24.0.
- [ ] 1.6 Step-status rubric (the single normative definition): FAILED (errored / refused / explicit error string), EMPTY (no artifact, or a bare stub where the target's `references/TEMPLATE.md` `##` sections appear only as unfilled `[bracketed guidance]`), PRODUCED (non-trivial artifact populating the expected structure). EMPTY is never PASS.
- [ ] 1.7 Engine-owned Tier-3 maintenance refusal list (`utility-pm-skill-*`, `utility-pm-release-conductor`, `utility-pm-changelog-curator`, `utility-update-pm-skills`, and the plan skill itself) + the Category 1/2/3 step classification, so native and inline paths route identically.
- [ ] 1.8 Self-reference rule: a Mode A plan or Mode B chain naming `utility-pm-workflow-orchestrator` or `foundation-prioritized-action-plan` is refused.

**Acceptance criteria:**

- The five required content surfaces (engine spec section 9) are all present: Mode A parse rules, Cynefin extraction, confidence tolerant-parse, PRODUCED/EMPTY/FAILED rubric, Tier-3 refusal list + Category 1/2/3 classification.
- The rubric and parse rules appear in exactly ONE file under this skill's tree (no duplicate copy in the engine body or the SKILL.md inline branch).
- No U+2014 / U+2013 anywhere in the file.

---

## Phase 2: W1 engine sub-agent (`agents/pm-workflow-orchestrator.md`) - [PARALLEL with Phase 3 after Phase 1]

**Goal:** Author the Claude Code-only execution system prompt that walks the step list. First repo agent to declare the `Skill` tool. (engine spec)

**Tasks:**

- [ ] 2.1 Create `agents/pm-workflow-orchestrator.md` with the verbatim frontmatter from engine spec section 2: `name: pm-workflow-orchestrator`; folded `description: >-` carrying NO "use proactively" phrasing and containing the exact string "Explicit invocation only; never fires proactively"; `tools: Skill, Read, Grep, Glob, Bash, Edit` and explicitly NOT `Agent`; `model: inherit`; `memory: none`.
- [ ] 2.2 Body: summarize the two-mode parse contract and POINT to `skills/utility-pm-workflow-orchestrator/references/PARSE-CONTRACT.md` as authoritative (do not re-embed the rules), exactly as `agents/pm-release-conductor.md` points to its runbook.
- [ ] 2.3 Body: the run loop (per-step block from spec section 4.2), the PRODUCED/EMPTY/FAILED self-classification (engine is the status AUTHORITY; content skills emit no `## Status` block), and the two terminal outputs (run complete / run halted, restart-only resume guidance).
- [ ] 2.4 Body: run modes - CHECKPOINTED (default) and GUARDED AUTO (`--auto`, opt-in, engine owns the behavior); FAILED is a hard stop, EMPTY is a forced checkpoint pause; both outrank `--force-auto`; `--force-auto` flips Complex/Chaotic + Mode-B-no-domain to auto for unambiguously-PRODUCED steps only and is NOT a gate-skip.
- [ ] 2.5 Body: the leaf-inlining rule with the named YAGNI sentence written VERBATIM: "the orchestrator never delegates to a dispatch skill that spawns a sub-agent, nor nests a workflow; depth-2 is preserved because the engine spawns zero sub-agents, directly or transitively-through-a-skill." Category 1 -> `Skill` tool; Category 2 (only `utility-pm-critic`) -> inline `agents/pm-critic.md`, never as a native skill, never via `Agent`; Category 3 (`workflow-*`, sprint family entry points) -> MANUAL.
- [ ] 2.6 Body: pre-flight refusals (missing/invalid Mode A plan; zero-RUNNABLE Section 7; empty Mode B chain; unresolvable skill name; self-reference; user abort), state passing (Mode A no threading; Mode B threading only when user-declared; disk-write auto-enables for 2+ step runs to gitignored `_pm-skills/plan-orchestrator/<run>/`; atomic user-edit replace), and `--dry-run`.
- [ ] 2.7 Body: cite the build-time smoke-test gate so a maintainer running the smoke test knows what to confirm (native path EXPERIMENTAL until the `Skill`-from-sub-agent test passes).
- [ ] 2.8 Copy-paste hazard guard: confirm the frontmatter model is the CONDUCTOR, NOT pm-critic - no "Use proactively" phrasing lifted from `agents/pm-critic.md`.

**Acceptance criteria (engine spec section 8 ACs #1-4, #12):**

- File exists, valid YAML frontmatter, `name: pm-workflow-orchestrator` (AC #1).
- `tools:` line is exactly `Skill, Read, Grep, Glob, Bash, Edit`; `Agent` ABSENT (AC #2 - verified by manual grep in Phase 8).
- `description` contains "Explicit invocation only; never fires proactively" and zero "proactiv" auto-trigger phrasing (AC #4).
- The body references `PARSE-CONTRACT.md` and does NOT duplicate the parse rules or the rubric (AC #12).
- No U+2014 / U+2013.

---

## Phase 3: W2 dispatch skill (`skills/utility-pm-workflow-orchestrator/`) - [PARALLEL with Phase 2 after Phase 1]

**Goal:** Author the cross-client control panel, classification `utility`, the FIFTH dispatch skill of the `utility-pm-{role}` family, structurally mirroring `utility-pm-release-conductor`. (W2 spec)

**Tasks:**

- [ ] 3.1 `skills/utility-pm-workflow-orchestrator/SKILL.md` frontmatter from W2 spec section 4: root `name: utility-pm-workflow-orchestrator`; single-line `description` (~90 words, carries only dual-dispatch + 5-client framing + non-proactive note + EXPERIMENTAL/`--dry-run`); `license: Apache-2.0`; `metadata` with `classification: utility`, quoted `version: "1.0.0"`, `updated: <ship-date>`, `category: workflow` (fall back to `release` if the validator constrains the enum), `frameworks: [triple-diamond]`, `author: product-on-purpose`; `phase` omitted; the `<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->` comment immediately after the frontmatter.
- [ ] 3.2 SKILL.md body from W2 spec section 5: Status summary callout (native EXPERIMENTAL + non-Claude EXPERIMENTAL, links `docs/reference/sub-agent-compatibility.md`, "run --dry-run first"); When to Use / When NOT to Use; a prose Runtime detection line; the two H3 branches (Claude Code native dispatch via `@agent-pm-skills:pm-workflow-orchestrator` forwarding `$ARGUMENTS` flags; non-Claude inline branch whose STEP 1 is the tool-capability pre-flight); the `--dry-run` section; Cross-Client Notes; Reference Files.
- [ ] 3.3 `references/TEMPLATE.md` (>= 3 `##` headers): Run Header, Per-Step Output, Terminal Output - Run Complete, Terminal Output - Run Halted, Dry-Run Output. (W2 spec 6.1)
- [ ] 3.4 `references/EXAMPLE.md`: the worked single-thread CHECKPOINTED Storevine run, same narrative as the library sample (run header, three approved per-step blocks, one MANUAL block surfaced not nested, terminal "Plan run complete"). A FAILED/EMPTY demonstration must be a SEPARATE halted-run, never folded into this run-complete example. (W2 spec 6.2)
- [ ] 3.5 (PARSE-CONTRACT.md already authored in Phase 1; confirm the SKILL.md inline branch LINKS it, does not restate it.)

**Acceptance criteria (W2 spec section 8 ACs #1-7, #9-11, #14-15):**

- `utility-pm-skill-validate --strict` passes on the SKILL.md (AC #1); `classification: utility`, quoted `version: "1.0.0"`, `phase` absent (AC #2).
- Description in the 20-100 word window via `scripts/lint-skills-frontmatter.{sh,ps1}` - run it and record the count (AC #3).
- No "proactiv" auto-trigger phrasing except the explicit negations (AC #4).
- Exactly two H3 branches: native dispatch + non-Claude inline (AC #5); the inline branch's STEP 1 is the tool-capability pre-flight (AC #6); `--dry-run` documented as run-first readiness probe (AC #7).
- `references/TEMPLATE.md` (>= 3 `##`), `references/EXAMPLE.md`, `references/PARSE-CONTRACT.md` all present (AC #9); inline branch references PARSE-CONTRACT.md, not restated (AC #10); no `tools:`/`Agent` instruction (AC #11).
- HTML comment immediately follows the frontmatter (AC #14); no U+2014 / U+2013 in SKILL.md or the three reference files (AC #15).

---

## Phase 4: Parse/Cynefin/status fixtures + deterministic eval - [PARALLEL with Phase 5; depends on Phases 1-2]

**Goal:** Build the MANDATORY fixture set proving the parse contract, Cynefin extraction, status rubric, `--force-auto` precedence, and leaf-inlining classification behave per spec. `--dry-run` is the deterministic CI surface; live delegation is model-run and manual. (engine spec section 8 ACs #5-11; W2 spec 9.4; design 9.1)

**Tasks:**

- [ ] 4.1 Section 7 parse fixtures from the three real bundled examples (`examples/02-interview-transcript.md`, `examples/03-executive-ask.md`, `references/EXAMPLE.md`) PLUS a synthetic skill-less block (MANUAL tolerate path) and a synthetic interleaved manual+skill Section 7 (cap counts skill-bearing blocks only). Assert: ordered tuple list (not a P-map); compound/duplicate `P` handled; siblings NOT threaded; top-3 counts RUNNABLE blocks.
- [ ] 4.2 Cynefin extraction fixtures: assert the extracted token is exactly `Complex`/`Complicated` (not `Complex.`) from the inline `**Domain:** X. **Source:** ...` shape; ambiguous/absent -> CHECKPOINTED; cover all four enum branches (Clear/Complicated -> auto runs; Complex/Chaotic -> forced checkpoint unless `--force-auto`). Reuse `skills/foundation-prioritized-action-plan/eval/fixtures/cynefin-fixtures.md` if it carries Clear/Chaotic-labelled inputs, else author two synthetic Section-2 fixtures.
- [ ] 4.3 Step-status rubric fixtures: pass-with-output -> PRODUCED (advance); stub/empty -> EMPTY (stop in auto, pause in checkpointed); error/refusal text -> FAILED (stop).
- [ ] 4.4 `--force-auto` precedence fixture: only flips checkpointed -> auto for Complex/Chaotic/no-domain; a FAILED/EMPTY step STILL stops/pauses under `--force-auto`.
- [ ] 4.5 Leaf-inlining classification fixture: `utility-pm-critic` -> Category 2 (route to inline `agents/pm-critic.md`, not a native skill); a `workflow-*` target -> Category 3 (MANUAL); a phase skill -> Category 1 (`Skill` tool).
- [ ] 4.6 Pre-flight refusal fixtures: missing/invalid Mode A plan; Mode B naming an unresolvable skill; self-reference (Mode B naming the orchestrator; Mode A Section 7 naming the plan skill); empty chain - each refuses with a specific reason and emits no step list.
- [ ] 4.7 `--dry-run` fixture: walks the step list, emits "NOT EXECUTED - dry run" per step, exercises parsing + checkpointing + stop-on-fail + tool-capability pre-flight without consequential delegation.

**Acceptance criteria:** all engine spec section 8 fixture ACs (#5-11) pass deterministically; fixtures live where the repo's existing eval fixtures live (alongside the plan skill's `eval/fixtures/` pattern) and are runnable per-PR.

---

## Phase 5: W3 plan handoff (`foundation-prioritized-action-plan` v1.0.0 -> v1.1.0) - [SERIAL, depends on Phases 2-3 existing]

**Goal:** Additive-minor edit to the shipped plan skill so it can offer to run its own output through the orchestrator. Dead-on-arrival without W1 + W2, so it lands after both exist. (W3 spec)

**Tasks:**

- [ ] 5.1 `skills/foundation-prioritized-action-plan/SKILL.md` frontmatter: `metadata.version` `"1.0.0"` -> `"1.1.0"`; `metadata.updated` -> ship date. ALL other frontmatter fields UNCHANGED (description NOT edited). (W3 spec 3.1)
- [ ] 5.2 Body edit A: add `## Handoff to the orchestrator (optional)` AFTER `## Output destination` and BEFORE `## Quality Checklist` (W3 spec 3.2 draft): the offer fires only when Section 7 has >= 1 RUNNABLE block; one-confirmation CHECKPOINTED handoff; `--run` (produce-and-hand-off, CHECKPOINTED default, degrades to no-op when zero runnable); `--force-auto` forwarded unchanged, never relaxed; "you never run work-skills inline"; self-reference safety.
- [ ] 5.3 Body edit B: refine the Identity bullet to record the governed-handoff exception without deleting "never invokes them inline." (W3 spec 3.3)
- [ ] 5.4 Body edit C: refine guardrail 7 ("One skill, one document") to name the one-confirmation handoff (or `--run`) exception while preserving the inline-prohibition language. (W3 spec 3.4)
- [ ] 5.5 Create `skills/foundation-prioritized-action-plan/HISTORY.md` (the skill's FIRST), per the W3 spec section 6 draft: summary table newest-first (1.1.0 then 1.0.0), "Changes" under 1.1.0, "Contract established" under 1.0.0, "Decision note: D9 deliberately reopened" under 1.1.0; `Effort` column = `plan-orchestrator`; links resolve to `docs/releases/Release_v2.23.0.md` and `Release_v2.24.0.md`.

**Acceptance criteria (W3 spec section 7 ACs #1-13):**

- Frontmatter version `"1.1.0"` + updated bumped; no other frontmatter field changed (diff against `git show v2.23.0:skills/foundation-prioritized-action-plan/SKILL.md`) (AC #1).
- `utility-pm-skill-validate --strict` passes; description still in the 20-100 word window (AC #2).
- Output contract unchanged: exactly nine section headers (0-8) in order; the offer is prose after Section 8, not a tenth section (AC #3).
- Handoff section present + correctly ordered (AC #4); `--run` + `--force-auto` documented with "never relax" semantics (AC #5); CHECKPOINTED default asserted (AC #6); guardrail 7 keeps "never invoke them inline" AND names the handoff exception (AC #7); offer-gating, self-reference safety stated (AC #8, #9).
- HISTORY.md created + well-formed; `validate-skill-history.sh` passes; D9 note present in HISTORY.md (AC #10) AND in `plan_v2.24.0.md` (AC #11 - already present in the plan's "deliberate D9-reopening decision record" section; confirm).
- No U+2014 / U+2013 in the edited SKILL.md or new HISTORY.md (AC #12); cross-client honesty preserved (AC #13).

---

## Phase 6: FULL hygiene + registration sweep - [PARALLEL fan-out, then SERIAL reconcile at 6.8]

**Goal:** Re-derive every count/version/registration surface ONCE from the corrected baseline (audit-aggregate-counters rule). **Corrected baseline:** before `30 phase + 9 foundation + 10 utility + 15 tool = 64` skills, 4 sub-agents, version 2.23.0; after `30 phase + 9 foundation + 11 utility + 15 tool = 65` skills, 5 sub-agents, version 2.24.0. Foundation does NOT move (the orchestrator is utility); utility 10 -> 11; sub-agents 4 -> 5.

Tasks 6.1-6.6 touch disjoint file sets and can be dispatched **[PARALLEL]**. Task 6.7 (library sample) is independent. Task 6.8 (reconcile + generated-page regen) is **[SERIAL]** and runs last in this phase.

### 6.1 Library sample [PARALLEL]
- [ ] 6.1.1 `library/sub-agent-samples/pm-workflow-orchestrator/sample_pm-workflow-orchestrator_storevine_checkpointed-run.md` (NEW): single-thread Mode A CHECKPOINTED Storevine run, native dispatch, three runnable steps each approved, one MANUAL block, ending in "Plan run complete". Frontmatter per the README "Sample Conventions" contract (`title`, `description`, `artifact: pm-workflow-orchestrator-run`, `version: "1.0"`, `repo_version: "2.24.0-dev"`, `agent_version: "1.0.0"`, `created: 2026-06-01`, `status: sample`, `thread: storevine`, `context`). Sections: `## Scenario`, `## Output`, `## Notes on This Sample`. Same narrative as `references/EXAMPLE.md`.
- [ ] 6.1.2 `library/sub-agent-samples/README.md`: add the `pm-workflow-orchestrator` Catalog row; bump the family count 4 -> 5 in the header line. `README_SAMPLES.md` tallies do NOT change (sample is not in `skill-output-samples/`); only the catalog skill-count moves 64 -> 65.

### 6.2 Count sweep - gated TOTAL + badge (64 -> 65) [PARALLEL]
Enforced by `check-count-consistency` + `check-landing-page-counts --strict` (validate only the TOTAL + badge):
- [ ] 6.2.1 `README.md` total-skills prose + At-a-Glance total row.
- [ ] 6.2.2 `.claude-plugin/plugin.json` + `.claude-plugin/marketplace.json` + `.codex-plugin/plugin.json` (the "64 ... skills" total in each description).
- [ ] 6.2.3 `docs/index.mdx` (lines 3 and 10 total 64 -> 65).
- [ ] 6.2.4 `docs/reference/project-structure.md` (the total on line 25 and the header on line 41).
- [ ] 6.2.5 `CLAUDE.md`; `QUICKSTART.md` (lines 5 and 74); `docs/guides/creating-pm-skills.md` if it carries a total.

### 6.3 Count sweep - MANUAL per-classification breakdown (foundation 9, utility 11, phase 30, tool 15) [PARALLEL]
NOT gate-enforced (the count scripts exclude subset descriptors). Several are ALREADY stale at foundation=8 on main; foundation does NOT move - set it to 9. Set utility to 11.
- [ ] 6.3.1 `README.md` five foundation surfaces (currently stale at 8): line 88 TOC anchor `...capability-8` -> `...capability-9`; line 545 badge `Foundation-8_skills` -> `Foundation-9_skills` + alt text `Foundation Skills: 8` -> `9`; line 588 mermaid aggregate `Cross-Cutting Capabilities (18 skills)` -> `(20 skills)`; line 590 mermaid `Foundation<br/>8 skills` -> `9 skills`; line 591 mermaid `Utility<br/>10 skills` -> `11 skills`; line 609 header `... (8)` -> `(9)` (keep line 88 anchor + header text in sync).
- [ ] 6.3.2 `docs/skills/index.md` (HAND-EDITED, NOT generated - no `generated: true` marker, `generate-skill-pages.py` never writes the top-level `index.md`): line 2 + line 6 `64 PM skills` -> 65; line 16 `Foundation | 8` -> `9`; line 17 `Utility | 10` -> `11`; add the orchestrator to the utility classification description.
- [ ] 6.3.3 `docs/index.mdx` line 178 `**Foundation (8)**` -> `**Foundation (9)**` (add `foundation-prioritized-action-plan` to the foundation list); line 180 `**Utility (10)**` -> `**(11)**` (add the orchestrator to the utility list).
- [ ] 6.3.4 `docs/reference/project-structure.md` line 25 -> `65 total: 30 phase + 9 foundation + 11 utility + 15 tool`; line 121 sub-head `(10 utility)` -> `(11 utility)` + add the `utility-pm-workflow-orchestrator` row.
- [ ] 6.3.5 `QUICKSTART.md` line 5 `8 foundation skills, 10 utility skills` -> `9 ... , 11 ...`; line 74 breakdown -> `30 phase + 9 foundation + 11 utility + 15 tool`; re-grep no `63` or `8 foundation` remains.
- [ ] 6.3.6 Any other `foundation`/`utility`/`phase`/`tool` count surface.

### 6.4 Version manifests (2.23.0 -> 2.24.0) [PARALLEL]
`validate-version-consistency` checks ONLY the `version` field; the description prose count and the embedded sub-agent name list are MANUAL.
- [ ] 6.4.1 `.claude-plugin/plugin.json` (source of truth): bump `version`; manually edit description prose - total `64` -> 65, breakdown utility `10` -> 11, `4 sub-agents (pm-critic, pm-skill-auditor, pm-changelog-curator, pm-release-conductor)` -> `5 sub-agents (..., pm-workflow-orchestrator)`; add the v2.24.0 lead sentence naming the new sub-agent + dispatch skill.
- [ ] 6.4.2 `.claude-plugin/marketplace.json` (path is under `.claude-plugin/`, NOT repo root): bump `version` (line 12); manually edit description prose (line 11) the same way.
- [ ] 6.4.3 `.codex-plugin/plugin.json`: description + version, same treatment.
- [ ] 6.4.4 `README.md` badge + At-a-Glance row. Do NOT touch `package.json` (docs-site, stays 0.1.0).

### 6.5 AGENTS.md (two edits) [PARALLEL]
- [ ] 6.5.1 Add the utility skill under `### Utility Skills` as `#### pm-workflow-orchestrator` with `**Path:** skills/utility-pm-workflow-orchestrator/SKILL.md` (this path line auto-satisfies the `validate-agents-md` basename substring check).
- [ ] 6.5.2 Add the engine under `## Sub-Agents` BY HAND (NOT CI-protected): fix line 450 ("Four sub-agents ship in v2.16.0:") by adding the 5th agent while PRESERVING the v2.16.0 framing - keep the v2.16.0 line and add a sentence like "v2.24.0 adds a fifth sub-agent: `pm-workflow-orchestrator` ...". Verify by hand in the pre-tag manual pass.

### 6.6 CHANGELOG + release docs + roadmap refs + sub-agent count sweep + catalog docs [PARALLEL]
- [ ] 6.6.1 Root `CHANGELOG.md` `## [2.24.0]`: THREE change lines (new sub-agent W1, new dispatch skill W2, plan skill HANDOFF mode W3).
- [ ] 6.6.2 `docs/changelog.md` mirror block with the SAME counts.
- [ ] 6.6.3 `docs/releases/Release_v2.24.0.md` (NEW; resolves the HISTORY.md 1.1.0 link). Include a slot to RECORD the smoke-test result (Phase 7).
- [ ] 6.6.4 `docs/releases/index.md` new TOP row + the one-line catalog-delta summary: "catalog grows 64 to 65 (utility 10 to 11); fifth sub-agent `pm-workflow-orchestrator`; `foundation-prioritized-action-plan` to v1.1.0." Mirror the same summary in `docs/changelog.md`.
- [ ] 6.6.5 `README.md` "What's New" `<details>` block (inside the count-exempt guard) + release-history table row.
- [ ] 6.6.6 Roadmap reconciliation (THREE refs, flip to "shipped v2.24.0"): `docs/concepts/active-orchestration.md` lines 56 and 69; `skills/utility-pm-critic/SKILL.md` line 63 (the `pm-workflow-orchestrator (v2.17)` forward-ref); `agents/pm-critic.md` line 137 (the "future state when `pm-workflow-orchestrator` ships in v2.17" forward-ref). These are TWO distinct files (critic SKILL line 63 + critic AGENT line 137), not one.
- [ ] 6.6.7 Sub-agent count sweep (4 -> 5, NO CI gate, MANUAL). Update present-tense surfaces: `docs/guides/using-sub-agents.md` (lines 43, 58, 69 + add the 5th `@agent-pm-skills:pm-workflow-orchestrator` example); `docs/getting-started/platforms.md` line 8 + its 4-name list; `docs/concepts/sub-agents.md` line 56 where present-tense; `README.md` line 858 "invocation examples for all four sub-agents"; the three manifest embedded "4 sub-agents (...)" name lists (6.4). LEAVE HISTORICAL: `runtime-components.md` line 37, `active-orchestration.md` line 39, `docs/index.mdx` line 293, the v2.16.0 CHANGELOG rows, `sub-agent-compatibility.md` v2.16.0-attested GATE prose.
- [ ] 6.6.8 `docs/reference/runtime-components.md`: add the engine row to the table, update present-tense "4 sub-agents ship" -> 5, add invocation examples; leave v2.16.0-historical framing.
- [ ] 6.6.9 `docs/reference/sub-agent-compatibility.md`: add the 5th row to the Cross-Client status matrix (orchestrator EXPERIMENTAL on ALL non-Claude clients AND native Claude Code EXPERIMENTAL until the smoke test closes); add a 5th row to the "Capability by Task" table as `Experimental / Experimental / Experimental`; PRESERVE the v2.16.0-attested prose (header line 25, "3 of 4" line 44, "The 4th" line 46, "All 4 ... EXPERIMENTAL" line 52, "Run all 4 tests" line 104) - update only present-tense totals.
- [ ] 6.6.10 New sub-agent doc note: add the sub-agent-to-skill composition path (first repo agent to invoke skills) to `docs/concepts/sub-agents.md` or `docs/contributing/sub-agent-design-patterns.md`.
- [ ] 6.6.11 `docs/internal/release-plans/v2.24.0/skills-manifest.yaml` (recommended): a `changed` row for `foundation-prioritized-action-plan` at `version: 1.1.0`, `previous_version: 1.0.0`, `change_type: changed`, `effort: plan-orchestrator`.

### 6.7 Generated pages - REGENERATE, do NOT hand-edit [SERIAL after 6.1-6.6]
- [ ] 6.7.1 Run `python scripts/generate-skill-pages.py`: creates `docs/skills/utility/utility-pm-workflow-orchestrator.md`, updates the per-classification index pages (`OUTPUT_DIR / group / "index.md"`) and `docs/reference/commands.md`.
- [ ] 6.7.2 Confirm `generate-showcase.py` and `generate-workflow-pages.py` need NO change (the sample is not in `skill-output-samples/`; the showcase generator does not consume sub-agent-samples).
- [ ] 6.7.3 Confirm the regenerated files diff cleanly against the hand-edits (the top-level `docs/skills/index.md` is hand-edited in 6.3.2 and is NOT touched by the generator).

### 6.8 Reconcile [SERIAL, last in Phase 6]
- [ ] 6.8.1 Run `bash scripts/check-count-consistency.sh` and `bash scripts/check-landing-page-counts.sh --strict`; resolve.
- [ ] 6.8.2 Manual breakdown re-grep: no stale `8 foundation`, `10 utility`, `63 total`, or "4 sub-agents" present-tense remains; confirm 9 / 11 / 30 / 15 and 5 sub-agents everywhere.

**Acceptance criteria:** counts re-derived to 65 / utility 11 / foundation 9 / sub-agents 5 across every surface; `check-count-consistency` + `check-landing-page-counts --strict` green; `validate-version-consistency` green; `validate-agents-md` green; `check-generated-content-untouched` green; the three roadmap refs flipped; `_chain-permitted.yaml` UNCHANGED.

---

## Phase 7: Native Skill-from-sub-agent smoke-test GATE - [SERIAL, hard build-time gate]

**Goal:** This is the single most important pre-tag verification. The engine is the FIRST repo agent to declare `Skill`; the conductor is cited ONLY for SHAPE, never as proof the mechanism works. The release MAY ship with the native path EXPERIMENTAL, but the smoke test MUST be RUN and its result RECORDED before tag. (plan exit criterion #10; engine spec AC #14; W2 spec AC #17)

**Tasks:**

- [ ] 7.1 In the installed plugin on the current Claude Code runtime, invoke the orchestrator and confirm (a) the engine can invoke a downstream skill via the `Skill` tool, and (b) whether that skill runs INLINE in the engine's context or ISOLATED. (Context7 implies inline; if inline, the disk-write + summarize-forward context-budget mitigation applies to the Claude Code path too.)
- [ ] 7.2 RECORD the result (works inline / works isolated / fails) in `docs/releases/Release_v2.24.0.md` (or the residual log).
- [ ] 7.3 Leave the native Claude Code cell in `docs/reference/sub-agent-compatibility.md` EXPERIMENTAL; remove the native EXPERIMENTAL label ONLY after a recorded PASS (not required for this release).
- [ ] 7.4 Exercise `--dry-run` on Claude Code AND at least one non-Claude client as the readiness probe (plan exit criterion #11).
- [ ] 7.5 Confirm all non-Claude clients remain labeled EXPERIMENTAL (no PRODUCTION claim; the maintainer-gate WRITE harness is a separate future effort).

**Acceptance criteria:** the smoke test is RUN and its result RECORDED; the native path is EXPERIMENTAL in `sub-agent-compatibility.md` and never claimed PRODUCTION; `--dry-run` exercised on Claude Code + one non-Claude client; all non-Claude clients EXPERIMENTAL.

---

## Phase 8: Pre-tag validator bundle + manual gates - [SERIAL, depends on Phases 1-7]

**Goal:** Run every enforcing validator with `--strict` on a clean tree plus the manual gates no CI enforces (per `feedback_pre-tag-validator-bundle.md`).

**Tasks:**

- [ ] 8.1 `bash scripts/pre-tag-validate.sh` (or `pwsh scripts/pre-tag-validate.ps1`) on a clean tree. This bundles `lint-skills-frontmatter`, `validate-agents-md`, `validate-commands`, the family validators, `check-internal-link-validity --strict`, `validate-docs-frontmatter --strict`, `check-no-body-h1 --strict`, `check-count-consistency`, `check-skill-cross-references`, `check-generated-content-untouched`, `validate-script-docs`, `validate-version-consistency`, `validate-codex-manifest`, `check-skill-sample-coverage`, `check-landing-page-counts --strict`, `check-workflow-generator-coverage`, `check-agents-md-command-sync`, `check-context-currency`.
- [ ] 8.2 `utility-pm-skill-validate --strict` on the NEW skill (`utility-pm-workflow-orchestrator`) AND the MODIFIED plan skill (`foundation-prioritized-action-plan`).
- [ ] 8.3 `bash scripts/validate-skill-history.sh` (the new HISTORY.md tracks the 1.1.0 SKILL.md version).
- [ ] 8.4 `scripts/lint-skills-frontmatter.{sh,ps1}` against the new SKILL.md; record the description word count is in 20-100.
- [ ] 8.5 `bash scripts/check-skill-sample-coverage.sh` passes UNMODIFIED (the `utility` classification is exempt via `in_scope_class()`; no script edit).
- [ ] 8.6 MANUAL: grep `agents/pm-workflow-orchestrator.md` and confirm `Agent` is ABSENT from the `tools:` line; confirm `agents/_chain-permitted.yaml` is UNCHANGED (still the single `pm-release-conductor` entry). No `scripts/*chain*` enforcement exists, so this is a manual gate.
- [ ] 8.7 MANUAL: confirm the AGENTS.md Sub-Agents prose entry (6.5.2) is present and the v2.16.0 framing preserved (not CI-protected).
- [ ] 8.8 Em-dash / en-dash sweep (codepoint scan for U+2014 / U+2013) over ALL new + edited files: `agents/pm-workflow-orchestrator.md`, the four `skills/utility-pm-workflow-orchestrator/` files, the library sample, the edited plan SKILL.md, the new HISTORY.md, all hygiene-touched docs. The `no-em-dashes` hook is the safety net; this sweep is the belt.
- [ ] 8.9 Resolve any finding; re-run the bundle until green.

**Acceptance criteria:** `pre-tag-validate --strict` green; both skills pass `utility-pm-skill-validate --strict`; `validate-skill-history` green; the `Agent`-absent grep and the `_chain-permitted.yaml`-unchanged diff confirmed; the AGENTS.md Sub-Agents prose entry verified; zero U+2014 / U+2013 across all new/edited files.

---

## Phase 9: Release-ZIP build verification - [SERIAL, depends on Phase 8]

**Goal:** Confirm the release ZIP carries the headline feature. v2.22.0 surfaced a P0 where `build-release.{sh,ps1}` shipped `.claude-plugin` but NOT `.codex-plugin`; the scripts now stage both (verified at `scripts/build-release.sh` lines 44-45, 57-58). Re-verify because v2.24.0 adds a new agent + skill.

**Tasks:**

- [ ] 9.1 Run the release build (`bash scripts/build-release.sh` or `pwsh scripts/build-release.ps1`) and inspect the staged tree.
- [ ] 9.2 Confirm the ZIP contains `agents/pm-workflow-orchestrator.md`, the full `skills/utility-pm-workflow-orchestrator/` tree (SKILL.md + 3 references), the library sample, both `.claude-plugin/` and `.codex-plugin/` manifests at 2.24.0, and the edited plan skill + HISTORY.md.

**Acceptance criteria:** the built ZIP contains every new/edited source file and both plugin manifests at the correct version; `validate-plugin.yml` guard (the v2.22.0 fix) would pass.

---

## Phase 10: IRREVERSIBLE PUBLISH PHASE - tag + GitHub Release + registry re-pin

> **WARNING - irreversible.** Everything below changes public, externally consumed state (a git tag, a published GitHub Release marked Latest, and a re-pinned marketplace registry). Do NOT begin until Phases 1-9 are all complete and green. A mistake here is fixed by a follow-up v2.24.1, not by yanking. This repo's `main` forbids merge commits (server ruleset, admin-bypassable): reconcile origin/main by REBASE, never merge; if a merge slips in, linearize via `git rebase -X theirs` + tree-equality check + force-with-lease (see `reference_pm-skills-main-linear-history`).

**Tasks:**

- [ ] 10.1 Reconcile origin/main into the release branch by REBASE (never merge). Confirm linear history.
- [ ] 10.2 Create the release commit with the full v2.24.0 diff. Commit message ends with the `Co-Authored-By` trailer per the harness rule; no Claude-attribution trailer per the project feedback rule.
- [ ] 10.3 Tag `v2.24.0` at the release commit; push the tag and `main`.
- [ ] 10.4 Confirm all CI is green on the tag (Validation, Validate-Plugin-Packaging, Release, Deploy-Pages, CodeQL, registry validate-registry).
- [ ] 10.5 Publish the GitHub Release with the `docs/releases/Release_v2.24.0.md` body; mark it Latest.
- [ ] 10.6 Re-pin the `product-on-purpose/agent-plugins` marketplace registry to v2.24.0; confirm registry CI green.
- [ ] 10.7 Verify a fresh marketplace install pulls v2.24.0 and the new skill + sub-agent are present.

**Acceptance criteria (plan exit criterion #12):** `v2.24.0` tag exists with linear history; GitHub Release published + Latest; registry re-pinned to v2.24.0; all CI green; fresh install pulls v2.24.0.

---

## Phase 11: Post-tag hygiene - [SERIAL, depends on Phase 10]

**Goal:** Flip statuses and bump the post-tag currency markers.

**Tasks:**

- [ ] 11.1 Flip `plan_v2.24.0.md` status PLANNED -> SHIPPED with the release date.
- [ ] 11.2 Flip this implementation plan status -> SHIPPED with the release date.
- [ ] 11.3 Bump `_agent-context/claude/CONTEXT.md` and `_agent-context/codex/CONTEXT.md` currency markers to v2.24.0 (plan exit criterion #13).
- [ ] 11.4 Confirm `check-context-currency` passes at 2.24.0.

**Acceptance criteria:** both plans SHIPPED; both CONTEXT.md markers at v2.24.0; `check-context-currency` green.

---

## Phase ordering + parallelization summary

| Phase | Description | Order | Parallel? |
|---|---|---|---|
| 0 | Optional spec re-review | first | n/a (skip by default) |
| 1 | Shared `PARSE-CONTRACT.md` | blocks 2-3 | SERIAL |
| 2 | W1 engine sub-agent | after 1 | PARALLEL with 3 |
| 3 | W2 dispatch skill + 3 refs | after 1 | PARALLEL with 2 |
| 4 | Parse/Cynefin/status fixtures | after 1-2 | PARALLEL with 5 |
| 5 | W3 plan handoff + HISTORY.md | after 2-3 | PARALLEL with 4 |
| 6 | FULL hygiene sweep | after 2-5 | 6.1-6.6 PARALLEL; 6.7-6.8 SERIAL |
| 7 | Native-Skill smoke-test gate | after 6 | SERIAL (hard build-time gate) |
| 8 | Pre-tag validator bundle + manual gates | after 1-7 | SERIAL |
| 9 | Release-ZIP build verification | after 8 | SERIAL |
| 10 | IRREVERSIBLE publish (tag + Release + registry) | after 9 | SERIAL |
| 11 | Post-tag hygiene | after 10 | SERIAL |

---

## Cross-cutting risks (condensed from the master plan)

| Risk | Mitigation |
|---|---|
| Native `Skill`-from-sub-agent delegation does not work (unexercised path) | Ships EXPERIMENTAL behind the Phase 7 smoke-test gate; never claimed PRODUCTION until a recorded PASS |
| Skills run inline in the engine context, blowing context budget | Disk-write auto-enables for 2+ step runs to `_pm-skills/plan-orchestrator/<run>/`; one-line summary per step; Phase 7(b) confirms inline-vs-isolated |
| Reviewer copies pm-critic "use proactively" frontmatter onto a delegating chain | Phase 2.8 hazard guard; AC asserts "Explicit invocation only; never fires proactively" + zero "proactiv" |
| Section 7 parser mis-handles compound `P1 and P2` / duplicate `P1` | Phase 4 mandatory fixtures from the three real bundled examples + two synthetic cases |
| Cynefin extracted as `Complex.` or guessed when ambiguous | Phase 4.2 first-whole-word extraction; ambiguous -> CHECKPOINTED; all four enum branches covered |
| Hidden sub-agent chain through `utility-pm-critic` breaks depth-2 | Phase 2.5 Category 1/2/3 classification; Category 2 inlines the leaf, never `Agent`; no `_chain-permitted.yaml` entry |
| Future drift adds `Agent` to the engine (CI-unenforced) | Phase 8.6 manual grep; positive "explicitly NOT Agent" in the body |
| Count breakdowns left stale (foundation wrongly bumped) | Phase 6 corrected baseline (foundation STAYS 9; utility is the increment); Phase 6.8 re-grep |
| AGENTS.md Sub-Agents prose entry silently omitted (not CI-protected) | Phase 6.5.2 hand-add; Phase 8.7 manual verify |

---

## Definition of done

1. All three specs' mechanical ACs pass (engine 14, dispatch skill 17, plan handoff 14), including the smoke-test run-and-record gate.
2. `agents/pm-workflow-orchestrator.md` exists, parses, `Agent` absent; `_chain-permitted.yaml` unchanged.
3. `skills/utility-pm-workflow-orchestrator/` ships SKILL.md + 3 references + the library sample; `utility-pm-skill-validate --strict` passes; description in the 20-100 word window; `check-skill-sample-coverage` passes unmodified.
4. `foundation-prioritized-action-plan` at v1.1.0 with the HANDOFF section, refined Identity bullet + guardrail 7, new HISTORY.md; nine-section output contract unchanged.
5. The D9-reopening note appears in BOTH `plan_v2.24.0.md` and the plan skill's HISTORY.md.
6. Counts re-derived to 65 / utility 11 / foundation 9 / sub-agents 5 everywhere; count + version + agents-md + generated-content validators green.
7. The three roadmap forward-references flipped to "shipped v2.24.0."
8. The native smoke test is RUN and RECORDED; the native path labeled EXPERIMENTAL until a PASS; all non-Claude clients EXPERIMENTAL; `--dry-run` exercised on Claude Code + one non-Claude client.
9. Pre-tag validator bundle green; both manual gates confirmed; zero U+2014 / U+2013 across all new/edited files; release ZIP carries the feature + both manifests.
10. v2.24.0 tagged (linear history), GitHub Release published + Latest, registry re-pinned to v2.24.0.
11. Both plans flipped to SHIPPED; both CONTEXT.md markers at v2.24.0.

Anything short of this is "shipped-but-not-validated" and earns a follow-up.
