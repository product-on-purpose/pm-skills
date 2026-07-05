---
slug: releases/Release_v2.30.0
title: Release v2.30.0
description: A trust-repair release that fixes count drift on the front-door install surfaces, closes the CI gate holes that let it pass, stages agents/ and hooks/ in the release zip, and sweeps headings, descriptions, and tool-family versioning.
---

**Released 2026-07-04.** Additive MINOR (the distributed release zip gains content). No new skills; catalog stays 68 skills (30 phase + 11 foundation + 12 utility + 15 tool), 6 sub-agents unchanged.

## The short version

A 2026-07-04 audit of this project found that its least-engineered surfaces carried its most damaging defects. `QUICKSTART.md`'s first line said "67 shipped PM skills" and then listed sub-counts that summed to 68, in the same line. The curated release zip omitted the `agents/` and `hooks/` directories the dispatch skills need at runtime, while still shipping the internal maintainer-docs tree. `utility-pm-skill-builder`, the gate every new skill passes through, carried a hand-maintained inventory that could not see the 15-skill tool family at all.

None of these were hard to fix. What made them dangerous was that they had shipped green through CI. This release fixes every instance of the drift and, more importantly, closes the gate holes that let it happen, so the "provable quality" claim this project makes is no longer contradicted by its own first sentence. The same pass then swept a batch of smaller hygiene items that had been accumulating: heading spelling drift, weak early-cohort descriptions, a frozen tool family with no version history, and CI ergonomics gaps.

## What changed

### Count truth, everywhere, with a gate that proves it

Every stale count on the front-door surfaces is fixed: `QUICKSTART.md`, both site quickstart pages, `README.md`, and the three plugin manifest descriptions now agree with each other and with the real catalog (68 skills, 11 foundation, 6 sub-agents). The seven "95+ sample outputs" mentions in `README.md` become a future-proof "200+" floor instead of a number that was already stale by a factor of two.

