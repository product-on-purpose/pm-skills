$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Fail = $false

Get-ChildItem -Path (Join-Path $Root "skills") -Directory | ForEach-Object {
    $dir = $_
    $skillPath = Join-Path $dir.FullName "SKILL.md"
    $rel = $skillPath.Substring($Root.Length + 1)
    $skillFail = $false

    if (-not (Test-Path $skillPath)) {
        Write-Host "[FAIL] $($dir.Name) : missing SKILL.md"
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
        Write-Host "[FAIL] $rel : missing or invalid front matter"
        $Fail = $true
        return
    }

    $front = $lines[($start + 1)..($end - 1)]

    $nameLine = $front | Where-Object { $_ -match '^name:' } | Select-Object -First 1
    if (-not $nameLine) {
        Write-Host "[FAIL] $rel : missing name"
        $Fail = $true
        $skillFail = $true
    }
    else {
        $nameValue = ($nameLine -split ':', 2)[1].Trim()
        if ($nameValue -ne $dir.Name) {
            Write-Host "[FAIL] $rel : name mismatch (front matter: $nameValue, dir: $($dir.Name))"
            $Fail = $true
            $skillFail = $true
        }
    }

    foreach ($key in @('version','updated','license')) {
        if (-not ($front | Where-Object { $_ -match "^${key}:" })) {
            Write-Host "[FAIL] $rel : missing $key"
            $Fail = $true
            $skillFail = $true
        }
    }

    $phaseLine = $front | Where-Object { $_ -match '^phase:' } | Select-Object -First 1
    $classificationLine = $front | Where-Object { $_ -match '^classification:' } | Select-Object -First 1
    $phaseValue = if ($phaseLine) { (($phaseLine -split ':', 2)[1].Trim()) } else { $null }
    $classificationValue = if ($classificationLine) { (($classificationLine -split ':', 2)[1].Trim()) } else { $null }

    $validPhases = @('discover','define','develop','deliver','measure','iterate')
    $validClassifications = @('domain','foundation','utility')

    if ($phaseValue -and ($validPhases -notcontains $phaseValue)) {
        Write-Host "[FAIL] $rel : invalid phase '$phaseValue' (expected one of: $($validPhases -join ', '))"
        $Fail = $true
        $skillFail = $true
    }

    if ($classificationValue -and ($validClassifications -notcontains $classificationValue)) {
        Write-Host "[FAIL] $rel : invalid classification '$classificationValue' (expected one of: $($validClassifications -join ', '))"
        $Fail = $true
        $skillFail = $true
    }

    if ($classificationValue -in @('foundation','utility')) {
        if ($phaseLine) {
            Write-Host "[FAIL] $rel : phase should be omitted for classification '$classificationValue'"
            $Fail = $true
            $skillFail = $true
        }
    }
    elseif ($classificationValue -eq 'domain') {
        if (-not $phaseLine) {
            Write-Host "[FAIL] $rel : missing phase for domain classification"
            $Fail = $true
            $skillFail = $true
        }
    }
    else {
        if (-not $phaseLine) {
            Write-Host "[FAIL] $rel : missing phase (or set classification to foundation/utility)"
            $Fail = $true
            $skillFail = $true
        }
    }

    $rootVersionCount = ($front | Where-Object { $_ -match '^version:' }).Count
    if ($rootVersionCount -ne 1) {
        Write-Host "[FAIL] $rel : expected exactly one root version (found $rootVersionCount)"
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
        Write-Host "[FAIL] $rel : metadata.version present (remove nested version)"
        $Fail = $true
        $skillFail = $true
    }

    foreach ($ref in @('TEMPLATE.md','EXAMPLE.md')) {
        $refPath = Join-Path (Join-Path $dir.FullName 'references') $ref
        if (-not (Test-Path $refPath)) {
            Write-Host "[FAIL] $rel : missing references/$ref"
            $Fail = $true
            $skillFail = $true
        }
    }

    if (-not $skillFail) {
        Write-Host "[OK] $rel"
    }
}

if ($Fail) { exit 1 } else { exit 0 }
