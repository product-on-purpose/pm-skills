# X-06 Model portability matrix: honest cross-runtime evidence (unreleased spec + implementation plan)

**Status:** PARKED (pre-decision; not committed scope)
**Owner:** Maintainers
**Created:** 2026-07-03
**Provenance:** the 2026-07-04 deep audit (maintainer-local, gitignored), section 6b/6c, bet X-6 (a model-portability report)
**Candidate formal ID:** to be assigned at promotion (F-5x/M-3x per the backlog ID rule)
**Audit score (Bar / Moat / Effort-inverse):** 1 / 2 / 2 = 5 of 9. Audit's note: "after X-1 exists."
**Companion docs:** [`docs/internal/release-plans/v2.29.0/spec_sub-agent-router.md`](../../v2.29.0/spec_sub-agent-router.md) (M-34, the `routeQuery` interface this bet extends with provider adapters) and [`docs/internal/release-plans/v2.31.0/spec_zero-drift-program.md`](../../v2.31.0/spec_zero-drift-program.md) (WS-Z5, the coverage prerequisite this bet is sequenced behind)

---

## Summary and why it wins

Run the router-eval and output-eval-invariant harnesses across the Claude, GPT, and Gemini runtimes, and publish a per-model support matrix, with a methodology section that states, up front, that absolute numbers are environment-dominated. This is not a hedge added for comfort: it is the same lesson pm-skills already learned the hard way about its own headless trigger-eval harness, and citing it in substance is what makes the published matrix credible rather than a marketing table a competitor can dismiss on inspection. Every competitor in the field claims "works with everything"; nobody shows evidence. Showing modest evidence with honest caveats is differentiated precisely because it is rare.

Why it wins less strongly than the other bets in this batch: Bar 1, portability completeness is a real but partial-credit axis in the audit's own scorecard, Moat 2, medium, since the underlying router and eval mechanism is Claude-native and building the adapters is the real, copyable work. The audit sequences this explicitly "after X-1 exists" (PM-Bench publication), because X-06 is meant to reuse X-1's packaged benchmark rather than build a bespoke comparison harness from scratch.

## Relationship to existing plans

The `pm-skill-router` sub-agent, M-34, shipped v2.29.0, is Claude-only by construction: it dispatches a Claude Code sub-agent, and there is no equivalent inside a Claude Code session for GPT or Gemini. X-06 cannot reuse that engine for the non-Claude legs. It must instead extend the OTHER engine, `run-router-evals.mjs`'s Messages-API `route(system, names, q, {key, model})`, already model-parameterized for Claude tiers, with new provider adapters behind the same `routeQuery` interface the M-34 spec defines. This is additive to that interface, not a rebuild of it.

The load-bearing sequencing relationship is with [`v2.31.0` WS-Z5](../../v2.31.0/spec_zero-drift-program.md) (eval industrialization). WS-Z5 grows the Claude-side coverage story, trigger coverage from roughly 46 percent toward roughly 65 percent, then toward completion via the staged WS-Z10, and stands up the output-eval CI lane. X-06 is deliberately sequenced AFTER that program has meaningful breadth: comparing three runtimes against a thin, still-growing fixture set would produce a matrix that looks precise while resting on a small, shifting base, the opposite of the honesty this bet is supposed to sell. X-06 is a consumer of WS-Z5's fixtures and invariants, not a competing lane.

Versus X-1 (PM-Bench, publish the benchmark not just the results) and X-9 (the validator toolchain as a product), both sibling audit bets: the audit's own sequencing, "after X-1 exists," is adopted verbatim. X-06 shares the router-eval and output-eval-invariant machinery X-1 would package; if X-1 ships first, X-06 becomes "run the published benchmark against three runtimes" rather than building a bespoke harness, materially smaller. This spec covers X-06 as a standalone bet for the case where X-1 has not yet shipped when X-06 is triggered; if X-1 has shipped by then, re-scope X-06 to consume it instead of following this document literally.

Neither v2.30.0 nor v2.31.0 names a cross-model evidence workstream generally; there is no scope overlap beyond the shared eval machinery already noted. The roadmap candidates F-43 through F-53 and M-25 through M-29 (`docs/internal/roadmap.md`, sections 3-5) likewise do not overlap: they are activation, customization, and distribution moves, not a cross-runtime evidence exercise. No relationship to X-04 (org overlay packs) or X-05 (self-testing library); noted only to confirm no overlap.

