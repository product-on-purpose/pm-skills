# AI Review: `prioritized-action-plan` Skill Spec

**Document:** [`spec_prioritized-action-plan.md`](spec_prioritized-action-plan.md) (same folder; was `docs/internal/skills-ideas/prioritized-action-plan/spec.md` at review time, graduated to this release folder)

**Document type:** spec

**Date:** 2026-05-28

**Requestor:** Claude (Opus 4.8) | **Reviewer:** Codex | **Human:** JP

---

## Reviewer Assessment

[P3: Codex fills this after completing all sections below. 2-3 sentence independent assessment: key strengths, most important concerns, headline recommendation.]

> **Reviewer - Codex (2026-05-28):** The spec addresses a real gap: PM users need a grounded way to turn messy input into a ranked next-action plan. The main concerns are that the framework stack overclaims rigor, the "cite or do not claim" rule is not structurally enforceable, and the 10-section output is too heavy for the promised fast-planning use case. Headline recommendation: keep the core bet, but narrow the artifact, make evidence mandatory inside each recommendation, and resolve classification, naming, and catalog dependencies before authoring examples.

| Severity | Count |
|----------|-------|
| Blocker  | 1     |
| Major    | 12    |
| Minor    | 7     |
| Note     | 2     |

## Requestor Analysis & Proposed Actions

[P4: Claude fills after Codex returns findings. Agreement/disagreement, proposed action summary, items flagged for JP decision.]

> **Requestor - Claude (date):** [pending reviewer findings]

### Recommendations

1. [pending]
2. [pending]
3. [pending]

### Decisions for JP

| ID | Title | Status | Final Decision | Last Updated |
|----|-------|--------|----------------|--------------|
| -  | [pending reviewer findings] | Open | - | - |

---

## Instructions for Reviewer

**Your role:** Independent critical reviewer. Your job is to find problems, inconsistencies, gaps, and risks in this skill specification. You are not here to validate. You are here to pressure-test. This spec proposes a new skill for an open-source PM skills library; if the design is flawed, it is far cheaper to catch it now than after the skill body, template, and three example outputs are authored.

**Key principles:**
- Disagreement is more valuable than agreement.
- If you find nothing wrong in a section, say so explicitly and explain WHY.
- If you find nothing wrong anywhere, that is suspicious. Look harder.
- Rate your confidence. Low-confidence concerns are still worth noting.
- Cite specific evidence for every finding (section numbers, quotes, file paths).

**Context you need:**

This is a spec for `prioritized-action-plan`, a proposed `foundation`-classification skill in the pm-skills library (63 open-source PM skills, agentskills.io specification, Apache 2.0, cross-LLM: Claude Code / Codex CLI / Cursor / Windsurf / Copilot / Gemini). A "skill" here is a markdown instruction file (SKILL.md) plus companion template and examples that an LLM loads to perform a specialized task. It is not application code.

The skill's premise: take ANY user input (notes, transcripts, a draft PRD, an executive ask, a Slack thread) and produce a comprehensive prioritized action plan. It uses three frameworks:
- **Theory of Constraints (Goldratt)** as the prioritization engine: identify the ONE binding constraint, which becomes the critical next effort (P1).
- **OODA loop (Boyd)** as the output structure: Observe (input mirror), Orient (questions/classification), Decide (the plan), Act (copy/paste prompts).
- **Cynefin (Snowden)** as the confidence calibrator: classify the situation (Clear / Complicated / Complex / Chaotic) and cap plan confidence accordingly. The skill refuses to produce High-confidence multi-step plans for Complex or Chaotic situations.

Output is a 10-section markdown document (Sections 0-9): executive summary, input mirror, Cynefin classification, the binding constraint, prioritized questions/gaps, the action plan (P1-P5 efforts each with why/what/how/confidence/expected-outcome/effort/dependencies), risks + pre-mortem, copy/paste pm-skill prompts, evidence/source map, open decisions.

**Source documents (you have repo read access; read them in full):**

| Document | Path | Role |
|----------|------|------|
| Primary | `docs/internal/release-plans/v2.23.0/spec_prioritized-action-plan.md` | Spec under review (graduated from skills-ideas) |
| Supporting | `docs/internal/skills-ideas/prioritized-action-plan/strategy-brief.md` | Decision rationale (why these choices) |
| Supporting | `docs/internal/release-plans/v2.23.0/implementation-plan.md` | 11-phase build plan |
| Reference | `skills/utility-pm-critic/SKILL.md` | Closest existing skill (adversarial review of one artifact) |
| Reference | `skills/foundation-persona/SKILL.md` | A foundation-classification skill, for classification comparison |

