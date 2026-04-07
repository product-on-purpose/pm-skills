param(
    [string]$Version
)

# pm-skills release packager (PowerShell)
# Builds pm-skills-vX.Y.Z.zip with skills/commands, sample library, docs, and helper scripts.

$ErrorActionPreference = "Stop"

$Version = if ($Version) { $Version } elseif ($Env:VERSION) { $Env:VERSION } else { $null }
if (-not $Version) {
    $tag = git describe --tags --abbrev=0 2>$null
    if ($LASTEXITCODE -eq 0 -and $tag) {
        $Version = $tag.Trim()
    }
}
if (-not $Version) { $Version = "2.0.1" }
$Version = $Version -replace '^v',''

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$OutDir = Join-Path $Root "dist"
$Stage = Join-Path $OutDir "stage"
$Zip = Join-Path $OutDir "pm-skills-v$Version.zip"

Remove-Item -Recurse -Force $OutDir -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path $Stage | Out-Null

# Populate .claude via helper
& "$Root/scripts/sync-claude.ps1"

# Stage contents
$toCopy = @(
  "skills","commands","_workflows","scripts",
  "library",
  ".claude-plugin",
  ".claude/pm-skills-for-claude.md",
  "README.md","QUICKSTART.md","AGENTS.md","CHANGELOG.md","docs"
)
foreach ($item in $toCopy) {
  Copy-Item -Recurse -Force -Path (Join-Path $Root $item) -Destination $Stage
}

# Keep tracked internal governance docs in-repo, but do not ship them.
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue (Join-Path $Stage "docs/internal")

# Ensure sample library is present in staged artifact.
$SampleDir = Join-Path $Stage "library/skill-output-samples"
if (-not (Test-Path $SampleDir)) {
  throw "Missing required sample library directory: $SampleDir"
}

$sampleFiles = Get-ChildItem -Path $SampleDir -Recurse -File |
  Where-Object {
    $_.Name -cmatch '^sample_[a-z0-9-]+_[a-z0-9-]+_[a-z0-9-]+\.md$'
  }
if ($sampleFiles.Count -eq 0) {
  throw "No sample files found in staged sample library: $SampleDir"
}

# Ensure plugin manifest exists and version matches release version in staged artifact.
$PluginManifest = Join-Path $Stage ".claude-plugin/plugin.json"
if (-not (Test-Path $PluginManifest)) {
  throw "Missing required plugin manifest: $PluginManifest"
}

$plugin = Get-Content -Raw $PluginManifest | ConvertFrom-Json
$plugin.version = $Version
Set-Content -Path $PluginManifest -Value (($plugin | ConvertTo-Json -Depth 10) + "`n") -Encoding utf8

$versionRegex = '"version"\s*:\s*"' + [Regex]::Escape($Version) + '"'
if (-not ((Get-Content -Raw $PluginManifest) -match $versionRegex)) {
  throw "Failed to set staged plugin manifest version to $Version"
}

# Ensure .claude discovery dirs are not shipped populated
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue (Join-Path $Stage ".claude/skills")
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue (Join-Path $Stage ".claude/commands")

# Build zip
if (Test-Path $Zip) { Remove-Item $Zip }
Compress-Archive -Path (Join-Path $Stage '*') -DestinationPath $Zip

# Hash + manifest
$hash = (Get-FileHash -Algorithm SHA256 $Zip).Hash
Set-Content -Path (Join-Path $OutDir "pm-skills-v$Version.zip.sha256") -Value "$hash  pm-skills-v$Version.zip"
@"
pm-skills v$Version release
ZIP: pm-skills-v$Version.zip
SHA256: $hash
"@ | Set-Content -Path (Join-Path $OutDir "manifest.txt")

Write-Host "Release built: $Zip"
Write-Host "SHA256: $hash"
