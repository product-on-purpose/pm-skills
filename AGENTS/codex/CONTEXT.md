# Codex Agent Context

## Status
- Active; last updated: 2026-02-16
- Focus: v2.4.3 release closeout complete; v2.5 B-05/B-06 decision closure complete, release-cut prep next

## Purpose
Track Codex sessions for pm-skills. Use this file for stable facts; DECISIONS for commitments; PLANNING for in-flight work; SESSION-LOG for session summaries.

## Project snapshot
- Repo: pm-skills (Triple Diamond PM skills, templates, docs, commands)
- Release baseline:
  - pm-skills: `v2.4.3` published
  - pm-skills-mcp: `v2.4.3` published + `pm-skills-mcp@2.4.3` on npm
- Cross-repo pin baseline:
  - `pm-skills-mcp/pm-skills-source.json` pins `pmSkillsRef` to `b323d0d55c645009f72e22f9c437e5f21df4e61a`
  - `pmSkillsVersion`, `outputContractVersion`, `configContractVersion` = `2.4.3`
- Key paths: README.md, CHANGELOG.md, AGENTS.md, skills/, docs/, commands/, AGENTS/codex/

## Operational playbook
- Session hygiene: use `AGENTS/codex/WRAP-SESSION_TEMPLATE.md` and save logs under `AGENTS/codex/SESSION-LOG/`.
- Planning docs: place in `AGENTS/codex/PLANNING/` with front matter (see `PLANNING/frontmatter-template.md`).
- Decisions: record in `AGENTS/codex/DECISIONS.md` and mirror key items to `AGENTS/DECISIONS.md` (shared).
- Agent boundary: do not edit `AGENTS/<other-agent>/CONTEXT.md` unless the user explicitly asks for that file.
- Permissions: `.claude/settings.local.json` allows `git commit:*`; `.claude/settings.json` allows `gh issue list:*`.
- Commands/skills reuse: `.claude/skills/init-project` (repo bootstrap) and `.claude/skills/wrap-session` apply to Codex as well.

## Immediate next steps
1) If cutting v2.5.0, prepare release metadata artifacts (README/CHANGELOG/release note + checklist status finalization).
2) Keep release-truth parity checks mandatory before any patch cut:
   - `npm run embed-skills -- ../pm-skills/skills`
   - `npm test` (pm-skills-mcp)
   - block-mode `validate-mcp-sync` from pm-skills
3) Keep local `_NOTES` conventions non-canonical unless promoted into tracked `docs/internal/delivery-plan/` artifacts.

## Reference
- Hyphen-only skill naming if flattened (agentskills spec compliance).
- MCP tool IDs should remain stable; use metadata for phase info.
- Latest wrap session: `AGENTS/codex/SESSION-LOG/2026-02-16_wrap-session_v2.4.3-release-closeout-and-v2.5-handoff.md`
