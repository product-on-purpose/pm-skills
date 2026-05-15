# Validate foundation-sprint-skills family contract conformance across the
# 7 family skills. Complements (does not duplicate) lint-skills-frontmatter,
# which handles universal skill-frontmatter checks. This script validates
# family-specific structural and reference requirements for the Foundation
# Sprint family.
#
# See: docs/reference/skill-families/foundation-sprint-skills-contract.md
# Architectural amendment 2026-05-13: tool classification, two-family structure.
#
# Scaffolding behavior: when no family skill directories exist yet, the
# validator exits 0 with notices. Once any family skill is authored, the
# contract doc and per-skill checks are enforced.

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$Fail = 0

$ContractPath = "docs/reference/skill-families/foundation-sprint-skills-contract.md"
$ContractFile = Join-Path $Root $ContractPath

$FamilySkills = @(
    "tool-foundation-sprint-readiness",
    "tool-foundation-sprint-brief",
    "tool-foundation-sprint-basics",
    "tool-foundation-sprint-differentiation",
    "tool-foundation-sprint-approach-options",
    "tool-foundation-sprint-magic-lenses",
    "tool-foundation-sprint-founding-hypothesis"
)

$ExpectedMove = @{
    "tool-foundation-sprint-readiness"           = "readiness"
    "tool-foundation-sprint-brief"               = "brief"
    "tool-foundation-sprint-basics"              = "basics"
    "tool-foundation-sprint-differentiation"     = "differentiation"
    "tool-foundation-sprint-approach-options"    = "approach-options"
    "tool-foundation-sprint-magic-lenses"        = "magic-lenses"
    "tool-foundation-sprint-founding-hypothesis" = "founding-hypothesis"
}

function FailSkill([string]$Skill, [string]$Msg) {
    Write-Host "[FAIL] $Skill : $Msg"
    $script:Fail = 1
}

function PassSkill([string]$Skill, [string]$Msg) {
    Write-Host "[OK] $Skill : $Msg"
}

function Get-FrontmatterBlock([string]$FilePath) {
    $lines = Get-Content $FilePath
    if ($lines.Count -eq 0) { return $null }
    $start = -1
    $end = -1
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i].Trim() -eq '---') {
            if ($start -eq -1) { $start = $i; continue }
            if ($end -eq -1) { $end = $i; break }
        }
    }
    if ($start -eq -1 -or $end -le $start) { return $null }
    return $lines[($start + 1)..($end - 1)]
}

function Get-MetadataField([string[]]$Frontmatter, [string]$Field) {
    $inMeta = $false
    foreach ($line in $Frontmatter) {
        $trim = $line.TrimEnd()
        if ($trim -match '^metadata:\s*$') { $inMeta = $true; continue }
        if ($inMeta -and ($trim -notmatch '^\s')) { $inMeta = $false }
        if ($inMeta -and $trim -match "^\s+${Field}:\s*(.*)$") {
            return $matches[1].Trim().Trim('"').Trim("'")
        }
    }
    return $null
}

function Get-RootField([string[]]$Frontmatter, [string]$Field) {
    foreach ($line in $Frontmatter) {
        if ($line -match "^${Field}:\s*(.*)$") {
            return $matches[1].Trim().Trim('"').Trim("'")
        }
    }
    return $null
}

# --- Scaffolding-state detection ---
$AuthoredCount = 0
foreach ($skill in $FamilySkills) {
    if (Test-Path (Join-Path $Root "skills/$skill")) {
        $AuthoredCount++
    }
}

if ($AuthoredCount -eq 0) {
    Write-Host "[NOTICE] foundation-sprint-skills-family : 0 of $($FamilySkills.Count) family skills authored yet (scaffolding phase)."
    Write-Host "[NOTICE] foundation-sprint-skills-family : contract presence + per-skill checks deferred until skills land."
    Write-Host "[NOTICE] foundation-sprint-skills-family : validator exits 0 in scaffolding state."
    exit 0
}

Write-Host "[INFO] foundation-sprint-skills-family : $AuthoredCount of $($FamilySkills.Count) family skills present; enforcing checks."

