# X-05 Self-testing library: the agentic dogfood lane (unreleased spec + implementation plan)

**Status:** PARKED (pre-decision; not committed scope)
**Owner:** Maintainers
**Created:** 2026-07-03
**Provenance:** the 2026-07-04 deep audit (maintainer-local, gitignored), section 6b/6c, bet X-5 (the self-testing library, an agentic dogfood lane)
**Candidate formal ID:** to be assigned at promotion (F-5x/M-3x per the backlog ID rule)
**Audit score (Bar / Moat / Effort-inverse):** 2 / 2 / 2 = 6 of 9. Audit's note: "high trust yield per unit effort."
**Companion docs:** [`docs/internal/release-plans/v2.31.0/spec_zero-drift-program.md`](../../v2.31.0/spec_zero-drift-program.md) (WS-Z5, the sibling eval-industrialization lane this bet must stay distinct from) and [`docs/internal/release-plans/_unreleased/output-eval-harness.md`](../output-eval-harness.md) (the Tier 3 idea this bet supersedes with a committed design)

---

## Summary and why it wins

Convert the manual `site/src/content/docs/contributing/agentic-smoke-runbook.md`, today a human-run, per-release smoke of the orchestrator's chain-dispatch path, into a scheduled monthly CI lane that samples N individual skills, invokes each directly against a fixed synthetic scenario, and diffs the fresh output against the committed `library/skill-output-samples/` at the structure level only, sections present, contract invariants, filing a GitHub issue on regression. It also catches a failure mode nothing currently watches: sample rot, where the committed reference sample itself no longer matches what the skill's current template would produce, independent of whether the fresh output is fine.

Why it wins: the runbook, the scenarios (as existing sample Prompt blocks), and the samples all already exist; this is wiring, not invention, which is why Effort-inverse scores favorably (2 of 3) even though the payoff is a genuinely new trust signal. The audit's own tagline for it: "the library that tests itself."

## Relationship to existing plans

The load-bearing relationship is with [`v2.31.0` WS-Z5](../../v2.31.0/spec_zero-drift-program.md) (eval industrialization, closes R-16/R-17). WS-Z5 stands up the output-eval CI lane that exercises the ALREADY-AUTHORED output-eval scenarios, the M-33 rubrics, currently roughly 11 skills and 15 scenarios, growing toward completion via the staged WS-Z10. That lane answers "does this skill's designated eval fixture still score well." X-05 answers a different question: it rotates through a sample of skills, not necessarily the ones with authored eval scenarios, invokes each directly through its real dispatch surface exactly as the runbook already does for the orchestrator, and compares the fresh artifact's structure against that skill's own committed sample, catching quality regression AND sample rot. The two lanes should share scaffolding, the `workflow_dispatch` shape, the dry-run default, the monthly cadence, the M-30 structural-invariant checkers, but are not the same lane; see OQ-1 below on whether they should eventually merge.

The nearest documented ancestor is [`output-eval-harness.md`](../output-eval-harness.md)'s own Tier 3, "live-run regression: invoke a skill on labeled fixtures, score the fresh output, scheduled, never per-PR," left as a future phase there, "Tiers 2-3 remain UNRELEASED / idea." X-05 is a concrete design for that deferred tier, scoped specifically around the runbook's mechanism and around sample-rot detection; this doc supersedes that Tier-3 sketch with a committed design rather than leaving it an open question.

`agentic-smoke-runbook.md` itself already reasons through why this is a runbook and not CI today: a live run "generates real artifacts with a real model," costs tokens, and is judged against a structural rubric, not an exact string. It names the exact evolution path X-05 is: "a future advisory `workflow_dispatch` CI lane that wraps this runbook... automates this procedure rather than replacing it." X-05 generalizes that from "the orchestrator, once per release" to "a rotating sample of individual skills, monthly," and moves it from a named candidate to a scoped spec. The release-gate runbook itself is unaffected and stays a human-run gate; the two are siblings, not a replacement.

Versus the M-31 trigger-eval headless confound (`docs/internal/release-plans/v2.27.0/trigger-evals-explained.md`, "CORRECTION AND CURRENT UNDERSTANDING"): not the same mechanism and not the same risk. M-31's confound was about whether a skill FIRES from natural-language prompting in a headless session, environment-dominated, a plugin's session-start nudge, the turn budget. X-05 invokes skills directly and explicitly, mirroring how the runbook already dispatches `/chain ...` explicitly rather than relying on the model to decide to trigger anything, so it never measures triggering at all. It measures output structure given a known invocation, which sidesteps the confound by construction. Noted here so the two are not conflated in review.

No relationship to F-47 (userConfig), F-48 (project state), or X-04 (org overlay packs); noted only to confirm no overlap. The roadmap candidates F-43 through F-53 and M-25 through M-29 (`docs/internal/roadmap.md`, sections 3-5) address hooks, output styles, userConfig, context injection, marketplace distribution, and status lines, an activation and distribution layer, not a testing lane.

