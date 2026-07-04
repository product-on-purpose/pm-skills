# v2.30.0 Release Plan: Trust repair + hygiene (M-35)

**Status:** PROPOSED - DRAFT for maintainer review. Remediates every executable P0/P1/P2 finding of the 2026-07-04 deep audit (maintainer-local, gitignored). Program-scale findings ship their v2.30.0 increment here and hand the remainder to the parallel v2.31.0 "Zero-drift surfaces" plan.
**Owner:** Maintainers
**Type:** MINOR (see TD-1). Rationale: the curated release zip gains content (`agents/`, `hooks/`), a new advisory CI gate class ships, a hook opt-out becomes functional, and many skills take PATCH/MINOR bumps. PATCH was considered and rejected because the distributed artifact's content set changes additively.
**Theme:** **Trust repair + hygiene.** The engine room is best-in-class; the front door rotted. Fix every count-drift, packaging, and inventory defect now, and close the regex/gate holes that let them pass green CI, so the "provable quality" claim stops being falsified by its own first sentence.
**Created:** 2026-07-03 | **Previous:** v2.29.1 (skill docs pages completeness patch). See [`../v2.29.0/plan_v2.29.0.md`](../v2.29.0/plan_v2.29.0.md) for the prior MINOR.
**Companion docs:** [`spec_trust-repair.md`](spec_trust-repair.md) (per-workstream requirements + file-level change lists + durable-CI blocks). Parallel next release: `docs/internal/release-plans/v2.31.0/plan_v2.31.0.md` (WS-Z1..WS-Z10, "Zero-drift surfaces"; being drafted alongside this plan).
**Effort:** M-35 (trust repair sweep) - PROVISIONAL; confirm the ID is free against the canonical backlog and GitHub issues in Phase 0. One tracking issue for the whole release; no per-item effort briefs (per the 2026-05-03 no-effort-doc-bloat rule).

---

## Why this, why now

The 2026-07-04 deep audit verified three trust-critical defects on the project's least-engineered surfaces: the first sentence a new user reads (`QUICKSTART.md:5`) states a skill count that contradicts itself within the same line; the curated release zip omits the `agents/` and `hooks/` directories the dispatch skills need at runtime while shipping the 421-file `docs/internal/` tree; and `utility-pm-skill-builder`, the gate for all new skill creation, carries a hand-maintained inventory that cannot see 15 of 68 skills. None is hard to fix. All undermine the one claim the project chose as its moat.

The audit's named root cause is a single failure class: hand-synced derived surfaces that drift despite green CI. The cure is proven in-repo (the generated `AGENTS.md` has never drifted). v2.30.0 does the instance repair AND closes the gate holes that let the instances pass, so the class is contained here and structurally removed in v2.31.0. Honesty is the release's product: the notes will say plainly what drifted and what now prevents recurrence.

The audit's three headline numbers set what a trust patch can and cannot touch. The count/packaging/inventory defects (this release) are the cheapest and most damaging - arithmetic errors in the first sentence of a "provable quality" project. The 46% eval coverage (31/68 trigger fixtures) and the ~3,700 duplicated dual-shell lines are programs, not patches: v2.30.0 externalizes the eval roster (WS-T10) and freezes plus smoke-tests the dual-shell surface (WS-T9), then hands the backfill and the Node ports to v2.31.0. Bus factor 1 (95.6% maintainer commits, no branch protection, one open issue) is addressed at its cheapest lever here - branch protection, Dependabot triage, and seeded good-first-issues (WS-T6) - while the structural contribution fast lane (audit X-10) stays a later train.

## Scope philosophy: remediate now, hand off the program work

Every finding graded P0/P1/P2 in the audit is mapped in the coverage matrix below. Findings that are one edit get a FULL fix here. Findings that are programs (the ~3,700-line dual-shell duplication, the 46% eval coverage, the six-places-per-release note duplication) get their contained v2.30.0 increment - a policy freeze, a data extraction, a verify-step - and an explicit handoff to a named v2.31.0 workstream. One finding was decision-gated on audit D-3 (internal-docs visibility); D-3 was ruled option B on 2026-07-04, so WS-T12 executes in this release.

This release is the audit's "top move #1": a visible trust-repair patch fixing all count drift, closing the count-gate regex holes, adding `agents/` + `hooks/` to the release zip, and fixing the skill-builder inventory. It deliberately does NOT attempt the audit's move #2 (release automation, M-21 release-please integration, issue #136) - that is the structural cure and belongs to the v2.31.0 "Zero-drift surfaces" plan. v2.30.0 contains the drift class; v2.31.0 removes the hand-write path that creates it.

### What this release does NOT do (scope boundary)

