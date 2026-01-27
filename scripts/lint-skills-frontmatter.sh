#!/usr/bin/env bash
# Validate SKILL.md front matter and structure
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FAIL=0

for dir in "$ROOT"/skills/*; do
  [[ -d "$dir" ]] || continue
  skill="$dir/SKILL.md"
  rel="${skill#$ROOT/}"
  name_dir="$(basename "$dir")"
  skill_fail=0

  if [[ ! -f "$skill" ]]; then
    echo "✗ $name_dir : missing SKILL.md"
    FAIL=1
    continue
  fi

  frontmatter=$(awk '
    { sub(/\r$/, ""); }
    /^---[ \t]*$/ { delimiter_count++; next; }
    delimiter_count==1 { print; }
    delimiter_count>=2 { exit; }
  ' "$skill")

  if [[ -z "$frontmatter" ]]; then
    echo "✗ $rel : missing or invalid front matter"
    FAIL=1
    skill_fail=1
    continue
  fi

  name_field=$(printf '%s\n' "$frontmatter" | awk -F': *' '/^name:/ {print $2; exit}')
  if [[ -z "$name_field" ]]; then
    echo "✗ $rel : missing name"
    FAIL=1
    skill_fail=1
  elif [[ "$name_field" != "$name_dir" ]]; then
    echo "✗ $rel : name mismatch (front matter: $name_field, dir: $name_dir)"
    FAIL=1
    skill_fail=1
  fi

  for key in phase version updated license; do
    if ! printf '%s\n' "$frontmatter" | grep -q "^${key}:"; then
      echo "✗ $rel : missing $key"
      FAIL=1
      skill_fail=1
    fi
  done

  version_count=$(printf '%s\n' "$frontmatter" | grep -c '^version:')
  if [[ $version_count -ne 1 ]]; then
    echo "✗ $rel : expected exactly one root version (found $version_count)"
    FAIL=1
    skill_fail=1
  fi

  if printf '%s\n' "$frontmatter" | awk '
    /^metadata:[ \t]*$/ { inmeta=1; next }
    inmeta==1 {
      if ($0 !~ /^[ \t]/) { inmeta=0 }
      else if ($0 ~ /^[ \t]+version:/) { found=1 }
    }
    END { if (found) exit 0; else exit 1 }
  '; then
    echo "✗ $rel : metadata.version present (remove nested version)"
    FAIL=1
    skill_fail=1
  fi

  for ref in TEMPLATE.md EXAMPLE.md; do
    if [[ ! -f "$dir/references/$ref" ]]; then
      echo "✗ $rel : missing references/$ref"
      FAIL=1
      skill_fail=1
    fi
  done

  if [[ $skill_fail -eq 0 ]]; then
    echo "✓ $rel"
  fi
done

exit "$FAIL"
