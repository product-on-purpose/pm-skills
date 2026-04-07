# Topic 3 — Model Examples: PM Skill Builder Specifications

> **Date**: 2026-03-21
> **Author**: Claude Opus 4.6
> **Status**: Draft — GSD-compatible and open-spec-compatible examples
> **Companion**: `topic-3_spec_pm-skill-builder.md`

---

## Table of Contents

1. [Skill Implementation Packet: Complete Example](#1-skill-implementation-packet-complete-example)
2. [SKILL.md Example: The Builder Itself](#2-skillmd-example-the-builder-itself)
3. [CI Validation Script Examples](#3-ci-validation-script-examples)
4. [Codex Task Execution Example](#4-codex-task-execution-example)
5. [Community Contribution Flow Example](#5-community-contribution-flow-example)

---

## 1. Skill Implementation Packet: Complete Example

This is what the pm-skill-builder produces — a Skill Implementation Packet for a hypothetical new skill: `measure-survey-analysis`.

```markdown
# Skill Implementation Packet: measure-survey-analysis

## Decision
- **Recommendation**: New skill
- **Why Gate Evidence**:
  1. When asked "analyze this survey data," Claude produces generic statistical
     summaries without PM-specific insight framing (e.g., no connection to
     hypotheses, no segmentation by persona, no prioritization by impact)
  2. When asked "what do these survey results mean for our product," Claude
     lacks a structured framework for translating survey responses into
     actionable PM decisions
  3. No existing skill covers quantitative user research analysis — the closest
     is `discover-interview-synthesis` which handles qualitative data only

## Classification
- **Type**: domain
- **Phase**: measure
- **Category**: validation
- **Name**: `measure-survey-analysis`
- **Directory**: `skills/measure-survey-analysis/`

## Overlap Analysis
- **`discover-interview-synthesis`**: Qualitative only. Survey analysis needs
  quantitative frameworks (statistical significance, segmentation, trend analysis).
  These complement each other.
- **`measure-experiment-results`**: Focuses on A/B test results with treatment/control.
  Survey analysis handles broader research instruments without experimental design.
- **`measure-dashboard-requirements`**: Specifies dashboards. Survey analysis
  produces insights that inform dashboards, not dashboard specs.

## Draft Frontmatter

\`\`\`yaml
---
name: measure-survey-analysis
description: >-
  Analyze product survey results with PM-specific frameworks. Segments
  responses by persona, maps findings to product hypotheses, identifies
  statistical significance, and produces actionable recommendations
  prioritized by impact and feasibility.
classification: domain
version: "1.0.0"
updated: 2026-03-21
license: Apache-2.0
metadata:
  category: validation
  frameworks: [triple-diamond, lean-startup]
  author: product-on-purpose
---
\`\`\`

## Draft SKILL.md Outline

### Purpose
Analyze product surveys and translate quantitative user feedback into
prioritized, actionable PM insights.

### When to Use
- After running a product survey (NPS, CSAT, feature preference, etc.)
- When you have quantitative user data to inform product decisions
- When you need to connect survey results to product hypotheses

### When NOT to Use
- For qualitative interview data → use /interview-synthesis
- For A/B test results → use /experiment-results
- For designing the survey itself → separate effort (potential future skill)

### Instructions

**Step 1: Understand the Survey**
- What type of survey? (NPS, CSAT, feature preference, satisfaction, custom)
- How many respondents?
- What segments exist? (personas, user tiers, geography, etc.)
- What hypotheses was this survey designed to test?

**Step 2: Analyze Responses**
- Calculate key metrics (mean, median, distribution, NPS score)
- Segment by persona or user group
- Identify statistically significant differences between segments
- Flag response bias or low sample sizes

**Step 3: Map to Product Context**
- Connect findings to product hypotheses
- Identify which features/areas have strongest signal
- Note surprises (results that contradict assumptions)

**Step 4: Prioritize Insights**
- Rank by: impact on users × feasibility × alignment with strategy
- Separate "act now" vs. "investigate further" vs. "monitor"

**Step 5: Produce Analysis Report**
- Use the template from references/TEMPLATE.md
- Include executive summary, methodology, key findings, segment analysis,
  recommendations, and limitations

### Output Contract
- [ ] Executive summary (< 200 words)
- [ ] Sample size and methodology documented
- [ ] 3-7 key findings with supporting data
- [ ] Segment-level analysis (at least 2 segments)
- [ ] Prioritized recommendations with impact/feasibility scores
- [ ] Limitations and caveats section
- [ ] Connection to product hypotheses (if available)

## Draft TEMPLATE.md Sections

\`\`\`markdown
# Survey Analysis: [Survey Name]

## Executive Summary
<!-- 2-3 sentences: what did we learn and what should we do -->

## Survey Methodology
| Item | Value |
|------|-------|
| Survey type | [NPS / CSAT / Feature preference / Custom] |
| Total respondents | [N] |
| Response rate | [X%] |
| Collection period | [Start] — [End] |
| Distribution method | [Email / In-app / Etc.] |

## Key Findings

### Finding 1: [Title]
**Data**: [Metric with numbers]
**Significance**: [Statistical confidence or "directional only"]
**Implication**: [What this means for the product]

### Finding 2: [Title]
...

## Segment Analysis

### [Segment A] vs. [Segment B]
| Metric | Segment A (n=X) | Segment B (n=Y) | Delta | Significant? |
|--------|-----------------|-----------------|-------|-------------|
| [Metric] | [Value] | [Value] | [Diff] | [Yes/No] |

## Hypothesis Validation
| Hypothesis | Survey Evidence | Verdict |
|-----------|----------------|---------|
| [H1] | [Data point] | [Supported / Refuted / Inconclusive] |

## Recommendations

### Priority 1: [Action]
- **Impact**: [High/Medium/Low]
- **Feasibility**: [High/Medium/Low]
- **Evidence**: [Which finding supports this]
- **Timeline**: [Immediate / Next sprint / Next quarter]

### Priority 2: [Action]
...

## Limitations
- [Potential bias or limitation]
- [Sample size caveat]

## Raw Data Reference
<!-- Link to survey tool export or data file -->
\`\`\`

## EXAMPLE.md Scenario

A completed survey analysis for a B2B SaaS product's quarterly NPS survey
with 450 respondents across 3 segments (Enterprise, Mid-market, SMB),
testing the hypothesis that "reporting features drive NPS for Enterprise
users." Include realistic data, specific findings, and actionable recommendations.

## Draft Command

\`\`\`yaml
---
name: survey-analysis
description: >-
  Analyze product survey results with persona segmentation, hypothesis
  validation, and prioritized recommendations.
---

Create a survey analysis report. Ask the user about:
1. The survey type and data
2. Available segments or personas
3. Hypotheses the survey was designed to test
4. Any known limitations

Use the survey-analysis skill to produce a structured analysis report.
\`\`\`

## AGENTS.md Entry

\`\`\`markdown
### measure-survey-analysis
Analyze product survey results with PM-specific frameworks. Use when you
have quantitative user research data (NPS, CSAT, feature preference surveys)
and need to extract actionable product insights.
\`\`\`

## Repo Update Checklist

- [ ] `skills/measure-survey-analysis/SKILL.md` created
- [ ] `skills/measure-survey-analysis/references/TEMPLATE.md` created
- [ ] `skills/measure-survey-analysis/references/EXAMPLE.md` created
- [ ] `commands/survey-analysis.md` created
- [ ] `AGENTS.md` entry added
- [ ] `README.md` skill count updated (25 → 26)
- [ ] `.claude-plugin/plugin.json` skill list updated
- [ ] Frontmatter lint passes
- [ ] Command validation passes
- [ ] 4 test scenarios identified:
  1. Minimal: NPS survey, 50 respondents, no segments
  2. Rich: CSAT + feature preference, 500 respondents, 3 segments, hypothesis testing
  3. Edge: Very small sample (< 30), single question survey
  4. Different domain: Healthcare product satisfaction survey
- [ ] MCP sync impact: new `pm_survey_analysis` tool needed in pm-skills-mcp
```

---

## 2. SKILL.md Example: The Builder Itself

This is a realistic excerpt of what the pm-skill-builder's SKILL.md would look like:

```markdown
---
name: utility-pm-skill-builder
description: >-
  Evaluate whether pm-skills needs a new skill or revision, classify it
  correctly, and produce a repo-compatible Skill Implementation Packet.
  Use when considering adding a new PM skill, revising an existing skill,
  or assessing whether a gap is better served by a bundle, command, or
  documentation update.
classification: utility
version: "1.0.0"
updated: 2026-03-21
license: Apache-2.0
metadata:
  category: coordination
  frameworks: [triple-diamond]
  author: product-on-purpose
---

# PM Skill Builder

## Purpose

Guide contributors from "I think pm-skills needs a skill for X" to a
complete, validated Skill Implementation Packet ready for PR. Prevents
duplicate skills, enforces naming conventions, and produces repo-compatible
output on the first try.

## When to Use

- You want to add a new PM skill to the pm-skills library
- You want to revise an existing skill to meet current conventions
- You want to assess whether a PM workflow gap should be a skill, bundle,
  command, or documentation update
- You want to audit an existing skill against current repo standards

## When NOT to Use

- You want to build a skill for a different repo (use the upstream
  skill-builder or skill-creator instead)
- You want to create a non-PM skill (engineering, design, marketing)
- You're just using an existing skill (run the skill directly)

## Current Library Reference

The pm-skills library currently contains 25 skills across 8 categories:

| Phase | Skills | Count |
|-------|--------|-------|
| Discover | competitive-analysis, interview-synthesis, stakeholder-summary | 3 |
| Define | hypothesis, jtbd-canvas, opportunity-tree, problem-statement | 4 |
| Develop | adr, design-rationale, solution-brief, spike-summary | 4 |
| Deliver | edge-cases, launch-checklist, prd, release-notes, user-stories | 5 |
| Measure | dashboard-requirements, experiment-design, experiment-results, instrumentation-spec | 4 |
| Iterate | lessons-log, pivot-decision, refinement-notes, retrospective | 4 |
| Foundation | persona | 1 |
| Utility | (this skill, when shipped) | 0 |

## Instructions

### Step 1: Gap Analysis

**Ask**: "What PM workflow or artifact gap are you seeing?"

Then check the current 25 skills above. If there's clear overlap, say so:

> "This sounds similar to [existing skill]. Have you tried it? What
> specifically doesn't it cover?"

If overlap is partial, note the differentiation for the classification step.

Do NOT proceed until the gap is articulated relative to existing skills.

### Step 2: Why Gate

**Ask**: "Name 2-3 specific prompts or situations where existing skills
fall short."

Good evidence:
- "When I ask Claude to analyze survey data, the output lacks persona
  segmentation and doesn't connect to product hypotheses"
- "The PRD skill doesn't handle API specification depth needed for
  platform teams"

Bad evidence:
- "It would be nice to have" (not specific enough)
- "I think PMs need this" (no evidence of failure)

If the Why Gate fails, suggest alternatives:
- Revise an existing skill
- Create a bundle that chains existing skills
- Add a command shortcut
- Write documentation

### Step 3: Repo-Fit Assessment

Based on the gap and evidence, determine the best response:

| If... | Then... |
|-------|---------|
| Produces a distinct artifact no existing skill creates | → New skill |
| Improves an existing artifact's quality or coverage | → Revise existing skill |
| Chains 3+ existing skills in a workflow | → New bundle |
| Provides a shortcut to an existing workflow | → New command |
| Adds reference material without a new workflow | → Documentation update |

If the recommendation is NOT "new skill," provide specific guidance for
the recommended action and stop.

### Step 4: Classification

For new skills, determine:

1. **Type**: domain (tied to a Triple Diamond phase) / foundation (serves
   PMs broadly) / utility (serves the repo)
2. **Phase**: discover / define / develop / deliver / measure / iterate
3. **Category**: research / problem-framing / ideation / specification /
   validation / reflection / coordination
4. **Name**: `{phase}-{skill-name}` for domain, `{type}-{skill-name}` for
   foundation/utility

Validate the name:
- Kebab-case
- 1-64 characters
- No collision with existing skills
- Phase prefix matches the phase classification

### Step 5: Generate Implementation Packet

Read the template from `references/TEMPLATE.md` and produce a complete
Skill Implementation Packet including:

1. Decision summary (recommendation + Why Gate evidence)
2. Classification details
3. Overlap analysis
4. Draft frontmatter
5. Draft SKILL.md outline (purpose, when to use, instructions, output contract)
6. Draft TEMPLATE.md sections
7. EXAMPLE.md scenario description
8. Draft command
9. AGENTS.md entry
10. Repo update checklist

### Step 6: Writing Lens (Optional)

After generating the packet, offer a quick writing assessment:

> "Your skill is primarily [process / knowledge / reflection]-oriented.
> Here's what that means for how to write the Instructions section."

Point to exemplar skills:
- **Process-dominant** (step-by-step artifact creation): see `deliver-prd`
- **Knowledge-dominant** (framework-driven analysis): see `discover-competitive-analysis`
- **Reflection-oriented** (questions that force thinking): see `iterate-retrospective`
- **Foundation** (multi-mode, output contract): see `foundation-persona`

## Output Contract

The Skill Implementation Packet MUST include:
- [ ] Decision with Why Gate evidence
- [ ] Classification (type, phase, category, name)
- [ ] Overlap analysis against existing skills
- [ ] Complete frontmatter block (all required fields)
- [ ] SKILL.md outline with instructions and output contract
- [ ] TEMPLATE.md sections with guidance comments
- [ ] EXAMPLE.md scenario description
- [ ] Command draft with frontmatter
- [ ] AGENTS.md entry text
- [ ] Repo update checklist with all required items

## Quality Criteria

A good Implementation Packet:
1. **Passes the "first-try" test** — files created from the packet should
   pass CI validation without manual fixes
2. **Has specific Why Gate evidence** — not "it would be nice" but
   "here's what fails without this skill"
3. **Has clear differentiation** — explains exactly how this differs from
   the closest existing skills
4. **Has a realistic EXAMPLE.md scenario** — not abstract, but a concrete
   PM situation with specific details
5. **Follows naming conventions** — name passes all validation rules
```

---

## 3. CI Validation Script Examples

### 3.1 validate-frontmatter.js (Key Logic)

```javascript
// Pseudocode for the validation logic
const REQUIRED_FIELDS = ['name', 'description', 'classification', 'version', 'updated', 'license', 'metadata'];
const VALID_CLASSIFICATIONS = ['domain', 'foundation', 'utility'];
const VALID_CATEGORIES = ['research', 'problem-framing', 'ideation', 'specification',
                          'validation', 'reflection', 'coordination'];

function validateSkill(skillDir) {
  const frontmatter = parseFrontmatter(`${skillDir}/SKILL.md`);
  const errors = [];

  // Required fields
  for (const field of REQUIRED_FIELDS) {
    if (!frontmatter[field]) errors.push(`Missing required field: ${field}`);
  }

  // Name matches directory
  const dirName = path.basename(skillDir);
  if (frontmatter.name !== dirName) {
    errors.push(`name '${frontmatter.name}' != directory '${dirName}'`);
  }

  // Classification is valid
  if (!VALID_CLASSIFICATIONS.includes(frontmatter.classification)) {
    errors.push(`Invalid classification: ${frontmatter.classification}`);
  }

  // Description word count
  const wordCount = frontmatter.description.split(/\s+/).length;
  if (wordCount < 20) errors.push(`Description too short (${wordCount} words, min 20)`);
  if (wordCount > 100) errors.push(`Description too long (${wordCount} words, max 100)`);

  // Category is valid
  if (frontmatter.metadata?.category && !VALID_CATEGORIES.includes(frontmatter.metadata.category)) {
    errors.push(`Invalid category: ${frontmatter.metadata.category}`);
  }

  return errors;
}
```

### 3.2 validate-completeness.js (Key Logic)

```javascript
function validateCompleteness(skillDir) {
  const errors = [];
  const required = [
    'SKILL.md',
    'references/TEMPLATE.md',
    'references/EXAMPLE.md'
  ];

  for (const file of required) {
    const filePath = path.join(skillDir, file);
    if (!fs.existsSync(filePath)) {
      errors.push(`Missing file: ${file}`);
    } else if (fs.statSync(filePath).size === 0) {
      errors.push(`Empty file: ${file}`);
    }
  }

  // Check TEMPLATE.md has structured headers
  if (fs.existsSync(path.join(skillDir, 'references/TEMPLATE.md'))) {
    const content = fs.readFileSync(path.join(skillDir, 'references/TEMPLATE.md'), 'utf8');
    const headers = content.match(/^## /gm);
    if (!headers || headers.length < 3) {
      errors.push('TEMPLATE.md has fewer than 3 sections (## headers)');
    }
  }

  return errors;
}
```

---

## 4. Codex Task Execution Example

### Input to Codex

```markdown
## Task: Create PM Skill from Implementation Packet

### Skill Implementation Packet

[The full packet from Section 1 of this document would be provided here]

### Instructions

1. Create the directory: `skills/measure-survey-analysis/`
2. Create `skills/measure-survey-analysis/SKILL.md` with the full SKILL.md
   content (expand the outline into complete instructions)
3. Create `skills/measure-survey-analysis/references/TEMPLATE.md` with the
   template sections
4. Create `skills/measure-survey-analysis/references/EXAMPLE.md` with a
   complete, realistic example (B2B SaaS NPS survey, 450 respondents)
5. Create `commands/survey-analysis.md` with the command definition
6. Add the AGENTS.md entry
7. Run: `node scripts/validate-frontmatter.js`
8. Run: `node scripts/validate-completeness.js`
9. Fix any validation errors
10. Create branch `feature/measure-survey-analysis`
11. Commit all files
12. Open PR

### Expected Output
- 4 new files created
- 1 file modified (AGENTS.md)
- All validation passes
- PR opened with descriptive title and body
```

### Expected Codex Output

Codex creates all files, runs validation, fixes any issues, and opens a PR:

```
Created: skills/measure-survey-analysis/SKILL.md (2,847 tokens)
Created: skills/measure-survey-analysis/references/TEMPLATE.md (1,203 tokens)
Created: skills/measure-survey-analysis/references/EXAMPLE.md (3,156 tokens)
Created: commands/survey-analysis.md (412 tokens)
Modified: AGENTS.md (+4 lines)

Validation:
  frontmatter: ✅ PASS
  completeness: ✅ PASS
  naming: ✅ PASS
  agents-md: ✅ PASS

PR: #47 "Add skill: measure-survey-analysis"
Branch: feature/measure-survey-analysis
```

---

## 5. Community Contribution Flow Example

### Step 1: Community Member Opens Issue

Using the skill-proposal issue template:

```
Title: Skill Proposal: define-okr-framework

Phase: define
Problem: When teams need to translate strategy into measurable objectives,
existing pm-skills don't cover OKR (Objectives and Key Results) creation.
The closest skill is `define-hypothesis` but it's focused on product
hypotheses, not organizational/team objectives.

Evidence:
1. Asking Claude to "create OKRs for my team" produces generic OKR examples
   without connecting to product strategy or existing problem statements
2. The PRD skill references success metrics but doesn't help define the
   organizational objectives those metrics serve
3. Teams using pm-skills for feature development need a structured way to
   connect features to company-level objectives

Artifact: An OKR Framework document with company objectives, team key results,
alignment mapping, and measurement plan.

Overlap: `define-hypothesis` is closest but focused on product experiments.
`measure-dashboard-requirements` handles metrics visualization but not
objective-setting. This skill bridges strategy → objectives → metrics.
```

### Step 2: Maintainer Reviews and Approves

Maintainer labels the issue `approved` and comments:

```
Good proposal. This fills a real gap between strategy and execution.
Naming suggestion: `define-okr-framework` fits the define phase well.
Category: problem-framing (connects strategy to measurable objectives).
```

### Step 3: Contributor Runs /skill-builder

```
PM: /skill-builder

Claude: I'll help you create a new PM skill. Let me check the current library...

[Gap analysis against 25 skills]
[Why Gate passes with the issue evidence]
[Classification: domain, define, problem-framing]

Here's your Skill Implementation Packet:
[Full packet generated]
```

### Step 4: Contributor Creates PR

PR includes all files from the packet. CI validates automatically.

### Step 5: CI Validates

```
Validate Skills: ✅ All checks pass
  Frontmatter Lint: ✅
  Command Validation: ✅
  Skill Completeness: ✅
  Naming Conventions: ✅
  AGENTS.md Consistency: ✅
  MCP Impact Advisory: ⚠️ New skill needs pm-skills-mcp update (pm_okr_framework)
```

### Step 6: Maintainer Reviews and Merges

Maintainer reviews the PR, checks content quality, merges. The MCP impact advisory
reminds them to coordinate with pm-skills-mcp.
