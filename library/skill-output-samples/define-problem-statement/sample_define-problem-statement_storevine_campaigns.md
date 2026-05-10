---
title: "Define Problem Statement: Storevine Campaigns"
description: "Storevine B2B ecommerce platform - Campaigns feature problem framing for engineering and design."
artifact: problem-statement
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: storevine
context: Storevine B2B ecommerce platform . Campaigns feature problem framing for engineering and design
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Following Q4 exit survey data that identified email marketing gaps as a top-three churn driver, Storevine's growth PM drafted this problem statement to establish a shared framing with engineering, design, and legal before the competitive analysis and PRD drafting began. The document anchors the Campaigns scope decision in the churn signal and quantifies the platform risk of continuing to rely on merchants self-solving their email needs through third-party tool subscriptions.

**Source Notes:**

- The CAN-SPAM Act (FTC, ftc.gov) and GDPR Article 6 (gdpr.eu) define the compliance floor for commercial email: one-click unsubscribe, physical address disclosure, honest subject lines, and documented consent for EU recipients . establishing Legal as a non-negotiable launch gate for any production email send feature.
- Klaviyo's S-1 filing (SEC EDGAR, September 2023) reported ~130,000 paying ecommerce merchant customers at IPO, confirming that third-party email tool adoption at scale is the baseline condition from which Storevine must compete and that switching costs compound with every month of Klaviyo usage.
- DMA (Data & Marketing Association, dma.org.uk) research on email marketing ROI reports median returns of £42 per £1 spent for retail senders, establishing email as the highest-ROI marketing channel available to ecommerce merchants and contextualizing the churn risk of platform gaps in this capability.

---

## Prompt

```
/problem-statement

Project: Campaigns . native email marketing for Storevine merchants
Stage: Define . establishing shared problem framing before PRD draft

Problem I want to articulate:
- ~68% of active merchants use an external email tool [fictional]
- Storevine's built-in email lacks purchase-based segmentation and
  revenue attribution . the two capabilities merchants cite most
- Q4 exit survey: 22% of churned merchants cited this as a primary
  cancellation reason [fictional]
- Competitive analysis filed last week: Shopify Email has already
  validated the built-in email model; Campaigns is behind

Prior work to integrate:
- Competitive analysis (Feb 2026): feature gap matrix vs. Shopify Email,
  Klaviyo, and Mailchimp; confirmed attribution is the primary v1
  differentiator opportunity
- Q4 exit survey data (internal): 22% churn cited email gaps [fictional]

Need: full problem statement with user impact, business context, success
criteria, constraints, and open questions. Audience: engineering lead,
design, legal, and head of product before PRD review.
```

---

## Output

# Problem Statement: Merchants Require External Email Tools for Capabilities Storevine's Platform Should Provide

## Problem Summary

Active Storevine merchants who run email marketing are forced to subscribe to and maintain a separate third-party tool . primarily Klaviyo or Mailchimp . because Storevine's built-in email features lack purchase-based audience segmentation and revenue attribution. This creates a direct monthly cost, an ongoing tool management burden, and a weakening of the Storevine all-in-one value proposition that manifests as churn: Q4 exit surveys confirmed that 22% [fictional] of merchants who canceled cited "had to use a separate email tool" as a primary reason.

## User Impact

### Who is affected?

Active Storevine merchants who send email marketing to their customer base . or who want to but have not started . represented by merchant owner-operators who are personally responsible for all marketing decisions, technical integrations, and vendor relationships.

### How are they affected?

Merchants who use external email tools maintain a separate platform subscription ($20 - $200/month depending on list size [fictional]), configure and maintain an API data sync between Storevine and their email tool, rebuild customer and order data as segment definitions inside the email platform, and manage support relationships with two separate vendors when either platform changes. Merchants who want to start email marketing but find external tools too complex to set up either abandon the attempt or post on social media instead . forgoing email's re-engagement revenue entirely.

### Scale of impact

