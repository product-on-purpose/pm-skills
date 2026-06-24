<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# Example: Build Risk Review (feature-change mode)

A worked case showing the full artifact. The scenario is a B2B ecommerce platform whose sales team is pushing to build single sign-on (SSO) after two enterprise prospects raised it. All merchant and deal specifics are `[fictional]`.

---

## Scenario

> The input the skill received.

"Two enterprise prospects asked about SSO in the last month, and Sales says we'll lose them without it. They want me to put SSO on next sprint. We're a 140-merchant B2B catalog platform; most of our paying accounts are mid-market. Should we build SSO now?"

## Prompt

"Run a build risk review on this SSO request before I commit a sprint."

---

# Build Risk Review: SSO for enterprise merchant accounts

**Mode:** Feature-change  |  **Date:** 2026-06-22

## Verdict

**Validate first.** SSO is a plausible enterprise requirement, but the current signal is two prospects raising it in calls, not a confirmed deal-blocker. Committing a sprint now would build on an L2 signal and pull capacity from the activation work that the data says actually moves retention.

## Biggest risk

- **R1 `feature-fit`:** the request is being read as an L4 deal-blocker when the evidence only supports L2 (repeated asks, no behavior proof). Neither prospect has put "no SSO = no deal" in writing, and no current paying merchant has churned over its absence. Building on that is the feature-treadmill trap: it feels urgent because Sales is loud, not because the data says it changes who pays.
- **R2 `distribution`:** even if built, SSO does not by itself reach more enterprise buyers; the constraint upstream is a thin enterprise pipeline `[fictional: 2 active prospects]`, which a feature does not fix.
- **R3 `trust`:** SSO is a trust-tier feature (identity, provisioning), so a thin first version that mishandles SCIM or de-provisioning would do more reputational harm than not having it, raising the real cost above the sprint estimate.

## Demand level

**L2 - repeated asks, no behavior proof.** Two prospects mentioned SSO in sales calls `[fictional]`. That is more than one ask (above L1) but neither has made it a contractual go/no-go, and zero of 140 paying merchants `[fictional]` have raised or churned over it. It is not yet an L3 workflow blocker (merchants complete the core catalog job today without SSO) or an L4 revenue blocker (no signed dependency).

## Evidence ledger

| Signal | Strength | What it does or does not prove |
|---|---|---|
| Two enterprise prospects raised SSO in calls `[fictional]` | medium | real interest from the target segment; not a commitment |
| Sales says "we'll lose them without it" | weak | a forecast, not a written requirement; Sales is incentivized to unblock deals with product |
| "Enterprise buyers expect SSO" (category articles) | weak | a category norm, not proof for these two deals |
| 0 of 140 paying merchants cite SSO `[fictional]` | counter-signal | no retention or activation pressure from the existing base |
| Activation A/B in flight shows onboarding checklist lifts week-2 retention `[fictional]` | strong (for the alternative) | the capacity SSO would consume has a measured return elsewhere |

## Validation plan

1. **Make the deal dependency real.** Ask both prospects to confirm in writing that SSO is a go/no-go requirement with a target date. Pass bar: at least one returns a signed contingency. If neither does, the L4 framing is false and this drops to Defer.
2. **Price the trust tier.** Time-box a half-day spike on the SCIM / de-provisioning surface to replace the sprint estimate with a real one; a trust-tier feature is rarely a one-sprint build.
3. **Hold the line on activation.** Do not pause the in-flight activation A/B; it has a measured retention return that the SSO request does not.

## Routing

-> `define-hypothesis` to frame "SSO unblocks >= $X enterprise ARR this quarter" as a testable claim with a metric and a date, then `define-prioritization-framework` to rank it against the activation work once the spike gives a real cost. If a signed contingency comes back, re-run this review; a confirmed L4 flips the verdict to Build small and routes to `define-problem-statement` -> `deliver-prd`.

## Sources

- All merchant counts, prospect details, and experiment results are `[fictional]` and illustrative.
- Demand-level and evidence-strength definitions: `references/risk-taxonomy.md`.

---

## Why not the other verdicts

> Included here for teaching; a real artifact does not need this section.

- **Build small** would be right at L3/L4 - if a prospect signs an SSO contingency, or a paying merchant churns over it. Today neither is true.
- **Don't build yet** would be too strong: the segment interest is real and SSO is a normal enterprise requirement, so the wedge is not wrong, only unproven.
- **Pivot first** does not apply: nothing here questions the product's direction, only the timing of one feature.
