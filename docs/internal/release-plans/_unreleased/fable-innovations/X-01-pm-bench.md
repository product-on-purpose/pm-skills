# X-01 PM-Bench: a standalone, publishable benchmark for PM skill packs (unreleased spec + implementation plan)

**Status:** PARKED (pre-decision; not committed scope)
**Owner:** Maintainers
**Created:** 2026-07-03
**Provenance:** the 2026-07-04 deep audit (maintainer-local, gitignored), section 6b/6c, bet X-1 (PM-Bench: publish the benchmark, not just the results)
**Candidate formal ID:** to be assigned at promotion (F-5x/M-3x per the backlog ID rule)
**Audit score (Bar / Moat / Effort-inverse):** 3 / 3 / 1 = 7 of 9. Audit's note: "the category-defining move; needs R-21 critical mass."
**Companion docs:** [`docs/internal/release-plans/v2.31.0/plan_v2.31.0.md`](../../v2.31.0/plan_v2.31.0.md) (WS-Z10, the eval-completion dependency this bet needs) and `docs/internal/roadmap.md` (the eval-program lineage this bet packages)

---

## Summary and why it wins

Package the trigger-eval and output-eval harnesses pm-skills already built (M-31, trigger-accuracy evals; M-33, output-quality evals) as a standalone, versioned, runnable benchmark, "PM-Bench," that scores ANY PM skill pack, meaning any directory of SKILL.md-shaped files, on two axes: routing accuracy (does the right skill fire for a query) and artifact quality (is the produced artifact actually good). Publish pm-skills' own scores first. Invite competitors and other libraries to run it themselves. Document the honest confounds as part of the published artifact, not as a footnote: the project already learned this lesson the hard way (the headless trigger-eval confound finding, folded into the M-31 method) and publishing that methodology alongside the numbers is itself part of the moat.

Why it wins: this is one of the two highest-scoring moves in the audit's own scoring, tied at 7 of 9 (Bar 3, Moat 3, Effort-inverse 1). A benchmark cannot be retrofitted by a competitor after the fact the way a feature can be copied; it requires eval assets nobody else in the field has built, a pinned-model routing harness with a calibration gate, plus a generate/judge/negative-control artifact-quality harness with validity gates. Whoever publishes the benchmark first defines the category, and every other PM skill library becomes a contestant on pm-skills' own court rather than a peer making an unverifiable "works great" claim. This converts the eval investment from a private quality bar into the field's referee position.

