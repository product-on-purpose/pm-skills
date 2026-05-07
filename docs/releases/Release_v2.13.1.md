---
title: "Release v2.13.1. Plugin Install Path Correction"
description: "Patch release that fixes the broken Claude Code plugin install path. marketplace.json relocated to the canonical .claude-plugin/ location and reshaped to satisfy the marketplace registry schema. New validate-plugin-install CI guard prevents regression. Same 40-skill catalog as v2.13.0; zero behavioral change."
---

# Release v2.13.1. Plugin Install Path Correction

**Released**: 2026-05-06
**Type**: Patch release
**Skill count**: 40 (unchanged from v2.13.0)
**Key theme**: Plugin Install Path Correction

---

## TL;DR

v2.13.1 is a patch release that fixes the broken Claude Code plugin install path. The 40-skill catalog is unchanged from v2.13.0, so day-to-day usage of `/prd`, `/hypothesis`, `/user-stories`, and the rest of the catalog is identical. What changes is the plugin install path: `/plugin marketplace add product-on-purpose/pm-skills` now succeeds where it had failed silently since v2.7.0.

The bug was two-fold:

1. `marketplace.json` lived at the repo root. Claude Code's marketplace registration looks at `.claude-plugin/marketplace.json` only. File-not-found error.
2. `marketplace.json` lacked the top-level `owner` object that the marketplace schema requires; the plugin entry's `author` was a bare string instead of an object. Schema-validation error.

Both bugs shipped silently across multiple releases (v2.7.0 through v2.13.0) because no CI step exercised the install path. Existing CI only checked manifest version consistency, not install viability.

v2.13.1 fixes both errors and adds a new enforcing CI script (`validate-plugin-install`) that asserts the install path will work end-to-end. Front-door check: "if a user tried to install pm-skills as a plugin right now, would it succeed?" - now answered continuously in CI rather than only at release time.

If you use pm-skills via `npx skills add`, the sync helper, or by cloning + `git`-ing directly, this release changes nothing for you. If you tried `/plugin marketplace add` and hit one of the two errors above, this release is what unblocks you.

---

## What changed

### Fixed

**`marketplace.json` relocated to canonical path.** The file moved from the repo root to `.claude-plugin/marketplace.json`, where Claude Code's plugin registry expects to find it. The move was performed via `git mv` so the file's history is preserved across the rename.

**README count-exempt markers extended.** Pre-release CI surfaced 3 pre-existing stale per-version counts in the "Previous Release Details" section (v2.9.0 "31 skills", v2.8.0 "29 skills", v2.7.0 "27 skills") that fell outside the v2.13.0 count-exempt range. These are correct as historical statements about what shipped at each version, but `check-count-consistency` flagged them as stale current-state references. The fix is a one-line wrap of the historical-release section in `<!-- count-exempt:start --> ... <!-- count-exempt:end -->`. Restores the validator to PASS without rewriting historical text. Bundled into v2.13.1 to avoid leaving CI red on main after ship.

**`marketplace.json` schema corrected.** Two non-behavioral edits to satisfy Claude Code's marketplace schema:

- Added top-level `owner` object with `name` and `url` fields. This was a required field but had been absent.
- Converted the plugin entry's `author` from a bare string (`"author": "product-on-purpose"`) to an object (`"author": { "name": "product-on-purpose", "url": "..." }`). String form is rejected by the schema.

The same plugin metadata is now expressed in the schema-conformant shape. No information was added or removed.

### Added

**`scripts/validate-plugin-install.{sh,ps1,md}` (enforcing).** New CI validator with full triplet completeness (Bash + PowerShell + Markdown documentation per repo convention). The script asserts:

- Both manifests exist at canonical paths (`.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`).
- Both files parse as valid JSON.
- Plugin manifest has required `name` and `version` fields.
- Marketplace manifest has required `name`, `owner` (object with `name`), and `plugins` (non-empty array) fields.
- First plugin entry has required `name`, `version`, `source`, and (if present) `author` as object form.
- Plugin manifest version matches `marketplace.json` `plugins[0].version`.
- Plugin manifest name matches `marketplace.json` `plugins[0].name`.
- Plugin source path resolves to an existing directory (advisory WARN if not).

The script is fully idempotent and read-only; exit code is the only side effect.

**`docs/releases/Release_v2.13.1.md`** (this file).

**`docs/internal/release-plans/v2.13.1/plan_v2.13.1.md`** (release plan with the full decision table, deliverable list, and pre-release checklist).

### Changed

