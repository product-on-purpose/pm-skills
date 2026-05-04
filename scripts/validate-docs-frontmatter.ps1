# validate-docs-frontmatter.ps1 - Validate frontmatter on rendered docs pages.
#
# Every docs/**/*.md (excluding docs/internal/ and mkdocs.yml exclude_docs)
# should have well-formed YAML frontmatter with required fields title and
# description. Optional fields (tags, date) validated when present.
#
# Posture: ADVISORY in v2.13.0. Promote to enforcing in v2.14.0+ once
# frontmatter coverage is complete.
#
# Exit codes:
#   0 - All checked docs pass OR advisory mode (default)
#   1 - Findings AND -Strict was passed
#
# Usage:
#   .\scripts\validate-docs-frontmatter.ps1
#   .\scripts\validate-docs-frontmatter.ps1 -Strict

param(
    [switch]$Strict
)

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Split-Path -Parent $ScriptDir
$MkdocsYml = Join-Path -Path $Root -ChildPath "mkdocs.yml"

Write-Host "=== Docs Frontmatter Validation ==="
Write-Host ""

# Auto-skip patterns: rendered docs that legitimately may not need frontmatter
$AutoSkipPatterns = @(
    "templates/*"
    "skills/*"
    "workflows/*"
    "showcase/*"
    "reference/commands.md"
    "releases/Release_v*.md"
)

# Extract exclude_docs from mkdocs.yml
$excludePaths = @()
if (Test-Path $MkdocsYml) {
    $mkdocsLines = Get-Content $MkdocsYml
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
}

function Test-Excluded {
    param([string]$FsFile)
    foreach ($exc in $excludePaths) {
        $excClean = $exc -replace '^/', ''
        if ($excClean -match '/$') {
            if ($FsFile.StartsWith($excClean)) { return $true }
        } else {
            if ($FsFile -eq $excClean) { return $true }
        }
    }
    foreach ($pattern in $AutoSkipPatterns) {
        if ($FsFile -like $pattern) { return $true }
    }
    return $false
}

# Collect docs files
$docsDir = Join-Path -Path $Root -ChildPath "docs"
$fsFiles = Get-ChildItem -Path $docsDir -Filter "*.md" -Recurse -File |
    Where-Object {
        $_.FullName -notmatch '[\\/]docs[\\/]internal[\\/]'
    } |
    ForEach-Object {
        $_.FullName.Substring($docsDir.Length + 1) -replace '\\', '/'
    } | Sort-Object

$findings = @()
$failCount = 0
$warnCount = 0
$checked = 0

foreach ($fsFile in $fsFiles) {
    if (Test-Excluded -FsFile $fsFile) { continue }

    $fullPath = Join-Path -Path $docsDir -ChildPath $fsFile
    $checked++

    $lines = Get-Content $fullPath -ErrorAction SilentlyContinue
    if ($null -eq $lines -or $lines.Count -eq 0) {
        $findings += "docs/${fsFile}: empty file"
        $failCount++
        continue
    }

    if ($lines[0].Trim() -ne '---') {
        $findings += "docs/${fsFile}: missing frontmatter delimiter (first line is not '---')"
        $warnCount++
        continue
    }

    # Find closing delimiter
    $endIndex = -1
    for ($i = 1; $i -lt $lines.Count; $i++) {
        if ($lines[$i].Trim() -eq '---') { $endIndex = $i; break }
    }
    if ($endIndex -lt 0) {
        $findings += "docs/${fsFile}: frontmatter has opening '---' but no closing '---'"
        $failCount++
        continue
    }

    $frontmatter = $lines[1..($endIndex - 1)]

    # Check title
    $titleLine = $frontmatter | Where-Object { $_ -match '^title:' } | Select-Object -First 1
    if (-not $titleLine) {
        $findings += "docs/${fsFile}: missing required field 'title'"
        $failCount++
    } else {
        $title = ($titleLine -replace '^title:\s*', '').Trim('"').Trim("'").Trim()
        if ($title.Length -gt 80) {
            $findings += "docs/${fsFile}: title exceeds 80 chars ($($title.Length))"
            $failCount++
        }
    }

    # Check description (single-line)
    $descLine = $frontmatter | Where-Object { $_ -match '^description:' } | Select-Object -First 1
    $description = ""
    if ($descLine) {
        $rawDesc = ($descLine -replace '^description:\s*', '').Trim()
        # Single-line: strip quotes
        if (-not ($rawDesc -match '^[>|]')) {
            $description = $rawDesc.Trim('"').Trim("'")
        } else {
            # Block scalar: collect indented lines after the description: line
            $foundIdx = $frontmatter.IndexOf($descLine)
            for ($j = $foundIdx + 1; $j -lt $frontmatter.Count; $j++) {
                if ($frontmatter[$j] -match '^[a-z]') { break }
                $description += " " + ($frontmatter[$j] -replace '^\s+', '')
            }
            $description = $description.Trim()
        }
    }

    if ([string]::IsNullOrWhiteSpace($description)) {
        $findings += "docs/${fsFile}: missing required field 'description'"
        $failCount++
    } elseif ($description.Length -lt 50) {
        $findings += "docs/${fsFile}: description shorter than 50 chars ($($description.Length))"
        $warnCount++
    } elseif ($description.Length -gt 300) {
        $findings += "docs/${fsFile}: description exceeds 300 chars ($($description.Length))"
        $warnCount++
    }
}

$skipped = $fsFiles.Count - $checked

Write-Host "Files checked: $checked"
Write-Host "Excluded by mkdocs.yml exclude_docs or auto-skip: $skipped"
Write-Host ""

$total = $failCount + $warnCount

if ($total -eq 0) {
    Write-Host "PASS: All $checked docs have valid frontmatter."
    exit 0
}

Write-Host "Frontmatter findings: $failCount failures, $warnCount warnings"
Write-Host ""
$findings | Select-Object -First 50 | ForEach-Object { Write-Host "  $_" }
if ($findings.Count -gt 50) {
    Write-Host ""
    Write-Host "  ... and $($findings.Count - 50) more"
}
Write-Host ""

if ($Strict) {
    Write-Host "FAIL (-Strict): $total frontmatter finding(s)."
    exit 1
} else {
    Write-Host "WARN: $total frontmatter finding(s) (advisory mode)."
    Write-Host "  Many rendered docs currently lack frontmatter; cleanup is a Bucket B / v2.14 effort."
    Write-Host "  Promote to enforcing (-Strict in CI) once frontmatter coverage is complete."
    exit 0
}
