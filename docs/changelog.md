# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.8.0] - 2026-04-03 ([release notes](releases/Release_v2.8.0.md))

### Added
- **F-10: utility-pm-skill-validate skill** (#121) — second utility skill. Audits existing skills against structural conventions (mirroring CI) and LLM-assessed quality criteria. Produces a pipe-delimited validation report (`Report schema: v1`) with severity-graded findings (FAIL/WARN/INFO) and actionable recommendations with target file paths. Two-tier assessment rebaselined against shipped library conventions. Includes SKILL.md, TEMPLATE.md (report format), EXAMPLE.md (validated `deliver-prd`), `/pm-skill-validate` command, and AGENTS.md entry. Skill count: 27 → 28.
- **F-11: utility-pm-skill-iterate skill** (#122) — third utility skill. Applies targeted improvements to existing skills from feedback, validation reports, or convention changes. Unified flow with input normalization, before/after preview, stale-preview guard, version bump class suggestion (don't auto-write), and HISTORY.md creation at second-version trigger point. Includes SKILL.md, TEMPLATE.md (change summary), EXAMPLE.md (iterated `deliver-prd`), `/pm-skill-iterate` command, and AGENTS.md entry. Skill count: 28 → 29.
- **M-18: CI skill versioning validation** — two new advisory scripts following `.sh` + `.ps1` + `.md` convention: `validate-skill-history` (checks HISTORY.md tracks current frontmatter version) and `validate-skills-manifest` (checks release manifest entries match skill directories). Added to `validation.yml` with `continue-on-error: true`.
- **D-03: `docs/pm-skill-lifecycle.md`** — public guide explaining the Create → Validate → Iterate lifecycle with workflow patterns (new skill, improve existing, convention change, feedback loop), CI vs validator comparison, and quality standard model.
- **Governance: `docs/internal/skill-versioning.md`** — SemVer rules for skills, HISTORY.md contract, skills-manifest.yaml format, release checklist, and tie-breaker rule for gray-area version bump classification.
- `docs/internal/release-plans/v2.7.0/skills-manifest.yaml` — retroactive first use of the skills-manifest convention.
- `docs/internal/release-plans/v2.8.0/` — release governance with phased execution plan and Codex design review.

### Changed
- **D-04: public docs refresh for v2.8.0** — updated skill counts (29), command counts (30), utility skill breakdown (3), Skill Lifecycle Tools section in README and QUICKSTART, command table, AGENTS.md entries, AGENTS/claude/CONTEXT.md, `docs/pm-skill-anatomy.md` lifecycle cross-reference, and `scripts/README_SCRIPTS.md` with M-18 script documentation.
- `docs/internal/releases/` renamed to `docs/internal/release-plans/` with all internal references updated (34 files).
- `docs/internal/backlog-canonical.md` updated with v2.8.0 assignments (F-10, F-11, D-03, M-18, D-04).

### Release Notes
- Completes the **PM skill lifecycle**: Create (`/pm-skill-builder`, v2.7.0) → Validate (`/pm-skill-validate`) → Iterate (`/pm-skill-iterate`).
- First release with **skill versioning governance** — skills-manifest.yaml per release, HISTORY.md per skill (opt-in), SemVer tie-breaker rule.
- First release with **advisory CI for skill versioning** — HISTORY.md and skills-manifest.yaml validators.
- Repo now contains 29 skills (25 domain + 1 foundation + 3 utility), 30 command docs, and 3 workflow bundles.
- **MCP note**: `pm-skills-mcp` needs a re-embed to pick up both new skills. `utility-pm-skill-validate` → `pm_pm_skill_validate`. `utility-pm-skill-iterate` → `pm_pm_skill_iterate`.

## [2.7.0] - 2026-03-22 ([release notes](releases/Release_v2.7.0.md))

### Added
- **F-06: deliver-acceptance-criteria skill** (#114) — new Deliver phase skill for Given/When/Then acceptance criteria generation covering happy path, edge cases, error states, and non-functional criteria. Includes SKILL.md, TEMPLATE.md, EXAMPLE.md (e-commerce checkout scenario), `/acceptance-criteria` command, and AGENTS.md entry. Skill count: 25 → 26.
- **F-05: utility-pm-skill-builder skill** (#113) — first utility-classified skill. Interactive builder that guides contributors from a PM skill idea to a complete Skill Implementation Packet with gap analysis, Why Gate, classification, exemplar-driven drafting, and staging-to-promotion workflow. Includes SKILL.md, TEMPLATE.md, EXAMPLE.md (change-communication scenario), `/pm-skill-builder` command, and AGENTS.md Utility Skills section. Skill count: 26 → 27.
- **M-12: CI validation enhancement** (#112) — extended linter with description word count (20-100) and TEMPLATE.md header count (≥3) checks; new `validate-agents-md` script for AGENTS.md ↔ skill directory sync; new `check-mcp-impact` advisory script for MCP impact detection. All scripts follow `.sh + .ps1 + .md` convention.
- **M-16: exclude docs/internal from release ZIP** (#123) — release packagers (`build-release.sh` and `.ps1`) now strip `docs/internal/**` from staged artifacts. Internal governance docs stay tracked in-repo but no longer ship to end users.
- **D-01: `docs/pm-skill-anatomy.md`** — practical guide to pm-skills skill structure covering directory layout, classification types, frontmatter, Triple Diamond phases, wiring layer, and CI validation. Complements the spec-level `docs/agent-skill-anatomy.md`.
- `_staging/` added to `.gitignore` for pm-skill-builder draft artifacts.

### Changed
- **D-02: public docs review for v2.7.0** — updated skill counts (27), command counts (28), M-12 script documentation, domain/foundation/utility classification model, skill template modernization, frontmatter schema with utility example, and `docs/agent-skill-anatomy.md` scope note. Post-F-05 reconciliation patched 3 stale references.
- Fixed duplicate workflow steps in `validation.yml` (validate-agents-md and check-mcp-impact each ran twice).
- AGENTS.md gains a `### Utility Skills` section and `/pm-skill-builder` in the Commands table.
- `docs/internal/backlog-canonical.md` rewritten with Release, Status, and Agent columns.
- Release governance folders created for v2.2.0, v2.3.0, and v2.7.0 (v2.2.0 and v2.3.0 migrated from legacy locations).

### Removed
- `docs/internal/delivery-plan/` — legacy directory removed from tracking.
- `docs/internal/release-planning/` — legacy directory removed from tracking.

### Release Notes
- First release with a **utility** skill classification — `pm-skill-builder` creates new PM skills interactively.
- First release with enhanced CI: frontmatter linting, AGENTS.md sync validation, MCP impact detection.
- Release ZIPs now exclude `docs/internal/**` while preserving all public documentation.
- Repo now contains 27 skills (25 domain + 1 foundation + 1 utility), 28 command docs, and 3 workflow bundles.
- **MCP note**: `pm-skills-mcp` needs a re-embed to pick up both new skills. `deliver-acceptance-criteria` → `pm_acceptance_criteria`. `utility-pm-skill-builder` → `pm_pm_skill_builder` (double `pm_` is intentional — preserves skill name, consistent with future `pm_agent_skill_builder`). Update `embed-skills.js` to strip classification prefixes (`foundation-`, `utility-`) alongside phase prefixes.

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
- **MCP Alignment Milestone** — pm-skills-mcp v2.1.0 now fully aligned with flat structure
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

**PM-Skills v1.2.0 — Security & Community Infrastructure**

This release adds essential security policies, automated vulnerability scanning, and improved issue/PR templates for community contributions.

### Added
- **SECURITY.md** — Security policy with vulnerability reporting guidelines
- **CodeQL code scanning** — Automated security analysis via GitHub Actions (`.github/workflows/codeql.yml`)
- **Dependabot configuration** — Automated dependency updates for GitHub Actions and npm (`.github/dependabot.yml`)
- **Issue templates** — Structured forms for bug reports and feature requests
  - `bug_report.yml` — Skill-specific bug reporting with environment details
  - `feature_request.yml` — New skill and enhancement proposals
  - `config.yml` — Directs questions to Discussions, security issues to policy
- **Pull request template** — Standardized PR checklist (`.github/PULL_REQUEST_TEMPLATE.md`)

### Changed
- Issue creation now requires using templates (blank issues disabled)

### Security
- Enabled CodeQL scanning for JavaScript analysis on push, PR, and weekly schedule
- Added security policy with responsible disclosure guidelines

## [1.1.1] - 2026-01-20

### Added
- **CODE_OF_CONDUCT.md** — Contributor Covenant v2.1 for community guidelines
- **Attribution headers** — Added HTML comment attribution to all 24 SKILL.md files
- **Open-skills ecosystem submissions**
  - Submitted PR to [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills/pull/62)
  - Submitted to [n-skills marketplace](https://github.com/numman-ali/n-skills/issues/6)

### Changed
- **CONTRIBUTING.md** — Updated Code of Conduct section to link to dedicated CODE_OF_CONDUCT.md
- **README.md** — Updated openskills CLI installation section with accurate guidance
- **README.md** — Minor formatting cleanup (em dashes, navigation labels, alt text)

### Fixed
- **openskills#48 resolved** — [numman-ali/openskills#48](https://github.com/numman-ali/openskills/issues/48) fixed in openskills v1.3.1
  - Root cause: hardcoded `/` path separator failed on Windows
  - Verified: `anthropics/skills` now installs all 17 skills successfully
  - Note: pm-skills uses deeper nesting than openskills auto-discovers; Git clone recommended

## [1.1.0] - 2026-01-16

**PM-Skills v1.1.0 — Documentation & README Overhaul**

This release brings a comprehensive documentation expansion and a major README redesign following open-source best practices. The README now features better navigation, an FAQ section, and improved discoverability.

### Added
- **Comprehensive Documentation Expansion**
  - `docs/getting-started.md` — Detailed setup guide covering 5 installation methods
  - `docs/guides/using-skills.md` — Beginner to advanced usage guide with SPICE context framework, skill chaining, and 7 power-user patterns
  - `docs/guides/authoring-pm-skills.md` — Complete guide for creating and submitting new skills
  - `docs/frameworks/triple-diamond-delivery-process.md` — Triple Diamond methodology documentation
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
  - `.github/workflows/release.yml` — Automated ZIP creation on tag push
  - Creates two artifacts: full package + Claude.ai bundle
- **CLAUDE.md** — Agent instructions with documentation rules

### Changed
- **Documentation Reference Files Significantly Expanded**
  - `docs/reference/categories.md` — Expanded from 54 to 420+ lines with diagrams, workflows, and framework mappings
  - `docs/reference/frontmatter-schema.yaml` — Expanded from 91 to 600 lines with validation rules, examples, and best practices
- **New `/docs` Taxonomy Structure**
  - `docs/reference/` — Technical specifications (categories, schema)
  - `docs/guides/` — How-to guides (using-skills, authoring-pm-skills)
  - `docs/frameworks/` — Methodology documentation (triple-diamond)
- Renamed `_docs/` → `docs/` and `_templates/` → `templates/` for standard conventions
- README.md restructured following best-practices from Best-README-Template and amazing-github-template
- Updated README.md Quick Start with 4 installation options (Git clone recommended)
- Reordered installation methods based on openskills bug discovery
- Version badge updated to 1.1.0

### Fixed
- Discovered and documented [openskills#48](https://github.com/numman-ali/openskills/issues/48) — nested directory structure bug affecting pm-skills and anthropics/skills

## [1.0.1] - 2026-01-15

### Added
- **All 24 Slash Commands Complete** — Every skill now has a corresponding command
  - `/competitive-analysis` — Discover phase
  - `/interview-synthesis` — Discover phase
  - `/stakeholder-summary` — Discover phase
  - `/jtbd-canvas` — Define phase
  - `/opportunity-tree` — Define phase
  - `/adr` — Develop phase
  - `/design-rationale` — Develop phase
  - `/solution-brief` — Develop phase
  - `/spike-summary` — Develop phase
  - `/edge-cases` — Deliver phase
  - `/launch-checklist` — Deliver phase
  - `/release-notes` — Deliver phase
  - `/dashboard-requirements` — Measure phase
  - `/experiment-design` — Measure phase
  - `/experiment-results` — Measure phase
  - `/instrumentation-spec` — Measure phase
  - `/lessons-log` — Iterate phase
  - `/pivot-decision` — Iterate phase
  - `/refinement-notes` — Iterate phase
  - `/retrospective` — Iterate phase
- GitHub issues #43-62 created and closed for slash command tracking

### Changed
- Updated README.md Slash Commands section to list all 24 commands
- Updated AGENTS.md Commands section to list all 24 commands
- Updated plan-open-skills.md compatibility table to reflect slash commands complete

## [1.0.0] - 2026-01-14

**PM-Skills v1.0.0 — Complete Triple Diamond coverage is here!**

This release marks the completion of all 24 PM skills across the entire product development lifecycle. From discovery to iteration, PM-Skills now provides comprehensive coverage for product managers using AI assistants.

### Added
- **Phase 3 Complete: P2 Skills (11 skills) — All 24 skills now implemented!**
  - `competitive-analysis` skill — Discover phase (`skills/discover-competitive-analysis/`)
  - `stakeholder-summary` skill — Discover phase (`skills/discover-stakeholder-summary/`)
  - `opportunity-tree` skill — Define phase (`skills/define-opportunity-tree/`)
  - `jtbd-canvas` skill — Define phase (`skills/define-jtbd-canvas/`)
  - `design-rationale` skill — Develop phase (`skills/develop-design-rationale/`)
  - `dashboard-requirements` skill — Measure phase (`skills/measure-dashboard-requirements/`)
  - `experiment-results` skill — Measure phase (`skills/measure-experiment-results/`)
  - `retrospective` skill — Iterate phase (`skills/iterate-retrospective/`)
  - `lessons-log` skill — Iterate phase (`skills/iterate-lessons-log/`)
  - `refinement-notes` skill — Iterate phase (`skills/iterate-refinement-notes/`)
  - `pivot-decision` skill — Iterate phase (`skills/iterate-pivot-decision/`)
- Each skill includes SKILL.md, references/TEMPLATE.md, and references/EXAMPLE.md
- GitHub labels: `phase-3`, `P2`
- GitHub issues #26-36 for skill tracking
- **Phase 3 Infrastructure: Workflow Bundles**
  - `_bundles/triple-diamond.md` — Complete product development cycle guide
  - `_bundles/lean-startup.md` — Build-Measure-Learn rapid iteration guide
  - `_bundles/feature-kickoff.md` — Quick-start workflow for feature development
- **Phase 3 Infrastructure: Slash Commands**
  - `commands/prd.md` — Create Product Requirements Document
  - `commands/problem-statement.md` — Create problem statement
  - `commands/hypothesis.md` — Define testable hypothesis
  - `commands/user-stories.md` — Generate user stories
  - `commands/kickoff.md` — Run Feature Kickoff workflow
- **Phase 3 Infrastructure: Agent Discovery**
  - `AGENTS.md` — Universal agent discovery file listing all 24 skills
- **Phase 3 Infrastructure: GitHub Actions**
  - `.github/workflows/sync-agents-md.yml` — Auto-sync AGENTS.md on skill changes
  - `.github/workflows/release-zips.yml` — Package skills as ZIPs on release

### Changed
- Updated README.md Skills Inventory badge to 24/24 (complete)
- Updated README.md all skill status indicators to ✅
- Updated README.md roadmap to show Phase 3 P2 Skills complete
- Updated CONTEXT.md to reflect Phase 3 completion

## [0.3.0] - 2026-01-14

### Added
- **Phase 2 Complete: P1 Skills (8 skills)**
  - `interview-synthesis` skill — Discover phase (`skills/discover-interview-synthesis/`)
  - `solution-brief` skill — Develop phase (`skills/develop-solution-brief/`)
  - `spike-summary` skill — Develop phase (`skills/develop-spike-summary/`)
  - `adr` skill — Develop phase (`skills/develop-adr/`)
  - `edge-cases` skill — Deliver phase (`skills/deliver-edge-cases/`)
  - `release-notes` skill — Deliver phase (`skills/deliver-release-notes/`)
  - `experiment-design` skill — Measure phase (`skills/measure-experiment-design/`)
  - `instrumentation-spec` skill — Measure phase (`skills/measure-instrumentation-spec/`)
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
  - `problem-statement` skill — Define phase (`skills/define-problem-statement/`)
  - `hypothesis` skill — Define phase (`skills/define-hypothesis/`)
  - `prd` skill — Deliver phase (`skills/deliver-prd/`)
  - `user-stories` skill — Deliver phase (`skills/deliver-user-stories/`)
  - `launch-checklist` skill — Deliver phase (`skills/deliver-launch-checklist/`)
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
  - CONTEXT.md — Project state tracking
  - TODO.md — Task management
  - DECISIONS.md — Technical decision log
  - SESSION-LOG/ — Session documentation
- PLANNING/ folder convention for collaboration artifacts (reviews, drafts, analysis)
- plan-v1-review.md — Comprehensive review of implementation plan
- v0.1 tag — Plan review milestone
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
- **Phase 0 → 100% complete** — All foundation infrastructure now in place
- Updated README.md roadmap to show Phase 0 complete
- Expanded P1/P2 skill guidance in plan-v1.md (Issues #11-29)
- Updated example dates in templates to use `<YYYY-MM-DD>` placeholder
- Added PowerShell validation commands for Windows compatibility

### Fixed
- Pre-Flight Checklist path error in planning document
- VISION.md location inconsistency resolved
- Issue #1 conflict with existing files (added "skip if exists" note)

### Closed
- All 9 GitHub issues (#1-9) — plan improvements complete
