# Spec: `prioritized-action-plan` (foundation)

**Status:** REVISED post-Codex review 2026-05-28 - design forks locked, ready for build when v2.22.0 ships
**Date:** 2026-05-27 (revised 2026-05-28)
**Parent:** [`strategy-brief.md`](../../skills-ideas/prioritized-action-plan/strategy-brief.md) (discovery doc in skills-ideas)
**Master plan:** [`plan_v2.23.0.md`](plan_v2.23.0.md)
**Review:** [`spec_prioritized-action-plan_reviewed-by-codex.md`](spec_prioritized-action-plan_reviewed-by-codex.md) (round 1: 1 Blocker, 12 Major, 7 Minor, 2 Note; round 2: 0 Blocker, 0 unresolved Major; dispositions below)
**Target release:** v2.23.0 (after v2.22.0 naming standardization ships)
**Effort estimate:** 3-4 effort-days (skill body + template + 3 examples + eval pass)
**Frameworks:** Theory of Constraints (Goldratt) for prioritization, Cynefin (Snowden) for confidence calibration. OODA was cut after review (it was structural branding without a real section mapping).

This spec is a full SKILL.md draft plus structural notes. At execution time the maintainer copies the SKILL.md draft to `skills/prioritized-action-plan/SKILL.md` and authors the companion `TEMPLATE.md`, `EXAMPLE.md`, and 3 example outputs.

## What changed in the 2026-05-28 revision (post-Codex)

| Codex finding | Severity | Disposition |
|---|---|---|
| Evidence map sits after the plan, so "cite or do not claim" is unenforceable | Blocker | ACCEPTED. Added Step 0 source ledger (built before analysis) + inline `Source:` field on every effort, risk, and prompt. Inferred-only evidence banned for the binding constraint and P1. |
| OODA is branding without a section mapping | Major | ACCEPTED. OODA cut as a named framework. Engine is now TOC + Cynefin. |
| TOC single-constraint transfer under-specified | Major | ACCEPTED. Section 3 now requires naming the system, goal, candidate constraints, dependency logic, and why P1 lifts the constraint; softens to "primary planning bottleneck" when evidence is weak. |
| Cynefin used as a confidence dial, not sense-making | Minor | ACCEPTED. Section 2 adds domain decision rules and requires probes (Complex) / stabilization (Chaotic) in the plan, not just lower confidence. |
| Section 7 routing is the main scope-creep vector; catalog is fragile | Major | ACCEPTED via tiered recommendable model + hybrid breadth + graceful fallback (see "Recommendable skill tiers"). |
| foundation vs utility classification unproven | Major | DECISION: keep `foundation`. The output is a saved, reusable working-document; routing is now bounded so the skill is not primarily a router. |
| 10 sections too heavy for a 1,200-word promise | Major | PARTIALLY ACCEPTED. Completeness is prioritized over brevity (maintainer call): sections stay mandatory, the executive summary is the fast-skim layer, and the hard word ceiling is relaxed to a soft target. Section 9 merged into Section 4 to remove genuine duplication (nets 9 sections). |
| Section 9 duplicates Section 4 | Minor | ACCEPTED. Merged into Section 4 with a "Decision required?" column. |
| Depth-scaling cut order sacrifices evidence/pre-mortem first | Minor | ACCEPTED. New cut order never drops evidence or pre-mortem first. |
| `jp-strategy-brief` collision | Major | ACCEPTED. Explicit boundary added to "When NOT to use." |
| `utility-pm-critic` draft-PRD path blurry | Minor | ACCEPTED. Trigger rule added. |
| `using-workflows` boundary blurry | Minor | ACCEPTED. Section 7 hands off to `using-workflows` instead of naming full workflows. |
| Acceptance criteria subjective | Major | ACCEPTED. AC rewritten as mechanical checks. |
| Cynefin AC tests label-repetition, not discrimination | Major | ACCEPTED. AC now uses a labeled fixture set + a discrimination rubric. |
| Severity systems mixed (P0/P1 vs Blocker/Major) | Minor | ACCEPTED. Normalized; mapping noted in the implementation plan. |
| Naming inconsistency (`analyze-and-plan` leftovers) | Major | ACCEPTED. Strategy brief swept. |
| Input model contradictory (file refs vs single-paste MVP) | Major | ACCEPTED. Paste is the primary MVP input; file references allowed only on file-access clients with a paste fallback; links/web-fetch out of scope. |
| v2.22.0 gate is sound; make it a hard gate | Note | ACCEPTED. Pre-flight gate in the implementation plan is hard, not advisory. |

