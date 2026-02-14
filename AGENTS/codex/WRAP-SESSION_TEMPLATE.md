# Wrap Session Template (Codex, v2)

Use this at the end of every implementation session to produce a decision-complete handoff artifact with clear restart instructions.

Save each completed handoff in:
- `AGENTS/codex/SESSION-LOG/YYYY-MM-DD_wrap-session_<scope>.md`

## 1) Session Metadata
- Date:
- Agent:
- Repo:
- Branch at start:
- Branch at end:
- Session objective:
- Definition of done:

## 2) Executive Summary
Write 5-10 lines in plain language:
- What was delivered
- Why it matters
- What is explicitly not delivered yet

## 3) Outcomes Delivered
List concrete outcomes (not intent), grouped by release/work item.

1.
2.
3.

## 4) Validation Evidence
Capture commands and high-signal output summary.

| Check | Command | Result | Notes |
| --- | --- | --- | --- |
| `example` | `pwsh -File scripts/validate-commands.ps1` | `pass` | |

## 5) Decisions Made
Include decision, rationale, and impact.

| Decision | Rationale | Impact |
| --- | --- | --- |
|  |  |  |

## 6) GitHub / Git References
- PR(s):
- Merge commit(s):
- Tag(s):
- Release URL(s):
- Follow-up issue(s):

## 7) Files Changed
Split by tracked vs local-only artifacts.

### Tracked
- `path/to/file`

### Local-only / ignored
- `_NOTES/...`
- `.claude/...`
- `AGENTS/codex/SESSION-LOG/...`

## 8) Repo State at End
- Current branch:
- Ahead/behind origin:
- Uncommitted changes:
- Known unrelated local WIP left untouched:

## 9) Risks / Open Questions
1.
2.

## 10) Next Releasable Chunk
- Chunk name:
- Scope:
- Exit criteria:
- Dependencies:
- Earliest tag target:

## 11) Next Session Exact Start Steps
Provide exact commands to reproduce clean context.

```bash
git fetch origin --prune
git worktree add ../<repo>-next origin/main
cd ../<repo>-next
git switch -c <next-branch>
```

## 12) Copy/Paste Restart Prompt
Include one ready-to-run prompt for the next agent session.

```text
Resume from AGENTS/codex/SESSION-LOG/<file>.md.
Goal: <next releasable chunk>.
Do:
1) <task 1>
2) <task 2>
3) <task 3>
Constraints:
- Keep unrelated local WIP untouched.
- Validate with <commands>.
- Produce a clean commit and PR summary.
```

## 13) First 3 Tasks for Next Session
1.
2.
3.

## 14) Exit Checklist
- [ ] Objectives and outcomes documented
- [ ] Validation evidence captured
- [ ] Decisions and rationale captured
- [ ] PR/tag/release refs captured
- [ ] Next releasable chunk defined
- [ ] Startup commands + copy/paste prompt included
- [ ] Local WIP risks called out explicitly
