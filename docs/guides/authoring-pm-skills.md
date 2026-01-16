# Authoring PM-Skills

This guide walks you through creating new PM skills for submission to the pm-skills repository. Whether you're contributing your first skill or your tenth, this guide covers everything from concept to pull request.

---

## Table of Contents

- [Overview](#overview)
- [Before You Start](#before-you-start)
- [The Contribution Process](#the-contribution-process)
- [Skill Anatomy](#skill-anatomy)
- [Writing SKILL.md](#writing-skillmd)
- [Creating TEMPLATE.md](#creating-templatemd)
- [Writing EXAMPLE.md](#writing-examplemd)
- [Creating the Slash Command](#creating-the-slash-command)
- [Testing Your Skill](#testing-your-skill)
- [Quality Checklist](#quality-checklist)
- [Submission Process](#submission-process)
- [Common Mistakes](#common-mistakes)
- [Advanced Topics](#advanced-topics)

---

## Overview

### What Makes a Good Skill?

A good PM skill:

1. **Solves a real problem** — PMs actually need this artifact regularly
2. **Produces consistent output** — Same quality every time
3. **Works across contexts** — Useful for different products, teams, industries
4. **Is well-documented** — Clear instructions, useful template, realistic example
5. **Integrates with workflows** — Chains naturally with other skills

### The Three Files

Every skill consists of three files:

```
skills/<phase>/<skill-name>/
├── SKILL.md              # Instructions for the AI
└── references/
    ├── TEMPLATE.md       # Output structure
    └── EXAMPLE.md        # Completed example
```

Plus an optional slash command:
```
commands/<skill-name>.md  # Slash command definition
```

---

## Before You Start

### 1. Check If It Already Exists

Review the [existing 24 skills](../../AGENTS.md) to ensure your idea isn't already covered:

| Category | Existing Skills |
|----------|-----------------|
| research | interview-synthesis, competitive-analysis, stakeholder-summary |
| problem-framing | problem-statement, opportunity-tree, jtbd-canvas |
| ideation | hypothesis, solution-brief |
| specification | prd, user-stories, edge-cases, adr, design-rationale |
| validation | experiment-design, instrumentation-spec, dashboard-requirements |
| reflection | experiment-results, retrospective, lessons-log, pivot-decision |
| coordination | launch-checklist, release-notes, spike-summary, refinement-notes |

### 2. Validate the Need

Answer these questions:

- [ ] Do PMs create this artifact at least monthly?
- [ ] Would 3+ different PM roles find this useful?
- [ ] Does it produce a concrete deliverable (not just advice)?
- [ ] Can you describe 3+ distinct use cases?
- [ ] Is it different enough from existing skills?

If you answered "no" to any, reconsider whether this is the right skill.

### 3. Choose the Right Category

| Category | Use When The Skill... |
|----------|----------------------|
| `research` | Gathers or synthesizes information about users, market, or stakeholders |
| `problem-framing` | Defines, scopes, or articulates problems to solve |
| `ideation` | Explores solutions or forms testable assumptions |
| `specification` | Details requirements, decisions, or what to build |
| `validation` | Plans or instruments experiments and measurement |
| `reflection` | Captures learnings, retrospectives, or pivot decisions |
| `coordination` | Aligns teams, prepares launches, or communicates |

### 4. Choose the Right Phase

Skills live in phase directories based on when they're typically used:

| Phase | When | Examples |
|-------|------|----------|
| `discover` | Understanding the landscape | interview-synthesis, competitive-analysis |
| `define` | Framing the problem | problem-statement, hypothesis |
| `develop` | Exploring solutions | solution-brief, adr |
| `deliver` | Specifying and shipping | prd, user-stories, launch-checklist |
| `measure` | Validating with data | experiment-design, instrumentation-spec |
| `iterate` | Learning and improving | retrospective, lessons-log |

---

## The Contribution Process

### Step 1: Open an Issue

Before writing any code, open a "Request a Skill" issue with:

```markdown
## Skill Proposal: <skill-name>

### Name
<lowercase-with-hyphens>

### Category
<one of the 7 categories>

### Phase
<one of the 6 phases>

### Description
<1-2 sentences: what it does and when to use it>

### Use Cases
1. <Specific scenario where this adds value>
2. <Another scenario>
3. <Another scenario>

### Example Output (Brief)
<Show a snippet of what the skill would produce>

### Why This Skill?
<Why doesn't an existing skill cover this? What gap does it fill?>
```

### Step 2: Wait for Approval

Maintainers will review your proposal and may:
- **Approve** — You're cleared to build
- **Request changes** — Adjust the scope or approach
- **Suggest alternatives** — An existing skill might work
- **Decline** — The skill doesn't fit the project

### Step 3: Build the Skill

Once approved, create your skill following this guide.

### Step 4: Submit a Pull Request

Open a PR with:
- The three required files
- The slash command file
- Updates to AGENTS.md (skill listing)
- Confirmation that you've tested the skill

---

## Skill Anatomy

### Directory Structure

```
skills/
└── <phase>/                    # deliver, measure, etc.
    └── <skill-name>/           # lowercase-with-hyphens
        ├── SKILL.md            # Main instructions
        └── references/
            ├── TEMPLATE.md     # Output template
            └── EXAMPLE.md      # Completed example
```

### Naming Rules

Per the [agentskills.io specification](https://agentskills.io/specification):

| Rule | Valid | Invalid |
|------|-------|---------|
| Lowercase only | `problem-statement` | `Problem-Statement` |
| Hyphens for spaces | `user-stories` | `user_stories` |
| No consecutive hyphens | `edge-cases` | `edge--cases` |
| 1-64 characters | `prd` | (65+ chars) |
| Letters, numbers, hyphens | `adr`, `v2-roadmap` | `adr!`, `v2.roadmap` |
| **Must match directory** | Dir: `prd/`, name: `prd` | Dir: `prd/`, name: `PRD` |

### Choosing a Name

Good names:
- **Match the artifact:** `prd`, `retrospective`, `adr`
- **Are recognizable:** PMs know what "PRD" means
- **Are searchable:** Include key terms
- **Are concise:** 1-3 words typical

---

## Writing SKILL.md

The SKILL.md file is the heart of your skill. It tells the AI exactly how to create the artifact.

### Required Sections

```markdown
---
name: skill-name
description: What it does and when to use it. Include trigger keywords.
license: Apache-2.0
metadata:
  category: specification
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: your-github-username
  version: "1.0.0"
---

# Skill Title

<Overview paragraph>

## When to Use

- <Situation 1>
- <Situation 2>
- <Situation 3>

## Instructions

When asked to create [artifact], follow these steps:

1. **Step Title**
   Description of what to do and why.

2. **Step Title**
   Description of what to do and why.

[Continue with more steps]

## Output Format

Use the template in `references/TEMPLATE.md` to structure the output.

## Quality Checklist

Before finalizing, verify:

- [ ] Quality criterion 1
- [ ] Quality criterion 2
- [ ] Quality criterion 3

## Examples

See `references/EXAMPLE.md` for a completed example.
```

### Writing the Frontmatter

#### name
Must exactly match the directory name. Lowercase, hyphens only.

```yaml
name: sprint-review  # Directory must be skills/iterate/sprint-review/
```

#### description

This is critical for AI discovery. Write for both humans and machines.

**Structure:** `[Action verb] [artifact type] [key details]. Use when [trigger 1], [trigger 2], or [trigger 3].`

**Good example:**
```yaml
description: Creates a comprehensive Product Requirements Document that aligns stakeholders on what to build, why, and how success will be measured. Use when specifying features, epics, or product initiatives for engineering handoff.
```

**Bad example:**
```yaml
description: Helps with PRDs.  # Too vague, no triggers
```

**Include trigger keywords:**
- Action words: creates, generates, documents, designs, analyzes
- Artifact names: PRD, requirements, stories, checklist
- Context phrases: before launch, after experiments, for engineering

#### metadata.category

One of: `research`, `problem-framing`, `ideation`, `specification`, `validation`, `reflection`, `coordination`

#### metadata.frameworks

Which methodologies use this skill:
```yaml
frameworks: [triple-diamond, lean-startup, design-thinking]
```

Options: `triple-diamond`, `lean-startup`, `design-thinking`, `scrum`, `kanban`, `safe`

#### metadata.version

Always quote to prevent YAML float interpretation:
```yaml
version: "1.0.0"  # Correct
version: 1.0.0    # Wrong - YAML interprets as float
```

### Writing the Overview

One paragraph explaining:
- What artifact this skill produces
- Why it matters
- What value it provides

**Example:**
```markdown
A Product Requirements Document is the primary specification artifact that
communicates what to build and why. It bridges the gap between problem
understanding and engineering implementation by providing clear requirements,
success criteria, and scope boundaries. A good PRD enables engineering to
build the right thing while maintaining flexibility on implementation details.
```

### Writing "When to Use"

List 4-6 specific situations. Be concrete:

**Good:**
```markdown
## When to Use

- After problem and solution alignment, before engineering work begins
- When specifying features, epics, or product initiatives for handoff
- When multiple teams need to coordinate on a shared deliverable
- When stakeholders need to approve scope before investment
- As reference documentation during development and QA
```

**Bad:**
```markdown
## When to Use

- When you need a PRD
- For product work
```

### Writing Instructions

Instructions are step-by-step directions the AI follows. Each step should:

1. **Have a clear action title** — What to do
2. **Explain the purpose** — Why it matters
3. **Provide guidance** — How to do it well

**Example:**
```markdown
## Instructions

When asked to create a PRD, follow these steps:

1. **Summarize the Problem**
   Start with a brief recap of the problem being solved. Link to the problem
   statement if available. Ensure readers understand *why* this work matters
   before diving into *what* to build.

2. **Define Goals and Success Metrics**
   Articulate what success looks like. Include specific, measurable metrics
   with baselines and targets. These metrics should connect directly to the
   problem being solved.

3. **Outline the Solution**
   Describe the proposed solution at a high level. Focus on user-facing
   functionality and key capabilities. Include enough detail for stakeholders
   to evaluate the approach without over-specifying implementation.
```

**Tips:**
- 5-10 steps is typical
- Each step should be actionable
- Include what information to gather
- Mention what to skip or defer

### Writing the Quality Checklist

Provide 5-8 criteria for validating output quality:

```markdown
## Quality Checklist

Before finalizing, verify:

- [ ] Problem and "why now" are clearly articulated
- [ ] Success metrics are specific and measurable
- [ ] Scope boundaries are explicit (in/out/future)
- [ ] Requirements are testable and unambiguous
- [ ] Technical considerations are surfaced without over-specifying
- [ ] Dependencies and risks are documented with owners
- [ ] Document is readable in under 15 minutes
```

**Make criteria:**
- Specific and verifiable
- Focused on common failure modes
- Actionable (can be fixed if not met)

---

## Creating TEMPLATE.md

The template provides the exact structure for the output.

### Template Structure

```markdown
---
artifact: <artifact-type>
version: "1.0"
created: <YYYY-MM-DD>
status: draft
---

# <Artifact Title>

## Section 1
<!-- Guidance on what goes here -->

[Content placeholder]

## Section 2
<!-- Guidance on what goes here -->

[Content placeholder]
```

### Template Principles

1. **Use clear section headings** — Match the sections in your instructions
2. **Include HTML comments** — Guide the AI on what each section needs
3. **Provide structure hints** — Tables, lists, or prose as appropriate
4. **Keep it flexible** — Don't over-constrain

### Example: PRD Template (excerpt)

```markdown
---
artifact: prd
version: "1.0"
created: <YYYY-MM-DD>
status: draft
---

# PRD: [Feature/Initiative Name]

## Overview

### Problem Statement
<!-- Brief recap of the problem. Link to full problem statement if available. -->

[Problem summary]

### Solution Summary
<!-- High-level description of what we're building -->

[Solution summary]

## Goals & Success Metrics

### Goals
<!-- What outcomes are we trying to achieve? -->

1. [Primary goal]
2. [Secondary goal]

### Success Metrics

| Metric | Current Baseline | Target | Timeline |
|--------|-----------------|--------|----------|
| [Primary metric] | [Value] | [Value] | [Date] |

## Scope

### In Scope
<!-- What will be delivered in this iteration -->

- [Feature/capability 1]
- [Feature/capability 2]

### Out of Scope
<!-- What will NOT be delivered -->

- [Excluded item 1]
```

### Template Tips

- **Match your instructions:** If instructions say "Define Goals," have a "Goals" section
- **Use tables for structured data:** Metrics, risks, dependencies work well as tables
- **Include frontmatter:** Helps track artifact metadata
- **Add placeholder guidance:** `<!-- Comments -->` help the AI understand intent

---

## Writing EXAMPLE.md

The example shows what a great output looks like. This is crucial for quality calibration.

### Example Requirements

1. **Complete** — No placeholders, fully filled out
2. **Realistic** — Based on a believable scenario
3. **High quality** — Demonstrates what "good" looks like
4. **Appropriately detailed** — Not too sparse, not bloated

### Example Structure

```markdown
---
artifact: prd
version: "1.0"
created: 2025-01-15
status: complete
context: Project management tool adding recurring tasks feature
---

# PRD: Recurring Tasks

## Overview

### Problem Statement

Users of TaskFlow spend significant time manually recreating repetitive
tasks that occur on predictable schedules. Our research shows that 34%
of all tasks created are duplicates of previous tasks, and power users
report spending 2+ hours per week on this manual work...

[Continue with fully completed content]
```

### Choosing an Example Scenario

Pick a scenario that is:

- **Relatable** — Most PMs understand it
- **Representative** — Shows typical complexity
- **Complete** — Has enough depth to fill all sections
- **Generic** — Not specific to one industry or company

**Good scenarios:**
- E-commerce: Search, checkout, wishlist features
- SaaS: User management, reporting, integrations
- Productivity: Task management, collaboration, notifications

**Avoid:**
- Highly specialized domains (medical, legal)
- Controversial topics
- Company-specific context

### Example Quality Bar

Your example should demonstrate:

- [ ] All template sections filled meaningfully
- [ ] Realistic numbers, names, and dates
- [ ] Appropriate level of detail
- [ ] Professional tone
- [ ] No placeholder text (`[TBD]`, `XXX`)
- [ ] Internally consistent

---

## Creating the Slash Command

Slash commands provide quick invocation in Claude Code.

### Command Structure

Create `commands/<skill-name>.md`:

```markdown
---
description: <Brief description for command discovery>
---

Use the `<skill-name>` skill to <what it creates>.

Read the skill instructions from `skills/<phase>/<skill-name>/SKILL.md` and follow them to create <artifact>.

Use `skills/<phase>/<skill-name>/references/TEMPLATE.md` as the output format.

Context from user: $ARGUMENTS
```

### Example: PRD Command

```markdown
---
description: Create a Product Requirements Document
---

Use the `prd` skill to create a comprehensive Product Requirements Document.

Read the skill instructions from `skills/deliver/prd/SKILL.md` and follow them to create a PRD.

Use `skills/deliver/prd/references/TEMPLATE.md` as the output format.

Context from user: $ARGUMENTS
```

### The $ARGUMENTS Variable

`$ARGUMENTS` captures everything the user types after the command:

```
/prd search feature for e-commerce
     ↑____________________________↑
              $ARGUMENTS
```

---

## Testing Your Skill

Before submitting, thoroughly test your skill.

### Test Checklist

- [ ] **Basic invocation works** — Skill produces reasonable output
- [ ] **Template is followed** — Output matches template structure
- [ ] **Example quality is matched** — Output quality similar to example
- [ ] **Different contexts work** — Try 3+ different scenarios
- [ ] **Slash command works** — (If created)
- [ ] **Chains with other skills** — Works as input/output with related skills

### Testing Methods

#### Method 1: Direct Reference

```
Read skills/deliver/my-skill/SKILL.md and use it to create
[artifact] for [your test scenario].
```

#### Method 2: Slash Command

```
/my-skill "test scenario context"
```

#### Method 3: Natural Language

```
Use the my-skill skill to create [artifact] for [scenario].
```

### Test Scenarios

Test with at least:

1. **Minimal context** — Just the basic request
2. **Rich context** — Detailed background information
3. **Edge case** — Unusual or challenging scenario
4. **Different domain** — Another industry or product type

### What to Look For

**Good signs:**
- Output follows template structure
- All sections are meaningfully filled
- Quality matches your example
- Consistent results across tests

**Warning signs:**
- Sections are skipped or empty
- Output doesn't match template
- Quality varies wildly
- AI asks too many clarifying questions

---

## Quality Checklist

Before submitting your PR, verify:

### File Structure
- [ ] Directory path is `skills/<phase>/<skill-name>/`
- [ ] Contains `SKILL.md`
- [ ] Contains `references/TEMPLATE.md`
- [ ] Contains `references/EXAMPLE.md`
- [ ] Slash command at `commands/<skill-name>.md`

### Frontmatter
- [ ] `name` matches directory name exactly
- [ ] `description` is 50-300 characters with trigger keywords
- [ ] `category` is one of the 7 valid values
- [ ] `version` is quoted (`"1.0.0"`)
- [ ] `license` is `Apache-2.0`

### SKILL.md Content
- [ ] Overview paragraph explains value
- [ ] 4-6 "When to Use" situations
- [ ] 5-10 clear instruction steps
- [ ] References template and example
- [ ] 5-8 quality checklist items

### TEMPLATE.md
- [ ] Frontmatter with artifact type
- [ ] Clear section structure
- [ ] HTML comments with guidance
- [ ] Matches instruction steps

### EXAMPLE.md
- [ ] Complete (no placeholders)
- [ ] Realistic scenario
- [ ] Demonstrates quality bar
- [ ] Follows template exactly

### Testing
- [ ] Tested with 3+ scenarios
- [ ] Output matches template
- [ ] Quality matches example
- [ ] Slash command works

---

## Submission Process

### 1. Fork the Repository

```bash
# Fork via GitHub UI, then clone your fork
git clone https://github.com/YOUR-USERNAME/pm-skills.git
cd pm-skills
```

### 2. Create a Branch

```bash
git checkout -b skill/<skill-name>
```

### 3. Add Your Files

```
skills/<phase>/<skill-name>/
├── SKILL.md
└── references/
    ├── TEMPLATE.md
    └── EXAMPLE.md

commands/<skill-name>.md
```

### 4. Update AGENTS.md

Add your skill to the appropriate phase section:

```markdown
#### <skill-name>
**Path:** `skills/<phase>/<skill-name>/SKILL.md`

<Your description from frontmatter>
```

Add the command to the Commands section:

```markdown
| `/<skill-name>` | <Brief description> |
```

### 5. Commit and Push

```bash
git add .
git commit -m "feat: add <skill-name> skill"
git push origin skill/<skill-name>
```

### 6. Open a Pull Request

Include in your PR description:

```markdown
## New Skill: <skill-name>

### Closes
#<issue-number> (link to approved proposal)

### Description
<Brief description of what the skill does>

### Testing
- Tested with [scenario 1]
- Tested with [scenario 2]
- Tested with [scenario 3]

### Checklist
- [ ] SKILL.md complete with valid frontmatter
- [ ] TEMPLATE.md provides clear structure
- [ ] EXAMPLE.md is complete and realistic
- [ ] Slash command created
- [ ] AGENTS.md updated
- [ ] Tested with multiple scenarios
```

---

## Common Mistakes

### Mistake 1: Vague Description

**Bad:**
```yaml
description: Helps create roadmaps
```

**Good:**
```yaml
description: Creates a product roadmap document with prioritized initiatives, dependencies, and timeline. Use when planning quarters, communicating strategy to stakeholders, or aligning teams on priorities.
```

### Mistake 2: Instructions Too Abstract

**Bad:**
```markdown
1. **Think about the problem**
   Consider what matters.
```

**Good:**
```markdown
1. **Define the Problem Scope**
   Identify the specific user segment affected, the pain point they experience,
   and the business impact of not solving it. Quantify where possible.
```

### Mistake 3: Template Doesn't Match Instructions

If instructions say "Define success metrics," the template needs a "Success Metrics" section.

### Mistake 4: Incomplete Example

Placeholders like `[TBD]` or `TODO` in your example mean the AI won't know what complete looks like.

### Mistake 5: Wrong Category

Choosing `ideation` for something that's clearly `specification` confuses organization and discovery.

### Mistake 6: Name Doesn't Match Directory

```
Directory: skills/deliver/product-roadmap/
Frontmatter: name: roadmap  # WRONG - must be "product-roadmap"
```

---

## Advanced Topics

### Supporting Multiple Frameworks

Your skill can work across methodologies:

```yaml
metadata:
  frameworks: [triple-diamond, lean-startup, design-thinking, scrum]
```

Consider how the skill fits each:
- **Triple Diamond:** Which phase does it belong to?
- **Lean Startup:** Is it Build, Measure, or Learn?
- **Design Thinking:** Which stage?
- **Scrum:** Which ceremony or artifact does it support?

### Creating Skill Chains

Design your skill to work with others:

**Inputs from:**
```markdown
## When to Use

- After completing a problem-statement to define testable assumptions
- Building on insights from interview-synthesis
```

**Outputs to:**
```markdown
## Next Steps

After creating this artifact, consider:
- Using the `prd` skill to specify detailed requirements
- Running `experiment-design` to validate assumptions
```

### Handling Skill Variants

If your skill could have variants (e.g., "lightweight PRD" vs "comprehensive PRD"), consider:

1. **One flexible skill** with instructions for different depths
2. **Separate skills** if the process differs significantly

Generally prefer one flexible skill unless workflows are truly different.

### Internationalization Considerations

Skills should work globally:
- Avoid US-specific terminology without explanation
- Use ISO date formats (`YYYY-MM-DD`)
- Note when concepts are region-specific

---

## Resources

### Templates

Start with the [skill template](../../templates/skill-template/):
```
templates/skill-template/
├── SKILL.md
└── references/
    ├── TEMPLATE.md
    └── EXAMPLE.md
```

### References

- [Frontmatter Schema](../reference/frontmatter-schema.yaml) — Detailed field documentation
- [Categories Reference](../reference/categories.md) — Category definitions
- [agentskills.io Specification](https://agentskills.io/specification) — Base specification
- [Existing Skills](../../AGENTS.md) — See how others are structured

### Getting Help

- Open an issue for questions
- Review existing skills for patterns
- Ask in your proposal issue before building

---

## Quick Start Checklist

Ready to create a skill? Here's the fast path:

1. [ ] Open "Request a Skill" issue → wait for approval
2. [ ] Copy `templates/skill-template/` to `skills/<phase>/<name>/`
3. [ ] Write SKILL.md with frontmatter, instructions, checklist
4. [ ] Create TEMPLATE.md matching your instruction steps
5. [ ] Write complete EXAMPLE.md (no placeholders!)
6. [ ] Create `commands/<name>.md` slash command
7. [ ] Test with 3+ scenarios
8. [ ] Update AGENTS.md
9. [ ] Submit PR with checklist complete

---

*Part of [PM-Skills](../../README.md) — Open source Product Management skills for AI agents*
