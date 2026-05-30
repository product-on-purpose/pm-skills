---
title: "pm-skill-auditor report: cross-cutting check catches skill-without-command (Workbench thread)"
description: "pm-skill-auditor audit demonstrating the skill-without-command cross-cutting check (and command-without-skill orphan). Catches a P0 + P1 pair that no single validator catches alone."
artifact: pm-skill-auditor-report
version: "1.0"
repo_version: "2.16.0-dev"
agent_version: "1.0.0"
created: 2026-05-17
status: sample
thread: workbench
context: Mid-cycle audit catching cross-cutting issues during Workbench platform team development
---

> **Historical sample (v2.16 development).** The skill/command symmetry check demonstrated here was retired in v2.22.0 when the per-skill command-wrapper layer was removed. The auditor's surviving cross-cutting checks (deprecated-reference, sample-gap, counter-drift, family-contract integrity, tool-classification leak) are catalogued in `docs/internal/release-plans/v2.16.0/spec_pm-skill-auditor.md`.

## Scenario

The Workbench platform team added a new skill `develop-platform-spike-summary` for tracking platform-level technical spike work, but did not ship the matching `commands/platform-spike-summary.md`. They also deleted a deprecated skill `develop-feature-spike` but left `commands/feature-spike.md` orphaned. Both issues pass individual validators (the new skill's frontmatter is valid; the orphaned command has valid frontmatter), but the cross-cutting symmetry check catches both.

## Output

# pm-skill-auditor report

**Scope:** full repo at HEAD `{sha}`
**Validators invoked:** 16
**Cross-cutting checks run:** 14
**Findings:** 3 (P0: 1, P1: 1, P2: 1)

## Validator results

All 16 enforcing validators PASS. The new skill has valid frontmatter; the orphaned command has valid frontmatter; neither validator catches the cross-cutting issue alone.

## Cross-cutting findings

### P0 findings

#### F-01: Command-without-skill orphan (release-blocker)

**Location:** `commands/feature-spike.md` references `skills/develop-feature-spike/SKILL.md` but that path no longer exists (skill was deleted in commit `{sha}`)
**Issue:** Per pm-skill-auditor cross-cutting check "Command without skill", the command would 404 at runtime: a user who invokes `/feature-spike` triggers a "skill not found" failure. The command is dead.
**Why it matters:** At any scope (mid-cycle, release-prep), an orphaned command degrades the user experience. At release-prep scope, this is P0 because the release ships with broken slash commands.
**Fix:** Either restore `skills/develop-feature-spike/SKILL.md` (if the deletion was unintended), OR delete `commands/feature-spike.md` (and document the removal in the CHANGELOG's Removed section per Keep-a-Changelog convention).

### P1 findings

#### F-02: Skill-without-command (newly-shipped skill is undiscoverable)

**Location:** `skills/develop-platform-spike-summary/SKILL.md` exists but no `commands/platform-spike-summary.md` exists
**Issue:** Per pm-skill-auditor cross-cutting check "Skill without command", the new skill is undiscoverable via slash commands. Users can read the skill file but cannot invoke it via the standard `/{skill-name}` UX.
**Why it matters:** Discoverability gap. Per the then-current master plan D6, retired in v2.22.0 (every sub-agent then shipped a companion command, with analogous discipline for skills).
**Fix:** Author `commands/platform-spike-summary.md` following the standard pattern (description frontmatter + body referencing `skills/develop-platform-spike-summary/SKILL.md`).

### P2 findings

#### F-03: Sample gap on newly-shipped skill

**Location:** `library/skill-output-samples/develop-platform-spike-summary/` does not exist
**Fix:** Author 1-3 library samples in next sprint, OR defer to v2.17 cleanup.

## Aggregate counter audit

All counters match declared values. The cross-cutting symmetry issues do not affect counter totals (a 1-for-1 add/delete that happened to break the pairing invariant).

---

## Status Summary

The audit returned 3 findings: 1 P0, 1 P1, 1 P2.

The P0 (F-01) is a release-blocker but easily fixable. The P1 (F-02) is the symmetric case: new skill exists without command. Together these two findings illustrate why the cross-cutting symmetry check matters - both pass individual validators (frontmatter is valid in both cases) but the seams between them are broken.

**Recommended next action:** Decide on the disposition of `develop-feature-spike` (restore or remove). If removing, delete the command and document in CHANGELOG. Ship the missing command for `develop-platform-spike-summary` in the same commit.

**Refusal triggered:** no.

## Status

```yaml
status: fail
p0_count: 1
p1_count: 1
p2_count: 1
p3_count: 0
counters_match: true
validators_pass: true
scope: full
refusal_reason: null

dispatch:
  mode: native-subagent
  client: claude-code
```

---

## Notes on This Sample

This sample demonstrates the cross-cutting symmetry checks that no individual validator catches: skill-without-command AND command-without-skill. The pattern is symmetric and well-defined; the auditor's value-add is sweeping the seams between validators.

For pm-skill-auditor's role: this is 3 of 3 thread-aligned samples, completing the catalog (brainshelf pre-release + storevine drift-detection + workbench cross-cutting).
