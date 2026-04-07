#!/usr/bin/env bash
# pm-skills release packager
# Builds pm-skills-vX.Y.Z.zip with skills/commands, sample library, docs, and helper scripts.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/dist"
STAGE="$OUT/stage"

VERSION="${1:-${VERSION:-}}"
if [[ -z "$VERSION" ]]; then
  VERSION="$(git describe --tags --abbrev=0 2>/dev/null || true)"
fi
VERSION="${VERSION#v}"
VERSION="${VERSION:-2.0.1}"
ZIP="$OUT/pm-skills-v${VERSION}.zip"

PYTHON_CMD=""
for candidate in python3 python; do
  if command -v "$candidate" >/dev/null 2>&1; then
    PYTHON_CMD="$candidate"
    break
  fi
done

NODE_CMD=""
if command -v node >/dev/null 2>&1; then
  NODE_CMD="node"
fi

rm -rf "$OUT"
mkdir -p "$STAGE"

"$ROOT/scripts/sync-claude.sh"

if command -v rsync >/dev/null 2>&1; then
  rsync -a --delete \
    "$ROOT/skills" \
    "$ROOT/commands" \
    "$ROOT/_workflows" \
    "$ROOT/library" \
    "$ROOT/scripts" \
    "$ROOT/.claude-plugin" \
    "$ROOT/.claude/pm-skills-for-claude.md" \
    "$ROOT/README.md" "$ROOT/QUICKSTART.md" "$ROOT/AGENTS.md" "$ROOT/CHANGELOG.md" "$ROOT/docs" \
    "$STAGE/"
else
  echo "rsync not found; using cp -a fallback"
  cp -a \
    "$ROOT/skills" \
    "$ROOT/commands" \
    "$ROOT/_workflows" \
    "$ROOT/library" \
    "$ROOT/scripts" \
    "$ROOT/.claude-plugin" \
    "$ROOT/.claude/pm-skills-for-claude.md" \
    "$ROOT/README.md" "$ROOT/QUICKSTART.md" "$ROOT/AGENTS.md" "$ROOT/CHANGELOG.md" "$ROOT/docs" \
    "$STAGE/"
fi

# Keep tracked internal governance docs in-repo, but do not ship them.
rm -rf "$STAGE/docs/internal"

# Ensure sample library is present in staged artifact.
STAGE_SAMPLE_DIR="$STAGE/library/skill-output-samples"
if [[ ! -d "$STAGE_SAMPLE_DIR" ]]; then
  echo "Missing required sample library directory: $STAGE_SAMPLE_DIR"
  exit 1
fi

# Validate actual sample outputs (exclude root docs like SAMPLE_CREATION.md).
if [[ -z "$(find "$STAGE_SAMPLE_DIR" -mindepth 2 -type f -name "sample_*.md" -print -quit)" ]]; then
  echo "No sample files found in staged sample library: $STAGE_SAMPLE_DIR"
  exit 1
fi

# Ensure plugin manifest exists and version matches release version in staged artifact.
STAGE_PLUGIN_MANIFEST="$STAGE/.claude-plugin/plugin.json"
if [[ ! -f "$STAGE_PLUGIN_MANIFEST" ]]; then
  echo "Missing required plugin manifest: $STAGE_PLUGIN_MANIFEST"
  exit 1
fi

if [[ -n "$PYTHON_CMD" ]]; then
  "$PYTHON_CMD" - "$STAGE_PLUGIN_MANIFEST" "$VERSION" <<'PY'
import json
import sys
from pathlib import Path

manifest_path = Path(sys.argv[1])
version = sys.argv[2]

data = json.loads(manifest_path.read_text(encoding="utf-8"))
data["version"] = version
manifest_path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
PY
elif [[ -n "$NODE_CMD" ]]; then
  "$NODE_CMD" - "$STAGE_PLUGIN_MANIFEST" "$VERSION" <<'NODE'
const fs = require("fs");

const manifestPath = process.argv[2];
const version = process.argv[3];
const data = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
data.version = version;
fs.writeFileSync(manifestPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
NODE
else
  sed -i.bak -E "s/(\"version\"[[:space:]]*:[[:space:]]*\")[^\"]+(\")/\1$VERSION\2/" "$STAGE_PLUGIN_MANIFEST"
  rm -f "$STAGE_PLUGIN_MANIFEST.bak"
fi

if ! grep -Eq "\"version\"[[:space:]]*:[[:space:]]*\"$VERSION\"" "$STAGE_PLUGIN_MANIFEST"; then
  echo "Failed to set staged plugin manifest version to $VERSION"
  exit 1
fi

# Ensure .claude discovery dirs are NOT shipped populated
rm -rf "$STAGE/.claude/skills" "$STAGE/.claude/commands"

if command -v zip >/dev/null 2>&1; then
  (cd "$STAGE" && zip -r "$ZIP" .)
elif [[ -n "$PYTHON_CMD" ]]; then
  echo "zip not found; using $PYTHON_CMD zipfile"
  (cd "$STAGE" && "$PYTHON_CMD" - "$ZIP" <<'PY'
import sys
import zipfile
from pathlib import Path

zip_path = Path(sys.argv[1]).resolve()
root = Path(".").resolve()
with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
    for path in root.rglob("*"):
        zf.write(path, path.relative_to(root))
PY
  )
else
  echo "zip and python are unavailable; cannot create archive."
  exit 1
fi

if command -v sha256sum >/dev/null 2>&1; then
  HASH="$(sha256sum "$ZIP" | awk '{print $1}')"
elif [[ -n "$PYTHON_CMD" ]]; then
  HASH="$("$PYTHON_CMD" - <<'PY' "$ZIP"
import sys, hashlib
from pathlib import Path

data = Path(sys.argv[1]).read_bytes()
print(hashlib.sha256(data).hexdigest())
PY
)"
else
  echo "Unable to compute sha256 (missing sha256sum and python)."
  exit 1
fi
printf "%s  %s\n" "$HASH" "$(basename "$ZIP")" > "$ZIP.sha256"

# Simple manifest
cat > "$OUT/manifest.txt" <<EOF
pm-skills v${VERSION} release
ZIP: $(basename "$ZIP")
SHA256: $HASH
EOF

echo "Release built: $ZIP"
