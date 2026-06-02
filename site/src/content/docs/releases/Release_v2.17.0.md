---
slug: releases/Release_v2.17.0
title: v2.17.0 Release Notes - Native Sub-Agent Registration + Frontmatter Spec Alignment
description: 'v2.17.0 delivers native Claude Code sub-agent registration by moving sub-agent definitions to the canonical agents/ directory (the coordination directory was renamed AGENTS/ to _agent-context/ to free the name). It also migrates skill frontmatter to the metadata-nested agentskills.io structure and makes the CI validators bash-3.2 portable. Same 59-skill catalog; cross-client clients keep full functionality via the dispatch skills.'
date: 2026-05-20
status: SHIPPED
type: minor
---

**Released:** 2026-05-20
**Type:** Minor (structural; same 59-skill catalog as v2.16.x)
**Day-to-day usage:** identical for all skills, commands, and workflows. On Claude Code the 4 sub-agents now dispatch via native `@`-mention; on other clients the dispatch skills work exactly as before.

## TL;DR

v2.17.0 closes the architectural gap that v2.16.x carried as a Known Limitation: the 4 sub-agents (`pm-critic`, `pm-skill-auditor`, `pm-changelog-curator`, `pm-release-conductor`) now **register natively on Claude Code**. Their definitions live in the canonical `agents/` directory, so they auto-discover and dispatch via `@`-mention (`@pm-critic`, etc.).

Two coordinated directory renames make this work on case-insensitive filesystems (Windows NTFS, macOS APFS):

- `subagents/` to `agents/` (the sub-agent definitions; now auto-discovered)
- `AGENTS/` to `_agent-context/` (the agent-coordination directory; renamed to free the lowercase `agents/` name)

v2.17.0 also migrates skill frontmatter to the metadata-nested structure per the [agentskills.io specification](https://agentskills.io/specification) and makes the CI validators bash-3.2 portable (macOS default bash). The 59-skill catalog is unchanged.

## What's changed

### Native Claude Code sub-agent registration (LIVE)

Through v2.16.x, the sub-agent definitions lived in a `subagents/` directory because the lowercase `agents/` name collided with the repo's then-uppercase `AGENTS/` coordination directory on case-insensitive filesystems. v2.16.0 attempted to declare a custom path via a `plugin.json` field that turned out to be invalid (removed in v2.16.1), so native registration never actually worked.

v2.17.0 resolves it structurally: the coordination directory was renamed to `_agent-context/`, freeing the `agents/` name, and the sub-agent definitions moved there. Claude Code's plugin runtime auto-discovers `agents/*.md` at install time. Verified live on 2026-05-20: after `/plugin update` + `/reload-plugins`, all 4 sub-agents appear in the `@`-mention menu with their descriptions.

### Frontmatter metadata-nested migration

All 59 skills moved `phase`, `classification`, `version`, and `updated` under the `metadata:` block, leaving only spec-recognized fields (`name`, `description`, `license`, `metadata`) at the top level per the agentskills.io specification. Validators and the doc-stack generators were updated to read the nested structure.

### bash-3.2 validator portability

8 CI validators were rewritten to run on macOS default bash 3.2 (replacing `mapfile`/`readarray` and `declare -A` associative arrays, which are bash 4+ features). `check-count-consistency` gained a non-git-work-tree fallback so it degrades gracefully when run from the unpacked plugin install cache. `check-version-references` was wired into the pre-tag bundle as a non-blocking advisory step.

## Migration guide

For the vast majority of users (installing pm-skills as a Claude Code plugin), **no action is needed** - the plugin runtime handles the new layout automatically. The notes below are for contributors, fork maintainers, and anyone whose tooling references pm-skills paths directly.

| If you... | Then... |
|---|---|
| Install pm-skills via the marketplace / `/plugin` | Nothing to do. Run `/plugin update pm-skills` + `/reload-plugins`; the 4 sub-agents auto-register. |
| Reference `subagents/{name}.md` in scripts or docs | Update the path to `agents/{name}.md`. |
| Reference the `AGENTS/` coordination directory in tooling | Update to `_agent-context/`. The singular `AGENTS.md` discovery file at the repo root is **unchanged**. |
| Manually copied a sub-agent (e.g. to `~/.claude/agents/pm-critic.md`) | Re-copy from the new `agents/pm-critic.md` location. |
| Author or fork skills | New skills must nest `phase`/`classification`/`version`/`updated` under `metadata:`. See an existing `skills/*/SKILL.md` for the shape. |
| Run the CI validators on macOS | They now run on the default bash 3.2 (no Homebrew bash 4+ required). |

## Why it matters

The dispatch-skill pattern always gave every client (Claude Code included) access to sub-agent behavior via the inline-execution path. But on Claude Code, native registration unlocks the ergonomic path: `@pm-critic` from the prompt, proactive invocation after PM-artifact skills, and the conductor's native chain composition to the auditor and curator. v2.17.0 makes the dispatch skill descriptions (which already claimed native `@`-mention dispatch) true.

The frontmatter migration aligns pm-skills with the agentskills.io spec's recognized field set, and the validator portability work means the `/pm-skills:pm-audit-repo` governance audit runs cleanly from the install cache on macOS.

## What does NOT change in v2.17.0

- Skill catalog (59 skills: 26 phase + 8 foundation + 10 utility + 15 tool) is unchanged.
- Workflows (12) and slash commands (66) are unchanged.
- The 4 sub-agents and 4 dispatch skills are unchanged in behavior; only their directory path changed.
- Cross-client dispatch (Codex CLI validated at v2.16.0; Cursor / Windsurf / Copilot CLI / Gemini CLI via the dispatch skills) is unchanged.
- Doc-stack (Astro 6.3.x + Starlight 0.39.x, Node 22.12+) carried forward.

## Affected areas

| Area | Change |
|---|---|
| `agents/` (was `subagents/`) | Sub-agent definitions relocated; natively auto-discovered. Phantom `agents/README.md` removed. |
| `_agent-context/` (was `AGENTS/`) | Agent-coordination directory renamed. |
| `skills/*/SKILL.md` (59) | Frontmatter migrated to metadata-nested structure. |
| `scripts/*.sh` | 8 validators made bash-3.2 portable; `check-count-consistency` non-git fallback; `check-version-references` wired advisory into the pre-tag bundle. |
| `.claude-plugin/plugin.json` + `marketplace.json` | Version 2.16.2 to 2.17.0; descriptions refreshed. |
| `README.md`, `CHANGELOG.md` | Version badge, What's New, release-history, and changelog entry. |
| Doc-stack (`docs/concepts`, `docs/contributing`, `docs/guides`, `docs/reference`) | Sub-agent docs updated for native discovery; obsolete custom-path rationale replaced. |
