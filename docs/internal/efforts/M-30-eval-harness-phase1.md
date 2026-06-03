# [M-30] Output eval harness - Phase 1 (deterministic invariants)

Status: Planned (v2.25.0)
Milestone: v2.25.0
Issue: TBD (provisional ID; sits clear of the roadmap's M-25..M-29 candidate band; confirm against GitHub issues + backlog-canonical before promotion)
Agent: Claude Opus 4.8 or Codex (scriptable; single-source `.mjs`)

## Scope

Ship Phase 1 (Tier 1) of the three-tier output-eval design: three deterministic quality-invariant validators over the existing `library/skill-output-samples/` corpus, wired ADVISORY (`continue-on-error: true`) into `validation.yml`. No LLM, no token cost. Promotion to enforcing is per-invariant, after a triage pass, in a later release.

## Problem

Every one of the repo's ~29 CI checks answers a STRUCTURAL question: does the file exist, parse, match a count, resolve a link, have a sample. Nothing checks whether a skill produces GOOD output. A skill can regress in quality (fabricate a metric, drop the evidence section, emit a placeholder, break exact-quote sourcing) while every structural gate stays green. The v2.23.0 review caught exactly this class (escaped-quote sourcing that broke the exact-substring contract) by hand; nothing automated would have.

The reframe that makes it tractable now: the 63 directories in `library/skill-output-samples/` ARE recorded skill outputs. They already exist, are canonical, and ship in the repo. Many quality invariants can be checked deterministically against them with no LLM and no cost - the cheap, CI-able entry point that reuses assets the repo already maintains.

## How It Works

Three standalone Node validators, each with a passing/failing fixture in a companion `.test.mjs`, run advisory over the corpus. Ordered by ascending false-positive risk:

1. **`check-sample-no-placeholders.mjs`** (fully deterministic) - flags `[Placeholder]`, `[Feature Name]`, `TODO`, unfilled `<...>` bracket tokens in any shipped sample. Lowest false-positive; the first enforcing candidate.
2. **`check-sample-exact-quote-sourcing.mjs`** (fully deterministic) - every `Source:` quoted span is an exact substring of the sample's own Prompt/input block. Scoped to evidence-citing skills, starting with `foundation-prioritized-action-plan` (corpus known-clean as of v2.23.0). Promotes the v2.23.0 hand-check to a validator.
3. **`check-sample-no-fabricated-metrics.mjs`** (heuristic) - a number/percentage not marked `[fictional]` and absent from the sample's Prompt block is flagged. Honors the `[fictional]` allowlist and a per-sample exempt marker (mirroring `count-exempt`). Highest false-positive; advisory, triage before any enforcing move.

Invariants assert PROPERTIES of output; they never byte-compare a full sample (brittle). Tiers 2 (LLM rubric) and 3 (live-run regression) are OUT of scope for this release.

## Classification

- Type: CI tooling (new advisory quality tier; not a skill)
- New: three `scripts/check-sample-*.mjs` (+ `.test.mjs`); three advisory steps in `validation.yml`
- No new slash command, no skill, no catalog count change

## Exemplars

- `scripts/check-version-references.{sh,ps1}` - the existing advisory CI pattern to mirror
- `scripts/check-rendered-links.mjs` + `.test.mjs` - the `.mjs` validator + unit-test convention
- `library/skill-output-samples/` (63 dirs), `SAMPLE_CREATION.md`, the `[fictional]` convention - the corpus and its rules
- `docs/internal/release-plans/_unreleased/output-eval-harness.md` - the full three-tier design this Phase 1 implements
- `docs/internal/release-plans/v2.25.0/spec_v2.25.0.md` section 4 - the spec and ACs

## Deliverables

- `scripts/check-sample-no-placeholders.mjs` + `.test.mjs`
- `scripts/check-sample-exact-quote-sourcing.mjs` + `.test.mjs`
- `scripts/check-sample-no-fabricated-metrics.mjs` + `.test.mjs`
- Three advisory steps in `.github/workflows/validation.yml`
- A user-facing reference page (with a mermaid tier diagram + the advisory-to-enforcing path)
- Triage record for any pre-existing corpus violations (fix or exempt-mark)

## Validation

- Each validator: exit 0 on a good fixture, non-zero on a bad fixture (its `.test.mjs`)
- All three wired advisory; none in the enforcing pre-tag bundle (spec ACs 30-1..6)
- A full-corpus advisory run produces a readable per-sample report; pre-existing violations triaged, not silently green
- Confirm `validate-script-docs` does not require a `.md` companion for `.mjs` validators

## Open Questions

- Which invariant goes enforcing first (candidate: no-placeholders, or exact-quote-sourcing scoped to `foundation-prioritized-action-plan`) - decided after the advisory run reports.
- Is the wider 63-dir corpus clean enough to enforce no-fabricated-metrics repo-wide, or does it need a triage pass first - answered by the first advisory run.
- Whether Tier 2/3 (LLM-judged) belongs in this repo's CI at all or in a separate scheduled job - deferred.

## Dependencies

- None. Touches only `scripts/` and `validation.yml`; independent of the two hooks and can build in parallel.

## Status Transitions

- Planned (current, v2.25.0)
- In Progress - when the first invariant validator is authored
- Shipped - on v2.25.0 tag (advisory); enforcing promotion is later, per invariant
