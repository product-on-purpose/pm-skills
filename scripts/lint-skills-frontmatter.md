# lint-skills-frontmatter.sh / lint-skills-frontmatter.ps1

## Purpose

Validate the YAML frontmatter and file structure of every skill in `skills/`. Enforces naming conventions, required fields, phase/classification consistency, and reference file completeness.

## Usage

```bash
./scripts/lint-skills-frontmatter.sh
```

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\lint-skills-frontmatter.ps1
```

## What It Checks

For each `skills/*/SKILL.md`:

### Required Structure
- `SKILL.md` exists in the skill directory.
- YAML frontmatter is present (delimited by `---`).
- `references/TEMPLATE.md` exists.
- `references/EXAMPLE.md` exists.

### Required Frontmatter Fields
| Field | Rule |
|---|---|
| `name` | Must be present and match the directory name exactly |
| `version` | Must be present exactly once at the root level |
| `updated` | Must be present |
| `license` | Must be present |

### Phase and Classification Rules
| Classification | Phase Rule |
|---|---|
| `domain` | `phase` is **required** |
| `foundation` | `phase` must be **omitted** |
| `utility` | `phase` must be **omitted** |
| *(not set)* | `phase` is **required** (defaults to domain behavior) |

### Valid Phase Values
`discover`, `define`, `develop`, `deliver`, `measure`, `iterate`

### Valid Classification Values
`domain`, `foundation`, `utility`

### Additional Guards
- **No nested version** — `metadata.version` must not exist (only root `version` is allowed).
- **Exactly one root version** — catches duplicate `version:` lines.

## Exit Codes

| Code | Meaning |
|---|---|
| `0` | All skills passed |
| `1` | One or more validation failures |

## Example Output

```
[OK] skills/deliver-prd/SKILL.md
[OK] skills/define-hypothesis/SKILL.md
[FAIL] skills/foundation-persona/SKILL.md : phase should be omitted for classification 'foundation'
[OK] skills/measure-experiment-design/SKILL.md
```

## When to Use

- **After editing skill frontmatter** — catches typos, missing fields, or invalid phase/classification combos.
- **After adding a new skill** — ensures it follows the repo conventions.
- **Before tagging a release** — prevents malformed skills from shipping.
- **In CI** — add as a lint step for pull request validation.

## Safety

- Read-only — does not modify any files.
- Inspects only `skills/` directory contents.
