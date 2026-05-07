#!/usr/bin/env bash
# validate-plugin-install.sh
# Validates that the Claude Code plugin install path will work end-to-end.
# Catches schema drift in .claude-plugin/marketplace.json and .claude-plugin/plugin.json
# that would silently break /plugin marketplace add.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

PLUGIN_FILE=".claude-plugin/plugin.json"
MARKET_FILE=".claude-plugin/marketplace.json"
FAIL=0

# Helper: read a JSON value via node. Uses relative path passed via stdin to avoid
# Windows / Git Bash path-translation issues.
json_get() {
  local file="$1"
  local path="$2"
  if command -v node >/dev/null 2>&1; then
    cat "$file" | node -e "
      let raw = '';
      process.stdin.on('data', c => raw += c);
      process.stdin.on('end', () => {
        try {
          const data = JSON.parse(raw);
          const path = process.argv[1] ? process.argv[1].split('.') : [];
          let v = data;
          for (const k of path) {
            if (v === null || v === undefined) { v = undefined; break; }
            if (Array.isArray(v) && /^\d+$/.test(k)) { v = v[parseInt(k, 10)]; }
            else { v = v[k]; }
          }
          if (v === undefined || v === null) { console.log(''); }
          else if (typeof v === 'object') { console.log(JSON.stringify(v)); }
          else { console.log(v); }
        } catch (e) { console.log(''); }
      });
    " "$path" 2>/dev/null
  else
    echo "ERROR: need node to parse JSON" >&2
    return 2
  fi
}

# === Existence checks ===

if [[ ! -f "$PLUGIN_FILE" ]]; then
  echo "FAIL: $PLUGIN_FILE not found"
  echo "      Plugin install requires .claude-plugin/plugin.json at the canonical path."
  FAIL=1
fi

if [[ ! -f "$MARKET_FILE" ]]; then
  echo "FAIL: $MARKET_FILE not found"
  echo "      /plugin marketplace add requires .claude-plugin/marketplace.json at the canonical path."
  echo "      If marketplace.json exists at the repo root, move it to .claude-plugin/ via 'git mv'."
  FAIL=1
fi

if [[ $FAIL -eq 1 ]]; then
  exit 1
fi

# === Plugin manifest schema checks ===

PLUGIN_NAME=$(json_get "$PLUGIN_FILE" "name")
PLUGIN_VER=$(json_get "$PLUGIN_FILE" "version")

if [[ -z "$PLUGIN_NAME" ]]; then
  echo "FAIL: plugin.json missing required field: name"
  FAIL=1
fi

if [[ -z "$PLUGIN_VER" ]]; then
  echo "FAIL: plugin.json missing required field: version"
  FAIL=1
fi

# === Marketplace manifest schema checks ===

MARKET_NAME=$(json_get "$MARKET_FILE" "name")
MARKET_OWNER=$(json_get "$MARKET_FILE" "owner")
MARKET_OWNER_NAME=$(json_get "$MARKET_FILE" "owner.name")
MARKET_PLUGINS=$(json_get "$MARKET_FILE" "plugins")

if [[ -z "$MARKET_NAME" ]]; then
  echo "FAIL: marketplace.json missing required field: name"
  FAIL=1
fi

if [[ -z "$MARKET_OWNER" ]]; then
  echo "FAIL: marketplace.json missing required field: owner (must be an object with at least a 'name' field)"
  echo "      Example: { \"owner\": { \"name\": \"product-on-purpose\" } }"
  FAIL=1
fi

if [[ -z "$MARKET_OWNER_NAME" ]]; then
  echo "FAIL: marketplace.json owner.name is missing or empty"
  FAIL=1
fi

if [[ -z "$MARKET_PLUGINS" || "$MARKET_PLUGINS" == "[]" ]]; then
  echo "FAIL: marketplace.json plugins array is missing or empty"
  FAIL=1
fi

# === Per-plugin entry checks (first plugin only) ===

PLUGIN0_NAME=$(json_get "$MARKET_FILE" "plugins.0.name")
PLUGIN0_VER=$(json_get "$MARKET_FILE" "plugins.0.version")
PLUGIN0_AUTHOR=$(json_get "$MARKET_FILE" "plugins.0.author")
PLUGIN0_AUTHOR_NAME=$(json_get "$MARKET_FILE" "plugins.0.author.name")
PLUGIN0_SOURCE=$(json_get "$MARKET_FILE" "plugins.0.source")

if [[ -z "$PLUGIN0_NAME" ]]; then
  echo "FAIL: marketplace.json plugins[0] missing required field: name"
  FAIL=1
fi

if [[ -z "$PLUGIN0_VER" ]]; then
  echo "FAIL: marketplace.json plugins[0] missing required field: version"
  FAIL=1
fi

if [[ -z "$PLUGIN0_SOURCE" ]]; then
  echo "FAIL: marketplace.json plugins[0] missing required field: source"
  FAIL=1
fi

if [[ -n "$PLUGIN0_AUTHOR" ]]; then
  # Author present. If it's not an object (no name field), fail.
  if [[ -z "$PLUGIN0_AUTHOR_NAME" ]]; then
    echo "FAIL: marketplace.json plugins[0].author must be an object with a 'name' field"
    echo "      String form (e.g., \"author\": \"someone\") is rejected by Claude Code's schema."
    FAIL=1
  fi
fi

# === Cross-manifest version consistency ===

if [[ -n "$PLUGIN_VER" && -n "$PLUGIN0_VER" && "$PLUGIN_VER" != "$PLUGIN0_VER" ]]; then
  echo "FAIL: plugin.json version ($PLUGIN_VER) does not match marketplace.json plugins[0].version ($PLUGIN0_VER)"
  FAIL=1
fi

# === Plugin name consistency ===

if [[ -n "$PLUGIN_NAME" && -n "$PLUGIN0_NAME" && "$PLUGIN_NAME" != "$PLUGIN0_NAME" ]]; then
  echo "FAIL: plugin.json name ($PLUGIN_NAME) does not match marketplace.json plugins[0].name ($PLUGIN0_NAME)"
  FAIL=1
fi

# === Source resolution check (advisory WARN only) ===

if [[ -n "$PLUGIN0_SOURCE" ]]; then
  SOURCE_FIRST_CHAR="${PLUGIN0_SOURCE:0:1}"
  if [[ "$SOURCE_FIRST_CHAR" != "{" ]]; then
    # String-form source. Strip leading "./" if present.
    NORMALIZED="${PLUGIN0_SOURCE#./}"
    NORMALIZED="${NORMALIZED:-.}"
    if [[ ! -d ".claude-plugin/$NORMALIZED" ]] && [[ ! -d "$NORMALIZED" ]]; then
      echo "WARN: marketplace.json plugins[0].source ($PLUGIN0_SOURCE) does not resolve to an existing directory"
    fi
  fi
fi

# === Final result ===

if [[ $FAIL -eq 0 ]]; then
  echo "PASS: plugin install path validated"
  echo "  plugin.json: $PLUGIN_NAME @ $PLUGIN_VER"
  echo "  marketplace.json: $MARKET_NAME (owner: $MARKET_OWNER_NAME)"
  echo "  plugin entry: $PLUGIN0_NAME @ $PLUGIN0_VER (source: $PLUGIN0_SOURCE)"
fi

exit "$FAIL"
