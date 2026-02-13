# Release Planning Conventions

Status: Active
Owner: Maintainers
Last updated: 2026-02-13

This directory stores tracked, forward-looking release planning controls.

## Scope

- Execution plans for upcoming releases
- Release checklists used before and during ship

## Allowed Checklist Status Values

- `Planned`
- `In progress`
- `Shipped`
- `Superseded`

## Lifecycle Rules

1. Keep forward-looking execution plans and checklists in `docs/internal/release-planning/`.
2. Keep shipped release notes and post-ship reviews in `docs/releases/`.
3. When a release ships:
- Keep its checklist in this directory and set final status (`Shipped` or `Superseded`).
- Publish release notes/reviews under `docs/releases/`.
4. Do not place forward execution plans in `docs/releases/`.
