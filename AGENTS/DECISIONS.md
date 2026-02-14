# Shared Decisions

Purpose: cross-LLM decision log for pm-skills. Per-agent details remain in `AGENTS/<agent>/DECISIONS.md`; this file holds the canonical summary and pointers.

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
