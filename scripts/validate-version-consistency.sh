#!/usr/bin/env bash
# validate-version-consistency.sh
# Ensures plugin.json and marketplace.json report the same version.
# Prevents drift that confuses the update skill's version detection.
set -euo pipefail

PLUGIN_FILE=".claude-plugin/plugin.json"
MARKET_FILE=".claude-plugin/marketplace.json"

if [[ ! -f "$PLUGIN_FILE" ]]; then
  echo "FAIL: $PLUGIN_FILE not found"
  exit 1
fi

if [[ ! -f "$MARKET_FILE" ]]; then
  echo "FAIL: $MARKET_FILE not found"
  exit 1
fi

# Extract versions using node (available in CI)
PLUGIN_VER=$(node -p "JSON.parse(require('fs').readFileSync('$PLUGIN_FILE','utf8')).version")
MARKET_VER=$(node -p "JSON.parse(require('fs').readFileSync('$MARKET_FILE','utf8')).plugins[0].version")

if [[ "$PLUGIN_VER" != "$MARKET_VER" ]]; then
  echo "FAIL: Version mismatch"
  echo "  $PLUGIN_FILE:  $PLUGIN_VER"
  echo "  $MARKET_FILE: $MARKET_VER"
  echo ""
  echo "  Both files must report the same version."
  exit 1
fi

echo "PASS: Versions consistent ($PLUGIN_VER)"
