# v2.22.0 - Remove the command/skill duplication (keep skill names)

**Status:** PLANNED (branch `release/v2.22.0`, local-only).
**Created:** 2026-05-29, when the heavier short-name rename was deferred (see below).
**Type:** **MINOR.** Additive + a removal of a redundant convenience layer; the skills and their names are unchanged.

---

## Why this release exists

Every capability currently appears **twice** in the `/` menu: once as the skill under its full name (`/pm-skills:foundation-okr-writer`) and once as a hand-maintained short command wrapper (`/pm-skills:okr-writer`). That duplication is confusing, and the wrappers are maintenance overhead (63 files that must be kept in sync). Separately, Codex's marketplace lists pm-skills but reports "No plugin skills" because the repo ships only a `.claude-plugin/` manifest and Codex reads `.codex-plugin/plugin.json`.

This release fixes both, with deliberately minimal blast radius:
- **Delete the 63 hand-maintained command wrappers**, leaving one entry per capability (the skill).
- **Add the Codex `.codex-plugin/plugin.json` manifest** so Codex discovers the skills.

## What this looks like for real people

### If you use the skills in Claude Code
- **Before:** two menu entries per capability (`/pm-skills:foundation-okr-writer` the skill, and `/pm-skills:okr-writer` the wrapper).
- **After:** one entry, the skill, under its existing name (`/pm-skills:foundation-okr-writer`). If you had a short wrapper name in a saved prompt (`/pm-skills:okr-writer`), use the skill name instead (drop nothing else; the skill is the same).

### If you use the skills on Codex (or Cursor, Gemini, Copilot)
- **Before (Codex):** the plugin listed but showed "No plugin skills."
- **After:** Codex discovers the skills via the new manifest. The skill names are unchanged across all clients.

### If you maintain the library
- 63 fewer files to keep in sync. The skills, their names, their docs, their samples, and the doc generators are **untouched**.

### What does NOT change (the point of this release)
- **Skill names** - all 63 keep their current names. No renames.
- **Skill behavior, output, templates** - unchanged.
- **The sample library and skill frontmatter** - untouched, because nothing is renamed. Skill content, templates, and examples are unchanged; the generated *invocation snippet* on each skill page updates (from the wrapper command to `/pm-skills:<name>`) via the one edit to `generate-skill-pages.py`. The other two doc generators are untouched.
- The 10 `workflow-*` orchestrator commands stay.

## The genuine change, and the SemVer stance

The only removed surface is the **short command-wrapper layer** (a convenience that duplicated the skills). The skills themselves - the governed capability surface - are unchanged. Ships as a **MINOR**: a redundant convenience layer is removed and a Codex manifest is added; no skill capability changes. Marketplace installs pinned to a commit are unaffected until the user updates.

## The cross-runtime constraint that drives the design

Skill name + description are the portable surface across clients; the command wrappers were Claude-only. Removing them loses nothing cross-client (other clients never had them). Keeping the existing (longer, prefixed) skill names is also *safer* against Codex's flat skill namespace, where shorter names carry a higher collision risk (see `reference_codex-flat-skill-namespace`).

## Decisions (Decision Briefs)

### D1 - Approach: wrapper deletion, keep skill names
- **Decision:** Delete the 63 non-`workflow-*` command wrappers; keep all 63 skill names exactly as they are.
- **Alternatives:** A) **This (wrapper deletion).** B) Hard-rename all 63 skills to short names and delete wrappers (the heavier path). C) Leave the duplication.
- **Why A:** B solves the same duplication but at ~10x the blast radius (~250 files, 3 doc generators, ~186 sample files, full doc regeneration), almost all of which serves a *naming preference*, not the duplication fix. A fixes the actual problem with a fraction of the risk and is trivially reversible. The fully-planned, audit-hardened B is preserved at `docs/internal/release-plans/_deferred/2026-05-29_skills-short-rename/` and can be revived as its own future release if short names are wanted.

