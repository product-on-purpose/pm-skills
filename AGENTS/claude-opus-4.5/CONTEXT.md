# Project Context

## Current State

**Status:** Phase 2 COMPLETE — Ready for Phase 3 (P2 Skills + Infrastructure)
**Last Updated:** 2026-01-14

## Project Overview

PM-Skills is an open source collection of Product Management skills for AI agents. Skills are reusable instruction sets that help AI assistants produce high-quality PM artifacts—PRDs, problem statements, user stories, experiment designs, and more.

**V1 Scope:** Complete Triple Diamond framework coverage (~24 skills across 6 phases)

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

## Next Steps

1. **Phase 3: P2 Skills** (11 skills)
   - `competitive-analysis` — Discover phase
   - `stakeholder-summary` — Discover phase
   - `opportunity-tree` — Define phase
   - `jtbd-canvas` — Define phase
   - `design-rationale` — Develop phase
   - `dashboard-requirements` — Measure phase
   - `experiment-results` — Measure phase
   - `retrospective` — Iterate phase
   - `lessons-log` — Iterate phase
   - `refinement-notes` — Iterate phase
   - `pivot-decision` — Iterate phase

2. **Phase 3: Infrastructure**
   - Bundle: triple-diamond
   - Bundle: lean-startup
   - Bundle: feature-kickoff
   - Slash Commands
   - AGENTS.md + README finalization
   - GitHub Actions

## Notes

- Follows [Agent Skills Specification](https://agentskills.io/specification)
- Primary Audience: Individual Product Managers using AI assistants
- Cross-platform: Claude Code, Claude.ai, GitHub Copilot, Cursor, Windsurf, OpenCode
- Implementation plan is in `_NOTES/v1-plan/plan-v1.md` with detailed issue-by-issue guidance
- All Phase 1-3 skills depend only on #4 (complete) — can be parallelized

## Skills Inventory

### Complete (13 skills)

| Skill | Phase | Category | Priority |
|-------|-------|----------|----------|
| problem-statement | Define | problem-framing | P0 |
| hypothesis | Define | ideation | P0 |
| prd | Deliver | specification | P0 |
| user-stories | Deliver | specification | P0 |
| launch-checklist | Deliver | coordination | P0 |
| interview-synthesis | Discover | research | P1 |
| solution-brief | Develop | ideation | P1 |
| spike-summary | Develop | coordination | P1 |
| adr | Develop | specification | P1 |
| edge-cases | Deliver | specification | P1 |
| release-notes | Deliver | coordination | P1 |
| experiment-design | Measure | validation | P1 |
| instrumentation-spec | Measure | validation | P1 |

### Remaining (11 skills)

| Skill | Phase | Category | Priority |
|-------|-------|----------|----------|
| competitive-analysis | Discover | research | P2 |
| stakeholder-summary | Discover | research | P2 |
| opportunity-tree | Define | problem-framing | P2 |
| jtbd-canvas | Define | problem-framing | P2 |
| design-rationale | Develop | specification | P2 |
| dashboard-requirements | Measure | validation | P2 |
| experiment-results | Measure | reflection | P2 |
| retrospective | Iterate | reflection | P2 |
| lessons-log | Iterate | reflection | P2 |
| refinement-notes | Iterate | coordination | P2 |
| pivot-decision | Iterate | reflection | P2 |
