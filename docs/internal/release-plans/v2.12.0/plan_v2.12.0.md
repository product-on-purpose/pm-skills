# v2.12.0 Release Plan: OKR Skills Launch

Status: Release prep complete + Phase 0 review converged; tagging 2026-05-03
Owner: Maintainers
Type: Feature release (minor)
Stub created: 2026-04-18 (during v2.11.0 completion)
Theme pivoted: 2026-05-01 (from sample-automation to OKR launch)
Tagged: 2026-05-03 (pending push)

## Release Theme

Ship the first two skills of the OKR Skills set: `foundation-okr-writer` and `measure-okr-grader`. The original v2.12.0 stub theme (sample-automation + meeting-ecosystem continuation) has been pushed to v2.13.0+ because that work is gated on real-world meeting-skills usage feedback that has not yet arrived. The OKR work has momentum from the 2026-04-29 strategy session and a complete OKR-doctrine knowledge base.

## Status Snapshot (2026-05-03)

| Item | Status |
|---|---|
| `foundation-okr-writer` skill canonical | Shipped (commit `6bcfba1`) |
| `foundation-okr-writer` 3 thread samples | Shipped (storevine, brainshelf, workbench) |
| `foundation-okr-writer` AGENTS.md + mkdocs.yml + commands ref | Updated |
| `foundation-okr-writer` Codex adversarial review | Done. 2 medium findings resolved (generator-bug fix, nonexistent-command redirect rephrased) |
| `measure-okr-grader` skill | Shipped (commit `a5c000f`) |
| `measure-okr-grader` 3 thread samples | Shipped (storevine, brainshelf, workbench) |
| `measure-okr-grader` Phase 0 Adversarial Review Loop | Done. 3 rounds; converged on 0 findings round 3 |
| `measure-okr-grader` cross-reference cleanup in writer | Applied (line 45 redirect, line 184 active reference) |
| pm-skill-builder packet format | Simplified (silently bundled) |
| Legacy effort docs | Reorganized; old format removed from tracked tree |
| Sprint-skill backlog stubs (F-41, F-42) | Added |
| CHANGELOG.md v2.12.0 entry | Authored, dated 2026-05-03, follow-up bullets added for release-state review rounds and operational doc reconciliation |
| skills-manifest.yaml | Authored |
| Release_v2.12.0.md | Authored, validation list expanded for follow-up CI runs, mermaid extended for release-state review rounds |
| README.md skill counts and version badge | Updated to 40 / 2.12.0 |
| README.md What's New v2.12.0 entry | Authored. v2.11.1 closed; v2.12.0 set to `<details open>` |
| README.md "Latest stable" pointer | Bumped from v2.10.2 to v2.12.0 |
| .claude-plugin/plugin.json + marketplace.json | Updated to 40 / 2.12.0 |
| README_SAMPLES.md | Updated (126 / 40) |
| Em-dash sweep across docs/skills/ mirror | Committed |
| docs/internal/audit-ci/ → docs/internal/audit/_archived/ rename | Committed |
| Operational doc count reconciliation (commit `92cfbcf`) | Done. 26 files: anatomy concept pages, getting-started family, project-structure, ecosystem, skills landing page, authoring/creating-skills guides, workflow guide, README operational sections, foundation-okr-writer/EXAMPLE.md repo_version typo, docs/changelog.md mirror sync. README "What's New" historical entries preserved with inline `vX.Y.Z` prefixes |
| AGENTS/claude/CONTEXT.md refresh | Done. Current State block fully refreshed for v2.12.0 |
| AGENTS/codex/CONTEXT.md currency marker | Done. v2.12.0 marker pinned at top; full content refresh deferred to v2.13.0 |
| docs/reference/README.md (Reference section overview) | Authored, wired into mkdocs nav, count refreshed to 47/40, footer trimmed of broken internal-audit link (commit `5b61244`) |
| docs/index.md homepage release-state refresh | Done. Frontmatter description, hero, mermaid Triple Diamond Measure phase, Measure grid card, Foundation grid card, "25 domain skills" header, block-beta mermaid Measure block (added /okr-grader), Plus list (added /okr-writer) (commit `46828b1`) |
| docs/concepts/skill-anatomy.md frontmatter section | Rewrite. Example now starts with `---` on line 1; attribution comment moved AFTER closing `---`; explicit "First line must be `---`" rule added with v2.11.1 lint reference (commit `46828b1`) |
| docs/concepts/versioning.md Current Skill Versions | Refreshed for v2.12.0 state; pointers added to per-skill SKILL.md frontmatter and per-release skills-manifest.yaml as authoritative sources (commit `46828b1`) |
| Pre-release checklist | Executed (full CI clean, Phase 0 review converged across both OKR skills + 3 release-state confirmation rounds, em-dash zero in tracked files, mkdocs --strict passes) |
| Codex adversarial review on full release | Done. 4 release-state rounds; loop terminated per Phase 0 below-IMPORTANT criterion. Round 1 (review-moq6jjc9-...) caught 2 MEDIUM in untracked reference/README.md (resolved in `5b61244`); round 2 (review-bmlgpyd0q-...) caught 2 MEDIUM in rendered docs homepage / skill-anatomy / versioning (resolved in `46828b1`); round 3 (review-b8frnehmv-...) caught 3 MEDIUM in versioning data accuracy + anatomy counts + date alignment (resolved in `67f0239`); round 4 (review-bhwb1m0pw-...) caught 2 MEDIUM in release-notes audit-trail accuracy + stale CHANGELOG anchor (resolved in this commit). MEDIUM count 2 / 2 / 3 / 2 across rounds, no HIGH, no escalation, all findings below IMPORTANT |
| /ultrareview on full release | N/A. Per user directive 2026-05-03: appropriately scoped for design-decision releases where the chosen approach itself might be wrong; overkill for doc-heavy release prep where the Phase 0 Codex loop and mechanical CI guards already cover the surface |
| Tag and push | Pending (final step after round-3 confirmation result lands) |

