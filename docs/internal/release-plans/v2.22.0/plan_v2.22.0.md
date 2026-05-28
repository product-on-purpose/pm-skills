# v2.22.0 Release Plan - Command/Skill Naming Standardization (additive)
**Status:** PLANNING - decisions LOCKED 2026-05-25. Depends on [v2.21.0](../v2.21.0/plan_v2.21.0.md) (marketplace launch) shipping first. Ready to execute once v2.21.0 is SHIPPED and the name map (below) is collision-checked. **Created:** 2026-05-25 (as the v3.1.0 naming plan); **renumbered to v2.22.0 and reframed as a MINOR on 2026-05-25** once the additive-aliases approach was locked. The breaking alias removal is reserved for the convergence major ([v3.0.0](../v3.0.0/plan_v3.0.0.md)). **Predecessor:** [v2.21.0](../v2.21.0/plan_v2.21.0.md) (marketplace launch, additive minor) - must ship first so the promoted launch keeps its clean "your skills did not change" message. **Type:** **MINOR** (additive at the skill-name level; one small Claude-only command-wrapper break). Short canonical skill names ship; the old phase-prefixed skill names are kept working as **deprecated aliases** for one release, so no skill a user invokes today silently misbehaves. The single exception: the hand-maintained Claude command wrappers (e.g. `/okr-writer`) are removed and replaced same-release by the namespaced skill (`/pm-skills:okr-writer`) - a signposted Claude-only break, not a silent one. The breaking step (removing the skill aliases) is reserved for [v3.0.0](../v3.0.0/plan_v3.0.0.md).

**Theme:** Resolve the command/skill naming inconsistency into a single, documented, enforced naming standard that works the same across Claude Code, Codex, and other runtimes. The catalog of capabilities does not change; how each is named and invoked does.

**Provenance:** (a) the 2026-05-25 maintainer investigation of the `/`-menu duplication, (b) live-repo verification of command/skill counts and wrapper bodies on 2026-05-25, (c) cross-runtime invocation research against agentskills.io, Claude Code, and Codex CLI (verified; sources in the companion standard). Durable artifact: `command-skill-naming-standard.md`.

* * *
## Why this release exists
In Claude Code's `/` menu every pm-skills capability appears twice: a short command wrapper (`/okr-writer`) and the skill it wraps (`/foundation-okr-writer`). These are not duplicate skills. Each of 63 skills is fronted by a hand-maintained thin command wrapper, and the library uses two inconsistent naming schemes:

- 48 wrappers are **short** and differ from the prefixed skill (`okr-writer` -> `foundation-okr-writer`): "two different things."
  
- 15 `tool-*` wrappers are the **full** prefixed name identical to the skill: "the same word twice."
  
- 10 `workflow-*` commands have no skill twin (orchestrators): one entry, no duplication.
  

`48 + 15 + 10 = 73` commands; `48 + 15 = 63` skills. The inconsistency exists because 73 wrappers are hand-maintained with no documented rule. This is the right thing to standardize after the marketplace launch, since what a marketplace lists and what other runtimes invoke is the **skill**, and the skill identifier should be coherent and portable.

* * *
## Before and after (what this looks like for real people)
This release changes how each capability is **named and reached**, not what it does. Here is the concrete day-to-day difference, by who you are.
### If you use the skills in Claude Code
- **Before:** every capability shows up twice in the `/` menu - a short command (`/okr-writer`) and the skill it wraps (`/pm-skills:foundation-okr-writer`). That is roughly 136 menu rows for 63 real capabilities, and because the two entries are named differently it is not obvious they are the same thing.
  
- **After:** one canonical entry per capability, with a short name (`/pm-skills:okr-writer`). The old long namespaced skill (`/pm-skills:foundation-okr-writer`) still resolves this release (deprecated). The one exception: the un-namespaced short command wrapper (`/okr-writer`) is removed this release; its replacement is the namespaced short-name skill (`/pm-skills:okr-writer`), landing in the same release. The menu roughly halves once the deprecation window closes at v3.0.0.
  
### If you use the skills on Codex (or Cursor, Gemini, Copilot)
- **Before:** you type the full phase-prefixed name, `$foundation-okr-writer`. The `foundation-` part is dead weight you have to remember and type.
  
