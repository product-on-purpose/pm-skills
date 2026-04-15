<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
artifact: lean-canvas
version: "1.0"
repo_version: "2.10.2"
skill_version: "1.0.0"
created: 2026-04-15
status: sample
thread: storevine
context: Storevine Campaigns lean canvas for framing the built-in email / SMS re-engagement feature as an embedded alternative to Klaviyo for SMB merchants
---

## Scenario

Storevine is preparing to launch Campaigns, a built-in email and SMS re-engagement tool for SMB merchants, as a bet against the pattern of merchants adopting Klaviyo or Mailchimp as a second tool. Before committing engineering resources to the full build, the Storevine Campaigns PM needs a one-page lean canvas that makes the strategic thesis inspectable: is the embedded positioning credible, what is the realistic revenue thesis, and which assumptions need to be validated before writing PRDs. This canvas is the anchor artifact for the v1 Campaigns product-strategy review with leadership.

**Source Notes:**

- Klaviyo S-1 filing details SMB email-marketing adoption patterns, including the "tool juggling tax" that small merchants pay when integrating third-party email tools with their commerce platform.
- Shopify partner ecosystem research on merchant tool consolidation shows solo-operator merchants prefer embedded tools over external integrations when setup friction is comparable.
- Klaviyo public pricing page lists plans starting at $45 per month for small merchant segments.

---

## Prompt

```text
/lean-canvas

Build a lean canvas for Storevine Campaigns (built-in email + SMS re-engagement) ahead of v1 leadership review.

Context:
- 15k merchants on Storevine (Series A, ~70 employees)
- ~38% of merchants currently juggle Klaviyo or Mailchimp as a second tool [fictional]
- Win-loss interviews (Jan 2026, n=14): 6/14 wins cited "too many tools"; 4/9 losses said "Klaviyo is good enough" [fictional]
- Competitive landscape already mapped (see discover-competitive-analysis from Feb 2026)
- Initial persona for self-serve SMB merchant already drafted via /persona
- Need: lean canvas for leadership review, content mode is fine, confidence-honest

The canvas should feed directly into the v1 PRD so be concrete on revenue math and key metrics.
```

---

## Output

# Lean Canvas: Storevine Campaigns

> **Created**: 2026-04-15
> **Author**: Storevine Campaigns PM
> **Mode**: content
> **Overall confidence**: Medium
> **Purpose**: New feature thesis. Pre-PRD strategic review for leadership.

---

## 1. Problem

- **P1**: SMB merchants on Storevine leave re-engagement on the table because setting up a second tool (Klaviyo, Mailchimp) costs setup time, deliverability anxiety, and an extra $45 to $100 per month [fictional pricing midpoint].
- **P2**: Merchants who DO adopt Klaviyo or Mailchimp pay the "tool juggling tax": duplicate product catalogs, broken segmentation on refunds or cancellations, and sync failures that take hours to debug per incident [fictional].
- **P3**: Solo-operator merchants in particular treat "I will set up email marketing next month" as a rolling TODO and never actually ship a campaign, which leaves significant LTV on the table.

### Existing Alternatives

- Klaviyo and Mailchimp installed as external tools via Storevine's API integrations
- Shopify Email (for merchants who also use Shopify and split catalog management)
- Manual one-off emails via Gmail or personal SMS tools (for the smallest merchants)
- Non-consumption: accepting that cart abandoners are lost customers

**Confidence**: High
**Rationale**: Win-loss interviews (n=14 in Jan 2026) plus Klaviyo S-1 disclosure both anchor the "too many tools" pattern. Merchant segment behavior is well-documented.

---

## 2. Customer Segments

- Storevine SMB merchants (defined as stores with $50k to $2M GMV annually) who currently do not run automated email or SMS marketing, or who run it through a second tool they dislike.

### Early Adopters

