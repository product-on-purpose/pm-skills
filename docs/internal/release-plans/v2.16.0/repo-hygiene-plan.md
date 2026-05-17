# Repo Hygiene Plan

> **For agentic workers:** Use superpowers:executing-plans to walk this plan task-by-task. Most tasks here are mechanical sweeps; pair with maintainer judgment for archive vs delete decisions.

**Goal:** Pay down accumulated repo hygiene debt from the v2.14.x and v2.15.0 cycles. Refresh CONTEXT.md to v2.15.0 catalog state. Sweep `_working/` to archive superseded planning docs. Promote DS family validator metadata-shape from advisory to strict. Refresh the canonical backlog. Inventory TODO/FIXME across the repo and disposition each.

**Architecture:** Most hygiene tasks are independent of one another and can run in parallel. **EXCEPTION (per Codex R13):** CONTEXT.md refresh (Task 1) should run as the LAST hygiene task because it re-derives counts that depend on the final state of every other track (subagents added, validators added, docs added). If CONTEXT.md is refreshed early and then other tracks land, it drifts again immediately. To enforce this without re-numbering Phase 1, Task 1 has an explicit prerequisite: "all other phases of all sub-plans report COMPLETE." Single integration point: each task updates the master plan's "Where we are" snapshot when complete.

**Cross-references:** Master plan at `plan_v2.16.0.md`. Subagent integration plan and doc-stack modernization plan run in parallel.

---

## Status

**Plan ACTIVE.** Not yet started. 8 tasks across 4 phases.

### Where we are

| Phase | Status |
|---|---|
| Phase 1: CONTEXT.md refresh (carried from v2.14.x Task 2) | PENDING |
| Phase 2: `_working/` archive sweep | PENDING |
| Phase 3: DS validator metadata-shape strict + completed F-XX archive | PENDING |
| Phase 4: Backlog refresh + TODO inventory | PENDING |

### Estimated remaining

2-3 sessions across all 4 phases. Phase 1 is ~1.5 hours (carried estimate). Other phases vary.

---

## Prerequisites

- [x] v2.15.0 tagged (HEAD `a108301`)
- [x] v2.14.x cleanup plan Task 1 (Node 22 bump) shipped (commit `0d9af62` in v2.15.0 cycle)
- [x] v2.14.x cleanup plan Task 3 (Dependabot bump) shipped (commit `7a099b4` in v2.15.0 cycle)
- [ ] v2.14.x cleanup plan Task 2 (CONTEXT.md refresh) - this plan absorbs it as Phase 1

---

## Scope

This plan covers:

- `AGENTS/claude/CONTEXT.md` per-phase tables refresh to v2.15.0 catalog state (carried-forward from v2.14.x)
- `docs/internal/_working/` archive sweep: archive superseded backlogs, design source docs, completed brainstorms
- `docs/internal/efforts/` archive sweep: archive completed F-XX docs (per `feedback_no-effort-doc-bloat.md` discipline)
- DS family validator metadata-shape: promote from advisory to strict (`--strict` flag flips behavior)
- `docs/internal/backlog-canonical.md` refresh: incorporate v2.15.0 shipped items, surface v2.16+ priorities
- Repo-wide TODO/FIXME inventory and disposition

This plan does NOT cover:

- Net-new content (no skill additions, no new validators)
- Astro 6 upgrade (see `doc-stack-modernization-plan.md`)
- Subagent slate (see `subagents-integration-plan.md`)
- M-22 MCP unfreeze (separate decision)
- Knowledge OS work (separated 2026-03-21)

---

## Ratified Decisions

| # | Decision area | Choice |
|---|---|---|
| **HG1** | **CONTEXT.md scope** | Per-phase tables: counts per classification (phase: 26, foundation: 8, utility: 6, tool: 15; total 55) + per-phase skill listings + last-updated-date stamp. Match the pattern established in v2.12.0+. |
| **HG2** | **`_working/` archive destination** | `docs/internal/_working/_archived/v2.16.0/`. Mirrors existing `_archived/` convention. Includes README.md noting why each doc was archived. |
| **HG3** | **F-XX archive criteria** | A completed F-XX effort doc is archivable when (a) its tracked work is shipped on origin/main AND (b) no v2.16+ plan references it as active source material AND (c) it does not document a still-open decision. |
| **HG4** | **DS validator strict mode** | Promote `--strict` to the default CI invocation. Fail-on-issue for metadata-shape checks. Members get fixed in the same commit as the strict-mode promotion if any fail. |
| **HG5** | **Backlog format** | Continue priority-ordered table format in `docs/internal/backlog-canonical.md`. Add a "Closed in v2.X.Y" column for items recently shipped. |
| **HG6** | **TODO disposition rules** | Each TODO gets one of: (a) closed in v2.16.0 (with commit ref), (b) converted to a backlog entry, (c) explicitly carried to v2.17 with reason, (d) deleted as no-longer-relevant. No TODOs remain untriaged at v2.16.0 ship. |

