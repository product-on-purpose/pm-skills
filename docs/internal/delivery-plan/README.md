# Delivery-Plan Artifact Policy

Status: Active  
Owner: Maintainers  
Last updated: 2026-02-16

## Purpose

Define where delivery-plan artifacts live so release-critical truth is trackable in git while high-churn working notes stay local.

## Canonical Placement Decision

1. `docs/internal/delivery-plan/**` is the canonical tracked location for release-governance blocker artifacts.
2. `_NOTES/delivery-plan/**` remains local working space for drafts, command transcripts, and exploratory evidence.
3. Public and release-facing docs must link to tracked artifacts under `docs/internal/` (not `_NOTES/`).
4. Keep this directory intentionally minimal to avoid cloning high-churn planning payloads.

## Artifact Types

### Tracked (canonical)
- Blocker decision records that affect release behavior.
- Closure-path checklists and evidence summaries required for cross-repo alignment.
- Cross-release summary artifacts used by release notes/checklists.

### Local-only (`_NOTES`)
- Scratch planning notes.
- Raw command outputs and temporary investigation logs.
- Drafts not yet promoted to release-governance truth.

## Promotion Rule

Promote `_NOTES` content to `docs/internal/delivery-plan/` when all are true:
1. The content affects release scope, contracts, compatibility, or policy.
2. The content is needed for external collaborators to verify release claims.
3. The content has a clear owner/date and stable wording.

## Migration Plan (2026-02-16)

1. Completed now:
- Added tracked v2.4 contract-lock summary: `docs/internal/delivery-plan/v2.4-contract-lock-summary.md`.
- Added tracked v2.5 continuity artifacts for `B-05` and `B-06` under `docs/internal/delivery-plan/v2.5/`.

2. In-progress:
- Update release-planning/checklist docs to link tracked delivery-plan artifacts.

3. Follow-up:
- Backfill tracked summaries for any remaining release-critical references that still point to `_NOTES`.
- Keep `_NOTES` as optional supplementary local evidence only.
