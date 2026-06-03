# Astro Starlight site conformance - release plan

Owns the sequenced checklist for the conformance hardening specified in
[`spec.md`](spec.md). Ported from the source packet's section 4
(`agent-plugins/standards/domains/astro-sites/rollout/pm-skills.md`). Boxes are
ticked as each step lands and its acceptance check passes.

**Branch:** `chore/astro-site-14-conformance` | **Created/updated:** 2026-06-02

## Checklist

- [x] Create `docs/internal/release-plans/astro-starlight-conformance/spec.md` +
  `release-plan.md`; reconcile with the existing `_unreleased/astro-site-p1-conformance/`
  plan (folded in: that plan is ABSORBED/superseded; the base de-dup it delivered
  regressed when `site-base.mjs` was deleted in the Pattern S convergence and is
  re-landed here).
- [x] **P1** Add `scripts/site-base.mjs`; import `BASE` in `astro.config.mjs` and
  `check-rendered-links.mjs`; delete the duplicate literal.
- [x] **P1** Add a test that a wrong base fails the rendered-link check
  (`scripts/check-rendered-links.test.mjs`, 5 cases: value-pin, correct-base PASS,
  wrong-base FAIL, default-base PASS, empty-dist hard-fail); confirm the base path literal appears
  only in `site-base.mjs`. Wired into `validation.yml` so the test actually runs.
- [x] **P2** Add `site/public/robots.txt` (sitemap = `.../pm-skills/sitemap-index.xml`).
- [x] **P2** Set `--sl-color-accent: #5C7CFA` in `custom.css` (with per-mode low/high
  companions).
- [x] **P2** Bump Astro to resolve `6.4.2`; align the `create-issues-from-drafts.yml`
  Node pin to `node-version-file: .nvmrc`.
- [x] Run `cd site && npm run build`; confirm rendered-link, route-parity,
  verify-edit-links, and the unit test all green; `git ls-files` shows no build output.
- [ ] Open PR; CI green on ubuntu + windows; await maintainer review. (Not pushed
  without maintainer confirmation.)

## Verification log (local, 2026-06-02, on Astro 6.4.2)

| Gate | Result |
|---|---|
| `npm run build` (site) | green; 386 HTML files; `sitemap-index.xml` created |
| `check-route-parity.mjs` | PASS - 386 baseline = 386 current |
| `check-rendered-links.mjs` (`STRICT_ANCHORS=1`) | PASS - 386 pages, 0 broken links, 0 broken anchors |
| `verify-edit-links.mjs` | PASS - 358 editLink targets resolve |
| `node --test check-rendered-links.test.mjs` | 5 pass / 0 fail |
| `git status` | only the intended files (the code/config changes + the planning/CHANGELOG docs); no `dist`/`.astro`/generated content tracked |
| robots.txt in `dist/` | present, correct sitemap URL |
| accent `#5C7CFA` in bundled CSS | present |

## Files changed

- new `scripts/site-base.mjs` - the single base source.
- new `scripts/check-rendered-links.test.mjs` - the wrong-base-fails test.
- new `site/public/robots.txt`.
- `scripts/check-rendered-links.mjs` - core takes `base` parameter (default from
  the single source), guarded CLI entry; behavior preserved.
- `site/astro.config.mjs` - imports `BASE` from `site-base.mjs`.
- `site/src/styles/custom.css` - `#5C7CFA` accent triplet.
- `site/package.json` + `site/package-lock.json` - Astro lockfile-pinned `6.4.2` (package.json floor `^6.4.2`).
- `.github/workflows/create-issues-from-drafts.yml` - Node pin via `.nvmrc`.
- `.github/workflows/validation.yml` - runs the new unit test.

## Known follow-ups (not blockers)

- `npm install` reports 1 high-severity transitive vulnerability (`dompurify` 3.4.4,
  reached via `astro-mermaid` -> `mermaid`; pre-existing, identical in `main`'s
  lockfile, NOT introduced by the Astro bump). Out of scope for conformance; triage
  separately (an `npm audit fix` could churn unrelated deps).
- Family version drift watch: lockfile-pinned `6.4.2` to match the documented family
  set (CI uses `npm ci`, so the lockfile is authoritative). If the family has since
  converged on a newer 6.4.x, re-pin in lockstep (not per-repo).
- `site/package-lock.json` intentionally carries two `@astrojs/markdown-remark`
  copies (7.1.2 hoisted for Starlight/mdx, 7.2.0 nested under astro core). This is
  normal npm hoisting and is WHY anchor ids stay byte-stable across the bump; do NOT
  `npm dedupe` it without re-verifying `STRICT_ANCHORS=1` afterward.
- `site/public/robots.txt` embeds the base path literally (a static asset Astro
  cannot template). Until the shared preset generates it, treat robots.txt as a
  manual touchpoint on any base-path change.
- The interim accent + `site-base.mjs` are absorbed by the shared preset (A-2) when
  it lands; this is sequenced "pm-skills last" in the preset migration. The preset's
  `accent.css` can also address the light-mode link-text contrast (`#5C7CFA` on white
  ~3.67:1, inherent to the brand hue, no regression vs the Starlight default).
