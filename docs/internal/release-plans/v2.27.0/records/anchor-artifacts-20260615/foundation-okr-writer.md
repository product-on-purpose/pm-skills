<!-- Anchor artifact: foundation-okr-writer (framing) | scenario activation-quarter | 2026-06-15 anchor run wf_c1261234-93a, G=1.
     This was the draft all three blind judges scored (anchor run wf_c1261234-93a). The scored original is preserved in git at the 2026-06-15 anchor commit; an operating layer (decisions / owners / maintainer fix-notes) was added 2026-06-15 per maintainer review. -->

**Mode detected: One-Shot** (the brief is a raw planning prompt; following `--oneshot` convention for this eval task - one complete pass with assumptions labeled).

**Empowered-team diagnostic:** The brief explicitly states the roadmap is committed by leadership and cannot be dropped mid-cycle. Signal: `feature-team`.

---

# OKR Set: Activation Squad, 2026-Q3

## Context

- Scope: team
- Cycle: 2026-Q3 (assumed; "this quarter" per brief, current date 2026-06-15 places this in the upcoming quarter)
- Level: squad within a B2B SaaS analytics product
- OKR type: aspirational (primary KRs) + learning (one evidence-generation KR)
- Empowered-team signal: feature-team (roadmap is committed by leadership; the checklist redesign and three connectors cannot be dropped mid-cycle)
- Source of truth: {replace with your live OKR tracker - company OKR doc, Confluence page, Notion, Gtmhub, or equivalent; this artifact is a planning input only}
- Strategic input: "More signups become active, paying teams" - leadership strategy pillar; activation is the identified funnel leak before additional acquisition spend
- Assumptions:
  - "Activated" will be defined this cycle as "invited a teammate AND created a dashboard" (the team must pick one definition before the OKR set is finalized - see Open Questions)
  - Current signup-to-activation rate of ~22% is directionally accurate, though the fuzzy definition means the true baseline requires re-measurement once the definition is locked
  - Free-to-paid conversion within 30 days at ~6% is the primary lagging business outcome this activation squad can meaningfully influence
  - Time-to-first-dashboard is not currently instrumented; instrumentation is a prerequisite, not a given
  - The three connectors (Salesforce, HubSpot, Segment) are expected to reduce integration friction as a pathway to activation for integration-dependent user segments

---

## Objective

Turn the post-signup experience into a reliable path to value so that meaningfully more new users reach their first "aha moment" and convert to paying teams within 30 days.

---

## Key Results

