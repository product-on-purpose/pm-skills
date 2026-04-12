# PM Skills Sample Library

91 sample outputs across 32 PM skills, organized into three narrative threads that follow fictional product teams through the full Triple Diamond lifecycle. Each sample is a complete, realistic artifact that shows what a PM team would produce when invoking a pm-skills slash command against a real product context. Utility skills have single-thread samples (storevine) demonstrating their meta-skill outputs.

## Table of Contents

- [What Is This?](#what-is-this)
- [The Three Narrative Threads](#the-three-narrative-threads)
- [Why Three Different Prompt Styles?](#why-three-different-prompt-styles)
- [How Each Sample Is Structured](#how-each-sample-is-structured)
- [Data Integrity Rules](#data-integrity-rules)
- [Sample Creation Standards](SAMPLE_CREATION.md)
- [Browse by Skill](#browse-by-skill)
- [Browse by Company](#browse-by-company)
  - [Storevine (B2B Ecommerce)](#storevine--b2b-ecommerce-platform)
  - [Brainshelf (Consumer PKM)](#brainshelf--consumer-pkm-app)
  - [Workbench (Enterprise Collaboration)](#workbench--enterprise-collaboration-software)

---

## What Is This?

This folder contains 91 sample outputs: 3 samples for each of the 24 phase skills, 12 samples for the foundation-persona skill (4 per thread), and 7 single-thread samples for utility skills and deliver-acceptance-criteria. The samples serve two purposes:

1. **Browsability.** If you are evaluating pm-skills for the first time, you can open any sample and see the full artifact a skill produces, including the prompt that generated it.
2. **Contributor calibration.** If you are writing a new skill or modifying an existing one, these samples show the level of detail, structure, and tone that a well-executed skill output should achieve.

These are not training data, not MCP endpoints, and not API documentation. They are concrete, self-contained examples.

Authoring and maintenance rules for this library are defined in [SAMPLE_CREATION.md](SAMPLE_CREATION.md).

---

## The Three Narrative Threads

Every sample belongs to one of three fictional companies. Each company represents a different product type, team size, and stage of maturity. All three threads follow the same structure: a single feature arc that progresses from early discovery research through iteration and refinement, spanning all six Triple Diamond phases (Discover, Define, Develop, Deliver, Measure, Iterate).

The `foundation-persona` samples are a cross-cutting addition in `v2.5.0`: they sit outside the six phase lanes and provide story-first persona outputs for product and marketing modes.

Competitor names within samples are real. Storevine, Brainshelf, and Workbench are fictional.

| Thread | Product Type | Stage | Feature Arc | Real Competitors Referenced |
|--------|-------------|-------|-------------|---------------------------|
| **Storevine** | B2B all-in-one ecommerce platform | Series A, ~70 employees, ~15K merchants | Campaigns: built-in email/SMS re-engagement | Shopify, Squarespace, Wix, Klaviyo, Mailchimp |
| **Brainshelf** | Consumer PKM / read-later app | Post-seed, ~20 employees, ~85K registered users | Resurface: contextual morning email digest | Readwise, Raindrop.io, Omnivore, Instapaper |
| **Workbench** | Enterprise collaboration platform | Series B, ~200 employees, ~500 enterprise customers | Blueprints: doc templates with required sections and approval gates | Confluence, Notion, Coda, Monday.com |

---

## Why Three Different Prompt Styles?

PM teams do not all write prompts the same way. A PM at a 200-person enterprise company with a full stakeholder map and prior research artifacts writes a very different prompt than a PM at a 20-person startup who is moving fast with minimal formal documentation. The three threads deliberately model this variation so that the sample library shows realistic prompt quality across the spectrum, not just the idealized version.

**Storevine prompts are organized.** They reference prior work, include structured context, and provide clear scope boundaries. This reflects a PM who has time to prepare structured notes before invoking a skill. If you are the kind of PM who keeps a research repository and links to prior artifacts, Storevine prompts will feel familiar.

**Brainshelf prompts are rough and casual.** They provide enough context to produce a good artifact but skip the polish. Bullet points, shorthand, and incomplete sentences are common. This reflects a lean team moving fast where the PM wears multiple hats and does not have time for formal briefs. If you are shipping features in two-week sprints with a small team, Brainshelf prompts will feel familiar.

**Workbench prompts are the most complete and structured.** They include full stakeholder lists, quantified baselines, explicit metric definitions, and references to prior research. This reflects an enterprise PM who operates in a high-documentation environment where every artifact needs to withstand scrutiny from legal, compliance, and executive stakeholders. If you work in enterprise product management, Workbench prompts will feel familiar.

The skill outputs are equally thorough regardless of prompt style. The difference is in how much context the PM provides up front versus how much the skill infers or asks for.

---

## How Each Sample Is Structured

Every sample file follows a consistent three-section format:

**Scenario** (2-4 sentences) describes the company, team, and the specific PM problem that motivates the artifact. Fictional metrics carry a `[fictional]` marker. Real industry data is cited in Source Notes (3-5 bullets, public sources only).

**Prompt** contains the realistic slash command the PM typed to invoke the skill. Prompt quality varies by thread (see above). The prompt is always a fenced code block showing exactly what the PM entered.

**Output** is the complete artifact, following every section from the skill's `references/TEMPLATE.md` in order. No sections are skipped. No placeholder text remains. Every invented number carries a `[fictional]` marker.

---

## Data Integrity Rules

**`[fictional]` markers** appear on every invented metric throughout the library: conversion rates, retention percentages, user counts, NPS scores, ARR figures, and any specific number that cannot be verified from a public source. If a number does not have a `[fictional]` marker, it is sourced from a real, publicly available document cited in the Source Notes.

**Source Notes** cite real, public sources when industry context or market data anchors the scenario. All URLs are publicly accessible with no paywalls and no internal links.

**Competitor names** are real throughout. Shopify, Readwise, Confluence, Klaviyo, and their peers are named directly. Only the three thread companies (Storevine, Brainshelf, Workbench) are fictional.

---

## Sample Creation Standards

For naming, content quality, frontmatter, and README update workflow standards, use [SAMPLE_CREATION.md](SAMPLE_CREATION.md).

---

## Browse by Skill

Each row links to three sample outputs for the same skill, one per thread. The foundation-persona skill has expanded coverage: 4 samples per thread (product brief, product detailed, marketing brief, marketing detailed) to demonstrate both modes at both depth levels.

| Phase | Skill | What It Produces | Storevine | Brainshelf | Workbench |
|-------|-------|-----------------|-----------|------------|-----------|
| Foundation | persona (product) | Story-first product persona dossier with evidence and confidence | [brief](foundation-persona/sample_foundation-persona_storevine_product-brief-campaigns.md) / [detailed](foundation-persona/sample_foundation-persona_storevine_product-detailed-campaigns.md) | [brief](foundation-persona/sample_foundation-persona_brainshelf_product-brief-resurface.md) / [detailed](foundation-persona/sample_foundation-persona_brainshelf_product-detailed-resurface.md) | [brief](foundation-persona/sample_foundation-persona_workbench_product-brief-blueprints.md) / [detailed](foundation-persona/sample_foundation-persona_workbench_product-detailed-blueprints.md) |
| Foundation | persona (marketing) | Story-first marketing persona dossier with evidence and confidence | [brief](foundation-persona/sample_foundation-persona_storevine_marketing-brief-campaigns.md) / [detailed](foundation-persona/sample_foundation-persona_storevine_marketing-detailed-campaigns.md) | [brief](foundation-persona/sample_foundation-persona_brainshelf_marketing-brief-resurface.md) / [detailed](foundation-persona/sample_foundation-persona_brainshelf_marketing-detailed-resurface.md) | [brief](foundation-persona/sample_foundation-persona_workbench_marketing-brief-blueprints.md) / [detailed](foundation-persona/sample_foundation-persona_workbench_marketing-detailed-blueprints.md) |
| Discover | competitive-analysis | Structured competitor landscape with feature matrix and positioning map | [storevine](discover-competitive-analysis/sample_discover-competitive-analysis_storevine_campaigns.md) | [brainshelf](discover-competitive-analysis/sample_discover-competitive-analysis_brainshelf_resurface.md) | [workbench](discover-competitive-analysis/sample_discover-competitive-analysis_workbench_blueprints.md) |
| Discover | interview-synthesis | Thematic synthesis of user research interviews with quotes and recommendations | [storevine](discover-interview-synthesis/sample_discover-interview-synthesis_storevine_campaigns.md) | [brainshelf](discover-interview-synthesis/sample_discover-interview-synthesis_brainshelf_resurface.md) | [workbench](discover-interview-synthesis/sample_discover-interview-synthesis_workbench_blueprints.md) |
| Discover | stakeholder-summary | Influence/interest map with detailed profiles and communication plan | [storevine](discover-stakeholder-summary/sample_discover-stakeholder-summary_storevine_campaigns.md) | [brainshelf](discover-stakeholder-summary/sample_discover-stakeholder-summary_brainshelf_resurface.md) | [workbench](discover-stakeholder-summary/sample_discover-stakeholder-summary_workbench_blueprints.md) |
| Define | problem-statement | Clear problem definition with user impact, business context, and success criteria | [storevine](define-problem-statement/sample_define-problem-statement_storevine_campaigns.md) | [brainshelf](define-problem-statement/sample_define-problem-statement_brainshelf_resurface.md) | [workbench](define-problem-statement/sample_define-problem-statement_workbench_blueprints.md) |
| Define | hypothesis | Testable hypothesis with metrics, validation plan, and pass/fail criteria | [storevine](define-hypothesis/sample_define-hypothesis_storevine_campaigns.md) | [brainshelf](define-hypothesis/sample_define-hypothesis_brainshelf_resurface.md) | [workbench](define-hypothesis/sample_define-hypothesis_workbench_blueprints.md) |
| Define | opportunity-tree | Outcome-driven tree mapping opportunities to solutions to assumption tests | [storevine](define-opportunity-tree/sample_define-opportunity-tree_storevine_campaigns.md) | [brainshelf](define-opportunity-tree/sample_define-opportunity-tree_brainshelf_resurface.md) | [workbench](define-opportunity-tree/sample_define-opportunity-tree_workbench_blueprints.md) |
| Define | jtbd-canvas | Jobs to be Done canvas with functional, emotional, and social dimensions | [storevine](define-jtbd-canvas/sample_define-jtbd-canvas_storevine_campaigns.md) | [brainshelf](define-jtbd-canvas/sample_define-jtbd-canvas_brainshelf_resurface.md) | [workbench](define-jtbd-canvas/sample_define-jtbd-canvas_workbench_blueprints.md) |
| Develop | solution-brief | One-page solution overview with features, metrics, trade-offs, and risks | [storevine](develop-solution-brief/sample_develop-solution-brief_storevine_campaigns.md) | [brainshelf](develop-solution-brief/sample_develop-solution-brief_brainshelf_resurface.md) | [workbench](develop-solution-brief/sample_develop-solution-brief_workbench_blueprints.md) |
| Develop | spike-summary | Technical or design spike findings with recommendation and follow-up items | [storevine](develop-spike-summary/sample_develop-spike-summary_storevine_campaigns.md) | [brainshelf](develop-spike-summary/sample_develop-spike-summary_brainshelf_resurface.md) | [workbench](develop-spike-summary/sample_develop-spike-summary_workbench_blueprints.md) |
| Develop | adr | Architecture Decision Record with context, decision, alternatives, and consequences | [storevine](develop-adr/sample_develop-adr_storevine_campaigns.md) | [brainshelf](develop-adr/sample_develop-adr_brainshelf_resurface.md) | [workbench](develop-adr/sample_develop-adr_workbench_blueprints.md) |
| Develop | design-rationale | Decision rationale with options evaluated, trade-offs, and supporting research | [storevine](develop-design-rationale/sample_develop-design-rationale_storevine_campaigns.md) | [brainshelf](develop-design-rationale/sample_develop-design-rationale_brainshelf_resurface.md) | [workbench](develop-design-rationale/sample_develop-design-rationale_workbench_blueprints.md) |
| Deliver | prd | Full Product Requirements Document with goals, scope, stories, and timeline | [storevine](deliver-prd/sample_deliver-prd_storevine_campaigns.md) | [brainshelf](deliver-prd/sample_deliver-prd_brainshelf_resurface.md) | [workbench](deliver-prd/sample_deliver-prd_workbench_blueprints.md) |
| Deliver | user-stories | User stories with Given/When/Then acceptance criteria and technical notes | [storevine](deliver-user-stories/sample_deliver-user-stories_storevine_campaigns.md) | [brainshelf](deliver-user-stories/sample_deliver-user-stories_brainshelf_resurface.md) | [workbench](deliver-user-stories/sample_deliver-user-stories_workbench_blueprints.md) |
| Deliver | edge-cases | Edge cases and error states organized by category with test scenarios | [storevine](deliver-edge-cases/sample_deliver-edge-cases_storevine_campaigns.md) | [brainshelf](deliver-edge-cases/sample_deliver-edge-cases_brainshelf_resurface.md) | [workbench](deliver-edge-cases/sample_deliver-edge-cases_workbench_blueprints.md) |
| Deliver | acceptance-criteria | Given/When/Then acceptance criteria with happy path, edge cases, error states | [storevine](deliver-acceptance-criteria/sample_deliver-acceptance-criteria_storevine_campaigns-email-builder.md) | — | — |
| Deliver | launch-checklist | Pre-launch readiness checklist across engineering, QA, marketing, legal, and ops | [storevine](deliver-launch-checklist/sample_deliver-launch-checklist_storevine_campaigns.md) | [brainshelf](deliver-launch-checklist/sample_deliver-launch-checklist_brainshelf_resurface.md) | [workbench](deliver-launch-checklist/sample_deliver-launch-checklist_workbench_blueprints.md) |
| Deliver | release-notes | User-facing release notes with highlights, new features, and known issues | [storevine](deliver-release-notes/sample_deliver-release-notes_storevine_campaigns.md) | [brainshelf](deliver-release-notes/sample_deliver-release-notes_brainshelf_resurface.md) | [workbench](deliver-release-notes/sample_deliver-release-notes_workbench_blueprints.md) |
| Measure | experiment-design | A/B test or experiment design with hypothesis, variants, metrics, and success criteria | [storevine](measure-experiment-design/sample_measure-experiment-design_storevine_campaigns.md) | [brainshelf](measure-experiment-design/sample_measure-experiment-design_brainshelf_resurface.md) | [workbench](measure-experiment-design/sample_measure-experiment-design_workbench_blueprints.md) |
| Measure | instrumentation-spec | Event tracking specification with event inventory, properties, and PII handling | [storevine](measure-instrumentation-spec/sample_measure-instrumentation-spec_storevine_campaigns.md) | [brainshelf](measure-instrumentation-spec/sample_measure-instrumentation-spec_brainshelf_resurface.md) | [workbench](measure-instrumentation-spec/sample_measure-instrumentation-spec_workbench_blueprints.md) |
| Measure | dashboard-requirements | Analytics dashboard requirements with charts, filters, alerts, and acceptance criteria | [storevine](measure-dashboard-requirements/sample_measure-dashboard-requirements_storevine_campaigns.md) | [brainshelf](measure-dashboard-requirements/sample_measure-dashboard-requirements_brainshelf_resurface.md) | [workbench](measure-dashboard-requirements/sample_measure-dashboard-requirements_workbench_blueprints.md) |
| Measure | experiment-results | Experiment results with statistical analysis, segments, learnings, and ship decision | [storevine](measure-experiment-results/sample_measure-experiment-results_storevine_campaigns.md) | [brainshelf](measure-experiment-results/sample_measure-experiment-results_brainshelf_resurface.md) | [workbench](measure-experiment-results/sample_measure-experiment-results_workbench_blueprints.md) |
| Iterate | retrospective | Team retrospective with wins, improvements, and prioritized action items | [storevine](iterate-retrospective/sample_iterate-retrospective_storevine_campaigns.md) | [brainshelf](iterate-retrospective/sample_iterate-retrospective_brainshelf_resurface.md) | [workbench](iterate-retrospective/sample_iterate-retrospective_workbench_blueprints.md) |
| Iterate | lessons-log | Structured lesson learned with root cause, recommendations, and applicability | [storevine](iterate-lessons-log/sample_iterate-lessons-log_storevine_campaigns.md) | [brainshelf](iterate-lessons-log/sample_iterate-lessons-log_brainshelf_resurface.md) | [workbench](iterate-lessons-log/sample_iterate-lessons-log_workbench_blueprints.md) |
| Iterate | refinement-notes | Backlog refinement session notes with stories, decisions, and blockers | [storevine](iterate-refinement-notes/sample_iterate-refinement-notes_storevine_campaigns.md) | [brainshelf](iterate-refinement-notes/sample_iterate-refinement-notes_brainshelf_resurface.md) | [workbench](iterate-refinement-notes/sample_iterate-refinement-notes_workbench_blueprints.md) |
| Iterate | pivot-decision | Pivot or persevere decision with evidence, options analysis, and implementation plan | [storevine](iterate-pivot-decision/sample_iterate-pivot-decision_storevine_campaigns.md) | [brainshelf](iterate-pivot-decision/sample_iterate-pivot-decision_brainshelf_resurface.md) | [workbench](iterate-pivot-decision/sample_iterate-pivot-decision_workbench_blueprints.md) |
| Utility | mermaid-diagrams | Mermaid diagram planning worksheet with type selection and syntax validation | [storevine](utility-mermaid-diagrams/sample_utility-mermaid-diagrams_storevine_campaign-flow.md) | — | — |
| Utility | slideshow-creator | JSON deck specification for presentation generation | [storevine](utility-slideshow-creator/sample_utility-slideshow-creator_storevine_campaigns-launch-deck.md) | — | — |
| Utility | pm-skill-builder | Skill Implementation Packet for creating a new PM skill | [storevine](utility-pm-skill-builder/sample_utility-pm-skill-builder_storevine_campaign-analytics-skill.md) | — | — |
| Utility | pm-skill-validate | Validation report for a PM skill against conventions | [storevine](utility-pm-skill-validate/sample_utility-pm-skill-validate_storevine_validate-campaign-analytics.md) | — | — |
| Utility | pm-skill-iterate | Iteration change summary with before/after and version bump | [storevine](utility-pm-skill-iterate/sample_utility-pm-skill-iterate_storevine_iterate-campaign-analytics.md) | — | — |
| Utility | update-pm-skills | Update completion report with value delta and file manifest | [storevine](utility-update-pm-skills/sample_utility-update-pm-skills_storevine_update-report.md) | — | — |

---

## Browse by Company

### Storevine -- B2B Ecommerce Platform

Series A, ~70 employees, ~15,000 active merchants. Competes with Shopify, Squarespace, Wix, Klaviyo, and Mailchimp.

The Storevine thread follows the PM team building **Campaigns**, a built-in email and SMS re-engagement feature for merchants who currently depend on third-party tools like Klaviyo. The arc runs from merchant interviews through experiment results and a persevere decision, with prompts that reflect an organized PM who prepares structured context before invoking each skill.

| Phase | Skill | Description |
|-------|-------|-------------|
| Foundation | [persona - product brief](foundation-persona/sample_foundation-persona_storevine_product-brief-campaigns.md) | Solo merchant product persona for first-send onboarding and activation |
| Foundation | [persona - product detailed](foundation-persona/sample_foundation-persona_storevine_product-detailed-campaigns.md) | Multi-location merchant product persona for cross-store campaign management |
| Foundation | [persona - marketing brief](foundation-persona/sample_foundation-persona_storevine_marketing-brief-campaigns.md) | Self-serve SMB acquisition persona for competitive positioning against Shopify+Klaviyo |
| Foundation | [persona - marketing detailed](foundation-persona/sample_foundation-persona_storevine_marketing-detailed-campaigns.md) | Committee-buying marketing persona for Campaigns launch and enablement planning |
| Discover | [competitive-analysis](discover-competitive-analysis/sample_discover-competitive-analysis_storevine_campaigns.md) | Email/SMS campaign tool landscape for built-in vs. third-party positioning |
| Discover | [interview-synthesis](discover-interview-synthesis/sample_discover-interview-synthesis_storevine_campaigns.md) | 8 merchant interviews on email tool dependency and Klaviyo lock-in |
| Discover | [stakeholder-summary](discover-stakeholder-summary/sample_discover-stakeholder-summary_storevine_campaigns.md) | Power-user merchants, Klaviyo integration partner, merchant success team |
| Define | [problem-statement](define-problem-statement/sample_define-problem-statement_storevine_campaigns.md) | 68% of merchants use external email tools due to Storevine feature gaps [fictional] |
| Define | [hypothesis](define-hypothesis/sample_define-hypothesis_storevine_campaigns.md) | Pre-built templates increase first campaign send rate from 12% to 30% [fictional] |
| Define | [opportunity-tree](define-opportunity-tree/sample_define-opportunity-tree_storevine_campaigns.md) | Outcome: reduce annual merchant churn from 22% to 14% [fictional] |
| Define | [jtbd-canvas](define-jtbd-canvas/sample_define-jtbd-canvas_storevine_campaigns.md) | Merchants hiring Storevine to run their business without 8 external tools |
| Develop | [solution-brief](develop-solution-brief/sample_develop-solution-brief_storevine_campaigns.md) | Storevine Campaigns: email/SMS sequences with merchant audience segmentation |
| Develop | [spike-summary](develop-spike-summary/sample_develop-spike-summary_storevine_campaigns.md) | Email deliverability vendor evaluation: SendGrid vs. AWS SES vs. Postmark vs. Mailgun |
| Develop | [adr](develop-adr/sample_develop-adr_storevine_campaigns.md) | ADR: SendGrid selected for dedicated IP warm-up and deliverability tooling |
| Develop | [design-rationale](develop-design-rationale/sample_develop-design-rationale_storevine_campaigns.md) | Template-only campaign builder chosen over drag-and-drop for v1 |
| Deliver | [prd](deliver-prd/sample_deliver-prd_storevine_campaigns.md) | PRD: Storevine Campaigns with CAN-SPAM compliance and merchant segmentation |
| Deliver | [user-stories](deliver-user-stories/sample_deliver-user-stories_storevine_campaigns.md) | Fashion boutique merchant and merchant success manager personas |
| Deliver | [edge-cases](deliver-edge-cases/sample_deliver-edge-cases_storevine_campaigns.md) | Zero valid emails, unsubscribed recipient, CAN-SPAM one-click unsubscribe |
| Deliver | [launch-checklist](deliver-launch-checklist/sample_deliver-launch-checklist_storevine_campaigns.md) | GA launch with CAN-SPAM/GDPR compliance, dedicated IP warm-up, merchant opt-in |
| Deliver | [release-notes](deliver-release-notes/sample_deliver-release-notes_storevine_campaigns.md) | Storevine 4.2: Campaigns beta, analytics improvements, 3 bug fixes |
| Measure | [experiment-design](measure-experiment-design/sample_measure-experiment-design_storevine_campaigns.md) | A/B: template suggestions vs. blank canvas; metric: first campaign sent in 14 days |
| Measure | [instrumentation-spec](measure-instrumentation-spec/sample_measure-instrumentation-spec_storevine_campaigns.md) | campaign_created, template_selected, send_scheduled, email_opened, link_clicked |
| Measure | [dashboard-requirements](measure-dashboard-requirements/sample_measure-dashboard-requirements_storevine_campaigns.md) | Merchant adoption, first-send rate, open/click/unsubscribe, revenue attribution |
| Measure | [experiment-results](measure-experiment-results/sample_measure-experiment-results_storevine_campaigns.md) | Template treatment: +22% first-send rate [fictional], p=0.01, shipping |
| Iterate | [retrospective](iterate-retrospective/sample_iterate-retrospective_storevine_campaigns.md) | Q2 Sprint 12: deliverability delay, 3 wins, 4 action items |
| Iterate | [lessons-log](iterate-lessons-log/sample_iterate-lessons-log_storevine_campaigns.md) | Email list validation must happen at import, not at send time |
| Iterate | [refinement-notes](iterate-refinement-notes/sample_iterate-refinement-notes_storevine_campaigns.md) | 5 stories for Campaigns v1.1: A/B variants, purchase automations, unsubscribe page |
| Iterate | [pivot-decision](iterate-pivot-decision/sample_iterate-pivot-decision_storevine_campaigns.md) | Persevere: +18% merchant retention [fictional]; sub-pivot to template-only permanently |

---

### Brainshelf -- Consumer PKM App

Post-seed, ~20 employees, ~85,000 registered users, ~22,000 MAU. Competes with Readwise, Raindrop.io, Omnivore, and Instapaper.

The Brainshelf thread follows the PM team building **Resurface**, a contextual morning email digest that resurfaces saved content based on recent reading patterns rather than a fixed schedule. The arc runs from competitive analysis through a persevere decision and Sprint 9 refinement, with prompts that reflect a lean startup team moving fast with rough, casual briefs.

| Phase | Skill | Description |
|-------|-------|-------------|
| Foundation | [persona - product brief](foundation-persona/sample_foundation-persona_brainshelf_product-brief-resurface.md) | Brief product persona for Resurface activation and repeat-habit design decisions |
| Foundation | [persona - product detailed](foundation-persona/sample_foundation-persona_brainshelf_product-detailed-resurface.md) | Power-curator product persona for curation-aware resurfacing and topic filters |
| Foundation | [persona - marketing brief](foundation-persona/sample_foundation-persona_brainshelf_marketing-brief-resurface.md) | Newsletter-creator acquisition persona for curation positioning and Curator tier |
| Foundation | [persona - marketing detailed](foundation-persona/sample_foundation-persona_brainshelf_marketing-detailed-resurface.md) | Freemium-to-paid conversion persona for subscription messaging and trial design |
| Discover | [competitive-analysis](discover-competitive-analysis/sample_discover-competitive-analysis_brainshelf_resurface.md) | PKM/read-later landscape: resurfacing and curation positioning |
| Discover | [interview-synthesis](discover-interview-synthesis/sample_discover-interview-synthesis_brainshelf_resurface.md) | 7 user interviews on save-for-later behavior and the "guilt pile" problem |
| Discover | [stakeholder-summary](discover-stakeholder-summary/sample_discover-stakeholder-summary_brainshelf_resurface.md) | Power savers, open-source PKM community, newsletter curators |
| Define | [problem-statement](define-problem-statement/sample_define-problem-statement_brainshelf_resurface.md) | Users save 47 items/month but revisit fewer than 9% within 30 days [fictional] |
| Define | [hypothesis](define-hypothesis/sample_define-hypothesis_brainshelf_resurface.md) | Morning resurface email increases re-read rate from 8% to 20% within 30 days [fictional] |
| Define | [opportunity-tree](define-opportunity-tree/sample_define-opportunity-tree_brainshelf_resurface.md) | Outcome: increase 60-day retention from 31% to 50% [fictional] |
| Define | [jtbd-canvas](define-jtbd-canvas/sample_define-jtbd-canvas_brainshelf_resurface.md) | Knowledge workers hiring Brainshelf to feel smarter without managing a reading list |
| Develop | [solution-brief](develop-solution-brief/sample_develop-solution-brief_brainshelf_resurface.md) | Brainshelf Resurface: contextual daily brief based on recent reading patterns |
| Develop | [spike-summary](develop-spike-summary/sample_develop-spike-summary_brainshelf_resurface.md) | Article extraction quality: Diffbot vs. Mercury Parser vs. Readability.js vs. custom |
| Develop | [adr](develop-adr/sample_develop-adr_brainshelf_resurface.md) | ADR: Mercury Parser selected (open source, no API cost, sufficient fidelity) |
| Develop | [design-rationale](develop-design-rationale/sample_develop-design-rationale_brainshelf_resurface.md) | Email digest + in-app card chosen over push notification for resurface delivery |
| Deliver | [prd](deliver-prd/sample_deliver-prd_brainshelf_resurface.md) | PRD: Brainshelf Resurface with Apple Mail Privacy handling and privacy review |
| Deliver | [user-stories](deliver-user-stories/sample_deliver-user-stories_brainshelf_resurface.md) | PM who reads extensively but forgets to revisit saved research |
| Deliver | [edge-cases](deliver-edge-cases/sample_deliver-edge-cases_brainshelf_resurface.md) | No reading history, paywalled items, quiet hours, locale mismatch |
| Deliver | [launch-checklist](deliver-launch-checklist/sample_deliver-launch-checklist_brainshelf_resurface.md) | Email opt-in flow, Apple Mail Privacy handling, privacy policy update, App Store review |
| Deliver | [release-notes](deliver-release-notes/sample_deliver-release-notes_brainshelf_resurface.md) | Brainshelf 2.0: Resurface daily brief, import improvements, 2 fixes |
| Measure | [experiment-design](measure-experiment-design/sample_measure-experiment-design_brainshelf_resurface.md) | A/B: email digest vs. in-app notification; metric: resurface click-through rate at 7 days |
| Measure | [instrumentation-spec](measure-instrumentation-spec/sample_measure-instrumentation-spec_brainshelf_resurface.md) | item_resurfaced, resurface_clicked, item_read_time_logged, resurface_dismissed |
| Measure | [dashboard-requirements](measure-dashboard-requirements/sample_measure-dashboard-requirements_brainshelf_resurface.md) | Resurface open rate, click-through, re-read completion, 30-day retention by cohort |
| Measure | [experiment-results](measure-experiment-results/sample_measure-experiment-results_brainshelf_resurface.md) | Email digest treatment: +15% click rate [fictional], p=0.04, shipping with monitoring |
| Iterate | [retrospective](iterate-retrospective/sample_iterate-retrospective_brainshelf_resurface.md) | Sprint 8: notification timing bug, 2 wins, 3 action items |
| Iterate | [lessons-log](iterate-lessons-log/sample_iterate-lessons-log_brainshelf_resurface.md) | Paywall detection must be explicit; silent failure destroys trust |
| Iterate | [refinement-notes](iterate-refinement-notes/sample_iterate-refinement-notes_brainshelf_resurface.md) | 4 stories for Resurface v1.1: quiet hours, source filtering, frequency controls, snooze |
| Iterate | [pivot-decision](iterate-pivot-decision/sample_iterate-pivot-decision_brainshelf_resurface.md) | Pivot: time-based digest to browser-extension-triggered contextual resurface |

---

### Workbench -- Enterprise Collaboration Software

Series B, ~200 employees, ~500 enterprise customers. Competes with Atlassian Confluence, Notion, Coda, Monday.com, and Basecamp.

The Workbench thread follows the PM team building **Blueprints**, reusable document templates with required sections and role-based approval gates for enterprise teams. The arc runs from team lead interviews on Confluence fatigue through a GA launch retrospective and a pivot decision to narrow focus to ops/compliance teams. Prompts are the most complete and structured in the library, reflecting an enterprise PM who operates with a full stakeholder map and quantified baselines.

| Phase | Skill | Description |
|-------|-------|-------------|
| Foundation | [persona - product brief](foundation-persona/sample_foundation-persona_workbench_product-brief-blueprints.md) | Document-author product persona for submission experience and completion visibility |
| Foundation | [persona - product detailed](foundation-persona/sample_foundation-persona_workbench_product-detailed-blueprints.md) | Approval-governance product persona for enterprise operations workflows |
| Foundation | [persona - marketing brief](foundation-persona/sample_foundation-persona_workbench_marketing-brief-blueprints.md) | Internal champion marketing persona for enterprise sales playbook and pilot-to-expansion |
| Foundation | [persona - marketing detailed](foundation-persona/sample_foundation-persona_workbench_marketing-detailed-blueprints.md) | Economic buyer marketing persona for ROI justification and enterprise proposal templates |
| Discover | [competitive-analysis](discover-competitive-analysis/sample_discover-competitive-analysis_workbench_blueprints.md) | Enterprise docs/collaboration landscape: governance and template positioning |
| Discover | [interview-synthesis](discover-interview-synthesis/sample_discover-interview-synthesis_workbench_blueprints.md) | 6 enterprise team lead interviews on documentation consistency and Confluence fatigue |
| Discover | [stakeholder-summary](discover-stakeholder-summary/sample_discover-stakeholder-summary_workbench_blueprints.md) | IT security, legal/compliance, department heads, Confluence-migrant accounts |
| Define | [problem-statement](define-problem-statement/sample_define-problem-statement_workbench_blueprints.md) | 60% of enterprise projects lack an approved kickoff doc at handoff [fictional] |
| Define | [hypothesis](define-hypothesis/sample_define-hypothesis_workbench_blueprints.md) | Required-section Blueprints reduce time-to-approved-doc from 4 days to 1 day [fictional] |
| Define | [opportunity-tree](define-opportunity-tree/sample_define-opportunity-tree_workbench_blueprints.md) | Outcome: expand from SMB to enterprise via governance, SSO, Confluence migration |
| Define | [jtbd-canvas](define-jtbd-canvas/sample_define-jtbd-canvas_workbench_blueprints.md) | Ops managers hiring Workbench to enforce standards without becoming the "docs police" |
| Develop | [solution-brief](develop-solution-brief/sample_develop-solution-brief_workbench_blueprints.md) | Workbench Blueprints: doc templates with required sections and approval gates |
| Develop | [spike-summary](develop-spike-summary/sample_develop-spike-summary_workbench_blueprints.md) | CRDT library evaluation for co-editing: Yjs vs. Automerge vs. ShareDB |
| Develop | [adr](develop-adr/sample_develop-adr_workbench_blueprints.md) | ADR: Yjs CRDTs selected for offline-first support and performance |
| Develop | [design-rationale](develop-design-rationale/sample_develop-design-rationale_workbench_blueprints.md) | Guided wizard chosen over blank canvas for Blueprint creation flow |
| Deliver | [prd](deliver-prd/sample_deliver-prd_workbench_blueprints.md) | PRD: Workbench Blueprints with SSO provisioning and enterprise approval gates |
| Deliver | [user-stories](deliver-user-stories/sample_deliver-user-stories_workbench_blueprints.md) | Enterprise ops manager (creator) and department head (approver) personas |
| Deliver | [edge-cases](deliver-edge-cases/sample_deliver-edge-cases_workbench_blueprints.md) | Required section deleted post-approval, approver role revoked, version conflict |
| Deliver | [launch-checklist](deliver-launch-checklist/sample_deliver-launch-checklist_workbench_blueprints.md) | SSO tenant testing, IT admin provisioning guide, Confluence migration communication |
| Deliver | [release-notes](deliver-release-notes/sample_deliver-release-notes_workbench_blueprints.md) | Workbench 3.5: Blueprints GA, enhanced permissions, Jira sync integration |
| Measure | [experiment-design](measure-experiment-design/sample_measure-experiment-design_workbench_blueprints.md) | A/B: required vs. optional Blueprint sections; metric: time to first approved doc |
| Measure | [instrumentation-spec](measure-instrumentation-spec/sample_measure-instrumentation-spec_workbench_blueprints.md) | blueprint_created, section_completed, approval_requested, approval_granted, blueprint_published |
| Measure | [dashboard-requirements](measure-dashboard-requirements/sample_measure-dashboard-requirements_workbench_blueprints.md) | Blueprint adoption by department, time-to-approved, approval cycle, compliance rate |
| Measure | [experiment-results](measure-experiment-results/sample_measure-experiment-results_workbench_blueprints.md) | Required sections: -40% time-to-approved [fictional], p=0.001, shipping |
| Iterate | [retrospective](iterate-retrospective/sample_iterate-retrospective_workbench_blueprints.md) | Post-GA retro: approval UX confusion, SSO incident day 2, 3 wins, 5 action items |
| Iterate | [lessons-log](iterate-lessons-log/sample_iterate-lessons-log_workbench_blueprints.md) | Required sections caused skip-and-submit; enforce at approval gate, not authoring time |
| Iterate | [refinement-notes](iterate-refinement-notes/sample_iterate-refinement-notes_workbench_blueprints.md) | 6 stories for Blueprints v1.1: version history, approval delegation, section commenting |
| Iterate | [pivot-decision](iterate-pivot-decision/sample_iterate-pivot-decision_workbench_blueprints.md) | Pivot: narrow to ops/compliance teams; engineering templates deferred to v2 |

---

*Part of pm-skills v2.6.1 -- [github.com/product-on-purpose/pm-skills](https://github.com/product-on-purpose/pm-skills)*



