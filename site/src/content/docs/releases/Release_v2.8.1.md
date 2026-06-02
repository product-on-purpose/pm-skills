---
slug: releases/Release_v2.8.1
title: Release v2.8.1
sidebar:
  order: 10
---

**Date**: 2026-04-04
**Status**: Released
**Type**: Documentation release . no skill or command behavior changes

---

## Executive Summary

v2.8.1 launches the **PM Skills documentation site** at [product-on-purpose.github.io/pm-skills](https://product-on-purpose.github.io/pm-skills/). Built with MkDocs Material, the site provides a searchable, navigable, mobile-friendly interface to the entire PM Skills library . including 29 skill pages, 3 interactive "Follow the Product" showcase journeys with 84 real sample outputs, workflow recipes, a skill finder, prompt gallery, and skill comparisons.

This is a documentation-only release. No PM skills, slash commands, or MCP tools were changed. No `pm-skills-mcp` update is required.

**By the numbers:**
- **70+ navigable pages** including 29 auto-generated skill pages
- **84 real-world samples** embedded from the sample library across 3 narrative arcs
- **7 workflow recipes** with mermaid flow diagrams
- **6 skill comparisons** for commonly confused pairs
- **3 interactive showcase journeys** (Storevine B2B, Brainshelf Consumer, Workbench Enterprise)
- **Zero build warnings**

---

## What's New

### Documentation Site

The site at `product-on-purpose.github.io/pm-skills/` features:

- **MkDocs Material** with dark/light mode, tab navigation, full-text search, and mermaid diagram rendering
- **Auto-deployment** via GitHub Actions on every push to main
- **Social cards** for rich link previews when sharing on Slack/LinkedIn

### Showcase: Follow the Product

Three interactive story pages where readers follow a fictional company through the complete PM lifecycle . from discovery research to pivot decisions. Each step shows the actual prompt and the full artifact output.

- **Storevine** (B2B ecommerce) . organized prompt style
- **Brainshelf** (consumer PKM app) . casual prompt style
- **Workbench** (enterprise collaboration) . structured prompt style

### Skill Pages Enhanced

Every skill page now includes:
- Quick-try slash command snippet at the top
- Real-world examples from 3 product contexts (collapsible)
- Phase flow diagrams showing how skills connect

### New Guide Pages

- **Skill Finder** . interactive decision tree for choosing the right skill
- **Recipes** . 7 end-to-end workflows (Pitch a Feature, Run an Experiment, etc.)
- **Prompt Gallery** . curated prompts in 3 styles with commentary
- **Skill Comparisons** . PRD vs Solution Brief, Hypothesis vs Problem Statement, etc.
- **MCP Setup** . user-facing guide for installing and using pm-skills-mcp

### Generation Scripts

Two Python scripts keep the site in sync with skill source files:
- `scripts/generate-skill-pages.py` . generates 29 skill pages + phase indexes + commands reference
- `scripts/generate-showcase.py` . generates 3 showcase journeys from the sample library

---

## Infrastructure

- `.github/workflows/deploy-docs.yml` . automated deployment on push
- `mkdocs.yml` . site configuration with Material theme, plugins (search, privacy, social, tags), and full nav tree
- `requirements-docs.txt` . Python dependencies (mkdocs-material, pillow, cairosvg)

---

## No MCP Impact

No skills were added, renamed, or changed. `pm-skills-mcp` v2.8.0 remains current.
