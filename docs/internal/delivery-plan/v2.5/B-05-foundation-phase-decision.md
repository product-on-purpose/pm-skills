# B-05 Foundation-Phase Decision Record

Status: In progress  
Blocker: B-05  
Target release: v2.5.0  
Last updated: 2026-02-16

## Decision Objective

Decide whether `foundation` becomes a first-class phase in v2.5.0 and lock required cross-repo behavior for `pm-skills` and `pm-skills-mcp`.

## Current-State Evidence (2026-02-16)

| Area | Current state | Evidence |
| --- | --- | --- |
| Sync guardrail phase list | Includes `foundation` as a recognized phase | `pm-skills/.github/scripts/validate-mcp-sync.js` (`PHASES`) |
| pm-skills current skill inventory | No `foundation-*` skills currently shipped | `pm-skills/skills/` (no matching directory) |
| MCP type system | `SkillPhase` currently allows only 6 phases (no `foundation`) | `pm-skills-mcp/src/types/index.ts` |
| MCP listing output order | Phase order currently 6 phases only | `pm-skills-mcp/src/server.ts` |

## Working Recommendation (Pending Sign-Off)

Default to **defer `foundation` as first-class** unless a concrete v2.5 skill requires it and ships with fully aligned MCP/type/docs updates in the same release.

Rationale:
1. Cross-repo phase mismatch currently exists in runtime types.
2. No foundation skill is currently shipped in `pm-skills`.
3. Defer-by-default preserves compatibility unless there is an explicit, tested change set.

## Closure Gates

Mark B-05 as closed only when all are true:
1. Signed decision (`adopt` or `defer`) with owner/date.
2. `pm-skills` + `pm-skills-mcp` phase handling and docs are consistent with that decision.
3. `validate-mcp-sync` passes in `block` mode after decision changes.
4. `docs/internal/release-planning/checklist_v2.5.0.md` reflects final decision status.

## Decision Paths

### Path A: Adopt `foundation` in v2.5.0
1. Update `pm-skills-mcp` type/runtime phase handling.
2. Add/validate any `foundation-*` skills and command/tool/docs links.
3. Validate tests and sync guardrails before closure.

### Path B: Defer `foundation`
1. Keep 6-phase public model for v2.5.0.
2. Explicitly document defer policy and trigger criteria for future adoption.
3. Ensure persona work does not assume a shipped `foundation` phase.

## Open Items

- Final approver/signatory for this decision.
- Decision date and explicit trigger criteria if deferred.
