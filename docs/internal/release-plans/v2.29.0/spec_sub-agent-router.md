# Spec: key-free sub-agent router engine (M-34) - DRAFT for review

Companion to [`plan_v2.29.0.md`](plan_v2.29.0.md) + [`implementation-plan_sub-agent-router.md`](implementation-plan_sub-agent-router.md). Replaces the `ANTHROPIC_API_KEY` dependency of the live router probe with a Claude Code sub-agent that runs on the subscription. This **implements an already-decided-but-unbuilt** engine: `trigger-evals-explained.md` (v2.27.0) line 65 records "a workflow of subagents - runs on the subscription (no API key)" and the impl-plan line 30 says the eval "runs on the subscription via subagents with no API key" - neither was built; the code still calls the Messages API.

## Problem

The live router probe is the instrument behind two things: the **new-skill collision gate** (`check-new-skill-collision.mjs`) and the **trigger router-eval** (`run-router-evals.mjs`). Its `route()` function calls the Anthropic Messages API directly (`run-router-evals.mjs:115-119` `fetch('https://api.anthropic.com/v1/messages', { headers: { 'x-api-key': key }})`; `:169` reads `process.env.ANTHROPIC_API_KEY` and hard-exits if unset). The only no-key path is `--dry-run` (plans the probe, makes zero calls).

Consequence: the gate cannot run in a normal subscription Claude Code session (no key) - only in the cost-gated `trigger-evals.yml` `workflow_dispatch` lane with the secret. During the F-56 build this bit: the build-time disambiguation could not run the official probe, so a Haiku sub-agent dispatched in-session reproduced it (10/10 recall, 8/8 precision). That ad-hoc workaround is the thing this spec makes a first-class, named, reusable instrument.

## Current architecture (verified 2026-06-22)

- `run-router-evals.mjs`: `route(system, names, q, {key, model})` is the engine (Messages API, key). The helpers `majority`, `buildCatalog`, `systemPrompt`, `mapPool`, `CALIBRATION` are **engine-agnostic** (no key).
- `check-new-skill-collision.mjs`: imports `route` + the helpers; its verdict logic `derivePartners` / `collisionTasks` / `collisionVerdict` is **pure and key-free** (only `route()` touches the API).
- Invocation: `trigger-evals.yml` (`workflow_dispatch` ONLY, key-gated); a **manual checklist item** in `utility-pm-skill-builder` (`SKILL.md:372`, not an executed gate); not referenced by `utility-pm-skill-validate`; no command.

So the engine is a thin, swappable layer: only `route()` needs replacing.

## What it produces / the design

