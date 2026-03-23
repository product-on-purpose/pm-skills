<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
name: utility-pm-skill-builder
description: Guides contributors from a PM skill idea to a complete Skill Implementation Packet aligned with pm-skills conventions. Runs gap analysis, validates through a Why Gate, classifies by type and phase, generates draft files, and writes to a staging area for review before promotion.
classification: utility
version: "1.0.0"
updated: 2026-03-22
license: Apache-2.0
metadata:
  category: coordination
  frameworks: [triple-diamond]
  author: product-on-purpose
---
# PM Skill Builder

This skill creates new PM skills for the pm-skills library. It produces a
Skill Implementation Packet — a complete design document with draft files —
in a staging area for review before promotion to canonical locations.

## When to Use

- When you have an idea for a new PM skill
- When you want to add a domain skill (phase-specific), foundation skill
  (cross-cutting), or utility skill (meta/tooling) to the pm-skills library
- When a contributor needs guided skill creation that follows repo conventions

## When NOT to Use

- To modify an existing skill → use a future validation/iteration utility (planned)
- To create a skill for a non-pm-skills context → use a general agent skill builder (planned)
- To create a workflow bundle → bundles are authored directly, not via this builder

## Instructions

When asked to create a new PM skill, follow these steps:

### Step 1: Understand the Idea

Accept the idea in either form:
- **Problem-first**: "What PM problem does this skill solve? Who runs into
  this problem, and what do they currently produce (or fail to produce)?"
- **Skill-first**: "Describe the skill you want to create. What artifact
  does it produce? What PM activity does it support?"

Both entry points produce the same downstream flow. If the user provides
one form, do not ask for the other — extract what you need and proceed.

If the idea is vague, ask ONE follow-up question to clarify the artifact
type and target audience before proceeding.

### Step 2: Gap Analysis

Check ALL existing skills for overlap. Use the Current Library Reference
table below AND scan the `skills/` directory for the latest inventory.

Present findings with specificity:
- Name each overlapping skill and explain what it covers
- Identify the specific gap this new skill would fill
- If overlap is high, trigger the Why Gate (see below)

**Why Gate** (triggers when overlap is found):
Ask the user: "Name 2-3 specific prompts or scenarios where the existing
skills fail to produce what you need."

**Kill Gate**: If the user cannot articulate convincing gaps, recommend
an alternative:
- "Revise [existing skill] to cover this case"
- "Create a bundle combining [skill A] + [skill B]"
- "Add a command variant, not a new skill"
- "This is a documentation improvement, not a new skill"

Do not proceed past the kill gate without either convincing evidence of
a gap or explicit user override.

### Step 3: Scope Check

Evaluate whether the idea should be ONE skill or MULTIPLE skills.

**Splitting signals:**
- The idea produces multiple distinct artifact types
- The idea crosses Triple Diamond phases (e.g., Discover + Deliver)
- The description naturally contains "and" connecting two activities

If splitting is warranted, present the recommendation:
"This seems to cover two distinct PM activities:
  1. [Activity A] → produces [Artifact A]
  2. [Activity B] → produces [Artifact B]
These work better as separate skills that can be chained via a bundle.
Want to proceed with just [Activity A] for now?"

### Step 4: Classification + Repo-Fit

Determine the skill's classification and naming:

**Domain skills** (phase-specific PM activities):
- Phase: discover | define | develop | deliver | measure | iterate
- Directory: `{phase}-{skill-name}`
- Frontmatter: `phase: {phase}` (required), no `classification` field

**Foundation skills** (cross-cutting, used across phases):
- No phase
- Directory: `foundation-{skill-name}`
- Frontmatter: `classification: foundation` (required), no `phase` field
- Use when: the skill applies to multiple phases equally

**Utility skills** (meta-skills, repo tooling):
- No phase
- Directory: `utility-{skill-name}`
- Frontmatter: `classification: utility` (required), no `phase` field
- Use when: the skill operates on the repo, workflow, or other skills

**Exemplar selection:**
Identify 1-2 existing skills that are the closest structural match:
- Same phase > same category > similar artifact type
- Read their SKILL.md to understand section structure, instruction style,
  output contract format, and quality checklist pattern
- Name the exemplars explicitly: "Modeled after [skill] — same phase,
  [category] category"

Present the classification and exemplar selection for user confirmation.

### Step 5: Generate Skill Implementation Packet

Produce the complete packet using `references/TEMPLATE.md` as the format.
The packet includes:

1. **Decision** — recommendation + Why Gate evidence (if applicable)
2. **Classification** — type, phase (if domain), category, directory name
3. **Overlap Analysis** — what was found, why this skill is still needed
4. **Quality Forecast** — K/P/C/W zone distribution + writing guidance:
   - Knowledge-heavy (≥35% K): reference frameworks, include When to Use
   - Process-heavy (≥35% P): numbered steps, prescriptive, clear I/O per step
   - Constraint-heavy (≥35% C): MUST/SHOULD/MUST NOT rules, separate section
   - Wisdom-heavy (≥25% W): reflective questions, guide thinking
5. **Exemplar Skills** — which existing skills modeled, why
6. **Draft Frontmatter** — complete, valid YAML block
7. **Draft SKILL.md** — full content (not an outline), mirroring exemplar structure
8. **Draft TEMPLATE.md** — section headers with guidance comments
9. **Draft EXAMPLE.md** — complete, realistic example (150-300 lines) with a
   specific PM scenario, every section filled, optional sections demonstrated
   both filled and skipped
