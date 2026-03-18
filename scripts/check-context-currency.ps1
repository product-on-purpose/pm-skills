$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Fail = $false

# Extract latest release version from CHANGELOG.md (first ## [X.Y.Z] heading, skips [Unreleased])
$changelogPath = Join-Path $Root "CHANGELOG.md"
$changelogContent = Get-Content $changelogPath -Raw
$changelogMatch = [regex]::Match($changelogContent, '## \[(\d+\.\d+\.\d+)\]')
if (-not $changelogMatch.Success) {
    Write-Host "[FAIL] Could not extract a release version from CHANGELOG.md"
    exit 1
}
$changelogVersion = "v$($changelogMatch.Groups[1].Value)"

# Check each AGENTS/*/CONTEXT.md
$agentsDir = Join-Path $Root "AGENTS"
$contextFiles = Get-ChildItem -Path $agentsDir -Recurse -Depth 2 -Filter "CONTEXT.md" |
    Where-Object { $_.FullName -match 'AGENTS[\\/][^\\/]+[\\/]CONTEXT\.md$' }

if ($contextFiles.Count -eq 0) {
    Write-Host "[FAIL] No AGENTS/*/CONTEXT.md files found"
    exit 1
}

foreach ($ctx in $contextFiles) {
    $rel = $ctx.FullName.Substring($Root.Length).TrimStart('\', '/')
    $content = Get-Content $ctx.FullName -Raw

    # Take the first vX.Y.Z reference in the file as the declared version
    $versionMatch = [regex]::Match($content, 'v\d+\.\d+\.\d+')
    if (-not $versionMatch.Success) {
        Write-Host "[FAIL] $rel : no version reference found"
        $Fail = $true
        continue
    }
    $ctxVersion = $versionMatch.Value

    if ($ctxVersion -ne $changelogVersion) {
        Write-Host "[STALE] $rel : shows $ctxVersion but CHANGELOG is at $changelogVersion"
        $Fail = $true
    } else {
        Write-Host "[OK] $rel : $ctxVersion"
    }
}

if (-not $Fail) {
    Write-Host "[OK] All CONTEXT.md files are current ($changelogVersion)"
}

if ($Fail) { exit 1 } else { exit 0 }
