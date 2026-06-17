# v2.27.1 Release Plan: Maintenance patch (sub-count drift gate)

**Status:** READY TO TAG (build + hygiene complete; CI verification pending push).
**Owner:** Maintainers
**Type:** **PATCH** (maintenance only: a validator extension + the doc-currency fixes it surfaced; no skill behavior change, no new skill; catalog stays 30 phase + 9 foundation + 12 utility + 15 tool = 66 skills, 5 sub-agents, 11 commands, 12 workflows).
**Theme:** Close the classification-sub-count drift class. `check-count-consistency` now polices the four frontmatter-derived skill sub-counts so a stale "10 utility skills" or "Phase Skills (30)" fails CI like a stale total - the gap that let the 26/8/6 split drift on a published page until a v2.27.0 hand audit caught it.
**Created:** 2026-06-16
**Previous:** v2.27.0 SHIPPED 2026-06-15 (the provable-quality release; tag `ee7ff9d5`).

---

## Where we are

v2.27.0 shipped the provable-quality eval program. Its doc-currency audit fixed a stale 26/8/6 classification split (it had drifted to the wrong per-classification counts on `pm-skill-anatomy.md`, the builder reference table, and the release-plans index) by hand, and recorded the root cause as a carried v2.28.0 candidate: `check-count-consistency` polices top-line totals but **skips classification sub-counts** (they were hand-maintained and exempt), so a published page can drift while CI stays green. This patch closes that gap at the source.

This is a focused maintenance PATCH (the v2.25.1 / v2.25.2 precedent), separate from the reserved v2.28.0 MINOR (the "Remember" / project-memory train).

## Scope - what v2.27.1 ships

| Candidate | Origin | Disposition |
|---|---|---|
| **check-count-consistency sub-count policing** | v2.27.0 doc-currency audit (carried in `v2.28.0` stub) | **SHIPPED here.** Both shells derive phase/foundation/utility/tool counts from frontmatter and validate the four buckets (number-before + parenthetical forms). Additive: the total-check bucket exemption is unchanged; historical mentions use word-form or `count-exempt`. Doc updated. |
| **Sub-count drift fixes (gate-surfaced)** | the new gate, run on the tree | **SHIPPED here.** `_workflows/triple-diamond.md` (25 to 30 phase); the getting-started quickstart page (65 to 66 skills, 10 to 12 utility, 10 to 11 commands); `pm-skill-anatomy.md` historical mention reworded ("then-six"). |
| **M-25 community-marketplace resubmit** | v2.27.0 best-effort | **NOT shipped here (pending-human).** The submission is an external account action and the plugin is not currently listed, so install-from-Discover docs would document non-existent state. The honest contribution is a fresh `claude plugin validate` clean record (resubmission-readiness evidence) at `records/`. Stays BEST-EFFORT; see `docs/internal/efforts/M-25-community-marketplace-submission.md`. |
| **utility-pm-critic fixture relabel** | live trigger-lane finding | **DEFERRED to v2.28.0** with a sharpened problem statement. The collision is a taxonomy decision (audit-mode vs critic), `utility-pm-critic` has no fixtures of its own, and the recall effect is only provable by a live router re-run (key burned). A blind relabel into an eval-integrity patch would violate "evidence gates over assertions." |

## Open decisions

| # | Decision | Status |
|---|---|---|
| D1 | Version is **v2.27.1 (PATCH)**, not v2.28.0 | DECIDED. SemVer tracks compatibility, not significance; tooling + docs, no skill change. v2.28.0 stays reserved for the memory MINOR. |
| D2 | **G1 codex adversarial-review is waived** for this tag | DECIDED-with-rationale. The maintainer chose "drive all the way to tagged." For a deterministic validator + docs PATCH (no skill/behavior change), the v2.27.0 "when green, push" precedent applies. Flagged, not hidden. |
| D3 | Historical sub-count mentions: word-form or `count-exempt` | DECIDED. Documented in `scripts/check-count-consistency.md`; first instance is the anatomy-page "then-six". |

## Release surfaces (G2)

- `CHANGELOG.md`: `## [2.27.1] - 2026-06-16` (Added + Fixed).
- `site/src/content/docs/changelog.md`: curated one-paragraph `[2.27.1]` mirror.
- `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.codex-plugin/plugin.json`: `version` 2.27.0 to 2.27.1.
- `README.md`: version badge + What's New details block + Current version row.
- `_agent-context/claude/CONTEXT.md` + `_agent-context/codex/CONTEXT.md`: currency markers to v2.27.1.
- `site/src/content/docs/releases/Release_v2.27.1.md` (new, with `slug:`) + releases `index.md` row.
- `docs/internal/release-plans/README.md`: index row.
- This plan to SHIPPED at G4.

## Gate ledger

- [ ] G0 Pre-tag readiness (counts re-derived 66/5; the new sub-count gate green both shells; generated-surface checks green; cross-cutting check)
- [~] G1 Adversarial review - WAIVED for this deterministic patch (D2), recorded
- [ ] G2 Version bump + CHANGELOG move + all release surfaces
- [ ] G2.5 Commit release-prep + push + CI green both OS legs
- [ ] G3 Annotated tag `v2.27.1` on the CI-green SHA + pushed; tag CI green
- [ ] G4 Post-tag hygiene (GitHub Release Latest with the rich body; this plan to SHIPPED; CONTEXT flip)

## Notes

- The new gate immediately earned its keep: run on the tree it surfaced three stale sub-counts, two of which a manual inventory had missed.
- CI is a superset of the local bundle (the recurring lesson): the bash leg runs on Linux and is the authoritative parity check for the new `check_subcounts` awk.
