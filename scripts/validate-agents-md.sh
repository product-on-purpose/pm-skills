#!/usr/bin/env bash
# Validate that AGENTS.md skill paths stay in sync with skills/*/SKILL.md.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
AGENTS="$ROOT/AGENTS.md"
FAIL=0

if [[ ! -f "$AGENTS" ]]; then
  echo "✗ AGENTS.md : file not found"
  exit 1
fi

skill_paths=()
for dir in "$ROOT"/skills/*; do
  [[ -d "$dir" ]] || continue
  skill_paths+=("skills/$(basename "$dir")/SKILL.md")
done

if [[ ${#skill_paths[@]} -eq 0 ]]; then
  echo "✗ skills/ : no skill directories found"
  exit 1
fi

mapfile -t skill_paths < <(printf '%s\n' "${skill_paths[@]}" | sort -u)
mapfile -t agents_paths < <(grep -oE 'skills/[a-z0-9-]+/SKILL\.md' "$AGENTS" | sort -u)
mapfile -t duplicate_paths < <(grep -oE 'skills/[a-z0-9-]+/SKILL\.md' "$AGENTS" | sort | uniq -d)

if [[ ${#agents_paths[@]} -eq 0 ]]; then
  echo "✗ AGENTS.md : no skill paths found"
  exit 1
fi

for path in "${skill_paths[@]}"; do
  if ! printf '%s\n' "${agents_paths[@]}" | grep -Fxq "$path"; then
    echo "✗ AGENTS.md : missing entry for $path"
    FAIL=1
  fi
done

for path in "${agents_paths[@]}"; do
  if [[ ! -f "$ROOT/$path" ]]; then
    echo "✗ AGENTS.md : orphan entry $path"
    FAIL=1
  fi
done

for path in "${duplicate_paths[@]}"; do
  echo "✗ AGENTS.md : duplicate entry $path"
  FAIL=1
done

if [[ $FAIL -eq 0 ]]; then
  echo "✓ AGENTS.md matches ${#skill_paths[@]} skill paths"
fi

exit "$FAIL"
