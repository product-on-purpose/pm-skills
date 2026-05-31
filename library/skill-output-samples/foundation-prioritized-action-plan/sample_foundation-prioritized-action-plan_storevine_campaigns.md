---
title: "Prioritized Action Plan: Storevine Campaigns Second-Send Stall"
description: "Storevine B2B ecommerce platform. A prioritized action plan for the Campaigns growth PM after the second-campaign rate stalls post-GA, using Theory of Constraints and Cynefin."
artifact: foundation-prioritized-action-plan
version: "1.0"
repo_version: "2.23.0"
skill_version: "1.0.0"
created: 2026-05-31
status: sample
thread: storevine
context: Storevine B2B ecommerce platform. Campaigns GA'd May 2026; the first-campaign rate is healthy but the second-campaign rate is stalling, and the growth PM needs a ranked next-action plan before spending the quarter's eng capacity.
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Sample: foundation-prioritized-action-plan. Storevine Campaigns Second-Send Stall

## Scenario

Storevine's Campaigns feature (native email and SMS re-engagement) shipped in May 2026. The guided first-campaign flow lifted the first-send rate to 31.7% [fictional], but three months in, merchants who send one campaign rarely send a second. The growth PM has organized context from support, sales, and the analytics dashboard, and wants a ranked plan before committing the quarter's eng capacity. The company-level forcing function is a churn-reduction OKR, and Campaigns engagement is a known leading indicator.

**Source Notes:**

- Storevine is fictional; all metrics marked `[fictional]`.
- Continuation of the Storevine Campaigns thread (see the `measure-experiment-results` and `foundation-okr-writer` storevine samples).
- The skill classifies this as Complicated (Cynefin) and applies Theory of Constraints to rank the plan.

---

## Prompt

```
foundation-prioritized-action-plan

Context: Storevine Campaigns (native email/SMS re-engagement), GA'd May 2026. 15K merchants, ~70-person team.

Situation: First-campaign rate is healthy (31.7% [fictional] after the guided-flow A/B), but the second-campaign rate is stalling at 22.8% [fictional] and flattening. Merchants send one campaign, see modest results, and don't return. Support sees ~6 tickets/week asking "why did my campaign underperform" with no clear next step in-product. Sales flags two mid-market deals where the buyer asked about "campaign automation / sequences" which we don't have. Eng has ~4 weeks of Campaigns capacity this quarter.

The company OKR is to cut 12-month merchant churn 18% to 14% [fictional]; Campaigns engagement is a leading indicator.

Question: what should we do next to turn Campaigns into a sustained channel?
```

---

## Output

### Step 0: Source ledger

```
S1: "the second-campaign rate is stalling at 22.8% [fictional] and flattening" (origin: pasted prompt, Situation)
S2: "Merchants send one campaign, see modest results, and don't return" (origin: pasted prompt, Situation)
S3: "Support sees ~6 tickets/week asking "why did my campaign underperform" with no clear next step in-product" (origin: pasted prompt, Situation)
S4: "Sales flags two mid-market deals where the buyer asked about "campaign automation / sequences" which we don't have" (origin: pasted prompt, Situation)
S5: "Eng has ~4 weeks of Campaigns capacity this quarter" (origin: pasted prompt, Situation)
S6: "cut 12-month merchant churn 18% to 14% [fictional]" (origin: pasted prompt, OKR)
S7: "First-campaign rate is healthy (31.7% [fictional] after the guided-flow A/B)" (origin: pasted prompt, Situation)
```

### Section 0. Executive summary

- **Situation classification:** Complicated (Cynefin). The stall is diagnosable from data and support signal, not emergent.
- **The binding constraint:** the missing post-first-campaign path. After the first send, the product offers no clear next step (S3) and no automation (S4), so repeat usage decays (S2).
- **The critical next effort (P1):** diagnose where and why second campaigns stall before building anything, so the 4-week window funds the right fix.
- **Overall plan confidence:** Medium-High. Well-sourced; residual risk is that diagnosis splits between a guidance gap and a results-quality problem.
- **Time-to-value:** about one week to a diagnosis that points the build.

