---
title: "Prioritized Action Plan: Workbench Blueprints Approval-Gate Stall"
description: "Workbench enterprise collaboration platform. A prioritized action plan to lift the Blueprints approval-gate completion rate without weakening compliance enforceability, classified Complicated."
artifact: foundation-prioritized-action-plan
version: "1.0"
repo_version: "2.23.0"
skill_version: "1.0.0"
created: 2026-05-31
status: sample
thread: workbench
context: Workbench enterprise collaboration platform. Blueprints GA'd in Q2; the approval-gate completion rate is low and abandonment is high, and the PM needs a ranked plan that satisfies product, sales, eng, and compliance before the QBR.
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Sample: foundation-prioritized-action-plan. Workbench Blueprints Approval-Gate Stall

## Scenario

Workbench's Blueprints feature (document templates with required sections and role-based approval gates) GA'd in Q2. Blueprint creation is strong, but more than half of submitted blueprints stall in approval and are abandoned. Launch-week notification incidents eroded trust with two strategic accounts, sales hears that approvals are clunky, and legal needs the gates to stay enforceable. The enterprise PM provides a fully structured prompt with named stakeholders and quantified baselines and needs a ranked plan before the QBR. The cause is diagnosable, so the skill classifies this Complicated.

**Source Notes:**

- Workbench is fictional; all metrics marked `[fictional]`.
- Continuation of the Workbench Blueprints thread (see the `deliver-prd` and `iterate-retrospective` workbench samples).
- Enterprise prompt style with formal "First L." stakeholder names, per the thread convention.

---

## Prompt

```
foundation-prioritized-action-plan

Context: Workbench Blueprints (document templates with required sections + role-based approval gates), GA'd Q2 2026. 500 enterprise customers, 200-person company, Series B.

Baselines: Blueprint creation is healthy (142 blueprints created across 38 accounts [fictional]), but the approval-gate completion rate is 41% [fictional] - more than half of submitted blueprints stall in "pending approval" and are abandoned within 14 days. Three launch-week incidents (approval notifications not firing) were resolved but eroded trust with two strategic accounts.

Stakeholders: Sandra C. (Head of Product) wants approval completion up before the QBR; Karen L. (Eng Lead, Blueprints) has ~4 weeks capacity; Mei-Lin T. (Enterprise Sales) says two renewals cite "approvals are clunky"; legal/compliance (the original buyer) needs the gates to stay enforceable.

Target: approval-gate completion rate 41% -> target 70% [fictional] by end of Q3.

Ask: prioritized plan to fix approval-gate completion without weakening compliance enforceability.
```

---

## Output

### Step 0: Source ledger

```
S1: "the approval-gate completion rate is 41% [fictional]" (origin: pasted prompt, Baselines)
S2: "more than half of submitted blueprints stall in "pending approval" and are abandoned within 14 days" (origin: pasted prompt, Baselines)
S3: "Three launch-week incidents (approval notifications not firing) were resolved but eroded trust with two strategic accounts" (origin: pasted prompt, Baselines)
S4: "Karen L. (Eng Lead, Blueprints) has ~4 weeks capacity" (origin: pasted prompt, Stakeholders)
S5: "Mei-Lin T. (Enterprise Sales) says two renewals cite "approvals are clunky"" (origin: pasted prompt, Stakeholders)
S6: "legal/compliance (the original buyer) needs the gates to stay enforceable" (origin: pasted prompt, Stakeholders)
S7: "approval-gate completion rate 41% -> target 70% [fictional] by end of Q3" (origin: pasted prompt, Target)
S8: "Blueprint creation is healthy (142 blueprints created across 38 accounts [fictional])" (origin: pasted prompt, Baselines)
```

### Section 0. Executive summary

- **Situation classification:** Complicated (Cynefin). The low completion rate is diagnosable from the approval funnel and the known notification failures.
- **The binding constraint:** the approval step itself. Creation is healthy (S8) but submitted blueprints stall pending approval (S2); the approval-completion rate (S1) is the system bottleneck.
- **The critical next effort (P1):** instrument the approval funnel to locate where blueprints stall before building a fix.
- **Overall plan confidence:** Medium-High. Strong baselines and a known incident history (S3) make the cause analyzable.
- **Time-to-value:** about one week to a funnel diagnosis pointing the build.

### Section 1. Input mirror - what I understand

