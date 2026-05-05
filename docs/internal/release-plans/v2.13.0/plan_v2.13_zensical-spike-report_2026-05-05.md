# Zensical Compatibility Spike Report

**Date:** 2026-05-05
**Executor:** Claude Opus 4.7 (1M context)
**Time spent:** ~30 minutes execution, ~25 minutes report
**Zensical version:** 0.0.40
**Material for MkDocs version (baseline):** 9.7.6
**Plan:** [`plan_v2.13_zensical-spike.md`](plan_v2.13_zensical-spike.md)

---

## Outcome

**Decision:** NO-GO

Two structural compatibility failures fire NO-GO triggers per the spike plan's
rubric (Section 3.3):

1. **`mkdocs-redirects` plugin: not honored.** Zero redirect HTML files
   generated. The 12 redirect entries in `mkdocs.yml` (bundles to workflows,
   concepts/triple-diamond renames, mcp-setup consolidation, authoring-guide
   consolidation) silently dropped. Every bookmarked old URL would 404 after
   migration.
2. **`exclude_docs:` structural feature: not honored.** 183 HTML files from
   `docs/internal/` rendered into the public site output despite the explicit
   `exclude_docs: internal/` directive. Internal release planning, audits,
   effort docs, governance, and design proposals would leak publicly under a
   straight migration.

The build itself succeeds (exit 0), so this is not a hard build failure. It is
a behavioral incompatibility on two features pm-skills relies on for both
URL stability (redirects) and content boundaries (exclude_docs). Neither
issue is a config typo; both reflect Zensical 0.0.40 not yet implementing
Material plus mkdocs-redirects parity.

**Recommendation:** Do not commit v2.14.0 to a Zensical migration. Stay on
Material for MkDocs through v2.14.0. Re-spike Zensical at a later version
once `mkdocs-redirects` parity and `exclude_docs:` honoring are documented
as supported. Do not trigger Plan B (Astro Starlight) immediately per the
spike plan's recommendation; if Material's maintenance posture deteriorates
before Zensical reaches feature parity, Plan B gets its own effort doc.

---

## What worked

