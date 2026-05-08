---
title: "Deliver Release Notes: Storevine Campaigns"
description: "Storevine B2B ecommerce platform - Campaigns v1.0 GA merchant-facing release notes."
artifact: release-notes
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: storevine
context: Storevine B2B ecommerce platform . Campaigns v1.0 GA merchant-facing release notes
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

As Campaigns approaches its April 28, 2026 GA, Storevine's growth PM worked with the Merchant Success team to draft the merchant-facing release notes. The copy leads with merchant benefit . replacing the tool-fragmentation pattern with a single built-in tool . and surfaces the three capabilities merchants cited as missing in discovery interviews: purchase-based segmentation, revenue attribution, and a first-send experience that does not require setup expertise.

**Source Notes:**

- DMA (Data & Marketing Association, dma.org.uk) research on email marketing ROI documents median returns of £42 per £1 spent for retail senders, providing the strategic context that makes email marketing the capability gap worth naming explicitly in the release announcement rather than describing it as a minor addition.
- CAN-SPAM Act (FTC, ftc.gov) and GDPR Article 6 (gdpr.eu) . the legal requirements that make compliance handling a named feature in the release notes rather than an assumed default; merchants who have avoided email marketing due to compliance uncertainty need explicit reassurance that the platform handles this automatically.
- Shopify's FY2023 Annual Report describes Shopify Email's free monthly send tier as a key merchant adoption lever, establishing the pricing expectation that Campaigns' release notes must address to set correct expectations for merchants evaluating both platforms.

---

## Prompt

```
/release-notes

Product: Storevine
Release: Campaigns v1.0 . native email marketing, GA on Apr 28, 2026
Audience: All active Storevine merchants

What's new:
- Campaigns: native email marketing, built into the Storevine admin
- Purchase-based audience segments (pre-built, seeded from Storevine data)
- Guided first-campaign flow (product-seeded templates, no setup required)
- Revenue attribution (see which emails drove which purchases)
- Abandoned cart automation (pre-configured, activates in one click)
- CAN-SPAM/GDPR compliance automatic in every send

Known issues / limitations to document:
- A/B testing not in v1 (coming in v2)
- EU merchant access delayed (GDPR consent flow in v1.1)
- Klaviyo migration tooling not available (planned v2)

Tone: merchant-benefit-first; plain language; not feature-spec language.
Audience is small-business owners, not developers.
```

---

## Output

# Storevine Campaigns v1.0

**Release Date:** April 28, 2026

## Highlights

### Email Marketing Built Into Storevine . No Separate Tool Required

Campaigns is here. For the first time, you can send targeted email campaigns to your customers directly from the Storevine admin . using your existing customer and order data, with no API keys, no data sync, and no separate subscription. Your customer list and purchase history are already there; Campaigns just gives you a way to use them.

### See Which Emails Actually Drove Sales

Campaigns includes revenue attribution out of the box. Every campaign you send shows you the revenue generated within 7 days . so you can see at a glance whether your "Back in stock" campaign drove actual purchases, not just opens. This is the feature most requested in merchant feedback over the past year, and it ships in v1.0.

---

## New Features

- **Purchase-based audience segments:** Four pre-built segments . Recent customers (last 90 days), First-time buyers, Lapsed customers (no purchase in 6+ months), and VIP customers (5+ orders) . are available immediately at account activation. No export, no filter setup, no CSV import required.

- **Guided first-campaign flow:** If you've never sent a campaign before, Campaigns opens with a ready-to-send template pre-filled with your top products and addressed to your recent customers. Most merchants can send their first campaign in under 15 minutes from first open.

- **Revenue attribution:** Every sent campaign includes a 7-day attribution window showing how many purchases and how much revenue your email recipients generated after opening or clicking. See your results in the Campaigns dashboard.

- **Abandoned cart automation:** Turn on a pre-configured abandoned cart email . sent automatically to customers who add products to their cart but don't check out within 4 hours. No flow-building required; activate in one click from the Automations tab.

- **CAN-SPAM and GDPR compliance, automatic:** Every campaign includes a compliant unsubscribe link, your business address, and honest subject line enforcement. Compliance requirements are handled by Storevine . you don't need to configure anything.

## Improvements

- **Storevine admin navigation:** Campaigns is now accessible from the main admin sidebar under Marketing. No additional setup or app install required.

- **Customer data:** Your customer list, purchase history, and product catalog are immediately available inside Campaigns from day one . the same data you already manage in your Storevine account, surfaced where you need it.

## Bug Fixes

No bug fixes in this release. Campaigns v1.0 is a new feature.

## Known Issues

- A/B testing for subject lines and content is not available in Campaigns v1.0. If you'd like to test different subject lines, you can send separate campaigns to separate audience segments as a workaround. A/B testing is planned for v2.
- EU merchant access to Campaigns is currently limited. Merchants with EU customer lists will have access once we complete the GDPR consent data model in an upcoming update (v1.1). US merchant access is fully available today.
- Klaviyo list and automation flow migration is not yet available. If you're currently on Klaviyo and want to switch to Campaigns, your existing Klaviyo subscriber segments and flows cannot be automatically imported in v1.0. Reach out to Merchant Success at support@storevine.com [fictional] for guidance on your migration options.

---

## Coming Soon

We're working on A/B testing for subject lines and content, EU merchant access with full GDPR consent handling, and Klaviyo list migration tooling . so you can bring your existing email history into Campaigns when you're ready to make the switch.

---

## Feedback

Tried Campaigns? We'd love to hear what worked and what didn't. Share your feedback in the Storevine Merchant Community Forum or email us at merchants@storevine.com [fictional].
