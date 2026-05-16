# v2.15.0 Release Plan: Sprint Skills Launch + v2.14.x Cleanup

**Status:** Execution in progress (FS family complete; DS family pending)
**Owner:** Maintainers
**Type:** Feature release (minor)
**Created:** 2026-05-11 (scoping); 2026-05-12 (this master plan authored)
**Updated:** 2026-05-15 (progress snapshot + post-audit cleanup)

---

## Where We Are (snapshot 2026-05-15, HEAD `ce2acae`)

**Foundation Sprint track**: 19 of 21 plan tasks shipped. Family is functionally complete and shippable - 7 skills + standalone + workflow + 8 commands + 8 Brainshelf samples + family contract + family validator + concept doc + user guide all live on origin/main. Remaining: Tasks 17-18 (Storevine + Workbench library samples; optional for coverage) and Task 21 (Phase 7 final validation + smoke test).

**Design Sprint track**: Not started. All prerequisites met (FS validators + tool-note-and-vote + tool classification all live). 20 tasks across 7 phases pending.

**v2.14.x cleanup track**: 2 of 3 tasks done. Task 1 (Node 22 bump on 3 workflows) shipped `0d9af62`; Task 3 (Dependabot bump - added mid-cycle) shipped `7a099b4`, closed 15 of 17 alerts. Task 2 (AGENTS/claude/CONTEXT.md per-phase tables refresh) sequenced for post-DS-ship.

**Dependabot state**: 2 alerts open on origin/main (down from 17 pre-cycle). Both require Astro 6.x and are deferred to v2.16 per `plan_v2.16.0.md` DI3.

### What's next (by priority)

