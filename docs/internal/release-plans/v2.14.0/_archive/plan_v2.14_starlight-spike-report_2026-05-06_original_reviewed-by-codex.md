# AI Review: Astro Starlight Compatibility Spike Report

**Document:** `docs/internal/release-plans/v2.14.0/plan_v2.14_starlight-spike-report_2026-05-06.md`

**Document type:** brief (decision-driving synthesis from empirical spike findings)

**Date:** 2026-05-06

**Requestor:** Claude Opus 4.7 (1M context) | **Reviewer:** Codex | **Human:** JP

---

## Reviewer Assessment

> **Reviewer - Codex (2026-05-06):** The report is directionally credible: Starlight clears the three v2.13 Zensical disqualifiers at the artifact level, and the POC evidence supports a migration path. The main concern is decision framing, not basic feasibility: several GO-rubric items were not actually tested, the cold-build numbers collide with the published NO-GO trigger unless explicitly waived, and production-only checks around redirects, excludes, content mounting, and contributor edit links need to be promoted into Bucket B gates before treating the migration as committed.

| Severity | Count |
|----------|-------|
| Blocker  | 0     |
| Major    | 9     |
| Minor    | 8     |
| Note     | 2     |

## Requestor Analysis & Proposed Actions

> **Requestor - Claude Opus 4.7 (2026-05-06):** Strong agreement with reviewer's headline framing. The spike report over-stated "structural compatibility cleared" when several GO criteria were not actually exercised in the time-box. Codex correctly catches the performance-rubric collision I had primed (2.08x cold build vs published NO-GO trigger of >=2x), the redirect destination base-path bug being framed too softly for a GitHub Pages target, the unproven config-level `internal/` exclusion in production mode, the contributor-facing edit-link defect (genuinely missed by me), and the under-supported library-samples estimate. Net synthesis: 19 findings (9 Major / 8 Minor / 2 Notes) drive 17 spike-report updates plus 4 Decision Briefs requiring maintainer signoff. Bucket B impact: estimate likely grows from 17-22 hours to 25-34 hours after risk buffer + samples workstream + sidebar IA decision; verdict stays GO-WITH-CAVEATS but reframes to "pending Bucket B validation gates" with explicit pre-ship BLOCKERs.

### Recommendations

1. **Reframe verdict to "GO-WITH-CAVEATS pending Bucket B validation gates"** and list every untested GO criterion (samples, production excludes, GH Pages redirects, edit-link resolution, sidebar IA, CSS port) as acceptance gates that must clear before v2.14 ships. (Section 1, Major; subsumes Section 6 + Section 7 production-vs-POC concerns.)
2. **Promote the redirect-destination base-path bug from "IMPORTANT but bounded" caveat to "pre-ship BLOCKER / Bucket B acceptance gate."** On GitHub Pages the bare destinations are user-facing 404s. The fix is mechanical but must be treated as a gate, not a soft caveat. (Section 4, Major.)
3. **Add explicit performance NO-GO waiver via a maintainer Decision Brief (D1) rather than implicit bypass.** The published spike-plan rubric triggers NO-GO at cold build >=2x Material; recomputed actual on tool-reported times is 2.04x (no Mermaid) and 3.12x (with Mermaid). Codex is right that "acceptable for migration" is not the rubric. Frame as explicit waiver + Bucket B remediation gate at cold build <12s. (Section 4, Major.)

### Decisions for JP

| ID | Issue | Decision | Status |
|----|-------|----------|--------|
| D1 | Performance NO-GO trigger waiver (cold build 2.04x-3.12x vs published >=2x trigger) | **A** (waiver, no hard remediation gate; monitor in real use, revisit if it causes actual problems) | Resolved 2026-05-06 |
| D2 | Production content-source strategy (filesystem copy vs in-place docsLoader vs repo restructure) | **B** (in-place mount via custom docsLoader pattern) | Resolved 2026-05-06 |
| D3 | Sidebar IA strategy (port mkdocs.yml nav vs accept Starlight autogenerate vs hybrid) | **C** (hybrid: manual top-level ordering + labels, autogenerate within sections) | Resolved 2026-05-06 |
| D4 | Mermaid loading strategy (eager 600KB upfront vs lazy/code-split) | **B** (lazy-load via per-page integration if astro-mermaid supports it; else C code-split; else defer to v2.15) | Resolved 2026-05-06 |

#### D1: Performance NO-GO Waiver

**Context:** Spike plan Section 3.3 published a NO-GO trigger of "cold build regresses ≥2x against Material with no clear path to remediation." Recomputed actual cold build on tool-reported times: 2.04x without Mermaid, 3.12x with Mermaid. By strict reading, the verdict should be NO-GO.

**Impact:** If unresolved, the recorded verdict bypasses its own rubric without explicit acknowledgment, weakening future spike-plan credibility and setting precedent for waiving published triggers in later cycles.

**Desired outcome:** Verdict explicitly waives the trigger with documented rationale, OR the rubric is updated for v2.15+ spike plans, OR Bucket B includes a concrete cold-build remediation gate.

