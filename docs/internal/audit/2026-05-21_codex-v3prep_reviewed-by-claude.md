# Review of Codex Audit (2026-05-21 v2.18.x-to-v3 prep)

**Reviewer:** Claude (Opus 4.7, effort max)
**Review date:** 2026-05-22
**Source audited:** [`2026-05-21_codex-v3prep.md`](./2026-05-21_codex-v3prep.md)
**Repo state at review:** `main` HEAD `d854177` (== origin/main); tag `v2.18.0` -> `daf720e`; v2.18.0 SHIPPED.
**Method:** Re-read the full source audit, then re-verified its still-checkable claims against the post-ship working tree (not the pre-ship tree the audit ran against).

---

## Document purpose

The source audit is a high-quality, thorough piece of work. This review does not re-grade its findings on their original merits; it does one thing the source audit could not do for itself: **place it in time.** The audit was written before v2.18.0 shipped, and the release that followed resolved a large fraction of its findings. The job here is to separate what is already resolved from what is still live, verify the live claims against today's tree, and route the durable residue into the plans that own it so the audit does not rot as a one-off snapshot.

---

## Core thesis: this audit is a pre-ship time capsule

The source audit is dated 2026-05-21 and ran against HEAD `e0f59d3` ("add skill stubs + strategy briefs for W1-W4") - **before** v2.18.0 tagged. Between that audit and this review, v2.18.0 shipped through the 6-gate runbook plus an unusually deep verification arc: G1 pm-critic (4 sub-agents) + four Codex adversarial passes + internal cross-check, resolving ~26 findings across 6 commits, tagged at `daf720e`.

Consequence: roughly **half the audit's findings were overtaken by the ship** and must not be re-worked. The other half is still live, and a meaningful subset of that live half is **not yet captured** in any current plan. Triaging that split is this review's central output.

## A notable corroboration

This 2026-05-21 audit and the four Codex passes run during the 2026-05-22 ship were **independent Codex engagements.** The audit *predicted* a defect class in the abstract ("the release system's claims are now slightly ahead of its executable guarantees"). The ship's deep verification then *empirically struck* exactly that class: `docs/index.mdx` escaping the `*.md`/`*.json` count glob, backtick skill references resolving to non-existent skills, README ToC anchors orphaned by heading renumbering. Two independent analyses converging on the same root cause is strong evidence that the root cause is real, and that the v2.19.0 validator-hardening lane is correctly aimed.

---

## Finding-by-finding triage

| Finding | Status today | Note |
|---|---|---|
| P0 (none) | n/a | Audit correctly found no P0 in the v2.17.0 catalog. |
| P1-02 count math (plan said "26 to 28 discover") | **Resolved by ship** | Shipped 59 -> 63, phase 26 -> 30, discover 3 -> 5, define 4 -> 5, measure 5 -> 6. Counts independently re-derived during the arc. |
| P1-03 specs vs strategy briefs unreconciled | **Resolved by ship** | Skills shipped with the *strategy-brief* identities (parallel multi-framework prioritization, multi-method market triangulation), not the single-method spec framing. |
| P2-02 mode design before content | **Resolved by ship** | Quick-estimate / parallel-framework / linear-cyclical-multi-actor / qualitative-confidence modes shipped. |
| P2-03 sample realism is dominant risk | **Resolved by ship** | `[fictional]` tags + EXAMPLE disclaimers + real method sources were a central focus of the verification arc. |
| P2-01 unshipped-skill references | **Mostly resolved** | Unhedged refs to non-existent skills removed; hedged `deliver-roadmap` ("when shipped") kept. FU-2 will enforce going forward. |
| P3-02 plan open decisions unresolved | **Resolved by ship** | Plan flipped to SHIPPED at G4. |
| P2-05 script-ify auditor cross-cutting checks | **Partially captured** | FU-2 (`check-skill-cross-references`) adopts one of the audit's five candidates. |
| P2-04 CI advisory noise (460 + 1153 matches) | **Live, partial** | Only the `check-version-references` strict heuristic is noted (as a v2.17.1 fast-follow). |
| **P1-01 release-gate vs CI parity** | **Live, NOT in any plan** | Genuine residual value. See below. |
| **P1-06 `.gitattributes` / CRLF fragility** | **Live, verified missing** | Genuine residual value. See below. |
| **P1-07 missing script companion docs** | **Live, verified missing** | Both `.md` companions confirmed absent. |
| P2-07 build "Entry docs -> 404 was not found" | Live, low priority | v2.18.0 built 363 pages with 0 errors; likely a benign post-build artifact. |
| P3-01 workflows miscount (`_workflows/index.md`) | Minor | Folds into FU-1 / FU-5. |
| P1-04 v3 marketplace naming conflict | **Resolved 2026-05-22** | Host repo `agent-plugins`; marketplace name `product-on-purpose`. See pushback below. |
| P1-05 v3 unpinned / placeholder entries | **Largely mooted** | Live `agent-plugins` repo supersedes the draft skeleton; mark skeleton stale in v3 planning. |
| P2-06 v3 upgrade tests, not only fresh-install | **Live (v3 lane)** | Now specified: dual-home transition + upgrade smoke matrix (installs do not auto-migrate). |

