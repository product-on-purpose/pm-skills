<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# Risk taxonomy, demand hierarchy, and evidence ladder

The three structures the review runs on. They are the skill's value: a generic prompt does not impose them.

## Risk types

Each type names where a build is most likely to fail, in the library's vocabulary, plus where to route for a deeper look. Tag `R1` (and supporting risks) with one of these.

| Tag | The failure mode | What it looks like | Routes to |
|---|---|---|---|
| `demand` | nobody wants it enough to change behavior | no repeated pull; no urgency over the current workaround | `discover-market-sizing` / `define-hypothesis` |
| `distribution` | you cannot reach the first users | no named channel; "we'll launch and they'll come" | `foundation-lean-canvas` (Channels block) |
| `positioning` | the wedge is too broad, crowded, or generic | "for everyone"; indistinct from incumbents | `discover-competitive-analysis` |
| `monetization` | the buyer or payment model does not fit | subscription for a low-frequency utility; buyer is not the user | `foundation-lean-canvas` (Revenue block) |
| `retention` | users do it once and do not return | a one-time utility framed as ongoing | `measure-experiment-design` |
| `trust` | users will not connect data, accounts, or money | privacy, security, or migration friction | `define-problem-statement` |
| `feature-fit` | the change does not move usage, payment, or retention | scope creep, feature treadmill, competitor-copy, one user asked | `define-prioritization-framework` |

## Demand hierarchy (feature-change mode)

Place a feature request on the ladder. Build-now is usually justified only at L3 or L4; below that, validate or defer.

- **L0 - founder anxiety.** "Competitors have it" or "it feels incomplete." No user signal.
- **L1 - one ask.** A single user requested it; no proof it affects usage, payment, or retention.
- **L2 - repeated asks.** Several target users ask, but there is no behavior proof yet.
- **L3 - workflow blocker.** Users cannot complete the core job without it.
- **L4 - revenue or retention blocker.** Users refuse to pay, churn, or fail activation because it is missing.

## Evidence strength ladder

Grade every entry in the evidence ledger. Do not let weak signal carry a verdict.

- **Weak (not demand):** likes, compliments, waitlist signups, survey "would use", market-size numbers.
- **Medium:** repeated unsolicited requests, competitor traction in the exact wedge, a manual workaround users maintain.
- **Strong:** real files or data handed over, booked calls, a preorder or deposit, repeated manual use, switching away from an existing paid alternative.

The verdict should track the strongest honest signal, not the most dramatic-sounding risk.
