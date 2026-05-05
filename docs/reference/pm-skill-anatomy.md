# PM-Skill Anatomy

A practical guide to how skills are structured in the pm-skills repository. For the spec-level, cross-platform reference, see [Agent Skill Anatomy](../concepts/agent-skill-anatomy.md). For how skills evolve through the Create → Validate → Iterate lifecycle, see [PM-Skill Lifecycle](../guides/pm-skill-lifecycle.md).

---

## Directory Structure

Every skill lives in a flat directory under `skills/`:

```
skills/
├── deliver-prd/                    # Domain skill (phase prefix)
│   ├── SKILL.md                    # Instructions
│   └── references/
│       ├── TEMPLATE.md             # Output format
│       └── EXAMPLE.md              # Completed example
├── foundation-persona/             # Foundation skill (classification prefix)
│   ├── SKILL.md
│   └── references/
│       ├── TEMPLATE.md
│       └── EXAMPLE.md
└── utility-pm-skill-builder/       # Utility skill (classification prefix)
    ├── SKILL.md
    └── references/
        ├── TEMPLATE.md
        └── EXAMPLE.md
```

Directory names follow the pattern `{prefix}-{skill-name}` where the prefix is the phase (for domain skills) or classification (for foundation/utility skills).

---

## The Three Files

### SKILL.md . The Instructions

The core file. Contains frontmatter metadata and markdown instructions that tell an AI agent how to produce an artifact. Structure:

| Section | Purpose |
|---------|---------|
| Frontmatter | Machine-readable metadata (name, description, phase/classification, version) |
| Title + intro | What this skill produces and why it matters |
| When to Use | Trigger conditions (3-5 bullets) |
| Instructions | Numbered steps the agent follows |
| Output Contract | References `references/TEMPLATE.md` as the output format |
| Quality Checklist | Verification criteria before finalizing |
| Examples | References `references/EXAMPLE.md` |

### TEMPLATE.md . The Output Format

Defines the structure of what the skill produces. Contains section headers with guidance comments explaining what goes in each section. The agent fills this template when executing the skill.

CI requirement: must contain at least 3 `##` sections.

### EXAMPLE.md . The Quality Benchmark

A complete, realistic example of the skill's output. Shows what "good" looks like . not an outline or placeholder, but a fully filled artifact (typically 150-300 lines for complex skills).

---

## Classification Types

Skills are classified into three types that determine their directory naming and frontmatter:

### Domain Skills (26)

Phase-specific PM activities organized by the Triple Diamond framework.

- **Directory**: `{phase}-{skill-name}` (e.g., `deliver-prd`)
- **Frontmatter**: `phase: deliver` (required), no `classification` field
- **Phases**: discover, define, develop, deliver, measure, iterate

### Foundation Skills (8)

Cross-cutting capabilities that apply across multiple phases (persona, OKR writer, lean canvas, meeting lifecycle, stakeholder update).

- **Directory**: `foundation-{skill-name}` (e.g., `foundation-persona`)
- **Frontmatter**: `classification: foundation` (required), no `phase` field
- **Use when**: the skill applies to multiple phases equally

### Utility Skills (6)

Meta-skills that operate on the repository, workflow, or other skills (skill lifecycle, diagrams, slideshows, library updates).

- **Directory**: `utility-{skill-name}` (e.g., `utility-pm-skill-builder`)
- **Frontmatter**: `classification: utility` (required), no `phase` field
- **Use when**: the skill creates, validates, or manages other skills

---

## Frontmatter

Every SKILL.md begins with YAML frontmatter on line 1. The opening `---` MUST be the first line of the file, with no preceding HTML comment, BOM, or blank line. The optional attribution comment goes AFTER the closing `---`, not before:

```yaml
---
name: deliver-prd
description: Creates a comprehensive Product Requirements Document...
phase: deliver
version: "2.0.0"
updated: 2026-01-26
license: Apache-2.0
metadata:
  category: specification
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
```

**Required fields**: `name`, `description`, `version`, `updated`, `license`

**Classification fields** (mutually exclusive):
- Domain skills: `phase:` (one of 6 phases)
- Foundation/utility skills: `classification:` (foundation or utility)

**Key rules**:
- `name` must exactly match the directory name
- `description` must be 20-100 words on a single line (no `>-` or `|` folding)
- `version` must be quoted and appear exactly once at the root level (no `metadata.version`)
- **First line must be `---`**: enforced by `scripts/lint-skills-frontmatter.sh`. Skills with a leading HTML comment or BOM are silently dropped by the open `skills` CLI (the issue v2.11.1 fixed for the 6 foundation skills). Library samples and TEMPLATE/EXAMPLE files keep the leading attribution comment because they are not loaded as skills; only `SKILL.md` is governed by this rule.

For the full schema, see [frontmatter-schema.yaml](../reference/frontmatter-schema.yaml).

---

## The Triple Diamond

PM-skills organizes domain skills across 6 phases of the Triple Diamond framework:

```mermaid
graph TD
    subgraph Diamond1["Diamond 1 . Problem Space"]
        DISCOVER["**DISCOVER**\n3 skills\nresearch & context"]
        DEFINE["**DEFINE**\n4 skills\nproblem framing"]
    end
    subgraph Diamond2["Diamond 2 . Solution Space"]
        DEVELOP["**DEVELOP**\n4 skills\nideation & spec"]
        DELIVER["**DELIVER**\n6 skills\nhandoff & launch"]
    end
    subgraph Diamond3["Diamond 3 . Learning Space"]
        MEASURE["**MEASURE**\n5 skills\ndata & testing"]
        ITERATE["**ITERATE**\n4 skills\nlearning & adapting"]
    end
    DISCOVER --> DEFINE
    DEFINE --> DEVELOP
    DEVELOP --> DELIVER
    DELIVER --> MEASURE
    MEASURE --> ITERATE
```

