# Topic 4A — Roadmap: Individual PM Skills

> **Date**: 2026-03-21
> **Author**: Claude Opus 4.6
> **Status**: Draft — prioritized skill roadmap
> **Scope**: Individual skills that need to be created or improved
> **Companion**: `topic-4_roadmap_platform-level.md`

---

## Table of Contents

1. [Current State Assessment](#1-current-state-assessment)
2. [Evaluation Framework](#2-evaluation-framework)
3. [New Skills: Prioritized Backlog](#3-new-skills-prioritized-backlog)
4. [Existing Skills: Improvement Priorities](#4-existing-skills-improvement-priorities)
5. [Phase Coverage Analysis](#5-phase-coverage-analysis)
6. [Recommended Execution Sequence](#6-recommended-execution-sequence)

---

## 1. Current State Assessment

### 1.1 Current Library (25 Skills)

| Phase | Skills | Count | Coverage Assessment |
|-------|--------|-------|-------------------|
| Discover | competitive-analysis, interview-synthesis, stakeholder-summary | 3 | Moderate — missing survey analysis, market sizing |
| Define | hypothesis, jtbd-canvas, opportunity-tree, problem-statement | 4 | Strong — core PM definition covered |
| Develop | adr, design-rationale, solution-brief, spike-summary | 4 | Good — technical decisions well covered |
| Deliver | edge-cases, launch-checklist, prd, release-notes, user-stories | 5 | Strong — core delivery well covered |
| Measure | dashboard-requirements, experiment-design, experiment-results, instrumentation-spec | 4 | Good — experimentation covered, analytics gaps |
| Iterate | lessons-log, pivot-decision, refinement-notes, retrospective | 4 | Strong — reflection well covered |
| Foundation | persona | 1 | Just started — enormous expansion potential |
| Utility | (none shipped) | 0 | Empty — skill-builder is first candidate |

### 1.2 Existing Bundles (3 Workflows)

| Bundle | Skills Chained | Coverage |
|--------|---------------|----------|
| feature-kickoff | problem-statement → hypothesis → prd → user-stories → launch-checklist | Core feature delivery |
| triple-diamond | Full 6-phase sequence | Complete lifecycle |
| lean-startup | hypothesis → experiment-design → experiment-results → pivot-decision | Rapid validation |

---

## 2. Evaluation Framework

Each skill is evaluated across 7 dimensions:

| Dimension | Description | Scale |
|-----------|-------------|-------|
| **Value** | How much does this help PMs make better decisions? | 1-5 (5 = critical) |
| **Need** | How often do PMs encounter this task? | 1-5 (5 = daily) |
| **Frequency** | How often would this skill be invoked per project? | 1-5 (5 = multiple times) |
| **Complexity** | How hard is the task without AI assistance? | 1-5 (5 = very hard) |
| **Token/Context** | How token-efficient is the skill? | 1-5 (5 = very efficient) |
| **Differentiation** | How unique is this vs. general Claude capability? | 1-5 (5 = highly unique) |
| **Ecosystem Fit** | How well does this integrate with existing skills? | 1-5 (5 = perfect fit) |

**Priority Score** = (Value × 2) + Need + Frequency + Complexity + Token + Differentiation + Ecosystem

---

## 3. New Skills: Prioritized Backlog

### Tier 1: High Priority — Build Next

#### 3.1 `utility-pm-skill-builder` (Meta/Utility)

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Value | 5 | Enables community growth, reduces onboarding |
| Need | 3 | Every new skill creation or revision |
| Frequency | 2 | Per-skill, not per-project |
| Complexity | 5 | 8 knowledge domains to coordinate |
| Token/Context | 4 | Focused workflow, progressive loading |
| Differentiation | 5 | No generic alternative for pm-skills |
| Ecosystem Fit | 5 | Foundation for all future skills |
| **Priority Score** | **34** | |

**Why build this first**: Foundation for everything else. Every future skill benefits from a builder.

#### 3.2 `utility-project-manager` (Utility)

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Value | 5 | Solves artifact sprawl — the #1 pain point |
| Need | 5 | Every PM session |
| Frequency | 5 | Multiple times per session (switch, status) |
| Complexity | 3 | Directory management + state |
| Token/Context | 5 | Lightweight context loading |
| Differentiation | 5 | No existing solution |
| Ecosystem Fit | 5 | Enables all skills to be project-aware |
| **Priority Score** | **38** | |

**Why build this next**: Highest daily value. Makes every other skill more useful.

#### 3.3 `foundation-skill-builder` (Foundation)

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Value | 4 | Helps PMs build skills for any context |
| Need | 2 | When PMs want to encode team workflows |
| Frequency | 1 | Occasionally |
| Complexity | 4 | Skill design requires structured thinking |
| Token/Context | 4 | Focused workflow |
| Differentiation | 5 | PM-oriented skill design (not developer-oriented) |
| Ecosystem Fit | 4 | Complements pm-skill-builder |
| **Priority Score** | **28** | |

**Why build this**: Turns PMs from skill consumers into skill creators.

---

### Tier 2: Medium Priority — Build After Tier 1

#### 3.4 `measure-survey-analysis` (Domain/Measure)

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Value | 4 | Quantitative research is a PM gap |
| Need | 3 | After running surveys (quarterly) |
| Frequency | 2 | Per survey |
| Complexity | 4 | Statistical analysis + PM context |
| Token/Context | 3 | Data-heavy, may need large context |
| Differentiation | 4 | PM-specific analysis framing |
| Ecosystem Fit | 4 | Complements experiment-design |
| **Priority Score** | **28** | |

#### 3.5 `discover-market-sizing` (Domain/Discover)

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Value | 4 | Critical for new product/market decisions |
| Need | 3 | New markets, business cases |
| Frequency | 1 | Per initiative |
| Complexity | 5 | Requires structured estimation frameworks |
| Token/Context | 4 | Framework-driven, not data-heavy |
| Differentiation | 4 | TAM/SAM/SOM + bottoms-up estimation |
| Ecosystem Fit | 4 | Feeds into problem-statement and PRD |
| **Priority Score** | **29** | |

#### 3.6 `utility-doc-updater` (Utility)

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Value | 5 | Solves "start over" problem |
| Need | 4 | Every time new info comes in |
| Frequency | 4 | Multiple times per project |
| Complexity | 4 | Intelligent merge is hard |
| Token/Context | 3 | Must load original + new info |
| Differentiation | 5 | No existing update mechanism |
| Ecosystem Fit | 5 | Enables document evolution |
| **Priority Score** | **35** | |

#### 3.7 `deliver-acceptance-criteria` (Domain/Deliver)

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Value | 4 | Precise AC reduces rework |
| Need | 4 | Every user story needs AC |
| Frequency | 4 | Per story, many per sprint |
| Complexity | 3 | Structured but not complex |
| Token/Context | 5 | Lightweight per invocation |
| Differentiation | 3 | Generic Claude can do this, but structure helps |
| Ecosystem Fit | 5 | Directly extends user-stories |
| **Priority Score** | **32** | |

#### 3.8 `define-value-proposition` (Domain/Define)

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Value | 4 | Aligns team on "why this product" |
| Need | 3 | Per product/initiative |
| Frequency | 1 | Once per initiative |
| Complexity | 4 | Requires customer + competitive insight |
| Token/Context | 4 | Framework-driven |
| Differentiation | 4 | Value Prop Canvas, positioning statement |
| Ecosystem Fit | 4 | Feeds into hypothesis and PRD |
| **Priority Score** | **28** | |

---

### Tier 3: Lower Priority — Build When Capacity Allows

#### 3.9 `discover-data-analysis` (Domain/Discover)

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Value | 3 | Useful for data-informed decisions |
| Need | 3 | When analytics data is available |
| Frequency | 2 | Per analysis cycle |
| Complexity | 4 | Requires analytical framework |
| Token/Context | 2 | Data-heavy, context-expensive |
| Differentiation | 3 | Claude does analysis well natively |
| Ecosystem Fit | 3 | Feeds into problem-statement |
| **Priority Score** | **24** | |

#### 3.10 `develop-api-specification` (Domain/Develop)

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Value | 3 | Useful for platform PMs |
| Need | 2 | Platform products only |
| Frequency | 1 | Per API surface |
| Complexity | 3 | Structured but specific audience |
| Token/Context | 3 | Moderate |
| Differentiation | 3 | OpenAPI spec is well-known |
| Ecosystem Fit | 3 | Extends PRD for technical teams |
| **Priority Score** | **21** | |

#### 3.11 `iterate-feature-audit` (Domain/Iterate)

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Value | 3 | Useful for feature portfolio management |
| Need | 2 | Quarterly |
| Frequency | 1 | Quarterly |
| Complexity | 3 | Review framework |
| Token/Context | 3 | Feature inventory can be large |
| Differentiation | 3 | Structured review adds value |
| Ecosystem Fit | 3 | Complements retrospective |
| **Priority Score** | **21** | |

#### 3.12 `foundation-stakeholder-map` (Foundation)

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Value | 3 | Extends stakeholder-summary with visual mapping |
| Need | 2 | Project kickoff |
| Frequency | 1 | Per initiative |
| Complexity | 2 | Structured but simple |
| Token/Context | 5 | Lightweight |
| Differentiation | 3 | RACI + influence mapping |
| Ecosystem Fit | 4 | Extends stakeholder-summary |
| **Priority Score** | **23** | |

#### 3.13 `utility-process-transcript` (Utility)

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Value | 4 | Closes the input → insight gap |
| Need | 3 | After every meeting/interview |
| Frequency | 3 | Weekly |
| Complexity | 5 | NLP extraction + multi-doc routing |
| Token/Context | 2 | Transcripts are large |
| Differentiation | 4 | PM-specific insight extraction |
| Ecosystem Fit | 4 | Feeds into update-doc |
| **Priority Score** | **29** | |

---

## 4. Existing Skills: Improvement Priorities

### 4.1 Highest-Impact Improvements

| Skill | Improvement | Value | Effort |
|-------|-------------|-------|--------|
| `deliver-prd` | Add quick mode for simple features | High | Low |
| `deliver-prd` | Add revision mode (update existing PRD) | Very High | Medium |
| `deliver-user-stories` | Auto-detect PRD and load as context | High | Medium |
| `foundation-persona` | Add persona library integration | Medium | Medium |
| `discover-competitive-analysis` | Add web search integration (agent) | High | Medium |
| `iterate-retrospective` | Add team sentiment analysis | Medium | Low |
| `measure-experiment-design` | Add power analysis framework | Medium | Low |

### 4.2 Convention Alignment Pass

All 25 skills should be audited against current conventions:

| Check | Likely Issues | Effort |
|-------|--------------|--------|
| Frontmatter completeness | Older skills may lack `metadata.frameworks` | Low |
| Description quality | Some descriptions may be too short or vague | Low |
| TEMPLATE.md guidance comments | Older templates may lack inline guidance | Medium |
| EXAMPLE.md completeness | Some examples may be truncated | Medium |
| Output contract presence | Older skills may lack explicit output contracts | Medium |

This audit is exactly what `/skill-builder audit` would do — another reason to build the skill-builder first.

---

## 5. Phase Coverage Analysis

### 5.1 Coverage Heat Map

```
Phase      Core Tasks     Skills  Coverage  Gaps
───────────────────────────────────────────────────────────────
Discover   Research,       3/5    ████░░    survey analysis,
           understand                       market sizing

Define     Frame,          4/5    █████░    value proposition
           hypothesize

Develop    Specify,        4/5    █████░    api specification
           decide                           (niche audience)

Deliver    Build,          5/5    ██████    (well covered)
           ship

Measure    Test,           4/5    █████░    survey analysis
           evaluate

Iterate    Reflect,        4/5    █████░    feature audit
           learn                            (low priority)

Foundation Cross-cutting   1/3    ██░░░░    skill-builder,
                                            stakeholder-map

Utility    Repo tools      0/3    ░░░░░░    pm-skill-builder,
                                            project-manager,
                                            doc-updater
```

### 5.2 Key Finding

**The biggest value gap is in Utility and Foundation skills**, not in the domain phases. The domain phases are 70-90% covered for core PM tasks. The utility infrastructure (project management, document updates, skill building) is 0% covered and would multiply the value of everything else.

**Implication**: Build utility skills before adding more domain skills.

---

## 6. Recommended Execution Sequence

### 6.1 Priority-Ordered Execution

| Order | Skill | Type | Score | Dependencies |
|-------|-------|------|-------|-------------|
| 1 | `utility-pm-skill-builder` | Utility | 34 | CI validation pipeline |
| 2 | `utility-project-manager` | Utility | 38 | None |
| 3 | `utility-doc-updater` | Utility | 35 | project-manager |
| 4 | `foundation-skill-builder` | Foundation | 28 | pm-skill-builder (for design) |
| 5 | `deliver-acceptance-criteria` | Domain | 32 | None |
| 6 | `discover-market-sizing` | Domain | 29 | None |
| 7 | `utility-process-transcript` | Utility | 29 | project-manager, doc-updater |
| 8 | `measure-survey-analysis` | Domain | 28 | None |
| 9 | `define-value-proposition` | Domain | 28 | None |
| 10 | Convention alignment pass | All | N/A | pm-skill-builder (for audit) |

### 6.2 Phased Delivery

**Release v2.7** (next release):
- CI validation pipeline (foundation for quality)
- `utility-pm-skill-builder` (enables community contributions)

**Release v2.8**:
- `utility-project-manager` (multi-project support)
- `deliver-acceptance-criteria` (quick win for delivery phase)

**Release v2.9**:
- `utility-doc-updater` (document evolution)
- `foundation-skill-builder` (PM skill design for any context)

**Release v3.0**:
- `discover-market-sizing` (new domain skill)
- `measure-survey-analysis` (new domain skill)
- `utility-process-transcript` (transcript processing)
- Convention alignment pass across all skills
- Full platform integration (hooks, agents, output styles)