### Round 2 (Codex re-review of the revised spec, 2026-05-28)

A second Codex pass on the revised spec returned **0 Blocker, 2 Major, 4 Minor, 4 Note** and confirmed the Blocker is resolved ("evidence changed from a decorative end-section into a structural precondition"). Both remaining Majors were mechanical-safety refinements, now applied:

- **Routing name-safety (Major):** the fallback named skill categories ("all 30 phase skills"), not exact names, so a catalog-less client could still guess. Fixed: a name-safety rule in Section 7 (never name a skill not in the catalog or the embedded exact-name Tier 1 list; plain language otherwise), `references/recommendable-tiers.md` must enumerate exact names, and AC #7 now checks name validity against the allowlist (not just the Tier 3 exclusion).
- **Bloat backstop (Major):** the relaxed word ceiling removed the runaway guard. Fixed: hard max per complexity tier (1,500 / 2,200 / 3,000), Section 7 capped at top 3 prompts, AC #10 records overage.
- **Minors applied:** evidence substring check now runs against normalized input (pasted text plus read file text); source cross-reference integrity AC added; Step 0 ledger relaxed to "3-12, or all load-bearing facts if fewer than 3"; pre-build literal search for `analyze-and-plan`; examples authored paste-first.

Verdict after Round 2: no Blockers, no unresolved Majors. Spec is ready to build from once v2.22.0 ships. Review record: [`spec_prioritized-action-plan_reviewed-by-codex.md`](spec_prioritized-action-plan_reviewed-by-codex.md).

---

## Skill identity

- **Classification:** foundation (output is a reusable PM working-document the user saves and attaches to a project)
- **Phase coverage:** all six Triple Diamond phases; intentionally phase-agnostic
- **Invocation lifetime:** single-turn; produces one action plan per invocation
- **Read-only:** consumes input only; does not modify project state
- **Composes with:** a bounded, tiered set of downstream pm-skills via the Recommended Prompts section (see "Recommendable skill tiers"); does not invoke other skills inline

## Core principle

**One constraint binds at any moment; everything else is noise until that constraint is lifted.** The skill applies Theory of Constraints to identify the critical next effort (P1), then sequences 2-4 follow-on efforts behind it. Cynefin calibrates how confident the plan is allowed to be, given how knowable the situation is.

The skill is honest about what it does not know. In Complex or Chaotic situations (per Cynefin), it refuses to manufacture High-confidence multi-step plans: Complex situations get safe-to-fail probes, Chaotic situations get stabilization actions, both at capped confidence.

Evidence is structural, not decorative. Before writing any section, the skill builds a source ledger of exact quotes from the input. Every load-bearing claim then points to a ledger entry. A claim with no source cannot drive the binding constraint or P1.

## When to use this skill

- The user has input (notes, transcript, executive ask, draft PRD, customer interview, Slack thread, raw situation) and wants a ranked next-action plan
- The user is uncertain what to do next and wants a recommendation grounded in their actual context
- The user wants a single referenceable artifact that says what is most important, why, and how to execute it

## When NOT to use this skill

