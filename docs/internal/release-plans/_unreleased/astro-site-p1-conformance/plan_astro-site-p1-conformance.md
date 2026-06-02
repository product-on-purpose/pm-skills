# Change Plan: Astro docs-site standard - P1 conformance

**Status:** ABSORBED into the Pattern S convergence (same branch, 2026-06-02). The four P1 wins were delivered in their final Pattern S form: the base path is single-sourced in `site/astro.config.mjs` (the interim `scripts/site-base.mjs` was deleted), `.nvmrc` was bumped to 24, the MkDocs fossil and the `site/` blanket-ignore were removed, and P1-3's docstring fix was mooted by deleting the Python generators. Not shipped as a standalone increment (decision D1: one PR folds it into the convergence).
**Owner:** Maintainers
**Type:** Internal conformance fixes (no skill behavior change, no site-output change). Untagged maintenance on `main` (squash-merge PR). Records as a `## [Unreleased]` CHANGELOG append.
**Theme:** Land the four P1 standard wins now; the full `/site` relocation is deferred to the family convergence.
**Created:** 2026-06-01
**Updated:** 2026-06-01

## Where we are

The family Astro docs-site standard (draft audit, `agent-plugins/_LOCAL/astro-site-standards.md`, 2026-06-01) rates pm-skills' docs site as "exemplary" on drift-guarding and deploy, and lists a small set of P1 conformance gaps. Per decision C (2026-06-01) we do those P1 wins now and **defer the `/site` relocation** to land with the family's generator-port + shared-preset convergence (standard clause 11, step 6). The relocation design is preserved, revivable, at `docs/internal/release-plans/_deferred/2026-06-01_astro-site-relocation/`.

This change is pure conformance: it makes no change to the rendered site (the published base path is identical, just sourced once instead of three times), no change to any skill, and no change to deploy. It is verifiable by build parity.

## Scope - the four P1 wins

| ID | Win | Standard clause | Files |
|----|-----|-----------------|-------|
| P1-1 | Delete the dead gitignored MkDocs `site/` fossil; refresh its stale ignore comment | clause 5 / 9 (pm-skills P1) | `site/` (disk), `.gitignore` |
| P1-2 | De-duplicate the published base path to one source | 14.7 (MUST) | new `scripts/site-base.mjs`; `astro.config.mjs`, `scripts/post-build-strip-md-links.mjs`, `scripts/check-rendered-links.mjs` |
| P1-3 | Fix the retired-MkDocs generator docstrings; remove dead MkDocs nav-snippet | clause 9 (pm-skills P1) | `scripts/generate-skill-pages.py`, `generate-showcase.py`, `generate-workflow-pages.py` |
| P1-4 | Commit a Node version pin | 14.8 (MUST) | new `.nvmrc` |

**Not here (deferred or out of scope):** the `/site` relocation itself; the Python -> Node generator port (A-3); the shared preset (A-2); `robots.txt` + `og:image` (P2, belong to the preset); the broader historical MkDocs references in validator `.md` docs and comments (accurate history, preserved per `CHANGELOG.md:8`).

## The edits

### P1-1: Delete the MkDocs fossil

- Delete `site/` from disk (untracked, 0 tracked files, unreferenced; verified `git ls-files site/` == empty). The on-disk contents are a May-6 MkDocs render (`index.html`, `bundles/`, `tags.json`).
- `.gitignore:7-8`: keep the `site/` ignore rule (the `/site` relocation is deferred, so `site/` is not yet tracked source), but refresh the stale comment:
  ```gitignore
  # Legacy build-output dir. MkDocs fossil removed 2026-06-01; rule kept as a guard
  # until the Astro /site relocation lands (see _deferred/2026-06-01_astro-site-relocation/).
  site/
  ```

### P1-2: One source for the base path

The base `/pm-skills` is currently hardcoded three times: `astro.config.mjs:21` (`base: '/pm-skills'`), `scripts/post-build-strip-md-links.mjs:46` (`const BASE = '/pm-skills'`), and `scripts/check-rendered-links.mjs:26` (`const BASE = '/pm-skills'`). Standard 14.7 forbids duplicating the base outside `astro.config`. Interim fix (the preset will later centralize this per 14.7 once the relocation lands): introduce one shared constant and import it everywhere.

1. New `scripts/site-base.mjs`:
   ```js
   // Single source of truth for the published base path (the GitHub Pages project
   // subpath). Imported by astro.config.mjs and the post-build / link-check helpers
   // so the base is declared once (family Astro site standard 14.7).
   export const BASE = '/pm-skills';
   ```
2. `astro.config.mjs`: add `import { BASE } from './scripts/site-base.mjs';` near the top imports; change `base: '/pm-skills',` (line 21) to `base: BASE,`.
3. `scripts/post-build-strip-md-links.mjs`: add `import { BASE } from './site-base.mjs';` with the other imports; delete the `const BASE = '/pm-skills';` at line 46.
4. `scripts/check-rendered-links.mjs`: same - import `BASE` from `./site-base.mjs`; delete the `const BASE = '/pm-skills';` at line 26.

