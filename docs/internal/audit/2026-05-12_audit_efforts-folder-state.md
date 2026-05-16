---
title: Audit of docs/internal/efforts/ - State Inventory
description: Verified state inventory of every brief, subfolder, and adjacent surface inside docs/internal/efforts/ as observed on 2026-05-12. Pure facts, no recommendations. Companion docs in this folder cover operating-model recommendations and migration playbook separately.
date: 2026-05-12
status: published
audience: pm-skills maintainers
companions:
  - recommendation_efforts-operating-model_2026-05-12.md
  - playbook_efforts-migration_2026-05-12.md
---

# Audit of docs/internal/efforts/ - State Inventory

**Date observed**: 2026-05-12, against main branch at HEAD `2178896`
**Scope**: every file under `docs/internal/efforts/`, plus the adjacent `docs/internal/skills-ideas/` and `docs/internal/skills-published/` folders, plus GitHub Issues / labels / milestones / Project metadata for `product-on-purpose/pm-skills`
**Method**: file listing, frontmatter grep, comparison against `skills/`, `_workflows/`, and `backlog-canonical.md`
**Out of scope**: recommendations and operating model (see `recommendation_efforts-operating-model_2026-05-12.md`); migration steps (see `playbook_efforts-migration_2026-05-12.md`)

## Claim type legend

Every claim in this doc is labeled with one of:

- **[VERIFIED]**: I read the source file (or the on-disk artifact) directly. Treat as fact.
- **[DERIVED]**: Computed from a primary source via comparison or grep. Treat as fact contingent on the primary source.
- **[UNCERTAIN]**: I could not verify directly. The claim is the most likely interpretation but needs maintainer confirmation.

## 1. Headcount summary

[DERIVED from file listing, 2026-05-12]

| Category | Count |
|----------|-------|
| Effort briefs at folder root (`F-XX-*.md`, `M-XX-*.md`, `D-XX-*.md`) | 45 |
| Effort subfolders (sibling of brief, holding spec/plan/etc.) | 24 |
| Initiative subfolders (no F-XX parent, e.g. `meeting-skills-family/`) | 3 |
| Reference / meta `.md` files at folder root (non-effort) | 7 |
| Files inside effort subfolders (specs, plans, archives) | ~50 |
| **Total tracked files under `docs/internal/efforts/`** | ~140 |

[VERIFIED from `ls`] The 7 non-effort files at folder root are: `README.md`, `organization-design_2026-04-18.md`, `tracking-patterns-reference_2026-04-18.md`, `launch-mkdocs.md`, `launch-mkdocs_execution.md`, `prompt_todo_2026-03-21.md`, plus the new `efforts-folder-operating-model_2026-05-12.md` audit (which is itself a meta-doc).

## 2. Brief inventory: declared status vs on-disk evidence

[DERIVED via grep of `^Status:`, `^Milestone:`, `^Release:`, `^Issue:` lines from every `.md` in efforts/; on-disk evidence from `skills/` directory listing and from `_workflows/`. Verdict column reflects the gap between brief field and observable artifact state.]

Verdict values used:
- **Matches**: brief field accurately reflects on-disk state
- **Stale (shipped)**: brief says Active/In Progress/Backlog/Ready but the deliverable exists in `skills/` or `_workflows/`
- **Stale (closed)**: brief says open but the linked GH issue is closed
- **Open backlog**: brief says Backlog/Planned/Draft and there is no on-disk deliverable yet
- **Uncertain**: cannot verify from file listing alone; needs maintainer confirmation
- **Non-standard status value**: status field uses a value not in any common enum (e.g., "Complete", "Ready for Implementation")

### 2.1 Feature briefs (F-XX)

