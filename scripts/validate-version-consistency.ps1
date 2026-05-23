# validate-version-consistency.ps1
# Ensures plugin.json and marketplace.json report the same version.
# Prevents drift that confuses the update skill's version detection.

$ErrorActionPreference = "Stop"

$pluginFile = ".claude-plugin/plugin.json"
$marketFile = ".claude-plugin/marketplace.json"

if (-not (Test-Path $pluginFile)) {
    Write-Host "FAIL: $pluginFile not found"
    exit 1
}

if (-not (Test-Path $marketFile)) {
    Write-Host "FAIL: $marketFile not found"
    exit 1
}

$pluginJson = Get-Content $pluginFile -Raw | ConvertFrom-Json
$marketJson = Get-Content $marketFile -Raw | ConvertFrom-Json

$pluginVer = $pluginJson.version
$marketVer = $marketJson.plugins[0].version

if ($pluginVer -ne $marketVer) {
    Write-Host "FAIL: Version mismatch"
    Write-Host "  ${pluginFile}:  $pluginVer"
    Write-Host "  ${marketFile}: $marketVer"
    Write-Host ""
    Write-Host "  Both files must report the same version."
    exit 1
}

# README current-version-claim surfaces must match plugin.json (FU-9, v2.19.0).
# This validator owns version-CLAIM surfaces; check-version-references stays
# advisory for provenance refs. The README badge form "version-X.Y.Z" is NOT
# matched by check-version-references' vX.Y.Z regex, so assert it here.
$readmeFile = "README.md"
if (Test-Path $readmeFile) {
    $readme = Get-Content $readmeFile -Raw
    $badgeMatch = [regex]::Match($readme, 'badge/version-(\d+\.\d+\.\d+)')
    if ($badgeMatch.Success -and $badgeMatch.Groups[1].Value -ne $pluginVer) {
        Write-Host "FAIL: README version badge ($($badgeMatch.Groups[1].Value)) does not match plugin.json ($pluginVer)"
        exit 1
    }
    $cvLine = ($readme -split "`n" | Where-Object { $_ -match '\*\*Current version\*\*' } | Select-Object -First 1)
    if ($cvLine) {
        $cvMatch = [regex]::Match($cvLine, 'v(\d+\.\d+\.\d+)')
        if ($cvMatch.Success -and $cvMatch.Groups[1].Value -ne $pluginVer) {
            Write-Host "FAIL: README 'Current version' row ($($cvMatch.Groups[1].Value)) does not match plugin.json ($pluginVer)"
            exit 1
        }
    }
}

Write-Host "PASS: Versions consistent ($pluginVer); README badge + Current-version row match"
