---
title: v2.20.0 Release Notes - Sprint Workflow Commands + Validation/Doc Hardening
description: 'v2.20.0 makes the three workshop methodologies runnable as single slash commands (/workflow-foundation-sprint, /workflow-design-sprint, /workflow-foundation-to-design) and hardens the documentation-count validators so stale counts cannot hide in table, parenthetical, or N-command-files phrasings. No new skills; slash commands grow from 70 to 73.'
date: 2026-05-25
status: SHIPPED
type: minor
---

**Released:** 2026-05-25
**Type:** Minor (3 new workflow commands; validator and doc-accuracy hardening; no new skills)
**Day-to-day usage:** purely additive. Every existing skill, command, and workflow is unchanged; v2.20.0 adds three workflow commands and tightens the CI gate.

## TL;DR

v2.20.0 closes the gap between the sprint *workflows* (which already existed as `_workflows/` guides) and the sprint *commands* (which did not). The three workshop methodologies are now invocable as single slash commands, and the documentation-count validators were hardened so stale counts cannot slip through in table, parenthetical, or "N command files" phrasings.

- **`/workflow-foundation-sprint`** - the 2-day Foundation Sprint arc, chained end-to-end
- **`/workflow-design-sprint`** - the 5-day Design Sprint arc, chained end-to-end
- **`/workflow-foundation-to-design`** - the full Foundation-to-Design arc with narrative handoff

Slash commands grow from 70 to 73. No new skills (catalog stays 63); the three sprint workflows already shipped as `_workflows/` files, so this adds their command entry points.

## What's new

### Three sprint workflow commands

Previously, the Foundation Sprint, Design Sprint, and the end-to-end arc were documented as `_workflows/` guides and driven only via their per-day `tool-*-sprint-*` commands. AGENTS.md advertised `/workflow-foundation-sprint`, `/workflow-design-sprint`, and `/workflow-foundation-to-design`, but no command files backed them, so typing those slash commands did nothing. v2.20.0 makes them real: each command chains its per-day sprint skills in canonical order, so a team can launch a whole sprint with one command.

(`triple-diamond` and `lean-startup` remain intentionally reference-only methodology guides, not slash commands.)

### Validation and doc-accuracy hardening

The release also tightens the gate so the defect class that motivated it cannot recur:

- **`check-agents-md-command-sync` now requires a real command file for every `/workflow-` row.** The validator previously accepted a `_workflows/` source alone, which is exactly how the three sprint commands stayed advertised-but-non-functional. Now an AGENTS.md `/workflow-*` row must be backed by `commands/workflow-<stem>.md`.
- **`check-count-consistency` now sees count drift in any phrasing.** It previously matched only `N commands` prose. It now also catches facts-table rows (`| Slash commands | 73 |`), parenthetical labels (`Commands (73)`), and singular-resource + count-noun forms (`63 skill directories`, `73 command docs`). This surfaced and fixed stale counts that had drifted for several releases in `docs/reference/ecosystem.md`, `docs/reference/runtime-components.md`, `QUICKSTART.md`, and `docs/getting-started/`.
- **Removed the vestigial `check-stale-bundle-refs` validator** - a v2.9.0 terminology guard made permanently unenforceable by the later "validator bundle" terminology.

## What this means for you

- **If you use the skills:** nothing changes. Update when convenient; every existing command behaves exactly as in v2.19.0. You gain three new ways to launch a sprint.
- **If you contribute:** the count and command-sync gates are stricter. A `/workflow-` row without a command file, or a stale count in a table/parenthetical/`N command files` form, now fails CI on both Ubuntu and Windows.

## Migration guide

```
# Update path
/plugin marketplace update
/plugin update pm-skills

# After update, pm-skills reports v2.20.0 and the three new workflow commands resolve.
```

Nothing existing changes. If you reference the catalog count in your own tooling, it remains 63 skills (now 73 slash commands).

## What does NOT change in v2.20.0

- All skills, templates, examples, and existing commands are unchanged; no skill behavior changes.
- Skill catalog (63), sub-agent definitions (4), and workflows (12) are unchanged; the three sprint workflows already existed as `_workflows/` files.
- Frontmatter structure, cross-client dispatch behavior, and the doc-stack (Astro 6.3.x + Starlight 0.39.x) are unchanged.

## Affected areas

| Area | Change |
|---|---|
| `commands/` | 3 new workflow commands (`/workflow-foundation-sprint`, `/workflow-design-sprint`, `/workflow-foundation-to-design`). Commands 70 to 73. |
| `scripts/` | `check-agents-md-command-sync` requires a command file per `/workflow-` row; `check-count-consistency` gains number-after + singular-noun coverage (both shells); `check-stale-bundle-refs` removed; `generate-skill-pages.py` emits the 3 new command rows. |
| `.github/workflows/` | `validation.yml` updated (removed the 2 stale-bundle-refs advisory steps). |
| `docs/reference/`, `QUICKSTART.md`, `docs/getting-started/` | Stale skill/command counts corrected to 63 / 73. |
| `README.md` / `AGENTS.md` | Version surfaces bumped to v2.20.0; What's New + release-history entries added; the 3 workflow command rows now resolve. |
| `.claude-plugin/plugin.json` + `marketplace.json` | Version 2.19.0 to 2.20.0; descriptions refreshed. |
