# PM-Skills v1 Implementation Plan

> Execution plan for Claude Code to build pm-skills from zero to complete v1

**Repository:** `product-on-purpose/pm-skills`  

**Target:** Complete Triple Diamond coverage (~24 skills)  

**Created:** January 2026

---

## How to Use This Plan

### Execution Modes

**Single Issue Mode:**

```
Execute Issue #7 from plan-v1.md
```

**Phase Batch Mode:**

```
Execute all Phase 1 issues from plan-v1.md
```

**Resume Mode:**

```
Continue from Issue #12 in plan-v1.md
```

### Session Management

- Each issue is designed to complete in one session
- Check off completed items in the Progress Tracker
- If interrupted, note the current issue number
- Dependencies are explicit — skip nothing

### File Creation Pattern

For every file created:

1. Create parent directories if needed
2. Write complete file content (no placeholders except in templates)
3. Verify file exists at correct path
4. Validate content meets acceptance criteria

### Quality Standards

- All YAML frontmatter must be valid
- All Markdown must render correctly
- All file paths must be lowercase with hyphens
- All skills must follow `_templates/skill-template/` pattern

---

## Pre-Flight Checklist

Before executing any issues:

- [ ] GitHub repository `product-on-purpose/pm-skills` exists
- [ ] Repository cloned locally
- [ ] Git configured with appropriate user
- [ ] `VISION.md` available for reference
- [ ] This `plan-v1.md` is in `_NOTES/v1-plan/`

---

## Phase 0: Foundation

Foundation creates the repository structure and documentation needed before any skills.

### Issue #1: Repository Bootstrap

**Goal:** Initialize repository with core files and empty directory structure

**Note:** Some files may already exist (README.md, LICENSE, .gitignore). Skip existing files and only create missing ones. Verify existing files meet quality criteria and update if needed.

**Creates (skip if exists):**

```
pm-skills/
├── .gitignore
├── LICENSE
├── README.md
├── CONTRIBUTING.md
├── VISION.md (copy from existing)
├── skills/
│   ├── discover/.gitkeep
│   ├── define/.gitkeep
│   ├── develop/.gitkeep
│   ├── deliver/.gitkeep
│   ├── measure/.gitkeep
│   └── iterate/.gitkeep
├── _bundles/.gitkeep
├── _docs/.gitkeep
├── _templates/.gitkeep
├── commands/.gitkeep
└── releases/.gitkeep
```

**Content Guidance:**

`.gitignore`:

```
.DS_Store
*.log
node_modules/
.env
*.zip
```

`LICENSE`: Apache 2.0 full text

`README.md`: 

- Project title and one-line description
- Badge placeholders (license, version)
- "Work in Progress" notice
- Link to VISION.md
- Basic installation section (placeholder)
- Link to CONTRIBUTING.md

`CONTRIBUTING.md`:

- How to request a skill (issue template description)
- Quality criteria from VISION.md
- PR process overview
- Code of conduct statement

**Acceptance Criteria:**

- [ ] All directories exist with .gitkeep files
- [ ] LICENSE contains Apache 2.0 text
- [ ] README.md has project description
- [ ] CONTRIBUTING.md has quality criteria
- [ ] .gitignore includes common patterns

**Dependencies:** None

---

### Issue #2: Schema Documentation

**Goal:** Document the frontmatter schema for all skills

**Creates:**

- `_docs/frontmatter-schema.yaml`

**Content Guidance:**

```yaml
# PM-Skills Frontmatter Schema
# Version: 1.0.0
# 
# All skills must include valid frontmatter following this schema.
# Required fields are mandated by agentskills.io specification.
# Custom fields are pm-skills extensions.

schema:
  required:
    name:
      type: string
      pattern: "^[a-z0-9]+(-[a-z0-9]+)*$"
      minLength: 1
      maxLength: 64
      description: |
        Skill identifier. Must be lowercase, use hyphens for spaces,
        no consecutive hyphens. Must match directory name exactly.
      examples:
        - problem-statement
        - prd
        - user-stories

    description:
      type: string
      minLength: 1
      maxLength: 1024
      description: |
        What the skill does and when to use it. Include trigger keywords
        that help AI agents discover this skill. Write for both humans
        and machines.
      examples:
        - "Creates a clear problem framing document with user impact, business context, and success criteria. Use when starting a new initiative, realigning a drifted project, or communicating up to leadership."

  optional:
    license:
      type: string
      default: "Apache-2.0"
      description: SPDX license identifier
      examples:
        - Apache-2.0
        - MIT

    metadata:
      type: object
      properties:
        category:
          type: string
          enum:
            - research
            - problem-framing
            - ideation
            - specification
            - validation
            - reflection
            - coordination
          description: Framework-agnostic PM activity type

        frameworks:
          type: array
          items:
            type: string
          description: Which PM methodologies use this skill
          examples:
            - [triple-diamond, lean-startup, design-thinking]

        author:
          type: string
          description: Skill creator or maintainer
          examples:
            - product-on-purpose

        version:
          type: string
          pattern: "^\\d+\\.\\d+\\.\\d+$"
          description: Semantic version
          examples:
            - "1.0.0"

# Example valid frontmatter:
#
# ---
# name: problem-statement
# description: Creates a clear problem framing document...
# license: Apache-2.0
# metadata:
#   category: problem-framing
#   frameworks: [triple-diamond, lean-startup, design-thinking]
#   author: product-on-purpose
#   version: "1.0.0"
# ---
```

**Acceptance Criteria:**

- [ ] File exists at `_docs/frontmatter-schema.yaml`
- [ ] All required fields documented with types and constraints
- [ ] All optional fields documented
- [ ] Examples provided for each field
- [ ] Valid YAML syntax

**Dependencies:** #1

---

### Issue #3: Category Reference

**Goal:** Document the category taxonomy

**Creates:**

- `_docs/categories.md`

**Content Guidance:**

```markdown
# Category Taxonomy

Categories represent framework-agnostic PM activities. They enable skills 
to be mapped to any methodology through bundles.

## Categories

### research
**Description:** Understanding users, market, and context  
**Activities:** User interviews, market analysis, stakeholder mapping  
**Skills:** interview-synthesis, competitive-analysis, stakeholder-summary

### problem-framing
**Description:** Defining what problem to solve  
**Activities:** Problem definition, opportunity identification, scoping  
**Skills:** problem-statement, opportunity-tree, jtbd-canvas

### ideation
**Description:** Generating and evaluating solutions  
**Activities:** Solution exploration, hypothesis formation, concept development  
**Skills:** hypothesis, solution-brief

### specification
**Description:** Detailing what to build  
**Activities:** Requirements writing, technical decisions, edge case analysis  
**Skills:** prd, user-stories, edge-cases, adr, design-rationale

### validation
**Description:** Testing assumptions with data  
**Activities:** Experiment design, instrumentation, measurement  
**Skills:** experiment-design, instrumentation-spec, dashboard-requirements

### reflection
**Description:** Learning and improving  
**Activities:** Retrospectives, outcome analysis, knowledge capture  
**Skills:** experiment-results, retrospective, lessons-log, pivot-decision

### coordination
**Description:** Aligning teams and stakeholders  
**Activities:** Launch preparation, release communication, exploration synthesis  
**Skills:** launch-checklist, release-notes, spike-summary, refinement-notes

## Framework Mapping

| Category | Triple Diamond | Lean Startup | Design Thinking |
|----------|---------------|--------------|-----------------|
| research | Discover | Customer Dev | Empathize |
| problem-framing | Define | — | Define |
| ideation | Define/Develop | Build | Ideate |
| specification | Deliver | Build | Prototype |
| validation | Measure | Measure | Test |
| reflection | Iterate | Learn | — |
| coordination | All phases | All phases | All phases |
```

**Acceptance Criteria:**

