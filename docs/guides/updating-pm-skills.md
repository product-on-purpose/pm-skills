---
title: Updating PM Skills
description: How to check for updates and keep your pm-skills installation current.
---

The **update-pm-skills** skill keeps your local pm-skills installation current with the latest release. It checks versions, previews changes, creates backups, and produces a structured report -- all without you having to manage files manually.

This guide is for **end users** who installed pm-skills via clone or ZIP download. If you are a repo contributor, use `git pull` instead.

---

## Three Modes

The updater runs in one of three modes depending on the flag you pass.

### Quick status check

```
/pm-skills:utility-update-pm-skills --status
```

Prints your current version, the latest available version, and whether an update is available. No files are read or written beyond the version check.

### Preview (report only)

```
/pm-skills:utility-update-pm-skills --report-only
```

Runs the full comparison -- version delta, value summary, file manifest -- and saves a report to `_pm-skills/updates/`, but does **not** write any skill files. Use this when you want to see what changed before committing to an update.

### Full update (default)

```
/pm-skills:utility-update-pm-skills
```

Walks through the complete flow: pre-flight checks, preview, confirmation prompt, optional backup, file update, smoke test, and completion report.

---

## What Gets Updated (and What Doesn't)

The updater writes only files included in the official release ZIP produced by `build-release.sh`.

**Updated:**

| Directory | Contents |
|-----------|----------|
| `skills/` | Core skill files |
| `commands/` | Slash command definitions |
| `_workflows/` | Workflow chains |
| `library/` | Sample library and skill output samples |
| `docs/` (public) | User-facing guides, reference, workflows |
| Root files | `AGENTS.md`, `README.md`, `CHANGELOG.md`, `mkdocs.yml`, etc. |

**Never touched:**

| Directory | Why |
|-----------|-----|
| `docs/internal/` | Excluded from the release ZIP |
| `_NOTES/` | Local-only, gitignored |
| `_pm-skills/` | Your local state -- reports, backups |
| `.github/` | CI workflows, not in the ZIP |

Files you added locally that are not in the upstream release are left untouched. The updater never deletes local files.

---

## How Backups Work

Before writing any files, the updater offers to create a backup of your current installation.

If you accept (recommended), it copies all in-scope files to:

```
_pm-skills/backups/v{current-version}_{YYYY-MM-DD_HHMMSS}/
```

The `_pm-skills/` directory is created automatically if it does not exist. Backups are never overwritten by future updates -- each one gets a unique timestamped directory.

---

## Restoring from a Backup

If you need to roll back, copy the backup contents over your installation root:

```bash
cp -r _pm-skills/backups/v2.9.0_2026-04-09_143022/* .
```

On Windows (PowerShell):

```powershell
Copy-Item -Path "_pm-skills\backups\v2.9.0_2026-04-09_143022\*" -Destination "." -Recurse -Force
```

If you did not create a backup but your installation is a git clone, you can restore tracked files with `git checkout .` to return to the last committed state.

---

## Further Reading

For the full technical specification -- pre-flight fallback chains, smoke test details, MCP advisory behavior, and the complete output contract -- see the [update-pm-skills SKILL.md](../../skills/utility-update-pm-skills/SKILL.md).

---

*Part of [PM Skills](https://github.com/product-on-purpose/pm-skills) -- Open-source Product Management skills for AI agents*
