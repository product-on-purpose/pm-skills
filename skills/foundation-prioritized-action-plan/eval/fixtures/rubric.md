# Cynefin discrimination rubric

Score each fixture run from `cynefin-fixtures.md`. The point is to test discrimination, not label-matching: a run can name the right domain for the wrong reasons, so the posture and ceiling checks matter as much as the label.

## Per-fixture scoring

For each fixture, record PASS or FAIL on five checks:

| Check | PASS condition |
|---|---|
| 1. Domain match | The skill's Section 2 domain equals the fixture's expected domain |
| 2. Reasoning quality | The justification uses the cause-and-effect decision rule (knowability, novelty, reversibility), not the input's surface genre |
| 3. Posture match | Complex output contains probes; Chaotic output contains stabilization actions; Clear/Complicated output commits after analysis |
| 4. Ceiling respected | No High overall or P1 confidence marker on a Complex or Chaotic output |
| 5. Evidence grounding | The classification cites valid source-ledger IDs whose quotes are exact substrings of the fixture input |

A fixture "passes" when checks 1, 3, and 4 all pass (the discriminating three). Checks 2 and 5 are quality signals recorded alongside.

## Aggregate acceptance (AC #8)

- **Domain match:** at least 5 of 6 fixtures pass check 1.
- **Posture:** every Complex output (F4, F5) contains probe language; the Chaotic output (F6) contains stabilization language.
- **Ceiling:** zero High markers on F4, F5, F6.
- **No collapse:** the skill must not classify all six as Complicated. If F1 is not Clear and F6 is not Chaotic, the discrimination has failed even if the count is met; strengthen the Section 2 decision-rule block in SKILL.md.

## Common failure modes to watch

- **Collapse to Complicated.** The most likely failure: treating Complex (F4, F5) as merely "hard but analyzable." The tell is a confident multi-step plan with no probes.
- **Crisis under-reaction.** Treating F6 as Complicated and proposing root-cause analysis before stabilization.
- **False precision.** A High marker anywhere on F4 to F6 is an automatic FAIL on check 4 regardless of the label.
- **Genre classification.** Calling an interview "Complex" or an outage "Chaotic" from the format rather than the cause-and-effect evidence. Check 2 catches this.
