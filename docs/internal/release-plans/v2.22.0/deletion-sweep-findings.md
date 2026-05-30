# v2.22.0 Deletion Sweep - Complete Edit-List

> **Source:** bounded discovery workflow run `wf_f9877a54-272` (16 agents, ~1.8M tokens, 2026-05-29): 6 Explore searchers -> synthesis -> completeness critic -> 8-gap backfill. Read-only discovery. This doc is the authoritative execution checklist for the wrapper deletion + D6 retirement (Phase 3 of `implementation-plan.md`).
> **Critic confidence: MEDIUM.** The synthesizer's edit-list was strong on the 4 sub-agent commands + counts/D6, but MISSED whole reference classes (the `_workflows/` source dir, a 2nd generator, ~18 skill files, the `library/skill-output-samples/` corpus, `release.yml`, and 3 confirmed dead-link CI hard-fails). Those are captured under "Critic gaps" below.
> **Discipline:** re-grep each file for `/pm-critic|/pm-audit-repo|/pm-draft-changelog|/pm-release|_pairing|companion command|D6|73` immediately before editing; some line maps from different searchers disagreed. After all edits, a repo-wide grep for zero residual is the completeness gate.

## Headline - load-bearing items (do NOT miss)

1. **3 CONFIRMED hard CI failures** - `check-internal-link-validity.sh --strict` (enforcing at `.github/workflows/validation.yml:206-212`) fails on dead markdown links to deleted files:
   - `docs/contributing/release-runbook.md:207` -> `commands/pm-release.md`
   - `docs/guides/adversarial-review.md:259` -> `commands/pm-critic.md`
   - `docs/reference/runtime-components.md:184` -> `agents/_pairing.yaml`
