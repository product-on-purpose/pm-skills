---
title: "PM Release Conductor (Dispatch Skill)"
description: "Walk the guided release runbook (6 gates G0/G1/G2/G2.5/G3/G4) via the pm-release-conductor sub-agent. Dispatches natively on Claude Code with the pm-skills plugin (invokes @agent-pm-release-conductor with native chain composition to pm-skill-auditor at G0 and pm-changelog-curator at G2); on non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI) reads subagents/pm-release-conductor.md and inlines auditor + curator behaviors at G0 + G2 via reference-and-execute-inline pattern (because non-Claude clients cannot natively chain to other sub-agents). Returns gate-by-gate output with explicit confirmation pauses, refuses bypass attempts, tags only the G2.5-captured SHA per master plan D22."
generated: true
source: scripts/generate-skill-pages.py
tags:
  - Utility
  - release
---

:::note[Quick facts]
**Classification:** Utility | **Version:** 1.0.0 | **Category:** release | **License:** Apache-2.0
:::

Cross-client dispatch wrapper for the `pm-release-conductor` sub-agent. Detects runtime; dispatches to the native sub-agent on Claude Code; reads `subagents/pm-release-conductor.md` and inlines chain composition on non-Claude clients via "reference + execute inline" pattern.

> **VALIDATED on Codex CLI 2026-05-17 per Option A.** Phase 2 GATE C sub-spike PASSED: the "reference + execute inline" pattern for chain composition (inlining auditor + curator behaviors at G0 + G2 + G2.5 instead of native sub-agent chaining) completed cleanly on Codex CLI 0.128.0 with context budget held through all 6 gates. See [`docs/internal/release-plans/v2.16.0/gate-test-results_2026-05-17_codex.md`](../../internal/release-plans/v2.16.0/gate-test-results_2026-05-17_codex.md) for the full Codex run record. Recommended for production use on Codex CLI; additional clients (Cursor, Windsurf, Copilot, Gemini CLI) may also work but have not been independently validated yet. Maintainers wanting belt-and-suspenders confidence can re-run the harness on a second client per the [`maintainer-gate-testing-codex.md`](../../internal/release-plans/v2.16.0/maintainer-gate-testing-codex.md) before invoking live release operations.

**STATUS:** RATIFIED in v2.16.0 per master plan D30 + GATE C PASS outcome recorded 2026-05-17.

## When to Use

- You are running a pm-skills release on a non-Claude client (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI)
- You want the same 6-gate discipline that pm-release-conductor enforces on Claude Code, with auditor + curator behaviors inlined at the relevant gates
- You explicitly want skill-invocation semantics over sub-agent semantics on Claude Code (rare; the native sub-agent is preferred on Claude Code)

## When NOT to Use

- You only need to review a PM artifact -> use `utility-pm-critic`
- You only need a governance audit (not a release) -> use `utility-pm-skill-auditor`
- You only need a CHANGELOG draft (not a release) -> use `utility-pm-changelog-curator`
- You want to perform release operations WITHOUT explicit gate confirmation -> the conductor refuses bypass; manual release outside the conductor is the right path

## Instructions

**Runtime detection step.** Determine which AI client is invoking this skill.

### If you are running in Claude Code with the pm-skills plugin installed

Invoke `@agent-pm-release-conductor` with the user's target version + optional flags from `$ARGUMENTS`. The native sub-agent walks the 6 gates and natively chains to `pm-skill-auditor` (G0, G2.5) and `pm-changelog-curator` (G2) via the Agent tool. Return the conductor's gate-by-gate output to the user.

### If you are running in any other AI client

Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI, or any other client without native pm-skills plugin sub-agent support:

