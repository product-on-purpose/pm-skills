# Repo Hygiene Baseline Plan

Date: 2026-03-15
Status: Decision-complete baseline
Scope: `pm-skills` repo hygiene and operating-model cleanup only

## How To Review This

Read this in order:

1. `Executive Recommendation`
2. `Decision Closure Summary`
3. `Current-State Findings`
4. `Recommended Baseline`
5. `Artifact Placement Rules`
6. `Prioritized Action Plan`

This version replaces the earlier open-question worksheet. The owner decisions are now closed in substance, and this document is intended to be the stable baseline reference for execution.

## Executive Recommendation

Adopt one narrow, repo-native baseline:

1. Keep the public shipped surface authoritative:
   `README.md`, `AGENTS.md`, `CHANGELOG.md`, `QUICKSTART.md`, `skills/**`, `commands/**`, `_bundles/**`, `docs/guides/**`, `docs/reference/**`, `docs/templates/**`, `docs/releases/**`, `library/skill-output-samples/**`, `scripts/**`, `.claude-plugin/plugin.json`, and `.claude/pm-skills-for-claude.md`.
2. Keep the internal operating surface narrow:
   `CLAUDE.md`, `AGENTS/DECISIONS.md`, `AGENTS/claude/{CONTEXT.md,DECISIONS.md}`, `AGENTS/codex/{CONTEXT.md,DECISIONS.md,README.md}`, `docs/internal/planning-persistence-policy.md`, `docs/internal/planning-artifact-tier-map.md`, `docs/internal/release-plans/**`, and `docs/internal/efforts/**`.
3. Use GitHub issues for backlog and lifecycle state.
4. Use `docs/internal/efforts/<effort-id>-<slug>.md` for durable tracked effort context.
5. Use `_NOTES/**` for local research, prep, drafts, and working scratch only.
6. Use `docs/internal/release-plans/vX.Y.Z/**` as the single tracked home for internal release governance.
7. Keep only intentionally shipped Claude-facing artifacts tracked: `.claude-plugin/plugin.json` and `.claude/pm-skills-for-claude.md`.
8. Refresh tracked continuity and authoring docs before touching `wrap-session` or adding more guardrail automation.

This is cleanup, not a new framework. The repo already has the right major surfaces. The work now is to remove contradictory guidance and make the tracked baseline reliable.

## Decision Closure Summary

| Area | Resolution |
| --- | --- |
| OQ1 | Keep `.claude-plugin/plugin.json` and `.claude/pm-skills-for-claude.md`; do not treat broader `.claude/**` helper content as baseline truth. |
| OQ2 | Use GitHub issues for backlog state, `docs/internal/efforts/**` for durable effort briefs, `_NOTES/efforts/**` for local working material, and `docs/internal/release-plans/**` for release governance. |
| OQ3 | Keep both `AGENTS/claude/` and `AGENTS/codex/` first-class. Do not add a central `AGENTS/CONTEXT.md`. |
| OQ4 | Rewrite public, policy, and active internal docs that still shape current work. Do not turn this into archive cleanup. |
| OQ5 | Keep the baseline plan stable and move execution detail into separate execution docs plus a thin shared coordinator. |

## Current-State Findings

### 1. Active policy docs still describe the wrong canonical homes

Active tracked policy files still teach the older split model:

- `docs/internal/planning-persistence-policy.md`
- `docs/internal/planning-artifact-tier-map.md`
- `docs/internal/backlog-canonical.md`
- `docs/internal/release-planning/README.md`
- `docs/internal/delivery-plan/README.md`

Why this matters:

- the repo still points tracked readers to `_NOTES/**` for canonical backlog truth
- release governance is still described as split across `release-planning` and `delivery-plan`
- the accepted `docs/internal/efforts/**` plus `docs/internal/release-plans/**` model is not yet reflected in tracked policy

### 2. Internal release governance is still split across two tracked trees

Live tracked structure still centers on:

- `docs/internal/release-planning/**`
- `docs/internal/delivery-plan/**`

and does not yet have a versioned `docs/internal/release-plans/**` home.

Why this matters:

- current internal release artifacts are harder to locate than they should be
- active docs still need to explain two tracked homes plus `_NOTES/delivery-plan/**`
- effort briefs and release-facing internal docs cannot point to one obvious canonical release-governance path yet

### 3. Durable effort context has a foothold, but not a normalized operating model

Evidence:

- `docs/internal/efforts/M-10-skill-sample-outputs-library.md`
- `docs/internal/backlog-canonical.md`
- `_NOTES/efforts/**`

Why this matters:

- the repo already has the right tracked foothold, but policy has not normalized it
- `docs/internal/backlog-canonical.md` still treats a gitignored `_NOTES/**` file as canonical
- active effort docs still mix tracked links, `_NOTES` links, and old `release-planning` links

