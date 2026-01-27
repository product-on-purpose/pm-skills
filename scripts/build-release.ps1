# pm-skills v2.0 release packager (PowerShell)
# Builds pm-skills-v2.0.zip with flat skills/commands and helper scripts.

$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$OutDir = Join-Path $Root "dist"
$Stage = Join-Path $OutDir "stage"
$Zip = Join-Path $OutDir "pm-skills-v2.0.zip"

Remove-Item -Recurse -Force $OutDir -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path $Stage | Out-Null

# Populate .claude via helper
& "$Root/scripts/sync-claude.ps1"

# Stage contents
$toCopy = @(
  "skills","commands","_bundles","scripts",
  ".claude/pm-skills-for-claude.md",
  "README.md","QUICKSTART.md","AGENTS.md","CHANGELOG.md","docs"
)
foreach ($item in $toCopy) {
  Copy-Item -Recurse -Force -Path (Join-Path $Root $item) -Destination $Stage
}

# Ensure .claude discovery dirs are not shipped populated
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue (Join-Path $Stage ".claude/skills")
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue (Join-Path $Stage ".claude/commands")

# Build zip
if (Test-Path $Zip) { Remove-Item $Zip }
Compress-Archive -Path (Join-Path $Stage '*') -DestinationPath $Zip

# Hash + manifest
$hash = (Get-FileHash -Algorithm SHA256 $Zip).Hash
Set-Content -Path (Join-Path $OutDir "pm-skills-v2.0.zip.sha256") -Value "$hash  pm-skills-v2.0.zip"
@"
pm-skills v2.0 release
ZIP: pm-skills-v2.0.zip
SHA256: $hash
"@ | Set-Content -Path (Join-Path $OutDir "manifest.txt")

Write-Host "Release built: $Zip"
Write-Host "SHA256: $hash"
