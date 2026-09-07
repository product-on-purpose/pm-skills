# Documentation currency and usefulness program

**Status: PROPOSED, 2026-09-05.** Owner: maintainers. Prompted by seven defects that all shipped with a fully green validator suite during the v2.33.0 cycle.

This document does not propose more validation. It proposes validation of a **different kind**, and the retirement of one check that produces none.

---

## 1. The diagnosis

Documentation correctness has three separable classes. This repository is excellent at one of them and has almost nothing for the other two.

| Class | The question it answers | Coverage today |
|---|---|---|
| **Consistency** | Do the artifacts agree with each other? | **Strong.** 20 enforcing validators |
| **Currency** | Are they true about the world *right now*? | **Almost none** |
| **Usefulness** | Are they any good to read? | **None** |

**Every defect this program targets is class 2 or class 3, and every one of them shipped while class 1 was fully green.** That is not a criticism of the validator suite, which is genuinely strong. It is a statement about what a consistency check can see.

### The recurring shape

Each existing check is technically correct and answers the question *adjacent* to the one that matters:

- `validate-registry` asks whether a pin is **valid**. A stale pin is perfectly valid. It never asks whether it is **current**.
- The `pm-skills-mcp` checklist row asked about a **condition**. The condition was true and the correct action was still nothing. It never asked for an **action**.
- `check-version-references` asks whether a version token **differs** from the current one. Most differences are correct history. It never asks whether a claim is **wrong**.
- `check-skill-sample-coverage` asks whether a skill **has** samples. It never asks whether those samples are **reachable**.
- `validate-plugin-install` exercises the **local tree**. It never touches the **published artifact**.

**Design rule for everything below: a proposed check earns its place only if it answers the question that matters, not the one nearby.**

## 2. The evidence

All seven observed between 2026-09-01 and 2026-09-05, all with 19 of 19 enforcing validators passing.

| # | Defect | Class | How it was actually found |
|---|---|---|---|
| 1 | v2.33.0 tagged, released, and **reaching no users for hours**. The `agent-plugins` registry still pinned v2.32.0 | Currency | A maintainer noticed an update not moving on another machine |
| 2 | All three manifest description tails **still pitched v2.32.0** two days after v2.33.0 shipped | Currency | Incidental. Someone happened to read them |
| 3 | The v2.33.0 release notes had **one outbound link in 63 lines** | Usefulness | The maintainer asked for something better |
| 4 | A release-checklist row asked a question with **no possible answer**, and had for months | Usefulness | Tripped over mid-cut |
| 5 | A 284-line runbook describes a release process for a repo **frozen since May**, and self-declares as canonical against a v2.5.0 baseline | Currency | Tripped over mid-cut, twice |
| 6 | `check-version-references` reports **1295 findings with a near-zero true-positive rate** | Signal | Read for the first time in this cycle |
| 7 | The `orbit` sample thread exists in `library/` but is **not published to the site**, so nothing links to it | Currency | Found while checking a draft link |

**Zero of seven were caught by tooling.** Six were caught by a human tripping over them, and the seventh only because someone finally read an advisory.

## 3. What is already covered

Listed so this program does not rebuild it. The enforcing suite answers these well and should not be touched:

structural conformance (`lint-skills-frontmatter`, `validate-agents-md`, `validate-commands`, the three family validators, `validate-docs-frontmatter`, `check-no-body-h1`), counts and their prose (`check-count-consistency`, `check-count-phrases`, `check-landing-page-counts`), cross-references (`check-skill-cross-references`, `validate-skill-family-registration`), version agreement across the three manifests (`validate-version-consistency`, `validate-codex-manifest`), sample presence (`check-skill-sample-coverage`), site integrity (`check-rendered-links`, `check-route-parity`, `check-root-doc-links`), and generated-surface drift (`gen-derived-surfaces`).

## 4. The gaps, prioritized

