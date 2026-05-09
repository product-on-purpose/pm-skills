# Aggregated Recommendation Backlog

Generated: 2026-05-08 by Codex  
Scope: Aggregate and prioritize recommendations from the requested distilled planning docs and idea notes.  
Current repo snapshot checked during synthesis: 40 skill directories, 47 command files, 10 workflow files, `.claude-plugin/plugin.json` version `2.13.1`.

## How to Read This

This backlog deduplicates repeated recommendations and reconciles older planning notes against the current repository state. Many March and April recommendations have already shipped, so they are captured in the "Already shipped or satisfied" section rather than repeated as active work.

The v2 distilled docs supersede older workspace-oriented recommendations. Items moved to Knowledge OS are parked separately unless they can be implemented as skill-library-only documentation or utilities.

One source file is named with a future date relative to this synthesis date: `_NOTES/ideas/ai-chat_chatgpt_2026-06-06_pm_skills_gap_analysis_and_prioritized_recommendations.md`. It is included as supplied, but its date should be treated as a file label, not evidence that the review happened before 2026-05-08.

## Source Map

| ID | Source | Role in this backlog |
|----|--------|----------------------|
| S00 | `docs/internal/_working/distilled/00_README.md` | Canonical-read order for distilled docs |
| S01 | `docs/internal/_working/distilled/01_executive-brief_v2.md` | Strategic scope and near-term priorities |
| S02 | `docs/internal/_working/distilled/02_action-plan_v2.md` | Phase sequencing and dependencies |
| S03 | `docs/internal/_working/distilled/03_notable-repos-and-tools_v2.md` | Reference catalog and tool choices |
| S04 | `docs/internal/_working/distilled/04_next-efforts.md` | Canonical execution backlog for the March planning cycle |
| S05 | `docs/internal/_working/distilled/review-cycle_distilled-v2.md` | Review findings, resolved blockers, remaining polish |
| S06 | `docs/internal/_working/distilled/review-skill_overview.md` | Multi-model review-cycle skill pattern |
| S07 | `_NOTES/ideas/ai-chat_chatgpt_2026-06-06_pm_skills_gap_analysis_and_prioritized_recommendations.md` | Visual, transformation, review, trust, and orchestration recommendations |
| S08 | `_NOTES/ideas/ai-chat_claude_2026-04-15_pm-skills-gaps-and-innovation-utilities.md` | Gap analysis, utility-skill candidates, innovation tiers |
| S09 | `_NOTES/ideas/chatgpt_deep-research-report.md` | Adoption, curriculum, governance, contribution, and domain expansion roadmap |
| S10 | `_NOTES/ideas/claude_2026-03-30_pm-skills-next-investments.md` | Tiered skill, utility, bundle, and infrastructure investments |

## Priority Rubric

| Priority | Meaning |
|----------|---------|
| P0 | Immediate trust, distribution, or contribution-scaling work with low effort and high leverage |
| P1 | Next high-leverage product investments that multiply existing skills or fill repeated PM workflow gaps |
| P2 | Important domain and utility expansion once P0/P1 foundations are underway |
| P3 | Longer-horizon platform, ecosystem, or integration bets |
| Parked | Explicitly moved to Knowledge OS, deferred by later decisions, or low-consensus ideas |
| Done | Recommendation is already satisfied by current repo contents or later releases |

## P0 - Immediate Trust, Distribution, and Contribution Surface

### AGG-P0-01: Complete External Distribution Follow-Through

Recommendation: Treat public discovery as an active release task, not a one-time form submission. Confirm Anthropic plugin-directory status, submit or refresh listings in relevant community directories, refresh GitHub About metadata and topics, and track external listing state in a lightweight manifest or release checklist.

Why: Marketplace submission was repeatedly identified as the highest visibility-to-effort action. Later metadata-drift issues show that external presentation needs an explicit maintenance loop.

Current status: Anthropic marketplace submission was previously recorded as submitted, but acceptance status is not verifiable from the requested sources. The repo now has stronger plugin manifest validation; external directory state still needs human follow-through.

