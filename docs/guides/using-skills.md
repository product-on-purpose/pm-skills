# Using Skills: Beginner to Advanced

This guide takes you from basic skill invocation to advanced workflows and power-user techniques.

---

## Table of Contents

### Beginner
- [Understanding Skill Structure](#understanding-skill-structure)
- [Basic Invocation](#basic-invocation)
- [Providing Good Context](#providing-good-context)
- [Working with Outputs](#working-with-outputs)

### Intermediate
- [Iterating on Outputs](#iterating-on-outputs)
- [Chaining Skills](#chaining-skills)
- [Using Workflow Bundles](#using-workflow-bundles)
- [Customizing Outputs](#customizing-outputs)

### Advanced
- [Building Custom Workflows](#building-custom-workflows)
- [Cross-Referencing Artifacts](#cross-referencing-artifacts)
- [Integrating with Your Process](#integrating-with-your-process)
- [Power User Patterns](#power-user-patterns)

### Reference
- [Skill Quick Reference](#skill-quick-reference)
- [Common Patterns by Role](#common-patterns-by-role)

---

# Beginner

## Understanding Skill Structure

Every skill has three components that work together:

### 1. SKILL.md — The Instructions

This file tells the AI:
- **What** to create (the artifact type)
- **When** to use it (context and triggers)
- **How** to create it (step-by-step process)
- **Quality criteria** (what good looks like)

Example from the `prd` skill:
```markdown
## Instructions

When asked to create a PRD, follow these steps:

1. **Summarize the Problem**
   Start with a brief recap of the problem being solved...

2. **Define Goals and Success Metrics**
   Articulate what success looks like...
```

### 2. TEMPLATE.md — The Structure

This file provides the exact format for the output:
- Section headings
- Required fields
- Formatting conventions

The AI uses this to ensure consistent, complete outputs.

### 3. EXAMPLE.md — The Quality Benchmark

A real-world example showing what good looks like:
- Proper tone and detail level
- How to handle ambiguity
- What completeness looks like

**Key insight:** You don't need to read these files—the AI does. But understanding they exist helps you know what to expect.

---

## Basic Invocation

### The Simplest Way

Just ask for what you need:

```
Create a PRD for a search feature
```

The AI will find and use the `prd` skill automatically (if skills are loaded).

### Explicit Skill Reference

For more control, reference the skill directly:

```
Use the prd skill to create a Product Requirements Document
for adding search to our e-commerce platform
```

### Slash Commands (Claude Code)

The fastest method if you're using Claude Code:

```
/prd search feature for e-commerce platform
```

### What Happens Behind the Scenes

```
Your Request
     │
     ▼
┌─────────────────────────────────────┐
│ AI reads SKILL.md                   │
│ - Understands what to create        │
│ - Follows step-by-step instructions │
└─────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────┐
│ AI reads TEMPLATE.md                │
│ - Applies correct structure         │
│ - Includes all required sections    │
└─────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────┐
│ AI references EXAMPLE.md            │
│ - Calibrates quality level          │
│ - Matches tone and depth            │
└─────────────────────────────────────┘
     │
     ▼
Your Output (structured PM artifact)
```

---

## Providing Good Context

The quality of your output depends heavily on the context you provide. Here's how to give great context:

### The SPICE Framework

Use this checklist to provide complete context:

| Letter | Element | Example |
|--------|---------|---------|
| **S** | Situation | "We're an e-commerce platform with 50k daily users" |
| **P** | Problem | "Users can't find products—search is broken" |
| **I** | Impact | "We're losing $50k/month in missed sales" |
| **C** | Constraints | "Must ship in 6 weeks, can't change database" |
| **E** | Evidence | "User interviews show 70% frustration rate" |

### Bad vs. Good Context

**Bad (vague):**
```
/prd search feature
```

**Better (some context):**
```
/prd search feature for our e-commerce site
```

**Good (SPICE context):**
```
/prd

We need a search feature for our e-commerce platform (50k daily users).

Situation: Currently users can only browse by category
Problem: Users report they can't find specific products
Impact: Support tickets mention "can't find" 200+ times/month
Constraints: Must work with existing Elasticsearch cluster, ship in Q2
Evidence: User interviews show 70% frustration when looking for specific items
```

### Context Prompts

If you don't provide enough context, expect the AI to ask questions like:
- Who are the target users?
- What's the current state?
- What constraints exist?
- How will success be measured?

**Pro tip:** Pre-answer these questions in your initial request to get a complete output faster.

---

## Working with Outputs

### Understanding Output Structure

Every skill produces a structured artifact. Here's what to expect:

| Skill | Primary Output | Key Sections |
|-------|----------------|--------------|
| `problem-statement` | Problem framing doc | User segment, Pain points, Success metrics |
| `prd` | Requirements doc | Problem, Solution, Requirements, Scope |
| `user-stories` | Story set | Stories, Acceptance criteria, Dependencies |
| `hypothesis` | Hypothesis statement | Belief, Metric, Threshold |
| `experiment-design` | Test plan | Hypothesis, Variants, Sample size, Duration |

### Reading Skill Outputs

Outputs follow a consistent pattern:

```markdown
# [Artifact Title]

## Overview / Summary
High-level context for quick scanning

## Core Content
The main substance (requirements, insights, etc.)

## Supporting Details
Dependencies, risks, considerations

## Next Steps / Actions
What to do with this artifact
```

### Validating Output Quality

Each skill includes a quality checklist. Use it:

```markdown
## Quality Checklist (from prd skill)

- [ ] Problem and "why now" are clearly articulated
- [ ] Success metrics are specific and measurable
- [ ] Scope boundaries are explicit (in/out/future)
- [ ] Requirements are testable and unambiguous
- [ ] Technical considerations are surfaced
- [ ] Dependencies and risks are documented
```

**Action:** After receiving output, mentally check these boxes. Ask for revisions if anything is missing.

---

# Intermediate

## Iterating on Outputs

Your first output is rarely perfect. Here's how to refine it:

### Targeted Feedback

Be specific about what to change:

```
The success metrics section is too vague.
Make them more specific with baselines and targets.
```

Instead of:
```
Make it better
```

### Section-by-Section Refinement

Focus on one section at a time:

```
The scope section looks good.
Now expand the technical considerations—we have
specific constraints around our API rate limits.
```

### Adding Missing Context

If the output misses something, add the context:

```
Good start. I should mention we have an existing
recommendation engine. Update the PRD to integrate
with it rather than building new ML models.
```

### Tone and Audience Adjustment

```
This PRD is too technical for the executive audience.
Rewrite the overview section for non-technical stakeholders,
keeping the detailed sections as-is for engineering.
```

### Common Iteration Patterns

| Issue | Iteration Prompt |
|-------|-----------------|
| Too vague | "Make [section] more specific with concrete examples" |
| Too detailed | "Summarize [section] to key points only" |
| Wrong audience | "Rewrite for [audience] at [detail level]" |
| Missing section | "Add a section covering [topic]" |
| Wrong tone | "Make this more [formal/casual/technical/accessible]" |

---

## Chaining Skills

Skills are designed to work together. The output of one becomes input to the next.

### Natural Skill Chains

```
problem-statement → hypothesis → prd → user-stories
     (why)           (belief)   (what)    (how)
```

### How to Chain

**Method 1: Reference Previous Output**

```
Step 1:
/problem-statement "checkout abandonment issue"

[AI produces problem statement]

Step 2:
Based on the problem statement above, use the hypothesis skill
to create a testable hypothesis.

[AI uses context from previous output]
```

**Method 2: Explicit Handoff**

```
Step 1:
/problem-statement "checkout abandonment issue"

[Save or note the output]

Step 2:
/hypothesis

Use this problem statement as context:
[Paste key points from previous output]
```

**Method 3: Single Conversation Chain**

Keep everything in one conversation thread:

```
You: /problem-statement "checkout abandonment"
AI: [produces problem statement]

You: Now create a hypothesis from this
AI: [produces hypothesis using conversation context]

You: Now write a PRD based on the hypothesis
AI: [produces PRD referencing both previous artifacts]
```

### Recommended Chains

| Goal | Chain |
|------|-------|
| Feature development | problem-statement → hypothesis → prd → user-stories |
| Experiment planning | hypothesis → experiment-design → instrumentation-spec |
| Launch preparation | prd → edge-cases → launch-checklist → release-notes |
| Learning cycle | experiment-results → lessons-log → pivot-decision |
| Technical decisions | spike-summary → adr → design-rationale |

### Chain Dependencies

Some skills have natural dependencies:

```
                    ┌─────────────────┐
                    │ problem-statement│
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        ┌──────────┐  ┌──────────┐  ┌──────────────┐
        │hypothesis│  │jtbd-canvas│  │opportunity-tree│
        └────┬─────┘  └──────────┘  └──────────────┘
             │
             ▼
        ┌─────────┐
        │   prd   │
        └────┬────┘
             │
    ┌────────┼────────┐
    ▼        ▼        ▼
┌────────┐ ┌────────┐ ┌────────────┐
│user-   │ │edge-   │ │instrumenta-│
│stories │ │cases   │ │tion-spec   │
└────────┘ └────────┘ └────────────┘
```

---

## Using Workflow Bundles

Bundles are pre-defined skill sequences for common workflows.

### Available Bundles

| Bundle | Use Case | Skills |
|--------|----------|--------|
| Feature Kickoff | Standard feature development | problem-statement → hypothesis → prd → user-stories → launch-checklist |
| Lean Startup | Rapid validation | hypothesis → experiment-design → experiment-results → pivot-decision |
| Triple Diamond | Comprehensive product dev | All 24 skills across 6 phases |

### Invoking a Bundle

**Claude Code:**
```
/kickoff "Save for Later feature for shopping cart"
```

**Other platforms:**
```
Run the Feature Kickoff workflow for adding a
"Save for Later" feature to our shopping cart.
```

### Bundle Execution

The AI will work through each skill in sequence:

```
Starting Feature Kickoff workflow...

Step 1/5: Problem Statement
[Produces problem statement]

Step 2/5: Hypothesis
[Produces hypothesis based on problem statement]

Step 3/5: PRD
[Produces PRD based on hypothesis]

...and so on
```

### Customizing Bundle Execution

**Skip steps you don't need:**
```
Run the Feature Kickoff workflow, but skip the launch checklist—
we have an existing template for that.
```

**Add extra steps:**
```
Run Feature Kickoff, and also include edge-cases
after the user stories.
```

**Stop mid-workflow:**
```
Run Feature Kickoff through the PRD step,
then stop for review before continuing.
```

---

## Customizing Outputs

### Adjusting Detail Level

**More detail:**
```
/prd "search feature"

Make this PRD comprehensive—we need detailed requirements
for a large engineering team and external stakeholders.
```

**Less detail:**
```
/prd "search feature"

Keep this PRD lightweight—it's a small feature and
we need to move fast. Focus on essentials only.
```

### Changing Output Format

**For different audiences:**
```
/prd "search feature"

Format the output for:
1. Executive summary (1 paragraph) at the top
2. Full details below for engineering
```

**For different tools:**
```
/user-stories "from the PRD above"

Format stories for Jira import with these fields:
- Summary (title)
- Description (full story)
- Acceptance Criteria (in Gherkin format)
```

### Adding Custom Sections

```
/prd "search feature"

Add a section called "Competitive Context" that compares
our approach to how competitors handle search.
```

### Using Your Templates

```
/prd "search feature"

Use this custom template structure instead of the default:

# [Feature Name] PRD
## TL;DR
## Problem
## Solution
## Metrics
## Timeline
```

---

# Advanced

## Building Custom Workflows

### Creating Workflow Templates

Define your own skill sequences:

```markdown
# My Discovery Workflow

1. stakeholder-summary (identify who matters)
2. interview-synthesis (understand users)
3. competitive-analysis (understand market)
4. problem-statement (frame the problem)
5. opportunity-tree (map solutions)

Pause for team review, then continue to:

6. hypothesis (what we'll test)
7. solution-brief (proposed approach)
```

### Conditional Workflows

Build decision points into your workflow:

```
Start with problem-statement.

If technical uncertainty is high:
  → Run spike-summary before prd

If UX complexity is high:
  → Run design-rationale before prd

If experiment needed:
  → Add experiment-design after prd

Always end with:
  → launch-checklist before shipping
```

### Parallel Workflows

Some skills can run in parallel:

```
After prd is complete, run in parallel:
- user-stories (for engineering)
- instrumentation-spec (for data team)
- edge-cases (for QA)

Then converge at launch-checklist.
```

### Workflow Automation Prompt

```
I want to run a custom workflow. For each skill:
1. Generate the artifact
2. Show me a summary
3. Ask if I want to revise before continuing
4. Only proceed to next skill after I confirm

Skills in order:
1. problem-statement
2. hypothesis
3. solution-brief
4. prd

Context for all: [your feature context]
```

---

## Cross-Referencing Artifacts

### Building an Artifact Network

As you create artifacts, they should reference each other:

```
PRD:
  "See Problem Statement (link) for detailed user research"
  "Success metrics derived from Hypothesis (link)"

User Stories:
  "Implements PRD requirement R-001"
  "See Edge Cases (link) for error handling"

Launch Checklist:
  "Verify all PRD requirements are met"
  "Confirm instrumentation from Instrumentation Spec (link)"
```

### Maintaining Consistency

When updating one artifact, update related ones:

```
I'm changing the success metric in the hypothesis from
"reduce abandonment by 15%" to "reduce abandonment by 20%".

Please update the following to match:
- The PRD success metrics section
- The experiment design primary metric
- The dashboard requirements KPI definition
```

### Version Control for Artifacts

```
This is version 2 of the PRD.

Changes from v1:
- Added offline mode requirement (stakeholder feedback)
- Removed social sharing (descoped)
- Updated timeline to Q3

Please regenerate user stories reflecting these changes,
marking which stories are new, modified, or removed.
```

---

## Integrating with Your Process

### Mapping Skills to Your Workflow

| Your Process Step | Relevant Skills |
|-------------------|-----------------|
| Discovery kick-off | stakeholder-summary, interview-synthesis |
| Problem review | problem-statement, opportunity-tree |
| Solution design | hypothesis, solution-brief, design-rationale |
| Spec review | prd, adr |
| Sprint planning | user-stories, edge-cases |
| Launch prep | launch-checklist, release-notes |
| Retro | retrospective, lessons-log |

### Integrating with Existing Templates

If you have existing templates, use them:

```
/prd "search feature"

We use a custom PRD template at our company.
Generate content following OUR template structure:

[Paste your company's PRD template]

Fill in each section following the prd skill's guidance
for what content belongs in each section.
```

### Feeding Into Other Tools

**For Jira/Linear:**
```
/user-stories "from PRD above"

Format for bulk import to Jira:
- CSV format
- Columns: Summary, Description, Acceptance Criteria, Story Points, Labels
- Use label "search-feature" for all stories
```

**For Notion/Confluence:**
```
/prd "search feature"

Format with:
- Notion-compatible markdown
- Collapsible sections for details
- Table format for requirements
- Callout blocks for risks
```

**For Slides:**
```
/problem-statement "checkout abandonment"

Also create a 3-slide summary:
1. The Problem (with key stat)
2. The Impact (business case)
3. Success Criteria (metrics)
```

---

## Power User Patterns

### Pattern 1: The Pre-Flight Check

Before starting any skill, gather context:

```
Before I run /prd, help me prepare:

1. What information do you need from me?
2. What questions should I answer upfront?
3. What artifacts should exist before a PRD?

My context: [brief description]
```

### Pattern 2: The Batch Generator

Generate multiple artifacts efficiently:

```
I'm kicking off 3 features this sprint. For each, generate:
1. A brief problem statement (2-3 sentences)
2. A hypothesis (1 sentence)
3. A scope summary (in/out bullets)

Features:
A. Dark mode support
B. Export to PDF
C. Keyboard shortcuts

Format as a comparison table so I can prioritize.
```

### Pattern 3: The Quality Audit

Use skills to review existing work:

```
Here's our existing PRD for the search feature:
[paste PRD]

Using the prd skill's quality checklist, audit this PRD:
1. What sections are missing or incomplete?
2. What doesn't meet the quality bar?
3. What specific improvements would you make?
```

### Pattern 4: The Reverse Engineer

Extract structure from examples:

```
Here's a PRD that our team loved:
[paste excellent PRD]

Analyze what makes it effective and create a custom
template that captures its best qualities, merged with
the standard prd skill template.
```

### Pattern 5: The Stakeholder Variants

Generate audience-specific versions:

```
From this PRD, create three versions:

1. Executive Brief (1 page)
   - Problem/opportunity
   - Investment required
   - Expected return

2. Engineering Spec (detailed)
   - Technical requirements
   - API contracts
   - Performance criteria

3. Design Brief (for designers)
   - User journeys
   - Key screens
   - Interaction patterns
```

### Pattern 6: The Living Document

Keep artifacts updated as you learn:

```
Here's our experiment-results document from last week's A/B test.
The results invalidated our hypothesis.

Please:
1. Update the hypothesis document to reflect learnings
2. Generate a pivot-decision document
3. If we pivot, draft a revised problem-statement
4. Outline what the new PRD scope would look like
```

### Pattern 7: The Skill Combo

Combine skills for richer outputs:

```
Create a combined document that includes:

1. Problem Statement (brief, 1 section)
2. Hypothesis (1 section)
3. Solution Brief (1 section)
4. PRD (full)
5. User Stories (summary table)

All in one document with clear section breaks.
This is our "Feature One-Pager" format.
```

---

# Reference

## Skill Quick Reference

### By Phase

| Phase | Skills | Common Chain |
|-------|--------|--------------|
| **Discover** | interview-synthesis, competitive-analysis, stakeholder-summary | stakeholder → interview → competitive |
| **Define** | problem-statement, hypothesis, opportunity-tree, jtbd-canvas | problem → hypothesis |
| **Develop** | solution-brief, spike-summary, adr, design-rationale | spike → adr → solution |
| **Deliver** | prd, user-stories, edge-cases, launch-checklist, release-notes | prd → stories → edge-cases → launch |
| **Measure** | experiment-design, instrumentation-spec, dashboard-requirements, experiment-results | design → instrument → results |
| **Iterate** | retrospective, lessons-log, refinement-notes, pivot-decision | results → retro → lessons → pivot |

### By Output Type

| Need | Skill | Output |
|------|-------|--------|
| Define the problem | problem-statement | Problem framing document |
| Test an assumption | hypothesis | Testable hypothesis |
| Pitch a solution | solution-brief | One-page solution overview |
| Specify requirements | prd | Product Requirements Document |
| Plan development | user-stories | User stories with acceptance criteria |
| Handle edge cases | edge-cases | Edge case catalog |
| Plan an experiment | experiment-design | A/B test plan |
| Track events | instrumentation-spec | Analytics event specification |
| Prepare for launch | launch-checklist | Cross-functional checklist |
| Communicate changes | release-notes | User-facing release notes |

---

## Common Patterns by Role

### Product Manager

**Daily workflow:**
```
Monday:    /refinement-notes (capture planning outcomes)
Tuesday:   /user-stories (prepare for sprint)
Wednesday: /prd (spec new features)
Thursday:  /experiment-results (review test outcomes)
Friday:    /retrospective (team reflection)
```

**Key chains:**
- Discovery: stakeholder-summary → interview-synthesis → problem-statement
- Delivery: prd → user-stories → launch-checklist

### Engineering Lead

**Key skills:**
- `adr` — Document architecture decisions
- `spike-summary` — Capture exploration findings
- `edge-cases` — Ensure comprehensive coverage
- `instrumentation-spec` — Define tracking requirements

**Common workflow:**
```
/spike-summary "evaluate new database options"
/adr "based on spike findings, recommend PostgreSQL"
/edge-cases "for the migration plan"
```

### Designer

**Key skills:**
- `design-rationale` — Document design decisions
- `jtbd-canvas` — Understand user motivations
- `interview-synthesis` — Process user research

**Common workflow:**
```
/interview-synthesis "from last week's user sessions"
/jtbd-canvas "for the checkout flow"
/design-rationale "for one-page checkout decision"
```

### Data/Analytics

**Key skills:**
- `experiment-design` — Plan rigorous tests
- `instrumentation-spec` — Define event tracking
- `dashboard-requirements` — Specify reporting needs
- `experiment-results` — Document findings

**Common workflow:**
```
/experiment-design "test new pricing page"
/instrumentation-spec "for pricing experiment"
/dashboard-requirements "pricing experiment monitoring"
[after test]
/experiment-results "pricing experiment concluded"
```

---

## Next Steps

### Beginner → Intermediate

- [ ] Use 3 different skills successfully
- [ ] Chain 2 skills together in one conversation
- [ ] Iterate on an output to improve quality
- [ ] Try one workflow bundle

### Intermediate → Advanced

- [ ] Create a custom workflow for your team
- [ ] Generate artifacts for different audiences from one source
- [ ] Integrate skill outputs with your existing tools
- [ ] Use skills to audit/improve existing documents

### Mastery

- [ ] Define team-specific skill chains
- [ ] Create custom templates that merge with skills
- [ ] Build artifact networks with cross-references
- [ ] Teach others to use skills effectively

---

## See Also

- [Getting Started](../getting-started.md) — Installation and setup
- [Categories Reference](../reference/categories.md) — Skill organization
- [Workflow Bundles](../../_bundles/) — Pre-built workflows

---

*Part of [PM-Skills](../../README.md) — Open source Product Management skills for AI agents*
