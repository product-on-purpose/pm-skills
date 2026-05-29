# Strategy Brief: `prioritized-action-plan`

**Status:** KEY DECISIONS LOCKED 2026-05-27 - ready for spec + implementation plan
**Date:** 2026-05-27
**Owner:** jprisant
**Companion docs (graduated to the release folder):** [`spec_prioritized-action-plan.md`](../../release-plans/v2.23.0/spec_prioritized-action-plan.md), [`implementation-plan.md`](../../release-plans/v2.23.0/implementation-plan.md), [`plan_v2.23.0.md`](../../release-plans/v2.23.0/plan_v2.23.0.md), and the Codex review record [`spec_prioritized-action-plan_reviewed-by-codex.md`](../../release-plans/v2.23.0/spec_prioritized-action-plan_reviewed-by-codex.md). This brief (the discovery doc) stays here in skills-ideas.
**Roadmap source:** new idea (not yet on roadmap); proposed for v2.23.0 candidate slate

## Decisions locked (2026-05-27)

| Decision | Locked value | Notes |
|---|---|---|
| Name | `prioritized-action-plan` | Plain English, commits to TOC prioritization philosophy without jargon. |
| Shape | Single skill (Approach A) | Tightly coupled analysis + plan + prompts; family adds friction without benefit. |
| Classification | `foundation` | Output is a first-class reusable PM artifact, on par with persona, lean canvas, meeting briefs. |
| Analytical engine | Theory of Constraints (TOC) | Identifies the one binding constraint as the critical next effort. |
| Confidence calibration | Cynefin domains (Clear / Complicated / Complex / Chaotic) | Calibrates confidence markers honestly per situation type. |
| Timing | v2.23.0 candidate | Sequenced AFTER v2.22.0 naming standardization ships. |
| Cross-skill invocation | Deferred | MVP is single-skill; Approach C orchestration deferred to a later iteration. |

> **Post-review update (2026-05-28):** After the Codex adversarial pass (`spec_reviewed-by-codex.md`), **OODA was cut** as a named framework (it was structural branding without a real section mapping). The engine is now **TOC + Cynefin**. The name was finalized as `prioritized-action-plan` (earlier passes of this brief explored `triage-and-plan` then `analyze-and-plan`; those names survive below only as historical reasoning). For execution, `spec.md` is the authority, not this brief.

**Purpose of this brief:** Capture the reasoning that produced the decisions above. The brief remains as a snapshot of the design process; the spec and implementation plan supersede it for execution.

---

## The core bet

A skill that takes anything a user provides and produces a comprehensive, decision-ready brief (understanding + prioritized questions + a confidence-marked plan), with copy/paste-ready prompts for the next 2-4 skills as a supporting enabler. The analysis and plan are first-class deliverables in their own right - the skill produces a referenceable artifact even when the user chooses not to invoke any downstream skills.

This is closer in spirit to `jp-strategy-brief` (structured analysis from messy input) and `utility-pm-critic` (structured findings with suggested actions) than it is to `using-workflows` (pure routing). The skill-prompts section is an affordance that makes the plan executable; it is not the reason the skill exists.

The signature deliverable is a single document with five sections: executive summary, what-I-understand mirror, prioritized questions/needs, a proposed plan with confidence markers, and copy/paste-optimized prompts for the recommended next skills. The differentiated value is *grounded analysis*: every claim is tied to a passage in the input, every confidence marker is explicit, and the plan is opinionated rather than hedged.

---

## 1. What I Understand (Input Mirror)

You want a skill (possibly a family) that:

- Accepts arbitrary input from the user: pasted text, links, file references, a brain dump, a partially built artifact, raw notes
- Performs analysis to extract intent, current state, and gaps
- Produces a comprehensive markdown document with five required sections:
  1. Executive summary
  2. What the skill understands about the input
  3. Prioritized questions / needs
  4. Proposed plan for what to do, with confidence levels / markers per step
  5. Copy/paste optimized prompts for each relevant downstream skill
