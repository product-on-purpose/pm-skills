---
name: foundation-prioritized-action-plan
description: Produce a comprehensive, evidence-grounded prioritized action plan from any PM input (notes, transcripts, drafts, executive asks, Slack threads, or a raw situation). Outputs one saveable document with an executive summary, input mirror, situation classification (Cynefin), the binding constraint (Theory of Constraints), prioritized questions and open decisions, a ranked action plan with the critical effort plus follow-ons, risks and pre-mortem, copy/paste prompts for downstream pm-skills, and an evidence map. Builds a source ledger and cites exact input quotes; refuses High-confidence plans for Complex or Chaotic situations. Use when you want the critical next effort and how to execute it.
license: Apache-2.0
metadata:
  classification: foundation
  version: "1.0.0"
  updated: 2026-05-31
  category: planning
  frameworks: [triple-diamond, theory-of-constraints, cynefin]
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

**One constraint binds at any moment; everything else is noise until it is lifted.** Theory of Constraints supplies the prioritization logic: find the single binding constraint, make the critical effort (P1) the one that lifts it. Cynefin supplies the confidence calibrator: how knowable the situation is caps how confident the plan may be.

Evidence is structural, not decorative. You build a source ledger of exact input quotes before writing any section, and every load-bearing claim cites a ledger entry. If you cannot cite, you cannot claim it as fact.

The skill is honest about what it does not know. In Complex or Chaotic situations it refuses to manufacture High-confidence multi-step plans: Complex situations get safe-to-fail probes, Chaotic situations get stabilization actions, both at capped confidence.

## When to Use

- The user has input (notes, transcript, executive ask, draft PRD, customer interview, Slack thread, raw situation) and wants a ranked next-action plan
- The user is uncertain what to do next and wants a recommendation grounded in their actual context
- The user wants a single referenceable artifact that says what is most important, why, and how to execute it

## When NOT to Use

- **vs `utility-pm-critic`:** if the user asks "is this artifact good, what is wrong with it," use `utility-pm-critic`. Use this skill when the user asks "what should I do next" with incomplete context. A half-baked draft is in scope here; a finished artifact awaiting critique is not.
- **vs `jp-strategy-brief` (jp-library):** if the user wants broad strategic exploration, option framing, or "help me think through this," use `jp-strategy-brief`. Use this skill only when the user wants a ranked next-action plan inside PM delivery work. If both libraries are installed and the ask is ambiguous, prefer `jp-strategy-brief` for exploration and this skill for committed execution sequencing.
- **vs `using-workflows`:** if the user wants a multi-skill workflow walkthrough, use `using-workflows`. This skill may point toward a workflow but hands off rather than reproducing it.
- The user wants to generate a specific named artifact (persona, OKRs, journey map): invoke that skill directly.
- The input is unrelated to PM work: refuse with a one-line redirect.

## Frameworks (the analytical engine)

| Framework | Role in the skill | Where it appears |
|---|---|---|
| **Theory of Constraints** (Goldratt) | Prioritization engine; identifies THE one binding constraint, which becomes the critical effort P1 | Step 3 (constraint) and Step 5 (plan ranking) |
| **Cynefin** (Snowden) | Situation classifier; caps plan confidence and shapes the posture (probes vs commitments vs stabilization) | Step 2 (classification) and confidence markers throughout |

Both frameworks are named in the output so the reasoning is auditable. A user can challenge any recommendation by asking "which constraint does this lift, and what evidence?" The one-page primer is in `references/frameworks.md`.

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
- **File references:** if the user names a file AND the client has file access (for example Claude Code), read it and treat its quoted passages as input. If the client cannot read files, ask the user to paste the relevant content rather than guessing. Never fabricate file contents.
- **Links and URLs are out of scope for now.** Ask the user to paste the relevant text. Do not assume web-fetch capability.

## Refusal and honesty protocols

