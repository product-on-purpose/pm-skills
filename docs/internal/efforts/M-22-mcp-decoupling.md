# [M-22] MCP Decoupling
Status: Backlog
Milestone: v2.11.0
Issue: TBD
Agent: Claude Opus 4.6

## Scope

Decouple the pm-skills-mcp companion server from the pm-skills release
cycle. Freeze the MCP repo at its current state, remove MCP alignment
from release gating, and define clear criteria for when to revive it.

## Problem

The pm-skills-mcp server has been a consistent source of release overhead:
- Every release plan includes "MCP alignment steps" (embed, build, publish)
- The MCP repo lags behind pm-skills (currently 28 embedded vs 31+ repo skills)
- MCP impact checks fire on every new skill, creating advisory noise
- The manual embed step (`npm run embed-skills`) is easy to forget

**But the MCP server has no active users.** The primary user (jprisant)
uses Claude Code, which reads skills natively via the plugin system. No
team members or external users consume the MCP tools.

Maintaining infrastructure for a hypothetical audience is a velocity tax
on the work that matters (building and shipping skills).

## What the MCP Server Does

The `pm-skills-mcp` repo is a TypeScript MCP server that:
- Embeds skill files from pm-skills at build time (`scripts/embed-skills.js`)
- Exposes skills as MCP tools (`pm_prd`, `pm_hypothesis`, etc.)
- Exposes skills as MCP resources (`pm-skills://skills/deliver-prd`)
- Tracks its source version in `pm-skills-source.json`

It exists so non-Claude-Code LLM clients can discover and invoke pm-skills
through the MCP protocol. This is valuable when:
- A team uses multiple LLM tools (Claude, Cursor, custom agents)
- Central governance is needed (approved skills, audit trail)
- Zero-touch updates are required (admin updates server, everyone gets it)

None of these conditions exist today.

## Key Decisions

| Decision | Answer | Rationale |
|----------|--------|-----------|
| Freeze vs delete MCP repo | **Freeze** | Preserving working code for future use is free. Deleting loses the implementation. |
| Remove from release gating | **Yes** | MCP alignment is not a prerequisite for any pm-skills release. |
| Remove `check-mcp-impact` from CI | **No - keep as advisory** | Still useful to flag when a new skill *would* need MCP work, even if we're not acting on it. |
| Update MCP README | **Yes** | Add clear status: frozen, not actively maintained, use plugin for latest skills. |

## Artifacts Produced

- Updated `pm-skills-mcp/README.md` - frozen status notice
- Updated pm-skills release plan template - remove MCP alignment as prerequisite
- Updated `docs/internal/backlog-canonical.md` - M-22 entry
- This effort brief and plan

## Dependencies

None - purely subtractive (removing process, not adding code).

## PRs

TBD
