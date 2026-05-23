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

# README current-version-claim surfaces must match plugin.json (FU-9, v2.19.0).
# This validator owns version-CLAIM surfaces; check-version-references stays
# advisory for provenance refs ("since vX.Y.Z"). The README badge form
# "version-X.Y.Z" is NOT matched by check-version-references' vX.Y.Z regex,
# so a stale badge would otherwise slip every gate; assert it here.
README_FILE="README.md"
if [[ -f "$README_FILE" ]]; then
  BADGE_VER=$(grep -oE 'badge/version-v?[0-9]+\.[0-9]+\.[0-9]+' "$README_FILE" | head -1 | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' || true)
  if [[ -n "$BADGE_VER" && "$BADGE_VER" != "$PLUGIN_VER" ]]; then
    echo "FAIL: README version badge ($BADGE_VER) does not match plugin.json ($PLUGIN_VER)"
    exit 1
  fi
  ATAGLANCE_VER=$(grep -E '\*\*Current version\*\*' "$README_FILE" | grep -oE 'v[0-9]+\.[0-9]+\.[0-9]+' | head -1 | sed 's/^v//' || true)
  if [[ -n "$ATAGLANCE_VER" && "$ATAGLANCE_VER" != "$PLUGIN_VER" ]]; then
    echo "FAIL: README 'Current version' row ($ATAGLANCE_VER) does not match plugin.json ($PLUGIN_VER)"
    exit 1
  fi
fi

echo "PASS: Versions consistent ($PLUGIN_VER); README badge + Current-version row match"