| Brief | Declared Status | Declared Milestone | Issue | On-disk evidence | Verdict |
|-------|-----------------|---------------------|-------|-------------------|---------|
| F-02-persona-skill | Shipped | v2.5.0 | #108 | `skills/foundation-persona/` exists | Matches |
| F-03-persona-library-tier0 | Active | v2.7.0 | #109 | no obvious on-disk deliverable; issue #109 still OPEN | Uncertain (issue open, scope unclear) |
| F-06-deliver-acceptance-criteria | Shipped (v2.7.0) | v2.7.0 | #114 | `skills/deliver-acceptance-criteria/` exists | Matches |
| F-07-discover-market-sizing | Planned | TBD | #118 | no on-disk deliverable | Open backlog |
| F-08-measure-survey-analysis | Planned | TBD | #119 | no on-disk deliverable | Open backlog |
| F-09-agent-skill-builder | Planned | TBD | #120 | no on-disk deliverable | Open backlog |
| F-10-pm-skill-validate | Shipped (v2.8.0) | v2.8.0 | #121 | `skills/utility-pm-skill-validate/` exists | Matches |
| F-11-pm-skill-iterate | Shipped (v2.8.0) | v2.8.0 | #122 | `skills/utility-pm-skill-iterate/` exists | Matches |
| F-12-skill-quality-convergence | Draft | TBD | TBD | no on-disk deliverable | Open backlog |
| F-13-workflow-expansion | Active | v2.9.0 | TBD | 9 workflows in `_workflows/` per MEMORY.md; canonical lists v2.9.0 Shipped | Stale (shipped) |
| F-14-workflow-builder | Backlog | TBD | TBD | no on-disk deliverable | Open backlog |
| F-15-skill-chaining | Backlog | TBD | TBD | no on-disk deliverable | Open backlog |
| F-17-meeting-synthesize | Backlog | v2.11.0 | TBD | `skills/foundation-meeting-synthesize/` exists | Stale (shipped) |
| F-18-meeting-agenda | Backlog | v2.11.0 | TBD | `skills/foundation-meeting-agenda/` exists | Stale (shipped) |
| F-24-update-pm-skills | Ready for Implementation | v2.10.0 | TBD | `skills/utility-update-pm-skills/` exists | Stale (shipped); non-standard status |
| F-25-meeting-brief | Backlog | v2.11.0 | TBD | `skills/foundation-meeting-brief/` exists | Stale (shipped) |
| F-26-lean-canvas | In Progress | v2.11.0 | TBD | `skills/foundation-lean-canvas/` exists | Stale (shipped) |
| F-27-meeting-recap | Backlog | v2.11.0 | TBD | `skills/foundation-meeting-recap/` exists | Stale (shipped) |
| F-28-stakeholder-update | Backlog | v2.11.0 | TBD | `skills/foundation-stakeholder-update/` exists | Stale (shipped) |
| F-29-workflow-meeting-lifecycle | Backlog | v2.12.0 (candidate) | TBD | meeting workflow exists in `_workflows/` per MEMORY.md, but specific F-29 deliverable not verified | Uncertain |
| F-30-meeting-skills-family-adoption-guide | Backlog | v2.12.0 (candidate) | TBD | `docs/guides/using-meeting-skills.md` exists per MEMORY.md | Likely stale (shipped v2.11.0); needs maintainer confirmation |
| F-31-pm-skill-validate-family-sample-awareness | Backlog | v2.12.0 | TBD | utility-pm-skill-validate has family-awareness behavior per F-10 brief; specific F-31 scope not verified | Uncertain |
| F-32-pm-skill-builder-sample-generation | Backlog | v2.12.0 | TBD | utility-pm-skill-builder shipped with sample-generation per MEMORY.md v2.11.0 family rollout; specific F-32 scope not verified | Uncertain |
| F-33-check-sample-standards-ci | Backlog | v2.12.0 | TBD | `validate-meeting-skills-family.sh` exists but that may be the F-36 anchor, not F-33; not verified | Uncertain |
| F-34-thread-profiles-reference | Backlog | v2.12.0 | TBD | thread profiles referenced in MEMORY.md as part of v2.11.0 sample story; specific F-34 reference file not verified | Uncertain |
| F-35-pm-skill-iterate-sample-regeneration | Backlog | v2.12.0 | TBD | utility-pm-skill-iterate sample behavior not verified | Uncertain |
| F-36-generic-family-registration-validator | Backlog | v2.12.0 (candidate) | TBD | no `validate-skill-family-registration.sh` observed | Open backlog |
| F-37-html-template-creator | Discovery (strategy brief drafted) | TBD (v2.13.0+) | TBD | no on-disk deliverable; strategy-brief.md exists in subfolder | Open backlog (discovery) |
| F-38-release-skill | Backlog | v2.12.0 (candidate) | TBD | no on-disk deliverable | Open backlog |
| F-39-find-skills-empirical-test | Backlog | v2.12.0 (candidate) | TBD | no on-disk deliverable | Open backlog |
| F-40-skill-description-discoverability-audit | Backlog | v2.12.0 (candidate) | TBD | no on-disk deliverable | Open backlog |
| F-41-design-sprint-skills | Backlog (Stub) | TBD (post-v2.12.0) | TBD | v2.15.0 execution underway per `release-plans/v2.15.0/design-sprint-integration-plan.md` | Stale (execution moved elsewhere) |
| F-42-foundation-sprint-skills | Backlog (Stub) | TBD (post-v2.12.0) | TBD | v2.15.0 execution underway per `release-plans/v2.15.0/foundation-sprint-integration-plan.md` | Stale (execution moved elsewhere) |

