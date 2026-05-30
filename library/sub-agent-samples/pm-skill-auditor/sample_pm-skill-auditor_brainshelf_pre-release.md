---
title: "pm-skill-auditor report: Brainshelf pre-release audit"
description: "pm-skill-auditor cross-cutting governance audit of the pm-skills repo at a pre-release state (post-Phase 3 of v2.16.0 in-cycle, mid-audit, scope=full). Demonstrates validator suite invocation, cross-cutting findings (sub-agent integrity, sample gaps), and aggregate counter audit with expected in-cycle drift. Sample artifact for the pm-skill-auditor sub-agent."
artifact: pm-skill-auditor-report
version: "1.0"
repo_version: "2.16.0-dev"
agent_version: "1.0.0"
created: 2026-05-17
status: sample
thread: brainshelf
context: Cross-cutting governance audit run during v2.16.0 Phase 3 development; mid-cycle status check
---

## Scenario

After authoring the pm-skill-auditor sub-agent in Phase 3, Priya M. ran `utility-pm-skill-auditor --scope full` to verify the repo is in a clean state before continuing to Phase 4 (pm-changelog-curator). The audit is a routine in-cycle health check: are validators green? Are there cross-cutting issues that have accumulated during fast-moving phase work? Do counters declared in CONTEXT.md / AGENTS.md / README.md still match the actual filesystem after dispatch skills were added in Phases 2-3?

The expected outcome: 0 P0 findings (we just committed; CI was green), some P1/P2 findings reflecting in-progress state (dispatch skills added but counters not yet reconciled until pre-tag pass). The audit confirms it's safe to continue Phase 4 authoring without introducing release-blocking issues.

## Output

# pm-skill-auditor report

**Scope:** full repo at HEAD `{phase-3-commit}` (post-Phase-3 of v2.16.0 in-cycle)
**Validators invoked:** 16
**Cross-cutting checks run:** 14
**Findings:** 5 (P0: 0, P1: 2, P2: 3, P3: 0 [hidden by --severity-floor P1])

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

#### F-01: Sub-agents pm-changelog-curator and pm-release-conductor not yet authored (forward finding; Phase 4-5 will close)

**Location:** `subagents/` directory; `subagents/_pairing.yaml` lists 4 sub-agents but only 2 (.md) files exist as of HEAD
**Issue:** Phase 4 will ship `subagents/pm-changelog-curator.md` paired with `commands/pm-draft-changelog.md`. Phase 5 will ship `subagents/pm-release-conductor.md` paired with `commands/pm-release.md`. As of HEAD, neither exists.
**Why it matters:** D6 requires every sub-agent to ship with a companion slash command. Currently `_pairing.yaml` declares pairings for sub-agents that do not yet exist; this is an expected mid-cycle state but would be a release-blocker if it persisted to tag.
**Fix:** This is a forward finding (Phases 4-5). Re-run audit after Phase 5 ships; finding should resolve. NOT a blocker for Phase 4 work to continue.

#### F-02: Library samples missing for pm-skill-auditor dispatch skill in skill-output-samples

**Location:** `library/skill-output-samples/utility-pm-skill-auditor/` (does not exist)
**Issue:** The newly shipped dispatch skill at `skills/utility-pm-skill-auditor/SKILL.md` has no library samples in `library/skill-output-samples/`. Other utility skills (utility-pm-skill-builder, utility-pm-skill-validate, utility-mermaid-diagrams) have samples there. The sub-agent samples directory at `library/sub-agent-samples/pm-skill-auditor/` covers the native sub-agent output (this artifact); the skill-output-samples gap is for the dispatch wrapper.
**Why it matters:** New users discover utility skills via the docs site and expect a samples link to confirm output quality. Missing samples slow adoption.
**Fix:** Author 1-3 library samples for the dispatch skill at `library/skill-output-samples/utility-pm-skill-auditor/`. Schedule for v2.17 cleanup unless pre-tag pass adds it.

### P2 findings

#### F-03: Thread imbalance on pm-critic samples (Phase 6 will close)

**Location:** `library/sub-agent-samples/pm-critic/`
**Issue:** Only 1 of 3 planned thread-aligned samples shipped (brainshelf). Storevine and workbench samples are Phase 6 deliverables.
**Why it matters:** Not a defect; in-progress state. Catalog completeness will close at Phase 6.
**Fix:** Phase 6 Task 23 ships the remaining 2 pm-critic samples.

#### F-04: Description overlap between dispatch skills (cosmetic)

