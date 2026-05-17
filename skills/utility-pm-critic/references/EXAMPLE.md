---
title: "pm-critic Dispatch Example: Brainshelf Resurface PRD review on a non-Claude client"
description: Worked example of utility-pm-critic dispatch skill execution on a non-Claude client (Codex CLI). Demonstrates inline execution of the pm-critic system prompt with full P0/P1/P2/P3 findings + Status Summary prose + Status YAML envelope per master plan D26.
---

# Example: pm-critic Dispatch on Codex CLI

This example shows what `utility-pm-critic` produces when invoked on a non-Claude client (here, Codex CLI). The dispatch skill reads `subagents/pm-critic.md` as its operating instructions for the turn and executes the review inline.

## Invocation

```
codex> /utility-pm-critic library/skill-output-samples/deliver-prd/sample_deliver-prd_brainshelf_resurface.md
```

## Skill behavior

1. **Runtime detection.** The skill detects it is running in Codex CLI (not Claude Code with pm-skills plugin), so it takes the non-Claude branch.
2. **Reads canonical sub-agent definition.** Loads `subagents/pm-critic.md` as the operating system prompt for this turn.
3. **Reads target artifact.** Loads the Brainshelf Resurface PRD at the supplied path.
4. **Reads standards docs.** Per the pm-critic system prompt's referential discipline, reads `skills/deliver-prd/SKILL.md` (PRD contract), `skills/deliver-edge-cases/SKILL.md` (edge case completeness), and `skills/define-hypothesis/SKILL.md` (hypothesis-PRD coherence).
5. **Produces findings.** Returns the three-section layered output below.

## Output (verbatim from dispatch skill execution)

# pm-critic findings: Brainshelf Resurface PRD

**Artifact reviewed:** `library/skill-output-samples/deliver-prd/sample_deliver-prd_brainshelf_resurface.md`
**Standards consulted:** `skills/deliver-prd/SKILL.md`, `skills/deliver-edge-cases/SKILL.md`, `skills/define-hypothesis/SKILL.md`
**Findings:** 7 (P0: 1, P1: 3, P2: 2, P3: 1)

## P0 findings

### F-01: User-story acceptance criteria deferred to external document; PRD ships without verifiable behavior

**Location:** User Stories section, line 106 ("See the detailed user stories document for full acceptance criteria")
**Issue:** The PRD lists 5 user stories (US-001 through US-005) with priorities but defers full acceptance criteria to an external "user stories document" that is referenced but not linked, not versioned, and not committed alongside this PRD.
**Why it matters:** Per `skills/deliver-prd/SKILL.md`, a PRD must contain testable acceptance criteria for the engineering team to build verifiable behavior. External references create drift risk and ambiguity.
**Fix:** Embed full acceptance criteria for each user story inline in this PRD using Given/When/Then structure, or replace the User Stories section with a single link to the external doc + explicit commitment that this PRD is abstract scope and the linked doc is the testable spec.

## P1 findings

### F-02: Threshold inconsistency between opt-in goal and mitigation trigger creates a 5-percentage-point dead zone

**Location:** Success Metrics table line 88 ("Opt-in rate >= 10%") vs Risks table line 213 ("if below 5% at day 7")
**Issue:** The PRD states a >=10% opt-in goal but the mitigation triggers at <5% at day 7. The 5%-9.99% range has no playbook.
**Fix:** Pick one resolution: raise the mitigation trigger to <10%, lower the goal to >=5%, or split into "minimum acceptable" + "target" bands.

### F-03: 14-day exclusion window interacts pathologically with small-library users

**Location:** FR-4 (line 144) and Open Question 3 (line 235)
**Issue:** Users with 10-20 saved items exhaust their resurface pool in 3-4 days. From day 5 onward they receive no email, biasing the experiment toward null.
**Fix:** Shorten the exclusion window proportionally to library size, OR exclude small-library users from the experiment and run as separate cohort.

### F-04: A/B test on opt-in self-selected sample vs no-email control; treatment effect not generalizable