- **vs `utility-pm-critic`:** if the user asks "is this artifact good / what is wrong with it," use `utility-pm-critic`. Use `prioritized-action-plan` when the user asks "what should I do next" with incomplete context. A half-baked draft is in scope here; a finished artifact awaiting critique is not.
- **vs `jp-strategy-brief` (jp-library):** if the user wants broad strategic exploration, option framing, or "help me think through this," use `jp-strategy-brief`. Use `prioritized-action-plan` only when the user wants a ranked next-action plan inside PM delivery work. If both libraries are installed and the ask is ambiguous, prefer `jp-strategy-brief` for exploration and this skill for committed execution sequencing.
- **vs `using-workflows`:** if the user wants a multi-skill workflow walkthrough, use `using-workflows`. This skill may point toward a workflow but hands off rather than reproducing it.
- The user wants to generate a specific named artifact (persona, OKRs, journey map) - invoke that skill directly.
- The input is unrelated to PM work - refuse with a one-line redirect.

## Frameworks (the analytical engine)

| Framework | Role in the skill | Output where it appears |
|---|---|---|
| **Theory of Constraints** | Prioritization engine; identifies THE one binding constraint, which becomes P1 | Section 3 (constraint) and Section 5 (plan ranking) |
| **Cynefin** | Situation classifier; caps plan confidence and shapes the plan posture (probes vs commitments vs stabilization) | Section 2 (classification) and confidence markers throughout |

Both frameworks are cited in the SKILL.md body so the skill's reasoning is auditable. A user can challenge any recommendation by asking "which constraint does this lift, and what evidence?"

---

## Full SKILL.md draft

