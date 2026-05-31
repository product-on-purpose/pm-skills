#!/usr/bin/env bash
# check-skill-sample-coverage.sh
#
# Enforce that every in-scope content skill has a library thread sample for each
# of the three canonical threads (storevine, brainshelf, workbench). In scope =
# phase / foundation / tool skills, minus a documented exemption allowlist.
#
# Closes the v2.23.0 gap where a new skill could ship with no library samples
# because nothing couples "a skill exists in skills/" to "its samples exist in
# library/skill-output-samples/". Spec: docs/internal/release-plans/v2.23.0/spec_check-skill-sample-coverage.md
#
# bash-3.2 portable: no associative arrays, no mapfile.
set -u

REPO="$(cd "$(dirname "$0")/.." && pwd)"
SKILLS_DIR="$REPO/skills"
LIB_DIR="$REPO/library/skill-output-samples"
THREADS="storevine brainshelf workbench"

# Explicit per-skill exemptions from the 3-thread rule (documented in README_SAMPLES.md).
# All utility-* skills are exempt by class (single-thread or sub-agent-samples convention).
is_exempt_name() {
  case "$1" in
    deliver-acceptance-criteria) return 0 ;;  # documented storevine-only single-thread sample
    *) return 1 ;;
  esac
}

# Classes that must carry a full three-thread sample set.
in_scope_class() {
  case "$1" in
    discover|define|develop|deliver|measure|iterate|foundation|tool) return 0 ;;
    *) return 1 ;;  # utility and anything else: exempt
  esac
}

fail=0
checked=0

for skill_md in "$SKILLS_DIR"/*/SKILL.md; do
  [ -f "$skill_md" ] || continue
  name="$(basename "$(dirname "$skill_md")")"
  cls="$(awk '/^metadata:/{m=1} m && /^  (classification|phase):/{print $2; exit}' "$skill_md")"
  in_scope_class "$cls" || continue
  is_exempt_name "$name" && continue
  checked=$((checked + 1))
  sd="$LIB_DIR/$name"
  for th in $THREADS; do
    if ls "$sd"/sample_"$name"_"$th"_*.md >/dev/null 2>&1 || [ -f "$sd/sample_${name}_${th}.md" ]; then
      :
    else
      echo "FAIL: $name ($cls) is missing a '$th' thread sample (expected library/skill-output-samples/$name/sample_${name}_${th}_*.md)"
      fail=1
    fi
  done
done

echo "Checked $checked in-scope skills (phase / foundation / tool, minus exemptions)."
if [ "$fail" = "1" ]; then
  echo "FAIL: one or more in-scope skills are missing required thread samples."
  echo "Fix: add library/skill-output-samples/<skill>/sample_<skill>_<thread>_*.md for storevine, brainshelf, and workbench (or add a documented exemption to this script)."
  exit 1
fi
echo "PASS: all in-scope skills have storevine + brainshelf + workbench thread samples."
exit 0
