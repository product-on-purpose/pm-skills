# v2.22.0 Implementation Plan - wrapper deletion (keep skill names)

> Companion to [`plan_v2.22.0.md`](plan_v2.22.0.md).
> Scope (2026-05-29): delete the 63 hand-maintained command wrappers, keep all 63 skill names, add the Codex manifest. The heavier short-name rename was deferred to [`../_deferred/2026-05-29_skills-short-rename/`](../_deferred/2026-05-29_skills-short-rename/).
>
> **Document roles (how to use these during execution):** THIS is the **procedural runbook** - work it phase by phase (1-5), follow the "Execution discipline" section, and verify + commit at each phase exit. The granular per-file edit-list is [`deletion-sweep-findings.md`](deletion-sweep-findings.md) (Phase 3's reference). Decisions / acceptance / rollback are in [`plan_v2.22.0.md`](plan_v2.22.0.md). **Live progress tracking is a TaskWrite ledger** (created at session start per "Execution discipline"), NOT edits to these docs on every step; the docs get checkbox/status updates at milestones and the commits are the durable checkpoints.

---

## 0. Why this is small

Nothing is renamed. Because the skills keep their names, the doc generators' routing, the sample library, skill frontmatter, and every cross-reference to a skill *name* stay valid and untouched. The only things that change are: the wrapper files (deleted), the few surfaces that reference the short *command* names, the command count, and one generator's "Try it" line (see Phase 2). This is the entire reason this path was chosen over the rename.

## Execution discipline (long, resumable, verification-driven session)

This is a 60+-file release on one branch (`release/v2.22.0`). Run it to verify incrementally and survive context compaction:

- **Task ledger first.** Create a TaskWrite checklist at session start: one item per phase (2-5) plus one per editList group in [`deletion-sweep-findings.md`](deletion-sweep-findings.md). Mark done as you go - this is the resume anchor if context compacts.
- **Work phase by phase; COMMIT at each phase exit.** Never let a phase's edits sit uncommitted across a break. Committed state + the ledger = where you are.
- **Re-grep each file before editing it** (some findings-doc line maps are marked "verify"; line numbers drift as edits land).
- **Gate-failure rule: a RED gate stops the line.** Fix the cause, re-run the gate, then proceed. Never advance a phase or tag on a red gate.

**The authoritative gate set is `.github/workflows/validation.yml`, NOT `scripts/README_SCRIPTS.md`** (the README catalog is STALE, verified 2026-05-29: it lists `check-internal-link-validity` and `validate-docs-frontmatter` as "advisory" but `validation.yml` runs them `--strict` enforcing). The ENFORCING (hard-fail) steps you must pass include:
- `check-internal-link-validity.sh --strict` (validation.yml:206) - the 3 dead links to deleted files fail HERE. CONFIRMED enforcing.
- `check-generated-content-untouched` - re-runs all three generators and diffs, so the regenerated `docs/skills/*`, `docs/reference/commands.md`, and `docs/workflows/*` MUST be committed or this fails.
- `check-landing-page-counts.sh --strict`, `check-no-body-h1.sh --strict`, `validate-docs-frontmatter.sh --strict`, `validate-foundation-sprint-skills-family --strict`, `validate-design-sprint-skills-family --strict`, `validate-commands`, `lint-skills-frontmatter`, `validate-agents-md`, `validate-version-consistency`, `check-nav-completeness`, `validate-skill-family-registration`, plus the new `validate-codex-manifest`.
- (Advisory / `continue-on-error` in CI, but still worth green: `check-count-consistency`, `check-generated-freshness`, `check-version-references`, `check-mcp-impact`, etc.)

**Phase exit gates (verify before advancing):**
- After Phase 2 (CI): the updated/new validators run without script error (some will FAIL against the current tree until Phase 3 deletes the wrappers - expected; note which).
- After Phase 3 (delete + sweep + regen, all committed): `ls commands/*.md | grep -v workflow-` is empty; the zero-residual grep is clean; the regenerated docs are committed.
- Phase 4: the full enforcing set above is GREEN locally (or pushed and green in CI); the Astro/Starlight doc build is green; `pm-skill-auditor` no longer emits a "sub-agent without companion command" finding.

**Exact verification commands** (bash; `.ps1` / `-Strict` equivalents exist):
- Zero-residual (deleted commands): `git grep -nE '/(pm-critic|pm-audit-repo|pm-draft-changelog|pm-release)' -- skills agents docs README.md AGENTS.md QUICKSTART.md _workflows library ':(exclude)docs/internal/release-plans' ':(exclude)docs/internal/release-plans/_deferred'` (expect zero; use git pathspec long-form `:(exclude)...` for the underscore path per the known quirk).
- Bare @agent: `git grep -n '@agent-pm-' | grep -v '@agent-pm-skills:'` (expect zero).
- Link validity: `bash scripts/check-internal-link-validity.sh --strict`.
- Generators (after regen + commit): `bash scripts/check-generated-content-untouched.sh` and `bash scripts/check-generated-freshness.sh`.
- Local bundle: `bash scripts/pre-tag-validate.sh` (exists; orchestrates the enforcing set - not listed in README_SCRIPTS.md, but present). Doc build: confirm the Astro/Starlight build command in `package.json` (doc-stack is Astro 6.3 + Starlight; README_SCRIPTS.md's mkdocs references are stale).

## 1. Pre-execution gate
- [ ] On `release/v2.22.0`, not main.
- [ ] v2.21.0 SHIPPED (`v2.21.0` -> `1065c3e`).
- [x] [`plan_v2.22.0.md`](plan_v2.22.0.md) accepted; D2 (2026-05-29) = **retire all four** sub-agent companion commands (`pm-critic` + the 3 verbs); D5 = **retire master-plan D6** and reach sub-agents via skill + `@agent-pm-skills:<name>`. Capability confirmed via Claude Code docs (skills get `$ARGUMENTS`; sub-agents @-mentionable by default).
- [ ] Confirmed counts: `ls commands/*.md` = 73; `workflow-*` = 10; non-workflow wrappers = 63.

## 2. CI / validator updates
Mirror the existing `.sh` + `.ps1` + `.md` triplet convention; wire enforcing ones into `.github/workflows/validation.yml` and the `scripts/pre-tag-validate.{sh,ps1}` arrays.

| Script | Change |
|---|---|
| `validate-commands` | Repurpose to validate only the 10 `workflow-*` commands (their multi-skill references resolve to real skill dirs). The 63 per-wrapper checks become obsolete. |
| `check-agents-md-command-sync` | Expect exactly 10 `workflow-*` rows in the AGENTS.md command table. |
| `check-count-consistency` | Re-derive the command count (73 -> 10) everywhere it appears. Skill counts are UNCHANGED (still 63; 30 phase + 8 foundation + 10 utility + 15 tool), so per-classification sub-counts are not at risk this release. |
| `validate-codex-manifest.{sh,ps1,md}` (new) | `.codex-plugin/plugin.json` exists, parses, its `skills` value begins with `./` and resolves to `skills/`, and the load-bearing identity fields are present (`name` == "pm-skills", `version` valid semver, `interface` is an object). Cosmetic fields are NOT asserted (real Codex plugins vary). Wire into `validation.yml` + `pre-tag-validate`. |
| `validate-version-consistency` | Add `.codex-plugin/plugin.json` as a fourth version surface (lockstep with plugin.json, marketplace.json, README badge). |
| `generate-skill-pages.py` | **The one generator change:** the "Try it" / "How to Use" block is gated on a command file (`if cmd:` from `find_command_file`). Wrapper deletion makes that None for the 63 skills, so the block would vanish or point at a dead command. Emit it UNCONDITIONALLY as `/pm-skills:<name>` from `metadata.name`, removing the `find_command_file` gate. Then regenerate (skill names unchanged, so pages land in the same folders) and the `generate_commands_reference()` output drops to the 10 workflow commands. |

`generate-workflow-pages.py` and `generate-showcase.py` need NO change: they key off skill names and samples, which are unchanged. `check-generated-content-untouched` will re-run all three and diff; commit the regenerated `docs/skills/*` (new Try-it lines) + `docs/reference/commands.md` (10 commands) so it passes, and refresh its hardcoded counts only if the command-reference count is asserted there.

**Acceptance:** `pre-tag-validate` green; `ls commands/*.md | grep -v workflow-` empty; the naming/command validators reflect 10 commands.

## 3. Execution

> **Authoritative edit-list:** [`deletion-sweep-findings.md`](deletion-sweep-findings.md) (discovery-workflow output, 2026-05-29) is the complete, categorized list of every file the deletion touches: the full cross-reference sweep (D1), the validated invocation standard (bare skill name in shared content; concrete client syntax only in client-specific docs; `@agent-pm-skills:<name>` not bare `@agent-pm-*`), the auditor D6-check removal (agent + spec note, D4), the `_workflows/` sources + `generate-workflow-pages.py`, `.github/workflows/release.yml`, and the 3 dead-link CI hard-fails. Re-grep each file immediately before editing.

### 3a - Delete the wrappers
- Delete every non-`workflow-*` file in `commands/` (63: 59 skill-backed short wrappers + the 4 sub-agent companion commands `pm-critic`/`pm-audit-repo`/`pm-draft-changelog`/`pm-release` per D2/D5). Keep the 10 `workflow-*`.
- Validation: `ls commands/*.md | grep -v workflow-` returns empty.

### 3b - AGENTS.md command table
- Rebuild the command table to exactly the 10 `workflow-*` rows. Skill-path references in AGENTS.md are unchanged (skills keep their names).

### 3c - Generator fix + regenerate
- Apply the `generate-skill-pages.py` Try-it/How-to-Use decoupling (Phase 2). Run all three generators; commit the regenerated `docs/skills/*` and `docs/reference/commands.md`. Confirm `check-generated-content-untouched` and `check-generated-freshness` pass.

### 3d - Sweep short-command references in docs
Rewrite references to the deleted short *commands* (e.g. `/okr-writer`, `/pm-release`) to the skill invocation form. EXACT-token sweep; do NOT touch references to skill *names* (those are unchanged). Likely surfaces:
- `README.md`, `QUICKSTART.md`, `docs/getting-started/*`, `docs/guides/*` where a short `/command` is shown as the way to invoke.
- `docs/reference/runtime-components.md` ("12 workflows" -> "10"; `/command` claim).
- `docs/reference/commands.md` is generated (3c), not hand-edited.

### 3e - Codex manifest
- Add `.codex-plugin/plugin.json`: identity fields mirroring `.claude-plugin/plugin.json`, `"skills": "./skills/"`, and the `interface` block. No `commands` field.
- `PRIVACY.md` **already exists** at repo root - point `privacyPolicyURL` at it; do NOT recreate. URL form RESOLVED (D4): absolute `https://github.com/product-on-purpose/pm-skills/blob/main/PRIVACY.md`; `termsOfServiceURL` -> `.../blob/main/LICENSE`; ship logo-less. The staged draft at `_LOCAL/issues/2026-05-28_codex-plugin-fix/proposed-files/pm-skills/.codex-plugin/plugin.json` is ready to copy (bump its `version` 2.21.0 -> 2.22.0).

### 3f - Retire D6 (sub-agent companion-command contract) + reconcile the conductor
Per D5, deleting all four companion commands retires master-plan D6:
- Delete `agents/_pairing.yaml` (the now-orphaned pairing manifest; no validator reads it, so nothing breaks).
- Reconcile `agents/pm-release-conductor.md`: replace the stale "no @-mention path; explicit slash command only" prose (~line 158, plus the description's "explicit invocation only") and the `/pm-release ...` refusal/invocation examples with the new surface (`@agent-pm-skills:pm-release-conductor` and/or `/pm-skills:utility-pm-release-conductor`). Keep the not-proactive / not-chained-to / refuse-bypass intent.
- Clean the companion-command branch in `generate-skill-pages.py` (`generate_commands_reference`, ~lines 596-678 enumerate the verb commands and emit an "N sub-agent companion commands" narrative) so it does not emit a stray "0 sub-agent companion commands" line after deletion.
- Sweep the D6 assertions: `docs/reference/runtime-components.md` (the "Companion slash command ... per D6" invariant + the conductor row's `/pm-release` invocation), the sub-agent guide/concept docs, `README.md`, and `AGENTS.md`.
- NOTE: D6 is NOT CI-enforced (`check-sub-agent-command-pair` was specced in `ci-plan.md` but never built; `validate-agents-md` checks agent files, not pairings), so deletion does not redden `pre-tag-validate` via the pairing contract.

## 4. Verify
- [ ] `scripts/pre-tag-validate.{sh,ps1}` green.
- [ ] `ls commands/*.md | grep -v workflow-` is empty; AGENTS.md has exactly 10 workflow rows.
- [ ] Live install spot-check (Claude Code): several content skills resolve as `/pm-skills:<name>` and receive trailing arguments; **all four utility dispatch skills** (`utility-pm-critic`/`utility-pm-skill-auditor`/`utility-pm-changelog-curator`/`utility-pm-release-conductor`) accept args; the conductor runs via BOTH `@agent-pm-skills:pm-release-conductor` and `/pm-skills:utility-pm-release-conductor v2.22.0 --dry-run`; the deleted short commands no longer appear. (Docs already confirm `$ARGUMENTS` + @-mention; this is empirical belt-and-suspenders. Fallback if a conductor path fails: keep `/pm-release`.)
- [ ] Codex manifest parses + `skills` resolves; reinstall in a fresh Codex thread surfaces the skills.
- [ ] `bun astro build` (or repo equivalent) green.
- [ ] **Zero-residual gate:** repo-wide grep finds NO live reference to any deleted command or the D6 contract outside historical/frozen paths (the completeness gate per `deletion-sweep-findings.md`); no bare `@agent-pm-*` remains (all scoped to `@agent-pm-skills:*`).
- [ ] `check-internal-link-validity --strict` passes (no dead links to deleted `commands/*.md` or `agents/_pairing.yaml`); the auditor's D6 check no longer fires (no false "sub-agent without companion command" findings).

## 5. Tag + hygiene
- [ ] Bump all THREE manifests `2.21.0` -> `2.22.0` in lockstep: `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.codex-plugin/plugin.json`.
- [ ] `CHANGELOG.md`: "Added" (Codex manifest), "Removed" (the 63 command wrappers = 60 skill-backed + 3 verb commands; note the verbs are lost per D2), and a short migration note (`/pm-skills:okr-writer` -> `/pm-skills:foundation-okr-writer`).
- [ ] Public release notes `docs/releases/Release_v2.22.0.md`.
- [ ] Tag + push (separate decision).
- [ ] Re-pin the `product-on-purpose/agent-plugins` marketplace registry to the new tag SHA (separate repo).
- [ ] Flip `plan_v2.22.0.md` Status to SHIPPED with date + SHA; refresh `MEMORY.md` Project Identity line.

## 6. File / area checklist (the full touched set)

| Area | Path(s) | Action |
|---|---|---|
| Command wrappers | `commands/*.md` minus `workflow-*` (63) | **Delete** |
| Workflow commands | `commands/workflow-*.md` (10) | Keep (unchanged) |
| Skill dirs / names / frontmatter / references | `skills/**` | **UNCHANGED** (no rename) |
| Sample library | `library/**` | **UNCHANGED** (no rename) |
| AGENTS.md | `AGENTS.md` | Rebuild command table to 10 rows |
| Generator | `scripts/generate-skill-pages.py` | Decouple Try-it/How-to from `find_command_file` |
| Generated docs | `docs/skills/*`, `docs/reference/commands.md` | Regenerate (new Try-it lines; 10-command ref) |
| Short-command refs | `README.md`, `QUICKSTART.md`, `docs/getting-started/*`, `docs/guides/*`, `docs/reference/runtime-components.md` | Sweep `/short-command` -> skill invocation |
| Codex manifest | `.codex-plugin/plugin.json` (new) | Create (point `privacyPolicyURL` at existing `PRIVACY.md`) |
| Sub-agent contract (D6 retire) | `agents/_pairing.yaml` (delete), `agents/pm-release-conductor.md` (reconcile @-mention prose), `docs/reference/runtime-components.md`, sub-agent guide/concept docs, `README.md`, `AGENTS.md` | Delete manifest + sweep D6 assertions (Phase 3f) |
| CI | `scripts/validate-commands`, `check-agents-md-command-sync`, `check-count-consistency`, `validate-codex-manifest` (new), `validate-version-consistency`, `pre-tag-validate`, `.github/workflows/validation.yml` | Update per Phase 2 |
| Manifests / CHANGELOG / release notes | `.claude-plugin/*`, `.codex-plugin/*`, `CHANGELOG.md`, `docs/releases/Release_v2.22.0.md` | Version + entry + notes |

## 7. Explicitly NOT modified
- **All 63 skill directories, names, frontmatter, templates, examples** - nothing is renamed.
- **The sample library** (`library/**`) - no renames, so no silent sample drops.
- **`generate-workflow-pages.py`, `generate-showcase.py`** - key off unchanged skill names/samples.
- **`docs/internal/skill-versioning.md`, `docs/reference/frontmatter-schema.yaml`** - taxonomy model unchanged.
- Historical release notes, archived context, `_LOCAL/**`, and the `_deferred/` archive.
