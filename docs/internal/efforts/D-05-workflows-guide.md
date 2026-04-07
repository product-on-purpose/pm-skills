# [D-05] Workflows Guide
Status: Backlog
Milestone: v2.9.1
Issue: TBD
Agent: Claude Opus 4.6

## Scope

Create a dedicated workflows guide at `docs/guides/using-workflows.md` that helps users choose, invoke, and customize workflows. Currently workflow guidance is scattered across `docs/guides/using-skills.md` (one section), `docs/workflows/index.md` (minimal table), and individual workflow files.

## Problem

With 9 workflows, users need:
1. A **decision guide** — "which workflow fits my situation?" (decision tree or comparison matrix)
2. A **quick-start** — how to invoke, what to expect, how to customize
3. A **comparison matrix** — side-by-side view of all 9 with use cases, duration, complexity
4. **Workflow composition patterns** — how to chain workflows, skip steps, combine elements

The "Using Workflows" section in `using-skills.md` covers basics but was written for 3 workflows and doesn't scale to 9.

## Artifacts Produced

- `docs/guides/using-workflows.md` — dedicated guide with decision tree, comparison matrix, invocation guide, customization patterns
- Updated `docs/guides/using-skills.md` — trim workflow section to a brief overview + link to dedicated guide
- Updated `mkdocs.yml` nav — add "Using Workflows" entry under Guides
- Updated `docs/workflows/index.md` — add link to the guide, expand "How to use" section

## Key Sections (proposed)

1. **Which Workflow Should I Use?** — Decision tree flowchart (mermaid) based on: uncertainty level, audience, phase of product lifecycle
2. **Workflow Comparison Matrix** — All 9 in a table with: use case, skills count, duration, complexity, prerequisite inputs
3. **Invoking Workflows** — All 7 `/workflow-*` commands + direct file reference for the 2 without commands
4. **Customizing Workflows** — Skip steps, add steps, combine workflows, parallel execution
5. **Building Custom Workflows** — How to create your own (migrate from using-skills.md)

## Dependencies

None — purely additive documentation.

## PRs

TBD
