# Lean Canvas: RestoreAI (Customer Success Copilot for Mid-Market SaaS)

> **Created**: 2026-04-15
> **Author**: Product strategy, RestoreAI founding team
> **Mode**: content
> **Overall confidence**: Medium
> **Purpose**: New thesis. Framing the v1 strategic bet before engineering investment is committed.

---

## 1. Problem

- **P1**: CS managers at 50 to 500 person SaaS companies spend 40%+ of their week triaging tickets across Zendesk, Slack, and Gong with no unified view of account health. They miss early churn signals because signal is fragmented across tools.
- **P2**: CS leaders cannot confidently answer "which accounts need intervention this week?" without a manual weekly spreadsheet pull that takes 3 to 4 hours and is stale by Tuesday.
- **P3**: Individual CSMs burn out from reactive firefighting. Industry attrition for CSMs is 27% annually (Gainsight 2025 benchmark), driven partly by the emotional load of surprise-churn accounts.

### Existing Alternatives

- **Gainsight / Totango / Catalyst**: dedicated CS platforms. Strong, but priced for enterprise ($50k to $150k ARR minimum) and heavy to implement (3 to 6 month rollouts). Overkill for 50 to 500 person companies.
- **Manual spreadsheets + BI**: most common alternative. Cheap but stale, brittle, and does not surface signals proactively.
- **Zendesk + Slack alerts**: free but reactive. Flags problems after customers have already disengaged.
- **Non-consumption**: accepting churn as the cost of doing business. Far more common than CS leaders admit in public.

**Confidence**: High
**Rationale**: 18 customer discovery interviews with CS leaders at SaaS companies between 50 and 400 employees (Q1 2026). Pain frequency and intensity consistent across all 18.

---

## 2. Customer Segments

- Mid-market SaaS companies (50 to 500 employees, $5M to $50M ARR) with a dedicated CS function but not yet ready to commit to enterprise CS platforms.

### Early Adopters

- Founder- or VP-led CS teams at Series B to Series C SaaS companies (100 to 300 employees, $10M to $30M ARR) where the CS leader reports directly to the CEO or CRO and has budget authority for tools under $30k annual. These leaders feel the pain weekly, have explicit mandates to reduce logo churn, and are willing to adopt new tools without a committee. Specifically targeting LinkedIn CS communities and the Pavilion CS group for initial outreach.

**Confidence**: Medium
**Rationale**: Segment is sized from SaaS market data (Crunchbase, 2025), but early adopter persona is currently calibrated on 8 of the 18 interviewees and needs validation via a paid pilot cohort.

---

## 3. Unique Value Proposition

RestoreAI surfaces the 5 accounts most likely to churn this week, with the specific next action for each CSM to take, before any manual analysis is required.

### High-Level Concept

Copilot for Customer Success: like GitHub Copilot for engineers, RestoreAI proactively suggests the next right action to CSMs based on signal patterns across their existing tools.

**Confidence**: Medium
**Rationale**: The "5 accounts / this week / specific next action" framing tested well with 14 of 18 interviewees. The "Copilot for CS" analogy is new and has not been validated with the segment; it works well with investor audiences but may need adjustment for buyers.

---

## 4. Solution

- **For P1 (fragmented signal)**: A unified account health view that ingests Zendesk, Slack, Gong, Salesforce, and product usage data via pre-built connectors. Zero custom integration work for the first five tools.
- **For P2 (stale weekly pull)**: A Monday-morning "Accounts at Risk" digest delivered via Slack, ranked by churn probability with the top signal cited for each. Refreshes daily.
- **For P3 (CSM burnout from surprise churn)**: Per-CSM "next best action" suggestions, linked to each at-risk account, specifying what to send, who to loop in, and when.

**Confidence**: Medium
**Rationale**: Feature set is a hypothesis from interview pain-point mapping, not yet validated with working software. Connector scope is feasible based on prior experience (two of the founders shipped similar connectors at their last company); churn-prediction accuracy is the largest open risk.

