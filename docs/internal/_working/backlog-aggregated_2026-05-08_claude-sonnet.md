# PM-Skills: Aggregated Prioritized Backlog

> **Date**: 2026-05-08 | **Author**: Claude Sonnet 4.6
> **Status**: Working reference - update as items ship or priorities shift
> **Active work stream**: v2.14.0 Starlight migration (in progress - do not block on this backlog)

---

## Sources Synthesized

| Source | Date | Model | Perspective |
|--------|------|-------|-------------|
| `distilled/04_next-efforts.md` | 2026-03-21/22 | Claude Opus 4.6 | Canonical execution backlog (v2.6 era) |
| `distilled/01_executive-brief_v2.md` | 2026-03-22 | Claude Opus 4.6 | Strategic framing |
| `distilled/02_action-plan_v2.md` | 2026-03-22 | Claude Opus 4.6 | Phase sequencing |
| `distilled/03_notable-repos-and-tools_v2.md` | 2026-03-22 | Claude Opus 4.6 | Reference catalog |
| `distilled/review-cycle_distilled-v2.md` | 2026-03-22 | Claude Opus 4.6 + Codex | Multi-model review of planning docs |
| `distilled/review-skill_overview.md` | 2026-03-22 | Claude Opus 4.6 | Multi-model review skill design |
| `_NOTES/ideas/claude_2026-03-30_pm-skills-next-investments.md` | 2026-03-30 | Claude Opus 4.6 | Investment priorities (v2.7 era) |
| `_NOTES/ideas/ai-chat_claude_2026-04-15_pm-skills-gaps-and-innovation-utilities.md` | 2026-04-15 | Claude Opus 4.6 | Gap analysis + exponential ideas |
| `_NOTES/ideas/chatgpt_deep-research-report.md` | 2026-04-04 | GPT-5.2 Thinking | Deep audit + curriculum angle |
| `_NOTES/ideas/ai-chat_chatgpt_2026-06-06_pm_skills_gap_analysis_and_prioritized_recommendations.md` | 2026-06-06 | ChatGPT | Visual + communication utility layer |

---

## What Is Already Shipped (as of v2.13.1)

The following items appear as recommendations in source docs but are already delivered and excluded from the backlog below.

**Phase skills (26 total)**: All Triple Diamond phase skills through accept-criteria, edge-cases, launch-checklist, prd, release-notes, user-stories, dashboard-requirements, experiment-design, experiment-results, instrumentation-spec, lessons-log, pivot-decision, refinement-notes, retrospective, plus discover/define/develop completions.

**Foundation skills (8)**: persona, lean-canvas, okr-writer, meeting-agenda, meeting-brief, meeting-recap, meeting-synthesize, stakeholder-update.

**Utility skills (6)**: pm-skill-builder, pm-skill-validate, pm-skill-iterate, mermaid-diagrams, slideshow-creator, update-pm-skills.

**Infrastructure**: CI validation (lint-skills-frontmatter, validate-commands, validate-agents-md, check-mcp-impact), release packaging boundary, AGENTS.md sync, convention alignment sweeps.

---

## How to Read This Backlog

**Tiers**: A (do next) > B (high value, queue after A) > C (medium value, plan when capacity opens) > D (low urgency, exploratory).

**Types**: `NEW-SKILL` `UTILITY` `EXTENSION` `INFRA` `BUNDLE` `MOONSHOT`

**Consensus**: High (3+ sources), Medium (2 sources), Single (1 source).

Items within a tier are ordered by impact-to-effort ratio. Effort estimates are in effort-days for a single contributor.

---

## Tier A: Do Next (Infrastructure + Planned Domain Skills)

These are either already-designed items from the canonical backlog or quick-win infrastructure that unblocks community scaling. None require significant new design work.

---

### A1. Anthropic Marketplace Submission
**Type**: INFRA | **Effort**: 30 min (human-only, no engineering) | **Consensus**: High

**What**: Submit pm-skills to the Anthropic official plugin directory (`anthropics/claude-plugins-official`). Also submit to `hesreallyhim/awesome-claude-code` and `Claude Plugin Hub`.

**Why now**: Highest visibility-to-effort ratio of any item. Plugin is already compliant. Every day it is not listed is missed discovery. Several sources independently flag this as the highest-ROI action.

