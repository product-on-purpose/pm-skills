---
name: init-project-jpkb
description: Initialize new JPKB projects with standardized documentation and folder structure. JPKB-specific version with category folders and fixed base path. Use when creating a new project in the jpkb repository, when the user says "init project", "new project", or when the target is the JPKB projects folder.
---

# JPKB Project Initialization Workflow

Scaffold new projects in the JPKB repository with standardized documentation artifacts.

## Execution Steps

### 1. Gather Requirements

Before creating any files, clarify with user:

| Required | Question | Default |
|----------|----------|---------|
| ✓ | Project name? | *None — must ask* |
| ✓ | Category/parent folder? | Prompt with existing options |
| | Project type? | `general` |
| | License preference? | MIT |
| | Brief description? | "A new project" |

**Skip questions if context provides answers.** If user says "init parametric-hinge in 3d-prints", don't re-ask.

### 2. Confirm Target Path

Before creating files, confirm the full path:

```
Target: E:\Projects\JP KB\jpkb\projects\<category>\<project-name>\
```

Wait for user confirmation or correction.

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

### 4. Create Directory Structure

```
<project-name>/
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

### 5. Populate Files

Use templates from `assets/` folder, substituting:
- `{{PROJECT_NAME}}` — Project name
- `{{DESCRIPTION}}` — Project description
- `{{DATE}}` — Current date (YYYY-MM-DD)
- `{{YEAR}}` — Current year
- `{{CATEGORY}}` — Project category

See `references/project-types.md` for type-specific variations.

### 6. Confirm Completion

Report to user:
- Full path created
- Files generated
- Suggested next steps

## Project Types

| Type | Additional Structure | Use When |
|------|---------------------|----------|
| `general` | Base structure only | Default, documentation |
| `code-python` | + `src/`, `tests/`, `pyproject.toml` | Python projects |
| `code-node` | + `src/`, `package.json` | Node.js projects |
| `3d-print` | + `models/`, `images/` | 3D printing projects |
| `research` | + `data/`, `notebooks/` | Research/data projects |

See `references/project-types.md` for complete details.

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

## Integration with wrap-session

This skill creates the structure that `/wrap-session` writes to:

| Init Creates | Wrap-Session Updates |
|--------------|---------------------|
| README.md (template) | README.md (with progress) |
| CHANGELOG.md ([Unreleased]) | CHANGELOG.md (with changes) |
| CONTEXT.md (initial state) | CONTEXT.md (current state) |
| TODO.md (empty) | TODO.md (with tasks) |
| SESSION-LOG/ (empty) | SESSION-LOG/*.md |
