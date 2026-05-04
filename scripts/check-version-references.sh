#!/usr/bin/env bash
# check-version-references.sh - Catch hardcoded version drift in tracked files.
#
# Reads current version from .claude-plugin/plugin.json and scans tracked .md
# and .json files for vX.Y.Z patterns. Reports refs that drift from current.
# Excludes paths where historical version refs are expected (CHANGELOG,
# release notes, plan archives, session logs, etc.).
#
# Posture: advisory in v2.13.0. Promote to enforcing in v2.14.0+ once stable.
#
# Exit codes:
#   0 - No drift OR advisory mode (default; reports drift but doesn't fail)
#   1 - Drift found AND --strict was passed
#
# Usage:
#   ./scripts/check-version-references.sh
#   ./scripts/check-version-references.sh --strict

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

STRICT=false
if [[ "${1:-}" == "--strict" ]]; then
  STRICT=true
fi

# Read current version from plugin.json (single source of truth)
PLUGIN_FILE="$ROOT/.claude-plugin/plugin.json"
if [[ ! -f "$PLUGIN_FILE" ]]; then
  echo "FAIL: $PLUGIN_FILE not found"
  exit 1
fi

# Extract version via grep+sed (no Node dependency, no Windows path-translation issues)
CURRENT_VERSION=$(grep -m1 '"version"' "$PLUGIN_FILE" | sed -E 's/.*"version"[[:space:]]*:[[:space:]]*"([^"]+)".*/\1/')
if [[ -z "$CURRENT_VERSION" ]]; then
  echo "FAIL: could not read current version from $PLUGIN_FILE"
  exit 1
fi

echo "=== Version Reference Drift Check ==="
echo ""
echo "Current version (from .claude-plugin/plugin.json): $CURRENT_VERSION"
echo ""

# Paths where historical version refs are expected and correct
EXCLUDES=(
  ':!CHANGELOG.md'
  ':!docs/changelog.md'
  ':!docs/releases/'
  ':!docs/internal/release-plans/'
  ':!docs/internal/audit/_archived/'
  ':!docs/internal/audit/branches-pr_2026-05-03.md'
  ':!docs/internal/audit/audit_repo-structure_2026-05-01.md'
  ':!docs/internal/audit/ci-audit_2026-05-03.md'
  ':!docs/internal/efforts/'
  ':!docs/internal/milestones/'
  ':!docs/internal/multi-repo-extraction-design_2026-04-19.md'
  ':!docs/internal/multi-repo-patterns-reference_2026-04-19.md'
  ':!docs/internal/agent-component-usage_2026-04-18.md'
  ':!docs/internal/skill-versioning.md'
  ':!docs/internal/cross-llm-review-protocol.md'
  ':!docs/internal/distribution/'
  ':!docs/internal/mkdocs/'
  ':!.github/issues-archive/'
  ':!.github/issues-drafts/'
  ':!.github/.created-issues.json'
  ':!.github/scripts/'
  ':!AGENTS/claude/SESSION-LOG/'
  ':!AGENTS/codex/SESSION-LOG/'
  ':!AGENTS/claude/CONTEXT.md'
  ':!AGENTS/claude/DECISIONS.md'
  ':!AGENTS/claude/PLANNING/'
  ':!AGENTS/codex/CONTEXT.md'
  ':!AGENTS/codex/DECISIONS.md'
  ':!library/'
  ':!skills/*/HISTORY.md'
  ':!scripts/check-version-references.sh'
  ':!scripts/check-version-references.ps1'
  ':!scripts/check-version-references.md'
)

# Find all version refs in non-excluded tracked files
RAW_MATCHES=$(git -C "$ROOT" grep -inE 'v[0-9]+\.[0-9]+\.[0-9]+' -- '*.md' '*.json' "${EXCLUDES[@]}" 2>/dev/null || true)

# Filter for drift (any version ref on the line that isn't current)
DRIFT_LINES=""
DRIFT_COUNT=0
while IFS= read -r line; do
  [[ -z "$line" ]] && continue
  # Extract version refs from the line content portion
  found_versions=$(echo "$line" | grep -oE 'v[0-9]+\.[0-9]+\.[0-9]+' | sort -u)
  has_drift=false
  while IFS= read -r ver; do
    [[ -z "$ver" ]] && continue
    if [[ "${ver#v}" != "$CURRENT_VERSION" ]]; then
      has_drift=true
      break
    fi
  done <<< "$found_versions"

  if [[ "$has_drift" == "true" ]]; then
    DRIFT_LINES+="$line"$'\n'
    DRIFT_COUNT=$((DRIFT_COUNT + 1))
  fi
done <<< "$RAW_MATCHES"

if [[ $DRIFT_COUNT -eq 0 ]]; then
  echo "PASS: All non-excluded version references match current $CURRENT_VERSION."
  exit 0
fi

echo "Found $DRIFT_COUNT line(s) with version reference drift:"
echo ""
# Limit output to first 50 lines to avoid wall-of-text
echo "$DRIFT_LINES" | head -50
TRUNCATED=$(echo "$DRIFT_LINES" | tail -n +51 | grep -c . || true)
if [[ $TRUNCATED -gt 0 ]]; then
  echo ""
  echo "  ... and $TRUNCATED more line(s) (run with --strict locally to see full output)"
fi
echo ""

if [[ "$STRICT" == "true" ]]; then
  echo "FAIL (--strict): $DRIFT_COUNT version reference drift line(s) found."
  exit 1
else
  echo "WARN: $DRIFT_COUNT version reference drift line(s) found (advisory mode)."
  echo "  Triage: confirm each is intentional historical reference, OR update to current."
  echo "  Promote to enforcing (--strict in CI) in v2.14.0+ after one clean cycle."
  exit 0
fi