- [ ] File exists at `_docs/categories.md`
- [ ] All 7 categories documented
- [ ] Each category has description, activities, and skills
- [ ] Framework mapping table included

**Dependencies:** #1

---

### Issue #4: Skill Template Structure

**Goal:** Create the reference template for all skills

**Creates:**

- `_templates/skill-template/SKILL.md`
- `_templates/skill-template/references/TEMPLATE.md`
- `_templates/skill-template/references/EXAMPLE.md`

**Content Guidance:** Use the exact content from the `_templates/` section at the end of this plan.

**Acceptance Criteria:**

- [ ] All three template files exist
- [ ] SKILL.md has valid placeholder frontmatter
- [ ] TEMPLATE.md has artifact structure pattern
- [ ] EXAMPLE.md has placeholder pattern
- [ ] Directory structure matches skill convention

**Dependencies:** #2

---

### Issue #5: VISION.md Integration

**Goal:** Ensure VISION.md is properly placed and any needed updates applied

**Creates/Updates:**

- Verify `VISION.md` exists in `_NOTES/VISION.md`
- Update if any schema or structure decisions have changed

**Acceptance Criteria:**

- [ ] VISION.md exists at `_NOTES/VISION.md`
- [ ] Schema section matches `_docs/frontmatter-schema.yaml`
- [ ] Category section matches `_docs/categories.md`
- [ ] Repository structure section is accurate

**Dependencies:** #2, #3

---

## Phase 1: P0 Core Skills

These 5 skills are essential for basic PM workflows. Each gets detailed content guidance.

### Issue #10: Skill — problem-statement
> GitHub: https://github.com/product-on-purpose/pm-skills/issues/10

**Goal:** Create the problem-statement skill

**Creates:**

- `skills/define/problem-statement/SKILL.md`
- `skills/define/problem-statement/references/TEMPLATE.md`
- `skills/define/problem-statement/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: problem-statement
description: Creates a clear problem framing document with user impact, business context, and success criteria. Use when starting a new initiative, realigning a drifted project, or communicating up to leadership.
license: Apache-2.0
metadata:
  category: problem-framing
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: Starting initiatives, realigning projects, leadership communication
- Instructions should gather: User segment, pain points, business context, success metrics
- Output structure: Problem summary, user impact, business context, success criteria, constraints, open questions
- Quality notes: Good problem statements are specific (not vague), measurable (has metrics), and actionable (points toward solutions without prescribing them)

**TEMPLATE.md Sections:**

- Problem Summary (2-3 sentences)
- User Impact (who, how, scale)
- Business Context (strategic alignment, business impact, why now)
- Success Criteria (metrics table with baseline, target, timeline)
- Constraints & Considerations
- Open Questions

**EXAMPLE.md Scenario:**

- Context: E-commerce company, checkout abandonment problem
- User segment: Mobile shoppers
- Business impact: Revenue loss from cart abandonment
- Success metric: Reduce abandonment rate from 73% to 60%

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] SKILL.md has clear instructions with numbered steps
- [ ] TEMPLATE.md has all sections with guidance comments
- [ ] EXAMPLE.md is realistic and complete (no placeholders)

**Dependencies:** #4

---

### Issue #11: Skill — hypothesis
> GitHub: https://github.com/product-on-purpose/pm-skills/issues/11

**Goal:** Create the hypothesis skill

**Creates:**

- `skills/define/hypothesis/SKILL.md`
- `skills/define/hypothesis/references/TEMPLATE.md`
- `skills/define/hypothesis/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: hypothesis
description: Defines a testable hypothesis with clear success metrics and validation approach. Use when forming assumptions to test, designing experiments, or aligning team on what success looks like.
license: Apache-2.0
metadata:
  category: ideation
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: After problem framing, before solution design, when assumptions need testing
- Instructions should capture: Belief statement, target user, expected outcome, success metric, validation method, timeframe
- Format: "We believe [action] for [user] will [outcome] as measured by [metric]"
- Quality notes: Good hypotheses are falsifiable, specific, and have clear pass/fail criteria

**TEMPLATE.md Sections:**

- Hypothesis Statement (structured format)
- Background & Rationale
- Target User Segment
- Success Metrics (primary and secondary)
- Validation Approach
- Risks & Assumptions
- Timeline

**EXAMPLE.md Scenario:**

- Context: SaaS product, user onboarding completion problem
- Hypothesis: Simplified 3-step onboarding will increase completion
- Metric: Onboarding completion rate from 34% to 50%
- Validation: A/B test over 2 weeks

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] Hypothesis format is clearly explained
- [ ] EXAMPLE.md shows falsifiable hypothesis with metrics

**Dependencies:** #4

---

### Issue #12: Skill — prd
> GitHub: https://github.com/product-on-purpose/pm-skills/issues/12

**Goal:** Create the prd (Product Requirements Document) skill

**Creates:**

- `skills/deliver/prd/SKILL.md`
- `skills/deliver/prd/references/TEMPLATE.md`
- `skills/deliver/prd/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: prd
description: Creates a comprehensive Product Requirements Document that aligns stakeholders on what to build, why, and how success will be measured. Use when specifying features, epics, or product initiatives for engineering handoff.
license: Apache-2.0
metadata:
  category: specification
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: After problem/solution alignment, before engineering work begins
- Instructions should capture: Problem recap, solution overview, user stories summary, scope (in/out), success metrics, technical considerations, dependencies, timeline, risks
- Quality notes: Good PRDs are complete enough to build from but concise enough to read. They answer "what" and "why" clearly, leave "how" to engineering where appropriate.

**TEMPLATE.md Sections:**

- Overview (problem, solution, target users)
- Goals & Success Metrics
- User Stories (summary, link to detailed)
- Scope (in scope, out of scope, future considerations)
- Solution Design (functional requirements, UX notes)
- Technical Considerations
- Dependencies & Risks
- Timeline & Milestones
- Open Questions
- Appendix (links to research, designs, etc.)

**EXAMPLE.md Scenario:**

- Context: Project management tool, adding recurring tasks feature
- Problem: Users manually recreate repetitive tasks
- Solution: Recurring task scheduling with flexible patterns
- Scope: Weekly/monthly patterns in v1, custom patterns in v2

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] SKILL.md covers all major PRD sections
- [ ] TEMPLATE.md is comprehensive but not overwhelming
- [ ] EXAMPLE.md demonstrates a realistic feature PRD

**Dependencies:** #4

---

### Issue #13: Skill — user-stories
> GitHub: https://github.com/product-on-purpose/pm-skills/issues/13

**Goal:** Create the user-stories skill

**Creates:**

- `skills/deliver/user-stories/SKILL.md`
- `skills/deliver/user-stories/references/TEMPLATE.md`
- `skills/deliver/user-stories/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: user-stories
description: Generates user stories with clear acceptance criteria from product requirements or feature descriptions. Use when breaking down features for sprint planning, writing tickets, or communicating requirements to engineering.
license: Apache-2.0
metadata:
  category: specification
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: After PRD approval, during sprint planning, when creating tickets
- Instructions: Take feature/requirement as input, identify user personas, break into stories, write acceptance criteria for each
- Format: "As a [persona], I want [action] so that [benefit]"
- Quality notes: Good stories are independent, negotiable, valuable, estimable, small, testable (INVEST criteria)

**TEMPLATE.md Sections:**

- Story Header (ID, title, persona)
- User Story Statement
- Context & Background
- Acceptance Criteria (Given/When/Then format)
- Design Notes (if applicable)
- Technical Notes (if applicable)
- Dependencies
- Story Points / Estimate (placeholder)

**EXAMPLE.md Scenario:**

- Context: Recurring tasks feature (from PRD example)
- Stories: Create recurring task, edit recurrence pattern, view upcoming instances, pause/resume recurrence
- Show 3-4 complete stories with acceptance criteria

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] SKILL.md explains story format and INVEST criteria
- [ ] TEMPLATE.md uses Given/When/Then for acceptance criteria
- [ ] EXAMPLE.md has 3+ complete stories

