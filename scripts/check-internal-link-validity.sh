#!/usr/bin/env bash
# check-internal-link-validity.sh - Validate internal links in rendered docs.
#
# Walks docs/**/*.md (excluding docs/internal/ and mkdocs.yml exclude_docs),
# extracts markdown links of the form [text](path), filters to internal-only
# (relative paths and same-file anchors; skips http://, https://, mailto:),
# resolves each target relative to the source file, and verifies existence.
#
# Closes audit gap G4 (link checking in docs).
#
# Posture: ADVISORY in v2.13.0. Promote to enforcing in v2.14.0+ once
# pre-existing broken links are cleaned up.
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

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
MKDOCS_YML="$ROOT/mkdocs.yml"

STRICT=false
if [[ "${1:-}" == "--strict" ]]; then
  STRICT=true
fi

echo "=== Internal Link Validity Check ==="
echo ""

# Extract exclude_docs from mkdocs.yml (best-effort; same as nav-completeness)
EXCLUDE_PATHS=$(awk '
  /^exclude_docs:/ { in_exc=1; next }
  in_exc && /^[^[:space:]#]/ { in_exc=0; next }
  in_exc {
    line=$0
    sub(/^[[:space:]]+/, "", line)
    if (length(line) > 0) print line
  }
' "$MKDOCS_YML" 2>/dev/null || true)

is_excluded() {
  local fs_file="$1"
  while IFS= read -r exc_path; do
    [[ -z "$exc_path" ]] && continue
    local exc_clean="${exc_path#/}"
    if [[ "$exc_clean" == */ ]]; then
      [[ "$fs_file" == "$exc_clean"* ]] && return 0
    else
      [[ "$fs_file" == "$exc_clean" ]] && return 0
    fi
  done <<< "$EXCLUDE_PATHS"
  return 1
}

# Collect docs files
FS_FILES=$(find "$ROOT/docs" -name "*.md" -type f \
  | grep -v "/docs/internal/" \
  | sed "s|$ROOT/docs/||" \
  | sort)

CHECKED=0
declare -a BROKEN_LINKS

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
  echo "  Promote to enforcing (--strict in CI) in v2.14.0+ after cleanup."
  exit 0
fi
