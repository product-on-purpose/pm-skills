#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FAIL=0

for cmd in "$ROOT"/commands/*.md; do
  name="$(basename "$cmd")"
  mapfile -t paths < <(grep -oE 'skills/[a-z0-9-]+/SKILL.md' "$cmd" || true)
  if [[ "${#paths[@]}" -eq 0 ]]; then
    echo "✗ $name : no skill path found"
    FAIL=1
    continue
  fi

  checked_all=1
  for path in "${paths[@]}"; do
    skildir="$ROOT/$(dirname "$path")"
    if [[ ! -f "$ROOT/$path" ]]; then
      echo "✗ $name : referenced SKILL missing ($path)"
      FAIL=1
      checked_all=0
      continue
    fi
    for ref in TEMPLATE.md EXAMPLE.md; do
      if [[ ! -f "$skildir/references/$ref" ]]; then
        echo "✗ $name : missing $ref in $skildir/references/"
        FAIL=1
        checked_all=0
      fi
    done
  done

  if [[ $checked_all -eq 1 ]]; then
    suffix=""
    if [[ ${#paths[@]} -gt 1 ]]; then
      suffix=" (multiple skill references; checked ${#paths[@]})"
    fi
    echo "✓ $name -> ${paths[0]}${suffix}"
  fi
done

exit "$FAIL"