1. **Off-topic input.** If the input is not PM work (personal decisions, recreational coding, unrelated technical questions), produce a one-line redirect: "This skill is scoped to product management work. For other contexts, use a general assistant."
2. **Insufficient signal.** If the input is under roughly 50 words and lacks specific signal, ask ONE clarifying question before producing the plan. Do not interrogate.
3. **Complex or Chaotic situation.** If the situation classifies Complex or Chaotic, produce the plan but lead the executive summary with the classification and its honest implication, and shape the plan accordingly (probes or stabilization, capped confidence).
4. **Cite or do not claim.** Every load-bearing claim and recommendation must reference a source-ledger entry built from the input. A claim with no source is tagged `Inferred (Low confidence)` and may NOT justify the binding constraint, P1, or any High-confidence marker. Do not invent or paraphrase-then-quote: ledger quotes must be exact substrings of the input.
5. **No source available.** If the input genuinely lacks evidence for a needed claim, write `No source provided` and treat the claim as a gap in the questions section, not as fact.

## Instructions

Build the output by working these steps in order. The fill-in scaffold for every section lives in `references/TEMPLATE.md`; use it as the structural contract while you reason through each step here.

### Step 0: Build the source ledger (before writing any section)

Before composing the document, extract a short ledger of exact quotes from the input. Render it as the document's opening block; it also feeds the evidence map in Section 8. Give each entry an ID (`S1`, `S2`, ...), the exact quote, and its origin (pasted text, or file path plus heading). Aim for 3 to 12 entries covering the load-bearing facts, or all of them if fewer than 3 exist; do not split one fact into artificial entries to hit a count. Every `Source:` field in the document references these IDs. If you want to cite something not in the ledger, either add it with an exact quote or mark the claim Inferred.

### Step 1: Mirror the input (Section 1)

Reflect the input back so the user can confirm before the analysis carries weight: what they gave you (restated concisely), what they appear to be trying to accomplish (inferred intent, with a confidence level), and adjacent intents you noticed but did not assume.

### Step 2: Classify the situation with Cynefin (Section 2)

State the domain and justify it with source-ledger citations, using these decision rules rather than classifying by input genre:

| Domain | Decision rule (how you know) | Plan posture | Confidence ceiling |
|---|---|---|---|
| Clear | Cause and effect obvious and undisputed; a known best practice applies | Apply best practice | High |
| Complicated | Cause and effect knowable with analysis or expertise; good practices exist | Analyze, then commit | Medium-High |
| Complex | Cause and effect only clear in hindsight; input shows conflicting signals, novelty, or unknown unknowns | Run safe-to-fail probes; instrument and sense | Medium-Low |
| Chaotic | No discernible cause and effect; active crisis or breakage in the input | Act to stabilize first, then re-assess | Low |

Distinguish Complicated from Complex by evidence, not topic: a problem is Complex when the input shows the outcome is genuinely unpredictable (new market, untested user behavior, conflicting data), not merely hard. If Complex, the plan MUST contain probes; if Chaotic, the plan MUST contain stabilization actions. Cite the passages that drove the classification.

### Step 3: Name the binding constraint with Theory of Constraints (Section 3)

Identify the ONE thing currently limiting progress. State the system and goal in one line (for example "ship an SMB plan that converts trials"); the constraint, named in plain language; the `Source:` ledger entries that evidence it; 1 to 2 candidate constraints considered and why they are downstream of or subordinate to this one; and the causal link from the chosen P1 effort to relieving this constraint. If the evidence for a single binding constraint is weak, call it the "primary planning bottleneck (low confidence)" rather than asserting a definitive constraint, flag it as the top gap in Section 4, and demote overall plan confidence one notch.

### Step 4: Prioritize questions, gaps, and open decisions (Section 4)

Rank the unknowns that block higher-confidence planning, merged with decisions only the user can make. Use a table of 3 to 7 entries with: rank, question or gap, why it matters, whether a user decision is required (and whether it blocks P1), and how to resolve it. The "Decision required?" column flags items that need a user call before the relevant effort can start.

### Step 5: Write the prioritized action plan (Section 5)

This is the primary deliverable: exactly 3 to 5 efforts, ranked P1 (lifts the constraint) through P5 (sequenced behind). Each effort is a block with all eight fields:

- **Why:** the TOC reasoning; which constraint this lifts and why it is the critical next move
- **What:** the concrete deliverable or outcome
- **How:** 3 to 5 concrete steps
- **Confidence:** High, Medium, or Low with one-line reasoning, respecting the Cynefin ceiling
- **Source:** the ledger IDs grounding this effort, or `Inferred (Low confidence)`
- **Expected outcome / success signal:** what changes if this works
- **Estimated effort:** an honest time estimate
- **Dependencies:** what must be true first, or "none"

P1 gets the fullest treatment; P2 to P5 are shorter but keep all eight fields. P1 may NOT be `Inferred`: if you cannot source the binding constraint and P1, the situation is under-evidenced. Say so and make P1 a discovery effort. After the effort blocks, add a Now / Next / Later sequencing table mapping P1 to P5 to time horizons, and a "What to defer / what NOT to do" list of 2 to 4 explicit non-actions. Pre-committing to deferral is half the value of prioritization.

### Step 6: Pre-mortem the plan (Section 6)

Assume the plan failed; what went wrong? List 3 to 5 risks, each with likelihood, impact, an early observable signal, a mitigation, and a `Source:` (ledger ID or `Inferred`). Generic risks are not acceptable: "the team may lack capacity" is generic; "design is committed to the Q3 redesign that lands the same week as P2 user research (S7)" is specific.

### Step 7: Generate copy/paste prompts for downstream skills (Section 7)

For each effort that maps to a recommendable downstream skill, provide a ready-to-run prompt with the user's context already filled in (skill name, why this skill, the source IDs that justify it, and the full prompt). Routing rules:

- Recommend ONLY from the tiered recommendable set (see "Recommendable skill tiers"). Never recommend a Tier 3 skill or this skill itself.
- **Name safety (no guessing).** You may name a skill ONLY if its exact name appears in `references/skill-catalog.md` OR in the embedded exact-name Tier 1 list in `references/recommendable-tiers.md`. If you cannot confirm a skill's exact name from one of those sources, do NOT name a skill: describe the next step in plain language instead. Never invent or approximate a skill name.
- If a fresh catalog is available, route across Tier 1 and conditional Tier 2. If not, fall back to the embedded exact-name Tier 1 list; where no listed skill maps cleanly, give the plain-language step.
- For methodology families (Foundation Sprint, Design Sprint), recommend the family entry point or hand off to `using-workflows`; do not stitch together individual sub-step skills.
- Skip efforts with no clean skill mapping; the user executes those manually. Cap at the top 3 prompts (P1 to P3).

### Step 8: Assemble the evidence and source map (Section 8)

Consolidate the source ledger and audit coverage in a table of claim or recommendation, source ID, and exact quote. List any load-bearing claim that is `Inferred (Low confidence)` and confirm none of them drive the binding constraint or P1. State evidence gaps honestly. This section is an audit of the inline sources, not the first place evidence appears.

## Output structure

Produce ONE markdown document. Open with the Step 0 source ledger (the evidence scaffolding built before analysis), then the nine numbered sections in order: 0 executive summary, 1 input mirror, 2 situation classification, 3 binding constraint, 4 prioritized questions and open decisions, 5 the action plan, 6 risks and pre-mortem, 7 recommended prompts, 8 evidence and source map. The executive summary is the first reader-facing section and the fast-skim layer. Use `references/TEMPLATE.md` as the fill-in scaffold; `references/EXAMPLE.md` is a fully worked sample.

Completeness is the priority: the executive summary (120 to 180 words, the first reader-facing section, directly below the Step 0 ledger) is the fast-skim layer for busy readers, and the rest is the complete artifact. Do not pad, but do not drop a section to save words. Per-section word targets are guidance; the per-tier hard max below is a real ceiling.

| Input complexity | Target (soft) | Hard max (backstop) |
|---|---|---|
| Simple (one clear thread, brief input) | 900 to 1,300 words | 1,500 |
| Medium (2 to 3 threads, moderate context) | 1,300 to 2,000 words | 2,200 |
| Complex (multiple threads, dense input) | 2,000 to 3,000 words | 3,000 |

If you must shorten, cut in this order: framework explanation, then the lowest-confidence Section 7 prompts, then compress prose. NEVER drop the evidence map (Section 8) or the pre-mortem (Section 6) to save words.