- No new skill; the catalog stays 68 / 6 (this is not a v2.28.0-style growth MINOR).
- No release automation, no generated README catalog, no single-source quickstart merge - those are v2.31.0 (audit R-11/R-12/R-13, decision D-2).
- No dual-shell Node ports and no eval coverage backfill - WS-T9 and WS-T10 only contain and externalize; the port waves and the 37-skill fixture backfill are v2.31.0 WS-Z4 / WS-Z5.
- No memory skill (F-48 project state), no auto-critic (F-46), no PM-Bench (X-1) - those are later moat trains, out of a hygiene patch.
- No token-budget lint (P2-7) - deferred to the X-7 context-cost work.

## Workstreams

| WS | Closes | What it delivers | Agent | Gate |
|---|---|---|---|---|
| WS-T1 count-truth + phrase gate | P0-1, part P1-1 | Fix every drifted count/sample phrase; NEW `check-count-phrases.mjs` (+ sub-agent axis) | claude + codex | phrase gate advisory at merge, enforcing pre-tag |
| WS-T2 packaging integrity | P0-2 | Stage `agents/`+`hooks/`, exclude `docs/internal`, `.gitattributes` export-ignore, zip CI assertions | codex | zip-job assertions green both content checks |
| WS-T3 builder inventory | P0-3 | `utility-pm-skill-builder` derives the live inventory instead of hand-listing it | claude | manifest regen + `lint-skills-frontmatter` |
| WS-T4 cross-client truth | P1-1 (docs), P1-9 | Compat matrix, platforms, ecosystem, orchestrator paths, per-client verify step | claude | `check-root-doc-links` + rendered-links |
| WS-T5 marketplace pinning | P1-2 | Pin `marketplace.json` ref off rolling `main` (TD-3) | claude + human | pin lands with the release PR; tag pushed per runbook |
| WS-T6 governance guardrails | P1-4; schedules P1-10 | Branch protection, Dependabot triage, seed good-first-issues, schedule D-6 re-commit | human (agent-prepared) | branch protection active on main |
| WS-T7 hook correctness | P1-8 | `phase-router` honors the opt-out; tighten fabricated-metric regex | codex | hook unit tests green both legs |
| WS-T8 content mesh + skeleton canon | P1-7, P2-1, P2-2, P2-5, P2-6 | WNTU backfill, heading normalization, skeleton doc, `check-heading-canon.mjs`, description Batch 5, dedup | claude | reciprocity + heading gate + trigger fixtures |
| WS-T9 dual-shell containment | starts P1-3 | Freeze new `.sh`/`.ps1` pairs, hazard comments, both-shell equivalence smoke on a fixture tree | codex | equivalence smoke advisory in CI |
| WS-T10 eval roster externalization | starts P1-5 | Move ROSTER + COLLISION_PAIRS to a data file; register all 31 fixture sets | codex | `check-trigger-fixtures` + collision tests |
| WS-T11 hygiene batch | P2-3, P2-4, P2-8, P2-9, P2-12; notes P2-11 | Tool family 1.0.0 + HISTORY, npm cache, root `npm test`, pre-commit, orphan deletion, link fixes | codex + claude | full unit suite via root `npm test` |
| WS-T12 internal-docs visibility | P2-10 | Execute the audit D-3 option B move list (ruled 2026-07-04) | human + claude | move complete; inbound references swept |

### Workstream detail

**WS-T1 (count-truth sweep + phrase gate) - closes P0-1 (count wrong on highest-trust surfaces), part of P1-1 (cross-client lag).** Fix `QUICKSTART.md:5` and `:85`; site quickstart lines 8/23/90; `getting-started/index.md:83`; `README.md:1127`; the "95+ sample outputs" phrase (7 hits in README, real corpus far larger) with a derived or future-proof phrasing; the three plugin/marketplace/codex manifest descriptions still narrating v2.28.0 / 67; `_agent-context/claude/CONTEXT.md:83`; and the off-repo GitHub About text via a documented `gh api` command (agent:human approves the write). Ships `scripts/check-count-phrases.mjs` (+ test): derives truth from `skills/` frontmatter plus library file counts and scans README, QUICKSTART, site authored pages, and manifest descriptions for count-bearing phrase variants the existing `check-count-consistency` cannot see, including the sub-agent axis (6 sub-agents). Advisory at merge, promoted enforcing before tag.

**WS-T2 (packaging integrity) - closes P0-2 (zip omits `agents/`+`hooks/`, ships `docs/internal/`).** `build-release.sh` and `.ps1` stage `agents/` and `hooks/` and exclude `docs/internal` from the staged `docs/`; `.gitattributes` gains `export-ignore` for `docs/internal/`, `_agent-context/`, `.github/issues-drafts/`, `.github/issues-archive/`. New assertions in the existing zip job (`validate-plugin.yml`): the stage contains all six `agents/*.md` files and `hooks/hooks.json`, does NOT contain `docs/internal`, and every `agents/*.md` referenced by a `utility-pm-*` dispatch skill resolves inside the stage. `utility-update-pm-skills` File Scope prose and `platforms.md` zip-contents description updated (PATCH bump + HISTORY row).

