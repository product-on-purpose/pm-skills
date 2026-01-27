#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FAIL=0

for cmd in "$ROOT"/commands/*.md; do
  name="$(basename "$cmd")"
  # Grab the first skills/.../SKILL.md path in the command file
  path="$(grep -oE 'skills/[a-z0-9-]+/SKILL.md' "$cmd" | head -n1 || true)"
  if [[ -z "$path" ]]; then
    echo "✗ $name : no skill path found"
    FAIL=1
    continue
  fi
  skildir="$ROOT/$(dirname "$path")"
  if [[ ! -f "$ROOT/$path" ]]; then
    echo "✗ $name : referenced SKILL missing ($path)"
    FAIL=1
    continue
  fi
  # Validate references/ files exist
  for ref in TEMPLATE.md EXAMPLE.md; do
    if [[ ! -f "$skildir/references/$ref" ]]; then
      echo "✗ $name : missing $ref in $skildir/references/"
      FAIL=1
    fi
  done
  echo "✓ $name -> $path"
done

exit "$FAIL"
