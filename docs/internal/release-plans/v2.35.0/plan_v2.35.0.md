# v2.35.0 Release Plan: STUB

**Status:** **STUB, seeded 2026-10-17** during the v2.34.0 G4 post-tag hygiene pass. **Headline ruled 2026-10-29: C, a quality release** (see "Headline ruling" below). Scope is otherwise not set. This file exists so the v2.34.0 carries have a home, as runbook G4 item 7 requires.
**Owner:** Maintainers.
**Type:** Expected MINOR. A quality release: sections A and B are the carries, and no user-facing headline ships.
**Previous:** v2.34.0 SHIPPED 2026-10-17 (tag `v2.34.0` at `31e46928`; plan at [`../v2.34.0/plan_v2.34.0.md`](../v2.34.0/plan_v2.34.0.md)).

---

## Sequencing note, read before scoping

**This release is ruled a quality release (option C), and that ruling is explicit.** v2.34.0's planned headline failed its control-arm gate, and so did this release's leading candidate (option A, below). A release made only of carries is the inward-facing pattern the v2.34.0 stub warned about; it is chosen here deliberately because no user-facing candidate cleared its gate.

**Item A1 goes first among the carries,** because it is a gap that shipped in v2.33.0 and is still shipping.

### Headline options under evaluation

These were the candidates for the headline decision. They were scored against fixed criteria (user value, evidence strength, differentiation, cost, risk and reversibility), and the leader then had to pass its gate.

**Headline ruling, 2026-10-29: C, by the gate rule.** Option A scored highest, so it had to survive a pre-registered falsification pilot. B, D and E fell below the scoring floor. The pilot failed, so no option cleared its gate, and the table below names C as the fallback in that case. Maintainers may override this ruling; it is one commit.

**The pilot.** It tested `deliver-prd`, `define-problem-statement` and `discover-interview-synthesis`, with skill files read at `92263b42`. Each skill ran in three arms: the full skill, its template alone, and no skill. Each arm wrote one artifact for each of three fictional scenarios with planted traps. Three blind judges per skill compared the arms. A skill "adds value" if at least 2 of 3 judges say it changed a decision for the better than the no-skill arm.

- **Result: 0 of 3 skills added value.** Value votes were 0, 1 and 0 of 3. The template alone matched the full skill on `deliver-prd` (3 of 3 judges) and on `discover-interview-synthesis` (2 of 3). On `discover-interview-synthesis`, the no-skill arm ranked first in all nine of the judges' rankings. The full `define-problem-statement` skill beat its own template in all nine rankings, but not the no-skill arm.
- **What the result does not show.** Every arm ran on the same capable model with complete scenario data, and every arm caught 7 to 9 of the 9 planted traps. The pilot therefore cannot say whether a skill helps a weaker model or a user who brings thin inputs. Each skill's verdict rests on nine artifacts.
- **What follows.** Option A's per-skill result lines are not published, because publication was conditional on passing. The result raises a separate question about where the catalog's value lies, which maintainers will decide on its own.

| Option | What it is | Gate before it ships |
|---|---|---|
| A. Evidence per skill | Test the shipped skills against a no-skill control, starting with the most-used. Publish one line per skill on what it adds over a plain model, and sharpen or fold the skills that lose | A falsification pilot on three skills must show that the skills add value. **Failed 2026-10-29: 0 of 3** |
| B. Coverage | Add a skill where the catalog is thin, such as go-to-market or analytics | The new skill must beat a no-skill control before it is built, the same gate that stopped four earlier candidates |
| C. Quality release | Ship the carries in sections A and B as a minor release with no headline | None. This is the fallback if no other option clears its gate. **Ruled 2026-10-29** |
| D. Template-first simplification | Proposed by external research. Strip a skill's instruction prose and keep its frontmatter and output template, starting with `deliver-prd`. It rests on the v2.27.0 informed-control finding, which covered four other skills | The same pilot as A, with a template-only arm, run on `deliver-prd` itself before any instructions are removed. **Measured 2026-10-29:** on `deliver-prd`, the template alone matched the full skill (2 judges called them equal, 1 preferred the template), so the instruction prose added nothing measurable. The template did not beat the no-skill arm either (2 equal, 1 for the template). D stays dropped by its score |
| E. Draft-to-final diff capture | Proposed by external research. Prompt the agent to record what the user changed between its draft and the accepted version, so the library learns what users fix, without telemetry | A design that keeps the record on the user's machine. The nearest incumbent is `foundation-meeting-recap` |

---

## A. Carries from v2.34.0 (ruling R5 = B, and the v2.34.0 G1 gate)

Rows A1 to A4 are the `measure-instrumentation-spec` carries, copied from v2.34.0 plan section A items 2 to 5 and ordered as ruling R5 directed, with the shipped gap first.