---

## Phase 1: CONTEXT.md Refresh (1 task)

**Goal:** Bring `AGENTS/claude/CONTEXT.md` per-phase tables to v2.15.0 catalog state. Carried from v2.14.x cleanup Task 2.

### Task 1: Refresh AGENTS/claude/CONTEXT.md per-phase tables

**Prerequisite (added per Codex R13):** This task runs LAST. All other phases of all sub-plans (subagents, docs, CI, doc-stack, hygiene Phases 2-4) must report COMPLETE before this task starts. Re-derives final counts that incorporate the full v2.16.0 state.

- [ ] Verify all other sub-plan phases COMPLETE before starting
- [ ] Read current `AGENTS/claude/CONTEXT.md`
- [ ] Identify the per-phase tables section (likely a "Skills inventory" or "Per-classification breakdown" subsection)
- [ ] Re-derive counts:
  - Phase skills: count `skills/{discover|define|develop|deliver|measure|iterate}-*/` directories
  - Foundation skills: count `skills/foundation-*/`
  - Utility skills: count `skills/utility-*/`
  - Tool skills: count `skills/tool-*/`
- [ ] Update each per-classification table with current skill listings
- [ ] Add a "Last refreshed: v2.15.0 (2026-05-16)" stamp
- [ ] Verify total = 55
- [ ] Commit with message `docs(v2.16-hygiene): refresh AGENTS/claude/CONTEXT.md per-phase tables to v2.15.0 catalog`

**Done when:** CONTEXT.md reflects v2.15.0 catalog; refresh stamp present; total skills = 55 matches all other declared surfaces.

---

## Phase 2: `_working/` Archive Sweep (2 tasks)

**Goal:** Archive working documents that have been superseded by the v2.16.0 commit (spec docs, integration plan, master plan). Keep `_working/` as a live drafting space, not a graveyard.

### Task 2: Archive subagent design source docs

- [ ] Create `docs/internal/_working/_archived/v2.16.0/` directory
- [ ] Move `docs/internal/_working/subagents/subagent-strategy_2026-05-07.md` to `_archived/v2.16.0/subagent-strategy_2026-05-07.md`
- [ ] Move `docs/internal/_working/subagents/subagent-implementation-plan_2026-05-10.md` to `_archived/v2.16.0/subagent-implementation-plan_2026-05-10.md`
- [ ] Move `docs/internal/_working/agent-component-usage_2026-04-18.md` to `_archived/v2.16.0/agent-component-usage_2026-04-18.md`
- [ ] Update any references in active plans/specs to point to the archived path (master plan + integration plan + spec docs)
- [ ] Add `docs/internal/_working/_archived/v2.16.0/README.md` explaining what each archived doc was and which v2.16.0 artifact superseded it
- [ ] Verify the `docs/internal/_working/subagents/` directory is empty and remove it

**Done when:** 3 subagent design docs archived; references in active plans point to archived paths; `_working/subagents/` removed.

### Task 3: Archive superseded backlog and roadmap

- [ ] Decide on disposition for backlogs and roadmap:
  - `backlog-aggregated_2026-05-08_codex.md` - superseded by 2026-05-14 roadmap + this v2.16.0 plan. Archive.
  - `backlog-aggregated_2026-05-08_claude-sonnet.md` - superseded by 2026-05-14 roadmap + this v2.16.0 plan. Archive.
  - `roadmap_opus-4.7-max_2026-05-14.md` - active for v2.16-v2.18 planning. KEEP in `_working/`.
  - `distribution-channels.md` - active (12 of 15 channels still un-submitted per memory). KEEP.
- [ ] Move 2 backlog aggregates to `_archived/v2.16.0/`
- [ ] Update `_archived/v2.16.0/README.md` to include the 2 backlogs
- [ ] Leave roadmap + distribution-channels in `_working/`

**Done when:** 2 backlog aggregates archived; roadmap + distribution-channels remain active; README explains the choices.

---

## Phase 3: DS Validator Strict + F-XX Effort Archive (2 tasks)

**Goal:** Promote the DS family validator's metadata-shape checks from advisory to strict. Archive completed F-XX effort docs per the no-effort-doc-bloat discipline.

### Task 4: Promote DS validator metadata-shape to strict

