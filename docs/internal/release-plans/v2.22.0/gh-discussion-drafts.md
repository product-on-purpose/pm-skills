# v2.22.0 GitHub Discussion drafts

> Copy-paste-ready announcement posts for the v2.22.0 release. Four variants:
> short/long x non-engineer/engineer. Post in the **Announcements** category.
> Each body is fenced as `markdown` so you can copy it verbatim; the body uses
> only inline code + tables (no multi-line code fences) so it pastes cleanly.
>
> Fill the two links once the tag is pushed:
> - Release page: `https://github.com/product-on-purpose/pm-skills/releases/tag/v2.22.0`
> - Changelog: `https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md`

---

## Variant A - Short / Non-engineer

**Suggested title:** `pm-skills v2.22.0: one entry per skill, plus native Codex support`

```markdown
**TL;DR.** Each skill now shows up **once** in the `/` menu (the duplicate shortcuts are gone), and pm-skills now works as a native **Codex** plugin. Nothing about the skills themselves changed.

Two small, tidy changes:

- **One menu entry per skill.** Every capability used to appear twice in the `/` menu: once under its full name, once as a short shortcut. The shortcuts are removed, so each skill now appears once, under its name.
- **Codex now sees the skills.** We added a Codex-native manifest, so Codex discovers the skills the same way Claude Code does (it previously listed the plugin but reported "No plugin skills").

**Do I need to do anything?** Almost certainly not - every skill is still in the `/pm-skills:` menu under its name. The one exception: if you saved a short shortcut like `/pm-skills:okr-writer` in a prompt or script, switch it to the full skill name (`/pm-skills:foundation-okr-writer`). It is the same skill.

Full notes: [Release v2.22.0](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.22.0). Questions welcome below.
```

---

## Variant B - Long / Non-engineer

**Suggested title:** `pm-skills v2.22.0: one entry per skill, plus native Codex support`

```markdown
This is a small, tidy release - two improvements about clarity and reach, neither of which changes what the skills do.

## What changed

**1. No more double entries.** Each skill used to appear twice in the `/` menu: once under its full name (`/pm-skills:foundation-okr-writer`) and once as a short shortcut (`/pm-skills:okr-writer`). The 63 short shortcuts are removed, so each capability now appears **once**, as the skill.

**2. Codex now sees the skills.** pm-skills previously shipped only a Claude manifest, so Codex listed the plugin but reported "No plugin skills." This release adds a Codex-native manifest, so Codex discovers the skills the same way Claude Code does.

## What did NOT change

- **Every skill keeps its name and behavior.** `foundation-okr-writer`, `deliver-prd`, `discover-journey-map` - all unchanged. Nothing was renamed.
- **How you use them is identical.** This release removes a redundant layer and adds packaging; it does not touch any skill's output.
- The 10 `/workflow-*` orchestrator commands (the multi-step sequences) are unchanged.

## Do I need to do anything?

Almost certainly not - the skills are all still in the `/pm-skills:` menu under their names. The one case that needs a small update: **if you saved a short shortcut** (like `/pm-skills:okr-writer`) in a saved prompt, switch it to the skill's full name.

The rule: the full name is the short name with its category prefix restored (`define-`, `deliver-`, `develop-`, `discover-`, `foundation-`, `iterate-`, `measure-`, `tool-`, `utility-`). A few examples:

| If you used | Use the skill |
|---|---|
| `/pm-skills:okr-writer` | `/pm-skills:foundation-okr-writer` |
| `/pm-skills:prd` | `/pm-skills:deliver-prd` |
| `/pm-skills:journey-map` | `/pm-skills:discover-journey-map` |
| `/pm-skills:note-and-vote` | `/pm-skills:tool-note-and-vote` |

## FAQ

**Why remove the short names instead of making them the real names?** That bigger change (renaming all 63 skills to short names) was fully planned and reviewed, but it touches roughly ten times as much of the project for what is mostly a naming preference. We chose the smaller, safer change that fixes the actual problem now; the short-name idea is parked and may return as its own release.

**Did anything about the skills get worse?** No - they are byte-for-byte the same. You just invoke them by their full name, which is what every other client (Codex, Cursor, Gemini) already used.

Full notes: [Release v2.22.0](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.22.0) | [Changelog](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md). Questions welcome below.
```

---

## Variant C - Short / Engineer

**Suggested title:** `v2.22.0: delete the 63 per-skill command wrappers (keep skill names) + add Codex manifest`

```markdown
**TL;DR.** Removed the 63 duplicate per-skill command wrappers (slash commands 73 to 10; only `/workflow-*` remain), kept all 63 skill names, retired master-plan D6 (the "every sub-agent ships a companion command" contract + `agents/_pairing.yaml`), and added `.codex-plugin/plugin.json` so Codex packages and discovers the skills. Ships as a **MINOR** - no skill behavior changed.

**Invocation is now uniform** - every capability is a skill, invoked by name:

- Claude Code: `/pm-skills:<skill-name>`
- Codex: `$<skill-name>`
- The 4 sub-agents: their `utility-pm-*` dispatch skill, or `@agent-pm-skills:<name>` on Claude Code.

**Migration.** The short command was the skill name with its phase prefix stripped; restore the prefix. The 4 verb commands map to their utility skills:

| Removed | Use instead |
|---|---|
| `/pm-skills:okr-writer` | `/pm-skills:foundation-okr-writer` |
| `/pm-skills:prd` | `/pm-skills:deliver-prd` |
| `/pm-critic` | `/pm-skills:utility-pm-critic` (or `@agent-pm-skills:pm-critic`) |
| `/pm-audit-repo` | `/pm-skills:utility-pm-skill-auditor` |
| `/pm-draft-changelog` | `/pm-skills:utility-pm-changelog-curator` |
| `/pm-release` | `/pm-skills:utility-pm-release-conductor` |

[Release v2.22.0](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.22.0) | [Changelog](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md).
```

