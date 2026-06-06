# Specification: discover-market-sizing

## Overview

A discover-phase skill that guides PMs through structured market sizing using both top-down (TAM/SAM/SOM) and bottoms-up estimation approaches. Produces a market sizing analysis with explicit assumptions, confidence levels, sensitivity ranges, and a clear recommendation on market attractiveness. Fills a gap in the Discover phase - no existing skill covers quantitative market analysis.

## Skill Identity

| Field | Value |
|-------|-------|
| Name | discover-market-sizing |
| Phase | discover |
| Version | 1.0.0 |
| License | Apache-2.0 |
| Audience | Product Managers |

## Design Principles

### 1. Every Number Has an Assumption
Market sizing is only as credible as its assumptions. Every figure in the analysis must trace to an explicit assumption with a stated source (data, estimate, or inference). Unsourced numbers are flagged.

### 2. Two Approaches, One Answer
Top-down (TAM/SAM/SOM) and bottoms-up estimation should converge. If they diverge significantly, that's a signal - either the assumptions differ or the market definition is inconsistent. The skill requires both approaches and surfaces the gap.

### 3. Confidence Levels Prevent False Precision
A $500M TAM with a confidence range of $200M-$1.2B tells a very different story than $500M stated as fact. Every estimate gets a confidence level (high/medium/low) and a sensitivity range.

### 4. Bottoms-Up Grounds the Analysis
Top-down numbers are easy to inflate ("the global SaaS market is $200B"). Bottoms-up estimation forces specificity: how many customers can you actually reach, at what price, with what conversion rate? The skill weights bottoms-up as the primary reality check.

### 5. Actionable Conclusion, Not Just Numbers
The final output answers: "Is this market attractive enough to pursue?" with a clear recommendation tied to the analysis. Numbers without a conclusion are an exercise, not a decision input.

---

## File Architecture

```
skills/discover-market-sizing/
├── SKILL.md
└── references/
    ├── TEMPLATE.md
    └── EXAMPLE.md

commands/
└── market-sizing.md
```

### SKILL.md (~130-170 lines)

**Frontmatter:**
```yaml
name: discover-market-sizing
description: >-
  Guides PMs through structured market sizing using top-down (TAM/SAM/SOM)
  and bottoms-up estimation. Produces an analysis with explicit assumptions,
  confidence levels, sensitivity ranges, and a recommendation on market
  attractiveness.
phase: discover
version: "1.0.0"
updated: YYYY-MM-DD
license: Apache-2.0
metadata:
  category: research
  frameworks: [triple-diamond, lean-startup]
  author: product-on-purpose
```

**Sections:**

1. **When to Use** (~8 lines)
   - When evaluating a new market or opportunity for product investment
   - When building a business case that requires market size justification
   - When comparing multiple market opportunities to decide where to focus
   - When stakeholders or investors ask "how big is this market?"
   - When validating whether a niche is large enough to sustain a product

