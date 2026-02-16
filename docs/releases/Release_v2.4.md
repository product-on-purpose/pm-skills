# PM-Skills v2.4.0 Release Notes

Date: 2026-02-16  
Status: Shipped

## Big Idea

v2.4.0 is the contract-lock release for output and config behavior.  
It closes `B-03` and `B-04` as `closed-aligned` with evidence-backed determinism checks.

## What Was Delivered

1. B-03 output behavior contract lock:
- Hybrid output defaults with intent guardrails.
- Collision safety matrix (`abort`, `overwrite`, `merge`, `new-file`) with safe non-interactive fallback.
- Path safety, target-selection, and required output metadata expectations captured in closure artifacts.
- Canonical tracked summary: `docs/internal/delivery-plan/v2.4-contract-lock-summary.md` (`closed-aligned` outcomes).

2. B-04 config contract lock:
- YAML-only canonical authoring with one canonical internal model.
- Strict config discovery precedence across approved paths.
- Unknown/deprecated key policy locked (`warn` local, strict `fail` in CI mode, one-version grace).
- Canonical tracked summary: `docs/internal/delivery-plan/v2.4-contract-lock-summary.md` (`closed-aligned` outcomes).

3. Shared config contract validation proof set:
- Captured in tracked summary: `docs/internal/delivery-plan/v2.4-contract-lock-summary.md`
- Detailed command-level working evidence remained local in `_NOTES/delivery-plan/`.

4. Release planning state sync for ship:
- `docs/internal/release-planning/checklist_v2.4.0.md` set to shipped state.
- `docs/internal/release-planning/Release_v2.2_to_v2.5_execution-plan.md` remains aligned on v2.4 complete, v2.5 next.

## Validation Performed

- B-03 and B-04 hard preconditions recorded PASS in closure decisions.
- Determinism gate evidence recorded PASS in `B-03b` and `B-04b`.
- Config validator evidence confirms strict/warn behavior and expected failures for invalid fixtures.
- Supersession completeness checks recorded in evidence artifacts.

## What This Means

- `v2.4.0` is now the baseline contract for output behavior and config behavior.
- Release claims for contract lock are tied to explicit closure and evidence artifacts.
- `v2.5.0` remains focused on foundation/persona decisions (`B-05`, `B-06`).

## Non-Goals for v2.4.0

- No new PM skills were added.
- No foundation/persona closure work was shipped in this release.
