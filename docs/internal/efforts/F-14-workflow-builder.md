# [F-14] Workflow Builder
Status: Backlog
Milestone: TBD
Issue: TBD
Agent: Claude Opus 4.6

## Scope

Create a `utility-workflow-builder` skill that guides users through creating a new workflow file — the workflow equivalent of `utility-pm-skill-builder`. The builder produces a complete `_workflows/*.md` file with all required sections (metadata, steps, flow diagram, quality checklist, see also), a matching `commands/workflow-*.md` slash command, and regenerated docs pages.

## Problem

Creating a new workflow currently requires:
1. Knowing the file conventions (metadata table format, section structure, link conventions)
2. Manually selecting and sequencing skills from the 29-skill library
3. Writing handoff guidance between each step
4. Creating 3 files (_workflows/, commands/, docs/workflows/) + updating cross-cutting refs
5. Knowing which existing workflows might overlap

This is the same authoring friction that `pm-skill-builder` solved for individual skills.

## How It Would Work

### Input
User describes the workflow they want:
- "I need a workflow for quarterly business reviews"
- "Create a workflow that chains competitive-analysis, experiment-results, and pivot-decision"
- "I want something like Feature Kickoff but focused on API integrations"

### Process (mirrors pm-skill-builder's 4-step flow)

1. **Understand the Idea** — Accept problem-first or skill-first descriptions. Clarify: what PM process does this support? Who runs it? What's the end-to-end flow?

2. **Overlap Analysis** — Check against 9 existing workflows for coverage overlap. Could the user's need be met by an existing workflow + customization? Kill gate: if overlap is >70%, recommend customizing an existing workflow instead.

3. **Skill Selection & Sequencing** — Interactive step: present candidate skills from the library, help user select and order them, define handoff points and context flow between steps.

4. **Generate Files** — Produce:
   - `_workflows/{name}.md` with all sections (Metadata, When to Use, Steps with handoffs, Context Flow Diagram as mermaid, Tips, Quality Checklist, See Also)
   - `commands/workflow-{name}.md` slash command
   - Run `generate-workflow-pages.py` to produce `docs/workflows/{name}.md`
   - Suggest cross-cutting updates needed (AGENTS.md, mkdocs.yml nav, README)

### Output
A Workflow Implementation Packet (analogous to pm-skill-builder's Skill Implementation Packet):
- Draft workflow file ready for review
- Draft command file
- Checklist of cross-cutting updates

## Key Design Decisions (to resolve)

| Decision | Options | Recommendation |
|----------|---------|---------------|
| Skill or command? | New skill (`utility-workflow-builder`) vs. standalone command | Skill — follows pm-skill-builder pattern, allows TEMPLATE + EXAMPLE |
| Kill gate threshold | 50% / 70% / 80% overlap with existing workflow | 70% — same as pm-skill-builder |
| Auto-generate vs. review | Generate files directly vs. produce draft for human review | Draft for review (staging area) — workflows are higher-stakes than skills |
| Mermaid generation | Auto-generate mermaid from skill sequence? | Yes — linear graphs are trivially derivable |
| Cross-cutting automation | Auto-update AGENTS.md, mkdocs.yml, etc.? | No — checklist only. Too many files to safely auto-edit. |

## Dependencies

- Requires stable workflow file conventions (established in v2.9.0)
- Should ship after D-05 (workflows guide) so the builder can reference it

## Artifacts Produced

- `skills/utility-workflow-builder/SKILL.md`
- `skills/utility-workflow-builder/references/TEMPLATE.md`
- `skills/utility-workflow-builder/references/EXAMPLE.md`
- `commands/workflow-builder.md`
- Updated AGENTS.md, README, docs

## Estimated Complexity

Medium-High — similar scope to F-05 (pm-skill-builder). The overlap analysis and skill sequencing logic are non-trivial.

## PRs

TBD
