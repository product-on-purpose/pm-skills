# check-count-consistency.ps1 . Detect stale hardcoded counts in docs.
#
# Counts actual skills, commands, and workflows, then scans tracked .md and
# .json files for hardcoded numbers that no longer match.
#
# Exit codes:
#   0 . All counts are consistent
#   1 . Stale counts detected
#
# Usage:
#   .\scripts\check-count-consistency.ps1

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Split-Path -Parent $ScriptDir

$Fail = $false

Write-Host "=== Count Consistency Check ==="
Write-Host ""

# --- Count actual resources ---

$SkillCount = (Get-ChildItem -Path (Join-Path $Root "skills") -Directory).Count
$CommandCount = (Get-ChildItem -Path (Join-Path $Root "commands") -Filter "*.md").Count
$WorkflowCount = (Get-ChildItem -Path (Join-Path $Root "_workflows") -Filter "*.md" |
    Where-Object { $_.Name -ne "README.md" }).Count

# --- Derive per-classification / per-phase sub-counts from skill frontmatter ---
#
# Classification sub-counts ("9 foundation skills", "Utility Skills (12)") were
# historically hand-maintained and exempted from this check (see the v2.14.0+
# note in the .md doc). v2.27.1 polices the four frontmatter-derived buckets
# against their source of truth (metadata.classification XOR metadata.phase), so
# a stale "10 utility skills" fails like a stale total. Other subset words
# (domain, shipped, sample, ...) stay exempt because they have no single
# frontmatter-derived count.
$SubCounts = @{ phase = 0; foundation = 0; utility = 0; tool = 0 }
foreach ($dir in Get-ChildItem -Path (Join-Path $Root "skills") -Directory) {
    $skillMd = Join-Path $dir.FullName "SKILL.md"
    if (-not (Test-Path $skillMd -PathType Leaf)) { continue }
    foreach ($l in (Get-Content $skillMd -TotalCount 25)) {
        if ($l -match '^\s*classification:\s*(foundation|utility|tool)\b') { $SubCounts[$Matches[1]]++; break }
        if ($l -match '^\s*phase:\s*[a-z]') { $SubCounts['phase']++; break }
    }
}

Write-Host "Actual counts:"
Write-Host "  Skills:    $SkillCount"
Write-Host "  Commands:  $CommandCount"
Write-Host "  Workflows: $WorkflowCount"
Write-Host "  (sub: phase $($SubCounts['phase']) / foundation $($SubCounts['foundation']) / utility $($SubCounts['utility']) / tool $($SubCounts['tool']))"
Write-Host ""

# --- Scan tracked .md files for hardcoded counts ---

$trackedFiles = git -C $Root ls-files "*.md" "*.mdx" "*.json" | Where-Object { $_ -ne '' }

# Exclusion patterns . files where counts are historical or structural
$excludePatterns = @(
    '^CHANGELOG\.md$',
    '^site/src/content/docs/releases/',
    '^docs/internal/',
    '^site/src/content/docs/changelog\.md$',
    '^\.github/issues-archive/',
    '^\.github/issues-drafts/',
    '^\.github/\.created-issues\.json$',
    '^\.github/scripts/',
    '^_agent-context/claude/CONTEXT\.md$',
    '^_agent-context/claude/DECISIONS\.md$',
    '^_agent-context/SESSION-LOG/',
    '^_agent-context/claude/SESSION-LOG/',
    '^_agent-context/codex/SESSION-LOG/',
    '^library/',
    '^skills/utility-pm-skill-auditor/references/',
    '^site/src/content/docs/skills/utility/utility-pm-skill-auditor\.md$',
    '^scripts/check-count-consistency\.',
    # WS-T9 dual-shell equivalence fixture (see check-count-consistency.sh): the
    # mini-repo under scripts/fixtures/shell-parity/ carries deliberately stale counts
    # for the shell-parity smoke. Exclude it from the REAL repo scan; during the smoke
    # ROOT is the fixture itself, where this pattern matches nothing.
    '^scripts/fixtures/'
)

$filesToCheck = $trackedFiles | Where-Object {
    $file = $_
    $excluded = $false
    foreach ($pattern in $excludePatterns) {
        if ($file -match $pattern) {
            $excluded = $true
            break
        }
    }
    -not $excluded
}

# Minimum threshold . counts below this are likely per-phase/per-category.
# Comparison uses -ge so values equal to the threshold are still checked.
$MinThreshold = 10

# --- Pre-compute count-exempt line ranges per file ---
#
# Files can mark sections as historical/exempt with comment markers. Two
# comment styles are recognized so the same mechanism works in Markdown and
# MDX (Astro rejects HTML comments in .mdx, so .mdx files use the JSX form):
#   .md  : <!-- count-exempt:start --> ... <!-- count-exempt:end -->
#   .mdx : {/* count-exempt:start */} ... {/* count-exempt:end */}
# Detection matches the bare 'count-exempt:start'/'count-exempt:end' token.
#
# This replaces the prior 'v[0-9]+\.' substring exemption with a principled
# section-aware mechanism.