Credibility anchor, stated once for the whole bet: `docs/internal/release-plans/v2.27.0/trigger-evals-explained.md`'s "CORRECTION AND CURRENT UNDERSTANDING" section is the internal, working proof that this project already learned that a headless or agentic harness measures its environment as much as it measures the model being tested. Every published number on the X-06 matrix must carry that lesson in substance, restated in the page's own words for a public audience, not necessarily citing the internal file.

## Spec

### Scope in

- Provider adapters for Claude plus at least one of GPT or Gemini in v1; both is a stretch goal, not a blocking requirement.
- A published per-model support matrix, a site page, with a runtime column and rows per capability axis: trigger recall and precision, output-invariant pass rate, collision behavior.
- A methodology section on the SAME page stating the confound lesson and the exact capture conditions.
- Short per-runtime guidance blocks added to the existing per-client docs.

### Scope out

- Per-model skill content forks, an explicit non-goal, restated below.
- Any claim of parity between runtimes.
- A scheduled or continuous cross-model run in v1; this is a periodic, manually triggered evidence exercise, re-run only when a runtime's underlying model materially changes.

### Requirements

- **REQ-1.** Extend `routeQuery(query, catalog, opts)` with a `provider` option, `claude`, `openai`, or `gemini`; each non-Claude provider is a new adapter module matching the existing Messages-API `route()`'s input and output shape, so the pure verdict functions, `majority`, `collisionVerdict`, and the rest, are reused unchanged across providers.
- **REQ-2.** Confirm, with one cross-provider test per checker, that the M-30 Tier-1 structural invariant checkers, no placeholders, exact-quote sourcing, no fabricated metrics, are provider-agnostic, since they operate on output text only. This is a verification requirement, not a rewrite.
- **REQ-3.** Reuse the existing committed trigger fixtures and a stated subset of output-eval scenarios rather than authoring a new per-provider scenario corpus, so all three runtimes answer the exact same questions; stamp the scenario-set version on the published page.
- **REQ-4.** Stamp every published number with the exact model identifier and capture date for all three providers; state plainly that a re-run after any provider's model update invalidates the prior row rather than silently overwriting it.
- **REQ-5.** A provider leg with no configured credential is skipped and shown as "not run," never silently omitted and never presented as a failure.
- **REQ-6.** Write and review the methodology section BEFORE capturing the first cross-provider numbers, so the honesty framing cannot be softened once real numbers exist and look better or worse than expected.
- **REQ-7.** Any actionable per-runtime difference becomes a short guidance note in the existing per-client docs, for example `getting-started/platforms.md`, never a duplicated or forked skill file.
- **REQ-8.** Re-running the matrix is a manual `workflow_dispatch`, never a `schedule`, because three vendors update models on independent, unpredictable timelines; the page's capture date is the freshness signal a reader relies on.

### Interfaces and contracts

`routeQuery(query, catalog, { provider: "claude" | "openai" | "gemini", model, key })` returns `{ skill: <name> | "none" }`. Every adapter implements only this input and output shape; `majority()` and the verdict functions never need to know which provider answered.

Published matrix sketch, one page, methodology above the table:

| Capability | Claude | GPT | Gemini |
|---|---|---|---|
| Trigger recall / precision | captured, dated | captured, dated, or "not run" | captured, dated, or "not run" |
| Output-invariant pass rate | captured, dated | captured, dated, or "not run" | captured, dated, or "not run" |
| Collision behavior (no false-fire) | captured, dated | captured, dated, or "not run" | captured, dated, or "not run" |

Each cell is either a captured figure or "not run," and links to its capture date and exact model identifier per REQ-4; a runtime with no configured credential shows "not run" across its whole column, never a blank or a zero.

### Durable CI block

Deliberately the thinnest footprint of the three documents in this batch, because the mechanism is a manually triggered, credential-gated evidence run, not a gate. New script `scripts/run-portability-matrix.mjs` plus `scripts/run-portability-matrix.test.mjs`, covering only the pure aggregation and formatting functions, mirroring how `run-router-evals.mjs`'s pure helpers are tested while its live call is not.

A `workflow_dispatch`-only workflow, `portability-matrix.yml`, no `schedule` trigger per REQ-8, `dry_run` defaulting true, each provider leg gated on its own optional secret via a job-level `if:`, permissions `contents: read`, running on a single `ubuntu-latest` runner since there is no cross-shell behavior to prove here, matching how `trigger-evals.yml`'s own live legs already run single-OS. Registration in `scripts/validation-manifest.yaml` is optional and, per that file's own stated scope, out of its remit regardless, since this is neither a dual-shell validator nor a `pre_tag` gate; register it only if the maintainer wants the parity referee to track that the script exists.

