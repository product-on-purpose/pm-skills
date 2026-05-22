---
title: v2.18.0 Release Notes - Highest-Consensus PM Skill Gaps
description: 'v2.18.0 ships the four highest-consensus PM-skill gaps as a coherent slate: discover-market-sizing (TAM/SAM/SOM), define-prioritization-framework (RICE/ICE/MoSCoW/Weighted Scoring/Kano), discover-journey-map (touchpoints and emotional curve), and measure-survey-analysis (honest analysis with limitation warnings). The catalog grows from 59 to 63 skills.'
date: 2026-05-21
status: SHIPPED
type: minor
---

**Released:** 2026-05-21
**Type:** Minor (4 new phase skills; catalog 59 to 63)
**Day-to-day usage:** purely additive. Every existing skill, command, and workflow is unchanged; v2.18.0 adds four new skills and their slash commands.

## TL;DR

v2.18.0 closes the four highest-consensus PM-skill gaps surfaced across the backlog aggregations and competitive research. Each is a phase skill that produces a decision-grade artifact and leads with epistemic discipline: it refuses to fabricate data and labels confidence honestly.

- **`/market-sizing`** - market opportunity sizing (TAM/SAM/SOM) across multiple frameworks
- **`/prioritization-framework`** - RICE, ICE, MoSCoW, Weighted Scoring, and Kano run in parallel with a cross-framework comparison
- **`/journey-map`** - customer journey maps with touchpoints, an emotional curve, and moments of truth
- **`/survey-analysis`** - survey analysis that is honest about what the data does and does not show

The catalog grows from 59 to 63 skills (phase skills 26 to 30); slash commands 66 to 70. Each skill ships with a TEMPLATE, a worked EXAMPLE, a companion command, and three thread-aligned samples (Brainshelf, Storevine, Workbench).

## What's new

### `discover-market-sizing` (`/market-sizing`)

Estimates Total, Serviceable, and Serviceable-Obtainable market (TAM/SAM/SOM) by running every applicable sizing framework - top-down, bottom-up, comparable company, analogous market - and triangulating across them. **Divergence between frameworks is treated as a finding to explain, not an error to average away.** Every dollar figure must trace to a cited source, a stated assumption, or a sensitivity range; a quick-estimate mode accepts explicit assumptions when primary sources are unavailable, but still refuses unbounded fabrication. Output: market definition, per-framework sizing tables, multi-framework synthesis, sensitivity analysis, assumptions, and a confidence-labeled recommendation.

### `define-prioritization-framework` (`/prioritization-framework`)

Runs the applicable prioritization frameworks (RICE, ICE, MoSCoW, Weighted Scoring, Kano) against a candidate list, filtered by data availability, then produces a **cross-framework comparison** showing where the rankings agree and diverge, plus an executive recommendation. The divergence is the insight: it reveals which scoring dimension is carrying the decision. Kano is gated on customer research; when numerical inputs are missing the skill returns an estimation scaffold rather than fabricating scores; and Weighted Scoring loudly flags that its weights are a choice.

### `discover-journey-map` (`/journey-map`)

Produces a customer journey map covering stages, touchpoints, an emotional curve, pain points, moments of truth, and opportunity annotations. Supports linear journeys, cyclical engagement loops, and an advanced multi-actor pattern, and renders an optional mermaid timeline or flowchart (with markdown tables as the always-valid fallback). Every emotional entry carries a confidence label and a source, or is marked Hypothesis; the skill refuses to fabricate emotional or behavioral data without research input.

### `measure-survey-analysis` (`/survey-analysis`)

Analyzes survey results into persona segmentation, hypothesis validation, open-text thematic clustering, and prioritized recommendations. Its core principle is that **honesty about what the data does NOT show is more valuable than confident conclusions from weak data.** It uses qualitative confidence labels tied to sample size (no implied statistical precision), flags leading questions and selection bias, refuses causal claims from cross-sectional surveys, and includes an explicit "what the data does not show" section.

## How to use

```
/market-sizing "AI code-review SaaS for US companies with 50+ engineers"
/prioritization-framework "Q3 roadmap candidates, with reach and effort estimates"
/journey-map "First-time SaaS subscriber, discovery to renewal"
/survey-analysis "Q2 NPS survey, 1200 responses, with open-text follow-up"
```

## Cross-skill composition

The four skills compose naturally with the existing catalog:

- `discover-market-sizing` feeds `develop-solution-brief` then `deliver-prd` (sizing informs scope).
- `discover-journey-map` feeds `define-problem-statement` and `define-hypothesis` (each pain point or moment of truth can become a problem statement).
- `discover-research-plan` feeds `measure-survey-analysis` (design the survey, then analyze it); `discover-interview-synthesis` is its qualitative complement.
- `define-prioritization-framework` consumes `define-opportunity-tree` and `define-hypothesis` output and feeds sprint-planning workflows.
- All four pair with `pm-critic` for adversarial review of assumptions, confidence labels, and sample realism.

## Migration guide

```
# Update path
/plugin marketplace update
/plugin update pm-skills

# After update, pm-skills reports v2.18.0 and the four new commands resolve.
```

Nothing existing changes. If you reference the catalog count in your own tooling, it is now 63 skills (70 slash commands).

## What does NOT change in v2.18.0

- All existing skills, their templates, examples, and commands are unchanged.
- Frontmatter structure (metadata-nested per v2.17.0) is unchanged; the four new skills use it.
- Workflows (12), sub-agent definitions (4), and cross-client dispatch behavior are unchanged.
- Doc-stack (Astro + Starlight) is unchanged.

## Affected areas

| Area | Change |
|---|---|
| `skills/` | 4 new phase skills (discover-market-sizing, define-prioritization-framework, discover-journey-map, measure-survey-analysis), each with SKILL.md + references/TEMPLATE.md + references/EXAMPLE.md. Catalog 59 to 63. |
| `commands/` | 4 new slash commands (`/market-sizing`, `/prioritization-framework`, `/journey-map`, `/survey-analysis`). Commands 66 to 70. |
| `library/skill-output-samples/` | 12 new thread-aligned samples (3 per skill across Brainshelf, Storevine, Workbench). |
| `AGENTS.md` | 4 new skill rows; aggregate counts refreshed. |
| `docs/skills/` (generated) | 4 new skill pages + refreshed phase indexes + commands reference. |
| `README.md` | Counts refreshed (59 to 63, 66 to 70, phase 26 to 30); new What's New row; corrected a mis-dated v2.10.0 history entry. |
| `.claude-plugin/plugin.json` + `marketplace.json` | Version 2.17.0 to 2.18.0; descriptions refreshed. |