# --- Check 1: Contract doc exists ---
if (-not (Test-Path $ContractFile)) {
    Write-Host "[FAIL] family-contract : missing canonical contract at $ContractPath"
    $Fail = 1
} else {
    Write-Host "[OK] family-contract : present at $ContractPath"
}

# --- Per-skill checks ---
foreach ($skill in $FamilySkills) {
    $SkillDir = Join-Path $Root "skills/$skill"
    $SkillMd = Join-Path $SkillDir "SKILL.md"
    $TemplateMd = Join-Path $SkillDir "references/TEMPLATE.md"
    $ExampleMd = Join-Path $SkillDir "references/EXAMPLE.md"

    if (-not (Test-Path $SkillDir)) {
        Write-Host "[NOTICE] $skill : skill directory not yet present (expected during scaffolding phase)"
        continue
    }

    if (-not (Test-Path $SkillMd)) { FailSkill $skill "missing SKILL.md"; continue }
    if (-not (Test-Path $TemplateMd)) { FailSkill $skill "missing references/TEMPLATE.md"; continue }
    if (-not (Test-Path $ExampleMd)) { FailSkill $skill "missing references/EXAMPLE.md"; continue }

    $SkillContent = Get-Content $SkillMd -Raw
    $TemplateLines = Get-Content $TemplateMd
    $Frontmatter = Get-FrontmatterBlock $SkillMd

    if ($null -eq $Frontmatter) {
        FailSkill $skill "SKILL.md missing or malformed YAML frontmatter"
        continue
    }

    # Check 2: classification is tool
    $classificationVal = Get-RootField -Frontmatter $Frontmatter -Field 'classification'
    if ($classificationVal -ne 'tool') {
        FailSkill $skill "classification='$classificationVal' (expected 'tool')"
    } else {
        PassSkill $skill "classification: tool"
    }

    # Check 3: metadata.tool equals foundation-sprint
    $metaTool = Get-MetadataField -Frontmatter $Frontmatter -Field 'tool'
    if ($metaTool -ne 'foundation-sprint') {
        FailSkill $skill "metadata.tool='$metaTool' (expected 'foundation-sprint')"
    } else {
        PassSkill $skill "metadata.tool: foundation-sprint"
    }

    # Check 4: metadata.move matches expected
    $metaMove = Get-MetadataField -Frontmatter $Frontmatter -Field 'move'
    $expectedMoveValue = $ExpectedMove[$skill]
    if ($metaMove -ne $expectedMoveValue) {
        FailSkill $skill "metadata.move='$metaMove' (expected '$expectedMoveValue')"
    } else {
        PassSkill $skill "metadata.move: $expectedMoveValue"
    }

    # Check 5: SKILL.md references the family contract
    if ($SkillContent -notmatch [regex]::Escape($ContractPath)) {
        FailSkill $skill "SKILL.md does not reference family contract path ($ContractPath)"
    } else {
        PassSkill $skill "SKILL.md references family contract"
    }

    # Check 6: TEMPLATE.md ends with a Decider Checkpoint section
    $CheckpointLine = -1
    for ($i = 0; $i -lt $TemplateLines.Count; $i++) {
        if ($TemplateLines[$i] -match '^#{1,6}\s+Decider Checkpoint') {
            $CheckpointLine = $i + 1
            break
        }
    }
    if ($CheckpointLine -eq -1) {
        FailSkill $skill "TEMPLATE.md missing 'Decider Checkpoint' section (required by family contract)"
    } else {
        $LineCount = $TemplateLines.Count
        $Threshold = [int]($LineCount * 3 / 4)
        if ($CheckpointLine -lt $Threshold) {
            FailSkill $skill "Decider Checkpoint section appears before line $Threshold (line $CheckpointLine); family contract requires it at the end of TEMPLATE.md"
        } else {
            PassSkill $skill "TEMPLATE.md has Decider Checkpoint at end (line $CheckpointLine of $LineCount)"
        }
    }
}

Write-Host ""
if ($Fail -eq 0) {
    Write-Host "All foundation-sprint-skills-family contract checks passed."
    exit 0
} else {
    Write-Host "Foundation-sprint-skills-family contract checks FAILED. See '[FAIL]' lines above."
    exit 1
}
