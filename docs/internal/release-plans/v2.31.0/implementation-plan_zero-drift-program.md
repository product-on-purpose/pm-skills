# Implementation Plan: the zero-drift program (v2.31.0) - DRAFT for review

**Status:** DRAFT for maintainer review.
**Owner:** Maintainers
**Agents:** every task and PR below carries one of `agent:codex` (generators, validators, CI, workflows), `agent:claude` (content, docs, fixture authoring), `agent:human` (tokens, merges, decisions).
**Created:** 2026-07-03 | **Previous:** the last shipped document of this artifact type is [`../v2.29.0/implementation-plan_build-risk-review.md`](../v2.29.0/implementation-plan_build-risk-review.md); the immediately preceding release, v2.30.0 (trust repair), has no separate implementation-plan file, its [`spec_trust-repair.md`](../v2.30.0/spec_trust-repair.md) carries file-level detail inline instead.
**Companion docs:** [`plan_v2.31.0.md`](plan_v2.31.0.md) (scope, workstreams WS-Z1..WS-Z10, decisions ZD-1..ZD-5, exit criteria - authoritative on sequencing) and [`spec_zero-drift-program.md`](spec_zero-drift-program.md) (REQ-Z*.* requirements, interface sketches, durable CI inventory - authoritative on requirements). Also reference (do not modify) `release-please-primer.md`, the release-please learning walk-through drafted in parallel into this same directory, as the deeper mechanics reference for WS-Z1. Where this file appears to conflict with the spec, the spec wins; one such conflict was found and is resolved in Notes.