```markdown
---
name: prioritized-action-plan
description: Produce a comprehensive, evidence-grounded prioritized action plan from any PM input (notes, transcripts, drafts, executive asks, raw situations). Outputs a saveable document with executive summary, input mirror, situation classification (Cynefin), the binding constraint (Theory of Constraints), prioritized questions and open decisions, the action plan (1 critical effort plus 2-4 follow-ons, each with why/what/how/confidence/source/expected outcome/effort/dependencies), risks and pre-mortem, copy/paste prompts for a bounded set of downstream pm-skills, and an evidence map. Phase-agnostic across the Triple Diamond. Builds a source ledger before analysis and cites exact input quotes; refuses to manufacture High-confidence plans for Complex or Chaotic situations. Use when the user wants the critical next effort and how to execute it. Not for critiquing a finished artifact (use pm-critic) or broad strategic exploration (use a strategy brief).
license: Apache-2.0
compatibility:
  - claude-code
  - codex-cli
  - cursor
  - windsurf
  - copilot-cli
  - gemini-cli
metadata:
  classification: foundation
  version: 1.0.0
  updated: 2026-05-28
  category: planning
  frameworks:
    - triple-diamond
    - theory-of-constraints
    - cynefin
  author: product-on-purpose
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Prioritized Action Plan

You produce a comprehensive, evidence-grounded action plan from PM input the user provides. Your job is to identify the critical next effort, sequence the follow-on efforts behind it, and equip the user with copy/paste prompts to execute. The plan is the deliverable; the prompts are an enabler.

## Identity

- Foundation skill; produces a reusable PM working-document the user saves and reuses
- Single-turn; one action plan per invocation
- Read-only tools (Read, Grep); produces markdown output
- Recommends a bounded, tiered set of downstream pm-skills (see "Recommendable skill tiers"); never invokes them inline

## Core principle

**One constraint binds at any moment; everything else is noise until it is lifted.** Theory of Constraints supplies the prioritization logic: find the single binding constraint, make P1 the effort that lifts it. Cynefin supplies the confidence calibrator: how knowable the situation is caps how confident the plan may be.

Evidence is structural. You build a source ledger of exact input quotes before writing any section, and every load-bearing claim cites a ledger entry. If you cannot cite, you cannot claim it as fact.

## Inputs

Required:

- User-provided content pasted into the conversation: notes, text, transcripts, drafts, executive asks, Slack threads, raw situations
- Stated or inferred intent (what the user is trying to accomplish)

Optional, improves quality:

- Stated constraints (deadline, budget, team capacity, stakeholders)
- The user's current Triple Diamond phase if known
- A prior action plan to revise or extend

Input acquisition rules:

- **Pasted text is the primary input.** Treat what the user pasted as the authoritative source.
- **File references:** if the user names a file AND the client has file access (e.g. Claude Code), read it and treat its quoted passages as input. If the client cannot read files, ask the user to paste the relevant content rather than guessing. Never fabricate file contents.
- **Links / URLs are out of scope for now.** Ask the user to paste the relevant text. Do not assume web-fetch capability.

## Refusal and honesty protocols

1. **Off-topic input.** If the input is not PM work (personal decisions, recreational coding, unrelated technical questions), produce a one-line redirect: "This skill is scoped to product management work. For other contexts, use a general assistant."
2. **Insufficient signal.** If the input is under ~50 words and lacks specific signal, ask ONE clarifying question before producing the plan. Do not interrogate.
3. **Complex / Chaotic situation.** If the situation classifies Complex or Chaotic, produce the plan but lead the executive summary with the classification and its honest implication, and shape the plan accordingly (probes / stabilization, capped confidence).
4. **Cite or do not claim.** Every load-bearing claim and recommendation must reference a source-ledger entry built from the input. A claim with no source is tagged `Inferred (Low confidence)` and may NOT justify the binding constraint, P1, or any High-confidence marker. Do not invent or paraphrase-then-quote: ledger quotes must be exact substrings of the input.
5. **No source available.** If the input genuinely lacks evidence for a needed claim, write `No source provided` and treat the claim as a gap in Section 4, not as fact.

## Step 0: Build the source ledger (before writing any section)

Before composing the document, extract a short ledger of exact quotes from the input. This is internal scaffolding that also feeds Section 8.

```
S1: "exact quote from input" (origin: pasted text / file path + heading)
S2: "exact quote from input" (origin: ...)
...
```

Aim for 3-12 entries covering the load-bearing facts (or all of them if fewer than 3 exist; do not split one fact into artificial entries to hit a count). Every `Source:` field in the document references these IDs (e.g. `Source: S3`). If you find yourself wanting to cite something not in the ledger, either add it (with an exact quote) or mark the claim Inferred.

## Output structure

Produce ONE markdown document with the sections below, in order. Completeness is the priority: the executive summary is the fast-skim layer for busy readers, and the rest of the document is the complete artifact. Do not pad, but do not drop a section to save words. Per-section word targets are guidance, not hard ceilings.

### Section 0. Executive summary (top, 120-180 words)

The fast-skim layer. Bullets, in this order:

- **Situation classification:** Clear / Complicated / Complex / Chaotic (Cynefin) + one-line reasoning
- **The binding constraint:** what is currently limiting progress (TOC)
- **The critical next effort (P1):** one sentence
- **Overall plan confidence:** High / Medium / Low + one-line reasoning (must respect the Cynefin ceiling)
- **Time-to-value:** how long to see signal from P1

### Section 1. Input mirror - What I understand

Reflect the input back so the user can confirm before the analysis carries weight:

- **What you gave me:** the substantive content, restated concisely
- **What you appear to be trying to accomplish:** inferred intent, with a confidence level
- **Adjacent intents I noticed but did not assume:** things mentioned in passing

### Section 2. Situation classification (Cynefin)

State the domain and justify it with source-ledger citations. Apply these decision rules rather than classifying by input genre:

| Domain | Decision rule (how you know) | Plan posture | Confidence ceiling |
|---|---|---|---|
| Clear | Cause and effect obvious and undisputed; a known best practice applies | Apply best practice | High |
| Complicated | Cause and effect knowable with analysis or expertise; good practices exist | Analyze, then commit | Medium-High |
| Complex | Cause and effect only clear in hindsight; the input shows conflicting signals, novelty, or unknown unknowns | Run safe-to-fail probes; instrument and sense | Medium-Low |
| Chaotic | No discernible cause and effect; active crisis or breakage in the input | Act to stabilize first, then re-assess | Low |

Distinguish Complicated from Complex by evidence, not topic: a problem is Complex when the input shows the outcome is genuinely unpredictable (new market, untested user behavior, conflicting data), not merely hard. If Complex, the plan MUST contain probes; if Chaotic, the plan MUST contain stabilization actions. Cite the passages that drove the classification.

### Section 3. The binding constraint (Theory of Constraints)

Identify the ONE thing currently limiting progress. State:

- **The system and goal:** what process or outcome are we trying to advance, in one line (e.g. "ship an SMB plan that converts trials")
- **The constraint:** named in plain language
- **Source:** the ledger entries that evidence it (`Source: S2, S5`)
- **Candidate constraints considered:** name 1-2 other plausible constraints and explain why they are downstream of, or subordinate to, this one
- **Why P1 lifts it:** the causal link from the chosen P1 effort to relieving this constraint

If the evidence for a single binding constraint is weak, say so: call it the "primary planning bottleneck (low confidence)" rather than asserting a definitive constraint, flag it as the top gap in Section 4, and demote overall plan confidence one notch.

### Section 4. Prioritized questions, gaps, and open decisions

The unknowns that block higher-confidence planning, merged with decisions only the user can make. Ranked table:

| Rank | Question / gap | Why it matters | Decision required? | How to resolve |
|---|---|---|---|---|
| Q1 | [most important unknown] | [impact on the plan] | Yes - blocks P1 / No | [research, conversation, or artifact that resolves it] |
| Q2 | ... | ... | ... | ... |

3-7 entries. The "Decision required?" column flags items that need a user call before the relevant effort can start (this absorbs the former standalone "open decisions" section).

### Section 5. The prioritized action plan

The primary deliverable. Exactly 3-5 efforts, ranked P1 (lifts the constraint) through P5 (sequenced behind). Each effort is a structured block:

```
#### P1. [Effort name]