**WS-T3 (builder inventory derivation) - closes P0-3 (builder cannot see 22% of the catalog).** Replace the hand-maintained inline family inventory in `utility-pm-skill-builder` (the "Foundation Skills (11)" header over a 10-row table at line ~299; the tool family absent entirely, "tool-" appears zero times) with an instruction to derive the live inventory from `skill-manifest.json` or `AGENTS.md` at run time; keep only a thin families overview without hard counts. MINOR bump + HISTORY row.

**WS-T4 (cross-client truth sweep) - closes P1-1 doc side, P1-9 (sub-agent docs point at nonexistent paths).** `sub-agent-compatibility.md`: 6 sub-agents including `pm-skill-router`, refresh the "as of" stamp off v2.16.0; `platforms.md:8` "All 4 sub-agents" to 6, plus a Gemini CLI install section or removal of the Gemini claim (TD-2, default add); `ecosystem.md` 67-vs-68 at lines 30/88 and replace the MCP "1:1 / direct version tracking" claim with the honest frozen status (40 skills at pm-skills-mcp v2.9.2, security-fix-only, file-install recommended) per audit D-5 option A; fix `agents/pm-workflow-orchestrator.md:219,247-248` broken `docs/reference/*` paths to the real `site/src/content/docs/reference/` locations and grep all `agents/*.md` for the same class; add a per-client "verify it worked" step to `QUICKSTART.md` and the site quickstart.

**WS-T5 (marketplace pinning) - closes P1-2 (in-repo marketplace installs from rolling `main`).** `.claude-plugin/marketplace.json` ref `main` to a pinned value per TD-3. Agent:claude prepares; agent:human confirms the ordering (the tag must exist for the pin to resolve). The ordering implication is documented honestly in the spec.

**WS-T6 (governance guardrails) - closes P1-4 (no branch protection); schedules P1-10 (strategy-vs-shipping drift).** Branch protection on main via a documented `gh api` call (require the validation status checks, linear history, no force pushes); triage the 8 open Dependabot PRs (merge green ones); seed 3-5 good-first-issues drafted from P2 items (heading normalization per family, HISTORY stubs, orphan cleanup, site link fixes); schedule the audit D-6 roadmap re-commit session (agent:human) and record where its outcome lands. The re-plan itself is not resolved in this release; it is scheduled.

**WS-T7 (hook correctness) - closes P1-8 (SessionStart router cannot be disabled; noisy metric regex).** `phase-router.mjs` consumes the `phase_router` local-config key (off means silent early exit) with unit tests; tighten the fabricated-metric guardrail regex to require metric context near the number (%, currency, or users/revenue/conversion words) so bare dates and versions stop tripping it, staying advisory, with tests; `hooks/README.md` updated.

**WS-T8 (content mesh + skeleton canon) - closes P1-7, P2-1, P2-2, P2-5, P2-6.** (a) When-NOT-to-Use backfill with reciprocal edges for `define-prioritization-framework`, `discover-journey-map`, `discover-market-sizing`, `measure-survey-analysis` (survey-analysis points back to `discover-interview-synthesis`; the `define-opportunity-tree` to `define-prioritization-framework` edge made bidirectional) - MINOR bumps + HISTORY. (b) Heading normalization to the exact canon spellings ("Quality Checklist", "When NOT to Use", one output-heading name per dialect) - PATCH bumps; bump policy recorded as TD-4. (c) The canonical skeleton doc naming the three sanctioned dialects (classic, contract-shaped, tool-family) with exact heading spellings, homed in the site skill-authoring guide and referenced from `utility-pm-skill-builder` and `utility-pm-skill-validate`. (d) NEW `scripts/check-heading-canon.mjs` (+ test), advisory. (e) Description rewrite Batch 5 for the ~8 weakest early-cohort descriptions (`define-opportunity-tree`, `develop-spike-summary`, `deliver-launch-checklist`, `discover-journey-map` among them) to the build-risk-review standard - MINOR bumps; trigger fixtures updated where present. (f) `measure-okr-grader` scoring-rules dedup (PATCH); `define-prioritization-framework` phantom `deliver-roadmap` pointer at line ~198 resolved.

**WS-T9 (dual-shell containment) - starts P1-3 (dual-shell duplication, no behavioral guarantee); port waves land in v2.31.0 WS-Z4.** Policy freeze: no new `.sh`/`.ps1` validator pairs (CONTRIBUTING plus a note in the `validation-manifest.yaml` header); inline hazard comments on the two awk RSTART/RLENGTH scripts; a committed fixture tree plus an advisory CI step that runs `check-count-consistency` through BOTH shells on the fixtures and diffs verdicts (the minimal equivalence smoke). New Node port work is deferred to v2.31.0.

**WS-T10 (eval roster externalization) - starts P1-5 (eval coverage/plumbing gaps); backfill waves land in v2.31.0 WS-Z5.** Move the hardcoded ROSTER (29, drifted vs 31 fixture sets on disk) and COLLISION_PAIRS out of `check-trigger-fixtures.mjs` into a data file (`scripts/trigger-eval-roster.yaml`), consumed by `check-trigger-fixtures.mjs`, `run-router-evals.mjs`, and `check-new-skill-collision.mjs`; register all 31 existing fixture sets; tests updated. Coverage backfill for the 37 uncovered skills is v2.31.0.

