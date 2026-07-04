# Spec: Trust repair + hygiene (v2.30.0, M-35) - DRAFT for review

Companion to [`plan_v2.30.0.md`](plan_v2.30.0.md). Defines each workstream's requirements (REQ-T\<ws\>.\<n\>, testable), the exact file-level change list with the 2026-07-04 deep audit's file:line evidence (maintainer-local, gitignored), acceptance criteria, and a Durable CI block for every new or changed gate. A consolidated durable-CI inventory and the open questions close the doc.

**Convention note (verified against the repo, not assumed).** `scripts/validation-manifest.yaml` is scoped to SHELL validators only (`scripts/*.sh` + `scripts/*.ps1`); its parity referee `check-validator-parity.mjs` compares the shell inventory across the two local bundles and CI. Node (`.mjs`) checks run ONCE cross-platform in `.github/workflows/validation.yml` and are out of the manifest's remit by design. Therefore the new `.mjs` gates below are NOT registered in `validation-manifest.yaml`; they are wired directly into `validation.yml` with `if: always()` so they execute on BOTH matrix legs (ubuntu + windows), exactly like `check-sample-counts.mjs` and `check-trigger-fixtures.mjs` today. This spec follows the real architecture over the generic house summary.

**Enforcement ladder.** Every new gate ships advisory (`continue-on-error: true`) and is promoted to enforcing (guard removed) only after a dated clean-corpus rationale in the step comment, per the M-30 precedent already in `validation.yml`.

---

## WS-T1: count-truth sweep + phrase gate (P0-1, part P1-1)

### Requirements
- **REQ-T1.1** Every count-bearing authored surface reads the true catalog: 68 skills = 30 phase + 11 foundation + 12 utility + 15 tool; 6 sub-agents. No line may state a total that disagrees with its own sub-counts.
- **REQ-T1.2** Sample-count phrasings must not hardcode a stale absolute. "95+ sample outputs" is replaced by a phrasing that is either derived at build time or future-proof (for example "hundreds of sample outputs"); the real corpus is far larger than 95 (the audit records ~210 via the samples index and CHANGELOG).
- **REQ-T1.3** The three plugin manifests' narrative descriptions state the current catalog, not "v2.28.0 ... catalog grows to 67".
- **REQ-T1.4** A new deterministic gate derives the truth from `skills/` frontmatter + library file counts and fails on count-bearing phrase variants that the canonical-phrasing-only `check-count-consistency` cannot see, including the sub-agent axis.
- **REQ-T1.5** The off-repo GitHub About text is corrected via a documented, re-runnable command; the write is executed by agent:human.

### File changes (audit evidence)
- `QUICKSTART.md:5` - "67 shipped PM skills" then sub-counts (30+11+12+15) summing to 68 in the same line -> 68.
- `QUICKSTART.md:85` - "All 67 skill definitions (30 phase + 10 foundation ...)" contradicting line 5's "11 foundation" -> 68 / 11.
- `site/src/content/docs/getting-started/quickstart.md` - 67 at line 8, 68 at line 23, plus line 90 -> all 68.
- `site/src/content/docs/getting-started/index.md:83` -> 68.
- `README.md:1127` - "68 skills (30 phase + 10 foundation + 12 utility + 15 tool)" sub-counts sum to 67 -> 11 foundation.
- `README.md` - the "95+ sample outputs" phrase, 7 occurrences -> REQ-T1.2 phrasing.
- `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.codex-plugin/plugin.json` - descriptions narrating v2.28.0 / 67 while `version` is 2.29.1 -> current catalog + a v2.30.0 sentence.
- `_agent-context/claude/CONTEXT.md:83` -> 68.
- GitHub About: "67 ... 30 phase + 8 foundation + 10 utility + 15 tool ... 4 sub-agents" (sub-counts sum to 63; there are 6 sub-agents) -> corrected via `gh repo edit --description` (or the equivalent `gh api` PATCH), the command recorded in the spec + PR.
- `CHANGELOG.md:41` (the v2.29.0 entry) claims counts were re-derived "across the plugin manifests, README, QUICKSTART, and the documentation site"; the files falsify it. No edit to history; the new gate prevents the recurrence.
- Root cause reference: `scripts/check-count-consistency.md:35,47` documents the canonical-phrasing sensitivity that lets "67 shipped PM skills", "67 skill definitions", and "95+ sample outputs" evade the regex.

