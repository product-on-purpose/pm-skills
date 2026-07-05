---
name: foundation-build-risk-review
description: Runs a fast pre-build risk review on a product idea, feature request, or scope change, naming the single assumption most likely to make it fail and returning a clear verdict (build small, validate first, pivot first, or don't build yet) with a no-code validation step. Use before committing build effort, when triaging whether to honor a feature request, or when deciding whether to expand scope, ahead of writing a PRD. For a launched product's pivot-or-persevere decision, use iterate-pivot-decision instead.
license: Apache-2.0
metadata:
  classification: foundation
  version: "1.0.1"
  updated: 2026-07-04
  category: problem-framing
  frameworks: [triple-diamond, lean-startup]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
<!-- Adapted from bin1874/before-you-build-skill (Apache-2.0), repositioned PM-neutral. -->
# Build Risk Review

Don't build it yet. First name the one assumption most likely to make it fail.

`foundation-build-risk-review` is a fast, pre-commitment gate for product decisions. Given an idea, a feature request, or a scope change, it returns a **Build Risk Review**: the single biggest risk, the evidence behind it, a verdict, and a concrete no-code validation step, then routes you to the skill that does the next piece of work. It is a foundation hub: its job is to triage and dispatch, not to duplicate the deeper skills.

## Hard gate

Do not write code, scaffold a project, recommend a stack, or design implementation. First answer three things: should this be built, what is most likely to make it fail, and what must be validated before committing.

If the user says the work is for learning, a portfolio, or internal practice, do not judge it by market standards; still flag scope and clarity risks.

## When to Use

- A product idea, MVP, or new bet is about to turn into build work.
- A feature request or scope change has arrived and you need to separate real demand from a polite ask, founder anxiety, or competitor-copying.
- Someone wants a fast "should we build this?" verdict before a PRD, roadmap row, or ticket exists.

## When NOT to Use

| If the ask is | Use instead |
|---|---|
| A launched product's pivot-or-persevere call, weighing usage or market data | `iterate-pivot-decision` |
| You have chosen the assumption and need to design the test | `define-hypothesis` |
| Framing a confirmed problem for the team or leadership | `define-problem-statement` |
| The full nine-block business model, not a single-risk read | `foundation-lean-canvas` |
| Ranking many features or initiatives against each other | `define-prioritization-framework` |

The boundary that matters most: this skill is **forward-looking and pre-commitment** (low or no data); `iterate-pivot-decision` is **retrospective and post-launch** (it weighs market feedback on something already shipped).

## Modes (route first; state the mode at the top)

1. **Pre-build** - a new idea, product, or MVP not yet built. The usual primary risks: demand and distribution.
2. **Feature-change** - a feature request, scope expansion, requirement change, or competitor-copy on an in-progress product. The primary tool here is the demand hierarchy.

If the product is already launched and the question is whether to change direction, hand off to `iterate-pivot-decision`. If the request is too broad to review responsibly, ask exactly one clarifying question (complete the sentence: "this is for [who] in [situation] to solve [problem]"), then proceed. Never run a long questionnaire; at most two questions before a constrained review.

## The review (the contract)

Produce a Build Risk Review with these parts:

1. **Biggest risk (`R1`).** Exactly one primary risk, tagged from `references/risk-taxonomy.md`. Not a long inventory. Add at most three to five supporting risks (`R2`, `R3`, ...).
2. **Demand level (feature-change mode).** Place the request on the hierarchy: L0 founder anxiety or "competitors have it"; L1 one user asked; L2 repeated asks, no behavior proof; L3 workflow blocker; L4 revenue or retention blocker. Build-now is usually justified only at L3 or L4.
3. **Evidence ledger.** List the signal that exists and grade each entry on the strength ladder in `references/risk-taxonomy.md`. Likes, compliments, waitlists, and market-size numbers are NOT demand. Real files, booked calls, payment, repeated manual use, or switching from an existing alternative are.
4. **Verdict** (exactly one): **Build small** / **Validate first** / **Pivot first** / **Don't build yet**. Do not use "Kill".
5. **Validation step.** A specific, no-code or low-code next action (talk to the ten users who do X; manually deliver the result for three of them; collect a preorder, paid call, or deposit), never generic advice like "build an MVP" or "do user research".
6. **Routing.** Send the user to the skill that does the next piece of work (see below).

Be skeptical but useful. Always separate "can be built" from "should be built". Do not flatter the idea or default to encouragement; do not say "this has potential" unless the path is specific.

## Verdict routing

| Verdict | Routes to |
|---|---|
| Build small | `define-problem-statement`, then `deliver-prd` / `deliver-user-stories` |
| Validate first | `define-hypothesis`, then `measure-experiment-design` |
| Pivot first | `foundation-lean-canvas` (re-frame the model) |
| Don't build yet | stop; or `discover-competitive-analysis` / `discover-market-sizing` for an evidence check |
| Several competing requests | `define-prioritization-framework` |

Full map, including the per-risk routing: `references/routing-map.md`.

## Output Format

A single Build Risk Review artifact, built from `references/TEMPLATE.md`. Section order: decision header (verdict + one-line rationale), the biggest risk (`R1`), supporting risks, demand level (feature mode), evidence ledger, validation plan, routing, Sources. A fully worked case is in `references/EXAMPLE.md`.

## Quality Checklist

- [ ] Exactly one primary risk is named (`R1`) and tagged from the taxonomy.
- [ ] Feature-change mode places the request on L0 through L4.
- [ ] Every evidence entry is graded; no like, waitlist, or market-size number is counted as demand.
- [ ] Exactly one of the four verdicts is returned.
- [ ] The next step is specific and low or no-code, not generic advice.
- [ ] A routing target is named.
- [ ] No code, stack recommendation, or implementation design is produced (the hard gate held).

## Attribution

Adapted from `bin1874/before-you-build-skill` (Apache-2.0), repositioned PM-neutral. The source skill's external case-memory API call and translate-to-user-language behavior are removed.
