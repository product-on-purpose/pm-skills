# Project Context

## Current State

**Status:** v2.8.2 released — v2.9.0 planning complete, ready for execution
**Last Updated:** 2026-04-06
**Release:** [v2.8.2](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.8.2) (current)
**MCP:** [pm-skills-mcp v2.8.0](https://github.com/product-on-purpose/pm-skills-mcp/releases/tag/v2.8.0) synced
**Next Step:** Execute v2.9.0 — Commit 1 (M-19: rename bundles→workflows), then Commit 2 (F-13: 6 new workflows)

## Project Overview

PM-Skills is an open source collection of Product Management skills for AI agents. Skills are reusable instruction sets that help AI assistants produce high-quality PM artifacts—PRDs, problem statements, user stories, experiment designs, and more.

**V1 Scope:** Complete Triple Diamond framework coverage (24 skills across 6 phases) ✅

## Key Files

- `README.md` — Comprehensive project overview with badges, skills inventory, quick start guides
- `CHANGELOG.md` — Version history (Keep a Changelog format)
- `LICENSE` — Apache 2.0 license
- `CONTRIBUTING.md` — Contribution guidelines with curated model
- `(internal-notes)/VISION.md` — Detailed vision document with full roadmap
- `(internal-notes)/v1-plan/plan-v1.md` — Implementation plan with 35 issues

## Architecture (v2.0+ Flat Structure)

```
pm-skills/
├── skills/               # PM skills — FLAT structure (v2.0+)
│   ├── define-hypothesis/
│   ├── define-problem-statement/
│   ├── deliver-prd/
│   ├── deliver-user-stories/
│   └── ...               # 30 skills total: {phase/classification}-{skill}/
├── _workflows/           # 9 Workflows (triple-diamond, lean-startup, feature-kickoff, and 6 more)
├── commands/             # Claude Code slash commands (37 total: 30 skill + 7 workflow)
├── docs/                 # Documentation
│   ├── guides/           # How-to guides
│   ├── reference/        # Technical specs
│   ├── frameworks/       # Methodology docs
│   └── templates/        # Skill creation templates
├── library/              # Curated output libraries
│   └── skill-output-samples/  # 95 sample outputs across 25 skills
├── .claude-plugin/       # Claude plugin manifest (plugin.json)
├── scripts/              # Build and validation scripts
│   ├── build-release.sh  # Create versioned ZIP
│   ├── sync-claude.sh    # Sync to .claude/ for discovery
│   ├── validate-commands.sh
│   ├── validate-agents-md.sh  # AGENTS.md ↔ skill directory sync (M-12)
│   ├── check-mcp-impact.sh   # Advisory MCP impact detection (M-12)
│   └── lint-skills-frontmatter.sh
├── .github/workflows/    # CI/CD
│   ├── validation.yml    # Runs on Ubuntu + Windows
│   ├── release.yml       # Create releases on tag
│   └── release-zips.yml  # Package ZIP artifacts
├── AGENTS/               # AI agent session continuity
│   └── claude/
│       ├── CONTEXT.md    # Project state (this file)
│       ├── DECISIONS.md  # Technical decisions
│       ├── SESSION-LOG/  # Session summaries
│       └── PLANNING/     # Working artifacts
├── AGENTS.md             # Universal agent discovery
└── README.md, CHANGELOG.md, CONTRIBUTING.md
```

## Recent Work

- **v2.9.0 Planning Complete** (2026-04-06)
  - **Theme**: Rename "bundles" to "workflows" + expand from 3 to 9 guided multi-skill workflows
  - **M-19**: Rename `_bundles/` → `_workflows/`, ~400 references across ~100 files, delete `/kickoff`, add `/workflow-feature-kickoff`, URL redirects, terminology guard
  - **F-13**: 6 new workflows (Customer Discovery, Sprint Planning, Product Strategy, Post-Launch Learning, Stakeholder Alignment, Technical Discovery) with `/workflow-` prefixed commands
  - **Two-commit strategy**: Commit 1 = M-19 rename (single atomic commit), Commit 2 = F-13 expansion
  - **MCP**: Source-level API refactor deferred to companion release (non-breaking, `pm_workflow_*` tool names unchanged)
  - **Codex reviews**: M-19 plan reviewed (13 findings, all addressed), v2.9.0 release plan reviewed (8 findings, all addressed)
  - **Plans**: `docs/internal/release-plans/v2.9.0/plan_v2.9.0.md` (master), `docs/internal/efforts/M-19-bundles-to-workflows/plan_bundles-to-workflows.md` (detailed rename)
  - **Key decisions**: delete `/kickoff` (no alias), terminology guard advisory→FAIL post-v2.9.0, release notes draft in Commit 1
  - Repo at v2.9.0: 30 skills, 37 commands, 9 workflows

- **v2.8.2 Released** (2026-04-04)
  - Versioning concepts page, git-revision-date plugin, custom CSS, F-12 effort brief
  - Documentation-only release

- **v2.8.1 Released** (2026-04-04)
  - MkDocs Material documentation site launch with showcase, skill pages, prompt gallery
  - Documentation-only release

- **v2.8.0 Released** (2026-04-03)
  - **Theme**: Complete the PM skill lifecycle — Create → Validate → Iterate
  - **F-10**: `utility-pm-skill-validate` — audits skills against structural conventions and quality criteria, pipe-delimited report format (`Report schema: v1`), two-tier assessment rebaselined against shipped library (`1398835`)
  - **F-11**: `utility-pm-skill-iterate` — applies targeted improvements from feedback or validation reports, before/after preview with stale-preview guard, version bump suggestion, HISTORY.md creation at trigger point (`2f6577e`)
  - **M-18**: CI validation scripts — `validate-skill-history` + `validate-skills-manifest` (advisory, Codex implementation) (`c099efa`)
  - **D-03**: `docs/pm-skill-lifecycle.md` — public lifecycle guide with 4 workflow patterns (`f678344`)
  - **D-04**: Public docs refresh — counts (29 skills, 30 commands), Skill Lifecycle Tools sections in README/QUICKSTART, mermaid diagrams across 7 files, command files, AGENTS.md entries
  - **Governance**: `docs/internal/skill-versioning.md` — SemVer rules, HISTORY.md contract, skills-manifest.yaml format, tie-breaker rule
  - **Infrastructure**: `docs/internal/releases/` renamed to `docs/internal/release-plans/`
  - **Codex review**: Full design review with 20 findings (3 blockers resolved), pre-release consistency review with 8 findings (all fixed)
  - **MCP synced**: pm-skills-mcp v2.8.0 — `pm_pm_skill_validate` + `pm_pm_skill_iterate`, 42 tools (29 skills + 5 workflows + 8 utilities)
  - Repo: 30 skills (25 domain + 1 foundation + 4 utility), 37 commands, 9 workflows

- **v2.7.0 Released** (2026-03-22)
  - **M-12**: CI validation enhancement — extended linter, validate-agents-md, check-mcp-impact (`8d2a418`)
  - **F-06**: deliver-acceptance-criteria skill — Given/When/Then, e-commerce checkout example (`8d2a418`)
  - **M-16**: exclude `docs/internal/**` from release ZIP (`0c2e637`)
  - **F-05**: utility-pm-skill-builder — first utility skill, interactive builder with gap analysis, Why Gate, staging workflow (`3c50108`..`a67f144`). Codex design + implementation reviews both approved.
  - **D-01**: `docs/pm-skill-anatomy.md` — practical guide to skill structure (`b478276`)
  - **D-02**: 14 public docs updated for v2.7.0 accuracy, post-F-05 reconciliation (`12a30a9`)
  - **MCP synced**: pm-skills-mcp v2.7.0 — `pm_acceptance_criteria` + `pm_pm_skill_builder`
  - **MCP sync docs**: maintainer workflow added to `docs/guides/mcp-integration.md`
  - **Release governance**: v2.2.0-v2.7.0 folders, decisions log, detailed release notes
  - **Issues closed**: #112, #113, #114, #123
  - Repo: 27 skills (25 domain + 1 foundation + 1 utility), 28 commands, 3 workflows

- **v2.6.1 Shipped — Sample Library Recovery** (2026-03-04)
  - Sample output library moved and normalized to `library/skill-output-samples/`
  - 95 sample outputs across 25 skills, with `SAMPLE_CREATION.md` standards
  - Release packaging (`build-release.sh`/`.ps1`) now includes sample-library content
  - Release note: `docs/releases/Release_v2.6.1.md`

- **v2.6.0 Shipped — Claude Plugin Manifest** (2026-03-04)
  - Added `.claude-plugin/plugin.json` for Claude plugin packaging
  - Plugin packaging validation workflow: `.github/workflows/validate-plugin.yml`
  - Release packaging enforces plugin-manifest version parity
  - Release note: `docs/releases/Release_v2.6.0.md`

- **v2.5.2 Shipped — Public Doc Hygiene** (2026-03-04)
  - Rewrote release-facing docs for clearer user-first language
  - Removed internal decision-ID references from public release artifacts

- **v2.5.1 Shipped — Agent Workspace Canonicalization** (2026-03-04)
  - Canonicalized Claude agent workspace to `AGENTS/claude/` (retired `AGENTS/claude-opus*` paths)
  - Added clean-worktree release runbook: `docs/internal/release-plans/runbook_clean-worktree-cut-tag-publish.md`

- **v2.5.0 Shipped — Foundation Persona Skill** (2026-03-02)
  - New `skills/foundation-persona/` skill + references
  - New `/persona` command at `commands/persona.md`
  - AGENTS discovery updated for foundation classification
  - Persona archetype library and MCP exposure deferred to v2.7.0

- **v2.4.x Series — Contract Lock & Governance** (2026-02-16)
  - v2.4.0: Output behavior contract and config/schema lock closed as aligned
  - v2.4.1: Release-doc consistency finalization
  - v2.4.2: Canonical delivery-plan policy and v2.5 continuity kickoff; legacy internal docs archived
  - v2.4.3: Release metadata rolled forward; published-artifact links captured
  - Expanded `validate-mcp-sync` with pin metadata and contract-version parity checks
  - Canonical backlog and delivery-plan governance established at `docs/internal/`

- **v2.3.0 Shipped — MCP Sync Blocking Mode** (2026-02-14)
  - Switched `.github/workflows/validate-mcp-sync.yml` to blocking-default mode
  - Release note: `docs/releases/Release_v2.3.md`

- **v2.2.0 Shipped — Guardrails & Governance** (2026-02-13)
  - MCP drift checker script and observe-only workflow
  - Planning persistence policy and canonical backlog governance
  - Release execution artifacts and checklists for v2.2–v2.5

- **v2.1.0 Released — MCP Alignment Complete** (2026-01-28)
  - Executed full v2.1 plan for both pm-skills and pm-skills-mcp
  - **pm-skills-mcp v2.1.0:**
    - Updated `embed-skills.js` for flat source layout
    - Updated `loader.ts` to read phase from frontmatter
    - Flattened resource URIs: `pm-skills://skills/{skill}`
    - Added `deriveToolName()` in `server.ts` for stable tool names
    - Updated workflow skill lookups for new naming
    - All 66 tests passing
    - Published to npm: `pm-skills-mcp@2.1.0`
    - Created GitHub release with v2.1.0 tag
    - Fixed: Removed personal `.claude/` directory from tracking (40 files)
  - **pm-skills v2.1.0:**
    - Updated `docs/reference/ecosystem.md` with version alignment table
    - Updated `docs/guides/mcp-integration.md` with v2.1 notes
    - Updated CHANGELOG with MCP alignment milestone
    - Created GitHub release with v2.1.0 tag

- **v2.1 Execution Plan Created** (2026-01-27)
  - Created comprehensive v2.1 execution plan
  - Key decisions: flat URIs, stable tool names, frontmatter-based phase

- **v2.0.2 Released** (2026-01-27)
  - Validation workflow added (`validation.yml`) — runs on Ubuntu and Windows
  - Front-matter lint scripts created (`lint-skills-frontmatter.sh/ps1`)
  - Metadata cleanup: removed nested `metadata.version` from all 24 skills
  - Build scripts parameterized for versioned artifacts
  - Scripts guide renamed to `scripts/README_SCRIPTS.md`
  - Release typo fixed (`opensills` → `openskills`)

- **v2.0.0 Released** (2026-01-26)
  - Repository flattened to `skills/{phase-skill}/` structure
  - All 24 skills renamed with phase prefix (e.g., `deliver-prd`)
  - Sync helpers and build scripts added
  - Documentation updated for flat structure

- **v2.0 Execution Plans Complete** (2026-01-26)
  - Created detailed Claude execution plan with 8 phases, migration mapping for all 24 skills
  - Applied Codex's 5 feedback items: packaging, doc frontmatter, timeline dates, fail-fast sync helpers, validation
  - Created tool analysis comparing Claude Code vs Codex for execution
  - Recommendation: Codex 5.1/Max for execution (score 4.05/5), Claude for review/refinement (2.85/5)
  - Key decisions locked:
    - Flat structure: `skills/{phase}-{skill}/` replacing `skills/{phase}/{skill}/`
    - ZIP includes prebuilt `.claude/skills/` and `.claude/commands/`
    - Sync helpers validate SKILL.md, TEMPLATE.md, EXAMPLE.md with fail-fast
    - Two-path install guidance for Claude Code vs other tools
  - Packaging discrepancy noted between Claude and Codex plans (to reconcile before M4)
  - Plans located at `(internal-notes)/plans/v2.0-flat-extensions/`

- **v2.0 Planning: Structure, Output, MCP Impact** (2026-01-21)
  - Analyzed Claude Code skill discovery requirements (flat `.claude/skills/` vs hierarchical `skills/{phase}/`)
  - Created comprehensive planning documents in `AGENTS/claude/PLANNING/`:
    - `plan_skill-structure-revamp.md` — 6 options for restructuring (keep current, flatten, phase prefix, numeric prefix, dual structure, flat+metadata)
    - `plan_skill-output.md` — Configurable file output (always file, always prompt, configurable default)
    - `plan_revamp-mcp.md` — Impact analysis for pm-skills-mcp (tool names, resource URIs, workflows, embed script)
  - Key findings:
    - Current hierarchical structure is agentskills.io compliant but NOT Claude Code auto-discoverable
    - Current `commands/` workaround enables slash commands but not skill discovery
    - Recommended: Option 3 (phase prefix) or Option 5 (dual structure) for Claude Code compatibility
    - MCP can remain backwards-compatible if tool names aren't changed
  - Awaiting stakeholder review before implementation

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
  - Created dedicated PR guide: `(internal-notes)/efforts/open-skills/plan-pr--awesome-claude-skills.md`
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
  - Created CLAUDE.md with documentation rules (never reference `(internal-notes)/` in public docs)
  - Cleaned `(internal-notes)/` references from CHANGELOG.md and CONTRIBUTING.md
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
  - Documentation at `(internal-notes)/efforts/open-skills/`

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
    - `skills/-/` — [GitHub #26](https://github.com/product-on-purpose/pm-skills/issues/26)
    - `skills/-/` — [GitHub #27](https://github.com/product-on-purpose/pm-skills/issues/27)
    - `skills/-/` — [GitHub #28](https://github.com/product-on-purpose/pm-skills/issues/28)
    - `skills/-/` — [GitHub #29](https://github.com/product-on-purpose/pm-skills/issues/29)
    - `skills/-/` — [GitHub #30](https://github.com/product-on-purpose/pm-skills/issues/30)
    - `skills/-/` — [GitHub #31](https://github.com/product-on-purpose/pm-skills/issues/31)
    - `skills/-/` — [GitHub #32](https://github.com/product-on-purpose/pm-skills/issues/32)
    - `skills/-/` — [GitHub #33](https://github.com/product-on-purpose/pm-skills/issues/33)
    - `skills/-/` — [GitHub #34](https://github.com/product-on-purpose/pm-skills/issues/34)
    - `skills/-/` — [GitHub #35](https://github.com/product-on-purpose/pm-skills/issues/35)
    - `skills/-/` — [GitHub #36](https://github.com/product-on-purpose/pm-skills/issues/36)
  - Created GitHub labels: `phase-3`, `P2`
  - All 11 issues closed

- **Phase 2 COMPLETE** (2026-01-14)
  - Created 8 P1 Skills with SKILL.md, TEMPLATE.md, EXAMPLE.md each:
    - `skills/-/` — [GitHub #18](https://github.com/product-on-purpose/pm-skills/issues/18)
    - `skills/-/` — [GitHub #19](https://github.com/product-on-purpose/pm-skills/issues/19)
    - `skills/-/` — [GitHub #20](https://github.com/product-on-purpose/pm-skills/issues/20)
    - `skills/-/` — [GitHub #21](https://github.com/product-on-purpose/pm-skills/issues/21)
    - `skills/-/` — [GitHub #22](https://github.com/product-on-purpose/pm-skills/issues/22)
    - `skills/-/` — [GitHub #23](https://github.com/product-on-purpose/pm-skills/issues/23)
    - `skills/-/` — [GitHub #24](https://github.com/product-on-purpose/pm-skills/issues/24)
    - `skills/-/` — [GitHub #25](https://github.com/product-on-purpose/pm-skills/issues/25)
  - Created GitHub labels: `phase-2`, `P1`
  - Created GitHub milestone: v0.3.0 - P1 Skills
  - All 8 issues closed

- **Phase 1 COMPLETE** (2026-01-14)
  - Created 5 P0 Core Skills with SKILL.md, TEMPLATE.md, EXAMPLE.md each:
    - `skills/-/` — [GitHub #10](https://github.com/product-on-purpose/pm-skills/issues/10)
    - `skills/-/` — [GitHub #11](https://github.com/product-on-purpose/pm-skills/issues/11)
    - `skills/-/` — [GitHub #12](https://github.com/product-on-purpose/pm-skills/issues/12)
    - `skills/-/` — [GitHub #13](https://github.com/product-on-purpose/pm-skills/issues/13)
    - `skills/-/` — [GitHub #14](https://github.com/product-on-purpose/pm-skills/issues/14)
  - Created GitHub labels: `skill`, `phase-1`, `P0`
  - Created GitHub milestone: v0.2.0 - P0 Core Skills

- **Phase 0 COMPLETE** (2026-01-14)
  - Created CONTRIBUTING.md with curated contribution model
  - Built full directory structure with .gitkeep files
  - Created `docs/frontmatter-schema.yaml`
  - Created `docs/categories.md`
  - Created `docs/templates/skill-template/` with SKILL.md, TEMPLATE.md, EXAMPLE.md
  - Verified VISION.md at `(internal-notes)/VISION.md`
  - GitHub issues #1-9 closed (plan review fixes)

## Recent Infrastructure (2026-03-18)

- **Context Currency Scripts (added 2026-03-18):**
  - `scripts/check-context-currency.sh` — detects stale `AGENTS/*/CONTEXT.md` vs CHANGELOG; exit 1 on mismatch
  - `scripts/check-context-currency.ps1` — PowerShell equivalent for Windows local use
  - CI step pending (A-9): `validation.yml` will run `.sh` with `continue-on-error: true`

- **Slash Commands (37 total):**
  - 30 skill commands (24 original + `/persona` + `/acceptance-criteria` + `/pm-skill-builder` + `/pm-skill-validate` + `/pm-skill-iterate` + `/cross-llm-review`)
  - 7 workflow commands: `/workflow-feature-kickoff`, `/workflow-customer-discovery`, `/workflow-sprint-planning`, `/workflow-product-strategy`, `/workflow-post-launch-learning`, `/workflow-stakeholder-alignment`, `/workflow-technical-discovery`
- **Skills (27 total):**
  - 25 domain skills (24 original + deliver-acceptance-criteria)
  - 1 foundation skill: foundation-persona (`classification: foundation`)
  - 1 utility skill: utility-pm-skill-builder (`classification: utility`)
- **Sample Output Library:**
  - `library/skill-output-samples/` — 95 sample outputs across 25 skills
  - `SAMPLE_CREATION.md` — standards for sample creation
- **Plugin Manifest:**
  - `.claude-plugin/plugin.json` — Claude plugin packaging (added v2.6.0)
  - `.github/workflows/validate-plugin.yml` — plugin validation CI
- **Workflows (9 total):**
  - `_workflows/triple-diamond.md` — Complete product development cycle
  - `_workflows/lean-startup.md` — Build-Measure-Learn rapid iteration
  - `_workflows/feature-kickoff.md` — Quick-start workflow for features
  - `_workflows/customer-discovery.md` — Transform raw research into a validated problem
  - `_workflows/sprint-planning.md` — Prepare sprint-ready stories from a backlog
  - `_workflows/product-strategy.md` — Frame a major strategic initiative
  - `_workflows/post-launch-learning.md` — Measure results and capture learnings after launch
  - `_workflows/stakeholder-alignment.md` — Build a case for leadership buy-in
  - `_workflows/technical-discovery.md` — Evaluate technical feasibility and architecture
- **Agent Discovery:**
  - `AGENTS.md` — Universal agent discovery file with all commands listed
- **GitHub Actions:**
  - `.github/workflows/validation.yml` — Runs on Ubuntu + Windows
  - `.github/workflows/validate-mcp-sync.yml` — MCP drift check (blocking mode)
  - `.github/workflows/validate-plugin.yml` — Plugin manifest validation
  - `.github/workflows/release.yml` — Create releases on tag
  - `.github/workflows/release-zips.yml` — Package ZIP artifacts

## Next Steps

### Active (v2.9.0)

| ID | Effort | Status | Plan |
|----|--------|--------|------|
| M-19 | Rename bundles → workflows | Ready for execution | `docs/internal/efforts/M-19-bundles-to-workflows/plan_bundles-to-workflows.md` |
| F-13 | Workflow expansion (6 new) | Ready for execution (after M-19) | `docs/internal/efforts/F-13-workflow-expansion.md` |

### Backlog

See `docs/internal/backlog-canonical.md` for the priority-ordered backlog.

| ID | Effort | Issue |
|----|--------|-------|
| M-13 | Convention alignment pass | #115 |
| M-14 | Release automation enhancement | #116 |
| M-15 | Community contribution setup | #117 |
| F-07 | `discover-market-sizing` | #118 |
| F-08 | `measure-survey-analysis` | #119 |
| F-09 | Agent Skill Builder (`/agent-skill-builder`) | #120 |
| F-12 | Skill quality convergence | (draft) |

**Key scope change (2026-03-21):** M-01 through M-04 moved to Knowledge OS (separate initiative). pm-skills focuses on being an excellent, community-ready skill library.

## Notes

- Follows [Agent Skills Specification](https://agentskills.io/specification)
- Primary Audience: Individual Product Managers using AI assistants
- Cross-platform: Claude Code, Claude.ai, GitHub Copilot, Cursor, Windsurf, OpenCode
- 30 skills total: 25 domain + 1 foundation + 4 utility (v2.8.0+)
- 9 workflows (expanded from 3 in v2.9.0)

## Skills Inventory (30 skills)

### Foundation (1 skill)

| Skill | Category | Classification | Status |
|-------|----------|----------------|--------|
| persona | research | foundation | ✅ Complete (v2.5.0) |

### Utility (4 skills)

| Skill | Category | Classification | Status |
|-------|----------|----------------|--------|
| pm-skill-builder | coordination | utility | ✅ Complete (v2.7.0) |
| pm-skill-validate | coordination | utility | ✅ Complete (v2.8.0) |
| pm-skill-iterate | coordination | utility | ✅ Complete (v2.8.0) |

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

### Deliver Phase (6 skills)

| Skill | Category | Priority | Status |
|-------|----------|----------|--------|
| prd | specification | P0 | ✅ Complete |
| user-stories | specification | P0 | ✅ Complete |
| acceptance-criteria | specification | v2.7.0 | ✅ Complete |
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

