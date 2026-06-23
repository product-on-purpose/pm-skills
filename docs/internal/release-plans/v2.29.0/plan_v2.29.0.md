# v2.29.0 Release Plan: the pre-build risk gate (F-56) + a key-free router probe (M-34)

**Status:** PROPOSED - conditional GO. The skill's go/no-go is gated on the trigger-fixture disambiguation pass (Phase 1 below; the spec). Everything past the gate (W1-W4, the sample manifest, the surface sweep) is the **if-GO blueprint**. **Supersedes the prior v2.29.0 "Remember" (project-memory) plan, deferred to [`../_unreleased/project-memory/`](../_unreleased/project-memory/plan_project-memory.md) on 2026-06-22.**
**Owner:** Maintainers
**Type:** MINOR (additive: one new foundation skill + one new sub-agent + a key-free router engine; nothing removed or renamed). Catalog 67 -> 68 (foundation 10 -> 11); sub-agents 5 -> 6.
**Theme:** **The pre-build risk gate.** Given an idea, a feature request, or a scope change, name the single assumption most likely to make it fail and return a verdict that routes into the rest of the library.
**Created:** 2026-06-22 | **Previous:** v2.28.0 (`foundation-stakeholder-briefings`) - see [`../v2.28.0/plan_v2.28.0.md`](../v2.28.0/plan_v2.28.0.md).
**Companion docs:** [`spec_build-risk-review.md`](spec_build-risk-review.md) (the skill contract) + [`implementation-plan_build-risk-review.md`](implementation-plan_build-risk-review.md) (task-ordered build) | **Effort brief:** [F-56](../../efforts/F-56-build-risk-review.md) | **Issue:** #149 (external request)

---

## Why this, why now

External pull: issue #149 (a contributor's `before-you-build` request with a working Apache-2.0 reference) names a real gap - "should we build this, honor this feature request, or expand this scope" is a high-frequency PM decision and no skill returns a fast verdict on it. The memory train was deferred to `_unreleased/project-memory/` on 2026-06-22; this smaller, externally-pulled gate takes the v2.29.0 slot. Honest counter-weight: the roadmap's thesis is "the next frontier is NOT more skills" - this clears the higher bar because it is high-frequency, externally pulled, and positioned as a router/triage gate (an operating-layer move), not another standalone artifact.

## Conditional GO + the gate (D1)

The reversible work (author the trigger fixtures + draft the skill on a branch) proceeds; the **irreversible** step (promotion to `skills/`, the catalog count, the AGENTS.md regen) is gated on the fixture disambiguation pass against the five neighbors (`foundation-lean-canvas`, `iterate-pivot-decision`, `define-hypothesis`, `define-problem-statement`, `define-prioritization-framework`). If the boundary will not draw cleanly, the skill does NOT ship; the unique structure (demand hierarchy + verdict rubric) folds into `foundation-lean-canvas` / `iterate-pivot-decision` instead, and #149 closes with that disposition. Go/no-go confidence on record: ~70/30. Full analysis: [F-56 brief](../../efforts/F-56-build-risk-review.md), Validation.

## Scope - work items (all conditional on the Phase-1 gate)

| ID | Item | Type | Classification / Category | Gate |
|---|---|---|---|---|
| **W1** | `foundation-build-risk-review` (incl. `evals/trigger-fixtures.json`) | NEW SKILL | foundation / `problem-framing` (D3 open: vs `validation`) | fixtures FIRST = the go/no-go (Phase 1) |
| **W2** | Sample library (target 6 = 2 per thread; floor 3) + `README_SAMPLES` + the tracked sample manifest | SAMPLES | - | after W1 `TEMPLATE.md` |
| **W3** | Surface + count sweep (67 -> 68, foundation 10 -> 11) | RELEASE HYGIENE | - | at G2 (see Release surfaces) |
| **W4** | Reciprocal cross-link in `iterate-pivot-decision` + (optional, D4) `workflow-feature-kickoff` front-gate | INTEGRATION | - | with W1 |