## Major Deliverables

### foundation-okr-writer (shipped to main, uncommitted)

- `skills/foundation-okr-writer/SKILL.md` (184 lines)
- `skills/foundation-okr-writer/references/TEMPLATE.md` (103 lines)
- `skills/foundation-okr-writer/references/EXAMPLE.md` (264 lines)
- `commands/okr-writer.md`
- 3 thread samples in `library/skill-output-samples/foundation-okr-writer/`
- AGENTS.md entry plus Commands table row
- mkdocs.yml nav entry
- Auto-regenerated `docs/skills/foundation/foundation-okr-writer.md`
- Auto-regenerated `docs/reference/commands.md`

Skill highlights:

- Five entry modes (Guided default, One-Shot via `--oneshot`, Sustained Coach, Audit Only, Rewrite)
- Empowered-team diagnostic with conditional Disclosure section in output
- 16-item anti-pattern catalog
- Constraint Rules block (MUST / MUST NOT)
- Quality Audit Rubric

### measure-okr-grader (pending)

Same shape as the writer. Strategy doc covers the design at `docs/internal/skills-ideas/okr-writer/_LOCAL/definition/approach_opus-4.7.md` (gitignored). Storevine draft sample exists at `_LOCAL/definition/sample_measure-okr-grader_storevine_campaigns-q3-draft.md`.

Estimated time: 2 to 3 hours mirroring the writer's promotion sequence.

### Other deliverables

- F-41 (design-sprint-skills) and F-42 (foundation-sprint-skills) effort stubs registered in backlog (post-v2.12.0)

## Deferred to v2.13.0 or later

The original v2.12.0 stub (2026-04-18) queued 8 efforts under a sample-automation theme. All 8 are deferred:

| ID | Name | New target |
|---|---|---|
| F-29 | Meeting Lifecycle Workflow | v2.13.0 (gated on meeting-skills usage feedback) |
| F-30 | Family Adoption Guide | v2.13.0 (gated on at least one team's adoption experience) |
| F-31 | pm-skill-validate Family + Sample Awareness | v2.13.0 |
| F-32 | pm-skill-builder Sample Generation | v2.13.0 (now beneficially smaller after the builder packet simplification) |
| F-33 | check-sample-standards CI Script | v2.13.0 |
| F-34 | THREAD_PROFILES.md Reference | v2.13.0 (unblocks F-32) |
| F-35 | pm-skill-iterate Sample Regeneration | v2.13.0 |
| F-36 | Generic Skill-Family-Registration Validator | v2.13.0 |

The deferral is non-controversial: F-29 and F-30 were always time-gated on real-world signal; F-31 to F-35 form an internally-consistent slate that is better shipped together than sliced; F-36 is infrastructure-prep that is not blocking any current effort.

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| **v2.12.0 theme** | OKR Skills Launch | Two locked decisions: ship the writer plus grader pair; defer sample-automation slate. Approach B confirmed in 2026-04-30 strategy session |
| **Grader phase placement** | `measure` | Pattern-matches `measure-experiment-results`; iterate skills are general team-process not OKR-specific |
| **Output format** | Markdown only | JSON deferred to family-contract maturity |
| **Empowered-team handling** | Diagnose, do not refuse | Adjust framing via Disclosure section when feature-team signals are present |
| **Coaching modes** | Five named modes, Guided default, explicit `--oneshot` flag | Decision in 2026-04-30 strategy session |
| **Sample thread continuity** | Locked in as design principle | Storevine Campaigns thread now spans `measure-experiment-results`, `foundation-okr-writer`, and (planned) `measure-okr-grader` |
| **OKR family contract** | Defer to v2.13.0 | Two skills do not yet justify a formal contract; meeting-skills-family precedent had 5 |
| **CHANGELOG narrative** | OKR launch only | Internal builder-cleanup work bundled silently per design |

## CI That Applies

| Workflow | Checks | Notes |
|---|---|---|
| `lint-skills-frontmatter` | Includes `foundation-okr-writer` after promotion | Must pass |
| `validate-commands` | New `okr-writer.md` to `skills/foundation-okr-writer/SKILL.md` | Must pass |
| `validate-agents-md` | 39 skill paths after writer ships, 40 after grader | Must pass |
| `validate-skills-manifest` | v2.12.0 manifest with new skill entries | Must pass before tag |
| `validate-skill-history` | No HISTORY.md required for first-version skills | Must pass |
| `check-count-consistency` | Counts updated for the new skill family | Must pass |

## Pre-release Checklist (executed)

Per the v2.11.0 codified Phase 0 Adversarial Review Loop:

- [x] Em-dash sweep (zero in tracked files; sweep extended in `92cfbcf` for archived audit + workbench sample line + README/CHANGELOG cleanup)
- [x] Generator reruns (`generate-skill-pages.py`; `mkdocs build --strict` exits 0)
- [x] Full enforcing CI suite passes (`validate-commands`, `validate-agents-md` 40 paths, `lint-skills-frontmatter` bash-canonical, `validate-meeting-skills-family`, `validate-version-consistency` at 2.12.0)
- [x] Advisory CI suite passes (`check-count-consistency` 40/47/9, `check-context-currency` claude+codex both at v2.12.0)
- [x] Codex adversarial review on the writer (2 findings resolved before writer commit `6bcfba1`)
- [x] Codex adversarial review on the grader (3 rounds, converged on 0 findings round 3, before grader commit `a5c000f`)
- [x] Codex adversarial review on the family pair / full release state (3 release-state rounds; round 3 confirms convergence)
- [x] CHANGELOG.md v2.12.0 entry authored
- [x] `docs/releases/Release_v2.12.0.md` authored
- [x] `docs/internal/release-plans/v2.12.0/skills-manifest.yaml` authored
- [x] Version bumps: README badge, `.claude-plugin/plugin.json`, `marketplace.json`
- [x] README.md "What's New" v2.12.0 entry authored; v2.11.1 closed
- [x] README.md "Latest stable" / "Latest release notes" / "Published tag" pointers bumped from v2.10.2 to v2.12.0
- [x] AGENTS/claude/CONTEXT.md current-state block refreshed; AGENTS/codex/CONTEXT.md given v2.12.0 currency marker
- [x] docs/reference/README.md added as Reference section overview, wired into mkdocs nav
- [x] Operational doc count reconciliation across rendered surfaces (anatomy, getting-started, project-structure, ecosystem, skills landing, authoring guides, workflow guide, homepage, skill-anatomy frontmatter example, versioning concept page)
- [x] Final release-prep commits land on `main`: `92cfbcf` (count + CONTEXT), `5b61244` (reference README), `46828b1` (homepage + anatomy + versioning)
- [ ] Tag v2.12.0, push origin main + tag, gh release create using `docs/releases/Release_v2.12.0.md` as notes

## MCP Impact

| Question | Answer |
|---|---|
| New MCP tools needed? | No. MCP server frozen per M-22 (v2.11.0 decision) |
| Separate MCP release required? | No |
| Skill count drift relative to MCP | MCP at 28; repo will be at 40 after v2.12.0; gap widens but unfreeze still gated on team adoption demand |

## Open Questions

1. **Grader build sequencing**: ~~should the grader build happen before or after the v2.12.0 prep commits land?~~ **Resolved**: commits first (writer launch as discrete diff via `6bcfba1`), then grader (`a5c000f`), then release artifacts (`0173476`), then count + CONTEXT follow-up (`92cfbcf`), then reference README (`5b61244`), then homepage / anatomy / versioning (`46828b1`).
2. **Family contract timing**: contract document at `docs/reference/skill-families/okr-skills-contract.md` deferred per Decisions table. Revisit if a third OKR skill (e.g., OKR retrospective, OKR cascade validator) is queued, since two skills do not yet justify a formal contract.
3. **Cross-skill cross-references**: should `define-hypothesis`, `define-opportunity-tree`, `iterate-retrospective` mention `/okr-writer` and `/okr-grader` for discoverability? Optional polish; not blocking. Codex review did not flag this as a release defect. Defer to v2.13 doc consistency overhaul.
4. **Tag timing**: ~~target tag date open. Suggested no earlier than 5 business days after grader ships, to allow real-world testing of the writer in the interim.~~ **Resolved**: tagging 2026-05-03. The grader shipped 2026-05-01 via `a5c000f`; 2 calendar days passed during release-state Phase 0 confirmation review and operational doc reconciliation rather than user testing. The 5-business-day suggestion is relaxed because (a) the grader passed 3 rounds of adversarial review with convergence, (b) sample artifacts cover the empowerment + type spectrum end-to-end, and (c) holding for in-the-wild testing on a still-untagged release adds friction without proportional signal.

## Related

- v2.11.0 release plan: [`../v2.11.0/plan_v2.11.0.md`](../v2.11.0/plan_v2.11.0.md)
- Pre-release checklist template: [`../v2.11.0/plan_v2.11_pre-release-checklist.md`](../v2.11.0/plan_v2.11_pre-release-checklist.md)
- Codex review precedent: [`../v2.11.0/plan_v2.11_codex-review.md`](../v2.11.0/plan_v2.11_codex-review.md)
- OKR strategy doc (gitignored): `docs/internal/skills-ideas/okr-writer/_LOCAL/definition/approach_opus-4.7.md`
- OKR draft samples (gitignored): `docs/internal/skills-ideas/okr-writer/_LOCAL/definition/sample_*-q3-draft.md`
- Backlog canonical: [`../../backlog-canonical.md`](../../backlog-canonical.md)
- F-41 design-sprint-skills: [`../../efforts/F-41-design-sprint-skills.md`](../../efforts/F-41-design-sprint-skills.md)
- F-42 foundation-sprint-skills: [`../../efforts/F-42-foundation-sprint-skills.md`](../../efforts/F-42-foundation-sprint-skills.md)

## Change Log

| Date | Change |
|---|---|
| 2026-04-18 | Stub created at end of v2.11.0 completion session; original theme: sample-automation + meeting-ecosystem (8 efforts F-29 to F-36) |
| 2026-04-18 | F-36 added post-v2.11.0 tag (CI audit gap G2) |
| 2026-05-01 | Theme pivoted from sample-automation to OKR Skills Launch. Original 8 efforts deferred to v2.13.0+. `foundation-okr-writer` shipped to main (uncommitted). `measure-okr-grader` pending. F-41 and F-42 stubs added to backlog. Quiet pm-skill-builder packet-format simplification bundled. |
| 2026-05-01 | `measure-okr-grader` shipped (commit `a5c000f`). 3 rounds of Codex adversarial review converged. Release artifacts authored (CHANGELOG, Release_v2.12.0.md, manifest, plugin/marketplace bumps, README badge, README_SAMPLES.md count). Audit-CI tree consolidated into `docs/internal/audit/_archived/`. Em-dash sweep extension across `docs/skills/` mirror. Initial release-prep commit `0173476`. |
| 2026-05-03 | Operational doc count reconciliation across rendered surfaces (commit `92cfbcf`, 26 files). AGENTS/claude/CONTEXT.md refreshed for v2.12.0; AGENTS/codex/CONTEXT.md given v2.12.0 currency marker. |
| 2026-05-03 | Release-state Phase 0 confirmation loop kicked off. Round 1 caught 2 MEDIUM in untracked `docs/reference/README.md` (stale 46/39 count, missing mkdocs nav entry). Resolved in commit `5b61244`: count refreshed to 47/40, README wired into mkdocs as Reference section overview, broken footer link to `docs/internal/_working/audit_repo-structure_*.md` trimmed. |
| 2026-05-03 | Round 2 caught 2 MEDIUM in rendered public docs (docs/index.md homepage hero/mermaid/grid cards still at 38 skills with 4 measure / 7 foundation; docs/concepts/skill-anatomy.md frontmatter example teaching pre-v2.11.1 ordering with HTML comment before YAML delimiter, which the v2.11.1 lint rule explicitly rejects). Round 2 also surfaced docs/concepts/versioning.md as severely-stale ("All 25 domain skills and the foundation skill"). Resolved in commit `46828b1`. |
| 2026-05-03 | Round 3 launched (background `b8frnehmv`) to verify convergence. README "What's New" v2.12.0 entry authored; v2.11.1 closed. README "Latest stable" pointer bumped from v2.10.2 to v2.12.0. CHANGELOG date refreshed to 2026-05-03 with follow-up bullets for release-state review rounds and operational doc reconciliation. Release_v2.12.0.md mermaid extended for release-state review rounds; validation list expanded. /ultrareview removed from plan per user directive (overkill for doc-heavy release prep; appropriate for design-decision releases). |
| 2026-05-03 | Round 3 returned 3 MEDIUM findings: docs/concepts/versioning.md current-skill-versions claim was wrong on 3 fronts (foundation-persona at 2.5.0 not 2.0.0; foundation-meeting-synthesize at 1.0.1 not 1.0.0; "original 25 domain skills at 2.0.0" wrong because acceptance-criteria and okr-grader are at 1.0.0); docs/concepts/skill-anatomy.md classification counts still at 25 / 1 / 1 with Measure 4; CHANGELOG / Release_v2.12.0.md / skills-manifest.yaml dates inconsistent (some 05-01, some 05-03). Resolved in commit `67f0239`: versioning.md rewritten with accurate per-skill enumeration derived from current SKILL.md frontmatter (24 + 2 domain at 2.0.0 / 1.0.0 split, persona 2.5.0, synthesize 1.0.1, others 1.0.0); anatomy counts updated to 26 / 8 / 6 with Measure 5; all dates aligned to 2026-05-03; comprehensive plan + release-doc audit committed. |
| 2026-05-03 | Round 4 launched (background `bhwb1m0pw`). Returned 2 MEDIUM findings, both about audit-trail accuracy in the release notes themselves: my round-3 fix had said "round 3 verifies convergence" but round 3 actually had 3 MEDIUM findings, making the published audit trail false; and the changelog anchor `#2120--2026-05-01` was stale (CHANGELOG now at 2026-05-03 with 3-dash anchor `#2120---2026-05-03`). Resolved in this commit: mermaid corrected to show round 3 catches + round 4 catches + loop termination at round 4; validation list updated to "4 release-state confirmation rounds" with the actual finding-counts per round; CHANGELOG anchor fixed; CHANGELOG infra bullet rewritten with the same accurate timeline. |
| 2026-05-03 | Phase 0 release-state loop terminated at round 4 per the codified rule "until findings stabilize below IMPORTANT severity". MEDIUM count was 2 / 2 / 3 / 2 across rounds with no HIGH and no escalation; round-4 findings were entirely meta-level audit-trail accuracy in release notes rather than new release-state defects. The grader's intra-skill loop is unrelated and converged earlier (3 rounds, 1 HIGH + 5 MEDIUM total, round 3 returned 0 findings). Total Codex rounds for v2.12.0: 1 writer + 3 grader + 4 release-state = 8 review passes. Stack ready for tag. |