Done when:
- Anthropic listing status is recorded as accepted, rejected, or awaiting review with date.
- Relevant community listing targets are recorded with status.
- GitHub repository description, topics, website link, and pinned content are checked at release prep.
- Release checklist includes an external metadata refresh step.

Sources: S01, S03, S04, S09

### AGG-P0-02: Add a Contributor-Facing Skill Proposal Funnel

Recommendation: Add a dedicated skill proposal issue template, contribution guidance for new skills, and auto-labeling for skill PRs. Require proposal approval before large implementation PRs.

Why: The repo has lifecycle tools, validation scripts, and a skill builder, but external contributors still need a clear path from idea to accepted PR. This is the highest-value community scaling gap that remains from the early backlog.

Current status: Generic issue templates and a PR template exist. A dedicated `.github/ISSUE_TEMPLATE/skill-proposal.yml` was not present in the inspected repo.

Done when:
- `.github/ISSUE_TEMPLATE/skill-proposal.yml` exists with fields for name, classification, user problem, output contract, overlap analysis, references, and example scenario.
- `CONTRIBUTING.md` explains proposal approval, `/pm-skill-builder`, CI expectations, and reviewer flow.
- Skill PRs are labeled by new vs. update and by phase/classification.
- A hypothetical external contributor can follow docs from idea to issue to PR without reading internal planning docs.

Sources: S01, S02, S04, S09

## P1 - Near-Term Multipliers

### AGG-P1-01: Curriculum MVP

Recommendation: Add a first-class curriculum wrapper with role-based or goal-based learning paths, practice labs, rubrics, and lightweight assessments.

Why: The repo is strong as a skill library, but not yet a learning system. Curriculum is the highest-leverage adoption layer in S09 because it turns the existing 40-skill catalog into a repeatable learning path.

Suggested first slice:
- `curriculum/README.md`
- Feature delivery path: problem statement to PRD to stories to acceptance criteria to launch.
- Experimentation path: hypothesis to experiment design to results to pivot/lessons.
- One realistic lab and one rubric per path.

Done when:
- At least two starter paths exist.
- Each path includes prerequisites, expected outputs, a lab prompt, and a grading rubric.
- README or docs homepage points new users to the curriculum.

Sources: S09

### AGG-P1-02: Artifact Transformation and Skill Chaining

Recommendation: Create a utility layer for transforming one artifact into downstream artifacts and for chaining skills in a controlled way.

Examples:
- PRD to stories, acceptance criteria, deck, diagram, and launch risk brief.
- Retro to action plan and stakeholder update.
- Experiment results to executive memo and next-cycle hypotheses.
- Architecture note to sequence diagram and risk register.

Why: Multiple sources argue that PMs rarely need a single artifact in isolation. Transformation reduces drift and makes the library feel like an operating system instead of a template catalog.

Suggested first slice:
- `utility-artifact-transformer` or `/chain` design.
- Start with 3 explicit transforms rather than a generic router.
- Require source artifact, target artifact, assumptions, and traceability table.

Done when:
- A user can provide one source artifact and get at least two synchronized downstream outputs.
- The output identifies inherited claims and transformation assumptions.
- The command documents what it will not transform.

Sources: S07, S08, S09, S10

### AGG-P1-03: General PM Artifact Review Layer

Recommendation: Add a reviewer utility for PM artifacts, distinct from `pm-skill-validate` which audits skill structure. Include modes for readiness, ambiguity, implementation risk, evidence quality, argument structure, and audience fit.

Why: Existing lifecycle tools validate skills, but generated PM artifacts still need a quality loop. S06 adds a stronger pattern: document review should include ground-truth checks, guided checks, an open-ended "what did we miss?" pass, and an author response section.

Suggested first slice:
- `utility-artifact-readiness-reviewer` with modes: `exec-ready`, `engineering-ready`, `stakeholder-ready`, `experiment-ready`.
- Add a review-cycle template inspired by S06 for multi-file planning sets.

Done when:
- The reviewer produces severity-graded findings, not just prose feedback.
- It can compare an artifact against a source skill template when provided.
- It supports a one-file review-cycle artifact with request, reviewer response, and author response.

Sources: S06, S07, S08, S10

### AGG-P1-04: Executive Communication Pack

