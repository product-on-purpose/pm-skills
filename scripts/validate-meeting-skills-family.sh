#!/usr/bin/env bash
# Validate meeting-skills-family contract conformance across the 5 family skills.
# Complements (does not duplicate) lint-skills-frontmatter.sh, which handles
# universal skill-frontmatter checks. This script validates family-specific
# structural and reference requirements.
#
# See: docs/reference/skill-families/meeting-skills-contract.md

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FAIL=0

CONTRACT_PATH="docs/reference/skill-families/meeting-skills-contract.md"
CONTRACT_FILE="$ROOT/$CONTRACT_PATH"

FAMILY_SKILLS=(
  "foundation-meeting-agenda"
  "foundation-meeting-brief"
  "foundation-meeting-recap"
  "foundation-meeting-synthesize"
  "foundation-stakeholder-update"
)

# Skills that are exempt from the "Shareable summary" template section
# (per family contract: stakeholder-update's entire output is shareable content)
NO_SHAREABLE_SUMMARY=(
  "foundation-stakeholder-update"
)

# Universal frontmatter base fields required in every family TEMPLATE.md
REQUIRED_TEMPLATE_FRONTMATTER=(
  "artifact_type"
  "version"
  "generated_at"
  "generated_by_skill"
  "input_quality"
  "confidence"
  "visibility"
  "status"
)

# Required subsections in the Sources & References section of every TEMPLATE.md
REQUIRED_SOURCES_SUBSECTIONS=(
  "### Primary inputs"
  "### Referenced artifacts"
  "### External references"
  "### Generation context"
)

# Allowed artifact_type values per skill.
# bash 3.2 compatible: case-function lookup (associative arrays are bash 4+;
# macOS default bash is 3.2). Note foundation-meeting-synthesize maps to the
# irregular "meeting-synthesis" (not "-synthesize"); preserved verbatim.
expected_artifact_type_for() {
  case "$1" in
    foundation-meeting-agenda) printf '%s' "meeting-agenda" ;;
    foundation-meeting-brief) printf '%s' "meeting-brief" ;;
    foundation-meeting-recap) printf '%s' "meeting-recap" ;;
    foundation-meeting-synthesize) printf '%s' "meeting-synthesis" ;;
    foundation-stakeholder-update) printf '%s' "stakeholder-update" ;;
    *) printf '%s' "" ;;
  esac
}

is_in() {
  local needle="$1"; shift
  for item in "$@"; do
    if [[ "$item" == "$needle" ]]; then
      return 0
    fi
  done
  return 1
}

fail_skill() {
  local skill="$1"; local msg="$2"
  echo "✗ $skill : $msg"
  FAIL=1
}

pass_skill() {
  local skill="$1"; local msg="$2"
  echo "✓ $skill : $msg"
}

# --- Check 1: Contract doc exists at canonical path ---
if [[ ! -f "$CONTRACT_FILE" ]]; then
  echo "✗ family-contract : missing canonical contract at $CONTRACT_PATH"
  FAIL=1
else
  echo "✓ family-contract : present at $CONTRACT_PATH"
fi

