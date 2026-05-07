# Project Context

## Current State

**Status:** v2.13.0 SHIPPED 2026-05-05 (tag `v2.13.0` at commit `cbdbc5f`; GitHub Release page live at https://github.com/product-on-purpose/pm-skills/releases/tag/v2.13.0). All 5 pre-release gates closed: PR.1 (per-strand Phase 0; 4 Codex tasks), PR.2 (release-state Phase 0; 5 Codex review rounds + 3 resolution passes converged), PR.3 (generator regen first-run convergence), PR.4 (pre-release checklist all 15 mechanical CI scripts PASS), PR.5 (CHANGELOG + Release_v2.13.0.md promoted from drafts). Out-of-cycle pm-skills-mcp v2.9.3 security-patch shipped same week (8 to 0 open Dependabot moderate advisories; 2-hour announcement-to-patch turnaround). pm-skills-mcp GitHub repo description refreshed from stale "29 skills" to current "40 PM skills + 11 workflows + 8 utility tools (59 tools)" with v2.9.x maintenance-line framing. v2.14.0 cycle plan committed 2026-05-06 at `docs/internal/release-plans/v2.14.0/plan_v2.14.0.md` with theme "Doc Stack Migration: MkDocs Material to Astro Starlight"; Phase 0 (compatibility decision) EXECUTED 2026-05-06 with verdict **GO-WITH-CAVEATS pending pre-ship validation gates** (spike report at `plan_v2.14_starlight-spike-report_2026-05-06.md`); all three v2.13 BLOCKERs cleared (redirects PASS, excludes PASS, parser warnings 0 vs Zensical's 2,940). Codex adversarial review applied 2026-05-06 (9 Major / 8 Minor / 2 Notes / 0 Blockers; archived at `_archive/plan_v2.14_starlight-spike-report_2026-05-06_original_reviewed-by-codex.md`); 19 actions integrated. D1-D4 Decision Briefs resolved with maintainer signoff. Consolidated migration plan authored at `plan_v2.14_starlight-migration.md` with 13 workstreams in 4 phases (Foundation / Parity / Cutover / Deprecate-and-Ship), detailed CI plan, Material deprecation acceptance criteria, and 2 new Decision Briefs (DM-1, DM-2). Revised effort estimate: **30-40 hours focused work / 5-8 calendar days** for migration execution (Phases 1-4).
**Last Updated:** 2026-05-06. Post-tag housekeeping completed: 3 Dependabot PRs (#129 setup-python 5 to 6, #130 actions/cache 4 to 5, #139 action-gh-release 2 to 3) merged via squash; 6 stale local branches deleted (backup/claude-path-cutover, feature/f-16-mermaid-diagrams, feature/f-19-slideshow-creator, v2.0-codex, wip/local-agent-context, docs/mkdocs-site); 10 origin claude/* orphan branches deleted from GitHub; origin/v2.13/cycle auto-deleted by GitHub on PR #140 merge; origin/docs/mkdocs-site deleted (verified fully merged). README reorganized: MCP notice converted to collapsible + relocated to Quick Start area; v2.6 to v2.9 What's New entries moved to Project Status > Previous Release Details; duplicate MCP note removed from comparison table area. Final remote branches: main, gh-pages only (after Dependabot auto-cleanup).
**Release:** v2.13.0 is the latest tagged release (tag `v2.13.0`, head commit `cbdbc5f`, on origin/main). GitHub release published from `docs/releases/Release_v2.13.0.md`. Previous: v2.12.0 (2026-05-03 / OKR Skills Launch); v2.11.1 (2026-04-22); v2.11.0 (2026-04-18 / Meeting Skills Family + lean-canvas).
**Skill count:** 40 (26 phase + 8 foundation + 6 utility). Unchanged from v2.12.0; v2.13.0 was a maintenance and quality release with zero new skills.
**MCP:** pm-skills-mcp in maintenance mode (effective 2026-05-04). Latest in v2.9.x maintenance line is **v2.9.3** (security-patch follow-up to v2.9.2; cleared all 8 open Dependabot moderate advisories on 2026-05-05; 0 alerts post-ship). GitHub repo description updated 2026-05-06 from stale "29 skills" to current 40-skills + 11 workflows + 8 utility tools framing; npm tarball verified to ship 40 SKILL.md files (matches the catalog claim in v2.13.0 release notes). Catalog frozen at 40 skills per the v2.9.2 build. Subsequent v2.9.x patches do not change the catalog.
**v2.13.0 theme (locked 2026-05-03):** Doc consistency overhaul + CI refactoring + Material for MkDocs to Zensical migration. Three coherent strands of cleanup work that the user explicitly framed as a separate cycle from v2.12.0 feature work. Untracked items in `docs/internal/` are 2.13 prep material (F-37 html-template-creator effort, organization-design, multi-repo extraction design, v2.13.0 release plan stub, skills-ideas brainstorm).
**v2.13.0 specific items observed during v2.12.0 release prep (deferred):** `utility-pm-skill-builder` SKILL.md catalog table stale (Foundation lists 1, Utility lists 1 in the gap-analysis table; actuals are 8 and 6); `AGENTS/codex/CONTEXT.md` last actively maintained 2026-03-22 at v2.7.0 (got a v2.12.0 currency marker only, full content refresh deferred); pre-existing lint-skills-frontmatter PS1 false-positives for utility-pm-skill-validate, utility-slideshow-creator, utility-update-pm-skills (bash version passes; PS1 path-detection bug); 3 PowerShell CI scripts with parse errors (check-stale-bundle-refs, check-workflow-coverage, check-generated-freshness); docs/guides/mcp-setup.md "all 38 PM skills via MCP" wording (frozen MCP actually has 28); count-consistency CI script regex blind spots (prose forms with adjective interstitials between digit and "skills"; per-phase counts below 10 min-threshold). Pre-existing v2.12.0 backlog still open: F-29 (lifecycle workflow), F-30 (adoption guide), F-31/32/33/34/35 (sample-automation loop), F-36 (generic family-registration validator).
**Material/Zensical decision (research-staged, not committed):** MkDocs upstream is potentially abandoned and a v2 may break Material plugins; Material for MkDocs is in maintenance mode for ~12 months per squidfunk's announcement. Zensical is squidfunk's own successor project (drop-in `mkdocs.yml` compatibility, ZRX differential build engine 4-5x faster, third-party module ecosystem opening early 2026). Recommended path: 30-min Zensical compatibility spike on pm-skills before committing. Astro Starlight is the Plan B if Zensical compatibility holes are too deep; Docusaurus is overkill for pm-skills' content shape.
**Memory updates pending (user wanted to think):** 3 candidates identified at session close: (1) feedback memory on `/ultrareview` calibration (overkill for doc-heavy release prep, appropriate for design-decision releases); (2) feedback memory on "don't author factual prose claims from memory in tracked docs" (re-derive from manifest or frontmatter at edit time; Codex round 3 caught me doing this in versioning.md); (3) project memory on Phase 0 release-state confirmation loop pattern (a layer of review beyond the per-skill Phase 0 loop). User asked to think before saving.
**Next Step:** Open new session for v2.13.0 cycle. Recommend a fresh session so this conversation's context does not bleed into the cleaner-slate scoping. Continuation prompt is in `AGENTS/claude/SESSION-LOG/2026-05-03_v2.12.0-tag-ship-and-v2.13-handoff_session.md`.
**Process notes for v2.12.0:** The v2.11.0-codified Phase 0 Adversarial Review Loop demonstrated its value at scale this cycle. The grader's per-skill loop converged in 3 rounds (1 HIGH + 4 MEDIUM total). The release-state loop (a NEW layer of review beyond the per-skill loop) ran 4 rounds with MEDIUM count 2 / 2 / 3 / 2 across rounds, no HIGH, no escalation, terminated per "below IMPORTANT" rule. Each round caught a distinct defect class: untracked file inconsistencies (round 1) → rendered-doc prose forms (round 2) → version data accuracy from prose (round 3) → audit-trail accuracy of the loop's own description in release notes (round 4). The cost was ~12 minutes of Codex compute; the benefit was 9 distinct release-state defects caught and fixed that mechanical CI could not detect. Em-dash standing-rule maintained zero across tracked files.

## Project Overview

PM-Skills is an open source collection of Product Management skills for AI agents. Skills are reusable instruction sets that help AI assistants produce high-quality PM artifacts.PRDs, problem statements, user stories, experiment designs, and more.

**V1 Scope:** Complete Triple Diamond framework coverage (24 skills across 6 phases) ✅

## Key Files

- `README.md` . Comprehensive project overview with badges, skills inventory, quick start guides
- `CHANGELOG.md` . Version history (Keep a Changelog format)
- `LICENSE` . Apache 2.0 license
- `CONTRIBUTING.md` . Contribution guidelines with curated model
- `(internal-notes)/VISION.md` . Detailed vision document with full roadmap
- `(internal-notes)/v1-plan/plan-v1.md` . Implementation plan with 35 issues

## Architecture (v2.0+ Flat Structure)

```
pm-skills/
├── skills/               # PM skills . FLAT structure (v2.0+)
│   ├── define-hypothesis/
│   ├── define-problem-statement/
│   ├── deliver-prd/
│   ├── deliver-user-stories/
│   └── ...               # 40 skills total: {phase/classification}-{skill}/
├── _workflows/           # 9 Workflows (triple-diamond, lean-startup, feature-kickoff, and 6 more)
├── commands/             # Claude Code slash commands (47 total: 40 skill + 7 workflow)
├── docs/                 # Documentation (Diataxis: concepts, guides, reference, plus generated skills/workflows/showcase)
│   ├── concepts/         # Conceptual orientation (triple-diamond-delivery-process, ...)
│   ├── guides/           # How-to guides
│   ├── reference/        # Lookup material
│   ├── skills/           # Generated per-skill pages (one per skill + category indices)
│   ├── workflows/        # Generated workflow pages
│   ├── showcase/         # Generated thread-aligned showcase
│   └── templates/        # Skill creation templates
├── library/              # Curated output libraries
│   └── skill-output-samples/  # 126 sample outputs across the catalog
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

- **Post-v2.10.1 maintenance** (2026-04-14, uncommitted on main)
  - **Plugin manifest drift fixed**: `.claude-plugin/plugin.json` and `marketplace.json` descriptions corrected from "29 skills" to "32 skills" (both had lagged since v2.10.0 utility expansion).
  - **CI extended**: `check-count-consistency.sh` / `.ps1` / `.md` now scans `.json` files too (previously `.md` only). `plugin.json` and `marketplace.json` are now covered. Added narrow exclusions for `.github/.created-issues.json` and `.github/scripts/` (npm lock + manifest).
  - **Off-by-one fix**: threshold comparison in the CI changed from `>` to `>=`. Caught a live mismatch immediately: README.md:132 claimed "10 workflows" when actual is 9. Fixed in the same session.
  - **Memory refresh**: MEMORY.md updated . current version v2.9.0→v2.10.1, skills 31→32, utility 5→6, workflows count reconciled to 9.
  - **Known gap left open**: historical "N skills" references in README "What's New" blocks (27/29/31) and CLAUDE.md:31 (24 skills) still trip the CI because the `v[0-9]+\.` line-level heuristic doesn't see the `<summary>v2.X.Y</summary>` on the enclosing `<details>` element. Tracked as a future CI hardening task.

- **v2.10.0 In Progress** (2026-04-07 to 2026-04-09)
  - **F-16 shipped**: `utility-mermaid-diagrams` . 15 diagram types, dual-lens navigation (catalog + PM use-cases), syntax validity reference, 2,656 lines
  - **F-19 shipped**: `utility-slideshow-creator` . 18 slide types, JSON deck specs, zero design decisions at generation time, generic professional theme, 766 lines
  - **Effort briefs created**: F-17 (meeting-synthesis), F-18 (meeting-prep), F-20 (slideshow-themer), F-21 (content-voice), F-22 (prototype-creator), F-23 (prototype-styler)
  - **Comprehensive docs hygiene sweep**: 20+ files updated across two count sweeps (30→31 skills)
  - **Max-effort audit**: 9 review agents + 4 audit agents caught 24+ stale count references, mermaid syntax issues, anchor mismatches
  - **MCP alignment documented**: 3-skill gap, embed + build steps in release plan
  - **Release plan**: `docs/internal/release-plans/v2.10.0/plan_v2.10.0.md`
  - Repo at v2.10.0-dev: 32 skills, 39 commands, 9 workflows

- **v2.9.0 Planning Complete** (2026-04-06)
  - **Theme**: Rename "bundles" to "workflows" + expand from 3 to 9 guided multi-skill workflows
  - **M-19**: Rename `_bundles/` → `_workflows/`, ~400 references across ~100 files, delete `/kickoff`, add `/workflow-feature-kickoff`, URL redirects, terminology guard
  - **F-13**: 6 new workflows (Customer Discovery, Sprint Planning, Product Strategy, Post-Launch Learning, Stakeholder Alignment, Technical Discovery) with `/workflow-` prefixed commands
  - **Two-commit strategy**: Commit 1 = M-19 rename (single atomic commit), Commit 2 = F-13 expansion
  - **MCP**: Source-level API refactor deferred to companion release (non-breaking, `pm_workflow_*` tool names unchanged)
  - **Codex reviews**: M-19 plan reviewed (13 findings, all addressed), v2.9.0 release plan reviewed (8 findings, all addressed)
  - **Plans**: `docs/internal/release-plans/v2.9.0/plan_v2.9.0.md` (master), `docs/internal/efforts/M-19-bundles-to-workflows/plan_bundles-to-workflows.md` (detailed rename)
  - **Key decisions**: delete `/kickoff` (no alias), terminology guard advisory→FAIL post-v2.9.0, release notes draft in Commit 1
  - Repo at v2.9.0: 31 skills, 38 commands, 9 workflows

- **v2.8.2 Released** (2026-04-04)
  - Versioning concepts page, git-revision-date plugin, custom CSS, F-12 effort brief
  - Documentation-only release

- **v2.8.1 Released** (2026-04-04)
  - MkDocs Material documentation site launch with showcase, skill pages, prompt gallery
  - Documentation-only release

- **v2.8.0 Released** (2026-04-03)
  - **Theme**: Complete the PM skill lifecycle . Create → Validate → Iterate
  - **F-10**: `utility-pm-skill-validate` . audits skills against structural conventions and quality criteria, pipe-delimited report format (`Report schema: v1`), two-tier assessment rebaselined against shipped library (`1398835`)
  - **F-11**: `utility-pm-skill-iterate` . applies targeted improvements from feedback or validation reports, before/after preview with stale-preview guard, version bump suggestion, HISTORY.md creation at trigger point (`2f6577e`)
  - **M-18**: CI validation scripts . `validate-skill-history` + `validate-skills-manifest` (advisory, Codex implementation) (`c099efa`)
  - **D-03**: `docs/pm-skill-lifecycle.md` . public lifecycle guide with 4 workflow patterns (`f678344`)
  - **D-04**: Public docs refresh . counts (29 skills, 30 commands), Skill Lifecycle Tools sections in README/QUICKSTART, mermaid diagrams across 7 files, command files, AGENTS.md entries
  - **Governance**: `docs/internal/skill-versioning.md` . SemVer rules, HISTORY.md contract, skills-manifest.yaml format, tie-breaker rule
  - **Infrastructure**: `docs/internal/releases/` renamed to `docs/internal/release-plans/`
  - **Codex review**: Full design review with 20 findings (3 blockers resolved), pre-release consistency review with 8 findings (all fixed)
  - **MCP synced**: pm-skills-mcp v2.8.0 . `pm_pm_skill_validate` + `pm_pm_skill_iterate`, 42 tools (29 skills + 5 workflows + 8 utilities)
  - Repo: 31 skills (25 domain + 1 foundation + 5 utility), 38 commands, 9 workflows

- **v2.7.0 Released** (2026-03-22)
  - **M-12**: CI validation enhancement . extended linter, validate-agents-md, check-mcp-impact (`8d2a418`)
  - **F-06**: deliver-acceptance-criteria skill . Given/When/Then, e-commerce checkout example (`8d2a418`)
  - **M-16**: exclude `docs/internal/**` from release ZIP (`0c2e637`)
  - **F-05**: utility-pm-skill-builder . first utility skill, interactive builder with gap analysis, Why Gate, staging workflow (`3c50108`..`a67f144`). Codex design + implementation reviews both approved.
  - **D-01**: `docs/pm-skill-anatomy.md` . practical guide to skill structure (`b478276`)
  - **D-02**: 14 public docs updated for v2.7.0 accuracy, post-F-05 reconciliation (`12a30a9`)
  - **MCP synced**: pm-skills-mcp v2.7.0 . `pm_acceptance_criteria` + `pm_pm_skill_builder`
  - **MCP sync docs**: maintainer workflow added to `docs/guides/mcp-integration.md`
  - **Release governance**: v2.2.0-v2.7.0 folders, decisions log, detailed release notes
  - **Issues closed**: #112, #113, #114, #123
  - Repo: 27 skills (25 domain + 1 foundation + 1 utility), 28 commands, 3 workflows

- **v2.6.1 Shipped . Sample Library Recovery** (2026-03-04)
  - Sample output library moved and normalized to `library/skill-output-samples/`
  - 95 sample outputs across 25 skills, with `SAMPLE_CREATION.md` standards
  - Release packaging (`build-release.sh`/`.ps1`) now includes sample-library content
  - Release note: `docs/releases/Release_v2.6.1.md`

- **v2.6.0 Shipped . Claude Plugin Manifest** (2026-03-04)
  - Added `.claude-plugin/plugin.json` for Claude plugin packaging
  - Plugin packaging validation workflow: `.github/workflows/validate-plugin.yml`
  - Release packaging enforces plugin-manifest version parity
  - Release note: `docs/releases/Release_v2.6.0.md`

- **v2.5.2 Shipped . Public Doc Hygiene** (2026-03-04)
  - Rewrote release-facing docs for clearer user-first language
  - Removed internal decision-ID references from public release artifacts

- **v2.5.1 Shipped . Agent Workspace Canonicalization** (2026-03-04)
  - Canonicalized Claude agent workspace to `AGENTS/claude/` (retired `AGENTS/claude-opus*` paths)
  - Added clean-worktree release runbook: `docs/internal/release-plans/runbook_clean-worktree-cut-tag-publish.md`

- **v2.5.0 Shipped . Foundation Persona Skill** (2026-03-02)
  - New `skills/foundation-persona/` skill + references
  - New `/persona` command at `commands/persona.md`
  - AGENTS discovery updated for foundation classification
  - Persona archetype library and MCP exposure deferred to v2.7.0

- **v2.4.x Series . Contract Lock & Governance** (2026-02-16)
  - v2.4.0: Output behavior contract and config/schema lock closed as aligned
  - v2.4.1: Release-doc consistency finalization
  - v2.4.2: Canonical delivery-plan policy and v2.5 continuity kickoff; legacy internal docs archived
  - v2.4.3: Release metadata rolled forward; published-artifact links captured
  - Expanded `validate-mcp-sync` with pin metadata and contract-version parity checks
  - Canonical backlog and delivery-plan governance established at `docs/internal/`

- **v2.3.0 Shipped . MCP Sync Blocking Mode** (2026-02-14)
  - Switched `.github/workflows/validate-mcp-sync.yml` to blocking-default mode
  - Release note: `docs/releases/Release_v2.3.md`

- **v2.2.0 Shipped . Guardrails & Governance** (2026-02-13)
  - MCP drift checker script and observe-only workflow
  - Planning persistence policy and canonical backlog governance
  - Release execution artifacts and checklists for v2.2 to v2.5

- **v2.1.0 Released . MCP Alignment Complete** (2026-01-28)
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
  - Validation workflow added (`validation.yml`) . runs on Ubuntu and Windows
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
    - `plan_skill-structure-revamp.md` . 6 options for restructuring (keep current, flatten, phase prefix, numeric prefix, dual structure, flat+metadata)
    - `plan_skill-output.md` . Configurable file output (always file, always prompt, configurable default)
    - `plan_revamp-mcp.md` . Impact analysis for pm-skills-mcp (tool names, resource URIs, workflows, embed script)
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
  - Created `docs/reference/ecosystem.md` . comprehensive ecosystem overview ([#94](https://github.com/product-on-purpose/pm-skills/issues/94))
    - Explains pm-skills vs pm-skills-mcp relationship
    - Decision matrix for choosing between approaches
    - Feature comparison table
    - Integration patterns (file-based, MCP-based, hybrid)
    - Customization workflow and version compatibility
  - Created `docs/guides/mcp-integration.md` . MCP integration guide ([#95](https://github.com/product-on-purpose/pm-skills/issues/95))
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

- **v1.2.0 Released . Security & Community Infrastructure** (2026-01-20)
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
  - Verified accuracy of `docs/reference/categories.md` and `frontmatter-schema.yaml` . all 24 skills validated
  - Reorganized `/docs` with new taxonomy: `reference/`, `guides/`, `frameworks/`
  - Expanded `categories.md` from 54 → 420+ lines with diagrams, workflows, framework mappings
  - Expanded `frontmatter-schema.yaml` from 91 → 600 lines with validation rules, examples, best practices
  - Created `docs/reference/getting-started.md` . comprehensive setup guide for 5 methods (~600 lines)
  - Created `docs/guides/using-skills.md` . beginner to advanced usage guide (~750 lines)
  - Created `docs/guides/authoring-pm-skills.md` . skill creation and submission guide (~850 lines)
  - Verified all framework claims in README are accurate (Teresa Torres, Christensen, Nygard)

- **v1.0.2 Release & Cleanup** (2026-01-15)
  - Created v1.0.2 tag . release workflow ran successfully
  - Both ZIP artifacts created: pm-skills-v1.0.2.zip, pm-skills-claude-v1.0.2.zip
  - Renamed `_docs/` → `docs/` and `_templates/` → `templates/` for standard conventions
  - Created CLAUDE.md with documentation rules (never reference `(internal-notes)/` in public docs)
  - Cleaned `(internal-notes)/` references from CHANGELOG.md and CONTRIBUTING.md
  - Updated manual submission guide with copy-paste ready content
  - Ready for manual PR to awesome-claude-skills

- **Open-Skills Ecosystem Integration** (2026-01-15)
  - Created detailed execution plan for publishing to open-skills ecosystem
  - Tested openskills CLI . discovered bug with nested directories ([#48](https://github.com/numman-ali/openskills/issues/48))
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
    - `skills/-/` . [GitHub #26](https://github.com/product-on-purpose/pm-skills/issues/26)
    - `skills/-/` . [GitHub #27](https://github.com/product-on-purpose/pm-skills/issues/27)
    - `skills/-/` . [GitHub #28](https://github.com/product-on-purpose/pm-skills/issues/28)
    - `skills/-/` . [GitHub #29](https://github.com/product-on-purpose/pm-skills/issues/29)
    - `skills/-/` . [GitHub #30](https://github.com/product-on-purpose/pm-skills/issues/30)
    - `skills/-/` . [GitHub #31](https://github.com/product-on-purpose/pm-skills/issues/31)
    - `skills/-/` . [GitHub #32](https://github.com/product-on-purpose/pm-skills/issues/32)
    - `skills/-/` . [GitHub #33](https://github.com/product-on-purpose/pm-skills/issues/33)
    - `skills/-/` . [GitHub #34](https://github.com/product-on-purpose/pm-skills/issues/34)
    - `skills/-/` . [GitHub #35](https://github.com/product-on-purpose/pm-skills/issues/35)
    - `skills/-/` . [GitHub #36](https://github.com/product-on-purpose/pm-skills/issues/36)
  - Created GitHub labels: `phase-3`, `P2`
  - All 11 issues closed

- **Phase 2 COMPLETE** (2026-01-14)
  - Created 8 P1 Skills with SKILL.md, TEMPLATE.md, EXAMPLE.md each:
    - `skills/-/` . [GitHub #18](https://github.com/product-on-purpose/pm-skills/issues/18)
    - `skills/-/` . [GitHub #19](https://github.com/product-on-purpose/pm-skills/issues/19)
    - `skills/-/` . [GitHub #20](https://github.com/product-on-purpose/pm-skills/issues/20)
    - `skills/-/` . [GitHub #21](https://github.com/product-on-purpose/pm-skills/issues/21)
    - `skills/-/` . [GitHub #22](https://github.com/product-on-purpose/pm-skills/issues/22)
    - `skills/-/` . [GitHub #23](https://github.com/product-on-purpose/pm-skills/issues/23)
    - `skills/-/` . [GitHub #24](https://github.com/product-on-purpose/pm-skills/issues/24)
    - `skills/-/` . [GitHub #25](https://github.com/product-on-purpose/pm-skills/issues/25)
  - Created GitHub labels: `phase-2`, `P1`
  - Created GitHub milestone: v0.3.0 - P1 Skills
  - All 8 issues closed

- **Phase 1 COMPLETE** (2026-01-14)
  - Created 5 P0 Core Skills with SKILL.md, TEMPLATE.md, EXAMPLE.md each:
    - `skills/-/` . [GitHub #10](https://github.com/product-on-purpose/pm-skills/issues/10)
    - `skills/-/` . [GitHub #11](https://github.com/product-on-purpose/pm-skills/issues/11)
    - `skills/-/` . [GitHub #12](https://github.com/product-on-purpose/pm-skills/issues/12)
    - `skills/-/` . [GitHub #13](https://github.com/product-on-purpose/pm-skills/issues/13)
    - `skills/-/` . [GitHub #14](https://github.com/product-on-purpose/pm-skills/issues/14)
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
  - `scripts/check-context-currency.sh` . detects stale `AGENTS/*/CONTEXT.md` vs CHANGELOG; exit 1 on mismatch
  - `scripts/check-context-currency.ps1` . PowerShell equivalent for Windows local use
  - CI step pending (A-9): `validation.yml` will run `.sh` with `continue-on-error: true`

- **Slash Commands (39 total):**
  - 32 skill commands (24 original + `/persona` + `/acceptance-criteria` + `/pm-skill-builder` + `/pm-skill-validate` + `/pm-skill-iterate` + `/mermaid-diagrams` + `/slideshow-creator` + `/update-pm-skills`)
  - 7 workflow commands: `/workflow-feature-kickoff`, `/workflow-customer-discovery`, `/workflow-sprint-planning`, `/workflow-product-strategy`, `/workflow-post-launch-learning`, `/workflow-stakeholder-alignment`, `/workflow-technical-discovery`
- **Skills (32 total):**
  - 25 domain skills (24 original + deliver-acceptance-criteria)
  - 1 foundation skill: foundation-persona (`classification: foundation`)
  - 6 utility skills: utility-pm-skill-builder, utility-pm-skill-validate, utility-pm-skill-iterate, utility-mermaid-diagrams, utility-slideshow-creator, utility-update-pm-skills (`classification: utility`)
- **Sample Output Library:**
  - `library/skill-output-samples/` . 95 sample outputs across 25 skills
  - `SAMPLE_CREATION.md` . standards for sample creation
- **Plugin Manifest:**
  - `.claude-plugin/plugin.json` . Claude plugin packaging (added v2.6.0)
  - `.github/workflows/validate-plugin.yml` . plugin validation CI
- **Workflows (9 total):**
  - `_workflows/triple-diamond.md` . Complete product development cycle
  - `_workflows/lean-startup.md` . Build-Measure-Learn rapid iteration
  - `_workflows/feature-kickoff.md` . Quick-start workflow for features
  - `_workflows/customer-discovery.md` . Transform raw research into a validated problem
  - `_workflows/sprint-planning.md` . Prepare sprint-ready stories from a backlog
  - `_workflows/product-strategy.md` . Frame a major strategic initiative
  - `_workflows/post-launch-learning.md` . Measure results and capture learnings after launch
  - `_workflows/stakeholder-alignment.md` . Build a case for leadership buy-in
  - `_workflows/technical-discovery.md` . Evaluate technical feasibility and architecture
- **Agent Discovery:**
  - `AGENTS.md` . Universal agent discovery file with all commands listed
- **GitHub Actions:**
  - `.github/workflows/validation.yml` . Runs on Ubuntu + Windows
  - `.github/workflows/validate-mcp-sync.yml` . MCP drift check (blocking mode)
  - `.github/workflows/validate-plugin.yml` . Plugin manifest validation
  - `.github/workflows/release.yml` . Create releases on tag
  - `.github/workflows/release-zips.yml` . Package ZIP artifacts

## Next Steps

### Active (v2.14.0 cycle - Phases 1-4 migration execution promoted)

v2.13.0 SHIPPED. v2.14.0 cycle theme committed 2026-05-06: doc-stack migration from MkDocs Material to Astro Starlight. **Phase 0 (compatibility decision) EXECUTED 2026-05-06 with verdict GO-WITH-CAVEATS.** All three v2.13 BLOCKERs cleared (redirects PASS, excludes PASS, parser warnings 0 vs Zensical's 2,940). Codex adversarial review applied (9 Major / 8 Minor / 2 Notes / 0 Blockers); 19 actions integrated. Phases 1-4 (migration execution) is now active for v2.14.0 ship.

Authoritative documents:
- Cycle plan (strategy + decisions): `docs/internal/release-plans/v2.14.0/plan_v2.14.0.md`
- Migration execution plan (consolidated; 13 workstreams in 4 phases): `docs/internal/release-plans/v2.14.0/plan_v2.14_starlight-migration.md`
- Spike plan: `plan_v2.14_starlight-spike.md`
- Spike report: `plan_v2.14_starlight-spike-report_2026-05-06.md`
- Archived Codex review: `_archive/plan_v2.14_starlight-spike-report_2026-05-06_original_reviewed-by-codex.md`

| Gate | Item | Status |
|------|------|--------|
| Phase 0 | Compatibility decision (Astro Starlight spike, 60-min time-boxed) | Executed 2026-05-06; GO-WITH-CAVEATS pending pre-ship validation gates |
| Phase 1 | Foundation (W1-W3): pre-flight + in-place mount + frontmatter compliance | Pending kickoff |
| Phase 2 | Parity (W4-W9): sidebar IA + CSS port + Mermaid + samples + generators + redirects | Pending Phase 1 |
| Phase 3 | Cutover (W10-W11): CI workflow migration + GitHub Pages deploy | Pending Phase 2 |
| Phase 4 | Deprecate + Ship (W12-W13): Material removal + final validation | Pending Phase 3 |
| Pre-ship validation gates | 7 gates listed in spike report Outcome section | Must clear before v2.14.0 tags |
| Decision Briefs (D1-D4 + DM-1, DM-2) | All 4 D-Briefs resolved 2026-05-06; DM-1 + DM-2 pending signoff at workstream kickoff | D1-D4 resolved; DM-1, DM-2 open |
| Contingency (NO-GO pivot) | NOT triggered | n/a |

Total estimated effort: 30-40 hours focused work / 5-8 calendar days.

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
- 40 skills total: 26 phase (domain) + 8 foundation + 6 utility (v2.13.0)
- 9 workflows (expanded from 3 in v2.9.0)
- 47 slash commands (40 skill + 7 workflow)
- 126 library samples in `library/skill-output-samples/`

## Skills Inventory

> **Note (refresh deferred to v2.14.0+):** the per-phase tables below are at the v2.10.x-era 32-skill catalog and have not been refreshed for the current 40-skill catalog (26 phase + 8 foundation + 6 utility) shipped in v2.11.0/v2.12.0. The authoritative current catalog lives in `docs/reference/categories.md` (taxonomy + counts) and `docs/skills/index.md` (curated index). This table will be regenerated as part of the v2.14.0 cycle's CONTEXT.md refresh.

### Foundation (1 skill, stale - actual is 8)

| Skill | Category | Classification | Status |
|-------|----------|----------------|--------|
| persona | research | foundation | ✅ Complete (v2.5.0) |

### Utility (6 skills)

| Skill | Category | Classification | Status |
|-------|----------|----------------|--------|
| pm-skill-builder | coordination | utility | ✅ Complete (v2.7.0) |
| pm-skill-validate | coordination | utility | ✅ Complete (v2.8.0) |
| pm-skill-iterate | coordination | utility | ✅ Complete (v2.8.0) |
| mermaid-diagrams | documentation | utility | ✅ Complete (v2.10.0) |
| slideshow-creator | documentation | utility | ✅ Complete (v2.10.0) |
| update-pm-skills | coordination | utility | ✅ Complete (v2.10.0) |

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

