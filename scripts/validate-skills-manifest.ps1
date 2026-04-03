$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Fail = $false

function Get-CleanScalar {
    param([string]$Value)

    if ($null -eq $Value) {
        return $null
    }

    $clean = ($Value -replace '\s+#.*$', '').Trim()
    return $clean.Trim('"').Trim("'")
}

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

    return Get-CleanScalar -Value (($line -split ':', 2)[1])
}

function Get-ManifestEntries {
    param([string]$Path)

    $entries = New-Object System.Collections.Generic.List[object]
    $inSkills = $false
    $current = $null

    foreach ($line in (Get-Content $Path)) {
        $trimmed = $line.TrimEnd()

        if (-not $inSkills -and $trimmed -match '^skills:\s*$') {
            $inSkills = $true
            continue
        }

        if (-not $inSkills) {
            continue
        }

        if ($trimmed -match '^\s*-\s+name:\s*(.+)$') {
            if ($null -ne $current) {
                $entries.Add([pscustomobject]@{
                    Name = Get-CleanScalar -Value $current.Name
                    Version = Get-CleanScalar -Value $current.Version
                    ChangeType = Get-CleanScalar -Value $current.ChangeType
                })
            }

            $current = [ordered]@{
                Name = $Matches[1]
                Version = $null
                ChangeType = $null
            }
            continue
        }

        if ($null -eq $current) {
            continue
        }

        if ($trimmed -match '^\s+version:\s*(.+)$') {
            $current.Version = $Matches[1]
            continue
        }

        if ($trimmed -match '^\s+change_type:\s*(.+)$') {
            $current.ChangeType = $Matches[1]
        }
    }

    if ($null -ne $current) {
        $entries.Add([pscustomobject]@{
            Name = Get-CleanScalar -Value $current.Name
            Version = Get-CleanScalar -Value $current.Version
            ChangeType = Get-CleanScalar -Value $current.ChangeType
        })
    }

    return $entries
}

$manifestFiles = @(Get-ChildItem -Path (Join-Path $Root "docs/internal/release-plans") -Recurse -Depth 2 -Filter "skills-manifest.yaml" |
    Where-Object { $_.FullName -match 'docs[\\/]internal[\\/]release-plans[\\/][^\\/]+[\\/]skills-manifest\.yaml$' })

if ($manifestFiles.Count -eq 0) {
    exit 0
}

$latestRelease = $null
$latestVersion = $null
foreach ($manifest in $manifestFiles) {
    $releaseDir = Split-Path -Leaf $manifest.DirectoryName
    if ($releaseDir -notmatch '^v(\d+)\.(\d+)\.(\d+)$') {
        continue
    }

    $candidate = [version]::new([int]$Matches[1], [int]$Matches[2], [int]$Matches[3])
    if ($null -eq $latestVersion -or $candidate -gt $latestVersion) {
        $latestVersion = $candidate
        $latestRelease = $releaseDir
    }
}

foreach ($manifest in $manifestFiles) {
    $rel = $manifest.FullName.Substring($Root.Length + 1)
    $releaseDir = Split-Path -Leaf $manifest.DirectoryName
    $manifestFail = $false
    $manifestWarn = $false

    foreach ($entry in (Get-ManifestEntries -Path $manifest.FullName)) {
        if (-not $entry.Name) {
            continue
        }

        $skillDir = Join-Path (Join-Path $Root "skills") $entry.Name

        if ($entry.ChangeType -ne 'removed' -and -not (Test-Path $skillDir -PathType Container)) {
            Write-Host "[FAIL] $rel : skill '$($entry.Name)' not found in skills/"
            $Fail = $true
            $manifestFail = $true
            continue
        }

        if ($releaseDir -eq $latestRelease -and $entry.ChangeType -ne 'removed') {
            $skillPath = Join-Path $skillDir "SKILL.md"
            if (-not (Test-Path $skillPath -PathType Leaf)) {
                Write-Host "[FAIL] $rel : skill '$($entry.Name)' is missing SKILL.md"
                $Fail = $true
                $manifestFail = $true
                continue
            }

            $frontmatter = Get-FrontmatterLines -Path $skillPath
            if (-not $frontmatter) {
                Write-Host "[FAIL] $rel : skill '$($entry.Name)' has missing or invalid front matter"
                $Fail = $true
                $manifestFail = $true
                continue
            }

            $currentVersion = Get-FrontmatterValue -Frontmatter $frontmatter -Key 'version'
            if (-not $currentVersion) {
                Write-Host "[FAIL] $rel : skill '$($entry.Name)' is missing version in SKILL.md"
                $Fail = $true
                $manifestFail = $true
                continue
            }

            if ($entry.Version -and $entry.Version -ne $currentVersion) {
                Write-Host "[FAIL] $rel : skill '$($entry.Name)' lists version $($entry.Version) but current SKILL.md is $currentVersion (warning only)"
                $manifestWarn = $true
            }
        }
    }

    if (-not $manifestFail -and -not $manifestWarn) {
        Write-Host "[OK] $rel"
    }
}

if ($Fail) { exit 1 } else { exit 0 }
