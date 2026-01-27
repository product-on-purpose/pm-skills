<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
name: deliver-launch-checklist
description: Creates a comprehensive pre-launch checklist covering engineering, design, marketing, support, legal, and operations readiness. Use before releasing features, products, or major updates to ensure nothing is missed.
phase: deliver
version: "2.0.0"
updated: 2026-01-26
license: Apache-2.0
metadata:
  category: coordination
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
---
# Launch Checklist

A launch checklist is a comprehensive verification document that ensures all functions are ready before releasing a feature or product. It coordinates across engineering, QA, design, marketing, support, legal, and operations to prevent launch-day surprises. Good launch checklists surface blockers early and create shared accountability for launch readiness.

## When to Use

- 1-2 weeks before any significant launch
- During launch planning kickoff meetings
- When coordinating cross-functional releases
- Before major version releases or feature rollouts
- After incidents to improve launch processes

## Instructions

When asked to create a launch checklist, follow these steps:

1. **Define Launch Context**
   Document what is launching, when, and who the key stakeholders are. Establish the launch tier (major release, minor feature, experiment) as this affects checklist scope.

2. **Gather Functional Requirements**
   For each function (engineering, QA, marketing, etc.), identify what must be complete, verified, or in place before launch. Distinguish between blockers (must-have) and nice-to-haves.

3. **Assign Owners and Dates**
   Every checklist item needs an owner and a target completion date. Ownership creates accountability; dates enable tracking.

4. **Identify Dependencies and Blockers**
   Flag items that block other work or are blocked by external factors. Surface these early so teams can unblock.

5. **Define Go/No-Go Criteria**
   Establish clear criteria for making the launch decision. What conditions must be met? Who makes the final call?

6. **Document Rollback Plan**
   Every launch should have a rollback strategy. Document how to revert if critical issues emerge post-launch.

7. **Schedule Check-in Cadence**
   Establish when the team will review checklist progress (daily standups, T-2 days review, launch day sync).

## Output Format

Use the template in `references/TEMPLATE.md` to structure the output.

## Quality Checklist

Before finalizing, verify:

- [ ] All functional areas are represented
- [ ] Every item has an owner and target date
- [ ] Blockers are clearly distinguished from nice-to-haves
- [ ] Go/No-Go criteria are specific and measurable
- [ ] Rollback plan is documented and tested
- [ ] Check-in cadence is scheduled

## Examples

See `references/EXAMPLE.md` for a completed example.