Ordered by value per unit of effort. Each entry names what it reads, what it asserts, and what it would have caught.

### Tier 0: retire `check-version-references` (DONE 2026-09-07)

**Retired on 2026-09-07.** Scripts, doc triplet, both bundle invocations, both CI steps, the manifest entry and every doc reference removed. The advisory tier is now empty; `run_advisory` / `Invoke-Advisory` are kept for the two advisory checks proposed in Tier 2.

**The justification, which is about signal and stands on its own:**

It reported **1287 findings at a near-zero true-positive rate**. Reading them, they are overwhelmingly legitimate history: "v2.16.0 introduces sub-agents", "the wrappers were removed in v2.22.0". The check flags any version token that is not today's.

This was **known and written down in the script's own header since v2.17.0**:

> its heuristic (flag any non-current vX.Y.Z) matches ~1000+ legitimate provenance refs repo-wide with **zero real drift**, so strict enforcement is deferred to v2.17.1 pending a precise current-version-claim heuristic

"Zero real drift", with the fix deferred to the next patch. **Sixteen minor releases later it was still running.** The script's own output also states that real current-version claim drift is enforced by `validate-version-consistency`, so the risk it nominally covered was already covered.

A check with no true positives, whose author documented that fact and whose stated risk is handled elsewhere, is not a check. It is 1287 lines of false assurance occupying the slot a real check would fill.

**A performance claim made here earlier has been WITHDRAWN.**

An earlier version of this section argued the check was also a gate hazard, citing 288s under bash against 3s under PowerShell, a "96x gap". That measurement is **not sound and should not be cited.**

It was taken on a machine whose MSYS bash environment had degraded during the session. Measured directly afterwards: **347ms per trivial process spawn**, against a healthy 2 to 10ms. Every "hang" observed that day, including a 120-second timeout on a plain `grep`, is explained by that. Removing the check did **not** fix the bash bundle, which then timed out at 402s on `lint-skills-frontmatter`, a validator with no relationship to what was removed. The PowerShell bundle completed in 23s throughout.

So the honest position is: the bash suite is slow on a wedged MSYS environment, the wedge is cleared by restarting the session, and **none of that is evidence about this script**. The retirement is justified by the signal argument alone, which is why it still stands.

**The transferable lesson, and the reason this is recorded rather than deleted:** a plausible mechanism plus a matching symptom is a hypothesis, not a measurement. This claim was corrected twice, first from "hangs forever" to "288 seconds", then from "288 seconds means the script is slow" to "the machine was slow". Both corrections came from running a control that should have been run first. **Before attributing a slowdown to code, measure the environment.**

### Tier 1: currency checks, cheap and mechanical

**C1. Delivery check (already queued for v2.34.0).**
Reads the `agent-plugins` registry `marketplace.json` over HTTPS, compares its `pm-skills` `version` and `source.sha` against the tag just pushed. Refuses "Release complete" while they disagree.
*Catches defect 1.* One unauthenticated fetch of a public file. **Effort: small.**

**C2. Manifest tail freshness.**
The three manifest descriptions are half-generated: `descriptionHeadline()` owns the counts, and everything from the first `vN.N.N` token onward is authored prose the generator preserves verbatim. Assert that the authored tail's version token equals the current version.
*Catches defect 2.* Roughly ten lines inside the existing generator, which already parses exactly this split. **Effort: small.**

**C3. Sample reachability.**
For every sample under `library/skill-output-samples/`, assert a corresponding published page exists under `site/src/content/docs/samples/`, or that the sample sits on an explicitly declared unpublished thread.
*Catches defect 7.* Requires one decision first: publish or retire the `orbit` thread. **Effort: small, after that ruling.**

**C4. Process-doc liveness.**
Narrow and rule-shaped rather than general: assert that any doc under `docs/internal/` claiming to be canonical for a process either **is** the canonical document, or redirects to it. Today two documents claim the release lane and the stale one is the one maintainers reach for.
*Catches defect 5, and prevents its recurrence after the redirect stub lands.* **Effort: small once the predecessor runbook is retired.**

