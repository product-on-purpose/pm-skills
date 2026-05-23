# v2.19.0 Release Plan - Pre-Promotion Hardening

**Status:** EXECUTING - Phase 1 COMPLETE (FU-1, FU-2, FU-3, FU-5 shipped 2026-05-22; FU-3 also absorbed PR-2's README internal-link sweep). **Phase 2 COMPLETE** (FU-4, FU-6, FU-7, FU-8, FU-9 shipped 2026-05-23; FU-9 done as "targeted enforcing + trim" - see its subsection). Remaining: Phase 3 (PR-1..PR-5), Phase 4 (release).
**Created:** 2026-05-22 (during v2.18.0 G4 post-tag hygiene); expanded to full plan 2026-05-22.
**Predecessor:** [v2.18.0](../v2.18.0/plan_v2.18.0.md) SHIPPED 2026-05-22 (tag `daf720e`; 63 skills).
**Type:** MINOR (2.18.0 -> 2.19.0). No skill behavior changes; adds governance tooling (new/extended validators), CI hygiene, and public-surface polish. Repo version is independent of individual skill versions.

**Theme:** Close the validator blind spots the v2.18.0 deep-verification arc exposed, fix CI and script hygiene, and make the repo's public surfaces clean before the next release becomes the first actively promoted one.

**Provenance:** Work items are sourced from (a) the v2.18.0 deep-verification arc (FU-1..FU-5), and (b) the 2026-05-21 Codex audit + Claude review (FU-6..FU-9, PR-1..PR-5). See [`docs/internal/audit/2026-05-21_codex-v3prep.md`](../../audit/2026-05-21_codex-v3prep.md) and [`..._reviewed-by-claude.md`](../../audit/2026-05-21_codex-v3prep_reviewed-by-claude.md).

---

## Why this release exists now

The v2.18.0 release passed every automated gate and still needed four Codex passes plus internal cross-check to catch ~26 findings, roughly half of which sat in validator blind spots. The lesson: any defect class found by a human/LLM that a script could have caught should become a script. Separately, the next release will be the first time the repo is actively promoted, which raises the bar on public surfaces (links, community-health files, install instructions, the docs site). v2.19.0 does the hardening so the promotion release can focus on its own headline rather than on cleanup.

The marketplace switchover itself, and any install-path migration, are **out of scope** here and tracked in their own planning area. This plan does not change the marketplace identity or install commands.

---

## Scope

### In scope

- **Validator and count hardening** (FU-1, FU-2, FU-3, FU-5): make the gates catch what they missed in v2.18.0.
- **CI and script hygiene** (FU-4, FU-6, FU-7, FU-8, FU-9): fix the gate's own correctness, portability, and signal-to-noise.
- **Promotion-readiness** (PR-1..PR-5): public-facing first impressions.

### Out of scope (deferred, with destination)

- Marketplace switchover + install-path migration: tracked separately as the next-major effort; not this release.
- New content skills (R-12 `develop-pre-mortem`, R-13 `develop-product-vision`, R-01 AI-Native Pack, R-19/R-24/R-42 etc.): roadmap, post-v2.19.0.
- Consolidated `scripts/release-validate.{ps1,sh}` gate: deferred (see D-FU6); the doc-claim correction lands now, the script later.
- pm-skills-mcp revival or embed-branch merge: maintenance-mode cadence, independent of this tag.

---

## Phases

Execution order respects dependencies: harden the validators first (so later edits are checked by the stronger gates), then fix CI/script hygiene, then polish public surfaces using the hardened validators, then release.

### Phase 1 - Validator and count hardening

| Item | Goal | Decision | Effort |
|---|---|---|---|
| FU-1 | Close `.mdx` count gap; reconcile the 2 count checkers | - | Small-Med |
| FU-2 | New `check-skill-cross-references` validator | D-FU2 | Medium |
| FU-3 | In-page `#anchor` link validity (+ root README/AGENTS fileset) | - | Med-Large |
| FU-5 | End count-surface drift | D-FU5 | Medium |

**FU-1 - Close the `.mdx` count gap (reconcile the two count checkers).**
- Goal: `docs/index.mdx` (the docs homepage) shipped a stale "59 skills" count in v2.18.0 until Codex caught it - despite both the `*.md`/`*.json`-only glob in `check-count-consistency` AND the existence of `check-landing-page-counts.sh`, which was added in v2.15.1 specifically to assert the `docs/index.mdx` homepage count after an earlier "40 vs 55" drift.
- Diagnosis (now grounded in the script - Codex F-04): `check-landing-page-counts.sh` DOES target `docs/index.mdx` (line 111), but it can miss a stale count two ways: (1) the historical-context escape hatch - if the correct count appears anywhere else in the file, stale counts are passed as "historical" (lines 91-97); (2) the count-claim grep only matches "`<N> ... skills`" phrasings within 0-4 tokens (line 67), so a differently-phrased stale number is invisible. The `.mdx` glob gap is separately in `check-count-consistency` (scans `.md`/`.json` only). Fix at whichever gap actually let v2.18.0 through (most likely the escape hatch).
- Approach: extend the file glob in `scripts/check-count-consistency.{sh,ps1}` to include `*.mdx` so the general stale-number scan covers `.mdx`, AND/OR extend `check-landing-page-counts` to assert the surface that drifted. Coordinate with FU-5 so the two checkers divide responsibility rather than duplicate. Verify `.ps1` parity.
- Acceptance: a deliberately wrong count planted in `docs/index.mdx` fails CI (via whichever checker owns it); removed after verification; `.ps1` parity confirmed.
- **DONE (2026-05-22).** Confirmed dual-gap diagnosis empirically: (1) `check-count-consistency` scanned `.md`/`.json` only, never `index.mdx`; (2) `check-landing-page-counts`'s escape hatch waved the stale headline through because the expected count (`63`) also appears on the page (subset cards + the v2.18.0 release-table row "59 to 63"), so every other number was treated as "historical context" - baseline output literally listed `claims expected 63 10 15 ... 59 ... (other counts are historical context)`. Fix: extended the `check-count-consistency.{sh,ps1}` file globs to include `*.mdx`; taught the exempt-marker detector to match the bare `count-exempt:start/end` token so both `<!-- -->` (`.md`) and the MDX-safe `{/* */}` (`.mdx`) wrappers work (HTML comments break the Astro MDX build - this is also why the original `.md`-era markers were dropped when the homepage migrated to `.mdx` in v2.14.0); restored exempt markers in `docs/index.mdx` around the card grid (subset counts) and the Recent Releases table (historical counts). Verified: Astro build PASS (363 pages); both checkers PASS clean with `.sh`/`.ps1` parity; a planted `59 skills` headline FAILS on both. The remaining escape-hatch tightening on the landing-page checker is FU-5's scope (the two checkers' division of responsibility is documented there).

**FU-2 - New `check-skill-cross-references` validator.** (Design: see D-FU2.)
- Goal: backtick skill references that point at non-existent skills (`define-edge-cases`, `develop-product-vision`, `discover-research-plan`) passed every v2.18.0 gate; only a manual name-vs-`skills/`-dir diff caught them.
- Approach: new `scripts/check-skill-cross-references.{sh,ps1}` + companion `.md`. Parse backtick-wrapped tokens matching the skill-name pattern (`{phase|foundation|utility|tool}-...` and the bare command forms) inside the scoped fileset; assert each resolves to a `skills/*/` directory; allow an explicit forward-reference allowlist for intentional "when shipped" pointers (e.g., `deliver-roadmap`).
- Acceptance: reintroducing a broken ref fails the check; the hedged `deliver-roadmap` forward-ref passes via the allowlist; the validator passes on the current tree once the allowlist is seeded with the known forward-ref(s), and any pre-existing broken refs it surfaces are fixed as part of FU-2; `.sh` and `.ps1` agree on the same fileset; added to the pre-tag bundle.
- **DONE (2026-05-22).** Created `scripts/check-skill-cross-references.{sh,ps1,md}`. Survey of the current tree: 41 referenced classification-prefixed tokens, 38 resolve to a `skills/<name>/` dir, 3 intentional non-resolving tokens seeded into the allowlist - `deliver-roadmap` (forward-ref "when shipped"), `deliver-change-communication` (illustrative naming example in `utility-pm-skill-builder`), `foundation-sprint-skills` (skill-family identifier, not a dir). No pre-existing broken refs remained (v2.18.0's three were already fixed by `3055962`). Verified: both scripts PASS clean with identical output; a planted `define-edge-cases` ref FAILS on both at the same `file:line`. Wired into the pre-tag bundle (`pre-tag-validate.sh`) and `.github/workflows/validation.yml` as an enforcing pair (Ubuntu + Windows). `validate-script-docs` recognizes the companion doc (only the 2 FU-8 docs remain missing).

**FU-3 - In-page anchor link validity.** (Codex F-01: larger than first scoped.)
- Goal: renumbering README headings orphaned the Table-of-Contents anchors; `check-internal-link-validity` does not catch them, for two reasons verified by reading the script.
- Current behavior to change: (1) it scans `docs/**` only (`find "$ROOT/docs" ...`, line 86), so root `README.md` and `AGENTS.md` are NOT in its fileset; (2) it explicitly skips pure same-page anchors (`if [[ "$link" =~ ^# ]]; then continue`, line 113), so `#anchor` targets are never resolved. It already handles `.mdx` and is already ENFORCING (v2.14.0+).
- Approach: (a) replace the `^#` skip with a resolver that checks same-page `#anchor` targets against GitHub-style heading slugs in the source file; (b) extend the fileset to include root `README.md` and `AGENTS.md` (a second base path beyond `docs/`), since those carry the nav anchors the acceptance names; (c) `.ps1` parity. Cross-file `path#anchor` is a stretch goal, not required.
- Acceptance: a broken `#anchor` in `README.md` fails under `--strict`/CI; all current README + AGENTS nav anchors resolve; `.sh` and `.ps1` agree.
- **DONE (2026-05-22).** Extended `check-internal-link-validity.{sh,ps1}`: (a) replaced the same-page-anchor skip with a GitHub-style heading-slug resolver (code-fence aware; duplicate headings get `-N` suffixes); (b) added root `README.md` + `AGENTS.md` to the fileset, each with its own absolute-link base root; (c) `.ps1` parity + companion doc refreshed. Turning resolution on across 193 in-scope files and adding README surfaced 23 pre-existing defects, all fixed in this item per the maintainer decision to fix-now rather than defer: 8 stale anchors (project-structure ToC count-drift `40`->`63`, leading-underscore `#_workflows--workflows`, `#docstemplates--skill-templates`; README `#tool-family-*-7` and `#workflows-skill-chaining`; anatomy `#simple-skill-define-problem-statement`; sub-agent-patterns `#pattern-3--mention`) and 11 broken README file-links (5 sample paths corrected to their real `tool-`-prefixed dirs / suffixed filenames; `getting-started-by-platform.md`->`platforms.md` with `#cursor--windsurf`->`#cursor`; `getting-started-guide.md`->`index.md`). Verified: both scripts PASS clean (193 files, 0 broken) with identical output; a planted broken README anchor FAILS on both under strict. **This absorbed PR-2's README internal-link + anchor sweep** - PR-2 now covers external links and CONTRIBUTING-link resolution only.

**FU-5 - End count-surface drift.** (Approach: see D-FU5.)
- Goal: the catalog count lives in ~9 README surfaces (two badges, two mermaid diagrams, cards, per-phase tables, At-a-Glance table, facts table). v2.18.0 needed a sweep + four Codex passes to catch them all.
- Reconcile, do not duplicate: two count checkers already exist - `check-count-consistency` (scans tracked files for stale hardcoded numbers) and `check-landing-page-counts` (asserts specific landing pages match the filesystem). FU-5 extends whichever is the right owner per surface and documents the split; it must not add a third overlapping checker.
- Escape-hatch tradeoff (Codex F-04): `check-landing-page-counts` currently PASSES a page that has a stale count if the correct count also appears in the same file (treats the stale number as historical context, lines 91-97). For D-FU5's "a single wrong count fails" to hold on landing pages, this hatch must be tightened - but tightening risks failing legitimate historical mentions (e.g., "grew from 59 to 63"). Resolve per surface during execution: strict on the true landing pages (`index.mdx`, `skills/index.md`), keep the hatch where historical mentions are legitimate. Tracked as the D-FU5 sub-decision.
- Note: v2.19.0 adds no skills, so the catalog count does not change this release. FU-1 and FU-5 are preventive guardrails for the next count-changing release; validate them by planting a wrong count and confirming CI fails, not by fixing real drift.
- Acceptance: per D-FU5 - a single wrong count on any of the ~9 surfaces fails CI rather than relying on a human sweep; the responsibility split between the two checkers is documented.
- **DONE (2026-05-22).** Audited the README/docs total-count surfaces: the `{N} skills` prose pattern already guarded 7 surfaces; two structured surfaces were unguarded - the shields.io badge (`badge/skills-63`, number-after-noun) and the At-a-Glance facts row (bare `63`). Closed both: added a `badge/skills-<N>` assertion to `check-count-consistency.{sh,ps1}` (honors the same exempt ranges; `.sh`/`.ps1` parity verified), and rephrased the At-a-Glance row to `63 skills (...)` so the prose pattern covers it. **Escape-hatch sub-decision resolved:** `check-count-consistency` is the strict total-guard for the landing pages (`index.mdx` + `skills/index.md`) after FU-1, so `check-landing-page-counts`'s historical-context hatch is KEPT rather than tightened - tightening would duplicate the threshold + subset-exclusion logic that D-FU5 forbids duplicating. Flipped the pre-tag bundle's `check-landing-page-counts` to `--strict` for CI parity (CI already ran it strict). The two-checker responsibility split is documented in `scripts/check-count-consistency.md`. Subset counts (per-phase/per-classification, e.g. badge `Phase-30_skills`) remain hand-maintained and intentionally out of total-count scope (a subset-sum validator would be a larger feature than this Medium item). Verified: both checkers PASS clean; a planted stale badge (`skills-59`) and a planted stale landing-page total each FAIL; `.sh`/`.ps1` agree.

### Phase 2 - CI and script hygiene

| Item | Goal | Decision | Effort |
|---|---|---|---|
| FU-4 | Remove vestigial `validate-mcp-sync` | - | Small |
| FU-6 | Correct the release-gate doc claim | - | Small |
| FU-7 | Add `.gitattributes`; normalize shell scripts | - | Small |
| FU-8 | Add 2 missing script docs; set policy | D-FU8 | Small |
| FU-9 | Reduce advisory noise | D-FU9 | Medium |

**FU-4 - Remove vestigial `validate-mcp-sync`.**
- Goal: MCP is in maintenance mode (M-22); the workflow is observe-only (`continue-on-error`) and cannot block, yet still clones pm-skills-mcp on every skills/commands push.
- Approach: remove `.github/workflows/validate-mcp-sync.yml` and `.github/scripts/validate-mcp-sync.js`; confirm nothing else references them; update `ci-overview.md` to drop the MCP-sync job from its CI-job list (coordinate with FU-6, which edits the same file).
- Acceptance: CI run list no longer shows the MCP-sync job; no dangling references.
- **DONE (2026-05-23).** Removed `.github/workflows/validate-mcp-sync.yml` + `.github/scripts/validate-mcp-sync.js` (8 workflow files now, was 9) and the orphaned guide `docs/guides/validate-mcp-sync.md`. Dereferenced all LIVE mentions: `ci-overview.md` (diagram + workflow table + advisory table), `release-runbook.md` G0 bundle sub-check, `agents/pm-skill-auditor.md` enumeration, `docs/guides/index.md` (guide row), `CONTRIBUTING.md` + `docs/contributing/index.md` (MCP Sync Guardrail section removed), `QUICKSTART.md` + `docs/getting-started/quickstart.md` (guardrail bullet), `scripts/README_SCRIPTS.md` (example + cross-repo-drift bullet). Frozen history (CHANGELOG, docs/changelog.md, docs/releases/*) left intact per D-PR3 - those are code-span mentions, not broken links. Verified: link validator + count-consistency PASS. **Deferred (tracked):** the pm-skill-auditor sample-output tables still show a `validate-mcp-sync` row (`skills/utility-pm-skill-auditor/references/{TEMPLATE,EXAMPLE}.md`, the generated `docs/skills/utility/utility-pm-skill-auditor.md`, and one library sample) - illustrative only, not CI-validated, and the generated page needs a `generate-skill-pages.py` run; left for a follow-up cleanup to keep this commit focused. **Side finding (for PR-4):** `quickstart.md` + `QUICKSTART.md` carry badly stale counts ("40 shipped PM skills", "47 slash-command docs", "9 Workflows") that `check-count-consistency` misses because "shipped" is a subset-descriptor exclusion that can mask a stale total - a validator gap worth a future look.

**FU-6 - Correct the release-gate documentation claim.**
- Goal: `release-runbook.md`, `ci-overview.md`, and `pm-skill-auditor.md` imply the local pre-tag bundle equals CI. It does not (CI also enforces build, edit-link, plugin-install, cross-doc).
- Approach: tighten the wording to "the pre-tag bundle covers validator scripts; the full release gate additionally requires `npm run build`, edit-link verification, `validate-plugin-install`, and cross-doc checks." Do NOT build a consolidated script this release (see D-FU6 note).
- Acceptance: the three docs no longer claim local-equals-CI; reviewers can read the true gate surface.
- **DONE (2026-05-23, with FU-4).** Corrected the "local bundle == CI gate" overclaim in `ci-overview.md` (the mermaid arrow label + the explanatory paragraph now say the bundle runs the validator scripts only and does NOT run the Astro build, plugin-install, edit-link, or cross-doc checks), `release-runbook.md` (G0 sub-check now states the bundle is NOT the full gate; the complete CI gate is verified green on the tag SHA at G3 and adds build/edit-link/plugin-install/cross-doc), and `agents/pm-skill-auditor.md` (same correction; also dropped the drift-prone exhaustive validator enumeration in favor of pointing at `pre-tag-validate.sh`, which had already gone stale by omitting FU-2). Per D-FU6, no consolidated `release-validate` script was built. Also folded in Phase 1 catalog accuracy in `ci-overview.md`: added `check-skill-cross-references` (FU-2) to the enforcing table + diagram; updated the `check-internal-link-validity` (FU-3 anchors + README/AGENTS) and `check-count-consistency` (FU-1/FU-5 .mdx + badge) descriptions.

**FU-7 - `.gitattributes` + shell-script normalization.**
- Goal: no `.gitattributes` exists; `core.autocrlf=true` mutates `.sh` line endings on Windows worktrees, producing local Bash false-reds that do not reproduce Ubuntu CI.
- Approach: add `.gitattributes` (`*.sh eol=lf`, `*.ps1 eol=crlf`, `*.mjs`/`*.js`/`*.json eol=lf`, `*.md text`); renormalize affected scripts in a dedicated commit; document the Windows node-PATH gotcha in `ci-overview.md`.
- Acceptance: `git ls-files --eol scripts/*.sh` shows `i/lf w/lf`; a clean checkout on Windows runs `bash scripts/pre-tag-validate.sh` without CRLF failures (node-PATH caveat documented).
- **DONE (2026-05-23).** Added `.gitattributes` pinning `*.sh eol=lf`, `*.ps1 eol=crlf`, `*.mjs`/`*.js`/`*.json eol=lf`, `*.md text` (`core.autocrlf` was `true`, the source of the perpetual "LF will be replaced by CRLF" warnings + the `.sh` CRLF risk). `git add --renormalize .` re-staged ONLY `.gitattributes` itself - every existing file was already LF in the index (autocrlf had been normalizing on commit), so zero content churn; the attributes just convert that implicit per-developer behavior into an explicit committed contract. `.sh` files now report `attr/text eol=lf`. Documented the Windows node-PATH gotcha + the line-ending contract in `ci-overview.md`. Acceptance met: `git ls-files --eol scripts/*.sh` shows `i/lf w/lf` with the attribute applied.

**FU-8 - Missing script docs + policy.** (Policy: see D-FU8.)
- Goal: `validate-script-docs` fails because `validate-design-sprint-skills-family.md` and `validate-foundation-sprint-skills-family.md` are absent (verified).
- Approach: author both companion docs to match the existing script-doc template; then apply D-FU8.
- Acceptance: `validate-script-docs` passes; its status (enforcing vs allowlisted-advisory) is set per D-FU8.
- **DONE (2026-05-23).** Authored the 2 missing companion docs (`scripts/validate-foundation-sprint-skills-family.md` + `scripts/validate-design-sprint-skills-family.md`), modeled on `validate-meeting-skills-family.md` and grounded in the actual validators (member lists; the 6 per-skill checks: required files present, `metadata.classification=tool`, `metadata.tool`, `metadata.move`, SKILL.md contract reference, `Decider Checkpoint` at end; plus scaffolding + partial-state behavior). `validate-script-docs` now PASSES (32/32 script pairs documented; `.sh`/`.ps1` agree). Per **D-FU8 (option A)**: flipped `validate-script-docs` to ENFORCING in `validation.yml` (dropped `continue-on-error` on both OS) and added it to the pre-tag bundle (`pre-tag-validate.sh`). Catalogued it in `ci-overview.md`'s enforcing table.

**FU-9 - Advisory noise reduction.** (Approach: see D-FU9.)
- Goal: `check-stale-bundle-refs` (460 matches) and `check-version-references` (1153 matches) are too noisy to be decision-useful; most matches are legitimate history.
- Grounded corrections (Codex F-02, F-03, from reading the scripts):
  - `check-version-references.sh` already EXCLUDES `.claude-plugin/` (it is the version source of truth) and both `_agent-context/.../CONTEXT.md` files (lines 49-81). Those surfaces are owned by `validate-version-consistency` (manifests) and `check-context-currency` (CONTEXT), so FU-9 must NOT re-include them here. Scope = README + current docs; leave CONTEXT and manifests to their owning checks.
  - An in-file exempt-range mechanism already exists (`<!-- version-exempt:start -->` / `count-exempt`, lines ~90-97). Reuse/extend it for legitimate current-surface exceptions instead of inventing a new allowlist file.
  - `.sh`/`.ps1` parity drift already exists in this area (the `.ps1` does not exclude `.claude-plugin/`); fix it as part of FU-9.
  - Posture (F-03): both checks run in CI with `continue-on-error: true` and exit 0 in non-strict mode. For "planting a stale current claim fails CI" to be true, the scoped check must be flipped to enforcing (run with `--strict` / drop `continue-on-error`) once its scope is clean. Without that flip the acceptance below is unmet.
- Acceptance: planting a stale version string in a current surface (README or current docs) fails CI; the same string in CHANGELOG history, a session log, an excluded manifest/CONTEXT, or an exempt-marked range does not; baseline output is small enough to scan.
- **DONE (2026-05-23; maintainer chose "Targeted enforcing + trim" over the literal broad-scan flip).** Implemented current-version-CLAIM enforcement where it belongs and kept the noisy provenance scan advisory:
  - **Targeted enforcing (the real gate):** extended `validate-version-consistency.{sh,ps1}` (already enforcing in CI) to assert the README version badge (`badge/version-X.Y.Z`) AND the At-a-Glance "Current version" row match `plugin.json`. Closes a gap NO gate covered - the badge form `version-X.Y.Z` is not matched by `check-version-references`' `vX.Y.Z` regex, and `validate-version-consistency` previously checked only the two manifests. Verified: PASS clean; a planted `version-2.17.0` badge FAILS on both `.sh` and `.ps1`.
  - **`check-version-references`: trim + parity, stays advisory.** Added the `_agent-context/codex/_archived/` exclude; fixed `.sh`/`.ps1` parity - the `.ps1` was missing the `.claude-plugin/` + `.claude/` excludes (Codex F-02) AND the `count-exempt`/`version-exempt` range logic entirely, and the `.sh` miscounted version-like path segments by grepping the `file:lineno:` prefix. Parity gap closed 47 -> ~8 lines (residual is an advisory-only edge). It stays ADVISORY by design: ~1160 matches are legitimate provenance in current docs that can't be distinguished from drift by version number, so broad enforcement is infeasible; the enforcing claim-check moved to `validate-version-consistency`. Posture note, WARN text, and companion doc updated.
  - **`check-stale-bundle-refs`: NOT flipped (the plan's premise was invalid).** D-FU9 assumed "bundle" is deprecated (baseline ~0), but the repo coined "validator bundle" (`pre-tag-validate.sh`) as current first-class terminology, so the bare-word `\bbundles?\b` matcher hits ~497 legitimate current references (validator bundle, the CI step name, the astro `/bundles/` redirect, CHANGELOG history). Flipping to enforcing would turn CI red on legitimate refs. Left ADVISORY; enforcing would require a matcher rewrite scoped to the deprecated forms only (`_bundles/`, `docs/bundles/`, "workflow bundle"), and the check is arguably near-vestigial (the rename shipped v2.9.0) - flagged for a future cleanup/removal decision rather than reworked here.

### Phase 3 - Promotion-readiness

| Item | Goal | Decision | Effort |
|---|---|---|---|
| PR-1 | Community-health files complete | - | Small |
| PR-2 | All public links resolve | - | Small-Med |
| PR-3 | Public-doc path hygiene | D-PR3 | Medium |
| PR-4 | README newcomer pass + install smoke | - | Medium |
| PR-5 | Docs-site landing polish + resolve 404 | - | Medium |

**PR-1 - Community-health files.**
- Goal: LICENSE and issue/PR templates are present, but root `CODE_OF_CONDUCT.md` and `SECURITY.md` are absent, and the README badge links to `CONTRIBUTING.md` with no root file to resolve to (verified gap).
- Approach: confirm where `CONTRIBUTING.md` resolves; add a root `CONTRIBUTING.md` (or fix the README link to the correct path); add `CODE_OF_CONDUCT.md` (Contributor Covenant) and `SECURITY.md` (disclosure contact + supported versions).
- Acceptance: GitHub community-profile complete; every README community link resolves.
- **DONE (2026-05-23; already satisfied - the "absent" premise was stale).** Re-verified current state: `CODE_OF_CONDUCT.md` (Contributor Covenant), `SECURITY.md` (evergreen "2.x" supported range + GitHub Private Vulnerability Reporting disclosure channel + 2-business-day response target), `CONTRIBUTING.md`, and `LICENSE` all exist at root; `.github/` has issue templates (bug/feature/task/config) + PR template. GitHub community profile is complete; README community links (CONTRIBUTING at lines 34, 1096) resolve. No changes required.

**PR-2 - Link integrity sweep.**
- Goal: broken links during a promotion push are the most visible first-impression defect.
- Scope corrections (Codex F-05, F-06):
  - FU-2 only covers `skills/**/SKILL.md` (per D-FU2), so it does NOT catch broken skill-name references in README, CONTRIBUTING, or docs prose. Those are out of FU-2's automated scope; PR-2 covers them with a one-time manual sweep, not by reusing FU-2. FU-3 (anchors) does apply, once its fileset includes README/AGENTS.
  - External links (skills.sh, agentskills.io, MCP repo, releases, discussions) have NO existing validator - `check-internal-link-validity` explicitly excludes external links. PR-2's external check is a one-time manual verification for v2.19.0, or wire a network link-checker (e.g. `lychee`) as a separate, possibly non-blocking CI step (deferred decision).
- Approach: run FU-3 (in-page anchors, once README/AGENTS are in its fileset) plus a manual pass over README/CONTRIBUTING/docs-landing badges, internal links, and external links.
- Acceptance: no dead internal links or anchors in README, CONTRIBUTING, or the docs landing page; external links manually verified once; the external-link automation decision is recorded.
- **DONE (2026-05-23).** Internal links + same-page anchors are covered by FU-3 (enforcing, green). External links verified once: all 7 distinct non-tag destinations (`agentskills.io/specification`, repo root, `pm-skills-mcp`, `releases/latest`, `discussions`, `skills.sh/product-on-purpose/pm-skills`, `adr.github.io`) return HTTP 200, and all README release-tag URLs (v0.1.0 through v2.18.0) return 200 (0 non-200). CONTRIBUTING resolution confirmed (PR-1). **External-link automation decision:** a network link-checker (lychee) is DEFERRED - a one-time manual verification suffices for v2.19.0, and a network-dependent CI step adds flakiness for little gain at the current external-link volume; revisit if external links proliferate. No repo changes needed.

**PR-3 - Public-doc path hygiene.** (Decision: see D-PR3.)
- Goal: public files (README, CHANGELOG, CONTRIBUTING) should not reference gitignored `docs/internal/...` paths, per the repo's own "public paths only" rule.
- Approach: sweep current public files for internal-path references and gitignored-path leaks; apply D-PR3 to historical CHANGELOG entries.
- Acceptance: no internal-path references in current public-facing content; historical policy decided and applied.
- **DONE (2026-05-23).** Swept current public files: NO truly-gitignored-path leaks (`_NOTES/`, `_LOCAL/`, `SESSION-LOG/`, `_agent-context/*/PLANNING|TODO`) in README/CONTRIBUTING/QUICKSTART. Clarification: `docs/internal/` is TRACKED (not gitignored), so the README/CONTRIBUTING prose mentions of `_agent-context/`, `agents/`, and one `docs/internal/release-plans/...` spec reference point at accessible tracked paths, not leaks - left as-is (they provide genuine provenance). Per **D-PR3 (option C):** added a one-time note atop `CHANGELOG.md` stating pre-v2.19.0 entries (71 `docs/internal/` references) are frozen history preserved as written, with public-paths-only enforced from v2.19.0 onward (review-time discipline; CHANGELOG is outside the link validator + count checker).

**PR-4 - README newcomer pass + evergreen install verification.**
- Goal: a first-time visitor should grasp the value prop, install in one step, and see a first win above the fold; a failed install command during promotion backfires.
- Approach: deliberate first-time-reader pass on the README top; verify the install paths that do NOT change in the switchover (file-based clone-and-reference, skills.sh) end-to-end from a clean state.
- Acceptance: the 60-second arc reads cleanly; both evergreen install paths verified working.

**PR-5 - Docs-site landing polish + resolve P2-07.**
- Goal: the Astro/Starlight site is a primary promotion surface; the build emits an unexplained `Entry docs -> 404 was not found` message that should not be normalized.
- Approach: investigate and resolve (or explain and downgrade to a labeled warning) the 404 message; give the landing page a promotion read.
- Acceptance: build message resolved or explained; landing page reviewed.

### Phase 4 - Release

1. Run the full pre-tag bundle, now including the new/extended validators (FU-1, FU-2, FU-3) and a clean `validate-script-docs` (FU-8).
2. Run the CI-only release checks locally (build, edit-link, plugin-install, cross-doc) per the corrected gate (FU-6).
3. Version bumps: `plugin.json`, `marketplace.json`, README badge + facts, both CONTEXT.md currency markers.
4. CHANGELOG `[2.19.0]` entry (public paths only) + `docs/releases/Release_v2.19.0.md`.
5. Tag the CI-verified SHA only (D22); publish GitHub Release as Latest; verify no orphan draft.
6. G4 post-tag hygiene: flip this plan + both CONTEXT.md to SHIPPED; create v2.20.0 stub; refresh MEMORY.md.

---

## Decisions (Decision Briefs)

Each decision uses the 6-part brief (what / why / outcomes / alternatives / recommendation / maintainer slot). Options are labeled for easy reference.

### D-FU2 - Scope of `check-skill-cross-references`

- **What:** which files the validator scans, and how it treats intentional forward-references.
- **Why:** too narrow misses real broken refs; too broad generates false positives on prose that merely mentions a hyphenated phrase. Forward-refs ("when shipped") are legitimate and must not fail the build.
- **Outcomes if unresolved:** the validator either ships noisy (eroding trust like the advisories in FU-9) or toothless (missing the exact class it was built for).
- **Alternatives:**
  - A) Scan `skills/**/SKILL.md` only; flag backtick tokens matching the skill-name shape that do not resolve to a `skills/*/` dir; explicit forward-ref allowlist.
  - B) A plus `commands/`, `AGENTS.md`, and `docs/skills/`.
  - C) All tracked `.md`.
- **Recommendation:** A for v2.19.0 (highest signal, lowest false-positive risk, smallest surface to tune), with a documented allowlist mechanism for forward-refs; widen to B in a later release if real misses appear. Define "skill reference" as a backtick-wrapped token matching the known classification-prefix pattern, not arbitrary prose.
- **Maintainer decision:** **A** (decided 2026-05-22). Scan `skills/**/SKILL.md` only; flag backtick skill-name tokens that do not resolve to a `skills/*/` dir; maintain an explicit forward-ref allowlist for intentional "planned" pointers. Widen scope only if real misses surface later.

### D-FU5 - How to end count-surface drift

- **What:** the mechanism that prevents one of ~9 README count surfaces from going stale.
- **Why:** manual sweeps demonstrably miss surfaces (four Codex passes were needed in v2.18.0).
- **Outcomes if unresolved:** every future release keeps risking a visible wrong count on the most-read public file, now under promotion scrutiny.
- **Alternatives:**
  - A) Build-time generated stats block: a script regenerates a marked region in README from filesystem counts; CI checks freshness.
  - B) Single source-of-truth counts file (e.g., `counts.json`) that surfaces reference.
  - C) Extend `check-count-consistency` to assert that ALL count surfaces (badges, mermaid, tables, At-a-Glance, facts, plus `.mdx` per FU-1) agree, leaving the README hand-edited.
- **Recommendation:** C. It is the lowest-risk and reuses the validator investment FU-1 already touches; README stays a normal static file (generators on a GitHub-rendered README add fragile machinery). Treat A as a deferred nice-to-have if hand-editing proves painful.
- **Maintainer decision:** **C** (decided 2026-05-22). Extend the count checkers to assert every count surface agrees (badges, mermaid diagrams, cards, per-phase tables, At-a-Glance, facts, plus `.mdx` per FU-1), coordinating `check-count-consistency` and the existing `check-landing-page-counts` so the two divide responsibility (no duplicate third checker); README stays hand-edited so a missed surface fails CI loudly. Generated block (A) deferred. Sub-decision (Codex F-04, resolve during execution): tighten `check-landing-page-counts`'s historical-context escape hatch for the true landing pages (`index.mdx`, `skills/index.md`) so a stale count there fails even when the correct count is also present; keep the hatch for prose pages where historical mentions are legitimate.

### D-FU8 - `validate-script-docs`: enforcing or advisory-with-allowlist

- **What:** the check's status after the two missing docs are authored.
- **Why:** advisory-only let a known defect persist on core family validators; fully enforcing could nag when a new throwaway script lacks a doc.
- **Outcomes if unresolved:** the check stays permanently red-but-ignored, the worst of both worlds.
- **Alternatives:**
  - A) Make it enforcing (CI fails if any script lacks a companion `.md`).
  - B) Keep advisory but add a tracked allowlist (empty after FU-8) so any NEW gap surfaces immediately.
  - C) Leave advisory as-is.
- **Recommendation:** A. Companion docs are part of this repo's validator-discoverability contract and are cheap to maintain; once the two gaps are closed, enforcing keeps the contract honest. Fall back to B only if there is a legitimate doc-less script class.
- **Maintainer decision:** **A** (decided 2026-05-22). After authoring the two companion docs, make `validate-script-docs` enforcing in CI; a script lacking a companion `.md` fails the gate. Fall back to B only if a legitimate doc-less script class later emerges.

### D-FU9 - Advisory noise reduction approach

- **What:** how to make the two noisy advisories actionable.
- **Why:** 460 + 1153 matches train maintainers to ignore warnings.
- **Outcomes if unresolved:** a real future drift hides in the noise and ships.
- **Alternatives:**
  - A) Allowlist file of known/historical matches; fail only on NEW matches.
  - B) "Current-claims-only" heuristic: scan only current-version surfaces; skip provenance/history (CHANGELOG history, session logs, release-plan archives).
  - C) Summary-only output (count + delta vs last run), no per-match dump.
- **Recommendation:** B as the root-cause fix (most matches are legitimate history, not drift), with a small A-style allowlist only for residue B cannot scope out. C alone hides signal. This consolidates the carried-over v2.17.1 `check-version-references` strict-heuristic note.
- **Maintainer decision:** **B** (decided 2026-05-22; surface list corrected per Codex F-02/F-03). Scope `check-version-references` and `check-stale-bundle-refs` to current-claim surfaces (README + current docs); leave CONTEXT to `check-context-currency` and manifests to `validate-version-consistency` (both already own those, and `check-version-references` already excludes them - do not re-include or duplicate). Reuse the existing `<!-- version-exempt -->` / `count-exempt` markers for legitimate exceptions rather than a new allowlist. Fix the `.sh`/`.ps1` `.claude-plugin` exclude parity. Once scoped, flip the scoped check to enforcing so a stale current claim blocks CI (it is currently advisory). Consolidates the v2.17.1 strict-heuristic item.

### D-PR3 - CHANGELOG historical-path hygiene

- **What:** what to do about pre-v2.19 CHANGELOG entries that reference `docs/internal/...` paths.
- **Why:** the "public paths only" rule applies to public files, but rewriting shipped history is itself a smell.
- **Outcomes if unresolved:** either the rule is silently violated, or history gets rewritten and the record is altered.
- **Alternatives:**
  - A) Sweep all historical entries to remove/rephrase internal-path references.
  - B) Accept pre-v2.19 entries as frozen history; enforce the rule on new entries only.
  - C) B plus a one-time note atop CHANGELOG that early entries may reference internal planning paths.
- **Recommendation:** C. Preserves the historical record, enforces going forward, and is transparent to a reader. A risks altering shipped release records for marginal benefit.
- **Maintainer decision:** **C** (decided 2026-05-22). Keep pre-v2.19 CHANGELOG entries as frozen history; add a one-time note atop CHANGELOG that early entries may reference internal planning paths; enforce public-paths-only on all new entries. (Current public content is still swept under PR-3.)

### Note on D-FU6 (release-validate script)

Not a full brief: the recommendation is to **fix the doc claim now** (FU-6) and **defer** any consolidated `scripts/release-validate.{ps1,sh}` until the marketplace switchover makes install-path validation load-bearing. The conductor's gates already run the extra checks manually, so the gap today is documentation accuracy, not missing capability.

---

## Release-level acceptance criteria

- Full pre-tag bundle PASS, including the new `check-skill-cross-references` (FU-2), `.mdx`-aware count checks (FU-1), anchor validity (FU-3), and a clean `validate-script-docs` (FU-8).
- Astro build PASS with the P2-07 message resolved or explained (PR-5).
- All count surfaces agree under the chosen D-FU5 mechanism.
- Community-health files complete and every public link resolves (PR-1, PR-2).
- No internal-path references in current public-facing content (PR-3).
- Both evergreen install paths verified working from a clean state (PR-4).
- `.gitattributes` present; `bash scripts/pre-tag-validate.sh` reproducible on a clean Windows checkout (FU-7).
- CI green on every pushed commit and on the tag; GitHub Release Latest; no orphan draft.

---

## Deferred / roadmap (carried from the stub)

- **Content skills:** R-12 `develop-pre-mortem`, R-13 `develop-product-vision` (multi-source consensus); R-01 AI-Native Pack (`measure-eval-suite-spec`, `develop-prompt-spec`, `develop-model-card`) pending competitive-risk reassessment; R-19 paired-reviewer pattern; R-24/R-65 hook infrastructure; R-42/R-43 workflow orchestration.
- **pm-skills-mcp:** `embed-skills.js` branch `fix/embed-add-tool-classification-soften-unknown` unmerged (maintenance-mode cadence).
- **v2.17.1 fast-follow candidate:** `check-version-references` strict heuristic + `.ps1` parity (now folded into D-FU9); macOS bash-3.2 attestation of the W3 validators.
- **Pre-existing README hygiene:** "Quick Release History" and "Recent Updates / What's New" are two separate release-summary surfaces that must both be updated each release; consider consolidating (relates to D-FU5).

---

## Notes

- This is a hardening release: per the repo convention against per-item effort docs on refactor/maintenance cycles, all work items live as rows/subsections in this single plan. If any item (most likely FU-2) grows enough to warrant a standalone implementation spec, split it out then.
- Sequencing rationale: Phase 1 hardens the gates before Phases 2-3 edit content, so the stronger validators check that work. Phase 4 releases only after the bundle and CI-only checks are green on the tag SHA.

## Review history

- **Claude self-review (2026-05-22):** verified all referenced script names exist; reconciled FU-1/FU-5 against the two count checkers; sharpened FU-2/FU-9 acceptance; added the FU-4/FU-6 `ci-overview.md` coordination note.
- **Codex adversarial pass (2026-05-22, retry after a stalled first dispatch):** 6 findings (0 P0, 3 P1, 2 P2, 1 P3), all incorporated above. F-01 (FU-3 scans `docs/**` only and skips `^#` anchors, so it needs a root README/AGENTS fileset + an anchor resolver); F-02 (FU-9: `check-version-references` excludes CONTEXT + manifests by design and has an existing exempt-marker mechanism + a `.ps1` parity gap); F-03 (FU-9: checks are advisory `continue-on-error`, so the acceptance needs a posture flip to enforcing); F-04 (FU-1 diagnosis + FU-5 escape-hatch tradeoff in `check-landing-page-counts`); F-05 (PR-2 overclaimed FU-2's coverage); F-06 (PR-2 external links have no validator). All three script-behavior claims independently verified by reading the scripts before encoding.
