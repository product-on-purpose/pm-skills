# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- No unreleased entries yet.

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
  - `B-02` phase 1 (observe-only sync validation),
  - `B-07` planning persistence policy baseline,
  - `B-08` canonical backlog governance baseline.

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