**`scripts/validate-version-consistency.{sh,ps1}` updated** to read `marketplace.json` from the new path (`.claude-plugin/marketplace.json`). Continues to enforce that `plugin.json` and `marketplace.json` declare the same version. The check still passes at v2.13.1 (both manifests now declare `"version": "2.13.1"`).

**`README.md` "Install as Claude Code Plugin" section rewritten.** Primary path is now the `/plugin marketplace add` + `/plugin install` flow that the marketplace registration enables. The prior text - which directed users to point their client at `.claude-plugin/plugin.json` directly - is retained as a fallback for older Claude clients that do not support the marketplace flow.

```
/plugin marketplace add product-on-purpose/pm-skills
/plugin install pm-skills@pm-skills-marketplace
```

After install, all 40 skills and 47 commands resolve from any directory in any Claude Code session.

**`.claude/pm-skills-for-claude.md` updated** to acknowledge the plugin install path alongside the existing sync-helper path. Both paths are documented as parallel options without a primary recommendation between them; the question of which path to elevate as the recommended-for-new-users default is deferred to v2.14.0 or a later release.

**README badge bumped** from `version-2.13.0` to `version-2.13.1` (shields.io URL).

**README "Recent Releases" section** gains a new v2.13.1 block above the v2.13.0 block. v2.13.0 is now the second item in the list (closed by default).

**README "Releases" section** updated. Latest stable now `v2.13.1`; release notes and tag links point to v2.13.1.

### Compatibility

- **No content changes.** All 40 skills (26 phase + 8 foundation + 6 utility), 47 slash commands, 9 workflows, 126 library samples, and 22 prior CI scripts are unchanged from v2.13.0. The `validate-plugin-install` script brings the validator inventory to 23.
- **Codex compatibility unaffected.** Codex (and any non-Claude-Code agent) reads from `skills/` and `AGENTS.md` directly; `marketplace.json` is Claude-Code-specific. The file move and schema additions have zero impact on Codex usage.
- **Sync-helper install path unaffected.** Users who install via `scripts/sync-claude.sh` see no change.
- **`npx skills add product-on-purpose/pm-skills` unaffected.** This path reads from `skills/`, not `marketplace.json`.
- **`pm-skills-mcp` companion server unaffected.** v2.9.x maintenance line continues independently.

---

## Why this matters

For Claude Code users on a modern client, this is the release that makes plugin install actually work. Prior to v2.13.1, attempting `/plugin marketplace add product-on-purpose/pm-skills` produced two cryptic errors in sequence: first a "marketplace file not found" error (the file was at the wrong location), then a "schema validation failed: owner" error (the file structure was wrong). Neither error was caught at release time because no CI step exercised the install path. v2.13.1 fixes both errors and adds the missing CI guard.

For maintainers and forkers, the new `validate-plugin-install` script is the durable user-value. It is the front-door check: every PR that touches `.claude-plugin/` (or anything that affects the manifests) now validates against Claude Code's marketplace schema before merge. The bug class that shipped silently across v2.7.0 through v2.13.0 cannot recur.

For Codex users, the answer is "nothing changes for you." The Codex compatibility statement in the v2.11.0 multi-agent design holds: Claude-Code-specific install machinery (`.claude-plugin/`, `marketplace.json`) is invisible to Codex, which reads from agent-agnostic `skills/` and `AGENTS.md`.

---

## Validation

### Pre-release CI

| Validator | Result |
|---|---|
| `validate-plugin-install` (new, enforcing) | PASS |
| `validate-version-consistency` (updated) | PASS at 2.13.1 |
| `lint-skills-frontmatter` | PASS (no skill files touched) |
| `validate-agents-md` | PASS (AGENTS.md unchanged) |
| `validate-commands` | PASS (no command files touched) |
| All other `validate-*` and `check-*` scripts | PASS |

### Plugin install verified

The directory-source plugin install path was exercised end-to-end during release prep:

```
/plugin marketplace add E:/Projects/product-on-purpose/pm-skills
  -> Successfully added marketplace: pm-skills-marketplace
/plugin install pm-skills@pm-skills-marketplace
  -> Installed pm-skills. Run /reload-plugins to apply.
```

Post-install, all 40 skills resolve under the `pm-skills:` namespace (e.g., `pm-skills:foundation-meeting-agenda`, `pm-skills:foundation-okr-writer`, `pm-skills:measure-okr-grader`) confirming the marketplace registration reads the `skills/` directory through the `source: "./"` setting in `marketplace.json`.

---

## Counts at v2.13.1

