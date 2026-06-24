# Spec: `foundation-build-risk-review` (v2.29.0) - DRAFT for review

Companion to [`plan_v2.29.0.md`](plan_v2.29.0.md) and the [F-56 effort brief](../../efforts/F-56-build-risk-review.md); realizes issue #149. Defines the skill contract: the two triage modes, the verdict-as-router, the Build Risk Review output, the risk taxonomy + demand hierarchy + evidence ladder, the boundaries, and the `references/` files. DRAFT: proposed; locked where the plan's Decisions table says DECIDED.

## What it produces

One saveable artifact = a **Build Risk Review**: a fast, evidence-calibrated read on whether a proposed build is worth committing to, ending in a single verdict and a concrete next step. Input is a product idea, a feature request, or a scope / requirement change. It is NOT a launched-product diagnosis - that routes to `iterate-pivot-decision`.

## The two modes (routing)

Route on what the user brings; state the assumed mode at the top.

1. **Pre-build (Quick Reality Check)** - a new idea, product, or MVP not yet built.
2. **Feature-change (Feature Reality Check)** - a feature request, scope expansion, requirement change, or competitor-copy on an in-progress product. This is the primary, PM-native mode.
3. (router only) **Already launched / pivot territory** -> hand off to `iterate-pivot-decision` (post-launch, with usage data). Not a mode of this skill.

If the request is too broad to review responsibly, ask exactly one clarifying question (the one-sentence "this is for [who] in [situation] to solve [problem]" completion), then proceed. Never a long questionnaire (at most two questions before a constrained review).

## The contract (the spine)

1. **Name the single biggest risk.** Exactly one primary risk, tagged from the risk taxonomy. Not a long inventory.
2. **Classify the demand (feature mode).** Place the request on the demand hierarchy L0-L4 (L0 founder anxiety or "competitors have it", up to L4 revenue or retention blocker). Build-now is usually justified only at L3-L4.
3. **Grade the evidence.** An evidence ledger: what signal exists, each entry graded on a strength ladder. Likes, compliments, waitlists, and market-size are NOT demand; real files, booked calls, payment, repeated manual use, or switching from an alternative are. Inherits the no-fabrication / evidence-calibration discipline of `foundation-persona` and `discover-market-sizing`.
4. **Return one verdict** (the four): Build small / Validate first / Pivot first / Don't build yet. No "Kill" (too theatrical).
5. **Give a no-code next step.** A specific validation action (talk to N users who do X; manually deliver for 3; collect a preorder), never generic "build an MVP" or "do user research".
6. **Route.** Map the verdict to the next skill (the routing table). The skill's distinguishing job is the gate plus the dispatch.

## Verdict-as-router

| Verdict | Means | Routes to |
|---|---|---|
| Build small | worth a narrow first version | `define-problem-statement` -> `deliver-prd` / `deliver-user-stories` |
| Validate first | direction plausible, demand / payment / distribution unproven | `define-hypothesis` (+ `measure-experiment-design`) |
| Pivot first | area plausible, current wedge too broad / crowded / weak | `foundation-lean-canvas` (re-frame the model) |
| Don't build yet | too vague, no reachable user, or solved well enough already | stop; or `discover-competitive-analysis` / `discover-market-sizing` for an evidence check |
| (ranking several requests) | not one build decision but a portfolio call | `define-prioritization-framework` |

## Risk taxonomy (native vocabulary)

The imported demand / distribution / monetization / retention / trust types, re-expressed in the library's frameworks (lean-startup, JTBD, the lean-canvas blocks) so the hand-offs are natural. Full list in `references/risk-taxonomy.md`; the core checks (about six): idea source (real pain vs a technology capability), user proximity, existing alternative + switching reason, manual distribution (can you name and reach the first 10 users), schlep / defensibility, monetization fit (recurring vs one-time; is the buyer the user). Each maps to a lean-canvas block, so a flagged risk routes to `foundation-lean-canvas` at the right place.

## Output contract

- **Single artifact.** Structure: decision header (verdict + one-line rationale) -> the single biggest risk (`R1`, with its taxonomy tag) -> supporting risks (`R2`, `R3`, at most 3-5, each tagged) -> demand level (feature mode) -> evidence ledger (each entry graded) -> validation plan (the no-code next steps) -> routing (the next skill) -> Sources. Template authoring blockquotes stripped from the final output.
- **Risk IDs** (`R1`, `R2`, ...) so a review is linkable, mirroring the repo's reference-ID convention.
- **Filename:** `YYYY-MM-DD_HH-MMtz_<title>_build-risk-review.md`; library samples use `sample_foundation-build-risk-review_<thread>_<suffix>.md` per `SAMPLE_CREATION.md`.

