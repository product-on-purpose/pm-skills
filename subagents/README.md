# Sub-Agents

This directory contains pm-skills sub-agent definitions for Claude Code.

Sub-agents are plugin components that Claude Code's intent classifier matches against `description:` frontmatter to delegate work. Each is a markdown file with YAML frontmatter at `subagents/{name}.md`.

## Layout

- `subagents/{name}.md` - sub-agent definitions (4 in v2.16.0: pm-critic, pm-skill-auditor, pm-changelog-curator, pm-release-conductor)
- `subagents/_pairing.yaml` - pairing manifest (each sub-agent + its companion `commands/{verb}.md` slash command per D6 + D29)
- `subagents/_chain-permitted.yaml` - allowlist of sub-agents permitted to use the `Agent` tool for chain composition (D14 + D21)

## Why `subagents/` instead of `agents/`

Per master plan D31 (added 2026-05-17 during Phase 1 Task 1 execution): the Claude Code default `agents/` directory name conflicts on case-insensitive filesystems (Windows NTFS, macOS APFS) with this repo's existing uppercase `AGENTS/` directory (agent-coordination context for Claude, Codex, etc.). Plugin.json declares the custom path `"agents": ["./subagents/"]` so Claude Code discovers sub-agents here. See `docs/internal/release-plans/v2.16.0/plan_v2.16.0.md` D31 for the full Decision Brief.

## Cross-client compatibility

Sub-agents are a Claude Code plugin feature. Non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI) access sub-agent intent via dispatch skills at `skills/utility-pm-{role}/` per master plan D11 (amended) + D30. Dispatch skills are conditional on Phase 2 spike outcomes; see `subagents-integration-plan.md` Phase 2 Task 9.

## Catalog

The canonical sub-agents catalog with audience, trigger, lifetime, tool surface, and composition data is at `docs/reference/runtime-components.md`. AGENTS.md has a Sub-Agents section pointing to that catalog.