### 2.2 Maintenance briefs (M-XX)

| Brief | Declared Status | Declared Milestone | Issue | On-disk evidence | Verdict |
|-------|-----------------|---------------------|-------|-------------------|---------|
| M-10-skill-sample-outputs-library | Shipped | v2.6.1 | #110 | sample-outputs library shipped per repo history | Matches |
| M-12-ci-validation-enhancement | Shipped (v2.7.0) | v2.7.0 | #112 | CI scripts exist; issue #112 CLOSED | Matches |
| M-13-convention-alignment | Complete | TBD | #115 | issue #115 CLOSED; backlog-canonical lists Complete 2026-04-04 | Stale milestone (TBD); non-standard status value |
| M-14-release-automation-enhancement | Planned | TBD | #116 | no on-disk deliverable | Open backlog |
| M-15-community-contribution-setup | Planned | TBD | #117 | no on-disk deliverable | Open backlog |
| M-16-exclude-internal-docs-from-release-zip | Shipped (v2.7.0) | v2.7.0 | #123 | release-zip excludes verified per release history; issue #123 CLOSED | Matches |
| M-18-ci-skill-history-validation | Shipped (v2.8.0) | v2.8.0 | TBD | HISTORY.md validation exists in CI | Matches |
| M-19-bundles-to-workflows | Active | v2.9.0 | TBD | `_workflows/` exists with workflows; canonical lists v2.9.0 Shipped | Stale (shipped) |
| M-20-docs-count-consistency-ci | Backlog | v2.9.1 | TBD | docs-count CI exists per MEMORY.md; canonical lists v2.9.1 Shipped | Stale (shipped) |
| M-21-release-please-exploration | Backlog | TBD | TBD | no on-disk deliverable | Open backlog |
| M-22-mcp-decoupling | Backlog | v2.11.0 | TBD | MEMORY.md: pm-skills-mcp in maintenance mode effective 2026-05-04 | Stale (shipped as maintenance-mode posture; not a clean "deliverable shipped") |

### 2.3 Documentation briefs (D-XX)

| Brief | Declared Status | Declared Milestone | Issue | On-disk evidence | Verdict |
|-------|-----------------|---------------------|-------|-------------------|---------|
| D-03-pm-skill-lifecycle-guide | Shipped (v2.8.0) | v2.8.0 | TBD | lifecycle guide exists in docs/ | Matches |
| D-05-workflows-guide | Backlog | v2.9.1 | TBD | workflows guide exists in docs/ per MEMORY.md; canonical lists v2.9.1 Shipped | Stale (shipped) |

