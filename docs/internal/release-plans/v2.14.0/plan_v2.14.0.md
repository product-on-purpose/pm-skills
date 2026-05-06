# v2.14.0 Release Plan: Doc Stack Migration to Astro Starlight

**Status:** Day 1 spike EXECUTED 2026-05-06; verdict GO-WITH-CAVEATS; Bucket B (migration) promoted to active execution
**Owner:** TBD
**Type:** Migration release (minor)
**Created:** 2026-05-05
**Updated:** 2026-05-06 (promoted from placeholder; spike executed; verdict GO-WITH-CAVEATS)
**Sources:**
- v2.14 Starlight compatibility spike plan: [`plan_v2.14_starlight-spike.md`](./plan_v2.14_starlight-spike.md)
- v2.14 Starlight spike report: [`plan_v2.14_starlight-spike-report_2026-05-06.md`](./plan_v2.14_starlight-spike-report_2026-05-06.md) (executed 2026-05-06; GO-WITH-CAVEATS)
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

### Bucket A: Starlight compatibility spike (Day 1, time-boxed 60 min)

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

### Bucket B: Migration execution (active scope on GO verdict)

This is the planned path. Approximate sequence (1-2 weeks of focused work):

1. **Config rewrite.** `mkdocs.yml` to `astro.config.mjs` + Starlight config. Nav, theme overrides, plugins, redirects, excludes, custom_dir replacements.
2. **Content collection setup.** Map current `docs/` structure to Starlight content collections. Diataxis folders (concepts, guides, reference) become collection entries.
3. **Theme port.** Custom CSS overrides, partials, branding, badges. Identify which need rewriting as Astro components vs simple style tokens.
4. **Generator updates.** Verify `generate-skill-pages.py`, `generate-workflow-pages.py`, `generate-showcase.py` outputs work in Starlight without modification (likely yes; markdown is markdown). Update Pattern 5C `source:` frontmatter field if path conventions change.
5. **Redirects port.** Every entry in current `mkdocs.yml redirect_maps` maps to Astro `redirects:` config. Includes the v2.13.0-era redirects (frameworks/triple-diamond, concepts/skill-anatomy, etc.).
6. **CI integration.** New build workflow on Astro; existing validators run unchanged (they validate source markdown, not the rendered site).
7. **GitHub Pages deployment** workflow updated to Astro's build output structure.
8. **Performance benchmarking.** Verify cold build + rebuild times match expectations from the spike.
9. **Smoke test.** Browse all major doc paths; verify no regressions on user-visible content.

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

## Open Questions

| # | Question | Default | Decision |
|---|---|---|---|
| OQ-1 | Run Starlight spike before v2.14.0 cycle officially starts (planning), or as Day 1 of the cycle? | Day 1 of cycle | TBD |
| OQ-2 | If GO with caveats, are the caveats acceptable for v2.14.0 ship, or do they push migration to v2.15.0? | Depends on caveat severity; defer until spike returns | TBD |
| OQ-3 | Custom Material theme overrides (CSS, partials) - do they need 1:1 reproduction in Starlight, or is "use Starlight defaults plus minimal branding" acceptable? | Minimal reproduction; Starlight defaults are 2025-modern and likely an upgrade | TBD |
| OQ-4 | Is the Mermaid integration overhead worth doing in v2.14.0, or defer Mermaid-rich pages to a follow-up? | Include in v2.14.0 (Mermaid is used in homepage hero, release notes, master plans) | TBD |
| OQ-5 | GitHub Pages vs Cloudflare Pages vs other deploy target? | GitHub Pages (current); revisit only if build time or quotas hit limits | TBD |

---

## Phase 0 Adversarial Review Loop (carry-forward)

v2.14.0 will run the same per-strand + release-state Phase 0 adversarial review loop pattern codified in v2.11.0 + v2.12.0 + v2.13.0. Apply lesson from v2.13.0 PR.2 round 8:

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
Day 1: Starlight spike (60 min, time-boxed)
  to GO              Days 2-N: Bucket B migration execution (planned path)
  to GO-WITH-CAVEATS Days 2-N: Bucket B with documented caveats; possibly v2.14 ships partial; v2.15 finishes
  to NO-GO           Day 1.5+: pivot to Contingency scope (sample-automation, doc-cleanup, etc.)
```

---

## Status Snapshot

| Item | Status |
|---|---|
| Cycle plan (this file) | Committed (2026-05-06); Bucket B promoted to active execution after GO-WITH-CAVEATS verdict |
| Spike plan | Authored 2026-05-06 at [`plan_v2.14_starlight-spike.md`](./plan_v2.14_starlight-spike.md); executed |
| Spike rubric | Codified in spike plan Section 3; mirrors v2.13's structure with Starlight-specific pass conditions |
| Spike date | Executed 2026-05-06 (~50 min execution + 15 min report) |
| Spike report | [`plan_v2.14_starlight-spike-report_2026-05-06.md`](./plan_v2.14_starlight-spike-report_2026-05-06.md); verdict GO-WITH-CAVEATS |
| Theme decision | Committed: Starlight migration; spike confirmed; Bucket B execution begins next session |
| Caveats from spike | 5 bounded items totaling ~17-22 hours estimated migration effort (table in spike report) |
| Contingency status | NOT triggered (Bucket B path active) |
| Out-of-cycle MCP impact | None expected |

---

## Related artifacts

- v2.13.0 release notes: [`../../../releases/Release_v2.13.0.md`](../../../releases/Release_v2.13.0.md) - the cycle that returned the Zensical NO-GO and proposed Starlight as Plan B
- v2.13.0 master plan: [`../v2.13.0/plan_v2.13.0.md`](../v2.13.0/plan_v2.13.0.md)
- v2.13.0 final sweep: [`../v2.13.0/plan_v2.13_final-sweep_2026-05-05.md`](../v2.13.0/plan_v2.13_final-sweep_2026-05-05.md)
- Backlog-canonical: [`../../backlog-canonical.md`](../../backlog-canonical.md)