**WS-T11 (hygiene batch) - closes P2-3, P2-4, P2-8, P2-9, P2-12; notes P2-11.** Tool family 15 skills 0.1.0 to 1.0.0 with a first HISTORY row each (TD-5, audit D-4 option A); document the HISTORY-start convention in `skill-versioning.md`; `cache: npm` on both setup-node steps; root `package.json` gains a `test` script running the full `node --test` suite and `validation.yml` calls it; a committed opt-in pre-commit hook (`core.hooksPath`) running frontmatter lint, parity, and the unit suite, documented in CONTRIBUTING; untrack `.github/.created-issues.json` (+ `.gitignore`); delete `scripts/build-skill-catalog.py` + `__pycache__` and the one-shot migrate/sweep scripts after verifying no live references (fix the stale reference in `docs/internal/roadmap.md` 3.6 to `gen-skill-manifest.mjs`); dedupe the duplicate effort-brief directories (keep canonical, leave a one-line pointer file); fix site `quickstart.md:85` (site-relative link) and `:102` (internal link); record the 55 MiB pack-size observation as a note (no action).

**WS-T12 (internal-docs visibility) - closes P2-10; audit D-3 RULED option B (2026-07-04).** Execute the move list: `strategy`, `backlog`, `next`, and session-primer material, plus `_agent-context`, relocate to the gitignored tier; runbooks, `skill-versioning.md`, and `release-plans/` stay public. Sweep inbound references (root docs, agents, site) as part of the move so no tracked file links a now-gitignored path.

## Findings coverage matrix

Every audit finding maps to a workstream and a disposition. FULL = fully remediated in v2.30.0. STARTED = contained increment here, program remainder handed to v2.31.0. DECISION-GATED = ships only on a maintainer ruling. DEFERRED = not this release, routed to a named later train.

| Finding | Handle | WS | Disposition |
|---|---|---|---|
| P0-1 | count wrong + self-contradictory | WS-T1 | FULL (instances + phrase gate) |
| P0-2 | zip omits agents/hooks, ships internal | WS-T2 | FULL |
| P0-3 | builder inventory blind to 22% | WS-T3 | FULL |
| P1-1 | cross-client story lags reality | WS-T1 + WS-T4 | FULL |
| P1-2 | marketplace installs from `main` | WS-T5 | FULL (via TD-3) |
| P1-3 | dual-shell, no behavioral guarantee | WS-T9 | STARTED -> v2.31.0 WS-Z4 (port waves) |
| P1-4 | no branch protection on main | WS-T6 | FULL |
| P1-5 | eval coverage + plumbing gaps | WS-T10 | STARTED -> v2.31.0 WS-Z5 (backfill waves) |
| P1-6 | release-notes/install duplication | WS-T4 (verify step) | STARTED -> v2.31.0 (README slim / single-source quickstart) |
| P1-7 | one-way boundary edges | WS-T8a | FULL |
| P1-8 | router cannot be disabled; noisy regex | WS-T7 | FULL |
| P1-9 | sub-agent docs point at dead paths | WS-T4 | FULL |
| P1-10 | strategy-vs-shipping drift | WS-T6 | STARTED (D-6 session scheduled; Dependabot triaged) |
| P2-1 | skeleton dialect fragmentation | WS-T8c | FULL (skeleton canon doc) |
| P2-2 | heading spelling/case drift | WS-T8b + WS-T8d | FULL (normalize + advisory gate) |
| P2-3 | tool family frozen at 0.1.0 | WS-T11 | FULL (TD-5, to 1.0.0) |
| P2-4 | HISTORY coverage skewed | WS-T11 + all bumped skills | FULL (tool family rows + convention documented + bump rows) |
| P2-5 | weak early-cohort descriptions | WS-T8e | FULL (Batch 5) |
| P2-6 | minor content duplication | WS-T8f | FULL |
| P2-7 | no SKILL.md size/token budget lint | none | DEFERRED -> v2.31.0+ (X-7 context-cost lint) |
| P2-8 | CI ergonomics gaps | WS-T11 | FULL |
| P2-9 | orphans (py catalog, migration scripts, tracked state) | WS-T11 | FULL |
| P2-10 | internal-docs public optics | WS-T12 | FULL (audit D-3 ruled B, 2026-07-04) |
| P2-11 | 55 MiB pack size | WS-T11 | NOTED (no action) |
| P2-12 | site quickstart links | WS-T11 + WS-T4 | FULL |

No P0/P1/P2 finding is unmapped. P3 items (unused wiki/discussions, `good first issue` with zero issues, inert `package.json` 0.0.0) are partly addressed opportunistically by WS-T6 (seeded good-first-issues) and otherwise left as documented observations.

## Count impact (audit before tagging)

