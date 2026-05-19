---
title: pm-skills Strategic Roadmap (Opus 4.7 max-effort synthesis)
description: Deep analysis of the current pm-skills repo combined with 2026 PM-domain, plugin-ecosystem, and Claude Code platform research. Produces a prioritized roadmap of the most valuable additions across new skills, sub-agents, hooks, plugin features, curriculum, integrations, and quality systems.
date: 2026-05-14
author: Claude Opus 4.7 (max effort)
status: working draft for maintainer review
audience: pm-skills maintainers, v2.16+ planners
related:
  - docs/internal/_working/backlog-aggregated_2026-05-08_codex.md
  - docs/internal/_working/backlog-aggregated_2026-05-08_claude-sonnet.md
  - docs/internal/_working/subagents/subagent-strategy_2026-05-07.md
  - docs/internal/_working/subagents/subagent-implementation-plan_2026-05-10.md
  - docs/internal/release-plans/v2.15.0/plan_v2.15.0.md
---

# pm-skills Strategic Roadmap

> **Synthesis of:** repo state at v2.14.2 + locked v2.15.0 plan + two May 8 aggregated backlogs (Codex, Claude Sonnet) + two sub-agent strategy docs + 2026 web research on Claude Code platform, competitive PM-skills repos, and skill-ecosystem patterns.

## How to Read This Document

This is a strategic roadmap, not a release plan. Items here become release plans only when the maintainer commits to a specific cycle.

The document is organized into ten sections:

1. **Executive summary** - the five highest-leverage moves and why
2. **Current state** - what we ship today, what is locked in v2.15.0
3. **Strategic themes** - seven themes that organize the rest of the roadmap
4. **Master prioritized table** - one-line summary of every recommended item
5. **P0 items** - ship-next priorities with full detail
6. **P1 items** - high-leverage near-term investments
7. **P2 items** - coverage and quality expansion
8. **P3 items** - longer horizon and ecosystem bets
9. **Per-release shaping** - what fits in v2.16.0, v2.17.0, v2.18.0+
10. **Open decisions, anti-patterns, and risks**

**Severity grammar.** This roadmap uses **P0/P1/P2/P3** because (a) it matches what the repo already uses in `pre-execution-review.md` and (b) 2026 web research confirms it as the converging standard for both code and natural-language adversarial review (BMAD, OpenAI Codex review prompts, multi-model adversarial code review).

---

## 1. Executive Summary

### The five highest-leverage moves

1. **Ship the AI-Native PM Pack (eval-suite spec + prompt-RFC + model card + AI failure-mode catalog).** Web research confirmed this is the single largest white-space in the 2026 PM-skills landscape. Phuryn does not ship it. Dean Peters does not ship it. Anthropic's official `knowledge-work-plugins/product-management` does not ship it. The EU AI Act enforcement window (August 2026) makes the model card a compliance artifact, not just a nice-to-have. Both backlog docs missed this entirely because they were synthesized before the AI Evals topic crystallized in the PM community. **This is the most defensible position pm-skills can stake out in 2026.**

2. **Ship `pm-critic` as the first sub-agent (v2.16.0).** Single file, 1-3 day effort, no companion infrastructure required. Codifies the Phase 0 Adversarial Review Loop the maintainer already runs manually. Unlocks adversarial review for any PM artifact at any time. The May 7 sub-agent strategy doc and the May 10 implementation plan are both ready; nothing further needs designed before execution.

3. **Pair every generator skill with a paired reviewer.** Web research showed the converging community pattern: `prd` + `prd-review`, `hypothesis` + `hypothesis-review`, etc. This is more durable than a generic "artifact-readiness reviewer" utility because each reviewer can encode artifact-specific quality contracts. Implement progressively, starting with the highest-stakes artifacts (PRD, OKR, problem-statement). `pm-critic` is the cross-cutting fallback; paired reviewers are the durable specialization.

4. **Add the four highest-consensus missing PM skills before opening any new strategic initiatives.** Cross-checking Codex + Sonnet + research yields four items with three-source consensus: `discover-market-sizing`, `measure-survey-analysis`, `define-prioritization-framework`, `discover-journey-map`. Already specified to ship-quality in the existing backlogs. Roughly 8-10 effort-days total. Each is independent of the others and of v2.15.0 sprint skills.

5. **Move proprietary frontmatter under `metadata:` for spec compliance.** The agentskills.io specification was released as an open standard on December 18, 2025 and is now adopted by 12+ tools (Codex CLI, Gemini CLI, Cursor, Windsurf, Cline, Copilot, etc.). Top-level fields like `phase:`, `classification:`, `version:`, `updated:` should move under `metadata:` to pass canonical validators. This is a one-time sweep with high portability payoff. Ship as v2.16.0 cleanup tax alongside the AI-Native Pack.

### Strategic posture in one paragraph

pm-skills today is a strong **content library** (40 skills across the Triple Diamond plus foundation and utility classifications). It has zero **active orchestration** (zero sub-agents, zero hooks, no executable workflows). The 2026 ecosystem has matured to the point where active orchestration is the next obvious investment: hooks observe events, sub-agents do work, and YAML-declared workflow chains run end-to-end. Combined with an AI-Native PM Pack to claim the biggest 2026 content gap, this gives pm-skills a clear differentiation story: not just "more skills than the competition" but "a coherent operating system for AI-augmented product management."

---

## 2. Current State and Active Work

### 2.1 What ships today (v2.14.2)

| Surface | Count | Notes |
|---------|-------|-------|
| Skills | 40 | 26 Triple Diamond phase + 8 foundation + 6 utility |
| Slash commands | ~45 | One per skill, plus a few wrappers |
| Workflow docs | 9 | Prose chains in `_workflows/` |
| CI validators | ~24 (14 enforcing) | Frontmatter, command paths, AGENTS.md sync, family contract, etc. |
| Sub-agents | 0 | None shipped |
| Hooks | 0 | None shipped |
| Output styles | 0 | None shipped |
| MCP server | 1 (companion repo) | `pm-skills-mcp` in maintenance mode (M-22) |
| Family contracts | 1 | Meeting Skills Family v1.1.0 |
| Family validators | 1 pair (sh + ps1) | `validate-meeting-skills-family.*` |
| Doc stack | Astro Starlight | Migrated in v2.14.0 |
| Library samples | 120 | 3 thread-aligned per meeting skill, etc. |
| Plugin marketplace | submitted | Anthropic acceptance status not verified from internal docs |

### 2.2 What is locked for v2.15.0

The current cycle ships:

- **15 new tool-classification skills**: 7 `tool-foundation-sprint-*` + 7 `tool-design-sprint-*` + 1 `tool-note-and-vote` standalone
- **3 new workflows**, **15 commands**, **45 samples**, **2 user guides**, **2 concept docs**
- **2 family contracts** (`foundation-sprint-skills`, `design-sprint-skills`) plus matching family validators
- New `classification: tool` value (architectural amendment 2026-05-13)
- Skill count target: 40 to 55

This roadmap **does not** propose changes to v2.15.0 scope. The amendments are locked. All recommendations target v2.16.0 and later.

### 2.3 What is explicitly outside this roadmap

- **Knowledge OS work** stays separated per 2026-03-21 decision
- **MCP server unfreeze** (M-22) stays in maintenance mode unless a security incident or P0 dependency forces revisit
- **v2.16.0 deferrals already declared in master plan**: tags-as-feature, URL slug normalization, Astro 6 + Node 22.12+, sync-agents-md.yml full rewrite. These are sequenced in v2.16.0 plan stub regardless of this roadmap.

---

## 3. Strategic Themes

The recommendations below cluster into seven themes. Each theme is its own coherent investment thesis; not every theme needs to ship in every cycle.

### Theme A: AI-Native PM (the 2026 differentiator)

