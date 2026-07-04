# Spec: the zero-drift program (v2.31.0) - DRAFT for review

Companion to [`plan_v2.31.0.md`](plan_v2.31.0.md) and the learning walk-through `release-please-primer.md` (drafted in parallel into this directory). This spec defines the testable requirements, the concrete interfaces (config + workflow + marker sketches tailored to this repo's real files), the per-workstream acceptance criteria, the durable CI inventory, the thin specs for the staged workstreams, and the open questions. It covers the core workstreams WS-Z1..WS-Z6 and, as catch-up slots owned by the parallel v2.30.0 trust-repair plan (WS-T8/WS-T11), the two companion gates (C-14, C-19; execute only what v2.30.0 verifiably did not land); the staged workstreams WS-Z7..WS-Z10 are spec'd thin here and fully at their own release plans.

DRAFT: proposed; requirements are numbered `REQ-Z<ws>.<n>` and are individually testable. Where a requirement depends on an open decision, the decision ID (ZD-1..ZD-5, in the plan) is named inline.

## The zero-drift property (what "done" means at the program level)

**Property:** every derived surface (skill counts, catalog tables, badges, the sub-agent compatibility matrix, plugin/marketplace/codex manifest descriptions, the GitHub About text, both quickstarts, the release-notes mirror, the changelog mirror, the releases index row) is produced by a generator or by release-please, and CI fails if any of them is edited by hand inside its generated region. Version strings move by exactly one action (a squash merge) that release-please fans out. The manual write path for these surfaces is removed, not merely policed.

This is the audit's innovation bet X-8 stated as an acceptance property. The precedent is `scripts/gen-skill-manifest.mjs` + the `AGENTS.md` `skills-catalog:start/end` marker block, which has never drifted; every new generator in this program copies that shape (a `--check` mode that exits non-zero when the committed output differs from a fresh render, run in CI).

**Program-level done (testable):** run every generator's `--check` and the grep count-sweep on a fresh checkout of the tagged commit; all pass, and no hand-editable count or catalog surface remains outside a generated marker or a `count-exempt` region. If a count is wrong anywhere, it is wrong in exactly one source (the frontmatter or the manifest), and fixing that source fixes every surface.

## Conventions

- **Generators are single-source Node `.mjs`** with a sibling `.test.mjs`, a `--check` mode, and EOL-agnostic comparison (`normalizeEol`, mirroring `gen-skill-manifest.mjs`), so a Windows CRLF checkout does not read false-stale.
- **CI wiring for `.mjs` checks:** a single `run: node scripts/<name>.mjs --check` step in `.github/workflows/validation.yml`. It runs on BOTH OS legs because the job matrix is `[ubuntu-latest, windows-latest]`; it is NOT duplicated per shell. Per the header of `scripts/validation-manifest.yaml`, `.mjs` checks are OUT of that manifest's parity remit by design (the manifest governs `.sh` + `.ps1` shell pairs only). So a new `.mjs` gate is registered by adding the validation.yml step + its `.test.mjs`, NOT by adding a row to `validation-manifest.yaml`.
- **Porting a shell validator to `.mjs`** (WS-Z4) is the inverse: REMOVE its row from `validation-manifest.yaml`, replace its two per-shell validation.yml steps with one cross-OS `node` step, and update `scripts/check-validator-parity.mjs` so the referee no longer expects the retired pair.
- **Enforcement ladder:** advisory first (continue-on-error) with a dated rationale in the step comment, promoted to enforcing once the corpus is clean. New deterministic generators may ship enforcing from day one (the resource-index / skill-manifest precedent), but any gate that would fail on existing content (the heading-case lint, C-14) ships advisory until the content is fixed.
- **Skill content edits** bump `skills/<name>/SKILL.md` `metadata.version` and add a HISTORY.md row (additive section = MINOR; wording/normalization = PATCH), per `docs/internal/skill-versioning.md`.

## Requirement traceability

Each requirement group traces to an audit recommendation (R-XX) and its workstream, so the spec and the improvement-program matrix in the plan stay in lockstep.

| Requirement group | Workstream | Closes (R) | Audit finding(s) addressed |
|---|---|---|---|
| REQ-Z1.* | WS-Z1 | R-11 (release automation) | P1-1 count/version drift, P1-10 strategy-vs-shipping drift |
| REQ-Z2.* | WS-Z2 | R-12 (gen half), R-13 | P0-1 count drift, P1-1 stale surfaces, P1-6 duplication |
| REQ-Z3.* | WS-Z3 | R-12 (notes half) | P1-6 release-note duplication |
| REQ-Z4.* | WS-Z4 | R-18, R-19 | P1-3 dual-shell no-guarantee, P2-8 CI ergonomics |
| REQ-Z5.* | WS-Z5 | R-16, R-17 | P1-5 eval coverage + plumbing |
| REQ-Z6.* | WS-Z6 | R-25 | Trust dimension (E1/E2), P3 optics |
| REQ-C14.* | C-14 (catch-up; owner v2.30.0 WS-T8) | R-14 | P2-1 skeleton fragmentation, P2-2 heading drift |

## Generator test strategy

Every new generator ships with a `.test.mjs` that proves three things, mirroring `gen-skill-manifest.test.mjs`:

1. **Round-trip fidelity.** Render the surface from a fixture manifest, parse the rendered output, and assert the parsed counts/rows equal the fixture's catalog numbers (a wrong count in, a wrong count out - never a silent pass).
2. **`--check` correctness both ways.** A matching committed blob exits 0; a deliberately mutated blob exits non-zero (the tripwire actually trips). Include a CRLF-vs-LF case so a Windows checkout does not read false-stale.
3. **Marker discipline.** A missing `pmskills:*:start`/`:end` pair makes the splice refuse loudly rather than write in the wrong place (the `spliceAgents` precedent).

For `gen-derived-surfaces.mjs --about` (REQ-Z1.7) the test asserts the string is single-line, carries the current counts, and contains no banned dash characters (so the About text cannot reintroduce the house-rule violation).

---

## WS-Z1 - Release automation (M-21, issue #136)

### Requirements

- **REQ-Z1.1** A `release-please-config.json` at repo root configures manifest mode with `release-type: simple` (no language-specific version file) and a single root package keyed `"."`.
- **REQ-Z1.2** A `.release-please-manifest.json` at repo root seeds the current version so the first run bootstraps from a known point (the last shipped version at go-live; `2.30.0` if v2.30.0 has shipped). See also `bootstrap-sha`, REQ-Z1.9.
- **REQ-Z1.3** `extra-files` updaters move the version in all three manifests without a hand edit: `.claude-plugin/plugin.json` (`jsonpath: $.version`), `.codex-plugin/plugin.json` (`jsonpath: $.version`), `.claude-plugin/marketplace.json` (`jsonpath: $.plugins[0].version`).
- **REQ-Z1.4** The README version badge and the "Current version" row update via generic `x-release-please-version` annotations on those lines (README listed as a plain `extra-files` path so the Generic updater processes its annotations).
- **REQ-Z1.5** A workflow `.github/workflows/release-please.yml` runs `googleapis/release-please-action@v4` on `push: main` with `permissions: contents: write, pull-requests: write, issues: write` and `config-file` + `manifest-file` inputs.
- **REQ-Z1.6** The action uses a fine-grained PAT or GitHub App token (ZD-5), NOT the default `GITHUB_TOKEN`, so the Release PR triggers `validation.yml` (the default token suppresses downstream workflow runs; verified release-please behavior).
- **REQ-Z1.7** A post-tag step runs only when `steps.release.outputs.release_created` is set and PATCHes the GitHub About `description` with counts derived from `skill-manifest.json` (via `gen-derived-surfaces.mjs --about`), superseding R-02's one-time manual About fix.
- **REQ-Z1.8** CHANGELOG behavior follows ZD-1. Under the recommended hybrid, release-please inserts the `## [X.Y.Z]` skeleton from commit titles into `CHANGELOG.md`; the maintainer enriches the section inside the still-open Release PR before merge.
- **REQ-Z1.9** First-run history scan is bounded: set `bootstrap-sha` in the config (or rely on the seeded manifest) so release-please does not scan the entire repo history on first execution.
- **REQ-Z1.10** Cutover follows ZD-4: a shadow phase (release-please opens its Release PR; the manual 6-gate runbook still cuts the release; the PR is observed only), then authoritative cutover when the shadow Release PR has matched the manual runbook's version + notes for one release with zero hand-fixes. The manual runbook is retained as fallback.
- **REQ-Z1.11** The produced tag format is `v<version>` (matching the existing `vX.Y.Z` tags); confirm on the shadow run (OQ-7).

### Acceptance

- A `feat:`/`fix:` squash-merge to `main` opens or updates a release-please Release PR whose diff shows the version moved in all three manifests + the README badge/row, with no other version edits required.
- Merging the Release PR creates a `v<version>` tag + a GitHub Release, and the post-tag About PATCH lands the derived count string.
- On the shadow run, the Release PR shows green `validation.yml` checks (proves ZD-5 token works).

### Rollout sequence (ZD-4, shadow -> authoritative)

| Step | State | Who cuts the release | Exit gate to advance |
|---|---|---|---|
| S0 | config + manifest + workflow merged; token set (ZD-5) | manual 6-gate runbook | workflow runs on `main` without error; a Release PR appears |
| S1 | shadow: Release PR observed, not merged | manual 6-gate runbook | one release where the shadow PR's version + notes match the manual cut with zero hand-fixes |
| S2 | authoritative: merging the Release PR IS the cut | release-please (merge = tag) | maintainer still enriches CHANGELOG in the open PR (ZD-1 hybrid); manual runbook retained as fallback (OQ-8) |

The manual runbook is never deleted; after S2 it is the documented fallback for a release-please outage or a bump the automation gets wrong.

---

## WS-Z2 - Generated surfaces (M-36)

### Requirements

- **REQ-Z2.1** A new generator `scripts/gen-derived-surfaces.mjs` (+ `scripts/gen-derived-surfaces.test.mjs`) reads `skill-manifest.json` (already generated by `gen-skill-manifest.mjs`) and emits every derived README/quickstart/manifest surface. It exposes `--check` (fail if any committed surface is stale) and `--about` (print the GitHub About string for REQ-Z1.7).
- **REQ-Z2.2** README catalog tables and the skills/foundation count badges are generated between explicit markers of the form `<!-- pmskills:catalog:start (generated by scripts/gen-derived-surfaces.mjs; edit skill frontmatter, not this block) --> ... <!-- pmskills:catalog:end -->`, mirroring the `skills-catalog` marker in `AGENTS.md`. These are DISTINCT from the existing `count-exempt:start/end` markers (which exempt historical prose from the count gate; the new markers GENERATE content).
- **REQ-Z2.3** `QUICKSTART.md` and `site/src/content/docs/getting-started/quickstart.md` are generated from ONE shared source fragment, so the "67 vs 68" divergence (audit P0-1) is structurally impossible.
- **REQ-Z2.4** The sub-agent compatibility matrix (`site/src/content/docs/reference/sub-agent-compatibility.md`) is generated from `skill-manifest.json` `catalog.sub_agents` (and the agent list) cross-joined with a small committed per-client status data file (REQ-Z2.7), replacing the hand-stamped "as of v2.16.0" matrix.
- **REQ-Z2.5** The three manifest description strings (`.claude-plugin/plugin.json` `description`, `.claude-plugin/marketplace.json` `plugins[0].description`, `.codex-plugin/plugin.json` `interface.longDescription`) are generated with the current counts + the latest-release theme. NOTE the design fork in OQ-3: the current descriptions carry a long authored per-version history tail that is NOT derivable; the generator likely owns only the leading counts + latest-theme sentence, with the historical tail either authored below a marker or retired.
- **REQ-Z2.6** `--check` fails CI on both OS legs if any generated surface (README blocks, either quickstart, the compat matrix, the manifest descriptions) is edited by hand inside its markers.
- **REQ-Z2.7** The per-client status data file (e.g. `site/src/content/docs/reference/_data/client-support.json` or `scripts/data/client-support.json`) is the single home for per-client facts (native sub-agents yes/no, dispatch-skill fallback yes/no, install docs present); the matrix generator reads it.
- **REQ-Z2.8** README strategy (ZD-2, DECIDED A, 2026-07-04): the README keeps its full length as the reading experience; the catalog tables, badges, count-bearing claims, and release mirrors become generator-owned regions inside `pmskills:*` markers. No slimming requirement; no section is removed for length reasons.

### Acceptance

- Editing a skill description and running `gen-skill-manifest.mjs && gen-derived-surfaces.mjs` updates the README catalog block, the manifest descriptions, and the compat matrix with no other hand edits; a hand edit inside any marker fails `--check`.
- Both quickstarts render identical counts because they derive from one fragment.
- Every README catalog/badge/mirror region sits inside a `pmskills:*` marker pair and `--check` passes on both OS legs (ZD-2 = A; no length target).

---

## WS-Z3 - Release-notes dedup (M-36)

### Requirements

- **REQ-Z3.1** The README "Recent Updates" section (~250 lines) and the second in-README changelog table are replaced by ONE generated recent-releases mirror block (the top ~3 CHANGELOG sections summarized: version, date, one-line theme, links to the release page + CHANGELOG), inside `pmskills:latest-release:start/end` markers, sourced from `CHANGELOG.md`. Under ZD-2 = A this is a content-rich mirror, not a thin pointer; the redundant second table folds into it.
- **REQ-Z3.2** The site `changelog.md` mirror (`site/src/content/docs/changelog.md`) is generated from the top section of `CHANGELOG.md` (not hand-mirrored).
- **REQ-Z3.3** The `releases/index.md` table row for the new release is generated from the per-release page front-matter (version, date, highlight), while the per-release pages themselves stay authored.
- **REQ-Z3.4** Per-release site pages (`site/src/content/docs/releases/Release_vX.Y.Z.md`) remain authored and their slugs + published URLs are preserved; `check-route-parity.mjs` MUST stay green (no URL removed without a redirect).
- **REQ-Z3.5** The end-state per-release note surfaces and their owners are: CHANGELOG section (release-please skeleton + maintainer enrich); README recent-releases mirror (generated); site changelog mirror (generated); releases index row (generated); per-release site page (authored); GitHub Release body (release-please). Six surfaces reduced to two authored (CHANGELOG enrich + the per-release page), the rest generated.
- **REQ-Z3.6** The GitHub Release body is produced by release-please from the CHANGELOG section (ZD-1 hybrid), so it is never a seventh hand-authored copy; the only human write for release notes is the CHANGELOG enrich inside the open Release PR and the authored per-release site page.

### Acceptance

- Cutting a release regenerates the README recent-releases mirror, the site changelog mirror, and the releases index row from CHANGELOG + the new page front-matter; no per-release URL 404s (route-parity green).

---

## WS-Z4 - Dual-shell port wave 1 (R-18) + CI ergonomics (C-19, R-19)

### Requirements

- **REQ-Z4.1** `check-count-consistency` is ported to single-source `scripts/check-count-consistency.mjs` (+ `.test.mjs`), preserving its current behavior (total + the four per-classification/per-phase sub-counts derived from frontmatter, the `count-exempt` skip, and the phrasing set as extended by v2.30.0 R-02).
- **REQ-Z4.2** `validate-skill-family-registration` is ported to single-source `scripts/validate-skill-family-registration.mjs` (+ `.test.mjs`).
- **REQ-Z4.3** The v2.30.0 WS-T9 fixture tree is the port acceptance suite: for every fixture, the retiring `.sh`/`.ps1` and the new `.mjs` MUST produce the same verdict (pass/fail) before the shell pair is deleted. This behavioral-equivalence check is the guard the audit's P1-3 said was missing.
- **REQ-Z4.4** Both ported validators are REMOVED from `scripts/validation-manifest.yaml`; their per-shell steps in `validation.yml` are replaced by one cross-OS `node ... ` step each; `scripts/check-validator-parity.mjs` (+ its test) is updated so the referee no longer expects the retired pairs.
- **REQ-Z4.5** The `.sh`, `.ps1`, and `.md` doc triples for both ported validators are deleted.
- **REQ-Z4.6** Wave-2 candidates are named for the next port cycle: the remaining awk-bearing scripts and the highest-LOC dual-shell validators (e.g. `check-landing-page-counts`, `validate-version-consistency`); selection criterion = awk fragility + LOC + change frequency. Per audit D-1, ruled B-complete (2026-07-04): the cadence is standing (1-2 ports per release at later tags) until the dual-shell pair count reaches zero, and the terminal payoff commit retires `check-validator-parity.mjs`, the `validation-manifest.yaml` pair rows, and the `.md` sidecars.
- **REQ-Z4.7 (C-19 / R-19; catch-up, owner v2.30.0 WS-T11, execute only on slip)** CI ergonomics: add `cache: npm` to `actions/setup-node` on both OS legs; add a root `npm test` script that runs the whole `node --test` suite (CI calls `npm test` instead of the hand-maintained inline file list); add a lightweight pre-commit (frontmatter lint + validator parity + the unit suite).

### Acceptance

- The old shells and the new `.mjs` agree on 100% of the v2.30.0 fixtures; only then are the triples deleted.
- `check-validator-parity.mjs` passes with the two pairs removed; the pre-tag bundle + CI are green on both OS legs with the ported `.mjs` running as single cross-OS steps.
- `npm test` at repo root runs the full unit suite; CI uses it; a cold run benefits from `cache: npm`.

---

## WS-Z5 - Eval industrialization (R-16 / R-17)

### Requirements

- **REQ-Z5.1** Trigger-fixture backfill wave 1 covers the collision-risk neighborhoods (the `define-` cluster, the `discover-` research cluster, remaining `deliver-` and `foundation-meeting-` skills), +12-15 skills, lifting coverage from 31/68 (~46%) toward >=43/68 (~65%).
- **REQ-Z5.2** Each new `evals/trigger-fixtures.json` meets the existing contract enforced by `check-trigger-fixtures.mjs`: >=16 queries, a 60/40 should-trigger/should-not split, and >=2 near-miss negatives at a declared partner skill.
- **REQ-Z5.3** The hardcoded ROSTER and COLLISION_PAIRS in `check-trigger-fixtures.mjs` (and the collision literals in `check-new-skill-collision.mjs`) are externalized to a data file beside `validation-manifest.yaml` (e.g. `scripts/data/eval-roster.json`); the validators read it; its shape is unit-tested.
- **REQ-Z5.4** An output-eval CI lane `.github/workflows/output-eval.yml` exercises `output-eval.workflow.mjs` end-to-end: `workflow_dispatch` + a monthly `schedule` cron, `dry_run` input defaulting to true, and a live leg gated behind an API-key secret (skipped when the secret is absent, so forks and PRs never fail on it).
- **REQ-Z5.5** A published evals page on the site presents aggregate scores + the method + the honest confound notes (the trigger-eval environment-dominance lesson already documented); the family rubrics stay internal. Publication copy is `agent:human` reviewed (REQ-Z5.6).
- **REQ-Z5.6** No absolute-score claim is published without the confound caveat; the page mirrors the existing "do not trust absolute numbers" candor.

### Acceptance

- `check-trigger-fixtures.mjs` passes with the externalized roster and the +12-15 new fixture sets; coverage >= ~65%.
- The output-eval lane runs green in dry-run on dispatch + cron; the live leg runs only when the key secret is present.
- The evals page is live, links the method, and carries the confound notes.

---

## WS-Z6 - Trust posture (R-25)

### Requirements

- **REQ-Z6.1** `SECURITY.md` is expanded to state: what the plugin ships; that nothing executes at install time (skills + docs are inert markdown; hooks are opt-in and disclosed); the hook opt-in model (`.claude/pm-skills.local.md`, PreToolUse/SessionStart, fail-open); and the supply-chain posture (the SHA-pinned `agent-plugins` marketplace and a `SHA256SUMS` file for the release zip).
- **REQ-Z6.2** A provenance/trust page on the site restates the above for users who never open the repo, and links the release-integrity artifacts.
- **REQ-Z6.3** Both are linked from the README front door and `getting-started`.

### Acceptance

- SECURITY.md + the provenance page are published, cross-linked, and name the concrete artifacts (opt-in hooks, SHA-pinned marketplace, zip checksums).
- SECURITY.md states the opt-in hook model explicitly (no hook runs unless enabled in `.claude/pm-skills.local.md`), matching the actual `hooks/` fail-open behavior, so the claim is verifiable against the shipped code rather than aspirational.

---

## Catch-up gates (C-14 / C-19; owned by v2.30.0 WS-T8 / WS-T11, execute only on slip)

- **REQ-C14.1** A canonical SKILL.md skeleton document names the three sanctioned dialects (classic, contract-shaped, tool-family) and the exact heading spellings/case.
- **REQ-C14.2** A heading-case lint `scripts/check-heading-case.mjs` (+ `.test.mjs`) flags out-of-canon output-section headings (e.g. "Quality checklist" vs "Quality Checklist", "When NOT to use" vs "When NOT to Use"). It ships **advisory** (existing content violates it, P2-2), is enforced only after the corpus normalization (v2.30.0 WS-T8, or the C-15 catch-up on slip) (OQ-6).

---

## Interfaces

### `release-please-config.json` (sketch, tailored to this repo)

```json
{
  "$schema": "https://raw.githubusercontent.com/googleapis/release-please/main/schemas/config.json",
  "bootstrap-sha": "<SHA of the commit immediately before release-please goes live>",
  "packages": {
    ".": {
      "release-type": "simple",
      "changelog-path": "CHANGELOG.md",
      "extra-files": [
        { "type": "json", "path": ".claude-plugin/plugin.json",      "jsonpath": "$.version" },
        { "type": "json", "path": ".codex-plugin/plugin.json",       "jsonpath": "$.version" },
        { "type": "json", "path": ".claude-plugin/marketplace.json", "jsonpath": "$.plugins[0].version" },
        "README.md"
      ]
    }
  }
}
```

Notes: `release-type: simple` means no language package file is bumped (the repo's `package.json` is deliberately inert at 0.0.0). The plain `"README.md"` entry invokes the Generic updater, which acts only on lines carrying `x-release-please-*` annotations. `$.plugins[0].version` targets the single marketplace plugin entry.

### `.release-please-manifest.json` (sketch)

```json
{
  ".": "2.30.0"
}
```

Seed with the last shipped version at go-live (`2.30.0` if v2.30.0 trust-repair has shipped first; otherwise `2.29.1`). This plus `bootstrap-sha` bounds the first-run history scan (REQ-Z1.9).

### README annotation lines (Generic updater)

```md
<!-- x-release-please-version -->
[![Version](https://img.shields.io/badge/version-2.31.0-blue.svg?style=flat-square)](...)   <!-- x-release-please-version -->
| **Current version** | [v2.31.0](.../releases/tag/v2.31.0) |                                 <!-- x-release-please-version -->
```

release-please replaces the semver-looking token on any line carrying the `x-release-please-version` comment. For a multi-line region use `x-release-please-start-version` / `x-release-please-end`.

### `.github/workflows/release-please.yml` (sketch)

```yaml
name: release-please
on:
  push:
    branches: [main]
permissions:
  contents: write
  pull-requests: write
  issues: write
jobs:
  release-please:
    runs-on: ubuntu-latest
    steps:
      - uses: googleapis/release-please-action@v4
        id: release
        with:
          # ZD-5: a fine-grained PAT or GitHub App token, NOT the default GITHUB_TOKEN,
          # so the Release PR triggers validation.yml. The default token suppresses it.
          token: ${{ secrets.RELEASE_PLEASE_TOKEN }}
          config-file: release-please-config.json
          manifest-file: .release-please-manifest.json
      # Post-tag GitHub About sync (REQ-Z1.7), only when a release was actually created.
      - if: ${{ steps.release.outputs.release_created }}
        env:
          GH_TOKEN: ${{ secrets.RELEASE_PLEASE_TOKEN }}
        run: |
          about="$(node scripts/gen-derived-surfaces.mjs --about)"
          gh api -X PATCH "/repos/${{ github.repository }}" -f description="$about"
```

### Generation marker syntax (README + generated docs)

```md
<!-- pmskills:catalog:start (generated by scripts/gen-derived-surfaces.mjs; edit skill frontmatter, not this block) -->
... generated catalog table + badges ...
<!-- pmskills:catalog:end -->
```

One marker pair per generated region: `pmskills:catalog`, `pmskills:latest-release`, `pmskills:compat-matrix`, `pmskills:manifest-desc`. The splice refuses (loudly) if a marker pair is missing, exactly like `spliceAgents` in `gen-skill-manifest.mjs`. These are distinct from the pre-existing `count-exempt:start/end` markers, which only exempt historical prose from the count gate.

### Per-client status data file (sketch, REQ-Z2.7)

```json
{
  "clients": [
    { "id": "claude-code", "label": "Claude Code", "native_subagents": true,  "dispatch_skills": true,  "install_docs": true },
    { "id": "codex-cli",   "label": "Codex CLI",   "native_subagents": false, "dispatch_skills": true,  "install_docs": true },
    { "id": "cursor",      "label": "Cursor",      "native_subagents": false, "dispatch_skills": true,  "install_docs": true },
    { "id": "gemini-cli",  "label": "Gemini CLI",  "native_subagents": false, "dispatch_skills": true,  "install_docs": false }
  ]
}
```

The compat-matrix generator cross-joins `skill-manifest.json` `catalog.sub_agents` + the agent list with this file. `install_docs: false` for Gemini CLI encodes the audit's P1-1 gap (named as supported but no install instructions) as data, so the matrix either shows the gap or the claim is removed.

## Durable CI inventory

Every new or changed gate this release. "Both-legs wiring" for a `.mjs` gate = a single `node` step that runs on both matrix OS (ubuntu + windows) via the job matrix; it is not duplicated per shell.

| Gate | Kind | Unit test | `validation-manifest.yaml` | validation.yml wiring | Ladder |
|---|---|---|---|---|---|
| `gen-derived-surfaces.mjs --check` | NEW `.mjs` | `gen-derived-surfaces.test.mjs` | not added (mjs, out of remit) | one cross-OS `node --check` step | enforcing from day one (deterministic; skill-manifest precedent) |
| `gen-derived-surfaces.mjs --about` | NEW `.mjs` mode | covered by the test above | n/a | called in `release-please.yml` post-tag step | n/a (not a gate) |
| `check-count-consistency.mjs` | CHANGED dual-shell -> `.mjs` | `check-count-consistency.test.mjs` (NEW) | ROW REMOVED | 2 shell steps -> 1 `node` step | enforcing (unchanged level) |
| `validate-skill-family-registration.mjs` | CHANGED dual-shell -> `.mjs` | `validate-skill-family-registration.test.mjs` (NEW) | ROW REMOVED | 2 shell steps -> 1 `node` step | enforcing (unchanged level) |
| `check-validator-parity.mjs` | CHANGED (2 pairs removed) | `check-validator-parity.test.mjs` (updated) | governs the reduced shell set | existing cross-OS step | enforcing |
| `check-trigger-fixtures.mjs` | CHANGED (roster externalized) | `check-trigger-fixtures.test.mjs` (updated) | not in remit | existing cross-OS step | enforcing (unchanged) |
| `check-heading-case.mjs` (C-14) | NEW `.mjs` | `check-heading-case.test.mjs` | not added | one cross-OS step, `continue-on-error` first | advisory -> enforcing after WS-T8 normalization (C-15 catch-up) (OQ-6) |
| output-eval lane | NEW workflow | reuses `output-eval.workflow.test.mjs` | n/a | its own `output-eval.yml` (dispatch + cron) | advisory (dry-run default; live leg key-gated) |
| release-please | NEW workflow | n/a (action) | n/a | its own `release-please.yml` | shadow -> authoritative (ZD-4) |

## Staged-workstream thin specs

Committed in principle; executed at follow-on tags behind the named trigger. Not fully specified here (each gets its own release plan when promoted).

### WS-Z7 - Memory (R-22; F-48 project state)

Revive the already-parked plan at [`../_unreleased/project-memory/plan_project-memory.md`](../_unreleased/project-memory/plan_project-memory.md) (and its `spec_project-memory.md`) as its own release; do NOT re-spec it here. This section carries ONLY the integration deltas that bind it to this program:
- **Artifact ledger.** The gitignored project-memory file (`.claude/pm-skills.local.md`) doubles as the orchestrator's artifact ledger, so memory + provenance + orchestrator threading are one mechanism, not three (audit sharpening of the declared bet).
- **Provenance stamping alignment.** The memory write convention aligns with the maintainer-local innovation X-3 (skills stamp `generated-by: <skill>@<version>`), so the ledger rows and the artifact frontmatter share one schema.
- **Promotion trigger:** v2.31.0 shipped + the orchestrator artifact-ledger interface agreed. **Target:** v2.32.0.

### WS-Z8 - Typed handoff envelope (R-23)

- An optional per-skill `## Handoff` YAML block declaring the structured fields a skill emits; the orchestrator `--thread` passes those typed fields instead of a raw artifact reference.
- Ties to the maintainer-local innovation X-2 (machine-readable artifact contracts): the `## Handoff` block is the first typed edge, and it becomes checkable rather than conventional.
- **Promotion trigger:** X-2 direction ratified with a schema for at least one artifact family. **Target:** v2.32.0+.

### WS-Z9 - Coverage offense (R-24)

- The C3 AI-product family first, per the maintainer-local June roadmap; every new skill ships eval-complete from day one (trigger fixtures + output scenarios present at merge, not backfilled).
- **Promotion trigger:** the eval-complete-from-day-one gate is live (rides WS-Z5's fixture contract as an enforced merge requirement for new skills). **Target:** v2.32.0+; full spec at its own release plan.

### WS-Z10 - Eval completion catalog-wide (R-21 tail)

- Trigger fixtures + output scenarios for all 68 skills; feeds the maintainer-local innovation X-1 (PM-Bench: publish the benchmark, not just the results).
- **Promotion trigger:** wave-1 backfill (WS-Z5) green + the output-eval lane stable for two releases. **Target:** v2.31.x rolling into v2.32.0.

## Backout and rollback

Each piece is independently reversible, which is what makes the shadow-first rollout safe:

- **release-please (WS-Z1).** Delete or disable `.github/workflows/release-please.yml`. The `release-please-config.json` and `.release-please-manifest.json` are inert data files with no effect when the workflow is absent; the `extra-files` annotations in the manifests + README are harmless comments. The manual 6-gate runbook resumes with zero migration.
- **Generators (WS-Z2/Z3).** The generated blocks are plain committed markdown between markers; if a generator is reverted, the last generated content simply stops updating (it does not break the page). Removing the `--check` steps from `validation.yml` demotes the gate without touching content.
- **Ported validators (WS-Z4).** The retired `.sh`/`.ps1` are recoverable from git history; re-adding their `validation-manifest.yaml` rows + validation.yml steps restores the shell path if the `.mjs` port regresses. The port is not merged until fixture-parity is proven (REQ-Z4.3), so this should never be needed.
- **Eval lane (WS-Z5).** A scheduled/dispatch workflow with `dry_run` default true and a key-gated live leg cannot fail a normal PR; disabling it is deleting one workflow file.

The rule: nothing in this program removes a capability that cannot be restored from git in one commit, and no automation is given tag-cutting authority until it has matched the manual process once (ZD-4).

## Open questions

- **OQ-1 (manifest seed).** Seed `.release-please-manifest.json` with `2.30.0` or `2.29.1`? Depends on whether v2.30.0 trust-repair ships before this automation lands. Resolve at go-live.
- **OQ-2 (array jsonpath).** Confirm the release-please GenericJson updater accepts `$.plugins[0].version` (array-index jsonpath) against `marketplace.json` on the shadow run; if not, fall back to a generic block annotation in that file.
- **OQ-3 (manifest description tail).** The three manifest descriptions carry a long AUTHORED per-version history tail that is not derivable from `skill-manifest.json`. Fork: (A) generate only the leading counts + latest-theme sentence and keep the historical tail authored below a marker; (B) retire the historical tail entirely and generate the whole string; (C) move the history to the site and keep the manifest description short + fully generated. Recommend C (shortest manifest, least drift), decide before REQ-Z2.5 is built.
- **OQ-4 (README boundary). RESOLVED 2026-07-04 by ZD-2 = A:** nothing moves to the site; the README keeps every section, with the catalog, badges, and release mirrors generator-owned inside markers.
- **OQ-5 (output-eval live leg).** Which model + key + cost ceiling + cron frequency for the live leg (REQ-Z5.4); dry-run is free, the live leg is metered.
- **OQ-6 (heading lint enforcement).** Ship `check-heading-case.mjs` advisory, normalize headings in C-15, then flip enforcing in this release or the next? (The corpus currently violates it, P2-2.)
- **OQ-7 (tag format).** Confirm release-please produces `v<version>` tags (not bare `<version>`) under manifest mode with the `"."` package, so existing `vX.Y.Z` tooling and release URLs keep resolving.
- **OQ-8 (runbook retention).** After ZD-4 authoritative cutover, keep the manual 6-gate runbook indefinitely as a documented fallback, or archive it? Recommend keep as fallback (the automation still needs a human to enrich the CHANGELOG and cut the tag by merging the Release PR).
- **OQ-9 (pre-commit friction, C-19).** Ship the pre-commit as a committed config that contributors must install, or as an optional documented git hook? A required hook cuts drift earlier but adds newcomer friction against the audit's bus-factor goal (X-10 contribution fast lane). Recommend optional-but-documented, with CI as the real gate.
- **OQ-10 (eval roster data file, REQ-Z5.3).** One shared roster/collision-pairs data file consumed by both `check-trigger-fixtures.mjs` and `check-new-skill-collision.mjs`, or two? And does it live in `scripts/` beside `validation-manifest.yaml` or under `scripts/data/`? Recommend one shared file under `scripts/data/eval-roster.json` (single source; both validators import it).

All ten open questions are maintainer-resolved at Phase 0 (see the plan's Execution phases) before the dependent requirement is built. None blocks authoring the config + workflow + marker sketches above, which are already concrete against this repo's real files; the OQs refine execution detail, not the shape of the interfaces.
