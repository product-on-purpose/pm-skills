---
title: Playbook - Migrate to the New Efforts Operating Model
description: Step-by-step migration tasks, time estimates, and rollback notes. Reads from recommendation_efforts-operating-model_2026-05-12.md. Each phase is independent; you can stop after any phase and the repo is in a coherent state.
date: 2026-05-12
status: draft. Execute only after decisions D1-D12 are made.
audience: pm-skills maintainers
companions:
  - audit_efforts-folder-state_2026-05-12.md
  - recommendation_efforts-operating-model_2026-05-12.md
---

# Playbook - Migrate to the New Efforts Operating Model

**Date**: 2026-05-12
**Prerequisite**: decisions D1-D12 from `recommendation_efforts-operating-model_2026-05-12.md` are made
**Total effort**: about 3-4 hours, spread over 2-3 sessions
**Reversibility**: every phase is reversible up to Phase 4 (the GH Project changes); Phase 4 changes the GH config which has no undo but is non-destructive

## How to read this playbook

Each phase has:
- **Prerequisite decisions**: which D-block(s) from the recommendation must be approved
- **Estimated time**: realistic working time
- **Tasks**: imperative steps
- **After-state check**: how to confirm the phase landed
- **Rollback**: how to undo if you change your mind

You can stop after any phase. The repo will be in a coherent state, just less migrated than the next phase would leave it.

## Pre-flight: confirm prerequisites

Before Phase 1, fill out the decision table at the end of `recommendation_efforts-operating-model_2026-05-12.md`. The playbook below assumes the defaults (all Yes). If you said No or Hybrid to a decision, the phase that depends on it is skipped or modified.

| Phase | Depends on |
|-------|-----------|
| Phase 1: Scaffold the new folders | D2 |
| Phase 2: Sweep stale briefs | D1, D8 |
| Phase 3: Collapse v2.15.0 tracking | D9 |
| Phase 4: GH Issues + Project setup | D3, D4, D6, D7 |
| Phase 5: Migrate new-wave briefs | D2, D5, D10 |
| Phase 6: Lazy `skills-published/` scaffolding | D11 |
| Phase 7: Deferred validators | A1, A2 (these say "don't do yet") |

## Phase 1: Scaffold the new folders

**Prerequisite**: D2 approved.
**Estimated time**: 30 minutes.

### Tasks

1. Create `docs/internal/initiatives/` directory.
2. Create `docs/internal/initiatives/_TEMPLATE.md` with the README schema from D12.
3. Create `docs/internal/skills-ideas/_TEMPLATE.md` with the `idea.md` schema from D10.
4. Create or update `docs/internal/skills-ideas/README.md` documenting: purpose, when to create, what goes in `idea.md`, when to migrate to `skills-published/`.
5. Create `docs/internal/skills-published/README.md` documenting: purpose, when to create, what goes in `backlog.md`, relationship to HISTORY.md.
6. Create `docs/internal/initiatives/README.md` documenting: purpose, when to create, examples of initiatives.
7. Update `docs/internal/efforts/README.md` to mark the folder as historical archive with pointers to the new homes.
8. Update `docs/internal/planning-persistence-policy.md` to include the three new surfaces in the "Durable Tracked Planning Artifacts" list.

### After-state check

```
docs/internal/
  efforts/              <- historical (README updated)
  initiatives/          <- new, with README + _TEMPLATE.md
  skills-ideas/         <- has README + _TEMPLATE.md (folder already existed)
  skills-published/     <- has README (folder already existed)
```

Read each new README from cold; does the purpose make sense in 30 seconds? If yes, phase is done.

### Rollback

`git revert` the commit. No data lost; only README and template files added.

## Phase 2: Sweep stale briefs

**Prerequisite**: D1 + D8 approved.
**Estimated time**: 30 minutes.

### Stale brief inventory (from audit §2.4)

Definitely stale (shipped artifact on disk; brief still says non-Shipped):
- F-13-workflow-expansion (says Active; shipped v2.9.0)
- F-17-meeting-synthesize (says Backlog; shipped v2.11.0)
- F-18-meeting-agenda (says Backlog; shipped v2.11.0)
- F-24-update-pm-skills (says Ready for Implementation; shipped v2.10.0)
- F-25-meeting-brief (says Backlog; shipped v2.11.0)
- F-26-lean-canvas (says In Progress; shipped v2.11.0)
- F-27-meeting-recap (says Backlog; shipped v2.11.0)
- F-28-stakeholder-update (says Backlog; shipped v2.11.0)
- M-13-convention-alignment (says Complete; map to Shipped)
- M-19-bundles-to-workflows (says Active; shipped v2.9.0)
- M-20-docs-count-consistency-ci (says Backlog; shipped v2.9.1)
- M-22-mcp-decoupling (says Backlog; shipped 2026-05-04 as maintenance-mode posture)
- D-05-workflows-guide (says Backlog; shipped v2.9.1)

