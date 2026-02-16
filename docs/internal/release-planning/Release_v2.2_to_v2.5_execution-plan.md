# PM-Skills v2.2 to v2.5 Execution Plan

Date: 2026-02-14  
Status: Active plan (v2.4 contract lock complete; v2.5 decision prep pending)  
Release type: Minor for all releases

## Summary

This execution plan ships blockers `B-01` to `B-08` in dependency-safe order:
1. Guardrails and governance
2. MCP truth closure
3. Contract lock
4. Foundation/persona decisions

## Release 1 - v2.2.0 - Guardrails and Governance

Status:
1. Completed (2026-02-13)

Scope:
1. `B-02` phase 1: `validate-mcp-sync` in observe-only mode.
2. `B-07`: planning persistence policy and `.gitignore` alignment.
3. `B-08`: canonical backlog with explicit supersession pointers.

Exit criteria:
1. Sync workflow runs and reports drift clearly.
2. Planning persistence model is documented and reflected in `.gitignore`.
3. One backlog source is canonical and superseded docs point to it.

Non-goals:
1. Blocking CI on drift.
2. Output/config decisions.
3. Foundation/persona decisions.

## Release 2 - v2.3.0 - MCP Alignment Closure

Status:
1. Completed (2026-02-14)

Scope:
1. Execute and close `B-01` using:
   - `_NOTES/delivery-plan/B-01a. DONE_alignment-checklist.md`
   - `_NOTES/delivery-plan/B-01b. DONE_evidence-report.md`
   - `_NOTES/delivery-plan/B-01c. DONE_closure-decision.md`
   - `_NOTES/delivery-plan/B-01d. DONE_gap-register.md` (if needed)
2. Switch `validate-mcp-sync` to blocking mode.

Exit criteria:
1. `B-01` closure state is explicit: `closed-aligned`.
2. Critical/high gaps were fixed on pinned refs.
3. Drift workflow now blocks on mismatch by default.

## Release 3 - v2.4.0 - Contract Lock

Status:
1. Completed (2026-02-16, `closed-aligned` for `B-03` and `B-04`)

Scope:
1. `B-03`: canonical output behavior contract.
2. `B-04`: canonical config schema + format.
3. Closure artifacts completed:
   - `_NOTES/delivery-plan/B-03a-implementation-checklist.md`
   - `_NOTES/delivery-plan/B-03b-evidence-report.md`
   - `_NOTES/delivery-plan/B-03c-closure-decision.md`
   - `_NOTES/delivery-plan/B-04a-implementation-checklist.md`
   - `_NOTES/delivery-plan/B-04b-evidence-report.md`
   - `_NOTES/delivery-plan/B-04c-closure-decision.md`
4. Machine-readable config schema + validator evidence set added:
   - `_NOTES/delivery-plan/config-schema-v1.json`
   - `_NOTES/delivery-plan/scripts/validate-config-contract-v2.4.ps1`
   - `_NOTES/delivery-plan/scripts/validate-config-contract-v2.4.py`
   - `_NOTES/delivery-plan/evidence/config/*.yaml`

Exit criteria:
1. One output contract spec is canonical and cross-linked.
2. One config schema/format is canonical and validated.
3. Contradictory drafts are explicitly superseded.

## Release 4 - v2.5.0 - Foundation and Persona Decisions

Scope:
1. `B-05`: decide `foundation` phase status and MCP policy impact.
2. `B-06`: signed persona builder Q1-Q7 decision record.

Exit criteria:
1. Signed foundation decision exists and is reflected in MCP-facing docs/contracts.
2. Signed Q1-Q7 decision record exists and is referenced by active persona docs.
3. Active persona plans do not contain contradictory assumptions.

## Interface Impact Summary

1. CI interface: `validate-mcp-sync` output and enforcement mode (`observe` -> `block`).
2. Output behavior interface: file/prompt/hybrid and overwrite/collision rules.
3. Config interface: canonical keys and validation behavior for `output`, `projects`, `commonReferences`.
4. MCP phase model interface: `foundation` policy if adopted.

## Test Scenarios

1. Drift detection catches skills missing in either repo.
2. Observe mode reports but does not fail.
3. Block mode fails with actionable mismatch output.
4. Claim reconciliation in `B-01` marks each v2.1 claim as `true`, `partial`, or `false`.
5. Contract tests for output collision and config validation behavior.
6. Decision-link checks confirm persona/foundation docs point to signed records.
