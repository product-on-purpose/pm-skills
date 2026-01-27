#!/usr/bin/env bash
# pm-skills sync helper for Claude Code / openskills discovery
# Populates .claude/skills and .claude/commands from the flat source tree.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CS="$ROOT/.claude/skills"
CC="$ROOT/.claude/commands"

mkdir -p "$CS" "$CC"

echo "Validating skills..."
for dir in "$ROOT"/skills/*/; do
  [ -d "$dir" ] || continue
  name="$(basename "$dir")"
  for f in SKILL.md references/TEMPLATE.md references/EXAMPLE.md; do
    if [ ! -f "$dir/$f" ]; then
      echo "ERROR: missing $f in $name" >&2
      exit 1
    fi
  done
  rm -rf "$CS/$name"
  mkdir -p "$CS/$name"
  cp -r "$dir"/* "$CS/$name"/
  echo "  [OK] $name"
done

echo ""
echo "Syncing commands..."
for cmd in "$ROOT"/commands/*.md; do
  [ -f "$cmd" ] || continue
  cp "$cmd" "$CC"/
  echo "  [OK] $(basename "$cmd")"
done

echo ""
echo "Sync complete. Claude Code discovery directories populated under .claude/."
