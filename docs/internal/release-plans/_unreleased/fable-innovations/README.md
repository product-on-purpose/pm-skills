# Fable innovation portfolio (unreleased)

This folder holds ten parked pre-decision spec and implementation-plan documents from the 2026-07-04 deep audit (maintainer-local, gitignored). Each document outlines a concrete innovation bet, ranked by audit score (Bar/Moat/Effort-inverse), with explicit promotion triggers and sequencing dependencies. Nothing here is committed scope until promoted through the canonical pipeline: GitHub issue -> effort brief -> release plan. The audit report itself lives in `_LOCAL/` and defines the contextual rationale, competitive positioning, and strategic sequencing for each bet; these parked documents are the technical specifications that follow if triggered.

## Innovation inventory

| ID | Title | One-line summary | Audit score | Key dependency | Promotion trigger |
|---|---|---|---|---|---|
| **X-01** | PM-Bench: a standalone, publishable benchmark for PM skill packs | Package trigger-eval and output-eval harnesses as a portable, versioned benchmark scoring any PM skill pack | 7/9 | WS-Z10 (eval completion, v2.31.0) | R-21 eval completion + eval industrialization steady for 2 releases |
| **X-02** | Artifact schemas: machine-readable output contracts | JSON Schemas for PRD, OKR set, experiment design with deterministic `pm-lint` validator | 6/9 | WS-Z8 (typed handoff, v2.31.0) | X-02 ships before WS-Z8 can promote (critical path) |
| **X-03** | Artifact provenance and the upgrade loop | Stamp artifacts with `generated-by: <skill>@<version>`, scan workspaces for stale artifacts, offer regeneration or delta | 7/9 | WS-Z7 (memory workstream, F-48) | F-48 (project-memory) landing at v2.32.0 horizon |
| **X-04** | Org overlay packs: extend without forking | Declare `extends: <skill>` overlay with deltas (extra sections, terminology, checklist items), version-compatible composition | 6/9 | WS-Z2 (generator, v2.31.0) | Explicitly deferred past v2.31.0; follows eval and handoff completion |
| **X-05** | Self-testing library: the agentic dogfood lane | Monthly CI lane sampling skills via the agentic-smoke-runbook, comparing fresh output against committed samples, catching regression and sample rot | 6/9 | WS-Z5 (eval industrialization, v2.31.0) | Runbook mechanism + existing sample corpus in place; deferred from Tier 3 output-eval-harness |
| **X-06** | Model portability matrix: honest cross-runtime evidence | Router and output-eval harnesses across Claude, GPT, Gemini with honest methodology and confound documentation | 5/9 | WS-Z5 (eval coverage prerequisite, v2.31.0) | X-01 (PM-Bench) must ship first; after eval industrialization breadth reaches ~65% |
| **X-07** | Context-cost transparency | Per-skill token-cost breakdown in catalog and site, advisory-then-enforcing budget lint, extends M-26 (plugin-level cost) | 5/9 | Extends M-26 (display name + token cost) | Deferred from v2.30.0 P2-7 (token-budget lint), part of context-cost effort |
| **X-08** | Zero-drift releases | Tracked registry of derived surfaces with generation status, tripwire validator, public property declaration and definition-of-done | 7/9 | v2.30.0 WS-T1 + v2.31.0 WS-Z1/Z2/Z3 (generators absorbed here) | Largely absorbed by trust-repair and zero-drift plans; residual inventory + tripwire only |
| **X-09** | Validator toolchain product | Extract pm-skills' battle-tested CI layer (frontmatter, reciprocity, trigger-fixtures, count) as reusable ecosystem package `skills-ci` | 5/9 | WS-Z4 (dual-shell port wave 1, v2.31.0) | Second consumer repo confirmed running validators in CI (trigger-gated, not scheduled) |
| **X-10** | Contribution fast lane | Content-only contribution path where tooling produces mechanical surfaces (version bump, HISTORY row, manifest regen); addresses bus-factor risk P1-4 | 4/9 | WS-T6 (governance guardrails, v2.30.0) | WS-T6-seeded good-first-issues labeled `fast-lane` in v2.30.0 |

## How to promote

Each innovation carries a candidate formal ID (F-5x or M-3x per the effort-ID rule) assigned at promotion, not before. The promotion pathway is intentionally bounded to prevent speculative tracking:

1. **File a GitHub issue** citing the innovation's ID and one-line title (e.g., "X-01 (PM-Bench: a standalone benchmark)"). Use the issue to open a decision question or spike, not to pre-commit scope.
2. **Author an effort brief (F-xx)** if the innovation is scoped as a new skill family or deep cross-skill integration (e.g., X-01, X-02); otherwise use an infrastructure ID (M-xx) for sub-agents, automation, or tooling (e.g., X-09, X-10).
3. **Promote the effort brief to a release plan** in `docs/internal/release-plans/vX.Y.Z/` once it reaches the canonical decision gate and is sequenced into a tagged release.
4. **Confirm the assigned ID** against the GitHub issue list and the roadmap's claimed ID range before creating any new work file, avoiding collisions.

Always reference the innovation ID with its one-line handle on first mention in any plan, issue, or document. Never reference a bare ID like "X-01" without its summary; the rule is the same as the repo's broader feedback on reference IDs. See `_LOCAL/` audit for the strategic rationale and competitive positioning behind each bet.

## Note on X-08 (zero-drift releases)

X-08 is largely absorbed by the v2.30.0 (trust repair) and v2.31.0 (zero-drift releases) release plans. The v2.30.0 plan ships P0-1 count-phrase fixes and a phrase-detection gate (WS-T1). The v2.31.0 plan ships the derived-surfaces generator (WS-Z2), release automation (WS-Z1), and release-notes dedup (WS-Z3). X-08's residual scope is the tracked registry of all derived surfaces with their generation status, plus a tripwire validator that keeps the registry honest against the actual repo. This inventory-and-check layer stands as a pre-decision document here, with a promotion trigger only if those two absorbed workstreams land and leave a discrete, trackable remainder worth calling out as a property on the site.
