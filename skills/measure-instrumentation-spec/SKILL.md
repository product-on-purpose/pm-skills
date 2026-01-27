<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
name: measure-instrumentation-spec
description: Specifies event tracking and analytics instrumentation requirements for a feature. Use when defining what data to collect, ensuring consistent tracking implementation, or documenting analytics requirements for engineering.
phase: measure
version: "2.0.0"
updated: 2026-01-26
license: Apache-2.0
metadata:
  category: validation
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
---
# Instrumentation Spec

An instrumentation spec defines what analytics events to track, when to fire them, and what properties to include. It serves as a contract between product and engineering, ensuring consistent data collection that enables accurate measurement. Good instrumentation specs prevent the "we can't answer that question because we didn't track it" problem.

## When to Use

- Before engineering implements a new feature
- When defining analytics requirements for experiments
- When auditing existing tracking for gaps or inconsistencies
- When onboarding a new analytics tool
- Before launch to ensure measurement is in place

## Instructions

When asked to create an instrumentation spec, follow these steps:

1. **Define Analytics Goals**
   Start with the questions you need to answer. What will you measure? What decisions will this data inform? This prevents over-instrumentation while ensuring nothing important is missed.

2. **Identify Events to Track**
   List each user action or system event that should be tracked. Follow consistent naming conventions (typically `noun_verb` or `verb_noun` in snake_case). Each event should represent a distinct, meaningful action.

3. **Specify Event Triggers**
   For each event, describe exactly when it fires. Be precise: "When user clicks Submit button" vs. "When form is submitted successfully." These are different events with different meanings.

4. **Define Event Properties**
   List the properties (attributes) attached to each event. Include property name, data type, description, and example values. Properties provide context that makes events useful.

5. **Document User Properties**
   Identify persistent user-level attributes that should be associated with all events (e.g., subscription tier, account creation date). These enable segmentation in analysis.

6. **Address PII and Privacy**
   Flag any properties that contain personally identifiable information. Document how PII should be handled — hashing, encryption, or exclusion.

7. **Create Testing Checklist**
   Define how QA should verify that tracking is implemented correctly. Include steps to validate events fire at the right times with correct properties.

## Output Format

Use the template in `references/TEMPLATE.md` to structure the output.

## Quality Checklist

Before finalizing, verify:

- [ ] Event names follow consistent naming convention
- [ ] Each event has a clear, unambiguous trigger
- [ ] Properties include data types and example values
- [ ] PII is identified and handling is documented
- [ ] Events map to the analytics questions you need to answer
- [ ] Testing checklist enables QA verification

## Examples

See `references/EXAMPLE.md` for a completed example.