- **Why:** [TOC reasoning: which constraint this lifts; why it is the critical next move]
- **What:** [concrete deliverable or outcome]
- **How:** [3-5 concrete steps]
- **Confidence:** High / Medium / Low + one-line reasoning (must respect the Cynefin ceiling)
- **Source:** [ledger IDs grounding this effort, or `Inferred (Low confidence)`]
- **Expected outcome / success signal:** [what changes if this works]
- **Estimated effort:** [honest time estimate]
- **Dependencies:** [what must be true first, or "none"]
```

P1 gets the fullest treatment; P2-P5 are shorter but keep all fields. P1 may NOT be `Inferred`: if you cannot source the binding constraint and P1, the situation is under-evidenced - say so and make P1 a discovery effort.

After the effort blocks:

- **Sequencing (Now / Next / Later):** a 3-column table mapping P1-P5 to time horizons
- **What to defer / what NOT to do:** 2-4 explicit non-actions. Pre-committing to deferral is half the value of prioritization.

### Section 6. Risks and pre-mortem

Assume the plan failed; what went wrong? 3-5 risks:

| Risk | Likelihood | Impact | Early signal | Mitigation | Source |
|---|---|---|---|---|---|
| [specific failure mode] | H/M/L | H/M/L | [observable indicator] | [pre-emptive action] | [ledger ID or `Inferred`] |

Generic risks are not acceptable. "The team may lack capacity" is generic; "design is committed to the Q3 redesign that lands the same week as P2 user research (S7)" is specific.

### Section 7. Recommended pm-skill prompts (copy/paste ready)

For each effort that maps to a recommendable downstream skill, provide a ready-to-run prompt with the user's context already filled in:

```
#### To execute P1: [effort name]

**Skill:** `[skill-name]`
**Why this skill:** [one line]
**Source:** [ledger IDs that justify recommending this next step]

