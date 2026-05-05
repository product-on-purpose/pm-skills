# validate-references-cross-doc.ps1 - Validate cross-doc references in docs/reference/.
#
# PowerShell parity for validate-references-cross-doc.sh.
#
# Two checks:
#   1. Link resolution: every markdown link [text](path) in docs/reference/*.md
#      and docs/reference/skill-families/*.md must resolve. Skips http/https/
#      mailto/ftp/anchor-only and template placeholders ({{x}}, <x>).
#   2. Skill-name cross-check: skill names listed in the Category Distribution
#      table of docs/reference/categories.md must correspond to an actual
#      skill in skills/.
#
# Exit codes:
#   0 - All links resolve and all skill-name mentions correspond to real skills
#   1 - One or more broken links or unknown skill names
#
# Usage:
#   pwsh -File scripts/validate-references-cross-doc.ps1

$ErrorActionPreference = 'Stop'

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Resolve-Path (Join-Path $ScriptDir '..')
$ReferenceDir = Join-Path $Root 'docs/reference'
$SkillsDir = Join-Path $Root 'skills'

Write-Host "=== Cross-Doc References Validation ==="
Write-Host ""

if (-not (Test-Path $ReferenceDir)) {
    Write-Host "FAIL: reference directory not found at $ReferenceDir"
    exit 1
}

$Findings = @()

# ---------------------------------------------------------------
# Check 1: Link resolution
# ---------------------------------------------------------------

$RefFiles = Get-ChildItem -Path $ReferenceDir -Recurse -File -Filter '*.md' | Sort-Object FullName

foreach ($srcFile in $RefFiles) {
    $srcDir = $srcFile.DirectoryName
    $srcRel = $srcFile.FullName.Substring($Root.Path.Length).TrimStart('\','/').Replace('\','/')

    $content = Get-Content -Raw $srcFile.FullName

    # Match markdown link targets: ](path) - capture the path
    $regex = [regex]'\]\(([^)]+)\)'
    $matches = $regex.Matches($content)

    foreach ($m in $matches) {
        $rawTarget = $m.Groups[1].Value.Trim()

        # Strip "path "title"" form: take only the path before the first space
        $target = ($rawTarget -split '\s+')[0]

        # Skip URLs, anchors-only, mailto, etc.
        if ($target -match '^(https?|ftp|mailto|tel):') { continue }
        if ($target.StartsWith('#')) { continue }
        if ([string]::IsNullOrEmpty($target)) { continue }

        # Skip template placeholders
        if ($target -match '\{\{|\}\}|<|>') { continue }

        # Strip anchor fragment
        $targetPath = ($target -split '#')[0]
        if ([string]::IsNullOrEmpty($targetPath)) { continue }

        # Resolve target relative to source file's directory (or repo root if absolute)
        if ($targetPath.StartsWith('/')) {
            $resolved = Join-Path $Root $targetPath.TrimStart('/')
        } else {
            $resolved = Join-Path $srcDir $targetPath
        }

        # Normalize the path (collapse .. and .)
        try {
            $normalized = [System.IO.Path]::GetFullPath($resolved)
        } catch {
            $normalized = $resolved
        }

        if (-not (Test-Path -LiteralPath $normalized)) {
            $Findings += "BROKEN-LINK: $srcRel -> $targetPath"
        }
    }
}

# ---------------------------------------------------------------
# Check 2: Skill-name cross-check in categories.md
# ---------------------------------------------------------------

$CategoriesFile = Join-Path $ReferenceDir 'categories.md'

if (Test-Path $CategoriesFile) {
    # Build canonical command-name set
    $KnownSkills = @{}
    $PhasePrefixes = @('discover','define','develop','deliver','measure','iterate','foundation','utility')

    Get-ChildItem -Path $SkillsDir -Directory | ForEach-Object {
        $name = $_.Name
        $stripped = $name
        foreach ($prefix in $PhasePrefixes) {
            if ($name.StartsWith("$prefix-")) {
                $stripped = $name.Substring($prefix.Length + 1)
                break
            }
        }
        $KnownSkills[$stripped] = $true
        $KnownSkills[$name] = $true
    }

    # Extract Category Distribution table block
    $lines = Get-Content $CategoriesFile
    $inBlock = $false
    $tableLines = @()
    foreach ($line in $lines) {
        if ($line -match '^## Category Distribution') {
            $inBlock = $true
            continue
        }
        if ($inBlock -and $line -match '^## ') {
            break
        }
        if ($inBlock) {
            $tableLines += $line
        }
    }

    foreach ($line in $tableLines) {
        # Must look like a table row with at least 3 pipes
        $pipeCount = ($line.ToCharArray() | Where-Object { $_ -eq '|' }).Count
        if ($pipeCount -lt 3) { continue }

        # Skip header and divider rows
        if ($line -match 'Skills|---|--') { continue }

        # Extract third data column (between second and third pipe)
        # Pipe-split: ["", "col1", "col2", "col3", "col4", ""]
        $parts = $line -split '\|'
        if ($parts.Count -lt 4) { continue }
        $thirdCol = $parts[3].Trim()
        if ([string]::IsNullOrEmpty($thirdCol)) { continue }

        $names = $thirdCol -split ','
        foreach ($rawName in $names) {
            $name = $rawName.Trim().Trim('`')
            if ([string]::IsNullOrEmpty($name)) { continue }
            if ($name -eq '**Total**' -or $name -eq 'Total') { continue }
            if ($name -match '^\*+$') { continue }
            if ($name -match '^\*+.+\*+$') { continue }

            if (-not $KnownSkills.ContainsKey($name)) {
                $Findings += "UNKNOWN-SKILL: docs/reference/categories.md -> '$name' has no matching skill in skills/"
            }
        }
    }
}

# ---------------------------------------------------------------
# Report
# ---------------------------------------------------------------

if ($Findings.Count -gt 0) {
    Write-Host "FAIL: $($Findings.Count) cross-doc reference issue(s) detected:"
    Write-Host ""
    foreach ($f in $Findings) {
        Write-Host "  $f"
    }
    Write-Host ""
    Write-Host "Fix: update the offending reference doc to point to a valid target,"
    Write-Host "or rename/restore the missing target. Then re-run this validator."
    exit 1
}

Write-Host "PASS: all cross-doc references in docs/reference/ resolve cleanly."
exit 0