The single biggest content gap. PMs of AI products need eval suites, model cards, prompt specs, AI failure-mode catalogs, AI guardrails specs. No competing PM-skills repo ships any of these. The EU AI Act August 2026 enforcement makes model cards compliance-required for high-risk AI products. **Owning this category is the most defensible move in the 2026 landscape.**

### Theme B: Active Orchestration Layer

Sub-agents, hooks, and executable workflow chains turn the library from a passive content store into an operating system. The May 7-10 sub-agent docs already chart the path; the work is execution, not design. Hooks are the missing nervous system; sub-agents are the muscles. YAML-declared workflows are the spinal cord.

### Theme C: Generator+Reviewer Pairing

Every generator skill ships paired with a reviewer that knows the artifact's quality contract. P0/P1/P2/P3 severity. Paired reviewers are more durable than a single generic readiness-reviewer because they encode artifact-specific knowledge that scales with the library.

### Theme D: Lineage, Freshness, and Living Documents

PM artifacts are living documents that evolve as inputs change. Add lineage metadata (`derived_from`, `produces`), freshness signals (`generated_at`, `inputs_hash`), delta-aware regeneration, and traceability visualization. The 2026 emerging standard (Cloudflare Artifacts, EU AI Act traceability metadata) is converging toward provenance-as-default.

### Theme E: Curriculum and Pedagogy

Convert the 40-skill catalog into a learning system with structured paths (role-based, goal-based, project-based), labs, and rubrics. GPT deep-research called this the single biggest structural differentiator vs. comparable open resources. Adopt Dean Peters' "every skill teaches the human while executing" rule.

### Theme F: Spec Compliance and Multi-LLM Portability

agentskills.io is now an open standard adopted by 12+ tools. Move proprietary frontmatter under `metadata:`, audit `compatibility:` declarations, ship a portability test that runs skills on Codex/Cursor/Gemini. Top-level proprietary fields are an emerging anti-pattern.

### Theme G: Distribution and Community Scaling

The marketplace submission, contributor funnel, public governance/roadmap, and skill-proposal templates are all operational hygiene that compounds. None require new design. All are blocking external scaling.

### Theme map at a glance

```
Theme A: AI-Native PM ........... biggest 2026 content gap (defensible position)
Theme B: Active Orchestration ... biggest 2026 architecture gap (the missing layer)
Theme C: Reviewer Pairing ....... biggest quality multiplier
Theme D: Lineage + Living Docs .. biggest emerging standard
Theme E: Curriculum ............. biggest adoption multiplier
Theme F: Spec + Portability ..... biggest hygiene investment
Theme G: Distribution ........... biggest visibility lever
```

---

## 4. Master Prioritized Table

One row per recommended item. Items ordered by priority within type. Effort is in effort-days for a single contributor familiar with the repo. Sources column shows which inputs (Codex backlog `[C]`, Sonnet backlog `[S]`, Sub-agent strategy `[A]`, Sub-agent implementation `[I]`, Web research `[W]`) flagged each item.

### P0 - Ship next (after v2.15.0 cycle completes)

| ID | Item | Type | Theme | Effort | Sources |
|----|------|------|-------|--------|---------|
| R-01 | `measure-eval-suite-spec` | NEW SKILL | A | 3-4 d | W |
| R-02 | `develop-prompt-spec` (or `develop-prompt-rfc`) | NEW SKILL | A | 2-3 d | W |
| R-03 | `develop-model-card` | NEW SKILL | A | 2-3 d | W |
| R-04 | `pm-critic` sub-agent + `/pm-critic` command + adversarial-review guide | SUB-AGENT | B | 2-4 d | A, I |
| R-05 | Frontmatter metadata sweep (move proprietary fields under `metadata:`) | INFRA | F | 1-2 d | W |
| R-06 | `discover-market-sizing` | NEW SKILL | content | 2-3 d | C, S, W |
| R-07 | `define-prioritization-framework` | NEW SKILL | content | 2-3 d | C, S, W |
| R-08 | Skill proposal funnel + CONTRIBUTING update + auto-label workflow | INFRA | G | 1-2 d | C, S |
| R-09 | Marketplace submission follow-through + external-presence checklist | INFRA | G | 0.5 d | C, S |

### P1 - Near-term high-leverage

| ID | Item | Type | Theme | Effort | Sources |
|----|------|------|-------|--------|---------|
| R-10 | `discover-journey-map` | NEW SKILL | content | 2-3 d | C, S, W |
| R-11 | `measure-survey-analysis` | NEW SKILL | content | 2-3 d | C, S |
| R-12 | `develop-pre-mortem` (with optional risk-register) | NEW SKILL | content | 1-2 d | C, S, W |
| R-13 | `develop-product-vision` + Strategy Canvas | NEW SKILL | content | 2-3 d | C, S, W |
| R-14 | `develop-ai-failure-mode-catalog` | NEW SKILL | A | 1-2 d | W |
| R-15 | `develop-rollout-plan` (feature-flag progressive rollout) | NEW SKILL | content | 2 d | W |
| R-16 | `pm-release-conductor` sub-agent + `/pm-release` + runbook doc | SUB-AGENT | B | 3-4 d | A, I |
| R-17 | `pm-changelog-curator` sub-agent + `/pm-draft-changelog` | SUB-AGENT | B | 1-2 d | A, I |
| R-18 | `pm-skill-auditor` sub-agent + `/pm-audit-repo` | SUB-AGENT | B | 2 d | A, I |
| R-19 | Generator+reviewer pairing for top 5 highest-stakes artifacts (PRD, OKR set, hypothesis, problem-statement, persona) | NEW SKILL pattern | C | 5-7 d | W |
| R-20 | `utility-executive-summary-generator` | UTILITY | content | 1-2 d | C, S |
| R-21 | `deliver-roadmap` (outcome-oriented) | NEW SKILL | content | 2-3 d | C, S, W |
| R-22 | `deliver-gtm-brief` | NEW SKILL | content | 2 d | C, S |
| R-23 | `discover-research-plan` | NEW SKILL | content | 2 d | C, S |
| R-24 | PostToolUse hook: validate frontmatter on Edit/Write to skills | HOOK | B | 1 d | W |
| R-25 | Lineage frontmatter pilot (`derived_from`, `produces`, `generated_at`) on 5 highest-traffic skills | INFRA | D | 1-2 d | W |

### P2 - Coverage and quality expansion

| ID | Item | Type | Theme | Effort | Sources |
|----|------|------|-------|--------|---------|
| R-26 | `foundation-press-release` (Amazon Working Backwards) | NEW SKILL | content | 2 d | W |
| R-27 | `foundation-workshop-facilitation` | NEW SKILL | content | 2 d | W |
| R-28 | `discover-jtbd-job-stories` (alternative to user-stories) | NEW SKILL | content | 1-2 d | W |
| R-29 | `develop-api-contract-spec` (platform PM) | NEW SKILL | content | 2 d | W |
| R-30 | `deliver-deprecation-plan` (sunset/EOL) | NEW SKILL | content | 1-2 d | W |
| R-31 | `measure-activation-loop-spec` (PLG) | NEW SKILL | content | 2 d | W |
| R-32 | `utility-artifact-transformer` (PRD to stories+deck+diagram) | UTILITY | content | 2-3 d | C, S |
| R-33 | `utility-slide-storyline-builder` | UTILITY | content | 1-2 d | C, S, W |
| R-34 | `utility-audience-adapter` | UTILITY | content | 1 d | C, S |
| R-35 | `utility-assumption-extractor` | UTILITY | content | 1 d | C, S |
| R-36 | `utility-claim-evidence-mapper` | UTILITY | content | 2 d | C |
| R-37 | `utility-agent-skill-builder` (cross-context) | UTILITY | content | 3-5 d | C, S |
| R-38 | `pm-frontmatter-doctor` sub-agent | SUB-AGENT | B | 2 d | A, I |
| R-39 | Curriculum MVP (2 paths + 2 labs + 2 rubrics) | INFRA | E | 3-6 d | C, S, W |
| R-40 | Public `GOVERNANCE.md` + `ROADMAP.md` | INFRA | G | 0.5 d | S, W |
| R-41 | `discover-survey-design` (pairs with R-11) | NEW SKILL | content | 2 d | C |
| R-42 | YAML-declarative workflow promotion (one workflow first: Feature Kickoff) | INFRA | B | 2-3 d | W |
| R-43 | `pm-workflow-orchestrator` sub-agent (Feature Kickoff scope) | SUB-AGENT | B | 3-5 d | A, I |
| R-44 | `pm-sample-curator` sub-agent (after THREAD_PROFILES.md) | SUB-AGENT | B | 3 d | A, I |
| R-45 | Output style: "PM Voice" (audience-aware tone overrides) | OUTPUT STYLE | content | 1 d | W |

