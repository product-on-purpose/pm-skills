#!/usr/bin/env bash
# validate-references-cross-doc.sh - Validate cross-doc references in docs/reference/.
#
# Two checks:
#   1. Link resolution: every markdown link [text](path) in docs/reference/*.md
#      and docs/reference/skill-families/*.md must resolve to an existing target.
#      Skips http/https/mailto/ftp/anchor-only links (out of scope for this
#      validator; check-internal-link-validity covers the broader docs tree).
#
#   2. Skill-name cross-check: skill names listed in the Category Distribution
#      table of docs/reference/categories.md must correspond to an actual
#      skill in skills/ (matched by stripping the phase prefix from
#      skills/{phase}-{name}/ to get {name}).
#
# Closes audit Section 16.4. Pairs with Bucket A.4 by validating that the now-
# stable docs/reference/ file set has no internal-reference rot.
#
# Exit codes:
#   0 - All links resolve and all skill-name mentions correspond to real skills
#   1 - One or more broken links or unknown skill names
#
# Usage:
#   ./scripts/validate-references-cross-doc.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
REFERENCE_DIR="$ROOT/docs/reference"
SKILLS_DIR="$ROOT/skills"

echo "=== Cross-Doc References Validation ==="
echo ""

if [[ ! -d "$REFERENCE_DIR" ]]; then
  echo "FAIL: reference directory not found at $REFERENCE_DIR"
  exit 1
fi

FAIL=0
FINDINGS=()

# ---------------------------------------------------------------
# Check 1: Link resolution across docs/reference/**/*.md
# ---------------------------------------------------------------

# Walk all .md files in docs/reference/ (including skill-families/ subdir)
mapfile -t REF_FILES < <(find "$REFERENCE_DIR" -name "*.md" -type f | sort)

for src_file in "${REF_FILES[@]}"; do
  src_dir="$(dirname "$src_file")"
  src_rel="${src_file#$ROOT/}"

  # Extract markdown link targets: [text](path)
  # Pattern matches both ](...) for links and ]( for inline images / links
  links=$(grep -oE '\]\([^)]+\)' "$src_file" 2>/dev/null \
    | sed -E 's/^\]\(//; s/\)$//' \
    || true)

  while IFS= read -r raw_target; do
    [[ -z "$raw_target" ]] && continue

    # Strip surrounding whitespace and trailing title text "path "title""
    target="${raw_target%% *}"

    # Skip URLs, anchors-only, mailto, etc.
    case "$target" in
      http://*|https://*|ftp://*|mailto:*|tel:*) continue ;;
      \#*) continue ;;
      "") continue ;;
    esac

    # Skip template placeholders (e.g., {{path}}, <variable>) shown as syntax
    # examples in contract / spec docs. These are not real link targets.
    case "$target" in
      *"{{"*|*"}}"*|*"<"*|*">"*) continue ;;
    esac

    # Strip anchor fragment if present (path#anchor -> path)
    target_path="${target%%#*}"
    [[ -z "$target_path" ]] && continue

    # Resolve target relative to source file directory
    if [[ "$target_path" = /* ]]; then
      resolved="$ROOT$target_path"
    else
      resolved="$src_dir/$target_path"
    fi

    # Normalize via realpath if available, else manual cleanup
    if command -v realpath >/dev/null 2>&1; then
      normalized=$(realpath -m "$resolved" 2>/dev/null || echo "$resolved")
    else
      normalized="$resolved"
    fi

    if [[ ! -e "$normalized" ]]; then
      FAIL=1
      FINDINGS+=("BROKEN-LINK: $src_rel -> $target_path")
    fi
  done <<< "$links"
done

# ---------------------------------------------------------------
# Check 2: Skill-name cross-check in categories.md Distribution table
# ---------------------------------------------------------------

CATEGORIES_FILE="$REFERENCE_DIR/categories.md"

if [[ -f "$CATEGORIES_FILE" ]]; then
  # Build canonical command-name set: strip phase prefix from skills/ directory names.
  declare -A KNOWN_SKILLS
  for skill_dir in "$SKILLS_DIR"/*/; do
    [[ -d "$skill_dir" ]] || continue
    name=$(basename "$skill_dir")
    # Strip any of the known phase prefixes
    stripped="$name"
    for prefix in discover define develop deliver measure iterate foundation utility; do
      if [[ "$name" = "$prefix-"* ]]; then
        stripped="${name#$prefix-}"
        break
      fi
    done
    KNOWN_SKILLS["$stripped"]=1
    # Also accept the full prefixed form so direct mentions don't false-positive
    KNOWN_SKILLS["$name"]=1
  done

  # Extract the Category Distribution table block (lines after "## Category Distribution"
  # until the next ## or end of file).
  table_block=$(awk '
    /^## Category Distribution/ { in_block=1; next }
    in_block && /^## / { exit }
    in_block { print }
  ' "$CATEGORIES_FILE")

  # Each row in the Distribution table looks like:
  # | category | count | name1, name2, name3 |
  # We want the third column.
  while IFS= read -r line; do
    case "$line" in
      \|*\|*\|*\|*) ;;  # row with at least 3 pipes
      *) continue ;;
    esac
    # Skip header and divider rows
    case "$line" in
      *Skills*|*"---"*|*"--"*|*"-----"*) continue ;;
    esac
    # Extract third column: between second and third pipe
    third_col=$(echo "$line" | awk -F'|' '{ print $4 }')
    [[ -z "$third_col" ]] && continue

    # Trim and split on comma
    IFS=',' read -ra parts <<< "$third_col"
    for part in "${parts[@]}"; do
      name=$(echo "$part" | sed 's/^ *//; s/ *$//; s/`//g')
      [[ -z "$name" ]] && continue
      # Skip "Total" summary row
      [[ "$name" = "**Total**" ]] && continue
      [[ "$name" = "Total" ]] && continue
      # Skip cells that are just markdown formatting noise
      [[ "$name" = "**" ]] && continue
      [[ "$name" = "**"*"**" ]] && continue

      if [[ -z "${KNOWN_SKILLS[$name]:-}" ]]; then
        FAIL=1
        FINDINGS+=("UNKNOWN-SKILL: docs/reference/categories.md -> '$name' has no matching skill in skills/")
      fi
    done
  done <<< "$table_block"
fi

# ---------------------------------------------------------------
# Report
# ---------------------------------------------------------------

if [[ "$FAIL" -eq 1 ]]; then
  echo "FAIL: ${#FINDINGS[@]} cross-doc reference issue(s) detected:"
  echo ""
  for finding in "${FINDINGS[@]}"; do
    echo "  $finding"
  done
  echo ""
  echo "Fix: update the offending reference doc to point to a valid target,"
  echo "or rename/restore the missing target. Then re-run this validator."
  exit 1
fi

echo "PASS: all cross-doc references in docs/reference/ resolve cleanly."
exit 0
