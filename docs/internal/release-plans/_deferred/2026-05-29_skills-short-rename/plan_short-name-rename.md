# v2.22.0 Release Plan - Command/Skill Naming Standardization (hard rename)

**Status:** PLANNING - decisions LOCKED 2026-05-25; D-V31-4 reversed to hard rename and D-V31-6 reframed 2026-05-28; Codex plugin manifest fix and CI suite update folded in 2026-05-28. Depends on [v2.21.0](../v2.21.0/plan_v2.21.0.md) (marketplace launch) having shipped (it has). **Type:** **MINOR.** Short canonical skill names ship and the old phase-prefixed names are removed in the same release (hard rename, no deprecated aliases). This is treated as a minor under an explicit, recorded stance (D-V31-6): **skill invocation names are not part of the SemVer-governed public surface** - the install path and plugin identity are the governed contract, and individual skill names carry no stability guarantee. The `naming-map.md` old -> new table ships as the user migration aid. The hand-maintained Claude command wrappers (e.g. `/okr-writer`) are removed too, replaced by the namespaced skill (`/pm-skills:okr-writer`). This release also adds the Codex-native plugin manifest (`.codex-plugin/plugin.json`) and updates the CI/validator suite. No alias-removal work remains for [v3.0.0](../v3.0.0/plan_v3.0.0.md); that release now carries only the marketplace old-path retirement.

**Theme:** Resolve the command/skill naming inconsistency into a single, documented, enforced naming standard that works the same across Claude Code, Codex, and other runtimes, and make the package discoverable on Codex. The catalog of capabilities does not change; how each is named, invoked, and packaged does.

**Provenance:** (a) the 2026-05-25 maintainer investigation of the `/`-menu duplication, (b) live-repo verification of command/skill counts and wrapper bodies, (c) cross-runtime invocation research against agentskills.io, Claude Code, and Codex CLI, (d) the 2026-05-28 Codex install investigation (`_LOCAL/issues/2026-05-28_codex-plugin-fix/`) and the validator/generator discovery pass. Durable artifacts: `command-skill-naming-standard.md` (rule), `naming-map.md` (map), `naming-impact-analysis.md` (impact), `implementation-plan.md` (the executable rewrite set).

* * *
## Why this release exists
In Claude Code's `/` menu every pm-skills capability appears twice: a short command wrapper (`/okr-writer`) and the skill it wraps (`/pm-skills:foundation-okr-writer`). These are not duplicate skills. Each of 63 skills is fronted by a hand-maintained thin command wrapper, and the library uses two inconsistent naming schemes:

- 48 wrappers are **short** and differ from the prefixed skill (`okr-writer` -> `foundation-okr-writer`): "two different things."
- 15 `tool-*` wrappers are the **full** prefixed name identical to the skill: "the same word twice."
- 10 `workflow-*` commands have no skill twin (orchestrators): one entry, no duplication.

The inconsistency exists because the wrappers are hand-maintained with no documented rule. This is the right thing to standardize after the marketplace launch, since what a marketplace lists and what other runtimes invoke is the **skill**, and the skill identifier should be coherent and portable. A separate but related defect surfaced 2026-05-28: pm-skills shipped only a Claude manifest, so Codex's marketplace could list it but found "No plugin skills." The Codex manifest fix is bundled here because it is the same cross-runtime-packaging theme.