### Non-goals

No per-model skill forks, ever: a runtime difference is documented, not forked around. No claim that pm-skills is validated for production use on non-Claude runtimes beyond what the published methodology actually supports. No new sub-agent for non-Claude providers: `pm-skill-router` stays Claude-only, and the adapters are plain API calls, not agents. No automatic re-scoring on every provider model update: staleness is disclosed per REQ-4, not chased.

## Implementation plan

| Phase | What | Agent | Effort | Depends on |
|---|---|---|---|---|
| 1 | Draft and review the methodology section first, before any adapter code | agent:claude draft, agent:human review | S | none |
| 2 | First non-Claude adapter, maintainer's choice of GPT or Gemini, behind `routeQuery`; shape-only unit tests, no live calls in tests | agent:codex | M | Phase 1 |
| 3 | One manual cross-provider run over the existing fixture subset; results captured with full model and date stamps | agent:human triggers, agent:codex harness | M | Phase 2 |
| 4 | Publish the matrix page; cross-link from `getting-started/platforms.md` | agent:claude | S | Phase 3 |
| 5 | Second provider adapter, same pattern | agent:codex | M | Phase 2 |
| 6 | Guidance-block pass: any actionable per-runtime finding becomes a short docs note | agent:claude | S | Phase 4 |
| 7 (stretch, later) | Re-run on a materially new model version from any provider; append a dated row rather than overwriting | agent:human | S | ongoing |

Test and eval strategy: unit tests for each provider adapter's request and response shape, mocked, no live calls, matching how the existing Messages-API engine is tested, and for the aggregation and formatting functions that build the published table, are CI-blocking. The actual cross-provider numbers are verified by the recorded manual run, Phase 3, not by CI, matching the runbook's own recording-rule precedent.

## Release surfaces touched (G2 delta)

At PARKED status: none. At promotion: `scripts/run-portability-matrix.mjs` plus test; a manual-dispatch-only workflow; a new site page, the matrix with methodology; a cross-link from `getting-started/platforms.md`. No skill content change, no catalog count change, no new sub-agent.

## Risks and open questions

| ID | Question | Recommendation | Status |
|---|---|---|---|
| OQ-1 | Which non-Claude provider to build first | B, defer to real demand | OPEN |
| OQ-2 | Evergreen page vs. dated report series | A, one evergreen page | OPEN |

**OQ-1 (provider order).** A) build the GPT adapter first. B) build the Gemini adapter first. **Recommend deferring** to whichever a real user or the maintainer asks about first, rather than guessing demand.

**OQ-2 (publication shape).** A) an evergreen matrix page updated in place with a dated changelog at the bottom. B) a series of dated report files. **Recommend A**: it avoids report-file proliferation and keeps one canonical URL.

Additional risks: a provider's API shape can change and silently break an adapter, mitigated by the shape-only adapter unit tests running in normal CI even though the live leg is manual, so a shape break surfaces long before the next manual run. The published matrix can read as a competitive claim, "pm-skills works best on Claude," when the honest read may just be that the harness was built for Claude first and the other adapters are less battle-tested; mitigate by stating that asymmetry explicitly in the methodology section per REQ-6, not softening it. Cost and credential management for two extra provider API keys, held by a solo maintainer, is mitigated by REQ-5's skip-if-absent behavior, so a missing credential never blocks anything else. Whether X-06 should wait for X-1 to formally ship, or whether "the harness is reusable in substance" is enough to proceed independently, stays an open call, recommend waiting per the audit's own sequencing note, revisited at promotion time.

## Promotion trigger and path

The trigger is two-part: v2.31.0 WS-Z5 has shipped and Claude-side trigger coverage has crossed a meaningful threshold, the wave-1 roughly 65 percent target, trending toward R-21 and WS-Z10 completion, and ideally X-1 (PM-Bench publication) exists so X-06 can consume its packaged harness rather than building a bespoke one. If X-1 has not shipped by the time portability becomes a real question, for example a user asks, X-06 may proceed standalone per this spec.

Once triggered, a GitHub issue opens and becomes an effort brief; given the eval-tooling shape of this bet, an M-series ID is the better fit by precedent, in the lineage of M-30 through M-34. Confirm the free number against the GitHub issue list and `backlog-canonical.md` at filing time, per the backlog's ID rule. Promote this file into a full release-plan bundle at that point; the site matrix page ships as part of that release's surfaces, not before.
