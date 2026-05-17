# Doc-Stack Modernization Plan

> **For agentic workers:** Use superpowers:executing-plans to walk this plan task-by-task.

**Goal:** Upgrade Astro 5.13.x to Astro 6.x, bump Node from 22 to 22.12+ across all CI workflows, close the 2 open Dependabot alerts, verify astro-mermaid + custom CSS compatibility under Astro 6, and surface any breakage on a feature branch before merging to main.

**Architecture:** v2.14.0 pinned Astro at 5.13.x because Astro 6's Node 22.12+ requirement was out of v2.14.x scope. The pin documented in `plan_v2.14_starlight-migration.md` Decision 11 explicitly deferred the upgrade to v2.16+. This plan executes that deferral.

**Cross-references:** Master plan at `plan_v2.16.0.md`. Subagent integration plan runs in parallel. Hygiene plan also runs in parallel where independent.

---

## Status

**Plan PHASE 1 COMPLETE LOCALLY** (2026-05-17 evening). 9 plan tasks + 9 mid-execution scope additions per DM7 + DM8 absorbed into spike. 13 commits on spike branch + 1 cross-repo PR merged (pm-skills-mcp #50).

Spike branch `feat/v2.16-astro-6-spike` open as PR [#147](https://github.com/product-on-purpose/pm-skills/pull/147) (DRAFT until Phase 2 merge). All enforcing validators PASS locally on spike HEAD.

### Where we are

| Phase | Status |
|---|---|
| Phase 1 Task 1a: Node bump 5 workflows + engines.node | DONE (commit `ed3621b`) |
| Phase 1 mid-execution: YAML defect fix in dispatch skill EXAMPLE.md | DONE (commit `3fcf7af`) |
| Phase 1 mid-execution: Layer 1 MCP CI hygiene (validate-mcp-sync advisory) | DONE (commit `6bceac5`) |
| Phase 1 mid-execution: Layer 2 cross-repo pm-skills-mcp fix | DONE (pm-skills-mcp PR [#50](https://github.com/product-on-purpose/pm-skills-mcp/pull/50) MERGED at `6354b77`) |
| Phase 1 Task 1: Astro 6.3.x + Starlight 0.39.x bump + lockfile regeneration | DONE (commit `15aaca8`) |
| Phase 1 Task 2: Inventory + fix breakage (sidebar wrapping per Starlight 0.39, SKILL.md description fix, regen) | DONE (commit `fa5ed8b`) |
| Phase 1 mid-execution AO drift sweeps (4 commits + bulk count sweep + broken-link fix) | DONE (`1073904`, `e4c7953`, `82df702`, `756df6c`, `197d352`, `80f549c`) |
| Phase 1 Task 3: Verify site output | DONE-PARTIAL (build clean locally: 341 pages, 354 HTML in Pagefind, mermaid transforms clean; PENDING `npm run preview` browser spot-check) |
| Phase 1 Task 4: Run pre-tag-validate bundle on spike branch | DONE (all 27 enforcing validators PASS) |
| Phase 2 Task 5: Pre-merge rebase + re-build + re-validate | PENDING |
| Phase 2 Task 6: Merge spike PR #147 to main + CI green + deploy verified | PENDING |
| Phase 3 Task 8: Verify 0 open Dependabot alerts on main (post-merge) | PENDING |
| Phase 3 Task 9: Refresh backlog-canonical + finalize plan continuity | IN PROGRESS (CHANGELOG + Release notes + v2.17 stub + this plan updated 2026-05-17 evening; backlog refresh pending) |

### Estimated remaining

Phase 1 COMPLETE locally on the spike branch as of 2026-05-17 evening. Remaining work:

- Phase 2 Task 5 + Task 6: rebase spike on main, re-run validators, merge PR #147 (~0.5 session)
- Phase 3 Task 8 + Task 9: verify 0 open Dependabot alerts post-merge; finish backlog-canonical refresh (~0.25 session)
- Conductor dry-run rehearsal: `/release v2.16.0 --dry-run` once spike merged (per user briefing handoff)

Phase 1 originally scoped at 1-2 sessions; actually consumed one dedicated session that absorbed 9 mid-execution defects per DM7 + DM8: workflow list correction; YAML defect; Layer 1 + Layer 2 MCP CI hygiene; 4 AO drift sweeps (generator regen, AGENTS.md sync, landing-page counts, doc descriptions truncation); bulk count update across 20 files; broken-link fix + generator hardening. All bounded one-shot remediations; no architectural blockers surfaced.

---

## Prerequisites

- [x] v2.15.0 tagged (HEAD `a108301`)
- [x] Astro 5.13.x baseline known-good (verified by current CI passing on every PR)
- [x] 2 open Dependabot alerts identified: #10 (XSS in define:vars, patch 6.1.6) and #16 (server-island encrypted parameters replay, patch 6.1.10)
- [x] astro-mermaid 2.0.1 known-good on Astro 5.13.x
- [ ] Subagent integration plan Phase 1 complete (recommended; the conductor's G0 verifies Astro build cleanly before tag)

---

## Scope

This plan covers:

- package.json: astro `^5.18.1` to `^6.x.x`
- package.json: engines.node `>=22.0.0 <23` to `>=22.12.0`
- astro-mermaid: verify against Astro 6; upgrade to its own latest if needed
- Custom CSS classes: inventory, identify breakage, port to Astro 6 conventions
- 5 CI workflows on Node 22.12+ (reality list, per execution-time audit 2026-05-17 below):
  - `validation.yml` (Astro/Starlight build + 27 enforcing validators)
  - `deploy-pages.yml` (GitHub Pages deploy)
  - `validate-plugin.yml` (plugin manifest + ZIP packaging)
  - `validate-mcp-sync.yml` (cross-repo MCP sync)
  - `create-issues-from-drafts.yml` (issue-drafts processor)
- Close Dependabot alerts #10 and #16
- Verify Astro build produces page count >= v2.15.0 build (no page regressions)
- Verify all 27 enforcing validators green on the upgraded build (was 24 at plan-authoring time; +3 from v2.15.1 carry-in)
- Update `docs/internal/backlog-canonical.md` with the closed deferrals

### Workflow list correction (execution-time audit 2026-05-17)

This plan originally listed 5 workflows for the Node bump: Validation, Deploy to Pages, CodeQL, Validate Plugin, sync-agents-md. Audit at execution time found 3 of those 5 do NOT use `setup-node`:
- `codeql.yml` uses CodeQL's auto-toolchain (no setup-node)
- `sync-agents-md.yml` is pure-bash and currently DISABLED (workflow_dispatch + dry-run gate per v2.14.x V7 + v2.14.2)
- `release.yml` + `release-zips.yml` are pure-bash (never in the original plan list either)

And 2 Node-using workflows the original plan did NOT list:
- `create-issues-from-drafts.yml` (issue-drafts processor; setup-node@v6 + npm install)
- `validate-mcp-sync.yml` (cross-repo MCP sync; setup-node@v5 + npm ci)

Corrected reality list above. Commit `ed3621b` bumps the 5 reality-list workflows; the codeql + sync-agents-md + release plan-listed entries are vacated.

### Mid-execution scope additions (2026-05-17)

The spike CI surfaced 3 pre-existing defects that bounded remediations are absorbing into the doc-stack track. None were in the original 9-task plan; each is captured below with rationale.

1. **YAML parse defect in dispatch-skill EXAMPLE.md** (commit `3fcf7af`)
   - `skills/utility-pm-release-conductor/references/EXAMPLE.md` had unquoted colons in its `description:` frontmatter value, breaking `lint-skills-frontmatter.{sh,ps1}` on every PR/push.
   - Surfaced by spike CI run because spike's workflow yml edits triggered path-filtered `validate-plugin.yml` which runs the linter.
   - Single-quoted the description value; grep sweep confirmed only this file affected (peer dispatch skills all use safely-quoted descriptions).
   - **Why absorbed here:** v2.16.0 cannot ship while G0 lint-skills-frontmatter is red. Fixing on the spike branch avoids a parallel patch PR.

2. **Layer 1: `validate-mcp-sync.yml` made fully advisory** (commit `6bceac5`)
   - Workflow has been red on every push to main since v2.15.0 (2026-05-16). Embed step hard-fails on `classification: tool` (unknown to MCP catalog frozen at v2.9.2 per M-22). Downstream validator had observe-mode added 2026-05-10 (v2.14.x V9) but the embed hard-fail prevents the validator from ever running.
   - Added `continue-on-error: true` to both steps to complete the M-22 advisory posture.
   - **Why absorbed here:** Spike CI surfaced the failure for the third time in a row; M-22 alignment is small (~3 lines + comments) and closes a known false-positive that would otherwise complicate Phase 2 merge.

3. **Layer 2: pm-skills-mcp `embed-skills.js` softens EMB-004** (pm-skills-mcp PR [#50](https://github.com/product-on-purpose/pm-skills-mcp/pull/50))
   - Cross-repo companion to Layer 1. Adds `'tool'` to `SKILL_CLASSIFICATIONS` (catches up v2.15.0) AND softens EMB-004 to warning for any future unknown classification (future-proof).
   - **Why absorbed here:** Layer 1 alone makes the workflow advisory; Layer 2 makes the embed step actually produce useful output instead of an early termination. Both layers ship together for end-to-end CI hygiene.
   - **Why this breaks M-22 maintenance-only posture:** the user (maintainer) explicitly opted in 2026-05-17, accepting that this embed-script hygiene fix is small enough to justify the cross-repo unfreeze.

This plan does NOT cover:

- Astro 6 feature adoption (e.g., new components, new APIs) - upgrade only, not refactor
- Theme refactor or visual redesign
- Pagefind reindex tuning (existing config carried forward)
- New redirects (existing redirect map carried forward)
- pm-skills-mcp version bump (M-22 still applies; package version stays at 2.9.3 unless a security or critical fix warrants patch)

---

## Ratified Decisions

| # | Decision | Choice |
|---|---|---|
| **DM1** | **Node target** | **Node 22.12+** (minimum Astro 6 supports). NOT Node 24 LTS in v2.16 (separate consideration). |
| **DM2** | **astro-mermaid handling** | Upgrade if needed; check 2.0.1 compatibility first; pin to specific compatible version in package.json. |
| **DM3** | **Custom CSS approach** | Inventory before upgrade; port breaking classes inline with the bump; do NOT do a theme refactor. |
| **DM4** | **Spike branch convention** | `feat/v2.16-astro-6-spike` branch; merge to main only after all validators green and page count verified. Spike branch ALSO carries mid-execution scope additions (DM7, DM8 below). |
| **DM5** | **Dependabot alert closure verification** | Run `gh api 'repos/product-on-purpose/pm-skills/dependabot/alerts?state=open' --jq '. | length'`; expect 0 after merge. |
| **DM6** | **Workflow sync** | All 5 workflows on Node 22.12+ in the spike branch BEFORE Phase 1 Task 4 (CI green gate). Originally sequenced as Phase 3 Task 7; relocated to Phase 1 Task 1a per Codex R02. No staged migration. |
| **DM7** | **Workflow list correction (added 2026-05-17 during Phase 1 Task 1a execution)** | The plan's original workflow list (validation, deploy-pages, codeql, validate-plugin, sync-agents-md) was incorrect: 3 of those don't use setup-node, and 2 Node-using workflows were missing. Reality list (the 5 that actually use setup-node): validation.yml, deploy-pages.yml, validate-plugin.yml, validate-mcp-sync.yml, create-issues-from-drafts.yml. Bumping the reality list; codeql + sync-agents-md + release workflow rows are vacated. See Scope > "Workflow list correction" section for full reasoning. |
| **DM8** | **Mid-execution scope additions (added 2026-05-17)** | Spike CI surfaced 3 pre-existing defects that the spike branch absorbs into the doc-stack track: (a) YAML defect in `utility-pm-release-conductor/references/EXAMPLE.md` (commit `3fcf7af`); (b) Layer 1 CI hygiene in `validate-mcp-sync.yml` (commit `6bceac5`); (c) Layer 2 cross-repo fix in `pm-skills-mcp/scripts/embed-skills.js` (PR #50). Items (a) and (b) ship on the doc-stack spike PR; (c) is a separate pm-skills-mcp PR. Item (c) breaks strict M-22 maintenance-only posture; maintainer explicitly opted in 2026-05-17. See Scope > "Mid-execution scope additions" section for full reasoning. |

---

## File Structure

### Files to modify

**pm-skills repo (this plan's primary scope):**

- `package.json` (astro version + engines.node) — engines.node DONE in commit `ed3621b`; astro version PENDING
- `package-lock.json` (auto-regenerated; pending Astro 6 bump)
- `.github/workflows/validation.yml` (Node 22 to 22.12+) — DONE in commit `ed3621b`
- `.github/workflows/deploy-pages.yml` — DONE in commit `ed3621b`
- `.github/workflows/validate-plugin.yml` — DONE in commit `ed3621b`
- `.github/workflows/validate-mcp-sync.yml` — DONE in commit `ed3621b` (Node bump) + commit `6bceac5` (Layer 1 advisory)
- `.github/workflows/create-issues-from-drafts.yml` — DONE in commit `ed3621b`
- `astro.config.mjs` (only if Astro 6 requires config schema changes) — PENDING
- `src/styles/*.css` (custom CSS classes, only if Astro 6 breaks them) — PENDING
- `src/content.config.ts` (extended docsSchema; only if Astro 6 schema API changed) — PENDING (audit during Phase 1 Task 2)
- `skills/utility-pm-release-conductor/references/EXAMPLE.md` (P1 YAML defect fix per DM8 mid-execution scope) — DONE in commit `3fcf7af`
- `docs/internal/backlog-canonical.md` (refresh closed deferrals) — PENDING (Phase 3 Task 9)
- `docs/internal/release-plans/v2.16.0/plan_v2.16.0.md` (status updates as phases complete) — PENDING (Phase 3 Task 9)
- `docs/internal/release-plans/v2.16.0/doc-stack-modernization-plan.md` (this file; status updates as work proceeds) — IN PROGRESS

**Plan-listed workflows that DON'T need modification per DM7:**

- ~~`.github/workflows/codeql.yml`~~ — uses CodeQL auto-toolchain (no setup-node)
- ~~`.github/workflows/sync-agents-md.yml`~~ — pure-bash and DISABLED (workflow_dispatch + dry-run gate)

**pm-skills-mcp repo (cross-repo per DM8 Layer 2):**

- `scripts/embed-skills.js` — adds `'tool'` to SKILL_CLASSIFICATIONS + softens EMB-004 to warning. DONE on pm-skills-mcp branch `fix/embed-add-tool-classification-soften-unknown` (commit `4dbaccb`); pending merge via PR [#50](https://github.com/product-on-purpose/pm-skills-mcp/pull/50).

### Files to create

- None (pure upgrade work; no new files)

---

## Phase 1: Spike on Feature Branch (5 tasks)

**Goal:** Prove Astro 6 builds with the current site on a feature branch. Identify breakage. Port custom CSS where needed. Verify astro-mermaid renders correctly. **Per Codex R02:** Node 22.12+ workflow bumps must land BEFORE the Astro 6 spike's CI-green gate (Task 4), because Astro 6 cannot pass CI under Node < 22.12. Originally sequenced as Phase 3 Task 7; moved to Phase 1 Task 1a.

### Task 1: Create spike branch and bump Astro

- [ ] Create branch `feat/v2.16-astro-6-spike` from main
- [ ] Update `package.json`:
  - `astro` from `^5.18.1` to `^6.x.x` (latest stable)
  - `engines.node` from `>=22.0.0 <23` to `>=22.12.0`
- [ ] Run `npm install` to regenerate `package-lock.json`
- [ ] Verify `npm run build` produces output (may have errors; capture for Task 2)

**Done when:** branch exists; package.json shows Astro 6; build attempted and output captured.

### Task 1a: Bump Node version in 5 CI workflows on spike branch (relocated from Phase 3 Task 7 per Codex R02) — DONE 2026-05-17 (commit `ed3621b`)

Astro 6 requires Node 22.12+. If the CI workflows still run on Node 22 < 22.12, the spike-branch CI cannot pass and Phase 1 Task 4 (validator suite green) is impossible. This task moves to Phase 1 to land before the CI-green gate.

**Reality list per DM7** (3 of original plan's 5 don't use setup-node; 2 Node-using workflows were missing from plan):

- [x] Update `.github/workflows/validation.yml` to `node-version: '22.12'`
- [x] Update `.github/workflows/deploy-pages.yml`
- [x] Update `.github/workflows/validate-plugin.yml` (also normalized unquoted `22` → quoted `'22.12'`)
- [x] Update `.github/workflows/validate-mcp-sync.yml` (also normalized unquoted `22` → quoted `'22.12'`)
- [x] Update `.github/workflows/create-issues-from-drafts.yml`
- [x] Commit on the spike branch (commit `ed3621b`)

Plan-listed entries vacated per DM7:
- ~~`.github/workflows/codeql.yml`~~ — uses CodeQL auto-toolchain (no setup-node)
- ~~`.github/workflows/sync-agents-md.yml`~~ — pure-bash and currently DISABLED with workflow_dispatch dry-run gate

**Done when:** 5 reality-list workflows specify Node 22.12+ on the spike branch. **STATUS: DONE.**

### Task 1b: Mid-execution YAML defect fix (added 2026-05-17 per DM8) — DONE (commit `3fcf7af`)

Spike CI surfaced a P1 YAML parse defect in `skills/utility-pm-release-conductor/references/EXAMPLE.md` (commit `07fe14e` from v2.16.0-phase-5 shipped unquoted colons in the `description:` frontmatter value).

- [x] Quote the description value in `utility-pm-release-conductor/references/EXAMPLE.md`
- [x] Grep sweep of all `skills/**/{SKILL,TEMPLATE,EXAMPLE}.md` frontmatter for the same anti-pattern (only this file affected)
- [x] Commit on the spike branch (commit `3fcf7af`)
- [x] Verify `validate-plugin` + `validation.yml` lint-skills-frontmatter step pass on the spike PR

**Done when:** lint-skills-frontmatter passes locally and in CI. **STATUS: DONE.**

### Task 1c: Mid-execution MCP CI hygiene fix (added 2026-05-17 per DM8) — Layer 1 DONE; Layer 2 IN PROGRESS

Spike CI surfaced the persistent `validate-mcp-sync` workflow failure that has been red on every push to main since v2.15.0. Two-layer fix:

**Layer 1** (commit `6bceac5` on spike PR):
- [x] Add `continue-on-error: true` to embed step in `.github/workflows/validate-mcp-sync.yml`
- [x] Add `continue-on-error: true` to validate step in the same workflow
- [x] Document M-22 maintenance-mode posture coupling in workflow comments

**Layer 2** (pm-skills-mcp PR [#50](https://github.com/product-on-purpose/pm-skills-mcp/pull/50)):
- [x] Add `'tool'` to `SKILL_CLASSIFICATIONS` in `pm-skills-mcp/scripts/embed-skills.js` (catches up v2.15.0 taxonomy)
- [x] Soften EMB-004 to warning for unknown classifications (future-proof)
- [ ] CI green on pm-skills-mcp PR #50
- [ ] Merge pm-skills-mcp PR #50 to main

**Done when:** both layers landed; `validate-mcp-sync` workflow shows warnings (not hard-fails) in embed step logs on a fresh spike-PR CI run.

### Task 2: Inventory + fix breakage

- [ ] Read Astro 6 migration guide (release notes for 5.x to 6.x major)
- [ ] Capture build errors from Task 1
- [ ] For each error, classify: (a) astro-mermaid issue, (b) custom CSS issue, (c) Astro config schema issue, (d) other
- [ ] **For astro-mermaid:** check 2.0.1 compatibility; upgrade to the latest version that supports Astro 6; document the version in package.json
- [ ] **For custom CSS:** inventory all custom classes in `src/styles/*.css` and templates; identify which ones break under Astro 6; port to Astro 6 conventions inline
- [ ] **For Astro config:** apply minimal config changes per migration guide
- [ ] **For other:** address per error
- [ ] Run `npm run build` again; iterate until green

**Done when:** `npm run build` exits 0 on the spike branch.

### Task 3: Verify site output

- [ ] Compare Astro build page count to v2.15.0 baseline (was 243 pages at v2.14.2; should be 248+ at v2.15.0)
- [ ] Verify page count is >= v2.15.0 baseline (no regressions)
- [ ] Run `npm run preview` and spot-check:
  - Skills index pages (`/skills/`)
  - At least 3 SKILL.md pages render with content + frontmatter
  - At least 1 mermaid diagram renders (use Foundation Sprint or Note-and-Vote diagrams from v2.15.0)
  - Sidebar renders with all sections
  - Search works via Pagefind
  - At least 3 redirect pages resolve (Release_vX.Y.Z paths)
- [ ] Capture page count + verification screenshots in a session log

**Done when:** site renders correctly; page count >= v2.15.0; mermaid renders; sidebar + search + redirects work.

### Task 4: Run validator suite on spike branch

- [ ] Run all enforcing validators against the spike branch:
  - lint-skills-frontmatter
  - validate-commands
  - validate-agents-md
  - check-mcp-impact
  - validate-meeting-skills-family
  - validate-foundation-sprint-skills-family
  - validate-design-sprint-skills-family
  - check-internal-link-validity (strict)
  - validate-docs-frontmatter (strict)
  - check-no-body-h1 (strict)
  - All others in `scripts/` listed as enforcing
- [ ] If any validator fails, classify: Astro-6-related regression vs unrelated drift
- [ ] Fix Astro-6-related regressions; defer unrelated drift to the hygiene plan

**Done when:** all enforcing validators green on the spike branch.

---

## Phase 2: Merge to Main (2 tasks)

**Goal:** Land the Astro 6 upgrade on main with all gates clean.

### Task 5: Pre-merge checks

- [ ] Spike branch CI is green (all GitHub Actions workflows pass)
- [ ] Pull latest main; rebase or merge main into spike branch; resolve any conflicts
- [ ] Re-run `npm run build` after rebase; verify clean
- [ ] Re-run validator suite; verify clean

**Done when:** spike branch is ready to merge; all gates green.

### Task 6: Merge to main

- [ ] Open PR from `feat/v2.16-astro-6-spike` to `main`
- [ ] CI runs; verify all workflows green
- [ ] Self-review the diff: package.json, package-lock.json, any CSS changes, any astro.config.mjs changes
- [ ] Squash or merge (per repo convention)
- [ ] Verify main branch CI green on the merged commit
- [ ] Verify Astro deploy workflow runs and updates production

**Done when:** Astro 6 upgrade landed on main; production site rebuilds cleanly.

---

## Phase 3: Dependabot Closure + Backlog Update (2 tasks)

**Goal:** Verify Dependabot alerts closed after Phase 2 merge. Update backlog. The Node 22.12+ workflow bumps moved to Phase 1 Task 1a per Codex R02.

### Task 7: (relocated) Was "Bump Node version in 5 CI workflows" - now Phase 1 Task 1a per Codex R02

This task slot is intentionally vacated. See Phase 1 Task 1a for the relocated work.

### Task 8: Verify Dependabot alerts closed

- [ ] Run `gh api 'repos/product-on-purpose/pm-skills/dependabot/alerts?state=open' --jq '. | length'`
- [ ] Expected: 0 open alerts
- [ ] If alerts remain open, investigate: alerts may need manual dismiss if Dependabot doesn't auto-detect the patch (rare; usually Dependabot auto-closes on package.json update)
- [ ] For any remaining alerts, file an issue documenting why they cannot close in v2.16 (would need new info)

**Done when:** 0 open Dependabot alerts on origin/main, OR remaining alerts documented as v2.17 deferrals.

### Task 9: Update backlog and master plan

- [ ] Update `docs/internal/backlog-canonical.md`:
  - Mark Astro 6 upgrade item as CLOSED with v2.16.0 reference
  - Mark Node 22.12+ deferral as CLOSED
  - Mark the 2 Dependabot alerts as CLOSED
- [ ] Update `docs/internal/release-plans/v2.16.0/plan_v2.16.0.md`:
  - Mark doc-stack modernization track as COMPLETE
  - Update "Where we are" snapshot with the closed Dependabot count
- [ ] Update this plan's status block to COMPLETE

**Done when:** backlog reflects closed items; master plan reflects track completion.

---

## Acceptance Criteria

Phase 3 closes when:

- [ ] Astro 6.x on main; `npm run build` exits 0
- [ ] All 5 CI workflows on Node 22.12+; all workflows green
- [ ] `gh api 'repos/product-on-purpose/pm-skills/dependabot/alerts?state=open' --jq '. | length'` returns 0
- [ ] Astro build page count >= v2.15.0 baseline
- [ ] astro-mermaid renders diagrams correctly on Astro 6
- [ ] All 24+ enforcing validators green on origin/main
- [ ] Custom CSS classes work (visual spot-check on 5+ representative pages)
- [ ] Backlog refreshed
- [ ] Master plan reflects track completion

---

## Risks

| ID | Risk | Mitigation |
|---|---|---|
| **DM-R1** | **astro-mermaid 2.0.1 incompatible with Astro 6.** | Phase 1 Task 2 checks compatibility upfront. If incompatible, upgrade astro-mermaid OR pin Astro at the highest 5.x that closes Dependabot alerts (if possible) OR defer to v2.17 with reasoning. |
| **DM-R2** | **Custom CSS classes break visibly.** | Phase 1 Task 3 visual spot-check catches this. Phase 2 PR review provides a second checkpoint. |
| **DM-R3** | **Astro 6 config schema changes break astro.config.mjs.** | Phase 1 Task 2 reads migration guide; applies config changes upfront. |
| **DM-R4** | **Page count regressions from Astro 6 routing changes.** | Phase 1 Task 3 baseline comparison catches this. |
| **DM-R5** | **Dependabot alerts don't auto-close after upgrade.** | Phase 3 Task 8 explicitly checks; documents reason for any holdouts. |
| **DM-R6** | **Production site downtime during deploy.** | Astro deploy workflow runs on every push to main; verify successful deploy in Phase 2 Task 6 before declaring complete. Rollback path: revert merge commit. |
| **DM-R7** | **Node 22.12 + Astro 6 introduces unrelated CI flakiness.** | Spike branch validates CI green on multiple runs before merge. Phase 2 Task 5 verifies post-rebase. |

---

## Out of scope for this plan

- Astro 7+ (no current need)
- Node 24 LTS (separate consideration; v2.17+)
- Theme refactor or visual redesign
- New Astro 6 features adoption (content layer migration, new image API, etc.) - separate v2.17+ consideration
- Pagefind v2 (already on v1; defer)

---

## Cross-References

- Master plan: [`plan_v2.16.0.md`](./plan_v2.16.0.md)
- Sibling plans: [`subagents-integration-plan.md`](./subagents-integration-plan.md), [`repo-hygiene-plan.md`](./repo-hygiene-plan.md)
- Astro 5.13.x pin rationale: [`../v2.14.0/plan_v2.14_starlight-migration.md`](../v2.14.0/plan_v2.14_starlight-migration.md) Decision 11
- v2.14 spike report (Astro 6 Node 22.11 hard-fail evidence): [`../v2.14.0/plan_v2.14_starlight-spike-report_2026-05-06.md`](../v2.14.0/plan_v2.14_starlight-spike-report_2026-05-06.md) line 178
- v2.16.0 stub (predecessor): DI3 in the original stub documented the Astro 6 deferral
- Astro 6 release notes: external (read at Phase 1 Task 2 invocation)
- Dependabot alerts: `gh api 'repos/product-on-purpose/pm-skills/dependabot/alerts?state=open'`
- Backlog: [`../../backlog-canonical.md`](../../backlog-canonical.md)

### In-flight PRs (2026-05-17 doc-stack session)

- pm-skills spike PR: [#147](https://github.com/product-on-purpose/pm-skills/pull/147) (DRAFT; doc-stack spike branch with 3 commits: Node bump, YAML fix, Layer 1)
- pm-skills-mcp Layer 2 PR: [#50](https://github.com/product-on-purpose/pm-skills-mcp/pull/50) (cross-repo embed-script fix; M-22 alignment)

### M-22 maintenance-mode posture references

- `project_mcp-maintenance-mode.md` (pm-skills memory; effective 2026-05-04)
- v2.14.x V9 (observe-mode default on validate step; 2026-05-10)
- v2.15.0 ship (classification:tool introduction triggering the EMB-004 cascade; 2026-05-16)