Uncertain (audit §2.4 found 9 v2.11.0 family adjuncts whose specific deliverables are not separable from the family ship):
- F-29-workflow-meeting-lifecycle
- F-30-meeting-skills-family-adoption-guide
- F-31-pm-skill-validate-family-sample-awareness
- F-32-pm-skill-builder-sample-generation
- F-33-check-sample-standards-ci
- F-34-thread-profiles-reference
- F-35-pm-skill-iterate-sample-regeneration

### Tasks

1. For each "definitely stale" brief above:
   - Edit frontmatter: `Status:` to `shipped`, set `Release:` or `Milestone:` to the actual shipped version
   - Append a new section at the bottom: `## Migration note (2026-05-12)` with one sentence pointing readers at the canonical post-ship surface (the `skills/{name}/` folder, the relevant initiative, the relevant release plan, or HISTORY.md).

2. For each "uncertain" brief: in same session, manually verify against `skills/`, `_workflows/`, and `_NOTES/`. For each:
   - If verified shipped: apply step 1 treatment.
   - If still pending: update frontmatter to whichever of `backlog`, `cancelled`, `superseded` is accurate; add a one-line note explaining current status if non-obvious.

3. For F-03-persona-library-tier0 (issue #109 still open, milestone v2.7.0 stale): decide whether the work is still wanted. If yes, update milestone field; if no, set status to `cancelled` and close issue #109 on GH.

4. Single commit: `chore(efforts): one-time status-sweep on 13 stale shipped briefs`.

### After-state check

Run a grep:
```
grep -l "^Status: Active\|^Status: In Progress\|^Status: Ready for Implementation\|^Status: Complete" docs/internal/efforts/*.md
```
Expected: empty result (or only `Status: Complete` on M-13 if you decide to leave that wording as-is).

### Rollback

`git revert` the commit. Status fields revert.

## Phase 3: Collapse v2.15.0 triple-tracking

**Prerequisite**: D9 approved.
**Estimated time**: 20 minutes.

### Tasks

1. Move `docs/internal/efforts/foundation-sprint-skills/` to `docs/internal/initiatives/sprint-skills/foundation/`. Preserve contents including `_archived/` and `_research/`.
2. Move `docs/internal/efforts/design-sprint-skills/` to `docs/internal/initiatives/sprint-skills/design/`.
3. Create `docs/internal/initiatives/sprint-skills/README.md` describing the cross-family initiative, linking to both child folders.
4. Update `docs/internal/efforts/F-41-design-sprint-skills.md`:
   - Frontmatter: `status: superseded`
   - Body: 2-line "Migration note" pointing at both `initiatives/sprint-skills/design/` (for durable specs) and `docs/internal/release-plans/v2.15.0/design-sprint-integration-plan.md` (for active execution).
5. Same treatment for `docs/internal/efforts/F-42-foundation-sprint-skills.md`.
6. Update any internal links inside `release-plans/v2.15.0/` that point at the old efforts/ paths.
7. Single commit: `chore(efforts): collapse v2.15.0 sprint-skills triple-tracking into initiatives folder`.

### After-state check

- `docs/internal/efforts/foundation-sprint-skills/` does not exist.
- `docs/internal/efforts/design-sprint-skills/` does not exist.
- `docs/internal/initiatives/sprint-skills/{foundation,design}/` exist with the moved contents.
- F-41 and F-42 briefs have superseded status and migration notes.
- Internal links inside release-plans still resolve.

### Rollback

`git revert` the commit. Folders move back; F-41/F-42 fields revert.

## Phase 4: GitHub Issues and Project setup

**Prerequisite**: D3 + D4 + D6 + D7 approved.
**Estimated time**: 60 minutes.

### Tasks - Issues

1. For each open `effort`-labeled issue: verify it has the right label set (`effort`, agent label, category label). Spend about 1 min per issue.

2. For each brief in the audit's "Open backlog" set that has no GH issue: open one. Title: `[F-NN] Effort name` or `[skill-slug] Effort name` (for new slug-style). Body: link to the brief at `docs/internal/efforts/{file}.md` (or `skills-ideas/{slug}/idea.md` after Phase 5). Labels: per existing taxonomy.

   The current open-backlog briefs (per audit §2.4 categorization) needing issues:
   - F-37 html-template-creator
   - F-38 release-skill
   - F-39 find-skills-empirical-test
   - F-40 skill-description-discoverability-audit
   - F-41 (becomes superseded in Phase 3, so skip)
   - F-42 (same)
   - F-36 generic-family-registration-validator (if still wanted)

3. Close any issue whose corresponding brief was marked `shipped` in Phase 2. About 13 issues if all of them had been opened (most don't have issues per the audit; verify before closing).

### Tasks - Project board

4. Navigate to the "Product on Purpose" project at https://github.com/orgs/product-on-purpose/projects (find the URL).

5. Add custom fields:
   - `Status` (single-select): `Idea`, `Scoped`, `Ready`, `In Progress`, `In Review`, `Shipped`, `Cancelled`
   - `Component` (single-select): `meeting-skills`, `sprint-skills`, `sample-automation`, `lifecycle-tools`, `discoverability`, `mcp`, `ci-validation`, `release-tooling`
   - `Priority` (single-select): `P0`, `P1`, `P2`, `P3`
   - `Agent` (single-select): `Claude`, `Codex`, `Human` (optional; mirrors existing labels)
   - `Skill name` (text, optional)

6. Add views:
   - View 1: Kanban by Status, all open issues
   - View 2: By Component, all issues, grouped
   - Optional View 3: By Milestone, for release-cycle planning

7. Add every existing open issue to the board (via `gh project item-add` or the UI). Set Status and Component on each.

8. Create the v2.15.0 milestone on GitHub (since per audit §8.2 there is no current milestone for it). Attach the v2.15.0-targeted issues.

9. Optional: a GitHub Action to auto-add new issues to the Project board. Workflow file at `.github/workflows/auto-add-to-project.yml`. About 15 lines. Skip if manual add is fine.

### After-state check

- All open `effort`-labeled issues are on the Project board with Status and Component set.
- One milestone exists for the current target release.
- Closed issues for shipped briefs are closed.

### Rollback

- Issue label and milestone changes: editable but no automatic revert. Can be undone manually.
- Project board fields: can be deleted from the Project UI. No data loss for issues, but field values on issues are dropped.
- Auto-add workflow: delete the file.

## Phase 5: Migrate new-wave briefs to the new homes

**Prerequisite**: D2 + D5 + D10 approved.
**Estimated time**: 60 minutes (depends on what you keep vs rewrite).

### Per-effort decisions and tasks

| Effort | New home | Action |
|--------|----------|--------|
| F-37 html-template-creator | `initiatives/html-templates/README.md` | Move strategy-brief.md into the initiative folder; rewrite brief as initiative README (initiative spans multiple pilot skills, so not a single-skill idea) |
| F-38 release-skill | `skills-ideas/release/idea.md` | Distill the 200-line brief down to the short idea-template; keep long content as `skills-ideas/release/_LOCAL/scope-draft.md` (gitignored) |
| F-39 find-skills-empirical-test | `initiatives/discoverability/README.md` (with `F-39_test-plan.md` child) | Pair-merge with F-40 because they are joined-at-the-hip |
| F-40 skill-description-discoverability-audit | `initiatives/discoverability/` (with `F-40_audit-plan.md` child) | Same as F-39 |
| F-41 design-sprint-skills | Handled in Phase 3 | None here |
| F-42 foundation-sprint-skills | Handled in Phase 3 | None here |
| F-36 generic-family-registration-validator | `initiatives/ci-validation/README.md` + `family-registration-validator.md` child | Initiative for ci-validation could absorb other future CI work too |

### Tasks

1. For each move: copy the brief into the new location with the new file name, rewrite frontmatter to match the new template.
2. In each new file, add a `Migrated from:` line pointing at the original `efforts/F-XX-*.md` path.
3. In each original `efforts/F-XX-*.md`: set `status: superseded`, add a `Migration note` pointing at the new home (mirror of Phase 3's pattern).
4. Update GH issues (if created in Phase 4) to point at the new path.
5. Single commit: `refactor(efforts): migrate F-36 through F-40 briefs to new homes`.

### After-state check

- New homes have the migrated content.
- Original briefs have `status: superseded` and a migration note.
- GH issues link to new path.

### Rollback

`git revert` the commit. Files revert.

## Phase 6: Lazy `skills-published/` scaffolding

**Prerequisite**: D11 approved.
**Estimated time**: 0 upfront. Created on demand.

### Approach

Do NOT pre-scaffold a `backlog.md` for every shipped skill. Most will start empty and stay empty for a while. Create `skills-published/{name}/backlog.md` the first time you have an item to record for that skill.

### Optional one-time pass

If you want, audit the 40 shipped skills against your own memory: are there any with known iteration backlog you would forget if you don't write it down? Create those files now (probably less than 10 files).

For each:
1. `mkdir docs/internal/skills-published/{slug}`
2. Create `backlog.md` with 1-5 bullets per the D11 schema.

### After-state check

`ls docs/internal/skills-published/` shows the folders for the skills with known backlog.

### Rollback

Delete the folders. No data loss outside the freshly-written bullets.

## Phase 7: Deferred validators (do NOT execute now)

**Prerequisite**: 3+ months of using D2-D4. See anti-recommendations A1, A2 in `recommendation_efforts-operating-model_2026-05-12.md`.

### What this looks like later

When you decide validators are needed:

1. Identify the specific class of drift the validator should catch (do not add speculative validators).
2. Write the script in `scripts/` following the `.sh + .ps1 + .md` convention.
3. Add to `.github/workflows/validation.yml` as advisory first; promote to enforcing once stable.

Candidates if drift recurs:
- `validate-doc-pairing.sh`: each `skills/{name}/` has either `skills-ideas/{name}/` or `skills-published/{name}/`, not both, not neither.
- `validate-initiative-cross-links.sh`: each initiative README's member-skill links resolve.
- `generate-efforts-index.sh`: scans `skills-ideas/`, `skills-published/`, `initiatives/` and renders state by status, component, milestone.

## After-state checks across all phases

A maintainer 3 months from now should be able to:

1. Open a fresh terminal, run `ls docs/internal/`, and immediately understand the 4 surfaces (`efforts/` archive, `skills-ideas/`, `skills-published/`, `initiatives/`).
2. Run `gh project item-list "Product on Purpose"` and see active work organized by Status and Component.
3. Open any brief in `docs/internal/efforts/` and trust the Status field as either `shipped` or `superseded` (not in flight).
4. For any active effort, find a corresponding GH issue with a milestone, labels, and a Project board card.
5. Know exactly where to put a new idea (one of three folders) without asking.

If any of these is not true after the playbook executes, the migration is incomplete.

## Risks and mitigations

| Risk | Mitigation |
|------|------------|
| URL breakage in CHANGELOG / release-plans / session logs | Phase 2 + 5 update frontmatter in place. Only Phase 3 moves files; that's the riskiest phase. Mitigate by grepping for `foundation-sprint-skills/` and `design-sprint-skills/` after Phase 3 and rewriting any internal links. |
| GH Project field config can't be reverted automatically | Phase 4 changes are non-destructive on the issue side. Field values can be deleted but issue data is preserved. |
| Migration leaves orphaned `_LOCAL/` content | Phase 5's `skills-ideas/release/_LOCAL/scope-draft.md` (gitignored) is local-only; no commit risk. |
| Maintainer fatigue mid-migration | Each phase is independent and ends in a coherent state. Stop after any phase. |
| Newest in-flight work (v2.15.0) is disrupted | Phase 3 collapses tracking but does NOT touch the active integration plans. Execution continues unaffected. |

## Effort summary

| Phase | Time | Required for the model to work? |
|-------|------|----------------------------------|
| Pre-flight: decisions | 15 min (review recommendation doc + decision table) | Yes |
| Phase 1: Scaffold | 30 min | Yes |
| Phase 2: Stale-brief sweep | 30 min | Yes |
| Phase 3: v2.15.0 collapse | 20 min | Recommended (otherwise drift persists) |
| Phase 4: GH Issues + Project | 60 min | Yes |
| Phase 5: New-wave migration | 60 min | Yes (or new wave continues to drift) |
| Phase 6: skills-published scaffolding | 0 upfront, lazy | No (lazy) |
| Phase 7: Validators | 0 (deferred) | No |
| **Total upfront** | **~3.5 hours** | |

Can be done in 2-3 sessions of 1-1.5 hours each.

## What to do after the migration lands

1. Adopt the habit: when starting work, open the GH issue. When shipping, close it.
2. After 2-3 weeks of use, revisit the recommendation doc. Anything you said Hybrid or Skip on, is it still the right call?
3. After 3 months, decide whether to revisit A1 (INDEX generator) or A2 (validators) based on whether you observed specific recurring drift.

## What this doc does NOT contain

- The factual audit (in `audit_efforts-folder-state_2026-05-12.md`).
- The reasoning behind each decision (in `recommendation_efforts-operating-model_2026-05-12.md`).
- An execution timeline (you decide when to execute).
- Any commit, push, or release-cycle integration.

End of playbook.