- **After:** you type the short name, `$okr-writer`. The old name keeps working this release as a deprecated alias. Skills that genuinely need a `pm-` prefix (the library-tooling ones, per the naming standard R-A6) keep it; everything else is bare. Reaching a skill by describing what you want in plain language is unchanged.
  
### If you maintain the library
- **Before:** 73 command wrappers are maintained by hand with no written naming rule, which is exactly why the naming drifted into three inconsistent buckets. Adding or renaming a skill means remembering to also touch a parallel wrapper.
  
- **After:** the command wrappers are gone (except the 10 `workflow-*` orchestrators). The skill is the single source of truth, and a CI validator enforces the naming rules plus a description-quality floor, so the inconsistency cannot quietly creep back. Less to maintain, and the rules are machine-checked rather than remembered.
  
### What does NOT change (so you can stop worrying about it)
- **Skill behavior, templates, and outputs** are identical. This is a naming change, not a capability change.
  
- **The catalog count** stays at 63 skills.
  
- **Existing marketplace installs** pinned to the v2.21.0 commit are unaffected - the rename lands in a later tag.
  
- **The Triple Diamond taxonomy** is preserved; it just lives in `metadata.classification` and the directory grouping instead of being baked into the typed name.
  
### The one thing that does break, and when
Removing the deprecated aliases is a genuine break, and it is deliberately **not** in this release - it is reserved for the [v3.0.0](../v3.0.0/plan_v3.0.0.md) convergence a full release later, with its own notice. The only thing that goes away in v2.22.0 is the hand-maintained Claude command wrapper (`/okr-writer`), and it is replaced the same release by the namespaced skill (`/pm-skills:okr-writer`). One residual cross-runtime caveat: on Codex the new short names share a flat namespace with other vendors' skills, so a generic name like `$prd` could in principle collide; this is an accepted, documented tradeoff handled through the skill description (see `naming-impact-analysis.md`), not the name.

* * *
## The cross-runtime constraint (verified) that drives the design
- **Command wrappers are Claude Code legacy.** Commands have been merged into skills in current Claude Code; a `commands/*.md` and a `skills/*/SKILL.md` work identically, and skills accept the same `$ARGUMENTS` / `$1` / named-argument substitution. The wrapper layer is legacy scaffolding, not a capability.
  
- **The skill name is the cross-runtime typed identifier.** On Codex a user types `$skill-name`. A long phase-prefixed name (`$foundation-okr-writer`) is what a user must remember on every runtime except Claude Code. So short-name ergonomics must live on the **skill name**.
  
- **The description is the portable invocation interface.** Both runtimes select skills from natural language via `description`. A user who forgets the name reaches the skill through its description. This matters more cross-runtime than any naming choice.
  

Full analysis + sources: `command-skill-naming-standard.md`.

* * *
## Decisions (Decision Briefs) - DECIDED 2026-05-25
Options labeled A/B/C; maintainer slots filled.
### D-V31-1 - Canonical identifier form
- **Alternatives:** A) **Short flat names** (`okr-writer`), phase moved to `metadata.classification`. B) Keep phase-prefixed names. C) Short with phase namespace only on collisions.
  
- **DECISION: A.** The skill name is what users type on every runtime except Claude Code, so the ergonomics belong there; phase is taxonomy and already lives in `metadata.classification`. Triple Diamond pedagogy is preserved through directory grouping, docs, and the classification field, not the typed identifier. Matches the agentskills.io house style (Anthropic's bundled skills use short flat names: `pdf`, `docx`). C is rejected: it rebuilds the "when do we prefix?" ambiguity that caused the original drift.
  
### D-V31-2 - Command/wrapper layer fate
- **Alternatives:** A) **Drop the command layer.** B) Generate wrappers from source. C) Keep hand-authored, enforce with a validator.
  
- **DECISION: A (drop).** OQ-1 (resolved) confirms skills accept the same arguments as commands and that commands are merged into skills, so a wrapper layer adds no capability. Dropping it needs no generator and halves the `/` menu. Keep only the 10 `workflow-*` commands (they have no skill twin and are orchestrators).
  
### D-V31-3 - Implementation mechanism
- **Alternatives:** A) Generator + validator. B) **Validator only.** C) Generator only.
  
