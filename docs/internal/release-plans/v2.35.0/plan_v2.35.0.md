# v2.35.0 Release Plan: STUB

**Status:** **STUB, seeded 2026-10-17** during the v2.34.0 G4 post-tag hygiene pass. Nothing is scoped and nothing is ruled. This file exists so the v2.34.0 carries have a home, as runbook G4 item 7 requires.
**Owner:** Maintainers.
**Type:** Unknown. Expected MINOR. Section A is quality carries; no user-facing headline is chosen yet.
**Previous:** v2.34.0 SHIPPED 2026-10-17 (tag `v2.34.0` at `31e46928`; plan at [`../v2.34.0/plan_v2.34.0.md`](../v2.34.0/plan_v2.34.0.md)).

---

## Sequencing note, read before scoping

**This release has no headline yet, and that is the first decision.** v2.34.0's planned headline failed its control-arm gate, so the carries below are all quality work. A release made only of carries is the inward-facing pattern the v2.34.0 stub warned about. Choose a user-facing item, or rule explicitly that this is a quality release, before building.

**Item A1 goes first among the carries,** because it is a gap that shipped in v2.33.0 and is still shipping.

---

## A. Carries from v2.34.0 (ruling R5 = B, and the v2.34.0 G1 gate)

Rows A1 to A4 are the `measure-instrumentation-spec` carries, copied from v2.34.0 plan section A items 2 to 5 and ordered as ruling R5 directed, with the shipped gap first.

| # | Item | Why it carried | Notes |
|---|---|---|---|
| A1 | **Retention's dropped evaluation-set copy question** | `measure-instrumentation-spec`'s `SKILL.md` requires it and the shipped template does not carry it | **A known gap that SHIPPED in v2.33.0.** It is a content gap rather than a decomposition gap, so the per-claim coverage rule does not mitigate it |
| A2 | **The trace table's remaining multi-claim rows** (retention, sampling, terminal disposition) | v2.33.0 R12-F1's fix stated the per-claim rule instead of re-splitting, leaving decomposition to a QA owner | The recorded case against that decline: it leaves decomposition to an owner who may not do it. Splitting rows is an authored fix, the class that churned in v2.33.0's G1 |
| A3 | **The opt-out row's subject scope** | Deferred with rationale at v2.33.0 G1 round 12 | |
| A4 | **`SKILL.md` drift after the access split** | Deferred with rationale at v2.33.0 G1 round 12 | |
| A5 | **`utility-pm-release-conductor` still offers a known-regression waiver for a delivery P0** | v2.34.0 G1 round 2, finding R2-F1, the remainder outside the fix pass | `skills/utility-pm-release-conductor/references/TEMPLATE.md` lines 63 to 65 list "logs the P0 as a known regression" as a way to emit "Release complete", which the runbook and `agents/pm-release-conductor.md` now forbid for a delivery P0. **Classify before editing:** narrowing when "Release complete" may be emitted may be a MAJOR under the "what done means" row of `docs/internal/skill-versioning.md` |

## B. Carries from the v2.34.0 build and sweep

| # | Item | Source | Notes |
|---|---|---|---|
| B1 | **`develop-agent-authority-plan` stays unscheduled** behind the C-3 section 7 control-arm gate | v2.34.0 ruling R3 = B | It covers the product's own agent, which no shipped increment covers. `iterate-ai-incident-review` was closed under the same ruling |
| B2 | **"Does deciding this property require a model?"** | v2.34.0 control-arm salvage item 4 | Untested. It would fix the miss on the Workbench completeness check, which no analyst caught. It stays out of `deliver-prd` until something tests it |
| B3 | **The fabricated-metrics check stays advisory** | v2.34.0 section A items 1 and 6 | Both tranches failed the pre-registered enforcing condition, as predicted. Residual findings are mostly decisions the convention leaves unmarked, plus marked claims longer than the checker's 40-character window |
| B4 | **Over-marks on claims the input states were left in place** | v2.34.0 sample sweep | Sweepers could unmark only under R11 or R12, so they reported other wrong markers instead of removing them |
| B5 | **Sample frontmatter is outside the convention's scope** | v2.34.0 sample sweep | The library holds one percentage in frontmatter |
| B6 | **A garbled sentence fragment** in `skills/measure-experiment-results/references/EXAMPLE.md` | v2.34.0 sample sweep | Present since v2.0.0; it predates the sweep |

## C. Open from earlier cycles

| Item | State |
|---|---|
| `pm-skills-mcp` narrative | Open, carried from v2.33.0 section C. The counts half is N/A (68 skills, 6 sub-agents); the narrative half needs a ruling, since that repo is in maintenance mode |
| skills.sh listing | Deferred by its own after-a-delay condition |
| [#267](https://github.com/product-on-purpose/pm-skills/issues/267) | Blocks C-6, which is why release-please stays shadow-only |
| [#268](https://github.com/product-on-purpose/pm-skills/issues/268) | Carried since v2.32.0 |
| [#286](https://github.com/product-on-purpose/pm-skills/pull/286) (Model Trace Capture sample, a contributor's pull request) | If the author has not responded by 2026-10-29, maintainers finish it on the contributor's branch, using "Part of #282" rather than "Fixes" |
| [#308](https://github.com/product-on-purpose/pm-skills/pull/308) (a `deliver-prd` AI Behavior sample, a fork pull request) | Waiting on its contributor; a review comment is posted |

## D. Parked maintenance, no ruling needed

- Add the manifest checks to the pre-tag bundle.
- Fix the Format example in `docs/internal/skill-versioning.md`.
- Tighten `trancheFor` in the fabricated-metrics checker.
- `README.md` says "invocation examples for all five sub-agents". The catalog has six, one of them the internal `pm-skill-router`, so the phrase may be intentional; verify against the guide it describes.
