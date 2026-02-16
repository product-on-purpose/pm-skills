# v2.5 B-05/B-06 Closure Path

Status: Active  
Release target: v2.5.0  
Last updated: 2026-02-16

## Scope

1. `B-05`: foundation-phase decision and cross-repo policy lock.
2. `B-06`: persona-builder Q1-Q7 decision consolidation and contradiction closure.

## Sequence

1. Lock B-05 decision first (adopt or defer).
2. Finalize B-06 Q1-Q7 entries with B-05 decision reflected in Q5.
3. Apply corresponding implementation/docs updates.
4. Run targeted validation and update v2.5 checklist.

## Required Artifacts (Tracked)

- `docs/internal/delivery-plan/v2.5/B-05-foundation-phase-decision.md`
- `docs/internal/delivery-plan/v2.5/B-06-persona-q1-q7-decision-record.md`
- `docs/internal/release-planning/checklist_v2.5.0.md`

## Validation Checklist

| ID | Check | Command / Evidence |
| --- | --- | --- |
| V-01 | Phase decision coherence across repos | Review `pm-skills/.github/scripts/validate-mcp-sync.js` and `pm-skills-mcp/src/types/index.ts` |
| V-02 | Persona assumptions are non-contradictory | `rg -n "foundation|persona|Q1-Q7|phase" docs AGENTS` |
| V-03 | Cross-repo release truth stays aligned | `node .github/scripts/validate-mcp-sync.js` (block mode) |
| V-04 | MCP runtime remains healthy after policy changes | `npm test` in `pm-skills-mcp` |

## Exit Criteria

1. B-05 signed decision exists and is linked from release planning.
2. B-06 signed Q1-Q7 record exists and contradictory assumptions are superseded.
3. Targeted checks pass and are documented in release artifacts.
4. v2.5 checklist reflects actual closure state (`In progress` -> `Shipped` when complete).
