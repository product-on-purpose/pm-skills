# v2.25.2 Release Plan: Maintenance patch (bank post-v2.25.1 accumulation)

**Status:** PLANNED (pre-staged 2026-06-09; NOT yet cut). Banked work is merged and CI-green on `main`; this plan is ready to run through the release runbook on command. Cut trigger: when more maintenance accumulates, or on request.
**Owner:** Maintainers
**Type:** **PATCH** (maintenance only: no consumable-surface change; catalog stays 30 phase + 9 foundation + 11 utility + 15 tool = 65 skills and 5 sub-agents; the sole version bump banks accumulated maintenance, not a capability delta).
**Theme:** Bank the maintenance accumulated since v2.25.1 (the final Codex-audit follow-ups) under one versioned GitHub Release. No new skills, no behavior change.
**Created:** 2026-06-09
**Updated:** 2026-06-09

---

## Where we are

Since `v2.25.1` (`2b5044a`, 2026-06-06) `main` has accumulated four commits, all merged and CI-green, deliberately shipped untagged per the repo's "SemVer tracks compatibility, not significance" rule (maintenance is banked, not tagged per change). Two are user/contributor-facing tooling changes (already drafted in CHANGELOG `[Unreleased]`); two are internal-docs-only and carry no CHANGELOG entry by convention.

This batch closes the **last of the 2026-06-06 Codex audit follow-ups** (Spec A / P0-02). With it, every audit finding (P0-01, P0-02, P1-01..P1-03) is resolved.

When cut, G2 (via `pm-changelog-curator`) confirms `[Unreleased]` is complete, then moves the whole body to a `## [2.25.2] - <date>` section and opens a fresh empty `[Unreleased]`.

## Scope - what v2.25.2 banks (commits since v2.25.1)

| Area | Commit | Supporting spec | In `[Unreleased]`? |
|---|---|---|---|
| Validator-inventory manifest + parity referee (audit Spec A / P0-02) | `faf1ec3` (#180) | `docs/internal/release-plans/_unreleased/validator-manifest.md` | Yes (Added + Changed + Fixed) |
| Codex audit P1 follow-ups: `check-root-doc-links` source-surface scan (P1-01), `validate-skill-history` reads `metadata.version` (P1-03), agent + runbook path repoints (P1-02) | `727bbbc` (#178) | `docs/internal/audit/2026-06-06_codex_review.md` (follow-up list) | Yes (Changed + Fixed) |
| Codex audit now tracked: inline `🔵 CLAUDE` annotations + companion review doc | `20af801` (#177) | the audit + review docs themselves | n/a (internal docs only) |
| v2.25.1 post-tag hygiene: plan + CONTEXT flips to SHIPPED | `50f564d` (#176) | `docs/internal/release-plans/v2.25.1/plan_v2.25.1.md` | n/a (internal docs only) |

## Release surfaces (G2)

- `CHANGELOG.md`: confirm `[Unreleased]` complete, then move to `## [2.25.2] - <date>`; add a fresh empty `[Unreleased]`.
- `site/src/content/docs/changelog.md`: add a curated one-paragraph `[2.25.2]` entry (a summary that links out, NOT a 1:1 mirror).
- `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.codex-plugin/plugin.json`: bump `version` 2.25.1 -> 2.25.2.
- `README.md`: version badge + What's New + Current version row.
- `_agent-context/claude/CONTEXT.md` + `_agent-context/codex/CONTEXT.md`: currency markers to v2.25.2 (gated by `check-context-currency`).
- `site/src/content/docs/releases/Release_v2.25.2.md` (site path post-Pattern-S) + the releases `index.md`.
- This plan status -> SHIPPED at G4; move the fed `_unreleased/` specs into this folder.

## Gate ledger (to run at cut time)

- [ ] G0 Pre-tag readiness (the pre-tag bundle is now manifest-checked by `check-validator-parity.mjs`; counters unchanged at 65/5; governance audit 0 P0)
- [ ] G1 Adversarial review attestation (maintenance patch of already-merged, already-CI-green work; the Spec A change carried its own 11-test referee + green PR #180)
- [ ] G2 Version bump + CHANGELOG move (curator; leak check; version-consistency + context-currency PASS)
- [ ] G2.5 Commit release-prep + PR + CI green both OS legs + CodeQL; squash-merge to main
- [ ] G3 Annotated tag `v2.25.2` on the post-squash-merge main SHA + push
- [ ] G4 Post-tag hygiene (GitHub Release Latest; `agent-plugins` registry re-pin; Pages deploy; flip this plan to SHIPPED)

## Notes

- The runbook-path drift the v2.25.1 plan flagged for "later" (conductor + auditor + runbook citing the pre-Pattern-S `docs/{contributing,releases}/` paths) is **resolved** in this batch by #178 (P1-02). The release runbook the conductor reads now points at the live `site/src/content/docs/...` paths.
- This is a pre-stage: do not bump versions or tag until the cut is requested. Keep banking additional maintenance into `[Unreleased]` until then; add rows here as commits land.
