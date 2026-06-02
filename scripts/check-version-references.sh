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
  ':!site/src/content/docs/changelog.md'
  ':!site/src/content/docs/releases/'
  ':!docs/internal/release-plans/'
  ':!docs/internal/audit/_archived/'
  ':!docs/internal/audit/branches-pr_2026-05-03.md'
  ':!docs/internal/audit/audit_repo-structure_2026-05-01.md'
  ':!docs/internal/audit/ci-audit_2026-05-03.md'
  ':!docs/internal/efforts/'
  ':!docs/internal/milestones/'
  ':!docs/internal/multi-repo-*'
  ':!docs/internal/agent-component-usage_*'
  ':!docs/internal/skill-versioning.md'
  ':!docs/internal/cross-llm-review-protocol.md'
  ':!docs/internal/distribution/'
  ':!docs/internal/mkdocs/'
  ':!.github/issues-archive/'
  ':!.github/issues-drafts/'
  ':!.github/.created-issues.json'
  ':!.github/scripts/'
  ':!.claude-plugin/'
  ':!.claude/'
  ':(exclude)_agent-context/SESSION-LOG/'
  ':(exclude)_agent-context/claude/SESSION-LOG/'
  ':(exclude)_agent-context/codex/SESSION-LOG/'
  ':(exclude)_agent-context/claude/CONTEXT.md'
  ':(exclude)_agent-context/claude/DECISIONS.md'
  ':(exclude)_agent-context/claude/PLANNING/'
  ':(exclude)_agent-context/codex/CONTEXT.md'
  ':(exclude)_agent-context/codex/DECISIONS.md'
  ':(exclude)_agent-context/codex/_archived/'
  ':!library/'
  ':!skills/*/HISTORY.md'
  ':!scripts/check-version-references.sh'
  ':!scripts/check-version-references.ps1'
  ':!scripts/check-version-references.md'
)

# Find all version refs in non-excluded tracked files
RAW_MATCHES=$(git -C "$ROOT" grep -inE 'v[0-9]+\.[0-9]+\.[0-9]+' -- '*.md' '*.json' "${EXCLUDES[@]}" 2>/dev/null || true)

# Build exempt line-range table from HTML-comment markers. Honors BOTH
# count-exempt (already used by check-count-consistency to mark historical
# sections) AND version-exempt (a version-only exemption that does NOT suppress
# count checks). A flagged line inside any such range is treated as intentional
# historical provenance, not drift. Format per row: <file><TAB><start><TAB><end>
EXEMPT_RANGES="$(mktemp)"
trap 'rm -f "$EXEMPT_RANGES"' EXIT
_marker_files="$(git -C "$ROOT" grep -lE '<!-- (count|version)-exempt:start -->' -- '*.md' "${EXCLUDES[@]}" 2>/dev/null || true)"
if [[ -n "$_marker_files" ]]; then
  while IFS= read -r f; do
    [[ -z "$f" ]] && continue
    awk -v file="$f" '
      /<!-- (count|version)-exempt:start -->/ { start = NR; next }
      /<!-- (count|version)-exempt:end -->/   { if (start) { print file "\t" start "\t" NR; start = 0 } }
    ' "$ROOT/$f"
  done <<< "$_marker_files" >> "$EXEMPT_RANGES"
fi

is_exempt() {
  # args: <file> <lineno> ; return 0 if the line falls within an exempt range
  local ef="$1" eln="$2" rf rs re
  while IFS=$'\t' read -r rf rs re; do
    [[ -z "$rf" ]] && continue
    if [[ "$rf" == "$ef" && "$eln" -ge "$rs" && "$eln" -le "$re" ]]; then
      return 0
    fi
  done < "$EXEMPT_RANGES"
  return 1
}

# Filter for drift (any version ref on the line that isn't current)
DRIFT_LINES=""
DRIFT_COUNT=0
while IFS= read -r line; do
  [[ -z "$line" ]] && continue
  # Skip lines inside count-exempt / version-exempt ranges (historical provenance)
  _ef="${line%%:*}"; _rest="${line#*:}"; _eln="${_rest%%:*}"
  if is_exempt "$_ef" "$_eln"; then continue; fi
  # Extract version refs from the line CONTENT only (strip the file:lineno: prefix
  # so a version-like path segment, e.g. .../v2.18.0/..., is not miscounted as drift;
  # this also matches the .ps1, which scans content only).
  _content="${_rest#*:}"
  found_versions=$(printf '%s' "$_content" | grep -oE 'v[0-9]+\.[0-9]+\.[0-9]+' | sort -u)
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
# `|| true` guards against SIGPIPE (141) when head closes the pipe early under
# `set -e -o pipefail` (>50 drift lines), which would otherwise abort this
# advisory script before its exit-0 path.
echo "$DRIFT_LINES" | head -50 || true
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
  echo "WARN: $DRIFT_COUNT version reference drift line(s) found (advisory by design)."
  echo "  Most are legitimate provenance ('since vX.Y.Z'); confirm none is a stale current claim."
  echo "  Current-version CLAIM drift (README badge + At-a-Glance) is enforced by validate-version-consistency."
  exit 0
fi