- **Catalog is UNCHANGED: 68 skills (30 phase + 11 foundation + 12 utility + 15 tool), 6 sub-agents.** Unlike v2.28.0 and v2.29.0, this release does not add a skill. The count work is correcting stale narration back to the already-correct 68/6, not incrementing.
- **The count-bearing surfaces do not change their skill number**; they change the *release version* (to 2.30.0) and, in the manifests, the *stale prose* still describing v2.28.0 / 67.
- **Skill version-bump roster.** A skill touched by both a MINOR-worthy change (an added section) and PATCH-worthy edits in the same release takes ONE MINOR bump, its HISTORY row enumerating both (the `skill-versioning.md` tie-breaker). Bump class, not an invented absolute number, is specified below:

| Skill(s) | Bump | Reason | WS |
|---|---|---|---|
| `utility-pm-skill-builder` | MINOR | inventory now derived | WS-T3 |
| `utility-update-pm-skills` | PATCH | File Scope prose (zip now carries agents/hooks) | WS-T2 |
| `define-prioritization-framework` | MINOR | WNTU + opportunity-tree edge; absorbs phantom-pointer + heading PATCH | WS-T8a/f/b |
| `discover-journey-map` | MINOR | WNTU + description rewrite (one bump) | WS-T8a/e |
| `discover-market-sizing` | MINOR | WNTU backfill | WS-T8a |
| `measure-survey-analysis` | MINOR | WNTU back-edge to interview-synthesis | WS-T8a |
| `define-opportunity-tree` | MINOR | description rewrite + reciprocal WNTU edge | WS-T8e/a |
| ~7 more Batch 5 descriptions (incl. `develop-spike-summary`, `deliver-launch-checklist`) | MINOR each | description rewrite to build-risk-review standard | WS-T8e |
| heading-normalization-only skills | PATCH each | canon heading spelling | WS-T8b |
| `measure-okr-grader` | PATCH | scoring-rules dedup | WS-T8f |
| tool family (15 skills) | 0.1.0 -> 1.0.0 | declare stable + first HISTORY row | WS-T11 |

- **Sub-agent count axis (6):** the audit's GitHub About defect proves this axis drifts unchecked. `check-count-consistency` does not police sub-agent counts, so `check-count-phrases.mjs` (WS-T1) explicitly covers "N sub-agents" / "All N sub-agents" phrasings, and the grep count-sweep (surface I) backstops the rest.
- **Samples:** no sample additions this release; the "95+ sample outputs" fix is a phrasing correction, not a count increment.

## Release surfaces (G2)

Grouped by auto-derived (regenerate / let the gate police) vs manual. Adapted from the v2.29.0 surface scan; a no-new-skill release still touches version + narration surfaces.

### A. Source changes (committed)
- The WS-T1..WS-T11 code and content edits (skills, scripts, hooks, workflows, `.gitattributes`, manifests, site pages) enumerated per-workstream in [`spec_trust-repair.md`](spec_trust-repair.md).
- New gates: `scripts/check-count-phrases.mjs` + `.test.mjs`; `scripts/check-heading-canon.mjs` + `.test.mjs`; `scripts/trigger-eval-roster.yaml`; the dual-shell equivalence-smoke fixture tree.

### B. Regenerated (run the generator; CI checks with --check)
- `node scripts/gen-skill-manifest.mjs` -> root `skill-manifest.json` (picks up every version bump + description rewrite).
- `node scripts/gen-skill-manifest.mjs --agents` -> the `skills-catalog` block in `AGENTS.md` (do NOT hand-edit).
- Build the site (`cd site && npm run build`) so the gitignored per-skill Astro pages regenerate.
- `node scripts/check-route-parity.mjs --update` -> refresh `scripts/route-manifest.txt`.
- `node scripts/gen-resource-index.mjs` -> rewrite `docs/RESOURCES.md` (AFTER the route-manifest refresh).

### C. Manifests (version + narration; manual)
- `.claude-plugin/plugin.json` - `version` 2.30.0 + description prose corrected off "v2.28.0 / 67" to the honest 68/6 + a trust-repair release sentence.
- `.claude-plugin/marketplace.json` - `version` + narration + the TD-3 pinned `ref`.
- `.codex-plugin/plugin.json` - `version` + `longDescription` narration.

### D. Root docs (manual)
- `README.md` - version badge + Current-version row to 2.30.0; the "95+ sample outputs" phrasing (x7); the `:1127` sub-count fix; a "What's New" block; no skill-count badge change (stays 68/11).
- `CHANGELOG.md` - new `## [2.30.0]` with `### Fixed` (counts, packaging, builder inventory, hook opt-out, dead paths), `### Added` (the two advisory gates, the skeleton canon doc, tool-family 1.0.0 + HISTORY), `### Changed` (marketplace pin, description Batch 5).
- `QUICKSTART.md` - lines 5 + 85 count fix + the per-client verify step.
- `CLAUDE.md` - project-context count line verified at 68 / 11 foundation (correct already; confirm).
- `AGENTS.md` - regenerated (item B), not hand-edited.

