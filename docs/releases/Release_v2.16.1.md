---
title: v2.16.1 Release Notes - Plugin Manifest Schema Patch
description: 'v2.16.1 ships a targeted patch that removes the invalid `agents` field from `.claude-plugin/plugin.json`. Resolves the `agents: Invalid input` validation error that blocked `/plugin update pm-skills` for all users since v2.16.0. The dispatch skills continue to operate via inline execution; native Claude Code sub-agent invocation is deferred to v2.17.0 pending the AGENTS/ directory rename.'
date: 2026-05-18
status: SHIPPED
type: patch
---

**Released:** 2026-05-18
**Type:** Patch (manifest schema correction; same 59-skill catalog as v2.16.0)
**Day-to-day usage:** identical to v2.16.0 for all skills, commands, workflows, and dispatch flows

## TL;DR

v2.16.0 shipped with an invalid field in `.claude-plugin/plugin.json` (`"agents": ["./subagents/"]`). Claude Code's plugin schema does not include an `agents` field, and the canonical sub-agent directory is `agents/`, not a configurable custom path. The result: any user attempting `/plugin update pm-skills` against v2.16.0 sees:

```
Plugin pm-skills has an invalid manifest file at .claude-plugin/plugin.json.
Validation errors: agents: Invalid input
```

v2.16.1 removes the offending field. `/plugin update pm-skills` now succeeds. The same 59-skill catalog ships unchanged.

Worth noting: because v2.16.0's manifest fails validation, no Claude Code user successfully installed v2.16.0 in the first place. Anyone whose `/plugin update` has been failing since 2026-05-17 is effectively still on v2.15.x. v2.16.1 is the first usable v2.16.x release.

## What's fixed

### Plugin manifest validation

- **Removed** `"agents": ["./subagents/"]` from `.claude-plugin/plugin.json`. The field is not part of Claude Code's plugin schema (verified against [code.claude.com/docs/en/plugins](https://code.claude.com/docs/en/plugins)). Custom paths for sub-agent directories are not supported.
- **Bumped** plugin.json version from `2.16.0` to `2.16.1`.
- **Bumped** marketplace.json pm-skills entry version from `2.16.0` to `2.16.1`.

### What the user experience looks like now

| Before v2.16.1 | After v2.16.1 |
|---|---|
| `/plugin update pm-skills` fails with `agents: Invalid input` | `/plugin update pm-skills` succeeds |
| Fresh `/plugin install pm-skills@pm-skills-marketplace` rejects the manifest | Fresh install succeeds |
| 59-skill catalog (skills + commands + workflows) | 59-skill catalog (unchanged) |
| Dispatch skills at `skills/utility-pm-*/` (4 of them) | Same 4 dispatch skills, unchanged |
| Native Claude Code sub-agent registration | Not registered (carry-over from v2.16.0; see Known limitations) |

## Why it matters

The schema-violation error was a hard block on the update path. Anyone on v2.13.0 through v2.15.x trying to update to v2.16.0 was bouncing off the validation error. Any new user installing for the first time hit the same wall. v2.16.1 unblocks that path.

The dispatch skills (`utility-pm-critic`, `utility-pm-skill-auditor`, `utility-pm-changelog-curator`, `utility-pm-release-conductor`) shipped in v2.16.0 continue to function. Their canonical SKILL.md content includes inline-execution logic that reads `subagents/pm-{role}.md` and executes the sub-agent's behavior step-by-step on any client. This is the path validated for Codex CLI on 2026-05-17 (GATE B + GATE C PASS). On Claude Code, the dispatch skills run the same inline path as a workaround until native sub-agent registration is fixed in v2.17.0.

## Known limitations carried forward to v2.17.0

### Native sub-agent registration on Claude Code

The 4 sub-agent definitions (`pm-critic`, `pm-skill-auditor`, `pm-changelog-curator`, `pm-release-conductor`) live in `subagents/` rather than the Claude Code-canonical `agents/` directory. Without the schema-invalid `"agents": ["./subagents/"]` mechanism v2.16.0 attempted, Claude Code does not auto-discover them as native sub-agents at install time.

The architectural fix requires renaming the existing tracked `AGENTS/` coordination directory (used for `AGENTS/DECISIONS.md`, `AGENTS/claude/CONTEXT.md`, `AGENTS/codex/CONTEXT.md`) to a name that does not collide with `agents/` on case-insensitive filesystems (Windows NTFS, macOS APFS). Once `AGENTS/` is freed up, `subagents/` can be renamed to `agents/` and Claude Code will auto-discover the sub-agents.

