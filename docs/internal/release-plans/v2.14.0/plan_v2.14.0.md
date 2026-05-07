# v2.14.0 Release Plan: Doc Stack Migration to Astro Starlight

**Status:** Phase 0 (compatibility decision) EXECUTED 2026-05-06; verdict GO-WITH-CAVEATS; Phases 1-4 (migration execution) promoted to active scope
**Owner:** TBD
**Type:** Migration release (minor)
**Created:** 2026-05-05
**Updated:** 2026-05-06 (promoted from placeholder; spike executed; verdict GO-WITH-CAVEATS)
**Sources:**
- v2.14 Starlight migration execution plan (authoritative for migration execution; Phases 1-4): [`plan_v2.14_starlight-migration.md`](./plan_v2.14_starlight-migration.md) (authored 2026-05-06; 13 workstreams + detailed CI + Material deprecation criteria)
- v2.14 Starlight compatibility spike plan: [`plan_v2.14_starlight-spike.md`](./plan_v2.14_starlight-spike.md)
- v2.14 Starlight spike report: [`plan_v2.14_starlight-spike-report_2026-05-06.md`](./plan_v2.14_starlight-spike-report_2026-05-06.md) (executed 2026-05-06; GO-WITH-CAVEATS)
- v2.14 Codex adversarial review (archived): [`_archive/plan_v2.14_starlight-spike-report_2026-05-06_original_reviewed-by-codex.md`](./_archive/plan_v2.14_starlight-spike-report_2026-05-06_original_reviewed-by-codex.md)
- v2.13.0 Zensical compatibility spike report: [`../v2.13.0/plan_v2.13_zensical-spike-report_2026-05-05.md`](../v2.13.0/plan_v2.13_zensical-spike-report_2026-05-05.md) (NO-GO outcome; BLOCKER baseline for Starlight retests)
- v2.13.0 Zensical spike plan: [`../v2.13.0/plan_v2.13_zensical-spike.md`](../v2.13.0/plan_v2.13_zensical-spike.md) (structural model for the Starlight spike plan)
- v2.13.0 final sweep: [`../v2.13.0/plan_v2.13_final-sweep_2026-05-05.md`](../v2.13.0/plan_v2.13_final-sweep_2026-05-05.md) (QW-1 to QW-9 quick-win opportunities; contingency-scope candidates)

> **What this is.** The v2.14.0 release plan, committing the cycle to the doc-stack migration from MkDocs Material to Astro Starlight. Day 1 runs the compatibility spike (`plan_v2.14_starlight-spike.md`); Days 2-N execute the migration on a GO verdict. A NO-GO verdict triggers the Contingency section (pivot scope to backlog). The spike is a deciding artifact, not a release artifact: v2.14 ships either the migration (GO path) or a pivot theme (NO-GO path), never the spike report by itself.

---

## Theme

**Doc Stack Migration: MkDocs Material to Astro Starlight.**

v2.13.0's Zensical compatibility spike returned NO-GO at Zensical 0.0.40 due to two structural BLOCKERs (`mkdocs-redirects` plugin not honored; `exclude_docs:` not honored) plus an IMPORTANT-severity parser-warning issue. Astro Starlight is the v2.13 spike's Plan B candidate and the strongest forward-looking alternative based on the post-v2.13 evaluation:

- **Solves both Zensical BLOCKERs cleanly.** Astro's first-class redirects config replaces `mkdocs-redirects`; `draft: true` frontmatter and path-based excludes replace `exclude_docs:`.
- **Production-ready since v1.0** (September 2024); used by Cloudflare Workers, Deno, Tauri, Astro itself.
- **Faster builds, smaller user-side JS payload, accessible defaults, modern web standards** (View Transitions, image optimization, ESM throughout).
- **Markdown + MDX first-class** so source SKILL.md files don't need rewriting; generated content from Python scripts works unchanged.
- **No Python toolchain dependency** (Node-only); aligns with the JS ecosystem the repo already touches via `skills` CLI.

