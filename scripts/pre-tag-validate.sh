#!/usr/bin/env bash
# pre-tag-validate.sh - Run every truly-enforcing validator before cutting a release tag.
#
# Codifies the feedback_pre-tag-validator-bundle.md memory rule (2026-05-16):
# before cutting a release tag, run EVERY truly-enforcing validator including
# count-consistency + generated-content-untouched + family validators with
# --strict, not just the 4-validator subset that "feels green."
#
# This script was added in v2.15.1 after the v2.15.0 release surfaced two
# post-tag CI gaps that bundled validation would have caught pre-tag.
#
# Exit codes:
#   0 - All validators pass
#   1 - One or more validators failed
#
# Usage:
#   ./scripts/pre-tag-validate.sh                # Run all validators
#   ./scripts/pre-tag-validate.sh --skip <name>  # Skip a named validator (use sparingly)

set -uo pipefail  # NOTE: intentionally NOT -e; we want every validator to run so the operator sees the full picture

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# ANSI codes (no color if not a tty)
if [ -t 1 ]; then
  GREEN='\033[0;32m'
  RED='\033[0;31m'
  YELLOW='\033[0;33m'
  BLUE='\033[0;34m'
  RESET='\033[0m'
else
  GREEN=''
  RED=''
  YELLOW=''
  BLUE=''
  RESET=''
fi

# Truly-enforcing validator inventory. Update when adding new enforcing validators.
# Each entry is "<display name>|<command>".
VALIDATORS=(
  "lint-skills-frontmatter|bash $ROOT/scripts/lint-skills-frontmatter.sh"
  "validate-agents-md|bash $ROOT/scripts/validate-agents-md.sh"
  "validate-commands|bash $ROOT/scripts/validate-commands.sh"
  "validate-meeting-skills-family|bash $ROOT/scripts/validate-meeting-skills-family.sh"
  "validate-foundation-sprint-skills-family --strict|bash $ROOT/scripts/validate-foundation-sprint-skills-family.sh --strict"
  "validate-design-sprint-skills-family --strict|bash $ROOT/scripts/validate-design-sprint-skills-family.sh --strict"
  "check-internal-link-validity --strict|bash $ROOT/scripts/check-internal-link-validity.sh --strict"
  "validate-docs-frontmatter --strict|bash $ROOT/scripts/validate-docs-frontmatter.sh --strict"
  "check-no-body-h1 --strict|bash $ROOT/scripts/check-no-body-h1.sh --strict"
  "check-count-consistency|bash $ROOT/scripts/check-count-consistency.sh"
  "check-generated-content-untouched|bash $ROOT/scripts/check-generated-content-untouched.sh"
)

# v2.15.1 additions (landing-page + generator coverage + AGENTS.md command-table sync).
# These run only if the script exists locally (graceful degradation for older trees).
OPTIONAL_VALIDATORS=(
  "check-landing-page-counts|bash $ROOT/scripts/check-landing-page-counts.sh"
  "check-workflow-generator-coverage|bash $ROOT/scripts/check-workflow-generator-coverage.sh"
  "check-agents-md-command-sync|bash $ROOT/scripts/check-agents-md-command-sync.sh"
  "check-context-currency|bash $ROOT/scripts/check-context-currency.sh"
)

# Parse --skip flag(s)
SKIPS=()
while [ $# -gt 0 ]; do
  case "$1" in
    --skip)
      SKIPS+=("$2")
      shift 2
      ;;
    -h|--help)
      echo "Usage: $0 [--skip <validator-name> ...]"
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 2
      ;;
  esac
done

skipped() {
  local name="$1"
  for s in "${SKIPS[@]:-}"; do
    if [ "$s" = "$name" ]; then
      return 0
    fi
  done
  return 1
}

run_validator() {
  local entry="$1"
  local optional="${2:-required}"
  local name="${entry%%|*}"
  local cmd="${entry#*|}"
  local script_file
  # Extract the script path: take the second token of the command
  script_file=$(echo "$cmd" | awk '{print $2}')

  if [ "$optional" = "optional" ] && [ ! -f "$script_file" ]; then
    printf "${YELLOW}SKIP${RESET} (optional, not present): %s\n" "$name"
    return 0
  fi

  if skipped "$name"; then
    printf "${YELLOW}SKIP${RESET} (--skip flag): %s\n" "$name"
    return 0
  fi

  printf "${BLUE}RUN${RESET}  %s ... " "$name"
  local output
  if output=$(eval "$cmd" 2>&1); then
    printf "${GREEN}PASS${RESET}\n"
    return 0
  else
    printf "${RED}FAIL${RESET}\n"
    echo "$output" | sed 's/^/    /'
    return 1
  fi
}

echo "=== pm-skills pre-tag validator bundle ==="
echo ""
echo "Running the full enforcing-validator suite. Every validator that"
echo "fails CI on a release-tag PR is invoked here with the same flags."
echo ""

FAIL=0

for v in "${VALIDATORS[@]}"; do
  run_validator "$v" required || FAIL=1
done

echo ""
echo "--- v2.15.1+ preventive validators ---"
for v in "${OPTIONAL_VALIDATORS[@]}"; do
  run_validator "$v" optional || FAIL=1
done

echo ""
if [ "$FAIL" -eq 0 ]; then
  printf "${GREEN}=== ALL CHECKS PASSED ===${RESET}\n"
  echo "Safe to cut the release tag."
  exit 0
else
  printf "${RED}=== ONE OR MORE CHECKS FAILED ===${RESET}\n"
  echo "Do NOT cut the release tag until every failure is resolved."
  exit 1
fi