### Acceptance
- Grep for `\b67\b`, `10 foundation`, `95+`, `4 sub-agents`, `All 4` over `*.md`/`*.mdx`/`*.json` returns only historical/changelog hits.
- `check-count-phrases.mjs` exits 0 and, when a phrase is hand-broken in a fixture, exits nonzero with the offending file:line.
- The GitHub About command is recorded and, after the human run, `gh repo view` shows 68 / correct sub-counts / 6 sub-agents.

### Durable CI: `scripts/check-count-phrases.mjs`
- **Script:** `scripts/check-count-phrases.mjs` - derives the true total + sub-counts from `skills/*/SKILL.md` frontmatter and the true sample/sub-agent counts from disk, then scans README, QUICKSTART, the site authored pages, and the three manifest descriptions for count-bearing phrase variants: "NN shipped PM skills", "NN skill definitions", "NN PM skills", "NN+ sample", "All N sub-agents", "N sub-agents". Deliberately covers the sub-agent axis that `check-count-consistency` omits.
- **Test:** `scripts/check-count-phrases.test.mjs` (node --test; a good fixture passes, a hand-broken count fails, a historical changelog line is ignored). Added to the unit-test aggregation step.
- **Manifest:** NOT in `validation-manifest.yaml` (shell-parity remit only).
- **validation.yml wiring:** new step, `if: always()` (both OS legs), `continue-on-error: true` at merge.
- **Promotion:** advisory -> enforcing in Phase 7 (remove `continue-on-error`) once the corpus is swept clean and the grep sweep returns zero, with a dated rationale in the step comment. This gate must be enforcing before the tag.

---

## WS-T2: packaging integrity (P0-2)

### Requirements
- **REQ-T2.1** The curated release zip stages `agents/` (all 6 files) and `hooks/` (including `hooks.json`), so the reference-and-execute-inline dispatch pattern works on a zip install.
- **REQ-T2.2** The staged `docs/` excludes `docs/internal/` (the 421-file maintainer tree) from the user-facing zip.
- **REQ-T2.3** `.gitattributes` marks internal paths `export-ignore` so GitHub's auto-generated source archives also omit them.
- **REQ-T2.4** The existing zip CI job asserts the stage's contents positively and negatively.
- **REQ-T2.5** The update path and the docs describing zip contents match the new reality.

### File changes (audit evidence)
- `scripts/build-release.sh:37-62` (rsync + cp-fallback staging lists) - add `"$ROOT/agents"` and `"$ROOT/hooks"`; the audit verified no `agents/`, no `hooks/` today. Mirror in `scripts/build-release.ps1`.
- `scripts/build-release.sh:65` already does `rm -rf "$STAGE/docs/internal"`; confirm the `.ps1` has the exact equivalent (REQ-T2.2 is partly present in bash; verify parity).
- `.gitattributes` - add `docs/internal/ export-ignore`, `_agent-context/ export-ignore`, `.github/issues-drafts/ export-ignore`, `.github/issues-archive/ export-ignore` (the audit notes no export-ignore entries exist).
- `.github/workflows/validate-plugin.yml` - extend the existing "Validate Cowork compatibility" job (which already builds the zip at line 101-119) with the REQ-T2.4 assertions.
- `skills/utility-update-pm-skills/SKILL.md` - File Scope prose now lists `agents/` + `hooks/` as delivered (PATCH bump + HISTORY row; the zip it downloads now carries them).
- `site/src/content/docs/getting-started/platforms.md` - zip-contents description updated.

### Acceptance
- After `build-release.sh <v>`, the stage contains `agents/pm-changelog-curator.md`, `agents/pm-critic.md`, `agents/pm-release-conductor.md`, `agents/pm-skill-auditor.md`, `agents/pm-workflow-orchestrator.md`, `agents/pm-skill-router.md` (count 6) and `hooks/hooks.json`, and contains no `docs/internal` path.
- Every `agents/*.md` referenced by a `utility-pm-*` dispatch SKILL.md resolves inside the stage.
- `git archive` of a tag omits `docs/internal`, `_agent-context`, `.github/issues-*`.