1. **A new sub-agent `pm-skill-router`** (`agents/pm-skill-router.md`). The router instrument: given the catalog (each skill's `name` + `description`, read from `skill-manifest.json`) and one user query, it returns the single skill that would fire, or `none`. It judges by description match only, with no design-intent or repo context. Model: **Haiku by default** (Decision D-MODEL). Naming follows the `pm-*` agent convention.
2. **An engine interface.** Introduce `routeQuery(query, catalog, opts)` with two implementations behind it: (a) **sub-agent** (default; dispatches `pm-skill-router`; no key; runs in a Claude Code session or a Workflow), (b) **Messages API** (the existing `route()`; retained for unattended CI). The shared `majority` + the pure verdict functions are unchanged, so a baseline produced by either engine is comparable when the model tier matches.
3. **Orchestration for the collision gate, key-free.** A documented in-session / Workflow procedure that loads the fixtures, computes the probe tasks via the existing pure functions (`derivePartners` -> `collisionTasks`), dispatches `pm-skill-router` per task x `runs` (majority), then applies `collisionVerdict` and reports recall / no-theft / precision / back-recall - the identical verdict logic, key-free.
4. **Wire the contributor path.** `utility-pm-skill-builder`'s collision-probe checklist item points to the key-free sub-agent procedure (was: "run `check-new-skill-collision.mjs`").

## Decisions

| # | Decision | Rationale |
|---|---|---|
| D-NAME | New agent `pm-skill-router` | No router agent exists; `pm-*` convention; distinct from `pm-workflow-orchestrator` (which walks a pre-named sequence, it does not select from intent) |
| D-MODEL | `pm-skill-router` defaults to **Haiku** (`claude-haiku-4-5` tier); model overridable | A collision gate wants the **weakest reasonable router**: it catches the ambiguity a low-cost client would hit. Opus is the strongest disambiguator, so it is lenient and **falsely reassuring**; Sonnet is an optional realistic-production cross-check. Haiku is also the tier of the recorded baselines, so runs compare like-for-like |
| D-ENGINE | **Dual engine**, one interface: sub-agent default (no key, in-session / Workflow); Messages API retained for the unattended CI lane | The `workflow_dispatch` CI runner has **no Claude Code session** to dispatch a sub-agent from, so a fully unattended CI run still needs either the API path or headless `claude -p` (which the memory flags as confounded). Dual-engine removes the key for the common case (a maintainer running the gate in-session) without breaking unattended CI |
| D-SCOPE | v2.29.0 ships the agent + the engine interface + the in-session orchestration + the doc/count updates. A headless-`claude -p` CI automation of the sub-agent path is a **candidate**, not committed | Headless `claude -p` firing is environment-dominated (memory `project_trigger-eval-headless-confound`); proving it in CI is its own effort |

## Impact set (what changes)

- **New:** `agents/pm-skill-router.md` + its registration (sub-agent count 5 -> 6; `agents/_chain-permitted.yaml` if it participates in chains).
- **Refactor:** `run-router-evals.mjs` exposes the `routeQuery` interface (sub-agent + API impls); pure helpers unchanged. `check-new-skill-collision.mjs` gains an `--engine=subagent|api` selector (default behavior documented).
- **Contributor path:** `utility-pm-skill-builder` checklist item -> the key-free procedure (a patch bump + HISTORY on that skill).
- **Docs to update (mark the decision implemented):** `trigger-evals-explained.md`, `implementation-plan_trigger-accuracy-evals.md`, `spec_trigger-accuracy-evals.md` (sections 4-5), `docs/internal/efforts/M-31-trigger-accuracy-evals.md`. The shipped `Release_v2.27.0.md` is historical - annotate, do not rewrite.
- **Count surfaces:** sub-agent count `5 -> 6` wherever it is stated (README, AGENTS.md, site, CONTEXT, manifests). This rides the v2.29.0 count sweep.

## Acceptance (proposed)

- [ ] `agents/pm-skill-router.md` exists, is dispatchable, and routes a query to exactly one catalog skill (or `none`) using `skill-manifest.json`; Haiku default documented.
- [ ] The collision probe runs **key-free in a session** via the sub-agent and reproduces the four verdict classes (recall / no-theft / precision / back-recall) using the unchanged pure functions; a recorded key-free re-run of the F-56 probe matches its `--dry-run` task plan (48 probe + 6 calibration) and yields the same GO.
- [ ] The Messages-API engine still works (dual-engine; the `trigger-evals.yml` lane is unchanged or explicitly flagged).
- [ ] `utility-pm-skill-builder`'s collision-probe checklist points to the key-free procedure (version bump + HISTORY).
- [ ] The four internal arch docs are updated to mark the engine decision implemented; `Release_v2.27.0.md` annotated, not rewritten.
- [ ] Sub-agent count `5 -> 6` swept across all surfaces (rides the v2.29.0 sweep + the grep backstop).
- [ ] Pure-function unit tests still pass; a key-free run is recorded in the v2.29.0 release record.

## Open questions

- Orchestration vehicle for v1: a documented in-session procedure (lightest) vs a `Workflow` script vs a new `utility-*` skill/command. Recommendation: documented procedure + the agent for v1; a Workflow wrapper as a fast-follow.
- Whether to automate the sub-agent path in CI via headless `claude -p` (D-SCOPE candidate) or leave the unattended lane on the API path.
- Whether to retire the Messages-API path entirely once a CI sub-agent path is proven (a later major; not now).
