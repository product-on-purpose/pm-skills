# Planning Persistence Policy

Status: Active  
Owner: Maintainers  
Last updated: 2026-03-15

## Purpose

Define which planning artifacts are durable and tracked versus local working material, so collaborators share stable decision context without treating scratch space as repo truth.

## Durable Tracked Planning Artifacts

Track planning artifacts when future collaborators should be able to cite them without access to a local workspace.

- `AGENTS/DECISIONS.md`
- `AGENTS/*/CONTEXT.md`
- `AGENTS/*/DECISIONS.md`
- `docs/internal/efforts/**` for durable effort briefs and canonical issue/context links
- `docs/internal/release-plans/**` for internal release governance, blocker decisions, and cut/publish notes
- `docs/releases/*.md` for public release communication
- `CHANGELOG.md`

## Local Working Artifacts

Keep high-churn planning material local and non-canonical.

- `AGENTS/*/SESSION-LOG/**`
- `AGENTS/*/TODO.md`
- `AGENTS/*/PLANNING/**`
- `_NOTES/**`
- `.claude/**` except intentionally shipped tracked artifacts
- `.obsidian/**`

## Backlog And Promotion Rules

Backlog and lifecycle state live in GitHub issues, not in a tracked repo planning file.

Promote content out of local working space only when both are true:

1. The content is stable enough that future collaborators should cite it later.
2. Collaborators without your local workspace would still need it.

Promote into one of these tracked homes:

1. `docs/internal/efforts/**`
2. `docs/internal/release-plans/**`
3. `AGENTS/*/DECISIONS.md`
4. `AGENTS/DECISIONS.md`

Do not promote raw notes or transcripts. Promote only concise, stable outcomes.

## Legacy Tracked Surfaces

Older files under `docs/internal/release-planning/**` and `docs/internal/delivery-plan/**` may remain tracked as history or redirects during migration, but they are not the current canonical homes for new planning artifacts.

## Hard Rules

1. No tracked file should call `_NOTES/**` canonical.
2. New durable effort context belongs in `docs/internal/efforts/**`.
3. New internal release-governance artifacts belong in `docs/internal/release-plans/**`.
4. Tracked docs should link to GitHub issues for backlog state instead of replacing them with a second canonical backlog file.

## Governance Checks

Before release or handoff:

1. Confirm decision-impacting items are summarized in tracked decision or effort files.
2. Confirm canonical effort and release links point to `docs/internal/efforts/**` or `docs/internal/release-plans/**`.
3. Confirm no active tracked doc treats `_NOTES/**` as the source of truth.