**Location:** Solution Summary (line 67) and Goals & Success Metrics (line 77)
**Issue:** Opt-in users are systematically more engaged than non-opt-in. The 7-day return-rate uplift is confounded with "kind of user who opts in."
**Fix:** Compare opt-in users in treatment vs opt-in users in control (both opted in; only treatment receives email), OR add an opt-in + no email washout arm.

## P2 findings

### F-05: TF-IDF relevance threshold (0.15) lacks rationale

**Location:** FR-7 (line 151)
**Issue:** Threshold value asserted without justification or sensitivity analysis.
**Fix:** Cite the spike summary's threshold curve, or add a Week 1 setup observation to measure threshold behavior.

### F-06: "Active in last 30 days" eligibility uses low bar (one save event)

**Location:** Target Users (line 71)
**Issue:** Single save event in 30 days qualifies a user; this includes users least likely to engage with email and inflates the eligible-user denominator.
**Fix:** Tighten to "more than one save event in 30 days" or "at least one app-open in 14 days."

## P3 findings

### F-07: "Sprint 8" terminology used without team-calendar definition

**Location:** Timeline & Milestones (line 222)
**Issue:** Sprint references depend on team-internal calendar; readers without context cannot date-anchor.
**Fix:** Replace with date range on first mention or add a one-line "Sprint 8 = Feb 3-16, 2026" footnote.

---

## Status Summary

The Brainshelf Resurface PRD review returned 7 findings: 1 P0, 3 P1, 2 P2, 1 P3.

The single P0 finding (F-01) is a real ship-blocker: user stories ship without inline acceptance criteria, leaving engineering to build against ambiguous specs. The 3 P1 findings cluster around experiment validity (F-03, F-04 directly affect causal inference; F-02 is a decision-criteria inconsistency). P2 and P3 findings are quality improvements that the author can defer if time-constrained.

**Recommended next action:** Revise with `/deliver-prd` before engineering kickoff on Feb 3. Inline the user-story acceptance criteria (F-01), resolve the opt-in-rate threshold conflict (F-02), and decide between the two F-03/F-04 fixes for experiment validity before the Sprint 8 build starts. P2/P3 are author judgment.

**Refusal triggered:** no. The PRD is complete, in scope, above review threshold, and the artifact type is recognized via frontmatter (`artifact: prd`).

## Status

```yaml
artifact:
  path: library/skill-output-samples/deliver-prd/sample_deliver-prd_brainshelf_resurface.md
  type: prd
  thread: brainshelf

findings:
  total: 7
  p0: 1
  p1: 3
  p2: 2
  p3: 1

refusal:
  triggered: false
  reason: null

standards_consulted:
  - skills/deliver-prd/SKILL.md
  - skills/deliver-edge-cases/SKILL.md
  - skills/define-hypothesis/SKILL.md

recommended_action: revise

dispatch:
  mode: inline-execution
  client: codex-cli
```

---

## Notes on This Example

This example demonstrates the dispatch skill's "read pm-critic.md and execute inline" pattern on Codex CLI. The findings reproduce the canonical Brainshelf PRD review (also shipped as `library/sub-agent-samples/pm-critic/sample_pm-critic_brainshelf_prd-review.md`) because the inline execution should produce findings consistent with the native sub-agent output on Claude Code.

The cross-client consistency is the validation criterion for Phase 2 GATE B. If a non-Claude client running this dispatch skill produces findings that diverge significantly from the Claude Code native sub-agent output on the same artifact, the dispatch mechanism is unreliable and the fallback (Option F: clean Claude-Code-only labeling) applies.

## Related Files

- Canonical sub-agent: [`subagents/pm-critic.md`](../../../subagents/pm-critic.md)
- Skill manifest: `SKILL.md`
- Output template: `TEMPLATE.md`
- Native sub-agent sample: [`library/sub-agent-samples/pm-critic/sample_pm-critic_brainshelf_prd-review.md`](../../../library/sub-agent-samples/pm-critic/sample_pm-critic_brainshelf_prd-review.md)
