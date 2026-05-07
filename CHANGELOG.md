# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.13.1] - 2026-05-06

Plugin Install Path Correction. Patch release. The 40-skill catalog is unchanged from v2.13.0; day-to-day usage of `/prd`, `/hypothesis`, `/user-stories`, etc. is identical. What changes is the plugin install path: `/plugin marketplace add product-on-purpose/pm-skills` now succeeds, where it had failed silently since v2.7.0 due to two unrelated bugs in `marketplace.json` (wrong location and missing schema fields).

### Fixed

- **`marketplace.json` relocated** from repo root to `.claude-plugin/marketplace.json`, the canonical path Claude Code's plugin system reads from. Move performed via `git mv` so file history is preserved. The repo-root location is no longer present.
- **README count-exempt markers extended** to cover the "Previous Release Details" section. Pre-release CI surfaced 3 pre-existing stale per-version counts in historical release blocks (v2.9.0 "31 skills", v2.8.0 "29 skills", v2.7.0 "27 skills") that fell outside the v2.13.0 count-exempt range. These are correct as historical statements about what shipped at each version; the wrap restores `check-count-consistency` to PASS without rewriting historical text.
- **`marketplace.json` schema corrected** to satisfy Claude Code's marketplace registry:
    - Added top-level `owner` object with `name` and `url` (required field; was absent).
    - Converted plugin entry's `author` from a bare string to an object with `name` and `url` (string form is rejected by the schema).
    - Both changes are non-behavioral; the same plugin metadata is now expressed in the schema-conformant shape.

### Added

- **`scripts/validate-plugin-install.{sh,ps1,md}`** (enforcing). New CI validator that asserts the plugin install path will work end-to-end. Verifies both manifests exist at canonical paths (`.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`), validates required fields against Claude Code's marketplace schema (`name`, `owner.name`, `plugins`, per-plugin `name` + `version` + `source` + `author` as object), and enforces cross-manifest version + name consistency. Catches the exact bug class that shipped silently from v2.7.0 through v2.13.0.
- **`docs/releases/Release_v2.13.1.md`** authored as the release notes artifact.
- **`docs/internal/release-plans/v2.13.1/plan_v2.13.1.md`** authored as the release plan.

### Changed

- **`scripts/validate-version-consistency.{sh,ps1}`** updated to read `marketplace.json` from `.claude-plugin/marketplace.json` instead of the repo root. Continues to enforce that plugin.json and marketplace.json declare the same version.
- **`README.md` "Install as Claude Code Plugin" section** rewritten. Primary path is now the `/plugin marketplace add` + `/plugin install` flow that the marketplace registration enables. Manifest-direct install (the prior text) retained as a fallback for older Claude clients.
- **`.claude/pm-skills-for-claude.md`** updated to acknowledge plugin install as a parallel path alongside the sync-helper. No primary recommendation between the two paths in this release; recommendation positioning deferred to v2.14.0 or later.
- **Validator inventory grows from 22 to 23** (1 new enforcing). Enforcing tier grows from 10 to 11.

### Compatibility

- **No content changes.** All 40 skills, 47 slash commands, 9 workflows, 126 library samples, and 22 CI scripts are unchanged from v2.13.0.
- **Codex compatibility unaffected.** Codex (and any non-Claude-Code agent) reads from `skills/` and `AGENTS.md` directly; `marketplace.json` is Claude-Code-specific. The file move and schema additions have zero impact on Codex usage.
- **Sync-helper install path unaffected.** Users who install via `scripts/sync-claude.sh` see no change.
- **`pm-skills-mcp` companion server unaffected.** v2.9.x maintenance line continues independently.

### Why this matters

For Claude Code users, this is the release that makes plugin install actually work. Prior to v2.13.1, anyone who tried `/plugin marketplace add product-on-purpose/pm-skills` got two cryptic errors in sequence (file not found, then schema violation). The bug had shipped silently across multiple releases because no CI step exercised the install path; existing CI only checked manifest version consistency. v2.13.1 fixes both errors and adds the missing CI guard.

For maintainers and forkers, the new `validate-plugin-install` script is the durable user-value. It is the front-door check: "if a user tried to install pm-skills as a plugin right now, would it succeed?" That question now has a continuous answer in CI rather than only at release time.

## [2.13.0] - 2026-05-05

Foundation Hardening + Doc Stack Decision. Maintenance and quality release. The 40-skill catalog is unchanged from v2.12.0, so day-to-day usage of `/prd`, `/hypothesis`, `/user-stories`, and the rest of the catalog is identical. What changed is everything around the catalog: cleaner Diataxis-aligned documentation (duplicate files removed, counts reconciled, generated pages clearly labeled, `pm-skill-*` filename prefix convention), 7 new CI gates that catch doc drift on PRs automatically (validator inventory 15 to 22; enforcing tier 5 to 10), and an out-of-cycle `pm-skills-mcp` v2.9.3 security-patch follow-up to the v2.9.2 maintenance-mode announcement that cleared all 8 open Dependabot moderate advisories.

### Added

- **7 new CI validators** (Bucket C) each with `.sh` + `.ps1` + `.md` triplet completeness:
    - `check-nav-completeness` (enforcing): every `docs/**/*.md` is in nav OR `exclude_docs` OR auto-include patterns
    - `check-generated-content-untouched` (enforcing): snapshots, regenerates, diffs, restores; fails on hand-edits to generated pages. Pairs with Pattern 5C generated-content marker from Bucket A.4.
    - `validate-references-cross-doc` (enforcing): every cross-link in `docs/reference/` resolves
    - `validate-skill-family-registration` (enforcing): registry-driven family validation (`meeting-skills-family` plus future families); F-36
    - `validate-docs-frontmatter` (advisory): every rendered doc has title plus description
    - `check-internal-link-validity` (advisory): zero broken internal links across the doc tree
    - `check-version-references` (advisory): version-reference drift detector
- **Pattern 5C generated-content marker** on all 63 generated pages: `generated: true` and `source: scripts/...` frontmatter fields plus a visible `!!! warning "Generated file"` admonition pointing editors to the source. All 3 generators (`generate-skill-pages.py`, `generate-workflow-pages.py`, `generate-showcase.py`) emit the marker.
- **F-34 `library/skill-output-samples/THREAD_PROFILES.md`**: machine-readable per-thread metadata contract for tooling consumers (`utility-pm-skill-builder` primary; future regen tools). Documents thread identity, feature arc, prompt style, character naming convention, real competitors, sample-suffix patterns, and scenario archetypes per phase across all three threads (storevine, brainshelf, workbench).
- **Zensical compatibility spike report** at `docs/internal/release-plans/v2.13.0/plan_v2.13_zensical-spike-report_2026-05-05.md`. Decision artifact for v2.14.0+ stack-decision discussions; outcome NO-GO.

### Changed

- **Doc structure refactor (Bucket A)**: 
    - `docs/frameworks/` retired. Canonical Triple Diamond reference moved to `docs/concepts/triple-diamond-delivery-process.md` with a `mkdocs.yml` redirect from the old path. Reduces `mkdocs.yml exclude_docs:` from 8 entries to 2.
    - 4 concept files reorganized out of `docs/concepts/` to `docs/reference/` and `docs/guides/` per the Diataxis 4-quadrant taxonomy.
    - 4 legacy duplicate files deleted after CR-strip drift analysis (real divergence was minor; canonical was strictly newer).
    - `creating-skills.md` renamed to `creating-pm-skills.md` per the locked `pm-skill-*` prefix convention. `authoring-pm-skills.md` deleted. Both old paths redirect to the new canonical.
- **Count and link cleanup (Bucket B)**: skill counts reconciled across 7 public surfaces (concepts, reference, guides, getting-started, mkdocs config, homepage hero) at 40 (26 phase + 8 foundation + 6 utility); `utility-pm-skill-builder` catalog table updated to current per-classification counts; `docs/guides/mcp-setup.md` deleted and redirected to `mcp-integration.md`; `AGENTS/codex/CONTEXT.md` shrunk 74 to 32 lines as a vestigial-redirect to `AGENTS/claude/CONTEXT.md`; README "What's New" workaround replaced (Option a section-aware CI) with explicit HTML-comment markers plus subset-descriptor exclusion; project-structure.md fully reconciled; `docs/guides/index.md` expanded from 7 to 12 listed guides.
- **5 PowerShell parity bugfixes (Bucket C)**: `check-stale-bundle-refs.ps1` reserved-word collision; `check-workflow-coverage.ps1` and `check-generated-freshness.ps1` Join-Path named-parameter usage; `lint-skills-frontmatter.ps1` path-detection. PS1 versions now match bash output on current main.
- **`check-count-consistency` tightened and promoted to enforcing** for current-state files. Original line-level `v[0-9]+\.` exemption replaced with explicit HTML-comment markers (`<!-- count-exempt:start -->` / `<!-- count-exempt:end -->`) plus a subset-descriptor exclusion list. Surfaced and resolved 18 hidden findings the prior workaround had silenced.
- **CI workflow `validation.yml`** updated: `if: always() && matrix.os == ...` added to all 14 new-validator step conditions so an enforcing-step failure does not cascade-skip later validators in the same job.

### Infrastructure