| # | Item | Why it carried | Notes |
|---|---|---|---|
| A1 | **Retention's dropped evaluation-set copy question** | `measure-instrumentation-spec`'s `SKILL.md` requires it and the shipped template does not carry it | **Fixed in [#331](https://github.com/product-on-purpose/pm-skills/pull/331)**, `measure-instrumentation-spec` 3.0.1 (PATCH: the template now asks what the skill already required). It was a known gap that shipped in v2.33.0 |
| A2 | **The trace table's remaining multi-claim rows** (retention, sampling, terminal disposition) | v2.33.0 R12-F1's fix stated the per-claim rule instead of re-splitting, leaving decomposition to a QA owner | The recorded case against that decline: it leaves decomposition to an owner who may not do it. Splitting rows is an authored fix, the class that churned in v2.33.0's G1 |
| A3 | **The opt-out row's subject scope** | Deferred with rationale at v2.33.0 G1 round 12 | |
| A4 | **`SKILL.md` drift after the access split** | Deferred with rationale at v2.33.0 G1 round 12 | |
| A5 | **`utility-pm-release-conductor` still offers a known-regression waiver for a delivery P0** | v2.34.0 G1 round 2, finding R2-F1, the remainder outside the fix pass | `skills/utility-pm-release-conductor/references/TEMPLATE.md` lines 63 to 65 list "logs the P0 as a known regression" as a way to emit "Release complete", which the runbook and `agents/pm-release-conductor.md` now forbid for a delivery P0. **Fixed in [#331](https://github.com/product-on-purpose/pm-skills/pull/331)**, `utility-pm-release-conductor` 1.0.2. Classified PATCH on 2026-10-29: the "what done means" change landed in the sub-agent in v2.34.0, so the template was a stale copy rather than a new contract |

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
| D-E (plugin identity), from the aggregated AI-skills roadmap decisions | Deferred. The v2.34.0 plan says it "stays deferred", and the v2.35.0 seed missed it |
| D-F (governance evidence map), from the same decision set | Deferred. The v2.34.0 plan says it "stays deferred", and the v2.35.0 seed missed it |
| [#267](https://github.com/product-on-purpose/pm-skills/issues/267) | Blocks C-6, which is why release-please stays shadow-only |
| [#268](https://github.com/product-on-purpose/pm-skills/issues/268) | Carried since v2.32.0 |
| [#286](https://github.com/product-on-purpose/pm-skills/pull/286) (Model Trace Capture sample, a contributor's pull request) | **Done 2026-10-29.** Maintainers finished it on the contributor's branch and merged it as `3a254870`, as "Part of #282". Samples are now 203 |
| `deliver-ai-behavior-spec` and the eval-review capability | **Closed, no carry.** The v2.34.0 plan listed the behavior spec as "moved to v2.35.0", but its control-arm gate failed (1 of 3 judges), and a failed gate closes the skill. The eval-review capability rode inside `measure-ai-eval-spec`, which also failed its gate (0 of 3), so it has no carrier. Reopening either needs a new design that beats a no-skill control |
| [#308](https://github.com/product-on-purpose/pm-skills/pull/308) (a `deliver-prd` AI Behavior sample, a fork pull request) | Waiting on its contributor; a review comment is posted |

## D. Parked maintenance, no ruling needed

- Add the manifest checks to the pre-tag bundle.
- Fix the Format example in `docs/internal/skill-versioning.md`.
- Tighten `trancheFor` in the fabricated-metrics checker.
- `README.md` says "invocation examples for all five sub-agents". The catalog has six, one of them the internal `pm-skill-router`, so the phrase may be intentional; verify against the guide it describes.

## E. Landed on main since v2.34.0 (untagged)

This ledger is for the G2 CHANGELOG pass. Update it as pull requests merge.

| Pull request | What landed | In `[Unreleased]`? |
|---|---|---|
| [#286](https://github.com/product-on-purpose/pm-skills/pull/286) | Brainshelf Model Trace Capture sample; samples 202 to 203 | Yes, Added |
| [#326](https://github.com/product-on-purpose/pm-skills/pull/326) | Standard 0.17 at Bronze: a new `library.json` (a fifth version surface) and 41 reference links repointed to `site/src/content/docs/` | No, add at G2 |
| [#331](https://github.com/product-on-purpose/pm-skills/pull/331) | Items A1 and A5: `measure-instrumentation-spec` 3.0.1 and `utility-pm-release-conductor` 1.0.2 | Yes, Fixed |
| [#333](https://github.com/product-on-purpose/pm-skills/pull/333) | `library.json` becomes a checked version surface: `validate-version-consistency`, release-please `extra-files`, `check-count-phrases`, runbook G2 step 1 and the conductor's G2 row | No; tooling, record at G2 only if the release notes cover tooling |
| [#335](https://github.com/product-on-purpose/pm-skills/pull/335) | The headline ruling: C, after option A failed its pilot (0 of 3) | No; the release summary states it at G2 |
| [#322](https://github.com/product-on-purpose/pm-skills/pull/322), [#323](https://github.com/product-on-purpose/pm-skills/pull/323), [#325](https://github.com/product-on-purpose/pm-skills/pull/325), [#328](https://github.com/product-on-purpose/pm-skills/pull/328), [#329](https://github.com/product-on-purpose/pm-skills/pull/329), [#330](https://github.com/product-on-purpose/pm-skills/pull/330) | Dependency updates. #329 patches a CPU-exhaustion advisory in `postcss-selector-parser`. #330 supersedes #327 and moves the site to Astro 7.4.2, whose Node floor is 22.23.4; CI reads `.nvmrc` (24) | Summarize as a count, as v2.34.0 did |
