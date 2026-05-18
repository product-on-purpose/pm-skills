---
title: Reaudit of docs/internal/efforts/ - Delta Since 2026-05-12
description: Delta audit of the efforts folder and adjacent surfaces, 4 days after the 2026-05-12 baseline audit. v2.15.0 + v2.15.1 shipped in the interval. The headline finding - 15 new skills landed on disk with zero new effort briefs - confirms that the effort-brief system has been fully bypassed in practice, even as the maintainer's own audit/README.md still describes it as the canonical per-skill surface.
date: 2026-05-16
status: published
audience: pm-skills maintainers
type: delta audit
predecessor: 2026-05-12_audit_efforts-folder-state.md
companions:
  - 2026-05-12_recommendation_efforts-operating-model.md
  - 2026-05-12_playbook_efforts-migration.md
---

# Reaudit of docs/internal/efforts/ - Delta Since 2026-05-12

**Date observed**: 2026-05-16, 8pm PDT, against main at HEAD `6f89439` (v2.15.1 post-tag patch)
**Predecessor audit**: `2026-05-12_audit_efforts-folder-state.md` (committed in `9006905`, renamed to date-first)
**Scope**: delta only. The previous audit's full inventory remains valid for items it covered; this doc reports what changed in 4 days.
**Out of scope**: recommendations (see the unchanged `2026-05-12_recommendation_efforts-operating-model.md`); migration (unchanged `2026-05-12_playbook_efforts-migration.md`).

## Claim-type legend (carried from predecessor)

- **[VERIFIED]**: read the source directly. Fact.
- **[DERIVED]**: computed via grep / diff / comparison. Fact contingent on the primary source.
- **[UNCERTAIN]**: most likely interpretation; needs maintainer confirmation.

---

## 1. The headline delta

[VERIFIED via `ls skills/` and git log between 2026-05-12 and 2026-05-16]

| Metric | 2026-05-12 | 2026-05-16 | Delta |
|--------|------------|------------|-------|
| Shipped skills on disk | 40 | 55 | **+15** |
| Effort briefs in `efforts/` | 46 | 46 | **0** |
| Effort briefs with `Status: shipped` | 7 | 7 | **0** |
| Skills with no effort brief | 5 | 20 | **+15** |
| `Status:` field values in use | 12 distinct | 12 distinct | **0** |
| Folders in `initiatives/` | 0 (folder absent) | 0 (folder absent) | **0** |
| Files in `skills-published/` | 0 | 0 | **0** |
| Subfolders in `skills-ideas/` | 3 | 3 | **0** |
| Releases tagged in interval | 0 | 2 (v2.15.0, v2.15.1) | **+2** |

**[DERIVED]** The most acute signal: the ratio of "shipped skills with no effort brief" went from 5 of 40 (13%) to 20 of 55 (36%). The effort-brief system now misses one in three skills on disk.

---

## 2. What shipped in the interval

[VERIFIED via `git log --since="2026-05-12"` and skills directory comparison]

### 2.1 v2.15.0 - Sprint Skills Launch (tagged on `a108301` or near it)

15 new skills under the new `tool` classification:

**Foundation Sprint family (7)**:
- tool-foundation-sprint-readiness
- tool-foundation-sprint-basics
- tool-foundation-sprint-brief
- tool-foundation-sprint-magic-lenses
- tool-foundation-sprint-approach-options
- tool-foundation-sprint-differentiation
- tool-foundation-sprint-founding-hypothesis

**Design Sprint family (7)**:
- tool-design-sprint-readiness
- tool-design-sprint-brief
- tool-design-sprint-map-and-target
- tool-design-sprint-sketch
- tool-design-sprint-decide-and-storyboard
- tool-design-sprint-prototype-plan
- tool-design-sprint-test-and-score

**Standalone (1)**:
- tool-note-and-vote

Plus 3 new workflows (`foundation-sprint`, `design-sprint`, `foundation-to-design`).

### 2.2 v2.15.1 - same-day post-tag remediation

[VERIFIED via HEAD commit `6f89439`]

Added 4 new CI validator scripts:
- `check-agents-md-command-sync.{sh,ps1,md}`
- `check-landing-page-counts.{sh,ps1,md}`
- `check-workflow-generator-coverage.{sh,ps1,md}`
- `pre-tag-validate.{sh,ps1,md}`

Plus a new `audit_v2.15.x_post-tag-self-review.md` at `release-plans/v2.15.x/`, fixed counts on landing pages, fixed a generator bug, added `docs/concepts/sprint-skills-overview.md`.

