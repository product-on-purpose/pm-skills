# Example: Prioritized Action Plan (Complicated domain)

A fully worked plan from a realistic half-baked PRD draft. The verbatim input is shown first, then the Step 0 ledger, then the nine-section plan. Every `Source:` quote is an exact substring of the input. One claim is deliberately marked `Inferred (Low confidence)` to model the honesty mechanism.

---

## The input (pasted verbatim)

> Feature: Bulk CSV export for the Analytics dashboard.
>
> Problem: Enterprise customers keep asking for a way to get their data out. Three of our top-10 accounts mentioned it on QBRs last quarter. Support gets maybe 4-5 tickets a week asking how to export more than the current 1,000-row limit. Sales says it's a blocker in two active deals.
>
> Goal: Let users export the full dataset behind any dashboard view as a CSV.
>
> Proposed solution: Add an 'Export all' button that generates a CSV in the background and emails a download link when ready.
>
> Open questions: Do we need to support scheduled exports too? The data team is worried about query load on the warehouse during business hours. Legal hasn't weighed in on whether we can email download links with customer data. We don't know if customers want CSV specifically or if they'd be happier with a direct warehouse/Snowflake share. PM bandwidth is tight this quarter; eng has ~3 weeks if we want it in the Q3 release. Target enterprise tier only for now. Pricing impact TBD.

---

## Step 0: Source ledger

```
S1: "Three of our top-10 accounts mentioned it on QBRs last quarter" (origin: pasted text, Problem)
S2: "Support gets maybe 4-5 tickets a week asking how to export more than the current 1,000-row limit" (origin: pasted text, Problem)
S3: "Sales says it's a blocker in two active deals" (origin: pasted text, Problem)
S4: "The data team is worried about query load on the warehouse during business hours" (origin: pasted text, Open questions)
S5: "Legal hasn't weighed in on whether we can email download links with customer data" (origin: pasted text, Open questions)
S6: "We don't know if customers want CSV specifically or if they'd be happier with a direct warehouse/Snowflake share" (origin: pasted text, Open questions)
S7: "eng has ~3 weeks if we want it in the Q3 release" (origin: pasted text, Open questions)
S8: "Add an 'Export all' button that generates a CSV in the background and emails a download link when ready" (origin: pasted text, Proposed solution)
```

---

## Section 0. Executive summary

- **Situation classification:** Complicated (Cynefin). Demand is well-evidenced and the open questions are answerable with analysis and expertise, not emergent experimentation.
- **The binding constraint:** the delivery decision is unmade. Whether the answer is a CSV email or a warehouse share is unresolved (S6) and blocked on a legal ruling (S5); committing eng's three weeks before deciding risks building the wrong or a non-compliant thing.
- **The critical next effort (P1):** resolve format-and-delivery with a fast customer check plus a legal review, before any build starts.
- **Overall plan confidence:** Medium-High. The constraint and P1 are well-sourced; the residual risk is that the customer check changes the format.
- **Time-to-value:** roughly one week to a decided, build-ready spec.

## Section 1. Input mirror - what I understand

- **What you gave me:** a draft PRD for bulk data export from the Analytics dashboard, currently capped at 1,000 rows. You have a proposed solution (a background CSV with an emailed link), enterprise-only scope, a roughly three-week eng window for Q3, and a cluster of unresolved questions about format, query load, legal, and scheduling.
- **What you appear to be trying to accomplish:** ship a defensible export capability in Q3 that unblocks active deals without overcommitting scarce eng and PM time. Confidence: Medium (intent is clear; the success bar is not stated).
- **Adjacent intents I noticed but did not assume:** scheduled exports, a Snowflake/warehouse share as a product surface, and a pricing change. I did not assume any of these are in scope for Q3.

## Section 2. Situation classification (Cynefin)

**Domain:** Complicated. **Source:** S1, S2, S3, S5, S6.

Cause and effect here are knowable with analysis and expertise, which is the test for Complicated rather than Complex. The demand is not speculative: three top-10 accounts (S1), a steady support volume (S2), and two active deals (S3) converge on the same need. The open questions (format preference, legal, query load) are not unknown-unknowns: each can be resolved by asking a customer, asking legal, or sizing a query. This is not Complex, because the outcome is not genuinely unpredictable; it is a set of answerable design and compliance decisions. Posture: analyze the two real unknowns, then commit. Confidence ceiling: Medium-High.

## Section 3. The binding constraint (Theory of Constraints)