---

## Scope

### Phase 0: Compatibility decision (Day 1, time-boxed 60 min)

> **Status:** Executed 2026-05-06; verdict GO-WITH-CAVEATS pending pre-ship validation gates.

Detailed plan: [`plan_v2.14_starlight-spike.md`](./plan_v2.14_starlight-spike.md). Summary of decision criteria (full table in the spike plan, Section 2.2):

| Criterion | Pass condition |
|---|---|
| Redirects (v2.13 BLOCKER 1 retest) | All current `mkdocs.yml redirect_maps` entries resolve via Astro `redirects:` config |
| Excludes (v2.13 BLOCKER 2 retest) | `docs/internal/` content does NOT appear in built `dist/` output |
| Parser warnings (v2.13 IMPORTANT retest) | No false-positive warnings on bracketed text (`[role]`, `[yes / no]`, `cards[3]`, etc.) |
| Performance | Cold build at most 1.5x slower than Material; rebuild faster than Material full build |
| Generated content | All 63 generator-output pages render correctly; frontmatter `generated: true` and `source:` flags preserved |
| Library samples | The 126 sample files render with consistent typography |
| Mermaid | Diagrams render via chosen Astro Mermaid integration |
| Skill cards / category indices | The Diataxis-aligned content collections map cleanly |
| GitHub Pages compatibility | Static output deploys cleanly at the `/pm-skills/` base path |

Outcome: GO / GO-WITH-CAVEATS / NO-GO decision recorded in `plan_v2.14_starlight-spike-report_YYYY-MM-DD.md` next to this plan.

### Phases 1-4: Migration execution (active scope; per migration plan)

> **Authoritative reference: [`plan_v2.14_starlight-migration.md`](./plan_v2.14_starlight-migration.md).** The migration plan organizes 13 workstreams into 4 phases by demonstrable outcome, with per-workstream acceptance criteria, a detailed CI migration section (W10), Material deprecation acceptance criteria (W12), Pre-Ship Validation Gates, Phase 0 Adversarial Review Loop schedule, and 2 new Decision Briefs (DM-1, DM-2).

Phase summary (each phase has a demonstrable outcome at completion):

| Phase | Workstreams | Outcome at end of phase |
|---|---|---|
| **Phase 1: Foundation** | W1 Pre-flight + W2 In-place mount + W3 Frontmatter | Astro builds against in-place `docs/` mount with valid frontmatter |
| **Phase 2: Parity** | W4 Sidebar IA + W5 CSS port + W6 Mermaid + W7 Library samples + W8 Generators + W9 Redirects | Site renders all content comparably to Material; no visual regressions |
| **Phase 3: Cutover** | W10 CI migration + W11 GH Pages deploy | CI publishes the site; production URL loads with Starlight |
| **Phase 4: Deprecate + Ship** | W12 Material deprecation + W13 Final validation | Material removed; v2.14.0 tagged |

Total estimate (post-Codex review): **30-40 hours focused work / 5-8 calendar days.**

---

## Contingency: NO-GO pivot

This section applies only if the Day-1 spike returns NO-GO. It is not the planned path.

If Starlight returns NO-GO, v2.14.0 pivots scope on the spot. The doc-stack question becomes a v2.15.0+ planning concern with a fresh evaluation pass; do NOT auto-trigger another doc-stack spike (Hugo, VitePress, Eleventy) inside the v2.14 cycle. Material continues in maintenance-mode posture until the next evaluation; this is acceptable because Material's stated maintenance window is ~12 months and pm-skills has runway.

Candidate pivot themes (pick one or compose a slate; final selection at NO-GO time):