- **Phase 0 Adversarial Review Loop** applied across per-strand (PR.1) and release-state (PR.2) layers per the v2.11.0 + v2.12.0 codification. PR.1 closed via 4 Codex tasks. PR.2 closed via 5 Codex review rounds + 3 resolution passes (8 numbered rounds total): each Codex round caught a deeper layer of stale-summary text introduced by the previous round's resolution; round 6 was a comprehensive sweep across the full release stack rather than another incremental fix; round 8 resolved final audit-trail correctness defects and applied a user-value reframe to the public-facing release artifacts.
- **Stale-aggregate-counter pattern codified** as durable feedback memory after PR.2 round 2 caught it at meta level. Status-block text drifts as state advances unless every gate closure sweeps all release-stack docs; pattern is now a standing rule for future cycles.
- **Validator inventory grows from 15 to 22** (7 new). **Enforcing tier grows from 5 to 10** (4 new enforcing + count-consistency promoted).

### Fixed

- **Bash + PS1 parity** on `check-stale-bundle-refs`, `check-workflow-coverage`, `check-generated-freshness`, `lint-skills-frontmatter`. PS1 false-positive class on certain skill paths resolved.
- **Stale doc references** across 7 public surfaces and the master plan / ci-refactor doc / CONTEXT.md / DECISIONS.md (caught and resolved across PR.2 review rounds).
- **`docs/reference/categories.md`** stale category math: total now 40 (was 29, missing 3 categories `meeting`, `communication`, `documentation`); per-category counts and skill listings now match SKILL frontmatter `metadata.category`.
- **`mkdocs.yml`** duplicate top-level `Guides:` nav section consolidated into a single section (the `using-meeting-skills.md` guide was previously stranded in a second `Guides:` block).
- **`scripts/check-generated-content-untouched.md`** watched-paths table count corrected from 38 to 40 individual skill pages.

### Out-of-cycle (pm-skills-mcp companion server)

These shipped on the same calendar day as v2.13 cycle work but are tracked separately because they are out-of-cycle by explicit user-initiated decision:

- **`pm-skills-mcp` v2.9.2** (2026-05-05): formal maintenance-mode announcement (effective 2026-05-04). Re-embeds the full current 40-skill catalog at v2.9.2 build time, superseding the prior v2.11.0 M-22 28-skill freeze. Total tools: 59 (40 skill + 11 workflow + 8 utility). Active development paused; security patches and critical bug fixes will continue.
- **`pm-skills-mcp` v2.9.3** (2026-05-05): security-patch follow-up two hours after v2.9.2. Cleared all 8 open Dependabot moderate advisories via transitive `npm audit fix` (`hono`, `@hono/node-server`, `vite`, `postcss`). Post-ship Dependabot open-alert count: 0. Bundled three latent v2.9.x maintenance debts in the same patch (loader test catalog assertions, lockfile metadata sync, retroactive em-dash sweep on 28 occurrences in pre-2026-04-13 CHANGELOG entries).
- The 2-hour announcement-to-patch turnaround validates the v2.9.2 maintenance-mode "security patches will continue" commitment in operational practice. Catalog frozen at v2.9.2 build; subsequent v2.9.x patches do not change the catalog.

### Deferred

| Item | Reason |
|---|---|
| Zensical migration | Spike NO-GO; re-spike when upstream blockers resolve |
| Plan B Astro Starlight | Per spike plan Section 5: only triggers if Material maintenance posture deteriorates |
| F-37 HTML Template Creator | Conflicts with v2.13 "no new skills" guard |
| F-29 Meeting Lifecycle Workflow | Time-gated on real-world meeting-skills feedback |
| F-30 Family Adoption Guide | Time-gated on at least one team's adoption experience |
| F-31 / F-32 / F-33 / F-35 Sample-automation slate | May be obsolete after v2.12 builder cleanup; re-evaluate before v2.14 |
| Pattern 2 mkdocs-macros frontmatter-driven counts | Adds dependency; deferred pending Zensical decision |
| Bash + PS1 dual-stack consolidation | Strategic question; deferred to v2.14.0+ |
| AGENTS/claude/CONTEXT.md per-phase Skills Inventory tables | At v2.10.x-era 32-skill state per intentional deferral. Authoritative catalog lives in `docs/reference/categories.md` and `docs/skills/index.md`. Full refresh slated for v2.14.0. |

## [2.12.0] - 2026-05-03

