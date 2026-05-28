---
title: v2.22.0 Release Notes - Command/Skill Naming Standardization (additive)
description: 'v2.22.0 cleans up the way pm-skills capabilities are named and shown. Each of the 63 skills gets one short canonical name (`okr-writer` instead of `foundation-okr-writer`), and the duplicate menu entries created by hand-maintained command wrappers go away. Old names keep working for one full release as deprecated aliases, so no skill a user invokes today silently stops working. Shipped as a minor because the skill surface stays backward-compatible; the only signposted break is the un-namespaced Claude command wrapper (e.g. `/okr-writer`), replaced same-release by the namespaced skill (`/pm-skills:okr-writer`). The eventual removal of the deprecated aliases is reserved for v3.0.0.'
date: TBD
status: DRAFT
type: minor
---

> **DRAFT.** Polished and finalized at tag time. Tracking the work in [`docs/internal/release-plans/v2.22.0/`](../internal/release-plans/v2.22.0/plan_v2.22.0.md).

**Released:** TBD
**Type:** Minor (additive at the skill-name level; one small Claude-only command-wrapper break)
**Day-to-day usage:** mostly unchanged. Every skill produces the same artifacts and behaves the same way as in v2.21.0. The visible difference is in the menu and the names you type, not in what the skills do.

## TL;DR (the plain-language version)

Today, when you open the `/` menu in Claude Code, every pm-skills capability shows up **twice**: once with a short name (e.g. `/okr-writer`) and once with a longer one (`/pm-skills:foundation-okr-writer`). The two entries are the same thing under different names, which is confusing and clutters the menu.

v2.22.0 cleans this up:

- **Each capability now has one canonical short name** (`okr-writer`, `prd`, `persona`, etc.).
- **The duplicate menu entries go away.** Where you saw two rows for `okr-writer`, you now see one.
- **The same short name works in Codex, Cursor, Gemini, and other AI tools too**, not just Claude Code.
- **The old long names keep working for this release** as clearly-marked "deprecated" aliases, so anything you have set up today continues to work. They will be removed in v3.0.0, with plenty of notice.
- **What the skills produce, and how to use them, is unchanged.** This release is about names, not behavior.

If you do not type slash commands directly, or if you mostly invoke skills by describing what you want in plain English, **you will probably not notice this release at all** except that the menu is half as long.

## Why we made this change

Pm-skills has been growing for a while, and two things drifted along the way:

1. **The menu got cluttered.** Each of 63 capabilities had two entries: a short command (`/okr-writer`) and the skill it wrapped (`/pm-skills:foundation-okr-writer`). That is roughly 136 menu rows for 63 real things, and because the two entries were named differently, it was not obvious they were the same skill.
2. **The names were inconsistent.** Some skills got the phase prefix (`foundation-`, `tool-`, etc.), some did not, and there was no written rule. That is the kind of thing that creeps in slowly and gets harder to fix the longer you wait.

We picked **after the marketplace launch** as the right moment to clean it up: the library is small enough that renaming is cheap, and getting the names right *before* lots of new users learn the old ones is a one-time win.

There is also a cross-runtime story. Pm-skills now runs on Codex CLI, Cursor, Gemini CLI, and Copilot CLI in addition to Claude Code. The skill *name* is what users type on those other runtimes. A long phase-prefixed name like `$foundation-okr-writer` was extra friction every time. A short name like `$okr-writer` is the same word a Claude user already knew, just without the menu-prefix dressing.

## What changes for you

### If you use the skills in Claude Code

- The `/` menu shows roughly half as many rows.
- You will see `/pm-skills:okr-writer` (and the other short names) instead of `/pm-skills:foundation-okr-writer`.
- The long names still resolve this release. You will see them marked **deprecated** in the menu; switch to the short name when you have a moment.
- The one thing that goes away in v2.22.0 is the *un-namespaced* short command form (e.g. just `/okr-writer` with no `pm-skills:` prefix). The namespaced short skill (`/pm-skills:okr-writer`) replaces it the same release. If you had `/okr-writer` bookmarked or in a script, update it to `/pm-skills:okr-writer`.

### If you use the skills on Codex CLI, Cursor, Gemini CLI, or Copilot CLI

- You type the short name now: `$okr-writer` instead of `$foundation-okr-writer`.
- The long name still resolves this release (deprecated alias). It is removed in v3.0.0.
- If you invoke skills by describing what you want in plain language (rather than typing a name), **nothing changes**. The descriptions are unchanged.

### If you contribute skills

- A new naming rule is written down ([`command-skill-naming-standard.md`](../internal/release-plans/v2.22.0/command-skill-naming-standard.md)) and enforced by CI.
- The 63 hand-maintained command wrapper files (one per skill) are gone. The skill is now the single source of truth and accepts user input directly via `$ARGUMENTS`.
- Adding a new skill is now simpler: write the skill, and the naming validator tells you if the name does not conform. No parallel wrapper to maintain.

