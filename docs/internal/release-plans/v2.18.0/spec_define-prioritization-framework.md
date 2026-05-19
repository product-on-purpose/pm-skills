# Spec: `define-prioritization-framework` (W2)

**Status:** READY FOR EXECUTION (pending v2.17.0 ship)
**Parent plan:** [`plan_v2.18.0.md`](plan_v2.18.0.md)
**Work item ID:** W2
**Effort estimate:** 2-3 effort-days
**Source:** Strategic roadmap R-07 (3-source consensus: Codex backlog + Claude Sonnet backlog + 2026-05-14 web research)

This document is a full SKILL.md draft for review and refinement at v2.18.0 execution time. At execution, the maintainer copies this draft to `skills/define-prioritization-framework/SKILL.md` and authors the companion TEMPLATE.md + EXAMPLE.md + 3 thread-aligned samples + slash command file.

---

## Full SKILL.md draft (uses post-v2.17.0 metadata-nested frontmatter structure)

```markdown
---
name: define-prioritization-framework
description: Apply a structured prioritization framework (RICE, ICE, MoSCoW, Weighted Scoring, or Kano) to a list of features, initiatives, or candidate work items. Helps select the right framework based on context (data availability, decision type, team maturity), produces a scored / ranked output with explicit assumptions, sensitivity notes, and recommendation for sequencing. Refuses to fabricate scores without input data.
license: Apache-2.0
compatibility:
  - claude-code
  - codex-cli
  - cursor
  - windsurf
  - copilot-cli
  - gemini-cli
metadata:
  classification: phase
  version: 1.0.0
  updated: 2026-05-19
  phase: define
  subset_kind: phase
  category: planning
  frameworks:
    - triple-diamond
    - prioritization
  author: product-on-purpose
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Prioritization Framework

You apply a structured prioritization framework to a candidate list of work items. Your job is to (a) select the right framework for the context, (b) score each item explicitly, (c) produce a ranked output, and (d) flag what could go wrong with the prioritization.

## Identity

- Phase skill (define); Triple Diamond integration
- Single-turn lifetime; produces one ranked artifact per invocation
- Read-only tools (Read, Grep); no write outside the output artifact
- Outputs a markdown document with scoring table + sensitivity + recommendation

## Core principle

**The framework should fit the decision, not the other way around.** Different prioritization frameworks suit different contexts. RICE works when impact and effort are measurable. ICE works for early-stage hypothesis triage when data is sparse. MoSCoW works for scope-bounded releases. Weighted Scoring works when multiple stakeholders bring different criteria. Kano works when you need to distinguish must-have from delighter features.

You select the framework based on the user's context and the input data available. You do NOT default to RICE just because it's the most-cited framework. You explain your selection.

## Inputs

Required:

- List of candidate items (features, initiatives, work items). Each item needs at least a name and a one-sentence description.
- Decision context: "Q3 roadmap candidates" or "MVP scope reduction" or "Hypothesis triage for the next sprint" etc.

Optional but improves quality:

- Available data per item (impact estimate, effort estimate, customer signal, business case)
- Stakeholder criteria (engineering capacity, business priority, customer urgency)
- Confidence levels on input data
- Time horizon (sprint, quarter, half, year)

## Framework selection

You explicitly choose ONE framework based on the inputs. Show your reasoning. Default selection rules:

| Framework | When it fits | When it does NOT fit |
|---|---|---|
| **RICE** (Reach * Impact * Confidence / Effort) | Late-stage planning with measurable impact and effort estimates; team has data | Early-stage hypothesis triage; impact is unmeasurable; effort is unknown |
| **ICE** (Impact * Confidence * Ease) | Early-stage hypothesis triage; coarse estimates are OK; speed of decision matters | Late-stage planning; need defensible business case |
| **MoSCoW** (Must / Should / Could / Won't) | Scope-bounded release; binary commitment per item; communication to stakeholders | Continuous backlog grooming; when relative ranking matters more than commitment levels |
| **Weighted Scoring** (multi-criteria with weights) | Multiple stakeholders, multiple criteria, need to make the trade-off explicit | Single criterion dominates; or no stakeholder alignment on weights |
| **Kano** (Must-Have / Performance / Delighter) | Differentiating table-stakes from competitive-edge from wow-factor; customer-research-driven | Pure backlog prioritization without customer research signal |

If multiple frameworks fit, pick the one that's simplest for the user's context.

## What you produce

### 1. Framework selection rationale (3-5 sentences)

Which framework you chose, why, and what you'd switch to if context changes.

### 2. Inputs summary

What you were given. If any input is missing, you note: "Reach was not provided; assumption: large reach unless flagged."

### 3. Scoring table (depends on framework)

**For RICE:**

| Item | Reach (users/qtr) | Impact (0.25-3) | Confidence (%) | Effort (eng-weeks) | RICE Score | Notes |
|---|---|---|---|---|---|---|
| Item A | 1000 | 2 | 80% | 3 | 533 | High confidence on reach |
| ... | | | | | | |

**For ICE:**

| Item | Impact (1-10) | Confidence (1-10) | Ease (1-10) | ICE Score | Notes |
|---|---|---|---|---|---|

**For MoSCoW:**

| Item | Bucket | Rationale | Risk if dropped |
|---|---|---|---|
| Item A | Must | Critical for launch | Cannot ship without |

**For Weighted Scoring:**

| Item | Criterion 1 (weight) | Criterion 2 (weight) | ... | Total Weighted Score |
|---|---|---|---|---|

**For Kano:**

| Item | Category (Must / Performance / Delighter / Reverse / Indifferent) | Customer evidence | Implication |
|---|---|---|---|

### 4. Ranking output

Items sorted by score (or grouped by bucket for MoSCoW / Kano). If using a scored framework, show the top 5 and bottom 5 with the gap between them.

### 5. Sensitivity / what changes the ranking

What if Confidence is wrong? What if Effort is doubled? Show 2-3 cases where the rank order changes.

### 6. Recommendations (sequencing)

Top items to fund; bottom items to defer or drop; what additional data would change the recommendation. Recommend NEXT STEP, not just the ranking.

### 7. Limitations and biases

What is this framework NOT measuring? Where could the framework lead us astray?

## Refusal protocols

You refuse to produce a ranking without minimum input quality. Specifically:

1. **Empty / single-item list.** If user provides 0 or 1 candidate items: "Prioritization requires at least 3 items to be meaningful. With fewer, just decide directly."

2. **No context.** If user provides items without saying what decision they're making: "I need to know what decision this prioritization is supporting. Sprint scope? Quarter scope? Hypothesis triage? Different contexts pick different frameworks."

3. **Numerical fabrication request.** If user asks for RICE / ICE scores without providing input data: "I can't produce defensible scores without input estimates. Either provide rough numbers per item (reach, impact, confidence, effort) OR switch to a framework that doesn't require numerical inputs (MoSCoW or Kano)."

4. **Wrong-framework insistence.** If user insists on RICE for an early-stage hypothesis triage: "RICE assumes measurable impact and effort, which you don't have at this stage. I can produce a RICE table but the scores will be guesses. ICE or MoSCoW would be more honest. Want to proceed with RICE anyway, or switch?"

5. **Single-stakeholder weighted scoring.** If user asks for Weighted Scoring with criteria that ONLY one stakeholder cares about: "Weighted Scoring is for multi-stakeholder trade-offs. If only one stakeholder's criteria apply, RICE or ICE would be simpler. Want to proceed or switch?"

## Framework details

### RICE (Reach, Impact, Confidence, Effort)

`Score = (Reach * Impact * Confidence) / Effort`

- Reach: how many users / customers / events affected per time period (per quarter is common). Number, not %.
- Impact: how much each affected user benefits. Use Intercom's scale: 0.25 (minimal), 0.5 (low), 1 (medium), 2 (high), 3 (massive).
- Confidence: how sure you are about the other estimates. 0-100%.
- Effort: how much work it takes in eng-weeks (or person-weeks). Higher = lower score.

### ICE (Impact, Confidence, Ease)

`Score = Impact * Confidence * Ease`

All three on 1-10 scale. Coarse but fast. Use when you need to triage 30+ ideas in 10 minutes. Don't use for committing significant capital.

### MoSCoW (Must / Should / Could / Won't)

- Must have: required for launch / release / commitment
- Should have: important but not critical
- Could have: nice to include if time/budget permits
- Won't have (this time): explicitly out of scope

Strong commitment communication; weak relative ranking within buckets.

### Weighted Scoring

Multi-criteria with explicit weights per criterion.

`Score = Sum over criteria (Weight_i * Score_i)`

Use when stakeholders disagree on what matters. Make the disagreement explicit via the weights.

### Kano

Categorize features by how their presence/absence affects customer satisfaction:

- Must-Have: absence causes dissatisfaction; presence is taken for granted
- Performance: more is better in a linear way
- Delighter: presence delights; absence doesn't dissatisfy
- Reverse: presence dissatisfies (rare)
- Indifferent: customers don't care either way

Requires customer-research input (survey or interview) to populate categories defensibly.

## Cross-skill composition

- Output of this skill feeds into: `deliver-roadmap` (when shipped; rank, then sequence), `deliver-launch-checklist` (Must-Have items become launch criteria), sprint-planning workflows
- Inputs to this skill often come from: `develop-solution-brief`, `define-opportunity-tree`, `define-hypothesis`, `discover-interview-synthesis`
- Adversarial review via: `pm-critic` (challenges assumed inputs and framework choice)

## Cross-references

- Original spec: `docs/internal/release-plans/v2.18.0/spec_define-prioritization-framework.md`
- Roadmap source: R-07 in `docs/internal/_working/roadmap_opus-4.7-max_2026-05-14.md` Section 5
- Companion command: `commands/define-prioritization-framework.md`
- TEMPLATE: `skills/define-prioritization-framework/TEMPLATE.md`
- Examples: `skills/define-prioritization-framework/EXAMPLE.md` + library samples in `library/skill-output-samples/define-prioritization-framework/`
```