**Dependencies:** #4

---

### Issue #14: Skill — launch-checklist
> GitHub: https://github.com/product-on-purpose/pm-skills/issues/14

**Goal:** Create the launch-checklist skill

**Creates:**

- `skills/deliver/launch-checklist/SKILL.md`
- `skills/deliver/launch-checklist/references/TEMPLATE.md`
- `skills/deliver/launch-checklist/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: launch-checklist
description: Creates a comprehensive pre-launch checklist covering engineering, design, marketing, support, legal, and operations readiness. Use before releasing features, products, or major updates to ensure nothing is missed.
license: Apache-2.0
metadata:
  category: coordination
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: 1-2 weeks before launch, during launch planning
- Instructions: Gather launch context, generate checklist across all functions, identify owners and dates, flag blockers
- Categories: Engineering, QA, Design, Marketing, Support, Legal, Operations, Analytics
- Quality notes: Good checklists are specific to the launch (not generic), have clear owners, and distinguish blockers from nice-to-haves

**TEMPLATE.md Sections:**

- Launch Overview (what, when, who)
- Engineering Readiness
- QA & Testing
- Design & UX
- Marketing & Communications
- Customer Support
- Legal & Compliance
- Operations & Infrastructure
- Analytics & Monitoring
- Go/No-Go Criteria
- Rollback Plan

**EXAMPLE.md Scenario:**

- Context: Mobile app major version release
- Launch date: 2 weeks out
- Show realistic checklist with mix of complete/incomplete items

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] SKILL.md covers all launch categories
- [ ] TEMPLATE.md has checkbox format for items
- [ ] EXAMPLE.md shows realistic launch scenario

**Dependencies:** #4

---

## Phase 2: P1 Skills

These 8 skills significantly enhance PM productivity. Standard specifications — follow the pattern established in Phase 1.

### Skill — interview-synthesis
> GitHub Issue: *To be created*

**Goal:** Create the interview-synthesis skill

**Creates:**

- `skills/discover/interview-synthesis/SKILL.md`
- `skills/discover/interview-synthesis/references/TEMPLATE.md`
- `skills/discover/interview-synthesis/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: interview-synthesis
description: Synthesizes user research interviews into actionable insights, patterns, and recommendations. Use after conducting user interviews, customer calls, or usability sessions to extract and communicate findings.
license: Apache-2.0
metadata:
  category: research
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: After completing user interviews, customer calls, or usability sessions
- Instructions: Import notes, identify recurring themes, extract meaningful quotes, synthesize into insights, formulate recommendations
- Input requirements: Interview notes, transcripts, or recording summaries from 3+ participants
- Quality notes: Good synthesis identifies patterns (not just lists findings), distinguishes opinions from behaviors, and connects insights to actionable recommendations

**TEMPLATE.md Sections:**

- Research Overview (objective, methodology, timeline)
- Participant Summary (table: ID, role, segment, date)
- Key Themes (3-5 themes with supporting evidence)
- Notable Quotes (verbatim quotes with attribution)
- Insights (what we learned, implications)
- Recommendations (prioritized action items)
- Appendix: Raw Notes

**EXAMPLE.md Scenario:**

- Context: B2B SaaS company, 5 customer interviews about onboarding experience
- Participants: Mix of new users (< 30 days) and churned users
- Key finding: Users struggle with initial setup due to lack of guided workflow
- Recommendation: Implement interactive onboarding wizard

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] Shows how to identify patterns across multiple interviews
- [ ] EXAMPLE.md synthesizes realistic interview data

**Dependencies:** #4

---

### Skill — solution-brief
> GitHub Issue: *To be created*

**Goal:** Create the solution-brief skill

**Creates:**

- `skills/develop/solution-brief/SKILL.md`
- `skills/develop/solution-brief/references/TEMPLATE.md`
- `skills/develop/solution-brief/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: solution-brief
description: Creates a concise one-page solution overview that communicates the proposed approach, key decisions, and trade-offs. Use when pitching solutions to stakeholders, aligning teams on approach, or documenting solution intent before detailed specification.
license: Apache-2.0
metadata:
  category: ideation
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: Pitching solutions to stakeholders, aligning teams on approach, before detailed specification
- Instructions: Summarize problem, describe solution approach, list key features, define success metrics, acknowledge trade-offs
- Length constraint: Strictly one page — forces clarity and prioritization
- Quality notes: Solution briefs are persuasive but honest about trade-offs; avoid jargon

**TEMPLATE.md Sections:**

- Problem Recap (2-3 sentences max)
- Proposed Solution (what we'll build)
- Key Features (3-5 bullet points)
- Success Metrics (how we'll measure success)
- Trade-offs Considered (what we're NOT doing and why)
- Risks & Mitigations
- Next Steps (immediate actions)

**EXAMPLE.md Scenario:**

- Context: E-commerce company, checkout abandonment at 73%
- Solution: Streamlined one-page checkout with guest option
- Key feature: Progress indicator, saved payment methods, express checkout
- Trade-off: Removing upsell step to reduce friction

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] Emphasizes brevity and clarity
- [ ] EXAMPLE.md fits on one page

**Dependencies:** #4

---

### Skill — spike-summary
> GitHub Issue: *To be created*

**Goal:** Create the spike-summary skill

**Creates:**

- `skills/develop/spike-summary/SKILL.md`
- `skills/develop/spike-summary/references/TEMPLATE.md`
- `skills/develop/spike-summary/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: spike-summary
description: Documents the results of a time-boxed technical or design exploration (spike). Use after completing a spike to capture learnings, findings, and recommendations for the team.
license: Apache-2.0
metadata:
  category: coordination
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: After completing a time-boxed exploration, before committing to implementation
- Instructions: Document the question, approach taken, findings, and clear recommendation
- Time-box emphasis: Spikes have defined end dates; summary captures learnings before moving on
- Quality notes: Answer the original question directly; be explicit about what was NOT explored

**TEMPLATE.md Sections:**

- Spike Overview (goal, question to answer, time-box)
- Approach (what was tried, technologies explored)
- Findings (what we learned, with evidence)
- Recommendation (clear go/no-go with rationale)
- Code/Artifacts (links to POC, diagrams, etc.)
- Open Questions (what we still don't know)
- Follow-up Items (next steps if proceeding)

**EXAMPLE.md Scenario:**

- Context: Evaluating Stripe vs. Adyen for payment processing
- Time-box: 3-day spike
- Finding: Stripe has better API docs but Adyen has lower fees at scale
- Recommendation: Use Stripe for MVP, plan migration path to Adyen

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] Clear structure for documenting exploration results
- [ ] EXAMPLE.md shows technical spike with clear recommendation

**Dependencies:** #4

---

### Skill — adr
> GitHub Issue: *To be created*

**Goal:** Create the adr (Architecture Decision Record) skill

**Creates:**

