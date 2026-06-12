# [M-32] Derived surfaces - Phase 1 (skill manifest + generated AGENTS.md catalog)

Status: Planned (v2.27.0)
Milestone: v2.27.0
Issue: TBD (provisional ID, next after M-31 trigger-accuracy evals; closes long-open #87 "Auto-generated AGENTS.md header from skill inventory"; confirm ID is free against GitHub issues before promotion)
Agent: codex or claude (deterministic Node generator work; mirrors gen-resource-index conventions)

## Scope

Ship Phase 1 of the derived-surfaces theme: a canonical machine-readable skill manifest (`skill-manifest.json`) generated from `skills/*/SKILL.md` frontmatter, and a generated AGENTS.md catalog section driven by that manifest, both protected by enforcing `--check` staleness gates (the gen-resource-index pattern). Retires the disabled `sync-agents-md.yml` workflow. Landing cards, static Skill Finder, and output schemas stay deferred.

## Problem

The catalog's discovery surfaces are hand-synced, and the v2.26.0 count sweeps re-confirmed the cost: ~20 surfaces found beyond the plan list, with WS-A1/A2 spending a whole workstream de-rotting the landing page and AGENTS.md. Issue #87 (auto-generated AGENTS.md header) has been open since January; the original `sync-agents-md.yml` workflow is disabled because it expects a nested `skills/$phase/` layout the repo abandoned, so today NOTHING regenerates AGENTS.md, and `check-agents-md-command-sync.sh` only guards the commands cross-sync, not the skill catalog. Every release that adds skills re-pays the hand-sync tax and risks the drift class structurally.

A committed, validated `skill-manifest.json` also becomes the substrate later phases consume (static Skill Finder, output schemas, landing-card generation, `build-skill-catalog.py` consolidation) and an additional machine-readable surface for external tools.

## How It Works

1. **`scripts/gen-skill-manifest.mjs`** reads every `skills/*/SKILL.md` frontmatter (name, description, version, phase or classification, family metadata) plus filesystem facts (references presence, sample path) and emits `skill-manifest.json` (committed). `--check` mode exits non-zero when the committed file is stale, wired ENFORCING in CI from day one (deterministic; brand-new file, no legacy corpus; same posture as the existing "Check resource index is current" step).
2. **AGENTS.md catalog between markers:** the generator (a `--agents` mode) rewrites only the block between `<!-- skills-catalog:start -->` and `<!-- skills-catalog:end -->` from the manifest, leaving the hand-authored prose around it untouched. Same `--check` staleness gate. Existing enforcing validators (`validate-agents-md.sh`, `check-agents-md-command-sync.sh`, count gates) keep running and must stay green over generated output.
3. **Retire `sync-agents-md.yml`** (delete; superseded by marker-based generation that works with the flat layout). Closes #87.

## Classification

- Type: infrastructure / CI tooling (no new skills, no catalog count change)
- New: `scripts/gen-skill-manifest.mjs` (+ `.test.mjs`), `skill-manifest.json`, AGENTS.md markers, two enforcing CI steps; one workflow deleted

## Exemplars

- `scripts/gen-resource-index.mjs` + the enforcing "Check resource index is current" CI step - the generate + committed-output + `--check` staleness pattern this copies
- `scripts/build-skill-catalog.py` - existing frontmatter-walking generator (future consolidation candidate, out of scope here)
- `.github/workflows/sync-agents-md.yml` - the failed nested-layout approach being retired
- `docs/internal/release-plans/v2.27.0/spec_derived-surfaces.md` - the spec and ACs

## Deliverables

- `scripts/gen-skill-manifest.mjs` + `.test.mjs`
- `skill-manifest.json` (first generation, diff triaged by maintainer)
- AGENTS.md markers + first generated catalog block
- Two enforcing CI steps (manifest staleness, AGENTS.md catalog staleness)
- `sync-agents-md.yml` removed; #87 closed with a pointer to the new mechanism
- Contributor note documenting the regeneration step (where skill authors learn "run the generator after adding a skill")

## Validation

- `.test.mjs` green (schema shape, marker replacement idempotence, `--check` both directions)
- First-generation AGENTS.md diff manually reviewed: descriptions verbatim from frontmatter, no hand-authored prose lost
- All existing enforcing validators green over generated output (agents-md, command-sync, counts, link gates)
- A deliberate drift test: edit a description, confirm both `--check` steps fail, regenerate, confirm green

## Open Questions

- Manifest location: repo root vs `docs/` (spec decision D-A proposes root for machine consumers)
- Whether the README At-a-Glance numbers join the generated set in this phase or wait (spec proposes wait; count gates already enforce them)
- Exact manifest fields for family/tool metadata (settled in spec from the live frontmatter shapes)

## Dependencies

- None hard. Independent of trigger-accuracy evals (M-31). Sequencing preference: land BEFORE any catalog-growing release train (the competitive roadmap's coverage families) so growth never re-pays the hand-sync tax.

## Status Transitions

- Planned (current, v2.27.0)
- In Progress - when the generator spec lands in code
- Shipped - on v2.27.0 tag (manifest + generated AGENTS.md + enforcing gates; later phases cover Finder/cards/schemas)