- [ ] Read `scripts/validate-design-sprint-skills-family.sh` and `.ps1`
- [ ] Identify the metadata-shape checks (likely flagged with `--strict` conditional logic)
- [ ] Run the validator in strict mode against current DS family members: `bash scripts/validate-design-sprint-skills-family.sh --strict`
- [ ] If any of the 7 members fail strict mode, fix the metadata-shape in the same commit
- [ ] Update `.github/workflows/validation.yml` to invoke the DS validator with `--strict` by default
- [ ] Update `docs/reference/skill-families/design-sprint-skills-contract.md` to note that metadata-shape is now strictly enforced
- [ ] Verify CI green with strict mode on

**Done when:** DS validator runs in CI with `--strict`; all 7 members pass; contract doc reflects the change.

### Task 5: Archive completed F-XX effort docs

- [ ] Inventory `docs/internal/efforts/`:
  - List all top-level `F-XX-*` files and directories
  - For each, classify: (a) shipped in v2.X.Y with no remaining open items (ARCHIVE), (b) still actively referenced by v2.16+ plans (KEEP), (c) abandoned / superseded (DELETE or archive)
- [ ] Create `docs/internal/efforts/_archived/v2.16.0/` directory
- [ ] Move archivable F-XX docs to the archive directory
- [ ] For each archived F-XX, verify no live plan references it; if any references exist, update them to point to the archive path
- [ ] Add `docs/internal/efforts/_archived/v2.16.0/README.md` listing archived efforts with their shipping version reference

**Done when:** completed F-XX docs archived; live plans don't reference dead F-XX paths; README documents the archive.

---

## Phase 4: Backlog Refresh + TODO Inventory (3 tasks)

**Goal:** Update the canonical backlog to reflect v2.15.0 shipped state and v2.16+ priorities. Inventory all TODO/FIXME markers and disposition each.

### Task 6: Refresh docs/internal/backlog-canonical.md

- [ ] Read current `docs/internal/backlog-canonical.md`
- [ ] Mark items shipped in v2.15.0 as CLOSED with version + commit references:
  - Sprint skills launch
  - Foundation Sprint family (7 members) + contract + validator
  - Design Sprint family (7 members) + contract + validator
  - tool-note-and-vote standalone
  - foundation-to-design workflow
  - All 15 new commands
  - 45 library samples
  - 2 concept docs (foundation-sprint.md, design-sprint.md)
  - 2 user guides (using-foundation-sprint, using-design-sprint)
- [ ] Mark items shipped in v2.16.0 as CLOSED (incremental update as v2.16 phases complete):
  - 4 sub-agents
  - 4 companion slash commands
  - Astro 6 upgrade
  - CONTEXT.md refresh
- [ ] Add v2.17+ items surfaced by the 2026-05-14 roadmap:
  - pm-workflow-orchestrator
  - pm-frontmatter-doctor (opportunistic)
  - AI-Native PM Pack (R-01 to R-03 + R-14)
  - Content gaps (R-06, R-07, R-10, R-11)
  - Frontmatter `metadata:` sweep (R-05)
  - Marketplace follow-through (R-09)
  - Skill proposal funnel (R-08)
- [ ] Re-order by priority
- [ ] Add a "Last refreshed: v2.16.0 (2026-MM-DD)" stamp

**Done when:** backlog reflects v2.15.0 + v2.16.0 shipped state; v2.17+ priorities surfaced; stamp present.

### Task 7: TODO/FIXME inventory

- [ ] Run repo-wide search: `grep -rn "TODO\|FIXME\|XXX" --include='*.md' --include='*.mjs' --include='*.js' --include='*.sh' --include='*.ps1' .` (exclude `_NOTES/`, `node_modules/`, `_archived/`)
- [ ] Capture output into a working table with columns: File, Line, Marker, Context, Disposition
- [ ] For each entry, decide disposition per HG6:
  - (a) Close in v2.16.0 (small enough to fix during hygiene phase; mark with planned commit)
  - (b) Convert to backlog entry (significant; add to backlog-canonical.md)
  - (c) Carry to v2.17 with reason (tracked deferral)
  - (d) Delete the marker (no-longer-relevant; the underlying code/doc has changed)
- [ ] Execute the (a) closures
- [ ] Execute the (b) backlog conversions
- [ ] Execute the (c) carry-overs (document in v2.17 stub)
- [ ] Execute the (d) deletions

**Done when:** every TODO/FIXME has a disposition; (a)-(d) actions executed; final repo-wide grep returns only carried-forward items (with comment explaining).

### Task 8: Final hygiene sweep

