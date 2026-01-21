---
name: wrap-session
description: End-of-session documentation workflow that updates README, CHANGELOG, agent context files, and creates session logs. Use when wrapping up a working session, when asked to document session progress, when preparing handoff documentation, or when the user says "wrap up", "end session", "document progress", or "save session".
---

# Session Wrap-Up Workflow

Execute this workflow when ending a working session to maintain project continuity.

## Execution Steps

### 1. Identify Project Root

Locate the project root containing README.md and CHANGELOG.md. If uncertain, ask the user.

### 2. Update README.md

Update the project description and status to reflect current state. Keep changes minimal — only update what has meaningfully changed.

### 3. Update CHANGELOG.md

Append changes to the `[Unreleased]` section using Keep a Changelog format. See `references/changelog-format.md` for format details.

**Change categories:**

- `Added` — New features/files
- `Changed` — Modified functionality
- `Fixed` — Bug fixes
- `Deprecated` — Soon-to-be removed
- `Removed` — Deleted features
- `Security` — Vulnerability fixes

If CHANGELOG.md doesn't exist, create it using `assets/CHANGELOG.template.md`.

### 4. Update Agent Context Files

Create/update files in `AGENTS/<model>/` (e.g., `AGENTS/claude-opus-4.5/`):

| File           | Purpose               | When to Update          |
| -------------- | --------------------- | ----------------------- |
| `CONTEXT.md`   | Current project state | Always                  |
| `TODO.md`      | Task tracking         | When tasks change       |
| `DECISIONS.md` | Technical decisions   | When decisions are made |

**If AGENTS folder doesn't exist:** Create the full structure:

```
AGENTS/
└── claude-opus-4.5/
    ├── CONTEXT.md
    ├── TODO.md
    ├── DECISIONS.md
    ├── SESSION-LOG/
    └── PLANNING/
```

See `references/context-files.md` for file formats.

### 4b. Save Planning Artifacts (When Applicable)

If the session involved planning, review, or analysis work that produced artifacts requiring review, save them to `AGENTS/<model>/PLANNING/`:

**When to create PLANNING documents:**

- Architecture proposals or design documents
- Code review summaries and recommendations
- Investigation reports and research findings
- Implementation plans and roadmaps

**File naming:**

- Use descriptive, kebab-case names: `auth-system-design.md`, `api-migration-plan.md`
- Prefix with date for time-sensitive docs: `2025-01-14_performance-analysis.md`

**Required front matter:**

```yaml
---
created: YYYY-MM-DD
updated: YYYY-MM-DD
sessions:
  - SESSION-LOG/YYYY-MM-DD_HH-MM_session.md
status: draft | in-review | approved | superseded
tags: [planning, review, analysis]
---
```

### 5. Create Session Log

Create `AGENTS/<model>/SESSION-LOG/YYYY-MM-DD_HH-MM_session-<4-6 word summary separated by hypens>.md` with:

1. Summary (2-3 sentences)
2. Key accomplishments
3. Decisions made
4. Issues encountered
5. Next session recommendations
6. Next session prompt (copy-paste ready prompt for continuing work)
7. Session highlights (key prompts/responses, not full transcript)

See `references/session-log-format.md` for template.

### 6. Confirm Completion

Report to user:

- Files updated/created
- Key changes documented
- Recommended pickup point for next session

## Directory Structure

```
project-root/
├── README.md
├── CHANGELOG.md
└── AGENTS/
    └── claude-opus-4.5/
        ├── CONTEXT.md
        ├── TODO.md
        ├── DECISIONS.md
        ├── SESSION-LOG/
        │   └── YYYY-MM-DD_HH-MM_session.md
        └── PLANNING/
            └── <descriptive-name>.md
```

## When NOT to Run

- No meaningful work was done
- User explicitly declines documentation
- Project is temporary/throwaway