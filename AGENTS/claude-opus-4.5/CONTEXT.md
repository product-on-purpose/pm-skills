# Project Context

## Current State

**Status:** Post-v1.2.0 — README cross-linking with pm-skills-mcp complete
**Last Updated:** 2026-01-21
**Release:** [v1.2.0](https://github.com/product-on-purpose/pm-skills/releases/tag/v1.2.0)
**Next Step:** Consider v1.2.1 release for documentation + cross-linking updates

## Project Overview

PM-Skills is an open source collection of Product Management skills for AI agents. Skills are reusable instruction sets that help AI assistants produce high-quality PM artifacts—PRDs, problem statements, user stories, experiment designs, and more.

**V1 Scope:** Complete Triple Diamond framework coverage (24 skills across 6 phases) ✅

## Key Files

- `README.md` — Comprehensive project overview with badges, skills inventory, quick start guides
- `CHANGELOG.md` — Version history (Keep a Changelog format)
- `LICENSE` — Apache 2.0 license
- `CONTRIBUTING.md` — Contribution guidelines with curated model
- `_NOTES/VISION.md` — Detailed vision document with full roadmap
- `_NOTES/v1-plan/plan-v1.md` — Implementation plan with 35 issues

## Architecture

```
pm-skills/
├── skills/               # PM skills organized by Triple Diamond phase
│   ├── discover/         # Research: interview-synthesis, competitive-analysis, stakeholder-summary
│   ├── define/           # Problem framing: problem-statement, hypothesis, opportunity-tree, jtbd-canvas
│   ├── develop/          # Solutions: solution-brief, spike-summary, adr, design-rationale
│   ├── deliver/          # Specification: prd, user-stories, edge-cases, launch-checklist, release-notes
│   ├── measure/          # Validation: experiment-design, instrumentation-spec, dashboard-requirements, experiment-results
│   └── iterate/          # Learning: retrospective, lessons-log, refinement-notes, pivot-decision
├── _bundles/             # Workflow documentation (triple-diamond, lean-startup, feature-kickoff)
├── docs/                 # Comprehensive documentation
│   ├── getting-started.md # Quick setup guide
│   ├── reference/        # Technical specs (categories.md, frontmatter-schema.yaml)
│   ├── guides/           # How-to guides (using-skills.md, authoring-pm-skills.md)
│   └── frameworks/       # Methodology docs (triple-diamond-delivery-process.md)
├── templates/            # Skill creation templates
│   └── skill-template/   # SKILL.md, TEMPLATE.md, EXAMPLE.md
├── commands/             # Claude Code slash commands
├── AGENTS/               # AI agent session continuity
│   └── claude-opus-4.5/
│       ├── CONTEXT.md    # Project state (this file)
│       ├── DECISIONS.md  # Technical decisions (ADR format)
│       ├── TODO.md       # Task tracking
│       ├── SESSION-LOG/  # Session summaries
│       └── PLANNING/     # Working collaboration artifacts
├── AGENTS.md             # Universal agent discovery (to be generated)
└── CONTRIBUTING.md       # Contribution guidelines
```

## Recent Work

- **README Cross-Linking with pm-skills-mcp** (2026-01-21)
  - Added MCP badge and callout in README header linking to pm-skills-mcp
  - Updated Platform Compatibility table with MCP links for Claude Desktop, Cursor
  - Added "Any MCP Client" row with protocol-level access
  - Added new MCP Server quick start section (collapsible)
  - Added Related Projects section explaining pm-skills vs pm-skills-mcp
  - Added FAQ entry: "What's the difference between pm-skills and pm-skills-mcp?"
  - Part of cross-linking initiative to clarify ecosystem relationship

- **Ecosystem & MCP Integration Documentation** (2026-01-21)
  - Created `docs/reference/ecosystem.md` — comprehensive ecosystem overview ([#94](https://github.com/product-on-purpose/pm-skills/issues/94))
    - Explains pm-skills vs pm-skills-mcp relationship
    - Decision matrix for choosing between approaches
    - Feature comparison table
    - Integration patterns (file-based, MCP-based, hybrid)
    - Customization workflow and version compatibility
  - Created `docs/guides/mcp-integration.md` — MCP integration guide ([#95](https://github.com/product-on-purpose/pm-skills/issues/95))
    - Quick start for Claude Desktop, Claude Code, Cursor, VS Code
    - Complete tool inventory (24 skill + 5 workflow + 6 utility tools)
    - Slash command to MCP tool mapping table
    - Customization and troubleshooting sections
  - Updated README.md with links to new documentation
  - Updated project structure documentation references

- **README Platform Compatibility & Getting Started Enhancements** (2026-01-20)
  - Expanded "Works for..." section with comprehensive platform compatibility table
  - Added status indicators (✅ Native, 🔶 Manual) for 10+ platforms
  - Added collapsible "Quick Start by Platform" sections for each platform
  - Cross-referenced PM-Skills MCP for programmatic access
  - Streamlined "Getting Started" section with Installation Options table
  - Aligned documentation style with pm-skills-mcp README

- **README Restructure & Project Structure Documentation** (2026-01-20)
  - Restructured README.md headings for better scannability:
    - "Forward March!" → "Project Status"
    - Contributing elevated to H2 with subsections
    - Created "About" section wrapping Author and License
    - "More Suggestions" → "Community"
  - Added Project Structure tree diagram to README.md
  - Created `docs/reference/project-structure.md` with comprehensive file/folder hierarchy
  - Updated FAQ: clarified openskills CLI question (bug resolved, structural limitation remains)
  - Updated pm-skills-mcp README.md to mirror same structure

- **v1.2.0 Released — Security & Community Infrastructure** (2026-01-20)
  - Added SECURITY.md with vulnerability reporting guidelines
  - Added CodeQL code scanning workflow (`.github/workflows/codeql.yml`)
  - Added Dependabot configuration for GitHub Actions and npm updates
  - Added issue templates: bug_report.yml, feature_request.yml, config.yml
  - Added pull request template with contribution checklist
  - Blank issues now disabled (must use templates)
  - Created open-source repo config guide at jpkb
  - Audited pm-skills against GitHub best practices (57% → targeting 85%+)
  - Remaining manual tasks: enable secret scanning, create tag ruleset

- **openskills #48 Resolved** (2026-01-20)
  - Bug fix released in openskills v1.3.1 (now at v1.5.0)
  - Root cause: hardcoded '/' path separator failed on Windows
  - Verified: `anthropics/skills` now installs all 17 skills successfully
  - Note: pm-skills 24 skills not auto-discovered (openskills looks in `.claude/skills/`, not `skills/phase/`)
  - Git clone remains the recommended installation method for pm-skills

- **Open-Skills Submissions Complete** (2026-01-17)
  - Submitted PR to awesome-claude-skills: [PR #62](https://github.com/ComposioHQ/awesome-claude-skills/pull/62)
  - Submitted to n-skills marketplace: [Issue #6](https://github.com/numman-ali/n-skills/issues/6)
  - Both submissions awaiting review (24-48 hours typical)

- **Open-Skills Preparation** (2026-01-16)
  - Added attribution headers to all 24 SKILL.md files (HTML comments)
  - Created dedicated PR guide: `_NOTES/efforts/open-skills/plan-pr--awesome-claude-skills.md`
  - Added CODE_OF_CONDUCT.md (Contributor Covenant v2.1)
  - Updated CONTRIBUTING.md to link to Code of Conduct
  - GitHub Discussions enabled, repository topics added
  - Ready for awesome-claude-skills PR submission

- **Documentation Expansion** (2026-01-16)
  - Verified accuracy of `docs/reference/categories.md` and `frontmatter-schema.yaml` — all 24 skills validated
  - Reorganized `/docs` with new taxonomy: `reference/`, `guides/`, `frameworks/`
  - Expanded `categories.md` from 54 → 420+ lines with diagrams, workflows, framework mappings
  - Expanded `frontmatter-schema.yaml` from 91 → 600 lines with validation rules, examples, best practices
  - Created `docs/reference/getting-started.md` — comprehensive setup guide for 5 methods (~600 lines)
  - Created `docs/guides/using-skills.md` — beginner to advanced usage guide (~750 lines)
  - Created `docs/guides/authoring-pm-skills.md` — skill creation and submission guide (~850 lines)
  - Verified all framework claims in README are accurate (Teresa Torres, Christensen, Nygard)

- **v1.0.2 Release & Cleanup** (2026-01-15)
  - Created v1.0.2 tag — release workflow ran successfully
  - Both ZIP artifacts created: pm-skills-v1.0.2.zip, pm-skills-claude-v1.0.2.zip
  - Renamed `_docs/` → `docs/` and `_templates/` → `templates/` for standard conventions
  - Created CLAUDE.md with documentation rules (never reference `_NOTES/` in public docs)
  - Cleaned `_NOTES/` references from CHANGELOG.md and CONTRIBUTING.md
  - Updated manual submission guide with copy-paste ready content
  - Ready for manual PR to awesome-claude-skills

- **Open-Skills Ecosystem Integration** (2026-01-15)
  - Created detailed execution plan for publishing to open-skills ecosystem
  - Tested openskills CLI — discovered bug with nested directories ([#48](https://github.com/numman-ali/openskills/issues/48))
  - Verified bug affects Anthropic's official `anthropics/skills` repo too
  - Updated README.md with accurate installation instructions (Git clone recommended)
  - Added "See It In Action" section to README.md
  - Created GitHub release workflow (`.github/workflows/release.yml`)
  - Prepared PR content for awesome-claude-skills submission
  - Prepared submission content for n-skills marketplace
  - Documentation at `_NOTES/efforts/open-skills/`

- **All 24 Slash Commands COMPLETE** (2026-01-15)
  - Created 20 missing slash commands in `commands/` directory:
    - Discover: `/competitive-analysis`, `/interview-synthesis`, `/stakeholder-summary`
    - Define: `/jtbd-canvas`, `/opportunity-tree`
    - Develop: `/adr`, `/design-rationale`, `/solution-brief`, `/spike-summary`
    - Deliver: `/edge-cases`, `/launch-checklist`, `/release-notes`
    - Measure: `/dashboard-requirements`, `/experiment-design`, `/experiment-results`, `/instrumentation-spec`
    - Iterate: `/lessons-log`, `/pivot-decision`, `/refinement-notes`, `/retrospective`
  - GitHub issues #43-62 created and closed
  - Updated README.md, AGENTS.md, CHANGELOG.md with complete command list
  - Version bumped to v1.0.1

- **Phase 3 P2 Skills COMPLETE** (2026-01-14)
  - Created 11 P2 Skills with SKILL.md, TEMPLATE.md, EXAMPLE.md each:
    - `skills/discover/competitive-analysis/` — [GitHub #26](https://github.com/product-on-purpose/pm-skills/issues/26)
    - `skills/discover/stakeholder-summary/` — [GitHub #27](https://github.com/product-on-purpose/pm-skills/issues/27)
    - `skills/define/opportunity-tree/` — [GitHub #28](https://github.com/product-on-purpose/pm-skills/issues/28)
    - `skills/define/jtbd-canvas/` — [GitHub #29](https://github.com/product-on-purpose/pm-skills/issues/29)
    - `skills/develop/design-rationale/` — [GitHub #30](https://github.com/product-on-purpose/pm-skills/issues/30)
    - `skills/measure/dashboard-requirements/` — [GitHub #31](https://github.com/product-on-purpose/pm-skills/issues/31)
    - `skills/measure/experiment-results/` — [GitHub #32](https://github.com/product-on-purpose/pm-skills/issues/32)
    - `skills/iterate/retrospective/` — [GitHub #33](https://github.com/product-on-purpose/pm-skills/issues/33)
    - `skills/iterate/lessons-log/` — [GitHub #34](https://github.com/product-on-purpose/pm-skills/issues/34)
    - `skills/iterate/refinement-notes/` — [GitHub #35](https://github.com/product-on-purpose/pm-skills/issues/35)
    - `skills/iterate/pivot-decision/` — [GitHub #36](https://github.com/product-on-purpose/pm-skills/issues/36)
  - Created GitHub labels: `phase-3`, `P2`
  - All 11 issues closed

- **Phase 2 COMPLETE** (2026-01-14)
  - Created 8 P1 Skills with SKILL.md, TEMPLATE.md, EXAMPLE.md each:
    - `skills/discover/interview-synthesis/` — [GitHub #18](https://github.com/product-on-purpose/pm-skills/issues/18)
    - `skills/develop/solution-brief/` — [GitHub #19](https://github.com/product-on-purpose/pm-skills/issues/19)
    - `skills/develop/spike-summary/` — [GitHub #20](https://github.com/product-on-purpose/pm-skills/issues/20)
    - `skills/develop/adr/` — [GitHub #21](https://github.com/product-on-purpose/pm-skills/issues/21)
    - `skills/deliver/edge-cases/` — [GitHub #22](https://github.com/product-on-purpose/pm-skills/issues/22)
    - `skills/deliver/release-notes/` — [GitHub #23](https://github.com/product-on-purpose/pm-skills/issues/23)
    - `skills/measure/experiment-design/` — [GitHub #24](https://github.com/product-on-purpose/pm-skills/issues/24)
    - `skills/measure/instrumentation-spec/` — [GitHub #25](https://github.com/product-on-purpose/pm-skills/issues/25)
  - Created GitHub labels: `phase-2`, `P1`
  - Created GitHub milestone: v0.3.0 - P1 Skills
  - All 8 issues closed

- **Phase 1 COMPLETE** (2026-01-14)
  - Created 5 P0 Core Skills with SKILL.md, TEMPLATE.md, EXAMPLE.md each:
    - `skills/define/problem-statement/` — [GitHub #10](https://github.com/product-on-purpose/pm-skills/issues/10)
    - `skills/define/hypothesis/` — [GitHub #11](https://github.com/product-on-purpose/pm-skills/issues/11)
    - `skills/deliver/prd/` — [GitHub #12](https://github.com/product-on-purpose/pm-skills/issues/12)
    - `skills/deliver/user-stories/` — [GitHub #13](https://github.com/product-on-purpose/pm-skills/issues/13)
    - `skills/deliver/launch-checklist/` — [GitHub #14](https://github.com/product-on-purpose/pm-skills/issues/14)
  - Created GitHub labels: `skill`, `phase-1`, `P0`
  - Created GitHub milestone: v0.2.0 - P0 Core Skills

- **Phase 0 COMPLETE** (2026-01-14)
  - Created CONTRIBUTING.md with curated contribution model
  - Built full directory structure with .gitkeep files
  - Created `docs/frontmatter-schema.yaml`
  - Created `docs/categories.md`
  - Created `templates/skill-template/` with SKILL.md, TEMPLATE.md, EXAMPLE.md
  - Verified VISION.md at `_NOTES/VISION.md`
  - GitHub issues #1-9 closed (plan review fixes)

## Recent Infrastructure (2026-01-15)

- **Slash Commands Complete (25 total):**
  - All 24 skills have corresponding slash commands
  - 1 bundle command: `/kickoff`
- **Workflow Bundles Complete:**
  - `_bundles/triple-diamond.md` — Complete product development cycle
  - `_bundles/lean-startup.md` — Build-Measure-Learn rapid iteration
  - `_bundles/feature-kickoff.md` — Quick-start workflow for features
- **Agent Discovery:**
  - `AGENTS.md` — Universal agent discovery file with all commands listed
- **GitHub Actions:**
  - `.github/workflows/sync-agents-md.yml` — Auto-sync on skill changes
  - `.github/workflows/release-zips.yml` — Package ZIPs on release

## Next Steps

1. **v1.2.0 Security Follow-up (Manual GitHub Settings):**
   - [ ] Enable secret scanning (Settings → Code security)
   - [ ] Enable secret scanning push protection
   - [ ] Create tag ruleset for `v*` releases
   - [ ] Verify Dependabot alerts are enabled

2. **Open-Skills Publishing (Submissions Complete):**
   - [x] Submit PR to awesome-claude-skills — [PR #62](https://github.com/ComposioHQ/awesome-claude-skills/pull/62) ✅
   - [x] Submit to n-skills marketplace — [Issue #6](https://github.com/numman-ali/n-skills/issues/6) ✅
   - [x] Create GitHub release v1.2.0 ✅
   - [x] Attribution headers added to all SKILL.md files ✅
   - [x] CODE_OF_CONDUCT.md added ✅
   - [x] SECURITY.md added ✅
   - [x] Issue templates added ✅
   - [x] PR template added ✅
   - [ ] Monitor awesome-claude-skills PR for merge (add badge after)
   - [ ] Monitor n-skills issue for approval
   - [x] openskills#48 fixed in v1.3.1 — Windows path separator issue resolved ✅

3. **Post-Merge:**
   - Add awesome-claude-skills badge to README.md
   - Announce release (Twitter, LinkedIn, Product Hunt)
   - Monitor for user feedback and issues
   - Claude Code marketplace submission (when available)

4. **v1.3.0 Candidates:**
   - Validation CI workflow (check skill structure in PRs)
   - Auto-generated header for AGENTS.md
   - MCP server package (pm-skills-mcp)
   - CODEOWNERS file

## Notes

- Follows [Agent Skills Specification](https://agentskills.io/specification)
- Primary Audience: Individual Product Managers using AI assistants
- Cross-platform: Claude Code, Claude.ai, GitHub Copilot, Cursor, Windsurf, OpenCode
- Implementation plan is in `_NOTES/v1-plan/plan-v1.md` with detailed issue-by-issue guidance
- All 24 skills are now complete!

## Skills Inventory (24/24 Complete)

### Discover Phase (3 skills)

| Skill | Category | Priority | Status |
|-------|----------|----------|--------|
| interview-synthesis | research | P1 | ✅ Complete |
| competitive-analysis | research | P2 | ✅ Complete |
| stakeholder-summary | research | P2 | ✅ Complete |

### Define Phase (4 skills)

| Skill | Category | Priority | Status |
|-------|----------|----------|--------|
| problem-statement | problem-framing | P0 | ✅ Complete |
| hypothesis | ideation | P0 | ✅ Complete |
| opportunity-tree | problem-framing | P2 | ✅ Complete |
| jtbd-canvas | problem-framing | P2 | ✅ Complete |

### Develop Phase (4 skills)

| Skill | Category | Priority | Status |
|-------|----------|----------|--------|
| solution-brief | ideation | P1 | ✅ Complete |
| spike-summary | coordination | P1 | ✅ Complete |
| adr | specification | P1 | ✅ Complete |
| design-rationale | specification | P2 | ✅ Complete |

### Deliver Phase (5 skills)

| Skill | Category | Priority | Status |
|-------|----------|----------|--------|
| prd | specification | P0 | ✅ Complete |
| user-stories | specification | P0 | ✅ Complete |
| edge-cases | specification | P1 | ✅ Complete |
| launch-checklist | coordination | P0 | ✅ Complete |
| release-notes | coordination | P1 | ✅ Complete |

### Measure Phase (4 skills)

| Skill | Category | Priority | Status |
|-------|----------|----------|--------|
| experiment-design | validation | P1 | ✅ Complete |
| instrumentation-spec | validation | P1 | ✅ Complete |
| dashboard-requirements | validation | P2 | ✅ Complete |
| experiment-results | reflection | P2 | ✅ Complete |

### Iterate Phase (4 skills)

| Skill | Category | Priority | Status |
|-------|----------|----------|--------|
| retrospective | reflection | P2 | ✅ Complete |
| lessons-log | reflection | P2 | ✅ Complete |
| refinement-notes | coordination | P2 | ✅ Complete |
| pivot-decision | reflection | P2 | ✅ Complete |