**Prompt:**
> [Full prompt with the user's actual context injected. Not a template. No placeholders.]
```

Routing rules:

- Recommend ONLY from the tiered recommendable set (see "Recommendable skill tiers"). Never recommend a Tier 3 skill or this skill itself.
- **Name safety (no guessing).** You may name a skill ONLY if its exact name appears in the available skill catalog OR in the embedded exact-name Tier 1 list (in `references/recommendable-tiers.md`). If you cannot confirm a skill's exact name from one of those sources, do NOT name a skill: describe the next step in plain language instead. Never invent or approximate a skill name.
- If a fresh catalog is available, route across Tier 1 and conditional Tier 2. If it is not, fall back to the embedded exact-name Tier 1 list; where no listed skill maps cleanly, give the plain-language step.
- For methodology families (Foundation Sprint, Design Sprint), recommend the family entry point or hand off to `using-workflows`; do not stitch together individual sub-step skills.
- Skip efforts with no clean skill mapping; the user executes those manually. Cap at the top 3 prompts (P1-P3).

### Section 8. Evidence and source map

Consolidate the source ledger and audit coverage. Table:

| Claim / recommendation | Source ID | Exact quote |
|---|---|---|
| [what was claimed] | S3 | "exact words from input" |

List any load-bearing claim that is `Inferred (Low confidence)` and confirm none of them drive the binding constraint or P1. State evidence gaps honestly. This section is an audit of the inline sources, not the first place evidence appears.

## Recommendable skill tiers

Section 7 may only recommend from this filtered set. The full catalog is never all skills: library-maintenance tooling and the skill itself are excluded.

- **Tier 1 - always recommendable (core work products):** all 30 phase skills (discover / define / develop / deliver / measure / iterate) plus the 4 core foundation artifacts (`foundation-persona`, `foundation-lean-canvas`, `foundation-okr-writer`, `foundation-stakeholder-update`). This is the embedded fallback core. `references/recommendable-tiers.md` MUST enumerate these as EXACT skill names (not categories), authored against the post-v2.22.0 names, so the name-safety rule in Section 7 has a concrete list to check against when no catalog is loaded.
- **Tier 2 - conditional (recommend only when context matches):** `foundation-meeting-*` (only for meeting next-steps); the Foundation Sprint and Design Sprint families (recommend the family entry point, or hand to `using-workflows`); `utility-pm-critic` (when the next step is reviewing an artifact); `utility-mermaid-diagrams` and `utility-slideshow-creator` (when the next step is visualizing or presenting).
- **Tier 3 - never recommend:** `utility-pm-skill-builder`, `utility-pm-skill-auditor`, `utility-pm-skill-validate`, `utility-pm-skill-iterate`, `utility-pm-release-conductor`, `utility-pm-changelog-curator`, `utility-update-pm-skills` (library machinery), and `prioritized-action-plan` itself.

The build-time catalog generator (see references) applies this tiering: it emits Tier 1 and Tier 2 with a conditional flag and omits Tier 3. Skill names are read from frontmatter so they stay correct after the v2.22.0 rename.

## Depth scaling

| Input complexity | Target (soft) | Hard max (backstop) |
|---|---|---|
| Simple (one clear thread, brief input) | 900-1,300 words | 1,500 |
| Medium (2-3 threads, moderate context) | 1,300-2,000 words | 2,200 |
| Complex (multiple threads, dense input) | 2,000-3,000 words | 3,000 |

Targets are soft and completeness wins over hitting the low end, but the hard max is a real ceiling: if you exceed it, you are padding, not being thorough. Section 7 is capped at the top 3 prompts regardless of effort count (recommend prompts for P1-P3; the user can ask for more). If you must shorten, cut in this order: framework explanation, then the lowest-confidence Section 7 prompts, then compress prose. NEVER drop the evidence map (Section 8) or the pre-mortem (Section 6) to save words.

## Behavioral guardrails

1. **One constraint, one P1.** If everything is critical, nothing is. Name the single binding constraint.
2. **Cite or do not claim.** Build the source ledger first; every load-bearing claim references a ledger ID or is tagged `Inferred (Low confidence)`. Inferred claims may not drive the constraint or P1.
3. **Cynefin caps confidence.** Refuse High confidence in Complex or Chaotic situations regardless of how confident the analysis feels. Complex plans contain probes; Chaotic plans contain stabilization.
4. **Mirror first, plan second.** The user must be able to confirm the mirror before the plan carries weight.
5. **Prompts are filled, not templated.** A prompt with placeholders is unfinished work.
6. **Defer is half the value.** Pre-commit to non-action; do not leave an open-ended list.
7. **One skill, one document.** Recommend downstream skills; never invoke them inline. The plan is the artifact.

## Output destination

Chat output by default. Optional disk write to `_output-pm-skills/prioritized-action-plan/<slug>-<YYYY-MM-DD>.md` when the user passes `--out` or says "save this."

## Common pitfalls

- **Plan-shaped slop.** Five generic efforts with no constraint link is a list, not a plan. Tie P1 to the named constraint.
- **False-confidence inflation.** Complex domain but a High-confident plan means the honesty mechanism failed. Re-classify or downgrade.
- **Fabricated quotes.** A `Source:` quote that is not an exact substring of the input is a fabrication. Quote exactly or mark Inferred.
- **Hand-wavy prompts.** "Run define-problem-statement on the input" is a pointer, not a prompt. Fill it with the user's actual context.
- **Recommending Tier 3.** Never point a user at library-maintenance tooling as a PM next step.

## Integration

- Output document is portable: paste into Obsidian, Notion, GitHub issues, Slack, or attach to a project
- Pairs with `utility-pm-critic` for adversarial review of the produced plan
- Hands off to `using-workflows` when a known multi-skill workflow is the better fit
- Sits downstream of `jp-strategy-brief` (jp-library): explore with the brief, then commit to execution sequencing here
```

---

## Acceptance criteria (mechanical, for the skill build)

The skill ships when all of the following pass. Each is an objective check, not a reader impression.

1. **Frontmatter valid.** `utility-pm-skill-validate --strict` passes on the new SKILL.md.
2. **Section presence.** Output contains exactly the 9 mandatory section headers (0-8) in order. Automated header check.
3. **Effort-block completeness.** Section 5 contains 3-5 effort blocks; every block contains all 8 fields (Why, What, How, Confidence, Source, Expected outcome, Estimated effort, Dependencies). Field-presence check.
4. **Evidence grounding.** Every `Source:` quote in the evidence map is an exact substring of the normalized input. "Normalized input" = the pasted text PLUS the text of any file the skill was given access to and read (the test harness captures both before checking). The binding constraint and P1 each cite at least one non-Inferred source. Automated substring check.
5. **Source cross-reference integrity.** Every effort (Section 5), risk (Section 6), and prompt (Section 7) contains a non-empty `Source:` field; every inline source ID referenced anywhere resolves to an entry in the Section 8 map (no undefined IDs); the Section 2 classification cites valid ledger IDs. Automated cross-reference check.
6. **No placeholders.** Output contains zero unfilled tokens (`[`, `TODO`, `<placeholder>`, `...`). Regex check.
7. **Skill-name validity.** Every skill named in Section 7 exists in `references/skill-catalog.md` or the embedded exact-name Tier 1 list, AND none is a Tier 3 skill or `prioritized-action-plan` itself. Name-list check against both the allowlist and the exclusion set (catches hallucinated names, not just excluded ones).
8. **Cynefin discrimination (fixture-scored).** A fixture set of >= 6 inputs with pre-assigned expected domains (mixing Clear / Complicated / Complex / Chaotic) is run; the skill matches the expected domain on >= 5 of 6. For every Complex output the plan contains probe language and no High marker; for every Chaotic output the plan contains stabilization language. The fixtures are NOT the same inputs used as shipped examples (prevents teaching-to-the-test).
9. **Confidence ceiling respected.** No output marks overall or P1 confidence "High" when the classification is Complex or Chaotic. Automated check.
10. **Word backstop respected.** Output does not exceed the hard max for its complexity tier (1,500 / 2,200 / 3,000). Word count check (recorded; a single overage is a warning, repeated overage across the eval set is a fail).
11. **Cross-client trigger.** The skill triggers on Claude Code and Codex CLI via description match; Cursor is best-effort. Manual smoke test.
12. **Validator bundle.** All pre-tag validators pass `--strict`; skill-count breakdowns updated consistently.
13. **Release notes.** v2.23.0 (or the carrying release) describes the skill in plain language.

## Open decisions (status after review)

| ID | Decision | Status |
|---|---|---|
| D-S1 | Word budget | RESOLVED: soft targets, completeness over count, exec summary is the skim layer. Hard ceiling removed. |
| D-S2 | How the skill knows the live catalog | RESOLVED: hybrid. Build-time-regenerated `references/skill-catalog.md` filtered to Tier 1 + conditional Tier 2 (Tier 3 omitted); graceful fallback to embedded Tier 1 core when the catalog is unreadable. |
| D-S3 | Cross-library prompts (jp-library) | RESOLVED: pm-skills only for MVP. |
| D-S4 | Inline `utility-pm-critic` adversarial pass | RESOLVED: deferred; recommend it in Section 7 instead. |
| D-S5 | File / multi-input handling | RESOLVED: paste is primary; file refs only on file-access clients with paste fallback; links out of scope; multi-paste deferred. |
| D-S6 | Confidence label set | RESOLVED: Low/Medium/High for the skill output; Blocker/Major/Minor/Note for review; mapping noted in the implementation plan. |
| D-S7 | Classification | RESOLVED: foundation. |
| D-S8 | Framework set | RESOLVED: TOC + Cynefin; OODA cut. |

## Risks (spec-level)

- **Fabricated source quotes.** The substring check (AC #4) is the structural defense; EXAMPLE.md must include a case where the model correctly marks a claim `Inferred (Low confidence)` rather than inventing a quote.
- **Cynefin collapses to Complicated.** The fixture rubric (AC #7) is the defense; examples must include a genuine Complex and a Chaotic case with the decision-rule reasoning shown.
- **Catalog staleness / unavailability.** Mitigated by build-time regen from frontmatter (correct post-rename) plus the embedded Tier 1 fallback (works with no catalog).
- **Scope creep back into routing/orchestration.** Guardrail #7 plus the Tier 3 exclusion plus a code-review check.
- **Completeness becomes bloat.** Soft targets invite sprawl. Mitigated by "tighten prose before dropping content" and the eval-time word measurement (recorded, not gated).

## Companion files to author at build time

- `skills/prioritized-action-plan/SKILL.md` (the body above)
- `skills/prioritized-action-plan/TEMPLATE.md` (the 9-section skeleton + Step 0 ledger + effort/prompt blocks)
- `skills/prioritized-action-plan/EXAMPLE.md` (one fully worked case, Complicated domain)
- `skills/prioritized-action-plan/examples/01-prd-draft.md`
- `skills/prioritized-action-plan/examples/02-interview-transcript.md` (Complex domain, probe-based plan)
- `skills/prioritized-action-plan/examples/03-executive-ask.md` (Complex domain, discovery-heavy plan)
- `skills/prioritized-action-plan/references/frameworks.md` (TOC + Cynefin one-page primer; no OODA)
- `skills/prioritized-action-plan/references/recommendable-tiers.md` (the Tier 1/2/3 lists + rules)
- `skills/prioritized-action-plan/references/skill-catalog.md` (regenerated at build time, Tier-filtered)
- `skills/prioritized-action-plan/eval/fixtures/` (the labeled Cynefin fixture set for AC #7)
- `commands/prioritized-action-plan.md` (slash command wrapper for Claude Code)
- `HISTORY.md` (per versioning governance)

## Dependencies

- v2.22.0 naming standardization must ship before the prompts section and catalog are authored (HARD gate, not a schedule note: prompts and catalog target final skill names)
- No code dependencies in pm-skills-mcp; this is a pure skill plus one build-time catalog script
- Pre-tag validator bundle must succeed (per `feedback_pre-tag-validator-bundle.md`)
