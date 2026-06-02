# Spec: Astro Starlight `/site` relocation (DEFERRED)

**Status:** REVIVED and EXECUTED as option B (Pattern S) on 2026-06-02 (see `plan_site-relocation.md`). The option-A loader mechanics documented below are superseded; the move / CI / gitignore / parity sections were the reusable core that was applied.
**Owner:** Maintainers
**Type:** Internal build reorg (no skill behavior change). When revived, ships as untagged maintenance on `main` (no version tag).
**Spec version:** 0.1.0
**Last updated:** 2026-06-01

## Deferral and target reframe (read first)

This relocation is **deferred**, not cancelled. It was reframed by the family Astro docs-site standard (draft audit, `agent-plugins/_LOCAL/astro-site-standards.md`, 2026-06-01):

- **Revival target is option B, not option A.** Standard clause 14.1 says a published docs site MUST place the Astro project in `site/` (option A satisfied this) but SHOULD use a generator that writes into `site/src/content/docs/` with the stock `docsLoader()` (only option B satisfies this). The mechanics documented below were authored for **option A** (move the toolchain into `site/`, keep the custom glob loader with `base: '..'`). On revival, the target is **option B**: retarget the generators to emit into `site/src/content/docs/`, adopt the stock loader, and drop the `docs/`-prefixed sidebar hacks and the post-build link rewriter where possible.
- **Why deferred:** the standard's roadmap (clause 11) sequences pm-skills' relocation **last** (P2, step 6), to land together with the family's generator-port and shared-preset convergence. Doing option B now would pre-empt the still-open decisions A-2 (shared `@product-on-purpose/astro-docs-preset`) and A-3 (Python -> Node generator). Doing option A now would only relocate the glob-loader anti-pattern the standard wants removed.
- **Blocked-on (revival triggers):** family decisions A-2 (preset) and A-3 (generator language) made; a preset / Node-generator contract available to land against.
- **What carries forward regardless of A/B:** the move set, the `.gitignore` un-trap + fossil deletion, the CI `working-directory: site` + `site/dist` edits, the dependabot `/site` block, and the layered parity contract are all target-agnostic and reusable. Only the loader/content-model parts (edit 2a and the sidebar `docs/` prefixes) are superseded by option B.
- **P1 wins extracted to the active track:** the deletion of the stale `site/` fossil, the base-path de-duplication, the MkDocs-docstring fixes, and the committed `.nvmrc` were pulled out of this relocation and are being done now under `docs/internal/release-plans/_unreleased/astro-site-p1-conformance/`.

The remainder of this spec is preserved as the build-ready option-A design and the shared research base. Treat the loader section as option-A reference; everything else is the reusable relocation core.

## Mission

Relocate the Astro Starlight documentation toolchain from the repository root into a dedicated `site/` directory, matching the directory-level layout used by the converted plugins in the product-on-purpose family (`agent-skills-toolkit`, `thinking-framework-skills`). Goals: structural consistency with the family and decluttering the repo root of scattered build files. The published site, all URLs, redirects, and skill behavior are unchanged.

This is a relocation refactor. It preserves behavior. It does not re-architect the content pipeline.

## Current state

The repository root *is* the Astro project. There is no `outDir`/`srcDir`/`publicDir`/`root` override in `astro.config.mjs`, so Astro resolves all defaults against the repo root:

```
pm-skills/                    (repo root == Astro project root)
├── astro.config.mjs          # site + base + sidebar + redirects + mermaid
├── package.json              # name "pm-skills-docs"; build script
├── package-lock.json
├── tsconfig.json             # extends astro/tsconfigs/strict
├── src/
│   ├── content.config.ts     # custom glob loader, base: '.'
│   └── styles/custom.css
├── public/                   # favicon.svg, mermaid-style-guide.html
├── dist/                     # Astro output (gitignored)  [also: release ZIPs]
├── .astro/                   # cache (gitignored)
├── node_modules/             # (gitignored)
├── docs/                     # CONTENT (mounted in place by the loader)
├── library/skill-output-samples/   # sample CONTENT (also mounted)
├── scripts/                  # generators + post-build helpers
└── site/                     # STALE MkDocs fossil (gitignored, untracked, dead)
```

