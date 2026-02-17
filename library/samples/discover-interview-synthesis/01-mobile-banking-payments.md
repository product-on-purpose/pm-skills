---
artifact: interview-synthesis
version: "1.0"
created: 2026-01-28
status: complete
context: Digital bank researching peer-to-peer payment experience for millennial and Gen Z users
---

# Interview Synthesis: Peer-to-Peer Payment Experience

## Research Overview

### Objective

Understand why peer-to-peer (P2P) payment adoption within our banking app is at 12% despite 68% of users reporting they use P2P payments weekly through other apps. Identify what would make users switch their P2P behavior to our platform.

### Methodology

- **Format:** Video calls via Zoom (4), in-person at branch locations (2)
- **Duration:** 40 minutes average
- **Interviewer(s):** Rachel Torres (Product), David Kim (UX Research)
- **Date Range:** January 14 to January 24, 2026

### Participant Summary

| ID | Role/Segment | Tenure | Interview Date | Notes |
|----|--------------|--------|----------------|-------|
| P1 | College student, 21 | Customer 8 months | Jan 14 | Heavy Venmo user, splits rent with roommates |
| P2 | Freelance designer, 28 | Customer 2 years | Jan 16 | Uses Zelle for client payments |
| P3 | Restaurant server, 24 | Customer 6 months | Jan 18 | Receives tips via Cash App |
| P4 | Marketing manager, 32 | Customer 3 years | Jan 20 | Uses Venmo socially, Zelle for larger amounts |
| P5 | Software engineer, 27 | Customer 1 year | Customer since beta | Jan 22 | Uses Apple Pay for everything possible |
| P6 | Teacher, 30 | Customer 4 months | Jan 24 | Collects money from parents for class events |

## Key Themes

### Theme 1: Social Context Drives Platform Choice

**Prevalence:** 6 of 6 participants

**Summary:** Every participant chose their P2P platform based on what their social circle uses, not features. The decision is network-driven, not product-driven. Users described feeling locked into Venmo or Cash App because switching would require convincing friends to change — a social cost they're unwilling to pay for marginal functional improvements.

**Evidence:**
- P1: "All my roommates use Venmo. If I sent them a request from a different app, they'd just ignore it. It's not even a choice — it's where everyone already is."
- P4: "I use Venmo because my friends use Venmo. If they all switched to your app tomorrow, I'd switch too. The app itself doesn't matter that much."
- P6: "I tried to collect field trip money through our bank's app once. Three parents asked me to just use Venmo instead. I gave up."

### Theme 2: Trust Asymmetry Between Banks and Fintech

**Prevalence:** 5 of 6 participants

**Summary:** Users trust their bank more with large transfers but trust fintech apps more for small, frequent payments. This isn't about security — it's about perceived speed and simplicity. Bank payments feel "serious" and "slow" while Venmo and Cash App feel "instant" and "casual." Users segment their own behavior: Venmo for splitting dinner, bank for rent or large transfers.

**Evidence:**
- P2: "I'd never send a $3,000 client payment through Venmo. That goes through Zelle or my bank. But for $20? The bank app feels like using a sledgehammer to hang a picture frame."
- P3: "Cash App money feels like play money almost. It shows up instantly and I can spend it right there. Bank transfers feel like they go into a vault somewhere."
- P5: "I trust my bank with my savings. I trust Venmo to split a bar tab. Different tools for different jobs."

### Theme 3: Payment Requests Are the Core Use Case

**Prevalence:** 5 of 6 participants

**Summary:** Requesting money — not sending it — is the primary P2P interaction for most users. Splitting bills, collecting group expenses, and requesting reimbursements drive more engagement than proactive sending. The quality of the request experience (ease of splitting, reminder nudges, group functionality) determines which app users choose.

**Evidence:**
- P1: "I probably request money 10 times for every 1 time I send it. Splitting rent, groceries, Uber rides — it's all requests."
- P4: "The best thing about Venmo is I can request $14.50 from six people for pizza and they all get a notification. If your app can't do that, I'm not interested."
- P6: "I need to send a request to 22 parents, track who's paid, and send reminders to who hasn't. That's my whole use case."

### Theme 4: Instant Visibility Matters More Than Instant Settlement

**Prevalence:** 4 of 6 participants

**Summary:** Users care less about when money actually settles in their bank account and more about the immediate confirmation that a payment was sent or received. Venmo's social feed and instant notification provide psychological closure even though actual bank settlement takes 1-3 days. Our app's more accurate but less responsive confirmation feels slower even when settlement time is identical.

**Evidence:**
- P3: "When someone tips me on Cash App, I see it pop up immediately with confetti. When a bank transfer comes through, I get a boring notification 10 minutes later. The money arrives at the same time but Cash App feels instant."
- P5: "Venmo shows me the payment in the feed before it even clears. I know it's coming. With bank transfers, I'm checking my balance wondering if it went through."

## Notable Quotes

> "All my roommates use Venmo. If I sent them a request from a different app, they'd just ignore it."
> — P1, college student, heavy P2P user

> "The bank app feels like using a sledgehammer to hang a picture frame."
> — P2, freelance designer, on using bank apps for small payments

> "I need to send a request to 22 parents, track who's paid, and send reminders to who hasn't. That's my whole use case."
> — P6, teacher, on group payment collection

> "Cash App money feels like play money almost. It shows up instantly and I can spend it right there. Bank transfers feel like they go into a vault."
> — P3, restaurant server, on trust asymmetry

> "If your P2P doesn't have a social feed, it feels like sending money into a void. I want to see that my friend got it and maybe they wrote a funny emoji."
> — P1, on why social context matters