- Routes intelligently across all pm-skills (not just one phase)

You also want this brief to weigh in on:

- Single skill vs family architecture
- Where it lives in the taxonomy (Triple Diamond phase, foundation, utility, tool)
- Naming, aware of the v2.22.0 naming standardization in flight
- Trade-offs across approaches
- Risks of a "do everything" skill
- Interaction with existing meta/orchestration patterns
- 80/20 build-first recommendation

Implicit assumption I'm running with: the goal is to improve adoption + library value extraction, not to replace existing skills. If the actual goal is "I want one skill instead of 63", that is a different brief and the recommendation would be different.

---

## 2. Problem Space

**Why this matters now.** Two converging needs.

1. **The analysis gap.** PM users routinely arrive at a workspace with messy, half-baked inputs and no structured way to think through what they have, what is missing, and what to do next. `jp-strategy-brief` proves the pattern works for general strategy thinking; there is no PM-scoped equivalent in the pm-skills library. The closest existing skill, `utility-pm-critic`, is artifact-bound (you have to have a PRD or similar to feed it).
2. **The discoverability tax.** The library crossed 63 skills at v2.21.0. The marketplace launch (v2.21.0 shipped 2026-05-26) widens the audience to users who do not have memorized maps of which skill does what. v2.22.0 will flatten domain prefixes, which helps discoverability *within* a flat list but does not solve "which skill is right for my current situation?".

The proposed skill addresses (1) as its primary value and (2) as a natural byproduct. Building this as a "router with analysis" would shortchange (1); building it as an "analyzer with routing affordances" gets both.

**Who is affected.**

- **New users** arriving via the marketplace who do not know the Triple Diamond mental model
- **Returning users** who know the framework but cannot remember if their current situation is `discover-stakeholder-summary` or `foundation-stakeholder-update`
- **Cross-LLM users** (Codex, Gemini, Cursor) where skill triggers fire on description match; a meta-router would explicitly invoke the right skill rather than relying on accurate trigger phrasing
- **Power users** with messy raw input who want a fast path to "what would generate the most value next?"

**What "solved" looks like.** A user pastes anything (a 4-page Slack export, an executive ask, a PRD draft, a customer interview), invokes the new skill, and gets back a single referenceable document that:

- Mirrors their input back so they can confirm "yes, that is what I have"
- Names the most important questions and gaps with priority
- Proposes a sequenced plan with confidence markers per step
- Suggests next downstream skills with parameterized prompts ready to paste

The document is valuable even if the user never runs a single recommended prompt. If they do run the prompts, the value compounds.

**Adjacent problems this is NOT trying to solve.**

- Auto-execution of multi-skill workflows (that is `using-workflows` territory and a different shape)
- Generating PM artifacts directly (that is what the 63 skills already do)
- Replacing `utility-pm-critic` adversarial review (different lens; critic is artifact-bound, triage is input-bound)
- Memory of past sessions across invocations (out of scope; the skill is stateless per invocation)

**The core risk frame.** This skill could be a unifying force-multiplier or a black box that swallows the library. Which one it becomes depends on whether the recommendations are grounded (citing input passages) or hand-wavy ("you should probably do a PRD"). Grounding is the design fulcrum.

---

## 3. Analysis

### Strengths of the idea

- **Discoverability lift.** Solves a real and growing problem. New users do not pay the catalog-reading tax.
- **Cross-LLM consistency.** Output prompts are explicit, so the user does not depend on each client's skill-trigger accuracy. They paste and run.
- **Composes well.** A grounded triage output is portable: paste it into Codex, Cursor, Gemini, or a colleague's Slack. The artifact has value beyond the immediate user.
- **Differentiated.** No other PM library in the open-source ecosystem (that we know of) has a meta-router skill. This is a positioning move.

### Weaknesses

