#!/usr/bin/env bash
#
# check-no-body-h1.sh
#
# Forward enforcement of the v2.14.x V15 fix: under Starlight, the frontmatter
# `title:` field auto-renders as the page heading. If a body ALSO starts with
# `# Heading`, the title appears twice on the rendered page. This validator
# refuses any docs/**/*.{md,mdx} file (subject to EXCLUDE_PATHS) where the first
# non-blank, non-comment line after the closing frontmatter `---` is a `#` H1.
#
# Same EXCLUDE_PATHS scope mirroring `src/content.config.ts` glob excludes as
# `check-internal-link-validity.sh` and `validate-docs-frontmatter.sh`. README.md
# files (GitHub-directory landing pages excluded from the Astro build) are not
# checked because they do not render through Starlight.
#
# Exit codes:
#   0 - no body H1 found OR advisory mode (default)
#   1 - body H1 found AND --strict was passed
#
# Usage:
#   ./scripts/check-no-body-h1.sh
#   ./scripts/check-no-body-h1.sh --strict

set -euo pipefail

# Ensure UTF-8 locale so awk/grep handle multibyte chars cleanly on Windows Git Bash.
export LC_ALL="${LC_ALL:-C.UTF-8}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

STRICT=false
if [[ "${1:-}" == "--strict" ]]; then
  STRICT=true
fi

echo "=== Body H1 Duplication Check ==="
echo ""

# Hardcoded exclusion list. Mirrors src/content.config.ts glob excludes
# under docs/. Trailing slash means "directory prefix"; no trailing slash
# means "exact file".
EXCLUDE_PATHS=(
  "templates/"
  # Generated library samples are verbatim artifacts that legitimately carry their
  # own body H1; they were never in this validator's scope before the Pattern S move
  # (they lived in library/, outside docs/).
  "samples/"
  # GitHub-directory landing pages (excluded from Astro build via
  # docs/**/README.md glob in src/content.config.ts)
  "workflows/README.md"
  "reference/README.md"
  "skills/README.md"
  "guides/README.md"
  "concepts/README.md"
  "contributing/README.md"
  "getting-started/README.md"
  "showcase/README.md"
  "releases/README.md"
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

# Collect docs files. Includes both .md and .mdx (mirrors v2.14.x V6 scope).
FS_FILES=$(find "$ROOT/site/src/content/docs" \( -name "*.md" -o -name "*.mdx" \) -type f \
  | grep -v "/docs/internal/" \
  | sed "s|$ROOT/site/src/content/docs/||" \
  | sort)

CHECKED=0
FINDINGS=()

while IFS= read -r fs_file; do
  [[ -z "$fs_file" ]] && continue
  if is_excluded "$fs_file"; then continue; fi

  full_path="$ROOT/site/src/content/docs/$fs_file"
  CHECKED=$((CHECKED + 1))

  # Use awk to find: presence of frontmatter title + first non-blank,
  # non-import, non-comment line after closing --- being an H1.
  result=$(awk '
    BEGIN { state = "before"; has_title = 0; first_body_line = "" }
    state == "before" && $0 == "---" { state = "frontmatter"; next }
    state == "frontmatter" && /^title:/ { has_title = 1 }
    state == "frontmatter" && $0 == "---" { state = "body"; next }
    state == "body" && first_body_line == "" {
      # Skip MDX import lines, JS comments, HTML comments, blank lines
      if ($0 == "") next
      if ($0 ~ /^import /) next
      if ($0 ~ /^\{\/\*.*\*\/\}/) next
      if ($0 ~ /^<!--.*-->$/) next
      first_body_line = $0
      exit
    }
    END {
      if (has_title && first_body_line ~ /^# /) print first_body_line
    }
  ' "$full_path")

  if [[ -n "$result" ]]; then
    FINDINGS+=("docs/${fs_file}: body H1 found below frontmatter title -> ${result}")
  fi
done <<< "$FS_FILES"

FINDING_COUNT=${#FINDINGS[@]}

echo "Files checked: $CHECKED"
echo "Body H1 duplications: $FINDING_COUNT"
echo ""

if (( FINDING_COUNT == 0 )); then
  echo "PASS: No body H1 duplications detected."
  exit 0
fi

echo "Body H1 duplications found:"
for finding in "${FINDINGS[@]:0:20}"; do
  echo "  $finding"
done
if (( FINDING_COUNT > 20 )); then
  echo "  ... and $((FINDING_COUNT - 20)) more"
fi
echo ""

if [[ "$STRICT" == "true" ]]; then
  echo "FAIL (--strict): $FINDING_COUNT body H1 duplication(s)."
  echo "Fix: remove the body H1; Starlight renders frontmatter title as the page heading."
  echo "See CONTRIBUTING.md 'Maintainer notes: architectural workarounds' #6 for context."
  exit 1
fi

echo "WARN: $FINDING_COUNT body H1 duplication(s) (advisory mode)."
echo "  CI runs this script with --strict; fix before push."
