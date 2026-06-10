# check-landing-page-counts

Validates that count claims in landing pages match the actual filesystem count of the resource they claim.

## What it catches

Stale count claims on user-facing landing pages:

- `docs/index.mdx` (docs-site homepage; Astro Starlight)
- `docs/skills/index.md` (skills landing page)
- `docs/workflows/index.md` (workflows landing page)
- `library/skill-output-samples/README_SAMPLES.md` (samples library README)

For each page, the validator scans for patterns like `<N> skills`, `<N> AI agent skills`, `<N> production-ready skills` (allowing 0-4 adjective tokens between the number and the resource word), and asserts that every detected count either matches the source-of-truth filesystem count OR appears alongside the source-of-truth count somewhere in the file (in which case stale numbers are treated as historical context).

### Homepage per-family checks (WS-A1, v2.26.0)

<!-- count-exempt:start - illustrative per-family subset numbers, not total-count claims -->
The homepage CardGrid claims a per-family count in every card title (`Discover (5 skills)`, `Utility (11 skills)`, ...) and the cross-cutting prose list claims three more (`**Foundation (9)**`, `**Utility (11)**`, `**Workshop tools (15)**`). Those lines sit inside or beside a `count-exempt` block because `check-count-consistency` would misread the subset numbers as stale totals; the 2026-06-09 audit found that carve-out had let the cards rot silently (Foundation 8 vs 9, Utility 10 vs 11, cards summing 63 under a 65 headline) - the per-page check above was satisfied because the correct total also appears in the file (the "historical context" escape hatch).
<!-- count-exempt:end -->

The per-family checks close that class:

- Every parsed card title `Family (N skills)` must match the count of `skills/<family>-*` directories.
- The card counts must sum to the total catalog count (catches a missing or extra card).
- The three bold prose family claims must match their family counts (`Workshop tools` maps to the `tool-` prefix).
- A parse miss is itself a FAIL: zero cards parsed, or a missing prose pattern, fails the check rather than silently skipping it. If you restructure the homepage markup or reword the family prose, update the patterns in both script twins in the same change.

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
