#!/usr/bin/env bash
# check-landing-page-counts.sh - Validate that landing-page count claims match filesystem.
#
# v2.15.1 addition closing audit finding A01 + A02 from v2.15.x audit.
# The v2.15.0 release surfaced that docs/index.mdx homepage and docs/skills/index.md
# claimed "40 skills" while the actual count was 55, because the existing
# check-count-consistency.sh regex did not match descriptive phrases like
# "40 AI agent skills" or table totals that did not equal the headline.
#
# This validator asserts a stronger contract: every landing page's count claim
# must match the actual filesystem count of the resource it claims.
#
# Exit codes:
#   0 - All landing-page counts are accurate
#   1 - One or more landing pages have stale counts
#
# Usage:
#   ./scripts/check-landing-page-counts.sh [--strict]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

STRICT="false"
if [ "${1:-}" = "--strict" ]; then
  STRICT="true"
fi

# --- Source-of-truth counts ---

SKILL_COUNT=$(find "$ROOT/skills" -mindepth 1 -maxdepth 1 -type d | wc -l | tr -d ' ')
COMMAND_COUNT=$(find "$ROOT/commands" -name '*.md' -maxdepth 1 -type f | wc -l | tr -d ' ')
WORKFLOW_COUNT=$(find "$ROOT/_workflows" -name '*.md' -maxdepth 1 -type f ! -name 'README.md' | wc -l | tr -d ' ')

echo "=== Landing Page Count Check ==="
echo ""
echo "Source-of-truth counts:"
echo "  Skills:    $SKILL_COUNT"
echo "  Commands:  $COMMAND_COUNT"
echo "  Workflows: $WORKFLOW_COUNT"
echo ""

FAIL=0
FAIL_DETAILS=()

# --- Landing pages and expected resource ---
# Each entry: "file|expected-count|description-pattern"
# The description-pattern is grepped for; if it matches but doesn't include the
# expected count, the validator fails.

check_landing_page() {
  local file="$1"
  local expected="$2"
  local resource="$3"  # "skills" or "workflows" or "commands"
  local label="$4"

  if [ ! -f "$file" ]; then
    echo "  SKIP: $file (not present)"
    return 0
  fi

  # Look for claims of the form "<N> <resource>", "<N>-skill", "<N> AI agent skills",
  # "<N> production-ready skills", etc. The pattern allows 0-4 tokens between
  # the number and the resource word. Stops at sentence boundaries.
  local found
  found=$(grep -oE "\b[0-9]+\b[[:space:]]+([[:alpha:]][[:alnum:]-]*[[:space:]]+){0,4}${resource}\b" "$file" 2>/dev/null | \
    grep -oE "^[0-9]+" | sort -u || true)

  # Also catch <N>-skill / <N>-command / <N>-workflow hyphenated forms
  local found_hyphen
  found_hyphen=$(grep -oE "\b[0-9]+-${resource%s}\b" "$file" 2>/dev/null | \
    grep -oE "^[0-9]+" | sort -u || true)

  local all_found
  all_found=$(printf "%s\n%s\n" "$found" "$found_hyphen" | sort -u | grep -v '^$' || true)

  if [ -z "$all_found" ]; then
    echo "  INFO: $label ($file) - no count claim detected for '$resource'"
    return 0
  fi

  # Check whether all found counts equal the expected
  local stale_counts=""
  while IFS= read -r n; do
    if [ -n "$n" ] && [ "$n" -ne "$expected" ]; then
      stale_counts="$stale_counts $n"
    fi
  done <<< "$all_found"

  if [ -n "$stale_counts" ]; then
    # Some counts may be legitimate historical references. We allow this if
    # the file also contains the expected count somewhere. If the expected
    # count is ALSO present, treat the stale numbers as historical context.
    if grep -qE "\b${expected}\b" "$file"; then
      echo "  OK:   $label ($file) - claims expected $expected${stale_counts} (other counts are historical context)"
      return 0
    else
      echo "  FAIL: $label ($file) - claims${stale_counts} but actual is $expected; no $expected anywhere in file"
      FAIL=1
      FAIL_DETAILS+=("$file claims stale count(s)${stale_counts}; expected $expected")
      # Return 0: the script runs under set -e, so a non-zero return from a
      # bare top-level call would abort before the remaining checks and the
      # summary. $FAIL carries the failure to the exit-code decision.
      return 0
    fi
  else
    echo "  OK:   $label ($file) - all count claims match $expected"
    return 0
  fi
}

# --- Per-family checks on the docs homepage (WS-A1, v2.26.0) ---
#
# The homepage CardGrid claims a per-family count in every card title
# ("Discover (5 skills)", "Utility (11 skills)", ...) and the cross-cutting
# prose list claims three more ("**Foundation (9)**", "**Utility (11)**",
# "**Workshop tools (15)**"). Those lines live inside or beside a count-exempt
# block because check-count-consistency would misread the subset numbers as
# stale totals. The 2026-06-09 audit found that carve-out had let the cards rot
# (Foundation 8 vs 9, Utility 10 vs 11, cards summing 63 under a 65 headline).
# These checks make the per-family numbers enforced: every parsed claim must
# match the filesystem, the card counts must sum to the catalog total, and a
# parse miss (zero cards, missing prose pattern) is itself a FAIL so a markup
# rewrite cannot silently disable the check. If you restructure the homepage,
# update these patterns in the same change.