| Phase | Skills | Focus |
|-------|--------|-------|
| Discover | 3 | Research, competitive analysis, stakeholder mapping |
| Define | 4 | Problem framing, hypotheses, opportunity trees, JTBD |
| Develop | 4 | Solution briefs, ADRs, design rationale, spikes |
| Deliver | 6 | PRDs, user stories, acceptance criteria, edge cases, launch, release notes |
| Measure | 5 | Experiments, instrumentation, dashboards, results, OKR grading |
| Iterate | 4 | Retrospectives, lessons, refinement, pivot decisions |

Foundation and utility skills sit outside the phase model . they serve all phases or operate at a meta level.

---

## The Wiring Layer

Skills don't work in isolation. Three mechanisms connect them to users and agents:

### Commands (`commands/*.md`)

Slash commands that invoke skills. Each command file has `description:` frontmatter and a prose body that tells the agent which skill to read and follow.

```
commands/prd.md          → invokes skills/deliver-prd/SKILL.md
commands/persona.md      → invokes skills/foundation-persona/SKILL.md
commands/pm-skill-builder.md → invokes skills/utility-pm-skill-builder/SKILL.md
```

### AGENTS.md

The discovery file for AI agents. Lists all registered skills with paths and descriptions, organized by phase/classification. Agents scan this file to find the right skill for a task.

Sections: Foundation Classification, Discover Phase, ..., Iterate Phase, Utility Skills, Workflows, Commands.

### Workflows (`_workflows/*.md`)

Multi-skill workflows that chain skills together. Nine shipped workflows:
- **Feature Kickoff** . Quick-start workflow (problem → hypothesis → PRD → stories)
- **Lean Startup** . Build-Measure-Learn rapid iteration
- **Triple Diamond** . Complete product development cycle
- **Customer Discovery** . Research to validated problem
- **Sprint Planning** . Backlog to sprint-ready stories
- **Product Strategy** . Competitive context to architecture decisions
- **Post-Launch Learning** . Measurement to organizational learnings
- **Stakeholder Alignment** . Leadership buy-in package
- **Technical Discovery** . Spike to architecture decisions

---

## CI Validation

Skill integrity is enforced by a growing suite of validators in `scripts/`. Core skill-specific scripts:

| Script | What it checks |
|--------|---------------|
| `lint-skills-frontmatter` | Frontmatter fields, description word count, phase/classification consistency, TEMPLATE.md structure, EXAMPLE.md existence |
| `validate-agents-md` | AGENTS.md paths match actual skill directories |
| `validate-commands` | Command files reference valid skill paths |
| `validate-skill-family-registration` | Registry-driven family validation (meeting-skills-family + future families) |
| `check-mcp-impact` | Advisory; detects skill additions/renames that may affect the MCP server |

The full CI suite covers nav completeness, frontmatter on rendered docs, generated-content drift, internal link validity, version-reference consistency, cross-doc references, and more. See `.github/workflows/validation.yml` for the canonical list of scripts and their enforcement posture, and `scripts/README_SCRIPTS.md` for one-paragraph summaries of each.

Run the core skill-specific validators before committing new skills:

```bash
bash scripts/lint-skills-frontmatter.sh
bash scripts/validate-agents-md.sh
bash scripts/validate-commands.sh
bash scripts/validate-skill-family-registration.sh
bash scripts/check-mcp-impact.sh
```

PowerShell equivalents: replace `bash scripts/` with `pwsh -File scripts/` and `.sh` with `.ps1`.

---

## Creating a New Skill

Use `/pm-skill-builder` to create new skills interactively. The builder:

1. Understands your skill idea (problem-first or skill-first entry)
2. Runs gap analysis against all existing skills
3. Validates through a Why Gate (if overlap found)
4. Classifies by type and phase, selects exemplar skills to model
5. Generates a Skill Implementation Packet with draft files
6. Writes drafts to `_staging/pm-skill-builder/{skill-name}/` (gitignored)
7. On confirmation, promotes to canonical locations and validates

### Staging and Promotion

Draft files are written to a gitignored staging area before promotion:

```
_staging/pm-skill-builder/{skill-name}/
├── SKILL.md               → skills/{dir-name}/SKILL.md
├── references/
│   ├── TEMPLATE.md        → skills/{dir-name}/references/TEMPLATE.md
│   └── EXAMPLE.md         → skills/{dir-name}/references/EXAMPLE.md
└── command.md             → commands/{command-name}.md
```

Promotion copies each file to its canonical location, appends the AGENTS.md entry, runs CI validators, and deletes the staging folder on success. If validation fails, staging is preserved for fixes.

For manual creation, follow the structure in [skill template](https://github.com/product-on-purpose/pm-skills/tree/main/docs/templates/skill-template) and validate with the CI scripts above.

---

## See Also

- [Agent Skill Anatomy](../concepts/agent-skill-anatomy.md) . Spec-level, cross-platform reference (agentskills.io)
- [Frontmatter Schema](../reference/frontmatter-schema.yaml) . Complete field definitions and validation rules
- [Category Taxonomy](../reference/categories.md) . Category definitions and framework mappings
- [Creating PM Skills Guide](../guides/creating-pm-skills.md) . Step-by-step authoring instructions
- [Getting Started](../getting-started/index.md) . Setup and usage guide
