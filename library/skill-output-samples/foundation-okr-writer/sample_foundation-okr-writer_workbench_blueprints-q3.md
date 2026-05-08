---
title: "Foundation OKR Writer: Workbench Blueprints Q3"
description: "Workbench enterprise B2B platform. Blueprints team Q3 2026 OKR set following the June 15 v1.1 launch. Mixed-empowerment signal demonstrates the Disclosure section."
artifact: foundation-okr-writer
version: "1.0"
repo_version: "2.12.0"
skill_version: "1.0.0"
created: 2026-05-01
status: canonical
thread: workbench
context: Workbench enterprise B2B platform. Blueprints team Q3 2026 OKR set following the June 15 v1.1 launch. Mixed-empowerment signal demonstrates the Disclosure section.
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Sample: foundation-okr-writer. Workbench Blueprints Q3 2026 OKR Set

## Scenario

Workbench's Blueprints team launched v1.1 on 2026-06-15 (per the existing `foundation-stakeholder-update` workbench sample). Twelve enterprise tier-1 customers are contractually committed to onboarding by end of Q3, including three healthcare accounts subject to HIPAA. The Blueprints PM david-pm needs OKRs that balance the contracted commitments with the broader retention thesis Blueprints is supposed to prove.

For Q3 2026, the company-level forcing function is enterprise Net Revenue Retention above 110% [fictional] for FY2026. Blueprints is the largest single feature investment in service of that NRR target.

This is a mixed-empowerment context: the team controls the product surface and HOW to drive outcomes, but the WHICH (which accounts onboard, on which timelines) is dictated by signed contracts. The PM runs `/okr-writer` in Guided mode (default) and the empowered-team diagnostic surfaces the mixed signal, triggering a Disclosure section in the artifact.

**Source Notes:**

- Workbench is fictional
- HIPAA is a real compliance framework
- All metrics `[fictional]`
- Continuation of the workbench Blueprints thread established in the `foundation-stakeholder-update` workbench sample
- Enterprise NRR (per Hashed and Andreessen Horowitz benchmarks) and Cagan's "committed vs aspirational" split are the writer's underlying enterprise-OKR heuristics

## Prompt

```
/okr-writer

Scope: Blueprints team, Workbench
Cycle: Q3 2026 (July 1 to September 30)
Level: team
OKR type: mostly committed (enterprise contracts), with one aspirational

Strategic context:
- Company objective: enterprise NRR above 110% [fictional] for FY2026.
- Blueprints team owns the workflow-templates product surface.
- v1.1 launched 2026-06-15 with 12 contracted tier-1 customer onboardings.
- 3 of the 12 are healthcare accounts subject to HIPAA.

Empowerment signal: features and timelines for the 12 onboardings are
contractually committed (we cannot move them mid-cycle). Team controls
HOW to drive adoption and engagement.

Draft objective: "Make Blueprints work for enterprise customer workflows."

Candidate KRs (rough):
- All 12 tier-1 contracted accounts onboarded
- Blueprints engagement among onboarded accounts
- HIPAA compliance maintained
- Don't break enterprise CS team's response time

Constraints:
- Engineering capacity: 5 engineers, 1 designer, 1 customer engineer
- Cannot move contracted onboarding deadlines
- HIPAA findings would block all healthcare accounts

Source of truth: company OKR doc in Confluence at
ent.workbench.com/okrs/q3-blueprints
```

## Output

