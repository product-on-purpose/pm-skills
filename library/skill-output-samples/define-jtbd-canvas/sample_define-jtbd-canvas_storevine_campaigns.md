---
title: "Define JTBD Canvas: Storevine Campaigns"
description: "Storevine B2B ecommerce platform - merchant email and tool-stack job-to-be-done for Campaigns."
artifact: jtbd-canvas
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: storevine
context: Storevine B2B ecommerce platform . merchant email and tool-stack job-to-be-done for Campaigns
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

After completing discovery interviews and a competitive analysis that surfaced setup complexity and data lock-in as the primary reasons merchants use external email tools, Storevine's growth PM is grounding the Campaigns feature scope in the underlying merchant job before locking the PRD with engineering. The canvas reveals that the deeper job is not "send an email" but "grow my repeat customer base without managing another tool" . a framing that has direct implications for v1 feature prioritization and the GA messaging strategy.

**Source Notes:**

- Clayton M. Christensen, Taddy Hall, Karen Dillon, and David S. Duncan, Competing Against Luck (Harper Business, 2016) . foundational JTBD methodology establishing that customers hire products to make progress in specific circumstances, not to acquire features, and that switching behavior reveals the boundaries of the job.
- Shopify App Store (apps.shopify.com) lists 8,000+ third-party integrations across categories including email marketing, shipping, inventory, and analytics, confirming that tool fragmentation is the structural norm for ecommerce merchants on modern commerce platforms.
- Klaviyo's S-1 filing (SEC EDGAR, September 2023) reported ~130,000 paying ecommerce merchant customers at IPO, establishing that external email tool adoption at scale is the baseline condition and that data and workflow lock-in compounds with every month of use.

---

## Prompt

```
/jtbd-canvas

Project: Campaigns . native email marketing for Storevine merchants
Stage: Pre-PRD, grounding feature scope in JTBD framework before
engineering handoff

Job I want to map:
- The core job: merchant owner-operators "hiring" their ecommerce platform
  to run their business without managing a fragmented external tool stack
- Specific circumstance: merchant needs email re-engagement for existing
  customers but every tool they find requires a separate account, API
  setup, and data sync

Research basis:
- 8 merchant interviews (Jan 12–28, 2026) . direct quotes available
- Competitive analysis (Feb 2026): Klaviyo used by ~40% of active
  merchants [fictional]; Mailchimp by ~20% [fictional]
- Q4 exit survey: 22% churn cited "had to use a separate email tool"
  [fictional]

Need: full JTBD canvas with functional, emotional, and social job layers,
competing solutions, hiring criteria, and product implications. Will
inform v1 feature prioritization and GA messaging strategy.
```

---

## Output

# Jobs to be Done Canvas: Run Email Marketing Without Leaving Storevine

## Job Overview

**Job Title:** Re-engage customers via email without adding another tool to manage
**Date:** February 20, 2026
**Author:** Growth PM, Storevine
**Research Basis:** Eight merchant interviews (Jan 12–28, 2026); Q4 exit survey analysis; competitive analysis of email marketing tools (Feb 2026)

---

## Job Performer

**Who:** Small-to-mid-size ecommerce merchant who operates their Storevine store as their primary or sole business . the owner, operator, and marketer all in one person.

**Key Characteristics:**
- Manages all business functions personally: orders, inventory, customer service, product development, and marketing with no dedicated marketing staff
- Technical enough to build and operate a Storevine store; not a developer and not interested in becoming one
- Makes every software purchasing decision unilaterally; evaluates tools on whether they can be set up and used the same week without training or external help

**Not Defined By:**
- Annual revenue . this job applies equally to a $50K/year merchant and a $500K/year merchant operating in the same category
- Product category . the job is consistent across fashion, home goods, food, jewelry, and specialty categories

---

## The Circumstance

**When does this job arise?**

When a merchant realizes that repeat customer revenue is lower than it should be, and that posting on Instagram or running paid ads is not producing the re-engagement they need from customers who have already purchased. The trigger is often seasonal: a quiet January after the Q4 peak, or a pre-summer planning moment when mapping out the promotional calendar.

**Where does this happen?**

In the merchant's own workspace . at a desk, typically outside business hours. This is a planning task, not a real-time operational task; merchants engage with it when they have mental space to think about growth, not while processing orders or handling customer service.

**Frequency:** Recurring . the realization surfaces multiple times per year, most intensely in January and ahead of major promotional seasons (Valentine's Day, Mother's Day, summer).