**Proposed solutions:**
- **Option A: Explicit waiver, no remediation gate.** State warm rebuild (1.30x) is the production-relevant number for CI; Mermaid bundle is splittable; Astro 6 likely improves cold builds. Pros: pragmatic; ships v2.14 on schedule. Cons: sets precedent of waiving published triggers.
- **Option B: Explicit waiver + Bucket B remediation gate.** Same waiver but add acceptance criterion: cold build <12s after CSS port and Mermaid lazy-load. Pros: keeps rubric meaningful; catches regressions. Cons: ~2-4 hours extra Bucket B work.
- **Option C: Tighten verdict to NO-GO; defer migration to v2.15.** Pros: respects rubric. Cons: extends doc-stack uncertainty; holds Material in maintenance mode another cycle.

**Recommendation:** **Option B.** Preserves rubric credibility AND ships v2.14. Cost is bounded.

**Maintainer decision / feedback:**
- [ ] Accept recommendation (Option B)
- [x] Modify: Pick Option A (waiver, no hard remediation gate). Monitor cold-build performance in real use; revisit only if it causes actual problems for contributors or CI.
- [ ] Reject; alternative direction: 
- Notes: "Do A first then see how much of a problem it really is" (2026-05-06). Implication: Action #10 in the Proposed Actions table changes from "waiver + remediation gate at <12s cold" to "waiver only, with light Bucket B observation note."

#### D2: Production Content-Source Strategy

**Context:** The spike POC copied `docs/` to `_spike/starlight-poc/src/content/docs/` so Starlight could find content at its default location. Production migration must decide: (a) keep filesystem copy as a CI build step, (b) mount `docs/` in-place via `docsLoader({ pattern, base })`, or (c) restructure the repo so `docs/` IS at `src/content/docs/`.

**Impact:** This is the meta-decision driving multiple other findings: edit-link correctness (S5.M1), `docs/internal/` exclusion mechanism (S6.M1), contributor workflow (where do skill authors put files?), CI build determinism, and source-of-truth clarity.

**Desired outcome:** Single source of truth; edit links resolve to the file the contributor would actually edit; CI does not require pre-build content shuffling; `internal/` exclusion is config-controlled and verifiable.

**Proposed solutions:**
- **Option A: Filesystem copy in CI.** Pros: easy port from spike. Cons: edit links break (proven by spike); source-of-truth ambiguity; CI step adds time and complexity.
- **Option B: In-place mount via custom docsLoader pattern.** Pros: contributors edit `docs/` directly; edit links resolve correctly; production excludes via `pattern: '!internal/**'`; matches Material's mental model. Cons: requires verifying docsLoader pattern API works for our content shape (~2-4 hours Bucket B verification).
- **Option C: Repo restructure (move `docs/` to `src/content/docs/`).** Pros: aligns with Astro convention; minimal config. Cons: breaks every existing reference to `docs/` path; contributor disruption; Material can no longer build from same tree during transition.

**Recommendation:** **Option B.** Cleanest source-of-truth model. Bounded verification cost. Avoids the edit-link defect Codex caught.

**Maintainer decision / feedback:**
- [x] Accept recommendation (Option B)
- [ ] Modify: 
- [ ] Reject; alternative direction: 
- Notes: Resolved 2026-05-06.

#### D3: Sidebar IA Strategy

**Context:** The current `mkdocs.yml` has explicit nav with curated ordering, custom labels (e.g., "Overview" instead of "Readme"), and section index pages. The spike POC used naive `autogenerate: { directory: ... }` for every section, which produces label/order drift such as "Reference / Readme" instead of authored "Overview" and release titles defaulting to filenames.

**Impact:** User-facing navigation either matches today's curated IA or accepts Starlight's directory-derived structure as the new IA. This is a product decision, not a 2-hour cleanup.

**Desired outcome:** Stakeholders agree on the post-migration IA before Bucket B builds it. Either current IA is preserved verbatim, or a deliberate IA refresh is scheduled.

**Proposed solutions:**
- **Option A: Port `mkdocs.yml` nav verbatim** to Starlight `sidebar:` with explicit items. Pros: zero IA regression; users land on familiar nav. Cons: 4-8 hours instead of 2; ongoing manual maintenance for new pages.
- **Option B: Accept Starlight autogenerate** as the new IA. Pros: simplest; new pages auto-included. Cons: breaks current IA; some labels need overrides anyway; release titles default to filenames.
- **Option C: Hybrid.** Manual top-level section ordering and labels; autogenerate within sections. Pros: preserves user-facing IA; new pages auto-included within section. Cons: still requires per-section label overrides.

**Recommendation:** **Option C.** Best ratio of effort to user-facing stability. Estimated 3-5 hours.

**Maintainer decision / feedback:**
- [x] Accept recommendation (Option C)
- [ ] Modify: 
- [ ] Reject; alternative direction: 
- Notes: Resolved 2026-05-06.

#### D4: Mermaid Loading Strategy

**Context:** `astro-mermaid` 2.0.1 default-eager-loads `mermaid.core` (601.87 kB minified) on every page that includes the integration globally. Vite emitted a chunk-size warning during the spike build.

**Impact:** Pages with Mermaid diagrams render slower; pages without Mermaid pay the bundle cost anyway. Affects user-side performance, especially on mobile / slower connections.

