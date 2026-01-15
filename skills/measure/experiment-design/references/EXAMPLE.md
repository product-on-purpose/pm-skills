---
artifact: experiment-design
version: "1.0"
created: 2026-01-14
status: complete
context: E-commerce checkout optimization A/B test
---

# Experiment Design: One-Page Checkout

## Overview

| Field | Value |
|-------|-------|
| **Experiment Name** | checkout-single-page-v1 |
| **Owner** | Maria Santos, Product Manager |
| **Start Date** | January 20, 2026 |
| **End Date** | February 3, 2026 |
| **Status** | Ready |

## Hypothesis

**We believe** replacing our 3-step checkout with a single-page checkout

**for** mobile web users

**will** increase checkout completion rate

**as measured by** checkout conversion rate (orders / checkout starts)

## Background

Mobile checkout abandonment is at 73%, compared to 45% on desktop. User research identified friction points: confusion navigating between steps, anxiety about hidden costs appearing late in the flow, and form field frustration on small screens. A single-page checkout addresses these by showing all information upfront and reducing navigation.

Competitor analysis shows that Amazon, Shopify stores, and Apple use single-page or minimal-step checkouts. Our hypothesis is that reducing cognitive load and providing visibility into the full process will improve conversion.

## Variants

### Control (A)

**Description:** Current 3-step checkout flow

**Details:**
- Step 1: Shipping address entry
- Step 2: Shipping method selection + payment information
- Step 3: Order review and confirmation
- Each step loads a new page
- Progress indicator shows current step

**Screenshot/Mockup:** [designs/checkout-control-v3.png]

### Treatment (B)

**Description:** Single-page checkout with accordion sections

**Details:**
- All sections visible on one page (shipping, payment, review)
- Accordion UI: one section expanded at a time, others collapsed but visible
- Express payment buttons (Apple Pay, Google Pay) at top
- Shipping cost shown immediately based on cart
- Edit any section without losing data

**Screenshot/Mockup:** [designs/checkout-treatment-v2.png]

## Metrics

### Primary Metric

| Metric | Definition | Current Baseline | Minimum Detectable Effect |
|--------|------------|------------------|---------------------------|
| Checkout conversion rate | Orders completed / Checkout sessions started | 27% | 5% relative (1.35 pp absolute) |

### Secondary Metrics

| Metric | Definition | Purpose |
|--------|------------|---------|
| Checkout completion time | Median seconds from checkout start to order | Confirm UX improvement |
| Express payment usage | % of orders via Apple Pay / Google Pay | Track new feature adoption |
| Cart abandonment rate | Carts abandoned before checkout start | Ensure we're not shifting drop-off |

### Guardrail Metrics

| Metric | Definition | Threshold |
|--------|------------|-----------|
| Average order value | Total revenue / Orders | Must not decrease by more than 2% |
| Payment failure rate | Failed payments / Payment attempts | Must not increase by more than 1pp |
| Support tickets (checkout) | CS tickets tagged "checkout" | Must not increase by more than 20% |

## Sample Size & Duration

### Sample Size Calculation

| Parameter | Value |
|-----------|-------|
| **Baseline conversion rate** | 27% |
| **Minimum detectable effect (MDE)** | 5% relative (28.35% target) |
| **Statistical significance (alpha)** | 0.05 (one-tailed) |
| **Statistical power (1-beta)** | 0.80 |
| **Users per variant** | 9,800 |
| **Total users needed** | 19,600 |

Calculation performed using Evan Miller's sample size calculator, assuming one-tailed test (we only ship if treatment is better).

### Duration Estimate

| Parameter | Value |
|-----------|-------|
| **Daily eligible traffic** | 18,000 mobile checkout sessions/day |
| **Traffic allocation** | 80% to experiment (20% holdout for safety) |
| **Users per day in experiment** | 14,400 |
| **Minimum duration** | 2 days to reach sample size |
| **Recommended duration** | 14 days to capture weekly patterns and ensure stability |

We're running for 14 days despite reaching sample size in 2 days to:
- Capture full weekly shopping patterns (weekday vs. weekend)
- Allow time to detect delayed effects on returns/chargebacks
- Ensure novelty effect wears off

## Audience Targeting

### Inclusion Criteria

- Logged-in or guest users
- Mobile web (not native apps — app experiment runs separately)
- Users in US and Canada (payment methods configured)
- Cart value >= $10 (exclude micro-purchases)

### Exclusion Criteria

- Employees (identified by email domain)
- Users enrolled in conflicting experiments (cart-upsell-test, payment-method-test)
- Users who have participated in checkout experiments in past 30 days

### Traffic Allocation

| Variant | Allocation |
|---------|------------|
| Control (A) | 50% |
| Treatment (B) | 50% |

## Success Criteria

### Win (Ship Treatment)

Primary metric (checkout conversion) improves by >= 5% relative with p < 0.05, AND:
- Average order value does not decrease by more than 2%
- Payment failure rate does not increase by more than 1pp
- No critical bugs or UX issues identified

**Action:** Roll out to 100% of mobile web, begin desktop adaptation.

### Loss (Keep Control)

Any of:
- Checkout conversion decreases with p < 0.05
- Any guardrail metric breaches threshold
- Critical UX issues discovered affecting > 1% of users

**Action:** Revert to control, analyze learnings, iterate on design.

### Inconclusive (More Data Needed)

Primary metric change is between -5% and +5% relative and not statistically significant after 14 days.

**Action:** Extend experiment to 21 days if traffic allows. If still inconclusive, treat as neutral and decide based on qualitative factors (user feedback, operational simplicity).

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Apple Pay integration issues | Medium | High | Test extensively in staging; 5% initial ramp with monitoring |
| Page load performance degradation | Low | Medium | Performance budget enforced; lazy-load payment forms |
| Users confused by accordion UX | Low | Medium | Added progress indicators and clear "Continue" buttons |
| Increased payment failures | Low | High | Same payment provider; monitor failure rate hourly |

### Monitoring Plan

- **Real-time dashboard:** Checkout funnel by variant, updated every 5 minutes
- **Alert thresholds:**
  - Payment failure rate > 5% in any 1-hour window
  - Checkout conversion drops > 20% relative to control
  - Error rate > 1% on any checkout action
- **Rollback criteria:** Any alert sustained for 30 minutes triggers automatic rollback
- **Daily check-ins:** Team reviews metrics at 10am daily for first 5 days

## Implementation Notes

- Feature flag: `checkout_single_page_v1` in LaunchDarkly
- Instrumentation: New events `checkout_section_opened`, `checkout_section_completed` for funnel analysis
- Cache invalidation: Clear checkout page cache at experiment start
- Mobile detection: User-Agent parsing; tablet = desktop experience

## References

- [Hypothesis Document: Mobile Checkout Improvement](/docs/hypotheses/mobile-checkout-h1.md)
- [Design Mockups](https://figma.com/checkout-redesign-2026)
- [Previous Experiment: Guest Checkout](results/guest-checkout-q3-2025.md) — 3% lift, informed this design
- [User Research: Checkout Friction Study](/research/checkout-friction-dec-2025.pdf)
