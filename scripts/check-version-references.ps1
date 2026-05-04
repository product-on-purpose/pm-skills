# check-version-references.ps1 - Catch hardcoded version drift in tracked files.
#
# Reads current version from .claude-plugin/plugin.json and scans tracked .md
# and .json files for vX.Y.Z patterns. Reports refs that drift from current.
# Excludes paths where historical version refs are expected (CHANGELOG,
# release notes, plan archives, session logs, etc.).
#
# Posture: advisory in v2.13.0. Promote to enforcing in v2.14.0+ once stable.
#
# Exit codes:
#   0 - No drift OR advisory mode (default; reports drift but doesn't fail)
#   1 - Drift found AND -Strict was passed
#
# Usage:
#   .\scripts\check-version-references.ps1
#   .\scripts\check-version-references.ps1 -Strict

param(
    [switch]$Strict
)

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Split-Path -Parent $ScriptDir
$PluginFile = Join-Path -Path $Root -ChildPath ".claude-plugin/plugin.json"

if (-not (Test-Path $PluginFile)) {
    Write-Host "FAIL: $PluginFile not found"
    exit 1
}

$pluginJson = Get-Content $PluginFile -Raw | ConvertFrom-Json
$CurrentVersion = $pluginJson.version

if ([string]::IsNullOrWhiteSpace($CurrentVersion)) {
    Write-Host "FAIL: could not read current version from $PluginFile"
    exit 1
}

Write-Host "=== Version Reference Drift Check ==="
Write-Host ""
Write-Host "Current version (from .claude-plugin/plugin.json): $CurrentVersion"
Write-Host ""

# Path patterns to exclude (historical refs are expected)
$ExcludePatterns = @(
    '^CHANGELOG\.md$',
    '^docs/changelog\.md$',
    '^docs/releases/',
    '^docs/internal/release-plans/',
    '^docs/internal/audit/_archived/',
    '^docs/internal/audit/branches-pr_2026-05-03\.md$',
    '^docs/internal/audit/audit_repo-structure_2026-05-01\.md$',
    '^docs/internal/audit/ci-audit_2026-05-03\.md$',
    '^docs/internal/efforts/',
    '^docs/internal/milestones/',
    '^docs/internal/multi-repo-',
    '^docs/internal/agent-component-usage_',
    '^docs/internal/skill-versioning\.md$',
    '^docs/internal/cross-llm-review-protocol\.md$',
    '^docs/internal/distribution/',
    '^docs/internal/mkdocs/',
    '^\.github/issues-archive/',
    '^\.github/issues-drafts/',
    '^\.github/\.created-issues\.json$',
    '^\.github/scripts/',
    '^AGENTS/claude/SESSION-LOG/',
    '^AGENTS/codex/SESSION-LOG/',
    '^AGENTS/claude/CONTEXT\.md$',
    '^AGENTS/claude/DECISIONS\.md$',
    '^AGENTS/claude/PLANNING/',
    '^AGENTS/codex/CONTEXT\.md$',
    '^AGENTS/codex/DECISIONS\.md$',
    '^library/',
    '^skills/[^/]+/HISTORY\.md$',
    '^scripts/check-version-references\.'
)

# Get all tracked .md and .json files
$trackedFiles = git -C $Root ls-files "*.md" "*.json" | Where-Object { $_ -ne '' }

$filesToCheck = $trackedFiles | Where-Object {
    $file = $_
    $excluded = $false
    foreach ($pattern in $ExcludePatterns) {
        if ($file -match $pattern) {
            $excluded = $true
            break
        }
    }
    -not $excluded
}

$DriftLines = @()

foreach ($file in $filesToCheck) {
    $fullPath = Join-Path -Path $Root -ChildPath $file
    if (-not (Test-Path $fullPath -PathType Leaf)) { continue }

    $lines = Get-Content $fullPath -ErrorAction SilentlyContinue
    if ($null -eq $lines) { continue }

    $lineNum = 0
    foreach ($line in $lines) {
        $lineNum++
        $regexMatches = [regex]::Matches($line, 'v[0-9]+\.[0-9]+\.[0-9]+')
        if ($regexMatches.Count -eq 0) { continue }

        $hasDrift = $false
        foreach ($m in $regexMatches) {
            $verClean = $m.Value.Substring(1)  # strip leading 'v'
            if ($verClean -ne $CurrentVersion) {
                $hasDrift = $true
                break
            }
        }

        if ($hasDrift) {
            $DriftLines += "${file}:${lineNum}: $line"
        }
    }
}

$DriftCount = $DriftLines.Count

if ($DriftCount -eq 0) {
    Write-Host "PASS: All non-excluded version references match current $CurrentVersion."
    exit 0
}

Write-Host "Found $DriftCount line(s) with version reference drift:"
Write-Host ""
$DriftLines | Select-Object -First 50 | ForEach-Object { Write-Host $_ }
if ($DriftCount -gt 50) {
    Write-Host ""
    Write-Host "  ... and $($DriftCount - 50) more line(s) (run with -Strict locally to see full output)"
}
Write-Host ""

if ($Strict) {
    Write-Host "FAIL (-Strict): $DriftCount version reference drift line(s) found."
    exit 1
} else {
    Write-Host "WARN: $DriftCount version reference drift line(s) found (advisory mode)."
    Write-Host "  Triage: confirm each is intentional historical reference, OR update to current."
    Write-Host "  Promote to enforcing (-Strict in CI) in v2.14.0+ after one clean cycle."
    exit 0
}