Recommendation: Add utilities for converting detailed PM artifacts into leadership-ready communication: executive one-pagers, decision memos, status updates, steering-committee narratives, and concise asks.

Why: Multiple sources identify the "translation to leadership" layer as a major PM gap. Current `foundation-stakeholder-update` is meeting-recap driven; it does not fully cover general executive summaries, decision memos, QBR narratives, or steering updates from arbitrary artifacts.

Suggested first slice:
- `utility-executive-summary` or `foundation-executive-brief`.
- Inputs: one artifact or artifact bundle.
- Outputs: headline, context, recommendation, decision needed, risks, evidence, next actions.

Done when:
- Supports single-artifact and multi-artifact rollups.
- Produces audience-specific variants for executive, engineering, design, GTM, and mixed audiences.
- Flags unsupported claims and missing asks.

Sources: S07, S08, S09, S10

### AGG-P1-05: Roadmap and Prioritization Skills

Recommendation: Add outcome-oriented product roadmap and prioritization skills.

Why: Roadmaps and prioritization are repeated PM operating artifacts and are prominent gaps above or between the Triple Diamond phases. OKR skills now cover one part of strategic planning; roadmap and prioritization complete the strategy-to-execution bridge.

Suggested first slice:
- `define-prioritization-framework` or `develop-prioritization-matrix`
- `define-product-roadmap`
- Support Now/Next/Later, quarterly themes, RICE, ICE, MoSCoW, weighted scoring, and opportunity scoring.

Done when:
- Prioritization outputs include criteria, weights, scores, assumptions, and sensitivity notes.
- Roadmaps emphasize outcomes, confidence, dependencies, and decision gates rather than feature lists.
- The Product Strategy workflow uses both skills.

Sources: S08, S09, S10

### AGG-P1-06: `discover-market-sizing`

Recommendation: Add a market sizing skill covering TAM/SAM/SOM and top-down plus bottom-up estimates.

Why: This remains one of the most consistent domain-skill gaps across the distilled backlog and later research. It supports business cases, new market entry, investor narratives, and go/no-go decisions.

Done when:
- Skill, template, example, command, and AGENTS entry exist.
- Output includes assumptions, formulas, sensitivity ranges, source/evidence notes, and confidence labels.
- At least one example uses incomplete data and documents how the estimate was bounded.

Sources: S02, S04, S09, S10

### AGG-P1-07: `measure-survey-analysis`

Recommendation: Add a survey analysis skill for survey results, NPS responses, beta feedback, segmentation, and prioritized recommendations.

Why: Measurement currently covers experiments and instrumentation well, but broader survey/research analysis remains a clear gap.

Done when:
- Skill, template, example, command, and AGENTS entry exist.
- Output separates quantitative results, qualitative themes, segments, limitations, and recommendations.
- The skill refuses to overstate statistical confidence from weak or biased samples.

Sources: S02, S04, S09, S10

## P2 - Coverage and Utility Expansion

### AGG-P2-01: General `agent-skill-builder`

Recommendation: Add a general skill builder for PMs creating agent skills outside this repo, distinct from the repo-specific `/pm-skill-builder`.

Why: The naming decision in the distilled docs explicitly separated `/pm-skill-builder` from `/agent-skill-builder`. The first shipped; the general cross-context builder remains useful but should follow the proven pattern.

Done when:
- `utility-agent-skill-builder` exists with command `/agent-skill-builder`.
- It teaches agentskills.io-compatible authoring without pm-skills-only conventions.
- It explains when to create a local team skill vs. propose a pm-skills contribution.

Sources: S01, S02, S04, S10

### AGG-P2-02: Strategy, Positioning, and GTM Pack

Recommendation: Add a small strategy/GTM pack for product vision, strategy canvas, positioning and messaging, value proposition, GTM brief, and optionally pricing/monetization.

Why: Older analyses consistently identify "above the Triple Diamond" strategy and GTM gaps. Current lean canvas and OKR skills cover some of this area, but they do not replace roadmap, positioning, GTM, or strategy narrative artifacts.

Priority order:
1. Product vision / strategy canvas
2. Positioning and messaging
3. GTM brief
4. Pricing/monetization only after stronger demand signal