* * *
## Before and after (what this looks like for real people)
This release changes how each capability is **named, reached, and packaged**, not what it does.
### If you use the skills in Claude Code
- **Before:** every capability shows up twice in the `/` menu, a short command (`/okr-writer`) and the skill it wraps (`/pm-skills:foundation-okr-writer`). Roughly 136 menu rows for 63 real capabilities, and the two entries being named differently hides that they are the same thing.
- **After:** one canonical entry per capability, with a short name (`/pm-skills:okr-writer`). The old long namespaced skill (`/pm-skills:foundation-okr-writer`) and the un-namespaced wrapper (`/okr-writer`) are both removed this release (hard rename, no alias). The menu halves immediately, because there is no deprecated second entry. Anyone who learned an old name uses the `naming-map.md` old -> new table to update.
### If you use the skills on Codex (or Cursor, Gemini, Copilot)
- **Before:** you type the full phase-prefixed name, `$foundation-okr-writer`, and on Codex the plugin did not even surface its skills (no `.codex-plugin/plugin.json`).
- **After:** you type the short name, `$okr-writer`, and the plugin carries a Codex-native manifest so its skills are discoverable. The old name `$foundation-okr-writer` stops working this release. Skills that genuinely need a `pm-` prefix (the library-tooling ones, per R-A6) keep it; everything else is bare. Reaching a skill by describing what you want in plain language is unchanged.
### If you maintain the library
- **Before:** the command wrappers are maintained by hand with no written naming rule (the cause of the three-bucket drift), and the package is Claude-only-shaped.
- **After:** the wrappers are gone (except the 10 `workflow-*`), the skill is the single source of truth, the package carries both `.claude-plugin/` and `.codex-plugin/` manifests, and a CI validator suite enforces the naming rules, the description-quality floor, and the manifest/version lockstep so the inconsistency cannot quietly creep back.
### What does NOT change
- **Skill behavior, templates, and outputs** are identical. This is a naming and packaging change.
- **The catalog count** stays at 63 skills.
- **Existing marketplace installs** pinned to the v2.21.0 commit are unaffected; the rename lands in a later tag.
- **The Triple Diamond taxonomy** is preserved; it lives in `metadata.classification` and the directory grouping instead of the typed name.
### The genuine change, and the SemVer stance
The old phase-prefixed names stop working this release (hard rename, no alias window). Under D-V31-6 this is a MINOR because skill invocation names are declared outside the SemVer-governed public surface, but it is still a real change for anyone who learned an old name, so the `naming-map.md` old -> new table ships as the migration aid. Two residual notes: (1) the un-namespaced Claude command wrapper (`/okr-writer`) also goes away, replaced by `/pm-skills:okr-writer`; (2) on Codex the new short names share a flat namespace with other vendors' skills, so a generic name like `$prd` could in principle collide, an accepted documented tradeoff handled through the description (see `naming-impact-analysis.md`), not the name.

* * *
## The cross-runtime constraint (verified) that drives the design
- **Command wrappers are Claude Code legacy.** Commands have been merged into skills in current Claude Code; a `commands/*.md` and a `skills/*/SKILL.md` work identically, accepting the same `$ARGUMENTS` / `$1` / named-argument substitution. The wrapper layer is legacy scaffolding, not a capability.
- **The skill name is the cross-runtime typed identifier.** On Codex a user types `$skill-name`. A long phase-prefixed name is dead weight on every runtime except Claude Code, so short-name ergonomics belong on the **skill name**.
- **The package needs a per-runtime manifest.** Claude reads `.claude-plugin/`; Codex reads `.codex-plugin/plugin.json`. "Portable" means packaging, not only naming.
- **The description is the portable invocation interface.** Both runtimes select skills from natural language via `description`. This matters more cross-runtime than any naming choice.

Full analysis + sources: `command-skill-naming-standard.md` and `naming-impact-analysis.md`.

