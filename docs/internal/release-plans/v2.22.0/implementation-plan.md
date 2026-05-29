# v2.22.0 Implementation Plan - the hard-rename rewrite set

> Companion to [`plan_v2.22.0.md`](plan_v2.22.0.md), [`command-skill-naming-standard.md`](command-skill-naming-standard.md), [`naming-map.md`](naming-map.md), and [`naming-impact-analysis.md`](naming-impact-analysis.md).
> Rewritten 2026-05-28 for the **hard rename** decision (no deprecated aliases) plus the bundled Codex plugin manifest fix and the CI/lint updates.
> Reading order for executors: plan -> standard -> naming-map -> this impl-plan -> impact analysis (for the why and the not-touched list).

---

## 0. What changed in this revision (2026-05-28)

- **Hard rename, no aliases.** The 63 phase-prefixed skill names are renamed to short canonical names and the old names are **removed**, not kept as deprecated alias skills. This deletes the former Phase 3c (alias creation), validator Check 5 (alias integrity), and the v3.0.0 alias-removal step.
- **Codex manifest folded in** (see Phase 3h).
- **CI is a suite update, not one new validator** (see Phase 2). Discovery on 2026-05-28 found ~30 existing validators, several coupled to the command wrappers and the prefixed names, plus a doc-generation pipeline (`generate-skill-pages.py`, `generate-workflow-pages.py`) and a name-keyed sample library. The rename ripples through all of these.

## 0a. Decisions still pending maintainer confirmation

| # | Decision | Recommendation | If reversed |
|---|---|---|---|
| D1 | **Version designation.** A hard rename that removes old names is breaking. | **CONFIRMED 2026-05-28: v2.22.0 (minor).** Skill invocation names are declared outside the SemVer-governed public surface (only the install path and plugin identity are governed). | Renumber the whole release to **v3.0.0** (major); move this folder; decide the fate of the reserved marketplace old-path retirement. |
| D2 | **The 3 verb-commands** `pm-audit-repo`, `pm-draft-changelog`, `pm-release` (they map to sub-agent skills, not 1:1 names). | **Retire** with the other wrappers; document the verb loss in the migration table. | Keep these 3 specific `commands/*.md` as Claude-only stubs pointing at `/pm-skills:<skill>`. |
| D3 | **Library samples** (`library/skill-output-samples/<skill>/`, `library/sub-agent-samples/<skill>/`). The generator looks them up by skill-dir name, so a rename without renaming samples silently drops them from the docs. | **Rename in lockstep** (dirs + `sample_<skill>_*` filenames). | Update the generator's `load_skill_samples()` lookup to map old->new instead, and freeze the sample dirs. |

The rest of this plan is written assuming D1=minor, D2=retire, D3=rename.

---

## 1. Pre-execution gate

Do not start Phase 2 unless ALL of these are true:

- [ ] On a feature branch (`release/v2.22.0`), not main.
- [ ] v2.21.0 SHIPPED (confirmed: tag `v2.21.0` -> `1065c3e`, GitHub Release Latest).
- [ ] Companion docs accepted: [`command-skill-naming-standard.md`](command-skill-naming-standard.md), [`naming-map.md`](naming-map.md) (with collision check PASS), [`naming-impact-analysis.md`](naming-impact-analysis.md).
- [ ] [`plan_v2.22.0.md`](plan_v2.22.0.md) `Rollback / abort` section reviewed.
- [ ] Decisions D1, D2, D3 (Section 0a) confirmed by the maintainer.
- [ ] **The one-skill spike has passed** (see Phase 1.5). This is now MORE load-bearing than under the alias plan: with no wrapper and no alias, the bare skill is the only invocation path, so argument flow must be confirmed before the mass rename.
- [ ] `check-count-consistency` sub-count hardening landed, so per-classification counts are CI-guarded through this release's churn.

---

## Phase 1 - Standard + name map (finalize)

- Finalize [`command-skill-naming-standard.md`](command-skill-naming-standard.md) with the hard-rename framing (no alias window; the migration aid is a documentation table, not resolving alias skills).
- Confirm [`naming-map.md`](naming-map.md) collision check PASS for all 63 short names.
- Reconcile the command count: the live glob shows 73 `commands/*.md` (Codex tooling reported 74). Resolve the exact number via `check-count-consistency` before relying on "delete N wrappers" anywhere.

## Phase 1.5 - One-skill spike (load-bearing gate)

