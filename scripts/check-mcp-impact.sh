#!/usr/bin/env bash
# Advisory check for pm-skills-mcp sync impact.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

warn() {
  local message="$1"
  if [[ "${GITHUB_ACTIONS:-}" == "true" ]]; then
    echo "::warning::$message"
  else
    echo "[WARN] $message"
  fi
}

diff_command=()
if [[ -n "${GITHUB_BASE_REF:-}" ]] && git rev-parse --verify --quiet "origin/$GITHUB_BASE_REF" >/dev/null; then
  diff_command=(git diff --name-status "origin/$GITHUB_BASE_REF...HEAD")
elif git rev-parse --verify --quiet HEAD^ >/dev/null; then
  diff_command=(git diff --name-status HEAD^ HEAD)
else
  warn "Unable to determine a diff base; skipping MCP impact advisory."
  exit 0
fi

impact_found=0
while IFS=$'\t' read -r status first second; do
  [[ -n "${status:-}" ]] || continue

  if [[ "$status" == A ]] && [[ "$first" =~ ^skills/[a-z0-9-]+/SKILL\.md$ ]]; then
    warn "New skill detected ($first). Review whether pm-skills-mcp needs a corresponding sync update."
    impact_found=1
    continue
  fi

  if [[ "$status" =~ ^R[0-9]+$ ]] &&
     [[ "$first" =~ ^skills/[a-z0-9-]+/SKILL\.md$ ]] &&
     [[ "$second" =~ ^skills/[a-z0-9-]+/SKILL\.md$ ]] &&
     [[ "$first" != "$second" ]]; then
    warn "Skill rename detected ($first -> $second). Review whether pm-skills-mcp needs a corresponding sync update."
    impact_found=1
  fi
done < <("${diff_command[@]}")

if [[ $impact_found -eq 0 ]]; then
  echo "[OK] No MCP-impacting skill additions or renames detected"
fi

exit 0
