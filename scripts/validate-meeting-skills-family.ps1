# Validate meeting-skills-family contract conformance across the 5 family skills.
# Complements (does not duplicate) lint-skills-frontmatter, which handles
# universal skill-frontmatter checks. This script validates family-specific
# structural and reference requirements.
#
# See: docs/reference/skill-families/meeting-skills-contract.md

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$Fail = 0

$ContractPath = "docs/reference/skill-families/meeting-skills-contract.md"
$ContractFile = Join-Path $Root "site/src/content/$ContractPath"

$FamilySkills = @(
    "foundation-meeting-agenda",
    "foundation-meeting-brief",
    "foundation-meeting-recap",
    "foundation-meeting-synthesize",
    "foundation-stakeholder-update"
)

$NoShareableSummary = @(
    "foundation-stakeholder-update"
)

$RequiredTemplateFrontmatter = @(
    "artifact_type",
    "version",
    "generated_at",
    "generated_by_skill",
    "input_quality",
    "confidence",
    "visibility",
    "status"
)

$RequiredSourcesSubsections = @(
    "### Primary inputs",
    "### Referenced artifacts",
    "### External references",
    "### Generation context"
)

$AllowedArtifactType = @{
    "foundation-meeting-agenda"      = "meeting-agenda"
    "foundation-meeting-brief"       = "meeting-brief"
    "foundation-meeting-recap"       = "meeting-recap"
    "foundation-meeting-synthesize"  = "meeting-synthesis"
    "foundation-stakeholder-update"  = "stakeholder-update"
}

function FailSkill([string]$Skill, [string]$Msg) {
    Write-Host "x $Skill : $Msg"
    $script:Fail = 1
}

function PassSkill([string]$Skill, [string]$Msg) {
    Write-Host "+ $Skill : $Msg"
}

# --- Check 1: Contract doc exists ---
if (-not (Test-Path $ContractFile)) {
    Write-Host "x family-contract : missing canonical contract at $ContractPath"
    $Fail = 1
} else {
    Write-Host "+ family-contract : present at $ContractPath"
}

# --- Per-skill checks ---
foreach ($skill in $FamilySkills) {
    $SkillDir = Join-Path $Root "skills/$skill"
    $SkillMd = Join-Path $SkillDir "SKILL.md"
    $TemplateMd = Join-Path $SkillDir "references/TEMPLATE.md"

    if (-not (Test-Path $SkillDir)) {
        Write-Host "! $skill : skill directory not yet present (expected during scaffolding phase, not after v2.11.0 release)"
        continue
    }

    if (-not (Test-Path $SkillMd)) {
        FailSkill $skill "missing SKILL.md"
        continue
    }

    if (-not (Test-Path $TemplateMd)) {
        FailSkill $skill "missing references/TEMPLATE.md"
        continue
    }

    $SkillContent = Get-Content $SkillMd -Raw
    $TemplateContent = Get-Content $TemplateMd -Raw

    # Check 2: SKILL.md references the family contract
    if ($SkillContent -notmatch [regex]::Escape($ContractPath)) {
        FailSkill $skill "SKILL.md does not reference family contract path ($ContractPath)"
    } else {
        PassSkill $skill "SKILL.md references family contract"
    }

    # Check 3: SKILL.md contains Zero-friction execution section
    if ($SkillContent -notmatch '(?im)^\s*#{1,6}\s+(Zero-friction execution|Go mode|Zero friction execution)') {
        FailSkill $skill "SKILL.md missing 'Zero-friction execution' section (required by family contract)"
    } else {
        PassSkill $skill "SKILL.md has Zero-friction execution section"
    }

    # Check 4: TEMPLATE.md frontmatter includes universal base fields
    $FrontmatterMatch = [regex]::Match($TemplateContent, "(?ms)^---\s*\r?\n(.+?)\r?\n---\s*\r?\n")
    if (-not $FrontmatterMatch.Success) {
        FailSkill $skill "TEMPLATE.md missing or malformed YAML frontmatter"
    } else {
        $Frontmatter = $FrontmatterMatch.Groups[1].Value
        foreach ($field in $RequiredTemplateFrontmatter) {
            if ($Frontmatter -notmatch "(?m)^${field}:") {
                FailSkill $skill "TEMPLATE.md frontmatter missing required field: $field"
            }
        }
        # Check 4b: artifact_type matches expected value
        $ArtifactTypeMatch = [regex]::Match($Frontmatter, "(?m)^artifact_type:\s*(.+?)\s*$")
        if ($ArtifactTypeMatch.Success) {
            $ActualArtifactType = $ArtifactTypeMatch.Groups[1].Value.Trim('"', "'", ' ')
            $ExpectedArtifactType = $AllowedArtifactType[$skill]
            if ($ActualArtifactType -ne $ExpectedArtifactType) {
                FailSkill $skill "TEMPLATE.md artifact_type='$ActualArtifactType' does not match expected '$ExpectedArtifactType'"
            }
        }
    }

    # Check 5: TEMPLATE.md has Shareable summary section (except stakeholder-update which requires Shareable update instead . v1.1.0)
    if ($NoShareableSummary -contains $skill) {
        if ($TemplateContent -notmatch '(?im)^\s*#{1,6}\s+Shareable update') {
            FailSkill $skill "TEMPLATE.md missing '## Shareable update' section (required by family contract v1.1.0 for stakeholder-update)"
        } else {
            PassSkill $skill "TEMPLATE.md has Shareable update section (v1.1.0 boundary)"
        }
    } else {
        if ($TemplateContent -notmatch '(?im)^\s*#{1,6}\s+Shareable summary') {
            FailSkill $skill "TEMPLATE.md missing '## Shareable summary' section (required by family contract)"
        } else {
            PassSkill $skill "TEMPLATE.md has Shareable summary section"
        }
    }

    # Check 6: TEMPLATE.md has Sources & References section with required subsections
    if ($TemplateContent -notmatch '(?im)^\s*#{1,6}\s+Sources (&|and) References') {
        FailSkill $skill "TEMPLATE.md missing 'Sources & References' section (required by family contract)"
    } else {
        foreach ($subsec in $RequiredSourcesSubsections) {
            if ($TemplateContent -notmatch [regex]::Escape($subsec)) {
                FailSkill $skill "TEMPLATE.md Sources & References missing subsection: $subsec"
            }
        }
    }
}

