# Project Context

## Current State

**Status:** Foundation in progress (~40% of Phase 0 complete)
**Last Updated:** 2026-01-14

## Project Overview

PM-Skills is an open source collection of Product Management skills for AI agents. Skills are reusable instruction sets that help AI assistants produce high-quality PM artifacts—PRDs, problem statements, user stories, experiment designs, and more.

**V1 Scope:** Complete Triple Diamond framework coverage (~24 skills across 6 phases)

## Key Files

- `README.md` — Comprehensive project overview with badges, skills inventory, quick start guides
- `CHANGELOG.md` — Version history (Keep a Changelog format)
- `LICENSE` — Apache 2.0 license
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
├── _templates/           # Skill creation templates
├── commands/             # Claude Code slash commands
├── releases/             # Pre-packaged ZIPs for download
├── AGENTS/               # AI agent session continuity
│   └── claude-opus-4.5/
│       ├── CONTEXT.md    # Project state
│       ├── DECISIONS.md  # Technical decisions (ADR format)
│       ├── TODO.md       # Task tracking
│       ├── SESSION-LOG/  # Session summaries
│       └── PLANNING/     # Working collaboration artifacts (reviews, drafts, analysis)
├── AGENTS.md             # Universal agent discovery (to be generated)
└── CONTRIBUTING.md       # Contribution guidelines (to be created)
```

## Recent Work

- Initialized project with agentic coding structure
- Created comprehensive README.md with full skills inventory and platform compatibility
- Set up AGENTS/claude-opus-4.5/ for session continuity

## Next Steps

1. Complete Issue #1 (Repository Bootstrap) — create missing directories and CONTRIBUTING.md
2. Complete Issue #2 (Schema Documentation) — create `_docs/frontmatter-schema.yaml`
3. Complete Issue #3 (Category Reference) — create `_docs/categories.md`
4. Complete Issue #4 (Skill Template) — move templates from `_NOTES/v1-plan/` to `_templates/skill-template/`
5. Complete Issue #5 (VISION.md Integration) — verify consistency
6. Build first skill: `problem-statement` (Issue #6)

## Notes

- Follows [Agent Skills Specification](https://agentskills.io/specification)
- Primary Audience: Individual Product Managers using AI assistants
- Cross-platform: Claude Code, Claude.ai, GitHub Copilot, Cursor, Windsurf, OpenCode
- Implementation plan is in `_NOTES/v1-plan/plan-v1.md` with detailed issue-by-issue guidance
