# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> **Note on historical paths:** entries before v2.19.0 occasionally reference internal planning documents (for example `docs/internal/release-plans/...`). Those references are preserved as written for historical accuracy. From v2.19.0 onward, CHANGELOG entries reference public paths only.

## [Unreleased]

## [2.30.0] - 2026-07-04

**Trust repair + hygiene.** A 2026-07-04 audit found that this project's least-engineered surfaces carried its most damaging defects: the first sentence a new user reads (`QUICKSTART.md`) stated a skill count that contradicted its own sub-counts in the same line, the curated release zip omitted the `agents/` and `hooks/` directories the dispatch skills need at runtime while still shipping the internal-docs tree, and `utility-pm-skill-builder` (the gate for all new skill creation) carried a hand-maintained inventory blind to 22% of the catalog. This release fixes every instance of that defect class across the front-door surfaces and closes the gate holes that let it pass green CI, then extends the same hygiene pass to headings, descriptions, dual-shell validators, the trigger-eval roster, and tool-family versioning. No new skills; catalog stays 68 skills (30 phase + 11 foundation + 12 utility + 15 tool), 6 sub-agents unchanged. Additive MINOR (the distributed release zip gains content).

### Added

- `scripts/check-count-phrases.mjs` (+ unit test): derives the true catalog total, the four family sub-counts, the sub-agent count, and a sample-file floor from disk, then fails on stale count-bearing phrase variants the canonical `check-count-consistency` cannot see: "N shipped PM skills", "N skill definitions", "N+ sample outputs", and the "N sub-agents" axis it omits entirely. Shipped advisory, then promoted to ENFORCING for this tag once the repo-wide grep sweep returned zero live stale hits.
- `scripts/check-heading-canon.mjs` (+ unit test, advisory): flags a skill's `## ` heading whose text case-insensitively matches a cross-dialect canon heading (for example "Quality Checklist" or "When NOT to Use") but whose case deviates from it.
- Zip-stage assertions in `validate-plugin.yml` (enforcing): the curated release zip must contain all 6 `agents/*.md` files and `hooks/hooks.json`, must not contain `docs/internal`, and every `utility-pm-*` dispatch skill's referenced agent file must resolve inside the stage.
- `.gitattributes` gains `export-ignore` entries for `docs/internal/`, `_agent-context/`, `.github/issues-drafts/`, and `.github/issues-archive/`, so `git archive` of a tag omits them too.
- A Skeleton Canon section in the site skill-authoring guide naming the three sanctioned SKILL.md dialects (classic, contract-shaped, tool-family) and their exact heading spellings, replacing the circular "mirror the closest exemplar" standard that let a fourth dialect emerge; referenced from `utility-pm-skill-builder` and `utility-pm-skill-validate`.
- "When NOT to Use" sections for `define-prioritization-framework`, `discover-journey-map`, `discover-market-sizing`, and `measure-survey-analysis`, closing two one-way reciprocity gaps (`measure-survey-analysis` now points back to `discover-interview-synthesis`; the `define-opportunity-tree` / `define-prioritization-framework` edge is now bidirectional).
- A Gemini CLI install section on the Setup by Platform site page, and a per-client "Verify It Worked" step on both `QUICKSTART.md` and the site quickstart.
- `scripts/trigger-eval-roster.yaml`: the single-source roster and collision-pair list for the trigger-eval harness, registering all 31 on-disk fixture sets (the in-code roster had drifted to 29, missing two skills).
- A committed dual-shell fixture tree (`scripts/fixtures/shell-parity/`) and `scripts/shell-parity-smoke.mjs` (+ test, advisory): runs `check-count-consistency` through both bash and PowerShell against the fixtures and fails if either shell diverges from a committed golden verdict, the minimal behavioral-equivalence guarantee the validator-parity referee cannot provide on its own.
- A first `HISTORY.md` for each of the 15 `tool-*` skills, declaring the family stable at 1.0.0 after seven releases held at 0.1.0; the HISTORY-start convention (a skill's second version, or a first bump off an unbumped 0.x baseline) is now documented in `docs/internal/skill-versioning.md`.
- Root `package.json` gains a `test` script, the single entrypoint for the full `node --test` suite; a new opt-in `.githooks/pre-commit` hook (frontmatter lint, validator-inventory parity, the unit suite) documented in `CONTRIBUTING.md`.
- A dual-shell validator freeze policy in `CONTRIBUTING.md` and the `scripts/validation-manifest.yaml` header: new validators are single-source Node (`.mjs`), not `.sh` + `.ps1` pairs; the two awk `RSTART`/`RLENGTH` scripts gain inline hazard comments against the clobber class that hung CI at v2.27.1.

### Changed

- Corrected the 67-vs-68 and 10-vs-11-foundation count drift across `QUICKSTART.md`, both site quickstart and getting-started pages, `README.md`, the three plugin manifest description headlines, and a further sweep of site reference and guide pages the same drift had reached (`project-structure.md`, `runtime-components.md`'s sub-agent catalog, `creating-pm-skills.md`, `triple-diamond-delivery-process.md`) plus the internal roadmap; replaced all seven "95+ sample outputs" mentions in `README.md` with a future-proof "200+ sample outputs" floor.
- `utility-pm-skill-builder` 1.1.2 to 1.2.0: replaced the hand-maintained "Foundation Skills (11)" inventory table, which was structurally blind to the 15-skill tool family, with an instruction to derive the live inventory from `skill-manifest.json` / `AGENTS.md` at run time.
- Cross-client documentation refreshed: the sub-agent compatibility matrix adds `pm-skill-router` (6 sub-agents total) with a current "as of v2.30.0" stamp; the platform setup guide corrects "All 4 sub-agents" to an accurate framing and adds the new Gemini CLI section; the ecosystem/MCP comparison page corrects a stale "67 shipped skills" mention and replaces the "1:1 / direct version tracking" MCP claim with the honest frozen status (40 skills at `pm-skills-mcp` v2.9.2, security-fix-only, file-install recommended); dead `docs/reference/*` path citations in three `agents/*.md` sub-agent definitions now resolve to their real site locations.
- 11 skills' headings normalized to the canon spelling ("Quality checklist" to "Quality Checklist", "When NOT to use" to "When NOT to Use", a bare "Output" / "Output format" to "Output Format").
- 8 early-cohort skill descriptions rewritten to the build-risk-review description standard (what it produces, when to use it, at least one sibling deflection): `define-opportunity-tree`, `develop-spike-summary`, `deliver-launch-checklist`, `discover-journey-map`, `discover-competitive-analysis`, `discover-stakeholder-summary`, `measure-dashboard-requirements`, `measure-instrumentation-spec`.
- `measure-okr-grader`'s scoring conventions deduplicated (Instructions now points at the Scoring Rules section instead of restating it); `define-prioritization-framework`'s phantom `deliver-roadmap` cross-reference resolved to plain prose.
- `phase-router.mjs` now honors the `phase_router` local-config opt-out (an explicit `off` value silently short-circuits the SessionStart suggestion; unset stays on); the fabricated-metric guardrail regex now requires adjacent metric context (a percent, a currency symbol, or a metric keyword) so bare dates and version strings no longer trip it; `hooks/README.md` documents the working opt-out.
- CI: `cache: npm` added to both `setup-node` steps; `validation.yml`'s hand-maintained ~21-file `node --test` list replaced by `npm test`.
- `.claude-plugin/marketplace.json`'s `ref` pinned from the rolling `main` to the `v2.30.0` tag, so marketplace installs resolve the exact tagged tree instead of whatever `main` happens to hold.
- The three plugin manifests (`plugin.json`, `marketplace.json`, `.codex-plugin/plugin.json`) bumped to 2.30.0 with refreshed narration.
- Internal-docs visibility (audit decision D-3, option B): the strategy/backlog/next planning tier and the `_agent-context/` coordination tree move to the gitignored local tier (kept on disk, no longer tracked); runbooks, `skill-versioning.md`, and the release-plans tier stay public. `check-context-currency`, whose only input just left the tracked tree, is retired.

### Fixed

- The curated release zip now stages `agents/` (all 6 sub-agent definitions) and `hooks/` (including `hooks.json`), which the dispatch skills need at runtime and which previously reached users only via `git clone`; the zip continues to exclude `docs/internal`.
- Two site quickstart link defects: a repo-relative link that 404'd on the deployed site, and a "Full documentation" link that sent readers out to GitHub instead of keeping them on the docs site.
- Four orphaned scripts (`build-skill-catalog.py` and its `__pycache__`, two one-shot frontmatter-migration scripts) deleted after verifying no live references; the two dangling mentions this uncovered were repointed at `gen-skill-manifest.mjs`.
- `.github/.created-issues.json` (issue-drafting automation state) untracked.
- Four superseded effort-brief directories deduplicated to a one-line pointer at their canonical counterpart.

## [2.29.1] - 2026-06-24

**Maintenance patch: skill docs pages no longer drop sections.** The documentation-site generator (`scripts/gen-site.mjs`) built each skill page from a fixed allow-list of H2 section names and silently discarded the rest, so any skill whose method lived under bespoke headings shipped a hollow page (missing its actual instructions). About 27 of 68 pages were affected, most visibly `foundation-build-risk-review` (its Hard gate, Modes, review contract, and Verdict routing were all dropped). No skill behavior change; catalog stays 68 skills / 6 sub-agents. PATCH.

### Fixed

- `gen-site.mjs`: the skill-page builder now renders recognized sections (When to Use, When NOT to Use, Instructions, Quality Checklist) in their slots AND every other section verbatim in document order, so no authored content is dropped. The page is a faithful rendering of the SKILL.md.
- `remark-resolve-links.mjs`: flat skill-to-skill cross-references (`../<skill>/SKILL.md`) and reference-file links surfaced by the newly-rendered sections now resolve to the published page or a GitHub source URL (they normalize to `skills/<skill>/SKILL.md`, which the slug check missed because the site groups skills under their phase).

### Added

- `scripts/check-skill-page-sections.mjs` (+ unit test, enforcing in CI): an output-based completeness gate that renders each skill page via `renderSkillPage` and fails if any SKILL.md section is missing, so the silent-drop class cannot recur.
- The section contract is documented in the skill-authoring guide and `contributing/ci-overview.md`.

## [2.29.0] - 2026-06-23

**New foundation skill: the pre-build risk gate, plus a key-free router engine.** `foundation-build-risk-review` runs a fast pre-commitment risk review on a product idea, feature request, or scope change: it names the single assumption most likely to make the work fail and returns a verdict (build small, validate first, pivot first, or don't build yet) with a no-code validation step, then routes to the next skill. Alongside it, `pm-skill-router` makes the new-skill collision gate and the trigger router-eval runnable on the subscription with no API key. Additive MINOR; catalog grows 67 to 68 skills (foundation 10 to 11), sub-agents 5 to 6.

### Added

- `foundation-build-risk-review`: a foundation skill (classification `problem-framing`) that triages a build decision and dispatches into the library. Ships SKILL.md, `references/TEMPLATE.md`, `references/EXAMPLE.md`, `references/risk-taxonomy.md` (risk types mapped to lean-canvas blocks, the L0-L4 demand hierarchy, and an evidence-strength ladder), `references/routing-map.md`, and `evals/trigger-fixtures.json`. Adapted from the open-source `bin1874/before-you-build-skill` (Apache-2.0), repositioned PM-neutral. Two modes (pre-build, feature-change); launched-product diagnosis routes to `iterate-pivot-decision`.
- `pm-skill-router` (sub-agent): a key-free router instrument. `check-new-skill-collision.mjs --emit-tasks` emits the probe tasks for it to route on the subscription (Haiku-pinned), so the collision gate no longer requires `ANTHROPIC_API_KEY` in a session; the Messages-API path stays for unattended CI. The router's verdict logic is unchanged, so baselines stay comparable.
- 3 library samples (one per Storevine / Brainshelf / Workbench thread) covering both modes and all four verdicts.

### Changed

- The documentation-site showcase (`/showcase/`) now derives its skill set from the sample files instead of a hardcoded list, so it self-heals as skills and samples are added (it had silently drifted about fifteen skills stale, showing only one of ten foundation skills).
- `iterate-pivot-decision` 2.1.0 to 2.1.1: reciprocal "When NOT to Use" pointer to `foundation-build-risk-review`.
- `utility-pm-skill-builder` 1.1.1 to 1.1.2: the collision-probe checklist points to the key-free `pm-skill-router` path.
- Counts re-derived 67 to 68 (foundation 10 to 11, sub-agents 5 to 6) across the plugin manifests, README, QUICKSTART, and the documentation site; sample corpus 207 to 210 (62 to 63 sampled skills).

## [2.28.0] - 2026-06-20

**New foundation skill: stakeholder briefings (1-to-N audience fan-out).** `foundation-stakeholder-briefings` takes any source artifact (a spec, discovery synthesis, research report, GTM plan, experiment results, or a retro) and produces one canonical master document plus a set of audience-tailored briefings, one per stakeholder lens (executive, board, engineering, UX, PMM, sales, CS, legal, data, or a custom audience). Every briefing is a traceable projection of the master: it cites the master claim IDs it draws on and carries exactly one ask, so the versions never quietly disagree. Additive MINOR; catalog grows 66 to 67 skills (foundation 9 to 10), 5 sub-agents unchanged.

### Added

- `foundation-stakeholder-briefings`: a foundation skill (classification `communication`) that fans one source into a master document plus N audience briefings. Ships SKILL.md, `references/TEMPLATE.md` (master with numbered claim IDs plus per-briefing `Draws on:` / `Primary ask:` blocks), `references/EXAMPLE.md`, `references/audience-lenses.md` (nine first-class lenses with "not this lens when" boundaries, an overlap matrix, and Custom-lens inference), `references/source-type-map.md`, and `evals/trigger-fixtures.json`.
- 18 library samples (six per Storevine / Brainshelf / Workbench thread) covering all eight source types, a Custom lens, raw/ambiguous input, and a standalone compliance review.
- `scripts/check-briefings-trace.mjs`: an advisory validator for the structural half of the master-projection contract (every briefing `Draws on:` ID resolves to a real master claim; exactly one `Primary ask:` per block). Full projection fidelity (the body introduces no untraced claim) is the skill's self-check plus review, not automated.

### Changed

- `utility-pm-skill-builder` 1.1.0 to 1.1.1: added the new skill to its Current Library Reference (foundation 9 to 10) so gap analysis sees the full inventory.
- Counts re-derived 66 to 67 (foundation 9 to 10) across the plugin manifests, README, QUICKSTART, and the documentation site; sample corpus 189 to 207 across 62 skills.

## [2.27.1] - 2026-06-16

**Maintenance patch: classification sub-count drift gate.** `check-count-consistency` now polices the four per-classification / per-phase skill sub-counts (phase, foundation, utility, tool) against their frontmatter source of truth, closing the gap that let the 26/8/6 classification split drift on a published page while CI stayed green - the gap a v2.27.0 doc-currency audit had to catch by hand. No skill behavior change; catalog stays 66 skills / 5 sub-agents. PATCH.

### Added

- `check-count-consistency` (both shells) now derives per-classification (`metadata.classification`: foundation/utility/tool) and per-phase (`metadata.phase`) skill sub-counts from frontmatter and validates the four buckets on every tracked doc surface, in both number-before ("30 phase skills") and parenthetical ("Foundation Skills (9)") forms. The check is additive - the existing total-count exemption for bucket words is unchanged, so a legitimate "30 phase skills" is still not flagged as a stale total of 66. Historical point-in-time sub-counts are handled with word-form numbers or `count-exempt` ranges (documented in `scripts/check-count-consistency.md`). Closes the carried v2.28.0-stub candidate; surfaced three stale sub-counts on first run, two not found by a manual inventory.

### Fixed

- Stale skill sub-counts surfaced by the new gate: `_workflows/triple-diamond.md` (25 to 30 phase skills), the getting-started quickstart page (65 to 66 skills, 10 to 12 utility skills, 10 to 11 command docs), and a v2.11.1 historical mention on the skill-anatomy page reworded as point-in-time ("the then-six foundation skills", which correctly describes the catalog at v2.11.1). These had drifted because the four buckets were exempt from the count gate.

## [2.27.0] - 2026-06-15

**The provable-quality release.** After v2.26.0 made every skill state when to use it, v2.27.0 makes those claims verifiable and keeps them from regressing - no new skills, just the quality machinery underneath. Trigger-accuracy evals (M-31): every measured skill carries labeled `evals/trigger-fixtures.json`, a controlled router eval scores per-skill recall/precision against a committed baseline, and new CI gates fail on routing drift or a new-skill collision. Derived surfaces (M-32): `skill-manifest.json` and the `AGENTS.md` catalog are generated from frontmatter behind enforcing staleness gates, retiring the hand-sync drift class. Output-quality evals (M-33): the harness, six family rubrics, the tested aggregation + verdict module, a three-arm informed control, and the asset-presence gate ship (per-skill results stay internal evidence). The creator/validator family now bakes the eval contract into skill creation so coverage never falls behind, and the reciprocal-boundary-pointer gate is enforcing. Additive MINOR; catalog stays 66 skills / 5 sub-agents.

### Added

- `skill-manifest.json`: a generated, committed, machine-readable catalog of all 66 skills (name, verbatim description, version, group, family, references, sample path, plus aggregate counts) built from skill frontmatter by `scripts/gen-skill-manifest.mjs`. Two new enforcing CI gates keep it and the AGENTS.md skills catalog from going stale (the same generate-plus-check pattern as the resource index). First slice of the derived-surfaces effort (M-32, issue #201).

- Trigger-fixture structure validator (`scripts/check-trigger-fixtures.mjs` + unit tests), the first slice of the v2.27.0 trigger-accuracy eval harness (M-31): validates per-skill `evals/trigger-fixtures.json` files against the published agentskills.io trigger-eval methodology (composition minimums, 60/40 train/validation split, collision-pair near-miss requirements, Phase 1 roster completeness). Wired ENFORCING in validation.yml (B-4): it fails CI on a malformed fixture or any of the 29 Phase 1 roster skills missing its `evals/trigger-fixtures.json`; the unit tests (including a filesystem-backed roster-presence guard) run in the enforcing test step.
- Trigger-eval fixtures for the full Phase 1 roster: 29 skills (the 26-skill quality-convergence cohort plus 3 collision partners) each carry `evals/trigger-fixtures.json` with 20 labeled queries (10 should-trigger, 10 should-not, 60/40 train/validation split) including near-miss negatives aimed at known description-collision partners. 580 labeled queries total; the fixture gate is green and now enforcing. Per the versioning policy below, fixture files do not bump skill versions.
- Trigger-eval harness (`scripts/run-trigger-evals.mjs` + unit tests) and a cost-gated `workflow_dispatch` lane (`.github/workflows/trigger-evals.yml`): runs fixture queries through headless Claude Code, detects Skill-tool firing, scores trigger rates against each query's label (3 runs, 0.5 threshold), reports train and validation pass rates separately, and supports a cross-skill collision false-fire sweep. The CI lane defaults to dry-run and never gates a release; the recorded baseline report is the evidence gate.
- `scripts/check-reciprocal-boundary-pointers.mjs` (+ unit tests): asserts every declared collision pair carries reciprocal "When NOT to Use" pointers (M-31, C-5) - the boundary symmetry that kept the library collision-clean. Wired ENFORCING in validation.yml (M-30 ladder): on first run it surfaced one real one-directional gap (foundation-meeting-recap lacked a body back-pointer to discover-interview-synthesis); closing that gap (foundation-meeting-recap 1.0.2) cleared the validator and promoted the gate from advisory to enforcing, so any future collision pair missing a reciprocal pointer fails CI.
- `scripts/check-new-skill-collision.mjs` (+ unit tests): the new-skill collision merge gate (M-31, B-3). Runs the controlled router eval with a newly added skill in the catalog and fails on a collision: the new skill stealing a neighbor's trigger query, missing its own, or false-firing on a neighbor's near-miss query. Neighbors are derived from fixture near-miss declarations in both directions plus the curated collision pairs. A cost-gated `collision-probe` job in `.github/workflows/trigger-evals.yml` runs it on dispatch (`new_skill=<name>`); the deterministic core is unit-tested in the enforcing CI step with no API key.
- `scripts/run-router-evals.mjs` (+ unit tests): a controlled trigger-router eval, now the trustworthy trigger instrument. Given the catalog of every skill description and one user query, it asks a model which single skill the query routes to (or none) and scores per-skill recall and precision. Because it sends a direct Anthropic Messages API call with no plugin environment, it isolates the description under test, runs cheaply and in parallel, and includes a built-in calibration self-check plus a committed-baseline drift diff. A new `router-evals` job in `.github/workflows/trigger-evals.yml` runs it cost-gated (dry-run by default) and fails on any per-skill recall or precision regression versus the committed baseline. Trigger-accuracy eval effort (M-31).
- `scripts/check-output-eval-assets.mjs` (+ unit tests): the output-eval asset-presence gate (M-33, B-7). For every skill carrying an `evals/output-scenarios/` directory it validates the scenario frontmatter, that the scenario names its own skill, that its family maps to an existing rubric, and that the brief is non-trivial. Wired advisory in validation.yml (the output-eval analog of the enforcing trigger-fixture gate); it closes the regression-protection gap that a 2026-06-14 codex adversarial review surfaced (regression-triggered evals only protect a skill if its assets are present and well-formed when its body changes).
- `scripts/output-eval-aggregate.mjs` (+ unit tests): the canonical, unit-tested un-blind + criterion-mean aggregation and the absolute-failure-first verdict for the output-eval harness (a low discrimination gap can no longer launder a sub-bar or floored skill into a non-failure). The Workflow-tool harnesses mirror it (they cannot import); the test executes the aggregation control flow they otherwise leave untested.
- `scripts/output-eval-informed.workflow.mjs` (+ source-contract test) and the three-arm functions `unblindAndAggregate3` / `gateVerdict3` in `output-eval-aggregate.mjs` (+ tests): the **informed control** (M-33, the output-eval analog of a stronger baseline; codex adversarial review finding 2). A third generation arm receives the skill's output template (structure) but NOT its instructions (rigor), so the eval separates a skill's structural value from its added rigor: skill (instructions + template) vs informed (template only) vs freehand (scenario only). Judges score all three blind with positions rotated; the verdict gains a `pass-structural` tier for "beats the freehand control but the rigor premium over template-only is thin." Run on the subscription via the Workflow tool (multi-agent opt-in), like the other output-eval harnesses.

### Changed

- AGENTS.md skills catalog is now generated between markers from skill frontmatter (run `node scripts/gen-skill-manifest.mjs --agents` after changing a skill). First generation resynced descriptions that had drifted from frontmatter, including the v2.26.0 boundary-pointer rewrites the hand-maintained catalog never received; entry formatting normalized (uniform separators, alphabetical order, sprint families in workshop sequence).
- Skill versioning policy: tooling-only files added beside a skill (eval fixtures, test artifacts) do not bump the skill's version; recorded in the versioning guide's bump table.
- `deliver-edge-cases` 2.1.1: trigger-recall patch adding intent-synonyms (failure modes, what can go wrong, race conditions, boundary and limit scenarios) to the description and "When to Use", so the skill is recognized when its domain is phrased without the literal words "edge case". Boundary pointers to neighboring skills are unchanged.
- `foundation-meeting-recap` 1.0.2: added the reciprocal "When NOT to Use" body bullet pointing to `discover-interview-synthesis` (the 1.0.1 patch added only the description sentence, which the body-scoped C-5 validator does not read). Closes the one C-5 reciprocity gap and lets that gate promote to enforcing.
- Trigger-eval methodology: the controlled router eval (`scripts/run-router-evals.mjs`) is now the trustworthy trigger instrument; the headless `claude -p` harness (`scripts/run-trigger-evals.mjs`) is retained as an integration check only, after it was found to be dominated by the host environment (other installed skills, reasoning settings, turn budget) rather than the skill description under test.
- `utility-pm-skill-builder` 1.1.0: new skills now ship eval-ready (v2.27.0 creator integration, C-1..C-4). A new "Eval Readiness" step names a skill's nearest neighbors, requires reciprocal "When NOT to Use" boundary pointers (C-3), and assigns an output-eval family rubric (C-4); the packet now scaffolds `evals/trigger-fixtures.json` (C-1) and `evals/output-scenarios/<id>.md` (C-4), and promotion runs the eval-asset gates plus the new-skill collision probe (C-2). The eval assets are required outputs in the Output Contract and Quality Checklist.
- `utility-pm-skill-validate` 1.1.0: the validation report now covers eval readiness (C-5). Three new structural checks - trigger-fixture presence/shape (B-4), output-scenario presence/shape (B-7), and reciprocal-boundary-pointer symmetry (C-5, which fails a one-directional declared collision pair) - plus the "When NOT to Use" check upgraded from INFO to WARN now that naming neighbors is a v2.26.0 convention. Each check names its authoritative CI gate; the F-11-parseable report schema is unchanged.
- `CONTRIBUTING.md`: a new "Eval Contract (what done looks like)" section documents the routing-fixture, output-scenario plus family-rubric, reciprocal-boundary-pointer, and version-history requirements for a new skill, and the CI gates that enforce them (C-6).

### Removed

- `.github/workflows/sync-agents-md.yml`: the disabled nested-layout AGENTS.md sync workflow (dead since v2.14.x), superseded by the marker-based generator and its enforcing staleness gate.

### Fixed

- `scripts/run-trigger-evals.mjs`: an `error_max_turns` result is now treated as a hard, clearly labeled failure (a session-start skill consumed the single allowed turn) instead of being misclassified as a retryable server throttle, which previously produced a false "sustained throttling" reading and burned retries.

## [2.26.0] - 2026-06-10

**The authoring and quality release.** Two new authoring surfaces close the try-then-keep loop: the `/chain` command runs any ad-hoc ordered skill sequence through the existing `pm-workflow-orchestrator` engine (no new engine, no new skill), and the new `utility-pm-workflow-builder` skill turns a proven chain (or a fresh idea) into a staged draft workflow packet for human review. The quality-convergence effort (F-12, issue #135) completed across all batches in this release: all 26 original-generation skills gained "When NOT to Use" boundary pointers and enumerated output contracts, with zero instruction rewrites and zero template or example changes. The orchestrator's native `Skill`-tool delegation path was live smoke-tested on the installed plugin before tagging (recorded PASS; downstream skills execute inline), and the procedure is now a repeatable runbook. Catalog grows 65 to 66 skills (utility 11 to 12); command files 10 to 11; sub-agents stay 5; workflows stay 12. MINOR.

### Added

- `/chain` command (F-15, issue #134): a terse front door to the `pm-workflow-orchestrator` engine's Mode B. Takes an ordered chain expression (`deliver-prd -> deliver-user-stories <context>`; `,` and `->` equivalent) plus flags (`--auto`, `--force-auto`, `--dry-run`, `--thread`), parses only the separator-driven boundary, and hands everything to the engine, which validates every name pre-flight and owns all run rules. The grammar is written down once as the Mode B Chain Expression Contract in `skills/utility-pm-workflow-orchestrator/references/PARSE-CONTRACT.md`. No new engine and no new skill; command files go 10 to 11.
- `utility-pm-workflow-builder` skill (F-14, issue #133): guided authoring from a workflow idea, a named skill list, or a promoted `/chain` expression to a complete Workflow Implementation Packet (draft `_workflows/` file, draft `workflow-*` command, cross-cutting update checklist including the validator-blind `release.yml` release-note surface) staged under `_staging/workflows/` for human review. Runs overlap analysis with a Why Gate and a >70% kill gate; refuses Tier-3 maintenance skills, dispatch skills, and workflows as steps. Ships with 3-thread library samples. Catalog grows 65 to 66 (utility 11 to 12).
- Agentic smoke-test runbook (`site/src/content/docs/contributing/agentic-smoke-runbook.md`): the repeatable procedure for running installed-plugin smoke tests headlessly via the Claude Code CLI (marketplace install, dry-run leg, live leg with checkpoint resume, pass/fail rubric, recording rule, known environment quirks). Documents why this tier is a recorded runbook gate rather than CI (per-run LLM cost, credentials, non-determinism, per-release cadence). First executed as the v2.26.0 orchestrator native-path evidence gate, which PASSED and is recorded in the Sub-Agent Compatibility Matrix.

### Changed

- `utility-pm-workflow-orchestrator` 1.1.0: the user-declared dependency flag is now named `--thread`, the completion output suggests promoting a reusable 2+ step chain to the builder, and the always-loaded description is rewritten to lead with triggers and boundaries (client-routing mechanics stay in the body). First `HISTORY.md` added.
- Measure + persona cohort quality convergence (F-12 Batch 4, issue #135; completes the 26-skill convergence effort): the four `measure-*` skills take a minor bump to 2.1.0 (`measure-dashboard-requirements`, `measure-experiment-design`, `measure-experiment-results`, `measure-instrumentation-spec`) and `foundation-persona` to 2.6.0. Same pattern: "When NOT to Use" boundary pointers and enumerated output contracts (persona already enumerates its Output Contract, so it takes the boundary section only). First `HISTORY.md` for the four skills that had none. With this batch every cohort skill carries a "When NOT to Use" section and an explicit output contract; no template or example changed anywhere in the effort.
- Discover + Iterate cohort quality convergence (F-12 Batch 3, issue #135): all seven skills take a minor bump to 2.1.0 (`discover-competitive-analysis`, `discover-interview-synthesis`, `discover-stakeholder-summary`, `iterate-lessons-log`, `iterate-pivot-decision`, `iterate-refinement-notes`, `iterate-retrospective`). Same pattern: "When NOT to Use" boundary pointers, enumerated output contracts, two untestable checklist items rewritten (the retrospective and refinement-notes "useful to someone who wasn't there" checks are now concretely verifiable). First `HISTORY.md` for the four skills that had none. No template or example changes.
- Define + Develop cohort quality convergence (F-12 Batch 2, issue #135): all eight skills take a minor bump to 2.1.0 (`define-hypothesis`, `define-jtbd-canvas`, `define-opportunity-tree`, `define-problem-statement`, `develop-adr`, `develop-design-rationale`, `develop-solution-brief`, `develop-spike-summary`). Same pattern as Batch 1: "When NOT to Use" boundary pointers, enumerated output contracts, one untestable checklist item rewritten (the design-rationale inheritance check is now concretely verifiable). First `HISTORY.md` for the seven skills that had none. No template or example changes.
- Deliver-cohort quality convergence (F-12 Batch 1, issue #135): all six `deliver-*` skills take a minor bump (`deliver-prd` 2.1.0, `deliver-user-stories` 2.1.0, `deliver-acceptance-criteria` 1.1.0, `deliver-edge-cases` 2.1.0, `deliver-launch-checklist` 2.1.0, `deliver-release-notes` 2.1.0). Each gains a "When NOT to Use" section with boundary pointers to neighboring skills; five gain an Output Format that enumerates the template sections a complete artifact fills (acceptance-criteria already had one); one untestable checklist item rewritten (the release-notes tone check is now a verifiable jargon-leak check). HISTORY rows added, with first `HISTORY.md` files for prd, launch-checklist, and release-notes. No template or example changes.

### Fixed

- Description collision pairs de-embedded across 9 skills with explicit boundary pointers (the deliver user-stories / acceptance-criteria / edge-cases trio, define-hypothesis vs measure-experiment-design, discover-interview-synthesis vs foundation-meeting-recap, iterate-lessons-log vs iterate-retrospective); the phantom `utility-slideshow-themer` reference removed from `utility-slideshow-creator`; the four sub-agent dispatch skill descriptions trimmed to their trigger surface (client-routing mechanics stay documented in the bodies). Each touched skill takes a patch bump and gains its first `HISTORY.md` (14 skills). From the 2026-06-09 repo audit; issue #135 (F-12 Batch 0).
- Docs-site landing page de-rotted: the Foundation and Utility cards now claim 9 and 11 skills (the nine cards sum to the 65-skill catalog), the cross-cutting family prose lists include `foundation-prioritized-action-plan` and `utility-pm-workflow-orchestrator`, and the Recent Releases table runs through v2.25.2.
- `AGENTS.md` and `QUICKSTART.md` entry-doc refresh: 8 stale references into the retired `docs/` tree converted to live deployed-site links; QUICKSTART now leads with the plugin-marketplace install and adds the open skills CLI path.

### Changed

- Em-dash-sweep scar cleanup across `skills/**` (56 files): every spaced-period scar in skill bodies and references swept to ` - ` or restructured; scar-only files take no version bump.
- `check-emdash-scars` (enforcing) now also scans `skills/**` hand-authored prose, so the swept corpus cannot regress (test-first scope extension).
- `check-landing-page-counts` now enforces the homepage per-family card counts (every card's claim must match the filesystem and the cards must sum to the catalog total) and the three bold family prose claims; a parse miss is itself a failure, so a homepage rewrite cannot silently disable the check.
- `check-workflow-generator-coverage` doc header, comments, and operator-facing fix messages updated from the retired Python generator to `scripts/gen-site.mjs` (text-only; the validator logic was already Pattern S correct).

## [2.25.2] - 2026-06-10

**Maintenance patch: resolves the remaining 2026-06-06 Codex audit items and hardens the release gate.** Unifies the bash/PowerShell/CI validator inventory behind a single manifest with an enforcing CI parity referee (which caught and reconciled a live drift), extends the root-document link checker to source files, promotes the em-dash-scar guard to enforcing (now multi-backtick aware), and corrects the `CLAUDE.md` "internal notes are gitignored" claim. A Codex adversarial review of the release ran first; its findings (per-leg CI parity, multi-backtick handling, a plan-wording fix) were resolved before tagging. No skill behavior change; the catalog stays 65 skills / 5 sub-agents. PATCH.

### Added

- `scripts/validation-manifest.yaml`: a single source of truth for the release-gate shell-validator inventory. Declares every `scripts/*.sh` + `*.ps1` validator once with its local pre-tag tier, CI level, and per-shell flags.
- `scripts/check-validator-parity.mjs` (+ unit tests), wired enforcing in CI on both OS legs: a referee that fails the build if the bash bundle (`scripts/pre-tag-validate.sh`), the PowerShell bundle (`scripts/pre-tag-validate.ps1`), or `.github/workflows/validation.yml` drifts from the manifest. The two local pre-tag bundles can no longer list different validator sets, and CI cannot add, drop, re-flag, or change the per-OS enforcement of a shell validator without updating the manifest (the referee compares each OS leg's args and enforcing level, not just presence). Pure Node builtins plus `js-yaml` (the existing root tooling dependency).

### Changed

- `scripts/check-root-doc-links.mjs` now also scans the source surfaces (`skills/**`, `agents/**`, `_workflows/**`, `commands/**`; 245 files) in addition to repo-root markdown, with a documented Pattern S relocation alias (`docs/<tail>` resolves to `site/src/content/docs/<tail>`) and a brace-placeholder skip for template tokens. Closes the class where source links to the retired `docs/reference/...` paths rotted after the Pattern S relocation while staying invisible to GitHub source readers.
- `scripts/check-emdash-scars.mjs` is now **enforcing** in CI (previously advisory) and skips inline-code spans (including multi-backtick spans) in addition to fenced blocks, so prose that quotes the ` . ` scar as a literal example (as the release notes do) is no longer flagged. The user-facing prose corpus is clean, so any newly introduced spaced-period scar now fails the build.

### Fixed

- Reconciled live drift between the local pre-tag bundles and CI: `validate-skill-family-registration` and `validate-plugin-install` were enforcing in `.github/workflows/validation.yml` but absent from both `scripts/pre-tag-validate.sh` and `scripts/pre-tag-validate.ps1`, so a local "ALL CHECKS PASSED" could still meet a red CI leg on a release PR. Both validators are now in the required tier of both bundles, and the new parity referee prevents the gap from recurring.
- `scripts/validate-skill-history.{sh,ps1}` now read the nested `metadata.version` (with a top-level fallback), so per-skill `HISTORY.md` validation runs against the current skill-frontmatter shape instead of silently passing.
- Repointed the release conductor and auditor agents and the release runbook from the retired `docs/{contributing,reference,releases}/` paths to their live `site/src/content/docs/...` locations, resolving the runbook-path drift noted while shipping v2.25.1.
- Corrected the project `CLAUDE.md` claim that internal notes are gitignored: `docs/internal/` is tracked and visible to anyone browsing the repo (only `_NOTES/` and `_LOCAL/` are gitignored). Closes the 2026-06-06 Codex audit's remaining correction item.

## [2.25.1] - 2026-06-06

**Maintenance patch: banks accumulated untagged work since v2.25.0.** A documentation-site internal reorg to the Product on Purpose family layout (Pattern S) with full family-standard conformance, a generated resource index and `docs/` front door, repaired root-document links plus a CI guard, an em-dash-sweep scar cleanup across user-facing and internal prose with new advisory and enforcing guards to keep them out, three site dependency bumps, and a pre-tag validator parity fix. No skill behavior change and no published-URL change: every page slug and the redirect map are preserved (route parity verified before and after). The catalog stays 65 skills / 5 sub-agents. PATCH.

### Added

- `scripts/site-base.mjs`: the single source of truth for the published base path (`/pm-skills`), in a durable form. The family Astro site standard (14.7) forbids declaring the base a second time; `site/astro.config.mjs` and `scripts/check-rendered-links.mjs` both consume it. A regression test (`scripts/check-rendered-links.test.mjs`, run in CI on both OS legs) proves a wrong base FAILS the rendered-link check rather than passing silently while the live site 404s.
- `site/public/robots.txt` pointing at the sitemap (14.9).
- The `#5C7CFA` family brand accent (`--sl-color-accent`, with per-mode low/high companions) in the site custom CSS (previously the Starlight default).
- `docs/RESOURCES.md`: a generated, CI-gated resource index linking every published page to its source-of-truth file in the repo (skills to SKILL.md, samples to the library sources, workflows to `_workflows/`, hand-authored docs to their page source). Generated by `scripts/gen-resource-index.mjs`; freshness is enforced in CI (`gen-resource-index.mjs --check`) so it cannot silently go stale.
- `docs/README.md`: a hand-authored front door for the `docs/` folder that points to the resource index.
- `scripts/check-root-doc-links.mjs` (+ unit test), wired enforcing in CI: relative links in repo-root markdown must resolve, and deployed-site URLs must map to a real route. Closes the blind spot where GitHub renders `README.md` and `CHANGELOG.md` with its own resolver, outside the Astro link pipeline, so root-document links could rot with nothing in CI to catch them.
- `scripts/check-emdash-scars.mjs` (+ unit tests), wired advisory in CI on both OS legs: a fence-aware guard, scoped to hand-authored user-facing prose, that flags residual ` . ` scars left by earlier em-dash sweeps.

### Changed

- The Astro Starlight project now lives entirely under `site/`, with rendered content in `site/src/content/docs/` read by the stock Starlight `docsLoader()`. Repo-root `docs/` is now governance and human documentation only, never built by Astro.
- Reference content (per-skill, per-workflow, showcase, commands reference, and the library samples) is now produced by one zero-dependency Node generator, `scripts/gen-site.mjs`, replacing the three Python generators. Generated content is gitignored and rebuilt on each build.
- Relative documentation links now resolve at build time via a remark transform (`scripts/remark-resolve-links.mjs`), replacing the post-build HTML link rewriter.
- `scripts/check-rendered-links.mjs`: the core link resolver now takes the base path as a parameter (default from `scripts/site-base.mjs`) with a guarded CLI entry, so the base is testable and never redeclared. Behavior is otherwise unchanged.
- Astro pinned to the family-shared `6.4.2` (was `6.3.3`); the committed lockfile resolves it for reproducible, family-aligned builds (14.8).
- `.nvmrc` bumped to Node `24` (Active LTS); CI pins Node from `.nvmrc` via `node-version-file`. `.github/workflows/create-issues-from-drafts.yml` now reads its Node version the same way instead of a hardcoded `22.12`. The site `package.json` keeps `engines.node >=22.12.0` (Astro 6's floor).
- Dependabot now tracks the relocated site dependencies (added a `/site` npm block).
- Site dependency bumps in `/site`: `@astrojs/starlight` `0.39.2` to `0.39.3`, `dompurify` `3.4.4` to `3.4.7`, and `astro-mermaid` `2.0.1` to `2.0.2`.
- `check-frontmatter-yaml.mjs` gains a `--site-docs` mode, wired enforcing in CI, so unquoted-colon and other YAML frontmatter defects in Astro doc bodies are caught early.
- Refreshed the sprint skills overview copy and the site changelog frontmatter wording.
- Widened the site content area (`--sl-content-width` to `60rem`) and stacked the showcase company cards into a single column.
- `scripts/pre-tag-validate.ps1` reconciled with the bash bundle and CI: dropped two phantom required validators that no longer exist on disk (so the PowerShell bundle could never reach "ALL CHECKS PASSED" on Windows), added `check-skill-sample-coverage` for parity, and restored the advisory tier. The required inventory now matches `pre-tag-validate.sh` exactly.

### Removed

- The three Python page generators and the post-build HTML link rewriter, superseded by `scripts/gen-site.mjs` plus `scripts/remark-resolve-links.mjs`.
- The committed-generated-content drift guard and the generated-freshness check: generated content is now gitignored and rebuilt each build, so there is no committed drift surface to guard.
- Two filesystem-based internal-link validators, superseded by the build-aware rendered-link check (`scripts/check-rendered-links.mjs`) that validates the built site for zero broken links.
- The dead gitignored MkDocs build fossil under `site/` (the directory is now the live Astro project home).

### Fixed

- README external links: the Jobs to be Done reference (which served an invalid TLS certificate) now points to `https://strategyn.com/jobs-to-be-done/`, and the Foundation Sprint reference (which returned 404) now points to `https://thefoundationsprint.com/`.
- Repaired root-document links after the Pattern S relocation: roughly 90 `README.md` links and several `CHANGELOG.md` links that pointed at the old `docs/` paths and 404'd on GitHub now point at the deployed docs site and the GitHub release-tag pages; the README repo-structure tree was refreshed.
- Swept residual em-dash-sweep ` . ` scars to ` - ` across user-facing prose (`CHANGELOG.md`; site doc bodies, anchor-aware; the prompt-gallery and skill-finder guides) and across an internal-prose safe subset, removing the visual scars left by earlier em-dash substitutions.

## [2.25.0] - 2026-06-03

**Activation and trust layer: the plugin's first hooks, plus an advisory output-quality CI tier.** Wires the existing 65 skills into Claude Code's platform primitives rather than adding content. No new skills (catalog stays 65; sub-agents stay 5). Additive MINOR.

### Added

- **`hooks/guardrails.mjs` (F-43)** - the plugin's first `PreToolUse` hook: opt-in house-rule guardrails. Inert until a project sets `guardrails: true` in `.claude/pm-skills.local.md`; then it blocks any `Write`/`Edit`/`MultiEdit`/`NotebookEdit`/`ExitPlanMode` (scanning `edits[]` and the plan text, so neither a multi-edit nor a plan-mode plan can slip past) that would introduce an em-dash or en-dash character (the substitution reminder is returned to the model), and warns (never blocks) on unfilled placeholders and unsourced numeric metrics. Authored in Node and dependency-free so it runs on any installer's machine; fails open on every error path. Backed by `hooks/lib/local-config.mjs` (a `.local.md` reader) and `hooks/lib/frontmatter.mjs` (a minimal, dependency-free frontmatter reader).
- **`hooks/phase-router.mjs` (F-44)** - a `SessionStart` hook that routes by Triple Diamond phase. It reads cheap repo signals (a phase-named git branch, or a recognized PM artifact present) and, only when a signal is strong and unambiguous, injects a short context note naming the phase and a few relevant pm-skills for it. With no strong signal - or when recognized artifacts point to conflicting phases - it stays completely silent rather than guessing by file order. The phase-to-skills map is read directly from `skills/*/SKILL.md` `phase:` frontmatter (dependency-free); it fails safe to silence on any error (including git worktrees, where `.git` is a file).
- **`hooks/hooks.json`** - registers both hooks (the plugin's first hooks file).
- **M-30 output-quality eval harness (Tier 1)** - three deterministic invariant validators over the recorded `library/skill-output-samples/`: `scripts/check-sample-no-placeholders.mjs` (bracket/angle placeholder markers; corpus clean), `scripts/check-sample-exact-quote-sourcing.mjs` (every source-ledger quote `S1: "..."` is an exact substring of the sample's input region; scoped to `foundation-prioritized-action-plan`; 21 quotes checked, corpus clean), and `scripts/check-sample-no-fabricated-metrics.mjs` (a percentage in output not traceable to input; heuristic, ~320 advisory findings). Wired advisory (`continue-on-error`) into `validation.yml`; the hook and validator unit tests run enforcing.

### Notes

- Hooks are a Claude Code primitive; the Codex manifest carries the version bump only.
- F-43 ships OFF by default (opt-in), so installing the plugin changes nothing about Claude's writing until a project opts in. F-44 ships ON but silent unless a repo signal is strong.

## [2.24.0] - 2026-06-01

**Plan orchestrator: the `pm-workflow-orchestrator` sub-agent + `utility-pm-workflow-orchestrator` dispatch skill, plus a `--run` handoff from `foundation-prioritized-action-plan`.** This ships the orchestrator promised on the public roadmap (originally pencilled for v2.17): a governed runner that takes one input - a saved `foundation-prioritized-action-plan` or a user-named chain of skills - and runs an ordered sequence of pm-skills against it, pausing for human go/no-go by default and refusing to advance past a failed or empty step. The plan skill iterates to v1.1.0 so it can offer to run its own runnable Section 7 prompts through the orchestrator. The catalog grows from 64 to 65 skills (utility 10 to 11; foundation unchanged at 9); sub-agents grow from 4 to 5. The orchestrator ships EXPERIMENTAL on all non-Claude clients, and the native sub-agent-to-skill (`Skill` tool) path ships EXPERIMENTAL until a live smoke test closes it. Additive MINOR: no existing skill loses behavior.

### Added

- **`agents/pm-workflow-orchestrator.md`** - the new engine sub-agent (the fifth sub-agent), the first repo agent to declare the `Skill` tool. It walks a step list, self-classifies each step PRODUCED / EMPTY / FAILED, runs CHECKPOINTED (default) or GUARDED AUTO (`--auto`), and hard-stops on a failed or empty step. It delegates to downstream skills via the `Skill` tool only - never the `Agent` tool - so it adds no chain-permission entry and spawns zero sub-agents.
- **`skills/utility-pm-workflow-orchestrator/`** - the new utility dispatch skill (the fifth `utility-pm-{role}` control panel, after critic, auditor, curator, and conductor). On Claude Code it @-mentions the engine sub-agent; on other clients it runs the same loop inline after a tool-capability pre-flight. Ships `SKILL.md`, `references/TEMPLATE.md`, `references/EXAMPLE.md`, `references/PARSE-CONTRACT.md` (the parse + step-status contract shared with the engine), and a worked library sample. `--dry-run` walks the step list without invoking consequential skills and is the recommended first run on any EXPERIMENTAL client.

### Changed

- **`skills/foundation-prioritized-action-plan/` 1.0.0 to 1.1.0** - gains an optional handoff: after Section 8, when Section 7 produced at least one runnable prompt, it offers to run those prompts through `utility-pm-workflow-orchestrator` in CHECKPOINTED mode. A `--run` flag produces the plan and hands it off in one invocation. The plan skill still never executes work-skills inline; it only ever causes execution through one explicit confirmation into the governed orchestrator. Ships the skill's first `HISTORY.md`.
- Skill counts re-derived from 64 to 65 (utility 10 to 11; foundation unchanged at 9) and sub-agent counts from 4 to 5 across `README.md`, the docs site, `AGENTS.md`, and the plugin manifests, per the count-consistency guard.

## [2.23.0] - 2026-05-31

**New foundation skill: `foundation-prioritized-action-plan`.** Turns any PM input (notes, transcripts, drafts, executive asks, raw situations) into one evidence-grounded, prioritized action plan: the critical next effort plus follow-ons, each with why, what, how, confidence, and source. It applies Theory of Constraints to rank by the single binding constraint and Cynefin to cap plan confidence (safe-to-fail probes for Complex situations, stabilization for Chaotic). Evidence is structural: a source ledger is built before analysis and every load-bearing claim cites an exact input quote, so the skill refuses to manufacture High-confidence plans for Complex or Chaotic situations. The catalog grows from 63 to 64 skills (foundation 8 to 9). Additive MINOR: no existing skill changes.

### Added

- **`skills/foundation-prioritized-action-plan/`** - the new foundation skill. Ships `SKILL.md`, `references/TEMPLATE.md`, `references/EXAMPLE.md` (a worked Complicated case), two more worked examples under `examples/` (a Complex interview transcript and a Complex executive ask, both probe-based with no High-confidence markers), `references/frameworks.md` (Theory of Constraints and Cynefin primer), `references/recommendable-tiers.md` plus the generated `references/skill-catalog.md` (the bounded, tiered set of downstream skills it may recommend), and a labeled Cynefin fixture set under `eval/fixtures/` for discrimination testing.
- **`scripts/build-skill-catalog.py`** - regenerates the tier-filtered catalog the new skill recommends from, reading skill frontmatter so it stays correct as the library grows.
- **`scripts/check-skill-sample-coverage.{sh,ps1}`** (+ companion `.md`) - a new enforcing CI gate (wired into `pre-tag-validate` and `validation.yml`) that fails the build if any phase, foundation, or tool skill is missing a `storevine`, `brainshelf`, or `workbench` library thread sample. Closes the gap where a new skill could ship with no `library/skill-output-samples/` entries (utility skills and the documented `deliver-acceptance-criteria` single-thread case are exempt).

### Changed

- Skill counts re-derived from 63 to 64 (foundation 8 to 9) across `README.md`, the docs site, `AGENTS.md`, and the plugin manifests, per the count-consistency guard.

## [2.22.0] - 2026-05-30

**Wrapper deletion (one menu entry per skill) + native Codex support.** Each skill used to appear twice in the `/` menu: once under its full name and once as a short command wrapper. The 63 hand-maintained wrappers are removed, so each capability now appears once, as the skill. Separately, Codex listed the plugin but reported "No plugin skills" because the repo shipped only a Claude manifest; this release adds a Codex-native `.codex-plugin/plugin.json`. All 63 skills, their names, and their behavior are unchanged. Ships as a MINOR: a redundant convenience layer is removed and a manifest is added; the governed capability surface (the skills) is unchanged.

### Added

- **Native Codex plugin support** - `.codex-plugin/plugin.json` so Codex packages and discovers the 63 skills the same way Claude Code does. Guarded by a new enforcing `validate-codex-manifest` CI check (identity fields: `name`, semver `version`, `skills: ./skills/`, `interface` object).

### Removed

- **The 63 hand-maintained command wrappers** in `commands/` (59 skill-backed short wrappers plus the 4 sub-agent companion commands `pm-critic`, `pm-audit-repo`, `pm-draft-changelog`, `pm-release`). Only the 10 `/workflow-*` orchestrator commands remain (73 commands down to 10). Each skill is now invoked directly by name: `/pm-skills:<skill-name>` on Claude Code, `$<skill-name>` on Codex.
- **Master-plan D6** (the contract that every sub-agent ships a companion slash command) and its `agents/_pairing.yaml` manifest. The four sub-agents are reached via their dispatch skill (`/pm-skills:utility-pm-*`) and native @-mention (`@agent-pm-skills:<name>`).

### Changed

- Cross-reference lines inside skills, samples, `_workflows/` sources, and docs that pointed at the deleted `/command` wrappers are rewritten to the portable form (bare skill name in shared content; `/pm-skills:<name>` in Claude Code usage docs). The command count is re-derived to 10 across all live surfaces.

### Migration

The short command was the skill's name with its phase prefix stripped; invoke the full skill name instead. The 10 `/workflow-*` commands are unchanged. Examples:

| Removed command | Invoke instead |
| --- | --- |
| `/pm-skills:okr-writer` | `/pm-skills:foundation-okr-writer` |
| `/pm-skills:prd` | `/pm-skills:deliver-prd` |
| `/pm-skills:hypothesis` | `/pm-skills:define-hypothesis` |
| `/pm-critic` | `/pm-skills:utility-pm-critic` (or `@agent-pm-skills:pm-critic`) |
| `/pm-audit-repo` | `/pm-skills:utility-pm-skill-auditor` |
| `/pm-draft-changelog` | `/pm-skills:utility-pm-changelog-curator` |
| `/pm-release` | `/pm-skills:utility-pm-release-conductor` |

## [2.21.0] - 2026-05-26

**Marketplace Launch (additive).** pm-skills is now published through the new `product-on-purpose` marketplace, a single home for multiple Product on Purpose plugins. This is a distribution change only: the skill catalog (63), commands (73), sub-agents (4), and all behavior are unchanged. The existing self-hosted install path keeps working, so no existing user has to act; the new marketplace is the recommended home going forward. Shipped as a MINOR because the launch is backward-compatible (nothing was removed) - the eventual old-path retirement is the breaking step and is reserved for a future major.

### Added

- **New canonical install path via the `product-on-purpose` marketplace** - `/plugin marketplace add product-on-purpose/agent-plugins` then `/plugin install pm-skills@product-on-purpose`. The marketplace is a thin registry repo that lists plugins and holds no plugin code; the pm-skills entry is pinned to the v2.21.0 tag.

### Changed

- **The recommended install path is now the `product-on-purpose` marketplace.** README and docs install instructions lead with it. The previous `pm-skills-marketplace` (self-hosted) path is retained and continues to work; existing installs are unaffected and update as before.

### Not changed

- Skill catalog: 63 skills (30 phase + 8 foundation + 10 utility + 15 tool). No skill behavior changes. Slash commands: 73. Sub-agents: 4. Workflows: 12.
- The `npx skills add` and `git clone` paths are unaffected (they do not use the marketplace).
- Doc-stack: Astro 6.3.x + Starlight 0.39.x.

## [2.20.0] - 2026-05-25

**Sprint Workflow Commands + Validation/Doc Hardening.** v2.20.0 makes the three workshop methodologies runnable as single slash commands and tightens the documentation-count validators so stale counts cannot hide in table, parenthetical, or "N command files" phrasings. No new skills (catalog stays 63); slash commands grow from 70 to 73.

### Added

- **3 sprint `/workflow-` commands** - `/workflow-foundation-sprint`, `/workflow-design-sprint`, and `/workflow-foundation-to-design` chain their per-day `tool-*-sprint-*` skills end-to-end, so the Foundation Sprint, Design Sprint, and the end-to-end arc are each invocable as one command (previously only the per-day tool commands existed). Slash commands 70 to 73.
- **Number-after and singular-noun coverage in `check-count-consistency`** - the count validator now catches stale counts phrased as facts-table rows (`| Slash commands | 73 |`), parenthetical labels (`Commands (73)`), and singular-resource-plus-count-noun (`63 skill directories`, `73 command docs`), not just `N commands` prose. Both shells.

### Changed

- **`check-agents-md-command-sync` now requires a command file for every `/workflow-` row** - an AGENTS.md `/workflow-*` table row must be backed by a real `commands/workflow-<stem>.md` file (previously a `_workflows/` source alone satisfied the check), closing a gap where an advertised workflow command could be non-functional.
- **Removed the vestigial `check-stale-bundle-refs` validator** - a v2.9.0 bundles-to-workflows terminology guard made permanently unenforceable by the later "validator bundle" terminology; deleted with its CI steps and docs. Historical references are preserved.

### Fixed

- **Stale catalog counts corrected across reference docs** - `docs/reference/ecosystem.md` (a neglected v2.12-era doc), `docs/reference/runtime-components.md`, `QUICKSTART.md`, and `docs/getting-started/{index,quickstart}.md` claimed outdated skill/command counts (40 skills; 47/39 commands); all corrected to 63 skills and 73 commands. Surfaced by the new validator coverage above.

### Not changed

- Skill catalog: 63 skills (30 phase + 8 foundation + 10 utility + 15 tool). No skill behavior changes.
- Sub-agent definitions: 4. Workflows: 12 (the 3 sprint workflows already existed as `_workflows/` files; v2.20.0 adds their slash commands).
- Doc-stack: Astro 6.3.x + Starlight 0.39.x.

## [2.19.0] - 2026-05-23

**Pre-Promotion Hardening: the validator gate now catches the v2.18.0 defect classes automatically.** v2.19.0 ships no new skills (catalog stays at 63) and is entirely focused on closing the blind spots the v2.18.0 verification arc exposed: stale counts slipping past CI, broken skill references passing every gate, dead internal links accumulating undetected, and script docs out of sync with their validators. After this release, the gate itself enforces what was previously caught only by manual review. Public surfaces (README, QUICKSTART, docs site) were also polished for the upcoming first actively promoted release.

### Added

- **`scripts/check-skill-cross-references`** (new enforcing validator, Ubuntu + Windows): scans for backtick-wrapped skill references and asserts every referenced skill resolves to an actual `skills/<name>/` directory, with an allowlist for intentional forward-references. Closes the v2.18.0 defect class where references to non-existent skills passed every gate and were caught only by manual inspection. Wired into the pre-tag bundle and `validation.yml`.
- **`scripts/validate-foundation-sprint-skills-family.md` and `scripts/validate-design-sprint-skills-family.md`** (new companion docs): the two sprint-family validators shipped in v2.15.0 without companion documentation. Both are now authored, modeled on the meeting-family pattern, covering member lists, per-skill checks, and scaffolding behavior. This let `validate-script-docs` flip to enforcing (see Changed).
- **`.gitattributes`**: pins line-ending behavior across the repo - `.sh` to LF, `.ps1` to CRLF, `.mjs`/`.js`/`.json` to LF, `.md` normalized to LF in-repo. Eliminates the "LF will be replaced by CRLF" warnings on Windows worktrees and removes a latent CRLF-shebang risk for Ubuntu CI.
- **Custom docs-site 404 page** (`docs/404.md`): replaces the bare Starlight default with a branded 404 page that includes section-root navigation links, and resolves a benign "Entry docs -> 404 was not found" message that appeared on every `astro build` run.

### Changed

- **`scripts/check-count-consistency` now scans `.mdx` files**: the `docs/index.mdx` homepage migrated to MDX in v2.14.0 but was not in the checker's file globs, which let v2.18.0 ship a stale "59 skills" headline on the docs landing page. The glob now covers `.mdx`, and the exempt-marker detector recognizes both HTML-comment and MDX-comment syntax. The README shields.io count badge is also now asserted.
- **`scripts/check-internal-link-validity` now resolves same-page `#anchor` targets and covers `README.md` and `AGENTS.md`**: previously it skipped same-page anchors entirely; it now runs a GitHub-style heading-slug resolver (code-fence aware, with duplicate-heading suffixes) and checks every `#fragment` against the resolved slugs. Root `README.md` and `AGENTS.md` are now in the fileset, and HTML `<a id>` / `<a name>` anchors are extracted into the valid-slug set.
- **`scripts/validate-script-docs` flipped to enforcing**: previously an advisory (`continue-on-error`) CI step. Now enforcing on both Ubuntu and Windows and part of the pre-tag bundle. The flip was gated on the two missing sprint-family docs (see Added).
- **`scripts/validate-version-consistency` now enforces the README version badge and the At-a-Glance "Current version" row**: previously it checked only the two plugin manifests against each other. It now also asserts that the README `badge/version-X.Y.Z` string and the At-a-Glance "Current version" cell match `plugin.json`, so a partial version bump fails CI. It is now also wired into the local pre-tag bundle on both shells, closing a gap where the bundle did not run it even though CI did; the bundle now runs 18 enforcing validators.
- **`scripts/pre-tag-validate.ps1` brought to parity with the bash bundle**: the PowerShell pre-tag script was missing `check-skill-cross-references`, `validate-script-docs`, and the `--strict` flag on `check-landing-page-counts`, so a Windows local pre-tag run could false-green past the new v2.19.0 gates. Now at full parity with the bash bundle.
- **Removed the `validate-mcp-sync` CI workflow and its script**: MCP is in maintenance mode; the workflow was observe-only (could not block merges) yet cloned the `pm-skills-mcp` repo on every push. The script, the workflow, and the companion guide are removed, and all live documentation references updated. Frozen history in past CHANGELOG and release-notes entries is preserved as-is.

### Fixed

- **23 pre-existing broken links and anchors corrected** across `docs/`, `README.md`, and `AGENTS.md`: latent before v2.19.0 because the link checker skipped same-page anchors and did not cover the repo-root files. Turning anchor resolution on surfaced 8 stale table-of-contents and nav anchors (count drift, leading-underscore slugs, merged-path slugs) and 11 broken README file links (sample paths missing the `tool-` prefix or filename suffixes; stale `getting-started-by-platform.md` and `getting-started-guide.md` paths).
- **Stale skill, command, and workflow counts corrected in `QUICKSTART.md` and `docs/getting-started/quickstart.md`**: counts were v2.14-era (40 skills, 47 commands, 9 workflows); corrected to 63 skills, 70 commands, 12 workflows.
- **Corrected an overclaim in contributor documentation** stating the local pre-tag bundle equals the full CI gate. The bundle runs the validator scripts only; the full CI gate also enforces `npm run build`, plugin-install checks, edit-link checks, and cross-doc checks. References in `docs/contributing/ci-overview.md`, `docs/contributing/release-runbook.md`, and the `pm-skill-auditor` agent definition were corrected.

### Not changed

- Skill catalog: 63 skills (30 phase + 8 foundation + 10 utility + 15 tool). No skill behavior changes.
- Slash commands: 70. Sub-agent definitions: 4. Workflows: 12.
- Doc-stack: Astro 6.3.x + Starlight 0.39.x. No changes to the agentskills.io frontmatter structure or cross-client dispatch behavior.

## [2.18.0] - 2026-05-21

**Highest-Consensus PM Skill Gaps: 4 New Content Skills.** v2.18.0 ships the four highest-consensus PM-skill gaps as a coherent slate: `discover-market-sizing`, `define-prioritization-framework`, `discover-journey-map`, and `measure-survey-analysis`. The catalog grows from 59 to 63 skills (phase skills 26 to 30). Each ships with a SKILL.md, a TEMPLATE, an EXAMPLE, a companion slash command, and 3 thread-aligned samples (Brainshelf / Storevine / Workbench). Each skill leads with epistemic discipline: it refuses to fabricate data and labels confidence honestly.

### Added

- **`discover-market-sizing`** - estimates market opportunity (TAM, SAM, SOM) by running multiple sizing frameworks (top-down, bottom-up, comparable company, analogous market), triangulating where they converge and diverge, and producing a calibrated range with source-graded confidence labels. Includes a quick-estimate mode and refuses unbounded fabrication. Companion command `/market-sizing`.
- **`define-prioritization-framework`** - runs the applicable prioritization frameworks (RICE, ICE, MoSCoW, Weighted Scoring, Kano) against a candidate list, filtered by data availability, then surfaces where the rankings agree and diverge plus an executive recommendation. Kano is gated on customer research; missing inputs produce an estimation scaffold rather than fabricated scores. Companion command `/prioritization-framework`.
- **`discover-journey-map`** - produces a customer journey map covering stages, touchpoints, an emotional curve, pain points, moments of truth, and opportunity annotations. Supports linear and cyclical journeys plus an optional mermaid timeline or flowchart. Refuses to fabricate emotional data without research input. Companion command `/journey-map`.
- **`measure-survey-analysis`** - analyzes survey results into persona segmentation, hypothesis validation, open-text thematic clustering, qualitative confidence labels, and prioritized recommendations, with explicit "what the data does NOT show" warnings. Refuses to overstate significance from weak samples or biased instruments. Companion command `/survey-analysis`.
- 4 companion slash commands (`/market-sizing`, `/prioritization-framework`, `/journey-map`, `/survey-analysis`) and 12 thread-aligned library samples (3 per skill across Brainshelf, Storevine, and Workbench).

### Changed

- Skill catalog grows from 59 to 63 (phase skills 26 to 30: discover 3 to 5, define 4 to 5, measure 5 to 6). Slash commands 66 to 70. Aggregate counts refreshed across the README, AGENTS.md, generated skill pages, the plugin manifests, and the docs site.

### Fixed

- Corrected a factually wrong README "What's New" entry that attributed these four skills to v2.10.0. Git history and the CHANGELOG confirm v2.10.0 was the utility-skill expansion (mermaid-diagrams, slideshow-creator, update-pm-skills); the four content skills are new in v2.18.0.

### Not changed

- Workflows: 12. Sub-agent definitions: 4. Doc-stack: Astro 6.3.x + Starlight 0.39.x. No changes to existing skills, the metadata-nested frontmatter structure (v2.17.0), or cross-client dispatch behavior.

## [2.17.0] - 2026-05-20

**Native Claude Code Sub-Agent Registration + Frontmatter Spec Alignment.** The 4 sub-agents (`pm-critic`, `pm-skill-auditor`, `pm-changelog-curator`, `pm-release-conductor`) now register natively on Claude Code: their definitions live in the canonical `agents/` directory, so they auto-discover and dispatch via `@`-mention (`@pm-critic`, etc.). To free the `agents/` name on case-insensitive filesystems (Windows NTFS, macOS APFS), the agent-coordination directory was renamed from `AGENTS/` to `_agent-context/`. Skill frontmatter also migrated to the metadata-nested structure per the [agentskills.io specification](https://agentskills.io/specification), and the CI validators were made bash-3.2 portable (macOS default bash). The 59-skill catalog is unchanged; cross-client clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI) keep full functionality via the dispatch skills.

### Changed

- **Renamed `subagents/` to `agents/`** so Claude Code's plugin runtime auto-discovers the 4 sub-agent definitions at the canonical path. The invalid `plugin.json` custom-path field was already removed in v2.16.1; this rename makes native discovery work without it. Native `@`-mention registration verified live on 2026-05-20 (all 4 sub-agents appear in the `@`-mention menu after `/plugin update` + `/reload-plugins`).
- **Renamed the agent-coordination directory `AGENTS/` to `_agent-context/`** (underscore-prefixed, matching the `_workflows/`/`_NOTES/` convention) to resolve the case-insensitive collision with the lowercase `agents/` directory. The singular `AGENTS.md` discovery file at repo root is unchanged.
- **Migrated skill frontmatter to the metadata-nested structure** across all 59 skills: `phase`, `classification`, `version`, and `updated` moved under the `metadata:` block, leaving only spec-recognized top-level fields (`name`, `description`, `license`, `metadata`). Validators and the doc-stack generators updated to read the nested structure.
- **`check-version-references` wired into the pre-tag bundle** as a non-blocking advisory step (F-P2-01). It surfaces version-reference drift for visibility without failing the bundle; strict enforcement awaits a precise current-version-claim heuristic (deferred to v2.17.1).

### Fixed

- **8 CI validators made bash-3.2 compatible** (audit finding F-P0-01): replaced `mapfile`/`readarray` with `while read` loops and `declare -A` associative arrays with `case`-function lookups or `grep -Fxq` set membership. Affected: `validate-agents-md`, `validate-commands`, `validate-meeting-skills-family`, `validate-foundation-sprint-skills-family`, `validate-design-sprint-skills-family`, `validate-references-cross-doc`, `validate-skill-history`. Added a non-git-work-tree fallback to `check-count-consistency` (graceful skip instead of a hard `git` error in the unpacked install cache) and a bash-version advisory preamble to `pre-tag-validate`.
- **Removed a phantom `pm-skills:README` sub-agent**: Claude Code scans every `.md` in `agents/` as a sub-agent, so the carried-over `agents/README.md` registered as a spurious agent. Removed it; the directory's purpose is documented in the doc-stack.

### Documentation

- Sub-agent docs updated for native discovery (concepts, contributing guides, reference, project structure), replacing the obsolete custom-path/NTFS-collision rationale. `sub-agent-compatibility.md` marks native `@`-mention registration LIVE; `Release_v2.16.1.md` Known Limitations and the v2.16.0 D31 amendment marked RESOLVED.
- `_agent-context/claude/CONTEXT.md` current-state refreshed (W4); fixed stale `subagents/` reference and validator-count framing (F-P2-02, F-P2-03).

### Not changed

- Skill catalog: 59 skills (26 phase + 8 foundation + 10 utility + 15 tool). Workflows: 12. Slash commands: 66. Sub-agent definitions: 4.
- Doc-stack: Astro 6.3.x + Starlight 0.39.x + Node 22.12+.
- Cross-client dispatch behavior (validated on Codex CLI at v2.16.0) is unchanged.

## [2.16.2] - 2026-05-19

**Post-v2.16.1 Audit Hygiene Fast-Patch.** The v2.16.1 G4 P0 attestation step ran the pm-skill-auditor via the dispatch-skill pattern (`/pm-skills:pm-audit-repo` on macOS Claude Code). The auditor PASSED (proved cross-client dispatch works in production), AND surfaced 6 new findings on shipped v2.16.1 state. v2.16.2 closes the housekeeping subset (1 P1 + half of 1 P2). README badge update (F-P1-01) defers to whenever the active README refactor lands; validator portability fix (F-P0-01) and CONTEXT.md Notes refresh (F-P2-02) defer to v2.17.0. Same 59-skill catalog. No skill content changes.

### Fixed

- **Refreshed `AGENTS/claude/CONTEXT.md` Status block** to reflect v2.16.1 + v2.16.2 chain. Adds attestation status for v2.16.1 G4 P0 FULL PASS (cross-platform Claude Code verification with 3 scenarios attested 2026-05-19). Closes audit finding F-P1-02 from v2.16.1 G4 P0 audit.
- **Wired `scripts/check-context-currency.{sh,ps1}`** into `scripts/pre-tag-validate.{sh,ps1}` bundle as a v2.15.1+ preventive validator. Catches future CONTEXT.md Status block drift at pre-tag time rather than via post-release audit. Closes half of audit finding F-P2-01.

### Known limitations carried forward

- **F-P1-01 (README badge stuck at v2.16.0)**: deferred to whatever release ships the active maintainer README refactor. The badge will be refreshed naturally as part of that refactor; v2.16.2 explicitly avoids touching README.md to prevent merge conflict with the WIP.
- **F-P2-01 partial (`check-version-references.sh` wire)**: deferred to the same release as F-P1-01. Wiring this validator in v2.16.2 would fail the bundle because the README badge remains stale. Will wire alongside F-P1-01 close.
- **F-P0-01 (validator portability on macOS bash 3.2 + non-git working tree)**: deferred to v2.17.0 W3. 6 of 14 validators in pre-tag-validate.sh use bash 4 features (mapfile, declare -A) or assume a git working tree; they syntax-error on macOS default bash 3.2.57. Rewriting them for bash-3.2 compat + non-git fallback is a 1-2 day effort, too large for a patch release.
- **F-P2-02 (CONTEXT.md Notes section stale v2.13.0-era counts) + F-P2-03 (enforcing validator count framing)**: deferred to v2.17.0 doc-refresh, paired with the AGENTS rename which already touches CONTEXT.md.

### Not changed

- Skill catalog count: 59 skills (26 phase + 8 foundation + 10 utility + 15 tool). Unchanged from v2.16.0 + v2.16.1.
- Workflows: 12. Slash commands: 66. Sub-agent definitions: 4.
- Doc-stack: Astro 6.3.x + Starlight 0.39.x + Node 22.12+ (unchanged).
- README.md (active maintainer WIP preserves the file state).
- All previous release content unchanged.

### Affected files

- `.claude-plugin/plugin.json` (version bump + description refresh)
- `.claude-plugin/marketplace.json` (version bump + description refresh)
- `CHANGELOG.md` (this entry)
- `docs/releases/Release_v2.16.2.md` (new release notes)
- `AGENTS/claude/CONTEXT.md` (Status block refresh)
- `scripts/pre-tag-validate.sh` (wire check-context-currency)
- `scripts/pre-tag-validate.ps1` (PowerShell parity)
- `docs/internal/release-plans/v2.16.1/plan_v2.16.1.md` (G4 status to FULL PASS)
- `docs/internal/release-plans/v2.16.2/plan_v2.16.2.md` (new master plan)
- `docs/internal/release-plans/v2.17.0/plan_v2.17.0.md` (audit finding absorption)

No skill content, command content, workflow content, sub-agent definition content, docs site content (beyond CONTEXT.md), or CI workflow files changed in v2.16.2.

## [2.16.1] - 2026-05-18

**Plugin Manifest Schema Patch.** v2.16.0 shipped with an invalid field in `.claude-plugin/plugin.json` (`"agents": ["./subagents/"]`) that caused `/plugin update pm-skills` to fail validation with `agents: Invalid input`. v2.16.1 removes the offending field. Same 59-skill catalog. Same dispatch skills. Day-to-day usage identical to v2.16.0.

### Fixed

- **Removed invalid `agents` field from `.claude-plugin/plugin.json`.** Claude Code's plugin schema does not include this field (verified against [code.claude.com/docs/en/plugins](https://code.claude.com/docs/en/plugins)). The v2.16.0 attempt to declare a custom sub-agent path via `"agents": ["./subagents/"]` was based on a schema assumption that does not hold. Removing the field allows the manifest to validate and `/plugin update` to succeed.
- **Bumped plugin.json version** from `2.16.0` to `2.16.1`.
- **Bumped marketplace.json pm-skills entry version** from `2.16.0` to `2.16.1` and refreshed the description to mention the patch.

### Known limitations (carried forward to v2.17.0)

- **Native Claude Code sub-agent registration is not active in v2.16.1.** Sub-agent definitions live in `subagents/` rather than Claude Code's canonical `agents/` directory. Auto-discovery only looks at `agents/`. Without the (invalid) `"agents": ["./subagents/"]` field, Claude Code does not register the 4 sub-agents at install time. The architectural fix requires renaming the existing tracked `AGENTS/` coordination directory (which collides with `agents/` on case-insensitive filesystems per master plan D31 amendment), then renaming `subagents/` to `agents/`. This is too large for a patch release and is deferred to v2.17.0.
- **Dispatch skills continue to work.** The 4 dispatch skills at `skills/utility-pm-{role}/` include an inline-execution path that reads `subagents/pm-{role}.md` and runs the sub-agent's logic step-by-step on any client. This path was validated for Codex CLI on 2026-05-17 (v2.16.0 GATE B + GATE C PASS) and is the carry-over path used on Claude Code in v2.16.1 until native sub-agent registration ships in v2.17.0.

### Not changed

- Skill catalog count: 59 skills (26 phase + 8 foundation + 10 utility + 15 tool).
- Workflows: 12. Slash commands: 66. Sub-agent definitions: 4.
- Doc-stack: Astro 6.3.x + Starlight 0.39.x + Node 22.12+ (unchanged from v2.16.0).
- All v2.15.0 Sprint Skills, v2.12.0 OKR Skills, v2.11.0 Meeting Skills Family content unchanged.

### Affected files

- `.claude-plugin/plugin.json`
- `.claude-plugin/marketplace.json`
- `CHANGELOG.md`
- `docs/releases/Release_v2.16.1.md`

No skill content, command content, workflow content, sub-agent definition content, docs site content, validator scripts, or CI workflows changed in v2.16.1.

## [2.16.0] - 2026-05-17

**Active Orchestration + Doc-Stack Modernization.** Two complementary tracks ship in v2.16.0.

**Primary track - Active Orchestration:** Four Claude Code plugin sub-agents codify the Phase 0 Adversarial Review Loop and the 6-gate release runbook that the maintainer already runs manually. Cross-client compatibility is delivered via dispatch skills at `skills/utility-pm-{role}/` that read the canonical sub-agent definition and execute inline on non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI). 4 dispatch skills under `classification: utility` bring the catalog to 59 skills total. The new shipping unit is the sub-agent, not the skill.

**Secondary track - Doc-Stack Modernization:** Astro 5.13.x to 6.3.x upgrade plus Starlight 0.34.x to 0.39.x plus Node 22 to 22.12+ across 5 CI workflows. Closes the 2 open Dependabot alerts that were Astro-6-dependent.

The catalog grows from 55 skills + 62 commands + 12 workflows to **59 skills + 4 sub-agents + 66 commands + 12 workflows + 28 truly-enforcing validators** (4 new dispatch skills under classification: utility; +1 validator from extension; not +4 net-new). Content-skill count (phase + foundation + tool, excluding the new dispatch utility skills) is unchanged from v2.15.0 at 55.

### Added

- **Sub-agents (new component class):** 4 Claude Code plugin sub-agents at `subagents/`. `pm-critic` runs adversarial review proactively after PM-artifact-producing skills (deliver-prd, foundation-okr-writer, foundation-meeting-recap, foundation-persona, foundation-lean-canvas, discover-interview-synthesis, and other Triple Diamond phase skills) and returns P0/P1/P2/P3 findings with concrete fix suggestions. `pm-skill-auditor` runs the full enforcing validator suite via `scripts/pre-tag-validate.{sh,ps1}` plus 14 cross-cutting checks plus aggregate counter audit against CONTEXT.md + AGENTS.md + README.md declared values. `pm-changelog-curator` drafts CHANGELOG entries from `git log` applying `CLAUDE.md` hygiene rules. `pm-release-conductor` walks 6 explicit gates (G0 Pre-tag readiness, G1 Adversarial review, G2 Version bump + CHANGELOG prep, **G2.5 Commit + re-verify**, G3 Tag + push, G4 Post-tag hygiene) with chain composition to auditor at G0 + G2.5 and curator at G2. See [runtime components reference](https://product-on-purpose.github.io/pm-skills/reference/runtime-components/).
- **G2.5 commit gate:** the conductor commits release-prep edits in their own commit before tagging. Tag only happens against the G2.5-captured SHA. This is the structural fix for the broken-tag class of bug surfaced by Codex review R01 (closed by master plan D22). Prior to v2.16, a release runbook that edited files at G2 but tagged HEAD at G3 could tag a commit that did NOT contain the release metadata.
- **6 new public docs surface:** `docs/concepts/sub-agents.md` (component class explainer), `docs/concepts/active-orchestration.md` (theme-level explainer with v2.16-v2.18 roadmap), `docs/guides/using-sub-agents.md` (overview + 4 invocation patterns + maintainer operations subsection), `docs/guides/adversarial-review.md` (pm-critic deep dive + severity grammar with worked examples), `docs/contributing/authoring-sub-agents.md` (16-item validation checklist for new sub-agents), `docs/contributing/sub-agent-design-patterns.md` (4 invocation patterns + 4 composition patterns with mermaid diagrams).
- **4 new reference + contributing docs:** `docs/reference/runtime-components.md` (sub-agents catalog with audience / trigger / lifetime / tool surface / composition / dispatch skill columns); `docs/reference/sub-agent-compatibility.md` (canonical cross-client compatibility matrix for the 4 sub-agents + dispatch skills; consolidates inline framing previously scattered across 7+ surfaces; v2.17 client-status updates now require 1-file edit); `docs/contributing/release-runbook.md` (canonical 6-gate runbook the conductor reads at invocation time per D12 referential discipline; includes mermaid flowchart of the 6-gate sequence); `docs/contributing/ci-overview.md` (map of all 9 GitHub Actions workflows + ~30 validator scripts + workflow-to-validator mapping + failure-triage pointers + mermaid flowchart of trigger -> workflow -> validator -> outcome flow).
- **12 library samples** at `library/sub-agent-samples/{pm-critic,pm-skill-auditor,pm-changelog-curator,pm-release-conductor}/` (3 thread-aligned samples per sub-agent across brainshelf, storevine, workbench narrative threads). Samples are real adversarial reviews, real audit outputs, real CHANGELOG drafts, and realistic release flows. See [`library/sub-agent-samples/README.md`](library/sub-agent-samples/README.md).
- **4 new slash commands** at `commands/{critic, audit-repo, draft-changelog, release}.md` paired with the 4 sub-agents per `subagents/_pairing.yaml` (per master plan D6).
- **4 dispatch skills (VALIDATED on Codex CLI 2026-05-17)** at `skills/utility-pm-{critic,skill-auditor,changelog-curator,release-conductor}/`. Each detects runtime and either dispatches to the native Claude Code sub-agent OR reads `subagents/pm-{role}.md` and executes inline on non-Claude clients. The conductor dispatch uses an expanded "reference + execute inline" pattern that inlines auditor + curator behaviors at G0 + G2 + G2.5 (because non-Claude clients cannot natively chain to other sub-agents). GATE B + GATE C validation evidence at [`docs/internal/release-plans/v2.16.0/gate-test-results_2026-05-17_codex.md`](docs/internal/release-plans/v2.16.0/gate-test-results_2026-05-17_codex.md). Re-runnable harness at [`maintainer-gate-testing-codex.md`](docs/internal/release-plans/v2.16.0/maintainer-gate-testing-codex.md) for users wanting to verify on a different non-Claude client.
- **Sub-agent manifests:** `subagents/_pairing.yaml` (sub-agent + companion command pairings per D29); `subagents/_chain-permitted.yaml` (allowlist of sub-agents permitted to use the `Agent` tool for chain composition per D14 + D21; v2.16 lists only `pm-release-conductor`).

### Changed

- **Sub-agents directory uses custom path `subagents/`** declared via `.claude-plugin/plugin.json`'s `"agents": ["./subagents/"]` field rather than the Claude Code default `agents/` location. Per master plan D31 amendment (added at Phase 1 Task 1 execution time): Windows NTFS and macOS APFS are case-insensitive by default; the lowercase `agents/` directory collides with the existing tracked `AGENTS/` directory (9 coordination files: AGENTS/DECISIONS.md, AGENTS/claude/*, AGENTS/codex/*). Plugin.json's custom-path mechanism bypasses the collision cleanly; cross-platform clean; no NTFS hackery required.
- **`validate-agents-md.{sh,ps1}` extended** to enumerate `subagents/*.md` files and verify each agent name appears at least once in `AGENTS.md`. Name-based check per master plan D5 + D12 (AGENTS.md references sub-agents by name; runtime-components.md is the canonical detail catalog). Existing skills/* path-based scan unchanged. Validator now reports PASS as "OK: AGENTS.md matches N skill paths" + "OK: AGENTS.md references M sub-agents".
- **`AGENTS.md`** gains a Sub-Agents section pointing to runtime-components.md catalog + 4 dispatch skill entries in the Utility Skills section.
- **`README.md`** Project Structure tree includes `subagents/` directory + `runtime-components.md` reference. Component-class list extended to include sub-agents.
- **`docs/reference/project-structure.md`** updated to list `subagents/` directory + explain the distinction from `AGENTS/`.
- **`CONTRIBUTING.md` Maintainer Notes** gains workaround #7: "Sub-agent definitions live under `subagents/` (custom path), not the default `agents/`" documenting the Windows NTFS case-collision resolution via `plugin.json` `"agents": ["./subagents/"]` field per D31 amendment. Six-workarounds heading also bumped to seven.
- **Cross-client compatibility consolidation:** the cross-client status matrix that previously lived inline in 7+ surfaces (4 dispatch SKILL.md + `runtime-components.md` per-row + `CHANGELOG.md` Known Limitations + `Release_v2.16.0.md` validation results + `concepts/sub-agents.md` cross-client section + `getting-started/platforms.md` non-Claude callout + `AGENTS.md` Sub-Agents section) now links to canonical `docs/reference/sub-agent-compatibility.md` rather than duplicates content. Reduces v2.17-status-promotion-risk from a 7-file edit to a 1-file edit.
- **3 mermaid diagrams added** to v2.16-relevant docs: `docs/contributing/release-runbook.md` gets a 6-gate flowchart with universal failure exit + bypass-refusal cycle; `docs/contributing/ci-overview.md` gets a trigger-to-outcome workflow flowchart; `docs/guides/adversarial-review.md` gets a revise-recheck loop diagram with severity-based decision diamond.

### Changed (Doc-stack modernization track, 2026-05-17 spike)

- **Astro: `^5.18.1` to `^6.3.x`.** Major version upgrade. All 341 pages build clean on Astro 6.3.3 (up from ~248 at v2.15.0). Build time 10.36s vs ~17-21s on Astro 5.13.x (faster).
- **@astrojs/starlight: `~0.34.0` to `~0.39.x`.** Required by Astro 6 (Starlight 0.39 peerDeps astro `^6.0.0`). Starlight 0.39 breaking change: autogenerated sidebar groups now require wrapping in `items: [...]` array; 17 sidebar entries in `astro.config.mjs` updated.
- **Node: 22 to 22.12+ across 5 CI workflows.** `validation.yml`, `deploy-pages.yml`, `validate-plugin.yml`, `validate-mcp-sync.yml`, `create-issues-from-drafts.yml`. (Original plan list of 5 included codeql.yml + sync-agents-md.yml that do not actually use setup-node; reality list per DM7 amendment swept in 2 missing Node-using workflows.)
- **`package.json` `engines.node`** bumped from `>=22.0.0 <23` to `>=22.12.0`.
- **`astro-mermaid 2.0.1` verified compatible with Astro 6** (no upgrade needed; same 2.0.1 line). All mermaid diagrams transform cleanly under Astro 6 + Starlight 0.39.
- **`src/styles/custom.css`** unchanged (no port required; existing mermaid theming works under Astro 6).
- **MCP CI hygiene (M-22 maintenance posture alignment).** Layer 1: `validate-mcp-sync.yml` made fully advisory with `continue-on-error: true` on both embed and validate steps (closes a CI false-positive red on every push since v2.15.0). Layer 2 (cross-repo, pm-skills-mcp PR #50): `embed-skills.js` adds `'tool'` to SKILL_CLASSIFICATIONS and softens EMB-004 to warning for unknown classifications.

### Fixed (mid-execution scope absorbed per DM8 during 2026-05-17 doc-stack spike)

- **P1 YAML parse defect in `skills/utility-pm-release-conductor/references/EXAMPLE.md`.** Description value had unquoted colons that broke YAML mapping parsing. Single-quoted the description value.
- **Generated dispatch-skill pages had 12 broken internal links.** Markdown links like `[\`SKILL.md\`](../SKILL.md)` in source SKILL.md/EXAMPLE.md/TEMPLATE.md files broke under generator path rewriting. Converted to plain code spans; preserves file reference without markdown resolution.
- **Generator under-counted total commands by 4.** `scripts/generate-skill-pages.py` computed `total_cmd_count = skill_cmd_count + workflow_cmd_count = 62`, missing the 4 sub-agent companion commands. Now computes from filesystem (`len(COMMANDS_DIR.glob('*.md'))`) and isolates `other_cmd_count` for sub-agent commands.
- **Generator silently dropped 3 sub-agent companion command rows from `docs/reference/commands.md` table.** After the /pm-* rename, 3 of 4 utility-pm-* skills had command stems that diverged from their skill stems (`utility-pm-skill-auditor` has command `pm-audit-repo`, `utility-pm-changelog-curator` has `pm-draft-changelog`, `utility-pm-release-conductor` has `pm-release`). The generator's `derive_command_name + find_command_file` logic assumed 1:1 skill-stem-to-command-name mapping and silently dropped non-matching rows. The narrative count claim said 66 total commands but the table only rendered 63 rows. Added an orphan-command render block after the skill-command + workflow-command rows: iterates `commands/*.md` files, includes any command not matched to a skill or workflow, links to `sub-agent-compatibility.md` for context. Robust to any future commands-without-1-1-skill-match.
- **3 stale-framing fixes via late audit pass.** `docs/concepts/triple-diamond-delivery-process.md` description: "organize the 40 pm-skills" updated to "26 phase-classified pm-skills (of 59 total in v2.16.0)". `docs/reference/skill-families/foundation-sprint-skills-contract.md` + `design-sprint-skills-contract.md` coverage requirements: "v0.1.0 (current; v2.15.0 ship target)" updated to "v0.1.0 (current; SHIPPED in v2.15.0)" with parenthetical noting 3-thread coverage was authored exceeding the v0.1.0 minimum.
- **`AGENTS.md` Sub-Agents section** stale framing corrected: "Dispatch skill availability in v2.16.0 is conditional on Phase 2 spike outcomes" updated to current ship-state ("All 4 dispatch skills shipped in v2.16.0 with Codex CLI VALIDATED 2026-05-17 GATE B + C PASS").
- **Active Orchestration downstream-derived-content drift swept** (4 commits + bulk sweep): regenerated docs/skills/utility/index.md + 4 new per-skill pages (commit `1073904`); AGENTS.md command table synced for 4 sub-agent commands (`e4c7953`); docs/index.mdx + docs/skills/index.md + library/skill-output-samples/README_SAMPLES.md homepage counts updated 55 to 59 (`82df702`); 8 new doc descriptions truncated to under 300-char limit (`756df6c`); 20-file bulk count sweep updated stale "55 skills" / "62 commands" / "16 workflows" across catalog manifests, README, CLAUDE.md, getting-started, reference, guides, samples (`197d352`); broken links + generator hardening (`80f549c`).

### Security

- **Closes Dependabot alert #10 (moderate):** XSS vulnerability in Astro `define:vars` configuration. Patched in Astro 6.1.6+. v2.16.0 ships Astro 6.3.x.
- **Closes Dependabot alert #16 (low):** Server-island encrypted parameters replay vulnerability. Patched in Astro 6.1.10+. v2.16.0 ships Astro 6.3.x.
- **`gh api 'repos/product-on-purpose/pm-skills/dependabot/alerts?state=open' --jq '. | length'` returns 0** after this release merges to main.

### Process

- **Master plan ratified decisions D1-D31** with full Decision Brief format. Plan slate spans 12 files (~326 KB) across master + 5 sub-plans + 4 spec docs + open-questions log + review-findings catalog. See [`docs/internal/release-plans/v2.16.0/plan_v2.16.0.md`](docs/internal/release-plans/v2.16.0/plan_v2.16.0.md).
- **Two checkpoint reviews:** self-review (18 findings; 1 P0 + 7 P1 + 6 P2 + 4 P3) caught structural drift on the plan slate; Codex adversarial review (14 findings; 1 P0 + 6 P1 + 6 P2 + 1 P3) caught state-transition issues including the G2.5 commit gate gap. Plus the Phase 0 review on the ship state (7 findings: 0 P0 + 3 P1 + 4 P2) caught spec-vs-ship drift on the "5 gates" framing and validated the resolution of recovery paths + conductor dispatch GATE C labeling + chain-permitted enforcement documentation.

### Known limitations (carry-forward to v2.16.1 patch or v2.17.0)

- **4 dispatch skills shipped with Codex-scoped validation** per master plan D30 Option A. Codex CLI 0.128.0 PASSED GATE B (3 non-conductor dispatch skills) + GATE C (conductor dispatch sub-spike in `--dry-run` mode). LIVE release on Codex CLI not independently exercised; Cursor / Windsurf / Copilot CLI / Gemini CLI UNTESTED at v2.16.0 ship. Full safe-usage matrix + what-was-validated detail + v2.17 expansion plan in canonical [Sub-Agent Compatibility Matrix](https://product-on-purpose.github.io/pm-skills/reference/sub-agent-compatibility/). Evidence at [`gate-test-results_2026-05-17_codex.md`](docs/internal/release-plans/v2.16.0/gate-test-results_2026-05-17_codex.md). Maintainer-driven additional-client validation can be triggered by re-running the harness at [`maintainer-gate-testing-codex.md`](docs/internal/release-plans/v2.16.0/maintainer-gate-testing-codex.md).
- **5 nice-to-have CI validators deferred to v2.17:** check-runtime-components-sync (runtime-components.md table vs subagents/ directory drift); check-sub-agent-command-pair (verify _pairing.yaml against actual command files); check-em-dashes canonical (replaces the perl one-liners used during v2.16 authoring); check-aggregate-counters as extension of check-landing-page-counts (covers CONTEXT.md + AGENTS.md surfaces); chain-permitted allowlist enforcement (parse subagents/*.md for `Agent` in tools; HARD FAIL if not in `_chain-permitted.yaml`). v2.16 manual maintainer check at pre-tag pass + extended validate-agents-md cover the most critical invariants; the 5 deferrals are documented in `docs/internal/release-plans/v2.17.0/plan_v2.17.0.md`.
- **Validator regex anchoring (FN-04 from Codex Phase 0 review)** deferred to v2.17. The current validate-agents-md sub-agent name check uses substring matching against AGENTS.md; should anchor on canonical format like `- ``pm-critic``` under `## Sub-Agents` heading to prevent false positives. P2 finding per Codex severity.
- ~~Doc-stack modernization (Astro 5.13.x to 6.x upgrade)~~ SHIPPED in this release via the v2.16.0 doc-stack spike (PR #147 / commits `ed3621b`, `15aaca8`, `fa5ed8b`); 2 Dependabot alerts closed; Node 22 to 22.12+ across 5 CI workflows. See Changed > Doc-stack and Security sections above.
- **Repo hygiene sweeps** (CONTEXT.md final refresh, _working/ archive sweep, DS family validator strict promotion, backlog refresh, TODO/FIXME inventory) deferred to pre-tag artifact pass + v2.17 cleanup. CONTEXT.md refresh runs LAST per Codex R13 + master plan sequencing.
- **`.claude/pm-skills.local.md` user-settings parser** deferred to v2.17 per master plan D10. Users wanting pm-critic severity floor configuration or auto-invoke opt-out must currently copy the sub-agent to `~/.claude/agents/` and edit the description.
- **No proactive triggering on non-Claude clients.** The `description: use proactively` frontmatter is a Claude Code feature; non-Claude clients accessing pm-critic via the dispatch skill must invoke explicitly. Documented as an acceptable functional gap per master plan D7 + D30 single-tool user assumption.

## [2.15.2] - 2026-05-17

**v2.15.x Cycle Closeout + v2.16.0 Plan Reconciliation.** Same-cycle closeout patch successor to v2.15.1. No source-code, no validator behavior, no catalog changes. Pure planning-doc hygiene that closes out the v2.15.x cycle and reconciles the v2.16.0 plan slate (authored 2026-05-16 before v2.15.1 shipped) against the v2.15.1 shipped state. The 55-skill catalog and 27 truly-enforcing validators are unchanged.

### Changed

- **v2.15.x audit doc status** (`docs/internal/release-plans/v2.15.x/audit_v2.15.x_post-tag-self-review.md`): frontmatter `status: DRAFT (no items closed yet)` to `REMEDIATION SHIPPED in v2.15.1 (a108301 -> 6f89439); v2.15.2 closeout shipped`. Added a "Closure summary" section mapping each of the 18 findings (3 P0 + 3 P1 + 4 P2 + 5 P3 + 3 INFO) to the v2.15.1 commit that closed it.
- **v2.15.0 master plan "What's next" section** (`docs/internal/release-plans/v2.15.0/plan_v2.15.0.md`): item 2 status flipped from `IN PROGRESS - v2.15.1 patch cycle` to `DONE` with v2.15.1 tag SHA cross-reference. Added explicit `DONE - v2.15.2 closeout patch` row. Status block updated from `IN PROGRESS` to `TAGGED + POST-TAG CYCLE CLOSED`.
- **v2.16.0 repo-hygiene-plan.md prereqs**: CONTEXT.md refresh checkbox flipped from `[ ]` to `[x]` with v2.15.1 audit A12 closure note. Added two new prereq lines for v2.15.1 + v2.15.2 shipped state. Phase 1 scope clarified as "re-refresh after all other v2.16.0 tracks land" per Codex R13.
- **v2.16.0 ci-plan.md**: added a "v2.15.1 carry-in reconciliation" section explicitly mapping the 3 v2.15.1 validators (`check-landing-page-counts`, `check-workflow-generator-coverage`, `check-agents-md-command-sync`) against v2.16.0 planned tasks. Net-new v2.16.0 validator scope reduced from "5 new" to "2 new + 1 extension." Surfaces the design question of whether `check-aggregate-counters` extends `check-landing-page-counts` (recommended) or ships parallel.
- **v2.16.0 master plan_v2.16.0.md "Where We Are" snapshot** refreshed from 2026-05-16 (HEAD `a108301`) to 2026-05-17 (post-v2.15.2 closeout). Validator inventory updated from 24 to 27 truly-enforcing. v2.15.1 carry-ins explicitly enumerated. `pre-tag-validate` orchestration script noted as required Section 0 of release runbook.
- **`AGENTS/claude/CONTEXT.md` "Current State" block** refreshed from `v2.15.1 SHIPPED` to `v2.15.2 SHIPPED + v2.15.x cycle CLOSED` with cross-reference to the v2.16.0 active planning.
- **Version surface bumps**: `README.md` badge `2.15.1` to `2.15.2`; `.claude-plugin/plugin.json` + `.claude-plugin/marketplace.json` versions; `.claude/pm-skills-for-claude.md` "as of v2.15.2" narrative.

### Process

- **Issue #132 [M-20] comment posted** with v2.15.1 partial-close evidence (`check-landing-page-counts` validator addresses the immediate v2.15.0 docs-site drift) and explicit carry-forward to v2.16.0 ci-plan for the full count-consistency regex consolidation.
- **v2.16.0 planning artifacts committed** (preceding commit) so the v2.15.2 reconciliation edits have a baseline. The v2.16.0 plan slate (5 sub-plans + 4 sub-agent spec docs + master plan + open-questions log + adversarial-review findings) was authored 2026-05-16 between the v2.15.0 tag and the v2.15.1 patch; it sat uncommitted in the working tree until this closeout cycle.

### Known limitations (carry-forward to v2.16.0)

Same as v2.15.1; no new deferrals:
- A06 + A07 count-consistency regex consolidation (issue #132 [M-20]): v2.16.0 ci-plan Task 6
- 2 open Dependabot alerts requiring Astro 6.x upgrade: v2.16.0 doc-stack-modernization-plan
- DS family validator full metadata-shape strict promotion: v2.16.0 repo-hygiene-plan Phase 3

## [2.15.1] - 2026-05-16

**v2.15.0 Post-Tag Audit Remediation + Preventive CI.** Same-day patch successor to v2.15.0. The 55-skill catalog is unchanged; day-to-day usage of `/prd`, `/hypothesis`, `/user-stories`, and the 15 v2.15.0 sprint commands is identical. What changes is documentation accuracy on the docs site, AGENTS.md command-table coverage, the sample-library README, a workflow-generator bug that silently dropped new workflows from the index, and 4 new preventive CI validators that close the structural gaps that allowed v2.15.0-class drift to slip through. Addresses every P0+P1+P2+P3 finding from the v2.15.x audit (see `docs/internal/release-plans/v2.15.x/audit_v2.15.x_post-tag-self-review.md`).

### Fixed

- **Docs-site homepage stale at "40 skills" (audit A01)**. `docs/index.mdx` frontmatter description, hero body, "Skills by Phase" intro, "Plus" command list, and Workflows section all refreshed to 55 skills + 12 workflows + Tool card added to the CardGrid. The Astro Starlight homepage at https://product-on-purpose.github.io/pm-skills/ now matches the v2.15.0 release narrative; readers landing there cold no longer see a 40-skill claim.
- **Skills landing page table missing Tool row (audit A02)**. `docs/skills/index.md` table extended with a Tool row (15 skills) and an introductory paragraph explaining the v2.15.0 `classification: tool` taxonomy with links to both family contracts. Table now sums to 55, matching the page header.
- **Workflow generator silently dropping new workflows from index table (audit A03; real software bug)**. `scripts/generate-workflow-pages.py` had a hardcoded `workflow_info` dict + `order` list with exactly the 9 pre-v2.15.0 workflows; the 3 new sprint workflows (foundation-sprint, design-sprint, foundation-to-design) had their individual pages generated correctly but were silently skipped from the index table. The generator now (i) includes explicit entries for all 12 workflows with display-name overrides, (ii) raises `SystemExit` if any workflow source file lacks a `workflow_info` entry, (iii) raises `SystemExit` if any workflow_info entry is missing from the `order` list. `docs/workflows/index.md` regenerated; now has 12 rows matching `_workflows/`.
- **AGENTS.md command table missing 20 commands (audit A04 + legacy drift)**. The bottom-of-file command summary table at L374+ never received the 15 v2.15.0 tool commands (`/tool-foundation-sprint-*`, `/tool-design-sprint-*`, `/tool-note-and-vote`) plus 3 new `/workflow-*` rows. As a side-effect of running the new `check-agents-md-command-sync` validator, 5 pre-existing drift items also surfaced (the 5 Meeting Skills Family commands `/meeting-agenda`, `/meeting-brief`, `/meeting-recap`, `/meeting-synthesize`, `/stakeholder-update` were never added when v2.11.0 shipped). All 23 missing rows added; table now covers every file in `commands/` plus all `/workflow-*` aliases.
- **Library samples README stale at "126 samples across 40 PM skills" (audit A05 + A10)**. `library/skill-output-samples/README_SAMPLES.md` header + breakdown updated to "171 samples across 55 PM skills" (126 pre-v2.15.0 + 45 v2.15.0 Sprint Skills additions: 21 FS + 21 DS + 3 tool-note-and-vote). Sample count reconciled: the prior 174-on-disk figure was the `find -name '*.md'` total including 3 top-level helper files (README_SAMPLES.md, SAMPLE_CREATION.md, THREAD_PROFILES.md); the actual sample count is 171.
- **Sprint Planning workflow needs `(agile)` qualifier per new naming-discipline rule (audit A09)**. `_workflows/sprint-planning.md` frontmatter title bumped to "Sprint Planning (agile)" with a disambiguation callout pointing readers at the Foundation Sprint and Design Sprint workshops and at `docs/concepts/workshop-sprints-vs-agile-sprints.md`. Workflow generator's display override emits "Sprint Planning (agile)" in the index table. Closes the v2.15.0 naming-discipline rule applied uniformly across pre-existing surfaces.
- **v2.15.0 release notes lacked top-of-file callout for post-tag closures (audit A14)**. `docs/releases/Release_v2.15.0.md` gains a one-paragraph callout near the top alerting readers that two CI gap closures landed on main HEAD after the tag (`f03d94d` + `c8ea6d9`) and that v2.15.1 ships their full remediation. Readers who scan only the top no longer miss the post-tag fix narrative.

### Added

- **`scripts/check-landing-page-counts.{sh,ps1,md}`** validator triplet (new). Asserts that every count claim of the form `<N> skills`, `<N> AI agent skills`, `<N>-skill`, etc. on `docs/index.mdx`, `docs/skills/index.md`, `docs/workflows/index.md`, and `library/skill-output-samples/README_SAMPLES.md` either matches the source-of-truth filesystem count OR appears alongside the source-of-truth count in the same file. Closes the gap that allowed v2.15.0 to ship with the docs-site homepage at "40 AI agent skills" (the existing `check-count-consistency` regex did not match descriptive phrases with intervening adjective tokens). Wired into CI with `--strict`/`-Strict`.
- **`scripts/check-workflow-generator-coverage.{sh,ps1,md}`** validator triplet (new). Asserts that every workflow source file in `_workflows/*.md` has both a corresponding individual page in `docs/workflows/` AND a row in `docs/workflows/index.md`. Closes the gap that allowed `scripts/generate-workflow-pages.py` to silently drop new workflows from the index. Wired into CI as enforcing.
- **`scripts/check-agents-md-command-sync.{sh,ps1,md}`** validator triplet (new). Asserts that every file in `commands/` has a matching `| \`/<command>\` |` row in the AGENTS.md command summary table, and that no orphaned rows reference deleted commands. Recognizes `/workflow-*` slash-command aliases into `_workflows/`. Closes the gap that allowed v2.15.0 to ship with 15 missing tool commands in the table (plus surfaced 5 pre-existing Meeting Skills Family drift). Wired into CI as enforcing.
- **`scripts/pre-tag-validate.{sh,ps1,md}`** orchestration script + doc triplet (new). Codifies the `feedback_pre-tag-validator-bundle.md` memory rule (2026-05-16): runs every truly-enforcing validator (11 base + 3 new v2.15.1 preventive = 14 total) with a single command before cutting a release tag. Required step added to `docs/internal/release-plans/runbook_clean-worktree-cut-tag-publish.md`. Converts a tacit memory rule into deterministic executable behavior.
- **`docs/concepts/sprint-skills-overview.md`** cross-family overview (audit A11; new). Single front-door entry point for the v2.15.0 sprint lane. Explains the `classification: tool` taxonomy, the 7-skill Foundation Sprint family, the 7-skill Design Sprint family, the standalone `tool-note-and-vote`, the end-to-end FS-to-DS workflow with a mermaid arc diagram, when to reach for which, and the naming-discipline rules. Routes readers to the per-family guides, concept docs, FAQs, glossary, and comparison reference.
- **`.github/workflows/validation.yml`** extended with 3 new enforcing steps per matrix entry (Ubuntu + Windows). 6 new CI step pairs total. The 3 new validators run with `--strict` / `-Strict` where applicable.

### Changed

- **`scripts/generate-workflow-pages.py`** hardened (audit A03b). `workflow_info` dict gained explicit entries for the 3 v2.15.0 sprint workflows; `order` list extended to match; `generate_index()` now raises `SystemExit` if any source workflow file lacks a `workflow_info` entry OR if any `workflow_info` entry is missing from `order`. Provides an author-side fence; the new `check-workflow-generator-coverage` validator is the CI-side fence (defense in depth).
- **`docs/internal/release-plans/runbook_clean-worktree-cut-tag-publish.md`** gains a new "Section 0: Pre-tag validator bundle (REQUIRED)" step at the top of the runbook. Requires running `bash scripts/pre-tag-validate.sh` (or pwsh equivalent) before any tag-cut step.
- **`docs/internal/release-plans/v2.15.0/plan_v2.15.0.md`** + **`foundation-sprint-integration-plan.md`** + **`design-sprint-integration-plan.md`** status blocks updated (audit A08) with post-tag SHA + v2.15.1 audit-remediation cross-reference. "What's next" list pruned to reflect closure of GitHub Release UI body rewrite + v2.15.1 patch cycle status.
- **`AGENTS/claude/CONTEXT.md`** "Current State" block refreshed (audit A12; closes v2.14.x cleanup plan Task 2) from v2.14.0 SHIPPED to v2.15.1 SHIPPED state with sprint family inventory, v2.15.x audit reference, and post-tag closure narrative. v2.14.x content preserved below as historical context.

### Documentation

- **v2.15.x post-tag self-review audit** (`docs/internal/release-plans/v2.15.x/audit_v2.15.x_post-tag-self-review.md`; new in v2.15.1 cycle). 489-line audit document with 18 findings (3 P0 + 3 P1 + 4 P2 + 5 P3 + 3 INFO) across documentation drift, CI gaps, continuity, consistency, and bug discoveries, plus a Decision Brief on each remediation choice and a recommended phasing plan. Surfaced the workflow-generator hardcoded-dict bug + the count-consistency regex blind spot + 5 missing AGENTS.md command rows that pre-dated v2.15.0.

### Known limitations (deferred to v2.16+)

- **`check-count-consistency` regex tightening** (audit A06; tracked in issue #132 [M-20]). The existing validator passes on local HEAD because it does not match descriptive phrases like "40 AI agent skills"; v2.15.1 closes this gap via the parallel `check-landing-page-counts` validator. A full M-20 implementation would consolidate the two validators and extend coverage to all docs surfaces. Deferred to v2.16.0.
- **Auto-generation of `docs/skills/index.md` table + AGENTS.md command table** from `skills/` and `commands/` directories. Would close the entire drift class with one structural change. Deferred to v2.16.0.
- **2 Dependabot alerts** remain open requiring Astro 6.x upgrade; deferred to v2.16 per `plan_v2.16.0.md` DI3.

## [2.15.0] - 2026-05-16

**Sprint Skills Launch.** Ships pm-skills' first `classification: tool` skills implementing Knapp/Zeratsky/Kowitz canonical sprint methodologies. 15 new skills (7 Foundation Sprint family + 7 Design Sprint family + 1 tool-note-and-vote standalone) bring the catalog from 40 to 55. New tool classification taxonomy added alongside phase/foundation/utility. Two family contracts with enforcing CI validators (each with --strict mode for release-time validation). End-to-end FS-to-DS workflow with a narrative-only handoff conversation that replaces the dropped bridge skill (canonical Knapp/Zeratsky methodology has no formal handoff move; pm-skills does not invent one).

### Added

- **`classification: tool` taxonomy** for skills representing named external methodologies composed of multiple skills working as a system. Foundation Sprint and Design Sprint are the first inhabitants; future candidates include JTBD, Double Diamond, Shape Up. The `validate-skill-family-registration` validator and `lint-skills-frontmatter` accept the new value; existing classification values (phase/foundation/utility) unchanged.
- **Foundation Sprint family (`foundation-sprint-skills`; 7 skills)** implementing Knapp/Zeratsky's two-day strategic-alignment workshop: `tool-foundation-sprint-readiness`, `tool-foundation-sprint-brief`, `tool-foundation-sprint-basics`, `tool-foundation-sprint-differentiation`, `tool-foundation-sprint-approach-options`, `tool-foundation-sprint-magic-lenses`, `tool-foundation-sprint-founding-hypothesis`. Family contract at `docs/reference/skill-families/foundation-sprint-skills-contract.md` v0.3.0; family validator `validate-foundation-sprint-skills-family.{sh,ps1}` with `--strict`/`-Strict` flag.
- **Design Sprint family (`design-sprint-skills`; 7 skills)** implementing Knapp/Zeratsky/Kowitz's five-day prototype-and-test workshop: `tool-design-sprint-readiness`, `tool-design-sprint-brief`, `tool-design-sprint-map-and-target`, `tool-design-sprint-sketch`, `tool-design-sprint-decide-and-storyboard`, `tool-design-sprint-prototype-plan`, `tool-design-sprint-test-and-score`. Family contract at `docs/reference/skill-families/design-sprint-skills-contract.md` v0.2.0; family validator `validate-design-sprint-skills-family.{sh,ps1}` with `--strict`/`-Strict` flag.
- **`tool-note-and-vote`** standalone tool implementing Knapp/Zeratsky/Kowitz's note-and-vote group-decision mechanic. Used at decision moments throughout both sprint families; NOT a family member.
- **3 new workflows**: `_workflows/foundation-sprint.md` (2-day FS arc), `_workflows/design-sprint.md` (5-day DS arc), `_workflows/foundation-to-design.md` (end-to-end FS+DS arc; load-bearing replacement for the dropped bridge skill with a 12-row FS-to-DS slot-mapping table and 3-question go/no-go checkpoint).
- **15 slash commands** matching the 15 new skills (`/tool-foundation-sprint-*`, `/tool-design-sprint-*`, `/tool-note-and-vote`).
- **45 library samples** across 3 narrative threads (Brainshelf B2C book-tracking, Storevine B2B retail managed-intelligence, Workbench SRE incident-response observability) demonstrating end-to-end FS-to-DS arcs per company.
- **2 user guides**: `docs/guides/using-foundation-sprint.md` (~2,700 words; includes AI-era section) and `docs/guides/using-design-sprint.md` (~2,100 words; includes Coming from a Foundation Sprint section as the load-bearing replacement for the dropped bridge skill).
- **2 concept docs**: `docs/concepts/foundation-sprint.md` and `docs/concepts/design-sprint.md` providing framework reasoning, history, and design decisions for each sprint methodology.
- **3 disambiguation + reference docs** addressing the workshop-sprint-vs-agile-sprint cognitive collision: `docs/concepts/workshop-sprints-vs-agile-sprints.md` (three methodologies sharing the word "sprint"; comparison matrix + end-to-end coexistence arc), `docs/reference/sprint-methodology-glossary.md` (~1,900 words; FS-specific + DS-specific + shared primitives; explicitly excludes agile sprint terms), `docs/reference/workshop-method-comparison.md` (comparison matrix across 8 workshop methods + decision-tree mermaid).
- **8 sprint user guides** (4 per family): FAQ, printable cheat sheet, end-to-end case studies (Brainshelf + Storevine + Workbench three-thread continuation of the library samples), and recovery playbook (PRE-1 through POST-2 failure-mode scenarios). Per-family files at `docs/guides/{foundation,design}-sprint-{faq,cheat-sheet,case-studies,recovery}.md`.
- **3 new mermaid diagrams** added to canonical primitives: Note-and-Vote 5-step protocol diagram in `skills/tool-note-and-vote/SKILL.md` (silent vs spoken phase coloring + three legal supervote outcomes + re-vote loopback); "Should I run a Foundation Sprint?" 5-question decision tree in the FS FAQ; "Should I run a Design Sprint?" 6-question decision tree in the DS FAQ. Existing concept docs and cheat sheets already cover per-day timelines, Wednesday voting cascade, Five-Act Interview flow, Founding Hypothesis template, and Magic Lenses matrix.
- **CI workflow extension** (`.github/workflows/validation.yml`): both Foundation Sprint and Design Sprint family validators now run with `--strict`/`-Strict` on every PR (Ubuntu + Windows runners). Closes a previously-undetected gap where neither family-specific validator was wired into CI (only the structural family-registration validator was).

### Changed

- **Skill count**: 40 -> 55 (+15: 7 Foundation Sprint family + 7 Design Sprint family + 1 tool-note-and-vote).
- **Classification taxonomy**: 3 values -> 4 (added `tool`).
- **AGENTS.md**: gains a Tools section with Foundation Sprint Family + Design Sprint Family subsections + the standalone tool-note-and-vote entry; 55 skill paths matched.
- **Foundation Sprint family contract bumped v0.1.0 to v0.2.0** after Codex adversarial review of FS-track Phase 2 (2026-05-15): library samples made version-tiered (Brainshelf REQUIRED at v0.1.0; all 3 threads REQUIRED at v1.0.0); frameworks metadata clarified as subset semantics; CI enforcement list reorganized to family-level + per-member splits with explicit validator-coverage gap documentation.
- **Foundation Sprint family contract bumped v0.2.0 to v0.3.0** (2026-05-16) adding the Naming Discipline section: Foundation Sprint and Design Sprint must always be qualified with the full method name on first reference per document; bare "sprint" is reserved for agile/Scrum context with an explicit "(agile)" or "(Scrum)" qualifier when the surrounding context could confuse the two.
- **Design Sprint family contract bumped v0.1.0 to v0.2.0** (2026-05-16) adding the same Naming Discipline section to mirror the FS contract.

### Documentation

- **Two adversarial-review cycles documented** in the v2.15.0 plan files (one per family track) with full triage tables: FS-track 35 findings (14 accept / 14 defer / 7 reject); DS-track 13 Codex findings + 20 Claude self-audit findings (19 accept-fix-now / 1 defer / dedup). All Codex P1 findings closed before tag; deferred items tracked for v2.16.
- **Plan-update hygiene rule codified**: when shipping a task tracked in a release/integration plan, update plan status block + checkboxes in the same session. Codified in `feedback_update-plans-as-you-ship.md` memory.
- **Post-tag CI gap closure (`f03d94d`, after v2.15.0 tag at `a108301`)**: re-ran the 3 doc-site generator scripts (`generate-skill-pages.py` + `generate-workflow-pages.py` + `generate-showcase.py`) to publish 16 new `docs/skills/tool/` pages, 3 new `docs/workflows/*-sprint*.md` pages, and refreshed `docs/reference/commands.md`. Patched `scripts/check-count-consistency.{sh,ps1}` to add `tool` to the skills subset-descriptor exclusion list (validator predated the v2.15.0 `tool` classification). The v2.15.0 tag itself is unchanged; the deployed docs site builds from main HEAD so the closure takes effect on the live nav without a tag move. Full detail in `docs/releases/Release_v2.15.0.md` "Post-tag closures" section.

### Known limitations (deferred to v2.16+)

- DS family validator `--strict` mode enforces structural conformance (file presence, classification, metadata.tool, metadata.move, contract reference, Decider Checkpoint position) but does NOT yet enforce the full metadata-shape contract (category enum, frameworks subset values, timebox_minutes integer, roles enum, prerequisites array, inputs/outputs presence, author field). Universal `lint-skills-frontmatter` provides the floor for root-field shape.
- pm-skills-mcp catalog remains frozen at v2.9.2 build (per maintenance-mode decision from 2026-05-04); the 15 new tool skills do NOT embed in the MCP server. File-based install is the recommended path for new users.
- 2 Dependabot alerts remain open requiring Astro 6.x upgrade; deferred to v2.16 per `plan_v2.16.0.md` DI3.

## [2.14.2] - 2026-05-10

Codex Final Review Closure (Cumulative Docs Hygiene Patch). Same-day successor to v2.14.1. The 40-skill catalog is unchanged from v2.14.1; day-to-day usage is identical. What changes is documentation accuracy, validator scope, workflow safety posture, and cross-repo metadata. Addresses every actionable finding from the Codex final review of the v2.14.x release cycle (0 P0, 1 P1, 11 P2, 1 P3).

### Changed

- **`scripts/validate-docs-frontmatter.{sh,ps1}` scope expanded to `.mdx`** (Codex P2). Mirrors V6's `check-internal-link-validity` pattern. `src/content.config.ts` mounts both `.md` and `.mdx`, and `docs/index.mdx` is the Starlight homepage; without this expansion, frontmatter regressions on MDX surfaces silently bypass the validator. Verified PASS at 37 files (was 36 `.md`-only).
- **`scripts/check-no-body-h1.md` clarified with "What this rule does NOT catch (by design)" section** (Codex P2). Explicit framing of allowed cases: H1s later in body, H1s in fenced code blocks, body H1s in files without frontmatter `title:`. Prevents future over-engineering into a no-H1-anywhere rule.
- **`docs/guides/validate-mcp-sync.md` refreshed for observe-mode default** (Codex P2). Updates guidance to match the v2.14.1 V9 workflow change + B validator maintenance-flag awareness. Mode history section captures the v2.3.0 then v2.14.x evolution.
- **`.github/workflows/sync-agents-md.yml` workflow_dispatch hardened with two-layer defense** (Codex P2). Input gate: `apply: true` choice input required before commit/push (default `false`). Token gate: workflow-level `permissions: contents: read` ensures the GITHUB_TOKEN cannot push even if the input gate is bypassed. Reviving the workflow requires a code-reviewable PR rather than a click-and-regret event.
- **`pm-skills-mcp/README.md` cross-repo update** (Codex P1). 5 stale "25 skills" references corrected to "40 skills" with explicit catalog-frozen-at-v2.9.2-build framing; latest published version pointer updated to v2.9.3 (was v2.7.0); changelog table extended with v2.8.x and v2.9.x rows; pinned-version install example updated.
- **`CONTRIBUTING.md` workaround count corrected** (Codex P3). "Five workarounds" to "Six workarounds" (matches actual 6 numbered architectural-workaround entries after v2.14.1 added the Starlight title-vs-body-H1 convention entry).
- **`docs/internal/release-plans/v2.14.0/plan_v2.14_starlight-migration.md` top status updated** (Codex P2). "Authored 2026-05-06; ready for execution kickoff" to "EXECUTED 2026-05-10 (Phases 0-4 + W13 sub-batches B1-B4 + B2.5/B3.5 mid-cycle insertions); v2.14.0 tagged at HEAD 5718440; post-tag cleanup (FU1-FU8 + M1-M3 + V1-V15 + A+B+C) shipped same day as v2.14.1 tag; Codex-driven docs hygiene shipped as v2.14.2."
- **`docs/releases/Release_v2.14.0.md` "What's deferred to v2.14.x" table reframed with Post-tag disposition column** (Codex P2). 6 of 9 deferrals closed in v2.14.1 + v2.14.2; 3 remain v2.15+ (tags-as-feature, URL slug normalization, Astro 6 upgrade).
- **`README.md` version surface refreshed**: shields.io version badge `2.14.1` to `2.14.2`; "Latest stable" pointer; "Latest release notes" anchor; "Published tag" link. Plus `docs/index.mdx` Recent Releases row, `docs/releases/index.md` releases-index row, and `.claude/pm-skills-for-claude.md` "as of v..." narrative.
- **Plugin manifest version bumps**: `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` to `2.14.2`.

### Added

- **`docs/releases/Release_v2.14.2.md`** authored as the release notes artifact. Documents the Codex finding closures table (P1/P2/P3 by row), what is NOT in v2.14.2 (v2.15+ deferrals), migration/compatibility, and verification.

## [2.14.1] - 2026-05-10

Polish + V15 regression fix. Patch release. The 40-skill catalog is unchanged from v2.14.0; day-to-day usage is identical. What changes is the docs-site rendering (title duplication fixed across all Starlight pages; generator output reframed for users; Mermaid 3-layer beautification) plus CI infrastructure (two validators promoted to truly enforcing, third validator added, MCP maintenance posture codified). Ships same-day as v2.14.0 (2026-05-10) per the v2.13.0 -> v2.13.1 1-day-patch precedent.

### Added

- **`docs/reference/mermaid-style-guide.md` + `public/mermaid-style-guide.html`** (FU8). Canonical Mermaid diagram style guide with decision matrix for diagram-type selection, Triple Diamond palette spec, 5 diagram-type examples (graph LR, block-beta, sequenceDiagram, stateDiagram-v2, gantt), dark mode audit notes, and a machine-readable YAML spec for agents. Self-contained HTML preview opens locally or serves at `/pm-skills/mermaid-style-guide.html`.
- **7 README stubs** across `docs/{skills,guides,concepts,contributing,getting-started,showcase,releases}/` (FU7). Short pointer files matching the workflows + reference precedent so each docs section has a GitHub-directory landing page distinct from the Astro-built `index.md`.
- **`MIN_EDIT_LINKS` env var threshold** in `scripts/verify-edit-links.mjs` (V3). Default 100; catches silent regression where editLink emission breaks (would otherwise pass with 0 occurrences).
- **"Maintainer notes: architectural workarounds" section** in `CONTRIBUTING.md` (V2). Documents 5 inline-commented workarounds future-maintainers should not "fix": autogenerate docs/ prefix; post-build .md link sweep; EXCLUDE_PATHS mirroring; generator rewrite_internal_paths; LC_ALL fallback.
- **`maintenance: true` flag + `maintenanceNote`** in `pm-skills-mcp/pm-skills-source.json` (V9; cross-repo commit 7e9cac5 in pm-skills-mcp). Documents the M-22 frozen-catalog posture explicitly.

### Changed

- **`check-internal-link-validity.{sh,ps1}` promoted to truly enforcing** in CI (FU6). Added `--strict` / `-Strict` flag in `.github/workflows/validation.yml`. Also fixed 7 broken doubled-docs-prefix links via generator path-rewrite + LC_ALL fallback for Windows Git Bash locale. Scope expanded in V6 to include `.mdx` files (docs/index.mdx + docs/showcase/index.mdx now scanned).
- **`validate-docs-frontmatter.{sh,ps1}` promoted to truly enforcing** in CI (V5). Added `--strict` / `-Strict` flag. Required cleaning 20 docs (19 missing descriptions; 1 too-short description; 9 needed YAML quote-wrapping for embedded colons).
- **`validate-mcp-sync.yml` default mode flipped from `block` to `observe`** (V9). MCP entered maintenance mode 2026-05-04; drift between pm-skills and pm-skills-mcp is the documented posture. CONTRIBUTING.md "MCP Sync Guardrail" section updated to reflect the steady-state.
- **9 GitHub Actions workflow files bumped** from `actions/{checkout,setup-node}@v4` and `upload-pages-artifact@v3` and `deploy-pages@v4` to `@v5` (FU4). Ahead of forced Node 20 cutoff 2026-06-02.
- **Mermaid global theme + CSS polish** (M1+M2). `lineColor: '#5C7CFA'` (favicon indigo) and `fontFamily: 'system-ui'` via `mermaidConfig.themeVariables` in `astro.config.mjs`. Plus `.mermaid` SVG rules in `src/styles/custom.css` for edge stroke-width, node corner-radius, and cluster fill-opacity.
- **Triple Diamond classDef palette** applied to home page diagrams (M3). 6-color palette for the 6 phases via `classDef` (graph LR) and `style` (block-beta).
- **`docs/changelog.md` v2.13.0 + v2.13.1 entries backfilled** (FU3). Closes the 2-version gap that existed at v2.14.0 tag.
- **`README.md` version surfaces refreshed** (FU1): shields.io badge URL, "Latest stable", "Latest release notes" anchor, "Published tag" all bumped to v2.14.0. Plus `docs/index.mdx` Recent Releases row and `.claude/pm-skills-for-claude.md` install-path note.
- **Generator output reframed for users** (V10). Removed the visible `:::caution[Generated file]` aside from 63 generator-output pages (per-skill, per-phase, workflow, showcase, commands reference); also removed the "Hand-edited curated index" note from `docs/skills/index.md`. Pattern 5C generated-content marker preserved via frontmatter (`generated: true` + `source:`), which is what `check-generated-content-untouched.sh` validates. Users no longer see contributor-noise on rendered pages.

### Fixed

- **45 library sample files swept of 182 en-dashes** (V11). Pre-existing en-dashes that had been latent because the no-em-dashes hook only fires on Edit/Write tool calls; generators bypass the hook. Replaced with space-hyphen-space per CLAUDE.md substitute. Generators re-run; downstream docs/skills/* and docs/showcase/* refreshed.
- **3 routing defects from W13 visual smoke** (B2.5; this lands under v2.14.0, not Unreleased). Captured here for completeness in the post-tag narrative.
- **Body H1 stripped across 62 hand-authored docs + 6 generator emission sites** (V15). Starlight auto-renders frontmatter `title:` as the page heading; if body also starts with `# Heading` matching the title, both render and the heading appears twice. Migration regression from MkDocs Material (which did not auto-render frontmatter title). User spotted on mobile screenshots of `/showcase/workbench/` and other pages. Fix: 3 generators (`generate-skill-pages.py`, `generate-workflow-pages.py`, `generate-showcase.py`) no longer emit body H1; workflow generator additionally strips source `# Workflow Name` H1 from `_workflows/*.md` at copy boundary (source files stay standalone-readable on GitHub). 62 hand-authored docs (concepts, guides, contributing, getting-started, reference, releases, samples, skills, tags, home) body-stripped via Python script.
- **Maintenance flag awareness in `validate-mcp-sync.js`** (post-V15 deferral closure B). Validator now reads `pmSkillsSourceData.maintenance` from `pm-skills-mcp/pm-skills-source.json` (added in V9 cross-repo commit). When `maintenance: true` is present, drift is the documented posture per M-22 freeze; validator surfaces drift for visibility but does NOT fail CI regardless of mode env var. Makes `pm-skills-mcp/pm-skills-source.json` the authoritative source for maintenance posture; V9 workflow-default flip becomes redundant safety.

### Added (post-V15)

- **`scripts/check-no-body-h1.{sh,ps1,md}`** validator triplet (post-V15 deferral closure C). Forward enforcement of the V15 fix: refuses any `docs/**/*.{md,mdx}` file (subject to `EXCLUDE_PATHS`) where the first non-blank, non-import, non-comment line after the closing frontmatter `---` is a `# H1` matching the frontmatter title. Wired as a 3rd truly-enforcing validator CI step pair (`--strict` / `-Strict`) in `.github/workflows/validation.yml` after `check-internal-link-validity`. Total validators now 24 (was 23 at v2.14.0 tag); truly enforcing count now 14 (was 11 at tag, +2 from FU6+V5 promotions, +1 from this new validator). Same `EXCLUDE_PATHS` scope as `check-internal-link-validity` and `validate-docs-frontmatter`.
- **CONTRIBUTING.md "Maintainer notes: architectural workarounds" entry #6** (post-V15 deferral closure A). Documents the Starlight title-vs-body-H1 convention: generators do not emit body H1; workflow generator strips source H1 at copy boundary; authors of new hand-authored docs should rely on frontmatter title as the page heading.

### Disabled

- **`sync-agents-md.yml` auto-trigger removed** (V7). Workflow had been failing on every skills/** push since 2026-04-23 because its `skills/$phase/*/` glob did not match the flat `skills/{phase-name}/` structure pm-skills uses. AGENTS.md is hand-authored as the canonical contributor-facing doc; auto-sync would gut the content. `workflow_dispatch` retained for future revival.

### Process

- **AGENTS/claude/CONTEXT.md status block refreshed** to v2.14.0 SHIPPED state (V12).
- **`docs/releases/Release_v2.14.0.md` Counts table** clarified as tag-time snapshot with pointer to post-tag drift (V13).
- **Two plan docs annotated with post-tag follow-up summary row** for traceability without rewriting the at-tag-time close (V13).

## [2.14.0] - 2026-05-10

Doc Stack Migration: MkDocs Material to Astro Starlight. Doc-stack migration release. The 40-skill catalog is unchanged from v2.13.x; day-to-day usage of `/prd`, `/hypothesis`, `/user-stories`, and the rest of the catalog is identical. What changed is the documentation site itself: MkDocs Material is retired; Astro Starlight ships in its place. The user-visible site at https://product-on-purpose.github.io/pm-skills/ continues to serve the same content under a modern static-site stack. 4 phases / 13 workstreams executed; Phase 0 Adversarial Review Loop applied via `codex:rescue` against trunk release-state.

### Added

- **Astro Starlight stack pinned in `package.json`**: `astro ~5.13.0`, `@astrojs/starlight ~0.34.0`, `astro-mermaid ~2.0.1`, `sharp ^0.34.5`. Node engine `>=22.0.0 <23` (deliberately below Astro 6's `>=22.12` requirement; Astro 6 + Node 22.12+ deferred to v2.15+).
- **`astro.config.mjs`** authoring: site + base config, in-place `docs/` content collection mount, sidebar IA (D3 Option C: manual top-level + autogenerate within), 12 redirect entries with `/pm-skills/` base path, mermaid integration with `autoTheme: true`, custom CSS reference.
- **`src/content.config.ts`** custom glob loader (D2 Option B): mounts `docs/**/*.{md,mdx}` and `library/skill-output-samples/**/sample_*.md` in place; excludes `docs/internal/**`, `docs/templates/**`, `docs/workflows/README.md`, `docs/reference/README.md` (W13 B2.5), and 11 legacy/orbit historical samples; remaps library-sample paths to `/samples/{skill}/{stem}/`. Schema extends Starlight's `docsSchema()` with pm-skills custom frontmatter fields plus sample-specific fields.
- **`.github/workflows/deploy-pages.yml`** GitHub Actions Pages deploy workflow. Composable steps (checkout + setup-node + npm ci + npm run build + upload-pages-artifact + deploy-pages) preserve the post-build `.md` link sweep that the all-in-one `withastro/action` would skip (DM-2 deviation rationale documented in workflow header).
- **`scripts/verify-edit-links.mjs`** post-build edit-link verifier. Walks `dist/**/*.html`, parses Starlight editLink hrefs, asserts each target file exists in repo source. 238/238 unique targets resolve cleanly.
- **`scripts/post-build-strip-md-links.mjs`** post-build `.md` link sweep. Codex P0 fix from Phase 2 review: Astro `markdown.remarkPlugins` did not invoke our plugin in the Starlight + custom-glob-loader setup; post-build HTML rewrite is reliable. Strips 440 `.md` link suffixes across 59 files.
- **`docs/reference/index.md`** authored as the Astro source-of-truth Reference overview at `/reference/`; resolves `/reference/` 404 from W13 B2.5.
- **`docs/samples/index.md`** authored with corpus overview (115 samples, 40 skills, 3 threads); resolves `/samples/` 404 from W13 B2.5.
- **`public/favicon.svg`** Triple Diamond mark (3 indigo `#5C7CFA` filled diamonds; 280 bytes uncompressed). Resolves W11 C3 favicon 404.
- **`src/styles/custom.css`** minimal port from `docs/stylesheets/extra.css`; only `.mermaid` rule retained (the other 4 Material-specific selectors retired with Material).
- **`docs/internal/dependency-policy.md` "Known accepted CVEs (static-site exemption)" section** per DM-4 plan. Documents 5 advisories on `astro ~5.13.0` (SSR / server islands / Cloudflare adapter features pm-skills does not use). Re-evaluation point set at v2.15+ Astro 6 bump.
- **`docs/internal/release-plans/v2.14.0/plan_v2.14_starlight-migration.md`** master migration plan (14 workstreams in 4 phases; W13 status block updated through B1-B4 sub-batches).
- **`docs/internal/release-plans/v2.14.0/plan_v2.14_starlight-spike-report_2026-05-06.md`** GO-WITH-CAVEATS spike report (5 bounded caveats; all closed during execution).
- **`docs/releases/Release_v2.14.0.md`** authored as the release notes artifact.

### Changed

- **Build pipeline** moves from `mkdocs build --strict` (Python pip toolchain) to `npm run build` (Node 22.x toolchain; chains `astro build && node scripts/post-build-strip-md-links.mjs`).
- **Deploy pipeline** moves from `mkdocs gh-deploy --force` (push to `gh-pages` branch) to GitHub Actions Pages source (auto-deploys on push to main; ~1m9s build to live). GitHub Pages source flipped manually during W11 cutover.
- **Generator output reframe** in W5.5: 3 generators (`generate-skill-pages.py`, `generate-workflow-pages.py`, `generate-showcase.py`) updated to emit Starlight-native syntax. `!!! warning "Generated file"` to `:::caution[Generated file]`; `!!! info "Quick facts"` to `:::note[Quick facts]`; `??? example "..."` to MDX `<details><summary>...</summary>`; `{ .md-button }` line removed. 38 doc pages regenerated. 4 hand-authored doc pages also rewritten to Starlight asides.
- **Home page rewrite** in W11 C3: `docs/index.md` to `docs/index.mdx`; 31 pymdownx shortcodes converted to Starlight `<CardGrid>` + `<Card icon=...>` components drawing from Starlight's curated icon library (8 phase Cards + 3 showcase Cards). Material grid wrapper removed. Shortcode leakage defect from post-cutover surfaced and fixed.
- **Showcase index regenerated** as `.mdx` with Starlight `<CardGrid>` + `<Card>` components. THREADS icons (Storevine = bars, Brainshelf = open-book, Workbench = laptop) drawn from Starlight's curated library.
- **`scripts/check-internal-link-validity.{sh,ps1}`, `scripts/validate-docs-frontmatter.{sh,ps1}`, `scripts/check-workflow-coverage.{sh,ps1}`** decoupled from `mkdocs.yml`. Hardcoded `EXCLUDE_PATHS` arrays mirror `src/content.config.ts` glob excludes. Bash array initialization changed to `FOO=()` form (avoids `set -u` unbound-variable error). `validate-docs-frontmatter.sh` relaxed from `set -euo pipefail` to `set -uo pipefail` (description-detection grep returns non-zero on description-less docs; advisory-mode collect-and-print intent requires the script to keep running).
- **Validator inventory** net -1 (24 to 23). `check-nav-completeness` retired entirely (Starlight autogenerate solves the orphan class structurally; the validator was a W2-era guard for MkDocs' explicit-nav model). 4 validators added to CI (`validate-plugin-install` enforcing wired in W10 C1; `verify-edit-links.mjs` new in W10 C2; production-mode `internal/` exclusion check inline in W10 C2). 2 validators promoted from `continue-on-error: true` to enforcing in W10 C1, but the underlying scripts remain in advisory mode (relabeled as "advisory" in CI step names in B3.5 to honestly reflect actual behavior pending v2.14.x parity fix).
- **`.claude-plugin/plugin.json`** version bumped 2.13.1 to 2.14.0.
- **`.claude-plugin/marketplace.json`** version bumped 2.13.1 to 2.14.0.

### Removed

- **`mkdocs.yml`** (298 lines) retired in W12 C1.
- **`requirements-docs.txt`** (5 lines) retired in W12 C1 (pip mkdocs deps no longer needed).
- **`.github/workflows/deploy-docs.yml`** retired in W12 C1 (mkdocs gh-deploy replaced by deploy-pages.yml).
- **`.github/workflows/validate-docs.yml`** retired in W10 C3 (mkdocs build --strict replaced by npm run build smoke test in validation.yml).
- **`scripts/check-nav-completeness.{sh,ps1,md}`** retired in W12 C2 (orphan class solved structurally by Starlight autogenerate).
- **`docs/stylesheets/extra.css`** retired in W5; minimal port to `src/styles/custom.css` (4 of 5 Material-specific selectors retired; only `.mermaid` kept).

### Fixed

- **`/reference/` 404 on production** (W13 B2.5 F1). Cause: `docs/reference/README.md` mapped to `/reference/readme/` via Starlight's README slug rule, not `/reference/`. Fix: workflows-style pattern; README.md kept as GitHub-directory landing pointer; new `docs/reference/index.md` is the Astro source-of-truth at `/reference/`.
- **`/samples/` 404 on production** (W13 B2.5 F2). Cause: no source `docs/samples/index.md`. Fix: authored overview index; Samples sidebar switched to hybrid items (slug ref + Library autogen).
- **Redirect destinations landing at "Site not found · GitHub Pages"** (W13 B2.5 F3). Cause: redirect destinations used plain paths without the `/pm-skills/` base. Fix: prepended `/pm-skills/` to all 12 destinations; canonical URLs corrected. Re-decided the 2026-05-06 deferral after live-impact evidence shifted the cost-benefit.
- **Favicon 404 on production** (W11 C3). Starlight emits a default `<link rel="shortcut icon">` even without explicit favicon config; we had no asset at the served path. Fix: `public/favicon.svg`.
- **Material/Octicon shortcode leakage on home + showcase pages** (W11 C3). 31 occurrences on `docs/index.md` + 6 on `docs/showcase/index.md`. Fix: convert to MDX with Starlight `<CardGrid>` + `<Card icon=...>` components.
- **Stale `26 W3.5-excluded` comment** in `src/content.config.ts` corrected to actual `11 historical library samples (9 legacy + 2 orbit)` (B3.5 P3.1; surfaced by Codex PR.2 review).

### Compatibility

- **No content changes.** All 40 skills, 47 slash commands, 9 workflows, 115 mounted library samples (126 source samples on disk), 23 CI scripts, and source-side editing flows are unchanged from v2.13.x.
- **Codex compatibility unaffected.** Codex (and any non-Claude-Code agent) reads from `skills/` and `AGENTS.md` directly; the doc-stack migration is invisible to source-skill consumers.
- **Sync-helper install path unaffected.** Users who install via `scripts/sync-claude.sh` or `npx skills add` see no change.
- **Plugin marketplace install path unaffected.** `/plugin marketplace add product-on-purpose/pm-skills` continues to work; v2.13.1 plumbing remains.
- **`pm-skills-mcp` companion server unaffected.** v2.9.x maintenance line continues independently.
- **Inbound-link compatibility for Material-era URLs.** All 12 redirect entries from `mkdocs.yml redirect_maps` are preserved with `/pm-skills/` base path; old bookmarks resolve to current pm-skills pages.

### Security

- **Astro 5.13.x static-site CVE exemption** documented in `docs/internal/dependency-policy.md`. 5 advisories (1 High, 3 Moderate, 1 Low) on the pinned Astro version are accepted as not-applicable to pm-skills' SSG runtime profile (no SSR, no server islands, no middleware, no Cloudflare adapter). The Low advisory affects only the local dev server; contributor exposure is bounded. Re-evaluation point set at v2.15+ when the Astro 6 + Node 22.12+ bump is in scope.

## [2.13.1] - 2026-05-06

Plugin Install Path Correction. Patch release. The 40-skill catalog is unchanged from v2.13.0; day-to-day usage of `/prd`, `/hypothesis`, `/user-stories`, etc. is identical. What changes is the plugin install path: `/plugin marketplace add product-on-purpose/pm-skills` now succeeds, where it had failed silently since v2.7.0 due to two unrelated bugs in `marketplace.json` (wrong location and missing schema fields).

### Fixed

- **`marketplace.json` relocated** from repo root to `.claude-plugin/marketplace.json`, the canonical path Claude Code's plugin system reads from. Move performed via `git mv` so file history is preserved. The repo-root location is no longer present.
- **README count-exempt markers extended** to cover the "Previous Release Details" section. Pre-release CI surfaced 3 pre-existing stale per-version counts in historical release blocks (v2.9.0 "31 skills", v2.8.0 "29 skills", v2.7.0 "27 skills") that fell outside the v2.13.0 count-exempt range. These are correct as historical statements about what shipped at each version; the wrap restores `check-count-consistency` to PASS without rewriting historical text.
- **`marketplace.json` schema corrected** to satisfy Claude Code's marketplace registry:
    - Added top-level `owner` object with `name` and `url` (required field; was absent).
    - Converted plugin entry's `author` from a bare string to an object with `name` and `url` (string form is rejected by the schema).
    - Both changes are non-behavioral; the same plugin metadata is now expressed in the schema-conformant shape.

### Added

- **`scripts/validate-plugin-install.{sh,ps1,md}`** (enforcing). New CI validator that asserts the plugin install path will work end-to-end. Verifies both manifests exist at canonical paths (`.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`), validates required fields against Claude Code's marketplace schema (`name`, `owner.name`, `plugins`, per-plugin `name` + `version` + `source` + `author` as object), and enforces cross-manifest version + name consistency. Catches the exact bug class that shipped silently from v2.7.0 through v2.13.0.
- **`docs/releases/Release_v2.13.1.md`** authored as the release notes artifact.
- **`docs/internal/release-plans/v2.13.1/plan_v2.13.1.md`** authored as the release plan.

### Changed

- **`scripts/validate-version-consistency.{sh,ps1}`** updated to read `marketplace.json` from `.claude-plugin/marketplace.json` instead of the repo root. Continues to enforce that plugin.json and marketplace.json declare the same version.
- **`README.md` "Install as Claude Code Plugin" section** rewritten. Primary path is now the `/plugin marketplace add` + `/plugin install` flow that the marketplace registration enables. Manifest-direct install (the prior text) retained as a fallback for older Claude clients.
- **`.claude/pm-skills-for-claude.md`** updated to acknowledge plugin install as a parallel path alongside the sync-helper. No primary recommendation between the two paths in this release; recommendation positioning deferred to v2.14.0 or later.
- **Validator inventory grows from 22 to 23** (1 new enforcing). Enforcing tier grows from 10 to 11.

### Compatibility

- **No content changes.** All 40 skills, 47 slash commands, 9 workflows, 126 library samples, and 22 CI scripts are unchanged from v2.13.0.
- **Codex compatibility unaffected.** Codex (and any non-Claude-Code agent) reads from `skills/` and `AGENTS.md` directly; `marketplace.json` is Claude-Code-specific. The file move and schema additions have zero impact on Codex usage.
- **Sync-helper install path unaffected.** Users who install via `scripts/sync-claude.sh` see no change.
- **`pm-skills-mcp` companion server unaffected.** v2.9.x maintenance line continues independently.

### Why this matters

For Claude Code users, this is the release that makes plugin install actually work. Prior to v2.13.1, anyone who tried `/plugin marketplace add product-on-purpose/pm-skills` got two cryptic errors in sequence (file not found, then schema violation). The bug had shipped silently across multiple releases because no CI step exercised the install path; existing CI only checked manifest version consistency. v2.13.1 fixes both errors and adds the missing CI guard.

For maintainers and forkers, the new `validate-plugin-install` script is the durable user-value. It is the front-door check: "if a user tried to install pm-skills as a plugin right now, would it succeed?" That question now has a continuous answer in CI rather than only at release time.

## [2.13.0] - 2026-05-05

Foundation Hardening + Doc Stack Decision. Maintenance and quality release. The 40-skill catalog is unchanged from v2.12.0, so day-to-day usage of `/prd`, `/hypothesis`, `/user-stories`, and the rest of the catalog is identical. What changed is everything around the catalog: cleaner Diataxis-aligned documentation (duplicate files removed, counts reconciled, generated pages clearly labeled, `pm-skill-*` filename prefix convention), 7 new CI gates that catch doc drift on PRs automatically (validator inventory 15 to 22; enforcing tier 5 to 10), and an out-of-cycle `pm-skills-mcp` v2.9.3 security-patch follow-up to the v2.9.2 maintenance-mode announcement that cleared all 8 open Dependabot moderate advisories.

### Added

- **7 new CI validators** (Bucket C) each with `.sh` + `.ps1` + `.md` triplet completeness:
    - `check-nav-completeness` (enforcing): every `docs/**/*.md` is in nav OR `exclude_docs` OR auto-include patterns
    - `check-generated-content-untouched` (enforcing): snapshots, regenerates, diffs, restores; fails on hand-edits to generated pages. Pairs with Pattern 5C generated-content marker from Bucket A.4.
    - `validate-references-cross-doc` (enforcing): every cross-link in `docs/reference/` resolves
    - `validate-skill-family-registration` (enforcing): registry-driven family validation (`meeting-skills-family` plus future families); F-36
    - `validate-docs-frontmatter` (advisory): every rendered doc has title plus description
    - `check-internal-link-validity` (advisory): zero broken internal links across the doc tree
    - `check-version-references` (advisory): version-reference drift detector
- **Pattern 5C generated-content marker** on all 63 generated pages: `generated: true` and `source: scripts/...` frontmatter fields plus a visible `!!! warning "Generated file"` admonition pointing editors to the source. All 3 generators (`generate-skill-pages.py`, `generate-workflow-pages.py`, `generate-showcase.py`) emit the marker.
- **F-34 `library/skill-output-samples/THREAD_PROFILES.md`**: machine-readable per-thread metadata contract for tooling consumers (`utility-pm-skill-builder` primary; future regen tools). Documents thread identity, feature arc, prompt style, character naming convention, real competitors, sample-suffix patterns, and scenario archetypes per phase across all three threads (storevine, brainshelf, workbench).
- **Zensical compatibility spike report** at `docs/internal/release-plans/v2.13.0/plan_v2.13_zensical-spike-report_2026-05-05.md`. Decision artifact for v2.14.0+ stack-decision discussions; outcome NO-GO.

### Changed

- **Doc structure refactor (Bucket A)**: 
    - `docs/frameworks/` retired. Canonical Triple Diamond reference moved to `docs/concepts/triple-diamond-delivery-process.md` with a `mkdocs.yml` redirect from the old path. Reduces `mkdocs.yml exclude_docs:` from 8 entries to 2.
    - 4 concept files reorganized out of `docs/concepts/` to `docs/reference/` and `docs/guides/` per the Diataxis 4-quadrant taxonomy.
    - 4 legacy duplicate files deleted after CR-strip drift analysis (real divergence was minor; canonical was strictly newer).
    - `creating-skills.md` renamed to `creating-pm-skills.md` per the locked `pm-skill-*` prefix convention. `authoring-pm-skills.md` deleted. Both old paths redirect to the new canonical.
- **Count and link cleanup (Bucket B)**: skill counts reconciled across 7 public surfaces (concepts, reference, guides, getting-started, mkdocs config, homepage hero) at 40 (26 phase + 8 foundation + 6 utility); `utility-pm-skill-builder` catalog table updated to current per-classification counts; `docs/guides/mcp-setup.md` deleted and redirected to `mcp-integration.md`; `AGENTS/codex/CONTEXT.md` shrunk 74 to 32 lines as a vestigial-redirect to `AGENTS/claude/CONTEXT.md`; README "What's New" workaround replaced (Option a section-aware CI) with explicit HTML-comment markers plus subset-descriptor exclusion; project-structure.md fully reconciled; `docs/guides/index.md` expanded from 7 to 12 listed guides.
- **5 PowerShell parity bugfixes (Bucket C)**: `check-stale-bundle-refs.ps1` reserved-word collision; `check-workflow-coverage.ps1` and `check-generated-freshness.ps1` Join-Path named-parameter usage; `lint-skills-frontmatter.ps1` path-detection. PS1 versions now match bash output on current main.
- **`check-count-consistency` tightened and promoted to enforcing** for current-state files. Original line-level `v[0-9]+\.` exemption replaced with explicit HTML-comment markers (`<!-- count-exempt:start -->` / `<!-- count-exempt:end -->`) plus a subset-descriptor exclusion list. Surfaced and resolved 18 hidden findings the prior workaround had silenced.
- **CI workflow `validation.yml`** updated: `if: always() && matrix.os == ...` added to all 14 new-validator step conditions so an enforcing-step failure does not cascade-skip later validators in the same job.

### Infrastructure

- **Phase 0 Adversarial Review Loop** applied across per-strand (PR.1) and release-state (PR.2) layers per the v2.11.0 + v2.12.0 codification. PR.1 closed via 4 Codex tasks. PR.2 closed via 5 Codex review rounds + 3 resolution passes (8 numbered rounds total): each Codex round caught a deeper layer of stale-summary text introduced by the previous round's resolution; round 6 was a comprehensive sweep across the full release stack rather than another incremental fix; round 8 resolved final audit-trail correctness defects and applied a user-value reframe to the public-facing release artifacts.
- **Stale-aggregate-counter pattern codified** as durable feedback memory after PR.2 round 2 caught it at meta level. Status-block text drifts as state advances unless every gate closure sweeps all release-stack docs; pattern is now a standing rule for future cycles.
- **Validator inventory grows from 15 to 22** (7 new). **Enforcing tier grows from 5 to 10** (4 new enforcing + count-consistency promoted).

### Fixed

- **Bash + PS1 parity** on `check-stale-bundle-refs`, `check-workflow-coverage`, `check-generated-freshness`, `lint-skills-frontmatter`. PS1 false-positive class on certain skill paths resolved.
- **Stale doc references** across 7 public surfaces and the master plan / ci-refactor doc / CONTEXT.md / DECISIONS.md (caught and resolved across PR.2 review rounds).
- **`docs/reference/categories.md`** stale category math: total now 40 (was 29, missing 3 categories `meeting`, `communication`, `documentation`); per-category counts and skill listings now match SKILL frontmatter `metadata.category`.
- **`mkdocs.yml`** duplicate top-level `Guides:` nav section consolidated into a single section (the `using-meeting-skills.md` guide was previously stranded in a second `Guides:` block).
- **`scripts/check-generated-content-untouched.md`** watched-paths table count corrected from 38 to 40 individual skill pages.

### Out-of-cycle (pm-skills-mcp companion server)

These shipped on the same calendar day as v2.13 cycle work but are tracked separately because they are out-of-cycle by explicit user-initiated decision:

- **`pm-skills-mcp` v2.9.2** (2026-05-05): formal maintenance-mode announcement (effective 2026-05-04). Re-embeds the full current 40-skill catalog at v2.9.2 build time, superseding the prior v2.11.0 M-22 28-skill freeze. Total tools: 59 (40 skill + 11 workflow + 8 utility). Active development paused; security patches and critical bug fixes will continue.
- **`pm-skills-mcp` v2.9.3** (2026-05-05): security-patch follow-up two hours after v2.9.2. Cleared all 8 open Dependabot moderate advisories via transitive `npm audit fix` (`hono`, `@hono/node-server`, `vite`, `postcss`). Post-ship Dependabot open-alert count: 0. Bundled three latent v2.9.x maintenance debts in the same patch (loader test catalog assertions, lockfile metadata sync, retroactive em-dash sweep on 28 occurrences in pre-2026-04-13 CHANGELOG entries).
- The 2-hour announcement-to-patch turnaround validates the v2.9.2 maintenance-mode "security patches will continue" commitment in operational practice. Catalog frozen at v2.9.2 build; subsequent v2.9.x patches do not change the catalog.

### Deferred

| Item | Reason |
|---|---|
| Zensical migration | Spike NO-GO; re-spike when upstream blockers resolve |
| Plan B Astro Starlight | Per spike plan Section 5: only triggers if Material maintenance posture deteriorates |
| F-37 HTML Template Creator | Conflicts with v2.13 "no new skills" guard |
| F-29 Meeting Lifecycle Workflow | Time-gated on real-world meeting-skills feedback |
| F-30 Family Adoption Guide | Time-gated on at least one team's adoption experience |
| F-31 / F-32 / F-33 / F-35 Sample-automation slate | May be obsolete after v2.12 builder cleanup; re-evaluate before v2.14 |
| Pattern 2 mkdocs-macros frontmatter-driven counts | Adds dependency; deferred pending Zensical decision |
| Bash + PS1 dual-stack consolidation | Strategic question; deferred to v2.14.0+ |
| AGENTS/claude/CONTEXT.md per-phase Skills Inventory tables | At v2.10.x-era 32-skill state per intentional deferral. Authoritative catalog lives in `docs/reference/categories.md` and `docs/skills/index.md`. Full refresh slated for v2.14.0. |

## [2.12.0] - 2026-05-03

OKR Skills Launch. First release with the OKR Skills set: `foundation-okr-writer` and `measure-okr-grader` covering the full quarterly OKR write-and-score cycle. Adds 2 new skills (40 total) and 6 new thread-aligned library samples (126 total). Both skills shipped together so cross-skill hand-offs and the canonical 5-value OKR type enum (`committed | aspirational | learning | operational_health | compliance_or_safety`) are coherent at first appearance. Internal `utility-pm-skill-builder` packet-format simplification bundled silently. Phase 0 Adversarial Review Loop applied across the OKR skills (3 rounds converged) and the broader release state (2 confirmation rounds caught rendered-doc count drift the count-consistency CI's regex could not detect).

### Added

- **`foundation-okr-writer`** with command `/okr-writer`. Drafts, reviews, rewrites, and coaches outcome-based OKR sets. Five entry modes (Guided default, One-Shot via `--oneshot`, Sustained Coach, Audit Only, Rewrite). Empowered-team diagnostic with conditional Disclosure section in the artifact when feature-team signals are present. 16-item anti-pattern catalog. Constraint Rules block (MUST / MUST NOT). Quality Audit Rubric. Refuses to fabricate baselines or targets, refuses compensation coupling, reframes feature-delivery KRs into outcome KRs.

- **`measure-okr-grader`** with command `/okr-grader`. Scores completed OKR sets at cycle close per the canonical type enum: `aspirational` numeric, `committed` pass/fail, `compliance_or_safety` binary, `operational_health` pass/fail/drift-within-tolerance, `learning` validated/invalidated. Indicator class `guardrail` is independent of OKR type and adds a never-averaged-into-primary-score rule. Special states: `not-yet-observable` (cycle-window extensions past close) and `not-yet-fully-observable` (committed or compliance_or_safety with partial coverage; never softened to pass-on-in-scope). Refuses retroactive target changes, retroactive scope shrinkage on committed or compliance_or_safety KRs, and use of OKR scores for individual performance ratings. Hands off learnings to `iterate-lessons-log`, team-process work to `iterate-retrospective`, assumption tests to `define-hypothesis`, measurement gaps to `measure-dashboard-requirements` or `measure-instrumentation-spec`, and next-cycle drafting to `foundation-okr-writer`.

- **6 thread-aligned library samples** at `library/skill-output-samples/`. 3 per skill across the storevine, brainshelf, and workbench threads. The storevine Campaigns thread now spans `measure-experiment-results`, `foundation-okr-writer`, and `measure-okr-grader` for a complete write-and-score arc on a single product context. Brainshelf samples demonstrate retention-thesis invalidation via a 1.6x at-scale multiplier vs the 3.4x in beta. Workbench samples demonstrate mixed-empowerment scoring: committed KR fail not softened to aspirational, compliance_or_safety KR marked not-yet-fully-observable on partial audit coverage, and committed KR with `guardrail` indicator class held within threshold band.

- **`docs/skills/foundation/foundation-okr-writer.md`** and **`docs/skills/measure/measure-okr-grader.md`** mirror pages auto-generated by `scripts/generate-skill-pages.py`. Both skills appear in `mkdocs.yml` nav under their phase / classification section.

### Changed

- **`utility-pm-skill-builder`** packet format simplified. The Step 5 Skill Implementation Packet definition was reduced from 13 to 12 items per the prior session's quiet refactor; nothing downstream depends on the removed item, and the packet format change does not affect any shipped skill or sample. Bundled silently with the OKR launch per design.

- **`foundation-okr-writer/SKILL.md`** cross-reference cleanups now that the grader exists. Line 45 redirects scoring users directly to `/okr-grader`. Line 184 drops the "planned for a later release" framing.

- **README.md** skill counts and version badge bumped: 38 → 40 skills (26 phase + 8 foundation + 6 utility), version 2.11.1 → 2.12.0.

- **`.claude-plugin/plugin.json` and `marketplace.json`** version bumps to 2.12.0 with descriptions updated to reflect the 40-skill total and the new OKR Skills set.

- **`library/skill-output-samples/README_SAMPLES.md`** updated for the 6 new OKR samples: total samples 120 → 126, total skills 38 → 40, Browse by Skill table extended, all three thread tables extended with OKR rows, footer version refreshed.

### Infrastructure / process

- **Phase 0 Adversarial Review Loop** applied across both new skills. The grader's 3-round review converged on stable findings: round 1 caught 1 HIGH (workbench compliance KR retroactive scope shrinkage in sample) and 2 MEDIUM (`/define-hypothesis` nonexistent slash command, OKR-type-vs-indicator-class taxonomy drift); round 2 caught 2 MEDIUM (taxonomy drift propagation to TEMPLATE.md and sample KR3 framings); round 3 returned 0 findings. The writer's earlier review caught 1 generator-script bug (HTML attribution comment rendering as page H1) and 1 nonexistent-command directive, both resolved before the writer commit.

- **Release-state Phase 0 confirmation** loop on the broader release. Round 1 caught 2 MEDIUM in `docs/reference/README.md` (stale 46/39 count, missing mkdocs nav entry); round 2 caught 2 MEDIUM in rendered docs (homepage hero / mermaid / phase cards still at 38 skills, skill-anatomy contributor guide teaching pre-v2.11.1 frontmatter ordering); round 3 caught 3 MEDIUM in versioning data accuracy (foundation-persona at 2.5.0 not 2.0.0; foundation-meeting-synthesize at 1.0.1 not 1.0.0; original domain count off by 1) and skill-anatomy classification counts and CHANGELOG/release-notes date alignment; round 4 caught 2 MEDIUM in release-notes audit-trail accuracy (the round-3 fix incorrectly claimed convergence) and a stale CHANGELOG anchor; the loop terminated after the round-4 fix per the Phase 0 codified rule "until findings stabilize below IMPORTANT severity" (MEDIUM count was 2 / 2 / 3 / 2 across rounds; no HIGH; all findings below IMPORTANT). Each round's resolution surfaced new drift in the next round, which is the explicit pattern the Phase 0 loop was codified to catch in v2.11.0. The early rounds also exposed defects the count-consistency CI's regex (`\d+\s+(?:PM\s+|product\s+management\s+)?skills`) could not detect, because prose forms like "38 AI agent skills" and structural elements like mermaid phase counts (per-phase counts below the 10 min-threshold) fall outside its detection shape.

- **Em-dash sweep extension** across the auto-generated `docs/skills/` mirror to keep the mirror in sync with the standing no-em-dash rule applied to source SKILL.md files.

- **Operational doc count reconciliation** across rendered surfaces: anatomy concept pages, getting-started guides, project-structure reference, ecosystem reference, skills landing page, authoring guides, workflow guides, and the homepage. README "What's New" historical entries preserved with inline `vX.Y.Z` prefixes so the count-CI script's version-line skip rule keeps them out of the flagged set.

- **AGENTS/claude/CONTEXT.md** Current State block refreshed for v2.12.0 (release commits, skill count, MCP gap delta, v2.13.0 deferred items, next-step list). **AGENTS/codex/CONTEXT.md** given a top-of-file v2.12.0 currency marker; full refresh deferred to v2.13.0.

- **`docs/reference/README.md`** added as the canonical Reference section overview, wired into mkdocs nav. Indexes frontmatter schema, command catalog, category taxonomy, project structure, ecosystem comparison, and skill-family contracts.

- **`docs/internal/audit-ci/` reorganized** into `docs/internal/audit/_archived/` to consolidate audit history under a single tree.

- **`docs/internal/release-plans/v2.12.0/skills-manifest.yaml`** authored to match the v2.11.0 manifest format. Lists the two new skills with `previous_version: null`, `change_type: added`, version 1.0.0.

- **`docs/releases/Release_v2.12.0.md`** authored with the standard release notes structure (TL;DR, mermaid summary, Added / Changed / Infrastructure sections, validation, links).

## [2.11.1] - 2026-04-22

skills.sh CLI compatibility patch. Unblocks `npx skills add product-on-purpose/pm-skills` so the full 38-skill library is discoverable and installable through the open [`skills` CLI](https://github.com/vercel-labs/skills) and the skills.sh directory. No behavioral changes to any skill.

### Fixed

- **6 foundation skills** silently dropped by the skills CLI's strict YAML parser because each SKILL.md opened with an HTML attribution comment before the `---` frontmatter delimiter. Leading comment removed from `foundation-lean-canvas`, `foundation-meeting-agenda`, `foundation-meeting-brief`, `foundation-meeting-recap`, `foundation-meeting-synthesize`, `foundation-stakeholder-update`. Attribution is preserved via the identical comment that already lives immediately after the frontmatter block in each file.
- **`foundation-meeting-synthesize` description** contained an inline `": "` (colon-space) that strict YAML parsers interpret as a nested key-value separator, truncating the description. Reworded to split the sentence. Version bumped 1.0.0 → 1.0.1.
- **25 stale tracked files under `.claude/skills/`** (pre-v1 personal-setup relics) removed via `git rm`. The path was already gitignored; these files predated the rule. Affected directories: `init-project/`, `init-project-jpkb/`, `wrap-session/`.

### Added

- **`skills` CLI install path** in README as the recommended first option, with one-line `npx skills add product-on-purpose/pm-skills` and a new row in the Installation Options table. New skills.sh shield badge in the header badge row.
- **New lint rules** in `scripts/lint-skills-frontmatter.sh/.ps1/.md`:
  - First line of every SKILL.md must be the `---` YAML delimiter (no preamble, comments, or attribution headers above it).
  - Unquoted `description` field must not contain inline `": "` patterns. If a colon is required, wrap the full description value in double quotes.
- **Distribution plan** at `docs/internal/distribution/2026-04-22_skills-sh.md` documenting the six-phase submission approach (Phase 0 through 3 complete as of this release; Phase 4 optional; Phase 5 is a post-release soft-launch workstream).

### Changed

- **Em-dash sweep completion**: 376 tracked files swept, 5,805 em-dash characters replaced with `.` per the 2026-04-13 standing style rule. Zero behavioral change. Brings total em-dashes in tracked files to 0 (previous partial sweep had reduced a subset; this completes it across the full repo).
- **Stale count reconciliation**: 8 current-state skill-count references across 5 files updated from `27 skills` or `31 skills` to `38 skills` (`docs/agent-skill-anatomy.md` had 4 instances; one each in `docs/skills/utility/utility-pm-skill-builder.md`, `scripts/README_SCRIPTS.md`, `skills/utility-pm-skill-builder/SKILL.md`, and `skills/utility-pm-skill-builder/references/EXAMPLE.md`). Historical per-release count snapshots in README "What's New" sections intentionally left untouched as accurate records of past release states.
- **`README.md` version badge** bumped from 2.11.0 to 2.11.1.

### Infrastructure / process

- Dry-run against live skills CLI (`npx skills add <local path> -l`) added as a de facto pre-release validation. Phase 3 of the distribution plan documents the exact commands. Recommended for any future release that touches SKILL.md frontmatter.

## [2.11.0] - 2026-04-18

Foundation-phase expansion release. Ships 6 new foundation skills (lean canvas + 5-skill meeting lifecycle family), a canonical skill-family contract pattern enforced by CI, 15 thread-aligned library samples, and end-user documentation. First pm-skills release with a cross-cutting skill-family contract. Two rounds of Codex adversarial review before tag.

### Added

**6 new foundation skills**:
- **F-26: `foundation-lean-canvas`** (`/lean-canvas`) - one-page business thesis across 9 interlocking blocks with optional HTML visual rendering (content + visual modes; Ash Maurya nine-block layout; 3 thread samples)
- **F-18: `foundation-meeting-agenda`** (`/meeting-agenda`) - attendee-facing agenda with time-boxed topics, type tags, owners, prep; 10 meeting-type variants; anti-meeting check with synchronous-value requirement
- **F-25: `foundation-meeting-brief`** (`/meeting-brief`) - user's private strategic prep with stakeholder reads, ranked outcomes, anticipated Q&A; `visibility: private` default
- **F-27: `foundation-meeting-recap`** (`/meeting-recap`) - topic-segmented post-meeting summary with decisions bold-flagged and actions inline; auto-discovers sibling agenda; ownership reconciliation threshold at 30% unassigned
- **F-17: `foundation-meeting-synthesize`** (`/meeting-synthesize`) - cross-meeting archaeology surfacing patterns, trajectories, contradictions; format hints (board-prep, onboarding, retro-input, exec-brief)
- **F-28: `foundation-stakeholder-update`** (`/stakeholder-update`) - async outward comms with 5 channel × 5 audience variants; explicit Shareable update boundary

**Meeting Skills Family Contract v1.1.0** at `docs/reference/skill-families/meeting-skills-contract.md` - canonical, CI-enforced, shipped after two rounds of adversarial review with errata-within-version.

**New directory pattern** `docs/reference/skill-families/` with landing-page index for future cross-cutting skill-family contracts.

**Enforcing CI validator** `scripts/validate-meeting-skills-family.sh` + `.ps1` + `.md`, wired into `.github/workflows/validation.yml`. Checks contract-reference, zero-friction-execution section, shareable-summary/shareable-update section, sources-and-references structure, artifact_type enum values, and filename convention conformance across EXAMPLE.md + library samples.

**15 new library samples** (3 per meeting skill × storevine/brainshelf/workbench threads) conforming to `SAMPLE_CREATION.md` with 8-key top-level frontmatter + Scenario/Prompt/Output structure + fictional-marker discipline. Total library grew 94 → 120 (legacy/orbit samples accurately accounted for).

**End-user guide** `docs/guides/using-meeting-skills.md` with 3 mermaid diagrams (family skills graph, go-mode decision flow, chain sequence).

**Release-plan companion docs**:
- `plan_v2.11.0.md` - release plan with decisions table and deliverables
- `plan_v2.11_codex-review.md` - Round 1 + Round 2 findings tracker (26 findings total)
- `plan_v2.11_ci-coverage-analysis.md` - CI gaps and follow-up scripts
- `plan_v2.11_pre-release-checklist.md` - pre-release quality checklist (Phase 0 Adversarial Review Loop added from v2.11.0 learnings)
- `plan_v2.11_review-journal.md` - comprehensive narrative of all reviews, findings, resolutions, pattern analysis

**v2.12.0 backlog** - 7 efforts created for sample-automation loop (F-31 to F-35) + meeting-skills ecosystem continuation (F-29, F-30). Stub at `docs/internal/release-plans/v2.12.0/plan_v2.12.0.md`.

### Changed

- **Skill count 32 → 38** (+6: F-26 + 5 meeting skills)
- **Foundation classification 1 → 7** (adds lean-canvas + 5 meeting skills to persona)
- **Slash commands 39 → 45** (+6)
- Current-state count references updated across `README.md`, `CLAUDE.md`, `plugin.json`, `marketplace.json`, `docs/getting-started.md`, `docs/reference/commands.md`, `docs/skills/index.md`, `docs/reference/ecosystem.md`, `docs/reference/project-structure.md`, `docs/guides/mcp-setup.md`, `QUICKSTART.md`, `docs/index.md`, `docs/concepts/agent-skill-anatomy.md`
- `library/skill-output-samples/README_SAMPLES.md` - count 94 → 120 with 6-category breakdown (canonical, legacy/orbit, persona, lean-canvas, utility-single-thread, meeting-family)
- `AGENTS.md` - 5 new foundation-meeting-* entries with family-contract note
- `mkdocs.yml` - Foundation nav expanded to 7 skills + new Reference → Skill Families section + Guides section
- `.github/workflows/validation.yml` - 2 new enforcing steps for `validate-meeting-skills-family` (bash + powershell)
- `docs/internal/efforts/F-17-meeting-synthesis.md` and `F-18-meeting-prep.md` - archived to `_NOTES/archived-efforts/` and rewritten with expanded family-aware scope

### Infrastructure / process

- Two rounds of Codex adversarial review (`codex:codex-rescue` subagent) documented in review journal; 26 findings total, 24 resolved same-session
- Pre-release checklist now starts with Phase 0 Adversarial Review Loop - re-run Codex after each resolution pass until findings stabilize below IMPORTANT severity
- First post-v1.0.0 contract version bump with errata-within-version documented in change log

### Not shipped in v2.11.0 (deferred)

- R1-I8 IMPORTANT: utility-pm-skill-validate per-skill field enforcement - scoped into F-31 for v2.12.0
- Retroactive sample generation for existing skills that lack them - post-v2.12.0 candidate
- MCP server unfreeze criteria (frozen per M-22)

## [2.10.2] - 2026-04-14

Maintenance patch: corrects plugin manifest drift and extends the count-consistency CI to prevent it from recurring. No skill behavior changes.

### Changed
- `.claude-plugin/plugin.json` and `marketplace.json` - skill count in description corrected from 29 to 32 (reconciled with the 32-skill repo state shipped in v2.10.0)
- `scripts/check-count-consistency.sh` / `.ps1` / `.md` - extended to scan tracked `.json` files (previously `.md` only), so drift in `plugin.json` and `marketplace.json` is now caught by the same CI that covers markdown. Threshold comparison changed from `>` to `>=` to catch round-number boundary drift. Added exclusions for `.github/.created-issues.json` (tooling state) and `.github/scripts/` (npm manifests).
- `README.md` - v2.10.x What's New entry corrected from "10 workflows" to "9 workflows" (no new workflow shipped in v2.10.x; the repo has been at 9 workflows since v2.9.0)

## [2.10.1] - 2026-04-13

Documentation and tooling polish following v2.10.0. No skill behavior changes.

### Added
- Specifications for 10 backlog skills (draft effort briefs)
- Generated `docs/skills/` pages for F-16, F-19, F-24

### Changed
- `scripts/generate-skill-pages.py` - skill/command/workflow counts now computed dynamically instead of hardcoded, preventing the stale-count drift that previously required manual sweeps
- Backlog updated to reflect v2.10.0 shipped state

### Removed
- F-25 effort brief (scope moved to a separate agent-config-toolkit initiative)

## [2.10.0] - 2026-04-11

> **Note:** F-16 (mermaid-diagrams) and F-19 (slideshow-creator) content has
> been available since v2.9.1 but is formally released and documented with
> v2.10.0 as the utility skill expansion release.

### Added
- **F-16: `utility-mermaid-diagrams`** - new utility skill teaching PMs to create syntactically valid mermaid diagrams. 15 diagram types with dual-lens navigation (type catalog + PM use-case guide), dedicated syntax validity reference, planning worksheet, and worked examples. 2,656 lines across 7 files.
- **F-19: `utility-slideshow-creator`** - new utility skill for generating professional presentations from JSON deck specifications. 18 slide types with dark/light variants, content-to-layout decision logic, calibrated character limits, Google Slides compatibility. Ships with a generic professional theme. 766 lines across 7 files.
- **F-24: `utility-update-pm-skills`** - new utility skill for checking, previewing, and applying pm-skills updates. Three modes: `--status` (quick version check), `--report-only` (preview without writing files), default (full update with confirmation). Includes validated-before-copy safety, optional backup, value-delta reports, post-update smoke test, 13-item quality checklist, FAQ, and degraded mode for no-network environments.
- `/mermaid-diagrams` slash command
- `/slideshow-creator` slash command
- `/update-pm-skills` slash command with `--status` and `--report-only` flags
- `docs/guides/updating-pm-skills.md` - user-facing guide for the update skill
- `_pm-skills/` local state directory convention (gitignored) for update reports and backups
- 7 new sample outputs in `library/skill-output-samples/` for deliver-acceptance-criteria and all 6 utility skills (storevine thread). Sample library: 84 → 91, now covering all 32 skills.
- Generated `docs/skills/` pages for all 3 new utility skills

### Changed
- Repo now ships 32 skills (25 phase + 1 foundation + 6 utility), 39 command docs, and 10 workflows
- Comprehensive docs count sweep across 20+ files
- MCP server decoupled from pm-skills release cycle (M-22) - frozen, no longer a release prerequisite
- Codex cross-LLM review completed for release plan and F-24 feature design (1 Blocker, 12 Major, 11 Minor resolved)

## [2.9.1] - 2026-04-10

### Added
- **D-05: Workflows guide** - dedicated `docs/guides/using-workflows.md` with decision tree (mermaid), comparison matrix for all 9 workflows, invocation guide, and customization patterns. Replaces the brief workflow section previously in `using-skills.md`.
- **M-20: Documentation count consistency CI** - 3 new validation script pairs:
  - `check-workflow-coverage` - verifies every workflow has matching docs page, AGENTS.md entry, and mkdocs nav entry
  - `check-count-consistency` - detects stale hardcoded skill/command/workflow counts in documentation
  - `check-generated-freshness` - verifies generated workflow pages match sources
- `validate-version-consistency` - hard-fail CI check ensuring `plugin.json` and `marketplace.json` versions match
- `validate-gitignore-pm-skills` - advisory CI check for `_pm-skills/` in `.gitignore`
- `validate-script-docs` - advisory CI check ensuring every script pair has companion `.md` documentation
- Companion `.md` documentation for all new scripts and 2 previously undocumented scripts (`check-context-currency`, `check-stale-bundle-refs`)
- `_pm-skills/` added to `.gitignore` (local state directory for update reports and backups)

### Changed
- `scripts/README_SCRIPTS.md` - expanded from 8 to 16 script entries with updated "When to use what" guide
- `.github/workflows/validation.yml` - added 6 new CI checks (1 hard-fail, 5 advisory)
- `docs/guides/using-skills.md` - trimmed workflow section to overview + link to new dedicated guide
- `docs/workflows/index.md` - added link to workflows guide
- `mkdocs.yml` - added "Using Workflows" nav entry under Guides
- Fixed `marketplace.json` version 2.8.2 → 2.9.0 (was out of sync with `plugin.json`)

## [2.9.0] - 2026-04-06

### Added
- 6 new workflows: Customer Discovery, Sprint Planning, Product Strategy, Post-Launch Learning, Stakeholder Alignment, Technical Discovery
- 7 `/workflow-*` slash commands (1 renamed from M-19 + 6 new)
- `scripts/generate-workflow-pages.py` - generates docs/workflows/ from source _workflows/

### Changed
- **BREAKING:** Renamed `_bundles/` → `_workflows/` and `docs/bundles/` → `docs/workflows/`
- **BREAKING:** Removed `/kickoff` command - replaced by `/workflow-feature-kickoff`
- Renamed "Workflow Bundles" → "Workflows" across all documentation
- Added URL redirects for old `/bundles/*` doc site paths

## [2.8.2] - 2026-04-04

### Added
- **Skill versioning concepts page** - `docs/concepts/versioning.md`: public-facing guide to skill SemVer, HISTORY.md, skills-manifest.yaml, tie-breaker rule, and lifecycle tool integration.
- **git-revision-date-localized plugin** - shows "last updated" and "created" dates on every page (enabled in CI).
- **Custom CSS** - `docs/stylesheets/extra.css` for card grid, tag badge, and admonition styling.
- **Theme overrides directory** - `overrides/` for future MkDocs Material customization.
- **F-12 effort brief** - skill quality convergence draft (first real-world use of lifecycle tools at scale).

### Changed
- `requirements-docs.txt` - added `mkdocs-git-revision-date-localized-plugin`.
- `mkdocs.yml` - added git-revision-date, custom_dir, extra_css, versioning page in nav.
- `docs/reference/categories.md` - fixed stale coordination skill count (5→7) and total (27→29).
- `marketplace.json` - updated to v2.8.1 / 29 skills.

### Release Notes
- Documentation-only release. No skill or command behavior changes.
- No `pm-skills-mcp` code changes required (docs parity update only).

## [2.8.1] - 2026-04-04 ([release notes](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.8.1))

### Added
- **Documentation site** at [product-on-purpose.github.io/pm-skills](https://product-on-purpose.github.io/pm-skills/) - MkDocs Material with tab navigation, dark mode, search, and mermaid diagram rendering.
- **"Follow the Product" showcase** - 3 interactive narrative journeys (Storevine B2B, Brainshelf Consumer, Workbench Enterprise) with 84 real sample outputs from the sample library, including prompts and full artifacts.
- **Skill finder** - interactive decision tree and artifact table for choosing the right skill.
- **Recipes** - 7 end-to-end workflows (Pitch a Feature, Run an Experiment, Launch a Feature, Discover and Frame, Define the Opportunity, Sprint Retro, Full Lifecycle) with mermaid flow diagrams.
- **Skill comparisons** - 6 side-by-side comparisons for commonly confused skill pairs (PRD vs Solution Brief, Hypothesis vs Problem Statement, etc.).
- **Prompt gallery** - curated real prompts in 3 styles (organized, casual, enterprise) from the sample library.
- **Per-skill real-world examples** - 3 collapsible sample outputs (one per narrative thread) embedded on 25 skill pages.
- **Quick-try snippets** - copy-pasteable slash command at the top of every skill page.
- **Phase flow diagrams** - mermaid diagrams on all 6 phase index pages showing how skills connect.
- **Tags plugin** - browse skills by phase and category tags.
- **Social cards** - OpenGraph preview cards for link sharing (enabled in CI).
- **Generation scripts** - `scripts/generate-skill-pages.py` (29 skill pages + indexes + commands ref) and `scripts/generate-showcase.py` (3 showcase journeys from sample library).
- **Deploy workflow** - `.github/workflows/deploy-docs.yml` auto-deploys on push to main.
- **MkDocs config guide** - `docs/internal/mkdocs/mkdocs-config.md` for maintainers.
- **MCP setup guide** - `docs/guides/mcp-setup.md` for users: install, configure, and use pm-skills-mcp across Claude Desktop, Cursor, Claude Code, and VS Code.

### Changed
- **MCP integration guide** - updated tool counts (25→29 skill tools, 42 total), added acceptance-criteria and utility skill tools, updated slash command mapping table, removed stale catalog note, updated version references to v2.8.0.

### Release Notes
- Documentation-only release - no PM skill or slash-command behavior changes.
- No `pm-skills-mcp` update required.
- Site is generated from existing content (skills, samples, docs) plus new guide pages.
- 70+ navigable pages, zero build warnings.

## [2.8.0] - 2026-04-03 ([release notes](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.8.0))

### Added
- **F-10: utility-pm-skill-validate skill** (#121) - second utility skill. Audits existing skills against structural conventions (mirroring CI) and LLM-assessed quality criteria. Produces a pipe-delimited validation report (`Report schema: v1`) with severity-graded findings (FAIL/WARN/INFO) and actionable recommendations with target file paths. Two-tier assessment rebaselined against shipped library conventions. Includes SKILL.md, TEMPLATE.md (report format), EXAMPLE.md (validated `deliver-prd`), `/pm-skill-validate` command, and AGENTS.md entry. Skill count: 27 → 28.
- **F-11: utility-pm-skill-iterate skill** (#122) - third utility skill. Applies targeted improvements to existing skills from feedback, validation reports, or convention changes. Unified flow with input normalization, before/after preview, stale-preview guard, version bump class suggestion (don't auto-write), and HISTORY.md creation at second-version trigger point. Includes SKILL.md, TEMPLATE.md (change summary), EXAMPLE.md (iterated `deliver-prd`), `/pm-skill-iterate` command, and AGENTS.md entry. Skill count: 28 → 29.
- **M-18: CI skill versioning validation** - two new advisory scripts following `.sh` + `.ps1` + `.md` convention: `validate-skill-history` (checks HISTORY.md tracks current frontmatter version) and `validate-skills-manifest` (checks release manifest entries match skill directories). Added to `validation.yml` with `continue-on-error: true`.
- **D-03: `docs/pm-skill-lifecycle.md`** - public guide explaining the Create → Validate → Iterate lifecycle with workflow patterns (new skill, improve existing, convention change, feedback loop), CI vs validator comparison, and quality standard model.
- **Governance: `docs/internal/skill-versioning.md`** - SemVer rules for skills, HISTORY.md contract, skills-manifest.yaml format, release checklist, and tie-breaker rule for gray-area version bump classification.
- `docs/internal/release-plans/v2.7.0/skills-manifest.yaml` - retroactive first use of the skills-manifest convention.
- `docs/internal/release-plans/v2.8.0/` - release governance with phased execution plan and Codex design review.

### Changed
- **D-04: public docs refresh for v2.8.0** - updated skill counts (29), command counts (30), utility skill breakdown (3), Skill Lifecycle Tools section in README and QUICKSTART, command table, AGENTS.md entries, AGENTS/claude/CONTEXT.md, `docs/pm-skill-anatomy.md` lifecycle cross-reference, and `scripts/README_SCRIPTS.md` with M-18 script documentation.
- `docs/internal/releases/` renamed to `docs/internal/release-plans/` with all internal references updated (34 files).
- `docs/internal/backlog-canonical.md` updated with v2.8.0 assignments (F-10, F-11, D-03, M-18, D-04).

### Release Notes
- Completes the **PM skill lifecycle**: Create (`/pm-skill-builder`, v2.7.0) → Validate (`/pm-skill-validate`) → Iterate (`/pm-skill-iterate`).
- First release with **skill versioning governance** - skills-manifest.yaml per release, HISTORY.md per skill (opt-in), SemVer tie-breaker rule.
- First release with **advisory CI for skill versioning** - HISTORY.md and skills-manifest.yaml validators.
- Repo now contains 29 skills (25 domain + 1 foundation + 3 utility), 30 command docs, and 3 workflow bundles.
- **MCP note**: `pm-skills-mcp` needs a re-embed to pick up both new skills. `utility-pm-skill-validate` → `pm_pm_skill_validate`. `utility-pm-skill-iterate` → `pm_pm_skill_iterate`.

## [2.7.0] - 2026-03-22 ([release notes](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.7.0))

### Added
- **F-06: deliver-acceptance-criteria skill** (#114) - new Deliver phase skill for Given/When/Then acceptance criteria generation covering happy path, edge cases, error states, and non-functional criteria. Includes SKILL.md, TEMPLATE.md, EXAMPLE.md (e-commerce checkout scenario), `/acceptance-criteria` command, and AGENTS.md entry. Skill count: 25 → 26.
- **F-05: utility-pm-skill-builder skill** (#113) - first utility-classified skill. Interactive builder that guides contributors from a PM skill idea to a complete Skill Implementation Packet with gap analysis, Why Gate, classification, exemplar-driven drafting, and staging-to-promotion workflow. Includes SKILL.md, TEMPLATE.md, EXAMPLE.md (change-communication scenario), `/pm-skill-builder` command, and AGENTS.md Utility Skills section. Skill count: 26 → 27.
- **M-12: CI validation enhancement** (#112) - extended linter with description word count (20-100) and TEMPLATE.md header count (≥3) checks; new `validate-agents-md` script for AGENTS.md ↔ skill directory sync; new `check-mcp-impact` advisory script for MCP impact detection. All scripts follow `.sh + .ps1 + .md` convention.
- **M-16: exclude docs/internal from release ZIP** (#123) - release packagers (`build-release.sh` and `.ps1`) now strip `docs/internal/**` from staged artifacts. Internal governance docs stay tracked in-repo but no longer ship to end users.
- **D-01: `docs/pm-skill-anatomy.md`** - practical guide to pm-skills skill structure covering directory layout, classification types, frontmatter, Triple Diamond phases, wiring layer, and CI validation. Complements the spec-level `docs/agent-skill-anatomy.md`.
- `_staging/` added to `.gitignore` for pm-skill-builder draft artifacts.

### Changed
- **D-02: public docs review for v2.7.0** - updated skill counts (27), command counts (28), M-12 script documentation, domain/foundation/utility classification model, skill template modernization, frontmatter schema with utility example, and `docs/agent-skill-anatomy.md` scope note. Post-F-05 reconciliation patched 3 stale references.
- Fixed duplicate workflow steps in `validation.yml` (validate-agents-md and check-mcp-impact each ran twice).
- AGENTS.md gains a `### Utility Skills` section and `/pm-skill-builder` in the Commands table.
- `docs/internal/backlog-canonical.md` rewritten with Release, Status, and Agent columns.
- Release governance folders created for v2.2.0, v2.3.0, and v2.7.0 (v2.2.0 and v2.3.0 migrated from legacy locations).

### Removed
- `docs/internal/delivery-plan/` - legacy directory removed from tracking.
- `docs/internal/release-planning/` - legacy directory removed from tracking.

### Release Notes
- First release with a **utility** skill classification - `pm-skill-builder` creates new PM skills interactively.
- First release with enhanced CI: frontmatter linting, AGENTS.md sync validation, MCP impact detection.
- Release ZIPs now exclude `docs/internal/**` while preserving all public documentation.
- Repo now contains 27 skills (25 domain + 1 foundation + 1 utility), 28 command docs, and 3 workflow bundles.
- **MCP note**: `pm-skills-mcp` needs a re-embed to pick up both new skills. `deliver-acceptance-criteria` → `pm_acceptance_criteria`. `utility-pm-skill-builder` → `pm_pm_skill_builder` (double `pm_` is intentional - preserves skill name, consistent with future `pm_agent_skill_builder`). Update `embed-skills.js` to strip classification prefixes (`foundation-`, `utility-`) alongside phase prefixes.

## [2.6.1] - 2026-03-04

### Added
- Release note artifact:
  - `docs/releases/Release_v2.6.1.md`

### Changed
- Sample output library moved and normalized to:
  - `library/skill-output-samples/`
- Sample creation standards filename standardized to:
  - `library/skill-output-samples/SAMPLE_CREATION.md`
- Sample coverage manifest moved to release-planning artifacts (internal)
- Release packaging now includes sample-library content:
  - `scripts/build-release.sh`
  - `scripts/build-release.ps1`
- Release workflow-generated notes now list sample-library inclusion:
  - `.github/workflows/release.yml`
- README release metadata rolled forward to `v2.6.1`.

### Release Notes
- Patch release focused on sample-library recovery, naming/path normalization, and release-artifact inclusion.
- No PM skill instruction or slash-command behavior changes.

## [2.6.0] - 2026-03-04

### Added
- Claude plugin manifest: `.claude-plugin/plugin.json`.
- Plugin packaging validation workflow:
  - `.github/workflows/validate-plugin.yml`
- Release note artifact:
  - `docs/releases/Release_v2.6.0.md`

### Changed
- Release packaging now includes `.claude-plugin/` in ZIP staging:
  - `scripts/build-release.sh`
  - `scripts/build-release.ps1`
- Release packaging now enforces staged plugin-manifest version parity with the target release version.
- GitHub release workflow notes now include plugin-manifest install guidance:
  - `.github/workflows/release.yml`
- README release/install guidance updated for plugin install plus explicit Copilot/OpenCode setup notes.

### Release Notes
- Minor release focused on Claude plugin packaging and release automation hardening.
- No PM skill or slash-command behavior changes.
- No `pm-skills-mcp` deploy is included in this release scope.

## [2.5.2] - 2026-03-04

### Changed
- Rewrote public release-facing docs for clearer user-first language and historical readability.
- Removed internal decision-ID style references from release-facing docs where they were not needed for external readers.
- Removed local working-note path references from public release artifacts.
- Added release note artifact:
  - `docs/releases/Release_v2.5.2.md`

### Release Notes
- Patch release focused on public documentation quality and release-communication clarity.
- No PM skill behavior changes and no output/config contract changes from `v2.5.0`.

## [2.5.1] - 2026-03-04

### Changed
- Canonicalized Claude agent continuity workspace to `AGENTS/claude/` and retired active `AGENTS/claude-opus*` paths.
- Updated tracked `.claude` scaffolding templates to emit `AGENTS/claude` for init/wrap workflows.
- Added clean-worktree release runbook for deterministic cut/tag/publish lanes:
  - `docs/internal/release-planning/runbook_clean-worktree-cut-tag-publish.md`

### Release Notes
- Patch release focused on agent-workspace naming consistency and release-lane operational hygiene.
- No PM skill behavior changes and no output/config contract changes from `v2.5.0`.

## [2.5.0] - 2026-03-02

### Added
- Foundation persona capability with:
  - `skills/foundation-persona/` skill + references
  - `/persona` command at `commands/persona.md`
  - AGENTS discovery coverage for foundation classification

### Highlights
- Taxonomy updates shipped with explicit foundation classification handling.
- Sample-library lane closure evidence captured in release planning/checklist artifacts.
- Doc-hygiene closure completed across README/getting-started and release metadata references.
- Persona archetype library shipment and full persona MCP exposure parity remain deferred from `v2.5.0`.

## [2.4.3] - 2026-02-16

### Added
- Release note artifact: `docs/releases/Release_v2.4.3.md`.

### Changed
- Rolled forward release metadata references to treat `v2.4.3` as the latest stable patch:
  - `README.md`
  - `CHANGELOG.md`
- Captured explicit published-artifact links in release docs:
  - `docs/releases/Release_v2.4.3.md`

### Release Notes
- Patch release to include post-`v2.4.2` documentation/release-link updates in tagged artifacts.
- No PM skill behavior changes and no output/config contract changes from `v2.4.0`.

## [2.4.2] - 2026-02-16

### Added
- Release note artifact: `docs/releases/Release_v2.4.2.md`.
- Canonical delivery-plan policy and migration docs:
  - `docs/internal/delivery-plan/README.md`
  - `docs/internal/delivery-plan/v2.4-contract-lock-summary.md`
  - `docs/internal/delivery-plan/v2.5/` continuity kickoff artifacts

### Changed
- Started v2.5 continuity execution in tracked release-planning artifacts and checklist status.
- Updated release-planning and v2.4 release docs to treat `docs/internal/delivery-plan/` as canonical release-governance truth.
- Archived legacy internal repo-submission planning docs from tracked `docs/internal/`.

### Removed
- Legacy internal docs from tracked `docs/internal/`:
  - `docs/internal/repo-list_claude-code.md`
  - `docs/internal/pr-quick-reference.md`
  - `docs/internal/awesome-product-management-pr.md`
  - `docs/internal/AWESOME-PM-PR.md`
  - `docs/internal/awesome-lists-submission-package.md`
  - `docs/internal/awesome-lists-submission-package_planning.md`
  - `docs/internal/link-notes.md`

### Release Notes
- Patch release focused on governance hygiene and tracked-vs-local artifact clarity.
- No PM skill behavior changes and no output/config contract changes from `v2.4.0`.
- Published GitHub release: `https://github.com/product-on-purpose/pm-skills/releases/tag/v2.4.2`.

## [2.4.1] - 2026-02-16

### Added
- Release note artifact: `docs/releases/Release_v2.4.1.md`.
- Long-form internal delivery/engineering explainer:
  - `docs/internal/Releases_2.3-2.4_detailed-breakdown.md`

### Changed
- Finalized `v2.4.x` release-doc consistency:
  - `README.md`
  - `CHANGELOG.md`
  - `docs/releases/Release_v2.4.md`
  - `docs/internal/release-planning/checklist_v2.4.0.md`
  - `docs/internal/release-planning/Release_v2.2_to_v2.5_execution-plan.md`

### Release Notes
- Patch follow-up for release documentation and communication alignment only.
- No new PM skills and no output/config contract behavior changes from `v2.4.0`.

## [2.4.0] - 2026-02-16

### Added
- Release note artifact: `docs/releases/Release_v2.4.md`.
- Canonical tracked contract-lock summary:
  - `docs/internal/delivery-plan/v2.4-contract-lock-summary.md`

### Changed
- Release-planning artifacts updated for `v2.4.0` ship state:
  - `docs/internal/release-planning/Release_v2.2_to_v2.5_execution-plan.md`
  - `docs/internal/release-planning/checklist_v2.4.0.md`
  - `docs/internal/release-planning/README.md`
- Canonical backlog release cadence anchors synced for v2.4 closure:
  - `docs/internal/backlog-canonical.md`
- v2.4 contract-lock closure state advanced to `closed-aligned` and is summarized in:
  - `docs/internal/delivery-plan/v2.4-contract-lock-summary.md`
- Expanded `validate-mcp-sync` checks to include `pm-skills-mcp` pin metadata and contract-version parity via `pm-skills-source.json`.
- Corrected MCP integration guide utility-tool inventory to 7 tools (`pm_cache_stats` included).
- Updated MCP compatibility references to direct version tracking (`pm-skills v2.4.x` ↔ `pm-skills-mcp v2.4.x`) in ecosystem/integration docs.

### Release Notes
- This release closes the v2.4.0 contract-lock scope:
  - Output behavior contract locked and recorded as aligned.
  - Configuration contract/schema lock recorded as aligned with validator proof artifacts.

## [2.3.0] - 2026-02-13

### Added
- Release note artifact: `docs/releases/Release_v2.3.md`.

### Changed
- MCP sync workflow default mode switched to `block` in `.github/workflows/validate-mcp-sync.yml` (manual `workflow_dispatch` can still set `observe`).
- Updated MCP sync guide for blocking-default rollout state (`docs/guides/validate-mcp-sync.md`).
- Updated compatibility references for current MCP status:
  - `README.md` note now points to `pm-skills-mcp v2.1+` as aligned baseline.
  - `docs/reference/ecosystem.md` reflects 36 MCP tools (24 skills + 5 workflows + 7 utilities).
- Release-planning artifacts updated for `v2.3.0` closure:
  - `docs/internal/release-planning/checklist_v2.3.0.md`
  - `docs/internal/release-planning/Release_v2.2_to_v2.5_execution-plan.md`

### Release Notes
- This release closes the v2.3.0 scope:
  - Cross-repo alignment closure recorded on pinned refs.
  - Blocking `validate-mcp-sync` mode enabled by default.

## [2.2.0] - 2026-02-13

### Added
- Validation-only MCP drift checker script: `.github/scripts/validate-mcp-sync.js`
- MCP sync workflow: `.github/workflows/validate-mcp-sync.yml` (observe-only default)
- MCP sync usage guide: `docs/guides/validate-mcp-sync.md`
- Planning persistence governance docs:
  - `docs/internal/planning-persistence-policy.md`
  - `docs/internal/planning-artifact-tier-map.md`
- Canonical backlog governance reference: `docs/internal/backlog-canonical.md`
- Release execution artifacts:
  - `docs/releases/Release_v2.2.md`
  - `docs/internal/release-planning/Release_v2.2_to_v2.5_execution-plan.md`
  - `docs/internal/release-planning/checklist_v2.2.0.md`
  - `docs/internal/release-planning/checklist_v2.3.0.md`
  - `docs/internal/release-planning/checklist_v2.4.0.md`
  - `docs/internal/release-planning/checklist_v2.5.0.md`

### Changed
- `CONTRIBUTING.md`: added MCP sync guardrail guidance for contributors.
- `scripts/README_SCRIPTS.md`: clarified `.github/scripts/` usage and drift-check rollout.
- `docs/guides/mcp-integration.md`: linked new MCP sync validation guide.
- `.gitignore`: aligned AGENTS ignore rules with planning persistence policy.

### Release Notes
- This release establishes guardrails and governance:
  - Observe-only sync validation baseline.
  - Planning persistence policy baseline.
  - Canonical backlog governance baseline.

## [2.1.0] - 2026-01-27

### Added
- **MCP Alignment Milestone** - pm-skills-mcp v2.1.0 now fully aligned with flat structure
- Version alignment table in ecosystem documentation

### Changed
- Updated ecosystem documentation noting MCP v2.1 compatibility
- Clarified that pm-skills-mcp v2.1+ is required for full compatibility with pm-skills v2.x flat structure

### Ecosystem
- pm-skills-mcp v2.1.0 released with:
  - Flat resource URIs: `pm-skills://skills/{skill}`
  - Phase read from frontmatter, not path
  - Tool names remain stable (`pm_prd`, `pm_hypothesis`, etc.)

## [2.0.1] - 2026-01-27

### Added
- Validation workflow (`validation.yml`) running command + front-matter checks on Ubuntu and Windows.
- Front-matter lint scripts (`scripts/lint-skills-frontmatter.sh` / `.ps1`) that verify required keys, directory-name alignment, and reference files.
- Noted command validator scripts in project structure/README.
- Scripts guide renamed to `scripts/README_SCRIPTS.md` to avoid name collisions.

### Changed
- Removed nested `metadata.version` fields from all skills; lint now enforces a single root version and required keys.
- Parameterized build scripts (`build-release.sh` / `.ps1`) and release workflows to derive artifact names from the tag/ref (defaulting to v2.0.1); added zip/hash fallbacks for Windows.
- `validate-commands` now reports multi-skill bundles (e.g., `/kickoff`) without misleading first-path-only output.
- README path examples updated to `skills/{phase-skill}/`; AGENTS.md clarifies bundle links are repo-relative; release workflow typo fixed (`openskills`).
- Moved skill templates to `docs/templates/` and updated references (authoring guide, README, project-structure, AGENTS context).
- README refresh: expanded v2.0 highlights, updated project structure tree, roadmap in-progress items, note that pm-skills-mcp v1.x is outdated (v2.1 underway).
- `docs/reference/project-structure.md` now has a table of contents, updated directory tree, full commands list, and template path.

## [2.0.0] - 2026-01-26

### Breaking
- Repository flattened to `skills/{phase-skill}/` (hyphen-only). All prior nested `skills/<phase>/<skill>/` paths removed.
- Slash commands now point to the flat skill paths; update local references/scripts accordingly.

### Added
- Sync helpers `scripts/sync-claude.sh` and `scripts/sync-claude.ps1` to regenerate `.claude/skills` and `.claude/commands` for Claude Code / openskills discovery with validation.
- Build scripts `scripts/build-release.sh` and `scripts/build-release.ps1` to create `pm-skills-v2.0.zip` with manifest/hash (excludes populated `.claude`).
- `.claude/pm-skills-for-claude.md` usage note for discovery.

### Changed
- All 24 skills renamed to flat `{phase-skill}` directories; SKILL front matter updated with `phase`, `version: 2.0.0`, and `updated: 2026-01-26`.
- Docs refreshed to reflect flat structure and two-path install story (flat source vs. optional `.claude/` via sync helper), including README, QUICKSTART, AGENTS, bundles, guides, and references.
- Workflows (`release.yml`, `release-zips.yml`) call the new build-release script.
- `.gitignore` now excludes `.claude/skills`, `.claude/commands`, and `dist/`.

### Validation
- Path scan confirms no residual `skills/<phase>/` references in public docs/commands.
- Front-matter check: all `skills/*/SKILL.md` include required `name`, `phase`, `version`, `updated`.

## [1.2.0] - 2026-01-20

**PM-Skills v1.2.0 - Security & Community Infrastructure**

This release adds essential security policies, automated vulnerability scanning, and improved issue/PR templates for community contributions.

### Added
- **SECURITY.md** - Security policy with vulnerability reporting guidelines
- **CodeQL code scanning** - Automated security analysis via GitHub Actions (`.github/workflows/codeql.yml`)
- **Dependabot configuration** - Automated dependency updates for GitHub Actions and npm (`.github/dependabot.yml`)
- **Issue templates** - Structured forms for bug reports and feature requests
  - `bug_report.yml` - Skill-specific bug reporting with environment details
  - `feature_request.yml` - New skill and enhancement proposals
  - `config.yml` - Directs questions to Discussions, security issues to policy
- **Pull request template** - Standardized PR checklist (`.github/PULL_REQUEST_TEMPLATE.md`)

### Changed
- Issue creation now requires using templates (blank issues disabled)

### Security
- Enabled CodeQL scanning for JavaScript analysis on push, PR, and weekly schedule
- Added security policy with responsible disclosure guidelines

## [1.1.1] - 2026-01-20

### Added
- **CODE_OF_CONDUCT.md** - Contributor Covenant v2.1 for community guidelines
- **Attribution headers** - Added HTML comment attribution to all 24 SKILL.md files
- **Open-skills ecosystem submissions**
  - Submitted PR to [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills/pull/62)
  - Submitted to [n-skills marketplace](https://github.com/numman-ali/n-skills/issues/6)

### Changed
- **CONTRIBUTING.md** - Updated Code of Conduct section to link to dedicated CODE_OF_CONDUCT.md
- **README.md** - Updated openskills CLI installation section with accurate guidance
- **README.md** - Minor formatting cleanup (em dashes, navigation labels, alt text)

### Fixed
- **openskills#48 resolved** - [numman-ali/openskills#48](https://github.com/numman-ali/openskills/issues/48) fixed in openskills v1.3.1
  - Root cause: hardcoded `/` path separator failed on Windows
  - Verified: `anthropics/skills` now installs all 17 skills successfully
  - Note: pm-skills uses deeper nesting than openskills auto-discovers; Git clone recommended

## [1.1.0] - 2026-01-16

**PM-Skills v1.1.0 - Documentation & README Overhaul**

This release brings a comprehensive documentation expansion and a major README redesign following open-source best practices. The README now features better navigation, an FAQ section, and improved discoverability.

### Added
- **Comprehensive Documentation Expansion**
  - `docs/getting-started.md` - Detailed setup guide covering 5 installation methods
  - `docs/guides/using-skills.md` - Beginner to advanced usage guide with SPICE context framework, skill chaining, and 7 power-user patterns
  - `docs/guides/authoring-pm-skills.md` - Complete guide for creating and submitting new skills
  - `docs/frameworks/triple-diamond-delivery-process.md` - Triple Diamond methodology documentation
- **README Major Enhancements**
  - Collapsible Table of Contents for easier navigation
  - FAQ section with 7 expandable Q&A items covering common questions
  - License section with Apache 2.0 permissions explained
  - Acknowledgments section crediting frameworks and resources
  - About the Author section
  - More Suggestions section for community engagement
  - Project Status badge (Active)
  - GitHub stats badges (stars, forks, issues, contributors, last commit)
  - Back-to-top navigation links throughout
  - Change Log Summary table with version highlights
  - Releases section with download badge
  - Expanded Usage intro explaining skills, commands, and bundles
  - Workflow Bundles intro paragraph
  - Updated Built with section with visual badges
- **Open-Skills Ecosystem Integration**
  - Prepared PR content for awesome-claude-skills submission
  - Prepared submission content for n-skills marketplace
  - Documented openskills CLI compatibility testing
  - Filed [openskills#48](https://github.com/numman-ali/openskills/issues/48) for nested path bug
- **GitHub Release Workflow**
  - `.github/workflows/release.yml` - Automated ZIP creation on tag push
  - Creates two artifacts: full package + Claude.ai bundle
- **CLAUDE.md** - Agent instructions with documentation rules

### Changed
- **Documentation Reference Files Significantly Expanded**
  - `docs/reference/categories.md` - Expanded from 54 to 420+ lines with diagrams, workflows, and framework mappings
  - `docs/reference/frontmatter-schema.yaml` - Expanded from 91 to 600 lines with validation rules, examples, and best practices
- **New `/docs` Taxonomy Structure**
  - `docs/reference/` - Technical specifications (categories, schema)
  - `docs/guides/` - How-to guides (using-skills, authoring-pm-skills)
  - `docs/frameworks/` - Methodology documentation (triple-diamond)
- Renamed `_docs/` → `docs/` and `_templates/` → `templates/` for standard conventions
- README.md restructured following best-practices from Best-README-Template and amazing-github-template
- Updated README.md Quick Start with 4 installation options (Git clone recommended)
- Reordered installation methods based on openskills bug discovery
- Version badge updated to 1.1.0

### Fixed
- Discovered and documented [openskills#48](https://github.com/numman-ali/openskills/issues/48) - nested directory structure bug affecting pm-skills and anthropics/skills

## [1.0.1] - 2026-01-15

### Added
- **All 24 Slash Commands Complete** - Every skill now has a corresponding command
  - `/competitive-analysis` - Discover phase
  - `/interview-synthesis` - Discover phase
  - `/stakeholder-summary` - Discover phase
  - `/jtbd-canvas` - Define phase
  - `/opportunity-tree` - Define phase
  - `/adr` - Develop phase
  - `/design-rationale` - Develop phase
  - `/solution-brief` - Develop phase
  - `/spike-summary` - Develop phase
  - `/edge-cases` - Deliver phase
  - `/launch-checklist` - Deliver phase
  - `/release-notes` - Deliver phase
  - `/dashboard-requirements` - Measure phase
  - `/experiment-design` - Measure phase
  - `/experiment-results` - Measure phase
  - `/instrumentation-spec` - Measure phase
  - `/lessons-log` - Iterate phase
  - `/pivot-decision` - Iterate phase
  - `/refinement-notes` - Iterate phase
  - `/retrospective` - Iterate phase
- GitHub issues #43-62 created and closed for slash command tracking

### Changed
- Updated README.md Slash Commands section to list all 24 commands
- Updated AGENTS.md Commands section to list all 24 commands
- Updated plan-open-skills.md compatibility table to reflect slash commands complete

## [1.0.0] - 2026-01-14

**PM-Skills v1.0.0 - Complete Triple Diamond coverage is here!**

This release marks the completion of all 24 PM skills across the entire product development lifecycle. From discovery to iteration, PM-Skills now provides comprehensive coverage for product managers using AI assistants.

### Added
- **Phase 3 Complete: P2 Skills (11 skills) - All 24 skills now implemented!**
  - `competitive-analysis` skill - Discover phase (`skills/discover-competitive-analysis/`)
  - `stakeholder-summary` skill - Discover phase (`skills/discover-stakeholder-summary/`)
  - `opportunity-tree` skill - Define phase (`skills/define-opportunity-tree/`)
  - `jtbd-canvas` skill - Define phase (`skills/define-jtbd-canvas/`)
  - `design-rationale` skill - Develop phase (`skills/develop-design-rationale/`)
  - `dashboard-requirements` skill - Measure phase (`skills/measure-dashboard-requirements/`)
  - `experiment-results` skill - Measure phase (`skills/measure-experiment-results/`)
  - `retrospective` skill - Iterate phase (`skills/iterate-retrospective/`)
  - `lessons-log` skill - Iterate phase (`skills/iterate-lessons-log/`)
  - `refinement-notes` skill - Iterate phase (`skills/iterate-refinement-notes/`)
  - `pivot-decision` skill - Iterate phase (`skills/iterate-pivot-decision/`)
- Each skill includes SKILL.md, references/TEMPLATE.md, and references/EXAMPLE.md
- GitHub labels: `phase-3`, `P2`
- GitHub issues #26-36 for skill tracking
- **Phase 3 Infrastructure: Workflow Bundles**
  - `_bundles/triple-diamond.md` - Complete product development cycle guide
  - `_bundles/lean-startup.md` - Build-Measure-Learn rapid iteration guide
  - `_bundles/feature-kickoff.md` - Quick-start workflow for feature development
- **Phase 3 Infrastructure: Slash Commands**
  - `commands/prd.md` - Create Product Requirements Document
  - `commands/problem-statement.md` - Create problem statement
  - `commands/hypothesis.md` - Define testable hypothesis
  - `commands/user-stories.md` - Generate user stories
  - `commands/kickoff.md` - Run Feature Kickoff workflow
- **Phase 3 Infrastructure: Agent Discovery**
  - `AGENTS.md` - Universal agent discovery file listing all 24 skills
- **Phase 3 Infrastructure: GitHub Actions**
  - `.github/workflows/sync-agents-md.yml` - Auto-sync AGENTS.md on skill changes
  - `.github/workflows/release-zips.yml` - Package skills as ZIPs on release

### Changed
- Updated README.md Skills Inventory badge to 24/24 (complete)
- Updated README.md all skill status indicators to ✅
- Updated README.md roadmap to show Phase 3 P2 Skills complete
- Updated CONTEXT.md to reflect Phase 3 completion

## [0.3.0] - 2026-01-14

### Added
- **Phase 2 Complete: P1 Skills (8 skills)**
  - `interview-synthesis` skill - Discover phase (`skills/discover-interview-synthesis/`)
  - `solution-brief` skill - Develop phase (`skills/develop-solution-brief/`)
  - `spike-summary` skill - Develop phase (`skills/develop-spike-summary/`)
  - `adr` skill - Develop phase (`skills/develop-adr/`)
  - `edge-cases` skill - Deliver phase (`skills/deliver-edge-cases/`)
  - `release-notes` skill - Deliver phase (`skills/deliver-release-notes/`)
  - `experiment-design` skill - Measure phase (`skills/measure-experiment-design/`)
  - `instrumentation-spec` skill - Measure phase (`skills/measure-instrumentation-spec/`)
- Each skill includes SKILL.md, references/TEMPLATE.md, and references/EXAMPLE.md
- GitHub labels: `phase-2`, `P1`
- GitHub milestone: v0.3.0 - P1 Skills
- GitHub issues #18-25 for skill tracking

### Changed
- Updated README.md Skills Inventory with status indicators (✅ implemented, 🔜 coming soon)
- Updated README.md roadmap to show Phase 2 complete
- Updated plan-v1.md Progress Tracker with GitHub issue links for Phase 2
- Updated CONTEXT.md to reflect Phase 2 completion and add Skills Inventory table

## [0.2.0] - 2026-01-14

### Added
- **Phase 1 Complete: P0 Core Skills**
  - `problem-statement` skill - Define phase (`skills/define-problem-statement/`)
  - `hypothesis` skill - Define phase (`skills/define-hypothesis/`)
  - `prd` skill - Deliver phase (`skills/deliver-prd/`)
  - `user-stories` skill - Deliver phase (`skills/deliver-user-stories/`)
  - `launch-checklist` skill - Deliver phase (`skills/deliver-launch-checklist/`)
- Each skill includes SKILL.md, references/TEMPLATE.md, and references/EXAMPLE.md
- GitHub labels: `skill`, `phase-1`, `P0`
- GitHub milestone: v0.2.0 - P0 Core Skills
- GitHub issues #10-14 for skill tracking

### Changed
- Updated plan-v1.md Progress Tracker with GitHub issue links
- Updated CONTEXT.md to reflect Phase 1 completion

## [0.1.0] - 2026-01-14

### Added
- Initial project structure with agentic coding support
- Comprehensive README.md with badges, skills inventory, and platform compatibility matrix
- Apache 2.0 LICENSE
- CHANGELOG.md following Keep a Changelog format
- .gitignore with standard exclusions
- AGENTS/claude-opus-4.5/ folder for AI session continuity
  - CONTEXT.md - Project state tracking
  - TODO.md - Task management
  - DECISIONS.md - Technical decision log
  - SESSION-LOG/ - Session documentation
- PLANNING/ folder convention for collaboration artifacts (reviews, drafts, analysis)
- plan-v1-review.md - Comprehensive review of implementation plan
- v0.1 tag - Plan review milestone
- 9 GitHub issues for plan-v1.md improvement opportunities
- **Phase 0 Foundation Complete:**
  - CONTRIBUTING.md with curated contribution model
  - Full directory structure (`skills/`, `_bundles/`, `docs/`, `templates/`, `commands/`)
  - Schema documentation (`_docs/frontmatter-schema.yaml`)
  - Category reference (`_docs/categories.md`)
- Skill template structure (`docs/templates/skill-template/` with SKILL.md, TEMPLATE.md, EXAMPLE.md)
- wrap-session skill for end-of-session documentation workflow

### Changed
- Updated CONTEXT.md status from "Foundation complete" to "Foundation in progress (~40%)"
- Updated plan-v1.md Progress Tracker with inline status notes
- Fixed README.md roadmap to reflect accurate Phase 0 status
- **Phase 0 → 100% complete** - All foundation infrastructure now in place
- Updated README.md roadmap to show Phase 0 complete
- Expanded P1/P2 skill guidance in plan-v1.md (Issues #11-29)
- Updated example dates in templates to use `<YYYY-MM-DD>` placeholder
- Added PowerShell validation commands for Windows compatibility

### Fixed
- Pre-Flight Checklist path error in planning document
- VISION.md location inconsistency resolved
- Issue #1 conflict with existing files (added "skip if exists" note)

### Closed
- All 9 GitHub issues (#1-9) - plan improvements complete
