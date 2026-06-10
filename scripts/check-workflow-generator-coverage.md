# check-workflow-generator-coverage

Asserts that the site generator (`scripts/gen-site.mjs`) emits a row in the generated `site/src/content/docs/workflows/index.md` for every source file in `_workflows/*.md`, plus a generated page per workflow. The generated tree is gitignored and rebuilt per build.

## What it catches

Coverage gaps where:

- A workflow source file in `_workflows/` exists but does not appear as a `| [Display Name](stem.md) |` row in the generated `site/src/content/docs/workflows/index.md`
- A workflow source file exists but its individual `site/src/content/docs/workflows/<stem>.md` page is missing
- The three counts (source workflows, generated pages, index rows) do not match

The realistic failure modes today are a stale generated tree (the generator was not re-run after a workflow was added) or a generator regression that drops output.

## Why this validator exists

v2.15.0 shipped 3 new workflows (`foundation-sprint.md`, `design-sprint.md`, `foundation-to-design.md`). The then-current Python generator (`generate-workflow-pages.py`, retired in the v2.25.1 Pattern S reorg) correctly wrote the 3 individual page outputs but silently skipped them from the index table because its hardcoded `workflow_info` dict had no entries for them. The `check-generated-content-untouched` validator missed this because it compares generator output to file content (consistency), not generator output to source-of-truth (correctness).

`scripts/gen-site.mjs` now derives both the pages and the index dynamically from `_workflows/*.md`, so the original hardcoded-dict silent-drop mechanism is structurally gone; this validator remains as the CI-side fence for the surviving failure modes above.

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
- Generator: `scripts/gen-site.mjs` (replaced the retired `generate-workflow-pages.py` in the v2.25.1 Pattern S reorg)
