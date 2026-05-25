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

# Non-git fallback: the stale-count scan below relies on `git grep` over tracked
# files. In a non-git working tree (e.g. the unpacked plugin install cache on
# macOS), git is unavailable and `git grep` would exit 128 and abort under
# `set -euo pipefail`. Skip the scan with a NOTICE rather than hard-failing.
# Count drift only matters in the authoring/release context, which is always a
# git work tree (CI + pre-tag), so this check is a no-op outside it.
if ! git -C "$ROOT" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "[NOTICE] not a git work tree; the stale-count scan requires git and is skipped here."
  echo "[NOTICE] count-consistency is enforced in the git-based CI + pre-tag context."
  exit 0
fi

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
  ':(exclude)_agent-context/claude/CONTEXT.md'
  ':(exclude)_agent-context/claude/DECISIONS.md'
  ':(exclude)_agent-context/SESSION-LOG/'
  ':(exclude)_agent-context/claude/SESSION-LOG/'
  ':(exclude)_agent-context/codex/SESSION-LOG/'
  ':!library/'
  ':!skills/utility-pm-skill-auditor/references/'
  ':!docs/skills/utility/utility-pm-skill-auditor.md'
  ':!scripts/check-count-consistency.sh'
  ':!scripts/check-count-consistency.ps1'
  ':!scripts/check-count-consistency.md'
)

# --- Pre-compute count-exempt line ranges per file ---
#
# Files can mark sections as historical/exempt with comment markers. Two
# comment styles are recognized so the same mechanism works in Markdown and
# MDX (Astro rejects HTML comments in .mdx, so .mdx files use the JSX form):
#   .md  : <!-- count-exempt:start --> ... <!-- count-exempt:end -->
#   .mdx : {/* count-exempt:start */} ... {/* count-exempt:end */}
# Detection matches the bare `count-exempt:start`/`count-exempt:end` token, so
# either wrapper works; prose mentions live only in excluded files (CHANGELOG,
# docs/releases, docs/internal).
#
# This is the canonical mechanism for "this section is historical, do not
# check counts here". Replaces the prior `v[0-9]+\.` substring exemption,
# which was too broad (skipped any line mentioning a version, even outside
# historical sections) and could not be audited.
#
# The marker file format is: <file><TAB><start_line><TAB><end_line>
EXEMPT_RANGES=$(mktemp)
trap 'rm -f "$EXEMPT_RANGES"' EXIT

git -C "$ROOT" grep -lE 'count-exempt:start' -- '*.md' '*.mdx' '*.json' "${EXCLUDES[@]}" 2>/dev/null | while read -r f; do
  awk -v file="$f" '
    /count-exempt:start/ { start = NR; next }
    /count-exempt:end/   { if (start) { print file "\t" start "\t" NR; start = 0 } }
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

  git -C "$ROOT" grep -inE "$grep_pattern" -- '*.md' '*.mdx' '*.json' "${EXCLUDES[@]}" 2>/dev/null | \
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
        if (rname == "skills" && rest ~ /^[ ]+(phase|foundation|utility|tool|domain|shipped|embedded|test|sample|library|lines? )/) is_subset = 1
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

# Badge counts (FU-5). shields.io encodes the total skill count as
# 'badge/skills-<N>' - the number comes AFTER the resource word, so the prose
# 'N skills' pattern above misses it. Likewise the README At-a-Glance table is
# phrased '63 skills (...)' so the prose pattern covers it. This dedicated scan
# closes the badge surface; it honors the same exempt ranges.
check_badge() {
  local actual_count="$1"
  git -C "$ROOT" grep -inE 'badge/skills-[0-9]+' -- '*.md' '*.mdx' '*.json' "${EXCLUDES[@]}" 2>/dev/null | \
    awk -F: -v actual="$actual_count" -v ranges_file="$EXEMPT_RANGES" '
    BEGIN {
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
      content = ""
      for (i = 3; i <= NF; i++) content = content (i > 3 ? ":" : "") $i
      if (file in exempt_count) {
        for (i = 0; i < exempt_count[file]; i++) {
          if (linenum >= exempt_start[file, i] && linenum <= exempt_end[file, i]) next
        }
      }
      s = content
      while (match(s, /badge\/skills-[0-9]+/)) {
        tok = substr(s, RSTART, RLENGTH)
        sub(/badge\/skills-/, "", tok)
        num = tok + 0
        if (num != actual) {
          printf "  %s:%s: found badge \x27skills-%d\x27 (actual: %d)\n", file, linenum, num, actual
        }
        s = substr(s, RSTART + RLENGTH)
      }
    }' || true
}

