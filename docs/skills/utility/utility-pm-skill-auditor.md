---
title: "PM Skill Auditor (Dispatch Skill)"
description: "Run a repo-wide cross-cutting governance audit via the pm-skill-auditor sub-agent. Dispatches natively on Claude Code with the pm-skills plugin (invokes @agent-pm-skills:pm-skill-auditor); on non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI) reads agents/pm-skill-auditor.md and executes the system prompt inline. Returns a layered audit report (full findings + Status Summary prose + Status YAML envelope per master plan D26) with cross-cutting findings graded P0/P1/P2/P3 plus aggregate counter audit and validator results table."
generated: true
source: scripts/generate-skill-pages.py
tags:
  - Utility
  - governance
---

:::note[Quick facts]
**Classification:** Utility | **Version:** 1.0.0 | **Category:** governance | **License:** Apache-2.0
:::

**Try it:** `/pm-skills:utility-pm-skill-auditor "Your context here"`

Cross-client dispatch wrapper for the `pm-skill-auditor` sub-agent. Detects runtime; dispatches to the native sub-agent on Claude Code; reads `agents/pm-skill-auditor.md` and executes inline on non-Claude clients.

## When to Use

- You need a repo-wide audit pass: all enforcing validators, cross-cutting checks (skill-without-command, sample gaps, family contract orphans, etc.), and aggregate counter re-derivation against declared values in CONTEXT.md + AGENTS.md + README.md
- You are running on a non-Claude AI client without native pm-skill-auditor sub-agent support
- You are running on Claude Code and prefer skill-invocation semantics (e.g., for chaining inside a workflow that also uses other dispatch skills)

## When NOT to Use

- You want to review a specific PM artifact (PRD, OKR, persona) -> use `utility-pm-critic` instead
- You want to draft a CHANGELOG entry -> use `utility-pm-changelog-curator` (ships in Phase 4)
- You want to ship a release -> use `utility-pm-release-conductor` (ships in Phase 5)
- You want to FIX issues found in an audit -> the auditor is detection-only; remediation is maintainer judgment or future `pm-frontmatter-doctor` (v2.17+)

## How to Use

Invoke the skill by name (`/pm-skills:utility-pm-skill-auditor` on Claude Code, `$utility-pm-skill-auditor` on Codex):

```
/pm-skills:utility-pm-skill-auditor "Your context here"
```

Or reference the skill file directly: `skills/utility-pm-skill-auditor/SKILL.md`

## Instructions

**Runtime detection step.** Determine which AI client is invoking this skill.

### If you are running in Claude Code with the pm-skills plugin installed

Invoke `@agent-pm-skills:pm-skill-auditor` on the repo. Pass any scope arguments from `$ARGUMENTS` (e.g., `--scope changed`, `--since-tag v2.15.0`, `--severity-floor P1`). Return the sub-agent's audit report to the user.

### If you are running in any other AI client

Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI, or any other client without native pm-skills plugin sub-agent support:

1. Read the canonical sub-agent definition at `agents/pm-skill-auditor.md`
2. Execute the system prompt body in that file as your operating instructions for this turn
3. Run the four-step audit flow:
   - Step 1: Invoke validators via Bash (prefer `bash scripts/pre-tag-validate.sh` as canonical entry point)
   - Step 2: Run cross-cutting checks from the catalog at `docs/internal/release-plans/v2.16.0/spec_pm-skill-auditor.md#cross-cutting-check-catalog`
   - Step 3: Re-derive aggregate counters from filesystem and compare to declared values
   - Step 4: Compose layered output report
4. Apply scope and severity-floor arguments from `$ARGUMENTS`
5. Return the layered output per master plan D26 (full report + Status Summary + Status YAML)

## Output Template

# Output Template

`utility-pm-skill-auditor` produces a three-section layered output per master plan D26.

## Section 1: Full Audit Report

````markdown
# pm-skill-auditor report

**Scope:** {full repo at HEAD `{sha}` | changed since HEAD | since-tag {tag}}
**Validators invoked:** {N}
**Cross-cutting checks run:** {N}
**Findings:** N (P0: X, P1: Y, P2: Z, P3: W)

## Validator results