Run on a real Claude Code install before any mass change. If it fails, abort per the plan's Rollback section and re-open D-V31-2.

Target: `foundation-okr-writer`.

1. Rename `skills/foundation-okr-writer/` -> `skills/okr-writer/`; update `name:` to `okr-writer`; verify `metadata.classification: foundation` present.
2. Move the wrapper's `Context from user: $ARGUMENTS` line into the `SKILL.md` body so input flows without the wrapper.
3. Delete `commands/okr-writer.md`.
4. Install locally; confirm `/pm-skills:okr-writer "Q3 retention OKRs"` resolves and receives the argument string.
5. On Codex (if available): confirm `$okr-writer "..."` resolves.

**Pass criteria:** the bare skill receives arguments in Claude Code; Codex resolves the short name. **Fail action:** abort, `git restore`, undo the dir rename, re-evaluate D-V31-2.

No alias stub is created (hard rename).

## Phase 2 - CI / lint suite update (specced per script)

The naming rule, the wrapper removal, and the Codex manifest each need machine enforcement, and several existing validators are coupled to the old shape. Each row below is an implementation item. Mirror the existing `.sh` + `.ps1` + `.md` triplet convention, wire enforcing ones into `.github/workflows/validation.yml` (Ubuntu + Windows matrix) AND the `scripts/pre-tag-validate.{sh,ps1}` bundle arrays, and document each in its `.md` (enforced by `validate-script-docs`).

### Add

| Script | What it enforces | Notes |
|---|---|---|
| `validate-naming.{sh,ps1,md}` (or fold into `lint-skills-frontmatter`) | No skill `name` begins with a phase/classification token (`define-/deliver-/develop-/discover-/foundation-/iterate-/measure-/tool-/utility-`); `metadata.classification` present; `name` == directory name | **Exempt** `foundation-sprint-*` and `design-sprint-*` (descriptive methodology stems, not phase prefixes) and the meaningful `pm-` names (R-A6). Prefer folding into `lint-skills-frontmatter`, which already checks name==dirname + conventions, over a new script. |
| `validate-codex-manifest.{sh,ps1,md}` | `.codex-plugin/plugin.json` exists, parses, its `skills` value begins with `./` and resolves to `skills/`, and the required identity fields are present (see Section 7 / Phase 3h) | New; Codex-packaging guard (Phase 3h). |

### Update

| Script | Change | Why |
|---|---|---|
| `lint-skills-frontmatter` | Enforce the no-prefix rule + sprint/`pm-` exemptions (see Add row) | Becomes the home of the naming rule. |
| `validate-commands` | Repurpose to validate only the 10 `workflow-*` commands' multi-skill references resolve to short-name skill dirs | 63 wrappers are deleted; the old per-wrapper checks are obsolete. It is in the pre-tag bundle and CI hard-fail set, so it must not be left to fail. |
| `check-agents-md-command-sync` | Expect only 10 `workflow-*` rows in the AGENTS.md command table | 63 command rows are removed. |
| `validate-agents-md` | Skill-path entries use short names | AGENTS.md skill section renamed. |
| `check-skill-cross-references` | Repurpose: post-rename, ANY backtick-wrapped phase-prefixed token in `skills/*/SKILL.md` is a stale reference to a removed name; flag it. Keep the `foundation-sprint-*`/`design-sprint-*` exemption and refresh the allowlist. **Its scope MUST broaden beyond `skills/*/SKILL.md`** to `references/`, `_workflows/`, `commands/workflow-*`, `AGENTS.md`, guides, README, and release docs (see Section 7). | Partial guard only until the scope is broadened; the Phase 4 repo-wide grep is the real backstop, not this check alone. |
| `validate-version-consistency` | Add `.codex-plugin/plugin.json` as a fourth version surface alongside plugin.json, marketplace.json, README badge/At-a-Glance | Enforces the 3-manifest lockstep (drift guard). |
| `check-count-consistency` | Land the sub-count hardening; re-derive all hardcoded counts (commands 73->10; skills stay 63) | Highest-churn release; counts everywhere change. |
| `validate-foundation-sprint-skills-family`, `validate-design-sprint-skills-family`, `validate-meeting-skills-family`, `validate-skill-family-registration` | Update member name references to short names; verify `_registry.yaml` and family contracts point at renamed dirs | Family validators reference member skill names. |
| `validate-skills-manifest` | Create `docs/internal/release-plans/v2.22.0/skills-manifest.yaml` with `change_type` entries for the 63 renames so this validator passes for the latest release | New manifest is a release deliverable. |
| `generate-skill-pages.py` | (1) "Try it"/"How to Use" emit `/pm-skills:<name>` not `/<command>`; (2) clean stale output before regen so old-name pages are removed; (3) rework `generate_commands_reference()` for the 10 workflow commands only; (4) PHASE_FLOWS `/cmd` labels reviewed; (5) nav output targets Astro, not the vestigial mkdocs snippet | Doc pages are generated, not hand-edited. |
| `generate-workflow-pages.py` | Skill references in generated workflow pages use short names | Mirror generator. |
| `pre-tag-validate.{sh,ps1}` + `.md` | Update VALIDATORS / $Validators arrays for the retired/repurposed/added scripts; update the doc's "What it runs" list | Keep the bundle authoritative. |
| `.github/workflows/validation.yml` | Mirror every enforcing add/retire | CI matrix parity. |