- Storevine merchants with 100 to 500 monthly orders who have installed and then churned from Klaviyo or Mailchimp within the last 12 months. This cohort is approximately 4% of the base [fictional] and has the sharpest memory of the juggling pain; they are pre-qualified on "willing to try an embedded alternative."

**Confidence**: Medium
**Rationale**: Base segment is measured from Storevine merchant data. The specific "churned from Klaviyo within 12 months" subset is inferred from the win-loss cohort and needs direct validation via a targeted outreach round of 20 to 30 merchants.

---

## 3. Unique Value Proposition

Bring re-engagement into the store you already run, so you keep more customers without juggling a second tool, a second catalog, or a second invoice.

### High-Level Concept

Klaviyo inside your store, with zero integration work.

**Confidence**: Medium
**Rationale**: UVP language tested well in 9 of 14 interviews when framed as "no second tool" but the "zero integration work" specificity is untested. "Klaviyo inside your store" analogy works with merchants familiar with Klaviyo; for merchants new to the category, a different analogy may be needed.

---

## 4. Solution

- **For P1 (second-tool friction)**: A pre-configured campaign library (abandoned cart, welcome series, post-purchase upsell, winback) that merchants activate in one click with no external setup.
- **For P2 (tool-juggling tax)**: Unified customer + product catalog; segmentation that automatically reflects Storevine order events (refund, cancellation, product change) in real time.
- **For P3 (rolling TODO)**: Guided first-send flow that surfaces a single recommended campaign based on the merchant's order history, with suggested copy and audience.

**Confidence**: Medium
**Rationale**: Feature set is grounded in pain-point interviews. Guided first-send is the riskiest: we have not validated that merchants will accept AI-suggested copy vs. wanting blank-canvas authoring.

---

## 5. Channels

### Compounding (free, long-horizon)

- In-app discovery at key merchant moments: first-product-added, first-order, first-abandonment. Merchant is already active in Storevine at these points; conversion should outperform cold outbound.
- Storevine merchant community (Slack + forum): case studies from early adopters become word-of-mouth in a high-trust peer channel.
- Content series on "the real cost of a second tool" published on Storevine's merchant blog.

### Traction-demonstrating (paid, near-term)

- Targeted lifecycle email to existing Storevine merchants who match the "churned from Klaviyo" pattern.
- Paid webinars partnered with three Storevine-adjacent agencies in the SMB ecommerce space.

**Confidence**: Medium
**Rationale**: In-app discovery is high-confidence because we control the surface and know the activation moments. Community and agency channels are standard SaaS plays but conversion rates for Storevine specifically are unknown.

---

## 6. Revenue Streams

- **Model**: Per-store subscription add-on, with usage-based overage for SMS.
- **Price**: $39 per month flat (includes 5,000 emails and 500 SMS), with $0.01 per additional email and $0.05 per additional SMS.
- **Volume (Year 1)**: 2,700 merchants on Campaigns at end of Year 1 (18% of base) [fictional].
- **LTV**: Assuming $39 per month base + $12 average overage = $51 per merchant per month, with 22-month average lifetime, LTV is approximately $1,120.
- **Math**: 2,700 merchants x $51 x 12 = $1.65M ARR at end of Year 1 (base case).

**Confidence**: Medium
**Rationale**: Price point is calibrated against Klaviyo's entry SKU ($45) discounted for bundled positioning. 18% adoption is an aspirational estimate based on merchant interviews; we have not run a paid pilot.

---

## 7. Cost Structure

- **CAC**: Approximately $80 per merchant (embedded acquisition, low relative to standalone SaaS) [fictional].
- **Fixed costs**: 4-engineer team + 1 designer + shared infrastructure. Roughly $1.1M annual in Year 1 [fictional].
- **Variable costs**: SMS carrier fees ($0.03 to $0.04 per SMS), email infrastructure ($0.0001 per send), deliverability monitoring.
- **Cost driver**: SMS volume, not email. If SMS adoption outpaces email by more than 2x, variable cost per merchant compresses margin faster than projected.

