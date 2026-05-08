# Dependency Policy

**Cycle introduced:** v2.14.0
**Last updated:** 2026-05-07
**Scope:** Node toolchain pinning for the Astro Starlight documentation stack.

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