- `skills/develop/adr/SKILL.md`
- `skills/develop/adr/references/TEMPLATE.md`
- `skills/develop/adr/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: adr
description: Creates an Architecture Decision Record following the Nygard format to document significant technical decisions, their context, and consequences. Use when making technical choices that affect system architecture, technology selection, or development patterns.
license: Apache-2.0
metadata:
  category: specification
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: Making significant technical decisions that affect architecture, technology selection, or patterns
- Instructions: Capture context, document options considered, record the decision and rationale
- Follow Michael Nygard's ADR format exactly
- Quality notes: ADRs capture the "why" for future readers who will inherit the codebase

**TEMPLATE.md Sections:**

- Title (ADR-NNN: Decision Title)
- Status (Proposed | Accepted | Deprecated | Superseded by ADR-XXX)
- Context (what is the issue, what forces are at play)
- Decision (what we decided to do)
- Consequences (positive, negative, and neutral outcomes)

**EXAMPLE.md Scenario:**

- Context: New order processing service needs a database
- Options: PostgreSQL vs. MongoDB vs. DynamoDB
- Decision: PostgreSQL for ACID compliance and team expertise
- Consequence: Need to manage schema migrations, but gain strong consistency

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] Follows Nygard ADR format exactly
- [ ] EXAMPLE.md shows realistic architectural decision

**Dependencies:** #4

---

### Skill — edge-cases
> GitHub Issue: *To be created*

**Goal:** Create the edge-cases skill

**Creates:**

- `skills/deliver/edge-cases/SKILL.md`
- `skills/deliver/edge-cases/references/TEMPLATE.md`
- `skills/deliver/edge-cases/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: edge-cases
description: Documents edge cases, error states, boundary conditions, and recovery paths for a feature. Use during specification to ensure comprehensive coverage, or during QA planning to identify test scenarios.
license: Apache-2.0
metadata:
  category: specification
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: During specification to ensure coverage, during QA planning to identify test scenarios
- Instructions: Systematically walk through each category, document scenario/behavior/priority for each
- Categories to cover: Input validation, boundary conditions, error states, concurrency, permissions, integration failures, recovery paths
- Quality notes: Think through edge cases early to prevent bugs and improve UX

**TEMPLATE.md Sections:**

- Feature Overview (what feature this covers)
- Edge Case Categories (organized by type)
- Edge Case Table (Scenario | Expected Behavior | Priority | Notes)
- Error Messages (user-facing copy for each error state)
- Recovery Paths (how users recover from each error)
- Test Scenarios (QA checklist derived from edge cases)

**EXAMPLE.md Scenario:**

- Context: File upload feature for document management system
- Input validation: Empty file, wrong format, file too large (>100MB)
- Boundary: Exactly 100MB file, filename with special characters
- Concurrency: Same file uploaded twice simultaneously
- Recovery: Clear error message with suggested action

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] Covers multiple categories of edge cases
- [ ] EXAMPLE.md has 10+ realistic edge cases

**Dependencies:** #4

---

### Skill — release-notes
> GitHub Issue: *To be created*

**Goal:** Create the release-notes skill

**Creates:**

- `skills/deliver/release-notes/SKILL.md`
- `skills/deliver/release-notes/references/TEMPLATE.md`
- `skills/deliver/release-notes/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: release-notes
description: Creates user-facing release notes that communicate new features, improvements, and fixes in clear, benefit-focused language. Use when shipping updates to communicate changes to users, customers, or stakeholders.
license: Apache-2.0
metadata:
  category: coordination
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: Shipping product updates, communicating changes to users/customers/stakeholders
- Instructions: Gather changelog, translate technical changes to user benefits, prioritize by impact
- Audience: End users (not developers) — write for the person using the product
- Quality notes: Lead with user benefit, not technical implementation; be concise

**TEMPLATE.md Sections:**

- Version & Date
- Highlights (1-3 most important changes)
- New Features (with benefit-focused descriptions)
- Improvements (enhancements to existing features)
- Bug Fixes (user-facing issues resolved)
- Known Issues (transparency about limitations)
- Coming Soon (optional teaser)

**EXAMPLE.md Scenario:**

- Context: Monthly product update for project management tool
- Highlight: New Gantt chart view for visual project planning
- New feature: Export to PDF, dark mode support
- Improvement: 40% faster page load times
- Fix: Calendar sync now works with Outlook 365

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] Emphasizes user-focused language
- [ ] EXAMPLE.md reads like polished release notes

**Dependencies:** #4

---

### Skill — experiment-design
> GitHub Issue: *To be created*

**Goal:** Create the experiment-design skill

**Creates:**

- `skills/measure/experiment-design/SKILL.md`
- `skills/measure/experiment-design/references/TEMPLATE.md`
- `skills/measure/experiment-design/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: experiment-design
description: Designs an A/B test or experiment with clear hypothesis, variants, success metrics, sample size, and duration. Use when planning experiments to validate product changes or test hypotheses.
license: Apache-2.0
metadata:
  category: validation
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: Planning A/B tests, validating product changes, testing hypotheses with data
- Instructions: Define hypothesis, design variants, calculate sample size, set duration, define success criteria
- Statistical rigor: Include sample size calculation and expected effect size
- Quality notes: One clear hypothesis per experiment; ensure sufficient statistical power

**TEMPLATE.md Sections:**

- Experiment Overview (name, owner, dates)
- Hypothesis (structured: We believe X will cause Y)
- Variants (control description, treatment description)
- Primary Metric (what we're measuring, current baseline)
- Secondary Metrics (guardrail metrics to monitor)
- Sample Size & Duration (calculation, traffic allocation)
- Audience Targeting (who sees this experiment)
- Success Criteria (what constitutes a win)
- Risks & Mitigations

**EXAMPLE.md Scenario:**

- Context: E-commerce checkout optimization
- Hypothesis: One-page checkout will increase conversion by 5%
- Control: Current 3-step checkout
- Treatment: Single-page checkout with accordion sections
- Sample size: 10,000 users per variant over 2 weeks

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] Includes sample size and duration considerations
- [ ] EXAMPLE.md shows complete experiment plan

**Dependencies:** #4

---

### Skill — instrumentation-spec
> GitHub Issue: *To be created*

**Goal:** Create the instrumentation-spec skill

**Creates:**

- `skills/measure/instrumentation-spec/SKILL.md`
- `skills/measure/instrumentation-spec/references/TEMPLATE.md`
- `skills/measure/instrumentation-spec/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: instrumentation-spec
description: Specifies event tracking and analytics instrumentation requirements for a feature. Use when defining what data to collect, ensuring consistent tracking implementation, or documenting analytics requirements for engineering.
license: Apache-2.0
metadata:
  category: validation
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: Defining analytics requirements, ensuring consistent tracking, documenting for engineering
- Instructions: List all events, define triggers and properties, specify data types, note PII considerations
- Naming conventions: Use consistent snake_case or camelCase across all events
- Quality notes: Clear property definitions, consider PII/GDPR, think about future analysis needs

**TEMPLATE.md Sections:**

- Overview (feature being instrumented, analytics goals)
- Event Inventory Table (Event Name | Trigger | Properties)
- Property Definitions (name, type, description, example values)
- User Properties (persistent user-level data)
- Implementation Notes (SDK, platform considerations)
- PII & Privacy Considerations
- Testing Checklist

**EXAMPLE.md Scenario:**

- Context: New user onboarding flow (5 steps)
- Events: onboarding_started, step_completed, onboarding_completed, onboarding_abandoned
- Properties: step_number, step_name, time_on_step, completion_method
- PII note: Email captured but hashed before sending to analytics

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] Event table format is clear and complete
- [ ] EXAMPLE.md shows realistic tracking spec

**Dependencies:** #4

---

## Phase 3: P2 Skills + Infrastructure

Complete coverage skills plus bundles, commands, and automation.

### Skill — competitive-analysis
> GitHub Issue: *To be created*

**Goal:** Create the competitive-analysis skill

**Creates:**

- `skills/discover/competitive-analysis/SKILL.md`
- `skills/discover/competitive-analysis/references/TEMPLATE.md`
- `skills/discover/competitive-analysis/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: competitive-analysis
description: Creates a structured competitive analysis comparing features, positioning, and strategy across competitors. Use when entering a market, planning differentiation, or understanding the competitive landscape.
license: Apache-2.0
metadata:
  category: research
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: Entering a new market, planning differentiation, understanding competitive landscape
- Instructions: Identify competitors, analyze features/pricing/positioning, synthesize into actionable insights
- Depth: 3-5 key competitors, not exhaustive market scan
- Quality notes: Focus on actionable insights, not just data collection; identify gaps and opportunities

