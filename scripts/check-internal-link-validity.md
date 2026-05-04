# check-internal-link-validity.sh / check-internal-link-validity.ps1

## Purpose

Validate internal links in rendered docs. Walks `docs/**/*.md` (excluding `docs/internal/` and `mkdocs.yml exclude_docs`), extracts markdown links of the form `[text](path)`, filters to internal-only (skips external URLs and same-page anchors), resolves each target relative to the source file, and verifies existence.

Closes audit gap G4 (link checking in docs).

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

1. Walks the filesystem for `docs/**/*.md` excluding `docs/internal/`
2. Parses `mkdocs.yml exclude_docs:` and skips matching files
3. For each remaining file:
   - Extracts markdown links via regex (`[text](path)` form)
   - Filters out external URLs (http, https, mailto, ftp, ws, wss, file, javascript, tel, data)
   - Filters out same-page anchors (links starting with `#`)
   - Strips trailing `#anchor` and `?query` from path
   - Resolves the path:
     - Leading `/` → absolute from `docs/` root
     - Otherwise → relative to source file's directory
   - Verifies the target file or directory exists
4. Reports broken links

## What It Does NOT Do

- **External URL validation.** External links (http/https/mailto/etc.) are skipped. Per audit Section 16.6, external link validation needs different tooling (lychee or markdown-link-check) and tolerates flakiness. v2.14.0+ may add an external-link CI step using `lychee` or similar.
- **Anchor validation within target files.** A link like `[X](other.md#section)` has its `#section` part stripped before existence check. The script verifies `other.md` exists; it does NOT verify `#section` is a real heading anchor in `other.md`.
- **Reference-style links.** Markdown `[text][label]` reference-style links are not extracted by the current regex. Inline links `[text](path)` are the dominant pattern in pm-skills docs.
- **Image links.** `![alt](path)` images use the same syntax but the script's regex is `]\(...\)` so it captures both. Image targets ARE checked.

## Exit Codes

| Code | Meaning |
|------|---------|
| `0`  | All internal links resolve OR advisory mode (default) |
| `1`  | Broken links found AND `--strict` (bash) or `-Strict` (pwsh) was passed |

## Posture (v2.13.0)

**Advisory.** Audit Section 16.6 specifies enforcing for internal links and advisory for external. Shipping advisory for internal in v2.13.0 because:

- Pre-existing broken internal links may exist; enforcing without cleanup blocks CI
- Same Wave 1 lesson: don't promote to enforcing on pre-existing drift

**Promotion plan:** v2.14.0+ once broken-link cleanup lands. The audit's enforcing posture is the right end state.

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
- **No anchor validation.** Stripping `#anchor` for existence check; not verifying the anchor exists as a heading.
- **No external link validation.** Out of scope for this script (network flakiness; lychee or similar handles externals).
- **MkDocs path semantics may differ.** MkDocs sometimes resolves paths differently from filesystem; e.g., a link to `getting-started/` might mean `docs/getting-started/index.md` in MkDocs. The script does NOT understand MkDocs's URL-rewriting; it does direct filesystem checks. False positives may occur if links rely on MkDocs's URL resolution.

## See Also

- `check-nav-completeness.{sh,ps1}` (companion check for nav coverage)
- `validate-references-cross-doc.{sh,ps1}` (Wave 2; targeted reference-doc cross-link check; not yet authored)
- v2.13 CI audit: `docs/internal/audit/ci-audit_2026-05-03.md` Section 16.6
- v2.13 CI execution plan: `docs/internal/release-plans/v2.13.0/plan_v2.13_ci-refactor.md` Wave 3 item 10

## Safety

Read-only. Does not modify any files.
