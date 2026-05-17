# Doc-Stack Modernization Plan

> **For agentic workers:** Use superpowers:executing-plans to walk this plan task-by-task.

**Goal:** Upgrade Astro 5.13.x to Astro 6.x, bump Node from 22 to 22.12+ across all CI workflows, close the 2 open Dependabot alerts, verify astro-mermaid + custom CSS compatibility under Astro 6, and surface any breakage on a feature branch before merging to main.

**Architecture:** v2.14.0 pinned Astro at 5.13.x because Astro 6's Node 22.12+ requirement was out of v2.14.x scope. The pin documented in `plan_v2.14_starlight-migration.md` Decision 11 explicitly deferred the upgrade to v2.16+. This plan executes that deferral.

**Cross-references:** Master plan at `plan_v2.16.0.md`. Subagent integration plan runs in parallel. Hygiene plan also runs in parallel where independent.

---

## Status

**Plan ACTIVE.** Not yet started. 9 tasks across 3 phases.

### Where we are

| Phase | Status |
|---|---|
| Phase 1: Spike on feature branch | PENDING |
| Phase 2: Merge to main | PENDING |
| Phase 3: Workflow Node bumps + Dependabot closure | PENDING |

### Estimated remaining

2-3 sessions. Phase 1 is the largest unknown: if astro-mermaid breaks or custom CSS classes don't survive Astro 6's default styles, Phase 1 could expand.

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
- 5 CI workflows: Node 22 to Node 22.12+ (Validation, Deploy to Pages, CodeQL, Validate Plugin, sync-agents-md when active)
- Close Dependabot alerts #10 and #16
- Verify Astro build produces page count >= v2.15.0 build (no page regressions)
- Verify all 24+ enforcing validators green on the upgraded build
- Update `docs/internal/backlog-canonical.md` with the closed deferrals

This plan does NOT cover:

- Astro 6 feature adoption (e.g., new components, new APIs) - upgrade only, not refactor
- Theme refactor or visual redesign
- Pagefind reindex tuning (existing config carried forward)
- New redirects (existing redirect map carried forward)

---

## Ratified Decisions

| # | Decision | Choice |
|---|---|---|
| **DM1** | **Node target** | **Node 22.12+** (minimum Astro 6 supports). NOT Node 24 LTS in v2.16 (separate consideration). |
| **DM2** | **astro-mermaid handling** | Upgrade if needed; check 2.0.1 compatibility first; pin to specific compatible version in package.json. |
| **DM3** | **Custom CSS approach** | Inventory before upgrade; port breaking classes inline with the bump; do NOT do a theme refactor. |
| **DM4** | **Spike branch convention** | `feat/v2.16-astro-6-spike` branch; merge to main only after all validators green and page count verified. |
| **DM5** | **Dependabot alert closure verification** | Run `gh api 'repos/product-on-purpose/pm-skills/dependabot/alerts?state=open' --jq '. | length'`; expect 0 after merge. |
| **DM6** | **Workflow sync** | All 5 workflows on Node 22.12+ in the spike branch BEFORE Phase 1 Task 4 (CI green gate). Originally sequenced as Phase 3 Task 7; relocated to Phase 1 Task 1a per Codex R02. No staged migration. |

---

## File Structure

### Files to modify

- `package.json` (astro version + engines.node)
- `package-lock.json` (auto-regenerated)
- `.github/workflows/validation.yml` (Node 22 to 22.12+)
- `.github/workflows/deploy-pages.yml`
- `.github/workflows/codeql.yml`
- `.github/workflows/validate-plugin.yml`
- `.github/workflows/sync-agents-md.yml` (when re-activated; currently dormant per v2.14.x DI4)
- `astro.config.mjs` (only if Astro 6 requires config schema changes)
- `src/styles/*.css` (custom CSS classes, only if Astro 6 breaks them)
- `docs/internal/backlog-canonical.md` (refresh closed deferrals)
- `docs/internal/release-plans/v2.16.0/plan_v2.16.0.md` (status updates as phases complete)

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

### Task 1a: Bump Node version in 5 CI workflows on spike branch (relocated from Phase 3 Task 7 per Codex R02)

Astro 6 requires Node 22.12+. If the CI workflows still run on Node 22 < 22.12, the spike-branch CI cannot pass and Phase 1 Task 4 (validator suite green) is impossible. This task moves to Phase 1 to land before the CI-green gate.

- [ ] Update `.github/workflows/validation.yml` to `node-version: '22.12'` (or latest 22.x patch >= 22.12)
- [ ] Update `.github/workflows/deploy-pages.yml`
- [ ] Update `.github/workflows/codeql.yml`
- [ ] Update `.github/workflows/validate-plugin.yml`
- [ ] Update `.github/workflows/sync-agents-md.yml` if it specifies Node (currently dormant per v2.14.x DI4; bump for future)
- [ ] Commit on the spike branch

**Done when:** 5 workflows specify Node 22.12+ on the spike branch.

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
- v2.16.0 stub (predecessor): DI3 in the original stub documented the Astro 6 deferral
- Astro 6 release notes: external (read at Phase 1 Task 2 invocation)
- Dependabot alerts: `gh api 'repos/product-on-purpose/pm-skills/dependabot/alerts?state=open'`
- Backlog: [`../../backlog-canonical.md`](../../backlog-canonical.md)
