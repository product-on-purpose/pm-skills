# Backlog And Effort Entry Points

Status: Active
Owner: Maintainers
Last updated: 2026-03-22

GitHub issues are the canonical system for backlog and lifecycle state.

## Tracked Entry Points

1. `docs/internal/efforts/README.md` for the durable effort-brief model
2. `docs/internal/releases/README.md` for tracked release-governance artifacts

## Current Backlog (priority order)

Marketplace submission (Effort 0) is a human-only action, not an effort ID.

| Priority | ID | Effort | Type | Agent | Release | Status | Issue |
|----------|----|--------|------|-------|---------|--------|-------|
| 0 | — | Anthropic marketplace submission | Quick win | Human | — | Submitted (2026-03-22), awaiting review | — |
| 1 | M-12 | CI validation enhancement | Infrastructure | Codex | **v2.7.0** | Committed (`8d2a418`) | [#112](https://github.com/product-on-purpose/pm-skills/issues/112) |
| 2 | F-06 | `deliver-acceptance-criteria` | New skill | Codex | **v2.7.0** | Committed (`8d2a418`) | [#114](https://github.com/product-on-purpose/pm-skills/issues/114) |
| 3 | M-16 | Exclude `docs/internal/**` from release ZIP | Infrastructure | Codex | **v2.7.0** | Committed (`0c2e637`) | [#123](https://github.com/product-on-purpose/pm-skills/issues/123) |
| 4 | F-05 | PM Skill Builder (`/pm-skill-builder`) | New skill | Claude | **v2.7.0** | Committed (`3c50108`..`a67f144`) | [#113](https://github.com/product-on-purpose/pm-skills/issues/113) |
| 5 | M-13 | Convention alignment pass | Quality | Codex | — | Backlog | [#115](https://github.com/product-on-purpose/pm-skills/issues/115) |
| 6 | M-14 | Release automation enhancement | Infrastructure | Codex | — | Backlog | [#116](https://github.com/product-on-purpose/pm-skills/issues/116) |
| 7 | M-15 | Community contribution setup | Ecosystem | Claude | — | Backlog | [#117](https://github.com/product-on-purpose/pm-skills/issues/117) |
| 8 | F-07 | `discover-market-sizing` | New skill | Claude | — | Backlog | [#118](https://github.com/product-on-purpose/pm-skills/issues/118) |
| 9 | F-08 | `measure-survey-analysis` | New skill | Claude | — | Backlog | [#119](https://github.com/product-on-purpose/pm-skills/issues/119) |
| 10 | F-09 | Agent Skill Builder (`/agent-skill-builder`) | New skill | Claude | — | Backlog | [#120](https://github.com/product-on-purpose/pm-skills/issues/120) |
| 11 | F-10 | PM Skill Validate (`/pm-skill-validate`) | New skill | Claude | — | Backlog | [#121](https://github.com/product-on-purpose/pm-skills/issues/121) |
| 12 | F-11 | PM Skill Iterate (`/pm-skill-iterate`) | New skill | Claude | — | Backlog | [#122](https://github.com/product-on-purpose/pm-skills/issues/122) |
| 13 | M-17 | GitHub Pages documentation site | Ecosystem | Claude | — | Backlog | — |

See individual effort briefs at `docs/internal/efforts/{ID}-{slug}.md` for scope, decisions, and artifacts.

## Moved to Knowledge OS (2026-03-21)

| ID | Effort | Previous status |
|----|--------|----------------|
| M-01 | `/common` shared workspace | Deferred |
| M-02 | `/update-doc` command and skill | Deferred |
| M-03 | `/link-docs` command and skill | Deferred |
| M-04 | `/project` context workflow | Deferred |

These are now part of a separate Product on Purpose initiative (Knowledge OS). See `docs/internal/_working/knowledge/` for exploration docs.

## Operating Rules

1. Open, close, prioritize, and milestone work in GitHub issues.
2. Capture durable scope and canonical links in `docs/internal/efforts/<effort-id>-<slug>.md`.
3. Capture release-specific gating and closure artifacts in `docs/internal/releases/vX.Y.Z/**`.
4. Keep `_NOTES/**` as local working material, not canonical backlog state.
