# Shared Decisions

Purpose: cross-LLM decision log for pm-skills. Per-agent details remain in `AGENTS/<agent>/DECISIONS.md`; this file holds the canonical summary and pointers.

## 2026-03-22: Internal docs stay tracked but do not ship in release ZIPs
**Status:** Accepted  
**Summary:** Keep maintainers' governance and planning artifacts under `docs/internal/**`, but exclude that subtree from published ZIP artifacts in the release packagers instead of moving the directory tree.  
**Applies to:** Claude, Codex, release packaging, F-05 staging design, future internal docs work.  
**Consequences:** End users get only public docs in release packages; internal effort/release governance remains repo-tracked; future builder/staging decisions do not require a repo-wide path migration.

## 2026-02-13: Skill naming compliance for flat structure
**Status:** Accepted  
**Summary:** If skills are flattened, directory names must stay hyphen-only (agentskills spec), no underscores; commands may stay short aliases; MCP tool IDs should remain stable (no phase prefixes), with phase/ordering carried in metadata instead.  
**Applies to:** Claude, Codex, release packaging, MCP loader.  
**Consequences:** Prevents invalid skill names; avoids tool/command churn; requires metadata mapping for phase context.

## 2026-02-13: Shared decision log
**Status:** Accepted  
**Summary:** Maintain this master log for decisions affecting all agents. Each agent keeps detailed rationale locally and adds a pointer here when applicable.  
**Applies to:** All agents.  
**Consequences:** Single source for cross-LLM alignment; reduces drift between Claude and Codex contexts.

## 2026-03-15: Baseline cleanup operating model
**Status:** Accepted  
**Summary:** GitHub issues own backlog and lifecycle state; `docs/internal/efforts/**` is the tracked home for durable effort briefs; `docs/internal/release-plans/**` is the tracked home for internal release governance; `_NOTES/**` remains local-only working material.  
**Applies to:** Claude, Codex, internal docs, future effort/release cleanup.  
**Consequences:** No tracked file should call `_NOTES/**` canonical; effort and release docs should point to the accepted tracked homes.

## 2026-03-15: First-class agent continuity surfaces
**Status:** Accepted  
**Summary:** Keep both `AGENTS/claude/` and `AGENTS/codex/` first-class continuity surfaces; do not introduce a central `AGENTS/CONTEXT.md`.  
**Applies to:** Claude, Codex, continuity docs, future guardrail work.  
**Consequences:** Shared decisions live in `AGENTS/DECISIONS.md`; agent-local state and rationale stay under each agent directory.

## 2026-03-15: Shipped Claude-facing tracked surface
**Status:** Accepted  
**Summary:** The only intentionally shipped Claude-facing tracked artifacts are `.claude-plugin/plugin.json` and `.claude/pm-skills-for-claude.md`.  
**Applies to:** Claude packaging, release docs, repo hygiene cleanup.  
**Consequences:** Other `.claude/**` material is helper/local surface and should not be treated as shipped baseline truth.

## 2026-03-15: Baseline cleanup sequencing
**Status:** Accepted  
**Summary:** Land Codex structural work before Claude guardrail work: `C-2` before `A-11`, `C-3` before `A-8` and `A-9`, and keep `A-5` deferred to a later wrap-session effort.  
**Applies to:** Claude, Codex, baseline-cleanup lane.  
**Consequences:** `A-11` may proceed once the tracked release/effort structure is stable; `A-8` and `A-9` wait for a current Codex context file.