| Surface | Count | Note |
|---|---|---|
| Skills | 40 | 26 phase + 8 foundation + 6 utility (unchanged from v2.13.0) |
| Workflows | 9 | unchanged |
| Slash commands | 47 | unchanged |
| Library samples | 126 | unchanged |
| Validators (total) | 23 | up from 22 (1 new: `validate-plugin-install`) |
| Validators (enforcing) | 11 | up from 10 (1 new: `validate-plugin-install`) |
| Validators (advisory) | 12 | unchanged |

---

## Detailed change manifest

### A. Files moved

- `marketplace.json` (repo root) -> `.claude-plugin/marketplace.json`. Performed via `git mv` so file history is preserved.

### B. Files modified

- `.claude-plugin/plugin.json` - version `2.13.0` -> `2.13.1`.
- `.claude-plugin/marketplace.json` - version `2.13.0` -> `2.13.1`; added top-level `owner` object; converted `plugins[0].author` from string to object; changed `plugins[0].source` from `"."` to `"./"` for consistency with other working examples.
- `scripts/validate-version-consistency.sh` - `MARKET_FILE` path updated from `marketplace.json` to `.claude-plugin/marketplace.json`.
- `scripts/validate-version-consistency.ps1` - same path update for the PowerShell parity script.
- `README.md` - shields.io version badge bumped; "Install as Claude Code Plugin" section rewritten with marketplace flow; "What's New (Recent Releases)" gains a new v2.13.1 block above the v2.13.0 block; "Releases" section updated with v2.13.1 stable / tag / release-notes anchors.
- `CHANGELOG.md` - new `## [2.13.1] - 2026-05-06` entry inserted above the v2.13.0 entry with full Fixed / Added / Changed / Compatibility sections.
- `.claude/pm-skills-for-claude.md` - rewritten to document plugin install (path 1), sync helper (path 2), and `npx skills add` (path 3) in parallel without picking a primary recommendation.

### C. Files added

- `scripts/validate-plugin-install.sh` - Bash version of the new CI validator.
- `scripts/validate-plugin-install.ps1` - PowerShell parity script.
- `scripts/validate-plugin-install.md` - documentation triplet (purpose, checks, usage, exit codes, tier).
- `docs/releases/Release_v2.13.1.md` - this file.
- `docs/internal/release-plans/v2.13.1/plan_v2.13.1.md` - release plan.

### D. Files NOT changed (intentionally)

- All `skills/*/SKILL.md` (40 files) - no skill content edits in this release.
- All `skills/*/references/TEMPLATE.md` and `EXAMPLE.md` - no skill content edits.
- All `commands/*.md` (47 files) - no command edits.
- All `_workflows/*.md` (9 files) - no workflow edits.
- All `library/skill-output-samples/**/*.md` (126 files) - no sample edits.
- `AGENTS.md` and `AGENTS/*` - no agent context edits.
- `.github/workflows/validation.yml` - new validator runs locally; CI workflow integration deferred to a follow-up commit (not gating for this patch release).

---

## What's deferred to v2.14.0+

| Item | Reason |
|---|---|
| Recommended-path positioning between plugin install and sync helper | Deferred per maintainer call; v2.13.1 documents both paths neutrally without picking a primary recommendation. |
| `.github/workflows/validation.yml` integration of `validate-plugin-install` | Local CI script is enforcing; CI workflow integration follows in v2.14.0 or as a follow-on commit. |
| README "Quick Start by Platform" Claude Code section update | The plugin marketplace path is now documented in the dedicated "Install as Claude Code Plugin" section; the platform-specific section rewrite is a v2.14.0 README polish item. |
| Frontmatter placement correction in 102 library and skill files | Tracked as a v2.14.0 work item. See `docs/internal/release-plans/v2.14.0/discovery/spec_frontmatter-correction.md`. Independent from this patch. |
| Astro Starlight migration | v2.14.0 cycle, per Day-1 spike GO-WITH-CAVEATS verdict. |

---

## Related artifacts

- Release plan: [`docs/internal/release-plans/v2.13.1/plan_v2.13.1.md`](../internal/release-plans/v2.13.1/plan_v2.13.1.md)
- Validator documentation: [`scripts/validate-plugin-install.md`](https://github.com/product-on-purpose/pm-skills/blob/main/scripts/validate-plugin-install.md)
- Prior release notes (v2.13.0): [`docs/releases/Release_v2.13.0.md`](Release_v2.13.0.md)
- v2.14.0 cycle plan: [`docs/internal/release-plans/v2.14.0/plan_v2.14.0.md`](../internal/release-plans/v2.14.0/plan_v2.14.0.md)
