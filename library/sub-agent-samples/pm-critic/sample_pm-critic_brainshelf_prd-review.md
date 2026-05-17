---
title: "pm-critic findings: Brainshelf Resurface PRD"
description: "pm-critic adversarial review of the Brainshelf Resurface PRD (sample_deliver-prd_brainshelf_resurface.md). Demonstrates 7 findings across P0/P1/P2/P3 with concrete fix suggestions, illustrating internal-consistency checks, falsifiability gaps, and contract-completeness gaps. Sample artifact for the pm-critic sub-agent."
artifact: pm-critic-findings
version: "1.0"
repo_version: "2.16.0-dev"
agent_version: "1.0.0"
created: 2026-05-17
status: sample
thread: brainshelf
context: Adversarial review of the Brainshelf Resurface PRD authored for Sprint 8 build handoff
---

## Scenario

After Priya M. ran `/deliver-prd` to produce the Resurface PRD for Sprint 8 handoff, `pm-critic` auto-fired (proactive trigger). It reads the PRD adversarially against the canonical contract at `skills/deliver-prd/SKILL.md`, cross-references `skills/deliver-edge-cases/SKILL.md` for edge-case completeness, checks internal consistency across the PRD's own sections, and produces graded findings with concrete fix suggestions.

The findings are intended for Priya to triage before engineering kickoff. P0 findings block the handoff; P1 findings should be resolved before the Feb 3 build start; P2/P3 findings are author judgment.

## Output

# pm-critic findings: Brainshelf Resurface PRD

**Artifact reviewed:** `library/skill-output-samples/deliver-prd/sample_deliver-prd_brainshelf_resurface.md`
**Standards consulted:** `skills/deliver-prd/SKILL.md`, `skills/deliver-edge-cases/SKILL.md`, `skills/define-hypothesis/SKILL.md` (for hypothesis-PRD coherence check)
**Findings:** 7 (P0: 1, P1: 3, P2: 2, P3: 1)

## P0 findings

### F-01: User-story acceptance criteria deferred to external document; PRD ships without verifiable behavior

**Location:** User Stories section, line 106 ("See the detailed user stories document for full acceptance criteria")
**Issue:** The PRD lists 5 user stories (US-001 through US-005) with priorities but defers full acceptance criteria to an external "user stories document." That document is referenced but not linked, not versioned, and not committed alongside this PRD.

**Why it matters:** Per `skills/deliver-prd/SKILL.md`, a PRD must contain testable acceptance criteria for the engineering team to build verifiable behavior. An external reference creates two failure modes: (1) the document does not exist at handoff and engineering builds against ambiguous user stories; (2) the document exists but drifts from the PRD over the Sprint 8 build window, leaving the team uncertain which spec is authoritative. Either failure means engineering ships behavior that may not match the PM's intent, and there is no way to verify acceptance during code review or QA.

**Fix:** Embed full acceptance criteria for each user story inline in this PRD using Given/When/Then structure. If the external doc is the canonical source, replace this PRD's "User Stories" section with a single link to the external doc + a commitment that this PRD is the abstract scope and the linked doc is the testable spec. Either way, eliminate the "see other doc" pattern that hides verifiable behavior from the handoff artifact. Reference: `skills/deliver-acceptance-criteria/SKILL.md` for Given/When/Then format.

## P1 findings

### F-02: Threshold inconsistency between opt-in goal and mitigation trigger creates a 5-percentage-point dead zone

**Location:** Success Metrics table line 88 ("Opt-in rate >= 10%") vs Risks table line 213 ("if below 5% at day 7, revise opt-in prompt copy")
**Issue:** The PRD states a >=10% opt-in goal as a diagnostic success metric. The mitigation for opt-in-rate risk triggers at <5% at day 7. This leaves a dead zone (5% to 9.99%) where the goal is unmet but no mitigation kicks in. At 7% opt-in, the team has no playbook: the goal says fail, the mitigation says wait.

**Why it matters:** Decision criteria that don't align across the doc produce decision paralysis. The author has implicitly decided 5% is "too low to ignore" but also decided 10% is "good enough to ship." The 5-percentage-point gap is the unowned middle.

**Fix:** Pick one of three resolutions: (a) raise the mitigation trigger to <10% at day 7 (align with the goal); (b) lower the goal to >=5% (align with the mitigation); (c) split the metric into "minimum acceptable" (5%) and "target" (10%) with explicit behavior at each band. Document the chosen interpretation in the Success Metrics table.

### F-03: 14-day exclusion window interacts pathologically with small-library users; experiment validity at risk

**Location:** FR-4 (line 144) "shall not resurface the same item within a 14-day window"; Open Question 3 (line 235) acknowledges the interaction with small libraries but does not resolve it
**Issue:** Users with 10-20 saved items (the lower end of the eligibility threshold) exhaust their pool of resurface-eligible items within 3-4 days under the daily cadence. From day 5 onward, FR-3 ("no digest if zero items pass threshold") fires and the user gets no email for the rest of the 14-day window. The A/B test then measures their behavior under inconsistent treatment exposure.

**Why it matters:** The experiment's primary metric is 7-day return rate. Small-library users in the treatment arm receive uneven email exposure across the 4-week test, while control users receive no email at all. This introduces a confound: small-library treatment users behave more like control users than the analysis assumes. The treatment-effect estimate is biased toward the null.

**Fix:** Resolve OQ-3 before the A/B test starts. Two viable options: (a) shorten the exclusion window proportionally to library size (e.g., `min(14, floor(library_size / 3))` days); (b) exclude small-library users (<25 items) from the experiment and run them as a separate cohort. Document the decision in the PRD Functional Requirements section, not as an open question.

