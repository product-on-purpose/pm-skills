#!/usr/bin/env bash
# check-workflow-coverage.sh . Verify every workflow file has matching entries
# across the repo (docs page, AGENTS.md). Starlight autogenerate covers
# nav inclusion for docs/workflows/{slug}.md structurally; the previous
# mkdocs.yml entry check was retired in W12 (Material deprecation).
#
# Exit codes:
#   0 . All workflows are fully covered
#   1 . One or more workflows are missing entries
#
# Usage:
#   ./scripts/check-workflow-coverage.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

FAIL=0

echo "=== Workflow Coverage Check ==="
echo ""

# Collect workflow slugs (exclude README.md and files starting with _)
SLUGS=()
for f in "$ROOT"/_workflows/*.md; do
  [[ -f "$f" ]] || continue
  base="$(basename "$f")"
  [[ "$base" == "README.md" ]] && continue
  [[ "$base" == _* ]] && continue
  SLUGS+=("${base%.md}")
done

if [[ ${#SLUGS[@]} -eq 0 ]]; then
  echo "✗ No workflow files found in _workflows/"
  exit 1
fi

echo "Found ${#SLUGS[@]} workflow(s) in _workflows/"
echo ""

AGENTS="$ROOT/AGENTS.md"

for slug in "${SLUGS[@]}"; do
  # 1. Check docs/workflows/{slug}.md exists
  if [[ ! -f "$ROOT/docs/workflows/${slug}.md" ]]; then
    echo "✗ Missing generated page: docs/workflows/${slug}.md"
    FAIL=1
  fi

  # 2. Check AGENTS.md contains a reference to the workflow name
  if [[ -f "$AGENTS" ]]; then
    if ! grep -qi "$slug" "$AGENTS"; then
      echo "✗ AGENTS.md: no entry containing '$slug'"
      FAIL=1
    fi
  else
    echo "✗ AGENTS.md not found"
    FAIL=1
  fi

done

# Advisory: check for workflow commands (not required)
echo ""
echo "--- Advisory: Workflow command coverage ---"
for slug in "${SLUGS[@]}"; do
  cmd_file="$ROOT/commands/workflow-${slug}.md"
  if [[ -f "$cmd_file" ]]; then
    echo "  ✓ commands/workflow-${slug}.md"
  else
    echo "  · commands/workflow-${slug}.md (not found . optional)"
  fi
done

echo ""
if [[ $FAIL -eq 0 ]]; then
  echo "PASS: All ${#SLUGS[@]} workflows have full coverage."
else
  echo "FAIL: One or more workflows are missing entries."
fi

exit "$FAIL"
