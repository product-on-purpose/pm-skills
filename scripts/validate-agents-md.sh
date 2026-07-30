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

# Pure-bash membership test, deliberately NOT `printf ... | grep -Fxq`. Under the
# `set -o pipefail` above, that idiom is nondeterministically WRONG: `grep -q`
# exits the moment it matches, closing the read end, so `printf` can die with
# EPIPE ("write error: Broken pipe"). pipefail then promotes the dead printf to a
# pipeline failure even though grep matched, and the entry is falsely reported
# missing. It surfaced on main 2026-07-30, failing on two skills whose entries
# were present, while the PowerShell leg passed on identical content. No pipe,
# no race. Kept bash 3.2 compatible (no associative arrays).
for path in "${skill_paths[@]}"; do
  found=0
  for entry in "${agents_paths[@]}"; do
    if [[ "$entry" == "$path" ]]; then
      found=1
      break
    fi
  done
  if [[ $found -eq 0 ]]; then
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
