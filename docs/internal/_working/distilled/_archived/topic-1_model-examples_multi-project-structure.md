# Topic 1 — Model Examples: Multi-Project Workspace Specifications

> **Date**: 2026-03-21
> **Author**: Claude Opus 4.6
> **Status**: Draft — GSD-compatible and open-spec-compatible examples
> **Companion**: `topic-1_spec_multi-project-structure.md`

---

## Table of Contents

1. [GSD-Compatible Project Specification](#1-gsd-compatible-project-specification)
2. [agentskills.io-Compatible Skill Specification](#2-agentskillsio-compatible-skill-specification)
3. [Full Scenario Walkthrough](#3-full-scenario-walkthrough)
4. [PROJECT.md Complete Example](#4-projectmd-complete-example)
5. [Command Specification Examples](#5-command-specification-examples)
6. [links.yaml Complete Example](#6-linksyaml-complete-example)
7. [Insight Report Example](#7-insight-report-example)

---

## 1. GSD-Compatible Project Specification

The GSD (Get Shit Done) framework uses a `.planning/` directory with phased execution. Here's how a pm-skills project workspace maps to GSD conventions while extending them for multi-project PM work.

### 1.1 GSD-Style Project Structure

```
acme-checkout-redesign/
├── PROJECT.md                    # ≈ GSD's PROJECT.md (vision & overview)
├── REQUIREMENTS.md               # ≈ GSD's REQUIREMENTS.md (scoped needs)
├── ROADMAP.md                    # ≈ GSD's ROADMAP.md (phase tracking)
├── STATE.md                      # ≈ GSD's STATE.md (decisions, blockers)
├── .planning/
│   ├── 1-discover/
│   │   ├── CONTEXT.md            # Discovery phase decisions
│   │   ├── RESEARCH.md           # Market/user research findings
│   │   └── SUMMARY.md            # Discovery phase outcomes
│   ├── 2-define/
│   │   ├── CONTEXT.md
│   │   └── SUMMARY.md
│   ├── 3-develop/
│   │   ├── CONTEXT.md
│   │   └── SUMMARY.md
│   ├── 4-deliver/
│   ├── 5-measure/
│   └── 6-iterate/
├── artifacts/                     # PM skill outputs (GSD extension)
│   ├── define/
│   │   ├── problem-statement.md
│   │   └── hypothesis.md
│   ├── develop/
│   │   └── prd_v1.md
│   └── deliver/
│       └── user-stories.md
├── inputs/                        # Raw inputs (GSD extension)
│   └── interview-2026-03-15.md
└── links.yaml                     # Document relationships (GSD extension)
```

### 1.2 GSD-Style STATE.md for PM Projects

```markdown
---
project: acme-checkout-redesign
phase: develop
updated: 2026-03-21T14:30:00Z
---

# State: Acme Checkout Redesign

## Decisions Locked
1. Single-page checkout for returning users (2026-03-10)
2. Guest checkout deferred to v2 (2026-03-12)
3. Stripe remains payment provider (2026-03-15)

## Blockers
1. Design review pending — Sarah Chen OOO until 2026-03-25

## Current Position
- Phase: Develop (PRD v1 complete, user stories in progress)
- Next action: Complete user stories, schedule engineering review
- Active skill work: /user-stories (5 of 12 stories drafted)

## Context for Next Session
- PRD v1 feedback from Mike Torres: reduce scope of recommendation engine
- Interview #4 transcript ready for processing in inputs/
- Launch target moved from April 15 to April 30 (communicated in Slack #acme-project)
```

### 1.3 GSD-Style ROADMAP.md for PM Projects

```markdown
---
project: acme-checkout-redesign
updated: 2026-03-21
---

# Roadmap: Acme Checkout Redesign

## Phase Progression

| Phase | Status | Key Artifacts | Dates |
|-------|--------|--------------|-------|
| Discover | ✅ Complete | stakeholder-summary, interview-synthesis, competitive-analysis | 2026-02-15 → 2026-03-01 |
| Define | ✅ Complete | problem-statement, hypothesis, jtbd-canvas | 2026-03-01 → 2026-03-10 |
| Develop | 🔄 In Progress | prd_v1, solution-brief, design-rationale | 2026-03-10 → current |
| Deliver | ⬜ Not Started | user-stories, edge-cases, launch-checklist | Planned: 2026-03-25 |
| Measure | ⬜ Not Started | experiment-design, instrumentation-spec | Planned: 2026-04-01 |
| Iterate | ⬜ Not Started | retrospective, lessons-log | Post-launch |

## Milestones

- [x] Discovery complete — stakeholder alignment achieved (2026-03-01)
- [x] Problem validated — 4/4 interviews confirm checkout pain (2026-03-08)
- [x] Hypothesis formed — single-page checkout for returning users (2026-03-10)
- [ ] PRD approved — engineering review sign-off
- [ ] Stories groomed — sprint-ready backlog
- [ ] Launch — v1 shipped to 10% traffic
```

---

## 2. agentskills.io-Compatible Skill Specification

### 2.1 utility-project-manager Skill (Open Spec Format)

```
skills/utility-project-manager/
├── SKILL.md
└── references/
    ├── TEMPLATE.md
    └── EXAMPLE.md
```

**SKILL.md**:

```markdown
---
name: utility-project-manager
description: >-
  Manage multi-project PM workspaces. Create projects, switch context between
  active initiatives, view project status, and organize PM artifacts by project
  and Triple Diamond phase. Use when working across multiple product initiatives
  or when you need persistent project context across sessions.
classification: utility
version: "1.0.0"
updated: 2026-03-21
license: Apache-2.0
metadata:
  category: coordination
  frameworks: [triple-diamond]
  author: product-on-purpose
---

# Project Manager

## Purpose

Help PMs organize and navigate multiple concurrent product initiatives. Each
project groups PM artifacts (problem statements, PRDs, user stories, etc.) in
a persistent directory structure that survives across sessions and platforms.

## When to Use

- Starting a new product initiative
- Switching context between projects mid-session
- Reviewing what artifacts exist for a project
- Checking which projects need attention
- Loading project context before running another pm-skill

## When NOT to Use

- For a single, one-off artifact (just run the skill directly)
- For software project planning (use GSD or similar)
- For task/ticket management (use Linear, Jira, etc.)

## Instructions

### Step 1: Identify the Action

Ask the user what they need:

| Action | When to Use |
|--------|------------|
| **Create project** | Starting a new initiative |
| **Switch project** | Changing context to a different initiative |
| **List projects** | Seeing all active projects |
| **View status** | Understanding current state of a project |
| **Load context** | Preparing to run another pm-skill with project context |
| **Archive project** | Moving a completed/cancelled project out of active list |

### Step 2: Execute the Action

#### Create Project

1. Ask for project name (will be converted to kebab-case for directory)
2. Ask clarifying questions:
   - What is the objective? (1-2 sentences)
   - What phase is this starting in? (discover/define/develop/deliver/measure/iterate)
   - Who are the key stakeholders?
   - What constraints or deadlines exist?
3. Create the project directory structure
4. Generate PROJECT.md from template
5. Update PROJECT_INDEX.md
6. Set as active project

#### Switch Project

1. Read PROJECT_INDEX.md for available projects
2. Switch active project in .pm-config.yaml
3. Display brief project status

#### List Projects

1. Read PROJECT_INDEX.md
2. Display table with: project name, phase, status, artifact count, last active date
3. Highlight the active project

#### View Status

1. Read active project's PROJECT.md
2. Scan artifacts/ directory for existing documents
3. Check links.yaml for relationships (if exists)
4. Check for stale documents (>14 days without update)
5. Present:
   - Project overview
   - Artifact inventory by phase
   - Suggested next skills to run
   - Any stale or missing artifacts

#### Load Context

1. Read active project's PROJECT.md
2. Identify the most relevant artifacts (based on what skill the user plans to run)
3. Output context in a format suitable for copy-paste into the next skill invocation
4. Keep output under 2000 tokens

#### Archive Project

1. Move project directory to _archived/
2. Remove from PROJECT_INDEX.md active list
3. Add to archived section

### Step 3: Suggest Next Steps

After any action, suggest relevant follow-up:
- After create: "Run /problem-statement to define the core problem"
- After switch: "Run /project status to see where you left off"
- After status: "Based on your phase, consider running /[next-skill]"

## Output Contract

- Project directory structure matches the specification in TEMPLATE.md
- PROJECT.md follows the template schema
- All file names are kebab-case
- Phase directories are one of: discover, define, develop, deliver, measure, iterate
- PROJECT_INDEX.md is updated on every project create/archive/status change
```

### 2.2 TEMPLATE.md

```markdown
# Project Template: [PROJECT NAME]

---

## PROJECT.md

<!-- Copy this template for new projects -->

\`\`\`markdown
---
name: [Project Name — human-readable]
slug: [project-name — kebab-case, matches directory]
phase: [discover | define | develop | deliver | measure | iterate]
created: [YYYY-MM-DD]
updated: [YYYY-MM-DD]
status: [active | paused | completed | cancelled]
stakeholders:
  - name: [Name]
    role: [Role]
tags: [tag1, tag2]
---

# [Project Name]

## Objective
[1-2 sentences: what this project aims to achieve and why it matters]

## Key Constraints
- [Constraint 1]
- [Constraint 2]

## Current State
- [Latest completed artifact and date]
- [Current work in progress]

## Open Questions
- [Question that needs resolution]
\`\`\`

---

## Directory Structure

\`\`\`
[project-slug]/
├── PROJECT.md
├── artifacts/
│   ├── discover/
│   ├── define/
│   ├── develop/
│   ├── deliver/
│   ├── measure/
│   └── iterate/
├── inputs/
├── links.yaml
└── .history/
\`\`\`

---

## .pm-config.yaml

\`\`\`yaml
workspace:
  version: "1.0"
  created: [YYYY-MM-DD]
active_project: [project-slug]
settings:
  auto_save: false
  artifact_versioning: true
  phase_subdirectories: true
\`\`\`
```

### 2.3 EXAMPLE.md

```markdown
# Project Example: Acme Checkout Redesign

This example shows a project in the **Develop** phase with 5 completed artifacts
and 2 pending.

---

## PROJECT.md (Completed)

\`\`\`markdown
---
name: Acme Checkout Redesign
slug: acme-checkout-redesign
phase: develop
created: 2026-02-15
updated: 2026-03-21
status: active
stakeholders:
  - name: Sarah Chen
    role: Engineering Lead
  - name: Mike Torres
    role: Design Lead
  - name: Lisa Park
    role: VP Product
tags: [checkout, mobile, conversion, q2-2026]
---

# Acme Checkout Redesign

## Objective
Reduce mobile checkout abandonment from 73% to under 55% by simplifying
the checkout flow for returning users. This directly impacts Q2 revenue
targets and NPS scores.

## Key Constraints
- Must not break existing Stripe payment integration
- Mobile-first design (60% of checkout traffic is mobile)
- Q2 2026 launch target (April 30 deadline)
- Budget: 2 engineers + 1 designer for 6 weeks

## Current State
- Discovery complete: 4 user interviews conducted, competitive analysis done
- Problem statement and hypothesis validated by stakeholder review
- PRD v1 drafted, pending engineering review
- User stories: 5 of 12 drafted

## Open Questions
- Should guest checkout be in v1 scope? (Lisa leans yes, engineering says no)
- Can we reuse the existing address autocomplete component?
\`\`\`

---

## Artifact Inventory

\`\`\`
artifacts/
├── discover/
│   ├── stakeholder-summary.md       (2026-02-20)
│   ├── interview-synthesis.md       (2026-03-01)
│   └── competitive-analysis.md      (2026-02-25)
├── define/
│   ├── problem-statement.md         (2026-03-05)
│   └── hypothesis.md                (2026-03-08)
├── develop/
│   ├── prd_v1.md                    (2026-03-15)
│   └── solution-brief.md            (2026-03-12)
├── deliver/
│   └── user-stories.md              (2026-03-21, in progress)
├── measure/
│   └── (empty — not yet started)
└── iterate/
    └── (empty — post-launch)
```

---

## /project status Output (Example)

\`\`\`
Project: Acme Checkout Redesign
Phase:   Develop (3 of 6 phases complete)
Status:  Active
Updated: 2026-03-21

Artifacts by Phase:
  Discover  ████████████ 3/3 complete
  Define    ████████████ 2/2 complete
  Develop   ██████░░░░░░ 2/3 (prd_v1, solution-brief done; design-rationale pending)
  Deliver   ██░░░░░░░░░░ 1/3 (user-stories in progress)
  Measure   ░░░░░░░░░░░░ 0/2
  Iterate   ░░░░░░░░░░░░ 0/2

Suggested Next:
  → Complete user stories (/user-stories)
  → Add edge cases (/edge-cases)
  → Consider design rationale (/design-rationale)

Stale Alerts:
  ⚠ competitive-analysis.md last updated 24 days ago
\`\`\`
```

---

## 3. Full Scenario Walkthrough

### Scenario: PM Managing Three Projects

```
Session 1 — Monday Morning

PM: /project list

Project                    Phase       Status    Artifacts  Last Active
───────────────────────────────────────────────────────────────────────
→ acme-checkout-redesign   develop     active    5          2d ago
  beta-mobile-app          discover    active    2          5d ago
  q2-pricing-experiment    measure     active    4          1d ago

PM: /project switch beta-mobile-app

Switched to: Beta Mobile App
Phase: Discover (2 artifacts)
Last active: 5 days ago

PM: /project context

# Beta Mobile App — Project Context

## Objective
Build a companion mobile app for existing desktop users to enable
on-the-go task management.

## Phase: Discover
Completed: stakeholder-summary (2026-03-16)
Completed: competitive-analysis (2026-03-16)
Pending: interview-synthesis, problem-statement, hypothesis

## Open Questions
- Native vs. React Native vs. PWA?
- Which desktop features are mobile-priority?

PM: /interview-synthesis
[Claude runs the skill with project context loaded]
[Output is saved to beta-mobile-app/artifacts/discover/interview-synthesis.md]

PM: /project switch acme-checkout-redesign

Switched to: Acme Checkout Redesign
Phase: Develop (5 artifacts)

PM: /user-stories
[Claude runs the skill with PRD v1 and problem statement loaded as context]
[Output is saved to acme-checkout-redesign/artifacts/deliver/user-stories.md]

PM: /project status

[Shows updated status with 6 artifacts, user-stories now listed]
```

---

## 4. PROJECT.md Complete Example

See Section 2.3 above for the full completed PROJECT.md example.

---

## 5. Command Specification Examples

### 5.1 /project Command (GSD-Compatible)

```yaml
---
name: project
description: >-
  Manage PM project workspaces. Supports: new, switch, list, status,
  context, archive. Persists project state across sessions using a local
  directory structure compatible with GSD and agentskills.io conventions.
arguments:
  - name: action
    description: "new | switch | list | status | context | archive"
    required: true
  - name: name
    description: "Project name (kebab-case)"
    required: false
---

# /project

Manage your PM project workspace.

## Usage

- `/project new <name>` — Create a new project with guided setup
- `/project switch <name>` — Switch active project context
- `/project list` — Show all projects with status
- `/project status` — Detailed view of active project
- `/project context` — Output project context for use with other skills
- `/project archive <name>` — Archive a completed or cancelled project

## Behavior

When creating a new project, ask these questions:
1. What is this project's objective? (1-2 sentences)
2. What phase are you starting in? (default: discover)
3. Who are the key stakeholders? (name + role)
4. What constraints or deadlines exist?
5. Any relevant tags?

Create the project directory structure, generate PROJECT.md, and set
as active project.

When switching projects, load the PROJECT.md and display a brief status
summary so the PM knows where they left off.

## Output

All project operations produce human-readable output. No JSON, no raw YAML.
Tables and ASCII progress bars for status displays.
```

### 5.2 /update-doc Command (Open-Spec Compatible)

```yaml
---
name: update-doc
description: >-
  Intelligently update an existing PM artifact with new information.
  Preserves document structure, creates versioned copies, and tracks
  provenance of changes. Works with any artifact in the active project.
arguments:
  - name: artifact
    description: "Artifact to update (e.g., prd, problem-statement, user-stories)"
    required: true
  - name: source
    description: "Source of new information (file path, or 'conversation' for inline)"
    required: false
---

# /update-doc

Update an existing PM artifact with new information while preserving
its structure and creating a version history.

## Usage

- `/update-doc prd` — Update the PRD with information from conversation
- `/update-doc problem-statement --with inputs/interview-2026-03-20.md` — Update based on transcript
- `/update-doc hypothesis --with artifacts/discover/experiment-results.md` — Update based on results

## Behavior

1. Find the most recent version of the artifact in the active project
2. Read the current content
3. Accept new information (from conversation, file, or user input)
4. Produce updated version:
   - Same sections, same structure
   - New information integrated at appropriate locations
   - Conflicts or contradictions flagged for user review
   - Frontmatter updated (version incremented, date updated)
5. Save as new version (e.g., prd_v2.md)
6. Record change in .history/ with:
   - What changed (diff summary)
   - Why (source of new information)
   - When (timestamp)
```

---

## 6. links.yaml Complete Example

```yaml
# Document relationships for: acme-checkout-redesign
# Updated: 2026-03-21

links:
  # Discovery → Definition
  - from: discover/stakeholder-summary.md
    to: define/problem-statement.md
    type: informs
    created: 2026-03-05
    note: "Stakeholder interviews identified checkout pain as top priority"

  - from: discover/interview-synthesis.md
    to: define/problem-statement.md
    type: informs
    created: 2026-03-05
    note: "4/4 users cited multi-step checkout as frustration"

  - from: discover/competitive-analysis.md
    to: define/hypothesis.md
    type: informs
    created: 2026-03-08
    note: "Competitor single-page checkouts show 40% better conversion"

  # Definition → Development
  - from: define/problem-statement.md
    to: define/hypothesis.md
    type: informs
    created: 2026-03-08

  - from: define/hypothesis.md
    to: develop/prd_v1.md
    type: informs
    created: 2026-03-15

  - from: define/problem-statement.md
    to: develop/solution-brief.md
    type: constrains
    created: 2026-03-12

  # Development → Delivery
  - from: develop/prd_v1.md
    to: deliver/user-stories.md
    type: decomposes
    created: 2026-03-21

  # Version history
  - from: develop/prd_v1.md
    to: develop/prd_v2.md
    type: supersedes
    created: 2026-03-22
    note: "Updated based on engineering review feedback"

# Rendered graph:
#
# stakeholder-summary ──informs──→ problem-statement ──informs──→ hypothesis
# interview-synthesis ──informs──↗                                    │
# competitive-analysis ──informs──→ hypothesis                        │ informs
#                                                                     ↓
# problem-statement ──constrains──→ solution-brief              prd_v1 → prd_v2
#                                                                │ decomposes
#                                                                ↓
#                                                           user-stories
```

---

## 7. Insight Report Example

Output from `/process-transcript` (Phase 3 capability):

```markdown
---
source: inputs/interview-2026-03-20_user-4.md
project: acme-checkout-redesign
processed: 2026-03-21T10:30:00Z
insights_extracted: 6
artifacts_affected: 3
---

# Insight Report: User Interview #4 — Returning Customer (Maria, 34)

## Summary
Maria is a frequent shopper (2-3x/month) who primarily uses mobile. She
confirmed the checkout pain hypothesis but added a nuance: the problem
isn't just *steps* but *redundant data entry*. She enters the same address
and payment info every time despite being logged in.

## Extracted Insights

### Insight 1: Redundant Data Entry is the Core Pain
> "I'm logged in. You know my address. Why am I typing it again?"
- **Relevance**: Directly validates hypothesis
- **Affects**: define/problem-statement.md (Section: User Impact)
- **Suggested update**: Add "redundant data entry for returning users" as primary pain

### Insight 2: Trust Barrier with Saved Payment
> "I saved my card once but I wasn't sure it was actually saved. The page
> looked the same as for new customers."
- **Relevance**: New finding — UX signal for saved state is unclear
- **Affects**: develop/prd_v1.md (Section: Requirements)
- **Suggested update**: Add requirement "Clear visual indicator for saved payment methods"

### Insight 3: Address Auto-Fill Works But Feels Risky
> "It autofilled my old address once. I almost shipped $200 of stuff to
> my college apartment."
- **Relevance**: Edge case for address management
- **Affects**: deliver/user-stories.md (new story needed)
- **Suggested update**: Add story "As a returning user, I want to verify my
  shipping address before purchase so that I don't accidentally ship to an
  old address"

### Insight 4: Mobile Keyboard Switching is Painful
> "On my phone, switching between letter keyboard and number keyboard for
> the ZIP code... I just give up sometimes."
- **Relevance**: Mobile-specific UX pain
- **Affects**: develop/prd_v1.md (Section: Technical Considerations)
- **Suggested update**: Add "Use numeric keyboard for ZIP/CVV fields on mobile"

### Insight 5: Guest Checkout Preference for Gifts
> "When I'm buying a gift and shipping to someone else, I don't want my
> address saved. I just want to type theirs and go."
- **Relevance**: Informs guest checkout scope decision
- **Affects**: PROJECT.md (Open Questions section)
- **Suggested update**: Guest checkout may be needed for gift-shipping use case

### Insight 6: Positive Signal on Single-Page Concept
> "If I could just see my saved stuff and hit 'buy'? That would be amazing."
- **Relevance**: Validates single-page approach
- **Affects**: define/hypothesis.md (validation evidence)
- **Suggested update**: Add as validation evidence (4/4 users now positive)

## Suggested Actions

| Priority | Action | Artifact | Type |
|----------|--------|----------|------|
| 1 | Update problem statement with redundant data entry framing | problem-statement.md | Update |
| 2 | Add saved payment visibility requirement to PRD | prd_v1.md | Update |
| 3 | Add address verification user story | user-stories.md | New content |
| 4 | Add mobile keyboard requirement to PRD | prd_v1.md | Update |
| 5 | Document gift-shipping guest checkout insight | PROJECT.md | Update |
| 6 | Record validation evidence on hypothesis | hypothesis.md | Update |

## Provenance

All insights traced to: `inputs/interview-2026-03-20_user-4.md`
Interview conducted by: [PM name]
Duration: 45 minutes
Recording: [link if available]
```