---

## Verification evidence (re-checked against the post-ship tree)

| Audit claim | Re-verified today | Result |
|---|---|---|
| No `.gitattributes` (P1-06) | `Glob .gitattributes` | **Confirmed absent.** Claim still holds. |
| Two family-validator docs missing (P1-07) | `Glob scripts/validate-{design,foundation}-sprint-skills-family.md` | **Confirmed absent.** Both still missing. |
| v3 skeleton exists with conflicting naming (P1-04/05) | `Glob docs/internal/release-plans/v3.0.0/**/*` | **Confirmed present:** `marketplace.json`, `README.md`, `plugin-repo-checklist.md`. Naming unchanged. |
| v2.19.0 follow-ups captured | Read `docs/internal/release-plans/v2.19.0/plan_v2.19.0.md` | FU-1..FU-5 present; the four P1-01/06/07 + P2-04 items are **not** among them. |

The count-math (P1-02), spec-reconciliation (P1-03), mode (P2-02), and sample-realism (P2-03) findings were taken as resolved on the strength of the v2.18.0 session log and CONTEXT currency rather than re-derived here, because they were demonstrably the explicit subject of the verification arc.

---

## Where the audit still earns its keep

The v2.19.0 stub captures FU-1..FU-5, which emerged from the *ship*. The audit surfaces **four durable findings the stub misses entirely.** These are the residual value.

1. **P1-01 - release-gate documentation vs reality.** The audit is correct that `pre-tag-validate.{ps1,sh}` does not itself run `npm run build`, edit-link verification, `validate-plugin-install`, or cross-doc checks, while the runbook and `ci-overview.md` imply the local bundle equals CI. I would narrow the framing: the *process* already compensates - the pm-release-conductor's G0 ran the bundle **plus** Astro build **plus** watched CI to green during v2.18.0. So this is a **documentation-accuracy gap, not a missing-capability gap.** Cheapest correct fix is the audit's option 2 (tighten the claim to "pre-tag bundle covers validator scripts; the release gate additionally requires build, edit-link, plugin-install, and cross-doc checks"). The consolidated `scripts/release-validate.{ps1,sh}` is worth building only when v3 makes install-path validation load-bearing; I would not build it for v2.19.0.

2. **P1-06 - `.gitattributes`.** Verified absent. Cheap, low-risk, and corroborated by the project's own session-log gotchas (CRLF plus node-PATH false-reds on Windows Bash). Strong agree, with one caution: renormalization must be its own dedicated commit, and with `core.autocrlf=true` the index churn should be confirmed before committing. Good v2.19.0 candidate.

3. **P1-07 - two missing script-docs.** Verified absent (`validate-design-sprint-skills-family.md`, `validate-foundation-sprint-skills-family.md`). Authoring them is trivial; the more valuable decision the audit raises is whether `validate-script-docs` should graduate from advisory to enforcing. Bundle this with FU-4 (the `validate-mcp-sync` removal) as a single validator-policy item.

4. **P2-04 - advisory noise.** 460 + 1153 advisory matches train maintainers to ignore warnings, which erodes the value of every future real warning. The audit's "trend-based / allowlist current-claims-only" recommendation is sound and dovetails with the `check-version-references` strict-heuristic note already sitting in the stub as a v2.17.1 fast-follow.

---

## Where I would push back on the audit

