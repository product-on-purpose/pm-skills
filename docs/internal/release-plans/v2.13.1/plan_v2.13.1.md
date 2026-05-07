# v2.13.1 Release Plan: Plugin Install Path Correction

**Status**: Pre-tag (all in-cycle items shipped; pending commit + tag + push + GitHub release)
**Owner**: Maintainers
**Type**: Patch release
**Created**: 2026-05-06
**Updated**: 2026-05-06

## Release Theme

Fix the broken Claude Code plugin install path that has shipped silently since v2.7.0. The 40-skill catalog is unchanged from v2.13.0; the patch is fully scoped to plugin/marketplace install machinery and a new CI guard that prevents the bug class from recurring.

## Context

On 2026-05-06, the maintainer attempted to install pm-skills as a Claude Code plugin on their own machine for the first time. Two errors surfaced in sequence:

1. **`/plugin marketplace add E:/Projects/product-on-purpose/pm-skills`** -> "Marketplace file not found at `.claude-plugin/marketplace.json`". The file existed at the repo root, not at the canonical path Claude Code's plugin system reads from.
2. After moving the file: **`/plugin marketplace add ...`** -> "Invalid schema: owner: Invalid input: expected object, received undefined". The marketplace.json lacked the top-level `owner` object that Claude Code's marketplace schema requires.

Both bugs had shipped silently across v2.7.0 through v2.13.0 because no CI step exercised the install path. Existing plugin-related CI (`validate-version-consistency`) only checked that plugin.json and marketplace.json declared the same version; it did not validate file location or schema shape.

This patch closes the gap between the repo's CI surface and the actual plugin install consumer.

### Prerequisites

- [x] v2.13.0 tagged and pushed (done 2026-05-05)
- [x] Plugin install path tested and confirmed broken on maintainer's machine (done 2026-05-06)
- [x] Both fix paths verified end-to-end via `/plugin marketplace add` + `/plugin install pm-skills@pm-skills-marketplace`

---

## Decisions

| Decision | Answer | Rationale |
|---|---|---|
| **Version** | **v2.13.1** (patch) | No behavioral changes to any skill; fixes a previously-broken distribution channel. Patch per SemVer. |
| **Bundle scope** | Marketplace path correction + schema fix + new CI script + README install rewrite + `.claude/pm-skills-for-claude.md` update | All changes are coupled to the same install-path defect. Bundling avoids three trivial patch tags in quick succession. |
| **`marketplace.json` location** | Move from repo root to `.claude-plugin/marketplace.json` via `git mv` | Canonical path Claude Code's plugin system reads from. Move (not copy) because two manifests in two locations is a future-bug class. |
| **`owner` object shape** | Object with `name` and `url` (mirrors plugin.json author convention) | Required by Claude Code's marketplace schema. Adding `url` alongside `name` is a low-cost addition that helps Claude Code render attribution links. |
| **`plugins[0].author` shape** | Object with `name` and `url` (was string) | Required by schema; string form rejected. |
| **New CI script** | `scripts/validate-plugin-install.{sh,ps1,md}` (enforcing) | Front-door check: validates the install path will work end-to-end. Catches the exact bug class that shipped silently. Triplet completeness (`.sh` + `.ps1` + `.md`) per repo convention. |
| **CI workflow integration** | Local CI is enforcing this release; `.github/workflows/validation.yml` integration deferred to a follow-on commit | Scope discipline. The local `bash scripts/validate-plugin-install.sh` invocation is enforcing in pre-release verification; workflow integration is a one-line addition that does not gate this release. |
| **`validate-version-consistency` path update** | Update both `.sh` and `.ps1` to read `.claude-plugin/marketplace.json` | Existing CI script breaks if not updated to match the new file location. |
| **README install section** | Rewrite "Install as Claude Code Plugin" with marketplace flow as primary; manifest-direct retained as fallback | Modern path now works; documenting the working path is required. Manifest-direct fallback documented for older Claude clients. |
| **`.claude/pm-skills-for-claude.md` update** | Rewrite to document three parallel install paths: plugin marketplace, sync helper, `npx skills add` | The sync-helper README was silent on plugin install; that gap becomes more visible now that `.claude/skills/` and `.claude/commands/` are gone from the maintainer's local install. |
| **Recommended-path positioning** | NO primary recommendation between plugin install and sync helper in this release | Per maintainer call: defer the recommended-path positioning question to v2.14.0 or later. v2.13.1 documents both paths neutrally. |
| **Codex compatibility statement** | Document explicitly in release notes: zero impact on Codex / non-Claude-Code agents | Maintainer asked the question during release prep. Explicit statement closes the loop. |
| **Plugin manifest version bump** | `2.13.0` -> `2.13.1` in both `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` | Standard release versioning. |
| **Worktree vs direct-on-main** | Direct-on-main | The marketplace fix work was already half-done in main's working tree before the v2.13.1 cut decision; using a worktree would have meant stashing/copying mid-flight. Selective staging (commit only v2.13.1 files) functionally achieves the same isolation since `git tag` only captures committed state. |
| **Incidental count-exempt fix** | Include in v2.13.1 | Pre-release CI run surfaced 3 stale per-version counts in README's "Previous Release Details" section (v2.9.0 "31 skills", v2.8.0 "29 skills", v2.7.0 "27 skills") that fell outside the existing count-exempt markers and had been failing since v2.13.0 (verified by stashing v2.13.1 changes and re-running). Fix is one-line wrap of the historical-release section in `<!-- count-exempt:start --> ... <!-- count-exempt:end -->`. Bundling avoids leaving CI red on main after the v2.13.1 ship. |