### Retire (only if repurposing is rejected)

- `validate-commands` may be deleted outright if the 10 workflow commands are validated elsewhere; default is repurpose (above).

### Documentation (the "CI with documentation" ask)

- Every script keeps its `.md` (enforced by `validate-script-docs`).
- Update `scripts/README_SCRIPTS.md`: the catalog, the "When to use what" matrix, and the CI hard-fail vs advisory lists, to reflect the retired/repurposed/added validators.
- Record the no-prefix rule + exemptions in `command-skill-naming-standard.md` Section 8 (the durable spec) and cross-link the enforcing script.

**Acceptance:** the full `pre-tag-validate` bundle passes on the renamed tree; running the naming check on the pre-rename tree reports all 63 as non-conforming (expected).

## Phase 3 - Mass rename execution

Source of truth for old->new: [`naming-map.md`](naming-map.md).

### Phase 3a - Rename the 63 skill directories
- `skills/<old>/` -> `skills/<short>/`; update `name:`; verify `metadata.classification`.
- Move the `$ARGUMENTS` capture into each `SKILL.md` body (it lived in the deleted wrapper).
- Sweep each `SKILL.md` body + `references/TEMPLATE.md` + `references/EXAMPLE.md` for self- and sibling-references (including in-body `/command` links; see 3f).

### Phase 3b - Delete the command wrappers
- Delete every non-`workflow-*` file in `commands/` (currently ~63; reconcile exact count per Phase 1). Keep the 10 `workflow-*`.
- Per D2: also delete `pm-audit-repo.md`, `pm-draft-changelog.md`, `pm-release.md` (or keep as stubs if D2 reversed).
- Validation: `ls commands/*.md | grep -v workflow-` returns empty.

### Phase 3c - Rewrite the 10 `workflow-*` command bodies
- Rewrite internal skill references from prefixed to short names.

### Phase 3d - Rename the sample library (per D3)
- `library/skill-output-samples/<old>/` -> `<short>/`; rename inner files `sample_<old>_<thread>_*.md` -> `sample_<short>_<thread>_*.md` (the generator globs on this exact pattern).
- `library/sub-agent-samples/<old>/` -> `<short>/` similarly.
- Sweep sample CONTENT for old-name references that are current (not historical narrative).

### Phase 3e - Regenerate docs
- Run the updated `generate-skill-pages.py` and `generate-workflow-pages.py`.
- Delete orphaned old-name generated pages under `docs/skills/<phase>/`.
- Confirm `check-generated-freshness` and `check-generated-content-untouched` pass.

### Phase 3f - Cross-reference rewrites (the echo-miss zone)
Rewrite by EXACT prefixed token, never by substring (short names like `persona`, `prd`, `retrospective` are ordinary English).
- `AGENTS.md` (densest: skill-path section + command table; rebuild command table to 10 workflow rows).
- `_workflows/*.md` sources (then regenerate `docs/workflows/`; do not hand-edit the generated mirror).
- `docs/guides/*` (25 files), `docs/getting-started/*` (4), `docs/index.mdx`, `docs/changelog.md` (current entries only).
- `docs/reference/*` (audit all ~19; under-specced in the first draft). High-churn: `categories.md` (lists skills), `project-structure.md` (the `skills/` + `commands/` layout changes), `sub-agent-compatibility.md` (the verb-commands), `pm-skill-anatomy.md` (example skill names), `ecosystem.md`, `index.md`/`README.md`, the generated `commands.md`, and `skill-families/{meeting-skills,design-sprint-skills,foundation-sprint-skills}-contract.md` + `skill-families/_registry.yaml` (member skill names the family validators check). Also update `docs/reference/frontmatter-schema.yaml` to REQUIRE `metadata.classification` and drop `metadata.phase` (aligns with the Section 7 frontmatter normalization).
- In-skill `/command` cross-references in every `SKILL.md` (e.g. okr-writer references `/hypothesis`, `/okr-grader`, `/dashboard-requirements`).
- `_agent-context/claude/CONTEXT.md`, `_agent-context/codex/CONTEXT.md` (not `_archived/`).
- Root `README.md` (skill references + counts + version badge).
- Tooling audit: `.github/workflows/validation.yml`, `src/content.config.ts`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `astro.config.mjs` (Starlight sidebar slugs).