Sources: S08, S09, S10

### AGG-P2-03: Customer Journey Mapping and Service Blueprinting

Recommendation: Add a customer journey map skill, with optional service blueprint mode.

Why: Journey maps are distinct from JTBD and personas. They connect discovery insights to touchpoints, emotions, pain points, handoffs, and opportunities.

Done when:
- Output includes stages, touchpoints, user emotions, pain points, backstage dependencies, and opportunities.
- Mermaid output is optional and delegated to `utility-mermaid-diagrams` where possible.

Sources: S07, S08, S10

### AGG-P2-04: Risk Register and Pre-Mortem

Recommendation: Add a risk/pre-mortem skill for product initiatives.

Why: Risk management is a repeated PM need and was identified as a parity gap. It complements launch checklists, PRDs, ADRs, and solution briefs.

Done when:
- Supports pre-mortem prompts, risk categories, probability/impact, owners, mitigations, triggers, and review cadence.
- Produces both a narrative summary and a risk register table.

Sources: S08, S10

### AGG-P2-05: Evidence and Trust Utilities

Recommendation: Add utilities for claim-evidence mapping, contradiction checks, confidence labels, source-aware summaries, and evidence-backed recommendation mode.

Why: Evidence-grounding raises trust for market research, strategy, competitive analysis, personas, and executive recommendations. This should build on the rigor patterns in OKRs, persona evidence trails, and review-cycle ground-truthing.

Suggested first slice:
- `utility-claim-evidence-mapper`
- `utility-contradiction-checker`
- Shared confidence-label convention

Sources: S06, S07, S09, S10

### AGG-P2-06: Visual Communication Refinements

Recommendation: Build on the shipped Mermaid and slideshow skills with narrative and quality helpers: slide storyline builder, slide reviewer, speaker notes builder, briefing pack builder, and diagram fidelity reviewer.

Why: The generic `utility-mermaid-diagrams` and `utility-slideshow-creator` satisfy the core visual-skill recommendations. The remaining gap is argument quality and audience fit around those visuals.

Do not duplicate current coverage:
- Do not create separate Mermaid sequence/system/journey skills unless the generic skill proves too broad in use.
- Prefer a reviewer/storyline layer before adding narrower generators.

Sources: S07, S08, S10

### AGG-P2-07: Research Planning and Survey Design

Recommendation: Add survey design or research plan capability to pair with survey analysis.

Why: Survey analysis is downstream. Teams also need help designing good surveys, choosing segments, avoiding leading questions, and planning interpretation before data collection.

Done when:
- Skill outputs objectives, target segments, sampling plan, question bank, bias risks, analysis plan, and launch checklist.

Sources: S09

### AGG-P2-08: Technical Spec / Engineering Handoff

Recommendation: Add a technical spec or engineering brief skill that bridges PM requirements and implementation planning.

Why: PRDs and ADRs exist, but many teams need a PM-to-engineering handoff artifact that summarizes behavior, constraints, dependencies, non-functional requirements, and implementation questions without becoming an architecture decision record.

Sources: S08

### AGG-P2-09: Utility Adapter Pack

Recommendation: Add lightweight adapters for repeated cross-artifact formats: one-pager, comparison matrix, RACI, assumption extractor, glossary builder, audience adapter, and email drafter.

Why: These are lower-effort horizontal utilities that improve daily reuse. They should be batched only if each has a distinct output contract and avoids overlap with existing meeting/stakeholder skills.

Priority order:
1. Assumption extractor
2. Comparison matrix
3. Glossary builder
4. RACI generator
5. Audience adapter / email drafter, only if `foundation-stakeholder-update` does not cover the need

Sources: S08

## P3 - Longer-Horizon Platform and Ecosystem Bets

### AGG-P3-01: Release Automation and Release-Please Decision

Recommendation: Keep release automation enhancement on the backlog, but update it for current reality. The repo already has release workflows, version consistency checks, count checks, plugin install validation, and authored release notes. The remaining question is whether release-please or current tag-driven release flow is the better long-term maintainer experience.