- **Maintenance load.** Every new skill added to the library must update this skill's awareness (manifest, examples, prompt templates). If we forget, the router routes to a stale set.
- **Hallucinated recommendations.** LLMs are extremely fluent at recommending plausible-sounding skills that do not actually exist or do not fit. The grounding requirement (cite input passage) is necessary but not sufficient.
- **Adoption paradox.** Users who would benefit most (new users) may not know this skill exists. Users who know the library well do not need it.

### Risks

- **"Do everything, do nothing" trap.** If the skill is too generic, output is generic. If output is generic, users abandon it.
- **Conflict with `using-workflows`.** That skill already directs users to multi-skill workflows (Triple Diamond, etc.). Risk of overlap or contradictory recommendations.
- **Skill-list drift.** Recommendations reference skill names that may rename, retire, or change semantics. v2.22.0 is renaming 63 skills. If we build this before v2.22.0, every recommendation in the wild becomes stale.
- **Cross-LLM trigger fragility.** Recommending a skill is only useful if the user's client can invoke it. Some clients (Codex flat namespace, per memory `reference_codex-flat-skill-namespace`) have collision risk. The router needs to know which client it is on.
- **Becomes the default skill.** If users invoke triage for everything, the rest of the library becomes invisible. Network effect inversion.

### Open questions

- Should the router recommend skills outside pm-skills (e.g., jp-library skills installed alongside)? Cleaner scope = pm-skills only.
- How does the router know what the latest skill catalog is? Read live from `skills/` or use a versioned manifest?
- Does the output document live anywhere, or is it ephemeral chat output? If it persists, where?
- How does it handle ambiguous input where 4-6 skills could plausibly apply?

### Concerns

- The 5-section output template is ambitious. If every invocation produces 2,000+ words, users will skim and lose the value. Section discipline matters.
- "Copy/paste optimized prompts" is harder than it sounds. A prompt that works in Claude Code may not work in Codex or Cursor. The prompts need to be client-agnostic or client-aware.

### Lens: lineage and precedents

Two precedents matter more than the orchestration framing.

**`jp-strategy-brief` (primary lineage).** A skill that takes messy unstructured input and produces a structured, decision-ready document. The proposed skill is the PM-scoped sibling: same shape of value, scoped to PM work, with the additional affordance of recommending next pm-skills to invoke. Whatever section discipline and depth-scaling logic `jp-strategy-brief` uses, this skill should consider reusing.

**`utility-pm-critic` (secondary lineage).** A skill that analyzes a PM artifact and outputs structured findings + suggested actions. The proposed skill is the *unbounded-input* sibling: critic requires you to have an artifact to feed it; this skill accepts anything (notes, transcripts, asks, drafts) and produces an analysis regardless. The cross-client dispatch pattern (skill on non-Claude clients, sub-agent on Claude Code) is reusable here.

### Lens: relationship to existing static meta-layer

The library has a static layer that helps users self-route:

- **`using-workflows`** - documents multi-skill workflows. Static; user reads and picks.
- **`triple-diamond-delivery-process`** - phase-based mental model. Static reference.
- **`AGENTS.md`** - the skill discovery spec. Static catalog.
- **`creating-pm-skills`** - meta about how to author skills. Static guide.

The proposed skill does not replace this layer and is not primarily a router. It is a structured analyzer whose plan section happens to include skill recommendations. The static layer is for users who want to learn the library; the proposed skill is for users who want a brief and a plan right now. Different jobs, complementary.

---

## 4. Approaches

### Approach A: Single monolithic skill (`triage-and-plan` or similar)

**Summary.** One skill does everything: input ingestion, analysis, plan generation, prompt synthesis. Single SKILL.md, possibly with `references/` for the deeper logic (lens catalog, prompt templates, confidence rubric).

**Detailed breakdown.**

