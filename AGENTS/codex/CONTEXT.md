# Codex Agent Context

## Status
- Active; last updated: 2026-02-13
- Focus: release continuity and structured session handoff artifacts

## Purpose
Track Codex sessions for pm-skills. Use this file for stable facts; DECISIONS for commitments; PLANNING for in-flight work; SESSION-LOG for session summaries.

## Project snapshot
- Repo: pm-skills (Triple Diamond PM skills, templates, docs, commands)
- Key paths: README.md, CHANGELOG.md, AGENTS.md, skills/, docs/, templates/, commands/, AGENTS/codex/

## Operational playbook
- Session hygiene: use `AGENTS/codex/WRAP-SESSION_TEMPLATE.md` and save logs under `AGENTS/codex/SESSION-LOG/`.
- Planning docs: place in `AGENTS/codex/PLANNING/` with front matter (see `PLANNING/frontmatter-template.md`).
- Decisions: record in `AGENTS/codex/DECISIONS.md` and mirror key items to `AGENTS/DECISIONS.md` (shared).
- Permissions: `.claude/settings.local.json` allows `git commit:*`; `.claude/settings.json` allows `gh issue list:*`.
- Commands/skills reuse: `.claude/skills/init-project` (repo bootstrap) and `.claude/skills/wrap-session` apply to Codex as well.

## Immediate next steps
1) Finalize structure/output decisions and log them.
2) Keep session logs current (none yet for Codex).
3) Maintain front matter on new planning docs; update existing ones (in progress).

## Reference
- Hyphen-only skill naming if flattened (agentskills spec compliance).
- MCP tool IDs should remain stable; use metadata for phase info.
