$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Fail = $false

Get-ChildItem -Path (Join-Path $Root "skills") -Directory | ForEach-Object {
    $dir = $_
    $skillPath = Join-Path $dir.FullName "SKILL.md"
    $rel = $skillPath.Substring($Root.Length + 1)
    $skillFail = $false

    if (-not (Test-Path $skillPath)) {
        Write-Host "✗ $($dir.Name) : missing SKILL.md"
        $Fail = $true
        return
    }

    $lines = Get-Content $skillPath
    $start = -1
    $end = -1
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i].Trim() -eq '---') {
            if ($start -eq -1) { $start = $i; continue }
            if ($end -eq -1) { $end = $i; break }
        }
    }

    if ($start -eq -1 -or $end -le $start) {
        Write-Host "✗ $rel : missing or invalid front matter"
        $Fail = $true
        return
    }

    $front = $lines[($start + 1)..($end - 1)]

    $nameLine = $front | Where-Object { $_ -match '^name:' } | Select-Object -First 1
    if (-not $nameLine) {
        Write-Host "✗ $rel : missing name"
        $Fail = $true
        $skillFail = $true
    }
    else {
        $nameValue = ($nameLine -split ':', 2)[1].Trim()
        if ($nameValue -ne $dir.Name) {
            Write-Host "✗ $rel : name mismatch (front matter: $nameValue, dir: $($dir.Name))"
            $Fail = $true
            $skillFail = $true
        }
    }

    foreach ($key in @('phase','version','updated','license')) {
        if (-not ($front | Where-Object { $_ -match "^${key}:" })) {
            Write-Host "✗ $rel : missing $key"
            $Fail = $true
            $skillFail = $true
        }
    }

    $rootVersionCount = ($front | Where-Object { $_ -match '^version:' }).Count
    if ($rootVersionCount -ne 1) {
        Write-Host "✗ $rel : expected exactly one root version (found $rootVersionCount)"
        $Fail = $true
        $skillFail = $true
    }

    $inMeta = $false
    $metaVersion = $false
    foreach ($line in $front) {
        $trim = $line.TrimEnd()
        if ($trim -match '^metadata:\s*$') { $inMeta = $true; continue }
        if ($inMeta -and ($trim -notmatch '^\s')) { $inMeta = $false }
        if ($inMeta -and $trim -match '^\s+version:') { $metaVersion = $true }
    }
    if ($metaVersion) {
        Write-Host "✗ $rel : metadata.version present (remove nested version)"
        $Fail = $true
        $skillFail = $true
    }

    foreach ($ref in @('TEMPLATE.md','EXAMPLE.md')) {
        $refPath = Join-Path (Join-Path $dir.FullName 'references') $ref
        if (-not (Test-Path $refPath)) {
            Write-Host "✗ $rel : missing references/$ref"
            $Fail = $true
            $skillFail = $true
        }
    }

    if (-not $skillFail) {
        Write-Host "✓ $rel"
    }
}

if ($Fail) { exit 1 } else { exit 0 }
