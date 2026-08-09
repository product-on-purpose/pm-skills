# [M-40] Artifact schemas - machine-readable output contracts (X-2)

Status: Filed (2026-08-08, per v2.32.0 decision D4 = B; build not scheduled)
Milestone: none (unscheduled; v2.33.0 candidate at the earliest)
Issue: [#258](https://github.com/product-on-purpose/pm-skills/issues/258)
Agent: agent:claude (schemas, convention, proposal doc) + codex on `pm-lint` scripting; the upstream-proposal go/no-go stays human
Spec of record: [X-02-artifact-schemas.md](../release-plans/_unreleased/fable-innovations/X-02-artifact-schemas.md)

## Scope

JSON Schema (2020-12) output contracts for three artifact families at v1: PRD (`deliver-prd`), OKR set (`foundation-okr-writer`), experiment design (`measure-experiment-design`). Plus: a `pm-lint` CLI that validates a saved artifact against its matching schema, the authoring convention (`skills/<name>/references/output.schema.json` and an optional `metadata.output_schema` frontmatter pointer), and a candidate agentskills.io output-contract extension proposal. Post-hoc and opt-in: no generation-time enforcement, no `TEMPLATE.md` rewrites, no all-68-skills retrofit. Full requirements (REQ-1 through REQ-8), phases, and open questions live in the spec of record; this brief does not duplicate them.

## Why filed now (decisions)

- **v2.32.0 D4 = B (ruled 2026-08-02):** defer C-2 (typed handoff envelope, [#224](https://github.com/product-on-purpose/pm-skills/issues/224)) but file X-2's tracking issue and this brief, making #224's promotion trigger ("X-2 ratified with one shipped schema family") reachable without an XL commitment. The filing is workstream WS-7 in [plan_v2.32.0.md](../release-plans/v2.32.0/plan_v2.32.0.md).
- **ID assignment: M-40.** Verified 2026-08-08: M-30 through M-36 are claimed (shipped or issue-backed; M-36 is the v2.31.0 zero-drift generator effort); M-37, M-38, and M-39 are penciled by the sibling parked bets X-07, X-09, and X-10 and honored as reservations per the WS-1 F-54 precedent. One leg unverified, as with F-54: the maintainer-local untracked backlog.
- **Open design questions stay open** (OQ-1 strictness, OQ-2 gate placement, OQ-3 schema currency, all in the spec); they are ruled when a build cycle schedules the effort, not by this filing.

## Links

- Spec + implementation plan (design of record): [X-02-artifact-schemas.md](../release-plans/_unreleased/fable-innovations/X-02-artifact-schemas.md)
- Downstream dependent: [#224](https://github.com/product-on-purpose/pm-skills/issues/224) (typed handoff envelope, R-23); promotes only after Phase 2 ships one schema family
- Ruling record: [plan_v2.32.0.md](../release-plans/v2.32.0/plan_v2.32.0.md) (decision D4, workstream WS-7)
- Method lineage: the M-30/M-31/M-33 eval program and the v2.27.0 structure-over-prose finding

## Status Transitions

- Filed (current): issue open, no build scheduled
- Planned: when a release plan schedules Phases 1-2 (the #224-unblocking phases)
- Shipped: when the phased build completes per the spec's own implementation plan
