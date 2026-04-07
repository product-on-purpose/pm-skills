# [F-05] PM Skill Builder
Status: Shipped (v2.7.0)
Release: v2.7.0
Issue: #113
Agent: Claude Opus 4.6

## Scope

Create `utility-pm-skill-builder` — an interactive skill that guides contributors from "I have a PM skill idea" to a complete, validated Skill Implementation Packet and optionally draft files ready for PR. Handles all three skill classifications (domain, foundation, utility) aligned with pm-skills architecture. Includes `/pm-skill-builder` slash command.

## Design Decisions

### Output model: Packet → Review → Promote

The builder produces output in two stages:

1. **Stage 1: Staging area** — All generated draft files go to `_staging/pm-skill-builder/{skill-name}/` (gitignored): SKILL.md, TEMPLATE.md, EXAMPLE.md, command file.
2. **Stage 2: Promotion** — On user confirmation, files are copied to canonical locations (`skills/{name}/`, `commands/`, `AGENTS.md`). Staging folder is discarded after promotion. Design rationale belongs in the GitHub issue or PR, not a permanent packet file.

### Workflow: Adaptive Depth (Approach C with enhancements)

Design approaches documented at: `docs/internal/efforts/F-05-pm-skill-builder/approaches_pm-skill-builder.md`

The builder uses 4-5 steps with a kill gate:

1. **Understand the Idea** — Dual entry: "Describe the skill you want to create" OR "What PM problem does this skill solve?" Both are accepted; the outcome is the same.
2. **Gap Analysis** (always runs) — Checks all existing skills for overlap. If overlap found, triggers Why Gate inline. Kill gate fires if overlap is too strong.
3. **Scope Check** — Detects if the idea is too broad and should be split into multiple skills. Signals: multiple artifact types, cross-phase work, "and" in the description.
4. **Classification + Repo-Fit** (combined) — Determines domain (which phase?) / foundation / utility. Branches naming and conventions accordingly. Identifies 1-2 exemplar skills to model the output on.
5. **Generate Packet** — Produces full Skill Implementation Packet with all draft files, inline writing lens (Quality Forecast), and validation checklist.
6. **Write to Staging** — Files written to `_staging/pm-skill-builder/{skill-name}/` (gitignored, discarded after promotion).
7. **Promote** (on confirmation) — Files moved to canonical locations.

### Kill gate: Gap Analysis + Why Gate + Scope Splitting

Three failure modes that redirect rather than proceed:
- **High overlap**: Recommend revising an existing skill, creating a workflow, or adding a command
- **Can't articulate gaps**: Why Gate fails — the idea doesn't have enough differentiation
- **Too broad**: Recommend splitting into 2+ focused skills that can be chained in a workflow

### All three classifications supported

| Classification | Phase | Naming | Gap analysis scope |
|---------------|-------|--------|-------------------|
| Domain | Required (1 of 6) | `{phase}-{skill-name}` | Same-phase skills |
| Foundation | None | `foundation-{skill-name}` | Other foundation skills |
| Utility | None | `utility-{skill-name}` | Other utility skills |

### Exemplar-driven drafting

After classification, the builder identifies 1-2 existing skills that are the closest structural match (same phase > same category > similar artifact type). It reads their SKILL.md to mirror section structure, instruction style, output contract format, and quality checklist pattern. Names the exemplar explicitly in the packet.

### Complete example generation

EXAMPLE.md is a fully completed artifact (150-300 lines), not an outline. The builder picks a realistic PM scenario, fills every TEMPLATE.md section with concrete content, and demonstrates optional sections both filled and skipped.

### Quality Forecast (enhanced writing lens)

The packet includes a Quality Forecast section with zone-aware guidance:
- Knowledge-heavy (≥35% K): Reference frameworks, include "When to Use" guidance
- Process-heavy (≥35% P): Numbered steps, prescriptive, clear inputs/outputs per step
- Constraint-heavy (≥35% C): MUST/SHOULD/MUST NOT rules, separate constraints section
- Wisdom-heavy (≥25% W): Reflective questions, guide thinking over dictating output

### Post-packet guidance

After writing files, the builder provides:
- Local CI validation command
- How to test the skill with a realistic scenario
- Contribution workflow (GitHub issue → PR) if contributing to the repo
- Iteration guidance if the skill needs refinement

### v1 scope boundaries

**In scope (v1):**
- Create mode — new skill from idea to files
- All three classifications (domain, foundation, utility)
- Staging area + promotion workflow
- Skill Implementation Packet generation
- `references/EXAMPLE.md` demonstrates a realistic builder run

**Out of scope (future skills, not modes):**
- `utility-pm-skill-validate` — audit existing skills against conventions and quality (future effort)
- `utility-pm-skill-iterate` — apply feedback and improvements to existing skills (future effort)

### Naming (confirmed)

- Directory: `skills/utility-pm-skill-builder/`
- Command: `/pm-skill-builder`
- Staging output: `_staging/pm-skill-builder/{skill-name}/` (gitignored, discarded after promotion)
- Distinguished from `/agent-skill-builder` (F-09) which creates skills for any context

## Artifacts Produced

- `skills/utility-pm-skill-builder/SKILL.md`
- `skills/utility-pm-skill-builder/references/TEMPLATE.md` (Skill Implementation Packet template)
- `skills/utility-pm-skill-builder/references/EXAMPLE.md` (completed packet for a realistic skill)
- `commands/pm-skill-builder.md`
- `_staging/pm-skill-builder/` directory (gitignored staging area, discarded after promotion)
- AGENTS.md entry

## Dependencies

- M-12 (#112) — CI validates the builder's output when promoted to `skills/`
- Codex's F-06 work provides a fresh exemplar skill to reference

## Future Related Efforts (not yet created)

- `utility-pm-skill-validate` — audit mode as a separate skill
- `utility-pm-skill-iterate` — revise mode as a separate skill
- These form a lifecycle: Create → Validate → Iterate

## PRs

- TBD
