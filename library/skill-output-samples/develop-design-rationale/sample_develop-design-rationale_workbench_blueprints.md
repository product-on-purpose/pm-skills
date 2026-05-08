---
title: "Develop Design Rationale: Workbench Blueprints"
description: "Workbench enterprise collaboration platform: guided wizard vs. blank canvas for Blueprint creation flow."
artifact: design-rationale
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-21
status: sample
thread: workbench
context: "Workbench enterprise collaboration platform: guided wizard vs. blank canvas for Blueprint creation flow"
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Workbench is a Series B enterprise collaboration platform (~200 employees, ~500 enterprise customers [fictional]) building Blueprints. The team needed to decide how new Blueprints are created: a guided wizard that walks authors through each required section step-by-step, or a blank canvas that opens the full template and lets authors fill sections in any order. Rachel V. (Technical PM) and Tomas G. (Design Lead) led the evaluation with input from a preference test conducted with 8 closed-beta users [fictional]. The decision had direct implications for first-submission completeness, author satisfaction, and the perception of required-section enforcement as a helpful guardrail rather than an obstacle.

**Source Notes:**

- Nielsen Norman Group's research on wizard design patterns (nngroup.com) identifies step-by-step wizards as most effective when the task has a natural sequence and when users are infrequent or novice, while free-form interfaces perform better for expert users who resent sequential constraints.
- Atlassian's Confluence page creation flow uses a blank-canvas approach: select a template, then the full page opens with all sections visible. This is the default experience for the enterprise documentation market.
- Notion's page creation uses a progressive disclosure model: start with a blank page, add blocks as needed. No wizard, no template enforcement.

---

## Prompt

```
/design-rationale

Decision: Blueprint creation flow -- guided wizard vs. blank canvas
Product: Workbench Blueprints (enterprise doc templates with required sections and approval gates)
Stage: Develop phase, pre-PRD

Problem: How should a new Blueprint be created? Two options:
- Option A: Guided wizard -- step-by-step flow, one section per screen, progress indicator, validation per step
- Option B: Blank canvas -- full template opens in the editor, all sections visible, fill in any order (Confluence model)
- Option C (hybrid): Wizard for first-time creation, canvas for returning authors who have completed a Blueprint before

Context:
- Enterprise users are not power users of Workbench yet -- Blueprints is a new feature
- Required sections are the core differentiator; the creation flow must make enforcement feel helpful, not punitive
- Discovery interviews: middle managers act as "docs police"; the creation flow should reduce, not increase, that burden
- Closed-beta preference test (8 users [fictional]): 6 preferred wizard on first use, 5 preferred canvas after their second Blueprint
- Karen L. (Eng Lead): wizard adds 1 sprint of effort vs. canvas [fictional]
- Tomas G. (Design Lead): wizard produces cleaner first submissions but risks feeling patronizing for experienced authors

Evaluation criteria: first-submission completeness rate, author time-to-submit, author satisfaction (NPS), engineering effort, scalability to custom templates

Stakeholders: Sandra C. (Head of Product), Karen L. (Eng Lead), Tomas G. (Design Lead)
```

---

## Output

# Design Rationale: Blueprint Creation Flow

## Decision Summary

**Selected Option C (Hybrid):** Guided wizard for first-time Blueprint creation, blank canvas for returning authors. The wizard walks authors through each required section with inline guidance and validation, then transitions to the canvas experience after the author has completed at least one Blueprint from that template. Authors can switch to canvas mode at any time via a "Skip wizard" option. This approach directly addresses the tension surfaced in discovery interviews, where middle managers reported spending significant time policing document completeness rather than reviewing content quality.

**Decision Date:** January 15, 2026
**Decision Maker:** Rachel V. (Technical PM, Blueprints)
**Approved By:** Sandra C. (Head of Product)

## Context

### Problem Statement

Blueprints introduces required-section enforcement to enterprise document creation. The creation flow must balance two competing needs: ensuring first-time authors understand what is required (reducing incomplete submissions) while not patronizing experienced authors who want to work efficiently. The choice of creation flow directly affects first-submission completeness, author satisfaction, and the perception of enforcement as helpful versus punitive. Given that Blueprints is a new feature with no existing user habits to build on, the first-run experience carries outsized weight in shaping long-term adoption patterns.

### User Need

Enterprise authors creating a Blueprint for the first time need clear guidance on which sections are required, what each section expects, and what happens if they submit with missing content. Returning authors who have completed Blueprints before need to work efficiently without repeating guidance they have already internalized. Discovery interviews revealed that authors in the closed beta who encountered required sections without guidance were twice as likely to submit placeholder text (such as "TBD" or "see above") compared to those who received section-level explanations [fictional].

### Constraints

