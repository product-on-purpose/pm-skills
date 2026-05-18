---
title: "PM Critic (Dispatch Skill)"
description: "Run adversarial review on a PM artifact via the pm-critic sub-agent. Dispatches natively on Claude Code with the pm-skills plugin (invokes @agent-pm-critic); on non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI) reads subagents/pm-critic.md and executes the system prompt inline. Returns findings graded P0/P1/P2/P3 with concrete fix suggestions per finding, plus a layered Status Summary section and machine-readable Status YAML block per master plan D26."
generated: true
source: scripts/generate-skill-pages.py
tags:
  - Utility
  - review
---

:::note[Quick facts]
**Classification:** Utility | **Version:** 1.0.0 | **Category:** review | **License:** Apache-2.0
:::

**Try it:** `/pm-critic "Your context here"`

This skill is a cross-client dispatch wrapper for the `pm-critic` sub-agent. It exists so that users on non-Claude clients can run adversarial review with the same intent as Claude Code users, without depending on native plugin sub-agent infrastructure.

Per master plan D11 (amended) + D30, sub-agents are a Claude Code plugin feature. Non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI) cannot natively load `subagents/pm-critic.md`. This skill bridges the gap.

## When to Use

- You want adversarial review of a PM artifact (PRD, OKR set, persona, lean canvas, meeting recap, interview synthesis, problem statement, hypothesis, edge case catalog, retrospective, etc.)
- You are running on a non-Claude AI client and the `pm-critic` sub-agent is not natively available
- You are running on Claude Code and prefer skill-invocation semantics over sub-agent semantics (e.g., for consistency across a multi-step workflow that mixes skills and sub-agent intents)

## When NOT to Use

- You want a structural lint / repo-level audit -> use `utility-pm-skill-auditor` (audits skills + repo state) instead
- You want to author an artifact (this skill only reviews) -> use the appropriate phase skill (deliver-prd, foundation-okr-writer, etc.)
- You want code review -> use a code-review-specific tool (this skill is for PM artifacts)
- You want to enforce style rules like em-dash sweep -> that is `pm-release-conductor`'s G0 gate, not this skill

## How to Use

Use the `/pm-critic` slash command:

```
/pm-critic "Your context here"
```

Or reference the skill file directly: `skills/utility-pm-critic/SKILL.md`

## Instructions

**Runtime detection step.** Determine which AI client is invoking this skill.

### If you are running in Claude Code with the pm-skills plugin installed

Invoke `@agent-pm-critic` on the target artifact. Pass the artifact path as argument (or the most recent artifact in session context if no argument is provided). Return the sub-agent's findings to the user. No further action needed from this skill - the sub-agent handles the review natively in its own context window.

### If you are running in any other AI client

Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI, ChatGPT, or any other client without native pm-skills plugin sub-agent support:

1. Read the canonical sub-agent definition at `subagents/pm-critic.md`
2. Execute the system prompt body in that file as your operating instructions for this turn
3. Read the target PM artifact specified by the user (path from `$ARGUMENTS`, or most recently produced artifact in session)
4. Read the canonical standards docs referenced by the pm-critic system prompt for the artifact type (e.g., `skills/foundation-okr-writer/SKILL.md` for OKR sets, `skills/deliver-prd/SKILL.md` for PRDs)
5. Produce findings graded P0/P1/P2/P3 with concrete fix suggestions, formatted per the output structure documented in `docs/guides/adversarial-review.md`
6. End the output with the layered structure per master plan D26:
   - Section (1): full human-readable findings (the P0/P1/P2/P3 report)
   - Section (2): `## Status Summary` in prose, summarizing what was found and what the user should do next
   - Section (3): `## Status` YAML block with machine-readable fields

## Output Template

# Output Template

When `utility-pm-critic` produces output (either via native sub-agent dispatch on Claude Code or via inline execution on non-Claude clients), the output follows this three-section layered structure per master plan D26.

## Section 1: Full Findings Report

