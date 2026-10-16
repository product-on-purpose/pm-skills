---
artifact: problem-statement
version: "1.0"
created: 2026-01-14
status: complete
context: E-commerce company experiencing high checkout abandonment on mobile
---

# Problem Statement: Mobile Checkout Abandonment

## Problem Summary

Mobile shoppers on our e-commerce platform abandon their carts at checkout at significantly higher rates than desktop users. Despite having items in their cart and reaching the checkout page, 73% [fictional] of mobile users leave without completing their purchase, representing a substantial revenue opportunity and a frustrating experience for customers who intended to buy.

## User Impact

### Who is affected?

Mobile shoppers who add items to their cart and initiate checkout. This segment represents 62% [fictional] of our total traffic and skews toward younger demographics (18-34) who prefer shopping on their phones [fictional].

### How are they affected?

Users report frustration with:
- Small form fields that are difficult to complete on mobile keyboards [fictional]
- Having to re-enter payment information each session [fictional]
- Confusion about shipping costs that appear late in the flow [fictional]
- Slow page loads between checkout steps causing timeouts [fictional]
- Difficulty applying promo codes on the mobile interface [fictional]

### Scale of impact

- 2.3 million mobile checkout sessions per month [fictional]
- 73% [fictional] abandonment rate (vs. 45% [fictional] on desktop)
- Approximately 1.68 million abandoned checkouts monthly [fictional]
- Average cart value of abandoned sessions: $67 [fictional]

## Business Context

### Strategic Alignment

Mobile-first commerce is a key pillar of our 2026 strategy [fictional]. The executive team has committed to achieving mobile revenue parity with desktop by Q4 [fictional]. Reducing mobile checkout friction directly supports OKR 2.1: "Increase mobile conversion rate by 25% [fictional]."

### Business Impact

- Potential monthly revenue recovery: $14.8M [fictional] (assuming 20% [fictional] of abandoned carts convert)
- Estimated annual impact: $177M [fictional] revenue opportunity
- Secondary impact: Higher mobile conversion improves CAC payback for mobile ad spend [fictional]
- Customer lifetime value: Mobile-acquired customers have 23% [fictional] higher repeat purchase rate

### Why Now?

- Q4 holiday season approaching with 40% [fictional] of annual mobile traffic
- Competitor launched one-tap checkout in September, creating pressure [fictional]
- New payment provider integration enables Apple Pay/Google Pay [fictional]
- Mobile traffic growing 8% [fictional] MoM while desktop is flat [fictional]

## Success Criteria

| Metric | Current Baseline | Target | Timeline |
|--------|-----------------|--------|----------|
| Mobile checkout abandonment rate | 73% [fictional] | 60% | Q1 2026 |
| Mobile conversion rate | 1.8% [fictional] | 2.3% | Q1 2026 |
| Checkout completion time (mobile) | 4.2 min [fictional] | 2.5 min | Q1 2026 |
| Mobile revenue as % of total | 38% [fictional] | 45% | Q2 2026 |
| Customer satisfaction (checkout NPS) | 32 [fictional] | 50 | Q1 2026 |

## Constraints & Considerations

- Payment provider contract limits changes to payment form UI until March [fictional]
- Must maintain PCI compliance for any checkout modifications
- iOS and Android apps share checkout webview - changes affect both platforms [fictional]
- Engineering capacity: 2 engineers available, 6-week runway before feature freeze [fictional]
- Cannot remove guest checkout option (legal requirement in EU markets [fictional])
- Must preserve existing promo code functionality for marketing campaigns

## Open Questions

- [ ] What percentage of abandoners return later on desktop to complete purchase?
- [ ] Are there specific points in the checkout flow where drop-off spikes?
- [ ] How do abandonment rates vary by product category or cart value?
- [ ] What do competitors' mobile checkout flows look like?
- [ ] Would users prefer saved payment methods vs. digital wallet integration?
- [ ] Is shipping cost surprise a larger factor than form friction?