- **P2-05 ("convert five cross-cutting checks to scripts") is too broad.** Be selective. `check-skill-command-symmetry` and `check-forward-skill-references` (the latter == FU-2) are high-value; `check-marketplace-pinned-sources` is genuinely v3-scoped; the remaining candidates are speculative. Adopt two, defer three. The governing principle the audit states - "any defect class found twice should become a script" - is the right filter, and most of the five have not yet failed twice.
- **P2-07 (the build 404 message) reads as more ominous than warranted.** The clean 363-page v2.18.0 build suggests a benign post-build sidebar or base-path artifact, not a latent docs regression. Do not let it gate anything; investigate opportunistically.
- **P1-04 (v3 naming) - RESOLVED 2026-05-22 (maintainer input).** The decision is settled and supersedes both the audit's `agent-skills` assumption and the draft skeleton's `product-on-purpose/plugins`. Two names that differ by design: the **host repo is `agent-plugins`** (`product-on-purpose/agent-plugins`, typed once at `marketplace add`), and the **marketplace `name` field is `product-on-purpose`** (the install identity, `pm-skills@product-on-purpose`). The real host repo already exists (private, populated, pushed). Consequence: **P1-05 is largely mooted** - the live repo supersedes the `marketplace-repo-skeleton/` draft, which should be marked stale or deleted in v3 planning. **P2-06 remains live** and gains specificity: existing installs are keyed `pm-skills@pm-skills-marketplace` and do not auto-migrate, so v3 needs a dual-home transition (keep the old self-hosted marketplace alive for a deprecation window) plus the upgrade smoke matrix. These are now recorded in [`plan_v2.19.0.md`](../release-plans/v2.19.0/plan_v2.19.0.md) under "v3 context."

---

## Recommended action: harvest the residue into the owning plans

> **Status update (2026-05-22):** This recommendation has been executed. FU-6..FU-9 are now live in [`plan_v2.19.0.md`](../release-plans/v2.19.0/plan_v2.19.0.md), and the v3 findings (P1-04 resolution, P1-05 supersession, P2-06 specifics) are recorded there under "v3 context." The sections below are preserved as the rationale for those plan entries.

The audit's durable value will decay if it stays a standalone document. The highest-leverage move is to convert the live, not-yet-captured findings into owned plan rows.

### Into the v2.19.0 stub (proposed FU-6..FU-9)

| # | Follow-up | Source finding | Effort |
|---|---|---|---|
| FU-6 | Correct the release-gate claim in `release-runbook.md`, `ci-overview.md`, and `pm-skill-auditor.md`: pre-tag bundle covers validator scripts; release gate additionally requires build + edit-link + plugin-install + cross-doc. Defer any `scripts/release-validate.{ps1,sh}` to v3. | P1-01 | Small |
| FU-7 | Add `.gitattributes` (`*.sh eol=lf`, `*.ps1 eol=crlf`, `*.mjs/.js/.json eol=lf`, `*.md text`) and renormalize affected scripts in a dedicated hygiene commit. Document the Windows node-PATH gotcha in `ci-overview.md`. | P1-06 | Small |
| FU-8 | Author the two missing family-validator docs; decide whether `validate-script-docs` becomes enforcing or gets a tracked allowlist. Bundle with FU-4. | P1-07 | Small |
| FU-9 | Reduce advisory noise: allowlist or current-claims-only heuristics for `check-stale-bundle-refs` and `check-version-references` so new matches are visible and historical ones are summarized. Consolidate with the existing v2.17.1 `check-version-references` note. | P2-04 | Medium |

### Into the v3.0.0 planning area

- Lock the marketplace naming decision (P1-04) **before** any v3 implementation, since it is install-path API and a late rename invalidates docs, examples, and cached identity.
- Make the skeleton JSON production-safe (P1-05): require `sha` on every production entry, move examples to `marketplace.example.json`, and drop placeholder `strict: true` entries.
- Add the v3 G4 install/upgrade smoke matrix (P2-06): fresh install, upgrade from the old `pm-skills-marketplace`, remove-old-then-add-new, direct-repo install, and pinned-entry-matches-SHA.

### Sequencing

- **Now (v2.19.0, cheap, additive):** FU-6, FU-7, FU-8, FU-9. These pair naturally with the existing FU-1..FU-5 validator-hardening lane and ship as a CI/hygiene patch.
- **Before any v3 code:** confirm naming (P1-04), then write P1-05 and P2-06 correctly the first time.

---

## Bottom line

The source audit is better than most pre-release reviews and its central thesis - claims slightly ahead of executable guarantees - was independently validated by the very release that followed it. Treat it accordingly: do not re-work the half the ship already closed, and do not let the live half evaporate. Four durable findings (P1-01, P1-06, P1-07, P2-04) deserve seats in the v2.19.0 stub; three v3 findings (P1-04, P1-05, P2-06) deserve seats in v3 planning, gated on the naming decision. Once those are seated, this audit has done its job and can be left as frozen provenance.
