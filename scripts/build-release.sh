#!/usr/bin/env bash
# pm-skills release packager
# Builds pm-skills-vX.Y.Z.zip with flat skills/commands and helper scripts.

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

rm -rf "$OUT"
mkdir -p "$STAGE"

"$ROOT/scripts/sync-claude.sh"

if command -v rsync >/dev/null 2>&1; then
  rsync -a --delete \
    "$ROOT/skills" \
    "$ROOT/commands" \
    "$ROOT/_bundles" \
    "$ROOT/scripts" \
    "$ROOT/.claude/pm-skills-for-claude.md" \
    "$ROOT/README.md" "$ROOT/QUICKSTART.md" "$ROOT/AGENTS.md" "$ROOT/CHANGELOG.md" "$ROOT/docs" \
    "$STAGE/"
else
  echo "rsync not found; using cp -a fallback"
  cp -a \
    "$ROOT/skills" \
    "$ROOT/commands" \
    "$ROOT/_bundles" \
    "$ROOT/scripts" \
    "$ROOT/.claude/pm-skills-for-claude.md" \
    "$ROOT/README.md" "$ROOT/QUICKSTART.md" "$ROOT/AGENTS.md" "$ROOT/CHANGELOG.md" "$ROOT/docs" \
    "$STAGE/"
fi

PYTHON_CMD=""
for candidate in python3 python; do
  if command -v "$candidate" >/dev/null 2>&1; then
    PYTHON_CMD="$candidate"
    break
  fi
done

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