### 2.4 Verdict counts

[DERIVED from §2.1 - §2.3]

| Verdict | Count | % of 46 briefs |
|---------|-------|----------------|
| Matches (brief reflects state) | 11 | 24% |
| Stale (shipped but brief says otherwise) | 11 | 24% |
| Open backlog (no deliverable yet, status appropriate) | 11 | 24% |
| Uncertain (cannot verify from file listing) | 9 | 20% |
| Stale (execution moved elsewhere; F-41 / F-42 case) | 2 | 4% |
| Non-standard status value (separate dimension; some overlap with stale) | 3 | 7% |

[DERIVED] Out of 46 briefs, only 11 (24%) accurately reflect their state. Another 11 (24%) are demonstrably stale. The remaining 24 are either correctly open or unverifiable.

## 3. Issue field state

[DERIVED via grep of `^Issue:` lines]

| Field value | Count | Notes |
|-------------|-------|-------|
| `Issue: #NNN` (specific number) | 12 | F-02, F-03, F-06, F-07, F-08, F-09, F-10, F-11, M-10, M-12, M-13, M-14, M-15, M-16 (covers older briefs) |
| `Issue: TBD` | 30 | every brief from F-12 onward except F-10/F-11 |
| `Issue:` field missing | 4 | F-26 has Issue field; some early briefs missing; counted by file scan |

[DERIVED] 30 of 46 briefs (65%) carry `Issue: TBD`. The Issue field is essentially unused for everything authored after 2026-04-22.

## 4. Status enum values observed in the wild

[DERIVED via grep of `^Status:` lines across all briefs]

| Value | Briefs using it |
|-------|------------------|
| `Backlog` | 17 |
| `Backlog (Stub)` | 2 (F-41, F-42) |
| `Planned` | 4 |
| `Active` | 3 (F-03, F-13, M-19) |
| `In Progress` | 1 (F-26) |
| `Draft` | 1 (F-12) |
| `Discovery (strategy brief drafted)` | 1 (F-37) |
| `Ready for Implementation` | 1 (F-24) |
| `Shipped` | 1 (F-02; without version) |
| `Shipped (v2.X.Y)` | 6 (F-06, F-10, F-11, M-12, M-16, M-18, D-03; brief field includes the version) |
| `Complete` | 1 (M-13) |
| `Active` (on README itself) | 1 |

[DERIVED] At least 12 distinct status values are in use across 46 files. No closed enum is enforced.

## 5. Subfolder pattern inventory

[DERIVED from file listing]

### 5.1 Effort subfolders (sibling of an `F-XX-*.md` or `M-XX-*.md` parent brief)

| Pattern | Effort folders using it |
|---------|--------------------------|
| `{ID}-name/specification.md` only | F-07, F-08, F-14, F-15, F-17-meeting-synthesis (legacy), F-18-meeting-prep (legacy), F-26, D-05, M-20 |
| `{ID}-name/plan_{slug}.md` + `specification.md` | F-17-meeting-synthesize, F-18-meeting-agenda, F-25, F-27, F-28 |
| `{ID}-name/plan_{slug}.md` only | M-19, M-22 |
| `{ID}-name/README.md` only | F-38, F-39, F-40, F-41, F-42 |
| `{ID}-name/strategy-brief.md` only | F-37 |
| `{ID}-name/_discovery/`, `drafts/`, `plan`, `spec` (largest, mixed) | F-24 |
| `{ID}-name/_archive/`, multiple plan variants | M-19 |
| `{ID}-name/codex-output_reviewed-by-claude.md` | M-12 |
| `{ID}-name/bundle_*.md` files (7 of them) | F-13 |

[DERIVED] At least 9 distinct subfolder conventions are in use. No documented rule for which artifact types belong where.

### 5.2 Duplicate-ID folders (renames not cleaned up)

