<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
artifact: measure-okr-grader
version: "1.0"
repo_version: "2.12.0"
skill_version: "1.0.0"
created: 2026-05-01
status: canonical
thread: workbench
context: Workbench enterprise B2B platform. Blueprints team Q3 2026 cycle review at quarter close (October 2026). Scores the OKR set produced in the foundation-okr-writer workbench sample. Demonstrates mixed-empowerment scoring with committed KR fail handled correctly (not softened to aspirational), compliance_or_safety KR scored as not-yet-fully-observable when audit coverage is partial (no retroactive scope shrinkage), aspirational KR in sweet spot, and committed KR with guardrail indicator class held.
---

# Sample: measure-okr-grader. Workbench Blueprints Q3 2026 Cycle Review

## Scenario

Workbench's Blueprints team is closing the Q3 2026 cycle. The OKR set was authored in late June using `/okr-writer` (see the corresponding writer sample at `library/skill-output-samples/foundation-okr-writer/sample_foundation-okr-writer_workbench_blueprints-q3.md`). The cycle ended September 30. Final values are now in for KR1, KR2, KR3, and KR4.

The team wants a cycle review they can take to the Q4 enterprise customer business review. The Blueprints PM david-pm runs `/okr-grader` with the original OKR set, the final KR values, the cycle's narrative, and the initiative status.

The cycle had a complex result. Of the 12 contracted tier-1 enterprise onboardings (KR1, committed), 10 completed by September 30. Two healthcare accounts slipped to Q4 due to extended HIPAA security review timelines. Engagement among onboarded accounts (KR2, aspirational) landed in the aspirational sweet spot. The compliance_or_safety KR (KR3) is not-yet-fully-observable: only 1 of 3 committed healthcare audits completed in Q3 (zero critical findings on that one), with the other 2 deferred to Q4 alongside their delayed onboardings. KR4 (committed with guardrail indicator class) held. The Disclosure section in the original OKR set anticipated this kind of mixed result.

This sample exercises three scoring conventions the storevine and brainshelf samples did not: committed KR fail handling (no aspirational softening), compliance_or_safety KR partial-coverage handling (no retroactive scope shrinkage), and the indicator-class-guardrail rule that a guardrail KR is reported as its own signal regardless of its OKR type.

**Source Notes:**

- Workbench is fictional
- HIPAA is a real compliance framework
- All metrics `[fictional]`
- Pairs with `library/skill-output-samples/foundation-okr-writer/sample_foundation-okr-writer_workbench_blueprints-q3.md`
- Continuation of the workbench Blueprints thread spanning `foundation-stakeholder-update`, `foundation-okr-writer`, and this grader sample
- Demonstrates mixed-empowerment cycle close: committed KRs scored pass-or-fail (no aspirational softening); compliance_or_safety KRs scored binary with no retroactive scope shrinkage when coverage is partial (mark as not-yet-fully-observable instead); aspirational KRs scored on the 0 to 1 scale; KRs with indicator class guardrail reported separately and never averaged into the primary score

## Prompt

