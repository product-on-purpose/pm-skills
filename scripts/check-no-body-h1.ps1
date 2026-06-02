#!/usr/bin/env pwsh
#
# check-no-body-h1.ps1
#
# Forward enforcement of the v2.14.x V15 fix: under Starlight, the frontmatter
# `title:` field auto-renders as the page heading. If a body ALSO starts with
# `# Heading`, the title appears twice on the rendered page. This validator
# refuses any docs/**/*.{md,mdx} file (subject to $excludePaths) where the first
# non-blank, non-comment, non-import line after the closing frontmatter `---`
# is a `#` H1.
#
# Same exclusion scope as `check-internal-link-validity.ps1` and
# `validate-docs-frontmatter.ps1`. README.md files are GitHub-directory landing
# pages excluded from the Astro build, so they are not checked.
#
# Exit codes:
#   0 - no body H1 found OR advisory mode (default)
#   1 - body H1 found AND -Strict was passed
#
# Usage:
#   .\scripts\check-no-body-h1.ps1
#   .\scripts\check-no-body-h1.ps1 -Strict

param(
    [switch]$Strict
)

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Split-Path -Parent $scriptDir

Write-Host "=== Body H1 Duplication Check ==="
Write-Host ""

# Hardcoded exclusion list. Mirrors src/content.config.ts glob excludes
# under docs/. Trailing slash means "directory prefix"; no trailing slash
# means "exact file".
$excludePaths = @(
    "templates/"
    # Generated library samples are verbatim artifacts that carry their own body H1;
    # never in scope before the Pattern S move (they lived in library/, outside docs/).
    "samples/"
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

function Test-Excluded {
    param([string]$FsFile)
    foreach ($exc in $excludePaths) {
        if ($exc -match '/$') {
            if ($FsFile.StartsWith($exc)) { return $true }
        } else {
            if ($FsFile -eq $exc) { return $true }
        }
    }
    return $false
}

$docsDir = Join-Path -Path $Root -ChildPath "site/src/content/docs"
$fsFiles = Get-ChildItem -Path $docsDir -Recurse -File |
    Where-Object {
        ($_.Extension -eq ".md" -or $_.Extension -eq ".mdx") -and
        $_.FullName -notmatch '[\\/]docs[\\/]internal[\\/]'
    } |
    ForEach-Object {
        $rel = $_.FullName.Substring($docsDir.Length + 1) -replace '\\', '/'
        $rel
    } |
    Sort-Object

$checked = 0
$findings = @()

foreach ($fsFile in $fsFiles) {
    if (Test-Excluded -FsFile $fsFile) { continue }

    $fullPath = Join-Path -Path $docsDir -ChildPath $fsFile
    $checked++

    $lines = Get-Content -Path $fullPath -Encoding UTF8
    $state = "before"
    $hasTitle = $false
    $firstBodyLine = $null

    foreach ($line in $lines) {
        if ($state -eq "before" -and $line -eq "---") {
            $state = "frontmatter"
            continue
        }
        if ($state -eq "frontmatter") {
            if ($line -match "^title:") { $hasTitle = $true }
            if ($line -eq "---") { $state = "body"; continue }
            continue
        }
        if ($state -eq "body" -and $null -eq $firstBodyLine) {
            if ($line -eq "") { continue }
            if ($line -match "^import ") { continue }
            if ($line -match '^\{/\*.*\*/\}$') { continue }
            if ($line -match '^<!--.*-->$') { continue }
            $firstBodyLine = $line
            break
        }
    }

    if ($hasTitle -and $firstBodyLine -and $firstBodyLine -match "^# ") {
        $findings += "docs/${fsFile}: body H1 found below frontmatter title -> $firstBodyLine"
    }
}

$findingCount = $findings.Count
Write-Host "Files checked: $checked"
Write-Host "Body H1 duplications: $findingCount"
Write-Host ""

if ($findingCount -eq 0) {
    Write-Host "PASS: No body H1 duplications detected."
    exit 0
}

Write-Host "Body H1 duplications found:"
foreach ($f in $findings | Select-Object -First 20) {
    Write-Host "  $f"
}
if ($findingCount -gt 20) {
    Write-Host "  ... and $($findingCount - 20) more"
}
Write-Host ""

if ($Strict) {
    Write-Host "FAIL (-Strict): $findingCount body H1 duplication(s)."
    Write-Host "Fix: remove the body H1; Starlight renders frontmatter title as the page heading."
    Write-Host "See CONTRIBUTING.md 'Maintainer notes: architectural workarounds' #6 for context."
    exit 1
}

Write-Host "WARN: $findingCount body H1 duplication(s) (advisory mode)."
Write-Host "  CI runs this script with -Strict; fix before push."
