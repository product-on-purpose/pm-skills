# check-skill-sample-coverage.ps1
#
# PowerShell parity for check-skill-sample-coverage.sh. Enforces that every
# in-scope content skill (phase / foundation / tool, minus the documented
# exemption allowlist) has a library thread sample for storevine, brainshelf,
# and workbench. Spec: docs/internal/release-plans/v2.23.0/spec_check-skill-sample-coverage.md

$ErrorActionPreference = 'Stop'

$repo = Split-Path -Parent $PSScriptRoot
$skillsDir = Join-Path $repo 'skills'
$libDir = Join-Path $repo 'library/skill-output-samples'
$threads = @('storevine', 'brainshelf', 'workbench')
$exemptNames = @('deliver-acceptance-criteria')  # documented storevine-only single-thread
$inScope = @('discover', 'define', 'develop', 'deliver', 'measure', 'iterate', 'foundation', 'tool')

$fail = $false
$checked = 0

Get-ChildItem -Path $skillsDir -Directory | Sort-Object Name | ForEach-Object {
  $name = $_.Name
  $skillMd = Join-Path $_.FullName 'SKILL.md'
  if (-not (Test-Path $skillMd)) { return }

  $cls = ''
  $inMeta = $false
  foreach ($line in Get-Content $skillMd) {
    if ($line -match '^metadata:') { $inMeta = $true; continue }
    if ($inMeta -and $line -match '^\s\s(classification|phase):\s*(\S+)') { $cls = $Matches[2]; break }
  }
  if ($inScope -notcontains $cls) { return }
  if ($exemptNames -contains $name) { return }

  $script:checked++
  $sd = Join-Path $libDir $name
  foreach ($th in $threads) {
    $hit = $false
    if (Test-Path $sd) {
      $g1 = Get-ChildItem -Path $sd -Filter "sample_${name}_${th}_*.md" -ErrorAction SilentlyContinue
      $g2 = Test-Path (Join-Path $sd "sample_${name}_${th}.md")
      if ($g1 -or $g2) { $hit = $true }
    }
    if (-not $hit) {
      Write-Output "FAIL: $name ($cls) is missing a '$th' thread sample (expected library/skill-output-samples/$name/sample_${name}_${th}_*.md)"
      $script:fail = $true
    }
  }
}

Write-Output "Checked $checked in-scope skills (phase / foundation / tool, minus exemptions)."
if ($fail) {
  Write-Output "FAIL: one or more in-scope skills are missing required thread samples."
  Write-Output "Fix: add library/skill-output-samples/<skill>/sample_<skill>_<thread>_*.md for storevine, brainshelf, and workbench (or add a documented exemption to this script)."
  exit 1
}
Write-Output "PASS: all in-scope skills have storevine + brainshelf + workbench thread samples."
exit 0
