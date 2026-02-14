# Technical Decisions

## 2026-01-22: Initialize Codex agent folder structure

**Status:** Accepted

**Context:**
Codex sessions need a consistent place for context, decisions, and logs.

**Decision:**
Create standard agent artifacts in `AGENTS/codex/`:
- `CONTEXT.md`
- `DECISIONS.md`
- `SESSION-LOG/` (with `.gitkeep`)

**Alternatives Considered:**
- Keep only `PLANNING/` docs
- Store session notes in `_NOTES/`

**Consequences:**
- Consistent Codex session continuity
- Clear separation between working artifacts and project docs

---

*Add new decisions above this line*

## 2026-02-13: Move Codex workspace path to AGENTS/codex

**Status:** Accepted

**Context:**
`AGENTS/codex-5.2` encoded model version in the path and created path churn. The desired stable working path is `AGENTS/codex`.

**Decision:**
Adopt `AGENTS/codex` as the canonical Codex workspace path for context, decisions, planning, and session handoff artifacts.

**Consequences:**
- Stable path independent of model version changes.
- Less friction when rotating models.
- Existing scripts/docs should reference `AGENTS/codex` going forward.

## 2026-02-13: Flat skill naming compliance

**Status:** Accepted

**Context:**
Flat skill structures under agentskills spec must use hyphen-only names; underscores are invalid. Phase prefixes may be present in folder names, but MCP tool IDs should stay short and stable.

**Decision:**
If skills are flattened, enforce hyphen-only folder names; keep MCP tool IDs unchanged (no phase prefixes), carry phase/order in metadata instead.

**Consequences:**
- Prevents invalid skill names and marketplace discovery issues.
- Avoids breaking existing MCP integrations.
- Requires loader metadata mapping for phase context.