1. Read the canonical sub-agent definition at `subagents/pm-release-conductor.md`
2. Read the canonical runbook at `docs/contributing/release-runbook.md` (the conductor's referential source for gate definitions)
3. Execute the system prompt body as your operating instructions
4. Walk the 6 gates inline. At gates that require chain composition:
   - **G0 (Pre-tag readiness):** instead of chaining to pm-skill-auditor, read `subagents/pm-skill-auditor.md` and execute the auditor's 4-step audit flow inline. Capture the layered output (full findings + Status Summary + Status YAML). Treat the Status YAML as your G0 sub-check 5 input.
   - **G2 (Version bump + CHANGELOG prep):** instead of chaining to pm-changelog-curator, read `subagents/pm-changelog-curator.md` and execute the curator's 8-step drafting flow inline. Capture the layered output. Treat the Status YAML as your G2 sub-check 3 input.
   - **G2.5 (Re-verify):** re-execute the inlined auditor at sub-check 5 against the new HEAD.
5. Pause at each gate boundary for explicit maintainer confirmation
6. Refuse bypass attempts; respect refusal protocols
7. Tag only the G2.5-captured SHA at G3 per D22
8. Return gate-by-gate output throughout the flow

The "reference + execute inline" pattern is what enables cross-client compatibility for chain composition. Phase 2 GATE C sub-spike validates that this pattern is reliable.

## Output Template

# Output Template

`utility-pm-release-conductor` produces streaming gate-by-gate output. Each gate is its own section. The full flow ends with a final output (release complete or dry-run summary).

## Per-Gate Output

````markdown
## Gate G{N}: {Gate name}

**Sub-checks:**

1. {sub-check name}: PASS / FAIL / WAITING-FOR-CONFIRMATION / N/A
   {detail or chained-child Status Summary if applicable}
2. ...

{If gate chains to a child sub-agent on Claude Code OR inlines on non-Claude:}
### Chained / Inlined: {child agent name} at {gate}
{Status YAML excerpt from the child's layered output}

**Gate status:** PASS / FAIL / WAITING-FOR-CONFIRMATION

{If PASS:} Proceed to G{N+1}? Confirm with "yes" or address findings.

{If FAIL:} Cannot advance. Resolve the following before re-invoking:
- {blocker 1}
- {blocker 2}
````

## Final Output (Release Complete)

````markdown
## Release complete: v{target}

**Tag:** v{target} (annotated, pushed to origin at SHA `{g2.5-captured-sha}`)
**G0 PASS / G1 PASS / G2 PASS / G2.5 PASS / G3 PASS / G4 PASS**

Highlights:
- {top 2-3 user-facing changes from the CHANGELOG draft}

Next steps:
- Author GitHub Release UI body (P2 reminder from G4)
- Create v{next-patch} or v{next-minor} stub if not yet present (P2 reminder from G4)
- Monitor CI on the tag run; address any post-tag findings within v{next-patch} window
````

## Final Output (G4 P0 Incident)

````markdown
## Release IN PROGRESS - G4 P0 incident: v{target}

**Tag:** v{target} pushed at SHA `{g2.5-captured-sha}` (tag operation complete)
**G4 P0 sub-check FAILED:** {specific incident, e.g., plugin install path broken}

This is a post-tag incident. The tag exists but the release artifact has a P0 issue.

**Resolution path:** ship a fast v{next-patch} that fixes the P0 issue. Tag reversion is destructive and not in v2.16 scope.

**Cannot emit "Release complete" until one of:**
- Maintainer resolves the P0 (typically via fast patch ship)
- Maintainer explicitly logs the P0 as a known regression carried to v{next-patch} in the new cycle stub
````

## Final Output (Dry-Run)

````markdown
## NOT RELEASABLE - dry run: v{target}

This was a dry-run. No tag was created. No commits were pushed. No changes are live.

**Dry-run rehearsal result:** all 6 gates would PASS in live mode based on current state. {N} P0 blockers detected ({list} OR "none"). {M} P2 reminders surfaced for post-tag follow-up.

**Recommended next step:** invoke `/release v{target}` (without `--dry-run`) when ready to ship live. The conductor walks the same flow and performs the actual tag + push at G3.
````

## Status Summary Section (Per Gate or End of Flow)

The conductor does NOT use the layered Status envelope (D26) the way the children (auditor, curator) do; instead, it streams gate-by-gate output AND produces a final "Release complete" or equivalent summary at flow end. The reason: the conductor IS the parent in the chain hierarchy; D26's layered envelope serves chained sub-agents to communicate back to a parent.

If integrating with external tooling (e.g., a CI workflow that consumes the conductor's output), the tooling can parse the gate-status lines (`**Gate status:** PASS / FAIL / WAITING-FOR-CONFIRMATION`) for advancement decisions and the final "Release complete" line as the release-complete signal.

## Reference Files

- Canonical sub-agent: [`subagents/pm-release-conductor.md`](../../../subagents/pm-release-conductor.md)
- Canonical runbook: [`docs/contributing/release-runbook.md`](../../../docs/contributing/release-runbook.md)
- Worked example: `EXAMPLE.md`

## Example Output

<details>
<summary>Example: pm-release-conductor Dispatch on Copilot CLI</summary>

# Example: pm-release-conductor Dispatch on Copilot CLI

This example shows `utility-pm-release-conductor` execution on Copilot CLI (a non-Claude client without native plugin sub-agent infrastructure). The dispatch skill uses the "reference + execute inline" pattern for chain composition.

## Invocation

```
copilot> /utility-pm-release-conductor v2.16.0 --dry-run
```

## Skill behavior

1. **Runtime detection.** Detects Copilot CLI; takes non-Claude branch.
2. **Reads canonical files.** Loads `subagents/pm-release-conductor.md` (operating instructions), `docs/contributing/release-runbook.md` (gate definitions), `subagents/pm-skill-auditor.md` (to inline at G0 + G2.5), `subagents/pm-changelog-curator.md` (to inline at G2).
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

The dispatch skill reads `subagents/pm-skill-auditor.md` and executes its 4-step audit flow inline (no native chain). Inlined output:

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

The dispatch skill reads `subagents/pm-changelog-curator.md` and executes its 8-step drafting flow inline. Inlined output:

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

- Canonical sub-agent: [`subagents/pm-release-conductor.md`](../../../subagents/pm-release-conductor.md)
- Skill manifest: `SKILL.md`
- Output template: `TEMPLATE.md`
- Inlined children: [`subagents/pm-skill-auditor.md`](../../../subagents/pm-skill-auditor.md), [`subagents/pm-changelog-curator.md`](../../../subagents/pm-changelog-curator.md)
- Canonical runbook: [`docs/contributing/release-runbook.md`](../../../docs/contributing/release-runbook.md)

</details>