### P3 - Longer horizon

| ID | Item | Type | Theme | Effort | Sources |
|----|------|------|-------|--------|---------|
| R-46 | `develop-ai-guardrails-spec` (responsible AI) | NEW SKILL | A | 2 d | W |
| R-47 | `measure-cohort-analysis-spec` | NEW SKILL | content | 2 d | W |
| R-48 | `discover-customer-journey` workflow bundle | BUNDLE | content | 0.5 d | S |
| R-49 | `develop-product-strategy` workflow bundle | BUNDLE | content | 0.5 d | S |
| R-50 | Linear/Jira/GitHub Issues export adapter skills (markdown bridges) | INTEGRATION | content | 2-4 d each | C, S, W |
| R-51 | Notion/Confluence export adapter skills | INTEGRATION | content | 2-4 d each | C, W |
| R-52 | `utility-link-docs` (traceability mapper) | UTILITY | D | 2-3 d | S, W |
| R-53 | `utility-update-doc` (living-document mode) | UTILITY | D | 2-3 d | S, W |
| R-54 | `utility-briefing-pack-builder` | UTILITY | content | 2 d | C, S |
| R-55 | `utility-comparison-matrix` | UTILITY | content | 1 d | C, S |
| R-56 | Domain overlay packs (B2B SaaS, AI products, regulated, platform, marketplace) | INFRA | content | 3-5 d each | C |
| R-57 | Initiative compiler MVP (single-input to coordinated artifact set) | UTILITY | content | 5-7 d | C, S |
| R-58 | Multi-reviewer critique board (eng, design, data, GTM, exec personas) | UTILITY | C | 3-5 d | C, S |
| R-59 | Skill lens mode (apply skill as analysis-on-existing-doc rather than generate-new) | INFRA | content | 3-4 d | S |
| R-60 | Interactive coaching mode (`mode: interactive` flag for select skills) | INFRA | E | 3-5 d | S |
| R-61 | Public certification track (graded artifacts, capstone, badges) | INFRA | E | 6-10 d | S |
| R-62 | `pm-cross-llm-handoff` sub-agent (after spike) | SUB-AGENT | B | 3 d | A, I |
| R-63 | Reverse-engineer skills from exemplars (meta-skill) | INFRA | content | 4-6 d | C |
| R-64 | Portability test harness (run skills on Codex/Cursor/Gemini in CI) | INFRA | F | 3-5 d | W |
| R-65 | Hook-triggered sub-agent invocation (PostToolUse → pm-critic) | INFRA | B | 1-2 d | W |

### Items deliberately deferred or rejected

| ID | Item | Disposition | Reason |
|----|------|-------------|--------|
| X-01 | `pm-meeting-family-steward` | FOLD INTO `pm-critic` with family mode | Two sub-agents with overlapping context is worse than one with mode flag |
| X-02 | `pm-skill-curator` (pattern spotter) | DEFER until cross-session memory infrastructure exists | Requires durable observation across sessions |
| X-03 | Workspace/project switching (`/project new`, `/project switch`) | OUT OF SCOPE | Belongs in Knowledge OS, separated 2026-03-21 |
| X-04 | Multi-language translations | DEFER | Lower value than core domain gaps at current adoption scale |
| X-05 | Enterprise customization layer | DEFER | Domain overlays cover the first 80% without platform complexity |
| X-06 | PM career/development skills | OUT OF SCOPE | Outside the artifact-generation core value prop |
| X-07 | Agent persona | DEFER | Existing persona work covers the need; synthetic agent persona needs more research |
| X-08 | Specialized Mermaid generators (sequence, system, journey) | DEFER | Generic `utility-mermaid-diagrams` is sufficient; ship reviewer/storyline first |
| X-09 | `pm-em-dash-sweeper` sub-agent | REJECTED | Script + CLAUDE.md hook handles 95%; sub-agent is overkill |
| X-10 | `pm-link-validator` sub-agent | REJECTED | Pure CI script work, no judgment needed |
| X-11 | `pm-doc-stack-migrator` sub-agent | REJECTED | One-time migration is not a sustained sub-agent |

---

## 5. P0 Items Detailed

### R-01: `measure-eval-suite-spec`

**What.** A skill that produces an AI-feature evaluation suite specification: golden-set definition (with rationale, edge cases, and bias considerations), grader specification (LLM-as-judge prompt, deterministic graders, human-grader rubric), success criteria (precision/recall/exact-match thresholds per category), failure-mode register (what regressions to watch for), and test-cadence plan (pre-merge, nightly, pre-release).

**Why this is P0.**
- Web research showed AI Evals identified across multiple 2026 sources as **the** emerging PM skill ("the most important new skill for PMs in 2026", "the single biggest mistake teams make is shipping AI products without evals", Productboard 2025 survey: 100% of 379 enterprise PMs use AI tools).
- No competing PM-skills repo ships an evals skill: not Phuryn (65 skills), not Dean Peters (47 skills), not Anthropic's official `knowledge-work-plugins/product-management` (7 skills).
- EU AI Act enforcement window (August 2026) makes traceable AI evaluation a compliance artifact for high-risk products.
- Both backlog docs (Codex and Sonnet) missed this entirely because they synthesized before the topic crystallized.

**Companion skills.** Pairs with R-02 (`develop-prompt-spec`), R-03 (`develop-model-card`), R-14 (`develop-ai-failure-mode-catalog`), R-46 (`develop-ai-guardrails-spec`).

**Success criteria.** Skill produces a complete eval-suite spec from a single prompt that includes: (a) at least 3 example golden-set entries with rationale, (b) a grader spec sufficient to run end-to-end, (c) explicit threshold criteria, (d) a failure-mode register linked to the AI failure-mode catalog skill, (e) a test-cadence plan. Refuses to fabricate baseline numbers without source.

**Effort.** 3-4 days. Higher than typical because the SKILL.md needs to teach evals concepts to PMs new to the practice.

**Sources.** `[W]` web research only. Both backlog docs missed it.

### R-02: `develop-prompt-spec` (or `develop-prompt-rfc`)

**What.** Versioned prompt-engineering artifact: prompt body, system message, intended behavior contract, eval-suite link, fallback behavior, change history, deprecation policy. Treats prompts as production artifacts requiring spec discipline, not throwaway strings.

**Why P0.** Prompt management is currently ad-hoc in most teams. As models change (Sonnet 4.6 to 4.7, Opus 4.6 to 4.7) prompts drift silently. A spec artifact gives PMs a contract surface comparable to API contracts. Pairs with eval-suite (R-01) so changes are validated before shipping.

**Naming decision.** Prefer `develop-prompt-spec` (consistent with `develop-solution-brief` style) over `develop-prompt-rfc` (RFC implies group decision process not always present). Maintainer can adjust; either works.

**Effort.** 2-3 days.

**Sources.** `[W]`.

### R-03: `develop-model-card`

**What.** Generates an AI model card per the EU AI Act and Hugging Face/Google model-card conventions: intended use, out-of-scope use, training-data summary, evaluation summary (links to eval-suite), known limitations, ethical considerations, contact for issues, change log.

