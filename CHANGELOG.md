# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
  - `competitive-analysis` skill — Discover phase (`skills/discover/competitive-analysis/`)
  - `stakeholder-summary` skill — Discover phase (`skills/discover/stakeholder-summary/`)
  - `opportunity-tree` skill — Define phase (`skills/define/opportunity-tree/`)
  - `jtbd-canvas` skill — Define phase (`skills/define/jtbd-canvas/`)
  - `design-rationale` skill — Develop phase (`skills/develop/design-rationale/`)
  - `dashboard-requirements` skill — Measure phase (`skills/measure/dashboard-requirements/`)
  - `experiment-results` skill — Measure phase (`skills/measure/experiment-results/`)
  - `retrospective` skill — Iterate phase (`skills/iterate/retrospective/`)
  - `lessons-log` skill — Iterate phase (`skills/iterate/lessons-log/`)
  - `refinement-notes` skill — Iterate phase (`skills/iterate/refinement-notes/`)
  - `pivot-decision` skill — Iterate phase (`skills/iterate/pivot-decision/`)
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
  - `interview-synthesis` skill — Discover phase (`skills/discover/interview-synthesis/`)
  - `solution-brief` skill — Develop phase (`skills/develop/solution-brief/`)
  - `spike-summary` skill — Develop phase (`skills/develop/spike-summary/`)
  - `adr` skill — Develop phase (`skills/develop/adr/`)
  - `edge-cases` skill — Deliver phase (`skills/deliver/edge-cases/`)
  - `release-notes` skill — Deliver phase (`skills/deliver/release-notes/`)
  - `experiment-design` skill — Measure phase (`skills/measure/experiment-design/`)
  - `instrumentation-spec` skill — Measure phase (`skills/measure/instrumentation-spec/`)
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
  - `problem-statement` skill — Define phase (`skills/define/problem-statement/`)
  - `hypothesis` skill — Define phase (`skills/define/hypothesis/`)
  - `prd` skill — Deliver phase (`skills/deliver/prd/`)
  - `user-stories` skill — Deliver phase (`skills/deliver/user-stories/`)
  - `launch-checklist` skill — Deliver phase (`skills/deliver/launch-checklist/`)
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
  - Full directory structure (`skills/`, `_bundles/`, `_docs/`, `_templates/`, `commands/`, `releases/`)
  - Schema documentation (`_docs/frontmatter-schema.yaml`)
  - Category reference (`_docs/categories.md`)
  - Skill template structure (`_templates/skill-template/` with SKILL.md, TEMPLATE.md, EXAMPLE.md)
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
- Pre-Flight Checklist path error in plan-v1.md (was "root", now "_NOTES/v1-plan/")
- VISION.md location inconsistency (now references `_NOTES/VISION.md`)
- Issue #1 conflict with existing files (added "skip if exists" note)

### Closed
- All 9 GitHub issues (#1-9) — plan improvements complete
