#!/usr/bin/env bash
# check-stale-bundle-refs.sh — Terminology guard for bundles→workflows rename
#
# Scans tracked files for stale "bundle" references that should now be "workflow".
# Excludes known exceptions (historical docs, archives, samples, drafts).
#
# Exit codes:
#   0 — No stale references found (or only excluded matches)
#   1 — Stale references detected (advisory during v2.9.0 transition)
#
# Usage:
#   ./scripts/check-stale-bundle-refs.sh          # Run from repo root
#   ./scripts/check-stale-bundle-refs.sh --strict  # Fail on any match (post-v2.9.0)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

STRICT=false
if [[ "${1:-}" == "--strict" ]]; then
  STRICT=true
fi

echo "=== Terminology Guard: checking for stale 'bundle' references ==="
echo ""

# Grep for bundle/bundles (case-insensitive) across tracked files,
# excluding known exceptions.
MATCHES=$(git -C "$ROOT" grep -inP '\bbundles?\b' -- \
  ':!docs/releases/Release_v2.0.md' \
  ':!docs/releases/Release_v2.1.md' \
  ':!docs/releases/Release_v2.2.md' \
  ':!docs/releases/Release_v2.3.md' \
  ':!docs/releases/Release_v2.4.md' \
  ':!docs/releases/Release_v2.5.md' \
  ':!docs/releases/Release_v2.6.md' \
  ':!docs/releases/Release_v2.7.0.md' \
  ':!docs/releases/Release_v2.8.0.md' \
  ':!docs/internal/_working/distilled/_archived/' \
  ':!docs/internal/efforts/F-13-workflow-expansion/bundle_*' \
  ':!docs/internal/efforts/M-19-bundles-to-workflows/' \
  ':!.github/issues-archive/' \
  ':!.github/issues-drafts/' \
  ':!library/skill-output-samples/' \
  ':!scripts/README_SCRIPTS.md' \
  ':!scripts/check-stale-bundle-refs.sh' \
  ':!scripts/check-stale-bundle-refs.ps1' \
  ':!docs/internal/release-plans/v2.9.0/_archive/' \
  ':!docs/internal/milestones/' \
  2>/dev/null || true)

if [[ -z "$MATCHES" ]]; then
  echo "PASS: No stale 'bundle' references found."
  exit 0
fi

COUNT=$(echo "$MATCHES" | wc -l)
echo "Found $COUNT potential stale reference(s):"
echo ""
echo "$MATCHES"
echo ""

if [[ "$STRICT" == true ]]; then
  echo "FAIL (--strict): $COUNT stale 'bundle' reference(s) found."
  exit 1
else
  echo "WARN: $COUNT stale 'bundle' reference(s) found (advisory mode)."
  echo "  Run with --strict to treat as failure."
  exit 0
fi
