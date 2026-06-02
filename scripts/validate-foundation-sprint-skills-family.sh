#!/usr/bin/env bash
# Validate foundation-sprint-skills family contract conformance across the
# 7 family skills. Complements (does not duplicate) lint-skills-frontmatter.sh,
# which handles universal skill-frontmatter checks. This script validates
# family-specific structural and reference requirements for the Foundation
# Sprint family.
#
# See: docs/reference/skill-families/foundation-sprint-skills-contract.md
# Architectural amendment 2026-05-13: tool classification, two-family structure.
#
# Scaffolding behavior: when no family skill directories exist yet, the
# validator exits 0 with notices. Once any family skill is authored, the
# contract doc and per-skill checks are enforced.

set -euo pipefail

# Flags
STRICT=0
for arg in "$@"; do
  case "$arg" in
    --strict) STRICT=1 ;;
  esac
done

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FAIL=0

CONTRACT_PATH="docs/reference/skill-families/foundation-sprint-skills-contract.md"
CONTRACT_FILE="$ROOT/site/src/content/$CONTRACT_PATH"

FAMILY_SKILLS=(
  "tool-foundation-sprint-readiness"
  "tool-foundation-sprint-brief"
  "tool-foundation-sprint-basics"
  "tool-foundation-sprint-differentiation"
  "tool-foundation-sprint-approach-options"
  "tool-foundation-sprint-magic-lenses"
  "tool-foundation-sprint-founding-hypothesis"
)

# Expected metadata.move per skill (kebab-case, derived from skill slug).
# bash 3.2 compatible: case-function lookup (associative arrays are bash 4+;
# macOS default bash is 3.2).
expected_move_for() {
  case "$1" in
    tool-foundation-sprint-readiness) printf '%s' "readiness" ;;
    tool-foundation-sprint-brief) printf '%s' "brief" ;;
    tool-foundation-sprint-basics) printf '%s' "basics" ;;
    tool-foundation-sprint-differentiation) printf '%s' "differentiation" ;;
    tool-foundation-sprint-approach-options) printf '%s' "approach-options" ;;
    tool-foundation-sprint-magic-lenses) printf '%s' "magic-lenses" ;;
    tool-foundation-sprint-founding-hypothesis) printf '%s' "founding-hypothesis" ;;
    *) printf '%s' "" ;;
  esac
}

fail_skill() {
  local skill="$1"; local msg="$2"
  echo "[FAIL] $skill : $msg"
  FAIL=1
}

pass_skill() {
  local skill="$1"; local msg="$2"
  echo "[OK] $skill : $msg"
}

# --- Scaffolding-state detection ---
authored_count=0
for skill in "${FAMILY_SKILLS[@]}"; do
  [[ -d "$ROOT/skills/$skill" ]] && authored_count=$((authored_count + 1))
done

if [[ $authored_count -eq 0 ]]; then
  echo "[NOTICE] foundation-sprint-skills-family : 0 of ${#FAMILY_SKILLS[@]} family skills authored yet (scaffolding phase)."
  echo "[NOTICE] foundation-sprint-skills-family : contract presence + per-skill checks deferred until skills land."
  echo "[NOTICE] foundation-sprint-skills-family : validator exits 0 in scaffolding state."
  exit 0
fi

