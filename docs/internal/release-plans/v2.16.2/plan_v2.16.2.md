# v2.16.2 Release Plan: Post-v2.16.1 Audit Hygiene Fast-Patch

**Status**: ACTIVE (scoped 2026-05-19; ready to execute)
**Owner**: Maintainers
**Type**: Patch release (post-v2.16.1 hygiene; closes 2 P1 + 1 P2 from v2.16.1 G4 P0 audit)
**Created**: 2026-05-19
**Updated**: 2026-05-19

---

## Release Theme

The v2.16.1 G4 P0 dispatch-skill verification step ran the pm-skill-auditor against shipped v2.16.1 state. The auditor PASSED (cross-client dispatch confirmed working), but also surfaced 6 new findings on the shipped artifact itself. Three of those are quick housekeeping fixes that should have been part of the v2.16.1 G4 P2 post-tag pass but were missed. v2.16.2 closes them.

This is the same pattern as v2.14.1 + v2.14.2 + v2.13.1 (fast-patch for hygiene that should have happened post-tag but did not).

**Scope is exactly 3 fixes + their release artifacts.** No skill content changes. No structural changes. Same 59-skill catalog.

---

## Context

The v2.16.1 G4 P0 attestation completed 2026-05-19 with all 3 scenarios PASSING. The third scenario (dispatch skill execution via `/pm-skills:pm-audit-repo`) invoked the pm-skill-auditor which then produced a structured findings report on v2.16.1's shipped state. Findings classification:

| ID | Sev | Finding |
|---|---|---|
| F-P0-01 | P0 | Validator suite not invocable from install-cache on macOS bash 3.2 (mapfile/declare -A; non-git working tree fallback) |
| F-P1-01 | P1 | README badge stuck at v2.16.0 (should be v2.16.1) |
| F-P1-02 | P1 | `AGENTS/claude/CONTEXT.md` Status block still says "v2.16.0 SHIPPED"; no v2.16.1 addendum |
| F-P2-01 | P2 | `check-version-references.sh` + `check-context-currency.sh` exist but not wired into pre-tag-validate bundle (had they been, F-P1-01 + F-P1-02 would have been caught pre-v2.16.1-tag) |
| F-P2-02 | P2 | `AGENTS/claude/CONTEXT.md` Notes section has v2.13.0-era counts (40 skills / 9 workflows; stale 5 releases) |
| F-P2-03 | P2 | "27 truly enforcing validators" count in CONTEXT.md doesn't match re-derivable (14 in pre-tag bundle; ~28 .sh in scripts/) |

**v2.16.2 closes F-P1-01 + F-P1-02 + F-P2-01.** These three are the fastest fixes AND F-P2-01's fix prevents F-P1-01 + F-P1-02 from recurring.

**v2.17.0 will address F-P0-01** (validator portability is a multi-validator rewrite; 1-2 days; secondary to the v2.17.0 PRIMARY work of frontmatter sweep + AGENTS rename per the v2.17.0 plan).

**v2.17.0 doc-refresh covers F-P2-02 + F-P2-03** (these are CONTEXT.md content-level updates that pair naturally with the v2.17 AGENTS rename which already touches CONTEXT.md).

---

## Scope

### Primary work items (committed to v2.16.2)

| ID | Item | Effort |
|---|---|---|
| W1 | Update README badge from `version-2.16.0` to `version-2.16.1` | 5 min |
| W2 | Refresh `AGENTS/claude/CONTEXT.md` Status block with v2.16.1 paragraph | 15 min |
| W3 | Wire `scripts/check-version-references.{sh,ps1}` + `scripts/check-context-currency.{sh,ps1}` into `scripts/pre-tag-validate.{sh,ps1}` bundle | 30 min |
| W4 | Release artifacts: plugin.json + marketplace.json version bumps + CHANGELOG.md entry + docs/releases/Release_v2.16.2.md | 30 min |

**Total v2.16.2 effort: 1-2 hours.** Same-day ship from start.

### Out of scope for v2.16.2 (deferrals)

- F-P0-01 validator portability rewrite (multi-validator + design choice; defer to v2.17.0 as W3 secondary)
- F-P2-02 CONTEXT.md Notes section refresh (paired with v2.17.0 AGENTS rename)
- F-P2-03 enforcing-validator count framing (paired with v2.17.0 CI hardening)
- All other roadmap deferrals stay deferred