**TEMPLATE.md Sections:**

- Market Overview (size, trends, key players)
- Competitor Profiles (company, product, target market, pricing)
- Feature Comparison Matrix (feature vs. competitor grid)
- Positioning Map (2x2 matrix visualization)
- SWOT by Competitor (strengths, weaknesses, opportunities, threats)
- Competitive Gaps (where we can differentiate)
- Recommendations (strategic implications)

**EXAMPLE.md Scenario:**

- Context: Launching new project management tool
- Competitors: Asana, Monday.com, ClickUp, Notion
- Key insight: All competitors weak on reporting/analytics
- Opportunity: Position as "PM tool for data-driven teams"

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] Includes comparison matrix format
- [ ] EXAMPLE.md shows realistic competitive analysis

**Dependencies:** #4

---

### Skill — stakeholder-summary
> GitHub Issue: *To be created*

**Goal:** Create the stakeholder-summary skill

**Creates:**

- `skills/discover/stakeholder-summary/SKILL.md`
- `skills/discover/stakeholder-summary/references/TEMPLATE.md`
- `skills/discover/stakeholder-summary/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: stakeholder-summary
description: Documents stakeholder needs, concerns, and influence for a project or initiative. Use when starting projects, managing complex stakeholder relationships, or ensuring alignment across organizational boundaries.
license: Apache-2.0
metadata:
  category: research
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: Starting projects, managing complex relationships, ensuring cross-org alignment
- Instructions: Identify stakeholders, assess influence/interest, document needs/concerns, plan communication
- Power/Interest grid: Map stakeholders by influence level and interest level
- Quality notes: Focus on understanding motivations; anticipate objections; plan proactive communication

**TEMPLATE.md Sections:**

- Project Context (what this stakeholder analysis is for)
- Stakeholder Map (visual: power/interest grid)
- Stakeholder Profiles Table (Name | Role | Needs | Concerns | Influence | Interest)
- Key Relationships (dependencies, conflicts, alliances)
- Communication Plan (who, frequency, channel, owner)
- Alignment Status (aligned, neutral, resistant)
- Risk Mitigation (how to address resistant stakeholders)

**EXAMPLE.md Scenario:**

- Context: Enterprise platform migration affecting 5 departments
- Key stakeholders: CTO (sponsor), VP Engineering (implementer), Finance (budget holder)
- Concern: Finance worried about hidden costs
- Strategy: Weekly cost updates, involve Finance in vendor negotiations

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] Includes stakeholder mapping format
- [ ] EXAMPLE.md shows realistic stakeholder complexity

**Dependencies:** #4

---

### Skill — opportunity-tree
> GitHub Issue: *To be created*

**Goal:** Create the opportunity-tree skill

**Creates:**

- `skills/define/opportunity-tree/SKILL.md`
- `skills/define/opportunity-tree/references/TEMPLATE.md`
- `skills/define/opportunity-tree/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: opportunity-tree
description: Creates an opportunity solution tree mapping desired outcomes to opportunities and potential solutions. Use for outcome-driven product discovery, prioritization, or communicating product strategy.
license: Apache-2.0
metadata:
  category: problem-framing
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: Outcome-driven product discovery, prioritization, communicating product strategy
- Instructions: Start with desired outcome, identify opportunities, brainstorm solutions, define experiments
- Framework: Based on Teresa Torres' Opportunity Solution Tree
- Quality notes: Multiple opportunities per outcome, multiple solutions per opportunity; don't jump to solutions

**TEMPLATE.md Sections:**

- Desired Outcome (measurable business/user outcome)
- Opportunity Branches (2-4 opportunity areas, each with evidence)
- Solution Ideas (2-3 solutions per opportunity)
- Assumption Tests (experiments to validate riskiest assumptions)
- Prioritization (which opportunity/solution to pursue first)
- Visual Tree (ASCII or linked diagram)

**EXAMPLE.md Scenario:**

- Outcome: Increase 30-day retention from 40% to 55%
- Opportunities: Improve onboarding, increase feature discovery, reduce friction points
- Solution for onboarding: Interactive tutorial, personalized setup, progress gamification
- Experiment: A/B test interactive tutorial vs. video walkthrough

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] Follows Teresa Torres framework
- [ ] EXAMPLE.md shows multi-level tree structure

**Dependencies:** #4

---

### Skill — jtbd-canvas
> GitHub Issue: *To be created*

**Goal:** Create the jtbd-canvas skill

**Creates:**

- `skills/define/jtbd-canvas/SKILL.md`
- `skills/define/jtbd-canvas/references/TEMPLATE.md`
- `skills/define/jtbd-canvas/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: jtbd-canvas
description: Creates a Jobs to be Done canvas capturing the functional, emotional, and social dimensions of a customer job. Use when deeply understanding customer motivations, designing for jobs, or reframing product positioning.
license: Apache-2.0
metadata:
  category: problem-framing
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: Understanding customer motivations, designing for jobs, reframing product positioning
- Instructions: Interview customers about circumstances, identify functional/emotional/social dimensions
- Framework: Based on Clayton Christensen's Jobs to be Done theory
- Quality notes: Focus on the "job" not the product; understand what customers are "hiring" your product to do

**TEMPLATE.md Sections:**

- Job Statement ("When [situation], I want to [motivation], so I can [outcome]")
- Job Performer (who is doing this job)
- Circumstances (when/where does this job arise)
- Functional Job (practical task to accomplish)
- Emotional Job (how they want to feel)
- Social Job (how they want to be perceived)
- Hiring Criteria (what makes them choose a solution)
- Competing Solutions (what they currently "hire" for this job)

**EXAMPLE.md Scenario:**

- Context: Meal planning app for busy parents
- Job: "When I'm exhausted after work, I want to quickly decide what's for dinner, so I can feed my family without stress"
- Functional: Get dinner on table in <30 mins with ingredients on hand
- Emotional: Feel like a good parent, reduce decision fatigue
- Competing: Takeout, meal kits, asking spouse

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] Follows JTBD framework correctly
- [ ] EXAMPLE.md shows all job dimensions

**Dependencies:** #4

---

### Skill — design-rationale
> GitHub Issue: *To be created*

**Goal:** Create the design-rationale skill

**Creates:**

- `skills/develop/design-rationale/SKILL.md`
- `skills/develop/design-rationale/references/TEMPLATE.md`
- `skills/develop/design-rationale/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: design-rationale
description: Documents the reasoning behind design decisions including alternatives considered, trade-offs evaluated, and principles applied. Use when making significant UX decisions, aligning with stakeholders on design direction, or preserving design context for future reference.
license: Apache-2.0
metadata:
  category: specification
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: Making significant UX decisions, aligning stakeholders on design direction, preserving context
- Instructions: Document the decision, context, alternatives considered, and rationale
- Audience: Future designers/PMs who inherit the product
- Quality notes: Capture the "why" — future readers will see WHAT you built but not WHY

**TEMPLATE.md Sections:**

- Decision Summary (what was decided, one sentence)
- Context (what prompted this decision, constraints)
- Options Considered (2-4 alternatives with pros/cons)
- Evaluation Criteria (how options were assessed)
- Decision Rationale (why this option was chosen)
- Trade-offs Accepted (what we gave up)
- Follow-up Considerations (future implications)

**EXAMPLE.md Scenario:**

- Context: Redesigning navigation for mobile app with 50+ features
- Options: Bottom tab bar, hamburger menu, floating action button
- Decision: Bottom tab bar with 5 primary actions + "More" overflow
- Trade-off: Less discoverable secondary features, but faster access to core actions
- Rationale: User research showed 80% of sessions use only 5 features

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] Shows alternatives considered format
- [ ] EXAMPLE.md demonstrates design decision documentation

**Dependencies:** #4

---

### Skill — dashboard-requirements
> GitHub Issue: *To be created*

**Goal:** Create the dashboard-requirements skill