### Phase 3g - Doc-site nav + redirects
- Update the Astro/Starlight sidebar (`astro.config.mjs`) for new skill slugs.
- Add redirects old skill URL -> new (`/skills/<phase>/<old>` -> `/skills/<phase>/<short>`) so inbound links do not 404.
- Correct `docs/reference/runtime-components.md` (`/skill-name` claim; "12 workflows" -> "10").

### Phase 3h - Add the Codex plugin manifest (cross-runtime packaging)

pm-skills shipped only `.claude-plugin/`. Codex reads its own `.codex-plugin/plugin.json` and does not honor the Claude one, so Codex's marketplace listed the plugin but reported "No plugin skills." This adds the manifest. It is rename-agnostic (`skills` points at the directory, not at names), so it composes with Phase 3a.

**New files (repo root):**
- `.codex-plugin/plugin.json`
- `PRIVACY.md` - one short paragraph (skills run locally, collect and transmit nothing). Required so the manifest's `privacyPolicyURL` resolves; confirmed absent 2026-05-28. If a privacy doc is not wanted, drop the `privacyPolicyURL` field instead. Do not ship a URL that 404s.

**`.codex-plugin/plugin.json` content** (verified against the working `latex` and `documents` Codex plugins):
- Identity fields mirroring `.claude-plugin/plugin.json`.
- `"skills": "./skills/"` - the load-bearing field. Required.
- `"interface": { displayName, shortDescription, longDescription, category, capabilities, defaultPrompt }` - marketplace-UI metadata.
- No `commands` field (not in the Codex manifest spec; wrappers are deleted anyway).

**Corrections to the reviewed draft (2026-05-28):** `termsOfServiceURL` -> `LICENSE` (valid); replace the copied OpenAI `brandColor` (`#2563EB`); set `version` to the shipped version.

**Acceptance:** parses; `skills` resolves; `validate-codex-manifest` passes; live Codex reinstall in a fresh thread surfaces the skills (static validation cannot confirm ingestion).

## Phase 4 - Verify

