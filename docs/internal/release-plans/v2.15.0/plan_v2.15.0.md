# v2.15.0 Release Plan: Sprint Skills Launch + v2.14.x Cleanup

**Status:** Planning complete (2026-05-12); execution starting
**Owner:** Maintainers
**Type:** Feature release (minor)
**Created:** 2026-05-11 (scoping); 2026-05-12 (this master plan authored)
**Updated:** 2026-05-12 (pre-execution review and P1+P2 fixes applied)

## Release Theme

**Sprint Skills Launch.** Ships the first cross-cutting `classification: sprint` skill family covering Foundation Sprint (Jake Knapp + John Zeratsky's 2-day strategic-alignment workshop) and Design Sprint (Knapp + Zeratsky + Kowitz's 5-day prototype-and-test workshop). 16 new skills (8 Foundation Sprint + 8 Design Sprint including 1 bridge skill and 1 shared decision skill) plus 3 workflows, 16 commands, 48 library samples, 2 user guides, 2 concept docs, the sprint-skills family contract, and a new family validator pair.

Bundled alongside: small v2.14.x deferral cleanup (Node 22 upgrade on 3 lagging CI workflows + AGENTS/claude/CONTEXT.md skills-inventory refresh).

Skill count grows from 40 to 56 (+16). Classification taxonomy grows from 3 to 4 (phase / foundation / utility / sprint).

## Context

v2.14.0 shipped 2026-05-10 (Doc Stack Migration to Astro Starlight); v2.14.1 and v2.14.2 followed same-day as polish patches. The v2.14.x cycle closed with 4 of 6 originally-listed deferrals closed and 2 remaining (Node 22 bump, CONTEXT.md refresh).

