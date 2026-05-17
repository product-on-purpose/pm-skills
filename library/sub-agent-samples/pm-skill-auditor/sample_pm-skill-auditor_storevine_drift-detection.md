---
title: "pm-skill-auditor report: aggregate counter drift detection (Storevine thread)"
description: "pm-skill-auditor audit demonstrating the canonical aggregate-counter drift detection pattern. Catches a P0 mismatch between CONTEXT.md declared count and filesystem-derived count, the kind of bug the v2.12.0 release-state derived-number drift codified into a class. Synthetic but realistic scenario."
artifact: pm-skill-auditor-report
version: "1.0"
repo_version: "2.16.0-dev"
agent_version: "1.0.0"
created: 2026-05-17
status: sample
thread: storevine
context: Pre-release audit catching an aggregate-counter drift on the Storevine analytics module's catalog count
---

## Scenario

Synthetic-but-realistic: the Storevine analytics team's catalog declared count drifted out of sync with the actual file count after a fast-moving 3-day sprint. The auditor catches it pre-release as a P0 because at release scope, declared counts going to release notes must match reality.

## Output

# pm-skill-auditor report

**Scope:** full repo at HEAD `{sha}`
**Validators invoked:** 16
**Cross-cutting checks run:** 14
**Findings:** 4 (P0: 1, P1: 1, P2: 1, P3: 1)

## Validator results

All 16 enforcing validators PASS. (Cross-cutting drift is not caught by any single validator; that is the gap pm-skill-auditor closes.)

## Cross-cutting findings

### P0 findings

#### F-01: Aggregate counter drift - CONTEXT.md vs filesystem-derived (BLOCKS release)

**Location:** `AGENTS/claude/CONTEXT.md` per-phase tables (line 47, "Active Tools" count)
**Issue:** CONTEXT.md declares "12 active tools." Re-derived from filesystem: 14 tools (Storevine team added 2 new tool entries in commits {sha-1} and {sha-2} without updating CONTEXT.md). The drift would propagate to release notes if shipped.
**Why it matters:** This is the same defect class as v2.12.0's release-state derived-number drift (codified in memory `feedback_stale-aggregate-counter`). At pre-release scope, a 2-count mismatch in declared release notes is misleading to users.
**Fix:** Update CONTEXT.md "Active Tools" count from 12 to 14. Re-run audit. Same defect class: when shipping items, re-derive and update Progress Dashboard summaries and per-bucket totals in the SAME commit as the item ship.

### P1 findings

#### F-02: Sample gap on newly-shipped tool

**Location:** `library/skill-output-samples/tool-analytics-segmenter/` (does not exist; tool added but no samples)
**Fix:** Author 1-3 library samples or schedule for v2.17.

### P2 findings

#### F-03: Thread imbalance: all recent samples in Storevine thread

**Location:** `library/skill-output-samples/` recent additions
**Fix:** Author brainshelf or workbench-thread samples in next planning cycle.

### P3 findings

#### F-04: Frontmatter version drift in tool-analytics-segmenter (HISTORY.md says 1.0.0; SKILL.md says 1.0.1)

**Fix:** Reconcile to match.

## Aggregate counter audit

| Surface | Declared | Re-derived | Match |
|---|---|---|---|
| Total skills | 55 | 55 | YES |
| Tools (in CONTEXT.md "Active Tools") | 12 | 14 | **NO (P0 drift)** |
| Sub-agents | 4 | 4 | YES |
| Commands | 64 | 64 | YES |

---

## Status Summary

The audit returned 4 findings: 1 P0, 1 P1, 1 P2, 1 P3.

The P0 (F-01) is a release-blocker: CONTEXT.md declares 12 active tools but filesystem has 14. At pre-release scope, this drift would propagate to release notes as a misleading count. This is the v2.12.0 stale-aggregate-counter defect class codified in memory `feedback_stale-aggregate-counter`.

**Recommended next action:** Update CONTEXT.md to reflect 14 tools, re-run audit, then proceed with release. The pre-release flow is blocked at G0 sub-check 4 (Aggregate counters match declared) until this is resolved.

**Refusal triggered:** no.

## Status

```yaml
status: fail
p0_count: 1
p1_count: 1
p2_count: 1
p3_count: 1
counters_match: false
validators_pass: true
scope: full
refusal_reason: null

counters:
  declared:
    total_skills: 55
    active_tools: 12
    sub_agents: 4
    commands: 64
  derived:
    total_skills: 55
    active_tools: 14
    sub_agents: 4
    commands: 64

dispatch:
  mode: native-subagent
  client: claude-code
```

---

## Notes on This Sample

This sample demonstrates the canonical aggregate-counter drift detection pattern. The defect class (the v2.12.0 release-state derived-number drift) is codified in memory `feedback_stale-aggregate-counter` as a recurring pattern. The auditor's role at G0 is to catch this BEFORE release notes ship; if the conductor at G0 receives `counters_match: false`, the gate fails and the maintainer must reconcile.

For pm-skill-auditor's role: this is 2 of 3 thread-aligned samples (brainshelf pre-release + storevine drift-detection + workbench cross-cutting).
