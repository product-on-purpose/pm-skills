# [F-09] Agent Skill Builder
Status: Planned
Milestone: TBD
Issue: #120
Agent: Claude Opus 4.6

## Scope

Create `utility-agent-skill-builder` - a PM skill that teaches how to create agent skills for any context (team tools, product workflows, any platform). Follows agentskills.io spec without enforcing pm-skills-specific conventions. Output: a Skill Design Brief, not a pm-skills Implementation Packet. Includes `/agent-skill-builder` slash command.

## Key Decisions

- Named `/agent-skill-builder` (not `/skill-builder`) to distinguish from `/pm-skill-builder` (F-05).
- This is a PM skill - creating agent skills is an emerging PM capability.
- Depends on F-05 (pm-skill-builder proves the pattern).
- Output is platform-general, not pm-skills-specific.

## Artifacts Produced

- `skills/utility-agent-skill-builder/SKILL.md`
- `skills/utility-agent-skill-builder/references/TEMPLATE.md`
- `skills/utility-agent-skill-builder/references/EXAMPLE.md`
- `commands/agent-skill-builder.md`
- AGENTS.md entry

## PRs

- TBD
