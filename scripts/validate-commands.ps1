$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Fail = $false

Get-ChildItem -Path (Join-Path $Root "commands") -Filter "*.md" | ForEach-Object {
    $name = $_.Name
    $content = Get-Content $_.FullName -Raw
    $matches = [regex]::Matches($content, "skills/[a-z0-9-]+/SKILL\.md")
    if ($matches.Count -eq 0) {
        Write-Host "✗ $name : no skill path found"
        $Fail = $true
        return
    }

    $checkedAll = $true
    foreach ($m in $matches) {
        $path = $m.Value
        $skillDir = Split-Path (Join-Path $Root $path) -Parent
        if (-not (Test-Path (Join-Path $Root $path))) {
            Write-Host "✗ $name : referenced SKILL missing ($path)"
            $Fail = $true
            $checkedAll = $false
            continue
        }
        foreach ($ref in @("TEMPLATE.md","EXAMPLE.md")) {
            if (-not (Test-Path (Join-Path $skillDir "references/$ref"))) {
                Write-Host "✗ $name : missing $ref in $($skillDir)/references/"
                $Fail = $true
                $checkedAll = $false
            }
        }
    }

    if ($checkedAll) {
        $suffix = ""
        if ($matches.Count -gt 1) {
            $suffix = " (multiple skill references; checked $($matches.Count))"
        }
        Write-Host "✓ $name -> $($matches[0].Value)$suffix"
    }
}

if ($Fail) { exit 1 } else { exit 0 }
