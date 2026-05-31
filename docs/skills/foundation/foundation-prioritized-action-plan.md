---
title: "Prioritized Action Plan"
description: "Produce a comprehensive, evidence-grounded prioritized action plan from any PM input (notes, transcripts, drafts, executive asks, Slack threads, or a raw situation). Outputs one saveable document with an executive summary, input mirror, situation classification (Cynefin), the binding constraint (Theory of Constraints), prioritized questions and open decisions, a ranked action plan with the critical effort plus follow-ons, risks and pre-mortem, copy/paste prompts for downstream pm-skills, and an evidence map. Builds a source ledger and cites exact input quotes; refuses High-confidence plans for Complex or Chaotic situations. Use when you want the critical next effort and how to execute it."
generated: true
source: scripts/generate-skill-pages.py
tags:
  - Foundation
  - planning
---

:::note[Quick facts]
**Classification:** Foundation | **Version:** 1.0.0 | **Category:** planning | **License:** Apache-2.0
:::

**Try it:** `/pm-skills:foundation-prioritized-action-plan "Your context here"`

You produce a comprehensive, evidence-grounded action plan from PM input the user provides. Your job is to identify the critical next effort, sequence the follow-on efforts behind it, and equip the user with copy/paste prompts to execute. The plan is the deliverable; the prompts are an enabler.

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

## How to Use

Invoke the skill by name (`/pm-skills:foundation-prioritized-action-plan` on Claude Code, `$foundation-prioritized-action-plan` on Codex):

```
/pm-skills:foundation-prioritized-action-plan "Your context here"
```

Or reference the skill file directly: `skills/foundation-prioritized-action-plan/SKILL.md`

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

## Output Template

# Prioritized Action Plan - Output Template

Fill this scaffold to produce one prioritized action plan. Build the Step 0 source ledger first, then work Sections 0 through 8 in order.

> **Template note:** Blockquote notes (`>`) and `[bracketed guidance]` are authoring scaffolding. Replace every bracketed span with real content and remove the `>` notes from the finished plan. A delivered plan contains no brackets and no template notes.

---

## Step 0: Source ledger (internal scaffolding, feeds Section 8)

> Extract 3 to 12 exact quotes from the input (or all load-bearing facts if fewer than 3 exist). Each `Source:` field elsewhere references these IDs. Quotes must be exact substrings of the input.

```
S1: "[exact quote from input]" (origin: [pasted text | file path + heading])
S2: "[exact quote from input]" (origin: [...])
S3: "[exact quote from input]" (origin: [...])
```

---

## Section 0. Executive summary

> 120 to 180 words. The fast-skim layer. Keep this order.

- **Situation classification:** [Clear | Complicated | Complex | Chaotic] (Cynefin) - [one-line reasoning]
- **The binding constraint:** [what is currently limiting progress] (TOC)
- **The critical next effort (P1):** [one sentence]
- **Overall plan confidence:** [High | Medium | Low] - [one-line reasoning; must respect the Cynefin ceiling]
- **Time-to-value:** [how long to see signal from P1]

## Section 1. Input mirror - what I understand

- **What you gave me:** [the substantive content, restated concisely]
- **What you appear to be trying to accomplish:** [inferred intent] - confidence: [High | Medium | Low]
- **Adjacent intents I noticed but did not assume:** [things mentioned in passing]

## Section 2. Situation classification (Cynefin)

**Domain:** [Clear | Complicated | Complex | Chaotic]
**Source:** [ledger IDs that drove the classification]

[2 to 4 sentences justifying the domain with the decision rules: state the cause-and-effect knowability, why this domain and not the adjacent one, and the resulting posture. If Complex, commit to probes; if Chaotic, commit to stabilization.]

## Section 3. The binding constraint (Theory of Constraints)

- **System and goal:** [what process or outcome we are advancing, one line]
- **The constraint:** [named in plain language]
- **Source:** [ledger IDs]
- **Candidate constraints considered:** [1 to 2 others, and why they are downstream of or subordinate to this one]
- **Why P1 lifts it:** [the causal link from P1 to relieving this constraint]

> If evidence for one constraint is weak, label it "primary planning bottleneck (low confidence)", flag it as the top gap in Section 4, and demote overall confidence one notch.

## Section 4. Prioritized questions, gaps, and open decisions

> 3 to 7 entries, ranked. The "Decision required?" column flags items needing a user call before the relevant effort can start.

| Rank | Question / gap | Why it matters | Decision required? | How to resolve |
|---|---|---|---|---|
| Q1 | [most important unknown] | [impact on the plan] | [Yes, blocks P1 \| No] | [research, conversation, or artifact that resolves it] |
| Q2 | [...] | [...] | [...] | [...] |

## Section 5. The prioritized action plan

> Exactly 3 to 5 efforts, ranked P1 (lifts the constraint) through P5. P1 gets the fullest treatment; P2 to P5 keep all eight fields but are shorter. P1 may not be Inferred.

#### P1. [Effort name]

- **Why:** [TOC reasoning: which constraint this lifts; why it is the critical next move]
- **What:** [concrete deliverable or outcome]
- **How:** [3 to 5 concrete steps]
- **Confidence:** [High | Medium | Low] - [one-line reasoning; respects the Cynefin ceiling]
- **Source:** [ledger IDs, or `Inferred (Low confidence)` - not allowed for P1]
- **Expected outcome / success signal:** [what changes if this works]
- **Estimated effort:** [honest time estimate]
- **Dependencies:** [what must be true first, or "none"]

#### P2. [Effort name]

- **Why:** [...]
- **What:** [...]
- **How:** [...]
- **Confidence:** [...]
- **Source:** [...]
- **Expected outcome / success signal:** [...]
- **Estimated effort:** [...]
- **Dependencies:** [...]

> Repeat the block for P3 to P5 as needed.

**Sequencing (Now / Next / Later)**

| Now | Next | Later |
|---|---|---|
| [P1] | [P2, P3] | [P4, P5] |

**What to defer / what NOT to do**

- [Explicit non-action 1]
- [Explicit non-action 2]

## Section 6. Risks and pre-mortem

> Assume the plan failed. 3 to 5 specific risks (named signal and mitigation), not generic ones.

| Risk | Likelihood | Impact | Early signal | Mitigation | Source |
|---|---|---|---|---|---|
| [specific failure mode] | [H/M/L] | [H/M/L] | [observable indicator] | [pre-emptive action] | [ledger ID or `Inferred`] |

## Section 7. Recommended pm-skill prompts (copy/paste ready)

> Cap at the top 3 efforts (P1 to P3). Recommend only Tier 1 or conditional Tier 2 skills (see `recommendable-tiers.md`); never Tier 3 or this skill. Name a skill only if its exact name is in `skill-catalog.md` or the embedded Tier 1 list; otherwise describe the step in plain language.

