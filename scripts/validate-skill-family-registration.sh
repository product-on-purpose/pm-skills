#!/usr/bin/env bash
# validate-skill-family-registration.sh - Generic structural validator for skill families.
#
# Reads docs/reference/skill-families/_registry.yaml and verifies for each family:
#   1. Family contract document exists at the declared path
#   2. All declared member skills exist as directories in skills/
#   3. Each member's SKILL.md references the family contract path
#
# Family-specific contract rules (template sections, artifact_type enums, filename
# conventions) are NOT enforced here. They live in family-specific validators that
# complement this one (e.g., validate-meeting-skills-family.sh).
#
# Adding a new family: edit the registry, ensure the contract + members exist.
# No script authoring required for structural validation.
#
# Closes audit gap G2: prior validate-meeting-skills-family hardcoded 5 family
# members in the script; generic validation is now registry-driven.
#
# Exit codes:
#   0 - All families pass structural validation
#   1 - One or more families have structural integrity violations
#
# Usage:
#   ./scripts/validate-skill-family-registration.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
REGISTRY="$ROOT/docs/reference/skill-families/_registry.yaml"

echo "=== Skill Family Registration Validation ==="
echo ""

if [[ ! -f "$REGISTRY" ]]; then
  echo "FAIL: registry not found at $REGISTRY"
  exit 1
fi

FAIL=0

# Parse registry: extract family entries (family name, contract, members)
# Expected format:
#   families:
#     <name>:
#       contract: <path>
#       members:
#         - <skill-name>
#         - <skill-name>

# Extract family names (lines under families: with 2-space indent)
FAMILY_NAMES=$(awk '
  /^families:/ { in_families=1; next }
  in_families && /^[^[:space:]#]/ { in_families=0; next }
  in_families && /^[[:space:]][[:space:]][a-zA-Z][a-zA-Z0-9_-]*:[[:space:]]*$/ {
    name=$1
    sub(/:$/, "", name)
    sub(/^[[:space:]]+/, "", name)
    print name
  }
' "$REGISTRY")

if [[ -z "$FAMILY_NAMES" ]]; then
  echo "FAIL: no families found in registry. Verify _registry.yaml structure."
  exit 1
fi

FAMILY_COUNT=0
while IFS= read -r family; do
  [[ -z "$family" ]] && continue
  FAMILY_COUNT=$((FAMILY_COUNT + 1))

  echo "--- Family: $family ---"

  # Extract contract path for this family
  contract=$(awk -v fam="$family" '
    /^families:/ { in_families=1; next }
    in_families && /^[^[:space:]#]/ { in_families=0 }
    in_families && match($0, "^[[:space:]][[:space:]]" fam ":[[:space:]]*$") { in_family=1; next }
    in_family && /^[[:space:]][[:space:]][a-zA-Z]/ { in_family=0 }
    in_family && /^[[:space:]]+contract:[[:space:]]*/ {
      sub(/^[[:space:]]+contract:[[:space:]]*/, "")
      sub(/[[:space:]]*$/, "")
      print
      exit
    }
  ' "$REGISTRY")

  if [[ -z "$contract" ]]; then
    echo "  FAIL: family '$family' has no contract: declared in registry"
    FAIL=1
    continue
  fi

  contract_full="$ROOT/$contract"
  if [[ ! -f "$contract_full" ]]; then
    echo "  FAIL: contract file does not exist at $contract"
    FAIL=1
  else
    echo "  PASS: contract present at $contract"
  fi

  # Extract members for this family
  members=$(awk -v fam="$family" '
    /^families:/ { in_families=1; next }
    in_families && /^[^[:space:]#]/ { in_families=0 }
    in_families && match($0, "^[[:space:]][[:space:]]" fam ":[[:space:]]*$") { in_family=1; next }
    in_family && /^[[:space:]][[:space:]][a-zA-Z]/ { in_family=0 }
    in_family && /^[[:space:]]+members:/ { in_members=1; next }
    in_members && /^[[:space:]]+-[[:space:]]+/ {
      member=$0
      sub(/^[[:space:]]+-[[:space:]]+/, "", member)
      sub(/[[:space:]]*$/, "", member)
      print member
    }
    in_members && !/^[[:space:]]+-/ && /^[[:space:]]+[a-zA-Z]/ { in_members=0 }
  ' "$REGISTRY")

  if [[ -z "$members" ]]; then
    echo "  FAIL: family '$family' has no members declared in registry"
    FAIL=1
    continue
  fi

  member_count=0
  while IFS= read -r member; do
    [[ -z "$member" ]] && continue
    member_count=$((member_count + 1))

    member_dir="$ROOT/skills/$member"
    member_skill_md="$member_dir/SKILL.md"

    if [[ ! -d "$member_dir" ]]; then
      echo "  FAIL: member '$member' has no directory at skills/$member"
      FAIL=1
      continue
    fi

    if [[ ! -f "$member_skill_md" ]]; then
      echo "  FAIL: member '$member' has no SKILL.md"
      FAIL=1
      continue
    fi

    # Verify SKILL.md references the contract path
    if ! grep -qF "$contract" "$member_skill_md"; then
      echo "  FAIL: member '$member' SKILL.md does not reference family contract path ($contract)"
      FAIL=1
    else
      echo "  PASS: member '$member' references contract"
    fi
  done <<< "$members"

  echo "  ($member_count member(s) verified)"
  echo ""
done <<< "$FAMILY_NAMES"

echo "Total families validated: $FAMILY_COUNT"
echo ""

if [[ $FAIL -eq 0 ]]; then
  echo "PASS: all skill families have structural integrity."
  exit 0
else
  echo "FAIL: one or more families have structural integrity violations."
  exit 1
fi
