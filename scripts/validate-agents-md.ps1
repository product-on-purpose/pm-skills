$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$AgentsPath = Join-Path $Root "AGENTS.md"
$Fail = $false

if (-not (Test-Path $AgentsPath)) {
    Write-Host "[FAIL] AGENTS.md : file not found"
    exit 1
}

# Enumerates ALL skill directories under skills/, regardless of classification
# prefix (domain/foundation/utility/tool). Adding a new classification (e.g.,
# tool added 2026-05-13) requires no validator changes.
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

# Sub-agent recognition extension (v2.16.0 per master plan D19).
# Enumerates agents/*.md files (excluding _-prefixed files like
# _chain-permitted.yaml, and README.md) and verifies each agent NAME appears
# at least once in AGENTS.md.
# Design wrinkle per D5 + D12: AGENTS.md references sub-agents by NAME (not path),
# with runtime-components.md as canonical catalog. So this check is name-based,
# not path-based like the skills/ scan above.
$agentsDir = Join-Path $Root "agents"
if (Test-Path $agentsDir -PathType Container) {
    $agentFiles = Get-ChildItem -Path $agentsDir -Filter "*.md" -File |
        Where-Object { $_.BaseName -notmatch '^_' -and $_.BaseName -ne 'README' } |
        ForEach-Object { $_.BaseName }

    if ($agentFiles.Count -gt 0) {
        $subagentFail = $false
        foreach ($agent in $agentFiles) {
            if ($agentsContent -notmatch [regex]::Escape($agent)) {
                Write-Host "[FAIL] AGENTS.md : missing reference to sub-agent $agent (file: agents/$agent.md)"
                $Fail = $true
                $subagentFail = $true
            }
        }
        if (-not $subagentFail) {
            Write-Host "[OK] AGENTS.md references $($agentFiles.Count) sub-agents from agents/ directory"
        }
    }
}

if ($Fail) { exit 1 } else { exit 0 }
