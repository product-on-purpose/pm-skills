# Implementation Plan: key-free sub-agent router engine (M-34) - DRAFT

Companion to [`plan_v2.29.0.md`](plan_v2.29.0.md) + [`spec_sub-agent-router.md`](spec_sub-agent-router.md). Task order. Agent: claude (agent authoring + orchestration) with codex assists on the `run-router-evals.mjs` refactor. Built on the v2.29.0 branch.

The engine is a thin, swappable layer (only `route()` touches the API; the verdict logic is already pure), so this is mostly additive: a new agent + an interface seam + doc/count updates. No change to the recall/precision/no-theft/back-recall logic.

## Task order

**T1 - Author `agents/pm-skill-router.md`.**
- Frontmatter `name: pm-skill-router` + the `pm-*` description convention. System prompt: act as a skill router; read `skill-manifest.json`; given one query, return the single best-matching skill by `description` (or `none`); judge by description match only, no design intent, weigh all skills equally; output a compact table. Document the Haiku default (D-MODEL) and that the orchestrator may override the model.
- Register: add to any agent index; update `agents/_chain-permitted.yaml` only if it participates in a chain (the probe orchestration dispatches it directly, so likely not).
- Validate: the agent is dispatchable and routes a sample query correctly.

**T2 - Seam the engine in `run-router-evals.mjs`.**
- Extract a `routeQuery(query, catalog, opts)` interface; keep `route()` (Messages API) as the `api` implementation; add a `subagent` implementation contract (the dispatch itself happens in the session/Workflow, so the `.mjs` exposes the task list + a `--emit-tasks` JSON mode for a session to consume, and keeps `majority` + the pure verdict functions exported). Pure helpers and unit tests unchanged.
- `check-new-skill-collision.mjs`: add `--engine=subagent|api` (default documented); when `subagent`, it prints the computed `collisionTasks` (via the pure functions) for the session/Workflow to drive, and accepts scored results to apply `collisionVerdict`. The Messages-API path is unchanged.
- Validate: `node --test run-router-evals.test.mjs` + `check-new-skill-collision.test.mjs` green (pure logic untouched).

**T3 - Document + record the key-free orchestration.**
- A short procedure (in the agent doc or a `references/`): load `skills/<skill>/evals/trigger-fixtures.json` -> `--emit-tasks` -> dispatch `pm-skill-router` per task x `runs` (majority) -> feed scores back -> `collisionVerdict` -> report.
- Re-run the **F-56 collision probe key-free** via this procedure and record it in the v2.29.0 release record (must match the `--dry-run` plan: 48 probe + 6 calibration; expect the same GO: 10/10 recall, 8/8 precision).
- Optional fast-follow: a `Workflow` script that fans out the router sub-agent (cite, do not build in v1 unless cheap).

**T4 - Wire the contributor path.**
- `utility-pm-skill-builder`: change the collision-probe checklist item from "run `check-new-skill-collision.mjs`" to the key-free `pm-skill-router` procedure (API path noted as the unattended-CI alternative). Patch bump + HISTORY on `utility-pm-skill-builder`.

**T5 - Update the architecture docs.**
- Mark the engine decision implemented in: `trigger-evals-explained.md` (the subagent path is now built, not a "decide later"), `implementation-plan_trigger-accuracy-evals.md`, `spec_trigger-accuracy-evals.md` (sections 4-5), `docs/internal/efforts/M-31-trigger-accuracy-evals.md`. Annotate (do not rewrite) the shipped `site/.../Release_v2.27.0.md`.

**T6 - Sub-agent count sweep (5 -> 6).**
- Update the sub-agent count everywhere it is stated (README, AGENTS.md, site `index.mdx` / `reference/*`, CONTEXT, the 3 plugin manifests if they state it). Rides the v2.29.0 count sweep + the grep backstop (`grep -rn "\b5 sub-agent" ...`). NOTE: this is a distinct count axis from the 67->68 skill sweep.

**T7 - Validate + record.**
- Pure-function tests green; a key-free probe run recorded; the API path still runnable (`--dry-run` plan unchanged).

## Files

- New: `agents/pm-skill-router.md`
- Edit: `scripts/run-router-evals.mjs` (+ test), `scripts/check-new-skill-collision.mjs` (+ test), `skills/utility-pm-skill-builder/SKILL.md` + `HISTORY.md`
- Docs: `trigger-evals-explained.md`, `implementation-plan_/spec_trigger-accuracy-evals.md`, `M-31-trigger-accuracy-evals.md`; annotate `Release_v2.27.0.md`
- Count surfaces (sub-agent 5 -> 6): README.md, AGENTS.md, site pages, CONTEXT, manifests (rides the v2.29.0 sweep)
- Record: `docs/internal/release-plans/v2.29.0/records/` (the key-free probe run)

## Dependencies

- Independent of F-56's skill build, but shares the v2.29.0 count sweep (skill 67->68 AND sub-agent 5->6 land together).
- Relies on the already-pure verdict logic; no change to the eval methodology, only the engine.
