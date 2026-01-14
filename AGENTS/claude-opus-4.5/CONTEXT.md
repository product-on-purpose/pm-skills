# Project Context

## Current State

**Status:** Phase 1 COMPLETE — Ready for Phase 2 (P1 Skills)
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

- **Phase 1 COMPLETE** (2026-01-14)
  - Created 5 P0 Core Skills with SKILL.md, TEMPLATE.md, EXAMPLE.md each:
    - `skills/define/problem-statement/` — [GitHub #10](https://github.com/product-on-purpose/pm-skills/issues/10)
    - `skills/define/hypothesis/` — [GitHub #11](https://github.com/product-on-purpose/pm-skills/issues/11)
    - `skills/deliver/prd/` — [GitHub #12](https://github.com/product-on-purpose/pm-skills/issues/12)
    - `skills/deliver/user-stories/` — [GitHub #13](https://github.com/product-on-purpose/pm-skills/issues/13)
    - `skills/deliver/launch-checklist/` — [GitHub #14](https://github.com/product-on-purpose/pm-skills/issues/14)
  - Created GitHub labels: `skill`, `phase-1`, `P0`
  - Created GitHub milestone: v0.2.0 - P0 Core Skills
  - Updated plan-v1.md Progress Tracker with GitHub issue links

- **Phase 0 COMPLETE** (2026-01-14)
  - Created CONTRIBUTING.md with curated contribution model
  - Built full directory structure with .gitkeep files
  - Created `_docs/frontmatter-schema.yaml`
  - Created `_docs/categories.md`
  - Created `_templates/skill-template/` with SKILL.md, TEMPLATE.md, EXAMPLE.md
  - Verified VISION.md at `_NOTES/VISION.md`
  - GitHub issues #1-9 closed (plan review fixes)

## Next Steps

1. **Phase 2: P1 Skills** (8 skills)
   - `interview-synthesis` — Discover phase
   - `solution-brief` — Develop phase
   - `spike-summary` — Develop phase
   - `adr` — Develop phase
   - `edge-cases` — Deliver phase
   - `release-notes` — Deliver phase
   - `experiment-design` — Measure phase
   - `instrumentation-spec` — Measure phase

2. After Phase 2: Phase 3 (P2 Skills + Infrastructure)

## Notes

- Follows [Agent Skills Specification](https://agentskills.io/specification)
- Primary Audience: Individual Product Managers using AI assistants
- Cross-platform: Claude Code, Claude.ai, GitHub Copilot, Cursor, Windsurf, OpenCode
- Implementation plan is in `_NOTES/v1-plan/plan-v1.md` with detailed issue-by-issue guidance
- All Phase 1-3 skills depend only on #4 (complete) — can be parallelized
