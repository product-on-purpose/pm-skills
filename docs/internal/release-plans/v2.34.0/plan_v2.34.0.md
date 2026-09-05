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
| **Retire the predecessor runbook** (this is the oldest defect, and the largest) | [`../runbook_clean-worktree-cut-tag-publish.md`](../runbook_clean-worktree-cut-tag-publish.md) | 284 lines that **self-declare as canonical on line 7** against a **v2.5.0 baseline**, 28 minors stale. `release-plans/README.md` already labels it a predecessor, so two documents claim the same job and this is the one a maintainer reaches for. It carries a full parallel `pm-skills-mcp` release track (33 mentions: `$ROOT_MCP`/`$WT_MCP` variables, worktree setup, an entire numbered section 6, the `validate-mcp-sync` gate, npm publish steps, six verification checkboxes, and section 10.5.5) for a repo frozen since 2026-05-05, plus the wrong freeze version (says v2.9.2, is v2.9.3). **Do not surgically remove the MCP track**: that touches ~90 lines and renumbers sections to preserve a document that should not exist. **Replace the body with a redirect stub** to `site/src/content/docs/contributing/release-runbook.md` (which is current and contains zero MCP references), keeping the path so the historical inbound links from CHANGELOG and old audit docs do not rot. Roughly ten lines, and it retires the MCP track, the version error, the stale baseline, and the false canonical claim at once |

## C. Open from the v2.33.0 G4 pass

| Item | State |
|---|---|
| **P0 plugin-install smoke test against the published v2.33.0 artifact** | **PASSED 2026-09-02**, through the real user path rather than the local tree. Returned 2.33.0 at `7a42570e` with 68 skills / 6 sub-agents / 11 commands, the three skill-MAJORs at 3.0.0, and all four AI sections present. Worth carrying forward: `validate-plugin-install` in the pre-tag bundle tests the **local tree** and does not satisfy this check, which is why a green bundle sat alongside an undeliverable release |
| `agent-plugins` re-pin | **DONE 2026-09-02.** Merged as agent-plugins [#96](https://github.com/product-on-purpose/agent-plugins/pull/96) at `248e905`, registry `1.73.0` to `1.74.0`, pm-skills `e8a641c3` to `7a42570e`, `strict: true` preserved, no other member entry moved. Branch prepared by `repin-watch` via `workflow_dispatch` rather than hand-authored, and the live registry was re-read afterwards to confirm it serves 2.33.0. **Kept here because the lesson outlives the fix: this is the release's DELIVERY PATH, not post-release tidying.** The earlier note here read "cross-repo, nothing blocks it", which was literally true and wrong in effect: nothing blocks *doing* it, but until it is done **no user can receive the release**. Users install pm-skills from the `product-on-purpose` marketplace, which is the `agent-plugins` repo, and that registry pins by commit SHA independently of anything in this repo. It still pins `e8a641c3` (v2.32.0), so `claude plugin update` correctly returns 2.32.0 on every machine. `pm-skills`'s own `marketplace.json` reading v2.33.0 is irrelevant to those users. **Found from a field report, not from any check here**, which is the real defect: G4 can declare a release complete while it is undeliverable. Prepared at agent-plugins issue [#94](https://github.com/product-on-purpose/agent-plugins/issues/94) and branch `repin/pm-skills`; design to invert the default at agent-plugins [#95](https://github.com/product-on-purpose/agent-plugins/pull/95) |
| `pm-skills-mcp` narrative | Open. Counts half is N/A (catalog holds at 68 / 6); the narrative half needs a ruling, since the AI-product family is genuinely new narrative but that repo is in maintenance mode |
| skills.sh listing | Deferred by its own after-a-delay condition |

## C2. New candidate: a delivery check on this side of the fence

**Seeded 2026-09-01 by the v2.33.0 delivery miss.** G4 declared v2.33.0 essentially complete while the marketplace users install from still served v2.32.0. Every validator was green, every count correct, every link live. The release was simply not delivered, and nothing in this repo asks that question.

The registry has its own detector (`repin-watch`, a daily poll) and the design to make delivery automatic is proposed at agent-plugins [#95](https://github.com/product-on-purpose/agent-plugins/pull/95). **Neither of those is a check on this side.** Asking the registry to notice on the publisher's behalf puts the check where the information is but not where the accountability is.

**Proposal:** a G4 sub-check that reads the `product-on-purpose` registry's pinned version for `pm-skills` and compares it to the tag just pushed, refusing "Release complete" while they disagree. Cheap (one unauthenticated fetch of a public raw file), and it converts an invisible failure into a blocking one. Pairs with, and does not depend on, the registry-side work.

Note this is a **second** instance of the same shape as the runbook defects in section B: a control that verifies the artifact rather than its arrival.

## C3. Doc currency and usefulness: the program this cycle should start

The delivery miss in C2 is one instance of a class. Seven defects were observed between 2026-09-01 and 2026-09-05 that all shipped with 19 of 19 enforcing validators green, and **zero of the seven were caught by tooling**: six by a human tripping over them, one by finally reading an advisory.

Full analysis, prioritized gaps, sequencing and falsifiable success criteria: [`../../doc-currency-program.md`](../../doc-currency-program.md).

**What this cycle should take**, which is phase 1 plus the highest-value single change:

| Item | What it does | Effort |
|---|---|---|
| **C1 delivery check** | Compares the `agent-plugins` registry pin against the tag just pushed; refuses "Release complete" while they disagree. Same as section C2 above | Small |
| **C2 manifest tail freshness** | The authored half of each manifest description names a version. Assert it names the current one. Catches the tails that still pitched v2.32.0 two days after v2.33.0 shipped | Small |
| **N1 re-scope `check-version-references`** | It reports **1287 findings at a near-zero true-positive rate**, which is worse than no check: it occupies the slot a real check would fill and gives false assurance. **It is also 96x slower in bash than in PowerShell** (288s against 3s, same tree, same findings), which pushes the whole pre-tag bundle past ten minutes and made it look hung during this cycle. Measured, not inferred. Re-scope to flag version tokens only in currency-bearing sentences ("latest", "currently", "now at"), not historical ones ("v2.16.0 introduced"). Label 100 findings first as the fixture; retire it outright if precision stays under about 80 percent | Medium |

**The design rule worth carrying**, because it explains every one of the seven: each existing check answers the question *adjacent* to the one that matters. Valid rather than current. Condition rather than action. Differs rather than wrong. Has-samples rather than samples-reachable. Local tree rather than published artifact.

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