- **Sample-automation slate**: F-31 / F-32 / F-33 / F-35 deferred from v2.13.0; re-evaluate post-v2.12 builder cleanup.
- **F-29 Meeting Lifecycle Workflow** + **F-30 Family Adoption Guide**: time-gated on real-world feedback; check signal arrival.
- **CI doc-cleanup mini-bucket**: QW-1 to QW-9 from v2.13.0 final sweep (broken internal links, frontmatter coverage, README_SCRIPTS.md drift, promote validate-docs-frontmatter and check-internal-link-validity to enforcing).
- **F-37 HTML Template Creator**: deferred from v2.13.0; could ship if scope demands a new skill.
- **GitHub-platform metadata refresh**: M-23 (Phase 5 checklist sub-section) + M-24 (advisory `gh-release-metadata` script).

---

## Spike rubric pointer

The full GO / GO-WITH-CAVEATS / NO-GO rubric lives in [`plan_v2.14_starlight-spike.md`](./plan_v2.14_starlight-spike.md) Section 3. Summary:

- **GO triggers:** all v2.13 BLOCKER retests pass (redirects, excludes, parser warnings); generators + samples + mermaid + search all functional; performance acceptable; GitHub Pages deploy works.
- **GO-WITH-CAVEATS triggers:** majority of checks pass; remediation cost ≤5 days of work; caveats documented per-item with severity.
- **NO-GO triggers:** any of the three v2.13 BLOCKERs reproduces; or generators / mermaid / GitHub Pages fundamentally broken; or remediation cost >5 days.

---

## Out of Scope (pending GO confirmation)

If Starlight returns GO:

1. **No new PM skills.** v2.14.0 is a migration release; new skills wait for v2.15.0+.
2. **No CI overhaul.** The 22 validators (10 enforcing + 12 advisory) carry over unchanged. Migration verification reuses existing CI.
3. **No content rewrites.** Skill source files, workflow files, and library samples carry over verbatim.
4. **No new external runtime dependencies beyond Astro + Starlight + their direct dependencies.** The Material plugin set retires entirely.
5. **No re-spike of Zensical** in v2.14. Zensical re-spike is a separate effort triggered by upstream parity announcements (per v2.13 spike report Section 5).

If Starlight returns NO-GO:

Out-of-scope guards depend on the pivot theme selected.

---

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| **v2.14.0 theme** | Doc Stack: Starlight Migration (committed 2026-05-06) | v2.13.0 NO-GO on Zensical; Material's maintenance posture is steady but Starlight's modernity + active investment makes it the strongest forward-looking choice. Spike confirms compatibility; verdict drives whether migration ships in this cycle or pivots to contingency. |
| **Spike vs migration in same cycle** | Both in v2.14.0 (spike Day 1, migration Days 2-N if GO) | Avoids "spike report" as a release artifact; spike is planning material, not user-value |
| **Plan B if Starlight returns NO-GO** | Pivot v2.14 scope to one of the candidate Contingency themes; do NOT auto-trigger a Hugo or VitePress spike | Avoid open-ended cascading spikes; if Starlight fails, the doc-stack question becomes a v2.15+ planning concern |
| **Spike plan as separate artifact from cycle plan** | Yes; spike plan at `plan_v2.14_starlight-spike.md`, cycle plan at `plan_v2.14.0.md` | Mirrors v2.13 structure; spike plan is a deciding artifact with its own rubric and execution protocol; cycle plan owns the scope-vs-contingency framing |
| **Out-of-cycle MCP work** | None expected | pm-skills-mcp v2.9.x maintenance line continues independently; no v2.14 in-cycle MCP scope |

---

## Decision Briefs (resolved 2026-05-06)

Four maintainer-signoff decisions surfaced by the Codex adversarial review of the spike report. Each follows the Decision Brief convention (codified in this session): What / Why / Desired outcomes / Potential solutions / Recommendation / Maintainer decision. Source review: [`plan_v2.14_starlight-spike-report_2026-05-06_reviewed-by-codex.md`](./plan_v2.14_starlight-spike-report_2026-05-06_reviewed-by-codex.md).

