# v2.16.0 Release Plan: Active Orchestration + Doc-Stack Modernization

**Status:** BLOCKED ON DOC-STACK MODERNIZATION. Active Orchestration track content-complete 2026-05-17 (16 commits 68bd5cc through 5a1ad61). Phase 0 Adversarial Review closed (7 findings; all addressed). Pre-tag artifact pass staged pending G2.5 commit gate. GATE B + GATE C pending maintainer cross-client tests per `maintainer-gate-testing.md`. **Tag delayed** per maintainer decision 2026-05-17 to include Astro 5.13.x to 6.x upgrade in v2.16.0 (closes 2 Dependabot alerts). Doc-stack modernization plan now ACTIVE in dedicated session; resumes per the continuation prompt in `AGENTS/SESSION-LOG/` and the task list in `doc-stack-modernization-plan.md`.
**Owner:** Maintainers
**Type:** Feature release (minor)
**Created:** 2026-05-11 (stub); promoted 2026-05-16 (this version)
**Updated:** 2026-05-16

---

## Where We Are (snapshot 2026-05-17, HEAD post-v2.15.2 closeout)

v2.15.0 tagged 2026-05-16 (Sprint Skills Launch: 15 new `classification: tool` skills). v2.15.1 patch shipped 2026-05-17 02:10 UTC at tag `6f89439` (post-tag audit remediation; 18 findings closed; 4 new preventive CI validators). v2.15.2 closeout shipped 2026-05-17 (audit-doc status update, plan continuity, v2.16.0 plan reconciliation). v2.15.x cycle CLOSED.

Total catalog: **55 skills** (26 phase + 8 foundation + 6 utility + 15 tool). Unchanged across v2.15.0 / v2.15.1 / v2.15.2.

**Validator inventory now:** 27 truly-enforcing (was 24 at v2.15.0 tag; +3 from v2.15.1: `check-landing-page-counts --strict`, `check-workflow-generator-coverage`, `check-agents-md-command-sync`). Plus 1 orchestration script `scripts/pre-tag-validate.{sh,ps1}` codifying the `feedback_pre-tag-validator-bundle` memory rule and required as Section 0 of the release runbook.