- One frontmatter entry, one trigger description, one invocation
- The skill's main body walks through the 5-section output structure
- `references/skill-catalog.md` is the live or generated map of all 63 skills with description excerpts + trigger phrases
- `references/prompt-templates.md` has parameterized prompt skeletons per recommended skill
- `references/confidence-rubric.md` defines High / Medium / Low markers (consistent with existing pm-skills patterns)
- On Claude Code: invokes optionally as sub-agent for adversarial check; on other clients: pure skill

**Pros.**

- Simple mental model for the user: one trigger, one document
- Matches the established pm-skills convention (most skills are atomic deliverables)
- Lower trigger-collision risk (one skill, one description)
- Easier to ship as MVP

**Cons.**

- SKILL.md grows large; risk of trigger description bloat
- Internal complexity (analyze + plan + prompt-build) is hidden, harder to unit-test
- If one stage fails (e.g., prompt synthesis), the whole document is degraded

**Key risks.** Bloat. Need disciplined progressive disclosure via `references/`. Need a hard word budget on the output document (e.g., 1,200 word ceiling).

**Effort / complexity.** Medium. Single skill build; skill-catalog reference is the heaviest investment.

**Honest commentary.** This is the right starting shape for an MVP. The internal stages are tightly coupled (the plan depends on the analysis; the prompts depend on the plan). Splitting them prematurely creates friction without separation-of-concerns benefit.

### Approach B: Family of three skills (`triage-analyze`, `triage-plan`, `triage-prompts`)

**Summary.** Decompose into three sequenced skills that can be invoked independently or in chain.

**Detailed breakdown.**

- `triage-analyze`: ingest input, produce understanding + gap analysis
- `triage-plan`: take analysis output, produce sequenced plan with confidence markers
- `triage-prompts`: take plan, produce copy/paste prompts for each step

**Pros.**

- Each skill is small and testable
- Users can re-run individual stages without re-analyzing
- Mirrors the foundation-meeting-* family pattern (`meeting-agenda`, `meeting-brief`, `meeting-recap`, `meeting-synthesize`)

**Cons.**

- Three triggers means three opportunities for trigger collision and three SKILL.md files to maintain
- Output is now three documents; users likely want one consolidated artifact
- Cross-LLM friction: some clients do not handle multi-skill chains well
- The coupling between stages is much tighter than the meeting family (meetings are temporally distinct events; triage stages are one continuous reasoning task)

**Key risks.** Over-decomposition. The meeting family decomposes by *meeting lifecycle stage* (a real-world boundary). Triage decomposes by *reasoning step* (an internal boundary). Internal boundaries are weaker justification for separate skills.

**Effort / complexity.** High. Three skills + a consolidation pattern.

**Honest commentary.** Tempting on paper, weak in practice. The stages are reasoning steps, not artifacts. Users want the output document, not the intermediate steps.

### Approach C: Hybrid - one entry skill that internally orchestrates via the Skill tool

**Summary.** One user-facing skill (`triage-and-plan`). Internally, it invokes sub-skills via the Skill tool to do analysis (could call `utility-pm-critic` for a critical lens on a draft artifact), to confirm scope (could call `using-workflows` for workflow-fit check), and to generate prompts. The output is still a single document.

**Detailed breakdown.**

- User invokes one skill
- The skill's body explicitly calls other skills when the input matches conditions (e.g., "if input contains a draft PRD, invoke `utility-pm-critic` for a quick adversarial pass")
- Composes the results into the 5-section output

**Pros.**

- Reuses existing capability rather than re-implementing
- Each downstream skill stays the single source of truth for its domain
- More accurate analysis (because critic does the critic work, not a generic re-implementation)

**Cons.**

- Higher invocation cost (multiple LLM round-trips per triage call)
- Trigger-chain fragility: if a downstream skill changes its interface or trigger, triage breaks
- Harder to ship; needs deeper testing of the orchestration

**Key risks.** Cascading failure. If `utility-pm-critic` errors, does triage produce a partial document or fail entirely? Needs explicit failure-mode design.

