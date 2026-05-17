---
title: "pm-critic findings: Storevine campaign analytics OKR set"
description: "pm-critic adversarial review of a Storevine campaign analytics OKR set. Demonstrates the refusal-protocol catch pattern: fabricated baselines and feature-delivery KR shape. 6 findings (2 P0, 2 P1, 1 P2, 1 P3) plus 1 refusal-triggered finding citing the foundation-okr-writer refusal protocols."
artifact: pm-critic-findings
version: "1.0"
repo_version: "2.16.0-dev"
agent_version: "1.0.0"
created: 2026-05-17
status: sample
thread: storevine
context: Adversarial review of a Q2 campaign analytics OKR set drafted for the Storevine analytics team
---

## Scenario

The Storevine analytics team produced a Q2 OKR set via `/foundation-okr-writer` and pm-critic auto-fires (proactive trigger). The OKR set has structural issues that the writer's own self-checks did not catch: a baseline that doesn't match the linked dashboard, a KR shaped as a feature-delivery milestone rather than an outcome metric, and a guardrail that is not measurable. pm-critic reads `skills/foundation-okr-writer/SKILL.md` at invocation time for the canonical refusal protocols and produces graded findings.

## Output

# pm-critic findings: Storevine Q2 Campaign Analytics OKR set

**Artifact reviewed:** `library/skill-output-samples/foundation-okr-writer/sample_foundation-okr-writer_storevine_q2-analytics.md` (notional path)
**Standards consulted:** `skills/foundation-okr-writer/SKILL.md` (refusal protocols section; outcome-KR pattern guidance; committed-vs-aspirational appropriateness)
**Findings:** 6 (P0: 2, P1: 2, P2: 1, P3: 1)

## P0 findings

### F-01: Fabricated baseline (refusal protocol triggered per foundation-okr-writer SKILL.md)

**Location:** Objective 1, Key Result 1, line 23
**Issue:** KR reads "Increase weekly active campaigns from 850 to 1,200." The linked dashboard at `analytics.storevine.io/dashboards/active-campaigns` shows current WAC at 612, not 850. The cited baseline is wrong.
**Why it matters:** Per `skills/foundation-okr-writer/SKILL.md` refusal protocol on fabricated baselines: the OKR cannot be ratified with an unverified baseline. The downstream effect: targets calibrated against the wrong starting point produce either trivial (over-shoot) or unattainable (under-shoot) goals.
**Fix:** Verify actual baseline against the dashboard for the trailing 4 weeks. If the dashboard is wrong, fix the dashboard FIRST and re-run the OKR set against accurate data. Document the verification source in the OKR set's appendix.

### F-02: Feature-delivery KR (refusal protocol triggered)

**Location:** Objective 2, Key Result 3, line 47
**Issue:** KR reads "Ship campaign tagging feature by end of Q2." This is a feature-delivery milestone, not an outcome metric. It measures *whether the team did the work*, not *whether the work produced the intended business effect*.
**Why it matters:** Per `skills/foundation-okr-writer/SKILL.md`: outcome KRs measure customer or business impact, not feature ship dates. A team can ship a feature on time and still fail the underlying objective. The objective "Improve campaign creator self-service" is not advanced by *shipping* tagging; it is advanced by tagging *being used and reducing support tickets or increasing creator activation*.
**Fix:** Reframe as an outcome KR. Example: "Reduce campaign creator support tickets tagged 'cannot organize' from 47/week to 18/week." Or: "Increase percentage of campaigns with >=3 tags applied from 12% to 50%." Ship-the-feature is a milestone (track separately as a roadmap item), not a KR.

## P1 findings

### F-03: Guardrail KR is not measurable

**Location:** Guardrails section, line 62
**Issue:** Guardrail reads "Maintain customer satisfaction." No threshold, no metric, no measurement instrument.
**Why it matters:** Guardrails exist to flag when chasing the primary KRs harms a secondary metric. A non-measurable guardrail cannot fire.
**Fix:** Rewrite as a measurable threshold. Example: "Maintain campaign-creator NPS >= 42 (current 47; -5 absolute tolerance)" with measurement instrument cited.

### F-04: Committed-vs-aspirational appropriateness mismatch

**Location:** Objective 3, Key Results 1 and 2
**Issue:** Both KRs are marked "committed" but the targets (3x and 5x improvements over baseline) read as aspirational. Per `foundation-okr-writer SKILL.md`, committed KRs should be 70-80% confidence; aspirational targets are 30-50%.
**Fix:** Either downgrade both to aspirational with explicit confidence rationale, OR lower the targets to committed-appropriate levels (e.g., 1.5x improvement).

## P2 findings

### F-05: KR depends on a metric not currently instrumented

**Location:** Objective 1, Key Result 2, line 31
**Issue:** KR measures "campaign creator activation within 14 days." The activation event is not currently logged in the analytics pipeline; the team would need to instrument before the KR can be tracked.
**Fix:** Add an explicit "Instrumentation prerequisite" note in the OKR set, OR pick a metric that is already instrumented for Q2 and revisit the activation metric in Q3.

## P3 findings

### F-06: Objective phrasing inconsistency

**Location:** Objectives 1, 2, 3 all start with verbs but use different tenses (Increase / Reduce / Establish)
**Issue:** Minor stylistic inconsistency.
**Fix:** Pick one tense and use uniformly. v2.17 cleanup acceptable.

---

## Status Summary

The Q2 campaign analytics OKR set returned 6 findings: 2 P0, 2 P1, 1 P2, 1 P3.

Both P0 findings are refusal-protocol catches per `skills/foundation-okr-writer/SKILL.md`: F-01 surfaces a fabricated baseline (dashboard says 612 WAC; OKR says 850); F-02 catches a feature-delivery KR that should be reframed as an outcome metric. These are the canonical patterns pm-critic catches against the OKR contract.

**Recommended next action:** Send the OKR set back to the analytics team for revision before Q2 commitment. F-01 + F-02 block ship; F-03 + F-04 should be resolved in the same revision pass. F-05 + F-06 are improvements for v2.17 OKR maturity.

**Refusal triggered:** no (the artifact itself is reviewable; the P0 findings cite refusal protocols from the OKR contract, but the review itself proceeds).

---

## Notes on This Sample

This sample demonstrates pm-critic's refusal-protocol catches per `foundation-okr-writer SKILL.md`. The OKR contract is the canonical example because its refusal protocols are explicit and well-documented. The two P0 findings are direct citations of those protocols.

For pm-critic's role: this is 2 of 3 thread-aligned samples (brainshelf PRD + storevine OKR + workbench meeting recap).
