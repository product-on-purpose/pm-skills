# B-05 Foundation-Phase Decision Record

Status: Closed-aligned (`defer`)  
Blocker: B-05  
Decision owner: Maintainers  
Decision date: 2026-02-16  
Target release: v2.5.0  
Last updated: 2026-02-16

## Decision Objective

Decide whether `foundation` becomes a first-class phase in v2.5.0 and lock required cross-repo behavior for `pm-skills` and `pm-skills-mcp`.

## Signed Decision (2026-02-16)

For v2.5.0, **defer `foundation` as a first-class phase**.

Policy:
1. Keep the public phase model at six phases: `discover`, `define`, `develop`, `deliver`, `measure`, `iterate`.
2. Do not ship persona assumptions that require `foundation` in v2.5.0.
3. Re-open phase adoption only when concrete `foundation-*` skills are in scope and pm-skills + pm-skills-mcp updates ship together.

## Evidence (Tracked + Validated)

| Area | Current state | Evidence |
| --- | --- | --- |
| Sync guardrail phase list | Includes `foundation` as a recognized phase token | `pm-skills/.github/scripts/validate-mcp-sync.js` (`PHASES`) |
| pm-skills shipped inventory | No `foundation-*` skills currently shipped | `pm-skills/skills/` |
| MCP type system | `SkillPhase` allows 6 phases only (no `foundation`) | `pm-skills-mcp/src/types/index.ts` |
| MCP listing order | Runtime listing order is the same 6 phases | `pm-skills-mcp/src/server.ts` |
| Cross-repo parity guardrail | Block mode currently passes on pinned v2.4.3 baseline | `VALIDATE_MCP_SYNC_MODE=block node .github/scripts/validate-mcp-sync.js` |

## Closure Recommendation (Applied)

Close B-05 as `closed-aligned` with `defer` for v2.5.0.

Rationale:
1. No shipped `foundation-*` skills currently require user-facing phase expansion.
2. MCP public typing/runtime still reflects a 6-phase model.
3. Deferring avoids contract churn while preserving v2.4.3 cross-repo release truth.

## Re-open Triggers

Re-open B-05 only when all are true:
1. At least one concrete `foundation-*` skill is approved for an upcoming release scope.
2. pm-skills-mcp type/runtime/docs changes for `foundation` are prepared in the same change set.
3. `validate-mcp-sync` block mode and `pm-skills-mcp` tests pass on the candidate refs.