- [ ] `scripts/pre-tag-validate.{sh,ps1}` green on the renamed tree (incl. the updated/added validators).
- [ ] `check-generated-freshness` + `check-generated-content-untouched` green (docs regenerated from renamed sources).
- [ ] Repo-wide grep: zero stray `define-|deliver-|develop-|discover-|foundation-|iterate-|measure-|tool-|utility-` prefixed skill references outside the kept `foundation-sprint-*`/`design-sprint-*` names and historical (NOT-modified) paths.
- [ ] `bun astro build` (or the repo's Astro build) green; redirects resolve.
- [ ] **Codex plugin manifest** (Phase 3h): parses and `skills` resolves; reinstall in a fresh Codex thread surfaces the skills (live check).
- [ ] **Live install spot-check** on Claude Code: three random renamed skills resolve as `/pm-skills:<short>` and receive arguments.
- [ ] `check-mcp-impact` advisory reviewed; `pm-skills-mcp` (separate repo) checked for hardcoded prefixed names.

## Phase 5 - Tag + hygiene

- [ ] Update all THREE plugin manifests from `2.21.0` -> the shipped version in lockstep: `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.codex-plugin/plugin.json`.
- [ ] `CHANGELOG.md`: new entry with "Added" (short names + Codex manifest + validators), "Removed" (old phase-prefixed names + 63 command wrappers), and a **Renamed** old->new migration table sourced from `naming-map.md`.
- [ ] Finalize `docs/releases/Release_v2.22.0.md` including the migration table (no aliases, so users need the lookup).
- [ ] Tag and push.
- [ ] **Cross-repo:** re-pin the `product-on-purpose/agent-plugins` marketplace registry to the new tag SHA (separate repo; nothing reaches installers without this).
- [ ] Flip [`plan_v2.22.0.md`](plan_v2.22.0.md) Status to SHIPPED with date + SHA.
- [ ] Update `_agent-context/*/CONTEXT.md`; refresh `MEMORY.md` Project Identity line.
- [ ] Update `docs/internal/release-plans/v3.0.0/plan_v3.0.0.md`: the alias-removal payload is GONE (folded into this hard rename); v3.0.0 now carries only the marketplace old-path retirement.

---

## 2. Exhaustive file / area checklist

Counts are the live inventory (2026-05-28). "Generated" means produced by a script, do not hand-edit; update the source + regenerate.

| Area | Path(s) | Count | Action | Generated? |
|---|---|---|---|---|
| Skill dirs + `name:` | `skills/<name>/SKILL.md` | 63 | Rename + update name | source |
| Skill references | `skills/<name>/references/{TEMPLATE,EXAMPLE}.md` | ~126 | Sweep old-name refs | source |
| Command wrappers | `commands/*.md` minus `workflow-*` | ~63 | Delete | source |
| Workflow commands | `commands/workflow-*.md` | 10 | Rewrite skill refs | source |
| Workflow sources | `_workflows/*.md` | 13 | Rewrite skill refs | source |
| Workflow docs | `docs/workflows/*.md` | 14 | Regenerate | generated |
| Skill docs | `docs/skills/<phase>/*.md` + index | ~72 | Regenerate (+ delete orphans) | generated |
| Commands reference | `docs/reference/commands.md` | 1 | Regenerate (rework generator) | generated |
| Sample library | `library/skill-output-samples/<skill>/**` | ~120 | Rename dirs + `sample_<skill>_*` files | source |
| Sub-agent samples | `library/sub-agent-samples/<skill>/**` | n | Rename dirs + files | source |
| Sub-agents | `agents/*.md` (4) | 4 | Sweep skill refs (keep `pm-` names) | source |
| Guides | `docs/guides/*.md` | 25 | Rewrite refs | source |
| Getting started | `docs/getting-started/*.md` | 4 | Rewrite refs | source |
| Top docs | `docs/index.mdx`, `docs/changelog.md` | 2 | Rewrite current refs | source |
| AGENTS.md | `AGENTS.md` | 1 | Rewrite skill paths + command table (10 rows) | source |
| Agent context | `_agent-context/{claude,codex}/CONTEXT.md` | 2 | Rewrite | source |
| README | `README.md` | 1 | Refs + counts + badge | source |
| Astro config | `astro.config.mjs`, `src/content.config.ts` | 2 | Sidebar slugs + redirects | source |
| Manifests | `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.codex-plugin/plugin.json` (new), `PRIVACY.md` (new) | 4 | Version + descriptions + create | source |
| Release manifest | `docs/internal/release-plans/v2.22.0/skills-manifest.yaml` | 1 | Create (change_type entries) | source |
| Scripts | per Phase 2 table | ~15 | Add/update/retire + `.md` docs | source |
| CI workflow | `.github/workflows/validation.yml` | 1 | Mirror validator changes | source |
| CHANGELOG | `CHANGELOG.md` | 1 | New entry + migration table | source |
| Release notes | `docs/releases/Release_v2.22.0.md` | 1 | Finalize + migration table | source |

## 3. Files explicitly NOT modified

| Category | Files / globs | Why |
|---|---|---|
| Historical release notes | `docs/releases/Release_v2.*.md` (all but v2.22.0) | Frozen record. |
| Historical CHANGELOG entries | past `CHANGELOG.md` entries | Frozen; only add the new entry. |
| Archived agent context | `_agent-context/**/_archived/**` | Frozen coordination history. |
| Previous release plans | `docs/internal/release-plans/v2.*.0/**` older than v2.22.0 | Historical. |
| `_LOCAL/**` | all | Gitignored local notes. |

## 4. Sequencing (anti-echo-miss, generator-aware)

1. Phase 1.5 spike (one skill, real install).
2. Phase 2 CI updates FIRST where possible, so the renamed tree is validated as it lands (especially the repurposed `check-skill-cross-references`, which then flags any missed prefixed token).
3. Phase 3a renames + 3b wrapper deletes + 3d sample renames together per skill (the directory move, its samples, and the wrapper removal are one logical unit; keeps the generator able to find samples).
4. 3c workflow command bodies, then 3f source cross-references (sources before generated).
5. 3e regenerate (skills + workflows) AFTER all sources are renamed; delete orphan pages.
6. 3g nav + redirects + runtime-components, then 3h Codex manifest (additive, anytime).
7. After each step: `git diff --stat` + a focused grep for stray prefixed tokens in the just-touched area.

## 5. Rollback hooks

See [`plan_v2.22.0.md`](plan_v2.22.0.md#rollback--abort). Practical notes:
- **Spike fail:** `git restore`, undo the one dir rename, re-open D-V31-2.
- **Mass abort (Phase 3 in flight):** `git reset --hard <pre-Phase-3 commit>` on the feature branch (all local until merge).
- With no aliases there is no alias layer to fall back on, so the spike and the staged sequencing are the safety net; do not skip them.

## 6. Open follow-ups (non-gating)

- `pm-skills-mcp` (separate, maintenance-mode repo): confirm it does not hardcode prefixed skill names; pin/refresh if `check-mcp-impact` warrants.
- Vestigial mkdocs references in scripts (`check-nav-completeness`, the generator nav snippet) predate the Astro migration; clean up opportunistically.
- `pm-changelog-curator` keeps `pm-` for sub-agent-name alignment (R-A6); if the sub-agent is renamed, follow.

---

## 7. Codex review remediation (2026-05-28)

A Codex adversarial pass on the rewritten doc set surfaced these execution-readiness items. Each is now a Phase 2/3 requirement, not a follow-up.

- **Public migration table (CRITICAL).** The full old -> new mapping must ship in the PUBLIC `docs/releases/Release_v2.22.0.md` (done), not via a link into `docs/internal/`, which `src/content.config.ts` excludes from the Astro build. Do not point users at `naming-map.md` (internal).
- **Frontmatter normalization `metadata.phase` -> `metadata.classification` (CRITICAL).** Verified 2026-05-28: exactly **30 skills carry `metadata.phase`** (every skill in the discover/define/develop/deliver/measure/iterate groups); the other **33 (foundation/tool/utility) already use `metadata.classification`**. Phase 3a must convert those 30 (`metadata.phase: X` -> `metadata.classification: X`) and drop `metadata.phase`. `lint-skills-frontmatter` and the naming check must then REQUIRE `metadata.classification` and stop accepting `metadata.phase`, so the generators route correctly. This is a required migration the earlier plan did not call out.
- **Generator routing by classification, not name prefix (CRITICAL).** `generate-workflow-pages.py` (and any prefix-derivation path in `generate-skill-pages.py`) derive the docs phase-folder from the skill-name prefix. After the rename, short names route to bogus folders (`prd` -> `docs/skills/prd/`, `note-and-vote` -> `docs/skills/note/`, `design-sprint-brief` -> `docs/skills/design/`). Both generators must route by `metadata.classification`. Regenerate and verify every `docs/skills/<classification>/<name>.md` path.
- **Promote gating validators to enforcing (IMPORTANT).** `validate-skills-manifest` is `continue-on-error` in CI and absent from `pre-tag-validate`; `check-generated-freshness` is advisory. For a hard rename both must be enforcing: remove `continue-on-error`, add them to the `pre-tag-validate` bundle and the enforcing job in `validation.yml`. A stale manifest or stale generated docs must fail the release.
- **Broaden the lingering-prefixed-reference guard (IMPORTANT).** `check-skill-cross-references` only scans backtick tokens in `skills/*/SKILL.md`; the high-risk misses after a hard rename are in `references/`, `_workflows/`, `commands/workflow-*`, `AGENTS.md`, guides, README, and release docs. Either broaden its scan to those tracked, non-frozen paths (keeping the `*-sprint-*` and `pm-` exemptions) or add a dedicated `check-no-stray-prefixed-refs` validator. Until that lands, do not claim the prefixed-reference catch is fully CI-enforced; the Phase 4 repo-wide grep is the interim guard.
- **Tighten the Codex manifest check (IMPORTANT, Phase 3h).** Beyond parse + `skills` resolution, `validate-codex-manifest` must assert the `skills` value begins with `./` (Codex requires plugin-root-relative paths) and that required identity fields are present. Resolve the `termsOfServiceURL` -> `LICENSE` ambiguity: point it at the URL the marketplace expects, or omit the field if not required.
