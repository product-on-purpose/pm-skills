---
name: utility-pm-workflow-builder
description: Guides a contributor from a workflow idea to a complete Workflow Implementation Packet (draft workflow file, draft workflow command, cross-cutting update checklist) in a staging area for review. Runs overlap analysis against the existing workflows with a Why Gate, then helps select and sequence skills with authored handoffs. Use when creating a new multi-skill workflow or promoting a repeated ad-hoc chain into a durable one. To build a single skill instead, use utility-pm-skill-builder; to run a sequence without authoring anything, use the chain command or utility-pm-workflow-orchestrator.
license: Apache-2.0
metadata:
  classification: utility
  version: "1.0.0"
  updated: 2026-06-10
  category: workflow
  frameworks: [triple-diamond]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# PM Workflow Builder

This skill creates new multi-skill workflows for the pm-skills library. It
produces a Workflow Implementation Packet - a draft `_workflows/<name>.md`
file, a draft `commands/workflow-<name>.md` command, and the cross-cutting
update checklist - in a staging area for review before promotion to
canonical locations. The builder authors; it never executes a chain and it
never promotes its own output.

## When to Use

- You have an idea for a new multi-skill workflow ("I need a workflow for
  quarterly business reviews")
- You know the skills you want to chain and want them captured durably
  ("chain competitive-analysis, experiment-results, pivot-decision")
- A `/chain` run (orchestrator Mode B) proved reusable and its completion
  output suggested promoting the chain to a durable workflow; hand this
  skill the exact chain expression from that suggestion

## When NOT to Use

- To run a sequence once without authoring anything -> use the `/chain`
  command or `utility-pm-workflow-orchestrator` directly
- To build or modify a single skill -> use `utility-pm-skill-builder`,
  `utility-pm-skill-validate`, or `utility-pm-skill-iterate`
- To customize an existing workflow -> edit its `_workflows/<name>.md`
  directly; the overlap analysis below will point you there when coverage
  is high

## Instructions

### Step 1: Understand the Idea

Accept the idea in any of three entry forms, all converging on the same
downstream flow:

- **Problem-first:** "I need a workflow for X." Identify the recurring PM
  process, who runs it, and the artifact trail it should leave.
- **Skills-first:** a list of skills the user already wants to chain.
- **Chain-promotion:** a literal chain expression (for example
  `measure-experiment-results -> discover-stakeholder-summary`), usually
  pasted from the orchestrator's completion suggestion, plus the context
  the run used.

If the idea is vague, ask ONE clarifying question (the recurring trigger
and the final artifact), then proceed. Do not interrogate.

### Step 2: Overlap Analysis + Why Gate

Scan the `_workflows/` directory at run time for the current inventory
(list every `*.md` except `README.md`). Never rely on a remembered count
or a hardcoded list. Compare the idea against ALL existing workflows:

- Name each overlapping workflow and what it covers.
- Estimate coverage overlap honestly.

**Kill gate (>70% coverage overlap):** recommend, in order, (a)
customizing the existing workflow, (b) adding a step to it, or (c) just
using `/chain` for the occasional run. Do not proceed.

**Why Gate (any meaningful overlap):** ask for 2-3 specific scenarios
where the existing workflows fail to produce what is needed. Do not pass
the gate without that evidence or an explicit user override (record the
override in the packet's Decision section).

### Step 3: Sequence Design

Select and order the steps with the user. Apply the chain-expression
contract's validation rules at authoring time
(`skills/utility-pm-workflow-orchestrator/references/PARSE-CONTRACT.md`,
Mode B Chain Expression Contract):

- Every step must resolve to an installed skill at `skills/<name>/SKILL.md`
  by EXACT name. Never approximate or auto-correct; on a miss, refuse the
  step and OFFER the closest real names (an offer, never a substitution).
- **Category 1 content skills only.** Refuse as steps, each with a one-line
  explanation: Tier-3 maintenance skills (`utility-pm-skill-*`,
  `utility-pm-release-conductor`, `utility-pm-changelog-curator`,
  `utility-update-pm-skills`, `foundation-prioritized-action-plan`),
  dispatch skills that fan out to sub-agents (`utility-pm-critic`,
  `utility-pm-workflow-orchestrator`, and peers), and existing workflows
  (a workflow never nests a workflow). Self-reference is impossible by
  construction: this builder is itself Tier-3.
- For EACH step, author the handoff: what the step consumes from the prior
  step's output, and what it must produce for the next. This authored
  handoff guidance is exactly what distinguishes a durable workflow from
  an ad-hoc chain; a packet without real handoffs is not ready.

### Step 4: Generate the Packet

Write the complete Workflow Implementation Packet to
`_staging/workflows/<name>/` (gitignored; the same review model as the
skill builder). Never write to canonical locations.

```
_staging/workflows/<name>/
├── workflow.md      <- draft _workflows/<name>.md
├── command.md       <- draft commands/workflow-<name>.md
└── PACKET.md        <- decision, overlap analysis, checklist, promotion steps
```

Use `references/TEMPLATE.md` as the packet format. The workflow draft must
carry the full section inventory the current `_workflows/*.md` files share
(see the TEMPLATE's embedded skeleton); the command draft mirrors the
existing `commands/workflow-*.md` shape, including one literal
`skills/<name>/SKILL.md` path per step and the `$ARGUMENTS` footer. Derive
a linear mermaid context-flow diagram from the final sequence (step names
as nodes, execution order as edges).

### Step 5: Review + Promotion Guidance

Present the packet and stop. The builder itself never promotes. On
approval, the user (or a follow-up session) moves the drafts to their
canonical paths and works the packet's Cross-Cutting Checklist, which
names every count and documentation surface that adding a workflow trips,
including the validator-blind `.github/workflows/release.yml` release-note
template. The builder never edits those cross-cutting files itself.

## Output Format

The packet follows `references/TEMPLATE.md`:

1. **Decision** - recommendation plus Why Gate evidence (or the recorded override)
2. **Overlap Analysis** - every overlapping workflow, what it covers, the gap
3. **Workflow Draft** - complete `_workflows/<name>.md` content
4. **Command Draft** - complete `commands/workflow-<name>.md` content
5. **Cross-Cutting Checklist** - every surface to update at promotion, with its enforcing validator (or "validator-blind" where none exists)
6. **Promotion Steps** - the move-verify-validate sequence

See `references/EXAMPLE.md` for one complete worked packet.

## Quality Checklist

Before presenting the packet, verify:

- [ ] Overlap analysis scanned the live `_workflows/` directory (no remembered list, no hardcoded count)
- [ ] Why Gate evidence is specific (named scenarios) or an explicit override is recorded
- [ ] Every step resolves to an installed skill by exact name
- [ ] No Tier-3 maintenance skill, dispatch skill, or workflow appears as a step
- [ ] Every step has an authored handoff (consumes / produces), not just a skill name
- [ ] The workflow draft carries every section in the TEMPLATE's skeleton (metadata table, When to Use with Do NOT use, per-step blocks, context-flow diagram, tips, quality checklist, see also)
- [ ] The command draft names each step's `skills/<name>/SKILL.md` path and ends with the `$ARGUMENTS` footer
- [ ] The mermaid diagram matches the final sequence exactly
- [ ] Everything written under `_staging/workflows/<name>/`; no canonical path touched
- [ ] The Cross-Cutting Checklist is reproduced in full, including the `.github/workflows/release.yml` release-note row

## Reference Files

- Packet template: `references/TEMPLATE.md`
- Worked example (quarterly business review): `references/EXAMPLE.md`
- Chain-expression contract applied at authoring time: [`skills/utility-pm-workflow-orchestrator/references/PARSE-CONTRACT.md`](../utility-pm-workflow-orchestrator/references/PARSE-CONTRACT.md)
- Workflow exemplars: [`_workflows/sprint-planning.md`](../../_workflows/sprint-planning.md), [`_workflows/customer-discovery.md`](../../_workflows/customer-discovery.md)
- Command exemplar: [`commands/workflow-sprint-planning.md`](../../commands/workflow-sprint-planning.md)
- Sibling builder for single skills: [`skills/utility-pm-skill-builder/SKILL.md`](../utility-pm-skill-builder/SKILL.md)
