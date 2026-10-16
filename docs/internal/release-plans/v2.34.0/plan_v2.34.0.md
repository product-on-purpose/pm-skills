# v2.34.0 Release Plan

**Status:** **PLANNED, scope ruled 2026-10-15.** Seeded 2026-09-01 as a stub during the v2.33.0 G4 post-tag hygiene pass, so the v2.33.0 carries had a home rather than living only in a session log. The ruled scope is in "Scope, ruled 2026-10-15" below; nothing is built yet.
**Owner:** Maintainers.
**Type:** MINOR. The headline is a new skill, which is the repo's MINOR test in [`../../skill-versioning.md`](../../skill-versioning.md).
**Previous:** v2.33.0 SHIPPED 2026-09-01 (tag `v2.33.0` at `7a42570e`; plan at [`../v2.33.0/plan_v2.33.0.md`](../v2.33.0/plan_v2.33.0.md)).

---

## Sequencing note, read before scoping

**The `[fictional]`-convention item is the root cause of four separate G1 recurrences in v2.33.0 and must be sequenced FIRST.** Every sample sweep should follow it, not precede it. Four consecutive adversarial rounds each found an incomplete marking sweep, and the reason is that the rule being enforced is written down nowhere: `README_SAMPLES.md` defines the convention number-scoped ("every invented metric", "any specific number") and `check-sample-no-fabricated-metrics.mjs` is percentage-scoped to match, so the methodology-prose marking rule those four rounds actually enforced has no source. A fifth recurrence is likely until it is authored.

---

## Scope, ruled 2026-10-15

Ruled in a maintainer decision sitting on 2026-10-15, after a status review found this stub still unscoped six weeks after v2.33.0 shipped.

**The dropped carry.** The v2.33.0 plan staged both AI-family keystones, `measure-ai-eval-spec` and `deliver-ai-behavior-spec`, for this release (see its "Not carried in" section, [`../v2.33.0/plan_v2.33.0.md`](../v2.33.0/plan_v2.33.0.md)). This stub did not carry them when it was seeded, so the carry is restored here and re-ruled.

| Item | Ruling | Why |
|---|---|---|
| `measure-ai-eval-spec` (new skill, measure phase) | **In v2.34.0, as the headline** | It is the measurement twin the behavior spec is checked against, and it carries the eval-review capability ([C-3 spec](../v2.32.0/spec_c3-ai-product-family.md) sections 2.3 and 9) |
| `deliver-ai-behavior-spec` (new skill, deliver phase) | **Moved to v2.35.0** | Every new skill costs at least an L-sized asset floor. One per release ships sooner, and v2.33.0 showed that authored scope churns under adversarial review |
| Eval-review capability | **Rides inside the eval spec** | Per C-3 spec section 2.3, it is `utility-pm-critic` pointed at the eval spec's `SKILL.md`, with no new rubric and no new sub-agent. The eval spec must therefore cover leakage, contamination, judge calibration, reward hacking, slice coverage, repeated-run variance and threshold validity |

**Gate before any build.** Run the control-arm test from C-3 spec section 7 for both keystones at the start of the cycle. It is cheap, and it settles the v2.35.0 input at the same time. A keystone that does not beat the no-skill control is not built.

**Prerequisite ruling.** D-A (distributional acceptance) is still open in C-3 spec section 10: does distributional acceptance route out of `deliver-acceptance-criteria` and into the eval spec (recommendation B)? The eval spec's scope depends on the answer, so D-A is ruled before the build starts. D-B (instrumentation privacy) and D-D (PRD increments) were in effect settled by what v2.33.0 shipped. D-E (plugin identity) and D-F (governance evidence map) stay deferred.

**Order inside the cycle.**

1. Section A item 1, the `[fictional]` convention, stays first. The eval spec ships three thread samples, and samples follow the convention.
2. The control-arm tests for both keystones, which can run beside item 1.
3. The D-A ruling, then the eval-spec build. The build adds the skill's baseline `HISTORY.md` by hand, because the skill-builder does not scaffold one yet (see the last bullet below).
4. Release gates G0 through G4, then the `agent-plugins` registry re-pin, which is the step that delivers the release to users.

**Also settled 2026-10-15.**

