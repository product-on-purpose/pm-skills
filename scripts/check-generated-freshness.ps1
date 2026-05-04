# check-generated-freshness.ps1 . Verify generated workflow pages match source.
#
# If scripts/generate-workflow-pages.py exists, runs it to a temp directory
# and diffs against committed docs/workflows/. Otherwise, checks that every
# _workflows/*.md has a matching docs/workflows/*.md.
#
# Exit codes:
#   0 . Generated pages are fresh (or fallback check passes)
#   1 . Generated pages are stale or missing
#
# Usage:
#   .\scripts\check-generated-freshness.ps1

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Split-Path -Parent $ScriptDir

$Fail = $false
$Generator = Join-Path -Path $Root -ChildPath "scripts/generate-workflow-pages.py"

Write-Host "=== Generated Freshness Check ==="
Write-Host ""

if (Test-Path $Generator) {
    Write-Host "Generator found: scripts/generate-workflow-pages.py"
    Write-Host ""

    # Create temp directory
    $TempRoot = Join-Path -Path ([System.IO.Path]::GetTempPath()) -ChildPath "pm-skills-freshness-$(Get-Random)"
    New-Item -ItemType Directory -Path $TempRoot -Force | Out-Null
    New-Item -ItemType Directory -Path (Join-Path -Path $TempRoot -ChildPath "docs/workflows") -Force | Out-Null
    New-Item -ItemType Directory -Path (Join-Path -Path $TempRoot -ChildPath "scripts") -Force | Out-Null

    try {
        # Copy source files needed by the generator
        Copy-Item -Path (Join-Path -Path $Root -ChildPath "_workflows") -Destination $TempRoot -Recurse
        Copy-Item -Path $Generator -Destination (Join-Path -Path $TempRoot -ChildPath "scripts/generate-workflow-pages.py")

        # Try to run the generator
        $genScript = Join-Path -Path $TempRoot -ChildPath "scripts/generate-workflow-pages.py"
        $genSucceeded = $false

        try {
            $pythonCmd = if (Get-Command python3 -ErrorAction SilentlyContinue) { "python3" } else { "python" }
            & $pythonCmd $genScript 2>$null
            if ($LASTEXITCODE -eq 0) { $genSucceeded = $true }
        } catch {
            $genSucceeded = $false
        }

        if ($genSucceeded) {
            Write-Host "Generator ran successfully."
            Write-Host ""

            $committedDir = Join-Path -Path $Root -ChildPath "docs/workflows"
            $generatedDir = Join-Path -Path $TempRoot -ChildPath "docs/workflows"

            $stale = @()
            $genFiles = Get-ChildItem -Path $generatedDir -Filter "*.md" -ErrorAction SilentlyContinue
            foreach ($genFile in $genFiles) {
                $committedFile = Join-Path -Path $committedDir -ChildPath $genFile.Name
                if (-not (Test-Path $committedFile)) {
                    $stale += "$($genFile.Name) (missing from docs/workflows/)"
                    $Fail = $true
                } else {
                    $genContent = Get-Content $genFile.FullName -Raw
                    $comContent = Get-Content $committedFile -Raw
                    if ($genContent -ne $comContent) {
                        $stale += "$($genFile.Name) (content differs)"
                        $Fail = $true
                    }
                }
            }

            if ($stale.Count -gt 0) {
                Write-Host "Stale generated pages:"
                foreach ($s in $stale) {
                    Write-Host "  [FAIL] $s"
                }
                Write-Host ""
                Write-Host "Run 'python scripts/generate-workflow-pages.py' to regenerate."
            }
        } else {
            Write-Host "WARN: Generator failed to run. Falling back to existence check."
            Write-Host ""

            # Fallback: just check file existence
            $workflowFiles = Get-ChildItem -Path (Join-Path $Root "_workflows") -Filter "*.md" |
                Where-Object { $_.Name -ne "README.md" -and -not $_.Name.StartsWith("_") }

            foreach ($wf in $workflowFiles) {
                $docsPage = Join-Path -Path $Root -ChildPath "docs/workflows/$($wf.Name)"
                if (-not (Test-Path $docsPage)) {
                    Write-Host "  [FAIL] Missing: docs/workflows/$($wf.Name)"
                    $Fail = $true
                }
            }
        }
    } finally {
        # Clean up temp directory
        if (Test-Path $TempRoot) {
            Remove-Item -Path $TempRoot -Recurse -Force -Confirm:$false
        }
    }
} else {
    Write-Host "Generator not found: scripts/generate-workflow-pages.py"
    Write-Host "Falling back to existence check."
    Write-Host ""

    # Fallback: check that every _workflows/*.md has a matching docs/workflows/*.md
    $workflowFiles = Get-ChildItem -Path (Join-Path $Root "_workflows") -Filter "*.md" |
        Where-Object { $_.Name -ne "README.md" -and -not $_.Name.StartsWith("_") }

    foreach ($wf in $workflowFiles) {
        $docsPage = Join-Path -Path $Root -ChildPath "docs/workflows/$($wf.Name)"
        if (Test-Path $docsPage) {
            Write-Host "  [OK] docs/workflows/$($wf.Name)"
        } else {
            Write-Host "  [FAIL] Missing: docs/workflows/$($wf.Name)"
            $Fail = $true
        }
    }
}

Write-Host ""
if (-not $Fail) {
    Write-Host "PASS: Generated workflow pages are fresh."
    exit 0
} else {
    Write-Host "FAIL: Generated workflow pages are stale or missing."
    exit 1
}
