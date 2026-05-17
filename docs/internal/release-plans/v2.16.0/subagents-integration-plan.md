# Subagents Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the first 4 plugin sub-agents for pm-skills under the new `subagents/` directory: `pm-critic`, `pm-skill-auditor`, `pm-changelog-curator`, `pm-release-conductor`. Each ships with a companion slash command, library samples, supporting documentation, AND (per master plan D30, added 2026-05-16 from Q7 walkthrough) a **dispatch skill** at `skills/utility-pm-{role}/` for cross-client compatibility. The slate opens the active-orchestration layer for Claude Code users AND extends sub-agent intent to non-Claude clients via dispatch skills that detect runtime and dispatch appropriately.

**Architecture:** Sub-agents are markdown files at `subagents/{name}.md` with YAML frontmatter declaring `name`, `description`, `tools`, `model`, `memory`. The description field is what Claude's intent classifier matches on; it determines proactive auto-delegation behavior. Sub-agents run in their own context window with their own tool budget. They cannot self-set `hooks`, `mcpServers`, or `permissionMode` (plugin security ceiling); users who want autonomy copy the agent into `.claude/agents/`.

**Companion slash commands** at `commands/{verb}.md` give the user a discoverable entry point. Body of each command is ~5 lines: "Use the pm-{name} agent to {do thing} on $ARGUMENTS."

**Composition model.** pm-critic is a user-facing reviewer with a proactive trigger. The other 3 are explicit-only utility agents. pm-release-conductor chains to pm-skill-auditor at gate G0 and pm-changelog-curator at gate G2 (Pattern 6 sub-agent chains, capped at 2 levels deep per D14).

**Cross-references:** Behavioral contracts for each sub-agent live in their spec docs (`spec_pm-critic.md`, `spec_pm-skill-auditor.md`, `spec_pm-changelog-curator.md`, `spec_pm-release-conductor.md`). Master release plan at `plan_v2.16.0.md` orchestrates this plan plus the doc-stack modernization and hygiene sub-plans.

---

## Status

**Plan ACTIVE.** Phase 1 COMPLETE 2026-05-17. 28 tasks across 8 phases.

### Where we are

| Phase | Status | Closing commit(s) |
|---|---|---|
| Phase 1: Foundation infrastructure | COMPLETE 2026-05-17 | _pending commit_ |
| Phase 2: Ship pm-critic | PENDING | - |
| Phase 3: Ship pm-skill-auditor | PENDING | - |
| Phase 4: Ship pm-changelog-curator | PENDING | - |
| Phase 5: Ship pm-release-conductor | PENDING | - |
| Phase 6: Library samples | PENDING | - |
| Phase 7: Documentation | PENDING | - |
| Phase 8: Integration check | PENDING | - |

### Phase 1 shipped artifacts (2026-05-17)

- `subagents/` directory created at repo root (lowercase, distinct from existing `AGENTS/` uppercase) with README.md placeholder, `_pairing.yaml`, `_chain-permitted.yaml` per D29 + D21
- `.claude-plugin/plugin.json` extended with `"agents": ["./subagents/"]` custom path declaration per master plan D31 (resolves Windows NTFS case-collision issue surfaced at execution time)
- `docs/reference/runtime-components.md` skeleton authored with empty sub-agent catalog (rows populate as Phase 2-5 ship), Cross-Client Compatibility section per D11 amended + D30, Composition Patterns section
- `docs/reference/project-structure.md` updated to list `subagents/` and explain the distinction from `AGENTS/`
- `AGENTS.md` Sub-Agents section added with cross-client compat note pointing to runtime-components.md
- `README.md` Project Structure tree updated to include subagents/ and runtime-components.md; component-class list updated to include sub-agents
- Validator inspection (Task 4): EXTEND validate-agents-md per D19 (implementation deferred to ci-plan Phase 2 Task 1; design wrinkle around NAME-based vs PATH-based check documented)
- Master plan D31 amendment authored (Ratified Decisions table + D4 amended + Decisions Index + count totals updated)
- Plan-set sweep across all 11 v2.16.0 plan files: `agents/` -> `subagents/` (140 occurrences), `.claude/agents/` and `.agents/skills/` preserved

### What's next

Phase 2 Task 5: author `subagents/pm-critic.md` per `spec_pm-critic.md`.

### Estimated remaining

5-8 sessions across remaining 7 phases (Phase 1 complete; previously estimated 6-9 including Phase 1). Phase 2 is the critical-path observation point: if pm-critic doesn't behave well against real PM artifacts, Phases 3-5 amend before authoring.

---

## Prerequisites

- [x] v2.15.0 tagged and shipped (HEAD `a108301`)
- [x] v2.15.1 patch shipped (HEAD `6f89439`, 2026-05-17): post-tag audit remediation; +3 enforcing validators + 1 orchestration script
- [x] v2.15.2 closeout shipped: cycle closure + v2.16.0 plan reconciliation
- [x] Sub-agent strategy + implementation plan authored in `_working/` (May 7-10)
- [x] All 27 enforcing validators stable on origin/main (was 24 at v2.15.0 tag; +3 from v2.15.1)
- [x] Phase 0 Adversarial Review pattern proven across 2 v2.15.0 review cycles
- [x] Master plan ratified decisions D1-D18 (see `plan_v2.16.0.md`)
- [ ] All 4 spec docs reviewed (`spec_pm-critic.md`, `spec_pm-skill-auditor.md`, `spec_pm-changelog-curator.md`, `spec_pm-release-conductor.md`)

---

## Scope

This plan covers:

- New top-level `subagents/` directory + Claude Code plugin sub-agent convention adoption
- 4 sub-agent definition files (`subagents/pm-critic.md`, `subagents/pm-skill-auditor.md`, `subagents/pm-changelog-curator.md`, `subagents/pm-release-conductor.md`)
- 4 companion slash commands (`commands/critic.md`, `commands/audit-repo.md`, `commands/draft-changelog.md`, `commands/release.md`)
- 12 library samples (3 per sub-agent, thread-aligned where applicable)
- New documentation surface: `docs/reference/runtime-components.md`, `docs/guides/adversarial-review.md`, `docs/contributing/release-runbook.md`
- AGENTS.md Sub-Agents section
- README.md What's New + Sub-Agents mention
- CI updates: `validate-agents-md` recognition of `subagents/` directory (or a new validator if needed)
- Optional: `validate-sub-agents.{sh,ps1}` validator pair if pattern proves out

This plan does NOT cover:

- Astro 6 upgrade (see `doc-stack-modernization-plan.md`)
- CONTEXT.md refresh and other hygiene work (see `repo-hygiene-plan.md`)
- pm-workflow-orchestrator, pm-frontmatter-doctor, pm-sample-curator (held for v2.17.0+ per D2)
- `.claude/pm-skills.local.md` user-settings parser (deferred per D10)
- PostToolUse hooks (deferred per master plan Out of Scope)

---

## Ratified Decisions

These decisions are inherited from `plan_v2.16.0.md` D1-D18. Sub-plan-specific decisions below.

| # | Decision area | Ratified decision | Authored into |
|---|---|---|---|
| **SI1** | **subagents/ directory layout** | Flat: `subagents/{name}.md`. No namespace prefix in v2.16. | Phase 1 Task 1 |
| **SI2** | **Sub-agent naming convention** | `pm-{role}` (matches existing `utility-pm-*` pattern). All 4 use `pm-` prefix. | Per spec docs |
| **SI3** | **Companion command naming** | Verb-shaped: `/critic`, `/audit-repo`, `/draft-changelog`, `/release`. NOT `pm-` prefixed (commands stay verb-shaped per existing convention). | Phase 2-5 |
| **SI4** | **Sub-agent CI recognition** | **Inherits master plan D19:** EXTEND `validate-agents-md.{sh,ps1}` to recognize `subagents/` directory and verify sub-agent invariants. New dedicated `validate-sub-agents.{sh,ps1}` DEFERRED to v2.17 if invariant set grows past comfortable scope. CI plan Phase 1 Task 1 inspects current scope and confirms feasibility before authoring. | Phase 1 Task 4 + master plan D19 |
| **SI5** | **Sample-coverage tier for sub-agents** | Tier 0 (one per sub-agent against real artifacts) for v2.16.0 ship. Three samples per sub-agent ships in Phase 6 (thread-aligned where applicable). Tier 1+ deferred to v2.17. | Phase 6 |
| **SI6** | **Adversarial review of integration plan** | Run Phase 0 review against this plan + spec docs after Phase 2 (post-pm-critic ship) AND at end of cycle. Two checkpoints. | Phase 2 + Phase 8 |
| **SI7** | **Slash command frontmatter** | All 4 commands use the standard pm-skills command convention: `description:` field, optional `argument-hint:`. No new frontmatter fields. | Phase 2-5 |
| **SI8** | **Sub-agent severity grammar** | P0/P1/P2/P3 across all 4 (inherits master plan D15). | Per spec docs |

---

## File Structure

### Files to create (40+ new files; was 28 before Q7 added dispatch skills)

**Sub-agents (4 files)**
- `subagents/pm-critic.md`
- `subagents/pm-skill-auditor.md`
- `subagents/pm-changelog-curator.md`
- `subagents/pm-release-conductor.md`

**Slash commands (4 files)**
- `commands/critic.md`
- `commands/audit-repo.md`
- `commands/draft-changelog.md`
- `commands/release.md`

**Dispatch skills (12 files; added per Q7 / D30)**

Each dispatch skill detects runtime and either invokes the native sub-agent (Claude Code) or reads the agent file inline (non-Claude clients). Dispatch skills are normal pm-skills utility skills, validated by existing validators.

- `skills/utility-pm-critic/SKILL.md` + `references/TEMPLATE.md` + `references/EXAMPLE.md`
- `skills/utility-pm-skill-auditor/SKILL.md` + `references/TEMPLATE.md` + `references/EXAMPLE.md`
- `skills/utility-pm-changelog-curator/SKILL.md` + `references/TEMPLATE.md` + `references/EXAMPLE.md`
- `skills/utility-pm-release-conductor/SKILL.md` + `references/TEMPLATE.md` + `references/EXAMPLE.md` (uses "reference + execute inline" pattern for chain composition on non-Claude clients)

Dispatch skill shipping is CONDITIONAL on Phase 2 spike success. If pm-critic dispatch is unreliable on non-Claude clients, fall back to Option F (clean Claude-Code-only labeling, no dispatch skills).

**Reference and guides (3 files)**
- `docs/reference/runtime-components.md`
- `docs/guides/adversarial-review.md`
- `docs/contributing/release-runbook.md`

