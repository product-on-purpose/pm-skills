<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# Build Risk Review: <one-line subject>

> Authoring notes are in blockquotes; delete them in the final artifact. Fill every non-optional section. Keep it short: a Build Risk Review is a gate, not a report.

**Mode:** <Pre-build | Feature-change>  |  **Date:** <YYYY-MM-DD>

## Verdict

> Exactly one: Build small / Validate first / Pivot first / Don't build yet. Then one sentence of rationale. Do not use "Kill".

**<Verdict>.** <One-line rationale.>

## Biggest risk

> Exactly one primary risk, `R1`, tagged from references/risk-taxonomy.md. Then at most three to five supporting risks. Do not produce a long inventory.

- **R1 <risk-type>:** <the single assumption most likely to make this fail, stated concretely.>
- R2 <risk-type>: <supporting risk.>
- R3 <risk-type>: <supporting risk.>

## Demand level

> Feature-change mode only. Place the request on L0 through L4 and say why. For pre-build mode write "n/a: new idea".

**L<0-4> - <label>.** <Why this level: founder anxiety, one ask, repeated asks, a workflow blocker, or a revenue/retention blocker?>

## Evidence ledger

> What signal actually exists, each graded on the strength ladder (references/risk-taxonomy.md). Be honest: likes, waitlists, and market-size are not demand. Mark counter-signal too.

| Signal | Strength | What it does or does not prove |
|---|---|---|
| <signal> | <weak / medium / strong> | <reading> |

## Validation plan

> Specific, no-code or low-code next actions with a concrete bar. Never "build an MVP" or "do user research".

1. <action with a pass/fail bar.>
2. <action.>

## Routing

> The next skill to run, from references/routing-map.md.

-> <skill> (<why>).

## Sources

> Real, cited facts only. Mark every invented number `[fictional]`.

---

**Output contract:** one artifact; one `R1`; exactly one verdict; one demand level in feature-change mode; a graded evidence ledger; a no-code next step; a named routing target; no code or implementation design.
