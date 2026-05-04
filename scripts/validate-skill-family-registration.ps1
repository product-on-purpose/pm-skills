# validate-skill-family-registration.ps1 - Generic structural validator for skill families.
#
# Reads docs/reference/skill-families/_registry.yaml and verifies for each family:
#   1. Family contract document exists at the declared path
#   2. All declared member skills exist as directories in skills/
#   3. Each member's SKILL.md references the family contract path
#
# Closes audit gap G2: prior validate-meeting-skills-family hardcoded 5 family
# members in the script; generic validation is now registry-driven.
#
# Exit codes:
#   0 - All families pass structural validation
#   1 - One or more families have structural integrity violations

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Split-Path -Parent $ScriptDir
$Registry = Join-Path -Path $Root -ChildPath "docs/reference/skill-families/_registry.yaml"

Write-Host "=== Skill Family Registration Validation ==="
Write-Host ""

if (-not (Test-Path $Registry)) {
    Write-Host "FAIL: registry not found at $Registry"
    exit 1
}

# Parse registry (regex-based; handles current YAML structure)
$lines = Get-Content $Registry

# Build families dict: family name => @{ contract = ...; members = @() }
$families = [ordered]@{}
$inFamilies = $false
$currentFamily = $null
$inMembers = $false

foreach ($line in $lines) {
    if ($line -match '^families:') {
        $inFamilies = $true
        continue
    }
    if ($inFamilies -and $line -match '^[^\s#]') {
        $inFamilies = $false
        continue
    }
    if (-not $inFamilies) { continue }

    # Family entry: "  <name>:" (2-space indent + name + colon + nothing)
    if ($line -match '^[\s]{2}([a-zA-Z][a-zA-Z0-9_-]*):[\s]*$') {
        $currentFamily = $matches[1]
        $families[$currentFamily] = @{ contract = ''; members = @() }
        $inMembers = $false
        continue
    }

    if ($null -eq $currentFamily) { continue }

    # Contract line: "    contract: <path>"
    if ($line -match '^[\s]+contract:[\s]+(.+)$') {
        $families[$currentFamily].contract = $matches[1].Trim()
        $inMembers = $false
        continue
    }

    # Members marker: "    members:"
    if ($line -match '^[\s]+members:[\s]*$') {
        $inMembers = $true
        continue
    }

    # Member entry: "      - <skill-name>"
    if ($inMembers -and $line -match '^[\s]+-[\s]+(.+)$') {
        $families[$currentFamily].members += $matches[1].Trim()
        continue
    }

    # Other content under family (resets in_members)
    if ($line -match '^[\s]+[a-zA-Z]') {
        $inMembers = $false
    }
}

if ($families.Count -eq 0) {
    Write-Host "FAIL: no families found in registry. Verify _registry.yaml structure."
    exit 1
}

$Fail = $false

foreach ($familyName in $families.Keys) {
    $family = $families[$familyName]
    Write-Host "--- Family: $familyName ---"

    # Contract check
    if ([string]::IsNullOrWhiteSpace($family.contract)) {
        Write-Host "  FAIL: family '$familyName' has no contract: declared in registry"
        $Fail = $true
        continue
    }

    $contractFull = Join-Path -Path $Root -ChildPath $family.contract
    if (-not (Test-Path $contractFull)) {
        Write-Host "  FAIL: contract file does not exist at $($family.contract)"
        $Fail = $true
    } else {
        Write-Host "  PASS: contract present at $($family.contract)"
    }

    # Members check
    if ($family.members.Count -eq 0) {
        Write-Host "  FAIL: family '$familyName' has no members declared in registry"
        $Fail = $true
        continue
    }

    foreach ($member in $family.members) {
        $memberDir = Join-Path -Path $Root -ChildPath "skills/$member"
        $memberSkillMd = Join-Path -Path $memberDir -ChildPath "SKILL.md"

        if (-not (Test-Path $memberDir -PathType Container)) {
            Write-Host "  FAIL: member '$member' has no directory at skills/$member"
            $Fail = $true
            continue
        }

        if (-not (Test-Path $memberSkillMd -PathType Leaf)) {
            Write-Host "  FAIL: member '$member' has no SKILL.md"
            $Fail = $true
            continue
        }

        # Check SKILL.md references the contract
        $skillContent = Get-Content $memberSkillMd -Raw
        if ($skillContent -notmatch [regex]::Escape($family.contract)) {
            Write-Host "  FAIL: member '$member' SKILL.md does not reference family contract path ($($family.contract))"
            $Fail = $true
        } else {
            Write-Host "  PASS: member '$member' references contract"
        }
    }

    Write-Host "  ($($family.members.Count) member(s) verified)"
    Write-Host ""
}

Write-Host "Total families validated: $($families.Count)"
Write-Host ""

if (-not $Fail) {
    Write-Host "PASS: all skill families have structural integrity."
    exit 0
} else {
    Write-Host "FAIL: one or more families have structural integrity violations."
    exit 1
}
