#!/usr/bin/env bash
# check-internal-link-validity.sh - Validate internal links and anchors in docs.
#
# Walks docs/**/*.{md,mdx} (excluding docs/internal/ and a hardcoded list
# mirroring src/content.config.ts glob excludes) PLUS the repo-root README.md
# and AGENTS.md, extracts markdown links of the form [text](path), and:
#   - resolves relative/absolute file targets and verifies existence
#   - resolves same-page #anchor targets against the source file's GitHub-style
#     heading slugs (FU-3, v2.19.0)
# Skips external links (http(s), mailto, etc.) and template placeholders.
#
# Cross-file path#anchor targets verify the path only (the anchor fragment is
# not resolved across files); same-page #anchor targets are fully resolved.
#
# Closes audit gap G4 (link checking in docs).
#
# Posture: ENFORCING in v2.14.0+ (W10-promoted from advisory). Source-of-truth
# for excluded paths migrated from mkdocs.yml exclude_docs to a hardcoded
# array here (W12 Material deprecation). If src/content.config.ts changes its
# glob excludes, update EXCLUDE_PATHS below to match. README.md + AGENTS.md
# added to the fileset and same-page anchor resolution added in v2.19.0 (FU-3).
#
# External link validation is NOT done by this script. Per audit Section 16.6,
# external links use a different flow (lychee or similar) that requires network
# access and tolerates flakiness.
#
# Exit codes:
#   0 - All internal links/anchors resolve OR advisory mode (default)
#   1 - Broken links/anchors found AND --strict was passed
#
# Usage:
#   ./scripts/check-internal-link-validity.sh
#   ./scripts/check-internal-link-validity.sh --strict

set -euo pipefail

# Ensure UTF-8 locale so 'grep -P' (Perl regex) works on systems with
# empty default LANG/LC_ALL (notably Windows Git Bash). On Linux runners
# C.UTF-8 is typically already set; this is defensive. Without a UTF-8
# locale, 'grep -P' silently fails with 'supports only unibyte and UTF-8
# locales' and the script reports 0 broken links even when broken links
# exist (W13 FU6 surface; closes the bash/pwsh parity gap).
export LC_ALL="${LC_ALL:-C.UTF-8}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

STRICT=false
if [[ "${1:-}" == "--strict" ]]; then
  STRICT=true
fi

echo "=== Internal Link Validity Check ==="
echo ""

# Hardcoded exclusion list. Mirrors src/content.config.ts glob excludes
# under docs/. Was previously read from mkdocs.yml exclude_docs in v2.13.x.
# Trailing slash means "directory prefix"; no trailing slash means "exact file".
EXCLUDE_PATHS=(
  "templates/"
  # GitHub-directory landing pages (canonical user-facing pages are sibling
  # index.md / index.mdx); pattern established W4 + W13 B2.5 + W13 FU7
  "workflows/README.md"
  "reference/README.md"
  "skills/README.md"
  "guides/README.md"
  "concepts/README.md"
  "contributing/README.md"
  "getting-started/README.md"
  "showcase/README.md"
  "releases/README.md"
)

is_excluded() {
  local fs_file="$1"
  local exc_path
  for exc_path in "${EXCLUDE_PATHS[@]}"; do
    if [[ "$exc_path" == */ ]]; then
      [[ "$fs_file" == "${exc_path}"* ]] && return 0
    else
      [[ "$fs_file" == "$exc_path" ]] && return 0
    fi
  done
  return 1
}

# Print the GitHub-style heading-slug set for a markdown file, one slug per
# line, with -N suffixes for duplicate headings (matching GitHub's behavior).
# Fenced code blocks are skipped so a '# comment' line inside a fence is not
# mistaken for a heading. Inline code backticks and [text](url) link syntax
# are reduced to their text before slugging.
heading_slugs() {
  awk '
    /^(```|~~~)/ { infence = !infence; next }
    infence { next }
    /^#{1,6}[ \t]/ {
      h = $0
      sub(/^#{1,6}[ \t]+/, "", h)        # strip leading hashes + space
      sub(/[ \t]+#+[ \t]*$/, "", h)      # strip closing ATX hashes
      s = tolower(h)
      gsub(/`/, "", s)                   # inline-code backticks
      gsub(/\]\([^)]*\)/, "", s)         # ](url) of a markdown link
      gsub(/[][]/, "", s)                # leftover [ ]
      gsub(/[^a-z0-9 _-]/, "", s)        # drop remaining punctuation (ASCII)
      gsub(/ /, "-", s)                  # spaces -> hyphens
      if (s == "") next
      n[s]++
      if (n[s] == 1) print s; else print s "-" (n[s] - 1)
    }
  ' "$1"
  # GitHub also honors explicit id/name anchors on <a> tags (e.g. the README
  # "back to top" target <a id="readme-top">); add them to the slug set verbatim
  # (lowercased) so a same-page link to them resolves. (FU-3 / Codex P2.)
  grep -oE '<a[[:space:]]+[^>]*(id|name)="[^"]+"' "$1" 2>/dev/null \
    | sed -E 's/.*(id|name)="([^"]+)".*/\2/' | tr '[:upper:]' '[:lower:]' || true
}