- Wizard adds approximately 1 sprint of engineering effort compared to canvas [fictional]
- The creation flow must work for both standard templates (created by Workbench) and custom templates (created by customer template admins)
- Required-section enforcement must feel helpful, not punitive; the creation flow is the first touchpoint where authors experience enforcement
- Mobile authoring is not in scope for v1; the creation flow is desktop-only
- Template admins vary widely in sophistication, so the creation flow cannot depend on admin-authored guidance text (that capability is deferred)

### Design Principles Applied

- **Progressive disclosure:** Show complexity only when the user is ready for it. New authors see guidance; experienced authors see the canvas. This mirrors how onboarding works in the best enterprise tools, where initial hand-holding fades once the user demonstrates competence.
- **Enforcement through UX, not friction:** Required sections should feel like a helpful checklist, not a gate. The wizard frame makes enforcement feel structured rather than blocking.
- **Respect the expert:** Experienced authors should never be forced through a flow they have already completed. The "Skip wizard" escape hatch and automatic transition to canvas mode honor author expertise.

## Options Considered

### Option A: Guided Wizard

Step-by-step flow with one section per screen, a progress indicator showing completion status, and inline validation that confirms each section is complete before advancing. The author cannot submit until all required sections show a green checkmark. The wizard also provides helper text for each section, explaining what the section expects and offering a brief example.

**Pros:** Highest first-submission completeness; clear enforcement without ambiguity; onboarding-like experience reduces the need for separate training materials.
**Cons:** Experienced authors find wizards patronizing; adds 1 sprint of engineering effort [fictional]; does not scale well to templates with 15+ sections (too many steps); the sequential flow prevents authors from drafting sections out of order, which some beta testers flagged as frustrating.

### Option B: Blank Canvas

Full template opens in the editor with all sections visible. Required sections are marked with an amber "Required" label. The author fills sections in any order. The Submit button is disabled until all required sections are completed, with a summary of missing sections shown on hover.

**Pros:** Fastest path for experienced authors; lowest engineering effort; matches the Confluence mental model (familiar to the target market); scales to any number of sections.
**Cons:** First-time authors may not understand what is required; the amber labels are easy to overlook; first-submission completeness rate will be lower, increasing the rejection-revision cycle that Blueprints is designed to eliminate. Beta testers who saw the canvas without prior context spent an average of 45 seconds longer locating required sections compared to wizard users [fictional].

### Option C: Hybrid (Selected)

Guided wizard for first-time creation, blank canvas for returning authors. The system tracks whether the author has previously completed a Blueprint from this template. If not, the wizard flow is shown. If yes, the canvas opens directly. Authors can switch to canvas mode at any time via a "Skip wizard" link in the wizard header.

**Pros:** Best of both worlds: high first-submission completeness for new authors, efficient canvas for experienced authors; "Skip wizard" respects author autonomy; the transition is automatic and invisible.
**Cons:** Engineering effort is the highest of the three options (wizard + canvas + state tracking); template admins cannot control which flow their authors see; the transition logic adds a stateful dependency (track whether author has completed a Blueprint from this template before).

## Evaluation

### Criteria

| Criterion | Weight | Description |
|-----------|--------|-------------|
| First-submission completeness rate | High | % of Blueprints submitted with all required sections complete on the first attempt |
| Author time-to-submit | Medium | Minutes from Blueprint creation to first submission |
| Author satisfaction | Medium | Author NPS measured in-product at 30 days |
| Engineering effort | Medium | Sprint count to implement |
| Custom template scalability | Low | How well the flow works for customer-created templates with varying section counts |

### Comparison Matrix

| Criterion | Option A (Wizard) | Option B (Canvas) | Option C (Hybrid) |
|-----------|-------------------|-------------------|-------------------|
| First-submission completeness | High (guided) | Low (self-directed) | High for new authors, medium for returning |
| Author time-to-submit | Slow (sequential) | Fast (parallel) | Slow on first use, fast on subsequent |
| Author satisfaction | Low for experts | High for experts, medium for novices | High for both (appropriate flow per experience) |
| Engineering effort | +1 sprint [fictional] | Baseline | +1.5 sprints [fictional] |
| Custom template scalability | Poor (15+ step wizards are unusable) | Good (any section count) | Good (wizard auto-disables for templates with 12+ sections) [fictional] |

### User Research Input

Closed-beta preference test with 8 users [fictional] (4 first-time Blueprint creators, 4 who had created at least 2 Blueprints):

- 6 of 8 users preferred the wizard for their first Blueprint. Primary reason: "I didn't know what the sections expected until the wizard explained it." [fictional]
- 5 of 8 users preferred the canvas after their second Blueprint. Primary reason: "I already know what goes where. Just let me write." [fictional]
- 3 of 8 users explicitly mentioned the "Skip wizard" option as important. One user said: "I'd be annoyed if I couldn't skip it on my second document." [fictional]
- 2 of 8 users noted they would have preferred to jump between sections in the wizard rather than following a strict sequence, reinforcing the importance of the "Skip wizard" escape hatch [fictional].

## Decision Rationale

### Why Option C?