**Effort / complexity.** High initially, but lower long-term maintenance because logic stays in the source skills.

**Honest commentary.** This is the "right" architecture in the long run but is the wrong starting shape. Start with A; evolve to C when the value pattern is proven and the orchestration cost is justified.

---

## 5. The 80/20 Recommendation

**Recommendation: Build Approach A as a single skill (finalized name `prioritized-action-plan`). Position it as a structured-analysis skill whose plan section happens to include skill recommendations, not as an orchestrator. Ship as a v2.23.0 candidate AFTER v2.22.0 naming standardization lands. Defer Approach C cross-skill invocation to a future iteration.**

**Why this gets 80% of the value for 20% of the effort.**

- A single skill is one trigger, one invocation, one document. Users get the unblocking outcome immediately.
- The analysis + plan + prompts arrive as one coherent artifact. Users get value even when they do not run a single recommended prompt, which is the right design center for a skill positioned as an analyzer first.
- Sequencing it AFTER v2.22.0 avoids building against soon-to-rename skill names. The prompts section would otherwise need a rewrite in v2.22.0.
- Deferring cross-skill invocation (Approach C) keeps the MVP shippable in one minor cycle. Orchestration can layer on later when we know which 5-10 downstream skills are highest-traffic.

**Confidence: Medium-High.** The architecture call is confident (single skill, deferred orchestration). The naming call is medium-confidence and is the lightest open decision in this brief.

**Concrete next steps (in order).**

1. **Decide naming.** Finalized as `prioritized-action-plan` (candidates and the evolution from `analyze-and-plan` are in Section 7 D1, kept as history). Avoid `pm-` prefix per the corrected v2.22.0 rule (R-A6).
2. **Decide taxonomy slot.** Now a harder call given the analysis-first framing. The two real candidates:
   - **foundation** (preferred): the skill produces a reusable PM working-document, on the same footing as `foundation-persona`, `foundation-lean-canvas`, or the meeting-* family. It is phase-agnostic and reusable across the lifecycle, which is exactly what foundation means.
   - **utility** with category `analysis`: cleaner if you want to keep foundation reserved for canonical PM artifacts (canvas, persona, OKR) and treat this as PM-library tooling. Matches the `utility-pm-critic` precedent of structured analysis.
   - Recommendation: **foundation** if the output document is treated as a first-class artifact users would attach to a project; **utility** if the skill is treated as a workflow aid users invoke and discard. Pick foundation.
3. **Write the spec** (done: `spec.md` in this folder) reconciling decisions from this brief.
4. **Run Codex adversarial pass** on the spec before SKILL.md authoring (done: `spec_reviewed-by-codex.md`; dispositions folded into `spec.md`).
5. **Build the skill** with the 9-section output template (post-review: was 5; expanded for completeness then deduped), soft word budget (completeness over count), structural evidence rule (source ledger built before analysis; every load-bearing claim cites an exact input quote), and Low/Medium/High confidence markers.
6. **Validate on 3-5 real inputs** before tagging. Suggested inputs: a half-baked PRD, a customer interview transcript, an executive ask with no context, a meeting transcript, a Slack thread.

**Explicitly defer.**

- Approach C cross-skill invocation
- Auto-execution of recommended prompts
- Memory of past invocations across sessions
- Multi-document input handling (start with single-paste input)
- Recommendations outside pm-skills (jp-library, etc.)
- Treating the skill primarily as a router (the analysis and plan are first-class; routing prompts are an enabler)

---

## 6. Evidence & Source Map