- [#279](https://github.com/product-on-purpose/pm-skills/issues/279) (skills-manifest.yaml, restore or retire) is ruled **retire**, and the retirement merged on 2026-10-15 as [#301](https://github.com/product-on-purpose/pm-skills/pull/301); see section D.
- Two contributor pull requests feed this cycle. [#287](https://github.com/product-on-purpose/pm-skills/pull/287) (PR-template checklist wording) had its expired CI re-run and approved, and it merged on 2026-10-15 as `05612b1b`. [#286](https://github.com/product-on-purpose/pm-skills/pull/286) would be the first published Model Trace Capture sample, answering good-first-issue [#282](https://github.com/product-on-purpose/pm-skills/issues/282). On 2026-10-15 it conflicted with the 202-sample counts. A review comment posted that day asks for a rebase, a line-ending fix in its test, and `Part of #282` in place of `Fixes #282`, because #282 has two other slots still open. **If the author has not responded by 2026-10-29, maintainers finish the rebase on the contributor's branch**, which allows maintainer edits.
- Release and dependency hygiene, 2026-10-15. Eleven Dependabot pull requests merged, including the Starlight 0.41.7 to 0.42.0 group bump ([#288](https://github.com/product-on-purpose/pm-skills/pull/288)). The v2.33.0 G4 pass had never reconciled `.release-please-manifest.json`, so shadow Release PR [#271](https://github.com/product-on-purpose/pm-skills/pull/271) kept proposing 2.33.0 after that version shipped. [#302](https://github.com/product-on-purpose/pm-skills/pull/302) reconciled it, release-please then reported no user-facing commits since the tag, and #271 was closed. See section B for the two G4 defects behind it.
- **Open consequence of the #279 ruling, found 2026-10-15.** `docs/internal/skill-versioning.md` now requires a `HISTORY.md` from a skill's first 1.0.0 release, but two shipped skills still follow the older second-version rule. `utility-pm-skill-builder` does not scaffold a `HISTORY.md`, and `utility-pm-skill-iterate` (Step 7) calls one premature before a skill's second version. Aligning them changes skill behavior and needs a version bump for each, so it was kept out of the docs-only retirement. It is a candidate for this cycle. No skill in this repo is affected today, because all 68 already carry the file.

## A. Carries from v2.33.0 section D

| # | Item | Why it carried | Notes |
|---|---|---|---|
| 1 | **The `[fictional]` convention has no written source** | Root cause of four G1 recurrences | **Sequence first.** Author the rule, then re-scope the validator to match it, then sweep |
| 2 | **The trace table's remaining multi-claim rows** (retention, sampling, terminal disposition) | R12-F1's fix stated the per-claim rule rather than re-splitting, deliberately leaving decomposition to a QA owner | The recorded case against the decline: it leaves decomposition to an owner who may not do it |
| 3 | **Retention's dropped evaluation-set copy question** | `measure-instrumentation-spec`'s `SKILL.md` requires it and the shipped template does not carry it | **This is a known gap that SHIPPED in v2.33.0.** It is the v2.33.0 deferral with the least mitigation: the new per-claim coverage rule does not touch it, because it is a content gap rather than a decomposition gap |
| 4 | **The opt-out row's subject scope** | Deferred with rationale at G1 round 12 | |
| 5 | **`SKILL.md` drift after the access split** | Deferred with rationale at G1 round 12 | |
| 6 | **Sibling samples carry unmarked invented methodology** | Library-wide audit, deferred from v2.33.0 | Depends on item 1. Do not run this sweep before the convention is authored. **Scope reduced 2026-09-10:** the 11 `orbit` and `legacy` samples were retired, so the denominator is 202 rather than 213. The 9 deleted `legacy` files were the least conformant in the corpus (pre-convention 5-field schema, no `thread:` field, zero `[fictional]` markers against roughly 60 unmarked quantitative claims), so the sweep's remaining scope is more uniform than the original count suggested |

## B. Release-runbook defects, all observed during the v2.33.0 cut

Carried under [#269](https://github.com/product-on-purpose/pm-skills/issues/269). Four defects, and three of them are the same family: a runbook or config that names two of something where the repo has three, or omits where a thing lives.

| Defect | Where | Consequence observed |
|---|---|---|
| **G2 names two manifests; the repo has three** | `site/src/content/docs/contributing/release-runbook.md` | Following G2 literally misses `.codex-plugin/plugin.json`. `validate-version-consistency` catches it, so it is a friction defect rather than a correctness one |
| **`release-please-config.json` `extra-files` also lists only two** | `release-please-config.json` | `.claude-plugin/marketplace.json` is absent from the list. Same family as the row above. **Probably not a defect (noted 2026-10-15):** v2.32.0 WS-6 removed that entry on purpose, because the marketplace release pin is generator-owned through `evalMarketplacePin`; see the WS-6 row of [`../v2.32.0/plan_v2.32.0.md`](../v2.32.0/plan_v2.32.0.md). Confirm before acting on this row |
| **G2.5 sub-check 7 says to record the captured SHA without saying where** | Runbook G2.5 | Recording it in a tracked file necessarily advances HEAD past the SHA just captured, and re-capturing recurses. **This produced the v2.33.0 tag-target ambiguity directly.** The fix is to state that the captured SHA is the authority and HEAD moving past it is expected, not a problem to resolve |
| **G4 sub-check 4 says the Release body is not auto-created** | Runbook G4 | `.github/workflows/release.yml` auto-publishes a generic body via `softprops/action-gh-release` on tag push. The real G4 task is replacing an already-public body, not authoring one into a vacuum |
| **Retire the predecessor runbook** (this is the oldest defect, and the largest) | [`../runbook_clean-worktree-cut-tag-publish.md`](../runbook_clean-worktree-cut-tag-publish.md) | 284 lines that **self-declare as canonical on line 7** against a **v2.5.0 baseline**, 28 minors stale. `release-plans/README.md` already labels it a predecessor, so two documents claim the same job and this is the one a maintainer reaches for. It carries a full parallel `pm-skills-mcp` release track (33 mentions: `$ROOT_MCP`/`$WT_MCP` variables, worktree setup, an entire numbered section 6, the `validate-mcp-sync` gate, npm publish steps, six verification checkboxes, and section 10.5.5) for a repo frozen since 2026-05-05, plus the wrong freeze version (says v2.9.2, is v2.9.3). **Do not surgically remove the MCP track**: that touches ~90 lines and renumbers sections to preserve a document that should not exist. **Replace the body with a redirect stub** to `site/src/content/docs/contributing/release-runbook.md` (which is current and contains zero MCP references), keeping the path so the historical inbound links from CHANGELOG and old audit docs do not rot. Roughly ten lines, and it retires the MCP track, the version error, the stale baseline, and the false canonical claim at once |

**Two more G4 defects, found 2026-10-15 and fixed the same day in [#302](https://github.com/product-on-purpose/pm-skills/pull/302).** First, the runbook's G4 never named the release-please manifest reconcile. It was done by hand for v2.31.1 and v2.32.0, and v2.33.0 skipped it, which left the shadow Release PR proposing a shipped version for six weeks. It is now G4 item 8. Second, `agents/pm-release-conductor.md` did not know about the delivery check. [#292](https://github.com/product-on-purpose/pm-skills/pull/292) added `check-delivery-pin.mjs` to runbook G4 as a P0, but the conductor's G4 list still named only the install path, so the conductor could have declared an undelivered release complete. The same pull request also writes the deferral sweep into G4 item 7, which is the step whose absence dropped this stub's keystone carry. All three belong to the family this section describes: a procedure that verifies less than the repo now requires. None of them closes [#269](https://github.com/product-on-purpose/pm-skills/issues/269), whose runbook reconciliation is still open.

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

**Status 2026-09-10.** Tier 0 (N1) and phase 4 (C3) are both **DONE**, untagged on `main`. C3's gating decision, publish-or-retire on the `orbit` thread, was ruled **retire**: all 11 `orbit` and `legacy` samples deleted, `SAMPLE_EXCLUDE` removed from `scripts/gen-site.mjs`, and the check re-scoped away from a condition that had become true by construction toward the one that mattered, thread-classification agreement, now shipped as `checkThreadTrio()` in `scripts/check-sample-counts.mjs` with fixtures. **C1 and C2 are also DONE as of 2026-09-10**, untagged on `main`: C1 as `scripts/check-delivery-pin.mjs` (G4 sub-check 2, deliberately not a pre-tag or CI check), C2 inside `gen-derived-surfaces --check`, which was already enforcing so it adds no new validator. Phase 1 of the program is therefore complete and the two defects that actually reached users are closed. What remains for this cycle is section A item 1, the `[fictional]`-convention authoring, which is still the item that must be sequenced first.

**What this cycle should take**, which is phase 1 plus the highest-value single change:

| Item | What it does | Effort |
|---|---|---|
| ~~**C1 delivery check**~~ | **DONE 2026-09-10.** `scripts/check-delivery-pin.mjs`, wired as G4 sub-check 2. Compares BOTH the registry version and `source.sha` against the tag. Not a pre-tag check (no tag yet) and not a CI check (no new tag on a push or PR, and it would fail for hours after a real one). Not a same-sitting blocker either: the real v2.33.0 gap was about eight hours, so it is a re-runnable question rather than a gate that would be routed around | **Done** |
| ~~**C2 manifest tail freshness**~~ | **DONE 2026-09-10.** `evalManifestTail()` in `scripts/gen-derived-surfaces.mjs`, asserted in its already-enforcing `--check` path, so it adds no new validator and leaves the program's four-validator budget untouched. Asserts only the LEADING version token, so a tail may still narrate an older release without tripping it | **Done** |
| ~~**N1 re-scope `check-version-references`**~~ | **DONE 2026-09-07 at `a5115727`: retired outright rather than re-scoped.** It reported 1287 findings at a near-zero true-positive rate, and its own header had said since v2.17.0 that the heuristic matched "~1000+ legitimate provenance refs repo-wide with zero real drift". A performance argument made in this row earlier, a "96x slower in bash than PowerShell" claim presented as measured, is **WITHDRAWN and must not be cited**: it measured a degraded MSYS environment (347ms per trivial process spawn against a healthy 2 to 10ms), not the script. The retirement stands on the signal argument alone | **Done** |

**The design rule worth carrying**, because it explains every one of the seven: each existing check answers the question *adjacent* to the one that matters. Valid rather than current. Condition rather than action. Differs rather than wrong. Has-samples rather than samples-reachable. Local tree rather than published artifact.

## D. Standing decisions still unruled

| Item | Carried since | Note |
|---|---|---|
| [#279](https://github.com/product-on-purpose/pm-skills/issues/279) **skills-manifest.yaml: restore or retire** | 2026-08-18 | **RULED 2026-10-15: retire.** Only 9 of 45 release folders ever carried a manifest, and every version a manifest held is also in that skill's `HISTORY.md`. The nine manifests and their validator are deleted, the two skills without a `HISTORY.md` gain one, and `docs/internal/skill-versioning.md` now points at the `HISTORY.md` Release column instead. Merged 2026-10-15 as [#301](https://github.com/product-on-purpose/pm-skills/pull/301), which closed #279 |
| **Tag the untagged delta as PATCH v2.33.1?** | 2026-10-15 | Open. `main` carries doc, validator and CI work since v2.33.0, and none of it reaches plugin users until a tag and a registry re-pin. A patch would ship it before this release does. **Evidence 2026-10-15:** every commit on `main` since `v2.33.0` is typed `docs`, `ci` or `chore`, including eleven dependency bumps, and no skill changed version. release-please agrees and proposes nothing. A patch would carry no fix, so the recommendation is to fold the delta into v2.34.0 |
| [#267](https://github.com/product-on-purpose/pm-skills/issues/267) | v2.32.0 | Blocks C-6, which is why release-please stays shadow-only. The v2.33.0 shadow PR, [#271](https://github.com/product-on-purpose/pm-skills/pull/271), was closed unmerged on 2026-10-15 under the shadow protocol, and the next one opens when a `feat` or `fix` lands |
| [#268](https://github.com/product-on-purpose/pm-skills/issues/268) | v2.32.0 | |

---

## The lesson v2.33.0 paid twelve rounds to learn

Measured across all 56 findings in the v2.33.0 G1 gate, split by what the fix that created the surface actually did:

**Fixes that DELETE a claim converged every time. Fixes that AUTHOR methodology or structure churned every time.**

The evaluation-sizing block produced zero findings across the nine rounds after D15 deleted its derivation. The trace block survived a symmetric rewrite, a choreography deletion with an authored replacement, and a row split, and produced a fresh high-severity finding after each one, because each authored something new to attack. Round 12's own headline finding was that the fix which split a row to assert "one claim per row" authored a replacement row carrying two.

**Do not let this cycle inherit twelve rounds as a norm.** A cycle whose fixes delete or mark should converge in the two or three rounds v2.32.0 took. If round counts start climbing again, that is the signal that the fixes have turned from deleting into authoring.

Pre-register the stopping condition before the gate opens, per D23. A quality-shaped rule ("stop when findings fall below severity X") assumes findings converge; when the fix rate equals the damage rate, that rule never fires.