#### To execute P1: [effort name]

**Skill:** `[exact-skill-name]`
**Why this skill:** [one line]
**Source:** [ledger IDs that justify recommending this next step]

**Prompt:**
> [Full prompt with the user's actual context injected. No placeholders.]

#### To execute P2: [effort name]

**Skill:** `[exact-skill-name]`
**Why this skill:** [one line]
**Source:** [ledger IDs]

**Prompt:**
> [Full prompt with the user's actual context injected.]

## Section 8. Evidence and source map

> Audit of the inline sources. Confirm the binding constraint and P1 cite non-Inferred sources.

| Claim / recommendation | Source ID | Exact quote |
|---|---|---|
| [what was claimed] | [S3] | "[exact words from input]" |

**Inferred (Low confidence) claims:** [list any, and confirm none drive the binding constraint or P1]
**Evidence gaps:** [state honestly what the input did not support]

## Example Output

<details>
<summary>Example: Prioritized Action Plan (Complicated domain)</summary>

# Example: Prioritized Action Plan (Complicated domain)

A fully worked plan from a realistic half-baked PRD draft. The verbatim input is shown first, then the Step 0 ledger, then the nine-section plan. Every `Source:` quote is an exact substring of the input. One claim is deliberately marked `Inferred (Low confidence)` to model the honesty mechanism.

---

## The input (pasted verbatim)

> Feature: Bulk CSV export for the Analytics dashboard.
>
> Problem: Enterprise customers keep asking for a way to get their data out. Three of our top-10 accounts mentioned it on QBRs last quarter. Support gets maybe 4-5 tickets a week asking how to export more than the current 1,000-row limit. Sales says it's a blocker in two active deals.
>
> Goal: Let users export the full dataset behind any dashboard view as a CSV.
>
> Proposed solution: Add an 'Export all' button that generates a CSV in the background and emails a download link when ready.
>
> Open questions: Do we need to support scheduled exports too? The data team is worried about query load on the warehouse during business hours. Legal hasn't weighed in on whether we can email download links with customer data. We don't know if customers want CSV specifically or if they'd be happier with a direct warehouse/Snowflake share. PM bandwidth is tight this quarter; eng has ~3 weeks if we want it in the Q3 release. Target enterprise tier only for now. Pricing impact TBD.

---

## Step 0: Source ledger

```
S1: "Three of our top-10 accounts mentioned it on QBRs last quarter" (origin: pasted text, Problem)
S2: "Support gets maybe 4-5 tickets a week asking how to export more than the current 1,000-row limit" (origin: pasted text, Problem)
S3: "Sales says it's a blocker in two active deals" (origin: pasted text, Problem)
S4: "The data team is worried about query load on the warehouse during business hours" (origin: pasted text, Open questions)
S5: "Legal hasn't weighed in on whether we can email download links with customer data" (origin: pasted text, Open questions)
S6: "We don't know if customers want CSV specifically or if they'd be happier with a direct warehouse/Snowflake share" (origin: pasted text, Open questions)
S7: "eng has ~3 weeks if we want it in the Q3 release" (origin: pasted text, Open questions)
S8: "Add an 'Export all' button that generates a CSV in the background and emails a download link when ready" (origin: pasted text, Proposed solution)
```

---

## Section 0. Executive summary

- **Situation classification:** Complicated (Cynefin). Demand is well-evidenced and the open questions are answerable with analysis and expertise, not emergent experimentation.
- **The binding constraint:** the delivery decision is unmade. Whether the answer is a CSV email or a warehouse share is unresolved (S6) and blocked on a legal ruling (S5); committing eng's three weeks before deciding risks building the wrong or a non-compliant thing.
- **The critical next effort (P1):** resolve format-and-delivery with a fast customer check plus a legal review, before any build starts.
- **Overall plan confidence:** Medium-High. The constraint and P1 are well-sourced; the residual risk is that the customer check changes the format.
- **Time-to-value:** roughly one week to a decided, build-ready spec.

## Section 1. Input mirror - what I understand

- **What you gave me:** a draft PRD for bulk data export from the Analytics dashboard, currently capped at 1,000 rows. You have a proposed solution (a background CSV with an emailed link), enterprise-only scope, a roughly three-week eng window for Q3, and a cluster of unresolved questions about format, query load, legal, and scheduling.
- **What you appear to be trying to accomplish:** ship a defensible export capability in Q3 that unblocks active deals without overcommitting scarce eng and PM time. Confidence: Medium (intent is clear; the success bar is not stated).
- **Adjacent intents I noticed but did not assume:** scheduled exports, a Snowflake/warehouse share as a product surface, and a pricing change. I did not assume any of these are in scope for Q3.

## Section 2. Situation classification (Cynefin)

**Domain:** Complicated. **Source:** S1, S2, S3, S5, S6.

Cause and effect here are knowable with analysis and expertise, which is the test for Complicated rather than Complex. The demand is not speculative: three top-10 accounts (S1), a steady support volume (S2), and two active deals (S3) converge on the same need. The open questions (format preference, legal, query load) are not unknown-unknowns: each can be resolved by asking a customer, asking legal, or sizing a query. This is not Complex, because the outcome is not genuinely unpredictable; it is a set of answerable design and compliance decisions. Posture: analyze the two real unknowns, then commit. Confidence ceiling: Medium-High.

## Section 3. The binding constraint (Theory of Constraints)

- **System and goal:** ship an enterprise export capability in the Q3 window that closes the data-out gap.
- **The constraint:** an unmade delivery decision. The team does not yet know whether customers want CSV at all or would prefer a direct warehouse share (S6), and legal has not ruled on whether an emailed link to customer data is even allowed (S5). Everything downstream (which surface to build, how to handle query load, whether scheduling matters) depends on this decision.
- **Source:** S5, S6.
- **Candidate constraints considered:** (1) Eng capacity, the three-week window (S7). Real, but downstream: you cannot usefully spend three weeks until you know what to build, so capacity is subordinate to the decision. (2) Query load on the warehouse (S4). This is a design constraint on whichever solution is chosen, not the thing blocking the choice, so it is subordinate as well.
- **Why P1 lifts it:** deciding format-and-delivery converts a guess (S8, the proposed CSV-email) into a validated, compliant build target, which is what unblocks a correctly-scoped three-week build.

## Section 4. Prioritized questions, gaps, and open decisions

| Rank | Question / gap | Why it matters | Decision required? | How to resolve |
|---|---|---|---|---|
| Q1 | Do enterprise customers want CSV, or a warehouse/Snowflake share? (S6) | Determines what gets built; wrong answer wastes the Q3 window | Yes, blocks P1 | Ask the three QBR accounts and the two deal contacts directly |
| Q2 | Can we legally email a download link to customer data? (S5) | A no invalidates the proposed solution (S8) outright | Yes, blocks P1 | 30-minute legal review with a concrete data-handling description |
| Q3 | What is the success bar for "done" in Q3? | Without it, scope creeps toward scheduling and pricing | Yes | PM sets a one-line success metric (for example, unblock the two deals) |
| Q4 | Is scheduled export in scope for Q3? | Expands eng cost well past three weeks | No, defer unless a customer makes it a blocker | Park it as a fast-follow; revisit after P1 |
| Q5 | Does the chosen solution survive business-hours query load? (S4) | Could force off-peak or async design | No, but informs P2 | Have the data team size the worst-case export query |

## Section 5. The prioritized action plan

#### P1. Decide format and delivery before building

- **Why:** lifts the binding constraint. The proposed CSV-email (S8) is unvalidated against customer preference (S6) and unconfirmed against legal (S5). Deciding this is the one move that makes the rest of the plan safe to execute.
- **What:** a one-page decision that names the format (CSV vs warehouse share), the delivery mechanism (emailed link vs in-app download vs warehouse grant), and the legal verdict on customer-data handling.
- **How:** (1) Send a three-question note to the three QBR accounts (S1) and the two deal contacts (S3) asking format preference and how they expect to receive the data. (2) Book a 30-minute legal review describing the emailed-link flow (S5). (3) Write the decision as a one-pager and circulate to eng and the data team.
- **Confidence:** Medium-High. Respects the Complicated ceiling; the only thing that could move it is a split customer answer.
- **Source:** S5, S6, S3, S1.
- **Expected outcome / success signal:** a signed-off format-and-delivery decision; eng can scope a real build instead of the proposal.
- **Estimated effort:** about one week, mostly waiting on replies; under a day of active work.
- **Dependencies:** none. This is the entry point.

#### P2. Size and de-risk the warehouse query load

- **Why:** the data team's concern about business-hours query load (S4) is the top design risk on whichever surface P1 selects; sizing it early prevents a late redesign.
- **What:** a worst-case export query profile and a recommendation (off-peak scheduling, read replica, or async generation).
- **How:** (1) Take the largest realistic dashboard view. (2) Have the data team run and measure the full-dataset query. (3) Recommend a load-handling approach feeding the build.
- **Confidence:** Medium. Depends on which surface P1 picks.
- **Source:** S4.
- **Expected outcome / success signal:** a load number and a chosen mitigation, so the build does not threaten the warehouse.
- **Estimated effort:** 2 to 3 days.
- **Dependencies:** P1 (the chosen surface changes the query shape).

#### P3. Scope and build the decided export to the Q3 window

- **Why:** with format, legal, and load resolved, the three-week window (S7) can be spent on a correctly-scoped build rather than a guess.
- **What:** the shipped enterprise export, scoped to exactly the P1 decision, no scheduling.
- **How:** (1) Translate the P1 one-pager into an eng-ready spec. (2) Build the single decided surface. (3) Ship to enterprise tier behind the existing gate.
- **Confidence:** Medium. The window is tight (S7), so scope discipline is the risk.
- **Source:** S7, S8.
- **Expected outcome / success signal:** enterprise users export full datasets; the two active deals (S3) lose their blocker.
- **Estimated effort:** about three weeks, matching the stated window.
- **Dependencies:** P1 and P2.

**Sequencing (Now / Next / Later)**

| Now | Next | Later |
|---|---|---|
| P1 | P2 | P3, then scheduled export |

**What to defer / what NOT to do**

- Do not build the CSV-email (S8) yet; it is a hypothesis until P1 confirms it.
- Do not scope scheduled exports into Q3; it is a fast-follow unless a customer makes it a blocker.
- Do not resolve pricing now; it does not block shipping the capability to enterprise tier.

## Section 6. Risks and pre-mortem

| Risk | Likelihood | Impact | Early signal | Mitigation | Source |
|---|---|---|---|---|---|
| Customers split between CSV and warehouse share | M | H | P1 replies disagree | Ship CSV first (lower lift), park warehouse share as fast-follow | S6 |
| Legal prohibits emailed data links | M | H | Legal flags the flow in the P1 review | Switch to in-app authenticated download; do not email data | S5 |
| Three-week window slips on a redesign | M | M | P2 load number forces async work | Choose async generation up front so load does not reshape scope late | S4, S7 |
| Pricing backlash when export becomes a paid differentiator | L | M | Account managers report pushback | Decouple: ship to current enterprise tier, defer pricing | Inferred (Low confidence) |

> Note: the pricing-backlash risk is `Inferred (Low confidence)`. The input says only "Pricing impact TBD"; it does not evidence any customer reaction. It is listed as a watch-item, and it does not drive the binding constraint or P1.

## Section 7. Recommended pm-skill prompts (copy/paste ready)

#### To execute P1: decide format and delivery

**Skill:** `define-problem-statement`
**Why this skill:** P1 needs a crisp, evidence-grounded framing of the real decision (format and delivery, not "add an export button") before customer outreach.
**Source:** S5, S6, S8

**Prompt:**
> Frame the problem behind a Q3 enterprise data-export feature. Context: customers are capped at a 1,000-row export; three top-10 accounts raised it at QBRs, support sees 4 to 5 tickets a week, and two active deals are blocked. The proposed solution is a background CSV emailed as a download link, but we do not know if customers want CSV or a warehouse/Snowflake share, and legal has not ruled on emailing customer data. Produce a problem statement that centers the unmade format-and-delivery decision and its two blockers (customer preference, legal), with user impact and a measurable success bar.

#### To execute P3: scope the build

**Skill:** `deliver-prd`
**Why this skill:** once P1 decides format and delivery, P3 needs an eng-ready PRD scoped to exactly that decision and the three-week window.
**Source:** S7, S8

**Prompt:**
> Write a PRD for an enterprise bulk-export feature, scoped to a three-week Q3 build for the enterprise tier only. Assume the format-and-delivery decision from discovery is settled. Exclude scheduled exports. Cover the export surface, the warehouse query-load handling, the legal-approved delivery mechanism, success metrics tied to unblocking two active deals, and explicit non-goals.

## Section 8. Evidence and source map

| Claim / recommendation | Source ID | Exact quote |
|---|---|---|
| Demand is real and multi-channel | S1 | "Three of our top-10 accounts mentioned it on QBRs last quarter" |
| Ongoing support pain at the row cap | S2 | "Support gets maybe 4-5 tickets a week asking how to export more than the current 1,000-row limit" |
| Revenue pressure | S3 | "Sales says it's a blocker in two active deals" |
| Load is a design risk | S4 | "The data team is worried about query load on the warehouse during business hours" |
| Legal is unresolved (blocks P1) | S5 | "Legal hasn't weighed in on whether we can email download links with customer data" |
| Format is undecided (blocks P1) | S6 | "We don't know if customers want CSV specifically or if they'd be happier with a direct warehouse/Snowflake share" |
| Build window | S7 | "eng has ~3 weeks if we want it in the Q3 release" |
| The proposal is a hypothesis | S8 | "Add an 'Export all' button that generates a CSV in the background and emails a download link when ready" |

**Inferred (Low confidence) claims:** the pricing-backlash risk only. Confirmed: it does not drive the binding constraint or P1.
**Evidence gaps:** no stated success metric (Q3), and no data on whether customers would pay for export. Both are flagged in Section 4, not treated as fact.

</details>

## Real-World Examples

See this skill applied to three different product contexts:

<details>
<summary>Storevine (B2B): Storevine B2B ecommerce platform. Campaigns GA'd May 2026; the first-campaign rate is healthy but the second-campaign rate is stalling, and the growth PM needs a ranked next-action plan before spending the quarter's eng capacity.</summary>

**Prompt:**

```
foundation-prioritized-action-plan

Context: Storevine Campaigns (native email/SMS re-engagement), GA'd May 2026. 15K merchants, ~70-person team.

Situation: First-campaign rate is healthy (31.7% [fictional] after the guided-flow A/B), but the second-campaign rate is stalling at 22.8% [fictional] and flattening. Merchants send one campaign, see modest results, and don't return. Support sees ~6 tickets/week asking "why did my campaign underperform" with no clear next step in-product. Sales flags two mid-market deals where the buyer asked about "campaign automation / sequences" which we don't have. Eng has ~4 weeks of Campaigns capacity this quarter.

The company OKR is to cut 12-month merchant churn 18% to 14% [fictional]; Campaigns engagement is a leading indicator.

Question: what should we do next to turn Campaigns into a sustained channel?
```

---

**Output:**

### Step 0: Source ledger

```
S1: "the second-campaign rate is stalling at 22.8% [fictional] and flattening" (origin: pasted prompt, Situation)
S2: "Merchants send one campaign, see modest results, and don't return" (origin: pasted prompt, Situation)
S3: "Support sees ~6 tickets/week asking "why did my campaign underperform" with no clear next step in-product" (origin: pasted prompt, Situation)
S4: "Sales flags two mid-market deals where the buyer asked about "campaign automation / sequences" which we don't have" (origin: pasted prompt, Situation)
S5: "Eng has ~4 weeks of Campaigns capacity this quarter" (origin: pasted prompt, Situation)
S6: "cut 12-month merchant churn 18% to 14% [fictional]" (origin: pasted prompt, OKR)
S7: "First-campaign rate is healthy (31.7% [fictional] after the guided-flow A/B)" (origin: pasted prompt, Situation)
```

### Section 0. Executive summary

- **Situation classification:** Complicated (Cynefin). The stall is diagnosable from data and support signal, not emergent.
- **The binding constraint:** the missing post-first-campaign path. After the first send, the product offers no clear next step (S3) and no automation (S4), so repeat usage decays (S2).
- **The critical next effort (P1):** diagnose where and why second campaigns stall before building anything, so the 4-week window funds the right fix.
- **Overall plan confidence:** Medium-High. Well-sourced; residual risk is that diagnosis splits between a guidance gap and a results-quality problem.
- **Time-to-value:** about one week to a diagnosis that points the build.

### Section 1. Input mirror - what I understand

- **What you gave me:** Campaigns activates merchants well on the first send (S7) but does not retain them into a second (S1, S2); support sees confusion with no in-product next step (S3); sales hears demand for automation/sequences (S4); you have a 4-week eng window (S5) and a churn OKR that Campaigns engagement feeds (S6).
- **What you appear to be trying to accomplish:** turn Campaigns from a one-time action into a sustained channel that moves the churn metric. Confidence: High (intent is explicit).
- **Adjacent intents I noticed but did not assume:** building automation/sequences (S4), and improving campaign results quality. Neither is assumed to be the answer yet.

### Section 2. Situation classification (Cynefin)

**Domain:** Complicated. **Source:** S1, S2, S3.

Cause and effect are knowable with analysis. You already have the shape of the problem (a sharp first-to-second-send drop, S1) and converging signal about why (no in-product next step, S3). This is not Complex: the outcome is not unpredictable, it is a diagnosable funnel with a likely mechanism. Posture: analyze the drop-off, then commit. Confidence ceiling: Medium-High.

### Section 3. The binding constraint (Theory of Constraints)

- **System and goal:** make Campaigns a repeated behavior so it moves merchant retention.
- **The constraint:** the post-first-campaign path. Nothing in the product tells a merchant what to do after their first send (S3), and there is no automation to carry them forward (S4), so they send once and stop (S2).
- **Source:** S2, S3, S4.
- **Candidate constraints considered:** (1) Results quality ("modest results", S2). Real, but subordinate: even strong results decay without a next step. (2) The automation feature gap (S4). That is a candidate solution, not the constraint, until the diagnosis confirms automation is what lifts repeat sends.
- **Why P1 lifts it:** diagnosing exactly where the second send is lost converts a guess into a targeted fix for the binding path.

### Section 4. Prioritized questions, gaps, and open decisions

| Rank | Question / gap | Why it matters | Decision required? | How to resolve |
|---|---|---|---|---|
| Q1 | Where exactly do merchants drop between send 1 and send 2? (S1) | Determines whether the fix is guidance, results, or automation | Yes, blocks P1 | Funnel analysis of first-send merchants |
| Q2 | Do the "underperform" tickets share a root cause? (S3) | Tells us if a results problem masquerades as a guidance gap | No, resolve by P1 | Tag and cluster the ~6/week tickets |
| Q3 | Is automation/sequences what merchants want, or a sales artifact? (S4) | Avoids building a heavy feature on two deals | No | Check demand against the broader merchant base in P1 |
| Q4 | What second-send rate moves the churn OKR? (S6) | Sets the success bar for the quarter | Yes | PM and growth agree a target |

### Section 5. The prioritized action plan

#### P1. Diagnose the second-send drop-off

- **Why:** lifts the binding constraint by locating exactly where merchants stop (S1, S2). The 4-week window (S5) must not be spent guessing.
- **What:** a one-page diagnosis of the first-to-second-send funnel with the dominant drop point and reason.
- **How:** (1) Build the funnel from first send to second send. (2) Tag and cluster the support tickets (S3). (3) Cross-check automation demand (S4) against the full base.
- **Confidence:** Medium-High. Respects the Complicated ceiling.
- **Source:** S1, S2, S3.
- **Expected outcome / success signal:** a named drop point and reason that picks the P2 fix.
- **Estimated effort:** about 1 week.
- **Dependencies:** none.

#### P2. Close the post-send "what now" gap

- **Why:** the most likely diagnosis is the missing in-product next step (S3); a lightweight guidance fix is far cheaper than automation and tests the constraint directly.
- **What:** an in-product post-send state that shows results plainly and offers the obvious next action.
- **How:** (1) Add a post-send results-and-next-step view. (2) Prompt a relevant second campaign. (3) Measure the second-send rate against baseline (S1).
- **Confidence:** Medium. Depends on P1.
- **Source:** S3, S2.
- **Expected outcome / success signal:** second-send rate climbs off 22.8% [fictional].
- **Estimated effort:** about 2 weeks of the window (S5).
- **Dependencies:** P1.

#### P3. Scope automation/sequences only if P1 supports it

- **Why:** automation (S4) is the heaviest option and is currently evidenced by two deals; build it only if P1 shows repeat sending is genuinely demand-limited, not guidance-limited.
- **What:** a scoped decision on whether a basic sequence ships this quarter or is deferred.
- **How:** (1) Weigh P1 demand evidence. (2) If justified, scope the smallest useful sequence. (3) Otherwise defer and revisit next quarter.
- **Confidence:** Low-Medium. Contingent on P1.
- **Source:** S4, S5.
- **Expected outcome / success signal:** a defensible build-or-defer call that fits the 4-week window.
- **Estimated effort:** the remaining window if built; near-zero if deferred.
- **Dependencies:** P1, P2.

**Sequencing (Now / Next / Later)**

| Now | Next | Later |
|---|---|---|
| P1 | P2 | P3 (conditional) |

**What to defer / what NOT to do**

- Do not build automation/sequences (S4) before P1; two deals are not a mandate.
- Do not spend the 4-week window (S5) until the drop point is named.
- Do not treat "modest results" as the cause without ticket evidence.

### Section 6. Risks and pre-mortem

| Risk | Likelihood | Impact | Early signal | Mitigation | Source |
|---|---|---|---|---|---|
| The real issue is results quality, not guidance | M | H | P1 tickets cluster on deliverability/targeting | Pivot P2 toward results, not a next-step nudge | S2, S3 |
| Automation gets prioritized on sales pressure | M | H | Roadmap fills with sequences before P1 reads | Gate P3 on P1 demand evidence | S4 |
| 4-week window slips on a guidance-then-automation pivot | L | M | P2 scope creeps toward sequences | Hold P2 to the lightweight next-step fix | S5 |

### Section 7. Recommended pm-skill prompts (copy/paste ready)

#### To execute P1: diagnose the drop-off

**Skill:** `measure-experiment-results`
**Why this skill:** P1 is a funnel diagnosis that benefits from a disciplined readout of where and why the second send is lost.
**Source:** S1, S2

**Prompt:**
> Analyze the Storevine Campaigns first-to-second-send funnel. First-send rate is 31.7% [fictional]; second-send rate is stalling at 22.8% [fictional] and flattening. Merchants send once, see modest results, and do not return; support sees ~6 tickets/week asking why a campaign underperformed with no clear in-product next step. Identify the dominant drop point between send 1 and send 2 and the most likely cause, separating a guidance gap from a results-quality problem, and flag where evidence is thin.

#### To execute P2: spec the post-send fix

**Skill:** `deliver-prd`
**Why this skill:** once P1 names the drop point, P2 needs an eng-ready spec scoped to the 4-week window.
**Source:** S3, S5

**Prompt:**
> Write a PRD for an in-product post-campaign state in Storevine Campaigns that shows results plainly and offers the obvious next action to drive a second send. Scope to roughly two weeks of eng capacity, exclude automation/sequences, and tie success to lifting the second-send rate off 22.8% [fictional]. Assume the drop-point diagnosis from discovery is settled.

### Section 8. Evidence and source map

| Claim / recommendation | Source ID | Exact quote |
|---|---|---|
| Second send is stalling | S1 | "the second-campaign rate is stalling at 22.8% [fictional] and flattening" |
| Merchants send once and stop | S2 | "Merchants send one campaign, see modest results, and don't return" |
| No in-product next step | S3 | "Support sees ~6 tickets/week asking "why did my campaign underperform" with no clear next step in-product" |
| Automation demand (thin) | S4 | "Sales flags two mid-market deals where the buyer asked about "campaign automation / sequences" which we don't have" |
| Build window | S5 | "Eng has ~4 weeks of Campaigns capacity this quarter" |
| Strategic tie to churn | S6 | "cut 12-month merchant churn 18% to 14% [fictional]" |

**Inferred (Low confidence) claims:** none load-bearing; every effort cites a quote.
**Evidence gaps:** no agreed second-send target (Q4) and no validated read on whether automation demand generalizes beyond two deals; both are flagged, not assumed.

</details>

<details>
<summary>Brainshelf (Consumer): Brainshelf consumer PKM app. The Resurface morning digest launched six weeks ago with bimodal click-through; the solo PM dumps rough context and needs a ranked plan before the next board update.</summary>

**Prompt:**

```
foundation-prioritized-action-plan

quick brain dump, need a plan for resurface (morning digest)

- launched 6 wks ago. open rate on the digest is ok (~38% [fictional]) but click-through is all over the place
- small cohort (~12%) clicks every day, rest basically never click
- marco thinks the digest timing is wrong, chloe thinks it's relevance (we resurface stuff people don't care about anymore)
- surveys are contradictory - power users say "love it", others say "felt random" or "too much"
- we have ~2 sprints before the next board update, want to show movement
- 20 person team, i'm wearing the PM + launch hat

what do we do
```

---

**Output:**

### Step 0: Source ledger

```
S1: "open rate on the digest is ok (~38% [fictional]) but click-through is all over the place" (origin: pasted prompt)
S2: "small cohort (~12%) clicks every day, rest basically never click" (origin: pasted prompt)
S3: "marco thinks the digest timing is wrong, chloe thinks it's relevance (we resurface stuff people don't care about anymore)" (origin: pasted prompt)
S4: "surveys are contradictory - power users say "love it", others say "felt random" or "too much"" (origin: pasted prompt)
S5: "we have ~2 sprints before the next board update, want to show movement" (origin: pasted prompt)
S6: "20 person team, i'm wearing the PM + launch hat" (origin: pasted prompt)
```

### Section 0. Executive summary

- **Situation classification:** Complex (Cynefin). Engagement is bimodal (S2), internal theories conflict (S3), and surveys contradict each other (S4), so the cause is not yet knowable.
- **The binding constraint:** you do not know what distinguishes the 12% who click daily from everyone else. Tuning timing or relevance now is a guess.
- **The critical next effort (P1):** run a safe-to-fail probe to find the distinguishing factor before changing the digest.
- **Overall plan confidence:** Low-Medium. Honest: the team is arguing from anecdote, not evidence.
- **Time-to-value:** about one sprint to a first read on what the engaged cohort shares.

### Section 1. Input mirror - what I understand

- **What you gave me:** Resurface opens fine but click-through is bimodal (S1, S2); marco and chloe disagree on whether it is timing or relevance (S3); surveys are contradictory (S4); you have two sprints before a board update (S5) and are running solo (S6).
- **What you appear to be trying to accomplish:** find a real lever for Resurface engagement and show movement to the board. Confidence: Low-Medium (intent inferred from the dump).
- **Adjacent intents I noticed but did not assume:** changing digest timing, and a relevance/algorithm rework. Neither is assumed to be the fix.

### Section 2. Situation classification (Cynefin)

**Domain:** Complex. **Source:** S2, S3, S4.

The test for Complex is whether the outcome is genuinely unpredictable, and it is here. The behavior is bimodal with no known cause (S2), two reasonable people hold opposite theories (S3), and the survey signal contradicts itself (S4). You cannot analyze your way to the answer from this; you have to probe and sense. Posture: safe-to-fail experiments. Confidence ceiling: Medium-Low, and no High marker appears anywhere in this plan.

### Section 3. The binding constraint (Theory of Constraints)

- **System and goal:** make Resurface a habit for more than the current minority.
- **The constraint:** missing insight into what the daily-clicking 12% have in common (S2). Every proposed fix (timing, relevance) is a bet on an unvalidated theory. Call this the primary planning bottleneck.
- **Source:** S2, S3.
- **Candidate constraints considered:** (1) Timing (marco's theory, S3). Plausible but untested. (2) Relevance (chloe's theory, S3). Equally plausible and untested. Both are subordinate to learning what actually separates engaged from disengaged users.
- **Why P1 lifts it:** identifying the distinguishing factor turns the timing-vs-relevance argument into an evidence-backed choice.

### Section 4. Prioritized questions, gaps, and open decisions

| Rank | Question / gap | Why it matters | Decision required? | How to resolve |
|---|---|---|---|---|
| Q1 | What do the daily-clicking 12% share? (S2) | Determines whether timing, relevance, or something else is the lever | No, resolve by probe | Profile the engaged cohort vs the rest |
| Q2 | Is it timing or relevance? (S3) | Settles the marco-vs-chloe split with evidence | No, resolve by probe | Run small parallel probes, not a debate |
| Q3 | What does "show movement" mean for the board? (S5) | Sets a realistic two-sprint goal | Yes | PM picks a learning-based success signal |
| Q4 | Can a solo PM run two probes in two sprints? (S6) | Bounds the plan to capacity | Yes | Scope probes to the cheapest viable versions |

### Section 5. The prioritized action plan

#### P1. Profile the engaged cohort (probe)

- **Why:** lifts the constraint by finding what the 12% share (S2); this is a probe to learn, not a commitment.
- **What:** a read on the differences between daily-clickers and non-clickers (content types saved, recency, source, account age).
- **How:** (1) Segment users by click behavior. (2) Compare saved-content and usage attributes. (3) Interview 4 to 5 from each group.
- **Confidence:** Low-Medium. Respects the Complex ceiling.
- **Source:** S2, S4.
- **Expected outcome / success signal:** a candidate distinguishing factor to test in P2/P3.
- **Estimated effort:** about one sprint (S5).
- **Dependencies:** none.

#### P2. Relevance probe (safe-to-fail)

- **Why:** tests chloe's theory (S3) cheaply by improving what is resurfaced for a small cohort.
- **What:** a reversible relevance tweak (recency-weighted or topic-matched) for a test group.
- **How:** (1) Pick the simplest relevance change. (2) Ship to a small cohort behind a flag. (3) Measure click-through vs control.
- **Confidence:** Low-Medium. It is a probe; expect to learn, possibly to revert.
- **Source:** S3.
- **Expected outcome / success signal:** a measurable click-through lift, or a clear null.
- **Estimated effort:** part of one sprint, parallel to P1.
- **Dependencies:** none.

#### P3. Timing probe (safe-to-fail)

- **Why:** tests marco's theory (S3) without committing to a redesign.
- **What:** a small experiment varying digest send time for a cohort.
- **How:** (1) Define two or three send windows. (2) Assign cohorts. (3) Compare open-to-click behavior.
- **Confidence:** Low-Medium.
- **Source:** S3.
- **Expected outcome / success signal:** evidence that timing does or does not move clicks.
- **Estimated effort:** one sprint, lightweight.
- **Dependencies:** none; can follow P1 if capacity (S6) is tight.

**Sequencing (Now / Next / Later)**

| Now | Next | Later |
|---|---|---|
| P1, P2 (parallel) | P3 | Commit a direction after probe readouts |

**What to defer / what NOT to do**

- Do not pick timing or relevance by debate (S3); let the probes decide.
- Do not rebuild the digest before P1 names the distinguishing factor.
- Do not over-read the "love it" survey quotes (S4); they are the engaged minority talking.

### Section 6. Risks and pre-mortem

| Risk | Likelihood | Impact | Early signal | Mitigation | Source |
|---|---|---|---|---|---|
| The 12% are simply your most active users, not winnable signal | M | H | P1 shows engagement tracks overall app activity | Reframe the goal around activation, not the digest | S2 |
| Solo capacity can't run two probes in two sprints | M | M | P1 slips past sprint one | Run P1 first; defer P3 | S6 |
| Board pressure forces a "fix" before probes read | M | H | A timing/relevance change ships before P1 | Frame the board update around the learning plan (S5) | S5 |

### Section 7. Recommended pm-skill prompts (copy/paste ready)

#### To execute P2 and P3: design the probes

**Skill:** `measure-experiment-design`
**Why this skill:** both probes need explicit hypotheses, metrics, cohorts, and kill criteria so two sprints produce evidence, not noise.
**Source:** S3, S5

**Prompt:**
> Design two safe-to-fail experiments for the Brainshelf Resurface digest, where click-through is bimodal (about 12% click daily, the rest rarely). Experiment A tests relevance (a recency-weighted or topic-matched resurfacing change for a small cohort); Experiment B tests send timing across two or three windows. For each, state the hypothesis, the metric, the minimum cohort, the read window (we have ~2 sprints), and the kill criterion. Keep both reversible and runnable by a solo PM.

#### To execute P1: synthesize the cohort interviews

**Skill:** `discover-interview-synthesis`
**Why this skill:** P1's interviews with engaged and disengaged users need to become a pattern, not a pile of quotes.
**Source:** S2, S4

**Prompt:**
> Synthesize 8 to 10 short interviews with Brainshelf users split between daily Resurface clickers and non-clickers. Surface what distinguishes the engaged cohort (content types, saving behavior, recency, account age), reconcile the contradictory survey signal (some say "love it", others "felt random" or "too much"), and flag where the sample is too thin to generalize.

### Section 8. Evidence and source map

| Claim / recommendation | Source ID | Exact quote |
|---|---|---|
| Engagement is bimodal | S2 | "small cohort (~12%) clicks every day, rest basically never click" |
| Click-through is erratic | S1 | "open rate on the digest is ok (~38% [fictional]) but click-through is all over the place" |
| Internal theories conflict | S3 | "marco thinks the digest timing is wrong, chloe thinks it's relevance (we resurface stuff people don't care about anymore)" |
| Survey signal contradicts itself | S4 | "surveys are contradictory - power users say "love it", others say "felt random" or "too much"" |
| Two-sprint horizon | S5 | "we have ~2 sprints before the next board update, want to show movement" |
| Solo capacity | S6 | "20 person team, i'm wearing the PM + launch hat" |

**Inferred (Low confidence) claims:** none load-bearing. Every effort cites a real quote; the plan is probes by design.
**Evidence gaps:** the entire plan rests on unexplained bimodal behavior. P1 exists to close that gap. No High confidence marker appears anywhere, by design.

</details>

<details>
<summary>Workbench (Enterprise): Workbench enterprise collaboration platform. Blueprints GA'd in Q2; the approval-gate completion rate is low and abandonment is high, and the PM needs a ranked plan that satisfies product, sales, eng, and compliance before the QBR.</summary>

**Prompt:**

```
foundation-prioritized-action-plan

Context: Workbench Blueprints (document templates with required sections + role-based approval gates), GA'd Q2 2026. 500 enterprise customers, 200-person company, Series B.

Baselines: Blueprint creation is healthy (142 blueprints created across 38 accounts [fictional]), but the approval-gate completion rate is 41% [fictional] - more than half of submitted blueprints stall in "pending approval" and are abandoned within 14 days. Three launch-week incidents (approval notifications not firing) were resolved but eroded trust with two strategic accounts.

Stakeholders: Sandra C. (Head of Product) wants approval completion up before the QBR; Karen L. (Eng Lead, Blueprints) has ~4 weeks capacity; Mei-Lin T. (Enterprise Sales) says two renewals cite "approvals are clunky"; legal/compliance (the original buyer) needs the gates to stay enforceable.

Target: approval-gate completion rate 41% -> target 70% [fictional] by end of Q3.

Ask: prioritized plan to fix approval-gate completion without weakening compliance enforceability.
```

---

**Output:**

### Step 0: Source ledger

```
S1: "the approval-gate completion rate is 41% [fictional]" (origin: pasted prompt, Baselines)
S2: "more than half of submitted blueprints stall in "pending approval" and are abandoned within 14 days" (origin: pasted prompt, Baselines)
S3: "Three launch-week incidents (approval notifications not firing) were resolved but eroded trust with two strategic accounts" (origin: pasted prompt, Baselines)
S4: "Karen L. (Eng Lead, Blueprints) has ~4 weeks capacity" (origin: pasted prompt, Stakeholders)
S5: "Mei-Lin T. (Enterprise Sales) says two renewals cite "approvals are clunky"" (origin: pasted prompt, Stakeholders)
S6: "legal/compliance (the original buyer) needs the gates to stay enforceable" (origin: pasted prompt, Stakeholders)
S7: "approval-gate completion rate 41% -> target 70% [fictional] by end of Q3" (origin: pasted prompt, Target)
S8: "Blueprint creation is healthy (142 blueprints created across 38 accounts [fictional])" (origin: pasted prompt, Baselines)
```

### Section 0. Executive summary

- **Situation classification:** Complicated (Cynefin). The low completion rate is diagnosable from the approval funnel and the known notification failures.
- **The binding constraint:** the approval step itself. Creation is healthy (S8) but submitted blueprints stall pending approval (S2); the approval-completion rate (S1) is the system bottleneck.
- **The critical next effort (P1):** instrument the approval funnel to locate where blueprints stall before building a fix.
- **Overall plan confidence:** Medium-High. Strong baselines and a known incident history (S3) make the cause analyzable.
- **Time-to-value:** about one week to a funnel diagnosis pointing the build.

### Section 1. Input mirror - what I understand

- **What you gave me:** creation is strong (S8) but only 41% of approvals complete (S1); most submissions stall and are abandoned (S2); launch-week notification failures hurt two strategic accounts (S3); sales hears "approvals are clunky" (S5); legal needs enforceability preserved (S6); Karen L. has a 4-week window (S4); the target is 70% by end of Q3 (S7).
- **What you appear to be trying to accomplish:** lift approval completion to 70% before the QBR without weakening compliance. Confidence: High (explicit target and constraints).
- **Adjacent intents I noticed but did not assume:** weakening or making gates optional, and a notification-system rebuild. Neither is assumed to be the fix.

### Section 2. Situation classification (Cynefin)

**Domain:** Complicated. **Source:** S1, S2, S3.

Cause and effect are knowable with analysis. You have a clear bottleneck (approvals, S1, S2), a quantified baseline, and a known prior failure mode (notifications not firing, S3) that gives a strong first hypothesis. This is not Complex: the approval funnel is instrumentable and the likely mechanisms are finite (notification reliability, approver UX, role configuration). Posture: analyze the funnel, then commit. Confidence ceiling: Medium-High.

### Section 3. The binding constraint (Theory of Constraints)

- **System and goal:** get submitted blueprints through approval so the feature delivers its compliance value.
- **The constraint:** the approval step. Creation is not the limiter (S8); the system stalls when a blueprint sits in "pending approval" and is abandoned (S2), which is exactly what the 41% completion rate measures (S1).
- **Source:** S1, S2, S8.
- **Candidate constraints considered:** (1) Notification reliability (S3). A strong hypothesis given the launch-week failures, but it must be confirmed as the current cause, not assumed from history. (2) Approver UX ("clunky", S5). Plausible and diagnosable. Both are likely sub-causes within the constraint, which P1 will rank.
- **Why P1 lifts it:** instrumenting submitted to approved isolates the dominant stall, so the 4-week window (S4) fixes the real cause, not the remembered one.

### Section 4. Prioritized questions, gaps, and open decisions

| Rank | Question / gap | Why it matters | Decision required? | How to resolve |
|---|---|---|---|---|
| Q1 | Where in submitted-to-approved do blueprints stall? (S2) | Determines whether the fix is notifications, approver UX, or roles | Yes, blocks P1 | Instrument the approval funnel |
| Q2 | Are notifications still failing, or just historically? (S3) | Avoids fixing a resolved problem | Yes, blocks P1 | Audit current notification delivery |
| Q3 | What makes approvals feel "clunky"? (S5) | Tells us if approver UX is the dominant stall | No, resolve by P1 | Approver-side session review |
| Q4 | Which fixes preserve enforceability? (S6) | A faster gate that weakens compliance fails the original buyer | Yes | Review each candidate fix with legal |

### Section 5. The prioritized action plan

#### P1. Instrument the approval funnel

- **Why:** lifts the binding constraint by locating the dominant stall between submitted and approved (S2). The 4-week window (S4) must fund the real cause.
- **What:** a funnel from submitted to approver-notified to approver-acted to completed, with the largest drop named.
- **How:** (1) Instrument each approval transition. (2) Audit current notification delivery (S3). (3) Review approver-side sessions for the "clunky" friction (S5).
- **Confidence:** Medium-High. Respects the Complicated ceiling.
- **Source:** S1, S2, S3.
- **Expected outcome / success signal:** the dominant stall point named, with notifications confirmed or cleared.
- **Estimated effort:** about 1 week.
- **Dependencies:** none.

#### P2. Fix the dominant stall without weakening the gate

- **Why:** once P1 names the stall, a targeted fix moves completion toward 70% (S7) while keeping gates enforceable (S6).
- **What:** the specific fix (reliable approver notifications, an approver action surface, or clearer role routing), reviewed with legal.
- **How:** (1) Build the targeted fix in the window (S4). (2) Run each candidate past legal for enforceability (S6). (3) Measure completion against the 41% baseline (S1).
- **Confidence:** Medium. Depends on P1.
- **Source:** S6, S7, S4.
- **Expected outcome / success signal:** approval completion climbs off 41% [fictional] toward target.
- **Estimated effort:** about 2 to 3 weeks of the window.
- **Dependencies:** P1.

#### P3. Repair trust with the two strategic accounts

- **Why:** the launch-week incidents (S3) and the "approvals are clunky" renewal signal (S5) put two accounts at risk; a direct fix-and-follow-up protects revenue.
- **What:** a targeted outreach with the fix timeline for the affected accounts.
- **How:** (1) Mei-Lin T. and product brief the two accounts. (2) Share the P2 fix and timeline. (3) Confirm the incident root cause is closed.
- **Confidence:** Medium.
- **Source:** S3, S5.
- **Expected outcome / success signal:** both accounts acknowledge the fix; renewal risk drops.
- **Estimated effort:** a few days, parallel to P2.
- **Dependencies:** P1 (to speak credibly about the cause).

**Sequencing (Now / Next / Later)**

| Now | Next | Later |
|---|---|---|
| P1 | P2, P3 | Re-measure against the 70% target |

**What to defer / what NOT to do**

- Do not make gates optional or weaken enforceability (S6) to raise completion.
- Do not rebuild the notification system before P1 confirms it is the current cause (S3).
- Do not commit the 4-week window (S4) until P1 names the dominant stall.

### Section 6. Risks and pre-mortem

| Risk | Likelihood | Impact | Early signal | Mitigation | Source |
|---|---|---|---|---|---|
| Pressure to hit 70% leads to weakening gates | M | H | Proposals to make sections optional appear | Hold the enforceability line; route every fix past legal | S6, S7 |
| Team fixes notifications, but UX was the real stall | M | H | P1 shows approvers see notices but do not act | Prioritize the approver action surface over re-plumbing notifications | S3, S5 |
| Strategic accounts churn before the fix lands | M | H | A renewal date precedes the P2 ship date | Run P3 in parallel with a concrete timeline | S3, S5 |
| 4-week window underestimates the fix | L | M | P1 reveals a role-config root cause | Scope P2 to the single dominant stall only | S4 |

### Section 7. Recommended pm-skill prompts (copy/paste ready)

#### To execute P1: instrument the funnel

**Skill:** `measure-instrumentation-spec`
**Why this skill:** P1 needs a precise event spec for the approval funnel so the diagnosis is measured, not guessed.
**Source:** S1, S2

**Prompt:**
> Write an instrumentation spec for the Workbench Blueprints approval funnel. We need to measure each transition from blueprint submitted to approver notified to approver acted to approval completed, so we can locate where the 41% [fictional] completion rate stalls (most submissions sit in "pending approval" and are abandoned within 14 days). Include event names, properties, the approver identity and role, notification delivery status, and time-in-state, and call out what we must capture to distinguish a notification failure from an approver-UX stall.

#### To execute P2: spec the targeted fix

**Skill:** `deliver-prd`
**Why this skill:** once P1 names the stall, P2 needs an eng-ready spec scoped to the 4-week window that preserves enforceability.
**Source:** S4, S6

**Prompt:**
> Write a PRD for a Blueprints approval-completion fix scoped to about four weeks of eng capacity, targeting a move from 41% to 70% [fictional] approval completion by end of Q3. Assume discovery identified the dominant stall in the submitted-to-approved funnel. The fix must keep the approval gates enforceable for legal/compliance (no optional gates). Cover the approver notification and action experience, success metrics tied to completion rate, and explicit non-goals.

### Section 8. Evidence and source map

| Claim / recommendation | Source ID | Exact quote |
|---|---|---|
| Approval completion is low | S1 | "the approval-gate completion rate is 41% [fictional]" |
| Submissions stall and are abandoned | S2 | "more than half of submitted blueprints stall in "pending approval" and are abandoned within 14 days" |
| Notification incidents eroded trust | S3 | "Three launch-week incidents (approval notifications not firing) were resolved but eroded trust with two strategic accounts" |
| Build window | S4 | "Karen L. (Eng Lead, Blueprints) has ~4 weeks capacity" |
| Renewal risk on clunky approvals | S5 | "Mei-Lin T. (Enterprise Sales) says two renewals cite "approvals are clunky"" |
| Enforceability constraint | S6 | "legal/compliance (the original buyer) needs the gates to stay enforceable" |
| Target | S7 | "approval-gate completion rate 41% -> target 70% [fictional] by end of Q3" |
| Creation is not the limiter | S8 | "Blueprint creation is healthy (142 blueprints created across 38 accounts [fictional])" |

**Inferred (Low confidence) claims:** none load-bearing; every effort cites a quote.
**Evidence gaps:** whether notifications are currently failing or only historically (Q2) is unconfirmed; the plan treats it as a hypothesis to test in P1, not a fact.

</details>

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