v2.15.0 scoping decided 2026-05-11 in a session that resolved a lingering architectural question from May 10: whether sprint skills should ship as a separate plugin or integrate into pm-skills. The decision was integration (see [Ratified Decisions](#ratified-decisions) below).

v2.15.0 prep complete as of 2026-05-12. Pre-execution review across 6 axes (plan-spec consistency, cross-track coherence, concept doc fidelity, spec completeness, execution sequencing, family contract anchoring) returned 0 P0 / 3 P1 / 5 P2 / 3 P3 findings. P1 + P2.1/P2.2 fixes applied. Execution can begin against a clean baseline.

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
| **Foundation Sprint Integration Plan** | [`foundation-sprint-integration-plan.md`](./foundation-sprint-integration-plan.md) | 7 FS skills + sprint-note-and-vote shared skill + validators + family contract + workflow + commands + 24 samples + guide + concept doc + AGENTS.md | 21 (7 phases) | 8-10 sessions |
| **Design Sprint Integration Plan** | [`design-sprint-integration-plan.md`](./design-sprint-integration-plan.md) | 7 DS skills + sprint-foundation-to-design bridge skill + 2 workflows + commands + 24 samples + guide + concept doc + AGENTS.md + version bump + CHANGELOG | 18 (7 phases) | 8-10 sessions |
| **v2.14.x Deferrals Cleanup Plan** | [`v2.14.x-deferrals-cleanup-plan.md`](./v2.14.x-deferrals-cleanup-plan.md) | Node 22 bump on 3 workflows + AGENTS/claude/CONTEXT.md skills-inventory refresh | 2 (2 phases) | ~2 hours |
| **Pre-Execution Review** | [`pre-execution-review.md`](./pre-execution-review.md) | 6-axis review of plans and specs; findings doc | n/a (review artifact) | done |

Total executable scope: 41 tasks, 16-22 sessions including cleanup. Foundation Sprint plan executes first (owns shared infrastructure); Design Sprint plan executes second (assumes Foundation Sprint complete).

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
| **Version** | **v2.15.0** (minor) | New skill family = new capability |
| **Architecture** | Integrate into pm-skills under `classification: sprint`; no separate plugin or repo | Decided 2026-05-11; see session log `2026-05-11_18-10_claude_v2.15-sprint-skills-decision-and-plan-org.md` D1 |
| **Both tracks ship in one tag** | v2.15.0 contains both Foundation Sprint and Design Sprint; single CHANGELOG entry | Decided 2026-05-11 D2 |
| **Sequencing** | Foundation Sprint executes first (owns shared infrastructure); Design Sprint executes second | Decided 2026-05-11 D2 |
| **Family contract location** | `docs/reference/skill-families/sprint-skills-contract.md` matches existing skill-families/ convention | Pre-execution review P1.1 fix (commit `5060ec9`) |
| **Family registration** | Append to `docs/reference/skill-families/_registry.yaml` with all 16 members upfront (informational warnings for not-yet-authored members are expected) | Pre-execution review P1.2 fix (commit `5060ec9`) |
| **Frontmatter convention** | Root-level: `name`, `description`, `classification`, `sprint_type`, `sprint_move`, `version`, `updated`, `license`. Metadata-nested: `category`, `frameworks`, `timebox_minutes`, `roles`, `prerequisites`, `inputs`, `outputs`, `author` | Pre-execution review P1.3 fix (commit `5060ec9`) |
| **Prerequisite semantics** | Array of recommended-but-not-required upstream skills; validator does not block; multi-prerequisite OR handled in skill body | Pre-execution review P2.1 fix (commit `5060ec9`) |
| **Spec open questions** | All 13 spec open questions ratified in Ratified Decisions sections of both integration plans | Pre-execution review P2.2 fix (commit `5060ec9`); see FS plan + DS plan Ratified Decisions tables |
| **v2.14.x cleanup scope** | 4 of 6 originally-listed Tier 1 deferrals already closed in v2.14.1; 2 remain (Node 22 bump + CONTEXT.md refresh) | Status audit in `v2.14.x-deferrals-cleanup-plan.md` |
| **Node target for 3 lagging workflows** | Node 22 (matches existing `deploy-pages.yml` + `validation.yml`); Node 24 / 22.12+ deferred to v2.16 with Astro 6 upgrade | Decided 2026-05-11 |
| **Tier 2 deferrals to v2.16** | tags-as-feature, URL slug normalization, Astro 6 + Node 22.12+, sync-agents-md.yml full rewrite all deferred | Stub at `docs/internal/release-plans/v2.16.0/plan_v2.16.0.md` |

Re-litigation of any of these decisions requires an explicit plan amendment, not in-skill drift.

---

## Deliverables Overview

### Skills (16 new)

| Track | Skills |
|---|---|
| Shared | `sprint-note-and-vote` (decision protocol used by both tracks) |
| Foundation Sprint (7) | `foundation-sprint-readiness`, `foundation-sprint-brief`, `foundation-sprint-basics`, `foundation-sprint-differentiation`, `foundation-sprint-approach-options`, `foundation-sprint-magic-lenses`, `foundation-sprint-founding-hypothesis` |
| Bridge | `sprint-foundation-to-design` (converts Founding Hypothesis to Design Sprint brief) |
| Design Sprint (7) | `design-sprint-readiness`, `design-sprint-brief`, `design-sprint-map-and-target`, `design-sprint-sketch`, `design-sprint-decide-and-storyboard`, `design-sprint-prototype-plan`, `design-sprint-test-and-score` |

Each skill = SKILL.md + `references/TEMPLATE.md` + `references/EXAMPLE.md` (3 files), so 48 skill files total.

### Workflows (3 new)

- `_workflows/foundation-sprint.md` - chains the 7 FS skills
- `_workflows/design-sprint.md` - chains the 7 DS skills
- `_workflows/foundation-to-design.md` - end-to-end arc (FS + bridge + DS)

### Commands (16 new)

One slash command per skill in `commands/` (7 FS + 7 DS + bridge + shared = 16).

### Library samples (48)

Three thread continuations (Brainshelf book-catalog, Storevine retail-direction, Workbench debugging-toolchain), each carrying a complete Foundation Sprint to Design Sprint arc through all 16 skills.

### Infrastructure

- `docs/reference/skill-families/sprint-skills-contract.md` - family contract
- Updated `docs/reference/skill-families/_registry.yaml` - family registration with 16 members
- `scripts/validate-sprint-skills-family.sh` + `.ps1` - new family validator pair
- Extended `scripts/lint-skills-frontmatter.sh` + `.ps1` - allow `classification: sprint`
- Extended `scripts/validate-agents-md.sh` + `.ps1` - recognize sprint skill directories

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
| Design Sprint Integration Plan | 8-10 |
| v2.14.x Cleanup Plan | ~0.5 (folded into FS or DS plan sessions) |
| Pre-tag artifact pass (CHANGELOG, release notes, version bump, skills-manifest) | 1 |
| **Total** | **17-22 sessions** |

---

## Release-Time Checklist

Author and complete at the end of execution, before tagging v2.15.0:

- [ ] All 41 sub-plan tasks marked complete
- [ ] All sprint skills pass `validate-sprint-skills-family.sh` (Bash + PowerShell parity)
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

- `MEMORY.md` "Active Work (as of 2026-04-18)" block is stale; refresh during execution
- 4 prep commits (`9e1042c`, `5b9e590`, `0d97209`, `5060ec9`) plus this master plan + session log = 5-6 commits to push before execution begins

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
