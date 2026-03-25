---
name: deliver-acceptance-criteria
description: Generates structured Given/When/Then acceptance criteria for a user story or feature slice. Use when translating product requirements into testable scenarios that cover the happy path, edge cases, error states, and non-functional expectations for engineering handoff and QA.
phase: deliver
version: "1.0.0"
updated: 2026-03-22
license: Apache-2.0
metadata:
  category: specification
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# Acceptance Criteria

Acceptance criteria define the observable behavior that must be true for a story or feature to be considered done. This skill turns feature context into concise, testable Given/When/Then scenarios that engineers and QA can verify without guessing intent.

## When to Use

- After a user story, PRD section, or feature slice is defined
- When a team needs clear pass/fail conditions for implementation
- When writing QA-ready criteria for sprint planning or handoff
- When a story has edge cases, error paths, or non-functional expectations that should be explicit

## Instructions

When asked to create acceptance criteria, follow these steps:

1. **Confirm the story or feature scope**
   Identify the exact slice of work. If the scope is unclear, ask for the user story, PRD section, or feature description before drafting criteria.

2. **Separate the happy path from exceptions**
   Start with the primary success flow, then add edge cases and error states that are likely or costly if missed.

3. **Write each criterion as an observable scenario**
   Use Given/When/Then language only. Keep each criterion independently testable and avoid implementation details.

4. **Cover recovery and failure behavior**
   Describe what the user sees or can do when validation fails, a dependency is unavailable, or a save action cannot complete.

5. **Include non-functional expectations**
   Add criteria for performance, accessibility, security, reliability, or auditability when they matter to the story.

6. **Avoid duplication and overlap**
   Each criterion should test one outcome. If two criteria describe the same behavior, merge or split them until the intent is clear.

7. **Review for testability**
   Ensure a reviewer can pass or fail each criterion without interpretation. If a statement is subjective, rewrite it into a measurable outcome.

## Output Contract

Use `references/TEMPLATE.md` as the output format. A complete response should:

- Restate the feature or story context
- Group criteria into happy path, edge cases, error states, and non-functional criteria
- Use explicit Given/When/Then statements for each criterion
- Note assumptions or open questions when context is incomplete

## Quality Checklist

Before finalizing, verify:

- [ ] The criteria map to a specific story or feature slice
- [ ] The happy path is covered first
- [ ] Edge cases are explicit, not implied
- [ ] Error states include user-visible recovery behavior
- [ ] Non-functional criteria are included when relevant
- [ ] Each criterion is testable and has one clear outcome
- [ ] No implementation details leak into the acceptance criteria

## Examples

See `references/EXAMPLE.md` for a completed example based on a realistic e-commerce checkout flow.