---

## 5. Channels

### Compounding (free, long-horizon)

- Weekly long-form essay series on "State of CS" published on a dedicated Substack and cross-posted to LinkedIn, targeting the CS leader audience. Goal: become the most-read voice on mid-market CS ops in 12 months.
- Open-source the account-health scoring framework as a standalone GitHub repo. Draws engineers and CS ops folks into the orbit, seeds inbound.
- Speaking at Pavilion, CS Leaders Network, and Gainsight Pulse events. Cost: time only.

### Traction-demonstrating (paid, near-term)

- Outbound sales to VPs of CS at Series B to Series C SaaS companies, sourced via Apollo and LinkedIn Sales Navigator. Targeting 40 conversations per month in the first two quarters.
- LinkedIn ads targeting CS leader job titles at company-size-bounded SaaS firms. Budget: $5k per month initially, optimized for demo requests.

**Confidence**: Medium
**Rationale**: Compounding channels are standard for B2B SaaS and have worked for comparable tools. Outbound targeting is well-scoped but conversion rate is unknown; LinkedIn ads may or may not work for this segment. First 90 days are explicit learning.

---

## 6. Revenue Streams

- **Model**: Per-seat SaaS subscription
- **Price**: $149 per CSM seat per month, minimum 5 seats. Annual billing preferred with 15% discount.
- **Volume (Year 1)**: 40 customers averaging 8 seats = 320 total seats
- **LTV**: Assuming 85% gross retention and 110% net revenue retention, 3-year LTV per seat is approximately $5,600
- **Math**: 320 seats x $149 x 12 = $572k ARR at end of Year 1 (base case). Upper band with expansion: $690k ARR.

**Confidence**: Medium
**Rationale**: Pricing calibrated against Gainsight and Totango per-seat equivalents, adjusted for mid-market positioning. Volume assumption is an estimate; LTV math is standard SaaS and assumes comparable-category retention, which is itself a hypothesis.

---

## 7. Cost Structure

- **CAC (customer acquisition cost)**: Target $4,200 per customer (blended across outbound and inbound). LTV:CAC target ratio 3:1 or better.
- **Fixed costs**: 4 engineers + 1 designer + 2 founders = approximately $1.4M annual burn in Year 1.
- **Variable costs**: LLM inference ($0.08 to $0.15 per account scored per day), data infrastructure ($0.02 per account per day), connector hosting. Roughly $12 to $18 per account per month in COGS.
- **Cost driver**: LLM inference volume scales with account count AND with the depth of analysis per account. If per-account inference cost grows faster than per-seat revenue, gross margin compresses. This is the single biggest cost risk.

**Confidence**: Low
**Rationale**: LLM pricing is volatile and model-capability-dependent. Engineering burn rate is controllable but our Year 1 scope assumes no infra-engineer hire, which is optimistic. CAC target is aspirational given we have not run a single paid campaign yet.

---

## 8. Key Metrics

- **Activation**: % of new customers whose first "Accounts at Risk" digest surfaces an account the CSM had not already flagged. Target: 70%+ in first month.
- **Retention (leading)**: Weekly active CSMs per account. Target: 80%+ weekly active in months 2 to 3.
- **Churn prediction accuracy**: Precision@5 on weekly at-risk digest (did 4+ of the 5 surfaced accounts actually show churn signal within 30 days?). Target: 60%+ precision at end of Year 1.
- **Revenue (lagging)**: Net revenue retention across the customer base. Target: 110%+ NRR by end of Year 1.
- **Referral**: % of new customer conversations sourced via existing customer or ecosystem referral. Target: 30%+ by end of Year 1.

**Confidence**: Medium
**Rationale**: Metric selection follows AARRR and is standard. Specific targets are calibrated against comparable SaaS benchmarks but have not been tested against our actual product yet. Precision@5 threshold is the most uncertain.

---

## 9. Unfair Advantage