## What does NOT change in v2.22.0

- **Skill behavior, templates, and outputs** are identical. This is a naming change.
- **The catalog count** stays at 63 skills.
- **Existing marketplace installs** pinned to the v2.21.0 commit are unaffected; the rename lands in a later tag.
- **The Triple Diamond taxonomy** is preserved. The phase (define, deliver, develop, etc.) now lives in `metadata.classification` and the directory grouping instead of being baked into the typed name.
- **Skills whose name genuinely contains "pm"** (`pm-skill-builder`, `pm-critic`, `pm-changelog-curator`, and others that operate on the pm-skills library itself) keep the `pm-` prefix. It is part of their real name, not a generic stamp.
- **The 10 `workflow-*` commands** stay as they are. They orchestrate multiple skills; they are not duplicates of anything.
- **The marketplace install path and the old self-hosted path** are both untouched. This release does not affect distribution.

## The one small break in v2.22.0

The un-namespaced Claude command wrapper (e.g. `/okr-writer` without the `pm-skills:` prefix) is removed this release. The replacement is the namespaced short-name skill (`/pm-skills:okr-writer`), which lands the same release.

If you have `/okr-writer`-style bookmarks, snippets, or project instructions, update them to the namespaced form. This is a signposted change, not a silent one, and it is the only thing that goes away in v2.22.0. The removal of the deprecated long names (e.g. `foundation-okr-writer`) is reserved for v3.0.0, with its own notice a full release ahead.

## Why a minor, not a major?

By the SemVer compatibility test (does an existing user have to act on a skill they invoke today? no), this release is **additive at the skill level**. The skills you call still work, because the old names resolve as deprecated aliases. The one small wrapper-removal is Claude-only and signposted, with a same-release replacement. The genuine breaking step (removing the deprecated aliases) is the convergence major **v3.0.0**, bundled with the marketplace old-path retirement.

## Timeline

- **v2.22.0 (this release):** short names ship; old names still work (deprecated); the un-namespaced Claude command wrappers are removed.
- **v2.22.0 -> v3.0.0 window:** deprecation period. We monitor for any cross-tool name clashes. If any are reproduced, we extend the deprecation window.
- **v3.0.0:** the deprecated long names are removed, along with the old marketplace path. This is the breaking release, with its own notice well ahead of time.

## Affected areas

| Area | Change |
|---|---|
| Skill directories (`skills/<name>/`) | All 63 renamed from `<phase>-<name>` to `<short-name>`; the phase moves to `metadata.classification` (already present). Old names live as deprecated alias skills for one release. |
| Command wrappers (`commands/*.md`) | The 63 hand-maintained wrappers are removed; the 10 `workflow-*` orchestrator commands stay. |
| Internal cross-references | Workflows, guides, getting-started, agent-context, and the public reference at `docs/reference/runtime-components.md` are rewritten to use the short names. |
| Validation | A new naming validator (6 enforcing checks) joins the pre-tag bundle and CI, so the inconsistency cannot quietly creep back. |
| `README.md` / docs site | Examples and install instructions use the short names; the deprecation is noted. |
| `.claude-plugin/plugin.json` + `marketplace.json` | Version 2.21.0 to 2.22.0. |
| Historical files | Past release notes, past CHANGELOG entries, and library sample directories are **not** rewritten; they remain accurate records of what shipped under the old names. |

## For the curious: the deeper why

If you want the technical reasoning, three things drove the design:

1. **Single source of truth.** Hand-maintained parallel wrappers are exactly what produced the naming drift. Removing them and keeping the skill as the canonical artifact is the structural fix.
2. **The skill name is the cross-runtime typed identifier.** On Codex CLI and other non-Claude runtimes, the user types `$<skill-name>` directly. There is no menu-prefix dressing to make a long name feel shorter. So short-name ergonomics belong on the skill `name`, not on a Claude-only wrapper.
3. **The description is the real invocation interface.** Both Claude Code and Codex CLI can select a skill from natural-language descriptions. A user who never learns the name still reaches the skill if the description is well-written, and v2.22.0 introduces a CI-enforced floor for description quality.

The full reasoning, the locked decision briefs, the validator spec, the cross-runtime collision analysis, and the per-skill name map are in [`docs/internal/release-plans/v2.22.0/`](../internal/release-plans/v2.22.0/plan_v2.22.0.md).

## Questions or problems?

If you hit anything unexpected (a renamed skill behaving differently, a deprecated alias not resolving, a workflow that lost its target), please open an issue at [github.com/product-on-purpose/pm-skills/issues](https://github.com/product-on-purpose/pm-skills/issues). The rollback path is real and we will fix point regressions in v2.22.x patches.
