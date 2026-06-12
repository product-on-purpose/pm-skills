# [M-31] Trigger-accuracy eval harness - Phase 1 (cohort fixtures + advisory lane)

Status: Planned (v2.27.0)
Milestone: v2.27.0
Issue: TBD (provisional ID; next free after M-30; confirm against GitHub issues + any backlog-canonical remnants before promotion)
Agent: claude (fixture authoring requires PM judgment) + codex (harness + validator are scriptable)

## Scope

Ship Phase 1 of trigger-accuracy evaluation: per-skill trigger fixtures for the F-12 26-skill converged cohort in the published agentskills.io format, a runnable harness (local + cost-gated `workflow_dispatch`), and a deterministic fixture-structure validator wired ADVISORY into `validation.yml`. No new skills, no catalog count change, no enforcing promotion in this phase.

## Problem

A skill's frontmatter `description` carries the entire burden of triggering: clients select from descriptions alone, potentially among 100+ installed skills. The repo's history proves the failure mode is real and currently detectable only by hand: the 2026-06-09 audit found five description collision pairs plus a phantom reference on the always-loaded trigger surface, and F-12 Batch 0 (v2.26.0) fixed them manually. Nothing prevents recurrence as descriptions evolve or the catalog grows.

Since then the methodology became a published standard (agentskills.io Optimizing Descriptions): ~20 labeled queries per skill (8-10 should-trigger, 8-10 should-not, with near-miss negatives as the highest-value cases), 3 runs per query against a 0.5 trigger-rate threshold, and a 60/40 train/validation split so description iterations cannot overfit. Anthropic's own skill-creator automates the loop. No PM skill library conforms today; shipping this makes trigger accuracy a measured property of the catalog instead of an audit finding.

Sequencing rationale: runs AFTER F-12 (done, v2.26.0) so fixtures test the corrected corpus, per the v2.26.0 plan's deferred-items note.

## How It Works

1. **Fixture format:** per-skill labeled query sets under the skill's `evals/` directory (exact file naming in spec; the directory choice is deliberate so the future output-eval lane, `evals/evals.json`, lands in the same place). Each fixture declares should-trigger and should-not-trigger queries, near-miss annotations, and the train/validation split.
2. **Deterministic fixture-structure validator** (`scripts/check-trigger-fixtures.mjs` + `.test.mjs`): schema validity, minimum counts, split integrity, near-miss presence, no duplicate queries across a skill's sets. Free, CI-able, lands advisory immediately (the M-30 ladder).
3. **Harness:** mirrors the published bash pattern (`claude -p --output-format json`, detect whether the Skill tool fired for the target skill), 3 runs per query, 0.5 threshold, per-skill and per-cohort report. Runs locally and as a cost-gated `workflow_dispatch` lane (ANTHROPIC_API_KEY secret); shares mechanism with the candidate smoke-runbook CI wrapper, build once if both land.
4. **Recording rule:** the baseline cohort report lands in the release record; subsequent runs compare against it. The record is the gate; the LLM lane never enters the enforcing pre-tag bundle.

## Classification

- Type: CI tooling + eval fixtures (not a skill; no catalog count change)
- New: fixture files under `skills/<name>/evals/` for the 26-skill cohort; `scripts/check-trigger-fixtures.mjs` (+ test); one advisory step in `validation.yml`; one `workflow_dispatch` lane; a fixture-schema reference doc
- Per decision Q-C (v2.27.0 plan): adding fixtures does NOT bump skill versions (no behavior change); record the rule in `docs/internal/skill-versioning.md`

## Exemplars

- `docs/internal/efforts/M-30-eval-harness-phase1.md` - the advisory-ladder precedent this mirrors (Tier-1 deterministic first, LLM tiers later)
- https://agentskills.io/skill-creation/optimizing-descriptions.md - the methodology this implements (accessed 2026-06-12)
- `site/src/content/docs/contributing/agentic-smoke-runbook.md` - the cost/recording-rule precedent for LLM-run lanes
- `scripts/check-rendered-links.mjs` + `.test.mjs` - the `.mjs` validator + unit-test convention
- F-12 spec (`docs/internal/release-plans/v2.26.0/spec_skill-quality-convergence.md`) - the 26-skill cohort definition and the collision pairs that become near-miss negatives

## Deliverables

- Fixture schema reference + authoring guide (including how near-miss negatives are chosen; the audit's collision pairs seed them)
- 26 cohort fixture sets (authored, triaged, split 60/40)
- `scripts/check-trigger-fixtures.mjs` + `.test.mjs`, wired advisory in `validation.yml`
- Harness script(s) runnable locally and via `workflow_dispatch`
- Baseline cohort report recorded in the v2.27.0 release record
- Triage record for any skill whose baseline trigger rate fails threshold (fix description via the F-12 mechanism or document why)

## Validation

- Fixture validator: exit 0 on a good fixture, non-zero on each violation class (its `.test.mjs`)
- All cohort fixtures pass the structure validator before the LLM baseline runs
- Baseline run produces a readable per-skill report (trigger rate per query class, validation-set pass rate)
- Nothing enters the enforcing pre-tag bundle in this phase

## Open Questions

- Exact fixture file naming inside `evals/` (settled in spec, jointly with the future output-eval layout)
- Whether the harness should also run a small cross-skill collision sweep (every cohort skill's should-trigger queries tested against every OTHER cohort skill for false fires), which is the automated version of the audit's collision finding; likely yes if token cost allows
- Expansion order beyond the cohort (by phase family vs by collision risk), decided after the baseline report

## Dependencies

- F-12 skill-quality convergence: DONE (v2.26.0). No other dependencies; independent of the derived-surfaces candidate.

## Status Transitions

- Planned (current, v2.27.0)
- In Progress - when the fixture schema spec is written
- Shipped - on v2.27.0 tag (fixtures + advisory validator + recorded baseline); enforcing promotion and catalog-wide expansion are later phases