**Urgency:** Flexible . merchants feel urgency about the outcome (more repeat revenue) but tolerate delay on the tooling decision because the switching risk and setup cost feel high relative to the short-term revenue loss from not acting.

---

## Job Statement

> **"When** I realize my existing customers aren't coming back on their own, **I want to** send them a relevant email about products they'd care about . without switching out of Storevine or setting up another account . **so I can** turn my existing customer base into a repeat-purchase channel without becoming a part-time systems integrator."

---

## Functional Job

**What is the practical task to accomplish?**

Send a targeted email campaign to a defined segment of existing customers . for example, customers who purchased in Q4 but have not returned . with content relevant to their purchase history, and then see whether the email drove additional purchases.

**Definition of "Done":**
- A campaign has been sent to the intended audience with correct formatting and content
- The email arrived in inboxes (not spam) and met all CAN-SPAM/GDPR compliance requirements automatically
- The merchant can see, within the same Storevine admin interface, whether any email recipients made a subsequent purchase and what revenue was generated

**Key Steps in the Job:**
1. Identify which customers to email (segment by purchase date, product category, or time since last purchase)
2. Create or adapt an email template with the right product content and promotional copy
3. Review and schedule or send the campaign with compliance requirements handled by the platform
4. Review performance . open rate, click rate, and whether recipients purchased

**Functional Pains:**
- External email tools require API key configuration and data sync setup before a single email can be sent; for a merchant who has never done this, setup is a multi-hour task before reaching the first template
- Customer and order data lives in Storevine; syncing it to a separate tool introduces delay, data mapping errors, and ongoing maintenance risk every time Storevine data changes
- Managing two separate subscriptions . one for the commerce platform, one for email . creates administrative overhead and a second vendor support relationship

---

## Emotional Job

**How do they want to feel?**

| Desired Feeling | Why It Matters |
|-----------------|----------------|
| Confident | They want to believe the email they sent is professional, will reach inboxes, and will not embarrass them with formatting errors or compliance failures they did not know about |
| In control | They want to see what is happening . who opened, who purchased . so they feel like a competent marketer even without a marketing background |
| Efficient | They want the time they spend on email marketing to be proportional to the revenue it generates; long setup times make the ROI feel negative before a campaign is even sent |

**How do they want to avoid feeling?**

| Feeling to Avoid | Current Trigger |
|------------------|-----------------|
| Overwhelmed | Looking at a Klaviyo or Mailchimp onboarding flow and realizing there are six steps before they can even see a template |
| Exposed | Sending an email that looks broken, triggers a spam report, or violates compliance rules they did not know existed |
| Behind | Watching products sit unsold while knowing a well-targeted email could drive re-purchases . and feeling unable to do anything about it |

**Emotional Pains:**
- The emotional cost of a missed attempt . opening Mailchimp, spending 30 minutes on setup, not finishing, and closing the tab . reinforces avoidance on the next attempt; three failed starts can produce permanent abandonment of the channel.
- Compliance uncertainty (CAN-SPAM, GDPR) produces anxiety in merchants who do not know what they are legally required to include in a commercial email; this anxiety pushes them toward established tools as a way of outsourcing the compliance risk.

---

## Social Job

**How do they want to be perceived?**

| Desired Perception | By Whom |
|--------------------|---------|
| A data-savvy merchant who knows which customers to target and why | Their customers, who receive relevant and personalized communications |
| A professional business owner who communicates consistently and credibly with their audience | Their peer network of other merchants and the Storevine community |

**What perception do they want to avoid?**

| Perception to Avoid | By Whom |
|---------------------|---------|
| A small-time operator who sends generic bulk emails with no personalization | Their customers, who will unsubscribe or ignore the content |
| A merchant who has not figured out email marketing yet | Their peer network, where Klaviyo fluency is often presented as a mark of marketing sophistication |

**Social Context:**
- Merchant peer networks (Facebook groups, Storevine community forums) actively share email marketing tips and tool recommendations; merchants who have not started email marketing often feel social pressure from peers who describe their Klaviyo setups.
- The Klaviyo brand carries social signaling weight in ecommerce merchant communities . using Klaviyo implies a level of sophistication that using a simpler tool or doing nothing does not.

---

## Competing Solutions

**What do customers currently "hire" for this job?**

