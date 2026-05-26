# v2.21.0 Registry Validation CI - Specification

> **Purpose.** Specification for the CI that validates the `product-on-purpose` marketplace registry. Destined for the `product-on-purpose/agent-plugins` repo (`.github/workflows/`), staged here per the authoring boundary (the live repo is not mutated this pass). Implements decision **D-V3-4** (enforcing). Companion to [`plan_v2.21.0.md`](plan_v2.21.0.md). **Last updated 2026-05-25** (renumbered from v3.0.0).

---

## Why this exists

The registry is the distribution boundary for every plugin in the marketplace. A single malformed, unpinned, or uninstallable entry is a user-facing break, not a style nit. pm-skills already treats its own `validate-plugin-install` as enforcing; the registry deserves the same bar, and that bar matters more, not less, as additional plugins list (a bad second-plugin entry would otherwise reach users silently). The live `agent-plugins` repo currently has **no CI**, so this is net-new.

## Where it runs

A GitHub Actions workflow in `product-on-purpose/agent-plugins` at `.github/workflows/validate-registry.yml`, triggered on `push` and `pull_request` to `main`. The validation logic should be a deterministic script (node `.mjs` or bash `.sh`) invoked by the workflow, mirroring pm-skills's validator style, so it can also be run locally.

## Enforcement level (D-V3-4)

**Enforcing:** CI fails and blocks merge on any check 1-7 below. Checks 1-6 are enforcing unconditionally. Check 7 (installability) **ships enforcing at launch** in its deterministic `plugin.json`-fetch form; the D-V3-4 **tiered fallback** (demote 7 to advisory) is held in reserve only if that check proves flaky in practice. The `metadata.version` monotonicity lint is advisory (see Resolved decisions).

## Checks

| # | Check | Fails when | Tier |
|---|---|---|---|
| 1 | **JSON parse** | `marketplace.json` is not valid JSON | Enforcing |
| 2 | **Schema** | `$schema` / `name` / `owner` / `plugins` missing or wrong type | Enforcing |
| 3 | **Per-entry required fields** | any `plugins[]` lacks `name`, `source`, `version`, or `description` | Enforcing |
| 4 | **`source` shape + pinned `sha`** | `source.source != "github"`, `source.repo` not in `owner/repo` form, or `source.sha` missing / not a 40-char hex commit hash | Enforcing |
| 5 | **`sha` is a release-tag target** | the `sha` does not resolve in the target repo, or is not the commit a release tag points at | Enforcing |
| 6 | **No placeholder in production** | an entry is a placeholder, or is `strict: true` without a real, pinned, installable plugin | Enforcing |
| 7 | **Installability smoke** | the pinned commit's `.claude-plugin/plugin.json` is missing/invalid (or, if a harness exists, a fresh install fails) | Tiered |

## Implementation notes

- **`sha`-on-tag (check 5):** list the target repo's tags (`gh api repos/<repo>/git/refs/tags`), resolve each (including annotated-tag dereference) to its commit, and assert the entry `sha` is **exactly a tag's target commit** (the locked strict interpretation - see Resolved decisions). "Reachable from a tag" is intentionally rejected: it would pass any ancestor commit, including pre-release WIP, defeating the point of pinning a released version.
- **Cross-repo reads:** the workflow must read each listed plugin repo. Public repos need no token; a private plugin repo would need a token with read access. (pm-skills is public, so this is not a launch blocker.)
- **Installability (check 7):** a full Claude Code install in CI is impractical. The realistic, deterministic check is "fetch the pinned commit's `plugin.json` and validate it parses and has `name`/`version`/`description`/`license`." Treat a real end-to-end install as a manual step in the smoke matrix, not CI.
- Keep the enforcing tier free of network flakiness; the GitHub API calls in checks 5 and 7 should be retried or cached.

## Acceptance

- An entry with no `sha`, a `sha` not on a tag, a missing required field, or invalid JSON **fails** CI.
- A placeholder, or a `strict: true` entry without a valid pinned plugin, **fails** CI.
- A valid, pinned-on-tag entry with a parseable `plugin.json` **passes**.
- Introducing a broken entry for a future second plugin is caught before users see it.

## Resolved decisions (were open)

- **"On a tag" strictness - LOCKED to tag-target only.** The entry `sha` must be the exact commit a release tag points at, not merely reachable from one (check 5 above). Rationale: pinning is meant to freeze a *released* version; an ancestor-reachable commit could be unreleased WIP.
- **`source` shape - now explicitly validated** (check 4): `source.source == "github"`, `source.repo` in `owner/repo` form, `source.sha` a 40-char hex hash. Closes the gap where a malformed source with a valid-looking SHA could pass.
- **Check 7 ships ENFORCING at launch.** The launch implementation is the deterministic form (fetch the pinned commit's `plugin.json`; assert it parses and has `name`/`version`/`description`/`license`), which is not network-flaky in the way a full end-to-end install would be. The D-V3-4 demotion-to-advisory path remains available only if this specific check proves flaky in practice; it does not at launch.
- **`metadata.version` monotonicity - ADVISORY (not blocking) at launch.** Lint that the registry's own `metadata.version` never decreases, but warn rather than fail; a single-maintainer registry does not need a hard gate here, and a false positive should not block a listing. Revisit if multiple contributors edit the registry.