* * *
## Decisions (Decision Briefs)
Options labeled A/B/C; maintainer slots filled.
### D-V31-1 - Canonical identifier form
- **Alternatives:** A) **Short flat names** (`okr-writer`), phase moved to `metadata.classification`. B) Keep phase-prefixed names. C) Short with phase namespace only on collisions.
- **DECISION: A.** The skill name is what users type on every runtime except Claude Code, so the ergonomics belong there; phase is taxonomy and lives in `metadata.classification`. Triple Diamond pedagogy is preserved through directory grouping, the `docs/skills/<phase>/` folders, and the classification field, not the typed identifier. Matches the agentskills.io house style (`pdf`, `docx`). C rebuilds the "when do we prefix?" ambiguity that caused the drift.
### D-V31-2 - Command/wrapper layer fate
- **Alternatives:** A) **Drop the command layer.** B) Generate wrappers from source. C) Keep hand-authored, enforce with a validator.
- **DECISION: A (drop).** OQ-1 (resolved) confirms skills accept the same arguments as commands, so a wrapper adds no capability. Dropping it needs no generator and halves the `/` menu. Keep only the 10 `workflow-*` commands (orchestrators, no skill twin). Verify the wrapper-drop premise on a real install via the Phase 1.5 spike before the mass change.
### D-V31-3 - Implementation mechanism
- **Alternatives:** A) Generator + validator. B) **Validator only.** C) Generator only.
- **DECISION: B (validator only).** Nothing to generate once wrappers are dropped; a deterministic enforcing validator suite enforces naming + description + manifest rules. See `command-skill-naming-standard.md` Section 8 and `implementation-plan.md` Phase 2.
### D-V31-4 - Migration / back-compat for renamed identifiers
- **Alternatives:** A) **Hard rename now, document, accept the break.** B) Deprecated aliases for one release. C) Permanent alias map.
- **DECISION: A, reversed 2026-05-28 (hard rename).** Originally B (deprecated aliases). Changed to A after the maintainer reframed the goal as one-capability-one-name: a deprecation window would temporarily resurrect a second working name (old alias + new short name), a faint echo of the very duplication this release exists to remove. The old phase-prefixed names are removed in this release; the `naming-map.md` old -> new map drives every cross-reference rewrite (so nothing internal breaks) and ships as the user migration table. No alias layer is created; instead the repurposed `check-skill-cross-references` validator flags any lingering prefixed reference. Kept a MINOR via D-V31-6.
### D-V31-5 - Description-quality bar (the portable interface)
- **Alternatives:** A) **Normative + CI-checked.** B) Normative, review-only. C) Leave as-is.
- **DECISION: A (+ B).** A heuristic CI lint enforces the rubric floor (length, trigger phrasing, no name-dependence); human review enforces prose quality beyond heuristics. Rubric in the standard, Section 5.
### D-V31-6 - Version designation
- **Alternatives:** A) Major. B) **Minor (skill names declared outside the SemVer-governed surface).** C) Minor now, major at alias removal.
- **DECISION: B, confirmed 2026-05-28 as MINOR v2.22.0.** With the hard rename (D-V31-4=A) there is no alias window, so C (minor now, major at alias removal) no longer applies. Ships as the minor **v2.22.0** under an explicit stance: skill invocation names are NOT part of the SemVer-governed public API (the install path and plugin identity are). Renaming or removing a skill name is therefore not a breaking-API event. Defensible at near-zero adoption: the plugin still installs and works; individual skill names carry no stability guarantee. If that stance is ever rejected, this release becomes the v3.0.0 major. The marketplace old-path retirement remains the separate, trigger-gated v3.0.0 work.

* * *
## Superseded: the 2026-05-27 split-the-release reconsideration
> **SUPERSEDED 2026-05-28.** A Codex adversarial pass on 2026-05-27 proposed splitting the release (Track 1 = drop wrappers now; Track 2 = defer the rename + aliases into v3.0.0). The maintainer first chose to ship one bundled additive minor with aliases, then on 2026-05-28 reversed the alias decision entirely to a hard rename (D-V31-4=A) and reframed the version basis (D-V31-6). The split is moot: there is no alias window to defer, the rename ships now, and v3.0.0 keeps only the marketplace retirement. This paragraph is retained as a record that the alternative was considered and why it was not taken; the alias-era "collision-monitoring gate that defers alias removal" it referenced no longer exists.

* * *
## Open questions
- **OQ-1: RESOLVED 2026-05-25.** Claude Code skills accept the same inline-argument substitution as commands; dropping the wrapper loses no capability. Re-confirmed by the Phase 1.5 spike on a real install before the mass rename.
- **OQ-2:** Does Codex `$skill-name` support prefix/substring matching, or only exact names? No evidence of fuzzy matching; `/skills` browse + implicit description matching are the documented fallbacks. (Strengthens D-V31-1=A.)
- **OQ-3 (execution-time):** Confirm the rename does not disturb the v2.21.0 tagged/pinned marketplace install (pin is a commit SHA; rename lands in a later tag).
- **OQ-4: RESOLVED.** All 63 short-name candidates are unique (`naming-map.md` collision check PASS).

