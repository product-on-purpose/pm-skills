# Dependency Policy

**Cycle introduced:** v2.14.0
**Last updated:** 2026-05-10
**Scope:** Node toolchain pinning for the Astro Starlight documentation stack; accepted-CVE exemptions for the static-site build profile.

## Node engine

`engines.node: ">=22.0.0 <23"` is set in root `package.json`. The Node 22.x line is current LTS-track and matches the runner versions on GitHub Actions. The upper bound below `<23` is a deliberate cap below Astro 6's `>=22.12` requirement; the Astro 6 + Node 22.12+ bump is deferred to v2.15+ as a focused upgrade cycle (per Decision 11 in the v2.14 cycle plan).

## Astro stack pins

| Package | Version specifier | Float policy |
|---|---|---|
| `astro` | `~5.13.0` | Patch float (5.13.x). Minor or major bumps require a deliberate cycle update. |
| `@astrojs/starlight` | `~0.34.0` | Patch float (0.34.x). Minor or major bumps require a deliberate cycle update. |
| `astro-mermaid` | `~2.0.1` | Patch float (2.0.x). If maintenance halts, switch to `rehype-mermaid` per D4 fallback. |
| `sharp` | `^0.34.5` | Caret float over patch range (0.34.5+ to 0.x.y). Astro's image-optimization transitive; pinned explicitly against version drift. |

## Update cadence

- **Patch updates:** Absorbed implicitly when `package-lock.json` is regenerated. No CHANGELOG entry required unless a CVE is fixed.
- **Minor updates:** Tracked as a work item in the next release plan. Validated by full validation matrix (Ubuntu + Windows; all 22+ validators).
- **Major updates:** Cycle-scoped effort with explicit migration planning. v2.14 itself is the reference shape: spike, cycle plan, migration plan, Pre-Ship Validation Gates, Adversarial Review Loop.

## Rationale for tight pins

The tight pins reflect specific lessons:

- **Astro 6 hard-fail on Node 22.11.0** (v2.14 spike): Astro 6 publishes a hard `engines.node >=22.12.0` check and fails install at version-mismatch step. Pinning `astro ~5.13.0` prevents accidental jump.
- **`astro-mermaid` maintenance uncertainty** (D4 risk): patch-only float gives the cycle clean fallback room if the package goes unmaintained.
- **`sharp` transitive drift**: Astro's image pipeline relies on sharp-binary parity across platforms; explicit pinning stops surprise behavior on one runner that did not surface on another.

## Re-pinning workflow

When a maintainer wants to bump any line in this table:

1. Open a release plan (or amend the active one) with the bump as a tracked work item.
2. Run the full local build and validation matrix.
3. Document the bump rationale in the CHANGELOG under "Changed" (Keep a Changelog format).
4. Update this file's "Last updated" date and any affected version specifiers.

## Known accepted CVEs (static-site exemption)

pm-skills is built as a static site (SSG via Astro Starlight). It uses no SSR, no server islands, no middleware, and no Cloudflare adapter. The build artifact is plain HTML, JS, and CSS served by GitHub Pages. The following npm advisories on `astro ~5.13.0` (the v2.14 spike-validated pin per DM-4) are accepted as not-applicable to our runtime profile:

| Advisory | Severity | Fix range | Feature affected | Applies to pm-skills? |
|---|---|---|---|---|
| `GHSA-wrwg-2hg8-v723` | High (CVSS 7.1) | `>5.15.6` | Reflected XSS via server islands feature (SSR-only) | No - we do not enable server islands. |
| `GHSA-hr2q-hp5q-x767` | Moderate (CVSS 6.5) | `>=5.15.5` | URL manipulation via headers; middleware bypass (SSR-only) | No - we have no SSR middleware. |
| `GHSA-5ff5-9fcw-vg88` | Moderate (CVSS 6.5) | `>=5.14.3` | X-Forwarded-Host reflected without validation (SSR-only) | No - we have no SSR request handling. |
| Cloudflare adapter `_image` Stored XSS | (varies) | (varies) | Cloudflare adapter only | No - we do not use the Cloudflare adapter. |
| `GHSA-x3h8-62x9-952g` | Low (CVSS 3.5) | `>=5.14.3` | Astro Development Server arbitrary local file read | Bounded - manifests only during `npm run dev` (local contributor environment); never in the published GitHub Pages site. |

The four High and Moderate advisories require SSR or adapter features that pm-skills does not use. The remaining Low advisory affects only the local dev server, where contributor exposure is bounded. CI advisory tooling (Dependabot, GitHub advisory scanning) will continue to surface these advisories as long as the Astro pin remains below the fix range. The exemption is documented here so the position is explicit and defensible rather than implicit / rationalized after the fact.

**Re-evaluation point.** The Astro 6 + Node 22.12+ bump is deferred to v2.15+ (Decision 11 in the v2.14 cycle plan). At that cycle, the pin moves past 5.x entirely; this exemption table can be revisited and most likely removed when the underlying advisories no longer apply to a 6.x-pinned codebase.

## Decision lineage

This file's positions came from the following deliberations:

- Astro pin policy (DM-4 in `docs/internal/release-plans/v2.14.0/plan_v2.14_starlight-migration.md`): Option A (hold `~5.13.0`; document static-site exemption) accepted by maintainer 2026-05-06.
- Astro 6 + Node 22.12+ deferral (Decision 11 in `docs/internal/release-plans/v2.14.0/plan_v2.14.0.md`): bump deferred to v2.15+.
- Tight-pin rationale: surfaced during W1 spike when Astro 6 hard-failed install on Node 22.11.0; documented here as the "Astro 6 hard-fail on Node 22.11.0" lesson.
