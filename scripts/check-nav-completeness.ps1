# check-nav-completeness.ps1 - Verify every docs/**/*.md is in mkdocs.yml nav or exclude_docs.
#
# Catches silent orphans introduced when contributors add a docs/**/*.md file
# without wiring it into mkdocs.yml. Closes the v2.12.0 docs/reference/README.md
# orphan-class issue.
#
# Exit codes:
#   0 - All docs files accounted for; all nav entries resolve
#   1 - One or more orphans or broken nav entries
#
# Usage:
#   .\scripts\check-nav-completeness.ps1

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Split-Path -Parent $ScriptDir
$MkdocsYml = Join-Path -Path $Root -ChildPath "mkdocs.yml"

# Auto-include patterns (PowerShell wildcard): files matching these are treated
# as in-nav even if not explicitly listed. Used for files transitively reachable
# via index pages (e.g., release notes linked from docs/releases/index.md table).
$AutoIncludePatterns = @(
    "releases/Release_v*.md"
    "templates/*"
)

Write-Host "=== Nav Completeness Check ==="
Write-Host ""

if (-not (Test-Path $MkdocsYml)) {
    Write-Host "FAIL: mkdocs.yml not found at $MkdocsYml"
    exit 1
}

$mkdocsLines = Get-Content $MkdocsYml

# Extract nav .md paths
$navPaths = New-Object System.Collections.Generic.HashSet[string]
$inNav = $false
foreach ($line in $mkdocsLines) {
    if ($line -match '^nav:') { $inNav = $true; continue }
    if ($inNav -and $line -match '^[^\s#]') { $inNav = $false; continue }
    if ($inNav) {
        $regexMatches = [regex]::Matches($line, '[a-zA-Z_][a-zA-Z0-9_/-]*\.md')
        foreach ($m in $regexMatches) {
            $navPaths.Add($m.Value) | Out-Null
        }
    }
}

# Extract exclude_docs entries
$excludePaths = @()
$inExc = $false
foreach ($line in $mkdocsLines) {
    if ($line -match '^exclude_docs:') { $inExc = $true; continue }
    if ($inExc -and $line -match '^[^\s#]') { $inExc = $false; continue }
    if ($inExc) {
        $stripped = $line -replace '^\s+', ''
        if ($stripped.Length -gt 0) {
            $excludePaths += $stripped
        }
    }
}

# Collect filesystem files
$docsDir = Join-Path -Path $Root -ChildPath "docs"
$fsFiles = Get-ChildItem -Path $docsDir -Filter "*.md" -Recurse -File |
    Where-Object {
        $_.FullName -notmatch '[\\/]docs[\\/]internal[\\/]'
    } |
    ForEach-Object {
        $rel = $_.FullName.Substring($docsDir.Length + 1) -replace '\\', '/'
        $rel
    } | Sort-Object

$fail = $false
$failCount = 0

# Forward check
foreach ($fsFile in $fsFiles) {
    if ($navPaths.Contains($fsFile)) { continue }

    # Auto-included?
    $autoIncluded = $false
    foreach ($pattern in $AutoIncludePatterns) {
        if ($fsFile -like $pattern) {
            $autoIncluded = $true
            break
        }
    }
    if ($autoIncluded) { continue }

    # In exclude_docs?
    $excluded = $false
    foreach ($excPath in $excludePaths) {
        $excClean = $excPath -replace '^/', ''
        if ($excClean -match '/$') {
            # Directory exclusion
            if ($fsFile.StartsWith($excClean)) { $excluded = $true; break }
        } else {
            # File exclusion (exact match)
            if ($fsFile -eq $excClean) { $excluded = $true; break }
        }
    }

    if (-not $excluded) {
        Write-Host "[FAIL] docs/$fsFile not in mkdocs.yml nav or exclude_docs"
        $fail = $true
        $failCount++
    }
}

# Reverse check
foreach ($navPath in $navPaths) {
    $fsPath = Join-Path -Path $docsDir -ChildPath $navPath
    if (-not (Test-Path $fsPath)) {
        Write-Host "[FAIL] mkdocs.yml nav references missing file: docs/$navPath"
        $fail = $true
        $failCount++
    }
}

Write-Host ""
Write-Host "Filesystem files (excluding docs/internal/): $($fsFiles.Count)"
Write-Host "Nav entries:                                  $($navPaths.Count)"

if (-not $fail) {
    Write-Host ""
    Write-Host "PASS: All docs files are in nav, excluded, or auto-included; all nav entries resolve."
    exit 0
} else {
    Write-Host ""
    Write-Host "FAIL: $failCount nav-completeness violation(s)."
    exit 1
}