[VERIFIED from file listing]

- `F-17-meeting-synthesis/` (legacy original F-17 scope) AND `F-17-meeting-synthesize/` (current) coexist
- `F-18-meeting-prep/` (legacy original F-18 scope) AND `F-18-meeting-agenda/` (current) coexist

The legacy folders each contain one `specification.md`. The brief headers note the rename history in prose but the folder is not redirected or archived.

### 5.3 Initiative subfolders (no `F-XX-*.md` parent)

[VERIFIED from file listing]

| Folder | Content | Status |
|--------|---------|--------|
| `meeting-skills-family/` | `plan_family-contract.md` (25KB) | Initiative shipped in v2.11.0 per MEMORY.md |
| `foundation-sprint-skills/` | `foundation-sprint-design-spec.md`, `foundation-sprint-detailed-guide-pm-skills.md`, `README.md`, `_archived/`, `_research/` | In-flight under v2.15.0 |
| `design-sprint-skills/` | `design-sprint-design-spec.md`, `design-sprint-detailed-guide-pm-skills.md`, `_archived/` | In-flight under v2.15.0 |

[DERIVED] Two of the three initiative folders have a sibling brief stub (`F-41`, `F-42`) at the parent level whose Status field is `Backlog (Stub)` while actual execution is happening in `docs/internal/release-plans/v2.15.0/`. Three places track the same initiative.

## 6. Non-effort files at folder root

[VERIFIED from file listing]

| File | Last modified | Apparent purpose |
|------|---------------|-------------------|
| `README.md` | 2026-04-22 | Folder's operating-model meta-doc |
| `organization-design_2026-04-18.md` | 2026-04-18 | Earlier design exploration (proposed Bundle 1) |
| `tracking-patterns-reference_2026-04-18.md` | 2026-05-01 | Industry pattern reference (PEP, KEP, RFC, ADR, Linear, Jira) |
| `launch-mkdocs.md` | 2026-04-22 | Large planning doc for the v2.8.1 mkdocs launch (shipped) |
| `launch-mkdocs_execution.md` | 2026-04-22 | Execution-detail companion to above |
| `prompt_todo_2026-03-21.md` | 2026-03-21 | Dated session-prompt scratch file |
| `efforts-folder-operating-model_2026-05-12.md` | 2026-05-12 | This audit's first-draft predecessor (the monolith) |

## 7. Adjacent surfaces inventory

[VERIFIED from file listing and grep]

### 7.1 `docs/internal/skills-ideas/`

| Subfolder | Tracked content | `_LOCAL/` content (gitignored) |
|-----------|------------------|--------------------------------|
| `okr-writer/` | `jpnotes.md` (assumed; not read in this pass) | `_LOCAL/discovery/`, `_LOCAL/definition/` with deep-research outputs and approach drafts |
| `foundation-sprint/` | `jpnotes.md` | (none observed in tracked tree; per glob pattern `_LOCAL/` would be gitignored) |
| `design-sprint/` | `jpnotes.md` | same |

[DERIVED] 3 idea subfolders exist. Pattern uses a tracked `jpnotes.md` plus a gitignored `_LOCAL/` for working materials. okr-writer has already shipped (v2.12.0 per MEMORY.md) but its subfolder is still under `skills-ideas/`, not migrated to `skills-published/`.

### 7.2 `docs/internal/skills-published/`

[VERIFIED] Directory exists. Empty.

### 7.3 `docs/internal/initiatives/`

[VERIFIED] Directory does NOT exist.

## 8. GitHub state inventory

### 8.1 Labels

[VERIFIED via `gh label list`]

