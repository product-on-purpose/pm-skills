# Implementation Plan: `foundation-build-risk-review` (v2.29.0) - DRAFT

Companion to [`plan_v2.29.0.md`](plan_v2.29.0.md) + [`spec_build-risk-review.md`](spec_build-risk-review.md); realizes [F-56](../../efforts/F-56-build-risk-review.md) / issue #149. Task order; the gate at Task 2 is the go/no-go.

Agent: claude (authoring + fixtures); the maintainer ratifies the gate. Built on a feature branch (`skill/foundation-build-risk-review`), reviewed by PR. Nothing is staged in `_staging/` (drafts live in their real location on the branch).

> The release-wide surface sweep (counts, the three plugin manifests, README + site + CONTEXT, README_SAMPLES + the sample manifest, the grep count-sweep) is enumerated in [`plan_v2.29.0.md`](plan_v2.29.0.md) "Release surfaces (G2) A-J" - **that plan is the authoritative hygiene checklist.** This file is the skill-build task order; the sample set is the plan's W2 manifest.

## Task order

**T1 - Author the trigger fixtures (do this first).**
- File: `skills/foundation-build-risk-review/evals/trigger-fixtures.json` (the M-31 format: should-trigger, should-not-trigger, near-miss negatives, 60/40 split).
- The near-miss set MUST include queries that should fire `foundation-lean-canvas`, `iterate-pivot-decision`, `define-hypothesis`, `define-problem-statement`, and `define-prioritization-framework` instead.
- Validate: `node scripts/check-trigger-fixtures.mjs` green.

**T2 - GATE: the disambiguation pass (go / no-go).**
- Run the fixtures (the controlled router eval / collision check). Confirm the description separates cleanly from the five neighbors.
- GO -> continue. NO-GO -> stop; fold the demand hierarchy + verdict rubric into `foundation-lean-canvas` / `iterate-pivot-decision`; close #149 with that disposition. (Plan D1.)

**T3 - SKILL.md + references.**
- `skills/foundation-build-risk-review/SKILL.md` (frontmatter per the spec; the contract; the two modes; the verdict-as-router; When-NOT-to-Use; attribution).
- `references/TEMPLATE.md`, `references/EXAMPLE.md` (a complete worked feature-mode case), `references/risk-taxonomy.md`, `references/routing-map.md`.
- Validate: `bash scripts/lint-skills-frontmatter.sh`; the no-em-dash sweep; description 20-100 words.

**T4 - Output-eval rubric (M-33).**
- A rubric for the Build Risk Review artifact (decision clarity, single-risk discipline, evidence-grading honesty, verdict justification, routing correctness). Results recorded internal per the M-33 convention.

**T5 - Samples.**
- 3 thread profiles (`sample_foundation-build-risk-review_<thread>_<suffix>.md`), following TEMPLATE.md order; at least one feature-mode and one pre-build; each demonstrates a graded evidence ledger and the routing.
- Validate: the sample invariant + `check-skill-sample-coverage`.

**T6 - Wire-up + the full surface sweep.**
- Reciprocal cross-link: add a When-NOT-to-Use row in `iterate-pivot-decision` pointing here.
- Run the regenerated set in order: `gen-skill-manifest.mjs` -> `gen-skill-manifest.mjs --agents` -> site build (`gen-site.mjs`) -> `check-route-parity.mjs --update` -> `gen-resource-index.mjs`.
- Then execute the **complete release-surface sweep in [`plan_v2.29.0.md`](plan_v2.29.0.md) "Release surfaces (G2)" A-J** (the three plugin manifests, README badges/At-a-Glance/catalog row/What's New, CHANGELOG, CLAUDE.md, QUICKSTART, both CONTEXT files, the ~9 Astro pages + Release_v2.29.0.md, README_SAMPLES + the sample manifest, the grep count-sweep I, the memory-deferral sweep J). Counts move 67 -> 68 (foundation 10 -> 11). Do not rely on this task's summary alone - the plan is the checklist.

**T7 (optional, D4) - workflow integration.**
- Front-gate of `workflow-feature-kickoff`, or defer.

## Pre-tag

- The standard pre-tag bundle green on both shells: `lint-skills-frontmatter`, `check-count-consistency`, `check-skill-sample-coverage`, `check-trigger-fixtures`, `check-new-skill-collision`, route-parity, `gen-resource-index`, rendered-links.
- Cut via the 6-gate runbook inline; G1 Codex adversarial review; tag the G2.5-captured SHA.

## Files (new unless noted)

- `skills/foundation-build-risk-review/SKILL.md`
- `skills/foundation-build-risk-review/references/{TEMPLATE,EXAMPLE,risk-taxonomy,routing-map}.md`
- `skills/foundation-build-risk-review/evals/trigger-fixtures.json`
- `library/skill-output-samples/foundation-build-risk-review/` (3 samples) + README_SAMPLES + the sample manifest
- `skills/iterate-pivot-decision/SKILL.md` (edit: the reciprocal cross-link)
- `AGENTS.md`, `skill-manifest.json`, the count surfaces (regen)
- the command file (if applicable)