10. **Draft Command** — command frontmatter
11. **AGENTS.md Entry** — exact text to add
12. **Validation Checklist** — all CI rules checked against the draft
13. **Next Steps** — local CI, testing, contribution workflow

### Step 6: Write to Staging Area

Write all generated files to the staging area:

```
_staging/pm-skill-builder/{skill-name}/
├── SKILL.md               ← draft skill file
├── references/
│   ├── TEMPLATE.md        ← draft template
│   └── EXAMPLE.md         ← draft example
└── command.md             ← draft command
```

> **Note**: `_staging/` is gitignored — draft artifacts never ship in releases.
> The staging folder is discarded after promotion.

Report what was written and where.

### Step 7: Promote (on confirmation)

Ask: "Review the packet above. When ready, I'll promote the files to
their canonical locations. Proceed? [yes/no]"

If yes, promote files to canonical locations:
- `skills/{name}/SKILL.md`
- `skills/{name}/references/TEMPLATE.md`
- `skills/{name}/references/EXAMPLE.md`
- `commands/{command-name}.md`
- Append entry to `AGENTS.md`

After promotion, discard the staging folder. Design rationale lives in the
GitHub issue, PR, or effort brief — not in a permanent packet file.

Provide post-promotion guidance:
- "Run CI locally: `bash scripts/lint-skills-frontmatter.sh`"
- "Test the skill: try `/{command-name}` with a realistic scenario"
- "If contributing: create a GitHub issue with the skill-proposal template,
  then open a PR"

## Current Library Reference

Use this table for gap analysis — it reflects the current skill inventory
(26 skills). Also scan the `skills/` directory for the latest count.

### Domain Skills (25)

| Phase | Skill | Category | Description |
|-------|-------|----------|-------------|
| discover | competitive-analysis | research | Structured competitive landscape analysis |
| discover | interview-synthesis | research | User research interview synthesis |
| discover | stakeholder-summary | research | Stakeholder needs and influence mapping |
| define | hypothesis | ideation | Testable hypothesis with success metrics |
| define | jtbd-canvas | problem-framing | Jobs to Be Done canvas |
| define | opportunity-tree | problem-framing | Opportunity solution tree |
| define | problem-statement | problem-framing | Clear problem statement with success criteria |
| develop | adr | specification | Architecture Decision Record |
| develop | design-rationale | specification | Design decision reasoning |
| develop | solution-brief | ideation | One-page solution overview |
| develop | spike-summary | coordination | Technical/design spike results |
| deliver | acceptance-criteria | specification | Given/When/Then acceptance criteria |
| deliver | edge-cases | specification | Edge cases and error states |
| deliver | launch-checklist | coordination | Pre-launch checklist |
| deliver | prd | specification | Product Requirements Document |
| deliver | release-notes | coordination | User-facing release notes |
| deliver | user-stories | specification | User stories with acceptance criteria |
| measure | dashboard-requirements | validation | Analytics dashboard spec |
| measure | experiment-design | validation | A/B test or experiment design |
| measure | experiment-results | reflection | Experiment results and learnings |
| measure | instrumentation-spec | validation | Event tracking specification |
| iterate | lessons-log | reflection | Structured lessons learned |
| iterate | pivot-decision | reflection | Pivot or persevere decision |
| iterate | refinement-notes | coordination | Backlog refinement outcomes |
| iterate | retrospective | reflection | Team retrospective |

### Foundation Skills (1)

| Skill | Category | Description |
|-------|----------|-------------|
| persona | research | Evidence-calibrated product or marketing persona |

### Utility Skills (1)

| Skill | Category | Description |
|-------|----------|-------------|
| pm-skill-builder | coordination | This skill |

## Output Contract

The builder MUST produce draft files for the new skill:
- `SKILL.md` — full skill instructions
- `references/TEMPLATE.md` — output template with guidance comments
- `references/EXAMPLE.md` — complete worked example (150-300 lines)
- `command.md` — slash command file

All drafts are written to `_staging/pm-skill-builder/{skill-name}/` (gitignored).

On promotion, files are copied to canonical locations, AGENTS.md is
updated, and the staging folder is discarded.

## Quality Checklist

Before finalizing the packet, verify all items in both tiers:

### CI Validation (must pass)
- [ ] `name` matches directory name
- [ ] Description is 20-100 words (single-line, no multiline YAML)
- [ ] `version`, `updated`, `license` all present
- [ ] Classification correct (domain → `phase:`, foundation/utility → `classification:`)
- [ ] Directory name follows convention: `{phase/classification}-{skill-name}`
- [ ] TEMPLATE.md has ≥3 `##` sections
- [ ] Command file references correct skill path
- [ ] AGENTS.md entry uses `####` + `**Path:**` format

### Quality Checks (should pass)
- [ ] Gap analysis checked all existing skills (not just same-phase)
- [ ] Why Gate evidence is specific (names prompts/scenarios, not vague)
- [ ] EXAMPLE.md is a complete artifact (150-300 lines), not an outline
- [ ] Output contract is present in draft SKILL.md
- [ ] Quality checklist is present in draft SKILL.md
- [ ] Quality Forecast identifies dominant zone and provides writing guidance

## Examples

See `references/EXAMPLE.md` for a completed Skill Implementation Packet
demonstrating a realistic domain skill creation.
