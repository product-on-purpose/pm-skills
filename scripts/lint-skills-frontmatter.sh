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

# Read a value from the first indent level inside the metadata: block.
# Matches "  key: value" (2-space or tab indent) within metadata:; ignores
# deeper-nested keys and top-level keys.
metadata_value() {
  local key="$1"
  printf '%s\n' "$frontmatter" | awk -v key="$key" '
    /^metadata:[ \t]*$/ { inmeta=1; next }
    inmeta==1 {
      if ($0 !~ /^[ \t]/) { inmeta=0; next }
      line=$0
      if (line ~ ("^[ \t]+" key ":")) {
        sub("^[ \t]+" key ":[ \t]*", "", line)
        print line
        exit
      }
    }
  ' | head -1
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

  # v2.17.0 spec migration: top-level keeps name/description/license only.
  # version/updated/phase/classification move under metadata: per agentskills.io.
  if ! printf '%s\n' "$frontmatter" | grep -q "^license:"; then
    echo "✗ $rel : missing top-level license"
    FAIL=1
    skill_fail=1
  fi

  for key in version updated phase classification; do
    if printf '%s\n' "$frontmatter" | grep -q "^${key}:"; then
      echo "✗ $rel : top-level '$key' found (move under metadata: per v2.17.0 migration)"
      FAIL=1
      skill_fail=1
    fi
  done

  meta_version="$(metadata_value version)"
  meta_updated="$(metadata_value updated)"
  if [[ -z "$meta_version" ]]; then
    echo "✗ $rel : missing metadata.version"
    FAIL=1
    skill_fail=1
  fi
  if [[ -z "$meta_updated" ]]; then
    echo "✗ $rel : missing metadata.updated"
    FAIL=1
    skill_fail=1
  fi

  meta_phase="$(metadata_value phase)"
  meta_classification="$(metadata_value classification)"

  if [[ -n "$meta_phase" && ! "$meta_phase" =~ ^(discover|define|develop|deliver|measure|iterate)$ ]]; then
    echo "✗ $rel : invalid metadata.phase '$meta_phase'"
    FAIL=1
    skill_fail=1
  fi

  if [[ -n "$meta_classification" && ! "$meta_classification" =~ ^(foundation|utility|tool)$ ]]; then
    echo "✗ $rel : invalid metadata.classification '$meta_classification'"
    FAIL=1
    skill_fail=1
  fi

  if [[ -n "$meta_phase" && -n "$meta_classification" ]]; then
    echo "✗ $rel : both metadata.phase and metadata.classification present (use one)"
    FAIL=1
    skill_fail=1
  elif [[ -z "$meta_phase" && -z "$meta_classification" ]]; then
    echo "✗ $rel : missing metadata.phase or metadata.classification"
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
  # Batch files to avoid "Argument list too long" on Windows/MSYS bash
  # when the corpus grows. Each batch is processed in one node invocation;
  # any batch failure marks FAIL but processing continues so all errors
  # surface in a single run.
  BATCH_SIZE=50
  for ((i=0; i<${#YAML_FILES[@]}; i+=BATCH_SIZE)); do
    batch=("${YAML_FILES[@]:i:BATCH_SIZE}")
    if ! node "$ROOT/scripts/check-frontmatter-yaml.mjs" "${batch[@]}"; then
      FAIL=1
    fi
  done
fi

exit "$FAIL"
