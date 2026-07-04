# X-08 Zero-drift releases (unreleased spec + implementation plan)

**Status:** PARKED (pre-decision) | **Created:** 2026-07-03
**Provenance:** the 2026-07-04 deep audit (maintainer-local, gitignored), section 6b (bet X-08) and section 6c (prioritization)
**Candidate formal ID at promotion:** no new top-level ID recommended, see Promotion trigger and path; if tracked independently, a provisional M-ID confirmed against the GitHub issue list at filing
**Audit score (6c):** Bar 3 / Moat 2 / Effort(inv) 2 = 7/9

---

## Summary

**Framing first, because it changes what this document is for.** The audit names this bet as bundling several already-recommended fixes into one declared, public property: every derived surface is generated, and CI fails on a hand edit inside it. The audit also names the reason instance-hunting alone will not hold: the v2.27.1 patch and this same audit's headline P0-1 finding (the catalog count wrong and self-contradictory on the highest-trust surfaces) both happened after prior count-fix passes, proving that finding and fixing instances does not stop the class from recurring. Only removing the hand-write path does.

Every mechanism that property needs is already fully scoped elsewhere. The "Trust repair" plan ships the instance fixes plus a phrase-detection gate. The "Zero-drift releases" plan (v2.31.0, sharing this bet's name) ships the generator, the release-automation, and the release-notes dedup. This document does not re-spec any of that. It scopes only what is left once those workstreams land: the property has to be declared somewhere a stranger can read it, it has to be provable at a glance rather than re-derived from memory each release, and someone has to say, in writing, what evidence would make the claim honest rather than aspirational.

X-08 is that residual layer: a tracked inventory of every derived surface with its generation status (a tripwire registry), a small check that keeps the registry itself from becoming the next hand-maintained thing that drifts, a public site page stating the property, and a definition-of-done gate for calling it achieved.

## Relationship to existing plans (read this before the Spec)

This bet is **largely absorbed**. Nothing below restates these; each is cited by workstream ID and deliberately not touched:

| Mechanism | Where it is fully scoped | What it ships |
|---|---|---|
| Count-phrase instance fixes + a phrase-detection gate | v2.30.0 WS-T1 (count-truth + phrase gate), [`plan_v2.30.0.md`](../../v2.30.0/plan_v2.30.0.md) | `scripts/check-count-phrases.mjs`, advisory then enforcing |
| Release automation (version fan-out) | v2.31.0 WS-Z1 (release automation, M-21, issue #136), [`plan_v2.31.0.md`](../../v2.31.0/plan_v2.31.0.md) | release-please manifest mode |
| Generated README, quickstart, compat matrix, manifest descriptions | v2.31.0 WS-Z2 (generated surfaces, M-36) | `scripts/gen-derived-surfaces.mjs` |
| Release-notes dedup | v2.31.0 WS-Z3 (release-notes dedup, M-36) | one generated latest-release pointer, a generated changelog mirror, a generated releases-index row |

X-08's own scope starts only where that table ends. It has no relationship to X-07 (context-cost transparency, a different property) or the parked memory plan ([`plan_project-memory.md`](../project-memory/plan_project-memory.md), F-48 project state).

## Spec

### Scope

**In scope:**
- A tracked registry enumerating every surface the two plans above name as derived, with a generation-status column.
- A validator that keeps the registry honest against the actual repo, the meta-check.
- The public declaration, a site page, written so it never overclaims ahead of the underlying workstreams.
- A testable definition-of-done for the property itself.

**Out of scope (deferred by workstream ID, not restated here):**
- Building `check-count-phrases.mjs` (v2.30.0 WS-T1).
- release-please configuration (v2.31.0 WS-Z1).
- `gen-derived-surfaces.mjs` and any surface it generates (v2.31.0 WS-Z2).
- Release-notes, changelog, and releases-index dedup (v2.31.0 WS-Z3).
- The dual-shell validator port (v2.31.0 WS-Z4); that is a different defect class, validator duplication, not derived-surface drift.

### Requirements

| ID | Requirement |
|---|---|
| REQ-1 | A tracked registry file (`scripts/derived-surfaces-registry.yaml` or equivalent) with one row per derived surface (the `AGENTS.md` catalog block, README catalog and badges, both quickstarts, the sub-agent compatibility matrix, the three manifest descriptions, the GitHub About text, the release-notes pointer, the changelog mirror, the releases-index row), each row carrying: surface name, generating mechanism, status (`MANUAL` / `ADVISORY-GATED` / `GENERATED-CHECKED`), owning workstream ID, and the release tag it was last confirmed clean at. |
| REQ-2 | `scripts/check-surface-registry.mjs` (+ `.test.mjs`): scans the tracked tree for every `pmskills:*:start`/`:end` marker pair (the convention v2.31.0 WS-Z2 establishes) plus the existing `skills-catalog:start`/`:end` marker in `AGENTS.md`, and fails if any marker found on disk has no matching registry row, or any registry row's referenced marker no longer exists. This is the guard against the registry itself becoming the next drifted surface. |
| REQ-3 | A site page (for example `site/src/content/docs/reference/zero-drift.md`) stating the property in plain language, rendering the registry's current GENERATED-CHECKED count against its total row count, and linking to the trust and provenance page v2.31.0's WS-Z6 (trust posture) will publish. |
| REQ-4 | A written, testable definition-of-done: every core-surface row reads `GENERATED-CHECKED`; the G2 grep count-sweep returns zero live stale hits for two consecutive tagged releases; `check-surface-registry.mjs` runs enforcing. Only when all three hold does the site page (REQ-3) say the property is achieved rather than in progress. |
| REQ-5 | The registry is updated as part of each workstream's own landing PR (v2.30.0 WS-T1, v2.31.0 WS-Z1/Z2/Z3 each flip their rows), not as a separate follow-up sweep; this is written into this document, not into those already-drafted plans. |

### Interfaces

Registry row shape (illustrative):

```yaml
- surface: "README catalog tables + badges"
  mechanism: "gen-derived-surfaces.mjs"
  status: MANUAL          # flips to GENERATED-CHECKED when v2.31.0 WS-Z2 lands
  owner_workstream: "v2.31.0 WS-Z2"
  last_confirmed_clean: null
```

### Durable CI block

`check-surface-registry.mjs` is a pure Node `.mjs` check with no shell twin; per `scripts/validation-manifest.yaml`'s scope note (dual-shell pairs only), it is wired directly into `.github/workflows/validation.yml` as one step plus its `.test.mjs` in the root unit-test run, rather than added to that manifest. It ships **advisory** at first, most markers it would check, such as the WS-Z2 `pmskills:*` markers, do not exist until v2.31.0 lands, and is promoted **enforcing** once WS-Z2 ships and the registry is populated against real markers.

### Non-goals

Builds no generator, that is WS-Z2's job. Does not touch release-please (WS-Z1). Does not itself dedupe release notes (WS-Z3). Does not expand to non-derived content-quality surfaces; scope is strictly the count, catalog, and narrative surfaces the audit named under P0-1 and P1-1.

## Implementation plan

| Phase | What | Agent | Effort | Depends on |
|---|---|---|---|---|
| 1 | Draft the registry (REQ-1) reflecting today's actual status, mostly `MANUAL`, with `AGENTS.md`'s catalog block already `GENERATED-CHECKED` | agent:claude | S | none |
| 2 | Build `check-surface-registry.mjs` + `.test.mjs` (REQ-2), advisory | agent:codex | S | Phase 1 |
| 3 | Draft the site page (REQ-3), stated honestly as in-progress | agent:claude | S | Phase 2 |
| 4 | As v2.30.0 WS-T1 and v2.31.0 WS-Z1/Z2/Z3 each land, flip their registry rows and re-run the check | agent:codex | S, ongoing across those releases | those releases shipping |
| 5 | Confirm REQ-4's two-consecutive-release bar; promote the registry check to enforcing; flip the site page to "achieved" | agent:human | S | Phase 4 |

### Test strategy

`check-surface-registry.test.mjs` asserts the marker scan finds a fixture marker pair and correctly flags both directions of drift: a marker with no registry row, and a registry row whose marker was removed.

## Release surfaces touched

A new registry file, a new validator plus test, one new site page, one small addition to the README front door (a link to the site page) once REQ-4's bar is met, one `validation.yml` step. No skill content changes, no catalog count change.

## Risks and open questions

| # | Risk / question | Disposition |
|---|---|---|
| 1 | The registry becomes itself a hand-maintained surface that quietly drifts, the exact recursive irony the bet exists to avoid | Mitigated directly by REQ-2's marker cross-check; the registry cannot silently omit a surface without the check failing |
| 2 | Publishing the site page before v2.31.0 lands overclaims a property that is not yet true | REQ-4's testable done-criteria gate; the page is written to say "in progress" until all three conditions hold |
| 3 | How many consecutive clean releases should the done-bar require: A) one, B) two, C) three | **Recommend B**: one clean release could be luck, a quiet release with few count-bearing edits; three is unnecessarily conservative given the generators are `--check`-gated by construction |
| 4 | Should the registry also track non-count generated surfaces, for example the per-skill Astro pages `gen-site.mjs` already produces | Recommend scoping to count and narrative surfaces for v1, matching the audit's own P0-1/P1-1 framing; expand only if a second drift class emerges there |

## Promotion trigger and path

The promotion trigger is v2.31.0 shipping (WS-Z1, WS-Z2, and WS-Z3 all landed), since the registry cannot honestly show `GENERATED-CHECKED` rows before then. The recommended path is to ride this as a companion item alongside v2.31.0's existing C-14 through C-20 block, or, if that release is already at capacity, as a thin fast-follow v2.31.1. No new top-level formal ID is recommended given the small residual scope; if the maintainer prefers to track it independently, assign a provisional M-ID and confirm the next-free number against the GitHub issue list at filing.

## Notes

- DRAFT for maintainer review. This document deliberately does not restate v2.30.0 or v2.31.0 scope; treat any apparent gap in mechanism as intentional and look at those two plans first.
- Companion documents in this same batch: `X-07-context-cost-transparency.md`, `X-09-validator-toolchain-product.md`, `X-10-contribution-fast-lane.md`.
- Source is the 2026-07-04 deep audit (maintainer-local, gitignored), section 6b (bet X-08) and section 6c (score).
