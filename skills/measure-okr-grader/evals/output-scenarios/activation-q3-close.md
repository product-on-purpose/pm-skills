---
scenario: activation-q3-close
skill: measure-okr-grader
family: measurement
created: 2026-06-14
---

# Scenario: scoring the Activation team's Q3 OKRs at cycle close

This is the INPUT brief for an output-quality eval. The skill arm and the control arm each receive
everything below (and nothing else about how to do the work) and produce an OKR cycle-review artifact
for it. Judges never see this header.

## The OKR set being scored (as authored at the start of Q3)

**Objective:** "New teams reach value fast enough to stick and convert."

**KR1 (aspirational):** Increase signup-to-activation rate from **22% baseline** to **35% target**.
- Final value at cycle close: **30%**.

**KR2 (committed):** Ship and instrument the new onboarding checklist so median time-to-first-dashboard
is measurable for 100% of new teams by end of quarter.
- Final value: instrumentation shipped for **~80%** of new teams (Android rollout slipped two weeks);
  the other 20% are not yet measured.

**KR3 (aspirational):** Increase free-to-paid conversion within 30 days from **6% baseline** to **9%
target**.
- Final value: the 30-day conversion window for September signups **closes Oct 15**, after cycle end.
  As of cycle close, the August cohort is at **7%**; September is not yet observable.

**KR4 (guardrail):** Keep new-user support tickets per 100 signups at or below the **baseline of 14**.
- Final value: support tickets rose to **19 per 100 signups** during the checklist rollout.

**Initiatives the team ran:**
- Redesigned onboarding checklist (shipped on time).
- Three integration connectors (Salesforce, HubSpot shipped; Segment slipped).
- 10 onboarding interviews (completed; fed the checklist redesign).

**Context the team added:**
- The PM wants to mark KR2 as "done for the platforms that mattered" and move on.
- A stakeholder is asking whether the team "hit its numbers" for a leadership readout, and there is
  pressure to present the quarter as a win.
- Evidence quality varies: activation is well-instrumented; conversion attribution is weaker; the
  support-ticket rise has not been root-caused.

**Audience for the artifact:** the squad, their group PM, and a leadership readout. The team needs an
honest score, evidence quality, learning, and next-cycle recommendations.