**Confidence**: Low
**Rationale**: CAC is estimated, not measured. SMS-versus-email volume mix is the biggest unknown; our interviews did not probe this. A pilot with 20 merchants would give us the data.

---

## 8. Key Metrics

- **Activation**: Percentage of eligible merchants who send their first campaign within 14 days of trial start. Target: 45% in month 1 [fictional], 65% by quarter 4.
- **Revenue retention**: Net revenue retention across Campaigns customers. Target: 115% NRR by end of Year 1.
- **Churn**: Monthly logo churn on Campaigns add-on. Target: under 3.5% monthly [fictional].
- **SMS cost ratio**: SMS carrier fees as a percentage of revenue. Target: stays below 18% at scale.
- **NPS among Campaigns customers**: Target: 42+ by end of Year 1.

**Confidence**: Medium
**Rationale**: AARRR-style metric selection is standard. Specific targets are benchmark-calibrated but untested against our product; treat as directional.

---

## 9. Unfair Advantage

We already have the merchant's complete customer list and product catalog in canonical form, with real-time order events. No integration, no schema mapping, no sync failures. Klaviyo and Mailchimp have to earn that data via brittle integrations; we start with it. This shortens our time-to-first-send from hours to minutes and is structurally difficult for a third-party tool to match without Storevine's permission.

**Confidence**: Medium
**Rationale**: The structural advantage is real; the question is whether merchants value it enough to switch from a tool they already know. A landing-page A/B test comparing "no setup" vs. "automation quality" headlines would help.

---

## Evidence & Confidence

### Validated

- "Too many tools" pain pattern: 6 of 14 wins in January 2026 win-loss interviews cited this directly.
- Klaviyo pricing floor of $45 per month for SMB plans: Klaviyo public pricing page, accessed April 2026.
- SMB merchants treat email-marketing setup as a rolling TODO: Klaviyo S-1 filing corroborates, and 11 of 14 interviewees described the same pattern.

### Assumed

- 18% Year 1 adoption of eligible merchant base. Calibrated from interview intent signals, not measured.
- 45% first-send activation within 14 days. Based on comparable lifecycle onboarding benchmarks, not our product.
- SMS-to-email volume mix will stay within 2:1 ratio. Extrapolated from SMS growth trends in SMB ecommerce; not measured for our segment.

### Open Questions

- Do merchants who currently run Klaviyo successfully (not churned) see any reason to switch? 20 customer-development conversations with active Klaviyo users.
- What is the realistic blended CAC once we include in-app acquisition credit and paid channels? A 60-day paid-channel pilot with $30k budget.
- At what merchant size does the "too many tools" argument flip and a best-of-breed tool becomes preferable? Segmentation analysis by GMV bands.

### Governance

- **Owner**: Storevine Campaigns PM, with monthly review at product strategy forum.
- **Review cadence**: Monthly in the first two quarters of v1, quarterly after GA.
- **Revision triggers**: (a) adoption at 6 months is below 8% of eligible base; (b) NRR lower than 100% at month 9; (c) Klaviyo launches a native Storevine integration that closes the embedded-positioning gap.

---

## Visual Output

This sample ships with a companion visual-mode render at [`sample_foundation-lean-canvas_storevine_campaigns.html`](sample_foundation-lean-canvas_storevine_campaigns.html), generated from the same content above via the skill's `references/html-template.html` scaffold.

- **Layout**: canonical Maurya 9-block grid with per-column color accents (Problem red, Solution blue, UVP purple, Unfair Advantage amber, Customer Segments green, Cost and Revenue amber)
- **Confidence badges**: each block tagged `H`, `M`, or `L` with matching color; aggregates visible at a glance
- **Self-contained**: no external fonts, stylesheets, or scripts; opens offline in any modern browser
- **Print-ready**: `@media print` page-size A3 landscape; fits the canvas on one page

Open the `.html` file directly or export to PDF via browser print for sharing in leadership reviews.