OKR Skills Launch. First release with the OKR Skills set: `foundation-okr-writer` and `measure-okr-grader` covering the full quarterly OKR write-and-score cycle. Adds 2 new skills (40 total) and 6 new thread-aligned library samples (126 total). Both skills shipped together so cross-skill hand-offs and the canonical 5-value OKR type enum (`committed | aspirational | learning | operational_health | compliance_or_safety`) are coherent at first appearance. Internal `utility-pm-skill-builder` packet-format simplification bundled silently. Phase 0 Adversarial Review Loop applied across the OKR skills (3 rounds converged) and the broader release state (2 confirmation rounds caught rendered-doc count drift the count-consistency CI's regex could not detect).

### Added

- **`foundation-okr-writer`** with command `/okr-writer`. Drafts, reviews, rewrites, and coaches outcome-based OKR sets. Five entry modes (Guided default, One-Shot via `--oneshot`, Sustained Coach, Audit Only, Rewrite). Empowered-team diagnostic with conditional Disclosure section in the artifact when feature-team signals are present. 16-item anti-pattern catalog. Constraint Rules block (MUST / MUST NOT). Quality Audit Rubric. Refuses to fabricate baselines or targets, refuses compensation coupling, reframes feature-delivery KRs into outcome KRs.

- **`measure-okr-grader`** with command `/okr-grader`. Scores completed OKR sets at cycle close per the canonical type enum: `aspirational` numeric, `committed` pass/fail, `compliance_or_safety` binary, `operational_health` pass/fail/drift-within-tolerance, `learning` validated/invalidated. Indicator class `guardrail` is independent of OKR type and adds a never-averaged-into-primary-score rule. Special states: `not-yet-observable` (cycle-window extensions past close) and `not-yet-fully-observable` (committed or compliance_or_safety with partial coverage; never softened to pass-on-in-scope). Refuses retroactive target changes, retroactive scope shrinkage on committed or compliance_or_safety KRs, and use of OKR scores for individual performance ratings. Hands off learnings to `iterate-lessons-log`, team-process work to `iterate-retrospective`, assumption tests to `define-hypothesis`, measurement gaps to `measure-dashboard-requirements` or `measure-instrumentation-spec`, and next-cycle drafting to `foundation-okr-writer`.

- **6 thread-aligned library samples** at `library/skill-output-samples/`. 3 per skill across the storevine, brainshelf, and workbench threads. The storevine Campaigns thread now spans `measure-experiment-results`, `foundation-okr-writer`, and `measure-okr-grader` for a complete write-and-score arc on a single product context. Brainshelf samples demonstrate retention-thesis invalidation via a 1.6x at-scale multiplier vs the 3.4x in beta. Workbench samples demonstrate mixed-empowerment scoring: committed KR fail not softened to aspirational, compliance_or_safety KR marked not-yet-fully-observable on partial audit coverage, and committed KR with `guardrail` indicator class held within threshold band.

- **`docs/skills/foundation/foundation-okr-writer.md`** and **`docs/skills/measure/measure-okr-grader.md`** mirror pages auto-generated by `scripts/generate-skill-pages.py`. Both skills appear in `mkdocs.yml` nav under their phase / classification section.

### Changed

- **`utility-pm-skill-builder`** packet format simplified. The Step 5 Skill Implementation Packet definition was reduced from 13 to 12 items per the prior session's quiet refactor; nothing downstream depends on the removed item, and the packet format change does not affect any shipped skill or sample. Bundled silently with the OKR launch per design.

- **`foundation-okr-writer/SKILL.md`** cross-reference cleanups now that the grader exists. Line 45 redirects scoring users directly to `/okr-grader`. Line 184 drops the "planned for a later release" framing.

- **README.md** skill counts and version badge bumped: 38 → 40 skills (26 phase + 8 foundation + 6 utility), version 2.11.1 → 2.12.0.

- **`.claude-plugin/plugin.json` and `marketplace.json`** version bumps to 2.12.0 with descriptions updated to reflect the 40-skill total and the new OKR Skills set.

- **`library/skill-output-samples/README_SAMPLES.md`** updated for the 6 new OKR samples: total samples 120 → 126, total skills 38 → 40, Browse by Skill table extended, all three thread tables extended with OKR rows, footer version refreshed.

### Infrastructure / process

- **Phase 0 Adversarial Review Loop** applied across both new skills. The grader's 3-round review converged on stable findings: round 1 caught 1 HIGH (workbench compliance KR retroactive scope shrinkage in sample) and 2 MEDIUM (`/define-hypothesis` nonexistent slash command, OKR-type-vs-indicator-class taxonomy drift); round 2 caught 2 MEDIUM (taxonomy drift propagation to TEMPLATE.md and sample KR3 framings); round 3 returned 0 findings. The writer's earlier review caught 1 generator-script bug (HTML attribution comment rendering as page H1) and 1 nonexistent-command directive, both resolved before the writer commit.

- **Release-state Phase 0 confirmation** loop on the broader release. Round 1 caught 2 MEDIUM in `docs/reference/README.md` (stale 46/39 count, missing mkdocs nav entry); round 2 caught 2 MEDIUM in rendered docs (homepage hero / mermaid / phase cards still at 38 skills, skill-anatomy contributor guide teaching pre-v2.11.1 frontmatter ordering); round 3 caught 3 MEDIUM in versioning data accuracy (foundation-persona at 2.5.0 not 2.0.0; foundation-meeting-synthesize at 1.0.1 not 1.0.0; original domain count off by 1) and skill-anatomy classification counts and CHANGELOG/release-notes date alignment; round 4 caught 2 MEDIUM in release-notes audit-trail accuracy (the round-3 fix incorrectly claimed convergence) and a stale CHANGELOG anchor; the loop terminated after the round-4 fix per the Phase 0 codified rule "until findings stabilize below IMPORTANT severity" (MEDIUM count was 2 / 2 / 3 / 2 across rounds; no HIGH; all findings below IMPORTANT). Each round's resolution surfaced new drift in the next round, which is the explicit pattern the Phase 0 loop was codified to catch in v2.11.0. The early rounds also exposed defects the count-consistency CI's regex (`\d+\s+(?:PM\s+|product\s+management\s+)?skills`) could not detect, because prose forms like "38 AI agent skills" and structural elements like mermaid phase counts (per-phase counts below the 10 min-threshold) fall outside its detection shape.

- **Em-dash sweep extension** across the auto-generated `docs/skills/` mirror to keep the mirror in sync with the standing no-em-dash rule applied to source SKILL.md files.

- **Operational doc count reconciliation** across rendered surfaces: anatomy concept pages, getting-started guides, project-structure reference, ecosystem reference, skills landing page, authoring guides, workflow guides, and the homepage. README "What's New" historical entries preserved with inline `vX.Y.Z` prefixes so the count-CI script's version-line skip rule keeps them out of the flagged set.

- **AGENTS/claude/CONTEXT.md** Current State block refreshed for v2.12.0 (release commits, skill count, MCP gap delta, v2.13.0 deferred items, next-step list). **AGENTS/codex/CONTEXT.md** given a top-of-file v2.12.0 currency marker; full refresh deferred to v2.13.0.

- **`docs/reference/README.md`** added as the canonical Reference section overview, wired into mkdocs nav. Indexes frontmatter schema, command catalog, category taxonomy, project structure, ecosystem comparison, and skill-family contracts.

- **`docs/internal/audit-ci/` reorganized** into `docs/internal/audit/_archived/` to consolidate audit history under a single tree.

- **`docs/internal/release-plans/v2.12.0/skills-manifest.yaml`** authored to match the v2.11.0 manifest format. Lists the two new skills with `previous_version: null`, `change_type: added`, version 1.0.0.

- **`docs/releases/Release_v2.12.0.md`** authored with the standard release notes structure (TL;DR, mermaid summary, Added / Changed / Infrastructure sections, validation, links).

## [2.11.1] - 2026-04-22

skills.sh CLI compatibility patch. Unblocks `npx skills add product-on-purpose/pm-skills` so the full 38-skill library is discoverable and installable through the open [`skills` CLI](https://github.com/vercel-labs/skills) and the skills.sh directory. No behavioral changes to any skill.

### Fixed

- **6 foundation skills** silently dropped by the skills CLI's strict YAML parser because each SKILL.md opened with an HTML attribution comment before the `---` frontmatter delimiter. Leading comment removed from `foundation-lean-canvas`, `foundation-meeting-agenda`, `foundation-meeting-brief`, `foundation-meeting-recap`, `foundation-meeting-synthesize`, `foundation-stakeholder-update`. Attribution is preserved via the identical comment that already lives immediately after the frontmatter block in each file.
- **`foundation-meeting-synthesize` description** contained an inline `": "` (colon-space) that strict YAML parsers interpret as a nested key-value separator, truncating the description. Reworded to split the sentence. Version bumped 1.0.0 → 1.0.1.
- **25 stale tracked files under `.claude/skills/`** (pre-v1 personal-setup relics) removed via `git rm`. The path was already gitignored; these files predated the rule. Affected directories: `init-project/`, `init-project-jpkb/`, `wrap-session/`.

### Added

- **`skills` CLI install path** in README as the recommended first option, with one-line `npx skills add product-on-purpose/pm-skills` and a new row in the Installation Options table. New skills.sh shield badge in the header badge row.
- **New lint rules** in `scripts/lint-skills-frontmatter.sh/.ps1/.md`:
  - First line of every SKILL.md must be the `---` YAML delimiter (no preamble, comments, or attribution headers above it).
  - Unquoted `description` field must not contain inline `": "` patterns. If a colon is required, wrap the full description value in double quotes.
- **Distribution plan** at `docs/internal/distribution/2026-04-22_skills-sh.md` documenting the six-phase submission approach (Phase 0 through 3 complete as of this release; Phase 4 optional; Phase 5 is a post-release soft-launch workstream).

### Changed

- **Em-dash sweep completion**: 376 tracked files swept, 5,805 em-dash characters replaced with `.` per the 2026-04-13 standing style rule. Zero behavioral change. Brings total em-dashes in tracked files to 0 (previous partial sweep had reduced a subset; this completes it across the full repo).
- **Stale count reconciliation**: 8 current-state skill-count references across 5 files updated from `27 skills` or `31 skills` to `38 skills` (`docs/agent-skill-anatomy.md` had 4 instances; one each in `docs/skills/utility/utility-pm-skill-builder.md`, `scripts/README_SCRIPTS.md`, `skills/utility-pm-skill-builder/SKILL.md`, and `skills/utility-pm-skill-builder/references/EXAMPLE.md`). Historical per-release count snapshots in README "What's New" sections intentionally left untouched as accurate records of past release states.
- **`README.md` version badge** bumped from 2.11.0 to 2.11.1.

### Infrastructure / process

- Dry-run against live skills CLI (`npx skills add <local path> -l`) added as a de facto pre-release validation. Phase 3 of the distribution plan documents the exact commands. Recommended for any future release that touches SKILL.md frontmatter.

## [2.11.0] . 2026-04-18

Foundation-phase expansion release. Ships 6 new foundation skills (lean canvas + 5-skill meeting lifecycle family), a canonical skill-family contract pattern enforced by CI, 15 thread-aligned library samples, and end-user documentation. First pm-skills release with a cross-cutting skill-family contract. Two rounds of Codex adversarial review before tag.

### Added

**6 new foundation skills**:
- **F-26: `foundation-lean-canvas`** (`/lean-canvas`) . one-page business thesis across 9 interlocking blocks with optional HTML visual rendering (content + visual modes; Ash Maurya nine-block layout; 3 thread samples)
- **F-18: `foundation-meeting-agenda`** (`/meeting-agenda`) . attendee-facing agenda with time-boxed topics, type tags, owners, prep; 10 meeting-type variants; anti-meeting check with synchronous-value requirement
- **F-25: `foundation-meeting-brief`** (`/meeting-brief`) . user's private strategic prep with stakeholder reads, ranked outcomes, anticipated Q&A; `visibility: private` default
- **F-27: `foundation-meeting-recap`** (`/meeting-recap`) . topic-segmented post-meeting summary with decisions bold-flagged and actions inline; auto-discovers sibling agenda; ownership reconciliation threshold at 30% unassigned
- **F-17: `foundation-meeting-synthesize`** (`/meeting-synthesize`) . cross-meeting archaeology surfacing patterns, trajectories, contradictions; format hints (board-prep, onboarding, retro-input, exec-brief)
- **F-28: `foundation-stakeholder-update`** (`/stakeholder-update`) . async outward comms with 5 channel × 5 audience variants; explicit Shareable update boundary

**Meeting Skills Family Contract v1.1.0** at `docs/reference/skill-families/meeting-skills-contract.md` . canonical, CI-enforced, shipped after two rounds of adversarial review with errata-within-version.

**New directory pattern** `docs/reference/skill-families/` with landing-page index for future cross-cutting skill-family contracts.

**Enforcing CI validator** `scripts/validate-meeting-skills-family.sh` + `.ps1` + `.md`, wired into `.github/workflows/validation.yml`. Checks contract-reference, zero-friction-execution section, shareable-summary/shareable-update section, sources-and-references structure, artifact_type enum values, and filename convention conformance across EXAMPLE.md + library samples.

**15 new library samples** (3 per meeting skill × storevine/brainshelf/workbench threads) conforming to `SAMPLE_CREATION.md` with 8-key top-level frontmatter + Scenario/Prompt/Output structure + fictional-marker discipline. Total library grew 94 → 120 (legacy/orbit samples accurately accounted for).

**End-user guide** `docs/guides/using-meeting-skills.md` with 3 mermaid diagrams (family skills graph, go-mode decision flow, chain sequence).

**Release-plan companion docs**:
- `plan_v2.11.0.md` . release plan with decisions table and deliverables
- `plan_v2.11_codex-review.md` . Round 1 + Round 2 findings tracker (26 findings total)
- `plan_v2.11_ci-coverage-analysis.md` . CI gaps and follow-up scripts
- `plan_v2.11_pre-release-checklist.md` . pre-release quality checklist (Phase 0 Adversarial Review Loop added from v2.11.0 learnings)
- `plan_v2.11_review-journal.md` . comprehensive narrative of all reviews, findings, resolutions, pattern analysis

**v2.12.0 backlog** . 7 efforts created for sample-automation loop (F-31 to F-35) + meeting-skills ecosystem continuation (F-29, F-30). Stub at `docs/internal/release-plans/v2.12.0/plan_v2.12.0.md`.

### Changed

- **Skill count 32 → 38** (+6: F-26 + 5 meeting skills)
- **Foundation classification 1 → 7** (adds lean-canvas + 5 meeting skills to persona)
- **Slash commands 39 → 45** (+6)
- Current-state count references updated across `README.md`, `CLAUDE.md`, `plugin.json`, `marketplace.json`, `docs/getting-started.md`, `docs/reference/commands.md`, `docs/skills/index.md`, `docs/reference/ecosystem.md`, `docs/reference/project-structure.md`, `docs/guides/mcp-setup.md`, `QUICKSTART.md`, `docs/index.md`, `docs/concepts/agent-skill-anatomy.md`
- `library/skill-output-samples/README_SAMPLES.md` . count 94 → 120 with 6-category breakdown (canonical, legacy/orbit, persona, lean-canvas, utility-single-thread, meeting-family)
- `AGENTS.md` . 5 new foundation-meeting-* entries with family-contract note
- `mkdocs.yml` . Foundation nav expanded to 7 skills + new Reference → Skill Families section + Guides section
- `.github/workflows/validation.yml` . 2 new enforcing steps for `validate-meeting-skills-family` (bash + powershell)
- `docs/internal/efforts/F-17-meeting-synthesis.md` and `F-18-meeting-prep.md` . archived to `_NOTES/archived-efforts/` and rewritten with expanded family-aware scope

### Infrastructure / process

- Two rounds of Codex adversarial review (`codex:codex-rescue` subagent) documented in review journal; 26 findings total, 24 resolved same-session
- Pre-release checklist now starts with Phase 0 Adversarial Review Loop . re-run Codex after each resolution pass until findings stabilize below IMPORTANT severity
- First post-v1.0.0 contract version bump with errata-within-version documented in change log

### Not shipped in v2.11.0 (deferred)

- R1-I8 IMPORTANT: utility-pm-skill-validate per-skill field enforcement . scoped into F-31 for v2.12.0
- Retroactive sample generation for existing skills that lack them . post-v2.12.0 candidate
- MCP server unfreeze criteria (frozen per M-22)

## [2.10.2] . 2026-04-14

Maintenance patch: corrects plugin manifest drift and extends the count-consistency CI to prevent it from recurring. No skill behavior changes.

### Changed
- `.claude-plugin/plugin.json` and `marketplace.json` . skill count in description corrected from 29 to 32 (reconciled with the 32-skill repo state shipped in v2.10.0)
- `scripts/check-count-consistency.sh` / `.ps1` / `.md` . extended to scan tracked `.json` files (previously `.md` only), so drift in `plugin.json` and `marketplace.json` is now caught by the same CI that covers markdown. Threshold comparison changed from `>` to `>=` to catch round-number boundary drift. Added exclusions for `.github/.created-issues.json` (tooling state) and `.github/scripts/` (npm manifests).
- `README.md` . v2.10.x What's New entry corrected from "10 workflows" to "9 workflows" (no new workflow shipped in v2.10.x; the repo has been at 9 workflows since v2.9.0)

## [2.10.1] . 2026-04-13

Documentation and tooling polish following v2.10.0. No skill behavior changes.

### Added
- Specifications for 10 backlog skills (draft effort briefs)
- Generated `docs/skills/` pages for F-16, F-19, F-24

### Changed
- `scripts/generate-skill-pages.py` . skill/command/workflow counts now computed dynamically instead of hardcoded, preventing the stale-count drift that previously required manual sweeps
- Backlog updated to reflect v2.10.0 shipped state

### Removed
- F-25 effort brief (scope moved to a separate agent-config-toolkit initiative)

## [2.10.0] . 2026-04-11

> **Note:** F-16 (mermaid-diagrams) and F-19 (slideshow-creator) content has
> been available since v2.9.1 but is formally released and documented with
> v2.10.0 as the utility skill expansion release.

### Added
- **F-16: `utility-mermaid-diagrams`** . new utility skill teaching PMs to create syntactically valid mermaid diagrams. 15 diagram types with dual-lens navigation (type catalog + PM use-case guide), dedicated syntax validity reference, planning worksheet, and worked examples. 2,656 lines across 7 files.
- **F-19: `utility-slideshow-creator`** . new utility skill for generating professional presentations from JSON deck specifications. 18 slide types with dark/light variants, content-to-layout decision logic, calibrated character limits, Google Slides compatibility. Ships with a generic professional theme. 766 lines across 7 files.
- **F-24: `utility-update-pm-skills`** . new utility skill for checking, previewing, and applying pm-skills updates. Three modes: `--status` (quick version check), `--report-only` (preview without writing files), default (full update with confirmation). Includes validated-before-copy safety, optional backup, value-delta reports, post-update smoke test, 13-item quality checklist, FAQ, and degraded mode for no-network environments.
- `/mermaid-diagrams` slash command
- `/slideshow-creator` slash command
- `/update-pm-skills` slash command with `--status` and `--report-only` flags
- `docs/guides/updating-pm-skills.md` . user-facing guide for the update skill
- `_pm-skills/` local state directory convention (gitignored) for update reports and backups
- 7 new sample outputs in `library/skill-output-samples/` for deliver-acceptance-criteria and all 6 utility skills (storevine thread). Sample library: 84 → 91, now covering all 32 skills.
- Generated `docs/skills/` pages for all 3 new utility skills

### Changed
- Repo now ships 32 skills (25 phase + 1 foundation + 6 utility), 39 command docs, and 10 workflows
- Comprehensive docs count sweep across 20+ files
- MCP server decoupled from pm-skills release cycle (M-22) . frozen, no longer a release prerequisite
- Codex cross-LLM review completed for release plan and F-24 feature design (1 Blocker, 12 Major, 11 Minor resolved)

## [2.9.1] . 2026-04-10

### Added
- **D-05: Workflows guide** . dedicated `docs/guides/using-workflows.md` with decision tree (mermaid), comparison matrix for all 9 workflows, invocation guide, and customization patterns. Replaces the brief workflow section previously in `using-skills.md`.
- **M-20: Documentation count consistency CI** . 3 new validation script pairs:
  - `check-workflow-coverage` . verifies every workflow has matching docs page, AGENTS.md entry, and mkdocs nav entry
  - `check-count-consistency` . detects stale hardcoded skill/command/workflow counts in documentation
  - `check-generated-freshness` . verifies generated workflow pages match sources
- `validate-version-consistency` . hard-fail CI check ensuring `plugin.json` and `marketplace.json` versions match
- `validate-gitignore-pm-skills` . advisory CI check for `_pm-skills/` in `.gitignore`
- `validate-script-docs` . advisory CI check ensuring every script pair has companion `.md` documentation
- Companion `.md` documentation for all new scripts and 2 previously undocumented scripts (`check-context-currency`, `check-stale-bundle-refs`)
- `_pm-skills/` added to `.gitignore` (local state directory for update reports and backups)

### Changed
- `scripts/README_SCRIPTS.md` . expanded from 8 to 16 script entries with updated "When to use what" guide
- `.github/workflows/validation.yml` . added 6 new CI checks (1 hard-fail, 5 advisory)
- `docs/guides/using-skills.md` . trimmed workflow section to overview + link to new dedicated guide
- `docs/workflows/index.md` . added link to workflows guide
- `mkdocs.yml` . added "Using Workflows" nav entry under Guides
- Fixed `marketplace.json` version 2.8.2 → 2.9.0 (was out of sync with `plugin.json`)

## [2.9.0] . 2026-04-06

### Added
- 6 new workflows: Customer Discovery, Sprint Planning, Product Strategy, Post-Launch Learning, Stakeholder Alignment, Technical Discovery
- 7 `/workflow-*` slash commands (1 renamed from M-19 + 6 new)
- `scripts/generate-workflow-pages.py` . generates docs/workflows/ from source _workflows/

### Changed
- **BREAKING:** Renamed `_bundles/` → `_workflows/` and `docs/bundles/` → `docs/workflows/`
- **BREAKING:** Removed `/kickoff` command . replaced by `/workflow-feature-kickoff`
- Renamed "Workflow Bundles" → "Workflows" across all documentation
- Added URL redirects for old `/bundles/*` doc site paths

## [2.8.2] - 2026-04-04

### Added
- **Skill versioning concepts page** . `docs/concepts/versioning.md`: public-facing guide to skill SemVer, HISTORY.md, skills-manifest.yaml, tie-breaker rule, and lifecycle tool integration.
- **git-revision-date-localized plugin** . shows "last updated" and "created" dates on every page (enabled in CI).
- **Custom CSS** . `docs/stylesheets/extra.css` for card grid, tag badge, and admonition styling.
- **Theme overrides directory** . `overrides/` for future MkDocs Material customization.
- **F-12 effort brief** . skill quality convergence draft (first real-world use of lifecycle tools at scale).

### Changed
- `requirements-docs.txt` . added `mkdocs-git-revision-date-localized-plugin`.
- `mkdocs.yml` . added git-revision-date, custom_dir, extra_css, versioning page in nav.
- `docs/reference/categories.md` . fixed stale coordination skill count (5→7) and total (27→29).
- `marketplace.json` . updated to v2.8.1 / 29 skills.

### Release Notes
- Documentation-only release. No skill or command behavior changes.
- No `pm-skills-mcp` code changes required (docs parity update only).

## [2.8.1] - 2026-04-04 ([release notes](docs/releases/Release_v2.8.1.md))

### Added
- **Documentation site** at [product-on-purpose.github.io/pm-skills](https://product-on-purpose.github.io/pm-skills/) . MkDocs Material with tab navigation, dark mode, search, and mermaid diagram rendering.
- **"Follow the Product" showcase** . 3 interactive narrative journeys (Storevine B2B, Brainshelf Consumer, Workbench Enterprise) with 84 real sample outputs from the sample library, including prompts and full artifacts.
- **Skill finder** . interactive decision tree and artifact table for choosing the right skill.
- **Recipes** . 7 end-to-end workflows (Pitch a Feature, Run an Experiment, Launch a Feature, Discover and Frame, Define the Opportunity, Sprint Retro, Full Lifecycle) with mermaid flow diagrams.
- **Skill comparisons** . 6 side-by-side comparisons for commonly confused skill pairs (PRD vs Solution Brief, Hypothesis vs Problem Statement, etc.).
- **Prompt gallery** . curated real prompts in 3 styles (organized, casual, enterprise) from the sample library.
- **Per-skill real-world examples** . 3 collapsible sample outputs (one per narrative thread) embedded on 25 skill pages.
- **Quick-try snippets** . copy-pasteable slash command at the top of every skill page.
- **Phase flow diagrams** . mermaid diagrams on all 6 phase index pages showing how skills connect.
- **Tags plugin** . browse skills by phase and category tags.
- **Social cards** . OpenGraph preview cards for link sharing (enabled in CI).
- **Generation scripts** . `scripts/generate-skill-pages.py` (29 skill pages + indexes + commands ref) and `scripts/generate-showcase.py` (3 showcase journeys from sample library).
- **Deploy workflow** . `.github/workflows/deploy-docs.yml` auto-deploys on push to main.
- **MkDocs config guide** . `docs/internal/mkdocs/mkdocs-config.md` for maintainers.
- **MCP setup guide** . `docs/guides/mcp-setup.md` for users: install, configure, and use pm-skills-mcp across Claude Desktop, Cursor, Claude Code, and VS Code.

### Changed
- **MCP integration guide** . updated tool counts (25→29 skill tools, 42 total), added acceptance-criteria and utility skill tools, updated slash command mapping table, removed stale catalog note, updated version references to v2.8.0.

### Release Notes
- Documentation-only release . no PM skill or slash-command behavior changes.
- No `pm-skills-mcp` update required.
- Site is generated from existing content (skills, samples, docs) plus new guide pages.
- 70+ navigable pages, zero build warnings.

## [2.8.0] - 2026-04-03 ([release notes](docs/releases/Release_v2.8.0.md))

### Added
- **F-10: utility-pm-skill-validate skill** (#121) . second utility skill. Audits existing skills against structural conventions (mirroring CI) and LLM-assessed quality criteria. Produces a pipe-delimited validation report (`Report schema: v1`) with severity-graded findings (FAIL/WARN/INFO) and actionable recommendations with target file paths. Two-tier assessment rebaselined against shipped library conventions. Includes SKILL.md, TEMPLATE.md (report format), EXAMPLE.md (validated `deliver-prd`), `/pm-skill-validate` command, and AGENTS.md entry. Skill count: 27 → 28.
- **F-11: utility-pm-skill-iterate skill** (#122) . third utility skill. Applies targeted improvements to existing skills from feedback, validation reports, or convention changes. Unified flow with input normalization, before/after preview, stale-preview guard, version bump class suggestion (don't auto-write), and HISTORY.md creation at second-version trigger point. Includes SKILL.md, TEMPLATE.md (change summary), EXAMPLE.md (iterated `deliver-prd`), `/pm-skill-iterate` command, and AGENTS.md entry. Skill count: 28 → 29.
- **M-18: CI skill versioning validation** . two new advisory scripts following `.sh` + `.ps1` + `.md` convention: `validate-skill-history` (checks HISTORY.md tracks current frontmatter version) and `validate-skills-manifest` (checks release manifest entries match skill directories). Added to `validation.yml` with `continue-on-error: true`.
- **D-03: `docs/pm-skill-lifecycle.md`** . public guide explaining the Create → Validate → Iterate lifecycle with workflow patterns (new skill, improve existing, convention change, feedback loop), CI vs validator comparison, and quality standard model.
- **Governance: `docs/internal/skill-versioning.md`** . SemVer rules for skills, HISTORY.md contract, skills-manifest.yaml format, release checklist, and tie-breaker rule for gray-area version bump classification.
- `docs/internal/release-plans/v2.7.0/skills-manifest.yaml` . retroactive first use of the skills-manifest convention.
- `docs/internal/release-plans/v2.8.0/` . release governance with phased execution plan and Codex design review.

### Changed
- **D-04: public docs refresh for v2.8.0** . updated skill counts (29), command counts (30), utility skill breakdown (3), Skill Lifecycle Tools section in README and QUICKSTART, command table, AGENTS.md entries, AGENTS/claude/CONTEXT.md, `docs/pm-skill-anatomy.md` lifecycle cross-reference, and `scripts/README_SCRIPTS.md` with M-18 script documentation.
- `docs/internal/releases/` renamed to `docs/internal/release-plans/` with all internal references updated (34 files).
- `docs/internal/backlog-canonical.md` updated with v2.8.0 assignments (F-10, F-11, D-03, M-18, D-04).

### Release Notes
- Completes the **PM skill lifecycle**: Create (`/pm-skill-builder`, v2.7.0) → Validate (`/pm-skill-validate`) → Iterate (`/pm-skill-iterate`).
- First release with **skill versioning governance** . skills-manifest.yaml per release, HISTORY.md per skill (opt-in), SemVer tie-breaker rule.
- First release with **advisory CI for skill versioning** . HISTORY.md and skills-manifest.yaml validators.
- Repo now contains 29 skills (25 domain + 1 foundation + 3 utility), 30 command docs, and 3 workflow bundles.
- **MCP note**: `pm-skills-mcp` needs a re-embed to pick up both new skills. `utility-pm-skill-validate` → `pm_pm_skill_validate`. `utility-pm-skill-iterate` → `pm_pm_skill_iterate`.

## [2.7.0] - 2026-03-22 ([release notes](docs/releases/Release_v2.7.0.md))

### Added
- **F-06: deliver-acceptance-criteria skill** (#114) . new Deliver phase skill for Given/When/Then acceptance criteria generation covering happy path, edge cases, error states, and non-functional criteria. Includes SKILL.md, TEMPLATE.md, EXAMPLE.md (e-commerce checkout scenario), `/acceptance-criteria` command, and AGENTS.md entry. Skill count: 25 → 26.
- **F-05: utility-pm-skill-builder skill** (#113) . first utility-classified skill. Interactive builder that guides contributors from a PM skill idea to a complete Skill Implementation Packet with gap analysis, Why Gate, classification, exemplar-driven drafting, and staging-to-promotion workflow. Includes SKILL.md, TEMPLATE.md, EXAMPLE.md (change-communication scenario), `/pm-skill-builder` command, and AGENTS.md Utility Skills section. Skill count: 26 → 27.
- **M-12: CI validation enhancement** (#112) . extended linter with description word count (20-100) and TEMPLATE.md header count (≥3) checks; new `validate-agents-md` script for AGENTS.md ↔ skill directory sync; new `check-mcp-impact` advisory script for MCP impact detection. All scripts follow `.sh + .ps1 + .md` convention.
- **M-16: exclude docs/internal from release ZIP** (#123) . release packagers (`build-release.sh` and `.ps1`) now strip `docs/internal/**` from staged artifacts. Internal governance docs stay tracked in-repo but no longer ship to end users.
- **D-01: `docs/pm-skill-anatomy.md`** . practical guide to pm-skills skill structure covering directory layout, classification types, frontmatter, Triple Diamond phases, wiring layer, and CI validation. Complements the spec-level `docs/agent-skill-anatomy.md`.
- `_staging/` added to `.gitignore` for pm-skill-builder draft artifacts.

### Changed
- **D-02: public docs review for v2.7.0** . updated skill counts (27), command counts (28), M-12 script documentation, domain/foundation/utility classification model, skill template modernization, frontmatter schema with utility example, and `docs/agent-skill-anatomy.md` scope note. Post-F-05 reconciliation patched 3 stale references.
- Fixed duplicate workflow steps in `validation.yml` (validate-agents-md and check-mcp-impact each ran twice).
- AGENTS.md gains a `### Utility Skills` section and `/pm-skill-builder` in the Commands table.
- `docs/internal/backlog-canonical.md` rewritten with Release, Status, and Agent columns.
- Release governance folders created for v2.2.0, v2.3.0, and v2.7.0 (v2.2.0 and v2.3.0 migrated from legacy locations).

### Removed
- `docs/internal/delivery-plan/` . legacy directory removed from tracking.
- `docs/internal/release-planning/` . legacy directory removed from tracking.

### Release Notes
- First release with a **utility** skill classification . `pm-skill-builder` creates new PM skills interactively.
- First release with enhanced CI: frontmatter linting, AGENTS.md sync validation, MCP impact detection.
- Release ZIPs now exclude `docs/internal/**` while preserving all public documentation.
- Repo now contains 27 skills (25 domain + 1 foundation + 1 utility), 28 command docs, and 3 workflow bundles.
- **MCP note**: `pm-skills-mcp` needs a re-embed to pick up both new skills. `deliver-acceptance-criteria` → `pm_acceptance_criteria`. `utility-pm-skill-builder` → `pm_pm_skill_builder` (double `pm_` is intentional . preserves skill name, consistent with future `pm_agent_skill_builder`). Update `embed-skills.js` to strip classification prefixes (`foundation-`, `utility-`) alongside phase prefixes.

## [2.6.1] - 2026-03-04

### Added
- Release note artifact:
  - `docs/releases/Release_v2.6.1.md`

### Changed
- Sample output library moved and normalized to:
  - `library/skill-output-samples/`
- Sample creation standards filename standardized to:
  - `library/skill-output-samples/SAMPLE_CREATION.md`
- Sample coverage manifest moved to release-planning artifacts (internal)
- Release packaging now includes sample-library content:
  - `scripts/build-release.sh`
  - `scripts/build-release.ps1`
- Release workflow-generated notes now list sample-library inclusion:
  - `.github/workflows/release.yml`
- README release metadata rolled forward to `v2.6.1`.

### Release Notes
- Patch release focused on sample-library recovery, naming/path normalization, and release-artifact inclusion.
- No PM skill instruction or slash-command behavior changes.

## [2.6.0] - 2026-03-04

### Added
- Claude plugin manifest: `.claude-plugin/plugin.json`.
- Plugin packaging validation workflow:
  - `.github/workflows/validate-plugin.yml`
- Release note artifact:
  - `docs/releases/Release_v2.6.0.md`

### Changed
- Release packaging now includes `.claude-plugin/` in ZIP staging:
  - `scripts/build-release.sh`
  - `scripts/build-release.ps1`
- Release packaging now enforces staged plugin-manifest version parity with the target release version.
- GitHub release workflow notes now include plugin-manifest install guidance:
  - `.github/workflows/release.yml`
- README release/install guidance updated for plugin install plus explicit Copilot/OpenCode setup notes.

### Release Notes
- Minor release focused on Claude plugin packaging and release automation hardening.
- No PM skill or slash-command behavior changes.
- No `pm-skills-mcp` deploy is included in this release scope.

## [2.5.2] - 2026-03-04

### Changed
- Rewrote public release-facing docs for clearer user-first language and historical readability.
- Removed internal decision-ID style references from release-facing docs where they were not needed for external readers.
- Removed local working-note path references from public release artifacts.
- Added release note artifact:
  - `docs/releases/Release_v2.5.2.md`

### Release Notes
- Patch release focused on public documentation quality and release-communication clarity.
- No PM skill behavior changes and no output/config contract changes from `v2.5.0`.

## [2.5.1] - 2026-03-04

### Changed
- Canonicalized Claude agent continuity workspace to `AGENTS/claude/` and retired active `AGENTS/claude-opus*` paths.
- Updated tracked `.claude` scaffolding templates to emit `AGENTS/claude` for init/wrap workflows.
- Added clean-worktree release runbook for deterministic cut/tag/publish lanes:
  - `docs/internal/release-planning/runbook_clean-worktree-cut-tag-publish.md`

### Release Notes
- Patch release focused on agent-workspace naming consistency and release-lane operational hygiene.
- No PM skill behavior changes and no output/config contract changes from `v2.5.0`.

## [2.5.0] - 2026-03-02

### Added
- Foundation persona capability with:
  - `skills/foundation-persona/` skill + references
  - `/persona` command at `commands/persona.md`
  - AGENTS discovery coverage for foundation classification

### Highlights
- Taxonomy updates shipped with explicit foundation classification handling.
- Sample-library lane closure evidence captured in release planning/checklist artifacts.
- Doc-hygiene closure completed across README/getting-started and release metadata references.
- Persona archetype library shipment and full persona MCP exposure parity remain deferred from `v2.5.0`.

## [2.4.3] - 2026-02-16

### Added
- Release note artifact: `docs/releases/Release_v2.4.3.md`.

### Changed
- Rolled forward release metadata references to treat `v2.4.3` as the latest stable patch:
  - `README.md`
  - `CHANGELOG.md`
- Captured explicit published-artifact links in release docs:
  - `docs/releases/Release_v2.4.3.md`

### Release Notes
- Patch release to include post-`v2.4.2` documentation/release-link updates in tagged artifacts.
- No PM skill behavior changes and no output/config contract changes from `v2.4.0`.

## [2.4.2] - 2026-02-16

### Added
- Release note artifact: `docs/releases/Release_v2.4.2.md`.
- Canonical delivery-plan policy and migration docs:
  - `docs/internal/delivery-plan/README.md`
  - `docs/internal/delivery-plan/v2.4-contract-lock-summary.md`
  - `docs/internal/delivery-plan/v2.5/` continuity kickoff artifacts

### Changed
- Started v2.5 continuity execution in tracked release-planning artifacts and checklist status.
- Updated release-planning and v2.4 release docs to treat `docs/internal/delivery-plan/` as canonical release-governance truth.
- Archived legacy internal repo-submission planning docs from tracked `docs/internal/`.

### Removed
- Legacy internal docs from tracked `docs/internal/`:
  - `docs/internal/repo-list_claude-code.md`
  - `docs/internal/pr-quick-reference.md`
  - `docs/internal/awesome-product-management-pr.md`
  - `docs/internal/AWESOME-PM-PR.md`
  - `docs/internal/awesome-lists-submission-package.md`
  - `docs/internal/awesome-lists-submission-package_planning.md`
  - `docs/internal/link-notes.md`

### Release Notes
- Patch release focused on governance hygiene and tracked-vs-local artifact clarity.
- No PM skill behavior changes and no output/config contract changes from `v2.4.0`.
- Published GitHub release: `https://github.com/product-on-purpose/pm-skills/releases/tag/v2.4.2`.

## [2.4.1] - 2026-02-16

### Added
- Release note artifact: `docs/releases/Release_v2.4.1.md`.
- Long-form internal delivery/engineering explainer:
  - `docs/internal/Releases_2.3-2.4_detailed-breakdown.md`

### Changed
- Finalized `v2.4.x` release-doc consistency:
  - `README.md`
  - `CHANGELOG.md`
  - `docs/releases/Release_v2.4.md`
  - `docs/internal/release-planning/checklist_v2.4.0.md`
  - `docs/internal/release-planning/Release_v2.2_to_v2.5_execution-plan.md`

### Release Notes
- Patch follow-up for release documentation and communication alignment only.
- No new PM skills and no output/config contract behavior changes from `v2.4.0`.

## [2.4.0] - 2026-02-16

### Added
- Release note artifact: `docs/releases/Release_v2.4.md`.
- Canonical tracked contract-lock summary:
  - `docs/internal/delivery-plan/v2.4-contract-lock-summary.md`

### Changed
- Release-planning artifacts updated for `v2.4.0` ship state:
  - `docs/internal/release-planning/Release_v2.2_to_v2.5_execution-plan.md`
  - `docs/internal/release-planning/checklist_v2.4.0.md`
  - `docs/internal/release-planning/README.md`
- Canonical backlog release cadence anchors synced for v2.4 closure:
  - `docs/internal/backlog-canonical.md`
- v2.4 contract-lock closure state advanced to `closed-aligned` and is summarized in:
  - `docs/internal/delivery-plan/v2.4-contract-lock-summary.md`
- Expanded `validate-mcp-sync` checks to include `pm-skills-mcp` pin metadata and contract-version parity via `pm-skills-source.json`.
- Corrected MCP integration guide utility-tool inventory to 7 tools (`pm_cache_stats` included).
- Updated MCP compatibility references to direct version tracking (`pm-skills v2.4.x` ↔ `pm-skills-mcp v2.4.x`) in ecosystem/integration docs.

### Release Notes
- This release closes the v2.4.0 contract-lock scope:
  - Output behavior contract locked and recorded as aligned.
  - Configuration contract/schema lock recorded as aligned with validator proof artifacts.

## [2.3.0] - 2026-02-13

### Added
- Release note artifact: `docs/releases/Release_v2.3.md`.

### Changed
- MCP sync workflow default mode switched to `block` in `.github/workflows/validate-mcp-sync.yml` (manual `workflow_dispatch` can still set `observe`).
- Updated MCP sync guide for blocking-default rollout state (`docs/guides/validate-mcp-sync.md`).
- Updated compatibility references for current MCP status:
  - `README.md` note now points to `pm-skills-mcp v2.1+` as aligned baseline.
  - `docs/reference/ecosystem.md` reflects 36 MCP tools (24 skills + 5 workflows + 7 utilities).
- Release-planning artifacts updated for `v2.3.0` closure:
  - `docs/internal/release-planning/checklist_v2.3.0.md`
  - `docs/internal/release-planning/Release_v2.2_to_v2.5_execution-plan.md`

### Release Notes
- This release closes the v2.3.0 scope:
  - Cross-repo alignment closure recorded on pinned refs.
  - Blocking `validate-mcp-sync` mode enabled by default.

## [2.2.0] - 2026-02-13

### Added
- Validation-only MCP drift checker script: `.github/scripts/validate-mcp-sync.js`
- MCP sync workflow: `.github/workflows/validate-mcp-sync.yml` (observe-only default)
- MCP sync usage guide: `docs/guides/validate-mcp-sync.md`
- Planning persistence governance docs:
  - `docs/internal/planning-persistence-policy.md`
  - `docs/internal/planning-artifact-tier-map.md`
- Canonical backlog governance reference: `docs/internal/backlog-canonical.md`
- Release execution artifacts:
  - `docs/releases/Release_v2.2.md`
  - `docs/internal/release-planning/Release_v2.2_to_v2.5_execution-plan.md`
  - `docs/internal/release-planning/checklist_v2.2.0.md`
  - `docs/internal/release-planning/checklist_v2.3.0.md`
  - `docs/internal/release-planning/checklist_v2.4.0.md`
  - `docs/internal/release-planning/checklist_v2.5.0.md`

### Changed
- `CONTRIBUTING.md`: added MCP sync guardrail guidance for contributors.
- `scripts/README_SCRIPTS.md`: clarified `.github/scripts/` usage and drift-check rollout.
- `docs/guides/mcp-integration.md`: linked new MCP sync validation guide.
- `.gitignore`: aligned AGENTS ignore rules with planning persistence policy.

### Release Notes
- This release establishes guardrails and governance:
  - Observe-only sync validation baseline.
  - Planning persistence policy baseline.
  - Canonical backlog governance baseline.

## [2.1.0] - 2026-01-27

### Added
- **MCP Alignment Milestone** . pm-skills-mcp v2.1.0 now fully aligned with flat structure
- Version alignment table in ecosystem documentation

### Changed
- Updated ecosystem documentation noting MCP v2.1 compatibility
- Clarified that pm-skills-mcp v2.1+ is required for full compatibility with pm-skills v2.x flat structure

### Ecosystem
- pm-skills-mcp v2.1.0 released with:
  - Flat resource URIs: `pm-skills://skills/{skill}`
  - Phase read from frontmatter, not path
  - Tool names remain stable (`pm_prd`, `pm_hypothesis`, etc.)

## [2.0.1] - 2026-01-27

### Added
- Validation workflow (`validation.yml`) running command + front-matter checks on Ubuntu and Windows.
- Front-matter lint scripts (`scripts/lint-skills-frontmatter.sh` / `.ps1`) that verify required keys, directory-name alignment, and reference files.
- Noted command validator scripts in project structure/README.
- Scripts guide renamed to `scripts/README_SCRIPTS.md` to avoid name collisions.

### Changed
- Removed nested `metadata.version` fields from all skills; lint now enforces a single root version and required keys.
- Parameterized build scripts (`build-release.sh` / `.ps1`) and release workflows to derive artifact names from the tag/ref (defaulting to v2.0.1); added zip/hash fallbacks for Windows.
- `validate-commands` now reports multi-skill bundles (e.g., `/kickoff`) without misleading first-path-only output.
- README path examples updated to `skills/{phase-skill}/`; AGENTS.md clarifies bundle links are repo-relative; release workflow typo fixed (`openskills`).
- Moved skill templates to `docs/templates/` and updated references (authoring guide, README, project-structure, AGENTS context).
- README refresh: expanded v2.0 highlights, updated project structure tree, roadmap in-progress items, note that pm-skills-mcp v1.x is outdated (v2.1 underway).
- `docs/reference/project-structure.md` now has a table of contents, updated directory tree, full commands list, and template path.

## [2.0.0] - 2026-01-26

### Breaking
- Repository flattened to `skills/{phase-skill}/` (hyphen-only). All prior nested `skills/<phase>/<skill>/` paths removed.
- Slash commands now point to the flat skill paths; update local references/scripts accordingly.

### Added
- Sync helpers `scripts/sync-claude.sh` and `scripts/sync-claude.ps1` to regenerate `.claude/skills` and `.claude/commands` for Claude Code / openskills discovery with validation.
- Build scripts `scripts/build-release.sh` and `scripts/build-release.ps1` to create `pm-skills-v2.0.zip` with manifest/hash (excludes populated `.claude`).
- `.claude/pm-skills-for-claude.md` usage note for discovery.

### Changed
- All 24 skills renamed to flat `{phase-skill}` directories; SKILL front matter updated with `phase`, `version: 2.0.0`, and `updated: 2026-01-26`.
- Docs refreshed to reflect flat structure and two-path install story (flat source vs. optional `.claude/` via sync helper), including README, QUICKSTART, AGENTS, bundles, guides, and references.
- Workflows (`release.yml`, `release-zips.yml`) call the new build-release script.
- `.gitignore` now excludes `.claude/skills`, `.claude/commands`, and `dist/`.

### Validation
- Path scan confirms no residual `skills/<phase>/` references in public docs/commands.
- Front-matter check: all `skills/*/SKILL.md` include required `name`, `phase`, `version`, `updated`.

## [1.2.0] - 2026-01-20

**PM-Skills v1.2.0 . Security & Community Infrastructure**

This release adds essential security policies, automated vulnerability scanning, and improved issue/PR templates for community contributions.

### Added
- **SECURITY.md** . Security policy with vulnerability reporting guidelines
- **CodeQL code scanning** . Automated security analysis via GitHub Actions (`.github/workflows/codeql.yml`)
- **Dependabot configuration** . Automated dependency updates for GitHub Actions and npm (`.github/dependabot.yml`)
- **Issue templates** . Structured forms for bug reports and feature requests
  - `bug_report.yml` . Skill-specific bug reporting with environment details
  - `feature_request.yml` . New skill and enhancement proposals
  - `config.yml` . Directs questions to Discussions, security issues to policy
- **Pull request template** . Standardized PR checklist (`.github/PULL_REQUEST_TEMPLATE.md`)

### Changed
- Issue creation now requires using templates (blank issues disabled)

### Security
- Enabled CodeQL scanning for JavaScript analysis on push, PR, and weekly schedule
- Added security policy with responsible disclosure guidelines

## [1.1.1] - 2026-01-20

### Added
- **CODE_OF_CONDUCT.md** . Contributor Covenant v2.1 for community guidelines
- **Attribution headers** . Added HTML comment attribution to all 24 SKILL.md files
- **Open-skills ecosystem submissions**
  - Submitted PR to [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills/pull/62)
  - Submitted to [n-skills marketplace](https://github.com/numman-ali/n-skills/issues/6)

### Changed
- **CONTRIBUTING.md** . Updated Code of Conduct section to link to dedicated CODE_OF_CONDUCT.md
- **README.md** . Updated openskills CLI installation section with accurate guidance
- **README.md** . Minor formatting cleanup (em dashes, navigation labels, alt text)

### Fixed
- **openskills#48 resolved** . [numman-ali/openskills#48](https://github.com/numman-ali/openskills/issues/48) fixed in openskills v1.3.1
  - Root cause: hardcoded `/` path separator failed on Windows
  - Verified: `anthropics/skills` now installs all 17 skills successfully
  - Note: pm-skills uses deeper nesting than openskills auto-discovers; Git clone recommended

## [1.1.0] - 2026-01-16

**PM-Skills v1.1.0 . Documentation & README Overhaul**

This release brings a comprehensive documentation expansion and a major README redesign following open-source best practices. The README now features better navigation, an FAQ section, and improved discoverability.

### Added
- **Comprehensive Documentation Expansion**
  - `docs/getting-started.md` . Detailed setup guide covering 5 installation methods
  - `docs/guides/using-skills.md` . Beginner to advanced usage guide with SPICE context framework, skill chaining, and 7 power-user patterns
  - `docs/guides/authoring-pm-skills.md` . Complete guide for creating and submitting new skills
  - `docs/frameworks/triple-diamond-delivery-process.md` . Triple Diamond methodology documentation
- **README Major Enhancements**
  - Collapsible Table of Contents for easier navigation
  - FAQ section with 7 expandable Q&A items covering common questions
  - License section with Apache 2.0 permissions explained
  - Acknowledgments section crediting frameworks and resources
  - About the Author section
  - More Suggestions section for community engagement
  - Project Status badge (Active)
  - GitHub stats badges (stars, forks, issues, contributors, last commit)
  - Back-to-top navigation links throughout
  - Change Log Summary table with version highlights
  - Releases section with download badge
  - Expanded Usage intro explaining skills, commands, and bundles
  - Workflow Bundles intro paragraph
  - Updated Built with section with visual badges
- **Open-Skills Ecosystem Integration**
  - Prepared PR content for awesome-claude-skills submission
  - Prepared submission content for n-skills marketplace
  - Documented openskills CLI compatibility testing
  - Filed [openskills#48](https://github.com/numman-ali/openskills/issues/48) for nested path bug
- **GitHub Release Workflow**
  - `.github/workflows/release.yml` . Automated ZIP creation on tag push
  - Creates two artifacts: full package + Claude.ai bundle
- **CLAUDE.md** . Agent instructions with documentation rules

### Changed
- **Documentation Reference Files Significantly Expanded**
  - `docs/reference/categories.md` . Expanded from 54 to 420+ lines with diagrams, workflows, and framework mappings
  - `docs/reference/frontmatter-schema.yaml` . Expanded from 91 to 600 lines with validation rules, examples, and best practices
- **New `/docs` Taxonomy Structure**
  - `docs/reference/` . Technical specifications (categories, schema)
  - `docs/guides/` . How-to guides (using-skills, authoring-pm-skills)
  - `docs/frameworks/` . Methodology documentation (triple-diamond)
- Renamed `_docs/` → `docs/` and `_templates/` → `templates/` for standard conventions
- README.md restructured following best-practices from Best-README-Template and amazing-github-template
- Updated README.md Quick Start with 4 installation options (Git clone recommended)
- Reordered installation methods based on openskills bug discovery
- Version badge updated to 1.1.0

### Fixed
- Discovered and documented [openskills#48](https://github.com/numman-ali/openskills/issues/48) . nested directory structure bug affecting pm-skills and anthropics/skills

## [1.0.1] - 2026-01-15

### Added
- **All 24 Slash Commands Complete** . Every skill now has a corresponding command
  - `/competitive-analysis` . Discover phase
  - `/interview-synthesis` . Discover phase
  - `/stakeholder-summary` . Discover phase
  - `/jtbd-canvas` . Define phase
  - `/opportunity-tree` . Define phase
  - `/adr` . Develop phase
  - `/design-rationale` . Develop phase
  - `/solution-brief` . Develop phase
  - `/spike-summary` . Develop phase
  - `/edge-cases` . Deliver phase
  - `/launch-checklist` . Deliver phase
  - `/release-notes` . Deliver phase
  - `/dashboard-requirements` . Measure phase
  - `/experiment-design` . Measure phase
  - `/experiment-results` . Measure phase
  - `/instrumentation-spec` . Measure phase
  - `/lessons-log` . Iterate phase
  - `/pivot-decision` . Iterate phase
  - `/refinement-notes` . Iterate phase
  - `/retrospective` . Iterate phase
- GitHub issues #43-62 created and closed for slash command tracking

### Changed
- Updated README.md Slash Commands section to list all 24 commands
- Updated AGENTS.md Commands section to list all 24 commands
- Updated plan-open-skills.md compatibility table to reflect slash commands complete

## [1.0.0] - 2026-01-14

**PM-Skills v1.0.0 . Complete Triple Diamond coverage is here!**

This release marks the completion of all 24 PM skills across the entire product development lifecycle. From discovery to iteration, PM-Skills now provides comprehensive coverage for product managers using AI assistants.

### Added
- **Phase 3 Complete: P2 Skills (11 skills) . All 24 skills now implemented!**
  - `competitive-analysis` skill . Discover phase (`skills/discover-competitive-analysis/`)
  - `stakeholder-summary` skill . Discover phase (`skills/discover-stakeholder-summary/`)
  - `opportunity-tree` skill . Define phase (`skills/define-opportunity-tree/`)
  - `jtbd-canvas` skill . Define phase (`skills/define-jtbd-canvas/`)
  - `design-rationale` skill . Develop phase (`skills/develop-design-rationale/`)
  - `dashboard-requirements` skill . Measure phase (`skills/measure-dashboard-requirements/`)
  - `experiment-results` skill . Measure phase (`skills/measure-experiment-results/`)
  - `retrospective` skill . Iterate phase (`skills/iterate-retrospective/`)
  - `lessons-log` skill . Iterate phase (`skills/iterate-lessons-log/`)
  - `refinement-notes` skill . Iterate phase (`skills/iterate-refinement-notes/`)
  - `pivot-decision` skill . Iterate phase (`skills/iterate-pivot-decision/`)
- Each skill includes SKILL.md, references/TEMPLATE.md, and references/EXAMPLE.md
- GitHub labels: `phase-3`, `P2`
- GitHub issues #26-36 for skill tracking
- **Phase 3 Infrastructure: Workflow Bundles**
  - `_bundles/triple-diamond.md` . Complete product development cycle guide
  - `_bundles/lean-startup.md` . Build-Measure-Learn rapid iteration guide
  - `_bundles/feature-kickoff.md` . Quick-start workflow for feature development
- **Phase 3 Infrastructure: Slash Commands**
  - `commands/prd.md` . Create Product Requirements Document
  - `commands/problem-statement.md` . Create problem statement
  - `commands/hypothesis.md` . Define testable hypothesis
  - `commands/user-stories.md` . Generate user stories
  - `commands/kickoff.md` . Run Feature Kickoff workflow
- **Phase 3 Infrastructure: Agent Discovery**
  - `AGENTS.md` . Universal agent discovery file listing all 24 skills
- **Phase 3 Infrastructure: GitHub Actions**
  - `.github/workflows/sync-agents-md.yml` . Auto-sync AGENTS.md on skill changes
  - `.github/workflows/release-zips.yml` . Package skills as ZIPs on release

### Changed
- Updated README.md Skills Inventory badge to 24/24 (complete)
- Updated README.md all skill status indicators to ✅
- Updated README.md roadmap to show Phase 3 P2 Skills complete
- Updated CONTEXT.md to reflect Phase 3 completion

## [0.3.0] - 2026-01-14

### Added
- **Phase 2 Complete: P1 Skills (8 skills)**
  - `interview-synthesis` skill . Discover phase (`skills/discover-interview-synthesis/`)
  - `solution-brief` skill . Develop phase (`skills/develop-solution-brief/`)
  - `spike-summary` skill . Develop phase (`skills/develop-spike-summary/`)
  - `adr` skill . Develop phase (`skills/develop-adr/`)
  - `edge-cases` skill . Deliver phase (`skills/deliver-edge-cases/`)
  - `release-notes` skill . Deliver phase (`skills/deliver-release-notes/`)
  - `experiment-design` skill . Measure phase (`skills/measure-experiment-design/`)
  - `instrumentation-spec` skill . Measure phase (`skills/measure-instrumentation-spec/`)
- Each skill includes SKILL.md, references/TEMPLATE.md, and references/EXAMPLE.md
- GitHub labels: `phase-2`, `P1`
- GitHub milestone: v0.3.0 - P1 Skills
- GitHub issues #18-25 for skill tracking

### Changed
- Updated README.md Skills Inventory with status indicators (✅ implemented, 🔜 coming soon)
- Updated README.md roadmap to show Phase 2 complete
- Updated plan-v1.md Progress Tracker with GitHub issue links for Phase 2
- Updated CONTEXT.md to reflect Phase 2 completion and add Skills Inventory table

## [0.2.0] - 2026-01-14

### Added
- **Phase 1 Complete: P0 Core Skills**
  - `problem-statement` skill . Define phase (`skills/define-problem-statement/`)
  - `hypothesis` skill . Define phase (`skills/define-hypothesis/`)
  - `prd` skill . Deliver phase (`skills/deliver-prd/`)
  - `user-stories` skill . Deliver phase (`skills/deliver-user-stories/`)
  - `launch-checklist` skill . Deliver phase (`skills/deliver-launch-checklist/`)
- Each skill includes SKILL.md, references/TEMPLATE.md, and references/EXAMPLE.md
- GitHub labels: `skill`, `phase-1`, `P0`
- GitHub milestone: v0.2.0 - P0 Core Skills
- GitHub issues #10-14 for skill tracking

### Changed
- Updated plan-v1.md Progress Tracker with GitHub issue links
- Updated CONTEXT.md to reflect Phase 1 completion

## [0.1.0] - 2026-01-14

### Added
- Initial project structure with agentic coding support
- Comprehensive README.md with badges, skills inventory, and platform compatibility matrix
- Apache 2.0 LICENSE
- CHANGELOG.md following Keep a Changelog format
- .gitignore with standard exclusions
- AGENTS/claude-opus-4.5/ folder for AI session continuity
  - CONTEXT.md . Project state tracking
  - TODO.md . Task management
  - DECISIONS.md . Technical decision log
  - SESSION-LOG/ . Session documentation
- PLANNING/ folder convention for collaboration artifacts (reviews, drafts, analysis)
- plan-v1-review.md . Comprehensive review of implementation plan
- v0.1 tag . Plan review milestone
- 9 GitHub issues for plan-v1.md improvement opportunities
- **Phase 0 Foundation Complete:**
  - CONTRIBUTING.md with curated contribution model
  - Full directory structure (`skills/`, `_bundles/`, `docs/`, `templates/`, `commands/`)
  - Schema documentation (`_docs/frontmatter-schema.yaml`)
  - Category reference (`_docs/categories.md`)
- Skill template structure (`docs/templates/skill-template/` with SKILL.md, TEMPLATE.md, EXAMPLE.md)
- wrap-session skill for end-of-session documentation workflow

### Changed
- Updated CONTEXT.md status from "Foundation complete" to "Foundation in progress (~40%)"
- Updated plan-v1.md Progress Tracker with inline status notes
- Fixed README.md roadmap to reflect accurate Phase 0 status
- **Phase 0 → 100% complete** . All foundation infrastructure now in place
- Updated README.md roadmap to show Phase 0 complete
- Expanded P1/P2 skill guidance in plan-v1.md (Issues #11-29)
- Updated example dates in templates to use `<YYYY-MM-DD>` placeholder
- Added PowerShell validation commands for Windows compatibility

### Fixed
- Pre-Flight Checklist path error in planning document
- VISION.md location inconsistency resolved
- Issue #1 conflict with existing files (added "skip if exists" note)

### Closed
- All 9 GitHub issues (#1-9) . plan improvements complete
