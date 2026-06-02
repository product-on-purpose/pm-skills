# Change Plan: Astro Starlight `/site` relocation (DEFERRED)

**Status:** REVIVED and EXECUTED as option B (Pattern S) on 2026-06-02. The reusable move / gitignore / CI / parity scaffolding below was applied; the option-A loader mechanics (custom glob loader, `base: '..'`, Python generators, post-build rewriter) were replaced by the stock `docsLoader()`, one Node generator (`scripts/gen-site.mjs`), and a remark link resolver (`scripts/remark-resolve-links.mjs`). Route parity verified: 386 routes, zero changed.
**Owner:** Maintainers
**Type:** Internal build reorg. **No version bump.** When revived, untagged maintenance on `main` (squash-merge PR).
**Theme:** Move the Astro Starlight project into `site/` for family consistency and a decluttered root.
**Created:** 2026-06-01
**Updated:** 2026-06-01

> **Deferred per decision C (2026-06-01).** The family Astro site standard (clause 11) sequences this relocation last, to land with the generator-port + shared-preset convergence; the revival target is option B (generator into `site/src/content/docs/`, stock loader), not the option-A mechanics this plan was first drafted against. The four P1 standard wins were extracted to the active track at `_unreleased/astro-site-p1-conformance/`. The phasing below is preserved as the reusable relocation core (move / CI / gitignore / parity are target-agnostic).

## Where we are

pm-skills is the only un-converted plugin in the product-on-purpose family: its Astro project (`astro.config.mjs`, `package.json`, `src/`, `public/`, `tsconfig.json`, `dist/`, `.astro/`) sits at the repo root, scattered among `skills/`, `commands/`, `agents/`, `docs/`, `library/`. The converted siblings (`agent-skills-toolkit`, `thinking-framework-skills`) keep their whole Astro project under `site/`. This change moves pm-skills to that directory layout while keeping its deliberate in-place content mount.

The work is rename-heavy and logic-light: about six `git mv` operations and three small code edits. The risk is not the edits, it is the invisible couplings (a `.gitignore` trap, a CWD-relative post-build helper, the deploy artifact path), each pinned to a file and line in the spec.

Companion docs:
- `spec_site-relocation.md` - target layout, every edit with before/after, the parity contract, and the deferral/target-reframe note.
- Implementation plan - not yet written; authored at revival against the option-B target.

## Entrance criteria (HARD gate)

1. Decision A confirmed: move toolchain into `site/`, keep `docs/` at root (custom glob loader). SATISFIED.
2. Release vehicle confirmed: untagged maintenance on `main`, no tag. SATISFIED.
3. Stale `site/` fossil confirmed untracked and unreferenced (`git ls-files site/` == empty). SATISFIED.
4. Adversarial review of this plan + spec completed and findings resolved. SATISFIED (Codex, 2026-06-01: loader-base, CI edits, gitignore, and ordering verified correct against the repo; 6 actionable findings folded into the spec - dependabot `/site` block, `verify-edit-links.mjs` sweep, post-build error-text refresh, layered parity).

## Scope - the work items

| ID | Item | Files | Model tier |
|----|------|-------|-----------|
| W1 | Evict fossil + untrap `site/` in `.gitignore` | `site/` (disk), `.gitignore` | Haiku (delete) + Sonnet (gitignore) |
| W2 | `git mv` the Astro toolchain into `site/` | `astro.config.mjs`, `package.json`, `package-lock.json`, `tsconfig.json`, `src/`, `public/` | Haiku (mechanical renames) |
| W3 | Code edits | `site/src/content.config.ts`, `site/package.json`, `scripts/post-build-strip-md-links.mjs` | Opus/Sonnet (judgment) |
| W4 | CI edits | `deploy-pages.yml`, `validation.yml`, `validate-plugin.yml`, `.github/dependabot.yml` (`/site` npm block) | Sonnet |
| W5 | Doc-reference sweep (incl. `verify-edit-links.mjs` + `check-rendered-links.mjs` comments/defaults) + CHANGELOG append + generated-doc regen | living docs (spec table), `CHANGELOG.md` | Sonnet |
| W6 | Parity verification + CI + live spot-check | (no source; build + compare) | Opus/Sonnet (judgment) |

Per your request, the purely mechanical renames in W2 (and the fossil delete in W1) are dispatched to **Haiku** subagents; the loader edit, post-build fix, and parity verification (W3, W6) stay on a higher tier where correctness judgment matters.

## Phases

### Phase 1: Baseline + unblock (W1)
**Goal:** Capture the pre-move build manifest, then make `site/` trackable.
- Build at root; save the sorted per-file hash manifest of `dist/` (the parity baseline) and the page count.
- Delete the stale `site/` fossil from disk.
- Edit `.gitignore`: remove the blanket `site/` rule; add explicit `site/dist/`, `site/.astro/`, `site/node_modules/`.
- **Done when:** baseline manifest saved; `git status` shows no fossil noise; `site/` no longer ignored.