### Durable CI: zip-stage assertions (in `validate-plugin.yml`)
- **Location:** the existing `validate-plugin` job (single ubuntu runner; the zip is already built there, so no new build cost). Not a new `.mjs` validator - a set of shell assertions appended after the build step, or a small helper `scripts/assert-release-stage.mjs` invoked on the built stage.
- **Assertions:** stage contains `agents/*.md` (count == 6) + `hooks/hooks.json`; stage contains no `docs/internal`; each dispatch skill's referenced `agents/*.md` exists in the stage.
- **Manifest:** N/A (packaging workflow, not the validation matrix).
- **Wiring:** enforcing from day one (deterministic, brand-new artifact, no corpus to stabilize - matches the resource-index precedent). The job already runs on PRs touching `scripts/build-release.*`, `skills/**`, and the manifests.
- **Promotion:** ships enforcing; no advisory phase needed.

---

## WS-T3: builder inventory derivation (P0-3)

### Requirements
- **REQ-T3.1** `utility-pm-skill-builder` no longer hand-maintains a family inventory; it instructs the run to derive the live inventory from `skill-manifest.json` or `AGENTS.md`.
- **REQ-T3.2** The gap-analysis step ("Check ALL existing skills for overlap") can reach all 68 skills, including the 15 tool skills.
- **REQ-T3.3** Any retained families overview carries no hard counts.

### File changes (audit evidence)
- `skills/utility-pm-skill-builder/SKILL.md:299` - header "Foundation Skills (11)" over a 10-row table (foundation-build-risk-review, shipped v2.29.0, absent); the string "tool-" appears zero times in the file, so overlap with the 15 tool skills is structurally invisible. Replace the inline inventory with the derive-at-run-time instruction + a thin families overview. MINOR bump + HISTORY row.

