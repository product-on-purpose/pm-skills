# check-workflow-coverage.ps1 . Verify every workflow file has matching entries
# across the repo (docs page, AGENTS.md, mkdocs.yml).
#
# Exit codes:
#   0 . All workflows are fully covered
#   1 . One or more workflows are missing entries
#
# Usage:
#   .\scripts\check-workflow-coverage.ps1

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Split-Path -Parent $ScriptDir

$Fail = $false

Write-Host "=== Workflow Coverage Check ==="
Write-Host ""

# Collect workflow slugs (exclude README.md and files starting with _)
$workflowFiles = Get-ChildItem -Path (Join-Path -Path $Root -ChildPath "_workflows") -Filter "*.md" |
    Where-Object { $_.Name -ne "README.md" -and -not $_.Name.StartsWith("_") }

if ($workflowFiles.Count -eq 0) {
    Write-Host "[FAIL] No workflow files found in _workflows/"
    exit 1
}

$slugs = $workflowFiles | ForEach-Object { $_.BaseName }

Write-Host "Found $($slugs.Count) workflow(s) in _workflows/"
Write-Host ""

$AgentsPath = Join-Path -Path $Root -ChildPath "AGENTS.md"
$MkdocsPath = Join-Path -Path $Root -ChildPath "mkdocs.yml"

$agentsContent = if (Test-Path $AgentsPath) { Get-Content $AgentsPath -Raw } else { $null }
$mkdocsContent = if (Test-Path $MkdocsPath) { Get-Content $MkdocsPath -Raw } else { $null }

foreach ($slug in $slugs) {
    # 1. Check docs/workflows/{slug}.md exists
    $docsPage = Join-Path -Path $Root -ChildPath "docs/workflows/$slug.md"
    if (-not (Test-Path $docsPage)) {
        Write-Host "[FAIL] Missing generated page: docs/workflows/$slug.md"
        $Fail = $true
    }

    # 2. Check AGENTS.md contains a reference to the workflow name
    if ($null -eq $agentsContent) {
        Write-Host "[FAIL] AGENTS.md not found"
        $Fail = $true
    } elseif ($agentsContent -notmatch [regex]::Escape($slug)) {
        Write-Host "[FAIL] AGENTS.md: no entry containing '$slug'"
        $Fail = $true
    }

    # 3. Check mkdocs.yml references workflows/{slug}.md
    if ($null -eq $mkdocsContent) {
        Write-Host "[FAIL] mkdocs.yml not found"
        $Fail = $true
    } elseif ($mkdocsContent -notmatch "workflows/$slug\.md") {
        Write-Host "[FAIL] mkdocs.yml: no entry for workflows/$slug.md"
        $Fail = $true
    }
}

# Advisory: check for workflow commands (not required)
Write-Host ""
Write-Host "--- Advisory: Workflow command coverage ---"
foreach ($slug in $slugs) {
    $cmdFile = Join-Path -Path $Root -ChildPath "commands/workflow-$slug.md"
    if (Test-Path $cmdFile) {
        Write-Host "  [OK] commands/workflow-$slug.md"
    } else {
        Write-Host "  [--] commands/workflow-$slug.md (not found - optional)"
    }
}

Write-Host ""
if (-not $Fail) {
    Write-Host "PASS: All $($slugs.Count) workflows have full coverage."
    exit 0
} else {
    Write-Host "FAIL: One or more workflows are missing entries."
    exit 1
}