2. **Auditor D6 self-check (P1, functional)** - `agents/pm-skill-auditor.md:61` (+ description `:10`) defines a "sub-agent without companion command (violates D6)" cross-cutting check. After deletion it flags all 4 sub-agents as false-positive violations on every run, including release gate G0. Must be removed/re-scoped. Coupled: the agent reads its catalog from `spec_pm-skill-auditor.md:70` at invocation time.
3. **Counts (P0, CI-enforced by `check-count-consistency`)** - every hardcoded "73 commands" -> 10 across README, AGENTS.md, QUICKSTART, docs/getting-started/*, docs/reference/* (index, ecosystem, project-structure, runtime-components), `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`. Skills stay 63.
4. **`_workflows/` source dir (NEW, critic-caught)** - ~30 `**Command:** /verb` labels across 6 files name deleted skill wrappers. Edit the `_workflows/` SOURCE then regenerate `docs/workflows/` via `generate-workflow-pages.py` (the 2nd generator, also missed by the original plan).

## Edit-list by category (synthesizer, 48 entries)

### CI-LOGIC
- `commands/<all 63 non-workflow *.md>` - **P0 DELETE** all 63 (keep only the 10 `commands/workflow-*.md`). Post-state: commands/ = 10.
- `agents/_pairing.yaml` - **P0 DELETE** (D6 retired; no validator reads it; `validate-agents-md` excludes it via `_*` glob).
- `scripts/generate-skill-pages.py` - **P1** fix `generate_commands_reference()` for skill_cmd_count=0/other_cmd_count=0 (narrative at line 630 reads wrong; stale companion-command comments 596-599, 656-659; dead orphan block 665-679).
- `scripts/validate-agents-md.ps1` - **P3** comment-only: drop `_pairing.yaml` from the line-61 exclusion comment (code unaffected).
- `_agent-context/claude/CONTEXT.md` - **P2** verify lines 5/7/19 for a live "73 commands" counter / D6 language (auditor re-derives counters against it).

### AGENT (reconcile invocation prose to new surface)
- `agents/pm-skill-auditor.md` - **P1** lines 10, 61 (the D6 check - see headline #2), 71 (`_pairing.yaml` exclusion), 193 (`/pm-audit-repo` invocation).
- `agents/pm-release-conductor.md` - **P1** lines 147, 156 (preserve the no-@-mention safety framing), 182 (delete "Companion command:" footer).
- `agents/pm-changelog-curator.md` - **P1** lines 9, 176, 195 (delete footer). Line 178 @-mention stays.
- `agents/pm-critic.md` - **P1** line 135 ONLY. (Lines 150/152 are correct file pointers, NOT stale - leave.)

### SKILL (cross-references inside skill content - falsifies "skills unchanged")
- `skills/discover-journey-map/SKILL.md` - **P1** line 178 (`/pm-critic`) + line 198 (delete self Companion-command footer).
- `skills/discover-market-sizing/SKILL.md` - **P1** lines 200 + 220.
- `skills/define-prioritization-framework/SKILL.md` - **P1** lines 200 + 221.
- `skills/measure-survey-analysis/SKILL.md` - **P1** lines 184 + 206. (These 4 are the ONLY skills with a "Companion command:" footer.)
- `skills/foundation-lean-canvas/SKILL.md` - **P2** lines 18,34,38,39,40 (bare `/skill` cross-refs).
- `skills/foundation-okr-writer/SKILL.md` - **P2** lines 41-45.
- `skills/measure-okr-grader/SKILL.md` - **P2** lines 31-35,69,72.
- `skills/utility-pm-skill-iterate/SKILL.md` - **P2** lines 22,29,37-39.
- `skills/utility-pm-skill-validate/SKILL.md` - **P2** lines 28,30,36-37.
- `skills/utility-pm-skill-builder/SKILL.md` - **P2** line 189 (generates "test via /{command}" advice).
- `skills/utility-pm-critic|utility-pm-release-conductor|utility-pm-skill-auditor|utility-pm-changelog-curator/SKILL.md` - **P3** mostly reference the AGENT files (which stay) - verify, likely no-op.
- `skills/utility-update-pm-skills/references/TEMPLATE.md` - **P3** lines 82,86-90.
- `skills/utility-pm-release-conductor/references/TEMPLATE.md` - **P2** line 77 (`/pm-release`).
- `skills/utility-pm-critic/references/TEMPLATE.md` + `utility-pm-release-conductor/references/EXAMPLE.md` - **P3** verify (likely agent-file refs, no-op).

### LIVE-DOC (sweep)
- `README.md` - **P1** lines 115,171,397 (counts) + 833-836 (sub-agent table command column). Sweep 207,234,319,792,795,1011,1072 for stragglers.
- `AGENTS.md` - **P1** delete the 4 command rows 495-498; sweep 273-297,508-511. KEEP sub-agent NAME mentions (validators require them).
- `QUICKSTART.md` - **P1** lines 6,75.
- `docs/getting-started/quickstart.md` - **P1** lines 9,78. `docs/getting-started/index.md` - **P1** line 226. `docs/getting-started/platforms.md` - **P3** verify (line 201 "companion server" is false-positive).
- `docs/reference/index.md` - **P1** line 31. `docs/reference/ecosystem.md` - **P1** lines 78,95,201 (lines 3,30 "companion MCP server" false-positive). `docs/reference/project-structure.md` - **P1** lines 29 (tree),158. `docs/reference/runtime-components.md` - **P1** lines 20,29,31,41-44,53,95-107,158-160,184 (highest-density; the D6 invariant + _pairing link).
- `docs/guides/using-sub-agents.md` - **P1** lines 20-23,43-56,68,114,124,134-135,158,162,169,185,213.
- `docs/guides/adversarial-review.md` - **P1** lines 28-29,59,62,168,200,207,241-242,253,259 (verify; line 259 is dead-link CI fail).
- `docs/concepts/sub-agents.md` - **P1** full sweep (~45,51-53,60-72,93,321-326; verify lines).
- `docs/concepts/active-orchestration.md` - **P2** lines 29-33,41 (one searcher flagged, one said clean - verify).
- `docs/contributing/sub-agent-design-patterns.md` - **P1** lines 45,47,51,55-60,78,111-114,125,205 (line 205 stale `subagents/` URL).
- `docs/contributing/authoring-sub-agents.md` - **P1** lines 3,13,37,40-41,135-160 (delete the D6 "Companion Command Pairing" section),254-255,276. TEACHES the retired contract to contributors.
- `docs/contributing/release-runbook.md` - **P1** lines 32,60,181,201,207 (line 207 dead-link CI fail).
- `docs/index.mdx` - **P1** line 176 (lists ~30 now-deleted slash commands inline - see open question).
- `.claude-plugin/plugin.json` - **P1** line 3 (version), line 4 (two "73 commands" + companion-command prose).
- `.claude-plugin/marketplace.json` - **P1** line 11 (two "73 commands"), line 12 (version).

### SAMPLE (sweep to new reality - per maintainer decision 2026-05-29)
- `library/sub-agent-samples/pm-release-conductor/*` - **P2** chained-run.md:16,184; storevine_gate-failure.md:16,40,83; brainshelf_clean-run.md (verify).
- `library/sub-agent-samples/pm-changelog-curator/*_minor-release.md` - **P2** line 16.
- `library/sub-agent-samples/pm-critic/*_prd-review.md` - **P2** verify/sweep.
- `library/sub-agent-samples/pm-skill-auditor/*_pre-release.md` - **P2** invocation lines 16,57,72,87,101,116; the F-01 D6 finding block 54-59 is historical depiction (annotate, see open Q).
- `library/sub-agent-samples/pm-skill-auditor/*_cross-cutting.md` - **P3** lines 46-49 (D6 design-intent note - annotate vs leave).
- `skills/utility-pm-skill-auditor/references/EXAMPLE.md` - **P2** F-01 block 59-63 + counter row 99 (annotate "D6 retired v2.22.0"; do NOT "correct" the illustrative 62/64 counts to 10).

## Critic gaps - the NEW scope the synthesizer missed (verdict: MEDIUM confidence)

1. **`_workflows/` source dir (~30 stale `**Command:** /verb` labels)** - sprint-planning.md:40,49,69,90,138; customer-discovery.md:48,68,88,108; stakeholder-alignment.md:49,70,91,112; product-strategy.md:49,70,91,112,133; post-launch-learning.md:48,69,90,111,132; technical-discovery.md:48,69,90. Edit SOURCE then regenerate. `/workflow-*` labels (line 16) survive.
2. **`scripts/generate-workflow-pages.py` (2nd generator)** + memory's 3rd `generate-showcase.py` - confirm whether the `**Command:**` label is authored in source or injected; regen must run these too.
3. **~18 skill files with bare-/command cross-refs (vs ~8 in the edit-list)** - the 5-skill meeting family (`foundation-meeting-agenda/recap/brief/synthesize`) + `foundation-stakeholder-update` were entirely absent.
4. **`library/skill-output-samples/` corpus (~10 files)** - okr-writer (3), okr-grader (3), pm-skill-builder/validate/iterate, update-pm-skills samples + `measure-okr-grader/references/EXAMPLE.md` + `foundation-okr-writer/references/EXAMPLE.md`. The edit-list only covered `sub-agent-samples/`.
5. **`.github/workflows/release.yml:38,68-70`** - generates GitHub Release notes on every tag push, hardcodes `/prd`, `/hypothesis` as examples. Code edit needed BEFORE the v2.22.0 tag.
6. **`check-internal-link-validity.sh --strict`** - the enforcer for the 3 dead links (headline #1). HARD CI FAIL, not advisory.
7. **Confirmed-clean (stop re-checking):** `astro.config.mjs` (nav autogenerates from docs/ dirs, not commands/), `sync-agents-md.yml` (disabled/gated), `.github/PULL_REQUEST_TEMPLATE.md`, `CONTRIBUTING.md`, `package.json`, `.gitignore`, `commands/workflow-*.md` bodies (cross-ref only surviving `/workflow-*`).
8. **Count-consistency verification gap** - grep the "unverified" files (platforms.md, concepts/*) for the count forms before concluding no-op; any stale "73" hard-fails CI.

## Functional items (logic + release steps)
- **P1** Auditor D6 check removal (headline #2) + the spec-catalog coupling decision.
- **P1** Auditor counter re-derivation (line 71 exclusion; Commands counter now 10).
- **P0** Build-gated counts (every "73" -> 10; mandatory).
- **P1** Generator output correctness (`generate-skill-pages.py` + `generate-workflow-pages.py`).
- **RELEASE STEP** Add NEW CHANGELOG v2.22.0 entry (deletion + D6 retirement; 4 sub-agents remain via dispatch skill + @-mention; skills stay 63). Bump plugin.json + marketplace.json to v2.22.0.
- **RELEASE STEP** Regenerate `docs/reference/commands.md` + `docs/workflows/*` + showcase AFTER deletion + generator fixes. Do not hand-edit generated files.

## Leave-list (do NOT edit)
- Generated: `docs/reference/commands.md`, `docs/skills/**`, `docs/workflows/**` (regenerate from source).
- Historical/frozen: `docs/releases/Release_v2.16.0|2.17.0.md`; `docs/internal/release-plans/v2.16.0|2.17.0|2.18.0|2.19.0/**`; `docs/internal/_working/**`; `_deferred/**`; existing CHANGELOG entries.
- This v2.22.0 plan + implementation-plan (authorizing source, not a sweep target).
- CI no-change: `check-agents-md-command-sync`, `check-count-consistency`, `validate-commands`, `validate-agents-md.sh` (dynamic; pass automatically post-edit).
- `agents/_chain-permitted.yaml` (unaffected). `agents/pm-critic.md` lines 150/152 (correct pointers).

## Decisions (RESOLVED 2026-05-29)
- **D1 sweep scope -> FULL sweep now.** Fix every stale ref the workflow found (sub-agent/D6/counts/dead-links + all ~18 skills + `_workflows/` sources + `library/skill-output-samples/` + EXAMPLE/TEMPLATE files). Ship zero broken/stale command refs.
- **D3 sample treatment -> REWRITE to current reality** (not annotate). Rewrite the D6-finding depictions to the post-D6 state and sweep invocation lines. Do not invent false present-state counts; only recompute an illustrative number if it is presented as a current/live count.
- **D4 auditor spec coupling -> AGENT + SPEC NOTE.** Edit the live `agents/pm-skill-auditor.md` AND add a one-line "D6 retired v2.22.0; exempt" note in the spec catalog (`spec_pm-skill-auditor.md:70`) the agent reads at runtime.

## Invocation standard (validated against source docs 2026-05-29)
Validated by a research agent against code.claude.com/docs + developers.openai.com/codex + the local manifests (run `a35129e59b2da1523`). Canonical strings:
- **Claude Code skill:** `/pm-skills:<skill-name>` (prefix = PLUGIN name `pm-skills`, NOT the marketplace). Source: code.claude.com/docs/en/plugins.
- **Claude Code sub-agent:** `@agent-pm-skills:<name>` (plugin-scoped). The repo's current BARE `@agent-pm-critic` form is INCORRECT for a plugin sub-agent. Source: code.claude.com/docs/en/sub-agents.
- **Codex skill:** `$<skill-name>` (flat/global; no plugin/marketplace prefix; `name@source` is config-only). Source: developers.openai.com/codex/skills.
- **Codex sub-agents:** ad-hoc natural-language parallel agents, NOT mention-addressable; `pm-critic` is reachable on Codex only as a skill (dispatch skill), not `@agent-`.

**Sweep convention (the rule for every edit):** SKILL.md / sample / `_workflows` content is read across clients, so write cross-references with the BARE SKILL NAME in prose, NOT a client-specific slash/`$` form:
- Skill cross-ref: ``Use the `deliver-prd` skill ...`` (or the path ``skills/deliver-prd/SKILL.md``).
- Sub-agent: ``Hand off to the `pm-critic` sub-agent ...``
- Reserve concrete client forms (`/pm-skills:<name>`, `@agent-pm-skills:<name>`, `$<name>`) for CLIENT-SPECIFIC surfaces only (e.g. a Claude Code user guide / README CC section), never in shared skill/sample content.

## New scope from the invocation validation
- **Bare `@agent-pm-*` -> `@agent-pm-skills:pm-*`:** the repo's sub-agent invocation prose (agents/*.md, dispatch skills, CC-specific docs) uses the bare unscoped form, now incorrect for a plugin sub-agent. Sweep all occurrences (grep `@agent-pm-` excluding the already-scoped `@agent-pm-skills:`).
- **Marketplace name reconcile (verify, lower priority, likely separate from this sweep):** this repo's `.claude-plugin/marketplace.json` `name` = `pm-skills-marketplace`, while install docs reference `pm-skills@product-on-purpose`. The marketplace name appears only in install/disambiguation, NEVER in runtime invocation. Verify the canonical marketplace `name` (this self-hosted manifest vs the separate `product-on-purpose/agent-plugins` registry) and align install docs. Flag for the release; not a deletion-sweep blocker.