- **DECISION: B (validator only).** Because D-V31-2=A drops the wrapper layer, there is nothing to generate; a deterministic, enforcing validator enforces the naming + description rules. See the validator spec in the companion standard (Section 8).
  
### D-V31-4 - Migration / back-compat for renamed identifiers
- **Alternatives:** A) Hard rename now, document, accept the break. B) **Deprecated aliases for one release.** C) Permanent alias map.
  
- **DECISION: B.** Old phase-prefixed names keep resolving as deprecated alias skills for this release (so this stays additive/minor); an internal alias map drives the workflow/cross-reference rewrites so nothing internal breaks at the cut. The alias **removal** is the breaking step, reserved for the convergence major ([v3.0.0](../v3.0.0/plan_v3.0.0.md)). Same graceful-deprecation pattern v2.21.0 uses for the marketplace.
  
### D-V31-5 - Description-quality bar (the portable interface)
- **Alternatives:** A) **Normative + CI-checked.** B) Normative, review-only. C) Leave as-is.
  
- **DECISION: A (+ B).** A heuristic CI lint enforces the rubric floor (length, trigger phrasing, no name-dependence); human review enforces prose quality beyond heuristics. Rubric in the companion standard (Section 5).
  
### D-V31-6 - Version designation
- **Alternatives:** A) Major. B) Minor (additive). C) Minor now, major at alias removal.
  
- **DECISION: C, realized as a MINOR now.** This release is additive (short names + deprecated aliases), so it ships as the minor **v2.22.0**. The breaking alias removal is the convergence major ([v3.0.0](../v3.0.0/plan_v3.0.0.md)), bundled with the marketplace old-path retirement.
  

* * *
## Open reconsideration (2026-05-27): split the release by confidence
**STATUS: EVALUATED 2026-05-27, proceeding as locked (D-V31-6=C confirmed).** Maintainer reviewed the split-the-release alternative after two Codex adversarial passes and chose to ship the bundled v2.22.0 as decided. The four Codex-surfaced gaps (additive-vs-breaks contradiction wording, missing rollback section, v3.0.0 go/no-go gate, accepted Codex flat-namespace collision tradeoff) are addressed via the housekeeping edits in this revision and the new Rollback / Abort section below, rather than by restructuring the release. The decomposition analysis below is retained as record of the considered alternative.

> Added after a Codex adversarial review returned **PAUSE** and the maintainer reframed the menu doubling as baseline-bad-UX regardless of user signal. This does NOT overturn the locked naming _target_; it surfaced a sequencing alternative considered before execution. Trigger: D-V31-6 ships a _minor_ that pre-commits a _major_ (v3.0.0 alias removal) before the new names are validated against real usage, while the impact analysis itself confirms a Codex flat-namespace collision risk that the rename worsens.

**The reframing that splits the work.** The release bundles two improvements with very different justification strength:

| Track | What it is | Fixes | Confidence / justification | Breaking? |
|---|---|---|---|---|
| **1 - De-duplication** | Drop the 63 hand-maintained command wrappers (keep the 10 `workflow-*`) | The `/`-menu doubling (~136 rows -> ~73) | High. Justified by baseline bad UX alone, no user signal needed; root-cause fix for the hand-fan-out drift. | Minor break: `/okr-writer` goes away, replaced by the namespaced skill. NOT purely additive - the plan's "nothing breaks" framing is wrong on this point. |
| **2 - Rename** | Strip phase prefixes (`foundation-okr-writer` -> `okr-writer`), add deprecated aliases, commit to their removal | Long/inconsistent names; cross-runtime typing ergonomics | Lower. Evidence-dependent; worsens Codex flat-namespace collision risk; pre-commits a v3.0.0 breaking migration toward names not yet validated. | Yes, eventually: alias removal at v3.0.0. |

**The alternative under evaluation:**

- **Track 1 sooner** (this release or a small one): drop the wrappers, halve the menu, and write down + CI-enforce the naming standard for _new_ skills. Banks the high-confidence UX win immediately.
  
- **Track 2 folded into the already-planned** [**v3.0.0**](../v3.0.0/plan_v3.0.0.md): do the 63-skill rename as part of the convergence major that _already_ carries a breaking change (the marketplace old-path retirement). One migration instead of two, decided with post-launch evidence, reversible until then.
  