### D1: Performance NO-GO Waiver

**What it is.** Spike plan Section 3.3 published a NO-GO trigger of "cold build regresses ≥2x against Material with no clear path to remediation." Recomputed actual cold build on tool-reported times: 2.04x without Mermaid, 3.12x with Mermaid. By strict reading, the verdict should be NO-GO.

**Why it matters.** If unresolved, the recorded verdict bypasses its own rubric without explicit acknowledgment, weakening future spike-plan credibility and setting precedent for waiving published triggers in later cycles.

**Desired outcomes.**
- Verdict explicitly waives the trigger with documented rationale, OR
- The rubric is updated for v2.15+ spike plans, OR
- The migration includes a concrete cold-build remediation gate.

**Potential solutions.**
- **Option A: Explicit waiver, no remediation gate.** State warm rebuild (1.30x) is the production-relevant number for CI; Mermaid bundle is splittable; Astro 6 likely improves cold builds. Pros: pragmatic; ships v2.14 on schedule. Cons: sets precedent of waiving published triggers.
- **Option B: Explicit waiver + migration remediation gate.** Same waiver but add acceptance criterion: cold build <12s after CSS port and Mermaid lazy-load. Pros: keeps rubric meaningful; catches regressions. Cons: ~2-4 extra hours of migration work.
- **Option C: Tighten verdict to NO-GO; defer migration to v2.15.** Pros: respects rubric. Cons: extends doc-stack uncertainty; holds Material in maintenance mode another cycle.

**Recommendation:** Option B (preserves rubric credibility AND ships v2.14; cost bounded).

**Maintainer decision (2026-05-06):** **Modified to Option A** (waiver only; no hard remediation gate). Rationale: "do A first then see how much of a problem it really is in practice." If real users / contributors complain or CI hits resource limits, revisit. The migration includes light monitoring (~1 hour benchmark + observation), not a hard <12s gate.

### D2: Production Content-Source Strategy

**What it is.** The spike POC copied `docs/` to `_spike/starlight-poc/src/content/docs/` so Starlight could find content at its default location. Production migration must decide: (a) keep filesystem copy as a CI build step, (b) mount `docs/` in-place via `docsLoader({ pattern, base })`, or (c) restructure the repo so `docs/` IS at `src/content/docs/`.

**Why it matters.** This is the meta-decision driving multiple other findings: edit-link correctness (Codex S5.M1), `docs/internal/` exclusion mechanism (Codex S6.M1), contributor workflow (where do skill authors put files?), CI build determinism, and source-of-truth clarity.

**Desired outcomes.**
- Single source of truth.
- Edit links resolve to the file the contributor would actually edit.
- CI does not require pre-build content shuffling.
- `internal/` exclusion is config-controlled and verifiable.

**Potential solutions.**
- **Option A: Filesystem copy in CI.** Pros: easy port from spike. Cons: edit links break (proven by spike); source-of-truth ambiguity; CI step adds time and complexity.
- **Option B: In-place mount via custom docsLoader pattern.** Pros: contributors edit `docs/` directly; edit links resolve correctly; production excludes via `pattern: '!internal/**'`; matches Material's mental model. Cons: requires verifying docsLoader pattern API works for our content shape (~2-4 hours of migration W2 verification).
- **Option C: Repo restructure (move `docs/` to `src/content/docs/`).** Pros: aligns with Astro convention; minimal config. Cons: breaks every existing reference to `docs/` path; contributor disruption; Material can no longer build from same tree during transition.

**Recommendation:** Option B (cleanest source-of-truth model; bounded verification cost; avoids the edit-link defect Codex caught).

**Maintainer decision (2026-05-06):** **Accepted: Option B.**

### D3: Sidebar IA Strategy

