# Workflows

Source of truth for workflow definitions.

Each `.md` file defines a multi-skill workflow — a guided sequence of PM skills for a common product management process.

## Link Convention

Files in this directory use **repo-relative paths** for skill references:

```markdown
[`define-hypothesis`](../skills/define-hypothesis/SKILL.md)
```

This makes them directly usable by AI agents (Copilot, Cursor, Windsurf) and repo browsers.

## Editing

Edit workflow content here. Do **not** edit `docs/workflows/` directly — those files are generated from this directory by `scripts/generate-workflow-pages.py`.