**Creates:**

- `skills/measure/dashboard-requirements/SKILL.md`
- `skills/measure/dashboard-requirements/references/TEMPLATE.md`
- `skills/measure/dashboard-requirements/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: dashboard-requirements
description: Specifies requirements for an analytics dashboard including metrics, visualizations, filters, and data sources. Use when requesting dashboards from data teams, defining KPI tracking, or documenting reporting needs.
license: Apache-2.0
metadata:
  category: validation
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: Requesting dashboards from data teams, defining KPI tracking, documenting reporting needs
- Instructions: Define questions to answer, specify metrics and calculations, describe visualizations
- Principle: Start with questions, not charts — what decisions will this dashboard inform?
- Quality notes: Clear metric definitions, include calculation formulas, specify data sources

**TEMPLATE.md Sections:**

- Dashboard Purpose (what questions it answers)
- Audience (who will use this, how often)
- Key Metrics Table (Metric | Definition | Calculation | Data Source)
- Visualization Specs (chart type, dimensions, axes)
- Filters & Segments (what drill-downs are needed)
- Data Sources (where data comes from)
- Refresh Frequency (real-time, daily, weekly)
- Access Permissions (who can see what)

**EXAMPLE.md Scenario:**

- Context: Product health dashboard for SaaS platform
- Questions: Are users healthy? Where do users drop off? What features drive retention?
- Metrics: DAU/MAU ratio, feature adoption rates, churn prediction score
- Filters: By plan tier, by cohort, by acquisition channel
- Refresh: Daily at 6am UTC

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] Metric definitions are clear
- [ ] EXAMPLE.md shows realistic dashboard spec

**Dependencies:** #4

---

### Skill — experiment-results
> GitHub Issue: *To be created*

**Goal:** Create the experiment-results skill

**Creates:**

- `skills/measure/experiment-results/SKILL.md`
- `skills/measure/experiment-results/references/TEMPLATE.md`
- `skills/measure/experiment-results/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: experiment-results
description: Documents the results of a completed experiment or A/B test with statistical analysis, learnings, and recommendations. Use after experiments conclude to communicate findings, inform decisions, and build organizational knowledge.
license: Apache-2.0
metadata:
  category: reflection
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: After experiments conclude, to communicate findings and inform decisions
- Instructions: Summarize experiment, present results with stats, extract learnings, make recommendations
- Honesty: Report inconclusive and negative results — they're still valuable learnings
- Quality notes: Include confidence intervals, segment analysis, and clear next steps

**TEMPLATE.md Sections:**

- Experiment Summary (link to design doc, dates run, traffic)
- Hypothesis Recap (what we believed would happen)
- Results (primary metric, secondary metrics, statistical significance)
- Segmentation Analysis (did any segments behave differently?)
- Learnings (what we discovered, expected or not)
- Recommendations (ship, iterate, or kill)
- Next Steps (actions to take)

**EXAMPLE.md Scenario:**

- Context: One-page checkout A/B test ran for 2 weeks
- Result: +3.2% conversion (95% CI: 1.8% to 4.6%, p<0.01)
- Segment insight: Mobile users saw +5.1%, desktop only +1.2%
- Recommendation: Ship to 100%, prioritize mobile-first optimizations
- Learning: Reducing form fields matters more on mobile

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] Includes statistical interpretation guidance
- [ ] EXAMPLE.md shows both metrics and narrative

**Dependencies:** #4

---

### Skill — retrospective
> GitHub Issue: *To be created*

**Goal:** Create the retrospective skill

**Creates:**

- `skills/iterate/retrospective/SKILL.md`
- `skills/iterate/retrospective/references/TEMPLATE.md`
- `skills/iterate/retrospective/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: retrospective
description: Facilitates and documents a team retrospective capturing what went well, what to improve, and action items. Use at the end of sprints, projects, or milestones to reflect and improve team practices.
license: Apache-2.0
metadata:
  category: reflection
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: End of sprints, projects, or milestones to reflect and improve
- Instructions: Gather input, facilitate discussion, capture insights, assign action items
- Format options: Start/Stop/Continue, 4Ls, Mad/Sad/Glad — choose based on team preference
- Quality notes: Action items need owners and due dates; follow up on previous retro items

**TEMPLATE.md Sections:**

- Context (what period/project this covers, attendees)
- Format Used (which retrospective format)
- What Went Well (successes to celebrate and continue)
- What to Improve (pain points and frustrations)
- Action Items Table (Action | Owner | Due Date | Status)
- Follow-up from Previous Retro (status of old action items)
- Parking Lot (items to discuss later)

**EXAMPLE.md Scenario:**

- Context: Sprint 14 retro, payment feature launch
- What went well: Shipped on time, good cross-team collaboration
- What to improve: Late requirements changes, flaky test suite
- Action item 1: Create requirements freeze policy (PM, Jan 20)
- Action item 2: Fix top 5 flaky tests (Eng Lead, Jan 25)

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] Multiple retrospective formats offered
- [ ] EXAMPLE.md has concrete action items

**Dependencies:** #4

---

### Skill — lessons-log
> GitHub Issue: *To be created*

**Goal:** Create the lessons-log skill

**Creates:**

- `skills/iterate/lessons-log/SKILL.md`
- `skills/iterate/lessons-log/references/TEMPLATE.md`
- `skills/iterate/lessons-log/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: lessons-log
description: Creates a structured lessons learned entry for organizational memory. Use after projects, incidents, or significant learnings to capture knowledge for future teams and initiatives.
license: Apache-2.0
metadata:
  category: reflection
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: After projects, incidents, or significant learnings to build organizational memory
- Instructions: Capture context, describe what happened, extract lessons, make searchable
- Audience: Future teams who weren't there — include enough context to be useful standalone
- Quality notes: Make entries searchable with tags; focus on actionable recommendations

**TEMPLATE.md Sections:**

- Title (descriptive, searchable)
- Context (project/initiative, date, team)
- What Happened (factual description of events)
- What We Learned (key insights, both positive and negative)
- Recommendations (what to do differently next time)
- Applicable Situations (when this lesson applies)
- Tags/Categories (for searchability)

**EXAMPLE.md Scenario:**

- Context: Payment service outage, Black Friday 2025
- What happened: Database connection pool exhausted under 10x normal load
- Lesson: Load testing didn't simulate realistic traffic patterns
- Recommendation: Use production traffic replay for load tests
- Tags: #infrastructure #load-testing #payments #incident

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] Entry is standalone and searchable
- [ ] EXAMPLE.md captures actionable lessons

**Dependencies:** #4

---

### Skill — refinement-notes
> GitHub Issue: *To be created*

**Goal:** Create the refinement-notes skill

**Creates:**

