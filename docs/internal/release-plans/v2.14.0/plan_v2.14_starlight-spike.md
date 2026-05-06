# v2.14 Astro Starlight Compatibility Spike: Plan

**Status:** Authored; execution pending Day 1 of v2.14.0 cycle
**Cycle:** v2.14.0
**Created:** 2026-05-06
**Type:** Time-boxed deciding artifact
**Predecessor:** [v2.13 Zensical Compatibility Spike Plan](../v2.13.0/plan_v2.13_zensical-spike.md) (executed 2026-05-05; outcome NO-GO)

> **What this is.** A compatibility spike against the current `mkdocs.yml` to decide whether pm-skills can migrate from Material for MkDocs to Astro Starlight. The spike produces a GO / GO-WITH-CAVEATS / NO-GO decision artifact that determines whether v2.14.0 ships the migration (Bucket B) or pivots to backlog scope (Bucket C). The decision rubric mirrors v2.13 verbatim with "Zensical" replaced by "Starlight"; the differences are in what gets installed, what tests target, and what the BLOCKER baseline looks like.

---

## 1. Background

**Why a doc-stack migration is on the table at all.** v2.13.0's Zensical spike returned NO-GO at Zensical 0.0.40 due to two structural BLOCKERs and one IMPORTANT-severity issue:

- **BLOCKER 1**: `mkdocs-redirects` plugin not honored by Zensical's parser. All current redirect_maps entries silently no-op; users hitting the old URL paths would get 404s.
- **BLOCKER 2**: `exclude_docs:` directive not honored. The `docs/internal/` tree (gitignored agent-coordination + planning material) would render into the public `dist/` output.
- **IMPORTANT**: 2,940 false-positive parser warnings on bracketed text patterns (`[role]`, `[yes / no]`, `cards[3]`) that Material accepted as plain markdown but Zensical's parser flagged as broken link references.

Material itself is in stated maintenance mode (~12 months, security and bug fixes only); the upstream MkDocs project shows signs of v2-major-rewrite churn. So pm-skills has both a near-term need (find a doc stack with active investment) and a defined cliff (the Zensical NO-GO). Astro Starlight is the strongest forward-looking alternative based on the post-v2.13 evaluation captured in the v2.14 cycle plan.

**Why Astro Starlight specifically.** Captured in detail in `plan_v2.14.0.md` Section "Reference: why Astro Starlight beats current alternatives". Summary:

- **Solves both v2.13 BLOCKERs cleanly.** Astro's first-class `redirects:` config is officially supported and tested by the Astro core team. Excludes work via `draft: true` frontmatter (per-page) + path-based content collection config (per-pattern). Not a third-party plugin.
- **Production-ready since v1.0** (September 2024). Used in production by Cloudflare Workers, Deno, Tauri, Astro itself; this is not a preview-grade tool.
- **Markdown + MDX first-class.** Source SKILL.md files do not need rewriting; generated content from Python scripts works unchanged at the markdown layer.
- **Node-only toolchain.** No Python dependency for the docs build (current Material stack pins Python ≥3.10 + 6 plugins + 14 markdown extensions). Aligns with the JS ecosystem the repo already touches via the `skills` CLI.
- **Modern web standards by default.** View Transitions, image optimization, ESM throughout, accessible color contrast defaults.

**Scope guard.** This spike is NOT a migration. No `mkdocs.yml` edits ship from the spike. No content files are rewritten. The deliverable is a written report and a GO / GO-WITH-CAVEATS / NO-GO recommendation. If the spike outputs are themselves valuable as v2.14.0 migration plan input, that is bonus, not the goal.

**Why a spike instead of jumping straight into migration.** The compatibility surface is not knowable in advance. pm-skills currently runs 6 plugins, 14 markdown extensions, 16 Material theme features, 3 Python generators producing markdown, a custom override directory, and 126 library sample files with consistent typography expectations. Even with Starlight's excellent docs, edge cases will exist. A 60-minute spike either confirms compatibility or surfaces blockers; either way it converts unknown into decision before committing 1-2 weeks of migration work.

