#!/usr/bin/env pwsh
# check-workflow-generator-coverage.ps1 - PowerShell parity for check-workflow-generator-coverage.sh.
# v2.15.1 addition closing audit finding A03.
# See check-workflow-generator-coverage.sh for the canonical comment block.

[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Split-Path -Parent $ScriptDir

$WorkflowsSrc = Join-Path $Root '_workflows'
$WorkflowsOut = Join-Path $Root 'docs/workflows'
$WorkflowsIndex = Join-Path $WorkflowsOut 'index.md'

Write-Host "=== Workflow Generator Coverage Check ==="
Write-Host ""

if (-not (Test-Path $WorkflowsSrc -PathType Container)) {
  Write-Host "FAIL: source directory not found: $WorkflowsSrc"
  exit 1
}

if (-not (Test-Path $WorkflowsIndex -PathType Leaf)) {
  Write-Host "FAIL: generated index not found: $WorkflowsIndex"
  exit 1
}

$fail = $false

$sourceStems = Get-ChildItem -Path $WorkflowsSrc -Filter '*.md' -File |
  Where-Object { $_.Name -ne 'README.md' } |
  ForEach-Object { [System.IO.Path]::GetFileNameWithoutExtension($_.Name) } |
  Sort-Object

$indexContent = Get-Content -Path $WorkflowsIndex -Raw -Encoding UTF8

Write-Host "Checking individual generated pages:"
foreach ($stem in $sourceStems) {
  $pagePath = Join-Path $WorkflowsOut "$stem.md"
  if (Test-Path $pagePath) {
    Write-Host "  OK:   $stem.md present in docs/workflows/"
  } else {
    Write-Host "  FAIL: $stem.md missing from docs/workflows/ (source exists but no generated page)"
    $fail = $true
  }
}

Write-Host ""
Write-Host "Checking index-table coverage:"
foreach ($stem in $sourceStems) {
  $linkPattern = "\]\($([regex]::Escape($stem))\.md\)"
  if ($indexContent -match $linkPattern) {
    Write-Host "  OK:   $stem.md linked from index"
  } else {
    Write-Host "  FAIL: $stem.md NOT linked from $WorkflowsIndex (silent drop; run generator + add to workflow_info dict)"
    $fail = $true
  }
}

Write-Host ""

$sourceCount = $sourceStems.Count
$indexRows = ([regex]::Matches($indexContent, "(?m)^\| \[")).Count
$generatedPages = (Get-ChildItem -Path $WorkflowsOut -Filter '*.md' -File |
  Where-Object { $_.Name -ne 'index.md' -and $_.Name -ne 'README.md' }).Count

Write-Host "Summary:"
Write-Host "  Source workflows:    $sourceCount"
Write-Host "  Generated pages:     $generatedPages"
Write-Host "  Index table rows:    $indexRows"

if ($sourceCount -ne $indexRows -or $sourceCount -ne $generatedPages) {
  Write-Host ""
  Write-Host "FAIL: count mismatch (source=$sourceCount, generated=$generatedPages, index=$indexRows)"
  $fail = $true
}

Write-Host ""

if (-not $fail) {
  Write-Host "PASS: every workflow source has an individual page and an index-table row."
  exit 0
} else {
  Write-Host "FAIL: workflow generator coverage gap detected."
  Write-Host "Fix: run 'python scripts/generate-workflow-pages.py' AND add any missing"
  Write-Host "workflow_info entries (plus matching order list entries) in the generator."
  exit 1
}
