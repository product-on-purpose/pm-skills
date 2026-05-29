# v2.22.0 release comms drafts (wrapper deletion)

> Drafts for Phase 5 finalization. Scope: remove the 63 duplicate command wrappers, keep skill names, add the Codex manifest.

## CHANGELOG.md entry (draft)

```markdown
## [2.22.0] - 2026-XX-XX

### Added
- **Codex plugin manifest** (`.codex-plugin/plugin.json`) so Codex discovers the skills as a packaged plugin (fixes the "No plugin skills" listing). Points `privacyPolicyURL` at the existing `PRIVACY.md`.
- `validate-codex-manifest` CI check (manifest parses, `skills` begins with `./` and resolves, identity fields present); `.codex-plugin/plugin.json` added to the version-lockstep check.

### Removed
- The 63 hand-maintained short command wrappers (`commands/*.md` except `workflow-*`): 60 that duplicated a skill by its short name + 3 verb commands (`pm-audit-repo`, `pm-draft-changelog`, `pm-release`). Each capability now appears once in the `/` menu, as the skill. The 3 verb shortcuts are retired; invoke the corresponding sub-agent skill by name.

### Changed
- The skill-page generator emits the skill invocation (`/pm-skills:<name>`) instead of a wrapper command in its "Try it" / "How to Use" blocks.
- The 10 `workflow-*` orchestrator commands are retained and unchanged.

### Migration
- Skills are unchanged and keep their names. If you used a short command (`/pm-skills:okr-writer`), use the skill instead (`/pm-skills:foundation-okr-writer`): the skill name is the short name with its category prefix restored. Full mapping below / in the release notes.
```

## Community post (draft)

> **pm-skills v2.22.0: one entry per skill, and Codex support**
>
> Small, tidy release. Two things:
>
> 1. **No more double menu entries.** Each skill used to appear twice in `/` (its full name plus a short command wrapper). The short wrappers are gone, so each capability shows up once now.
> 2. **Codex sees the skills.** We added a Codex-native manifest, so Codex discovers the skills like Claude Code does (it previously listed the plugin but found no skills).
>
> Nothing about the skills changed - same names, same behavior. If you had a short command like `/pm-skills:okr-writer` saved somewhere, just use the skill's full name (`/pm-skills:foundation-okr-writer`); it is the same skill. Everything is in the `/pm-skills:` menu.
>
> (For the curious: we also fully planned a bigger change - renaming every skill to a short name - but it touched ~10x as much of the repo for what is mostly a naming preference, so we shipped the smaller, safer fix and parked the rename.)

## README change-spec (draft)

- **Counts:** command count 73 -> 10 (only `workflow-*` remain) everywhere it appears (badge / At-a-Glance / prose). Skill count unchanged (63).
- **Invocation examples:** any example showing a short command (`/pm-skills:okr-writer`) updates to the skill form (`/pm-skills:foundation-okr-writer`).
- **Codex section:** note that pm-skills now ships a `.codex-plugin/` manifest and is discoverable on Codex.
- **No structural/skill-list changes** - the 63 skills and their names are unchanged.