- **63 skill count and breakdown:** `CLAUDE.md` line "63 PM skills on main (v2.19.0)..."; `MEMORY.md` Project Identity entry. Confirmed current.
- **v2.21.0 marketplace launch (2026-05-26):** memory observations 6555, 6362-6366; tagged at `1065c3e`.
- **v2.22.0 naming standardization in flight:** memory observation 6545, plan at `docs/internal/release-plans/v2.22.0/`. Adopted rule-set A per 6672.
- **`pm-` prefix corrected policy (R-A6):** memory observations 6723-6725, S1733. `pm-` is for pm-skills-repo compliance tooling on a per-skill meaningful basis, not a universal vendor prefix.
- **Codex flat namespace:** memory reference `reference_codex-flat-skill-namespace`, observation 6694. Affects cross-LLM trigger design.
- **`utility-pm-critic` precedent:** `skills/utility-pm-critic/SKILL.md`. Dispatch-skill + sub-agent pattern is reusable.
- **Strategy brief convention:** existing briefs at `docs/internal/skills-ideas/{discover-journey-map, discover-market-sizing, define-prioritization-framework, measure-survey-analysis}/strategy-brief.md`. This brief follows that shape.
- **Evidence gaps.** No usage data on how new users discover skills today (no telemetry). No competitive scan of whether other open-source PM libraries have a meta-router. The "discoverability tax is real and growing" claim is reasoned, not measured. Worth a quick eval in the spec phase.

---

## 7. Uncertainties & Open Items

### Open decisions (need your call)

**D1 - Skill name.** RESOLVED: `prioritized-action-plan`. The candidate analysis below is preserved as the reasoning trail. The final name emerged after this list: it commits to the TOC prioritization philosophy in plain English, signals the deliverable (a plan with priorities), and avoids the routing-flavored "triage" framing. Candidates considered:

- **A. `analyze-and-plan`** - directly describes the two primary outputs. Verb-verb construction matches existing patterns (e.g., `tool-design-sprint-decide-and-storyboard`, `tool-design-sprint-test-and-score`). Was the recommendation at this stage; later superseded by `prioritized-action-plan`, which names the priority dimension more explicitly.
- **B. `situation-brief`** - matches the output shape (a brief). Memorable. Risk: "brief" is overloaded in pm-skills (`develop-solution-brief`, `develop-spike-summary`, etc.).
- **C. `understand-and-plan`** - softer, mirror-first framing. Risk: "understand" reads as too generic in cross-LLM trigger context.
- **D. `triage-and-plan`** - working name from v1 of this brief. "Triage" leans into the sorting/routing framing, which the reframing pushes against. Demoted.
- **E. `triage`** - shortest. Same demotion reason. Plus high cross-LLM collision risk with non-PM uses (incident triage, PR triage).
- **F. `concierge`, `next-step-planner`** - metaphor-heavy or longer. Less direct.
- **Final: `prioritized-action-plan`** (not in the original list; chosen in a later pass for the reasons above).

**D2 - Taxonomy slot.** Reframed now that analysis is primary:

- **A. `foundation`** - the skill produces a reusable PM working-document, phase-agnostic, applicable across the lifecycle. This is exactly what foundation means (compare `foundation-persona`, `foundation-lean-canvas`, the meeting-* family). The output is a first-class artifact, not just a workflow aid. **Recommendation: this.**
- **B. `utility` with category `analysis`** - viable if foundation is reserved for canonical PM frameworks (persona, lean canvas, OKR) and we treat this as a tooling skill. Matches the `utility-pm-critic` precedent.
- **C. New top-level classification** (`meta`, `orchestration`) - over-engineered for one skill, especially now that we are NOT framing this as orchestration. Reject.
- The deciding question: do we expect users to save the output document and attach it to a project (foundation), or to invoke the skill and discard the output once they have moved on (utility)? The 5-section format with executive summary and grounded analysis strongly suggests the former. Pick foundation.

**D3 - Output destination.** Where does the 5-section document live?

- **A. Chat-only output** - simplest. User copy-pastes if they want to persist.
- **B. Default write to `_output-pm-skills/triage-and-plan/<slug>-<date>.md`** (matches the jp-library output convention). Friction-free persistence.
- **C. Configurable.** Chat by default, write-to-disk on flag.
- **Recommendation: C.** Chat default, opt-in to disk write.