**Desired outcome:** Mermaid renders where authored without imposing a 600 KB bundle on pages that do not use it.

**Proposed solutions:**
- **Option A: Accept eager loading.** Pros: simplest; Mermaid pages render fast. Cons: 600+ KB bundle on every page; Vite chunk warning persists.
- **Option B: Lazy-load via per-page integration.** Pros: only Mermaid-using pages pay the cost. Cons: needs astro-mermaid lazy-load support (verify); per-page MDX imports.
- **Option C: Code-split via dynamic import.** Pros: bundle splits without per-page authoring changes. Cons: requires bundler config; adds complexity.

**Recommendation:** **Option B if astro-mermaid supports lazy-load, otherwise Option C.** Defer to v2.15 if neither is straightforward in v2.14.

**Maintainer decision / feedback:**
- [x] Accept recommendation (Option B with C fallback)
- [ ] Modify: 
- [ ] Reject; alternative direction: 
- Notes: Resolved 2026-05-06.

---

## Instructions for Reviewer

**Your role:** Independent critical reviewer. Your job is to find problems, inconsistencies, gaps, and risks in this spike report and the verdict it claims. You are not here to validate - you are here to pressure-test. The spike report drives the v2.14.0 cycle scope and a 17-22 hour migration estimate; errors here propagate into Bucket B execution.

**Key principles:**
- Disagreement is more valuable than agreement
- If you find nothing wrong in a section, say so explicitly and explain WHY
- If you find nothing wrong anywhere, that's suspicious - look harder
- Rate your confidence - low-confidence concerns are still worth noting
- Cite specific evidence for every finding (section numbers, quotes, file paths, log file references)

**Source documents:**

| Document | Path | Role |
|----------|------|------|
| Primary (under review) | `docs/internal/release-plans/v2.14.0/plan_v2.14_starlight-spike-report_2026-05-06.md` | The spike report whose claims and verdict need pressure-testing |
| Spike plan (rubric reference) | `docs/internal/release-plans/v2.14.0/plan_v2.14_starlight-spike.md` | The protocol the report should be applying; check that report findings actually answer the rubric in Section 3 |
| v2.14 cycle plan (consistency reference) | `docs/internal/release-plans/v2.14.0/plan_v2.14.0.md` | The cycle plan whose Status Snapshot, Sources, and Decisions table now reference this report; check cross-doc consistency |
| v2.13 Zensical spike report (BLOCKER baseline) | `docs/internal/release-plans/v2.13.0/plan_v2.13_zensical-spike-report_2026-05-05.md` | The NO-GO baseline the report compares against; verify the comparison table is accurate |
| Spike build logs (evidence) | Repo root: `_spike-mkdocs-baseline.log`, `_spike-mkdocs-baseline-clean.log`, `_spike-starlight-build1.log` through `_spike-starlight-build5-mermaid.log` | Empirical evidence; spot-check that report's numerical claims match log contents |
| Spike POC | `_spike/starlight-poc/` (gitignored) | The actual built POC; spot-check `dist/` outputs, `astro.config.mjs`, `package.json`, `src/content.config.ts` if needed |

**Process note:** Codex sandbox shell is unavailable on Windows (`CreateProcessAsUserW failed: 5`). Fall back to MCP filesystem reads exclusively for this review.

**Finding format:**

- [Severity | Confidence] Description with evidence woven in. Source says "X" (Section N) but also says "Y" (Section M). → Recommendation.

**Severity definitions:**
- **Blocker** - Must resolve before Bucket B kickoff. Will cause incorrect migration estimate or misframe the v2.14 scope.
- **Major** - Should resolve before Bucket B kickoff. Significant gap causing confusion or rework during migration.
- **Minor** - Can defer. Real issue but won't prevent Bucket B from succeeding.
- **Note** - Observation or suggestion. No action required but worth considering.

---

## Document Under Review

The spike report is too long to embed verbatim (~400 lines). Read the full source at the path above. Below are the key claims that drive the verdict, which Codex should pressure-test specifically.

**Key claims to validate:**

### Verdict claims

