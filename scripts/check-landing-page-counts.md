# check-landing-page-counts

Validates that count claims in landing pages match the actual filesystem count of the resource they claim.

## What it catches

Stale count claims on user-facing landing pages:

- `docs/index.mdx` (docs-site homepage; Astro Starlight)
- `docs/skills/index.md` (skills landing page)
- `docs/workflows/index.md` (workflows landing page)
- `library/skill-output-samples/README_SAMPLES.md` (samples library README)

For each page, the validator scans for patterns like `<N> skills`, `<N> AI agent skills`, `<N> production-ready skills` (allowing 0-4 adjective tokens between the number and the resource word), and asserts that every detected count either matches the source-of-truth filesystem count OR appears alongside the source-of-truth count somewhere in the file (in which case stale numbers are treated as historical context).

## What it does NOT catch (by design)

- Counts inside `CHANGELOG.md`, `docs/changelog.md`, `docs/releases/`, or `docs/internal/` (these are historical archives by convention)
- Counts of resources other than skills / commands / workflows (e.g., sample counts; covered separately)
- Counts in body prose of skill SKILL.md files, library samples, or generated pages

## Why this validator exists

v2.15.0 shipped with `docs/index.mdx` still claiming the prior 40-skill catalog size while the actual catalog grew to 55 entries. The existing `check-count-consistency.sh` validator missed this because its regex did not match descriptive phrases with intervening adjective tokens. The audit at `docs/internal/release-plans/v2.15.x/audit_v2.15.x_post-tag-self-review.md` (findings A01 + A02 + A06) documented the gap; this validator closes it.

## Usage

```bash
bash scripts/check-landing-page-counts.sh           # advisory mode
bash scripts/check-landing-page-counts.sh --strict  # CI mode (exit 1 on any stale claim)
```

```powershell
pwsh scripts/check-landing-page-counts.ps1
pwsh scripts/check-landing-page-counts.ps1 -Strict
```

## CI wiring

Wired into `.github/workflows/validation.yml` (both Ubuntu + Windows matrix entries) with `--strict` / `-Strict` from v2.15.1.

## Cross-references

- Audit: `docs/internal/release-plans/v2.15.x/audit_v2.15.x_post-tag-self-review.md`
- Memory: `feedback_pre-tag-validator-bundle.md`
- Related issue: [#132 M-20 Docs Count Consistency CI](https://github.com/product-on-purpose/pm-skills/issues/132)
