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

function Get-MetadataValue {
    param(
        [string[]]$Frontmatter,
        [string]$Key
    )

    # Read a value from the first indent level inside the metadata: block.
    $inMeta = $false
    foreach ($line in $Frontmatter) {
        if ($line -match '^metadata:\s*$') { $inMeta = $true; continue }
        if ($inMeta) {
            if ($line -notmatch '^\s') { $inMeta = $false; continue }
            if ($line -match "^\s+${Key}:\s*(.*)$") { return $Matches[1].Trim() }
        }
    }
    return $null
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

    if ($lines.Count -eq 0 -or $lines[0].Trim() -ne '---') {
        Write-Host "[FAIL] $rel : first line must be '---' (skills.sh CLI requires YAML frontmatter delimiter at line 1; no preamble, comments, or attribution headers allowed)"
        $Fail = $true
        $skillFail = $true
    }

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
        $rawDescription = $descriptionValue.Trim()
        $isQuoted = ($rawDescription.StartsWith('"') -and $rawDescription.EndsWith('"')) -or ($rawDescription.StartsWith("'") -and $rawDescription.EndsWith("'"))
        $descriptionValue = $rawDescription.Trim('"').Trim("'")
        $descriptionWords = Get-WordCount -Text $descriptionValue
        if ($descriptionWords -lt 20 -or $descriptionWords -gt 100) {
            Write-Host "[FAIL] $rel : description must be 20-100 words (found $descriptionWords)"
            $Fail = $true
            $skillFail = $true
        }
        if (-not $isQuoted -and $descriptionValue -match ': ') {
            Write-Host "[FAIL] $rel : description contains inline ': ' which breaks strict YAML parsing (skills.sh CLI). Reword to remove the colon, or wrap the whole description in double quotes."
            $Fail = $true
            $skillFail = $true
        }
    }

    # v2.17.0 spec migration: top-level keeps name/description/license only.
    # version/updated/phase/classification move under metadata: per agentskills.io.
    if (-not ($front | Where-Object { $_ -match '^license:' })) {
        Write-Host "[FAIL] $rel : missing top-level license"
        $Fail = $true
        $skillFail = $true
    }

    foreach ($key in @('version','updated','phase','classification')) {
        if ($front | Where-Object { $_ -match "^${key}:" }) {
            Write-Host "[FAIL] $rel : top-level '$key' found (move under metadata: per v2.17.0 migration)"
            $Fail = $true
            $skillFail = $true
        }
    }

    $metaVersion = Get-MetadataValue -Frontmatter $front -Key 'version'
    $metaUpdated = Get-MetadataValue -Frontmatter $front -Key 'updated'
    if (-not $metaVersion) {
        Write-Host "[FAIL] $rel : missing metadata.version"
        $Fail = $true
        $skillFail = $true
    }
    if (-not $metaUpdated) {
        Write-Host "[FAIL] $rel : missing metadata.updated"
        $Fail = $true
        $skillFail = $true
    }

    $metaPhase = Get-MetadataValue -Frontmatter $front -Key 'phase'
    $metaClassification = Get-MetadataValue -Frontmatter $front -Key 'classification'

    $validPhases = @('discover','define','develop','deliver','measure','iterate')
    $validClassifications = @('foundation','utility','tool')

    if ($metaPhase -and ($validPhases -notcontains $metaPhase)) {
        Write-Host "[FAIL] $rel : invalid metadata.phase '$metaPhase' (expected one of: $($validPhases -join ', '))"
        $Fail = $true
        $skillFail = $true
    }

    if ($metaClassification -and ($validClassifications -notcontains $metaClassification)) {
        Write-Host "[FAIL] $rel : invalid metadata.classification '$metaClassification' (expected one of: $($validClassifications -join ', '))"
        $Fail = $true
        $skillFail = $true
    }

    if ($metaPhase -and $metaClassification) {
        Write-Host "[FAIL] $rel : both metadata.phase and metadata.classification present (use exactly one)"
        $Fail = $true
        $skillFail = $true
    }
    elseif (-not $metaPhase -and -not $metaClassification) {
        Write-Host "[FAIL] $rel : missing metadata.phase or metadata.classification (need exactly one)"
        $Fail = $true
        $skillFail = $true
    }

    foreach ($ref in @('TEMPLATE.md','EXAMPLE.md')) {
        $refPath = Join-Path -Path $dir.FullName -ChildPath "references/$ref"
        if (-not (Test-Path $refPath)) {
            Write-Host "[FAIL] $rel : missing references/$ref"
            $Fail = $true
            $skillFail = $true
        } else {
            # Byte-0 placement check: only enforce on the bug pattern (HTML comment
            # on line 1, '---' on line 2). Avoids false positives on markdown
            # horizontal rules in body content.
            $refLines = Get-Content $refPath -ErrorAction SilentlyContinue
            $line1 = if ($refLines.Count -ge 1) { $refLines[0].Trim() } else { '' }
            $line2 = if ($refLines.Count -ge 2) { $refLines[1].Trim() } else { '' }
            if ($line1 -match '^<!--.*-->$' -and $line2 -eq '---') {
                $refRel = $refPath -replace [regex]::Escape("$Root\"), ''
                $refRel = $refRel -replace '\\', '/'
                Write-Host "[FAIL] $refRel : frontmatter byte-0 violation (HTML comment on line 1, '---' on line 2; move comment to line immediately after closing '---' fence)"
                $Fail = $true
                $skillFail = $true
            }
        }
    }

    $templatePath = Join-Path -Path $dir.FullName -ChildPath "references/TEMPLATE.md"
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

# W3.5: byte-0 check for library samples
$samplesDir = Join-Path -Path $Root -ChildPath 'library/skill-output-samples'
if (Test-Path $samplesDir) {
    Get-ChildItem -Path $samplesDir -Filter 'sample_*.md' -Recurse -File | ForEach-Object {
        $sample = $_.FullName
        $sampleRel = $sample -replace [regex]::Escape("$Root\"), ''
        $sampleRel = $sampleRel -replace '\\', '/'
        $sampleLines = Get-Content $sample -ErrorAction SilentlyContinue
        $sl1 = if ($sampleLines.Count -ge 1) { $sampleLines[0].Trim() } else { '' }
        $sl2 = if ($sampleLines.Count -ge 2) { $sampleLines[1].Trim() } else { '' }
        if ($sl1 -match '^<!--.*-->$' -and $sl2 -eq '---') {
            Write-Host "[FAIL] $sampleRel : frontmatter byte-0 violation (HTML comment on line 1, '---' on line 2; move comment to line immediately after closing '---' fence)"
            $Fail = $true
        }
    }
}

# YAML parse-validity check across all in-scope files. Catches the
# unquoted-colon-in-value defect class that github's frontmatter renderer
# rejects. The byte-0 check is structural placement; this is parse-validity.
$yamlFiles = @()
$yamlFiles += Get-ChildItem -Path (Join-Path $Root 'skills') -Recurse -File |
    Where-Object { $_.Name -in @('SKILL.md', 'TEMPLATE.md', 'EXAMPLE.md') } |
    ForEach-Object { $_.FullName }
if (Test-Path $samplesDir) {
    $yamlFiles += Get-ChildItem -Path $samplesDir -Filter 'sample_*.md' -Recurse -File |
        ForEach-Object { $_.FullName }
}
if ($yamlFiles.Count -gt 0) {
    # Batch files to avoid argument-list-too-long on large corpora.
    # Mirrors the Bash version's batching behavior.
    $batchSize = 50
    for ($i = 0; $i -lt $yamlFiles.Count; $i += $batchSize) {
        $batch = $yamlFiles[$i..([Math]::Min($i + $batchSize - 1, $yamlFiles.Count - 1))]
        & node (Join-Path $Root 'scripts/check-frontmatter-yaml.mjs') @batch
        if ($LASTEXITCODE -ne 0) {
            $Fail = $true
        }
    }
}

if ($Fail) { exit 1 } else { exit 0 }
