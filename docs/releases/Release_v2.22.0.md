---
title: v2.22.0 Release Notes - Command/Skill Naming Standardization
description: 'v2.22.0 gives each of the 63 skills one short canonical name (`okr-writer` instead of `foundation-okr-writer`), removes the duplicate menu entries created by hand-maintained command wrappers, and adds a Codex-native plugin manifest so the skills are discoverable on Codex. This is a hard rename: the old phase-prefixed names are removed in the same release, with an old -> new migration table as the lookup. Shipped as a minor under the stance that skill invocation names are not part of the SemVer-governed surface (the install path and plugin identity are). Skill behavior is unchanged.'
date: TBD
status: DRAFT
type: minor
---

> **DRAFT.** Polished and finalized at tag time. The internal planning docs that track this work live in the repo (they are not published to the public docs site).

**Released:** TBD
**Type:** Minor (skill invocation names are declared outside the SemVer-governed surface; the install path and plugin identity are the governed contract)
**Day-to-day usage:** the skills produce the same artifacts and behave the same way as in v2.21.0. The visible difference is in the menu and the names you type, not in what the skills do.

## TL;DR (the plain-language version)

Today, when you open the `/` menu in Claude Code, every pm-skills capability shows up **twice**: once with a short name (e.g. `/okr-writer`) and once with a longer one (`/pm-skills:foundation-okr-writer`). The two entries are the same thing under different names, which is confusing and clutters the menu.

v2.22.0 cleans this up:

- **Each capability now has one canonical short name** (`okr-writer`, `prd`, `persona`, etc.).
- **The duplicate menu entries go away.** The menu halves immediately.
- **The same short name works on Codex too**, not just Claude Code, and pm-skills now ships a Codex-native manifest so Codex can actually see its skills. (Cursor, Gemini, and Copilot read the same skill standard and are expected to benefit; the packaged manifests this release adds are Claude and Codex.)
- **The old long names are removed this release** (a hard rename, no deprecation window). If you have an old name memorized or in a script, the [migration table](#migration-old-name-to-new-name) maps every old name to its new one.
- **What the skills produce, and how to use them, is unchanged.** This release is about names and packaging, not behavior.

If you invoke skills by describing what you want in plain English rather than typing exact names, **you will mostly not notice this release** except that the menu is half as long.

## Why we made this change

Two things drifted as pm-skills grew:

1. **The menu got cluttered.** Each of 63 capabilities had two entries: a short command (`/okr-writer`) and the skill it wrapped (`/pm-skills:foundation-okr-writer`). That is roughly 136 menu rows for 63 real things, and because the two entries were named differently, it was not obvious they were the same skill.
2. **The names were inconsistent.** Some skills carried a phase prefix (`foundation-`, `tool-`, etc.), some did not, and there was no written rule.

We picked **after the marketplace launch** as the moment to fix it: the library is small enough that the rename is achievable (a live scan found ~1,457 prefixed-name occurrences across ~250 files, bounded and mostly mechanical), and getting the names right before lots of new users learn the old ones is a one-time win.

There is also a cross-runtime story. The skill *name* is what users type on Codex CLI and other non-Claude runtimes, where a long `$foundation-okr-writer` is friction on every call. And a separate gap surfaced during this cycle: pm-skills shipped only a Claude manifest, so Codex's marketplace listed the plugin but reported "No plugin skills." v2.22.0 adds the Codex-native `.codex-plugin/plugin.json` so the skills are discoverable there.

## What changes for you

### If you use the skills in Claude Code

- The `/` menu shows roughly half as many rows, immediately.
- You will see `/pm-skills:okr-writer` (and the other short names) instead of `/pm-skills:foundation-okr-writer`.
- The old long names are **removed** this release. If you had `/pm-skills:foundation-okr-writer` in a snippet or project instruction, update it using the [migration table](#migration-old-name-to-new-name).
- The un-namespaced short command form (e.g. just `/okr-writer`) is also gone; the namespaced short skill (`/pm-skills:okr-writer`) replaces it.

### If you use the skills on Codex CLI (or another non-Claude runtime)

- You type the short name now: `$okr-writer` instead of `$foundation-okr-writer`.
- On Codex, pm-skills now carries a native manifest, so its skills show up as a packaged plugin (previously they did not). The packaged manifests this release adds are **Claude and Codex only**. Cursor, Gemini, and Copilot can use the skills wherever they read the agentskills.io standard, but dedicated per-runtime packaging for them is separate, later work.
- The old long name is **removed** this release; the [migration table](#migration-old-name-to-new-name) maps it to the new one.
- If you invoke skills by describing what you want in plain language, **nothing changes**; the descriptions are not renamed (some are sharpened to meet a new quality floor).

### If you contribute skills

- A naming rule is written down and enforced by CI.
- The hand-maintained command wrapper files are gone. The skill is the single source of truth and accepts user input directly via `$ARGUMENTS`.
- The validator suite gained a naming check, a Codex-manifest check, and a 3-manifest version-lockstep check, so the inconsistency cannot quietly creep back.

## What does NOT change in v2.22.0

- **Skill behavior, templates, and outputs** are identical. This is a naming and packaging change.
- **The catalog count** stays at 63 skills.
- **Existing marketplace installs** pinned to the v2.21.0 commit are unaffected; the rename lands in a later tag.
- **The Triple Diamond taxonomy** is preserved. The phase (define, deliver, develop, etc.) lives in `metadata.classification` and the directory grouping instead of the typed name.
- **Skills whose name genuinely contains "pm"** (`pm-skill-builder`, `pm-critic`, `pm-changelog-curator`, and the other library-tooling skills) keep the `pm-` prefix. It is part of their real name, not a generic stamp.
- **The 10 `workflow-*` commands** stay as they are.
- **The marketplace install path and the old self-hosted path** are both untouched. Distribution is unchanged.

## Migration (old name to new name)

Because this is a hard rename with no alias window, anyone who learned an old name needs the lookup. The rule is simple: drop the leading phase/classification token (`define-`, `deliver-`, `develop-`, `discover-`, `foundation-`, `iterate-`, `measure-`, `tool-`, `utility-`). The full mapping for all 63 skills:

**Discover:** `discover-competitive-analysis` -> `competitive-analysis` | `discover-interview-synthesis` -> `interview-synthesis` | `discover-journey-map` -> `journey-map` | `discover-market-sizing` -> `market-sizing` | `discover-stakeholder-summary` -> `stakeholder-summary`

**Define:** `define-hypothesis` -> `hypothesis` | `define-jtbd-canvas` -> `jtbd-canvas` | `define-opportunity-tree` -> `opportunity-tree` | `define-prioritization-framework` -> `prioritization-framework` | `define-problem-statement` -> `problem-statement`

**Develop:** `develop-adr` -> `adr` | `develop-design-rationale` -> `design-rationale` | `develop-solution-brief` -> `solution-brief` | `develop-spike-summary` -> `spike-summary`

**Deliver:** `deliver-acceptance-criteria` -> `acceptance-criteria` | `deliver-edge-cases` -> `edge-cases` | `deliver-launch-checklist` -> `launch-checklist` | `deliver-prd` -> `prd` | `deliver-release-notes` -> `release-notes` | `deliver-user-stories` -> `user-stories`

**Measure:** `measure-dashboard-requirements` -> `dashboard-requirements` | `measure-experiment-design` -> `experiment-design` | `measure-experiment-results` -> `experiment-results` | `measure-instrumentation-spec` -> `instrumentation-spec` | `measure-okr-grader` -> `okr-grader` | `measure-survey-analysis` -> `survey-analysis`

**Iterate:** `iterate-lessons-log` -> `lessons-log` | `iterate-pivot-decision` -> `pivot-decision` | `iterate-refinement-notes` -> `refinement-notes` | `iterate-retrospective` -> `retrospective`

**Foundation:** `foundation-lean-canvas` -> `lean-canvas` | `foundation-meeting-agenda` -> `meeting-agenda` | `foundation-meeting-brief` -> `meeting-brief` | `foundation-meeting-recap` -> `meeting-recap` | `foundation-meeting-synthesize` -> `meeting-synthesize` | `foundation-okr-writer` -> `okr-writer` | `foundation-persona` -> `persona` | `foundation-stakeholder-update` -> `stakeholder-update`

**Tool (sprint families keep their methodology stem; only `tool-` drops):** `tool-design-sprint-brief` -> `design-sprint-brief` (and the other six `tool-design-sprint-*` -> `design-sprint-*`) | `tool-foundation-sprint-basics` -> `foundation-sprint-basics` (and the other six `tool-foundation-sprint-*` -> `foundation-sprint-*`) | `tool-note-and-vote` -> `note-and-vote`

**Utility (the library-tooling skills keep `pm-`):** `utility-mermaid-diagrams` -> `mermaid-diagrams` | `utility-slideshow-creator` -> `slideshow-creator` | `utility-pm-skill-builder` -> `pm-skill-builder` | `utility-pm-skill-iterate` -> `pm-skill-iterate` | `utility-pm-skill-validate` -> `pm-skill-validate` | `utility-pm-skill-auditor` -> `pm-skill-auditor` | `utility-pm-critic` -> `pm-critic` | `utility-pm-changelog-curator` -> `pm-changelog-curator` | `utility-pm-release-conductor` -> `pm-release-conductor` | `utility-update-pm-skills` -> `update-pm-skills`

**Removed Claude command verbs (reach the skill instead):** `/pm-audit-repo` -> `/pm-skills:pm-skill-auditor` | `/pm-draft-changelog` -> `/pm-skills:pm-changelog-curator` | `/pm-release` -> `/pm-skills:pm-release-conductor`

## Why a minor, not a major?

A hard rename removes the old names, which could read as a breaking change. We ship it as a **minor** under an explicit, recorded stance: **skill invocation names are not part of pm-skills' SemVer-governed public API.** The governed contract is the install path and the plugin identity, both unchanged here: the plugin still installs and works, and every capability is still present. Individual skill names are convenience handles, not a stability guarantee, which is a defensible position for a library at this stage. The one genuine breaking removal on the roadmap, retiring the old self-hosted marketplace path, is reserved for v3.0.0.

## Timeline

- **v2.22.0 (this release):** short names ship; old names are removed (migration table provided); the un-namespaced Claude command wrappers are removed; the Codex manifest is added.
- **v3.0.0 (trigger-gated on a second plugin):** the old self-hosted marketplace path is retired. This is the breaking release, with its own notice ahead of time. (There is no skill-name alias removal at v3.0.0; the hard rename completed the naming change here.)

## Affected areas

| Area | Change |
|---|---|
| Skill directories (`skills/<name>/`) | All 63 renamed from `<phase>-<name>` to the short name; the phase moves to `metadata.classification`. Old names are removed (no alias stubs). |
| Command wrappers (`commands/*.md`) | The hand-maintained wrappers are removed; the 10 `workflow-*` orchestrator commands stay. |
| Generated docs | `docs/skills/` and `docs/workflows/` are regenerated from the renamed sources; doc-site redirects map old skill URLs to new. |
| Sample library | `library/skill-output-samples/` and `library/sub-agent-samples/` are renamed to match the new skill names. |
| Cross-references | Workflows, guides, getting-started, agent context, `AGENTS.md`, `README.md`, and `docs/reference/runtime-components.md` are rewritten to the short names. |
| Packaging | New `.codex-plugin/plugin.json` (Codex-native manifest) and `PRIVACY.md`. |
| Validation | A naming check, a Codex-manifest check, and a version-lockstep check join the pre-tag bundle and CI. |
| Manifests | `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, and `.codex-plugin/plugin.json` bumped to 2.22.0 in lockstep. |
| Historical files | Past release notes and CHANGELOG entries are **not** rewritten; they remain accurate records of what shipped under the old names. |

## For the curious: the deeper why

Three things drove the design:

1. **Single source of truth.** Hand-maintained parallel wrappers produced the naming drift. Removing them and keeping the skill canonical is the structural fix.
2. **The skill name is the cross-runtime typed identifier.** On non-Claude runtimes the user types `$<skill-name>` directly, with no menu-prefix dressing, so short-name ergonomics belong on the skill `name`.
3. **Cross-runtime means cross-packaging, not only cross-naming.** Each runtime reads its own manifest, which is why the Codex `.codex-plugin/plugin.json` is part of this release.

The full reasoning, decision briefs, validator spec, cross-runtime collision analysis, and per-skill name map are tracked in the repo's internal release-plan docs (not published to the public site).

## FAQ

**Will my skills stop working?** No. Every skill is still here and behaves identically. Only the name you type changed (shorter), and on Claude Code the menu now shows one entry per skill instead of two.

**I have `/pm-skills:foundation-okr-writer` (or `$foundation-okr-writer`) in a script or saved prompt. What do I do?** Update it to the short name (`okr-writer`) using the migration table above. The old prefixed name does not resolve after this release; this is a hard rename with no alias period.

**Why no deprecation or alias window?** The goal was one name per capability. A temporary alias would mean two working names for the same skill during the window, a faint return of the duplication we set out to remove. At this adoption level a migration table is a cleaner answer than carrying aliases.

**Why is a rename only a minor version?** pm-skills treats skill invocation names as not-yet-frozen: the install path and plugin identity are the stability contract; individual skill names are convenience handles. Renaming them is not a breaking-API event under that stance. The one breaking change on the roadmap, retiring the old self-hosted marketplace path, is reserved for v3.0.0.

**Does this break my marketplace install?** No. Installs pinned to the v2.21.0 commit are unaffected; the rename lands in a later tag. Updating to v2.22.0 gives you the short names.

**Is the Triple Diamond taxonomy gone?** No. The phase still lives in `metadata.classification`, the docs are grouped by phase, and the sprint and meeting families keep their descriptive stems. It is just no longer baked into every typed name.

**What changed for Codex specifically?** pm-skills now ships a Codex-native manifest (`.codex-plugin/plugin.json`), so its skills are discoverable as a packaged plugin on Codex (previously they were not), and you type the short name (`$okr-writer`).

## Questions or problems?

If you hit anything unexpected (a renamed skill behaving differently, a workflow that lost its target, a Codex install not surfacing skills), please open an issue at [github.com/product-on-purpose/pm-skills/issues](https://github.com/product-on-purpose/pm-skills/issues). We will fix point regressions in v2.22.x patches.
