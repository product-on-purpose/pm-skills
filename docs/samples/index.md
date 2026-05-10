---
title: Samples
description: Browse 115 PM artifact samples spanning 40 skills and three product threads (Storevine, Brainshelf, Workbench).
sidebar:
  order: 1
---

The samples corpus contains **115 real PM artifacts** produced by the pm-skills commands, organized by skill and by product thread. Use this section as a "what does the output actually look like?" reference when picking which skill to run, when tuning your prompt style, or when comparing how the same skill behaves across different product contexts.

## What lives here

| Coverage | Count |
|----------|-------|
| Total samples | 115 |
| Skills with samples | 40 |
| Product threads | 3 (Storevine, Brainshelf, Workbench) |

Each sample includes the scenario context, the exact prompt that produced it, and the full artifact output. Fictional metrics are marked with `[fictional]`; competitor names are real.

## The three threads

| Thread | Product archetype | Stage | Prompt style |
|--------|-------------------|-------|--------------|
| **Storevine** | B2B ecommerce platform building Campaigns (native email marketing) | Series A, ~70 employees | Organized: structured context, references prior work, clear scope |
| **Brainshelf** | Consumer PKM app building Resurface (contextual morning digest) | Post-seed, ~20 employees | Casual: bullet points, shorthand, enough context to work |
| **Workbench** | Enterprise collaboration building Blueprints (document templates with approval gates) | Series B, ~200 employees | Enterprise: full stakeholder lists, quantified baselines, explicit metrics |

Per-thread sample distribution: Storevine 43, Brainshelf 36, Workbench 36.

The threads exist so you can see how the same skill behaves under different product contexts. A `define-hypothesis` sample under Storevine reads differently than one under Workbench, because the scenario inputs (team, scale, prior artifacts, decision tempo) differ. Reading three threads of the same skill is the fastest way to internalize the variation surface of any skill.

## How to browse

- **By skill**: expand the **Samples** group in the left sidebar. Each of the 40 skills has its own subgroup with 2-3 samples (one per thread, in most cases).
- **By thread (narrative)**: see the [Showcase](../showcase/) section, which threads samples together into a complete product lifecycle journey for each company.
- **By artifact type**: cross-reference the [Skills index](../skills/) to find skills by Triple Diamond phase, then jump to that skill's samples.

## Conventions

- File names use the pattern `sample_{skill}_{thread}_{topic}.md`.
- Samples are mounted via the W7 glob loader from `library/skill-output-samples/`. The library directory has authoring standards in `README_SAMPLES.md`, `SAMPLE_CREATION.md`, and `THREAD_PROFILES.md` for contributors adding new samples.
- 11 historical legacy/orbit samples are excluded from the docs site to keep the corpus focused on current first-class output. Source files remain in the library directory.

For a narrative-style tour through the threads, see the [Showcase](../showcase/).