Two facts drive the whole design:

1. **`site/` is currently a trap.** `.gitignore:7-8` ignores `site/` with the comment `# MkDocs build output`. The directory on disk holds a stale pre-Starlight MkDocs render (`index.html`, `404.html`, `bundles/`, `tags.json`, dated May 6). `git ls-files site/` returns zero tracked files; the only reference to it anywhere is the `.gitignore` rule itself. The moment the Astro project moves into `site/`, that one ignore rule would silently exclude the entire new source tree.

2. **The content loader mounts root `docs/` and `library/` in place.** `src/content.config.ts` uses a custom `glob()` loader with `base: '.'` (the Astro project root == repo root), patterns `docs/**/*.{md,mdx}` and `library/skill-output-samples/**/sample_*.md`. `entry.filePath` retains the `docs/` / `library/` prefix; `generateId` strips it only for the slug. Every `autogenerate: { directory: 'docs/<section>' }` entry in `astro.config.mjs` (and the one `library/skill-output-samples` entry) matches against that retained prefix. This in-place mount is the deliberate D2-Option-B decision: contributors edit `docs/` directly, the four generators write into `docs/`, and `editLink` maps each `filePath` to a real GitHub source path.

## Target state

The Astro toolchain moves into `site/`; content stays at the repo root, mounted by the same loader with its base pointed one level up.

```
pm-skills/                    (repo root, decluttered)
├── docs/                     # CONTENT stays at root - UNCHANGED
├── library/                  # sample CONTENT stays at root - UNCHANGED
├── scripts/                  # generators + post-build stay at root - UNCHANGED location
├── skills/ commands/ agents/ ...   # repo core - UNCHANGED
└── site/                     # Astro project (new home)
    ├── astro.config.mjs      # moved; content byte-identical
    ├── package.json          # moved; build script: scripts/ -> ../scripts/
    ├── package-lock.json     # moved
    ├── tsconfig.json         # moved; content byte-identical
    ├── .gitignore            # NEW: dist/ .astro/ node_modules/
    ├── public/               # moved
    ├── dist/                 # Astro output (gitignored)
    └── src/
        ├── content.config.ts # moved; ONE edit: base '.' -> '..'
        └── styles/custom.css # moved; byte-identical
```

This matches the siblings at the directory level: root is clean of Astro tooling, the Astro project lives under `site/`, and a root `docs/` is retained (the siblings keep a root `docs/` as well). It diverges from the siblings only in the internal loader mechanism (pm-skills keeps its custom glob mount; the siblings use the stock `docsLoader()` with content physically inside `site/src/content/docs/`). That divergence is intentional and contained (see Decisions D2 and Out of Scope).

## Decisions (locked)

| ID | Decision | Rationale |
|----|----------|-----------|
| D1 | Move only the Astro toolchain into `site/`; keep `docs/` and `library/` at the repo root. | Smallest blast radius; preserves the deliberate in-place mount, the four generators, `editLink` correctness, and GitHub directory browsability. Fully satisfies both stated goals (leverage `/site` + declutter). |
| D2 | Keep the custom glob loader; do NOT adopt the stock `docsLoader()` or relocate content into `site/src/content/docs/`. | The stock-loader swap is a separate architectural concern. Bundling it would reverse D2-Option-B, repoint four generators, rework `editLink`, and move GitHub landing READMEs. Decide it on its own merits later (Out of Scope). |
| D3 | `scripts/` stays at the repo root; the four Python generators are untouched. | They anchor on `Path(__file__).resolve().parent.parent` (== repo root) and read/write root `docs/`, `skills/`, `library/`, `_workflows/`. With content staying at root, they need zero change. The build script's call to the post-build helper changes to `../scripts/...`. |
| D4 | Ship as untagged maintenance on `main`; no version tag, no `Release_*.md`. | No consumer-facing surface changes (skills, manifests, published URLs all identical). Records as a `## [Unreleased]` CHANGELOG append. (If any externally consumed path moved this would escalate to a release; none does.) |
| D5 | Move `tsconfig.json` and `package-lock.json` into `site/` along with `package.json`/`src/`/`public/`. | npm resolves the lockfile next to `package.json`; tsconfig `include: ['.astro/types.d.ts', '**/*']` and `exclude: ['dist']` must sit at the Astro root to resolve correctly. |
| D6 | Doc sweep updates living references only; historical records are preserved as written. | Repo policy, `CHANGELOG.md:8`: pre-v2.19.0 references "are preserved as written for historical accuracy." A dated record is testimony about a moment; you append a new record, you do not rewrite the old one. |