* * *
## Phases
The enumerated, executable rewrite set lives in [`implementation-plan.md`](implementation-plan.md). This is the summary spine.
### Phase 0 - Entrance gate
- v2.21.0 SHIPPED; name map collision-checked; decisions D1/D2/D3 in the impl-plan confirmed.
### Phase 1 - Standard + name map + spike
- Finalize `command-skill-naming-standard.md` (hard-rename framing) and `naming-map.md`.
- **Phase 1.5 one-skill spike** on a real install (load-bearing: no wrapper and no alias means the bare skill is the only path).
### Phase 2 - CI / validator suite update
- Add the naming check (no phase prefix; `*-sprint-*` and meaningful `pm-` exempt) and the Codex-manifest check. Repurpose/retire `validate-commands`; update `check-agents-md-command-sync`, `validate-agents-md`, `check-skill-cross-references`, `validate-version-consistency` (add the third manifest), `check-count-consistency` (sub-counts), the family validators, and the doc generators. Wire enforcing checks into `scripts/pre-tag-validate.{sh,ps1}` and `.github/workflows/validation.yml`; document each `.md` and update `scripts/README_SCRIPTS.md`. Full per-script spec in `implementation-plan.md` Phase 2.
### Phase 3 - Rename + delete + regenerate
- Rename the 63 skill dirs + `name:` fields; move `$ARGUMENTS` capture into each `SKILL.md`; verify `metadata.classification`.
- No alias skills are created (D-V31-4=A); `naming-map.md` is the migration table and drives the cross-reference rewrites.
- Delete the non-`workflow-*` command wrappers; rewrite the 10 `workflow-*` bodies to short names.
- Rename the name-keyed sample library (or the generator silently drops samples).
- Regenerate `docs/skills/` + `docs/workflows/`; delete orphan pages.
- Rewrite cross-references (AGENTS.md, `_workflows/`, guides, getting-started, agent context, README, in-skill `/command` links), Astro sidebar + redirects, and `docs/reference/runtime-components.md`.
- Add `.codex-plugin/plugin.json` + `PRIVACY.md` (Phase 3h).
### Phase 4 - Verify
- Full `pre-tag-validate` bundle + regen freshness + Astro build green; repo-wide grep for stray prefixed references returns only the kept sprint names and historical paths; live install spot-check on Claude Code; Codex manifest live check; `check-mcp-impact` reviewed.
### Phase 5 - Tag + hygiene
- Bump all THREE manifests in lockstep; CHANGELOG ("Added" / "Removed" / "Renamed" migration table); finalize `Release_v2.22.0.md` with the migration table; tag and push; **re-pin the `product-on-purpose/agent-plugins` registry to the new tag (separate repo)**; flip this plan + CONTEXT.md to SHIPPED; refresh MEMORY.md; update the v3.0.0 stub.

* * *
## Release-level acceptance criteria
- A single documented naming rule exists (`command-skill-naming-standard.md`) and is the authority.
- All 63 skills have short, unique, prefix-free canonical names (sprint families keep their methodology stems; meaningful `pm-` retained per R-A6); the three-bucket inconsistency is gone.
- Old phase-prefixed names are removed (hard rename); the `naming-map.md` old -> new table ships as the migration aid; internal cross-references all resolve to the short names.
- The hand-maintained command wrappers are removed; only `workflow-*` commands remain.
- `.codex-plugin/plugin.json` ships and Codex discovers the skills as a packaged plugin.
- Naming conformance, the description-quality floor, the Codex manifest, and the 3-manifest version lockstep are CI-enforced.
- `runtime-components.md` accurately describes the model; the workflow count reads 10.
- The full pre-tag validator bundle + Astro build are green on the tagged SHA.
- v3.0.0 carries only the marketplace old-path retirement (no alias-removal work remains).