---

## Decisions

| # | Decision | Answer | Rationale |
|---|---|---|---|
| D1 | Release type | v2.16.2 (patch) | Pure housekeeping; no skill content changes; same 59-skill catalog. |
| D2 | Bundle scope | 3 fixes (W1 + W2 + W3) co-shipped | All three are post-v2.16.1 housekeeping. W3 (wire validators) prevents W1 + W2 defect classes from recurring. |
| D3 | F-P0-01 disposition | DEFER to v2.17.0 W3 | Validator portability rewrite is a multi-validator multi-day effort. Bundling into a patch release violates patch-release scope discipline. |
| D4 | F-P2-02 + F-P2-03 disposition | DEFER to v2.17.0 doc-refresh | CONTEXT.md Notes section refresh pairs with v2.17.0 AGENTS rename which already touches CONTEXT.md. |
| D5 | Adversarial review | Waive for 3-fix housekeeping patch | Scope is mechanical (1 badge fix + 10-line doc edit + 4 validator wires). G1 maintainer attestation. |
| D6 | Validator strategy | NEW: run the pre-tag bundle WITH the 2 newly-wired validators to verify they catch real drift | W3's own enforcement is what closes the loop: the bundle should now flag if the README badge or CONTEXT.md Status block drift. |
| D7 | Branch | Direct on main (matches v2.16.x precedent) | Patch is minimal. |
| D8 | Tag SHA discipline | Per D22: tag points at G2.5-captured SHA only | Honor the load-bearing invariant. |
| D9 | v2.16.2 entrance criteria | v2.16.1 G4 P0 attestation FULL PASS confirmed | Already met as of 2026-05-19. |

---

## Deliverables

### W1: README badge update

| File | Change |
|---|---|
| `README.md` line 24 | `version-2.16.0` to `version-2.16.1` in the badge URL |

### W2: CONTEXT.md Status refresh

| File | Change |
|---|---|
| `AGENTS/claude/CONTEXT.md` line 5 (Status block) | Add v2.16.1 patch paragraph: "v2.16.1 SHIPPED 2026-05-19 - manifest schema patch (removes invalid `agents` field; full G4 P0 attestation PASS 2026-05-19 confirmed via cross-platform Claude Code install + dispatch-skill execution; native sub-agent registration deferred to v2.17.0)" |
| `AGENTS/claude/CONTEXT.md` line 37 (Last Updated) | Refresh date + version state |

### W3: Wire 2 preventive validators into pre-tag bundle

| File | Change |
|---|---|
| `scripts/pre-tag-validate.sh` | Add `check-version-references.sh` + `check-context-currency.sh` to the validators array (per existing convention) |
| `scripts/pre-tag-validate.ps1` | PowerShell parity: add same 2 validators |
| `scripts/pre-tag-validate.md` | Documentation triplet: list the now-16 enforced validators (was 14) |

### W4: Release artifacts

| File | Change |
|---|---|
| `.claude-plugin/plugin.json` | Version 2.16.1 to 2.16.2; description refresh (forward-compatible phrasing per v2.16.1 G1 review Note: avoid "v2.16.0 introduces" pattern, use "Recent: ..." or similar) |
| `.claude-plugin/marketplace.json` | Plugin version + description refresh |
| `CHANGELOG.md` | New `## [2.16.2] - YYYY-MM-DD` entry: Fixed (3 items) + Not changed sections |
| `docs/releases/Release_v2.16.2.md` | New release notes (~80-100 lines): TL;DR + what's fixed + why-it-matters + what does NOT change + affected files |

---

## Pre-release checklist (6-gate runbook)

Walk the 6-gate runbook via `/pm-release v2.16.2` (now natively dispatchable since v2.16.1 G4 P0 verified the dispatch pattern works).

### G0: Pre-tag readiness

- [ ] Working tree clean
- [ ] `scripts/pre-tag-validate.{sh,ps1}` PASS (now includes 16 validators after W3) - **and the 2 newly-wired validators should PASS only after W1 + W2 land**
- [ ] Em-dash sweep PASS
- [ ] Aggregate counters unchanged from v2.16.1 (59 skills + 4 sub-agents + 12 workflows + 66 commands)
- [ ] Cross-cutting audit via `/pm-skills:pm-audit-repo` (dispatch-skill verified working in v2.16.1 G4) - run; expect zero P0; F-P0-01 carries forward as KNOWN to v2.17.0
- [ ] Master plan READY TO TAG state
- [ ] Release notes drafted

