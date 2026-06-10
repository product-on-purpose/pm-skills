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

# --- Per-family checks on the docs homepage (WS-A1, v2.26.0) ---
# Parity with check-landing-page-counts.sh: every homepage card title
# ("Family (N skills)") and the three bold prose family claims must match the
# skills/<prefix>-* filesystem count; the cards must sum to the catalog total;
# a parse miss is itself a FAIL so a markup rewrite cannot silently disable
# the check. See the .sh twin for the full rationale (2026-06-09 audit).

function Get-FamilySkillCount {
  param([string]$Prefix)
  return (Get-ChildItem -Path (Join-Path $Root 'skills') -Directory -Filter "$Prefix-*").Count
}

function Test-HomepageCards {
  $file = Join-Path $Root 'site/src/content/docs/index.mdx'
  $label = 'Homepage cards'

  if (-not (Test-Path $file)) {
    Write-Host "  SKIP: $file (not present)"
    return
  }

  $content = Get-Content -Path $file -Raw -Encoding UTF8
  $cards = [regex]::Matches($content, '<Card title="([A-Za-z]+) \((\d+) skills?\)"')

  if ($cards.Count -eq 0) {
    Write-Host "  FAIL: $label - no '<Card title=`"Family (N skills)`">' patterns parsed; homepage markup changed?"
    $failures.Add("$file`: per-card check parsed zero cards; update check-landing-page-counts alongside the markup") | Out-Null
    return
  }

  $sum = 0
  foreach ($m in $cards) {
    $family = $m.Groups[1].Value
    $n = [int]$m.Groups[2].Value
    $prefix = $family.ToLower()
    $actual = Get-FamilySkillCount $prefix
    $sum += $n
    if ($actual -eq 0) {
      Write-Host "  FAIL: $label - card family '$family' matches no skills/$prefix-* directories"
      $failures.Add("$file`: card family '$family' has no matching skill directories") | Out-Null
    } elseif ($n -ne $actual) {
      Write-Host "  FAIL: $label - '$family ($n skills)' but skills/$prefix-* has $actual"
      $failures.Add("$file`: card '$family' claims $n; actual $actual") | Out-Null
    } else {
      Write-Host "  OK:   $label - $family ($n skills) matches filesystem"
    }
  }

  if ($sum -ne $skillCount) {
    Write-Host "  FAIL: $label - cards sum to $sum but the catalog has $skillCount skills (missing or extra card?)"
    $failures.Add("$file`: card sum $sum != catalog total $skillCount") | Out-Null
  } else {
    Write-Host "  OK:   $label - cards sum to catalog total $skillCount"
  }
}

function Test-HomepageProseFamily {
  param([string]$Display, [string]$Prefix)
  $file = Join-Path $Root 'site/src/content/docs/index.mdx'
  $label = 'Homepage family prose'

  if (-not (Test-Path $file)) {
    Write-Host "  SKIP: $file (not present)"
    return
  }

  $content = Get-Content -Path $file -Raw -Encoding UTF8
  $m = [regex]::Match($content, "\*\*$([regex]::Escape($Display)) \((\d+)\)\*\*")

  if (-not $m.Success) {
    Write-Host "  FAIL: $label - pattern '**$Display (N)**' not found; homepage prose changed?"
    $failures.Add("$file`: prose family '$Display' not parsed; update check-landing-page-counts alongside the prose") | Out-Null
    return
  }

  $claim = [int]$m.Groups[1].Value
  $actual = Get-FamilySkillCount $Prefix
  if ($claim -ne $actual) {
    Write-Host "  FAIL: $label - '**$Display ($claim)**' but skills/$Prefix-* has $actual"
    $failures.Add("$file`: prose '$Display' claims $claim; actual $actual") | Out-Null
  } else {
    Write-Host "  OK:   $label - $Display ($claim) matches filesystem"
  }
}

Write-Host "Checking landing pages:"
Test-LandingPage (Join-Path $Root 'site/src/content/docs/index.mdx') $skillCount 'skills' 'Docs site homepage'
Test-LandingPage (Join-Path $Root 'site/src/content/docs/skills/index.md') $skillCount 'skills' 'Skills landing page'
Test-LandingPage (Join-Path $Root 'site/src/content/docs/workflows/index.md') $workflowCount 'workflows' 'Workflows landing page'
Test-LandingPage (Join-Path $Root 'library/skill-output-samples/README_SAMPLES.md') $skillCount 'skills' 'Samples library README'

Write-Host ""
Write-Host "Checking homepage per-family counts:"
Test-HomepageCards
Test-HomepageProseFamily 'Foundation' 'foundation'
Test-HomepageProseFamily 'Utility' 'utility'
Test-HomepageProseFamily 'Workshop tools' 'tool'

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
