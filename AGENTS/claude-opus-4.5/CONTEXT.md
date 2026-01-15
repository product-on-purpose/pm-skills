# Project Context

## Current State

**Status:** Phase 3 COMPLETE — All skills and infrastructure implemented (v1.0.0 ready)
**Last Updated:** 2026-01-14

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
├── _docs/                # Schema and reference docs
│   ├── frontmatter-schema.yaml
│   └── categories.md
├── _templates/           # Skill creation templates
│   └── skill-template/   # SKILL.md, TEMPLATE.md, EXAMPLE.md
├── commands/             # Claude Code slash commands
├── releases/             # Pre-packaged ZIPs for download
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
  - Created `_docs/frontmatter-schema.yaml`
  - Created `_docs/categories.md`
  - Created `_templates/skill-template/` with SKILL.md, TEMPLATE.md, EXAMPLE.md
  - Verified VISION.md at `_NOTES/VISION.md`
  - GitHub issues #1-9 closed (plan review fixes)

## Recent Infrastructure (2026-01-14)

- **Workflow Bundles Complete:**
  - `_bundles/triple-diamond.md` — Complete product development cycle
  - `_bundles/lean-startup.md` — Build-Measure-Learn rapid iteration
  - `_bundles/feature-kickoff.md` — Quick-start workflow for features
- **Slash Commands Complete:**
  - `commands/prd.md`, `commands/problem-statement.md`, `commands/hypothesis.md`
  - `commands/user-stories.md`, `commands/kickoff.md`
- **Agent Discovery:**
  - `AGENTS.md` — Universal agent discovery file
- **GitHub Actions:**
  - `.github/workflows/sync-agents-md.yml` — Auto-sync on skill changes
  - `.github/workflows/release-zips.yml` — Package ZIPs on release

## Next Steps

1. **v1.0.0 Release:**
   - Tag and create GitHub release
   - Verify workflows run correctly
   - Publish to Claude Code marketplace (when available)

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