# Number-AFTER-resource coverage (v2.20.0). check_resource above matches only
# "N <resource>" (number BEFORE the word). Facts-table rows ("| Slash commands |
# 73 |", "| Skills | 63 |") and parenthetical forms ("Commands (73)") put the
# number AFTER the resource word and were previously unvalidated - which let stale
# totals slip into docs/reference/ecosystem.md (Skills 40, Commands 62) and
# docs/reference/runtime-components.md (Commands 66). Historical surfaces are
# excluded via $EXCLUDES; count-exempt ranges are honored. Subset rows like
# "| Phase skills | 30 |" do not match (the label cell must be the bare resource).
check_count_suffix() {
  git -C "$ROOT" grep -inE '(\| *\*{0,2}(slash )?(skills?|commands?|workflows?)\*{0,2} *\| *[0-9]+|(skills?|commands?|workflows?) \([0-9]+\))' -- '*.md' '*.mdx' "${EXCLUDES[@]}" 2>/dev/null | \
    awk -F: -v sc="$SKILL_COUNT" -v cc="$COMMAND_COUNT" -v wc="$WORKFLOW_COUNT" -v min_t="$MIN_THRESHOLD" -v ranges_file="$EXEMPT_RANGES" '
    BEGIN {
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
      content = ""
      for (i = 3; i <= NF; i++) content = content (i > 3 ? ":" : "") $i
      if (file in exempt_count) {
        for (i = 0; i < exempt_count[file]; i++) {
          if (linenum >= exempt_start[file, i] && linenum <= exempt_end[file, i]) next
        }
      }
      line = tolower(content)
      # Form 1: facts-table row "| <resource> | N |"
      if (match(line, /\| *\*{0,2}(slash )?(skill|command|workflow)s?\*{0,2} *\| *[0-9]+/)) {
        seg = substr(line, RSTART, RLENGTH)
        r = (seg ~ /command/) ? "commands" : (seg ~ /workflow/) ? "workflows" : "skills"
        n = seg; num = -1
        while (match(n, /[0-9]+/)) { num = substr(n, RSTART, RLENGTH) + 0; n = substr(n, RSTART + RLENGTH) }
        actual = (r == "commands") ? cc : (r == "workflows") ? wc : sc
        if (num != actual && num >= min_t) printf "  %s:%s: found table \x27%s = %d\x27 (actual: %d)\n", file, linenum, r, num, actual
      }
      # Form 2: parenthetical "<resource> (N)"
      ls = line
      while (match(ls, /([a-z][a-z-]* )?(skill|command|workflow)s? \([0-9]+\)/)) {
        seg = substr(ls, RSTART, RLENGTH)
        r = (seg ~ /command/) ? "commands" : (seg ~ /workflow/) ? "workflows" : "skills"
        # Subset-descriptor exclusion (mirrors check_resource): "phase skills (30)",
        # "domain skills (26)", "skill commands (60)" describe SUBSETS, not the total.
        is_subset = 0
        if (r == "skills" && seg ~ /^(phase|foundation|utility|tool|domain|shipped|embedded|test|sample|library) /) is_subset = 1
        if (r == "commands" && seg ~ /^(skill|workflow) /) is_subset = 1
        if (!is_subset) {
          match(seg, /[0-9]+/); num = substr(seg, RSTART, RLENGTH) + 0
          actual = (r == "commands") ? cc : (r == "workflows") ? wc : sc
          if (num != actual && num >= min_t) printf "  %s:%s: found \x27%s (%d)\x27 (actual: %d)\n", file, linenum, r, num, actual
        }
        ls = substr(ls, RSTART + RLENGTH)
      }
    }' || true
}

MISMATCHES=""
MISMATCHES+=$(check_resource '[0-9]+ ([a-zA-Z][a-zA-Z-]* ){0,3}skills' "skills" "$SKILL_COUNT")
MISMATCHES+=$(check_resource '[0-9]+ ([a-zA-Z][a-zA-Z-]* ){0,3}commands' "commands" "$COMMAND_COUNT")
MISMATCHES+=$(check_resource '[0-9]+ ([a-zA-Z][a-zA-Z-]* ){0,3}workflows' "workflows" "$WORKFLOW_COUNT")
MISMATCHES+=$(check_badge "$SKILL_COUNT")
MISMATCHES+=$(check_count_suffix)

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