## Change set

### 0. Pre-step: evict the fossil, then untrap `site/`

Order matters. Delete the untracked fossil first, then edit `.gitignore`, so `git status` does not flood with newly-unignored fossil files.

1. Delete `site/` from disk (untracked, 0 tracked files, unreferenced; safe per `git ls-files site/` == empty).
2. `.gitignore`: remove the blanket `site/` rule and its `# MkDocs build output` comment (lines 7-8). Add an explicit, intent-revealing block scoping the ignores to build artifacts under `site/`:
   ```gitignore
   # Astro Starlight build (project lives in site/). Source under site/ is tracked;
   # only build output and caches are ignored. The dist/ .astro/ node_modules/ rules
   # below are depth-agnostic and already match site/dist, site/.astro, site/node_modules;
   # these explicit entries make the intent unambiguous.
   site/dist/
   site/.astro/
   site/node_modules/
   ```
   Keep the existing depth-agnostic `dist/`, `.astro/`, `node_modules/` rules (they still cover the root `dist/` used by release ZIPs and double-cover the `site/` artifacts).

### 1. Moves (`git mv`, history-preserving)

| From (repo root) | To |
|---|---|
| `astro.config.mjs` | `site/astro.config.mjs` |
| `package.json` | `site/package.json` |
| `package-lock.json` | `site/package-lock.json` |
| `tsconfig.json` | `site/tsconfig.json` |
| `src/` (tree) | `site/src/` |
| `public/` (tree) | `site/public/` |

`dist/`, `.astro/`, `node_modules/` are not moved; they regenerate at the new root via `npm ci` + `npm run build` from `site/`.

