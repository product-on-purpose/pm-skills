---
name: init-project
description: Initialize projects with agentic coding structure. Use when setting up a new project, adding AI agent support to existing project, or when user says "init", "initialize", "setup project", or "scaffold". Creates AGENTS folder, documentation templates, and _NOTES scratch space.
---

# Project Initialization Workflow

Scaffold projects with agentic coding structure for AI-assisted development.

## Execution Steps

### 1. Determine Target Directory

- Default: Current working directory
- If user specifies a path, use that instead
- If directory doesn't exist, offer to create it

### 2. Gather Requirements

| Required | Question | Default |
|----------|----------|---------|
| | Project name? | Directory name |
| | Project type? | `general` |
| | License preference? | MIT |
| | Brief description? | "A new project" |

**Skip questions if context provides answers.**

### 3. Check for Existing Files

Before creating, check what already exists:

| If Exists | Action |
|-----------|--------|
| README.md | **Skip** — preserve existing |
| CHANGELOG.md | **Skip** — preserve existing |
| LICENSE | **Skip** — preserve existing |
| .gitignore | **Merge** — append missing entries |
| _NOTES/ | **Skip** — preserve existing |
| AGENTS/ | **Create missing parts** only |

This allows safe re-runs on existing projects to add agentic structure.

### 4. Confirm Before Creating

Show user:
- Target path
- Files to be created (noting any skipped)
- Project type selected

Wait for confirmation.

### 5. Create Directory Structure

```
<project-root>/
├── README.md
├── CHANGELOG.md
├── LICENSE
├── .gitignore
├── _NOTES/
│   └── .gitkeep
└── AGENTS/
    └── claude-opus-4.5/
        ├── CONTEXT.md
        ├── TODO.md
        ├── DECISIONS.md
        └── SESSION-LOG/
```

### 6. Populate Files

Use templates from `assets/` folder, substituting:
- `{{PROJECT_NAME}}` — Project name
- `{{DESCRIPTION}}` — Project description
- `{{DATE}}` — Current date (YYYY-MM-DD)
- `{{YEAR}}` — Current year

### 7. Add Type-Specific Files

| Type | Additional Structure |
|------|---------------------|
| `general` | Base structure only |
| `code-python` | + `src/`, `tests/`, `pyproject.toml` |
| `code-node` | + `src/`, `package.json` |

See `references/project-types.md` for details.

### 8. Confirm Completion

Report:
- Full path created
- Files generated
- Suggested next steps

## Template Assets

| File | Source |
|------|--------|
| README.md | `assets/README.template.md` |
| CHANGELOG.md | `assets/CHANGELOG.template.md` |
| LICENSE (MIT) | `assets/LICENSE-MIT.txt` |
| LICENSE (Apache) | `assets/LICENSE-Apache2.txt` |
| .gitignore | `assets/gitignore-general.txt` |
| CONTEXT.md | `assets/CONTEXT.template.md` |
| TODO.md | `assets/TODO.template.md` |
| DECISIONS.md | `assets/DECISIONS.template.md` |

## Integration

This skill creates structure compatible with `/wrap-session`:

| Init Creates | Wrap-Session Updates |
|--------------|---------------------|
| README.md | README.md (with progress) |
| CHANGELOG.md | CHANGELOG.md (with changes) |
| CONTEXT.md | CONTEXT.md (current state) |
| TODO.md | TODO.md (with tasks) |
| SESSION-LOG/ | SESSION-LOG/*.md |
