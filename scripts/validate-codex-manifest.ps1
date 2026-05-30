# validate-codex-manifest.ps1 - Assert .codex-plugin/plugin.json is a valid Codex plugin manifest.
#
# Added v2.22.0 with the Codex manifest. Asserts load-bearing identity only (D4):
# parses; name == pm-skills; version valid semver; skills begins with ./ and
# resolves to an existing directory; interface is an object. Cosmetic fields are
# NOT asserted. Version EQUALITY across manifests is owned by
# validate-version-consistency.

$ErrorActionPreference = "Stop"
$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$manifest = Join-Path $root ".codex-plugin/plugin.json"

Write-Host "=== Codex Manifest Validation ==="

if (-not (Test-Path $manifest)) {
    Write-Host "FAIL: $manifest not found"
    exit 1
}

try {
    $m = Get-Content $manifest -Raw | ConvertFrom-Json
} catch {
    Write-Host "FAIL: .codex-plugin/plugin.json does not parse as JSON"
    exit 1
}

$fail = 0
if ($m.name -ne "pm-skills") { Write-Host "FAIL: name must be 'pm-skills' (got '$($m.name)')"; $fail = 1 }
if ($m.version -notmatch '^\d+\.\d+\.\d+$') { Write-Host "FAIL: version not valid semver (got '$($m.version)')"; $fail = 1 }
if ($m.skills -notlike './*') {
    Write-Host "FAIL: skills must begin with './' (got '$($m.skills)')"; $fail = 1
} elseif (-not (Test-Path (Join-Path $root ($m.skills -replace '^\./','')) -PathType Container)) {
    Write-Host "FAIL: skills path does not resolve to a directory ('$($m.skills)')"; $fail = 1
}
if ($null -eq $m.interface -or $m.interface -isnot [PSCustomObject]) {
    Write-Host "FAIL: interface must be an object"; $fail = 1
}

if ($fail -eq 0) {
    Write-Host "PASS: valid (name=$($m.name), version=$($m.version), skills=$($m.skills), interface=object)"
    exit 0
}
Write-Host "FAIL: .codex-plugin/plugin.json invalid"
exit 1
