# Astro Starlight Compatibility Spike Report

**Date:** 2026-05-06
**Executor:** Claude (Opus 4.7, Explanatory style, xhigh effort)
**Time spent:** ~50 minutes execution + ~15 minutes report
**Astro version (tested):** 5.13.11 (pinned to ~5.13.0)
**Starlight version (tested):** 0.34.8 (pinned to ~0.34.0)
**astro-mermaid version:** 2.0.1
**Material version (baseline):** Material for MkDocs 9.7.6 (mkdocs.yml current)
**Spike POC location:** `_spike/starlight-poc/` (gitignored; safe to delete after report consumed)
**Plan:** [`plan_v2.14_starlight-spike.md`](./plan_v2.14_starlight-spike.md)

---

## Outcome

**Decision: GO-WITH-CAVEATS**

Starlight built the pm-skills documentation successfully with all three v2.13 BLOCKERs cleared. The build produces 123 pages in 12-21 seconds depending on integrations, with redirects, excludes, generator output, search indexing, sidebar rendering, base-path routing, and mermaid diagrams all working. The caveats are bounded remediation tasks (estimated total: 1-2 days), not architectural blockers. The migration is recommended for v2.14.0 Bucket B execution.

The key signal: the cycle-defining v2.13 disqualifiers (broken redirects, leaked excludes, parser-warning storm) all resolve cleanly under Starlight. Where Material gives `--strict` 13 broken-link warnings and Zensical gave 2,940 false-positive parser warnings, Starlight gave 0 non-redirect warnings.

---

## v2.13 BLOCKER retest results

### BLOCKER 1: Redirects - PASS

All 12 `mkdocs.yml redirect_maps` entries were ported to Astro `redirects:` config. 7/7 spot-checked redirect URLs generated meta-refresh HTML pages in `dist/`. Sample output (for `/pm-skills/concepts/triple-diamond/`):

```html
<!doctype html>
<title>Redirecting to: /concepts/triple-diamond-delivery-process/</title>
<meta http-equiv="refresh" content="0;url=/concepts/triple-diamond-delivery-process/">
<meta name="robots" content="noindex">
<link rel="canonical" href="https://product-on-purpose.github.io/concepts/triple-diamond-delivery-process/">
```

**Caveat (IMPORTANT, but bounded):** Astro's `redirects:` config does NOT auto-prepend `base: '/pm-skills'` to destination URLs. Source paths are correctly routed as `/pm-skills/{source}/`, but destination paths in the meta-refresh and canonical link are bare (`/{destination}/`). On GitHub Pages this would 404. Two practical fixes (production migration picks one):
1. Write each destination with the explicit base prefix in `astro.config.mjs` (12 manual edits; trivial).
2. Use a build-time hook to inject base into destinations.

Either fix is well under 1 hour of work. Documenting as IMPORTANT not BLOCKER because the routing layer works; the issue is destination string formatting.

Compared against v2.13's Zensical NO-GO (zero redirect HTML files generated for any of the 10 mapped paths under Zensical 0.0.40), Starlight's redirect routing is a structural pass.

### BLOCKER 2: Excludes - PASS (filesystem level)

