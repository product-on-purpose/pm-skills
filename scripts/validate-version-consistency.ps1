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

Write-Host "PASS: Versions consistent ($pluginVer)"
