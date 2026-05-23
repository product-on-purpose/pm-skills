# check-internal-link-validity.sh / check-internal-link-validity.ps1

## Purpose

Validate internal links and same-page anchors in rendered docs. Walks `docs/**/*.{md,mdx}` (excluding `docs/internal/` and a hardcoded exclude list mirroring `src/content.config.ts`) plus the repo-root `README.md` and `AGENTS.md`, extracts markdown links of the form `[text](path)`, resolves relative/absolute file targets and verifies existence, and resolves same-page `#anchor` targets against the source file's GitHub-style heading slugs.

Closes audit gap G4 (link checking in docs). README/AGENTS coverage and same-page anchor resolution added in v2.19.0 (FU-3).

## Usage

```bash
./scripts/check-internal-link-validity.sh
./scripts/check-internal-link-validity.sh --strict
```

```powershell
.\scripts\check-internal-link-validity.ps1
.\scripts\check-internal-link-validity.ps1 -Strict
```

## What It Does

1. Walks the filesystem for `docs/**/*.{md,mdx}` excluding `docs/internal/`, then adds the repo-root `README.md` and `AGENTS.md`
2. Skips files matching the hardcoded exclude list (mirrors `src/content.config.ts`)
3. For each remaining file:
   - Computes the file's GitHub-style heading slugs (code fences skipped; duplicate headings get `-1`, `-2` suffixes)
   - Extracts markdown links via regex (`[text](path)` form)
   - Filters out external URLs (http, https, mailto, ftp, ws, wss, file, javascript, tel, data)
   - For same-page anchors (links starting with `#`): resolves the anchor against the file's heading slugs; a bare `#` (page top) is always valid
   - For file links: strips trailing `#anchor` and `?query`, resolves the path (leading `/` is absolute from the file's base root - `docs/` for docs files, repo root for README/AGENTS - otherwise relative to the source file's directory), and verifies the target exists
4. Reports broken links and anchors

## What It Does NOT Do

- **External URL validation.** External links (http/https/mailto/etc.) are skipped. Per audit Section 16.6, external link validation needs different tooling (lychee or markdown-link-check) and tolerates flakiness. v2.14.0+ may add an external-link CI step using `lychee` or similar.
- **Cross-file anchor validation.** Same-page anchors (`[X](#section)`) ARE resolved against the source file's headings (v2.19.0, FU-3). Cross-file anchors (`[X](other.md#section)`) still verify only that `other.md` exists; the `#section` fragment is not resolved across files (stretch goal, not implemented).
- **Reference-style links.** Markdown `[text][label]` reference-style links are not extracted by the current regex. Inline links `[text](path)` are the dominant pattern in pm-skills docs.
- **Image links.** `![alt](path)` images use the same syntax but the script's regex is `]\(...\)` so it captures both. Image targets ARE checked.

## Exit Codes

| Code | Meaning |
|------|---------|
| `0`  | All internal links resolve OR advisory mode (default) |
| `1`  | Broken links found AND `--strict` (bash) or `-Strict` (pwsh) was passed |

## Posture

**Enforcing since v2.14.0** (W10-promoted from advisory in v2.13.0 once broken-link cleanup landed). CI runs it with `--strict` / `-Strict` on the Ubuntu + Windows matrix. Same-page anchor resolution (v2.19.0, FU-3) was added together with a cleanup of the anchors and README links it surfaced, so the enforcing posture holds.

## Implementation Note

This script does **NOT** use `lychee` (the audit's recommended tool). `lychee` is a Rust binary that requires installation, and the v2.13 spike confirmed it's not available in the local dev environment. Pure-bash + grep regex is sufficient for internal-link validation and avoids the install complexity. v2.14.0+ may revisit this for richer features (anchor validation, reference-style links) that lychee handles natively.

## Example Output

```
=== Internal Link Validity Check ===

Files checked: 132
Broken internal links: 0

PASS: All internal links resolve.
```

```
=== Internal Link Validity Check ===

Files checked: 132
Broken internal links: 3

Broken internal links found:

  docs/concepts/skill-anatomy.md: broken link [...](old-path.md) -> old-path.md
  docs/guides/index.md: broken link [...](../missing.md) -> ../missing.md
  docs/reference/categories.md: broken link [...](skill-families/old-name.md) -> skill-families/old-name.md

WARN: 3 broken internal link(s) (advisory mode).
  Triage: each is either a typo'd link or a renamed/moved target.
  Promote to enforcing (--strict in CI) in v2.14.0+ after cleanup.
```

## Limitations / Known Issues

- **Regex-based link extraction.** Inline-only; doesn't handle reference-style links or links inside HTML content.
- **Same-page anchors validated; cross-file anchors not.** `[X](#section)` is resolved against the source file's GitHub-style heading slugs (v2.19.0). `[X](other.md#section)` still checks only that `other.md` exists.
- **No external link validation.** Out of scope for this script (network flakiness; lychee or similar handles externals).
- **MkDocs path semantics may differ.** MkDocs sometimes resolves paths differently from filesystem; e.g., a link to `getting-started/` might mean `docs/getting-started/index.md` in MkDocs. The script does NOT understand MkDocs's URL-rewriting; it does direct filesystem checks. False positives may occur if links rely on MkDocs's URL resolution.

## See Also

- `check-nav-completeness.{sh,ps1}` (companion check for nav coverage)
- `validate-references-cross-doc.{sh,ps1}` (Wave 2; targeted reference-doc cross-link check; not yet authored)
- v2.13 CI audit: `docs/internal/audit/ci-audit_2026-05-03.md` Section 16.6
- v2.13 CI execution plan: `docs/internal/release-plans/v2.13.0/plan_v2.13_ci-refactor.md` Wave 3 item 10

## Safety

Read-only. Does not modify any files.