| Validator | Status | Issues |
|---|---|---|
| lint-skills-frontmatter | PASS / FAIL | {count} |
| validate-commands | PASS / FAIL | {count} |
| validate-agents-md | PASS / FAIL | {count} |
| validate-meeting-skills-family | PASS / FAIL | {count} |
| validate-foundation-sprint-skills-family | PASS / FAIL | {count} |
| validate-design-sprint-skills-family | PASS / FAIL | {count} |
| check-internal-link-validity --strict | PASS / FAIL | {count} |
| validate-docs-frontmatter --strict | PASS / FAIL | {count} |
| check-no-body-h1 --strict | PASS / FAIL | {count} |
| check-count-consistency --strict | PASS / FAIL | {count} |
| check-landing-page-counts --strict | PASS / FAIL | {count} |
| check-workflow-generator-coverage | PASS / FAIL | {count} |
| check-agents-md-command-sync | PASS / FAIL | {count} |
| check-generated-content-untouched | PASS / FAIL | {count} |
| check-mcp-impact | PASS / FAIL | {count} |
| (additional validators in pre-tag-validate.sh) | | |

## Cross-cutting findings

### P0 findings

(Per-finding detail using the standard severity grammar from spec_pm-skill-auditor.md. Each finding includes Location / Issue / Why it matters / Fix.)

### P1 findings
### P2 findings
### P3 findings

## Aggregate counter audit

| Surface | Declared | Re-derived | Match |
|---|---|---|---|
| Total skills | {X} | {Y} | YES / NO |
| Phase skills | {X} | {Y} | YES / NO |
| Foundation skills | {X} | {Y} | YES / NO |
| Utility skills | {X} | {Y} | YES / NO |
| Tool skills | {X} | {Y} | YES / NO |
| Sub-agents | {X} | {Y} | YES / NO |
| Commands | {X} | {Y} | YES / NO |
| Workflows | {X} | {Y} | YES / NO |
| Enforcing validators | {X} | {Y} | YES / NO |
| Family contracts | {X} | {Y} | YES / NO |

## Disposition recommendations

- {N} P0 findings: must close before release tag
- {N} P1 findings: close before next major release
- {N} P2 findings: consider in scoping
- {N} P3 findings: skip if time-constrained
````

## Section 2: Status Summary (Prose, for Human Readers)

```markdown
## Status Summary

The audit at {scope} returned {N} findings: {P0: X, P1: Y, P2: Z, P3: W}.

{One paragraph capturing top findings by severity. Counters match? Validators all pass? Cross-cutting issues clustered in a particular area? Explicit recommendation for next action.}

**Refusal triggered:** {yes / no. If yes, explain why per refusal protocols 1-3 in spec_pm-skill-auditor.md.}
```

## Section 3: Status YAML (Machine-Parseable, for Parent Sub-Agent or Tooling)

````markdown
## Status

```yaml
status: pass | fail | refused
p0_count: {integer}
p1_count: {integer}
p2_count: {integer}
p3_count: {integer}
counters_match: true | false
validators_pass: true | false
scope: full | changed | since-tag {tag}
refusal_reason: null | "validators not invocable" | "repo state ambiguous" | "scope unclear"

# Detailed counter breakdown for downstream consumption:
counters:
  declared:
    total_skills: {integer}
    sub_agents: {integer}
    commands: {integer}
    workflows: {integer}
    enforcing_validators: {integer}
  derived:
    total_skills: {integer}
    sub_agents: {integer}
    commands: {integer}
    workflows: {integer}
    enforcing_validators: {integer}

dispatch:
  mode: native-subagent | inline-execution
  client: claude-code | codex-cli | cursor | windsurf | copilot | gemini-cli | other
```
````

## Chained Handoff Notes

When invoked from `pm-release-conductor` at gate G0:

- All three sections MUST be present
- The conductor parses Section 3 YAML for advancement decisions
- The maintainer reads Sections 1 + 2 for human context
- If `status: refused` in Section 3, conductor surfaces Section 2 refusal narrative to maintainer
- If `p0_count > 0`, conductor blocks advancement past G0 per master plan D23

## Related Files

- Canonical sub-agent: [`agents/pm-skill-auditor.md`](../../../agents/pm-skill-auditor.md)
- Worked example: `EXAMPLE.md`
- Behavioral spec: [`docs/internal/release-plans/v2.16.0/spec_pm-skill-auditor.md`](../../../docs/internal/release-plans/v2.16.0/spec_pm-skill-auditor.md)

## Example Output

<details>
<summary>Example: pm-skill-auditor Dispatch on Cursor</summary>

# Example: pm-skill-auditor Dispatch on Cursor

