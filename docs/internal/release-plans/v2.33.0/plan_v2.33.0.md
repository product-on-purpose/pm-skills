# v2.33.0 Release Plan: STUB

**Status:** STUB, seeded 2026-08-13 during v2.32.0 WS-8 prep. No scope is ruled. This document
exists so carried work has a home rather than living in session logs, and so the v2.32.0 cut has
somewhere to deposit its follow-ups at G4.
**Owner:** Maintainers.
**Type:** Undetermined. The candidate list below is additive, so MINOR is the likely shape.
**Previous:** v2.32.0, in flight at seeding time (branch `feat/v2320-memory-and-coverage`,
[PR #257](https://github.com/product-on-purpose/pm-skills/pull/257); plan at
`../v2.32.0/plan_v2.32.0.md`).

---

## How to use this stub

At the v2.32.0 G4, move carried items into the table below with their evidence. At the decision
stage, run the usual pass: research the candidates, size them, write the trip-wires, and rule scope
before building. Do not build from this stub.

## Candidates carried in

| # | Candidate | Source | Size | Notes |
|---|---|---|---|---|
| C-1 | AI-product family Track 1: the four increments | [v2.32.0 WS-5 spec](../v2.32.0/spec_c3-ai-product-family.md) section 9 | S-M | Two additive minors on `deliver-prd` (agent execution contract; behavior-and-eval linkage), a model-choice subsection on `develop-adr`, a privacy extension on `measure-instrumentation-spec`. No new trigger surface, no L floor, no catalog-count change. The cheapest useful item in the family |
| C-2 | Structure-over-prose weak-model re-test | v2.32.0 WS-1 ratification | S | Parked decision D1 was ratified as drafted **with a weak-model re-test scheduled before the next content cycle**. C-1 is a content cycle, so this is due before or alongside it |
| C-3 | Decision D8: PR-title lint promotion | Relocated from the v2.32.0 cut by [the cut pack](../v2.32.0/prep_cut-pack.md) section 6 | S | D8 = B (hold) stands; only the revisit moved here. Evidence to weigh is listed in that section, including `31f38ed4`, a human-authored non-conventional title pushed direct to main, which a PR-title lint structurally cannot see |
| C-4 | Front-door discoverability + a worked memory example | Raised in three consecutive session wraps, never ruled; sharpened by the 2026-08-14 doc audit | S-M | Measured, not estimated: **QUICKSTART has zero mentions** of hooks, guardrails, router, or memory. README mentions hooks twice, both incidental (a repo-tree comment and a parenthetical inside a link description), and project memory zero times. v2.32.0 ships memory as its headline, so the front door omits the release's main feature. Folded in from the same audit: **no worked example of the memory loop exists anywhere** in `library/` or `docs/templates/`, so the central claim ("run the PRD skill and it already knows your personas") has no artifact demonstrating it. A sample built on one of the three canonical threads is the strongest version of what the front door is missing, which is why these are one candidate rather than two |
| C-9 | Promote output-eval asset presence to enforcing | `reference/evals.md` states the promotion condition; v2.32.0 WS-4 met it | S-M | The page says asset presence is advisory and "promotes to enforcing once the roster is pinned." WS-4 pinned the roster (53 + 15 = 68, asserted in test), so the stated condition now holds. Deliberately not ruled inside the v2.32.0 tag window. Cost to weigh: 12 of 68 skills currently carry output-scenario assets, so promoting today would fail CI for 56 skills unless the gate scopes to rostered-and-scenario-bearing skills only |
| C-5 | Aggregated-roadmap decisions D-A, D-B, D-D, D-E, D-F | `_LOCAL/audit/2026-08-05_ai-skills_roadmap-aggregated.md` section 6 (maintainer-local) | Decisions only | Recommendations already written. D-C was ruled A on 2026-08-13 and is closed |
| C-6 | S2 authoritative cutover ratification | [#136](https://github.com/product-on-purpose/pm-skills/issues/136) checklist item 7 | Decision + config | Only if the v2.32.0 cut's observation sheet does not close it. Maintainer-only; no agent may self-promote |
| C-7 | Dual-shell validator ports | Standing cadence from the v2.30.0 audit | S per port | 23 pairs remained after v2.31.0's two ports. Cadence is 1-2 per release until none remain |
| C-8 | Memory artifact ledger disposition | [#223](https://github.com/product-on-purpose/pm-skills/issues/223) | Decision | v2.32.0 shipped B1 and B2 plus a ledger delta spec. Whether #223's added ledger semantics (orchestrator execution state, artifact hashes, provenance chains) are still wanted is an open call |

## Not carried in

- The AI-product family keystones (`measure-ai-eval-spec`, `deliver-ai-behavior-spec`) are staged for
  v2.34.0 per the spec's build tracks, and each must pass the control-arm gate in that spec's
  section 7 before any build begins.
- The ten speculative bets at `../_unreleased/fable-innovations/` remain unscheduled.
- Traction and marketing work is maintainer-local and does not appear in release plans.
