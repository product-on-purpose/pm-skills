# v2.36.0 Release Plan: STUB

**Status:** **STUB, seeded 2026-10-30** during the v2.35.0 G4 post-tag hygiene pass. Nothing is scoped and nothing is ruled. This file exists so the v2.35.0 carries have a home, as runbook G4 item 7 requires.
**Owner:** Maintainers.
**Type:** Unknown. Expected MINOR.
**Previous:** v2.35.0 SHIPPED 2026-10-30 (tag `v2.35.0` at `9236f262`; plan at [`../v2.35.0/plan_v2.35.0.md`](../v2.35.0/plan_v2.35.0.md)).

---

## Sequencing note, read before scoping

**The headline is the first decision, and this time there is a candidate with a pre-registered next step.** Two pilots found that `define-problem-statement` and `discover-interview-synthesis` lost to a no-skill model. Neither pilot let a skill ask the stakeholder questions it is built around. Row R1 below re-tests both in their designed mode. A skill that wins becomes the release's user-facing story; a skill that loses again is retired, which is also a user-facing change.

**v2.34.0 and v2.35.0 were both inward-facing releases.** A third in a row should be a deliberate ruling, not a default.

---

## R. The re-test queued by the v2.35.0 follow-up pilot

| # | Item | Source | Notes |
|---|---|---|---|
| R1 | **Re-test `define-problem-statement` and `discover-interview-synthesis` in their designed mode** | v2.35.0 plan, "What comes next" ([#337](https://github.com/product-on-purpose/pm-skills/pull/337)) | Each is re-tested with counted measures (facts recovered, blocking questions, faithfulness errors), improved against what the test finds, and retired only if it loses again |

## A. Carries moved from v2.35.0 by the re-scope ruling of 2026-10-30

Rows A2 to A4 are the `measure-instrumentation-spec` carries, copied from the v2.35.0 plan section A with their original numbers.

| # | Item | Why it carried | Notes |
|---|---|---|---|
| A2 | **The trace table's remaining multi-claim rows** (retention, sampling, terminal disposition) | v2.33.0 R12-F1's fix stated the per-claim rule instead of re-splitting, leaving decomposition to a QA owner | The recorded case against that decline: it leaves decomposition to an owner who may not do it. Splitting rows is an authored fix, the class that churned in v2.33.0's G1 |
| A3 | **The opt-out row's subject scope** | Deferred with rationale at v2.33.0 G1 round 12 | |
| A4 | **`SKILL.md` drift after the access split** | Deferred with rationale at v2.33.0 G1 round 12 | |

## B. Carries from the v2.34.0 build and sweep

B2, B4 and B6 are work moved by the re-scope. B1, B3 and B5 are standing positions, carried forward unchanged.

| # | Item | Source | Notes |
|---|---|---|---|
| B1 | **`develop-agent-authority-plan` stays unscheduled** behind the C-3 section 7 control-arm gate | v2.34.0 ruling R3 = B | It covers the product's own agent, which no shipped increment covers. `iterate-ai-incident-review` was closed under the same ruling |
| B2 | **"Does deciding this property require a model?"** | v2.34.0 control-arm salvage item 4 | Untested. It would fix the miss on the Workbench completeness check, which no analyst caught. It stays out of `deliver-prd` until something tests it |
| B3 | **The fabricated-metrics check stays advisory** | v2.34.0 section A items 1 and 6 | Both tranches failed the pre-registered enforcing condition, as predicted. Residual findings are mostly decisions the convention leaves unmarked, plus marked claims longer than the checker's 40-character window |
| B4 | **Over-marks on claims the input states were left in place** | v2.34.0 sample sweep | Sweepers could unmark only under R11 or R12, so they reported other wrong markers instead of removing them |
| B5 | **Sample frontmatter is outside the convention's scope** | v2.34.0 sample sweep | The library holds one percentage in frontmatter |
| B6 | **A garbled sentence fragment** in `skills/measure-experiment-results/references/EXAMPLE.md` | v2.34.0 sample sweep | Present since v2.0.0; it predates the sweep |

## F. Deferred by the v2.35.0 gates

| # | Item | Source | Notes |
|---|---|---|---|
| F1 | **The release ZIP does not ship `site/src/content/docs/`**, so the 41 reference links that #326 repointed do not resolve in a ZIP install | v2.35.0 G1 round 1, finding F1, the links half | Those links were already broken inside the ZIP in v2.34.0. Shipping the docs pages inside the ZIP is new packaging structure, so the G1 rule deferred it. The CHANGELOG and the release page say the links resolve only in a git or marketplace install |
| AUD-3 | **Eight `../docs/concepts/` and `../docs/guides/` links in `_workflows/*.md` sources target paths that no longer exist** | v2.35.0 G0 auditor pass | `scripts/gen-site.mjs` rewrites them, so the published site resolves them. Present since v2.15.0 and v2.22.0 |

## C. Open from earlier cycles

| Item | State |
|---|---|
| `pm-skills-mcp` narrative | Open, carried from v2.33.0 section C. The counts half is N/A (68 skills, 6 sub-agents); the narrative half needs a ruling, since that repo is in maintenance mode |
| skills.sh listing | Deferred by its own after-a-delay condition |
| D-E (plugin identity), from the aggregated AI-skills roadmap decisions | Deferred |
| D-F (governance evidence map), from the same decision set | Deferred |
| [#267](https://github.com/product-on-purpose/pm-skills/issues/267) | Blocks C-6, which is why release-please stays shadow-only |
| [#268](https://github.com/product-on-purpose/pm-skills/issues/268) | Carried since v2.32.0 |
| [#308](https://github.com/product-on-purpose/pm-skills/pull/308) (a `deliver-prd` AI Behavior sample, a fork pull request) | Waiting on its contributor; a review comment is posted |

## D. Parked maintenance, no ruling needed

- Add the manifest checks to the pre-tag bundle. **v2.35.0 hit this:** the authored description tails in both Claude manifests still described v2.34.0, the generator flagged them, and the pre-tag bundle passed anyway.
- Fix the Format example in `docs/internal/skill-versioning.md`.
- Tighten `trancheFor` in the fabricated-metrics checker.
- `README.md` says "invocation examples for all five sub-agents". The catalog has six, one of them the internal `pm-skill-router`, so the phrase may be intentional; verify against the guide it describes.

## E. Landed on main since v2.35.0 (untagged)

This ledger is for the G2 CHANGELOG pass. Update it as pull requests merge.

| Pull request | What landed | In `[Unreleased]`? |
|---|---|---|