v2.16.0 begins from this baseline. Two open Dependabot alerts on origin/main, both Astro 6.x dependent. The v2.15.1 audit (`../v2.15.x/audit_v2.15.x_post-tag-self-review.md`) explicitly deferred A06 / A07 (count-consistency regex consolidation; issue #132 [M-20]) to v2.16.0 per the ci-plan reconciliation.

**v2.15.1 carry-ins reduce v2.16.0 scope:**

- `repo-hygiene-plan.md` Phase 1 carry-forward (CONTEXT.md refresh from v2.14.x Task 2) is no-op: v2.15.1 audit A12 closed it. Phase 1 scope becomes re-refresh-after-all-tracks-land per Codex R13.
- `ci-plan.md` net-new validators reduced from "5 new" to "2 new + 1 extension" (see ci-plan v2.15.1 carry-in reconciliation section).

### What's next (by priority, parallel-track sequencing)

1. **Start subagent integration plan Phase 1** (subagents/ directory + `_pairing.yaml` + `_chain-permitted.yaml` + runtime-components.md skeleton + AGENTS.md sub-agent section). Unblocks docs + CI tracks.
2. **In parallel, start docs-plan Phase 1 + ci-plan Phase 1.** Concept docs reference the catalog skeleton; CI decision inspects the actual `subagents/` directory.
3. **Subagent Phase 2: ship pm-critic + in-cycle observation gate.** If signal-to-noise is poor on real artifacts, amend before Phases 3-5. Note: D3 collapses the original strategy-doc 2-week observation gate into this in-cycle gate; the entire slate ships in v2.16.0 not split across releases.
4. **In parallel, start doc-stack modernization plan Phase 1.** Astro 6 spike branch with Node 22.12+ workflows landed BEFORE Astro 6 CI-green gate per Codex R02.
5. **Subagent Phases 3-5: ship utility trio** (pm-skill-auditor, pm-changelog-curator, pm-release-conductor). Conductor validates G2.5 commit gate + chained Status envelope handoff with the other two.
6. **Subagent Phases 6-8 + docs Phases 2-4 + ci Phases 2-4: complete remaining sub-plan work.** Mostly mechanical; subagent Phase 8 integration check verifies all D19-D29 ratifications.
7. **Hygiene plan Phases 2-4.** Run in parallel. CONTEXT.md refresh (Phase 1) saved for last per Codex R13.
8. **Pre-tag artifact pass.** Phase 0 adversarial review + CHANGELOG via curator + release notes + tag via conductor's 6-gate flow.

### Estimated remaining

**14-22 sessions** across all 5 sub-plans (updated from 13-20 after Q7 added dispatch skill deliverables; reflects 66 tasks with expanded scope in subagent Phase 2 spike + dispatch skills in Phases 3-5). Subagent slate: 7-10 sessions (includes Phase 2 dispatch skill spike + 4 dispatch skills authored). Docs plan: 2-3 sessions. CI plan: 1-2 sessions. Doc-stack modernization: 2-3 sessions. Hygiene: 2-3 sessions. Pre-tag: 1 session.

---

## Release Theme

**Active Orchestration + Doc-Stack Modernization.**

The repo today is a strong **content library** (55 skills + 62 commands + 12 workflows + 27 enforcing validators) with **zero active orchestration** (zero sub-agents, zero hooks, zero output styles). v2.16.0 opens the orchestration layer with the first sub-agents while paying down the most critical infrastructure debt from v2.14.x.

Theme breakdown:

- **Primary track: Active Orchestration.** Ship the first 4 plugin sub-agents. `pm-critic` codifies the Phase 0 Adversarial Review Loop the maintainer already runs manually; the utility trio (`pm-release-conductor` + `pm-changelog-curator` + `pm-skill-auditor`) codifies the release runbook the maintainer follows every cycle. This is the first time pm-skills ships executable runtime components alongside its content library.
- **Secondary track: Doc-Stack Modernization.** Astro 6.x upgrade (requires Node 22.12+) closes the last 2 open Dependabot alerts and unblocks features that were deferred from v2.14.0 (define:vars hardening, server-island encryption). Pinned at Astro 5.13.x during the v2.14 spike because Astro 6's Node requirement was out of v2.14.x scope.
- **Tertiary track: Repo Hygiene.** Sweeps that accumulated across v2.14.x and v2.15.0: post-tag CONTEXT.md refresh, `_working/` archive of superseded planning docs, DS family validator metadata-shape promotion to strict, canonical backlog refresh against new release state.

No new content skills in v2.16.0. The catalog stays at 55 phase/foundation/utility/tool skills. **The new shipping unit is the sub-agent**, not the skill.

## Context

v2.15.0 closed two adversarial-review cycles (FS-track 35 findings; DS-track 13 Codex + 20 self-audit findings; all P1 fixed pre-tag). The Phase 0 Adversarial Review Loop has proven itself enough that codifying it as a sub-agent now has strong evidence behind it.

The subagent slate has been designed in detail across two working docs since 2026-05-07:

- `docs/internal/_working/subagents/subagent-strategy_2026-05-07.md` (10 candidates across 4 tiers, 10 cross-cutting insights, invocation patterns, composition with other components)
- `docs/internal/_working/subagents/subagent-implementation-plan_2026-05-10.md` (ship sequence, per-cycle plans, dependencies)
- `docs/internal/_working/roadmap_opus-4.7-max_2026-05-14.md` (R-04 pm-critic as v2.16.0 P0; R-16/R-17/R-18 utility trio as v2.17.0)

This release commits the v2.16.0 scope from those drafts. The roadmap's v2.17.0 utility trio gets pulled forward into v2.16.0 because (a) v2.15.0 shipped the locked `classification: tool` work and there's no other large content track running; (b) the conductor + curator + auditor form a coherent maintenance trio that compounds with every subsequent release; (c) shipping all four together gives a defensible release narrative.

### Prerequisites

- [x] v2.15.0 tagged and shipped (done 2026-05-16, HEAD `a108301`)
- [x] Sub-agent strategy + implementation plan authored in `_working/` (May 7-10)
- [x] Phase 0 Adversarial Review pattern proven across 2 review cycles in v2.15.0
- [x] CHANGELOG hygiene rules codified in `CLAUDE.md` (foundation for pm-changelog-curator)
- [x] All 27 enforcing validators stable on origin/main (foundation for pm-skill-auditor; was 24 at v2.15.0 tag, +3 from v2.15.1: `check-landing-page-counts --strict`, `check-workflow-generator-coverage`, `check-agents-md-command-sync`)
- [x] Release runbook conventions captured across recent release plans (foundation for pm-release-conductor)
- [ ] GitHub Release UI body authored for v2.15.0 tag (post-tag follow-up; does not block v2.16.0)

---

## Sub-Plans

This master plan orchestrates five sub-plans plus four sub-agent spec documents. Each sub-plan owns its own task list, sequencing, and effort estimate. Each spec doc owns the behavioral contract for one sub-agent.

| Sub-plan | Path | Scope | Tasks | Effort |
|---|---|---|---|---|
| **Subagents Integration Plan** | [`subagents-integration-plan.md`](./subagents-integration-plan.md) | 4 sub-agents + 4 companion slash commands + subagents/ directory convention + runtime-components.md + adversarial-review.md guide + release-runbook.md guide + AGENTS.md sub-agent section + 12 library samples + CI updates | 28 (8 phases) | 6-9 sessions |
| **Docs Plan** | [`docs-plan.md`](./docs-plan.md) | 5 new docs (sub-agents concept, active-orchestration concept, using-sub-agents guide, authoring-sub-agents contrib, sub-agent-design-patterns contrib) + AGENTS.md updates + README.md updates + cross-cutting consistency sweep + sidebar + Pagefind verification | 11 (4 phases) | 2-3 sessions |
| **CI Plan** | [`ci-plan.md`](./ci-plan.md) | validate-sub-agents OR validate-agents-md extension + check-runtime-components-sync + check-sub-agent-command-pair + check-em-dashes + check-aggregate-counters + validation.yml integration + ci-conventions.md doc + subagents/_pairing.yaml manifest | 10 (4 phases) | 1-2 sessions |
| **Doc-Stack Modernization Plan** | [`doc-stack-modernization-plan.md`](./doc-stack-modernization-plan.md) | Astro 5.13.x to 6.x upgrade + Node 22 to 22.12+ across 5 workflows + close 2 Dependabot alerts + verify astro-mermaid compatibility + custom CSS audit | 9 (3 phases) | 2-3 sessions |
| **Repo Hygiene Plan** | [`repo-hygiene-plan.md`](./repo-hygiene-plan.md) | CONTEXT.md per-phase tables refresh + `_working/` archive sweep + DS family validator metadata-shape strict + backlog-canonical refresh + completed F-XX effort docs archive + TODO/FIXME inventory | 8 (4 phases) | 2-3 sessions |

| Spec doc | Path | Owns |
|---|---|---|
| **pm-critic** | [`spec_pm-critic.md`](./spec_pm-critic.md) | Adversarial PM-artifact reviewer; proactive trigger; P0/P1/P2/P3 grading; refusal protocols; composition with skills |
| **pm-skill-auditor** | [`spec_pm-skill-auditor.md`](./spec_pm-skill-auditor.md) | Repo-level cross-cutting governance; validator aggregator; explicit trigger only; cross-cutting check catalog |
| **pm-changelog-curator** | [`spec_pm-changelog-curator.md`](./spec_pm-changelog-curator.md) | CHANGELOG drafter from git log; CLAUDE.md hygiene enforcement; standalone or chained from conductor |
| **pm-release-conductor** | [`spec_pm-release-conductor.md`](./spec_pm-release-conductor.md) | Guided release runbook with 6 gates (G0-G4); chains to auditor + curator; explicit trigger only; rollback semantics |

Total executable scope: **66 tasks, 13-20 sessions** plus pre-tag artifact pass. Subagent integration plan executes first (delivers the primary theme); docs and CI plans run interleaved with the subagent track (docs Phase 1 docs are independent; CI Phase 1 decision is independent; later phases of both follow agent landings); doc-stack modernization and hygiene plans run in parallel where independent or after the subagent track where coupled.

## Source Material

The sub-plans reference these authoring sources:

- [`docs/internal/_working/subagents/subagent-strategy_2026-05-07.md`](../../_working/subagents/subagent-strategy_2026-05-07.md) - canonical design source for all 4 sub-agents (10 candidates surveyed, decision lens, invocation patterns, composition matrix, 10 cross-cutting insights)
- [`docs/internal/_working/subagents/subagent-implementation-plan_2026-05-10.md`](../../_working/subagents/subagent-implementation-plan_2026-05-10.md) - ship sequencing and per-cycle scoping
- [`docs/internal/_working/roadmap_opus-4.7-max_2026-05-14.md`](../../_working/roadmap_opus-4.7-max_2026-05-14.md) - strategic context for v2.16.0+ priorities
- [`docs/internal/_working/agent-component-usage_2026-04-18.md`](../../_working/agent-component-usage_2026-04-18.md) - broader runtime-leverage matrix (hooks, MCP, settings, user-settings)
- [`docs/internal/release-plans/v2.14.0/plan_v2.14_starlight-migration.md`](../v2.14.0/plan_v2.14_starlight-migration.md) - Astro 5.13.x pin rationale (sets Astro 6 unblock context)

When the v2.16.0 cycle closes, the three subagent working docs move to `_working/_archived/` per the hygiene plan.

---

## Ratified Decisions

The strategy doc ends with 7 open questions for the maintainer (Section 9). The following decisions are ratified before Phase 1 begins.

| # | Decision area | Ratified decision | Source |
|---|---|---|---|
| **D1** | **Version** | **v2.16.0** (minor). New plugin component class (sub-agents) = new capability. | Convention |
| **D2** | **Slate scope** | Ship 4 sub-agents in v2.16.0: pm-critic, pm-skill-auditor, pm-changelog-curator, pm-release-conductor. NOT in v2.16.0: pm-workflow-orchestrator (v2.17), pm-frontmatter-doctor (v2.17 opportunistic), pm-sample-curator (depends on F-34 THREAD_PROFILES.md), pm-cross-llm-handoff (spike before commit), pm-skill-curator (needs cross-session memory). | This plan; supersedes implementation-plan v2.15.0/v2.15.1 split |
| **D3** | **2-week observation gate between pm-critic and the rest** | **DROPPED for v2.16.0 ship cadence.** All 4 sub-agents ship in the same tag. Rationale: the strategy doc's observation gate was sized for separate v2.15.0 + v2.15.1 releases; combining them into one tag removes the gate. Risk mitigation: pm-critic is the first sub-agent built (Phase 2), exercised against existing v2.15.0 PM artifacts before the utility trio (Phases 3-5) is authored. If pm-critic surfaces design issues, the slate is amended before Phases 3-5 begin. | This plan; explicit deviation from implementation-plan |
| **D4** | **Sub-agent directory location (AMENDED 2026-05-17 per D31)** | Sub-agent files live at `subagents/` at repo root, declared in `.claude-plugin/plugin.json` via the custom `"agents"` path field. Original D4 prescribed lowercase `agents/` (Claude Code default convention), but Windows NTFS case-insensitivity collides with the existing tracked `AGENTS/` directory; resolved via plugin.json custom-path mechanism per D31. Defer namespace question (`subagents/pm-skills/` vs flat) until 6+ sub-agents exist. | Strategy doc Open Question 2; AMENDED per D31 |
| **D5** | **Cataloging surface** | New file `docs/reference/runtime-components.md` catalogs all sub-agents. AGENTS.md gets a "Sub-Agents" section pointing to runtime-components.md but does not duplicate the per-agent detail. | Strategy doc Insight 6 + Open Question 6 |
| **D6** | **Wrapper slash commands** | Every sub-agent ships with a companion slash command in `commands/`. Naming: `/critic`, `/audit-repo`, `/draft-changelog`, `/release`. | Strategy doc Insight 7 |
| **D7** | **Proactive vs explicit triggers (clarified 2026-05-16 for cross-client)** | pm-critic: proactive (auto-fires after PM-artifact-producing skills via `description: use proactively`) on Claude Code. All 3 utility agents: explicit only. **Cross-client caveat per D30:** proactive triggering is a Claude Code plugin feature. On non-Claude clients accessing pm-critic via dispatch skill, invocation is explicit-only (user must invoke the skill). This is a functional gap on non-Claude clients but acceptable per single-tool user assumption. | Strategy doc Insight 8 + Insight 10 + Q7 clarification |
| **D8** | **Family-steward design** | DEFER. No `pm-meeting-family-steward` in v2.16. Family-aware reasoning lives inside pm-critic. Revisit when a third family ships and cross-family logic genuinely diverges. | Strategy doc Open Question 3 |
| **D9** | **em-dash sweep gate in pm-release-conductor** | **YES, enforce at G0.** Re-derive em-dash count via repo-wide grep; refuse to advance if non-zero hits found in tracked text files. | Strategy doc Open Question 4 |
| **D10** | **User-settings infrastructure (clarified 2026-05-16 for cross-client)** | DEFER to v2.17. v2.16 ships sub-agents with documented opt-out intent but no `.claude/pm-skills.local.md` parser. Users who want overrides copy the agent into their own `.claude/agents/` and edit. **Cross-client caveat per D30:** `.claude/` user-settings is Claude-Code-specific. Non-Claude clients have no equivalent settings layer; opt-outs on non-Claude clients require editing the dispatch skill SKILL.md locally. v2.17+ may introduce a portable settings convention if demand emerges. | Strategy doc Open Question 5 + Q7 clarification |
| **D11** | **Cross-client compatibility (AMENDED 2026-05-16 per Q7 walkthrough)** | **Original framing was flawed.** Assumed users have both Claude Code AND Codex CLI AND the codex-rescue plugin. None of these are universal. AMENDED: sub-agents are a Claude Code plugin feature. Cross-client functionality is delivered via **dispatch skills** (`skills/utility-pm-{role}/`) that detect runtime and dispatch appropriately. Dispatch skills are portable per agentskills.io. Codex-rescue is a Claude-Code-side plugin and is NOT a baseline assumption. Phase 2 spike validates dispatch reliability before shipping all 4. | Q7 walkthrough + Codex review re-framing |
| **D12** | **Sub-agent system-prompt style** | **Referential, not duplicative.** Every sub-agent reads canonical contract docs at invocation time (e.g., `skills/foundation-okr-writer/SKILL.md`, `docs/reference/skill-families/meeting-skills-contract.md`) rather than embedding their content. Closes the drift risk between sub-agent prompts and standards docs. | Strategy doc Insight 1 + risk section |
| **D13** | **Sub-agent memory** | Default `memory: none` across the slate. pm-skill-auditor may escalate to `project` if audit history across sessions proves useful; defer that decision until 3+ audit runs have happened. | Strategy doc Insight 4 |
| **D14** | **Chain depth limit** | 2 levels maximum. pm-release-conductor chains to pm-skill-auditor (G0) and pm-changelog-curator (G2). Neither child is permitted to chain further. | Strategy doc Insight 9 |
| **D15** | **Severity grammar** | **P0 / P1 / P2 / P3** across all sub-agent outputs. P0 blocks ship; P1 fixes before next major review; P2 considers; P3 nits. Aligns with `pre-execution-review.md` convention. | Roadmap Insight A |
| **D16** | **Astro 6.x upgrade in same release** | YES. Doc-stack modernization is a v2.16.0 secondary track. Closes 2 open Dependabot alerts. Node 22 to 22.12+ across all 5 CI workflows. | Carried-forward from v2.16.0 stub DI3 |
| **D17** | **Tier 2 deferrals from stub (tags-as-feature, URL slugs, sync-agents-md rewrite)** | DEFER to v2.17.0. v2.16.0 is large enough with subagents + Astro 6 + hygiene. Tags + URL slugs are feature work, not infrastructure debt; can wait. | Scope discipline |
| **D18** | **Bridge to v2.17.0** | v2.17.0 candidates already named: pm-workflow-orchestrator (Feature Kickoff scope), pm-frontmatter-doctor, AI-Native PM Pack (eval-suite-spec + prompt-spec + model-card + ai-failure-mode-catalog per roadmap R-01/R-02/R-03/R-14), tags-as-feature, URL slug normalization. v2.17.0 stub created at end of v2.16.0 cycle. | Forward planning |
| **D19** | **Validator approach: extend vs new** (resolves SR-P0-01 contradiction between SI4 and CI1) | **EXTEND `validate-agents-md.{sh,ps1}` to recognize `subagents/` directory and verify sub-agent invariants.** New dedicated `validate-sub-agents` validator DEFERRED to v2.17 if invariant set grows past `validate-agents-md`'s comfortable scope. Reasoning: cheaper path; preserves single-source-of-truth for agent-component sync; avoids splitting closely-related concerns. CI plan Phase 1 Task 1 inspects current scope and confirms feasibility before authoring. SI4 reads: ratified. CI1 reads: ratified (decision rule pre-resolved to extend; Phase 1 Task 1 confirms feasibility, does not re-decide). | Combined self-review SR-P0-01 + Codex R12 |
| **D20** | **`tools:` frontmatter syntax** (resolves Codex R04) | **Comma-separated scalar** form: `tools: Read, Grep, Glob`. Matches Claude Code documented sub-agent frontmatter convention. CI plan Task 2 validates scalar form, not YAML list. Spec docs already use scalar form; no spec doc changes required. | Codex R04 |
| **D21** | **Chain depth enforcement strength** (resolves Codex R03) | **HARD FAIL** if a sub-agent has `Agent` in `tools:` AND the agent name is not in the explicit allowlist `subagents/_chain-permitted.yaml`. v2.16 allowlist contains exactly one entry: `pm-release-conductor`. Prevents accidental chain-depth-3 violations from utility agents gaining `Agent`. Supersedes the original "informational; not failure" framing in CI plan Phase 2 Task 2. | Codex R03 |
| **D22** | **G2.5 commit gate** (resolves Codex R01) | **NEW gate G2.5 inserted between G2 and G3** in pm-release-conductor. G2.5 commits the G2 release-prep edits, verifies clean working tree, re-runs G0 sub-checks against the new HEAD, and pushes to origin to trigger fresh CI before G3 tags the new commit. Closes the gap where G3 could tag a HEAD that did not contain the release-prep edits. Adds one gate to the runbook (total now 6: G0, G1, G2, G2.5, G3, G4). | Codex R01 |
| **D23** | **G4 blocking power** (resolves Codex R07) | G4 sub-checks now produce P0/P1/P2 incidents on failure. P0 failures (plugin install path broken) block the conductor's "Release complete" output. P1 failures (marketplace registration, Pages rebuild) surface as incidents but do not block. P2 are reminders. Rollback path: maintainer ships fast `v{patch}` rather than reverting tag. | Codex R07 |
| **D24** | **`--skip-gates` argument** (resolves Codex R05) | **REMOVED from v2.16.** The original spec proposed `--skip-gates <list>` for advanced bypassing with warning logs. This contradicted the conductor's no-bypass safety contract. Maintainers who need to bypass a gate (e.g., G1 for a hotfix) must run that gate's verification manually and confirm at the gate prompt. v2.17+ may reintroduce restricted to non-release dry-run mode. | Codex R05 |
| **D25** | **Curator dirty-tree refusal** (resolves Codex R06) | pm-changelog-curator refuses to produce a draft against a dirty working tree (uncommitted release-prep changes would be silently omitted). Override path: `--committed-only` argument acknowledges the scope. Aligns the curator's refusal protocol with pm-skill-auditor's. | Codex R06 |
| **D26** | **Chained handoff envelope** (resolves Codex R08; AMENDED 2026-05-16 for human context) | pm-skill-auditor and pm-changelog-curator outputs follow a **layered structure** for dual audience (maintainer reads; conductor parses): (1) full human-readable findings/draft content; (2) `## Status Summary` section in plain prose explaining what the child found and what the parent should do; (3) `## Status` block with machine-readable YAML for conductor parsing. The conductor parses (3) for advancement decisions; the maintainer reads (1) + (2). Prevents misreading a child refusal as success while keeping output human-friendly. | Codex R08 + Q6 reconsideration |
| **D27** | **Em-dash sweep single source of truth** (resolves SR-P1-03 + Codex R10) | `scripts/check-em-dashes` is the canonical implementation. All plans that reference the sweep (master plan D9, ci-plan CI6, repo-hygiene plan, spec_pm-release-conductor G0) defer scope to that script. Scope: `*.md`, `*.mdx`, `*.txt`, `*.yml`, `*.yaml` per CI6. Allowlist file at `scripts/check-em-dashes.allowlist` carries the 4 known intentional instances (3 in spec_pm-release-conductor backticks, 1 each in ci-plan, repo-hygiene-plan) plus a `library/skill-output-samples/**` blanket exclusion for artifact samples that may quote em-dashes from source material. | SR-P1-03 + Codex R10 |
| **D28** | **Roadmap archive disposition** (resolves Codex R11) | Roadmap `roadmap_opus-4.7-max_2026-05-14.md` STAYS in `_working/` (active for v2.16-v2.18 planning per hygiene plan HG3). The master plan's prior statement that the roadmap moves to archive is corrected. Only the 2 May 8 backlog aggregates archive in v2.16. | Codex R11 |
| **D29** | **Pairing manifest ownership** (resolves Codex R12) | `subagents/_pairing.yaml` is a shipping deliverable of subagents-integration-plan Phase 1 Task 1 (NOT ci-plan). The pairing manifest exists before any agent file lands. ci-plan Phase 2 Task 4 reads the manifest but does not author it. | Codex R12 |
| **D30** | **Single-tool user assumption + dispatch skill strategy** (added 2026-05-16 from Q7 walkthrough) | Users pick ONE primary AI tool (Claude Code, Codex, Cursor, Windsurf, Copilot, Gemini CLI). pm-skills does NOT assume users run multiple tools simultaneously. Dispatch skills (`skills/utility-pm-{role}/`) deliver sub-agent functionality to non-Claude clients via runtime detection: Claude Code path invokes the native sub-agent; non-Claude path reads `subagents/{name}.md` and executes the system prompt inline. Phase 2 spike validates dispatch reliability with pm-critic before shipping all 4 dispatch skills. Conductor dispatch uses "reference + execute inline" pattern to inline auditor + curator behaviors at G0 + G2 on non-Claude clients. Fallback: if spike fails, Option F (clean Claude-Code-only labeling) ships instead. | Q7 walkthrough; complements D11 amendment |
| **D31** | **subagents/ directory rename (added 2026-05-17 during Phase 1 Task 1 execution)** | **AMENDS D4.** Original D4 prescribed `agents/` (lowercase) at repo root per Claude Code documented convention. Discovery at Phase 1 Task 1 execution time: on Windows NTFS (case-insensitive default; verified via `fsutil.exe file queryCaseSensitiveInfo`) and macOS APFS (default case-insensitive), lowercase `agents/` collides with the existing tracked `AGENTS/` directory (9 coordination files: `AGENTS/DECISIONS.md`, `AGENTS/claude/*`, `AGENTS/codex/*`). With `git config core.ignorecase=true` (Windows default), the collision is silent: file creates at `agents/foo.md` land in `AGENTS/foo.md` instead. Per Claude Code plugin docs at code.claude.com/docs/en/plugins-reference, the default `agents/` location is **conventional, NOT required**: plugin.json supports a custom `"agents"` array field that overrides the default location. RESOLUTION: ship sub-agent files at `subagents/` (matches narrative wording in subagents-integration-plan.md and Sub-Agents section names) and declare in plugin.json with `"agents": ["./subagents/"]`. Existing `AGENTS/` directory stays unchanged. Files: `subagents/pm-critic.md`, `subagents/pm-skill-auditor.md`, `subagents/pm-changelog-curator.md`, `subagents/pm-release-conductor.md`; manifests at `subagents/_pairing.yaml` + `subagents/_chain-permitted.yaml`. Cross-platform clean; no NTFS hackery; future contributors on Linux/Mac never encounter the issue. The original `agents/` historical references in this row are preserved verbatim. | Phase 1 Task 1 execution-time finding; plugin.json custom-path mechanism per Claude Code plugin docs |

Re-litigation of any of these decisions requires an explicit plan amendment, not in-track drift.

---

## Deliverables Overview

### New sub-agents (4)

| Agent | Audience | Trigger | Lifetime | Tools |
|---|---|---|---|---|
| `pm-critic` | User | Proactive (auto-fires after PM-artifact-producing skills) | Single turn | Read, Grep, Glob |
| `pm-skill-auditor` | User + Maintainer | Explicit (`/audit-repo`) | Multi-turn | Bash, Read, Grep, Glob |
| `pm-changelog-curator` | Maintainer | Explicit (`/draft-changelog`) or chained from conductor | Single turn or chained | Bash, Read, Grep |
| `pm-release-conductor` | Maintainer | Explicit (`/release [version]`) | Full release flow | Bash, Read, Edit, Grep, Glob, Agent |

### New slash commands (4)

- `/critic [optional artifact path]`
- `/audit-repo`
- `/draft-changelog [optional since-tag]`
- `/release [version]`

### New documentation (3)

- `docs/reference/runtime-components.md` (catalog of sub-agents alongside skills, commands, workflows)
- `docs/guides/adversarial-review.md` (user-facing guide for pm-critic + Codex parity path via codex-rescue)
- `docs/contributing/release-runbook.md` (canonical runbook the conductor follows; usable as a manual reference for both Claude and Codex maintainers)

### New library samples (12)

3 per sub-agent. Patterns established by the Meeting Skills Family precedent: thread-aligned where applicable (storevine, brainshelf, workbench).

- pm-critic: sample findings reports against an existing PRD, OKR set, and meeting recap (one per thread)
- pm-skill-auditor: sample audit reports showing cross-cutting issues caught (one per thread)
- pm-changelog-curator: sample drafts from a real git log range (one per thread context)
- pm-release-conductor: sample release runs (truncated to show gate progression; one per thread)

### Documentation surface updates

**From integration plan (3 docs):**
- `docs/reference/runtime-components.md` (runtime components catalog)
- `docs/guides/adversarial-review.md` (pm-critic invocation guide)
- `docs/contributing/release-runbook.md` (pm-release-conductor 6-gate runbook)

**From docs-plan (5 new docs):**
- `docs/concepts/sub-agents.md` (component-class conceptual explainer)
- `docs/concepts/active-orchestration.md` (theme-level explainer)
- `docs/guides/using-sub-agents.md` (top-level usage overview)
- `docs/contributing/authoring-sub-agents.md` (how to author a new sub-agent)
- `docs/contributing/sub-agent-design-patterns.md` (invocation + composition patterns catalog)

**Other surface updates:**
- README.md: add "Sub-Agents" section + What's New paragraph
- AGENTS.md: add Sub-Agents section
- CHANGELOG.md: v2.16.0 entry covering all five tracks
- docs/changelog mirror: same content
- docs/internal/backlog-canonical.md: refresh against new state
- `docs/contributing/ci-conventions.md`: documents the new validators

### New CI validators (from ci-plan)

- `scripts/validate-agents-md.{sh,ps1,md}` EXTENDED per D19 (sub-agent invariants + chain-permitted allowlist enforcement + AGENTS.md sub-agent section verification)
- `scripts/check-runtime-components-sync.{sh,ps1,md}` NEW
- `scripts/check-sub-agent-command-pair.{sh,ps1,md}` NEW (reads `subagents/_pairing.yaml`)
- `scripts/check-em-dashes.{sh,ps1,md}` NEW (canonical em-dash sweep per D27)
- `scripts/check-aggregate-counters.{sh,ps1,md}` NEW
- `scripts/check-em-dashes.allowlist` NEW (manifest of intentional em-dash instances)
- `subagents/_pairing.yaml` NEW (sub-agent + command pairing manifest)
- `subagents/_chain-permitted.yaml` NEW (Agent-tool allowlist per D21)
- `.github/workflows/validation.yml` UPDATED (4-5 new validator invocations in CI5 order)

### Doc-stack modernization

- package.json: astro `^5.18.1` to `^6.x`; engines.node `>=22.0.0 <23` to `>=22.12.0`
- 5 CI workflows: Node 22 to Node 22.12+ (Validation, Deploy to Pages, CodeQL, Validate Plugin, plus the 3 that v2.15.0 cleanup bumped to Node 22)
- 2 Dependabot alerts closed: #10 (XSS in define:vars, patch 6.1.6), #16 (server-island replay, patch 6.1.10)
- astro-mermaid 2.0.1 verified against Astro 6 (may require its own upgrade)

### Repo hygiene

- AGENTS/claude/CONTEXT.md: per-phase tables refreshed to v2.15.0 catalog state (carried from v2.14.x cleanup Task 2)
- docs/internal/_working/ archive sweep: 3 subagent docs + 2 backlog aggregates moved to `_working/_archived/v2.16.0/` once v2.16 specs supersede them. **The 2026-05-14 roadmap STAYS active in `_working/`** (used for v2.16-v2.18 planning per master plan D28 + hygiene plan HG3); the distribution-channels doc also stays active.
- DS family validator: metadata-shape checks promoted from advisory to strict (`--strict` flag flips behavior to fail-on-issue)
- docs/internal/efforts/: archive completed F-XX docs per `feedback_no-effort-doc-bloat.md` discipline
- TODO/FIXME inventory: sweep 30 flagged files, convert remaining TODOs to backlog entries or close

---

## Skill Count and Component Count

| Surface | At v2.15.0 | After v2.16.0 |
|---|---|---|
| Skills total | 55 | **59** (4 new dispatch skills per D30; conditional on Phase 2 spike) |
| Phase skills | 26 | 26 |
| Foundation skills | 8 | 8 |
| Utility skills | 6 | **10** (+4 dispatch: utility-pm-critic, utility-pm-skill-auditor, utility-pm-changelog-curator, utility-pm-release-conductor) |
| Tool skills | 15 | 15 |
| Slash commands | 60+ | 64+ (4 new sub-agent wrappers; dispatch skills are accessed via skill invocation conventions, not new commands) |
| Workflows | 9 | 9 |
| Sub-agents | 0 | **4 (new component class)** |
| Hooks | 0 | 0 |
| Output styles | 0 | 0 |
| Enforcing validators | 24 | **29-30** (1 DS strict promotion + 4-5 new validators per ci-plan; exact count finalized at CI Phase 1 Task 1 per D19) |
| Family contracts | 3 (Meeting, FS, DS) | 3 |
| Concept docs | (current) | **+2** (sub-agents.md, active-orchestration.md) |
| Reference docs | (current) | +1 (runtime-components.md) |
| User guides | (current) | **+2** (adversarial-review.md, using-sub-agents.md) |
| Contributing guides | (current) | **+3** (release-runbook.md, authoring-sub-agents.md, sub-agent-design-patterns.md) |
| Manifest files | (current) | +2 (`subagents/_pairing.yaml`, `subagents/_chain-permitted.yaml`) |

**Note on dispatch skill conditionality:** the 4 dispatch skills are CONDITIONAL on Phase 2 spike success (per D30). If pm-critic dispatch fails on non-Claude clients, fall back to Option F (NO dispatch skills ship; total skills stays at 55). If pm-critic succeeds but conductor sub-spike fails, ship D-revised (3 dispatch skills; total 58).

**The new component class is the strategic milestone.** Five enforcing validators became six in v2.15.0 with the addition of the FS family validator; this is the same shape of milestone: zero sub-agents become four.

---

## Acceptance Criteria

v2.16.0 is ready to tag when:

### Primary track (subagents)

- [ ] All 4 sub-agent definition files exist at `subagents/{name}.md` and pass referential-prompt review (no duplicated standards content)
- [ ] All 4 companion slash commands exist in `commands/` and resolve to the correct sub-agent
- [ ] `docs/reference/runtime-components.md` catalogs all 4 sub-agents with audience, trigger, lifetime, tool surface, composition notes
- [ ] AGENTS.md has a Sub-Agents section listing all 4 agents and linking to runtime-components.md
- [ ] `docs/guides/adversarial-review.md` exists and documents both Claude (pm-critic) and Codex (codex-rescue) invocation paths
- [ ] `docs/contributing/release-runbook.md` exists and documents the 6 gates the conductor enforces
- [ ] 12 library samples shipped (3 per sub-agent) demonstrating real invocations
- [ ] pm-critic exercised against at least 3 distinct PM-artifact types (PRD, OKR set, meeting recap) and produces P0-P3 findings correctly
- [ ] pm-skill-auditor invoked against current repo state, surfaces at least 1 real cross-cutting issue
- [ ] pm-changelog-curator drafts entries from a real git log range respecting CLAUDE.md hygiene rules
- [ ] pm-release-conductor walks through a dry-run release flow with all 6 gates pausing correctly
- [ ] Sub-agent chain depth verified at 2 levels max (conductor invokes auditor and curator; neither child chains further)

### Secondary track (doc-stack modernization)

- [ ] package.json bumped to Astro 6.x
- [ ] engines.node bumped to >= 22.12.0
- [ ] All 5 CI workflows on Node 22.12+
- [ ] astro-mermaid compatibility verified (upgraded if needed)
- [ ] Custom CSS classes audited and ported where Astro 6 breaks them
- [ ] 2 Dependabot alerts closed (verify with `gh api 'repos/product-on-purpose/pm-skills/dependabot/alerts?state=open' --jq '. | length'` returning 0)
- [ ] Astro build produces page count >= v2.15.0 build (no page regressions)
- [ ] All 24+ enforcing validators green on the upgraded build

### Tertiary track (hygiene)

- [ ] AGENTS/claude/CONTEXT.md per-phase tables match v2.15.0 catalog (26 phase + 8 foundation + 6 utility + 15 tool = 55); refresh runs LAST per Codex R13 + D13 sequencing
- [ ] DS family validator runs in CI with `--strict` and passes 7/7 members
- [ ] `_working/` contains only active drafts; v2.15.0 backlogs + subagent design docs archived to `_working/_archived/v2.16.0/`. **Roadmap stays active** per D28.
- [ ] `docs/internal/efforts/` reviewed; completed F-XX docs archived
- [ ] `docs/internal/backlog-canonical.md` refreshed against v2.15.0 state
- [ ] TODO/FIXME inventory generated; each item dispositioned (close, convert to backlog entry, or carry to v2.17)

### Docs track (added per SR-P1-01 + SR-P1-02)

- [ ] 5 new docs shipped: `sub-agents.md`, `active-orchestration.md`, `using-sub-agents.md`, `authoring-sub-agents.md`, `sub-agent-design-patterns.md`
- [ ] AGENTS.md has Sub-Agents section per docs-plan Task 7
- [ ] README.md has v2.16.0 What's New + component-class bullet per docs-plan Task 8
- [ ] All 4+ mermaid diagrams render correctly
- [ ] All cross-references resolve (internal link validator clean)
- [ ] Sidebar reflects 5 new pages
- [ ] Pagefind indexes new pages

### CI track (added per SR-P1-01 + SR-P1-02)

- [ ] D19 ratification implemented: `validate-agents-md` extended (not new dedicated validator)
- [ ] D20 ratification implemented: `tools:` comma-separated scalar enforced
- [ ] D21 ratification implemented: `Agent` tool hard-fail with `_chain-permitted.yaml` allowlist
- [ ] D27 ratification implemented: `scripts/check-em-dashes` canonical, with allowlist file
- [ ] 4 new validator triplets shipped (.sh + .ps1 + .md each): check-runtime-components-sync, check-sub-agent-command-pair, check-em-dashes, check-aggregate-counters
- [ ] validation.yml invokes all new validators in CI5 order
- [ ] CI runtime increment < 30 seconds per CI8
- [ ] `subagents/_pairing.yaml` and `subagents/_chain-permitted.yaml` exist with all 4 sub-agent entries
- [ ] `scripts/check-em-dashes.allowlist` exists with the 4 known intentional instances
- [ ] `docs/contributing/ci-conventions.md` documents new validators
- [ ] Synthetic-failure tests pass for each new validator

### Release-prep gates

- [ ] CHANGELOG.md v2.16.0 entry authored and reviewed
- [ ] docs/changelog mirror matches CHANGELOG.md
- [ ] Release_v2.16.0.md authored under `docs/releases/`
- [ ] plugin.json version bumped to 2.16.0
- [ ] Marketplace manifest version bumped to match
- [ ] README.md version badges + What's New section updated
- [ ] Phase 0 Adversarial Review cycle completed (Codex review run via `/jp-ai-review` or `codex:codex-rescue`; findings dispositioned)
- [ ] em-dash sweep clean across all tracked text files
- [ ] Aggregate counters re-derived and match declared (skill counts, command counts, sub-agent counts, validator counts)
- [ ] Tag annotated message authored
- [ ] GitHub Release UI body drafted (typically copy from Release_v2.16.0.md)

---

## Release Sequencing

```
SUBAGENT TRACK (subagents-integration-plan.md):
  Phase 1: Subagent infrastructure foundation       [1 session]
    -> subagents/ directory + runtime-components.md skeleton + AGENTS.md section
  Phase 2: Ship pm-critic                            [1-2 sessions]
    -> subagents/pm-critic.md + /critic + 1 sample + adversarial-review.md
    -> GATE: exercise against >=3 v2.15.0 artifacts; amend if needed
  Phase 3: Ship pm-skill-auditor                     [1-2 sessions]
  Phase 4: Ship pm-changelog-curator                 [1 session]
  Phase 5: Ship pm-release-conductor                 [2 sessions]
    -> verify chain to auditor + curator
  Phase 6: Library samples (remaining 8)             [1 session]
  Phase 7: Documentation consistency sweep           [0.5 session]
  Phase 8: Integration check                         [0.5 session]

DOCS TRACK (docs-plan.md), interleaved with subagent track:
  Phase 1: Concept docs (sub-agents, active-orchestration)  [0.5-1 session]
  Phase 2: Usage docs (using-sub-agents overview)           [0.5 session]
  Phase 3: Contributor docs (authoring + design patterns)   [0.5-1 session]
  Phase 4: AGENTS.md + README.md + cross-cutting + sidebar  [0.5 session]

CI TRACK (ci-plan.md), interleaved with subagent track:
  Phase 1: Validator decision (extend vs new)               [0.25 session]
  Phase 2: Ship 5 validators                                [0.5-1 session]
  Phase 3: validation.yml integration + runtime measurement [0.25 session]
  Phase 4: ci-conventions.md doc + final audit              [0.25 session]

DOC-STACK MODERNIZATION TRACK (doc-stack-modernization-plan.md):
  Phase 1: Astro 6 spike on feature branch                  [1-2 sessions]
  Phase 2: Merge to main                                    [0.5 session]
  Phase 3: Node 22.12+ across workflows + Dependabot close  [0.5 session]

HYGIENE TRACK (repo-hygiene-plan.md):
  Phase 1: CONTEXT.md refresh                               [0.5 session]
  Phase 2: _working/ archive sweep                          [0.5 session]
  Phase 3: DS validator strict + F-XX archive               [0.5 session]
  Phase 4: Backlog refresh + TODO inventory                 [0.5-1 session]

PRE-TAG (master plan Phase 8 equivalent):
  CHANGELOG + release notes + version bumps + Phase 0 review [1 session]
  Tag + push + GitHub Release UI body
```

**Sequencing notes:**
- Subagent Phase 1 unblocks docs Phase 1 (concept docs can reference the catalog skeleton)
- Subagent Phase 1 unblocks CI Phase 1 (CI decision can inspect the actual `subagents/` directory)
- Subagent Phase 2 (pm-critic ship) is the GATE: if observation fails, Phases 3-5 amend before authoring
- Doc-stack modernization can run in parallel with the subagent track (independent code surface)
- Hygiene track can run in parallel with everything except Phase 1 CONTEXT.md refresh which is best last (so it reflects final v2.16.0 state)
- Pre-tag runs only after all 5 sub-plans report COMPLETE

---

## Risk Register

| ID | Risk | Mitigation |
|---|---|---|
| **R1** | **Sub-agent proliferation.** Strategy doc + implementation plan + roadmap all warn. Shipping 4 at once is exactly the failure mode they warn against. | D3 acknowledged: pm-critic ships first within the same cycle and is exercised against real artifacts before the utility trio is authored. If pm-critic surfaces design issues, Phases 3-5 amend before shipping. |
| **R2** | **Sub-agent system-prompt drift from standards docs.** If pm-critic embeds OKR refusal protocols and those protocols change, the critic goes stale. | D12: referential prompts (read canonical doc at invocation time). All 4 spec docs specify referential-only. Phase 8 readiness check verifies no embedded duplication. |
| **R3** | **Proactive trigger noise (pm-critic auto-fires too aggressively).** | D7 + spec_pm-critic.md severity floor configuration. Phase 2 exercises pm-critic against a session of real PM-artifact production; if signal-to-noise ratio is bad, severity floor raises before Phase 3 begins. Documented copy-out path: user copies pm-critic to `.claude/agents/` and edits the description to remove the proactive trigger. |
| **R4** | **Astro 6 upgrade breaks the build.** Major version bump across Astro + Node + custom CSS + astro-mermaid integration. | Phase 6 spike pattern: prove Astro 6 builds on a feature branch with all current pages before merging to main. astro-mermaid checked for Astro 6 support before bump. Custom CSS classes inventoried and ported where they break. |
| **R5** | **CONTEXT.md drift compounds.** Carrying CONTEXT.md refresh from v2.14.x Task 2 means it's now drifting against v2.15.0 state. | Phase 7 task closes this. Refresh runs against current v2.15.0 catalog (55 skills) at the time the task lands. |
| **R6** | **DS validator metadata-shape strict promotion breaks members.** Currently advisory; promoting to strict could fail members that worked under advisory mode. | Phase 7 task runs strict mode against all 7 DS members before promoting CI; any failures get fixed in the same commit as the strict-mode flip. |
| **R7** | **Pre-tag Phase 0 review surfaces P0 findings late.** Adversarial review at the end of the cycle can be too late if findings require structural rework. | Run Phase 0 review against the subagent integration plan + master plan early (after Phase 2 ships pm-critic); also run against pre-tag state at the end. Two checkpoints reduce surprise risk. |
| **R8** | **Scope creep into v2.17 territory.** With 5 tracks running, temptation to add "just one more thing" is high. | D17 explicit: tags-as-feature, URL slug normalization, sync-agents-md rewrite all DEFERRED to v2.17. v2.17 stub created at end of cycle to capture overflow. |
| **R9** | **Documentation surface drift between concept docs and spec docs.** With 5 new public docs + 4 spec docs + 4 agent files + multiple AGENTS.md/README updates, internal contradictions can creep in. | docs-plan DC9 cross-reference rule; docs-plan Phase 4 Task 11 final audit. |
| **R10** | **CI runtime budget exceeded by new validators.** 4-5 new validators on every CI run could push validation job past comfortable duration. | ci-plan CI8 explicit 30-second budget; ci-plan Phase 3 Task 8 measures actual increment + optimizes if exceeded. |
| **R11** | **Conductor's G2.5 commit gate compounds with G0 chain to auditor.** G2.5 re-runs G0 sub-checks against the new commit; this includes re-chaining to pm-skill-auditor. Cost doubles for the audit chain on every release. | Accepted cost; the safety win outweighs. Future v2.17 optimization: G2.5 may pass scoped audit (`--scope changed --since-tag {previous-tag}`) rather than full repo audit. |
| **R12** | **Chained handoff envelope drift.** Auditor and curator emit Status YAML blocks per D26; format drift between child output and conductor's parser would silently break gate logic. | CI plan should add a validator for Status-block presence and shape on auditor + curator outputs in v2.17 (deferred; in-cycle verification at integration check Phase 8). |

---

## Out of Scope for v2.16.0

These are tracked elsewhere or explicitly held for later:

- **pm-workflow-orchestrator.** Strategic Tier 1 candidate but scoped to v2.17.0 (Feature Kickoff workflow only) per D2.
- **pm-frontmatter-doctor.** Utility tier candidate. Opportunistic v2.17 if frontmatter drift becomes measurable pain. Pairs with R-05 spec-compliance work from the roadmap.
- **pm-sample-curator.** Depends on F-34 THREAD_PROFILES.md which is not yet on the schedule.
- **pm-cross-llm-handoff.** Strategic Tier 2. Spike required before commit; not a v2.16 deliverable.
- **AI-Native PM Pack.** Roadmap R-01/R-02/R-03/R-14 (eval-suite-spec, prompt-spec, model-card, ai-failure-mode-catalog). Held for v2.17.0.
- **Content-skill additions** (market-sizing, prioritization-framework, journey-map, survey-analysis). Roadmap P0/P1 content gaps; held for v2.17.0+.
- **Tags-as-feature, URL slug normalization, sync-agents-md.yml rewrite.** Tier 2 deferrals from v2.16 stub; pushed to v2.17 per D17.
- **pm-skills-mcp catalog unfreeze.** Blocked on M-22 decision.
- **Knowledge OS workspace features.** Separate initiative since 2026-03-21.
- **Hook infrastructure** (R-24 PostToolUse frontmatter hook from roadmap). Defer to v2.17 once sub-agents are battle-tested; pairs with R-65 hook-triggered sub-agent invocation.
- **Output styles** (R-45 PM Voice from roadmap). Defer to v2.18+.
- **User-settings infrastructure** (`.claude/pm-skills.local.md` parser). Defer per D10.
- **Family-steward design.** Defer per D8.
- **Multi-reviewer critique board** (R-58 from roadmap). P3.

---

## Cross-References

- v2.15.0 master plan (predecessor; cycle complete): [`../v2.15.0/plan_v2.15.0.md`](../v2.15.0/plan_v2.15.0.md)
- Subagent strategy (canonical design source): [`../../_working/subagents/subagent-strategy_2026-05-07.md`](../../_working/subagents/subagent-strategy_2026-05-07.md)
- Subagent implementation plan (ship sequencing reference): [`../../_working/subagents/subagent-implementation-plan_2026-05-10.md`](../../_working/subagents/subagent-implementation-plan_2026-05-10.md)
- Strategic roadmap (Opus 4.7 max-effort synthesis): [`../../_working/roadmap_opus-4.7-max_2026-05-14.md`](../../_working/roadmap_opus-4.7-max_2026-05-14.md)
- Astro 5.13.x pin rationale: [`../v2.14.0/plan_v2.14_starlight-migration.md`](../v2.14.0/plan_v2.14_starlight-migration.md)
- Phase 0 Adversarial Review template: [`../v2.11.0/plan_v2.11_pre-release-checklist.md`](../v2.11.0/plan_v2.11_pre-release-checklist.md)
- CHANGELOG hygiene rules: `CLAUDE.md` (repo root)
- Skill-versioning governance: [`../../skill-versioning.md`](../../skill-versioning.md)
- Backlog (refreshes during Phase 7): [`../../backlog-canonical.md`](../../backlog-canonical.md)

---

## Open Questions for Maintainer Review

7 decisions surfaced for maintainer review in [`open-questions_v2.16.0.md`](./open-questions_v2.16.0.md). Each follows the Decision Brief pattern (context / why it matters / desired outcomes / potential solutions / recommendation / maintainer slot). Summary:

| # | Topic | Status | Recommendation |
|---|---|---|---|
| Q1 | Slate cadence (one tag vs split) | OPEN | Ship all 4 in v2.16.0 (D3) |
| Q2 | Tier 2 deferrals to v2.17 | OPEN | Defer tags-as-feature, URL slug, sync-agents-md rewrite (D17) |
| Q3 | Chain depth enforcement strength | OPEN | Hard-fail Agent tool outside allowlist (D21) |
| Q4 | G2.5 commit gate addition | OPEN | Add as 6th gate (D22) |
| Q5 | --skip-gates removal | OPEN | Remove from v2.16 (D24) |
| Q6 | Chained handoff envelope format | OPEN | YAML Status block (D26) |
| Q7 | Graceful degradation for non-Claude clients | OPEN (NEW) | Intent-layer parity + cross-client section in runtime-components.md + AGENTS.md graceful-degradation note (proposed Option C, no D yet) |

Execution can begin against current ratified decisions; maintainer review of Q1-Q7 either confirms (no plan change) or amends (explicit decision update propagated to affected sub-plans). Q7 is genuinely new (post-Codex-review) and may produce D30 if accepted.

---

## Decisions Index

Catalog of all 68+ ratified decisions across the v2.16.0 plan set. One row per decision. For each decision, see the owning file's Ratified Decisions section.

### Master plan decisions (D1-D31)

| ID | Topic | Owning section |
|---|---|---|
| D1 | Version 2.16.0 (minor) | `plan_v2.16.0.md` Ratified Decisions |
| D2 | Slate scope (4 sub-agents) | (same) |
| D3 | Slate cadence (one tag, no 2-week observation gate) - **OPEN Q1** | (same) |
| D4 | subagents/ directory layout (flat) | (same) |
| D5 | Cataloging surface (`runtime-components.md`) | (same) |
| D6 | Wrapper slash commands (every agent ships one) | (same) |
| D7 | Proactive vs explicit triggers (pm-critic only proactive) | (same) |
| D8 | Family-steward design (defer) | (same) |
| D9 | em-dash sweep gate in conductor (yes, enforce at G0) | (same) |
| D10 | User-settings infrastructure (defer to v2.17) | (same) |
| D11 | Cross-client compatibility (AMENDED 2026-05-16: dispatch skills strategy per D30) | (same) |
| D12 | Sub-agent system-prompt style (referential, not duplicative) | (same) |
| D13 | Sub-agent memory (default none) | (same) |
| D14 | Chain depth limit (2 levels) | (same) |
| D15 | Severity grammar (P0/P1/P2/P3) | (same) |
| D16 | Astro 6.x upgrade in same release | (same) |
| D17 | Tier 2 deferrals (tags-as-feature, URL slug, sync-agents-md) - **OPEN Q2** | (same) |
| D18 | Bridge to v2.17.0 | (same) |
| D19 | Validator approach: EXTEND validate-agents-md (resolves SR-P0-01) | (same; added from review) |
| D20 | `tools:` frontmatter syntax (comma-separated scalar; resolves R04) | (same; added from review) |
| D21 | Chain depth enforcement HARD FAIL with allowlist (resolves R03) - **OPEN Q3** | (same; added from review) |
| D22 | G2.5 commit gate (resolves R01) - **OPEN Q4** | (same; added from review) |
| D23 | G4 blocking power (resolves R07) | (same; added from review) |
| D24 | `--skip-gates` REMOVED (resolves R05) - **OPEN Q5** | (same; added from review) |
| D25 | Curator dirty-tree refusal (resolves R06) | (same; added from review) |
| D26 | Chained handoff Status envelope (resolves R08) - **OPEN Q6** | (same; added from review) |
| D27 | Em-dash sweep canonical via `scripts/check-em-dashes` (resolves SR-P1-03 + R10) | (same; added from review) |
| D28 | Roadmap stays active in `_working/` (resolves R11) | (same; added from review) |
| D29 | Pairing manifest ownership = subagents Phase 1 (resolves R12) | (same; added from review) |
| D30 | Single-tool user assumption + dispatch skill strategy (Q7 walkthrough) - **OPEN Q7 RESOLVED** | (same; added 2026-05-16 from maintainer review) |
| D31 | subagents/ directory rename (AMENDS D4 due to Windows NTFS case-collision with AGENTS/) | (same; added 2026-05-17 during Phase 1 Task 1 execution) |

### Sub-plan decisions

| ID | Owning file | Topic |
|---|---|---|
| SI1 | `subagents-integration-plan.md` | subagents/ directory layout (flat per D4) |
| SI2 | (same) | Sub-agent naming convention (`pm-{role}`) |
| SI3 | (same) | Companion command naming (verb-shaped) |
| SI4 | (same) | Sub-agent CI recognition (inherits D19) |
| SI5 | (same) | Sample-coverage tier (Tier 0 for v2.16) |
| SI6 | (same) | Adversarial review of integration plan (2 checkpoints) |
| SI7 | (same) | Slash command frontmatter convention |
| SI8 | (same) | Sub-agent severity grammar (inherits D15) |
| DC1 | `docs-plan.md` | Concept-doc tier (2 docs) |
| DC2 | (same) | Usage-doc surface |
| DC3 | (same) | Contributor doc surface (2 docs) |
| DC4 | (same) | AGENTS.md depth |
| DC5 | (same) | README depth |
| DC6 | (same) | Mermaid diagrams (1+ per concept doc) |
| DC7 | (same) | Cross-LLM coverage (Claude + Codex paths in all guides) |
| DC8 | (same) | Sidebar placement |
| DC9 | (same) | Reference cross-link rule |
| DC10 | (same) | Em-dash discipline (inherits D27) |
| CI1 | `ci-plan.md` | Validator approach (inherits D19) |
| CI2 | (same) | Validator triplet convention |
| CI3 | (same) | Enforcing vs advisory (enforcing from day one) |
| CI4 | (same) | Strict mode flag |
| CI5 | (same) | CI invocation order |
| CI6 | (same) | check-em-dashes scope (canonical per D27) |
| CI7 | (same) | check-aggregate-counters source-of-truth files |
| CI8 | (same) | CI runtime budget (< 30s increment) |
| CI9 | (same) | Failure verbosity |
| DM1 | `doc-stack-modernization-plan.md` | Node target (22.12+) |
| DM2 | (same) | astro-mermaid handling |
| DM3 | (same) | Custom CSS approach |
| DM4 | (same) | Spike branch convention |
| DM5 | (same) | Dependabot alert closure verification |
| DM6 | (same) | Workflow sync (5 workflows in spike branch, per R02 sequencing) |
| HG1 | `repo-hygiene-plan.md` | CONTEXT.md scope |
| HG2 | (same) | `_working/` archive destination |
| HG3 | (same) | F-XX archive criteria |
| HG4 | (same) | DS validator strict mode |
| HG5 | (same) | Backlog format |
| HG6 | (same) | TODO disposition rules |

**Total: 70 ratified decisions across 6 documents.** Master plan has 31; sub-plans have 39 (8 + 10 + 9 + 6 + 6). 7 of the 31 master plan decisions have open maintainer questions (Q1-Q6 + Q7); D31 was an execution-time amendment, not an open maintainer question.

---

## Promotion to v2.17.0 Stub

Create `docs/internal/release-plans/v2.17.0/plan_v2.17.0.md` as a stub at the end of v2.16.0 Phase 8, carrying:

- pm-workflow-orchestrator (Feature Kickoff scope)
- pm-frontmatter-doctor (opportunistic)
- AI-Native PM Pack (R-01 + R-02 + R-03 + R-14)
- Content gaps (R-06 market-sizing, R-07 prioritization-framework, R-10 journey-map)
- Frontmatter `metadata:` sweep for agentskills.io spec compliance (R-05)
- Marketplace follow-through (R-09): 12 of 15 channels still un-submitted per distribution-channels.md
- Skill proposal funnel (R-08)
- Tags-as-feature + URL slug normalization + sync-agents-md rewrite (Tier 2 deferrals from v2.16 stub)
- Hook infrastructure: R-24 PostToolUse frontmatter + R-65 hook-triggered sub-agent invocation