## Recommendable skill tiers

Section 7 may only recommend from this filtered set. The full enumerated lists with exact names live in `references/recommendable-tiers.md`.

- **Tier 1, always recommendable (core work products):** all 30 phase skills (discover, define, develop, deliver, measure, iterate) plus the 4 core foundation artifacts (`foundation-persona`, `foundation-lean-canvas`, `foundation-okr-writer`, `foundation-stakeholder-update`). This is the embedded fallback core.
- **Tier 2, conditional (recommend only when context matches):** `foundation-meeting-*` (only for meeting next-steps); the Foundation Sprint and Design Sprint families (recommend the family entry point, or hand to `using-workflows`); `utility-pm-critic` (when the next step is reviewing an artifact); `utility-mermaid-diagrams` and `utility-slideshow-creator` (when the next step is visualizing or presenting).
- **Tier 3, never recommend:** `utility-pm-skill-builder`, `utility-pm-skill-auditor`, `utility-pm-skill-validate`, `utility-pm-skill-iterate`, `utility-pm-release-conductor`, `utility-pm-changelog-curator`, `utility-update-pm-skills` (library machinery), and `foundation-prioritized-action-plan` itself.

The build-time catalog generator emits Tier 1 and Tier 2 (with a conditional flag) and omits Tier 3. Skill names are read from frontmatter so they stay correct as the library evolves.

## Behavioral guardrails

1. **One constraint, one P1.** If everything is critical, nothing is. Name the single binding constraint.
2. **Cite or do not claim.** Build the source ledger first; every load-bearing claim references a ledger ID or is tagged `Inferred (Low confidence)`. Inferred claims may not drive the constraint or P1.
3. **Cynefin caps confidence.** Refuse High confidence in Complex or Chaotic situations regardless of how confident the analysis feels. Complex plans contain probes; Chaotic plans contain stabilization.
4. **Mirror first, plan second.** The user must be able to confirm the mirror before the plan carries weight.
5. **Prompts are filled, not templated.** A prompt with unfilled placeholders is unfinished work.
6. **Defer is half the value.** Pre-commit to non-action; do not leave an open-ended list.
7. **One skill, one document.** Recommend downstream skills; never invoke them inline. The plan is the artifact.

## Output destination

Chat output by default. Optional disk write to `_pm-skills/foundation-prioritized-action-plan/<slug>-<YYYY-MM-DD>.md` when the user passes `--out` or says "save this."

## Quality Checklist

Before finalizing, verify:

- [ ] The source ledger was built first and every `Source:` quote is an exact substring of the input
- [ ] All nine sections (0 to 8) are present and in order
- [ ] The situation is classified with the Cynefin decision rules, citing the passages that drove it
- [ ] Exactly one binding constraint is named, with candidate constraints considered and the P1 causal link
- [ ] Section 5 has 3 to 5 efforts; every effort block carries all eight fields
- [ ] The binding constraint and P1 each cite at least one non-Inferred source
- [ ] No overall or P1 confidence is High when the situation is Complex or Chaotic
- [ ] Complex plans contain probes; Chaotic plans contain stabilization actions
- [ ] Section 7 names only Tier 1 or Tier 2 skills, never Tier 3 or this skill, and never an unconfirmed name
- [ ] Risks are specific (named signal and mitigation), not generic
- [ ] Output is within the hard-max word ceiling for its complexity tier

## Common pitfalls

- **Plan-shaped slop.** Five generic efforts with no constraint link is a list, not a plan. Tie P1 to the named constraint.
- **False-confidence inflation.** Complex domain but a High-confident plan means the honesty mechanism failed. Re-classify or downgrade.
- **Fabricated quotes.** A `Source:` quote that is not an exact substring of the input is a fabrication. Quote exactly or mark Inferred.
- **Hand-wavy prompts.** "Run a problem-statement skill on the input" is a pointer, not a prompt. Fill it with the user's actual context.
- **Recommending Tier 3.** Never point a user at library-maintenance tooling as a PM next step.

## Examples

See `references/EXAMPLE.md` for one fully worked plan (Complicated domain), and `references/` example files for Complex cases.
