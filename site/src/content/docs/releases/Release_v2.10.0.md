---
slug: releases/Release_v2.10.0
title: Release v2.10.0
sidebar:
  order: 6
---

**Status:** Final
**Date:** 2026-04-11

## Highlights

- 3 new utility skills: mermaid diagrams, slideshow creation, self-updater
- Self-updater lets users check for and apply pm-skills updates from a single command
- MCP server decoupled from release cycle (frozen until team adoption warrants it)
- Codex cross-LLM review validated release plan and feature design

> **Note:** F-16 (mermaid-diagrams) and F-19 (slideshow-creator) content has
> been available since v2.9.1 but is formally released and documented with
> v2.10.0 as the utility skill expansion release.

## New Skills

### utility-mermaid-diagrams (F-16)

Teaching PMs to create syntactically valid mermaid diagrams. 15 diagram
types with dual-lens navigation (type catalog + PM use-case guide),
dedicated syntax validity reference, planning worksheet, and worked
examples.

**Invoke:** `/mermaid-diagrams "diagram description"`

### utility-slideshow-creator (F-19)

Generate professional presentations (.pptx and PDF) from JSON deck
specifications. 18 slide types with dark/light variants, content-to-layout
decision logic, calibrated character limits, Google Slides compatibility.

**Invoke:** `/slideshow-creator "presentation brief"`

### utility-update-pm-skills (F-24)

Check for updates, preview changes, and update your local pm-skills
installation. Three modes:

| Mode | Command | What it does |
|------|---------|-------------|
| Status check | `/update-pm-skills --status` | Quick version comparison |
| Preview | `/update-pm-skills --report-only` | See what would change without writing files |
| Full update | `/update-pm-skills` | Download, confirm, backup, update, report |

Key features:
- Validated-before-copy safety (downloads to temp, validates, then copies)
- Optional backup before overwriting (`_pm-skills/backups/`)
- Value-delta reports showing what's new and what it enables
- Post-update smoke test (version consistency, file integrity, skill count)
- Degraded mode with manual instructions when offline
- FAQ for common questions

**Guide:** [Updating PM Skills](../guides/updating-pm-skills.md)

## Changed

- Repo now ships **32 skills** (25 phase + 1 foundation + 6 utility),
  **39 commands**, and **10 workflows**
- `_pm-skills/` directory convention added to `.gitignore` (local state
  for update reports and backups)
- MCP server decoupled from release cycle (M-22) - pm-skills-mcp is
  frozen and no longer a release prerequisite

## Sample Library

7 new sample outputs added for skills that were missing from the sample
library. All use the storevine thread (Campaigns feature):

- **deliver-acceptance-criteria** - Given/When/Then ACs for the email template builder
- **utility-mermaid-diagrams** - flowchart planning worksheet for campaign send approval
- **utility-slideshow-creator** - JSON deck spec for a campaigns launch presentation
- **utility-pm-skill-builder** - skill implementation packet for a fictional campaign-analytics skill
- **utility-pm-skill-validate** - validation report with 2 findings
- **utility-pm-skill-iterate** - iteration applying the validation findings
- **utility-update-pm-skills** - update completion report (v2.9.1 → v2.10.0)

Sample library: **84 → 91 samples**, now covering all 32 skills.

Generated `docs/skills/` pages for all 3 new utility skills (mermaid-diagrams,
slideshow-creator, update-pm-skills).

## Infrastructure

- Codex cross-LLM review completed: 1 Blocker, 12 Major, 11 Minor
  findings - all resolved before release
- v2.9.1 shipped as a prerequisite (workflows guide, count consistency CI)

## Skill Inventory

| Phase | Count | Skills |
|-------|-------|--------|
| Discover | 4 | interview-synthesis, competitive-analysis, stakeholder-summary, market-sizing (planned) |
| Define | 4 | problem-statement, hypothesis, jtbd-canvas, opportunity-tree |
| Develop | 4 | solution-brief, spike-summary, adr, design-rationale |
| Deliver | 6 | prd, user-stories, acceptance-criteria, edge-cases, release-notes, launch-checklist |
| Measure | 5 | experiment-design, experiment-results, dashboard-requirements, instrumentation-spec, survey-analysis (planned) |
| Iterate | 4 | retrospective, lessons-log, refinement-notes, pivot-decision |
| Foundation | 1 | persona |
| Utility | 6 | pm-skill-builder, pm-skill-validate, pm-skill-iterate, mermaid-diagrams, slideshow-creator, update-pm-skills |
| **Total** | **32** | |
