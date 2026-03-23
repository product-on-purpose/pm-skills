$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

function Write-Advisory {
    param([string]$Message)

    if ($env:GITHUB_ACTIONS -eq "true") {
        Write-Host "::warning::$Message"
    }
    else {
        Write-Host "[WARN] $Message"
    }
}

$diffOutput = $null
if ($env:GITHUB_BASE_REF -and (git rev-parse --verify --quiet "origin/$($env:GITHUB_BASE_REF)" 2>$null)) {
    $diffOutput = git diff --name-status "origin/$($env:GITHUB_BASE_REF)...HEAD"
}
elseif (git rev-parse --verify --quiet HEAD^ 2>$null) {
    $diffOutput = git diff --name-status HEAD^ HEAD
}
else {
    Write-Advisory "Unable to determine a diff base; skipping MCP impact advisory."
    exit 0
}

$impactFound = $false
foreach ($line in $diffOutput) {
    if ([string]::IsNullOrWhiteSpace($line)) {
        continue
    }

    $parts = $line -split "`t"
    if ($parts.Count -lt 2) {
        continue
    }

    $status = $parts[0]
    $first = $parts[1]
    $second = if ($parts.Count -ge 3) { $parts[2] } else { $null }

    if ($status -eq 'A' -and $first -match '^skills/[a-z0-9-]+/SKILL\.md$') {
        Write-Advisory "New skill detected ($first). Review whether pm-skills-mcp needs a corresponding sync update."
        $impactFound = $true
        continue
    }

    if ($status -match '^R\d+$' -and
        $first -match '^skills/[a-z0-9-]+/SKILL\.md$' -and
        $second -match '^skills/[a-z0-9-]+/SKILL\.md$' -and
        $first -ne $second) {
        Write-Advisory "Skill rename detected ($first -> $second). Review whether pm-skills-mcp needs a corresponding sync update."
        $impactFound = $true
    }
}

if (-not $impactFound) {
    Write-Host "[OK] No MCP-impacting skill additions or renames detected"
}

exit 0
