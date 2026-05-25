#!/usr/bin/env pwsh
# check-agents-md-command-sync.ps1 - PowerShell parity for check-agents-md-command-sync.sh.
# v2.15.1 addition closing audit finding A04.
# See check-agents-md-command-sync.sh for the canonical comment block.

[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Split-Path -Parent $ScriptDir

$AgentsMd = Join-Path $Root 'AGENTS.md'
$CommandsDir = Join-Path $Root 'commands'

Write-Host "=== AGENTS.md Command Sync Check ==="
Write-Host ""

if (-not (Test-Path $AgentsMd -PathType Leaf)) {
  Write-Host "FAIL: AGENTS.md not found at $AgentsMd"
  exit 1
}

if (-not (Test-Path $CommandsDir -PathType Container)) {
  Write-Host "FAIL: commands/ directory not found at $CommandsDir"
  exit 1
}

$commandFiles = Get-ChildItem -Path $CommandsDir -Filter '*.md' -File |
  ForEach-Object { [System.IO.Path]::GetFileNameWithoutExtension($_.Name) } |
  Sort-Object

$content = Get-Content -Path $AgentsMd -Raw -Encoding UTF8

# Extract every `| \`/<command>\` |` row
$tableMatches = [regex]::Matches($content, "(?m)^\| ``/([a-z][a-z0-9-]*)``")
$tableCommands = @($tableMatches | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique)

Write-Host "Counts:"
Write-Host "  commands/*.md files:           $($commandFiles.Count)"
Write-Host "  AGENTS.md command-table rows:  $($tableCommands.Count)"
Write-Host ""

$fail = $false
$missing = New-Object System.Collections.Generic.List[string]
$orphaned = New-Object System.Collections.Generic.List[string]

foreach ($cmd in $commandFiles) {
  $rowPattern = "(?m)^\| ``/$([regex]::Escape($cmd))``"
  if (-not [regex]::IsMatch($content, $rowPattern)) {
    $missing.Add($cmd) | Out-Null
    $fail = $true
  }
}

foreach ($cmd in $tableCommands) {
  $cmdFile = Join-Path $CommandsDir "$cmd.md"
  if (-not (Test-Path $cmdFile -PathType Leaf)) {
    if ($cmd -like 'workflow-*') {
      # A /workflow- table row advertises a slash command resolved from commands/<cmd>.md.
      # We are already inside the "command file missing" branch, so require the command
      # file (v2.20.0 hardening); the _workflows/<stem>.md source alone is not sufficient.
      $wfStem = $cmd -replace '^workflow-', ''
      $wfFile = Join-Path $Root "_workflows/$wfStem.md"
      if (Test-Path $wfFile -PathType Leaf) {
        $orphaned.Add("$cmd (workflow command advertised in table but commands/$cmd.md is missing)") | Out-Null
      } else {
        $orphaned.Add("$cmd (workflow row: missing BOTH commands/$cmd.md AND _workflows/$wfStem.md)") | Out-Null
      }
      $fail = $true
    } else {
      $orphaned.Add($cmd) | Out-Null
      $fail = $true
    }
  }
}

if ($missing.Count -gt 0) {
  Write-Host "MISSING from AGENTS.md command table (present in commands/ but no table row):"
  foreach ($cmd in $missing) { Write-Host "  - /$cmd" }
  Write-Host ""
}

if ($orphaned.Count -gt 0) {
  Write-Host "ORPHANED in AGENTS.md command table (table row but no commands/<file>.md):"
  foreach ($cmd in $orphaned) { Write-Host "  - /$cmd" }
  Write-Host ""
}

if (-not $fail) {
  Write-Host "PASS: AGENTS.md command table is in sync with commands/."
  exit 0
} else {
  Write-Host "FAIL: AGENTS.md command table is out of sync."
  Write-Host "Fix: hand-edit the table at the bottom of AGENTS.md to add the missing rows"
  Write-Host "or remove the orphaned ones."
  exit 1
}
