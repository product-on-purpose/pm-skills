# v2.34.0 Release Plan: STUB

**Status:** **STUB, seeded 2026-09-01** during the v2.33.0 G4 post-tag hygiene pass. Nothing is scoped, nothing is ruled. This file exists so the v2.33.0 carries have a home rather than living only in a session log.
**Owner:** Maintainers.
**Type:** Unknown. Expected MINOR, but the `[fictional]`-convention item below could land as a PATCH on its own if the rest slips.
**Previous:** v2.33.0 SHIPPED 2026-09-01 (tag `v2.33.0` at `7a42570e`; plan at [`../v2.33.0/plan_v2.33.0.md`](../v2.33.0/plan_v2.33.0.md)).

---

## Sequencing note, read before scoping

**The `[fictional]`-convention item is the root cause of four separate G1 recurrences in v2.33.0 and must be sequenced FIRST.** Every sample sweep should follow it, not precede it. Four consecutive adversarial rounds each found an incomplete marking sweep, and the reason is that the rule being enforced is written down nowhere: `README_SAMPLES.md` defines the convention number-scoped ("every invented metric", "any specific number") and `check-sample-no-fabricated-metrics.mjs` is percentage-scoped to match, so the methodology-prose marking rule those four rounds actually enforced has no source. A fifth recurrence is likely until it is authored.

---

## A. Carries from v2.33.0 section D

| # | Item | Why it carried | Notes |
|---|---|---|---|
| 1 | **The `[fictional]` convention has no written source** | Root cause of four G1 recurrences | **Sequence first.** Author the rule, then re-scope the validator to match it, then sweep |
| 2 | **The trace table's remaining multi-claim rows** (retention, sampling, terminal disposition) | R12-F1's fix stated the per-claim rule rather than re-splitting, deliberately leaving decomposition to a QA owner | The recorded case against the decline: it leaves decomposition to an owner who may not do it |
| 3 | **Retention's dropped evaluation-set copy question** | `measure-instrumentation-spec`'s `SKILL.md` requires it and the shipped template does not carry it | **This is a known gap that SHIPPED in v2.33.0.** It is the v2.33.0 deferral with the least mitigation: the new per-claim coverage rule does not touch it, because it is a content gap rather than a decomposition gap |
| 4 | **The opt-out row's subject scope** | Deferred with rationale at G1 round 12 | |
| 5 | **`SKILL.md` drift after the access split** | Deferred with rationale at G1 round 12 | |
| 6 | **Sibling samples carry unmarked invented methodology** | Library-wide audit, deferred from v2.33.0 | Depends on item 1. Do not run this sweep before the convention is authored |

## B. Release-runbook defects, all observed during the v2.33.0 cut

Carried under [#269](https://github.com/product-on-purpose/pm-skills/issues/269). Four defects, and three of them are the same family: a runbook or config that names two of something where the repo has three, or omits where a thing lives.

| Defect | Where | Consequence observed |
|---|---|---|
| **G2 names two manifests; the repo has three** | `site/src/content/docs/contributing/release-runbook.md` | Following G2 literally misses `.codex-plugin/plugin.json`. `validate-version-consistency` catches it, so it is a friction defect rather than a correctness one |
| **`release-please-config.json` `extra-files` also lists only two** | `release-please-config.json` | `.claude-plugin/marketplace.json` is absent from the list. Same family as the row above |
| **G2.5 sub-check 7 says to record the captured SHA without saying where** | Runbook G2.5 | Recording it in a tracked file necessarily advances HEAD past the SHA just captured, and re-capturing recurses. **This produced the v2.33.0 tag-target ambiguity directly.** The fix is to state that the captured SHA is the authority and HEAD moving past it is expected, not a problem to resolve |
| **G4 sub-check 4 says the Release body is not auto-created** | Runbook G4 | `.github/workflows/release.yml` auto-publishes a generic body via `softprops/action-gh-release` on tag push. The real G4 task is replacing an already-public body, not authoring one into a vacuum |

## C. Open from the v2.33.0 G4 pass

| Item | State |
|---|---|
| **P0 plugin-install smoke test against the published v2.33.0 artifact** | **NOT RUN.** The runbook refuses "Release complete" until this passes or the maintainer logs it as an accepted known risk. Note `validate-plugin-install` in the pre-tag bundle exercises the local tree, not the published artifact, and does not satisfy this |
| `agent-plugins` re-pin | Open. Cross-repo PR, complete that repo's Section 7 checklist in the PR body |
| `pm-skills-mcp` narrative | Open. Counts half is N/A (catalog holds at 68 / 6); the narrative half needs a ruling, since the AI-product family is genuinely new narrative but that repo is in maintenance mode |
| skills.sh listing | Deferred by its own after-a-delay condition |

## D. Standing decisions still unruled

| Item | Carried since | Note |
|---|---|---|
| [#279](https://github.com/product-on-purpose/pm-skills/issues/279) **skills-manifest.yaml: restore or retire** | 2026-08-18 | `docs/internal/skill-versioning.md` requires a `skills-manifest.yaml` per release governance folder; measured, 8 of 44 folders have one, most recently v2.15.0. The requirement has gone unobserved for 29 folders. Either restore the practice or retire the requirement |
| [#267](https://github.com/product-on-purpose/pm-skills/issues/267) | v2.32.0 | Blocks C-6, which is why release-please [#271](https://github.com/product-on-purpose/pm-skills/pull/271) remains shadow-only |
| [#268](https://github.com/product-on-purpose/pm-skills/issues/268) | v2.32.0 | |

---

## The lesson v2.33.0 paid twelve rounds to learn

Measured across all 56 findings in the v2.33.0 G1 gate, split by what the fix that created the surface actually did:

**Fixes that DELETE a claim converged every time. Fixes that AUTHOR methodology or structure churned every time.**

The evaluation-sizing block produced zero findings across the nine rounds after D15 deleted its derivation. The trace block survived a symmetric rewrite, a choreography deletion with an authored replacement, and a row split, and produced a fresh high-severity finding after each one, because each authored something new to attack. Round 12's own headline finding was that the fix which split a row to assert "one claim per row" authored a replacement row carrying two.

**Do not let this cycle inherit twelve rounds as a norm.** A cycle whose fixes delete or mark should converge in the two or three rounds v2.32.0 took. If round counts start climbing again, that is the signal that the fixes have turned from deleting into authoring.

Pre-register the stopping condition before the gate opens, per D23. A quality-shaped rule ("stop when findings fall below severity X") assumes findings converge; when the fix rate equals the damage rate, that rule never fires.
