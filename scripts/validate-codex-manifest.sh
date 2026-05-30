#!/usr/bin/env bash
# validate-codex-manifest.sh - Assert .codex-plugin/plugin.json is a valid Codex plugin manifest.
#
# Added v2.22.0 with the Codex manifest. Codex reads .codex-plugin/plugin.json
# (not .claude-plugin/), so this guards the load-bearing identity fields that
# determine whether Codex can ingest the plugin. Asserts identity only (D4):
#   - file parses as JSON
#   - name == "pm-skills"
#   - version is valid semver (X.Y.Z)
#   - skills begins with "./" and resolves to an existing directory
#   - interface is an object
# Cosmetic fields (brandColor, screenshots, defaultPrompt, logo, ...) are NOT
# asserted; real first-party Codex plugins vary. Version EQUALITY across the four
# manifests is owned by validate-version-consistency.
#
# Exit codes:
#   0 - manifest valid
#   1 - manifest missing or invalid
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MANIFEST="$ROOT/.codex-plugin/plugin.json"

echo "=== Codex Manifest Validation ==="

if [[ ! -f "$MANIFEST" ]]; then
  echo "FAIL: $MANIFEST not found"
  exit 1
fi

if ! node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'))" "$MANIFEST" 2>/dev/null; then
  echo "FAIL: .codex-plugin/plugin.json does not parse as JSON"
  exit 1
fi

NAME=$(node -p "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8')).name || ''" "$MANIFEST")
VERSION=$(node -p "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8')).version || ''" "$MANIFEST")
SKILLS=$(node -p "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8')).skills || ''" "$MANIFEST")
IFACE=$(node -p "typeof JSON.parse(require('fs').readFileSync(process.argv[1],'utf8')).interface" "$MANIFEST")

FAIL=0
[[ "$NAME" == "pm-skills" ]] || { echo "FAIL: name must be 'pm-skills' (got '$NAME')"; FAIL=1; }
echo "$VERSION" | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+$' || { echo "FAIL: version not valid semver (got '$VERSION')"; FAIL=1; }
case "$SKILLS" in
  ./*) ;;
  *) echo "FAIL: skills must begin with './' (got '$SKILLS')"; FAIL=1 ;;
esac
if [[ -n "$SKILLS" && ! -d "$ROOT/${SKILLS#./}" ]]; then
  echo "FAIL: skills path does not resolve to a directory ('$SKILLS')"; FAIL=1
fi
[[ "$IFACE" == "object" ]] || { echo "FAIL: interface must be an object (got '$IFACE')"; FAIL=1; }

if [[ "$FAIL" -eq 0 ]]; then
  echo "PASS: valid (name=$NAME, version=$VERSION, skills=$SKILLS, interface=object)"
  exit 0
fi
echo "FAIL: .codex-plugin/plugin.json invalid"
exit 1