- `skills/iterate/refinement-notes/SKILL.md`
- `skills/iterate/refinement-notes/references/TEMPLATE.md`
- `skills/iterate/refinement-notes/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: refinement-notes
description: Documents backlog refinement session outcomes including stories refined, estimates, questions raised, and decisions made. Use during or after refinement to capture the results and share with absent team members.
license: Apache-2.0
metadata:
  category: coordination
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: During or after backlog refinement to capture results and share with absent members
- Instructions: Note what was discussed, estimates given, questions raised, decisions made
- Speed: Designed to be quick to complete — capture outcomes, not full discussion
- Quality notes: Focus on what team members need to know; include blockers and open questions

**TEMPLATE.md Sections:**

- Session Info (date, attendees, duration)
- Stories Refined Table (Story | Points | Status | Notes)
- Questions Raised (open questions that need answers)
- Decisions Made (agreements reached during session)
- Action Items (who does what by when)
- Parking Lot (topics deferred to future sessions)
- Next Session (date, stories to prepare)

**EXAMPLE.md Scenario:**

- Context: Weekly refinement, Sprint 15 prep
- Stories refined: 5 stories, total 21 points
- Key decision: Split "user settings" epic into 3 smaller stories
- Open question: Need UX mockups for profile page before estimation
- Action: Designer to share mockups by Thursday

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] Format is quick to fill out
- [ ] EXAMPLE.md shows realistic session output

**Dependencies:** #4

---

### Skill — pivot-decision
> GitHub Issue: *To be created*

**Goal:** Create the pivot-decision skill

**Creates:**

- `skills/iterate/pivot-decision/SKILL.md`
- `skills/iterate/pivot-decision/references/TEMPLATE.md`
- `skills/iterate/pivot-decision/references/EXAMPLE.md`

**Frontmatter:**

```yaml
name: pivot-decision
description: Documents a strategic pivot or persevere decision with the evidence, analysis, and rationale. Use when evaluating whether to change direction on a product, feature, or strategy based on market feedback.
license: Apache-2.0
metadata:
  category: reflection
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
```

**SKILL.md Content Guidance:**

- When to use: After significant validated learning suggests current direction won't succeed
- Instructions: Gather evidence, document options, analyze each objectively, make and communicate decision
- Based on Lean Startup pivot framework (pivot types: zoom-in, zoom-out, customer segment, platform, etc.)
- Quality notes: Decisions should be evidence-based, not emotional; document both what you're pivoting FROM and TO

**TEMPLATE.md Sections:**

- Current State (what we're doing now, key metrics, time invested)
- Evidence Summary (data points that triggered this evaluation)
- Hypothesis Review (which hypotheses were validated/invalidated)
- Options Considered (at least 3: persevere, pivot option A, pivot option B)
- Analysis Matrix (compare options on key criteria)
- Decision (clear statement of choice and rationale)
- Implementation Plan (first steps, timeline, resource needs)
- Success Criteria (how we'll know the new direction is working)
- Communication Plan (who needs to know, how to announce)

**EXAMPLE.md Scenario:**

- Context: B2C fitness app after 6 months, 5000 users but only 2% conversion
- Evidence: User interviews reveal corporate wellness buyers most interested
- Options: Persevere B2C, pivot to B2B enterprise, pivot to B2B2C partnerships
- Decision: Pivot to B2B enterprise (larger contracts, better unit economics)
- Implementation: Rebuild pricing, add team features, hire enterprise sales

**Acceptance Criteria:**

- [ ] All three files exist in correct directory
- [ ] Frontmatter validates against schema
- [ ] Framework for decision-making is clear
- [ ] EXAMPLE.md shows evidence-based decision

**Dependencies:** #4

---

### Bundle — triple-diamond
> GitHub Issue: *To be created*

**Goal:** Create the Triple Diamond workflow bundle

**Creates:**

- `_bundles/triple-diamond.md`

**Content Guidance:**

- Introduction to Triple Diamond framework
- All 6 phases with skill mappings
- Suggested sequence and flow
- Links to all relevant skills
- When to use this workflow

**Acceptance Criteria:**

- [ ] File exists at `_bundles/triple-diamond.md`
- [ ] All 6 phases documented
- [ ] All skills mapped to appropriate phases
- [ ] Clear narrative flow

**Dependencies:** All Phase 1 & 2 skills complete

---

### Bundle — lean-startup
> GitHub Issue: *To be created*

**Goal:** Create the Lean Startup workflow bundle

**Creates:**

- `_bundles/lean-startup.md`

**Content Guidance:**

- Introduction to Build-Measure-Learn cycle
- Map skills to Build, Measure, Learn phases
- Emphasis on rapid iteration
- Links to relevant skills

**Acceptance Criteria:**

- [ ] File exists at `_bundles/lean-startup.md`
- [ ] Build-Measure-Learn phases documented
- [ ] Skills appropriately mapped
- [ ] Distinct from Triple Diamond

**Dependencies:** All Phase 1 & 2 skills complete

---

### Bundle — feature-kickoff
> GitHub Issue: *To be created*

**Goal:** Create the Feature Kickoff workflow bundle

**Creates:**

- `_bundles/feature-kickoff.md`

**Content Guidance:**

- Quick-start workflow for feature development
- Core sequence: problem-statement → hypothesis → prd → user-stories → launch-checklist
- When to use (vs. full Triple Diamond)
- Time-boxed version for rapid development

**Acceptance Criteria:**

- [ ] File exists at `_bundles/feature-kickoff.md`
- [ ] Core skill sequence defined
- [ ] Clear guidance on when to use
- [ ] Practical and actionable

**Dependencies:** Phase 1 P0 skills complete

---

### Slash Commands
> GitHub Issue: *To be created*

**Goal:** Create Claude Code slash commands for common skills

**Creates:**

- `commands/prd.md`
- `commands/problem-statement.md`
- `commands/hypothesis.md`
- `commands/user-stories.md`
- `commands/kickoff.md`

**Content Guidance:**

Each command file follows this format:

```markdown
---
description: [One line description]
---

Use the `[skill-name]` skill to [action].

Context from user: $ARGUMENTS
```

`kickoff.md` is special — invokes multiple skills in sequence.

**Acceptance Criteria:**

- [ ] All 5 command files exist
- [ ] Each has valid frontmatter with description
- [ ] Commands reference correct skill names
- [ ] kickoff.md sequences multiple skills

**Dependencies:** Phase 1 P0 skills complete

---

### AGENTS.md + README Finalization
> GitHub Issue: *To be created*

**Goal:** Create AGENTS.md and finalize README

**Creates:**

- `AGENTS.md`

**Updates:**

- `README.md` (full content, remove WIP notice)

**AGENTS.md Content:**

- Auto-discoverable format for AI agents
- List all skills with descriptions
- Follow AGENTS.md conventions

**README.md Updates:**

- Project description
- Installation instructions (all platforms)
- Skill inventory table
- Usage examples
- Contributing section
- License

**Acceptance Criteria:**

- [ ] AGENTS.md lists all skills
- [ ] README.md has complete installation instructions
- [ ] README.md has skill inventory table
- [ ] WIP notice removed

**Dependencies:** All skills complete

---

### GitHub Actions
> GitHub Issue: *To be created*

**Goal:** Create GitHub Actions for automation

**Creates:**

- `.github/workflows/sync-agents-md.yml`
- `.github/workflows/release-zips.yml`

**sync-agents-md.yml:**

- Triggers on push to main
- Regenerates AGENTS.md from skill inventory
- Commits if changed

**release-zips.yml:**

- Triggers on release publish
- Packages each skill as individual ZIP
- Creates complete bundle ZIP
- Uploads to release assets

**Acceptance Criteria:**

- [ ] Both workflow files exist
- [ ] Valid GitHub Actions YAML syntax
- [ ] sync-agents-md generates correct format
- [ ] release-zips creates proper ZIP structure

**Dependencies:** #34

---

## Skill Creation Pattern

Use this pattern for all skills. Copy from `_templates/skill-template/`.

### Directory Structure

```
skills/<phase>/<skill-name>/
├── SKILL.md
└── references/
    ├── TEMPLATE.md
    └── EXAMPLE.md
```

### SKILL.md Pattern

```markdown
---
name: <skill-name>
description: <1-2 sentences, include trigger keywords, max 1024 chars>
license: Apache-2.0
metadata:
  category: <one of: research, problem-framing, ideation, specification, validation, reflection, coordination>
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
---

# <Skill Title>

<One paragraph overview of what this skill produces and why it matters.>

## When to Use

- <Situation 1>
- <Situation 2>
- <Situation 3>

## Instructions

When asked to <create artifact>, follow these steps:

1. **<Step 1 Title>**
   <What to do and why>

2. **<Step 2 Title>**
   <What to do and why>

3. **<Step 3 Title>**
   <What to do and why>

[Continue as needed]

## Output Format

Use the template in `references/TEMPLATE.md` to structure the output.

## Quality Checklist

