#!/usr/bin/env bash
# check-workflow-generator-coverage.sh - Assert workflow generator covers every source workflow.
#
# v2.15.1 addition closing audit finding A03 from v2.15.x audit.
# The v2.15.0 release shipped 3 new workflows (foundation-sprint, design-sprint,
# foundation-to-design) whose individual page outputs were correctly generated
# but whose index table rows were silently dropped because the generator's
# hardcoded workflow_info dict lacked entries for them. The
# check-generated-content-untouched validator missed this because it compares
# generator output to file content (consistency), not generator output to
# source-of-truth (correctness).
#
# This validator asserts a stronger contract: every workflow source file in
# _workflows/*.md must appear as a row in the generated
# site/src/content/docs/workflows/index.md AND have a corresponding generated
# page in site/src/content/docs/workflows/ (output of scripts/gen-site.mjs,
# gitignored, rebuilt per build).
#
# Note: the Python generator with the hardcoded dict was retired in the
# Pattern S reorg (v2.25.1); scripts/gen-site.mjs now derives both the pages
# and the index dynamically from _workflows/*.md, so the original silent-drop
# mechanism is structurally gone. This validator remains the CI-side fence
# against the surviving failure modes: a stale generated tree (generator not
# re-run) or a generator regression that drops output.
#
# Exit codes:
#   0 - All source workflows are covered by the index and have individual pages
#   1 - Coverage gap detected
#
# Usage:
#   ./scripts/check-workflow-generator-coverage.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

WORKFLOWS_SRC="$ROOT/_workflows"
WORKFLOWS_OUT="$ROOT/site/src/content/docs/workflows"
WORKFLOWS_INDEX="$WORKFLOWS_OUT/index.md"

echo "=== Workflow Generator Coverage Check ==="
echo ""

if [ ! -d "$WORKFLOWS_SRC" ]; then
  echo "FAIL: source directory not found: $WORKFLOWS_SRC"
  exit 1
fi

if [ ! -f "$WORKFLOWS_INDEX" ]; then
  echo "FAIL: generated index not found: $WORKFLOWS_INDEX"
  exit 1
fi

FAIL=0

# Enumerate source workflows (exclude README.md)
SOURCE_WORKFLOWS=$(find "$WORKFLOWS_SRC" -maxdepth 1 -name '*.md' -type f ! -name 'README.md' -exec basename {} .md \; | sort)

# Check 1: each source workflow has an individual generated page
echo "Checking individual generated pages:"
for stem in $SOURCE_WORKFLOWS; do
  if [ -f "$WORKFLOWS_OUT/$stem.md" ]; then
    echo "  OK:   $stem.md present in site/src/content/docs/workflows/"
  else
    echo "  FAIL: $stem.md missing from site/src/content/docs/workflows/ (source exists but no generated page)"
    FAIL=1
  fi
done

echo ""

# Check 2: each source workflow appears as a row in the index table
# Index rows look like: | [Display Name](stem.md) | ... | ... |
echo "Checking index-table coverage:"
for stem in $SOURCE_WORKFLOWS; do
  if grep -qE "\]\(${stem}\.md\)" "$WORKFLOWS_INDEX"; then
    echo "  OK:   $stem.md linked from index"
  else
    echo "  FAIL: $stem.md NOT linked from $WORKFLOWS_INDEX (stale or incomplete generated index; re-run the generator)"
    FAIL=1
  fi
done

echo ""

# Counts summary
SOURCE_COUNT=$(echo "$SOURCE_WORKFLOWS" | wc -l | tr -d ' ')
INDEX_ROWS=$(grep -cE "^\| \[" "$WORKFLOWS_INDEX" || true)
GENERATED_PAGES=$(find "$WORKFLOWS_OUT" -maxdepth 1 -name '*.md' -type f ! -name 'index.md' ! -name 'README.md' | wc -l | tr -d ' ')

echo "Summary:"
echo "  Source workflows:    $SOURCE_COUNT"
echo "  Generated pages:     $GENERATED_PAGES"
echo "  Index table rows:    $INDEX_ROWS"

if [ "$SOURCE_COUNT" != "$INDEX_ROWS" ] || [ "$SOURCE_COUNT" != "$GENERATED_PAGES" ]; then
  echo ""
  echo "FAIL: count mismatch (source=$SOURCE_COUNT, generated=$GENERATED_PAGES, index=$INDEX_ROWS)"
  FAIL=1
fi

echo ""

if [ "$FAIL" -eq 0 ]; then
  echo "PASS: every workflow source has an individual page and an index-table row."
  exit 0
else
  echo "FAIL: workflow generator coverage gap detected."
  echo "Fix: re-run 'node scripts/gen-site.mjs' to rebuild the generated site content."
  exit 1
fi
