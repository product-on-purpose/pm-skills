# Idea: Output Eval Harness

**Status:** Phase 1 (Tier 1) SHIPPED in v2.25.0 as M-30 - three deterministic advisory invariant validators (`scripts/check-sample-{no-placeholders,exact-quote-sourcing,no-fabricated-metrics}.mjs`) over the recorded samples, wired advisory in CI. Tiers 2-3 (LLM-judged rubric / live-run) remain UNRELEASED / idea.
**Created:** 2026-05-31
**Owner:** Maintainers
**Type:** infrastructure (cross-cutting, advisory-first)
**Origin:** surfaced during the v2.23.0 retro. The repo's CI verifies structure exhaustively but output quality not at all.

---

## 1. The problem

Every one of the ~29 CI checks answers a *structural* question: does the file exist, parse, match a count, resolve a link, match generator output, have a sample. **Nothing checks whether a skill produces good output.** For a 64-skill library that is both a marketplace product and a learning vehicle, output quality is the dimension with the least coverage and the highest leverage.

The risk this leaves open: a skill can regress in *quality* (fabricates a metric, collapses Cynefin to Complicated, drops the evidence section, emits a placeholder) while every structural gate stays green. The v2.23.0 Codex review caught exactly this class (escaped-quote sourcing that broke the exact-substring contract) by hand; nothing automated would have.

## 2. The key reframe (what makes this tractable)

Running a skill requires an LLM: non-deterministic, token-costly, awkward in per-PR CI. That is the usual reason output-eval gets deferred. But:

**The 186 files in `library/skill-output-samples/` ARE recorded skill outputs.** They already exist, are canonical, and ship in the repo. Many quality invariants can be checked *deterministically against these recorded outputs* with no LLM and no cost. That is the cheap, CI-able entry point, and it reuses assets the repo already maintains.

The new `foundation-prioritized-action-plan/eval/fixtures/` (labeled inputs + rubric) is the seed for the *live-run* tier; the library samples are the seed for the *recorded-output* tier.

## 3. Design: two tiers

| Tier | What it checks | Determinism | Where it runs | Cost |
|---|---|---|---|---|
| **T1 - Invariants over recorded outputs** | Quality invariants on the existing `library/skill-output-samples/` (and skill `references/EXAMPLE.md`) | Deterministic (scripted) | CI, per-PR, advisory then enforcing | Free |
| **T2 - LLM-judged quality** | A rubric scores a few golden fixtures per high-value skill | Model-judged (non-deterministic) | Scheduled / manual, advisory only | Tokens |
| **T3 - Live-run regression** | Invoke a skill on labeled fixtures, score the fresh output | Model-run + scored | Scheduled / manual | Tokens (highest) |

T1 is the whole near-term play. T2/T3 are later and never block a PR.

## 4. Invariant catalog (Tier 1, deterministic)