The parked `_unreleased/project-memory/` plan names the closest rival pairing in the competitive landscape as PM Brain and the competitor `phuryn/pm-skills`, both positional today (a README mention, a superficially similar catalog), with no eval assets behind either. PM-Bench applies the same logic the audit uses for F-48 (the project-memory keystone, the roadmap's other top-scored bet): whoever ships the structural, measured asset first defines the race, and a rival cannot retroactively catch up on a dimension it never measured. A published, runnable benchmark turns "we are more rigorous" from a subjective claim into a scored, reproducible one.

## Relationship to existing plans

No item in the operating-layer roadmap (`docs/internal/roadmap.md`, F-43 through F-53 and M-25 through M-29) proposes a benchmark. The closest relatives are the eval-program M-IDs that already shipped: M-30 (eval harness phase 1), M-31 (trigger-accuracy evals), M-32 (derived surfaces), and M-33 (output-quality evals), all landed in the v2.27.0 "provable quality" release. X-01 does not duplicate that program; it packages it for external, portable use. Nothing here proposes redoing M-30 through M-33's internal work.

The parked `docs/internal/release-plans/_unreleased/project-memory/` plan (F-48, the project-state keystone) has no direct relationship to a benchmark and is not touched by this bet.

The dependency that matters is the parallel [`v2.31.0` plan](../../v2.31.0/plan_v2.31.0.md). Its workstream WS-Z5 (eval industrialization) delivers a fixture backfill wave (moving trigger coverage from ~46% (31/68) toward ~65%) plus an output-eval CI lane and a published evals page. Its staged workstream WS-Z10 (eval completion catalog-wide, promotion trigger: "wave-1 backfill green and the output-eval lane stable for 2 releases") is named explicitly in the v2.31.0 plan as feeding this exact bet: "feeds the PM-Bench innovation X-1." X-01 is therefore sequenced strictly after WS-Z10 reaches its own promotion trigger, not in parallel with it. The v2.31.0 published evals page is a precursor, not a duplicate: that page publishes pm-skills' own scores in prose; X-01 goes further and publishes the runnable harness itself as a portable artifact other packs can execute. X-01 must not restate or compete with the evals page, it extends it.

v2.30.0 (trust repair) has no direct relationship to this bet.

## Spec

### Scope in

- A versioned harness that accepts an arbitrary directory of skill definitions (not hardcoded to this repo's `skills/`) as its unit of scoring.
- A routing-accuracy pass reusing the controlled-eval method already proven in `scripts/run-router-evals.mjs`: isolated description text, a pinned model, no plugin or session confounds, a built-in calibration set the instrument must ace before its numbers count.
- An artifact-quality pass reusing the M-33 method (generate arm, negative-control arm, blind judge panel) against a portable rubric schema, with its two validity gates: a discrimination gap between skill and control, and inter-judge agreement.
- A published, versioned scenario corpus ("PM-Bench vN") decoupled from pm-skills' own internal trigger-fixtures, so scoring a competing pack stays fair, the corpus does not assume pm-skills' own skill names.
- pm-skills' own first published scorecard, run against itself, as the reference baseline.
- A decide-and-document call on where the benchmark lives (see Risks and open questions, OQ-1).

### Scope out

- Judging any non-PM domain; this is PM-skill-specific by design.
- A live public leaderboard or third-party submission intake service; a plausible phase-two idea, not v1 scope.
- Auto-scoring packs that do not ship SKILL.md-shaped, description-bearing definitions at all.

### Requirements

- **REQ-1.** The harness must accept an arbitrary directory of skill definitions as its unit of scoring, never hardcoded to this repo's own catalog.
- **REQ-2.** The routing-accuracy pass must reuse the controlled-eval method proven in `run-router-evals.mjs` (pinned model, isolated description text, a calibration gate), not the environment-confounded headless method the project already tried and rejected.
- **REQ-3.** The scenario corpus must be versioned independently of any single pack's skill count, so a run stays reproducible against "PM-Bench v1.2" regardless of which pack is under test.
- **REQ-4.** The artifact-quality pass must reuse the M-33 generate, negative-control, judge-panel method with both its validity gates, and must refuse to publish a score that fails either gate.
- **REQ-5.** Every published result must carry a methodology block stating model, version, pinning, and known confounds, citing the trigger-eval headless-confound lesson as the canonical example of what an honest confound note looks like.
- **REQ-6.** pm-skills' own scorecard must be the first published result, generated by an actual maintainer-run harness execution, never a marketing claim without a reproducible run behind it.
- **REQ-7.** The routing pass must offer a key-free execution path, mirroring M-34's sub-agent engine, so a third party is not blocked on Anthropic API key provisioning; the Messages-API path stays available as the pinned, cacheable, parallel reference engine.
- **REQ-8.** A benchmark run must diff against a committed baseline and flag regression, mirroring `run-router-evals.mjs --baseline`.

### Interfaces and contracts

Input: a directory path, or a git URL to clone, containing `<skill-name>/SKILL.md` files, optionally with `<skill-name>/evals/trigger-fixtures.json` if the pack already ships fixtures, a bonus signal, never required. Output: `pm-bench-result.json` (pack name, PM-Bench version, per-skill routing recall and precision, per-family artifact scores, discrimination gaps, agreement figures, model, version, and timestamp) plus `pm-bench-report.md`, the human-readable narrative. Sketch CLI shape: `node pm-bench/run.mjs --pack=<dir> --model=claude-haiku-4-5 --baseline=<path>`.

Illustrative result shape, not a real published number:

```json
{
  "pm_bench_version": "1.0.0",
  "pack_name": "pm-skills",
  "pack_ref": "v2.31.0",
  "model": "claude-haiku-4-5",
  "run_at": "2026-09-01T00:00:00Z",
  "routing": { "recall": 0.94, "precision": 0.91, "calibration_passed": true },
  "artifact_quality": {
    "families_scored": 3,
    "mean_discrimination_gap": 1.4,
    "mean_agreement_stdev": 0.5
  },
  "confounds": ["see the methodology block in pm-bench-report.md"]
}
```

### Durable CI block

pm-skills' own scored runs are not a blocking CI gate; they are model-call-bearing and non-deterministic by nature, exactly like M-31 and M-33 today, so they stay a `workflow_dispatch` plus scheduled cadence, recorded, never enforcing. What IS durable and CI-enforced: the harness's own pure-function logic (pack parsing, scoring math, schema validation, the calibration-set structure) ships as single-source `.mjs` with a `.test.mjs` unit test, `node --test`-executed, no model calls in the test path, matching how `run-router-evals.mjs`'s pure functions are tested today. A `pm-bench-schema.mjs` check (deterministic, no API) validates that any produced `pm-bench-result.json` conforms to the published schema, and this one can be enforcing from day one.

Registration note: `scripts/validation-manifest.yaml`'s current scope, by its own header comment, is the 26 dual-shell (`.sh` plus `.ps1`) validator pairs; Node-only checks such as `check-trigger-fixtures.mjs` and `check-new-skill-collision.mjs` already live in `.github/workflows/validation.yml` directly, with no manifest entry, by design. Register the new schema check in the manifest only if the v2.31.0 zero-drift generator work has by then extended the manifest's remit to Node validators generally; otherwise follow today's Node-only pattern. Confirm at build time. Both-legs wiring is simpler than it sounds: `validation.yml` already runs one job across a `matrix.os: [ubuntu-latest, windows-latest]` strategy, so adding a Node step inside that job runs it on both legs automatically, with no shell-specific variant required.

Enforcement ladder note: unlike most new checks in this repo, `pm-bench-schema.mjs` can start enforcing rather than advisory, because it validates the harness's own emitted output format, not judgment about arbitrary third-party content; there is no false-positive discovery period to wait out. The scored-run workflow itself stays recorded-not-enforcing indefinitely, matching M-31 and M-33.

### Non-goals

Not a general-purpose agent benchmark; PM-skill-specific by design. Not a live leaderboard service at v1. Not a replacement for the internal M-31/M-33 eval program, which keeps running independently; PM-Bench packages and exposes it, it does not replace it.

## Implementation plan

| Phase | What | Agent | Effort | Depends on |
|---|---|---|---|---|
| 1 | Decide in-repo vs sibling-repo home (OQ-1 below); ratify | agent:human | S | none |
| 2 | Extract the routing-accuracy engine from `run-router-evals.mjs` into a pack-parameterized module | agent:codex | M | Phase 1 |
| 3 | Build the artifact-quality pass; author the first versioned PM-Bench scenario corpus | agent:codex + agent:claude | M | Phase 2 |
| 4 | Generate and publish pm-skills' own PM-Bench v1 scorecard; write the methodology and confounds page | agent:claude | S | Phase 3 |
| 5 | Decide publication venue and announce | agent:human | S | Phase 4 |

Test and eval strategy: pure-function unit tests for parsing, scoring, and schema validation are deterministic and CI-blocking. The actual scored runs against real skill packs are recorded evidence, not CI-blocking, matching the existing non-deterministic-model-call posture of M-31 and M-33.

Dependency note: WS-Z10 (v2.31.0, staged, eval completion catalog-wide) reaching its own promotion trigger, wave-1 backfill green and the output-eval lane stable for two releases, is the critical-mass gate this bet needs before it can promote. Scoring pm-skills' own catalog as the reference baseline while its own coverage sits well under 100 percent would undermine the reference run's credibility on the exact axis the benchmark claims to prove.

## Release surfaces touched (G2 delta)

At PARKED status: none, no release is cut for a parked document. At promotion, the eventual delta depends on the Phase 1 decision: if sibling repo (recommended, see OQ-1), pm-skills' own G2 delta is minimal, a README or site link out plus a `docs/RESOURCES.md` entry, regenerated automatically. If in-repo, the full A through J release-surface treatment applies as it would for any new tooling addition.

## Risks and open questions

| ID | Question | Recommendation | Status |
|---|---|---|---|
| OQ-1 | In-repo vs sibling-repo home | B, sibling repo | OPEN |
| OQ-2 | Required input conformance (strict spec vs loose SKILL.md shape) | B, loose at v1 | OPEN |
| OQ-3 | Overfitting risk once the corpus is public | Hold out a refreshed subset | OPEN |
| OQ-4 | Public leaderboard vs self-published scores only | B, no hosted leaderboard at v1 | OPEN |

**OQ-1 (in-repo vs sibling repo).** A) build under a `bench/` or `pm-bench/` directory in this repo: reuses existing scripts and a single release cadence, but couples benchmark versioning to plugin versioning, and a competitor pack scoring poorly inside pm-skills' own CI reads as self-graded. B) a sibling repo (for example `product-on-purpose/pm-bench`), mirroring the existing `pm-skills-mcp` and the proposed `utility-skills` sibling pattern: independent versioning, a cleaner "neutral referee" story. **Recommend B**: a benchmark's credibility depends partly on being visibly decoupled from the library it scores first, and the sibling-repo pattern is already house convention.

**OQ-2 (input conformance).** A) require strict conformance to a future agentskills.io output-contract extension, ties to X-02, artifact schemas. B) accept any directory with description-bearing SKILL.md files, no stricter format required at v1. **Recommend B** for v1: gating this bet's own launch on an external spec proposal's acceptance, itself X-02's own open question, would stall this bet on a dependency it does not need yet; tighten later if X-02 lands.

