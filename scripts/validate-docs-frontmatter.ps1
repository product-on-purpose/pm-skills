# validate-docs-frontmatter.ps1 - Validate frontmatter on rendered docs pages.
#
# Every docs/**/*.md (excluding docs/internal/ and a hardcoded list mirroring
# src/content.config.ts glob excludes) should have well-formed YAML frontmatter
# with required fields title and description. Optional fields (tags, date)
# validated when present.
#
# Posture: ENFORCING in v2.14.0+ (W10-promoted from advisory). Source-of-truth
# for excluded paths migrated from mkdocs.yml exclude_docs to a hardcoded
# array here (W12 Material deprecation). If src/content.config.ts changes its
# glob excludes, update $excludePaths below to match.
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

Write-Host "=== Docs Frontmatter Validation ==="
Write-Host ""

# Hardcoded exclusion list. Mirrors src/content.config.ts glob excludes
# under docs/. Was previously read from mkdocs.yml exclude_docs in v2.13.x.
# Trailing slash means "directory prefix"; no trailing slash means "exact file".
$excludePaths = @(
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

# Auto-skip patterns: rendered docs that legitimately may not need frontmatter
$AutoSkipPatterns = @(
    "templates/*"
    "skills/*"
    "workflows/*"
    "showcase/*"
    "samples/*"
    "reference/commands.md"
    "releases/Release_v*.md"
)

function Test-Excluded {
    param([string]$FsFile)
    foreach ($exc in $excludePaths) {
        if ($exc -match '/$') {
            if ($FsFile.StartsWith($exc)) { return $true }
        } else {
            if ($FsFile -eq $exc) { return $true }
        }
    }
    foreach ($pattern in $AutoSkipPatterns) {
        if ($FsFile -like $pattern) { return $true }
    }
    return $false
}

# Collect docs files. Includes both .md and .mdx (v2.14.2 scope expansion per
# Codex P2: src/content.config.ts mounts both extensions, and docs/index.mdx
# is the Starlight homepage; mirrors check-internal-link-validity.ps1).
$docsDir = Join-Path -Path $Root -ChildPath "site/src/content/docs"
$fsFiles = Get-ChildItem -Path $docsDir -Recurse -File |
    Where-Object {
        ($_.Extension -eq ".md" -or $_.Extension -eq ".mdx") -and
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
Write-Host "Excluded (excludePaths or auto-skip): $skipped"
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
    Write-Host "  CI runs this script without -Strict; pass -Strict for enforcing local runs."
    exit 0
}