### Acceptance
- The file contains no hardcoded per-family count and no static family table; it names `skill-manifest.json` / `AGENTS.md` as the inventory source.
- A grep for a tool-family skill name (for example `tool-note-and-vote`) is now reachable via the derive instruction (the builder's overlap step references the generated inventory).
- `lint-skills-frontmatter` green; `gen-skill-manifest.mjs --check` green after the bump.

---

## WS-T4: cross-client truth sweep (P1-1 docs, P1-9)

### Requirements
- **REQ-T4.1** The sub-agent compatibility matrix lists 6 sub-agents (adds `pm-skill-router`) and carries a current "as of" stamp.
- **REQ-T4.2** `platforms.md` states 6 sub-agents and either adds a Gemini CLI install route or removes the Gemini support claim (TD-2).
- **REQ-T4.3** `ecosystem.md` states 68 skills consistently and replaces the MCP "1:1 / direct version tracking" claim with the honest frozen status (audit D-5 option A).
- **REQ-T4.4** Every `agents/*.md` doc-reference path resolves to a real file.
- **REQ-T4.5** The quickstarts carry a per-client "verify it worked" step.

### File changes (audit evidence)
- `site/src/content/docs/reference/sub-agent-compatibility.md` - stamped "as of v2.16.0", lists 4 sub-agents + orchestrator -> 6 sub-agents, fresh stamp.
- `site/src/content/docs/getting-started/platforms.md:8` - "All 4 sub-agents" -> 6; add a Gemini CLI section (clone + `AGENTS.md` discovery route) or remove the claim.
- `site/src/content/docs/reference/ecosystem.md` - 68 at line 30, "the 67 shipped skills" at line 88 -> both 68; the MCP "1:1" claim -> "40 skills at pm-skills-mcp v2.9.2, security-fix-only, file-install recommended".
- `README.md:429` and `AGENTS.md:462` - Gemini CLI named as supported with zero install instructions; reconcile with TD-2 (note AGENTS.md is generated, so the fix is upstream in the generator input if the line is inside the generated block).
- `agents/pm-workflow-orchestrator.md:219,247-248` - cite `docs/reference/sub-agent-compatibility.md` and `docs/reference/runtime-components.md`; the real paths are `site/src/content/docs/reference/`. Fix these and grep all `agents/*.md` for the same `docs/reference/*` class.
- `QUICKSTART.md` + `site/src/content/docs/getting-started/quickstart.md` - add the verify step.

### Acceptance
- `check-root-doc-links.mjs` (which now scopes source surfaces including `agents/**`) green; no `agents/*.md` references a nonexistent `docs/reference/*` path.
- The matrix, platforms, and ecosystem pages state 6 / 68 with a current stamp; the MCP wording matches D-5 option A.
- Rendered-links + route-parity green after the site rebuild.

---

## WS-T5: marketplace pinning (P1-2)

### Requirements
- **REQ-T5.1** `.claude-plugin/marketplace.json` no longer installs from rolling `main`.
- **REQ-T5.2** The pin choice and its ordering implication are documented.

### File changes (audit evidence)
- `.claude-plugin/marketplace.json:13` - `ref: "main"` -> the TD-3 value (recommended: this release's tag name, committed in the release PR, tag pushed immediately after merge per the runbook). agent:human confirms the ordering (the pin does not resolve until the tag exists).

### Acceptance
- The `ref` is a pinned tag, not `main`.
- The spec records the ordering caveat for option A (transient non-resolution window between merge and tag push) so a future maintainer does not read the pin as a bug.

---

## WS-T6: governance guardrails (P1-4; schedules P1-10)

### Requirements
- **REQ-T6.1** `main` has branch protection: required validation status checks, linear history, no force pushes.
- **REQ-T6.2** The 8 open Dependabot PRs are triaged (green ones merged).
- **REQ-T6.3** 3-5 good-first-issues are seeded from P2 items.
- **REQ-T6.4** The audit D-6 roadmap re-commit session is scheduled with a recorded landing spot.

### File changes / actions (audit evidence)
- Branch protection via a documented `gh api` PUT to `/repos/{owner}/{repo}/branches/main/protection` (agent-prepared command; agent:human runs it). The audit verified no branch protection exists.
- Dependabot: the audit counts 8 unmerged PRs; merge green, close superseded.
- Seed issues from: heading normalization per family (WS-T8b), HISTORY stubs (WS-T11), orphan cleanup (WS-T11), site link fixes (P2-12). The `good first issue` label exists with zero issues today (P3).
- D-6: schedule a one-session re-plan; record the outcome in the release-plans tier (a new dated note or the v2.31.0 plan's decisions section).

### Acceptance
- `gh api /repos/.../branches/main/protection` returns the required checks + linear history + no-force-push.
- Dependabot PR list is empty or only blocked items remain, each annotated.
- 3-5 issues carry `good first issue`.
- The D-6 session has a calendar/tracking-issue entry and a named destination doc.

---

## WS-T7: hook correctness (P1-8)

### Requirements
- **REQ-T7.1** `phase-router.mjs` reads the `phase_router` local-config key and, when off, exits silently before emitting a suggestion.
- **REQ-T7.2** The fabricated-metric guardrail regex requires metric context near the number (%, currency, or a users/revenue/conversion word), so bare dates and versions no longer trip it; it stays advisory.
- **REQ-T7.3** `hooks/README.md` documents the working opt-out.

### File changes (audit evidence)
- `hooks/lib/local-config.mjs:16-17` parses `phase_router`; `hooks/phase-router.mjs` never consumes it (the documented opt-out is dead code). Wire the key: early-return when the config disables the router. Add a unit test asserting off means no output.
- `hooks/lib/guardrails.mjs:53` - the fabricated-metric regex flags any digit including dates and versions. Tighten to require adjacent metric context. Add unit tests for the true positives (a fabricated "+40% conversion") and the new true negatives (a date, a version string).
- `hooks/README.md` - the opt-out section reflects the now-functional key.

### Acceptance
- With the opt-out set, `phase-router.mjs` produces no suggestion (unit-tested); with it unset, behavior is unchanged.
- The metric regex passes on a version like `1.2.3` and a date like `2026-07-04`, and still fires on a fabricated percentage (unit-tested).
- The hook units in the existing `node --test hooks/...` step (both OS legs) stay green.

---

## WS-T8: content mesh + skeleton canon (P1-7, P2-1, P2-2, P2-5, P2-6)

### Requirements
- **REQ-T8.1** The four contract-shaped skills gain a When-NOT-to-Use section with reciprocal edges.
- **REQ-T8.2** Headings are normalized to exact canon spellings across the touched skills.
- **REQ-T8.3** A canonical skeleton document names the three sanctioned dialects and their exact heading spellings and is referenced from the builder and validator.
- **REQ-T8.4** A new advisory gate checks headings against the canon.
- **REQ-T8.5** The ~8 weakest early-cohort descriptions are rewritten to the build-risk-review standard.
- **REQ-T8.6** The two known content-duplication defects are resolved.

### File changes (audit evidence)
- **(a) WNTU backfill (MINOR + HISTORY each):** `define-prioritization-framework`, `discover-journey-map`, `discover-market-sizing`, `measure-survey-analysis` have no When-NOT-to-Use section. `discover-interview-synthesis/SKILL.md:30` deflects to `measure-survey-analysis` but survey-analysis never points back - add the reciprocal edge. Make the `define-opportunity-tree` <-> `define-prioritization-framework` edge bidirectional. The reciprocity gate misses these because they are not declared collision pairs; the backfill closes the mesh.
- **(b) Heading normalization (PATCH each, TD-4 option A):** "Quality Checklist" (37 files) vs "Quality checklist" (11); at least 6 different output-section heading names; the build-risk-review heading "When NOT to use" (lowercase u) evades case-sensitive tooling. Normalize each touched skill to the canon spelling; one-line HISTORY row each.
- **(c) Skeleton canon doc:** name the three dialects - classic (~40 skills), contract-shaped (~6), tool-family (15) - and the exact heading spellings. Home it in the site skill-authoring guide; reference it from `skills/utility-pm-skill-builder/SKILL.md` and `skills/utility-pm-skill-validate/SKILL.md`. This replaces the circular "mirror exemplars" standard that let a fourth dialect emerge in build-risk-review.
- **(d)** NEW `scripts/check-heading-canon.mjs` (+ test), advisory.
- **(e) Description Batch 5 (MINOR each):** `define-opportunity-tree` ("Use for ... prioritization" collides with `define-prioritization-framework`, no deflection), `develop-spike-summary` (no output specifics, no boundaries), `deliver-launch-checklist`, `discover-journey-map`, and ~4 more early-cohort descriptions. Rewrite to the build-risk-review description standard; update trigger fixtures where those skills have them so `check-new-skill-collision` still separates them.
- **(f) Dedup:** `measure-okr-grader` states scoring conventions twice (~15 redundant lines) - PATCH. `define-prioritization-framework` inlines ~47 lines of framework textbook and points to a nonexistent `deliver-roadmap` at line 198 - resolve the phantom pointer (this PATCH is absorbed into the skill's WNTU MINOR).

### Acceptance
- `check-reciprocal-boundary-pointers.mjs` green with the four new edges; each backfilled skill has a bidirectional When-NOT-to-Use.
- `check-heading-canon.mjs` green; no touched skill uses a non-canon heading spelling (case included).
- The skeleton canon doc exists, names three dialects + exact spellings, and is linked from the builder + validator.
- Batch 5 descriptions meet the 20-100 word single-line rule (`lint-skills-frontmatter.sh:94`); `check-new-skill-collision.mjs` still separates the rewritten skills from their neighbors.
- `measure-okr-grader` states its scoring rules once; `define-prioritization-framework` has no `deliver-roadmap` pointer.

### Durable CI: `scripts/check-heading-canon.mjs`
- **Script:** scans each `skills/*/SKILL.md` for its dialect's sanctioned headings and flags any spelling/case deviation from the canon doc (for example "Quality checklist" or "When NOT to use" with a lowercase u).
- **Test:** `scripts/check-heading-canon.test.mjs` (node --test; a canon-conformant fixture passes, a case-variant fails). Added to the unit-test aggregation step.
- **Manifest:** NOT in `validation-manifest.yaml` (Node, cross-platform-once).
- **validation.yml wiring:** new step, `if: always()`, `continue-on-error: true` (advisory).
- **Promotion:** advisory in v2.30.0; enforcing candidate once the whole catalog is normalized (a v2.31.0 heading sweep), with a dated rationale. Enforcing is NOT claimed this release because only the touched skills are normalized here.

---

## WS-T9: dual-shell containment (starts P1-3; port waves -> v2.31.0 WS-Z4)

### Requirements
- **REQ-T9.1** No new `.sh`/`.ps1` validator pair is introduced; the policy is written where contributors and the manifest will see it.
- **REQ-T9.2** The two awk RSTART/RLENGTH scripts carry inline hazard comments.
- **REQ-T9.3** A committed fixture tree and an advisory CI step run `check-count-consistency` through both shells and diff their verdicts (the minimal behavioral-equivalence smoke the parity referee cannot provide).

### File changes (audit evidence)
- `CONTRIBUTING.md` - a policy line: new validators are single-source Node `.mjs` + `.test.mjs`; no new `.sh`/`.ps1` pairs. Mirror a one-line note in the `scripts/validation-manifest.yaml` header (the frozen-inventory intent).
- `scripts/check-count-consistency.sh:277-291` and `scripts/validate-skill-family-registration.sh` - the awk RSTART/RLENGTH clobber class that hung CI at v2.27.1 is present in mitigated form; add inline hazard comments (save `mstart`/`mlen` before any nested `match()`), untested today.
- `scripts/fixtures/shell-parity/` (new) - a small committed input tree; the smoke runs `check-count-consistency` in bash and pwsh against it and asserts identical verdicts. Node port of the three most fragile validators is explicitly deferred to v2.31.0 WS-Z4.

### Acceptance
- CONTRIBUTING states the freeze; the manifest header notes it.
- The two awk scripts carry the hazard comment.
- The equivalence smoke runs both shells over the fixture tree and passes (verdicts match); on an intentionally divergent fixture it would flag the mismatch.

### Durable CI: dual-shell equivalence smoke
- **Location:** a new advisory step in `validation.yml`. Because it must run BOTH shells, it uses the matrix differently from a Node check: one step invokes bash on ubuntu and one invokes pwsh on windows over the same committed fixture tree, each writing a normalized verdict artifact; a small Node comparator (or a committed golden verdict file both legs must match) asserts equivalence. Simplest first cut: each leg compares its own verdict to a committed golden file, so a shell that diverges from the golden fails - this catches drift without cross-leg artifact passing.
- **Test:** the comparator (if added as `scripts/*.mjs`) gets a `.test.mjs`; the fixture tree is the durable asset.
- **Manifest:** the two shell invocations are `check-count-consistency` runs, already inventoried; the smoke is a new advisory step, not a new shell validator, so no manifest entry.
- **Wiring:** `if: always()`, `continue-on-error: true` on both legs (advisory).
- **Promotion:** advisory in v2.30.0; enforcing when the Node ports in v2.31.0 WS-Z4 shrink the dual-shell surface enough that a divergence is always a real bug.

---

## WS-T10: eval roster externalization (starts P1-5; backfill -> v2.31.0 WS-Z5)

### Requirements
- **REQ-T10.1** The trigger-eval ROSTER and COLLISION_PAIRS move out of code into a data file.
- **REQ-T10.2** The three consumers read the data file, not in-code literals.
- **REQ-T10.3** All 31 existing fixture sets on disk are registered (the in-code roster was 29, already drifted).

### File changes (audit evidence)
- `scripts/check-trigger-fixtures.mjs:12-31` - the hardcoded `ROSTER` (29 entries) drifted vs the 31 fixture sets on disk; `:35-42` `COLLISION_PAIRS` are in-code literals. Extract both to `scripts/trigger-eval-roster.yaml` (roster list + collision pairs + the OKR watch pair).
- `scripts/check-trigger-fixtures.mjs`, `scripts/run-router-evals.mjs`, `scripts/check-new-skill-collision.mjs` - consume the data file.
- The corresponding `.test.mjs` files updated to load the data file (or a fixture roster) rather than the exported constant.

### Acceptance
- `scripts/trigger-eval-roster.yaml` exists and lists all 31 skills that have `evals/trigger-fixtures.json` on disk.
- `check-trigger-fixtures.mjs`, `run-router-evals.mjs`, `check-new-skill-collision.mjs` import the roster from the data file; grepping the three scripts finds no in-code roster array.
- `node scripts/check-trigger-fixtures.mjs` green; the collision + roster unit tests green on both legs.

### Durable CI: roster data file
- **Asset:** `scripts/trigger-eval-roster.yaml` - the single source for the roster + collision pairs. No new gate step; the existing enforcing `check-trigger-fixtures.mjs` step now asset-gates against the data file, so a roster skill missing its fixture still fails CI (the same guarantee, now data-driven).
- **Test:** the existing `check-trigger-fixtures.test.mjs` + `check-new-skill-collision.test.mjs` updated; both remain in the aggregation step.
- **Manifest:** N/A (Node).
- **Promotion:** the trigger-fixtures gate is already enforcing; this change preserves that level while removing the 29-vs-31 drift.

---

## WS-T11: hygiene batch (P2-3, P2-4, P2-8, P2-9, P2-12; notes P2-11)

### Requirements
- **REQ-T11.1** The 15 tool-family skills move 0.1.0 -> 1.0.0 with a first HISTORY row each (TD-5 = audit D-4 option A); the HISTORY-start convention is documented.
- **REQ-T11.2** CI caches npm on both setup-node steps.
- **REQ-T11.3** Root `package.json` gains a `test` script running the full `node --test` suite; `validation.yml` calls it instead of the hand-maintained inline list.
- **REQ-T11.4** A committed opt-in pre-commit hook runs frontmatter lint + parity + the unit suite, documented in CONTRIBUTING.
- **REQ-T11.5** Tracked automation state and orphan scripts are removed.
- **REQ-T11.6** The two site quickstart link defects are fixed.

### File changes (audit evidence)
- Tool family (15 skills) at 0.1.0 since 2026-05-14 with 0/15 HISTORY across ~7 releases -> 1.0.0 + a first HISTORY row each. Document "when HISTORY starts" in `docs/internal/skill-versioning.md` (the rule is not discoverable from the skills today; HISTORY coverage is 36/68, skewed foundation 3/11, tool 0/15).
- `.github/workflows/validation.yml:22-31` (both setup-node steps) - add `cache: npm`; today it runs a cold double `npm ci` every run.
- `package.json` (root) - add a `test` script (`node --test scripts/*.test.mjs hooks/**/*.test.mjs` or the explicit set); `validation.yml` replaces the ~21-file inline `node --test` list (lines 351-370) with `npm test`.
- `.pre-commit` (opt-in via `core.hooksPath`) - runs `lint-skills-frontmatter`, `check-validator-parity.mjs`, and the unit suite; documented in `CONTRIBUTING.md`.
- `.github/.created-issues.json` (automation state, tracked) - untrack + add to `.gitignore`.
- `scripts/build-skill-catalog.py` (127 LOC, referenced by no workflow) + its `__pycache__` + the one-shot migrate/sweep scripts - delete after verifying no live references; fix the stale reference in `docs/internal/roadmap.md` 3.6 to point at `gen-skill-manifest.mjs` (also `roadmap.md:13` still reads "64 skills" to any outside reader).
- Duplicate effort-brief directories (meeting-synthesis/synthesize, meeting-agenda/meeting-prep, two design-sprint dirs) - keep canonical, replace the dupe with a one-line pointer file.
- `site/src/content/docs/getting-started/quickstart.md:85` (repo-relative path 404s on the deployed site) + `:102` (sends "Full documentation" from inside the docs site out to GitHub) - fix to a site-relative link and an internal link.
- P2-11 (55.5 MiB packed history; largest tracked files site `package-lock.json`, CHANGELOG, `docs/RESOURCES.md`) - recorded as a note, no action this release.

### Acceptance
- All 15 tool skills read `metadata.version: 1.0.0` and have a HISTORY.md with a first row; `skill-versioning.md` states the HISTORY-start rule.
- `validation.yml` shows `cache: npm` on both setup-node steps and calls `npm test`; `npm test` locally runs the full suite green.
- The pre-commit hook is committed and documented as opt-in; running it locally passes on a clean tree.
- `git ls-files` no longer lists `.github/.created-issues.json`, `scripts/build-skill-catalog.py`, or the one-shot scripts; no doc or workflow references them (roadmap.md 3.6 points at `gen-skill-manifest.mjs`).
- The duplicate effort dirs contain only a pointer file; the two site quickstart links resolve (rendered-links + route-parity green).

### Durable CI: root `npm test` + npm cache
- **Change:** `package.json` `test` script becomes the single entrypoint for the `node --test` suite; `validation.yml` calls `npm test` (replacing the inline list) so a new `.test.mjs` is picked up without editing the workflow. `cache: npm` on both setup-node steps.
- **Manifest:** N/A.
- **Wiring:** the unit-test step stays enforcing (`node --test` must pass); this is a refactor of an existing enforcing step, not a new gate.
- **Promotion:** already enforcing; the change reduces the P2-8 hand-maintained-list drift risk.

---

## WS-T12: internal-docs visibility (P2-10) - audit D-3 RULED option B (2026-07-04); executes this release

### Requirements
- **REQ-T12.1** IF the maintainer rules audit D-3 option B, move the strategy/backlog/planning tiers to the gitignored tier while keeping contributor-facing governance public.
- **REQ-T12.2** IF D-3 is not ruled in Phase 0, this workstream is SKIPPED and the release does not block on it.

### Proposed move list (D-3 option B)
- Move to the gitignored `_LOCAL` tier (or a private repo): `docs/internal/strategy/`, `docs/internal/backlog/`, `docs/internal/next/`, `docs/internal/session-primers/`, and `_agent-context/` (Codex worktree primers + session logs).
- Keep public: `docs/internal/release-plans/` (runbooks + this plan family), `docs/internal/skill-versioning.md`, and the contributor-facing governance docs.
- Evidence: the audit records 421 tracked files under `docs/internal/` plus `_agent-context/` as public; `docs/internal/roadmap.md:13` still reads "64 skills" to any outside reader (the roadmap.md count fix is WS-T11 regardless of D-3).

### Acceptance
- IF D-3 = B: the listed tiers are gitignored/relocated; the public surface still contains runbooks + skill-versioning + release-plans; no public doc links a now-private path.
- IF D-3 unruled: the workstream ships nothing and the plan's coverage matrix keeps P2-10 as DECISION-GATED.

---

## Consolidated durable-CI inventory

| Gate / change | Kind | Test | Manifest? | validation.yml wiring | Level |
|---|---|---|---|---|---|
| `check-count-phrases.mjs` | NEW Node gate | `check-count-phrases.test.mjs` | No (shell-only manifest) | new step, both legs (`if: always()`) | advisory -> ENFORCING before tag (WS-T1) |
| zip-stage assertions | NEW CI assertions | (helper `.test.mjs` if scripted) | No (packaging job) | `validate-plugin.yml` zip job | ENFORCING day one (WS-T2) |
| `check-heading-canon.mjs` | NEW Node gate | `check-heading-canon.test.mjs` | No | new step, both legs | advisory (WS-T8d) |
| dual-shell equivalence smoke | NEW CI step + fixtures | comparator `.test.mjs` if added | No (uses existing shell validator) | new advisory step per leg | advisory (WS-T9) |
| `trigger-eval-roster.yaml` | data extraction | existing trigger + collision tests | No | existing enforcing trigger step | ENFORCING preserved (WS-T10) |
| root `npm test` + `cache: npm` | CI refactor | the full `node --test` suite | No | replaces inline list; both legs cached | ENFORCING preserved (WS-T11) |
| dual-shell freeze policy | policy | n/a | manifest header note | CONTRIBUTING + manifest header | policy (WS-T9) |

Two brand-new gate scripts (`check-count-phrases.mjs`, `check-heading-canon.mjs`), one new enforcing packaging assertion set, one advisory equivalence smoke, one data extraction, and one CI refactor. None is a `.sh`/`.ps1` pair (WS-T9 freeze honored). All Node gates run cross-platform on both matrix legs and are absent from `validation-manifest.yaml` by design.

## Open questions

- **OQ-1 (TD-3 ordering).** If the marketplace `ref` is pinned to this release's own tag (recommended), the pin is briefly unresolvable between PR merge and tag push. Acceptable per the runbook's tag-immediately step, but confirm no automation reads `marketplace.json` in that window.
- **OQ-2 (GitHub About automation).** The About text is off-repo and hand-set today. This release corrects it via a recorded command; whether to add a release-time check or an auto-update step (audit R-02 tail) is deferred - decide whether `check-count-phrases.mjs` should additionally assert the About text via `gh api` in a key-gated release-only lane, or leave it as a runbook step.
- **OQ-3 (heading-canon enforcing scope).** `check-heading-canon.mjs` ships advisory because only the WS-T8-touched skills are normalized. Confirm the full-catalog normalization + promotion to enforcing is a named v2.31.0 workstream so the advisory gate does not linger indefinitely.
- **OQ-4 (Gemini claim, TD-2).** Add a real Gemini CLI install route (making the README:429 / AGENTS.md:462 claim true) or remove the claim. Default add; if AGENTS.md's Gemini line is inside the generated block, the fix is in the generator input, not a hand edit.
- **OQ-5 (equivalence-smoke shape).** The minimal smoke compares each shell's verdict to a committed golden file per leg (no cross-leg artifact passing). Confirm this is sufficient for v2.30.0, with true cross-shell diffing deferred to the v2.31.0 port work.