**What this buys:** removes the "additive minor that pre-commits a major" structure, resolves the plan's internal contradiction (additive vs the real wrapper-drop break), and defers the lower-confidence rename until it can be validated - without delaying the UX cleanup.

**What it costs:** the short-name / portability win waits for v3.0.0; the deprecation grace for the rename compresses into the single major (mitigate by keeping aliases through one post-v3.0.0 release if needed).

**Decision made 2026-05-27:** ship as one additive minor (status quo, D-V31-6=C confirmed). Track-1 + Track-2 split rejected to preserve a single coherent release window and keep v3.0.0 limited to alias-removal + marketplace-old-path retirement.

**Related gaps the reconsideration opened (now closed via this revision):**

- Rollback/abort section: added below (see "Rollback / abort + v3.0.0 collision-monitoring criteria").
  
- Additive-vs-breaks contradiction wording: corrected throughout (top-of-file Type line; Before/after Claude Code section).
  
- v3.0.0 go/no-go gate with collision-monitoring criteria: defined below and to be cross-referenced in `../v3.0.0/plan_v3.0.0.md`.
  
- Codex-collision finding re-examination: addressed by retaining D-V31-1 with the accepted-tradeoff framing in `naming-impact-analysis.md` sections 0 and 2, plus the new v3.0.0 collision-monitoring gate that can defer alias removal if real collisions materialize.
  

* * *
## Open questions
- **OQ-1: RESOLVED 2026-05-25.** Claude Code skills accept the same inline-argument substitution as commands (`$ARGUMENTS`, `$1`, named args), and commands are merged into skills. Dropping the wrapper layer loses no capability and needs no generator. Source: code.claude.com/docs/en/skills.md.
  
- **OQ-2:** Does Codex `$skill-name` support prefix/substring matching, or only exact names? Initial research found no evidence of fuzzy matching; `/skills` browse + implicit description matching are the documented fallbacks. Re-verify near execution. (Strengthens D-V31-1=A regardless.)
  
- **OQ-3 (execution-time):** Confirm the skill rename does not disturb the v2.21.0 tagged/pinned marketplace install (the pin is a commit SHA; the rename lands in a later tag, so the pinned install is unaffected - verify at execution).
  
- **OQ-4 (Phase 1 gate):** Confirm all 63 short-name candidates are unique with no collisions. The proposed map + check is in `naming-map.md`.
  

* * *
## Phases
### Phase 0 - Entrance gate
- v2.21.0 (marketplace launch) SHIPPED.
  
- The name map (OQ-4) is collision-checked and approved.
  
### Phase 1 - Standard + name map
- Finalize `command-skill-naming-standard.md` as the normative rule.
  
- Finalize the canonical short-name map for all 63 skills in `naming-map.md`; resolve any collisions.
  
### Phase 2 - Validator
- Build the naming validator (deterministic, enforcing) per the spec in the standard (Section 8): every skill has a short, unique `name`; no phase prefix on the canonical name; `workflow-*` exception; description rubric floor.
  
- Wire it into the pre-tag validator bundle.
  
### Phase 3 - Rename + alias + rewrite
- Rename the 63 skill directories + `name:` fields to the short canonical names; move phase to `metadata.classification` (already present, verify).
  
- Add deprecated alias skills at the old names (D-V31-4=B): each resolves to the new skill, carries a one-line deprecation note, `metadata.deprecated: true`.
  
- Rewrite internal cross-references (workflows, AGENTS.md, docs) via the alias map so nothing internal breaks.
  
- Delete the hand-maintained command wrappers (D-V31-2=A); keep `workflow-*`.
  
- Correct `docs/reference/runtime-components.md` (the `/skill-name` claim and the "12 workflows" count -> 10).
  
### Phase 4 - Verify
- Full pre-tag validator bundle (incl. the new naming validator + description-quality lint) + Astro build green.
  
- Spot-check invocation: Claude Code `/<short-name>` and `/<old-name>` (alias) both resolve; Codex `$<short-name>` + implicit, if available.
  
### Phase 5 - Tag + hygiene
- Cut **v2.22.0**.
  
- CHANGELOG under "Added" (short names) / "Deprecated" (old names); release notes framed as an additive naming improvement with a deprecation notice.
  