The durable fix is `scripts/check-count-phrases.mjs`, a new gate that derives the truth from disk and catches phrase variants the existing `check-count-consistency` gate cannot see: "N shipped PM skills", "N skill definitions", "N+ sample outputs", and the "N sub-agents" axis, which nothing previously checked at all (this is exactly how the project's public GitHub description drifted to claiming 4 sub-agents when there are 6). It shipped advisory first; this release promotes it to enforcing now that the sweep is verified clean.

### The release zip now ships what it needs to work

The curated ZIP distributed through releases and the `skills` CLI omitted `agents/` (the sub-agent definitions) and `hooks/` (the activation hooks), even though several dispatch skills reference them directly. It now stages both, and continues to exclude the 400+ file `docs/internal/` maintainer tree. New CI assertions check both directions: the six agent files and `hooks.json` must be present, and `docs/internal` must not be. `.gitattributes` now marks the internal paths `export-ignore`, so GitHub's automatic source archives omit them too.

### The skill-builder can see the whole catalog

`utility-pm-skill-builder`'s gap-analysis step is supposed to check a new skill idea against everything that already exists. Its inventory table listed 10 foundation skills under an "(11)" header and never mentioned the tool family at all, 22% of the catalog invisible to the one skill whose job is preventing collisions. It now derives its inventory from `skill-manifest.json` at run time instead of hand-listing it, so it cannot go stale again.

### Cross-client documentation catches up to reality

The sub-agent compatibility matrix adds `pm-skill-router` and its current stamp; the platform setup guide fixes "All 4 sub-agents" and adds a real Gemini CLI install section; the ecosystem/MCP comparison page fixes a stale skill count and replaces an inaccurate "tracks releases 1:1" MCP claim with the honest frozen-at-v2.9.2 status. Three sub-agent definition files had dead documentation-path citations left over from the site's Astro migration; those now resolve. Both quickstarts gain a per-client "Verify It Worked" step, so a new user can confirm the install landed before they start building.

### Skill content mesh: boundaries, headings, and descriptions

Four skills gained "When NOT to Use" sections, closing two one-way reciprocity gaps in the boundary-pointer mesh. A new Skeleton Canon in the site skill-authoring guide names the three sanctioned SKILL.md dialects and their exact heading spellings, replacing a "mirror the closest exemplar" standard that had let a fourth, unsanctioned dialect emerge; 11 skills' headings are normalized to it, and a new advisory `check-heading-canon.mjs` gate flags future drift. Eight early-cohort descriptions (including `define-opportunity-tree` and `discover-journey-map`) are rewritten to the standard set by `foundation-build-risk-review`: what the skill produces, when to use it, and at least one sibling deflection.

### Tool family declared stable; CI gets easier to run

The 15 `tool-*` skills had sat at version 0.1.0 with zero HISTORY entries across seven releases, reading as permanently experimental. They move to 1.0.0 with a first HISTORY row each, and the HISTORY-start convention is now documented. Root `package.json` gains a `test` script that runs the full unit suite, replacing a hand-maintained ~21-file list inside the CI workflow; both `setup-node` steps cache npm; a new opt-in pre-commit hook runs the fast local subset of the release gate. New validators are frozen to single-source Node scripts going forward (no more `.sh` + `.ps1` pairs), and the trigger-eval roster moves out of code into a data file that now correctly lists all 31 fixture sets instead of a drifted 29.

### Marketplace pin and internal-docs visibility

The in-repo marketplace `ref` moves from the rolling `main` branch to this release's own tag, so installs resolve the exact tree that was tagged rather than whatever `main` happens to hold at install time. Separately, the strategy/backlog/planning tier and the `_agent-context/` coordination tree move to the gitignored local tier (kept on disk, no longer tracked); runbooks, the skill-versioning policy, and the release-plans history stay public.

## What this means for you

- **If you use the skills:** nothing changes. Every skill, command, and workflow behaves exactly as it did in v2.29.1.
- **If you installed via the release ZIP:** re-download it. This is the first ZIP that carries `agents/` and `hooks/`; if a dispatch skill previously failed to find its sub-agent definition on a ZIP install, this fixes it.
- **If you contribute:** `check-count-phrases.mjs` is now enforcing; a stale count phrase on a front-door surface fails CI. New validators should be single Node scripts, not shell pairs. An opt-in pre-commit hook is available (`git config core.hooksPath .githooks`).

## Upgrade

```
# Update path
/plugin marketplace update
/plugin install pm-skills@product-on-purpose

# Or re-download the release ZIP if you installed that way.
```

No action required beyond updating. If you reference the catalog in your own tooling, it remains 68 skills, 6 sub-agents.

## What does NOT change in v2.30.0

- All skills' instructions, templates, and behavior are unchanged (content-mesh edits are boundaries, headings, and descriptions, not method changes).
- Skill catalog (68), slash commands (11), and workflows (12) are unchanged.
- The doc-stack, frontmatter structure, and cross-client dispatch mechanism are unchanged.

## Affected areas

| Area | Change |
|---|---|
| `scripts/` | New `check-count-phrases.mjs` (enforcing) and `check-heading-canon.mjs` (advisory); trigger-eval roster extracted to `scripts/trigger-eval-roster.yaml`; a dual-shell equivalence smoke over a new fixture tree; four orphan scripts removed. |
| `.github/workflows/` | `validate-plugin.yml` gains zip-stage assertions; `validation.yml` caches npm, calls `npm test`, and wires the two new gates. |
| `.gitattributes` | New `export-ignore` entries for the internal-docs and agent-coordination paths. |
| `scripts/build-release.sh` / `.ps1` | Now stage `agents/` and `hooks/` in the release zip. |
| `skills/` | `utility-pm-skill-builder` derives its inventory; 4 skills gain When-NOT-to-Use sections; 11 skills' headings normalized; 8 descriptions rewritten; 15 tool skills bumped to 1.0.0 with first HISTORY rows. Catalog unchanged at 68. |
| `hooks/` | `phase-router.mjs` honors its opt-out; `guardrails.mjs`'s fabricated-metric regex requires metric context. |
| `README.md` / `QUICKSTART.md` / site | Count drift fixed; sample-count phrasing future-proofed; per-client verify step added; Gemini CLI section added; two broken site links fixed. |
| `.claude-plugin/` / `.codex-plugin/` | Version 2.29.1 to 2.30.0; descriptions refreshed; marketplace `ref` pinned to `v2.30.0`. |
| `docs/internal/` | Strategy/backlog/next tier and `_agent-context/` move to the gitignored local tier; `check-context-currency` retired. |
