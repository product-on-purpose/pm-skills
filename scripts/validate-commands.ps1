$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Fail = $false

Get-ChildItem -Path (Join-Path $Root "commands") -Filter "*.md" | ForEach-Object {
    $name = $_.Name
    $content = Get-Content $_.FullName -Raw
    $match = [regex]::Match($content, "skills/[a-z0-9-]+/SKILL\.md")
    if (-not $match.Success) {
        Write-Host "✗ $name : no skill path found"
        $Fail = $true
        return
    }
    $path = $match.Value
    $skillDir = Split-Path (Join-Path $Root $path) -Parent
    if (-not (Test-Path (Join-Path $Root $path))) {
        Write-Host "✗ $name : referenced SKILL missing ($path)"
        $Fail = $true
        return
    }
    foreach ($ref in @("TEMPLATE.md","EXAMPLE.md")) {
        if (-not (Test-Path (Join-Path $skillDir "references/$ref"))) {
            Write-Host "✗ $name : missing $ref in $($skillDir)/references/"
            $Fail = $true
        }
    }
    Write-Host "✓ $name -> $path"
}

if ($Fail) { exit 1 } else { exit 0 }