- Post-tag hygiene: flip this plan + CONTEXT.md to SHIPPED; refresh MEMORY.md; confirm the alias-removal item is recorded in the v3.0.0 convergence stub.
  

* * *
## Release-level acceptance criteria
- A single documented naming rule exists (`command-skill-naming-standard.md`) and is the authority.
  
- All 63 skills have short, unique, prefix-free canonical names; the three-bucket inconsistency is gone.
  
- Old phase-prefixed names still resolve as deprecated aliases (additive); internal cross-references all resolve.
  
- The hand-maintained command wrappers are removed; only `workflow-*` commands remain.
  
- Naming conformance + the description-quality floor are CI-enforced.
  
- `runtime-components.md` accurately describes the model; the workflow count reads 10.
  
- The full pre-tag validator bundle + Astro build are green on the tagged SHA.
  
- The alias-removal (breaking) step is recorded in the v3.0.0 convergence plan.
  

* * *
## Rollback / abort + v3.0.0 collision-monitoring criteria
Added 2026-05-27 to close the Codex-flagged gap. None of these triggers has been observed; this section defines what would cause this release (or the v3.0.0 follow-on) to be halted or rolled back, and what the recovery procedure is.
### Abort triggers (this release, before tag)
- **One-skill spike fails.** Before the mass rename (Phase 3), a single skill is converted as a smoke test: add `$ARGUMENTS` handling to its `SKILL.md`, delete its wrapper, install locally, confirm both `/pm-skills:<short>` and the deprecated alias resolve and receive arguments. If the spike does not behave as the OQ-1 docs claim, the wrapper-drop premise is wrong; pause and re-evaluate D-V31-2.
  
- **Validator catches an unfixable collision.** Phase 1 / OQ-4 verified uniqueness on paper. If the validator surfaces a real collision in Phase 4, halt and revisit `naming-map.md`.
  
- **Astro / pre-tag bundle red after rewrite.** Standard rule. Do not tag with a red bundle.
  
### Rollback procedures (after tag, if a v2.22.0 regression is reported)
- **Cross-reference miss** (an internal link or doc still references a renamed dir): point-fix in a v2.22.x patch; the alias layer means user-facing invocation already covers them.
  
- **Real user reliance on a deleted** `/<short>` **command wrapper:** restore the specific wrapper(s) as Claude-only stubs in a v2.22.x patch. A wrapper is an 11-line file and trivially re-creatable.
  
- **Argument-passing regression** (a skill receives args differently from the wrapper it replaced): point-fix the affected skill's `SKILL.md` to explicitly pass `$ARGUMENTS`. The spike should prevent this from reaching tag.
  
- **Mass rollback if the rename itself is wrong:** revert the v2.22.0 tag commit and the rename PR. The deprecated aliases mean the old names still work even pre-revert; the revert restores them as canonical.
  
### v3.0.0 collision-monitoring criteria (gating the alias removal)
The breaking step (alias removal) at v3.0.0 is gated on the following. Any one being unmet defers alias removal one full release:

- **Zero reproducible** `$<short>` **collisions on Codex** between a pm-skills skill and another vendor's installed skill, during the v2.22.0 -> v3.0.0 window. If any are reported and reproduced, extend the alias window and add an explicit collision-avoidance note to the affected skill's description.
  
- **One-release minimum alias window has elapsed** (the v2.22.0 -> v3.0.0 gap).
  
- **The v3.0.0 plan carries a documented go/no-go gate** mirroring this list as an acceptance criterion (see `../v3.0.0/plan_v3.0.0.md`). The go/no-go must confirm: alias hits in logs are low or zero, no open collision reports, marketplace adoption metrics if available, and a maintainer sign-off.
  
- **Marketplace-pinned installs are not silently broken** by alias removal (the v2.21.0 pin is a SHA so this is structurally true; re-verify at the v3.0.0 cut).
  
### Intentionally NOT a rollback trigger
- A maintainer changing their mind about name aesthetics. Once short names ship, further name churn is itself a worse failure than the wrong-name choice.
  
- A single unreproduced collision report. The threshold is reproducible.
  