### Section 1. Input mirror - what I understand

- **What you gave me:** Campaigns activates merchants well on the first send (S7) but does not retain them into a second (S1, S2); support sees confusion with no in-product next step (S3); sales hears demand for automation/sequences (S4); you have a 4-week eng window (S5) and a churn OKR that Campaigns engagement feeds (S6).
- **What you appear to be trying to accomplish:** turn Campaigns from a one-time action into a sustained channel that moves the churn metric. Confidence: High (intent is explicit).
- **Adjacent intents I noticed but did not assume:** building automation/sequences (S4), and improving campaign results quality. Neither is assumed to be the answer yet.

### Section 2. Situation classification (Cynefin)

**Domain:** Complicated. **Source:** S1, S2, S3.

Cause and effect are knowable with analysis. You already have the shape of the problem (a sharp first-to-second-send drop, S1) and converging signal about why (no in-product next step, S3). This is not Complex: the outcome is not unpredictable, it is a diagnosable funnel with a likely mechanism. Posture: analyze the drop-off, then commit. Confidence ceiling: Medium-High.

### Section 3. The binding constraint (Theory of Constraints)

- **System and goal:** make Campaigns a repeated behavior so it moves merchant retention.
- **The constraint:** the post-first-campaign path. Nothing in the product tells a merchant what to do after their first send (S3), and there is no automation to carry them forward (S4), so they send once and stop (S2).
- **Source:** S2, S3, S4.
- **Candidate constraints considered:** (1) Results quality ("modest results", S2). Real, but subordinate: even strong results decay without a next step. (2) The automation feature gap (S4). That is a candidate solution, not the constraint, until the diagnosis confirms automation is what lifts repeat sends.
- **Why P1 lifts it:** diagnosing exactly where the second send is lost converts a guess into a targeted fix for the binding path.

### Section 4. Prioritized questions, gaps, and open decisions

| Rank | Question / gap | Why it matters | Decision required? | How to resolve |
|---|---|---|---|---|
| Q1 | Where exactly do merchants drop between send 1 and send 2? (S1) | Determines whether the fix is guidance, results, or automation | Yes, blocks P1 | Funnel analysis of first-send merchants |
| Q2 | Do the "underperform" tickets share a root cause? (S3) | Tells us if a results problem masquerades as a guidance gap | No, resolve by P1 | Tag and cluster the ~6/week tickets |
| Q3 | Is automation/sequences what merchants want, or a sales artifact? (S4) | Avoids building a heavy feature on two deals | No | Check demand against the broader merchant base in P1 |
| Q4 | What second-send rate moves the churn OKR? (S6) | Sets the success bar for the quarter | Yes | PM and growth agree a target |

### Section 5. The prioritized action plan

#### P1. Diagnose the second-send drop-off

- **Why:** lifts the binding constraint by locating exactly where merchants stop (S1, S2). The 4-week window (S5) must not be spent guessing.
- **What:** a one-page diagnosis of the first-to-second-send funnel with the dominant drop point and reason.
- **How:** (1) Build the funnel from first send to second send. (2) Tag and cluster the support tickets (S3). (3) Cross-check automation demand (S4) against the full base.
- **Confidence:** Medium-High. Respects the Complicated ceiling.
- **Source:** S1, S2, S3.
- **Expected outcome / success signal:** a named drop point and reason that picks the P2 fix.
- **Estimated effort:** about 1 week.
- **Dependencies:** none.

#### P2. Close the post-send "what now" gap

- **Why:** the most likely diagnosis is the missing in-product next step (S3); a lightweight guidance fix is far cheaper than automation and tests the constraint directly.
- **What:** an in-product post-send state that shows results plainly and offers the obvious next action.
- **How:** (1) Add a post-send results-and-next-step view. (2) Prompt a relevant second campaign. (3) Measure the second-send rate against baseline (S1).
- **Confidence:** Medium. Depends on P1.
- **Source:** S3, S2.
- **Expected outcome / success signal:** second-send rate climbs off 22.8% [fictional].
- **Estimated effort:** about 2 weeks of the window (S5).
- **Dependencies:** P1.