**Library samples (12 files)**
- `library/sub-agent-samples/pm-critic/sample_pm-critic_brainshelf_prd-review.md`
- `library/sub-agent-samples/pm-critic/sample_pm-critic_storevine_okr-review.md`
- `library/sub-agent-samples/pm-critic/sample_pm-critic_workbench_meeting-recap-review.md`
- `library/sub-agent-samples/pm-skill-auditor/sample_pm-skill-auditor_brainshelf_pre-release.md`
- `library/sub-agent-samples/pm-skill-auditor/sample_pm-skill-auditor_storevine_drift-detection.md`
- `library/sub-agent-samples/pm-skill-auditor/sample_pm-skill-auditor_workbench_cross-cutting.md`
- `library/sub-agent-samples/pm-changelog-curator/sample_pm-changelog-curator_brainshelf_minor-release.md`
- `library/sub-agent-samples/pm-changelog-curator/sample_pm-changelog-curator_storevine_patch-release.md`
- `library/sub-agent-samples/pm-changelog-curator/sample_pm-changelog-curator_workbench_feature-release.md`
- `library/sub-agent-samples/pm-release-conductor/sample_pm-release-conductor_brainshelf_clean-run.md`
- `library/sub-agent-samples/pm-release-conductor/sample_pm-release-conductor_storevine_gate-failure.md`
- `library/sub-agent-samples/pm-release-conductor/sample_pm-release-conductor_workbench_chained-run.md`

**Library sample directory README (1 file)**
- `library/sub-agent-samples/README.md`

**Validator (potentially new, deferred decision)**
- `scripts/validate-sub-agents.sh` (Phase 1 Task 4 decides whether to ship)
- `scripts/validate-sub-agents.ps1` (same)
- `scripts/validate-sub-agents.md` (same)

### Files to modify