- **What you gave me:** creation is strong (S8) but only 41% of approvals complete (S1); most submissions stall and are abandoned (S2); launch-week notification failures hurt two strategic accounts (S3); sales hears "approvals are clunky" (S5); legal needs enforceability preserved (S6); Karen L. has a 4-week window (S4); the target is 70% by end of Q3 (S7).
- **What you appear to be trying to accomplish:** lift approval completion to 70% before the QBR without weakening compliance. Confidence: High (explicit target and constraints).
- **Adjacent intents I noticed but did not assume:** weakening or making gates optional, and a notification-system rebuild. Neither is assumed to be the fix.

### Section 2. Situation classification (Cynefin)

**Domain:** Complicated. **Source:** S1, S2, S3.

Cause and effect are knowable with analysis. You have a clear bottleneck (approvals, S1, S2), a quantified baseline, and a known prior failure mode (notifications not firing, S3) that gives a strong first hypothesis. This is not Complex: the approval funnel is instrumentable and the likely mechanisms are finite (notification reliability, approver UX, role configuration). Posture: analyze the funnel, then commit. Confidence ceiling: Medium-High.

### Section 3. The binding constraint (Theory of Constraints)

- **System and goal:** get submitted blueprints through approval so the feature delivers its compliance value.
- **The constraint:** the approval step. Creation is not the limiter (S8); the system stalls when a blueprint sits in "pending approval" and is abandoned (S2), which is exactly what the 41% completion rate measures (S1).
- **Source:** S1, S2, S8.
- **Candidate constraints considered:** (1) Notification reliability (S3). A strong hypothesis given the launch-week failures, but it must be confirmed as the current cause, not assumed from history. (2) Approver UX ("clunky", S5). Plausible and diagnosable. Both are likely sub-causes within the constraint, which P1 will rank.
- **Why P1 lifts it:** instrumenting submitted to approved isolates the dominant stall, so the 4-week window (S4) fixes the real cause, not the remembered one.

### Section 4. Prioritized questions, gaps, and open decisions

| Rank | Question / gap | Why it matters | Decision required? | How to resolve |
|---|---|---|---|---|
| Q1 | Where in submitted-to-approved do blueprints stall? (S2) | Determines whether the fix is notifications, approver UX, or roles | Yes, blocks P1 | Instrument the approval funnel |
| Q2 | Are notifications still failing, or just historically? (S3) | Avoids fixing a resolved problem | Yes, blocks P1 | Audit current notification delivery |
| Q3 | What makes approvals feel "clunky"? (S5) | Tells us if approver UX is the dominant stall | No, resolve by P1 | Approver-side session review |
| Q4 | Which fixes preserve enforceability? (S6) | A faster gate that weakens compliance fails the original buyer | Yes | Review each candidate fix with legal |

### Section 5. The prioritized action plan

#### P1. Instrument the approval funnel

- **Why:** lifts the binding constraint by locating the dominant stall between submitted and approved (S2). The 4-week window (S4) must fund the real cause.
- **What:** a funnel from submitted to approver-notified to approver-acted to completed, with the largest drop named.
- **How:** (1) Instrument each approval transition. (2) Audit current notification delivery (S3). (3) Review approver-side sessions for the "clunky" friction (S5).
- **Confidence:** Medium-High. Respects the Complicated ceiling.
- **Source:** S1, S2, S3.
- **Expected outcome / success signal:** the dominant stall point named, with notifications confirmed or cleared.
- **Estimated effort:** about 1 week.
- **Dependencies:** none.

#### P2. Fix the dominant stall without weakening the gate

- **Why:** once P1 names the stall, a targeted fix moves completion toward 70% (S7) while keeping gates enforceable (S6).
- **What:** the specific fix (reliable approver notifications, an approver action surface, or clearer role routing), reviewed with legal.
- **How:** (1) Build the targeted fix in the window (S4). (2) Run each candidate past legal for enforceability (S6). (3) Measure completion against the 41% baseline (S1).
- **Confidence:** Medium. Depends on P1.
- **Source:** S6, S7, S4.
- **Expected outcome / success signal:** approval completion climbs off 41% [fictional] toward target.
- **Estimated effort:** about 2 to 3 weeks of the window.
- **Dependencies:** P1.

#### P3. Repair trust with the two strategic accounts