Current recommendation:
- Do not frame this as greenfield release automation.
- Explore release-please only if manual tag/release chores remain a bottleneck.
- Do not revive automated MCP sync unless the current MCP maintenance-mode decision changes.

Sources: S01, S02, S03, S04, S05, S09

### AGG-P3-02: Work-System Integrations

Recommendation: Add export or integration patterns for Jira, Linear, GitHub Issues, Confluence, Notion, Docs/Slides, and analytics systems.

Why: Integrations move pm-skills outputs from artifact generation into actual execution systems. This is high value but more operationally complex than markdown-native skills.

Suggested first slice:
- Start with format export, not live API integration.
- Example: PRD or stories to GitHub Issues/Jira-ready markdown.

Sources: S07, S09

### AGG-P3-03: Initiative Compiler

Recommendation: Evolve from one-off skill calls toward an initiative compiler that creates a coordinated package: problem statement, PRD, stories, diagrams, deck, launch plan, stakeholder memo, FAQ, and review findings.

Why: This is the clearest "step-change" product idea across the innovation notes, but it depends on P1 transformation/chaining, P1 review, P2 visual communication refinements, and possibly Knowledge OS.

Sources: S07, S08, S10

### AGG-P3-04: Product Intelligence Layer

Recommendation: Long term, connect skills to live product data sources such as analytics, support tickets, NPS, competitive monitoring, and CRM feedback.

Why: This would shift pm-skills from document generation toward decision support. It is high-upside but requires integration governance, data privacy rules, and likely MCP or connector work.

Sources: S08, S09

### AGG-P3-05: Domain-Specific Overlays

Recommendation: Add optional overlays for domains such as B2B SaaS, nonprofit tech, marketplaces, internal platforms, regulated products, and AI products.

Why: Domain overlays can increase practical relevance without duplicating the core skills. They should wait until core skill composition and review layers are stable.

Sources: S07

### AGG-P3-06: Open Certification or Badge Track

Recommendation: Build a community-reviewed curriculum/certification track with graded artifacts, capstone projects, and public rubrics.

Why: This could become category-defining, but only after a curriculum MVP proves there is demand and maintenance capacity.

Sources: S09

### AGG-P3-07: Reverse-Engineer Skills from Exemplars

Recommendation: Explore generating draft SKILL.md/TEMPLATE/EXAMPLE packets from high-quality exemplar PM documents.

Why: This is a high-upside meta-skill idea that could accelerate contribution and internal skill creation, but it should depend on mature validation and human review.

Sources: S08

## Parked or Moved Out of pm-skills Scope

| Recommendation | Disposition | Reason | Sources |
|----------------|-------------|--------|---------|
| Multi-project workspace, `/project new`, `/project switch`, artifact persistence | Knowledge OS | Later distilled docs explicitly moved workspace concerns out of pm-skills | S01, S02, S04 |
| Document linking/versioning, `/update-doc`, `/link-docs` as workspace features | Knowledge OS | Useful, but belongs to Layer 2 artifact management unless narrowed to markdown-only skill guidance | S01, S04, S10 |
| Transcript processing and meeting-note routing as a persistent pipeline | Knowledge OS or later utility | Meeting family now covers many outputs; raw transcript routing is higher complexity | S01, S04, S10 |
| Hooks, output styles, SessionStart/PostToolUse automation | Knowledge OS | Claude-Code-specific workspace layer, not portable skill-library value | S01, S04 |
| Persistent initiative memory, living document sync, visual sync engine, team knowledge graph | Knowledge OS / long horizon | High value, but depends on state management outside a portable skill library | S07, S08, S10 |
| Agent teams / broad multi-agent execution | Defer | Repeatedly assessed as interesting but premature at current scale | S01, S08 |
| Multi-language translations | Defer | Lower value than contribution, curriculum, and core domain gaps at current adoption scale | S10 |
| Enterprise customization layer | Defer | Common context and overlays cover the first 80 percent without platform complexity | S10 |
| PM career/development skills | Defer | Outside the artifact-generation core of pm-skills | S10 |
| Agent persona | Defer | Product/buyer persona need is mostly covered by current persona work; synthetic agent persona needs more research | S10 |

