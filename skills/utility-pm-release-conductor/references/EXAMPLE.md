---
title: "pm-release-conductor Dispatch Example: dry-run on Copilot CLI"
description: 'Worked example of utility-pm-release-conductor dispatch skill execution on a non-Claude client (Copilot CLI). Demonstrates the "reference + execute inline" pattern for chain composition: auditor inlined at G0 and G2.5, curator inlined at G2. Dry-run flow walking all 6 gates.'
---

# Example: pm-release-conductor Dispatch on Copilot CLI

This example shows `utility-pm-release-conductor` execution on Copilot CLI (a non-Claude client without native plugin sub-agent infrastructure). The dispatch skill uses the "reference + execute inline" pattern for chain composition.

## Invocation

```
copilot> /utility-pm-release-conductor v2.16.0 --dry-run
```

## Skill behavior

1. **Runtime detection.** Detects Copilot CLI; takes non-Claude branch.
2. **Reads canonical files.** Loads `agents/pm-release-conductor.md` (operating instructions), `docs/contributing/release-runbook.md` (gate definitions), `agents/pm-skill-auditor.md` (to inline at G0 + G2.5), `agents/pm-changelog-curator.md` (to inline at G2).
3. **Walks 6 gates inline.** Pauses at each gate for maintainer confirmation. Inlines auditor at G0 and G2.5; inlines curator at G2.

## Output (verbatim from dispatch skill execution)

# pm-release-conductor (dispatch on Copilot CLI): v2.16.0 (--dry-run)

**Target:** v2.16.0 (semver valid)
**Branch:** main (default)
**Mode:** DRY-RUN
**Master plan:** found at `docs/internal/release-plans/v2.16.0/plan_v2.16.0.md`
**Dispatch mode:** inline-execution (Copilot CLI; no native plugin sub-agents)

---

## Gate G0: Pre-Tag Readiness

**Sub-checks:**

1. **Working tree clean:** PASS
2. **Pre-tag validator bundle green:** PASS (`bash scripts/pre-tag-validate.sh` exit 0)
3. **Em-dash sweep clean:** PASS
4. **Aggregate counters match declared:** PASS
5. **Cross-cutting audit clean:** INLINED execution of pm-skill-auditor

### Inlined: pm-skill-auditor at G0

The dispatch skill reads `agents/pm-skill-auditor.md` and executes its 4-step audit flow inline (no native chain). Inlined output:

```yaml
status: pass
p0_count: 0
p1_count: 0
p2_count: 1
p3_count: 0
counters_match: true
validators_pass: true
scope: full
refusal_reason: null

dispatch:
  mode: inline-execution
  client: copilot
```

P2 finding: cosmetic description overlap between dispatch skills (acknowledged; v2.17 cleanup).

6. **Required files exist:** PASS

**Gate status:** PASS

Proceed to G1?

> User: yes

---

## Gate G1: Adversarial Review Status

(Maintainer attestation: Phase 0 review complete; all P0 closed; 3 P1 deferred to v2.17 with rationale.)

**Gate status:** PASS

Proceed to G2?

> User: yes

---

## Gate G2: Version Bump + CHANGELOG Prep

**Sub-checks:**

1-2. plugin.json + marketplace.json version edits: APPLIED
3. **CHANGELOG.md header:** INLINED execution of pm-changelog-curator

### Inlined: pm-changelog-curator at G2

The dispatch skill reads `agents/pm-changelog-curator.md` and executes its 8-step drafting flow inline. Inlined output:

```yaml
status: draft
target_version: v2.16.0
since_tag: v2.15.2
commits_processed: 50
entries_added: 5
entries_changed: 2
entries_fixed: 1
entries_security: 2
dirty_tree_warning: false
refusal_reason: null
```

Maintainer received the curator's full draft, edited the framing, stripped justification comments, and applied to CHANGELOG.md.

4-8. Remaining G2 sub-checks: APPLIED

**Gate status:** PASS

Proceed to G2.5?

> User: yes

---

## Gate G2.5: Commit Release-Prep + Re-Verify

**Sub-checks:**

1-4. Stage + commit G2 edits: APPLIED (commit `chore(v2.16.0): release-prep edits for v2.16.0`)
5. **Re-run G0 sub-checks against new HEAD:** INLINED auditor again on new HEAD. Status: PASS. p0_count: 0.
6. **CI green on new HEAD:** DRY-RUN SIMULATED
7. **Cross-reference commit SHA captured:** `{new-sha}` (simulated in dry-run)

**Gate status:** PASS

Proceed to G3?

> User: yes

---

## Gate G3: Tag + Push (DRY-RUN simulated)

(Tag message authored, maintainer approved, tag creation + push skipped in dry-run mode.)

**Gate status:** PASS (dry-run simulated)

Proceed to G4?

> User: yes

---

## Gate G4: Post-Tag Hygiene (DRY-RUN simulated)

All P0 sub-checks SIMULATED PASS. P1 + P2 reminders issued.

**Gate status:** PASS

---

## NOT RELEASABLE - dry run: v2.16.0

This was a dry-run on Copilot CLI via dispatch skill. No tag was created. No commits were pushed.

**Dry-run rehearsal result:** all 6 gates would PASS in live mode based on current state. 0 P0 blockers detected. 3 P2 reminders surfaced for post-tag follow-up.

**Cross-client validation note:** the "reference + execute inline" pattern for chain composition was exercised at G0, G2, and G2.5 (re-verification). All three inlined executions returned valid layered output and the dispatch skill correctly parsed the Status YAML to make advancement decisions. This validates Phase 2 GATE C sub-spike on Copilot CLI.

**Recommended next step:** if the maintainer wishes to ship from Copilot CLI, invoke `/utility-pm-release-conductor v2.16.0` (without `--dry-run`). The dispatch skill performs actual tag + push at G3 in live mode.

---

## Notes on This Example

The example exercises the most complex dispatch pattern in v2.16.0: chain composition via "reference + execute inline" on a non-Claude client. The key validation criteria:

1. **Inlined auditor at G0** produced valid layered output that the conductor (also inlined) could parse for advancement
2. **Inlined curator at G2** produced valid CHANGELOG draft that the maintainer could review + apply
3. **Re-verification at G2.5** correctly re-inlined the auditor against the new HEAD
4. **No native chaining required.** The Agent tool is not used; everything runs in the dispatch skill's single context window

This is the canonical worked example for Phase 2 GATE C validation. If GATE C reveals reliability issues (e.g., context budget exhausted on long releases, refusal cascade not propagating correctly), the conductor dispatch skill is removed from v2.16.0 ship slate (D-revised path; conductor stays Claude-Code-only).

## Related Files

- Canonical sub-agent: [`agents/pm-release-conductor.md`](../../../agents/pm-release-conductor.md)
- Skill manifest: `SKILL.md`
- Output template: `TEMPLATE.md`
- Inlined children: [`agents/pm-skill-auditor.md`](../../../agents/pm-skill-auditor.md), [`agents/pm-changelog-curator.md`](../../../agents/pm-changelog-curator.md)
- Canonical runbook: [`docs/contributing/release-runbook.md`](../../../docs/contributing/release-runbook.md)