- **Why:** the launch-week incidents (S3) and the "approvals are clunky" renewal signal (S5) put two accounts at risk; a direct fix-and-follow-up protects revenue.
- **What:** a targeted outreach with the fix timeline for the affected accounts.
- **How:** (1) Mei-Lin T. and product brief the two accounts. (2) Share the P2 fix and timeline. (3) Confirm the incident root cause is closed.
- **Confidence:** Medium.
- **Source:** S3, S5.
- **Expected outcome / success signal:** both accounts acknowledge the fix; renewal risk drops.
- **Estimated effort:** a few days, parallel to P2.
- **Dependencies:** P1 (to speak credibly about the cause).

**Sequencing (Now / Next / Later)**

| Now | Next | Later |
|---|---|---|
| P1 | P2, P3 | Re-measure against the 70% target |

**What to defer / what NOT to do**

- Do not make gates optional or weaken enforceability (S6) to raise completion.
- Do not rebuild the notification system before P1 confirms it is the current cause (S3).
- Do not commit the 4-week window (S4) until P1 names the dominant stall.

### Section 6. Risks and pre-mortem

| Risk | Likelihood | Impact | Early signal | Mitigation | Source |
|---|---|---|---|---|---|
| Pressure to hit 70% leads to weakening gates | M | H | Proposals to make sections optional appear | Hold the enforceability line; route every fix past legal | S6, S7 |
| Team fixes notifications, but UX was the real stall | M | H | P1 shows approvers see notices but do not act | Prioritize the approver action surface over re-plumbing notifications | S3, S5 |
| Strategic accounts churn before the fix lands | M | H | A renewal date precedes the P2 ship date | Run P3 in parallel with a concrete timeline | S3, S5 |
| 4-week window underestimates the fix | L | M | P1 reveals a role-config root cause | Scope P2 to the single dominant stall only | S4 |

### Section 7. Recommended pm-skill prompts (copy/paste ready)

#### To execute P1: instrument the funnel

**Skill:** `measure-instrumentation-spec`
**Why this skill:** P1 needs a precise event spec for the approval funnel so the diagnosis is measured, not guessed.
**Source:** S1, S2

**Prompt:**
> Write an instrumentation spec for the Workbench Blueprints approval funnel. We need to measure each transition from blueprint submitted to approver notified to approver acted to approval completed, so we can locate where the 41% [fictional] completion rate stalls (most submissions sit in "pending approval" and are abandoned within 14 days). Include event names, properties, the approver identity and role, notification delivery status, and time-in-state, and call out what we must capture to distinguish a notification failure from an approver-UX stall.

#### To execute P2: spec the targeted fix

**Skill:** `deliver-prd`
**Why this skill:** once P1 names the stall, P2 needs an eng-ready spec scoped to the 4-week window that preserves enforceability.
**Source:** S4, S6

**Prompt:**
> Write a PRD for a Blueprints approval-completion fix scoped to about four weeks of eng capacity, targeting a move from 41% to 70% [fictional] approval completion by end of Q3. Assume discovery identified the dominant stall in the submitted-to-approved funnel. The fix must keep the approval gates enforceable for legal/compliance (no optional gates). Cover the approver notification and action experience, success metrics tied to completion rate, and explicit non-goals.

### Section 8. Evidence and source map

| Claim / recommendation | Source ID | Exact quote |
|---|---|---|
| Approval completion is low | S1 | "the approval-gate completion rate is 41% [fictional]" |
| Submissions stall and are abandoned | S2 | "more than half of submitted blueprints stall in "pending approval" and are abandoned within 14 days" |
| Notification incidents eroded trust | S3 | "Three launch-week incidents (approval notifications not firing) were resolved but eroded trust with two strategic accounts" |
| Build window | S4 | "Karen L. (Eng Lead, Blueprints) has ~4 weeks capacity" |
| Renewal risk on clunky approvals | S5 | "Mei-Lin T. (Enterprise Sales) says two renewals cite "approvals are clunky"" |
| Enforceability constraint | S6 | "legal/compliance (the original buyer) needs the gates to stay enforceable" |
| Target | S7 | "approval-gate completion rate 41% -> target 70% [fictional] by end of Q3" |
| Creation is not the limiter | S8 | "Blueprint creation is healthy (142 blueprints created across 38 accounts [fictional])" |

**Inferred (Low confidence) claims:** none load-bearing; every effort cites a quote.
**Evidence gaps:** whether notifications are currently failing or only historically (Q2) is unconfirmed; the plan treats it as a hypothesis to test in P1, not a fact.