# --- Per-skill checks ---
for skill in "${FAMILY_SKILLS[@]}"; do
  skill_dir="$ROOT/skills/$skill"
  skill_md="$skill_dir/SKILL.md"
  template_md="$skill_dir/references/TEMPLATE.md"

  if [[ ! -d "$skill_dir" ]]; then
    # Skill not yet authored . not a failure during the scaffolding phase;
    # the validator is intended to run post-authoring. Emit a notice.
    echo "⚠ $skill : skill directory not yet present (expected during scaffolding phase, not after v2.11.0 release)"
    continue
  fi

  if [[ ! -f "$skill_md" ]]; then
    fail_skill "$skill" "missing SKILL.md"
    continue
  fi

  if [[ ! -f "$template_md" ]]; then
    fail_skill "$skill" "missing references/TEMPLATE.md"
    continue
  fi

  # Check 2: SKILL.md references the family contract
  if ! grep -qF "$CONTRACT_PATH" "$skill_md"; then
    fail_skill "$skill" "SKILL.md does not reference family contract path ($CONTRACT_PATH)"
  else
    pass_skill "$skill" "SKILL.md references family contract"
  fi

  # Check 3: SKILL.md contains Zero-friction execution section
  if ! grep -qiE "^#{1,6}[[:space:]]+(Zero-friction execution|Go mode|Zero friction execution)" "$skill_md"; then
    fail_skill "$skill" "SKILL.md missing 'Zero-friction execution' section (required by family contract)"
  else
    pass_skill "$skill" "SKILL.md has Zero-friction execution section"
  fi

  # Check 4: TEMPLATE.md frontmatter includes universal base fields
  template_frontmatter=$(awk '
    { sub(/\r$/, ""); }
    /^---[ \t]*$/ { delimiter_count++; next; }
    delimiter_count==1 { print; }
    delimiter_count>=2 { exit; }
  ' "$template_md")

  if [[ -z "$template_frontmatter" ]]; then
    fail_skill "$skill" "TEMPLATE.md missing or malformed YAML frontmatter"
  else
    for field in "${REQUIRED_TEMPLATE_FRONTMATTER[@]}"; do
      if ! printf '%s\n' "$template_frontmatter" | grep -qE "^${field}:"; then
        fail_skill "$skill" "TEMPLATE.md frontmatter missing required field: $field"
      fi
    done

    # Check 4b: artifact_type matches expected value
    actual_artifact_type=$(printf '%s\n' "$template_frontmatter" | sed -n 's/^artifact_type:[[:space:]]*//p' | head -1 | tr -d '[:space:]"' )
    expected_artifact_type="$(expected_artifact_type_for "$skill")"
    if [[ -n "$actual_artifact_type" && "$actual_artifact_type" != "$expected_artifact_type" ]]; then
      fail_skill "$skill" "TEMPLATE.md artifact_type='$actual_artifact_type' does not match expected '$expected_artifact_type'"
    fi
  fi

  # Check 5: TEMPLATE.md has Shareable summary section (except stakeholder-update which requires Shareable update instead . v1.1.0)
  if is_in "$skill" "${NO_SHAREABLE_SUMMARY[@]}"; then
    # stakeholder-update requires 'Shareable update' section instead (v1.1.0 explicit boundary)
    if ! grep -qE "^#{1,6}[[:space:]]+Shareable update" "$template_md"; then
      fail_skill "$skill" "TEMPLATE.md missing '## Shareable update' section (required by family contract v1.1.0 for stakeholder-update)"
    else
      pass_skill "$skill" "TEMPLATE.md has Shareable update section (v1.1.0 boundary)"
    fi
  else
    if ! grep -qE "^#{1,6}[[:space:]]+Shareable summary" "$template_md"; then
      fail_skill "$skill" "TEMPLATE.md missing '## Shareable summary' section (required by family contract)"
    else
      pass_skill "$skill" "TEMPLATE.md has Shareable summary section"
    fi
  fi

  # Check 6: TEMPLATE.md has Sources & References section with required subsections
  if ! grep -qE "^#{1,6}[[:space:]]+Sources (&|and) References" "$template_md"; then
    fail_skill "$skill" "TEMPLATE.md missing 'Sources & References' section (required by family contract)"
  else
    for subsec in "${REQUIRED_SOURCES_SUBSECTIONS[@]}"; do
      if ! grep -qF "$subsec" "$template_md"; then
        fail_skill "$skill" "TEMPLATE.md Sources & References missing subsection: $subsec"
      fi
    done
  fi
done

# --- Check 7: Filename convention scan (v1.1.0) ---
# Scan EXAMPLE.md files and library/skill-output-samples/ for filename-looking
# strings that appear to be meeting-family artifact references. Validate each
# against the expected naming convention.

# Regex for valid single-meeting artifact filenames (agenda, brief, recap, stakeholder-update with optional variant suffix)
VALID_SINGLE='^[0-9]{4}-[0-9]{2}-[0-9]{2}_[0-9]{2}-[0-9]{2}[A-Z]{3,5}_[a-z0-9-]+_(agenda|brief|recap|stakeholder-update(-[a-z]+-[a-z]+)?)(_prepared-[0-9]{4}-[0-9]{2}-[0-9]{2})?\.md$'

# Regex for valid synthesis artifact filenames
VALID_SYNTHESIS='^(([0-9]{4}-Q[1-4])|([0-9]{4}-[0-9]{2}-[0-9]{2}-to-[0-9]{4}-[0-9]{2}-[0-9]{2}))_[a-z0-9-]+_synthesis(_prepared-[0-9]{4}-[0-9]{2}-[0-9]{2})?\.md$'

# Regex for catching suspected artifact filenames (broad)
SUSPECT='[0-9]{4}-[0-9]{2}-[0-9]{2}[^[:space:]"/\\)<>]*_(agenda|brief|recap|synthesis|stakeholder-update)[^[:space:]"/\\)<>]*\.md'

check_filename() {
  local fn="$1"; local source_file="$2"
  # Determine type and apply appropriate regex
  if [[ "$fn" == *"_synthesis"* || "$fn" == *"_synthesis.md" || "$fn" == *"_synthesis_"* ]]; then
    if ! [[ "$fn" =~ $VALID_SYNTHESIS ]]; then
      fail_skill "filename-convention" "nonconforming synthesis filename '$fn' (in $source_file) . expected pattern: YYYY-Qn_topic_synthesis.md OR YYYY-MM-DD-to-YYYY-MM-DD_topic_synthesis.md"
    fi
  else
    if ! [[ "$fn" =~ $VALID_SINGLE ]]; then
      fail_skill "filename-convention" "nonconforming single-meeting filename '$fn' (in $source_file) . expected pattern: YYYY-MM-DD_HH-MMtimezone_title_{agenda|brief|recap|stakeholder-update[-channel-audience]}[_prepared-YYYY-MM-DD].md"
    fi
  fi
}

scan_file_for_filenames() {
  local file="$1"
  [[ ! -f "$file" ]] && return
  # Extract lines containing suspected filenames; ignore sample filenames (which
  # start with "sample_" and are library-internal, not artifact filenames)
  while IFS= read -r match; do
    [[ -z "$match" ]] && continue
    [[ "$match" == sample_* ]] && continue  # library sample naming, not artifact
    check_filename "$match" "${file#$ROOT/}"
  done < <(grep -oE "$SUSPECT" "$file" 2>/dev/null | sort -u)
}

echo ""
echo "--- Filename convention scan ---"

# Scan EXAMPLE.md for each skill
for skill in "${FAMILY_SKILLS[@]}"; do
  example_md="$ROOT/skills/$skill/references/EXAMPLE.md"
  scan_file_for_filenames "$example_md"
done

# Scan sample outputs
if [[ -d "$ROOT/library/skill-output-samples" ]]; then
  for skill in "${FAMILY_SKILLS[@]}"; do
    sample_dir="$ROOT/library/skill-output-samples/$skill"
    [[ ! -d "$sample_dir" ]] && continue
    for sample in "$sample_dir"/*.md; do
      [[ ! -f "$sample" ]] && continue
      scan_file_for_filenames "$sample"
    done
  done
fi

echo ""
if [[ $FAIL -eq 0 ]]; then
  echo "All meeting-skills-family contract checks passed."
  exit 0
else
  echo "Meeting-skills-family contract checks FAILED. See '✗' lines above."
  exit 1
fi
