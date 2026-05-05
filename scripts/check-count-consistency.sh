#!/usr/bin/env bash
# check-count-consistency.sh . Detect stale hardcoded counts in docs.
#
# Counts actual skills, commands, and workflows, then scans tracked .md and
# .json files for hardcoded numbers that no longer match.
#
# Exit codes:
#   0 . All counts are consistent
#   1 . Stale counts detected
#
# Usage:
#   ./scripts/check-count-consistency.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "=== Count Consistency Check ==="
echo ""

# --- Count actual resources ---

SKILL_COUNT=$(find "$ROOT/skills" -mindepth 1 -maxdepth 1 -type d | wc -l | tr -d ' ')
COMMAND_COUNT=$(find "$ROOT/commands" -name '*.md' -maxdepth 1 | wc -l | tr -d ' ')
WORKFLOW_COUNT=$(find "$ROOT/_workflows" -name '*.md' -maxdepth 1 ! -name 'README.md' | wc -l | tr -d ' ')

echo "Actual counts:"
echo "  Skills:    $SKILL_COUNT"
echo "  Commands:  $COMMAND_COUNT"
echo "  Workflows: $WORKFLOW_COUNT"
echo ""

# --- Use git grep + awk for efficient processing ---

# Exclusions: files where counts are historical or structural
EXCLUDES=(
  ':!CHANGELOG.md'
  ':!docs/releases/'
  ':!docs/internal/'
  ':!docs/changelog.md'
  ':!.github/issues-archive/'
  ':!.github/issues-drafts/'
  ':!.github/.created-issues.json'
  ':!.github/scripts/'
  ':!AGENTS/claude/CONTEXT.md'
  ':!AGENTS/claude/DECISIONS.md'
  ':!AGENTS/claude/SESSION-LOG/'
  ':!library/'
  ':!scripts/check-count-consistency.sh'
  ':!scripts/check-count-consistency.ps1'
  ':!scripts/check-count-consistency.md'
)

# --- Pre-compute count-exempt line ranges per file ---
#
# Files can mark sections as historical/exempt with HTML-comment markers:
#   <!-- count-exempt:start -->
#   ... historical content (e.g., What's New release entries) ...
#   <!-- count-exempt:end -->
#
# This is the canonical mechanism for "this section is historical, do not
# check counts here". Replaces the prior `v[0-9]+\.` substring exemption,
# which was too broad (skipped any line mentioning a version, even outside
# historical sections) and could not be audited.
#
# The marker file format is: <file><TAB><start_line><TAB><end_line>
EXEMPT_RANGES=$(mktemp)
trap 'rm -f "$EXEMPT_RANGES"' EXIT

git -C "$ROOT" grep -lE '<!-- count-exempt:start -->' -- '*.md' '*.json' "${EXCLUDES[@]}" 2>/dev/null | while read -r f; do
  awk -v file="$f" '
    /<!-- count-exempt:start -->/ { start = NR; next }
    /<!-- count-exempt:end -->/   { if (start) { print file "\t" start "\t" NR; start = 0 } }
  ' "$ROOT/$f"
done > "$EXEMPT_RANGES"

# Minimum threshold . counts below this are likely per-phase/per-category,
# not total counts. Comparison uses >= so values equal to the threshold are
# still checked, which matters as resource counts cross round-number boundaries.
MIN_THRESHOLD=10

check_resource() {
  local grep_pattern="$1"
  local resource_name="$2"
  local actual_count="$3"

  git -C "$ROOT" grep -inE "$grep_pattern" -- '*.md' '*.json' "${EXCLUDES[@]}" 2>/dev/null | \
    awk -F: -v actual="$actual_count" -v rname="$resource_name" -v min_t="$MIN_THRESHOLD" -v ranges_file="$EXEMPT_RANGES" '
    BEGIN {
      # Load count-exempt line ranges from the pre-computed table.
      # Format per row: <file>\t<start>\t<end>
      while ((getline line < ranges_file) > 0) {
        nf = split(line, parts, "\t")
        if (nf < 3) continue
        f = parts[1]
        idx = exempt_count[f]++
        exempt_start[f, idx] = parts[2] + 0
        exempt_end[f, idx]   = parts[3] + 0
      }
      close(ranges_file)
    }
    {
      file = $1
      linenum = $2 + 0
      # Reconstruct content (may contain colons)
      content = ""
      for (i = 3; i <= NF; i++) {
        content = content (i > 3 ? ":" : "") $i
      }

      # Skip lines inside count-exempt sections (canonical mechanism for
      # historical content like README "What'\''s New" release entries).
      if (file in exempt_count) {
        for (i = 0; i < exempt_count[file]; i++) {
          if (linenum >= exempt_start[file, i] && linenum <= exempt_end[file, i]) {
            next
          }
        }
      }

      # Extract numbers before the resource name.
      #
      # Subset-descriptor exclusions: phrases like "26 phase skills",
      # "8 foundation skills", "40 skill commands" describe SUBSETS of the
      # total, not total counts. The validator should not flag them as stale
      # because the number is meant to describe the subset (and is correct
      # for that subset). Without this exclusion, the prior regex
      # `[0-9]+ ([a-zA-Z][a-zA-Z-]*[ ]+){0,3}skills` would greedily match
      # subset phrases and force authors to either rephrase or carry the
      # broad version-prefix exemption that this script no longer uses.
      line = tolower(content)
      while (match(line, /[0-9]+/)) {
        num = substr(line, RSTART, RLENGTH) + 0
        rest = substr(line, RSTART + RLENGTH)
        is_subset = 0
        # Skip subset descriptors before the resource name.
        if (rname == "skills" && rest ~ /^[ ]+(phase|foundation|utility|domain|shipped|embedded|test|sample|library|lines? )/) is_subset = 1
        if (rname == "commands" && rest ~ /^[ ]+(skill|workflow)[ -]/) is_subset = 1
        matched = 0
        if (!is_subset && rname == "skills" && rest ~ /^[ ]+([a-zA-Z][a-zA-Z-]*[ ]+){0,3}skills/) matched = 1
        if (!is_subset && rname == "commands" && rest ~ /^[ ]+([a-zA-Z][a-zA-Z-]*[ ]+){0,3}commands/) matched = 1
        if (!is_subset && rname == "workflows" && rest ~ /^[ ]+([a-zA-Z][a-zA-Z-]*[ ]+){0,3}workflows/) matched = 1
        if (matched && num != actual && num >= min_t) {
          printf "  %s:%s: found \x27%d %s\x27 (actual: %d)\n", file, linenum, num, rname, actual
        }
        line = rest
      }
    }' || true
}

MISMATCHES=""
MISMATCHES+=$(check_resource '[0-9]+ ([a-zA-Z][a-zA-Z-]* ){0,3}skills' "skills" "$SKILL_COUNT")
MISMATCHES+=$(check_resource '[0-9]+ ([a-zA-Z][a-zA-Z-]* ){0,3}commands' "commands" "$COMMAND_COUNT")
MISMATCHES+=$(check_resource '[0-9]+ ([a-zA-Z][a-zA-Z-]* ){0,3}workflows' "workflows" "$WORKFLOW_COUNT")

if [[ -z "$MISMATCHES" ]]; then
  echo "PASS: No stale counts found in tracked .md or .json files."
  exit 0
else
  echo "Stale counts found:"
  echo ""
  echo "$MISMATCHES"
  echo ""
  echo "FAIL: One or more hardcoded counts are stale."
  exit 1
fi