**Human decisions needed**:
- Confirm plugin name (permanent once submitted)
- Write 50-100 word directory description
- Provide contact email
- Write 3+ example use cases

**Done when**: Form submitted at `clau.de/plugin-directory-submission` (or in-app at `claude.ai/settings/plugins/submit`); confirmation received.

---

### A2. `discover-market-sizing` (NEW SKILL)
**Type**: NEW-SKILL | **Effort**: 2-3 days | **Consensus**: High

**What**: Structured market sizing skill covering TAM/SAM/SOM, bottoms-up estimation, assumption logging, and scenario modeling.

**Why now**: Already fully specified (04_next-efforts.md Effort 7, GitHub Issue #118). Independent of all other work. Fills the single biggest quantitative gap in the Discover phase. High frequency for early-stage and strategic PM work.

**Standard deliverables**: SKILL.md + TEMPLATE.md + EXAMPLE.md + command + AGENTS.md entry.

**Done when**: Skill passes CI validation, tested with 2+ sizing scenarios.

---

### A3. `measure-survey-analysis` (NEW SKILL)
**Type**: NEW-SKILL | **Effort**: 2-3 days | **Consensus**: High

**What**: Survey results analysis skill with persona segmentation, hypothesis validation, thematic clustering, and prioritized recommendations.

**Why now**: Already specified (04_next-efforts.md Effort 8, GitHub Issue #119). Independent. Extends Measure phase beyond A/B experiments into broader research analysis. Complements `measure-experiment-results`.

**Standard deliverables**: SKILL.md + TEMPLATE.md + EXAMPLE.md + command + AGENTS.md entry.

**Done when**: Skill passes CI validation, tested with NPS-style and qualitative survey scenarios.

---

### A4. Release Automation Enhancement
**Type**: INFRA | **Effort**: 2+ days | **Consensus**: High

**What**: Extend existing tag-triggered release workflow with: (1) version-tag validation against `.claude-plugin/plugin.json`, (2) improved release notes generation, (3) automated MCP sync dispatch to pm-skills-mcp.

**Why now**: Reduces maintainer toil on every release. MCP parity drifts grow with each manual release. GPT audit independently flagged this; original backlog has it as Effort 5.

**Human decisions needed**: Automate MCP sync dispatch? (Requires PAT secret for cross-repo dispatch.)

**Key scripts to create/update**: `scripts/validate-version-match.sh/.ps1`, enhanced `release.yml`, receiving workflow in pm-skills-mcp.

**Done when**: Tag push auto-creates GitHub release with improved notes; version mismatch blocks release; MCP sync PR auto-created.

---

### A5. Community Contribution Setup
**Type**: INFRA | **Effort**: 1-2 days | **Consensus**: High

**What**: `.github/ISSUE_TEMPLATE/skill-proposal.yml`, PR template (`PULL_REQUEST_TEMPLATE.md`), `CONTRIBUTING.md` update, and auto-label workflow for skill PRs.

**Why now**: Marketplace listing (A1) will drive new users. The builder skills are in place. Community scaling is the next bottleneck. GPT deep-research explicitly tracked this as GitHub Issue #117 with a 1-effort-day estimate.

**Human decisions needed**: Require issue approval before PR? (Recommendation: yes, prevents wasted effort.)

**Done when**: A hypothetical external contributor can go from idea to issue to PR to merge following the published docs.

---

## Tier B: High-Value Domain Expansion

These fill structural gaps in the Triple Diamond content layer. Multiple independent sources identify these as the highest-value missing PM skill areas.

---

### B1. `define-prioritization-framework` (NEW SKILL)
**Type**: NEW-SKILL | **Effort**: 2-3 days | **Consensus**: High

**What**: Structured prioritization skill supporting RICE, ICE, MoSCoW, Weighted Scoring, and Kano models. Helps PM select the right framework based on context (data availability, team maturity, decision type). Output: scored/ranked table with framework rationale.

**Why it matters**: Prioritization is the most common daily PM activity and has no representation in the 26 phase skills. It sits structurally between discovery ("what could we do?") and delivery ("what will we do?"). Three sources independently flag this gap. Phuryn/pm-skills covers it; pm-skills does not.

**Likely phase**: Define or Develop.

---

### B2. `discover-journey-map` (NEW SKILL)
**Type**: NEW-SKILL | **Effort**: 2-3 days | **Consensus**: High

**What**: Customer/user journey mapping skill with stages, touchpoints, emotional curve, pain points, moment-of-truth identification, and opportunity annotations. Composes naturally with `utility-mermaid-diagrams` for visual output.

**Why it matters**: Discover phase has 3 skills (competitive-analysis, interview-synthesis, stakeholder-summary). Journey mapping is a core discovery artifact that feeds problem-statement, hypothesis, and PRD. This is the biggest phase content gap remaining. March 2026 analysis flags it as highest-value Tier 1 addition.

---

### B3. `develop-pre-mortem` / `develop-risk-register` (NEW SKILL)
**Type**: NEW-SKILL | **Effort**: 1-2 days | **Consensus**: High

**What**: Structured pre-mortem analysis ("imagine the project has failed -- what went wrong?") and risk register with mitigations and owners.

**Why it matters**: Risk management is conspicuously absent from all 26 phase skills. Pre-mortems are one of the highest-ROI PM activities (low effort, high insight). Both Phuryn and Dean Peters ship pre-mortem skills - this is a parity gap. April 2026 analysis flagged it as Tier 2 high-value.

**Options**: Ship as a single `develop-pre-mortem` skill with an optional risk-register output section, or as two distinct skills.

---

### B4. `develop-product-vision` / Strategy Canvas (NEW SKILL)
**Type**: NEW-SKILL | **Effort**: 2-3 days | **Consensus**: High

**What**: Skill for articulating product vision ("what the world looks like when we succeed") and a lightweight strategy canvas connecting vision to target users, value proposition, differentiators, and success measures.

**Why it matters**: This is the "north star" artifact that every Triple Diamond artifact traces back to. The framework assumes a vision exists but never helps create one. April 2026 analysis flagged as Tier 2; Phuryn ships `vision-statement` and `strategy-canvas`. Pairs naturally with okr-writer (foundation).

**Likely phase**: Define (pre-diamond strategic framing).

---

### B5. `deliver-gtm-brief` (NEW SKILL)
**Type**: NEW-SKILL | **Effort**: 2 days | **Consensus**: Medium

**What**: Lightweight go-to-market brief covering positioning, messaging, launch channels, success metrics, and enablement needs.

**Why it matters**: Deliver phase currently focuses on engineering handoff (PRD, stories, edge cases, launch-checklist, release-notes). GTM bridges to marketing/sales. High frequency for PMs at growth-stage companies. The `release-notes` skill covers comms but not strategic marketing layer.

---

### B6. `discover-research-plan` (NEW SKILL)
**Type**: NEW-SKILL | **Effort**: 2 days | **Consensus**: Medium

**What**: Research plan skill for designing user research studies, surveys, or interview campaigns. Pairs naturally with `measure-survey-analysis` (A3).

**Why it matters**: `measure-survey-analysis` handles analysis but not study design. GPT deep-research noted the "survey design" gap alongside the survey analysis spec. Rounds out the research lifecycle.

---

## Tier C: Utility Layer Expansion

These are horizontal utility skills that multiply the value of the existing 26 phase skills. The mermaid-diagrams and slideshow-creator utilities already shipped; this tier extends the utility layer significantly.

---

### C1. `utility-executive-summary-generator` (UTILITY)
**Type**: UTILITY | **Effort**: 1-2 days | **Consensus**: High

**What**: Compresses any pm-skills artifact (or multi-artifact set) into a leadership-ready 1-pager with key decisions, risks, and asks. Supports single-artifact summaries AND multi-artifact roll-ups (e.g., problem-statement + hypothesis + PRD into one exec brief).

**Why it matters**: Highest daily-use utility gap. The #1 PM complaint: "I built the artifact, now I need to present it to leadership in 2 minutes." All three AI model reviews independently identify this. Multiplies value of every existing phase skill.

---

### C2. `utility-slide-storyline-builder` (UTILITY)
**Type**: UTILITY | **Effort**: 1-2 days | **Consensus**: High

**What**: Turns any source artifact into a presentation narrative with audience-specific framing, key message per slide, narrative arc, and ask/decision needed. Distinct from `utility-slideshow-creator` which generates slide content -- this skill generates the storyline structure first.

**Why it matters**: PMs often need narrative structure more than raw slide text. Storyline quality determines whether slides persuade or merely inform. ChatGPT gap analysis recommends this as one of the exact first four visual-layer skills.

**Note**: Complements rather than replaces the existing `slideshow-creator`. The sequence is: storyline-builder (narrative arc) > slideshow-creator (slide content).

---

### C3. `utility-artifact-transformer` (UTILITY)
**Type**: UTILITY | **Effort**: 2-3 days | **Consensus**: High

**What**: Converts one artifact type into another or into a coordinated set. Core transformations: PRD to user stories, PRD to deck outline, retro to action plan, experiment-results to stakeholder update, architecture note to diagram + risks.

**Why it matters**: PMs rarely create just one artifact from a planning session. The same initiative usually needs multiple synchronized outputs. This turns the library from a loose skill collection into a workflow engine. ChatGPT analysis rates this as Priority 2 after visual communication layer.

---

### C4. `utility-artifact-readiness-reviewer` (UTILITY)
**Type**: UTILITY | **Effort**: 2 days | **Consensus**: High

**What**: Assesses whether an artifact is ready for its intended use. Modes: exec-ready, stakeholder-ready, engineering-ready, design-ready, experimentation-ready. Produces completeness score, ambiguity flags, and specific improvement suggestions. Does NOT auto-fix; it diagnoses.

**Why it matters**: Generated artifacts are often plausible but incomplete. `pm-skill-validate` validates skill structure; this validates artifact quality for human consumption. Increases trust and practical usefulness. Complements existing utility-pm-skill-validate which focuses on skill files, not generated artifacts.

---

### C5. `utility-agent-skill-builder` (UTILITY)
**Type**: UTILITY | **Effort**: 3-5 days | **Consensus**: High

**What**: General PM capability for creating agent skills in any context (team tools, product workflows, any platform), following the agentskills.io spec without pm-skills-specific conventions. Distinct from `utility-pm-skill-builder` which is repo-specific.

**Why it matters**: Creating agent skills is becoming a modern PM activity. Teaches PMs to customize their AI toolchains for their specific context. Already specified as Phase 3 item (Effort 2 from 04_next-efforts.md; GitHub Issue #120). Soft dependency on pm-skill-builder proving the pattern first (already shipped).

---

### C6. `utility-audience-adapter` (UTILITY)
**Type**: UTILITY | **Effort**: 1 day | **Consensus**: Medium

**What**: Takes any artifact and re-frames it for a specific audience (exec, engineering, design, sales, customer). Adjusts depth, vocabulary, and emphasis. Input: artifact + target audience. Output: reframed version.

**Why it matters**: Visual and document output must differ for executives, PM peers, engineering, and external stakeholders. High daily-use. Complements executive-summary-generator (C1) for more targeted audience framing.

---

### C7. `utility-assumption-extractor` (UTILITY)
**Type**: UTILITY | **Effort**: 1 day | **Consensus**: Medium

**What**: Scans any document and surfaces implicit assumptions, flags risk level, and suggests validation methods for each. Pairs naturally with the `define-hypothesis` skill.

**Why it matters**: Implicit assumptions in PM artifacts are a leading cause of planning failures. Making them explicit converts hope into testable bets. April 2026 analysis rates this as a high-value quality + review utility.

---

### C8. `utility-briefing-pack-builder` (UTILITY)
**Type**: UTILITY | **Effort**: 2 days | **Consensus**: Medium

**What**: Produces a leadership-ready package from a single initiative input. Potential outputs: one-page memo, executive summary, slide outline, diagram, FAQ, decision log.

**Why it matters**: "Initiative operating pack" use case. ChatGPT analysis identifies this as second-wave utility. Composes with executive-summary-generator (C1), artifact-transformer (C3), and mermaid-diagrams (shipped).

---

## Tier D: Ecosystem, Integration, and Strategic Expansions

These require more design work or longer-term investment. High potential value but lower urgency relative to Tiers A-C.

---

### D1. Curriculum / Learning Paths
**Type**: INFRA | **Effort**: 3-6 days for MVP | **Consensus**: High (GPT deep-research primary)

**What**: `curriculum/` directory with role-based and goal-based learning paths, each with a skill sequence, practice lab, and rubric. MVP target: 2 starter paths (Feature Delivery; Experimentation) with 1 project lab + rubric each.

**Why it matters**: GPT deep-research identifies this as the single biggest structural differentiator vs. comparable open resources. The difference between "a useful library" and "a curriculum that compounds value." Enables meaningful onboarding and positions pm-skills for community growth.

**Suggested MVP structure**:
```
curriculum/
  README.md
  learning-paths/
    feature-delivery/SYLLABUS.md + RUBRIC.md + labs/
    experimentation/SYLLABUS.md + RUBRIC.md + labs/
```

---

### D2. `utility-update-doc` / Living Document Mode
**Type**: UTILITY | **Effort**: 2-3 days | **Consensus**: Medium

**What**: Takes an existing pm-skills artifact and a set of changes (new information, stakeholder feedback, updated scope) and produces a revised version with a change log. Supports additive, corrective, and scoping update modes.

**Why it matters**: PM artifacts are living documents. Current skills generate v1 of everything but provide no guidance on iteration. This transforms pm-skills from "generate once" to "living document" system. April 2026 analysis flagged as high-value Tier 2 item. Already identified in earlier roadmap as `/update-doc`.

---

### D3. `utility-link-docs` / Traceability Mapper
**Type**: UTILITY | **Effort**: 2-3 days | **Consensus**: Medium

**What**: Scans a set of pm-skills artifacts and generates a traceability map showing how they connect (e.g., problem-statement -> hypothesis -> PRD -> user-stories -> experiment-design). Output: Mermaid relationship graph or markdown table. Composes with `utility-mermaid-diagrams`.

**Why it matters**: Traceability is the core promise of the Triple Diamond framework but it is not visualized today. Makes the framework's value proposition tangible and auditable. April 2026 analysis rates as high-value with soft dependency on mermaid-diagrams (now shipped).

---

### D4. Delivery System Integration Guides
**Type**: INFRA | **Effort**: 2-4 days per integration | **Consensus**: Medium

**What**: "How to use pm-skills output with [tool]" guides for: Jira/Linear (stories + acceptance criteria to tickets), Notion/Confluence (PRD templates), GitHub Issues (user stories + ACs). GPT deep-research identified this as the highest-value toolchain integration category.

**Why it matters**: Bridges generated artifacts into actual execution. The biggest gap between pm-skills and real PM workflows is the last-mile: getting structured output into the tools teams use daily.

**Note**: This may be guide-only (docs) rather than skill-based, depending on MCP capabilities at the time of execution.

---

### D5. `discover-customer-journey` Bundle
**Type**: BUNDLE | **Effort**: 0.5 days (once component skills ship) | **Consensus**: Medium

**What**: New workflow bundle chaining: `discover-interview-synthesis` -> `discover-journey-map` (B2) -> `foundation-persona` -> `define-problem-statement` -> `define-opportunity-tree`. Serves PMs in early-stage discovery and aligns with Teresa Torres' Continuous Discovery Habits.

**Dependency**: Requires B2 (`discover-journey-map`) to ship first.

---

### D6. `develop-product-strategy` Bundle
**Type**: BUNDLE | **Effort**: 0.5 days (once component skills ship) | **Consensus**: Medium

**What**: New workflow bundle chaining: `develop-product-vision` (B4) -> `foundation-okr-writer` -> `discover-competitive-analysis` -> `discover-stakeholder-summary`. Serves annual/quarterly planning cycles.

**Dependency**: Requires B4 (`develop-product-vision`) to ship first.

---

### D7. Public `GOVERNANCE.md` + `ROADMAP.md`
**Type**: INFRA | **Effort**: 0.5 days | **Consensus**: Medium (GPT deep-research)

**What**: Lightweight public governance file explaining maintainer/reviewer/contributor roles. Public ROADMAP.md with Now/Next/Later structure. Both are contributor-facing complements to the existing `docs/internal/` governance.

**Why it matters**: GPT deep-research recommends a `governance/` directory separate from `docs/internal/`. These files reduce onboarding friction for potential contributors and signal project maturity to the ecosystem.

---

### D8. `utility-comparison-matrix` (UTILITY)
**Type**: UTILITY | **Effort**: 1 day | **Consensus**: Single (April 2026 analysis)

**What**: Generates structured comparison tables (features, vendors, options, tradeoffs) from any evaluative content. Good for ADRs, competitive analysis, tool selection.

---

### D9. README Structural Improvements
**Type**: INFRA | **Effort**: 0.5 days | **Consensus**: Medium (GPT deep-research)

**What**: Four targeted README improvements: (1) "Choose your path" section near top (plugin install vs ZIP vs MCP vs submodule); (2) Skills Index Table extracted from AGENTS.md with "use when" column; (3) Contributor quickstart pointing to pm-skill-builder; (4) Curriculum section once D1 ships.

**Note**: These are lower priority now that the v2.14 Starlight migration will give docs a complete structural overhaul.

---

## Tier E: Exponential / Moonshot Ideas

These are not near-term work items. They are innovation directions that could fundamentally change what pm-skills is. Document here to avoid losing them.

---

### E1. Interactive Skill Mode (Coach Mode)
**What**: Add a `mode: interactive` flag to skills that makes them conversational. The skill asks the PM clarifying questions, challenges weak assumptions, pushes back on vague metrics, and builds the artifact through dialogue. This is the difference between a template and a coach.
**Source**: April 2026 analysis (Claude Ops 4.6)
**Signal**: High potential differentiation; medium complexity. No direct competitor ships this.

---

### E2. Skill Lens Mode (Analysis on Existing Docs)
**What**: Instead of creating new artifacts, apply a skill as an analysis lens on an existing document. Upload a PRD and run `/hypothesis --lens` to extract implicit hypotheses. Run `/edge-cases --lens` on a PRD to surface missing coverage. Inverts the skill direction from "generate" to "critique."
**Source**: April 2026 analysis (Claude Opus 4.6)
**Signal**: High leverage. Addresses the "I already have a doc" use case that current skills do not serve.

---

### E3. Skill Composition Engine / Pipeline
**What**: Define a YAML/Markdown pipeline spec where skill outputs chain automatically. Input context flows forward; each skill receives the accumulated artifact set. Think `pipeline.yaml` that says "Run problem-statement, feed output to hypothesis, feed both to prd." The agent reads the pipeline and orchestrates.
**Source**: April 2026 analysis (Claude Opus 4.6)
**Signal**: High value, medium adoption complexity. Evolves workflows from documentation into executable programs.

---

### E4. Initiative Compiler
**What**: User provides one initiative brief and the system compiles: problem-statement, PRD, epic and stories, Mermaid diagrams, deck outline, launch plan, stakeholder memo, FAQ.
**Source**: ChatGPT gap analysis
**Signal**: Changes the repo from a skill library into a productized PM generation system. Requires all Tier C utilities to exist first.

---

### E5. Multi-Reviewer Critique Board
**What**: Every major artifact is critiqued from several role personas: engineering, design, data, GTM, compliance, executive. Approximates real organizational review before socialization.
**Source**: April 2026 analysis (Claude Opus 4.6) + ChatGPT gap analysis
**Signal**: Leverages Claude's multi-agent and persona capabilities. High differentiation.

---

### E6. Evidence-Backed Recommendation Mode
**What**: For each major recommendation, produce: supporting evidence, confidence level, counterarguments, missing evidence, and assumptions. Moves the repo closer to decision support, not just content generation.
**Source**: ChatGPT gap analysis + April 2026 analysis
**Signal**: Increases trust for strategic PM work. Would require MCP integrations for live data.

---

### E7. Domain-Specific Skill Overlays
**What**: Ship overlay packs for specific product domains: B2B SaaS, marketplace products, internal platform teams, regulated products, AI products. Overlays adjust language, framework emphasis, and example scenarios for each domain.
**Source**: ChatGPT gap analysis
**Signal**: Increases practical relevance and defensibility. Relatively low engineering effort (content work). Defers until core library is stable.

---

### E8. "PM Skills Certification" Open Track
**What**: Multi-week curriculum with graded artifacts, capstone project, and a public rubric. Optionally community-reviewed badge process.
**Source**: GPT deep-research
**Signal**: Category-defining if executed well. Requires stable curriculum layer (D1) and contribution flow first.

---

## Consolidated Priority View

| # | Item | Type | Tier | Effort | Consensus |
|---|------|------|------|--------|-----------|
| A1 | Marketplace submission | INFRA | A | 30 min | High |
| A2 | `discover-market-sizing` | NEW-SKILL | A | 2-3 d | High |
| A3 | `measure-survey-analysis` | NEW-SKILL | A | 2-3 d | High |
| A4 | Release automation enhancement | INFRA | A | 2+ d | High |
| A5 | Community contribution setup | INFRA | A | 1-2 d | High |
| B1 | `define-prioritization-framework` | NEW-SKILL | B | 2-3 d | High |
| B2 | `discover-journey-map` | NEW-SKILL | B | 2-3 d | High |
| B3 | `develop-pre-mortem` | NEW-SKILL | B | 1-2 d | High |
| B4 | `develop-product-vision` | NEW-SKILL | B | 2-3 d | High |
| B5 | `deliver-gtm-brief` | NEW-SKILL | B | 2 d | Medium |
| B6 | `discover-research-plan` | NEW-SKILL | B | 2 d | Medium |
| C1 | `utility-executive-summary-generator` | UTILITY | C | 1-2 d | High |
| C2 | `utility-slide-storyline-builder` | UTILITY | C | 1-2 d | High |
| C3 | `utility-artifact-transformer` | UTILITY | C | 2-3 d | High |
| C4 | `utility-artifact-readiness-reviewer` | UTILITY | C | 2 d | High |
| C5 | `utility-agent-skill-builder` | UTILITY | C | 3-5 d | High |
| C6 | `utility-audience-adapter` | UTILITY | C | 1 d | Medium |
| C7 | `utility-assumption-extractor` | UTILITY | C | 1 d | Medium |
| C8 | `utility-briefing-pack-builder` | UTILITY | C | 2 d | Medium |
| D1 | Curriculum / learning paths | INFRA | D | 3-6 d | High |
| D2 | `utility-update-doc` | UTILITY | D | 2-3 d | Medium |
| D3 | `utility-link-docs` | UTILITY | D | 2-3 d | Medium |
| D4 | Delivery system integration guides | INFRA | D | 2-4 d ea | Medium |
| D5 | Customer Discovery Bundle | BUNDLE | D | 0.5 d | Medium |
| D6 | Product Strategy Bundle | BUNDLE | D | 0.5 d | Medium |
| D7 | Public GOVERNANCE.md + ROADMAP.md | INFRA | D | 0.5 d | Medium |
| D8 | `utility-comparison-matrix` | UTILITY | D | 1 d | Single |
| D9 | README structural improvements | INFRA | D | 0.5 d | Medium |
| E1-E8 | Exponential / moonshot ideas | Various | E | TBD | Various |

---

## Dependency Chain

```
Marketplace submission (A1) - independent, do immediately

Release automation (A4)
  -> MCP sync parity maintained on each release

Community contribution (A5)
  -> requires existing CI (already shipped)
  -> unlocks external contributions

Domain skills (A2, A3, B1-B6) - all independent of each other

Executive summary (C1) - independent
Slide storyline (C2) - independent
Artifact transformer (C3) - independent
Artifact readiness reviewer (C4) - independent
Agent skill builder (C5) - soft dependency on pm-skill-builder (shipped)
Audience adapter (C6) - independent
Assumption extractor (C7) - independent
Briefing pack builder (C8) - composes with C1, utility-mermaid-diagrams (shipped)

Curriculum MVP (D1) - independent, pure docs
Update-doc (D2) - independent
Link-docs (D3) - composes with utility-mermaid-diagrams (shipped)
Customer Discovery Bundle (D5) - requires B2 (journey-map) to ship first
Product Strategy Bundle (D6) - requires B4 (product-vision) to ship first

Moonshots (E) - most require Tier C utilities to exist first
```

---

## Context for v2.14 and Beyond

The active v2.14.0 work stream is Starlight migration (doc stack only - no new skills or infrastructure). Once Starlight ships:

1. **First priority**: A1 (marketplace submission) + A2/A3 (planned domain skills). These are already specced and can execute immediately after migration.
2. **Second wave**: A4 + A5 (infrastructure hardening) to enable community scaling.
3. **Third wave**: B-tier domain skills to fill the strategy and workflow gaps. B1 (prioritization) and B2 (journey-map) have the highest cross-source consensus.
4. **Utility layer**: C-tier utilities after B-tier domain skills establish whether transformation and review patterns work in practice.

---

*Notes on items excluded from this backlog: `discover-stakeholder-communication-plan` (light extension of stakeholder-summary - handle as a skill update, not a new skill), `utility-raci-generator` (narrow use case), `utility-glossary-builder` (low frequency), `utility-meeting-prep` (superceded by meeting skills family that shipped in v2.11.0), PM career skills (outside artifact-generation core value prop), multi-language translations (low value at current adoption scale).*