**What it is.** The current `mkdocs.yml` has explicit nav with curated ordering, custom labels (e.g., "Overview" instead of "Readme"), and section index pages. The spike POC used naive `autogenerate: { directory: ... }` for every section, which produces label/order drift such as "Reference / Readme" instead of authored "Overview" and release titles defaulting to filenames.

**Why it matters.** User-facing navigation either matches today's curated IA or accepts Starlight's directory-derived structure as the new IA. This is a product decision, not a 2-hour cleanup.

**Desired outcomes.**
- Stakeholders agree on the post-migration IA before the migration W4 implementation builds it.
- Either current IA is preserved verbatim, or a deliberate IA refresh is scheduled.

**Potential solutions.**
- **Option A: Port `mkdocs.yml` nav verbatim** to Starlight `sidebar:` with explicit items. Pros: zero IA regression; users land on familiar nav. Cons: 4-8 hours instead of 2; ongoing manual maintenance for new pages.
- **Option B: Accept Starlight autogenerate** as the new IA. Pros: simplest; new pages auto-included. Cons: breaks current IA; some labels need overrides anyway; release titles default to filenames.
- **Option C: Hybrid.** Manual top-level section ordering and labels; autogenerate within sections. Pros: preserves user-facing IA; new pages auto-included within section. Cons: still requires per-section label overrides.

**Recommendation:** Option C (best ratio of effort to user-facing stability; ~3-5 hours).

**Maintainer decision (2026-05-06):** **Accepted: Option C.**

### D4: Mermaid Loading Strategy

**What it is.** `astro-mermaid` 2.0.1 default-eager-loads `mermaid.core` (601.87 kB minified) on every page that includes the integration globally. Vite emitted a chunk-size warning during the spike build.

**Why it matters.** Pages with Mermaid diagrams render slower; pages without Mermaid pay the bundle cost anyway. Affects user-side performance, especially on mobile / slower connections.

**Desired outcomes.** Mermaid renders where authored without imposing a 600 KB bundle on pages that do not use it.

**Potential solutions.**
- **Option A: Accept eager loading.** Pros: simplest; Mermaid pages render fast. Cons: 600+ KB bundle on every page; Vite chunk warning persists.
- **Option B: Lazy-load via per-page integration.** Pros: only Mermaid-using pages pay the cost. Cons: needs astro-mermaid lazy-load support (verify); per-page MDX imports.
- **Option C: Code-split via dynamic import.** Pros: bundle splits without per-page authoring changes. Cons: requires bundler config; adds complexity.

**Recommendation:** Option B if astro-mermaid supports lazy-load, otherwise Option C. Defer to v2.15 if neither is straightforward in v2.14.

**Maintainer decision (2026-05-06):** **Accepted: Option B with C fallback.**

### Adjacent maintainer call (not a Decision Brief; recorded for traceability)

**Old Material URL preservation:** Maintainer 2026-05-06 indicated lower priority on preserving links from the original Material structure ("don't care that much about breaking links"). This downgrades the spike report's "redirect destination base-path bug" from IMPORTANT/pre-ship-BLOCKER (Codex S4.M2 finding) to MEDIUM polish that can ship unfixed. The 12 redirects from `mkdocs.yml redirect_maps` still get ported (5-min config), but destination base-path correctness is not a pre-ship gate.

### Deferrals to v2.15+

- **Astro 6.x + Node 22.12+ bump.** v2.14 ships on Astro 5.13.x + Starlight 0.34.x (compatible with current Node 22.11.0). Astro 6 + Node bump becomes a focused v2.15+ upgrade cycle. Rationale: avoids compounding doc-stack migration risk with toolchain version risk in the same cycle.

---

## Open Questions

