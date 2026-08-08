# Remember: project memory + memory-aware cohort (PROMOTED to v2.32.0)

> **PROMOTED 2026-08-07 to the v2.32.0 cycle as candidate C-1 (memory artifact ledger, F-48).** Scope
> was ruled D1 = C (full-slate composite) on 2026-08-02; see
> [`../../v2.32.0/plan_v2.32.0.md`](../../v2.32.0/plan_v2.32.0.md), workstreams WS-1 (ratification packet),
> WS-2 (B1 keystone build), WS-3 (B2 cohort). **This plan is annotated, not rewritten**, per the
> standing v2.31.0 staging instruction: extend, never re-author. Everything below is the original
> parked text and remains the design of record except where this block or the delta spec supersedes it.
>
> **Superseding facts as of 2026-08-07 (WS-1):**
> - **D2 (write posture) is RULED and the parked recommendation is superseded.** The parked spec
>   recommends auto-append; the maintainer ruled **propose-then-confirm by default with an opt-in auto
>   mode** (v2.32.0 decision D3 = C, 2026-08-02). Build to the ruling, not to the parked recommendation.
> - **Ledger semantics are added** by [`spec_ledger-delta.md`](spec_ledger-delta.md), which extends
>   `spec_project-memory.md` with artifact IDs, content hashes, provenance chains, and orchestrator
>   execution state, per issue [#223](https://github.com/product-on-purpose/pm-skills/issues/223).
> - **F-54 is CONFIRMED FREE** for B2 (memory-aware cohort). Verified 2026-08-07 against the live issue
>   list: no issue claims F-54; F-55 is issue #209 (`foundation-stakeholder-briefings`, closed) and F-56
>   is issue #149 (`foundation-build-risk-review`, closed); `docs/internal/roadmap.md` reserves F-45
>   through F-53 as candidates. One leg unverified: the maintainer-local untracked backlog, which
>   `roadmap.md` names as a second ID authority.
> - **Type correction.** The header below says the catalog stays at 67. It is 68 as of v2.29.0. The
>   MINOR classification and the no-new-skill statement both still hold.
>
> **RATIFIED 2026-08-07 (WS-1), all three:**
> - **Parked D1 (structure-over-prose): RATIFIED as drafted.** Structure-first (templates, triggers,
>   boundaries) is the standing design principle; keep prose lean. The weak-model re-test is scheduled
>   as a one-shot calibration before the next *content* cycle, not before this memory cycle, since
>   memory is structural by construction. Record in skill-builder guidance when B2 lands.
> - **Parked D3 (cohort membership): RULED C, the full 8-skill cohort as specced.** Members:
>   `discover-interview-synthesis`, `deliver-prd`, `foundation-okr-writer`, `iterate-retrospective`,
>   and all four `foundation-meeting-*` skills (agenda, brief, recap, synthesize). This exceeds the
>   4-7 range the v2.32.0 plan stated; that plan's text is corrected to 8 rather than the cohort being
>   trimmed to the text. The maintainer ruled with the feasibility case heard, exactly as with the
>   cycle-level D1 = C scope ruling. **Recorded risk, not re-argued:** 8 skills means 8 MINOR bumps,
>   8 HISTORY rows, and a derived-surface regeneration, while WS-6 is separately changing where and
>   when the generator runs on release branches. Two moving parts on the same plumbing in one cycle.
>   The within-cohort drop order below is the safety net.
> - **Resume posture: RULED A.** The ledger records orchestrator execution state; the orchestrator's
>   no-resume halt text is UNCHANGED this cycle and that is now an acceptance item. Resume becomes
>   possible later without being promised now.
>
> **Two rows below predate this ruling and are superseded by the 8-name list above.** The Committed
> scope table's B2 row names only seven members and omits `discover-interview-synthesis`, which is the
> canonical writer in the demonstration loop; the D1 row still reads RECOMMENDED. Both are left as
> authored, per extend-never-re-author. **The annotation is authoritative where they conflict.**
>
> **Within-cohort drop order (WS-3), if capacity bites.** Drop from the bottom up; never re-open the
> membership ruling under pressure:
> 1. `foundation-meeting-agenda`, `foundation-meeting-brief`, `foundation-meeting-synthesize` drop
>    FIRST. Each is a per-skill cost that neither completes the demonstration loop nor exercises a
>    write target the rest of the cohort misses. Dropping all three lands at 5.
> 2. `foundation-okr-writer` and `iterate-retrospective` drop next, landing at 3.
> 3. `foundation-meeting-recap` is held above those two: it is the only cohort member that writes the
>    `## Decisions` section, so without it half the schema ships unexercised.
> 4. **`discover-interview-synthesis` and `deliver-prd` never drop.** They are the writer-to-reader
>    loop the cohort exists to demonstrate; without both, B2 proves nothing.
>
> ---
>
> **Historical: PARKED 2026-06-22 - deferred from v2.29.0 to `_unreleased/project-memory/`.** The maintainer reprioritized the pre-build risk gate (`foundation-build-risk-review`, issue #149) into v2.29.0 ahead of this memory train. This plan is revivable as-is; its target version is unassigned until re-slotted. Internal "v2.29.0" references below are historical - the slot now belongs to the pre-build gate (`docs/internal/release-plans/v2.29.0/`).

**Status:** PARKED in `_unreleased/project-memory/` (revivable). Prior status: PROPOSED (promoted from STUB 2026-06-17; renumbered v2.28.0 -> v2.29.0 on 2026-06-19 when v2.28.0 was reassigned to the `foundation-stakeholder-briefings` skill). Theme committed; scope rows are proposed, not locked; effort briefs + GitHub issues are the next execution-time step (not filed yet).
**Owner:** Maintainers
**Type:** MINOR (additive: a new project-state file + memory contracts on an existing skill cohort; no skill removed or renamed). Catalog stays at its post-v2.28.0 count (67) unless a new skill is added (none planned).
**Theme:** **Remember.** Give the plugin durable project memory and make a first cohort of skills read and write it, so the catalog compounds across a session instead of starting cold each time.
**Created:** 2026-06-15 (stub) | **Promoted:** 2026-06-17 | **Renumbered:** 2026-06-19 (was v2.28.0)
**Previous:** v2.28.0 (`foundation-stakeholder-briefings`, the 1-to-N audience fan-out skill) - see [`../../v2.28.0/plan_v2.28.0.md`](../../v2.28.0/plan_v2.28.0.md).

---

## Renumber note (2026-06-19)

This plan was authored as v2.28.0 and renumbered to v2.29.0 when the maintainer assigned v2.28.0 to the new `foundation-stakeholder-briefings` skill (an additive content skill that was ready to plan first). The memory train is the more entangled change (the plugin's deeper hook/cohort coupling), so de-coupling it into its own later release keeps a stumble in either release from blocking the other. The v2.29.0 number is tentative; confirm sequencing against the content-train order in `_LOCAL/pm-skill-comparison/roadmap/02-roadmap.md` when this is slotted.

## Why this theme, now

The competitive roadmap (`_LOCAL/pm-skill-comparison/roadmap/02-roadmap.md`, Pillar B) and the operating roadmap (`docs/internal/roadmap.md`, §4.4) both put memory next, and the prioritization scores it highest (Bar 3 / Moat 3 / Effort 2 = 8, the top of the table). The reason it outranks additive features: it is a **winner-take-the-dimension** race. The rival pairing (PM Brain + the competitor `phuryn/pm-skills`) is positional only today - one README mention, zero code coupling (verified 2026-06-12). A pm-skills cohort with real read/write contracts is structural integration that a README edit cannot match, and the wargame flags this as "the one race where second place loses the dimension." Shipping the keystone (B1) before any competitor couples memory into their skills is the whole point of sequencing it here.

The v2.27.0 informed-control finding reinforces the bet rather than competing with it (see Decision D1): the dimension that measurably carries artifact value is **structure**, and memory contracts are structure (typed state, provenance tags, section-shaped reads/writes), not more prose.

## Committed scope (proposed)

| ID | Initiative | One-line intent | Size | Depends on |
|---|---|---|---|---|
| **B1 (F-48)** | Project-memory keystone | A gitignored `.claude/pm-skills.local.md` holding current Triple Diamond phase, active initiative, and artifacts produced; the shipped `SessionStart` router (F-44) reads it; skills append to it. No MCP, no DB. | M | none (F-44 shipped v2.25.0) |
| **B2 (F-54, provisional)** | Memory-aware skill cohort | A first cohort (`deliver-prd`, `foundation-okr-writer`, `iterate-retrospective`, the `foundation-meeting-*` family) declares read/write contracts against B1 state, with provenance tags (observation / interpretation / hypothesis / decision). This is the "real coupling" vs positional pairing. | M | B1 |
| E1/E2 (opt) | Trust posture docs (ride-along) | `SECURITY.md` + a provenance/release-integrity statement; small, the roadmap pairs them with this train. Include only if they do not slow the memory work. | S | none |

**ID note:** F-48 is reserved for B1 in the operating roadmap. B2 has no reserved ID; **F-54 is provisional** (F-45..F-53 are taken by F-45 output style, F-46 auto-critic, F-47 userConfig, F-48 project state, F-49 dynamic context, F-50 context fork, F-51 MCP, F-52 PM coach, F-53 monitors; **F-55 is now taken by `foundation-stakeholder-briefings` in v2.28.0**). Confirm F-54 is free against the GitHub issue list before filing.

**Design detail:** [`spec_project-memory.md`](spec_project-memory.md) (the `.local.md` schema, the contract mechanism, provenance tags, the per-skill cohort read/write map, and the open questions).

## Open Questions / Decisions

| # | Decision | Status |
|---|---|---|
| D1 | Skill design invests in structure (templates + triggers + boundaries) over added prose rigor; re-test on a weak model before generalizing | RECOMMENDED (maintainer to ratify) |
| D2 | B1 state file format + whether skills write it directly or only propose writes | OPEN (see spec) |
| D3 | Cohort membership for B2 | **RULED C 2026-08-07: 8 skills.** See the PROMOTED annotation at the top of this file for the authoritative member list. The "first 4-7 skills" framing this row originally carried is superseded. |

### D1 - Structural value: where future skill investment goes

**Status:** RECOMMENDED, maintainer to ratify. The cheap precondition for B2 and every later content cycle.

**Context / value.** The v2.27.0 informed-control eval (`docs/internal/release-plans/v2.27.0/records/output-eval-informed-20260615.md`) ran three arms - skill (instructions + template) vs informed (template only) vs freehand (scenario only). Two results: using a pm-skill beats freehand by **+1.2 to +2.2** where the scenario discriminates (the real, defensible quality claim), but the **template-only arm tied or beat the full skill in all four cases**. So for these PM artifact types under a strong model, the measured value is the skill's **structure (its section template), not the prose instructions' added rigor.** Caveats that bound it: the template *is* the skill's distilled methodology (a legitimate home for the value); rubric circularity (the rubric is transcribed from each skill's own checklist, so it rewards template-conformance); the eval ignores triggering, boundaries, edge-case robustness, and coaching (all real skill value); and the result is conditioned on a capable generation model.

**Solutions + recommendation.**
- **(a) Structure-first (recommended).** Bias future skill effort toward templates, triggers, and boundaries (When NOT to Use, output contracts) and keep prose lean. This is cheap to adopt and it is exactly what B2's memory contracts already are - typed, section-shaped state - so the memory train becomes the first expression of the principle, not a separate bet. (The v2.28.0 `foundation-stakeholder-briefings` skill is the second: its value lives in the master-projection invariant and the lens library, both structure.)
- **(b) Re-test on a weak generation model first.** Run the output-eval roster against a weaker model (e.g. Haiku) where prose instructions may carry more weight, before generalizing (a). Cost-gated Workflow run; cheap.
- **(c) Do nothing / keep prose-heavy authoring.** Rejected: the eval shows it does not move the measured needle for these artifact types.

**Final decision.** Adopt (a) as the standing design principle from v2.28.0 onward, and schedule (b) as a one-shot calibration before the next *content* (C-family) cycle, not before the memory cycle (memory is structural by construction, so it does not depend on the weak-model result). Record (a) in the skill-builder guidance when B2 lands. *Maintainer ratification requested on review.*

## Carried candidates (ride-alongs / backlog; not the theme)

| Candidate | Disposition |
|---|---|
| utility-pm-critic fixture relabel (sharpened) | **Fits this cycle:** the taxonomy question (artifact audit-mode vs the general critic) intersects B2's contract work, and the burned key can be replaced for the live B-3 re-run. Author `utility-pm-critic` trigger fixtures, decide the boundary, relabel, re-run. |
| 3 VOID instruments residual (`measure-experiment-design` sample-size; `deliver-release-notes` genuine low-value) | Backlog; a clean G>=3 look when convenient. Not blocking. |
| B-5 + B-7 body-change reminders | Backlog; both need PR-diff context. |
| Router-eval drift-threshold tuning | Backlog; tune after a few more baseline runs (quantization on ~4-query validation sets). |
| Promote B-7 asset gate advisory -> enforcing | When the output-eval roster is pinned. |
| M-32 derived-surfaces Phase 2 (landing cards, README numbers, Skill Finder, schema) | Backlog; larger; sequence after the memory cohort. |
| WS-A4 skills-ref CI lane (#97) | Backlog (codex lane). |
| M-25 community-marketplace resubmit | Pending-human; not a cycle gate (validate-clean record refreshed in v2.27.1). |

## Sequencing

1. **Ratify D1** (one decision; cheap).
2. **B1 keystone** - the `.local.md` schema + SessionStart router read + a write convention. Ship behind the existing opt-in `.local.md` posture (consistent with F-43/F-44).
3. **B2 cohort** - add read/write contracts + provenance tags to the first cohort; each skill gains a HISTORY row + (per D1) lean structural edits, no prose bloat.
4. **utility-pm-critic fixtures + relabel + live B-3 re-run** (needs a key) - rides this cycle because of the taxonomy overlap with the cohort.
5. **E1/E2 trust docs** if capacity allows (ride-along).
6. Cut via the 6-gate runbook embodied inline (same as v2.27.x / v2.28.0).

## Gate ledger (placeholder)

- [ ] G0 / G1 / G2 / G2.5 / G3 / G4 - filled at cut time.

## Notes

- This is a DRAFT for maintainer review. Theme is the recommendation; scope rows, the B2 cohort membership, and the F-54 ID are all open to change on review.
- Effort briefs (`docs/internal/efforts/F-48-*.md`, `F-54-*.md`) + GitHub issues are the next execution-time step, deferred to keep this a single review surface (per the no-effort-doc-bloat convention).