### E. Context files (manual; currency-gated)
- `_agent-context/claude/CONTEXT.md` - status line to v2.30.0 + release summary; line 83 count fix.
- `_agent-context/codex/CONTEXT.md` - currency marker to v2.30.0.

### F. Astro site (tracked, hand-authored)
- `site/src/content/docs/getting-started/quickstart.md` - lines 8/23/90 count fix; the `:85` and `:102` link fixes; the verify step.
- `site/src/content/docs/getting-started/index.md` - line 83 count fix.
- `site/src/content/docs/getting-started/platforms.md` - `:8` "All 4 sub-agents" to 6; Gemini section (TD-2); zip-contents description (WS-T2).
- `site/src/content/docs/reference/sub-agent-compatibility.md` - 6 sub-agents + fresh "as of" stamp.
- `site/src/content/docs/reference/ecosystem.md` - lines 30/88 count + the honest MCP status.
- The site skill-authoring guide - add the skeleton canon doc (WS-T8c).
- `site/src/content/docs/changelog.md` - curated one-paragraph `[2.30.0]` mirror.
- `site/src/content/docs/releases/Release_v2.30.0.md` (NEW, with `slug:` frontmatter) + a row in [`releases/index.md`](../../../../site/src/content/docs/releases/index.md).

### G. Off-repo surface
- GitHub About text (stale total, sub-counts summing to 63, "4 sub-agents") corrected via a documented `gh api` / `gh repo edit` command; agent:human runs the write.

### H. Release-plan housekeeping + sibling repo
- `docs/internal/release-plans/v2.30.0/` (this plan + [`spec_trust-repair.md`](spec_trust-repair.md)).
- [`../README.md`](../README.md) - add the v2.30.0 index row + move Latest-shipped to v2.30.0 at cut time.
- `agent-plugins` (sibling repo) - re-pin the pm-skills entry to v2.30.0 + bump its registry metadata, a post-tag PR in that repo (the standard re-pin done every release, for example the v2.28.0 re-pin to metadata 1.28.0).

### I. Grep count-sweep (the enumerated list is necessary, not sufficient)
Run an explicit sweep and update every non-historical hit, then re-grep to confirm zero:
- `grep -rn "\b67\b" --include=*.md --include=*.mdx --include=*.json .` and the same for `10 foundation` / `Foundation.*10` / `95+` / `4 sub-agents` / `All 4` forms.
- Triage each: live count -> 68 / 11 / 6; historical / changelog / release-note mention -> leave.
- Explicitly check the surfaces the validator misses: `_agent-context`, site `reference/*`, `platform*`, `guide*`, README sample phrasings, the three manifest descriptions.
- The new `check-count-phrases.mjs` gate is the durable backstop for this sweep; the manual grep is the belt-and-suspenders for the cut.