**Why P0.** EU AI Act Article 11 + Annex IV require technical documentation for high-risk AI products from August 2026 onward. Model cards are the de-facto compliance artifact (US NIST AI Risk Management Framework also references model cards). PMs of AI products are increasingly the artifact owner.

**Effort.** 2-3 days. Most cost is in the example showing a real-world model card not a toy one.

**Sources.** `[W]`.

### R-04: `pm-critic` sub-agent

**What.** Plugin sub-agent at `agents/pm-critic.md` with companion `commands/pm-critic.md` slash command and `docs/guides/adversarial-review.md`. Runs adversarial review on any PM artifact and returns findings graded P0/P1/P2/P3 with concrete fix suggestions. Description includes "use proactively after PM-artifact-producing skills" so it auto-invokes.

**Why P0.** The May 7-10 sub-agent docs already chart this in detail. Single file. 2-4 days. No companion infrastructure required. Highest leverage entry point into the active-orchestration layer (Theme B). Codifies the Phase 0 Adversarial Review Loop the maintainer already runs manually.

**Implementation reference.** Already detailed in `subagent-implementation-plan_2026-05-10.md` Section "v2.15.0 detailed plan". Promote that section verbatim into the v2.16.0 release plan (with version label updated).

**Effort.** 2-4 days per the implementation plan.

**Sources.** `[A], [I]`.

### R-05: Frontmatter metadata sweep

**What.** A one-shot infrastructure sweep that moves proprietary frontmatter fields (`phase:`, `classification:`, `version:`, `updated:`, etc.) under a single `metadata:` block, leaving only spec-canonical fields (`name`, `description`, `license`, optional `compatibility`) at the top level.

**Why P0.** agentskills.io spec was released as an open standard 2025-12-18 and is now adopted by 12+ tools (Codex CLI, Gemini CLI, Cursor, Windsurf, Cline, Copilot, etc.). Top-level proprietary fields are an emerging anti-pattern that will silently break canonical validators on third-party tools. One-time sweep with permanent payoff.

**Implementation.** Update `lint-skills-frontmatter.*` validators to enforce the new structure. Update `pm-skill-builder` skill template. Sweep all 40 skills (will be 55 by end of v2.15.0). Document in CHANGELOG.

**Effort.** 1-2 days, mostly mechanical sweep with validator update.

**Sources.** `[W]`.

### R-06: `discover-market-sizing`

**What.** TAM/SAM/SOM market sizing skill with both top-down and bottom-up approaches. Output includes assumptions, formulas, sensitivity ranges, source/evidence notes, and confidence labels. Refuses to produce numbers without bounded sources.

**Why P0.** Three-source consensus (Codex backlog, Sonnet backlog, web research). Most consistent domain-skill gap across all sources. Already specified in the existing backlogs.

**Effort.** 2-3 days. Most cost is in the example using bounded data.

**Sources.** `[C], [S], [W]`.

### R-07: `define-prioritization-framework`

**What.** Structured prioritization skill supporting RICE, ICE, MoSCoW, Weighted Scoring, Kano. Helps PMs select the right framework based on context (data availability, decision type, team maturity). Output: scored/ranked table with framework rationale and sensitivity notes.

**Why P0.** Three-source consensus. The most common daily PM activity has zero representation in the 26 phase skills. Sits structurally between discovery and delivery.

**Effort.** 2-3 days.

**Sources.** `[C], [S], [W]`.

### R-08: Skill proposal funnel

**What.** `.github/ISSUE_TEMPLATE/skill-proposal.yml` (fields: name, classification, user problem, output contract, overlap analysis, references, example scenario), `CONTRIBUTING.md` updates explaining the proposal-to-PR flow with `/pm-skill-builder` integration, auto-label workflow for skill PRs (`new-skill`, `update-skill`, by phase/classification).

**Why P0.** Marketplace listing (R-09) will drive new contributors. Builder skills exist. Community scaling is the next operational bottleneck.

**Effort.** 1-2 days.

**Sources.** `[C], [S]`.

### R-09: Marketplace submission follow-through

**What.** Confirm Anthropic plugin-directory acceptance status; submit/refresh `hesreallyhim/awesome-claude-code` and Claude Plugin Hub listings; refresh GitHub About metadata, topics, and pinned content; track external-listing state in a lightweight manifest; add metadata-refresh step to release checklist.

**Why P0.** Highest visibility-to-effort ratio of any item (~30 minutes human time, no engineering). Several sources independently flag as highest-ROI action. Aggregator directories (agentskills.io, claudemarketplaces.com, aiskill.market) now index us; metadata quality compounds.

**Effort.** 0.5 day (mostly human decisions and form submissions).

**Sources.** `[C], [S]`.

---

## 6. P1 Items Detailed

### Theme A continuation (AI-Native PM)

**R-14: `develop-ai-failure-mode-catalog`**. Sibling to `deliver-edge-cases` but AI-specific: hallucinations, prompt injection vulnerabilities, drift risks, biased outputs, unsafe completions, model-version regressions. Pairs with eval-suite. Effort 1-2 days.

### Theme B continuation (Active Orchestration)

**R-16: `pm-release-conductor` sub-agent.** Walks the maintainer through the full release runbook with explicit gates (CI green, validators pass, frontmatter clean, em-dash sweep, aggregate counters, Phase 0 review status, version bump, tag, post-tag hygiene). Pauses for confirmation. Detailed in `subagent-implementation-plan_2026-05-10.md` v2.15.1 plan. Effort 3-4 days.

**R-17: `pm-changelog-curator` sub-agent.** Reads git log since last tag, drafts CHANGELOG entries respecting CLAUDE.md hygiene rules (no internal-notes references, public paths only, "what changed not where"). Composes with R-16 (conductor invokes curator at CHANGELOG-prep gate). Effort 1-2 days.

**R-18: `pm-skill-auditor` sub-agent.** Runs all enforcing validators, aggregates results, surfaces cross-cutting issues no single validator catches alone (skill without command, command without skill, sample gaps, aggregate-counter drift). Explicit invocation only. Effort 2 days.

**R-24: PostToolUse hook for skill frontmatter validation.** When Edit/Write touches a `skills/*/SKILL.md` file, run a quick frontmatter-validity check inline. Catches drift at the moment of authoring rather than at next CI run. Hooks are the missing nervous system; this is the smallest possible first hook. Effort 1 day.

### Theme C (Reviewer Pairing)

**R-19: Generator+reviewer pairing for top 5 highest-stakes artifacts.** Ship `prd-review`, `okr-review`, `hypothesis-review`, `problem-statement-review`, `persona-review` as paired skills next to their generators. Each reviewer encodes its artifact's quality contract and emits P0/P1/P2/P3 findings. Cross-cuts with `pm-critic` (R-04): `pm-critic` is the cross-cutting fallback; paired reviewers are the durable specialization that scales. Effort 5-7 days total (1-1.5 days each).

### Theme D (Lineage)

**R-25: Lineage frontmatter pilot.** Add `lineage:` block to the 5 highest-traffic skills (PRD, user stories, hypothesis, OKR, problem statement): `derived_from:`, `produces:`, `version:`, `produced_by_skill:`, `generated_at:`, `inputs_hash:`. Document the convention. Pilot scope first, then sweep in v2.17.0+ if pattern proves durable. Effort 1-2 days.

### Content gap items (high consensus)

**R-10: `discover-journey-map`.** Customer journey map with stages, touchpoints, emotional curve, pain points, moments of truth, opportunity annotations. Composes with `utility-mermaid-diagrams` for visual output. Three-source consensus. Effort 2-3 days.

**R-11: `measure-survey-analysis`.** Survey results analysis with persona segmentation, hypothesis validation, thematic clustering, prioritized recommendations. Refuses to overstate statistical confidence from weak samples. Effort 2-3 days.

**R-12: `develop-pre-mortem`.** "Imagine the project failed; what went wrong?" with risk register output (probability/impact/owner/mitigation). Both Phuryn and Dean Peters ship this; parity gap. Effort 1-2 days.

