# check-no-body-h1

Validates that no `docs/**/*.{md,mdx}` file (subject to `EXCLUDE_PATHS`) has a body H1 that duplicates the frontmatter `title:` field.

## Why this validator exists

Under Astro Starlight, the frontmatter `title:` field auto-renders as the page heading. If a markdown body ALSO starts with `# Heading` matching that title, both render and the heading appears twice on the rendered page.

This duplication was a regression from the MkDocs Material to Astro Starlight migration in v2.14.0: Material did not auto-render the frontmatter title, so the body H1 was the only visible heading. After the Starlight switch, every page with both got duplicated titles. The user spotted this via mobile spot-check on `/showcase/workbench/`, `/skills/define/`, and `/skills/define/define-hypothesis/` after v2.14.0 shipped. v2.14.x V15 stripped body H1s across 62 hand-authored docs + 6 generator emission sites + the workflow generator's source-copy boundary.

This script is forward enforcement: catches regressions where a future contributor adds back a body H1.

## Rule

For each `docs/**/*.{md,mdx}` file:

1. If the file has a frontmatter `title:` field, AND
2. The first non-blank, non-import, non-comment line after the closing `---` frontmatter line is a `# Heading`,

Then the file is reported as a body-H1 duplication.

Lines that are ignored when finding "first body line":

- Blank lines
- MDX import statements (`import { Card } from '@astrojs/starlight/components';`)
- MDX JS comments (`{/* ... */}`)
- Single-line HTML comments (`<!-- ... -->`)

## Scope

Mirrors `src/content.config.ts` glob excludes plus the GitHub-directory landing README.md files (which are not shipped to the Starlight build).

`EXCLUDE_PATHS`:

- `templates/` (placeholder content)
- `workflows/README.md`, `reference/README.md`, `skills/README.md`, `guides/README.md`, `concepts/README.md`, `contributing/README.md`, `getting-started/README.md`, `showcase/README.md`, `releases/README.md` (GitHub-directory landing pages; not in Astro build)

Files under `docs/internal/**` are excluded via the `find` step in the bash version and via the `-notmatch` filter in the PowerShell version.

## Usage

```bash
# Advisory (default; exits 0)
bash scripts/check-no-body-h1.sh

# Strict (exits 1 on findings)
bash scripts/check-no-body-h1.sh --strict

# PowerShell equivalents
pwsh -File scripts/check-no-body-h1.ps1
pwsh -File scripts/check-no-body-h1.ps1 -Strict
```

CI invokes both with `--strict` / `-Strict` flags (enforcing). See `.github/workflows/validation.yml`.

## How to fix a finding

The page has a frontmatter `title:` field AND a body H1 below the closing `---`. Remove the body H1 line. Starlight will render the frontmatter title as the page heading; the body should start with a paragraph or the first `## Section` heading.

Example (before):

```markdown
---
title: My Page
description: ...
---

# My Page

Lorem ipsum.
```

Example (after):

```markdown
---
title: My Page
description: ...
---

Lorem ipsum.
```

## Related

- v2.14.x V15 commit `2211a57` (initial fix across 62 hand-authored docs + 3 generators)
- `CONTRIBUTING.md` "Maintainer notes: architectural workarounds" entry #6
- `src/content.config.ts` glob excludes (source of truth for EXCLUDE_PATHS)
- Starlight title-rendering docs: https://starlight.astro.build/guides/pages/#frontmatter
