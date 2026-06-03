# Astro Starlight site - family standard conformance (spec)

**Status:** Implemented on branch `chore/astro-site-14-conformance` (2026-06-02); PR pending maintainer review.
**Type:** Internal conformance hardening. No skill behavior change, no rendered-site output change beyond the brand accent and a new `robots.txt`. Untagged maintenance on `main` (squash-merge PR); records as a `## [Unreleased]` CHANGELOG append.
**Contract:** family Astro site standard, clauses 14.1-14.11, at
`agent-plugins/standards/domains/astro-sites/SITE-STANDARD.md` (PROPOSED Section 14).
**Source packet (scorecard + corrections):**
`agent-plugins/standards/domains/astro-sites/rollout/pm-skills.md`.

## Why this exists

pm-skills is the family **reference implementation** and the donor of the four
build-aware validators. The 2026-06-02 conformance audit (repo `main` @ `1eea16f`)
rated it closest to the standard with one P1 and three P2 gaps remaining. This is
conformance hardening, not a greenfield install.

The P1 is a **regression**, not a fresh gap: the interim `scripts/site-base.mjs`
single-source was created and then deleted during the Pattern S convergence (see
`_unreleased/astro-site-p1-conformance/`, marked ABSORBED), which re-duplicated the
base literal into `scripts/check-rendered-links.mjs`. This packet re-lands the
single source in its durable, parameterized form.

## Conformance target (the clauses this repo must satisfy)

| Clause | Requirement | Gap addressed |
|---|---|---|
| **14.7** Base path single source | `base` declared once; MUST NOT be hardcoded in validators. Where a validator needs the base it MUST import from one source, not redeclare a literal. | P1: `astro.config.mjs:10` and `check-rendered-links.mjs:28` each declared `const BASE='/pm-skills'`. |
| **14.9** Search + SEO | SHOULD ship `public/robots.txt` pointing at the sitemap. | P2: `robots.txt` absent (only family site without it). |
| Branding (14.x / A-2) | Standardize on accent `#5C7CFA`. | P2: site set no `--sl-color-accent` (used the Starlight default). |
| **14.8** Versions + Node | Pin one shared resolved set so versions match family-wide; CI reads the Node pin via `node-version-file`, not a literal. | P2: Astro resolved `6.3.3` (family `6.4.2`); `create-issues-from-drafts.yml` hardcoded Node `22.12`. |

Clauses 14.1-14.6, 14.10, 14.11 were already PASS (the scorecard's evidence was
re-verified against live source before any edit).

## Acceptance criteria (done = all true)

- [x] The base path literal appears as a code value only in `scripts/site-base.mjs`.
  Out of scope: the one explicit value-pin assertion in
  `scripts/check-rendered-links.test.mjs`, the `robots.txt` sitemap URL, and the
  GitHub repo-URL / slash-command literals (14.7 governs the Pages `base` value, and
  the test pin guards that single source).
- [x] A deliberately wrong base makes the rendered-link check FAIL - proven by
  `scripts/check-rendered-links.test.mjs` (the core takes `base` as a parameter; a
  fixture is run with the correct base (PASS) and a wrong base (FAIL)).
- [x] `site/public/robots.txt` is served from `dist/` and points at
  `sitemap-index.xml`.
- [x] `cd site && npm run build` is green; route-parity (386-route baseline)
  unchanged; no tracked build output.
- [x] `--sl-color-accent` is `#5C7CFA` (present in the bundled CSS).
- [x] Astro resolves `6.4.2` family-wide via the committed lockfile.
- [ ] CI green on ubuntu + windows; PR prepared, not merged without maintainer
  confirmation. (Local equivalents all green; awaiting CI.)

## Out of scope

The shared `@product-on-purpose/astro-docs-preset` (decision A-2) that will
ultimately own the accent triplet, `og:image`, the `editLink` shape, and the
parameterized validators. The interim per-repo values here are written to be
absorbed by that preset later (the CSS and `site-base.mjs` comments say so).
`og:image` stays absent by design until the preset ships (14.9).
