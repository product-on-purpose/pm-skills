# Sub-Agents

This directory contains pm-skills sub-agent definitions for Claude Code.

Sub-agents are plugin components that Claude Code's intent classifier matches against `description:` frontmatter to delegate work. Each is a markdown file with YAML frontmatter at `agents/{name}.md`.

## Layout

- `agents/{name}.md` - sub-agent definitions (4: pm-critic, pm-skill-auditor, pm-changelog-curator, pm-release-conductor)
- `agents/_pairing.yaml` - pairing manifest (each sub-agent + its companion `commands/{verb}.md` slash command per D6 + D29)
- `agents/_chain-permitted.yaml` - allowlist of sub-agents permitted to use the `Agent` tool for chain composition (D14 + D21)

## Native discovery (`agents/`)

Claude Code's plugin runtime auto-discovers sub-agent definitions in the fixed `agents/` directory at the plugin root. There is no plugin.json field for a custom path. Placing the definitions here makes Claude Code register the 4 sub-agents at install time so they are reachable via `@-mention` and the `Agent` tool.

The directory was named `subagents/` through v2.16.x because the lowercase `agents/` name collided on case-insensitive filesystems (Windows NTFS, macOS APFS) with the repo's then-uppercase `AGENTS/` coordination directory. v2.17.0 (W2) resolved the collision: the coordination directory was renamed to `_agent-context/`, freeing `agents/` for native discovery. See `docs/internal/release-plans/v2.17.0/spec_agents-directory-rename.md` for the full rationale.

## Cross-client compatibility

Sub-agents are a Claude Code plugin feature. Non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI) access sub-agent intent via dispatch skills at `skills/utility-pm-{role}/` per master plan D11 (amended) + D30. The dispatch-skill inline-execution path was validated on Codex CLI (v2.16.0 GATE B + GATE C, 2026-05-17).

## Catalog

The canonical sub-agents catalog with audience, trigger, lifetime, tool surface, and composition data is at `docs/reference/runtime-components.md`. AGENTS.md has a Sub-Agents section pointing to that catalog.
