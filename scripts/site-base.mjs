// site-base.mjs - the single source of truth for the published base path.
//
// The site is served at https://product-on-purpose.github.io/pm-skills, so the
// GitHub Pages project subpath is `/pm-skills`. The family Astro site standard
// (14.7) requires this base to be declared ONCE: a wrong base that disagrees
// between the build and a validator passes the check while the live site 404s.
//
// Consumers:
//   - site/astro.config.mjs  -> `base` and the remark link resolver's `{ base }`.
//   - scripts/check-rendered-links.mjs -> the default base its core resolves against
//     (passed as a parameter so a wrong base can be exercised by a test).
//
// When the shared @product-on-purpose/astro-docs-preset lands (decision A-2),
// `base` moves into the preset call and this module is retired; until then it is
// the one place the literal lives.
export const BASE = '/pm-skills';
