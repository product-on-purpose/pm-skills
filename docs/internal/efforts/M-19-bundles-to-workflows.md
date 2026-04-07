# [M-19] Rename Bundles to Workflows
Status: Active
Milestone: v2.9.0
Issue: TBD
Agent: Claude Opus 4.6

## Scope

Rename the "bundles" concept to "workflows" across the entire pm-skills repository and coordinate the downstream rename in pm-skills-mcp. This aligns terminology with the repo's own user-facing language (which already says "workflow" everywhere), the MCP server's public API (`pm_workflow_*` tool names), and the broader agent/automation ecosystem convention.

The rename also introduces a `/workflow-` command prefix for namespace protection, preventing collisions between workflow commands and skill commands (e.g., `/stakeholder-alignment` vs `/stakeholder-summary`).

## Key Decisions

- **Directory rename:** `_bundles/` → `_workflows/`, `docs/bundles/` → `docs/workflows/`
- **Command prefix:** `/workflow-{name}` for all workflow commands
- **`/kickoff` deleted** — only `/workflow-feature-kickoff` exists. Breaking change documented in release notes. Low adoption mitigates impact.
- **MCP tool names unchanged** — already use `pm_workflow_*`, no user-facing API break
- **MCP source-level API refactor** — `WorkflowBundle` → `Workflow`, `WORKFLOW_BUNDLES` → `WORKFLOWS`, etc. No user-facing MCP tool-name break.
- **URL redirects required** — `mkdocs-redirects` plugin for old `bundles/*` doc site URLs
- **Historical docs unchanged** — release notes and CHANGELOG entries prior to v2.9.0 keep original "bundle" wording
- **Single atomic commit** — all renames and reference updates land together to avoid intermediate CI breakage

## Detailed Plan

Full impact inventory, implementation sequence, and acceptance tests:
[`plan_bundles-to-workflows.md`](M-19-bundles-to-workflows/plan_bundles-to-workflows.md)

## Scope Summary

- ~399 references across ~106 files in pm-skills
- ~14 files in pm-skills-mcp (cosmetic only, no public API changes)
- 3 CI workflow files updated (path triggers)
- 1 new CI script added (terminology guard)
- 1 new MkDocs plugin added (redirects)
- 14 acceptance tests defined (11 M-19 completion + 3 v2.9.0 release verification)

## Artifacts Produced

- `_workflows/` directory (renamed from `_bundles/`)
- `_workflows/README.md` — clarifies source-of-truth role, repo-relative links, do-not-edit-docs guidance
- `docs/workflows/` directory (renamed from `docs/bundles/`)
- `docs/workflows/README.md` — "Generated files — do not edit directly"
- `scripts/check-stale-bundle-refs.sh` + `.ps1` (terminology guard)
- Updated CI workflow triggers in `.github/workflows/`
- `mkdocs-redirects` configuration for old URLs

## PRs

- TBD — rename commit within v2.9.0 release branch
