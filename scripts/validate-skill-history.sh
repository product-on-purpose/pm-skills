#!/usr/bin/env bash
# Validate that opt-in skill HISTORY.md files track the current SKILL.md version.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FAIL=0
FOUND_ANY=0

frontmatter_value() {
  local key="$1"

  printf '%s\n' "$frontmatter" |
    sed -n "s/^${key}:[[:space:]]*//p" |
    head -1 |
    sed -E 's/[[:space:]]+#.*$//; s/^["'"'"']//; s/["'"'"']$//'
}

history_table_versions() {
  local file="$1"

  awk '
    { sub(/\r$/, ""); }
    /^\|[[:space:]]*Version[[:space:]]*\|/ { in_table=1; next }
    in_table && /^\|[[:space:]\-:|]+\|?[[:space:]]*$/ { next }
    in_table && /^\|/ {
      line = $0
      sub(/^\|[[:space:]]*/, "", line)
      split(line, parts, /\|/)
      version = parts[1]
      gsub(/^[[:space:]]+|[[:space:]]+$/, "", version)
      if (version != "") {
        print version
      }
      next
    }
    in_table { exit }
  ' "$file" | awk '!seen[$0]++'
}

has_history_section() {
  local file="$1"
  local version="$2"
  local escaped

  escaped="$(printf '%s' "$version" | sed -E 's/[][(){}.^$*+?|\\]/\\&/g')"
  grep -Eq "^##[[:space:]]+${escaped}([[:space:]]|\\(|$)" "$file"
}

for dir in "$ROOT"/skills/*; do
  [[ -d "$dir" ]] || continue

  history="$dir/HISTORY.md"
  [[ -f "$history" ]] || continue

  FOUND_ANY=1
  skill="$dir/SKILL.md"
  rel="${history#$ROOT/}"

  if [[ ! -f "$skill" ]]; then
    echo "✗ $rel : missing sibling SKILL.md"
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
    echo "✗ $rel : sibling SKILL.md missing or invalid front matter"
    FAIL=1
    continue
  fi

  current_version="$(frontmatter_value version)"
  if [[ -z "$current_version" ]]; then
    echo "✗ $rel : sibling SKILL.md is missing version"
    FAIL=1
    continue
  fi

  mapfile -t table_versions < <(history_table_versions "$history")
  if [[ ${#table_versions[@]} -eq 0 ]]; then
    echo "✗ $rel : no version entries found in the summary table"
    FAIL=1
    continue
  fi

  current_found=0
  warnings_found=0

  for version in "${table_versions[@]}"; do
    if [[ "$version" == "$current_version" ]]; then
      current_found=1
    fi

    if ! has_history_section "$history" "$version"; then
      echo "✗ $rel : summary table version $version has no corresponding '## $version' section (warning only)"
      warnings_found=1
    fi
  done

  if [[ $current_found -eq 0 ]]; then
    echo "✗ $rel : current version $current_version is missing from the summary table"
    FAIL=1
    continue
  fi

  echo "✓ $rel : current version $current_version found in the summary table"
done

if [[ $FOUND_ANY -eq 0 ]]; then
  exit 0
fi

exit "$FAIL"