- KR1: Increase signup-to-activation rate from 22% to 32% by end of Q3
  - Metric: percentage of users who sign up in the cohort window and reach the agreed activation definition (see Open Questions #1) within 14 days of signup
  - Baseline: ~22% as of Q2 close (assumption - requires re-measurement once activation definition is locked; mark current figure as `assumption, pending definition lock`)
  - Target: 32% by 2026-09-30
  - Evidence source: product analytics platform (e.g., Mixpanel, Amplitude, or internal event pipeline); requires clean instrumentation of the locked activation event
  - Owner: Activation squad
  - Indicator class: leading (leading indicator of paid conversion)
  - Confidence: medium (the 22% baseline is fuzzy due to definition inconsistency; confidence improves once definition is locked and re-baselined)

- KR2: Increase free-to-paid conversion within 30 days from 6% to 9% by end of Q3
  - Metric: percentage of free-tier users who convert to a paid plan within 30 days of signup, measured on the same Q3 signup cohort
  - Baseline: ~6% (as of last measured period; treat as `assumption` - confirm with finance or billing data)
  - Target: 9% by 2026-09-30
  - Evidence source: billing system or CRM (source of record for paid plan start date cross-referenced against signup date)
  - Owner: Activation squad (influencing lever); Revenue/Growth squad (dependency for billing data access)
  - Indicator class: lagging (the business outcome this squad's work ultimately serves)
  - Confidence: low (the squad influences but does not fully own this metric; pricing, sales-assist motions, and plan structure also drive it; the KR is included because it is the strategy outcome, but the team should not be held solely accountable)

- KR3: Establish a measured baseline for median time-to-first-dashboard by week 4 of Q3, and improve it by 25% from that baseline by end of Q3
  - Metric: median elapsed time (in minutes) from account creation to the first dashboard being saved, across new signups
  - Baseline: `recommended-to-measure` - not currently instrumented; instrumentation sprint in week 1-2 is a prerequisite
  - Target: reduce median time by 25% from the week-4 baseline, by 2026-09-30
  - Evidence source: product event log (requires new instrumentation event: `dashboard_created` with `signup_timestamp` linkage)
  - Owner: Activation squad (instrumentation) + Engineering (event pipeline)
  - Indicator class: leading (speed to first value is a leading predictor of activation and retention)
  - Confidence: low (baseline is unknown; the 25% reduction target is `placeholder` until baseline is established; revisit at week-4 checkpoint)

- KR4: Generate 5 validated insights about new-user friction by week 6, informing Q4 planning
  - Metric: count of distinct friction findings - each backed by at minimum 3 interview observations or a statistically notable data signal - documented in the team's research repository
  - Baseline: 0 structured activation-friction insights in current research repository (assumption)
  - Target: 5 validated insights by 2026-08-01 (week 6 of Q3)
  - Evidence source: customer interview synthesis notes (Dovetail, Notion, or equivalent research repo) cross-referenced against product analytics patterns
  - Owner: Activation squad PM + UX researcher (if available)
  - Indicator class: evidence_generation (feeds next cycle's outcome targets)
  - Confidence: high (the team controls the research activity; the risk is insight quality, not completion)

---

## Initiatives as Bets

- Initiative 1: Redesigned onboarding checklist
  - Expected KR impact: KR1 (signup-to-activation rate), KR3 (time-to-first-dashboard)
  - Hypothesis: A clearer, more task-prioritized checklist reduces the cognitive load on new users and surfaces the highest-value first actions faster, increasing the share who reach the activation milestone within 14 days
  - Dependency: Design review and content strategy sign-off; instrumentation of checklist interaction events to validate the hypothesis post-ship

- Initiative 2: Salesforce, HubSpot, and Segment integration connectors (3 connectors)
  - Expected KR impact: KR1 (for integration-dependent user segments), KR2 (conversion for users whose activation is gated on data connectivity)
  - Hypothesis: A segment of B2B signups stalls because their data lives in CRM and CDP tools; native connectors remove that blocker and allow those users to reach first value without engineering intervention
  - Dependency: Partner API access confirmed; connector scope scoped to read-only initial pass to ship within cycle; product marketing alignment on in-app connector discovery placement

- Initiative 3: 10 new-user onboarding interviews
  - Expected KR impact: KR4 (validated friction insights), KR1 and KR3 (indirectly, by informing mid-cycle checklist iteration)
  - Hypothesis: Direct observation of new users navigating signup-to-first-dashboard will surface friction points not visible in click data, enabling the team to prioritize the highest-leverage changes for Q4
  - Dependency: Recruiting pipeline (customer success or sales intro, in-app intercept, or panel); 60-minute session slots; synthesis framework agreed before interviews begin

- Initiative 4: Activation event instrumentation
  - Expected KR impact: KR3 (establishes the baseline without which the target is undefined), KR1 (sharpens the activation definition's measurability)
  - Hypothesis: Clean instrumentation of `dashboard_created` and `teammate_invited` events, linked to signup timestamp, gives the team a reliable signal to score KR1 and KR3 each week rather than waiting for end-of-quarter batch reporting
  - Dependency: Engineering capacity in weeks 1-2; data pipeline and analytics tool access for the new events

---

## Guardrails and Health Checks

- Guardrail 1: Onboarding checklist completion rate must not decrease from its current level when the redesign ships
  - Why: The team has a history of shipping onboarding changes that lifted checklist completion (a vanity metric) without moving activation or conversion. This guardrail prevents the reverse: the redesign should not degrade even the vanity signal while chasing the outcome KRs. If checklist completion drops, investigate usability regression before attributing it to healthy simplification.

- Guardrail 2: Support ticket volume from new users (first 14 days post-signup) must not increase quarter-over-quarter
  - Why: Speed-to-activation initiatives can create confusion if they skip explanatory steps. A rising support load from confused new users signals the experience is faster but not clearer. Track via support system tag or new-user ticket queue; alert threshold is any week-over-week increase exceeding 15% sustained for two consecutive weeks.

- Guardrail 3: Free-to-paid conversion rate among users who do NOT reach the activation milestone must not be used to explain away a flat KR2
  - Why: This is an integrity guardrail, not a metric. If the squad reports "conversion is up for activated users" while overall conversion stays flat, that is a selection effect, not a win. KR2 must be measured on the full signup cohort, not a filtered segment.

---

## Alignment Notes

- Parent or strategy link: "More signups become active, paying teams" strategy pillar owned by leadership; this squad owns the activation leg of the funnel
- Peer dependencies:
  - Revenue/Growth squad: KR2 (free-to-paid conversion) requires billing data access; paid plan change events must be joinable to signup cohort
  - Data/Engineering platform team: KR3 and KR4 instrumentation (new events in the pipeline); without this, KR3 baseline cannot be established
  - Sales/Customer success: interview recruiting pipeline for Initiative 3; warm intros to new users willing to do sessions
  - Product marketing: connector discovery placement (Initiative 2) affects whether integration-path users find and use the new connectors
- Known conflicts: If the Growth team is running acquisition experiments this quarter that change the composition of the signup cohort (e.g., targeting a new segment or market), the baseline-to-target comparison for KR1 and KR2 may be confounded; coordinate on cohort tagging
- Out of scope this cycle: Retention after first 30 days; re-engagement of dormant users; pricing or packaging changes; enterprise onboarding (high-touch, sales-led); mid-funnel nurture email sequences

---

## Disclosure

This OKR set frames pre-committed work as outcome bets. The checklist redesign and the three integration connectors are roadmap commitments that cannot be dropped mid-cycle. If the activation rate and conversion metrics do not move when the work ships, that is a learning, not a delivery failure - the work may still have been worth doing for other reasons, and the non-movement is signal for Q4 planning. The team's lever this cycle is to keep shipping and to instrument the outcomes carefully. The OKR's lever is to ensure the post-cycle review updates next-cycle prioritization based on what actually moved.

---

## Quality Audit

- Strategic fit: pass - the objective and KRs map directly to the "more signups become active, paying teams" strategy pillar; the connection is explicit and not assumed
- Objective quality: pass - qualitative, directional, avoids embedded metrics, describes a state change (reliable path to value / first aha moment / paid conversion) rather than a project or activity
- KR outcome quality: pass - KR1, KR2, and KR3 are outcome or behavior-change metrics; KR4 is classified as evidence_generation (a learning KR, not a task count); the original draft items "launch checklist," "ship connectors," and "run 10 interviews" were correctly moved to Initiatives
- Measurement quality: risk - KR1 baseline is `assumption` pending definition lock; KR3 baseline is `recommended-to-measure` (not instrumented); KR2 baseline needs confirmation from billing data; KR4 is well-specified. The risks are flagged explicitly; no values were fabricated.
- Product influence: risk - KR2 (free-to-paid conversion) is partially outside the squad's direct control (pricing, sales-assist, plan structure also influence it); this risk is disclosed in the KR's confidence rating and dependency notes; KR1 and KR3 are squarely in the squad's influence zone
- Focus: pass - 1 objective, 4 KRs; the four KRs are at the high end of the 2-to-4 range but each serves a distinct purpose (leading activation, lagging conversion, speed signal, research); if forced to cut, KR4 (insights) is the most defensible drop since it is evidence-generation rather than a primary outcome
- Guardrails: pass - three guardrails address the specific anti-patterns raised in the brief: checklist completion gaming, support load increase from confusing the experience, and cohort selection theater on KR2
- Alignment: pass - parent pillar, peer dependencies (billing data, instrumentation pipeline, CS recruiting, product marketing), and out-of-scope boundaries are all explicit
- Operating rhythm: risk - check-in cadence, weekly review, and cycle close review are not specified; the brief did not supply this information; the squad should add explicit check-in dates before the planning review
- Integrity: pass - no fabricated baselines or targets; missing values are marked with the correct placeholder labels; no compensation-coupling language; team-level OKRs throughout
- Empowered-team Disclosure: pass - Disclosure section is present; empowerment signal is `feature-team`; framing adjusts the meaning of a non-moving metric from failure to learning

---

## Decisions, Owners & Open Items

> Operating layer (added 2026-06-15, maintainer review). The Quality Audit flagged operating-rhythm as a
> risk; this section makes the open decisions ownable and adds the review cadence so the set is ready for
> the planning review, not just well-drafted. Owners/dates are illustrative for this scenario.

| ID | Title | Final decision (summary) | Status | Owner | Due | Last updated |
|----|-------|--------------------------|--------|-------|-----|--------------|
| D-1 | Activation definition | Default: dashboard AND teammate within 14d; hard gate end of wk 1 (else KR1 at-risk) | DECIDED (default) | Squad + group PM | This week | 2026-06-15 |
| D-2 | KR3 instrumentation ownership + timeline | Default: squad eng owns, platform reviews, wks 1-2; hard gate end of wk 1 (else KR3 at-risk) | DECIDED (default) | Squad eng + platform/data | Week 1 | 2026-06-15 |
| D-3 | KR2 billing-data access | Pending - raise cross-team request if needed | GATED | Squad PM + Revenue/Growth | Week 1 | 2026-06-15 |
| D-4 | KR3 target validity (25% placeholder) | Pending - re-set after week-4 baseline | GATED | Squad | Week 5 | 2026-06-15 |
| D-5 | Interview recruiting pipeline | Pending - confirm/stand up a channel | GATED | Squad PM + CS | Week 2 | 2026-06-15 |
| D-6 | Growth cohort confounding | Pending - agree cohort tagging | GATED | Squad PM + Growth | Before quarter start | 2026-06-15 |

### D-1: Activation definition
Status: DECIDED (default; hard-gated)
**Context** - "Activated" is disputed ("created a dashboard" vs. "invited a teammate"); KR1 cannot be baselined or scored until it is locked. Value: unblocks KR1 scoring and sharpens the KR3 instrumentation spec.
**Potential solutions** - (a) dashboard only; (b) teammate-invite only; (c) both within 14 days of signup. Recommendation: (c) - it captures the actual "team gets value" moment the strategy targets.
**Final decision** - DECIDED (default): adopt the combined definition (created >=1 dashboard AND invited >=1 teammate, both within 14 days of signup) unless the squad + group PM agree an alternative in this week's alignment session. **Hard gate:** if no definition is locked by end of week 1, KR1 cannot be baselined and is flagged at-risk to leadership rather than left silently undefined. Owner: squad + group PM.

### D-2: KR3 instrumentation ownership + timeline
Status: DECIDED (default; hard-gated)
**Context** - The KR3 baseline needs new `dashboard_created` + signup-linkage events in weeks 1-2; without it KR3's target is undefined. Value: turns KR3 from "placeholder" into a scoreable weekly signal.
**Potential solutions** - (a) squad engineers own it; (b) platform/data team owns it; (c) shared. Recommendation: (c) with the squad driving and platform reviewing the event schema.
**Final decision** - DECIDED (default): the squad's own engineers own the KR3 instrumentation, with the platform/data team reviewing the event schema, and the work is committed to weeks 1-2. **Hard gate:** if that capacity is not confirmed by end of week 1, KR3's baseline cannot be established and KR3 is flagged at-risk (it does not silently carry an undefined target). Owner: squad eng + platform/data.

### D-3: KR2 billing-data access
Status: GATED follow-up (owned; gate + recommended default below)
**Context** - Free-to-paid conversion needs billing events joined to signup cohorts; access may require a cross-team request. Value: KR2 measurable on the full cohort (the integrity guardrail).
**Potential solutions** - (a) use existing access if present; (b) raise a data request in week 1. Recommendation: confirm access immediately; if absent, (b).
**Final decision** - Pending. Owner: squad PM + Revenue/Growth; week 1.

### D-4: KR3 target validity (the 25% placeholder)
Status: GATED follow-up (owned; gate + recommended default below)
**Context** - The 25% time-to-first-dashboard target is a placeholder until the week-4 baseline exists; an arbitrary target is either trivial or impossible. Value: a defensibly aspirational target.
**Potential solutions** - (a) keep 25% as-is; (b) re-set it against the measured baseline at week 5. Recommendation: (b).
**Final decision** - Pending. Owner: squad; KR3 target review at week 5.

### D-5: Interview recruiting pipeline
Status: GATED follow-up (owned; gate + recommended default below)
**Context** - Initiative 3 (10 onboarding interviews, feeding KR4) needs willing new users. Value: the validated insights that drive Q4 prioritization.
**Potential solutions** - (a) reuse a CS-intro / in-app-intercept / panel channel; (b) stand one up this quarter. Recommendation: (a) if one exists, else (b) in week 2.
**Final decision** - Pending. Owner: squad PM + CS; week 2.

### D-6: Growth cohort confounding
Status: GATED follow-up (owned; gate + recommended default below)
**Context** - If Growth changes acquisition channels/segments mid-cycle, the Q3 cohort diverges from the 22%/6% baselines, confounding KR1/KR2. Value: a clean baseline-to-target comparison.
**Potential solutions** - (a) ignore (accept confounding); (b) agree cohort tagging with Growth up front. Recommendation: (b).
**Final decision** - Pending. Owner: squad PM + Growth; before the quarter begins.

### Operating rhythm (the Main Fix)
Status: DECIDED (proposed cadence)
**Final decision** - (1) Weekly KR check-in (15 min, Mondays) reading KR1/KR3 off the new instrumentation; (2) week-4 KR3 baseline checkpoint (locks the D-4 target); (3) week-5 KR3 target review; (4) week-6 mid-cycle review pairing KR4 insights with a checklist iteration decision; (5) cycle-close scoring against the locked activation definition, feeding Q4 planning. Owner: squad PM. These dates are the operating layer the Quality Audit flagged as missing.

---

## Suggested Next Step

Lock the activation definition (Open Question #1) in a 30-minute squad alignment session this week, then re-baseline KR1 against that definition using existing event data - that single decision unblocks KR1 scoring, sharpens the instrumentation spec for KR3, and makes the OKR set ready to present at the quarterly planning review.