> "Venmo for tacos, Zelle for rent. That's just how it works."
> — P4, marketing manager, on use case segmentation

## Insights

### Insight 1: P2P payments are a social product, not a financial product

Users don't evaluate P2P payments on transaction speed, fees, or security — they evaluate them on social friction. The biggest barrier to adoption isn't our product's functionality; it's that switching requires coordinating behavior change across a social network. This means we can't win users one at a time with a better feature set. We need strategies that move groups of users together, or we need to interoperate with existing networks rather than competing against them.

**Implication:** Instead of building a "better Venmo," explore interoperability (accepting Venmo requests within our app) or focus on use cases where our bank relationship creates unique advantage (instant-settle large payments, earned wage access, bill-split that auto-pays from checking).

### Insight 2: Banks have permission to own "serious money" but not "casual money"

Users have already mentally segmented their financial lives. Banks own the "responsible" category: savings, rent, large transfers. Fintech apps own the "casual" category: splitting bills, small debts, social payments. Trying to make our bank app feel as casual as Venmo would feel incongruent and could undermine the trust that makes users keep their serious money with us. Instead, we should lean into our strength and own the moments where bank-grade trust actually matters in P2P.

**Implication:** Position our P2P for high-value use cases: rent splitting with automatic recurring payments, freelancer invoicing with instant settlement, and group savings goals. Don't try to compete on the $8 lunch split — own the $800 rent split.

### Insight 3: The "request and track" workflow is an underserved superpower for banks

Payment requesting — especially group requests with tracking and reminders — is the primary P2P use case, and banks are uniquely positioned to make it powerful. A bank can auto-debit authorized recurring requests (like monthly rent splits), provide payment verification that landlords and administrators trust, and offer receipt-level tracking that fintech apps can't match. The teacher collecting field trip money (P6) and the roommate splitting rent (P1) represent high-frequency, high-frustration use cases where bank infrastructure adds genuine value.

**Implication:** Build a "Request Hub" as our P2P centerpiece — supporting group requests, automatic reminders, recurring request schedules, and payment tracking dashboards. Target use cases like rent collection, group event planning, and small business invoicing where tracking and trust matter.

## Recommendations

| Priority | Recommendation | Related Insight | Confidence |
|----------|---------------|-----------------|------------|
| 1 | Build "Request Hub" with group requests, tracking, and auto-reminders | Insight 3 | High |
| 2 | Launch recurring rent-split with auto-debit authorization | Insights 2, 3 | High |
| 3 | Add instant payment confirmation with rich notifications (amount, sender photo, note) | Theme 4 | Medium |
| 4 | Explore Venmo/Cash App interoperability for incoming requests | Insight 1 | Medium |
| 5 | Create "Group" feature for households/roommates with shared payment history | Insights 1, 3 | Medium |

### Recommendation Details

**1. Build "Request Hub" with Group Requests, Tracking, and Auto-Reminders**

Create a dedicated section for managing payment requests — both sent and received. Support group requests where one user requests from multiple people, with a dashboard showing who has paid and who hasn't. Automatic reminders at 3 days and 7 days for unpaid requests. This targets the teacher (P6), the roommate (P1), and the social organizer (P4) use cases where existing apps provide basic functionality but no tracking.

**Next steps:** Design sprint focused on Request Hub UX; prototype with P6 (teacher use case) as primary design partner; plan beta launch with 200 users who have sent 3+ requests in the past month.

**2. Launch Recurring Rent-Split with Auto-Debit Authorization**

Build on bank-grade infrastructure to offer something fintech can't: authorized automatic recurring payments between users. A roommate group sets up a monthly rent split, each member authorizes auto-debit from their checking account, and the designated collector receives funds automatically on the 1st. This leverages bank trust (Insight 2) and the request workflow (Insight 3) in a high-value, sticky use case.

**Next steps:** Legal review of auto-debit authorization requirements; technical feasibility assessment for recurring P2P; partner with 3 property management companies to validate landlord interest.

**3. Add Instant Payment Confirmation with Rich Notifications**

Address the "visibility gap" (Theme 4) by redesigning payment notifications. When a payment is sent or received, deliver an immediate rich notification with sender photo, amount, note, and confirmation animation. Show pending payments in-app with real-time status. Make the experience feel as responsive as Venmo without sacrificing the trust signals of a bank.

**Next steps:** A/B test rich notifications vs. current text-only notifications; measure impact on perceived speed satisfaction; collaborate with design team on confirmation animation that feels celebratory but bank-appropriate.

## Appendix

### Methodology Notes

Participants were recruited from active banking customers who had not used our P2P feature in the past 90 days despite meeting the activation criteria (linked debit card, verified identity). We screened for regular P2P usage on competing platforms (3+ transactions/month). The mix intentionally included different P2P platforms (Venmo: 3, Cash App: 2, Zelle: 3, Apple Pay: 1 — some use multiple) and different primary use cases (social splitting, business payments, group collection).

### Limitations

- All participants are existing bank customers — non-customers may have different perceptions of bank P2P
- Skewed toward younger demographics (21-32); older users may have different social dynamics around P2P
- Self-reported behavior may differ from actual — recommend supplementing with transaction data analysis
- Did not include users who have tried and abandoned our P2P feature (a key missing segment)
- Geographic concentration in urban areas — suburban and rural P2P usage patterns may differ

### Raw Notes

Detailed interview transcripts and recordings stored in Dovetail: [Research Repository / 2026-Q1 / P2P Payment Study]