**R-13: `develop-product-vision` + Strategy Canvas.** "What the world looks like when we succeed" plus a lightweight strategy canvas connecting vision to target users, value proposition, differentiators, success measures. Pairs naturally with `okr-writer`. Phuryn ships both. Effort 2-3 days.

**R-15: `develop-rollout-plan`.** Feature-flag progressive rollout (0.1% to 1% to 5% to 25% to 50% to 100%) with go/no-go criteria per stage. Distinct from `deliver-launch-checklist`. Modern PLG and growth teams need this monthly. Effort 2 days.

**R-20: `utility-executive-summary-generator`.** Compresses any pm-skills artifact (or multi-artifact set) into a leadership-ready 1-pager: headline, context, recommendation, decision needed, risks, evidence, next actions. Three-source consensus. Multiplies value of every existing phase skill. Effort 1-2 days.

**R-21: `deliver-roadmap`.** Outcome-oriented product roadmap with Now/Next/Later, quarterly themes, confidence levels, dependencies, decision gates. Both Phuryn and Anthropic official ship a roadmap skill; pm-skills doesn't. Effort 2-3 days.

**R-22: `deliver-gtm-brief`.** GTM brief covering positioning, messaging, launch channels, success metrics, enablement needs. Bridges PRD-era artifacts to marketing/sales. Effort 2 days.

**R-23: `discover-research-plan`.** Pairs with R-11 (survey analysis). Designs studies, surveys, or interview campaigns: objectives, segments, sampling, question bank, bias risks, analysis plan, launch checklist. Effort 2 days.

---

## 7. P2 Items Detailed

P2 items are coverage and quality expansion. Each is independently valuable but not blocking.

### Content additions

**R-26: `foundation-press-release`** (Amazon Working Backwards). Reframes product vision as future PR + FAQ. Classic PM artifact missing from foundation tier. Dean Peters ships. Effort 2 days.

**R-27: `foundation-workshop-facilitation`**. Generic facilitator script (timing, prompts, decision rules) usable inside any sprint or discovery session. Slot in foundation tier. Dean Peters ships variants. Effort 2 days.

**R-28: `discover-jtbd-job-stories`**. Job-story format (`When ___ I want to ___ so I can ___`) as alternative to user-stories. Phuryn ships. Pairs with existing JTBD canvas. Effort 1-2 days.

**R-29: `develop-api-contract-spec`**. Platform-PM artifact: capability-API vs product-API vs partner-API, SLOs, deprecation policy, consumer awareness. Effort 2 days.

**R-30: `deliver-deprecation-plan`**. Sunsetting an API/feature/product: migration path, comms cadence, hard cutover. Dean's EOL message is a piece. Effort 1-2 days.

**R-31: `measure-activation-loop-spec`**. PLG-native: first-touch value, signup-to-activation events, 48-hour activation criteria, drop-off instrumentation. Effort 2 days.

### Utility expansions

**R-32: `utility-artifact-transformer`**. PRD to stories+deck+diagram+risk-brief. Three-source consensus. Implementation note: ship 3 explicit transforms first, not a generic router. Each transform names assumptions and traceability. Effort 2-3 days.

**R-33: `utility-slide-storyline-builder`**. Distinct from `slideshow-creator`: builds the narrative arc and key-message-per-slide structure first, slideshow generates content from the storyline. Three-source consensus. Effort 1-2 days.

**R-34: `utility-audience-adapter`**. Reframes any artifact for exec/eng/design/sales/customer audiences. Effort 1 day.

**R-35: `utility-assumption-extractor`**. Surfaces implicit assumptions in any artifact, flags risk level, suggests validation methods. Pairs with `define-hypothesis`. Effort 1 day.

**R-36: `utility-claim-evidence-mapper`**. Links each claim in an artifact to its supporting evidence and confidence level. Effort 2 days.

**R-37: `utility-agent-skill-builder`**. Cross-context skill builder for PMs creating agent skills outside this repo (team tools, platform-specific skills). Distinct from `utility-pm-skill-builder` (repo-specific). Effort 3-5 days.

### Sub-agent expansions

**R-38: `pm-frontmatter-doctor`**. Cross-skill frontmatter consistency sweeps with negotiated batch fixes. Pairs with R-18 (auditor detects, doctor remediates). Effort 2 days.

**R-43: `pm-workflow-orchestrator`** (Feature Kickoff scope). Active workflow chain runner. Detailed in implementation plan. Ships one workflow first to prove pattern. Effort 3-5 days.

**R-44: `pm-sample-curator`**. Library sample gap analysis and generation. Depends on F-34 THREAD_PROFILES.md. Effort 3 days.

### Infrastructure

**R-39: Curriculum MVP.** `curriculum/` directory with 2 starter paths (Feature Delivery + Experimentation), each with prerequisites, expected outputs, lab prompt, and grading rubric. GPT deep-research called this the single biggest structural differentiator vs. comparable open resources. Effort 3-6 days.

**R-40: Public `GOVERNANCE.md` + `ROADMAP.md`.** Lightweight public governance file; public ROADMAP with Now/Next/Later. Reduces onboarding friction; signals project maturity. Effort 0.5 day.

**R-41: `discover-survey-design`.** Pairs with R-11 (survey analysis). Effort 2 days.

**R-42: YAML-declarative workflow promotion** (one workflow first). Promote `_workflows/feature-kickoff.md` to a Conductor-style YAML schema with declared `inputs`, `outputs`, `routes`, conditional branches. Microsoft Conductor (May 2026) and Microsoft Agent Framework 1.0 are converging on this pattern. One workflow first to validate the schema; expand if value is clear. Effort 2-3 days.

**R-45: Output style: "PM Voice".** Audience-aware tone overrides for stakeholder communication. Optional plugin-shipped style. Effort 1 day.

---

## 8. P3 Items Detailed (Brief)

P3 items are longer horizon. Defer until P0-P2 cycle completes and signal accumulates.

### AI-Native expansions

**R-46: `develop-ai-guardrails-spec`**. Responsible-AI guardrails: content filters, refusal protocols, escalation paths, human-in-loop triggers. Effort 2 days.

### Bundle/curriculum expansions

**R-48, R-49: Workflow bundles** (Customer Discovery, Product Strategy). Once R-10 and R-13 ship, add workflow bundles wrapping them. 0.5 days each.

**R-56: Domain overlay packs** (B2B SaaS, AI products, regulated, platform, marketplace). Adjusts skill emphasis, examples, and language for specific domains. Defers until core library is stable. 3-5 days each.

**R-61: Public certification track**. Multi-week curriculum with graded artifacts, capstone project, public rubric, optional badging. Category-defining if executed well. Requires R-39 (curriculum MVP) to ship first and prove demand. 6-10 days.

### Integration

**R-50: Linear/Jira/GitHub Issues export adapters**. Markdown bridges from PM artifacts to ticketing systems. 2026 best practice is markdown-first with optional MCP adapters per tool. 2-4 days each.

**R-51: Notion/Confluence export adapters**. Same pattern, different tools. 2-4 days each.

### Living docs

**R-52: `utility-link-docs`**. Traceability mapper showing how artifacts connect (problem statement to hypothesis to PRD to user stories to experiment design). Mermaid relationship graph output. Effort 2-3 days.

**R-53: `utility-update-doc`**. Living-document mode: takes existing artifact + change set, produces revised version with change log. Supports additive, corrective, scoping update modes. Effort 2-3 days.

### Advanced patterns

**R-54: `utility-briefing-pack-builder`**. Initiative operating pack from single input: one-pager, exec summary, slide outline, diagram, FAQ, decision log. Composes with R-20, R-32, mermaid-diagrams. Effort 2 days.

**R-57: Initiative compiler MVP**. The "step-change" idea: single input compiles problem statement, PRD, epic and stories, diagrams, deck outline, launch plan, stakeholder memo, FAQ. Requires R-20, R-32, R-43, R-04 to exist. Effort 5-7 days as MVP scope.