## Spec

### Scope in

- Extending the runbook's mechanism, marketplace install, headless `claude -p` from a scratch directory, explicit invocation, recorded result, from "the orchestrator, per release" to "a rotating sample of individual skills, monthly."
- A deterministic monthly rotation so the full catalog cycles over time.
- Scenarios sourced from each sampled skill's own existing sample Prompt block; no new scenario copy to author or maintain.
- A three-way structure diff that separates regression from rot.
- An auto-filed GitHub issue on any mismatch.

### Scope out

- An LLM-judged quality rubric; that is output-eval-harness Tier 2, a separate track.
- Per-PR execution; cost and non-determinism rule it out, per the runbook's own stated reasoning.
- Cross-model runs; that is X-06.

### Requirements

- **REQ-1.** A deterministic sampler picks N skills per scheduled run, default N equals 6, configurable, seeded by the ISO year-month so a given month always samples the same skills; over `ceil(68 / N)` months the full catalog cycles.
- **REQ-2.** Every sampled skill is invoked directly and explicitly, mirroring the runbook's `claude -p "/chain ..."` pattern generalized to a single-skill explicit instruction, never via natural-language triggering, so the lane measures output quality given invocation, not routing accuracy.
- **REQ-3.** The synthetic prompt for a sampled skill is drawn from an existing `library/skill-output-samples/<skill>/` Prompt block, chosen deterministically, for example first alphabetically. A skill with zero samples cannot be sampled and falls out of rotation, itself a finding worth surfacing.
- **REQ-4.** Three structure comparisons run per sampled skill: fresh output versus the skill's `TEMPLATE.md` section set, fresh output versus the committed sample's section set, and the committed sample versus `TEMPLATE.md`'s section set, the rot check.
- **REQ-5.** The existing M-30 Tier-1 deterministic invariant checkers, no placeholders, exact-quote sourcing, no fabricated metrics, run against the FRESH output too, not only the static committed corpus, extending their reach at no extra build cost.
- **REQ-6.** Classification: a check the fresh output fails but the committed sample passes is REGRESSION; a check the committed sample fails but the current template would require, and the fresh output passes, is ROT; both failing is BOTH; a fresh-only failure the template never required is treated as a checker false positive to be refined, not a finding.
- **REQ-7.** Cost controls: `dry_run` defaults true, plans the sample set and prints scenarios, zero model calls; N is capped, default 6, a documented hard maximum, for example 15; the model is pinned to a stated default, recommend the same Haiku-default posture as the router, overridable for a periodic cross-check, mirroring the cost note already in `.github/workflows/trigger-evals.yml`.
- **REQ-8.** A detected regression or rot files or updates exactly one GitHub issue per finding, deduplicated by a stable title key so a recurring monthly miss does not spam new issues; the lane never fails a PR or blocks a tag.
- **REQ-9.** Per the runbook's own recording rule, "a smoke run that is not written down did not happen," every scheduled run's verdict is written to a durable monthly log so the lane's own history is auditable the way the runbook's manual runs already are.

### Interfaces and contracts

Workflow shape, mirroring `.github/workflows/trigger-evals.yml`: `on: schedule` (a monthly cron) plus `workflow_dispatch` with inputs `n` (default `"6"`), `skills` (an optional override filter), `dry_run` (default true), and `model` (default `claude-haiku-4-5`).

Pure diff function sketch: `diffStructure(templateSections, sampleSections, freshSections)` returns `{ regression: [...], rot: [...], ok: boolean }`. Issue-filing contract: one title template per finding class, `self-test: regression in <skill> (<month>)` and `self-test: sample rot in <skill> (<month>)`, a fixed label pair, `self-test` plus `regression` or `rot`, and a dedup key of `<skill>:<finding-class>` so a repeat month updates rather than duplicates.

Monthly log entry sketch (REQ-9), one row appended per sampled skill per run:

```
month: 2026-08
skill: define-hypothesis
sample_used: sample_define-hypothesis_storevine_campaigns.md
model: claude-haiku-4-5
classification: ok | regression | rot | both
checks_failed: []
issue: null | "#<number>"
```

This mirrors the recording rule the runbook already follows for its own manual runs: the row exists whether the month passed or found something, so the lane's history is auditable independent of any single finding.

### Durable CI block

New script `scripts/run-agentic-dogfood.mjs` plus `scripts/run-agentic-dogfood.test.mjs`, covering the pure sampler, three-way diff, and classification functions only; the live-invocation half is inherently untestable deterministically, matching how `run-router-evals.mjs`'s pure helpers are unit-tested while its live `route()` call is not.