- **System and goal:** ship an enterprise export capability in the Q3 window that closes the data-out gap.
- **The constraint:** an unmade delivery decision. The team does not yet know whether customers want CSV at all or would prefer a direct warehouse share (S6), and legal has not ruled on whether an emailed link to customer data is even allowed (S5). Everything downstream (which surface to build, how to handle query load, whether scheduling matters) depends on this decision.
- **Source:** S5, S6.
- **Candidate constraints considered:** (1) Eng capacity, the three-week window (S7). Real, but downstream: you cannot usefully spend three weeks until you know what to build, so capacity is subordinate to the decision. (2) Query load on the warehouse (S4). This is a design constraint on whichever solution is chosen, not the thing blocking the choice, so it is subordinate as well.
- **Why P1 lifts it:** deciding format-and-delivery converts a guess (S8, the proposed CSV-email) into a validated, compliant build target, which is what unblocks a correctly-scoped three-week build.

## Section 4. Prioritized questions, gaps, and open decisions

| Rank | Question / gap | Why it matters | Decision required? | How to resolve |
|---|---|---|---|---|
| Q1 | Do enterprise customers want CSV, or a warehouse/Snowflake share? (S6) | Determines what gets built; wrong answer wastes the Q3 window | Yes, blocks P1 | Ask the three QBR accounts and the two deal contacts directly |
| Q2 | Can we legally email a download link to customer data? (S5) | A no invalidates the proposed solution (S8) outright | Yes, blocks P1 | 30-minute legal review with a concrete data-handling description |
| Q3 | What is the success bar for "done" in Q3? | Without it, scope creeps toward scheduling and pricing | Yes | PM sets a one-line success metric (for example, unblock the two deals) |
| Q4 | Is scheduled export in scope for Q3? | Expands eng cost well past three weeks | No, defer unless a customer makes it a blocker | Park it as a fast-follow; revisit after P1 |
| Q5 | Does the chosen solution survive business-hours query load? (S4) | Could force off-peak or async design | No, but informs P2 | Have the data team size the worst-case export query |

## Section 5. The prioritized action plan

#### P1. Decide format and delivery before building

- **Why:** lifts the binding constraint. The proposed CSV-email (S8) is unvalidated against customer preference (S6) and unconfirmed against legal (S5). Deciding this is the one move that makes the rest of the plan safe to execute.
- **What:** a one-page decision that names the format (CSV vs warehouse share), the delivery mechanism (emailed link vs in-app download vs warehouse grant), and the legal verdict on customer-data handling.
- **How:** (1) Send a three-question note to the three QBR accounts (S1) and the two deal contacts (S3) asking format preference and how they expect to receive the data. (2) Book a 30-minute legal review describing the emailed-link flow (S5). (3) Write the decision as a one-pager and circulate to eng and the data team.
- **Confidence:** Medium-High. Respects the Complicated ceiling; the only thing that could move it is a split customer answer.
- **Source:** S5, S6, S3, S1.
- **Expected outcome / success signal:** a signed-off format-and-delivery decision; eng can scope a real build instead of the proposal.
- **Estimated effort:** about one week, mostly waiting on replies; under a day of active work.
- **Dependencies:** none. This is the entry point.

#### P2. Size and de-risk the warehouse query load

- **Why:** the data team's concern about business-hours query load (S4) is the top design risk on whichever surface P1 selects; sizing it early prevents a late redesign.
- **What:** a worst-case export query profile and a recommendation (off-peak scheduling, read replica, or async generation).
- **How:** (1) Take the largest realistic dashboard view. (2) Have the data team run and measure the full-dataset query. (3) Recommend a load-handling approach feeding the build.
- **Confidence:** Medium. Depends on which surface P1 picks.
- **Source:** S4.
- **Expected outcome / success signal:** a load number and a chosen mitigation, so the build does not threaten the warehouse.
- **Estimated effort:** 2 to 3 days.
- **Dependencies:** P1 (the chosen surface changes the query shape).

#### P3. Scope and build the decided export to the Q3 window

- **Why:** with format, legal, and load resolved, the three-week window (S7) can be spent on a correctly-scoped build rather than a guess.
- **What:** the shipped enterprise export, scoped to exactly the P1 decision, no scheduling.
- **How:** (1) Translate the P1 one-pager into an eng-ready spec. (2) Build the single decided surface. (3) Ship to enterprise tier behind the existing gate.
- **Confidence:** Medium. The window is tight (S7), so scope discipline is the risk.
- **Source:** S7, S8.
- **Expected outcome / success signal:** enterprise users export full datasets; the two active deals (S3) lose their blocker.
- **Estimated effort:** about three weeks, matching the stated window.
- **Dependencies:** P1 and P2.