---

## Deliverables

### Manifest fixes (Phase 0 of cycle)

| File | Change | Status |
|---|---|---|
| `marketplace.json` (root) -> `.claude-plugin/marketplace.json` | `git mv` to canonical path | Done |
| `.claude-plugin/marketplace.json` | Added top-level `owner` object; converted plugin entry's `author` to object form | Done |
| `.claude-plugin/marketplace.json` | Bumped `plugins[0].version` from `2.13.0` to `2.13.1` | Done |
| `.claude-plugin/plugin.json` | Bumped `version` from `2.13.0` to `2.13.1` | Done |

### CI hardening

| File | Change | Status |
|---|---|---|
| `scripts/validate-version-consistency.sh` | `MARKET_FILE` path updated to `.claude-plugin/marketplace.json` | Done |
| `scripts/validate-version-consistency.ps1` | Same path update for PowerShell parity | Done |
| `scripts/validate-plugin-install.sh` | New: schema validates plugin.json + marketplace.json against Claude Code's expected shape; enforces cross-manifest consistency | Done |
| `scripts/validate-plugin-install.ps1` | New: PowerShell parity | Done |
| `scripts/validate-plugin-install.md` | New: documentation triplet (purpose, checks, usage, exit codes, tier) | Done |

### Documentation updates

| File | Change | Status |
|---|---|---|
| `README.md` | Version badge bumped; "Install as Claude Code Plugin" rewritten; new "What's New" block for v2.13.1; "Releases" section updated | Done |
| `CHANGELOG.md` | New `## [2.13.1] - 2026-05-06` entry above v2.13.0 with Fixed / Added / Changed / Compatibility / Why-this-matters sections | Done |
| `.claude/pm-skills-for-claude.md` | Rewritten to document three install paths in parallel | Done |

### Release governance

| File | Change | Status |
|---|---|---|
| `docs/releases/Release_v2.13.1.md` | New release notes artifact | Done |
| `docs/internal/release-plans/v2.13.1/plan_v2.13.1.md` | This file | Done |

---

## Pre-release checklist

### Phase 0: Pre-flight

- [x] v2.13.0 tagged and pushed
- [x] Bug confirmed on maintainer's machine via direct test
- [x] Working examples cross-referenced (jp-library, claude-plugins-official, superpowers-marketplace)

### Phase 1: Manifest fixes

- [x] `git mv marketplace.json .claude-plugin/marketplace.json`
- [x] Added `owner` object to marketplace.json
- [x] Converted `plugins[0].author` to object
- [x] Bumped version in both manifests

### Phase 2: CI hardening

- [x] Updated `validate-version-consistency` paths
- [x] Created `validate-plugin-install.sh`
- [x] Created `validate-plugin-install.ps1`
- [x] Created `validate-plugin-install.md`
- [x] `bash scripts/validate-plugin-install.sh` PASS
- [x] `bash scripts/validate-version-consistency.sh` PASS at 2.13.1

### Phase 3: Doc updates

- [x] README "Install as Claude Code Plugin" section rewritten
- [x] README version badge bumped
- [x] README "What's New" block added for v2.13.1
- [x] README "Releases" section updated
- [x] CHANGELOG entry added
- [x] `.claude/pm-skills-for-claude.md` rewritten

### Phase 4: Release governance

- [x] `docs/releases/Release_v2.13.1.md` authored
- [x] `docs/internal/release-plans/v2.13.1/plan_v2.13.1.md` authored (this file)

### Phase 5: Tag-time chores (pending maintainer authorization)