```
/okr-grader

Original OKR: see sample_foundation-okr-writer_workbench_blueprints-q3.md
Cycle: Q3 2026 (July 1 to September 30, 2026)
OKR types: mixed. KR1 (committed), KR2 (aspirational), KR3
(compliance_or_safety), KR4 (committed; indicator class guardrail).

Final KR values:
- KR1 (committed, 12 contracted onboardings): 10 of 12 completed by
  Q3 close. Two healthcare accounts slipped to Q4 due to extended
  HIPAA security review.
- KR2 (aspirational, 28 executions/week per onboarded tier-1 account):
  19 [fictional] median across the 10 onboarded accounts (target 28,
  baseline 0).
- KR3 (committed, compliance, zero HIPAA critical findings):
  0 critical findings across the 1 healthcare account that completed
  HIPAA audit in Q3. (Two healthcare accounts deferred their first
  audit cycle to Q4 with the slipped onboardings.)
- KR4 (guardrail, CS time-to-resolution): 3.9 hours [fictional] median
  (target hold at or below 4 hours, baseline 3.8 hours).

Health checks:
- Tier-1 customer satisfaction (CSAT) for Blueprints: 4.5 / 5
  [fictional] (target hold at or above 4.4).
- Customer engineer weekly hours: 47 [fictional] median across the
  cycle (target below 50 to prevent burnout).

Initiative status:
- Initiative 1 (White-glove onboarding): shipped per-account; 10 of
  12 completed onboarding sessions, 2 in progress at cycle close.
- Initiative 2 (Industry-vertical template library): 24 of 24
  templates shipped by August 14 [fictional]. Adoption among
  onboarded accounts: 73% used at least one vertical template
  in their first 4 weeks.
- Initiative 3 (Customer-health dashboard): slipped to Q4. Data
  engineering capacity reallocated mid-cycle to a higher-priority
  platform reliability incident.

Cycle context:
- Q3 included 2 weeks of Workbench platform reliability incidents
  (mid-August) that reallocated data engineering capacity from
  Initiative 3 to incident response. Blueprints availability was
  not affected.
- The two slipped healthcare accounts (Mercy Regional Health and
  Pacific Coast Medical) are both in active HIPAA security review
  with target completion dates in late October and mid-November
  respectively. Contracts have not been amended; both customers
  are aware of the slip and have not raised concerns.
- The Customer Acquisition team's Q3 OKR ("sign 4 new tier-1
  enterprise accounts") hit 5 of 4 [fictional]. Per the original
  OKR's Alignment Notes, those new accounts will defer Blueprints
  onboarding to Q4.

Stakeholder interpretation: Blueprints leadership reads the cycle
as "10 of 12 is a strong delivery; the two slipped accounts are
HIPAA-blocked, not Blueprints-blocked; engagement is healthy;
compliance held." Looking for grader's independent read on whether
the committed-KR miss should be treated as a postmortem trigger.
```

## Output