$exemptRanges = @{}
foreach ($file in $filesToCheck) {
    $fullPath = Join-Path $Root $file
    if (-not (Test-Path $fullPath -PathType Leaf)) { continue }
    $lines = Get-Content $fullPath -ErrorAction SilentlyContinue
    if ($null -eq $lines) { continue }
    $start = 0
    $ranges = @()
    for ($i = 0; $i -lt $lines.Count; $i++) {
        $ln = $i + 1
        if ($lines[$i] -match 'count-exempt:start') { $start = $ln; continue }
        if ($lines[$i] -match 'count-exempt:end') {
            if ($start -gt 0) { $ranges += @{ Start = $start; End = $ln }; $start = 0 }
        }
    }
    if ($ranges.Count -gt 0) { $exemptRanges[$file] = $ranges }
}

$mismatches = @()

# Patterns to check: (regex, resource name, actual count, subset-descriptor regex)
#
# Subset-descriptor exclusions: phrases like "26 phase skills",
# "40 skill commands" describe subsets of the total, not total counts. The
# validator must not flag them as stale (the number is correct for its
# subset). The SubsetPattern is checked against the slice immediately after
# the digit and before the resource name; any match excludes the candidate.
$checks = @(
    @{ Pattern = '(\d+)\s+(?:[a-zA-Z][a-zA-Z-]*\s+){0,3}skills'; Name = 'skills'; Count = $SkillCount; SubsetPattern = '(\d+)\s+(phase|foundation|utility|tool|domain|shipped|embedded|test|sample|library|lines?)\b' },
    @{ Pattern = '(\d+)\s+(?:[a-zA-Z][a-zA-Z-]*\s+){0,3}commands'; Name = 'commands'; Count = $CommandCount; SubsetPattern = '(\d+)\s+(skill|workflow)[\s-]' },
    @{ Pattern = '(\d+)\s+(?:[a-zA-Z][a-zA-Z-]*\s+){0,3}workflows'; Name = 'workflows'; Count = $WorkflowCount; SubsetPattern = $null }
)