**D4 - Sequencing relative to v2.22.0.**

- **A. Build now (v2.23.0 candidate) targeting current skill names** - faster to market. Cost: full rewrite when v2.22.0 renames hit.
- **B. Wait for v2.22.0 to ship, then build (v2.23.0 or v2.24.0)** - one-time author against final names. Recommendation: this.
- **C. Build in parallel using a name-stable manifest** - over-engineered for the savings.

**D5 - Skill catalog source.** How does the router know the current catalog?

- **A. Hard-coded reference file (`references/skill-catalog.md`)** generated at skill build time. Simple. Goes stale.
- **B. Read live from `skills/*/SKILL.md` frontmatter at runtime.** Always fresh. Requires file-system access at runtime.
- **C. Versioned manifest committed alongside skill releases.** Middle ground. Recommendation: this; align with the existing `utility-pm-skill-validate` validator manifest pattern if one exists.

### Open questions (lighter than decisions)

- **Q1 - Confidence marker rubric.** Should we adopt Low/Medium/High (matching `discover-journey-map` D1 convention) or P0/P1/P2/P3 (matching `utility-pm-critic` severity convention)? Recommendation: Low/Medium/High, because confidence is not severity.
- **Q2 - Refusal protocol.** What does the skill do with input that has nothing to do with PM work? Hard refuse, polite redirect, or attempt anyway? Recommendation: refuse with a one-line "this skill is scoped to PM artifacts and work; redirecting to general assistant."
- **Q3 - Prompt parameterization.** How concrete are the copy/paste prompts? Templated with `<placeholder>` slots, or fully filled with user context? Recommendation: fully filled (it is the point of grounding).

### What needs human judgment

- The naming call (D1) - this is taste plus cross-LLM trigger discipline. Lean on what other skill names feel like in invocation.
- Whether to defer to v2.23.0 or push into v2.22.0 (D4) - depends on roadmap pressure.
- Whether the output document's word budget should be 1,200 / 1,500 / 2,000 - depends on how much reading load you think users will tolerate.

### Follow-up generation offered

When decisions are locked, I can produce any of:

- Spec (`docs/internal/release-plans/v2.23.0/spec_triage-and-plan.md`) reconciling all D1-D5
- Codex adversarial-review brief on this strategy brief
- Skeleton SKILL.md with frontmatter and the 5-section output template wired up
- A small eval set of 3-5 real test inputs to validate the skill before tagging

---

## Recommendation summary

- **Build:** Yes. The skill fills two converging needs: a PM-scoped structured analyzer for messy inputs (the primary value), and a dynamic discoverability layer over the 63-skill library (a natural byproduct).
- **Framing:** Analysis-first. The skill produces a decision-ready brief; the prompts-for-next-skills section is an affordance that makes the plan executable, not the reason the skill exists.
- **Shape:** Single skill, Approach A. Defer cross-skill invocation (Approach C) to a later iteration.
- **Name:** `prioritized-action-plan` (finalized post-review; earlier passes explored `analyze-and-plan`). NOT `pm-` prefixed per the corrected v2.22.0 R-A6 rule.
- **Engine:** TOC (prioritization) + Cynefin (confidence). OODA cut post-review.
- **Slot:** `foundation` classification (output is a first-class working artifact, on par with persona / lean canvas / meeting briefs).
- **Timing:** v2.23.0 candidate, sequenced AFTER v2.22.0 naming standardization ships, so the prompts section is authored against final skill names.
- **MVP scope:** 9-section document output (post-review; was 5, expanded for completeness then deduped), single-paste input (file refs only on file-access clients), chat-default with opt-in disk write, Low/Medium/High confidence markers, structural evidence rule (source ledger before analysis; exact-quote citations), soft word budget (completeness over count). See `spec.md` for the authoritative design.
- **Defer:** cross-skill invocation, auto-execution, memory across invocations, multi-document input, recommendations outside pm-skills, router-first framing.
