---
artifact: spike-summary
version: "1.0"
created: 2026-01-14
status: complete
context: Evaluating payment processors for new e-commerce platform
---

# Spike Summary: Payment Processor Evaluation

## Overview

| Field | Value |
|-------|-------|
| **Question to Answer** | Should we use Stripe or Adyen for payment processing on our new platform? |
| **Time-Box** | 3 days |
| **Actual Time Spent** | 2.5 days |
| **Spike Lead** | Chen Wei, Senior Backend Engineer |
| **Date Completed** | 2026-01-12 |

## Background

Our new e-commerce platform needs payment processing capabilities. We currently process $2M/month through a legacy system and expect to scale to $10M/month within 18 months. The decision between Stripe and Adyen will affect our transaction costs, integration timeline, and ability to expand internationally.

## Approach

### What We Tried

1. **Stripe Sandbox Integration:** Built a complete checkout flow using Stripe Elements. Created test webhooks and simulated various payment scenarios including 3D Secure, declined cards, and refunds.

2. **Adyen Test Integration:** Implemented Adyen's Drop-in Components in a parallel branch. Tested the same scenarios as Stripe for direct comparison.

3. **Fee Analysis:** Modeled transaction costs at current volume ($2M/month) and projected volume ($10M/month) using published pricing and obtained quotes from both vendors.

4. **International Capability Review:** Researched multi-currency support, local payment methods, and regulatory compliance for our target markets (US, EU, UK, Canada).

### Technologies/Tools Evaluated

- Stripe API v2024-12-18, Stripe Elements, Stripe Webhooks
- Adyen API v68, Drop-in Components, Adyen Webhooks
- Both tested with React 18 frontend, Node.js 20 backend

## Findings

### Finding 1: Stripe has significantly better developer experience

Stripe's documentation is more comprehensive and includes more working examples. The sandbox environment required no setup — we were processing test payments within 15 minutes. Adyen required account manager approval and took 2 days to get sandbox access.

**Evidence:**
- Time to first successful test payment: Stripe (15 min), Adyen (2 days including access wait)
- Documentation score (internal rating): Stripe 9/10, Adyen 6/10
- Stack Overflow questions with accepted answers: Stripe (47,000+), Adyen (3,200)

### Finding 2: Adyen has lower fees at scale

At our projected $10M/month volume, Adyen's interchange++ pricing results in meaningful savings. However, at current volume, the difference is marginal.

**Evidence:**
- Current volume ($2M/month): Stripe $58K/year, Adyen $54K/year (7% savings)
- Projected volume ($10M/month): Stripe $290K/year, Adyen $245K/year (16% savings)
- Stripe's 2.9% + $0.30 vs. Adyen's interchange++ (avg 2.4% + $0.20 at volume)

### Finding 3: Both meet international requirements, but Adyen has edge in Europe

Both processors support our target markets. Adyen has more local payment method integrations in Europe (iDEAL, Bancontact, SEPA Direct Debit) which could improve conversion for EU customers.

**Evidence:**
- Local EU payment methods: Stripe (8), Adyen (15)
- Both support Apple Pay, Google Pay, PayPal
- Both are PCI Level 1 compliant

### Finding 4: Stripe's subscription billing is more mature

If we add subscription products in the future, Stripe Billing is significantly more capable than Adyen's recurring payment features. Adyen would require a third-party subscription management tool.

**Evidence:**
- Stripe Billing: Proration, trial periods, usage-based billing, revenue recovery
- Adyen: Basic recurring only, no built-in subscription management

## Recommendation

**Decision:** Proceed with Stripe for MVP, plan migration path to Adyen

### Rationale

Stripe is the right choice for our current stage. The superior developer experience will accelerate our launch timeline by approximately 2-3 weeks. At our current volume, fee differences are minimal ($4K/year). Once we reach $10M/month and validate product-market fit, we should reevaluate migration to Adyen for cost savings.

### If Proceeding

- Use Stripe Elements for checkout (fastest integration)
- Implement webhook handlers for payment lifecycle events
- Estimated integration effort: 2 weeks for full production deployment
- Build payment abstraction layer to facilitate future processor migration

### Migration Trigger

Consider Adyen migration when:
- Monthly transaction volume exceeds $5M consistently for 3 months
- EU revenue exceeds 30% of total (local payment methods become important)
- Fee savings would exceed $50K/year (pays for migration effort)

## Artifacts

| Artifact | Location | Description |
|----------|----------|-------------|
| Stripe POC | /spikes/payment-processor/stripe-poc | Working checkout flow with webhooks |
| Adyen POC | /spikes/payment-processor/adyen-poc | Comparable checkout for benchmarking |
| Fee Model | /spikes/payment-processor/fee-analysis.xlsx | Volume-based fee comparison |
| Architecture Diagram | /spikes/payment-processor/payment-arch.png | Proposed payment system design |

## Open Questions

- [ ] What is the exact timeline for Stripe's pricing negotiation at higher volumes? (Sales said "competitive" but no specifics)
- [ ] How does PSD2 Strong Customer Authentication affect conversion in EU? Need production data.
- [ ] Should we implement payment abstraction from day one or wait until migration is certain?

## Follow-up Items

| Action | Owner | Timeline |
|--------|-------|----------|
| Begin Stripe production integration | Chen Wei | Week of Jan 20 |
| Set up Stripe Radar for fraud prevention | DevOps | Week of Jan 20 |
| Document payment abstraction interface | Chen Wei | Feb 1 |
| Schedule Adyen volume pricing call for Q3 | PM | Q3 2026 |