| Item | Result |
|------|--------|
| `python -m zensical build` invocation | Exit 0; produced output at `site/` |
| HTML generation | 307 HTML files produced from source |
| Custom CSS (`stylesheets/extra.css`) | Present in output; `.md-button`, `.mermaid` rules shipped |
| Mermaid markup | Generated as `<pre class="mermaid"><code>...</code></pre>` (correct client-side-render shape; in-browser render not verified per time-box) |
| Search index | `search.json` generated at site root |
| Tags page | `tags/` directory generated |
| Sitemap | `sitemap.xml` generated |
| `objects.inv` (intersphinx-style) | Generated |
| 404 page | `404.html` generated |
| Strict-mode flag | `--strict` flag exists in `python -m zensical build` |
| Cached rebuild speed | 6.40s on rebuild (faster than Material's 8.16s full build) |

---

## What didn't work

### BLOCKER: mkdocs-redirects plugin not honored

**Severity:** BLOCKER (NO-GO trigger: "core plugin (redirects) fundamentally doesn't work")

`mkdocs.yml` lines 86-99 declare 12 redirect mappings via the `redirects`
plugin. Material plus `mkdocs-redirects` produces an HTML file at each
old path that issues a meta-refresh / JS redirect to the new path. Zensical
0.0.40 generates zero such files.

Verified by checking specific old paths:

- `site/bundles/` -> directory does not exist (should redirect to `workflows/`)
- `site/concepts/triple-diamond/` -> directory does not exist (should redirect to `concepts/triple-diamond-delivery-process/`)

All 12 redirect entries silently dropped. No build warning was emitted to
flag the incompatibility; the site simply omits the redirect files.

**Impact if migrated unchanged:** Every existing bookmark, search-engine
indexed link, or external reference pointing to the old paths returns
404. The Bucket A doc-restructure work in v2.13.0 (4 file renames + 6
duplicate deletions) explicitly relied on `mkdocs-redirects` to preserve
external link continuity.

### BLOCKER: exclude_docs not honored (privacy regression)

**Severity:** BLOCKER (privacy / content-boundary regression equivalent to a structural failure)

`mkdocs.yml` lines 107-109 declare `exclude_docs: |\n  internal/\n  workflows/README.md`.
Material correctly omits these from the build output. Zensical 0.0.40
ignores the directive and renders all of `docs/internal/` into `site/internal/`.

Verified by listing `site/internal/`:

```
_working
agent-component-usage_2026-04-18
audit
backlog-canonical
cross-llm-review-protocol
distribution
efforts
milestones
mkdocs
planning-artifact-tier-map
planning-persistence-policy
release-plans
skill-library-evaluation-anthropic-guide
skill-versioning
```

183 HTML files leaked. Contents include current and historical release
plans, internal audits, effort docs (F-numbered), backlog, governance
docs, and design proposals.

**Impact if migrated unchanged:** Internal documentation becomes
indexable and linkable. Several documents reference unfinished decisions,
unannounced work, and internal tooling assumptions that would be
visible to anyone hitting the site. Even with `noindex` headers, the
content is downloadable and quotable.

### IMPORTANT: 2940 link-reference parser warnings

**Severity:** IMPORTANT (noisy CI signal; would block `--strict` mode adoption)

Zensical 0.0.40 emits an "unresolved link reference" warning for any
bracketed `[text]` in markdown that lacks a matching reference
definition. The Material/MkDocs parser does not. Sampled patterns:

- `[yes / no]` interactive-prompt indicators in skill SKILL.md examples
- `[role]`, `[action]`, `[benefit]` in user-story templates
- `cards[3]` array-access notation in code-like tables
- `[triple-diamond, lean-startup, design-thinking]` YAML array literal
- `[ ]` task-list checkboxes

Spot-checked across the warnings list: all sampled items are false
positives, not actual broken references. None are real link breakage
that Material's parser was silently letting pass.

**Impact if migrated unchanged:** The build still completes, but the
2940-warning floor makes it impossible to use Zensical's `--strict` mode
as a CI gate. Any new real-broken-link finding gets buried in noise. The
v2.13 CI hardening work (Bucket C) included `--strict` adoption as a
near-term aspiration; this would become impractical under Zensical 0.0.40.

**Workaround sketch:** Either escape every literal bracket in source
(disruptive across ~120 files) or wait for Zensical to add a config
flag suppressing reference-resolution warnings on patterns that are
not link-shaped (preferred).

### IMPORTANT: Cold build is 1.95x slower than Material

**Severity:** IMPORTANT (contradicts the marketed ZRX speedup for first-build scenarios)

Cold build comparison on the current pm-skills site:

| Build | Wall-clock |
|-------|-----------|
| `mkdocs build` (Material) | 8.16s |
| `python -m zensical build` (cold) | 15.92s |
| `python -m zensical build` (rebuild, cached) | 6.40s |

Zensical's ZRX cache is real and faster than Material's full build by
~1.27x once warm, but **never reaches the marketed 4-5x speedup against
Material's full-build numbers**. Cold builds are nearly 2x slower than
Material. CI runs always start cold (no persistent cache between
GitHub Actions jobs absent explicit caching), so CI build time
regresses under Zensical 0.0.40.

**Impact if migrated unchanged:** Local `serve`-style iteration is
faster after the first build. CI is slower per run unless we add an
explicit cache-restore step.

---

## Cosmetic diffs (not assessed)

The time-box did not include opening built pages in a browser for
visual side-by-side comparison. The following remain unassessed:

- Theme palette / color rendering fidelity
- Social card generation
- External-link styling and icon overrides
- Search-result ranking quality
- Mobile responsiveness
- Mermaid client-side render output (markup is correct; visual confirmation deferred)
- Navigation tabs/sections rendering parity
- `content.code.copy` / `content.code.annotate` features

These are deferred to the v2.14.0+ re-spike if Zensical resolves the
two BLOCKERs above and a follow-up evaluation becomes useful.

---

## Performance

- **Material build (full):** 8.16s reported by mkdocs (12.55s wall)
- **Zensical build (cold):** 15.92s reported (16.51s wall)
- **Zensical build (cached rebuild):** 6.40s reported (6.86s wall)
- **ZRX 4-5x rebuild speedup vs cold:** Not verified at the marketed
  ratio. Actual cached/cold ratio: 6.40s / 15.92s = ~0.40, equivalent
  to a 2.5x speedup against Zensical's own cold time.
- **ZRX cached vs Material full build:** 6.40s / 8.16s = 0.78,
  equivalent to a 1.27x speedup. Useful for local iteration; modest.

---

## Plugin compatibility checklist (filled at execution time)

| Plugin | Used for | Spike outcome |
|---|---|---|
| `search` | Site search | Generates `search.json`. Functional rendering not verified in browser. PASSES at the artifact level. |
| `privacy` | Privacy compliance for embedded content | Not assessed; CI-only plugin. UNASSESSED. |
| `social` | Social card generation | Not assessed; CI-only plugin. UNASSESSED. |
| `tags` | Tag index page | `tags/` directory generated. Functional rendering not verified in browser. PASSES at the artifact level. |
| `redirects` | URL redirects (12 mapped) | **NOT HONORED.** Zero redirect HTML files generated. **BLOCKER.** |
| `git-revision-date-localized` | "Last updated" timestamps | Not assessed; CI-only plugin. UNASSESSED. |

| Markdown extension | Used for | Spike outcome |
|---|---|---|
| `pymdownx.superfences` (mermaid) | Mermaid diagram rendering | Generates `<pre class="mermaid">` markup. Client-side render not verified visually. PASSES at the markup level. |
| `pymdownx.tasklist` | Task lists with custom checkboxes | Triggers reference-warning false positives but renders. PASSES with caveats. |
| `pymdownx.tabbed` | Tabbed content blocks | Not deeply verified; output present. UNASSESSED beyond presence. |
| `pymdownx.details` | Collapsible details blocks | Output present in built pages with `??? example` admonitions. PASSES at the artifact level. |
| `pymdownx.snippets` | Cross-file content includes | Not assessed (no snippets in current source). UNASSESSED. |
| `admonition` | Note/warning callouts | Pages with `!!! warning "Generated file"` admonitions render. PASSES. |
| `footnotes` | Footnote references | Not deeply verified. UNASSESSED. |
| `attr_list` | HTML attribute attachment | Not deeply verified. UNASSESSED. |
| Other 6 extensions | Routine markdown | Not individually verified. |

---

## Recommendation for v2.14.0+

**Primary recommendation: do not commit v2.14.0 to a Zensical migration.**

Specific actions:

1. **Stay on Material for MkDocs through v2.14.0.** Material remains in
   maintenance mode (security and bug fixes only) per squidfunk. That
   maintenance posture is acceptable risk for v2.14.0's planned scope.
2. **Do NOT trigger Plan B (Astro Starlight) immediately.** Per the
   spike plan's Section 5 recommendation, Plan B gets its own effort
   doc and time-box only if Zensical NO-GO and Material maintenance
   risk both materialize.
3. **Re-spike Zensical at a future version.** Track the Zensical changelog
   for `mkdocs-redirects` parity and `exclude_docs:` honoring. When
   both land, run a 60-minute re-spike against the (then-current)
   `mkdocs.yml` and revisit the decision. The re-spike inherits this
   report's structure.
4. **Capture the 2940-warning issue.** File against Zensical upstream
   (or note in our internal backlog) the parser-strictness divergence
   on bracketed-text patterns. Even if our own redirects + exclude_docs
   blockers resolve, the warning floor needs a path to zero before
   `--strict` adoption is viable.
5. **Document the assumption shift.** The v2.13.0 release notes (and
   v2.14.0 plan input) should record that the Zensical migration is
   deferred indefinitely pending these resolutions, so future readers
   are not confused by the ambient "Material is in maintenance mode"
   pressure.

**Migration estimate if Zensical reaches parity later:** Once both
blockers resolve and the warning floor is addressed (likely
3-6 versions out from 0.0.40), the actual migration is a near-no-op:
keep `mkdocs.yml` as-is, swap the build command, update CI invocation,
re-validate the visual output. Estimated effort then: 2-3 days for the
swap + acceptance, plus whatever Plan B prep we may have done in
parallel as a hedge.

---

## Evidence

- Build log (truncated to last 80 lines per spike protocol):
  - Material baseline: built in 8.16s; emitted 13 anchor-link warnings
    (pre-existing, not caused by spike); `Documentation built in 8.16 seconds`.
  - Zensical cold: 2940 issues found; `Build finished in 15.92s`.
  - Zensical rebuild (cached): 2940 issues found (same warning floor);
    `Build finished in 6.40s`.
- Output inspection paths:
  - `site/` (Zensical default output, gitignored per `.gitignore`)
  - `site/internal/` listing reveals 14 sub-folders that should have
    been excluded (audit/, efforts/, release-plans/, etc.)
  - `site/bundles/` does not exist (proves redirects plugin not honored)
  - `site/concepts/triple-diamond/` does not exist (same)
  - `site/stylesheets/extra.css` present (proves custom CSS shipped)
  - `site/guides/using-meeting-skills/index.html` contains
    `<pre class="mermaid"><code>graph LR` etc. (mermaid markup correct)
- No screenshots captured (time-box did not include browser inspection).

---

## Open questions

The spike's NO-GO outcome closes the v2.14.0 commitment question, but
several second-order questions remain for the maintainer:

1. **Re-spike trigger condition.** What's the right signal to schedule a
   re-spike? Proposal: monitor Zensical's release notes for
   `exclude_docs` and `mkdocs-redirects` parity announcements; otherwise
   re-spike at v0.5+ regardless (suggests meaningful maturity threshold).
2. **Material maintenance posture re-evaluation.** Material's "maintenance
   mode" announcement was made ~12 months ago. If a major MkDocs upstream
   regression lands in the meantime (e.g., the rumored MkDocs v2 release
   that breaks current Material plugins), the calculus changes. Worth
   re-checking Material's GitHub at v2.14.0 plan time.
3. **Plan B pre-positioning.** Should we author a thin Plan B effort doc
   now (Astro Starlight evaluation criteria, not the actual spike) so
   that if Material risk materializes mid-v2.14.0, we have a starting
   point? Proposal: defer until needed.
4. **2940-warning upstream report.** Worth filing against Zensical
   upstream regardless of our migration decision? It is real noise that
   would affect any pm-skills-shaped doc set evaluating Zensical.

---

## Time-box accounting

- 0:00-0:05: Read spike plan; verify Zensical install (v0.0.40 confirmed)
- 0:05-0:08: CLI discovery (`python -m zensical build`); gitignore check; Material version capture
- 0:08-0:18: Material baseline build (timed) + Zensical cold build (timed)
- 0:18-0:22: Zensical cached rebuild (timed) + output structure inspection
- 0:22-0:25: BLOCKER triage (exclude_docs leak, redirects absence, custom CSS, mermaid markup)
- 0:25-0:55: Report authoring (this document)

Total time spent: ~55 minutes against a 60-minute hard time-box. Within budget.

Items deliberately deferred (per the time-box protocol):

- In-browser visual verification of mermaid client-side rendering
- Visual side-by-side of Material vs Zensical pages
- Per-extension markdown-feature verification
- Theme palette / dark-mode parity
- Social card output
- Search ranking quality

These are appropriate to defer because the two BLOCKERs already trigger
NO-GO; deeper visual verification would not change the outcome.
