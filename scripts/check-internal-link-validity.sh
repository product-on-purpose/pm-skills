#!/usr/bin/env bash
# check-internal-link-validity.sh - Validate internal links in rendered docs.
#
# Walks docs/**/*.md (excluding docs/internal/ and a hardcoded list mirroring
# src/content.config.ts glob excludes), extracts markdown links of the form
# [text](path), filters to internal-only (relative paths and same-file anchors;
# skips http://, https://, mailto:), resolves each target relative to the
# source file, and verifies existence.
#
# Closes audit gap G4 (link checking in docs).
#
# Posture: ENFORCING in v2.14.0+ (W10-promoted from advisory). Source-of-truth
# for excluded paths migrated from mkdocs.yml exclude_docs to a hardcoded
# array here (W12 Material deprecation). If src/content.config.ts changes its
# glob excludes, update EXCLUDE_PATHS below to match.
#
# External link validation is NOT done by this script. Per audit Section 16.6,
# external links use a different flow (lychee or similar) that requires network
# access and tolerates flakiness. v2.14 may add an external-link CI step.
#
# Exit codes:
#   0 - All internal links resolve OR advisory mode (default)
#   1 - Broken links found AND --strict was passed
#
# Usage:
#   ./scripts/check-internal-link-validity.sh
#   ./scripts/check-internal-link-validity.sh --strict

set -euo pipefail

# Ensure UTF-8 locale so 'grep -P' (Perl regex) works on systems with
# empty default LANG/LC_ALL (notably Windows Git Bash). On Linux runners
# C.UTF-8 is typically already set; this is defensive. Without a UTF-8
# locale, 'grep -P' silently fails with 'supports only unibyte and UTF-8
# locales' and the script reports 0 broken links even when broken links
# exist (W13 FU6 surface; closes the bash/pwsh parity gap).
export LC_ALL="${LC_ALL:-C.UTF-8}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

STRICT=false
if [[ "${1:-}" == "--strict" ]]; then
  STRICT=true
fi

echo "=== Internal Link Validity Check ==="
echo ""

# Hardcoded exclusion list. Mirrors src/content.config.ts glob excludes
# under docs/. Was previously read from mkdocs.yml exclude_docs in v2.13.x.
# Trailing slash means "directory prefix"; no trailing slash means "exact file".
EXCLUDE_PATHS=(
  "templates/"
  "workflows/README.md"
  "reference/README.md"
)

is_excluded() {
  local fs_file="$1"
  local exc_path
  for exc_path in "${EXCLUDE_PATHS[@]}"; do
    if [[ "$exc_path" == */ ]]; then
      [[ "$fs_file" == "${exc_path}"* ]] && return 0
    else
      [[ "$fs_file" == "$exc_path" ]] && return 0
    fi
  done
  return 1
}

# Collect docs files
FS_FILES=$(find "$ROOT/docs" -name "*.md" -type f \
  | grep -v "/docs/internal/" \
  | sed "s|$ROOT/docs/||" \
  | sort)

CHECKED=0
BROKEN_LINKS=()

while IFS= read -r fs_file; do
  [[ -z "$fs_file" ]] && continue
  if is_excluded "$fs_file"; then continue; fi

  full_path="$ROOT/docs/$fs_file"
  source_dir=$(dirname "$full_path")
  CHECKED=$((CHECKED + 1))

  # Extract all markdown links: [text](path)
  # Use grep -oP for Perl-compatible regex; capture only the path inside parens
  while IFS= read -r link; do
    [[ -z "$link" ]] && continue

    # Skip external (http://, https://, mailto:, ftp://, ws://, wss://, file://, javascript:)
    if [[ "$link" =~ ^(https?:|mailto:|ftp:|wss?:|file:|javascript:|tel:|data:) ]]; then
      continue
    fi

    # Skip pure same-page anchors (e.g., "#section")
    if [[ "$link" =~ ^# ]]; then
      continue
    fi

    # Skip template placeholders ({{path}}, {release-url}, <placeholder>, etc.)
    if [[ "$link" == *'{'* || "$link" == *'}'* || "$link" == *'<'* || "$link" == *'>'* ]]; then
      continue
    fi

    # Strip query string and trailing anchor for existence check
    link_path="${link%%#*}"
    link_path="${link_path%%\?*}"

    # Skip empty (just an anchor or query)
    [[ -z "$link_path" ]] && continue

    # Resolve target
    if [[ "$link_path" == /* ]]; then
      # Absolute path (rooted at repo for docs use; or absolute filesystem)
      # In MkDocs, leading / typically means "from docs/ root"
      target="$ROOT/docs${link_path}"
    else
      # Relative to source file's directory
      target="$source_dir/$link_path"
    fi

    # Normalize: resolve .. and . segments via realpath if available, else manual
    if command -v realpath &>/dev/null; then
      resolved=$(realpath -m "$target" 2>/dev/null || echo "$target")
    else
      resolved="$target"
    fi

    # Verify existence (file or directory)
    if [[ ! -e "$resolved" ]]; then
      BROKEN_LINKS+=("docs/${fs_file}: broken link [...]($link) -> $link_path")
    fi
  done < <(grep -oP '\]\(\K[^)]+(?=\))' "$full_path" 2>/dev/null || true)

done <<< "$FS_FILES"

BROKEN_COUNT=${#BROKEN_LINKS[@]}

echo "Files checked: $CHECKED"
echo "Broken internal links: $BROKEN_COUNT"
echo ""

if [[ $BROKEN_COUNT -eq 0 ]]; then
  echo "PASS: All internal links resolve."
  exit 0
fi

echo "Broken internal links found:"
echo ""
for link in "${BROKEN_LINKS[@]:0:50}"; do
  echo "  $link"
done
if [[ $BROKEN_COUNT -gt 50 ]]; then
  echo ""
  echo "  ... and $((BROKEN_COUNT - 50)) more"
fi
echo ""

if [[ "$STRICT" == "true" ]]; then
  echo "FAIL (--strict): $BROKEN_COUNT broken internal link(s)."
  exit 1
else
  echo "WARN: $BROKEN_COUNT broken internal link(s) (advisory mode)."
  echo "  Triage: each is either a typo'd link or a renamed/moved target."
  echo "  CI runs this script without --strict; pass --strict for enforcing local runs."
  exit 0
fi