**Location:** `skills/utility-pm-critic/SKILL.md` description vs `skills/utility-pm-skill-auditor/SKILL.md` description (and forthcoming `utility-pm-changelog-curator`, `utility-pm-release-conductor`)
**Issue:** All dispatch skill descriptions begin with similar boilerplate ("Dispatches natively on Claude Code with the pm-skills plugin; on non-Claude clients reads subagents/X.md and executes inline"). The descriptions are distinct downstream but the lead-in text is uniform.
**Why it matters:** Slight discoverability collision risk; Claude's intent classifier may match on early-string similarity. Low impact - the distinct mission language later in each description is sufficient.
**Fix:** v2.17 cleanup. Lead each dispatch skill description with the unique mission, push the dispatch mechanism to second sentence.

#### F-05: Aggregate counter drift in declared values (expected in-cycle)

**Location:** `README.md` Project Structure tree (line 916), `AGENTS.md` skill listings, `AGENTS/claude/CONTEXT.md` per-phase tables
**Issue:** Declared total skills = 55 across these files; re-derived from filesystem = 57 (added utility-pm-critic + utility-pm-skill-auditor in Phases 2-3). Declared commands = 62; re-derived = 64 (added utility-pm-critic + utility-pm-skill-auditor).
**Why it matters:** At pre-tag scope this would be P0 because declared counts going to release notes must be correct. At mid-cycle scope, this is expected drift that pre-tag artifact pass reconciles.
**Fix:** No action mid-cycle. The pre-tag artifact pass (master plan Phase 8 equivalent) refreshes all three surfaces to match final v2.16.0 catalog before tag.

## Aggregate counter audit

| Surface | Declared | Re-derived | Match |
|---|---|---|---|
| Total skills | 55 | 57 | NO (P2 - in-cycle drift; pre-tag reconciles) |
| Phase skills | 26 | 26 | YES |
| Foundation skills | 8 | 8 | YES |
| Utility skills | 6 | 8 | NO (P2 - utility-pm-critic + utility-pm-skill-auditor added) |
| Tool skills | 15 | 15 | YES |
| Sub-agents | 4 (planned per Pairing manifest) | 2 (authored as of HEAD) | EXPECTED (Phases 4-5 ship remaining 2) |
| Commands | 62 | 64 | NO (P2 - utility-pm-critic + utility-pm-skill-auditor added) |
| Workflows | 12 | 12 | YES |
| Enforcing validators | 27 | 27 | YES |
| Family contracts | 3 | 3 | YES |

## Disposition recommendations

- 0 P0 findings: clean to continue Phase 4 authoring
- 2 P1 findings: F-01 self-resolves with Phase 5 ship; F-02 schedule for Phase 6 or v2.17
- 3 P2 findings: F-03 self-resolves with Phase 6 ship; F-04 v2.17 cleanup; F-05 pre-tag reconciles
- P3 findings hidden by --severity-floor P1

## Status Summary

Pre-release audit at v2.16.0 mid-cycle (post-Phase 3) returned 5 findings: 0 P0, 2 P1, 3 P2, 0 P3 (hidden by severity floor).

All 16 enforcing validators pass. No cross-cutting issues block continued development. The two P1 findings are forward-looking and self-resolving: F-01 closes when Phase 5 ships the missing sub-agents; F-02 is a sample-coverage gap on a newly shipped dispatch skill that can be scheduled for Phase 6 or deferred to v2.17. The three P2 findings reflect expected in-cycle state: dispatch skills added but declared counters not yet reconciled (pre-tag artifact pass will close this normally).

**Recommended next action:** Continue with Phase 4 pm-changelog-curator authoring. The audit is safe to re-run after each phase; expect F-01 to drop in count when Phases 4-5 land and F-05 to flip on counter reconciliation during the pre-tag pass.

**Refusal triggered:** no.

## Status

```yaml
status: pass
p0_count: 0
p1_count: 2
p2_count: 3
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
  mode: native-subagent
  client: claude-code
```

---

## Notes on This Sample

This is a realistic mid-cycle audit shape. The pattern matters more than the specific finding counts: P0 = 0 (because we just committed; CI was green); P1/P2 capture in-progress state (Phase 4-5 pending, dispatch skills added, counters in flux); aggregate counter audit shows EXPECTED drift between declared and re-derived (the pre-tag pass reconciles this normally).

For a release-prep audit (post-Phase 5 + pre-tag), the same auditor would re-run after CONTEXT.md / AGENTS.md / README.md refresh; the counters_match field would flip to true; remaining drift becomes P0 because at pre-tag scope, declared counts going to release notes must be correct.

For the sample's role in v2.16.0: this is 1 of 3 thread-aligned samples for pm-skill-auditor. The other 2 (storevine drift-detection, workbench cross-cutting) ship in Phase 6 Task 24.