The hybrid approach directly addresses the tension between first-time completeness and expert efficiency. The preference test showed a clear split: new authors need guidance, experienced authors resent it. Option C is the only option that adapts to the author's experience level without manual configuration. It also aligns with the broader Blueprints value proposition, which positions required-section enforcement as a productivity tool rather than a compliance burden.

The incremental engineering cost (+0.5 sprints over Option A [fictional]) is justified by the long-term reduction in author friction. Enterprise Blueprints is a retention feature; if experienced authors find the creation flow patronizing, they will resist adoption and the governance value proposition degrades. Mei-Lin T. (Enterprise Sales Lead) reinforced this point, noting that two prospects in active sales conversations specifically asked whether Blueprints would "feel like another form to fill out."

### Key Differentiators

- Automatic transition from wizard to canvas removes the need for manual preference settings, admin configuration, or per-template flow selection.
- The "Skip wizard" escape hatch ensures that no author is ever trapped in a flow they do not want, which is critical for enterprise adoption where author autonomy is culturally important.
- Auto-disabling the wizard for templates with 12+ sections [fictional] prevents the worst-case UX (a 15-step wizard) while still providing guidance on shorter, more common templates. In the closed beta, 90% of templates had 8 or fewer sections [fictional], so the wizard covers the vast majority of use cases.

### Dissenting Opinions

Karen L. (Engineering Lead) initially preferred Option B (canvas) to minimize engineering effort and reduce Sprint 1 scope. After reviewing the preference test results showing 6/8 new users preferred the wizard, Karen agreed that the hybrid approach was worth the incremental effort, with the caveat that the wizard-to-canvas transition logic should be kept simple (boolean per author-template pair, not a complex state machine).

## Trade-offs Accepted

### What We Gave Up

- **Simplicity:** The hybrid approach is more complex to implement and test than either standalone option. Two flows means two sets of edge cases, two sets of accessibility audits, and two code paths to maintain. The edge-case analysis for Blueprints v1 includes dedicated scenarios for wizard-to-canvas transition failures.
- **Admin control:** Template admins cannot force authors into the wizard flow. Some admins may want new team members to always use the wizard regardless of prior experience. This is a deliberate choice: author experience, not admin preference, determines the flow.

### Risks

- **State tracking reliability:** If the "has completed a Blueprint from this template" flag is lost (database issue, account migration), returning authors may see the wizard unexpectedly. Mitigation: treat the wizard as a fallback rather than the canvas; if the flag is missing, show a dismissible "Would you like guided mode?" prompt rather than forcing the wizard.
- **Template admin confusion:** Admins may not understand why different authors see different creation flows for the same template. Mitigation: add a tooltip in the template admin UI explaining the adaptive flow and the "Skip wizard" option. Additionally, include a brief explanation in the admin onboarding documentation.

## Reversibility

**Highly reversible.** The canvas experience (Option B) is the baseline and must be built regardless. The wizard is an overlay that can be disabled via feature flag without affecting the core creation flow. If post-launch data shows the wizard is not improving first-submission completeness, it can be removed with no regression to the canvas experience. The feature flag also allows the team to A/B test wizard-on versus wizard-off for new authors during the closed beta period.

## Follow-up Considerations

### Metrics to Monitor

- First-submission completeness rate: wizard users vs. canvas users (target: wizard users achieve 90%+ completeness on first submission [fictional])
- Wizard skip rate: % of first-time authors who click "Skip wizard" (if > 40% [fictional], the wizard may be adding friction rather than value)
- Author time-to-submit: wizard vs. canvas (expected: wizard is 2-3x slower on first use, equivalent after transition)
- Author NPS at 30 days: segmented by wizard vs. canvas first experience
- Placeholder text rate: % of required sections containing obvious placeholder content such as "TBD" or "N/A" (a proxy for whether authors understand section expectations)

### Future Decisions Required

- Should the wizard-to-canvas transition threshold be configurable by template admins? (Deferred to v1.1 based on admin feedback.)
- Should the wizard support custom section-level guidance text authored by template admins? (Deferred; would significantly increase wizard complexity.)

### Revisit Triggers

- If wizard skip rate exceeds 50% [fictional] in the first 30 days of closed beta, reconsider whether the wizard is needed at all.
- If Confluence ships a guided template creation flow, re-evaluate whether the wizard remains a differentiator or becomes table stakes.

## Supporting Materials

- [Preference Test Results: Blueprint Creation Flow (8 users)](#), Tomas G., January 2026
- [Figma: Wizard Flow Mockups (6 screens)](#), Tomas G.
- [Figma: Canvas Flow with Required Section Labels](#), Tomas G.
- Nielsen Norman Group: "Wizard Design Pattern," nngroup.com

## Decision History

| Date | Change | Author |
|------|--------|--------|
| 2026-01-10 | Options A, B, C defined; preference test conducted | Tomas G. |
| 2026-01-15 | Option C selected after preference test review and Sandra C. approval | Rachel V. |
