# v2.25.2 Release Plan: Maintenance patch (bank post-v2.25.1 accumulation)

**Status:** SHIPPED 2026-06-10 (tag `v2.25.2` at `f7f3622`; GitHub Release Latest; squash-merged PR #184; Validation + Validate Plugin Packaging green on main + tag; the `codex:adversarial-review` findings were resolved in #183; Pages deploy + CodeQL re-run past a transient GitHub API 401 incident that hit both the runner `GITHUB_TOKEN` and the local gh CLI). No new skills (catalog 65/5).
**Owner:** Maintainers
**Type:** **PATCH** (maintenance only: no consumable-surface change; catalog stays 30 phase + 9 foundation + 11 utility + 15 tool = 65 skills and 5 sub-agents; the sole version bump banks accumulated maintenance, not a capability delta).
**Theme:** Bank the maintenance accumulated since v2.25.1 (the final Codex-audit follow-ups) under one versioned GitHub Release. No new skills, no behavior change.
**Created:** 2026-06-09
**Updated:** 2026-06-10

---

## Where we are

Since `v2.25.1` (`2b5044a`, 2026-06-06) `main` has accumulated maintenance across several commits, all merged and CI-green, deliberately shipped untagged per the repo's "SemVer tracks compatibility, not significance" rule (maintenance is banked, not tagged per change): the Codex audit P1 follow-ups (#178), the Spec A validator manifest (#180), audit tracking plus post-tag hygiene (#176/#177, internal-docs only), and a release-gate hygiene batch (scar-guard promotion, the `CLAUDE.md` correction, `_unreleased/` archival, and Dependabot triage). The user/contributor-facing items are drafted in CHANGELOG `[Unreleased]`.

This banks the closure of **every actionable 2026-06-06 Codex audit item**: P0-01, P0-02/Spec A, P1-01..P1-03, and follow-up #4 (the `CLAUDE.md` gitignored-claim correction). Only follow-up #5 remains, and it is a v2.26.0 feature candidate (static Skill Finder + output schemas), not a correction.

When cut, G2 (via `pm-changelog-curator`) confirms `[Unreleased]` is complete, then moves the whole body to a `## [2.25.2] - <date>` section and opens a fresh empty `[Unreleased]`.

## Scope - what v2.25.2 banks (commits since v2.25.1)

| Area | Commit | Supporting spec | In `[Unreleased]`? |
|---|---|---|---|
| Validator-inventory manifest + parity referee (audit Spec A / P0-02) | `faf1ec3` (#180) | `docs/internal/release-plans/_unreleased/validator-manifest.md` | Yes (Added + Changed + Fixed) |
| Codex audit P1 follow-ups: `check-root-doc-links` source-surface scan (P1-01), `validate-skill-history` reads `metadata.version` (P1-03), agent + runbook path repoints (P1-02) | `727bbbc` (#178) | `docs/internal/audit/2026-06-06_codex_review.md` (follow-up list) | Yes (Changed + Fixed) |
| Codex audit now tracked: inline `🔵 CLAUDE` annotations + companion review doc | `20af801` (#177) | the audit + review docs themselves | n/a (internal docs only) |
| v2.25.1 post-tag hygiene: plan + CONTEXT flips to SHIPPED | `50f564d` (#176) | `docs/internal/release-plans/v2.25.1/plan_v2.25.1.md` | n/a (internal docs only) |
| Release-gate hygiene: `check-emdash-scars` promoted to enforcing + inline-code-aware; `CLAUDE.md` gitignored-claim correction (audit follow-up #4); `resource-index/` spec archived from `_unreleased/` to `v2.25.1/`; Dependabot triage (#152 closed stale, #179 held for family-version coordination) | `8067beb` (#182) | the audit review + this plan | Yes (Changed + Fixed) |
| Codex adversarial-review fixes: per-leg CI parity in the referee (P1), multi-backtick scar handling (P2), G0 wording correction (P2) | `1078095` (#183) | the `codex:adversarial-review` findings | Yes (refined Added/Changed) |
| Release-prep: version + CHANGELOG + release notes + CONTEXT markers; a missing-slug fix on `Release_v2.25.2.md` (caught only by the CI rendered-links check) | `f7f3622` (#184) | this plan | n/a (release surfaces) |

## Release surfaces (G2)

- `CHANGELOG.md`: confirm `[Unreleased]` complete, then move to `## [2.25.2] - <date>`; add a fresh empty `[Unreleased]`.
- `site/src/content/docs/changelog.md`: add a curated one-paragraph `[2.25.2]` entry (a summary that links out, NOT a 1:1 mirror).
- `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.codex-plugin/plugin.json`: bump `version` 2.25.1 -> 2.25.2.
- `README.md`: version badge + What's New + Current version row.
- `_agent-context/claude/CONTEXT.md` + `_agent-context/codex/CONTEXT.md`: currency markers to v2.25.2 (gated by `check-context-currency`).
- `site/src/content/docs/releases/Release_v2.25.2.md` (site path post-Pattern-S) + the releases `index.md`.
- This plan status -> SHIPPED at G4; move the fed `_unreleased/` specs into this folder.

## Gate ledger (to run at cut time)

- [x] G0 Pre-tag readiness (pre-tag bundle ALL CHECKS PASSED; counts re-derived 65/5; cross-cutting audit 0 P0; catalog unchanged since the clean v2.25.1 audit, only 2 agent-doc path repoints)
- [x] G1 Adversarial review attestation (a Codex adversarial review of `v2.25.1..HEAD` ran 2026-06-10 via `codex:adversarial-review`; 1 P1 + 2 P2, all resolved in #183: per-leg CI parity in the referee, multi-backtick scar handling, and the G0 wording correction; referee + scar guard carry 15 + 10 unit tests)
- [x] G2 Version bump + CHANGELOG move (2.25.1 -> 2.25.2 across all manifests + README + both CONTEXT markers; CHANGELOG moved to [2.25.2] - 2026-06-10; release notes + site mirror added; version-consistency + context-currency PASS; leak check clean)
- [x] G2.5 Commit release-prep + PR #184 + CI green both OS legs (CI caught a missing release-notes `slug` the local bundle could not see, since the bundle never builds the site; fixed + re-verified with a local build); squash-merged to main `f7f3622`
- [x] G3 Annotated tag `v2.25.2` on `f7f3622` (the post-squash-merge SHA, per D22) + pushed; tag CI green (Release + Validate Plugin Packaging)
- [x] G4 Post-tag hygiene (GitHub Release Latest published; Pages deploy + CodeQL re-run past a transient GitHub API 401 incident; this plan flipped to SHIPPED; `agent-plugins` registry re-pin tracked as a follow-up; v2.26.0 next-cycle plan created)

## Notes

- The runbook-path drift the v2.25.1 plan flagged for "later" (conductor + auditor + runbook citing the pre-Pattern-S `docs/{contributing,releases}/` paths) is **resolved** in this batch by #178 (P1-02). The release runbook the conductor reads now points at the live `site/src/content/docs/...` paths.
- SHIPPED via the 6-gate runbook embodied inline (auditor at G0 + the CHANGELOG move at G2 done inline, since the plugin sub-agents were not dispatchable in this environment). The one G2.5 CI failure (a missing `slug` on the release-notes page) is the recurring lesson that `validation.yml` is a superset of the local pre-tag bundle: the broken route only existed post-build, which only CI checks.
- Follow-up: `agent-plugins` registry re-pin to v2.25.2 (the marketplace listing); not blocking, the install path is git-tag-based.
