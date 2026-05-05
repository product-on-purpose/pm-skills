# v2.13 Zensical Compatibility Spike: Plan

**Status:** Executed 2026-05-05; outcome NO-GO. See [`plan_v2.13_zensical-spike-report_2026-05-05.md`](plan_v2.13_zensical-spike-report_2026-05-05.md).
**Cycle:** v2.13.0
**Created:** 2026-05-03
**Executed:** 2026-05-05 (Claude Opus 4.7, ~55 min within the 60-min time-box)
**Type:** Time-boxed deciding artifact

> **What this is.** A compatibility spike against `mkdocs.yml` to decide whether pm-skills can migrate from Material for MkDocs to Zensical (squidfunk's own successor project). The spike produces a go / go-with-caveats / no-go decision artifact that tees up the v2.14.0+ migration commitment. v2.13 ships only the spike + decision; the actual migration is out of scope.

---

## 1. Background

**Material for MkDocs maintenance posture (verified via WebSearch 2026-05-03):**

- MkDocs (the upstream framework) is potentially abandoned. A v2 release may publish that breaks current Material plugins.
- Material for MkDocs is in **maintenance mode** for ~12 months (security and bug fixes only, no new features) per squidfunk's announcement.
- **Zensical** is squidfunk's own successor project: drop-in `mkdocs.yml` compatibility, ZRX differential build engine (4-5x faster rebuilds), third-party module ecosystem opening early 2026.

**Why a spike, not a commitment.** The compatibility surface is not knowable in advance. pm-skills uses 6 plugins, 14 markdown extensions, 16 Material theme features, 3 Python generators producing markdown, and a custom override directory. Even with squidfunk authoring both Material and Zensical, edge cases will exist. A 30-60 minute spike either confirms compatibility or surfaces blockers  -  either way it converts unknown into decision.

**Scope guard.** This spike is NOT a migration. No `mkdocs.yml` edits ship. No theme files change. The deliverable is a written report and a go/no-go recommendation. If the spike outputs are themselves valuable (e.g., the report becomes the v2.14.0 migration plan input), that's bonus, not the goal.

---

## 2. Spike scope

### 2.1 What gets installed

- **Zensical** via the install method documented at https://zensical.org (likely `pip install zensical` or similar; verify at execution time).
- Installed in a Python virtual environment isolated from the current Material installation. The current `mkdocs build` capability stays unaffected.

### 2.2 What gets tested

| Category | Test | Pass criterion |
|---|---|---|
| **Build** | `zensical build` (or equivalent) against current `mkdocs.yml` | Exit code 0 |
| **Rendering** | Open built site locally | Pages render; no obvious layout breaks |
| **Plugins** (6) | search, privacy, social, tags, redirects, git-revision-date-localized  -  verify each works in the built output | Functional equivalence to Material output |
| **Markdown extensions** (14) | abbr, admonition, attr_list, def_list, footnotes, md_in_html, tables, toc, pymdownx (betterem, caret, details, emoji, highlight, inlinehilite, keys, mark, smartsymbols, snippets, superfences, tabbed, tasklist, tilde)  -  confirm rendering | All extensions render content correctly |
| **Theme features** (16) | navigation tabs/sections/indexes/path/prune/top, toc.follow, search.suggest/highlight/share, header.autohide, content.code.copy/annotate/tabs.link/tooltips, content.action.edit/view | Visible in built site or no-op cleanly |
| **Mermaid integration** | superfences custom_fences with mermaid format  -  render a diagram | Mermaid renders |
| **Custom CSS** | `extra_css: stylesheets/extra.css`  -  verify rules apply | CSS rules visible in rendered output |
| **Custom directory** | `theme.custom_dir: overrides`  -  confirm honored or document divergence | Either honored or clear non-compat note |
| **Generator output** | `generate-skill-pages.py`, `generate-workflow-pages.py`, `generate-showcase.py` produce content; build it with Zensical | Generated pages render |
| **`exclude_docs:`** | Honored (2 paths excluded) | No 404s for excluded files; site doesn't include them |
| **Nav structure** | Multi-level nav with section indexes | Nav renders identically or with minor cosmetic diffs |
| **Build performance** | Time `zensical build` vs `mkdocs build` | ZRX claim of 4-5x rebuild speed verified or contradicted |

### 2.3 What does NOT get tested

- **Theme palette / color customization**  -  Material's `palette` block syntax may need translation. Note divergences but don't attempt re-theming during the spike.
- **Social card generation**  -  visually verify only; don't deep-test font/layout fidelity.
- **External-link styling and icon overrides**  -  cosmetic; defer.
- **Search ranking quality**  -  functional yes/no only; don't compare relevance.
- **Mobile responsiveness**  -  desktop verification only.

---

## 3. Decision rubric

After the spike runs, the report classifies the outcome into one of three buckets.

### 3.1 GO

**All of:**
- `zensical build` exits 0 against current `mkdocs.yml` with no edits required
- All 6 plugins functional (search, redirects, mermaid integration in particular)
- All 14 markdown extensions render content correctly
- Mermaid diagrams render
- Custom CSS applies
- Generators' output builds without translation
- ZRX rebuild speed materially faster (≥2x; doesn't have to be the claimed 4-5x)

**Outcome:** Commit to Zensical migration in v2.14.0+. Migration is largely a `mkdocs.yml` no-op + theme attribution rename. v2.14.0 release plan adds a migration bucket.

### 3.2 GO-WITH-CAVEATS

**Most of GO criteria pass but with N issues:**
- 1-2 plugins broken or behaviorally divergent (e.g., redirects work but emit warnings; tags page renders differently)
- 1-3 theme features missing or no-op
- Cosmetic rendering diffs requiring CSS adjustment
- ZRX speedup minor (<2x) but not regressed

**Outcome:** Document each caveat with severity. v2.14.0 migration plan adds remediation tasks for each. Migrate if the remediation cost is bounded (≤5 days of work). Otherwise re-evaluate Plan B.

### 3.3 NO-GO

**Any of:**
- Build fails and the failure is structural (not a config typo)
- A core plugin (search, redirects) fundamentally doesn't work
- Mermaid integration broken
- Generator output fails to build
- ZRX engine actually regresses build time (claim is wrong)
- Compatibility page at https://zensical.org/compatibility/ explicitly notes incompatibilities for our usage pattern that the spike confirms

**Outcome:** Trigger Plan B evaluation (Section 5). Don't commit to Zensical. Don't migrate.

---

## 4. Spike execution protocol

### 4.1 Pre-execution checklist

- [ ] Current `mkdocs build --strict` runs cleanly (baseline)
- [ ] Current Material site rendered locally for visual reference (`mkdocs serve` snapshot)
- [ ] Python virtual environment created for Zensical install (isolation)
- [ ] WebFetch https://zensical.org/compatibility/ for the latest plugin and feature compatibility matrix
- [ ] Time-box set: 60 minutes total (30 min execution + 30 min report write)

### 4.2 Execution steps

1. **Install Zensical** in venv. Document install command and version installed.
2. **Run build**: `zensical build` (or correct command per Zensical docs). Capture stdout/stderr to a log file.
3. **Inspect built site** in browser. Snapshot pages: home, a skill page, a workflow page, a guide with mermaid, a reference page.
4. **Plugin spot-check**: search functionality, redirects (visit a redirected URL), tags page, git-revision-date plugin output.
5. **Markdown extension spot-check**: open a page with admonitions, code blocks, tables, mermaid, footnotes; verify each renders.
6. **Diff**: compare Material build output and Zensical build output side-by-side. Document divergences.
7. **Performance**: time both builds. Record numbers.
8. **Compatibility page cross-reference**: any pm-skills usage pattern flagged on the compatibility page? Verify against actual spike result.

### 4.3 Report format

Output: `plan_v2.13_zensical-spike-report_YYYY-MM-DD.md` next to this plan.

```markdown
# Zensical Compatibility Spike Report

**Date:** YYYY-MM-DD
**Executor:** [agent or person]
**Time spent:** X minutes execution, Y minutes report
**Zensical version:** vX.Y.Z
**Material version (baseline):** vX.Y.Z

## Outcome

**Decision:** GO | GO-WITH-CAVEATS | NO-GO

## What worked

- [list each plugin/extension/feature confirmed working]

## What didn't work

- [each broken/divergent item with severity: BLOCKER, IMPORTANT, MINOR]

## Cosmetic diffs (informational)

- [non-blocking visual differences worth knowing]

## Performance

- Material build: X seconds
- Zensical build: Y seconds
- Zensical rebuild (cached): Z seconds
- ZRX speedup verified: yes/no/n/a

## Recommendation for v2.14.0+

- [GO: commit to migration; estimated v2.14.0 migration effort]
- [GO-WITH-CAVEATS: list remediations + estimated effort]
- [NO-GO: trigger Plan B evaluation]

## Evidence

- Build log: [link or attached]
- Screenshots of side-by-side: [if generated]

## Open questions

- [anything that emerged that this spike couldn't resolve]
```

---

## 5. Plan B: Astro Starlight evaluation (triggered only on NO-GO)

If the Zensical spike returns NO-GO, evaluate Astro Starlight as alternative target. **Do NOT execute this in v2.13.** Defer Plan B to a separate v2.14.0+ effort doc unless the user explicitly requests immediate evaluation.

**Why Astro Starlight as Plan B (not Docusaurus):**

- **Modern stack:** Astro is actively developed, has a healthy ecosystem, supports MDX for richer content.
- **Bounded migration scope:** ~100 pages + 3 generator scripts to re-template. Astro Starlight has a structured docs starter that maps to our nav shape.
- **No React lock-in:** Astro is framework-agnostic. We can use plain markdown for most content and reach for components only where needed.
- **Smaller than Docusaurus:** Docusaurus is overkill for our content shape (we don't need versioned docs branching, complex i18n, or React-component-heavy pages).

**Plan B scope (if triggered):**

- Spike Astro Starlight against a representative subset (5-10 pages) of our content
- Decide between Astro Starlight (modern, full rewrite) and "stay on Material in long-term maintenance mode" (no migration, accept eventual upstream risk)
- Author a separate `plan_v2.14_starlight-evaluation.md` if pursued

---

## 6. Plugin compatibility checklist (spike-time reference)

Cross-reference our `mkdocs.yml` plugins against Zensical compatibility at execution time:

| Plugin | Used for | Spike outcome (TBD) |
|---|---|---|
| `search` | Site search | TBD |
| `privacy` | Privacy compliance for embedded content | TBD |
| `social` | Social card generation (CI-only) | TBD |
| `tags` | Tag index page (`docs/tags.md`) | TBD |
| `redirects` | URL redirects (4 currently mapped from `bundles/` to `workflows/`) | TBD |
| `git-revision-date-localized` | "Last updated" timestamps (CI-only) | TBD |

| Markdown extension | Used for | Spike outcome (TBD) |
|---|---|---|
| `pymdownx.superfences` (mermaid) | Mermaid diagram rendering | TBD |
| `pymdownx.tasklist` | Task lists with custom checkboxes | TBD |
| `pymdownx.tabbed` | Tabbed content blocks | TBD |
| `pymdownx.details` | Collapsible details blocks | TBD |
| `pymdownx.snippets` | Cross-file content includes | TBD |
| `admonition` | Note/warning callouts | TBD |
| `footnotes` | Footnote references | TBD |
| `attr_list` | HTML attribute attachment | TBD |
| Other 6 extensions | Routine markdown | TBD |

---

## 7. Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Zensical install breaks local Python env | Low | Low | Use venv isolation |
| Spike takes >60 min, eats into other v2.13 work | Medium | Low | Hard time-box; if exceeded, document partial findings and stop |
| Compatibility page doesn't list our specific patterns; spike reveals issues not pre-known | High | Medium | This is exactly what the spike is for; pre-known issues come from the compatibility page, novel issues come from the spike |
| Zensical install instructions on the website are out of date or unclear | Medium | Low | Time-box install at 10 min; if blocked, document and escalate |
| Spike result is GO but actual migration in v2.14.0 surfaces new issues | Medium | Medium | Spike covers ~80% of compatibility; reserve v2.14.0 migration cycle to handle the remaining 20% |
| ZRX speedup claim is wrong | Low | Low | Document actual numbers; speed is a nice-to-have not a blocker |

---

## 8. Pre-execution gate

The spike requires installing Zensical, which modifies the local Python environment (or virtual env if isolated). This is a small but real local-environment change. Before execution:

- [ ] Maintainer approval to install Zensical
- [ ] Confirm venv isolation acceptable (vs system-level install)
- [ ] Confirm the Python ≥3.10 baseline is fine for Zensical's stated requirements (verify at execution)

---

## 9. Open questions for the maintainer

1. **Time-box.** 60 minutes total (30 execution + 30 report) is my proposal. Reasonable, or do you want a different bound?
2. **Reporting depth.** The report format above is moderate. Do you want it lighter (just outcome + 5-bullet summary) or heavier (per-plugin pages with screenshots)?
3. **Spike re-runs.** If the spike returns GO-WITH-CAVEATS and the caveats are addressable in the spike itself (e.g., a config translation), do you want a single re-run inside the v2.13 cycle, or strictly defer all remediation to v2.14.0?
4. **Plan B trigger.** If NO-GO, do you want me to immediately spike Astro Starlight, or strictly stop and write up the result? My recommendation is stop; Plan B gets its own effort doc and time-box.

---

## 10. Related

- v2.12.0 session log Phase 10: [`../../../../AGENTS/claude/SESSION-LOG/2026-05-03_v2.12.0-tag-ship-and-v2.13-handoff_session.md`](../../../../AGENTS/claude/SESSION-LOG/2026-05-03_v2.12.0-tag-ship-and-v2.13-handoff_session.md)
- Current `mkdocs.yml`: [`../../../../mkdocs.yml`](../../../../mkdocs.yml)
- Zensical compatibility (live URL): https://zensical.org/compatibility/
- Squidfunk Material maintenance announcement: linked from the compatibility page
- v2.13 release plan: [`./plan_v2.13.0.md`](./plan_v2.13.0.md)

---

## Change Log

| Date | Change |
|---|---|
| 2026-05-03 | Initial spike plan authored. Decision rubric: GO / GO-WITH-CAVEATS / NO-GO. 60-min time-box. Plan B is Astro Starlight, deferred to separate effort doc if triggered. |