* * *
## Rollback / abort
None of these has been observed; this section defines what would halt or roll back the release.
### Abort triggers (before tag)
- **One-skill spike fails** (Phase 1.5): the bare skill does not receive `$ARGUMENTS` as the OQ-1 docs claim. With no alias and no wrapper, this is the only invocation path, so pause and re-evaluate D-V31-2.
- **Validator surfaces an unfixable collision** after rename: halt, revisit `naming-map.md`.
- **Astro / pre-tag bundle red** after rewrite: do not tag.
### Rollback procedures (after tag)
- **Cross-reference miss** (a doc still references a renamed dir): point-fix in a v2.22.x patch. With the hard rename there is no alias safety net, so the repurposed `check-skill-cross-references` validator (flags lingering prefixed tokens) is the guard that should catch these before tag.
- **Real user reliance on a deleted name:** the `naming-map.md` migration table is the answer; a specific high-value old name can be restored as a thin Claude-only stub in a patch if genuinely needed.
- **Argument-passing regression:** point-fix the affected `SKILL.md` to pass `$ARGUMENTS`. The spike should prevent this from reaching tag.
- **Mass rollback if the rename itself is wrong:** revert the v2.22.0 tag commit and the rename PR, which restores the old names as canonical. With no alias layer, the old names do not resolve between ship and revert, so this is a faster-but-harder cut than the alias plan would have been; the staged sequencing (Phase 1.5 spike, validators before mass rename) is the safety net.
### v3.0.0 scope note
The Codex flat-namespace collision risk on bare short names is an accepted, documented tradeoff (see `naming-impact-analysis.md` sections 0 and 2), mitigated through the description rubric, not the name. There is no alias removal to gate; v3.0.0 gates only the marketplace old-path retirement (trigger: plugin #2).

* * *
## Dependencies and sequencing
- **Hard dependency:** v2.21.0 SHIPPED (protects the promoted launch's "skills unchanged" message; the rename lands in a later tag).
- **Relationship to v3.0.0 (convergence):** this release removes the old phase-prefixed names directly (hard rename), so no alias-removal work remains; v3.0.0 carries only the marketplace old-path retirement.

## Referenced documents (index)
### This release's companions (in `docs/internal/release-plans/v2.22.0/`)
| Doc | What it is for |
|---|---|
| [`command-skill-naming-standard.md`](command-skill-naming-standard.md) | The durable normative naming standard: Rule-set A (short names, phase in `metadata.classification`, drop the wrappers), the cross-runtime rationale, the per-skill `pm-` rule (R-A6), and the validator spec. |
| [`naming-map.md`](naming-map.md) | The old-name to short-name map for all 63 skills with the collision-check PASS. Doubles as the user migration table. |
| [`naming-impact-analysis.md`](naming-impact-analysis.md) | The before/after, end-user, and repo-impact analysis, including the verified Codex flat-namespace finding and the per-skill `pm-` resolution. |
| [`implementation-plan.md`](implementation-plan.md) | The concrete enumerated rewrite set: pre-execution gates, the per-script CI spec, every file/area to touch, the not-touched list, sequencing, and rollback. The executor's checklist. |
| `skills-manifest.yaml` (created during Phase 3 execution) | The release skill manifest (with `change_type` entries for the renames) that `validate-skills-manifest` checks. Authored when the dirs are renamed, not before, since the validator checks names against live `skills/` dirs. |
### Related release plans
| Doc | What it is for |
|---|---|
| [`../v2.21.0/plan_v2.21.0.md`](../v2.21.0/plan_v2.21.0.md) | The predecessor (marketplace launch, shipped 2026-05-26); must precede this so the launch keeps its "skills unchanged" message. |
| [`../v3.0.0/plan_v3.0.0.md`](../v3.0.0/plan_v3.0.0.md) | The convergence major. After this release, it carries only the marketplace old-path retirement (the alias-removal payload is gone, folded into this hard rename). |
### Repo docs this release touches
| Doc | What it is for |
|---|---|
| [`docs/reference/runtime-components.md`](../../../reference/runtime-components.md) | The public reference describing the command/skill/workflow model. Currently inaccurate (a stale `/skill-name` claim and a "12 workflows" count); Phase 3 corrects it (10 workflows, skills-not-commands). |

## Notes
- Per the repo convention against per-item effort docs, work items live as rows/subsections here and in `implementation-plan.md`; the standard and the map are the genuinely distinct deliverables that get companion files.
- Renumbered from `v3.1.0/` to `v2.22.0/` on 2026-05-25 when the minor framing was first locked; the hard-rename reframe (2026-05-28) kept it a minor under the names-not-SemVer stance.

## Review history
- **Drafted 2026-05-25**; cross-runtime invocation verified against agentskills.io, Claude Code, and Codex CLI.
- **Decisions locked 2026-05-25:** short names (D-V31-1=A), drop wrappers (D-V31-2=A), validator-only (D-V31-3=B), deprecation aliases (D-V31-4=B), description bar (D-V31-5=A), minor (D-V31-6=C). OQ-1 resolved.
- **2026-05-27, Codex passes 1-3:** adversarial review of the plan, the Track-1/Track-2 split, and the prep work; surfaced scope-honesty, rollback, v3 gate, and execution-readiness gaps.
- **2026-05-28, maintainer decision (hard rename):** reversed D-V31-4 to A (hard rename, no aliases) to keep one-capability-one-name; confirmed D-V31-6 as MINOR v2.22.0 under the stance that skill invocation names are outside the SemVer-governed surface. The split-reconsideration is superseded.
- **2026-05-28, scope additions:** folded in the Codex `.codex-plugin/plugin.json` fix and a CI/validator-suite update (per the install investigation and the validator/generator discovery pass). `implementation-plan.md` rewritten accordingly.
- **Pending:** finalize the spec, impact analysis, release notes, and v3.0.0 stub to the hard-rename reality (in progress 2026-05-28); run the Phase 1.5 spike; then execute.