- `AGENTS.md` (add Sub-Agents section)
- `README.md` (add What's New + Sub-Agents component class mention)
- `scripts/validate-agents-md.sh` + `.ps1` (extend to recognize subagents/ directory if it scans skill/command/workflow paths)
- `.claude-plugin/plugin.json` (no schema change; only if plugin manifest needs sub-agent declarations - verify against Claude Code plugin docs)
- `docs/reference/project-structure.md` (add subagents/ directory entry)

---

## Phase 1: Foundation Infrastructure (4 tasks)

**Goal:** Land the `subagents/` directory convention, runtime-components.md skeleton, AGENTS.md Sub-Agents section, and CI recognition before any individual sub-agent ships. Phase 1 is intentionally bare metal: no sub-agent definitions yet, just the surface they will land into.

### Task 1: Scaffold subagents/ directory, pairing manifest, chain-permitted allowlist, runtime-components.md skeleton

- [ ] Create `subagents/` directory at repo root (empty for now; `.gitkeep` or placeholder README)
- [ ] Create `subagents/_pairing.yaml` (added per Codex R12 + master plan D29) with the 4 sub-agent + slash command pairings:
  ```yaml
  pairings:
    pm-critic:
      commands: [critic]
    pm-skill-auditor:
      commands: [audit-repo]
    pm-changelog-curator:
      commands: [draft-changelog]
    pm-release-conductor:
      commands: [release]
  ```
- [ ] Create `subagents/_chain-permitted.yaml` (added per master plan D21) with the explicit Agent-tool allowlist:
  ```yaml
  # Sub-agents permitted to have `Agent` in their tools list.
  # Adding an entry here is a security-relevant change requiring review.
  chain_permitted:
    - pm-release-conductor
  ```
- [ ] Create `docs/reference/runtime-components.md` with the following sections:
  - Introduction (what runtime components are; how they differ from skills)
  - Sub-Agents catalog (table with columns: Name, Audience, Trigger, Lifetime, Tool Surface, Composition, Dispatch Skill); leave rows empty for now
  - Hooks catalog (empty placeholder; v2.17+ scope)
  - Output Styles catalog (empty placeholder)
  - How to discover and invoke (both native Claude Code AND dispatch skill paths)
  - **Cross-Client Compatibility section (per D11 amended + D30):** documents single-tool user assumption; explains dispatch skill mechanism; clarifies codex-rescue is optional shortcut not baseline; lists which sub-agents have dispatch skills (post-Phase 2 spike)
  - Composition patterns (link to strategy doc; brief summary; note "reference + execute inline" pattern for conductor on non-Claude clients)
- [ ] Add `docs/reference/runtime-components.md` to the Starlight sidebar config in `astro.config.mjs`
- [ ] Update `docs/reference/project-structure.md` to mention `subagents/` directory + `_pairing.yaml` + `_chain-permitted.yaml`

**Done when:** `subagents/` exists in git with both YAML manifests; runtime-components.md renders in Astro build; sidebar entry visible; pairing + chain-permitted manifests cover all 4 v2.16 sub-agents.

### Task 2: Add Sub-Agents section to AGENTS.md

- [ ] Add a top-level "Sub-Agents" section to `AGENTS.md` between the existing skills section and any trailing notes
- [ ] Section body: pointer to `docs/reference/runtime-components.md` for full catalog; brief inline description of what sub-agents are
- [ ] **Add Cross-Client compatibility note per D11 amendment + D30:** "Sub-agents are a Claude Code plugin feature. Non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI) access sub-agent intent via dispatch skills at `skills/utility-pm-{role}/`. The dispatch skills detect runtime and dispatch appropriately. codex-rescue is an optional shortcut for users with both tools, NOT a baseline requirement."
- [ ] Do NOT duplicate per-agent detail in AGENTS.md; runtime-components.md is canonical

**Done when:** AGENTS.md has a Sub-Agents section linking to runtime-components.md with Cross-Client compatibility note. AGENTS.md sync validator passes.

### Task 3: Update README.md

- [ ] Add a brief Sub-Agents mention to the README component-class list (whatever section describes skills + commands + workflows today)
- [ ] Leave the "What's New in v2.16.0" entry for Phase 8 pre-tag (cycle is too early to claim completion in the README)

**Done when:** README mentions sub-agents as a v2.16.0-introduced component class.

### Task 4: Decide and ship CI recognition for subagents/

- [x] **Inspect `scripts/validate-agents-md.{sh,ps1}`** (2026-05-17): current validator scans `skills/*` directories and greps AGENTS.md for `skills/[a-z0-9-]+/SKILL\.md` patterns (60 lines, .sh + .ps1 mirrors). It currently does NOT scan workflows/, commands/, or subagents/. Extension to scan subagents/ is structurally symmetric to the existing skills/ scan: enumerate `subagents/*.md` files (excluding `_pairing.yaml`, `_chain-permitted.yaml`, README.md), grep AGENTS.md, check sync.
- [x] **Decision (ratifies master plan D19):** EXTEND validate-agents-md per D19. Decision B (new dedicated validator) DEFERRED to v2.17 if invariant set grows past comfortable scope.
- [x] **Design wrinkle identified for ci-plan implementation:** AGENTS.md references sub-agents by NAME (not path) per D5 + D12 (referential discipline; runtime-components.md is canonical catalog). The extension cannot clone the skills-path-grep pattern directly; it must either (a) grep AGENTS.md for sub-agent NAMES (e.g., `pm-critic`, `pm-skill-auditor`, etc. in the Sub-Agents section), OR (b) shift to grep runtime-components.md for path references. Design choice is captured in ci-plan Phase 2 Task 1 with current preference: (a) NAME-based check against AGENTS.md Sub-Agents section + path-based check against runtime-components.md table.
- [x] **Phase 1 baseline current-state verification:** empty subagents/*.md (only manifests + README.md exist after Phase 1 Task 1) means validate-agents-md is currently a no-op for subagents/. Existing CI is green. The empty subagents/ baseline is preserved through Phase 1.
- [DEFERRED to ci-plan Phase 2 Task 1] Actual extension code: scan subagents/*.md, verify AGENTS.md + runtime-components.md references match, chain-permitted allowlist enforcement (D21 HARD FAIL), `tools:` scalar form check (D20). Plus `.github/workflows/validation.yml` update if needed.

**Done when:** CI catches an unreferenced subagents/ entry; CI runs green on the empty subagents/ directory baseline.

**Phase 1 status (2026-05-17):** Decision ratified per D19; current CI baseline is green with empty subagents/ catalog; implementation of the extension itself is owned by ci-plan Phase 2 Task 1 and lands BEFORE Phase 2 ships pm-critic.md (so the first sub-agent file lands against an extended validator).

---

## Phase 2: Ship pm-critic (5 tasks)

**Goal:** First sub-agent. Single file plus companion slash command plus 1 library sample plus user-facing guide. Critical-path observation point: exercise pm-critic against real v2.15.0 PM artifacts before committing to Phases 3-5.

### Task 5: Author subagents/pm-critic.md

- [ ] Create `subagents/pm-critic.md` with frontmatter per `spec_pm-critic.md` section "Frontmatter"
- [ ] System prompt body authored per spec doc section "System Prompt Structure"
- [ ] Verify referential-prompt discipline (no embedded standards content; reads canonical docs at invocation time)
- [ ] Verify proactive trigger language: `description:` includes "use proactively after any PM-artifact-producing skill"

**Done when:** subagents/pm-critic.md exists; frontmatter validates; system prompt is referential.

### Task 6: Author commands/critic.md

- [ ] Create `commands/critic.md` with `description:` and `argument-hint:` fields per SI7
- [ ] Body: 3-5 lines invoking pm-critic with $ARGUMENTS (artifact path) or session-context fallback
- [ ] Verify validate-commands passes

**Done when:** /critic resolves to pm-critic on slash invocation.

### Task 7: Author docs/guides/adversarial-review.md

- [ ] Create the guide with the following structure:
  - What adversarial review is (brief; references Phase 0 pattern)
  - When to invoke pm-critic (proactive vs explicit; severity floor configuration)
  - How findings are graded (P0/P1/P2/P3 grammar; what each level means; example findings per level)
  - Composition with skills (the deliver-prd to pm-critic to revise loop)
  - Codex parity path: `codex:codex-rescue` with adversarial-review prompt template
  - Opt-out path (copy to `.claude/agents/` and remove proactive trigger)
- [ ] Add to Starlight sidebar
- [ ] Cross-reference from runtime-components.md sub-agent entry

**Done when:** adversarial-review.md exists, renders, and documents both Claude and Codex paths.

### Task 8: Ship 1 library sample for Phase 2

- [ ] Create `library/sub-agent-samples/pm-critic/sample_pm-critic_brainshelf_prd-review.md`
- [ ] Sample is a real findings report against the Brainshelf PRD sample (already in library/skill-output-samples/)
- [ ] Demonstrates all 4 severity grades if possible; minimum 1 P0 or P1 to show the agent does push back
- [ ] Additional 2 samples (storevine + workbench) ship in Phase 6

**Done when:** sample exists, link-validator passes, demonstrates non-trivial findings.

### Task 9: Dual-purpose spike - pm-critic observation + dispatch skill reliability (expanded per Q7 / D30)

**Purpose 1: pm-critic behavior validation.**

- [ ] Run pm-critic (native sub-agent invocation in Claude Code) against at least 3 distinct artifact types from v2.15.0 library: a PRD, an OKR set, a meeting recap
- [ ] Capture observations: false-positive rate, missed findings, scope drift in system prompt, severity calibration
- [ ] If signal-to-noise ratio is poor (>30% false positives or critical misses), AMEND the spec doc + agent definition before proceeding to Phase 3

**Purpose 2: Dispatch skill reliability spike (added per Q7 / D30).**

- [ ] Author `skills/utility-pm-critic/SKILL.md` per dispatch skill pattern (see master plan D30):
  ```markdown
  ---
  name: utility-pm-critic
  description: Run adversarial review on a PM artifact via pm-critic (native sub-agent on Claude Code; inline execution on other clients)
  classification: utility
  ---

  ## Instructions

  **If you are running in Claude Code with the pm-skills plugin:**
  Invoke `@agent-pm-critic` on the target artifact. Pass the artifact path
  as argument. Return the findings to the user.

  **If you are running in any other client** (Codex CLI, Cursor, Windsurf,
  Gemini CLI, Copilot, ChatGPT, etc.):
  Read the canonical agent definition at `subagents/pm-critic.md`. Execute the
  system prompt body in that file as your operating instructions for this
  turn. Read the target artifact. Return findings graded P0/P1/P2/P3 with
  concrete fix suggestions, formatted per the guide at
  `docs/guides/adversarial-review.md`. End the output with the layered
  structure per master plan D26: full findings + Status Summary section
  + Status YAML block.
  ```
- [ ] Author `references/TEMPLATE.md` and `references/EXAMPLE.md` for the dispatch skill (TEMPLATE describes the findings format; EXAMPLE shows a real dispatch run)
- [ ] Test on Claude Code: invoke `/utility-pm-critic` or the equivalent skill invocation; verify it dispatches to `@agent-pm-critic` cleanly
- [ ] Test on a non-Claude client (Codex CLI or Cursor or equivalent): invoke the skill; verify the AI reads `subagents/pm-critic.md` and executes inline; verify findings are produced; verify the layered Status structure is present
- [ ] Record dispatch reliability observations: did the AI detect runtime correctly? Did it execute inline cleanly? Any drift or weirdness?

**Combined update to runtime-components.md:**

- [ ] Update `docs/reference/runtime-components.md` sub-agents table with pm-critic row (Audience: User; Trigger: Proactive on Claude Code, explicit dispatch skill on other clients; Lifetime: Single turn; Tool Surface: Read/Grep/Glob; Composition: pairs with all PM-artifact-producing skills + dispatch skill at skills/utility-pm-critic/)
- [ ] Add Cross-Client Compatibility section per master plan D30 documenting the dispatch skill mechanism

**Done when:** pm-critic exercised against >=3 artifact types AND dispatch skill tested on Claude Code + at least one non-Claude client; observations recorded; runtime-components.md has pm-critic row + Cross-Client section.

**GATE A (pm-critic behavior): if signal-to-noise is poor, AMEND specs before Phase 3.**

**GATE B (dispatch skill reliability, per D30): if dispatch is unreliable on non-Claude clients, FALL BACK to Option F (clean Claude-Code-only labeling) for the slate. Skip dispatch skills in Phases 3-5. Update D30 to "FALLBACK: dispatch skills not shipped in v2.16; revisit in v2.17."**

**GATE C (conductor dispatch sub-spike, deferred to Phase 5): if pm-critic dispatch works, run a sub-spike on simulating the conductor's chain composition via "reference + execute inline" pattern with pm-critic delegating to itself. If that works, ship conductor dispatch in Phase 5. If not, ship D-revised (3 dispatch skills; conductor stays Claude-only).**

---

## Phase 3: Ship pm-skill-auditor (4 tasks)

**Goal:** Repo-level cross-cutting governance sub-agent. Explicit-only. Foundation for the conductor's G0 audit gate.

### Task 10: Author subagents/pm-skill-auditor.md

- [ ] Create `subagents/pm-skill-auditor.md` per `spec_pm-skill-auditor.md` section "Frontmatter" and "System Prompt Structure"
- [ ] Tools list: Bash (validator invocation), Read, Grep, Glob
- [ ] Memory: none (default per D13)
- [ ] No proactive trigger (explicit only per D7)

**Done when:** subagents/pm-skill-auditor.md exists; frontmatter validates; description is explicit-only.

### Task 11: Author commands/audit-repo.md

- [ ] Create `commands/audit-repo.md` with `description:` "Run repo-wide cross-cutting governance audit via pm-skill-auditor"
- [ ] No arguments (or optional `--since-tag` argument for incremental audits)
- [ ] Body invokes pm-skill-auditor

**Done when:** /audit-repo resolves to pm-skill-auditor.

### Task 12: Ship 1 library sample (additional 2 in Phase 6)

- [ ] Create `library/sub-agent-samples/pm-skill-auditor/sample_pm-skill-auditor_brainshelf_pre-release.md`
- [ ] Sample is a pre-release audit run against the current repo state; shows real cross-cutting issues found (or "0 issues found, repo clean" if so)

**Done when:** sample exists; demonstrates real audit output.

### Task 13: Exercise pm-skill-auditor + ship dispatch skill + update runtime-components.md

- [ ] Run pm-skill-auditor (native invocation) against origin/main HEAD
- [ ] Verify it surfaces at least 1 real cross-cutting issue or confirms clean state
- [ ] **CONDITIONAL on Phase 2 GATE B success:** Author `skills/utility-pm-skill-auditor/SKILL.md` + references/ per dispatch skill pattern (mirroring `skills/utility-pm-critic/`). System prompt body references `subagents/pm-skill-auditor.md`. Includes layered output structure (full audit findings + Status Summary + Status YAML).
- [ ] Test dispatch skill on Claude Code + at least one non-Claude client
- [ ] Update runtime-components.md with pm-skill-auditor row + dispatch skill reference

**Done when:** auditor exercised; dispatch skill shipped if Phase 2 GATE B passed; runtime-components.md row added.

---

## Phase 4: Ship pm-changelog-curator (4 tasks)

**Goal:** CHANGELOG drafter from git log. Pairs with conductor at G2. Encodes CLAUDE.md hygiene rules.

### Task 14: Author subagents/pm-changelog-curator.md

- [ ] Create `subagents/pm-changelog-curator.md` per `spec_pm-changelog-curator.md`
- [ ] System prompt references `CLAUDE.md` CHANGELOG hygiene section (D12 referential discipline)
- [ ] Tools: Bash (git log), Read, Grep

**Done when:** agent definition exists; references CLAUDE.md hygiene rules.

### Task 15: Author commands/draft-changelog.md

- [ ] Create `commands/draft-changelog.md` with `description:` "Draft CHANGELOG entries from git log via pm-changelog-curator"
- [ ] Optional `since-tag` argument (default: most recent tag)

**Done when:** /draft-changelog resolves.

### Task 16: Ship 1 library sample (additional 2 in Phase 6)

- [ ] Create `library/sub-agent-samples/pm-changelog-curator/sample_pm-changelog-curator_brainshelf_minor-release.md`
- [ ] Sample shows the curator drafting v2.16.0 entries from the actual v2.16 commit range (use a dry-run snapshot of partial work-in-progress commits)

**Done when:** sample exists; output respects CLAUDE.md hygiene rules.

### Task 17: Exercise pm-changelog-curator + ship dispatch skill + update runtime-components.md

- [ ] Run pm-changelog-curator (native invocation) with `--since-tag v2.15.0`
- [ ] Verify output does not reference gitignored `_NOTES/` paths
- [ ] Verify output describes what changed (not where internal files are)
- [ ] Verify dirty-tree refusal (added per Codex R06 / D25): deliberately introduce uncommitted changes and confirm curator refuses
- [ ] Verify layered output structure (full draft + Status Summary + Status YAML) per Q6 reconsideration
- [ ] **CONDITIONAL on Phase 2 GATE B success:** Author `skills/utility-pm-changelog-curator/SKILL.md` + references/ per dispatch skill pattern. System prompt body references `subagents/pm-changelog-curator.md`.
- [ ] Test dispatch skill on Claude Code + at least one non-Claude client
- [ ] Update runtime-components.md with pm-changelog-curator row + dispatch skill reference

**Done when:** curator exercised; dispatch skill shipped if Phase 2 GATE B passed; output validated against CLAUDE.md hygiene + layered structure; row added.

---

## Phase 5: Ship pm-release-conductor (5 tasks)

**Goal:** Guided release runbook with 5 gates. Chains to auditor + curator. Most complex sub-agent in the slate.

### Task 18: Author subagents/pm-release-conductor.md

- [ ] Create `subagents/pm-release-conductor.md` per `spec_pm-release-conductor.md`
- [ ] Tools: Bash, Read, Edit, Grep, Glob, Agent (Agent required for sub-agent chains)
- [ ] System prompt encodes all 5 gates with explicit confirmation pauses
- [ ] G0 gate references pm-skill-auditor; G2 gate references pm-changelog-curator (chain composition)
- [ ] em-dash sweep enforced at G0 per D9

**Done when:** agent definition exists; gates documented in system prompt.

### Task 19: Author commands/release.md

- [ ] Create `commands/release.md` with `description:` "Guided release runbook via pm-release-conductor"
- [ ] Required argument: target version (e.g., `/release v2.16.0`)
- [ ] Validate argument shape (vN.M.P semver) before invoking

**Done when:** /release v2.16.0 resolves; argument validation works.

### Task 20: Author docs/contributing/release-runbook.md

- [ ] Create the canonical release runbook that the conductor reads at invocation time (D12 referential discipline)
- [ ] Document all 5 gates with what each verifies and what blocks advancement:
  - G0: Pre-tag readiness (validators, CI, em-dash, aggregate counters)
  - G1: Adversarial review status (Phase 0 complete; findings dispositioned)
  - G2: Version bump (plugin.json, CHANGELOG, release plan); chains to pm-changelog-curator
  - G3: Tag annotated message + push
  - G4: Post-tag hygiene (plugin install path, marketplace registration, doc-stack rebuild trigger if applicable)
- [ ] Document the rollback semantics: gate failure pauses; never proceeds past failed gate
- [ ] Codex parity: same runbook is usable as a manual reference

**Done when:** release-runbook.md exists; renders in Astro; conductor system prompt references it.

### Task 21: Ship 1 library sample showing chained run (additional 2 in Phase 6)

- [ ] Create `library/sub-agent-samples/pm-release-conductor/sample_pm-release-conductor_workbench_chained-run.md`
- [ ] Sample shows a full dry-run release with G0 chaining to auditor and G2 chaining to curator
- [ ] Demonstrate the 2-level chain depth limit (auditor + curator do not chain further)

**Done when:** sample demonstrates chain composition; depth limit respected.

### Task 22: Exercise pm-release-conductor + conductor sub-spike + ship dispatch skill (conditional) + update runtime-components.md

- [ ] Run pm-release-conductor (native invocation) against a feature branch with `--dry-run` mode (or stop at G3 before actual tag)
- [ ] Verify all 6 gates (G0, G1, G2, G2.5, G3, G4) pause and request confirmation per D22
- [ ] Verify G0 chain to auditor returns audit output (with layered Status structure per D26) before advancing
- [ ] Verify G2 chain to curator returns draft (with layered Status structure) before advancing
- [ ] Verify G2.5 commit gate works: stages files, commits, verifies clean tree, re-runs G0, pushes, waits for CI green, captures SHA
- [ ] Verify G4 P0 blocking power: synthetic plugin install path failure should block "Release complete" output per D23
- [ ] Verify `--skip-gates` is NOT accepted (removed per D24)
- [ ] **CONDITIONAL on Phase 2 GATE C (conductor sub-spike):** Run the conductor sub-spike with pm-critic delegating to itself via "reference + execute inline" pattern. If reliable, author `skills/utility-pm-release-conductor/SKILL.md` + references/ that inlines auditor + curator behaviors at G0 + G2 on non-Claude clients. Test on Claude Code + at least one non-Claude client.
- [ ] **If Phase 2 GATE C fails:** Ship D-revised - conductor stays Claude-Code-only; only 3 dispatch skills ship (pm-critic, pm-skill-auditor, pm-changelog-curator). Document the conductor's Claude-Code-only nature in runtime-components.md Cross-Client section.
- [ ] Update runtime-components.md with pm-release-conductor row + Composition Patterns section noting the chain + dispatch skill availability status (or Claude-Code-only note if D-revised path taken)

**Done when:** dry-run flows end-to-end (all 6 gates); chain composition verified; layered Status envelope parsing verified at G0 and G2; G4 blocking verified; dispatch skill shipped per GATE C outcome; runtime-components.md updated accordingly.

---

## Phase 6: Library Samples - Complete Coverage (4 tasks)

**Goal:** Ship the remaining 8 of 12 library samples (Phase 2-5 each shipped 1 of 3). Pattern matches Meeting Skills Family: 3 thread-aligned samples per sub-agent.

### Task 23: Ship pm-critic samples 2 + 3

- [ ] Create `library/sub-agent-samples/pm-critic/sample_pm-critic_storevine_okr-review.md` (review against Storevine OKR set sample)
- [ ] Create `library/sub-agent-samples/pm-critic/sample_pm-critic_workbench_meeting-recap-review.md` (review against Workbench meeting recap sample)
- [ ] Both samples produce real findings (not staged)

**Done when:** 3/3 pm-critic samples shipped.

### Task 24: Ship pm-skill-auditor samples 2 + 3

- [ ] Create `library/sub-agent-samples/pm-skill-auditor/sample_pm-skill-auditor_storevine_drift-detection.md` (audit showing aggregate-counter drift class)
- [ ] Create `library/sub-agent-samples/pm-skill-auditor/sample_pm-skill-auditor_workbench_cross-cutting.md` (audit showing skill-without-command or command-without-skill)
- [ ] Samples may use synthetic but realistic drift scenarios; document the synthetic nature in sample preamble

**Done when:** 3/3 auditor samples shipped.

### Task 25: Ship pm-changelog-curator samples 2 + 3

- [ ] Create `library/sub-agent-samples/pm-changelog-curator/sample_pm-changelog-curator_storevine_patch-release.md` (patch release with single-line fix)
- [ ] Create `library/sub-agent-samples/pm-changelog-curator/sample_pm-changelog-curator_workbench_feature-release.md` (feature release with multi-track CHANGELOG)
- [ ] All samples respect CLAUDE.md hygiene rules verbatim

**Done when:** 3/3 curator samples shipped.

### Task 26: Ship pm-release-conductor samples 1 + 2 + README

- [ ] Create `library/sub-agent-samples/pm-release-conductor/sample_pm-release-conductor_brainshelf_clean-run.md` (happy-path release; all 5 gates pass first try)
- [ ] Create `library/sub-agent-samples/pm-release-conductor/sample_pm-release-conductor_storevine_gate-failure.md` (G0 fails with aggregate-counter drift; conductor halts; maintainer fixes; conductor resumes)
- [ ] Create `library/sub-agent-samples/README.md` cataloging all 12 samples with sub-agent + thread + scenario columns

**Done when:** 3/3 conductor samples shipped; library/sub-agent-samples/README.md complete.

---

## Phase 7: Documentation Completeness (1 task)

**Goal:** Narrow consistency check for integration-plan-shipped docs (runtime-components.md, adversarial-review.md, release-runbook.md). Broader cross-cutting sweep across ALL new docs (concept + usage + contributing) is owned by `docs-plan.md` Phase 4 Task 9 per SR-P1-04. This phase verifies the integration-plan deliverables; docs-plan Phase 4 verifies the full surface.

### Task 27: Integration-plan doc consistency check

- [ ] Verify `docs/reference/runtime-components.md` has all 4 sub-agent rows with correct trigger / lifetime / tool surface / composition data
- [ ] Verify `docs/guides/adversarial-review.md` cross-references pm-critic spec doc
- [ ] Verify `docs/contributing/release-runbook.md` cross-references pm-release-conductor spec doc + the G0-G4 + new G2.5 gates match the conductor's system prompt exactly (the G2.5 commit gate is critical; verify content covers Codex R01 closure)
- [ ] Verify all 4 spec docs cross-reference each other where composition exists
- [ ] DEFER full cross-cutting sweep to docs-plan Phase 4 Task 9 (broader scope including concept docs, usage docs, contributor docs)

**Done when:** integration-plan docs cross-link cleanly; broader sweep deferred to docs-plan.

---

## Phase 8: Integration Check (1 task)

**Goal:** End-to-end smoke test before pre-tag artifact pass.

### Task 28: Full sub-agent slate integration check

- [ ] Invoke `/critic` against a fresh PM artifact; verify proactive description + explicit slash command both invoke pm-critic correctly
- [ ] Invoke `/audit-repo` against current repo state; verify auditor runs all enforcing validators and surfaces cross-cutting issues
- [ ] Invoke `/draft-changelog --since-tag v2.15.0`; verify curator output respects CLAUDE.md hygiene
- [ ] Invoke `/release v2.16.0 --dry-run` (or equivalent); verify conductor walks all 5 gates including 2 chained sub-agent calls
- [ ] Verify Agent tool budget on conductor (chain to auditor + curator stays within reasonable token budget)
- [ ] Verify `validate-agents-md` (or new validator) green on full slate
- [ ] Verify `validate-commands` green on the 4 new commands
- [ ] Verify CI green on the entire feature branch
- [ ] Verify Phase 0 Adversarial Review run against this integration plan + 4 spec docs; findings dispositioned

**Done when:** end-to-end smoke test passes; Phase 0 review clean; ready for master plan Phase 8 pre-tag pass.

---

## Composition Verification Checklist

To be checked at Phase 8 Task 28:

- [ ] **pm-critic proactive trigger fires** after deliver-prd, foundation-okr-writer, foundation-meeting-recap, foundation-persona, foundation-lean-canvas, discover-interview-synthesis (at minimum)
- [ ] **pm-skill-auditor explicit-only**: no proactive trigger; only fires on /audit-repo or @-mention
- [ ] **pm-changelog-curator works standalone** via /draft-changelog AND **chained** from conductor at G2
- [ ] **pm-release-conductor chains correctly** to both children: G0 to auditor, G2 to curator; both children return output that the conductor surfaces to the maintainer
- [ ] **Chain depth = 2 max** (auditor and curator do not chain further; verified by reading both children's system prompts)
- [ ] **Severity grammar consistent** across all 4: P0/P1/P2/P3 used uniformly
- [ ] **Referential discipline verified**: no sub-agent embeds standards content; each reads canonical doc(s) at invocation time

---

## Risks

| ID | Risk | Mitigation |
|---|---|---|
| **SR1** | **Proactive trigger noise on pm-critic.** Auto-fires too often; user resents the interruption. | Phase 2 Task 9 exercises pm-critic against >= 3 artifacts and observes false-positive rate. If poor, amend severity floor or remove proactive trigger before Phase 3. Documented opt-out: copy to `.claude/agents/`. |
| **SR2** | **Chain depth violation.** Conductor chains to auditor; auditor accidentally chains to another sub-agent. | Phase 5 Task 18 verifies auditor and curator system prompts do not include the Agent tool. Tool budget is enforced at the frontmatter level. |
| **SR3** | **Drift between spec docs and agent definitions.** Spec doc says one thing; agent file does another. | Spec docs land before agent files in each phase. Task 28 cross-checks spec vs agent for each of the 4. |
| **SR4** | **Library samples become stale.** Samples reference v2.15.0 artifacts; new versions arrive; samples mismatch. | Samples include a header noting which v2.X.Y of source artifacts they were generated against. v2.17 pm-sample-curator (deferred) closes this gap structurally. |
| **SR5** | **Codex-side parity gap.** Sub-agents are Claude-only; Codex users lose access. | Each spec doc includes a Codex parity section. adversarial-review.md and release-runbook.md document the `codex:codex-rescue` prompt template path for Codex users. |
| **SR6** | **Plugin sub-agent security ceiling surprises.** Sub-agents can't self-set hooks, mcpServers, permissionMode. | Documented in master plan and in each spec doc. Agents that benefit from autonomy (none in v2.16) get a documented copy-out path. |
| **SR7** | **validate-agents-md may not recognize subagents/ directory.** | Phase 1 Task 4 inspects current behavior and ships either extension or new validator before any agent file lands. |

---

## Out of scope for this plan

- pm-workflow-orchestrator (v2.17)
- pm-frontmatter-doctor (v2.17 opportunistic)
- pm-sample-curator (depends on F-34)
- pm-cross-llm-handoff (spike before commit)
- pm-skill-curator (needs cross-session memory)
- Family-steward design (deferred per D8)
- `.claude/pm-skills.local.md` user-settings (deferred per D10)
- PostToolUse hooks (deferred to v2.17)
- Sub-agent + MCP composition (M-22 blocked)
- Multi-reviewer critique board (P3 in roadmap)

These items are tracked in `plan_v2.16.0.md` Out of Scope section and forward to v2.17.0+ planning.

---

## Cross-References

- Master plan: [`plan_v2.16.0.md`](./plan_v2.16.0.md)
- Spec docs (sibling files): [`spec_pm-critic.md`](./spec_pm-critic.md), [`spec_pm-skill-auditor.md`](./spec_pm-skill-auditor.md), [`spec_pm-changelog-curator.md`](./spec_pm-changelog-curator.md), [`spec_pm-release-conductor.md`](./spec_pm-release-conductor.md)
- Strategy doc (design source): [`../../_working/subagents/subagent-strategy_2026-05-07.md`](../../_working/subagents/subagent-strategy_2026-05-07.md)
- Implementation plan (sequencing reference): [`../../_working/subagents/subagent-implementation-plan_2026-05-10.md`](../../_working/subagents/subagent-implementation-plan_2026-05-10.md)
- Phase 0 Adversarial Review pattern: [`../v2.11.0/plan_v2.11_pre-release-checklist.md`](../v2.11.0/plan_v2.11_pre-release-checklist.md)
- CHANGELOG hygiene rules: `CLAUDE.md` (repo root)