| # | Question | Default | Decision |
|---|---|---|---|
| OQ-1 | Run Starlight spike before v2.14.0 cycle officially starts (planning), or as Day 1 of the cycle? | Day 1 of cycle | **Resolved 2026-05-06: Day 1 of cycle (executed)** |
| OQ-2 | If GO with caveats, are the caveats acceptable for v2.14.0 ship, or do they push migration to v2.15.0? | Depends on caveat severity; defer until spike returns | **Resolved 2026-05-06: Acceptable for v2.14.0; revised effort 30-40 hrs after Codex review** |
| OQ-3 | Custom Material theme overrides (CSS, partials) - do they need 1:1 reproduction in Starlight, or is "use Starlight defaults plus minimal branding" acceptable? | Minimal reproduction; Starlight defaults are 2025-modern and likely an upgrade | **Resolved 2026-05-06: Starlight defaults + minimal branding; custom palette deferred to v2.15+** |
| OQ-4 | Is the Mermaid integration overhead worth doing in v2.14.0, or defer Mermaid-rich pages to a follow-up? | Include in v2.14.0 (Mermaid is used in homepage hero, release notes, master plans) | **Resolved 2026-05-06: Include in v2.14 via astro-mermaid; loading mode per D4** |
| OQ-5 | GitHub Pages vs Cloudflare Pages vs other deploy target? | GitHub Pages (current); revisit only if build time or quotas hit limits | **Resolved 2026-05-06: GitHub Pages (same `gh-pages` branch; new publisher: Astro Action replaces `mkdocs gh-deploy`)** |

---

## Adversarial Review Loop (carry-forward)

