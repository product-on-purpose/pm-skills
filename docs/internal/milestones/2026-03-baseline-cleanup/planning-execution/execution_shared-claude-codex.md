# Shared Execution Coordinator — Claude + Codex

Last updated: 2026-03-20 (baseline cleanup complete — all lanes merged to main)
Purpose: one thin control plane for the baseline-cleanup workstreams

## Source Plans

- Claude execution plan:
  `_NOTES/baseline-standards/plan_claude/execution_claude-opus-4.6.md`
- Codex execution plan:
  `_NOTES/baseline-standards/plan_codex/execution_codex-gpt-5.4.md`
- Codex baseline decision doc:
  `_NOTES/baseline-standards/plan_codex/plan_codex-gpt-5.4.md`

## Locked Decisions

These are treated as settled unless the owner explicitly reopens them:

1. GitHub issues own backlog state.
2. `docs/internal/efforts/**` is the tracked home for durable effort briefs.
3. `_NOTES/**` remains local-only working material.
4. `docs/internal/release-plans/**` is the target tracked home for internal release governance.
5. Keep both `AGENTS/claude/` and `AGENTS/codex/` first-class.
6. Keep only intentionally shipped Claude-facing artifacts tracked:
   `.claude-plugin/plugin.json` and `.claude/pm-skills-for-claude.md`.
7. `wrap-session` refinement is a later focused effort, not part of this baseline pass.

## Current Status Snapshot

| ID | Owner | Scope | Status | Depends on | Notes |
| --- | --- | --- | --- | --- | --- |
| A-1 | Claude | commit tracked `.claude/settings.json` deletion | completed | none | landed 2026-03-11 |
| A-2 | Claude | remove `_NOTES/` reference from `CHANGELOG.md` | completed | none | landed 2026-03-11 |
| A-3 | Claude | remove stale `docs/templates/skill-template.md` stub | completed | none | landed 2026-03-11 |
| A-4 | Claude | refresh `AGENTS/claude/CONTEXT.md` | completed | none | landed 2026-03-11 |
| A-5 | Claude | add `wrap-session` context check | deferred | later wrap-session effort | do not execute in this baseline lane |
| A-8 | Claude | add context-currency scripts | completed | none | landed 2026-03-18; `scripts/check-context-currency.sh/.ps1` committed `770737f` |
| A-9 | Claude | add non-blocking CI step for context-currency | completed | A-8 | landed 2026-03-18; bash + pwsh steps in `validation.yml`, committed `de7c3bd` |
| A-11 | Claude | establish effort briefs + GitHub issues | completed | none | landed 2026-03-17; README + 3 briefs committed; issues #108/#109/#110; label `effort`; milestone `v2.7.0` |
| C-1 | Codex | rewrite active policy docs | completed | none | landed 2026-03-15 |
| C-2 | Codex | consolidate release governance + normalize effort entry points | completed | C-1 | landed 2026-03-16; canonical `docs/internal/release-plans/**` home established |
| C-3 | Codex | refresh Codex continuity + shared decision capture | completed | C-2 preferred | landed 2026-03-17; Codex continuity refreshed to current baseline |
| C-4 | Codex | align contributor schema/authoring docs | completed | none | landed on main 2026-03-20 (`22d96e5`); authoring/schema docs now teach root `version` + `updated`, and `classification` vs `phase` |
| C-5 | Codex | align public/reference docs and remove speculative surfaces | completed | C-4 preferred | landed on main 2026-03-20 (`22d96e5`); repo-facing docs now reflect 25 shipped skills, current agent surfaces, and narrower MCP language |
| C-6 | Codex | clean remaining release/sample docs and update coordination state | completed | C-2, C-5 | landed on main 2026-03-20 (`22d96e5`); plugin manifest and v2.6.1 release/sample docs now match shipped tracked state |

## Recommended Working Sequence

### Next Codex batch

Baseline cleanup lane complete. No remaining Codex tasks in this lane.

### Claude lane

All unblocked tasks complete. Only `A-5` remains (deferred — wrap-session effort, separate lane).

### Explicit hold

1. `A-5` stays deferred until the later wrap-session effort is intentionally started.

## Collaboration Rules

1. Claude should work only from the Claude execution doc.
2. Codex should work only from the Codex execution doc.
3. If one agent changes a canonical path or policy doc, the other agent should re-read that tracked file before continuing.
4. Update this coordinator after any batch that changes status, ownership assumptions, or dependencies.
5. Prefer narrow migrations. Do not expand scope into archive cleanup or new framework work.

## Handoff Notes

- The baseline policy questions are closed in substance.
- The main remaining work is tracked-file execution, not more planning.
- `A-8` is complete (2026-03-18). Currency-check scripts live at `scripts/check-context-currency.sh/.ps1`.
- `A-9` is complete (2026-03-18). Advisory CI step in `validation.yml`; bash + pwsh pair, `continue-on-error: true`.
- Claude's lane is done. Only deferred `A-5` (wrap-session, separate effort) remains out-of-scope for this baseline pass.
- `C-4` is complete (2026-03-19). Contributor-facing schema and authoring docs now teach root `version`, root `updated`, and the current `classification`/`phase` model.
- `C-5` is complete (2026-03-19). Public/reference docs now reflect the shipped 25-skill repo surface, remove obsolete helper-flow references, and avoid over-specific pm-skills-mcp inventory claims.
- `C-6` is complete (2026-03-19). The tracked `v2.6.1` release/sample surfaces now match shipped state, including plugin-manifest version alignment and a tracked internal release-governance home for sample coverage.
- The Codex baseline-cleanup lane is complete. Only deferred Claude `A-5` remains, and that is out-of-scope for this lane.
- The refreshed Codex `C-1` through `C-3` batch landed on `main` as `ad6deb8`; the context-currency check now passes on tracked `main`.
- Preserve Claude `A-11` effort-brief files as base truth.