# Build the work list as TAB-separated "<full_path>\t<display>\t<abs_base>".
# docs files resolve absolute (/foo) links against docs/; the root README.md
# and AGENTS.md resolve them against the repo root.
WORK="$(mktemp)"
trap 'rm -f "$WORK"' EXIT

while IFS= read -r p; do
  [[ -z "$p" ]] && continue
  rel="${p#"$ROOT/docs/"}"
  is_excluded "$rel" && continue
  printf '%s\t%s\t%s\n' "$p" "docs/$rel" "$ROOT/docs" >> "$WORK"
done < <(find "$ROOT/docs" \( -name "*.md" -o -name "*.mdx" \) -type f | grep -v "/docs/internal/" | sort)

for rf in README.md AGENTS.md; do
  [[ -f "$ROOT/$rf" ]] && printf '%s\t%s\t%s\n' "$ROOT/$rf" "$rf" "$ROOT" >> "$WORK"
done

CHECKED=0
BROKEN_LINKS=()

while IFS=$'\t' read -r full_path display abs_base; do
  [[ -z "$full_path" ]] && continue
  source_dir=$(dirname "$full_path")
  CHECKED=$((CHECKED + 1))
  SLUGS="$(heading_slugs "$full_path")"

  # Extract all markdown links: [text](path). grep -oP captures the path only.
  while IFS= read -r link; do
    [[ -z "$link" ]] && continue

    # Skip external (http://, https://, mailto:, ftp://, ws://, wss://, file://, javascript:, tel:, data:)
    if [[ "$link" =~ ^(https?:|mailto:|ftp:|wss?:|file:|javascript:|tel:|data:) ]]; then
      continue
    fi

    # Same-page anchor (e.g., "#section"): resolve against this file's headings.
    if [[ "$link" =~ ^# ]]; then
      anchor="${link#\#}"
      anchor="$(printf '%s' "$anchor" | tr '[:upper:]' '[:lower:]')"
      [[ -z "$anchor" ]] && continue   # bare "#" targets the page top
      if ! printf '%s\n' "$SLUGS" | grep -qxF -- "$anchor"; then
        BROKEN_LINKS+=("$display: broken anchor ($link) -> no heading slug '#$anchor'")
      fi
      continue
    fi

    # Skip template placeholders ({{path}}, {release-url}, <placeholder>, etc.)
    if [[ "$link" == *'{'* || "$link" == *'}'* || "$link" == *'<'* || "$link" == *'>'* ]]; then
      continue
    fi

    # Strip query string and trailing anchor for existence check
    link_path="${link%%#*}"
    link_path="${link_path%%\?*}"

    # Skip empty (just an anchor or query)
    [[ -z "$link_path" ]] && continue

    # Resolve target
    if [[ "$link_path" == /* ]]; then
      # Absolute path: docs files are rooted at docs/, root files at repo root.
      target="$abs_base${link_path}"
    else
      # Relative to source file's directory
      target="$source_dir/$link_path"
    fi

    # Normalize: resolve .. and . segments via realpath if available, else manual
    if command -v realpath &>/dev/null; then
      resolved=$(realpath -m "$target" 2>/dev/null || echo "$target")
    else
      resolved="$target"
    fi

    # Verify existence (file or directory)
    if [[ ! -e "$resolved" ]]; then
      BROKEN_LINKS+=("$display: broken link ($link) -> $link_path")
    fi
  done < <(grep -oP '\]\(\K[^)]+(?=\))' "$full_path" 2>/dev/null || true)

done < "$WORK"

BROKEN_COUNT=${#BROKEN_LINKS[@]}

echo "Files checked: $CHECKED"
echo "Broken internal links/anchors: $BROKEN_COUNT"
echo ""

if [[ $BROKEN_COUNT -eq 0 ]]; then
  echo "PASS: All internal links and same-page anchors resolve."
  exit 0
fi

echo "Broken internal links/anchors found:"
echo ""
for link in "${BROKEN_LINKS[@]:0:50}"; do
  echo "  $link"
done
if [[ $BROKEN_COUNT -gt 50 ]]; then
  echo ""
  echo "  ... and $((BROKEN_COUNT - 50)) more"
fi
echo ""

if [[ "$STRICT" == "true" ]]; then
  echo "FAIL (--strict): $BROKEN_COUNT broken internal link(s)/anchor(s)."
  exit 1
else
  echo "WARN: $BROKEN_COUNT broken internal link(s)/anchor(s) (advisory mode)."
  echo "  Triage: each is a typo'd link/anchor or a renamed/moved target/heading."
  echo "  CI runs this script with --strict; pass --strict for enforcing local runs."
  exit 0
fi