### D2 - The sub-agent companion commands (`pm-critic`, `pm-audit-repo`, `pm-draft-changelog`, `pm-release`)
- **Decision (LOCKED 2026-05-29):** Retire all **four** with the other wrappers (the executability review corrected the earlier "3 verb commands" count: `pm-critic` is a fourth sub-agent companion). Each is a Claude-only alias over a three-layer capability (canonical sub-agent in `agents/` + a `utility-pm-*` dispatch skill); the alias is the only layer removed. The capability survives on the uniform dispatch-skill path (`/pm-skills:utility-pm-*`, untouched) and the sub-agent path (the four sub-agents stay in `agents/` and are @-mentionable on Claude Code; plugin form `@agent-pm-skills:<name>`). Retiring these four also retires master-plan **D6** (see D5).
- **Rationale:** These are internal `classification: utility` tooling, not user-facing content. Retiring keeps one uniform invocation model (every capability is a skill, invoked the same way), holds the release thesis (only `workflow-*` commands remain), and avoids a CI special-case. Typing convenience is not lost: Claude Code's slash picker substring-matches the skill name, and the fragments a maintainer types (`critic`, `audit`, `changelog`, `release`) are each substrings of the surviving skill names, so `/release` still surfaces `utility-pm-release-conductor` with no command in place. Confirmed via the Claude Code docs (2026-05-29, `claude-code-guide`): skills receive `$ARGUMENTS` exactly like commands, and every registered sub-agent is @-mentionable by default (no frontmatter gate), so deleting the commands costs no capability.
- **Migration (non-mechanical - spell out in the notes):** `/pm-critic` -> `/pm-skills:utility-pm-critic`; `/pm-audit-repo` -> `/pm-skills:utility-pm-skill-auditor`; `/pm-draft-changelog` -> `/pm-skills:utility-pm-changelog-curator`; `/pm-release` -> `/pm-skills:utility-pm-release-conductor`.

### D3 - Version designation
- **Decision:** **MINOR (v2.22.0).** Removing a redundant convenience layer + adding a manifest, with skills unchanged.

### D4 - Codex manifest
- **Decision:** Add `.codex-plugin/plugin.json` (`skills: "./skills/"` + interface metadata). `PRIVACY.md` already exists at repo root; point `privacyPolicyURL` at it (do not recreate). Rename-agnostic and additive.
- **URL form (LOCKED 2026-05-29):** absolute `https://` URLs, matching every real first-party Codex plugin (`latex`/`documents`/`presentations` all use absolute policy URLs; none use repo-relative). `privacyPolicyURL` -> `https://github.com/product-on-purpose/pm-skills/blob/main/PRIVACY.md`; `termsOfServiceURL` -> `.../blob/main/LICENSE` (the Apache-2.0 license is the de facto terms for this OSS plugin). Verify both files are on `main` so the blobs resolve (Phase 4).
- **Required-field set (LOCKED):** `validate-codex-manifest` asserts only load-bearing identity: file parses; `name == "pm-skills"`; `version` is valid semver; `skills` begins with `./` and resolves to `skills/`; `interface` is an object. Version *equality* across the four manifests stays with `validate-version-consistency`. Cosmetic fields (`brandColor`, `screenshots`, `defaultPrompt`, `logo`, `composerIcon`, `capabilities`, `category`) are NOT required - real plugins vary (`latex` ships no `composerIcon`).
- **Logo:** ship logo-less for v2.22.0 (the manifest is valid without it; Codex falls back to a default). Confirm clean ingest at the Phase 4 Codex reinstall; add a brand asset later only if Codex requires one.
- **Version:** the staged draft is stamped `2.21.0`; bump to `2.22.0` in the Phase 5 lockstep.

### D5 - Retire D6 (sub-agent companion-command contract) + reconcile the conductor's invocation
- **Decision (LOCKED 2026-05-29):** Retiring the four companion commands (D2) consciously retires master-plan **D6** ("every sub-agent ships with a companion slash command in `commands/`," `plan_v2.16.0.md:144`). Post-deletion, the four sub-agents are reached via their dispatch skill (`/pm-skills:utility-pm-*`, uniform) and native @-mention (`@agent-pm-skills:<name>`).
- **Why it is safe:** no validator enforces D6 - `check-sub-agent-command-pair` was specced in `ci-plan.md` but never built, and `validate-agents-md` validates agent files, not pairings - so deletion does not redden `pre-tag-validate`. Capability is preserved per the Claude Code docs confirmation (skills receive `$ARGUMENTS`; all sub-agents @-mentionable by default; skill->sub-agent dispatch works via the Agent tool independent of @-mention).
- **Conductor reconciliation:** `agents/pm-release-conductor.md` carries stale v2.16.0 prose ("no @-mention path; explicit slash command only," ~line 158) that (a) is contradicted by the v2.17.0 "all 4 sub-agents @-mention on Claude Code" registration and (b) keys on the `/pm-release` command being deleted. Update that prose and the `/pm-release ...` refusal/invocation examples to name the new surface (`@agent-pm-skills:pm-release-conductor` and/or `/pm-skills:utility-pm-release-conductor`). The 6-gate refusals/dry-run/SHA-pin protections are invocation-independent and the conductor is not proactive (D7), so explicit @-mention introduces no ambient-spawn risk.
- **Gate (Phase 4) confirms empirically:** all four dispatch skills accept trailing args, and the conductor runs via both `@agent-pm-skills:pm-release-conductor` and `/pm-skills:utility-pm-release-conductor v2.22.0 --dry-run`. Fallback if a path fails: keep `/pm-release` as the lone exception.