family_skill_count() {
  find "$ROOT/skills" -mindepth 1 -maxdepth 1 -type d -name "$1-*" | wc -l | tr -d ' '
}

check_homepage_cards() {
  local file="$ROOT/site/src/content/docs/index.mdx"
  local label="Homepage cards"

  if [ ! -f "$file" ]; then
    echo "  SKIP: $file (not present)"
    return 0
  fi

  local card_lines
  card_lines=$(grep -oE '<Card title="[A-Za-z]+ \([0-9]+ skills?\)"' "$file" || true)

  if [ -z "$card_lines" ]; then
    echo "  FAIL: $label - no '<Card title=\"Family (N skills)\">' patterns parsed; homepage markup changed?"
    FAIL=1
    FAIL_DETAILS+=("$file: per-card check parsed zero cards; update check-landing-page-counts alongside the markup")
    return 0
  fi

  local sum=0
  local family n prefix actual
  while IFS= read -r card; do
    family=$(printf '%s' "$card" | sed -E 's/<Card title="([A-Za-z]+) \([0-9]+ skills?\)"/\1/')
    n=$(printf '%s' "$card" | grep -oE '\([0-9]+' | tr -d '(')
    prefix=$(printf '%s' "$family" | tr '[:upper:]' '[:lower:]')
    actual=$(family_skill_count "$prefix")
    sum=$((sum + n))
    if [ "$actual" -eq 0 ]; then
      echo "  FAIL: $label - card family '$family' matches no skills/${prefix}-* directories"
      FAIL=1
      FAIL_DETAILS+=("$file: card family '$family' has no matching skill directories")
    elif [ "$n" -ne "$actual" ]; then
      echo "  FAIL: $label - '$family ($n skills)' but skills/${prefix}-* has $actual"
      FAIL=1
      FAIL_DETAILS+=("$file: card '$family' claims $n; actual $actual")
    else
      echo "  OK:   $label - $family ($n skills) matches filesystem"
    fi
  done <<< "$card_lines"

  if [ "$sum" -ne "$SKILL_COUNT" ]; then
    echo "  FAIL: $label - cards sum to $sum but the catalog has $SKILL_COUNT skills (missing or extra card?)"
    FAIL=1
    FAIL_DETAILS+=("$file: card sum $sum != catalog total $SKILL_COUNT")
  else
    echo "  OK:   $label - cards sum to catalog total $SKILL_COUNT"
  fi
}

check_homepage_prose_family() {
  local display="$1"   # bold prose label, e.g. "Workshop tools"
  local prefix="$2"    # skills/ directory prefix, e.g. "tool"
  local file="$ROOT/site/src/content/docs/index.mdx"
  local label="Homepage family prose"

  if [ ! -f "$file" ]; then
    echo "  SKIP: $file (not present)"
    return 0
  fi

  local claim
  claim=$(grep -oE "\*\*${display} \([0-9]+\)\*\*" "$file" | grep -oE '[0-9]+' | head -1 || true)

  if [ -z "$claim" ]; then
    echo "  FAIL: $label - pattern '**${display} (N)**' not found; homepage prose changed?"
    FAIL=1
    FAIL_DETAILS+=("$file: prose family '$display' not parsed; update check-landing-page-counts alongside the prose")
    return 0
  fi

  local actual
  actual=$(family_skill_count "$prefix")
  if [ "$claim" -ne "$actual" ]; then
    echo "  FAIL: $label - '**${display} ($claim)**' but skills/${prefix}-* has $actual"
    FAIL=1
    FAIL_DETAILS+=("$file: prose '$display' claims $claim; actual $actual")
  else
    echo "  OK:   $label - $display ($claim) matches filesystem"
  fi
}

echo "Checking landing pages:"
check_landing_page "$ROOT/site/src/content/docs/index.mdx" "$SKILL_COUNT" "skills" "Docs site homepage"
check_landing_page "$ROOT/site/src/content/docs/skills/index.md" "$SKILL_COUNT" "skills" "Skills landing page"
check_landing_page "$ROOT/site/src/content/docs/workflows/index.md" "$WORKFLOW_COUNT" "workflows" "Workflows landing page"
check_landing_page "$ROOT/library/skill-output-samples/README_SAMPLES.md" "$SKILL_COUNT" "skills" "Samples library README"

echo ""
echo "Checking homepage per-family counts:"
check_homepage_cards
check_homepage_prose_family "Foundation" "foundation"
check_homepage_prose_family "Utility" "utility"
check_homepage_prose_family "Workshop tools" "tool"

echo ""

if [ "$FAIL" -eq 0 ]; then
  echo "PASS: All landing-page count claims match filesystem."
  exit 0
else
  echo "FAIL: Stale landing-page counts detected:"
  for d in "${FAIL_DETAILS[@]}"; do
    echo "  - $d"
  done
  if [ "$STRICT" = "true" ]; then
    exit 1
  fi
  echo ""
  echo "(non-strict mode: exiting 0; use --strict in CI)"
  exit 0
fi