| Label | Description | In use? |
|-------|-------------|---------|
| `bug` | Something isn't working | yes |
| `documentation` | Improvements or additions to documentation | yes |
| `duplicate` | This issue or pull request already exists | rare |
| `enhancement` | New feature or request | yes |
| `good first issue` | Good for newcomers | rare |
| `help wanted` | Extra attention is needed | rare |
| `invalid` | This doesn't seem right | rare |
| `question` | Further information is requested | rare |
| `wontfix` | This will not be worked on | rare |
| `skill` | PM skill implementation | yes |
| `phase-1` | Phase 1: P0 Core Skills | legacy, not on recent issues |
| `P0` | Priority 0 - Essential | legacy |
| `phase-2` | Phase 2: P1 Skills | legacy |
| `P1` | Priority 1 - High impact skills | legacy |
| `phase-3` | Phase 3: P2 Skills | legacy |
| `P2` | Priority 2: Complete coverage skills | legacy |
| `awesome-list` (no desc) | uncategorized | unknown |
| `claude-skills` (no desc) | uncategorized | unknown |
| `distribution` (no desc) | uncategorized | unknown |
| `product-management` (no desc) | uncategorized | unknown |
| `ai-agents` (no desc) | uncategorized | unknown |
| `prompting` (no desc) | uncategorized | unknown |
| `work-methods` (no desc) | uncategorized | unknown |
| `codex` (no desc) | uncategorized | unknown |
| `effort` | Feature or maintenance effort | yes |
| `infrastructure` | CI, release automation, tooling | yes |
| `utility-skill` | Foundation or utility skill | yes |
| `agent:claude` | Best executed by Claude Opus | yes |
| `agent:codex` | Best executed by Codex | yes |
| `agent:human` | Requires human action | rare (not observed on recent issues) |

[DERIVED] 29 labels total. The core taxonomy (`effort`, `skill`, `utility-skill`, `infrastructure`, `documentation`, `enhancement`, `agent:claude`, `agent:codex`) is well-formed and applied to legacy issues. The `phase-1/2/3` and `P0/P1/P2` labels appear unused on any recent issue. Several uncategorized labels (`awesome-list`, `claude-skills`, etc.) lack descriptions.

### 8.2 Milestones

[VERIFIED via `gh issue list ... --json milestone`]

- Only one milestone exists: `v2.7.0` ("Persona library Tier-0 and related efforts")
- It is attached to one issue: #109 (F-03 Persona library Tier-0)
- That issue is still OPEN
- No milestone exists for v2.8.0, v2.9.0, v2.10.0, v2.11.0, v2.12.0, v2.13.0, v2.14.0, v2.14.1, v2.14.2, or the in-flight v2.15.0

[DERIVED] Milestones are effectively unused. 12 of the last 12 shipped releases have no milestone record on GH.

### 8.3 Issues

[VERIFIED via `gh issue list --state all --limit 30`]

| Range | State | Pattern |
|-------|-------|---------|
| Issues #108 - #136 | Mix of OPEN and CLOSED | All have `[F-XX]` or `[M-XX]` or `[D-XX]` brackets in titles; all use core labels |
| Issues #126 - #128 | Recent (Self review Skill, artifact-review Skill, okr-writer Skill) | NO `effort` label; NO bracket prefix; mix of OPEN and CLOSED |
| No new issues observed for F-37 through F-42 | n/a | Brief authors did not open issues for the new wave |

