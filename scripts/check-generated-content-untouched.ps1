# check-generated-content-untouched.ps1 - Verify committed generated docs match generator output.
#
# PowerShell parity for check-generated-content-untouched.sh.
#
# Re-runs the 3 page generators (skill, workflow, showcase) and diffs the
# regenerated output against the committed files. Fails on any drift.
#
# Watched paths:
#   docs/skills/, docs/workflows/, docs/showcase/, docs/reference/commands.md
#
# Pairs with Pattern 5C (Bucket A.4): every generated page declares
# `generated: true` in frontmatter; this validator's diff implicitly
# enforces flag presence as well as content fidelity.
#
# Exit codes:
#   0 - All generated content matches generator output
#   1 - Hand-edit drift detected (or generator failure)
#
# Usage:
#   pwsh -File scripts/check-generated-content-untouched.ps1

$ErrorActionPreference = 'Stop'

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Resolve-Path (Join-Path $ScriptDir '..')
$TmpDir = Join-Path $Root '.tmp_generated_check'

Write-Host "=== Generated Content Untouched Check ==="
Write-Host ""

$Generators = @(
    'generate-skill-pages.py',
    'generate-workflow-pages.py',
    'generate-showcase.py'
)

foreach ($gen in $Generators) {
    $genPath = Join-Path $Root "scripts/$gen"
    if (-not (Test-Path $genPath)) {
        Write-Host "FAIL: missing generator at scripts/$gen"
        exit 1
    }
}

if (Test-Path $TmpDir) {
    Remove-Item -Recurse -Force $TmpDir
}

$Snapshot = Join-Path $TmpDir 'snapshot'
$Regen = Join-Path $TmpDir 'regen'
New-Item -ItemType Directory -Path $Snapshot -Force | Out-Null
New-Item -ItemType Directory -Path $Regen -Force | Out-Null

$WatchedDirs = @('skills', 'workflows', 'showcase')

# Snapshot watched outputs as they currently exist
foreach ($d in $WatchedDirs) {
    $src = Join-Path $Root "docs/$d"
    if (Test-Path $src) {
        Copy-Item -Recurse -Path $src -Destination (Join-Path $Snapshot $d)
    }
}
$cmdsSrc = Join-Path $Root 'docs/reference/commands.md'
if (Test-Path $cmdsSrc) {
    New-Item -ItemType Directory -Path (Join-Path $Snapshot 'reference') -Force | Out-Null
    Copy-Item -Path $cmdsSrc -Destination (Join-Path $Snapshot 'reference/commands.md')
}

# Resolve a python interpreter (prefer python3 on PATH; fall back to python)
$Python = Get-Command python3 -ErrorAction SilentlyContinue
if (-not $Python) {
    $Python = Get-Command python -ErrorAction SilentlyContinue
}
if (-not $Python) {
    Write-Host "FAIL: no python interpreter found on PATH (tried python3, python)"
    Remove-Item -Recurse -Force $TmpDir -ErrorAction SilentlyContinue
    exit 1
}

# Run generators in place
foreach ($gen in $Generators) {
    $genPath = Join-Path $Root "scripts/$gen"
    $out = & $Python.Source $genPath 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "FAIL: $gen exited non-zero"
        Write-Host ($out -join "`n")
        Remove-Item -Recurse -Force $TmpDir -ErrorAction SilentlyContinue
        exit 1
    }
}

# Stash regenerated outputs
foreach ($d in $WatchedDirs) {
    $src = Join-Path $Root "docs/$d"
    if (Test-Path $src) {
        Copy-Item -Recurse -Path $src -Destination (Join-Path $Regen $d)
    }
}
if (Test-Path $cmdsSrc) {
    New-Item -ItemType Directory -Path (Join-Path $Regen 'reference') -Force | Out-Null
    Copy-Item -Path $cmdsSrc -Destination (Join-Path $Regen 'reference/commands.md')
}

# Restore committed content (so this validator does not mutate the working tree)
foreach ($d in $WatchedDirs) {
    $snap = Join-Path $Snapshot $d
    $dst = Join-Path $Root "docs/$d"
    if (Test-Path $snap) {
        if (Test-Path $dst) { Remove-Item -Recurse -Force $dst }
        Copy-Item -Recurse -Path $snap -Destination $dst
    }
}
$snapCmds = Join-Path $Snapshot 'reference/commands.md'
if (Test-Path $snapCmds) {
    Copy-Item -Force -Path $snapCmds -Destination $cmdsSrc
}

# Compare snapshot (committed) vs regen (fresh generator output).
# Normalize CRLF -> LF before comparing so Windows checkouts do not flag
# pure line-ending noise as drift.
function Compare-Files {
    param([string]$A, [string]$B)
    if (-not (Test-Path $A) -or -not (Test-Path $B)) {
        return @{ Equal = $false; Reason = "missing one side: A=$A B=$B" }
    }
    $textA = (Get-Content -Raw $A) -replace "`r`n", "`n"
    $textB = (Get-Content -Raw $B) -replace "`r`n", "`n"
    if ($textA -eq $textB) {
        return @{ Equal = $true }
    }
    return @{ Equal = $false; Reason = 'content drift' }
}

$Drift = @()

# Walk regen tree, compare each file to snapshot equivalent
$regenFiles = Get-ChildItem -Path $Regen -Recurse -File
foreach ($rf in $regenFiles) {
    $rel = $rf.FullName.Substring($Regen.Length).TrimStart('\','/')
    $snapPath = Join-Path $Snapshot $rel
    $cmp = Compare-Files -A $snapPath -B $rf.FullName
    if (-not $cmp.Equal) {
        $Drift += $rel
    }
}

# Walk snapshot tree, find files missing from regen
$snapFiles = Get-ChildItem -Path $Snapshot -Recurse -File
foreach ($sf in $snapFiles) {
    $rel = $sf.FullName.Substring($Snapshot.Length).TrimStart('\','/')
    $regenPath = Join-Path $Regen $rel
    if (-not (Test-Path $regenPath)) {
        $Drift += "$rel (committed but not regenerated)"
    }
}

if ($Drift.Count -gt 0) {
    Write-Host "FAIL: committed generated content differs from generator output."
    Write-Host ""
    Write-Host "Hand-edits to generated files will be overwritten on next regen."
    Write-Host "To fix: re-run the generators and commit the result."
    Write-Host ""
    Write-Host "  python3 scripts/generate-skill-pages.py"
    Write-Host "  python3 scripts/generate-workflow-pages.py"
    Write-Host "  python3 scripts/generate-showcase.py"
    Write-Host ""
    Write-Host "Files with drift:"
    foreach ($d in ($Drift | Sort-Object -Unique)) {
        Write-Host "  $d"
    }
    Remove-Item -Recurse -Force $TmpDir -ErrorAction SilentlyContinue
    exit 1
}

Remove-Item -Recurse -Force $TmpDir -ErrorAction SilentlyContinue

Write-Host "PASS: all 63 generated pages match generator output."
exit 0
