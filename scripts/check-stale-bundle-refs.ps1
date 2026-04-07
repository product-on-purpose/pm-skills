# check-stale-bundle-refs.ps1 — Terminology guard for bundles→workflows rename
#
# Scans tracked files for stale "bundle" references that should now be "workflow".
# Excludes known exceptions (historical docs, archives, samples, drafts).
#
# Exit codes:
#   0 — No stale references found (or only excluded matches)
#   1 — Stale references detected (advisory during v2.9.0 transition)
#
# Usage:
#   .\scripts\check-stale-bundle-refs.ps1          # Run from repo root
#   .\scripts\check-stale-bundle-refs.ps1 -Strict   # Fail on any match (post-v2.9.0)

param(
    [switch]$Strict
)

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Split-Path -Parent $ScriptDir

Write-Host "=== Terminology Guard: checking for stale 'bundle' references ==="
Write-Host ""

# Exclusion patterns — files/directories where "bundle" is expected
$ExcludePatterns = @(
    'docs/releases/Release_v2.0.md',
    'docs/releases/Release_v2.1.md',
    'docs/releases/Release_v2.2.md',
    'docs/releases/Release_v2.3.md',
    'docs/releases/Release_v2.4.md',
    'docs/releases/Release_v2.5.md',
    'docs/releases/Release_v2.6.md',
    'docs/releases/Release_v2.7.0.md',
    'docs/releases/Release_v2.8.0.md',
    'docs/internal/_working/distilled/_archived/',
    'docs/internal/efforts/F-13-workflow-expansion/bundle_',
    'docs/internal/efforts/M-19-bundles-to-workflows/',
    '.github/issues-archive/',
    '.github/issues-drafts/',
    'library/skill-output-samples/',
    'scripts/README_SCRIPTS.md',
    'scripts/check-stale-bundle-refs.sh',
    'scripts/check-stale-bundle-refs.ps1',
    'docs/internal/release-plans/v2.9.0/_archive/',
    'docs/internal/milestones/'
)

# Get all tracked files
$trackedFiles = git -C $Root ls-files | Where-Object { $_ -ne '' }

# Filter out excluded patterns
$filesToCheck = $trackedFiles | Where-Object {
    $file = $_
    $excluded = $false
    foreach ($pattern in $ExcludePatterns) {
        if ($file -like "*$pattern*" -or $file.StartsWith($pattern)) {
            $excluded = $true
            break
        }
    }
    -not $excluded
}

# Search for "bundle" references (case-insensitive, word boundary)
$matches = @()
foreach ($file in $filesToCheck) {
    $fullPath = Join-Path $Root $file
    if (Test-Path $fullPath -PathType Leaf) {
        $content = Get-Content $fullPath -Raw -ErrorAction SilentlyContinue
        if ($content -and $content -match '\bbundles?\b') {
            $lineNum = 0
            foreach ($line in (Get-Content $fullPath -ErrorAction SilentlyContinue)) {
                $lineNum++
                if ($line -match '\bbundles?\b') {
                    $matches += "${file}:${lineNum}:$line"
                }
            }
        }
    }
}

if ($matches.Count -eq 0) {
    Write-Host "PASS: No stale 'bundle' references found."
    exit 0
}

Write-Host "Found $($matches.Count) potential stale reference(s):"
Write-Host ""
foreach ($m in $matches) {
    Write-Host "  $m"
}
Write-Host ""

if ($Strict) {
    Write-Host "FAIL (-Strict): $($matches.Count) stale 'bundle' reference(s) found."
    exit 1
} else {
    Write-Host "WARN: $($matches.Count) stale 'bundle' reference(s) found (advisory mode)."
    Write-Host "  Run with -Strict to treat as failure."
    exit 0
}