### 2.3 What did NOT happen during this work

[DERIVED from absent file additions]

- **Zero new effort briefs**. No `F-43-*.md`, `F-44-*.md`, `M-25-*.md`, etc.
- **Zero updates to existing effort briefs**. The 11 verifiably-stale briefs from the predecessor audit are unchanged.
- **Zero migrations of `skills-ideas/foundation-sprint/` and `skills-ideas/design-sprint/`**. These shipped via v2.15.0 but the discovery folders are still under `skills-ideas/`, not `skills-published/`.
- **Zero scaffolding of `initiatives/`**. The folder still does not exist.
- **Zero `skills-published/` content**. Folder still empty.
- **Zero adoption of the 2026-05-12 recommendation doc decisions** (D1 through D12) or the playbook phases.

---

## 3. Briefs that transitioned from "in flight" to "stale shipped" in 4 days

[VERIFIED via cross-check of brief Status field with skills/ directory and v2.15.0 release plan]

| Brief | 2026-05-12 verdict | 2026-05-16 verdict | Reason |
|-------|---------------------|---------------------|--------|
| F-41-design-sprint-skills | Stale (execution moved to release plan) | Stale (shipped); brief still says `Backlog (Stub)` | All 7 tool-design-sprint-* skills shipped in v2.15.0 |
| F-42-foundation-sprint-skills | Stale (execution moved to release plan) | Stale (shipped); brief still says `Backlog (Stub)` | All 7 tool-foundation-sprint-* skills + tool-note-and-vote shipped in v2.15.0 |

[DERIVED] These are the freshest evidence the maintainer can show that effort briefs do not survive contact with active development. Both briefs say `Backlog (Stub)` while the work is live in main and shipping a public release.

[VERIFIED] The brief subfolders `efforts/foundation-sprint-skills/` and `efforts/design-sprint-skills/` now contain a `samples/` subfolder added during the v2.15.0 cycle. The execution artifacts (workflow plan, samples) live mixed with the original design specs in the same folder.

---

## 4. Updated verdict counts for the 46 briefs

[DERIVED via the previous audit table extended for F-41/F-42 transition]

| Verdict | 2026-05-12 | 2026-05-16 | Delta |
|---------|------------|------------|-------|
| Matches (brief reflects state) | 11 | 11 | 0 |
| Stale (shipped, brief says non-shipped) | 11 | 13 | **+2** (F-41, F-42) |
| Open backlog (no deliverable; status appropriate) | 11 | 11 | 0 |
| Uncertain (cannot verify) | 9 | 9 | 0 |
| Stale (execution elsewhere; was stub) | 2 | 0 | **-2** (reclassified to "stale shipped") |
| Non-standard status value (overlaps with stale) | 3 | 3 | 0 |

[DERIVED] 13 of 46 briefs (28%, was 24%) are demonstrably stale. The drift increases monotonically because nothing is sweeping it.

---

## 5. Skills with no effort brief: full list as of 2026-05-16

[DERIVED via comparison of `skills/` against `efforts/`]

Of 55 shipped skills, 20 have no `F-XX-*.md` brief:

**Older skills with no brief (5, unchanged from predecessor)**:
- utility-pm-skill-builder (F-05; canonical-only)
- utility-mermaid-diagrams (F-16; canonical-only)
- utility-slideshow-creator (F-19; canonical-only)
- foundation-okr-writer (tracked via `skills-ideas/okr-writer/`)
- measure-okr-grader (tracked via `skills-ideas/okr-writer/`)

**New since 2026-05-12 (15, all from v2.15.0)**:
- tool-foundation-sprint-readiness (tracked via release-plan v2.15.0 + `skills-ideas/foundation-sprint/`)
- tool-foundation-sprint-basics (same)
- tool-foundation-sprint-brief (same)
- tool-foundation-sprint-magic-lenses (same)
- tool-foundation-sprint-approach-options (same)
- tool-foundation-sprint-differentiation (same)
- tool-foundation-sprint-founding-hypothesis (same)
- tool-design-sprint-readiness (tracked via release-plan v2.15.0 + `skills-ideas/design-sprint/`)
- tool-design-sprint-brief (same)
- tool-design-sprint-map-and-target (same)
- tool-design-sprint-sketch (same)
- tool-design-sprint-decide-and-storyboard (same)
- tool-design-sprint-prototype-plan (same)
- tool-design-sprint-test-and-score (same)
- tool-note-and-vote (tracked via release-plan v2.15.0)