Task-ordered build for the six core workstreams (WS-Z1 release automation, M-21/#136; WS-Z2 generated surfaces; WS-Z3 notes dedup; WS-Z4 dual-shell port wave 1; WS-Z5 eval industrialization; WS-Z6 trust posture, both M-36 provisional and R-25) plus the four catch-up slots (C-14, C-15, C-19, C-20; owned by the v2.30.0 trust-repair plan's WS-T8/WS-T11, executed here only on verified slip) and thin staged-scope handling for WS-Z7..WS-Z10. Catalog is unchanged at 68 skills / 6 sub-agents; nothing here adds or removes a skill.

---

## 1. Task order: the shadow-then-cutover sequence

### 1a. Build order

Generators land before automation, because release-please's README annotations must sit on lines the generator already keeps stable (plan_v2.31.0.md, "Dependencies and sequencing rationale").

| Step | Task | Workstream | Gate before advancing |
|---|---|---|---|
| T1 | `gen-derived-surfaces.mjs` core: README catalog/badges + manifest descriptions, generated in place (ZD-2 = A, decided 2026-07-04: no slimming) | WS-Z2 | `--check` green both OS legs |
| T2 | Extend the generator: single-source QUICKSTART + compat matrix | WS-Z2 | `--check` green; both quickstarts render identical counts |
| T3 | Notes dedup on top of the generator | WS-Z3 | route-parity green, no URL lost |
| T4 | release-please shadow bootstrap: config + manifest + README annotations | WS-Z1 | annotations sit on generator-stable lines; no workflow yet |
| T5 | release-please workflow + token; shadow observation begins | WS-Z1 | first Release PR opens with green `validation.yml` (proves ZD-5, the token/PAT decision) |
| T6 | Port wave 1: the two awk-fragile validators to `.mjs` | WS-Z4 (R-18, dual-shell port; R-19, CI ergonomics) | fixture-parity 100% vs. the v2.30.0 WS-T9 (dual-shell containment + fixture tree) tree |
| T7 | Fixture backfill + output-eval lane | WS-Z5 (R-16, eval backfill; R-17, output-eval CI lane) | coverage >= ~65%; lane green in dry-run |
| T8 | Trust posture + catch-up reconciliation (C-14/C-15/C-19/C-20, expected no-op; owner v2.30.0) | WS-Z6 (R-25, trust posture) + catch-up slots | SECURITY.md + provenance page published |
| T9 | Full regen + release-surface sweep A-J | all | grep count-sweep near-zero |
| T10 | G1 Codex adversarial review, base `v2.30.0` | all | no unresolved Blocker/Major |
| T11 | Pre-tag validator bundle `--strict`, both shells | all | bundle green |
| T12 | Cutover decision (ZD-4) + tag v2.31.0 | WS-Z1 | see 1b/1c |

### 1b. The shadow-then-cutover sequence for WS-Z1

v2.31.0 is the first release where release-please exists at all, so it cannot be cut authoritatively by release-please: there is nothing yet to compare a Release PR against. v2.31.0 is therefore the "one release" that gets **observed** in shadow (S1); authoritative cutover (S2) is a later-tag decision by construction, not an oversight.

| State | What happens | Who cuts | Exit gate to advance |
|---|---|---|---|
| S0 | config + manifest + workflow merged (T4/T5); token (ZD-5) set | manual 6-gate runbook | workflow runs on `main` without error; a Release PR appears |
| S1 (this cycle) | shadow: the Release PR is observed and diffed against the manual cut, never merged | manual 6-gate runbook | the diff is recorded at G4 (section 7) as the S1 exit-gate evidence |
| S2 (a later tag, not this cycle) | authoritative: merging the Release PR IS the cut | release-please | the recorded S1 diff shows zero hand-fixes needed; maintainer ratifies |

### 1c. Cutover checklist (gates S1 -> S2 authority transfer)

None of these are satisfied within v2.31.0 itself; they are the criteria the maintainer checks before ever ruling ZD-4 to S2 at a later tag.

- [ ] At least one full release cut where the shadow Release PR's version bump + CHANGELOG notes matched the manual cut exactly (S1 exit gate, ZD-4 option A).
- [ ] Zero hand-fixes were required to the shadow PR's diff.
- [ ] The token (ZD-5) is proven to trigger `validation.yml` on the Release PR itself (green CI observed on the PR, not just on `main`).
- [ ] The generators (WS-Z2/Z3) are landed and stable, so the shadow PR's diff is a clean version-only signal, not manual-vs-generated churn.
- [ ] A PR-title lint (ZD-3) is active, since squash-PR titles become load-bearing the moment release-please derives the bump from them.
- [ ] Before any S2 authoritative merge, the Release PR branch has run `node scripts/gen-derived-surfaces.mjs` and committed the regenerated mirrors (the README recent-releases block, the site `changelog.md` top mirror, and the `releases/index.md` rows); otherwise the enforcing `--check` fails on `main` immediately after the merge, because release-please updates `CHANGELOG.md` without regenerating the surfaces derived from it (panel R1 finding).
- [ ] Maintainer (`agent:human`) explicitly ratifies the cutover; no agent may self-promote S1 to S2.

### 1d. The manual runbook's status

Never deleted. Per OQ-8 (runbook retention), it is retained indefinitely as the documented fallback for a release-please outage or a wrong bump, even after S2 (the automation still needs a human to enrich CHANGELOG and merge the Release PR). Through v2.31.0 it remains the sole authority; nothing here demotes it further than "possible future fallback."

---

## 2. PR breakdown

Thirteen squash PRs cover the required categories; three more are catch-up slots (owned by v2.30.0 WS-T8/WS-T11 per plan_v2.31.0.md's reconciliation; open one only for pieces v2.30.0 verifiably did not land). Titles are conventional-commit style; `Z1`..`Z6` abbreviate the WS-Z workstream numbers.

| # | Title | WS | Key files | Agent | Validators green | Depends-on |
|---|---|---|---|---|---|---|
| PR1 | feat(gen): add gen-derived-surfaces.mjs core (catalog + manifest desc) + README in-place conversion | Z2 | `scripts/gen-derived-surfaces.mjs`, `.test.mjs`, `README.md` | codex | `--check`, `lint-skills-frontmatter` | v2.30.0 tagged |
| PR2 | feat(gen): single-source QUICKSTART + site quickstart | Z2 | `QUICKSTART.md`, site quickstart, shared fragment | codex | `--check`, route-parity | PR1 |
| PR3 | feat(gen): generate sub-agent compatibility matrix | Z2 | `sub-agent-compatibility.md`, client-support data file | codex | `--check` | PR1 |
| PR4 | fix(docs): dedupe release-note mirrors into one generated recent-releases mirror | Z3 | `README.md`, site `changelog.md`, `releases/index.md` | claude | `--check`, route-parity, rendered-links | PR1 |
| PR5 | chore(release): bootstrap release-please shadow config | Z1 | `release-please-config.json`, `.release-please-manifest.json`, README annotations | codex | JSON validity, manual diff review | PR1; ZD-5 token issued |
| PR6 | ci(release): add release-please workflow + About sync | Z1 | `.github/workflows/release-please.yml` | codex + human | workflow lint; shadow run observed | PR5 |
| PR7 | refactor(ci): port check-count-consistency to single-source mjs | Z4 | `scripts/check-count-consistency.mjs`, `.test.mjs` | codex | fixture-parity vs. v2.30.0 tree | v2.30.0 WS-T9 tree shipped |
| PR8 | refactor(ci): port validate-skill-family-registration + CI ergonomics | Z4 (+C-19 catch-up) | `validate-skill-family-registration.mjs`, `validation-manifest.yaml`, `validation.yml` | codex | fixture-parity, `check-validator-parity` | PR7 |
| PR9 | feat(evals): trigger-fixture backfill, define- cluster | Z5 | `skills/define-*/evals/trigger-fixtures.json` | claude | `check-trigger-fixtures` | v2.30.0 WS-T10 roster shipped |
| PR10 | feat(evals): trigger-fixture backfill, discover- cluster | Z5 | `skills/discover-*/evals/trigger-fixtures.json` | claude | `check-trigger-fixtures` | PR9 |
| PR11 | feat(evals): trigger-fixture backfill, deliver-/meeting- remainder | Z5 | `skills/{deliver,foundation-meeting}-*/evals/...` | claude | `check-trigger-fixtures` | PR10 |
| PR12 | ci(evals): output-eval lane + published evals page | Z5 | `.github/workflows/output-eval.yml`, site evals page | codex + human | dry-run green | PR11 |
| PR13 | docs(trust): SECURITY.md expansion + provenance page | Z6 | `SECURITY.md`, site trust page | claude | rendered-links, root-doc-links | PR1 |

Catch-up PRs (owned by v2.30.0 WS-T8/WS-T11; open one ONLY for pieces v2.30.0 verifiably did not land, per its gate ledger, and otherwise record the row as delivered; if executed and the cut runs long, split to v2.31.1):

| # | Title | WS | Key files | Agent | Validators green | Depends-on |
|---|---|---|---|---|---|---|
| PR14 (catch-up) | docs(skills): canonical skeleton doc + heading-case lint | C-14 | skeleton canon doc, `check-heading-case.mjs` + `.test.mjs` | claude + codex | lint runs advisory | PR1 |
| PR15 (catch-up) | fix(skills): WNTU backfill + description Batch 5 | C-15 | 4 contract-skill SKILL.md, ~8 weak descriptions | claude | reciprocity, trigger fixtures | PR9-11 |
| PR16 (catch-up) | chore(hygiene): orphan cleanup + tool-family versioning | C-20 | orphan scripts removed, 15 tool-family SKILL.md | codex + human | full unit suite | PR8 |

The release-please Release PR itself (opened automatically once PR6 lands) is not a numbered program PR: it is a recurring bot artifact, observed per section 1b, never merged this cycle.

---

## 3. Release-please implementation: executable tasks

Realizes WS-Z1 (release automation, M-21/#136), REQ-Z1.1 through REQ-Z1.11. Each task below is independently committable and rolls into PR5 or PR6 above.

**Z1-T1, bootstrap the manifest at the current version.** Confirm the predecessor tag at Phase 0: `2.30.0` if v2.30.0 has shipped before this lands, else `2.29.1` (OQ-1, manifest seed). Write `.release-please-manifest.json` as `{ ".": "<predecessor version>" }`. Set `bootstrap-sha` in `release-please-config.json` to the commit immediately before this task lands, bounding the first-run history scan (REQ-Z1.9).

**Z1-T2, config with extra-files.** `release-please-config.json` at repo root, `packages["."]`, `release-type: "simple"` (no language-file bump; `package.json` stays inert at 0.0.0 by design). `extra-files`: three JSON updaters by exact jsonpath, `.claude-plugin/plugin.json` (`$.version`), `.codex-plugin/plugin.json` (`$.version`), `.claude-plugin/marketplace.json` (`$.plugins[0].version`), plus a plain `"README.md"` entry invoking the Generic updater. Confirm on the shadow run that the array-index jsonpath is accepted (OQ-2); if rejected, fall back to a generic annotation in that file.

**Z1-T3, annotate README lines.** Add `<!-- x-release-please-version -->` comments to the version badge line and the "Current version" row. Both must sit inside `gen-derived-surfaces.mjs`-stable regions from PR1, not inside a `pmskills:*` marker, so the two systems never own the same line.

**Z1-T4, token decision execution (ZD-5).** **A)** a fine-grained PAT scoped to this repo, permissions Contents (read/write), Pull requests (read/write), Issues (read/write), Metadata (read-only, mandatory); **B)** a GitHub App installed on this repo with the equivalent permission set. Both satisfy REQ-Z1.6: the default `GITHUB_TOKEN` does not trigger `validation.yml` on the Release PR, which is the one surface where CI matters most. **Recommend A or B per the spec** (a fine-grained PAT is the smallest change; a GitHub App is more auditable for a public repo). Store as repo secret `RELEASE_PLEASE_TOKEN`; `agent:human` creates the token/App and the secret, an agent must not hold a PAT. Verify: the first Release PR shows green `validation.yml` (the acceptance test for REQ-Z1.6 and the S0 exit gate).

**Z1-T5, the workflow.** `.github/workflows/release-please.yml`: `on: push: branches: [main]`; `permissions: contents: write, pull-requests: write, issues: write`; `googleapis/release-please-action@v4` with `token`, `config-file`, `manifest-file` inputs; a conditional post-tag step (`if: steps.release.outputs.release_created`) running `node scripts/gen-derived-surfaces.mjs --about` and PATCHing the GitHub About text via `gh api` (REQ-Z1.7, supersedes the one-time manual About fix from v2.30.0 R-02). The exact sketch is already committed in spec_zero-drift-program.md's Interfaces section; this task commits that sketch rather than redesigning it.

**Z1-T6, CHANGELOG enrichment under ZD-1 (the hybrid).** release-please auto-inserts the `## [X.Y.Z]` heading and a commit-title-derived bullet list into `CHANGELOG.md` inside its own still-open Release PR. `agent:human` pushes an enrichment commit directly onto that PR's branch before merging: regroup bullets into Added/Changed/Fixed, add the one-sentence release theme, cross-reference the relevant WS-Z/R-IDs. This is a push to an existing bot-opened branch, not a new numbered PR in section 2. The GitHub Release body is then produced by release-please from the enriched section, so it is never a seventh hand-authored copy (REQ-Z3.6).

**Z1-T7, confirm tag format (OQ-7).** On the shadow run, confirm the produced tag is `v<version>`, matching the existing convention. If manifest mode with the `"."` package emits a bare version, add a tag-prefix override before any future authoritative cutover.

### Gate mapping: the 6-gate runbook under the automated flow

Gate definitions per `agents/pm-release-conductor.md`. "Shadow" = this release; "after cutover" = once ZD-4 reaches S2 at a later tag.

| Gate | Today (manual) | Shadow (this cycle) | After cutover (S2) |
|---|---|---|---|
| G0 Pre-tag readiness | Validators + em-dash sweep + counter audit; chains to `pm-skill-auditor` | Unchanged; still gates the maintainer's own cut | Unchanged; gates merging the Release PR (release-please does not run the auditor chain) |
| G1 Adversarial review | Maintainer attests Codex review complete | Unchanged; base = `v2.30.0` (section 7) | Unchanged; still a pre-merge human gate on the Release PR's diff |
| G2 Version + CHANGELOG prep | Manual edits to 3 manifests, README, CHANGELOG, notes | Manual edits stay authoritative; release-please's parallel PR is observed and diffed, not merged | Version + 3 manifests + README badges move via `extra-files`/annotations; CHANGELOG via release-please skeleton + Z1-T6 enrich; notes via WS-Z3 generation; plan-status flip stays manual |
| G2.5 Commit + re-verify | Commits G2 edits; re-runs G0; captures the SHA | Unchanged | Absorbed into "merge the Release PR": CI already re-verified pre-merge via the ZD-5 token; the merge-commit SHA is the tagged SHA, so manual SHA capture is removed |
| G3 Tag + push | Annotated tag on the G2.5 SHA | Unchanged (manual tag) | release-please tags + releases the moment the PR merges; "merge the PR" is the entire gate |
| G4 Post-tag hygiene | Install path, marketplace re-pin, Pages, UI body, next-cycle stub | Unchanged, plus: the shadow PR's version/notes are diffed against the manual cut and logged (S1 evidence) | Unchanged, minus the GitHub About PATCH (now automatic per Z1-T5) |

---

## 4. Agentic execution protocol

### Standing validation commands (run before opening any PR)

```bash
node scripts/gen-skill-manifest.mjs --check
node scripts/gen-skill-manifest.mjs --agents --check
node scripts/gen-derived-surfaces.mjs --check    # once PR1 lands
bash scripts/lint-skills-frontmatter.sh
node scripts/check-validator-parity.mjs
node scripts/check-trigger-fixtures.mjs
node scripts/check-route-parity.mjs
```

The full pre-tag bundle (`bash scripts/pre-tag-validate.sh` / `pwsh scripts/pre-tag-validate.ps1`) runs once, at T11 (section 1a), not per PR; per-PR validation is the relevant subset for that PR's touched surfaces.

### Regen order

`gen-skill-manifest.mjs` (+ `--agents`) -> `gen-derived-surfaces.mjs` -> site build (`cd site && npm run build`) -> `check-route-parity.mjs --update` -> `gen-resource-index.mjs`. Any PR touching skill frontmatter, a manifest description, or a generated surface reruns this full chain, in this order, before opening the PR.

### The `--check` tripwire: the one hard rule for every generator

Never hand-edit content between a `pmskills:*:start` / `pmskills:*:end` marker pair, or inside `AGENTS.md`'s existing `skills-catalog:start`/`:end` block. If a generated surface reads wrong, the fix is always upstream: edit the skill frontmatter, the shared quickstart fragment, or the per-client status data file, then rerun the generator. `--check` exits non-zero on any drift between the committed file and a fresh render, on both OS legs, exactly the failure mode it exists to catch; a hand-edit inside a marker fails the PR's CI, it does not "fix" anything. This rule is retroactive to every marker WS-Z2/Z3 introduces, the same as it already applies to `AGENTS.md`.

### Per-PR prompt seeds (representative, not exhaustive)

- **PR1 (codex):** "Write `scripts/gen-derived-surfaces.mjs` following the `gen-skill-manifest.mjs` pattern: EOL-agnostic comparison, `--check` mode, `spliceAgents`-style marker refusal. First emit target: the README catalog table, skills/foundation badges, and the three manifest description strings, inside `pmskills:catalog:start/end` and `pmskills:manifest-desc:start/end` markers. Then convert `README.md` in place per ZD-2 option A (decided 2026-07-04): keep the full document; wrap the catalog tables, badges, and count-bearing blocks in the markers the generator now owns; do not shorten or remove sections. Add `gen-derived-surfaces.test.mjs`: round-trip fidelity, `--check` both ways including a CRLF case, and marker-refusal on a missing pair. Do not touch the quickstart or the compat matrix, those are PR2/PR3."
- **PR3 (codex):** "Extend `gen-derived-surfaces.mjs` with a new emit target: the sub-agent compatibility matrix at the site's `reference/sub-agent-compatibility.md`, generated from `skill-manifest.json`'s `catalog.sub_agents` cross-joined with a new per-client status data file (native sub-agents yes/no, dispatch-skill fallback yes/no, install docs present). Replace the hand-stamped 'as of v2.16.0' matrix entirely. Add the `pmskills:compat-matrix:start/end` marker pair and extend the existing test file, do not create a second one."
- **PR5 (codex):** "Add `release-please-config.json` and `.release-please-manifest.json` per spec_zero-drift-program.md's Interfaces sketch verbatim. Seed the manifest with the version confirmed at Phase 0. Add `x-release-please-version` annotation comments to the README version badge and Current-version row, confirming both lines sit inside the generator's stable region from PR1, not inside a `pmskills:*` marker. No workflow file in this PR, config only."
- **PR7 (codex):** "Port `scripts/check-count-consistency.sh`/`.ps1` to `scripts/check-count-consistency.mjs`, preserving the total-plus-four-subcount behavior, the `count-exempt` skip, and the v2.30.0-extended phrasing set. Add `.test.mjs`. Run the v2.30.0 WS-T9 fixture tree through the old shells and the new `.mjs`; every fixture must produce the same verdict before touching `validation-manifest.yaml`. If even one fixture disagrees, stop and report the mismatch, do not delete the shell scripts."
- **PR9-11 (claude):** "Author `evals/trigger-fixtures.json` for the named cluster following the existing contract (>=16 queries, 60/40 should-trigger split, >=2 near-miss negatives at a declared partner skill, per `check-trigger-fixtures.mjs`). Register each new fixture set in the shared roster file v2.30.0 WS-T10 already created; confirm its actual path and format before writing, do not assume a new file (see Notes on the OQ-10 conflict). Do not invent a second roster mechanism."
- **PR13 (claude):** "Expand `SECURITY.md`: state what the plugin ships, that nothing executes at install (skills and docs are inert markdown; hooks are opt-in and disclosed via the local config file), and the supply-chain posture (SHA-pinned `agent-plugins` marketplace, a checksums file for the release zip). Add a matching provenance/trust page on the site and link both from the README front door and getting-started. Do not claim anything the shipped hook code does not already do, verify the opt-in and fail-open behavior against `hooks/` before writing the sentence."

### Port acceptance check (WS-Z4, PR7/PR8): what "fixture-parity" means executably

```bash
for f in <v2.30.0-WS-T9-fixture-tree>/*; do
  bash scripts/check-count-consistency.sh "$f" >/tmp/old.out; old=$?
  node scripts/check-count-consistency.mjs "$f" >/tmp/new.out; new=$?
  [ "$old" -eq "$new" ] || { echo "MISMATCH on $f (old=$old new=$new)"; exit 1; }
done
```

Illustrative only, the exact fixture-tree path and invocation shape are set by the v2.30.0 WS-T9 harness; the requirement is that the pass/fail **verdict** (exit code) matches on every fixture, not that stdout text is identical. The same pattern repeats for `validate-skill-family-registration` in PR8.

---

## 5. Staged-scope handling (WS-Z7..Z10): file the issue, touch nothing else

These four workstreams are committed in principle (plan_v2.31.0.md, "Staged scope") but explicitly not built this cycle. The entire agentic task for each is: open or update one GitHub tracking issue recording the promotion trigger and target release, cross-link the relevant parked plan or audit bet, then stop.

| Workstream | Promotion trigger (from the plan) | Agent action this cycle | Must NOT do |
|---|---|---|---|
| WS-Z7 (memory, R-22 / F-48 project state) | v2.31.0 shipped + the orchestrator artifact-ledger interface agreed | File/update a tracking issue linking [`../_unreleased/project-memory/plan_project-memory.md`](../_unreleased/project-memory/plan_project-memory.md); note the ledger + provenance delta (X-3, artifact provenance/upgrade loop) as one paragraph | Edit the parked plan; write any memory-file code or schema; touch the orchestrator |
| WS-Z8 (typed handoff, R-23) | X-2 (machine-readable artifact contracts) ratified with a schema for >=1 family | File a tracking issue naming the trigger and linking X-2 | Add a `## Handoff` block to any skill; change orchestrator `--thread` behavior |
| WS-Z9 (coverage offense, R-24) | The eval-complete-from-day-one gate is live (rides WS-Z5) | File a tracking issue naming the C3 AI-product family as the first target | Draft or scaffold any new skill in that family |
| WS-Z10 (eval completion tail, R-21) | WS-Z5 wave-1 green + the output-eval lane stable for two releases | File a tracking issue tracking remaining coverage toward 100% | Backfill fixtures beyond WS-Z5's wave-1 list; publish PM-Bench (X-1) |

Each issue is opened by `agent:human` or `agent:codex` on the maintainer's behalf, labeled per the existing effort-tracking convention, and closed only when its own release plan supersedes it.

---

## 6. File inventory

| Workstream | New | Modified / deleted |
|---|---|---|
| WS-Z1 release automation | `release-please-config.json`; `.release-please-manifest.json`; `.github/workflows/release-please.yml` | `README.md` (annotation comments only) |
| WS-Z2 generated surfaces | `scripts/gen-derived-surfaces.mjs` + `.test.mjs`; shared quickstart fragment; per-client status data file (REQ-Z2.7) | `README.md` (catalog/badge/manifest-desc regions to markers); `QUICKSTART.md`; site quickstart; `sub-agent-compatibility.md`; the 3 manifest `description` fields |
| WS-Z3 notes dedup | none, these are emit targets of the WS-Z2 generator | `README.md` (Recent Updates + 2nd changelog table to a pointer); site `changelog.md`; `releases/index.md` row |
| WS-Z4 port wave 1 | `scripts/check-count-consistency.mjs` + `.test.mjs`; `scripts/validate-skill-family-registration.mjs` + `.test.mjs` | DELETE the 5 retired `.sh`/`.ps1`/`.md` files; `validation-manifest.yaml` (2 rows removed); `validation.yml` (4 shell steps to 2 node steps + `cache: npm`); `check-validator-parity.mjs`; root `package.json` (`test` script); `CONTRIBUTING.md` |
| WS-Z5 eval industrialization | `.github/workflows/output-eval.yml`; a published evals page; ~12-15 new `evals/trigger-fixtures.json` files | v2.30.0's `scripts/trigger-eval-roster.yaml` (extend, see Notes); `check-trigger-fixtures.mjs` / `check-new-skill-collision.mjs` if not already repointed |
| WS-Z6 trust posture | a provenance/trust site page | `SECURITY.md` (expansion) |
| Catch-up slots (C-14/C-15/C-20; owner v2.30.0 WS-T8/WS-T11) | `scripts/check-heading-case.mjs` + `.test.mjs`; the skeleton canon doc | 4 contract-skill SKILL.md (WNTU); ~8 weak-description SKILL.md; 15 tool-family SKILL.md + first HISTORY rows if D-4 ratified A; orphan scripts deleted; effort-brief dirs deduped |
| Housekeeping | this file (landed) | `docs/internal/release-plans/README.md` (index row) |

---

## 7. Pre-tag runbook embodiment: cutting v2.31.0 itself

Distinct from section 3's forward-looking gate-mapping table, this is the concrete walk-through for this specific tag, per `docs/internal/release-plans/runbook_clean-worktree-cut-tag-publish.md` and the gate definitions in `agents/pm-release-conductor.md`.

- **G0 (pre-tag readiness).** Run the full validator bundle, the em-dash sweep, the counter audit (`skill-manifest.json` vs. frontmatter), and the cross-cutting audit via `pm-skill-auditor`. Because WS-Z4 ports two validators mid-cycle, G0 additionally confirms `check-validator-parity.mjs` reflects the reduced shell set with zero orphaned manifest rows.
- **G1 (adversarial review).** `codex:adversarial-review --base v2.30.0 --scope branch`, the diff base is the previous tag, per plan_v2.31.0.md's own header field ("Previous: v2.30.0"). Reviews the generators (WS-Z2/Z3), the release-please config + workflow (WS-Z1), the port's fixture-parity evidence (WS-Z4), and the new CI gates: four pieces of novel release-process automation that warrant the highest scrutiny this program has required since the v2.27.1 awk incident.
- **G2 (version + CHANGELOG prep).** Executed manually per the runbook, the shadow Release PR is observed, not merged. Bump `version` in the three manifests and README via the now-generated path (`gen-derived-surfaces.mjs`, never a hand edit); write the `[2.31.0]` CHANGELOG section; flip this plan and the spec's status to SHIPPED.
- **G2.5 (commit + re-verify).** Commit the G2 edits, rerun G0 against the new HEAD, push, capture the SHA. Additionally this cycle: diff the shadow Release PR's proposed version/notes against the manual G2 edits and record the comparison, the S1 exit-gate evidence for a future cutover ruling.
- **G3 (tag + push).** Annotated tag `v2.31.0` on the G2.5-captured SHA; push to origin.
- **G4 (post-tag hygiene).** Standard checklist (plugin install path, `agent-plugins` re-pin, Pages rebuild, GitHub Release UI body, next-cycle v2.32.0 stub), plus: confirm the About-text PATCH did not fire (it only fires on release-please's own `release_created` event, which does not happen this cycle since the manual tag is the one that ships); close any stale open shadow Release PR so it does not carry stale annotations into the next cycle.

---

## 8. Rollback notes

Restates spec_zero-drift-program.md's "Backout and rollback" as executable steps.

- **A mis-cut tag or a wrongly merged Release PR.** `gh pr close <PR#>` without merging (this is expected steady-state during the shadow phase, not an error). If a Release PR is mistakenly merged: `git tag -d v<version> && git push origin :refs/tags/v<version>`, then `gh release delete v<version> --yes`, then revert the merge commit on `main` via a normal revert PR, never a force-push.
- **release-please itself.** Delete or disable `.github/workflows/release-please.yml`. `release-please-config.json` and `.release-please-manifest.json` are inert data with no workflow to read them; the annotation comments in README are harmless markdown comments. The manual 6-gate runbook resumes with zero migration.
- **A bad generator run.** Generated blocks are plain committed markdown between markers; reverting the generator commit, or reverting a marker region via `git revert` (never a hand-edit that gets committed as if it were generated), simply stops that surface from updating. It does not corrupt the page.
- **A bad validator port (WS-Z4).** The retired `.sh`/`.ps1` files are one `git revert` away. Re-add the `validation-manifest.yaml` rows and the two per-shell `validation.yml` steps to restore the shell path. Should not be needed: the port is not merged until fixture-parity is proven (REQ-Z4.3).
- **A bad eval-lane run.** `output-eval.yml` defaults `dry_run: true` and the live leg is key-gated, so a bad run cannot fail a normal PR; disabling it is deleting one workflow file.
- **A false-positive `--check` tripwire.** Demote the `validation.yml` step to `continue-on-error: true` with a dated comment, fix the generator, then re-promote. Never hand-edit inside a marker to make `--check` pass, that defeats the property this whole program exists to establish.

Underlying rule: nothing in this program removes a capability that cannot be restored from git in one commit, and no automation is given tag-cutting authority until it has matched the manual process once (ZD-4).

---

## 9. Gate ledger (placeholder)

- [ ] G0 / G1 / G2 / G2.5 / G3 / G4, filled at cut time per [`../runbook_clean-worktree-cut-tag-publish.md`](../runbook_clean-worktree-cut-tag-publish.md). G1 diff base: `v2.30.0`.

---

## Notes

- DRAFT for maintainer review. Phase 0 decisions were ruled 2026-07-04: ZD-1 = A (hybrid changelog enrichment), ZD-2 = A (README generated in place, no slimming; the drafted B recommendation was overridden), ZD-3 = A (PR-title lint lands with the shadow config, advisory first), ZD-5 = A (fine-grained PAT as `RELEASE_PLEASE_TOKEN`); ZD-4's S2 authority ruling stays deferred to a later tag by design. Remaining Phase 0 work: confirm the M-36 (zero-drift generated surfaces) ID is free.
- **Flagged conflict, resolved toward continuity over the spec's illustrative path.** spec_zero-drift-program.md's REQ-Z5.3 and OQ-10 sketch a new roster/collision-pairs data file at `scripts/data/eval-roster.json`, as if the externalization has not happened yet. But plan_v2.31.0.md labels WS-Z5 explicitly as "continues v2.30.0 WS-T10," and v2.30.0's own spec_trust-repair.md (WS-T10) already externalizes ROSTER and COLLISION_PAIRS to `scripts/trigger-eval-roster.yaml`, consumed by `check-trigger-fixtures.mjs`, `run-router-evals.mjs`, and `check-new-skill-collision.mjs`, with all 31 existing fixture sets registered. Building a second, differently-named file in v2.31.0 would recreate the exact duplicated-source-of-truth defect this program exists to remove. This plan resolves OQ-10 as: reuse and extend `scripts/trigger-eval-roster.yaml`; do not create `scripts/data/eval-roster.json`. Per the instruction to follow the spec on conflict: REQ-Z5.3's actual requirement text ("externalized to a data file... the validators read it") is satisfied by the v2.30.0 file, only its illustrative example path is superseded. Recommend the maintainer close OQ-10 this way explicitly at Phase 0.
- **Minor gap noted, not fixed here.** plan_v2.31.0.md's "Assumes from v2.30.0" table lists the WS-T9 fixture tree as a WS-Z4 dependency but omits the WS-T10 roster file as a WS-Z5 dependency, though the workstream description says "continues." Worth a one-row addition when the plan is next touched; not fixed in this file since the brief for this document is to create it, not edit the plan.
- `release-please-primer.md` was not yet present in `docs/internal/release-plans/v2.31.0/` at the time this file was written (it is being drafted in parallel per the task brief); this file references it by name only, not as a verified link.
- No new decision is introduced by this implementation plan; ZD-1 through ZD-5 (plan) and OQ-1 through OQ-10 (spec) remain the open items, all resolved at Phase 0 per both companion docs.
- No per-workstream effort brief is created; this file plus the plan plus the spec is the complete tracking surface, consistent with the repo's no-effort-doc-bloat convention.