## Classification, naming, boundaries

- `metadata.classification: foundation`, `metadata.category: problem-framing` (D3 open: vs `validation`). Standalone.
- Name `foundation-build-risk-review` (D3 open: vs `foundation-build-decision` / `foundation-pre-build-review`).
- **When NOT to Use** (bidirectional with the closest neighbor):

| Run foundation-build-risk-review | Run this instead |
|---|---|
| Pre-commitment, low or no data, "should we build / expand?" | (this skill) |
| Post-launch, with usage data, pivot-or-persevere | `iterate-pivot-decision` |
| You have chosen the assumption and need to design the test | `define-hypothesis` |
| You need the full nine-block business model, not a single-risk read | `foundation-lean-canvas` |
| You are ranking many requests against each other | `define-prioritization-framework` |
| Framing a confirmed problem for the team | `define-problem-statement` |

Add the reciprocal cross-link in `iterate-pivot-decision` ("for a pre-build or pre-change gate, use foundation-build-risk-review").

## Adaptation from source

Adapted from `bin1874/before-you-build-skill` (Apache-2.0). Stripped: the external `beforeyoubuild.fyi` Case Memory API call (pm-skills artifacts are self-contained, no network), the `openclaw` / `skillKey` metadata, and the "translate into the user's language" instruction. Re-voiced from indie-hacker to PM-neutral (feature requests, roadmap / scope decisions). Attribution retained in SKILL.md.

## `references/` files

- **`TEMPLATE.md`** - the Build Risk Review scaffold (decision header, `R#` risk blocks with taxonomy tags, demand-level field, evidence ledger, validation plan, routing, Sources), section order per `SAMPLE_CREATION.md`.
- **`EXAMPLE.md`** - one fully worked feature-mode case (suggest a Storevine or Workbench feature request) showing the verdict, `R1`-`R3`, the L0-L4 call, a graded evidence ledger, the no-code validation plan, and the routing - all sections complete, no placeholders.
- **`risk-taxonomy.md`** - the risk types in the library's vocabulary, each with a "what it looks like" cue and the lean-canvas block / next skill it routes to; the demand hierarchy L0-L4; the evidence strength ladder.
- **`routing-map.md`** - the verdict -> next-skill table plus the per-risk routing, the single integration map.
- **`evals/trigger-fixtures.json`** - positive + near-miss fixtures (committed, authored FIRST per the plan gate), explicitly covering the boundaries with all five neighbors. Feeds `check-new-skill-collision.mjs`.

## Open questions / decisions

- **D3 (OPEN) - name + category.** `foundation-build-risk-review` (recommended) vs `foundation-build-decision` / `foundation-pre-build-review`; `problem-framing` (matches the `foundation-lean-canvas` exemplar) vs a `validation` category.
- **Secondary new-idea mode - keep or cut?** Ship both modes, or feature/scope-only for the tightest fit and the least `foundation-lean-canvas` overlap. RECOMMENDED: keep both, with the center of gravity on the feature mode.
- **D4 (OPEN) - workflow integration.** Front-gate of `workflow-feature-kickoff` this cycle, or defer. Default defer.

## Acceptance (proposed)

- [ ] **Gate first:** `evals/trigger-fixtures.json` authored with near-miss negatives vs all five neighbors; the disambiguation pass is clean (the go/no-go); `check-new-skill-collision.mjs` green.
- [ ] SKILL.md + the 4 `references/` files present; `lint-skills-frontmatter` green (TEMPLATE.md + EXAMPLE.md required); description 20-100 words, single-line.
- [ ] The contract is in SKILL.md: one primary risk (`R1`, tagged), demand level L0-L4 (feature mode), a graded evidence ledger, one of the four verdicts, a no-code next step, and the routing.
- [ ] The Build Risk Review artifact is a single doc with `R#` risk IDs and the section order in TEMPLATE.md; EXAMPLE.md is a complete worked case.
- [ ] `risk-taxonomy.md` (types + demand hierarchy + evidence ladder) and `routing-map.md` (verdict -> skill) present; each risk routes to a lean-canvas block / next skill.
- [ ] When-NOT-to-Use present and bidirectional; the reciprocal cross-link is added to `iterate-pivot-decision`.
- [ ] Structure-forward (the taxonomy / hierarchy / ladder / rubric carry the value, not verdict-only prose) - the D1 no-go condition.
- [ ] An M-33 output-eval rubric for the artifact; samples for the three threads passing the sample invariant + `check-skill-sample-coverage`.
- [ ] Source attribution (`bin1874`, Apache-2.0) in SKILL.md.
