$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Fail = $false

function Get-FrontmatterValue {
    param(
        [string[]]$Frontmatter,
        [string]$Key
    )

    $line = $Frontmatter | Where-Object { $_ -match "^${Key}:" } | Select-Object -First 1
    if (-not $line) {
        return $null
    }

    return ($line -split ':', 2)[1].Trim()
}

function Get-WordCount {
    param([string]$Text)

    if ([string]::IsNullOrWhiteSpace($Text)) {
        return 0
    }

    return ([regex]::Matches($Text, '\S+')).Count
}

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

    $nameValue = Get-FrontmatterValue -Frontmatter $front -Key 'name'
    if (-not $nameValue) {
        Write-Host "[FAIL] $rel : missing name"
        $Fail = $true
        $skillFail = $true
    }
    elseif ($nameValue -ne $dir.Name) {
        Write-Host "[FAIL] $rel : name mismatch (front matter: $nameValue, dir: $($dir.Name))"
        $Fail = $true
        $skillFail = $true
    }

    $descriptionValue = Get-FrontmatterValue -Frontmatter $front -Key 'description'
    if (-not $descriptionValue) {
        Write-Host "[FAIL] $rel : missing description"
        $Fail = $true
        $skillFail = $true
    }
    else {
        $descriptionValue = $descriptionValue.Trim().Trim('"').Trim("'")
        $descriptionWords = Get-WordCount -Text $descriptionValue
        if ($descriptionWords -lt 20 -or $descriptionWords -gt 100) {
            Write-Host "[FAIL] $rel : description must be 20-100 words (found $descriptionWords)"
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

    $phaseValue = Get-FrontmatterValue -Frontmatter $front -Key 'phase'
    $classificationValue = Get-FrontmatterValue -Frontmatter $front -Key 'classification'

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
        if ($phaseValue) {
            Write-Host "[FAIL] $rel : phase should be omitted for classification '$classificationValue'"
            $Fail = $true
            $skillFail = $true
        }
    }
    elseif ($classificationValue -eq 'domain') {
        if (-not $phaseValue) {
            Write-Host "[FAIL] $rel : missing phase for domain classification"
            $Fail = $true
            $skillFail = $true
        }
    }
    else {
        if (-not $phaseValue) {
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
        $refPath = Join-Path (Join-Path $dir 'references') $ref
        if (-not (Test-Path $refPath)) {
            Write-Host "[FAIL] $rel : missing references/$ref"
            $Fail = $true
            $skillFail = $true
        }
    }

    $templatePath = Join-Path (Join-Path $dir 'references') 'TEMPLATE.md'
    if (Test-Path $templatePath) {
        $templateHeaderCount = (Get-Content $templatePath | Where-Object { $_ -match '^## ' }).Count
        if ($templateHeaderCount -lt 3) {
            Write-Host "[FAIL] $rel : references/TEMPLATE.md must contain at least 3 level-2 headers (found $templateHeaderCount)"
            $Fail = $true
            $skillFail = $true
        }
    }

    if (-not $skillFail) {
        Write-Host "[OK] $rel"
    }
}

if ($Fail) { exit 1 } else { exit 0 }
