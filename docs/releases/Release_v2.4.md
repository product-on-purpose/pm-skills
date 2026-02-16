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
- Closure decision: `_NOTES/delivery-plan/B-03c. DONE_closure-decision.md` (`closed-aligned`).

2. B-04 config contract lock:
- YAML-only canonical authoring with one canonical internal model.
- Strict config discovery precedence across approved paths.
- Unknown/deprecated key policy locked (`warn` local, strict `fail` in CI mode, one-version grace).
- Closure decision: `_NOTES/delivery-plan/B-04c. DONE_closure-decision.md` (`closed-aligned`).

3. Shared config contract validation proof set:
- `_NOTES/delivery-plan/config-schema-v1.json`
- `_NOTES/delivery-plan/scripts/validate-config-contract-v2.4.ps1`
- `_NOTES/delivery-plan/scripts/validate-config-contract-v2.4.py`
- `_NOTES/delivery-plan/evidence/config/*.yaml`

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