### Tier 2: usefulness signals

Weaker signals by nature. Both are heuristics, and both should ship **advisory** and stay advisory unless they prove out.

**U1. Link-density floor on reader-facing pages.**
For release notes and guides, assert that a page naming N skills, samples or guides links at least some fraction of them. The v2.33.0 page named eleven skills and linked zero.
*Catches defect 3.* **Effort: medium. Advisory only.**

**U2. Orphan-page detection.**
Assert every published page is reachable from at least one other page or from the sidebar. `check-rendered-links` verifies that links **resolve**; nothing verifies that a page is **linked to**.
*Would have caught defect 7 from the other direction.* **Effort: medium. Advisory only.**

### Deliberately not automated

**Prose quality, tone, and "is this actually good".** Defect 3 was found because a human read the page and disliked it. No heuristic replaces that, and pretending otherwise would create exactly the false assurance N1 exists to remove.

The mitigation is procedural rather than mechanical: **a reader-facing page changed during a release gets read once, end to end, by a human, before the release closes.** One line in the hygiene checklist, no tooling.

## 5. Sequencing

Ordered so each phase is independently valuable and nothing blocks on a decision that has not been made.

| Phase | Items | Gated on |
|---|---|---|
| **1** | C1, C2 | Nothing. Both are small and self-contained |
| **0** | ~~N1a: retire `check-version-references`~~ | **DONE 2026-09-07** |
| **3** | C4 | Retiring the predecessor runbook (already queued under [#269](https://github.com/product-on-purpose/pm-skills/issues/269)) |
| **4** | C3 | A publish-or-retire ruling on the `orbit` sample thread |
| **5** | U1, U2, advisory | Phases 0 to 4 landing first, so the suite has credibility before adding fuzzy signals |

Phase 1 alone closes the two defects that had real user impact.

## 6. Meta-rules, so this does not become ceremony

Borrowed from the release hygiene checklist's own conventions, which were written for exactly this failure mode.

1. **Three-cycle removal candidacy.** Any check here that has not fired a true positive in three release cycles is a candidate for removal, and removing it is a success rather than a regression.
2. **Advisory checks that stay noisy get retired, not tolerated.** N1 exists because that rule was not applied to `check-version-references` for months. A check nobody reads is a check that is not running, and this one degraded from unread to actively hazardous without anyone noticing, precisely because nobody read it.
3. **No check ships without a fixture proving it fires.** A test that cannot fail converts an open question into a checked box, which is the lesson the v2.33.0 review gate paid twelve rounds to learn.
4. **Precision over recall for advisory checks.** A noisy advisory is worse than a missing one.

## 7. How we will know this worked

Falsifiable, and measured at the second release after phase 3 lands:

- **Primary:** zero currency defects found by a human that a Tier 1 check should have caught. The current baseline is six out of seven.
- **Secondary:** `check-version-references` is retired (done). Any replacement reports a number a person actually reads, under roughly 30 findings. Note the pre-tag bundle's bash-vs-PowerShell cost gap is an ENVIRONMENT issue, tracked separately; do not use it to justify validator changes.
- **Counter-metric, to catch this program overshooting:** total enforcing validators does not grow by more than four. If closing these gaps needs more than that, the design is wrong.

## Related

- [`release-plans/checklist_doc-update-and-hygiene.md`](release-plans/checklist_doc-update-and-hygiene.md), the standing per-release checklist, and the natural home for the manual read-through in section 4
- [`release-plans/v2.34.0/plan_v2.34.0.md`](release-plans/v2.34.0/plan_v2.34.0.md), which carries C1 and the runbook retirement that gates C4
- `agent-plugins` `docs/internal/orchestration/specs/auto-repin.md`, the registry-side half of defect 1