### Phase 2: Move (W2)
**Goal:** Relocate the toolchain with history preserved.
- `git mv` `astro.config.mjs`, `package.json`, `package-lock.json`, `tsconfig.json`, `src/`, `public/` into `site/`.
- **Done when:** repo root is clean of Astro tooling; `git status` shows renames (not delete+add).

### Phase 3: Rewire (W3)
**Goal:** Make the relocated project build correctly from `site/`.
- `site/src/content.config.ts`: `base: '.'` -> `base: '..'`.
- `site/package.json`: build script `scripts/...` -> `../scripts/...`.
- `scripts/post-build-strip-md-links.mjs`: anchor `REPO`/`DIST` to the script dir (CWD-independent).
- **Done when:** `cd site && npm ci && npm run build` succeeds locally.

### Phase 4: Parity gate (W6, first pass)
**Goal:** Prove the build is byte-equivalent before touching CI.
- Capture the `site/dist` manifest; compare route set, route count, and edit-link target set against the Phase 1 baseline (per spec parity layers); then diff the full sha256 manifest.
- Run `verify-edit-links.mjs site/dist .` and `check-rendered-links.mjs site/dist` locally.
- **Done when:** identical route set + count + edit-link targets; zero unexplained manifest diffs; link/leak checks pass. (Gate: do not proceed if parity fails.)

### Phase 5: CI (W4)
**Goal:** Update the deploy and validation lanes.
- `deploy-pages.yml`: job-level `working-directory: site`; artifact `./dist` -> `./site/dist`.
- `validation.yml`: `working-directory: site` on the two npm steps; `dist` -> `site/dist` in the four check steps.
- `validate-plugin.yml`: `working-directory: site` on `npm ci` (or remove if unneeded).
- `.github/dependabot.yml`: add an `npm` block for `directory: "/site"` (closes a pre-existing gap; docs deps were untracked).
- **Done when:** edits match spec 3a-3d.

### Phase 6: Docs (W5)
**Goal:** Bring living references to current truth; leave history intact.
- Update the living docs in the spec sweep table; update skill sources, then regenerate generated docs.
- Append the `## [Unreleased]` CHANGELOG entry.
- **Done when:** living refs updated; generated docs regenerated; no historical record edited; `README`/`AGENTS` confirmed clean.

### Phase 7: Ship + verify (W6, final)
**Goal:** Land and confirm.
- Squash-merge PR to `main` (linear history). Confirm `validation.yml` green on ubuntu + windows and `deploy-pages.yml` green.
- Live spot-check: homepage, a skill page, a redirect, `mermaid-style-guide.html`, a 404.
- **Done when:** CI green; live site byte-equivalent to before; plan flipped to SHIPPED; `_agent-context/claude/CONTEXT.md` note added.

## Exit criteria (definition of done)

1. Repo root decluttered; Astro project under `site/`; `git mv` history preserved.
2. `cd site && npm run build` produces `site/dist` byte-equivalent to the pre-move baseline (zero unexplained diffs).
3. `validation.yml` (ubuntu + windows) and `deploy-pages.yml` green.
4. Published site verified unchanged (URLs, redirects, mermaid guide, 404) by live spot-check.
5. Living docs swept, generated docs regenerated, `## [Unreleased]` entry added, historical records untouched.
6. Merged to `main`; plan flipped to SHIPPED; CONTEXT.md note added. No tag (per D4).

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| `.gitignore` `site/` rule un-tracks the new tree | Med | High | Phase 1 removes it before the move; verify tracked status. Rollback: revert PR. |
| Loader `base` wrong -> empty site builds "successfully" | Low | High | Phase 4 parity gate + page-count assertion before CI. |
| CI step missed -> deploy publishes empty/old artifact | Med | High | Edits enumerated to the line; artifact-content check + live spot-check. |
| Generated doc hand-edited -> drift | Low | Med | Sweep marks generated docs; regenerate, never hand-edit. |

## Scope / YAGNI cuts

- No stock-loader swap (option B): content stays at root; the `docsLoader` migration is a separate future change.
- No version tag, no `Release_*.md`, no marketplace re-pin: nothing consumer-facing moves.
- No `site`/`base`/redirect/sidebar changes.
- No `writing-style-library` conversion (separate repo).
- No new CI caching (none exists today; out of scope to add).

## Residual open items (tracked, not blockers)

1. Confirm whether `validate-plugin.yml` needs `npm ci` at all (manifest check may not require `node_modules`).
2. Confirm `docs/changelog.md` is generator output (regenerate) vs hand-maintained (sweep).
3. One-time post-move watch on `codeql.yml` `autobuild` (resolves the relocated `package.json`).

## Cross-references

- `spec_site-restructure.md` - technical spec.
- `implementation-plan.md` - execution steps.
- `CHANGELOG.md:8`, `docs/internal/skill-versioning.md` - record-keeping and versioning policy.
