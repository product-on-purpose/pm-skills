# Specification: Workflows Guide (D-05)

## Overview

A dedicated guide at `docs/guides/using-workflows.md` that helps users choose,
invoke, and customize workflows. Consolidates guidance currently scattered
across `using-skills.md`, `docs/workflows/index.md`, and individual workflow
files.

## Problem

With 9+ workflows, users need structured navigation. The current state:
- `using-skills.md` has one section written for 3 workflows - doesn't scale
- `docs/workflows/index.md` is a minimal table with no decision guidance
- Individual workflow files describe themselves but don't help users *choose*

## Design Principles

### 1. Decision-first

The guide opens with "Which workflow should I use?" - not "What is a
workflow?" Users arrive knowing they want a workflow; they need help
picking the right one.

### 2. Progressive depth

Quick-scan comparison matrix → decision tree → invocation details →
customization patterns. Users stop reading when they have what they need.

### 3. No duplication

The guide links to individual workflow files for detailed steps. It
doesn't repeat per-workflow instructions - it provides the *selection*
layer that individual files can't.

## File Architecture

### Primary deliverable

`docs/guides/using-workflows.md` (~100-150 lines)

**Sections:**

1. **Which Workflow Should I Use?**
   - Decision tree (mermaid flowchart) based on:
     - What phase are you in? (discover / define / develop / deliver / measure / iterate)
     - What's your uncertainty level? (high = discovery workflows, low = delivery workflows)
     - Who's your audience? (stakeholders, engineering, self)
   - 3-4 decision paths leading to specific workflow recommendations

2. **Workflow Comparison Matrix**
   - Table with all workflows:
     | Workflow | Use case (1 line) | Skills used | Complexity | Duration |
   - Complexity: light (2-3 skills) / medium (4-5) / heavy (6+)
   - Duration: quick (< 30 min) / session (30-90 min) / multi-session

3. **Invoking Workflows**
   - For command-backed workflows: `/workflow-name`
   - For file-reference workflows: "Read `_workflows/name.md`"
   - Table mapping all workflows to their invocation method

4. **Customizing Workflows**
   - Skip steps: "Tell Claude to skip step N"
   - Add steps: "After step N, also run /skill-name"
   - Combine workflows: patterns for chaining outputs
   - Parallel execution: which workflows can run concurrently

5. **Building Custom Workflows**
   - Brief guide to creating a new `_workflows/*.md` file
   - Link to the workflow file format (from existing docs)
   - Migrated from the section currently in `using-skills.md`

### Secondary updates

| File | Change |
|------|--------|
| `docs/guides/using-skills.md` | Trim "Using Workflows" section to 3-4 lines + link to the new guide |
| `mkdocs.yml` | Add "Using Workflows" nav entry under Guides |
| `docs/workflows/index.md` | Add prominent link to the guide at top |

## Acceptance Criteria

### AC-1: Decision tree covers all workflows

```
GIVEN a user reads the decision tree
WHEN  they follow any path to completion
THEN  they arrive at a specific workflow recommendation
  AND every shipped workflow is reachable via at least one path
```

### AC-2: Comparison matrix is complete

```
GIVEN the comparison matrix table
WHEN  a user scans it
THEN  every workflow in _workflows/ has a row
  AND each row includes: use case, skills used, complexity, duration
```

### AC-3: Invocation methods are documented

```
GIVEN a user wants to run a workflow
WHEN  they check the invocation table
THEN  every workflow has either a /command or a file reference
  AND the method shown actually works
```

### AC-4: Existing docs are updated

```
GIVEN the guide ships
WHEN  a user reads using-skills.md
THEN  the workflow section is a brief overview linking to the new guide
  AND docs/workflows/index.md links to the guide
  AND mkdocs.yml includes the new nav entry
```

### AC-5: mkdocs renders cleanly

```
GIVEN the guide is added
WHEN  mkdocs build --strict runs
THEN  it passes with zero warnings
```