### F-04: A/B test is on opt-in self-selected sample vs no-email control; treatment-effect estimate not generalizable

**Location:** Solution Summary (line 67) "requires explicit opt-in"; Goals & Success Metrics (line 77) measuring 7-day return rate as the primary success metric
**Issue:** The A/B test compares behavior of users who opted in to receive email (treatment) vs users with no email at all (control). The opt-in step is itself a self-selection filter: users who opt in are systematically more engaged than those who do not. The 7-day return-rate uplift attributed to "receiving email" is confounded with "being the kind of user who opts in to email."

**Why it matters:** The PRD's first goal is to validate the Resurface hypothesis. The current design cannot distinguish "email causes return" from "opt-in users would have returned anyway." This affects the ship/iterate/kill decision on Apr 11.

**Fix:** Add one of two designs to the PRD: (a) compare opt-in users in treatment vs opt-in users in control (both opted in; only treatment receives email); (b) add a third arm: opt-in + no email (washout cohort) to isolate the email's effect from opt-in self-selection. Update the Experiment Design section of the linked hypothesis doc and reflect the chosen design in this PRD's Goals section.

## P2 findings

### F-05: TF-IDF relevance threshold (0.15) lacks rationale; sensitivity analysis missing

**Location:** FR-7 (line 151) "top 5 items above the minimum threshold (0.15 [fictional])"
**Issue:** The threshold value 0.15 is asserted but not justified. The spike summary (referenced in Appendix line 248) presumably explored relevance-threshold sensitivity, but the PRD does not cite the trade-off curve. A threshold too high produces "no digest today" outcomes that interact with F-03; too low produces irrelevant digests that drive the unsubscribe metric up.

**Fix:** Cite the spike summary's threshold sensitivity analysis in FR-7 or add a one-paragraph rationale here. If the spike did not produce a sensitivity curve, add a Week 1 setup-period observation task to measure threshold behavior on the seed list before enrollment.

### F-06: "Active in last 30 days" eligibility uses a low bar (one save event)

**Location:** Target Users (line 71) "Active in last 30 days (at least one save event)"
**Issue:** A single save event in 30 days qualifies a user as "active." This catches users who saved once on day 1 and have not returned, which is exactly the cohort least likely to opt in or engage with email. Including them in the eligible-user denominator inflates the cohort size and depresses the opt-in rate metric.

**Fix:** Tighten "active" to require either (a) more than one save event in 30 days, or (b) at least one app-open event in 14 days. Update the 9,800 user estimate against the tightened definition; the metric denominator gets smaller and the opt-in rate target becomes more meaningful. Reference: `skills/foundation-persona/SKILL.md` on cohort definition discipline.

## P3 findings

### F-07: "Sprint 8" terminology used without team-calendar definition

**Location:** Multiple sections; Timeline & Milestones (line 222) "Sprint 8 start"
**Issue:** "Sprint 8" is the team's internal calendar reference. A reader without team context (e.g., a future PM auditing the PRD against shipped outcomes) cannot date-anchor without the calendar.

**Fix:** Replace "Sprint 8" with the actual date range on first mention, or add a one-line "Sprint 8 = Feb 3-16, 2026" footnote at the top of the Timeline section. The doc already has the dates in the milestones table; pull them up to the first reference.

---

## Self-Notes (pm-critic, post-review)

- **Standards reads performed:** `skills/deliver-prd/SKILL.md` (success-metric testability section, acceptance-criteria completeness rule); `skills/deliver-edge-cases/SKILL.md` (edge case category checklist; no findings against this contract since the PRD's edge case section covers the main scenarios); `skills/define-hypothesis/SKILL.md` (experiment design coherence section, surfaced F-04).
- **Refusal protocol not triggered.** The PRD is complete, in scope, above the review threshold, and the artifact type is recognized via frontmatter `artifact: prd`.
- **Cross-artifact references not provided.** The PRD references the linked hypothesis, ADR-007, design rationale, and spike summary in the Appendix. Without those artifacts in the file set, cross-artifact coherence checks are partial. F-04 surfaces a likely hypothesis coherence issue but cannot confirm without reading the hypothesis doc directly. If those artifacts are provided in a re-review, additional findings or downgrades may apply.
- **No P0 noise.** F-01 is a real ship-blocker: an engineering team building this without acceptance criteria will produce ambiguous behavior. Documenting the criteria inline takes ~30 minutes; the cost of ambiguous behavior in production is much higher.
- **False-positive rate self-check.** 7 findings across 4 severity levels; P0 = 14% of findings (calibrated; spec target is single-digit P0 per artifact). No fabricated findings (every issue has a verifiable location in the source PRD).

---

## Notes on This Sample

This is a real adversarial review against the actual Brainshelf Resurface PRD in the library. The findings reflect what `pm-critic` produces when invoked against a 1.0-status PRD; the PRD is intentionally well-formed (it is a sample of the deliver-prd skill's output), so finding 1 P0 and 3 P1 issues against it is calibrated to the sub-agent's adversarial framing.

If pm-critic is run against a draft PRD with placeholder text or missing sections, expect a higher P0 count and possibly a refusal output (per pm-critic's refusal protocol 3: "the artifact is a draft below review threshold").

For the sample's role in v2.16.0: this is one of 3 thread-aligned samples for pm-critic (the other 2 ship in Phase 6 against the Storevine OKR set and Workbench meeting recap respectively).
