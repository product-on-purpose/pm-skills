# Project Types Reference

## Type: `general`

Default type for documentation, notes, and simple projects.

**Structure:**
```
project-name/
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

**README sections:** Overview, Getting Started, License

---

## Type: `code-python`

Python code projects.

**Additional structure:**
```
project-name/
├── src/
│   └── __init__.py
├── tests/
│   └── __init__.py
├── pyproject.toml
└── requirements.txt
```

**Use .gitignore:** `gitignore-python.txt`

**README sections:** Overview, Installation, Usage, Development, License

**pyproject.toml template:**
```toml
[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"

[project]
name = "{{PROJECT_NAME}}"
version = "0.1.0"
description = "{{DESCRIPTION}}"
readme = "README.md"
requires-python = ">=3.9"
dependencies = []

[project.optional-dependencies]
dev = ["pytest", "black", "ruff"]
```

---

## Type: `code-node`

Node.js/JavaScript projects.

**Additional structure:**
```
project-name/
├── src/
│   └── index.js
├── package.json
└── .nvmrc
```

**Use .gitignore:** `gitignore-node.txt`

**README sections:** Overview, Installation, Usage, Scripts, License

**package.json template:**
```json
{
  "name": "{{PROJECT_NAME}}",
  "version": "0.1.0",
  "description": "{{DESCRIPTION}}",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "test": "echo \"No tests yet\" && exit 0"
  },
  "keywords": [],
  "license": "MIT"
}
```

---

## Type: `3d-print`

3D printing and CAD projects.

**Additional structure:**
```
project-name/
├── models/
│   └── .gitkeep
├── images/
│   └── .gitkeep
└── prints/
    └── .gitkeep
```

**README sections:**
- Overview (with hero image placeholder)
- Print Settings (layer height, infill, supports, material)
- Bill of Materials (if applicable)
- Assembly (if multi-part)
- Modifications (customization notes)
- License

**README template additions:**
```markdown
## Print Settings

| Setting | Value |
|---------|-------|
| Layer Height | 0.2mm |
| Infill | 20% |
| Supports | No |
| Material | PLA |
| Print Time | ~X hours |

## Files

- `models/` — Source CAD and STL files
- `images/` — Photos and renders
- `prints/` — Print logs and settings exports
```

---

## Type: `research`

Research, data analysis, and notebook projects.

**Additional structure:**
```
project-name/
├── data/
│   ├── raw/
│   └── processed/
├── notebooks/
│   └── 01-exploration.ipynb
├── references/
│   └── .gitkeep
└── outputs/
    └── .gitkeep
```

**Use .gitignore:** Add `data/raw/*` exclusions (keep structure, not data)

**README sections:** Overview, Research Question, Data Sources, Methodology, Findings, References, License

---

## Type Selection Heuristics

| If project name contains... | Suggest type |
|----------------------------|--------------|
| `parametric`, `print`, `stl`, `cad` | `3d-print` |
| `api`, `app`, `cli`, `lib` | `code-python` or `code-node` |
| `analysis`, `research`, `study` | `research` |
| `docs`, `notes`, `guide` | `general` |

When uncertain, ask the user.