### J. CONTEXT-marker flip
- Both `CONTEXT.md` markers flipped from the release-in-progress state to SHIPPED at G4 (the standard post-tag hygiene, mirroring v2.29.1's G4 commit).

## Agent assignment

Per the agent-assignment framework, every workstream carries a label so the maintainer can parallelize the reversible content/CI work and reserve the irreversible or off-repo actions for a human hand.

| Agent | Workstreams | Nature |
|---|---|---|
| agent:claude | WS-T1 (content half), WS-T3, WS-T4, WS-T8, WS-T12 (execution) | Docs, skill content, description rewrites, skeleton canon |
| agent:codex | WS-T1 (gate), WS-T2, WS-T7, WS-T9, WS-T10, WS-T11 (code half) | Validators, packaging scripts, hooks, CI, roster extraction |
| agent:human | WS-T5 (confirm), WS-T6, WS-T12 (D-3 ruling), GitHub About write, TD-1..TD-5 | Branch protection, marketplace pin timing, About text, decisions |

Codex-context note for the code workstreams: WS-T2/T7/T9/T10 touch behavior-bearing scripts and hooks with existing unit tests; the reviewing Codex pass should confirm both OS legs and the awk hazard class (v2.27.1 precedent) before merge.

## Execution phases (gate-first; task detail in the spec)

| Phase | What | Status |
|---|---|---|
| 0 | Confirm M-35 ID free; open one tracking issue. Decisions ruled 2026-07-04: TD-1..TD-5 all A; audit D-3 = B (WS-T12 executes); D-5 = A; D-6 = A (session scheduled via WS-T6) | PARTIAL (decisions DONE; ID + issue pending) |
| 1 | WS-T1 instances + `check-count-phrases.mjs` (advisory) + WS-T3 builder inventory | PENDING |
| 2 | WS-T2 packaging + zip CI assertions; WS-T4 cross-client + dead paths | PENDING |
| 3 | WS-T7 hook opt-out + regex; WS-T8 content mesh + skeleton canon + `check-heading-canon.mjs` (advisory) | PENDING |
| 4 | WS-T9 dual-shell containment; WS-T10 roster externalization; WS-T11 hygiene batch | PENDING |
| 5 | WS-T5 marketplace pin (with human); WS-T6 branch protection + Dependabot + good-first-issues (human); WS-T12 (D-3 ruled B) | PENDING |
| 6 | Regen in order: skill-manifest -> AGENTS block -> site build -> route-parity --update -> resource-index | PENDING |
| 7 | Count + surface sweep (A-J incl. grep sweep I); promote `check-count-phrases` to enforcing | PENDING |
| 8 | G1 Codex adversarial review of the sweep + gates; resolve | PENDING |
| 9 | Pre-tag validator bundle (`--strict`) both shells + clean site build; the both-shell equivalence smoke | PENDING |
| 10 | Tag v2.30.0 + GitHub Release + repin `agent-plugins`; flip plan SHIPPED; CONTEXT markers to SHIPPED | PENDING |

**Regen order:** edits -> `gen-skill-manifest` (+ `--agents`) -> site build -> `check-route-parity --update` -> `gen-resource-index`.

## Exit criteria (definition of done)

1. Every count-bearing surface (A-J) reads 68 / 11 foundation / 6 sub-agents or a derived phrasing; the grep count-sweep returns zero live stale hits; `check-count-phrases.mjs` is ENFORCING and green.
2. The curated zip stages `agents/` (all 6) and `hooks/hooks.json`, excludes `docs/internal`, and the `validate-plugin.yml` assertions pass; `.gitattributes` export-ignore covers the four internal paths.
3. `utility-pm-skill-builder` derives its inventory at run time; the string "tool-" and all 15 tool skills are reachable by its gap-analysis step; the "Foundation Skills" count is not hand-maintained.
4. `sub-agent-compatibility.md`, `platforms.md`, `ecosystem.md` state 6 sub-agents and 68 skills with a current stamp; the MCP claim is the honest frozen status; every `agents/*.md` doc-reference path resolves (`check-root-doc-links` green).
5. `phase-router.mjs` early-exits when the `phase_router` opt-out is set (unit-tested both legs); the fabricated-metric regex requires metric context (unit-tested).
6. The four WNTU backfills are bidirectional and pass `check-reciprocal-boundary-pointers`; the skeleton canon doc exists and is referenced from the builder + validator; `check-heading-canon.mjs` is committed advisory and green; Batch 5 descriptions are rewritten and their trigger fixtures still pass `check-new-skill-collision`.
7. No new `.sh`/`.ps1` validator pair is added; the dual-shell equivalence smoke runs both shells over the fixture tree and their verdicts match; the awk hazard comments are in place.
8. ROSTER + COLLISION_PAIRS live in `scripts/trigger-eval-roster.yaml`, consumed by all three scripts; all 31 fixture sets are registered; `check-trigger-fixtures` green.
9. Tool family is at 1.0.0 with 15 first HISTORY rows; the HISTORY-start convention is documented; `cache: npm` is on both legs; `npm test` runs the full unit suite and CI calls it; the opt-in pre-commit hook is committed + documented; `.created-issues.json` is untracked; the orphan scripts are deleted with no dangling references; both site quickstart links resolve.
10. Marketplace `ref` is pinned per TD-3; branch protection is active on main; the 8 Dependabot PRs are merged or closed; 3-5 good-first-issues are seeded; the D-6 re-commit session is scheduled with a recorded landing spot.
11. Pre-tag bundle `--strict` green both shells; site builds clean; route-parity + rendered-links + root-doc-links green; G1 adversarial review applied with no unresolved Blocker/Major.
12. v2.30.0 tagged, GitHub Release Latest, marketplace install pulls the new version; this plan flipped SHIPPED; both CONTEXT markers at SHIPPED.

## Decisions

| ID | Decision | Options | Recommendation | Status |
|---|---|---|---|---|
| TD-1 | Release version bump | A) MINOR  B) PATCH | **A (MINOR)** - zip content set grows additively | DECIDED A (2026-07-04) |
| TD-2 | Gemini CLI support claim | A) add an install section  B) remove the claim | **A (add)** - claimed already; make it true | DECIDED A (2026-07-04) |
| TD-3 | Marketplace `ref` pinning | A) pin to this release's tag  B) pin to previous tag  C) retire in-repo marketplace | **A (pin to own tag)** | DECIDED A (2026-07-04) |
| TD-4 | Heading-normalization bump policy | A) per-skill PATCH + one-line HISTORY rows  B) single catalog-level note | **A (per-skill PATCH)** | DECIDED A (2026-07-04) |
| TD-5 | Tool-family versioning | A) 0.1.0 -> 1.0.0 + first HISTORY rows  B) document "0.x experimental"  C) leave | **A (to 1.0.0)** = audit D-4 option A | DECIDED A (2026-07-04); audit D-4 ruled A same day |

**TD-1 (MINOR vs PATCH).** The catalog count does not change, which argues PATCH. But the curated release zip gains `agents/` and `hooks/` (content installers did not previously receive), two advisory CI gates ship, and a hook opt-out becomes functional. A distributed artifact that gains content is a MINOR under SemVer (compatibility, not significance). **Recommend A (MINOR).**