```markdown
# OKR Cycle Review: Workbench Blueprints Team, Q3 2026

## Summary

- Scope: Blueprints team
- Cycle: 2026-Q3 (July 1 to September 30, 2026)
- Overall interpretation: KR1 (committed, 12 onboardings) is a fail
  with mitigating context. KR2 (aspirational engagement) is in the
  aspirational sweet spot. KR3 (compliance_or_safety) is
  not-yet-fully-observable: only 1 of 3 committed healthcare audits
  completed in Q3 (zero critical findings on that one), with the
  other 2 deferred to Q4. The committed compliance scope cannot be
  retroactively shrunk to 1 account to claim a pass. KR4 (committed
  with guardrail indicator class) held within its threshold band.
  Mixed-type OKR set; do NOT collapse to a single number. The
  committed KR's miss requires a postmortem, even though the cause
  is external (HIPAA review pacing).
- Evidence confidence: high for KR1 (binary count from Salesforce);
  high for KR2 (Blueprints execution telemetry); high for KR3 (HIPAA
  audit report); high for KR4 (Zendesk dashboard).
- Main learning: HIPAA security review timelines for tier-1 healthcare
  accounts run 4 to 6 weeks longer than the contracted-onboarding
  schedule budgeted. This is structural, not Q3-specific. Future
  enterprise OKRs that include healthcare accounts must budget the
  longer review window or stage healthcare onboardings differently.

## Scorecard

- Objective: Earn enterprise tier-1 trust by making Blueprints the
  system of record for their customer workflows.
  - Rough qualitative read: a strong cycle on engagement and quality;
    a partial miss on committed delivery with documented external
    cause. The Disclosure section in the original OKR set anticipated
    this kind of mixed result.

- KR1 (committed): Onboard all 12 contracted tier-1 enterprise accounts
  to Blueprints v1.1 by 2026-09-30.
  - Actual: 10 of 12 [fictional]. Two healthcare accounts (Mercy
    Regional Health, Pacific Coast Medical) slipped to Q4 due to
    extended HIPAA security review.
  - Score: FAIL (committed KR; anything below 1.0 is a miss). Do NOT
    soften to 0.83 aspirational. The committed scoring convention
    requires postmortem when the target is missed, even when the
    cause is external.
  - Evidence confidence: high. Binary count from Salesforce; both
    slipped accounts have documented HIPAA review status.
  - Interpretation: the team delivered 10 of 12 contracted onboardings
    on schedule. The miss is real and deserves postmortem, but the
    postmortem's content is "we underbudgeted HIPAA review time," not
    "we underdelivered on customer onboarding." Both contracts remain
    in good standing.

- KR2 (aspirational): Increase median Blueprints execution rate among
  onboarded tier-1 accounts from 0 to 28 executions per account per
  week [fictional] by 2026-09-30.
  - Actual: 19 executions per account per week [fictional] (median
    across the 10 onboarded accounts, measured in the 4 weeks after
    each account's onboarding completion).
  - Score: 0.68 (aspirational). Calculation:
    (19 - 0) / (28 - 0) = 0.679. In the 0.6 to 0.7 sweet spot.
  - Evidence confidence: high. Blueprints execution telemetry
    (`blueprint_run` event) reliable; per-account aggregation clean.
  - Interpretation: the 2x-of-benchmark target was aspirational and
    untested. Landing at 1.36x of the comparable benchmark (19 vs the
    14/week comparable feature benchmark) is meaningfully strong for
    a v1.1 product. The vertical template library (Initiative 2) is
    the load-bearing bet here.

- KR3 (compliance_or_safety): Maintain zero critical HIPAA audit
  findings on Blueprints across all 3 healthcare tier-1 accounts.
  - Actual: 0 critical findings across the 1 healthcare account that
    completed HIPAA audit in Q3. The other 2 healthcare accounts
    (Mercy Regional Health, Pacific Coast Medical) deferred their
    first audit cycle to Q4 along with their delayed onboardings.
  - Score: not-yet-fully-observable. The compliance commitment of
    zero critical findings across all 3 accounts cannot be evaluated
    until the 2 deferred audits complete in Q4. Do NOT mark this KR
    as passed; the original scope (3 accounts) was committed and
    cannot be retroactively shrunk to 1 account to claim a pass.
    The 1-account result is a positive sub-signal, not the KR score.
  - Evidence confidence: high for the 1-account sub-signal;
    not-yet-observable for the 2 deferred accounts. Final score
    available when the deferred audits complete (target late October
    and mid-November 2026 [fictional]).
  - Interpretation: 1 of 3 healthcare accounts cleared HIPAA audit
    cleanly in Q3 (zero critical findings). The full compliance KR
    remains pending until the 2 deferred audits complete in Q4. The
    team should treat this as an open compliance commitment, not a
    Q3 win.

- KR4 (committed; indicator class guardrail): Hold enterprise CS team
  median time-to-resolution for Blueprints support tickets at or below
  4 hours [fictional].
  - Actual: 3.9 hours [fictional] median.
  - Score: pass (committed scoring; threshold met). 0.1 hours below
    the SLA threshold.
  - Evidence confidence: high.
  - Interpretation: onboarding 10 new accounts did not breach the SLA
    threshold. CS team capacity held within the 4-hour threshold by
    a thin margin (0.1 hours). Per the guardrail indicator-class
    rule, this KR is reported as its own signal and is NOT averaged
    into the primary objective score.

## Objective Interpretation

- Result: a partially-met committed-delivery cycle with strong engagement,
  pending compliance coverage, and a held SLA threshold. The Disclosure
  section in the original OKR set framed pre-committed delivery (KR1) as
  the team's lever and engagement (KR2) as the outcome bet. That framing
  held: the team delivered most of what it could control and produced
  honest engagement data on what shipped.
- Why: KR1 missed because HIPAA security review for tier-1 healthcare
  accounts ran longer than the contracted schedule budgeted. KR2 hit
  the aspirational sweet spot because the vertical template library
  (Initiative 2) shipped on time and adopted at 73%. KR3 is pending:
  the 1-account audit cleared cleanly, but the committed scope of
  3 accounts cannot be evaluated until Q4. KR4 held by a thin margin.
- What changed during the cycle: 2 weeks of Workbench platform
  reliability incidents (mid-August) reallocated data engineering
  capacity from Initiative 3 (customer-health dashboard) to incident
  response. Initiative 3 slipped to Q4 as predicted in the original
  OKR's Open Question 3.
- What the score does and does not mean:
  - Does mean: the team delivered the 10 onboardings it could control
    and drove healthy engagement on the shipped accounts.
  - Does mean: HIPAA review timelines are a structural constraint that
    enterprise OKRs containing healthcare accounts must budget for.
  - Does NOT mean: the team failed on customer commitment. Both slipped
    accounts are in good standing; both contracts remain unamended.
  - Does NOT mean: HIPAA compliance is broadly validated. Two of three
    healthcare accounts have not yet completed first audit; KR3 is
    not-yet-fully-observable, not pending-pass.

## Evidence Quality

- Issue 1: KR1's miss has a structural external cause (HIPAA security
  review timelines) that was foreseeable but not budgeted in the
  original OKR set.
  - Impact: the committed KR target was set without contingency for
    HIPAA review variance. Future enterprise OKRs that include
    healthcare accounts must budget for this.
  - Recommended fix: in next cycle's `/okr-writer` runs that include
    healthcare accounts, structure the committed-onboarding target as
    "X non-healthcare plus best-effort on healthcare" with explicit
    fallback per the original OKR's Open Question 1. Treat the
    healthcare HIPAA review window as a known unknown.

- Issue 2: KR3 cannot be scored at Q3 close. The committed scope is
  3 healthcare accounts; only 1 audit completed in Q3, with 2 pending
  in Q4. Per the grader's compliance_or_safety scoring rule, partial
  coverage means not-yet-fully-observable, not pass-on-in-scope.
  - Impact: medium. The team cannot claim KR3 passed, nor can they
    claim it failed yet. The KR remains open with a positive
    1-account sub-signal. FY planning that depends on Blueprints
    HIPAA compliance should treat the commitment as in-flight until
    the Q4 audits return.
  - Recommended fix: complete KR3's grade when the 2 deferred audits
    return in Q4. Do NOT author a new Q4 compliance KR for the same
    3 accounts; KR3's Q3 grading is just deferred. If a Q4 compliance
    KR is needed, it should cover any new healthcare accounts
    onboarded in Q4, separate from the Q3 commitment.

- Issue 3: Initiative 3 slipped to Q4 due to platform reliability
  capacity reallocation. The team has no Q3 read on whether a
  customer-health dashboard would have lifted KR2.
  - Impact: low for KR2 grading (KR2 hit the aspirational sweet spot
    without it). Medium for next-cycle planning (Initiative 3's Q4
    contribution to KR2 is still untested).
  - Recommended fix: reaffirm or descope Initiative 3 in Q4 OKR
    drafting. If reaffirmed, give it explicit success criteria and a
    cross-team capacity commitment from data engineering.

## Initiative Review

- Initiative 1 (White-glove onboarding):
  - Linked to: KR1 primarily, KR2 secondarily.
  - Status: shipped on time on 10 accounts; 2 in progress at cycle
    close due to HIPAA review.
  - Apparent contribution: high. White-glove sessions reduced
    time-to-first-Blueprint and supported the engagement velocity
    seen in KR2.
  - Recommendation: continue. Reframe the per-account session
    duration estimate to include HIPAA review time for healthcare
    accounts.

- Initiative 2 (Industry-vertical template library):
  - Linked to: KR2 primarily, KR1 secondarily.
  - Status: shipped on time and in full (24 of 24 templates by
    August 14).
  - Apparent contribution: high. 73% adoption among onboarded
    accounts in the first 4 weeks; per-account execution rate of 19
    aligns with the vertical-template-driven hypothesis.
  - Recommendation: continue at current scope. Consider expanding to
    additional verticals (legal, education) in Q4 if KR2 holds at the
    19/week landing point.

- Initiative 3 (Customer-health dashboard):
  - Linked to: KR2 primarily.
  - Status: slipped to Q4 due to platform reliability capacity
    reallocation.
  - Apparent contribution: not measurable in Q3.
  - Recommendation: descope or reaffirm. If reaffirmed for Q4, lock
    a cross-team capacity commitment with data engineering before the
    Q4 OKR set is finalized.

## Learning

- Validated assumptions:
  - Vertical-aligned templates accelerate first-week engagement at
    enterprise scale (KR2 in the sweet spot).
  - White-glove onboarding for tier-1 enterprise customers is the
    right delivery model; CS team capacity held within the SLA
    guardrail (KR4) and the burnout health check held (47 hours
    median against the 50 threshold).
  - The mixed-empowerment Disclosure framing in the original OKR set
    held under stress: the cycle's mixed result was anticipated by
    the framing, not papered over by it.

- Invalidated assumptions:
  - HIPAA security review for tier-1 healthcare accounts can complete
    in 13 weeks. Actual is 17 to 22 weeks. This is structural, not
    Q3-specific.
  - The customer-health dashboard would ship in Q3 if data engineering
    capacity remained as planned. Mid-cycle reallocation to incident
    response is a recurring risk that should be anticipated.

- Surprises:
  - 73% template-library adoption in first 4 weeks was higher than
    expected (the original hypothesis was that vertical templates
    would reduce blank-canvas friction; the magnitude of adoption
    suggests they may also be a discoverability lever).
  - The CS guardrail held by only 0.1 hours. The 4-hour SLA threshold
    is a real ceiling, not a comfortable one. Q4 onboardings (the 5
    new acquisitions plus the 2 healthcare slips) will pressure this
    further.

- Decision implications:
  - Restructure FY 2027 enterprise contracts that include healthcare
    accounts to budget HIPAA review time explicitly.
  - Complete KR3's grading in Q4 when the 2 deferred audits return.
    Do not promote the 1-account Q3 sub-signal to a KR-level pass.
  - Treat CS team capacity as a binding constraint on Q4 onboarding
    pace, not just a guardrail.
  - Reaffirm or descope Initiative 3 with an explicit cross-team
    capacity decision.

## Next-cycle Recommendations

1. Complete KR3's Q3 grading when the 2 deferred audits return in Q4
   (target late October and mid-November). KR3 remains open until then;
   do not close it out based on the 1-account Q3 sub-signal.

2. Reframe the next committed-onboarding target. The original "12 of 12
   in 13 weeks" did not account for HIPAA review. Use Open Question 1's
   fallback structure: "X non-healthcare plus best-effort on healthcare"
   with explicit healthcare fallback dates.

3. Decide whether the 5 new tier-1 customers (from the Customer
   Acquisition team's Q3 success) onboard in Q4 or wait for Q1 2027.
   The CS team SLA guardrail held at 3.9 hours by 0.1 hours; adding
   5+2 onboardings in Q4 risks breaching the SLA without additional
   CS capacity.

4. Reaffirm or descope Initiative 3 (customer-health dashboard) with
   an explicit cross-team capacity commitment from data engineering.

5. Hand-off:
   - `/lessons-log` for the HIPAA review timing finding (this is a
     structural FY-planning input that affects every future enterprise
     OKR with healthcare accounts).
   - `/retrospective` for the team-process learning on cross-team
     capacity dependencies (Initiative 3's slip).
   - `/hypothesis` for "vertical templates drive discoverability,
     not just blank-canvas friction reduction" with an explicit test
     design for Q4.
   - `/dashboard-requirements` for the customer-health dashboard if
     Initiative 3 is reaffirmed.
   - `/okr-writer` for next-cycle drafting once the healthcare
     onboarding fallback structure and CS capacity decision are
     resolved.

## Risks in Interpretation

- Stakeholder framing of "10 of 12 is a strong delivery" is partially
  correct but understates the committed KR's scoring convention.
  Committed misses are misses; the postmortem is required even when
  the cause is external. Without the postmortem, the team will
  underbudget HIPAA review again next cycle.

- The 0.83 ratio of "10 of 12" must NOT be reported as a 0.83 score.
  Aspirational scoring conventions do not apply to committed KRs. A
  reader skimming the scorecard could mistake the ratio for an
  aspirational sweet-spot score; the Scorecard explicitly marks KR1
  as FAIL with mitigating context, not 0.83.

- KR3 must NOT be reported as passed. The committed scope is 3 healthcare
  accounts; only 1 completed audit in Q3. Treating "1 of 3 audits clean"
  as a binary pass would (a) retroactively shrink the committed scope
  and (b) hide an unfulfilled commitment from leadership. The grader's
  rule is: compliance_or_safety KRs with partial coverage are
  not-yet-fully-observable, period. The 1-account result is a positive
  sub-signal that does not promote to KR-level pass.

- KR4 (CS guardrail) held by 0.1 hours. This is a thin margin. Q4
  onboarding pace decisions must treat the SLA threshold as a binding
  constraint; framing it as "we held the guardrail" risks
  under-planning Q4 CS capacity.

- The Disclosure section in the original OKR set absorbed the
  mixed-empowerment risk well, but did not absorb the HIPAA review
  variance. Future Disclosure language should explicitly name
  external-dependency risks (compliance review windows, customer
  procurement timelines, regulatory change) when they are foreseeable.

## Source of Truth

ent.workbench.com/okrs/q3-blueprints (Confluence). This artifact is a
review document, not the canonical OKR record.
```