v2.14.0 will run the same per-strand + release-state adversarial review loop pattern codified in v2.11.0 + v2.12.0 + v2.13.0 (originally labelled "Phase 0 Adversarial Review Loop"; the "Phase 0" prefix is dropped here to avoid collision with the cycle's Phase 0 compatibility-decision label). Apply lesson from v2.13.0 PR.2 round 8:

> **Mid-loop summary text freezes in-progress claims and needs a final correctness pass before any promotion.** Every gate closure must sweep ALL release-stack docs that reference the gate's state simultaneously, not just the doc whose row was edited.

Specifically: keep release-notes audit-trail prose terse during the cycle; expand only at PR.5 promotion time after the loop has converged. Reduces stale-drift surface area.

---

## Reference: why Astro Starlight beats current alternatives

(Captured here for forward reference; full evaluation would happen at Day-1 spike.)

| Candidate | Verdict | Why |
|---|---|---|
| **Astro Starlight** | Recommended (pending spike) | Solves Zensical BLOCKERs cleanly; production-ready since v1.0; markdown-first; Node-only toolchain; modern accessibility/web-standards defaults; active investment |
| Zensical | NO-GO (v2.13 spike) | `mkdocs-redirects` not honored; `exclude_docs:` not honored; 2,940 false-positive parser warnings; cold build 1.95x slower than Material |
| VitePress | Runner-up (lighter-weight alternative) | Vue-based; fast Vite builds; smaller surface area; less framework-agnostic than Starlight |
| Hugo | Conservative alternative | Mature; single Go binary; very fast; theme ecosystem feels 2018-era vs 2025-modern |
| Docusaurus | Rejected (CONTEXT.md, 2026-05-04) | Overkill for pm-skills' content shape; React-heavy |
| Mintlify / GitBook | Rejected | Hosted/proprietary; vendor lock-in; not OSS-friendly |

---

## Backlog items potentially in scope for v2.14.0 (deferred from v2.13.0)

These were captured as v2.14.0+ deferrals during v2.13 cycle and become candidates if v2.14 pivots scope:

| ID | Title | Source |
|---|---|---|
| F-29 | Meeting Lifecycle Workflow | v2.11.0 backlog; time-gated on adoption signal |
| F-30 | Family Adoption Guide | v2.11.0 backlog; time-gated on adoption signal |
| F-31 to F-35 (except F-34) | Sample-automation slate | v2.12.0 deferral; re-eval post-builder-cleanup |
| F-37 | HTML Template Creator | v2.13.0 Out-of-Scope guard; conflicts with "no new skills" guard |
| M-23 | Phase 5 GitHub-platform metadata refresh checklist | v2.13.0 final-sweep |
| M-24 | Advisory `scripts/gh-release-metadata.{sh,ps1,md}` script | v2.13.0 final-sweep |
| QW-1 to QW-9 | v2.13.0 doc-cleanup quick-wins (broken links, frontmatter, README_SCRIPTS drift, validator promotions) | v2.13.0 final-sweep |

These are only relevant if v2.14 pivots from Starlight migration. Under the GO path, they wait for v2.15.0+.

---

## Sequencing

```
Day 1 (Phase 0):    Starlight compatibility spike (60 min, time-boxed)
  to GO              Days 2-N (Phases 1-4): Migration execution (planned path)
  to GO-WITH-CAVEATS Days 2-N (Phases 1-4): Migration with documented caveats; possibly v2.14 ships partial; v2.15 finishes
  to NO-GO           Day 1.5+: pivot to Contingency scope (sample-automation, doc-cleanup, etc.)
```

---

## Status Snapshot

| Item | Status |
|---|---|
| Cycle plan (this file) | Committed (2026-05-06); Phases 1-4 (migration execution) promoted to active scope after Codex-reviewed GO-WITH-CAVEATS verdict |
| Spike plan | Authored 2026-05-06 at [`plan_v2.14_starlight-spike.md`](./plan_v2.14_starlight-spike.md); executed |
| Spike rubric | Codified in spike plan Section 3; mirrors v2.13's structure with Starlight-specific pass conditions |
| Spike date | Executed 2026-05-06 (~50 min execution + 15 min report) |
| Spike report | [`plan_v2.14_starlight-spike-report_2026-05-06.md`](./plan_v2.14_starlight-spike-report_2026-05-06.md); verdict GO-WITH-CAVEATS pending pre-ship validation gates |
| Codex adversarial review | Completed 2026-05-06 (9 Major / 8 Minor / 2 Notes / 0 Blockers); review artifact archived at [`_archive/plan_v2.14_starlight-spike-report_2026-05-06_original_reviewed-by-codex.md`](./_archive/plan_v2.14_starlight-spike-report_2026-05-06_original_reviewed-by-codex.md); 19 actions applied to spike report + cycle plan |
| Decision Briefs (D1-D4) | All resolved 2026-05-06; recorded in Decisions Briefs section above with maintainer signoff slots filled |
| Migration execution plan | [`plan_v2.14_starlight-migration.md`](./plan_v2.14_starlight-migration.md) authored 2026-05-06; 13 workstreams + detailed CI + Material deprecation criteria; 2 new Decision Briefs (DM-1, DM-2) for maintainer signoff before W12 / W11 |
| Theme decision | Committed: Starlight migration; spike confirmed; migration execution (Phases 1-4) begins next session |
| Effort estimate (post-review) | 30-40 hours focused work (~5-8 calendar days); see spike report Estimated migration effort table |
| Pre-ship validation gates | 7 gates listed in spike report Outcome section; must clear before v2.14.0 ships |
| Contingency status | NOT triggered (migration execution path active) |
| Out-of-cycle MCP impact | None expected |

---

## Related artifacts

- v2.13.0 release notes: [`../../../releases/Release_v2.13.0.md`](../../../releases/Release_v2.13.0.md) - the cycle that returned the Zensical NO-GO and proposed Starlight as Plan B
- v2.13.0 master plan: [`../v2.13.0/plan_v2.13.0.md`](../v2.13.0/plan_v2.13.0.md)
- v2.13.0 final sweep: [`../v2.13.0/plan_v2.13_final-sweep_2026-05-05.md`](../v2.13.0/plan_v2.13_final-sweep_2026-05-05.md)
- Backlog-canonical: [`../../backlog-canonical.md`](../../backlog-canonical.md)
