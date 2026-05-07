# v2.14 Starlight Migration Plan

**Status:** Authored 2026-05-06; ready for execution kickoff (next session)
**Cycle:** v2.14.0
**Type:** Consolidated migration execution plan
**Owner:** TBD
**Created:** 2026-05-06
**Sources:**
- v2.14 cycle plan: [`plan_v2.14.0.md`](./plan_v2.14.0.md) (Decision Briefs D1-D4 resolved)
- v2.14 Starlight spike plan: [`plan_v2.14_starlight-spike.md`](./plan_v2.14_starlight-spike.md)
- v2.14 Starlight spike report (post-Codex): [`plan_v2.14_starlight-spike-report_2026-05-06.md`](./plan_v2.14_starlight-spike-report_2026-05-06.md)
- v2.14 spike review (archived): [`_archive/plan_v2.14_starlight-spike-report_2026-05-06_original_reviewed-by-codex.md`](./_archive/plan_v2.14_starlight-spike-report_2026-05-06_original_reviewed-by-codex.md)
- v2.13 final sweep (QW backlog): [`../v2.13.0/plan_v2.13_final-sweep_2026-05-05.md`](../v2.13.0/plan_v2.13_final-sweep_2026-05-05.md)
- v2.13 master plan (structural model): [`../v2.13.0/plan_v2.13.0.md`](../v2.13.0/plan_v2.13.0.md)

> **What this is.** The consolidated execution plan for migrating pm-skills from MkDocs Material to Astro Starlight in v2.14.0. Replaces the high-level sequence in the cycle plan's migration-execution section (Phases 1-4) with: 13 workstreams in dependency order grouped into 4 phases by demonstrable outcome (Foundation / Parity / Cutover / Deprecate-and-Ship), per-workstream acceptance criteria, a detailed CI migration section, a detailed Material-deprecation section with acceptance criteria, the 7 Pre-Ship Validation Gates expanded, decisions surfaced by migration planning, the Adversarial Review Loop schedule (PR.1 through PR.5), and a risk register. The cycle plan stays the strategy artifact; this is the execution artifact.

---

## 1. Migration overview

| Dimension | Value |
|---|---|
| Effort estimate | 30-40 hours focused work (base 22-28 + validation reserve 8-12) |
| Calendar estimate | 5-8 days assuming context-switching |
| Workstreams | 13 (W1-W13) |
| Pre-ship validation gates | 7 |
| New CI checks | 2 (production-mode internal/ exclusion; edit-link resolution) |
| Material artifacts to deprecate | mkdocs.yml + ~6 Material plugin pip dependencies + custom CSS + workflow steps + documentation references |
| Risk profile | Medium. Spike covered ~80% of compatibility surface; the 20% is bounded by validation gates. |

```
W1 Pre-flight setup
  -> W2 Production content-source mount (D2)
       -> W3 Frontmatter compliance (title injection)
       -> W4 Sidebar IA hybrid (D3)
       -> W6 Mermaid integration (D4)
       -> W8 Generator output verification
       -> W9 Redirect mapping
       -> W10 CI workflow migration
            -> W11 GitHub Pages deploy migration
                 -> W12 Material deprecation
                      -> W13 Final validation + ship
       -> W5 Custom CSS port (depends on W4)
       -> W7 Library samples (depends on W2 + W4)
```

---

## 2. Maintainer decisions in scope

Recap of decisions resolved in the cycle plan's Decision Briefs section. This plan executes against these resolutions.

| ID | Decision | Outcome | Affects |
|---|---|---|---|
| D1 | Performance NO-GO trigger waiver | Option A (waiver only; no hard remediation gate; light monitoring) | W13 (benchmark-only, not gating) |
| D2 | Production content-source strategy | Option B (in-place mount via custom docsLoader pattern) | W2 (foundational); W7 (samples mount); W11 (deploy) |
| D3 | Sidebar IA strategy | Option C (hybrid: manual top-level, autogenerate within sections) | W4 |
| D4 | Mermaid loading strategy | Option B (lazy-load) with Option C (code-split) fallback; defer to v2.15 if neither works | W6 |
| Adjacent | Old Material URL preservation | Lower priority; redirect base-path bug is MEDIUM polish, not pre-ship gate | W9 (optional polish) |
| Adjacent | Astro 6 + Node 22.12+ bump | Deferred to v2.15+ as focused upgrade cycle | Out of scope for v2.14 |

New decisions surfaced by this plan are recorded in Section 6 below as DM-1, DM-2.

---

## 3. Workstreams

Grouped into 4 phases by demonstrable outcome at end of phase. Workstream sub-sections retain individual H3 headers; phase markers are short H3 dividers between them.

### Phase 1: Foundation (W1-W3)

*End-of-phase outcome: Astro builds against in-place `docs/` mount with valid frontmatter.*

### W1: Pre-flight setup

**Goal.** Establish the spike POC's lessons in production-grade pinning before any new code lands.