```markdown
# pm-critic findings: {artifact name}

**Artifact reviewed:** {file path or session-context reference}
**Standards consulted:** {comma-separated list of contract docs read at invocation}
**Findings:** N (P0: X, P1: Y, P2: Z, P3: W)

## P0 findings

### F-01: {short finding title (one line)}

**Location:** {line range or section heading in the artifact}
**Issue:** {what is wrong, written precisely}
**Why it matters:** {consequence if shipped as-is}
**Fix:** {concrete change to make, including specific text or restructuring}

### F-02: {next finding}
...

## P1 findings

(same per-finding structure as P0)

## P2 findings

(same per-finding structure as P0; can be more abbreviated)

## P3 findings

(same per-finding structure as P0; one-line findings acceptable)
```

If no findings at a severity, omit that section heading. If zero findings total, output the canonical "passes adversarial review" line per `subagents/pm-critic.md`.

## Section 2: Status Summary (Prose, for Human Readers)

```markdown
## Status Summary

The {artifact type} review returned N findings: {P0: X, P1: Y, P2: Z, P3: W}.

{One paragraph summarizing the top 1-3 issues by severity. Plain English. No bullets.}

**Recommended next action:** {explicit recommendation - revise with producing skill, defer to maintainer judgment, accept all P2/P3 and ship, etc.}

**Refusal triggered:** {yes/no. If yes, explain why. Refusal protocols are in subagents/pm-critic.md.}
```

This section is for the human reader (PM or maintainer). It captures the "what does this mean" in prose so the reader does not have to interpret the findings table to make a decision.

## Section 3: Status YAML (Machine-Parseable, for Parent Sub-Agent or Tooling)

````markdown
## Status

```yaml
artifact:
  path: {file path of reviewed artifact}
  type: {prd | okr-set | persona | lean-canvas | meeting-recap | etc.}
  thread: {brainshelf | storevine | workbench | other | none}

findings:
  total: {integer}
  p0: {integer}
  p1: {integer}
  p2: {integer}
  p3: {integer}

refusal:
  triggered: {true | false}
  reason: {null OR one-line explanation if triggered}

standards_consulted:
  - {path to first standards doc read}
  - {path to second}
  - ...

recommended_action: {revise | accept-and-ship | escalate | refused}

dispatch:
  mode: {native-subagent | inline-execution}
  client: {claude-code | codex-cli | cursor | windsurf | copilot | gemini-cli | other}
```
````

The YAML block enables programmatic consumption: a parent sub-agent (e.g., `pm-release-conductor` at gate G0) can parse the YAML to decide whether to advance the release flow. A CI workflow or automation can parse it to integrate findings into a tracking system.

## Format Notes

- All three sections are present in every output, even if Section 1 is the "zero findings" line or Section 2 reports a clean review
- The Status YAML uses the four-space indentation pattern shown above; YAML parsers tolerate it but the indentation MUST be consistent within a single output
- The `dispatch.mode` field distinguishes native sub-agent runs (sub-agent context isolation, no inline execution) from inline execution runs (sub-agent system prompt executed in the dispatch skill's context). Useful for telemetry and debugging.
- If the dispatch skill is invoked on Claude Code and the native sub-agent succeeds, the sub-agent itself produces all three sections; the dispatch skill simply relays them. If the dispatch skill is invoked on a non-Claude client, the dispatch skill produces all three sections itself by executing the pm-critic system prompt inline.

## Related Files

- Canonical sub-agent: [`subagents/pm-critic.md`](../../../subagents/pm-critic.md)
- Worked example: `EXAMPLE.md`
- User guide: [`docs/guides/adversarial-review.md`](../../../docs/guides/adversarial-review.md)

## Example Output

<details>
<summary>Example: pm-critic Dispatch on Codex CLI</summary>

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

</details>

## Output Format

See `references/TEMPLATE.md` for the canonical output structure (with the layered Status envelope per D26). See `references/EXAMPLE.md` for a worked example showing a real cross-client dispatch run against a PRD.