### 4. Codex continuity and shared decision capture are still stale

Evidence:

- `AGENTS/codex/CONTEXT.md`
- `AGENTS/DECISIONS.md`
- `AGENTS/claude/DECISIONS.md`

Why this matters:

- `AGENTS/codex/CONTEXT.md` still reports a `v2.4.3` baseline and references deleted `.claude/settings.json`
- `AGENTS/DECISIONS.md` is still too thin relative to the actual cross-agent decisions already present in tracked files
- adding context-currency automation before the Codex context is current would harden drift instead of reducing it

### 5. Contributor and reference docs still teach pre-v2.5 schema or inventory

Evidence:

- `docs/reference/frontmatter-schema.yaml`
- `docs/guides/authoring-pm-skills.md`
- `docs/agent-skill-anatomy.md`
- `docs/reference/project-structure.md`
- `docs/reference/ecosystem.md`
- `docs/guides/mcp-integration.md`
- `docs/guides/using-skills.md`
- `QUICKSTART.md`
- `README.md`

Why this matters:

- some docs still teach `metadata.version` as canonical even though the repo now uses root `version`
- `classification` guidance is still incomplete or missing
- several docs still say `24 skills`, `25 commands`, or advertise non-existent helper surfaces such as `/common`, `/update-doc`, and `/link-docs`

### 6. A few active tracked docs still carry stale release-truth or `_NOTES` references

Evidence:

- `.claude-plugin/plugin.json`
- `docs/releases/Release_v2.6.1.md`
- `library/skill-output-samples/SAMPLE_CREATION.md`
- `docs/internal/efforts/M-10-skill-sample-outputs-library.md`

Why this matters:

- `git tag` shows both `v2.6.0` and `v2.6.1`, but `.claude-plugin/plugin.json` is still `2.6.0`
- `docs/releases/Release_v2.6.1.md` still reads like a pre-publish artifact even though the `v2.6.1` tag exists
- `SAMPLE_CREATION.md` and the `M-10` brief still point to `_NOTES/**` or old release-governance paths instead of the intended tracked homes

## Recommended Baseline

### Public Shipped Surface

These define the user-facing product surface:

- `README.md`
- `AGENTS.md`
- `CHANGELOG.md`
- `QUICKSTART.md`
- `skills/**`
- `commands/**`
- `_bundles/**`
- `docs/guides/**`
- `docs/reference/**`
- `docs/templates/**`
- `docs/releases/**`
- `library/skill-output-samples/**`
- `scripts/**`
- `.claude-plugin/plugin.json`
- `.claude/pm-skills-for-claude.md`

### Internal Operating Surface

These define the day-to-day tracked operating model after cleanup:

- `CLAUDE.md`
- `AGENTS/DECISIONS.md`
- `AGENTS/claude/CONTEXT.md`
- `AGENTS/claude/DECISIONS.md`
- `AGENTS/codex/CONTEXT.md`
- `AGENTS/codex/DECISIONS.md`
- `AGENTS/codex/README.md`
- `docs/internal/planning-persistence-policy.md`
- `docs/internal/planning-artifact-tier-map.md`
- `docs/internal/release-plans/**`
- `docs/internal/efforts/**`

### Legacy Tracked But Not Baseline

These may remain tracked as history, but they should stop defining current operations:

- `docs/internal/backlog-canonical.md` once rewritten as a short policy/index note
- `docs/internal/release-planning/**`
- `docs/internal/delivery-plan/**`
- long-form historical docs such as `docs/internal/Releases_2.3-2.4_detailed-breakdown.md`

### Local Working Space Only

These remain useful, but they are not canonical:

- `_NOTES/**`
- `AGENTS/*/SESSION-LOG/**`
- `AGENTS/*/PLANNING/**`
- `AGENTS/*/TODO.md`
- `.claude/**` except `.claude/pm-skills-for-claude.md`

## Artifact Placement Rules

| Artifact | Tracked home | Use it for | Do not use it for |
| --- | --- | --- | --- |
| Backlog state | GitHub issues | open/closed state, priority, milestone, queue | durable specs, large research dumps |
| Durable effort brief | `docs/internal/efforts/<effort-id>-<slug>.md` | stable scope, key decisions, issue links, canonical artifact links | raw research, daily notes, exploratory drafts |
| Local working material | `_NOTES/efforts/<effort-id>/**` | research, prep, rough drafts, scratch output | canonical source of truth |
| Internal release governance | `docs/internal/release-plans/vX.Y.Z/**` | release checklists, blocker decisions, cut/publish notes, closure records | feature specs or general backlog state |
| Public release communication | `docs/releases/Release_vX.Y.Z.md` | user-facing release notes | internal governance detail |
| Shared agent decisions | `AGENTS/DECISIONS.md` | cross-agent rules and accepted operating decisions | long rationale or agent-local detail |
| Agent-specific continuity | `AGENTS/*/CONTEXT.md`, `AGENTS/*/DECISIONS.md` | current state and agent-local durable decisions | full project history or local scratch |