After the move the repo root has no `package.json`. That is expected (the only `package.json` was the docs project's).

### 2. Code edits (3 files)

**2a. `site/src/content.config.ts` - the one substantive code change.**

```diff
       ],
-      base: '.',
+      base: '..',
       // W7: strip path prefixes so slugs are clean.
```

`base` is resolved relative to the Astro project root, which is now `site/`; `..` points back at the repo root so the patterns `docs/**` and `library/skill-output-samples/**` resolve exactly as before. `entry` passed to `generateId` is the path relative to `base` (`docs/foo/bar.md`), unchanged by the base flip, so `generateId` and every `autogenerate: { directory: 'docs/...' }` entry in `astro.config.mjs` stay byte-identical. No other line in this file changes.

**2b. `site/package.json` - build script path.**

```diff
-    "build": "astro build && node scripts/post-build-strip-md-links.mjs",
+    "build": "astro build && node ../scripts/post-build-strip-md-links.mjs",
```

`npm run build` now runs with CWD = `site/`; `scripts/` stays at the repo root, so the helper is reached at `../scripts/`. The other scripts (`dev`, `start`, `preview`, `astro`) are bare `astro ...` and need no change.

**2c. `scripts/post-build-strip-md-links.mjs` - CWD-independent anchoring.**

The helper currently derives both its output dir and its repo-source root from the process CWD:

```js
const DIST = path.resolve('dist');   // line 44
const REPO = path.resolve('.');      // line 45
```

Run from `site/` (as `npm run build` now does, including inside `deploy-pages.yml`), `DIST` would resolve to `site/dist` (correct) but `REPO` to `site/` (wrong - the pass-3 reverse-map needs `docs/`, `skills/`, `_workflows/`, `library/` as siblings of the *repo root*, one level up). Anchor both to the script's own location instead, making the helper correct regardless of CWD:

```diff
 import fs from 'node:fs';
 import path from 'node:path';
+import { fileURLToPath } from 'node:url';

-const DIST = path.resolve('dist');
-const REPO = path.resolve('.');
+// Anchor to this script's directory (scripts/ at the repo root) so paths are
+// correct regardless of CWD. The build runs from site/ (npm run build), so a
+// CWD-relative '.' would resolve to site/ and break the pass-3 reverse-map to
+// repo source dirs (docs/, skills/, _workflows/, library/). Astro's outDir is
+// site/dist.
+const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
+const DIST = path.resolve(REPO, 'site', 'dist');
```

`BASE` and `GH` constants (lines 46-47) are unaffected. During implementation, grep the rest of the file for any other CWD-relative `path.resolve('...')` / relative `fs` read and confirm there are none beyond these two (initial read and Codex review confirm none). Also update the stale failure message `dist/ not found; run npm run build first` (around lines 228-230) to reference `site/dist`.

### 3. CI edits (3 workflows)

**3a. `.github/workflows/deploy-pages.yml`** (Pages-from-Actions; the deploy lane).

Add a job-level default so the two `run:` steps execute in `site/` (the `uses:` steps - checkout, setup-node, upload-pages-artifact - are unaffected by `working-directory`):

```diff
   build:
     runs-on: ubuntu-latest
+    defaults:
+      run:
+        working-directory: site
     steps:
```

Change the artifact path (repo-root-relative, *not* working-directory-relative, so it must be set explicitly):

```diff
       - name: Upload Pages artifact
         uses: actions/upload-pages-artifact@v5
         with:
-          path: ./dist
+          path: ./site/dist
```

**3b. `.github/workflows/validation.yml`** (matrix: ubuntu + windows). Do NOT set a job-level working-directory here - most steps run root-anchored `scripts/*.{sh,ps1}` validators. Scope only the two npm steps to `site/`, and repoint the four `dist`-referencing steps to `site/dist`.

- `Install dependencies` (`npm ci`, the early step near line 28): add `working-directory: site`.
- `Build site with Astro Starlight (enforcing)` (line 286-288): add `working-directory: site`.
- Internal-leak check, bash (line 293): `find dist/ -path '*internal*'` -> `find site/dist/ -path '*internal*'`.
- Internal-leak check, pwsh (line 304): `Get-ChildItem -Path dist` -> `Get-ChildItem -Path site/dist`.
- Edit-link check (line 314): `node scripts/verify-edit-links.mjs dist .` -> `node scripts/verify-edit-links.mjs site/dist .` (the second arg `.` stays the repo root, which is correct because this step runs from the repo root; the script resolves source filePaths against it).
- Rendered-link check (line 318): `node scripts/check-rendered-links.mjs dist` -> `node scripts/check-rendered-links.mjs site/dist`.

The link-check scripts use only Node built-ins (no deps), so running them from the repo root without a root `node_modules` is fine.

**3c. `.github/workflows/validate-plugin.yml`** (path-filtered PR/push). Its `npm ci` (near line 46) feeds only an inline manifest-shape check, not an Astro build. After the move the repo root has no `package.json`, so either add `working-directory: site` to that `npm ci` or drop it if the manifest check does not actually need `node_modules`. Confirm which during implementation; default to `working-directory: site`. The `paths:` filters reference no Astro paths, so no trigger edit is required.

**3d. `.github/dependabot.yml`** (Codex finding F4). Today it tracks two ecosystems: `github-actions` at `/` and `npm` at `/.github/scripts` (lines 14-16). The docs package (`package.json`) is *not* Dependabot-tracked at all today - a pre-existing gap, not one the move creates. The move is the natural moment to close it: add an `npm` update block for `directory: "/site"` so the relocated docs dependencies (`astro`, `@astrojs/starlight`, `astro-mermaid`, `sharp`) get security/update PRs. Mirror the existing npm block's schedule/labels/commit-prefix.

**Untouched workflows:** `release.yml` / `release-zips.yml` (their `dist/` is the skills/commands ZIP output from `build-release.sh`, `OUT=$ROOT/dist`, independent of Astro `dist/` and not colliding with `site/dist`); `codeql.yml` (monitor `autobuild` once after the move). No `cache:` keys exist anywhere, so there is no `cache-dependency-path` to update; if npm caching is added later, point it at `site/package-lock.json`.

### 4. Doc-reference sweep

**Update (living references):**

| File | Edit |
|---|---|
| `CONTRIBUTING.md` | Workaround entries: `astro.config.mjs` -> `site/astro.config.mjs`; `scripts/post-build-strip-md-links.mjs` path note (run dir now `site/`); `src/content.config.ts` -> `site/src/content.config.ts`. |
| `docs/contributing/ci-overview.md` | `npm run build` now runs from `site/`; note the deploy artifact is `site/dist`. |
| `docs/contributing/release-runbook.md` | Build/preview commands: `cd site && npm run build` (or note the working dir). |
| `docs/reference/mermaid-style-guide.md` | `astro.config.mjs` -> `site/astro.config.mjs`; `src/styles/custom.css` -> `site/src/styles/custom.css`. (Source doc; regenerate any generated copy.) |
| `_agent-context/claude/CONTEXT.md` | Mermaid notes: `astro.config.mjs` / `src/styles/custom.css` -> `site/...`. |
| `agents/pm-skill-auditor.md` | CI-gate description mentioning `npm run build` -> note `site/` working dir. |
| `scripts/check-internal-link-validity.{sh,ps1}`, `scripts/validate-docs-frontmatter.{sh,ps1}`, `scripts/check-no-body-h1.{sh,ps1}` | Mirror comments citing `src/content.config.ts` as the exclude-pattern source of truth -> `site/src/content.config.ts`. |
| `scripts/verify-edit-links.mjs` (Codex finding F6) | Header comment (lines 10-16) "custom glob loader (`src/content.config.ts`, base: '.')" -> `site/src/content.config.ts`, base `'..'`; usage/defaults (19-23) and exit-code text (31) `dist` -> `site/dist`; failure guidance (~92-95) `astro.config.mjs` / `src/content.config.ts` -> `site/...`. Optional: change the default `distDir` arg (line 50, `?? 'dist'`) to `'site/dist'` for correct bare local runs (CI passes the arg explicitly). |
| `scripts/check-rendered-links.mjs` | Mirror check: update its default `dist` arg and any `dist/ not found` error text to `site/dist` for bare local runs (CI passes the arg explicitly). |
| `skills/utility-update-pm-skills/SKILL.md`, `skills/utility-update-pm-skills/references/TEMPLATE.md` | `npm run build` step -> `cd site && npm run build` (or working-dir note). This is the skill SOURCE; regenerate its docs page (next row) rather than hand-editing the generated copy. |

**Regenerate (generated docs), do not hand-edit:** `docs/skills/utility/utility-update-pm-skills.md` (from `generate-skill-pages.py`) and `docs/changelog.md` (if generated from `CHANGELOG.md`). Run the generators after editing sources; commit the regenerated output.

**Append (the one allowed CHANGELOG edit):** add under the existing `## [Unreleased]` heading (`CHANGELOG.md:10`):

```markdown
## [Unreleased]

### Changed

- Astro Starlight project relocated from the repository root into `site/` to match
  the product-on-purpose family layout. No published URL changes; build and deploy
  paths updated (`dist/` -> `site/dist/`). Internal build reorg; no skill behavior change.
```

**Preserve as written (historical records, do NOT edit):** `CHANGELOG.md` version entries, `docs/releases/Release_*.md`, `docs/internal/release-plans/v2.14.0/**`, `v2.16.0/**`, archived plans and audits. Per D6 / `CHANGELOG.md:8`.

**Verify-no-edit-needed:** `README.md`, `AGENTS.md` (they reference the published URL and skill counts, not the build path; confirm during sweep).

## What explicitly does NOT change

- **Published URLs: zero change.** They are a pure function of `site` + `base` + content slugs, none of which depend on disk location. Proven in research stream F.
- `site: 'https://product-on-purpose.github.io'` and `base: '/pm-skills'` (literal strings).
- The 12 in-Astro `redirects` (URL -> URL, layout-independent). The move requires no new redirects.
- The auto-injected sitemap and `404.html` (derive from `site` + `base`).
- `customCss: ['./src/styles/custom.css']` (relative to the moved config; `src/` moves with it).
- All `autogenerate: { directory: 'docs/...' }` entries and the `library/skill-output-samples` entry (filePaths keep their prefix).
- The four Python generators (`generate-skill-pages.py`, `generate-showcase.py`, `generate-workflow-pages.py`, `build-skill-catalog.py`) and `editLink` resolution.
- Skills, commands, agents, manifests (`.claude-plugin/`, `.codex-plugin/`), and every external install surface.

## Verification: parity, not just green CI

The correctness proof is that the published site is byte-equivalent before and after. The whole point is that nothing user-facing changes.

1. **Baseline (before any change):** `npm run build` from root; capture a sorted per-file hash manifest of `dist/`:
   - bash: `(cd dist && find . -type f -exec sha256sum {} \; | sed 's# \./# #' | sort) > /tmp/dist-baseline.txt`
   - pwsh: `Get-ChildItem dist -Recurse -File | Sort-Object FullName | ForEach-Object { "{0}  {1}" -f (Get-FileHash $_ -Algorithm SHA256).Hash, ($_.FullName.Substring((Resolve-Path dist).Path.Length)) }`
2. **Post-move:** `cd site && npm run build`; capture the same manifest of `site/dist/`.
3. **Compare (layered, per Codex F7):** the sha256 manifest is necessary but not sufficient on its own, because content-hashed asset filenames could in principle add noise. Codex inspected the current output and found no nondeterministic build markers (`dist/sitemap-0.xml`, `dist/sitemap-index.xml` carry only URL entries; `dist/pagefind/pagefind-entry.json` records content hashes + `page_count`), so a clean hash diff is expected. Verify three layers so a noisy asset diff can never mask a real regression:
   - **Route set:** the sorted list of HTML page paths (`find <dist> -name '*.html' | sort`) must be identical (this is the true "did any page appear/disappear" check, immune to asset-hash noise).
   - **Route count:** equal page count (also cross-checked against `pagefind-entry.json`'s `page_count`).
   - **Edit-link targets:** the set of `editLink` hrefs extracted from the HTML must be identical before/after (proves the loader-base flip preserved filePath -> GitHub-source mapping).
   - **Full manifest:** sha256 of every file; investigate and explain every diff (expected: zero).
   Acceptance = identical route set + route count + edit-link target set, and zero unexplained manifest diffs.
4. **Link + leak gates:** `verify-edit-links.mjs site/dist .` and `check-rendered-links.mjs site/dist` pass; no `internal/` path leaks into `site/dist`.
5. **CI:** `validation.yml` green on ubuntu + windows; `deploy-pages.yml` green.
6. **Live spot-check (post-deploy):** homepage, one skill page, one redirect (e.g. `/pm-skills/bundles/` -> `/pm-skills/workflows/`), `/pm-skills/mermaid-style-guide.html`, and a 404 path all resolve as before.

## Risks

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|------------|--------|------------|
| R1 | `.gitignore` `site/` rule left in place silently un-tracks the new source tree. | Med | High | Pre-step 0 removes it before the move; verify `git status` shows `site/astro.config.mjs` etc. as tracked additions. |
| R2 | Loader `base` not flipped (or flipped wrong) -> empty site (build "succeeds" with no content pages). | Low | High | Parity manifest catches an empty/short `dist` immediately; add a page-count assertion (post-move page count == baseline). |
| R3 | Post-build helper run from `site/` mis-resolves repo source -> pass-3 links silently left broken. | Med | Med | Edit 2c anchors to script dir; `check-rendered-links.mjs` gate on `site/dist` catches residual broken links. |
| R4 | `working-directory` missed on a CI step, or artifact path left `./dist` -> deploy publishes an empty/old artifact. | Med | High | Edits 3a/3b enumerated to the line; `deploy-pages.yml` parity check on the artifact contents; live spot-check. |
| R5 | A generated doc hand-edited instead of regenerated -> drift / generator overwrites the edit next run. | Low | Med | Sweep table marks generated docs explicitly; regenerate + commit, never hand-edit. |
| R6 | `validate-plugin.yml` `npm ci` fails (no root `package.json`). | Med | Low | Edit 3c adds `working-directory: site` or removes the unneeded `npm ci`. |

## Acceptance criteria

- [ ] Stale `site/` fossil deleted; `.gitignore` `site/` blanket removed; explicit `site/dist/`, `site/.astro/`, `site/node_modules/` ignores added.
- [ ] `astro.config.mjs`, `package.json`, `package-lock.json`, `tsconfig.json`, `src/`, `public/` moved into `site/` via `git mv` (history preserved); repo root clean of Astro tooling.
- [ ] `site/src/content.config.ts` `base: '..'`; `site/package.json` build script uses `../scripts/...`; `scripts/post-build-strip-md-links.mjs` anchored to script dir (incl. updated error text).
- [ ] `deploy-pages.yml`, `validation.yml`, `validate-plugin.yml` updated per edits 3a-3c; `.github/dependabot.yml` gains a `/site` npm block (3d).
- [ ] Parity: identical route set + route count + edit-link target set; zero unexplained manifest diffs (`site/dist` vs the pre-move `dist` baseline).
- [ ] `validation.yml` green on ubuntu + windows; `deploy-pages.yml` green; live spot-check passes.
- [ ] Living docs swept (incl. `scripts/verify-edit-links.mjs` + `check-rendered-links.mjs` comments/defaults); generated docs regenerated; `## [Unreleased]` CHANGELOG entry added; historical records untouched.
- [ ] `README.md` / `AGENTS.md` confirmed to need no path edits.

## Out of scope (even at revival)

- **Option A's in-place glob mount as the end-state.** Superseded: the revival target is option B (generator into `site/src/content/docs/` + stock `docsLoader()`), per the deferral note above. The option-A loader mechanics below are kept only as reference.
- Any change to `site`/`base`, the redirect map, or skill content.
- Converting `writing-style-library` (the family's other un-converted plugin) - separate repo, separate change.

## Cross-references

- `plan_site-relocation.md` (this folder) - the change plan and phasing (also DEFERRED).
- Implementation plan - NOT yet written; to be authored at revival, against the option-B target and the then-current preset/generator contract.
- Active P1 track (extracted from this relocation): `docs/internal/release-plans/_unreleased/astro-site-p1-conformance/`.
- Family standard: `agent-plugins/_LOCAL/astro-site-standards.md` (draft, 2026-06-01) - clauses 14.1 (site location), 14.7 (base single-source), 11 (roadmap sequencing).
- Research basis: 7-stream blast-radius study (session, 2026-06-01), with the writing-style-library "converted precedent" claim corrected to a fabrication during verification.
- Adversarial review: Codex (2026-06-01) verified loader-base, CI edits, gitignore, and ordering against the repo, and surfaced findings F4 (dependabot `/site` block), F6 (`verify-edit-links.mjs` comments), the post-build error-text refresh, and F7 (layered parity), all folded in above.
- Family reference layouts: `agent-skills-toolkit/site/`, `thinking-framework-skills/site/` (stock `docsLoader`, content inside `site/`).
- Repo policy: `CHANGELOG.md:8` (historical-record preservation); `docs/internal/skill-versioning.md` (repo-release bump table).
