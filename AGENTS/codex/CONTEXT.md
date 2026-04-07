# Codex Agent Context

## Status
- Active; last updated: 2026-03-22
- Focus: `v2.7.0` execution/handoff after committed `M-12` + `F-06`, local `M-16` packaging implementation, and Codex review of the `F-05` implementation plan

## Purpose
Track Codex sessions for pm-skills. Use this file for stable facts and current execution state; use `AGENTS/DECISIONS.md` for cross-agent commitments; use `AGENTS/codex/DECISIONS.md` for agent-local detail; use `AGENTS/codex/SESSION-LOG/` for session summaries.

## Project snapshot
- Repo: pm-skills (Triple Diamond PM skills, commands, docs, workflows, and internal operating docs)
- Latest published release baseline: `v2.6.1` (see `CHANGELOG.md`)
- Current local `main` state:
  - branch is `main`
  - local branch is ahead of `origin/main` by `2` commits
  - recent commits:
    - `8d2a418` — `M-12` CI validation enhancement + `F-06` deliver-acceptance-criteria
    - `882c9e1` — `v2.7.0` release planning / effort-brief integration / `F-05` design review docs
- Current committed inventory on local `main`:
  - `26` skills total
  - `25` domain skills
  - `1` foundation skill: `foundation-persona`
  - `0` committed utility skills
- Accepted baseline operating model:
  - GitHub issues own backlog and lifecycle state
  - `docs/internal/efforts/**` is the tracked home for durable effort briefs
  - `docs/internal/release-plans/**` is the tracked home for internal release governance
  - `_NOTES/**` remains local-only working material
  - keep both `AGENTS/claude/` and `AGENTS/codex/` first-class
  - only `.claude-plugin/plugin.json` and `.claude/pm-skills-for-claude.md` are intentionally shipped Claude-facing tracked artifacts

## Current execution snapshot
- Codex execution lane:
  - `M-12` complete and committed in `8d2a418`
  - `F-06` complete and committed in `8d2a418`
  - `M-16` issue/effort/release planning surfaces created (`#123` plus tracked docs)
  - `M-16` implemented locally in `scripts/build-release.sh` and `scripts/build-release.ps1`
  - `M-16` verification completed on both bash and PowerShell packagers: staged artifacts and ZIPs exclude `docs/internal/**` while retaining public docs including `docs/releases/**`
  - `F-05` design review completed earlier in this session sequence
  - `F-05` implementation plan review completed; verdict: `Needs revision`
- Claude execution lane:
  - Claude owns `F-05` implementation and is processing the Codex implementation-plan review
  - next Claude session is expected to finalize `F-05` and start `v2.7.0` release orchestration
- Known tracked/untracked state at handoff:
  - local uncommitted tracked `M-16` changes remain in the worktree
  - concurrent local edits also exist in `AGENTS/claude/CONTEXT.md`, `README.md`, and `CHANGELOG.md`
  - `docs/internal/_working/**` contains uncommitted working-doc changes, including Codex `M-16` planning updates
  - `docs/internal/backlog-canonical.md` still lags the more current `docs/internal/release-plans/v2.7.0/README.md` on some status rows and should be reconciled before tag time

## Operational playbook
- Session hygiene: use `AGENTS/codex/WRAP-SESSION_TEMPLATE.md` and save logs under `AGENTS/codex/SESSION-LOG/`
- Planning docs: place in `AGENTS/codex/PLANNING/` with front matter (see `PLANNING/frontmatter-template.md`)
- Decisions: record cross-agent items in `AGENTS/DECISIONS.md`; keep Codex-local detail in `AGENTS/codex/DECISIONS.md`
- Agent boundary: do not edit `AGENTS/<other-agent>/CONTEXT.md` unless the user explicitly asks
- Continuity rule: re-read tracked `docs/internal/efforts/**` and `docs/internal/release-plans/**` entry points after any cross-agent structural change before continuing dependent work

## Immediate next steps
1. Claude finalizes the `F-05` implementation plan response, revises/executes `F-05`, and drives `v2.7.0` release orchestration.
2. If asked, Codex should package and commit `M-16` next; the implementation is already verified locally.
3. After `F-05` stabilizes, Codex remains the preferred owner for `D-02` public-doc review and any remaining release verification work.

## Reference
- Latest Codex wrap-session handoff: `AGENTS/codex/SESSION-LOG/2026-03-22_wrap-session_v2.7.0-ci-packaging-f05-review-and-release-handoff.md`
- Current release governance: `docs/internal/release-plans/v2.7.0/README.md`
- Shared decisions: `AGENTS/DECISIONS.md`
- Local technical decisions: `AGENTS/codex/DECISIONS.md`
- Current F-05 implementation-plan review: `docs/internal/efforts/F-05-pm-skill-builder/implementation-plan_reviewed-by-codex.md`
