#!/usr/bin/env bash
# Validate SKILL.md front matter and structure
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FAIL=0

word_count() {
  printf '%s\n' "$1" | awk '{ count += NF } END { print count + 0 }'
}

frontmatter_value() {
  local key="$1"

  printf '%s\n' "$frontmatter" | sed -n "s/^${key}:[[:space:]]*//p" | head -1
}

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

  first_line=$(head -1 "$skill" | tr -d '\r')
  if [[ "$first_line" != "---" ]]; then
    echo "✗ $rel : first line must be '---' (skills.sh CLI requires YAML frontmatter delimiter at line 1; no preamble, comments, or attribution headers allowed)"
    FAIL=1
    skill_fail=1
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

  name_field="$(frontmatter_value name)"
  if [[ -z "$name_field" ]]; then
    echo "✗ $rel : missing name"
    FAIL=1
    skill_fail=1
  elif [[ "$name_field" != "$name_dir" ]]; then
    echo "✗ $rel : name mismatch (front matter: $name_field, dir: $name_dir)"
    FAIL=1
    skill_fail=1
  fi

  description_field="$(frontmatter_value description)"
  if [[ -z "$description_field" ]]; then
    echo "✗ $rel : missing description"
    FAIL=1
    skill_fail=1
  else
    is_quoted=0
    if [[ "$description_field" =~ ^\".*\"$ ]] || [[ "$description_field" =~ ^\'.*\'$ ]]; then
      is_quoted=1
    fi
    description_field="$(printf '%s' "$description_field" | sed -E 's/^["'"'"']//; s/["'"'"']$//')"
    description_words=$(word_count "$description_field")
    if (( description_words < 20 || description_words > 100 )); then
      echo "✗ $rel : description must be 20-100 words (found $description_words)"
      FAIL=1
      skill_fail=1
    fi
    if [[ $is_quoted -eq 0 ]] && printf '%s' "$description_field" | grep -qE ': '; then
      echo "✗ $rel : description contains inline ': ' which breaks strict YAML parsing (skills.sh CLI). Reword to remove the colon, or wrap the whole description in double quotes."
      FAIL=1
      skill_fail=1
    fi
  fi

  for key in version updated license; do
    if ! printf '%s\n' "$frontmatter" | grep -q "^${key}:"; then
      echo "✗ $rel : missing $key"
      FAIL=1
      skill_fail=1
    fi
  done

  phase_field="$(frontmatter_value phase)"
  classification_field="$(frontmatter_value classification)"

  if [[ -n "$phase_field" && ! "$phase_field" =~ ^(discover|define|develop|deliver|measure|iterate)$ ]]; then
    echo "✗ $rel : invalid phase '$phase_field' (expected one of: discover, define, develop, deliver, measure, iterate)"
    FAIL=1
    skill_fail=1
  fi

  if [[ -n "$classification_field" && ! "$classification_field" =~ ^(domain|foundation|utility|tool)$ ]]; then
    echo "✗ $rel : invalid classification '$classification_field' (expected one of: domain, foundation, utility, tool)"
    FAIL=1
    skill_fail=1
  fi

  if [[ "$classification_field" == "foundation" || "$classification_field" == "utility" || "$classification_field" == "tool" ]]; then
    if [[ -n "$phase_field" ]]; then
      echo "✗ $rel : phase should be omitted for classification '$classification_field'"
      FAIL=1
      skill_fail=1
    fi
  elif [[ "$classification_field" == "domain" ]]; then
    if [[ -z "$phase_field" ]]; then
      echo "✗ $rel : missing phase for domain classification"
      FAIL=1
      skill_fail=1
    fi
  else
    if [[ -z "$phase_field" ]]; then
      echo "✗ $rel : missing phase (or set classification to foundation/utility/tool)"
      FAIL=1
      skill_fail=1
    fi
  fi

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
    refpath="$dir/references/$ref"
    if [[ ! -f "$refpath" ]]; then
      echo "✗ $rel : missing references/$ref"
      FAIL=1
      skill_fail=1
    else
      # Byte-0 placement check: only enforce when the file actually has YAML
      # frontmatter. The signal we use is the bug pattern itself - HTML comment
      # on line 1 followed by `---` on line 2. Files without frontmatter, or
      # files where `---` appears as a markdown horizontal rule in the body,
      # correctly skip this check.
      ref_l1=$(sed -n '1p' "$refpath" | tr -d '\r')
      ref_l2=$(sed -n '2p' "$refpath" | tr -d '\r')
      if [[ "$ref_l1" == "<!--"*"-->" && "$ref_l2" == "---" ]]; then
        echo "✗ ${refpath#$ROOT/} : frontmatter byte-0 violation (HTML comment on line 1, '---' on line 2; move comment to line immediately after closing '---' fence)"
        FAIL=1
        skill_fail=1
      fi
    fi
  done

  template_path="$dir/references/TEMPLATE.md"
  if [[ -f "$template_path" ]]; then
    template_headers=$(grep -c '^## ' "$template_path" || true)
    if (( template_headers < 3 )); then
      echo "✗ $rel : references/TEMPLATE.md must contain at least 3 level-2 headers (found $template_headers)"
      FAIL=1
      skill_fail=1
    fi
  fi

  if [[ $skill_fail -eq 0 ]]; then
    echo "✓ $rel"
  fi
done

# W3.5: byte-0 check for library samples + OKR EXAMPLE.md files
# Scope: library/skill-output-samples/**/sample_*.md (any sample with frontmatter)
# Skip files with no frontmatter (e.g., README_SAMPLES.md, SAMPLE_CREATION.md)
SAMPLES_DIR="$ROOT/library/skill-output-samples"
if [[ -d "$SAMPLES_DIR" ]]; then
  while IFS= read -r -d $'\0' sample; do
    rel="${sample#$ROOT/}"
    name=$(basename "$sample")
    [[ "$name" == sample_*.md ]] || continue

    sample_l1=$(sed -n '1p' "$sample" | tr -d '\r')
    sample_l2=$(sed -n '2p' "$sample" | tr -d '\r')
    if [[ "$sample_l1" == "<!--"*"-->" && "$sample_l2" == "---" ]]; then
      echo "✗ $rel : frontmatter byte-0 violation (HTML comment on line 1, '---' on line 2; move comment to line immediately after closing '---' fence)"
      FAIL=1
    fi
  done < <(find "$SAMPLES_DIR" -name "sample_*.md" -type f -print0)
fi

# YAML parse-validity check across all in-scope files. Catches the
# unquoted colon-in-value defect class that github rejects with "mapping
# values are not allowed in this context". Byte-0 check is structural
# placement; this is parse validity.
YAML_FILES=()
while IFS= read -r -d $'\0' f; do YAML_FILES+=("$f"); done < <(
  find "$ROOT/skills" -type f \( -name SKILL.md -o -name TEMPLATE.md -o -name EXAMPLE.md \) -print0
)
if [[ -d "$SAMPLES_DIR" ]]; then
  while IFS= read -r -d $'\0' f; do YAML_FILES+=("$f"); done < <(
    find "$SAMPLES_DIR" -type f -name 'sample_*.md' -print0
  )
fi
if [[ ${#YAML_FILES[@]} -gt 0 ]]; then
  if ! node "$ROOT/scripts/check-frontmatter-yaml.mjs" "${YAML_FILES[@]}"; then
    FAIL=1
  fi
fi

exit "$FAIL"