This example shows what `utility-pm-skill-auditor` produces when invoked on a non-Claude client (here, Cursor). The dispatch skill reads `agents/pm-skill-auditor.md` as its operating instructions and executes the four-step audit inline.

## Invocation

```
cursor> /utility-pm-skill-auditor --scope full --severity-floor P1
```

## Skill behavior

1. **Runtime detection.** The skill detects it is running in Cursor (not Claude Code with pm-skills plugin), so it takes the non-Claude branch.
2. **Reads canonical sub-agent definition.** Loads `agents/pm-skill-auditor.md` as the operating system prompt.
3. **Step 1 of agent flow: invoke validators.** Runs `bash scripts/pre-tag-validate.sh` (canonical orchestration entry point). Captures output.
4. **Step 2: run cross-cutting checks.** Reads catalog from `docs/internal/release-plans/v2.16.0/spec_pm-skill-auditor.md#cross-cutting-check-catalog`. Runs each check against current repo state.
5. **Step 3: re-derive aggregate counters.** Counts skill directories by classification prefix; counts commands; counts sub-agents; compares to declared values.
6. **Step 4: compose layered output.** Returns the three-section report below.

## Output (verbatim from dispatch skill execution)

# pm-skill-auditor report

**Scope:** full repo at HEAD `00b3978`
**Validators invoked:** 16
**Cross-cutting checks run:** 14
**Findings:** 4 (P0: 0, P1: 2, P2: 2, P3: 0 [hidden by --severity-floor P1])

## Validator results

| Validator | Status | Issues |
|---|---|---|
| lint-skills-frontmatter | PASS | 0 |
| validate-commands | PASS | 0 |
| validate-agents-md | PASS | 0 |
| validate-meeting-skills-family | PASS | 0 |
| validate-foundation-sprint-skills-family | PASS | 0 |
| validate-design-sprint-skills-family | PASS | 0 |
| check-internal-link-validity --strict | PASS | 0 |
| validate-docs-frontmatter --strict | PASS | 0 |
| check-no-body-h1 --strict | PASS | 0 |
| check-count-consistency --strict | PASS | 0 |
| check-landing-page-counts --strict | PASS | 0 |
| check-workflow-generator-coverage | PASS | 0 |
| check-agents-md-command-sync | PASS | 0 |
| check-generated-content-untouched | PASS | 0 |
| validate-mcp-sync | PASS | 0 |
| check-mcp-impact | PASS (advisory) | 0 |

## Cross-cutting findings

### P1 findings

#### F-01: Deprecated reference to a removed skill path (deprecation tracking)

**Location:** `library/skill-output-samples/develop-feature-spike/` (illustrative)
**Issue:** A sample references `skills/develop-feature-spike/SKILL.md`, a skill directory deleted in a prior cycle. The path no longer resolves.
**Why it matters:** Dead references break the docs link-validity gate and mislead users about the catalog.
**Fix:** Repoint the sample to the surviving skill (`develop-spike-summary`), or delete the orphaned sample. Re-run `check-internal-link-validity --strict`.

#### F-02: Sample gap on dispatch skill utility-pm-skill-auditor

**Location:** `library/skill-output-samples/utility-pm-skill-auditor/` (does not exist)
**Issue:** The newly shipped dispatch skill has no library samples in `library/skill-output-samples/`. Other utility skills (utility-pm-skill-builder, utility-pm-skill-validate, utility-mermaid-diagrams) have samples there.
**Why it matters:** Discoverability and quality demonstration. New users land on the skill via docs site and look for samples; finding none reduces confidence.
**Fix:** Author 1-3 library samples for this dispatch skill showing audit output against current repo state. Phase 6 task or v2.17 cleanup.

### P2 findings

#### F-03: Description overlap between pm-critic dispatch skill and pm-skill-auditor dispatch skill (low risk)

**Location:** `skills/utility-pm-critic/SKILL.md` description vs `skills/utility-pm-skill-auditor/SKILL.md` description
**Issue:** Both descriptions begin with the dispatch-skill mechanism boilerplate ("Dispatches natively on Claude Code with the pm-skills plugin..."). The descriptions are distinct enough downstream that intent classifier should disambiguate, but the lead-in text is similar.
**Why it matters:** Slight discoverability collision risk if Claude's classifier matches on early-string similarity.
**Fix:** Lead with the unique mission ("Run adversarial review on a PM artifact..." vs "Run a repo-wide cross-cutting governance audit...") and put the dispatch mechanism in the second sentence. v2.17 cleanup acceptable.