| Solution Type | Solution | Strengths | Weaknesses |
|---------------|----------|-----------|------------|
| Direct Competitor | Klaviyo | Deep purchase-based segmentation; revenue attribution; automation flows; peer credibility | High setup cost; aggressive list-size pricing; creates data lock-in; intimidating onboarding for first-time users |
| Indirect Alternative | Mailchimp | Familiar brand; large template library; A/B testing on paid tiers | Requires manual data sync from Storevine; not commerce-native; similar pricing to Klaviyo for small lists without ecommerce-specific features |
| Non-consumption | Instagram / social media only | Zero setup cost; familiar interface; no compliance complexity | Reaches followers, not customers; cannot target by purchase history; no revenue attribution |
| DIY/Manual | Copy-paste customer emails from Storevine into Gmail BCC | Zero cost; no new tool to learn | Not scalable; compliance violations likely (no unsubscribe link, no physical address); no performance tracking |

**Why Do They Switch?**
- Merchant realizes their Instagram reach is declining or paid ad CAC has increased, making email the next logical re-engagement channel to invest in.
- A peer or mentor tells them to "set up Klaviyo" and they follow through during a quiet business period . typically January or September.

**Why Do They Stay?**
- Data lock-in: segments, automation flows, and historical performance benchmarks are inside the existing tool; rebuilding them in a new platform is a significant investment of time and risk.
- Seasonal anxiety: any window where switching feels "safe" is quickly consumed by the next promotional season; there is always a reason not to switch.

---

## Hiring Criteria

**Must-Have (Table Stakes):**
- Customer and order data available immediately . no API key configuration, no manual CSV import, no data sync delay
- CAN-SPAM and GDPR compliance built into the send flow . unsubscribe link, physical address, and consent handling are automatic, not merchant-configured
- Operates entirely within the Storevine admin . no separate account, no second login

**Differentiators (Decision Drivers):**
- Revenue attribution: the ability to see, within the same interface, which email recipients made a subsequent purchase and how much revenue was generated
- Purchase-based audience segmentation: filter recipients by product category purchased, order count, or last purchase date without exporting data
- A first-send experience that produces a professional-looking email within 15 minutes of starting with no template design required

**Nice-to-Have:**
- A/B testing for subject lines and content variants (recognized as valuable by sophisticated merchants; not a first-send priority for non-adopters)
- Pre-scheduled send time optimization based on recipient engagement history

---

## Insights and Implications

**Key Insight 1:** The job is "keep my business running with fewer tools" . the email feature is a vehicle, not the destination.
- Product Implication: Campaigns wins by feeling invisible . like a natural extension of the Storevine admin, not a new tool layered on top of it. Every onboarding step that does not feel native to the existing merchant experience is a step closer to abandonment.

**Key Insight 2:** The lock-in mechanic is structural . reaching non-adopters before they commit to Klaviyo is more valuable than competing for merchants who are already using it.
- Product Implication: v1 activation resources should concentrate on merchants with no current email tool. A Klaviyo migration path should be scoped for v2 after the core product has proven retention value, not at v1 GA.

**Key Insight 3:** Revenue attribution is not a power-user feature . it is the basic answer to "did this work?" that any merchant who cares about ROI will ask on the day they send their first campaign.
- Product Implication: Revenue attribution is a launch-gate requirement, not a v2 addition. A Campaigns product that cannot answer "which email drove which purchase?" will not retain merchants beyond their first send, regardless of how easy that first send was to complete.

---

## Supporting Quotes

> "I haven't sent a single email in two years. I know I should. But every time I think about it I get overwhelmed and I just post on Instagram instead." . P3, Specialty food merchant, 95 customers [fictional]

> "I've got three years of segment history in Klaviyo. My VIP segment isn't just a filter . it's a list I've cultivated. I'd lose all that if I moved." . P1, Fashion boutique merchant, 1,200 customers [fictional]

> "If there was a 'migrate from Klaviyo' button, I'd push it today. But there isn't, and I'm not doing that by hand." . P5, Beauty merchant, 310 customers [fictional]

---

## Questions for Further Research

- What percentage of non-adopter merchants have attempted to set up Klaviyo or Mailchimp and abandoned mid-onboarding? Understanding the failed-attempt rate would sharpen the "complexity barrier" framing and inform the guided flow design.
- Do merchants who send their first email campaign within 30 days of store launch have meaningfully higher 12-month retention rates than those who do not? This would quantify the churn reduction value of early email activation and inform whether Campaigns should be prioritized in new-merchant onboarding.
- Does the "run my business in one place" job weaken for merchants above a certain revenue threshold . for example, above $300K annual GMV [fictional] . where the ROI of a dedicated Klaviyo account justifies the management overhead? Understanding this ceiling would define the natural boundary of Campaigns' target segment.

---

*This canvas should be validated and updated as you learn more about customers.*