## Pre-execution rulings (RESOLVED 2026-05-29)
All execution-gating rulings are decided; detail in D2, D4, and D5 above.
- D2 (retire vs keep the sub-agent companion commands) -> **retire all four** (`pm-critic` + the 3 verbs); uniform skill invocation; capability preserved via dispatch skill + @-mention.
- D5 (retire D6 + conductor invocation) -> **retire D6**; reach sub-agents via skill + `@agent-pm-skills:<name>`; reconcile the conductor's stale @-mention prose.
- Codex manifest URL form -> **absolute https** (`PRIVACY.md` blob; ToS -> `LICENSE`).
- Codex manifest required-field set -> **load-bearing identity only** (`name`/`version`/`skills`/`interface` + parse + skills-resolves); cosmetics not asserted.
- Skill `$ARGUMENTS` + sub-agent @-mention -> **CONFIRMED via Claude Code docs (2026-05-29)**: skills receive `$ARGUMENTS` like commands; all sub-agents @-mentionable by default. The live gate re-confirms empirically.

## Phases
See [`implementation-plan.md`](implementation-plan.md) for the executor's checklist. In brief:
- **Phase 1 - gate:** v2.21.0 shipped; on `release/v2.22.0`; this plan accepted.
- **Phase 2 - CI:** repurpose `validate-commands` to the 10 workflow commands; update `check-agents-md-command-sync` to expect 10 rows; add `validate-codex-manifest`; update `check-count-consistency` (73 -> 10 commands); wire into `validation.yml` + `pre-tag-validate`.
- **Phase 3 - execute:** delete the 63 wrappers; rebuild the AGENTS.md command table to 10 rows; sweep docs that reference the short command names; add `.codex-plugin/plugin.json`.
- **Phase 4 - verify:** `pre-tag-validate` green; `commands/*.md` is only `workflow-*`; live install spot-check; Codex reinstall surfaces skills.
- **Phase 5 - tag:** bump the 3 manifests in lockstep; CHANGELOG; re-pin the marketplace registry.

## Release-level acceptance criteria
- The 63 hand-maintained command wrappers are removed; only `workflow-*` commands remain (`ls commands/*.md | grep -v workflow-` is empty).
- All 63 skills are unchanged (names, frontmatter, docs, samples) and each remains invocable as `/pm-skills:<name>`.
- `.codex-plugin/plugin.json` ships and Codex discovers the skills as a packaged plugin.
- The AGENTS.md command table lists exactly the 10 `workflow-*` rows; all counts (commands 73 -> 10) are re-derived and CI-consistent.
- The full `pre-tag-validate` bundle + Astro build are green on the tagged SHA.
- A migration note maps each removed short command to its skill (`/pm-skills:okr-writer` -> `/pm-skills:foundation-okr-writer`).

## Rollback / abort
### Abort triggers (before tag)
- A skill stops resolving by its name after wrapper deletion (should not happen - the skill is unchanged - but verify on a live install).
- `pre-tag-validate` or the Astro build red after the sweep: do not tag.
### Rollback procedures (after tag)
- **Cross-reference miss** (a doc still points at a deleted short command): point-fix in a v2.22.x patch.
- **Real reliance on a deleted short command:** the migration note is the answer; a specific high-value wrapper can be restored as a thin stub in a patch.
- **Full rollback:** `git revert` the wrapper-deletion commit restores the wrappers; because no skill was renamed, there is no name-resolution gap to bridge. This is far cheaper to reverse than the deferred rename would have been.

## Dependencies and sequencing
- **Hard dependency:** v2.21.0 SHIPPED.
- **Relationship to the deferred rename:** that initiative (short names) is parked at `_deferred/2026-05-29_skills-short-rename/`; it is independent and optional.
- **Relationship to v3.0.0:** unchanged - v3.0.0 carries only the marketplace old-path retirement.

## Referenced documents (index)
- [`implementation-plan.md`](implementation-plan.md) - the executor's checklist.
- [`../_deferred/2026-05-29_skills-short-rename/`](../_deferred/2026-05-29_skills-short-rename/) - the deferred short-name rename (preserved, revivable).
- [`../v3.0.0/plan_v3.0.0.md`](../v3.0.0/plan_v3.0.0.md) - the convergence major (marketplace old-path retirement).

## Review history
- **2026-05-29:** reframed from the hard-rename approach to wrapper-deletion. The hard rename was fully planned and executability-audited, then deferred (D1) because its blast radius (~250 files, 3 generators, 186 samples) almost entirely served the short-name preference rather than the duplication fix. The audited rename is preserved at `_deferred/2026-05-29_skills-short-rename/` (git tag `archive/short-name-rename`).
