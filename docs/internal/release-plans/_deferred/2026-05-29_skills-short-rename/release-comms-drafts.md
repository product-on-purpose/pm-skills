# v2.22.0 Release Comms - Drafts

> Staging for the release comms. Drafted 2026-05-28. Finalize at tag time (set the date, the release-notes link, and re-derive counts after the rename executes). The release notes themselves live in `docs/releases/Release_v2.22.0.md` (with an FAQ section added 2026-05-28).

---

## 1. CHANGELOG entry draft (for `CHANGELOG.md` at tag time)

```markdown
## [2.22.0] - <date>

### Added
- Short canonical skill names for all 63 skills (e.g. `okr-writer` for `foundation-okr-writer`).
- Codex-native plugin manifest (`.codex-plugin/plugin.json`) so Codex discovers pm-skills' skills as a packaged plugin; `PRIVACY.md`.
- CI: naming validator, Codex-manifest validator, and a three-manifest version-lockstep check.

### Changed
- Skill phase now lives only in `metadata.classification` (normalized across all 63 skills), not in the typed name.
- Docs, workflows, `AGENTS.md`, references, and the doc generators updated to the short names.

### Removed
- The hand-maintained command wrappers (all non-`workflow-*`); the 10 `workflow-*` orchestrators remain.
- The verb commands `/pm-audit-repo`, `/pm-draft-changelog`, `/pm-release` (reach the skills `pm-skill-auditor`, `pm-changelog-curator`, `pm-release-conductor` instead).

### Renamed
- All 63 skills lose their phase/classification prefix. See the v2.22.0 release notes for the full old -> new table. This is a hard rename with no deprecated aliases: update old names directly.
```

Note: under "Renamed" the old phase-prefixed names stop resolving. Treated as a minor per the recorded stance that skill invocation names are outside the SemVer-governed surface (the install path is the governed contract).

---

## 2. Community post draft (forum / Discord / X)

**pm-skills v2.22.0: shorter skill names + Codex support**

We cleaned up how pm-skills capabilities are named. Each of the 63 skills now has one short canonical name (`okr-writer`, `prd`, `persona`) instead of a phase-prefixed one (`foundation-okr-writer`), and the duplicate entries in the Claude Code `/` menu are gone, so the menu is about half as long.

Two practical wins:

- **Cross-tool ergonomics.** The skill name is what you type on Codex and other runtimes, so `$okr-writer` beats `$foundation-okr-writer` on every keystroke.
- **Codex discovery.** pm-skills now ships a Codex-native manifest, so its skills show up as a proper packaged plugin on Codex (they did not before).

This is a hard rename with no alias window, so if you have an old name in a script or a saved prompt, grab the new one from the migration table in the release notes. Your skills, templates, and outputs are unchanged; this is names and packaging only. Marketplace installs pinned to the current commit are unaffected until you update.

Full notes and the complete old -> new mapping: <release-notes link>. Hit a snag? Open an issue.

---

## 3. README update spec (apply during Phase 3 execution, after names are final)

A full README rewrite waits for the rename to execute so the names are final. The changes to make:

- Replace every skill reference `<phase>-<name>` with `<name>` per the migration table (e.g. `foundation-okr-writer` -> `okr-writer`). Keep the `pm-` skills, the `foundation-sprint-*` / `design-sprint-*` families, and the `meeting-*` family per the table.
- Command examples: `/okr-writer` and `/pm-skills:foundation-okr-writer` -> `/pm-skills:okr-writer`.
- Counts: "73 commands" -> "10 workflow commands"; "63 skills" stays. Re-derive the "At a Glance" table; a prior review found the phase-count row read `26` while the actual phase-dir total is `30` (5+5+4+6+6+4), so set it to `30`. (`check-count-consistency` + `check-version-references` guard these.)
- Add a one-line note: "v2.22.0 renamed skills to short canonical names; see the release notes for the old -> new mapping."
- Add the Codex install note: pm-skills is now a packaged plugin on Codex via `.codex-plugin/plugin.json`.
- Install snippets are unchanged (the install path did not change).
- Bump any version badge to 2.22.0 (kept in lockstep by `validate-version-consistency`).
