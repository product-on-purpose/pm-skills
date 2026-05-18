---
title: "pm-release-conductor sample: G0 failure + maintainer recovery (Storevine thread)"
description: "pm-release-conductor walking 6 gates with a G0 aggregate-counter-drift failure on first attempt. Maintainer fixes the drift; conductor re-runs G0 from the top; subsequent gates pass. Demonstrates the failure-recovery loop, the no-bypass discipline, and G0 idempotency."
artifact: pm-release-conductor-run
version: "1.0"
repo_version: "2.16.0-dev"
agent_version: "1.0.0"
created: 2026-05-17
status: sample
thread: storevine
context: Release attempt with G0 failure surface and maintainer recovery; subsequent re-invocation succeeds
---

## Scenario

The Storevine analytics team attempts to ship a release but G0 catches an aggregate-counter drift (CONTEXT.md declares 12 tools; filesystem has 14). The conductor REFUSES to advance to G1. The maintainer fixes the count in CONTEXT.md, commits, and re-invokes `/pm-release`. The second run passes G0 and the remaining gates.

## Output (Attempt 1: G0 Failure)

# pm-release-conductor: v2.16.0 (attempt 1)

**Target:** v2.16.0
**Branch:** main

## Gate G0: Pre-Tag Readiness
1. Working tree clean: PASS
2. Pre-tag validator bundle: PASS
3. Em-dash sweep: PASS
4. **Aggregate counters: FAIL**
   - CONTEXT.md declares "12 active tools"; re-derived from filesystem: 14
   - The drift would propagate to release notes as a misleading count
5. Cross-cutting audit (chained to pm-skill-auditor): WAITING (skipped due to sub-check 4 failure)
6. Required files: PASS

**Gate status:** FAIL. Cannot advance to G1.

**Blocker:** Aggregate counter drift in CONTEXT.md. Resolve before re-invoking:
- Update `AGENTS/claude/CONTEXT.md` "Active Tools" count from 12 to 14
- Re-run pm-skill-auditor manually to verify
- Re-invoke `/pm-release v2.16.0` once resolved

---

(Maintainer pauses release. Updates CONTEXT.md manually, commits `chore: reconcile active-tools count`, then re-invokes.)

---

## Output (Attempt 2: After Recovery)

# pm-release-conductor: v2.16.0 (attempt 2; after recovery commit)

**Target:** v2.16.0
**Branch:** main

## Gate G0: Pre-Tag Readiness
1. Working tree clean: PASS
2. Pre-tag validator bundle: PASS
3. Em-dash sweep: PASS
4. Aggregate counters: PASS (14 = 14)
5. Cross-cutting audit: PASS (0 P0)
6. Required files: PASS

**Gate status:** PASS. Proceed to G1?
> User: yes

(Gates G1 through G4 proceed cleanly; not detailed here.)

---

## Release complete: v2.16.0

**Tag:** v2.16.0 (annotated, pushed to origin at G2.5-captured SHA)
**G0 PASS (attempt 2) / G1 PASS / G2 PASS / G2.5 PASS / G3 PASS / G4 PASS**

---

## Notes on This Sample

This sample demonstrates the failure-recovery loop:

1. **G0 failure pauses release.** The conductor refuses to advance to G1 when sub-check 4 fails. No bypass option per master plan D24.
2. **Maintainer fixes the underlying issue.** The right path is to reconcile CONTEXT.md, not to skip the gate.
3. **G0 idempotency.** Re-invoking `/pm-release` re-runs G0 from the top. The conductor does not cache prior sub-check results; each invocation is a fresh full audit.
4. **No bypass attempted.** The maintainer did not try `--skip-gates` (removed in v2.16); the fix-and-retry pattern is the canonical recovery path.

The defect class (aggregate-counter drift) is the canonical case documented in memory `feedback_stale-aggregate-counter` from the v2.12.0 release-state drift. The conductor's role at G0 sub-check 4 is to catch it BEFORE release notes ship.

For pm-release-conductor's role: this is 3 of 3 thread-aligned samples, completing the catalog (workbench chained-run + brainshelf clean-run + storevine gate-failure).