1. **Verdict: GO-WITH-CAVEATS.** Recommend committing to Starlight migration in v2.14.0 Bucket B.
2. **All three v2.13 BLOCKERs cleared.** Redirects PASS, excludes PASS, parser warnings PASS (0 vs Zensical's 2,940).
3. **Caveats are bounded one-shot remediations summing to ~17-22 hours of focused work across 3-5 calendar days.**

### Empirical / numerical claims

4. **7 of 7 spot-checked redirect URLs generated meta-refresh HTML pages.** All 12 mkdocs.yml redirect_maps entries ported to Astro `redirects:` config.
5. **0 internal/* paths leaked into `dist/` output.** Excludes verified at filesystem level (via robocopy `/XD internal`); config-level exclusion NOT separately tested in the spike.
6. **0 non-redirect parser warnings in Starlight build** (vs Zensical 0.0.40's 2,940 false-positive parser warnings on bracketed-text patterns).
7. **123 pages built from 125 source files** (2 redundant or merged); 356 total files in `dist/`.
8. **Cold build time: 14.55s without mermaid, 20.76s with mermaid** vs Material baseline 6.99s. Soft target was 1.5x Material; actual is 2.08-2.97x.
9. **Warm rebuild: 9.12s** (1.30x Material full build).
10. **51 of 125 source files (~41%) lacked `title:` frontmatter** and required injection. The spike used a script to derive titles from filenames; production migration would replicate this approach (~1 hour estimate).
11. **Material baseline build under `--strict`: 13 broken-link warnings** (real broken cross-references catalogued in v2.13 final-sweep as F5/F7), NOT parser false-positives.

### Verdict-driving findings

12. **Mermaid via astro-mermaid 2.0.1 integration: PASS.** `<pre class="mermaid">` elements emitted in built output for known-mermaid pages (e.g., `using-meeting-skills.md`'s 3 blocks).
13. **Generator output (Pattern 5C) preserved.** `generated: true` and `source:` frontmatter pass through Starlight's content collection schema (extended via custom Zod schema in `src/content.config.ts`).
14. **Search via Pagefind: PASS.** Indexed 122 pages, 10,806 words.
15. **Sidebar autogenerate: PASS.** Sections render with collapsible groups.
16. **Base path applied correctly to canonical URLs, sitemap, and asset paths** (e.g., `https://product-on-purpose.github.io/pm-skills/skills/...`).

### Caveats catalog (5 items, severity claims to verify)

17. **Caveat 1 (MEDIUM):** Title frontmatter required on every doc; 51 files affected; ~1 hour script remediation.
18. **Caveat 2 (IMPORTANT, but bounded):** Astro `redirects:` config does NOT auto-prepend the `base: '/pm-skills'` to destination URLs. Source paths route correctly with base; destination paths in meta-refresh and canonical link are bare. On GitHub Pages this would 404. Two fix options: manually prefix base in 12 destinations, or use a build-time hook. Estimated <1 hour.
19. **Caveat 3 (MINOR):** `docs/templates/skill-template/SKILL.md` placeholder YAML uses `<one of: ...>` syntax that contains `:` and is parsed as a nested mapping. Spike removed `templates/` from content collection; production fix is one-line config or path move.
20. **Caveat 4 (MINOR):** Astro 6.x requires Node `>=22.12.0`; local has 22.11.0. Spike pinned to Astro 5.13.x + Starlight 0.34.x which accept any Node 22.x. Production fix: bump Node, or stay on Astro 5 and migrate to 6 in v2.15.
21. **Caveat 5 (MEDIUM):** Custom CSS in `docs/stylesheets/extra.css` likely targets Material-specific class names (`md-nav`, `md-content`, etc.) which Starlight does not use. Need to port to Starlight's class names (`sidebar`, `sidebar-pane`, etc., plus per-component Astro scoped hashes). ~4-8 hours estimated.

### Comparison claim

22. The Zensical (v2.13) vs Starlight (v2.14) comparison table at the bottom of the report claims Zensical's three failures (zero redirects generated, 183 internal files leaked, 2,940 false parser warnings) all clear under Starlight at the same content shape. Verify these specific numbers against the v2.13 Zensical spike report at `docs/internal/release-plans/v2.13.0/plan_v2.13_zensical-spike-report_2026-05-05.md`.

---

## Findings

### 1. Spike Scope & Question Framing

*Was the spike asking the right questions to drive a GO/NO-GO decision for v2.14? Did it test the load-bearing risks, or did it test conveniently testable items while ducking the hard ones?*

**Reviewer - Codex (2026-05-06):**

> - [Major | High] The spike report says "all structural compatibility cleared" and recommends committing Bucket B, but the spike plan Section 2.2 includes several pass criteria that were not exercised: preview/browser rendering was not invoked, all 126/132 library samples were not mounted, custom CSS was not applied through Starlight config, theme overrides were not mapped, and GitHub Pages compatibility was inspected only through static artifacts. The POC config uses `autogenerate` and a copied `src/content/docs` tree, while the plan required current content plus production-like redirects/excludes. -> Reframe the verdict as "GO-WITH-CAVEATS pending Bucket B validation gates" and list every untested GO criterion as a required migration task.
> - [Minor | Medium] Testing Astro 5.13.x instead of Astro 6 is not itself a scope flaw because `_spike-starlight-build1.log` proves the local Node 22.11.0 runtime blocks Astro 6, and the report recommends an explicit Astro 5 vs Node-bump decision. The gap is that the report treats "Astro 5 is current-maintained" as sufficient without tying it to a release-support horizon or a lockfile/engines policy. -> Add a version gate: v2.14 ships on Astro 5 with pinned dependencies and a planned v2.15 Astro 6 revisit, or it bumps Node before migration.

**Requestor - Claude Opus 4.7 (2026-05-06):**

> **S1.M1 (untested GO criteria):** Agree, accept the framing change. The spike POC did not exercise preview/browser rendering, library samples (132 files), custom CSS via Starlight config, theme overrides, or production GitHub Pages deployment - and treating these as "structurally cleared" by inference is exactly the kind of self-favoring drift this review is meant to catch. Will reframe the verdict to "GO-WITH-CAVEATS pending Bucket B validation gates" and add an explicit acceptance-gate list covering each untested criterion. Becomes Recommendation 1 in the synthesis.
>
> **S1.M2 (Astro version gate):** Agree. Will add an `engines.node` policy and explicit pin documentation in the migration plan; the Astro 5 vs Astro 6 + Node bump trade-off becomes the v2.15 doc-stack-upgrade decision but needs the engines/lockfile angle added now.

---

### 2. Empirical Evidence & Numerical Claims

*Are the 22+ specific numerical and empirical claims in the report actually supported by the spike artifacts (build logs, dist/ inventory, configs)? Or are some claims rounded, inferred, or stated with more confidence than the evidence supports?*

**Reviewer - Codex (2026-05-06):**

> - [Major | High] The performance numbers are not traceable as written. `_spike-starlight-build4.log` reports `123 page(s) built in 12.23s`, `_spike-starlight-build5-mermaid.log` reports `123 page(s) built in 18.69s`, and `_spike-mkdocs-baseline-clean.log` reports `Documentation built in 6.00 seconds`; the report's table instead uses 14.55s, 20.76s, and 6.99s. Those may be wall-clock measurements, but the report does not label them or explain why it mixes or supersedes tool-reported times. -> Add a measurement note separating tool-reported build time from wall-clock elapsed time, then recompute the ratios against one consistent baseline.
> - [Minor | High] The "0 warnings" claim needs narrower wording. It is accurate for Starlight parser warnings on the sampled content, but `_spike-starlight-build5-mermaid.log` emits a Vite chunk-size warning for Mermaid (`mermaid.core` over 500 kB), and Pagefind reports 12 redirect pages without an `<html>` element. The report excludes Pagefind notes but not the Vite warning. -> Change "0 warnings" to "0 content/parser warnings" and catalog the Mermaid chunk warning as a performance/UX caveat, not a parser caveat.
> - [Minor | Medium] The Pattern 5C claim is over-specific. The POC schema in `src/content.config.ts` accepts `generated` and `source`, and the built skill page includes the source-path warning text, but `dist/skills/define/define-hypothesis/index.html` does not visibly prove that `generated: true` survived into HTML metadata. -> Say the fields are accepted by the content collection schema and do not block build; do not claim built HTML metadata preservation unless an Astro data artifact proves it.
> - [Note | High] Several numerical claims do check out: the current `docs/` tree has 125 non-internal Markdown files with 51 missing `title:` (39 no frontmatter, 12 frontmatter without title); the POC `dist/` has 356 files and no `internal/` paths; `concepts/triple-diamond/index.html` contains the bare redirect destination exactly as quoted; `using-meeting-skills/index.html` contains three `<pre class="mermaid">` blocks; and Pagefind indexes 122 pages / 10,806 words.

**Requestor - Claude Opus 4.7 (2026-05-06):**

> **S2.M1 (perf number sourcing):** Agree, real measurement-discipline gap. The 14.55s / 20.76s / 6.99s in the report are PowerShell `Stopwatch` wall-clock times around `npm run build` (which includes Node startup + npm script overhead), while Codex correctly cites the Astro-internal "X page(s) built in Y" tool-reported times (12.23s / 18.69s / 6.00s). Both are real but measure different things. Will add a measurement-methodology note and pick ONE consistent baseline going forward (recommend tool-reported, since CI is what matters and CI bypasses the npm script wrapper). Recomputed ratios on tool-reported numbers: cold no-Mermaid = 12.23/6.00 = 2.04x; cold with-Mermaid = 18.69/6.00 = 3.12x. Still overshoots the 1.5x soft target and the 2x NO-GO trigger - reinforces the case for D1 explicit waiver + remediation gate.
>
> **S2.M2 (Vite chunk warning):** Agree. Will reword "0 warnings" to "0 content/parser warnings" and add the Mermaid `mermaid.core` >500kB Vite chunk-size warning as a documented finding (becomes part of D4 Mermaid loading strategy decision).
>
> **S2.M3 (Pattern 5C wording):** Agree. Accurate claim is "schema accepts the fields without build error", not "fields preserved into HTML metadata." Will reword.
>
> **S2.N1 (numerical claims that did check out):** Acknowledged. Useful confirmation that the bulk of the empirical work survived independent verification.

---

### 3. Migration Approach Viability

*Is the GO-WITH-CAVEATS migration path actually achievable in v2.14 within the stated 17-22 hour estimate, or is the estimate optimistic/incomplete?*

**Reviewer - Codex (2026-05-06):**

> - [Major | High] The "Library samples mount + spot-verification (~2 hours)" estimate is under-supported because the POC did not mount `library/skill-output-samples/` at all; `rg --files library/skill-output-samples` finds 132 files, while the POC content tree has no `library` or `skill-output-samples` paths. The spike plan made samples a pass criterion, and this is exactly where MDX-vs-Markdown collisions, relative-link drift, or typography regressions would surface. -> Treat sample mounting as an explicit migration workstream with its own build pass and sample matrix, not a 2-hour assumption.
> - [Major | High] The "Sidebar nav refinement (~2 hours)" estimate is likely optimistic. `mkdocs.yml` has explicit ordering and labels across Home, Skills subgroups, Guides, Concepts, Showcase, Reference, Contributing, and Releases; the POC uses broad `autogenerate` groups, which already produces label/order drift such as generated release titles and `reference/readme/` instead of the authored "Overview" entry. -> Either port the `mkdocs.yml` nav intentionally or accept Starlight-generated IA as a product decision; do not budget this as a small cleanup until the desired IA is chosen.
> - [Minor | High] The CSS estimate is plausible but unverified. `docs/stylesheets/extra.css` is small, but every selector in it is either Material-specific (`.md-grid`, `.md-button`, `.md-tags .md-tag`) or generic enough to need visual confirmation (`.mermaid`, `details.example`), and the POC config does not include a `customCss` equivalent. -> Add a quick CSS inventory and browser screenshot pass before locking the 4-8 hour estimate.
> - [Minor | Medium] The 17-22 hour total has no explicit contingency even though the report names untested surfaces: samples, production excludes, GitHub Pages redirects, custom CSS, and sidebar IA. The 3-5 calendar-day claim may be fine for focused work, but the plan should distinguish hands-on hours from review cycles and human visual smoke testing. -> Add a 30-50% risk buffer or split the estimate into base work plus validation reserve.

**Requestor - Claude Opus 4.7 (2026-05-06):**

> **S3.M1 (library samples not mounted):** Agree completely. The spike never touched `library/skill-output-samples/` (132 files), and assigning a 2-hour estimate based on "they're just markdown so should work" is wishful. Will promote sample mounting to its own Bucket B workstream with: explicit content-collection mount strategy, a build pass against the full sample set, and a sample-matrix smoke test (one sample per skill phase to catch typography/MDX collisions). Realistic estimate: 4-6 hours, not 2.
>
> **S3.M2 (sidebar IA optimism):** Agree. The autogenerate POC produced exactly the label-drift Codex describes. This is a real product decision (D3), not a 2-hour cleanup. Will reframe in the migration plan and present three options (full port, full autogenerate, hybrid) for maintainer signoff.
>
> **S3.M3 (CSS unverified):** Agree. Will add a CSS inventory + browser screenshot pass as a Bucket B prerequisite before locking the 4-8 hour estimate.
>
> **S3.M4 (no contingency buffer):** Agree. Will split the total into base work (17-22 hours) + validation reserve (8-12 hours). New headline becomes "25-34 hours" with explicit reserve.

---

### 4. Verdict & Recommendation Robustness

*Is GO-WITH-CAVEATS the correct verdict given the spike findings, or should the verdict be different (e.g., GO without caveats - too optimistic; or NO-GO - if any caveat actually rises to BLOCKER level)?*

**Reviewer - Codex (2026-05-06):**

> - [Major | High] The verdict under-applies the published performance rubric. Spike plan Section 3.3 says NO-GO if cold build regresses `>=2x` against Material with no clear path to remediation; the report's own ratios are 2.08x without Mermaid and 2.97x with Mermaid, and the only mitigation offered is "acceptable for migration" plus generic modern-toolchain benefits. That may be a reasonable human waiver, but it is not the rubric as written. -> Either revise the verdict to explicitly waive the performance NO-GO trigger with rationale, or add a concrete remediation path and validation target before Bucket B proceeds.
> - [Major | High] The redirect destination base-path bug is framed too softly for a migration commitment. `dist/concepts/triple-diamond/index.html` redirects from `/pm-skills/concepts/triple-diamond/` to bare `/concepts/triple-diamond-delivery-process/`, and its canonical URL also drops `/pm-skills`; on GitHub Pages that is a user-facing 404. This is not a Starlight NO-GO if the fix is mechanical, but it is a pre-ship blocker and must be an acceptance gate. -> Promote it from "IMPORTANT but bounded" to "pre-ship BLOCKER / migration gate" while keeping the GO-WITH-CAVEATS verdict if the team accepts the fix cost.

**Requestor - Claude Opus 4.7 (2026-05-06):**

> **S4.M1 (perf rubric collision):** Agree, this is the finding I primed in the review prompt and Codex correctly held the line. Will resolve via D1 explicit-waiver Decision Brief rather than implicit bypass. Recommended path: Option B (waiver + add Bucket B remediation gate at cold build <12s) because it preserves rubric credibility and the cost is bounded. Will rewrite the verdict section to make the waiver explicit and tie the GO recommendation to maintainer signoff on D1.
>
> **S4.M2 (redirect destination BLOCKER):** Agree. The bare-destination meta-refresh would 404 on GitHub Pages for every redirected URL. That is user-facing breakage, not "bounded caveat." Will promote from "IMPORTANT but bounded" caveat to "pre-ship BLOCKER / Bucket B acceptance gate." The fix itself is still mechanical (12 destinations need /pm-skills/ prefix, or investigate Astro auto-prepend option), but framing it as a gate ensures it cannot ship unaddressed.

---

### 5. Stakeholder Impact Coverage

*Does the spike report address impact on the three stakeholder groups identified in v2.13 release-notes framing (skill consumers, contributors, pm-skills-mcp users)?*

**Reviewer - Codex (2026-05-06):**

> - [Major | High] Contributor impact is under-covered, and the POC exposes a concrete contributor-facing defect: the built homepage edit link points to `https://github.com/product-on-purpose/pm-skills/edit/main/docs/src/content/docs/index.md`, which is not the source path in the repository. That comes from combining `editLink.baseUrl: .../docs/` with copied Starlight content under `src/content/docs`. -> Add "edit links resolve to real source files" and "authoring path stays intuitive" to the migration acceptance criteria.
> - [Minor | Medium] The report names cosmetic diffs and contributor-guide updates, but it does not summarize stakeholder-specific impact. Skill consumers need URL/search/theme expectations; contributors need title-frontmatter, MDX/component, build-command, and edit-link changes; pm-skills-mcp users likely need an explicit "not affected" statement; search engines and downstream scrapers need redirect/canonical stability called out. -> Add a short stakeholder impact section before promoting the report into the cycle plan.

**Requestor - Claude Opus 4.7 (2026-05-06):**

> **S5.M1 (edit-link defect):** Strong agree, and this is a finding I had not noticed - genuinely useful catch. The edit-link bug is downstream of the production content-source strategy decision (D2): if production keeps the filesystem copy, edit links break the same way they did in the POC; if production mounts `docs/` in-place via custom docsLoader (D2 Option B, my recommendation), edit links resolve correctly. Will add "edit-link resolves to actual repo source" as an explicit Bucket B acceptance criterion AND tie it to D2 in the cycle plan.
>
> **S5.M2 (stakeholder summary):** Agree. Will add a short stakeholder impact section to the spike report covering skill consumers (URL stability, search/theme changes), contributors (frontmatter requirements, edit-link behavior, MDX/build commands), pm-skills-mcp users (explicit "not affected"), and search engines / scrapers (redirect canonical stability).

---

### 6. Migration Risk Identification

*Are migration risks identified comprehensively, or are there risks the spike report does not surface that could surprise Bucket B execution?*

**Reviewer - Codex (2026-05-06):**

> - [Major | High] The internal-docs privacy boundary is not proven in the production mode the report recommends. The report's PASS is based on a filesystem copy that omitted `docs/internal/`; `src/content.config.ts` uses plain `docsLoader()` with no exclusion pattern, and the report says production should use `docsLoader({ pattern: '!internal/**' })` or `draft: true` but did not test either. Because the v2.13 baseline had a 183-file internal leak, this must not remain an assumption. -> Add a Bucket B gate that builds from the production content source and asserts zero `internal/` output paths.
> - [Minor | Medium] Mermaid risk is under-surfaced as a user-side performance issue. The integration works and transforms diagrams, but `_spike-starlight-build5-mermaid.log` adds a large Mermaid client payload and a Vite chunk warning, including `mermaid.core` at 601.87 kB minified. -> Track this separately from build time; decide whether eager Mermaid support is acceptable or whether diagrams should be lazy-loaded/code-split.
> - [Note | High] The Zensical comparison numbers are accurately carried over from the v2.13 report: zero redirect HTML files, 183 internal files leaked, and 2,940 false-positive parser warnings. The comparison table's structural conclusion is sound; the main fix is to avoid implying Starlight cleared every adjacent production risk in the same depth.

**Requestor - Claude Opus 4.7 (2026-05-06):**

> **S6.M1 (internal-docs privacy not proven in production mode):** Agree, and given the v2.13 baseline had a 183-file internal leak this absolutely cannot remain an assumption. Will add a Bucket B acceptance gate that builds from the production content source (per D2 Option B in-place mount) and asserts zero `internal/` paths in `dist/` output via an automated check (PowerShell + shell one-liner in CI). Check cost is trivial; safety value is high.
>
> **S6.M2 (Mermaid bundle size as performance risk):** Agree. Goes into D4 Mermaid loading strategy as the primary motivation for lazy-load.
>
> **S6.N1 (Zensical numbers verified):** Acknowledged. Useful independent confirmation that the comparison table is accurate.

---

### 7. Hidden Assumptions

*What is the report assuming that it does not state? What could go wrong in Bucket B because of unstated assumptions?*

**Reviewer - Codex (2026-05-06):**

> - [Major | High] The largest hidden assumption is that a copied POC under `src/content/docs` is equivalent to the production migration. It is not automatically equivalent: source paths change, edit links already break, default `docsLoader()` has no tested `internal/` exclusion, and production may want to mount or transform the repo `docs/` tree rather than copying it. -> Make "production content-source strategy" an explicit design decision before applying the report's estimates.
> - [Minor | Medium] Dependency and runtime pinning are less robust than the prose implies. `package.json` pins Astro and Starlight with `~`, but `astro-mermaid` is `^2.0.1`, and there is no visible `engines` field documenting the Node floor. Combined with the Astro 6 failure on Node 22.11.0, this leaves CI reproducibility underspecified. -> Add `engines.node`, pin or consciously float `astro-mermaid`, and document the Node upgrade policy.

**Requestor - Claude Opus 4.7 (2026-05-06):**

> **S7.M1 (POC-vs-production assumption):** Agree, this is the meta-finding that subsumes several others (S5.M1 edit links, S6.M1 internal-docs privacy, parts of S3 sample mount + sidebar IA). Will surface this as D2 Production Content-Source Strategy Decision Brief at the v2.14 cycle plan level (not just buried in the spike report) so it gets explicit maintainer signoff before Bucket B kickoff. Recommendation is Option B (in-place mount via custom docsLoader pattern) because it makes contributor workflow and edit links work correctly with no source-shuffling.
>
> **S7.M2 (dependency pinning weak):** Agree. Will add an `engines.node` field, pin `astro-mermaid` consciously (or float with documented policy), and document the Node upgrade policy in the migration plan.

---

## Proposed Actions

20 actions consolidated below: 15 spike-report and migration-plan updates, 4 Decision Briefs added to v2.14 cycle plan Decisions section, 1 deferral. Updates land in a single follow-up commit on the spike report and cycle plan; Decision Briefs land pending maintainer signoff on D1-D4.

| # | Action | Target | Change | Triggered By |
|---|--------|--------|--------|-------------|
| 1 | Update | Spike report Outcome section | Reframe verdict from "GO-WITH-CAVEATS" to "GO-WITH-CAVEATS pending Bucket B validation gates"; add untested-criteria gate list (samples, production excludes, GH Pages redirects, edit-link resolution, sidebar IA, CSS port) | S1.M1, Major |
| 2 | Update | Spike report Performance subsection | Add measurement-methodology note distinguishing PowerShell wall-clock from Astro tool-reported times; recompute ratios on tool-reported numbers (2.04x cold no-Mermaid; 3.12x with Mermaid; 1.30x warm) | S2.M1, Major |
| 3 | Update | Spike report "What worked" Build pipeline | Reword "0 warnings" to "0 content/parser warnings"; add Vite chunk-size warning for Mermaid `mermaid.core` >500kB as documented finding | S2.M2, Minor |
| 4 | Update | Spike report Generator output Pattern 5C claim | Reword from "preserved into HTML metadata" to "schema accepts fields without build error" | S2.M3, Minor |
| 5 | Update | Spike report effort-estimate table (Library samples row) | Promote to dedicated workstream: explicit content-collection mount + full sample build pass + sample-matrix smoke test; estimate revised 2 hrs to 4-6 hrs | S3.M1, Major |
| 6 | Update | Spike report effort-estimate table (Sidebar nav row) | Reframe as IA decision (D3); estimate revised 2 hrs to 3-5 hrs assuming hybrid (Option C) | S3.M2, Major |
| 7 | Update | Spike report effort-estimate table (Custom CSS port row) | Add "CSS inventory + browser screenshot pass" as prerequisite before locking the 4-8 hr estimate | S3.M3, Minor |
| 8 | Update | Spike report total estimate | Split into base work (17-22 hrs) + validation reserve (8-12 hrs); new headline 25-34 hrs | S3.M4, Minor |
| 9 | Update | Spike report Caveat 2 + Outcome | Promote redirect-destination base-path bug from "IMPORTANT but bounded" to "pre-ship BLOCKER / Bucket B acceptance gate" | S4.M2, Major |
| 10 | Update | Spike report Outcome | Add explicit performance NO-GO waiver section tying GO recommendation to D1 maintainer signoff (Option B: waiver + remediation gate at <12s cold) | S4.M1, Major |
| 11 | Add | Spike report (new section before Recommendation) | Stakeholder impact: skill consumers / contributors / pm-skills-mcp users / search engines breakdown | S5.M2, Minor |
| 12 | Update | Spike report Bucket B effort table + Caveats | Add "edit links resolve to actual repo source file" as Bucket B acceptance criterion; tie to D2 | S5.M1, Major |
| 13 | Update | Spike report Bucket B acceptance criteria | Add automated check: production-mode build from real content source asserts zero `internal/` paths in `dist/` (PowerShell + shell one-liner in CI) | S6.M1, Major |
| 14 | Update | Spike report (Caveat 5 area or new caveat) | Recategorize Mermaid bundle size as performance/UX risk; tie to D4 | S6.M2, Minor |
| 15 | Update | Spike POC `package.json` reference + migration plan | Document `engines.node` floor; pin or consciously float `astro-mermaid`; document Node upgrade policy | S7.M2, Minor |
| 16 | Add | v2.14 cycle plan Decisions section | D1: Performance NO-GO Waiver Decision Brief (3 options; recommend Option B waiver + remediation gate at <12s cold) | S4.M1, Major |
| 17 | Add | v2.14 cycle plan Decisions section | D2: Production Content-Source Strategy Decision Brief (3 options; recommend Option B in-place docsLoader mount) | S7.M1, Major |
| 18 | Add | v2.14 cycle plan Decisions section | D3: Sidebar IA Strategy Decision Brief (3 options; recommend Option C hybrid) | S3.M2, Major |
| 19 | Add | v2.14 cycle plan Decisions section | D4: Mermaid Loading Strategy Decision Brief (3 options; recommend Option B lazy-load if supported, else Option C code-split, else defer to v2.15) | S6.M2, Minor |
| 20 | Defer | backlog (v2.15+) | Astro 6 + Node 22.12+ bump as a focused upgrade cycle (already implicit in spike report; formalize as v2.15 candidate) | S1.M2, Minor |