Approximately 68% [fictional] of active merchants (~12,240 of ~18,000 [fictional]) currently use an external email tool. The problem affects not only active external tool users but also an estimated 38% [fictional] of merchants who have no email program at all because external tools feel too complex to set up without dedicated marketing staff. These two populations together represent the full addressable scope of the Campaigns opportunity.

## Business Context

### Strategic Alignment

Storevine's value proposition is "everything you need to run your online store in one place." Forcing merchants to leave the platform for one of the highest-ROI marketing channels . email . is a direct contradiction of that promise. The all-in-one strategy requires that Campaigns become a genuine replacement for Klaviyo and Mailchimp for the majority of the merchant base, not a supplementary tool that layers on top of an already-complex stack.

### Business Impact

Email-related churn represents an estimated 4.8 percentage points [fictional] of Storevine's 22% [fictional] annual churn rate, based on Q4 exit survey data. Recapturing this cohort reduces the annual rate to approximately 17.2% [fictional] before any other retention initiative. At an average merchant lifetime value of $3,200 [fictional] per retained account, each percentage-point reduction in annual churn represents approximately $576,000 [fictional] in retained annual revenue across the ~18,000 active merchant base.

### Why Now?

Q4 2025 churn data surfaced email gaps as a top-three cancellation driver for the first time [fictional]. The competitive analysis confirms that Shopify Email . Campaigns' most directly comparable built-in product . has already validated the model and is expanding rapidly (automation flows, Shopify Audiences integration). Every quarter without a native Campaigns feature is a quarter in which the Klaviyo dependency deepens for merchants who adopt it: switching costs compound with each new automation flow built, and the window for activating merchants before they commit to external tools closes with each new merchant cohort.

## Success Criteria

| Metric | Current Baseline | Target | Timeline |
|--------|-----------------|--------|----------|
| % of active merchants using external email tool | 68% [fictional] | 50% [fictional] | Q4 2026 |
| Email-related annual churn contribution | 4.8 pp [fictional] | 2.4 pp [fictional] | Q4 2026 |
| First campaign send rate (new merchant cohort, 60 days post-GA) | 12% [fictional] | 30% [fictional] | 60 days post-GA |
| Platform NPS sub-score: email capabilities | 24 [fictional] | 40 [fictional] | Q3 2026 |

## Constraints & Considerations

- CAN-SPAM and GDPR compliance are non-negotiable legal requirements for any production email send capability. Legal review of the compliance architecture must complete before Campaigns is enabled for any merchant, regardless of GA timeline pressure.
- Campaigns v1 must not deprecate or disrupt the existing Klaviyo-Storevine API integration. Merchants who choose to continue using Klaviyo alongside Campaigns must be able to do so without data conflicts or degraded integration performance.
- Engineering capacity is fixed at two product squads through Q2 2026 [fictional]. All v1 scope decisions must fit within this constraint; features requiring a third squad must be deferred to v2 or a follow-on sprint.
- Revenue attribution requires a confirmed SendGrid open/click webhook integration with the Storevine order database. The Engineering Lead has confirmed technical feasibility; this integration is not yet scheduled and must be prioritized in sprint planning before backend scope is locked.
- The GDPR consent architecture for EU merchants may require a separate consent data model. If this path is not complete by GA, a US-first launch with EU merchant access as a v1.1 follow-on is the preferred contingency to avoid delaying US GA.

## Open Questions

- [ ] Does the Klaviyo-integrated merchant segment churn at a higher or lower rate than the non-adopter segment? If Klaviyo users are higher-retention despite maintaining two tool subscriptions, the problem statement priority may shift toward activating non-adopters rather than substituting for Klaviyo users.
- [ ] Is there a free-tier pricing threshold below which Campaigns must sit to activate non-adopters without requiring an explicit upgrade decision? The competitive analysis shows Shopify Email set the expectation of a free entry tier; understanding non-adopter price sensitivity is needed before pricing is finalized.
- [ ] What is the actual external tool spend for a median Storevine merchant? Quantifying the monthly cost of Klaviyo or Mailchimp plus any integration management overhead would sharpen the platform value messaging and inform whether Campaigns should be positioned on cost savings at GA.