**OQ-3 (overfitting).** A published scenario corpus invites packs to overfit to it. Mitigation: hold back a refreshed subset not published, rotated periodically, the same practice mainstream ML benchmarks use to keep a public leaderboard honest.

**OQ-4 (leaderboard vs self-published).** A) host a public leaderboard accepting third-party submissions. B) publish the harness and the scenario corpus as runnable artifacts; pm-skills publishes its own score, third parties run and publish (or withhold) their own independently. **Recommend B**: hosting and moderating a leaderboard is a service commitment this project's bus factor of one cannot sustain, and it duplicates the Scope-out line above ("no live leaderboard hosting"). B keeps the deliverable a benchmark, not a platform.

Additional risks: model version drift, a deprecated model breaking the "pinned model" reproducibility promise, is mitigated by re-anchoring per major model generation and dating every published scorecard. A disputed score from a competitor pack is mitigated by the up-front honest-confound documentation already required in REQ-5 and an open, inspectable scoring script rather than a black box.

## What changes if this ships

pm-skills' own quality claim moves from "we say we test our skills" to "here is the number, here is exactly how to get your own." Every PM skill library that enters the space afterward is implicitly compared against a public, reproducible reference score rather than an unverifiable marketing sentence. This is also self-consistent with the candor the audit itself praised elsewhere in the project (M-33's own "do not trust absolute numbers" caveat about its confounded harness): PM-Bench extends that same honesty outward instead of only applying it internally.

## Promotion trigger and path

A GitHub issue opens once WS-Z10 (v2.31.0, staged) reaches its own promotion trigger. The issue becomes an effort brief, a candidate M-3x ID given this is eval and tooling infrastructure in the lineage of M-30 through M-34, confirmed against the GitHub issue list and `backlog-canonical.md` per the ID rule at `docs/internal/roadmap.md` section 7 at filing time; as of this writing M-37 reads free. The effort brief slots into a release plan at the theme the audit's own suggested sequencing names, "Referee," pairing R-21 (eval completion) with this bet's publication.
