<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
name: deliver-edge-cases
description: Documents edge cases, error states, boundary conditions, and recovery paths for a feature. Use during specification to ensure comprehensive coverage, or during QA planning to identify test scenarios.
phase: deliver
version: "2.0.0"
updated: 2026-01-26
license: Apache-2.0
metadata:
  category: specification
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
---
# Edge Cases

An edge cases document systematically catalogs the unusual, boundary, and error scenarios for a feature. While happy-path flows are typically well-specified, edge cases often get discovered in production — causing bugs, poor user experience, and support burden. Documenting edge cases upfront ensures engineering handles them intentionally and QA knows what to test.

## When to Use

- During feature specification before engineering begins
- When preparing QA test plans
- After discovering production bugs to prevent similar issues
- When reviewing PRDs or user stories for completeness
- Before launch to ensure error states have been designed

## Instructions

When asked to document edge cases, follow these steps:

1. **Define the Feature Scope**
   Clearly describe what feature or flow you're analyzing. Edge cases are specific to context — the same input might be valid in one feature and invalid in another.

2. **Walk Through Input Validation**
   Consider every user input: What if it's empty? Too long? Wrong format? Contains special characters? What are the minimum and maximum valid values?

3. **Explore Boundary Conditions**
   Find the edges of acceptable ranges. If a field accepts 1-100, test 0, 1, 100, and 101. Consider pagination boundaries, timeout thresholds, and rate limits.

4. **Map Error States**
   Identify what can go wrong: network failures, permission denied, resource not found, concurrent modifications, expired sessions. Document both the scenario and expected behavior.

5. **Consider Concurrency Issues**
   What if two users act simultaneously? What if the user double-clicks? What if data changes between load and save? Race conditions often cause subtle bugs.

6. **Define Recovery Paths**
   For each error, specify how users recover. What message do they see? Can they retry? Is data preserved? Good error handling turns frustration into confidence.

7. **Prioritize by Likelihood and Impact**
   Not all edge cases need the same attention. High-likelihood + high-impact cases need robust handling; rare + low-impact cases might just need graceful failure.

## Output Format

Use the template in `references/TEMPLATE.md` to structure the output.

## Quality Checklist

Before finalizing, verify:

- [ ] All user inputs have validation edge cases documented
- [ ] Boundary conditions are explicitly listed
- [ ] Network/system failure scenarios are covered
- [ ] Each error state has a defined user-facing message
- [ ] Recovery paths are specified (not just error detection)
- [ ] Edge cases are prioritized by likelihood and impact

## Examples

See `references/EXAMPLE.md` for a completed example.
