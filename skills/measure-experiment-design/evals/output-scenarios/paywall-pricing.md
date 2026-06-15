---
scenario: paywall-pricing
skill: measure-experiment-design
family: measurement
created: 2026-06-15
---

# Scenario: pricing-paywall experiment with a sample-size and guardrail trap

This is the INPUT brief for an output-quality eval. The skill arm and the control arm each receive
everything below (and nothing else about how to do the work) and produce an experiment design for it.
Judges never see this header. This scenario is seeded with the traps a strong freehand pass tends to
fall into: a low base-rate primary metric (so the sample size is large and must be derived, not asserted),
real guardrail risks the test could harm, and a tempting secondary metric that invites declaring success
early. The skill should win on showing the sample-size math, naming ONE primary metric, pre-registering
the decision rule, and protecting guardrails; the freehand control tends to skip the sizing derivation,
define success loosely, or let a secondary metric move the goalposts.

## Situation

We run a freemium productivity app. We want to test a new pricing paywall: moving an existing free
feature (advanced filters) behind the Pro plan, with a redesigned upgrade screen. Leadership wants to
know if this lifts paid conversion without hurting the broader funnel.

## What we know

- **Primary business goal:** increase free-to-paid conversion. Current 30-day free-to-paid conversion is
  about **2.0%**. The team is hoping for a lift to ~2.4% (a 0.4 percentage-point absolute lift); anything
  below ~2.2% would not justify the churn risk.
- **Traffic:** ~12,000 new free signups per week enter the funnel and can be randomized.
- **Known risks the change could cause:** users who lose a free feature may churn or leave bad reviews;
  support contacts may spike; some users may downgrade or request refunds after upgrading under pressure.
- **A tempting secondary metric:** clicks on the upgrade screen will almost certainly go up (more people
  hit the paywall), and the team is tempted to read that as success.
- **Operational notes:** the app has a strong weekly usage cycle (weekday-heavy). Finance needs a
  decision in about 6 weeks. There is no prior experiment on this surface to borrow an effect size from.

## What the team wants

A rigorous experiment design: a single, falsifiable primary hypothesis and ONE primary decision metric;
a sample-size estimate with its assumptions (baseline rate, the minimum detectable effect, significance,
power) and the calculation shown - not asserted; a duration derived from sample size and weekly traffic
that respects the weekly cycle; pre-registered win/lose/inconclusive criteria set BEFORE launch; and
guardrail metrics (with a monitoring/rollback plan) that protect against the churn, refund, support, and
review risks. Make reasonable assumptions explicit; do not invent numbers the brief does not support.