# Partial-state detection (between scaffolding and complete)
total_count=${#FAMILY_SKILLS[@]}
if [[ $authored_count -lt $total_count ]]; then
  if [[ $STRICT -eq 1 ]]; then
    echo "[FAIL] foundation-sprint-skills-family : $authored_count of $total_count family skills authored. Strict mode requires all $total_count to ship."
    FAIL=1
  else
    echo "[WARN] foundation-sprint-skills-family : $authored_count of $total_count family skills authored. Family is incomplete. Pass --strict to fail on partial state (recommended for release-time validation)."
  fi
fi

echo "[INFO] foundation-sprint-skills-family : $authored_count of $total_count family skills present; enforcing checks."

# --- Check 1: Contract doc exists at canonical path ---
if [[ ! -f "$CONTRACT_FILE" ]]; then
  echo "[FAIL] family-contract : missing canonical contract at $CONTRACT_PATH"
  FAIL=1
else
  echo "[OK] family-contract : present at $CONTRACT_PATH"
fi

# --- Per-skill checks ---
for skill in "${FAMILY_SKILLS[@]}"; do
  skill_dir="$ROOT/skills/$skill"
  skill_md="$skill_dir/SKILL.md"
  template_md="$skill_dir/references/TEMPLATE.md"
  example_md="$skill_dir/references/EXAMPLE.md"

  if [[ ! -d "$skill_dir" ]]; then
    echo "[NOTICE] $skill : skill directory not yet present (expected during scaffolding phase)"
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

  if [[ ! -f "$example_md" ]]; then
    fail_skill "$skill" "missing references/EXAMPLE.md"
    continue
  fi

  # Extract SKILL.md frontmatter
  skill_frontmatter=$(awk '
    { sub(/\r$/, ""); }
    /^---[ \t]*$/ { delimiter_count++; next; }
    delimiter_count==1 { print; }
    delimiter_count>=2 { exit; }
  ' "$skill_md")

  if [[ -z "$skill_frontmatter" ]]; then
    fail_skill "$skill" "SKILL.md missing or malformed YAML frontmatter"
    continue
  fi

  # Check 2: metadata.classification is tool (v2.17.0: moved under metadata)
  classification_val=$(printf '%s\n' "$skill_frontmatter" | awk '
    /^metadata:[ \t]*$/ { inmeta=1; next }
    inmeta==1 {
      if ($0 !~ /^[ \t]/) { inmeta=0 }
      else if ($0 ~ /^[ \t]+classification:/) { sub(/^[ \t]+classification:[ \t]*/, ""); gsub(/["[:space:]]/, ""); print; exit }
    }
  ')
  if [[ "$classification_val" != "tool" ]]; then
    fail_skill "$skill" "metadata.classification='$classification_val' (expected 'tool')"
  else
    pass_skill "$skill" "metadata.classification: tool"
  fi

  # Check 3: metadata.tool equals foundation-sprint
  meta_tool=$(printf '%s\n' "$skill_frontmatter" | awk '
    /^metadata:[ \t]*$/ { inmeta=1; next }
    inmeta==1 {
      if ($0 !~ /^[ \t]/) { inmeta=0 }
      else if ($0 ~ /^[ \t]+tool:/) { sub(/^[ \t]+tool:[ \t]*/, ""); gsub(/["[:space:]]/, ""); print; exit }
    }
  ')
  if [[ "$meta_tool" != "foundation-sprint" ]]; then
    fail_skill "$skill" "metadata.tool='$meta_tool' (expected 'foundation-sprint')"
  else
    pass_skill "$skill" "metadata.tool: foundation-sprint"
  fi

  # Check 4: metadata.move matches expected value
  meta_move=$(printf '%s\n' "$skill_frontmatter" | awk '
    /^metadata:[ \t]*$/ { inmeta=1; next }
    inmeta==1 {
      if ($0 !~ /^[ \t]/) { inmeta=0 }
      else if ($0 ~ /^[ \t]+move:/) { sub(/^[ \t]+move:[ \t]*/, ""); gsub(/["[:space:]]/, ""); print; exit }
    }
  ')
  expected_move="$(expected_move_for "$skill")"
  if [[ "$meta_move" != "$expected_move" ]]; then
    fail_skill "$skill" "metadata.move='$meta_move' (expected '$expected_move')"
  else
    pass_skill "$skill" "metadata.move: $expected_move"
  fi

  # Check 5: SKILL.md references the family contract
  if ! grep -qF "$CONTRACT_PATH" "$skill_md"; then
    fail_skill "$skill" "SKILL.md does not reference family contract path ($CONTRACT_PATH)"
  else
    pass_skill "$skill" "SKILL.md references family contract"
  fi

  # Check 6: TEMPLATE.md ends with a Decider Checkpoint section
  if ! grep -qE "^#{1,6}[[:space:]]+Decider Checkpoint" "$template_md"; then
    fail_skill "$skill" "TEMPLATE.md missing 'Decider Checkpoint' section (required by family contract)"
  else
    # Verify it appears in the last 25% of the file (positionally near the end)
    line_count=$(wc -l < "$template_md")
    threshold=$((line_count * 3 / 4))
    checkpoint_line=$(grep -nE "^#{1,6}[[:space:]]+Decider Checkpoint" "$template_md" | head -1 | cut -d: -f1)
    if (( checkpoint_line < threshold )); then
      fail_skill "$skill" "Decider Checkpoint section appears before line $threshold (line $checkpoint_line); family contract requires it at the end of TEMPLATE.md"
    else
      pass_skill "$skill" "TEMPLATE.md has Decider Checkpoint at end (line $checkpoint_line of $line_count)"
    fi
  fi
done

echo ""
if [[ $FAIL -eq 0 ]]; then
  echo "All foundation-sprint-skills-family contract checks passed."
  exit 0
else
  echo "Foundation-sprint-skills-family contract checks FAILED. See '[FAIL]' lines above."
  exit 1
fi