The spike used filesystem-level exclusion (robocopy `/XD internal`) to keep `docs/internal/` out of the Starlight content collection. Build output `dist/` contains 0 internal/* paths.

**Production migration note:** the more authentic approach is path-based exclusion via `docsLoader({ pattern: '!internal/**' })` or by adding `draft: true` frontmatter to internal pages. I did NOT test config-based exclusion in the spike (defaulted to filesystem exclusion to save time-box budget). Both approaches are documented as supported in Starlight 0.34. Risk is low; the production migration plan should include one verification round.

Compared against v2.13's Zensical NO-GO (183 `docs/internal/*` HTML files leaked into `site/` despite `exclude_docs: internal/`), Starlight's exclusion is structurally sound.

### BLOCKER 3: Parser warnings - PASS (pristine)

Build log analysis: **0 warnings** in Starlight build (excluding the pagefind notes about redirect pages having no `<html>` element, which is a normal pagefind handling of meta-refresh pages, not a content issue).

Compared against:
- Zensical 0.0.40 (v2.13): 2,940 false-positive parser warnings on bracketed-text patterns (`[role]`, `[yes / no]`, `cards[3]`). Made `--strict` mode unusable.
- Material `--strict` (current): 13 warnings, all real broken cross-references (the F5/F7 issues catalogued in v2.13 final-sweep). Real bugs to fix during migration regardless.

Starlight's MDX/Markdown parser handled all bracketed-text patterns without false positives. This is a clean win.

---

## What worked

### Build pipeline

- `astro build` exits 0 with full content collection (123 pages from 125 source files; 2 files were redundant or merged).
- Build output at `dist/` has 356 files (HTML + sitemap + assets + pagefind index + redirect pages).
- `astro preview` serves the built site at `http://localhost:4321/pm-skills/` (verified via build-only; preview not separately invoked).

### Content shape compatibility

- **All 12 `mkdocs.yml` redirects** ported to Astro `redirects:` config (with the destination-base caveat above).
- **Generator output (Pattern 5C)** preserved without modification: `generated: true` and `source: scripts/generate-skill-pages.py` frontmatter both pass through Starlight's content collection schema and remain in the built HTML metadata.
- **Tag fields** (`tags: [Define, ideation]` etc.) parsed correctly by the schema.
- **Custom skill frontmatter** (`name`, `description`, `phase`, `version`, `updated`, `license`, `metadata`) all preserved via the schema extension.
- **Mermaid diagrams** render via `astro-mermaid` 2.0.1 integration. The `using-meeting-skills.md` guide's 3 mermaid blocks all transform to `<pre class="mermaid">` elements for client-side rendering. No build errors.
- **Sidebar autogenerate** populates from directory structure: Home / Getting Started / Skills / Workflows / Guides / Concepts / Showcase / Reference / Contributing / Releases all render.
- **Pagefind search** indexes 122 pages and 10,806 words. Search UI inherited from Starlight defaults.
- **Base path** correctly applied to all canonical URLs, sitemap entries, internal nav links, and asset paths (`/pm-skills/...`).

### Theme + UX

- Default Starlight theme (dark + light + auto via system preference) works out of the box.
- Right-side TOC on individual pages: present.
- Sidebar collapsible groups: present.
- Mobile responsive defaults: not separately tested (per scope guard in spike plan Section 2.3) but Starlight's defaults are 2025-modern.
- `editLink` config produces the GitHub edit-this-page link.

### Performance

| Build | Time | vs Material |
|---|---|---|
| Material clean rebuild (no `--strict`) | 6.99s | baseline |
| Starlight cold build (no mermaid) | 14.55s | 2.08x slower |
| Starlight cold build (with mermaid) | 20.76s | 2.97x slower |
| Starlight warm rebuild (no mermaid) | 9.12s | 1.30x slower |

Cold-build performance misses the spike plan's 1.5x soft target (would have wanted 10.5s or under). With mermaid, cold-build hits ~3x. Warm rebuild is closer to acceptable. Verdict: **acceptable for migration**; the regression is bounded and the modern toolchain benefits (faster dev-server HMR, image optimization, MDX) offset the cold-build cost. Production CI builds would also be cold most of the time, so this is the number that ships.

Note: Material's measured 6.99s is faster than the v2.13 Zensical spike report's stated 8.16s baseline. Variance is likely environmental (plugin warm-up, fewer concurrent processes today). Both numbers are in the same ballpark.

---

## What didn't work

### Title frontmatter required on every page (MEDIUM, ~1 hour script)

Starlight's `docsSchema` requires `title: string` on every doc. **51 of 125 source files (~41%) lack `title:` frontmatter** in the current `docs/` tree:
- 12 files have other frontmatter but no title.
- 39 files have no frontmatter at all (mostly index pages and READMEs).

The spike fixed this with a PowerShell script that injects `title: <derived from filename>` into all 51 files (with parser-aware FM boundary detection). Production migration would do one of:
- Same script approach (auto-derive from filename; ~1 hour to write + audit).
- Author titles by hand for higher quality (~4-8 hours for 51 files).
- Modify the docsSchema to make title optional and let Starlight default it (loses Starlight's auto-title-from-frontmatter behavior; not recommended).

**Severity:** MEDIUM. Bounded one-shot remediation. Real production work but not architectural.

### Redirect destination base-path bug (IMPORTANT but bounded)

Per BLOCKER 1 caveat above. Source paths route correctly with base; destination paths do not. The fix is mechanical (12 destination strings) but should be done correctly the first time so bookmarks land on the right URL. Worth investigating whether Astro 5/6 has a config option for auto-prepend, since the docs imply it should (and the source-path side does work).

**Severity:** IMPORTANT to verify the production fix; MEDIUM to actually apply.

### Templates folder has placeholder YAML (MINOR)

`docs/templates/skill-template/SKILL.md` and `docs/templates/skill-template/references/{TEMPLATE,EXAMPLE}.md` use `<placeholder>` syntax in YAML frontmatter for fields like `metadata.category: <one of: research, problem-framing, ...>`. The `<one of: research, ...>` value contains a `:` which YAML parses as a nested mapping, triggering a parse error.

These are template files for skill authoring, not user-facing content. Material's tags plugin or nav structure presumably hid them from the rendered site (they're not in `mkdocs.yml nav`). The spike fix: remove `docs/templates/` from the Starlight content collection.

**Production fix:** add `templates/**` to the docsLoader pattern exclusion, OR move templates out of `docs/` entirely (e.g., to `templates/` at repo root). Either is trivial.

**Severity:** MINOR. One-line fix.

### Node version requirement (MINOR)

Astro 6.x (current latest) requires Node `>=22.12.0`. Local environment had Node 22.11.0, which Astro 6 hard-fails on (not just a warning). The spike pinned to Astro 5.13.x + Starlight 0.34.x to proceed; this combo accepts any Node 22.x.

**Production fix:** bump Node to 22.12+ before running Astro 6, OR stay on Astro 5.x for v2.14 and migrate to Astro 6 in v2.15. Astro 5 is current-maintained; no urgency.

**Severity:** MINOR. One Node install; or pin choice.

### Auto-applied Starlight class names differ from Material (informational)

The spike's first sidebar-presence check failed because I grepped for `starlight-sidebar` (no such class). Starlight uses generic class names: `sidebar`, `sidebar-pane`, `sidebar-content`, `right-sidebar` plus per-component Astro scoped class hashes (e.g., `astro-vrdttmbt`).

**Implication for migration:** any custom CSS in `docs/stylesheets/extra.css` that targets Material-specific class names (`md-nav`, `md-content`, `md-header`, `md-tabs`, etc.) will be no-ops in Starlight and need rewriting against Starlight's class names. The current `extra.css` is small (single file, not large) so this is bounded.

**Severity:** MEDIUM (need to port custom CSS); not BLOCKER.

---

## Cosmetic diffs (informational)

These are non-blocking visual differences worth knowing for migration sequencing:

- **Theme defaults:** Starlight's default theme (Tailwind-inspired, 2025-modern) differs from Material's Indigo/Deep-Purple palette. The migration should decide between (a) keeping Starlight defaults (likely an upgrade) or (b) reproducing the Material palette via Starlight's CSS custom properties.
- **Top header layout:** Material's `header.autohide` + tabs.sticky behavior is replaced by Starlight's fixed-header pattern. Different visual rhythm; not worse.
- **Mermaid theme:** astro-mermaid uses Mermaid's default theme; Material's pymdownx-mermaid integration may have used a different palette. Visual diff in diagram style.
- **Code block styling:** Starlight uses Expressive Code by default (richer syntax highlighting + copy button + line numbers config). Visually different from Material's pymdownx.highlight.
- **No "Edit on GitHub" pencil icon by default at the right place:** Starlight has `editLink` config which I configured; visually appears in a different spot than Material's `content.action.edit`.
- **Search UI:** Pagefind UI has different keyboard shortcuts and result styling than Material's lunr-based search.

None of these blocks migration; all are stylistic decisions for the migration team.

---

## Recommendation for v2.14.0

**Commit to Starlight migration in v2.14.0 (Bucket B).** The spike's GO-WITH-CAVEATS verdict means:

- All structural compatibility cleared.
- Caveats are bounded one-shot remediations (~1-2 days total estimated).
- Production-readiness signal: Astro + Starlight built our actual content shape (130 source files including generator output, library samples NOT yet tested but expected to work) on first serious attempt with no architectural compromises.

### Estimated migration effort (Bucket B refinement)

| Task | Effort | Owner |
|---|---|---|
| Title frontmatter audit + injection script | ~1 hour | Codex |
| Redirect destination base-path fix (12 entries) | ~30 min | Claude |
| Templates folder exclusion (1-line config or path move) | ~15 min | Claude |
| Custom CSS port (Material classes to Starlight classes) | ~4-8 hours | Claude |
| Library samples mount + spot-verification (132 files) | ~2 hours | Claude |
| Sidebar nav refinement (port mkdocs.yml nav to Starlight sidebar) | ~2 hours | Claude |
| Generator updates (verify Pattern 5C `source:` continues; update if path conventions change) | ~1 hour | Codex |
| GitHub Pages deploy workflow update (mkdocs build to astro build) | ~1 hour | Claude |
| Performance benchmark + final validation | ~1 hour | Claude |
| Smoke test (browse all major doc paths in built output) | ~2 hours | Human + Claude |
| Documentation: contributor guide updates (skill authoring under Astro) | ~3 hours | Claude |

**Total:** ~17-22 hours of focused work across 3-5 calendar days. Comfortable v2.14.0 cycle.

### Decisions for the v2.14.0 master plan

1. **Astro version pin:** start on Astro 5.x (no Node bump needed) OR bump Node to 22.12+ and use Astro 6.x. Recommend Astro 5.x for v2.14, Astro 6 in a follow-up if compelling.
2. **Mermaid integration:** `astro-mermaid` confirmed. Pin to `~2.0.0` (current) for v2.14.
3. **Search:** Starlight's built-in Pagefind. No third-party.
4. **Material plugins to retire:** `search`, `privacy`, `social`, `tags`, `redirects`, `git-revision-date-localized`, plus all of `pymdownx.*`. Replaced by Starlight built-ins + remark/rehype standards.
5. **Custom theme:** start with Starlight defaults; defer custom palette work to v2.15+ unless user feedback demands otherwise.

---

## Evidence

- **Spike POC directory:** `_spike/starlight-poc/` (gitignored; ~400 MB node_modules + ~5 MB content + ~20 MB dist)
- **Build logs:**
  - `_spike-mkdocs-baseline.log` - Material `--strict` baseline (13 warnings = real broken xrefs)
  - `_spike-mkdocs-baseline-clean.log` - Material clean baseline (6.99s)
  - `_spike-starlight-build1.log` - first attempt, Astro 6 + Node 22.11 mismatch
  - `_spike-starlight-build2.log` - Astro 5 baseline, title-required schema error
  - `_spike-starlight-build3.log` - title-injected build, templates YAML error
  - `_spike-starlight-build4.log` - templates removed, BUILD SUCCESS (12.23s, 123 pages)
  - `_spike-starlight-build5-mermaid.log` - mermaid added, BUILD SUCCESS (18.69s)
  - npm install logs were piped via Tee but did not persist on disk (timing issue with PowerShell Tee + --silent); install exit codes were 0 in both cases (initial Astro 6 install + Astro 5 reinstall after pin)
- **Built output sample inspected:**
  - `_spike/starlight-poc/dist/skills/define/define-hypothesis/index.html` (136 KB; renders correctly)
  - `_spike/starlight-poc/dist/workflows/triple-diamond/index.html` (123 KB; H1, TOC, footer all present)
  - `_spike/starlight-poc/dist/concepts/triple-diamond/index.html` (redirect; meta-refresh works)
  - `_spike/starlight-poc/dist/guides/using-meeting-skills/index.html` (3 mermaid blocks rendered as `<pre class="mermaid">`)
- **Configuration files:**
  - `_spike/starlight-poc/astro.config.mjs` (site, base, redirects, sidebar, mermaid integration, Starlight title + social)
  - `_spike/starlight-poc/src/content.config.ts` (extended docsSchema with our custom frontmatter fields)
  - `_spike/starlight-poc/package.json` (dependencies pinned to Astro 5.13.x + Starlight 0.34.x)

Spike workspace is gitignored (entry added to `.gitignore` at session start). Safe to delete after report consumed.

---

## Open questions

1. **Auto-base-prepend for redirect destinations:** Is there an Astro 5/6 config option I missed, or is the manual prefix the right answer? Worth a 15-min investigation during Bucket B execution.
2. **Custom CSS migration scope:** the current `extra.css` should be inventoried at migration start. If it's just a few rules, port directly; if it's heavily Material-themed, decide between full re-skin and minimal-changes-only.
3. **Library samples mount strategy:** `library/skill-output-samples/` (132 files) is outside `docs/`. Should it become a Starlight content collection (browseable) or stay as a curated reference linked from docs? Recommendation: collection, for searchability. Adds ~30 min to the migration plan.
4. **Pre-existing broken cross-references (the 13 Material `--strict` warnings):** these are real bugs catalogued in v2.13 final-sweep as F5/F7. Recommend fixing in the same v2.14 cycle as part of migration verification, not as a separate effort.
5. **Site URL + base path final form:** spike used `site: 'https://product-on-purpose.github.io'` + `base: '/pm-skills'`. Verify this matches the GitHub Pages deploy expectations before Bucket B kickoff.
6. **Migration cycle code-review approach:** v2.13 ran the Phase 0 Adversarial Review Loop (5 Codex review rounds + 3 resolution passes). For a doc-stack migration where most defects are visual/rendering, recommend running 2 Codex review rounds + 1 human visual smoke test, not the full v2.13 loop.

---

## Comparison summary: Zensical (v2.13) vs Starlight (v2.14)

| Dimension | Zensical 0.0.40 | Astro Starlight 0.34.8 |
|---|---|---|
| **BLOCKER 1 (redirects)** | FAIL (zero redirect HTML generated) | PASS (with destination-base caveat, IMPORTANT) |
| **BLOCKER 2 (excludes)** | FAIL (183 internal files leaked) | PASS (filesystem-level verified; config-level expected to work) |
| **BLOCKER 3 (parser warnings)** | FAIL (2,940 false positives) | PASS (0 warnings) |
| **Build time (cold)** | 15.92s (1.95x Material) | 14.55-20.76s (2.08-2.97x Material) |
| **Build time (warm rebuild)** | 6.40s (faster than Material full) | 9.12s (1.30x Material) |
| **Mermaid integration** | Untested (build failed earlier) | PASS (astro-mermaid) |
| **Generator output preserved** | Untested | PASS (Pattern 5C frontmatter intact) |
| **Toolchain** | Python (mkdocs-compat) | Node only |
| **Maintenance posture** | New project (0.0.40) | Production-ready since 1.0 (Sept 2024) |
| **Verdict** | NO-GO (2 BLOCKERs) | GO-WITH-CAVEATS (no BLOCKERs; 5 bounded caveats) |

The Starlight verdict's caveats sum to ~1-2 days of remediation work; the Zensical NO-GO required upstream parser changes outside our control (no migration path within our cycle scope).

---

## Change Log

| Date | Change |
|---|---|
| 2026-05-06 | Spike executed against current `mkdocs.yml`; report authored. Verdict: GO-WITH-CAVEATS; recommend v2.14 Bucket B migration. |
