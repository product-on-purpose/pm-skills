#!/usr/bin/env pwsh
# pre-tag-validate.ps1 - PowerShell parity for pre-tag-validate.sh.
# Run every truly-enforcing validator before cutting a release tag.
# v2.15.1 addition codifying the feedback_pre-tag-validator-bundle.md memory rule.
# See pre-tag-validate.sh for the canonical comment block.

[CmdletBinding()]
param(
  [string[]]$Skip = @()
)

$ErrorActionPreference = 'Continue'  # Intentionally not Stop; we want every validator to run

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Split-Path -Parent $ScriptDir

# Truly-enforcing validator inventory. MUST stay in sync with pre-tag-validate.sh
# VALIDATORS (same set, same order). Update BOTH scripts together when adding or
# retiring an enforcing validator - drift here was the P0-01 defect (this bundle
# referenced two retired validators, check-internal-link-validity and
# check-generated-content-untouched, that no longer exist, and omitted
# check-skill-sample-coverage that bash and CI both enforce).
$Validators = @(
  @{ Name = 'lint-skills-frontmatter';                       Script = 'lint-skills-frontmatter.ps1';                       Args = @() }
  @{ Name = 'validate-agents-md';                            Script = 'validate-agents-md.ps1';                            Args = @() }
  @{ Name = 'validate-commands';                             Script = 'validate-commands.ps1';                             Args = @() }
  @{ Name = 'validate-meeting-skills-family';                Script = 'validate-meeting-skills-family.ps1';                Args = @() }
  @{ Name = 'validate-foundation-sprint-skills-family -Strict'; Script = 'validate-foundation-sprint-skills-family.ps1';    Args = @('-Strict') }
  @{ Name = 'validate-design-sprint-skills-family -Strict';  Script = 'validate-design-sprint-skills-family.ps1';          Args = @('-Strict') }
  @{ Name = 'validate-docs-frontmatter -Strict';             Script = 'validate-docs-frontmatter.ps1';                     Args = @('-Strict') }
  @{ Name = 'check-no-body-h1 -Strict';                      Script = 'check-no-body-h1.ps1';                              Args = @('-Strict') }
  @{ Name = 'check-count-consistency';                       Script = 'check-count-consistency.ps1';                       Args = @() }
  @{ Name = 'check-skill-cross-references';                  Script = 'check-skill-cross-references.ps1';                  Args = @() }
  @{ Name = 'validate-script-docs';                          Script = 'validate-script-docs.ps1';                          Args = @() }
  @{ Name = 'validate-version-consistency';                  Script = 'validate-version-consistency.ps1';                  Args = @() }
  @{ Name = 'validate-codex-manifest';                       Script = 'validate-codex-manifest.ps1';                       Args = @() }
  @{ Name = 'check-skill-sample-coverage';                   Script = 'check-skill-sample-coverage.ps1';                   Args = @() }
)

$OptionalValidators = @(
  @{ Name = 'check-landing-page-counts -Strict';            Script = 'check-landing-page-counts.ps1';                     Args = @('-Strict') }
  @{ Name = 'check-workflow-generator-coverage';             Script = 'check-workflow-generator-coverage.ps1';             Args = @() }
  @{ Name = 'check-agents-md-command-sync';                  Script = 'check-agents-md-command-sync.ps1';                  Args = @() }
  @{ Name = 'check-context-currency';                        Script = 'check-context-currency.ps1';                        Args = @() }
)

# Advisory validators: run for visibility but NEVER affect exit status (parity with
# pre-tag-validate.sh ADVISORY_VALIDATORS). check-version-references flags any
# non-current vX.Y.Z; its heuristic matches ~1000+ legitimate provenance refs
# repo-wide with zero real drift, so it is informational only.
$AdvisoryValidators = @(
  @{ Name = 'check-version-references (advisory)';           Script = 'check-version-references.ps1';                      Args = @() }
)

Write-Host "=== pm-skills pre-tag validator bundle ==="
Write-Host ""
Write-Host "Running the full enforcing-validator suite. Every validator that"
Write-Host "fails CI on a release-tag PR is invoked here with the same flags."
Write-Host ""

$fail = $false

function Invoke-Validator {
  param([hashtable]$V, [string]$Tier = 'required')

  $name = $V.Name
  $script = Join-Path $ScriptDir $V.Script

  if ($Tier -eq 'optional' -and -not (Test-Path $script)) {
    Write-Host "SKIP (optional, not present): $name"
    return $true
  }

  if ($Skip -contains $name) {
    Write-Host "SKIP (--Skip flag): $name"
    return $true
  }

  Write-Host -NoNewline "RUN  $name ... "
  $output = & pwsh -NoProfile -File $script @($V.Args) 2>&1
  if ($LASTEXITCODE -eq 0) {
    Write-Host "PASS"
    return $true
  } else {
    Write-Host "FAIL"
    $output | ForEach-Object { Write-Host "    $_" }
    return $false
  }
}

# Advisory runner: runs the validator for visibility, surfaces only its summary
# verdict line, and NEVER affects the bundle exit status (parity with run_advisory
# in pre-tag-validate.sh).
function Invoke-Advisory {
  param([hashtable]$V)

  $name = $V.Name
  $script = Join-Path $ScriptDir $V.Script

  if (-not (Test-Path $script)) {
    Write-Host "SKIP (advisory, not present): $name"
    return
  }

  Write-Host -NoNewline "RUN  $name ... "
  $output = & pwsh -NoProfile -File $script @($V.Args) 2>&1
  $verdict = $output | Select-String -Pattern 'PASS:|WARN:|Found [0-9]+ line' | Select-Object -Last 1
  Write-Host "ADVISORY"
  if ($verdict) { Write-Host "    $($verdict.Line.Trim())" }
}

foreach ($v in $Validators) {
  if (-not (Invoke-Validator -V $v -Tier 'required')) { $fail = $true }
}

Write-Host ""
Write-Host "--- v2.15.1+ preventive validators ---"
foreach ($v in $OptionalValidators) {
  if (-not (Invoke-Validator -V $v -Tier 'optional')) { $fail = $true }
}

Write-Host ""
Write-Host "--- advisory (non-blocking; informational only) ---"
foreach ($v in $AdvisoryValidators) {
  Invoke-Advisory -V $v
}

Write-Host ""
if (-not $fail) {
  Write-Host "=== ALL CHECKS PASSED ==="
  Write-Host "Safe to cut the release tag."
  exit 0
} else {
  Write-Host "=== ONE OR MORE CHECKS FAILED ==="
  Write-Host "Do NOT cut the release tag until every failure is resolved."
  exit 1
}
