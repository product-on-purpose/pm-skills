#!/usr/bin/env bash
# check-skill-cross-references.sh - Flag backtick skill references that do not resolve.
#
# Scans skills/*/SKILL.md for backtick-wrapped, classification-prefixed skill
# names (e.g., `deliver-prd`) and asserts each resolves to a skills/<name>/
# directory. Catches the v2.18.0 defect class: references to non-existent
# skills (define-edge-cases, develop-product-vision, discover-research-plan)
# that passed every other gate and were caught only by a manual name-vs-dir diff.
#
# Scope (D-FU2, option A): a "skill reference" is a backtick-wrapped token whose
# first segment is a known classification prefix followed by '-' and a lowercase
# slug. Only skills/*/SKILL.md is scanned (not prose, commands, or README).
#
# Forward-references to planned-but-unshipped skills, illustrative naming
# examples, and skill-family identifiers are intentional non-resolving tokens;
# they are listed in ALLOWLIST below.
#
# Exit codes:
#   0 - all references resolve (or are allowlisted)
#   1 - one or more broken references
#
# Usage:
#   ./scripts/check-skill-cross-references.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT"

echo "=== Skill Cross-Reference Check ==="
echo ""

# Classification prefixes that begin a skill directory name.
PREFIX_RE='discover|define|develop|deliver|measure|iterate|foundation|utility|tool'

# Intentional non-resolving tokens (exact directory-name match). Keep sorted.
#   deliver-change-communication  illustrative naming example in utility-pm-skill-builder
#   deliver-roadmap               forward-ref to a planned skill ("when shipped")
#   foundation-sprint-skills      skill-family identifier (a contract, not a skill dir)
ALLOWLIST="deliver-change-communication
deliver-roadmap
foundation-sprint-skills"

# Valid skill directory names, one per line.
VALID="$(find skills -mindepth 1 -maxdepth 1 -type d -exec basename {} \; | sort)"

BROKEN=""
COUNT=0

# grep -o prints each backtick-wrapped token on its own line, prefixed by
# file:line. The token still carries its surrounding backticks; tr strips them.
while IFS= read -r hit; do
  [ -n "$hit" ] || continue
  file="${hit%%:*}"
  rest="${hit#*:}"
  lineno="${rest%%:*}"
  token="$(printf '%s' "${rest#*:}" | tr -d '\140')"
  if printf '%s\n' "$VALID" | grep -qxF -- "$token"; then continue; fi
  if printf '%s\n' "$ALLOWLIST" | grep -qxF -- "$token"; then continue; fi
  BROKEN="${BROKEN}  ${file}:${lineno}: \`${token}\` -> no skills/${token}/ directory"$'\n'
  COUNT=$((COUNT + 1))
done < <(grep -HnoE "\`(${PREFIX_RE})-[a-z0-9-]+\`" skills/*/SKILL.md 2>/dev/null || true)

if [ "$COUNT" -eq 0 ]; then
  echo "PASS: all backtick skill references in skills/*/SKILL.md resolve (or are allowlisted)."
  exit 0
else
  echo "Broken skill cross-references found:"
  echo ""
  printf '%s' "$BROKEN"
  echo ""
  echo "FAIL: $COUNT backtick skill reference(s) do not resolve to a skills/<name>/ directory."
  echo "Intentional forward-refs, naming examples, or family ids belong in ALLOWLIST."
  exit 1
fi