* * *
## Dependencies and sequencing
- **Hard dependency:** v2.21.0 SHIPPED (protects the promoted launch's "skills unchanged" message).
  
- **Relationship to v3.0.0 (convergence):** this release creates the deprecated aliases; v3.0.0 removes them (bundled with the marketplace old-path retirement).
  
## Referenced documents (index)
Every spec, plan, and repo doc this release depends on or touches, with what each is for.
### This release's companions (in `docs/internal/release-plans/v2.22.0/`)
| Doc | What it is for |
|---|---|
| [`command-skill-naming-standard.md`](command-skill-naming-standard.md) | The durable, normative naming standard - the authority any future naming question is settled against. Defines the adopted rule (Rule-set A: short names, phase in `metadata.classification`, drop the wrappers), the cross-runtime rationale, the per-skill `pm-` rule (R-A6), and the 6-check validator spec. |
| [`naming-map.md`](naming-map.md) | The concrete old-name to short-name map for all 63 skills, grouped by phase, plus the collision check proving the 63 short names are unique. This is the Phase 1 / OQ-4 artifact the rename executes from. |
| [`naming-impact-analysis.md`](naming-impact-analysis.md) | The before/after, end-user, and repo-impact analysis. Documents who breaks and when, the per-runtime invocation change, the repo blast radius (which files churn versus stay frozen), and the verified Codex flat-namespace collision finding that settled the `pm-` question. |
| [`implementation-plan.md`](implementation-plan.md) | The concrete, enumerated rewrite set for executors: pre-execution gates, every file/folder to touch by phase + action, the explicit NOT-touched list, sequencing to avoid echo-miss, per-skill conversion checklist, and rollback hooks. The Phase 1 deliverable promised by the impact analysis. |
### Related release plans | Doc | What it is for | | --- | --- | | `../v2.21.0/plan_v2.21.0.md` | The predecessor release (marketplace launch, shipped 2026-05-26). It must ship before this one so the promoted launch keeps its "your skills did not change" message. | | `../v2.21.0/decision-worksheet.md` | The verified Claude Code behavior facts captured during v2.21.0 (no marketplace redirect, graceful-deprecation toolbox, per-marketplace identity) that this plan's deprecation approach reuses. | | `../v3.0.0/plan_v3.0.0.md` | The convergence major, where the breaking step lives: removing the deprecated name aliases this release creates, bundled with the marketplace old-path retirement. | ### Repo docs this release touches
| Doc | What it is for |
|---|---|
| [`docs/reference/runtime-components.md`](../../../reference/runtime-components.md) | The public reference describing the command/skill/workflow model. It is currently inaccurate (a stale `/skill-name` claim and a "12 workflows" count); Phase 3 corrects it to match the post-rename reality (10 workflows, skills-not-commands). |
## Notes - Per the repo convention against per-item effort docs, work items live as rows/subsections here; the naming standard and the name map are the genuinely distinct deliverables that get companion files.
- Renumbered from `v3.1.0/` to `v2.22.0/` on 2026-05-25 when the additive-aliases approach (minor) was locked.
  
## Review history
- **Drafted 2026-05-25**; cross-runtime invocation verified against agentskills.io, Claude Code, and Codex CLI.
  
- **Decisions locked 2026-05-25:** short names (D-V31-1=A), drop wrappers (D-V31-2=A), validator-only (D-V31-3=B), deprecation aliases (D-V31-4=B), description bar (D-V31-5=A), additive minor (D-V31-6=C). OQ-1 resolved.
  
- **2026-05-27, Codex pass 1:** adversarial review of the full plan + companions returned **PAUSE** with findings on scope honesty, timing, opportunity cost, v3.0.0 pre-commitment, collision tradeoff, and missing rollback.
  
- **2026-05-27, Codex pass 2:** pressure-test of a proposed Track-1 / Track-2 split. Verdict: the split improves honesty but does not eliminate the harder risks; rollback, collision criteria, and v3.0.0 gate remain prerequisites regardless of structure.
  
- **2026-05-27, maintainer decision:** proceed with the bundled v2.22.0 as locked (D-V31-6=C confirmed); close the four Codex-surfaced gaps via housekeeping (this revision) rather than restructuring.
  
- **Pending:** ship v2.21.0; collision-check the name map; then a Codex adversarial pass before execution.
