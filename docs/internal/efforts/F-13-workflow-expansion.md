# [F-13] Workflow Expansion
Status: Active
Milestone: v2.9.0
Issue: TBD
Agent: Claude Opus 4.6

## Scope

Add 6 new multi-skill workflows to pm-skills, expanding from 3 to 9. Each workflow chains existing skills into a guided, end-to-end process with clear handoff points and context flow between steps. This effort covers authoring the workflow content, creating slash commands, generating docs pages, and updating all cross-cutting references.

**Depends on:** [M-19 — Rename Bundles to Workflows](M-19-bundles-to-workflows.md). The rename must land first (Commit 1 in v2.9.0) so that new content is authored directly into the `_workflows/` structure.

## New Workflows

| # | Workflow | Command | Skills Chained |
|---|---------|---------|----------------|
| 1 | Customer Discovery | `/workflow-customer-discovery` | interview-synthesis → jtbd-canvas → opportunity-tree → problem-statement |
| 2 | Sprint Planning | `/workflow-sprint-planning` | refinement-notes → user-stories → edge-cases |
| 3 | Product Strategy | `/workflow-product-strategy` | competitive-analysis → stakeholder-summary → opportunity-tree → solution-brief → adr |
| 4 | Post-Launch Learning | `/workflow-post-launch-learning` | instrumentation-spec → dashboard-requirements → experiment-results → retrospective → lessons-log |
| 5 | Stakeholder Alignment | `/workflow-stakeholder-alignment` | stakeholder-summary → problem-statement → solution-brief → launch-checklist |
| 6 | Technical Discovery | `/workflow-technical-discovery` | spike-summary → adr → design-rationale |

## Key Decisions

- **Command prefix:** `/workflow-{name}` — namespace protection, consistent with M-19 rename
- **Content source:** Draft content in `F-13-workflow-expansion/bundle_*.md` (authored under "bundle" terminology, adapted to "workflow" during implementation)
- **Generation script:** New `scripts/generate-workflow-pages.py` eliminates manual duplication between `_workflows/` and `docs/workflows/`
- **Single release:** All 6 ship together in v2.9.0 — no phased rollout

## Draft Content

Working drafts authored before the M-19 rename decision. These use "bundle" terminology and will be adapted to "workflow" during implementation:

| Draft file | Target |
|-----------|--------|
| [`bundle-plan-overview.md`](F-13-workflow-expansion/bundle-plan-overview.md) | Original expansion plan (historical context) |
| [`bundle_customer-discovery.md`](F-13-workflow-expansion/bundle_customer-discovery.md) | → `_workflows/customer-discovery.md` |
| [`bundle_sprint-planning.md`](F-13-workflow-expansion/bundle_sprint-planning.md) | → `_workflows/sprint-planning.md` |
| [`bundle_product-strategy.md`](F-13-workflow-expansion/bundle_product-strategy.md) | → `_workflows/product-strategy.md` |
| [`bundle_post-launch-learning.md`](F-13-workflow-expansion/bundle_post-launch-learning.md) | → `_workflows/post-launch-learning.md` |
| [`bundle_stakeholder-alignment.md`](F-13-workflow-expansion/bundle_stakeholder-alignment.md) | → `_workflows/stakeholder-alignment.md` |
| [`bundle_technical-discovery.md`](F-13-workflow-expansion/bundle_technical-discovery.md) | → `_workflows/technical-discovery.md` |

## Artifacts Produced

- 6 new `_workflows/*.md` files (source of truth)
- 6 new `docs/workflows/*.md` files (generated)
- 6 new `commands/workflow-*.md` files (kickoff rename and deletion handled by M-19)
- `scripts/generate-workflow-pages.py`
- Updated `docs/workflows/index.md` (9-workflow table)
- Updated mkdocs.yml nav (9 entries)
- Updated AGENTS.md, README.md, project-structure.md, CHANGELOG.md
- `docs/releases/Release_v2.9.0.md`

## PRs

- TBD — expansion commit within v2.9.0 release branch (Commit 2, after M-19)