**Finding format:**

- [Severity | Confidence] Description with evidence woven in. Spec says "X" (Section N) but also "Y" (Section M). Recommendation.

**Severity definitions:**
- **Blocker** - Must resolve before proceeding. Will cause incorrect results or structural failure.
- **Major** - Should resolve before proceeding. Significant gap causing confusion or rework.
- **Minor** - Can defer. Real issue but will not prevent success.
- **Note** - Observation or suggestion. No action required but worth considering.

---

## Document Under Review

Source is ~600 lines, above the embed threshold. Read the full spec at the path above. Key claims to validate are summarized here.

**Key claims to validate:**

1. **Three frameworks are the right three.** TOC (prioritization), OODA (structure), Cynefin (confidence) are claimed to be complementary with no overlap, each doing a distinct job. Claim: this is principled, not framework-stacking.
2. **One binding constraint exists and is findable.** The spec (Section 3, "The binding constraint") asserts the skill can identify exactly ONE constraint from arbitrary input, and demotes confidence one notch if it cannot. Claim: TOC's single-constraint model applies to messy PM inputs, not just manufacturing throughput.
3. **"Cite or do not claim" is enforceable.** Behavioral guardrail #2 and refusal protocol #4 require every claim/recommendation to cite an input passage or be tagged "Inferred (Low confidence)." Claim: this is structurally enforceable via SKILL.md instructions + EXAMPLE.md anchoring + eval rubric.
4. **Cynefin keeps the skill honest.** The skill refuses High confidence in Complex/Chaotic domains. Claim: the model will actually discriminate domains rather than defaulting everything to Complicated.
5. **Foundation classification is correct.** The skill is classified `foundation` (reusable PM working-document) not `utility` (library tooling). Claim: output is a first-class artifact users attach to projects, on par with persona / lean canvas.
6. **10 sections at a 1,200-word default / 2,000-word ceiling is the right weight.** Claim: all 10 sections are load-bearing; the word budget keeps it readable.
7. **No harmful overlap with existing skills.** Claim: distinct from `jp-strategy-brief` (general strategy, jp-library), `utility-pm-critic` (artifact-bound adversarial review), and `using-workflows` (static routing).
8. **Single skill, not a family.** Claim: analysis + plan + prompts are tightly coupled around one decision question and must not be decomposed.

---

## Findings

### 1. Framework Soundness (TOC + OODA + Cynefin)

*Three named frameworks power one skill. If any is misapplied or redundant, the skill inherits false rigor: it will look principled while producing arbitrary output. This is the highest-stakes design question.*

**Specific question:** Are TOC, OODA, and Cynefin each doing genuine, non-overlapping work, correctly applied to the PM-input domain? Specifically: (a) Does Theory of Constraints' single-binding-constraint model legitimately transfer from manufacturing throughput to "what should a PM do next," or is "the constraint" just a rebranding of "the most important thing"? (b) Is Cynefin being used correctly as a sense-making framework, or reduced to a confidence-dial gimmick? (c) Could two frameworks be cut to one without losing value (e.g., is OODA just a generic structure that any 5-section template provides)?

**Reviewer - Codex (2026-05-28):**

> [Major | High] OODA is claimed as the structural skeleton, but the documents do not agree on what structure it produces. `strategy-brief.md` says the signature deliverable has "five sections" and that OODA "Maps to the five output sections," while `spec.md` expands to Sections 0-9 and says "Sections 1-7 map to Observe-Orient-Decide-Act" without showing the mapping. That makes OODA look like after-the-fact branding over a generic long-form template. Recommendation: either cut OODA from the analytical engine or add an explicit section-to-OODA map with a rule that every mandatory section must serve one OODA step.
>
> [Major | High] The TOC transfer is under-specified enough that "the constraint" risks becoming a renamed "most important issue." `spec.md` asserts "One constraint binds at any moment" and accepts "any input," but it never defines the system goal, throughput measure, constraint candidates, or causal chain required to justify a single binding constraint in a PM situation. This is especially weak for raw interviews, vague executive asks, or Slack threads where there may be multiple independent unknowns, not one operational bottleneck. Recommendation: require the skill to define the system, goal, candidate constraints, dependency logic, and why P1 lifts that constraint, or soften the claim to "primary planning bottleneck" when TOC evidence is weak.
>
> [Minor | Medium-High] Cynefin is mostly used as a confidence dial, not as a sense-making method. `spec.md` Section 2 maps domains directly to "Plan confidence ceiling," and `implementation-plan.md` Phase 4 pre-labels both a raw interview transcript and a vague SMB ask as Complex, which may train models to classify by input genre instead of dynamics. Recommendation: add domain decision rules, including what evidence distinguishes Complicated from Complex, and require Complex outputs to contain safe-to-fail probes rather than just lower confidence language.

