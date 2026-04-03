$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Fail = $false
$FoundAny = $false

function Get-FrontmatterLines {
    param([string]$Path)

    $lines = Get-Content $Path
    $start = -1
    $end = -1

    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i].Trim() -eq '---') {
            if ($start -eq -1) {
                $start = $i
                continue
            }

            $end = $i
            break
        }
    }

    if ($start -eq -1 -or $end -le $start) {
        return $null
    }

    return $lines[($start + 1)..($end - 1)]
}

function Get-FrontmatterValue {
    param(
        [string[]]$Frontmatter,
        [string]$Key
    )

    $line = $Frontmatter | Where-Object { $_ -match "^${Key}:" } | Select-Object -First 1
    if (-not $line) {
        return $null
    }

    $value = ($line -split ':', 2)[1].Trim()
    $value = ($value -replace '\s+#.*$', '').Trim()
    return $value.Trim('"').Trim("'")
}

function Get-HistoryTableVersions {
    param([string]$Path)

    $versions = New-Object System.Collections.Generic.List[string]
    $inTable = $false

    foreach ($line in (Get-Content $Path)) {
        $trimmed = $line.TrimEnd()

        if (-not $inTable -and $trimmed -match '^\|\s*Version\s*\|') {
            $inTable = $true
            continue
        }

        if (-not $inTable) {
            continue
        }

        if ($trimmed -match '^\|[\s\-\:\|]+\|?\s*$') {
            continue
        }

        if ($trimmed -notmatch '^\|') {
            break
        }

        $cells = $trimmed.TrimStart('|').Split('|')
        if ($cells.Count -eq 0) {
            continue
        }

        $version = $cells[0].Trim()
        if (-not [string]::IsNullOrWhiteSpace($version) -and -not $versions.Contains($version)) {
            $versions.Add($version)
        }
    }

    return $versions
}

function Test-HistorySection {
    param(
        [string]$Path,
        [string]$Version
    )

    $pattern = "(?m)^##\s+$([regex]::Escape($Version))(\s|\(|$)"
    return [regex]::IsMatch((Get-Content $Path -Raw), $pattern)
}

Get-ChildItem -Path (Join-Path $Root "skills") -Directory | ForEach-Object {
    $historyPath = Join-Path $_.FullName "HISTORY.md"
    if (-not (Test-Path $historyPath)) {
        return
    }

    $FoundAny = $true
    $skillPath = Join-Path $_.FullName "SKILL.md"
    $rel = $historyPath.Substring($Root.Length + 1)

    if (-not (Test-Path $skillPath)) {
        Write-Host "[FAIL] $rel : missing sibling SKILL.md"
        $Fail = $true
        return
    }

    $frontmatter = Get-FrontmatterLines -Path $skillPath
    if (-not $frontmatter) {
        Write-Host "[FAIL] $rel : sibling SKILL.md missing or invalid front matter"
        $Fail = $true
        return
    }

    $currentVersion = Get-FrontmatterValue -Frontmatter $frontmatter -Key 'version'
    if (-not $currentVersion) {
        Write-Host "[FAIL] $rel : sibling SKILL.md is missing version"
        $Fail = $true
        return
    }

    $tableVersions = @(Get-HistoryTableVersions -Path $historyPath)
    if ($tableVersions.Count -eq 0) {
        Write-Host "[FAIL] $rel : no version entries found in the summary table"
        $Fail = $true
        return
    }

    $currentFound = $tableVersions -contains $currentVersion
    foreach ($version in $tableVersions) {
        if (-not (Test-HistorySection -Path $historyPath -Version $version)) {
            Write-Host "[FAIL] $rel : summary table version $version has no corresponding '## $version' section (warning only)"
        }
    }

    if (-not $currentFound) {
        Write-Host "[FAIL] $rel : current version $currentVersion is missing from the summary table"
        $Fail = $true
        return
    }

    Write-Host "[OK] $rel : current version $currentVersion found in the summary table"
}

if (-not $FoundAny) {
    exit 0
}

if ($Fail) { exit 1 } else { exit 0 }
