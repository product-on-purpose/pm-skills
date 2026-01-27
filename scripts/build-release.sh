#!/usr/bin/env bash
# pm-skills v2.0 release packager
# Builds pm-skills-v2.0.zip with flat skills/commands and helper scripts.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/dist"
STAGE="$OUT/stage"
ZIP="$OUT/pm-skills-v2.0.zip"

rm -rf "$OUT"
mkdir -p "$STAGE"

"$ROOT/scripts/sync-claude.sh"

rsync -a --delete \
  "$ROOT/skills" \
  "$ROOT/commands" \
  "$ROOT/_bundles" \
  "$ROOT/scripts" \
  "$ROOT/.claude/pm-skills-for-claude.md" \
  "$ROOT/README.md" "$ROOT/QUICKSTART.md" "$ROOT/AGENTS.md" "$ROOT/CHANGELOG.md" "$ROOT/docs" \
  "$STAGE/"

# Ensure .claude discovery dirs are NOT shipped populated
rm -rf "$STAGE/.claude/skills" "$STAGE/.claude/commands"

(cd "$STAGE" && zip -r "$ZIP" .)
sha256sum "$ZIP" > "$ZIP.sha256"

# Simple manifest
cat > "$OUT/manifest.txt" <<EOF
pm-skills v2.0 release
ZIP: $(basename "$ZIP")
SHA256: $(cut -d' ' -f1 "$ZIP.sha256")
EOF

echo "Release built: $ZIP"
