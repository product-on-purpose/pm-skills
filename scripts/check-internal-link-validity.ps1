# check-internal-link-validity.ps1 - Validate internal links in rendered docs.
#
# Walks docs/**/*.md (excluding docs/internal/ and a hardcoded list mirroring
# src/content.config.ts glob excludes), extracts markdown links of the form
# [text](path), filters to internal-only (skips http://, https://, mailto:,
# etc.), resolves each target relative to the source file, and verifies
# existence.
#
# Closes audit gap G4 (link checking in docs).
#
# Posture: ENFORCING in v2.14.0+ (W10-promoted from advisory). Source-of-truth
# for excluded paths migrated from mkdocs.yml exclude_docs to a hardcoded
# array here (W12 Material deprecation). If src/content.config.ts changes its
# glob excludes, update $excludePaths below to match.
#
# Exit codes:
#   0 - All internal links resolve OR advisory mode (default)
#   1 - Broken links found AND -Strict was passed
#
# Usage:
#   .\scripts\check-internal-link-validity.ps1
#   .\scripts\check-internal-link-validity.ps1 -Strict

param(
    [switch]$Strict
)

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Split-Path -Parent $ScriptDir

Write-Host "=== Internal Link Validity Check ==="
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

# Collect docs files
$docsDir = Join-Path -Path $Root -ChildPath "docs"
$fsFiles = Get-ChildItem -Path $docsDir -Filter "*.md" -Recurse -File |
    Where-Object {
        $_.FullName -notmatch '[\\/]docs[\\/]internal[\\/]'
    } |
    ForEach-Object {
        @{
            Relative = $_.FullName.Substring($docsDir.Length + 1) -replace '\\', '/'
            FullPath = $_.FullName
            Directory = $_.DirectoryName
        }
    } | Sort-Object { $_.Relative }

$brokenLinks = @()
$checked = 0

# Pattern: matches markdown links [text](path), captures the path
$linkPattern = '\]\(([^)]+)\)'
# External-link prefixes to skip
$externalPrefixes = @('http://', 'https://', 'mailto:', 'ftp:', 'ws:', 'wss:', 'file:', 'javascript:', 'tel:', 'data:')

foreach ($file in $fsFiles) {
    if (Test-Excluded -FsFile $file.Relative) { continue }
    $checked++

    $content = Get-Content -Path $file.FullPath -Raw -ErrorAction SilentlyContinue
    if ($null -eq $content) { continue }

    $regexMatches = [regex]::Matches($content, $linkPattern)
    foreach ($m in $regexMatches) {
        $link = $m.Groups[1].Value.Trim()

        # Skip external
        $isExternal = $false
        foreach ($prefix in $externalPrefixes) {
            if ($link.StartsWith($prefix)) { $isExternal = $true; break }
        }
        if ($isExternal) { continue }

        # Skip same-page anchor
        if ($link.StartsWith('#')) { continue }

        # Skip template placeholders ({{path}}, {release-url}, <placeholder>)
        if ($link -match '[{}<>]') { continue }

        # Strip anchor and query
        $linkPath = $link -split '[#?]' | Select-Object -First 1
        if ([string]::IsNullOrWhiteSpace($linkPath)) { continue }

        # Resolve target
        if ($linkPath.StartsWith('/')) {
            # Absolute path rooted at docs/
            $target = Join-Path -Path $docsDir -ChildPath $linkPath.TrimStart('/')
        } else {
            # Relative to source file's directory
            $target = Join-Path -Path $file.Directory -ChildPath $linkPath
        }

        # Normalize via .NET path resolution
        try {
            $resolved = [System.IO.Path]::GetFullPath($target)
        } catch {
            $resolved = $target
        }

        # Verify existence
        if (-not (Test-Path $resolved)) {
            $brokenLinks += "docs/$($file.Relative): broken link [...]($link) -> $linkPath"
        }
    }
}

$brokenCount = $brokenLinks.Count

Write-Host "Files checked: $checked"
Write-Host "Broken internal links: $brokenCount"
Write-Host ""

if ($brokenCount -eq 0) {
    Write-Host "PASS: All internal links resolve."
    exit 0
}

Write-Host "Broken internal links found:"
Write-Host ""
$brokenLinks | Select-Object -First 50 | ForEach-Object { Write-Host "  $_" }
if ($brokenCount -gt 50) {
    Write-Host ""
    Write-Host "  ... and $($brokenCount - 50) more"
}
Write-Host ""

if ($Strict) {
    Write-Host "FAIL (-Strict): $brokenCount broken internal link(s)."
    exit 1
} else {
    Write-Host "WARN: $brokenCount broken internal link(s) (advisory mode)."
    Write-Host "  Triage: each is either a typo'd link or a renamed/moved target."
    Write-Host "  CI runs this script without -Strict; pass -Strict for enforcing local runs."
    exit 0
}