[DERIVED] All 15 v2.15.0 skills bypassed the effort-brief system entirely. The release plan plus the skills-ideas discovery folder were sufficient. The F-41 and F-42 stubs at the parent level never converted to per-skill briefs.

---

## 6. Where the maintainer's actual workflow lives

[VERIFIED via release-plans, audit folder, and v2.16.0 planning state]

The observed surface for active work in the v2.15.x cycle:

| Surface | Files added during interval | Type of artifact |
|---------|------------------------------|------------------|
| `docs/internal/release-plans/v2.15.0/` | skills-manifest.yaml + 2 integration plans + 1 pre-execution-review + 1 v2.14.x-deferrals-cleanup-plan | release governance |
| `docs/internal/release-plans/v2.15.x/` | 1 audit (`audit_v2.15.x_post-tag-self-review.md`) | post-tag self-review |
| `docs/internal/release-plans/v2.16.0/` | 6 plan files + 4 spec files (pm-changelog-curator, pm-critic, pm-release-conductor, pm-skill-auditor) + subagents-integration-plan | v2.16 scoping |
| `docs/internal/audit/` | 4 files committed in `9006905`: the 2026-05-12 audit set | analytical baseline |
| `docs/internal/efforts/` | 0 files added | (none) |
| `docs/internal/initiatives/` | folder still absent | (none) |
| `docs/internal/skills-published/` | folder still empty | (none) |

[DERIVED] The maintainer's real operating model for v2.15.x and v2.16 planning is: release-plans for cycle-bound execution, audit folder for cross-cycle analytical knowledge. The "audit + plan pair" convention documented in `audit/README.md` (line 26-67) is the model that actually got used. The effort-brief surface has been quietly retired in practice without being retired on paper.

---

## 7. The convention drift in `audit/README.md`

[VERIFIED via reading `docs/internal/audit/README.md` line 64-66]

The audit/README explicitly says:

> "Per-skill work: a new skill ships via an effort doc (`docs/internal/efforts/F-XX-name.md`), not via an audit + plan pair."

This documents the intended role of effort docs. But observed practice contradicts it:

- 15 new skills shipped in v2.15.0 with no F-XX briefs.
- 5 older skills (utility-pm-skill-builder, utility-mermaid-diagrams, utility-slideshow-creator, foundation-okr-writer, measure-okr-grader) also have no F-XX briefs.
- The okr-writer cycle in v2.12.0 used `skills-ideas/okr-writer/` instead.
- The v2.15.0 cycle used `release-plans/v2.15.0/{foundation,design}-sprint-integration-plan.md` instead.

[INFERENCE - high confidence] The README documents the previous convention. The convention shifted in practice between v2.12.0 (when `skills-ideas/` first absorbed a skill cycle) and v2.15.0 (when entire family launches used release-plans). The README has not been updated to match.

[VERIFIED] The README also says (line 71-77):

> "A canonical convention is deferred as of 2026-05-03 pending decision; current files retained as-is to avoid churn... When the canonical convention is decided, update this section and rename existing files in a single dedicated PR."

The 2026-05-12 audit docs were renamed to date-first in `9006905`, effectively making date-first the de facto convention. The audit/README has not been updated to reflect this either.

---

## 8. Symptom counts as of 2026-05-16

[DERIVED from sections above]

1. **Stale Status field**: 13 of 46 briefs demonstrably stale (was 11 of 46). Up 18% in 4 days.
2. **Skills-without-briefs ratio**: 20 of 55 (36%). Was 5 of 40 (13%) in predecessor. Tripled.
3. **Issue: TBD count**: 30 of 46 (65%). Unchanged.
4. **Skills-ideas drift**: 3 of 3 idea subfolders contain skills that have already shipped (okr-writer in v2.12.0; foundation-sprint and design-sprint in v2.15.0). 100% drift in this folder; no skill currently in `skills-ideas/` is actually in discovery.
5. **skills-published vacancy**: 0 of 55 shipped skills have a corresponding `skills-published/` folder.
6. **GH milestone vacancy**: still only `v2.7.0` milestone exists. v2.15.0 and v2.15.1 shipped without milestones; v2.16.0 planning has no milestone.
7. **GH new-wave-issue gap**: F-37 through F-42 still have no GH issue. F-41 and F-42 specifically describe work that has now shipped without ever opening an issue.
8. **Triple-tracking persists for v2.15.0**: the work is tracked in (a) F-41/F-42 brief stubs, (b) `efforts/foundation-sprint-skills/` and `efforts/design-sprint-skills/` design folders, (c) `release-plans/v2.15.0/` integration plans, plus now (d) `skills-ideas/foundation-sprint/` and `skills-ideas/design-sprint/`. Four homes for the same initiative.