### G1: Adversarial review

- [ ] Maintainer attests: 3-fix housekeeping scope does not warrant full adversarial review cycle; documented in Decisions table D5

### G2: Version bump + CHANGELOG prep

- [ ] plugin.json version 2.16.1 to 2.16.2 + forward-compatible description refresh
- [ ] marketplace.json same
- [ ] CHANGELOG.md v2.16.2 entry
- [ ] Release notes complete
- [ ] Hidden-comment leak check

### G2.5: Commit release-prep + re-verify

- [ ] Stage release-prep files
- [ ] Commit `chore(v2.16.2): post-v2.16.1 audit hygiene + validator bundle expansion`
- [ ] Re-run G0 validator bundle (now 16-validator) against new HEAD
- [ ] Push to origin/main
- [ ] Verify CI green
- [ ] Capture commit SHA (the only SHA G3 may tag)

### G3: Tag + push

- [ ] Per D22, verify tag target SHA = G2.5 captured SHA
- [ ] Annotated tag message drafted
- [ ] `git tag -a v2.16.2 -m <message> <G2.5-SHA>`
- [ ] `git push origin v2.16.2` after explicit ship-it confirmation

### G4: Post-tag hygiene

- [ ] Plugin install path smoke test on Claude Code (P0): `/plugin update pm-skills` reports v2.16.2; dispatch slash commands resolve
- [ ] GitHub Release UI body authored with rich content (P2)
- [ ] v2.16.1 G4 audit findings F-P0-01, F-P2-02, F-P2-03 carried forward to v2.17.0 plan if not already (P2)

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Newly-wired validators fail against current state (CONTEXT.md drift, README badge drift) | High | Low | Expected; these validators are what catches the F-P1 findings. W1 + W2 are the fixes that make them PASS. Sequence: apply W1 + W2 first, then run W3 and verify PASS. |
| Forward-compatible description phrasing introduces new linting violation | Low | Low | Validate description against current frontmatter linter before commit; spot-check |
| Doc-stack build fails on new validators wiring | Low | Low | Validators run pre-tag; doc-stack is separate. No coupling. |
| F-P0-01 (validator portability) recurs in v2.16.2 itself | Medium | Low | Acceptable for a patch release; same bash-3.2 limitation applies. v2.16.2 doesn't claim to fix F-P0-01. |

---

## Status block

- **Status:** ACTIVE (ready to execute; entrance criteria met)
- **Pre-execution HEAD reference:** `126bfa4` (post-planning-docs commit; current main as of 2026-05-19)
- **Expected G2.5 commit SHA:** TBD
- **Expected tag SHA:** equals G2.5 commit SHA per D22

---

## Cross-references

- v2.16.1 plan (predecessor; audit source): [`../v2.16.1/plan_v2.16.1.md`](../v2.16.1/plan_v2.16.1.md)
- v2.17.0 plan (next cycle; carries F-P0-01 + F-P2-02 + F-P2-03): [`../v2.17.0/plan_v2.17.0.md`](../v2.17.0/plan_v2.17.0.md)
- Strategic roadmap: [`../../_working/roadmap_opus-4.7-max_2026-05-14.md`](../../_working/roadmap_opus-4.7-max_2026-05-14.md)
- Roadmap delta: [`../../_working/roadmap_opus-4.7-max_2026-05-14_issues-conflicts.md`](../../_working/roadmap_opus-4.7-max_2026-05-14_issues-conflicts.md)
- Release runbook (load-bearing artifact; G3 procedure): [`../../../contributing/release-runbook.md`](../../../contributing/release-runbook.md)

---

## Change log

| Date | Author | Change |
|---|---|---|
| 2026-05-19 | claude-opus-4.7 (post-v2.16.1 G4 P0 attestation session) | Initial v2.16.2 plan. Scoped from the 6-finding audit output of v2.16.1 G4 P0 Scenario 3 (`/pm-skills:pm-audit-repo` dispatch). Closes 2 P1 (README badge + CONTEXT.md Status) + 1 P2 (validator bundle expansion). Defers F-P0-01 to v2.17.0 W3 + F-P2-02/F-P2-03 to v2.17.0 doc-refresh. |