---

## 2. Spike scope

### 2.1 What gets installed

- **Astro + Starlight** via `npm create astro@latest` with the Starlight starter template, in an isolated subdirectory under the repo (proposed: `_spike/starlight-poc/`, gitignored at spike completion). Current `mkdocs build` capability stays unaffected.
- Node version: whatever the current `package.json` engines field requires; verify Starlight's stated minimum at execution time (https://starlight.astro.build).
- No global installs; everything in a project-local `node_modules`.

### 2.2 What gets tested

| Category | Test | Pass criterion |
|---|---|---|
| **Build** | `npm run build` against a Starlight config that mounts current `docs/` content | Exit code 0 |
| **Rendering** | Open built site locally via `npm run preview` | Pages render; no obvious layout breaks |
| **Redirects (the v2.13 BLOCKER 1 retest)** | Translate all current `mkdocs.yml redirect_maps` entries to Astro `redirects:` config; visit each redirected URL | Each redirected URL returns 301/302 to the new path |
| **Excludes (the v2.13 BLOCKER 2 retest)** | `docs/internal/` content excluded via path-based config or `draft: true` frontmatter; verify excluded paths do NOT appear in built `dist/` output | Zero internal/* paths in build output |
| **Parser warnings (the v2.13 IMPORTANT retest)** | Spot-check 10 pages that triggered Zensical false-positives (`[role]`, `[yes / no]`, `cards[3]` patterns); confirm Starlight's MDX/Markdown parser does not warn | No false-positive warnings |
| **Markdown extensions equivalents** | Admonitions, code blocks with copy buttons, tabs, details/summary, footnotes, attr_list, tables | All extensions render content correctly via Starlight's built-in Markdown support, MDX components, or remark/rehype plugins |
| **Mermaid integration** | Install Astro Mermaid integration (e.g., `astro-mermaid` or rehype-mermaid); render a representative diagram from existing content | Mermaid renders inline |
| **Generator output** | `generate-skill-pages.py`, `generate-workflow-pages.py`, `generate-showcase.py` output mounted as Starlight content collections | All 63 generator-output pages render; frontmatter `generated: true` and `source:` fields preserved |
| **Library samples** | The 126 sample files render with consistent typography; no unexpected MDX-vs-Markdown collisions | Samples render; cross-thread typography stable |
| **Skill cards / category indices** | Diataxis-aligned content (concepts, guides, reference) maps cleanly to Starlight content collections | Nav and index pages reflect current structure |
| **Search** | Starlight's built-in Pagefind search indexes the content | Search UI returns expected results |
| **Custom CSS** | Current `extra.css` rules port to Starlight's `customCss` config | Visible style rules apply |
| **Theme overrides** | The `overrides/` directory's intent (custom partials, branding) maps to Starlight component overrides | Either honored via component slots or clearly documented as divergence |
| **Build performance** | Time `npm run build` cold and warm | Cold build at most 1.5x slower than `mkdocs build`; rebuild faster than full Material build |
| **GitHub Pages compatibility** | Verify Starlight's static output deploys cleanly to GitHub Pages | Site loads at `/pm-skills/` base path; assets resolve |

### 2.3 What does NOT get tested

- **Pixel-perfect theme reproduction.** Starlight's defaults are 2025-modern; the goal is "no regression" not "identical look". Document divergences but do not attempt re-theming during the spike.
- **Social card generation** (Material's `social` plugin). Starlight has built-in OG image support; verify it works at all, defer fidelity comparison to migration.
- **Search ranking quality.** Functional yes/no only; do not compare relevance against Material's Lunr.
- **Mobile responsiveness.** Desktop verification only.
- **Tags plugin parity.** Material's `tags` plugin has no direct Starlight equivalent; document the gap but do not prototype a replacement.
- **`git-revision-date-localized` parity.** Starlight has a similar capability via remark plugins; verify availability, do not fully integrate.
- **Privacy plugin parity.** Material's `privacy` plugin handles external asset proxying; Starlight's approach differs structurally. Note the gap; do not deep-test.
- **Performance optimization passes.** Whatever `npm run build` produces out-of-the-box is the number; no tuning.

---

## 3. Decision rubric

After the spike runs, the report classifies the outcome into one of three buckets. The rubric mirrors v2.13's verbatim with Starlight-specific pass conditions baked in.

### 3.1 GO

**All of:**
- `npm run build` exits 0 with the current `docs/` mounted as a Starlight content collection.
- **Redirects work** (the v2.13 BLOCKER 1 cleared): every entry from the current `mkdocs.yml redirect_maps` translates to `redirects:` config and resolves correctly when visited.
- **Excludes work** (the v2.13 BLOCKER 2 cleared): `docs/internal/` content does not appear in `dist/` output.
- **No false-positive parser warnings** (the v2.13 IMPORTANT cleared) on bracketed-text patterns.
- All 3 generators' output renders without modification.
- Mermaid diagrams render via the chosen integration.
- Custom CSS rules apply.
- All 126 library samples render with consistent typography.
- Search indexes content via Pagefind.
- Cold build at most 1.5x slower than Material; warm rebuild faster than Material full build.
- GitHub Pages deploy target works at the `/pm-skills/` base path.

**Outcome:** Commit to Astro Starlight migration in v2.14.0. v2.14 master plan promotes Bucket B to active scope. Migration ships in v2.14.0.

### 3.2 GO-WITH-CAVEATS

**Most of GO criteria pass but with N issues:**
- 1-2 markdown extensions or theme features need bespoke remark/rehype work or component overrides (e.g., `pymdownx.tasklist` custom checkboxes need a remark plugin).
- 1-3 plugin gaps without immediate Starlight equivalents (e.g., tags plugin, privacy plugin) require either dropping the feature or scheduling separate adoption work.
- Cosmetic rendering diffs requiring CSS adjustment.
- Build performance acceptable but not improved (within 1.5x of Material).
- One of the three v2.13 BLOCKER retests passes structurally but with caveats (e.g., redirects work but base-path handling needs explicit config).

**Outcome:** Document each caveat with severity (BLOCKER, IMPORTANT, MEDIUM, MINOR). Reuse the v2.13 PR.2 pattern of bucketing fixes. v2.14.0 migration plan adds remediation tasks. Migrate if the remediation cost is bounded (≤5 days of work). Otherwise re-evaluate scope (defer migration to v2.15.0+; v2.14 pivots to Bucket C).

### 3.3 NO-GO

**Any of:**
- Build fails structurally (not a config typo).
- Any of the three v2.13 BLOCKER retests fails on the same defect class (redirects silently no-op, excludes leak internal content, or new parser-warning storms emerge).
- Generator output fails to render or strips Pattern 5C `source:` frontmatter.
- Mermaid integration is materially broken (no working integration available, or rendering is unusable).
- Cold build regresses ≥2x against Material with no clear path to remediation.
- GitHub Pages deploy fundamentally broken at the base-path level.
- Starlight's content collection model is structurally incompatible with the current `docs/` shape (e.g., it requires per-collection schema validation that conflicts with the dynamic skill-page generators).

**Outcome:** Trigger v2.14.0 Bucket C pivot (per `plan_v2.14.0.md`). Do NOT commit to Starlight. Do NOT migrate. The doc-stack question becomes a v2.15.0+ planning concern. Do NOT auto-trigger another spike (Hugo, VitePress) inside the v2.14 cycle; cascading spikes burn time-box without converging.

---

## 4. Spike execution protocol

### 4.1 Pre-execution checklist

- [ ] Current `mkdocs build --strict` runs cleanly (baseline; capture build time)
- [ ] Current Material site rendered locally for visual reference (`mkdocs serve` snapshot of home, a skill page, a workflow page, a guide with mermaid, a reference page)
- [ ] Spike workspace directory created at `_spike/starlight-poc/` (gitignored at spike completion)
- [ ] Node version confirmed against Starlight's stated minimum (verify at https://starlight.astro.build at execution time)
- [ ] WebFetch https://starlight.astro.build to capture the latest install command and any compatibility notes
- [ ] Time-box set: 60 minutes total (40 min execution + 20 min report write); hard stop

### 4.2 Execution steps

1. **Scaffold Starlight POC.** `npm create astro@latest _spike/starlight-poc -- --template starlight --no-install --no-git`. Document the exact command and Starlight version installed.
2. **Configure content sources.** Mount the current `docs/` directory as a Starlight content collection in `astro.config.mjs`. Configure base-path (`/pm-skills/`), redirects (port from `mkdocs.yml redirect_maps`), and excludes (port from `mkdocs.yml exclude_docs`).
3. **Run build.** `npm run build`. Capture stdout/stderr to a log file.
4. **Inspect built site.** `npm run preview`. Snapshot the same 5 reference pages (home, skill, workflow, guide-with-mermaid, reference). Side-by-side against Material baseline.
5. **BLOCKER retests.**
   - Redirects: visit every URL in the redirect_maps; verify 301/302 to expected destination.
   - Excludes: `grep -r "internal" dist/` (or PowerShell equivalent); verify zero hits beyond legitimate non-path occurrences.
   - Parser warnings: visit 10 pre-identified pages with bracketed-text patterns; confirm zero false-positive warnings during build.
6. **Generator output.** Run each Python generator; mount output; verify all 63 pages render and frontmatter is preserved (especially `source:` for Pattern 5C).
7. **Library samples.** Spot-check ~10 samples across threads (storevine, brainshelf, workbench); verify consistent typography.
8. **Mermaid.** Pick one Astro Mermaid integration (likely `astro-mermaid` or `rehype-mermaid`); verify a representative diagram renders.
9. **Search.** Confirm Pagefind indexes content; basic query returns expected results.
10. **Performance.** Time `npm run build` cold (clean) and warm (cached). Compare against `mkdocs build` baseline.
11. **GitHub Pages compatibility.** Build with `site:` and `base:` configured for the GitHub Pages target. Inspect `dist/` for asset path correctness.

### 4.3 Report format

Output: `plan_v2.14_starlight-spike-report_YYYY-MM-DD.md` next to this plan.

```markdown
# Astro Starlight Compatibility Spike Report

**Date:** YYYY-MM-DD
**Executor:** [agent or person]
**Time spent:** X minutes execution, Y minutes report
**Starlight version:** vX.Y.Z
**Astro version:** vX.Y.Z
**Material version (baseline):** vX.Y.Z

## Outcome

**Decision:** GO | GO-WITH-CAVEATS | NO-GO

## v2.13 BLOCKER retest results

- **Redirects (BLOCKER 1):** [pass / caveats / fail with detail]
- **Excludes (BLOCKER 2):** [pass / caveats / fail with detail]
- **Parser warnings (IMPORTANT):** [pass / caveats / fail with detail]

## What worked

- [list each plugin/extension/feature confirmed working]

## What didn't work

- [each broken/divergent item with severity: BLOCKER, IMPORTANT, MEDIUM, MINOR]

## Cosmetic diffs (informational)

- [non-blocking visual differences worth knowing]

## Performance

- Material build: X seconds
- Starlight build (cold): Y seconds
- Starlight build (warm): Z seconds
- Verdict: [Starlight faster / comparable / regressed / faster after first build]

## Recommendation for v2.14.0

- [GO: commit to migration; v2.14 Bucket B promoted; estimated migration effort]
- [GO-WITH-CAVEATS: list remediations + per-item severity + estimated effort]
- [NO-GO: pivot v2.14 to Bucket C; theme TBD per master plan]

## Evidence

- Build log: [link or attached]
- Side-by-side screenshots: [if generated]
- Spike POC directory: `_spike/starlight-poc/` (gitignored)

## Open questions

- [anything that emerged that this spike couldn't resolve]
```

---

## 5. Plan B: pivot to Bucket C scope (triggered only on NO-GO)

If the Starlight spike returns NO-GO, **do NOT auto-trigger another doc-stack spike** (Hugo, VitePress, Eleventy). Cascading spikes inside one cycle burn time-box without converging on a decision. Instead, v2.14.0 pivots scope on the spot per `plan_v2.14.0.md` Bucket C:

- Sample-automation slate (F-31, F-32, F-33, F-35)
- Meeting Lifecycle Workflow (F-29) + Family Adoption Guide (F-30)
- Doc-cleanup mini-bucket (QW-1 to QW-9 from v2.13.0 final-sweep)
- GitHub-platform metadata refresh (M-23 + M-24)
- F-37 HTML Template Creator

The doc-stack question becomes a v2.15.0+ planning concern with a fresh evaluation pass. Material continues in maintenance-mode posture in the meantime; this is acceptable because Material's stated maintenance window is ~12 months from squidfunk's announcement and pm-skills has runway.

---

## 6. Compatibility checklist (spike-time reference)

Cross-reference current `mkdocs.yml` against Starlight equivalents at execution time:

| Current Material | Starlight equivalent | Spike outcome (TBD) |
|---|---|---|
| `plugins.search` | Built-in Pagefind | TBD |
| `plugins.privacy` | Manual; no direct equivalent | TBD |
| `plugins.social` | Built-in OG image generation | TBD |
| `plugins.tags` | No direct equivalent; could custom-build via content collection metadata | TBD |
| `plugins.redirects` | First-class `redirects:` config | TBD |
| `plugins.git-revision-date-localized` | Available via remark plugin (e.g., `remark-mtime`) | TBD |

| Current markdown extension | Starlight equivalent | Spike outcome (TBD) |
|---|---|---|
| `pymdownx.superfences` (mermaid) | Astro Mermaid integration (`astro-mermaid` or `rehype-mermaid`) | TBD |
| `pymdownx.tasklist` | Built-in GFM task lists; custom checkboxes via remark plugin if needed | TBD |
| `pymdownx.tabbed` | Starlight `<Tabs>` MDX component | TBD |
| `pymdownx.details` | Native HTML `<details>` works; or Starlight `<Aside>` for callouts | TBD |
| `pymdownx.snippets` | Starlight content imports / `<Code>` includes / MDX imports | TBD |
| `admonition` | Starlight `<Aside>` MDX component | TBD |
| `footnotes` | Built-in via remark | TBD |
| `attr_list` | MDX inline JSX or remark plugin | TBD |
| `abbr`, `def_list`, `md_in_html`, `tables`, `toc`, `pymdownx.{betterem,caret,emoji,highlight,inlinehilite,keys,mark,smartsymbols,tilde}` | Mostly built-in via remark/rehype; verify per-extension | TBD |

| Current Material theme feature | Starlight equivalent | Spike outcome (TBD) |
|---|---|---|
| Navigation tabs / sections / indexes | Starlight sidebar config | TBD |
| TOC follow | Built-in right sidebar | TBD |
| Header autohide | CSS / behavior; verify | TBD |
| Code copy / annotate / tabs.link / tooltips | Built-in or via Expressive Code | TBD |
| Edit / view actions | Starlight `editLink` config | TBD |
| Custom palette / color tokens | Starlight CSS custom properties | TBD |

---

## 7. Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Starlight scaffold install hits a Node-version mismatch | Low | Low | Verify Node version against Starlight's stated minimum before scaffold; document in pre-execution checklist |
| Spike takes >60 min, eats into Day 2 of cycle | Medium | Low | Hard time-box; if exceeded, document partial findings and stop. Day 2 starts with whatever decision is reachable. |
| Generator output uses Pattern 5C `source:` frontmatter that Starlight content collections require to declare in a schema | Medium | Medium | Test early in scope (step 6); if schema collision, document as a known migration task (low-cost: declare schema with `source: z.string().optional()`) |
| Mermaid integration choice has its own compatibility caveats | Low | Low | Pick the most-starred / most-recent integration; document the choice; note alternatives in report |
| GitHub Pages base-path handling differs from Material's | Low | Medium | Configure `site:` + `base:` early (step 11); verify asset resolution. If base-path is the only blocker, classify as IMPORTANT not BLOCKER. |
| Library samples expose MDX-vs-Markdown collisions (e.g., `<` characters in non-code-block contexts) | Medium | Low | Spot-check 10 samples across threads; if widespread, classify as MEDIUM remediation in the migration plan |
| Spike result is GO but actual migration in v2.14.0 surfaces new issues | Medium | Medium | Spike covers ~80% of compatibility; reserve v2.14.0 migration cycle to handle the remaining 20% |
| GO-WITH-CAVEATS path triggers analysis paralysis on remediation cost | Medium | Medium | Strict ≤5-day remediation budget; if exceeded, classify as NO-GO and pivot to Bucket C |

---

## 8. Pre-execution gate

The spike scaffolds an Astro project under `_spike/starlight-poc/` and runs `npm install` for it. This adds ~200-400 MB of Node modules to the local disk in a project-local directory. Before execution:

- [ ] Maintainer approval to scaffold the spike POC
- [ ] Confirm `_spike/` is gitignored (or add to `.gitignore` before scaffold)
- [ ] Confirm disk space available (~500 MB cushion for the Node modules + build output)
- [ ] Confirm Node + npm available at the version Starlight requires (verify at execution)

---

## 9. Open questions for the maintainer

1. **Time-box.** 60 minutes total (40 execution + 20 report) is my proposal, mirroring v2.13's structure. The 40-min execution allocation is wider than v2.13's 30-min because Starlight requires Node scaffold + content collection setup, where Zensical was a drop-in replacement. Reasonable, or do you want a different bound?
2. **Spike POC location.** I propose `_spike/starlight-poc/` (gitignored, deleted at spike completion). Alternative: a separate worktree to avoid any chance of accidental commit. My recommendation is the gitignored subdirectory; simpler, and the directory contents are non-load-bearing once the report exists.
3. **Reporting depth.** Same format as v2.13's Zensical report (Section 4.3). Light enough to author in 20 min; heavy enough to drive a confident decision. Confirm or adjust.
4. **GO-WITH-CAVEATS threshold.** I am proposing ≤5 days of remediation as the cutoff for "still GO". If remediation cost exceeds 5 days, treat as NO-GO. Confirm or adjust the threshold.
5. **Parallel Codex adversarial review.** v2.13 ran a Codex review of the Zensical spike report after authorship. Want the same for the Starlight report? My recommendation is yes, mirroring v2.13's Phase 0 Adversarial Review Loop pattern.

---

## 10. Related

- v2.14 cycle plan (parent): [`plan_v2.14.0.md`](./plan_v2.14.0.md)
- v2.13 Zensical spike plan (structural model): [`../v2.13.0/plan_v2.13_zensical-spike.md`](../v2.13.0/plan_v2.13_zensical-spike.md)
- v2.13 Zensical spike report (BLOCKER baseline): [`../v2.13.0/plan_v2.13_zensical-spike-report_2026-05-05.md`](../v2.13.0/plan_v2.13_zensical-spike-report_2026-05-05.md)
- v2.13 final sweep (QW backlog if pivot): [`../v2.13.0/plan_v2.13_final-sweep_2026-05-05.md`](../v2.13.0/plan_v2.13_final-sweep_2026-05-05.md)
- Current `mkdocs.yml`: [`../../../../mkdocs.yml`](../../../../mkdocs.yml)
- Astro Starlight docs (live URL): https://starlight.astro.build
- Starlight redirects config docs: https://starlight.astro.build (search "redirects")
- Starlight content collections: https://docs.astro.build/en/guides/content-collections/

---

## Change Log

| Date | Change |
|---|---|
| 2026-05-06 | Initial spike plan authored. Decision rubric: GO / GO-WITH-CAVEATS / NO-GO. 60-min time-box (40 execution + 20 report). Plan B on NO-GO is Bucket C pivot per master plan; do not cascade to another doc-stack spike inside v2.14. |