The repo-source GitHub URL (`const GH = 'https://github.com/product-on-purpose/pm-skills'`, duplicated in a few scripts) is a separate literal and is left as-is (not the base path the standard flags); optional future consolidation.

### P1-3: Honest generator docstrings

The three page generators carry pre-Starlight "MkDocs" docstrings:
- `generate-skill-pages.py:3`: "Generate MkDocs skill pages from source SKILL.md..." -> "Generate Astro Starlight skill pages..."
- `generate-skill-pages.py:7`: "Also prints a nav YAML snippet for mkdocs.yml." -> remove (dead; see below).
- `generate-showcase.py:3`: "Generate MkDocs showcase pages from the sample library." -> "Generate Astro Starlight showcase pages..."
- `generate-workflow-pages.py:3`: "Generate MkDocs workflow pages from source _workflows/*.md." -> "Generate Astro Starlight workflow pages..."

Also remove the dead MkDocs nav-snippet path in `generate-skill-pages.py` (the `_print_nav_snippet`-style function around lines 691-692 that prints "# === NAV SNIPPET FOR mkdocs.yml ===") and its call site - `mkdocs.yml` no longer exists (Material/MkDocs retired in W12). Confirm the call site and any flag that triggers it during implementation; remove function + call + the line-7 docstring mention together.

Leave the historical MkDocs references in validator `.md` docs and comments (e.g., "migrated from mkdocs.yml exclude_docs in v2.13.x", "mkdocs.yml entry check was retired in W12") - they are accurate history, preserved per `CHANGELOG.md:8`.

### P1-4: Commit a Node pin

Neither `.nvmrc` nor `.node-version` exists. Add `.nvmrc` at the repo root:
```
22.12.0
```
Matches `package.json` `engines.node >=22.12.0` and the CI `setup-node` 22.12. (When the relocation lands, decide whether `.nvmrc` lives at root or moves into `site/`; root is correct while the Astro project is still at root.)

## Execution order and model tiers

1. **P1-1** fossil delete + gitignore comment - **Haiku** (mechanical).
2. **P1-4** add `.nvmrc` - **Haiku** (one-line file).
3. **P1-2** base de-dup (new module + 3 import edits) - **Sonnet** (import placement, do not change the value).
4. **P1-3** docstrings + dead-code removal - **Sonnet** (locate the nav-snippet call site in Python).
5. **Verify** (below) - **Opus/Sonnet**.
6. CHANGELOG append; commit; PR.

## Verification (parity - nothing user-facing changes)

1. **Build parity:** `npm run build` succeeds; `dist/` is byte-equivalent to a pre-change baseline (the base value is unchanged, so output must be identical). Compare route set + route count + a sha256 manifest.
2. **Link gates:** `node scripts/verify-edit-links.mjs dist .` and `node scripts/check-rendered-links.mjs dist` pass (confirms the `BASE` import in `check-rendered-links.mjs` resolves to the same value).
3. **Generators idempotent:** re-run the three generators; `git diff` on `docs/` is empty (docstring/dead-code edits do not change generated output).
4. **CI:** `validation.yml` green on ubuntu + windows.
5. **git status sanity:** `site/` fossil gone; `scripts/site-base.mjs` + `.nvmrc` are new tracked files; `astro.config.mjs`, the two link scripts, and the three generators show the intended edits and nothing else.

## CHANGELOG append (the one allowed CHANGELOG edit)

Under the existing `## [Unreleased]` heading (`CHANGELOG.md:10`):

```markdown
## [Unreleased]

### Added
- Committed `.nvmrc` pinning Node 22.12 (matches `engines.node`).

### Changed
- De-duplicated the published base path to a single `scripts/site-base.mjs` constant
  (previously hardcoded in `astro.config.mjs` and two link-check scripts). No site-output
  change. Refreshed the page generators' retired-MkDocs docstrings.

### Removed
- The dead gitignored MkDocs build fossil under `site/`, and the generators' dead
  `mkdocs.yml` nav-snippet output.
```

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Base import path wrong (`./scripts/site-base.mjs` vs `./site-base.mjs`) breaks build or a link script | Low | Med | Verify with a local build + both link gates (step 2); the value is unchanged so parity proves correctness. |
| Removing the nav-snippet function breaks the generator (missed call site) | Low | Med | Locate the call site before deleting; run the generator (step 3) and confirm empty `docs/` diff. |
| Deleting `site/` removes something still referenced | V.Low | Low | Verified untracked + unreferenced (`git ls-files site/` empty, no code reads `./site`). |

## Cross-references

- Deferred relocation (revivable): `docs/internal/release-plans/_deferred/2026-06-01_astro-site-relocation/`.
- Family standard: `agent-plugins/_LOCAL/astro-site-standards.md` (draft, 2026-06-01) - clauses 14.7, 14.8, 5, 9, 11.
- Repo policy: `CHANGELOG.md:8` (historical-record preservation).
