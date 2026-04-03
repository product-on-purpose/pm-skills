#!/usr/bin/env bash
# Validate release-plan skills manifests against the skill library.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FAIL=0

clean_scalar() {
  printf '%s' "$1" |
    sed -E 's/[[:space:]]+#.*$//; s/^[[:space:]]+//; s/[[:space:]]+$//; s/^["'"'"']//; s/["'"'"']$//'
}

frontmatter_value() {
  local key="$1"

  printf '%s\n' "$frontmatter" |
    sed -n "s/^${key}:[[:space:]]*//p" |
    head -1 |
    sed -E 's/[[:space:]]+#.*$//; s/^["'"'"']//; s/["'"'"']$//'
}

manifest_entries() {
  local file="$1"

  awk '
    { sub(/\r$/, ""); }
    /^skills:[[:space:]]*$/ { in_skills=1; next }
    in_skills && /^[[:space:]]*-[[:space:]]+name:[[:space:]]*/ {
      if (in_entry) {
        print name "\t" version "\t" change_type
      }
      in_entry = 1
      line = $0
      sub(/^[[:space:]]*-[[:space:]]+name:[[:space:]]*/, "", line)
      name = line
      version = ""
      change_type = ""
      next
    }
    in_entry && /^[[:space:]]+version:[[:space:]]*/ {
      line = $0
      sub(/^[[:space:]]+version:[[:space:]]*/, "", line)
      version = line
      next
    }
    in_entry && /^[[:space:]]+change_type:[[:space:]]*/ {
      line = $0
      sub(/^[[:space:]]+change_type:[[:space:]]*/, "", line)
      change_type = line
      next
    }
    END {
      if (in_entry) {
        print name "\t" version "\t" change_type
      }
    }
  ' "$file" | while IFS=$'\t' read -r name version change_type; do
    printf '%s\t%s\t%s\n' \
      "$(clean_scalar "$name")" \
      "$(clean_scalar "$version")" \
      "$(clean_scalar "$change_type")"
  done
}

latest_release=""
latest_major=-1
latest_minor=-1
latest_patch=-1

shopt -s nullglob
manifest_files=("$ROOT"/docs/internal/release-plans/*/skills-manifest.yaml)
shopt -u nullglob

if [[ ${#manifest_files[@]} -eq 0 ]]; then
  exit 0
fi

for manifest in "${manifest_files[@]}"; do
  release_dir="$(basename "$(dirname "$manifest")")"
  if [[ "$release_dir" =~ ^v([0-9]+)\.([0-9]+)\.([0-9]+)$ ]]; then
    major="${BASH_REMATCH[1]}"
    minor="${BASH_REMATCH[2]}"
    patch="${BASH_REMATCH[3]}"

    if (( major > latest_major ||
      (major == latest_major && minor > latest_minor) ||
      (major == latest_major && minor == latest_minor && patch > latest_patch) )); then
      latest_release="$release_dir"
      latest_major=$major
      latest_minor=$minor
      latest_patch=$patch
    fi
  fi
done

for manifest in "${manifest_files[@]}"; do
  rel="${manifest#$ROOT/}"
  release_dir="$(basename "$(dirname "$manifest")")"
  manifest_fail=0
  manifest_warn=0

  while IFS=$'\t' read -r name version change_type; do
    [[ -n "$name" ]] || continue

    skill_dir="$ROOT/skills/$name"

    if [[ "$change_type" != "removed" && ! -d "$skill_dir" ]]; then
      echo "✗ $rel : skill '$name' not found in skills/"
      FAIL=1
      manifest_fail=1
      continue
    fi

    if [[ "$release_dir" == "$latest_release" && "$change_type" != "removed" ]]; then
      skill="$skill_dir/SKILL.md"
      if [[ ! -f "$skill" ]]; then
        echo "✗ $rel : skill '$name' is missing SKILL.md"
        FAIL=1
        manifest_fail=1
        continue
      fi

      frontmatter=$(awk '
        { sub(/\r$/, ""); }
        /^---[ \t]*$/ { delimiter_count++; next; }
        delimiter_count==1 { print; }
        delimiter_count>=2 { exit; }
      ' "$skill")

      if [[ -z "$frontmatter" ]]; then
        echo "✗ $rel : skill '$name' has missing or invalid front matter"
        FAIL=1
        manifest_fail=1
        continue
      fi

      current_version="$(frontmatter_value version)"
      if [[ -z "$current_version" ]]; then
        echo "✗ $rel : skill '$name' is missing version in SKILL.md"
        FAIL=1
        manifest_fail=1
        continue
      fi

      if [[ -n "$version" && "$version" != "$current_version" ]]; then
        echo "✗ $rel : skill '$name' lists version $version but current SKILL.md is $current_version (warning only)"
        manifest_warn=1
      fi
    fi
  done < <(manifest_entries "$manifest")

  if [[ $manifest_fail -eq 0 && $manifest_warn -eq 0 ]]; then
    echo "✓ $rel"
  fi
done

exit "$FAIL"