---

## Sample inventory (3 thread-aligned samples)

### `library/skill-output-samples/define-prioritization-framework/brainshelf.md`

Brainshelf scenario: "Q3 candidate features for the AI-curated bookshelf product" with 8 candidate features (recommendation engine improvements, social features, mobile app, public profiles, etc.). Use **RICE** because they have user-count data and engineering estimates.

Target output: ~150-200 lines. Demonstrates RICE table with 8 items; shows top 3 and bottom 3 with rationale; sensitivity on Reach estimates.

### `library/skill-output-samples/define-prioritization-framework/storevine.md`

Storevine scenario: "MVP scope reduction" with 12 candidate features (need to cut to 8 for the launch deadline). Use **MoSCoW** because the decision is binary commitment vs. defer.

Target output: ~150-200 lines. Demonstrates MoSCoW buckets with 12 items split (5 Must / 3 Should / 2 Could / 2 Won't); rationale per item; what triggers a Won't to be reconsidered.

### `library/skill-output-samples/define-prioritization-framework/workbench.md`

Workbench scenario: "Hypothesis triage for 30 backlog ideas" where the team needs to pick 5 for the next sprint. Use **ICE** because there's no data per item yet, just hypothesis-quality signal.

Target output: ~150-200 lines. Demonstrates ICE scoring on 30 items; top 5 highlighted; sensitivity on Confidence estimates; recommendation to spike the top 5 in research mode before committing engineering work.

---

## Validation criteria

- [ ] SKILL.md frontmatter uses post-v2.17.0 metadata-nested structure
- [ ] All required top-level fields present
- [ ] `metadata.classification: phase`, `metadata.phase: define`
- [ ] Description under 1024 chars
- [ ] Refusal protocols section lists 5+ scenarios
- [ ] Framework selection table is present and explicit
- [ ] All 5 frameworks (RICE, ICE, MoSCoW, Weighted Scoring, Kano) are documented with score formulas
- [ ] Output format has 7 named sections
- [ ] Cross-skill composition identifies upstream and downstream skills
- [ ] TEMPLATE.md scaffold matches output structure for at least 2 frameworks (RICE + MoSCoW recommended)
- [ ] EXAMPLE.md walks through a complete RICE worked example
- [ ] 3 thread-aligned samples covering 3 different frameworks (RICE / MoSCoW / ICE)
- [ ] Companion command file exists
- [ ] AGENTS.md updated
- [ ] check-internal-link-validity --strict PASSES

---

## Risks specific to W2

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Skill mis-selects framework (e.g., uses RICE for hypothesis triage) | Medium | Medium | Framework selection table is explicit; refusal protocol #4 catches insistence on wrong framework |
| RICE scoring produces wildly different results across invocations on same input | Medium | Medium | Refusal protocol #3 forces input estimates; sensitivity section bounds variance |
| Sample fabrication: scores feel made-up because no real data | High | Low | Each sample documents the "as if" data assumption; samples are illustrative |
| Overlap with `define-opportunity-tree` | Low | Low | Opportunity tree is decomposition; prioritization framework is selection. Different cognitive operations. |

---

## Cross-references

- Parent plan: [`plan_v2.18.0.md`](plan_v2.18.0.md)
- Strategic roadmap R-07: `../../_working/roadmap_opus-4.7-max_2026-05-14.md` Section 5
- Companion specs:
  - [`spec_discover-market-sizing.md`](spec_discover-market-sizing.md)
  - [`spec_discover-journey-map.md`](spec_discover-journey-map.md)
  - [`spec_measure-survey-analysis.md`](spec_measure-survey-analysis.md)
