---
slug: releases/Release_v2.25.1
title: Release v2.25.1
description: Maintenance patch banking accumulated untagged work since v2.25.0 - documentation-site Pattern S reorg, a generated resource index, an em-dash-scar cleanup with new CI guards, dependency bumps, and a pre-tag validator parity fix. No new skills.
---

## The short version

v2.25.1 is a maintenance patch. It banks a backlog of untagged maintenance that landed on `main` after v2.25.0 under one versioned release, so consumers get a clean, release-noted snapshot. There is no skill behavior change and no published-URL change. The catalog stays 65 skills and 5 sub-agents.

What it banks:

- **Documentation-site reorg (Pattern S)** to the Product on Purpose family layout, with full family-standard conformance.
- **A generated, CI-gated resource index** (`docs/RESOURCES.md`) that links every published page to its source, plus a `docs/` front door.
- **Root-document link repair** after the relocation, plus an enforcing CI guard so root links cannot rot silently again.
- **An em-dash-scar cleanup**: residual ` . ` scars from earlier em-dash sweeps swept to ` - ` across user-facing and internal prose, with new advisory and enforcing guards to keep them out.
- **Three site dependency bumps** and **a pre-tag validator parity fix**.

## Documentation site: the Product on Purpose family layout (Pattern S)

The Astro Starlight project now lives entirely under `site/`, and repo-root `docs/` is governance and human documentation only, never built by Astro. Reference content (per-skill, per-workflow, showcase, commands reference, and the library samples) is produced by one zero-dependency Node generator, `scripts/gen-site.mjs`, replacing the three previous Python generators; generated content is gitignored and rebuilt on each build. Relative documentation links resolve at build time via a remark transform. The published base path now has a single source of truth (`scripts/site-base.mjs`), with a regression test proving a wrong base fails the rendered-link check rather than 404ing silently in production. Astro is pinned to the family-shared `6.4.2`. Every page slug and the redirect map are preserved (route parity verified before and after).

## A resource index you can trust

`docs/RESOURCES.md` is a generated catalog that links every published page back to its source-of-truth file in the repo: skills to their `SKILL.md`, samples to the library sources, workflows to `_workflows/`, hand-authored docs to their page source. Because it is generated and CI-gated (`gen-resource-index.mjs --check`), it cannot drift out of date without failing the build. A hand-authored `docs/README.md` is the front door that points to it.

## Link integrity: closing the GitHub-vs-site blind spot

The Pattern S relocation left a class of broken links: root-document links (in `README.md` and `CHANGELOG.md`) that GitHub renders with its own resolver, outside the Astro link pipeline. Those were repaired (roughly 90 README links and several CHANGELOG links repointed to the deployed docs site and the GitHub release-tag pages), and a new enforcing CI guard (`scripts/check-root-doc-links.mjs`) now fails the build if a root-document link does not resolve, so this cannot regress silently.

## Em-dash-scar cleanup, with guards to keep it clean

An earlier repo-wide em-dash sweep had replaced em-dashes with a spaced period, leaving a visual ` . ` scar in prose. This release sweeps those scars to ` - ` across user-facing prose (the CHANGELOG, the site doc bodies handled anchor-aware, and the prompt-gallery and skill-finder guides) and across an internal-prose safe subset. Two guards keep the scars out going forward: an advisory, fence-aware scar guard (`scripts/check-emdash-scars.mjs`) scoped to user-facing prose, and an enforcing `--site-docs` mode on the frontmatter-YAML lint that catches frontmatter defects (such as an unquoted colon) in Astro doc bodies early, rather than as a cryptic build crash.

## Tooling and dependencies

- Site dependency bumps in `/site`: `@astrojs/starlight` `0.39.2` to `0.39.3`, `dompurify` `3.4.4` to `3.4.7`, and `astro-mermaid` `2.0.1` to `2.0.2`.
- `scripts/pre-tag-validate.ps1` was reconciled with the bash bundle and CI: it had listed two retired validators that no longer exist on disk as required (so the PowerShell pre-tag bundle could never reach "ALL CHECKS PASSED" on Windows) and omitted `check-skill-sample-coverage` that bash and CI both enforce. The required inventory now matches `pre-tag-validate.sh` exactly, and the advisory tier is restored. This was surfaced by an external repository audit.

## Do I need to do anything?

No. There is no behavior change, no new skill, and no published-URL change. Everything you already use behaves exactly as before.

## FAQ

**Why a patch and not a minor?** SemVer tracks compatibility, not significance. This release adds no capability and removes nothing; it banks accumulated maintenance. That is a patch.

**Did any documentation URLs move?** No. The Pattern S reorg is internal to the repo; route parity was verified before and after, so every published page slug and the redirect map are preserved.

**Versioning:** maintenance patch. No new skills (catalog stays 65; sub-agents stay 5).
