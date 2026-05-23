# check-skill-cross-references.ps1 - Flag backtick skill references that do not resolve.
#
# Scans skills/*/SKILL.md for backtick-wrapped, classification-prefixed skill
# names (e.g., `deliver-prd`) and asserts each resolves to a skills/<name>/
# directory. Catches the v2.18.0 defect class: references to non-existent
# skills that passed every other gate. PowerShell parity of the .sh version.
#
# Exit codes:
#   0 - all references resolve (or are allowlisted)
#   1 - one or more broken references
#
# Usage:
#   .\scripts\check-skill-cross-references.ps1

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Split-Path -Parent $ScriptDir

Write-Host "=== Skill Cross-Reference Check ==="
Write-Host ""

# Classification prefixes that begin a skill directory name.
$prefixRe = 'discover|define|develop|deliver|measure|iterate|foundation|utility|tool'

# Intentional non-resolving tokens (exact directory-name match).
$allowlist = @(
    'deliver-change-communication',  # illustrative naming example in utility-pm-skill-builder
    'deliver-roadmap',               # forward-ref to a planned skill ("when shipped")
    'foundation-sprint-skills'       # skill-family identifier (a contract, not a skill dir)
)

# Backtick is PowerShell's escape char; build it via [char]96 to keep the regex clean.
$bt = [char]96
$pattern = "$bt(?:$prefixRe)-[a-z0-9-]+$bt"

$skillsDir = Join-Path $Root 'skills'

$valid = @{}
Get-ChildItem -Path $skillsDir -Directory | ForEach-Object { $valid[$_.Name] = $true }

$broken = @()

foreach ($d in (Get-ChildItem -Path $skillsDir -Directory)) {
    $file = Join-Path $d.FullName 'SKILL.md'
    if (-not (Test-Path $file -PathType Leaf)) { continue }
    $lines = Get-Content $file -ErrorAction SilentlyContinue
    if ($null -eq $lines) { continue }
    for ($i = 0; $i -lt $lines.Count; $i++) {
        foreach ($m in [regex]::Matches($lines[$i], $pattern)) {
            $token = $m.Value.Trim($bt)
            if ($valid.ContainsKey($token)) { continue }
            if ($allowlist -contains $token) { continue }
            $rel = $file.Substring($Root.Length + 1) -replace '\\', '/'
            $broken += "  ${rel}:$($i + 1): $bt$token$bt -> no skills/$token/ directory"
        }
    }
}

if ($broken.Count -eq 0) {
    Write-Host "PASS: all backtick skill references in skills/*/SKILL.md resolve (or are allowlisted)."
    exit 0
} else {
    Write-Host "Broken skill cross-references found:"
    Write-Host ""
    $broken | ForEach-Object { Write-Host $_ }
    Write-Host ""
    Write-Host "FAIL: $($broken.Count) backtick skill reference(s) do not resolve to a skills/<name>/ directory."
    Write-Host "Intentional forward-refs, naming examples, or family ids belong in the allowlist."
    exit 1
}
