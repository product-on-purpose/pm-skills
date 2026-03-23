$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$AgentsPath = Join-Path $Root "AGENTS.md"
$Fail = $false

if (-not (Test-Path $AgentsPath)) {
    Write-Host "[FAIL] AGENTS.md : file not found"
    exit 1
}

$skillPaths = Get-ChildItem -Path (Join-Path $Root "skills") -Directory |
    ForEach-Object { "skills/$($_.Name)/SKILL.md" } |
    Sort-Object -Unique

if ($skillPaths.Count -eq 0) {
    Write-Host "[FAIL] skills/ : no skill directories found"
    exit 1
}

$agentsContent = Get-Content $AgentsPath -Raw
$matches = [regex]::Matches($agentsContent, 'skills/[a-z0-9-]+/SKILL\.md')

if ($matches.Count -eq 0) {
    Write-Host "[FAIL] AGENTS.md : no skill paths found"
    exit 1
}

$agentsPaths = $matches | ForEach-Object { $_.Value } | Sort-Object -Unique
$duplicatePaths = $matches |
    Group-Object Value |
    Where-Object { $_.Count -gt 1 } |
    ForEach-Object { $_.Name }

foreach ($path in $skillPaths) {
    if ($agentsPaths -notcontains $path) {
        Write-Host "[FAIL] AGENTS.md : missing entry for $path"
        $Fail = $true
    }
}

foreach ($path in $agentsPaths) {
    if (-not (Test-Path (Join-Path $Root $path))) {
        Write-Host "[FAIL] AGENTS.md : orphan entry $path"
        $Fail = $true
    }
}

foreach ($path in $duplicatePaths) {
    Write-Host "[FAIL] AGENTS.md : duplicate entry $path"
    $Fail = $true
}

if (-not $Fail) {
    Write-Host "[OK] AGENTS.md matches $($skillPaths.Count) skill paths"
}

if ($Fail) { exit 1 } else { exit 0 }