Open question. No defensible moat yet. Currently exploring two candidates: (1) a proprietary taxonomy of account-health signals built from the 18 discovery interviews and extended through the first 20 customers, which could become a structured data asset if kept current; (2) the founding team's combined 14 years at mid-market SaaS CS organizations, which gives us earned trust in the target buyer community. Neither is defensible on its own over 24+ months; both require active compounding.

**Confidence**: Low
**Rationale**: "Unfair advantage" is the block we are weakest on. Treating it as an open research question, not a claim.

---

## Evidence & Confidence

### Validated

- Problem P1 (fragmented signal across tools): Validated via 18 of 18 discovery interviews (Q1 2026). All 18 named at least 3 disparate tools and struggled to answer "show me this week's at-risk accounts" without manual work.
- Existing Alternatives (Gainsight/Totango too heavy for mid-market): Validated via 12 of 18 interviewees who had actively evaluated and rejected enterprise CS platforms.
- CS attrition 27% annual: Gainsight Benchmark Report 2025.
- Competitive pricing range for enterprise CS platforms ($50k to $150k ARR minimum): Vendor public pricing pages and deal sizes shared by 6 interviewees.

### Assumed

- Churn prediction accuracy threshold (Precision@5 > 60%) is achievable with current LLM-plus-ruleset approach. No working prototype yet.
- Per-seat pricing of $149 is acceptable to the segment. Calibrated from comps, not tested.
- 40 customers in Year 1 via the described channel mix. Estimated from outbound-funnel conversion assumptions, not measured.
- LinkedIn CS communities and Pavilion will convert to pilot conversations at a reasonable rate.

### Open Questions

- What is the actual Precision@5 ceiling we can hit with available signal across Zendesk, Slack, Gong, Salesforce, and product usage data? Run a retrospective backtest on one friendly early customer's 12 months of historical data.
- Is the "Copilot for CS" positioning more resonant with buyers than "proactive CS intelligence"? A/B test landing page messaging in the first paid-ad cohort.
- Does the $149 per-seat price point feel high, right, or low to the target CS leader? Probe in pricing-sensitivity interviews with 10 more leaders in the target segment before finalizing Year 1 price.
- What is the real CAC via LinkedIn ads plus outbound combined? Only measurable by running the campaigns; budget $15k for a 60-day CAC-discovery experiment.

### Governance

- **Owner**: VP Product (RestoreAI founding team)
- **Review cadence**: Monthly stress test in the first 6 months, quarterly thereafter. At each review, confidence tags are re-evaluated and any block moving from Assumed to Validated (or the reverse) is logged.
- **Revision triggers**: Unscheduled revision required if: (a) a block's confidence drops from High to Medium or below, (b) a customer-segment assumption is invalidated (e.g., mid-market does not feel the pain we expected), (c) a material competitive shift (e.g., Gainsight releases a mid-market SKU at $10k ARR), or (d) unit economics materially diverge from plan (gross margin under 60% for two consecutive quarters).

---

## Visual Output

> Skipped in content mode; no `.html` file is written. If this canvas were generated in `visual` mode instead, the skill would additionally write a self-contained file to `./lean-canvas-restoreai.html`. That file would render the nine blocks in the canonical Maurya grid layout, with the Problem block spanning the left column in accent red, Customer Segments spanning the right column in accent green, UVP anchored in the center in accent purple, and Cost Structure + Revenue Streams across the bottom in accent amber. Each cell would display its block number, name, a confidence badge (H / M / L, color-coded), and the one-line summaries: for RestoreAI, the Problem cell would show "CS managers triage across fragmented tools (40%+ of week), miss churn signals" with confidence badge M; the UVP cell would show "Surfaces the 5 accounts most likely to churn this week, with the specific next action for each CSM" plus the Copilot-for-CS analogy in the concept slot; the Revenue cell would show "$149/seat/mo x 320 seats = $572k Y1 ARR base case." The file would open directly in a browser with no network access and print cleanly at A3 landscape.