---

## Variant D - Long / Engineer

**Suggested title:** `v2.22.0: delete the 63 per-skill command wrappers (keep skill names) + add Codex manifest`

```markdown
## Why

Two problems, one release:

1. **Duplication.** Every capability appeared twice in the `/` menu - once as the skill (`/pm-skills:foundation-okr-writer`) and once as a hand-maintained short command wrapper (`/pm-skills:okr-writer`). 63 wrapper files that had to be kept in sync, for a convenience layer that duplicated the skills.
2. **Codex discovery.** The repo shipped only a `.claude-plugin/` manifest; Codex reads `.codex-plugin/plugin.json`, so the marketplace listed pm-skills but reported "No plugin skills."

## What changed

- **Deleted the 63 non-`workflow-*` command wrappers** in `commands/` (59 skill-backed short wrappers + the 4 sub-agent companion verbs `pm-critic`, `pm-audit-repo`, `pm-draft-changelog`, `pm-release`). Slash commands drop from 73 to 10 - only the `/workflow-*` orchestrators remain.
- **Retired master-plan D6** (the contract that every sub-agent ships a companion slash command) and deleted `agents/_pairing.yaml`. The 4 sub-agents are now reached via their dispatch skill (`/pm-skills:utility-pm-*`) and native @-mention (`@agent-pm-skills:<name>`).
- **Added `.codex-plugin/plugin.json`** (identity + `skills: ./skills/` + interface), guarded by a new enforcing `validate-codex-manifest` CI check, and added it as a 4th surface to the version-lockstep check.
- **Swept ~950 cross-references** that pointed at the deleted `/command` wrappers to the portable form: bare skill name in shared content (skills, samples, `_workflows/`); `/pm-skills:<name>` in Claude-Code usage docs. The skill-page generator now emits `/pm-skills:<name>` instead of a wrapper command.

**Nothing about the 63 skills changed** - names, frontmatter, templates, examples, behavior are all identical. The governed capability surface is untouched; only the redundant convenience layer was removed.

## The invocation model (now uniform across clients)

Skill name + description are the portable surface. The command wrappers were Claude-only.

| Client | Invoke a skill | Sub-agents |
|---|---|---|
| Claude Code | `/pm-skills:<name>` | `@agent-pm-skills:<name>` or `/pm-skills:utility-pm-*` |
| Codex | `$<name>` | `$utility-pm-*` (dispatch skill) |
| Cursor / Windsurf / Copilot / Gemini | discovered by name via AGENTS.md / agentskills.io | dispatch skill |

The deletion is a no-op on Codex and Gemini (they never had the wrappers); on Claude Code it removes the now-redundant half (Claude Code merged commands into skills - both create a `/name` entry).

## SemVer

**MINOR (2.22.0).** A redundant convenience layer is removed and a manifest is added; no skill capability changed and marketplace installs pinned to a commit are unaffected until you update. (SemVer encodes compatibility, not significance - so an additive/redundant-removal release is a minor, not a marketing-major.)

## Migration

The short command was the skill name with its phase prefix stripped; restore the prefix (`define-`, `deliver-`, `develop-`, `discover-`, `foundation-`, `iterate-`, `measure-`, `tool-`, `utility-`). The 4 verb commands map to their utility skills:

| Removed | Use instead |
|---|---|
| `/pm-skills:okr-writer` | `/pm-skills:foundation-okr-writer` |
| `/pm-skills:prd` | `/pm-skills:deliver-prd` |
| `/pm-skills:journey-map` | `/pm-skills:discover-journey-map` |
| `/pm-skills:note-and-vote` | `/pm-skills:tool-note-and-vote` |
| `/pm-critic` | `/pm-skills:utility-pm-critic` (or `@agent-pm-skills:pm-critic`) |
| `/pm-audit-repo` | `/pm-skills:utility-pm-skill-auditor` |
| `/pm-draft-changelog` | `/pm-skills:utility-pm-changelog-curator` |
| `/pm-release` | `/pm-skills:utility-pm-release-conductor` |

## Note on the road not taken

We also fully planned and audited the heavier change - hard-renaming all 63 skills to short names and deleting the wrappers. It solves the same duplication but at ~10x the blast radius (~250 files, 3 doc generators, ~186 sample files), almost all serving a naming preference rather than the duplication fix. It is preserved, revivable, as a future option; this release took the smaller, reversible path.

[Release v2.22.0](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.22.0) | [Changelog](https://github.com/product-on-purpose/pm-skills/blob/main/CHANGELOG.md). Feedback and questions welcome below.
```