#### P3. Scope automation/sequences only if P1 supports it

- **Why:** automation (S4) is the heaviest option and is currently evidenced by two deals; build it only if P1 shows repeat sending is genuinely demand-limited, not guidance-limited.
- **What:** a scoped decision on whether a basic sequence ships this quarter or is deferred.
- **How:** (1) Weigh P1 demand evidence. (2) If justified, scope the smallest useful sequence. (3) Otherwise defer and revisit next quarter.
- **Confidence:** Low-Medium. Contingent on P1.
- **Source:** S4, S5.
- **Expected outcome / success signal:** a defensible build-or-defer call that fits the 4-week window.
- **Estimated effort:** the remaining window if built; near-zero if deferred.
- **Dependencies:** P1, P2.

**Sequencing (Now / Next / Later)**

| Now | Next | Later |
|---|---|---|
| P1 | P2 | P3 (conditional) |

**What to defer / what NOT to do**

- Do not build automation/sequences (S4) before P1; two deals are not a mandate.
- Do not spend the 4-week window (S5) until the drop point is named.
- Do not treat "modest results" as the cause without ticket evidence.

### Section 6. Risks and pre-mortem

| Risk | Likelihood | Impact | Early signal | Mitigation | Source |
|---|---|---|---|---|---|
| The real issue is results quality, not guidance | M | H | P1 tickets cluster on deliverability/targeting | Pivot P2 toward results, not a next-step nudge | S2, S3 |
| Automation gets prioritized on sales pressure | M | H | Roadmap fills with sequences before P1 reads | Gate P3 on P1 demand evidence | S4 |
| 4-week window slips on a guidance-then-automation pivot | L | M | P2 scope creeps toward sequences | Hold P2 to the lightweight next-step fix | S5 |

### Section 7. Recommended pm-skill prompts (copy/paste ready)

#### To execute P1: diagnose the drop-off

**Skill:** `measure-experiment-results`
**Why this skill:** P1 is a funnel diagnosis that benefits from a disciplined readout of where and why the second send is lost.
**Source:** S1, S2

**Prompt:**
> Analyze the Storevine Campaigns first-to-second-send funnel. First-send rate is 31.7% [fictional]; second-send rate is stalling at 22.8% [fictional] and flattening. Merchants send once, see modest results, and do not return; support sees ~6 tickets/week asking why a campaign underperformed with no clear in-product next step. Identify the dominant drop point between send 1 and send 2 and the most likely cause, separating a guidance gap from a results-quality problem, and flag where evidence is thin.

#### To execute P2: spec the post-send fix

**Skill:** `deliver-prd`
**Why this skill:** once P1 names the drop point, P2 needs an eng-ready spec scoped to the 4-week window.
**Source:** S3, S5

**Prompt:**
> Write a PRD for an in-product post-campaign state in Storevine Campaigns that shows results plainly and offers the obvious next action to drive a second send. Scope to roughly two weeks of eng capacity, exclude automation/sequences, and tie success to lifting the second-send rate off 22.8% [fictional]. Assume the drop-point diagnosis from discovery is settled.

### Section 8. Evidence and source map

| Claim / recommendation | Source ID | Exact quote |
|---|---|---|
| Second send is stalling | S1 | "the second-campaign rate is stalling at 22.8% [fictional] and flattening" |
| Merchants send once and stop | S2 | "Merchants send one campaign, see modest results, and don't return" |
| No in-product next step | S3 | "Support sees ~6 tickets/week asking "why did my campaign underperform" with no clear next step in-product" |
| Automation demand (thin) | S4 | "Sales flags two mid-market deals where the buyer asked about "campaign automation / sequences" which we don't have" |
| Build window | S5 | "Eng has ~4 weeks of Campaigns capacity this quarter" |
| Strategic tie to churn | S6 | "cut 12-month merchant churn 18% to 14% [fictional]" |

**Inferred (Low confidence) claims:** none load-bearing; every effort cites a quote.
**Evidence gaps:** no agreed second-send target (Q4) and no validated read on whether automation demand generalizes beyond two deals; both are flagged, not assumed.