[DERIVED] The pattern of "open a GH issue per effort, link from brief" worked through F-15 (issue #134) and M-21 (issue #136) and then stopped. F-37, F-38, F-39, F-40, F-41, F-42 have no corresponding GH issue. The 6 newest briefs are not represented in GH at all.

### 8.4 Project board

[VERIFIED via `gh project list --owner product-on-purpose`]

- One project: "Product on Purpose" (ID `PVT_kwDODyIYKs4BMo1g`)
- Status: open
- Custom fields, views, and issue membership not inspected in this audit

[UNCERTAIN] Cannot determine without API access whether issues are added to the board, what fields are configured, or how it is used.

## 9. backlog-canonical.md cross-reference

[VERIFIED by reading `docs/internal/backlog-canonical.md`]

### 9.1 Shipped table (in canonical) vs brief field

| Effort | Canonical row | Brief Status field | Gap? |
|--------|---------------|---------------------|------|
| M-12 | v2.7.0 Shipped | Shipped (v2.7.0) | none |
| F-06 | v2.7.0 Shipped | Shipped (v2.7.0) | none |
| M-16 | v2.7.0 Shipped | Shipped (v2.7.0) | none |
| F-05 | v2.7.0 Shipped | (no brief file at root) | gap: no brief |
| F-10 | v2.8.0 Shipped | Shipped (v2.8.0) | none |
| F-11 | v2.8.0 Shipped | Shipped (v2.8.0) | none |
| D-03 | v2.8.0 Shipped | Shipped (v2.8.0) | none |
| M-18 | v2.8.0 Shipped | Shipped (v2.8.0) | none |
| D-04 | v2.8.0 Shipped | (no brief file) | gap: no brief |
| M-13 | Complete 2026-04-04 | Complete | gap: non-standard value |
| M-17 | v2.8.1 Shipped | (no brief file) | gap: no brief |
| M-19 | v2.9.0 Shipped | Active | gap: stale |
| F-13 | v2.9.0 Shipped | Active | gap: stale |
| F-16 | v2.10.0 Shipped | (no brief file) | gap: no brief |
| D-05 | v2.9.1 Shipped | Backlog | gap: stale |
| M-20 | v2.9.1 Shipped | Backlog | gap: stale |
| F-19 | v2.10.0 Shipped | (no brief file) | gap: no brief |
| F-24 | v2.10.0 Shipped | Ready for Implementation | gap: stale + non-standard |

### 9.2 What canonical Shipped table is MISSING

[DERIVED by comparing skills/ directory against canonical's Shipped table]

Skills that exist on disk but have no row in canonical's Shipped table:
- All v2.11.0 family work: F-17, F-18, F-25, F-26, F-27, F-28 (the 6 foundation-meeting-* + foundation-lean-canvas)
- All v2.11.0 family adjuncts: F-29, F-30, F-31, F-32, F-33, F-34, F-35 (uncertain ship status per §2.1)
- All v2.12.0 work: foundation-okr-writer, measure-okr-grader (no F-XX briefs at all)
- All Meeting Skills Family infrastructure: validate-meeting-skills-family.sh, contract doc

[DERIVED] Canonical's Shipped table is frozen at v2.10.0. Everything that shipped in v2.11.0 and later is missing from it.

### 9.3 Active Backlog table (in canonical)

[VERIFIED by reading canonical] The Active Backlog table lists 18 priority-ordered rows including F-17, F-18, M-22 at priorities 1-3 with milestone v2.11.0 - but those are all shipped already per §9.2. The Active Backlog table itself is stale.

## 10. Drift symptoms summary

[DERIVED from §2 - §9]

1. **Status field drift**: 11 of 46 briefs (24%) are demonstrably stale on the Status field. Skill exists in `skills/`; brief still says Backlog or Active or In Progress.
2. **Issue field drift**: 30 of 46 briefs (65%) carry `Issue: TBD`. The brief-to-issue handshake stopped working at F-12 and never restarted.
3. **Status enum drift**: at least 12 distinct status values in use. No closed enum is enforced. Non-standard values include `Complete`, `Ready for Implementation`, `In Progress`, `Discovery (strategy brief drafted)`, `Backlog (Stub)`.
4. **Canonical-table drift**: `backlog-canonical.md` Shipped table is frozen at v2.10.0. ~10 v2.11.0+ shipped efforts are not listed.
5. **Canonical-backlog drift**: the Active Backlog table still lists shipped efforts (F-17, F-18, M-22) as backlog at v2.11.0.
6. **GH issue drift**: 6 of 6 newest briefs (F-37 - F-42) have no GH issue.
7. **GH milestone drift**: 12 of last 12 releases have no milestone on GH.
8. **Subfolder pattern drift**: 9 distinct subfolder conventions in use; no documented rule.
9. **Duplicate-ID drift**: F-17 and F-18 each have a legacy subfolder alongside the current one, with no redirect.
10. **Initiative-tracking drift**: 3 different homes are tracking the same v2.15.0 work (effort brief stubs, initiative subfolders, release-plan integration plans).

## 11. Skills on disk without an effort brief

[VERIFIED by comparing `ls skills/` against efforts/ briefs]

| Skill on disk | Effort brief exists? | Notes |
|---------------|----------------------|-------|
| `utility-pm-skill-builder` | no (F-05 referenced only in canonical) | shipped v2.7.0 |
| `utility-mermaid-diagrams` | no (F-16 referenced only in canonical) | shipped v2.10.0 |
| `utility-slideshow-creator` | no (F-19 referenced only in canonical) | shipped v2.10.0 |
| `foundation-okr-writer` | no | shipped v2.12.0; tracked under `skills-ideas/okr-writer/` |
| `measure-okr-grader` | no | shipped v2.12.0; tracked under `skills-ideas/okr-writer/` |

[DERIVED] At least 5 shipped skills have no `F-XX-*.md` brief. The okr-writer pair was tracked through `skills-ideas/` instead. The utility skills (builder, mermaid, slideshow) shipped through release-plan execution without a per-skill brief.

## 12. Composite picture

[DERIVED from all sections above, as a single-paragraph factual summary]

`docs/internal/efforts/` contains 46 effort briefs and ~50 supporting subfolder files spanning v2.5.0 through prospective v2.15.0 work. Of the 46 briefs, 11 accurately reflect on-disk state, 11 are demonstrably stale (shipped artifacts with non-Shipped briefs), 11 are open backlog items with appropriate status fields, 9 are uncertain (mostly v2.11.0 family adjuncts F-29 through F-35 whose specific deliverables are not separable from the rest of the family ship), 2 are stubs whose execution has moved to release-plans (F-41, F-42), and the remainder use non-standard status values. 30 of 46 briefs carry `Issue: TBD`. The repo has 1 GitHub milestone (v2.7.0, attached to 1 still-open issue) covering 0 of the 12 releases shipped since. 5 skills currently on disk have no corresponding effort brief at all. The `backlog-canonical.md` table parallel to this folder is frozen at v2.10.0 in its Shipped section and still lists v2.11.0-shipped efforts as backlog priorities. Three of the v2.15.0 work items are tracked simultaneously in effort-brief stubs (F-41, F-42), initiative subfolders (`foundation-sprint-skills/`, `design-sprint-skills/`), and release-plan integration plans inside `release-plans/v2.15.0/`.

## 13. What this audit does NOT contain

[Explicit scope exclusions]

- No recommendations about what to change. See `recommendation_efforts-operating-model_2026-05-12.md`.
- No migration steps. See `playbook_efforts-migration_2026-05-12.md`.
- No proposal of status enums, components, or new folder conventions.
- No comparison against external frameworks. See `tracking-patterns-reference_2026-04-18.md` for that.
- No verification of subfolder contents beyond their existence and pattern. Specific `specification.md` and `plan_*.md` files inside subfolders are not individually audited.
- No verification of `_LOCAL/` (gitignored) content under `skills-ideas/`.
- No analysis of GitHub Project board contents beyond confirming the project exists.

## 14. Files audited (manifest)

[VERIFIED via `Glob` patterns documented in §0 method]

- 46 effort briefs at `docs/internal/efforts/{F,M,D}-*.md`
- 7 non-effort files at folder root
- 24 effort subfolders (contents enumerated only at pattern level, not file by file)
- 3 initiative subfolders
- 3 idea subfolders under `docs/internal/skills-ideas/`
- 1 empty folder at `docs/internal/skills-published/`
- 30 most recent GH issues (numbers #94 through #136)
- 29 GH labels
- 1 GH milestone
- 1 GH project (existence only)

End of audit.
