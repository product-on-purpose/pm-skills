# [F-56] foundation-build-risk-review (the pre-build / feature-triage gate)

Status: Proposed - conditional GO (the go/no-go is gated on the trigger-fixture disambiguation pass; see Validation)
Milestone: v2.29.0 (the memory train was deferred to `_unreleased/project-memory/` on 2026-06-22, freeing this slot; number tentative)
Issue: #149 (external request: "before-you-build product risk review")
Agent: claude (PM judgment + authoring); the maintainer owns the go/no-go
Source: adapted from `bin1874/before-you-build-skill` (Apache-2.0), repositioned for pm-skills
Companion docs: [plan](../release-plans/v2.29.0/plan_v2.29.0.md) + [spec](../release-plans/v2.29.0/spec_build-risk-review.md) + [implementation plan](../release-plans/v2.29.0/implementation-plan_build-risk-review.md)

## Scope

Create `foundation-build-risk-review`, a foundation skill (`classification: foundation`, category `problem-framing`) that runs a fast, pre-commitment risk review on a product idea, feature request, or scope change: it names the single assumption most likely to make the work fail and returns a clear verdict (Build small / Validate first / Pivot first / Don't build yet) with a concrete no-code validation step.

Adapted from the external Apache-2.0 skill `bin1874/before-you-build-skill`, but deliberately **repositioned**: the source is a founder's startup cold-shower; this skill's center of gravity is the PM-native decision, "should we build this feature, honor this request, or expand this scope", with new-idea triage as a secondary mode. Two-mode scope (pre-build + feature-change); launched-product diagnosis hands off to `iterate-pivot-decision` (the post-launch pivot-or-persevere call).

Origin: external intake #149. Distinct from its five nearest neighbors (see Boundaries).

## Problem

"Should we build this?" is one of the highest-frequency PM decisions, and nothing in the catalog returns a fast verdict on it. Teams turn an unvalidated idea or a single feature request into a PRD, a roadmap row, or a code task too early; the cost lands later as a feature treadmill or a build nobody adopts.

The gap is real. Why-Gate evidence, three scenarios where current skills fall short:

1. *"A stakeholder asked for SSO - should we build it now?"* `define-prioritization-framework` (the RICE/ICE/MoSCoW ranker) ranks by value and effort but does not diagnose whether the request is Level-0 founder anxiety or a Level-4 retention blocker; `define-hypothesis` (the testable-assumption skill) assumes you have already decided to test something.
2. *"I want to build an AI tool that summarizes Slack threads - worth doing before I start?"* `define-problem-statement` (the problem framer) frames the problem but returns no verdict, no single biggest-failure-mode, no validation step.
3. *"We're thinking of expanding our utility into a platform."* `foundation-lean-canvas` (the nine-block business-model canvas) models the business but is heavyweight; nothing offers a fast scope-creep / premature-scaling triage with a Cut or Defer verdict.

## How it works (the design)

The load-bearing decision is to **position this as the PM build-decision gate that triages a request and dispatches into the library**, not as a standalone advice skill. That reframe is what makes it fit cleanly: the overlap with adjacent skills becomes its job (routing), and a triage gate is an operating-layer move rather than "artifact skill #68".

1. **PM-native center of gravity.** The primary path is the **feature/scope triage**: the L0-L4 demand hierarchy (L0 founder anxiety, up to L4 revenue or retention blocker) and the scope-creep / feature-treadmill / user-request-trap patterns. New-idea triage is the secondary path. This tightens audience fit and shrinks the overlap with `foundation-lean-canvas`, which owns new-venture framing.
2. **A traceable artifact, not just a verdict.** Output is a **Build Risk Review** with a fixed contract: a decision header (verdict + one-line rationale), risks given reference IDs (`R1`, `R2`, ...) each tagged from a named taxonomy, an **evidence ledger** that grades the available signal on a strength ladder (reusing the no-fabrication / evidence-calibration discipline already in `foundation-persona` and `discover-market-sizing`: likes, waitlists, and market-size are not demand), the L0-L4 demand level for feature mode, and a validation plan. This makes it a decision artifact you can attach to a PRD or an issue, gives it a natural TEMPLATE and EXAMPLE, and makes it gradeable by an M-33 (output-quality eval rubrics) rubric.
3. **Verdict-as-router.** Each verdict dispatches to a specific next skill, so the skill is non-duplicative by construction:
   - Validate first -> `define-hypothesis` (+ `measure-experiment-design`)
   - Build small -> `define-problem-statement` -> `deliver-prd` / `deliver-user-stories`
   - Several competing requests -> `define-prioritization-framework`
   - Needs an evidence check -> `discover-competitive-analysis` / `discover-market-sizing`
   - Deeper business-model doubt -> `foundation-lean-canvas`
   - Already launched, pivot territory -> `iterate-pivot-decision`
4. **Native taxonomy.** Re-express the imported demand / distribution / monetization / retention / trust risk types in the library's own vocabulary (lean-startup, JTBD, the lean-canvas blocks) so the taxonomy reads native and the hand-offs are natural (a risk that "lives in the Channels block" routes straight to `foundation-lean-canvas`).
5. **Adaptation from source.** Strip the external `beforeyoubuild.fyi` Case Memory API call (pm-skills artifacts are self-contained and do not phone home), drop the `openclaw` / `skillKey` metadata and the "translate into the user's language" instruction, and re-voice from indie-hacker to PM-neutral. Keep Apache-2.0; attribute `bin1874/before-you-build-skill`.

## Classification + exemplars

- Classification: `foundation` (cross-phase hub) -> directory `foundation-build-risk-review`, frontmatter `classification: foundation`, category `problem-framing`.
- Exemplars to model: `foundation-lean-canvas` (the closest structural match: a cross-phase hub that cross-links to deeper skills without duplicating them, which is exactly the router pattern here) and `iterate-pivot-decision` (for the decision/verdict artifact shape).

## Boundaries (overlap resolution)

A "When NOT to use" section ships in SKILL.md, bidirectional with the closest neighbor:

| Run foundation-build-risk-review when | Run this instead |
|---|---|
| Pre-commitment, low or no data, "should we build / expand?" | (this skill) |
| Post-launch, with usage data, pivot-or-persevere | `iterate-pivot-decision` |
| You have chosen the assumption and need to design the test | `define-hypothesis` |
| You need the full business model, not a single-risk read | `foundation-lean-canvas` |
| You are ranking many requests against each other | `define-prioritization-framework` |

Add the reciprocal cross-link in `iterate-pivot-decision` ("for a pre-build or pre-change gate, use foundation-build-risk-review").

## Deliverables

- `skills/foundation-build-risk-review/SKILL.md` + `references/{TEMPLATE, EXAMPLE, risk-taxonomy, routing-map}.md`
- `skills/foundation-build-risk-review/evals/trigger-fixtures.json` (M-31 trigger-accuracy format, with near-miss negatives against all five neighbors)
- An M-33 output-eval rubric for the Build Risk Review artifact
- Library samples per the `check-skill-sample-coverage` gate (the three thread profiles)
- Command + AGENTS.md catalog entry (regenerated via `gen-skill-manifest.mjs`)
- Source attribution (`bin1874/before-you-build-skill`, Apache-2.0)

## Validation (the go/no-go gate)

The real go/no-go checkpoint is **before promotion to `skills/`**, not at idea stage:

1. **Trigger-fixture disambiguation pass.** Author the fixtures first; near-miss negatives must separate this skill from `foundation-lean-canvas`, `iterate-pivot-decision`, `define-hypothesis`, and `define-problem-statement`. If the boundary cannot be drawn cleanly, that is the signal the "gap" is really a seam between existing skills, and the right move is to fold the unique bits (the demand hierarchy, the verdict rubric) into those skills instead of adding a door.
2. **Structure-forward, or no-go.** The differentiator is the structured scaffolding (demand hierarchy + failure-pattern taxonomy + evidence ladder + verdict rubric). If the skill is flattened to verdict-only prose, its marginal value over bare prompting collapses; keep the structure or do not ship.
3. Standard pre-ship: `lint-skills-frontmatter`, description 20-100 words single-line, `check-skill-sample-coverage`, the no-em-dash sweep, and the new trigger/eval validators green.

## Extension (optional, same or later release)

Wire the gate as step 0 of `workflow-feature-kickoff` (risk-gate -> if go -> problem-statement -> PRD), or stand up a small `workflow-build-decision`, so the routing in How-it-works (3) is demonstrated in the composition layer rather than only asserted.

## Open questions

- Name: `foundation-build-risk-review` vs `foundation-build-decision` vs `foundation-pre-build-review`.
- Category: `problem-framing` (matches the lean-canvas exemplar) vs a `validation` category.
- Keep the secondary new-idea mode, or ship feature/scope-only for the tightest fit and the least `foundation-lean-canvas` overlap?
- Ship the workflow integration in the same release, or defer it.

## Dependencies + strategic note

- No hard dependencies.
- Strategic tension to record honestly: the roadmap's thesis is "the next frontier is NOT more skills" (discovery, activation, trust). A 68th skill runs mildly against that, so it must clear a higher bar, which frequency + external pull (#149) + a genuine gap support. The **router positioning** (How-it-works, lead) is what reconciles it: a triage gate that dispatches into the library is closer to the operating-layer phase-router theme than to a new artifact skill.
- Go/no-go opinion on record: conditional GO (about 70/30), gated on Validation item 1.
- Alternative considered and rejected: a workflow chaining existing skills (the skill-builder Kill Gate option). Rejected because the gate's job, one fast call with a verdict, is lower-altitude than any chain of artifact skills; a workflow would be heavier, not lighter. A standalone foundation skill is the right vehicle, provided the structure stays intact.

## Status transitions

- Proposed (current) - conditional GO
- Scoped - Skill Implementation Packet generated to `_staging/` (gitignored)
- In Progress - when scheduled into a release milestone and the fixtures are authored
- Shipped - on the tag that promotes it, with fixtures + output-eval rubric + samples
