#!/usr/bin/env bash
# check-agents-md-command-sync.sh - Assert AGENTS.md command table covers commands/.
#
# v2.15.1 addition closing audit finding A04 from v2.15.x audit.
# The v2.15.0 release added 15 new tool commands (commands/tool-*.md) and
# added a "Tools" section near the top of AGENTS.md describing them, but
# the command summary table at the bottom of AGENTS.md was never extended
# to include the new /tool-* slash commands. Readers using AGENTS.md as the
# canonical agent-discovery doc saw the tools in the upper section but found
# an incomplete table at the bottom.
#
# This validator asserts: every file in commands/ has a corresponding
# `| \`/<command>\` |` row in AGENTS.md.
#
# Exit codes:
#   0 - AGENTS.md command table covers every commands/ file
#   1 - Coverage gap detected
#
# Usage:
#   ./scripts/check-agents-md-command-sync.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

AGENTS_MD="$ROOT/AGENTS.md"
COMMANDS_DIR="$ROOT/commands"

echo "=== AGENTS.md Command Sync Check ==="
echo ""

if [ ! -f "$AGENTS_MD" ]; then
  echo "FAIL: AGENTS.md not found at $AGENTS_MD"
  exit 1
fi

if [ ! -d "$COMMANDS_DIR" ]; then
  echo "FAIL: commands/ directory not found at $COMMANDS_DIR"
  exit 1
fi

# Source-of-truth: every .md file in commands/ corresponds to a slash command.
COMMAND_FILES=$(find "$COMMANDS_DIR" -maxdepth 1 -name '*.md' -type f -exec basename {} .md \; | sort)
COMMAND_COUNT=$(echo "$COMMAND_FILES" | wc -l | tr -d ' ')

# Extract every `| \`/<command>\` |` row from AGENTS.md.
TABLE_COMMANDS=$(grep -oE '^\| `/[a-z][a-z0-9-]*`' "$AGENTS_MD" 2>/dev/null | \
  sed -E 's/^\| `\/([a-z][a-z0-9-]*)`/\1/' | sort -u || true)
TABLE_COUNT=$(echo "$TABLE_COMMANDS" | grep -c . || true)

echo "Counts:"
echo "  commands/*.md files:           $COMMAND_COUNT"
echo "  AGENTS.md command-table rows:  $TABLE_COUNT"
echo ""

FAIL=0
MISSING_FROM_TABLE=()
ORPHANED_IN_TABLE=()

# Find commands present in commands/ but missing from the table
while IFS= read -r cmd; do
  if [ -z "$cmd" ]; then continue; fi
  if ! grep -qE "^\| \`/${cmd}\`" "$AGENTS_MD"; then
    MISSING_FROM_TABLE+=("$cmd")
    FAIL=1
  fi
done <<< "$COMMAND_FILES"

# Find rows in the table that don't correspond to a commands/ file
# (orphans; may indicate a renamed or deleted command)
while IFS= read -r cmd; do
  if [ -z "$cmd" ]; then continue; fi
  if [ ! -f "$COMMANDS_DIR/$cmd.md" ]; then
    # Allow workflow- prefix commands which map to _workflows/ rather than commands/
    case "$cmd" in
      workflow-*)
        # These map to _workflows/<stem>.md where stem is the part after workflow-
        wf_stem="${cmd#workflow-}"
        if [ ! -f "$ROOT/_workflows/$wf_stem.md" ] && [ ! -f "$COMMANDS_DIR/$cmd.md" ]; then
          ORPHANED_IN_TABLE+=("$cmd (workflow alias; no matching _workflows/${wf_stem}.md)")
          FAIL=1
        fi
        ;;
      *)
        ORPHANED_IN_TABLE+=("$cmd")
        FAIL=1
        ;;
    esac
  fi
done <<< "$TABLE_COMMANDS"

if [ ${#MISSING_FROM_TABLE[@]} -gt 0 ]; then
  echo "MISSING from AGENTS.md command table (present in commands/ but no table row):"
  for cmd in "${MISSING_FROM_TABLE[@]}"; do
    echo "  - /$cmd"
  done
  echo ""
fi

if [ ${#ORPHANED_IN_TABLE[@]} -gt 0 ]; then
  echo "ORPHANED in AGENTS.md command table (table row but no commands/<file>.md):"
  for cmd in "${ORPHANED_IN_TABLE[@]}"; do
    echo "  - /$cmd"
  done
  echo ""
fi

if [ "$FAIL" -eq 0 ]; then
  echo "PASS: AGENTS.md command table is in sync with commands/."
  exit 0
else
  echo "FAIL: AGENTS.md command table is out of sync."
  echo "Fix: hand-edit the table at the bottom of AGENTS.md to add the missing rows"
  echo "or remove the orphaned ones."
  exit 1
fi
