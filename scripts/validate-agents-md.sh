#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
AGENTS="$ROOT/AGENTS.md"
FAIL=0

if [[ ! -f "$AGENTS" ]]; then
  echo "FAIL: AGENTS.md not found"
  exit 1
fi

skill_paths=()
for dir in "$ROOT"/skills/*; do
  [[ -d "$dir" ]] || continue
  skill_paths+=("skills/$(basename "$dir")/SKILL.md")
done

if [[ ${#skill_paths[@]} -eq 0 ]]; then
  echo "FAIL: skills/ has no entries"
  exit 1
fi

# bash 3.2 compatible (mapfile/readarray are bash 4+; macOS default bash is 3.2)
_sorted=()
while IFS= read -r _line; do _sorted+=("$_line"); done < <(printf '%s\n' "${skill_paths[@]}" | sort -u)
skill_paths=("${_sorted[@]}")
agents_paths=()
while IFS= read -r _line; do agents_paths+=("$_line"); done < <(grep -oE 'skills/[a-z0-9-]+/SKILL\.md' "$AGENTS" | sort -u)

for path in "${skill_paths[@]}"; do
  if ! printf '%s\n' "${agents_paths[@]}" | grep -Fxq "$path"; then
    echo "FAIL: AGENTS.md missing entry for $path"
    FAIL=1
  fi
done

if [[ $FAIL -eq 0 ]]; then
  echo "OK: AGENTS.md matches ${#skill_paths[@]} skill paths"
fi

if [[ -d "$ROOT/agents" ]]; then
  agent_files=()
  for f in "$ROOT"/agents/*.md; do
    [[ -f "$f" ]] || continue
    name="$(basename "$f" .md)"
    case "$name" in
      _*|README) continue ;;
    esac
    agent_files+=("$name")
  done

  if [[ ${#agent_files[@]} -gt 0 ]]; then
    fail_count=0
    for agent in "${agent_files[@]}"; do
      if ! grep -Fq "$agent" "$AGENTS"; then
        echo "FAIL: AGENTS.md missing reference to $agent"
        FAIL=1
        fail_count=1
      fi
    done
    if [[ $fail_count -eq 0 ]]; then
      echo "OK: AGENTS.md references ${#agent_files[@]} sub-agents from agents/ directory"
    fi
  fi
fi

exit "$FAIL"
