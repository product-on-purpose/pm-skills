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
    '^AGENTS/claude/DECISIONS\.md$',
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

# --- Pre-compute count-exempt line ranges per file ---
#
# Files can mark sections as historical/exempt with HTML-comment markers:
#   <!-- count-exempt:start -->
#   ... historical content ...
#   <!-- count-exempt:end -->
#
# This replaces the prior 'v[0-9]+\.' substring exemption with a principled
# section-aware mechanism.

$exemptRanges = @{}
foreach ($file in $filesToCheck) {
    $fullPath = Join-Path $Root $file
    if (-not (Test-Path $fullPath -PathType Leaf)) { continue }
    $lines = Get-Content $fullPath -ErrorAction SilentlyContinue
    if ($null -eq $lines) { continue }
    $start = 0
    $ranges = @()
    for ($i = 0; $i -lt $lines.Count; $i++) {
        $ln = $i + 1
        if ($lines[$i] -match '<!-- count-exempt:start -->') { $start = $ln; continue }
        if ($lines[$i] -match '<!-- count-exempt:end -->') {
            if ($start -gt 0) { $ranges += @{ Start = $start; End = $ln }; $start = 0 }
        }
    }
    if ($ranges.Count -gt 0) { $exemptRanges[$file] = $ranges }
}

$mismatches = @()

# Patterns to check: (regex, resource name, actual count, subset-descriptor regex)
#
# Subset-descriptor exclusions: phrases like "26 phase skills",
# "40 skill commands" describe subsets of the total, not total counts. The
# validator must not flag them as stale (the number is correct for its
# subset). The SubsetPattern is checked against the slice immediately after
# the digit and before the resource name; any match excludes the candidate.
$checks = @(
    @{ Pattern = '(\d+)\s+(?:[a-zA-Z][a-zA-Z-]*\s+){0,3}skills'; Name = 'skills'; Count = $SkillCount; SubsetPattern = '(\d+)\s+(phase|foundation|utility|domain|shipped|embedded|test|sample|library|lines?)\b' },
    @{ Pattern = '(\d+)\s+(?:[a-zA-Z][a-zA-Z-]*\s+){0,3}commands'; Name = 'commands'; Count = $CommandCount; SubsetPattern = '(\d+)\s+(skill|workflow)[\s-]' },
    @{ Pattern = '(\d+)\s+(?:[a-zA-Z][a-zA-Z-]*\s+){0,3}workflows'; Name = 'workflows'; Count = $WorkflowCount; SubsetPattern = $null }
)

foreach ($file in $filesToCheck) {
    $fullPath = Join-Path $Root $file
    if (-not (Test-Path $fullPath -PathType Leaf)) { continue }

    $lines = Get-Content $fullPath -ErrorAction SilentlyContinue
    if ($null -eq $lines) { continue }

    $lineNum = 0
    $fileRanges = $null
    if ($exemptRanges.ContainsKey($file)) { $fileRanges = $exemptRanges[$file] }

    foreach ($line in $lines) {
        $lineNum++

        # Skip lines inside count-exempt sections (canonical mechanism for
        # historical content like README "What's New" release entries).
        if ($null -ne $fileRanges) {
            $inExempt = $false
            foreach ($r in $fileRanges) {
                if ($lineNum -ge $r.Start -and $lineNum -le $r.End) { $inExempt = $true; break }
            }
            if ($inExempt) { continue }
        }

        foreach ($check in $checks) {
            # Build set of subset-flagged numbers in this line so we can
            # skip them when the broader pattern matches the same digit.
            $subsetNums = @{}
            if ($null -ne $check.SubsetPattern) {
                $subsetMatches = [regex]::Matches($line, $check.SubsetPattern, 'IgnoreCase')
                foreach ($sm in $subsetMatches) { $subsetNums[$sm.Groups[1].Value] = $true }
            }

            $regexMatches = [regex]::Matches($line, $check.Pattern, 'IgnoreCase')
            foreach ($m in $regexMatches) {
                $rawNum = $m.Groups[1].Value
                if ($subsetNums.ContainsKey($rawNum)) { continue }
                $num = [int]$rawNum
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