Before finalizing, verify:

- [ ] <Quality criterion 1>
- [ ] <Quality criterion 2>
- [ ] <Quality criterion 3>

## Examples

See `references/EXAMPLE.md` for a completed example.
```

### TEMPLATE.md Pattern

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

[Content]

## Section 2
<!-- Guidance on what goes here -->

[Content]

[Continue with all sections]
```

### EXAMPLE.md Pattern

```markdown
---
artifact: <artifact-type>
version: "1.0"
created: <YYYY-MM-DD>  # Use actual date when creating example
status: complete
context: <Brief scenario description>
---

# <Specific Example Title>

## Section 1

<Realistic, complete content — no placeholders>

## Section 2

<Realistic, complete content — no placeholders>

[Complete example with all sections filled in realistically]
```

---

## Validation Protocol

### After Each Phase

**Phase 0 Complete When:**

- [ ] All directories exist
- [ ] Schema documentation complete
- [ ] Template structure in place
- [ ] Can create a skill following the pattern

**Phase 1 Complete When:**

- [ ] All 5 P0 skills exist
- [ ] Each skill has SKILL.md, TEMPLATE.md, EXAMPLE.md
- [ ] All frontmatter validates
- [ ] Examples are realistic and complete

**Phase 2 Complete When:**

- [ ] All 8 P1 skills exist
- [ ] Same validation as Phase 1

**Phase 3 Complete When:**

- [ ] All 11 P2 skills exist
- [ ] All 3 bundles exist
- [ ] All 5 slash commands exist
- [ ] AGENTS.md generated
- [ ] README.md finalized
- [ ] GitHub Actions in place

### Final Validation

**Bash (macOS/Linux):**

```bash
# Verify structure
find skills -name "SKILL.md" | wc -l  # Should be 24

# Verify all skills have required files
for skill in skills/*/*; do
  [ -f "$skill/SKILL.md" ] || echo "Missing SKILL.md: $skill"
  [ -f "$skill/references/TEMPLATE.md" ] || echo "Missing TEMPLATE.md: $skill"
  [ -f "$skill/references/EXAMPLE.md" ] || echo "Missing EXAMPLE.md: $skill"
done

# Verify bundles
ls _bundles/  # Should show 3 files

# Verify commands
ls commands/  # Should show 5 files
```

**PowerShell (Windows):**

```powershell
# Verify structure
(Get-ChildItem -Path skills -Recurse -Filter "SKILL.md").Count  # Should be 24

# Verify all skills have required files
Get-ChildItem -Path skills -Directory | ForEach-Object {
  Get-ChildItem -Path $_.FullName -Directory | ForEach-Object {
    $skill = $_.FullName
    if (-not (Test-Path "$skill\SKILL.md")) { Write-Host "Missing SKILL.md: $skill" }
    if (-not (Test-Path "$skill\references\TEMPLATE.md")) { Write-Host "Missing TEMPLATE.md: $skill" }
    if (-not (Test-Path "$skill\references\EXAMPLE.md")) { Write-Host "Missing EXAMPLE.md: $skill" }
  }
}

# Verify bundles
Get-ChildItem _bundles  # Should show 3 files

# Verify commands
Get-ChildItem commands  # Should show 5 files
```

---

## Progress Tracker

### Phase 0: Foundation

- [x] #1: Repository Bootstrap *(complete: CONTRIBUTING.md, skills/ directories, infrastructure dirs)*
- [x] #2: Schema Documentation *(complete: `_docs/frontmatter-schema.yaml`)*
- [x] #3: Category Reference *(complete: `_docs/categories.md`)*
- [x] #4: Skill Template Structure *(complete: `_templates/skill-template/`)*
- [x] #5: VISION.md Integration *(complete: verified at `_NOTES/VISION.md`)*

### Phase 1: P0 Core Skills

- [x] [#10](https://github.com/product-on-purpose/pm-skills/issues/10): problem-statement *(complete)*
- [x] [#11](https://github.com/product-on-purpose/pm-skills/issues/11): hypothesis *(complete)*
- [x] [#12](https://github.com/product-on-purpose/pm-skills/issues/12): prd *(complete)*
- [x] [#13](https://github.com/product-on-purpose/pm-skills/issues/13): user-stories *(complete)*
- [x] [#14](https://github.com/product-on-purpose/pm-skills/issues/14): launch-checklist *(complete)*

### Phase 2: P1 Skills

- [x] [#18](https://github.com/product-on-purpose/pm-skills/issues/18): interview-synthesis *(complete)*
- [x] [#19](https://github.com/product-on-purpose/pm-skills/issues/19): solution-brief *(complete)*
- [x] [#20](https://github.com/product-on-purpose/pm-skills/issues/20): spike-summary *(complete)*
- [x] [#21](https://github.com/product-on-purpose/pm-skills/issues/21): adr *(complete)*
- [x] [#22](https://github.com/product-on-purpose/pm-skills/issues/22): edge-cases *(complete)*
- [x] [#23](https://github.com/product-on-purpose/pm-skills/issues/23): release-notes *(complete)*
- [x] [#24](https://github.com/product-on-purpose/pm-skills/issues/24): experiment-design *(complete)*
- [x] [#25](https://github.com/product-on-purpose/pm-skills/issues/25): instrumentation-spec *(complete)*

### Phase 3: P2 Skills ✅ COMPLETE

- [x] [#26](https://github.com/product-on-purpose/pm-skills/issues/26): competitive-analysis
- [x] [#27](https://github.com/product-on-purpose/pm-skills/issues/27): stakeholder-summary
- [x] [#28](https://github.com/product-on-purpose/pm-skills/issues/28): opportunity-tree
- [x] [#29](https://github.com/product-on-purpose/pm-skills/issues/29): jtbd-canvas
- [x] [#30](https://github.com/product-on-purpose/pm-skills/issues/30): design-rationale
- [x] [#31](https://github.com/product-on-purpose/pm-skills/issues/31): dashboard-requirements
- [x] [#32](https://github.com/product-on-purpose/pm-skills/issues/32): experiment-results
- [x] [#33](https://github.com/product-on-purpose/pm-skills/issues/33): retrospective
- [x] [#34](https://github.com/product-on-purpose/pm-skills/issues/34): lessons-log
- [x] [#35](https://github.com/product-on-purpose/pm-skills/issues/35): refinement-notes
- [x] [#36](https://github.com/product-on-purpose/pm-skills/issues/36): pivot-decision

### Phase 3: Infrastructure ✅ COMPLETE

- [x] Bundle — triple-diamond (`_bundles/triple-diamond.md`)
- [x] Bundle — lean-startup (`_bundles/lean-startup.md`)
- [x] Bundle — feature-kickoff (`_bundles/feature-kickoff.md`)
- [x] Slash Commands (`commands/prd.md`, `problem-statement.md`, `hypothesis.md`, `user-stories.md`, `kickoff.md`)
- [x] AGENTS.md (`AGENTS.md`)
- [x] GitHub Actions (`.github/workflows/sync-agents-md.yml`, `release-zips.yml`)

---

## Appendix: Quick Reference

### Category Values

- research
- problem-framing
- ideation
- specification
- validation
- reflection
- coordination

### Phase Directories

- discover
- define
- develop
- deliver
- measure
- iterate

### Skill Count by Phase

| Phase     | P0    | P1    | P2     | Total  |
| --------- | ----- | ----- | ------ | ------ |
| Discover  | 0     | 1     | 2      | 3      |
| Define    | 2     | 0     | 2      | 4      |
| Develop   | 0     | 3     | 1      | 4      |
| Deliver   | 3     | 2     | 0      | 5      |
| Measure   | 0     | 2     | 2      | 4      |
| Iterate   | 0     | 0     | 4      | 4      |
| **Total** | **5** | **8** | **11** | **24** |

---

*End of Implementation Plan*