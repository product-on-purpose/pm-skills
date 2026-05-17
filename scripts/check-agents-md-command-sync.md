# check-agents-md-command-sync

Asserts that the command summary table in `AGENTS.md` covers every slash command in `commands/`.

## What it catches

Drift between the canonical command source (`commands/*.md`) and the agent-discovery command summary table at the bottom of `AGENTS.md`:

- **Missing rows**: a `commands/<name>.md` file exists but the table has no `| \`/<name>\` |` row
- **Orphaned rows**: a `| \`/<name>\` |` table row exists but `commands/<name>.md` is gone (e.g., renamed or deleted command)

Workflow-prefixed slash commands (`/workflow-*`) are recognized as aliases into `_workflows/` and validated against that directory.

## Why this validator exists

v2.15.0 added a new "Tools" SECTION at the top of `AGENTS.md` covering 15 new sprint slash commands but never updated the command summary table at the bottom. Readers using `AGENTS.md` as the canonical agent-discovery doc saw the tools in the upper section but found an incomplete table at the bottom. AI assistants scraping the table to enumerate available commands reported 42 instead of 57.

Running this validator at v2.15.1 ship time also surfaced 5 pre-existing drift items from v2.11.0 (Meeting Skills Family commands and `/stakeholder-update`) that had never been added to the table either. This is the value of structural validators: they catch not only the release-cycle-immediate gap but legacy drift from older cycles.

## What it does NOT catch (by design)

- Whether the description column text accurately describes the command (use `validate-commands` for that)
- Whether commands resolve correctly when invoked (covered by `validate-commands`)
- Order of rows in the table

## Usage

```bash
bash scripts/check-agents-md-command-sync.sh
```

```powershell
pwsh scripts/check-agents-md-command-sync.ps1
```

## CI wiring

Wired into `.github/workflows/validation.yml` (both Ubuntu + Windows matrix entries) from v2.15.1.

## Cross-references

- Audit: `docs/internal/release-plans/v2.15.x/audit_v2.15.x_post-tag-self-review.md` (finding A04)
- Related: `validate-commands.sh` (validates that commands resolve; complementary check)
- Related: `validate-agents-md.sh` (validates AGENTS.md skill paths)
