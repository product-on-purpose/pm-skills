# 04 — Next Steps After Baseline Cleanup

Date: 2026-03-22
Status: Active reference
Source: Distilled from baseline cleanup milestone artifacts and shared coordinator final state

## Current Position

The March 2026 baseline cleanup is complete. All tracked files now describe the same canonical model. Both agent contexts are current at v2.6.1. Automated currency detection is in CI. The effort-tracking infrastructure is in place.

The repo is in the cleanest state it has been in since the v2.3.0 era. What follows should build on this baseline, not revisit it.

## Immediate Next Work

### 1. v2.7.0: Persona Library Tier-0

This is the next planned feature milestone.

- **Effort brief:** `docs/internal/efforts/F-03-persona-library-tier0.md`
- **GitHub issue:** #109 (open, assigned to milestone v2.7.0)
- **Scope:** Persona archetype library, pre-built examples, MCP integration for the persona skill shipped in v2.5.0
- **Infrastructure ready:** The effort brief format, GitHub issue tracking, and release governance directory all exist from the baseline cleanup — this effort is the first to use them from the start

### 2. wrap-session Redesign (Deferred A-5)

The baseline cleanup deliberately deferred changes to the `wrap-session` workflow.

- **Why deferred:** wrap-session is a cross-cutting shared workflow. Patching it incrementally during a cleanup pass risked under-designed changes to a foundational tool.
- **What it needs:** A focused design effort that addresses currency-check integration, effort-brief capture, and session-log conventions holistically.
- **Prerequisite satisfied:** The baseline is now stable, so wrap-session work can proceed against correct tracked docs.

### 3. Awesome-list Campaign (Distribution)

Archived GitHub issue templates in `.github/issues-archive/` track prior submissions. The campaign was deprioritized during baseline cleanup. With the public docs now accurate, submissions can reference reliable documentation.

## Deferred Items (Acknowledged, Not Scheduled)

These were identified during baseline cleanup and explicitly set aside:

| Item | Why deferred | When to revisit |
| --- | --- | --- |
| `init-project` cleanup | Not part of baseline scope | When project scaffolding is revisited |
| `.claude-plugin/` removal decision | Plugin manifest is shipped; removing it is a product decision | If the plugin format is deprecated |
| `DECISIONS.md` best-practice guide | Useful but not urgent | During wrap-session redesign |
| Archive cleanup of historical `_NOTES/**` | Not worth the risk during a cleanup pass | Only if it causes confusion |
| Cross-project abstractions (GSD, memory) | Out of scope for pm-skills baseline | Separate project decisions |

## Operating Model Going Forward

The baseline cleanup established a model. Future work should follow it:

1. **Backlog state** lives in GitHub issues
2. **Effort context** lives in `docs/internal/efforts/<effort-id>-<slug>.md`
3. **Release governance** lives in `docs/internal/releases/vX.Y.Z/`
4. **Working scratch** lives in `_NOTES/**` (local-only, never canonical)
5. **Agent continuity** lives in `AGENTS/*/CONTEXT.md` (covered by automated currency check)
6. **Cross-agent decisions** live in `AGENTS/DECISIONS.md`

When starting a new effort: create a GitHub issue, create an effort brief, do working-stage research in `_NOTES/efforts/`, promote durable decisions to the tracked brief.

## What Success Looks Like

- v2.7.0 ships using the effort-tracking infrastructure without needing to reinvent the pattern
- The context-currency CI check catches any CONTEXT.md staleness before it accumulates
- wrap-session gets a proper design pass that integrates naturally with the established baseline
- No tracked file teaches a model that contradicts the one established in this cleanup