#### F-04: Thread imbalance on pm-critic sub-agent samples (Phase 6 will resolve)

**Location:** `library/sub-agent-samples/pm-critic/`
**Issue:** Only 1 of 3 planned samples shipped (brainshelf). Storevine and workbench samples are Phase 6 deliverables.
**Why it matters:** Phase 6 closes this; not a defect, just an in-progress state.
**Fix:** Phase 6 Task 23 ships the remaining 2.

## Aggregate counter audit

| Surface | Declared | Re-derived | Match |
|---|---|---|---|
| Total skills | 55 | 57 | NO (P2 - dispatch skills not yet in counters) |
| Phase skills | 26 | 26 | YES |
| Foundation skills | 8 | 8 | YES |
| Utility skills | 6 | 8 | NO (P2 - 2 dispatch skills added in v2.16 Phase 2-3) |
| Tool skills | 15 | 15 | YES |
| Sub-agents | 4 (planned) | 2 | EXPECTED (Phase 4-5 ship remaining 2) |
| Commands | 62 | 64 | NO (P2 - 2 new commands utility-pm-critic utility-pm-skill-auditor not in declared count) |
| Workflows | 12 | 12 | YES |
| Enforcing validators | 27 | 27 | YES |
| Family contracts | 3 | 3 | YES |

**Counter notes:** mismatch in skills/utility/commands columns is EXPECTED in-cycle. The mismatch reflects the in-progress nature of v2.16 (dispatch skills + new commands shipped in Phase 2-3 but declared counts in README/AGENTS still reflect v2.15.x baseline). These will reconcile during the pre-tag artifact pass (master plan Phase 8 equivalent) when README + AGENTS + CONTEXT.md get refreshed.

## Disposition recommendations

- 0 P0 findings: clean to advance G0 gate (conductor would PASS)
- 2 P1 findings: F-01 resolves automatically when Phase 5 ships; F-02 should be scheduled (Phase 6 or v2.17)
- 2 P2 findings: F-03 cosmetic; F-04 in-progress (Phase 6 closes)
- P3 findings hidden by --severity-floor P1

---

## Status Summary

Pre-release audit at HEAD 00b3978 (post-Phase-2) returned 4 findings: 0 P0, 2 P1, 2 P2, 0 P3.

All 16 enforcing validators pass. No cross-cutting issues block ship. The two P1 findings are forward-looking: F-01 is a Phase 5 deliverable (will resolve when conductor ships); F-02 is a sample gap on the newly shipped dispatch skill (schedule for Phase 6 or v2.17). The two P2 findings are cosmetic or in-progress. The aggregate counter audit shows expected in-cycle drift between declared (v2.15.x baseline) and re-derived (v2.16 in-progress) counts; the pre-tag artifact pass will reconcile these.

**Recommended next action:** Continue with Phase 3-5 sub-agent authoring. No release-blocking issues. Re-run audit at end of Phase 5 to capture full slate.

**Refusal triggered:** no.

## Status

```yaml
status: pass
p0_count: 0
p1_count: 2
p2_count: 2
p3_count: 0
counters_match: false
validators_pass: true
scope: full
refusal_reason: null

counters:
  declared:
    total_skills: 55
    sub_agents: 4
    commands: 62
    workflows: 12
    enforcing_validators: 27
  derived:
    total_skills: 57
    sub_agents: 2
    commands: 64
    workflows: 12
    enforcing_validators: 27

dispatch:
  mode: inline-execution
  client: cursor
```

---

## Notes on This Example

The example shows a realistic mid-cycle audit (post-Phase 2 of v2.16.0). The findings reflect actual in-progress state: dispatch skills added, declared counts not yet reconciled (which is appropriate - counter reconciliation happens at pre-tag artifact pass, not at every phase boundary).

For a release-prep audit (post-Phase 5 + pre-tag), the same auditor would re-run after CONTEXT.md / AGENTS.md / README.md count refreshes; the counters_match field would flip to true; any remaining drift becomes P0 because at pre-tag scope, declared counts going to release notes must be correct.

## Related Files

- Canonical sub-agent: [`agents/pm-skill-auditor.md`](../../../agents/pm-skill-auditor.md)
- Skill manifest: `SKILL.md`
- Output template: `TEMPLATE.md`

</details>
