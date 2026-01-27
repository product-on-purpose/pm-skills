---
artifact: problem-statement
version: "1.0"
created: 2026-01-14
status: complete
context: E-commerce company experiencing high checkout abandonment on mobile
---

# Problem Statement: Mobile Checkout Abandonment

## Problem Summary

Mobile shoppers on our e-commerce platform abandon their carts at checkout at significantly higher rates than desktop users. Despite having items in their cart and reaching the checkout page, 73% of mobile users leave without completing their purchase, representing a substantial revenue opportunity and a frustrating experience for customers who intended to buy.

## User Impact

### Who is affected?

Mobile shoppers who add items to their cart and initiate checkout. This segment represents 62% of our total traffic and skews toward younger demographics (18-34) who prefer shopping on their phones.

### How are they affected?

Users report frustration with:
- Small form fields that are difficult to complete on mobile keyboards
- Having to re-enter payment information each session
- Confusion about shipping costs that appear late in the flow
- Slow page loads between checkout steps causing timeouts
- Difficulty applying promo codes on the mobile interface

### Scale of impact

- 2.3 million mobile checkout sessions per month
- 73% abandonment rate (vs. 45% on desktop)
- Approximately 1.68 million abandoned checkouts monthly
- Average cart value of abandoned sessions: $67

## Business Context

### Strategic Alignment

Mobile-first commerce is a key pillar of our 2026 strategy. The executive team has committed to achieving mobile revenue parity with desktop by Q4. Reducing mobile checkout friction directly supports OKR 2.1: "Increase mobile conversion rate by 25%."

### Business Impact

- Potential monthly revenue recovery: $14.8M (assuming 20% of abandoned carts convert)
- Estimated annual impact: $177M revenue opportunity
- Secondary impact: Higher mobile conversion improves CAC payback for mobile ad spend
- Customer lifetime value: Mobile-acquired customers have 23% higher repeat purchase rate

### Why Now?

- Q4 holiday season approaching with 40% of annual mobile traffic
- Competitor launched one-tap checkout in September, creating pressure
- New payment provider integration enables Apple Pay/Google Pay
- Mobile traffic growing 8% MoM while desktop is flat

## Success Criteria

| Metric | Current Baseline | Target | Timeline |
|--------|-----------------|--------|----------|
| Mobile checkout abandonment rate | 73% | 60% | Q1 2026 |
| Mobile conversion rate | 1.8% | 2.3% | Q1 2026 |
| Checkout completion time (mobile) | 4.2 min | 2.5 min | Q1 2026 |
| Mobile revenue as % of total | 38% | 45% | Q2 2026 |
| Customer satisfaction (checkout NPS) | 32 | 50 | Q1 2026 |

## Constraints & Considerations

- Payment provider contract limits changes to payment form UI until March
- Must maintain PCI compliance for any checkout modifications
- iOS and Android apps share checkout webview — changes affect both platforms
- Engineering capacity: 2 engineers available, 6-week runway before feature freeze
- Cannot remove guest checkout option (legal requirement in EU markets)
- Must preserve existing promo code functionality for marketing campaigns

## Open Questions

- [ ] What percentage of abandoners return later on desktop to complete purchase?
- [ ] Are there specific points in the checkout flow where drop-off spikes?
- [ ] How do abandonment rates vary by product category or cart value?
- [ ] What do competitors' mobile checkout flows look like?
- [ ] Would users prefer saved payment methods vs. digital wallet integration?
- [ ] Is shipping cost surprise a larger factor than form friction?