## Already Shipped or Satisfied Recommendations

| Recommendation | Current evidence | Notes |
|----------------|------------------|-------|
| CI validation enhancement | `scripts/validate-agents-md.*`, `scripts/check-mcp-impact.*`, extended `lint-skills-frontmatter.*` | S01/S04 recommendations shipped in v2.7.0-era work |
| Exclude `docs/internal/**` from release ZIP | `scripts/build-release.*` and release notes/history | M-16 no longer active backlog |
| `deliver-acceptance-criteria` | `skills/deliver-acceptance-criteria/`, `commands/acceptance-criteria.md` | Domain quick win shipped |
| Repo-specific PM skill builder | `skills/utility-pm-skill-builder/`, `commands/pm-skill-builder.md` | General `agent-skill-builder` remains outstanding |
| Skill validation and iteration lifecycle tools | `skills/utility-pm-skill-validate/`, `skills/utility-pm-skill-iterate/` | Does not replace general PM artifact review |
| Mermaid diagram utility | `skills/utility-mermaid-diagrams/`, `commands/mermaid-diagrams.md` | Remaining work is refinement/review, not core Mermaid generation |
| Slideshow creator | `skills/utility-slideshow-creator/`, `commands/slideshow-creator.md` | Remaining work is storyline/review/theming/speaker-note support if needed |
| Persona foundation skill | `skills/foundation-persona/`, `commands/persona.md` | Product/buyer persona gap is largely satisfied unless new persona subtypes are needed |
| OKR write-and-score cycle | `skills/foundation-okr-writer/`, `skills/measure-okr-grader/` | S08/S09/S10 OKR gap satisfied |
| Meeting and stakeholder communication family | `foundation-meeting-agenda`, `foundation-meeting-brief`, `foundation-meeting-recap`, `foundation-meeting-synthesize`, `foundation-stakeholder-update` | General executive memo/one-pager remains separate |
| Lean canvas | `skills/foundation-lean-canvas/` | Partially covers business model framing |
| Workflow expansion | 10 workflow markdown files in `_workflows/` | Workflows exist; executable chaining remains outstanding |
| Plugin/count/version drift checks | `validate-version-consistency.*`, `check-count-consistency.*`, `validate-plugin-install.*` | S09 metadata drift recommendation has been substantially addressed |
| MCP sync posture clarified | v2.13 release-plan notes show MCP maintenance-mode pivot and security patch follow-up | Older "automate MCP sync" recommendations are superseded unless the maintenance-mode decision changes |
| Folder index for distilled planning docs | `docs/internal/_working/distilled/00_README.md` | S05 recommendation satisfied |

## Suggested Next Release Slice

If the next release should maximize visible value without reopening workspace scope, use this order:

1. AGG-P0-02: skill proposal funnel and CONTRIBUTING updates.
2. AGG-P0-01: external distribution follow-through and release checklist metadata step.
3. AGG-P1-01: curriculum MVP with two learning paths and two labs.
4. AGG-P1-03: artifact readiness reviewer with review-cycle template.
5. AGG-P1-06 or AGG-P1-07: ship one remaining domain skill, preferably `discover-market-sizing` if strategy/business-case coverage is the priority or `measure-survey-analysis` if research/measurement coverage is the priority.
6. AGG-P1-02: design-only pass for artifact transformation/chaining, then implement the smallest high-confidence transform.

## Open Decisions

| Decision | Recommendation |
|----------|----------------|
| Should community skill proposals require approval before PR? | Yes. It prevents wasted contributor effort and keeps the library curated. |
| Should the next domain skill be market sizing or survey analysis? | Market sizing has stronger strategy-gap value; survey analysis has stronger measurement-continuity value. Pick based on next release theme. |
| Should release-please replace the current release flow? | Explore only after confirming current tag-driven release chores remain painful. Current automation is no longer greenfield. |
| Should `agent-skill-builder` stay in pm-skills? | Yes, per resolved naming decision, but ship after contributor funnel and artifact review work. |
| Should visual work continue as specialized Mermaid skills? | Not yet. The generic Mermaid skill exists; prioritize storyline/review/fidelity helpers first. |