**Tasks:**
- Add `engines.node: ">=22.0.0 <23"` field to root-level `package.json` (per Codex S7.M2)
- Pin dependencies: `astro` to `~5.13`, `@astrojs/starlight` to `~0.34`, `astro-mermaid` to `~2.0` (consciously floated minor with documented policy in CONTRIBUTING.md or a new `docs/internal/dependency-policy.md`)
- Decide on spike POC: delete `_spike/starlight-poc/` after confirming nothing useful was missed, or repurpose as the migration starting point (recommend delete; the POC was throwaway by design)
- Scaffold the production Astro project at the repo root level (NOT under `_spike/`); name the package `pm-skills-docs` or similar
- First `npm install` and confirm no peer-dep warnings

**Acceptance criteria:**
- New Astro project exists at repo root (not under `_spike/`)
- `package.json` has `engines.node` field and explicit pin policy
- `npm install` completes without errors or warnings
- `npm run build` exits 0 against an empty / starter content set
- `_spike/starlight-poc/` directory deleted (or explicitly retained with a documented reason)
- `_spike-*.log` files at repo root: deleted OR moved to `docs/internal/release-plans/v2.14.0/_archive/spike-evidence/`

**Dependencies:** none

**Effort:** 1-2 hours

**Owner:** Claude

---

### W2: Production content-source mount (D2 Option B)

**Goal.** Mount existing `docs/` in-place via custom docsLoader pattern. Contributors continue editing `docs/` directly.