```markdown
# OKR Set: Workbench Blueprints Team, Q3 2026

(Mode: Guided. Empowered-team signal: mixed. Disclosure section included.)

## Context

- Scope: Blueprints team
- Cycle: 2026-Q3 (July 1 to September 30, 2026)
- Level: team
- OKR type: mixed (3 committed KRs, 1 aspirational, 1 guardrail)
- Empowered-team signal: mixed. Contracted onboardings are pre-committed
  (12 tier-1 accounts on signed-contract timelines). Team controls HOW
  to drive adoption, engagement, and quality.
- Source of truth: ent.workbench.com/okrs/q3-blueprints (Confluence).
  This artifact is a planning input, not the live tracker.
- Strategic input: Company OKR for enterprise NRR above 110% [fictional]
  in FY2026. Blueprints is the largest single feature investment for
  that target. Contracted Q3 onboardings are revenue-recognition gates.
- Assumptions:
  - HIPAA-relevant healthcare account onboardings can complete in Q3
    given compliance review timelines. If compliance review extends,
    KR1 may need to be re-cut next cycle.
  - Blueprints v1.1 quality is sufficient for tier-1 customer use. KR3
    catches any compliance-impacting issue.
  - Customer engineer has bandwidth for white-glove onboarding for all
    12 accounts. If not, additional CS resources will be needed.

## Objective

Earn enterprise tier-1 trust by making Blueprints the system of record for their customer workflows.

(Qualitative, directional. Replaces "make Blueprints work for enterprise"
with language that signals the desired customer outcome: trust + system-
of-record adoption, not just "feature works.")

## Key Results

- KR1 (committed): Onboard all 12 contracted tier-1 enterprise accounts
  to Blueprints v1.1 by 2026-09-30.
  - Metric: count of tier-1 accounts with at least 1 published Blueprint
    in production use.
  - Baseline: 0 [fictional] (no tier-1 accounts onboarded as of cycle
    start).
  - Target: 12 of 12 by 2026-09-30. Committed: missing requires
    postmortem and contract review.
  - Evidence source: Salesforce account record + Blueprints production
    publish event.
  - Owner: david-pm.
  - Indicator class: lagging (gated by external customer readiness).
  - Confidence: medium-high. 12 onboardings in 13 weeks is aggressive
    but contractually committed.

- KR2 (aspirational): Increase median Blueprints execution rate among
  onboarded tier-1 accounts from 0 to 28 executions per account per
  week [fictional] by 2026-09-30.
  - Metric: median weekly Blueprint executions per onboarded tier-1
    account, measured in the 4 weeks after each account's onboarding
    completion.
  - Baseline: 0 [fictional] (pre-launch). Comparable Workbench feature
    benchmark is 14 executions/week/account [fictional]; we are
    targeting 2x that.
  - Target: 28 executions/week/account by 2026-09-30. Aspirational:
    a 0.6 to 0.7 score is strong progress.
  - Evidence source: Blueprints execution telemetry (`blueprint_run`
    event), aggregated per account.
  - Owner: david-pm.
  - Indicator class: leading (engagement predicts NRR).
  - Confidence: low to medium. The 2x benchmark assumption is
    untested at scale.

- KR3 (committed, compliance): Maintain zero critical HIPAA audit
  findings on Blueprints across all 3 healthcare tier-1 accounts.
  - Metric: count of critical findings from quarterly HIPAA audit
    cycle.
  - Baseline: not applicable (Blueprints not previously in HIPAA
    audit scope).
  - Target: 0 critical findings. Committed: compliance threshold,
    no aspirational interpretation.
  - Evidence source: external HIPAA audit report (Q3 2026 cycle).
  - Owner: Workbench Compliance team (functional owner) plus david-pm
    (Blueprints accountability).
  - Indicator class: guardrail (compliance gate).
  - Confidence: high if v1.1 quality holds; low if security review
    surfaces design-level concerns.

- KR4 (guardrail): Hold enterprise CS team median time-to-resolution
  for Blueprints support tickets at or below 4 hours [fictional].
  - Metric: median time from ticket creation to resolution, scoped to
    tickets tagged `blueprints`.
  - Baseline: 3.8 hours [fictional] (Q2 2026 average for Workbench
    enterprise tickets generally).
  - Target: maintain 4 hours or below. Committed: SLA commitment in
    enterprise contracts.
  - Evidence source: Zendesk dashboard, `blueprints` tag filter.
  - Owner: Enterprise CS team lead (functional owner) plus david-pm
    (Blueprints accountability).
  - Indicator class: guardrail.
  - Confidence: medium. Onboarding 12 new accounts will increase ticket
    volume; CS capacity may be a gating factor.

## Initiatives as Bets

- Initiative 1: White-glove onboarding sessions (per-account, all 12).
  - Expected KR impact: KR1 primarily, KR2 secondarily.
  - Hypothesis: dedicated customer-engineer-led onboarding sessions
    will reduce time-to-first-Blueprint and increase early engagement
    velocity.
  - Dependency: customer engineer scheduled across 12 accounts; ~3
    weeks per account average duration.

- Initiative 2: Industry-vertical template library (healthcare,
  fin-services, retail).
  - Expected KR impact: KR2 primarily, KR1 secondarily (faster
    onboarding for vertical-aligned accounts).
  - Hypothesis: vertical-specific templates reduce blank-canvas
    friction and increase first-week engagement.
  - Dependency: design lead authoring 8 templates per vertical (24
    total) by mid-August.

- Initiative 3: Customer-health dashboard with Blueprints-specific
  signals.
  - Expected KR impact: KR2 primarily (CS team can intervene early
    when an account is underutilizing Blueprints).
  - Hypothesis: CS-driven proactive nudges based on usage signals
    accelerate engagement growth versus reactive support.
  - Dependency: data engineering for telemetry pipeline; CS team for
    nudge protocol design.

## Guardrails and Health Checks

- Guardrail 1: Tier-1 customer satisfaction (CSAT) score for
  Blueprints stays at or above 4.4 / 5 [fictional].
  - Why: a quality-deficient onboarding could meet KR1 numerically
    while damaging the long-term enterprise relationship. CSAT catches
    this.

- Guardrail 2: Customer engineer burnout indicator: weekly hours per
  customer engineer below 50 [fictional].
  - Why: white-glove onboarding for 12 accounts in 13 weeks is high
    cognitive load. Burning out the customer engineer destroys our
    Q4 onboarding capacity.

## Alignment Notes

- Parent or strategy link: Company OKR "Enterprise NRR above 110%
  [fictional] for FY2026." Blueprints is the largest single feature
  investment toward this target.
- Peer dependencies:
  - Workbench Compliance team owns KR3 audit execution. Confirmed
    capacity in Q3 planning.
  - Enterprise CS team owns KR4 ticket triage and Initiative 3
    nudge execution. Joint ownership noted.
  - Data Engineering team owns Initiative 3 telemetry pipeline.
    Confirmed in cross-team Q3 planning.
- Known conflicts:
  - The Customer Acquisition team's Q3 OKR includes "sign 4 new
    tier-1 enterprise accounts." If they succeed, those signed accounts
    may have onboarding expectations beyond Q3, but Blueprints is not
    yet in the standard enterprise sales motion. Mitigation: defer
    new-signed-account Blueprints onboarding to Q4; keep our 12
    contracted Q3 commitments stable.
- Out of scope this cycle:
  - Tier-2 enterprise account onboarding (deferred to Q4).
  - Blueprints self-service for SMB tier (different product motion;
    different team).
  - Pricing or packaging changes for Blueprints (no team owns).

## Disclosure

This OKR set frames pre-committed work as outcome bets. The 12 tier-1
account onboardings (KR1) are contractually committed and the team
cannot change them mid-cycle. If KR2 (engagement) does not move when
the 12 onboardings ship, that is a learning about Blueprints' actual
retention impact, not a delivery failure. The team's lever this cycle
is to keep delivering the contracted onboardings and to drive
engagement WITHIN them; the OKR's lever is to update next-cycle
planning if the engagement thesis is invalidated.

## Quality Audit

- Strategic fit: pass. Clear link to company NRR OKR via "Blueprints
  is the largest feature investment toward enterprise retention."
- Objective quality: pass. "Earn trust by making Blueprints the system
  of record for customer workflows" implies a customer behavior change,
  not a feature delivery.
- KR outcome quality: pass with caveat. KR1 is technically a delivery
  KR (count of onboardings) but it is a contracted milestone whose
  evidence is real customer adoption. Acceptable in committed mode.
- Measurement quality: pass. All KRs cite specific data sources
  (Salesforce, Blueprints telemetry, HIPAA audit, Zendesk).
- Product influence: mixed. Team has full influence over KR2 and the
  initiatives; KR1 timing depends on customer readiness; KR3 depends
  on compliance team execution.
- Focus: pass. One Objective, four KRs (within 2 to 4 range, with the
  fourth as a guardrail).
- Guardrails: pass. KR4 plus two health metrics protect against the
  predictable failure modes (CSAT, customer engineer burnout).
- Alignment: pass. Parent OKR named, peer dependencies named, conflict
  with Customer Acquisition team flagged with mitigation.
- Operating rhythm: pass. Quarterly cycle; weekly check-ins assumed;
  HIPAA audit cycle aligned to Q3 close.
- Integrity: pass. Team-level OKR, no compensation coupling, no
  fabricated data.
- Empowered-team Disclosure: pass. Mixed signal; Disclosure section
  included.

## Open Questions

1. The 12 tier-1 contracted onboardings are not equally weighted in
   complexity. Three healthcare accounts will require 4-6 weeks each
   due to HIPAA review; the other nine should average 2-3 weeks. If
   the healthcare reviews extend, KR1's "12 of 12" target may need to
   be re-cut to "9 of 9 non-healthcare plus best-effort on healthcare."
   Recommend pre-deciding this fallback before cycle start.

2. KR2's 2x benchmark target (28 executions/week vs the 14
   executions/week comparable Workbench feature benchmark) is
   aspirational and untested. Recommend instrumenting an interim
   30-day check at 14 executions/week as the "we are at benchmark"
   trigger; below that warrants a mid-cycle strategy review.

3. The customer-health dashboard (Initiative 3) depends on data
   engineering capacity that may slip. If Initiative 3 ships in late
   Q3, its KR2 contribution will not be visible until Q4. Recommend
   timeboxing Initiative 3 to early August or descoping in favor of
   manual CS triage.

## Suggested Next Step

Run `/okr-writer` again in Audit Only mode after the cross-team Q3
planning workshop. Specifically check Open Question 1's healthcare
fallback with the Compliance team and Open Question 2's benchmark
threshold with company leadership. Confirm Initiative 3 dependency
with Data Engineering before locking the OKR set.
```