**R-58: Multi-reviewer critique board**. Engineering, design, data, GTM, exec personas critique the same artifact. Approximates real organizational review. Leverages R-04 (critic) and personas. Effort 3-5 days.

**R-59: Skill lens mode.** Apply a skill as analysis-on-existing-doc rather than generate-new (e.g., `/hypothesis --lens` extracts implicit hypotheses from a PRD). Inverts skill direction. High-leverage if it works; needs design. Effort 3-4 days.

**R-60: Interactive coaching mode.** `mode: interactive` flag for select skills makes them conversational: skill asks clarifying questions, challenges weak assumptions, builds artifact through dialogue. Difference between template and coach. Effort 3-5 days.

**R-62: `pm-cross-llm-handoff` sub-agent**. After spike to determine if it should be a sub-agent or a slash-command iteration. Effort 3 days.

**R-63: Reverse-engineer skills from exemplars**. Generate draft SKILL.md packets from high-quality exemplar PM documents. Meta-skill that accelerates contribution. Effort 4-6 days.

### Infrastructure

**R-64: Portability test harness**. CI step that runs sample skills on Codex CLI, Cursor, Gemini CLI to detect compatibility breaks. Effort 3-5 days.

**R-65: Hook-triggered sub-agent invocation**. PostToolUse hook auto-invokes pm-critic on Write to PM artifacts. Bridge from R-24 (basic hook) to R-04 (critic). Effort 1-2 days.

---

## 9. Per-Release Shaping

The recommendations above are not all "do this in v2.16." This section shapes them into believable release slates.

### v2.15.0 (in flight, no changes)

Sprint Skills launch under tool classification: 15 new tool skills + 3 workflows + 15 commands + 45 samples + 2 user guides + 2 concept docs + 2 family contracts + 2 family validator pairs.

### v2.16.0 (proposed: AI-Native Pack + first sub-agent + content gaps + spec hygiene)

Theme: claim the 2026 AI-native PM differentiator and ship the first sub-agent.

| Item | Effort |
|------|--------|
| R-01: `measure-eval-suite-spec` | 3-4 d |
| R-02: `develop-prompt-spec` | 2-3 d |
| R-03: `develop-model-card` | 2-3 d |
| R-04: `pm-critic` sub-agent + `/pm-critic` + adversarial-review guide | 2-4 d |
| R-05: Frontmatter metadata sweep | 1-2 d |
| R-06: `discover-market-sizing` | 2-3 d |
| R-07: `define-prioritization-framework` | 2-3 d |
| R-08: Skill proposal funnel | 1-2 d |
| R-09: Marketplace follow-through | 0.5 d |
| **Total** | **15-25 days** |

Skill count delta: 55 (after v2.15.0) + 5 new = **60 skills**. Sub-agent count: 0 + 1 = **1**. Hook count: 0.

**Why this slate makes sense.** Three AI-Native skills together claim Theme A as a coherent investment. `pm-critic` ships the orchestration layer (Theme B). Two highest-consensus content gaps (R-06, R-07) close obvious omissions. R-05 is hygiene tax with portability payoff. R-08 + R-09 are operational scaling that compounds. The slate is large but each item is independent; some can slip without blocking others.

### v2.16.1 (proposed: AI-Native deepening + reviewer pairing pilot + first hook)

Theme: deepen the AI-Native investment and pilot the reviewer-pairing pattern.

| Item | Effort |
|------|--------|
| R-14: `develop-ai-failure-mode-catalog` | 1-2 d |
| R-15: `develop-rollout-plan` | 2 d |
| R-19: Reviewer pairing for PRD + OKR + hypothesis (3 of 5) | 3-5 d |
| R-20: `utility-executive-summary-generator` | 1-2 d |
| R-24: PostToolUse hook for frontmatter validation | 1 d |
| R-25: Lineage frontmatter pilot (5 highest-traffic skills) | 1-2 d |
| **Total** | **9-14 days** |

Skill count delta: 60 + 2 + 3 reviewers + 1 utility = **66 skills**. Sub-agent count: 1. Hook count: 0 + 1 = **1**.

### v2.17.0 (proposed: utility sub-agents + content expansion)

Theme: maintainer-facing sub-agent slate (release conductor + changelog curator + auditor) + remaining content gaps.

| Item | Effort |
|------|--------|
| R-16: `pm-release-conductor` | 3-4 d |
| R-17: `pm-changelog-curator` | 1-2 d |
| R-18: `pm-skill-auditor` | 2 d |
| R-10: `discover-journey-map` | 2-3 d |
| R-11: `measure-survey-analysis` | 2-3 d |
| R-12: `develop-pre-mortem` | 1-2 d |
| R-13: `develop-product-vision` | 2-3 d |
| R-21: `deliver-roadmap` | 2-3 d |
| R-19: Reviewer pairing for problem-statement + persona (remaining 2 of 5) | 2-3 d |
| **Total** | **17-25 days** |

Skill count delta: 66 + 5 + 1 (roadmap) + 2 reviewers = **74 skills**. Sub-agent count: 1 + 3 = **4**. The auditor surfaces issues; doctor remediates; conductor orchestrates. This forms a coherent maintenance trio.

### v2.18.0+ (proposed: orchestration + curriculum + integration)

Theme: workflow orchestration, curriculum MVP, and execution-tool adapters.

| Item | Effort |
|------|--------|
| R-42: YAML-declarative workflow promotion (Feature Kickoff) | 2-3 d |
| R-43: `pm-workflow-orchestrator` (Feature Kickoff) | 3-5 d |
| R-39: Curriculum MVP (2 paths + 2 labs + 2 rubrics) | 3-6 d |
| R-22: `deliver-gtm-brief` | 2 d |
| R-23: `discover-research-plan` | 2 d |
| R-32: `utility-artifact-transformer` (3 explicit transforms) | 2-3 d |
| R-33: `utility-slide-storyline-builder` | 1-2 d |
| R-50: Linear export adapter (first integration) | 2-4 d |
| **Total** | **17-27 days** |

### Beyond v2.18.0

The remaining P2 and all P3 items become a backlog the maintainer can pull from based on signal. Multi-reviewer critique board (R-58), initiative compiler (R-57), skill lens mode (R-59), and interactive coaching mode (R-60) are the highest-leverage P3 items to graduate to P2 if signal emerges.

---

## 10. Open Decisions, Anti-Patterns, and Risks

### 10.1 Open decisions for the maintainer

1. **AI-Native Pack scope.** Is shipping R-01 + R-02 + R-03 + R-14 in v2.16.0 the right grouping? Alternative: ship R-01 first (single highest-consensus item) and let it prove the pattern before adding the others. Recommendation: ship together as a coherent pack so the v2.16.0 release narrative is "AI-Native PM Pack" rather than "another assorted release."

2. **Reviewer-pairing structure.** Pair as separate skills (`prd` + `prd-review`) or as a `--review` mode flag on existing skills (`prd --review`)? Recommendation: separate skills for v2.16.1 pilot. The mode flag invites scope creep ("can I get a `--lens` mode too? a `--coach` mode?") that's better left to R-59 and R-60.

3. **Sub-agent directory location.** Top-level `agents/` (matches Claude Code convention) or namespaced `agents/pm-skills/`? Once 4 sub-agents ship in v2.17.0, the namespace question becomes real. Recommendation: namespace as `agents/pm-skills/` from day one to leave room for future cross-cutting agents (e.g., `agents/cross-llm-review/` if the cross-LLM handoff agent becomes a separate concern).

4. **YAML workflow schema choice.** Microsoft Conductor schema or roll our own minimal schema? Recommendation: minimal schema first (`inputs:`, `outputs:`, `steps:`, `routes:`), document divergence from Conductor explicitly, revisit when 3+ workflows are YAML-promoted. Premature standardization on Conductor commits us to its evolution.