---

## 9. Composite picture

[DERIVED, single paragraph]

Between 2026-05-12 and 2026-05-16, the pm-skills repo shipped two releases (v2.15.0 minor, v2.15.1 patch) introducing 15 new skills, 3 new workflows, and 4 new CI validators. Across all this work, zero effort briefs were authored or updated. The effort-brief system documented in `audit/README.md` as the canonical per-skill surface has been bypassed for every skill shipped since v2.12.0. The de facto operating model is now release-plans-for-execution plus audit-folder-for-analysis plus skills-ideas-for-discovery. The recommended three-surface model from the 2026-05-12 recommendation doc (`skills-ideas/`, `skills-published/`, `initiatives/`) is approximately what the maintainer is already doing, except (a) `initiatives/` has not been created, (b) `skills-published/` has not been populated, and (c) shipped ideas are not being migrated out of `skills-ideas/`. v2.16.0 planning is well underway with substantial structure (6 plans + 4 new agent-skill specs); none of that scoping touches the efforts folder. The drift documented in the predecessor audit is monotonically worsening because no sweep has happened.

---

## 10. What changed in the audit folder itself

[VERIFIED via `ls docs/internal/audit/`]

| File | Date prefix | Source |
|------|-------------|--------|
| 2026-05-01_audit_repo-structure.md | original | pre-2026-05-12 |
| 2026-05-03_branches-pr.md | original | pre-2026-05-12 |
| 2026-05-03_ci-audit.md | original | pre-2026-05-12 |
| 2026-05-03_tooling-process.md | original | pre-2026-05-12 |
| 2026-05-12_audit_efforts-folder-state.md | added in `9006905` | my predecessor work |
| 2026-05-12_efforts-folder-operating-model.md | added in `9006905` | my monolith stub |
| 2026-05-12_playbook_efforts-migration.md | added in `9006905` | my predecessor work |
| 2026-05-12_recommendation_efforts-operating-model.md | added in `9006905` | my predecessor work |
| 2026-05-16_audit_efforts-folder-reaudit.md | this doc | new |
| README.md | unchanged | 2026-05-03 |
| _archived/ | unchanged | predecessor location |

[DERIVED] The 2026-05-12 audit set was committed (4 files). All 4 were renamed to date-first prefix. The audit folder's own README still says naming is "deferred" but the date-first rename signals a de facto decision.

---

## 11. What this reaudit does NOT contain

- No new recommendations. The 2026-05-12 recommendation doc and its 12+5 decision blocks are unchanged. If anything, the v2.15.0 evidence strengthens the case for D1 (retire efforts/ as active surface) and D2 (three-surface model).
- No revisions to the migration playbook. The playbook still applies; if executed today it picks up F-41 and F-42 as additional stale-brief targets and adds the 15 new skills to the post-ship-folder backfill scope.
- No new analysis of `audit/README.md` beyond noting the convention drift in §7.
- No prescription about whether to update audit/README.md. That is a maintainer decision.

---

## 12. Suggested response to this delta

[OPINION - the predecessor recommendation doc covers this; here only the deltas that matter]

If the maintainer wants to act on the delta without committing to the full 2026-05-12 operating model:

1. **F-41 + F-42 sweep** (5 minutes): flip frontmatter to `shipped`, append a one-line migration note pointing at `release-plans/v2.15.0/` for execution and `skills-ideas/{foundation,design}-sprint/` for discovery archive. Zero risk; matches what D8 in the recommendation doc proposes for stale briefs.

2. **Update audit/README.md** to reflect what is actually happening (5 minutes): note that effort briefs are no longer authored for per-skill work since v2.12.0; the per-skill discovery surface is `skills-ideas/{slug}/`; the per-skill ship surface is the release plan + (eventually) `skills-published/{slug}/`. This closes the documentation/practice gap noted in §7.

3. **Decide on date-first naming officially** (1 minute): the rename in `9006905` already made it de facto. Updating audit/README §"File naming" closes the loop.

If the maintainer wants to act on the full 2026-05-12 recommendation: see `2026-05-12_recommendation_efforts-operating-model.md` §13 decision table and the `2026-05-12_playbook_efforts-migration.md` phased migration. Nothing in the v2.15.0 evidence changes those documents; if anything it sharpens the case.

End of reaudit.
