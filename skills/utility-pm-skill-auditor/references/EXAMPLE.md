---
title: "pm-skill-auditor Dispatch Example: Pre-release audit on Cursor"
description: Worked example of utility-pm-skill-auditor dispatch skill execution on a non-Claude client (Cursor). Demonstrates inline execution of the pm-skill-auditor system prompt with the four-step audit flow plus full P0/P1/P2/P3 findings + Status Summary prose + Status YAML envelope per master plan D26.
---

# Example: pm-skill-auditor Dispatch on Cursor

This example shows what `utility-pm-skill-auditor` produces when invoked on a non-Claude client (here, Cursor). The dispatch skill reads `subagents/pm-skill-auditor.md` as its operating instructions and executes the four-step audit inline.

## Invocation

```
cursor> /utility-pm-skill-auditor --scope full --severity-floor P1
```

## Skill behavior

1. **Runtime detection.** The skill detects it is running in Cursor (not Claude Code with pm-skills plugin), so it takes the non-Claude branch.
2. **Reads canonical sub-agent definition.** Loads `subagents/pm-skill-auditor.md` as the operating system prompt.
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

#### F-01: Sub-agent without companion command (sub-agent integrity, violates D6)

**Location:** `subagents/pm-release-conductor.md` (does not yet exist as of HEAD; expected per master plan Phase 5)
**Issue:** Phase 5 plan ships `subagents/pm-release-conductor.md` paired with `commands/release.md`. As of HEAD, neither exists. Once authored, ensure the pair lands in the same commit per `subagents/_pairing.yaml`.
**Why it matters:** D6 requires every sub-agent to ship with a companion slash command. Missing the command makes the sub-agent harder for users to discover.
**Fix:** This is a forward finding (Phase 5 work). Re-run audit after Phase 5 ships; finding should resolve.

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
| Commands | 62 | 64 | NO (P2 - 2 new commands /critic /audit-repo not in declared count) |
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

- Canonical sub-agent: [`subagents/pm-skill-auditor.md`](../../../subagents/pm-skill-auditor.md)
- Skill manifest: [`SKILL.md`](../SKILL.md)
- Output template: [`TEMPLATE.md`](./TEMPLATE.md)