**TD-2 (Gemini claim).** README:429 and AGENTS.md:462 name Gemini CLI as supported with zero install instructions anywhere (P1-1). A) add a real Gemini CLI install section (clone + `AGENTS.md` discovery route), making the existing claim true. B) remove the claim until an install path is verified. **Recommend A**: the discovery route already works for non-Claude clients, so the honest fix is to document it, not retract it. If AGENTS.md's line sits inside the generated block, the fix is in the generator input, not a hand edit.

**TD-3 (marketplace pin).** A) pins `marketplace.json` `ref` to the release's own tag, committed in the release PR, with the tag pushed immediately after merge per the runbook (installers get exactly the tagged tree; the ordering caveat is that the pin does not resolve until the tag exists, a few minutes). B) pins to the previous tag (installers are always n-1, always resolvable). C) retires the in-repo marketplace and documents `agent-plugins` as the sole path (removes the surface entirely, a larger change). **Recommend A**, with the ordering documented honestly.

**TD-4 (heading-normalization bump policy).** The heading sweep (WS-T8b) touches many skills with a spelling/case-only change. A) bump each touched skill one PATCH with a one-line HISTORY row (scriptable, honors the per-skill SemVer + HISTORY governance in `skill-versioning.md`). B) a single catalog-level note with no per-skill bump. **Recommend A**: option B is rejected because it violates the governance that every skill content change carries a version bump + HISTORY row; the sweep is mechanical, so the per-skill cost is a script, not toil.

**TD-5 (tool-family versioning).** The 15 tool skills have been frozen at 0.1.0 since 2026-05-14 with 0/15 HISTORY across ~7 releases, reading as "experimental" with no stated intent (P2-3). A) declare them stable: 0.1.0 -> 1.0.0 with a first HISTORY row each. B) document "0.x = facilitation-format experimental" in the family contract. C) leave as is. **Recommend A** = audit D-4 option A: they have been stable in practice for weeks; 1.0.0 states the intent and starts their HISTORY, and the release already touches HISTORY conventions in WS-T11.

**Pointers to audit decisions.** WS-T12 is gated on audit **D-3** (internal-docs visibility; audit recommends option B). WS-T4's MCP wording implements audit **D-5** option A (honest sunset note now). WS-T6 schedules audit **D-6** (roadmap re-commit; audit recommends option A, a one-session re-plan). These three are the maintainer's to rule; only D-3 blocks a workstream.

## Risks + mitigations

| Risk | Mitigation |
|---|---|
| `check-count-phrases.mjs` false-positives on legitimate historical mentions (changelog, release notes) | Scope the scan to authored front-door surfaces; exclude `CHANGELOG.md`, `docs/releases/**`, and release-note pages the way `check-emdash-scars.mjs` scopes its corpus; ship advisory first so the false-positive surface is visible before enforcing |
| Adding `agents/` + `hooks/` grows the zip toward the 50 MB Cowork limit | The existing `validate-plugin.yml` step already asserts the zip stays under 50 MB; `agents/` + `hooks/` are small text trees; excluding `docs/internal` (P0-2) net shrinks the zip |
| Marketplace pin (TD-3 option A) is briefly unresolvable between merge and tag push | The runbook pushes the tag immediately after merge; the window is minutes and is documented so it does not read as a bug (OQ-1) |
| Heading normalization or description Batch 5 accidentally changes routing | Trigger fixtures are re-run through `check-new-skill-collision.mjs` after each rewrite; a rewrite that collapses a boundary fails the gate |
| Branch protection locks out the maintainer's own linear-history squash flow | Configure protection to require the validation checks + linear history while allowing the maintainer's admin squash-merge, matching the existing convention (the audit calls this the cheapest insurance, not a workflow change) |

## Gate ledger (placeholder)

- [ ] G0 audit / G1 Codex adversarial review / G2 release surfaces / G2.5 SHA capture / G3 tag + publish / G4 post-tag hygiene - filled at cut time per [`../runbook_clean-worktree-cut-tag-publish.md`](../runbook_clean-worktree-cut-tag-publish.md).

## Notes

- DRAFT for maintainer review. Nothing here executes before the maintainer rules TD-1..TD-5 and audit D-3/D-5/D-6 in Phase 0.
- This is the first release of a two-plan program. v2.30.0 does instance repair + gate-hole closure (contain the drift class); `docs/internal/release-plans/v2.31.0/plan_v2.31.0.md` does the structural removal (generate the derived surfaces so the hand-write path is gone). The audit's X-8 "zero-drift releases" property is declared done only when v2.31.0 lands.
- Findings STARTED here (P1-3 dual-shell, P1-5 evals, P1-6 duplication) carry an explicit handoff row so the program work cannot silently vanish between trains.
- Per-workstream requirements, file:line evidence, acceptance criteria, and durable-CI blocks for the two new gates live in [`spec_trust-repair.md`](spec_trust-repair.md).