**Tasks:**
- Configure `astro.config.mjs` `srcDir` and content collection root to point at the existing `docs/` directory (the exact mechanism depends on Astro's content loader API: investigate `glob` loader vs custom path)
- Configure exclusion: `pattern: '!internal/**'` so `docs/internal/` does not appear in `dist/`
- Configure exclusion: `pattern: '!templates/**'` per spike Caveat 3
- Build and verify zero `internal/` paths and zero `templates/` paths in `dist/`
- Verify edit-link generation: pick 3 sample pages, confirm `editLink` URLs resolve to actual files in the repo (e.g., `https://github.com/product-on-purpose/pm-skills/edit/main/docs/skills/define/define-hypothesis.md` should be a real file path)

**Acceptance criteria:**
- Build completes against in-place `docs/` mount with no file copying
- `Get-ChildItem dist/ -Recurse | Where-Object { $_.FullName -match 'internal' }` returns zero results
- `Get-ChildItem dist/ -Recurse | Where-Object { $_.FullName -match 'templates' }` returns zero results
- Random-sample 5 built pages: each has an `editLink` URL that points to a file existing at that path in the repo
- No CI step requires copying `docs/` content before building

**Dependencies:** W1

**Effort:** 2-4 hours

**Owner:** Claude

---

### W3: Frontmatter compliance (title injection)

**Goal.** Every doc has the `title:` frontmatter Starlight requires.

**Tasks:**
- Run title-injection script (parser-aware FM boundary detection per spike experience) on all 51 files lacking `title:`
- Manual quality pass: review filename-derived titles for cases that look bad (e.g., underscores, all-caps, abbreviations); replace with hand-authored titles as needed
- Update `astro.config.mjs` content collection schema with extended fields: `generated`, `source`, `phase`, `classification`, `version`, `updated`, `license`, `metadata`, `tags`, `date`, `draft` (per spike Caveat 1 and Pattern 5C)
- Update `lint-skills-frontmatter` validator: extend to require `title:` on every doc/*.md (or pull this requirement into a new `validate-docs-frontmatter` advisory-to-enforcing promotion per QW-7)

**Acceptance criteria:**
- 100% of `docs/**/*.md` (excluding `internal/` and `templates/`) have `title:` frontmatter
- Build completes without "title required" schema errors
- 51-file diff is committed with clear commit message: `fix(docs): inject title frontmatter for Starlight schema compliance (51 files)`
- Title quality reviewed (no `Readme` or `Index` titles where a real title applies)
- `lint-skills-frontmatter` validator catches missing `title:` on new contributions

**Dependencies:** W1

**Effort:** 1 hour (script) + 1-2 hours (quality pass + validator update) = 2-3 hours

**Owner:** Codex (script) + Claude (validator + review)

---

### Phase 2: Parity (W4-W9)

*End-of-phase outcome: Site renders all content comparably to Material; no visual regressions on key page types.*

### W4: Sidebar IA hybrid (D3)

**Goal.** Implement Option C: manual top-level section ordering and labels, autogenerate within each section.

**Tasks:**
- Author top-level section list in `astro.config.mjs` Starlight `sidebar:` config matching the current `mkdocs.yml` nav top level (Home / Getting Started / Skills / Workflows / Guides / Concepts / Showcase / Reference / Contributing / Releases)
- For each section, configure `autogenerate: { directory: '<section-path>' }` to populate items from filesystem
- Add label overrides for known autogenerate drift cases (e.g., `Reference / README` should display as "Overview"; release titles default to filename and need explicit overrides for Release_v2.X.Y.md to "v2.X.Y")
- Verify nav matches Material site at top level via visual diff

**Acceptance criteria:**
- Top-level sidebar order matches `mkdocs.yml` nav top level exactly (Home through Releases)
- Section labels match (custom labels honored: "Overview" not "Readme")
- Within sections, every page that exists under that directory appears in the sidebar
- Release pages titled `v2.X.Y` not `Release_v2_X_Y` or filename-derived
- Visual diff between Material and Starlight sidebar shows no missing or wrongly-labelled items at top level

**Dependencies:** W2

**Effort:** 3-5 hours

**Owner:** Claude

---

### W5: Custom CSS port

**Goal.** Port Material-targeting selectors in `docs/stylesheets/extra.css` to Starlight equivalents (or retire selectors that no longer apply).

**Tasks:**
- **CSS inventory pass (PREREQUISITE per Codex S3.M3):** read `docs/stylesheets/extra.css` line by line; for each selector, decide: port / retire / keep generic. Document in a temporary scratch file `_local_v2.14_css-inventory.md` (gitignored).
- Browser screenshot pass: side-by-side Material (current) vs Starlight (in-progress) on key page types (home, skill, workflow, guide-with-mermaid, reference, release notes). Identify visual regressions that the CSS port needs to address.
- For each Material-specific selector (`md-*`, `.md-grid`, `.md-button`, `.md-tags .md-tag`): port to Starlight equivalent (Starlight uses generic class names: `sidebar`, `sidebar-pane`, `right-sidebar`, plus per-component scoped Astro hashes like `astro-vrdttmbt`)
- For selectors that target generic classes (`.mermaid`, `details.example`): visually verify they still apply
- Configure `customCss: ['./src/styles/custom.css']` in `astro.config.mjs` Starlight integration
- Deliberately retire any selector with no Starlight equivalent (don't port "just in case")

**Acceptance criteria:**
- CSS inventory is complete: every selector in original `extra.css` has a disposition row (port / retire / keep generic)
- All Material-class selectors either ported or retired (zero `md-*` or `.md-` references in shipping CSS)
- Visual smoke test: home, skill page, workflow, guide-with-mermaid, reference, release notes all render acceptably (no broken layouts; minor stylistic differences acceptable per "Cosmetic diffs" section of spike report)
- Custom CSS file is referenced via Starlight `customCss` config
- Original `docs/stylesheets/extra.css` deleted OR moved to a Starlight-aware path under `src/styles/`

**Dependencies:** W4 (sidebar in place; needed as visual reference)

**Effort:** 1 hour (inventory) + 4-8 hours (port) = 5-9 hours

**Owner:** Claude (inventory + port); human (browser screenshot review)

---

### W6: Mermaid integration (D4)

**Goal.** Implement Mermaid loading per D4: lazy-load if `astro-mermaid` supports it, else code-split, else defer to v2.15.

**Tasks:**
- Investigate `astro-mermaid` API for lazy-load support (read npm README + source); if supported, configure
- If not supported: implement code-split via dynamic import in MDX wrapper components
- If neither path is straightforward in v2.14 budget: defer Mermaid optimization to v2.15 and ship eager loading (with explicit acknowledgment in release notes)
- Verify Mermaid renders on known-mermaid pages: homepage hero, release notes (multiple), master plans (in `docs/internal/release-plans/v2.14.0/` if mounted; should NOT be mounted per W2 internal-exclusion), `using-meeting-skills.md` (3 blocks)

**Acceptance criteria:**
- Mermaid renders correctly on all known-mermaid pages
- One of the three loading strategies is selected and documented (lazy-load configured / code-split configured / eager-loading deferred-to-v2.15)
- If lazy-load or code-split: Vite chunk-size warning for `mermaid.core` is gone OR explicitly accepted with rationale
- If deferred: release notes call out the eager-loading limitation

**Dependencies:** W2

**Effort:** 1-2 hours

**Owner:** Claude

---

### W7: Library samples mount + smoke test

**Goal.** Mount the 132 library/skill-output-samples files; verify they render.

**Tasks:**
- Decision: mount samples as a separate Starlight content collection (browseable under a new `/samples/` route) OR as flat docs under an existing path (e.g., `/library/`). Recommend separate collection for clear separation.
- Configure docsLoader / glob loader for `library/skill-output-samples/`
- Build and verify all 132 sample files render
- Sample matrix smoke test (Codex S3.M1): pick one sample per skill phase (discover, define, develop, deliver, measure, iterate, foundation, utility) plus 2-3 thread-aligned samples per thread (storevine, brainshelf, workbench); manual visual verification
- Triage MDX collisions: search for `<` characters in non-code-block contexts in samples; if widespread, document fix-up scope as separate task

**Acceptance criteria:**
- 132 sample files render in the built site
- No build errors from sample content
- Sample matrix (8+ samples spanning all skill phases + 3 threads) visually verified
- Sample typography consistent across threads (storevine / brainshelf / workbench look the same modulo content)
- Any MDX collisions either fixed or documented as known issues

**Dependencies:** W2, W4

**Effort:** 4-6 hours

**Owner:** Claude

---

### W8: Generator output verification

**Goal.** Confirm the 3 Python generators continue producing content Starlight builds.

**Tasks:**
- Run `python scripts/generate-skill-pages.py` and verify output structure unchanged
- Run `python scripts/generate-workflow-pages.py` likewise
- Run `python scripts/generate-showcase.py` likewise
- Build the site with newly-regenerated content; verify all 63 generator-output pages render
- Verify Pattern 5C `generated:` and `source:` frontmatter survive: check at least 1 generated page in `dist/` for HTML metadata or visible source-link
- Run `check-generated-content-untouched` validator; should pass

**Acceptance criteria:**
- 3 generators run without modification
- All 63 generator-output pages render in `dist/`
- Pattern 5C frontmatter still present in source files post-generation
- `check-generated-content-untouched` validator passes

**Dependencies:** W2, W3

**Effort:** 1 hour

**Owner:** Codex (verification) + Claude (generator updates if needed)

---

### W9: Redirect mapping (optional polish)

**Goal.** Port `mkdocs.yml redirect_maps` to Astro `redirects:` config.

**Tasks:**
- Port all 12 entries from `mkdocs.yml redirects.redirect_maps` to `astro.config.mjs redirects:` (5 minutes)
- Decision: apply base-path fix to destinations (12 manual edits) OR ship without per maintainer "don't care about old URLs" call
- If applying fix: prefix every destination with `/pm-skills` so meta-refresh and canonical link include base
- Verify redirect HTML pages generate in `dist/` for each entry

**Acceptance criteria:**
- 12 redirect entries in `astro.config.mjs`
- Redirect HTML pages exist in `dist/` for each entry (12 files at expected paths)
- (OPTIONAL) base-path destinations correct OR deliberately deferred with note in release notes that old URLs may 404
- meta-refresh tag points to a valid URL (whether base-prefixed or bare per chosen path)

**Dependencies:** W2

**Effort:** 30 min (port) + 0 to 30 min (optional polish) = 30-60 min

**Owner:** Claude

---

### Phase 3: Cutover (W10-W11)

*End-of-phase outcome: CI publishes the site; production URL `https://product-on-purpose.github.io/pm-skills/` loads with Starlight UI; no MkDocs dependency in active build path.*

### W10: CI workflow migration (DETAILED)

**Goal.** Replace MkDocs-based CI with Astro-based CI; preserve all source-validating checks; add 2 new automated checks.

#### W10.1: Inventory current `.github/workflows/`

| Workflow file | Current purpose | Migration disposition |
|---|---|---|
| `validation.yml` | Runs all source-validating scripts on Ubuntu + Windows; also builds with mkdocs to catch broken-link warnings | **MODIFY:** keep all source-validating steps unchanged (they validate markdown not rendered HTML); replace `mkdocs build` step with `npm run build`; add new automated checks (W10.4) |
| `release.yml` | Creates GitHub Release on tag push | **KEEP UNCHANGED:** does not depend on doc stack |
| `release-zips.yml` | Packages ZIP artifacts | **KEEP UNCHANGED:** packages skill source files, not built site |
| `validate-mcp-sync.yml` | Validates pm-skills repo and pm-skills-mcp repo are in sync | **KEEP UNCHANGED:** validates source markdown only |
| `validate-plugin.yml` | Validates Claude plugin manifest | **KEEP UNCHANGED:** validates plugin.json + marketplace.json |
| (NEW) `deploy-pages.yml` | (does not exist; mkdocs gh-deploy was run manually or via another mechanism) | **CREATE:** Astro Action -> gh-pages branch (per W11) |

#### W10.2: validation.yml step-level changes

| Step | Current | New |
|---|---|---|
| Setup Node | (not present or only for tests) | **ADD:** Node 22.x (matches engines.node from W1) |
| Setup Python | Required for mkdocs + scripts | **KEEP:** still needed for generator scripts (W8) |
| `npm install` | (not present) | **ADD:** install Astro/Starlight deps |
| `pip install -r requirements.txt` | Installs MkDocs Material stack | **MODIFY:** if a Python `requirements.txt` exists for mkdocs, slim to only the generator-script dependencies; if no separate requirements file, this is a no-op after Material is uninstalled in W12 |
| `mkdocs build --strict` | Catches broken cross-refs as warnings | **REPLACE:** `npm run build` (Starlight catches schema errors as build errors; cross-ref validation is a separate concern handled by `check-internal-link-validity` validator) |
| All `bash scripts/*.sh` and `pwsh scripts/*.ps1` validators | Source markdown validation | **KEEP UNCHANGED** |
| Generated content checks | Run generators + assert untouched | **KEEP UNCHANGED:** generators produce markdown; markdown is markdown |

#### W10.3: Validator script changes

| Validator | Disposition | Notes |
|---|---|---|
| `validate-commands.sh/.ps1` | KEEP UNCHANGED | Validates commands/ vs skills/ |
| `lint-skills-frontmatter.sh/.ps1` | EXTEND | Add `title:` field requirement (per W3) |
| `validate-agents-md.sh/.ps1` | KEEP UNCHANGED | Validates AGENTS.md sync |
| `check-mcp-impact.sh/.ps1` | KEEP UNCHANGED | Advisory MCP impact detection |
| `validate-meeting-skills-family.sh/.ps1` | KEEP UNCHANGED | Family contract enforcement |
| `check-generated-content-untouched.sh/.ps1` | KEEP UNCHANGED | Generators produce same content |
| `check-internal-link-validity.sh/.ps1` (advisory) | PROMOTE to enforcing per QW-7 (v2.13 final-sweep) | Particularly important post-migration since Starlight does not surface broken-link warnings the same way Material `--strict` did |
| `check-count-consistency.sh/.ps1` | KEEP UNCHANGED | Validates source counts |
| `validate-docs-frontmatter.sh/.ps1` (advisory) | PROMOTE to enforcing per QW-3 + extended to require `title:` (W3) | |
| `validate-version-consistency.sh/.ps1` | KEEP UNCHANGED | Validates plugin manifests |

#### W10.4: New automated checks

**Check 1: Production-mode `internal/` exclusion (per Codex S6.M1).**

```bash
# Expected to be a CI step in validation.yml after the build step
test -z "$(find dist/ -path '*internal*' -type f 2>/dev/null)" || \
  { echo "FAIL: internal/ paths leaked into dist/"; exit 1; }
```

PowerShell equivalent for Windows runner:

```powershell
$leaks = Get-ChildItem -Path dist/ -Recurse -File | Where-Object { $_.FullName -match 'internal' }
if ($leaks.Count -gt 0) { Write-Error "internal/ paths leaked into dist/: $($leaks.Count) files"; exit 1 }
```

**Check 2: Edit-link resolution (per Codex S5.M1).**

```bash
# Parses built HTML for editLink URLs; verifies each maps to a real file in the repo
node scripts/verify-edit-links.js dist/ docs/
```

(Implementation: parse all `dist/**/*.html`, extract editLink anchor targets, normalize to repo-relative paths, assert each target exists in repo.)

#### W10.5: CI acceptance criteria (overall)

- All 22 existing validators (10 enforcing + 12 advisory + the new 2) run on Ubuntu + Windows with green status
- `validate-docs-frontmatter` and `check-internal-link-validity` promoted from advisory to enforcing per QW-3 / QW-7
- 2 new automated checks added (production-mode internal/ exclusion; edit-link resolution)
- `mkdocs build` step removed from `validation.yml`
- `npm run build` step added to `validation.yml`
- Zero references to `mkdocs` in any active workflow file (advisory grep: `grep -r 'mkdocs' .github/workflows/` returns 0 results)
- New `deploy-pages.yml` workflow created

**Dependencies:** W2 (in-place mount); W3 (frontmatter compliance)

**Effort:** 4-6 hours

**Owner:** Claude

---

### W11: GitHub Pages deploy migration

**Goal.** Replace `mkdocs gh-deploy` with Astro Action -> gh-pages branch; verify cutover.

**Tasks:**
- Identify current GitHub Pages config: `Settings > Pages > Source = Deploy from a branch > gh-pages`. Confirm before touching.
- Author `.github/workflows/deploy-pages.yml`. Recommendation: use `withastro/action` official action (vs hand-rolled GitHub Action). See DM-2 below.
- Configure `site: 'https://product-on-purpose.github.io'` and `base: '/pm-skills'` in `astro.config.mjs`
- First deploy: cut from a feature branch, deploy to a preview path (e.g., gh-pages-preview branch -> `https://product-on-purpose.github.io/pm-skills-preview/`); verify
- Cutover: deploy to `gh-pages` from `main` after PR.5 promotion; verify production URL `https://product-on-purpose.github.io/pm-skills/` loads

**Acceptance criteria:**
- `gh-pages` branch updated by Astro action, not by `mkdocs gh-deploy`
- `https://product-on-purpose.github.io/pm-skills/` loads with Starlight UI
- All major page types load: home, skill page, workflow, guide-with-mermaid, reference, release notes
- Asset paths resolve (CSS, fonts, images, mermaid bundle if loaded)
- Pagefind search works (search box appears, query returns results)
- 404 page renders (Starlight default 404 is acceptable)
- HTTPS works; no mixed-content warnings

**Dependencies:** W10

**Effort:** 1-2 hours

**Owner:** Claude

---

### Phase 4: Deprecate + Ship (W12-W13)

*End-of-phase outcome: Material removed from repo and CI; v2.14.0 tagged and released; doc stack is Astro Starlight only.*

### W12: Material deprecation (DETAILED, with acceptance criteria)

**Goal.** Remove all Material/MkDocs artifacts from the repo and CI. Order matters: deprecation happens AFTER cutover (W11) is verified, not before.

#### W12.1: Files to delete

| Path | Action | Verification |
|---|---|---|
| `mkdocs.yml` | DELETE (per DM-1; recommended timing: after PR.5, as the last commit before tag) | File does not exist; no references to it anywhere in the repo |
| `docs/stylesheets/extra.css` | RETIRE (after CSS port to `src/styles/custom.css` in W5) | File does not exist OR has been moved to `src/styles/` Starlight-aware path |
| `requirements.txt` (if it lists mkdocs deps) | TRIM or DELETE | Either the file is gone OR it lists only generator-script deps (no mkdocs / pymdownx / mkdocs-* entries) |
| Material-specific images in `docs/` | INVESTIGATE then ACTION | Inventory first; many docs images are doc content (skill diagrams), not Material-specific. Delete only Material-branded chrome (e.g., favicon.ico if it's the Material default) |
| `.github/workflows/<any>.yml` containing `mkdocs gh-deploy` | DELETE the workflow OR delete the step | `grep -r 'mkdocs gh-deploy' .github/` returns 0 results |
| Generated `site/` directory (in `.gitignore`) | KEEP IGNORED (still useful as gitignore entry; `site/` may exist as Astro `dist/` alternative or unused) | `.gitignore` still excludes `site/` |

#### W12.2: pip dependencies to remove

If `requirements.txt`, `pyproject.toml`, or other Python dependency files reference any of these, remove them:

| Package | Why it was used | Replacement |
|---|---|---|
| `mkdocs` | Static site generator | Astro (Node) |
| `mkdocs-material` | Theme | Starlight (Node) |
| `mkdocs-redirects` | URL redirects | Astro `redirects:` config |
| `pymdownx-extensions` (and all `pymdownx.*` modules) | Markdown extensions | Starlight built-ins + remark/rehype plugins |
| `mkdocs-tags-plugin` | Tag indexing | Custom (build a tag-index page) OR drop tags-as-feature for v2.14 |
| `mkdocs-git-revision-date-localized-plugin` | "Last updated" timestamps | remark plugin (e.g., `remark-mtime`) |
| `mkdocs-social` | OG image generation | Starlight built-in OG image support |
| `cairosvg`, `pillow` (if added for social-card font rendering) | Material plugin transitive deps | Not needed |

Acceptance: `pip list 2>/dev/null | grep -i 'mkdocs\|pymdownx\|cairosvg'` returns 0 results in a fresh virtualenv built from current repo.

#### W12.3: Documentation updates

| File | What changes |
|---|---|
| `README.md` | Replace any "build with `mkdocs serve`" or `mkdocs build` instructions with `npm run dev` / `npm run build` |
| `CONTRIBUTING.md` | Update build / preview commands |
| `docs/guides/*` | Update any guide that references mkdocs (e.g., `validate-mcp-sync.md` is unaffected; check each) |
| `docs/concepts/agent-skill-anatomy.md` | Verify no mkdocs-specific content |
| `docs/internal/cross-llm-review-protocol.md` etc. | Not a public concern; verify no mkdocs setup steps |

#### W12.4: Material deprecation acceptance criteria

- [ ] **0 active references to mkdocs in repo (excluding `_archive/` and historical change logs).** Verification: `grep -r --exclude-dir=_archive --exclude-dir=node_modules --exclude=CHANGELOG.md 'mkdocs' .` returns 0 results.
- [ ] **0 pip dependencies for Material/MkDocs.** Verification: fresh `pip install -r requirements.txt` (if file still exists for generator scripts) installs nothing matching `mkdocs*` or `pymdownx*`.
- [ ] **0 active workflow steps invoking mkdocs.** Verification: `grep -r 'mkdocs' .github/workflows/` returns 0 results.
- [ ] **mkdocs.yml deleted.** Verification: `test -f mkdocs.yml` returns false (file does not exist).
- [ ] **Site builds end-to-end with only Node toolchain.** Verification: from a clean checkout, `npm install && npm run build` produces a working `dist/` without invoking Python/pip beyond the generator scripts.
- [ ] **All v2.13-era validators that referenced mkdocs still pass.** Verification: full CI run green.
- [ ] **No regressions vs Material site.** Verification: every page that worked under Material works under Starlight (per W11 acceptance criteria + W13 final smoke test).
- [ ] **README, CONTRIBUTING, and developer-facing docs reflect new build commands.** Verification: manual review.
- [ ] **Python virtualenv (if existed) updated or removed.** Verification: documented in dependency-policy.md (created in W1).
- [ ] **CHANGELOG.md captures the deprecation explicitly.** Verification: v2.14.0 entry has a "Deprecated" section listing mkdocs / mkdocs-material / pymdownx / etc. (per Keep a Changelog convention).

**Dependencies:** W11 (cutover verified before deletion is safe); DM-1 (timing decision)

**Effort:** 2-4 hours

**Owner:** Claude

---

### W13: Final validation

**Goal.** Pre-ship verification across all acceptance criteria + Pre-Ship Validation Gates.

**Tasks:**
- Re-run all 24 validators (22 existing + 2 new); confirm all pass
- Browser visual smoke test on key page types (paired human + Claude session): home, skill page (one per phase), workflow, guide-with-mermaid, reference, release notes, contributing, showcase
- Performance benchmark (light per D1: record cold and warm build times; no hard gate)
- Verify all 7 Pre-Ship Validation Gates (Section 4 below)
- PR.2 release-state Codex adversarial review (Section 5 below)

**Acceptance criteria:**
- All 24 validators green on Ubuntu + Windows
- All 7 Pre-Ship Validation Gates pass (see Section 4)
- Browser smoke test: 0 regressions on key page types
- Performance benchmark recorded in v2.14.0 release notes (for posterity, not gating per D1)
- Codex PR.2 review converged below IMPORTANT severity

**Dependencies:** All W1-W12

**Effort:** 2-4 hours

**Owner:** Claude + human

---

## 4. Pre-Ship Validation Gates

Seven gates from spike report Outcome section, expanded with per-gate verification method.

| Gate | Verification method | Owning workstream |
|---|---|---|
| **G1: Production content-source strategy verified** (D2) | Build runs against in-place `docs/` mount; `dist/` contains zero `internal/*` paths; edit-link random-sample resolves correctly | W2, W10.4 |
| **G2: Library samples render correctly** | Build includes 132 samples; sample-matrix smoke test (8+ samples spanning phases + threads) visually verified | W7 |
| **G3: Custom CSS port complete** | CSS inventory complete; zero Material-class selectors in shipping CSS; visual smoke test passes | W5 |
| **G4: Sidebar IA hybrid implemented** (D3) | Top-level matches Material; section labels honored; release titles correct | W4 |
| **G5: GitHub Pages deploy verified end-to-end** | Production URL loads; all major page types render; assets resolve; search works | W11 |
| **G6: Edit links resolve** | Random-sample 5 built pages; each editLink URL maps to real file in repo | W2, W10.4 |
| **G7: Browser visual smoke test on key page types** | Manual paired session; 0 regressions on home / skill / workflow / guide-with-mermaid / reference / release notes | W13 |

---

## 5. Adversarial Review Loop schedule

Codified pattern from v2.11 / v2.12 / v2.13 (originally "Phase 0 Adversarial Review Loop"; dropping the "Phase 0" prefix here to avoid collision with the cycle's Phase 0 compatibility-decision label). For a doc-stack migration, scoped lighter than v2.13 PR.2 marathon.

| Gate | What it covers | Method | Trigger |
|---|---|---|---|
| **PR.1: Per-strand Codex review** | Individual workstream reviews as they complete (W2, W4, W5, W7, W10, W11, W12) | Codex `codex-rescue` agent dispatched per workstream with workstream-specific scope | After each workstream completes (parallel-friendly) |
| **PR.2: Release-state Codex review** | Full migration plan + state of repo before tag; Cross-doc consistency between this plan, the cycle plan, and the release notes draft | Codex review against full release-state (this is the adversarial-review pattern v2.13 PR.2 ran 5 rounds; for v2.14 expect 1-2 rounds since less is changing) | After all workstreams complete; before PR.5 |
| **PR.3: Generator regen** | Run all 3 generators against current source; confirm `check-generated-content-untouched` validator passes (zero diff) | Mechanical CI | After PR.2 |
| **PR.4: Pre-release checklist** | All 24 validators green; all 7 Pre-Ship Validation Gates pass | Mechanical CI + W13 verification | After PR.3 |
| **PR.5: CHANGELOG + Release notes + README + tag** | Authored drafts promoted to canonical; v2.14.0 tag at last release-prep commit | Manual + Claude authored, human approved | After PR.4 |

---

## 6. New Decision Briefs

Decisions surfaced by migration planning, requiring maintainer signoff before W12 / W11 execution.

### DM-1: When to delete mkdocs.yml

**What it is.** mkdocs.yml is the Material site config. Once Starlight cutover is complete (W11), mkdocs.yml is dead weight. The question is when to delete it: at the start of W12 (clean cutover; mkdocs is gone the moment Starlight is up), or as the LAST commit before tagging v2.14.0 (deletion is the symbolic "ship" moment; revertible until tag), or never in v2.14 (keep through v2.15+ as fallback / dual-stack support).

**Why it matters.** Affects rollback story: if Starlight has post-ship issues, can we revert to Material quickly? Also affects contributor cognitive overhead during the cycle (two configs to think about).

**Desired outcome.** A clean cutover with a minimal rollback window if needed.

**Potential solutions.**
- **Option A: Delete at start of W12.** Pros: clean cutover; no dual-stack period. Cons: rollback requires git revert of multiple commits; less safe.
- **Option B: Delete as last commit before v2.14.0 tag.** Pros: revertible until tag; symbolic "ship" moment; minimal rollback window. Cons: brief period where mkdocs.yml exists alongside astro config (cognitive overhead).
- **Option C: Keep through v2.15+ as fallback.** Pros: max safety; can still build Material site if needed. Cons: dual-stack maintenance burden; mkdocs.yml drifts; muddies the "we shipped Starlight" message.

**Recommendation: Option B** (last commit before tag). Best balance of cutover cleanliness and rollback safety.

**Maintainer decision / feedback:**
- [ ] Accept recommendation (Option B)
- [ ] Modify: 
- [ ] Reject; alternative direction: 
- Notes: 

### DM-2: GitHub Pages deploy action choice

**What it is.** Astro provides an official `withastro/action` GitHub Action that builds and publishes to GitHub Pages. Alternative: hand-roll the deploy workflow using `actions/checkout`, `actions/setup-node`, `npm ci`, `npm run build`, and `peaceiris/actions-gh-pages` (or similar) for the publish step.

**Why it matters.** Affects future maintenance burden and what version of Astro/Starlight gets used in CI vs locally.

**Desired outcome.** Reliable deploy that does not need babying.

**Potential solutions.**
- **Option A: Use `withastro/action` official.** Pros: maintained by Astro core team; updates automatically; well-documented. Cons: less customization; opinionated about Node version + cache strategy.
- **Option B: Hand-rolled with `peaceiris/actions-gh-pages`.** Pros: full control over Node version, cache strategy, build command sequence. Cons: more YAML to maintain; can drift from Astro best practices over time.

**Recommendation: Option A** (official action). pm-skills is small enough that we don't need custom build orchestration; the official action is the lowest-maintenance path.

**Maintainer decision / feedback:**
- [ ] Accept recommendation (Option A)
- [ ] Modify: 
- [ ] Reject; alternative direction: 
- Notes: 

---

## 7. Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Untested compatibility surfaces emerging mid-migration (sample MDX collisions; CSS edge cases; CI environment differences) | Medium | Medium | Validation reserve (8-12 hrs) sized for this; W7 sample matrix + W5 CSS inventory front-load discovery |
| D1-D4 outcomes shift between now and execution (e.g., D2 Option B docsLoader pattern API doesn't work as expected) | Low | High | Each D-decision has an alternate path (D2 has Option A or C as fallbacks); document fallback chosen in CHANGELOG |
| Astro 5.x going to maintenance mode unexpectedly (Astro 6 already exists) | Low | Medium | Astro 5 is current-maintained; v2.15+ deferral handles the upgrade |
| `astro-mermaid` plugin maintenance status uncertainty | Medium | Low | If maintenance halts, switch to `rehype-mermaid` (alternative integration); D4 already has fallback options |
| GitHub Pages config differences from local build | Medium | Medium | W11 first deploy goes to a preview path before cutover |
| Edit-link resolution check (W10.4) is harder to implement than expected | Low | Low | Defer the automated check to v2.14.1 if blocking; verify manually as W13 acceptance criterion |
| Title injection script (W3) produces low-quality titles for many files | Low | Low | Manual quality pass after script run; fall back to author titles by hand for the worst cases |
| Library samples (W7) reveal widespread MDX collisions requiring per-file fixes | Low | Medium | Validation reserve covers; if catastrophic, defer samples to v2.15 (samples are bonus, not core docs) |
| 132 sample files dramatically slow build | Low | Low | Astro content collections are fast; if a problem, investigate parallel build options |
| pm-skills-mcp impact discovered late | Low | Low | MCP consumes source markdown not built site; verify in W2 |

---

## 8. Open Questions

| # | Question | Default | Decision |
|---|---|---|---|
| OQ-M1 | Should library samples become a separate Starlight content collection (e.g., `/samples/` route) or be merged into existing `/showcase/`? | Separate `/samples/` collection (clearer separation; preserves existing showcase intent) | TBD at W7 kickoff |
| OQ-M2 | What's the Mermaid theme strategy if D4 lazy-load works? Default Mermaid theme (Tailwind-ish) or attempt to match Material's theme? | Default Mermaid theme; defer custom theming to v2.15+ | TBD at W6 kickoff |
| OQ-M3 | Does the `tags` plugin functionality (Material's tags page) need replication in Starlight, or can we drop tags-as-a-feature for v2.14? | Drop for v2.14; add custom tag-index page in v2.15 if user demand | TBD at W12 kickoff |
| OQ-M4 | Is `validate-docs-frontmatter` promotion to enforcing (per W10.3) safe to ship in same cycle as the title-injection script (W3)? | Yes; W3 lands first in dependency order; promotion in W10 verifies | TBD |
| OQ-M5 | Does the spike workspace `_spike/starlight-poc/` need to be preserved for any reason, or is deletion in W1 safe? | Deletion safe; the workspace was throwaway by design | TBD at W1 kickoff |

---

## 9. Related artifacts

- v2.13.0 release notes (the cycle that returned Zensical NO-GO and proposed Starlight): [`../../../releases/Release_v2.13.0.md`](../../../releases/Release_v2.13.0.md)
- Backlog-canonical: [`../../backlog-canonical.md`](../../backlog-canonical.md)
- Decision Brief convention (codified in Claude memory; future plans should follow): in `feedback_decision-brief-pattern.md` durable memory

---

## 10. Change Log

| Date | Change |
|---|---|
| 2026-05-06 | Initial migration plan authored after Codex adversarial review of spike report. 13 workstreams, 7 Pre-Ship Validation Gates, 2 new Decision Briefs (DM-1 mkdocs.yml deletion timing; DM-2 deploy action choice), Phase 0 schedule, Risk register. Total estimate 30-40 focused hours / 5-8 calendar days. |
