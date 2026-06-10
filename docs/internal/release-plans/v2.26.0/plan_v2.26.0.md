# v2.26.0 Release Plan: Authoring + quality layer (workflow builder, ad-hoc chaining, skill-quality convergence)

**Status:** BUILT, tag pending (2026-06-10). The build executed in plan order and is merged to main: WS-A1 (#187), WS-A2 (#188), WS-A3 (#189), F-12 Batch 0 (#190), F-14+F-15 (#191, closes #133 + #134), F-12 Batch 1 (#192). Catalog on main: 66 skills / 5 sub-agents / 11 commands / 12 workflows. Outstanding before the tag: the Task 9 native-path smoke gate (P-G; must RUN and be RECORDED on an installed plugin; could not run in the build session, see the F-14/F-15 implementation plan's Task 9 note) and the 6-gate runbook itself. WS-A4 (skills-ref lane, agent:codex) deliberately remains open in-window or as early v2.26.x; WS-A5 is with the maintainer.
**Owner:** Maintainers
**Type:** **MINOR** (additive: F-14 adds the `utility-pm-workflow-builder` skill, catalog 65 -> 66; F-15 adds the `/chain` command and a 1.1.0 bump of the orchestrator dispatch skill; F-12 is a quality pass with per-skill bumps and no new skills.)
**Theme:** Close the authoring + quality gap. After v2.25.x hardened the release gate and activation layer, v2.26.0 turns to the contributor/user authoring experience (build workflows, chain skills ad hoc) and a deliberate quality-convergence pass over the existing catalog, folding in the 2026-06-09 repo audit's triggering-surface and front-door fixes.
**Created:** 2026-06-10 | **Updated:** 2026-06-10 R3 (specs written; audit intake added; Codex adversarial review loop applied: CR-1..CR-7 fixed in R1, CR-8 in R2, CR-9 in R3; dispositions and convergence trace in the review record)
**Companion docs (this directory):** [`spec_workflow-builder-and-chaining.md`](spec_workflow-builder-and-chaining.md) + [`implementation-plan_workflow-builder-and-chaining.md`](implementation-plan_workflow-builder-and-chaining.md) | [`spec_skill-quality-convergence.md`](spec_skill-quality-convergence.md) + [`implementation-plan_skill-quality-convergence.md`](implementation-plan_skill-quality-convergence.md) | review record [`review_2026-06-10_codex-adversarial.md`](review_2026-06-10_codex-adversarial.md). Effort briefs under `docs/internal/efforts/` now carry staleness banners pointing here. GitHub issues #133 / #134 / #135.

---

## Why this scope, why now

The v2.25.x line (manifest + parity gate, activation hooks, audit closure) finished the release-gate and trust work. The next-largest backlog gaps are all authoring/quality, and three have effort briefs: a workflow builder (#133), ad-hoc skill chaining (#134), and a skill-quality convergence pass (#135). They cohere as one minor: two new authoring surfaces plus a quality sweep of what already exists.

Two inputs sharpened the scope since staging:

1. **The F-15 discovery:** `pm-workflow-orchestrator` Mode B (v2.24.0) already implements the ad-hoc chain runtime the F-15 brief proposed to build. F-15 is therefore specced as Mode B productization (a `/chain` front door, a written chain-expression contract, a promotion path into F-14) with NO new engine and NO new skill. F-14 and F-15 share that contract; the specs are joint.
2. **The 2026-06-09 repo audit (Claude/Fable):** an independent full-repo audit verified the catalog is structurally clean but found (a) five description collision pairs plus one phantom skill reference on the always-loaded trigger surface, (b) the docs-site landing page stale in source inside its count-exempt blocks (Foundation 8 vs 9, Utility 10 vs 11, cards summing 63 under a 65 headline, release table ending at v2.22.0), (c) stale paths in AGENTS.md/QUICKSTART invisible to the link gate (code spans and absolute URLs), and (d) no spec-validator or trigger-accuracy coverage in CI (issue #97 open since January). Items (a) land as F-12 Batch 0; (b)+(c) land as workstream WS-A below; (d) splits into WS-A4 (spec validator, in-window) and a deferred v2.27.0 candidate (trigger evals).

## Scope - what v2.26.0 ships

| Item | Issue | Spec / plan | One-line intent | Vehicle |
|---|---|---|---|---|
| **F-14 Workflow Builder** (`utility-pm-workflow-builder`) | #133 | [`spec_workflow-builder-and-chaining.md`](spec_workflow-builder-and-chaining.md) | Guided authoring from "I want a workflow for X" (or a promoted chain) to a staged Workflow Implementation Packet: draft `_workflows/` file, draft command, cross-cutting checklist. Catalog 65 -> 66 | v2.26.0 |
| **F-15 Ad-Hoc Skill Chaining** (`/chain`) | #134 | same joint spec | Terse front door to orchestrator Mode B: chain expression grammar in PARSE-CONTRACT, `--thread`, promotion suggestion, native-path smoke gate. No new skill, no new engine | v2.26.0 |
| **F-12 Skill Quality Convergence** | #135 | [`spec_skill-quality-convergence.md`](spec_skill-quality-convergence.md) | 26-skill cohort (re-scoped from the stale brief). Batch 0: description integrity (audit collision pairs, phantom ref, dispatch trims) + scar hygiene + scar-guard scope extension. Batch 1: Deliver-cohort convergence via validate -> iterate | Batch 0 + Batch 1 in v2.26.0; Batches 2-4 as v2.26.x patches |

## Workstream WS-A: 2026-06-09 audit maintenance (ship-first; plan rows, not new effort briefs)

Small, independent fixes from the audit; each can land as its own PR ahead of the feature branches. Sized S unless noted; agent labels per the assignment framework.

| ID | Work | Detail | Agent |
|---|---|---|---|
| WS-A1 | De-rot the landing page | `site/src/content/docs/index.mdx`: Foundation card 8 -> 9 and Utility card 10 -> 11 (cards then sum 65); add `foundation-prioritized-action-plan` and `utility-pm-workflow-orchestrator` to the prose family lists (lines ~178-180); refresh the Recent Releases table through v2.25.2. Then shrink the `count-exempt` spans (or add a per-card check) so the class cannot recur silently; the audit showed the exemption markers carve exactly the rotted blocks out of `check-landing-page-counts` | claude |
| WS-A2 | Entry docs refresh | AGENTS.md: repair 7 stale doc references (5 code-span `docs/reference|guides|concepts/...` paths at lines 56/326/377 + 2 dead absolute GitHub URLs at lines 468/474) by converting them to live links (alias-form `docs/<tail>` relative links resolve via the Pattern S alias in `check-root-doc-links`, putting them under the existing enforcing gate). QUICKSTART.md: marketplace-first install rewrite + fix `docs/getting-started/index.md` and `docs/guides/pm-skill-lifecycle.md` references | claude |
| WS-A3 | Code-span link blind spot | Sweep remaining backtick code-span doc paths in root docs into real markdown links (the enforcing gate only resolves links); fix the stale `scripts/check-workflow-generator-coverage.md` doc header (still cites retired `generate-workflow-pages.py` + `docs/workflows/`) | codex |
| WS-A4 | Spec-validator CI lane (closes #97) | Normalize skill `metadata` typing toward the agentskills.io string-map rule (quote `updated` dates; test how `skills-ref validate` treats the arrays before deciding to stringify or document a conscious deviation), then wire `skills-ref validate` over `skills/*` as an advisory CI step; promote to enforcing once green. M-sized | codex |
| WS-A5 | Community touch | Reply to #148 (submit to awesome-codex-plugins: free distribution), triage #149 and #127 into accept/defer | human |

Audit items NOT here because they live elsewhere: description collisions + phantom ref + dispatch trims + skills/ scar sweep = F-12 Batch 0; the orchestrator description rewrite = F-15 (spec 1.4); trigger-accuracy evals = deferred below.

## Sequencing + dependencies

1. **WS-A1..A3** - DONE (#187, #188, #189; A1 preceded the F-14 count sweep as required).
2. **F-12 Batch 0** - DONE (#190; orchestrator excluded by design).
3. **F-14 + F-15** - DONE (#191, one squash PR, closes #133 + #134). The native-path smoke test (release EVIDENCE gate, decision P-G) could NOT run in the build session and is scheduled against main BEFORE the tag; see the implementation plan's Task 9 status note and the compatibility matrix.
4. **F-12 Batch 1** (Deliver cohort) - DONE (#192).
5. **WS-A4** - OPEN (agent:codex; any time inside the window or early v2.26.x; advisory first).
6. **Tag v2.26.0** via the 6-gate runbook (`site/src/content/docs/contributing/release-runbook.md`); catalog claims at tag time: 66 skills (30 phase + 9 foundation + 12 utility + 15 tool), 5 sub-agents, 11 command files, 12 workflows. BLOCKED only on the Task 9 smoke run + the runbook itself.
7. **Post-tag:** F-12 Batches 2-4 ride v2.26.x patches; deferred items go to v2.27.0 planning.

Prerequisite notes: M-13 (Convention Alignment) is Complete (2026-04-04) and continuously enforced by CI since; F-12's prerequisite is satisfied (spec section 0). The F-12 brief's "25 domain skills / v2.8 standard" framing is superseded by the spec's 26-skill cohort.

## Decisions (this spec session, lettered for review)

| # | Decision | Where detailed |
|---|---|---|
| P-A | F-14 + F-15 specced JOINTLY; the "shared engine" is a shared chain-expression CONTRACT (PARSE-CONTRACT.md section), not new code | joint spec 0.1-0.2 |
| P-B | F-15 ships NO new skill and NO new engine: `/chain` command + Mode B contract + promotion path (rejects the brief's chain-skill and MCP options) | joint spec D-A |
| P-C | Builder named `utility-pm-workflow-builder` (not the brief's `utility-workflow-builder`) | joint spec D-B |
| P-D | F-12 splits: Batch 0 + Batch 1 inside v2.26.0; Batches 2-4 as v2.26.x patches (the minor never blocks on the long sweep) | F-12 spec D-4 |
| P-E | Audit follow-up #5 (static Skill Finder + skill-manifest.json + output schemas) DEFERRED to v2.27.0 | deferred section below |
| P-F | Audit quick wins enter as WS-A plan rows, not new F-XX effort docs (no-effort-doc-bloat convention) | WS-A above |
| P-G | The v2.24.0 orchestrator native-path smoke test becomes a v2.26.0 release EVIDENCE gate: it must RUN and be RECORDED before the tag; a recorded FAIL keeps the EXPERIMENTAL label and is disclosed in release notes rather than blocking the ship (only an unrun test blocks). Natural moment: `/chain` rides that path. (Reworded R1 per review CR-6; the earlier "acceptance gate" phrasing contradicted the ship-anyway posture in the implementation plan) | joint spec D-D |

## Deferred - v2.27.0 candidates (recorded, not committed)

- **Derived-surfaces theme:** static in-site Skill Finder + `skill-manifest.json` + optional output schemas (audit follow-up #5) PLUS generating the AGENTS.md catalog section and landing cards from the resource index (#87, open since January). Both are "derive the surface from a manifest instead of hand-syncing it"; together they would structurally kill the drift class behind WS-A1/A2. Natural v2.27.0 theme.
- **Trigger-accuracy eval harness** (2026-06-09 audit strategic item): per-skill positive/negative prompt fixtures scored offline, advisory lane like M-30, promoted per-invariant. Sequenced AFTER F-12 Batch 0 so it tests the corrected corpus. Complements, does not replace, the manual Batch 0 fixes.
- **F-12 "When NOT to Use" for non-cohort skills** if Batch 1 proves high-value.

## How each item ships (standard pipeline)

1. Spec (written, this directory) -> 2. Implementation plan (written, this directory) -> 3. Issue reconciliation (#133/#134/#135: milestone v2.26.0, Type + Agent labels, spec links) -> 4. Build per plan task order -> 5. The 6-gate runbook cuts the tag (per-skill HISTORY.md, CHANGELOG, release notes with pinned `slug:`).

## Gate ledger (at cut time)

- [ ] G0 Pre-tag readiness  - [ ] G1 Adversarial review  - [ ] G2 Version bump + CHANGELOG  - [ ] G2.5 Commit + re-verify  - [ ] G3 Tag + push  - [ ] G4 Post-tag hygiene

## Notes

- This plan is the scope + sequencing authority for v2.26.0; the specs are the design authority; the implementation plans are the build authority. Review in that order.
- Build starts only after maintainer review of the four companion docs (the session that wrote them stopped for review by design).
- The 2026-06-09 audit report itself lives in a gitignored working area; everything actionable from it is restated above or in the F-12 spec, so no doc here depends on a gitignored path.
