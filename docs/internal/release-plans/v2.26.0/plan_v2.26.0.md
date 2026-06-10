# v2.26.0 Release Plan: Authoring + quality layer (workflow builder, ad-hoc chaining, skill-quality convergence)

**Status:** PLANNED (scope staged 2026-06-10; per-item specs + implementation plans NOT yet written). This plan stages the v2.26.0 scope; the next working session creates the spec and implementation plan for each item (see the session-log continuation prompt that accompanies this plan).
**Owner:** Maintainers
**Type:** **MINOR** (additive capability: F-14 and F-15 add new authoring tools; F-12 is a quality pass over existing skills. No breaking changes. The catalog grows if F-14/F-15 ship as skills.)
**Theme:** Close the authoring + quality gap. After v2.25.x hardened the release gate and activation layer, v2.26.0 turns to the contributor/user authoring experience (build workflows, chain skills ad hoc) and a deliberate quality-convergence pass over the existing catalog.
**Created:** 2026-06-10
**Companion to:** the effort briefs under `docs/internal/efforts/` and GitHub issues #135 / #133 / #134.

---

## Why this scope, why now

The v2.25.x line (manifest + parity gate, activation hooks, audit closure) finished the release-gate and trust work. The next-largest gaps in the backlog are all authoring/quality, and three have effort briefs already: a workflow builder (#133), ad-hoc skill chaining (#134), and a skill-quality convergence pass (#135). They cohere as one minor: two new authoring tools plus a quality sweep of what already exists. The audit's novel follow-up #5 (a static Skill Finder + optional output schemas) is a candidate to fold in or split out; the next session decides.

## Scope - what v2.26.0 ships (each gets a spec + implementation plan next session)

| Item | Issue | Effort brief | One-line intent |
|---|---|---|---|
| **F-14 Workflow Builder** | #133 | `docs/internal/efforts/F-14-workflow-builder.md` | A `utility-workflow-builder` skill: the workflow analogue of `utility-pm-skill-builder`. Guides a user from "I want a workflow for X" to a complete `_workflows/*.md` + `commands/workflow-*.md` + regenerated docs, with a Why-Gate and overlap check. |
| **F-15 Ad-Hoc Skill Chaining** | #134 | `docs/internal/efforts/F-15-skill-chaining.md` | A lightweight `/chain` capability to sequence skills at runtime WITHOUT authoring a workflow file (the "pipe commands ad hoc" to F-14's "write a shell script"). Passes context between steps; ephemeral, not committed. |
| **F-12 Skill Quality Convergence** | #135 | `docs/internal/efforts/F-12-skill-quality-convergence.md` | First at-scale use of the `pm-skill-validate` -> `pm-skill-iterate` lifecycle: bring existing domain skills up to the current quality standard, creating the first `HISTORY.md` rows + version bumps for older skills. |

**Candidate (decide next session):** audit follow-up #5 - a static in-site Skill Finder + `skill-manifest.json`, and optional output schemas for a few artifact skills (PRD/hypothesis/results). Novel + worthwhile per the 2026-06-06 audit review; either folds into v2.26.0 or becomes v2.27.0.

## Sequencing + dependencies (for the spec session)

- **F-14 and F-15 are siblings** and should be specced together: F-14 authors a durable workflow file; F-15 runs an ephemeral chain. They share the "select + sequence skills, pass context between steps" core; design the shared engine once. F-15 may be able to reuse the `pm-workflow-orchestrator` (v2.24.0) execution path; F-14 produces a file the orchestrator can later run. Confirm the boundary with the orchestrator so they compose rather than duplicate.
- **F-12 is independent** but has a prerequisite: **M-13 (Convention Alignment)** should pass first so all skills clear the structural tier before the quality (Tier 2) sweep. F-12 also exercises `pm-skill-validate`/`pm-skill-iterate` at scale - confirm those tools are current.
- **Brief staleness to fix at spec time:** the F-12 brief predates the current catalog (it references "25 domain skills" and the "v2.8 standard"); re-scope it to the current 65-skill catalog and the current validator tiers when writing its spec.

## How each item becomes shipped (the standard pipeline)

For each of F-12 / F-14 / F-15, the next session produces:
1. **Spec** at `docs/internal/release-plans/v2.26.0/spec_<slug>.md` (or per-item) - problem, design, interface, acceptance, open questions resolved.
2. **Implementation plan** at `docs/internal/release-plans/v2.26.0/implementation-plan_<slug>.md` - task-by-task, test-first where the repo convention applies.
3. **GitHub issue reconciliation** - #133/#134/#135 already exist; set the milestone to v2.26.0 and confirm Type + Agent labels.
4. Then build -> the standard ship pipeline (per-skill `HISTORY.md`, CHANGELOG, release notes) under the 6-gate runbook.

## Gate ledger (later, at cut time)

- [ ] G0 Pre-tag readiness  - [ ] G1 Adversarial review  - [ ] G2 Version bump + CHANGELOG  - [ ] G2.5 Commit + re-verify  - [ ] G3 Tag + push  - [ ] G4 Post-tag hygiene

## Notes

- This is a scope-staging plan only. Do not bump versions or author skill files from this document; the specs come first. Open the spec work via the continuation prompt in the accompanying session log.