Checks runnable today over recorded samples. Each is a small, bash-3.2 + pwsh-parity script (the repo's validator convention), advisory first:

- **No fabricated metrics.** Any number/percentage in a sample that is not marked `[fictional]` and does not appear in the sample's own Prompt block is flagged. (The library already uses the `[fictional]` convention; this enforces it.)
- **Exact-quote sourcing.** For evidence-citing skills (`foundation-prioritized-action-plan` first), every `Source:` quote is an exact substring of the input/Prompt. (This exact check was written by hand in v2.23.0 and caught real bugs; promote it to a validator.)
- **No placeholders.** No `[Placeholder]`, `[Feature Name]`, `TODO`, `<...>`, or unfilled bracket tokens in any shipped sample (extends the `placeholder-leakage` idea from `lint-skills-frontmatter` to sample bodies).
- **Confidence-ceiling honored.** For skills with a Cynefin ceiling, no `High` confidence marker appears in a sample classified Complex or Chaotic.
- **Structure completeness.** A sample contains the section set its skill's `references/TEMPLATE.md` defines (header-set comparison; reuses the `template-example-alignment` idea).
- **Source-ledger integrity.** Inline source IDs resolve to a ledger entry; no dangling references.

These are invariants, not golden-output diffs. We never diff a full output (brittle). We assert properties.

## 5. Phased rollout

- **Phase 1 (the cheap win):** ship 2-4 Tier-1 invariant validators over the existing samples, wired **advisory** into `validation.yml` (like `check-version-references`). Promote to enforcing per-invariant once the corpus is clean. Reuses 186 existing samples; no LLM. **This is 80% of the value.**
- **Phase 2:** author per-skill rubrics for the highest-value skills (PRD, problem-statement, OKR-writer, prioritized-action-plan) + a handful of golden fixtures. Run T2 manually or on a schedule; record scores in an eval report. Advisory only.
- **Phase 3:** a live-run harness (T3) that invokes a skill on its labeled fixtures and scores fresh output, for true regression detection across model upgrades. Scheduled (e.g., on model bumps), never per-PR.

## 6. Scope decisions (brief)

- **Advisory-first, always.** LLM-judged tiers never block a PR (non-determinism). Tier-1 invariants may become enforcing once the corpus passes. Rationale: matches the repo's existing advisory pattern (`check-version-references`) and avoids flaky gates.
- **Invariants, not golden diffs.** Assert properties of output, never byte-compare full outputs. Rationale: golden diffs are brittle and break on every legitimate edit.
- **Start from recorded samples, not live runs.** Phase 1 needs no model. Rationale: tractability and cost; the assets already exist.
- **Out of scope (now):** scoring "is this a *good* PRD" holistically (that is Tier 2 rubric work, deferred); cross-client output comparison; a web dashboard.

## 7. Risks

- **Corpus not yet clean.** Tier-1 invariants run over 186 samples may surface pre-existing violations (some older samples predate current conventions). Mitigation: advisory first; triage and fix or exempt before enforcing.
- **Invariant false positives.** "No fabricated metrics" is heuristic (number-in-output-not-in-input). Mitigation: the `[fictional]` allowlist + a per-sample exempt marker, mirroring `count-exempt`.
- **Scope creep into a test framework.** Keep each invariant a small standalone validator, not a framework. Rationale: the repo's whole validator set is small standalone scripts; match that.

## 8. Relationship to existing assets

- **Reuses:** `library/skill-output-samples/` (186 recorded outputs), `foundation-prioritized-action-plan/eval/fixtures/` (the live-run seed), the validator + pwsh-parity + `count-exempt` conventions, the advisory-CI pattern.
- **Complements (does not replace):** `lint-skills-frontmatter` (structure), `check-skill-sample-coverage` (samples exist), `check-generated-content-untouched` (generated docs). This adds the missing *quality* axis on top of *existence* and *structure*.

## 9. Agent assignment + rough effort

| Phase | Work | Agent | Effort |
|---|---|---|---|
| 1 | 2-4 Tier-1 invariant validators (.sh + .ps1 + .md), advisory wiring | codex or claude (scriptable; pwsh parity) | ~1-1.5 d |
| 2 | Per-skill rubrics + golden fixtures (4 high-value skills) | claude (model-in-loop) + human (rubric review) | ~1-2 d |
| 3 | Live-run harness + scheduled workflow | claude + human | ~2-3 d |

> Codex context: Tier-1 validators must be bash-3.2 portable, have pwsh parity, and ship a companion `.md` (so `validate-script-docs` stays green). Model them on `scripts/check-skill-sample-coverage.{sh,ps1,md}`. Wire advisory into `.github/workflows/validation.yml` with `continue-on-error: true` first.

## 10. Open questions

1. Which invariant goes enforcing first? (Candidate: exact-quote sourcing for `foundation-prioritized-action-plan`, since the corpus is known-clean as of v2.23.0.)
2. Is the recorded-sample corpus clean enough to enforce "no fabricated metrics" repo-wide, or does it need a triage pass first?
3. Does Tier 2/3 live-run eval belong in this repo's CI at all, or as a separate scheduled job / external harness?
4. Should this ship as its own minor (e.g., v2.24.0, "output-quality CI") so the advisory-to-enforcing promotion is releasable in steps?
