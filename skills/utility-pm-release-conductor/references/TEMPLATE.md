---
title: "pm-release-conductor Dispatch Output Template"
description: Output structure for utility-pm-release-conductor dispatch skill. Gate-by-gate streaming output with explicit confirmation pauses at each boundary. Final output is "Release complete" (or "NOT RELEASABLE - dry run" in dry-run mode) when all 6 gates PASS.
---

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
- Worked example: [`EXAMPLE.md`](./EXAMPLE.md)
