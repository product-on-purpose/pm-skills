# OKR Set: {team or scope name}, {cycle}

> Output template for the `foundation-okr-writer` skill. Section order is canonical and enforced by the skill's Output Contract. Remove this guidance blockquote and all template comments before finalizing the artifact for the user.

## Context

> Capture scope, cycle, level, OKR type, empowerment signal, source of truth, strategic input, and assumptions. This block makes the OKR set's frame explicit so future readers understand what was being optimized for.

- Scope: {company | department | product | product-area | team | initiative}
- Cycle: {2026-Q3 | 2026-H2 | 2026 | launch window | custom}
- Level: {repeat of scope, or higher level made explicit}
- OKR type: {committed | aspirational | learning | operational_health | compliance_or_safety}
- Empowered-team signal: {empowered | feature-team | mixed | unknown}
- Source of truth: {URL or path to the live tracker; this artifact is a planning input}
- Strategic input: {parent OKR, strategy pillar, customer problem, business pressure}
- Assumptions: {list of working hypotheses behind this OKR set}

## Objective

> Qualitative, specific, directional statement of the desired state change. One sentence ideally. Never embed metrics here; numbers belong in KRs.

{Objective text}

## Key Results

> Each KR uses a stacked-bullet format, not a wide table. Every KR includes the seven required sub-fields. Missing values must be explicitly marked (`assumption`, `placeholder`, `recommended-to-measure`, `not-enough-evidence`); never fabricate.

- KR1: {one-line statement: metric verb-and-noun, baseline value to target value by deadline}
  - Metric: {precise definition of the measured quantity}
  - Baseline: {value, with `as_of` date; or `recommended-to-measure` if missing}
  - Target: {value, with deadline}
  - Evidence source: {dashboard, event, dataset, survey, support system}
  - Owner: {person or team; team-level by default}
  - Indicator class: {leading | lagging | guardrail | health | evidence_generation}
  - Confidence: {high | medium | low | unknown}

- KR2: {as above}

- KR3: {as above}

## Initiatives as Bets

> Initiatives are the work the team will undertake to move the KRs. They are hypotheses, not commitments. Do NOT list initiatives as KRs. Each initiative names which KR(s) it is expected to move.

- Initiative 1: {name}
  - Expected KR impact: {KR1, KR2, etc.}
  - Hypothesis: {why this work is expected to move that KR}
  - Dependency: {what must be in place; named team or platform if cross-functional}

- Initiative 2: {as above}

## Guardrails and Health Checks

> Counter-metrics that prevent the primary KRs from being achieved at the cost of something else. Required for any optimization-style KR (growth, speed, volume).

- Guardrail 1: {metric and threshold}
  - Why: {what failure mode this prevents}

- Guardrail 2: {as above}

## Alignment Notes

> Make the OKR's relationships explicit so cross-team dependencies and conflicts are visible.

- Parent or strategy link: {parent OKR or strategy pillar}
- Peer dependencies: {teams whose work supports or conflicts with this OKR}
- Known conflicts: {KRs from peer teams that may pull against this set}
- Out of scope this cycle: {what this OKR does NOT cover, even if relevant}

## Disclosure

> OPTIONAL section. Include ONLY when `empowerment_signal == feature-team | mixed`. Omit entirely when `empowered`.

This OKR set frames pre-committed work as outcome bets. If the metrics do not move when the work ships, that is a learning, not a delivery failure. The team's lever this cycle is to keep shipping; the OKR's lever is to update next-cycle planning.

## Quality Audit

> Apply the rubric. Each criterion gets pass | risk | fail with a one-line rationale.

- Strategic fit: {pass | risk | fail} - {rationale}
- Objective quality: {pass | risk | fail} - {rationale}
- KR outcome quality: {pass | risk | fail} - {rationale}
- Measurement quality: {pass | risk | fail} - {rationale}
- Product influence: {pass | risk | fail} - {rationale}
- Focus: {pass | risk | fail} - {rationale}
- Guardrails: {pass | risk | fail} - {rationale}
- Alignment: {pass | risk | fail} - {rationale}
- Operating rhythm: {pass | risk | fail} - {rationale}
- Integrity: {pass | risk | fail} - {rationale}
- Empowered-team Disclosure: {pass | not-applicable} - {rationale}

## Open Questions

> Decisions the user must resolve before the OKR set is final. Numbered list. Each question should be specific and answerable.

1. {question}
2. {question}

## Suggested Next Step

> One concrete next action that moves this OKR set toward final form or toward execution.

{Action}