2. **When NOT to Use** (~5 lines)
   - For financial modeling or revenue forecasting (market sizing estimates addressable market, not projected revenue)
   - For competitive market share analysis (use `discover-competitive-analysis`)
   - For pricing strategy (market sizing informs pricing context but doesn't set prices)
   - When the market is well-established and published sizing data is readily available (just cite the source)

3. **Key Concepts** (~20 lines)
   - **TAM (Total Addressable Market)** - The total revenue opportunity if you captured 100% of the market. Theoretical ceiling. Defined by the broadest relevant market boundary.
   - **SAM (Serviceable Addressable Market)** - The portion of TAM you can actually reach with your product, distribution, and go-to-market. Narrowed by geography, segment, and product fit.
   - **SOM (Serviceable Obtainable Market)** - The realistic share of SAM you can capture in a defined time frame (typically 3-5 years). Narrowed by competition, resources, and execution capability.
   - **Bottoms-Up Estimation** - Building the market size from unit economics: (number of potential customers) x (average revenue per customer) x (realistic capture rate). The grounding check against top-down.
   - **Assumption Table** - Every number traces to a source. Sources are classified as: data (published research, internal analytics), estimate (industry expert, analogous market), or inference (logical derivation from other assumptions).

4. **Instructions** (~40 lines, numbered steps)
   1. **Define the market boundary** - What product category, customer segment, and geography? Be specific. "The project management software market" is too broad; "cloud-based project management for mid-market B2B SaaS companies in North America" is actionable.
   2. **Gather data sources** - Identify available data: industry reports, analyst estimates, public company filings, internal analytics, analogous markets. Document each source.
   3. **Calculate TAM (top-down)** - Start with the broadest relevant market figure. Document: source, year, methodology, and any adjustments made.
   4. **Narrow to SAM** - Apply filters: geography, segment, product type, distribution reach. Each filter is an assumption - document it.
   5. **Estimate SOM** - Apply realistic capture assumptions: competitive position, go-to-market resources, time frame. Document market share assumption and rationale.
   6. **Build bottoms-up estimate** - Calculate: (addressable customer count) x (average deal size) x (realistic penetration rate). Each factor is an explicit assumption.
   7. **Compare top-down and bottoms-up** - If they converge (within 2x), confidence increases. If they diverge (>3x), investigate: which assumptions differ? Reconcile or explain the gap.
   8. **Assign confidence levels** - Rate each estimate (TAM, SAM, SOM, bottoms-up) as high/medium/low confidence. Add sensitivity ranges (optimistic/base/pessimistic).
   9. **Build the assumption table** - Compile all assumptions with source type and confidence. This is the most reviewable artifact - stakeholders can challenge specific assumptions.
   10. **Write the recommendation** - "Is this market attractive enough to pursue?" Answer with: market size (SOM or bottoms-up), confidence level, key risks, and a go/no-go/investigate-further recommendation.

5. **Output Contract** (~5 lines)
   - References TEMPLATE.md as the output artifact
   - Minimum viable output: TAM/SAM/SOM estimates, bottoms-up estimate, assumption table, recommendation

6. **Quality Checklist** (~10 lines)
   - [ ] Market boundary is specific and defensible
   - [ ] Both top-down (TAM/SAM/SOM) and bottoms-up estimates are present
   - [ ] Every number traces to an assumption in the assumption table
   - [ ] Each assumption has a source type (data/estimate/inference)
   - [ ] Confidence levels are assigned to each major estimate
   - [ ] Sensitivity ranges show optimistic/base/pessimistic scenarios
   - [ ] Top-down and bottoms-up estimates are compared with gap analysis
   - [ ] Recommendation is explicit: go / no-go / investigate further

---

### references/TEMPLATE.md (~80-100 lines)

A reusable market sizing template. Sections:

1. **Frontmatter** - artifact name, version, created date, status
2. **Market Definition** - Product category, customer segment, geography, time frame, boundary justification
3. **Data Sources** - Table: source name, type (report/filing/internal/estimate), year, relevance notes
4. **Top-Down Analysis**
   - **TAM** - Figure, source, methodology, adjustments
   - **SAM** - Figure, filters applied (each an explicit assumption), resulting estimate
   - **SOM** - Figure, capture rate assumption, time frame, competitive context
5. **Bottoms-Up Analysis** - Customer count assumption, average revenue assumption, penetration rate assumption, resulting estimate
6. **Convergence Analysis** - Top-down vs. bottoms-up comparison, gap magnitude, explanation of divergence (if any)
7. **Assumption Table** - Table: assumption, value, source type (data/estimate/inference), confidence (high/medium/low), sensitivity impact
8. **Sensitivity Analysis** - Table: scenario (optimistic/base/pessimistic), TAM, SAM, SOM, bottoms-up, key driver of variation
9. **Recommendation** - Market attractiveness assessment, go/no-go/investigate, key risks, next steps

---

### references/EXAMPLE.md (~220-300 lines)

A worked example: **PM sizing the market for an AI-powered meeting notes product for mid-market B2B companies**.

Demonstrates:

1. **Market definition**
   - Specific boundary: AI meeting productivity tools for B2B companies with 100-2,000 employees in North America
   - Shows how overly broad definitions ("the AI market") are narrowed

2. **Top-down analysis**
   - TAM: starts with the global meeting productivity software market ($X.XB from analyst report)
   - SAM: filters to North America, mid-market, AI-specific tools
   - SOM: applies 3-year capture rate based on competitive landscape and GTM resources
   - Each step shows the assumption and source

3. **Bottoms-up analysis**
   - Addressable companies (from firmographic data) x average seats per company x annual price per seat x realistic penetration rate
   - Shows each factor as an explicit assumption

4. **Convergence analysis**
   - Top-down SOM: $45M; Bottoms-up: $38M - within 1.2x, good convergence
   - Notes that both estimates rely on the same penetration rate assumption

5. **Assumption table**
   - 8-10 assumptions with source types and confidence levels
   - Highlights the 2 assumptions with the most sensitivity impact

6. **Sensitivity analysis**
   - Optimistic/base/pessimistic table showing how the estimate shifts when the top 2 assumptions vary

7. **Recommendation**
   - "Investigate further" - market is attractive ($38-45M SOM) but penetration rate assumption needs validation through customer interviews
   - Specific next steps to increase confidence

---

### commands/market-sizing.md

```yaml
---
name: market-sizing
description: Size a market opportunity using TAM/SAM/SOM and bottoms-up estimation
skill: discover-market-sizing
---
```

Body: brief instruction to invoke the skill with the user's market or product opportunity context.

---

## Cross-Skill Dependencies

| Dependency | Type | Notes |
|------------|------|-------|
| discover-competitive-analysis | Complementary | Competitive analysis informs SOM capture rate assumptions |
| discover-stakeholder-summary | Complementary | Stakeholder context can inform market boundary decisions |

## Acceptance Criteria

1. **Given** a product opportunity description, **when** the skill is invoked, **then** the output contains both a top-down (TAM/SAM/SOM) and a bottoms-up estimate with explicit assumptions for each.

2. **Given** a completed analysis where top-down SOM and bottoms-up estimates diverge by more than 3x, **when** the convergence analysis is written, **then** the skill identifies which assumptions differ and explains the gap.

3. **Given** an analysis with 8 assumptions, **when** the assumption table is generated, **then** every assumption has a source type (data/estimate/inference) and a confidence level (high/medium/low).

4. **Given** a completed market sizing, **when** the recommendation is written, **then** it contains an explicit go/no-go/investigate-further verdict with supporting rationale.

5. **Given** a market definition that is overly broad (e.g., "the SaaS market"), **when** the skill processes it, **then** it prompts the user to narrow the boundary before proceeding with estimation.
