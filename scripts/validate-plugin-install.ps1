# validate-plugin-install.ps1
# Validates that the Claude Code plugin install path will work end-to-end.
# Catches schema drift in .claude-plugin/marketplace.json and .claude-plugin/plugin.json
# that would silently break /plugin marketplace add.

$ErrorActionPreference = "Stop"

$root = (Get-Item (Join-Path $PSScriptRoot "..")).FullName
$pluginFile = Join-Path $root ".claude-plugin/plugin.json"
$marketFile = Join-Path $root ".claude-plugin/marketplace.json"
$fail = 0

# === Existence checks ===

if (-not (Test-Path $pluginFile)) {
    Write-Host "FAIL: $pluginFile not found"
    Write-Host "      Plugin install requires .claude-plugin/plugin.json at the canonical path."
    $fail = 1
}

if (-not (Test-Path $marketFile)) {
    Write-Host "FAIL: $marketFile not found"
    Write-Host "      /plugin marketplace add requires .claude-plugin/marketplace.json at the canonical path."
    Write-Host "      If marketplace.json exists at the repo root, move it to .claude-plugin/ via 'git mv'."
    $fail = 1
}

if ($fail -eq 1) {
    exit 1
}

# === Parse manifests ===

try {
    $pluginJson = Get-Content $pluginFile -Raw | ConvertFrom-Json
} catch {
    Write-Host "FAIL: plugin.json is not valid JSON: $_"
    exit 1
}

try {
    $marketJson = Get-Content $marketFile -Raw | ConvertFrom-Json
} catch {
    Write-Host "FAIL: marketplace.json is not valid JSON: $_"
    exit 1
}

# === Plugin manifest schema checks ===

if ([string]::IsNullOrEmpty($pluginJson.name)) {
    Write-Host "FAIL: plugin.json missing required field: name"
    $fail = 1
}

if ([string]::IsNullOrEmpty($pluginJson.version)) {
    Write-Host "FAIL: plugin.json missing required field: version"
    $fail = 1
}

# === Marketplace manifest schema checks ===

if ([string]::IsNullOrEmpty($marketJson.name)) {
    Write-Host "FAIL: marketplace.json missing required field: name"
    $fail = 1
}

if ($null -eq $marketJson.owner) {
    Write-Host "FAIL: marketplace.json missing required field: owner (must be an object with at least a 'name' field)"
    Write-Host "      Example: { ""owner"": { ""name"": ""product-on-purpose"" } }"
    $fail = 1
} elseif ([string]::IsNullOrEmpty($marketJson.owner.name)) {
    Write-Host "FAIL: marketplace.json owner.name is missing or empty"
    $fail = 1
}

if ($null -eq $marketJson.plugins -or $marketJson.plugins.Count -eq 0) {
    Write-Host "FAIL: marketplace.json plugins array is missing or empty"
    $fail = 1
}

# === Per-plugin entry checks ===

if ($null -ne $marketJson.plugins -and $marketJson.plugins.Count -gt 0) {
    $plugin0 = $marketJson.plugins[0]

    if ([string]::IsNullOrEmpty($plugin0.name)) {
        Write-Host "FAIL: marketplace.json plugins[0] missing required field: name"
        $fail = 1
    }

    if ([string]::IsNullOrEmpty($plugin0.version)) {
        Write-Host "FAIL: marketplace.json plugins[0] missing required field: version"
        $fail = 1
    }

    if ($null -eq $plugin0.source) {
        Write-Host "FAIL: marketplace.json plugins[0] missing required field: source"
        $fail = 1
    }

    if ($null -ne $plugin0.author -and $plugin0.author -isnot [string]) {
        if ([string]::IsNullOrEmpty($plugin0.author.name)) {
            Write-Host "FAIL: marketplace.json plugins[0].author must be an object with a 'name' field"
            $fail = 1
        }
    } elseif ($plugin0.author -is [string]) {
        Write-Host "FAIL: marketplace.json plugins[0].author must be an object with a 'name' field"
        Write-Host "      String form (e.g., ""author"": ""someone"") is rejected by Claude Code's schema."
        $fail = 1
    }

    # === Cross-manifest version consistency ===

    if (-not [string]::IsNullOrEmpty($pluginJson.version) -and -not [string]::IsNullOrEmpty($plugin0.version)) {
        if ($pluginJson.version -ne $plugin0.version) {
            Write-Host "FAIL: plugin.json version ($($pluginJson.version)) does not match marketplace.json plugins[0].version ($($plugin0.version))"
            $fail = 1
        }
    }

    # === Plugin name consistency ===

    if (-not [string]::IsNullOrEmpty($pluginJson.name) -and -not [string]::IsNullOrEmpty($plugin0.name)) {
        if ($pluginJson.name -ne $plugin0.name) {
            Write-Host "FAIL: plugin.json name ($($pluginJson.name)) does not match marketplace.json plugins[0].name ($($plugin0.name))"
            $fail = 1
        }
    }

    # === Source resolution check ===

    if ($null -ne $plugin0.source -and $plugin0.source -is [string]) {
        $resolvedSource1 = Join-Path $root ".claude-plugin/$($plugin0.source)"
        $resolvedSource2 = Join-Path $root $plugin0.source
        if (-not (Test-Path $resolvedSource1) -and -not (Test-Path $resolvedSource2)) {
            Write-Host "WARN: marketplace.json plugins[0].source ($($plugin0.source)) does not resolve to an existing directory"
            Write-Host "      Expected one of: $resolvedSource1 or $resolvedSource2"
        }
    }
}

# === Final result ===

if ($fail -eq 0) {
    Write-Host "PASS: plugin install path validated"
    Write-Host "  plugin.json: $($pluginJson.name) @ $($pluginJson.version)"
    Write-Host "  marketplace.json: $($marketJson.name) (owner: $($marketJson.owner.name))"
    if ($null -ne $marketJson.plugins -and $marketJson.plugins.Count -gt 0) {
        $p0 = $marketJson.plugins[0]
        Write-Host "  plugin entry: $($p0.name) @ $($p0.version) (source: $($p0.source))"
    }
}

exit $fail
