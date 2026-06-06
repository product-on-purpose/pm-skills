# v2.25.1 Release Plan: Maintenance patch (bank the accumulated [Unreleased])

**Status:** SHIPPED 2026-06-06 (tag `v2.25.1` at `2b5044a`; GitHub Release Latest; squash-merged PR #175; `agent-plugins` registry re-pinned, metadata 1.9.0, PR #17; all tag + main CI green on both OS legs + CodeQL + Pages deploy). Pre-tag bundle green (bash + pwsh parity restored in #174). No catalog change.
**Owner:** Maintainers
**Type:** **PATCH** (maintenance only: no consumable-surface change; catalog stays 30 phase + 9 foundation + 11 utility + 15 tool = 65 skills and 5 sub-agents; sole version bump is for the accumulated maintenance, not a capability delta).
**Theme:** Bank the backlog of untagged maintenance that accumulated since v2.25.0 under one versioned GitHub Release. No new skills, no behavior change.
**Created:** 2026-06-06
**Updated:** 2026-06-06

---

## Where we are

Since `v2.25.0` (`23e65da`, 2026-06-03) main has accumulated 21 commits of pure maintenance that were deliberately shipped untagged (per the repo's "SemVer tracks compatibility, not significance" rule: maintenance is banked, not tagged per change). This patch tags that accumulation so consumers get a versioned, release-noted snapshot.

The CHANGELOG `[Unreleased]` section already drafts the Pattern S site reorg + the resource index (#164) + README link fixes (#165). It is INCOMPLETE: the em-dash-scar sweeps, the two CI guards, the dependency bumps, the root-doc-link repair, and the pre-tag parity fix are not yet drafted there. G2 (via `pm-changelog-curator`) brings `[Unreleased]` current, then moves the whole body to a `## [2.25.1] - 2026-06-06` section.

## Scope - what v2.25.1 banks (commits since v2.25.0)

| Area | Commits | In [Unreleased] already? |
|---|---|---|
| Astro Pattern S site reorg + family-standard conformance (14.7-14.9) | #154/#159/#160 (pre-tag, already drafted) | Yes |
| Generated resource index + docs/ front door | #164 | Partly |
| Root-doc-link repair after Pattern S + CI guard | #162 | No |
| README external link fixes | #165 | Yes (Fixed) |
| Em-dash-sweep `" . "` scar cleanup (CHANGELOG / site bodies / internal prose) | #168, #169, #170 | No |
| Advisory scar guard (`check-emdash-scars.mjs`) | #171 | No |
| Site-doc frontmatter-YAML lint (`--site-docs`, enforcing) | #173 | No |
| Site changelog frontmatter wording | #172 | No |
| Pre-tag PowerShell bundle parity fix (P0-01/P0-02 from the Codex audit) | #174 | No |
| Dependency bumps (astro-mermaid, starlight, dompurify) | #155, #156, #157 | No |
| Sprint skills overview copy | #163 | No |
| Site content-width / showcase CSS (parallel session) | `c680567` | No |
| v2.25.0 post-tag hygiene + roadmap flips + session logs | `f3a2a02`, `b156b33`, `edeb56b` | n/a (internal) |

## Release surfaces (G2)

- `CHANGELOG.md`: bring `[Unreleased]` current, then move to `## [2.25.1] - 2026-06-06`; add fresh empty `[Unreleased]`.
- `site/src/content/docs/changelog.md`: add a curated one-paragraph `[2.25.1]` entry (summary that links out, NOT a 1:1 mirror).
- `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.codex-plugin/plugin.json`: bump `version` 2.25.0 -> 2.25.1.
- `README.md`: version badge + What's New + Current version row.
- `_agent-context/claude/CONTEXT.md` + `_agent-context/codex/CONTEXT.md`: currency markers to v2.25.1 (gated by `check-context-currency`).
- `site/src/content/docs/releases/Release_v2.25.1.md` (NOTE: site path post-Pattern-S, NOT the runbook's stale `docs/releases/`) + the releases `index.md`.
- This plan status -> SHIPPED at G4.

## Gate ledger

- [x] G0 Pre-tag readiness (validators green, em-dash sweep, counters unchanged at 65/5, governance audit 0 P0, required files)
- [x] G1 Adversarial review attestation (maintenance patch of already-merged, already-CI-green work; the 2026-06-06 Codex audit + its verified review cover the release-shaping read; its one release blocker P0-01 fixed in #174)
- [x] G2 Version bump + CHANGELOG prep (curator; leak check clean; version-consistency + context-currency PASS)
- [x] G2.5 Commit release-prep (`a35e28b`) + PR #175 + CI green both OS legs + CodeQL + validate-plugin; squash-merged to main `2b5044a`
- [x] G3 Tag + push (annotated tag `v2.25.1` on post-squash-merge main SHA `2b5044a`)
- [x] G4 Post-tag hygiene (GitHub Release Latest; `agent-plugins` re-pinned metadata 1.9.0 PR #17; Pages deploy green; next-cycle stub = P2 reminder, not yet created)

## Notes / known runbook drift to fix later

- The runbook (`site/src/content/docs/contributing/release-runbook.md`) and the conductor agent definition still cite the pre-Pattern-S paths `docs/releases/Release_v{target}.md` and `docs/contributing/release-runbook.md`. The live paths are under `site/src/content/docs/`. Folded into the v2.25.1 follow-ups, not a blocker.
