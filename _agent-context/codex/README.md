# Codex Workspace Policy

This folder is the Codex working area for `pm-skills`.

## Tracked (durable)
- `CONTEXT.md` - stable current-state facts
- `DECISIONS.md` - accepted decisions and rationale
- `WRAP-SESSION_TEMPLATE.md` - handoff template
- `WORKTREE-PRIMER.md` - clean-branch workflow quick guide

## Local-only (ignored by git)
- `PLANNING/**` - exploratory planning drafts
- `TODO.md` - scratch tasks

Session logs are written to the shared `AGENTS/SESSION-LOG/` directory (also git-ignored). See "Wrap-session output path" below.

## Wrap-session output path
Write each session handoff to the shared session-log directory:
- `AGENTS/SESSION-LOG/YYYY-MM-DD[_HH-MM]_codex_<scope>.md`

The model name is encoded in the filename (`_codex_`) so claude and codex sessions co-exist in one directory ordered by date.

This keeps session detail available locally without bloating repo history.

## How to invoke wrap session
At end of session, prompt Codex with:

```text
Use AGENTS/codex/WRAP-SESSION_TEMPLATE.md and generate a complete handoff in AGENTS/SESSION-LOG/YYYY-MM-DD[_HH-MM]_codex_<scope>.md.
Make it detailed, include next releasable chunk, and include a copy/paste restart prompt.
```

Recommended include in same prompt:
- target release (`vX.Y.Z`)
- branch/PR/tag references
- whether to include local-only WIP details

## Best-practice scope
- Keep durable policy/decision docs tracked.
- Keep high-churn session logs and planning drafts local-only (ignored).
- If a session artifact is meant for team-wide reuse, promote it from `AGENTS/SESSION-LOG/` to tracked docs under `docs/` or `AGENTS/codex/`.
