# PM-Skills v2.4.0 Release Notes

Date: 2026-02-16  
Status: Shipped

## Big Idea

v2.4.0 finalized the output and configuration behavior contracts for the repository.  
This release established a stable, test-backed baseline so future releases can add capabilities without changing expected behavior.

## What Was Delivered

1. Output behavior contract finalized:
- Hybrid output defaults with intent guardrails.
- Collision safety matrix (`abort`, `overwrite`, `merge`, `new-file`) with safe non-interactive fallback behavior.
- Path safety, target selection, and required output metadata expectations documented in tracked closure artifacts.
- Canonical tracked summary: `docs/internal/delivery-plan/v2.4-contract-lock-summary.md`.

2. Configuration behavior contract finalized:
- YAML-only canonical authoring with a single canonical internal model.
- Strict configuration discovery precedence across approved paths.
- Unknown/deprecated key policy locked (`warn` local, strict `fail` in CI mode, one-version grace).
- Canonical tracked summary: `docs/internal/delivery-plan/v2.4-contract-lock-summary.md`.

3. Shared validation evidence captured:
- Validation and determinism results are recorded in tracked documentation under `docs/internal/delivery-plan/`.

4. Release-planning sync completed:
- `docs/internal/release-planning/checklist_v2.4.0.md` moved to shipped state.
- `docs/internal/release-planning/Release_v2.2_to_v2.5_execution-plan.md` remained aligned on v2.4 complete, v2.5 next.

## Validation Performed

- Output and configuration preconditions recorded as passing in tracked closure records.
- Determinism checks recorded as passing in closure evidence.
- Config validator evidence confirms expected strict and warning behavior, including expected failures for invalid fixtures.
- Supersession completeness checks recorded in tracked artifacts.

## What This Means

- `v2.4.0` is the baseline contract for output and configuration behavior.
- Release claims are tied to explicit closure and evidence artifacts in tracked docs.
- `v2.5.0` remains focused on foundation and persona decisions.

## Non-Goals for v2.4.0

- No new PM skills were added.
- No foundation/persona closure work was shipped in this release.