# --- Check 7: Filename convention scan (v1.1.0) ---

$ValidSingle = '^[0-9]{4}-[0-9]{2}-[0-9]{2}_[0-9]{2}-[0-9]{2}[A-Z]{3,5}_[a-z0-9-]+_(agenda|brief|recap|stakeholder-update(-[a-z]+-[a-z]+)?)(_prepared-[0-9]{4}-[0-9]{2}-[0-9]{2})?\.md$'
$ValidSynthesis = '^(([0-9]{4}-Q[1-4])|([0-9]{4}-[0-9]{2}-[0-9]{2}-to-[0-9]{4}-[0-9]{2}-[0-9]{2}))_[a-z0-9-]+_synthesis(_prepared-[0-9]{4}-[0-9]{2}-[0-9]{2})?\.md$'
$SuspectPattern = '[0-9]{4}-[0-9]{2}-[0-9]{2}[^\s"/\\)<>]*_(agenda|brief|recap|synthesis|stakeholder-update)[^\s"/\\)<>]*\.md'

function CheckFilename([string]$Fn, [string]$SourceFile) {
    if ($Fn -like "*_synthesis*") {
        if ($Fn -notmatch $ValidSynthesis) {
            FailSkill "filename-convention" "nonconforming synthesis filename '$Fn' (in $SourceFile)"
        }
    } else {
        if ($Fn -notmatch $ValidSingle) {
            FailSkill "filename-convention" "nonconforming single-meeting filename '$Fn' (in $SourceFile)"
        }
    }
}

function ScanFileForFilenames([string]$FilePath) {
    if (-not (Test-Path $FilePath)) { return }
    $Content = Get-Content $FilePath -Raw
    $Matches = [regex]::Matches($Content, $SuspectPattern) | ForEach-Object { $_.Value } | Select-Object -Unique
    foreach ($m in $Matches) {
        if ($m -like "sample_*") { continue }
        $RelPath = $FilePath.Substring($Root.Length + 1)
        CheckFilename $m $RelPath
    }
}

Write-Host ""
Write-Host "--- Filename convention scan ---"

foreach ($skill in $FamilySkills) {
    $ExampleMd = Join-Path $Root "skills/$skill/references/EXAMPLE.md"
    ScanFileForFilenames $ExampleMd
}

$SamplesRoot = Join-Path $Root "library/skill-output-samples"
if (Test-Path $SamplesRoot) {
    foreach ($skill in $FamilySkills) {
        $SampleDir = Join-Path $SamplesRoot $skill
        if (-not (Test-Path $SampleDir)) { continue }
        Get-ChildItem -Path $SampleDir -Filter "*.md" | ForEach-Object {
            ScanFileForFilenames $_.FullName
        }
    }
}

Write-Host ""
if ($Fail -eq 0) {
    Write-Host "All meeting-skills-family contract checks passed."
    exit 0
} else {
    Write-Host "Meeting-skills-family contract checks FAILED. See 'x' lines above."
    exit 1
}