1. **Close out Foundation Sprint plan**: run the full validator suite + smoke-test a slash command + hand off to DS plan. This is the final phase of [`foundation-sprint-integration-plan.md`](./foundation-sprint-integration-plan.md) (Phase 7 / Task 21 in that doc). ~1 hour. Closes the FS integration plan entirely.
2. **Kick off Design Sprint plan**: author `design-sprint-skills-contract.md`, the family validator pair, and the first DS skill (`tool-design-sprint-readiness`). These are Phases 1-2 of [`design-sprint-integration-plan.md`](./design-sprint-integration-plan.md). ~3-4 hours per session.
3. **Optional FS sample coverage**: 16 additional library samples across two narrative threads (Storevine retail-direction, Workbench debugging-toolchain). Phase 5 Tasks 17-18 of [`foundation-sprint-integration-plan.md`](./foundation-sprint-integration-plan.md). ~5-6 hours total; can run in parallel with DS work; brings sample threads to 3-count parity with the meeting-skills precedent.
4. **CONTEXT.md refresh**: AGENTS/claude/CONTEXT.md per-phase tables refresh to the final v2.15.0 catalog. Sequenced for after DS family ships so the refresh reflects all 55 skills in one pass. Tracked as Task 2 in [`v2.14.x-deferrals-cleanup-plan.md`](./v2.14.x-deferrals-cleanup-plan.md). ~1.5 hours.
5. **Pre-tag artifact pass**: CHANGELOG entry, plugin.json + marketplace.json version bumps, `docs/releases/Release_v2.15.0.md`, skills-manifest.yaml authoring, optional Codex adversarial review, annotated tag, GitHub Release. See [Release-Time Checklist](#release-time-checklist) below for the full list. ~1-2 sessions.

### Estimated remaining

8-11 sessions to v2.15.0 tag. The FS family is the bigger lift (now done); DS family executes against a proven pattern.

---

## Release Theme

**Sprint Skills Launch.** Ships the first `classification: tool` skills covering Foundation Sprint (Jake Knapp + John Zeratsky's 2-day strategic-alignment workshop) and Design Sprint (Knapp + Zeratsky + Kowitz's 5-day prototype-and-test workshop). 15 new skills (7 Foundation Sprint + 7 Design Sprint + 1 standalone `tool-note-and-vote`) plus 3 workflows, 15 commands, 45 library samples, 2 user guides, 2 concept docs, two family contracts (foundation-sprint-skills + design-sprint-skills), and two family validator pairs. No separate bridge skill: the Foundation-to-Design handoff lives in the `foundation-to-design` workflow doc and in the two user guides, since canonical Knapp/Zeratsky methodology has no formal handoff step.

Bundled alongside: small v2.14.x deferral cleanup (Node 22 upgrade on 3 lagging CI workflows + AGENTS/claude/CONTEXT.md skills-inventory refresh).

Skill count grows from 40 to 55 (+15). Classification taxonomy grows from 3 to 4 (domain / foundation / utility / tool).

## Context

v2.14.0 shipped 2026-05-10 (Doc Stack Migration to Astro Starlight); v2.14.1 and v2.14.2 followed same-day as polish patches. The v2.14.x cycle closed with 4 of 6 originally-listed deferrals closed and 2 remaining (Node 22 bump, CONTEXT.md refresh).

v2.15.0 scoping decided 2026-05-11 in a session that resolved a lingering architectural question from May 10: whether sprint skills should ship as a separate plugin or integrate into pm-skills. The decision was integration (see [Ratified Decisions](#ratified-decisions) below).

v2.15.0 prep complete as of 2026-05-12. Pre-execution review across 6 axes (plan-spec consistency, cross-track coherence, concept doc fidelity, spec completeness, execution sequencing, family contract anchoring) returned 0 P0 / 3 P1 / 5 P2 / 3 P3 findings against the original `classification: sprint` architecture. P1 + P2.1/P2.2 fixes applied to that baseline. Subsequent architectural amendment 2026-05-13 introduced the `tool` classification, split sprint-skills into two families (foundation-sprint-skills + design-sprint-skills), dropped the bridge skill, and reclassified note-and-vote as a standalone `tool`. See pre-execution-review.md Amendment section. Execution can begin against the amended baseline.

### Prerequisites

- [x] v2.14.0 tagged and shipped (done 2026-05-10)
- [x] v2.14.1 tagged and shipped (done 2026-05-10)
- [x] v2.14.2 tagged and shipped (done 2026-05-10)
- [x] Sprint-skills design specs authored and promoted from `_working/` to `efforts/` (commit `9e1042c`)
- [x] Concept docs authored: `docs/concepts/foundation-sprint.md` + `docs/concepts/design-sprint.md` (commit `5b9e590`)
- [x] Pre-execution review complete (commit `0d97209`)
- [x] P1 + P2.1/P2.2 fixes applied to integration plans (commit `5060ec9`)

---

## Sub-Plans

This master plan orchestrates four sub-plans. Each sub-plan owns its own task list, sequencing, and effort estimate.

| Sub-plan | Path | Scope | Tasks | Effort |
|---|---|---|---|---|
| **Foundation Sprint Integration Plan** | [`foundation-sprint-integration-plan.md`](./foundation-sprint-integration-plan.md) | 7 FS skills + tool-note-and-vote standalone skill + lint validator extension + family validator pair + foundation-sprint-skills contract + workflow + commands + 24 samples + guide + concept doc + AGENTS.md | 21 (7 phases) | 8-10 sessions |
| **Design Sprint Integration Plan** | [`design-sprint-integration-plan.md`](./design-sprint-integration-plan.md) | 7 DS skills + 2 workflows + design-sprint-skills contract + design-sprint family validator pair + commands + 21 samples + guide + concept doc + AGENTS.md + version bump + CHANGELOG | 17 (7 phases) | 8-10 sessions |
| **v2.14.x Deferrals Cleanup Plan** | [`v2.14.x-deferrals-cleanup-plan.md`](./v2.14.x-deferrals-cleanup-plan.md) | Node 22 bump on 3 workflows + AGENTS/claude/CONTEXT.md skills-inventory refresh | 2 (2 phases) | ~2 hours |
| **Pre-Execution Review** | [`pre-execution-review.md`](./pre-execution-review.md) | 6-axis review of plans and specs; findings doc + 2026-05-13 amendment for tool-classification refactor | n/a (review artifact) | done |

Total executable scope: 40 tasks, 16-22 sessions including cleanup. Foundation Sprint plan executes first (owns shared infrastructure plus the `tool` classification validator changes); Design Sprint plan executes second (assumes Foundation Sprint complete; ships its own family contract and validator). The Foundation-to-Design transition lives in the `_workflows/foundation-to-design.md` workflow doc and the two user guides; no separate bridge skill.

## Source Material

The sub-plans reference these authoring sources:

- [`docs/internal/efforts/foundation-sprint-skills/foundation-sprint-design-spec.md`](../../efforts/foundation-sprint-skills/foundation-sprint-design-spec.md) - skill-by-skill content authority for Foundation Sprint
- [`docs/internal/efforts/design-sprint-skills/design-sprint-design-spec.md`](../../efforts/design-sprint-skills/design-sprint-design-spec.md) - skill-by-skill content authority for Design Sprint
- [`docs/internal/efforts/foundation-sprint-skills/foundation-sprint-detailed-guide-pm-skills.md`](../../efforts/foundation-sprint-skills/foundation-sprint-detailed-guide-pm-skills.md) - confidence-tagged synthesis from canonical sources (Click book, Character Foundation Sprint guide, Lenny's introduction, Design Sprint Academy)
- [`docs/internal/efforts/design-sprint-skills/design-sprint-detailed-guide-pm-skills.md`](../../efforts/design-sprint-skills/design-sprint-detailed-guide-pm-skills.md) - confidence-tagged synthesis from canonical sources (Sprint book, GV Design Sprint guide, Character Design Sprint guide, Google Design Sprint Kit)
- Plugin-based architecture archived to `_archived/` subfolders in each effort folder (with `sprint-skills-plugin_` prefix) for historical reference

---

## Ratified Decisions

| Decision | Answer | Source |
|---|---|---|
| **Version** | **v2.15.0** (minor) | New classification + skills = new capability |
| **Architecture** | Integrate into pm-skills under `classification: tool` (new classification value); no separate plugin or repo | Decided 2026-05-11 (integration); refined 2026-05-13 (tool classification); see project memory `project_v2.15-tool-classification-decisions.md` |
| **`tool` classification meaning** | Named, externally-sourced methodology composed of multiple skills working as a system. Foundation Sprint and Design Sprint are the first inhabitants; future candidates include JTBD, Double Diamond, Shape Up, OKRs-process. | Architectural amendment 2026-05-13 |
| **Skill prefix = classification** | All sprint skills use `tool-` prefix: `tool-foundation-sprint-*`, `tool-design-sprint-*`, `tool-note-and-vote`. Preserves the existing repo convention (prefix=classification) across all 55 skills. | Architectural amendment 2026-05-13 |
| **Both tracks ship in one tag** | v2.15.0 contains both Foundation Sprint and Design Sprint; single CHANGELOG entry | Decided 2026-05-11 D2 |
| **Sequencing** | Foundation Sprint executes first (owns the `tool` classification validator extensions + tool-note-and-vote); Design Sprint executes second | Decided 2026-05-11 D2 |
| **Family structure** | Two families: `foundation-sprint-skills` (7 members) and `design-sprint-skills` (7 members). Each gets its own contract and validator pair. `tool-note-and-vote` is a standalone tool, NOT a family member. | Architectural amendment 2026-05-13 |
| **Family contract location** | Two files: `docs/reference/skill-families/foundation-sprint-skills-contract.md` and `docs/reference/skill-families/design-sprint-skills-contract.md`. Matches existing meeting-skills-contract.md convention. | Architectural amendment 2026-05-13 (supersedes original single-contract decision) |
| **Family registration** | Two entries in `docs/reference/skill-families/_registry.yaml` (foundation-sprint-skills and design-sprint-skills); FS plan registers FS family with its 7 members; DS plan registers DS family with its 7 members | Architectural amendment 2026-05-13 |
| **Bridge skill** | DROPPED. No `tool-foundation-sprint-to-design` skill. The FS-to-DS transition lives in `_workflows/foundation-to-design.md` and the user guides as narrative content. Reason: not canonical Knapp/Zeratsky methodology. | Architectural amendment 2026-05-13 |
| **Frontmatter convention** | Root-level: `name`, `description`, `classification: tool`, `version`, `updated`, `license`. Metadata-nested: `tool` (value: `foundation-sprint` or `design-sprint`; not present on `tool-note-and-vote`), `category`, `frameworks`, `timebox_minutes`, `roles`, `prerequisites`, `inputs`, `outputs`, `author`. The `sprint_type` and `sprint_move` root fields are dropped; their information is encoded in the skill name + `metadata.tool`. | Architectural amendment 2026-05-13 (supersedes prior fix in commit `5060ec9`) |
| **Prerequisite semantics** | Array of recommended-but-not-required upstream skills; validator does not block; multi-prerequisite OR handled in skill body | Pre-execution review P2.1 fix (commit `5060ec9`); unchanged by amendment |
| **Spec open questions** | All 13 spec open questions ratified in Ratified Decisions sections of both integration plans | Pre-execution review P2.2 fix (commit `5060ec9`); unchanged by amendment |
| **v2.14.x cleanup scope** | 4 of 6 originally-listed Tier 1 deferrals already closed in v2.14.1; 2 remain (Node 22 bump + CONTEXT.md refresh) | Status audit in `v2.14.x-deferrals-cleanup-plan.md` |
| **Node target for 3 lagging workflows** | Node 22 (matches existing `deploy-pages.yml` + `validation.yml`); Node 24 / 22.12+ deferred to v2.16 with Astro 6 upgrade | Decided 2026-05-11 |
| **Tier 2 deferrals to v2.16** | tags-as-feature, URL slug normalization, Astro 6 + Node 22.12+, sync-agents-md.yml full rewrite all deferred | Stub at `docs/internal/release-plans/v2.16.0/plan_v2.16.0.md` |

Re-litigation of any of these decisions requires an explicit plan amendment, not in-skill drift.

---

## Deliverables Overview

### Skills (15 new)

| Track | Skills |
|---|---|
| Standalone tool | `tool-note-and-vote` (decision protocol; standalone, not a family member) |
| Foundation Sprint family (7) | `tool-foundation-sprint-readiness`, `tool-foundation-sprint-brief`, `tool-foundation-sprint-basics`, `tool-foundation-sprint-differentiation`, `tool-foundation-sprint-approach-options`, `tool-foundation-sprint-magic-lenses`, `tool-foundation-sprint-founding-hypothesis` |
| Design Sprint family (7) | `tool-design-sprint-readiness`, `tool-design-sprint-brief`, `tool-design-sprint-map-and-target`, `tool-design-sprint-sketch`, `tool-design-sprint-decide-and-storyboard`, `tool-design-sprint-prototype-plan`, `tool-design-sprint-test-and-score` |

Each skill = SKILL.md + `references/TEMPLATE.md` + `references/EXAMPLE.md` (3 files), so 45 skill files total.

### Workflows (3 new)

- `_workflows/foundation-sprint.md` - chains the 7 FS skills
- `_workflows/design-sprint.md` - chains the 7 DS skills
- `_workflows/foundation-to-design.md` - end-to-end arc (FS workflow + narrative handoff guidance + DS workflow). The FS-to-DS handoff is described narratively here and in the two user guides; no bridge skill artifact.

### Commands (15 new)

One slash command per skill in `commands/` (7 FS + 7 DS + 1 standalone = 15).

### Library samples (45)

Three thread continuations (Brainshelf book-catalog, Storevine retail-direction, Workbench debugging-toolchain), each carrying a complete Foundation Sprint to Design Sprint arc through all 15 skills.

### Infrastructure

- `docs/reference/skill-families/foundation-sprint-skills-contract.md` - foundation-sprint family contract
- `docs/reference/skill-families/design-sprint-skills-contract.md` - design-sprint family contract
- Updated `docs/reference/skill-families/_registry.yaml` - two family registrations
- `scripts/validate-foundation-sprint-skills-family.sh` + `.ps1` - FS family validator pair
- `scripts/validate-design-sprint-skills-family.sh` + `.ps1` - DS family validator pair
- Extended `scripts/lint-skills-frontmatter.sh` + `.ps1` - allow `classification: tool`
- Extended `scripts/validate-agents-md.sh` + `.ps1` - recognize `tool-*` skill directories

### Concept docs (2; already shipped in prep commits)

- `docs/concepts/foundation-sprint.md` (403 lines; commit `5b9e590`)
- `docs/concepts/design-sprint.md` (386 lines; commit `5b9e590`)

### User guides (2)

- `docs/guides/using-foundation-sprint.md`
- `docs/guides/using-design-sprint.md`

### AGENTS.md updates

Sprint-skills section added with all 16 members and brief descriptions.

### v2.14.x cleanup (2 items bundled)

- Node 22 bump on `create-issues-from-drafts.yml`, `validate-mcp-sync.yml`, `validate-plugin.yml`
- AGENTS/claude/CONTEXT.md per-phase tables refreshed to current 40+ skill catalog

---

## Effort Estimate

| Sub-plan | Sessions |
|---|---|
| Foundation Sprint Integration Plan | 8-10 |
| Design Sprint Integration Plan | 7-9 (one less skill than original 8 due to dropped bridge) |
| v2.14.x Cleanup Plan | ~0.5 (folded into FS or DS plan sessions) |
| Pre-tag artifact pass (CHANGELOG, release notes, version bump, skills-manifest) | 1 |
| **Total** | **16-21 sessions** |

---

## Release-Time Checklist

Author and complete at the end of execution, before tagging v2.15.0:

- [ ] All 40 sub-plan tasks marked complete
- [ ] All FS family skills pass `validate-foundation-sprint-skills-family.sh` (Bash + PowerShell parity)
- [ ] All DS family skills pass `validate-design-sprint-skills-family.sh` (Bash + PowerShell parity)
- [ ] All standard validators pass on `main` (`lint-skills-frontmatter`, `validate-commands`, `validate-agents-md`, `validate-meeting-skills-family`, `validate-docs-frontmatter`, `check-no-body-h1`, `check-internal-link-validity`)
- [ ] CONTEXT.md skills inventory refresh complete (v2.14.x cleanup Task 2)
- [ ] AGENTS.md regenerated and synced
- [ ] Plugin manifest updates: bump `.claude-plugin/plugin.json` to `2.15.0` and update description with sprint-skills addition
- [ ] Marketplace manifest update: bump `.claude-plugin/marketplace.json` to `2.15.0`
- [ ] CHANGELOG.md `[Unreleased]` populated and renamed to `[2.15.0] - YYYY-MM-DD`
- [ ] `docs/changelog.md` mirrors CHANGELOG.md v2.15.0 entry
- [ ] `docs/releases/Release_v2.15.0.md` authored (TL;DR + what changed + counts + deferrals)
- [ ] `docs/index.mdx` Recent Releases section updated
- [ ] `.claude/pm-skills-for-claude.md` version pointer updated
- [ ] `README.md` shields.io badge and Latest stable version refreshed
- [ ] `skills-manifest.yaml` authored at `docs/internal/release-plans/v2.15.0/skills-manifest.yaml` listing all 16 sprint skills at their initial version
- [ ] AGENTS/claude/CONTEXT.md Status block refreshed with v2.15.0 ship details
- [ ] Astro build PASS locally and via CI
- [ ] All production URLs verified 200 (home, /reference/, /samples/, /releases/Release_v2.15.0/, plus 2 concept docs and 2 user guides)
- [ ] Optional: Codex adversarial review pass (matches v2.14.x two-pass review pattern)
- [ ] Annotated tag `v2.15.0` created and pushed
- [ ] GitHub Release published from `docs/releases/Release_v2.15.0.md`

---

## Outstanding Tracking

### From pre-execution review

- 5 P2 findings folded into their relevant phases during execution (P2.3 workflow craft-time notes, P2.4 sample attribution math, P2.5 category taxonomy, P3.1 sample effort sizing, P3.3 validator naming redundancy)
- 3 P3 findings are awareness only

### From this session's prep work

- 5 prep commits (`9e1042c`, `5b9e590`, `0d97209`, `5060ec9`, `65bd14d`) live on origin/main; the 2026-05-13 architectural amendment lands as a separate refactor commit covering tool classification, two-family structure, dropped bridge, and tool-note-and-vote rename

### From v2.16 stub

- 4 carried-forward deferrals already documented in `docs/internal/release-plans/v2.16.0/plan_v2.16.0.md`; no action this release

---

## Self-Review Notes

This master plan was authored 2026-05-12 after the pre-execution review and P1+P2 fixes were complete, so it captures the locked-down state of v2.15.0 prep work. Future amendments to this plan reflect mid-execution discoveries; the Ratified Decisions table above does not change without explicit cross-reference.

Pattern adherence:

- Master plan + sub-plans structure matches v2.11.0 and v2.14.0 precedent.
- `skills-manifest.yaml` deferred to tag time (per v2.7.0 governance doc and v2.11/v2.14 precedent).
- CHANGELOG `[Unreleased]` batch-populated near tag time (per v2.14 cycle pattern); not populated during execution per-commit.
- Release-time checklist mirrors v2.14.0 W13 B4 + FU1 sweep structure.

This plan is the source of truth for v2.15.0 release-cycle progress. If a sub-plan task list and this master plan disagree, the sub-plan wins for execution detail; this plan wins for scope, theme, and ratified decisions.