foreach ($file in $filesToCheck) {
    $fullPath = Join-Path $Root $file
    if (-not (Test-Path $fullPath -PathType Leaf)) { continue }

    $lines = Get-Content $fullPath -ErrorAction SilentlyContinue
    if ($null -eq $lines) { continue }

    $lineNum = 0
    $fileRanges = $null
    if ($exemptRanges.ContainsKey($file)) { $fileRanges = $exemptRanges[$file] }

    foreach ($line in $lines) {
        $lineNum++

        # Skip lines inside count-exempt sections (canonical mechanism for
        # historical content like README "What's New" release entries).
        if ($null -ne $fileRanges) {
            $inExempt = $false
            foreach ($r in $fileRanges) {
                if ($lineNum -ge $r.Start -and $lineNum -le $r.End) { $inExempt = $true; break }
            }
            if ($inExempt) { continue }
        }

        foreach ($check in $checks) {
            # Build set of subset-flagged numbers in this line so we can
            # skip them when the broader pattern matches the same digit.
            $subsetNums = @{}
            if ($null -ne $check.SubsetPattern) {
                $subsetMatches = [regex]::Matches($line, $check.SubsetPattern, 'IgnoreCase')
                foreach ($sm in $subsetMatches) { $subsetNums[$sm.Groups[1].Value] = $true }
            }

            $regexMatches = [regex]::Matches($line, $check.Pattern, 'IgnoreCase')
            foreach ($m in $regexMatches) {
                $rawNum = $m.Groups[1].Value
                if ($subsetNums.ContainsKey($rawNum)) { continue }
                $num = [int]$rawNum
                if ($num -ne $check.Count -and $num -ge $MinThreshold) {
                    $mismatches += "  ${file}:${lineNum}: found '$num $($check.Name)' (actual: $($check.Count))"
                    $Fail = $true
                }
            }
        }

        # Badge counts (FU-5): shields.io encodes the total as 'badge/skills-<N>'
        # (number after the resource word), which the prose patterns above miss.
        foreach ($bm in [regex]::Matches($line, 'badge/skills-(\d+)')) {
            $bnum = [int]$bm.Groups[1].Value
            if ($bnum -ne $SkillCount) {
                $mismatches += "  ${file}:${lineNum}: found badge 'skills-$bnum' (actual: $SkillCount)"
                $Fail = $true
            }
        }

        # Number-AFTER-resource coverage (v2.20.0): facts-table rows
        # ("| Slash commands | 73 |", "| Skills | 63 |") and parenthetical forms
        # ("Commands (73)") put the number AFTER the resource word; the prose
        # patterns above only match number-before. Subset-qualified parentheticals
        # ("domain skills (26)") are excluded, matching check_resource.
        $tbl = [regex]::Match($line, '\|\s*\*{0,2}(?:slash )?(skill|command|workflow)s?\*{0,2}\s*\|\s*(\d+)', 'IgnoreCase')
        if ($tbl.Success) {
            $rWord = $tbl.Groups[1].Value.ToLower()
            $r = if ($rWord -eq 'command') { 'commands' } elseif ($rWord -eq 'workflow') { 'workflows' } else { 'skills' }
            $tnum = [int]$tbl.Groups[2].Value
            $tactual = if ($r -eq 'commands') { $CommandCount } elseif ($r -eq 'workflows') { $WorkflowCount } else { $SkillCount }
            if ($tnum -ne $tactual -and $tnum -ge $MinThreshold) {
                $mismatches += "  ${file}:${lineNum}: found table '$r = $tnum' (actual: $tactual)"
                $Fail = $true
            }
        }

        foreach ($pm in [regex]::Matches($line, '(?:[a-z][a-z-]*\s)?(skill|command|workflow)s?\s\((\d+)\)', 'IgnoreCase')) {
            $seg = $pm.Value.ToLower()
            $rWord = $pm.Groups[1].Value.ToLower()
            $r = if ($rWord -eq 'command') { 'commands' } elseif ($rWord -eq 'workflow') { 'workflows' } else { 'skills' }
            $isSubset = $false
            if ($r -eq 'skills' -and $seg -match '^(phase|foundation|utility|tool|domain|shipped|embedded|test|sample|library)\s') { $isSubset = $true }
            if ($r -eq 'commands' -and $seg -match '^(skill|workflow)\s') { $isSubset = $true }
            if (-not $isSubset) {
                $pnum = [int]$pm.Groups[2].Value
                $pactual = if ($r -eq 'commands') { $CommandCount } elseif ($r -eq 'workflows') { $WorkflowCount } else { $SkillCount }
                if ($pnum -ne $pactual -and $pnum -ge $MinThreshold) {
                    $mismatches += "  ${file}:${lineNum}: found '$r ($pnum)' (actual: $pactual)"
                    $Fail = $true
                }
            }
        }

        # Singular-resource + count-noun coverage (v2.20.0): "N skill directories",
        # "N command markdown files", "N command docs" - the singular resource used as
        # an adjective before a count-noun, missed by the plural prose patterns. Anchored
        # to count-nouns (directory/file/doc) to avoid "command line" / "skill level".
        foreach ($sn in [regex]::Matches($line, '(\d+)\s+(skill|command)s?\s+(?:markdown\s+)?(?:director(?:y|ies)|files?|docs?)', 'IgnoreCase')) {
            $rWord = $sn.Groups[2].Value.ToLower()
            $r = if ($rWord -eq 'command') { 'commands' } else { 'skills' }
            $snum = [int]$sn.Groups[1].Value
            $sactual = if ($r -eq 'commands') { $CommandCount } else { $SkillCount }
            if ($snum -ne $sactual -and $snum -ge $MinThreshold) {
                $mismatches += "  ${file}:${lineNum}: found '$($sn.Value)' (actual: $sactual)"
                $Fail = $true
            }
        }

        # Per-classification / per-phase sub-counts (v2.27.1). The total checks
        # above EXEMPT the bucket words (phase/foundation/utility/tool); these
        # checks instead validate them against the frontmatter-derived buckets.
        # Two surface forms: number-before ("25 phase skills", "15 tool-
        # classification entries") and parenthetical ("Phase Skills (30)"). No
        # MinThreshold (foundation = 9 < 10 must still be policed).
        foreach ($cm in [regex]::Matches($line, '(\d+)\s+(phase|foundation|utility)[ -]skills?', 'IgnoreCase')) {
            $bucket = $cm.Groups[2].Value.ToLower()
            $cnum = [int]$cm.Groups[1].Value
            if ($cnum -ne $SubCounts[$bucket]) {
                $mismatches += "  ${file}:${lineNum}: found '$cnum $bucket skills' (actual: $($SubCounts[$bucket]))"
                $Fail = $true
            }
        }
        foreach ($cm in [regex]::Matches($line, '(\d+)\s+tool[ -](?:classification|skills?|entries)', 'IgnoreCase')) {
            $cnum = [int]$cm.Groups[1].Value
            if ($cnum -ne $SubCounts['tool']) {
                $mismatches += "  ${file}:${lineNum}: found '$cnum tool (classification)' (actual: $($SubCounts['tool']))"
                $Fail = $true
            }
        }
        foreach ($cm in [regex]::Matches($line, '(phase|foundation|utility|tool)\s+skills?\s*\((\d+)\)', 'IgnoreCase')) {
            $bucket = $cm.Groups[1].Value.ToLower()
            $cnum = [int]$cm.Groups[2].Value
            if ($cnum -ne $SubCounts[$bucket]) {
                $mismatches += "  ${file}:${lineNum}: found '$bucket skills ($cnum)' (actual: $($SubCounts[$bucket]))"
                $Fail = $true
            }
        }
    }
}

if (-not $Fail) {
    Write-Host "PASS: No stale counts found in tracked .md or .json files."
    exit 0
} else {
    Write-Host "Stale counts found:"
    Write-Host ""
    foreach ($m in $mismatches) {
        Write-Host $m
    }
    Write-Host ""
    Write-Host "FAIL: One or more hardcoded counts are stale."
    exit 1
}
