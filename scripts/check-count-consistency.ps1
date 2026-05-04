# check-count-consistency.ps1 . Detect stale hardcoded counts in docs.
#
# Counts actual skills, commands, and workflows, then scans tracked .md and
# .json files for hardcoded numbers that no longer match.
#
# Exit codes:
#   0 . All counts are consistent
#   1 . Stale counts detected
#
# Usage:
#   .\scripts\check-count-consistency.ps1

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Split-Path -Parent $ScriptDir

$Fail = $false

Write-Host "=== Count Consistency Check ==="
Write-Host ""

# --- Count actual resources ---

$SkillCount = (Get-ChildItem -Path (Join-Path $Root "skills") -Directory).Count
$CommandCount = (Get-ChildItem -Path (Join-Path $Root "commands") -Filter "*.md").Count
$WorkflowCount = (Get-ChildItem -Path (Join-Path $Root "_workflows") -Filter "*.md" |
    Where-Object { $_.Name -ne "README.md" }).Count

Write-Host "Actual counts:"
Write-Host "  Skills:    $SkillCount"
Write-Host "  Commands:  $CommandCount"
Write-Host "  Workflows: $WorkflowCount"
Write-Host ""

# --- Scan tracked .md files for hardcoded counts ---

$trackedFiles = git -C $Root ls-files "*.md" "*.json" | Where-Object { $_ -ne '' }

# Exclusion patterns . files where counts are historical or structural
$excludePatterns = @(
    '^CHANGELOG\.md$',
    '^docs/releases/',
    '^docs/internal/',
    '^docs/changelog\.md$',
    '^\.github/issues-archive/',
    '^\.github/issues-drafts/',
    '^\.github/\.created-issues\.json$',
    '^\.github/scripts/',
    '^AGENTS/claude/CONTEXT\.md$',
    '^AGENTS/claude/SESSION-LOG/',
    '^library/',
    '^scripts/check-count-consistency\.'
)

$filesToCheck = $trackedFiles | Where-Object {
    $file = $_
    $excluded = $false
    foreach ($pattern in $excludePatterns) {
        if ($file -match $pattern) {
            $excluded = $true
            break
        }
    }
    -not $excluded
}

# Minimum threshold . counts below this are likely per-phase/per-category.
# Comparison uses -ge so values equal to the threshold are still checked.
$MinThreshold = 10

$mismatches = @()

# Patterns to check: (regex, resource name, actual count)
$checks = @(
    @{ Pattern = '(\d+)\s+(?:[a-zA-Z][a-zA-Z-]*\s+){0,3}skills'; Name = 'skills'; Count = $SkillCount },
    @{ Pattern = '(\d+)\s+(?:[a-zA-Z][a-zA-Z-]*\s+){0,3}commands'; Name = 'commands'; Count = $CommandCount },
    @{ Pattern = '(\d+)\s+(?:[a-zA-Z][a-zA-Z-]*\s+){0,3}workflows'; Name = 'workflows'; Count = $WorkflowCount }
)

foreach ($file in $filesToCheck) {
    $fullPath = Join-Path $Root $file
    if (-not (Test-Path $fullPath -PathType Leaf)) { continue }

    $lines = Get-Content $fullPath -ErrorAction SilentlyContinue
    if ($null -eq $lines) { continue }

    $lineNum = 0
    foreach ($line in $lines) {
        $lineNum++

        # Skip lines with version references (likely historical)
        if ($line -match 'v[0-9]+\.') { continue }

        foreach ($check in $checks) {
            $regexMatches = [regex]::Matches($line, $check.Pattern, 'IgnoreCase')
            foreach ($m in $regexMatches) {
                $num = [int]$m.Groups[1].Value
                if ($num -ne $check.Count -and $num -ge $MinThreshold) {
                    $mismatches += "  ${file}:${lineNum}: found '$num $($check.Name)' (actual: $($check.Count))"
                    $Fail = $true
                }
            }
        }
    }
}

if (-not $Fail) {
    Write-Host "PASS: No stale counts found in tracked .md or .json files."
    exit 0
} else {
    Write-Host "Stale counts found:"
    Write-Host ""
    foreach ($m in $mismatches) {
        Write-Host $m
    }
    Write-Host ""
    Write-Host "FAIL: One or more hardcoded counts are stale."
    exit 1
}
