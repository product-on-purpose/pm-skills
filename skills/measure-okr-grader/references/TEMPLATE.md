# OKR Cycle Review: {team or scope name}, {cycle}

> Output template for the `measure-okr-grader` skill. Section order is canonical and enforced by the skill's Output Contract. Remove this guidance blockquote and all template comments before finalizing the artifact for the user.

## Summary

> One-paragraph orientation: scope, cycle, overall interpretation (aspirational sweet spot? clear win? committed miss? mixed?), evidence confidence overall, and the main learning the cycle produced. Do NOT lead with a single number; OKRs with heterogeneous types do not average meaningfully.

- Scope: {team | product-area | department | company}
- Cycle: {2026-Q3 | 2026-H2 | 2026 | launch window | custom}
- Overall interpretation: {qualitative read; do not force a single average across mixed KR types}
- Evidence confidence: {high | medium | low | mixed}
- Main learning: {one sentence on the most load-bearing learning}

## Scorecard

> Each KR is scored using the convention for its OKR type from the canonical 5-value enum: `committed | aspirational | learning | operational_health | compliance_or_safety`. Indicator class (`leading | lagging | guardrail | health | evidence_generation`) is independent and applies on top of the type. Numeric scores belong to aspirational KRs only; committed KRs are pass or fail; compliance_or_safety KRs are binary (no partial credit, no retroactive scope shrinkage); operational_health KRs are pass | fail | drift-within-tolerance; learning KRs use validated or invalidated language. Special states: `not-yet-observable` for cycle-window extensions past close; `not-yet-fully-observable` for committed or compliance_or_safety KRs with partial coverage. KRs with indicator class `guardrail` are surfaced as their own signal and never averaged into the primary objective score, regardless of OKR type.

- Objective: {original objective text}
  - Rough qualitative read: {one-line summary; do NOT force a single numeric average across heterogeneous types}

- KR1 ({OKR type}; indicator class {indicator class}): {original KR text, baseline to target}
  - Actual: {value, with `as_of` date; `not-yet-observable` if cycle window extends past close; `not-yet-fully-observable` if committed or compliance_or_safety with partial coverage}
  - Score: {numeric on 0-1 scale for aspirational; pass | fail for committed; binary met | not-met for compliance_or_safety; pass | fail | drift-within-tolerance for operational_health; validated | invalidated for learning; deferred for not-yet-(fully-)observable}
  - Evidence confidence: {high | medium | low | unknown}
  - Interpretation: {what this score does and does not mean; if indicator class is `guardrail`, note that the score is reported separately and not averaged into the primary score}

- KR2: {as above}

- KR3: {as above}

## Objective Interpretation

> Synthesize a qualitative read of the objective. Avoid naive averaging when KRs have different types. State explicitly what the score does and does not mean so future readers cannot over-read it.

- Result: {qualitative summary}
- Why: {what drove the result; which initiatives carried the load}
- What changed during the cycle: {scope shifts, market changes, team changes, dependency shifts}
- What the score does and does not mean:
  - Does mean: {1 to 2 statements}
  - Does NOT mean: {1 to 2 statements that prevent over-reading}

## Evidence Quality

> For each significant evidence issue, name the issue, its impact on the score, and a recommended fix for next cycle. Do not paper over weak evidence with precise numbers.

- Issue 1: {description}
  - Impact: {how this affects the score's reliability}
  - Recommended fix: {next-cycle measurement change}

- Issue 2: {as above}

## Initiative Review

> For each initiative the team ran, name which KR it was expected to move, whether it shipped, what its apparent contribution was, and whether the evidence supports continuing, retiring, or reworking it. Separate ship-status from KR-impact.

- Initiative 1: {name}
  - Linked to: {KR1, KR2, etc.}
  - Status: {shipped on time | shipped late | partially shipped | not shipped}
  - Apparent contribution: {high | medium | low | unclear}
  - Recommendation: {continue | retire | rework with sharper hypothesis}

- Initiative 2: {as above}

## Learning

> Distinguish customer or product learnings (carry forward to next cycle), team-process learnings (hand to retrospective), and measurement learnings (hand to instrumentation or dashboard skills).

- Validated assumptions: {list}
- Invalidated assumptions: {list}
- Surprises: {findings the team did not anticipate}
- Decision implications: {what the team should do differently next cycle}

## Next-cycle Recommendations

> Numbered list. Each recommendation either drives next-cycle OKR drafting or hands off to a specific downstream skill. The grader's job is to set up the next cycle, not to write its OKRs.

1. {recommendation}
2. {recommendation}
3. {recommendation}
4. Hand-off:
   - `/lessons-log` for {what learning needs organizational memory}
   - `/retrospective` for {what team-process work needs reflection}
   - `/hypothesis` for {what assumption needs an explicit test}
   - `/instrumentation-spec` or `/dashboard-requirements` for {what measurement gap needs filling}
   - `/okr-writer` for {next-cycle drafting note}

## Risks in Interpretation

> Make explicit any places the score could mislead a reader. The grader's job is to protect the integrity of the OKR operating system, not to manufacture certainty.

- {risk 1}
- {risk 2}

## Source of Truth

{URL or path to the live OKR tracker; this artifact is a review document, not the canonical record}