### Promotion Rule

Promote content out of `_NOTES/**` only when both are true:

1. the content is stable enough that future collaborators should cite it later
2. collaborators without access to your local workspace would still need it

Promotion targets should be:

- `docs/internal/efforts/**`
- `docs/internal/release-plans/**`
- `AGENTS/*/DECISIONS.md`
- `AGENTS/DECISIONS.md`

Hard rules:

- no tracked file should call a `_NOTES/**` path canonical
- tracked docs should hold durable context; backlog state should live in GitHub issues
- do not create a second tracked feature-planning tree alongside `docs/internal/efforts/**`

## Foundational Skills And Commands

### Update First

1. Refresh tracked continuity before wrapper logic:
   - `AGENTS/codex/CONTEXT.md`
   - `AGENTS/DECISIONS.md`
2. Refresh contributor instructions before adding more automation:
   - `docs/reference/frontmatter-schema.yaml`
   - `docs/guides/authoring-pm-skills.md`
   - `docs/agent-skill-anatomy.md`
   - `docs/templates/skill-template/SKILL.md`

Why first:

- these files define what future agents and contributors will believe about the repo
- guardrail scripts and wrap-session changes are only useful after the tracked baseline is correct

### Defer For Later

1. `wrap-session` refinement
2. broader `init-project` cleanup
3. any new wrapper commands or speculative helper surfaces

Why defer:

- the baseline can be cleaned without changing those workflows now
- the user already identified wrap-session as a later focused effort
- adding or revising wrapper surfaces before the tracked baseline is stable would lock in the wrong model

## Prioritized Action Plan

| Seq | Outcome | Primary files | Exit condition |
| --- | --- | --- | --- |
| 1 | Rewrite active policy docs to reflect the accepted canonical homes | `docs/internal/planning-persistence-policy.md`, `docs/internal/planning-artifact-tier-map.md` | tracked policy no longer names `_NOTES/**`, `release-planning/**`, or `delivery-plan/**` as canonical |
| 2 | Consolidate internal release governance and effort-policy entry points | create `docs/internal/release-plans/**`; add `docs/internal/efforts/README.md`; rewrite `docs/internal/backlog-canonical.md`; update `docs/internal/release-planning/README.md`, `docs/internal/delivery-plan/README.md`, `docs/internal/efforts/M-10-skill-sample-outputs-library.md` | one tracked release-governance home exists and the effort/backlog model is documented in tracked files |
| 3 | Refresh live agent continuity and shared decision capture | `AGENTS/codex/CONTEXT.md`, `AGENTS/DECISIONS.md`, optional `AGENTS/DECISIONS_GUIDE.md` | Codex context reflects the current repo and shared decisions are usable as baseline continuity |
| 4 | Align contributor docs to shipped schema and classification model | `docs/reference/frontmatter-schema.yaml`, `docs/guides/authoring-pm-skills.md`, `docs/agent-skill-anatomy.md`, `docs/templates/skill-template/SKILL.md` | no contributor doc teaches `metadata.version` as canonical or omits `classification` guidance |
| 5 | Align public/reference docs and remove speculative surfaces | `README.md`, `QUICKSTART.md`, `docs/reference/project-structure.md`, `docs/reference/ecosystem.md`, `docs/guides/mcp-integration.md`, `docs/guides/using-skills.md`, `_bundles/triple-diamond.md` | current docs reflect the live repo surface and stop advertising non-existent helpers |
| 6 | Clean remaining active release/sample docs, then resume compatible Claude tasks | `.claude-plugin/plugin.json`, `docs/releases/Release_v2.6.1.md`, `library/skill-output-samples/SAMPLE_CREATION.md`, `docs/internal/efforts/M-10-skill-sample-outputs-library.md`; then Claude `A-8`, `A-9`, `A-11` | release truth and active docs are aligned; guardrail/effort tasks can proceed without structural churn |

## Open Questions

No blocking policy questions remain for this baseline pass.

Follow-on items already acknowledged but intentionally deferred:

1. a concise `DECISIONS.md` best-practice guide plus notes for later wrap-session capture
2. broader `wrap-session` and `init-project` redesign
3. any future decision to remove `.claude-plugin/` entirely from the shipped product surface

## Not In Scope Now

- GSD or any other external workflow/framework repository
- memory tooling
- speculative wrapper commands such as `project-context`, `update-doc`, `link-docs`, or `/common`
- cross-project abstractions
- broad future-state automation roadmaps
- reconciling archived plans under `_NOTES/_archived-agentic-process/`
- bulk migration of all historical `_NOTES/**` content
- changing shipped PM workflow behavior
- broad cleanup of historical tracked archives that are no longer shaping active work