- [ ] Verify all CI scripts pass on a clean tree
- [ ] Stage v2.13.1 files only (NOT v2.14.0 frontmatter discovery files, which belong to a separate session)
- [ ] Commit on main with focused message
- [ ] Tag `v2.13.1` annotated
- [ ] Push commit + tag to origin
- [ ] Build release ZIP via `scripts/build-release.sh 2.13.1`
- [ ] Publish GitHub release page (`gh release create v2.13.1 --notes-file docs/releases/Release_v2.13.1.md`)
- [ ] Spot-check the public release page
- [ ] Spot-check `/plugin marketplace add product-on-purpose/pm-skills` against the public origin (not local working tree)

### Phase 6: Post-release

- [ ] Re-test plugin install from a fresh Claude Code session against the public origin
- [ ] Confirm `/plugin install pm-skills@pm-skills-marketplace` succeeds
- [ ] Verify all 40 skills resolve under the `pm-skills:` namespace

---

## Coordination boundary

This patch release is being prepared in one of two concurrent Claude Code sessions on the same `main` working tree. The other session is preparing v2.14.0 frontmatter correction work and has its own discovery + spec artifacts in `docs/internal/release-plans/v2.14.0/discovery/`.

Coordination rules during this v2.13.1 release prep:

- This session touches: `.claude-plugin/`, `scripts/validate-plugin-install.{sh,ps1,md}`, `scripts/validate-version-consistency.{sh,ps1}`, `README.md`, `CHANGELOG.md`, `.claude/pm-skills-for-claude.md`, `docs/releases/Release_v2.13.1.md`, `docs/internal/release-plans/v2.13.1/`.
- The other session must NOT edit any of these files concurrently.
- The other session's v2.14.0 frontmatter discovery + spec files (`docs/internal/release-plans/v2.14.0/discovery/*.md`) are NOT included in v2.13.1 commits.
- After v2.13.1 ships, the other session continues its v2.14.0 work on a clean main (with v2.13.1 already tagged behind it).

---

## What's deferred to v2.14.0+

| Item | Reason |
|---|---|
| Recommended-path positioning between plugin install and sync helper | Per maintainer call. v2.13.1 documents both paths neutrally without primary recommendation. |
| `.github/workflows/validation.yml` integration of `validate-plugin-install` | Local CI script is enforcing. CI workflow integration follows in v2.14.0 or as a follow-on commit; not gating for this patch. |
| README "Quick Start by Platform" Claude Code section refresh | The plugin marketplace path is documented in the dedicated "Install as Claude Code Plugin" section; the platform-specific block was not touched in this patch. |
| Frontmatter placement correction in 102 library and skill files | Tracked as a v2.14.0 work item. See `docs/internal/release-plans/v2.14.0/discovery/spec_frontmatter-correction.md`. Independent from this patch. |
| Sweep 11 pre-existing mkdocs strict-mode warnings | Deferred to v2.14.0. The Starlight migration replaces the mkdocs build entirely; fixing pre-Starlight warnings would be wasted work. Pre-existing warnings: 5x Foundation meeting-skills links to `docs/reference/skill-families/meeting-skills-contract.md`; 2x foundation-stakeholder-update links to a date-stamped recap file; release-notes links from v2.11.0/v2.11.1/v2.12.0 to non-docs paths (`library/`, `CHANGELOG.md`); guides/updating-pm-skills.md link path. None are user-visible regressions; all are mkdocs-strict false positives in build that has been red since pre-v2.13.0 ship. |
| Hygiene patch follow-up commit | Bundled in v2.13.1 cycle: post-tag commit fixes the 1 new mkdocs warning my Release_v2.13.1.md introduced (link to `scripts/validate-plugin-install.md` rewritten to absolute GitHub URL) and runs `gh release edit` to replace the auto-generated boilerplate release notes with the authored `Release_v2.13.1.md` content. |

---

## Related artifacts

- Release notes: [`../../releases/Release_v2.13.1.md`](../../releases/Release_v2.13.1.md)
- Validator documentation: [`../../../scripts/validate-plugin-install.md`](../../../scripts/validate-plugin-install.md)
- v2.13.0 master plan: [`../v2.13.0/plan_v2.13.0.md`](../v2.13.0/plan_v2.13.0.md)
- v2.14.0 master plan (next cycle): [`../v2.14.0/plan_v2.14.0.md`](../v2.14.0/plan_v2.14.0.md)
- Cut/tag/publish runbook: [`../runbook_clean-worktree-cut-tag-publish.md`](../runbook_clean-worktree-cut-tag-publish.md) (this release deviates by working direct-on-main; runbook documented as canonical for cycles where main is otherwise busy)
