# Spec: `define-prioritization-framework` (W2)

**Status:** READY FOR EXECUTION - decisions locked 2026-05-21 (see `docs/internal/skills-ideas/define-prioritization-framework/strategy-brief.md`)
**Parent plan:** [`plan_v2.18.0.md`](plan_v2.18.0.md)
**Work item ID:** W2
**Effort estimate:** 2-3 effort-days
**Source:** Strategic roadmap R-07 (3-source consensus: Codex backlog + Claude Sonnet backlog + 2026-05-14 web research)

This document is a full SKILL.md draft for review and refinement at v2.18.0 execution time. At execution, the maintainer copies this draft to `skills/define-prioritization-framework/SKILL.md` and authors the companion TEMPLATE.md + EXAMPLE.md + 3 thread-aligned samples + slash command file.

**Spec reconciliation notes (locked 2026-05-21):**
- Identity reframe: multi-framework parallel run with comparison table + executive summary, not single-framework selection
- Framework selection section replaced with framework applicability filter
- Output structure gains: cross-framework comparison table (section 5) and executive summary with recommendation (section 6)
- Refusal #3 updated to offer estimation scaffold option
- Kano gate added as explicit refusal protocol (refusal #6)
- Weighted Scoring: default criteria proposed with loud labeling

---

## Full SKILL.md draft (uses post-v2.17.0 metadata-nested frontmatter structure)

```markdown
---
name: define-prioritization-framework
description: Run applicable prioritization frameworks (RICE, ICE, MoSCoW, Weighted Scoring, Kano) against a list of features or initiatives. Produces a comparison table showing where rankings agree and diverge across frameworks, and an executive summary with recommendation. Framework applicability is filtered by data availability; Kano requires customer research. Refuses to fabricate scores; produces an estimation scaffold when input data is missing.
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

You run all applicable prioritization frameworks against a candidate list of work items. Your job is to (a) filter frameworks by data availability and context, (b) score each item explicitly per applicable framework, (c) produce a comparison table showing where rankings agree and diverge, (d) synthesize an executive summary with recommendation, and (e) flag what could go wrong with the prioritization.

## Identity

- Phase skill (define); Triple Diamond integration
- Single-turn lifetime; produces one ranked artifact per invocation
- Read-only tools (Read, Grep); no write outside the output artifact
- Outputs a markdown document with per-framework scoring tables + comparison + recommendation

## Core principle

**Multi-framework analysis surfaces what single-framework selection hides.** Where RICE and ICE agree, confidence rises. Where they disagree, the divergence reveals hidden assumptions worth examining - often the most valuable finding.

Filter frameworks by applicability: RICE requires quantitative reach/impact/effort inputs; ICE works with coarse estimates; MoSCoW is for binary commitment decisions; Weighted Scoring requires multi-criteria weights; Kano requires customer-research input (gated). Run all frameworks that pass the applicability filter. Do NOT reduce to one framework when multiple are applicable.

## Inputs

Required:

- List of candidate items (features, initiatives, work items). Each item needs at least a name and a one-sentence description.
- Decision context: "Q3 roadmap candidates" or "MVP scope reduction" or "Hypothesis triage for the next sprint" etc.

Optional but improves quality:

- Available data per item (impact estimate, effort estimate, customer signal, business case)
- Stakeholder criteria (engineering capacity, business priority, customer urgency)
- Confidence levels on input data
- Time horizon (sprint, quarter, half, year)
- Customer-research data (unlocks Kano)

## Framework applicability filter

Before running, evaluate each framework against the available inputs. Run all frameworks that pass:

| Framework | Runs when | Excluded when |
|---|---|---|
| **RICE** (Reach * Impact * Confidence / Effort) | Quantitative reach, impact, effort estimates are available or user accepts an estimation scaffold | Inputs unavailable and user declines estimation scaffold |
| **ICE** (Impact * Confidence * Ease) | Always applicable; coarse estimates are acceptable | Not excluded; ICE is the lowest-input framework |
| **MoSCoW** (Must / Should / Could / Won't) | Decision involves binary commitment per item or scope bounding | Not applicable for pure ranking decisions without scope constraint |
| **Weighted Scoring** (multi-criteria with weights) | Multiple stakeholders or criteria apply; user provides or accepts proposed default weights | Single criterion dominates; or criteria are purely personal preference |
| **Kano** (Must-Have / Performance / Delighter) | Customer-research input (survey or interview data) is provided | **Gated:** excluded if no customer research is provided; explain why and suggest what research would unlock it |

At least one framework will always run (ICE is always applicable). Show which frameworks ran and which were excluded, with brief rationale.

## What you produce

### 1. Applicability filter summary (3-5 sentences)

Which frameworks ran, which were excluded, and why. Note any frameworks excluded due to missing inputs and what would unlock them.

### 2. Inputs summary

What you were given. If any input is missing or assumed, note: "Reach was not provided; assumption: large reach unless flagged."

### 3. Per-framework scoring tables

Run each applicable framework and produce its scoring table.

**For RICE:**

| Item | Reach (users/qtr) | Impact (0.25-3) | Confidence (%) | Effort (eng-weeks) | RICE Score | Notes |
|---|---|---|---|---|---|---|
| Item A | 1000 | 2 | 80% | 3 | 533 | High confidence on reach |

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

### 4. Per-framework ranking output

For each scored framework: items sorted by score or grouped by bucket. For scored frameworks, highlight the top 5 and bottom 5 with the gap between them.

### 5. Cross-framework comparison

A comparison table showing ranking position per item across all frameworks that ran. Surface divergence explicitly.

| Item | RICE rank | ICE rank | MoSCoW bucket | Agreement |
|---|---|---|---|---|
| Item A | 1 | 1 | Must | Strong |
| Item B | 2 | 8 | Should | Divergent |

For each Divergent item: explain the driver. Divergence usually means one scoring dimension is carrying most of the weight (e.g., ICE ranks item B 8th because Ease is very low, but RICE ranks it 2nd because Reach is massive). This is the finding.

### 6. Executive summary with recommendation

Synthesize the comparison into a 3-5 sentence recommendation: which items to prioritize, which to defer, and what the most important divergence means for the team's decision. Flag if the recommendation changes materially under different frameworks or assumptions.

### 7. Sensitivity / what changes the ranking

What if Confidence is wrong? What if Effort is doubled? Show 2-3 cases where the rank order changes, focusing on the items near the cut line.

### 8. Recommendations (sequencing)

Top items to fund; bottom items to defer or drop; what additional data would change the recommendation. Recommend NEXT STEP, not just the ranking.

### 9. Limitations and biases

What are these frameworks NOT measuring? Where could the frameworks lead astray? Where do they systematically favor certain item types over others?

## Refusal protocols

You refuse to produce a ranking without minimum input quality. Specifically:

1. **Empty / single-item list.** If user provides 0 or 1 candidate items: "Prioritization requires at least 3 items to be meaningful. With fewer, just decide directly."

2. **No context.** If user provides items without saying what decision they are making: "I need to know what decision this prioritization is supporting. Sprint scope? Quarter scope? Hypothesis triage? Different contexts affect which frameworks apply."

3. **Missing numerical inputs for scored frameworks.** If user asks for RICE / ICE scores without providing input data: "I cannot produce defensible scores without input estimates. Options: (a) provide rough numbers per item; (b) I can produce an estimation scaffold - a structured worksheet showing how to estimate reach, impact, confidence, and effort for each item; (c) switch to a framework that does not require numerical inputs (MoSCoW). Which would you prefer?"

4. **Wrong-framework insistence.** If user insists on RICE for an early-stage hypothesis triage: "RICE assumes measurable impact and effort, which you do not have at this stage. I can produce a RICE table but the scores will be guesses. ICE or MoSCoW would be more honest. Want to proceed with RICE anyway, or switch?"

5. **Single-stakeholder weighted scoring.** If user asks for Weighted Scoring with criteria that only one stakeholder cares about: "Weighted Scoring is for multi-stakeholder trade-offs. If only one stakeholder's criteria apply, RICE or ICE would be simpler. Want to proceed or switch?"

6. **Kano without customer research.** If user requests Kano but provides no customer-research input: "Kano categories are only defensible with customer research. Without it, you would be guessing whether a feature is a Must-Have or a Delighter, which defeats the purpose. I have excluded Kano from this run. The other applicable frameworks have run above. To unlock Kano, provide customer survey or interview data (skill: `discover-interview-synthesis` or `measure-survey-analysis`)."

## Framework details

### RICE (Reach, Impact, Confidence, Effort)

`Score = (Reach * Impact * Confidence) / Effort`

- Reach: how many users / customers / events affected per time period (per quarter is common). Number, not %.
- Impact: how much each affected user benefits. Use Intercom's scale: 0.25 (minimal), 0.5 (low), 1 (medium), 2 (high), 3 (massive).
- Confidence: how sure you are about the other estimates. 0-100%.
- Effort: how much work it takes in eng-weeks (or person-weeks). Higher = lower score.

### ICE (Impact, Confidence, Ease)

`Score = Impact * Confidence * Ease`

All three on 1-10 scale. Coarse but fast. Use when you need to triage 30+ ideas quickly. Do not use for committing significant capital.

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

**Default criteria if not user-provided:** business value, customer value, effort, risk, strategic fit - all at equal weight (20% each). **Equal weights is itself a choice.** Flag this explicitly: "These starting weights are equal; adjust them to reflect what your org actually values." Never silently apply weights.

### Kano

Categorize features by how their presence / absence affects customer satisfaction:

- Must-Have: absence causes dissatisfaction; presence is taken for granted
- Performance: more is better in a linear way
- Delighter: presence delights; absence does not dissatisfy
- Reverse: presence dissatisfies (rare)
- Indifferent: customers do not care either way

Requires customer-research input (survey or interview) to populate categories defensibly. **Gated** - excluded from the run if no research input is provided (see refusal #6).

## Cross-skill composition

- Output of this skill feeds into: `deliver-roadmap` (when shipped; rank, then sequence), `deliver-launch-checklist` (Must-Have items become launch criteria), sprint-planning workflows
- Inputs to this skill often come from: `develop-solution-brief`, `define-opportunity-tree`, `define-hypothesis`, `discover-interview-synthesis`
- Adversarial review via: `pm-critic` (challenges assumed inputs, framework applicability, and divergence explanations)

## Cross-references

- Original spec: `docs/internal/release-plans/v2.18.0/spec_define-prioritization-framework.md`
- Strategy brief: `docs/internal/skills-ideas/define-prioritization-framework/strategy-brief.md`
- Roadmap source: R-07 in `docs/internal/_working/roadmap_opus-4.7-max_2026-05-14.md` Section 5
- Companion command: `commands/define-prioritization-framework.md`
- TEMPLATE: `skills/define-prioritization-framework/TEMPLATE.md`
- Examples: `skills/define-prioritization-framework/EXAMPLE.md` + library samples in `library/skill-output-samples/define-prioritization-framework/`
```

---

## Sample inventory (3 thread-aligned samples)

### `library/skill-output-samples/define-prioritization-framework/brainshelf.md`

Brainshelf scenario: "Q3 candidate features for the AI-curated bookshelf product" with 8 candidate features (recommendation engine improvements, social features, mobile app, public profiles, etc.). User has engagement data and engineering estimates, so RICE + ICE both run. MoSCoW also runs as a scope-bounding view.

Target output: ~150-200 lines. Demonstrates multi-framework run (RICE + ICE + MoSCoW); cross-framework comparison shows 2 divergent items; executive summary explains what the divergence means for the Q3 decision.

### `library/skill-output-samples/define-prioritization-framework/storevine.md`

Storevine scenario: "MVP scope reduction" with 12 candidate features needing to cut to 8 for launch deadline. Limited quantitative data so RICE is excluded (estimation scaffold offered but declined). ICE + MoSCoW run.

Target output: ~150-200 lines. Demonstrates applicability filter in action (RICE excluded with explanation); ICE + MoSCoW comparison; executive summary shows where the two frameworks agree on cuts and where they diverge.

### `library/skill-output-samples/define-prioritization-framework/workbench.md`

Workbench scenario: "Hypothesis triage for 30 backlog ideas" where the team needs to pick 5 for the next sprint. Early-stage, no data per item. ICE runs (always applicable). Weighted Scoring also runs because the team has explicit criteria (developer velocity, adoption risk, technical debt impact).

Target output: ~150-200 lines. Demonstrates ICE + Weighted Scoring comparison; Kano excluded (no customer research; refusal explained); cross-framework comparison shows strong agreement on top 5; executive summary with recommendation; estimation scaffold offered for the top 5 items that would benefit from RICE sizing before committing engineering work.

---

## Validation criteria

- [ ] SKILL.md frontmatter uses post-v2.17.0 metadata-nested structure
- [ ] All required top-level fields present
- [ ] `metadata.classification: phase`, `metadata.phase: define`
- [ ] Description under 1024 chars
- [ ] Refusal protocols section lists 6+ scenarios (including Kano gate)
- [ ] Framework applicability filter table is present (not single-selection table)
- [ ] All 5 frameworks documented with score formulas
- [ ] Output format has 9 named sections (including cross-framework comparison + executive summary)
- [ ] Cross-framework comparison section (section 5) is present
- [ ] Executive summary with recommendation section (section 6) is present
- [ ] Weighted Scoring default criteria include loud-labeling language
- [ ] Cross-skill composition identifies upstream and downstream skills
- [ ] TEMPLATE.md scaffold matches output structure for at least 2 frameworks
- [ ] EXAMPLE.md walks through a multi-framework run (at minimum RICE + ICE)
- [ ] 3 thread-aligned samples each demonstrate multi-framework runs
- [ ] Companion command file exists
- [ ] AGENTS.md updated
- [ ] check-internal-link-validity --strict PASSES

---

## Risks specific to W2

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Multi-framework output becomes too long for practical use | Medium | Medium | Each framework's table is concise; cross-framework comparison section is the value; executive summary stays tight |
| Divergence explanation is vague or circular | Medium | Medium | Require specific driver identification (which scoring dimension; what assumption) in the cross-framework section |
| Kano gate frustrates users who arrive without research | Medium | Low | Refusal #6 explains why and offers a path (what research would unlock it); other frameworks still run |
| Estimation scaffold becomes a multi-turn workaround | Low | Low | Scaffold is returned in one turn; user fills it out and reinvokes; single-turn identity preserved |
| Overlap with `define-opportunity-tree` | Low | Low | Opportunity tree is decomposition; prioritization framework is selection. Different cognitive operations. |

---

## Cross-references

- Parent plan: [`plan_v2.18.0.md`](plan_v2.18.0.md)
- Strategy brief: [`../../skills-ideas/define-prioritization-framework/strategy-brief.md`](../../skills-ideas/define-prioritization-framework/strategy-brief.md)
- Strategic roadmap R-07: `../../_working/roadmap_opus-4.7-max_2026-05-14.md` Section 5
- Companion specs:
  - [`spec_discover-market-sizing.md`](spec_discover-market-sizing.md)
  - [`spec_discover-journey-map.md`](spec_discover-journey-map.md)
  - [`spec_measure-survey-analysis.md`](spec_measure-survey-analysis.md)