This rename is **deferred to v2.17.0** because:

- It touches a tracked directory referenced by multiple coordination files, scripts, and docs.
- Patch releases should not introduce structural changes.
- The dispatch-skill inline-execution path already works on every client, including Claude Code, so the user-facing capability is not lost in the interim.

Tracking: see master plan D31 amendment in [`docs/internal/release-plans/v2.16.0/plan_v2.16.0.md`](../internal/release-plans/v2.16.0/plan_v2.16.0.md) and the v2.17.0 plan stub at [`docs/internal/release-plans/v2.17.0/plan_v2.17.0.md`](../internal/release-plans/v2.17.0/plan_v2.17.0.md).

### What does NOT change in v2.16.1

- Skill catalog (59 skills: 26 phase + 8 foundation + 10 utility + 15 tool) is unchanged.
- Workflows (12) and slash commands (66) are unchanged.
- Dispatch skills behave the same way: they detect runtime, attempt native dispatch (Claude Code), and fall back to reading `subagents/pm-{role}.md` and executing inline (non-Claude clients, plus Claude Code while native registration is deferred).
- Doc-stack (Astro 6.3.x + Starlight 0.39.x, Node 22.12+) carried forward from v2.16.0.
- All v2.15.0 Sprint Skills, v2.12.0 OKR Skills, v2.11.0 Meeting Skills Family content unchanged.

## Affected files

| File | Change |
|---|---|
| `.claude-plugin/plugin.json` | Removed `agents` field; bumped version to 2.16.1 |
| `.claude-plugin/marketplace.json` | Bumped pm-skills version to 2.16.1; refreshed plugin description |
| `CHANGELOG.md` | Added 2.16.1 section |
| `docs/releases/Release_v2.16.1.md` | This file |

No skill content, command content, workflow content, sub-agent definition content, docs site content, validator scripts, or CI workflows changed in v2.16.1.

## How to update

If you have v2.16.0 cached locally (and are seeing the validation error):

```
/plugin update pm-skills
```

You should see the cache resolve to the new `2.16.1` snapshot at `~/.claude/plugins/cache/pm-skills-marketplace/pm-skills/2.16.1/`.

If you have an earlier version cached (v2.13.x through v2.15.x), the same `/plugin update pm-skills` command pulls v2.16.1 directly. You skip the broken v2.16.0 snapshot.

If you have not installed pm-skills yet, the standard install path is unchanged:

```
/plugin marketplace add product-on-purpose/pm-skills
/plugin install pm-skills@pm-skills-marketplace
```

## Roadmap

### v2.17.0 (next minor)

The architectural follow-on for native sub-agent registration:

1. Rename tracked `AGENTS/` coordination directory to a name that does not collide with `agents/` on case-insensitive filesystems.
2. Rename `subagents/` to `agents/` at the plugin root.
3. Update internal path references (scripts, docs, CONTEXT.md files).
4. Verify Claude Code auto-discovery of all 4 sub-agents at install time.
5. Validate full cross-client matrix (Claude Code, Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI) per the v2.16.0 deferred work.

Tracking: [`docs/internal/release-plans/v2.17.0/plan_v2.17.0.md`](../internal/release-plans/v2.17.0/plan_v2.17.0.md).

### Marketplace multi-plugin migration

Separately tracked at [`docs/internal/marketplace-multi-plugin-migration_2026-05-18.md`](../internal/marketplace-multi-plugin-migration_2026-05-18.md). v3.0.0 candidate. Independent of the v2.17.0 native-sub-agent fix; they can ship sequentially or interleaved.

---

## Verification

After installing v2.16.1, verify:

```
/plugin list                          # confirms pm-skills @ 2.16.1
```

The four dispatch skills should be invocable via slash commands as in v2.16.0:

```
/critic                               # invokes utility-pm-critic dispatch
/audit-repo                           # invokes utility-pm-skill-auditor dispatch
/draft-changelog                      # invokes utility-pm-changelog-curator dispatch
/release                              # invokes utility-pm-release-conductor dispatch
```

On Claude Code, these continue to run via the dispatch skills' inline-execution path until v2.17.0 ships native sub-agent registration.