## What W1 ships (the skill files)

- `skills/foundation-build-risk-review/SKILL.md` (frontmatter + the contract + the two modes + verdict-as-router + When-NOT-to-Use + source attribution).
- `references/TEMPLATE.md` (the Build Risk Review scaffold: decision header, `R#` risk blocks, demand level, evidence ledger, validation plan, routing, Sources). REQUIRED by `lint-skills-frontmatter`.
- `references/EXAMPLE.md` (one fully worked feature-mode case). REQUIRED.
- `references/risk-taxonomy.md` (risk types in the library's vocabulary + demand hierarchy L0-L4 + evidence ladder).
- `references/routing-map.md` (verdict -> next-skill + per-risk routing).
- `evals/trigger-fixtures.json` (committed; authored BEFORE the collision gate; near-miss negatives vs the five neighbors).
- No `HISTORY.md` at launch (created on first iteration per `docs/internal/skill-versioning.md`).
- No `commands/` wrapper (per the v2.22.0 wrapper-deletion decision); a `/build-risk-review` command only if the command surface is revived.

## Scope B (M-34): the key-free router engine

Independent of the F-56 gate. Replaces the live router probe's `ANTHROPIC_API_KEY` dependency with a `pm-skill-router` sub-agent (no key; runs on the subscription in-session), realizing the engine `trigger-evals-explained.md` already designed but never built. Full design: [`spec_sub-agent-router.md`](spec_sub-agent-router.md) + [`implementation-plan_sub-agent-router.md`](implementation-plan_sub-agent-router.md).

| ID | Item | Type | Gate |
|---|---|---|---|
| **M-34** | `pm-skill-router` sub-agent + an engine interface (sub-agent default, Messages-API retained for unattended CI) + arch-doc updates + the contributor-checklist rewire | INFRA (new sub-agent; no new skill) | pure-function tests + a recorded key-free probe run |

**Model:** Haiku default (the conservative gate tier; Opus is lenient and falsely reassuring; Sonnet an optional production cross-check). **Count axis:** sub-agents 5 -> 6 (distinct from the 67 -> 68 skills, and NOT covered by `check-count-consistency` - needs the grep backstop). The F-56 build already proved the sub-agent engine works (the in-session Haiku probe: 10/10 recall, 8/8 precision); M-34 makes it a named, reusable instrument.

## Sample manifest (W2)

Follows `library/skill-output-samples/SAMPLE_CREATION.md` (samples mirror `references/TEMPLATE.md` order, so authored AFTER W1's TEMPLATE.md) and `THREAD_PROFILES.md` (the storevine / brainshelf / workbench thread voices). `check-skill-sample-coverage` requires only 1 per thread (floor 3); target 6 (2 per thread) to exercise both modes + a verdict spread. **Specific source scenarios are authored at build time (post-gate); this is the coverage contract, not the final copy.**

| Thread (voice) | Sample A | Sample B |
|---|---|---|
| Storevine (B2B ecom, organized) | Feature-request triage ("should we build SSO now?") - feature mode, demand-hierarchy call, routes to prioritization/hypothesis | New-idea triage ("a B2B analytics add-on") - pre-build mode, "Validate first" |
| Brainshelf (consumer PKM, casual) | Scope-expansion ("turn the utility into a platform?") - "Pivot first" / "Don't build yet", routes to lean-canvas | Feature-change ("add social sharing?") - "Build small", L3/L4 demand |
| Workbench (enterprise, formal) | Competitor-copy request ("competitor has required-sections, add it?") - feature mode, "Defer/Cut" | Pre-build internal-tool idea - graded evidence ledger emphasis |

**Coverage contract across the 6:** both modes present; all four verdicts (Build small / Validate first / Pivot first / Don't build yet) appear at least once; the demand hierarchy L0-L4 exercised; each sample shows `R#` risk IDs, a graded evidence ledger, and an explicit routing to a named next skill; `[fictional]` markers on every invented metric per `SAMPLE_CREATION.md`.

## Count impact (audit before tagging)

- Before: 30 phase + 10 foundation + 12 utility + 15 tool = **67**.
- After: 30 phase + **11 foundation** + 12 utility + 15 tool = **68**.
- Derived: "Cross-Cutting Capabilities (foundation + utility)" 22 -> 23 (README At-a-Glance mermaid).
- Samples: library total + 6; sampled-skill count + 1 (`samples/index.md` carries explicit, non-derived sample + sampled-skill numbers).
- **Sub-agents: 5 -> 6** (the new `pm-skill-router`, M-34). A distinct count axis: `check-count-consistency` polices skill counts, not sub-agent counts, so the sub-agent number on README / AGENTS.md / site / CONTEXT / manifests rides the **grep count-sweep (surface I)**, not the validator. (See the sample-sync gap note below: the same class of unenforced manual count.)
- `check-count-consistency` derives the total from the `skills/` directory + the four sub-counts from frontmatter, but it intentionally excludes internal docs, library samples, changelog/release pages, and agent-context - so G2 includes an explicit **grep count-sweep** (surface I), not just the enumerated list.

## Release surfaces (G2)

A new skill touches a known surface set (adapted from the v2.28.0 ship-surface scan). Grouped by auto-derived (regenerate / let the gate police) vs manual.

### A. The skill + samples (committed source)
- `skills/foundation-build-risk-review/` (W1 files).
- `library/skill-output-samples/foundation-build-risk-review/` (W2 sample files).
- `library/skill-output-samples/README_SAMPLES.md` - add the Browse-by-Skill row + Browse-by-Company entries; update the library total + sampled-skill count.
- `docs/internal/release-plans/v2.6.1/skill-output-samples_manifest.v2.6.1.json` - add the new sample entries (the tracked release-coverage manifest, per `SAMPLE_CREATION.md` §6).

### B. Regenerated (run the generator; CI checks with --check)
- `node scripts/gen-skill-manifest.mjs` -> root `skill-manifest.json`.
- `node scripts/gen-skill-manifest.mjs --agents` -> the `skills-catalog` block in `AGENTS.md` (do NOT hand-edit).
- Build the site (`cd site && npm run build`) so the gitignored per-skill + per-sample Astro pages generate via `gen-site.mjs`.
- `node scripts/check-route-parity.mjs --update` -> refresh `scripts/route-manifest.txt`.
- `node scripts/gen-resource-index.mjs` -> rewrite `docs/RESOURCES.md` (AFTER the route-manifest refresh).

### C. Manifests (version + count prose; manual)
- `.claude-plugin/plugin.json` - `version` 2.29.0 + `description` count prose (67 -> 68, foundation 10 -> 11) + a release sentence.
- `.claude-plugin/marketplace.json` - `version` + count prose + release sentence.
- `.codex-plugin/plugin.json` - `version` + `longDescription` count prose.

### D. Root docs (manual)
- `README.md` - hero count, skills badge (`skills-67` -> `68`), foundation badge (`Foundation-10` -> `11`), the features bullet, the At-a-Glance mermaid (Foundation 10 -> 11, Cross-Cutting 22 -> 23), the catalog Foundation header + a NEW table row, the At-a-Glance facts row + tree comments, the version badge + Current-version row, a new "What's New" `<details>` block, the TOC anchor.
- `CHANGELOG.md` - new `## [2.29.0]` with `### Added` (the skill + sample library).
- `CLAUDE.md` - the project-context count line (68 / 11 foundation).
- `QUICKSTART.md` - the count lines (68 / 11 foundation).
- `AGENTS.md` - regenerated (item B), not hand-edited.

### E. Context files (manual; currency-gated)
- `_agent-context/claude/CONTEXT.md` - status line -> v2.29.0 + release summary; the skills-total tree comment -> 68.
- `_agent-context/codex/CONTEXT.md` - currency marker -> v2.29.0.

### F. Astro site (tracked, hand-authored)
- `site/src/content/docs/index.mdx` - Foundation (10) -> (11) + add the skill to the inline foundation list.
- `site/src/content/docs/skills/index.md` - classification table Foundation cell -> 11.
- `site/src/content/docs/samples/index.md` - bump the skill count (67 -> 68), the sampled-skill count, and the sample total (+6).
- `site/src/content/docs/getting-started/index.md` + `getting-started/quickstart.md` - count lines (68 / 11).
- `site/src/content/docs/reference/ecosystem.md` - the breakdown line (68 / 11).
- `site/src/content/docs/reference/pm-skill-anatomy.md` + `reference/project-structure.md` - verify/update any current-count claim.
- `site/src/content/docs/changelog.md` - curated one-paragraph `[2.29.0]` mirror.
- `site/src/content/docs/releases/Release_v2.29.0.md` (NEW, with `slug:` frontmatter) + a row in `releases/index.md`.

### G. Sample-approach + doc-currency check
- `library/skill-output-samples/SAMPLE_CREATION.md` + `THREAD_PROFILES.md` - these are stable process docs (followed, not edited per skill); verify currency (the v2.28.0 release found a stale `scripts/generate-showcase.py` reference in THREAD_PROFILES.md - confirm it was fixed). Note if the new "decision/verdict" artifact type needs any addition to SAMPLE_CREATION.md.
- `docs/internal/efforts/F-34-thread-profiles-reference.md` - no change expected; cross-check.

### H. Release-plan housekeeping
- `docs/internal/release-plans/v2.29.0/` (this plan + spec + implementation-plan).
- `docs/internal/release-plans/README.md` - add the v2.29.0 index row (and reconcile the v2.28.0/v2.29.0 reshuffle rows if present).

### I. Grep count-sweep (G2; the enumerated list is necessary, not sufficient)
Run an explicit sweep and update every non-historical hit, then re-grep to confirm zero:
- `grep -rn "\b67\b" --include=*.md --include=*.mdx --include=*.json .` and the same for `10 foundation` / `Foundation.*10` / `(10)` foundation forms.
- Triage each: live count -> 68 / 11; historical/changelog/release-note mention -> leave.
- Explicitly check surfaces the validator misses: `site/.../reference/platform*` / `guide*` / `concept*` / `runtime-component*` / `skill-versioning`; `_agent-context`; `README_SAMPLES.md` totals.

### J. Memory-deferral sweep (already mostly done)
The reassignment leaves stale "v2.29.0 = memory" pointers. Done: the parked plan banner + MEMORY.md. Confirm at G2: `grep -rni "v2.29.0" docs/internal _agent-context` finds no live reference that still calls v2.29.0 the memory/"Remember" train (the `_unreleased/project-memory/` plan's internal refs are historical, banner-noted).

## Execution phases (gate-first; task detail in the implementation-plan)

| Phase | What | Status |
|---|---|---|
| 0 | Spec design forks locked (name/category D3); ratify D2 | PENDING |
| **1** | **`evals/trigger-fixtures.json` authored + the disambiguation run = the GO/NO-GO gate** (`check-trigger-fixtures` + `check-new-skill-collision` green; the router eval separates from the five neighbors) | PENDING - the conditional-GO gate |
| 2 | `SKILL.md` + `references/{TEMPLATE,EXAMPLE,risk-taxonomy,routing-map}.md` | PENDING |
| 3 | M-33 output-eval rubric for the Build Risk Review artifact | PENDING |
| 4 | Sample library (W2, after TEMPLATE.md) + README_SAMPLES + manifest; sample-invariant + `check-skill-sample-coverage` green | PENDING |
| 5 | W4: reciprocal cross-link in `iterate-pivot-decision`; optional `workflow-feature-kickoff` front-gate (D4) | PENDING |
| 6 | Regen: skill-manifest, AGENTS block, site build, route-parity --update, resource-index (order matters) | PENDING |
| 7 | Count + surface sweep (Release surfaces A-J incl. the grep sweep I) | PENDING |
| 8 | G1 adversarial review (Codex) of the skill + samples; resolve | PENDING |
| 9 | Pre-tag validator bundle (`--strict`) + clean site build; cross-client smoke | PENDING |
| 10 | Tag v2.29.0 + GitHub Release + repin `agent-plugins`; flip plan SHIPPED | PENDING |

**Regen order:** add skill + samples -> regen skill-manifest + AGENTS -> build site -> `check-route-parity --update` -> `gen-resource-index`.

## Exit criteria (definition of done)

1. Phase-1 gate passed: fixtures separate the skill from the five neighbors; `check-new-skill-collision` green (or, on NO-GO, #149 closed with the fold-in disposition and this plan withdrawn).
2. Skill ships with SKILL.md + the 4 references + `evals/trigger-fixtures.json`; `lint-skills-frontmatter` green; description 20-100 words.
3. The contract holds in SKILL.md (one primary `R1`, demand level, graded evidence ledger, one of the four verdicts, a no-code next step, routing) and is structure-forward (the D1 no-go condition).
4. 6 samples (floor 3) pass the sample invariant + `check-skill-sample-coverage`; cover both modes + the four verdicts; an M-33 rubric is recorded.
5. Counts updated to 68 / foundation 11 across all surfaces (A-J); the grep sweep returns zero live stale hits.
6. Reciprocal cross-link added to `iterate-pivot-decision`.
7. Pre-tag bundle `--strict` green both shells; site builds clean; route-parity + rendered-links green.
8. G1 adversarial review applied; no unresolved Blocker/Major.
9. v2.29.0 tagged, GitHub Release Latest, marketplace install pulls the new version; this plan flipped SHIPPED; CONTEXT markers updated.

## Decisions

| # | Decision | Status |
|---|---|---|
| D1 | Build it at all (go/no-go) | CONDITIONAL GO (~70/30); gated on Phase 1; structure-forward or no-go |
| D2 | Scope = two modes (pre-build + feature-change); launched -> `iterate-pivot-decision` | DECIDED (spec) |
| D3 | Name + category | OPEN: `foundation-build-risk-review` vs `foundation-build-decision`; `problem-framing` vs `validation` |
| D4 | Ship the `workflow-feature-kickoff` front-gate this cycle, or defer | OPEN (default defer) |
| D5 | Sample richness = 6 (2 per thread), floor 3 | PROPOSED (vs the v2.28.0 6-per-thread; this artifact is narrower, so lighter) |
| D6 | M-34 joins v2.29.0: the key-free `pm-skill-router` engine (sub-agent default, dual-engine) | DECIDED (realizes the pre-documented `trigger-evals-explained.md` engine; removes the key for in-session gate runs; the F-56 probe already proved it) |
| D7 | Router model = Haiku default (gate tier); Opus avoided (lenient) | DECIDED (spec D-MODEL) |
| D8 | Candidate ride-along: a sample-sync CI gate (count `library/` samples; reconcile vs README_SAMPLES + `samples/index.md` + the v2.6.1 manifest) | OPEN - flagged because nothing currently enforces those manual sample counts; decide whether it rides v2.29.0 or is its own effort |

## Gate ledger (placeholder)

- [ ] G0 / G1 / G2 / G2.5 / G3 / G4 - filled at cut time.

## Notes

- DRAFT for maintainer review. D1 is a conditional GO; W1-W4 + the surface sweep are the if-GO blueprint.
- This plan took the v2.29.0 number from the deferred memory train; the number is tentative and renumbers if sequencing changes.
- Source skill is Apache-2.0 (`bin1874/before-you-build-skill`); the adaptation strips the external `beforeyoubuild.fyi` API call and re-voices PM-neutral, with attribution.