Registration note: this script is CI-only, never a `pre_tag` release gate, so it does not belong in `scripts/validation-manifest.yaml`'s pre-tag tiers regardless of the manifest's dual-shell-versus-Node scope question; it is simply a step in a new workflow. New workflow `.github/workflows/agentic-dogfood.yml`, `schedule` (monthly) plus `workflow_dispatch`, `dry_run` defaulting true, permissions `contents: read` plus `issues: write` for the filing step, both legs unnecessary here since the live leg targets one Claude Code CLI invocation rather than a cross-OS validator; run it on a single `ubuntu-latest` runner, matching how `trigger-evals.yml`'s live legs already run single-OS. Live leg gated on the same credential the maintainer already uses for scheduled lanes.

### Non-goals

Not a replacement for the release-gate runbook; orchestrator and runtime-component smoke stays a per-release, human-run gate. Not LLM-judged quality scoring, a separate later track. Not per-PR. Not a fix for low eval coverage: X-05 assumes samples already exist and checks their structure; it does not author new eval fixtures, which stays WS-Z5 and WS-Z10's job.

## Implementation plan

| Phase | What | Agent | Effort | Depends on |
|---|---|---|---|---|
| 1 | Extract the pure functions (sampler, three-way diff, classification) into `scripts/run-agentic-dogfood.mjs` internals plus unit tests; no live calls | agent:codex | M | none |
| 2 | Dry-run mode plus workflow scaffold, dry-run-first posture | agent:codex | S | Phase 1 |
| 3 | Live invocation leg: headless `claude -p`, explicit single-skill invocation from a scratch directory, reusing the runbook's install and preflight steps | agent:codex | M | Phase 2 |
| 4 | Issue-filing integration: dedup key, label set | agent:codex | S | Phase 3 |
| 5 | One manual dry run and one manual live run, reviewed by the maintainer before the schedule goes live | agent:human approval | S | Phase 4 |
| 6 | Enable the monthly `schedule` trigger; first live scheduled run recorded | agent:human | S | Phase 5 |
| 7 (optional fast-follow) | Merge scaffolding with v2.31.0 WS-Z5 into one workflow file, if the maintainer rules the two lanes should share a cron tick | agent:codex | S | WS-Z5 shipped |

Test and eval strategy: unit tests for the sampler, deterministic given a seed month, the three-way diff, fixture template, sample, and fresh triples covering all four classification outcomes, and the dedup key function are CI-blocking. The live-invocation leg is verified by the Phase 5 manual dry and live run pair, recorded per the runbook's own recording rule, not by a deterministic test, matching the existing boundary between what CI can prove and what a recorded run proves.

## Release surfaces touched (G2 delta)

At PARKED status: none. At promotion: `scripts/run-agentic-dogfood.mjs` plus test; `.github/workflows/agentic-dogfood.yml`; a new monthly-log records directory; a cross-link added to `agentic-smoke-runbook.md` noting the two lanes are siblings. No skill content change; no catalog count change.

## Risks and open questions

| ID | Question | Recommendation | Status |
|---|---|---|---|
| OQ-1 | Share one workflow with v2.31.0 WS-Z5, or keep separate | B, keep separate for v1 | OPEN |
| OQ-2 | Who triages a detected regression or rot | A, a human always triages | OPEN |

**OQ-1 (shared workflow).** A) share one scheduled workflow with v2.31.0 WS-Z5, same cron tick, two jobs. B) keep two separate workflow files. **Recommend B for v1**: simpler to reason about and to roll back independently; decide once WS-Z5 has shipped and its shape is known, not now.

**OQ-2 (triage).** A) a human always triages a detected regression or rot, matching the repo's advisory-first posture everywhere else. B) auto-flag the skill's version for review. **Recommend A** for v1.

Additional risks: cost creep if N or frequency grows informally over time, mitigated by REQ-7's hard maximum plus a visible monthly cost line in the recorded log. False rot classifications can occur when a template changes for an unrelated reason, for example a heading-canon normalization pass; mitigate by accepting some manual triage on rot findings, since they are advisory issues, never blocking. A skill with zero samples cannot be dogfooded, REQ-3, which quietly re-surfaces the sample-coverage gap WS-Z5 and WS-Z10 are already fixing, so X-05's effective coverage is bounded by that program's progress, not independent of it; a one-time audit of which skills currently lack any sample at all is worth running before Phase 1, so the rotation's true denominator is known before the first run is scheduled.

## Promotion trigger and path

The trigger is two-part: the runbook's mechanism is stable, no pending changes to its install, scratch-directory, or checkpoint procedure, and v2.31.0 WS-Z5's output-eval lane has shipped and stabilized for at least one cycle, so the maintainer can rule on OQ-1 with WS-Z5's real shape in hand rather than guessing at it.

Once triggered, a GitHub issue opens and becomes an effort brief; given the CI-tooling and eval-adjacent shape of this bet, an M-series ID is the better fit by precedent, in the lineage of M-30 through M-34, though the case is not as clean as pure infrastructure since the bet also touches the runbook's documented procedure. Confirm the free number and the right series against the GitHub issue list and `backlog-canonical.md` at filing time, per the backlog's ID rule. Promote this file into a full release-plan bundle at that point; add the cross-link to `agentic-smoke-runbook.md` the day this ships, not before.