**Requestor - Claude (date):**

> *Response goes here.* [P4]

---

### 2. Honesty Mechanism Enforceability ("cite or do not claim")

*The spec's central differentiator is grounded honesty: every claim cites an input passage, and the skill refuses fluent-but-fabricated confidence. If this is aspirational rather than enforceable, the skill ships the exact failure mode it claims to prevent.*

**Specific question:** Is "cite or do not claim" (behavioral guardrail #2, refusal protocol #4, Section 8 evidence map) structurally enforceable through SKILL.md instructions alone, given that the LLM both generates the claim AND judges whether it cited adequately? What concrete mechanisms beyond instructions (EXAMPLE.md anchoring, eval rubric items, template structure) would meaningfully raise compliance, and which proposed mechanisms are theater? Is there a risk the model fabricates plausible "input passage" citations to satisfy the rule?

**Reviewer - Codex (2026-05-28):**

> [Blocker | High] The core honesty mechanism is aspirational in the current structure. `spec.md` refusal protocol #4 says "Every claim and recommendation in the plan must cite a passage of the user's input," and behavioral guardrail #2 says "Every recommendation has an evidence cite or an `Inferred (Low confidence)` tag," but the output template puts the evidence map in Section 8 after the full plan has already been generated. The model is asked to create claims and then self-certify them, with no required claim IDs, source IDs, evidence field inside each P1-P5 effort, or failure rule when evidence is missing. Recommendation: make evidence structural by requiring a `Source:` field in every effort, every risk, and every prompt recommendation, plus a short source ledger with exact quotes copied from input before analysis begins.
>
> [Major | High] The spec does not prevent fabricated or over-cleaned source passages. Section 8 asks for a "direct quote or pointer to input," but there is no requirement to preserve exact wording, identify input segment names, cite file paths for file references, or mark unavailable sources. For a Slack thread or transcript, a plausible invented quote would satisfy the current visual shape. Recommendation: require exact short quotes for pasted input, `file path + heading or line context` for referenced files, and an explicit `No source provided` marker that cannot support P1 or High confidence.
>
> [Minor | Medium] The `Inferred (Low confidence)` escape hatch can swallow the rule. `spec.md` says uncited claims can be marked inferred or omitted, but it does not cap inferred claims or say whether inferred claims can justify the binding constraint, P1, or recommended prompts. Recommendation: ban inferred-only evidence for the binding constraint and P1, and cap inferred claims to a small number in lower-priority sections.

**Requestor - Claude (date):**

> *Response goes here.* [P4]

---

### 3. Scope Containment and Classification (foundation vs utility)

*"Takes any input and produces a plan" is dangerously close to "do everything," which risks doing nothing well. And the foundation-vs-utility call determines where users find the skill and what they expect from it.*

**Specific question:** (a) Does the "accepts any input" premise create an unbounded skill that cannot be good at anything specific, or do the frameworks + refusal protocols provide real containment? Name the single most likely scope-creep vector. (b) Is `foundation` the correct classification, or should this be `utility`? The spec argues foundation because the output is a reusable artifact (like persona/lean-canvas); the counter-argument is that foundation skills produce canonical PM artifacts from a known method, while this skill produces a meta-artifact about other skills. Which framing is more defensible for an open-source library where classification drives discovery?

**Reviewer - Codex (2026-05-28):**

> [Major | High] The most likely scope-creep vector is Section 7, not the analysis itself. `spec.md` says the skill accepts "notes, transcripts, drafts, executive asks, raw situations" and also provides "copy/paste prompts for downstream pm-skills." `strategy-brief.md` frames this as addressing the "discoverability tax" across 63 skills. That combination turns the skill into a general analyzer plus dynamic router, which is too broad for one MVP unless the prompt-recommendation surface is tightly bounded. Recommendation: make Section 7 optional and only allow prompts for a short allowlist of high-confidence downstream skills until eval data proves broader routing works.
>
> [Major | Medium-High] The foundation classification is defensible but not yet proven. `foundation-persona/SKILL.md` has a clearly bounded artifact contract: resolve one mode, choose one template, fill sections 1 through 11, preserve evidence and confidence blocks. By contrast, `prioritized-action-plan` is a meta-planning artifact that decides which other PM artifacts to produce next, which resembles `utility-pm-critic/SKILL.md` more than a canonical PM framework artifact. Recommendation: either reclassify to `utility` with category `analysis`, or narrow the output so it is clearly a reusable project artifact independent of downstream skill routing.
>
> [Note | High] The single-skill shape is not the problem. `strategy-brief.md` correctly argues that a family would split internal reasoning steps rather than real-world lifecycle boundaries, unlike meeting skills. The design risk is breadth inside the single skill, not the decision to avoid a family. Recommendation: keep one skill, but reduce its mandatory surface.

**Requestor - Claude (date):**

> *Response goes here.* [P4]

---

### 4. Output Structure Weight (the 10 sections)

*A comprehensive output that nobody reads has no value. Ten sections at up to 2,000 words risks being thorough but ignored, especially for users who wanted a fast "what do I do next."*

**Specific question:** Of the 10 sections (0 executive summary, 1 input mirror, 2 Cynefin classification, 3 binding constraint, 4 prioritized questions, 5 the action plan, 6 risks/pre-mortem, 7 recommended prompts, 8 evidence map, 9 open decisions), which are genuinely load-bearing and which are padding that a busy PM would skip? Is there redundancy (e.g., does Section 9 "Open decisions" duplicate Section 4 "Prioritized questions"? Does Section 0 executive summary duplicate content from 2/3/5)? Recommend a leaner cut if one exists, and state which sections you would make mandatory vs optional.

**Reviewer - Codex (2026-05-28):**

> [Major | High] Ten mandatory sections do not fit the claimed reading promise. `spec.md` targets 1,000-1,500 words with a 2,000-word ceiling, but Section 5 alone asks for 3-5 efforts, each with why, what, how, confidence, success signal, effort, and dependencies, plus a sequencing diagram and deferral list. Section 7 then asks for 2-5 ready-to-run prompts. The result will either exceed the ceiling or compress the actual plan into shallow bullets. Recommendation: make the mandatory artifact five parts: executive summary, input mirror, binding constraint, action plan with inline evidence, and next prompts only when high-confidence.
>
> [Minor | High] Section 9 duplicates Section 4. Section 4 already ranks "questions and information gaps that block higher-confidence planning," while Section 9 lists "Things the skill could not resolve without user input." A busy PM will not maintain the distinction. Recommendation: merge Section 9 into Section 4 as a `Decision required?` column.
>
> [Minor | Medium-High] The default cut order undermines the honesty mechanism. `spec.md` Depth scaling says to cut Section 9, Section 8, then Section 6 when near the ceiling, but Section 8 is the only global evidence audit and Section 6 is the only explicit pre-mortem. Recommendation: cut framework explanation and lower-confidence prompts first; never cut evidence for load-bearing recommendations.

**Requestor - Claude (date):**

> *Response goes here.* [P4]

---

### 5. Skill Overlap and Collision

*A new skill that overlaps an existing one creates trigger ambiguity (the wrong skill fires) and maintenance drift. The library already has three skills in adjacent territory.*

**Specific question:** Does `prioritized-action-plan` harmfully overlap with (a) `jp-strategy-brief` (transforms messy thinking into a 7-section structured analysis, in the separately-installed jp-library), (b) `utility-pm-critic` (adversarial review of a PM artifact with P0-P3 findings), or (c) `using-workflows` (static guide to multi-skill workflows)? For each, state whether the boundary is clean, blurry, or a genuine collision, and cite the specific overlapping behavior. If two skills would plausibly both trigger on the same user input, that is a finding. Is the differentiation defensible to a new user, or only to the author?

**Reviewer - Codex (2026-05-28):**

> [Major | High] `jp-strategy-brief` is a genuine collision in any environment where both libraries are installed. The strategy brief itself says `jp-strategy-brief` is the "primary lineage" and describes it as taking "messy unstructured input" into a "structured, decision-ready document." The proposed skill says it takes "any input" and produces "a comprehensive, decision-ready brief" plus a plan. A user prompt like "help me think through this messy launch situation and tell me what to do next" plausibly triggers both. Recommendation: add a user-facing boundary: `jp-strategy-brief` for broad strategic exploration and option framing, `prioritized-action-plan` only when the user asks for a ranked next-action plan inside PM delivery work.
>
> [Minor | High] `utility-pm-critic` is mostly clean, but the draft PRD path is blurry. `spec.md` says not to use this skill when the user has a "fully scoped artifact and wants critical review," yet the use cases include "a half-baked PRD draft." `utility-pm-critic/SKILL.md` handles adversarial review of PRDs and other PM artifacts. Recommendation: add a trigger rule: if the user asks whether an artifact is good, use critic; if the user asks what to do next with incomplete context, use prioritized-action-plan.
>
> [Minor | Medium-High] `using-workflows` is a blurry boundary because Section 7 makes this skill recommend downstream skills and prompts. `spec.md` says not to use it for a "multi-skill workflow walkthrough," but also says use it when the user wants "which pm-skills to invoke next, in what order, and with what prompts." Recommendation: prohibit naming full workflows in Section 7 unless the output first states why a static workflow is a better fit and hands off to `using-workflows`.

**Requestor - Claude (date):**

> *Response goes here.* [P4]

---

### 6. Acceptance Criteria Testability

*The spec lists acceptance criteria and an eval pass (implementation-plan Phase 7). If the AC are not objectively testable, "done" becomes a judgment call and quality is unverifiable.*

**Specific question:** Are the spec's acceptance criteria (the "Acceptance criteria" section and the implementation plan's per-phase criteria) objectively testable with clear pass/fail conditions, or do they rely on subjective judgment ("coherent," "distinct," "reads as a complete plan")? Specifically, how would one mechanically verify "the skill correctly classifies at least one Complex situation and refuses High confidence" (AC #5) without a human grader? Propose concrete, measurable rewrites for any AC that is currently subjective.

**Reviewer - Codex (2026-05-28):**

> [Major | High] Several acceptance criteria are subjective and will not prevent shallow success. `spec.md` says examples must produce "coherent, distinct plans," and `implementation-plan.md` Phase 3 says `EXAMPLE.md` must "read as a complete, coherent action plan." Those are reader impressions, not pass/fail checks. Recommendation: rewrite AC into measurable checks, such as exact section count, word count range, number of effort blocks, every effort containing all required fields, every P1/P2 recommendation containing at least one exact source quote, and zero placeholder tokens.
>
> [Major | High] The Cynefin acceptance criterion cannot be mechanically verified as written. `spec.md` AC #5 says the skill must "correctly classify at least one Complex situation and refuse High confidence," while `implementation-plan.md` Phase 4 predefines example 2 and 3 as Complex. That tests whether the model repeats a label, not whether it discriminates domains. Recommendation: create fixture inputs with expected labels and a rubric that scores cause/effect evidence, reversibility, novelty, and whether the plan contains probes for Complex or stabilization for Chaotic.
>
> [Minor | Medium] The quality language mixes severity systems. `implementation-plan.md` Phase 7 says "No P0 deltas" and "P1 deltas," while this review packet and spec-review process use Blocker/Major/Minor/Note. `utility-pm-critic/SKILL.md` uses P0/P1/P2/P3, but the current packet uses a different scale. Recommendation: normalize release criteria to one severity system or include an explicit mapping.

**Requestor - Claude (date):**

> *Response goes here.* [P4]

---

### 7. Latent Rewrite Risks (P0/P1 design flaws)

*Some flaws are cheap to fix now and ruinous to fix after the skill body + template + 3 examples are authored. This section is the catch-all for anything that would force a late rewrite.*

**Specific question:** Identify any design decision in the spec that, if wrong, would force a rewrite of already-built artifacts (SKILL.md, TEMPLATE.md, examples) rather than a localized edit. Candidates to pressure-test: the dependency on a build-time regenerated `references/skill-catalog.md` for Section 7 prompts (does this actually work cross-LLM, or only on Claude Code with file access?); the assumption that v2.22.0 naming standardization must ship first; the single-paste input limitation; the absence of a sub-agent variant. What is the one decision in this spec you are least confident is correct?

**Reviewer - Codex (2026-05-28):**

> [Major | High] The skill-catalog dependency is the design decision most likely to force a rewrite. `spec.md` D-S2 recommends a versioned `references/skill-catalog.md` regenerated at build time, while `implementation-plan.md` Phase 5 adds a script and release-time regen. But Section 7 promises ready-to-run prompts for the user's context, and the skill's value depends on fresh names after v2.22.0. If the catalog is stale, unavailable to a client, or too large for some clients, examples and templates built around broad routing will fail. Recommendation: treat catalog-backed prompts as optional MVP behavior and add a fallback mode that recommends only named skills visible in the current skill body.
>
> [Major | High] The naming decision is inconsistent across source documents and would contaminate every companion file. `strategy-brief.md` has a locked table saying Name = `prioritized-action-plan`, but later Section 5 and the Recommendation summary say "Recommend `analyze-and-plan`" and "Name: `analyze-and-plan` (preferred)." `spec.md` and `implementation-plan.md` use `prioritized-action-plan`. Recommendation: resolve the name before authoring SKILL.md, command wrappers, examples, release notes, and catalog entries.
>
> [Major | Medium-High] The input model is internally contradictory. `spec.md` inputs include "file references" and the strategy brief says users may provide "links, file references, a brain dump," but `spec.md` D-S5 and `implementation-plan.md` Out of scope say "Single-paste only for MVP" and "Multi-file or multi-paste inputs" are deferred. Cross-client support for reading files and links is not uniform. Recommendation: either remove file and link references from MVP triggers and examples, or define a strict input acquisition protocol for clients with and without file access.
>
> [Note | Medium] Waiting for v2.22.0 naming standardization is sound and should stay. `implementation-plan.md` Pre-flight gate correctly says recommended prompts would be born stale if built before the rename. This is not a flaw, but it should be treated as a hard gate in Phase 0, not just a schedule note. Recommendation: do not start examples until the final skill names are present in the catalog.

**Requestor - Claude (date):**

> *Response goes here.* [P4]

---

## Proposed Actions

[P4: Claude fills this single consolidated table after Codex returns findings. Every Blocker and Major finding generates a row and a per-decision section above.]

Proposed Actions were resolved directly into `spec.md` rather than tabulated here: the maintainer decided the four design forks (artifact weight, classification, OODA, routing) and Claude folded all Blocker/Major dispositions into the spec. See the dispositions table at the top of `spec.md` for the per-finding outcome.

---

## Round 2: Codex re-review of the revised spec (2026-05-28)

The revised spec was sent back to the same Codex thread (resumed) to confirm the fixes held.

> **Reviewer - Codex (2026-05-28, Round 2):** The revised spec materially improves the design and resolves the original Blocker: evidence is now positioned before analysis, threaded inline, and backed by a mechanical substring check. The strongest remaining concerns are narrower: the completeness-first output policy can still produce bloated artifacts, and the tiered routing fallback is not yet mechanically safe because the embedded fallback does not enumerate exact skill names. Headline: close, but fix routing validation and add a bloat backstop before building.

| Severity | Count (Round 2) |
|----------|-----------------|
| Blocker  | 0 |
| Major    | 2 |
| Minor    | 4 |
| Note     | 4 |

**Round 2 Major findings and resolution:**

- [Major | High] Routing fallback names skill categories, not exact names, so a catalog-less client could guess/hallucinate. RESOLVED: name-safety rule added to Section 7; `references/recommendable-tiers.md` must enumerate exact names; AC #7 checks name validity.
- [Major | Medium-High] Relaxed word ceiling removed the bloat backstop. RESOLVED: hard max per complexity tier (1,500 / 2,200 / 3,000) + Section 7 capped at top 3 prompts + AC #10.

**Round 2 Minors (applied):** evidence substring check against normalized input (pasted + read-file text); source cross-reference integrity AC; Step 0 ledger "3-12 or all if fewer than 3"; pre-build `analyze-and-plan` search; paste-first examples.

**Round 2 verdict:** 0 Blocker, 0 unresolved Major after the fixes above. Spec is ready to build from once v2.22.0 ships.
