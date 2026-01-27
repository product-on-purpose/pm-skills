# pm-skills sync helper for Claude Code / openskills discovery
# Populates .claude/skills and .claude/commands from the flat source tree.

$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$CS = Join-Path $Root ".claude/skills"
$CC = Join-Path $Root ".claude/commands"

New-Item -ItemType Directory -Force -Path $CS, $CC | Out-Null

Write-Host "Validating skills..."
Get-ChildItem -Path (Join-Path $Root "skills") -Directory | ForEach-Object {
  $name = $_.Name
  $dir = $_.FullName
  $required = @("SKILL.md","references/TEMPLATE.md","references/EXAMPLE.md")
  foreach ($f in $required) {
    if (-not (Test-Path (Join-Path $dir $f))) { throw "Missing $f in $name" }
  }
  $target = Join-Path $CS $name
  Remove-Item -Recurse -Force -ErrorAction SilentlyContinue $target
  New-Item -ItemType Directory -Force -Path $target | Out-Null
  Copy-Item -Path "$dir/*" -Destination $target -Recurse -Force
  Write-Host "  [OK] $name"
}

Write-Host ""
Write-Host "Syncing commands..."
Get-ChildItem -Path (Join-Path $Root "commands") -Filter "*.md" | ForEach-Object {
  Copy-Item -Path $_.FullName -Destination $CC -Force
  Write-Host "  [OK] $($_.Name)"
}

Write-Host ""
Write-Host "Sync complete. Claude Code discovery directories populated under .claude/."
