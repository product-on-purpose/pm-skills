# v3.0.0 Registry Validation CI - Specification

> **Purpose.** Specification for the CI that validates the `product-on-purpose` marketplace registry. Destined for the `product-on-purpose/agent-plugins` repo (`.github/workflows/`), staged here per the v3.0.0 authoring boundary (the live repo is not mutated this pass). Implements decision **D-V3-4** (enforcing). Companion to [`plan_v3.0.0.md`](plan_v3.0.0.md). **Last updated 2026-05-23.**

---

## Why this exists

The registry is the distribution boundary for every plugin in the marketplace. A single malformed, unpinned, or uninstallable entry is a user-facing break, not a style nit. pm-skills already treats its own `validate-plugin-install` as enforcing; the registry deserves the same bar, and that bar matters more, not less, as additional plugins list (a bad second-plugin entry would otherwise reach users silently). The live `agent-plugins` repo currently has **no CI**, so this is net-new.

## Where it runs

A GitHub Actions workflow in `product-on-purpose/agent-plugins` at `.github/workflows/validate-registry.yml`, triggered on `push` and `pull_request` to `main`. The validation logic should be a deterministic script (node `.mjs` or bash `.sh`) invoked by the workflow, mirroring pm-skills's validator style, so it can also be run locally.

## Enforcement level (D-V3-4)

**Enforcing:** CI fails and blocks merge on any check 1-6 below. Check 7 (installability) is the one candidate for the **tiered fallback** in D-V3-4: keep 1-6 enforcing and demote 7 to advisory only if it proves flaky in practice.

## Checks

| # | Check | Fails when | Tier |
|---|---|---|---|
| 1 | **JSON parse** | `marketplace.json` is not valid JSON | Enforcing |
| 2 | **Schema** | `$schema` / `name` / `owner` / `plugins` missing or wrong type | Enforcing |
| 3 | **Per-entry required fields** | any `plugins[]` lacks `name`, `source`, `version`, or `description` | Enforcing |
| 4 | **Pinned `sha`** | any production entry's `source` has no `sha` (40-char commit hash) | Enforcing |
| 5 | **`sha` exists and is on a released tag** | the `sha` does not resolve in the target repo, or is not reachable from any tag | Enforcing |
| 6 | **No placeholder in production** | an entry is a placeholder, or is `strict: true` without a real, pinned, installable plugin | Enforcing |
| 7 | **Installability smoke** | the pinned commit's `.claude-plugin/plugin.json` is missing/invalid (or, if a harness exists, a fresh install fails) | Tiered |

## Implementation notes

- **`sha`-on-tag (check 5):** list the target repo's tags (`gh api repos/<repo>/git/refs/tags`), resolve each to its commit, and assert the entry `sha` is a tag target (strict) or reachable from a tag (looser). Decide the strictness at implementation (see Open items).
- **Cross-repo reads:** the workflow must read each listed plugin repo. Public repos need no token; a private plugin repo would need a token with read access. (pm-skills is public, so this is not a launch blocker.)
- **Installability (check 7):** a full Claude Code install in CI is impractical. The realistic, deterministic check is "fetch the pinned commit's `plugin.json` and validate it parses and has `name`/`version`/`description`/`license`." Treat a real end-to-end install as a manual step in the smoke matrix, not CI.
- Keep the enforcing tier free of network flakiness; the GitHub API calls in checks 5 and 7 should be retried or cached.

## Acceptance

- An entry with no `sha`, a `sha` not on a tag, a missing required field, or invalid JSON **fails** CI.
- A placeholder, or a `strict: true` entry without a valid pinned plugin, **fails** CI.
- A valid, pinned-on-tag entry with a parseable `plugin.json` **passes**.
- Introducing a broken entry for a future second plugin is caught before users see it.

## Open items (resolve at implementation)

- Exact "on a tag" strictness: tag target only, vs reachable-from-a-tag.
- Whether check 7 ships enforcing or tiered at launch (D-V3-4 fallback).
- Whether to also lint `metadata.version` monotonicity (registry's own version never goes backward).
