---
title: "pm-critic findings: Workbench sprint review recap"
description: "pm-critic adversarial review of a Workbench sprint review meeting recap. Demonstrates family-contract compliance checks (Meeting Skills Family rules from docs/reference/skill-families/meeting-skills-contract.md) and decision-action coherence checks. 5 findings (1 P0, 2 P1, 2 P2)."
artifact: pm-critic-findings
version: "1.0"
repo_version: "2.16.0-dev"
agent_version: "1.0.0"
created: 2026-05-17
status: sample
thread: workbench
context: Adversarial review of a sprint 14 review meeting recap for the Workbench platform team
---

## Scenario

After the Workbench platform team's sprint 14 review meeting, the recap was produced via `/foundation-meeting-recap` and pm-critic auto-fired. The recap is a Meeting Skills Family member; pm-critic reads the family contract at `docs/reference/skill-families/meeting-skills-contract.md` to apply family-specific rules.

## Output

# pm-critic findings: Workbench sprint 14 review recap

**Artifact reviewed:** `library/skill-output-samples/foundation-meeting-recap/sample_foundation-meeting-recap_workbench_sprint14-review.md` (notional path)
**Standards consulted:** `docs/reference/skill-families/meeting-skills-contract.md` (family rules), `skills/foundation-meeting-recap/SKILL.md` (recap output contract)
**Findings:** 5 (P0: 1, P1: 2, P2: 2, P3: 0)

## P0 findings

### F-01: Decision recorded without owner (family contract rule M4 violation)

**Location:** Topic 3 "Quarterly migration plan", line 89
**Issue:** Recap reads "**Decision:** we will move ahead with vendor X for the migration." No owner. No due date.
**Why it matters:** Per `docs/reference/skill-families/meeting-skills-contract.md` Rule M4: every decision in a recap has an owner and a date or due-by reference. Without an owner, the decision cannot be tracked; without a date, it cannot be paired with downstream actions.
**Fix:** Add owner + due date inline: "**Decision** (owner: Jane Doe, due 2026-06-01): we will move ahead with vendor X for the migration."

## P1 findings

### F-02: Decision-action coherence gap

**Location:** Topic 3 decision (line 89) vs Actions section (lines 105-112)
**Issue:** The decision states "move ahead with vendor X." The Actions section has 4 follow-ups but none of them concern the vendor X engagement (kickoff scheduling, contract review, integration spike). A decision should produce at least one paired action that operationalizes it.
**Why it matters:** Per `skills/foundation-meeting-recap/SKILL.md` output contract, decision-action coherence is a quality criterion. A decision without a paired action either won't happen or won't be tracked.
**Fix:** Add a paired action: "**Action** (owner: Jane Doe, due 2026-05-31): schedule kickoff with vendor X; circulate timeline by EOW." OR explicitly note "no immediate actions; vendor X engagement starts Q3" if intentional.

### F-03: Topic-segmented body but consolidated Actions section duplicates

**Location:** Actions section, lines 105-112
**Issue:** Per Meeting Skills Family rule M3, recaps are topic-segmented with actions captured inline per topic, PLUS an optional consolidated Actions view at the end. The current artifact has BOTH (actions inline at each topic + the consolidated section at the end), but the consolidated section repeats the inline actions verbatim, creating duplication risk.
**Fix:** Either remove the duplicated inline actions (consolidated section becomes canonical), OR make the consolidated section a "summary view" with shortened entries that reference the topic-inline detail.

## P2 findings

### F-04: Attendee list incomplete

**Location:** Attendees section (line 12)
**Issue:** 8 attendees listed but the meeting notes reference "Sam" twice without "Sam" appearing in the attendee list. Either Sam was a late-joiner not captured, or the references are to someone whose surname clarifies them in the list.
**Fix:** Add Sam to the attendee list if applicable, OR disambiguate the in-body references (e.g., "Sam Wilson" not just "Sam").

### F-05: Sprint number versus calendar period not cross-referenced

**Location:** Header (line 5) "Sprint 14 Review"
**Issue:** "Sprint 14" is the team's internal calendar; a future maintainer or new team member may not know which calendar period it corresponds to.
**Fix:** Add a one-line "Sprint 14 = 2026-04-22 to 2026-05-05" reference at the top.

---

## Status Summary

The Workbench sprint 14 review recap returned 5 findings: 1 P0, 2 P1, 2 P2, 0 P3.

The single P0 is a Meeting Skills Family contract violation (decision without owner); P1 findings cluster around decision-action coherence and a structural duplication. P2 findings are minor improvements.

**Recommended next action:** Revise the recap with `/foundation-meeting-recap` adding owner + due date to the Topic 3 decision and either pairing or explicitly deferring the vendor X action. Resolve duplication in Actions section in same revision.

**Refusal triggered:** no.

---

## Notes on This Sample

This sample demonstrates pm-critic's family-contract awareness: it reads `docs/reference/skill-families/meeting-skills-contract.md` to apply Meeting Skills Family rules (M3, M4 cited above) on top of the per-skill contract from `foundation-meeting-recap`.

For pm-critic's role: this is 3 of 3 thread-aligned samples for pm-critic, completing the catalog (brainshelf PRD + storevine OKR + workbench meeting recap).
