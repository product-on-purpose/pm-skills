# v2.22.0 Release Plan - Command/Skill Naming Standardization (additive)

**Status:** PLANNING - decisions LOCKED 2026-05-25. Depends on [v2.21.0](../v2.21.0/plan_v2.21.0.md) (marketplace launch) shipping first. Ready to execute once v2.21.0 is SHIPPED and the name map (below) is collision-checked.
**Created:** 2026-05-25 (as the v3.1.0 naming plan); **renumbered to v2.22.0 and reframed as a MINOR on 2026-05-25** once the additive-aliases approach was locked. The breaking alias removal is reserved for the convergence major ([v3.0.0](../v3.0.0/plan_v3.0.0.md)).
**Predecessor:** [v2.21.0](../v2.21.0/plan_v2.21.0.md) (marketplace launch, additive minor) - must ship first so the promoted launch keeps its clean "your skills did not change" message.
**Type:** **MINOR** (additive). Short canonical skill names ship; the old phase-prefixed names are kept working as **deprecated aliases** for one release. Nothing a user invokes today breaks, so by the compatibility test (does an existing user have to act? no) this is a minor. The breaking step (removing the aliases) is reserved for [v3.0.0](../v3.0.0/plan_v3.0.0.md).

**Theme:** Resolve the command/skill naming inconsistency into a single, documented, enforced naming standard that works the same across Claude Code, Codex, and other runtimes. The catalog of capabilities does not change; how each is named and invoked does.

**Provenance:** (a) the 2026-05-25 maintainer investigation of the `/`-menu duplication, (b) live-repo verification of command/skill counts and wrapper bodies on 2026-05-25, (c) cross-runtime invocation research against agentskills.io, Claude Code, and Codex CLI (verified; sources in the companion standard). Durable artifact: [`command-skill-naming-standard.md`](command-skill-naming-standard.md).

---

## Why this release exists

In Claude Code's `/` menu every pm-skills capability appears twice: a short command wrapper (`/okr-writer`) and the skill it wraps (`/foundation-okr-writer`). These are not duplicate skills. Each of 63 skills is fronted by a hand-maintained thin command wrapper, and the library uses two inconsistent naming schemes:

- 48 wrappers are **short** and differ from the prefixed skill (`okr-writer` -> `foundation-okr-writer`): "two different things."
- 15 `tool-*` wrappers are the **full** prefixed name identical to the skill: "the same word twice."
- 10 `workflow-*` commands have no skill twin (orchestrators): one entry, no duplication.

`48 + 15 + 10 = 73` commands; `48 + 15 = 63` skills. The inconsistency exists because 73 wrappers are hand-maintained with no documented rule. This is the right thing to standardize after the marketplace launch, since what a marketplace lists and what other runtimes invoke is the **skill**, and the skill identifier should be coherent and portable.

---

## The cross-runtime constraint (verified) that drives the design

- **Command wrappers are Claude Code legacy.** Commands have been merged into skills in current Claude Code; a `commands/*.md` and a `skills/*/SKILL.md` work identically, and skills accept the same `$ARGUMENTS` / `$1` / named-argument substitution. The wrapper layer is legacy scaffolding, not a capability.
- **The skill name is the cross-runtime typed identifier.** On Codex a user types `$skill-name`. A long phase-prefixed name (`$foundation-okr-writer`) is what a user must remember on every runtime except Claude Code. So short-name ergonomics must live on the **skill name**.
- **The description is the portable invocation interface.** Both runtimes select skills from natural language via `description`. A user who forgets the name reaches the skill through its description. This matters more cross-runtime than any naming choice.

Full analysis + sources: [`command-skill-naming-standard.md`](command-skill-naming-standard.md).

---

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

---

## Open questions

- **OQ-1: RESOLVED 2026-05-25.** Claude Code skills accept the same inline-argument substitution as commands (`$ARGUMENTS`, `$1`, named args), and commands are merged into skills. Dropping the wrapper layer loses no capability and needs no generator. Source: code.claude.com/docs/en/skills.md.
- **OQ-2:** Does Codex `$skill-name` support prefix/substring matching, or only exact names? Initial research found no evidence of fuzzy matching; `/skills` browse + implicit description matching are the documented fallbacks. Re-verify near execution. (Strengthens D-V31-1=A regardless.)
- **OQ-3 (execution-time):** Confirm the skill rename does not disturb the v2.21.0 tagged/pinned marketplace install (the pin is a commit SHA; the rename lands in a later tag, so the pinned install is unaffected - verify at execution).
- **OQ-4 (Phase 1 gate):** Confirm all 63 short-name candidates are unique with no collisions. The proposed map + check is in [`naming-map.md`](naming-map.md).

---

## Phases

### Phase 0 - Entrance gate
- v2.21.0 (marketplace launch) SHIPPED.
- The name map (OQ-4) is collision-checked and approved.

### Phase 1 - Standard + name map
- Finalize [`command-skill-naming-standard.md`](command-skill-naming-standard.md) as the normative rule.
- Finalize the canonical short-name map for all 63 skills in [`naming-map.md`](naming-map.md); resolve any collisions.

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

---

## Release-level acceptance criteria

- A single documented naming rule exists ([`command-skill-naming-standard.md`](command-skill-naming-standard.md)) and is the authority.
- All 63 skills have short, unique, prefix-free canonical names; the three-bucket inconsistency is gone.
- Old phase-prefixed names still resolve as deprecated aliases (additive); internal cross-references all resolve.
- The hand-maintained command wrappers are removed; only `workflow-*` commands remain.
- Naming conformance + the description-quality floor are CI-enforced.
- `runtime-components.md` accurately describes the model; the workflow count reads 10.
- The full pre-tag validator bundle + Astro build are green on the tagged SHA.
- The alias-removal (breaking) step is recorded in the v3.0.0 convergence plan.

---

## Dependencies and sequencing
- **Hard dependency:** v2.21.0 SHIPPED (protects the promoted launch's "skills unchanged" message).
- **Relationship to v3.0.0 (convergence):** this release creates the deprecated aliases; v3.0.0 removes them (bundled with the marketplace old-path retirement).

## Companion documents

| File | Purpose |
|---|---|
| [`command-skill-naming-standard.md`](command-skill-naming-standard.md) | Durable normative naming standard: rule, cross-runtime rationale, best practices, validator spec, reference sources |
| [`naming-map.md`](naming-map.md) | The 63-skill old-name -> short-name map with collision check (the Phase 1 / OQ-4 artifact) |

## Notes
- Per the repo convention against per-item effort docs, work items live as rows/subsections here; the naming standard and the name map are the genuinely distinct deliverables that get companion files.
- Renumbered from `v3.1.0/` to `v2.22.0/` on 2026-05-25 when the additive-aliases approach (minor) was locked.

## Review history
- **Drafted 2026-05-25**; cross-runtime invocation verified against agentskills.io, Claude Code, and Codex CLI.
- **Decisions locked 2026-05-25:** short names (D-V31-1=A), drop wrappers (D-V31-2=A), validator-only (D-V31-3=B), deprecation aliases (D-V31-4=B), description bar (D-V31-5=A), additive minor (D-V31-6=C). OQ-1 resolved.
- **Pending:** ship v2.21.0; collision-check the name map; then a Codex adversarial pass before execution.
