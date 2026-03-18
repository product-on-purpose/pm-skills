#!/usr/bin/env bash
# Check that all AGENTS/*/CONTEXT.md files reference the current CHANGELOG version.
# Exits 1 if any file is stale; 0 if all are current.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FAIL=0

# Extract latest release version from CHANGELOG.md (first ## [X.Y.Z] heading, skips [Unreleased])
changelog_raw=$(grep -oE '## \[[0-9]+\.[0-9]+\.[0-9]+\]' "$ROOT/CHANGELOG.md" | head -1 || true)
if [[ -z "$changelog_raw" ]]; then
  echo "✗ Could not extract a release version from CHANGELOG.md"
  exit 1
fi
changelog_version="v$(echo "$changelog_raw" | grep -oE '[0-9]+\.[0-9]+\.[0-9]+')"

# Check each AGENTS/*/CONTEXT.md
found_any=0
for ctx in "$ROOT"/AGENTS/*/CONTEXT.md; do
  [[ -f "$ctx" ]] || continue
  found_any=1
  rel="${ctx#$ROOT/}"

  # Take the first vX.Y.Z reference in the file as the declared version
  ctx_version=$(grep -oE 'v[0-9]+\.[0-9]+\.[0-9]+' "$ctx" | head -1 || true)
  if [[ -z "$ctx_version" ]]; then
    echo "✗ $rel : no version reference found"
    FAIL=1
    continue
  fi

  if [[ "$ctx_version" != "$changelog_version" ]]; then
    echo "✗ $rel : shows $ctx_version but CHANGELOG is at $changelog_version"
    FAIL=1
  else
    echo "✓ $rel : $ctx_version"
  fi
done

if [[ $found_any -eq 0 ]]; then
  echo "✗ No AGENTS/*/CONTEXT.md files found"
  exit 1
fi

if [[ $FAIL -eq 0 ]]; then
  echo "✓ All CONTEXT.md files are current ($changelog_version)"
fi

exit "$FAIL"
