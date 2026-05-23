# check-internal-link-validity.ps1 - Validate internal links and anchors in docs.
#
# Walks docs/**/*.{md,mdx} (excluding docs/internal/ and a hardcoded list
# mirroring src/content.config.ts glob excludes) PLUS the repo-root README.md
# and AGENTS.md, extracts markdown links of the form [text](path), and:
#   - resolves relative/absolute file targets and verifies existence
#   - resolves same-page #anchor targets against the source file's GitHub-style
#     heading slugs (FU-3, v2.19.0)
# Skips external links (http(s), mailto, etc.) and template placeholders.
#
# Cross-file path#anchor targets verify the path only; same-page #anchor
# targets are fully resolved.
#
# Closes audit gap G4 (link checking in docs).
#
# Posture: ENFORCING in v2.14.0+ (W10-promoted from advisory). Source-of-truth
# for excluded paths migrated from mkdocs.yml exclude_docs to a hardcoded
# array here (W12 Material deprecation). If src/content.config.ts changes its
# glob excludes, update $excludePaths below to match. README.md + AGENTS.md
# added to the fileset and same-page anchor resolution added in v2.19.0 (FU-3).
#
# Exit codes:
#   0 - All internal links/anchors resolve OR advisory mode (default)
#   1 - Broken links/anchors found AND -Strict was passed
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

# Build the GitHub-style heading-slug set for a markdown file as a hashtable
# (slug -> $true), with -N suffixes for duplicate headings. Fenced code blocks
# are skipped so a '# comment' line inside a fence is not mistaken for a heading.
function Get-HeadingSlugs {
    param([string]$Path)
    $counts = @{}
    $set = @{}
    $inFence = $false
    $lines = Get-Content -Path $Path -ErrorAction SilentlyContinue
    if ($null -eq $lines) { return $set }
    foreach ($line in $lines) {
        if ($line -match '^(```|~~~)') { $inFence = -not $inFence; continue }
        if ($inFence) { continue }
        if ($line -match '^#{1,6}[ \t]') {
            $h = $line -replace '^#{1,6}[ \t]+', '' -replace '[ \t]+#+[ \t]*$', ''
            $s = $h.ToLower()
            $s = $s -replace '`', ''
            $s = $s -replace '\]\([^)]*\)', ''
            $s = $s -replace '[][]', ''
            $s = $s -replace '[^a-z0-9 _-]', ''
            $s = $s -replace ' ', '-'
            if ($s -eq '') { continue }
            if (-not $counts.ContainsKey($s)) {
                $counts[$s] = 1
                $set[$s] = $true
            } else {
                $counts[$s]++
                $set["$s-$($counts[$s] - 1)"] = $true
            }
        }
        # GitHub also honors explicit id/name anchors on <a> tags (e.g. the README
        # "back to top" target); add them verbatim (lowercased) so a same-page link
        # to them resolves. (Codex P2.)
        foreach ($am in [regex]::Matches($line, '<a\s+[^>]*(?:id|name)="([^"]+)"')) {
            $set[$am.Groups[1].Value.ToLower()] = $true
        }
    }
    return $set
}

# Build the work list: docs files resolve absolute (/foo) links against docs/;
# the root README.md and AGENTS.md resolve them against the repo root.
$docsDir = Join-Path -Path $Root -ChildPath "docs"
$work = @()

Get-ChildItem -Path $docsDir -Recurse -File |
    Where-Object {
        ($_.Extension -eq ".md" -or $_.Extension -eq ".mdx") -and
        $_.FullName -notmatch '[\\/]docs[\\/]internal[\\/]'
    } |
    Sort-Object FullName |
    ForEach-Object {
        $rel = $_.FullName.Substring($docsDir.Length + 1) -replace '\\', '/'
        if (-not (Test-Excluded -FsFile $rel)) {
            $work += @{ FullPath = $_.FullName; Display = "docs/$rel"; AbsBase = $docsDir; Directory = $_.DirectoryName }
        }
    }

foreach ($rf in @('README.md', 'AGENTS.md')) {
    $p = Join-Path -Path $Root -ChildPath $rf
    if (Test-Path $p -PathType Leaf) {
        $work += @{ FullPath = $p; Display = $rf; AbsBase = $Root; Directory = $Root }
    }
}

$brokenLinks = @()
$checked = 0

# Pattern: matches markdown links [text](path), captures the path
$linkPattern = '\]\(([^)]+)\)'
# External-link prefixes to skip
$externalPrefixes = @('http://', 'https://', 'mailto:', 'ftp:', 'ws:', 'wss:', 'file:', 'javascript:', 'tel:', 'data:')

foreach ($item in $work) {
    $checked++
    $slugSet = Get-HeadingSlugs -Path $item.FullPath

    $content = Get-Content -Path $item.FullPath -Raw -ErrorAction SilentlyContinue
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

        # Same-page anchor: resolve against this file's heading slugs.
        if ($link.StartsWith('#')) {
            $anchor = $link.Substring(1).ToLower()
            if ([string]::IsNullOrEmpty($anchor)) { continue }   # bare "#" = page top
            if (-not $slugSet.ContainsKey($anchor)) {
                $brokenLinks += "$($item.Display): broken anchor ($link) -> no heading slug '#$anchor'"
            }
            continue
        }

        # Skip template placeholders ({{path}}, {release-url}, <placeholder>)
        if ($link -match '[{}<>]') { continue }

        # Strip anchor and query
        $linkPath = $link -split '[#?]' | Select-Object -First 1
        if ([string]::IsNullOrWhiteSpace($linkPath)) { continue }

        # Resolve target
        if ($linkPath.StartsWith('/')) {
            $target = Join-Path -Path $item.AbsBase -ChildPath $linkPath.TrimStart('/')
        } else {
            $target = Join-Path -Path $item.Directory -ChildPath $linkPath
        }

        # Normalize via .NET path resolution
        try {
            $resolved = [System.IO.Path]::GetFullPath($target)
        } catch {
            $resolved = $target
        }

        # Verify existence
        if (-not (Test-Path $resolved)) {
            $brokenLinks += "$($item.Display): broken link ($link) -> $linkPath"
        }
    }
}

$brokenCount = $brokenLinks.Count

Write-Host "Files checked: $checked"
Write-Host "Broken internal links/anchors: $brokenCount"
Write-Host ""

if ($brokenCount -eq 0) {
    Write-Host "PASS: All internal links and same-page anchors resolve."
    exit 0
}

Write-Host "Broken internal links/anchors found:"
Write-Host ""
$brokenLinks | Select-Object -First 50 | ForEach-Object { Write-Host "  $_" }
if ($brokenCount -gt 50) {
    Write-Host ""
    Write-Host "  ... and $($brokenCount - 50) more"
}
Write-Host ""

if ($Strict) {
    Write-Host "FAIL (-Strict): $brokenCount broken internal link(s)/anchor(s)."
    exit 1
} else {
    Write-Host "WARN: $brokenCount broken internal link(s)/anchor(s) (advisory mode)."
    Write-Host "  Triage: each is a typo'd link/anchor or a renamed/moved target/heading."
    Write-Host "  CI runs this script with -Strict; pass -Strict for enforcing local runs."
    exit 0
}
