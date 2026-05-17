# check-workflow-generator-coverage

Asserts that the workflow generator emits a row in `docs/workflows/index.md` for every source file in `_workflows/*.md`.

## What it catches

Silent drops where:

- A workflow source file in `_workflows/` exists but does not appear as a `| [Display Name](stem.md) |` row in the generated `docs/workflows/index.md`
- A workflow source file exists but its individual `docs/workflows/<stem>.md` page is missing
- The three counts (source workflows, generated pages, index rows) do not match

## Why this validator exists

v2.15.0 shipped 3 new workflows (`foundation-sprint.md`, `design-sprint.md`, `foundation-to-design.md`). The generator script `scripts/generate-workflow-pages.py` correctly wrote the 3 individual page outputs but silently skipped them from the index table because its hardcoded `workflow_info` dict had no entries for them. The `check-generated-content-untouched` validator missed this because it compares generator output to file content (consistency), not generator output to source-of-truth (correctness).

The v2.15.1 generator hardening raises `SystemExit` when a source file lacks a `workflow_info` entry, providing an author-side fence. This validator is the CI-side fence; both run, defense in depth.

## What it does NOT catch (by design)

- Whether the row text is correct or up-to-date (only checks presence)
- Whether the individual page content is correct (handled by `check-generated-content-untouched`)
- Workflow naming-discipline (e.g., "Sprint Planning (agile)" vs "Sprint Planning"; that is a content concern handled in `_workflows/*.md` frontmatter)

## Usage

```bash
bash scripts/check-workflow-generator-coverage.sh
```

```powershell
pwsh scripts/check-workflow-generator-coverage.ps1
```

## CI wiring

Wired into `.github/workflows/validation.yml` (both Ubuntu + Windows matrix entries) from v2.15.1.

## Cross-references

- Audit: `docs/internal/release-plans/v2.15.x/audit_v2.15.x_post-tag-self-review.md` (finding A03)
- Generator: `scripts/generate-workflow-pages.py` (now hardened to raise SystemExit on missing workflow_info entries)