5. **Generator+reviewer naming.** `prd-review` or `review-prd` or `prd-critic` or `prd-validator`? Recommendation: `prd-review` as the verb-suffix convention. Read aloud: "deliver PRD then PRD review."

6. **Hook implementation language.** Bash + PowerShell pair (matching validator convention) or single Python script (simpler maintenance)? Recommendation: Bash + PowerShell to match the existing validator pattern, even at slightly higher maintenance cost.

7. **Marketplace name change.** If the Anthropic plugin-directory submission needs a name change for clarity (e.g., `pm-skills-by-product-on-purpose` to disambiguate from Phuryn's `pm-skills`), is the maintainer willing to take the rename hit? Recommendation: confirm with Anthropic team; rename if requested.

### 10.2 Anti-patterns to avoid

**Don't try to ship every P0 item in v2.16.0.** 15-25 days of focused work is a lot for one release. Be willing to defer R-08 + R-09 to v2.16.1 if AI-Native Pack is still in iteration.

**Don't generalize sub-agents prematurely.** Ship `pm-critic` as the first concrete sub-agent. Resist the urge to design a "sub-agent framework" or "agent SDK" before 3 concrete agents have shipped. The May 7 strategy doc warned about proliferation; honor the warning.

**Don't conflate generator and reviewer responsibilities.** A generator that self-reviews has a perverse incentive (pretend the output is good). The reviewer must be a separate skill with adversarial framing.

**Don't add categories without contracts.** Every classification (`tool`, future `domain-overlay`, etc.) needs a contract doc and validator pair before adding members. The Meeting Skills Family pattern works because the contract precedes the members.

**Don't ship workflow YAML without keeping the prose `_workflows/*.md`.** The prose remains the source of truth for human readers; YAML is the executable layer. Both stay in sync; YAML doesn't replace prose.

**Don't make the AI-Native Pack into an "AI products" silo.** Eval suites, prompt specs, and model cards apply to ALL features that use AI (which by 2026 is most features). Frame the skills as horizontal, not vertical.

**Don't auto-invoke utility sub-agents.** Per Insight 8 from the May 7 strategy doc: utility/maintainer agents are explicit-only. Auto-invoking `pm-release-conductor` on every conversation would be obnoxious.

**Don't reopen v2.15.0 architectural decisions.** The tool classification, two-family structure, dropped bridge, and standalone note-and-vote are LOCKED per `project_v2.15-tool-classification-decisions.md`. This roadmap respects those.

### 10.3 Risks

**Risk 1: AI-Native Pack scope creep.** Eval-suite, prompt-spec, model-card all touch AI engineering territory. Risk that PMs reading the SKILL.md don't understand the underlying concepts. Mitigation: ship with longer-than-typical examples, link to authoritative external references (Anthropic eval guide, Hugging Face model cards), and pair with `docs/concepts/ai-native-pm.md` foundational concept doc.

**Risk 2: Sub-agent proliferation.** Codex backlog warned. Sonnet backlog warned. May 7 strategy doc warned. The temptation to "ship 4 sub-agents at once" is real because each has been designed to ship-quality. Mitigation: ship pm-critic in v2.16.0, observe for 2 weeks, only commit to v2.17.0 utility-sub-agent slate after the critic proves the pattern.

**Risk 3: Hook complexity.** Hooks fire on every event matching their trigger. Misconfigured hooks can produce significant friction. Mitigation: ship the simplest possible first hook (R-24, frontmatter validation on Edit/Write to skills/) and iterate. Document an explicit kill-switch.

**Risk 4: Frontmatter sweep breaks downstream consumers.** `pm-skills-mcp` reads frontmatter; doc-stack templates may read frontmatter; third-party validators may read top-level proprietary fields. Mitigation: enumerate consumers before sweep; ship with clear migration note in CHANGELOG; consider keeping a transitional `version:` top-level alias for one release.

**Risk 5: Curriculum MVP doesn't match real PM learning paths.** GPT deep-research recommendation is strong, but cardinal risk: building a curriculum that doesn't reflect how PMs actually learn. Mitigation: scope MVP to 2 paths only, gather signal from first users, adjust.

**Risk 6: Reviewer-pairing produces noise.** A `prd-review` skill that flags 47 P3 issues on a real PRD becomes resented. Mitigation: P0/P1/P2/P3 grading with strict P0 = "blocks ship", P1 = "fix before next major review", P2 = "consider", P3 = "nit only if you have time." Reviewer must justify each finding with a fix suggestion.

**Risk 7: Spec sweep creates portability gaps with Claude Code-specific features.** If we strictly comply with agentskills.io, we lose access to `context: fork`, `hooks:`, etc. Mitigation: keep Claude-specific extensions under `metadata.claude_code:` and add a `compatibility: ["claude-code"]` line where appropriate. Skills that don't need Claude-specific behavior should be portable.

**Risk 8: Competitor catch-up.** If Phuryn or Dean Peters ships an AI Evals skill in the next 3 months, the differentiation argument weakens. Mitigation: ship R-01 in v2.16.0 with a release narrative claiming the position; even if competitors follow, first-mover credibility persists.

---

## 11. Appendix: Cross-Cutting Insights from Research

These don't fit cleanly into the prioritized roadmap but are worth recording for future cycles.

### Insight A: P0/P1/P2/P3 has won as the severity standard

Both code-review tooling (BMAD, OpenAI Codex review prompts) and natural-language adversarial review tools have converged on P0/P1/P2/P3 (or HIGH/MEDIUM/LOW with P0 reserved for "blocks ship"). The repo already uses this in `pre-execution-review.md`. **Codify P0/P1/P2/P3 as the canonical severity grammar across all reviewer skills, sub-agents, and review-cycle artifacts.**

### Insight B: Multi-model adversarial consensus is the noise filter

Run 3 adversarial reviews in parallel; drop findings that appear in only 1/3. This is the emerging anti-hallucination pattern. Relevant for R-04 (pm-critic), R-19 (paired reviewers), R-58 (multi-reviewer board). Pattern can be implemented as "request 3 sub-agent invocations in parallel, aggregate, filter."

### Insight C: AGENTS.md is now the convergent project-instructions format

Now under Linux Foundation's Agentic AI Foundation; 60,000+ projects. The repo has AGENTS.md already; align it with the spec conventions if not already.

### Insight D: Hooks are the missing nervous system

The repo has zero hooks today. Even one well-scoped hook (R-24, frontmatter validation on Edit/Write) demonstrates the pattern. Hooks observe; sub-agents act. Future: hook-triggered sub-agent invocation (R-65) is the bridge.

### Insight E: Output styles are underused in the plugin ecosystem

Most plugins ship none. Plugins that DO ship custom output styles (technical-writer, presentation-coach, etc.) report high stickiness from users who match the voice. R-45 ("PM Voice") is a low-cost experiment.

### Insight F: MCP is the right surface for execution-tool integration

For Linear/Jira/Notion/Confluence integrations (R-50, R-51), use the official first-party MCP servers (Atlassian MCP, Linear MCP, GitHub MCP) rather than rolling our own API clients. The pm-skills-mcp server stays in maintenance mode; integrations are separate.

### Insight G: The pedagogic principle: "every skill teaches the human while executing"

Dean Peters' pm-skills repo applies this rule. pm-skills doesn't explicitly. Adding `learning_objective:` metadata (under `metadata:` per spec compliance) and using it to derive curriculum paths (R-39) connects the dots between content layer and learning layer.

### Insight H: Three sub-agents triggers governance investment

Once R-04 + R-16 + R-17 ship (or any 3 sub-agents), formalize `docs/reference/runtime-components.md` to catalog them alongside skills, commands, and workflows. Don't let runtime components grow ungoverned.

### Insight I: The "right size" of a plugin is not a constraint at 60+ skills

Web research confirmed: pm-skills is in the proven range (alirezarezvani's 263+ skill library, Anthropic's awesome-claude-code-toolkit aggregations). Skill discovery budget is 1% of context window; well-structured descriptions stay within budget. The constraint is taxonomy clarity, not count.

### Insight J: Sample-driven contributor templates increase quality

Successful skill libraries (Product-Manager-Skills, sanyuan-skills, claude-code-skills) all enforce "samples or it didn't ship." pm-skills enforces this for Meeting Skills Family. Generalize: every shipped skill gets at least 3 thread-aligned samples.

---

## 12. Quick-Reference Tables

### 12.1 New skills proposed by classification

| Classification | New skills proposed | Cumulative target |
|----------------|---------------------|-------------------|
| Foundation | press-release (R-26), workshop-facilitation (R-27) | 8 + 2 = 10 |
| Discover | journey-map (R-10), survey-analysis only-discover (R-23 research-plan, R-41 survey-design), jtbd-job-stories (R-28) | 3 + 4 = 7 |
| Define | prioritization-framework (R-07), problem-statement-review (part of R-19) | 4 + 2 = 6 |
| Develop | prompt-spec (R-02), model-card (R-03), pre-mortem (R-12), product-vision (R-13), ai-failure-mode-catalog (R-14), api-contract-spec (R-29), ai-guardrails-spec (R-46), hypothesis-review (part of R-19) | 4 + 8 = 12 |
| Deliver | rollout-plan (R-15), roadmap (R-21), gtm-brief (R-22), deprecation-plan (R-30), prd-review (part of R-19) | 6 + 5 = 11 |
| Measure | eval-suite-spec (R-01), survey-analysis (R-11), activation-loop-spec (R-31), cohort-analysis-spec (R-47), okr-review (part of R-19), market-sizing (R-06) | 5 + 6 = 11 |
| Iterate | (none proposed) | 4 + 0 = 4 |
| Tool (sprint) | (none proposed beyond v2.15.0) | 15 + 0 = 15 |
| Utility | executive-summary (R-20), artifact-transformer (R-32), slide-storyline (R-33), audience-adapter (R-34), assumption-extractor (R-35), claim-evidence-mapper (R-36), agent-skill-builder (R-37), link-docs (R-52), update-doc (R-53), briefing-pack (R-54), comparison-matrix (R-55) | 6 + 11 = 17 |
| **Total** | **40 + 38 = 78 (over 4-6 release cycles)** | |

Reaching 78 total skills across all P0-P3 items would represent 2 years of release work. Realistic v2.18.0 target is 70-75 skills.

### 12.2 New runtime components proposed

| Component | Count today | After v2.16.x | After v2.17.x | After v2.18.x |
|-----------|-------------|---------------|---------------|---------------|
| Sub-agents | 0 | 1 (`pm-critic`) | 4 (+ release-conductor + changelog-curator + skill-auditor) | 5-6 (+ workflow-orchestrator + sample-curator) |
| Hooks | 0 | 1 (PostToolUse frontmatter) | 1-2 | 2-3 |
| Output styles | 0 | 0 | 0 | 1 (PM Voice optional) |
| YAML workflows | 0 | 0 | 0 | 1 (Feature Kickoff) |
| Family contracts | 1 | 3 (after v2.15.0) | 3 | 3-5 |
| Curriculum paths | 0 | 0 | 0 | 2 (MVP) |

### 12.3 Items by source signal strength

| Signal | Count | Notes |
|--------|-------|-------|
| Three-source consensus (Codex + Sonnet + Web research) | 5 | R-01 (after retroactive web addition), R-06, R-07, R-10, R-12 |
| Two-source consensus | 14 | Most P1 items |
| Web research only (newly surfaced) | 13 | Most AI-Native and PLG-related items |
| Sub-agent docs only | 7 | All sub-agents derive from May 7-10 internal docs |
| Single-source utility | 8 | Lower-confidence utility expansions |

---

## 13. Final Recommendation in One Paragraph

Ship v2.16.0 as the **AI-Native + Orchestration + Hygiene** release: three AI-native skills (eval-suite, prompt-spec, model-card), the first sub-agent (pm-critic), the frontmatter metadata sweep, two highest-consensus content gaps (market-sizing, prioritization-framework), and the contributor funnel + marketplace follow-through. This single release stakes the most defensible position in the 2026 PM-skills landscape (AI Evals as the white-space no competitor owns), opens the active-orchestration layer with the lowest-risk first sub-agent, and pays the spec-compliance hygiene tax that compounds over every future release. Total effort: 15-25 focused days, distributable across multiple short cycles if desired. After v2.16.0, the v2.17.0 utility-sub-agent slate (release-conductor + changelog-curator + skill-auditor) plus the next four content gaps (journey-map, survey-analysis, pre-mortem, product-vision) gives a coherent story that takes us from 60 to 74 skills with a maintenance trio that materially improves every subsequent release. v2.18.0+ becomes the workflow-orchestration and curriculum cycle once the orchestration layer is proven.

---

## 14. Change Log

| Date | Author | Change |
|------|--------|--------|
| 2026-05-14 | Claude Opus 4.7 (max effort) | Initial synthesis. Inputs: backlog-aggregated_2026-05-08_codex.md, backlog-aggregated_2026-05-08_claude-sonnet.md, subagent-strategy_2026-05-07.md, subagent-implementation-plan_2026-05-10.md, plus 2026 web research on Claude Code platform features, competitive PM-skills repos (Phuryn, Dean Peters, Anthropic official, alirezarezvani), and skill-ecosystem patterns (curriculum, transformation, review, lineage, integration, contribution scaling, multi-LLM portability). |
| 2026-05-19 | claude-opus-4.7 (v2.17/v2.18 scoping session, post-v2.16.1 ship) | Reconciliation pass after v2.15.0 + v2.15.1 + v2.15.2 + v2.16.0 + v2.16.1 shipped. Full delta analysis captured in companion doc `roadmap_opus-4.7-max_2026-05-14_issues-conflicts.md`. Summary: (1) v2.16.0 ACCELERATED 4 sub-agents from roadmap v2.17 to v2.16 (R-04 + R-16 + R-17 + R-18); (2) v2.16.0 ADDED scope not in roadmap: cross-client dispatch skill pattern (4 utility-pm-* skills) + 6-gate release runbook codification + doc-stack modernization (Astro 6.3.x + Starlight 0.39.x + Node 22.12+) which was a roadmap Section 2.3 deferral but re-promoted mid-cycle due to Dependabot pressure; (3) v2.16.0 DEFERRED AI-Native Pack (R-01, R-02, R-03) + frontmatter metadata sweep (R-05) + content gaps (R-06, R-07) + skill proposal funnel (R-08) + marketplace follow-through (R-09); (4) v2.16.1 emergent patch (3-file plugin manifest schema fix; not in roadmap); (5) marketplace identity rename surfaced as v3.0.0 strategic concern, scoping doc + migration architecture doc authored 2026-05-18; (6) v2.17.0 reframed per 2026-05-19 maintainer directive: TIGHT scope = frontmatter metadata sweep (R-05) + AGENTS/ to _AGENTS/ rename + subagents/ to agents/ rename (Path B1; closes v2.16.1 sub-agent native registration gap); (7) v2.18.0 locked to 4 highest-consensus skills (R-06, R-07, R-10, R-11) with no AI-Native Pack promotion. Section 9 per-release shaping is now superseded by the v2.17.0 + v2.18.0 release plans authored 2026-05-19. Section 10.1 Open Question 3 (sub-agent directory location) RESOLVED as no-namespacing top-level + uppercase coordination dir gets underscore prefix to resolve case-insensitive collision. Section 10.1 OQ7 (marketplace name change) RESOLVED to v3.0.0 per separate scoping work. Sections 12.1 (skill counts) and 12.2 (runtime components) need refresh to reflect actual v2.16.x state (59 skills + 4 sub-agents + 4 dispatch skills + 0 hooks). |