- [ ] Run all enforcing validators on origin/main; verify clean
- [ ] Run em-dash sweep via canonical script: `bash scripts/check-em-dashes.sh` (scope and allowlist defined in CI plan CI6 + master plan D27; supersedes ad-hoc grep)
- [ ] Verify aggregate counters consistent across CONTEXT.md, AGENTS.md, README.md
- [ ] Update `docs/internal/release-plans/v2.16.0/plan_v2.16.0.md` "Where we are" snapshot with hygiene track marked COMPLETE
- [ ] Update this plan's status block to COMPLETE

**Done when:** validators clean; em-dash sweep clean; counters consistent; master plan reflects track completion.

---

## Acceptance Criteria

This plan closes when:

- [ ] `AGENTS/claude/CONTEXT.md` per-phase tables reflect v2.15.0 catalog (26 + 8 + 6 + 15 = 55)
- [ ] `docs/internal/_working/` contains only active drafts (roadmap, distribution-channels, anything not superseded)
- [ ] `docs/internal/_working/_archived/v2.16.0/` contains 5 superseded docs with README
- [ ] DS family validator runs in CI with `--strict` and passes 7/7 members
- [ ] `docs/internal/efforts/_archived/v2.16.0/` exists with archived F-XX docs and README
- [ ] `docs/internal/backlog-canonical.md` reflects v2.15.0 + v2.16.0 shipped items and surfaces v2.17+ priorities
- [ ] TODO/FIXME inventory complete; all entries dispositioned; final grep matches expected count
- [ ] All 24+ enforcing validators green on origin/main
- [ ] em-dash sweep clean

---

## Risks

| ID | Risk | Mitigation |
|---|---|---|
| **HG-R1** | **CONTEXT.md refresh drifts from reality if catalog changes mid-cycle.** | Phase 1 runs last in the cycle (after subagents are stable + Astro 6 merged) so it reflects final v2.16.0 state, not interim. |
| **HG-R2** | **Archive sweep moves a file still actively referenced.** | Phase 2 Task 2 + Task 3 explicitly check active references before moving; update references if found. |
| **HG-R3** | **DS validator strict mode fails on members.** | Phase 3 Task 4 fixes any failing members in the same commit as the strict promotion. No partial state on main. |
| **HG-R4** | **F-XX archive boundary fuzzy.** Some F-XX docs span multiple shipped versions; hard to say "complete." | HG3 criteria explicit: shipped + no active reference + no open decision. If any criterion is unclear, KEEP rather than archive. Conservative default. |
| **HG-R5** | **Backlog refresh introduces re-litigation of locked decisions.** | Backlog reflects what was shipped + what's next, not re-decisions. Locked architectural decisions (D1-D18 in master plan) are not re-opened. |
| **HG-R6** | **TODO inventory scope explodes.** 30+ files have TODO markers; some are deep in legacy effort docs. | HG6 disposition rules allow (d) delete-as-no-longer-relevant for legacy markers. Effort-doc TODOs that get archived in Phase 3 Task 5 are auto-dispositioned. |
| **HG-R7** | **Em-dash sweep catches a deliberately-quoted source.** | Documented in `spec_pm-release-conductor.md` RC6: library samples allowlist for em-dash sweep. Hygiene plan uses the same allowlist convention. |

---

## Out of scope for this plan

- New content (no skills, no commands, no workflows)
- Subagent slate (see `subagents-integration-plan.md`)
- Astro 6 upgrade (see `doc-stack-modernization-plan.md`)
- Frontmatter metadata sweep for agentskills.io spec compliance (R-05 from roadmap; deferred to v2.17)
- Tags-as-feature (deferred per master plan D17)
- URL slug normalization (deferred per master plan D17)
- sync-agents-md.yml rewrite (deferred per master plan D17)
- Marketplace follow-through (deferred to v2.17 per master plan promotion criteria)
- Skill proposal funnel (deferred to v2.17)

---

## Cross-References

- Master plan: [`plan_v2.16.0.md`](./plan_v2.16.0.md)
- Sibling plans: [`subagents-integration-plan.md`](./subagents-integration-plan.md), [`doc-stack-modernization-plan.md`](./doc-stack-modernization-plan.md)
- v2.14.x cleanup origin (Task 2 carried here): [`../v2.15.0/v2.14.x-deferrals-cleanup-plan.md`](../v2.15.0/v2.14.x-deferrals-cleanup-plan.md)
- No-effort-doc-bloat discipline: `feedback_no-effort-doc-bloat.md` (in memory)
- Aggregate-counter audit discipline: `feedback_stale-aggregate-counter.md` (in memory)
- Update-plans discipline: `feedback_update-plans-as-you-ship.md` (in memory)
- em-dash rule: `CLAUDE.md` + `feedback_no-em-dashes.md`
- Backlog: [`../../backlog-canonical.md`](../../backlog-canonical.md)
