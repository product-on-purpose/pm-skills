---
slug: releases/Release_v2.29.1
title: Release v2.29.1
description: A maintenance patch that fixes silently-dropped sections on skill documentation pages - the site generator now renders every SKILL.md section, guarded by an output-based CI gate.
---

**Released 2026-06-24.** PATCH. No skill behavior change; catalog stays 68 skills / 6 sub-agents.

## The short version

The documentation-site generator built each skill page by pulling a fixed set of section names out of the SKILL.md and discarding everything else. Skills that kept their method under those exact headings rendered fine; skills that used their own headings shipped a page with the method missing. About 27 of 68 skill pages were affected, and the most visible was the brand-new `foundation-build-risk-review` from v2.29.0: its Hard gate, Modes, review contract, and Verdict routing were all dropped, leaving a page with a template and examples but no actual instructions.

This patch makes the generator render the full SKILL.md, and adds a CI gate so it can never silently drop a section again.

## What changed

**The generator renders every section.** `scripts/gen-site.mjs` now places the recognized sections (When to Use, When NOT to Use, Instructions, Quality Checklist) in their dedicated slots and renders every other section verbatim, in document order. The skill page is a faithful rendering of the SKILL.md.

**A completeness gate.** `scripts/check-skill-page-sections.mjs` (enforcing in CI) renders each skill page through the real generator and fails if any SKILL.md section is missing from it. Because it inspects the generator's actual output rather than a hardcoded list, it cannot drift from the generator.

**Cross-reference links resolve.** The restored sections contained skill-to-skill references written as flat relative links (`../<skill>/SKILL.md`). Those never resolved on the grouped site; `scripts/remark-resolve-links.mjs` now maps them to the published page (or a GitHub source URL for reference files).

**Documentation.** The skill-authoring guide and the CI overview now describe the section contract: every section you write renders on the page, and the gate enforces it.

## Upgrade

No action required. Documentation-only patch; skills, commands, and their behavior are unchanged.