**Sequencing (Now / Next / Later)**

| Now | Next | Later |
|---|---|---|
| P1 | P2 | P3, then scheduled export |

**What to defer / what NOT to do**

- Do not build the CSV-email (S8) yet; it is a hypothesis until P1 confirms it.
- Do not scope scheduled exports into Q3; it is a fast-follow unless a customer makes it a blocker.
- Do not resolve pricing now; it does not block shipping the capability to enterprise tier.

## Section 6. Risks and pre-mortem

| Risk | Likelihood | Impact | Early signal | Mitigation | Source |
|---|---|---|---|---|---|
| Customers split between CSV and warehouse share | M | H | P1 replies disagree | Ship CSV first (lower lift), park warehouse share as fast-follow | S6 |
| Legal prohibits emailed data links | M | H | Legal flags the flow in the P1 review | Switch to in-app authenticated download; do not email data | S5 |
| Three-week window slips on a redesign | M | M | P2 load number forces async work | Choose async generation up front so load does not reshape scope late | S4, S7 |
| Pricing backlash when export becomes a paid differentiator | L | M | Account managers report pushback | Decouple: ship to current enterprise tier, defer pricing | Inferred (Low confidence) |

> Note: the pricing-backlash risk is `Inferred (Low confidence)`. The input says only "Pricing impact TBD"; it does not evidence any customer reaction. It is listed as a watch-item, and it does not drive the binding constraint or P1.

## Section 7. Recommended pm-skill prompts (copy/paste ready)

#### To execute P1: decide format and delivery

**Skill:** `define-problem-statement`
**Why this skill:** P1 needs a crisp, evidence-grounded framing of the real decision (format and delivery, not "add an export button") before customer outreach.
**Source:** S5, S6, S8

**Prompt:**
> Frame the problem behind a Q3 enterprise data-export feature. Context: customers are capped at a 1,000-row export; three top-10 accounts raised it at QBRs, support sees 4 to 5 tickets a week, and two active deals are blocked. The proposed solution is a background CSV emailed as a download link, but we do not know if customers want CSV or a warehouse/Snowflake share, and legal has not ruled on emailing customer data. Produce a problem statement that centers the unmade format-and-delivery decision and its two blockers (customer preference, legal), with user impact and a measurable success bar.

#### To execute P3: scope the build

**Skill:** `deliver-prd`
**Why this skill:** once P1 decides format and delivery, P3 needs an eng-ready PRD scoped to exactly that decision and the three-week window.
**Source:** S7, S8

**Prompt:**
> Write a PRD for an enterprise bulk-export feature, scoped to a three-week Q3 build for the enterprise tier only. Assume the format-and-delivery decision from discovery is settled. Exclude scheduled exports. Cover the export surface, the warehouse query-load handling, the legal-approved delivery mechanism, success metrics tied to unblocking two active deals, and explicit non-goals.

## Section 8. Evidence and source map

| Claim / recommendation | Source ID | Exact quote |
|---|---|---|
| Demand is real and multi-channel | S1 | "Three of our top-10 accounts mentioned it on QBRs last quarter" |
| Ongoing support pain at the row cap | S2 | "Support gets maybe 4-5 tickets a week asking how to export more than the current 1,000-row limit" |
| Revenue pressure | S3 | "Sales says it's a blocker in two active deals" |
| Load is a design risk | S4 | "The data team is worried about query load on the warehouse during business hours" |
| Legal is unresolved (blocks P1) | S5 | "Legal hasn't weighed in on whether we can email download links with customer data" |
| Format is undecided (blocks P1) | S6 | "We don't know if customers want CSV specifically or if they'd be happier with a direct warehouse/Snowflake share" |
| Build window | S7 | "eng has ~3 weeks if we want it in the Q3 release" |
| The proposal is a hypothesis | S8 | "Add an 'Export all' button that generates a CSV in the background and emails a download link when ready" |

**Inferred (Low confidence) claims:** the pricing-backlash risk only. Confirmed: it does not drive the binding constraint or P1.
**Evidence gaps:** no stated success metric (Q3), and no data on whether customers would pay for export. Both are flagged in Section 4, not treated as fact.
