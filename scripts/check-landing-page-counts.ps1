#!/usr/bin/env pwsh
# check-landing-page-counts.ps1 - PowerShell parity for check-landing-page-counts.sh.
# v2.15.1 addition closing audit finding A01 + A02.
# See check-landing-page-counts.sh for the canonical comment block.

[CmdletBinding()]
param(
  [switch]$Strict
)

$ErrorActionPreference = 'Stop'

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Split-Path -Parent $ScriptDir

$skillCount = (Get-ChildItem -Path (Join-Path $Root 'skills') -Directory).Count
$commandCount = (Get-ChildItem -Path (Join-Path $Root 'commands') -Filter '*.md' -File).Count
$workflowCount = (Get-ChildItem -Path (Join-Path $Root '_workflows') -Filter '*.md' -File | Where-Object { $_.Name -ne 'README.md' }).Count

Write-Host "=== Landing Page Count Check ==="
Write-Host ""
Write-Host "Source-of-truth counts:"
Write-Host "  Skills:    $skillCount"
Write-Host "  Commands:  $commandCount"
Write-Host "  Workflows: $workflowCount"
Write-Host ""

$failures = New-Object System.Collections.Generic.List[string]

function Test-LandingPage {
  param([string]$File, [int]$Expected, [string]$Resource, [string]$Label)

  if (-not (Test-Path $File)) {
    Write-Host "  SKIP: $File (not present)"
    return
  }

  $content = Get-Content -Path $File -Raw -Encoding UTF8

  # Match "<N> [adj-words]* <resource>" patterns
  $pattern = "\b(\d+)\b\s+(?:[A-Za-z][\w-]*\s+){0,4}$Resource\b"
  $hyphenPattern = "\b(\d+)-$($Resource.TrimEnd('s'))\b"

  $matches1 = [regex]::Matches($content, $pattern, 'IgnoreCase')
  $matches2 = [regex]::Matches($content, $hyphenPattern, 'IgnoreCase')

  $found = @()
  foreach ($m in $matches1) { $found += [int]$m.Groups[1].Value }
  foreach ($m in $matches2) { $found += [int]$m.Groups[1].Value }
  $found = $found | Sort-Object -Unique

  if (-not $found) {
    Write-Host "  INFO: $Label ($File) - no count claim detected for '$Resource'"
    return
  }

  $stale = $found | Where-Object { $_ -ne $Expected }
  if ($stale) {
    # If the expected count appears anywhere, treat stale as historical context
    if ($content -match "\b$Expected\b") {
      Write-Host "  OK:   $Label ($File) - claims expected $Expected $($stale -join ' ') (other counts are historical context)"
    } else {
      Write-Host "  FAIL: $Label ($File) - claims $($stale -join ' ') but actual is $Expected; no $Expected anywhere in file"
      $failures.Add("$File claims stale count(s) $($stale -join ' '); expected $Expected") | Out-Null
    }
  } else {
    Write-Host "  OK:   $Label ($File) - all count claims match $Expected"
  }
}

Write-Host "Checking landing pages:"
Test-LandingPage (Join-Path $Root 'site/src/content/docs/index.mdx') $skillCount 'skills' 'Docs site homepage'
Test-LandingPage (Join-Path $Root 'site/src/content/docs/skills/index.md') $skillCount 'skills' 'Skills landing page'
Test-LandingPage (Join-Path $Root 'site/src/content/docs/workflows/index.md') $workflowCount 'workflows' 'Workflows landing page'
Test-LandingPage (Join-Path $Root 'library/skill-output-samples/README_SAMPLES.md') $skillCount 'skills' 'Samples library README'

Write-Host ""

if ($failures.Count -eq 0) {
  Write-Host "PASS: All landing-page count claims match filesystem."
  exit 0
} else {
  Write-Host "FAIL: Stale landing-page counts detected:"
  foreach ($f in $failures) { Write-Host "  - $f" }
  if ($Strict) { exit 1 }
  Write-Host ""
  Write-Host "(non-strict mode: exiting 0; use -Strict in CI)"
  exit 0
}
