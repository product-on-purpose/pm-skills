#!/usr/bin/env bash
# check-nav-completeness.sh - Verify every docs/**/*.md is in mkdocs.yml nav or exclude_docs.
#
# Catches silent orphans introduced when contributors add a docs/**/*.md file
# without wiring it into mkdocs.yml. Closes the v2.12.0 docs/reference/README.md
# orphan-class issue.
#
# Exit codes:
#   0 - All docs files accounted for; all nav entries resolve
#   1 - One or more orphans or broken nav entries
#
# Usage:
#   ./scripts/check-nav-completeness.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
MKDOCS_YML="$ROOT/mkdocs.yml"

# Auto-include patterns (bash glob): files matching these are treated as in-nav
# even if not explicitly listed. Used for files transitively reachable via
# index pages (e.g., release notes linked from docs/releases/index.md table).
AUTO_INCLUDE_PATTERNS=(
  "releases/Release_v*.md"
  "templates/*"
)

echo "=== Nav Completeness Check ==="
echo ""

if [[ ! -f "$MKDOCS_YML" ]]; then
  echo "FAIL: mkdocs.yml not found at $MKDOCS_YML"
  exit 1
fi

# Collect filesystem files (excluding docs/internal/)
FS_FILES=$(find "$ROOT/docs" -name "*.md" -type f \
  | grep -v "/docs/internal/" \
  | sed "s|$ROOT/docs/||" \
  | sort)

# Extract nav .md paths (any .md path mentioned in nav: section)
NAV_LINES=$(awk '
  /^nav:/ { in_nav=1; next }
  in_nav && /^[^[:space:]#]/ { in_nav=0; next }
  in_nav { print }
' "$MKDOCS_YML")
NAV_PATHS=$(echo "$NAV_LINES" | grep -oE '[a-zA-Z_][a-zA-Z0-9_/-]*\.md' | sort -u)

# Extract exclude_docs entries (multi-line literal block scalar after exclude_docs: |)
EXCLUDE_PATHS=$(awk '
  /^exclude_docs:/ { in_exc=1; next }
  in_exc && /^[^[:space:]#]/ { in_exc=0; next }
  in_exc {
    line=$0
    sub(/^[[:space:]]+/, "", line)
    if (length(line) > 0) print line
  }
' "$MKDOCS_YML")

FAIL=0
FAIL_COUNT=0

# Forward check: every filesystem file should be in nav, excluded, or auto-included
while IFS= read -r fs_file; do
  [[ -z "$fs_file" ]] && continue

  # In nav?
  if echo "$NAV_PATHS" | grep -qFx "$fs_file" 2>/dev/null; then
    continue
  fi

  # Auto-included?
  auto_included=0
  for pattern in "${AUTO_INCLUDE_PATTERNS[@]}"; do
    if [[ "$fs_file" == $pattern ]]; then
      auto_included=1
      break
    fi
  done
  [[ $auto_included -eq 1 ]] && continue

  # In exclude_docs?
  excluded=0
  while IFS= read -r exc_path; do
    [[ -z "$exc_path" ]] && continue
    exc_clean="${exc_path#/}"
    if [[ "$exc_clean" == */ ]]; then
      # Directory exclusion
      if [[ "$fs_file" == "$exc_clean"* ]]; then
        excluded=1
        break
      fi
    else
      # File exclusion (exact match)
      if [[ "$fs_file" == "$exc_clean" ]]; then
        excluded=1
        break
      fi
    fi
  done <<< "$EXCLUDE_PATHS"

  if [[ $excluded -eq 0 ]]; then
    echo "[FAIL] docs/$fs_file not in mkdocs.yml nav or exclude_docs"
    FAIL=1
    FAIL_COUNT=$((FAIL_COUNT + 1))
  fi
done <<< "$FS_FILES"

# Reverse check: every nav entry should reference an existing file
while IFS= read -r nav_path; do
  [[ -z "$nav_path" ]] && continue
  if [[ ! -f "$ROOT/docs/$nav_path" ]]; then
    echo "[FAIL] mkdocs.yml nav references missing file: docs/$nav_path"
    FAIL=1
    FAIL_COUNT=$((FAIL_COUNT + 1))
  fi
done <<< "$NAV_PATHS"

FS_COUNT=$(echo "$FS_FILES" | grep -c . || true)
NAV_COUNT=$(echo "$NAV_PATHS" | grep -c . || true)

echo ""
echo "Filesystem files (excluding docs/internal/): $FS_COUNT"
echo "Nav entries:                                  $NAV_COUNT"

if [[ $FAIL -eq 0 ]]; then
  echo ""
  echo "PASS: All docs files are in nav, excluded, or auto-included; all nav entries resolve."
  exit 0
else
  echo ""
  echo "FAIL: $FAIL_COUNT nav-completeness violation(s)."
  exit 1
fi
